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
    minutes: 82,
    streak: 7,
    lastLesson: "informacion"
  };

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return { ...defaultState, ...(saved || {}) };
    } catch (error) {
      console.warn("No se pudo leer el progreso guardado. Se usarán valores iniciales.", error);
      return { ...defaultState };
    }
  }

  const state = load();

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function completeLesson(lessonId, minutes) {
    if (!state.completed.includes(lessonId)) {
      state.completed.push(lessonId);
      state.minutes += minutes;
    }
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
    setLastLesson
  };
})();
