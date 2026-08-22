(function initUsicAuth(){
  const cfg = window.USIC_SUPABASE_CONFIG;
  if (!cfg || !window.supabase) {
    console.error('Supabase no está disponible.');
    const out=document.getElementById('authStatus');
    if(out){ out.textContent='No se pudo conectar con el servicio de acceso. Recarga la página o comprueba tu conexión.'; out.dataset.kind='error'; }
    return;
  }

  const client = window.supabase.createClient(cfg.url, cfg.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });

  let session = null;
  let profile = null;
  let syncTimer = null;
  let hydrating = false;
  let studySessionId = null;
  let studyStartedAt = null;
  let activeSeconds = 0;
  let lastInteraction = Date.now();
  let heartbeat = null;
  let lastStudyTick = null;
  let activityListenersBound = false;
  let profileCloudAvailable = true;
  let stateCloudAvailable = true;
  let sessionsCloudAvailable = true;
  let goalsCloudAvailable = true;
  let cloudWarningShown = false;
  let onboardingReturnFocus = null;
  const cloudIssues = new Map();
  window.USIC_CLOUD_WARNING = null;
  window.USIC_CLOUD_STATE = { issues: [] };
  let recoveringCloud=false;
  let lastCloudRecovery=0;

  function localProfileKey(userId){ return `usic-local-profile:${userId}`; }
  function readLocalProfile(userId){
    try { return JSON.parse(localStorage.getItem(localProfileKey(userId)) || 'null'); }
    catch (_) { return null; }
  }
  function writeLocalProfile(userId, value){
    try { localStorage.setItem(localProfileKey(userId), JSON.stringify(value)); }
    catch (_) { /* el estado principal ya informa si localStorage no está disponible */ }
  }
  function localGoalsKey(userId){ return `usic-local-goals:${userId}`; }
  function readLocalGoals(userId){
    try { const value=JSON.parse(localStorage.getItem(localGoalsKey(userId)) || '[]'); return Array.isArray(value) ? value : []; }
    catch (_) { return []; }
  }
  function writeLocalGoals(userId, goals){
    try { localStorage.setItem(localGoalsKey(userId), JSON.stringify(goals)); }
    catch (_) { /* si falla, el objetivo durará solo durante esta sesión */ }
  }
  function localGoalCacheKey(userId){ return `usic-local-goal-cache:${userId}`; }
  function readLocalGoalCache(userId){
    try { const value=JSON.parse(localStorage.getItem(localGoalCacheKey(userId)) || '[]'); return Array.isArray(value) ? value : []; }
    catch (_) { return []; }
  }
  function writeLocalGoalCache(userId, goals){
    try { localStorage.setItem(localGoalCacheKey(userId), JSON.stringify(Array.isArray(goals)?goals:[])); }
    catch (_) {}
  }
  function localGoalOpsKey(userId){ return `usic-local-goal-ops:${userId}`; }
  function readLocalGoalOps(userId){
    try { const value=JSON.parse(localStorage.getItem(localGoalOpsKey(userId)) || '[]'); return Array.isArray(value) ? value : []; }
    catch (_) { return []; }
  }
  function writeLocalGoalOps(userId, ops){
    try { localStorage.setItem(localGoalOpsKey(userId), JSON.stringify(ops)); }
    catch (_) { /* si falla, el aviso general de almacenamiento seguirá cubriendo el progreso */ }
  }
  function queueGoalOp(userId, op){
    const ops=readLocalGoalOps(userId);
    ops.push({...op,queued_at:new Date().toISOString()});
    // Compacta actualizaciones consecutivas del mismo objetivo para evitar una cola infinita.
    const compact=[];
    for(const item of ops){
      const prev=compact[compact.length-1];
      if(prev && item.id && prev.id===item.id && prev.type==='update' && item.type==='update'){
        prev.patch={...(prev.patch||{}),...(item.patch||{})};
        prev.queued_at=item.queued_at;
      } else compact.push(item);
    }
    writeLocalGoalOps(userId,compact.slice(-100));
  }
  function applyGoalOps(goals, ops){
    const map=new Map((goals||[]).map(g=>[g.id,{...g}]));
    for(const op of ops||[]){
      if(op.type==='create' && op.data?.id) map.set(op.data.id,{...op.data});
      if(op.type==='update' && op.id && map.has(op.id)) map.set(op.id,{...map.get(op.id),...(op.patch||{})});
      if(op.type==='delete' && op.id) map.delete(op.id);
    }
    return [...map.values()].sort((a,b)=>String(b.created_at||'').localeCompare(String(a.created_at||'')));
  }
  async function flushGoalOps(userId){
    if(!userId || !goalsCloudAvailable) return;
    const ops=readLocalGoalOps(userId);
    if(!ops.length) return;
    let done=0;
    for(const op of ops){
      let result={error:null};
      if(op.type==='create' && op.data){ result=await client.from('goals').upsert(op.data,{onConflict:'id'}); }
      else if(op.type==='update' && op.id){ result=await client.from('goals').update({...op.patch,updated_at:new Date().toISOString()}).eq('id',op.id); }
      else if(op.type==='delete' && op.id){ result=await client.from('goals').delete().eq('id',op.id); }
      if(result.error){
        if(missingTable(result.error,'goals')) goalsCloudAvailable=false;
        throw result.error;
      }
      done++;
      writeLocalGoalOps(userId,ops.slice(done));
    }
  }
  function localStateKey(userId){ return `usic-local-state:${userId}`; }
  function readLocalState(userId){
    try {
      const value=JSON.parse(localStorage.getItem(localStateKey(userId)) || 'null');
      return value && typeof value==='object' ? value : null;
    } catch (_) { return null; }
  }
  function writeLocalState(userId, value){
    if(!userId || !value) return;
    try { localStorage.setItem(localStateKey(userId), JSON.stringify(value)); }
    catch (_) { /* STORE ya informa si el almacenamiento persistente no está disponible */ }
  }

  const LOCAL_STATE_OWNER_KEY='usic-state-owner';
  function prepareLocalStateForUser(userId){
    if(!userId || !window.STORE) return;
    try {
      const owner=localStorage.getItem(LOCAL_STATE_OWNER_KEY);
      if(owner===userId) return;
      if(owner) writeLocalState(owner, window.STORE.snapshot());
      const saved=readLocalState(userId);
      window.STORE.replaceState(saved || {completed:[],errors:[],minutes:0,streak:0,lastLesson:null,lessonActivity:{},practiceAttempts:{}});
      localStorage.setItem(LOCAL_STATE_OWNER_KEY,userId);
    } catch (_) { /* STORE ya gestiona navegadores sin almacenamiento persistente */ }
  }
  function clearLocalStateOwner(){
    try { localStorage.removeItem(LOCAL_STATE_OWNER_KEY); } catch (_) {}
  }

  function missingTable(error, table='') {
    const raw=String(error?.message||error||'').toLowerCase();
    return raw.includes('schema cache') || raw.includes('could not find the table') || raw.includes('relation') && raw.includes('does not exist') || (table && raw.includes(table.toLowerCase()) && raw.includes('not found'));
  }

  function setSyncIndicator(text, state='busy') {
    const indicator=$('#syncIndicator');
    if (indicator) { indicator.textContent=text; indicator.dataset.state=state; }
  }

  const $ = (q, scope=document) => scope.querySelector(q);
  const overlay = $('#authGate');
  const status = $('#authStatus');
  if (status) status.tabIndex = -1;

  function msg(payload='', kind='info') {
    if (!status) return;
    let title='', body='', hint='';
    if (payload && typeof payload === 'object') {
      title = payload.title || '';
      body = payload.body || payload.text || '';
      hint = payload.hint || '';
      kind = payload.kind || kind;
    } else {
      body = payload || '';
    }
    status.dataset.kind = kind;
    status.setAttribute('role', kind === 'error' ? 'alert' : 'status');
    status.setAttribute('aria-live', kind === 'error' ? 'assertive' : 'polite');
    const pieces = [];
    if (title) pieces.push(`<strong class="auth-status-title">${escapeHtml(title)}</strong>`);
    if (body) pieces.push(`<span class="auth-status-body">${escapeHtml(body)}</span>`);
    if (hint) pieces.push(`<small class="auth-status-hint">${escapeHtml(hint)}</small>`);
    status.innerHTML = pieces.join('');
    if (!pieces.length) delete status.dataset.kind;
  }

  function clearFormFeedback(form){
    form?.querySelectorAll('input,select,textarea').forEach(el=>{
      el.classList.remove('is-invalid','is-valid');
      el.removeAttribute('aria-invalid');
    });
  }

  function markInvalid(form, names=[]) {
    names.forEach(name=>{
      const field=form?.elements?.[name];
      if (!field) return;
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid','true');
    });
    const first=names.map(name=>form?.elements?.[name]).find(Boolean);
    first?.focus();
  }

  function markValid(form, names=[]) {
    names.forEach(name=>{
      const field=form?.elements?.[name];
      if (!field) return;
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      field.removeAttribute('aria-invalid');
    });
  }

  function isLikelyEmail(value=''){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
  }

  function escapeHtml(v){ return String(v ?? '').replace(/[&<>\"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }

  function trapFocus(container, event){
    if(event.key!=='Tab' || !container) return;
    const focusable=[...container.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')]
      .filter(el=>el.offsetParent!==null && !el.closest('[hidden]'));
    if(!focusable.length) return;
    const first=focusable[0], last=focusable[focusable.length-1];
    if(event.shiftKey && document.activeElement===first){ event.preventDefault(); last.focus(); }
    else if(!event.shiftKey && document.activeElement===last){ event.preventDefault(); first.focus(); }
    else if(!container.contains(document.activeElement)){ event.preventDefault(); first.focus(); }
  }

  function normalizeActivity(a={}) {
    const out={};
    for (const [id,v] of Object.entries(a || {})) {
      if (!v || typeof v !== 'object') continue;
      out[id]={...v};
    }
    return out;
  }

  function mergeStates(local, remote) {
    if (!remote) return local;
    const la=normalizeActivity(local.lessonActivity), ra=normalizeActivity(remote.lessonActivity), activity={};
    for (const id of new Set([...Object.keys(la),...Object.keys(ra)])) {
      const a=la[id]||{}, b=ra[id]||{};
      const vals=[a.firstOpenedAt,b.firstOpenedAt].filter(Number.isFinite);
      const completed=[a.completedAt,b.completedAt].filter(Number.isFinite);
      activity[id]={
        ...a,...b,
        firstOpenedAt: vals.length ? Math.min(...vals) : (a.firstOpenedAt||b.firstOpenedAt),
        lastOpenedAt: Math.max(a.lastOpenedAt||0,b.lastOpenedAt||0)||undefined,
        visits: Math.max(a.visits||0,b.visits||0),
        completedAt: completed.length ? Math.min(...completed) : (a.completedAt||b.completedAt)
      };
    }
    const errMap=new Map();
    [...(remote.errors||[]),...(local.errors||[])].forEach(e=>{
      if (!e) return;
      const k=`${e.lessonId}|${e.date}|${e.problem}`;
      errMap.set(k,e);
    });
    const newestLocal=Math.max(0,...Object.values(la).map(v=>v.lastOpenedAt||0));
    const newestRemote=Math.max(0,...Object.values(ra).map(v=>v.lastOpenedAt||0));
    const completed=[...new Set([...(remote.completed||[]),...(local.completed||[])])];
    const completedMinutes=completed.reduce((total,id)=>total+(Number(window.LESSONS?.[id]?.duration)||0),0);
    const practiceAttempts={};
    const lp=local.practiceAttempts||{}, rp=remote.practiceAttempts||{};
    for(const key of new Set([...Object.keys(rp),...Object.keys(lp)])){
      const a=rp[key]||{}, b=lp[key]||{};
      practiceAttempts[key]={
        attempts:Math.max(Number(a.attempts)||0,Number(b.attempts)||0),
        correct:Boolean(a.correct||b.correct),
        revealed:Boolean(a.revealed||b.revealed),
        selfAssessed:b.selfAssessed||a.selfAssessed||null,
        lastAttemptAt:Math.max(Number(a.lastAttemptAt)||0,Number(b.lastAttemptAt)||0)||undefined
      };
    }
    return {
      ...remote,...local,
      completed,
      errors:[...errMap.values()].sort((a,b)=>(a.date||0)-(b.date||0)).slice(-100),
      minutes:Math.max(Number(local.minutes)||0,Number(remote.minutes)||0,completedMinutes),
      streak:Math.max(Number(local.streak)||0,Number(remote.streak)||0),
      lastLesson:newestLocal>=newestRemote ? (local.lastLesson||remote.lastLesson) : (remote.lastLesson||local.lastLesson),
      lessonActivity:activity,
      practiceAttempts
    };
  }

  async function ensureProfile(user) {
    const display = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Estudiante';
    const savedLocal=readLocalProfile(user.id);
    const fallback={id:user.id,display_name:display,email:user.email,onboarding_completed:false,weekly_goal_minutes:180,focus_area:null,...(savedLocal||{})};
    let data=null, error=null;
    try {
      ({data,error}=await client.from('profiles').select('*').eq('id', user.id).maybeSingle());
      if (error && missingTable(error,'profiles')) {
        profileCloudAvailable=false;
        profile=fallback;
        writeLocalProfile(user.id, profile);
        updateProfileUI();
        setSyncIndicator('Solo local','local');
        showCloudWarning('Falta la tabla public.profiles en Supabase','profile');
        return;
      }
      if (error) console.warn('No se pudo leer el perfil:',error.message);
      if (!data && !error) {
        const seed={id:user.id,display_name:fallback.display_name,email:user.email,focus_area:fallback.focus_area||null,weekly_goal_minutes:Number(fallback.weekly_goal_minutes)||180,onboarding_completed:!!fallback.onboarding_completed};
        const res=await client.from('profiles').upsert(seed,{onConflict:'id'}).select().maybeSingle();
        data=res.data; error=res.error;
      } else if(data && savedLocal) {
        const localUpdated=Date.parse(savedLocal.updated_at||0)||0;
        const cloudUpdated=Date.parse(data.updated_at||0)||0;
        if(localUpdated>cloudUpdated){
          const patch={id:user.id,email:user.email,display_name:savedLocal.display_name||data.display_name||display,focus_area:savedLocal.focus_area||null,weekly_goal_minutes:Number(savedLocal.weekly_goal_minutes)||180,onboarding_completed:!!savedLocal.onboarding_completed,updated_at:new Date().toISOString()};
          const res=await client.from('profiles').upsert(patch,{onConflict:'id'}).select().maybeSingle();
          if(!res.error && res.data) data=res.data;
        }
      }
    } catch (e) { error=e; }
    if (error) {
      console.warn('Perfil no disponible:', error.message||error);
      if(!missingTable(error,'profiles')) showCloudWarning('No se pudo sincronizar el perfil en este momento','profile');
    } else {
      profileCloudAvailable=true;
      clearCloudWarning('profile');
    }
    profile=data || fallback;
    writeLocalProfile(user.id, profile);
    updateProfileUI();
  }

  function updateProfileUI(){
    const name=profile?.display_name || session?.user?.email?.split('@')[0] || 'Estudiante';
    document.querySelectorAll('[data-user-name]').forEach(el=>el.textContent=name);
    document.querySelectorAll('[data-user-email]').forEach(el=>el.textContent=session?.user?.email||'');
    document.querySelectorAll('[data-user-avatar]').forEach(el=>el.textContent=(name.trim()[0]||'U').toUpperCase());
  }

  async function hydrateCloudState() {
    if (!session?.user || !window.STORE) return;
    hydrating=true;
    setSyncIndicator('Conectando…','busy');
    try {
      const {data,error}=await client.from('user_state').select('state,updated_at').eq('user_id',session.user.id).maybeSingle();
      if (error) throw error;
      const local=STORE.snapshot();
      const merged=mergeStates(local,data?.state||null);
      STORE.replaceState(merged);
      const save=await client.from('user_state').upsert({user_id:session.user.id,state:STORE.snapshot(),updated_at:new Date().toISOString()},{onConflict:'user_id'});
      if (save.error) throw save.error;
      stateCloudAvailable=true;
      clearCloudWarning('state');
      setSyncIndicator('Sincronizado','ok');
      window.dispatchEvent(new CustomEvent('usic-cloud-ready'));
    } catch(error) {
      console.warn('No se pudo sincronizar el progreso cloud:',error);
      if (missingTable(error,'user_state')) {
        stateCloudAvailable=false;
        setSyncIndicator('Solo local','local');
        showCloudWarning('Falta la tabla public.user_state en Supabase','state');
      } else {
        stateCloudAvailable=true;
        setSyncIndicator('Reintento pendiente','warn');
        showCloudWarning('No se pudo sincronizar el progreso en este momento','state');
      }
    } finally { hydrating=false; }
  }

  function inferCloudIssueKey(text=''){
    const raw=String(text).toLowerCase();
    if(raw.includes('profiles') || raw.includes('perfil')) return 'profile';
    if(raw.includes('user_state') || raw.includes('progreso')) return 'state';
    if(raw.includes('goals') || raw.includes('objetiv')) return 'goals';
    if(raw.includes('study_sessions') || raw.includes('estadíst') || raw.includes('sesión de estudio')) return 'sessions';
    return 'general';
  }
  function renderCloudIssues(){
    const issues=[...cloudIssues.entries()].map(([key,value])=>({key,...value}));
    window.USIC_CLOUD_STATE={issues};
    window.USIC_CLOUD_WARNING=issues.map(i=>i.text).join(' · ') || null;
    const accountSync=$('#accountSync');
    const needsSetup=issues.some(i=>i.needsSetup);
    if(accountSync){
      accountSync.textContent=!issues.length?'● Cloud activo':needsSetup?'● Solo local':'● Reintento pendiente';
      accountSync.classList.toggle('local',!!issues.length);
    }
    const el=$('#cloudWarning');
    if(!el) return;
    if(!issues.length){ el.hidden=true; el.innerHTML=''; return; }
    const summary=issues.map(i=>i.text).join(' · ');
    el.hidden=false;
    el.innerHTML=`<strong>${needsSetup ? 'Configuración cloud incompleta.' : 'Sincronización cloud temporalmente no disponible.'}</strong><span>La aplicación seguirá funcionando con copia local. ${escapeHtml(summary)}.</span><small>${needsSetup ? 'Administrador: ejecuta SUPABASE_SETUP.sql en Supabase.' : 'Reintentaremos automáticamente cuando haya nueva actividad.'}</small>`;
  }
  function clearCloudWarning(key){
    cloudIssues.delete(key);
    renderCloudIssues();
    if(!cloudIssues.size) cloudWarningShown=false;
  }
  function showCloudWarning(text, key=inferCloudIssueKey(text)){
    const needsSetup=/falta la tabla|schema cache|no existe/i.test(String(text));
    cloudIssues.set(key,{text:String(text),needsSetup});
    renderCloudIssues();
    if (!cloudWarningShown) {
      cloudWarningShown=true;
      setTimeout(()=>{
        if (typeof window.toast === 'function') window.toast(needsSetup ? 'Falta terminar la configuración cloud. Seguiremos guardando localmente.' : 'La nube no responde ahora mismo. Seguiremos guardando localmente y reintentaremos.', needsSetup ? 'warning' : 'error');
      }, 50);
    }
  }

  async function syncNow(){
    if (!session?.user || !window.STORE || hydrating) return;
    clearTimeout(syncTimer);
    try {
      const {error}=await client.from('user_state').upsert({user_id:session.user.id,state:STORE.snapshot(),updated_at:new Date().toISOString()},{onConflict:'user_id'});
      if (error) throw error;
      stateCloudAvailable=true;
      clearCloudWarning('state');
      setSyncIndicator('Sincronizado','ok');
    } catch(error){
      console.warn('Sync falló',error);
      if (missingTable(error,'user_state')) {
        stateCloudAvailable=false;
        setSyncIndicator('Solo local','local');
        showCloudWarning('Falta la tabla public.user_state en Supabase','state');
      } else {
        stateCloudAvailable=true;
        setSyncIndicator('Reintento pendiente','warn');
        showCloudWarning('No se pudo sincronizar el progreso en este momento','state');
      }
    }
  }

  function scheduleSync(){
    if (!session?.user || hydrating) return;
    writeLocalState(session.user.id, window.STORE?.snapshot?.());
    if (!stateCloudAvailable) return;
    setSyncIndicator('Guardando…','busy');
    clearTimeout(syncTimer);
    syncTimer=setTimeout(syncNow,900);
  }

  function showGate(){
    document.body.classList.add('auth-locked');
    if(overlay){ overlay.hidden=false; overlay.setAttribute('aria-hidden','false'); }
  }
  function hideGate(){
    document.body.classList.remove('auth-locked');
    if(overlay){ overlay.hidden=true; overlay.setAttribute('aria-hidden','true'); }
  }

  let handledUserId=null;
  let handlingUserId=null;
  let sessionGeneration=0;
  async function handleSession(nextSession){
    if(!nextSession){
      const generation=++sessionGeneration;
      session=null;
      handledUserId=null;
      handlingUserId=null;
      await stopStudySession();
      if(generation!==sessionGeneration) return;
      showGate();
      return;
    }
    const nextUserId=nextSession.user?.id || null;
    session=nextSession;
    updateProfileUI();
    if(nextUserId && handledUserId===nextUserId){
      hideGate();
      return;
    }
    if(nextUserId && handlingUserId===nextUserId) return;
    const generation=++sessionGeneration;
    handlingUserId=nextUserId;
    hydrating=true;
    prepareLocalStateForUser(nextUserId);
    try {
      await ensureProfile(nextSession.user);
      if(generation!==sessionGeneration || session?.user?.id!==nextUserId) return;
      await hydrateCloudState();
      if(generation!==sessionGeneration || session?.user?.id!==nextUserId) return;
      handledUserId=nextUserId;
      hideGate();
      startStudySession();
      if(typeof window.renderRoute==='function') window.renderRoute();
      setTimeout(()=>{ if(session?.user?.id===nextUserId) maybeShowOnboarding(); },250);
    } finally {
      if(generation===sessionGeneration) hydrating=false;
      if(handlingUserId===nextUserId) handlingUserId=null;
    }
  }

  function authRedirectUrl(){
    const base = location.origin && location.origin !== 'null' ? location.origin : 'https://dosonoprojects.top';
    const path = location.pathname && location.pathname !== '/' ? location.pathname : '/';
    return `${base}${path}`;
  }

  function authErrorDetails(error, context='generic'){
    const raw=String(error?.message||error||'No se pudo completar la operación.');
    const text=raw.toLowerCase();
    const generic = { kind:'error', title:'No se pudo completar la operación', body:raw, hint:'Vuelve a intentarlo en unos segundos.' };
    if(text.includes('invalid login credentials')) return {
      kind:'error',
      title:'No pudimos iniciar sesión',
      body:'El email o la contraseña no coinciden con ninguna cuenta activa.',
      hint:'Revisa mayúsculas, el correo usado o utiliza “¿La has olvidado?” si necesitas restaurar el acceso.'
    };
    if(text.includes('email not confirmed')) return {
      kind:'warn',
      title:'Falta confirmar el email',
      body:'La cuenta existe, pero todavía no se ha confirmado desde el correo recibido.',
      hint:'Busca el mensaje de confirmación en tu bandeja de entrada o spam y, si hace falta, vuelve a registrarte con el mismo email para reenviar el flujo.'
    };
    if(text.includes('user already registered')) return {
      kind:'warn',
      title:'Ese email ya tiene cuenta',
      body:'Ya existe una cuenta asociada a esa dirección.',
      hint:'Prueba a iniciar sesión o usa la recuperación de contraseña si no recuerdas la clave.'
    };
    if(text.includes('password should be') || text.includes('password is too weak')) return {
      kind:'error',
      title:'La contraseña es demasiado débil',
      body:'Necesitas una contraseña más sólida para completar la operación.',
      hint:'Usa al menos 8 caracteres y combina palabras largas con números o símbolos.'
    };
    if(text.includes('rate limit') || text.includes('too many')) return {
      kind:'warn',
      title:'Demasiados intentos',
      body:'El servicio ha limitado temporalmente nuevas peticiones de acceso.',
      hint:'Espera un momento antes de volver a intentarlo para evitar que el bloqueo se alargue.'
    };
    if(text.includes('network') || text.includes('fetch') || text.includes('failed to fetch')) return {
      kind:'error',
      title:'No pudimos contactar con el servicio',
      body:'Parece un problema de red o de conexión con Supabase.',
      hint:'Comprueba tu conexión y, si persiste, revisa la URL y la clave pública de Supabase.'
    };
    if(text.includes('schema cache') || text.includes('could not find the table') || text.includes('does not exist')) return {
      kind:'warn',
      title:'Falta terminar la configuración de Supabase',
      body:'La autenticación funciona, pero no están listas las tablas que guardan perfil o progreso.',
      hint:'Ejecuta SUPABASE_SETUP.sql en el SQL Editor de Supabase y vuelve a cargar la web.'
    };
    if(context === 'register') return { kind:'error', title:'No se pudo crear la cuenta', body:raw, hint:'Revisa el email, la contraseña y la configuración de Auth en Supabase.' };
    if(context === 'forgot') return { kind:'error', title:'No se pudo preparar el enlace', body:raw, hint:'Comprueba que el proveedor de email y la URL de redirección estén configurados en Supabase.' };
    if(context === 'recovery') return { kind:'error', title:'No se pudo actualizar la contraseña', body:raw, hint:'Asegúrate de que el enlace de recuperación sigue siendo válido.' };
    if(context === 'login') return { kind:'error', title:'No se pudo iniciar sesión', body:raw, hint:'Comprueba el estado de Auth en Supabase e inténtalo de nuevo.' };
    return generic;
  }

  function setAuthMode(mode, message=''){
    const wanted=document.querySelector(`[data-auth-view="${mode}"]`) ? mode : 'login';
    document.querySelectorAll('[data-auth-view]').forEach(view=>{ view.hidden=view.dataset.authView!==wanted; });
    msg(message);
    const first=document.querySelector(`[data-auth-view="${wanted}"] input:not([type="checkbox"])`);
    setTimeout(()=>first?.focus(),0);
  }

  function setFormBusy(form,busy,label){
    if(!form) return;
    form.setAttribute('aria-busy',String(!!busy));
    [...form.elements].forEach(el=>{ if(el.type!=='checkbox') el.disabled=!!busy; });
    const submit=form.querySelector('[type="submit"]');
    if(!submit) return;
    if(busy){ submit.dataset.label=submit.textContent; submit.textContent=label||'Procesando…'; }
    else if(submit.dataset.label){ submit.textContent=submit.dataset.label; delete submit.dataset.label; }
  }

  function bindAuthUI(){
    document.querySelectorAll('[data-auth-mode]').forEach(btn=>btn.addEventListener('click',()=>setAuthMode(btn.dataset.authMode)));
    $('#showForgot')?.addEventListener('click',()=>setAuthMode('forgot'));
    $('#backToLogin')?.addEventListener('click',()=>setAuthMode('login'));

    document.querySelectorAll('[data-password-toggle]').forEach(btn=>btn.addEventListener('click',()=>{
      const input=btn.closest('.password-field')?.querySelector('input');
      if(!input) return;
      const reveal=input.type==='password';
      input.type=reveal?'text':'password';
      btn.textContent=reveal?'Ocultar':'Ver';
      btn.setAttribute('aria-label',reveal?'Ocultar contraseña':'Mostrar contraseña');
      btn.title=reveal?'Ocultar contraseña':'Mostrar contraseña';
    }));

    $('#loginForm')?.addEventListener('submit',async e=>{
      e.preventDefault();
      const form=e.currentTarget, fd=new FormData(form);
      clearFormFeedback(form);
      const email=String(fd.get('email')).trim();
      const password=String(fd.get('password'));
      if(!email || !password){
        markInvalid(form,[!email?'email':'',!password?'password':''].filter(Boolean));
        msg({kind:'error', title:'Faltan datos para entrar', body:'Necesitamos tu email y tu contraseña para iniciar sesión.', hint:'Si no recuerdas la contraseña, usa el enlace de recuperación.'});
        return;
      }
      if(!isLikelyEmail(email)){
        markInvalid(form,['email']);
        msg({kind:'error', title:'El email no parece válido', body:'Revisa la dirección escrita antes de continuar.', hint:'Debe tener un formato parecido a nombre@dominio.com.'});
        return;
      }
      markValid(form,['email','password']);
      msg({kind:'info', title:'Comprobando tus datos', body:'Estamos verificando la cuenta en USIC…'});
      setFormBusy(form,true,'Entrando…');
      try{
        const {error}=await client.auth.signInWithPassword({email,password});
        if(error){
          markInvalid(form,['email','password']);
          msg(authErrorDetails(error,'login'));
        }
      }catch(error){
        markInvalid(form,['email','password']);
        msg(authErrorDetails(error,'login'));
      }
      finally{ setFormBusy(form,false); }
    });

    $('#registerForm')?.addEventListener('submit',async e=>{
      e.preventDefault();
      const form=e.currentTarget, fd=new FormData(form);
      clearFormFeedback(form);
      const display_name=String(fd.get('display_name')).trim();
      const email=String(fd.get('email')).trim();
      const password=String(fd.get('password'));
      if(display_name.length < 2){ markInvalid(form,['display_name']); msg({kind:'error', title:'Tu nombre se ha quedado corto', body:'Usa al menos 2 caracteres para poder crear tu perfil.', hint:'Puedes poner tu nombre real o el nombre con el que quieras estudiar.'}); return; }
      if(!isLikelyEmail(email)){ markInvalid(form,['email']); msg({kind:'error', title:'El email no parece válido', body:'Revisa la dirección antes de crear la cuenta.', hint:'Debe tener un formato parecido a nombre@dominio.com.'}); return; }
      if(password.length<8){ markInvalid(form,['password']); msg({kind:'error', title:'La contraseña es demasiado corta', body:'USIC necesita una contraseña de al menos 8 caracteres.', hint:'Intenta usar una frase corta combinada con números o símbolos.'}); return; }
      markValid(form,['display_name','email','password']);
      msg({kind:'info', title:'Creando tu cuenta', body:'Estamos preparando tu acceso a USIC…'});
      setFormBusy(form,true,'Creando cuenta…');
      try{
        const {data,error}=await client.auth.signUp({
          email,password,
          options:{data:{display_name},emailRedirectTo:authRedirectUrl()}
        });
        if(error) { markInvalid(form,['email','password']); msg(authErrorDetails(error,'register')); }
        else if(!data.session) msg({kind:'ok', title:'Cuenta creada', body:'Revisa tu correo para confirmar el email antes de entrar.', hint:'Si no lo ves en unos minutos, revisa también spam o promociones.'});
      }catch(error){ markInvalid(form,['email','password']); msg(authErrorDetails(error,'register')); }
      finally{ setFormBusy(form,false); }
    });

    $('#forgotForm')?.addEventListener('submit',async e=>{
      e.preventDefault();
      const form=e.currentTarget, email=String(new FormData(form).get('email')).trim();
      clearFormFeedback(form);
      if(!email){ markInvalid(form,['email']); msg({kind:'error', title:'Falta el email', body:'Necesitamos saber a qué cuenta enviar el enlace de recuperación.', hint:'Escribe la dirección con la que te registraste.'}); return; }
      if(!isLikelyEmail(email)){ markInvalid(form,['email']); msg({kind:'error', title:'El email no parece válido', body:'Revisa la dirección antes de pedir el enlace.', hint:'Debe tener un formato parecido a nombre@dominio.com.'}); return; }
      markValid(form,['email']);
      msg({kind:'info', title:'Preparando el enlace seguro', body:'Estamos pidiendo a Supabase que genere tu recuperación…'});
      setFormBusy(form,true,'Enviando…');
      try{
        const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:authRedirectUrl()});
        msg(error ? authErrorDetails(error,'forgot') : {kind:'ok', title:'Enlace enviado', body:'Si la cuenta existe, recibirás un enlace de recuperación.', hint:'Revisa también la carpeta de spam o promociones.'});
      }catch(error){ msg(authErrorDetails(error,'forgot')); }
      finally{ setFormBusy(form,false); }
    });

    $('#recoveryForm')?.addEventListener('submit',async e=>{
      e.preventDefault();
      const form=e.currentTarget, fd=new FormData(form), password=String(fd.get('password')), confirm=String(fd.get('password_confirm'));
      clearFormFeedback(form);
      if(password.length<8){ markInvalid(form,['password']); msg({kind:'error', title:'La contraseña es demasiado corta', body:'Necesitas al menos 8 caracteres para continuar.', hint:'Usa una frase corta, con números o símbolos, que luego puedas recordar.'}); return; }
      if(password!==confirm){ markInvalid(form,['password','password_confirm']); msg({kind:'error', title:'Las contraseñas no coinciden', body:'Los dos campos deben contener exactamente la misma contraseña.', hint:'Vuelve a escribirla en ambos campos para evitar errores al entrar.'}); return; }
      markValid(form,['password','password_confirm']);
      msg({kind:'info', title:'Actualizando contraseña', body:'Estamos guardando tu nueva credencial de acceso…'});
      setFormBusy(form,true,'Guardando…');
      try{
        const {error}=await client.auth.updateUser({password});
        if(error){ markInvalid(form,['password','password_confirm']); msg(authErrorDetails(error,'recovery')); }
        else { msg({kind:'ok', title:'Contraseña actualizada', body:'Ya puedes volver a entrar con tu nueva contraseña.', hint:'Te llevaremos otra vez al acceso para continuar.'}); setTimeout(()=>setAuthMode('login'),900); }
      }catch(error){ markInvalid(form,['password','password_confirm']); msg(authErrorDetails(error,'recovery')); }
      finally{ setFormBusy(form,false); }
    });
  }

  async function updatePassword(password){
    return client.auth.updateUser({password});
  }
  async function updateProfile(fields){
    if(!session?.user) throw new Error('No hay sesión');
    const patch={id:session.user.id,...fields,updated_at:new Date().toISOString()};
    if(!profileCloudAvailable){
      profile={...(profile||{}),...patch};
      writeLocalProfile(session.user.id, profile);
      updateProfileUI();
      showCloudWarning('El perfil se mantiene solo en este navegador mientras la nube no esté disponible');
      return profile;
    }
    const {data,error}=await client.from('profiles').upsert(patch,{onConflict:'id'}).select().single();
    if(error){
      profile={...(profile||{}),...patch};
      writeLocalProfile(session.user.id, profile);
      updateProfileUI();
      if(missingTable(error,'profiles')){
        profileCloudAvailable=false;
        setSyncIndicator('Solo local','local');
        showCloudWarning('Falta la tabla public.profiles en Supabase','profile');
      } else {
        profileCloudAvailable=true;
        setSyncIndicator('Reintento pendiente','warn');
        showCloudWarning('Los cambios del perfil están guardados localmente y pendientes de sincronizar','profile');
      }
      return profile;
    }
    profileCloudAvailable=true; clearCloudWarning('profile'); profile=data; writeLocalProfile(session.user.id, profile); updateProfileUI(); return data;
  }
  async function signOut(){
    const userId=session?.user?.id;
    if(userId && window.STORE) writeLocalState(userId, window.STORE.snapshot());
    await syncNow();
    await stopStudySession();
    sessionGeneration++;
    const result=await client.auth.signOut();
    if(result?.error && typeof window.toast==='function') window.toast('La sesión local se cerró, pero Supabase no confirmó el cierre remoto.','warning');
    session=null;
    handledUserId=null;
    handlingUserId=null;
    if(window.STORE) STORE.replaceState({completed:[],errors:[],minutes:0,streak:0,lastLesson:null,lessonActivity:{},practiceAttempts:{}});
    clearLocalStateOwner();
    profile=null; updateProfileUI(); showGate();
    if(result?.error) return {error:result.error};
    return {error:null};
  }

  async function migrateLocalGoals(userId){
    const local=readLocalGoals(userId);
    if(!local.length || !goalsCloudAvailable) return;
    const payload=local.map(g=>({
      id:g.id,user_id:userId,title:String(g.title||'').slice(0,120),metric:g.metric,target:Number(g.target),area_id:g.area_id||null,deadline:g.deadline||null,status:g.status||'active',created_at:g.created_at||new Date().toISOString(),updated_at:g.updated_at||new Date().toISOString()
    })).filter(g=>g.title && ['lessons','minutes','area_percent'].includes(g.metric) && Number.isFinite(g.target) && g.target>0);
    if(!payload.length){ writeLocalGoals(userId,[]); return; }
    const {error}=await client.from('goals').upsert(payload,{onConflict:'id'});
    if(error) throw error;
    writeLocalGoals(userId,[]);
  }

  async function listGoals(){
    if(!session?.user) return [];
    const userId=session.user.id;
    if(!goalsCloudAvailable){
      return applyGoalOps([...readLocalGoalCache(userId),...readLocalGoals(userId)],readLocalGoalOps(userId));
    }
    let data=null, error=null;
    try {
      ({data,error}=await client.from('goals').select('*').eq('user_id',userId).order('created_at',{ascending:false}));
      if(error) throw error;
      await migrateLocalGoals(userId);
      await flushGoalOps(userId);
      ({data,error}=await client.from('goals').select('*').eq('user_id',userId).order('created_at',{ascending:false}));
      if(error) throw error;
      goalsCloudAvailable=true;
      clearCloudWarning('goals');
      writeLocalGoalCache(userId,data||[]);
      return data||[];
    } catch(err){
      if(missingTable(err,'goals')){
        goalsCloudAvailable=false;
        showCloudWarning('Falta la tabla public.goals en Supabase','goals');
        return applyGoalOps([...readLocalGoalCache(userId),...readLocalGoals(userId)],readLocalGoalOps(userId));
      }
      console.warn('No se pudieron sincronizar los objetivos:',err);
      showCloudWarning('Hay cambios de objetivos pendientes de sincronizar','goals');
      const visible=applyGoalOps((data&&data.length?data:readLocalGoalCache(userId)),readLocalGoalOps(userId));
      const legacy=readLocalGoals(userId);
      const byId=new Map([...visible,...legacy].map(g=>[g.id,g]));
      return [...byId.values()].sort((a,b)=>String(b.created_at||'').localeCompare(String(a.created_at||'')));
    }
  }
  async function createGoal(goal){
    if(!session?.user) throw new Error('No hay sesión activa.');
    const userId=session.user.id;
    const now=new Date().toISOString();
    const localData={id:crypto.randomUUID(),user_id:userId,status:'active',created_at:now,updated_at:now,...goal};
    if(!goalsCloudAvailable){
      const goals=readLocalGoals(userId); goals.unshift(localData); writeLocalGoals(userId,goals); return localData;
    }
    const {data,error}=await client.from('goals').insert({user_id:userId,...goal}).select().single();
    if(error){
      if(missingTable(error,'goals')){
        goalsCloudAvailable=false;
        showCloudWarning('Falta la tabla public.goals en Supabase','goals');
        const goals=readLocalGoals(userId); goals.unshift(localData); writeLocalGoals(userId,goals); return localData;
      }
      queueGoalOp(userId,{type:'create',id:localData.id,data:localData});
      showCloudWarning('El objetivo se guardó localmente y queda pendiente de sincronizar','goals');
      return localData;
    }
    clearCloudWarning('goals');
    return data;
  }
  async function updateGoal(id,patch){
    if(!session?.user) throw new Error('No hay sesión activa.');
    const userId=session.user.id;
    if(!goalsCloudAvailable){
      const goals=readLocalGoals(userId); const index=goals.findIndex(g=>g.id===id);
      if(index<0) throw new Error('No se encontró el objetivo.');
      goals[index]={...goals[index],...patch,updated_at:new Date().toISOString()}; writeLocalGoals(userId,goals); return goals[index];
    }
    const {data,error}=await client.from('goals').update({...patch,updated_at:new Date().toISOString()}).eq('id',id).select().single();
    if(error){
      if(missingTable(error,'goals')){
        goalsCloudAvailable=false;
        showCloudWarning('Falta la tabla public.goals en Supabase','goals');
        const goals=readLocalGoals(userId); const index=goals.findIndex(g=>g.id===id);
        if(index>=0){ goals[index]={...goals[index],...patch,updated_at:new Date().toISOString()}; writeLocalGoals(userId,goals); return goals[index]; }
      }
      queueGoalOp(userId,{type:'update',id,patch});
      showCloudWarning('El cambio del objetivo queda pendiente de sincronizar','goals');
      return {id,...patch,updated_at:new Date().toISOString()};
    }
    clearCloudWarning('goals');
    return data;
  }
  async function deleteGoal(id){
    if(!session?.user) throw new Error('No hay sesión activa.');
    const userId=session.user.id;
    if(!goalsCloudAvailable){
      writeLocalGoals(userId,readLocalGoals(userId).filter(g=>g.id!==id));
      const ops=readLocalGoalOps(userId).filter(op=>op.id!==id);
      writeLocalGoalOps(userId,ops);
      return;
    }
    const {error}=await client.from('goals').delete().eq('id',id);
    if(error){
      if(missingTable(error,'goals')){
        goalsCloudAvailable=false;
        showCloudWarning('Falta la tabla public.goals en Supabase','goals');
        writeLocalGoals(userId,readLocalGoals(userId).filter(g=>g.id!==id));
        return;
      }
      queueGoalOp(userId,{type:'delete',id});
      showCloudWarning('La eliminación queda pendiente de sincronizar','goals');
      return;
    }
    clearCloudWarning('goals');
  }


  async function maybeShowOnboarding(force=false){
    if(!session?.user || !profile) return;
    if(profile.onboarding_completed && !force) return;
    const modal=document.getElementById('onboardingModal');
    if(!modal) return;
    const form=document.getElementById('onboardingForm');
    const name=form?.elements?.display_name;
    const focus=form?.elements?.focus_area;
    const minutes=form?.elements?.weekly_goal_minutes;
    if(name) name.value=profile.display_name||'';
    if(focus) focus.value=profile.focus_area||'';
    if(minutes) minutes.value=Number(profile.weekly_goal_minutes)||180;
    if(modal.hidden) onboardingReturnFocus=document.activeElement;
    modal.hidden=false;
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    setTimeout(()=>{ (form?.elements?.display_name || form?.elements?.focus_area)?.focus?.(); },0);
  }

  function hideOnboarding(){
    const modal=document.getElementById('onboardingModal');
    if(modal){ modal.hidden=true; modal.setAttribute('aria-hidden','true'); }
    document.body.classList.remove('modal-open');
    const target=onboardingReturnFocus;
    onboardingReturnFocus=null;
    if(target && typeof target.focus==='function') setTimeout(()=>target.focus(),0);
  }

  function bindOnboardingUI(){
    const form=document.getElementById('onboardingForm');
    const modal=document.getElementById('onboardingModal');
    document.addEventListener('keydown',event=>{
      if(overlay && !overlay.hidden){
        const activeView=overlay.querySelector('[data-auth-view]:not([hidden])') || overlay;
        trapFocus(activeView,event);
      }
      if(modal && !modal.hidden){
        trapFocus(modal,event);
        if(event.key==='Escape'){
          event.preventDefault();
          document.getElementById('skipOnboarding')?.click();
        }
      }
    });
    form?.addEventListener('submit',async e=>{
      e.preventDefault();
      const out=document.getElementById('onboardingStatus');
      if(out){ out.textContent=''; delete out.dataset.kind; }
      const fd=new FormData(form);
      const displayName=String(fd.get('display_name')||'').trim();
      const rawWeekly=Number(fd.get('weekly_goal_minutes'));
      if(displayName.length<2){ if(out){out.textContent='El nombre visible debe tener al menos 2 caracteres.';out.dataset.kind='error';} form.elements.display_name?.focus(); return; }
      if(!Number.isFinite(rawWeekly) || rawWeekly<30 || rawWeekly>3000){ if(out){out.textContent='La meta semanal debe estar entre 30 y 3000 minutos.';out.dataset.kind='error';} form.elements.weekly_goal_minutes?.focus(); return; }
      const submit=form.querySelector('[type="submit"]');
      [...form.elements].forEach(el=>el.disabled=true);
      if(submit){submit.dataset.label=submit.textContent;submit.textContent='Guardando…';}
      try{
        await updateProfile({
          display_name:displayName,
          focus_area:String(fd.get('focus_area')||'')||null,
          weekly_goal_minutes:rawWeekly,
          onboarding_completed:true
        });
        hideOnboarding();
        window.dispatchEvent(new CustomEvent('usic-profile-updated'));
      }catch(error){
        if(out){ out.textContent=authErrorDetails(error).body || 'No se pudo guardar la configuración.'; out.dataset.kind='error'; }
      }finally{
        [...form.elements].forEach(el=>el.disabled=false);
        if(submit?.dataset.label){submit.textContent=submit.dataset.label;delete submit.dataset.label;}
      }
    });
    document.getElementById('skipOnboarding')?.addEventListener('click',async e=>{
      const button=e.currentTarget;
      const out=document.getElementById('onboardingStatus');
      if(out){out.textContent='';delete out.dataset.kind;}
      button.disabled=true;
      try{
        await updateProfile({onboarding_completed:true});
        hideOnboarding();
      }catch(error){
        if(out){ out.textContent=authErrorDetails(error).body || 'No se pudo guardar esta preferencia.'; out.dataset.kind='error'; }
      }finally{ if(button.isConnected) button.disabled=false; }
    });
  }

  async function recentSessions(days=90){ return studyStats(days); }

  function bindStudyActivity(){
    if(activityListenersBound) return;
    activityListenersBound=true;
    const touch=()=>{ lastInteraction=Date.now(); };
    ['pointerdown','keydown','scroll','touchstart'].forEach(ev=>window.addEventListener(ev,touch,{passive:true}));
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState==='visible'){ lastInteraction=Date.now(); lastStudyTick=Date.now(); }
      else flushStudySession();
    });
  }

  async function flushStudySession(){
    if(!session?.user || !studySessionId || !studyStartedAt || !sessionsCloudAvailable) return;
    const now=Date.now();
    const prev=lastStudyTick||now;
    const elapsed=Math.max(0,Math.min(65,Math.round((now-prev)/1000)));
    if(document.visibilityState==='visible' && now-lastInteraction<90000) activeSeconds+=elapsed;
    lastStudyTick=now;
    try {
      const {error}=await client.from('study_sessions').upsert({
        id:studySessionId,user_id:session.user.id,started_at:studyStartedAt.toISOString(),
        last_seen_at:new Date(now).toISOString(),active_seconds:activeSeconds,
        last_lesson:window.STORE?.state?.lastLesson||null
      },{onConflict:'id'});
      if(error) throw error;
      sessionsCloudAvailable=true;
      clearCloudWarning('sessions');
    } catch(error){
      console.warn('No se pudo guardar la sesión de estudio cloud:',error);
      if(missingTable(error,'study_sessions')) {
        sessionsCloudAvailable=false;
        showCloudWarning('Falta la tabla public.study_sessions en Supabase','sessions');
      } else {
        showCloudWarning('No se pudieron sincronizar las estadísticas de estudio en este momento','sessions');
      }
    }
  }

  function startStudySession(){
    if(heartbeat || !session?.user || !sessionsCloudAvailable) return;
    bindStudyActivity();
    studySessionId=crypto.randomUUID(); studyStartedAt=new Date(); activeSeconds=0;
    lastInteraction=Date.now(); lastStudyTick=Date.now();
    heartbeat=setInterval(flushStudySession,30000);
    setTimeout(flushStudySession,2000);
  }
  async function stopStudySession(){
    if(studySessionId) await flushStudySession();
    if(heartbeat){clearInterval(heartbeat);heartbeat=null;}
    studySessionId=null; studyStartedAt=null; lastStudyTick=null;
  }
  async function studyStats(days=30){
    if(!session?.user) return [];
    if(!sessionsCloudAvailable) throw new Error('Las estadísticas cloud no están disponibles todavía.');
    const safeDays=Math.max(1,Math.min(365,Number(days)||30));
    const since=new Date(Date.now()-safeDays*86400000).toISOString();
    const {data,error}=await client.from('study_sessions').select('started_at,last_seen_at,active_seconds,last_lesson').eq('user_id',session.user.id).gte('started_at',since).order('started_at');
    if(error){
      if(missingTable(error,'study_sessions')){
        sessionsCloudAvailable=false;
        showCloudWarning('Falta la tabla public.study_sessions en Supabase','sessions');
      } else {
        showCloudWarning('No se pudieron recuperar las estadísticas de estudio en este momento','sessions');
      }
      throw error;
    }
    sessionsCloudAvailable=true;
    clearCloudWarning('sessions');
    return data||[];
  }

  async function recoverCloud(){
    if(!session?.user || recoveringCloud || hydrating) return;
    const now=Date.now();
    if(now-lastCloudRecovery<12000) return;
    lastCloudRecovery=now;
    recoveringCloud=true;
    const userId=session.user.id;
    try{
      // Rehabilitamos cada subsistema para comprobar si una caída temporal o una
      // configuración recién corregida ya se ha recuperado.
      profileCloudAvailable=true;
      stateCloudAvailable=true;
      goalsCloudAvailable=true;
      sessionsCloudAvailable=true;
      await ensureProfile(session.user);
      if(session?.user?.id!==userId) return;
      await hydrateCloudState();
      if(session?.user?.id!==userId) return;
      await listGoals().catch(()=>{});
      await flushStudySession();
      window.dispatchEvent(new CustomEvent('usic-cloud-recovered'));
    } finally { recoveringCloud=false; }
  }

  async function init(){
    showGate(); bindAuthUI(); bindOnboardingUI();
    if(window.STORE?.subscribe) STORE.subscribe(scheduleSync);
    window.addEventListener('online',recoverCloud);
    document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible' && cloudIssues.size) recoverCloud(); });
    client.auth.onAuthStateChange((event,next)=>{
      if(event==='PASSWORD_RECOVERY') {
        session=next || session;
        showGate();
        setAuthMode('recovery','Enlace verificado. Elige una contraseña nueva.');
        window.dispatchEvent(new CustomEvent('usic-password-recovery'));
        return;
      }
      if(event==='SIGNED_OUT') {
        setTimeout(()=>handleSession(null),0);
        return;
      }
      if(next){
        const changedUser=next.user?.id!==session?.user?.id;
        session=next;
        updateProfileUI();
        if(changedUser || !handledUserId) setTimeout(()=>handleSession(next),0);
      }
    });
    const {data,error}=await client.auth.getSession();
    if(error){
      console.warn('No se pudo recuperar la sesión:',error);
      showGate();
      setAuthMode('login');
      msg(authErrorDetails(error,'login'));
      return;
    }
    if(document.querySelector('[data-auth-view="recovery"]:not([hidden])')) { session=data.session; return; }
    await handleSession(data.session);
  }

  window.USIC_AUTH={client,get session(){return session;},get profile(){return profile;},signOut,updateProfile,updatePassword,listGoals,createGoal,updateGoal,deleteGoal,studyStats,recentSessions,syncNow,showOnboarding:()=>maybeShowOnboarding(true)};
  init();
})();
