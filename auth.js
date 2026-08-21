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

  const $ = (q, scope=document) => scope.querySelector(q);
  const overlay = $('#authGate');
  const status = $('#authStatus');

  function msg(text, kind='info') {
    if (!status) return;
    status.textContent = text || '';
    status.dataset.kind = kind;
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
    let { data, error } = await client.from('profiles').select('*').eq('id', user.id).maybeSingle();
    if (error && !/does not exist/i.test(error.message)) console.warn(error);
    if (!data) {
      const res=await client.from('profiles').upsert({id:user.id,display_name:display,email:user.email},{onConflict:'id'}).select().maybeSingle();
      data=res.data; error=res.error;
    }
    if (error) console.warn('Perfil no disponible:', error.message);
    profile=data || {id:user.id,display_name:display,email:user.email,onboarding_completed:false,weekly_goal_minutes:180,focus_area:null};
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
    try {
      const {data,error}=await client.from('user_state').select('state,updated_at').eq('user_id',session.user.id).maybeSingle();
      if (error) throw error;
      const local=STORE.snapshot();
      const merged=mergeStates(local,data?.state||null);
      STORE.replaceState(merged);
      await client.from('user_state').upsert({user_id:session.user.id,state:STORE.snapshot(),updated_at:new Date().toISOString()},{onConflict:'user_id'});
      window.dispatchEvent(new CustomEvent('usic-cloud-ready'));
    } catch(error) {
      console.warn('No se pudo sincronizar el progreso cloud:',error);
      showCloudWarning(error.message);
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
      const indicator=$('#syncIndicator');
      if(indicator){ indicator.textContent='Sincronizado'; indicator.dataset.state='ok'; }
    } catch(error){
      console.warn('Sync falló',error);
      const indicator=$('#syncIndicator');
      if(indicator){ indicator.textContent='Solo local'; indicator.dataset.state='warn'; }
    }
  }

  function scheduleSync(){
    if (!session?.user || hydrating) return;
    const indicator=$('#syncIndicator');
    if(indicator){ indicator.textContent='Guardando…'; indicator.dataset.state='busy'; }
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

  function authErrorMessage(error){
    const raw=String(error?.message||error||'No se pudo completar la operación.');
    const text=raw.toLowerCase();
    if(text.includes('invalid login credentials')) return 'Email o contraseña incorrectos.';
    if(text.includes('email not confirmed')) return 'Confirma tu email antes de iniciar sesión.';
    if(text.includes('user already registered')) return 'Ya existe una cuenta con ese email.';
    if(text.includes('password should be')) return 'La contraseña no cumple los requisitos de seguridad.';
    if(text.includes('rate limit') || text.includes('too many')) return 'Demasiados intentos. Espera un momento y vuelve a probar.';
    if(text.includes('network') || text.includes('fetch')) return 'No hay conexión con el servicio de acceso. Comprueba tu red.';
    return raw;
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
      msg('Comprobando tus datos…'); setFormBusy(form,true,'Entrando…');
      try{
        const {error}=await client.auth.signInWithPassword({email:String(fd.get('email')).trim(),password:String(fd.get('password'))});
        if(error) msg(authErrorMessage(error),'error');
      }catch(error){ msg(authErrorMessage(error),'error'); }
      finally{ setFormBusy(form,false); }
    });

    $('#registerForm')?.addEventListener('submit',async e=>{
      e.preventDefault();
      const form=e.currentTarget, fd=new FormData(form), password=String(fd.get('password'));
      if(password.length<8){msg('Usa al menos 8 caracteres.','error');return;}
      msg('Creando tu cuenta…'); setFormBusy(form,true,'Creando cuenta…');
      try{
        const {data,error}=await client.auth.signUp({
          email:String(fd.get('email')).trim(),password,
          options:{data:{display_name:String(fd.get('display_name')).trim()},emailRedirectTo:authRedirectUrl()}
        });
        if(error) msg(authErrorMessage(error),'error');
        else if(!data.session) msg('Cuenta creada. Revisa tu correo para confirmar el email.','ok');
      }catch(error){ msg(authErrorMessage(error),'error'); }
      finally{ setFormBusy(form,false); }
    });

    $('#forgotForm')?.addEventListener('submit',async e=>{
      e.preventDefault();
      const form=e.currentTarget, email=String(new FormData(form).get('email')).trim();
      msg('Preparando el enlace seguro…'); setFormBusy(form,true,'Enviando…');
      try{
        const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:authRedirectUrl()});
        msg(error?authErrorMessage(error):'Si la cuenta existe, recibirás un enlace de recuperación.','ok');
        if(error) status.dataset.kind='error';
      }catch(error){ msg(authErrorMessage(error),'error'); }
      finally{ setFormBusy(form,false); }
    });

    $('#recoveryForm')?.addEventListener('submit',async e=>{
      e.preventDefault();
      const form=e.currentTarget, fd=new FormData(form), password=String(fd.get('password')), confirm=String(fd.get('password_confirm'));
      if(password.length<8){ msg('La contraseña debe tener al menos 8 caracteres.','error'); return; }
      if(password!==confirm){ msg('Las dos contraseñas no coinciden.','error'); return; }
      msg('Actualizando contraseña…'); setFormBusy(form,true,'Guardando…');
      try{
        const {error}=await client.auth.updateUser({password});
        if(error) msg(authErrorMessage(error),'error');
        else { msg('Contraseña actualizada correctamente. Ya puedes continuar.','ok'); setTimeout(()=>setAuthMode('login'),900); }
      }catch(error){ msg(authErrorMessage(error),'error'); }
      finally{ setFormBusy(form,false); }
    });
  }

  async function updatePassword(password){
    return client.auth.updateUser({password});
  }
  async function updateProfile(fields){
    if(!session?.user) throw new Error('No hay sesión');
    const patch={id:session.user.id,...fields,updated_at:new Date().toISOString()};
    const {data,error}=await client.from('profiles').upsert(patch,{onConflict:'id'}).select().single();
    if(error) throw error; profile=data; updateProfileUI(); return data;
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
