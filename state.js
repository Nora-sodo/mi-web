/**
 * Estado persistente de la aplicación.
 *
 * Centralizamos aquí el acceso a localStorage para que el resto del código
 * no dependa de cómo guardamos los datos. Si mañana migramos a una API,
 * este será uno de los pocos archivos que tendremos que cambiar.
 */
(function createStore() {
  const STORAGE_KEY = "usic-state-v2";

  const defaultState = {
    completed: [],
    errors: [],
    minutes: 0,
    streak: 0,
    lastLesson: "informacion",
    lessonActivity: {}
  };

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const merged = { ...defaultState, ...(saved || {}) };
      if (!merged.lessonActivity || typeof merged.lessonActivity !== "object" || Array.isArray(merged.lessonActivity)) {
        merged.lessonActivity = {};
      }
      return merged;
    } catch (error) {
      console.warn("No se pudo leer el progreso guardado. Se usarán valores iniciales.", error);
      return { ...defaultState };
    }
  }

  const state = load();
  const listeners = new Set();

  function notify() {
    listeners.forEach(listener => {
      try { listener(state); } catch (error) { console.warn("Listener de progreso falló", error); }
    });
  }

  let storageWarningShown = false;

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      storageWarningShown = false;
      return true;
    } catch (error) {
      // La aplicación sigue funcionando en memoria aunque el navegador bloquee
      // localStorage (modo privado restrictivo, cuota agotada o políticas del sitio).
      if (!storageWarningShown) {
        console.warn("No se pudo guardar el progreso localmente; se mantendrá solo durante esta sesión.", error);
        storageWarningShown = true;
        window.dispatchEvent(new CustomEvent("usic-storage-warning", { detail: { message: error?.message || String(error) } }));
      }
      return false;
    }
  }

  function save() {
    const persisted = persist();
    notify();
    return persisted;
  }

  function replaceState(nextState) {
    Object.keys(state).forEach(key => delete state[key]);
    Object.assign(state, { ...defaultState, ...(nextState || {}) });
    if (!state.lessonActivity || typeof state.lessonActivity !== "object" || Array.isArray(state.lessonActivity)) state.lessonActivity = {};
    if (!Array.isArray(state.completed)) state.completed = [];
    if (!Array.isArray(state.errors)) state.errors = [];
    const persisted = persist();
    notify();
    return persisted;
  }

  function snapshot() {
    return JSON.parse(JSON.stringify(state));
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function touchLesson(lessonId) {
    const now = Date.now();
    const current = state.lessonActivity[lessonId] || { firstOpenedAt: now, visits: 0 };
    state.lessonActivity[lessonId] = {
      ...current,
      firstOpenedAt: current.firstOpenedAt || now,
      lastOpenedAt: now,
      visits: (current.visits || 0) + 1
    };
    state.lastLesson = lessonId;
    save();
  }

  function completeLesson(lessonId, minutes) {
    const now = Date.now();
    if (!state.completed.includes(lessonId)) {
      state.completed.push(lessonId);
      state.minutes += minutes;
    }
    const current = state.lessonActivity[lessonId] || { firstOpenedAt: now, visits: 1 };
    state.lessonActivity[lessonId] = { ...current, completedAt: current.completedAt || now, lastOpenedAt: now };
    state.lastLesson = lessonId;
    save();
  }

  function registerError(lessonId, topic, problem) {
    state.errors.push({
      lessonId,
      topic,
      problem,
      date: Date.now()
    });

    // Evitamos que localStorage se convierta en un museo arqueológico del fallo.
    state.errors = state.errors.slice(-100);
    save();
  }

  function setLastLesson(lessonId) {
    state.lastLesson = lessonId;
    save();
  }

  window.STORE = {
    state,
    save,
    completeLesson,
    registerError,
    setLastLesson,
    touchLesson,
    replaceState,
    snapshot,
    subscribe
  };
})();
