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
    if ((kind === 'error' || kind === 'warn') && pieces.length) {
      requestAnimationFrame(() => status.focus());
    }
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
    return {
      ...remote,...local,
      completed:[...new Set([...(remote.completed||[]),...(local.completed||[])])],
      errors:[...errMap.values()].sort((a,b)=>(a.date||0)-(b.date||0)).slice(-100),
      minutes:Math.max(Number(local.minutes)||0,Number(remote.minutes)||0),
      streak:Math.max(Number(local.streak)||0,Number(remote.streak)||0),
      lastLesson:newestLocal>=newestRemote ? (local.lastLesson||remote.lastLesson) : (remote.lastLesson||local.lastLesson),
      lessonActivity:activity
    };
  }

  async function ensureProfile(user) {
    const display = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Estudiante';
    const fallback={id:user.id,display_name:display,email:user.email,onboarding_completed:true,weekly_goal_minutes:180,focus_area:null};
    let data=null, error=null;
    try {
      ({data,error}=await client.from('profiles').select('*').eq('id', user.id).maybeSingle());
      if (error && missingTable(error,'profiles')) {
        profileCloudAvailable=false;
        profile=fallback;
        updateProfileUI();
        setSyncIndicator('Solo local','local');
        showCloudWarning('Falta la tabla public.profiles en Supabase');
        return;
      }
      if (error) console.warn('No se pudo leer el perfil:',error.message);
      if (!data && !error) {
        const res=await client.from('profiles').upsert({id:user.id,display_name:display,email:user.email},{onConflict:'id'}).select().maybeSingle();
        data=res.data; error=res.error;
      }
    } catch (e) { error=e; }
    if (error) console.warn('Perfil no disponible:', error.message||error);
    profile=data || fallback;
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
      setSyncIndicator('Sincronizado','ok');
      window.dispatchEvent(new CustomEvent('usic-cloud-ready'));
    } catch(error) {
      console.warn('No se pudo sincronizar el progreso cloud:',error);
      stateCloudAvailable=false;
      setSyncIndicator('Solo local','local');
      if (missingTable(error,'user_state')) showCloudWarning('Falta la tabla public.user_state en Supabase');
      else showCloudWarning(error.message||String(error));
    } finally { hydrating=false; }
  }

  function showCloudWarning(text){
    const el=$('#cloudWarning');
    if (el){ el.hidden=false; el.textContent=`Sincronización cloud pendiente: ${text}. Ejecuta SUPABASE_SETUP.sql si aún no lo hiciste.`; }
  }

  async function syncNow(){
    if (!session?.user || !window.STORE || hydrating) return;
    clearTimeout(syncTimer);
    try {
      const {error}=await client.from('user_state').upsert({user_id:session.user.id,state:STORE.snapshot(),updated_at:new Date().toISOString()},{onConflict:'user_id'});
      if (error) throw error;
        stateCloudAvailable=true;
      setSyncIndicator('Sincronizado','ok');
    } catch(error){
      console.warn('Sync falló',error);
      if (missingTable(error,'user_state')) stateCloudAvailable=false;
      setSyncIndicator('Solo local','local');
    }
  }

  function scheduleSync(){
    if (!session?.user || hydrating) return;
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

  async function handleSession(nextSession){
    session=nextSession;
    if(!session){ await stopStudySession(); showGate(); return; }
    await ensureProfile(session.user);
    await hydrateCloudState();
    hideGate();
    startStudySession();
    if(typeof window.renderRoute==='function') window.renderRoute();
    setTimeout(()=>maybeShowOnboarding(),250);
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
      updateProfileUI();
      showCloudWarning('El perfil se mantiene solo en este navegador hasta que ejecutes SUPABASE_SETUP.sql');
      return profile;
    }
    const {data,error}=await client.from('profiles').upsert(patch,{onConflict:'id'}).select().single();
    if(error){
      if(missingTable(error,'profiles')){
        profileCloudAvailable=false;
        profile={...(profile||{}),...patch};
        updateProfileUI();
        setSyncIndicator('Solo local','local');
        showCloudWarning('Falta la tabla public.profiles en Supabase');
        return profile;
      }
      throw error;
    }
    profile=data; updateProfileUI(); return data;
  }
  async function signOut(){
    await syncNow();
    await stopStudySession();
    session=null;
    await client.auth.signOut();
    // Evita que dos cuentas que usen el mismo navegador mezclen su caché local.
    if(window.STORE) STORE.replaceState({completed:[],errors:[],minutes:0,streak:0,lastLesson:null,lessonActivity:{}});
    profile=null; updateProfileUI(); showGate();
  }

  async function listGoals(){
    if(!session?.user) return [];
    const {data,error}=await client.from('goals').select('*').eq('user_id',session.user.id).order('created_at',{ascending:false});
    if(error) throw error; return data||[];
  }
  async function createGoal(goal){
    const {data,error}=await client.from('goals').insert({user_id:session.user.id,...goal}).select().single();
    if(error) throw error; return data;
  }
  async function updateGoal(id,patch){
    const {data,error}=await client.from('goals').update({...patch,updated_at:new Date().toISOString()}).eq('id',id).select().single();
    if(error) throw error; return data;
  }
  async function deleteGoal(id){
    const {error}=await client.from('goals').delete().eq('id',id); if(error) throw error;
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
    modal.hidden=false;
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }

  function hideOnboarding(){
    const modal=document.getElementById('onboardingModal');
    if(modal){ modal.hidden=true; modal.setAttribute('aria-hidden','true'); }
    document.body.classList.remove('modal-open');
  }

  function bindOnboardingUI(){
    const form=document.getElementById('onboardingForm');
    form?.addEventListener('submit',async e=>{
      e.preventDefault();
      const fd=new FormData(form);
      const weekly=Math.max(30,Math.min(3000,Number(fd.get('weekly_goal_minutes'))||180));
      try{
        await updateProfile({
          display_name:String(fd.get('display_name')||'Estudiante').trim()||'Estudiante',
          focus_area:String(fd.get('focus_area')||'')||null,
          weekly_goal_minutes:weekly,
          onboarding_completed:true
        });
        hideOnboarding();
        window.dispatchEvent(new CustomEvent('usic-profile-updated'));
      }catch(error){
        const out=document.getElementById('onboardingStatus');
        if(out) out.textContent=error.message;
      }
    });
    document.getElementById('skipOnboarding')?.addEventListener('click',async()=>{
      try{ await updateProfile({onboarding_completed:true}); }catch(_){}
      hideOnboarding();
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
    if(!session?.user || !studySessionId || !studyStartedAt) return;
    const now=Date.now();
    const prev=lastStudyTick||now;
    const elapsed=Math.max(0,Math.min(65,Math.round((now-prev)/1000)));
    if(document.visibilityState==='visible' && now-lastInteraction<90000) activeSeconds+=elapsed;
    lastStudyTick=now;
    try {
      await client.from('study_sessions').upsert({
        id:studySessionId,user_id:session.user.id,started_at:studyStartedAt.toISOString(),
        last_seen_at:new Date(now).toISOString(),active_seconds:activeSeconds,
        last_lesson:window.STORE?.state?.lastLesson||null
      },{onConflict:'id'});
    } catch(_){}
  }

  function startStudySession(){
    if(heartbeat || !session?.user) return;
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
    const since=new Date(Date.now()-days*86400000).toISOString();
    const {data,error}=await client.from('study_sessions').select('started_at,last_seen_at,active_seconds,last_lesson').eq('user_id',session.user.id).gte('started_at',since).order('started_at');
    if(error) throw error; return data||[];
  }

  async function init(){
    showGate(); bindAuthUI(); bindOnboardingUI();
    if(window.STORE?.subscribe) STORE.subscribe(scheduleSync);
    client.auth.onAuthStateChange((event,next)=>{
      if(event==='PASSWORD_RECOVERY') {
        showGate();
        setAuthMode('recovery','Enlace verificado. Elige una contraseña nueva.');
        window.dispatchEvent(new CustomEvent('usic-password-recovery'));
        return;
      }
      if(event==='SIGNED_OUT') handleSession(null); else if(next && next?.user?.id!==session?.user?.id) setTimeout(()=>handleSession(next),0);
    });
    const {data}=await client.auth.getSession();
    if(document.querySelector('[data-auth-view="recovery"]:not([hidden])')) { session=data.session; return; }
    await handleSession(data.session);
  }

  window.USIC_AUTH={client,get session(){return session;},get profile(){return profile;},signOut,updateProfile,updatePassword,listGoals,createGoal,updateGoal,deleteGoal,studyStats,recentSessions,syncNow,showOnboarding:()=>maybeShowOnboarding(true)};
  init();
})();
