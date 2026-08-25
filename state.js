/**
 * Estado persistente de la aplicación.
 * Separamos "clase terminada" de "tema dominado" y programamos repasos espaciados.
 */
(function createStore() {
  const STORAGE_KEY = "usic-state-v2";
  const REVIEW_INTERVALS_DAYS = [1, 3, 7, 14, 30, 60, 120];

  const defaultState = {
    completed: [],            // Dominio demostrado (compatibilidad con versiones previas)
    finished: [],             // Clase recorrida/terminada, aunque el dominio siga pendiente
    errors: [],
    minutes: 0,
    streak: 0,
    lastLesson: null,
    lessonActivity: {},
    practiceAttempts: {},
    quickChecks: {},
    mastery: {},
    reviewSchedule: {}
  };

  function normalizeState(input) {
    const source = input && typeof input === "object" && !Array.isArray(input) ? input : {};
    const merged = { ...defaultState, ...source };
    ["lessonActivity","practiceAttempts","quickChecks","mastery","reviewSchedule"].forEach(key => {
      if (!merged[key] || typeof merged[key] !== "object" || Array.isArray(merged[key])) merged[key] = {};
    });
    merged.completed = Array.isArray(merged.completed) ? [...new Set(merged.completed.filter(id => typeof id === "string"))] : [];
    merged.finished = Array.isArray(merged.finished) ? [...new Set(merged.finished.filter(id => typeof id === "string"))] : [];
    merged.errors = Array.isArray(merged.errors) ? merged.errors.filter(item => item && typeof item === "object" && !Array.isArray(item)).slice(-100) : [];
    merged.minutes = Number.isFinite(Number(merged.minutes)) ? Math.max(0, Number(merged.minutes)) : 0;
    merged.streak = Number.isFinite(Number(merged.streak)) ? Math.max(0, Number(merged.streak)) : 0;
    merged.lastLesson = typeof merged.lastLesson === "string" ? merged.lastLesson : null;

    // Migración no destructiva: lo que la versión anterior ya marcó como dominado se conserva.
    merged.completed.forEach(id => {
      if (!merged.finished.includes(id)) merged.finished.push(id);
      if (!merged.mastery[id]) merged.mastery[id] = { status: "mastered", masteredAt: merged.lessonActivity[id]?.completedAt || Date.now(), legacy: true };
    });
    return merged;
  }

  function load() {
    try { return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
    catch (error) {
      console.warn("No se pudo leer el progreso guardado. Se usarán valores iniciales.", error);
      return normalizeState();
    }
  }

  const state = load();
  const listeners = new Set();
  function notify(){ listeners.forEach(listener => { try { listener(state); } catch(error){ console.warn("Listener de progreso falló", error); } }); }
  let storageWarningShown = false;
  function persist(){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); storageWarningShown=false; return true; }
    catch(error){
      if(!storageWarningShown){
        console.warn("No se pudo guardar el progreso localmente; se mantendrá solo durante esta sesión.", error);
        storageWarningShown=true;
        window.dispatchEvent(new CustomEvent("usic-storage-warning", {detail:{message:error?.message||String(error)}}));
      }
      return false;
    }
  }
  function save(){ const ok=persist(); notify(); return ok; }
  function replaceState(nextState){
    Object.keys(state).forEach(key=>delete state[key]);
    Object.assign(state, normalizeState(nextState));
    return save();
  }
  function snapshot(){ return JSON.parse(JSON.stringify(state)); }
  function subscribe(listener){ listeners.add(listener); return ()=>listeners.delete(listener); }

  function touchLesson(lessonId){
    const now=Date.now();
    const current=state.lessonActivity[lessonId]||{firstOpenedAt:now,visits:0};
    state.lessonActivity[lessonId]={...current,firstOpenedAt:current.firstOpenedAt||now,lastOpenedAt:now,visits:(current.visits||0)+1};
    state.lastLesson=lessonId; save();
  }

  function finishLesson(lessonId, minutes){
    const now=Date.now();
    if(!state.finished.includes(lessonId)){
      state.finished.push(lessonId);
      state.minutes += Number(minutes)||0;
    }
    const current=state.lessonActivity[lessonId]||{firstOpenedAt:now,visits:1};
    state.lessonActivity[lessonId]={...current,finishedAt:current.finishedAt||now,lastOpenedAt:now};
    state.lastLesson=lessonId; save();
  }

  function masterLesson(lessonId){
    const now=Date.now();
    if(!state.completed.includes(lessonId)) state.completed.push(lessonId);
    if(!state.finished.includes(lessonId)) state.finished.push(lessonId);
    state.mastery[lessonId]={status:"mastered",masteredAt:state.mastery[lessonId]?.masteredAt||now,lastVerifiedAt:now};
    const firstDue=now+REVIEW_INTERVALS_DAYS[0]*86400000;
    state.reviewSchedule[lessonId]={stage:0,dueAt:firstDue,lastResult:"mastered",lastReviewedAt:now};
    const current=state.lessonActivity[lessonId]||{firstOpenedAt:now,visits:1};
    state.lessonActivity[lessonId]={...current,completedAt:current.completedAt||now,lastOpenedAt:now};
    state.lastLesson=lessonId; save();
  }

  // Alias para compatibilidad con código/importaciones antiguas.
  function completeLesson(lessonId, minutes){ finishLesson(lessonId, minutes); masterLesson(lessonId); }

  function registerQuickCheck(lessonId, correct){
    const current=state.quickChecks[lessonId]||{attempts:0,correct:false};
    state.quickChecks[lessonId]={attempts:(current.attempts||0)+1,correct:Boolean(current.correct||correct),lastAttemptAt:Date.now()};
    save();
  }

  function registerError(lessonId, topic, problem){
    state.errors.push({lessonId,topic,problem,date:Date.now()});
    state.errors=state.errors.slice(-100); save();
  }

  function registerPracticeAttempt(lessonId, level, correct, options={}){
    const key=`${lessonId}:${level}`;
    const current=state.practiceAttempts[key]||{attempts:0,correct:false,revealed:false,qualified:false};
    const wasRevealed=Boolean(current.revealed);
    const selfUnderstood=options.selfAssessed === "understood";
    const qualifies=Boolean((correct || selfUnderstood) && !wasRevealed && !options.revealed);
    state.practiceAttempts[key]={
      attempts:(Number(current.attempts)||0)+(options.countAttempt===false?0:1),
      correct:Boolean(current.correct||correct),
      qualified:Boolean(current.qualified||qualifies),
      revealed:Boolean(current.revealed||options.revealed),
      selfAssessed:options.selfAssessed||current.selfAssessed||null,
      lastAttemptAt:Date.now()
    };
    save();
  }

  function registerReviewResult(lessonId, remembered){
    const now=Date.now();
    const current=state.reviewSchedule[lessonId]||{stage:0};
    let stage=Number(current.stage)||0;
    if(remembered) stage=Math.min(stage+1, REVIEW_INTERVALS_DAYS.length-1);
    else stage=0;
    state.reviewSchedule[lessonId]={
      stage,
      dueAt:now+REVIEW_INTERVALS_DAYS[stage]*86400000,
      lastResult:remembered?"remembered":"forgotten",
      lastReviewedAt:now
    };
    if(!remembered) state.mastery[lessonId]={...(state.mastery[lessonId]||{}),status:"needs-review"};
    else if(state.completed.includes(lessonId)) state.mastery[lessonId]={...(state.mastery[lessonId]||{}),status:"mastered",lastVerifiedAt:now};
    save();
  }

  function setLastLesson(lessonId){ state.lastLesson=lessonId; save(); }

  window.STORE={state,save,completeLesson,finishLesson,masterLesson,registerQuickCheck,registerError,registerPracticeAttempt,registerReviewResult,setLastLesson,touchLesson,replaceState,snapshot,subscribe};
})();
