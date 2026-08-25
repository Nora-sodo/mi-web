/**
 * USIC — Aplicación principal
 *
 * Responsabilidades de este archivo:
 * 1. Resolver rutas.
 * 2. Renderizar vistas.
 * 3. Conectar eventos de interfaz.
 *
 * Los datos del currículo viven en data.js, el contenido didáctico en
 * content/block-XXX.js y la persistencia en state.js. La separación es deliberada:
 * crecer hasta 78 bloques no debería obligarnos a convertir este archivo
 * en una criatura mitológica de 9.000 líneas.
 */

// -----------------------------------------------------------------------------
// Utilidades de DOM y formato
// -----------------------------------------------------------------------------

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const view = $("#view");
const state = STORE.state;

function escapeHtml(value) {
  return String(value).replace(/[&<>\"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  })[character]);
}

function normalizeAnswer(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function formatCourseNumber(courseId) {
  return String(courseId).padStart(3, "0");
}

function toast(message, kind = "info") {
  let region = document.getElementById("toastRegion");
  if (!region) {
    region = document.createElement("div");
    region.id = "toastRegion";
    region.className = "toast-region";
    region.setAttribute("aria-label", "Notificaciones");
    document.body.append(region);
  }
  const element = document.createElement("div");
  element.className = `toast toast-${kind}`;
  element.textContent = message;
  element.setAttribute("role", kind === "error" ? "alert" : "status");
  element.setAttribute("aria-live", kind === "error" ? "assertive" : "polite");
  element.setAttribute("aria-atomic", "true");
  region.append(element);
  while (region.children.length > 4) region.firstElementChild?.remove();
  setTimeout(() => element.remove(), kind === "error" ? 5200 : kind === "warning" ? 4200 : 3200);
}


// -----------------------------------------------------------------------------
// Orientación curricular: permite entrar por cualquier lección sin ir a ciegas.
// -----------------------------------------------------------------------------

const COURSE_FOUNDATIONS = {
  3:[2], 4:[2,3], 5:[2,4], 6:[5], 7:[5,6], 8:[5], 9:[2,5,6], 10:[6,9],
  11:[6,9,10], 12:[5,6,9], 13:[8,12], 14:[3,5,12], 15:[8,12,14],
  16:[3,4], 17:[16], 18:[17], 19:[18], 20:[18], 21:[18,20], 22:[1,2],
  23:[12,15,22], 24:[20,21,22,23], 25:[6,8,9,11], 26:[6,9,10,11],
  27:[11,15,21,26], 28:[1,2], 29:[2,28], 30:[2,29], 31:[1,28,30],
  32:[29,30,31], 33:[2,29,30], 34:[2,29,30], 35:[5,8,34], 36:[34,35],
  37:[29,30,34,36], 38:[34,35,36,37], 39:[9,12,38], 40:[29,30,39],
  41:[29,34,39], 42:[28,39,40], 43:[30,33,39], 44:[18,20,39], 45:[9,39],
  46:[2,34], 47:[], 48:[2,30,33,34,47], 49:[6,10,48], 50:[29,30,34,36,48],
  51:[30,33,47], 52:[3,30,33], 53:[3,4,5], 54:[12,53], 55:[4,5],
  56:[3,16,52,53], 57:[9,28], 58:[28,57], 59:[5,9,12], 60:[29,30,31,32],
  61:[29,30,31,60], 62:[29,31,61], 63:[29,62], 64:[20,31,63], 65:[31,32,60],
  66:[31,32,61,62], 67:[9,12], 68:[67], 69:[9,67], 70:[18,20,59,67],
  71:[57,59,67], 72:[12,13,15], 73:[19,70,72], 74:[7,8,11,59],
  75:[11,15,38,68,74], 76:[], 77:[67,74,76], 78:[67,69,74,75,77]
};

function findLessonLocation(lesson) {
  const path = LEARNING_PATHS[String(lesson.courseId)];
  if (!path) return null;
  for (let moduleIndex = 0; moduleIndex < path.modules.length; moduleIndex += 1) {
    const module = path.modules[moduleIndex];
    const lessonIndex = module.lessons.indexOf(lesson.id);
    if (lessonIndex !== -1) return { path, module, moduleIndex, lessonIndex };
  }
  return null;
}

function courseStarter(courseId) {
  const path = LEARNING_PATHS[String(courseId)];
  const firstId = path?.modules?.[0]?.lessons?.[0];
  return firstId ? LESSONS[firstId] : null;
}


const ORIENTATION_STOPWORDS = new Set([
  "para","como","esta","este","estos","estas","desde","entre","sobre","hacia","hasta","donde","cuando","porque",
  "que","del","las","los","una","uno","unos","unas","con","sin","por","sus","son","ser","muy","mas","menos",
  "modelo","sistema","sistemas","concepto","conceptos","tema","leccion","usar","uso","permite","forma","parte"
]);

function orientationTokens(text) {
  return normalizeAnswer(text)
    .replace(/[^a-z0-9ñáéíóúü]+/gi, " ")
    .split(/\s+/)
    .filter(token => token.length >= 4 && !ORIENTATION_STOPWORDS.has(token));
}

function bestFoundationLesson(targetLesson, courseId) {
  const candidates = developedLessonsForCourse(courseId);
  if (!candidates.length) return null;
  const targetText = `${targetLesson.title} ${targetLesson.objective} ${targetLesson.concept} ${(targetLesson.summary || []).join(" ")}`;
  const targetTokens = new Set(orientationTokens(targetText));
  let best = null;
  let bestScore = -1;

  candidates.forEach(candidate => {
    const titleTokens = orientationTokens(candidate.title);
    const bodyTokens = orientationTokens(`${candidate.objective} ${candidate.concept} ${(candidate.summary || []).join(" ")}`);
    const titleHits = titleTokens.filter(token => targetTokens.has(token)).length;
    const bodyHits = bodyTokens.filter(token => targetTokens.has(token)).length;
    const score = titleHits * 4 + bodyHits;
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  });

  // Con vocabularios muy distintos la similitud léxica no ayuda: en ese caso
  // enlazamos al inicio del bloque y dejamos que su mapa curricular oriente.
  return bestScore > 0 ? best : courseStarter(courseId);
}


function renderCourseOrientation(courseId, targetLessonId) {
  const foundationIds = COURSE_FOUNDATIONS[courseId] || [];
  if (!foundationIds.length) {
    return `
      <section class="course-orientation panel">
        <span class="eyebrow">Punto de entrada</span>
        <h2>Puedes empezar este bloque directamente</h2>
        <p>No tiene previos obligatorios dentro de esta universidad. Si entras desde cero, empieza por el primer módulo y usa las guías de cada lección para decidir cuándo necesitas un repaso adicional.</p>
      </section>
    `;
  }

  const target = LESSONS[targetLessonId] || courseStarter(courseId);
  const items = foundationIds.slice(0, 4).map(baseId => {
    const baseCourse = COURSES.find(item => item.id === baseId);
    const baseLessons = developedLessonsForCourse(baseId);
    const done = baseLessons.length > 0 && baseLessons.every(item => state.completed.includes(item.id));
    const suggested = target ? bestFoundationLesson(target, baseId) : courseStarter(baseId);
    return { baseId, baseCourse, done, suggested };
  }).filter(item => item.baseCourse);

  return `
    <section class="course-orientation panel">
      <div class="orientation-heading">
        <div>
          <span class="eyebrow">Orientación antes de entrar</span>
          <h2>Qué conviene saber y dónde repasarlo</h2>
        </div>
        <span class="orientation-position">${items.filter(item => item.done).length}/${items.length} bases cubiertas</span>
      </div>
      <p class="orientation-lead">Estos bloques son apoyo, no puertas cerradas. Entra en el tema que te interese y vuelve a uno de estos repasos solo cuando notes que te falta esa base.</p>
      <div class="orientation-list compact">
        ${items.map(item => `
          <button class="orientation-item ${item.done ? "done" : ""}" data-nav="${item.suggested ? 'tema' : 'curso'}" data-nav-arg="${item.suggested ? escapeHtml(item.suggested.id) : item.baseId}">
            <span class="orientation-status" aria-hidden="true">${item.done ? "✓" : "→"}</span>
            <span>
              <small>${item.done ? "Base ya cubierta" : "Base recomendada"}</small>
              <strong>Bloque ${formatCourseNumber(item.baseId)} · ${escapeHtml(item.baseCourse.name)}</strong>
              <em>${item.suggested ? `Repaso sugerido: «${escapeHtml(item.suggested.title)}».` : "Abrir mapa del bloque."}</em>
            </span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderLessonOrientation(lesson) {
  const location = findLessonLocation(lesson);
  if (!location) return "";

  const { path, module, moduleIndex, lessonIndex } = location;
  const priorItems = [];

  if (lessonIndex > 0) {
    const previous = LESSONS[module.lessons[lessonIndex - 1]];
    if (previous) priorItems.push({
      kind: "Previo directo",
      title: previous.title,
      detail: "Es el paso inmediatamente anterior de este módulo.",
      nav: 'tema',
      navArg: previous.id,
      done: state.completed.includes(previous.id)
    });
  } else if (moduleIndex > 0) {
    const previousModule = path.modules[moduleIndex - 1];
    const bridgeId = previousModule.lessons[previousModule.lessons.length - 1];
    const bridge = LESSONS[bridgeId];
    if (bridge) priorItems.push({
      kind: "Puente recomendado",
      title: bridge.title,
      detail: `Cierra el módulo «${previousModule.title}» y prepara este salto.`,
      nav: 'tema',
      navArg: bridge.id,
      done: state.completed.includes(bridge.id)
    });
  }

  const foundationIds = COURSE_FOUNDATIONS[lesson.courseId] || [];
  foundationIds.slice(0, 3).forEach(courseId => {
    const course = COURSES.find(item => item.id === courseId);
    if (!course) return;
    const foundationLessons = developedLessonsForCourse(courseId);
    const courseDone = foundationLessons.length > 0 && foundationLessons.every(item => state.completed.includes(item.id));
    const target = bestFoundationLesson(lesson, courseId);
    priorItems.push({
      kind: "Base recomendada",
      title: `Bloque ${formatCourseNumber(courseId)} · ${course.name}`,
      detail: target
        ? `Repaso corto sugerido: «${target.title}». Si necesitas más contexto, desde ahí puedes abrir el bloque completo.`
        : "No necesitas memorizarlo entero: úsalo como repaso si aquí aparece un concepto que no reconoces.",
      nav: target ? 'tema' : 'curso',
      navArg: target ? target.id : courseId,
      done: courseDone
    });
  });

  const moduleStart = LESSONS[module.lessons[0]];
  const canStartHere = lessonIndex === 0 && moduleIndex === 0 && foundationIds.length === 0;
  const completedPrereqs = priorItems.filter(item => item.done).length;

  return `
    <section class="lesson-orientation" id="orientacion" aria-labelledby="orientationTitle">
      <div class="orientation-heading">
        <div>
          <span class="eyebrow">Orientación · entra por donde quieras</span>
          <h2 id="orientationTitle">Antes de empezar</h2>
        </div>
        <span class="orientation-position">Módulo ${moduleIndex + 1}/${path.modules.length} · Tema ${lessonIndex + 1}/${module.lessons.length}</span>
      </div>
      <p class="orientation-lead">${canStartHere
        ? "Puedes empezar aquí desde cero. La lección introduce las ideas que necesita antes de exigirlas."
        : "Puedes estudiar esta lección directamente. Si algún previo no te suena, no abandones el tema: abre solo el repaso indicado y vuelve después."}</p>

      ${priorItems.length ? `
        <div class="orientation-list">
          ${priorItems.map(item => `
            <button class="orientation-item ${item.done ? "done" : ""}" data-nav="${item.nav}" data-nav-arg="${escapeHtml(item.navArg)}">
              <span class="orientation-status" aria-hidden="true">${item.done ? "✓" : "→"}</span>
              <span>
                <small>${escapeHtml(item.kind)}${item.done ? " · ya dominado" : ""}</small>
                <strong>${escapeHtml(item.title)}</strong>
                <em>${escapeHtml(item.detail)}</em>
              </span>
            </button>
          `).join("")}
        </div>
      ` : `<div class="orientation-ready">✓ No hay prerrequisitos obligatorios para entrar en este bloque.</div>`}

      <div class="orientation-actions">
        ${lessonIndex > 0 && moduleStart ? `<button class="btn btn-secondary" data-nav="tema" data-nav-arg="${escapeHtml(moduleStart.id)}">Empezar este módulo desde el principio</button>` : ""}
        ${foundationIds.length ? `<span>${completedPrereqs}/${priorItems.length} previos orientativos ya cubiertos.</span>` : `<span>Ruta de entrada autónoma.</span>`}
      </div>
      <p class="orientation-note"><b>Cómo usar esta guía:</b> “base recomendada” no significa bloqueo. Empieza el tema; si aparece una palabra, fórmula o mecanismo que no entiendes, usa el enlace de repaso y regresa. Así no tienes que completar otra rama entera antes de estudiar lo que te interesa.</p>
    </section>
  `;
}

// -----------------------------------------------------------------------------
// Navegación
// -----------------------------------------------------------------------------

function route(name, argument) {
  location.hash = argument ? `${name}/${argument}` : name;
}

function setActiveNavigation(routeName) {
  $$(".nav-item[data-route]").forEach(button => {
    const active = button.dataset.route === routeName;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

function updateNavBadges() {
  const badge = document.getElementById("reviewBadge");
  if (!badge) return;
  const count = Math.min(reviewQueue().length, 99);
  badge.textContent = String(count);
  badge.hidden = count === 0;
}

function repairRuntimeState() {
  const objectKeys = ["lessonActivity","practiceAttempts","quickChecks","mastery","reviewSchedule"];
  objectKeys.forEach(key => {
    if (!state[key] || typeof state[key] !== "object" || Array.isArray(state[key])) state[key] = {};
  });
  state.completed = Array.isArray(state.completed) ? [...new Set(state.completed.filter(id => typeof id === "string" && LESSONS[id]))] : [];
  state.finished = Array.isArray(state.finished) ? [...new Set(state.finished.filter(id => typeof id === "string" && LESSONS[id]))] : [];
  state.errors = Array.isArray(state.errors) ? state.errors.filter(item => item && typeof item === "object" && !Array.isArray(item)).slice(-100) : [];
  state.minutes = Number.isFinite(Number(state.minutes)) ? Math.max(0, Number(state.minutes)) : 0;
  state.streak = Number.isFinite(Number(state.streak)) ? Math.max(0, Number(state.streak)) : 0;
  if (state.lastLesson && !LESSONS[state.lastLesson]) state.lastLesson = null;
}

function renderRoute() {
  repairRuntimeState();
  const rawRoute = location.hash.slice(1) || "inicio";
  const [routeName, argument] = rawRoute.split("/");
  try {
    updateNavBadges();
    updateTopbarStreak();
    setActiveNavigation(routeName);
    window.scrollTo(0, 0);

    if (routeName === "curso") return renderCourse(Number(argument));
    if (routeName === "tema") return renderLesson(argument);
    if (routeName === "objetivo") return renderGoalArea(argument);
    if (routeName === "lab") return renderLab(argument);

    const pages = {
      inicio: renderHome,
      aprender: renderCatalog,
      repasar: renderReview,
      biblioteca: renderLibrary,
      progreso: renderProgress,
      objetivos: renderGoals,
      cuenta: renderAccount,
      errores: renderErrors,
      laboratorio: renderLabHub
    };
    const page = pages[routeName];
    if (!page) {
      history.replaceState(null, '', `${location.pathname}${location.search}#inicio`);
      setActiveNavigation('inicio');
      return renderHome();
    }
    return page();
  } catch (error) {
    console.error(`[USIC] Error al renderizar #${rawRoute}:`, error);
    if (view) {
      view.innerHTML = `<section class="panel route-recovery"><span class="eyebrow">Recuperación de interfaz</span><h1>No pudimos abrir esta sección</h1><p>El resto de la aplicación sigue disponible. Prueba otra sección o recarga la página.</p><button class="btn btn-primary" data-nav="inicio">Volver al inicio</button></section>`;
    }
    reportUnexpectedUiError(error, `#${rawRoute}`);
  }
}

// -----------------------------------------------------------------------------
// Métricas de progreso
// -----------------------------------------------------------------------------

function developedLessonsForCourse(courseId) {
  return Object.values(LESSONS).filter(lesson => lesson.courseId === courseId);
}

function courseProgress(courseId) {
  const lessons = developedLessonsForCourse(courseId);
  if (!lessons.length) return 0;

  const completed = lessons.filter(lesson => state.completed.includes(lesson.id)).length;
  return Math.round((completed / lessons.length) * 100);
}

function totalProgress() {
  const lessonIds = Object.keys(LESSONS);
  if (!lessonIds.length) return 0;
  return Math.round((state.completed.filter(id => lessonIds.includes(id)).length / lessonIds.length) * 100);
}

function orderedDevelopedLessonIds() {
  return Object.keys(LEARNING_PATHS)
    .map(Number)
    .sort((a, b) => a - b)
    .flatMap(courseId => LEARNING_PATHS[courseId].modules.flatMap(module => module.lessons));
}

function nextLesson() {
  const orderedIds = orderedDevelopedLessonIds();
  if (!orderedIds.length) return null;

  // Si la última lección abierta sigue pendiente, "continuar" significa volver
  // exactamente a ella. Si ya está dominada, avanzamos a la siguiente pendiente.
  const lastIndex = orderedIds.indexOf(state.lastLesson);
  if (lastIndex >= 0 && !state.completed.includes(state.lastLesson)) {
    return state.lastLesson;
  }

  if (lastIndex >= 0) {
    const afterLast = orderedIds
      .slice(lastIndex + 1)
      .find(id => !state.completed.includes(id));
    if (afterLast) return afterLast;
  }

  return orderedIds.find(id => !state.completed.includes(id)) || state.lastLesson || orderedIds[0];
}

// -----------------------------------------------------------------------------
// Componentes reutilizables
// -----------------------------------------------------------------------------

function courseCard(course) {
  const developed = developedLessonsForCourse(course.id).length;
  const extra = developed ? `${developed} lecciones desarrolladas` : `${course.topics.length} conceptos mapeados`;

  return `
    <article class="course-card" data-nav="curso" data-nav-arg="${course.id}">
      <span class="course-num">BLOQUE ${formatCourseNumber(course.id)}</span>
      <h3>${escapeHtml(course.name)}</h3>
      <p>${escapeHtml(course.title || course.topics.slice(0, 3).join(" · "))}</p>
      <footer>
        <span>${extra}</span>
        <span class="pill">Experto progresivo</span>
      </footer>
    </article>
  `;
}

function progressBar(value) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
  return `
    <div class="progress-track" role="progressbar" aria-label="Progreso" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${safeValue}">
      <i style="width:${safeValue}%"></i>
    </div>
  `;
}

function lessonStatus(lessonId) {
  if (state.completed.includes(lessonId)) return "Dominada";
  if (state.finished?.includes(lessonId)) return "Terminada · dominio pendiente";
  if (state.lessonActivity && state.lessonActivity[lessonId]) return "En curso";
  return "Sin empezar";
}

function lessonStatusClass(lessonId) {
  if (state.completed.includes(lessonId)) return "done";
  if (state.finished?.includes(lessonId)) return "started";
  if (state.lessonActivity && state.lessonActivity[lessonId]) return "started";
  return "new";
}

function lessonsForArea(area) {
  const allowed = new Set(area.blocks);
  return Object.values(LESSONS)
    .filter(lesson => allowed.has(lesson.courseId))
    .sort((a, b) => {
      const af = area.focus.includes(a.courseId) ? 0 : 1;
      const bf = area.focus.includes(b.courseId) ? 0 : 1;
      if (af !== bf) return af - bf;
      if (a.courseId !== b.courseId) return a.courseId - b.courseId;
      return String(a.id).localeCompare(String(b.id));
    });
}

function areaLessonStats(area) {
  const lessons = lessonsForArea(area);
  const completed = lessons.filter(l => state.completed.includes(l.id)).length;
  const started = lessons.filter(l => !state.completed.includes(l.id) && state.lessonActivity && state.lessonActivity[l.id]).length;
  return { total: lessons.length, completed, started };
}

// -----------------------------------------------------------------------------
// Inicio
// -----------------------------------------------------------------------------

function localStudyStreak() {
  const activity = state.lessonActivity || {};
  const days = new Set(Object.values(activity).map(item => Number(item?.lastOpenedAt || item?.completedAt || 0)).filter(Boolean).map(ts => {
    const d = new Date(ts);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }));
  if (!days.size) return 0;
  const oneDay = 86400000;
  const today = new Date(); today.setHours(12,0,0,0);
  let cursor = new Date(today);
  const key = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  if (!days.has(key(cursor))) cursor = new Date(cursor.getTime() - oneDay);
  let streak = 0;
  while (days.has(key(cursor))) {
    streak += 1;
    cursor = new Date(cursor.getTime() - oneDay);
  }
  return streak;
}

function reviewQueue() {
  const activity = state.lessonActivity || {};
  const now = Date.now();
  const due = (state.completed || []).filter(id => LESSONS[id]).map(id => {
    const schedule = state.reviewSchedule?.[id];
    const fallback = Number(activity[id]?.completedAt || activity[id]?.lastOpenedAt || 0) + 7 * 86400000;
    return {
      lessonId: id,
      topic: LESSONS[id].shortTitle || LESSONS[id].title,
      dueAt: Number(schedule?.dueAt || fallback),
      stage: Number(schedule?.stage || 0),
      problem: `Recuperación espaciada · ronda ${Number(schedule?.stage || 0) + 1}: explica la idea y resuelve una comprobación sin abrir primero la teoría.`
    };
  }).filter(item => item.dueAt && item.dueAt <= now).sort((a,b) => a.dueAt - b.dueAt);

  const recentCutoff = now - 30 * 86400000;
  const latestErrorByLesson = new Map();
  [...(state.errors || [])].reverse().forEach(item => {
    if (!item?.lessonId || !LESSONS[item.lessonId] || latestErrorByLesson.has(item.lessonId)) return;
    if (Number(item.date || 0) < recentCutoff) return;
    const reviewedAt = Number(state.reviewSchedule?.[item.lessonId]?.lastReviewedAt || 0);
    if (reviewedAt >= Number(item.date || 0)) return;
    latestErrorByLesson.set(item.lessonId, {...item, dueAt: Number(item.date || 0), stage: 0});
  });
  const merged = [...latestErrorByLesson.values(), ...due];
  const seen = new Set();
  return merged.filter(item => !seen.has(item.lessonId) && seen.add(item.lessonId)).slice(0, 8);
}

function updateTopbarStreak() {
  const current = localStudyStreak();
  const topbar = document.querySelector('.streak');
  if (!topbar) return;
  topbar.textContent = `${current} día${current === 1 ? '' : 's'} · racha`;
  topbar.title = current ? 'Racha basada en días en los que has abierto o completado alguna lección en este navegador.' : 'Todavía no hay actividad suficiente para formar una racha.';
}

function renderHome() {
  const lesson = LESSONS[nextLesson()];
  const course = COURSES.find(item => item.id === lesson.courseId);
  const blockProgress = courseProgress(lesson.courseId);
  const areaStats = GOAL_AREAS.map(area => ({ area, stats: areaLessonStats(area) }));
  const streak = localStudyStreak();
  const reviewItems = reviewQueue();

  view.innerHTML = `
    <section class="hero-grid">
      <article class="hero-card">
        <span class="eyebrow">Tu siguiente paso · Bloque ${formatCourseNumber(lesson.courseId)}</span>
        <h1>${escapeHtml(lesson.title)}</h1>
        <p>${escapeHtml(lesson.objective)}</p>
        <div class="continue-row">
          <button class="btn btn-primary" data-nav="tema" data-nav-arg="${escapeHtml(lesson.id)}">
            ${state.completed.includes(lesson.id) ? "Repasar" : "Continuar donde lo dejaste"} →
          </button>
          <button class="btn btn-secondary" data-nav="curso" data-nav-arg="${lesson.courseId}">Ver curso</button>
        </div>
      </article>

      <aside class="hero-side">
        <div class="metric-card">
          <span class="eyebrow">Progreso del Bloque ${formatCourseNumber(lesson.courseId)}</span>
          <strong>${blockProgress}%</strong>
          <p>Medimos lecciones desarrolladas y dominadas. Los numeritos no sustituyen saber explicar el tema.</p>
          ${progressBar(blockProgress)}
        </div>
        <div class="metric-card">
          <span class="eyebrow">Tiempo de estudio</span>
          <strong>${state.minutes} min</strong>
          <p>${streak} día${streak === 1 ? '' : 's'} de racha. Útil como contexto; insuficiente como religión.</p>
        </div>
      </aside>
    </section>

    <div class="section-head">
      <div>
        <span class="eyebrow">Tus 10 áreas</span>
        <h2>Elige qué quieres estudiar hoy</h2>
      </div>
      <button data-nav="aprender">Ver todas las áreas →</button>
    </div>

    <div class="goal-grid home-areas">
      ${areaStats.map(({ area }) => goalAreaCard(area)).join("")}
    </div>

    <div class="home-bottom">
      <article class="panel recommend">
        <span class="eyebrow">Recomendación</span>
        <h3>${escapeHtml(lesson.shortTitle)}</h3>
        <p>Es la siguiente pieza no dominada de la ruta. La plataforma intenta evitar el método académico tradicional de “abrir 14 pestañas y esperar iluminación”.</p>
        <button class="btn btn-primary" data-nav="tema" data-nav-arg="${escapeHtml(lesson.id)}">
          Estudiar · ~${lesson.duration} min
        </button>
      </article>

      <article class="panel">
        <span class="eyebrow">Repasos pendientes</span>
        <h3>${reviewItems.length ? `${reviewItems.length} ${reviewItems.length === 1 ? 'elemento prioritario' : 'elementos prioritarios'}` : 'Nada urgente por repasar'}</h3>
        <p>${reviewItems.length ? 'Fallos recientes y conceptos clave vuelven a aparecer mediante recuperación activa.' : 'Cuando haya errores o temas dominados que lleven tiempo sin abrirse, aparecerán aquí.'}</p>
        <button class="btn btn-secondary" data-nav="${reviewItems.length ? 'repasar' : 'aprender'}">${reviewItems.length ? 'Abrir repaso' : 'Seguir aprendiendo'}</button>
      </article>
    </div>
  `;
}


// -----------------------------------------------------------------------------
// Recursos visuales y bibliografía guiada
// -----------------------------------------------------------------------------

function areaForLesson(lesson) {
  const focus = GOAL_AREAS.find(area => area.focus && area.focus.includes(lesson.courseId));
  if (focus) return focus;
  return GOAL_AREAS.find(area => area.blocks && area.blocks.includes(lesson.courseId)) || null;
}

function visualsForLesson(lesson) {
  const all = window.LEARNING_VISUALS || [];
  const area = areaForLesson(lesson);
  const matches = all.filter(item => (item.lessonIds || []).includes(lesson.id) || (item.blocks || []).includes(lesson.courseId));
  if (!matches.length && area) return all.filter(item => item.area === area.id).slice(0, 1);
  // El material específico forma una secuencia de estudio. Permitimos hasta 4 figuras exactas;
  // los recursos genéricos de bloque/área solo completan si no hay suficiente material específico.
  const ordered = matches.sort((a, b) => {
    const exactA = Number((a.lessonIds || []).includes(lesson.id));
    const exactB = Number((b.lessonIds || []).includes(lesson.id));
    if (exactA !== exactB) return exactB - exactA;
    const orderA = Number.isFinite(Number(a.studyOrder)) ? Number(a.studyOrder) : 99;
    const orderB = Number.isFinite(Number(b.studyOrder)) ? Number(b.studyOrder) : 99;
    if (orderA !== orderB) return orderA - orderB;
    return Number(b.area === (area && area.id)) - Number(a.area === (area && area.id));
  });
  const exactCount = ordered.filter(item => (item.lessonIds || []).includes(lesson.id)).length;
  return ordered.slice(0, exactCount >= 3 ? 4 : 2);
}

function booksForLesson(lesson) {
  const area = areaForLesson(lesson);
  const specific = (window.LESSON_READING && LESSON_READING[lesson.id]) || [];
  const general = area && window.BOOK_LIBRARY ? (BOOK_LIBRARY[area.id] || []) : [];
  // Prioriza una lectura específica de la lección y completa con bibliografía del área sin duplicar títulos.
  const seen = new Set();
  return [...specific, ...general].filter(book => {
    const key = (book.title || '').toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 3);
}

function renderVisualCard(item, index = 0, total = 1) {
  const sequence = total > 1 ? `<span class="visual-step">Figura ${index + 1} de ${total}</span>` : '';
  return `
    <figure class="learning-visual">
      <a class="learning-visual-image" href="${escapeHtml(item.source)}" target="_blank" rel="noopener noreferrer" title="Abrir la fuente original">
        <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || item.title)}" loading="lazy" decoding="async" onerror="this.closest('.learning-visual').classList.add('image-failed')">
        <span class="image-fallback">La imagen no pudo cargarse. Abre la fuente original.</span>
      </a>
      <figcaption>
        <div class="visual-meta-row">${sequence}<span class="source-pill">${escapeHtml(item.license || 'Fuente externa')}</span></div>
        <div class="visual-title-row"><b>${escapeHtml(item.title)}</b></div>
        <p>${escapeHtml(item.caption)}</p>
        <small>${escapeHtml(item.credit || '')} · <a href="${escapeHtml(item.source)}" target="_blank" rel="noopener noreferrer">fuente y licencia ↗</a></small>
      </figcaption>
    </figure>
  `;
}

function renderLessonVisuals(lesson) {
  const visuals = visualsForLesson(lesson);
  if (!visuals.length) return '';
  return `
    <section class="lesson-section" id="visuales">
      <span class="eyebrow">Apoyo visual</span>
      <h2>Mira el mecanismo, no solo la definición</h2>
      <p class="section-intro">Estas imágenes vienen de fuentes externas con atribución visible. Cuando haya varias, léelas en orden como una secuencia: primero construye el modelo general y después baja a conflictos, estados o detalles del mecanismo.</p>
      <div class="learning-visual-grid">${visuals.map((item, index) => renderVisualCard(item, index, visuals.length)).join('')}</div>
    </section>
  `;
}

function renderBookCard(book) {
  const body = `
      <span class="book-level">${escapeHtml(book.level || 'Recomendado')}</span>
      <h3>${escapeHtml(book.title)}</h3>
      <p class="book-author">${escapeHtml(book.author || '')}</p>
      <p>${escapeHtml(book.note || '')}</p>
      <span class="book-link-label">${book.url ? 'Ver recurso ↗' : 'Añadir a la lista de lectura'}</span>`;
  return book.url
    ? `<a class="book-card" href="${escapeHtml(book.url)}" target="_blank" rel="noopener noreferrer">${body}</a>`
    : `<article class="book-card">${body}</article>`;
}

function renderLessonBooks(lesson) {
  const books = booksForLesson(lesson);
  if (!books.length) return '';
  const area = areaForLesson(lesson);
  return `
    <section class="lesson-section" id="libros-leccion">
      <span class="eyebrow">Para profundizar</span>
      <h2>Libros y referencias para continuar</h2>
      <p class="section-intro">No necesitas leerlos todos. Elige uno según tu nivel y vuelve a la lección para comprobar que puedes conectar el libro con mecanismos concretos.</p>
      <div class="book-grid">${books.map(renderBookCard).join('')}</div>
      ${area ? `<button class="text-link-button" data-nav="objetivo" data-nav-arg="${escapeHtml(area.id)}">Volver al área ${escapeHtml(area.name)} →</button>` : ''}
    </section>
  `;
}

function renderAreaResources(area) {
  const visuals = (window.LEARNING_VISUALS || []).filter(item => item.area === area.id).slice(0, 2);
  const books = (window.BOOK_LIBRARY && BOOK_LIBRARY[area.id]) || [];
  if (!visuals.length && !books.length) return '';
  return `
    <section class="area-resource-section">
      ${visuals.length ? `
        <article class="panel area-resource-panel">
          <span class="eyebrow">Apoyo visual de la ruta</span>
          <h2>Una imagen para orientarte</h2>
          <div class="learning-visual-grid compact">${visuals.map((item, index) => renderVisualCard(item, index, visuals.length)).join('')}</div>
        </article>` : ''}
      ${books.length ? `
        <article class="panel area-resource-panel">
          <span class="eyebrow">Bibliografía guiada</span>
          <h2>Qué leer si quieres ir más lejos</h2>
          <div class="book-grid compact">${books.map(renderBookCard).join('')}</div>
        </article>` : ''}
    </section>
  `;
}

// -----------------------------------------------------------------------------
// Áreas de aprendizaje orientadas a objetivos
// -----------------------------------------------------------------------------

function goalAreaProgress(area) {
  const lessons = lessonsForArea(area);
  if (!lessons.length) return 0;
  const completed = lessons.filter(lesson => state.completed.includes(lesson.id)).length;
  return Math.round((completed / lessons.length) * 100);
}

function goalAreaCard(area) {
  const progress = goalAreaProgress(area);
  const stats = areaLessonStats(area);
  return `
    <article class="goal-card" data-nav="objetivo" data-nav-arg="${escapeHtml(area.id)}">
      <span class="eyebrow">${escapeHtml(area.subtitle)}</span>
      <h3>${escapeHtml(area.name)}</h3>
      <p>${escapeHtml(area.description)}</p>
      <div class="goal-meta">
        <span>${stats.total} lecciones · ${stats.started} en curso · ${stats.completed} dominadas</span>
        <span class="pill">${escapeHtml(area.badge)}</span>
      </div>
      ${progressBar(progress)}
    </article>
  `;
}

function renderGoalArea(areaId) {
  const area = GOAL_AREAS.find(item => item.id === areaId);
  if (!area) {
    renderNotFound("No existe esa área de aprendizaje.");
    return;
  }

  const lessons = lessonsForArea(area);
  const stats = areaLessonStats(area);

  view.innerHTML = `
    <section class="goal-hero">
      <div>
        <span class="eyebrow">Área de aprendizaje · ${escapeHtml(area.subtitle)}</span>
        <h1>${escapeHtml(area.name)}</h1>
        <p>${escapeHtml(area.description)}</p>
        <p class="free-choice-note"><strong>Ruta abierta:</strong> puedes empezar por cualquier lección. Las recomendaciones orientan; nunca bloquean contenido.</p>
      </div>
      <aside class="goal-summary">
        <strong>${goalAreaProgress(area)}%</strong>
        <span>${stats.completed}/${stats.total} dominadas · ${stats.started} en curso</span>
        ${progressBar(goalAreaProgress(area))}
      </aside>
    </section>

    ${renderAreaResources(area)}

    <section class="panel area-controls">
      <div>
        <span class="eyebrow">Lecciones de ${escapeHtml(area.name)}</span>
        <h2>Elige exactamente qué quieres aprender</h2>
      </div>
      <input id="areaLessonSearch" class="area-search" type="search" placeholder="Buscar dentro de esta área…" aria-label="Buscar lecciones en ${escapeHtml(area.name)}">
      <div class="filter-row area-filter-row">
        <button class="chip active" data-area-status="all">Todas</button>
        <button class="chip" data-area-status="new">Sin empezar</button>
        <button class="chip" data-area-status="started">En curso</button>
        <button class="chip" data-area-status="done">Dominadas</button>
      </div>
    </section>

    <div class="area-lesson-grid" id="areaLessonGrid">
      ${renderAreaLessonCards(area, lessons)}
    </div>

    <details class="panel area-blocks">
      <summary><strong>Ver también la organización técnica por bloques</strong></summary>
      <div class="catalog-grid">
        ${area.blocks.map(id => COURSES.find(course => course.id === id)).filter(Boolean).map(courseCard).join("")}
      </div>
    </details>
  `;

  bindAreaLessonFilters(area);
}

function renderAreaLessonCards(area, lessons) {
  if (!lessons.length) return `<div class="empty-note">Todavía no hay lecciones desarrolladas en esta área.</div>`;
  return lessons.map(lesson => {
    const course = COURSES.find(item => item.id === lesson.courseId);
    const status = lessonStatus(lesson.id);
    const statusClass = lessonStatusClass(lesson.id);
    const isFocus = area.focus.includes(lesson.courseId);
    const activity = state.lessonActivity && state.lessonActivity[lesson.id];
    const visits = activity && activity.visits ? `${activity.visits} visita${activity.visits === 1 ? "" : "s"}` : "No abierta";
    return `
      <button class="area-lesson-card ${statusClass}" data-status="${statusClass}" data-search="${escapeHtml(normalizeAnswer(`${lesson.title} ${lesson.shortTitle} ${course ? course.name : ""}`))}" data-nav="tema" data-nav-arg="${escapeHtml(lesson.id)}">
        <span class="area-lesson-top">
          <span class="eyebrow">${isFocus ? "NÚCLEO · " : ""}BLOQUE ${formatCourseNumber(lesson.courseId)}</span>
          <span class="lesson-state ${statusClass}">${status}</span>
        </span>
        <strong>${escapeHtml(lesson.title)}</strong>
        <small>${escapeHtml(course ? course.name : "")} · ~${lesson.duration} min · ${visits}</small>
      </button>
    `;
  }).join("");
}

function bindAreaLessonFilters(area) {
  const input = document.getElementById("areaLessonSearch");
  const buttons = $$(".area-filter-row [data-area-status]");
  let status = "all";

  const apply = () => {
    const term = normalizeAnswer(input ? input.value : "");
    $$("#areaLessonGrid .area-lesson-card").forEach(card => {
      const statusOk = status === "all" || card.dataset.status === status;
      const textOk = !term || card.dataset.search.includes(term);
      card.hidden = !(statusOk && textOk);
    });
  };

  if (input) input.addEventListener("input", apply);
  buttons.forEach(button => button.addEventListener("click", () => {
    buttons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    status = button.dataset.areaStatus;
    apply();
  }));
}

// -----------------------------------------------------------------------------
// Catálogo y curso
// -----------------------------------------------------------------------------

function renderCatalog() {
  view.innerHTML = `
    <div class="page-title">
      <span class="eyebrow">Tu mapa de aprendizaje</span>
      <h1>Aprender por objetivos</h1>
      <p>El currículo conserva sus 78 bloques técnicos, pero ahora puedes recorrerlo por las áreas generales que realmente quieres dominar. Los bloques pueden aparecer en varias rutas cuando comparten fundamentos.</p>
    </div>

    <div class="goal-grid">
      ${GOAL_AREAS.map(goalAreaCard).join("")}
    </div>

    <div class="section-head catalog-all-head">
      <div>
        <span class="eyebrow">Índice técnico</span>
        <h2>Los 78 bloques</h2>
      </div>
    </div>

    <div class="filter-row">
      <button class="chip active" data-filter="">Todos</button>
      <button class="chip" data-filter="SISTEM">Sistemas</button>
      <button class="chip" data-filter="RED|INTERNET|TRANSPORTE">Redes</button>
      <button class="chip" data-filter="SEGUR|CRIPTO|EXPLOT|REVERSE|MALWARE">Seguridad</button>
      <button class="chip" data-filter="GRÁF|GPU|VIDEOJUEG|ANIMACIÓN|AUDIO">Gráficos y juegos</button>
      <button class="chip" data-filter="INTELIGENCIA|NEUR|TRANSFORM|LANGUAGE|LEARNING|GENERAT">IA</button>
      <button class="chip" data-filter="ELECTR|MICROCONTROL|FPGA|PCB|EMBEB">Electrónica</button>
    </div>

    <div class="catalog-grid" id="catalogGrid">
      ${COURSES.map(courseCard).join("")}
    </div>
  `;

  bindCatalogFilters();
}

function bindCatalogFilters() {
  $$(".filter-row .chip").forEach(button => {
    button.addEventListener("click", () => {
      $$(".filter-row .chip").forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      const expression = button.dataset.filter;
      const regex = expression ? new RegExp(expression, "i") : null;
      const filtered = regex
        ? COURSES.filter(course => regex.test(`${course.name} ${course.title}`))
        : COURSES;

      $("#catalogGrid").innerHTML = filtered.map(courseCard).join("");
    });
  });
}

function renderCourse(courseId) {
  const course = COURSES.find(item => item.id === courseId);
  if (!course) {
    renderNotFound("No existe ese bloque.");
    return;
  }

  const path = LEARNING_PATHS[courseId];

  if (!path) {
    renderMappedCourse(course);
    return;
  }

  const progress = courseProgress(courseId);
  const firstPending = path.modules
    .flatMap(module => module.lessons)
    .find(id => !state.completed.includes(id)) || path.modules[0].lessons[0];

  view.innerHTML = `
    <section class="course-hero">
      <div>
        <span class="eyebrow">BLOQUE ${formatCourseNumber(course.id)}</span>
        <h1>${escapeHtml(course.name)}</h1>
        <p>${escapeHtml(path.description)}</p>
        <button class="btn btn-primary" data-nav="tema" data-nav-arg="${escapeHtml(firstPending)}">
          ${progress ? "Continuar" : "Empezar"} →
        </button>
      </div>

      <div class="course-meta">
        <div><small>Nivel</small><b>${path.level}</b></div>
        <div><small>Duración aproximada</small><b>${path.estimatedHours} h</b></div>
        <div><small>Progreso</small><b>${progress}%</b></div>
        ${progressBar(progress)}
      </div>
    </section>

    ${renderCourseOrientation(courseId, firstPending)}

    <section class="panel course-outcomes">
      <span class="eyebrow">Qué vas a aprender</span>
      <ul>${path.outcomes.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>

    <div class="section-head">
      <div>
        <span class="eyebrow">Temario completo desarrollado</span>
        <h2>${path.modules.length} módulos · ${path.modules.flatMap(module => module.lessons).length} lecciones</h2>
      </div>
    </div>

    <div class="module-list">
      ${path.modules.map(module => renderModule(module)).join("")}
    </div>
  `;
}

function renderModule(module) {
  const completedCount = module.lessons.filter(id => state.completed.includes(id)).length;
  const percentage = Math.round((completedCount / module.lessons.length) * 100);

  return `
    <article class="module-card">
      <header>
        <div>
          <span class="eyebrow">${completedCount}/${module.lessons.length} lecciones</span>
          <h3>${escapeHtml(module.title)}</h3>
          <p>${escapeHtml(module.description)}</p>
        </div>
        <strong>${percentage}%</strong>
      </header>
      ${progressBar(percentage)}
      <div class="module-lessons">
        ${module.lessons.map((lessonId, index) => {
          const lesson = LESSONS[lessonId];
          return `
            <button class="lesson-row" data-nav="tema" data-nav-arg="${escapeHtml(lesson.id)}">
              <span class="lesson-index">${index + 1}</span>
              <span>
                <b>${escapeHtml(lesson.title)}</b>
                <small>${lesson.duration} min · ${lessonStatus(lesson.id)}</small>
              </span>
              <span>→</span>
            </button>
          `;
        }).join("")}
      </div>
    </article>
  `;
}

function renderMappedCourse(course) {
  view.innerHTML = `
    <div class="page-title">
      <span class="eyebrow">BLOQUE ${formatCourseNumber(course.id)} · currículo mapeado</span>
      <h1>${escapeHtml(course.name)}</h1>
      <p>Este bloque ya forma parte del mapa global, pero sus lecciones profundas se desarrollarán en una entrega posterior. Preferimos “todavía no” a llenar la universidad de Wikipedia con bigote falso.</p>
    </div>

    <article class="panel">
      <h2>${escapeHtml(course.title)}</h2>
      <div class="topic-cloud">
        ${course.topics.map(topic => `<span class="chip">${escapeHtml(topic)}</span>`).join("")}
      </div>
    </article>
  `;
}

// -----------------------------------------------------------------------------
// Página de aprendizaje
// -----------------------------------------------------------------------------

function renderLesson(lessonId) {
  const lesson = LESSONS[lessonId];
  if (!lesson) {
    renderNotFound("Esta lección todavía no está desarrollada.");
    return;
  }

  STORE.touchLesson(lesson.id);

  view.innerHTML = `
    <div class="lesson-layout">
      <article class="lesson-main">
        <header class="lesson-head">
          <button class="back-link" data-nav="curso" data-nav-arg="${lesson.courseId}">← Volver al bloque</button>
          <span class="eyebrow">Lección · ${lesson.duration} min</span>
          <h1>${escapeHtml(lesson.title)}</h1>
          <div class="objective-box">
            <b>Al terminar este tema sabrás:</b>
            <p>${escapeHtml(lesson.objective)}</p>
          </div>
        </header>

        ${renderLessonOrientation(lesson)}

        <section class="lesson-section" id="rapida">
          <span class="eyebrow">A · Explicación rápida</span>
          <h2>Modelo mental mínimo</h2>
          <p class="lead">${escapeHtml(lesson.concept)}</p>

          <div class="concept-diagram">
            ${lesson.diagram.map(item => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>

          <div class="quick-grid">
            <div>
              <h3>Qué debes retener</h3>
              <ul>${lesson.summary.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </div>
            <div>
              <h3>Reglas importantes</h3>
              <ul>${lesson.rules.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </div>
          </div>
        </section>

        ${renderDeepExplanation(lesson)}
        ${renderLessonVisuals(lesson)}
        ${renderWorkedExample(lesson)}
        ${renderQuickCheck(lesson)}
        ${renderPractice(lesson)}
        ${renderMixedPractice(lesson)}
        ${renderLessonBooks(lesson)}
        ${renderLessonLab(lesson)}

        <section class="lesson-section lesson-close" id="cierre">
          <span class="eyebrow">Cierre</span>
          <h2>¿Puedes explicarlo sin mirar?</h2>
          <p>Intenta reconstruir el argumento principal con tus propias palabras. Si solo reconoces el texto al verlo, todavía no hay evidencia suficiente de dominio.</p>
          ${renderMasteryGate(lesson)}
          <button class="btn btn-primary" id="completeLesson" ${state.completed.includes(lesson.id) ? "disabled" : ""}>
            ${state.completed.includes(lesson.id) ? "✓ Tema dominado" : state.finished?.includes(lesson.id) ? "Revalidar dominio" : "Terminar clase y comprobar dominio"}
          </button>
        </section>
      </article>

      <aside class="lesson-nav">
        <div class="panel">
          <span class="eyebrow">En este tema</span>
          <button data-section="orientacion">Orientación y previos</button>
          <button data-section="rapida">Explicación rápida</button>
          <button data-section="profundidad">En profundidad</button>
          ${visualsForLesson(lesson).length ? `<button data-section="visuales">Apoyo visual</button>` : ""}
          <button data-section="ejemplo">Ejemplo resuelto</button>
          <button data-section="check">Comprueba</button>
          <button data-section="practica">Práctica</button>
          ${previousLessonsForMix(lesson).length ? `<button data-section="mezcla">Práctica acumulativa</button>` : ""}
          ${booksForLesson(lesson).length ? `<button data-section="libros-leccion">Libros</button>` : ""}
          ${getLabsForLesson(lesson).length ? `<button data-section="laboratorio-leccion">Laboratorio</button>` : ""}
          <button data-section="cierre">Cierre</button>
        </div>
      </aside>
    </div>
  `;

  bindLessonInteractions(lesson);
}

function renderDeepExplanation(lesson) {
  const errors = lesson.deep.commonErrors || [];
  const connections = lesson.deep.connections || [];
  const optionalGrid = (errors.length || connections.length) ? `
    <div class="quick-grid">
      ${errors.length ? `<div><h3>Errores frecuentes</h3><ul>${errors.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>` : ""}
      ${connections.length ? `<div><h3>Conexiones</h3><ul>${connections.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>` : ""}
    </div>` : "";

  return `
    <section class="lesson-section" id="profundidad">
      <span class="eyebrow">B · Aprender en profundidad</span>
      <h2>Del modelo mental al mecanismo</h2>
      ${lesson.deep.intro ? `<p class="deep-intro">${escapeHtml(lesson.deep.intro)}</p>` : ""}
      <button class="deep-toggle" id="deepToggle" aria-expanded="true">📖 Ocultar explicación profunda</button>

      <div class="deep-content open" id="deepContent">
        ${(lesson.deep.readingGuide || []).length ? `
          <article class="deep-subsection guided-reading">
            <span class="eyebrow">Lectura guiada</span>
            <h3>Construye la idea paso a paso</h3>
            ${(lesson.deep.readingGuide || []).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          </article>
        ` : ""}
        ${lesson.deep.sections.map(section => `
          <article class="deep-subsection">
            <h3>${escapeHtml(section.title)}</h3>
            ${String(section.body || "").split(/\n\n+/).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          </article>
        `).join("")}
        ${(lesson.deep.glossary || []).length ? `
          <article class="deep-subsection lesson-glossary">
            <h3>Vocabulario de esta lección</h3>
            <dl>${(lesson.deep.glossary || []).map(item => `<div><dt>${escapeHtml(item.term)}</dt><dd>${escapeHtml(item.definition)}</dd></div>`).join("")}</dl>
          </article>
        ` : ""}
        ${(lesson.deep.checkpoint || []).length ? `
          <article class="deep-subsection reading-checkpoint">
            <h3>Antes de seguir: comprueba tu modelo mental</h3>
            <ol>${(lesson.deep.checkpoint || []).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
          </article>
        ` : ""}
        ${optionalGrid}
      </div>
    </section>
  `;
}

function renderWorkedExample(lesson) {
  return `
    <section class="lesson-section" id="ejemplo">
      <span class="eyebrow">C · Ejemplo paso a paso</span>
      <h2>Ejemplo resuelto</h2>
      <div class="problem-box"><b>Problema</b><p>${escapeHtml(lesson.example.problem)}</p></div>
      <div class="steps">
        ${lesson.example.steps.map((step, index) => `
          <div class="step">
            <span class="step-num">${index + 1}</span>
            <div><b>${escapeHtml(step[0])}</b><p>${escapeHtml(step[1])}</p></div>
          </div>
        `).join("")}
      </div>
      <div class="answer-box"><b>Solución</b><p>${escapeHtml(lesson.example.answer)}</p></div>
    </section>
  `;
}

function renderQuickCheck(lesson) {
  return `
    <section class="lesson-section" id="check">
      <span class="eyebrow">D · Comprueba si lo has entendido</span>
      <h2>${escapeHtml(lesson.check.question)}</h2>
      <div class="quiz-options">
        ${lesson.check.options.map(([text, correct], index) => `
          <button class="quiz-option" data-correct="${correct}">
            <span>${String.fromCharCode(65 + index)}</span>${escapeHtml(text)}
          </button>
        `).join("")}
      </div>
      <div class="feedback" id="quizFeedback"></div>
    </section>
  `;
}

function practiceNeedsSelfAssessment(item) {
  const answer = String(item?.answer || '').trim();
  const prompt = normalizeAnswer(item?.prompt || '');
  return answer.length > 42 || /explica|describe|justifica|diseña|disena|compara|razona|propone|analiza|por que|por qué/.test(prompt);
}

function practiceStrategy(level) {
  if (Number(level) === 1) return 'Recuerda la definición o relación esencial antes de mirar apuntes.';
  if (Number(level) === 2) return 'Identifica datos, regla aplicable y unidades o invariantes antes de operar.';
  if (Number(level) === 3) return 'Explica primero qué cambia respecto al caso visto y qué supuesto reutilizas.';
  return 'Plantea una hipótesis, explicita restricciones y define qué evidencia aceptaría o refutaría tu solución.';
}

function lessonMasteryEvidence(lesson) {
  const quick = Boolean(state.quickChecks?.[lesson.id]?.correct);
  const practice = (lesson.practice || []).map(item => {
    const saved = state.practiceAttempts?.[`${lesson.id}:${item.level}`] || {};
    return { level: item.level, label: item.label, qualified: Boolean(saved.qualified), revealed: Boolean(saved.revealed) };
  });
  return { quick, practice, ready: quick && practice.length > 0 && practice.every(item => item.qualified) };
}

function renderMasteryGate(lesson) {
  const evidence = lessonMasteryEvidence(lesson);
  const finished = Boolean(state.finished?.includes(lesson.id));
  const mastered = Boolean(state.completed.includes(lesson.id));
  return `
    <div class="mastery-gate ${mastered ? 'mastery-done' : ''}">
      <div class="mastery-gate-head"><b>${mastered ? '✓ Dominio demostrado' : finished ? 'Clase terminada · dominio pendiente' : 'Evidencia necesaria para dominar'}</b><span>${evidence.ready ? 'Listo para validar' : 'Completa las comprobaciones'}</span></div>
      <ul>
        <li class="${evidence.quick ? 'ok' : ''}">${evidence.quick ? '✓' : '○'} Comprobación conceptual correcta</li>
        ${evidence.practice.map(item => `<li class="${item.qualified ? 'ok' : ''}">${item.qualified ? '✓' : '○'} Nivel ${item.level} — ${escapeHtml(item.label)}${item.revealed && !item.qualified ? ' · solución revelada: se verificará en repaso' : ''}</li>`).join('')}
      </ul>
      <small>Terminar una clase registra estudio. “Dominado” solo aparece cuando has recuperado y aplicado el contenido sin depender de la solución.</small>
    </div>`;
}

function previousLessonsForMix(lesson, count = 2) {
  const ids = orderedDevelopedLessonIds();
  const index = ids.indexOf(lesson.id);
  if (index <= 0) return [];
  return ids.slice(0, index).reverse().map(id => LESSONS[id]).filter(Boolean).slice(0, count);
}

function correctQuickOption(lesson) {
  const match = (lesson.check?.options || []).find(option => option[1] === true);
  return match ? match[0] : '';
}

function renderMixedPractice(lesson) {
  const previous = previousLessonsForMix(lesson, 2);
  if (!previous.length) return '';
  const sources = [lesson, ...previous];
  return `
    <section class="lesson-section" id="mezcla">
      <span class="eyebrow">F · Práctica acumulativa</span>
      <h2>Problemas sin etiqueta</h2>
      <p>No se indica qué tema debes usar. Identifica primero qué conocimiento es relevante y después responde. Esta mezcla evita aprender cada herramienta aislada de su contexto.</p>
      <div class="mixed-practice-grid">
        ${sources.map((source, index) => {
          const key = `${lesson.id}:mix-${source.id}`;
          const saved = state.practiceAttempts?.[key] || {};
          return `<article class="mixed-card ${saved.selfAssessed === 'understood' ? 'practice-solved' : ''}" data-mix-source="${escapeHtml(source.id)}">
            <span class="eyebrow">Caso ${index + 1}</span>
            <p class="mixed-prompt">${escapeHtml(source.check.question)}</p>
            <textarea rows="4" placeholder="Responde y justifica qué idea o regla estás usando"></textarea>
            <div class="mixed-actions"><button class="btn btn-secondary" data-mix-check>Contrastar razonamiento</button></div>
            <div class="feedback" aria-live="polite"></div>
          </article>`;
        }).join('')}
      </div>
      <div class="practice-learning-note"><b>Regla:</b> antes de responder, escribe mentalmente “qué tipo de problema es este y por qué”. En problemas reales nadie te dice el nombre del capítulo.</div>
    </section>`;
}

function renderPractice(lesson) {
  return `
    <section class="lesson-section" id="practica">
      <span class="eyebrow">E · Práctica progresiva</span>
      <h2>Recupera, aplica, transfiere y verifica</h2>
      <p>Responde primero sin mirar. Después usa pista o solución solo para corregir tu modelo mental. En respuestas abiertas, compárate con una solución modelo en vez de perseguir una frase exacta.</p>

      <div class="practice-levels">
        ${lesson.practice.map(item => {
          const key = `${lesson.id}:${item.level}`;
          const saved = state.practiceAttempts?.[key] || {};
          const selfCheck = practiceNeedsSelfAssessment(item);
          const solved = Boolean(saved.correct || saved.selfAssessed === 'understood');
          return `
          <article class="level-card ${solved ? 'practice-solved' : ''}" data-practice-level="${item.level}" data-self-check="${selfCheck}">
            <header>
              <div><b>Nivel ${item.level} — ${escapeHtml(item.label)}</b><small>${item.level === 1 ? "Recuperación" : item.level === 2 ? "Aplicación" : item.level === 3 ? "Transferencia" : "Reto abierto"}</small></div>
              <span class="practice-state">${solved ? '✓ Comprendido' : saved.attempts ? `${saved.attempts} intento${saved.attempts===1?'':'s'}` : 'Sin intentar'}</span>
            </header>
            <div class="practice-strategy"><b>Estrategia:</b> ${escapeHtml(practiceStrategy(item.level))}</div>
            <p class="practice-prompt">${escapeHtml(item.prompt)}</p>
            <div class="practice-input">
              ${selfCheck
                ? `<textarea rows="4" data-answer="${escapeHtml(item.answer)}" data-alternatives="${escapeHtml(JSON.stringify(item.alternatives || []))}" data-hint="${escapeHtml(item.hint)}" placeholder="Explica tu razonamiento con tus propias palabras" aria-label="Tu respuesta razonada al ejercicio de nivel ${item.level}"></textarea>`
                : `<input data-answer="${escapeHtml(item.answer)}" data-alternatives="${escapeHtml(JSON.stringify(item.alternatives || []))}" data-hint="${escapeHtml(item.hint)}" placeholder="Tu respuesta" autocomplete="off" aria-label="Tu respuesta al ejercicio de nivel ${item.level}">`}
              <button class="btn btn-secondary practice-check">${selfCheck ? 'Comparar respuesta' : 'Comprobar'}</button>
            </div>
            <div class="practice-tools">
              <button type="button" class="chip practice-hint">Ver pista</button>
              <button type="button" class="chip practice-solution">Ver solución modelo</button>
            </div>
            <div class="practice-reveal" hidden></div>
            <div class="feedback" aria-live="polite"></div>
          </article>`;
        }).join("")}
      </div>
      <div class="practice-learning-note"><b>Cómo usar esta sección:</b> si fallas, explica por qué falló tu primera idea antes de reintentar. Si aciertas por intuición pero no puedes justificarlo, todavía merece un segundo intento.</div>
    </section>
  `;
}

function getLabsForLesson(lesson) {
  if (!window.PRACTICAL_LABS) return [];
  const explicit = window.LESSON_LABS && window.LESSON_LABS[lesson.id];
  if (explicit) {
    const ids = Array.isArray(explicit) ? explicit : [explicit];
    return ids.map(id => window.PRACTICAL_LABS[id]).filter(Boolean);
  }
  return Object.values(window.PRACTICAL_LABS)
    .filter(lab => lab.courseIds.includes(lesson.courseId))
    .slice(0, 2);
}

function renderLessonLab(lesson) {
  const labs = getLabsForLesson(lesson);
  if (!labs.length) return "";
  return `
    <section class="lesson-section lesson-lab" id="laboratorio-leccion">
      <span class="eyebrow">G · Laboratorio ejecutable</span>
      <h2>Haz que el concepto corra</h2>
      <p>No tienes que salir de la universidad para probarlo. Estos laboratorios se ejecutan en tu navegador; las máquinas didácticas están etiquetadas como simuladores.</p>
      <div class="lesson-lab-grid">
        ${labs.map(lab => `
          <button class="lab-launch-card" data-nav="lab" data-nav-arg="${escapeHtml(lab.id)}">
            <span class="lab-icon">${lab.mode === "compiler" ? "λ" : lab.mode === "assembly" ? "CPU" : lab.mode === "logic" ? "01" : "▶"}</span>
            <span><b>${escapeHtml(lab.title)}</b><small>${escapeHtml(lab.badge)}</small></span>
            <strong>→</strong>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function bindLessonInteractions(lesson) {
  const deepToggle = $("#deepToggle");
  const deepContent = $("#deepContent");

  deepToggle.addEventListener("click", () => {
    deepContent.classList.toggle("open");
    deepToggle.textContent = deepContent.classList.contains("open")
      ? "📕 Ocultar explicación completa"
      : "📖 Ver explicación completa";
  });

  $$(".quiz-option").forEach(button => {
    button.addEventListener("click", () => checkQuickQuestion(button, lesson));
  });

  $$(".practice-check").forEach(button => {
    button.addEventListener("click", () => checkPracticeAnswer(button, lesson));
  });
  $$(".practice-hint").forEach(button => button.addEventListener("click", () => {
    const card=button.closest('.level-card');
    const field=card?.querySelector('input,textarea');
    const reveal=card?.querySelector('.practice-reveal');
    if(!field || !reveal) return;
    reveal.hidden=false;
    reveal.innerHTML=`<b>Pista:</b> ${escapeHtml(field.dataset.hint || 'Vuelve al concepto y separa datos, regla y supuesto.')}`;
  }));
  $$(".practice-solution").forEach(button => button.addEventListener("click", () => {
    const card=button.closest('.level-card');
    const field=card?.querySelector('input,textarea');
    const reveal=card?.querySelector('.practice-reveal');
    if(!field || !reveal) return;
    reveal.hidden=false;
    reveal.innerHTML=`<b>Solución modelo:</b> ${escapeHtml(field.dataset.answer || '')}<small>No la memorices: compara qué paso o supuesto faltaba en tu respuesta.</small>`;
    STORE.registerPracticeAttempt(lesson.id, Number(card.dataset.practiceLevel), false, {revealed:true,countAttempt:false});
  }));
  $$(".practice-input input").forEach(input => input.addEventListener('keydown', event => {
    if(event.key === 'Enter') { event.preventDefault(); input.closest('.practice-input')?.querySelector('.practice-check')?.click(); }
  }));

  $$("[data-mix-check]").forEach(button => button.addEventListener("click", () => {
    const card = button.closest('.mixed-card');
    const input = card?.querySelector('textarea');
    const feedback = card?.querySelector('.feedback');
    const source = LESSONS[card?.dataset.mixSource];
    if (!card || !input || !feedback || !source) return;
    const response = input.value.trim();
    if (response.length < 30) {
      feedback.className = 'feedback show bad';
      feedback.textContent = 'Desarrolla un poco más el razonamiento: qué regla eliges, por qué y qué conclusión obtienes.';
      return;
    }
    feedback.className = 'feedback show';
    feedback.innerHTML = `<b>Contraste:</b><p>${escapeHtml(correctQuickOption(source))}</p><p class="muted">Tu explicación debe justificar por qué esa conclusión se sigue del mecanismo, no limitarse a coincidir con ella.</p><div class="practice-self-actions"><button class="chip" data-mix-result="understood">Puedo justificarlo</button><button class="chip" data-mix-result="review">Necesito repasarlo</button></div>`;
    feedback.querySelectorAll('[data-mix-result]').forEach(choice => choice.addEventListener('click', () => {
      const understood = choice.dataset.mixResult === 'understood';
      STORE.registerPracticeAttempt(lesson.id, `mix-${source.id}`, understood, {selfAssessed: understood ? 'understood' : 'review'});
      card.classList.toggle('practice-solved', understood);
      feedback.className = `feedback show ${understood ? '' : 'bad'}`;
      feedback.textContent = understood ? 'Bien. Has identificado y justificado la herramienta sin que el ejercicio te dijera el tema.' : 'Anotado. Vuelve a la clase correspondiente y reintenta este caso más tarde.';
    }));
  }));

  $("#completeLesson")?.addEventListener("click", () => {
    STORE.finishLesson(lesson.id, lesson.duration);
    const evidence = lessonMasteryEvidence(lesson);
    if (evidence.ready) {
      STORE.masterLesson(lesson.id);
      toast("Tema dominado. Volverá en repaso espaciado para comprobar retención.");
    } else {
      const missing = (evidence.quick ? 0 : 1) + evidence.practice.filter(item => !item.qualified).length;
      toast(`Clase terminada. Quedan ${missing} comprobación${missing === 1 ? '' : 'es'} para demostrar dominio.`);
    }
    renderLesson(lesson.id);
  });
}

function checkQuickQuestion(selectedButton, lesson) {
  const isCorrect = selectedButton.dataset.correct === "true";
  const feedback = $("#quizFeedback");

  $$(".quiz-option").forEach(button => button.classList.remove("correct", "wrong"));
  selectedButton.classList.add(isCorrect ? "correct" : "wrong");

  feedback.className = `feedback show ${isCorrect ? "" : "bad"}`;
  feedback.innerHTML = isCorrect
    ? `${escapeHtml(lesson.check.success)} <span class="mastery-evidence">✓ Cuenta como evidencia de dominio</span>`
    : `${escapeHtml(lesson.check.failure)} <button class="chip" data-section="rapida">Ver esta parte otra vez</button>`;

  STORE.registerQuickCheck(lesson.id, isCorrect);

  if (!isCorrect) {
    STORE.registerError(lesson.id, lesson.shortTitle, lesson.check.question);
  }
}

function practiceAnswersEquivalent(expected, received) {
  if (expected === received) return true;
  const numeric = value => {
    const cleaned=String(value).replace(',', '.').replace(/[^0-9eE+\-.]/g,'');
    if(!cleaned || !/[0-9]/.test(cleaned)) return null;
    const number=Number(cleaned);
    return Number.isFinite(number) ? number : null;
  };
  const a=numeric(expected), b=numeric(received);
  if(a !== null && b !== null) {
    const tolerance=Math.max(1e-9,Math.abs(a)*1e-3);
    return Math.abs(a-b) <= tolerance;
  }
  return false;
}

function checkPracticeAnswer(button, lesson) {
  const card = button.closest(".level-card");
  const input = card?.querySelector("input,textarea");
  const feedback = card?.querySelector(".feedback");
  if(!card || !input || !feedback) return;
  const level=Number(card.dataset.practiceLevel);
  const receivedRaw=String(input.value||'').trim();
  if(!receivedRaw){
    feedback.className='feedback show bad';
    feedback.textContent='Escribe primero tu propia respuesta. La recuperación activa ocurre antes de mirar la solución.';
    input.focus();
    return;
  }

  const selfCheck=card.dataset.selfCheck==='true';
  const expected = normalizeAnswer(input.dataset.answer);
  const alternatives = JSON.parse(input.dataset.alternatives || "[]").map(normalizeAnswer);
  const received = normalizeAnswer(receivedRaw);

  if(selfCheck){
    feedback.className='feedback show';
    feedback.innerHTML=`<b>Contrasta tu razonamiento con la solución modelo:</b><p>${escapeHtml(input.dataset.answer)}</p><div class="self-rubric"><b>Antes de validarte, comprueba que tu respuesta:</b><ul><li>nombra el mecanismo o regla central;</li><li>explicita los supuestos importantes;</li><li>conecta causa y consecuencia, no solo el resultado;</li><li>llega a una conclusión compatible.</li></ul></div><p class="muted">Si alguno de esos puntos falta, marca "Necesita repaso". Si abriste la solución antes de escribir tu intento, esa respuesta no cuenta como evidencia fuerte de dominio hasta un repaso posterior.</p><div class="practice-self-actions"><button class="chip" data-practice-self="understood">Cumple los criterios</button><button class="chip" data-practice-self="review">Necesita repaso</button></div>`;
    STORE.registerPracticeAttempt(lesson.id, level, false);
    feedback.querySelectorAll('[data-practice-self]').forEach(choice=>choice.addEventListener('click',()=>{
      const understood=choice.dataset.practiceSelf==='understood';
      STORE.registerPracticeAttempt(lesson.id, level, understood, {selfAssessed:understood?'understood':'review',countAttempt:false});
      card.classList.toggle('practice-solved',understood);
      card.querySelector('.practice-state').textContent=understood?'✓ Comprendido':'Necesita repaso';
      feedback.className=`feedback show ${understood?'':'bad'}`;
      feedback.innerHTML=understood
        ? 'Bien. Ahora cierra la solución y reconstruye la respuesta una vez más de memoria antes de seguir.'
        : `Vuelve al mecanismo central. <b>Pista:</b> ${escapeHtml(input.dataset.hint)}`;
    }));
    return;
  }

  const acceptedAnswers = [expected, ...alternatives];
  const isCorrect = acceptedAnswers.some(answer=>practiceAnswersEquivalent(answer,received));
  STORE.registerPracticeAttempt(lesson.id, level, isCorrect);
  feedback.className = `feedback show ${isCorrect ? "" : "bad"}`;

  if (isCorrect) {
    card.classList.add('practice-solved');
    card.querySelector('.practice-state').textContent='✓ Comprendido';
    feedback.innerHTML = '<b>Correcto.</b> Antes de seguir, intenta decir por qué funciona; acertar el resultado sin el mecanismo es una señal para repasar.';
    return;
  }

  const attempts=state.practiceAttempts?.[`${lesson.id}:${level}`]?.attempts||1;
  card.querySelector('.practice-state').textContent=`${attempts} intento${attempts===1?'':'s'}`;
  feedback.innerHTML = `No exactamente. <b>Pista:</b> ${escapeHtml(input.dataset.hint)} <span class="muted">Explica qué supuesto de tu primer intento era incorrecto antes de reintentar.</span>`;
  STORE.registerError(lesson.id, lesson.shortTitle, card.querySelector(".practice-prompt")?.textContent||'Práctica');
}

// -----------------------------------------------------------------------------
// Repaso, errores, biblioteca y progreso
// -----------------------------------------------------------------------------

function renderReview() {
  const items = reviewQueue();
  const sessionMinutes = Math.max(4, Math.min(20, items.length * 4));
  view.innerHTML = `
    <div class="page-title"><span class="eyebrow">Memoria a largo plazo</span><h1>🧠 Repasar</h1><p>Primero recupera de memoria. Solo después abre la teoría. El intervalo crece cuando recuerdas y vuelve a empezar cuando fallas.</p></div>
    <section class="review-session"><span class="eyebrow">${items.length ? `Sesión sugerida · ~${sessionMinutes} minutos` : 'Repaso al día'}</span><h2>${items.length ? `${items.length} ${items.length===1?'recuperación pendiente':'recuperaciones pendientes'}` : 'Nada urgente por repasar'}</h2>
    ${items.length ? `<div class="review-list active-recall-list">${items.map(item => { const lesson=LESSONS[item.lessonId]; return `
      <article class="review-recall-card" data-review-card="${escapeHtml(item.lessonId)}">
        <span class="eyebrow">Sin mirar apuntes</span><h3>${escapeHtml(item.topic)}</h3>
        <p><b>1.</b> ${escapeHtml(lesson.objective)}</p>
        <p><b>2.</b> ${escapeHtml(lesson.check.question)}</p>
        <textarea rows="3" placeholder="Escribe lo que recuerdas antes de comprobar" aria-label="Recuperación de ${escapeHtml(item.topic)}"></textarea>
        <div class="review-recall-actions"><button class="btn btn-secondary" data-review-reveal>Comprobar con la clase</button></div>
        <div class="review-verdict" hidden><p><b>Guía de contraste:</b> ${escapeHtml((lesson.summary || []).slice(0,2).join(' · '))}</p><p><b>Respuesta de control:</b> ${escapeHtml(correctQuickOption(lesson))}</p><p class="muted">No hace falta usar las mismas palabras; sí debe aparecer el mecanismo y una justificación compatible.</p><div><button class="chip" data-review-result="remembered">Lo recordé y pude justificarlo</button><button class="chip" data-review-result="forgotten">No pude recuperarlo bien</button><button class="chip" data-review-open>Abrir clase</button></div></div>
      </article>`; }).join('')}</div>` : `<div class="review-empty">No tienes repasos vencidos. Los temas dominados volverán automáticamente con intervalos crecientes.<div><button class="btn btn-primary" data-review-go-learn style="margin-top:14px">Seguir aprendiendo</button></div></div>`}
    </section>`;
  view.querySelectorAll('[data-review-card]').forEach(card => {
    const id=card.dataset.reviewCard;
    card.querySelector('[data-review-reveal]')?.addEventListener('click',()=>{
      const answer=card.querySelector('textarea')?.value.trim();
      if(!answer){ toast('Escribe primero lo que recuerdas. El repaso empieza antes de mirar.'); card.querySelector('textarea')?.focus(); return; }
      card.querySelector('.review-verdict').hidden=false;
    });
    card.querySelectorAll('[data-review-result]').forEach(btn=>btn.addEventListener('click',()=>{
      const remembered=btn.dataset.reviewResult==='remembered';
      STORE.registerReviewResult(id, remembered);
      if(!remembered) STORE.registerError(id, LESSONS[id].shortTitle||LESSONS[id].title, 'Fallo de recuperación espaciada');
      toast(remembered ? 'Buen recuerdo. El siguiente repaso se aleja.' : 'Repaso registrado. El intervalo vuelve a ser corto.');
      renderReview();
    }));
    card.querySelector('[data-review-open]')?.addEventListener('click',()=>route('tema',id));
  });
  view.querySelector('[data-review-go-learn]')?.addEventListener('click',()=>route('aprender'));
}

function renderErrors() {
  const errors = state.errors.slice(-20).reverse();

  view.innerHTML = `
    <div class="page-title">
      <span class="eyebrow">Diagnóstico</span>
      <h1>Mis errores</h1>
      <p>Los fallos se convierten en rutas de práctica. El objetivo es que el error tenga una carrera breve y sin posibilidades de promoción.</p>
    </div>

    ${errors.length
      ? errors.map(error => `
          <article class="error-card">
            <div>
              <b>${escapeHtml(error.topic)}</b>
              <span>${escapeHtml(error.problem)}</span>
            </div>
            <button class="chip" data-nav="tema" data-nav-arg="${escapeHtml(error.lessonId)}">Practicar</button>
          </article>
        `).join("")
      : `<div class="empty-note">Aún no hay errores registrados. Sospechoso, pero legal.</div>`}
  `;
}

function renderLibrary() {
  view.innerHTML = `
    <div class="page-title">
      <span class="eyebrow">Referencia profunda</span>
      <h1>📚 Biblioteca</h1>
      <p>Bibliografía guiada por tus 10 áreas, recursos visuales con fuente y el índice completo de lecciones.</p>
    </div>

    <section class="library-books">
      ${GOAL_AREAS.map(area => {
        const books = (window.BOOK_LIBRARY && BOOK_LIBRARY[area.id]) || [];
        if (!books.length) return '';
        return `
          <article class="library-area-panel panel">
            <div class="section-head">
              <div><span class="eyebrow">${escapeHtml(area.subtitle)}</span><h2>${escapeHtml(area.name)}</h2></div>
              <button class="chip" data-nav="objetivo" data-nav-arg="${escapeHtml(area.id)}">Abrir área</button>
            </div>
            <div class="book-grid">${books.map(renderBookCard).join('')}</div>
          </article>`;
      }).join('')}
    </section>

    <div class="section-head"><div><span class="eyebrow">Consulta rápida</span><h2>Lecciones desarrolladas</h2></div></div>
    <div class="library-developed">
      ${Object.values(LESSONS).map(lesson => `
        <article class="library-item" data-nav="tema" data-nav-arg="${escapeHtml(lesson.id)}">
          <b>${escapeHtml(lesson.title)}</b>
          <small>Bloque ${formatCourseNumber(lesson.courseId)} · explicación completa disponible</small>
        </article>
      `).join('')}
    </div>

    <div class="section-head"><h2>Mapa curricular completo</h2></div>
    ${COURSES.map(course => `
      <article class="library-item" data-nav="curso" data-nav-arg="${course.id}">
        <b>${formatCourseNumber(course.id)} · ${escapeHtml(course.name)}</b>
        <small>${escapeHtml(course.title || course.topics.slice(0, 4).join(" · "))}</small>
      </article>
    `).join('')}
  `;
}

function renderProgress() {
  const developed = Object.keys(LESSONS).length;
  const completed = state.completed.filter(id => LESSONS[id]).length;
  const startedIds = Object.keys(state.lessonActivity || {}).filter(id => LESSONS[id]);
  const inProgress = startedIds.filter(id => !state.completed.includes(id)).length;
  const practiceEntries=Object.values(state.practiceAttempts||{});
  const practiceSolved=practiceEntries.filter(item=>item?.correct || item?.selfAssessed==='understood').length;
  const practiceAttempts=practiceEntries.reduce((sum,item)=>sum+(Number(item?.attempts)||0),0);

  view.innerHTML = `
    <div class="page-title">
      <span class="eyebrow">Progreso útil, no casino</span>
      <h1>📊 Mi progreso</h1>
      <p>Tu progreso se sincroniza con tu cuenta. Aquí combinamos dominio, actividad, errores y tiempo real de estudio sin convertirlo en un casino de rachas.</p>
    </div>

    <div class="stat-grid">
      <div class="big-stat"><strong>${completed}</strong><small>temas dominados</small></div>
      <div class="big-stat"><strong>${inProgress}</strong><small>lecciones en curso</small></div>
      <div class="big-stat"><strong>${state.errors.length}</strong><small>errores registrados</small></div>
      <div class="big-stat"><strong>${state.minutes}</strong><small>minutos estudiados</small></div>
      <div class="big-stat"><strong>${practiceSolved}</strong><small>prácticas comprendidas</small></div>
      <div class="big-stat"><strong>${practiceAttempts}</strong><small>intentos de práctica</small></div>
    </div>

    <article class="panel">
      <span class="eyebrow">Dominio de contenido desarrollado</span>
      <h2>${totalProgress()}%</h2>
      ${progressBar(totalProgress())}
    </article>

    <article class="panel">
      <span class="eyebrow">Progreso por área</span>
      <h2>Tus 10 líneas de aprendizaje</h2>
      <div class="area-progress-list">
        ${GOAL_AREAS.map(area => {
          const stats = areaLessonStats(area);
          return `<button class="area-progress-row" data-nav="objetivo" data-nav-arg="${escapeHtml(area.id)}"><span><b>${escapeHtml(area.name)}</b><small>${stats.completed}/${stats.total} dominadas · ${stats.started} en curso</small></span><strong>${goalAreaProgress(area)}%</strong></button>`;
        }).join("")}
      </div>
    </article>

    <article class="panel">
      <span class="eyebrow">Tus datos</span>
      <h2>Cloud + copia de seguridad</h2>
      <p>El progreso se guarda localmente para responder al instante y se sincroniza con Supabase cuando inicias sesión. El JSON sigue disponible como copia portátil.</p>
      <div class="continue-row">
        <button class="btn btn-secondary" data-action="export-progress">Exportar progreso</button>
        <button class="btn btn-secondary" data-action="import-progress">Importar progreso</button>
        <button class="btn btn-secondary" data-action="reset-progress">Reiniciar progreso</button>
      </div>
    </article>

    <article class="panel" id="cloudStatsPanel">
      <span class="eyebrow">Actividad reciente</span>
      <h2>Últimos 30 días</h2>
      <div id="cloudStats"><p class="muted">Calculando sesiones sincronizadas…</p></div>
    </article>

    <article class="panel vertical-map">
      <span class="eyebrow">Mapa vertical</span>
      <h2>De la información a sistemas complejos</h2>
      <p>información → electricidad → lógica → arquitectura → software → sistemas operativos → redes → seguridad → gráficos → videojuegos → hardware → inteligencia artificial → sistemas complejos.</p>
    </article>
  `;
  loadCloudProgressStats();
}

async function loadCloudProgressStats() {
  const box = document.getElementById("cloudStats");
  if (!box || !window.USIC_AUTH) return;
  try {
    const [sessions, goals] = await Promise.all([
      window.USIC_AUTH.studyStats(90),
      window.USIC_AUTH.listGoals().catch(()=>[])
    ]);
    const now=Date.now();
    const day=86400000;
    const sumSince=(from,to=now)=>sessions
      .filter(s=>{const t=new Date(s.started_at).getTime();return t>=from&&t<to;})
      .reduce((sum,s)=>sum+(s.active_seconds||0),0);
    const seconds7=sumSince(now-7*day), prev7=sumSince(now-14*day,now-7*day);
    const seconds30=sumSince(now-30*day), prev30=sumSince(now-60*day,now-30*day);
    const days30=new Set(sessions.filter(s=>new Date(s.started_at).getTime()>=now-30*day&&(s.active_seconds||0)>0).map(s=>String(s.started_at).slice(0,10))).size;
    const longest=Math.max(0,...sessions.filter(s=>new Date(s.started_at).getTime()>=now-30*day).map(s=>s.active_seconds||0));

    const d=new Date();
    const monday=new Date(d.getFullYear(),d.getMonth(),d.getDate());
    monday.setDate(monday.getDate()-((monday.getDay()+6)%7));
    const weekStart=monday.getTime();
    const weekSeconds=sumSince(weekStart);
    const weeklyTarget=Number(window.USIC_AUTH.profile?.weekly_goal_minutes)||180;
    const weeklyMinutes=Math.round(weekSeconds/60);
    const weeklyPct=Math.min(100,Math.round((weeklyMinutes/weeklyTarget)*100));
    const weeklyRemaining=Math.max(0,weeklyTarget-weeklyMinutes);
    const daysLeftInWeek=Math.max(1,7-((d.getDay()+6)%7));
    const weeklyPace=Math.ceil(weeklyRemaining/daysLeftInWeek);
    const completions=Object.values(state.lessonActivity||{}).filter(a=>a?.completedAt&&a.completedAt>=now-7*day).length;
    const trend=(cur,prev)=>{
      if(prev<=0) return cur>0?'nuevo':'—';
      const pct=Math.round(((cur-prev)/prev)*100);
      return `${pct>=0?'+':''}${pct}%`;
    };
    box.innerHTML = `
      <div class="analytics-summary">
        <div class="analytics-headline"><div><span class="eyebrow">Tu ritmo</span><h3>${Math.round(seconds7/60)} min esta semana móvil</h3></div><span class="trend-pill ${seconds7>=prev7?'up':'down'}">${trend(seconds7,prev7)} vs 7 días previos</span></div>
        <div class="mini-stat-grid analytics-4">
          <div><strong>${Math.round(seconds30/60)}</strong><small>min activos · 30 días</small><em>${trend(seconds30,prev30)} vs mes previo</em></div>
          <div><strong>${days30}</strong><small>días con actividad</small><em>${Math.round(days30/30*100)}% de consistencia</em></div>
          <div><strong>${Math.round(longest/60)}</strong><small>min sesión más larga</small><em>sin contar pestañas inactivas</em></div>
          <div><strong>${completions}</strong><small>dominadas · 7 días</small><em>${state.completed.length} en total</em></div>
        </div>
      </div>
      <div class="weekly-goal-card">
        <div><span class="eyebrow">Objetivo semanal personal</span><b>${weeklyMinutes} / ${weeklyTarget} min</b></div>
        ${progressBar(weeklyPct)}
        <small>${weeklyPct>=100?'Meta semanal alcanzada. Mantén el hábito sin convertirlo en obligación.':`Te faltan ${weeklyRemaining} min esta semana natural · ritmo orientativo: ${weeklyPace} min/día durante ${daysLeftInWeek} día${daysLeftInWeek===1?'':'s'}.`}</small>
      </div>
      ${renderActivityHeatmap(sessions,84)}
      <div class="analytics-two-col">
        ${renderAreaEvolution(30)}
        ${renderGoalPulse(goals)}
      </div>
      ${renderStudyRecommendations(4)}
      <div class="analytics-two-col">
        ${renderStudyPatterns(sessions)}
        ${renderStudyConsistency(sessions)}
      </div>
      <div class="analytics-two-col">
        ${renderSessionHistory(sessions,8)}
        ${renderApproxAreaTime(sessions)}
      </div>
      ${renderLearningMomentum(sessions)}
      ${renderLearningMaintenance()}
      ${renderRecentCompletions(6)}
    `;
  } catch (error) {
    console.warn('No se pudieron cargar estadísticas cloud',error);
    box.innerHTML = `<p class="muted">Las estadísticas cloud aparecerán después de ejecutar la versión actual de SUPABASE_SETUP.sql.</p>`;
  }
}



function renderLearningMomentum(sessions=[]){
  const day=86400000, now=Date.now();
  const weeks=Array.from({length:8},(_,i)=>{
    const end=now-i*7*day, start=end-7*day;
    const seconds=sessions.filter(s=>{const t=new Date(s.started_at).getTime();return t>=start&&t<end;}).reduce((n,s)=>n+Number(s.active_seconds||0),0);
    const activeDays=new Set(sessions.filter(s=>{const t=new Date(s.started_at).getTime();return t>=start&&t<end&&Number(s.active_seconds||0)>0;}).map(s=>localDayKey(s.started_at))).size;
    return {minutes:Math.round(seconds/60),activeDays};
  }).reverse();
  const max=Math.max(1,...weeks.map(w=>w.minutes));
  const recent=weeks.slice(-4).reduce((n,w)=>n+w.minutes,0);
  const previous=weeks.slice(0,4).reduce((n,w)=>n+w.minutes,0);
  const delta=previous>0?Math.round((recent-previous)/previous*100):(recent>0?100:0);
  const avg=Math.round(recent/4);
  const target=Number(window.USIC_AUTH?.profile?.weekly_goal_minutes)||180;
  const targetWeeks=weeks.slice(-4).filter(w=>w.minutes>=target).length;
  const completedRecent=Object.values(state.lessonActivity||{}).filter(x=>x?.completedAt&&x.completedAt>=now-28*day).length;
  return `<section class="analytics-card momentum-card"><div class="section-head compact"><div><span class="eyebrow">Tendencia · 8 semanas</span><h3>Ritmo a medio plazo</h3></div><span class="trend-pill ${delta>=0?'up':'down'}">${delta>=0?'+':''}${delta}% · últimas 4 vs previas</span></div><div class="weekly-bars">${weeks.map((w,i)=>`<div class="week-bar" title="${w.minutes} min · ${w.activeDays} días activos"><i style="height:${Math.max(5,Math.round(w.minutes/max*100))}%"></i><span>-W${7-i}</span><b>${w.minutes}</b></div>`).join('')}</div><div class="pattern-grid"><div><strong>${avg}</strong><small>min/semana · últimas 4</small></div><div><strong>${targetWeeks}/4</strong><small>semanas alcanzando tu meta</small></div><div><strong>${completedRecent}</strong><small>lecciones dominadas · 28 d</small></div></div><small class="muted">La tendencia sirve para detectar cambios de ritmo, no para premiar volumen por encima de comprensión. Una semana de descanso no borra lo aprendido.</small></section>`;
}

function renderLearningMaintenance(){
  const now=Date.now(), day=86400000;
  const activity=state.lessonActivity||{};
  const stale=Object.entries(activity)
    .filter(([id,a])=>LESSONS[id]&&!state.completed.includes(id)&&a?.lastOpenedAt&&now-Number(a.lastOpenedAt)>14*day)
    .sort((a,b)=>Number(a[1].lastOpenedAt)-Number(b[1].lastOpenedAt));
  const due=state.completed
    .filter(id=>LESSONS[id])
    .map(id=>[id,activity[id]||{}])
    .filter(([,a])=>a?.lastOpenedAt&&now-Number(a.lastOpenedAt)>45*day)
    .sort((a,b)=>Number(a[1].lastOpenedAt)-Number(b[1].lastOpenedAt));
  const errorIds=[...new Set((state.errors||[]).slice().reverse().map(e=>e?.lessonId).filter(id=>LESSONS[id]))];
  const oldest=stale[0]?.[0], review=due[0]?.[0], err=errorIds[0];
  const daysAgo=v=>Math.max(1,Math.floor((now-Number(v||now))/day));
  return `<section class="analytics-card"><div class="section-head compact"><div><span class="eyebrow">Mantenimiento del aprendizaje</span><h3>Qué conviene recuperar</h3></div><small>Señales de abandono y repaso; no son bloqueos ni obligaciones.</small></div>
    <div class="pattern-grid">
      <div><strong>${stale.length}</strong><small>en curso · sin abrir ≥14 d</small></div>
      <div><strong>${due.length}</strong><small>dominadas · sin repaso ≥45 d</small></div>
      <div><strong>${errorIds.length}</strong><small>temas con errores guardados</small></div>
    </div>
    <div class="session-history compact">
      ${oldest?`<div><span><b>Retoma: ${escapeHtml(LESSONS[oldest].title)}</b><small>Última apertura hace ${daysAgo(activity[oldest]?.lastOpenedAt)} días.</small></span><button class="chip" data-nav="tema" data-nav-arg="${escapeHtml(oldest)}">Abrir</button></div>`:''}
      ${review?`<div><span><b>Repasa: ${escapeHtml(LESSONS[review].title)}</b><small>Dominada, pero lleva ${daysAgo(activity[review]?.lastOpenedAt)} días sin abrirse.</small></span><button class="chip" data-nav="tema" data-nav-arg="${escapeHtml(review)}">Repasar</button></div>`:''}
      ${err?`<div><span><b>Error pendiente: ${escapeHtml(LESSONS[err].title)}</b><small>Hay al menos un error registrado que merece una segunda pasada.</small></span><button class="chip" data-nav="tema" data-nav-arg="${escapeHtml(err)}">Practicar</button></div>`:''}
      ${!oldest&&!review&&!err?'<div class="empty-note compact">No hay señales de mantenimiento pendientes. Explora cualquier tema que te interese.</div>':''}
    </div>
  </section>`;
}

function renderStudyPatterns(sessions=[]){
  const recent=sessions.filter(s=>Number(s.active_seconds||0)>0 && Date.now()-new Date(s.started_at).getTime()<=30*86400000);
  if(!recent.length) return `<section class="analytics-card"><span class="eyebrow">Patrones de estudio</span><h3>Necesitamos algunas sesiones</h3><div class="empty-note compact">Estudia unos días y aquí aparecerán duración media, día y franja horaria más frecuentes.</div></section>`;
  const seconds=recent.reduce((a,s)=>a+Number(s.active_seconds||0),0);
  const avg=Math.round(seconds/recent.length/60);
  const weekdayNames=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  const weekdayCount=Array(7).fill(0), hourCount=Array(24).fill(0);
  recent.forEach(s=>{const d=new Date(s.started_at);weekdayCount[d.getDay()]+=Number(s.active_seconds||0);hourCount[d.getHours()]+=Number(s.active_seconds||0);});
  const bestDay=weekdayCount.indexOf(Math.max(...weekdayCount));
  const bestHour=hourCount.indexOf(Math.max(...hourCount));
  const hourLabel=h=>`${String(h).padStart(2,'0')}:00–${String((h+1)%24).padStart(2,'0')}:00`;
  const focused=recent.filter(s=>Number(s.active_seconds||0)>=25*60).length;
  return `<section class="analytics-card"><span class="eyebrow">Patrones de estudio · 30 días</span><h3>Cómo estás estudiando</h3><div class="pattern-grid"><div><strong>${recent.length}</strong><small>sesiones activas</small></div><div><strong>${avg}</strong><small>min de media</small></div><div><strong>${focused}</strong><small>sesiones ≥25 min</small></div></div><div class="pattern-note"><b>${weekdayNames[bestDay]}</b><span>es tu día con más tiempo acumulado</span></div><div class="pattern-note"><b>${hourLabel(bestHour)}</b><span>es tu franja más frecuente</span></div><small class="muted">Esto describe tu historial; no significa que esa franja sea objetivamente la mejor para aprender.</small></section>`;
}

function localDayKey(value){
  const d=value instanceof Date?value:new Date(value);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function renderStudyConsistency(sessions=[]){
  const active=new Set(sessions.filter(s=>Number(s.active_seconds||0)>0).map(s=>localDayKey(s.started_at)));
  const day=86400000;
  const today=new Date(); today.setHours(12,0,0,0);
  let cursor=new Date(today);
  if(!active.has(localDayKey(cursor))) cursor=new Date(cursor.getTime()-day);
  let current=0;
  while(active.has(localDayKey(cursor))){current++;cursor=new Date(cursor.getTime()-day);}
  const keys=[...active].sort();
  let best=0, run=0, prev=null;
  keys.forEach(k=>{const d=new Date(`${k}T12:00:00`); if(prev && Math.round((d-prev)/day)===1) run++; else run=1; best=Math.max(best,run); prev=d;});
  const last30=Array.from({length:30},(_,i)=>{const d=new Date(today.getTime()-i*day);return active.has(localDayKey(d));});
  const weeks=Array.from({length:4},(_,w)=>last30.slice(w*7,w*7+7).filter(Boolean).length);
  const topbar=document.querySelector('.streak');
  if(topbar){topbar.textContent=`${current} día${current===1?'':'s'} · racha`;topbar.title='Racha basada en días con tiempo activo sincronizado. Estudiar hoy o ayer mantiene la racha actual.';}
  return `<section class="analytics-card"><span class="eyebrow">Consistencia</span><h3>Racha basada en actividad real</h3><div class="pattern-grid"><div><strong>${current}</strong><small>racha actual</small></div><div><strong>${best}</strong><small>mejor racha · 90 d</small></div><div><strong>${active.size}</strong><small>días activos · 90 d</small></div></div><div class="consistency-weeks">${weeks.map((v,i)=>`<div><span>sem. -${i}</span><b>${v}/7 días</b><i><u style="width:${Math.round(v/7*100)}%"></u></i></div>`).join('')}</div><small class="muted">Una racha es descriptiva, no una obligación. Si necesitas descansar, el aprendizaje no se reinicia.</small></section>`;
}

function renderApproxAreaTime(sessions=[]){
  const totals={}; let unattributed=0;
  sessions.filter(s=>Number(s.active_seconds||0)>0).forEach(s=>{
    const lesson=s.last_lesson&&LESSONS[s.last_lesson];
    const area=lesson?areaForLesson(lesson):null;
    if(area) totals[area.id]=(totals[area.id]||0)+Number(s.active_seconds||0); else unattributed+=Number(s.active_seconds||0);
  });
  const rows=GOAL_AREAS.map(a=>({a,sec:totals[a.id]||0})).filter(x=>x.sec>0).sort((a,b)=>b.sec-a.sec).slice(0,6);
  if(!rows.length) return `<section class="analytics-card"><span class="eyebrow">Tiempo por área</span><h3>Distribución aproximada</h3><div class="empty-note compact">Todavía no hay sesiones atribuibles a una lección.</div></section>`;
  const max=Math.max(...rows.map(r=>r.sec));
  return `<section class="analytics-card"><span class="eyebrow">Tiempo por área</span><h3>Distribución aproximada · 90 días</h3><div class="area-time-list">${rows.map(r=>`<button data-nav="objetivo" data-nav-arg="${escapeHtml(r.a.id)}"><span><b>${escapeHtml(r.a.name)}</b><small>${Math.round(r.sec/60)} min</small></span><i><u style="width:${Math.round(r.sec/max*100)}%"></u></i></button>`).join('')}</div>${unattributed?`<small class="muted">${Math.round(unattributed/60)} min no se pudieron atribuir a un área.</small>`:''}<small class="muted">Estimación basada en la última lección registrada en cada sesión; no es un cronómetro por tema.</small></section>`;
}

function renderSessionHistory(sessions=[],limit=8){
  const rows=[...sessions].filter(s=>Number(s.active_seconds||0)>0).sort((a,b)=>new Date(b.started_at)-new Date(a.started_at)).slice(0,limit);
  if(!rows.length) return `<section class="analytics-card"><span class="eyebrow">Historial</span><h3>Sesiones recientes</h3><div class="empty-note compact">Todavía no hay sesiones sincronizadas.</div></section>`;
  return `<section class="analytics-card"><span class="eyebrow">Historial</span><h3>Sesiones recientes</h3><div class="session-history">${rows.map(s=>{const d=new Date(s.started_at);const min=Math.max(1,Math.round(Number(s.active_seconds||0)/60));const lesson=s.last_lesson&&LESSONS[s.last_lesson]?LESSONS[s.last_lesson].title:null;return `<div><span><b>${d.toLocaleDateString('es-ES',{day:'2-digit',month:'short'})} · ${d.toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'})}</b><small>${lesson?escapeHtml(lesson):'Sesión general'}</small></span><strong>${min} min</strong></div>`;}).join('')}</div></section>`;
}

function renderRecentCompletions(limit=5){
  const rows=Object.entries(state.lessonActivity||{})
    .filter(([id,a])=>LESSONS[id] && a?.completedAt)
    .sort((a,b)=>(b[1].completedAt||0)-(a[1].completedAt||0))
    .slice(0,limit);
  if(!rows.length) return `<div class="empty-note compact">Aún no hay lecciones dominadas recientemente.</div>`;
  return `<div class="recent-completions"><span class="eyebrow">Dominadas recientemente</span>${rows.map(([id,a])=>`<button data-nav="tema" data-nav-arg="${escapeHtml(id)}"><span>${escapeHtml(LESSONS[id].title)}</span><small>${new Date(a.completedAt).toLocaleDateString('es-ES')}</small></button>`).join('')}</div>`;
}

function renderActivityBars(sessions) {
  const byDay = {};
  sessions.forEach(s => { const d=String(s.started_at).slice(0,10); byDay[d]=(byDay[d]||0)+(s.active_seconds||0); });
  const days = Array.from({length:14}, (_,i)=>{ const d=new Date(Date.now()-(13-i)*86400000); return d.toISOString().slice(0,10); });
  const max=Math.max(60,...days.map(d=>byDay[d]||0));
  return `<div class="activity-bars" aria-label="Actividad de los últimos 14 días">${days.map(d=>`<i title="${d}: ${Math.round((byDay[d]||0)/60)} min" style="height:${Math.max(6,Math.round(((byDay[d]||0)/max)*100))}%"></i>`).join("")}</div>`;
}

function renderActivityHeatmap(sessions, daysCount=84){
  const byDay={};
  sessions.forEach(s=>{const d=String(s.started_at).slice(0,10);byDay[d]=(byDay[d]||0)+(s.active_seconds||0);});
  const days=Array.from({length:daysCount},(_,i)=>{const d=new Date(Date.now()-(daysCount-1-i)*86400000);return d.toISOString().slice(0,10);});
  const max=Math.max(60,...days.map(d=>byDay[d]||0));
  const level=sec=>sec<=0?0:Math.min(4,Math.max(1,Math.ceil((sec/max)*4)));
  return `<section class="activity-calendar"><div class="activity-calendar-head"><div><span class="eyebrow">Calendario de actividad</span><b>Últimas ${Math.round(daysCount/7)} semanas</b></div><small>menos <i class="heat l0"></i><i class="heat l1"></i><i class="heat l2"></i><i class="heat l3"></i><i class="heat l4"></i> más</small></div><div class="heatmap-grid">${days.map(d=>{const sec=byDay[d]||0;return `<i class="heat l${level(sec)}" title="${d}: ${Math.round(sec/60)} min" aria-label="${d}: ${Math.round(sec/60)} minutos"></i>`;}).join('')}</div></section>`;
}

function renderAreaEvolution(days=30){
  const since=Date.now()-days*86400000;
  const rows=GOAL_AREAS.map(area=>{
    const ids=new Set(lessonsForArea(area).map(l=>l.id));
    const total=ids.size||1;
    const completed=state.completed.filter(id=>ids.has(id)).length;
    const recent=Object.entries(state.lessonActivity||{}).filter(([id,a])=>ids.has(id)&&a?.completedAt>=since).length;
    return {area,completed,total,recent,pct:Math.round(completed/total*100)};
  }).sort((a,b)=>b.recent-a.recent||b.pct-a.pct).slice(0,6);
  return `<section class="analytics-card"><span class="eyebrow">Evolución por área</span><h3>Donde estás avanzando</h3><div class="area-evolution">${rows.map(r=>`<button data-nav="objetivo" data-nav-arg="${escapeHtml(r.area.id)}"><span><b>${escapeHtml(r.area.name)}</b><small>${r.recent?`+${r.recent} dominadas en ${days} días`:'sin dominadas recientes'}</small></span><strong>${r.pct}%</strong><i><u style="width:${r.pct}%"></u></i></button>`).join('')}</div></section>`;
}

function renderGoalPulse(goals=[]){
  const today=new Date(); today.setHours(0,0,0,0);
  const active=goals.filter(g=>g.status==='active');
  const rows=active.map(g=>{
    const cur=goalCurrentValue(g), target=Number(g.target)||1, pct=Math.min(100,Math.round(cur/target*100));
    const due=g.deadline?new Date(`${g.deadline}T00:00:00`):null;
    const days=due?Math.ceil((due-today)/86400000):null;
    const remaining=Math.max(0,target-cur);
    let pace='';
    if(days!==null && days>0 && remaining>0){
      const perDay=remaining/days;
      if(g.metric==='minutes') pace=` · ~${Math.ceil(perDay)} min/día`;
      else if(g.metric==='lessons') pace=` · ~${Math.max(0.1,perDay).toFixed(perDay<1?1:0)} lecc./día`;
      else if(g.metric==='area_percent') pace=` · ~${Math.max(0.1,perDay).toFixed(1)} pp/día`;
    }
    return {...g,cur,pct,days,pace};
  }).sort((a,b)=>(a.days??99999)-(b.days??99999)).slice(0,4);
  return `<section class="analytics-card"><span class="eyebrow">Goals</span><h3>Próximos objetivos</h3>${rows.length?`<div class="goal-pulse">${rows.map(g=>`<div class="${g.days!==null&&g.days<0?'overdue':''}"><span><b>${escapeHtml(g.title)}</b><small>${g.days===null?'sin fecha':g.days<0?`vencido hace ${Math.abs(g.days)} d`:g.days===0?'vence hoy':`faltan ${g.days} d`}${g.pace||''}</small></span><strong>${g.pct}%</strong></div>`).join('')}</div><button class="text-action" data-nav="objetivos">Gestionar objetivos →</button>`:`<div class="empty-note compact">No tienes objetivos activos.</div><button class="text-action" data-nav="objetivos">Crear un objetivo →</button>`}</section>`;
}

function renderStudyRecommendations(limit=4){
  const now=Date.now();
  const recs=[]; const seen=new Set();
  const push=(id,reason,score)=>{if(!LESSONS[id]||seen.has(id)||state.completed.includes(id))return;seen.add(id);recs.push({id,reason,score});};
  // 1) Errores recientes: vuelve al concepto que ya te hizo tropezar.
  [...(state.errors||[])].reverse().forEach((e,i)=>push(e.lessonId,'Tuviste un error aquí; repasarlo ahora refuerza la corrección.',100-i));
  // 2) Lecciones empezadas y abandonadas.
  Object.entries(state.lessonActivity||{}).forEach(([id,a])=>{
    if(a?.completedAt) return;
    const age=(now-(a?.lastOpenedAt||now))/86400000;
    if(a?.visits) push(id,age>7?`La empezaste hace ${Math.round(age)} días; puede ser buen momento para cerrarla.`:'La tienes en curso.',75+Math.min(15,age));
  });
  // 3) Área principal elegida en onboarding.
  const focus=GOAL_AREAS.find(a=>a.id===window.USIC_AUTH?.profile?.focus_area);
  if(focus){lessonsForArea(focus).forEach((l,i)=>push(l.id,`Pertenece a tu área principal: ${focus.name}.`,60-i/100));}
  // 4) Área con menor dominio para mantener amplitud.
  const weakest=GOAL_AREAS.map(a=>({a,p:goalAreaProgress(a)})).sort((x,y)=>x.p-y.p)[0]?.a;
  if(weakest){lessonsForArea(weakest).forEach((l,i)=>push(l.id,`Refuerza ${weakest.name}, una de tus áreas menos avanzadas.`,40-i/100));}
  recs.sort((a,b)=>b.score-a.score);
  return `<section class="study-recommendations"><div class="section-head compact"><div><span class="eyebrow">Siguiente paso sugerido</span><h3>Qué estudiar ahora</h3></div><small>Basado en errores, temas en curso y preferencias. Nunca bloquea otras lecciones.</small></div><div class="recommendation-grid">${recs.slice(0,limit).map(r=>`<button data-nav="tema" data-nav-arg="${escapeHtml(r.id)}"><b>${escapeHtml(LESSONS[r.id].title)}</b><small>${escapeHtml(r.reason)}</small><span>Estudiar →</span></button>`).join('')||'<div class="empty-note">Explora cualquier área: cuando haya historial aparecerán recomendaciones aquí.</div>'}</div></section>`;
}

function exportProgress() {
  const payload = JSON.stringify({ version: 2, exportedAt: new Date().toISOString(), state }, null, 2);
  const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url; a.download = "usic-progreso.json"; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function importProgress() {
  const input = document.createElement("input");
  input.type = "file"; input.accept = "application/json,.json";
  input.addEventListener("change", async () => {
    const file = input.files && input.files[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const incoming = parsed.state || parsed;
      if (!Array.isArray(incoming.completed) || !Array.isArray(incoming.errors)) throw new Error("Formato no reconocido");
      const sanitized = {
        ...STORE.snapshot(),
        completed: [...new Set(incoming.completed.filter(id => LESSONS[id]))],
        errors: incoming.errors.filter(item => item && LESSONS[item.lessonId]).slice(-100),
        minutes: Number.isFinite(Number(incoming.minutes)) ? Math.max(0, Number(incoming.minutes)) : 0,
        streak: Number.isFinite(Number(incoming.streak)) ? Math.max(0, Number(incoming.streak)) : 0,
        lastLesson: LESSONS[incoming.lastLesson] ? incoming.lastLesson : nextLesson(),
        lessonActivity: incoming.lessonActivity && typeof incoming.lessonActivity === "object" && !Array.isArray(incoming.lessonActivity)
          ? Object.fromEntries(Object.entries(incoming.lessonActivity).filter(([id, value]) => LESSONS[id] && value && typeof value === "object" && !Array.isArray(value)))
          : {}
      };
      STORE.replaceState(sanitized); renderProgress(); toast("Progreso importado correctamente.");
    } catch (error) { toast(`No se pudo importar: ${error.message}`, "error"); }
  });
  input.click();
}

function askConfirmation({title='¿Quieres continuar?', message='', confirmLabel='Confirmar'} = {}) {
  const dialog = document.getElementById('confirmDialog');
  if (!dialog || typeof dialog.showModal !== 'function') return Promise.resolve(false);
  document.getElementById('confirmDialogTitle').textContent = title;
  document.getElementById('confirmDialogMessage').textContent = message;
  document.getElementById('confirmDialogAccept').textContent = confirmLabel;
  const previousFocus = document.activeElement;
  return new Promise(resolve => {
    const finish = () => {
      dialog.removeEventListener('close', finish);
      const accepted = dialog.returnValue === 'confirm';
      if (previousFocus && typeof previousFocus.focus === 'function') setTimeout(() => previousFocus.focus(), 0);
      resolve(accepted);
    };
    dialog.addEventListener('close', finish, {once:true});
    dialog.returnValue = 'cancel';
    dialog.showModal();
  });
}

async function resetProgress() {
  const accepted = await askConfirmation({
    title: 'Reiniciar todo el progreso',
    message: 'Se borrarán el progreso, los errores y el tiempo guardado en este navegador. Esta acción no se puede deshacer.',
    confirmLabel: 'Reiniciar progreso'
  });
  if (!accepted) return;
  state.completed = []; state.errors = []; state.minutes = 0; state.streak = 0; state.lastLesson = null; state.lessonActivity = {}; state.practiceAttempts = {};
  STORE.save(); renderProgress(); updateNavBadges(); toast("Progreso reiniciado.");
}


// -----------------------------------------------------------------------------
// Objetivos y cuenta
// -----------------------------------------------------------------------------

function goalCurrentValue(goal) {
  if (goal.metric === 'minutes') return state.minutes || 0;
  if (goal.metric === 'area_percent') {
    const area = GOAL_AREAS.find(a => a.id === goal.area_id);
    return area ? goalAreaProgress(area) : 0;
  }
  if (goal.metric === 'lessons') {
    if (!goal.area_id) return state.completed.filter(id => LESSONS[id]).length;
    const area = GOAL_AREAS.find(a => a.id === goal.area_id);
    if (!area) return 0;
    const ids = new Set(lessonsForArea(area).map(l => l.id));
    return state.completed.filter(id => ids.has(id)).length;
  }
  return 0;
}

function renderGoals() {
  view.innerHTML = `
    <div class="page-title"><span class="eyebrow">Dirección, no presión</span><h1>◎ Mis objetivos</h1><p>Crea metas medibles y cámbialas cuando dejen de servirte. USIC calcula el avance a partir de tu progreso real.</p></div>
    <section class="goal-dashboard-grid">
      <article class="panel"><span class="eyebrow">Nuevo objetivo</span><h2>¿Qué quieres conseguir?</h2>
        <div class="goal-presets">
          <button type="button" class="chip" data-goal-preset="week180">3 h esta semana</button>
          <button type="button" class="chip" data-goal-preset="lessons10">10 lecciones</button>
          <button type="button" class="chip" data-goal-preset="area25">25% de un área</button>
        </div>
        <form id="goalForm" class="goal-form">
          <input type="hidden" name="goal_id" value="">
          <label>Nombre<input name="title" required maxlength="120" placeholder="Ej. Dominar fundamentos de redes"></label>
          <div class="goal-form-row"><label>Métrica<select name="metric"><option value="lessons">Lecciones dominadas</option><option value="minutes">Minutos estudiados</option><option value="area_percent">% de un área</option></select></label><label>Meta<input name="target" type="number" min="1" required value="10"></label></div>
          <label>Área (opcional)<select name="area_id"><option value="">Toda la universidad</option>${GOAL_AREAS.map(a=>`<option value="${a.id}">${escapeHtml(a.name)}</option>`).join('')}</select></label>
          <label>Fecha objetivo (opcional)<input name="deadline" type="date"></label>
          <div class="goal-form-actions"><button class="btn btn-primary" type="submit">Crear objetivo</button><button class="btn btn-secondary" type="button" id="cancelGoalEdit" hidden>Cancelar edición</button></div>
          <small class="field-hint">Consejo: una meta útil tiene una medida que USIC pueda observar y una fecha que puedas revisar sin convertirla en presión artificial.</small>
        </form>
      </article>
      <article class="panel"><span class="eyebrow">Activos</span><h2>Tus metas</h2><div id="goalList"><p class="muted">Cargando…</p></div></article>
    </section>`;
  bindGoalForm(); bindGoalPresets(); loadGoals();
}

function bindGoalPresets(){
  const form=document.getElementById('goalForm');
  if(!form) return;
  document.querySelectorAll('[data-goal-preset]').forEach(btn=>btn.addEventListener('click',()=>{
    const p=btn.dataset.goalPreset;
    if(p==='week180'){ form.elements.title.value='Estudiar 3 horas esta semana'; form.elements.metric.value='minutes'; form.elements.target.value=180; form.elements.area_id.value=''; const d=new Date(); d.setDate(d.getDate()+(7-d.getDay())); form.elements.deadline.value=d.toISOString().slice(0,10); }
    if(p==='lessons10'){ form.elements.title.value='Dominar 10 lecciones'; form.elements.metric.value='lessons'; form.elements.target.value=10; form.elements.area_id.value=''; form.elements.deadline.value=''; }
    if(p==='area25'){ form.elements.title.value='Completar el 25% de un área'; form.elements.metric.value='area_percent'; form.elements.target.value=25; if(!form.elements.area_id.value) form.elements.area_id.value=GOAL_AREAS[0]?.id||''; form.elements.deadline.value=''; }
    form.scrollIntoView({behavior:'smooth',block:'center'});
  }));
}

function resetGoalForm(form){
  if(!form) return;
  form.reset();
  form.elements.goal_id.value='';
  const submit=form.querySelector('[type="submit"]');
  if(submit) submit.textContent='Crear objetivo';
  const cancel=document.getElementById('cancelGoalEdit');
  if(cancel) cancel.hidden=true;
}

function editUserGoal(goal){
  const form=document.getElementById('goalForm');
  if(!form || !goal) return;
  form.elements.goal_id.value=goal.id||'';
  form.elements.title.value=goal.title||'';
  form.elements.metric.value=goal.metric||'lessons';
  form.elements.target.value=goal.target||1;
  form.elements.area_id.value=goal.area_id||'';
  form.elements.deadline.value=goal.deadline||'';
  const submit=form.querySelector('[type="submit"]');
  if(submit) submit.textContent='Guardar cambios';
  const cancel=document.getElementById('cancelGoalEdit');
  if(cancel) cancel.hidden=false;
  form.scrollIntoView({behavior:'smooth',block:'center'});
  form.elements.title.focus();
}

function bindGoalForm(){
  const form=document.getElementById('goalForm');
  document.getElementById('cancelGoalEdit')?.addEventListener('click',()=>resetGoalForm(form));
  form?.addEventListener('submit',async e=>{
    e.preventDefault(); if(!window.USIC_AUTH) return toast('Todavía conectando con tu cuenta.', 'error');
    const fd=new FormData(form); const metric=String(fd.get('metric')); let area=String(fd.get('area_id')||'')||null;
    const goalId=String(fd.get('goal_id')||'').trim();
    const title=String(fd.get('title')||'').trim(); const target=Number(fd.get('target')); const deadline=String(fd.get('deadline')||'')||null;
    if(!title) return toast('Pon un nombre al objetivo.','error');
    if(title.length>120) return toast('El nombre del objetivo no puede superar 120 caracteres.','error');
    if(!['lessons','minutes','area_percent'].includes(metric)) return toast('El tipo de objetivo no es válido.','error');
    if(!Number.isFinite(target) || target<=0) return toast('La meta debe ser un número mayor que cero.','error');
    if(metric==='area_percent' && (target>100 || !area)){ return toast(target>100?'El porcentaje no puede superar el 100%.':'Para una meta porcentual elige un área.','error'); }
    if(deadline){ const d=new Date(`${deadline}T00:00:00`); if(Number.isNaN(d.getTime())) return toast('La fecha límite no es válida.','error'); }
    const submit=form.querySelector('[type="submit"]'); if(submit){submit.disabled=true;submit.textContent=goalId?'Guardando…':'Creando…';}
    try {
      const patch={title,metric,target,area_id:area,deadline};
      if(goalId) await window.USIC_AUTH.updateGoal(goalId,patch); else await window.USIC_AUTH.createGoal(patch);
      resetGoalForm(form);
      toast(goalId?'Objetivo actualizado.':'Objetivo creado.');
      await loadGoals();
    }
    catch(err){ toast(`No se pudo ${goalId?'actualizar':'crear'}: ${err.message||'error desconocido'}`, "error"); }
    finally{if(submit && submit.isConnected && !goalId){submit.disabled=false;submit.textContent='Crear objetivo';} else if(submit?.isConnected){submit.disabled=false;}}
  });
}

async function loadGoals(){
  const box=document.getElementById('goalList'); if(!box || !window.USIC_AUTH) return;
  try {
    const goals=await window.USIC_AUTH.listGoals();
    const active=goals.filter(g=>g.status!=='archived');
    window.USIC_ACTIVE_GOALS=active;
    box.innerHTML=active.length?active.map(g=>{
      const cur=goalCurrentValue(g), pct=Math.min(100,Math.round(cur/Number(g.target)*100));
      const done=pct>=100||g.status==='completed';
      const today=new Date();today.setHours(0,0,0,0);
      const due=g.deadline?new Date(`${g.deadline}T00:00:00`):null;
      const days=due?Math.ceil((due-today)/86400000):null;
      const timing=days===null?'sin fecha':days<0?`vencido hace ${Math.abs(days)} días`:days===0?'vence hoy':days<=7?`faltan ${days} días`:`hasta ${g.deadline}`;
      const metricLabel=g.metric==='minutes'?'minutos':g.metric==='area_percent'?'% del área':'lecciones';
      return `<article class="user-goal ${done?'goal-done':''} ${!done&&days!==null&&days<0?'goal-overdue':''}" data-goal-card="${escapeHtml(g.id)}"><div><b>${escapeHtml(g.title)}</b><small>${cur} / ${g.target} ${metricLabel} · ${timing}</small></div>${progressBar(pct)}${!done&&days!==null&&days<0?`<p class="goal-warning">La fecha pasó, pero el objetivo sigue activo. Ajustar una meta es parte de planificar, no un fracaso.</p>`:''}<div class="goal-actions"><button class="chip" data-goal-action="edit" data-goal-id="${g.id}">Editar</button>${!done?`<button class="chip" data-goal-action="complete" data-goal-id="${g.id}">Marcar completado</button>`:''}<button class="chip" data-goal-action="remove" data-goal-id="${g.id}">Eliminar</button></div></article>`;
    }).join(''):`<div class="empty-note">Todavía no tienes objetivos. Empieza con una meta pequeña y observable; puedes editarla cuando cambie tu situación.</div>`;
  } catch(err){
    const setup=/schema cache|could not find the table|does not exist|goals/i.test(String(err?.message||''));
    box.innerHTML=`<div class="empty-note">${setup?'La tabla de objetivos todavía no está disponible. Ejecuta SUPABASE_SETUP.sql.':'No pudimos cargar tus objetivos ahora mismo. Tu progreso no se ha perdido; vuelve a intentarlo en unos segundos.'}</div>`;
  }
}

async function completeUserGoal(id){ if(!window.USIC_AUTH) return toast('La cuenta todavía se está inicializando.','error'); try{await window.USIC_AUTH.updateGoal(id,{status:'completed'});loadGoals();}catch(e){toast(e.message || 'No se pudo completar el objetivo.','error');} }
async function removeUserGoal(id){ if(!window.USIC_AUTH) return toast('La cuenta todavía se está inicializando.','error'); const accepted=await askConfirmation({title:'Eliminar objetivo',message:'El objetivo se eliminará de tu cuenta. Esta acción no se puede deshacer.',confirmLabel:'Eliminar objetivo'}); if(!accepted)return; try{await window.USIC_AUTH.deleteGoal(id);loadGoals();}catch(e){toast(e.message || 'No se pudo eliminar el objetivo.','error');} }

function accountLearningSnapshot(){
  const practice=Object.values(state.practiceAttempts||{});
  const practiceSolved=practice.filter(item=>item?.correct || item?.selfAssessed==='understood').length;
  const attempts=practice.reduce((sum,item)=>sum+(Number(item?.attempts)||0),0);
  const pendingReview=reviewQueue().length;
  const recentErrors=(state.errors||[]).filter(error=>Date.now()-Number(error.date||0)<30*86400000).length;
  const last=state.lastLesson && LESSONS[state.lastLesson] ? LESSONS[state.lastLesson] : null;
  return {practiceSolved,attempts,pendingReview,recentErrors,last};
}

function formatAccountDate(value){
  if(!value) return 'No disponible';
  const date=new Date(value);
  return Number.isNaN(date.getTime())?'No disponible':date.toLocaleString('es-ES',{dateStyle:'medium',timeStyle:'short'});
}

function renderAccount(){
  const user=window.USIC_AUTH?.session?.user, profile=window.USIC_AUTH?.profile;
  const cloudIssue=window.USIC_CLOUD_WARNING;
  const cloudIssues=window.USIC_CLOUD_STATE?.issues||[];
  const cloudNeedsSetup=cloudIssues.some(i=>i.needsSetup);
  const cloudLabel=!cloudIssue?'● Cloud activo':cloudNeedsSetup?'● Solo local':'● Reintento pendiente';
  const snapshot=accountLearningSnapshot();
  const total=Object.keys(LESSONS).length;
  const completed=state.completed.filter(id=>LESSONS[id]).length;
  const completionPct=total?Math.round(completed/total*100):0;
  const provider=user?.app_metadata?.provider||'email';
  const focusName=profile?.focus_area ? (GOAL_AREAS.find(a=>a.id===profile.focus_area)?.name||profile.focus_area) : 'Sin área prioritaria';

  view.innerHTML=`<div class="page-title"><span class="eyebrow">Centro personal USIC</span><h1>Tu cuenta y aprendizaje</h1><p>Gestiona identidad, dirección de estudio, seguridad, sincronización y señales reales de aprendizaje desde un único lugar.</p></div>
    <div id="cloudWarning" class="cloud-warning" ${cloudIssue?'':'hidden'}>${cloudIssue?`<strong>${cloudNeedsSetup?'Configuración cloud incompleta.':'Sincronización temporalmente degradada.'}</strong><span>La aplicación mantiene una copia local. ${escapeHtml(cloudIssue)}.</span><small>${cloudNeedsSetup?'Administrador: ejecuta SUPABASE_SETUP.sql en Supabase.':'No necesitas hacer nada: volveremos a intentarlo automáticamente.'}</small>`:''}</div>

    <section class="account-overview-grid">
      <article class="panel account-identity"><div class="account-avatar" data-user-avatar>${escapeHtml((profile?.display_name||'U')[0])}</div><div><span class="eyebrow">Identidad</span><h2 data-user-name>${escapeHtml(profile?.display_name||'Estudiante')}</h2><p data-user-email>${escapeHtml(user?.email||'')}</p><p><span class="sync-pill ${cloudIssue?'local':''}" id="accountSync">${cloudLabel}</span></p></div></article>
      <article class="panel account-learning-summary"><span class="eyebrow">Tu aprendizaje</span><h2>${completionPct}% del contenido dominado</h2>${progressBar(completionPct)}<div class="account-mini-stats"><span><b>${completed}</b><small>lecciones</small></span><span><b>${snapshot.practiceSolved}</b><small>prácticas comprendidas</small></span><span><b>${snapshot.pendingReview}</b><small>repasos pendientes</small></span><span><b>${snapshot.recentErrors}</b><small>errores recientes</small></span></div></article>
    </section>

    <section class="account-grid">
      <article class="panel"><span class="eyebrow">Perfil de estudio</span><h2>Identidad y dirección</h2><form id="profileForm" class="auth-form"><label>Nombre visible<input name="display_name" maxlength="60" value="${escapeHtml(profile?.display_name||'')}"></label><label>Área principal<select name="focus_area"><option value="">Sin prioridad fija</option>${GOAL_AREAS.map(area=>`<option value="${escapeHtml(area.id)}" ${profile?.focus_area===area.id?'selected':''}>${escapeHtml(area.name)}</option>`).join('')}</select></label><label>Meta semanal de estudio<input name="weekly_goal_minutes" type="number" min="30" max="3000" value="${Number(profile?.weekly_goal_minutes)||180}"><small>Minutos por semana. Es una referencia, no una obligación.</small></label><button class="btn btn-primary">Guardar perfil</button></form></article>

      <article class="panel"><span class="eyebrow">Continuidad</span><h2>Qué hacer a continuación</h2><div class="account-next-list"><div><b>Área principal</b><span>${escapeHtml(focusName)}</span></div><div><b>Última lección</b><span>${snapshot.last?escapeHtml(snapshot.last.title):'Todavía no has abierto ninguna'}</span></div><div><b>Intentos de práctica</b><span>${snapshot.attempts}</span></div></div><div class="account-actions">${snapshot.last?`<button class="btn btn-secondary" data-nav="tema" data-nav-arg="${escapeHtml(snapshot.last.id)}">Continuar última lección</button>`:''}<button class="btn btn-secondary" data-nav="repasar">Abrir repaso</button><button class="btn btn-secondary" data-nav="objetivos">Gestionar objetivos</button></div></article>

      <article class="panel"><span class="eyebrow">Cuenta</span><h2>Información de acceso</h2><dl class="account-details"><div><dt>Email</dt><dd>${escapeHtml(user?.email||'No disponible')}</dd></div><div><dt>Proveedor</dt><dd>${escapeHtml(provider)}</dd></div><div><dt>Cuenta creada</dt><dd>${escapeHtml(formatAccountDate(user?.created_at))}</dd></div><div><dt>Último acceso</dt><dd>${escapeHtml(formatAccountDate(user?.last_sign_in_at))}</dd></div></dl><p class="muted">El email se gestiona desde el proveedor de autenticación. El progreso académico y los objetivos pueden seguir funcionando localmente si la nube está temporalmente caída.</p></article>

      <article class="panel"><span class="eyebrow">Tus datos</span><h2>Progreso y portabilidad</h2><p>Consulta estadísticas detalladas, exporta una copia o revisa tus errores sin mezclar estas acciones con la seguridad de la cuenta.</p><div class="account-actions"><button class="btn btn-secondary" data-nav="progreso">Ver progreso completo</button><button class="btn btn-secondary" data-nav="errores">Revisar errores</button><button class="btn btn-secondary" data-action="export-progress">Exportar progreso</button></div></article>

      <article class="panel account-security"><span class="eyebrow">Seguridad</span><h2>Contraseña y sesión</h2><p class="muted">Actualiza tu contraseña sin salir de tu cuenta. USIC nunca muestra ni almacena tu contraseña actual.</p><form id="passwordForm" class="auth-form compact-form"><label>Nueva contraseña<span class="password-field"><input type="password" name="password" minlength="8" required autocomplete="new-password" placeholder="Mínimo 8 caracteres"><button class="password-toggle" type="button" data-password-inline-toggle aria-label="Mostrar contraseña">Ver</button></span></label><label>Repite la contraseña<span class="password-field"><input type="password" name="password_confirm" minlength="8" required autocomplete="new-password" placeholder="Repite la contraseña"><button class="password-toggle" type="button" data-password-inline-toggle aria-label="Mostrar contraseña">Ver</button></span></label><small class="field-hint">Mejor una frase larga y única que una contraseña corta con sustituciones previsibles.</small><button class="btn btn-primary" type="submit">Actualizar contraseña</button></form><hr class="panel-divider"><button class="btn btn-secondary" id="signOutBtn">Cerrar sesión</button></article>

      <article class="panel"><span class="eyebrow">Configuración guiada</span><h2>Rehacer orientación inicial</h2><p>Si tu objetivo ha cambiado, puedes volver a elegir área principal y meta semanal sin borrar ningún progreso.</p><button class="btn btn-secondary" id="reopenOnboarding">Abrir orientación</button></article>
    </section>`;

  document.getElementById('profileForm')?.addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget;const fd=new FormData(form);const name=String(fd.get('display_name')||'').trim();const weekly=Number(fd.get('weekly_goal_minutes'));const focus=String(fd.get('focus_area')||'')||null;if(name.length<2)return toast('El nombre visible debe tener al menos 2 caracteres.','error');if(name.length>60)return toast('El nombre visible no puede superar 60 caracteres.','error');if(!Number.isFinite(weekly)||weekly<30||weekly>3000)return toast('La meta semanal debe estar entre 30 y 3000 minutos.','error');if(focus&&!GOAL_AREAS.some(area=>area.id===focus))return toast('El área principal seleccionada no es válida.','error');const submit=form.querySelector('[type="submit"]');if(submit){submit.disabled=true;submit.textContent='Guardando…';}try{await window.USIC_AUTH.updateProfile({display_name:name,weekly_goal_minutes:weekly,focus_area:focus});toast('Perfil actualizado.');renderAccount();}catch(err){toast(err.message || 'No se pudo actualizar el perfil.','error');}finally{if(submit?.isConnected){submit.disabled=false;submit.textContent='Guardar perfil';}}});
  document.getElementById('reopenOnboarding')?.addEventListener('click',()=>window.USIC_AUTH?.showOnboarding());
  document.getElementById('signOutBtn')?.addEventListener('click',async e=>{
    const button=e.currentTarget; button.disabled=true; const label=button.textContent; button.textContent='Cerrando sesión…';
    try{const result=await window.USIC_AUTH?.signOut();if(result?.error) toast('Se cerró la sesión local, pero no pudimos confirmar el cierre remoto.','warning');}
    catch(error){toast(error?.message || 'No se pudo cerrar la sesión correctamente.','error');}
    finally{if(button.isConnected){button.disabled=false;button.textContent=label;}}
  });
  document.querySelectorAll('[data-password-inline-toggle]').forEach(btn=>btn.addEventListener('click',()=>{const input=btn.closest('.password-field')?.querySelector('input');if(!input)return;const show=input.type==='password';input.type=show?'text':'password';btn.textContent=show?'Ocultar':'Ver';btn.setAttribute('aria-label',show?'Ocultar contraseña':'Mostrar contraseña');}));
  document.getElementById('passwordForm')?.addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget;const fd=new FormData(form);const p=String(fd.get('password')||'');const p2=String(fd.get('password_confirm')||'');if(p.length<8)return toast('Usa al menos 8 caracteres.','error');if(p!==p2)return toast('Las contraseñas no coinciden.','error');const submit=form.querySelector('button[type=submit]');submit.disabled=true;submit.textContent='Actualizando…';try{const {error}=await window.USIC_AUTH.updatePassword(p);if(error)throw error;form.reset();toast('Contraseña actualizada.');}catch(err){toast(err.message||'No se pudo actualizar la contraseña.','error');}finally{submit.disabled=false;submit.textContent='Actualizar contraseña';}});
}

// -----------------------------------------------------------------------------
// Buscador
// -----------------------------------------------------------------------------

const searchOverlay = $("#searchOverlay");
const searchInput = $("#globalSearch");
const searchResults = $("#searchResults");
let searchReturnFocus = null;

function openSearch() {
  if (!searchOverlay.classList.contains("open")) searchReturnFocus = document.activeElement;
  searchOverlay.classList.add("open");
  searchOverlay.setAttribute("aria-hidden", "false");
  $("#searchTrigger")?.setAttribute("aria-expanded", "true");
  document.body.classList.add("overlay-open");
  searchInput.focus();
  performSearch("");
}

function closeSearch({ restoreFocus = true } = {}) {
  if (!searchOverlay.classList.contains("open")) return;
  searchOverlay.classList.remove("open");
  searchOverlay.setAttribute("aria-hidden", "true");
  $("#searchTrigger")?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("overlay-open");
  if (restoreFocus && searchReturnFocus && typeof searchReturnFocus.focus === "function") {
    const target = searchReturnFocus;
    searchReturnFocus = null;
    setTimeout(() => target.focus(), 0);
  } else {
    searchReturnFocus = null;
  }
}

function performSearch(query) {
  const term = normalizeAnswer(query);
  const results = [];

  Object.values(LESSONS).forEach(lesson => {
    const searchable = normalizeAnswer([
      lesson.title,
      lesson.shortTitle,
      lesson.objective,
      ...lesson.summary,
      ...lesson.rules
    ].join(" "));

    if (!term || searchable.includes(term)) {
      results.push({ type: "lesson", item: lesson });
    }
  });

  COURSES.forEach(course => {
    const searchable = normalizeAnswer(`${course.name} ${course.title} ${course.topics.join(" ")}`);
    if ((!term || searchable.includes(term)) && !results.some(result => result.type === "lesson" && result.item.courseId === course.id)) {
      results.push({ type: "course", item: course });
    }
  });

  const limited = results.slice(0, 14);

  searchResults.innerHTML = limited.length
    ? limited.map(result => result.type === "lesson"
      ? `
          <button type="button" class="search-result" data-search-route="tema" data-search-id="${escapeHtml(result.item.id)}">
            <b>${escapeHtml(result.item.title)}</b>
            <small>Lección desarrollada · Bloque ${formatCourseNumber(result.item.courseId)}</small>
          </button>
        `
      : `
          <button type="button" class="search-result" data-search-route="curso" data-search-id="${Number(result.item.id)}">
            <b>${formatCourseNumber(result.item.id)} · ${escapeHtml(result.item.name)}</b>
            <small>${escapeHtml(result.item.title)}</small>
          </button>
        `).join("")
    : `<div class="empty-note">No encuentro ese concepto todavía. Prueba otra formulación.</div>`;
  searchResults.setAttribute("aria-label", limited.length ? `${limited.length} resultados de búsqueda` : "Sin resultados de búsqueda");
}

// -----------------------------------------------------------------------------
// Helpers de interfaz y eventos globales
// -----------------------------------------------------------------------------

function goSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}


// -----------------------------------------------------------------------------
// Laboratorios interactivos
// -----------------------------------------------------------------------------

function renderLabHub() {
  const labs = Object.values(window.PRACTICAL_LABS || {});
  view.innerHTML = `
    <div class="page-title lab-page-title">
      <span class="eyebrow">Laboratorio USIC · ejecutar > memorizar</span>
      <h1>Programa, rompe, observa, corrige.</h1>
      <p>Los runtimes marcados como reales ejecutan código real en el navegador. Las máquinas educativas están etiquetadas explícitamente y existen para hacer visible lo que normalmente ocurre debajo.</p>
    </div>
    <div class="lab-catalog">
      ${labs.map(lab => `
        <article class="lab-card" data-nav="lab" data-nav-arg="${escapeHtml(lab.id)}">
          <div class="lab-card-top"><span class="lab-mode">${escapeHtml(lab.badge)}</span><span>→</span></div>
          <h2>${escapeHtml(lab.title)}</h2>
          <p>${escapeHtml(lab.description)}</p>
          <footer>${lab.courseIds.slice(0, 6).map(id => `<span>Bloque ${formatCourseNumber(id)}</span>`).join("")}</footer>
        </article>
      `).join("")}
    </div>
    <article class="panel lab-honesty">
      <span class="eyebrow">Qué significa «ejecutable» aquí</span>
      <h2>Sin humo técnico</h2>
      <p><b>JavaScript y el playground web</b> usan el motor real del navegador. <b>Assembly USIC</b> y el <b>Compilador USIC</b> son máquinas educativas implementadas por la propia plataforma: puedes ejecutarlas e inspeccionarlas, pero no pretenden ser GCC, Clang, x86-64 ni RISC-V.</p>
    </article>
  `;
}

function renderLab(labId) {
  const lab = window.PRACTICAL_LABS && window.PRACTICAL_LABS[labId];
  if (!lab) return renderNotFound("Ese laboratorio no existe.");

  view.innerHTML = `
    <div class="lab-shell">
      <header class="lab-header">
        <button class="back-link" data-nav="laboratorio">← Todos los laboratorios</button>
        <span class="eyebrow">${escapeHtml(lab.badge)}</span>
        <h1>${escapeHtml(lab.title)}</h1>
        <p>${escapeHtml(lab.description)}</p>
      </header>
      ${renderLabWorkspace(lab)}
    </div>
  `;
  bindLab(lab);
}

function renderLabWorkspace(lab) {
  if (lab.mode === "logic") return renderLogicLab(lab);
  if (lab.mode === "assembly") return renderAssemblyLab(lab);
  if (lab.mode === "compiler") return renderCompilerLab(lab);
  if (lab.mode === "web") return renderWebLab(lab);
  return renderJavascriptLab(lab);
}

function labEditor(value, languageLabel) {
  return `
    <div class="lab-pane lab-editor-pane">
      <div class="lab-pane-head"><b>Editor</b><span>${escapeHtml(languageLabel)}</span></div>
      <textarea id="labEditor" class="code-editor" spellcheck="false">${escapeHtml(value)}</textarea>
    </div>`;
}

function labOutput(title = "Salida") {
  return `
    <div class="lab-pane lab-output-pane">
      <div class="lab-pane-head"><b>${escapeHtml(title)}</b><button class="tiny-btn" id="clearLabOutput">Limpiar</button></div>
      <pre id="labOutput" class="terminal-output" aria-live="polite">Listo.</pre>
    </div>`;
}

function renderJavascriptLab(lab) {
  return `
    <div class="lab-toolbar">
      <button class="btn btn-primary" id="runLab">▶ Ejecutar</button>
      <button class="btn btn-secondary" id="runTests">✓ Ejecutar tests</button>
      <button class="btn btn-secondary" id="resetLab">↺ Reiniciar</button>
      <span class="lab-security">Worker aislado · límite 2 s</span>
    </div>
    <div class="lab-workspace two-pane">
      ${labEditor(lab.starter, "JavaScript")}
      ${labOutput("stdout / tests")}
    </div>
    <section class="panel lab-tests-panel">
      <span class="eyebrow">Tests incluidos</span>
      ${lab.tests.map(test => `<code>${escapeHtml(test.label)}</code>`).join("")}
    </section>`;
}

function renderWebLab(lab) {
  return `
    <div class="lab-toolbar">
      <button class="btn btn-primary" id="runLab">▶ Actualizar preview</button>
      <button class="btn btn-secondary" id="resetLab">↺ Reiniciar</button>
      <span class="lab-security">iframe sandboxed</span>
    </div>
    <div class="lab-workspace two-pane web-workspace">
      ${labEditor(lab.starter, "HTML + CSS + JS")}
      <div class="lab-pane preview-pane">
        <div class="lab-pane-head"><b>Preview</b><span>documento aislado</span></div>
        <iframe id="webPreview" sandbox="allow-scripts" title="Vista previa del código"></iframe>
      </div>
    </div>`;
}

function renderLogicLab(lab) {
  return `
    <div class="lab-toolbar">
      <button class="btn btn-primary" id="runLab">Generar tabla</button>
      <button class="btn btn-secondary" id="resetLab">↺ Reiniciar</button>
      <span class="lab-security">Variables A–Z · ! && || ^</span>
    </div>
    <div class="lab-workspace two-pane">
      ${labEditor(lab.starter, "Expresión booleana")}
      <div class="lab-pane lab-output-pane">
        <div class="lab-pane-head"><b>Tabla de verdad</b><span>0 = falso · 1 = verdadero</span></div>
        <div id="logicOutput" class="logic-output"></div>
      </div>
    </div>`;
}

function renderAssemblyLab(lab) {
  return `
    <div class="lab-toolbar">
      <button class="btn btn-primary" id="runLab">▶ Ejecutar</button>
      <button class="btn btn-secondary" id="stepLab">Paso</button>
      <button class="btn btn-secondary" id="resetLab">↺ Reset CPU</button>
      <span class="lab-security">ISA educativa · R0–R7 · máximo 10 000 pasos</span>
    </div>
    <div class="lab-workspace two-pane">
      ${labEditor(lab.starter, "Assembly USIC")}
      <div class="lab-pane cpu-pane">
        <div class="lab-pane-head"><b>Estado CPU</b><span id="cpuStatus">detenida</span></div>
        <div class="register-grid" id="registerGrid"></div>
        <pre id="labOutput" class="terminal-output cpu-output">Listo.</pre>
      </div>
    </div>
    <article class="panel instruction-help">
      <b>ISA disponible:</b> <code>MOV Rd, x</code> <code>ADD Rd, x</code> <code>SUB Rd, x</code> <code>MUL Rd, x</code> <code>CMP a, b</code> <code>JMP label</code> <code>JZ label</code> <code>JNZ label</code> <code>PRINT x</code> <code>HLT</code>. Los operandos pueden ser registros o enteros.
    </article>`;
}

function renderCompilerLab(lab) {
  return `
    <div class="lab-toolbar">
      <button class="btn btn-primary" id="runLab">⚙ Compilar y ejecutar</button>
      <button class="btn btn-secondary" id="resetLab">↺ Reiniciar</button>
      <span class="lab-security">Lenguaje USIC · compilador real de juguete</span>
    </div>
    <div class="lab-workspace two-pane">
      ${labEditor(lab.starter, "USIC language")}
      ${labOutput("Salida de la VM")}
    </div>
    <div class="compiler-inspector">
      <div class="lab-pane"><div class="lab-pane-head"><b>Tokens</b></div><pre id="compilerTokens" class="terminal-output"></pre></div>
      <div class="lab-pane"><div class="lab-pane-head"><b>AST</b></div><pre id="compilerAst" class="terminal-output"></pre></div>
      <div class="lab-pane"><div class="lab-pane-head"><b>Bytecode</b></div><pre id="compilerBytecode" class="terminal-output"></pre></div>
    </div>
    <article class="panel instruction-help"><b>Gramática:</b> <code>let nombre = expresión;</code> y <code>print expresión;</code>. Operadores: <code>+ - * /</code> y paréntesis.</article>`;
}

function bindLab(lab) {
  const editor = $("#labEditor");
  const reset = $("#resetLab");
  if (reset) reset.addEventListener("click", () => {
    editor.value = lab.starter;
    if (lab.mode === "assembly") resetAssemblyMachine();
    else if (lab.mode === "web") runWebLab();
    else if (lab.mode === "logic") runLogicLab();
    else if ($("#labOutput")) $("#labOutput").textContent = "Listo.";
  });

  const clear = $("#clearLabOutput");
  if (clear) clear.addEventListener("click", () => $("#labOutput").textContent = "");

  if (lab.mode === "javascript") {
    $("#runLab").addEventListener("click", () => runJavascriptWorker(editor.value, []));
    $("#runTests").addEventListener("click", () => runJavascriptWorker(editor.value, lab.tests));
  } else if (lab.mode === "web") {
    $("#runLab").addEventListener("click", runWebLab);
    runWebLab();
  } else if (lab.mode === "logic") {
    $("#runLab").addEventListener("click", runLogicLab);
    runLogicLab();
  } else if (lab.mode === "assembly") {
    window.__usicCpu = null;
    $("#runLab").addEventListener("click", () => runAssembly(false));
    $("#stepLab").addEventListener("click", () => runAssembly(true));
    resetAssemblyMachine();
  } else if (lab.mode === "compiler") {
    $("#runLab").addEventListener("click", runCompilerLab);
  }
}

function runJavascriptWorker(source, tests) {
  const output = $("#labOutput");
  output.textContent = "Ejecutando…";
  const workerSource = `
    const lines = [];
    const fmt = v => typeof v === 'string' ? v : (() => { try { return JSON.stringify(v); } catch { return String(v); } })();
    console.log = (...args) => lines.push(args.map(fmt).join(' '));
    console.error = (...args) => lines.push('[error] ' + args.map(fmt).join(' '));
    self.onmessage = e => {
      try {
        const fn = new Function(e.data.source + '\\n' + e.data.tests.map((t,i) => 'globalThis.__t'+i+' = ('+t.expression+');').join('\\n'));
        fn();
        const results = e.data.tests.map((t,i) => ({label:t.label, ok:Boolean(globalThis['__t'+i])}));
        self.postMessage({ok:true, lines, results});
      } catch (error) { self.postMessage({ok:false, lines, error: error.name + ': ' + error.message}); }
    };
  `;
  const url = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
  const worker = new Worker(url);
  const timer = setTimeout(() => {
    worker.terminate(); URL.revokeObjectURL(url);
    output.textContent = "⏱ Ejecución detenida: superó el límite de 2 segundos.";
  }, 2000);
  worker.onmessage = event => {
    clearTimeout(timer); worker.terminate(); URL.revokeObjectURL(url);
    const { ok, lines, error, results } = event.data;
    const renderedTests = (results || []).map(t => `${t.ok ? "✓" : "✗"} ${t.label}`).join("\n");
    output.textContent = [lines.join("\n"), renderedTests, ok ? "" : error].filter(Boolean).join("\n") || "(sin salida)";
  };
}

function runWebLab() {
  const frame = $("#webPreview");
  if (frame) frame.srcdoc = $("#labEditor").value;
}

function logicVariables(expression) {
  return [...new Set((expression.match(/[A-Z]/g) || []))].sort();
}

function evaluateLogic(expression, env) {
  if (!/^[A-Z01\s!&|^()]+$/.test(expression)) throw new Error("Solo se admiten A–Z, 0/1, !, &&, ||, ^ y paréntesis.");
  let js = expression.replace(/\^/g, "!==");
  for (const [key, value] of Object.entries(env)) js = js.replace(new RegExp(`\\b${key}\\b`, "g"), value ? "true" : "false");
  return Boolean(Function(`"use strict"; return (${js});`)());
}

function runLogicLab() {
  const expression = $("#labEditor").value.trim();
  const target = $("#logicOutput");
  try {
    const vars = logicVariables(expression);
    if (vars.length > 6) throw new Error("Máximo 6 variables para mantener la tabla legible.");
    const rows = 2 ** vars.length;
    let html = `<table class="truth-table"><thead><tr>${vars.map(v => `<th>${v}</th>`).join("")}<th>Resultado</th></tr></thead><tbody>`;
    for (let n = 0; n < rows; n++) {
      const env = {};
      vars.forEach((v, i) => env[v] = Boolean((n >> (vars.length - i - 1)) & 1));
      const result = evaluateLogic(expression, env);
      html += `<tr>${vars.map(v => `<td>${env[v] ? 1 : 0}</td>`).join("")}<td class="truth-result">${result ? 1 : 0}</td></tr>`;
    }
    target.innerHTML = html + "</tbody></table>";
  } catch (error) {
    target.innerHTML = `<div class="feedback show bad">${escapeHtml(error.message)}</div>`;
  }
}

function parseAssembly(source) {
  const labels = {};
  const program = [];
  source.split(/\r?\n/).forEach((raw, lineIndex) => {
    const line = raw.replace(/;.*/, "").trim();
    if (!line) return;
    if (/^[A-Za-z_]\w*:$/.test(line)) { labels[line.slice(0, -1)] = program.length; return; }
    const match = line.match(/^([A-Za-z]+)(?:\s+(.*))?$/);
    if (!match) throw new Error(`Línea ${lineIndex + 1}: sintaxis inválida`);
    const op = match[1].toUpperCase();
    const args = match[2] ? match[2].split(",").map(v => v.trim()) : [];
    program.push({ op, args, sourceLine: lineIndex + 1, text: line });
  });
  return { program, labels };
}

function createCpu(source) {
  const parsed = parseAssembly(source);
  return { ...parsed, regs: Array(8).fill(0), pc: 0, z: false, halted: false, output: [], steps: 0 };
}

function cpuValue(cpu, token) {
  if (/^R[0-7]$/i.test(token)) return cpu.regs[Number(token.slice(1))];
  if (/^-?\d+$/.test(token)) return Number(token);
  throw new Error(`Operando no válido: ${token}`);
}

function cpuReg(token) {
  if (!/^R[0-7]$/i.test(token)) throw new Error(`Se esperaba registro R0–R7, recibido: ${token}`);
  return Number(token.slice(1));
}

function stepCpu(cpu) {
  if (cpu.halted) return;
  if (cpu.pc < 0 || cpu.pc >= cpu.program.length) { cpu.halted = true; return; }
  if (++cpu.steps > 10000) throw new Error("Límite de 10 000 instrucciones alcanzado. ¿Bucle infinito?");
  const ins = cpu.program[cpu.pc];
  const [a, b] = ins.args;
  let next = cpu.pc + 1;
  const jump = label => {
    if (!(label in cpu.labels)) throw new Error(`Etiqueta desconocida: ${label}`);
    next = cpu.labels[label];
  };
  switch (ins.op) {
    case "MOV": cpu.regs[cpuReg(a)] = cpuValue(cpu, b); break;
    case "ADD": cpu.regs[cpuReg(a)] += cpuValue(cpu, b); break;
    case "SUB": cpu.regs[cpuReg(a)] -= cpuValue(cpu, b); break;
    case "MUL": cpu.regs[cpuReg(a)] *= cpuValue(cpu, b); break;
    case "CMP": cpu.z = cpuValue(cpu, a) === cpuValue(cpu, b); break;
    case "JMP": jump(a); break;
    case "JZ": if (cpu.z) jump(a); break;
    case "JNZ": if (!cpu.z) jump(a); break;
    case "PRINT": cpu.output.push(String(cpuValue(cpu, a))); break;
    case "HLT": cpu.halted = true; break;
    default: throw new Error(`Instrucción desconocida '${ins.op}' en línea ${ins.sourceLine}`);
  }
  cpu.pc = next;
}

function paintCpu(cpu, error = "") {
  const grid = $("#registerGrid");
  if (!grid) return;
  grid.innerHTML = cpu.regs.map((v, i) => `<div><span>R${i}</span><b>${v}</b></div>`).join("") + `<div><span>PC</span><b>${cpu.pc}</b></div><div><span>Z</span><b>${cpu.z ? 1 : 0}</b></div>`;
  $("#cpuStatus").textContent = error ? "error" : cpu.halted ? "HLT" : `paso ${cpu.steps}`;
  $("#labOutput").textContent = error || cpu.output.join("\n") || "(sin salida todavía)";
}

function resetAssemblyMachine() {
  try { window.__usicCpu = createCpu($("#labEditor").value); paintCpu(window.__usicCpu); }
  catch (error) { window.__usicCpu = { regs:Array(8).fill(0), pc:0, z:false, halted:true, output:[] }; paintCpu(window.__usicCpu, error.message); }
}

function runAssembly(singleStep) {
  try {
    if (!window.__usicCpu || window.__usicCpu.halted) window.__usicCpu = createCpu($("#labEditor").value);
    if (singleStep) stepCpu(window.__usicCpu);
    else while (!window.__usicCpu.halted) stepCpu(window.__usicCpu);
    paintCpu(window.__usicCpu);
  } catch (error) { paintCpu(window.__usicCpu || createCpu("HLT"), error.message); }
}

function tokenizeUsic(source) {
  const tokens = [];
  const re = /\s+|\/\/[^\n]*|\d+(?:\.\d+)?|[A-Za-z_]\w*|[+\-*\/()=;]/gy;
  let pos = 0;
  while (pos < source.length) {
    re.lastIndex = pos;
    const m = re.exec(source);
    if (!m || m.index !== pos) throw new Error(`Carácter inesperado en posición ${pos}: '${source[pos]}'`);
    pos = re.lastIndex;
    const value = m[0];
    if (/^\s+$/.test(value) || value.startsWith("//")) continue;
    let type = "symbol";
    if (/^\d/.test(value)) type = "number";
    else if (/^[A-Za-z_]/.test(value)) type = ["let", "print"].includes(value) ? "keyword" : "identifier";
    tokens.push({ type, value });
  }
  tokens.push({ type: "eof", value: "<eof>" });
  return tokens;
}

function parseUsic(tokens) {
  let i = 0;
  const peek = () => tokens[i];
  const take = value => {
    const t = tokens[i];
    if (value && t.value !== value) throw new Error(`Esperaba '${value}' y encontré '${t.value}'`);
    i++; return t;
  };
  function primary() {
    const t = peek();
    if (t.type === "number") { take(); return { type:"Number", value:Number(t.value) }; }
    if (t.type === "identifier") { take(); return { type:"Variable", name:t.value }; }
    if (t.value === "(") { take("("); const e = expression(); take(")"); return e; }
    if (t.value === "-") { take("-"); return { type:"Unary", op:"-", value:primary() }; }
    throw new Error(`Expresión inesperada cerca de '${t.value}'`);
  }
  function term() {
    let node = primary();
    while (["*", "/"].includes(peek().value)) { const op = take().value; node = { type:"Binary", op, left:node, right:primary() }; }
    return node;
  }
  function expression() {
    let node = term();
    while (["+", "-"].includes(peek().value)) { const op = take().value; node = { type:"Binary", op, left:node, right:term() }; }
    return node;
  }
  const body = [];
  while (peek().type !== "eof") {
    if (peek().value === "let") {
      take("let"); const name = take().value;
      if (!/^[A-Za-z_]\w*$/.test(name)) throw new Error("Nombre de variable inválido");
      take("="); const value = expression(); take(";"); body.push({ type:"Let", name, value });
    } else if (peek().value === "print") {
      take("print"); const value = expression(); take(";"); body.push({ type:"Print", value });
    } else throw new Error(`Sentencia desconocida cerca de '${peek().value}'`);
  }
  return { type:"Program", body };
}

function compileUsic(ast) {
  const code = [];
  function expr(node) {
    if (node.type === "Number") code.push(["PUSH", node.value]);
    else if (node.type === "Variable") code.push(["LOAD", node.name]);
    else if (node.type === "Unary") { expr(node.value); code.push(["NEG"]); }
    else if (node.type === "Binary") { expr(node.left); expr(node.right); code.push([{ "+":"ADD", "-":"SUB", "*":"MUL", "/":"DIV" }[node.op]]); }
  }
  ast.body.forEach(stmt => {
    expr(stmt.value);
    if (stmt.type === "Let") code.push(["STORE", stmt.name]);
    else code.push(["PRINT"]);
  });
  code.push(["HALT"]);
  return code;
}

function executeUsic(code) {
  const stack = [], vars = {}, output = [];
  for (let pc = 0; pc < code.length; pc++) {
    const [op, arg] = code[pc];
    if (op === "PUSH") stack.push(arg);
    else if (op === "LOAD") { if (!(arg in vars)) throw new Error(`Variable no definida: ${arg}`); stack.push(vars[arg]); }
    else if (op === "STORE") vars[arg] = stack.pop();
    else if (op === "NEG") stack.push(-stack.pop());
    else if (["ADD","SUB","MUL","DIV"].includes(op)) {
      const b = stack.pop(), a = stack.pop();
      if (op === "DIV" && b === 0) throw new Error("División por cero");
      stack.push(op === "ADD" ? a+b : op === "SUB" ? a-b : op === "MUL" ? a*b : a/b);
    } else if (op === "PRINT") output.push(String(stack.pop()));
    else if (op === "HALT") break;
  }
  return { output, vars };
}

function runCompilerLab() {
  const out = $("#labOutput");
  try {
    const tokens = tokenizeUsic($("#labEditor").value);
    const ast = parseUsic(tokens);
    const code = compileUsic(ast);
    const result = executeUsic(code);
    $("#compilerTokens").textContent = tokens.slice(0, -1).map(t => `${t.type.padEnd(10)} ${t.value}`).join("\n");
    $("#compilerAst").textContent = JSON.stringify(ast, null, 2);
    $("#compilerBytecode").textContent = code.map((ins, i) => `${String(i).padStart(3,"0")}  ${ins.join(" ")}`).join("\n");
    out.textContent = result.output.join("\n") || "(sin salida)";
  } catch (error) {
    out.textContent = `${error.name}: ${error.message}`;
  }
}

function renderNotFound(message) {
  view.innerHTML = `
    <div class="empty-note">
      <h2>No encontrado</h2>
      <p>${escapeHtml(message)}</p>
      <button class="btn btn-primary" data-nav="inicio">Volver al inicio</button>
    </div>
  `;
}

view?.addEventListener("click", event => {
  const nav = event.target.closest("[data-nav]");
  if (nav && view.contains(nav)) {
    const name = nav.dataset.nav;
    const arg = nav.dataset.navArg;
    route(name, arg === undefined || arg === "" ? undefined : arg);
    return;
  }
  const section = event.target.closest("[data-section]");
  if (section && view.contains(section)) {
    goSection(section.dataset.section);
    return;
  }
  const goalAction = event.target.closest("[data-goal-action][data-goal-id]");
  if (goalAction && view.contains(goalAction)) {
    if (goalAction.dataset.goalAction === "edit") editUserGoal((window.USIC_ACTIVE_GOALS||[]).find(goal=>String(goal.id)===String(goalAction.dataset.goalId)));
    if (goalAction.dataset.goalAction === "complete") completeUserGoal(goalAction.dataset.goalId);
    if (goalAction.dataset.goalAction === "remove") removeUserGoal(goalAction.dataset.goalId);
    return;
  }
  const action = event.target.closest("[data-action]");
  if (!action || !view.contains(action)) return;
  if (action.dataset.action === "export-progress") exportProgress();
  if (action.dataset.action === "import-progress") importProgress();
  if (action.dataset.action === "reset-progress") resetProgress();
});

$$("[data-route]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    route(button.dataset.route);
  });
});

$("#searchTrigger").addEventListener("click", openSearch);
$("#closeSearch").addEventListener("click", closeSearch);
$("#globalSearch").addEventListener("input", event => performSearch(event.target.value));
searchResults.addEventListener("click", event => {
  const result = event.target.closest("[data-search-route][data-search-id]");
  if (!result) return;
  const targetRoute = result.dataset.searchRoute;
  const rawId = result.dataset.searchId;
  closeSearch({ restoreFocus: false });
  route(targetRoute, targetRoute === "curso" ? Number(rawId) : rawId);
});

searchInput.addEventListener("keydown", event => {
  if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
  const items = [...searchResults.querySelectorAll("[data-search-route][data-search-id]")];
  if (!items.length) return;
  event.preventDefault();
  (event.key === "ArrowDown" ? items[0] : items[items.length - 1]).focus();
});

searchResults.addEventListener("keydown", event => {
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  const items = [...searchResults.querySelectorAll("[data-search-route][data-search-id]")];
  const index = items.indexOf(document.activeElement);
  if (index < 0 || !items.length) return;
  event.preventDefault();
  let next = index;
  if (event.key === "ArrowDown") next = (index + 1) % items.length;
  if (event.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = items.length - 1;
  items[next].focus();
});

searchOverlay.addEventListener("click", event => {
  if (event.target === searchOverlay) closeSearch();
});

document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (searchOverlay.classList.contains("open")) closeSearch();
    else openSearch();
  }
  if (event.key === "Escape") {
    if (searchOverlay.classList.contains("open")) closeSearch();
  }
});

let unexpectedErrorNoticeShown = false;
function reportUnexpectedUiError(error, context = "") {
  const message = error?.message || String(error || "Error desconocido");
  console.error("Error inesperado de interfaz:", context, error);
  if (unexpectedErrorNoticeShown) return;
  unexpectedErrorNoticeShown = true;
  toast(`Error de interfaz${context ? ` ${context}` : ""}: ${message.slice(0, 160)}. Tu progreso no se ha borrado.`, "error");
  setTimeout(() => { unexpectedErrorNoticeShown = false; }, 8000);
}
window.addEventListener("error", event => {
  // Errores de recursos externos no deben bloquear ni alarmar al usuario como si la UI hubiese fallado.
  if (!event.error && event.target && event.target !== window) {
    console.warn("Recurso externo no cargado:", event.target?.src || event.target?.href || event.target);
    return;
  }
  reportUnexpectedUiError(event.error || event.message);
}, true);
window.addEventListener("unhandledrejection", event => reportUnexpectedUiError(event.reason));

window.addEventListener("usic-storage-warning", () => {
  toast("El navegador no permite guardar el progreso local. Los cambios pueden perderse al cerrar esta pestaña.");
});

window.addEventListener("hashchange", renderRoute);

// Auth necesita poder pedir un rerender cuando cambia la sesión o el perfil.
Object.assign(window, { renderRoute, toast });

renderRoute();
