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

function toast(message) {
  const element = document.createElement("div");
  element.className = "toast";
  element.textContent = message;
  document.body.append(element);
  setTimeout(() => element.remove(), 2600);
}

// -----------------------------------------------------------------------------
// Navegación
// -----------------------------------------------------------------------------

function route(name, argument) {
  location.hash = argument ? `${name}/${argument}` : name;
}

function setActiveNavigation(routeName) {
  $$(".nav-item[data-route]").forEach(button => {
    button.classList.toggle("active", button.dataset.route === routeName);
  });
}

function updateNavBadges() {
  const badge = document.getElementById("reviewBadge");
  if (!badge) return;
  const count = state.errors.length ? Math.min(state.errors.length, 99) : 0;
  badge.textContent = String(count);
  badge.hidden = count === 0;
}

function renderRoute() {
  updateNavBadges();
  const rawRoute = location.hash.slice(1) || "inicio";
  const [routeName, argument] = rawRoute.split("/");

  setActiveNavigation(routeName);
  window.scrollTo(0, 0);

  if (routeName === "curso") {
    renderCourse(Number(argument));
    return;
  }

  if (routeName === "tema") {
    renderLesson(argument);
    return;
  }

  if (routeName === "objetivo") {
    renderGoalArea(argument);
    return;
  }

  if (routeName === "lab") {
    renderLab(argument);
    return;
  }

  const pages = {
    inicio: renderHome,
    aprender: renderCatalog,
    repasar: renderReview,
    biblioteca: renderLibrary,
    progreso: renderProgress,
    errores: renderErrors,
    laboratorio: renderLabHub
  };

  (pages[routeName] || renderHome)();
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
    <article class="course-card" onclick="route('curso', ${course.id})">
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
  return `
    <div class="progress-track" aria-label="${value}% completado">
      <i style="width:${value}%"></i>
    </div>
  `;
}

function lessonStatus(lessonId) {
  return state.completed.includes(lessonId) ? "Dominado" : "Pendiente";
}

// -----------------------------------------------------------------------------
// Inicio
// -----------------------------------------------------------------------------

function renderHome() {
  const lesson = LESSONS[nextLesson()];
  const course = COURSES.find(item => item.id === lesson.courseId);
  const blockProgress = courseProgress(lesson.courseId);
  const developedCourseIds = Object.keys(LEARNING_PATHS).map(Number).sort((a, b) => a - b);
  const highlightedCourses = developedCourseIds.slice(0, 3).map(id => COURSES.find(courseItem => courseItem.id === id));

  view.innerHTML = `
    <section class="hero-grid">
      <article class="hero-card">
        <span class="eyebrow">Tu siguiente paso · Bloque ${formatCourseNumber(lesson.courseId)}</span>
        <h1>${escapeHtml(lesson.title)}</h1>
        <p>${escapeHtml(lesson.objective)}</p>
        <div class="continue-row">
          <button class="btn btn-primary" onclick="route('tema', '${lesson.id}')">
            ${state.completed.includes(lesson.id) ? "Repasar" : "Continuar donde lo dejaste"} →
          </button>
          <button class="btn btn-secondary" onclick="route('curso', ${lesson.courseId})">Ver curso</button>
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
          <p>${state.streak} días de racha. Útil como contexto; insuficiente como religión.</p>
        </div>
      </aside>
    </section>

    <div class="section-head">
      <div>
        <span class="eyebrow">Materias</span>
        <h2>Explora la universidad</h2>
      </div>
      <button onclick="route('aprender')">Ver los ${COURSES.length} bloques →</button>
    </div>

    <div class="grid-3">
      ${highlightedCourses.map(courseCard).join("")}
    </div>

    <div class="home-bottom">
      <article class="panel recommend">
        <span class="eyebrow">Recomendación</span>
        <h3>${escapeHtml(lesson.shortTitle)}</h3>
        <p>Es la siguiente pieza no dominada de la ruta. La plataforma intenta evitar el método académico tradicional de “abrir 14 pestañas y esperar iluminación”.</p>
        <button class="btn btn-primary" onclick="route('tema', '${lesson.id}')">
          Estudiar · ~${lesson.duration} min
        </button>
      </article>

      <article class="panel">
        <span class="eyebrow">Repasos pendientes</span>
        <h3>${Math.min(5, Math.max(1, state.errors.length || 3))} elementos prioritarios</h3>
        <p>Fallos recientes y conceptos clave vuelven a aparecer mediante recuperación activa.</p>
        <button class="btn btn-secondary" onclick="route('repasar')">Abrir repaso</button>
      </article>
    </div>
  `;
}

// -----------------------------------------------------------------------------
// Áreas de aprendizaje orientadas a objetivos
// -----------------------------------------------------------------------------

function goalAreaProgress(area) {
  const developedIds = area.blocks.filter(id => LEARNING_PATHS[id]);
  const lessonIds = developedIds.flatMap(id => LEARNING_PATHS[id].modules.flatMap(module => module.lessons));
  if (!lessonIds.length) return 0;
  const completed = lessonIds.filter(id => state.completed.includes(id)).length;
  return Math.round((completed / lessonIds.length) * 100);
}

function goalAreaCard(area) {
  const developed = area.blocks.filter(id => LEARNING_PATHS[id]).length;
  const progress = goalAreaProgress(area);
  return `
    <article class="goal-card" onclick="route('objetivo', '${area.id}')">
      <span class="eyebrow">${escapeHtml(area.subtitle)}</span>
      <h3>${escapeHtml(area.name)}</h3>
      <p>${escapeHtml(area.description)}</p>
      <div class="goal-meta">
        <span>${developed}/${area.blocks.length} bloques con contenido desarrollado</span>
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

  const focus = area.focus.map(id => COURSES.find(course => course.id === id)).filter(Boolean);
  const remaining = area.blocks.filter(id => !area.focus.includes(id)).map(id => COURSES.find(course => course.id === id)).filter(Boolean);
  const developedCount = area.blocks.filter(id => LEARNING_PATHS[id]).length;

  view.innerHTML = `
    <section class="goal-hero">
      <div>
        <span class="eyebrow">Ruta por objetivo · ${escapeHtml(area.subtitle)}</span>
        <h1>${escapeHtml(area.name)}</h1>
        <p>${escapeHtml(area.description)}</p>
      </div>
      <aside class="goal-summary">
        <strong>${developedCount}/${area.blocks.length}</strong>
        <span>bloques desarrollados en esta ruta</span>
        ${progressBar(goalAreaProgress(area))}
      </aside>
    </section>

    <section class="panel goal-principle">
      <span class="eyebrow">Cómo leer esta ruta</span>
      <p>Los bloques destacados son el núcleo de tu objetivo. Los complementarios aportan prerrequisitos o conexiones útiles. Un mismo bloque puede aparecer en varias rutas: es intencional, no una base de datos sufriendo una crisis de identidad.</p>
    </section>

    <div class="section-head"><div><span class="eyebrow">Núcleo</span><h2>Bloques prioritarios</h2></div></div>
    <div class="catalog-grid">${focus.map(courseCard).join("")}</div>

    <div class="section-head"><div><span class="eyebrow">Conexiones</span><h2>Fundamentos y extensiones</h2></div></div>
    <div class="catalog-grid">${remaining.map(courseCard).join("")}</div>
  `;
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
        <button class="btn btn-primary" onclick="route('tema', '${firstPending}')">
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
            <button class="lesson-row" onclick="route('tema', '${lesson.id}')">
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

  STORE.setLastLesson(lesson.id);

  view.innerHTML = `
    <div class="lesson-layout">
      <article class="lesson-main">
        <header class="lesson-head">
          <button class="back-link" onclick="route('curso', ${lesson.courseId})">← Volver al bloque</button>
          <span class="eyebrow">Lección · ${lesson.duration} min</span>
          <h1>${escapeHtml(lesson.title)}</h1>
          <div class="objective-box">
            <b>Al terminar este tema sabrás:</b>
            <p>${escapeHtml(lesson.objective)}</p>
          </div>
        </header>

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
        ${renderWorkedExample(lesson)}
        ${renderQuickCheck(lesson)}
        ${renderPractice(lesson)}
        ${renderLessonLab(lesson)}

        <section class="lesson-section lesson-close" id="cierre">
          <span class="eyebrow">Cierre</span>
          <h2>¿Puedes explicarlo sin mirar?</h2>
          <p>Intenta reconstruir el argumento principal con tus propias palabras. Si solo reconoces el texto al verlo, tu cerebro ha hecho “cache hit”, no necesariamente aprendizaje.</p>
          <button class="btn btn-primary" id="completeLesson">
            ${state.completed.includes(lesson.id) ? "✓ Tema dominado" : "Marcar tema como dominado"}
          </button>
        </section>
      </article>

      <aside class="lesson-nav">
        <div class="panel">
          <span class="eyebrow">En este tema</span>
          <button onclick="goSection('rapida')">Explicación rápida</button>
          <button onclick="goSection('profundidad')">En profundidad</button>
          <button onclick="goSection('ejemplo')">Ejemplo resuelto</button>
          <button onclick="goSection('check')">Comprueba</button>
          <button onclick="goSection('practica')">Práctica</button>
          ${getLabsForLesson(lesson).length ? `<button onclick="goSection('laboratorio-leccion')">Laboratorio</button>` : ""}
          <button onclick="goSection('cierre')">Cierre</button>
        </div>
      </aside>
    </div>
  `;

  bindLessonInteractions(lesson);
}

function renderDeepExplanation(lesson) {
  return `
    <section class="lesson-section" id="profundidad">
      <span class="eyebrow">B · Aprender en profundidad</span>
      <button class="deep-toggle" id="deepToggle">📖 Ver explicación completa</button>

      <div class="deep-content" id="deepContent">
        ${lesson.deep.sections.map(section => `
          <article class="deep-subsection">
            <h3>${escapeHtml(section.title)}</h3>
            <p>${escapeHtml(section.body)}</p>
          </article>
        `).join("")}

        <div class="quick-grid">
          <div>
            <h3>Errores frecuentes</h3>
            <ul>${lesson.deep.commonErrors.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </div>
          <div>
            <h3>Conexiones</h3>
            <ul>${lesson.deep.connections.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </div>
        </div>
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

function renderPractice(lesson) {
  return `
    <section class="lesson-section" id="practica">
      <span class="eyebrow">E · Práctica progresiva</span>
      <h2>Recupera, calcula, transfiere</h2>
      <p>La dificultad sube por tipo de razonamiento, no porque el ejercicio use números absurdamente grandes para parecer importante.</p>

      <div class="practice-levels">
        ${lesson.practice.map(item => `
          <div class="level-card">
            <header>
              <b>Nivel ${item.level} — ${escapeHtml(item.label)}</b>
              <small>${item.level === 1 ? "Recuperación" : item.level === 2 ? "Aplicación" : item.level === 3 ? "Transferencia" : "Reto abierto"}</small>
            </header>
            <p>${escapeHtml(item.prompt)}</p>
            <div class="practice-input">
              <input
                data-answer="${escapeHtml(item.answer)}"
                data-alternatives="${escapeHtml(JSON.stringify(item.alternatives || []))}"
                data-hint="${escapeHtml(item.hint)}"
                placeholder="Tu respuesta"
              >
              <button class="btn btn-secondary practice-check">Comprobar</button>
            </div>
            <div class="feedback"></div>
          </div>
        `).join("")}
      </div>
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
      <span class="eyebrow">F · Laboratorio ejecutable</span>
      <h2>Haz que el concepto corra</h2>
      <p>No tienes que salir de la universidad para probarlo. Estos laboratorios se ejecutan en tu navegador; las máquinas didácticas están etiquetadas como simuladores.</p>
      <div class="lesson-lab-grid">
        ${labs.map(lab => `
          <button class="lab-launch-card" onclick="route('lab', '${lab.id}')">
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

  $("#completeLesson").addEventListener("click", () => {
    STORE.completeLesson(lesson.id, lesson.duration);
    $("#completeLesson").textContent = "✓ Tema dominado";
    toast("Progreso guardado. Comprensión > confeti.");
  });
}

function checkQuickQuestion(selectedButton, lesson) {
  const isCorrect = selectedButton.dataset.correct === "true";
  const feedback = $("#quizFeedback");

  $$(".quiz-option").forEach(button => button.classList.remove("correct", "wrong"));
  selectedButton.classList.add(isCorrect ? "correct" : "wrong");

  feedback.className = `feedback show ${isCorrect ? "" : "bad"}`;
  feedback.innerHTML = isCorrect
    ? escapeHtml(lesson.check.success)
    : `${escapeHtml(lesson.check.failure)} <button class="chip" onclick="goSection('rapida')">Ver esta parte otra vez</button>`;

  if (!isCorrect) {
    STORE.registerError(lesson.id, lesson.shortTitle, lesson.check.question);
  }
}

function checkPracticeAnswer(button, lesson) {
  const card = button.closest(".level-card");
  const input = $("input", card);
  const feedback = $(".feedback", card);

  const expected = normalizeAnswer(input.dataset.answer);
  const alternatives = JSON.parse(input.dataset.alternatives || "[]").map(normalizeAnswer);
  const received = normalizeAnswer(input.value);
  const acceptedAnswers = [expected, ...alternatives];
  const isCorrect = acceptedAnswers.includes(received);

  feedback.className = `feedback show ${isCorrect ? "" : "bad"}`;

  if (isCorrect) {
    feedback.textContent = "Correcto. El concepto sigue vivo y no ha sido reemplazado por memorización ornamental.";
    return;
  }

  feedback.innerHTML = `
    No exactamente. <b>Pista:</b> ${escapeHtml(input.dataset.hint)}
    <button class="chip ask-tutor-hint">Pedir otra pista</button>
  `;

  STORE.registerError(lesson.id, lesson.shortTitle, input.closest(".level-card").querySelector("p").textContent);

  $(".ask-tutor-hint", feedback).addEventListener("click", () => {
    openTutor(`Necesito una pista para: ${input.closest(".level-card").querySelector("p").textContent}`);
  });
}

// -----------------------------------------------------------------------------
// Repaso, errores, biblioteca y progreso
// -----------------------------------------------------------------------------

function renderReview() {
  const recentErrors = state.errors.slice(-5).reverse();
  const fallback = Object.values(LESSONS).slice(0, 3).map(lesson => ({
    lessonId: lesson.id,
    topic: lesson.shortTitle,
    problem: "Recuperación activa del concepto clave"
  }));
  const items = recentErrors.length ? recentErrors : fallback;

  view.innerHTML = `
    <div class="page-title">
      <span class="eyebrow">Memoria a largo plazo</span>
      <h1>🧠 Repasar</h1>
      <p>Priorizamos fallos y recuperación activa. Releer veinte veces produce una agradable ilusión de familiaridad; recordar sin mirar produce aprendizaje.</p>
    </div>

    <section class="review-session">
      <span class="eyebrow">Sesión sugerida · ~7 minutos</span>
      <h2>${items.length} elementos prioritarios</h2>
      <div class="review-list">
        ${items.map(item => `
          <button class="review-line" onclick="route('tema', '${item.lessonId}')">
            <span><b>${escapeHtml(item.topic)}</b><small>${escapeHtml(item.problem)}</small></span>
            <strong>Practicar →</strong>
          </button>
        `).join("")}
      </div>
    </section>
  `;
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
            <button class="chip" onclick="route('tema', '${error.lessonId}')">Practicar</button>
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
      <p>Consulta las explicaciones ya desarrolladas o navega por el mapa curricular completo.</p>
    </div>

    <div class="library-developed">
      ${Object.values(LESSONS).map(lesson => `
        <article class="library-item" onclick="route('tema', '${lesson.id}')">
          <b>${escapeHtml(lesson.title)}</b>
          <small>Bloque ${formatCourseNumber(lesson.courseId)} · explicación completa disponible</small>
        </article>
      `).join("")}
    </div>

    <div class="section-head"><h2>Mapa curricular completo</h2></div>
    ${COURSES.map(course => `
      <article class="library-item" onclick="route('curso', ${course.id})">
        <b>${formatCourseNumber(course.id)} · ${escapeHtml(course.name)}</b>
        <small>${escapeHtml(course.title || course.topics.slice(0, 4).join(" · "))}</small>
      </article>
    `).join("")}
  `;
}

function renderProgress() {
  const developed = Object.keys(LESSONS).length;
  const completed = state.completed.filter(id => LESSONS[id]).length;

  view.innerHTML = `
    <div class="page-title">
      <span class="eyebrow">Progreso útil, no casino</span>
      <h1>📊 Mi progreso</h1>
      <p>Separamos contenido disponible, dominio y errores registrados. Una racha no aprueba exámenes por ti; sería una característica excelente, pero todavía no.</p>
    </div>

    <div class="stat-grid">
      <div class="big-stat"><strong>${completed}</strong><small>temas dominados</small></div>
      <div class="big-stat"><strong>${developed - completed}</strong><small>temas en aprendizaje</small></div>
      <div class="big-stat"><strong>${state.errors.length}</strong><small>errores registrados</small></div>
      <div class="big-stat"><strong>${state.minutes}</strong><small>minutos estudiados</small></div>
    </div>

    <article class="panel">
      <span class="eyebrow">Dominio de contenido desarrollado</span>
      <h2>${totalProgress()}%</h2>
      ${progressBar(totalProgress())}
    </article>

    <article class="panel">
      <span class="eyebrow">Tus datos</span>
      <h2>Portabilidad del progreso</h2>
      <p>El progreso vive en este navegador. Puedes exportarlo como JSON, restaurarlo más adelante o borrar el estado local conscientemente.</p>
      <div class="continue-row">
        <button class="btn btn-secondary" onclick="exportProgress()">Exportar progreso</button>
        <button class="btn btn-secondary" onclick="importProgress()">Importar progreso</button>
        <button class="btn btn-secondary" onclick="resetProgress()">Reiniciar progreso</button>
      </div>
    </article>

    <article class="panel vertical-map">
      <span class="eyebrow">Mapa vertical</span>
      <h2>De la información a sistemas complejos</h2>
      <p>información → electricidad → lógica → arquitectura → software → sistemas operativos → redes → seguridad → gráficos → videojuegos → hardware → inteligencia artificial → sistemas complejos.</p>
    </article>
  `;
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
      state.completed = incoming.completed.filter(id => LESSONS[id]);
      state.errors = incoming.errors.filter(item => item && LESSONS[item.lessonId]).slice(-100);
      state.minutes = Number.isFinite(Number(incoming.minutes)) ? Math.max(0, Number(incoming.minutes)) : 0;
      state.streak = Number.isFinite(Number(incoming.streak)) ? Math.max(0, Number(incoming.streak)) : 0;
      state.lastLesson = LESSONS[incoming.lastLesson] ? incoming.lastLesson : nextLesson();
      STORE.save(); renderProgress(); toast("Progreso importado correctamente.");
    } catch (error) { toast(`No se pudo importar: ${error.message}`); }
  });
  input.click();
}

function resetProgress() {
  if (!confirm("¿Borrar todo el progreso, errores y tiempo guardado en este navegador?")) return;
  state.completed = []; state.errors = []; state.minutes = 0; state.streak = 0; state.lastLesson = orderedDevelopedLessonIds()[0] || null;
  STORE.save(); renderProgress(); updateNavBadges(); toast("Progreso reiniciado.");
}

// -----------------------------------------------------------------------------
// Buscador
// -----------------------------------------------------------------------------

const searchOverlay = $("#searchOverlay");
const searchInput = $("#globalSearch");
const searchResults = $("#searchResults");

function openSearch() {
  searchOverlay.classList.add("open");
  searchOverlay.setAttribute("aria-hidden", "false");
  searchInput.focus();
  performSearch("");
}

function closeSearch() {
  searchOverlay.classList.remove("open");
  searchOverlay.setAttribute("aria-hidden", "true");
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
          <div class="search-result" onclick="closeSearch(); route('tema', '${result.item.id}')">
            <b>${escapeHtml(result.item.title)}</b>
            <small>Lección desarrollada · Bloque ${formatCourseNumber(result.item.courseId)}</small>
          </div>
        `
      : `
          <div class="search-result" onclick="closeSearch(); route('curso', ${result.item.id})">
            <b>${formatCourseNumber(result.item.id)} · ${escapeHtml(result.item.name)}</b>
            <small>${escapeHtml(result.item.title)}</small>
          </div>
        `).join("")
    : `<div class="empty-note">No encuentro ese concepto todavía. Prueba otra formulación.</div>`;
}

// -----------------------------------------------------------------------------
// Tutor contextual local
// -----------------------------------------------------------------------------

const tutorPanel = $("#tutorPanel");

function openTutor(prefill = "") {
  tutorPanel.classList.add("open");
  tutorPanel.setAttribute("aria-hidden", "false");

  if (prefill) {
    $("#tutorInput").value = prefill;
  }

  $("#tutorInput").focus();
}

function closeTutor() {
  tutorPanel.classList.remove("open");
  tutorPanel.setAttribute("aria-hidden", "true");
}

function tutorReply(question) {
  const query = normalizeAnswer(question);



  // Iluminación y render: priorizar antes de shaders/GPU porque términos como
  // "normal", "texture", "ray" o "sampling" aquí describen transporte de luz.
  if (query.includes("brdf") || query.includes("bsdf") || query.includes("reflectancia") || query.includes("radiancia") || query.includes("irradiancia")) {
    return "Radiancia L mide flujo por área proyectada y ángulo sólido; irradiancia E es flujo incidente por área. Una BRDF f_r relaciona radiancia incidente y reflejada por unidad de irradiancia diferencial y tiene unidades sr⁻¹. No es un porcentaje directo: entra dentro de una integral hemisférica junto con L_i y cosθ.";
  }
  if (query.includes("lambert") || query.includes("blinn-phong") || query.includes("blinn phong") || query.includes("phong")) {
    if (query.includes("lambert")) return "Lambert ideal usa f_r=ρ/π. El factor N·L pertenece a la geometría de irradiancia proyectada; el 1/π normaliza la reflectancia hemisférica. Albedo, BRDF y color final de display son objetos distintos.";
    return "Phong y Blinn-Phong son modelos empíricos de highlight. Blinn-Phong usa H=normalize(L+V); su exponente shininess controla anchura del lóbulo, pero no es roughness PBR por definición ni incorpora Fresnel/microfacetas completos.";
  }
  if (query.includes("pbr") || query.includes("metallic") || query.includes("roughness") || query.includes("microfacet") || query.includes("microfaceta") || query.includes("fresnel")) {
    return "PBR agrupa modelos físicamente motivados, no una garantía de simulación exacta. En metallic-roughness, metallic selecciona una respuesta dieléctrica/metálica conceptual y roughness controla dispersión microfacet. Un BRDF Cook-Torrance típico combina D (NDF), G (masking-shadowing) y F (Fresnel); las convenciones de alpha/roughness dependen del modelo.";
  }
  if (query.includes("normal map") || query.includes("normal mapping") || query.includes("tbn") || query.includes("tangent space")) {
    return "Normal mapping perturba la normal de shading, no la geometría real. La normal de textura se decodifica en tangent space y se transforma con una base TBN coherente. UV seams, handedness y convención del canal Y importan; la técnica no cambia por sí sola la silueta ni crea oclusión geométrica real.";
  }
  if (query.includes("shadow map") || query.includes("shadow bias") || query.includes("pcf") || query.includes("peter-panning") || query.includes("peter panning") || query.includes("cascaded shadow")) {
    return "Shadow mapping guarda profundidad desde la luz y luego compara la profundidad del punto en ese mismo espacio. Bias pequeño puede dejar acne; demasiado bias produce peter-panning/light leaks. PCF filtra comparaciones; cascades reparten resolución para luces direccionales. No existe un bias mágico universal.";
  }
  if (query.includes("ambient occlusion") || query.includes("ssao") || query.includes("oclusion ambiental") || query.includes("oclusión ambiental")) {
    return "AO estima accesibilidad/oclusión geométrica local; no calcula radiancia indirecta ni sustituye GI. SSAO solo ve información screen-space, por eso falla con oclusores fuera de pantalla/disocclusions. Aplicar AO indiscriminadamente a direct light puede duplicar el shadowing.";
  }
  if (query.includes("tone mapping") || query.includes("tonemapping") || query.includes("hdr") || query.includes("exposure") || query.includes("exposicion") || query.includes("exposición")) {
    return "El lighting se mantiene normalmente en valores lineales HDR. Exposure escala la señal; tone mapping comprime rango dinámico y crea una apariencia de display. No es lo mismo que codificación sRGB/gamma. Clampear a [0,1] antes de tone mapping destruye highlights.";
  }
  if (query.includes("global illumination") || query.includes("iluminacion global") || query.includes("iluminación global") || query.includes("rendering equation") || query.includes("ecuacion de rendering") || query.includes("ecuación de rendering")) {
    return "La ecuación de rendering expresa L_o como emisión más una integral hemisférica de L_i·BSDF/BRDF·coseno. GI incluye rebotes entre superficies; un término ambient constante o AO no resuelve ese transporte. La versión superficial estándar además no cubre por sí sola scattering volumétrico.";
  }
  if (query.includes("path tracing") || query.includes("path tracer") || query.includes("russian roulette") || query.includes("next-event") || query.includes("next event") || query.includes("importance sampling") || query.includes("mis ")) {
    return "Path tracing estima transporte de luz con caminos aleatorios y Monte Carlo. Cada muestra direccional necesita su PDF; next-event estimation samplea luces explícitamente y MIS combina estrategias como light/BSDF sampling. Error RMS típico cae como 1/√N, así que reducirlo a la mitad suele costar ~4× muestras. Russian roulette bien ponderada puede terminar caminos conservando esperanza.";
  }
  if (query.includes("ray tracing") || query.includes("ray tracer") || query.includes("bvh") || query.includes("acceleration structure")) {
    return "Ray tracing es el mecanismo de consultar intersecciones/visibilidad mediante rayos; path tracing es un integrador concreto que puede usarlo. Una BVH poda conjuntos de primitivas, pero no garantiza exactamente O(log n) tests para toda escena/rayo. Define intervalos t y lifetimes/updates de la acceleration structure con cuidado.";
  }
  if (query.includes("monte carlo") || query.includes("pdf sampling") || query.includes("estimador unbiased") || query.includes("varianza render")) {
    return "Monte Carlo estima una integral con medias de f(X)/p(X) cuando X~p y p cubre las contribuciones relevantes. Unbiased no significa baja varianza; importance sampling intenta reducirla y la desviación estándar del promedio cae típicamente como 1/√N para muestras independientes.";
  }

  // Shaders y APIs gráficas: priorizar antes del bloque GPU porque términos
  // como compute shader, descriptor, buffer, cache y synchronization tienen
  // aquí contratos específicos de API/pipeline.
  if (query.includes("spir-v") || query.includes("spirv") || query.includes("descriptor set") || query.includes("descriptorset") || query.includes("binding spir")) {
    if (query.includes("descriptor set") || query.includes("descriptorset")) {
      return "En Vulkan, descriptor set layout = esquema de bindings/tipos; descriptor set = instancia con recursos concretos. Pipeline layout organiza set layouts y push constants. Los set/binding declarados en shader/SPIR-V deben coincidir con el host; update-after-bind añade reglas y features, no elimina synchronization.";
    }
    return "SPIR-V es una IR binaria tipada para gráficos/compute, no GLSL compilado universal que ignore el entorno. Entry points, capabilities y decorations como Location/Binding/DescriptorSet forman contratos que Vulkan debe soportar y enlazar correctamente.";
  }
  if (query.includes("glsl") || query.includes("shader language") || query.includes("uniform block") || query.includes("storage qualifier")) {
    return "GLSL tiene versiones/perfiles y contratos de interface. in/out, locations y blocks no deben tratarse como simples globals de C. El layout de UBO/SSBO sigue reglas de alineación/stride del entorno; una struct C con los mismos campos no garantiza el mismo layout binario.";
  }
  if (query.includes("render pass") || query.includes("dynamic rendering") || query.includes("subpass") || query.includes("attachment") || query.includes("loadop") || query.includes("storeop")) {
    return "Vulkan moderno admite render passes tradicionales y dynamic rendering. Ambos trabajan con attachments y dependencias reales; dynamic rendering evita crear VkRenderPass/VkFramebuffer explícitos, no elimina synchronization. DONT_CARE no significa limpiar a cero: el contenido previo/final no está garantizado según la operación.";
  }
  if (query.includes("pipeline layout") || query.includes("graphics pipeline") || query.includes("compute pipeline") || query.includes("dynamic state")) {
    return "Pipeline executable, pipeline layout y recursos son objetos distintos. El layout describe descriptor sets/push constants; no almacena los buffers/textures concretos. Dynamic state sigue siendo estado requerido, solo que se suministra al grabar comandos en vez de hornearse en el pipeline.";
  }
  if (query.includes("command buffer") || query.includes("command pool") || query.includes("queue submit") || query.includes("vkqueuesubmit") || query.includes("frames in flight")) {
    return "Grabar command buffers no ejecuta inmediatamente la GPU. submission y completion son eventos distintos: no resetees/destruyas command buffers, pools o recursos mientras trabajo pendiente pueda usarlos. Frames in flight requieren recursos/sync por frame o rangos que no se pisen.";
  }
  if (query.includes("semaphore") || query.includes("fence") || query.includes("pipeline barrier") || query.includes("memory barrier") || query.includes("execution dependency") || query.includes("memory dependency")) {
    return "En Vulkan separa execution order de memory visibility. Barriers expresan producer/consumer stages+accesses sobre rangos; semaphores coordinan submissions/queues y fences permiten al host observar completion. Ordenar comandos no hace visibles automáticamente todos los writes.";
  }
  if (query.includes("image layout") || query.includes("image view") || query.includes("sampler") || query.includes("sampled image") || query.includes("storage image")) {
    return "Image storage, image view, sampler y image layout son conceptos distintos. Una view selecciona formato/aspect/mips/layers; sampler define filtering/addressing; layout describe estado/uso esperado. Transicionar layout no sustituye la dependencia de memoria entre writer y reader.";
  }
  if (query.includes("push constant") || query.includes("uniform buffer") || query.includes("storage buffer") || query.includes("ubo") || query.includes("ssbo")) {
    return "UBO/constant buffers son adecuados para datos de lectura estructurada; SSBO/storage buffers permiten acceso más general y escrituras; push constants son pequeños datos ligados al pipeline layout con límite del dispositivo. El mecanismo adecuado depende de tamaño, frecuencia, lifetime y acceso.";
  }
  if ((query.includes("opengl") && query.includes("vulkan")) || query.includes("state machine opengl") || query.includes("contexto opengl")) {
    return "OpenGL expone un contexto con bastante estado mutable y driver-managed hazard/command handling; Vulkan hace explícitos muchos objetos, memory/lifetimes, command buffers y dependencies. No son simplemente APIs con nombres diferentes: el modelo de responsabilidad cambia.";
  }
  if (query.includes("shader comp") || query.includes("reflection") || query.includes("shader toolchain") || query.includes("dxil") || query.includes("hlsl")) {
    return "Shader source (GLSL/HLSL) → frontend/IR → backend es una toolchain, no una identidad. Vulkan suele consumir SPIR-V; Direct3D moderno usa DXIL para Shader Model 6. Compilar sin errores no certifica compatibilidad de pipeline/device ni rendimiento; reflection ayuda a descubrir interfaces, no lifetimes/sync.";
  }
  if (query.includes("vertex shader") || query.includes("fragment shader") || query.includes("pixel shader")) {
    return "Vertex shader procesa invocaciones de vértice y produce datos para primitive assembly/clipping; fragment shader procesa fragments candidatos. En Direct3D se usa tradicionalmente 'pixel shader', pero una invocation no equivale a un píxel visible: depth/stencil/discard/blending todavía pueden cambiar el resultado.";
  }

  // GPU / arquitectura gráfica: priorizar antes de reglas genéricas de IPC,
  // caches o microarquitectura porque términos como "shared memory" y
  // "coalescing" tienen semántica específica en este contexto.
  if (query.includes("warp") || query.includes("wavefront") || query.includes("subgroup") || query.includes("wave32") || query.includes("wave64")) {
    return "Warp/wavefront/subgroup son grupos de ejecución relacionados, pero no una constante universal. CUDA de NVIDIA documenta warps de 32 threads; AMD usa wavefronts cuyo tamaño depende de arquitectura; APIs como Vulkan exponen subgroupSize como capacidad del dispositivo/pipeline. No hardcodees 32/64 sin un contrato explícito.";
  }
  if (query.includes("simt") || (query.includes("simd") && query.includes("gpu"))) {
    return "SIMD expresa una operación vectorial sobre lanes de datos; SIMT presenta muchos threads lógicos que el hardware agrupa para ejecución. SIMT permite control por thread, pero si las lanes de un grupo toman rutas distintas aparecen máscaras/divergence y puede caer la utilización.";
  }
  if (query.includes("occupancy") || query.includes("ocupacion gpu") || query.includes("ocupación gpu") || query.includes("latency hiding")) {
    return "Occupancy aproxima cuántos warps/waves están residentes respecto al máximo permitido por recursos. Registros, shared/LDS y block size la limitan. Puede ayudar a ocultar latencia, pero 100% occupancy no garantiza máximo rendimiento: perseguirla puede aumentar spilling o trabajo.";
  }
  if (query.includes("divergence") || query.includes("warp divergence") || query.includes("divergencia gpu")) {
    return "Divergence ocurre cuando lanes del mismo warp/wave siguen rutas distintas. Una condición uniforme para todo el grupo no diverge del mismo modo. El hardware puede ejecutar rutas con máscaras activas; eliminar branches a ciegas tampoco garantiza mejora porque predicación, trabajo extra y registros cuestan.";
  }
  if (query.includes("coalesc") && (query.includes("gpu") || query.includes("memoria") || query.includes("global"))) {
    return "Coalescing busca servir accesos de lanes vecinas con pocas transacciones de memoria. Direcciones contiguas/alineadas suelen ayudar; stride grande puede desperdiciar sectores/líneas. La granularidad exacta depende de arquitectura, así que confirma con profiler en vez de memorizar una cifra universal.";
  }
  if ((query.includes("shared memory") || query.includes("lds")) && (query.includes("gpu") || query.includes("cuda") || query.includes("hip") || query.includes("workgroup") || query.includes("block"))) {
    return "Shared memory (CUDA) / LDS (AMD) es scratchpad on-chip gestionado explícitamente y compartido dentro de un block/workgroup. No es una cache automática. Consume recursos de residencia y necesita barreras/orden correctos; una barrera local no sincroniza todos los grupos del dispatch.";
  }
  if (query.includes("vram") || query.includes("arithmetic intensity") || query.includes("roofline") || query.includes("memory-bound") || query.includes("compute-bound")) {
    return "VRAM aporta capacidad y ancho de banda, no latencia gratuita. Arithmetic intensity = operaciones útiles / bytes movidos ayuda a clasificar un kernel: a baja intensidad puede ser memory-bound; a alta, compute-bound. Roofline compara ambos techos, pero el rendimiento real también depende de locality, caches y scheduling.";
  }
  if (query.includes("texture unit") || query.includes("unidad de textura") || query.includes("texture cache")) {
    return "Texture units aceleran addressing, sampling, filtering y ciertas conversiones de formato. Son recursos distintos de las ALUs shader y pueden saturarse. Texture cache mejora localidad, pero un sample sigue teniendo coste y no sustituye sincronización ni cálculo shader.";
  }
  if (query.includes("compute shader") || query.includes("workgroup") || query.includes("dispatch") || query.includes("local size")) {
    return "Compute organiza trabajo como dispatch → workgroups → invocations; el hardware agrupa invocations en subgroups/warps/waves. Threads del workgroup pueden cooperar con scratchpad y barreras locales. El tamaño óptimo depende de subgroup, registros, LDS y forma del problema; no existe un 256 universal.";
  }
  if (query.includes("gpu cache") || query.includes("cache gpu") || query.includes("l1 gpu") || query.includes("l2 gpu")) {
    return "Las GPU tienen caches con topología/políticas dependientes de arquitectura. Localidad temporal/espacial importa, pero cache hit no equivale a sincronización: visibilidad y orden de writes los define el memory model, atomics y barriers adecuados.";
  }
  if (query.includes("gpu core") || query.includes("cuda core") || query.includes("stream processor") || query.includes("tensor core") || query.includes("matrix core") || query.includes("tflop")) {
    return "'GPU core' es demasiado ambiguo para comparar fabricantes: lanes/ALUs, CUDA cores, stream processors y unidades matrix/tensor no son equivalentes. TFLOP/s pico presupone operaciones/precisiones concretas; un kernel memory-bound puede dejar gran parte de ese pico sin usar.";
  }
  if ((query.includes("cpu") && query.includes("gpu")) || query.includes("cpu frente a gpu") || query.includes("cpu vs gpu")) {
    return "CPU y GPU persiguen trade-offs distintos: CPU suele privilegiar latencia y control por hilo; GPU throughput y paralelismo masivo. La GPU gana cuando hay suficiente trabajo paralelo y el coste de offload/sincronización no domina. Compara el tiempo end-to-end, no solo el kernel.";
  }
  const lesson = LESSONS[state.lastLesson] || LESSONS.informacion;

  if (query.includes("pista")) {
    return `Pista sobre <b>${escapeHtml(lesson.shortTitle)}</b>: intenta identificar primero qué magnitudes o alternativas están definidas y qué relación del resumen las conecta. No calcules todavía.`;
  }

  if (query.includes("log")) {
    return "El logaritmo aparece porque las probabilidades de sucesos independientes se multiplican y queremos que la información se sume: log(ab)=log(a)+log(b). El signo negativo hace que probabilidades pequeñas produzcan cantidades positivas.";
  }

  if (query.includes("entrop")) {
    return "Separa dos niveles: I(x)=−log₂p(x) habla de un resultado concreto; H(X)=Σp(x)I(x) es el promedio esperado antes de observar X. Si quieres comprobarlo, calcula ambos para una moneda 75/25.";
  }

  if (query.includes("landauer") || query.includes("energia") || query.includes("energía")) {
    return "La precisión importante es esta: Landauer limita la pérdida lógicamente irreversible de información en condiciones termodinámicas ideales. No afirma que cada operación de CPU cueste exactamente kT ln 2.";
  }

  if (query.includes("hamming")) {
    return "Dibuja mentalmente palabras válidas separadas en el espacio binario. Para corregir t errores, las bolas de radio t no deben solaparse; por eso necesitas d_min ≥ 2t+1.";
  }

  if (query.includes("complemento") || query.includes("signed")) {
    return "En complemento a dos de n bits, interpreta el bit superior con peso −2^(n−1) y los demás con pesos positivos normales. Esa lectura evita memorizar trucos y explica por qué la suma módulo 2^n funciona también con negativos.";
  }

  if (query.includes("endian")) {
    return "Endianness ordena bytes de un valor multibyte. Little-endian coloca primero el byte menos significativo; big-endian, el más significativo. No inviertas los bits dentro de cada byte: ese es el tropiezo clásico.";
  }

  if (query.includes("ieee") || query.includes("float") || query.includes("nan")) {
    return "Para IEEE 754 separa primero la clase del valor: E=0 implica cero/subnormal; E todo a 1 implica infinito/NaN; el resto son normales. Solo después calcula signo, significando y exponente real.";
  }

  if (query.includes("unicode") || query.includes("utf")) {
    return "Separa identidad y codificación: carácter abstracto → punto de código/valor escalar → UTF-8 o UTF-16 → unidades de código/bytes. Un grafema visible puede contener varios puntos de código, así que 'un carácter = un byte' es una emboscada con décadas de experiencia.";
  }

  if (query.includes("cancel") || query.includes("0.1") || query.includes("0,1")) {
    return "Dos ideas distintas: 0,1 no tiene expansión binaria finita, así que se aproxima; la cancelación ocurre al restar números cercanos y puede amplificar el error relativo. Reformular algebraicamente una expresión puede ser mucho más estable.";
  }



  // PCB: priorizar interconexión física antes de los fallbacks analógicos/FPGA.
  if (query.includes("pcb") || query.includes("printed circuit") || query.includes("placa de circuito")) {
    return "Una PCB no es un esquema dibujado en cobre: placement, stackup, retorno, parásitos, fabricación y mecánica forman parte del circuito real. Separa siempre intención eléctrica, geometría física y reglas del fabricante.";
  }
  if (query.includes("ground plane") || query.includes("plano de masa") || query.includes("return path")) {
    return "Ground es una red física con impedancia. En señales rápidas el retorno tiende a permanecer cerca de la ruta de ida sobre una referencia continua; cruzar splits o cambiar de referencia sin transición puede aumentar loop area, EMI y degradar SI.";
  }
  if (query.includes("decoupling") || query.includes("desacoplo") || query.includes("bypass capacitor")) {
    return "Desacoplar es reducir la impedancia local de la PDN durante transitorios. Valor nominal no basta: ESL/ESR, autorresonancia, vias y loop pin-capacitor-plane importan. '100 nF por chip' es un punto de partida, no una demostración.";
  }
  if (query.includes("power integrity") || query.includes("target impedance") || query.includes("pdn")) {
    return "Power integrity estudia droop/ripple/transitorios sobre una PDN distribuida. Una primera cota es Ztarget≈ΔVpermitida/ΔI, pero regulador, planos, package, capacitores y resonancias dominan bandas distintas.";
  }
  if (query.includes("signal integrity") || query.includes("reflection coefficient") || query.includes("crosstalk")) {
    return "Signal integrity depende de flancos, delay, impedancias, retorno y acoplamiento. No uses solo la frecuencia de clock: un bus lento con rise time rápido puede comportarse como línea de transmisión. Γ=(ZL-Z0)/(ZL+Z0) cuantifica una reflexión ideal en una discontinuidad.";
  }
  if (query.includes("differential pair") || query.includes("par diferencial") || query.includes("skew")) {
    return "Un par diferencial exige referencia continua, geometría compatible con la impedancia objetivo y skew dentro del presupuesto. Igualar longitud no garantiza Zdiff; y serpentinas excesivas pueden añadir acoplamiento y pérdidas.";
  }
  if (query.includes("controlled impedance") || query.includes("impedancia controlada") || query.includes("microstrip") || query.includes("stripline")) {
    return "La impedancia característica es distribuida y depende de ancho, cobre, dieléctrico y distancia al plano. No es la resistencia DC de la pista. Calcula con el stackup real y coordina tolerancias con el fabricante.";
  }
  if (query.includes("emc") || query.includes("emi") || query.includes("emision radiada") || query.includes("inmunidad")) {
    return "EMC combina emisiones e inmunidad. Reduce loop area y controla caminos de retorno antes de añadir componentes al azar; filtros, ferritas, shielding y edge-rate deben atacar un mecanismo/frecuencia identificados. Una prueba de banco no equivale a certificación.";
  }
  if (query.includes("gerber") || query.includes("dfm") || query.includes("fabricabilidad") || query.includes("annular ring")) {
    return "DFM usa reglas del proceso real: width/space, drill, annular ring, solder mask, stackup y tolerancias. DRC genérico no garantiza fabricación. Revisa los outputs finales con visor independiente y controla revisionado/BOM.";
  }
  if (query.includes("solder") || query.includes("soldadura") || query.includes("reflow") || query.includes("tombston")) {
    return "Soldadura depende de superficies, flux, aleación, geometría y perfil térmico. Más temperatura no es mejor. Bridges, tombstoning, opens y voids tienen mecanismos diferentes; diseña footprints y acceso pensando en assembly e inspección.";
  }
  if (query.includes("ground lead") || query.includes("ground spring") || query.includes("bring-up") || query.includes("bringup")) {
    return "En bring-up empieza por inspección, cortos, rails, clocks y reset antes del firmware complejo. Una ground lead larga de osciloscopio añade inductancia y puede inventar ringing; usa conexión de masa corta y registra board/firmware/condiciones.";
  }

  // FPGA: resolver hardware programable, CDC y timing antes de los fallbacks de lógica digital/MCU.
  if (query.includes("fpga") || query.includes("lut") || query.includes("bitstream")) {
    return "Una FPGA configura LUTs, flip-flops, routing, I/O y bloques dedicados para implementar un circuito concurrente. El bitstream no es un programa secuencial de CPU. Presupuesta LUT/FF/BRAM/DSP, clocks, routing y timing, no líneas de HDL.";
  }
  if (query.includes("systemverilog") || (query.includes("verilog") && !query.includes("assembly"))) {
    return "Verilog/SystemVerilog puede modelar mucho más de lo que synthesis implementa. Para RTL claro separa combinacional y secuencial, usa asignaciones nonblocking en registros y evita caminos combinacionales sin asignación completa que infieran latches accidentales.";
  }
  if (query.includes("vhdl")) {
    return "En VHDL piensa entity = interfaz y architecture = implementación. Signals, variables y processes tienen semánticas distintas, pero setup/hold, CDC y recursos físicos siguen siendo los mismos problemas de hardware que en Verilog.";
  }
  if ((query.includes("cdc") || query.includes("clock domain") || query.includes("metastab")) && (query.includes("fpga") || query.includes("async") || query.includes("fifo"))) {
    return "CDC no se resuelve con dos flip-flops por cada bit. Un synchronizer sirve para ciertos niveles de un bit; pulsos necesitan protocolo/estiramiento y buses coherentes suelen usar handshake o async FIFO. La metastabilidad se hace extremadamente improbable, no exactamente imposible.";
  }
  if ((query.includes("setup") || query.includes("hold") || query.includes("slack") || query.includes("sta")) && (query.includes("fpga") || query.includes("constraint") || query.includes("wns") || query.includes("tns"))) {
    return "STA verifica timing bajo constraints. Setup mira caminos máximos; hold, mínimos. Slack negativo es violación. Bajar frecuencia puede ayudar setup pero no arregla automáticamente hold; false-path/multicycle solo son válidos si describen la relación funcional real.";
  }
  if (query.includes("synthesis") || query.includes("sintesis fpga") || query.includes("síntesis fpga")) {
    return "Synthesis transforma RTL en una netlist tecnológica e infiere LUTs, registros, memorias y DSP. No es place-and-route. Revisa reports de inferencia: un array no es BRAM por decreto y una multiplicación no usa necesariamente un DSP.";
  }
  if (query.includes("place and route") || query.includes("place & route") || query.includes("timing closure") || query.includes("post-route")) {
    return "Place & route asigna la netlist a recursos y rutas físicas. El routing añade delay y congestión, por eso timing pre-route no es cierre final. Pipeline, fanout, floorplanning y arquitectura suelen importar más que microcambiar sintaxis RTL.";
  }
  if (query.includes("bram") || query.includes("block ram")) {
    return "BRAM es memoria física on-chip con puertos, geometrías y latencias concretas. Dos puertos no significan accesos ilimitados; registrar la salida puede mejorar fmax a costa de ciclos de latencia. Define read-during-write y verifica la inferencia del target.";
  }
  if ((query.includes("dsp block") || query.includes("mac")) && query.includes("fpga")) {
    return "Los DSP blocks implementan aritmética dedicada como multiply-accumulate. Pipelining interno puede dar throughput de una muestra por ciclo con varios ciclos de latencia. Width, signedness, truncación y saturación siguen siendo decisiones numéricas explícitas.";
  }
  if ((query.includes("pll") || query.includes("mmcm") || query.includes("clocking")) && query.includes("fpga")) {
    return "PLL/MMCM y clock buffers generan/distribuyen clocks dentro de rangos del dispositivo. Un nuevo clock exige constraints y análisis de su relación con otros dominios; lock y deassertion de reset también necesitan sequencing consciente.";
  }
  if (query.includes("soft cpu") || query.includes("softcore") || query.includes("microblaze")) {
    return "Una soft CPU se sintetiza usando recursos programables de la FPGA; no es un hard core fijo. CPU, BRAM, buses y periféricos comparten presupuesto de LUT/FF/BRAM y timing. Una CPU educativa conecta PC, register file, ALU, control y memoria.";
  }
  if ((query.includes("video") || query.includes("vga") || query.includes("pixel clock")) && query.includes("fpga")) {
    return "Vídeo FPGA es un pipeline temporal: contadores producen raster timing y el datapath genera píxeles al pixel clock. Debes alinear sync/coordenadas con latencias de BRAM/pipeline. Un efecto streaming no necesita obligatoriamente framebuffer completo.";
  }

  // Sistemas embebidos: RTOS, budgets físicos y fiabilidad antes del fallback de MCU/SO.
  if (query.includes("rtos") || query.includes("freertos") || query.includes("cmsis-rtos")) {
    return "Un RTOS aporta tareas, scheduler, espera y primitivas de sincronización; no garantiza deadlines por sí solo. En FreeRTOS por defecto la tarea Ready de mayor prioridad obtiene CPU. Analiza WCET, blocking, ISR, prioridades y memoria de stacks/objetos.";
  }
  if (query.includes("priority inversion") || query.includes("inversion de prioridad") || query.includes("inversión de prioridad")) {
    return "Hay inversión de prioridad cuando una tarea urgente espera un recurso retenido por una menos prioritaria y trabajo intermedio puede prolongar la espera. Priority inheritance puede mitigar ciertos casos con mutex, pero no elimina deadlocks ni sustituye un diseño de locks acotado.";
  }
  if ((query.includes("power management") || query.includes("tickless") || query.includes("sleep")) && (query.includes("embeb") || query.includes("rtos") || query.includes("perifer"))) {
    return "Bajo consumo se diseña con duty cycle, estados, wake sources y latencias. Dormir la CPU no implica suspender cada periférico: system PM y device/runtime PM son capas distintas que deben coordinarse con deadlines y consumidores.";
  }
  if ((query.includes("memory pool") || query.includes("fragmentacion") || query.includes("fragmentación") || query.includes("stack high water")) && (query.includes("embeb") || query.includes("rtos") || query.includes("firmware"))) {
    return "En firmware restringido presupuesta .data/.bss, stacks, heaps y buffers. Pools de bloques fijos pueden dar capacidad y coste más previsibles, pero también se agotan. Mide high-water marks y no confundas ausencia de fallo en una prueba corta con ausencia de fragmentación futura.";
  }
  if ((query.includes("sensor") || query.includes("calibracion") || query.includes("calibración")) && (query.includes("embeb") || query.includes("timestamp") || query.includes("bias"))) {
    return "Un sensor entrega una medición con rango, ruido, bias, dinámica y edad. Conserva unidades/timestamp/validez; promediar puede reducir ruido aleatorio, pero no corrige automáticamente offset o gain error.";
  }
  if ((query.includes("actuator") || query.includes("actuador") || query.includes("solenoide")) && (query.includes("driver") || query.includes("gpio") || query.includes("safe"))) {
    return "El MCU suele ordenar; la etapa de potencia entrega energía. Motores, relés y solenoides pueden exceder GPIO y producir transitorios inductivos. Define un estado seguro durante reset/brownout y separa comando lógico, driver eléctrico y feedback físico.";
  }
  if (query.includes("motor control") || query.includes("control de motor") || query.includes("foc") || query.includes("corriente de fase")) {
    return "PWM es la señal de actuación, no el lazo completo. Un control de motor combina setpoint, controlador, PWM/gate driver, puente, motor y feedback; además necesita límites de corriente/tensión/temperatura y, en topologías rápidas, sincronización precisa entre PWM y muestreo.";
  }
  if ((query.includes("reliability") || query.includes("fiabilidad") || query.includes("safe mode") || query.includes("brownout")) && (query.includes("embeb") || query.includes("firmware") || query.includes("watchdog"))) {
    return "Fiabilidad requiere fault model, detección, contención, recuperación y safe state. Un watchdog aporta cierta evidencia de liveness, no de corrección. Diseña escalado de recuperación y registra reset cause/contexto mínimo para diagnosticar loops y fallos persistentes.";
  }
  if ((query.includes("dma") || query.includes("ring buffer") || query.includes("backpressure")) && (query.includes("ownership") || query.includes("embeb") || query.includes("rtos"))) {
    return "DMA reduce instrucciones CPU por transferencia, no tráfico de bus ni necesidad de ownership. Define quién puede leer/escribir cada región mientras DMA está activo, cómo se señala half/full completion y qué ocurre si el productor supera al consumidor.";
  }

  // Microcontroladores: resolver primero plataforma/periférico embebido antes del fallback
  // analógico o de sistemas, porque ADC, timers, DMA y watchdog aparecen en varias capas.
  if (query.includes("arduino interno") || query.includes("setup()") || query.includes("loop()") || query.includes("digitalwrite") || query.includes("analogwrite")) {
    return "Arduino es una capa de API/runtime sobre C/C++ y un core de plataforma concreto. setup() se ejecuta una vez y loop() se repite; digitalWrite/analogWrite esconden periféricos reales y analogWrite no garantiza un DAC: en muchas placas es PWM.";
  }
  if (query.includes("stm32")) {
    return "STM32 es una familia de microcontroladores, no un único chip. Identifica la referencia exacta, su Cortex-M, clock tree, buses, pin mux y reference manual. HAL/LL/CMSIS/registros son capas de software diferentes sobre el mismo silicio.";
  }
  if (query.includes("cortex-m") || query.includes("cortex m") || query.includes("nvic") || query.includes("systick")) {
    return "Cortex-M describe el core; GPIO/ADC/UART concretos pertenecen al MCU integrado por el fabricante. NVIC gestiona excepciones/interrupciones y prioridades; SysTick puede aportar una base temporal, pero no es por sí mismo un scheduler.";
  }
  if ((query.includes("avr") || query.includes("atmega")) && !query.includes("automatic voltage")) {
    return "AVR es una familia. En AVR clásicos como ATmega conviven Flash de programa, SRAM y periféricos con una ISA de 8 bits, pero registros, tamaños, fuses y timings dependen del dispositivo. No copies un mapa de registros a otro AVR sin datasheet.";
  }
  if (query.includes("open drain") || query.includes("open-drain") || query.includes("gpio") || query.includes("pull-up") || query.includes("pullup")) {
    return "GPIO es también un contrato eléctrico. Push-pull conduce HIGH/LOW activamente; open-drain normalmente solo fuerza LOW y necesita pull-up para HIGH. Revisa tensión, corriente, alternate function, drive strength y si el pin tolera el nivel externo.";
  }
  if ((query.includes("timer") || query.includes("pwm")) && (query.includes("micro") || query.includes("mcu") || query.includes("prescaler") || query.includes("arr") || query.includes("ccr"))) {
    return "Un timer cuenta ticks de su clock real. En un up-counter típico f_update=f_timer/((PSC+1)(ARR+1)), pero center-aligned y otros modos cambian la relación. PWM es una señal digital por duty cycle, no un DAC ideal.";
  }
  if ((query.includes("isr") || query.includes("interrupt") || query.includes("interrupcion") || query.includes("interrupción")) && (query.includes("mcu") || query.includes("firmware") || query.includes("nvic") || query.includes("volatile"))) {
    return "Una ISR introduce concurrencia con el flujo principal. Manténla acotada, limpia la fuente según el periférico y difiere trabajo pesado. volatile no hace atómicas operaciones compuestas ni sustituye sincronización; mide worst-case latency y jitter.";
  }
  if ((query.includes("adc") || query.includes("dac")) && (query.includes("mcu") || query.includes("timer trigger") || query.includes("sample time") || query.includes("dma"))) {
    return "En un MCU, ADC/DAC siguen sujetos a Vref, ruido, source impedance, settling y resolución/accuracy. Timer-trigger + DMA puede fijar mejor el instante de muestreo. No todo MCU tiene DAC verdadero y PWM filtrado no es el mismo mecanismo.";
  }
  if (query.includes("uart") || query.includes("8n1") || query.includes("baud")) {
    return "UART es asíncrono: no comparte clock de bits y necesita baud/framing compatibles. En 8N1 suelen viajar 10 bits por byte de payload. UART TTL y RS-232 no son los mismos niveles eléctricos; usa buffers/ring buffers para desacoplar CPU de la línea.";
  }
  if (query.includes("spi") || query.includes("cpol") || query.includes("cpha")) {
    return "SPI aporta SCLK, datos y selección, pero no define opcodes/direcciones universales. CPOL/CPHA y timing deben coincidir con el dispositivo. Full-duplex eléctrico no significa que todo protocolo use ambos sentidos simultáneamente.";
  }
  if (query.includes("i2c") || query.includes("i²c") || query.includes("clock stretching")) {
    return "I²C usa típicamente SDA/SCL open-drain con pull-ups. El HIGH aparece al liberar la línea, así que Rpullup y capacitancia limitan rise time. Address del dispositivo, ACK/NACK y arbitraje son capa de bus; el mapa de registros es específico del target.";
  }
  if (query.includes("dma") && (query.includes("micro") || query.includes("mcu") || query.includes("adc") || query.includes("uart") || query.includes("spi"))) {
    return "DMA mueve datos entre periférico/memoria sin una instrucción CPU por elemento, pero sigue usando bus y memoria. Define ownership del buffer, half/full transfer o double buffering y, si existe D-cache, la coherencia CPU↔DMA necesaria.";
  }
  if (query.includes("watchdog") || query.includes("wdt")) {
    return "Un watchdog debe refrescarse solo cuando el sistema demuestra progreso saludable. Refrescarlo incondicionalmente desde código que también puede bloquearse derrota su propósito. Registra reset cause y prueba timeouts/boot loops de forma controlada.";
  }
  if (query.includes("bootloader") || (query.includes("bare metal") && query.includes("micro")) || query.includes("vector table") && query.includes("reset")) {
    return "Bare metal sigue teniendo startup: stack, .data/.bss, vector table y clocks deben quedar en estado válido antes de main. Un bootloader robusto valida imagen y soporta fallo de alimentación; CRC detecta corrupción accidental pero no autentica firmware frente a un atacante.";
  }
  if ((query.includes("real-time") || query.includes("tiempo real") || query.includes("deadline") || query.includes("wcet")) && (query.includes("mcu") || query.includes("firmware") || query.includes("embeb"))) {
    return "Real-time significa cumplir restricciones temporales. Promedio bajo no prueba un deadline: necesitas WCET, blocking, jitter e interferencia. Timers, DMA, ring buffers y state machines ayudan a reducir polling y a construir cadenas no bloqueantes medibles.";
  }

  // Electrónica analógica: priorizar términos de circuito real antes del fallback
  // de electricidad/señal, porque ruido, filtro y frecuencia también aparecen en otros bloques.
  if (query.includes("op-amp") || query.includes("op amp") || query.includes("amplificador operacional") || query.includes("common-mode") || query.includes("common mode") || query.includes("slew rate") || query.includes("gbw")) {
    return "En un op-amp, V+≈V− es una aproximación de operación lineal con alta ganancia y realimentación negativa; no vale si la etapa satura o sale del rango common-mode. Comprueba input common-mode, output swing, offset, bias current, GBW y slew rate del componente real.";
  }
  if (query.includes("realimentacion") || query.includes("realimentación") || query.includes("feedback") && (query.includes("analog") || query.includes("op")) || query.includes("margen de fase") || query.includes("phase margin")) {
    return "Feedback negativo a baja frecuencia no garantiza estabilidad a toda frecuencia. Analiza loop gain y fase: polos, carga capacitiva y layout pueden erosionar margen de fase y producir ringing u oscilación. Slew rate es otro límite y no sustituye este análisis.";
  }
  if (query.includes("filtro rc") || query.includes("filtro analog") || query.includes("filtro analóg") || query.includes("frecuencia de corte") || query.includes("cutoff rc")) {
    return "Para un RC ideal de primer orden, fc=1/(2πRC), pero la carga puede cambiar el R efectivo. Cutoff no es una pared: en low-pass de primer orden la magnitud cae a 1/√2 (~−3.01 dB) en fc y después la pendiente asintótica es ~−20 dB/dec por polo.";
  }
  if (query.includes("ldo") || query.includes("dropout") || query.includes("psrr") || query.includes("regulador lineal")) {
    return "Un LDO necesita headroom: si Vin se acerca demasiado a Vout entra en dropout y deja de regular. En un lineal, P≈(Vin−Vout)·I puede dominar la temperatura. PSRR mide rechazo del ripple de entrada y depende de frecuencia; no es la misma especificación que el ruido propio de salida.";
  }
  if (query.includes("enob") || query.includes("lsb") && query.includes("adc") || query.includes("conversor adc") || query.includes("adc analog") || query.includes("adc de ")) {
    return "Un ADC muestrea y cuantiza. N bits dan 2^N códigos nominales, no N bits de exactitud garantizada. Comprueba Vref, offset/gain error, INL/DNL, ruido/ENOB, anti-aliasing y el settling del sample-and-hold con la impedancia de la fuente.";
  }
  if (query.includes("conversor dac") || query.includes("dac analog") || query.includes("salida dac") || query.includes("settling dac") || query.includes("glitch dac")) {
    return "Un DAC convierte códigos en niveles analógicos, pero bits nominales no eliminan error, glitch ni settling. La carga puede requerir buffer y una señal reconstruida puede necesitar low-pass; monotonicidad, resolución y precisión son propiedades diferentes.";
  }
  if (query.includes("ruido termico") || query.includes("ruido térmico") || query.includes("johnson") || query.includes("nv/√hz") || query.includes("nv/sqrt") || query.includes("noise density")) {
    return "Una densidad de ruido en V/√Hz necesita bandwidth para convertirse en RMS. Para ruido blanco aproximadamente e_rms=e_n·√B. Fuentes no correlacionadas se combinan por raíz de suma de cuadrados; hum/ripple tonal no es automáticamente ruido blanco.";
  }
  if (query.includes("sonda") || query.includes("probe loading") || query.includes("osciloscopio") || query.includes("multimetro") || query.includes("multímetro")) {
    return "El instrumento forma parte del circuito mientras mide: Rinput y Cinput cargan el nodo, y el ground lead añade inductancia. Bandwidth analógico y sample rate del osciloscopio no son la misma especificación. Antes de conectar la masa de una sonda de banco, verifica si está unida a protective earth.";
  }

  if (query.includes("voltaje") || query.includes("potencial")) {
    return "Piensa en voltaje como una diferencia de energía potencial por unidad de carga: V_AB=V_A−V_B. No 'fluye' voltaje; lo que puede fluir es carga, y la corriente cuantifica dq/dt.";
  }

  if (query.includes("kirchhoff") || query.includes("kcl") || query.includes("kvl")) {
    return "KCL es conservación de carga aplicada al nodo ideal; KVL funciona en el modelo de circuito concentrado habitual. Si un flujo magnético variable enlaza un lazo, la formulación completa debe incorporar Faraday en vez de repetir KVL como conjuro.";
  }

  if (query.includes("mosfet") || query.includes("vgs") || query.includes("threshold")) {
    return "En MOSFET separa tres cosas: V_GS controla el canal, V_GS(th) es solo un umbral definido bajo una corriente de ensayo y R_DS(on) especifica conducción en condiciones concretas. Threshold no significa 'totalmente encendido'.";
  }

  if (query.includes("condens") || query.includes("capacit")) {
    return "Para un condensador ideal, i=C·dv/dt. Un flanco rápido puede exigir mucha corriente incluso con C pequeña; en estado DC estacionario ideal la corriente cae a cero, pero eso no describe el transitorio ni los parasíticos.";
  }

  if (query.includes("inductor") || query.includes("inductancia")) {
    return "Para un inductor ideal, v=L·di/dt. Esa relación explica por qué unos pocos nH pueden producir voltios de overshoot cuando di/dt está en A/ns.";
  }

  if (query.includes("ruido") || query.includes("ringing") || query.includes("subida")) {
    return "No mires solo la frecuencia de reloj: el tiempo de subida fija gran parte del contenido de alta frecuencia. Parasitic L y C, retorno e impedancia pueden convertir un borde digital en ringing, overshoot o crosstalk.";
  }

  if (query.includes("demorgan") || query.includes("de morgan")) {
    return "En De Morgan, una negación que atraviesa un operador intercambia AND↔OR y complementa cada operando: ¬(A·B)=¬A+¬B y ¬(A+B)=¬A·¬B. Una forma segura de comprobarlo es construir las cuatro filas de la tabla de verdad.";
  }

  if (query.includes("karnaugh") || query.includes("k-map") || query.includes("kmap")) {
    return "En Karnaugh, busca grupos rectangulares de 1,2,4,8… celdas, tan grandes como puedas. Los bordes se envuelven y el orden es Gray. En cada grupo desaparecen las variables que cambian y sobreviven las que permanecen constantes.";
  }

  if (query.includes("carry") || query.includes("overflow")) {
    return "Carry y overflow responden a interpretaciones distintas. Carry-out es útil para aritmética unsigned; overflow signed en complemento a dos aparece cuando sumas operandos del mismo signo y el resultado cambia de signo. 0xFF+1 da carry en 8 bits, pero no es por eso automáticamente overflow signed.";
  }

  if (query.includes("latch") || query.includes("flip-flop") || query.includes("flip flop")) {
    return "Un latch suele ser sensible a nivel: mientras enable está activo puede ser transparente. Un flip-flop típico captura alrededor de un flanco. Ambos almacenan estado, pero su modelo temporal no es el mismo; esa diferencia importa mucho para timing.";
  }

  if (query.includes("setup") || query.includes("hold") || query.includes("timing")) {
    return "Setup pregunta si el dato más lento llega a tiempo antes del flanco de captura; hold pregunta si el dato más rápido permanece estable suficiente tiempo después. Por eso setup usa caminos máximos y hold caminos mínimos. Bajar la frecuencia puede ayudar setup, pero no arregla por sí solo hold.";
  }

  if (query.includes("metastab") || query.includes("sincroniz")) {
    return "La metastabilidad puede aparecer al muestrear una transición cerca de la ventana de captura. Un sincronizador añade tiempo de resolución y reduce drásticamente la probabilidad de propagación, pero no la convierte en cero. Para buses o pulsos hace falta una estrategia CDC adecuada, no dos flip-flops por bit y esperanza.";
  }

  if (query.includes("sram") || query.includes("dram") || query.includes("refresh")) {
    return "SRAM suele conservar el bit en un biestable mientras haya alimentación y no necesita refresh periódico del dato; DRAM almacena carga y sí necesita refresh. SRAM suele ser más rápida y menos densa; DRAM más densa y barata por bit. 'Caché' y 'memoria principal' son roles arquitectónicos, no definiciones de tecnología.";
  }


  // Testing: priorizar alcance, oráculos y técnicas antes de fallbacks genéricos.
  if (query.includes("property-based") || query.includes("property based") || query.includes("hypothesis") && query.includes("test")) {
    return "Property-based testing genera muchos ejemplos desde un dominio para intentar falsar propiedades ejecutables; es especialmente útil con round-trips e invariantes. Pasar muchas muestras no es una prueba formal universal, y el valor depende tanto de la estrategia como del oráculo.";
  }
  if (query.includes("fuzz") || query.includes("fuzzer")) {
    return "Fuzzing explora entradas automáticamente. Un fuzzer coverage-guided conserva señales de ejecución útiles para guiar mutaciones; necesita un target y un oráculo —crash, sanitizer, timeout o invariante—. Ausencia de crashes no demuestra correctitud ni seguridad.";
  }
  if (query.includes("unit test") || query.includes("integration test") || query.includes("system test") || query.includes("end-to-end") || query.includes("end to end")) {
    return "Separa alcance y riesgo: unit tests dan feedback local y rápido; integration tests ejercitan fronteras reales entre componentes; system/end-to-end tests validan comportamiento del sistema ensamblado. No existe una proporción universal y mockear una frontera elimina evidencia sobre esa integración.";
  }
  if (query.includes("test double") || query.includes("mock") || query.includes("stub") || query.includes("fake") && query.includes("test")) {
    return "Test double es la categoría general. Fakes, stubs, spies y mocks cumplen papeles distintos según framework y escuela; lo importante es qué colaborador controlan u observan. Mockear detalles internos suele volver frágiles los tests y puede ocultar contratos de integración.";
  }
  if (query.includes("regression test") || query.includes("prueba de regres")) {
    return "Un regression test convierte un fallo corregido en memoria ejecutable: idealmente se demuestra rojo con la versión defectuosa y verde con el fix. Debe proteger la causa o contrato roto, no solo un síntoma accidental.";
  }
  if (query.includes("static analysis") || query.includes("análisis estático") || query.includes("analisis estatico")) {
    return "El análisis estático razona sin ejecutar entradas concretas y puede cubrir tipos, dataflow, taint o abstract interpretation. Sus garantías dependen del modelo; ausencia de warnings no equivale a ausencia de bugs.";
  }
  if (query.includes("dynamic analysis") || query.includes("análisis dinámico") || query.includes("analisis dinamico") || query.includes("addresssanitizer") || query.includes("sanitizer")) {
    return "El análisis dinámico observa ejecuciones concretas, a menudo con instrumentación como sanitizers. Puede detectar errores difíciles de ver en tests normales, pero una ruta no ejecutada sigue fuera de observación; una corrida limpia no demuestra que todo el programa esté libre de defectos.";
  }
  if (query.includes("test coverage") || query.includes("code coverage") || query.includes("mutation testing") || query.includes("mutation score")) {
    return "Coverage mide qué código se ejecutó, no si el oráculo comprobó correctamente el resultado. Mutation testing añade una señal sobre si la suite detecta cambios sembrados, aunque tiene coste y mutantes equivalentes. Ninguna métrica aislada demuestra correctitud.";
  }
  if (query.includes("continuous integration") || query.includes(" ci ") || query.startsWith("ci ") || query.endsWith(" ci")) {
    return "Continuous Integration combina integración frecuente con validación automática y feedback accionable. Una herramienta de builds no basta: importan reproducibilidad, latencia al fallo, flakiness, artefactos y una separación consciente entre checks rápidos y gates costosos.";
  }

  // Virtualización y contenedores: separar máquina virtual, aislamiento de procesos y recursos.
  if (query.includes("namespace") || query.includes("namespaces")) return "Los namespaces aíslan vistas/identidades de recursos del mismo kernel (PID, mount, network, user, etc.). No son cuotas: limitar CPU o memoria es trabajo de cgroups y políticas relacionadas.";
  if (query.includes("cgroup") || query.includes("cgroups")) return "cgroups agrupan tareas y aplican contabilidad/control de recursos. En cgroup v2 los controladores comparten una jerarquía; un límite de memoria o peso de CPU no equivale a aislamiento de nombres ni a una frontera de seguridad completa.";
  if (query.includes("overlayfs") || query.includes("overlay2") || query.includes("copy-up") || query.includes("whiteout")) return "OverlayFS presenta una vista combinada de lower layers y una upper layer escribible. Al modificar contenido inferior puede ocurrir copy-up; whiteouts representan eliminaciones en la vista. No asumas que todo Docker actual almacena imágenes mediante overlay2: el backend depende de versión/configuración.";
  if (query.includes("docker image") || query.includes("imagen docker") || query.includes("image layer") || query.includes("capas de imagen")) return "Una imagen es contenido/configuración reutilizable e inmutable por digest; un contenedor es una instancia con estado de ejecución y una writable layer propia. Un tag es un nombre mutable, no identidad inmutable del contenido.";
  if (query.includes("container") || query.includes("contenedor")) return "Un contenedor Linux normal es un conjunto de procesos aislados mediante mecanismos del kernel y comparte el kernel del host. No es simplemente una VM pequeña: namespaces, cgroups, credenciales, mounts y políticas forman fronteras distintas.";
  if (query.includes("hypervisor") || query.includes("maquina virtual") || query.includes("máquina virtual") || query.includes("virtual machine") || query.includes(" kvm")) return "Una VM ejecuta un guest con su propio kernel sobre hardware virtualizado. El hypervisor/VMM controla vCPU, memoria y E/S; extensiones como VMX/SVM y traducción de memoria asistida reducen costes, pero no convierten el guest en bare metal idéntico.";

  // Sistemas distribuidos: responder desde modelo de fallos, invariantes y garantías.
  if (query.includes("mvcc") || query.includes("multi-version") || query.includes("multiversion")) return "MVCC mantiene múltiples versiones y aplica reglas de visibilidad/snapshot para reducir ciertos conflictos entre lectores y escritores. No significa ausencia total de locks ni serializabilidad automática; el nivel de aislamiento sigue importando.";
  if (query.includes("acid") || query.includes("atomicidad") || query.includes("durabilidad")) return "ACID describe propiedades de transacciones: atomicidad, consistencia respecto a invariantes, aislamiento y durabilidad según el contrato del motor. No convierte un modelo de datos incorrecto en correcto ni cubre cualquier fallo físico imaginable.";
  if (query.includes("query planner") || query.includes("optimizador") || query.includes("explain") || query.includes("plan de ejecucion") || query.includes("plan de ejecución")) return "El planner transforma una consulta lógica en un plan físico usando equivalencias, estadísticas y un modelo de costes. Un índice disponible no obliga a usarlo; estadísticas sesgadas pueden cambiar drásticamente la estimación de cardinalidad y el plan.";
  if (query === "wal" || query.includes("write-ahead") || query.includes("write ahead")) return "WAL registra primero la información necesaria para recuperar cambios antes de depender de la escritura final de las páginas de datos. Checkpoints, fsync y configuración concretan cuándo un commit se considera durable y qué trabajo requiere la recuperación.";
  if (query.includes("btree") || query.includes("b-tree") || query.includes("b tree")) return "Un B-tree/B+tree usa alto fan-out y claves ordenadas para mantener poca altura y soportar igualdad/rangos con pocas visitas de página. Que sea el índice por defecto en muchos motores no significa que sea óptimo para todo predicado o workload.";
  if (query.includes("cap theorem") || query.includes("teorema cap") || query === "cap") return "CAP no significa elegir permanentemente dos de tres. Bajo una partición de red, no puedes garantizar a la vez consistencia fuerte y disponibilidad para todas las solicitudes del objeto considerado; fuera de una partición, el trade-off no se formula así.";
  if (query.includes("lamport") || query.includes("logical clock") || query.includes("reloj lógico")) return "Los relojes de Lamport garantizan: si a→b, entonces L(a)<L(b). La inversa no vale: L(a)<L(b) no demuestra causalidad; eventos concurrentes pueden recibir timestamps distintos.";
  if (query.includes("raft") || query.includes("consensus") || query.includes("consenso")) return "Consenso separa safety y liveness. Raft usa términos, elección de líder y replicación de log; que un follower reciba una entrada no significa por sí solo que esté committed.";
  if (query.includes("message queue") || query.includes("at-least-once") || query.includes("exactly-once") || query.includes("idempot")) return "At-least-once admite redelivery y por tanto consumidores deben tolerar duplicados. Exactly-once siempre tiene un alcance concreto: coordinar broker, estado y efectos externos requiere mecanismos adicionales como idempotencia, deduplicación o transacciones.";

  // Git: resolver primero el modelo de datos y el DAG para evitar colisiones
  // con términos como branch/commit usados también en microarquitectura.
  if (query.includes("working tree") || query.includes("staging area") || query.includes("git index") || query.includes("staged") || query.includes("unstaged")) {
    return "Git mantiene tres estados que conviene separar: HEAD representa el snapshot confirmado actual, el index/staging area representa el próximo snapshot preparado y el working tree es la copia editable. Un archivo puede estar staged y además tener cambios unstaged posteriores.";
  }
  if (query.includes("git blob") || query.includes("git tree") || query.includes("object database") || query.includes("git object")) {
    return "El modelo interno de Git usa objetos content-addressed. Un blob contiene bytes sin pathname; un tree relaciona nombres/modos con blobs u otros trees; un commit referencia un tree raíz y parent(s). La object database no es un historial lineal: es un grafo de objetos alcanzable desde refs.";
  }
  if (query.includes("detached head") || query.includes("git head") || query.includes("refs/heads") || query.includes("git ref") || query.includes("git branch")) {
    return "Una branch local es esencialmente una ref móvil a un commit. HEAD suele ser una symbolic ref a la branch checkout; en detached HEAD apunta directamente a una revisión. Crear una branch no copia los objetos, y dos branches pueden apuntar al mismo commit antes de divergir.";
  }
  if (query.includes("git merge") || query.includes("fast-forward") || query.includes("fast forward") || query.includes("merge commit")) {
    return "Merge combina historias respecto a un merge base. Si el tip actual es ancestro del otro, puede bastar un fast-forward que mueve la ref; si las historias divergen puede crearse un commit con varios padres. Un conflicto significa que Git no pudo elegir automáticamente una resolución segura, no que el repositorio esté corrupto.";
  }
  if (query.includes("git rebase") || query.includes("interactive rebase") || query.includes("rebase -i")) {
    return "Rebase reproduce una serie de cambios sobre otra base. Los commits recreados normalmente obtienen IDs nuevos porque cambian parent y/o metadatos, aunque el resultado de archivos pueda ser equivalente. Por eso reescribir historia ya compartida requiere coordinación.";
  }
  if (query.includes("cherry-pick") || query.includes("cherry pick")) {
    return "Cherry-pick aplica sobre HEAD el cambio introducido por un commit seleccionado y normalmente crea un commit nuevo. Cambio equivalente ≠ mismo commit object: el nuevo parent/contexto cambia la identidad, y puede haber conflictos aunque el original fuese válido.";
  }
  if (query.includes("git tag") || query.includes("annotated tag") || query.includes("lightweight tag")) {
    return "Una lightweight tag es una ref directa; una annotated tag introduce además un tag object con mensaje/metadatos y referencia a otro objeto. Tag y branch son nombres, pero una tag se usa normalmente como marcador estable de una revisión, no como puntero de desarrollo que avanza con cada commit.";
  }
  if (query.includes("git remote") || query.includes("origin/main") || query.includes("remote-tracking") || query.includes("remote tracking") || query.includes("git fetch")) {
    return "Un remote como origin es configuración de URL/refspecs. origin/main es una remote-tracking ref local que recuerda el último estado observado de una ref remota tras fetch; no consulta el servidor en tiempo real. fetch puede traer objetos y mover refs/remotes sin tocar el working tree.";
  }
  if (query.includes("packfile") || query.includes("git gc") || query.includes("git repack") || query.includes("verify-pack")) {
    return "Git puede almacenar objetos loose o consolidarlos en packfiles con índices y deltas. Reempaquetar cambia la representación física y el espacio ocupado, no la identidad lógica de los objetos. Un packfile tampoco es un nuevo tipo semántico de objeto Git.";
  }
  if (query.includes("git hash") || query.includes("object id") || query.includes("sha-256") && query.includes("git") || query.includes("sha256") && query.includes("git")) {
    return "El object ID de Git identifica el contenido serializado del objeto bajo el formato de hash del repositorio. Git tradicional usa SHA-1 y también define repositorios SHA-256. Un object ID ayuda a identidad/integridad de contenido, pero no es por sí solo una firma ni autentica al autor.";
  }
  if (query.includes("reflog") || query.includes("git bisect") || query.includes("git cat-file") || query.includes("plumbing") || query.includes("porcelain")) {
    return "Los comandos porcelain coordinan operaciones de alto nivel; plumbing expone objetos, refs e index. El reflog registra movimientos locales de refs/HEAD y puede ayudar a recuperar commits; git bisect usa búsqueda binaria sobre una historia apropiada para localizar el commit que cambió una propiedad reproducible.";
  }
  if (query.includes("git commit") || query.includes("commit object") || query.includes("commit de git")) {
    return "Un commit Git referencia un tree raíz, parent(s) y metadatos como autor/committer y mensaje. Git modela snapshots; un diff es una comparación derivada entre estados. Cambiar parent o metadatos puede cambiar el object ID aunque el tree sea idéntico.";
  }

  // Microarquitectura avanzada: estas respuestas aparecen antes de la regla
  // genérica de ISA/microarquitectura para ofrecer feedback más específico.
  if (query.includes("pipeline") || query.includes("hazard") || query.includes("forwarding")) {
    return "En pipeline separa latencia de throughput. Un hazard es una situación que exige control para preservar semántica; forwarding puede adelantar un dato ya calculado, pero no elimina una dependencia RAW verdadera ni garantiza evitar todos los stalls.";
  }

  if (query.includes("branch predict") || query.includes("predictor") || query.includes("mispredict") || query.includes("prediccion de saltos")) {
    return "El predictor intenta anticipar dirección y, a menudo, destino para mantener alimentado el front-end. Un fallo obliga a redirigir y descartar trabajo del camino incorrecto; la penalización no es una constante universal y depende de la microarquitectura.";
  }

  if (query.includes("especul") || query.includes("retire") || query.includes("commit") || query.includes("reorder buffer") || query.includes("rob")) {
    return "Separa ejecutar de retirar: una operación puede producir un resultado interno antes de estar autorizada a hacerlo visible. El retiro ordenado y estructuras tipo ROB permiten recuperación y excepciones precisas en muchos diseños OoO; no son requisitos de la ISA.";
  }

  if (query.includes("out of order") || query.includes("fuera de orden") || query.includes("renaming") || query.includes("renombrado")) {
    return "OoO ejecuta primero trabajo listo aunque haya instrucciones anteriores bloqueadas. Register renaming elimina WAR/WAW de nombre asignando destinos físicos distintos; una RAW verdadera permanece porque el consumidor necesita el valor producido.";
  }

  if (query.includes("superscalar") || query.includes("ilp") || query.includes("ancho de retiro") || query.includes("retire width")) {
    return "Superscalaridad es capacidad de procesar varias operaciones por ciclo en ciertas etapas. El ancho nominal no garantiza IPC igual al ancho: ILP, dependencias, front-end, memoria y unidades de ejecución pueden convertirse en el cuello de botella.";
  }

  if (query.includes("micro-op") || query.includes("microop") || query.includes("microcode") || query.includes("microcodigo")) {
    return "Instrucción ISA y operación interna no son la misma capa. Algunas CPUs, como muchas x86 modernas, traducen instrucciones a micro-ops; el número y la forma de esas operaciones son detalles de implementación. Microcode tampoco es sinónimo de BIOS o firmware del sistema.";
  }

  if (query.includes("ipc") || query.includes("cpi") || query.includes("throughput") || query.includes("latencia")) {
    return "Con la misma población y periodo, IPC=N_instrucciones_retiradas/ciclos y CPI es su inverso. Pero IPC aislado no decide rendimiento entre programas o ISA distintas: también cuentan instruction count, frecuencia, memoria y condiciones de medida. Latencia y throughput responden preguntas diferentes.";
  }

  if (query.includes("amdahl") || query.includes("benchmark")) {
    return "Amdahl usa S=1/((1−p)+p/s): solo la fracción p recibe el speedup local s. Para benchmarking, fija workload, entorno y metodología, repite medidas y reporta variabilidad; elegir el mejor número de veinte es más casting que estadística.";
  }

  // Jerarquía de memoria: separar caché, traducción y almacenamiento evita
  // respuestas correctas en una capa pero falsas en otra.
  if (query.includes("cache line") || query.includes("linea de cache") || query.includes("hit") || query.includes("miss")) {
    return "Una cache line es el bloque de transferencia/coherencia, no una palabra individual. Un hit encuentra la línea en el nivel consultado; un miss solo significa buscar más abajo, no ir necesariamente a DRAM.";
  }

  if (query.includes("asociativ") || query.includes("direct mapped") || query.includes("set")) {
    return "En una caché N-way, la dirección selecciona un set y el tag decide si una de sus N vías contiene el bloque. Más asociatividad puede reducir conflictos, pero no elimina misses compulsorios ni de capacidad.";
  }

  if (query.includes("mesi") || query.includes("false sharing") || query.includes("coherencia")) {
    return "Coherencia coordina copias cacheadas de una misma ubicación; consistencia define restricciones de orden visibles entre operaciones. False sharing aparece cuando datos distintos comparten una línea de coherencia y provocan invalidaciones innecesarias.";
  }

  if (query.includes("numa") || query.includes("dram") || query.includes("canal de memoria")) {
    return "DRAM tiene organización y temporización internas; más canales pueden aumentar ancho de banda agregado. En NUMA, memoria local y remota pueden tener costes distintos. Remota sigue siendo RAM: no se ha convertido mágicamente en un SSD con ansiedad.";
  }

  if (query.includes("tlb") || query.includes("page table") || query.includes("tabla de paginas") || query.includes("page fault") || query.includes("memoria virtual")) {
    return "La MMU traduce direcciones virtuales usando page tables y permisos. El TLB cachea traducciones, no datos. Un TLB miss puede resolverse con un page-table walk; un page fault es una excepción distinta y no implica necesariamente acceso a disco.";
  }

  if (query.includes("nand") || query.includes("wear leveling") || query.includes("ftl") || query.includes("garbage collection")) {
    return "NAND programa páginas y borra bloques mayores. El FTL remapea LBAs a ubicaciones físicas; wear leveling distribuye desgaste, ECC corrige errores y garbage collection recupera bloques. Ninguno convierte la flash en memoria infinita.";
  }

  if (query.includes("nvme") || query.includes("m.2") || query.includes("submission queue") || query.includes("completion queue")) {
    return "NVMe es un protocolo/interfaz de almacenamiento basado en colas de submission/completion; PCIe puede ser su transporte y M.2 es un factor de forma. NAND es el medio. Son capas distintas, aunque las tiendas las metan en el mismo título del producto.";
  }


  // Concurrencia y Paralelismo — Bloque 059: estas reglas van antes de los
  // fallbacks de SO/GPU para preservar el contexto de memory models y progreso.
  if (query.includes("concurrencia vs paralelismo") || query.includes("concurrency vs parallelism") || query.includes("concurrencia y paralelismo")) {
    return "Concurrencia describe progreso solapado y puede existir en un solo core por interleaving; paralelismo implica ejecución simultánea sobre recursos distintos. Un diseño concurrente no obtiene speedup automáticamente: dependencias, coordinación y overhead siguen mandando.";
  }
  if (query.includes("lock-free") || query.includes("wait-free") || query.includes("obstruction-free") || query.includes("aba problem") || query.includes("hazard pointer")) {
    return "Lock-free garantiza progreso global, no progreso de cada thread; wait-free exige una cota de pasos por participante. CAS no resuelve lifetime: ABA y reclamación necesitan técnicas como tagging, hazard pointers o epochs según el diseño.";
  }
  if (query.includes("memory_order_relaxed") || query.includes("acquire release") || query.includes("release acquire") || query.includes("sequential consistency") || query.includes("seq_cst")) {
    return "Atomicidad y orden son contratos distintos. Relaxed mantiene atomicidad/modification order del objeto sin publicar por sí solo otros datos; release/acquire puede crear una relación de sincronización cuando el acquire observa la publicación; seq_cst añade restricciones globales más fuertes.";
  }
  if (query.includes("memory model") || query.includes("modelo de memoria") || query.includes("cache coherence") || query.includes("coherencia de cache") || query.includes("coherencia de caché")) {
    return "Separa capas: modelo del lenguaje → transformaciones del compilador → ordering de la ISA → microarquitectura/coherencia. Coherencia de caché sobre una ubicación no sustituye happens-before ni hace correcto un protocolo concurrente con data races.";
  }
  if (query.includes("simd") || query.includes("vectorizacion") || query.includes("vectorización") || query.includes("avx")) {
    return "SIMD opera varias lanes con una instrucción/vector; no equivale a crear threads. El ancho vectorial teórico no garantiza speedup lineal: dependencias, aliasing, tails, gathers y bandwidth pueden dominar. Comprueba vectorization reports y mide.";
  }
  if (query.includes("gpu parallelism") || query.includes("simt") || query.includes("warp divergence") || query.includes("branch divergence")) {
    return "GPU parallelism usa muchos threads ligeros y ejecución SIMT. En CUDA actual un warp agrupa 32 threads, pero no universalices ese tamaño a todas las GPU. Divergence puede serializar caminos y occupancy alta no garantiza rendimiento: locality, bandwidth e instruction mix también importan.";
  }
  if (query.includes("distributed parallelism") || query.includes("paralelismo distribuido") || query.includes("all-reduce") || query.includes("allreduce") || query.includes("straggler")) {
    return "Paralelismo distribuido añade red, serialización, particionado, stragglers y fallos parciales. No existe memoria compartida uniforme ni un reloj global perfecto; mide bytes movidos, latencia, balance, retries y coste de coordinación junto al speedup.";
  }
  if (query.includes("amdahl") || query.includes("speedup paralelo") || query.includes("fraccion serial") || query.includes("fracción serial")) {
    return "Amdahl idealiza S=1/((1-p)+p/N): incluso con muchos workers la fracción serial limita el speedup. Es una cota de modelo; scheduling, comunicación, imbalance y sincronización suelen reducir el resultado real.";
  }

  // Ingeniería del Software — Bloque 067. Va antes de fallbacks de SO/API y
  // arquitectura genérica para conservar el contexto de contratos y evolución.
  if (query.includes("modularidad") || query.includes("modularity") || query.includes("modulo de software") || query.includes("módulo de software")) return "Modularidad no significa repartir código en muchos archivos: un módulo agrupa decisiones que cambian juntas y expone un contrato pequeño. Evalúa radio de cambio, dependencias, ownership y testabilidad; más módulos pueden aumentar acoplamiento si los límites son malos.";
  if (query.includes("abstraccion") || query.includes("abstracción") || query.includes("abstraction leak") || query.includes("leaky abstraction")) return "Abstraer es decidir qué forma parte del contrato y qué detalle puede ocultarse. Una buena abstracción simplifica sin mentir sobre semántica, coste, errores o límites que el consumidor necesita para usarla correctamente.";
  if (query.includes("encapsulacion") || query.includes("encapsulación") || query.includes("invariante") && query.includes("software")) return "Encapsulación protege invariantes controlando estados y transiciones; campos privados más getters/setters no bastan si cualquier consumidor puede reconstruir estados inválidos. Diseña operaciones de dominio y verifica todos los caminos de mutación.";
  if (query.includes("api contract") || query.includes("contrato api") || query.includes("contrato de api") || query.includes("breaking change") || query === "api" || query.includes("diseño de api") || query.includes("diseno de api")) return "Una API es más que su firma: errores, ordering, idempotencia, ownership, concurrencia y compatibilidad pueden ser observables. Separa contrato de implementación y usa contract tests/migraciones para demostrar compatibilidad; versionar no la garantiza por sí solo.";
  if (query.includes("cohesion") || query.includes("cohesión") || query.includes("acoplamiento") || query.includes("coupling")) return "Alta cohesión agrupa responsabilidades que cambian por la misma razón; bajo acoplamiento significa dependencias pocas, explícitas y estables, no ausencia total de dependencias. Analiza dirección, fan-in/fan-out y detalles de implementación filtrados.";
  if (query.includes("diseño de interfaces") || query.includes("diseno de interfaces") || query.includes("interface design") || query.includes("boolean flag") || query.includes("flag boolean")) return "Una interfaz buena expresa capacidades, ownership, lifetime y errores y hace difíciles los estados inválidos. Muchos flags booleanos suelen crear combinaciones ambiguas; tipos y operaciones más específicas pueden mover errores de runtime al propio diseño.";
  if (query.includes("quality attribute") || query.includes("atributo de calidad") || query.includes("trade-off arquitectura") || query.includes("tradeoff arquitectura")) return "Arquitectura se justifica mediante quality attributes y restricciones medibles: latencia, disponibilidad, seguridad, modificabilidad, coste, etc. Mejorar una puede perjudicar otra; documenta escenario, métrica, alternativa y consecuencia en vez de usar adjetivos vagos.";
  if (query.includes("refactor") || query.includes("refactoring")) return "Refactoring cambia estructura interna preservando intencionalmente comportamiento observable. Haz pasos pequeños con tests verdes y separa feature changes para aislar regresiones; una reescritura grande no se vuelve refactor solo por llamarla así.";
  if (query.includes("technical debt") || query.includes("deuda tecnica") || query.includes("deuda técnica")) return "Deuda técnica es un pasivo que aumenta coste o riesgo futuro; puede ser deliberada y racional. Registra principal, interés esperado, riesgo, owner y trigger de pago. 'Código feo' sin impacto de evolución no es una definición suficiente.";
  if (query.includes("code review") || query.includes("revision de codigo") || query.includes("revisión de código") || query.includes("pull request review")) return "Code review complementa tests y análisis automático: prioriza invariantes, errores, seguridad, compatibilidad y mantenibilidad antes que estilo. PRs pequeños y con intención explícita reducen carga cognitiva; review no sustituye ejecutar tests.";
  if (query.includes("documentacion") || query.includes("documentación") || query.includes("runbook") || query.includes("adr") && query.includes("architecture")) return "Documenta intención, contratos, invariantes, decisiones y operaciones difíciles de deducir del código. README, API docs, ADR y runbook sirven a públicos distintos; comentarios que solo narran una línea suelen añadir deriva, no conocimiento.";
  if (query.includes("dependency evolution") || query.includes("evolucion de dependencias") || query.includes("evolución de dependencias") || query.includes("semantic versioning") || query.includes("semver")) return "Una versión comunica intención, no demuestra compatibilidad real. Aísla dependencias externas cuando su ritmo de cambio no debe propagarse al dominio, usa contract tests y planifica migraciones/deprecaciones con telemetría de consumidores.";

  // Sistemas operativos: separar abstracción, privilegio, scheduling, IPC y
  // sincronización evita mezclar mecanismos que viven en capas distintas.
  if (query.includes("kernel") || query.includes("user space") || query.includes("kernel space") || query.includes("privilegio")) {
    return "El kernel ejecuta mecanismos privilegiados y user space opera con permisos restringidos. Una syscall, fault o interrupción puede transferir control al kernel sin convertirlo en otro proceso. 'Ring 0/3' es nomenclatura típica de x86, no una taxonomía universal de todas las ISA.";
  }

  if (query.includes("uefi") || query.includes("bios") || query.includes("bootloader") || query.includes("boot")) {
    return "En el arranque separa firmware, bootloader y kernel. UEFI ofrece Boot Services y Runtime Services como categorías distintas; tras ExitBootServices el SO toma control de recursos que usaba mediante Boot Services. UEFI no es simplemente 'BIOS moderno con ratón'.";
  }

  if (query.includes("proceso") || query.includes("process") || query.includes("pcb") || query.includes("context switch")) {
    return "Programa y proceso no son lo mismo. El kernel conserva estado ejecutable y administrativo para reanudar tareas; 'PCB' es una abstracción útil, no un layout universal. Un context switch entre threads del mismo proceso puede ocurrir sin cambiar de espacio virtual.";
  }

  if (query.includes("thread") || query.includes("scheduler") || query.includes("preempt") || query.includes("prioridad")) {
    return "Threads de un proceso suelen compartir address space y recursos, pero cada uno tiene su propio estado de ejecución y stack. Concurrencia no exige paralelismo. Preemption permite retirar CPU sin que la tarea ceda voluntariamente; la política del scheduler decide objetivos como fairness, latencia o tiempo real.";
  }

  if (query.includes("syscall") || query.includes("api") || query.includes("abi")) {
    return "Una syscall es una entrada controlada al kernel. Una API es el contrato a nivel fuente y una ABI fija detalles binarios; además, la ABI normal de funciones puede diferir de la ABI de syscalls. Una función de libc puede envolver cero, una o varias syscalls.";
  }

  if (query.includes("pipe") || query.includes("signal") || query.includes("message queue") || query.includes("shared memory") || query.includes("ipc") || query.includes("socket")) {
    return "Elige IPC por semántica: pipe y TCP son byte streams, signals notifican eventos, message queues preservan mensajes y shared memory comparte páginas pero exige sincronización. Eliminar copias no elimina carreras, framing ni gestión de lifetime.";
  }

  if (query.includes("mutex") || query.includes("semafor") || query.includes("condition variable") || query.includes("atomic") || query.includes("futex")) {
    return "Mutex, semaphore, condition variable y atomic resuelven problemas distintos. Un condvar wait debe reevaluar el predicado en bucle; un semáforo es un contador de permisos; atomicidad no implica automáticamente el orden de memoria que necesitas ni garantiza lock-free.";
  }

  if (query.includes("data race") || query.includes("race condition") || query.includes("memory order") || query.includes("happens-before")) {
    return "Race condition es un concepto amplio; una data race tiene una definición formal en modelos como C/C++. volatile no sincroniza threads. Coherencia de caché y modelo de memoria del lenguaje tampoco son la misma capa: necesitas una relación de sincronización válida para razonar sobre visibilidad y orden.";
  }

  if (query.includes("deadlock") || query.includes("livelock") || query.includes("starvation")) {
    return "Deadlock es espera circular/sin progreso bajo determinadas condiciones; livelock tiene actividad pero no progreso útil; starvation permite progreso global mientras una tarea queda pospuesta indefinidamente. Un orden global de locks puede romper ciclos de adquisición, pero no resuelve automáticamente todo problema de liveness.";
  }

  // Sistemas de archivos: separar nombre, objeto abierto, VFS, layout y
  // persistencia evita respuestas que mezclan capas del storage stack.
  if (query.includes("file descriptor") || query.includes("open file") || query.includes(" dup")) {
    return "Un file descriptor es un entero por proceso que referencia estado de apertura del kernel; no es el inode. dup() crea otro descriptor hacia la misma open file description, por lo que puede compartir offset y status flags.";
  }

  if (query.includes("inode") || query.includes("dentry") || query.includes("hard link")) {
    return "En Linux VFS, una dentry representa una asociación de nombre durante path lookup y suele apuntar a un inode, que modela el objeto. Varios hard links pueden producir varias dentries hacia el mismo inode; el pathname no vive como identidad única dentro del inode.";
  }

  if (query.includes("mount") || query.includes("vfs")) {
    return "Montar conecta la raíz de un filesystem con un punto del namespace; no copia archivos. VFS es la capa del kernel que ofrece operaciones comunes y delega en ext4, tmpfs, NFS, etc. Puede atravesarse un mountpoint durante path lookup.";
  }

  if (query.includes("journal") || query.includes("fsync") || query.includes("durab") || query.includes("writeback")) {
    return "Separa consistencia, visibilidad y durabilidad. Journaling ayuda a recuperar invariantes tras crash; page cache puede hacer visible una escritura antes de que llegue al medio persistente; fsync solicita sincronización más fuerte, pero una actualización de namespace puede requerir razonar también sobre el directorio.";
  }

  if (query.includes("sparse") || query.includes("extent") || query.includes("bloque") && query.includes("archivo")) {
    return "Un extent representa un rango de bloques; un sparse file puede tener gran tamaño lógico con holes no materializados. No confundas filesystem block, sector del dispositivo y página NAND: son granularidades de capas distintas.";
  }

  if (query.includes("fat") || query.includes("ntfs") || query.includes("mft")) {
    return "FAT y NTFS exponen archivos/directorios pero usan estructuras distintas: FAT encadena clusters mediante su tabla; NTFS organiza metadata en records/atributos de la MFT. No proyectes literalmente el inode de ext4 sobre ellos.";
  }

  if (query.includes("copy-on-write") || query.includes("copy on write") || query.includes("btrfs") || query.includes("zfs") || query.includes("reflink") || query.includes("snapshot")) {
    return "COW escribe nuevas versiones de bloques afectados y actualiza referencias; snapshots/reflinks pueden compartir almacenamiento inicialmente. Checksum puede detectar corrupción, pero repararla requiere una copia válida/redundancia y un mecanismo que la use.";
  }

  // Drivers y hardware: separar bus, dispositivo, mecanismo de I/O y subsistema.
  if (query.includes("mmio") || query.includes("port-mapped") || query.includes("port io")) {
    return "MMIO mapea recursos de dispositivo en el espacio de direcciones, pero no convierte esos registros en RAM ordinaria: pueden tener side effects y reglas de ordering. Port-mapped I/O usa un espacio separado en ISA que lo soportan, como x86.";
  }

  if (query.includes("irq") || query.includes("interrupt") || query.includes("msi-x") || query.includes("msi")) {
    return "Una interrupción notifica un evento asíncrono; IRQ es una identidad/ruta lógica de interrupción y no implica siempre un pin físico. PCIe MSI/MSI-X señaliza mediante mensajes. El handler inmediato suele reconocer la causa y diferir trabajo pesado.";
  }

  if (query.includes("dma") || query.includes("iommu") || query.includes("dma_addr")) {
    return "DMA permite transferencias dispositivo↔memoria sin copia byte a byte por CPU, pero la CPU sigue configurando buffers y completados. Usa la DMA API: la dirección DMA puede diferir de CPU virtual/física. Una IOMMU añade traducción y aislamiento para dispositivos.";
  }

  if (query.includes("pci express") || query.includes("pcie") || query.includes("tlp") || query.includes("bar")) {
    return "PCIe conserva gran parte del programming model PCI —configuration space, BARs y capabilities— pero el transporte es una fabric serie punto a punto y packetizada. x16 describe lanes, no '16 dispositivos', y un TLP no es un paquete IP.";
  }

  if (query.includes("usb") || query.includes("endpoint") || query.includes("hid") || query.includes("report descriptor")) {
    return "USB es host-centric: el host enumera y agenda transfers. Endpoints pertenecen al dispositivo y los descriptors describen interfaces. Un USB interrupt transfer no es una IRQ PCI directa. HID usa report descriptors/usages para que un driver de clase interprete layouts distintos.";
  }

  if (query.includes("driver de red") || query.includes("napi") || query.includes("rx ring") || query.includes("tx ring")) {
    return "Una NIC suele intercambiar buffers mediante descriptor rings y DMA. El driver coordina ownership y completados; NAPI puede combinar interrupciones y polling por lotes. RX ring y socket buffer son estructuras de capas distintas.";
  }

  if (query.includes("driver graf") || query.includes("command buffer") || query.includes("fence") || query.includes("gpu driver")) {
    return "Drivers gráficos modernos reparten trabajo entre user space y kernel. Command buffers/queues envían trabajo a la GPU y fences expresan completado/dependencias. Que una llamada CPU retorne no implica que la GPU haya terminado.";
  }

  // Ciberseguridad de sistemas: identidad, autorización, privilegio y aislamiento
  // se responden por separado. Las coincidencias específicas van antes de la
  // ayuda genérica de Linux interno para evitar que "container" o "capability"
  // oculten la pregunta de seguridad real.
  if (query.includes("threat model") || query.includes("superficie de ataque") || query.includes("attack surface") || query.includes("trust boundary")) {
    return "Un threat model conecta activos, adversarios, trust boundaries, entradas y consecuencias. Attack surface es lo alcanzable/influenciable; reducirla baja oportunidades pero no demuestra ausencia de vulnerabilidades. Revisa el modelo cuando cambien privilegios, dependencias o exposición.";
  }

  if (query.includes("autenticacion") || query.includes("autenticación") || query.includes("authorization") || query.includes("autorizacion") || query.includes("autorización") || query.includes("mfa")) {
    return "Authentication establece identidad/credencial; authorization decide si ese sujeto puede realizar una acción sobre un recurso en un contexto. Estar autenticado —incluso con MFA— no autoriza cualquier objeto ni sustituye controles server-side.";
  }

  if (query.includes("rbac") || query.includes("abac") || query.includes("dac") || query.includes("control de acceso") || query.includes("default deny")) {
    return "DAC, MAC, RBAC y ABAC son modelos de política distintos y pueden combinarse. Evalúa sujeto, acción, recurso y contexto; default deny, precedencia e herencia importan. Un rol demasiado amplio sigue violando least privilege aunque tenga un nombre muy corporativo.";
  }

  if (query.includes("suid") || query.includes("setuid") || query.includes("set-user-id") || query.includes("saved uid") || query.includes("effective uid")) {
    return "Set-user-ID es una transición de credenciales en exec, no sinónimo universal de root: el owner del ejecutable importa. Real/effective/saved IDs tienen papeles distintos. En Linux, no_new_privs, nosuid o tracing pueden impedir la ganancia; los programas privilegiados deben tratar entorno, paths y FDs como superficie hostil.";
  }

  if (query.includes("no_new_privs") || query.includes("no new priv") || query.includes("bounding set") || query.includes("ambient cap")) {
    return "no_new_privs promete que execve no concederá autoridad nueva por mecanismos como setuid/setgid o file capabilities; se hereda y no puede desactivarse. No revoca FDs o capabilities ya poseídas. En capabilities, permitted/effective/inheritable/bounding/ambient cumplen funciones distintas.";
  }

  if (query.includes("seccomp") || query.includes("landlock") || query.includes("sandbox")) {
    return "Seccomp reduce syscalls alcanzables; Landlock añade self-restriction de access control sobre recursos soportados; namespaces aíslan vistas. Ninguno es 'la sandbox' por sí solo. Diseña la frontera con no_new_privs, privilegios mínimos, FDs, mounts, policy y filtros, y aplícala antes de procesar input hostil.";
  }

  // Bloque 073 — Cloud y sistemas a gran escala
  if (query.includes("kubernetes") || query.includes("k8s") || query.includes("control plane") || query.includes("pod")) {
    return "Kubernetes modela estado deseado mediante objetos y controllers que reconcilian continuamente. El control plane decide y mantiene estado del cluster; los worker nodes ejecutan workloads. No confundas Pod con VM ni Kubernetes con una garantía automática de alta disponibilidad.";
  }
  if (query.includes("autoscal") || query.includes("hpa") || query.includes("escalado horizontal") || query.includes("escalado vertical")) {
    return "Autoscaling es un sistema de control con señal, objetivo, actuador, retardos y límites. Horizontal añade réplicas; vertical cambia recursos; node autoscaling cambia capacidad del cluster. Comprueba cold starts, queues, cuotas y saturación aguas abajo antes de asumir que escalar resolverá la sobrecarga.";
  }
  if (query.includes("load balancer") || query.includes("balanceador") || query.includes("health check")) {
    return "Un load balancer distribuye tráfico entre targets elegibles y puede excluir targets según health checks. No replica estado ni elimina dependencias compartidas: para hablar de HA identifica failure domains, estado, health model y comportamiento durante failover.";
  }
  if (query.includes("observabilidad") || query.includes("observability") || query.includes("slo") || query.includes("error budget")) {
    return "Observabilidad usa señales como métricas, logs y traces para inferir estado interno. Un SLI mide, un SLO fija un objetivo y el error budget expresa cuánto incumplimiento queda permitido. Conecta telemetría con experiencia del usuario y evita confundir volumen de datos con capacidad de diagnóstico.";
  }
  if (query.includes("cloud") || query.includes("nube") || query.includes("data center") || query.includes("failure domain")) {
    return "En cloud piensa primero en recursos, failure domains y contratos: compute, red, storage, identidad y planos de control. Dos réplicas solo aportan resiliencia frente a un fallo si no comparten exactamente ese modo de fallo. Valida con carga, fallo inducido y métricas de recuperación.";
  }

  if ((query.includes("container") || query.includes("contenedor")) && (query.includes("seguridad") || query.includes("aisla") || query.includes("aislamiento") || query.includes("privileged") || query.includes("socket"))) {
    return "Un container Linux común comparte kernel con el host. Namespaces aíslan vistas, cgroups recursos y capabilities/seccomp/LSM autoridad alcanzable. Un container privileged o con sockets/mounts administrativos del host puede tener una frontera muy débil: evalúa recursos reales, no la etiqueta 'container'.";
  }

  if (query.includes("privilege separation") || query.includes("separacion de privilegios") || query.includes("separación de privilegios") || query.includes("broker privilegiado")) {
    return "Privilege separation mueve la autoridad a un broker pequeño y deja el parser/frontend con mínimos permisos. El IPC se convierte en trust boundary: debe tener framing, límites, identidad y autorización. El broker revalida la operación en el punto donde ejerce la autoridad.";
  }

  if (query.includes("defense in depth") || query.includes("blast radius") || query.includes("tcb") || query.includes("trusted computing base")) {
    return "Isolation se evalúa por el TCB compartido y los recursos comunes. Procesos y containers comparten kernel; una VM añade otro tipo de frontera. Defense in depth necesita controles con modos de fallo parcialmente independientes; tres capas que dependen de la misma credencial no son tres defensas independientes.";
  }

  // Linux interno: distinguir pseudo-filesystems, aislamiento, control de
  // recursos, seguridad y extensibilidad evita agrupar todo bajo "cosas del kernel".
  if (query.includes("/proc") || query.includes("procfs")) {
    return "/proc es un pseudo-filesystem dinámico que expone estado de procesos y kernel; /proc/sys además contiene parte de sysctl. No es un snapshot global atómico ni una copia persistida en disco: un PID o un fd puede cambiar entre dos lecturas.";
  }

  if (query.includes("/sys") || query.includes("sysfs") || query.includes("/dev") || query.includes("devtmpfs")) {
    return "sysfs (/sys) proyecta kobjects, atributos y relaciones del device model; /dev contiene nodos de acceso a muchos dispositivos dentro del VFS. Son contratos distintos. devtmpfs/udev pueden participar en la creación y política de nombres/permisos, pero renombrar /dev no cambia la identidad hardware.";
  }

  if (query.includes("namespace") || query.includes("unshare") || query.includes("setns")) {
    return "Namespaces aíslan vistas o identidades: mount, PID, network, IPC, UTS, user, cgroup, time… No crean otro kernel. clone/unshare pueden crear nuevas vistas y setns permite unirse a algunas existentes; capabilities se evalúan además en el contexto del user namespace relevante.";
  }

  if (query.includes("cgroup") || query.includes("cpu.weight") || query.includes("memory.max")) {
    return "cgroups organizan procesos jerárquicamente para contabilidad/control de recursos. En v2 hay una jerarquía unificada y controllers con semánticas distintas. cpu.weight es reparto relativo bajo contención; no es un techo fijo. No confundas cgroup con cgroup namespace.";
  }

  if (query.includes("container") || query.includes("contenedor") || query.includes("chroot")) {
    return "Linux no tiene una syscall universal create_container(): un runtime compone namespaces, cgroups, mounts/rootfs, credenciales, capabilities y normalmente más controles. Comparte kernel con el host, así que chroot solo o un namespace aislado no constituyen toda la frontera de seguridad.";
  }

  if (query.includes("systemd") || query.includes("unit") || query.includes("requires=") || query.includes("after=")) {
    return "En systemd, dependencia y orden son ejes distintos: Requires/Wants expresan relaciones de requirement, mientras Before/After ordenan jobs cuando ambos existen. enable configura activación futura; start inicia ahora. After=network.target no demuestra que Internet o DNS estén listos.";
  }

  if (query.includes("capabilit") || query.includes("cap_sys") || query.includes("least privilege")) {
    return "Linux capabilities dividen parte del privilegio tradicional de UID 0 en unidades más finas. Effective/permitted/inheritable/bounding/ambient tienen roles diferentes y se contextualizan por user namespace. CAP_SYS_ADMIN es especialmente amplia: no la trates como una capability pequeña y simpática.";
  }

  if (query.includes("selinux") || query.includes("apparmor") || query.includes("lsm")) {
    return "LSM es el framework de hooks de seguridad; SELinux y AppArmor implementan políticas con modelos diferentes. Una operación permitida por DAC puede ser denegada por MAC/LSM. chmod 777 no derrota una policy correctamente aplicada; solo empeora el DAC con gran entusiasmo.";
  }

  if (query.includes("kernel module") || query.includes("modulo del kernel") || query.includes("modprobe") || query.includes("kbuild")) {
    return "Un módulo cargable entra en el contexto privilegiado del kernel; no es un plugin aislado. kbuild es el build system del kernel, y el lifecycle exige limpiar recursos/callbacks antes de unload. La API interna del kernel no promete una ABI binaria universalmente estable entre versiones.";
  }

  if (query.includes("ebpf") || query.includes("bpf") || query.includes("verifier") || query.includes("xdp")) {
    return "eBPF carga programas para program types/hooks concretos. El verifier comprueba propiedades de safety y acceso según su modelo; no demuestra que tu lógica sea correcta. Maps almacenan/comparten estado, helpers/kfuncs son interfaces controladas y un JIT puede traducir bytecode BPF a nativo.";
  }


  // Malware y forense: respuestas defensivas y de investigación autorizada.
  if (query.includes("yara")) return "YARA clasifica artefactos por strings/patrones y lógica booleana. Una coincidencia es evidencia para triage, no prueba automática de malware. Prefiere rasgos discriminativos, metadata y tests con corpus positivos/negativos.";
  if (query.includes("volatility") || query.includes("memory forensics") || query.includes("forense de memoria")) return "Volatility 3 analiza memoria adquirida mediante layers, symbols, objects y plugins. No adquiere la memoria por sí solo. Un proceso/región anómala es una pista: correlaciónala con mappings, módulos, handles, red y contexto.";
  if (query.includes("ioc") || query.includes("indicator of compromise") || query.includes("ioa")) return "Un IOC como hash/IP/path puede ser preciso pero frágil. Una detección de comportamiento suele generalizar más, con otros costes y falsos positivos. Conserva provenance, contexto, owner, tests y fecha de revisión.";
  if (query.includes("incident response") || query.includes("respuesta a incidentes") || query.includes("contencion") || query.includes("contención")) return "Incident response integra preparación, detección, análisis, contención, recuperación y aprendizaje. Preservar evidencia es importante, pero la contención se decide según riesgo real: no dejes que el laboratorio forense permita daño evitable.";
  if (query.includes("persistencia") || query.includes("persistence") || query.includes("evasion") || query.includes("evasión")) return "En análisis defensivo, persistence describe mantener acceso/ejecución ante interrupciones y defense evasion/stealth reducir observabilidad o interferir con controles. Identifica cambios y telemetría; una técnica o artefacto aislado no prueba intención.";
  if (query.includes("pcap") || query.includes("network forensics") || query.includes("forense de red")) return "Network forensics correlaciona flows, DNS, TLS metadata y capturas. Una IP no equivale a identidad: NAT, CDN, proxies e infraestructura comprometida rompen esa inferencia. Conserva tiempo, dirección, protocolo y calidad de captura.";
  if (query.includes("cadena de custodia") || query.includes("chain of custody") || query.includes("evidencia forense")) return "Preserva originales, trabaja sobre copias cuando sea posible y registra hash, origen, hora, herramienta, operador y transformaciones. Un hash demuestra igualdad de bytes entre mediciones; no demuestra que la adquisición original fuese completa.";
  if ((query.includes("malware") || query.includes("sandbox")) && (query.includes("analisis") || query.includes("análisis") || query.includes("dinam") || query.includes("estatic"))) return "Separa análisis estático y dinámico: el primero inspecciona artefactos sin ejecutarlos; el segundo observa caminos realmente ejecutados en un entorno aislado. Ninguno garantiza cobertura total. Correlaciona host, red, memoria y timeline.";

  // Debugging y análisis: elegir herramienta por la frontera observada evita
  // tratar debugger, tracer, sanitizer y profiler como sinónimos.
  if (query.includes("breakpoint") || query.includes("single-step") || query.includes("stepping")) {
    return "Un breakpoint detiene al alcanzar una ubicación/condición; single-step controla el avance. Bajo optimización, una línea fuente no equivale necesariamente a una instrucción. Los breakpoints software y hardware además usan mecanismos distintos y los recursos hardware son finitos.";
  }

  if (query.includes("watchpoint")) {
    return "Un watchpoint observa accesos a una dirección/rango de datos. Es ideal para localizar quién corrompe memoria, pero vigila bytes y lifetime reales: tras free/realloc esa dirección puede dejar de representar el mismo objeto.";
  }

  if (query.includes("backtrace") || query.includes("stack trace") || query.includes("unwind") || query.includes("frame pointer")) {
    return "Un backtrace se reconstruye: no existe como lista mágica guardada por la CPU. Puede usar frame pointers o unwind info/CFI; inlining, tail calls, optimización o corrupción del stack pueden alterar o truncar los frames visibles.";
  }

  if (query.includes("core dump") || query.includes("post-mortem") || query.includes("memory map") || query.includes("mapping")) {
    return "Un core dump es una instantánea post-mortem, no un replay completo. Para analizarlo bien necesitas el binario y símbolos del mismo build y los mappings correctos; ASLR y bibliotecas cargadas hacen peligrosas las direcciones absolutas aisladas.";
  }

  if (query.includes("strace") || query.includes("ltrace") || query.includes("syscall trace")) {
    return "strace observa principalmente la frontera proceso↔kernel: syscalls, señales y retornos. ltrace intercepta llamadas a bibliotecas dinámicas. Una función de libc no tiene por qué corresponder 1:1 con una syscall, y una función static/inlined puede no aparecer en ltrace.";
  }

  if (query.includes("valgrind") || query.includes("memcheck")) {
    return "Memcheck, dentro de Valgrind, instrumenta dinámicamente la ejecución y mantiene shadow state para accesos/valores. Puede encontrar accesos inválidos y uso de datos no inicializados en caminos ejecutados, a cambio de un overhead normalmente alto.";
  }

  if (query.includes("asan") || query.includes("ubsan") || query.includes("tsan") || query.includes("sanitizer")) {
    return "ASan se orienta a errores de seguridad de memoria, UBSan a categorías instrumentables de undefined behavior y TSan a data races. Son detección dinámica: si el camino defectuoso no se ejecuta, el silencio no constituye una prueba formal de ausencia de errores.";
  }


  // Filosofía y Metodología de Ingeniería: separa evidencia, modelo, supuestos y decisión.
  if (query.includes("modelar") || query.includes("modelo del problema") || query.includes("frontera del sistema")) {
    return "Modelar no es copiar toda la realidad: define objetivo, frontera, variables, restricciones, incertidumbre y criterio de éxito. Un modelo es útil dentro de un dominio de validez; declara qué omite y qué observación lo invalidaría.";
  }
  if (query.includes("supuesto") || query.includes("assumption")) {
    return "Convierte el supuesto en una afirmación falsable: qué crees, por qué importa, cómo lo medirías y qué harías si resulta falso. Documentarlo reduce dependencia invisible, pero no sustituye validarlo o diseñar una mitigación.";
  }
  if (query.includes("trade-off") || query.includes("tradeoff") || query.includes("comparar alternativas")) {
    return "Compara alternativas bajo el mismo problema y restricciones. Usa atributos medibles —latencia, coste, consistencia, seguridad, operabilidad, reversibilidad— y realiza análisis de sensibilidad: una matriz de decisión hace visibles los juicios, no los convierte automáticamente en hechos.";
  }
  if (query.includes("experimento") || query.includes("hipotesis") || query.includes("hipótesis")) {
    return "Empieza por una hipótesis falsable y una observación que diferencie explicaciones competidoras. Fija baseline, controla variables, repite y registra entorno. Si cambias varias causas a la vez, una mejora observada no identifica cuál la produjo.";
  }
  if (query.includes("reproduc") || query.includes("seed") || query.includes("lockfile")) {
    return "Reproducibilidad significa que otra persona puede reconstruir el procedimiento y obtener evidencia comparable: registra inputs, versiones, configuración, seeds, hardware relevante y pasos. No equivale a corrección: también puede reproducirse consistentemente un resultado equivocado.";
  }
  if (query.includes("verificacion") || query.includes("verificación") || query.includes("validacion") || query.includes("validación")) {
    return "Verificación pregunta si construiste el sistema conforme a requisitos o especificación; validación pregunta si ese sistema y esos requisitos resuelven la necesidad real. Puedes verificar perfectamente la especificación equivocada, por eso ambas evidencias son necesarias.";
  }
  if (query.includes("paper") || query.includes("estandar") || query.includes("estándar") || query.includes("documentacion oficial") || query.includes("documentación oficial")) {
    return "Lee fuentes por alcance: versión y contrato en documentación; requisitos normativos y conformidad en estándares; pregunta, método, baseline, resultados y amenazas a validez en papers. Un ejemplo o benchmark aislado no autoriza a generalizar fuera de sus condiciones.";
  }
  if ((query.includes("debug") || query.includes("causa raiz") || query.includes("causa raíz")) && (query.includes("sistem") || query.includes("hipotes"))) {
    return "Debugging sistemático: reproduce, caracteriza, minimiza, formula hipótesis y ejecuta pruebas discriminantes. La causa raíz debe explicar el mecanismo y predecir qué ocurre al retirar/reintroducir la condición; que el síntoma desaparezca tras muchos cambios no demuestra causalidad.";
  }

  // Historia de la Computación: prioriza criterio histórico, mecanismo y causalidad documentada.
  if (query.includes("babbage") || query.includes("analytical engine") || query.includes("difference engine")) {
    return "Babbage diseñó la Difference Engine para tabulación y concibió después la Analytical Engine como máquina programable de propósito general. Separa diseño conceptual, prototipos y construcción efectiva: la Analytical Engine no se completó como sistema operativo durante su vida.";
  }
  if (query.includes("ada lovelace") || query.includes("lovelace")) {
    return "Para Ada Lovelace evita quedarte en la etiqueta de ‘primera programadora’: estudia sus notas sobre la Analytical Engine, incluido el procedimiento para números de Bernoulli y su distinción entre lo que una máquina puede ejecutar y el significado que atribuimos a sus símbolos.";
  }
  if (query.includes("turing") && (query.includes("maquina") || query.includes("universal") || query.includes("computabilidad"))) {
    return "La máquina de Turing es un modelo matemático, no un plano de CPU. La universalidad muestra que una máquina general puede simular máquinas descritas como datos; esa idea es fundamental para computabilidad, aunque no sea idéntica a una arquitectura de programa almacenado real.";
  }
  if (query.includes("shannon") || (query.includes("boole") && query.includes("rele"))) {
    return "Separa dos contribuciones relacionadas pero distintas: el uso del álgebra booleana para analizar circuitos de conmutación y la teoría matemática de la información. Una trata estructura lógica de circuitos; la otra cuantifica información, incertidumbre y comunicación.";
  }
  if (query.includes("von neumann") || query.includes("programa almacenado")) {
    return "El programa almacenado representa instrucciones y datos en memoria accesible a la máquina. ‘Arquitectura Von Neumann’ es una etiqueta útil, pero la historia fue colectiva; no debe convertirse en una afirmación de inventor único ni confundirse con la implementación interna de caches modernas.";
  }
  if (query.includes("transistor") && (query.includes("historia") || query.includes("1947") || query.includes("bell"))) {
    return "El transistor demostrado en Bell Labs en 1947 abrió una transición desde válvulas hacia dispositivos semiconductores más compactos y eficientes. No convirtió de inmediato todos los computadores: materiales, procesos de fabricación, circuitos integrados y MOS evolucionaron después.";
  }
  if ((query.includes("internet") || query.includes("arpanet")) && (query.includes("historia") || query.includes("1983") || query.includes("web"))) {
    return "ARPANET fue un antecedente crucial, pero Internet no es ARPANET renombrada. La arquitectura de internetworking y TCP/IP conectó redes heterogéneas; la migración de ARPANET a TCP/IP el 1 de enero de 1983 es un hito. Internet y la Web tampoco son sinónimos.";
  }
  if (query.includes("historia") && (query.includes("gpu") || query.includes("cloud") || query.includes("smartphone") || query.includes("ia"))) {
    return "En historia tecnológica evita una cronología teleológica. Explica qué restricciones cambiaron —densidad, ancho de banda, energía, conectividad, software, datos o coste— y cómo eso habilitó nuevas plataformas. Un producto famoso rara vez constituye por sí solo el origen único de una categoría.";
  }

  // Laboratorio de Sistemas Reales: prioriza el mecanismo concreto y la evidencia vertical.
  if ((query.includes("git") && (query.includes("pack") || query.includes("objeto") || query.includes("dag")))) {
    return "En Git separa modelo lógico y representación física: blobs/trees/commits/tags son objetos content-addressed; refs son nombres mutables. Los packfiles compactan objetos y pueden usar deltas, pero no crean un nuevo tipo lógico ni cambian el DAG de commits.";
  }
  if ((query.includes("linux") || query.includes("/proc") || query.includes("vfs")) && (query.includes("proceso") || query.includes("kernel") || query.includes("archivo") || query.includes("driver"))) {
    return "Traza Linux por fronteras: proceso/user space → syscall → subsistema kernel/VFS/MM → filesystem o driver → dispositivo. /proc es una interfaz del kernel a estado en ejecución, no un directorio persistente ordinario; page cache y DMA hacen que una E/S visible no equivalga a una operación física 1:1.";
  }
  if (query.includes("doom") && (query.includes("bsp") || query.includes("wad") || query.includes("fixed") || query.includes("renderer"))) {
    return "En Doom separa motor y datos: los WAD contienen lumps consumidos por el engine; el BSP organiza el espacio para el renderer y no es un z-buffer. Fixed point es una decisión numérica ligada a restricciones históricas, con trade-offs de rango/precisión.";
  }
  if (query.includes("godot") && (query.includes("scenetree") || query.includes("node") || query.includes("server") || query.includes("source"))) {
    return "Godot tiene capas: SceneTree/Nodes arriba y Servers de rendering/física/audio debajo. Usar APIs de Server puede evitar overhead del scene system en casos concretos, pero no garantiza mejora; perfila primero y baja de abstracción solo si la evidencia lo justifica.";
  }
  if (query.includes("blender") && (query.includes("mesh") || query.includes("modifier") || query.includes("cycles") || query.includes("python"))) {
    return "En Blender distingue datos base, evaluación y render. Una mesh almacenada puede transformarse por modifiers/depsgraph antes de render/export. Cycles puede usar CPU o backends GPU compatibles; la Python API automatiza gran parte del sistema, pero no vuelve todo el pipeline Python ni GPU.";
  }
  if (query.includes("ssd") && (query.includes("ftl") || query.includes("wear") || query.includes("nand") || query.includes("ecc"))) {
    return "Un SSD traduce LBAs del host a NAND física mediante su controller/FTL. NAND programa páginas y borra bloques mayores, por eso aparecen garbage collection y wear leveling. ECC corrige dentro de límites y las caches volátiles obligan a distinguir acknowledged de realmente persistido.";
  }
  if ((query.includes("internet") || query.includes("cdn")) && (query.includes("bgp") || query.includes("dns") || query.includes("tls") || query.includes("http") || query.includes("tcp"))) {
    return "Reconstruye Internet por capas y decisiones: enlace local → IP/routing → BGP entre AS → DNS para naming → transporte (TCP/QUIC) → TLS → HTTP → edge/origin. Ninguna capa sustituye a las otras, y BGP selecciona rutas por política/atributos, no simplemente por número de routers.";
  }
  if ((query.includes("llm") || query.includes("transformer") || query.includes("chatgpt")) && (query.includes("gpu") || query.includes("inference") || query.includes("training") || query.includes("quant"))) {
    return "Para un LLM separa representación y sistema: texto→tokens→embeddings→capas transformer; training actualiza parámetros, inference usa esos parámetros y KV cache para generar. Paralelismo y quantization cambian memoria/computación/comunicación, pero no garantizan speedup lineal ni preservación exacta de calidad.";
  }

  // Performance Engineering: estas reglas van antes del fallback genérico de profiling.
  if (query.includes("benchmark") || query.includes("microbenchmark") || query.includes("baseline")) {
    return "Un benchmark es un experimento: fija workload, entorno, warm-up, muestras y métrica antes de comparar. Cambiar varias variables a la vez rompe atribución; reporta dispersión/percentiles además de una cifra central y conserva guardrails de correctitud.";
  }
  if (query.includes("tail latency") || query.includes("p99") || query.includes("p95") || query.includes("percentil")) {
    return "Latencia es una distribución. p95/p99 son cuantiles, no promedios, y no puedes obtener el p99 global promediando p99 por host. En fan-out, el subresultado lento puede dominar; retries/hedging también añaden carga y deben presupuestarse.";
  }
  if (query.includes("memory bandwidth") || query.includes("ancho de banda de memoria") || query.includes("pointer chasing")) {
    return "Bandwidth y latency son límites distintos. Streams secuenciales pueden acercarse al techo de ancho de banda; pointer chasing introduce dependencias que suelen exponer latencia. Compara bytes útiles/s con tráfico real y techo medido, no solo con la especificación teórica de DRAM.";
  }
  if (query.includes("branchless") || query.includes("branch prediction") || query.includes("mispredict")) {
    return "Una branch misprediction descarta trabajo especulativo, pero convertir código a branchless no garantiza mejora: puede añadir instrucciones, presión de registros o dependencias. Mide branches y mispredictions normalizados con la misma distribución de datos y hardware.";
  }
  if ((query.includes("simd") || query.includes("vectoriz")) && (query.includes("rendimiento") || query.includes("performance") || query.includes("speedup"))) {
    return "SIMD width no es speedup. El beneficio depende de fracción vectorizable, memoria, dependencias, masking y overhead escalar. Verifica el código generado y mide throughput end-to-end; intrinsics no eliminan los límites del subsistema de memoria.";
  }
  if ((query.includes("gpu") || query.includes("cuda") || query.includes("compute shader")) && (query.includes("rendimiento") || query.includes("performance") || query.includes("aceler"))) {
    return "Al evaluar GPU incluye launch, transferencias, sincronización y preparación de datos. Un kernel 10× más rápido no vuelve 10× más rápida la aplicación: Amdahl y los costes host↔device siguen presentes.";
  }
  if (query.includes("throughput") || query.includes("saturacion") || query.includes("saturación")) {
    return "Throughput crece con carga hasta que aparece un recurso limitante; después, más concurrencia suele alimentar colas y empeorar latencia/error rate. Busca la curva carga→throughput→latencia y define capacidad útil bajo SLO, no solo el récord de operaciones/s.";
  }

  if (query.includes("perf") || query.includes("profiler") || query.includes("profiling") || query.includes("hotspot")) {
    return "Perfilar responde primero a '¿dónde se consume el recurso?'. Sampling estima hotspots estadísticamente; perf también puede usar eventos software/hardware expuestos por el kernel/PMU. Compara workloads equivalentes y normaliza: un contador bruto sin denominador es decoración científica.";
  }

  if (query.includes("dwarf") || query.includes("debug symbol") || query.includes("debug info") || query.includes("optimized out")) {
    return "DWARF puede describir líneas, tipos, scopes, ubicaciones variables y reglas de unwinding. Debug info no obliga a desactivar optimización: una variable puede cambiar de ubicación o desaparecer, y 'optimized out' puede ser la representación más honesta disponible.";
  }

  if (query.includes("debug sistem") || query.includes("debugging sistem") || query.includes("reproduc") || query.includes("heisenbug")) {
    return "Debugging sistemático = síntoma reproducible → hipótesis → experimento que discrimina → causa → regresión. Cambia una variable cada vez cuando puedas. Un sleep que hace desaparecer una carrera es evidencia de timing, no una reparación.";
  }

  if (query.includes("relocation") || query.includes("simbolo") || query.includes("symbol")) {
    return "Un símbolo identifica una entidad; una relocation describe un lugar y un cálculo que debe ajustarse cuando se conozca el layout. Resolver el nombre y aplicar el parche son pasos relacionados, no idénticos.";
  }

  if (query.includes("linker") || query.includes("linking") || query.includes("enlace") || query.includes("loader")) {
    return "Separa fases: el linker combina objetos/bibliotecas, resuelve símbolos y aplica relocations; el loader construye la imagen del proceso y participa en el linking dinámico cuando corresponda. Un compiler driver puede coordinar ambas herramientas sin convertirlas en una sola fase.";
  }

  if (query.includes("elf") || query.includes("pe/coff") || query.includes("portable executable")) {
    return "ELF y PE/COFF son formatos de objetos/imágenes, no ISAs. En ELF, sections sirven sobre todo a la vista de link y program headers/segments a la de carga; en PE distingue file offsets, RVA/VA y data directories.";
  }

  if (query.includes("lexer") || query.includes("token")) {
    return "El lexer convierte caracteres en tokens y spans; todavía no debería decidir si un nombre existe o si dos tipos son compatibles. Conserva kind, lexeme y ubicación: los diagnósticos del futuro te lo agradecerán.";
  }

  if (query.includes("parser") || query.includes("gramatica") || query.includes("grammar")) {
    return "El parser impone la estructura definida por la gramática. Precedencia y asociatividad deben quedar reflejadas en el árbol; left recursion solo es un problema para ciertos algoritmos, como recursive descent ingenuo, no una prohibición universal.";
  }

  if (query.includes("ast") || query.includes("type checking") || query.includes("scope") || query.includes("shadow")) {
    return "El AST conserva estructura semántica, no cada token. Después, name resolution vincula identificadores respetando scopes y shadowing; type checking valida operaciones y conversiones. Parsear bien no implica tipar bien.";
  }

  if (query.includes("ssa") || query.includes("llvm ir") || query.includes(" ir ") || query.endsWith("ir")) {
    return "Una IR es una capa interna del compilador. SSA hace explícitas definiciones y usos, pero sus valores no son registros físicos; register allocation ocurre más tarde. LLVM IR tiene semántica propia y no es simplemente una ISA de hardware portable.";
  }

  if (query.includes("jit") || query.includes("deopt") || query.includes("deoptim")) {
    return "Un JIT cambia tiempo de compilación por información del runtime. Puede perfilar caminos calientes, especializar con guards y deoptimizar si un supuesto falla. No implica automáticamente mejor rendimiento: warmup y coste de compilación cuentan.";
  }

  if (query.includes("isa") || query.includes("microarquitect")) {
    return "Separa el contrato de la implementación: la ISA define lo que el software puede observar y exigir; la microarquitectura decide cómo cumplirlo. Pipeline, predictor, cachés concretas o renombrado pueden cambiar sin cambiar la ISA.";
  }

  if (query.includes("von neumann") || query.includes("harvard")) {
    return "Pregunta siempre en qué nivel existe la separación. Puedes tener un espacio de direcciones unificado y, a la vez, L1 de instrucciones y datos separadas. Eso se describe mejor como una organización híbrida/Harvard modificada que como Harvard pura.";
  }

  if (query.includes("bus") || query.includes("mmio")) {
    return "El modelo dirección/datos/control es pedagógico. En sistemas reales puede haber protocolos transaccionales complejos. Además, una dirección no implica RAM: MMIO usa direcciones para acceder a registros de dispositivos.";
  }

  if (query.includes("fetch") || query.includes("decode") || query.includes("execute")) {
    return "Fetch-decode-execute describe qué debe ocurrir conceptualmente, no obliga a tres pasos físicos seriales. Una CPU moderna puede solapar, especular y ejecutar fuera de orden mientras preserve el estado arquitectónico permitido.";
  }

  if (query.includes("program counter") || query === "pc" || query.includes("stack pointer") || query === "sp") {
    return "PC representa el punto de ejecución arquitectónico; SP participa en la convención de pila. No asumas que ambos son GPR ordinarios en cualquier ISA ni que la pila es una memoria física separada.";
  }

  // Demoscene: historia, cultura y Future Crew.
  if (query.includes("future crew")) {
    return "Future Crew fue un demogroup finlandés clave de la PC scene. Para estudiarlo bien conviene mirar grupo, herramientas (como Scream Tracker), Unreal/Panic, su relación con Assembly y, por supuesto, Second Reality; reducirlo a una sola demo pierde el contexto que explica su impacto.";
  }
  if (query.includes("second reality")) {
    return "Second Reality es una demo de Future Crew asociada a Assembly 1993, donde quedó primera en la PC demo compo. Conviene analizarla como sistema audiovisual: secuencia de efectos 2D/3D, sincronización musical, transiciones, target hardware y código real; prestigio histórico no sustituye verificar cómo está implementada.";
  }
  if (query.includes("cracktro") || query.includes("crack intro") || query.includes("crackintro")) {
    return "Una crack intro/cracktro era una pequeña presentación vinculada históricamente a una release crackeada y servía como firma/promoción del grupo. Es parte de la genealogía de la demoscene, pero una demo o intro moderna no necesita cracking y ambos conceptos no son sinónimos.";
  }
  if (query.includes("scene.org") || query.includes("demozoo") || query.includes("pouet")) {
    return "Son recursos comunitarios con funciones distintas: scene.org destaca como archivo/distribución; Demozoo como catalogación y relaciones; Pouët combina catálogo con recepción/comentarios. Para fechas y puestos de una compo conviene además acudir al archivo de la party; comentario comunitario y metadata verificable no son lo mismo.";
  }
  if (query.includes("demoparty") || query.includes("demo party") || (query.includes("assembly") && (query.includes("party") || query.includes("compo") || query.includes("future crew")))) {
    return "Una demoparty es encuentro, estreno colectivo y competición. 'Assembly' aquí es la party finlandesa, no assembly language. Las compos tienen reglas y categorías concretas: un primer puesto es un dato histórico contextual, no una medida universal y eterna de calidad.";
  }
  if (query.includes("farbrausch") || query.includes("the product") || query.includes(".the .product")) {
    return "Farbrausch es central para entender el sizecoding procedural moderno. fr-08: .the .product mostró cómo una 64K podía reconstruir gran cantidad de contenido en runtime mediante generadores, síntesis y tooling. 64 KiB limita el ejecutable distribuido, no la RAM total que la intro puede usar al ejecutarse.";
  }
  if (query.includes("conspiracy") && (query.includes("64") || query.includes("demo") || query.includes("intro"))) {
    return "Conspiracy es otro referente de intros 64K y producción procedural. Compararlo con Farbrausch es útil, pero compartir categoría no implica compartir engine, toolchain o estética: hay que separar restricción común de implementación concreta.";
  }
  if (query.includes("black lotus") || query.includes("tbl") && query.includes("demo")) {
    return "The Black Lotus (TBL) está especialmente ligado a la tradición Amiga y muestra que una plataforma histórica puede seguir recibiendo producciones técnicamente ambiciosas mucho después de su ciclo comercial. Dirección, música y diseño importan tanto como el truco aislado.";
  }
  // Demoscene: efectos clásicos. Estas reglas van antes del fallback histórico
  // y antes de términos gráficos genéricos para preservar el contexto técnico.
  if (query.includes("plasma") && (query.includes("demo") || query.includes("efecto") || query === "plasma")) {
    return "Un plasma clásico genera un campo escalar combinando funciones periódicas de x, y, distancia y tiempo, y después mapea ese valor a una paleta. Campo y color son etapas separadas: cambiar la paleta no obliga a cambiar la función del plasma. LUTs/punto fijo fueron optimizaciones históricas, no requisitos matemáticos.";
  }
  if (query.includes("fire effect") || query.includes("efecto fuego") || (query.includes("fire") && query.includes("demo"))) {
    return "El fire effect clásico suele mantener un buffer escalar de intensidad, propagar/promediar valores desde vecinos y aplicar cooling antes de mapear a una paleta. Es una simulación visual de propagación/difusión, no una simulación físicamente correcta de combustión.";
  }
  if (query.includes("tunnel") && (query.includes("demo") || query.includes("polar") || query.includes("efecto"))) {
    return "El tunnel clásico puede derivarse con coordenadas polares: ángulo atan2(y,x) para envolver alrededor y un término radial como k/r para profundidad aparente. Cerca de r=0 debes tratar la singularidad. LUTs permiten precalcular angle/depth maps y animar con offsets.";
  }
  if (query.includes("starfield") || query.includes("campo de estrellas")) {
    return "Un starfield 3D simple mantiene estrellas x,y,z y proyecta con x/z,y/z. Al reducir z, la posición proyectada se aleja del centro y aparenta avance. z=0 no es válido; las estrellas que cruzan el near plane suelen reciclarse.";
  }
  if (query.includes("scroller") || query.includes("scrolltext")) {
    return "Un scroller desplaza glyphs o un buffer de texto respecto a un reloj. Expresar velocidad en px/s evita que cambie al variar FPS. El texto, el layout y deformaciones como ondas sinusoidales conviene mantenerlos separados.";
  }
  if (query.includes("copper effect") || (query.includes("copper") && (query.includes("amiga") || query.includes("raster")))) {
    return "En Amiga, el Copper puede esperar posiciones de raster y escribir registros, permitiendo cambios de estado dentro de un frame. Un shader moderno puede imitar la apariencia de bandas/gradientes, pero no reproduce por ello el mismo mecanismo ni timing de hardware.";
  }
  if (query.includes("rotozoom")) {
    return "Rotozoom combina rotación y escala de textura. El enfoque robusto suele ser inverse mapping: para cada píxel destino calculas la coordenada fuente, evitando huecos del forward mapping. Transformación y filtering son decisiones distintas.";
  }
  if (query.includes("metaball")) {
    return "Las metaballs suman campos implícitos dependientes de distancia y visualizan una isosuperficie/umbral. En 2D puedes colorear el campo directamente; en 3D puedes extraer o ray-marchear la superficie. No requieren una simulación de fluidos.";
  }
  if ((query.includes("water") || query.includes("agua")) && (query.includes("height") || query.includes("ripple") || query.includes("demo"))) {
    return "El water ripple clásico puede usar un height field discreto con dos estados temporales, propagación por vecinos y damping; luego su gradiente perturba UVs para simular refracción. Es una aproximación de ondas, no Navier–Stokes 3D.";
  }
  if (query.includes("feedback") && (query.includes("frame") || query.includes("visual") || query.includes("demo"))) {
    return "Feedback visual realimenta el frame anterior: I_t = new_t + α·T(I_{t-1}) conceptualmente. Rotación/escala/warp y decay generan trails; ping-pong buffers evitan leer/escribir ambiguamente la misma imagen cuando la API no lo permite.";
  }
  if (query.includes("palette cycling") || query.includes("ciclo de paleta")) {
    return "Palette cycling anima la función índice→color: los píxeles conservan sus índices y se rotan entradas de la CLUT/paleta. Así miles de píxeles pueden cambiar de apariencia sin reescribir el framebuffer indexado. Emularlo con shader moderno conserva la idea, no el hardware histórico.";
  }
  if (query.includes("mandelbrot") || query.includes("julia") || (query.includes("fractal") && query.includes("escape"))) {
    return "Mandelbrot itera z←z²+c desde z0=0; Julia fija c y varía z0. 'No escapó en N iteraciones' es una aproximación computacional, no una demostración exacta de pertenencia. El coloreado es una capa visual separada de la órbita.";
  }
  if (query.includes("voxel") && (query.includes("heightmap") || query.includes("landscape") || query.includes("terrain"))) {
    return "Voxel significa elemento volumétrico, pero muchos 'voxel landscapes' clásicos son realmente height fields 2.5D: una altura por x,z. Eso no representa cuevas arbitrarias. El renderer por columnas proyecta muestras del heightmap y usa oclusión para evitar dibujar terreno lejano oculto.";
  }
  if (query.includes("heightmap")) {
    return "Un heightmap almacena una sola altura h(x,z) por punto del dominio. Su valor no tiene unidades por sí mismo: necesitas escala horizontal/vertical. Diferencias finitas del campo permiten aproximar gradientes/normales para shading.";
  }
  if (query.includes("bump mapping") || query.includes("bump map")) {
    return "Bump mapping deriva una perturbación de normal desde un campo de altura y cambia shading sin mover necesariamente la geometría. Normal mapping almacena normalmente una normal; displacement sí puede alterar posición y silueta. Bump, normal y displacement no son sinónimos.";
  }
  // Raymarching / Shader Art: antes de sizecoding y del fallback general de demoscene.
  if (query.includes("sphere tracing")) return "Sphere tracing es un raymarch adaptativo que usa una distancia o bound conservador para avanzar. Su seguridad depende de no sobreestimar el espacio libre; una función implícita cualquiera no ofrece esa garantía.";
  if (query.includes("signed distance") || query.includes("sdf")) return "Una SDF ideal codifica distancia euclídea con signo a la superficie. No toda función implícita ni todo distance estimator es una SDF exacta; esta diferencia importa para normales, transforms y pasos seguros.";
  if (query.includes("domain repetition") || query.includes("repeticion de dominio") || query.includes("repetición de dominio")) return "Domain repetition remapea coordenadas a una celda canónica antes de evaluar una misma función. Produce repetición procedural sin almacenar una copia de mesh por celda, aunque introduce fronteras/discontinuidades que hay que tratar.";
  if (query.includes("soft shadow") && (query.includes("ray") || query.includes("sdf"))) return "En shader art SDF son comunes heurísticas de soft shadow que acumulan una cota durante el march hacia la luz. Pueden parecer penumbras, pero no equivalen automáticamente a integrar físicamente una luz de área.";
  if ((query.includes("ambient occlusion") || query.includes(" ao")) && (query.includes("sdf") || query.includes("raymarch"))) return "AO con SDF suele muestrear el campo a lo largo de la normal para estimar accesibilidad local. Es una aproximación geométrica y no reemplaza global illumination ni color bleeding.";
  if (query.includes("raymarch") || query.includes("ray march")) return "Raymarching es una familia de recorridos incrementales a lo largo de un rayo. Sphere tracing es un caso especializado que deriva el paso de una distancia/bound; volume marching y pasos fijos son otros casos.";
  if (query.includes("shader art")) return "Shader art suele integrar cámara, función de escena, traversal, normales, shading, sombras/AO, color y postprocesado en un programa procedural. Para depurarlo conviene conservar esas capas conceptualmente separadas aunque luego se minifique.";

  // Sizecoding: priorizar restricciones/tamaño antes del fallback general de demoscene.
  if (query.includes("256 byte") || query.includes("256-byte")) return "Una 256-byte intro optimiza el artefacto distribuido completo. El límite no implica 256 bytes de RAM: código, datos, bootstrap y supuestos del entorno compiten por el presupuesto definido por la compo/plataforma.";
  if (query.includes("1k intro") || query.includes("1 kb intro") || query.includes("1kb intro")) return "En 1K el overhead del ejecutable sigue siendo enorme proporcionalmente. La técnica clave es representar contenido con funciones/parámetros compactos y medir el binario final según las reglas exactas de la categoría.";
  if (query.includes("4k intro") || query.includes("4 kb intro") || query.includes("crinkler")) return "En 4K importan tanto tamaño como compresibilidad. Un compressing linker como Crinkler integra link/layout/compresión para ejecutables diminutos; un binario bruto menor no garantiza un 4K packed menor.";
  if (query.includes("64k intro") || query.includes("64 kb intro") || query.includes("kkrunchy") || query.includes("squishy")) return "Una 64K limita el ejecutable distribuido, no la RAM runtime. Toolchains de 64K suelen exportar un player mínimo con generadores, parámetros, synth y datos que un packer especializado comprime; editor y player final son artefactos distintos.";
  if (query.includes("code/data") || query.includes("code data dual") || query.includes("dual use")) return "Code/data dual use significa reutilizar una misma representación en varios papeles. Puede ahorrar bytes, pero aumenta acoplamiento y depende de permisos/alineación/ISA; W^X/NX modernos impiden asumir memoria RWX universal.";
  if (query.includes("shader minifier") || query.includes("shader compression") || query.includes("minificar shader")) return "Minificar un shader reduce/reescribe su representación fuente y puede mejorar compresibilidad; no garantiza más FPS. Tamaño de source, IR y coste de ejecución GPU son dimensiones diferentes.";
  if (query.includes("tiny synth") || query.includes("synth procedural") || query.includes("sintetizador procedural")) return "Un tiny synth reemplaza PCM distribuido por código DSP + eventos + parámetros y genera audio en startup o tiempo real. Ahorra almacenamiento a cambio de engine, CPU, memoria temporal y complejidad de authoring.";
  if ((query.includes("entrop") || query.includes("entropy")) && (query.includes("coding") || query.includes("compresi") || query.includes("size"))) return "Entropy coding asigna coste según probabilidades/modelo. H=-Σp log₂p es un límite medio bajo supuestos, no una promesa de que cada archivo individual mida exactamente H bits/símbolo; además hay overhead de modelo/decoder.";
  if (query.includes("binary size") || query.includes("tamaño binario")) return "Mide la etapa correcta: source, object, executable y packed executable pueden diferir mucho. En sizecoding headers, imports, alignment y runtime pesan proporcionalmente; optimiza primero los contributors dominantes del artefacto final.";
  if (query.includes("sizecoding") || query.includes("size coding")) return "Sizecoding diseña programas bajo un presupuesto extremo de bytes. La optimización importante suele ser representación + compresibilidad + arquitectura: tool grande offline, player mínimo, contenido procedural y métricas sobre el artefacto final.";
  if (query.includes("demoscene") || query.includes("demo scene")) {
    return "La demoscene es una cultura de producciones audiovisuales ejecutables y competición/colaboración técnica. Tiene raíces históricas conectadas con crack intros, pero evolucionó como práctica creativa autónoma. Para entender una producción mira plataforma, grupo, party/compo, restricciones, código, gráficos, música y dirección.";
  }

  if (query.includes("opcode") || query.includes("operando") || query.includes("inmediato")) {
    return "El mnemonic es texto de assembly; el opcode es parte de la codificación binaria. Los operandos pueden ser registros, inmediatos o memoria según el formato, y un inmediato tiene rango limitado porque ocupa bits de la instrucción.";
  }

  if (query.includes("load/store") || query.includes("direccion efectiva") || query.includes("direccionamiento")) {
    return "Calcula primero la dirección efectiva según la ISA; después recuerda que puede ser virtual y necesitar traducción. En un diseño load/store, la aritmética general trabaja en registros y loads/stores hacen el puente con memoria.";
  }

  if (query.includes("assembly") || query.includes("ensamblador") || query.includes("pseudoinstru")) {
    return "Separa tres capas: ISA = semántica arquitectónica; assembler = sintaxis y traducción textual; ABI = reglas de interoperabilidad. Una pseudoinstrucción puede expandirse antes de llegar a máquina, así que no todo mnemonic necesita un opcode propio.";
  }

  if (query.includes("calling convention") || query.includes("caller-saved") || query.includes("callee-saved") || query.includes("callee saved") || query.includes("caller saved")) {
    return "La calling convention reparte responsabilidades: paso de argumentos, retorno, registros caller/callee-saved, stack y alineación. Debes nombrar plataforma/ABI: System V AMD64, Windows x64, AAPCS64 y RISC-V psABI no son intercambiables.";
  }

  if (query.includes("syscall") || query.includes("ecall") || query.includes("svc")) {
    return "Una syscall no es una llamada C ordinaria. La ISA aporta un mecanismo de excepción/entrada privilegiada; el sistema operativo aporta números, registros y semántica del servicio. Un wrapper de libc puede ocultar esos detalles o hacer trabajo adicional.";
  }

  if (query.includes("stack frame") || query.includes("frame pointer") || query.includes("pila")) {
    return "La pila es una convención sobre memoria. El frame puede contener saves, locales y temporales, pero su layout depende del ABI y la optimización. No asumas frame pointer obligatorio ni copies reglas como la red zone entre ABI distintas.";
  }

  if (query.includes("desensambl") || query.includes("disassembl") || query.includes("gdb") || query.includes("lldb")) {
    return "El desensamblador interpreta bytes como instrucciones; el debugger añade estado dinámico. Código optimizado puede eliminar variables, inlinear funciones y reordenar cálculos, así que reconstruye dataflow/control-flow en vez de esperar una copia línea a línea del fuente.";
  }

  // Redes físicas: distinguir magnitud física, representación, canal y PHY.
  if (query.includes("shannon") || query.includes("snr") || query.includes("ruido")) {
    return "SNR_dB=10·log10(S/N) para razón de potencias. Shannon-Hartley usa S/N lineal: C=B·log₂(1+S/N) bajo un modelo AWGN idealizado. Es un límite de capacidad, no el throughput garantizado de un protocolo real.";
  }

  if (query.includes("baud") || query.includes("symbol rate") || query.includes("qam") || query.includes("modulacion")) {
    return "Symbol rate mide símbolos/s; bit rate depende de cuántos bits se etiquetan por símbolo y de coding/overheads. En M-QAM ideal con mapeo binario, log₂(M) bits etiquetan cada símbolo, pero payload throughput puede ser menor.";
  }

  if (query.includes("ancho de banda") || query.includes("bandwidth") || query.includes("propagacion") || query.includes("serializacion")) {
    return "Separa capacidad de latencia: serialización ≈ L/R y propagación ≈ d/v. Subir R reduce L/R, pero no cambia de forma comparable d/v en el mismo medio. Bandwidth físico y throughput útil tampoco son sinónimos.";
  }

  if (query.includes("line coding") || query.includes("scrambl") || query.includes("manchester") || query.includes("clock recovery")) {
    return "Line coding convierte datos en una secuencia física con propiedades de transición/espectro. Scrambling ayuda a estadísticas/DC/clock recovery pero no es cifrado. Manchester es un esquema concreto, no la codificación universal de Ethernet moderno.";
  }

  if (query.includes("reflex") || query.includes("impedancia") || query.includes("transmission line") || query.includes("cable")) {
    return "Cuando la interconexión es eléctricamente larga, usa modelo de línea: Γ=(ZL−Z0)/(ZL+Z0). Z0 es impedancia característica, no resistencia DC. Conectores, pérdidas y crosstalk hacen el canal real dependiente de frecuencia.";
  }

  if (query.includes("fibra") || query.includes("optica") || query.includes("dBm")) {
    return "En fibra, suma pérdidas y márgenes en dB; dBm es potencia absoluta referida a 1 mW. Monomodo elimina la dispersión modal intermodal, no toda dispersión. Potencia suficiente tampoco garantiza por sí sola BER objetivo.";
  }

  if (query.includes("radio") || query.includes("path loss") || query.includes("multipath") || query.includes("rssi")) {
    return "Radio requiere link budget y modelo de canal. Free-space path loss es un modelo ideal; indoor añade multipath, fading e interferencia. RSSI es potencia recibida/indicador, mientras SNR también depende del noise floor.";
  }

  if (query.includes("wi-fi") || query.includes("wifi") || query.includes("mcs") || query.includes("ofdm")) {
    return "En Wi‑Fi, PHY rate depende de ancho de canal, MCS, coding, guard interval y spatial streams, pero goodput es menor por preámbulos, contention, ACKs y retransmisiones. Un MCS mayor solo ayuda si el canal lo soporta.";
  }

  if (query.includes("ethernet fis") || query.includes("ethernet phy") || query.includes("base-t") || query.includes("autoneg")) {
    return "IEEE 802.3 separa MAC de múltiples PHY. El mismo tipo de frame puede cruzar cobre o fibra mediante señalizaciones distintas; Ethernet moderno full-duplex no depende del modelo clásico de colisiones/CSMA-CD para operar.";
  }

  if (query.includes("ber") || query.includes("eye diagram") || query.includes("jitter")) {
    return "BER=errores/bits observados bajo condiciones de prueba. Cero errores en una muestra finita no prueba BER matemática cero. Eye diagram y jitter describen margen físico, mientras packet loss puede originarse en capas superiores.";
  }

  // C profundo: separar reglas del lenguaje de ABI, compilador y hardware.
  if (query.includes("realloc") || query.includes("malloc") || query.includes("calloc") || query.includes("free")) {
    return "En memoria dinámica piensa en ownership y lifetime. `realloc` puede mover el bloque; usa un temporal si necesitas conservar el original en caso de fallo. Tras `free`, el antiguo puntero no vuelve a ser válido solo porque conserve el mismo patrón de bits.";
  }

  if (query.includes("volatile") || query.includes("restrict") || query.includes("const")) {
    return "Son contratos distintos: `const` limita modificaciones a través de ciertos accesos; `volatile` da semántica observable especial a accesos, pero no atomicidad; `restrict` promete condiciones de no-aliasing y puede tener consecuencias semánticas si se viola.";
  }

  if (query.includes("undefined") || query.includes(" ub") || query.startsWith("ub") || query.includes("implementation-defined") || query.includes("unspecified")) {
    return "En C, UB significa que el estándar no impone requisitos para esa ejecución. `implementation-defined` exige una elección documentada y `unspecified` permite varias opciones sin fijar/documentar una única. Signed overflow ordinario puede ser UB; unsigned usa aritmética modular.";
  }

  if (query.includes("alias") || query.includes("effective type") || query.includes("type punning")) {
    return "Un cast no vuelve válido cualquier acceso. Las reglas de aliasing/effective type limitan qué lvalues pueden acceder a un objeto; los character types tienen permiso especial para inspeccionar representación y `memcpy` suele ser la herramienta correcta para trasladar bytes sin dereferenciar tipos incompatibles.";
  }

  if (query.includes("array") || query.includes("one-past") || query.includes("pointer arithmetic") || query.includes("puntero")) {
    return "Array y puntero no son el mismo tipo. En muchos contextos una expresión array decae a puntero al primer elemento. La aritmética `p+n` avanza n elementos y solo está definida dentro del mismo array (incluido one-past); el puntero one-past puede formarse, pero no dereferenciarse.";
  }

  if (query.includes("padding") || query.includes("alignment") || query.includes("alineacion") || query.includes("struct") || query.includes("union")) {
    return "En un `struct` se conserva el orden de miembros, pero puede haber padding interno y final para satisfacer alignment. Por eso `sizeof(struct)` puede superar la suma de miembros. No serialices el struct crudo si necesitas un formato portable.";
  }

  if (query.includes("lifetime") || query.includes("storage duration") || query.includes("scope") || query.includes("dangling")) {
    return "Scope dice dónde es visible un nombre; storage duration cuánto dura el almacenamiento; lifetime cuándo existe válidamente el objeto. Un puntero puede seguir en scope después de que el objeto apuntado haya muerto: ahí nace el dangling pointer.";
  }

  if (query.includes("allocator") || query.includes("fragmentacion") || query.includes("fragmentación") || query.includes("free list") || query.includes("coalesc")) {
    return "Un allocator administra bloques y metadatos. Fragmentación interna es espacio desperdiciado dentro de una asignación; externa son huecos libres dispersos. Split, coalescing, bins y arenas tienen trade-offs; el proyecto educativo debe comprobar alignment, overflow, límites e invariantes tras cada operación.";
  }

  if (query.includes("macro") || query.includes("preproces") || query.includes("#define")) {
    return "Una macro reescribe tokens; no es una función. Si un parámetro aparece dos veces, un argumento como `i++` puede evaluarse dos veces. Parentetiza expresiones y prefiere funciones inline cuando necesites semántica de función y tipos.";
  }

  if (query.includes("callback") || query.includes("function pointer") || query.includes("puntero a funcion")) {
    return "Un function pointer introduce indirección de control con un tipo de función concreto. Un callback debe invocarse mediante un tipo compatible y cualquier contexto asociado debe seguir vivo cuando se llame; un cast no convierte una firma incompatible en portable.";
  }

  // Ethernet y LAN: distinguir tablas, dominios y mecanismos de capa 2.
  if (query.includes("ethernet frame") || query.includes("trama ethernet") || query.includes("ethertype") || query.includes("fcs")) {
    return "Una trama Ethernet es una unidad MAC: destination/source MAC, tipo/longitud según formato, payload/padding y FCS. El FCS detecta errores accidentales de trama, no autentica al emisor ni sustituye las validaciones de IP/TCP/aplicación.";
  }

  if (query.includes("mac address") || query.includes("direccion mac") || query.includes("dirección mac") || query.includes("broadcast mac")) {
    return "Una MAC de 48 bits puede ser unicast, multicast o broadcast y puede ser universal o localmente administrada. Sirve para forwarding L2; no es una identidad criptográfica ni tiene por qué ser inmutable. FF:FF:FF:FF:FF:FF es broadcast Ethernet.";
  }

  if (query.includes("fdb") || query.includes("learning table") || query.includes("tabla mac") || query.includes("source learning")) {
    return "Un bridge aprende normalmente source MAC→puerto/contexto al recibir frames. La FDB responde '¿por qué puerto alcanzo esta MAC?', mientras ARP/neighbor cache responde '¿qué MAC corresponde a este next hop IPv4?'. No son la misma tabla.";
  }

  if (query.includes("unknown unicast") || query.includes("flooding") || query.includes("flood")) {
    return "Flooding es una acción del bridge; broadcast es una clase de dirección destino. Unknown unicast conserva una MAC unicast pero, al no haber entrada FDB, suele replicarse por puertos elegibles dentro del dominio/VLAN.";
  }

  if (query.includes("vlan") || query.includes("802.1q") || query.includes("tagged") || query.includes("untagged") || query.includes("trunk")) {
    return "Una VLAN segmenta dominios de bridging L2. IEEE 802.1Q permite transportar contexto VLAN mediante tags; tagged/untagged depende del tratamiento de ingreso/egreso. VLAN ID no es subnet ID y comunicar IP entre VLANs requiere una función L3.";
  }

  if (query.includes("arp") || query.includes("address resolution")) {
    return "ARP conecta routing y enlace: primero la tabla de rutas elige el next hop IPv4; después ARP/neighbor cache resuelve su dirección MAC local. Para un servidor remoto normalmente resuelves la MAC del gateway, no la del servidor a través de Internet.";
  }

  if (query.includes("spanning tree") || query.includes("stp") || query.includes("rstp") || query.includes("mac flapping")) {
    return "STP/RSTP evita loops de bridging seleccionando una topología activa sin ciclos sobre enlaces redundantes. Un puerto puede quedar fuera de forwarding sin link down físico. Los loops L2 pueden causar flooding repetido y MAC flapping; no dependen de colisiones half-duplex.";
  }

  if (query.includes("mtu") || query.includes("jumbo") || query.includes("mss")) {
    return "MTU es un límite de la unidad de capa superior que un enlace acepta, no el tamaño total on-wire. Ethernet/IP usa habitualmente MTU 1500; TCP/IPv4 sin opciones da MSS típico 1460. Path MTU puede ser menor y 'jumbo' no tiene un tamaño único universal.";
  }

  if (query.includes("collision domain") || query.includes("broadcast domain") || query.includes("csma/cd") || query.includes("csma cd")) {
    return "Broadcast domain y collision domain son conceptos distintos. Una VLAN delimita broadcast L2; Ethernet full-duplex conmutado no usa CSMA/CD para operación normal. Un switch puede separar colisiones por puerto y seguir propagando broadcasts dentro de la VLAN.";
  }


  // Internet Protocol: separar direccionamiento, forwarding, control y configuración.
  if (query.includes("ipv4") || query.includes("direccion ip") || query.includes("dirección ip") || query.includes("subnet") || query.includes("subred") || query.includes("mascara") || query.includes("máscara") || query.includes("cidr")) {
    return "IPv4 usa 32 bits y CIDR expresa prefijos como /n. La red se obtiene fijando los n bits iniciales; un /n cubre 2^(32-n) direcciones. En routing moderno no debes deducir la máscara por clases A/B/C: el prefijo explícito manda.";
  }

  if (query.includes("ipv6") || query.includes("::") || query.includes("link-local")) {
    return "IPv6 usa 128 bits, no tiene broadcast y mantiene unicast/multicast/anycast. La notación permite omitir ceros iniciales y usar `::` una sola vez. /64 es muy común en LAN de hosts, pero el forwarding IPv6 admite otras longitudes de prefijo según el caso.";
  }

  if (query.includes("longest prefix") || query.includes("lpm") || query.includes("routing table") || query.includes("tabla de rutas") || query.includes("default route") || query.includes("gateway") || query.includes("next hop")) {
    return "Routing selecciona primero la ruta más específica (longest-prefix match). Una ruta /0 es solo el último recurso. Después se resuelve el next hop local con ARP en IPv4 o ND en IPv6; el gateway no tiene por qué ser el destino final.";
  }

  if (query.includes("ttl") || query.includes("hop limit") || query.includes("traceroute")) {
    return "IPv4 TTL e IPv6 Hop Limit se consumen al forwardear por routers. En la práctica TTL funciona como contador de saltos, no como segundos exactos. Al expirar, el paquete se descarta y puede aparecer ICMP Time Exceeded; traceroute explota precisamente ese comportamiento.";
  }

  if (query.includes("icmp") || query.includes("ping") || query.includes("time exceeded") || query.includes("destination unreachable")) {
    return "ICMP no es sinónimo de ping. Echo Request/Reply es solo una familia; también hay errores como Time Exceeded y Destination Unreachable. ICMPv6 además soporta funciones esenciales de IPv6, así que bloquearlo indiscriminadamente puede romper la red.";
  }

  if (query.includes("fragment") || query.includes("pmtu") || query.includes("path mtu") || query.includes("packet too big") || query.includes("df=")) {
    return "IPv4 puede fragmentarse en tránsito cuando las reglas y DF lo permiten; IPv6 routers no fragmentan. En IPv6, si hace falta fragmentación la realiza el origen. Path MTU Discovery usa feedback ICMP para adaptar tamaño; filtrar ese feedback puede crear black holes de MTU.";
  }

  if (query.includes("nat") || query.includes("napt") || query.includes("pat") || query.includes("rfc1918")) {
    return "NAT traduce direcciones; NAPT/PAT suele traducir también puertos y mantener estado por flujo. Puede dificultar conexiones entrantes espontáneas, pero no es un sustituto conceptual de un firewall, no cifra tráfico y no es requisito de IPv6.";
  }

  if (query.includes("dhcp") || query.includes("dora") || query.includes("lease") || query.includes("dhcp relay")) {
    return "DHCPv4 entrega configuración como dirección, máscara/prefijo, router y DNS. DORA resume Discover→Offer→Request→ACK para adquisición inicial, pero hay más estados. Un relay permite centralizar servidores fuera del broadcast domain; DHCP configura, no reenvía tus paquetes.";
  }

  if (query.includes("neighbor discovery") || query.includes("neighbor solicitation") || query.includes("neighbor advertisement") || query.includes("router advertisement") || query.includes("router solicitation") || query.includes("ndp")) {
    return "IPv6 Neighbor Discovery usa ICMPv6. Incluye resolución de vecinos (NS/NA), descubrimiento de routers (RS/RA) y reachability. Es más amplio que 'ARP para IPv6'; la neighbor cache y la routing table siguen siendo estructuras conceptualmente distintas.";
  }

  // Routing global: separar control plane, política comercial, selección de
  // servicio y dataplane. Compartir BGP no vuelve equivalentes estos niveles.
  if (query.includes("autonomous system") || query.includes("sistema autonomo") || query.includes("sistema autónomo") || query.includes("asn")) {
    return "Un AS es un dominio de routing/política identificado externamente por ASN. ASN no significa router, empresa o ubicación física uno-a-uno. AS_PATH trabaja a nivel de AS y no describe cada router/cable del camino.";
  }

  if ((query.includes("bgp") || query.includes("as_path") || query.includes("as path") || query.includes("ebgp") || query.includes("ibgp"))
      && !query.includes("rpki") && !query.includes("roa") && !query.includes("route leak") && !query.includes("hijack")) {
    return "BGP intercambia reachability y atributos entre peers sobre sesiones. eBGP conecta normalmente AS distintos e iBGP distribuye rutas BGP dentro de un AS. No elige simplemente el AS_PATH más corto: la política local y otros atributos pueden decidir antes.";
  }

  if (query.includes("local_pref") || query.includes("local pref") || query.includes("med") || query.includes("community") || query.includes("communities")) {
    return "Los atributos BGP tienen alcances distintos: LOCAL_PREF expresa preferencia interna; MED sugiere una entrada al vecino; communities etiquetan rutas para política. Ninguno significa 'ruta físicamente más corta' y MED no obliga al vecino a obedecer.";
  }

  if (query.includes("peering") || query.includes("transit") || query.includes("provider") || query.includes("customer")) {
    return "Peering y transit son relaciones administrativas con políticas diferentes. Un patrón común exporta rutas de clientes ampliamente, pero no rutas de peer/provider hacia otro peer/provider, para evitar regalar transit. Es política operacional, no una ley matemática codificada por BGP.";
  }

  if (query.includes("ixp") || query.includes("route server") || query.includes("route-server")) {
    return "Un IXP facilita interconexión entre redes. Un route server puede simplificar el control plane multilateral aprendiendo y redistribuyendo rutas sin convertirse necesariamente en el next hop de datos. Conectarte al IXP no significa automáticamente peer/transit con todos.";
  }

  if (query.includes("rpki") || query.includes("roa") || query.includes("rov") || query.includes("route leak") || query.includes("hijack")) {
    return "RPKI Route Origin Validation comprueba si un origin AS está autorizado para un prefijo y longitud según ROAs. No cifra tráfico ni valida por sí solo todo AS_PATH. Un route leak es un problema de propagación/política y no es exactamente lo mismo que un hijack de origen.";
  }

  if (query.includes("anycast")) {
    return "Anycast anuncia la misma reachability desde múltiples ubicaciones. El routing elige una instancia según topología y política; no garantiza la menor distancia geográfica ni la menor RTT. Un cambio de ruta también puede mover nuevos paquetes a otra instancia, por lo que el estado de aplicación requiere diseño aparte.";
  }

  if (query.includes("cdn") || query.includes("edge") || query.includes("cache hit") || query.includes("cache miss")) {
    return "En una CDN separa request routing, edge selection y cache state. Puedes llegar al POP correcto y tener cache miss; anycast o DNS son técnicas posibles de selección, no definiciones de CDN. El origin path también puede dominar la latencia.";
  }

  if (query.includes("ecmp") || query.includes("load balanc") || query.includes("balanceador") || query.includes("consistent hash")) {
    return "ECMP distribuye entre next hops equivalentes, normalmente con hashing por flujo para limitar reordering. Eso no garantiza 50/50 de bytes. Un balanceador L4 y uno L7 operan con información distinta; health, afinidad y reparto uniforme son objetivos separados.";
  }

  if (query.includes("backbone") || query.includes("leaf-spine") || query.includes("leaf spine") || query.includes("clos") || query.includes("pop")) {
    return "Un backbone conecta POPs/regiones de una red; no es todo Internet. En data centers, fabrics Clos/leaf-spine ofrecen múltiples caminos, pero la redundancia real depende de failure domains físicos y operativos: dos enlaces por el mismo conducto siguen compartiendo excavadora.";
  }

  // Seguridad web: priorizar la causa raíz y la defensa. Estas respuestas se
  // evalúan antes de las reglas HTTP/cookies genéricas para evitar colisiones.
  if (query.includes("same-origin") || query.includes("same origin") || query.includes("sop") || query.includes("same-site") || query.includes("same site")) {
    return "Same-Origin Policy y same-site no son sinónimos. Origin se basa en scheme+host+port y gobierna gran parte del aislamiento DOM/fetch; site se usa en otros mecanismos como SameSite. SOP no sustituye autorización del servidor ni bloquea toda interacción cross-origin.";
  }
  if (query.includes("cors") || query.includes("preflight") || query.includes("access-control-allow-origin")) {
    return "CORS es una política del navegador para permitir lectura/uso cross-origin; no autentica ni autoriza objetos. Un preflight consulta permisos para cierta request. Si usas credenciales, controla orígenes explícitamente y sigue aplicando authn/authz/CSRF en backend.";
  }
  if (query.includes("session fixation") || query.includes("fijacion de sesion") || query.includes("rotar sesion") || query.includes("rotar sesión")) {
    return "Una sesión debe tratarse como credencial bearer cuando su posesión basta para actuar. Rota el identificador al autenticar o elevar privilegios, define expiración/revocación y protege recovery/step-up; borrar una cookie cliente no garantiza revocación server-side.";
  }
  if (query.includes("sql injection") || query.includes("sqli") || query.includes("prepared statement") || query.includes("consulta parametr")) {
    return "La defensa principal contra SQLi es separar gramática SQL y datos: prepared statements/parámetros para valores. Identificadores dinámicos como nombres de columna suelen requerir mapping/allowlist estructural. Escapar strings manualmente y mínimo privilegio son secundarios, no sustitutos.";
  }
  if (query.includes("command injection") || query.includes("inyeccion de comandos") || query.includes("inyección de comandos") || query.includes("shell injection")) {
    return "Evita el shell cuando puedas: usa APIs o ejecuta programa+argv por separado y valida operaciones/recursos por allowlist. Incluso sin shell, el programa destino puede interpretar opciones; autorización y mínimo privilegio siguen siendo necesarios.";
  }
  if (query.includes("xss") || query.includes("cross-site scripting") || query.includes("cross site scripting") || query.includes("innerhtml") || query.includes("textcontent")) {
    return "XSS es una transición datos→código en un contexto del navegador. El encoding debe ser contextual; textContent es apropiado para texto, mientras innerHTML parsea markup. Usa auto-escaping/sinks seguros y sanitización solo cuando necesitas HTML. CSP es defensa en profundidad.";
  }
  if (query.includes("csrf") || query.includes("anti-csrf") || query.includes("anti csrf") || query.includes("cross-site request forgery")) {
    return "CSRF explota credenciales ambientales que el navegador adjunta a una acción no pretendida. Protege cambios de estado con mecanismo del framework/tokens, SameSite y validación de Origin según arquitectura. Autenticación por cookie no demuestra intención, y XSS puede debilitar defensas CSRF.";
  }
  if (query.includes("ssrf") || query.includes("server-side request forgery") || query.includes("server side request forgery")) {
    return "SSRF convierte al backend en un deputy de red. Valida destinos con parser y política semántica, controla redirects/resolución, limita protocolos y aplica egress filtering/segmentación. Bloquear substrings como 127.0.0.1 no cubre representaciones, DNS ni redirects.";
  }
  if (query.includes("path traversal") || query.includes("file inclusion") || query.includes("file upload") || query.includes("upload")) {
    return "No conviertas nombres externos en paths de confianza. Usa IDs internos, raíces controladas y APIs seguras; considera canonicalización/symlinks. Para uploads valida límites/contenido según caso, genera nombre interno, almacena fuera de zonas ejecutables y sirve con autorización/headers adecuados.";
  }
  if (query.includes("idor") || query.includes("bola") || query.includes("object level authorization") || query.includes("autorizacion por objeto") || query.includes("autorización por objeto")) {
    return "IDOR/BOLA es un fallo de autorización: el ID responde qué objeto, no si el principal puede actuar sobre él. UUIDs dificultan enumeración pero no sustituyen checks por objeto/acción/tenant en cada endpoint relevante.";
  }
  if (query.includes("xxe") || query.includes("external entity") || query.includes("deserializ")) {
    return "Reduce capacidades del parser: si XML no necesita DTD/entidades externas, desactívalas; valida tamaño/esquema. Evita deserialización de tipos arbitrarios desde input no confiable y mapea a DTOs/allowlists. Firmar datos no convierte un gadget peligroso en seguro.";
  }
  if ((query.includes("race") || query.includes("carrera")) && (query.includes("web") || query.includes("request") || query.includes("coupon") || query.includes("saldo") || query.includes("idempot"))) {
    return "Las races web aparecen cuando operaciones válidas individualmente violan una invariante al intercalarse. Protege check+update con transacciones/constraints/CAS/locks según el caso; una idempotency key ayuda a deduplicar reintentos pero no arregla toda concurrencia.";
  }
  if (query.includes("jwt") || query.includes("json web token") || query.includes("audience") && query.includes("token")) {
    return "JWT es un formato de claims, no cifrado por defecto. Fija algoritmos permitidos por política, verifica criptografía y valida iss/aud/exp/nbf y claims requeridos. Separa tipos/contextos (ID token, access token, etc.) para evitar cross-JWT confusion.";
  }
  if (query.includes("oauth") || query.includes("pkce") || query.includes("authorization code") || query.includes("redirect_uri")) {
    return "OAuth 2.0 delega autorización; OIDC añade autenticación/identidad. La BCP moderna (RFC 9700) favorece Authorization Code + PKCE, redirect URIs estrictas y defensas contra mix-up/leakage. El resource server valida issuer/audience/scope del access token.";
  }
  if (query.includes("port swigger") || query.includes("portswigger") || query.includes("natas") || query.includes("picocft") || query.includes("picoctf") || query.includes("overthewire") || query.includes("web security academy")) {
    return "Practica técnicas ofensivas solo en labs/CTFs propios o explícitamente autorizados. Formula hipótesis, usa la mínima prueba necesaria, documenta causa raíz y después verifica la mitigación con tests positivos y negativos; coleccionar payloads no sustituye comprender la frontera rota.";
  }

  // Protocolos de aplicación: semántica, framing, estado e intermediación son
  // responsabilidades distintas aunque compartan TCP, UDP o QUIC.
  if (query.includes("dns") || query.includes("cname") || query.includes("rrset") || query.includes("ttl dns") || query.includes("nxdomain")) {
    return "DNS es un namespace distribuido por delegaciones. Separa dominio, zona, servidor autoritativo y resolver recursivo. Un CNAME apunta a otro nombre; TTL limita reutilización de caché pero no sincroniza todas las cachés del mundo. DNS puede usar UDP o TCP y transportes cifrados posteriores.";
  }

  if (query.includes("http/3") || query.includes("http3") || query.includes("qpack")) {
    return "HTTP/3 conserva la semántica HTTP y la mapea sobre QUIC. Requests/responses usan streams QUIC y QPACK comprime fields. Reduce el head-of-line de transporte entre streams respecto a HTTP/2 sobre TCP, pero no elimina todo bloqueo posible ni convierte UDP en la semántica de HTTP.";
  }

  if (query.includes("http/2") || query.includes("http2") || query.includes("hpack")) {
    return "HTTP/2 multiplexa frames binarios de múltiples streams dentro de una conexión y HPACK comprime fields. Los streams no son conexiones TCP separadas. Como todos comparten el mismo byte stream TCP, una pérdida puede seguir causando head-of-line de transporte entre streams.";
  }

  if (query.includes("http/1.1") || query.includes("http1") || query.includes("content-length") || query.includes("transfer-encoding") || query.includes("request smuggling")) {
    return "HTTP/1.1 necesita framing explícito sobre TCP: start-line, fields y reglas precisas para content length/transfer coding. TCP no entrega una request por read(). Si dos intermediarios discrepan sobre dónde termina un mensaje, aparece parsing diferencial y pueden surgir vulnerabilidades como request smuggling.";
  }

  if (query.includes("etag") || query.includes("cache-control") || query.includes("vary") || query.includes("304") || query.includes("cache http")) {
    return "En caché HTTP separa almacenabilidad, freshness y validación. ETag/Last-Modified son validators; If-None-Match puede producir 304. Cache-Control: no-cache no significa universalmente no-store, y Vary puede hacer que la misma URI tenga variantes de caché distintas.";
  }

  if (query.includes("cookie") || query.includes("session") || query.includes("httponly") || query.includes("samesite")) {
    return "Cookie y sesión no son sinónimos. El browser almacena/envía cookies según scope y atributos; el servidor decide qué significa su valor. Secure, HttpOnly y SameSite mitigan problemas distintos. HttpOnly limita acceso desde script, pero el browser puede seguir enviando la cookie en requests.";
  }

  if (query.includes("reverse proxy") || query.includes("forward proxy") || query.includes("x-forwarded") || query.includes("forwarded") || query.includes("connect method")) {
    return "Un forward proxy actúa del lado cliente; un reverse proxy/gateway forma parte de la infraestructura del servicio. Headers de forwarding solo son confiables dentro de una cadena de proxies que los sanea y reconstruye; aceptar X-Forwarded-For directo de Internet como identidad es regalarle el bolígrafo al atacante.";
  }

  if (query.includes("smtp") || query.includes("imap") || query.includes("mx") || query.includes("mail from") || query.includes("rcpt to")) {
    return "SMTP transporta correo usando un envelope (MAIL FROM/RCPT TO) separado de los headers From/To del mensaje. MX ayuda a elegir mail exchangers. IMAP sirve para acceso/sincronización de mailbox; no reemplaza SMTP como transporte de salida/relay.";
  }

  if (query.includes("sftp") || query.includes("ftps") || query.includes("ftp") || query.includes("ssh") || query.includes("host key")) {
    return "FTP clásico separa control y datos. SSH construye un transporte seguro y multiplexa canales; SFTP es un protocolo de archivos sobre SSH, mientras FTPS es FTP protegido con TLS. Desactivar host-key verification no es una solución de seguridad, es una forma elegante de borrar la autenticación del servidor.";
  }

  if (query.includes("websocket") || query.includes("web socket") || query.includes("sec-websocket") || query.includes("ping pong")) {
    return "WebSocket tiene framing propio tras su handshake: frames de datos/control, fragmentación, Close/Ping/Pong y masking cliente→servidor. Un frame no tiene por qué equivaler a un mensaje completo ni a un segmento TCP, y masking no proporciona confidencialidad como TLS.";
  }

  if ((query.includes("http") || query.includes("uri") || query.includes("url")) && (query.includes("idempot") || query.includes("safe") || query.includes("metodo") || query.includes("método") || query.includes("status"))) {
    return "La semántica HTTP es común a HTTP/1.1, HTTP/2 y HTTP/3. Safe describe intención de lectura; idempotent describe el efecto previsto de repetir la misma request, no que cada respuesta/log sea idéntico. URI identifica un recurso; una representación es una vista transferida de ese recurso.";
  }

  // Transporte: separar endpoint/API, semántica de entrega, control de flujo,
  // congestión y recovery. Las palabras "ventana" y "ACK" no significan una
  // única cosa en todas las capas.
  if (query.includes("puerto") || query.includes("socket") || query.includes("4-tupla") || query.includes("4 tupla") || query.includes("5-tupla") || query.includes("5 tupla")) {
    return "Un puerto es solo parte del endpoint de transporte. Una conexión TCP establecida se distingue normalmente por IP/puerto local + IP/puerto remoto (y protocolo). El listener puede compartir su puerto local con muchas conexiones aceptadas; socket además es un objeto/handle del SO, no un paquete que viaje por la red.";
  }

  if (query.includes("udp") && !query.includes("quic")) {
    return "UDP preserva datagramas y aporta puertos/checksum, pero no handshake, ordering fiable, retransmisión ni congestion control inherente. Eso no significa que una aplicación pueda ignorar congestión: el protocolo superior debe aportar las garantías que necesite.";
  }

  if ((query.includes("tcp") || query.includes("stream") || query.includes("byte stream")) && (query.includes("write") || query.includes("read") || query.includes("mensaje") || query.includes("framing"))) {
    return "TCP entrega un stream ordenado de bytes, no mensajes. Las fronteras de write()/send() no tienen que coincidir con segmentos ni con read()/recv(). Si tu protocolo tiene mensajes, define framing explícito (longitud, delimitador, TLV...) y soporta partial I/O.";
  }

  if (query.includes("three-way") || query.includes("three way") || query.includes("handshake tcp") || query.includes("syn-ack") || query.includes("syn ack")) {
    return "El three-way handshake sincroniza números iniciales de secuencia y confirma estado bidireccional: SYN x → SYN+ACK y, ack x+1 → ACK y+1. SYN consume una posición de sequence space. Completarlo no autentica criptográficamente al peer; eso es otra capa, por ejemplo TLS.";
  }

  if (query.includes("sequence") || query.includes("numero de secuencia") || query.includes("número de secuencia") || query.includes("ack acumul") || query.includes("sack")) {
    return "TCP numera bytes. Un ACK ordinario indica el siguiente byte contiguo esperado y reconoce acumulativamente lo anterior. Si existe un hueco, el ACK puede no avanzar aunque hayan llegado bytes posteriores; SACK puede describir bloques fuera de orden. ACK de TCP tampoco significa que la aplicación remota ya haya procesado esos bytes.";
  }

  if (query.includes("rto") || query.includes("retransmi") || (query.includes("rtt") && !query.includes("bgp"))) {
    return "RTT es ida y vuelta; no garantiza one-way delay=RTT/2. El temporizador de retransmisión debe adaptarse al RTT y su variación para evitar tanto recovery lento como retransmisiones espurias. La red no avisa de cada pérdida: TCP infiere falta de progreso usando ACKs, temporizadores y recovery.";
  }

  if (query.includes("rwnd") || query.includes("receive window") || query.includes("flow control") || query.includes("zero window")) {
    return "rwnd es flow control: protege la capacidad de recepción del peer. cwnd es congestion control: limita lo que el emisor pone en la red. El envío efectivo queda limitado por ambas (y otros factores). Zero window describe falta de espacio anunciado por el receptor, no demuestra congestión del path.";
  }

  if (query.includes("cwnd") || query.includes("congestion control") || query.includes("bdp") || query.includes("bandwidth-delay") || query.includes("bandwidth delay")) {
    return "cwnd limita datos en vuelo por congestión. Para un modelo simple, BDP≈bandwidth×RTT indica cuánto dato puede necesitarse en vuelo para llenar el path; no garantiza throughput. Separa cwnd de rwnd y no conviertas Reno/CUBIC/BBR en 'la definición' de TCP: son algoritmos con estrategias distintas.";
  }

  if (query.includes("slow start") || query.includes("fast retransmit") || query.includes("fast recovery") || query.includes("congestion avoidance")) {
    return "En el modelo Reno-like, slow start abre cwnd rápidamente según llegan ACKs y congestion avoidance crece de forma más conservadora. Fast retransmit/recovery y un RTO expiry parten de señales diferentes y no deben tratarse como el mismo evento. Las constantes exactas e Initial Window han evolucionado; evita memorizarlas como eternas.";
  }

  if (query.includes("time_wait") || query.includes("time wait") || query.includes("half-close") || query.includes("half close") || query.includes("fin") || query.includes("rst")) {
    return "TCP es full-duplex: FIN cierra ordenadamente una dirección y consume sequence space; el otro sentido puede seguir abierto (half-close). RST es abortivo/no equivalente a FIN. TIME_WAIT protege frente a segmentos retrasados y permite manejar el ACK final; eliminarlo indiscriminadamente rompe supuestos del protocolo.";
  }

  if (query.includes("quic") || query.includes("http/3") || query.includes("http3")) {
    return "QUIC es transporte seguro sobre UDP: añade conexiones, streams, flow control, loss recovery, congestion control y TLS integrado. Packet number y stream offset son contadores distintos. La pérdida de un stream no tiene por qué bloquear la entrega ordenada de otros streams, aunque todos compartan recursos y congestión de la conexión/path.";
  }


  // Explotación binaria: respuestas defensivas por primitive y mitigación.
  if (query.includes("stack smashing") || query.includes("buffer overflow") || query.includes("stack overflow")) {
    return "Primero caracteriza la escritura: objeto, bounds, offset y bytes controlados. Stack protector puede detectar ciertas corrupciones del frame, pero no evita la escritura ni cubre heap/non-control data. La corrección primaria es el bounds/lifetime bug.";
  }
  if (query.includes("nx") || query.includes("w^x") || query.includes("shellcode")) {
    return "NX/W^X separa datos writable de código executable. Bloquear ejecución desde una página de datos dificulta code injection, pero no corrige la corrupción ni impide por sí solo code-reuse. En el curso tratamos shellcode como concepto, no como payload operativo.";
  }
  if (query.includes("aslr") || query.includes(" pie") || query.startsWith("pie ")) {
    return "ASLR randomiza layouts compatibles; PIE permite que el main executable también sea relocatable. Son mitigaciones relacionadas pero distintas. Una info leak puede degradar la incertidumbre de direcciones, por eso disclosure y corruption se analizan juntas.";
  }
  if (query.includes("canary") || query.includes("stack protector")) {
    return "Un canary es un guard comprobado por instrumentación en determinadas funciones. Puede convertir ciertos overflows que lo atraviesan en un abort, pero no protege toda memoria ni garantiza que non-control data no haya sido corrompida.";
  }
  if (query.includes("got") || query.includes("plt") || query.includes("relro")) {
    return "GOT/PLT pertenecen al mecanismo ELF de relocations/dynamic linking. RELRO permite que regiones como las descritas por PT_GNU_RELRO se vuelvan read-only después de relocation. Reduce superficies de overwrite; no arregla el memory bug original.";
  }
  if (query.includes("rop") || query.includes("ret2libc") || query.includes("code reuse") || query.includes("code-reuse")) {
    return "Code-reuse reutiliza instrucciones ya ejecutables, por eso NX no es toda la historia. Ret2libc/ROP se estudian aquí como modelos de control-flow; CFI, CET/shadow stack y pointer authentication restringen clases concretas de transferencia. No necesitamos construir chains operativas para entender la defensa.";
  }
  if (query.includes("format string") || query.includes("printf(user") || query.includes("printf user")) {
    return `Un format string es una mini-gramática. Si el input es dato, usa formato constante y pásalo como argumento, por ejemplo conceptualmente printf("%s", value). Es la misma separación código/datos que en SQLi o command injection.`;
  }
  if (query.includes("use-after-free") || query.includes("use after free") || query.includes("double free") || query.includes("tcache")) {
    return "UAF y double-free son fallos de lifetime/ownership. La misma dirección puede reutilizarse para otro objeto sin restaurar la validez del puntero antiguo. Tcache/allocator hardening son detalles de implementación que cambian; el invariant estable es ownership correcto.";
  }
  if (query.includes("integer overflow") || query.includes("under-allocation") || query.includes("under allocation") || query.includes("truncation")) {
    return "Protege la aritmética antes de reservar/copiar: count*size puede overflowear o truncarse antes de malloc. Unsigned wrap puede ser definido por C y seguir siendo lógicamente inseguro para tamaños; signed overflow ordinario no debe asumirse wraparound portable.";
  }
  if (query.includes("type confusion") || query.includes("confusion de tipos") || query.includes("confusión de tipos")) {
    return "Type confusion significa interpretar un objeto con identidad/layout incompatible. Puede ocurrir sin OOB: un tag, cast o metadata de tipo incorrectos bastan. Valida discriminantes y evita casts que sustituyen la prueba del invariant.";
  }
  if (query.includes("exploitability") || query.includes("explotabilidad") || query.includes("hardening binario")) {
    return "Haz triage por reachability, attacker control, primitive, precondiciones, privilegio, aislamiento y mitigaciones. ASLR/NX/RELRO/canaries/CFI reducen capacidades distintas; ninguna justifica dejar sin parche una corrupción reproducible.";
  }

  // Ingeniería inversa: priorizar representación, evidencia y validación.
  if (query.includes("ghidra") || query.includes("decompiler") || query.includes("decompil")) {
    return "Un decompiler reconstruye pseudocódigo desde instrucciones/IR; no recupera el fuente original. En Ghidra, auto-analysis, tipos y nombres son hipótesis que debes validar con xrefs, ABI, call sites y comportamiento observado.";
  }
  if (query.includes("cfg") || query.includes("control-flow graph") || query.includes("control flow graph") || query.includes("jump table")) {
    return "Un CFG modela bloques y transferencias posibles. Indirect jumps, jump tables, exceptions y tail calls dificultan recovery; un CFG estático puede omitir edges o añadir hipótesis conservadoras. Valida targets importantes.";
  }
  if (query.includes("data-flow") || query.includes("data flow") || query.includes("def-use") || query.includes("slice")) {
    return "Data-flow sigue producción/consumo de valores; control-flow solo dice por dónde puede pasar la ejecución. SSA/def-use/slicing ayudan, pero aliasing y memoria indirecta reducen precisión. El slice siempre depende de una pregunta concreta.";
  }
  if (query.includes("stripped") || query.includes("strip symbols") || query.includes("sin simbolos") || query.includes("sin símbolos")) {
    return "Stripping puede eliminar símbolos/debug info, pero el binario conserva la semántica necesaria para ejecutar y a menudo metadata dinámica, imports, strings, relocations y patrones. Nombres recuperados son inferencias, no nombres fuente garantizados.";
  }
  if (query.includes("packer") || query.includes("packed") || query.includes("obfuscat") || query.includes("anti-debug") || query.includes("anti debug")) {
    return "Packing/ofuscación/anti-analysis elevan el coste de observación; no prueban malware. Trabaja en sandbox, registra hashes y compara evidencia estática/dinámica. Un comportamiento distinto bajo debugger es una señal experimental, no una conclusión por sí sola.";
  }
  if (query.includes("firmware reversing") || query.includes("firmware reverse") || (query.includes("firmware") && query.includes("reverse"))) {
    return "Empieza por container/formato, arquitectura, endianness y memory map. Un firmware puede incluir bootloader, kernel, filesystem y blobs. Offsets de archivo no son direcciones de ejecución; MMIO/device tree/vector tables ayudan a conectar código con hardware.";
  }

  if (query.includes("x86") || query.includes("aarch64") || query.includes("risc-v") || query.includes("risc v") || query.includes("cisc")) {
    return "Evita la caricatura RISC=rápido/CISC=lento. x86-64, AArch64 y RISC-V tienen contratos distintos, pero sus implementaciones modernas pueden compartir pipeline, OoO, cachés y predicción. RISC/CISC describe tendencias de ISA, no el rendimiento de una CPU concreta.";
  }


  // Teoría de la Computación: límites formales antes de fallbacks de autómatas/optimización.
  if (query.includes("halting") || query.includes("problema de parada") || query.includes("problema de detencion") || query.includes("problema de detención")) {
    return "Halting pregunta si un programa M se detendrá sobre una entrada w. No existe un decider universal correcto y total para todos los pares (M,w): la prueba clásica usa diagonalización/autorreferencia. Eso no impide demostrar terminación para programas o subconjuntos concretos.";
  }
  if (query.includes("decidible") || query.includes("indecidible") || query.includes("decidibilidad") || query.includes("recognizable") || query.includes("reconocible")) {
    return "Decidible significa que existe un algoritmo correcto que termina en toda entrada. Reconocible permite divergir en entradas no pertenecientes. Indecidible no significa 'muy lento' ni 'exponencial': significa que no existe un decider total correcto para todas las instancias.";
  }
  if (query.includes("reduccion") || query.includes("reducción") || query.includes("reduce a") || query.includes("many-one") || query.includes("many one")) {
    return "La dirección importa: A≤B significa que una solución de B permite resolver A mediante la transformación. Para demostrar B difícil desde A conocido como difícil, reduce A→B. En una many-one de decisión prueba normalmente x∈A iff f(x)∈B y declara si la reducción es computable o polinómica.";
  }
  if (query.includes("np-complete") || query.includes("np complete") || query.includes("np-completo") || query.includes("np completo") || query.includes("np-completeness")) {
    return "NP-complete = pertenece a NP + es NP-hard bajo la reducción especificada, típicamente many-one polinómica. Para probarlo necesitas verifier/certificado polinómico y una reducción desde un NP-complete conocido en la dirección conocido→candidato. Si uno tuviera algoritmo polinómico, entonces P=NP.";
  }
  if (query.includes("np-hard") || query.includes("np hard") || query.includes("np-dificil") || query.includes("np difícil") || query.includes("np dificil")) {
    return "NP-hard expresa dureza: todo problema de NP reduce al problema bajo la noción elegida. No exige pertenecer a NP ni siquiera ser decidible. NP-hard no significa automáticamente NP-complete, y tampoco demuestra que toda instancia práctica sea intratable.";
  }
  if ((query.includes("clase np") || query === "np" || query.includes(" certificado")) && !query.includes("np-hard") && !query.includes("np complete")) {
    return "NP significa nondeterministic polynomial time, no 'non-polynomial'. Equivalentemente para decisiones, las instancias sí tienen certificados de longitud polinómica verificables en tiempo polinómico. P⊆NP; no sabemos si P=NP.";
  }
  if (query.includes("clase p") || query.includes("p vs np") || query.includes("p=np") || query.includes("p = np")) {
    return "P contiene problemas de decisión resolubles determinísticamente en tiempo polinómico. P⊆NP; sigue abierto si P=NP. 'Polinómico' es una frontera teórica robusta, no una promesa de rapidez práctica para grados/constantes enormes.";
  }
  if (query.includes("maquina de turing") || query.includes("máquina de turing") || query.includes("turing machine") || query.includes("computabilidad")) {
    return "Una máquina de Turing modela control finito + cinta no acotada idealizada. Sirve para hablar de computabilidad, no para imitar una CPU real. Reconocer puede permitir divergencia; decidir exige terminar siempre. Computable tampoco significa eficiente.";
  }
  // Matemáticas discretas: definiciones y prueba antes de aplicar fórmulas.
  if (query.includes("cuantificador") || query.includes("contrapositiva") || query.includes("implicacion") || query.includes("implicación")) {
    return "En lógica separa sintaxis y semántica. P→Q equivale a ¬P∨Q y a ¬Q→¬P, no a la conversa. Al negar cuantificadores, ∀↔∃ y se niega el predicado: ¬∀xP(x) ≡ ∃x¬P(x).";
  }
  if (query.includes("conjunto potencia") || query.includes("subconjunto") || query.includes("inclusion-exclusion") || query.includes("inclusión-exclusión")) {
    return "No confundas x∈A con A⊆B. Si |A|=n finito, P(A) tiene 2^n subconjuntos. Para uniones solapadas usa inclusión-exclusión: sumar tamaños sin corregir intersecciones sobrecuenta.";
  }
  if (query.includes("relacion de equivalencia") || query.includes("relación de equivalencia") || query.includes("antisimetr") || query.includes("orden parcial")) {
    return "Equivalencia = reflexiva + simétrica + transitiva y produce una partición. Orden parcial = reflexiva + antisimétrica + transitiva; antisimétrica no significa 'no simétrica'. Minimal y mínimo tampoco son sinónimos.";
  }
  if (query.includes("inyect") || query.includes("sobreyect") || query.includes("biyect") || query.includes("preimagen")) {
    return "Inyectiva evita colisiones, sobreyectiva cubre todo el codominio y biyectiva cumple ambas. Una inversa bilateral existe iff la función es biyectiva; la preimagen de un subconjunto sí está definida aunque no haya función inversa.";
  }
  if (query.includes("palomar") || query.includes("combinatori") || query.includes("permut") || query.includes("combinacion") || query.includes("combinación") || query.includes("stars and bars")) {
    return "Antes de elegir fórmula decide: ¿importa el orden?, ¿se permite repetición?, ¿hay restricciones? P(n,k) ordena sin reemplazo; C(n,k) selecciona sin orden; n^k modela k posiciones con reemplazo; stars-and-bars cuenta distribuciones no negativas.";
  }
  if (query.includes("recurrencia") || query.includes("ecuacion caracteristica") || query.includes("ecuación característica")) {
    return "Una recurrencia no determina una secuencia única sin suficientes condiciones iniciales. Para lineales homogéneas con coeficientes constantes, la ecuación característica da la forma general; después hay que fijar constantes y verificar recurrencia + bases.";
  }
  if (query.includes("induccion") || query.includes("inducción") || query.includes("invariante")) {
    return "Una prueba inductiva necesita base, hipótesis explícita y paso universal. La inducción fuerte puede usar todos los casos anteriores pero es equivalente en poder sobre N. En estructuras recursivas, la inducción estructural sigue los constructores.";
  }
  if (query.includes("grafo") || query.includes("euler") || query.includes("hamilton") || query.includes("handshake")) {
    return "En grafos no dirigidos Σdeg(v)=2|E|, así que hay un número par de vértices de grado impar. Euler habla de recorrer aristas; Hamilton de visitar vértices. BFS da distancias mínimas por número de aristas en grafos no ponderados.";
  }
  if (query.includes("spanning tree") || query.includes("arbol") || query.includes("árbol")) {
    return "Un árbol finito no dirigido es conexo y acíclico; equivalentemente, si tiene n vértices tiene n−1 aristas y un único camino simple entre cada par. Un spanning tree conserva todos los vértices de un grafo conexo sin ciclos.";
  }
  if (query.includes("dfa") || query.includes("nfa") || query.includes("automata") || query.includes("autómata")) {
    return "DFA y NFA reconocen exactamente los lenguajes regulares. El NFA acepta si existe una trayectoria aceptante; subset construction convierte conjuntos de estados NFA en estados DFA y puede crecer hasta 2^n.";
  }
  if (query.includes("lenguaje formal") || query.includes("pumping") || query.includes("gramatica") || query.includes("gramática") || query.includes("regex")) {
    return "Un lenguaje es un subconjunto de Σ*. Regex, DFA y NFA caracterizan los regulares. El pumping lemma es útil para demostrar no-regularidad, pero cumplir una condición de bombeo no demuestra regularidad. CFG/PDA cubren una clase más amplia: los context-free.";
  }


  // Álgebra lineal: separar espacio abstracto, coordenadas y estabilidad numérica.
  if (query.includes("cambio de base") || query.includes("coordenadas") || query.includes("base vectorial")) {
    return "Una base convierte vectores abstractos en coordenadas. Cambiar de base cambia los números que representan al vector, no el vector. Para un endomorfismo, las matrices en dos bases relacionadas satisfacen A_nueva=P^{-1}A_antigua P.";
  }
  if (query.includes("rango") || query.includes("nulidad") || query.includes("nullity") || query.includes("sistema lineal")) {
    return "Ax=b es consistente iff b pertenece a Col(A). Para A:F^n→F^m, rank(A)+nullity(A)=n. Los pivotes controlan variables básicas; columnas sin pivote generan grados de libertad en el kernel.";
  }
  if (query.includes("producto escalar") || query.includes("ortogonal") || query.includes("gram-schmidt") || query.includes("gram schmidt")) {
    return "El producto interno induce norma y ortogonalidad. En R^n, x·y=x^Ty. Una base ortonormal simplifica coeficientes y proyecciones; Gram-Schmidt conserva el span, aunque en cómputo numérico conviene atender a estabilidad.";
  }
  if (query.includes("producto vectorial") || query.includes("cross product")) {
    return "En R³, u×v es perpendicular a ambos, tiene magnitud ||u||||v||sinθ y orientación de mano derecha. Es anticomutativo: u×v=−v×u. No es una operación con las mismas propiedades en R^n arbitrario.";
  }
  if (query.includes("determinante") || query.includes("invertible") || query.includes("inversa")) {
    return "Para una matriz cuadrada, det(A) es factor de volumen orientado. det(A)≠0 equivale a rango completo, kernel trivial e invertibilidad. Para resolver Ax=b numéricamente, suele ser mejor factorizar que formar A^{-1} explícitamente.";
  }
  if (query.includes("eigen") || query.includes("autovalor") || query.includes("autovector") || query.includes("diagonaliz")) {
    return "Av=λv exige v≠0. Los eigenvalues salen de det(A−λI)=0, pero una matriz solo diagonaliza si existe una base completa de eigenvectors. Eigenvalues distintos son suficientes para independencia, no es necesario que todos sean distintos.";
  }
  if (query.includes("simetrica") || query.includes("simétrica") || query.includes("teorema espectral") || query.includes("definida positiva")) {
    return "Una matriz real simétrica tiene eigenvalues reales y una base ortonormal de eigenvectors: A=QΛQ^T. Los signos de Λ clasifican la forma x^TAx. Estas garantías dependen de simetría; no valen para una matriz real cualquiera.";
  }
  if (query.includes("svd") || query.includes("singular value") || query.includes("valor singular") || query.includes("pseudoinversa")) {
    return "Toda matriz A admite SVD A=UΣV^T (o adjunta en C). Los σ_i son no negativos, rank(A) cuenta los positivos y A^+=VΣ^+U^T. Truncar SVD da una aproximación óptima de rango k en normas 2/Frobenius bajo Eckart–Young–Mirsky.";
  }
  if (query.includes("minimos cuadrados") || query.includes("mínimos cuadrados") || query.includes("proyeccion") || query.includes("proyección") || query.includes("norma")) {
    return "La proyección ortogonal minimiza distancia euclídea y deja residual ortogonal al subespacio. En min ||Ax−b||₂, A^T(Ax−b)=0. Las ecuaciones normales son conceptualmente útiles, pero QR/SVD suelen ser más estables numéricamente.";
  }
  if (query.includes("pca") || query.includes("graficos") || query.includes("gráficos") || query.includes("capa lineal")) {
    return "En gráficos, física, IA y señales las matrices representan operadores bajo bases concretas. Una capa x↦Wx+b es afín si b≠0, no estrictamente lineal. PCA usa estructura espectral/SVD de datos centrados; la semántica del modelo no se reduce a multiplicar matrices.";
  }


  // Optimización: separar formulación, optimalidad y comportamiento numérico.
  if (query.includes("funcion de coste") || query.includes("función de coste") || query.includes("funcion objetivo") || query.includes("función objetivo")) {
    return "Una función de coste es una formulación matemática del objetivo, a menudo un proxy. Declara variables de decisión, parámetros y restricciones antes de optimizar. Que el optimizador reduzca la loss no demuestra que el objetivo real del sistema esté bien representado.";
  }
  if (query.includes("convex") || query.includes("minimo local") || query.includes("mínimo local") || query.includes("optimo global") || query.includes("óptimo global")) {
    return "En un problema convexo, todo mínimo local es global; con convexidad estricta puede haber unicidad bajo condiciones adecuadas. Eso es una garantía geométrica, no una promesa de convergencia instantánea del algoritmo ni una afirmación válida para problemas no convexos.";
  }
  if (query.includes("gradiente descendente") || query.includes("gradient descent") || query.includes("learning rate") || query.includes("tamaño de paso") || query.includes("tamano de paso")) {
    return "Gradiente descendente usa x_{k+1}=x_k-α_k∇f(x_k). El gradiente da dirección local; α decide cuánto confiar en ella. Un paso grande puede oscilar/divergir incluso en una cuadrática convexa y uno minúsculo puede converger muy despacio. Conditioning y line search importan.";
  }
  if (query.includes("sgd") || query.includes("minibatch") || query.includes("mini-batch") || query.includes("gradiente estoc")) {
    return "SGD sustituye el gradiente completo por un estimador de muestra/minibatch. Insesgado significa que su esperanza coincide con el gradiente bajo el esquema de muestreo, no que cada paso sea exacto. Batch size, varianza, learning-rate schedule y reproducibilidad están acoplados.";
  }
  if (query.includes("momentum") || query.includes("nesterov")) {
    return "Momentum añade estado de velocidad y acumula direcciones persistentes; puede reducir zig-zag, pero también oscilar con hiperparámetros agresivos. Nesterov tiene garantías de aceleración bajo hipótesis concretas; no es universalmente 'momentum pero mejor'.";
  }
  if (query.includes("newton") || query.includes("bfgs") || query.includes("l-bfgs") || query.includes("lbfgs") || query.includes("quasi-newton")) {
    return "Newton resuelve H p=-g a partir del modelo cuadrático local; no hace falta formar H^{-1} explícitamente. Si H es indefinido o el modelo local es pobre, el paso puede no descender. BFGS/L-BFGS aproximan curvatura y suelen combinarse con line search.";
  }
  if (query.includes("kkt") || query.includes("lagrange") || query.includes("multiplicador") || query.includes("complementary slackness") || query.includes("complementariedad")) {
    return "Lagrange/KKT codifica geometría de restricciones mediante multiplicadores. Para g_i≤0: factibilidad primal, λ_i≥0, estacionariedad y λ_i g_i=0 son piezas separadas. KKT no certifica globalidad en cualquier no convexo; la suficiencia fuerte requiere hipótesis como convexidad y regularidad.";
  }
  if (query.includes("dualidad") || query.includes("duality gap") || query.includes("slater") || query.includes("cota dual")) {
    return "En minimización, un dual de Lagrange produce cotas inferiores bajo la convención adecuada. Dualidad débil es general; gap cero/dualidad fuerte necesita estructura adicional. Si una cota dual coincide con una solución primal factible, tienes un certificado de optimalidad.";
  }
  if (query.includes("branch-and-bound") || query.includes("branch and bound") || query.includes("combinatoria") || query.includes("relajacion") || query.includes("relajación") || query.includes("np-hard")) {
    return "Optimización combinatoria trabaja con decisiones discretas. Relajaciones dan problemas más fáciles y cotas; branch-and-bound usa esas cotas para podar. NP-hard describe el problema general, no implica que toda instancia concreta sea intratable ni que las heurísticas sean inútiles.";
  }
  if (query.includes("line search") || query.includes("armijo") || query.includes("wolfe") || query.includes("trust region") || query.includes("trust-region") || query.includes("conditioning") || query.includes("condicionamiento")) {
    return "Una dirección de descenso solo garantiza mejora para pasos suficientemente pequeños. Line search busca un paso aceptable; trust region limita cuánto confiar en el modelo local. Conditioning describe sensibilidad/geometría del problema y puede dominar la velocidad del algoritmo.";
  }
  if (query.includes("pareto") || query.includes("multiobjetivo") || query.includes("regularizacion") || query.includes("regularización") || query.includes("penalizacion") || query.includes("penalización")) {
    return "Regularizar cambia el objetivo y puede introducir sesgo; no es un ajuste gratuito. En multiobjetivo, Pareto describe soluciones no dominadas y una suma ponderada codifica preferencias/unidades. En problemas no convexos, una escalarización lineal puede no recuperar toda la frontera Pareto.";
  }


  // Godot profundo: priorizar antes de arquitectura de videojuegos/red genérica.
  // Estas respuestas distinguen API pública, modelo de escena, binding e internals.
  if (query.includes("scenetree") || query.includes("scene tree") || query.includes("_enter_tree") || query.includes("_ready")) {
    return "SceneTree administra la jerarquía activa de Nodes y escenas. Un Node puede existir fuera del árbol; entrar al árbol, llegar a _ready y salir son fases distintas. _ready no significa ownership eterno y queue_free difiere la destrucción al final del frame.";
  }
  if (query.includes("packedscene") || query.includes("packed scene") || (query.includes("godot") && query.includes("node"))) {
    return "En Godot, Node aporta comportamiento/lifecycle dentro del SceneTree; PackedScene es un Resource serializado que puede instanciar una composición de Nodes. Parent, owner y asset/instancia son conceptos distintos: la misma escena puede producir muchas instancias runtime.";
  }
  if ((query.includes("resource") && query.includes("godot")) || query.includes("custom resource") || query.includes("subresource")) {
    return "Resource es un contenedor de datos serializable y RefCounted; no necesita formar parte del SceneTree. El loader puede devolver una referencia cacheada por ruta, así que mutar un Resource compartido puede afectar a varios consumidores. Compartido no significa copia local por Node.";
  }
  if ((query.includes("signal") && query.includes("godot")) || query.includes("callable godot")) {
    return "Signals permiten que un emisor notifique un hecho sin conocer directamente al receptor, pero no eliminan dependencias semánticas, orden ni lifetime. Diseña conexiones/reentrancy y distingue evento ('ocurrió') de command ('haz').";
  }
  if (query.includes("renderingserver") || query.includes("rendering server") || query.includes("physicsserver") || query.includes("physics server")) {
    return "Los Servers de Godot son APIs de subsistema más bajas que los Nodes de escena. Un Sprite2D/MeshInstance3D o un body de alto nivel integra lifecycle y recursos; RenderingServer/PhysicsServer gestionan objetos del subsistema. Una llamada al server no significa ejecución GPU/solver completada inmediatamente.";
  }
  if (query.includes("inputmap") || query.includes("input map") || (query.includes("godot") && query.includes("input"))) {
    return "InputMap desacopla acciones lógicas (Jump, Fire) de teclas/gamepads concretos. Eventos y polling responden preguntas distintas; para replay/rollback conviene transformar hardware input en intención normalizada etiquetada temporalmente.";
  }
  if (query.includes("gdscript") || query.includes("@onready") || query.includes("typed gdscript")) {
    return "GDScript es un lenguaje gradualmente tipado e integrado con Godot. @onready controla cuándo se evalúa una referencia respecto a _ready, no ownership. Añadir tipos mejora contratos/tooling, pero no convierte GDScript en C++ ni arregla un algoritmo O(n²).";
  }
  if ((query.includes("c#") || query.includes("csharp") || query.includes("dotnet") || query.includes(".net")) && query.includes("godot")) {
    return "Godot C# usa la integración .NET y bindings al Object model nativo. El GC administrado no sustituye el lifecycle de Nodes: conservar un wrapper no vuelve válido un objeto nativo ya liberado. Mide marshaling/allocation solo donde el profiler muestre que importa.";
  }
  if (query.includes("gdextension") || query.includes("godot-cpp") || query.includes("godot cpp")) {
    return "GDExtension es una tecnología de extensión que carga librerías nativas en runtime sin recompilar todo el engine; no es un lenguaje ni una variante de GDScript. C++/godot-cpp es una opción frecuente. Native tampoco significa automáticamente más rápido end-to-end.";
  }
  if ((query.includes("profiler") || query.includes("profiling")) && query.includes("godot")) {
    return "En Godot perfila por subsistema y hardware objetivo: scripts/CPU, física, rendering/GPU, memoria y red. FPS medio no diagnostica stutter; mira frame times/spikes y recuerda que el profiler integrado no cubre C# scripts de la misma forma que GDScript.";
  }
  if ((query.includes("rpc") || query.includes("multiplayerapi") || query.includes("multiplayer synchronizer") || query.includes("multiplayersynchronizer")) && query.includes("godot")) {
    return "El multiplayer de alto nivel de Godot organiza peers, RPC y autoridad/replicación, pero una RPC sigue cruzando una red con RTT, jitter y pérdida. MultiplayerSynchronizer/Spawner automatizan partes de replicación; prediction, interest management y validación siguen siendo arquitectura de netcode.";
  }
  if (query.includes("editorplugin") || query.includes("editor plugin") || query.includes("@tool") || query.includes("custom node godot")) {
    return "EditorPlugin y scripts @tool permiten extender el editor y ejecutar lógica durante edición. Eso exige cuidar side effects, Undo/Redo y assets. Custom Nodes/Resources son valiosos cuando convierten invariantes repetidas del proyecto en interfaces reutilizables, no por añadir UI por sí sola.";
  }
  if ((query.includes("engine source") || query.includes("source code") || query.includes("codigo fuente") || query.includes("código fuente")) && query.includes("godot")) {
    return "Para leer el source de Godot, parte de una API/símbolo concreto y sigue la responsabilidad Scene → servers/core → drivers cuando corresponda. El source muestra la implementación actual; no convierte detalles internos en API pública estable. Usa git history para entender decisiones.";
  }
  if (query.includes("arquitectura de godot") || query.includes("godot internals") || query.includes("godot interno")) {
    return "Godot no es simplemente un SceneTree gigante: la Scene layer ofrece el modelo de alto nivel, mientras Core/Servers/drivers implementan servicios y plataforma; el editor se construye sobre el mismo engine. Distingue contrato público, binding de lenguaje e implementación interna.";
  }


  // Networking de videojuegos: temporalidad, autoridad y replicación antes de IA/game-loop genéricos.
  if (query.includes("snapshot interpolation") || query.includes("interpolacion de snapshots") || query.includes("interpolación de snapshots")) {
    return "Snapshot interpolation mantiene un buffer de estados remotos y renderiza deliberadamente un instante algo retrasado entre dos snapshots conocidos. Reduce jitter visual a cambio de latencia de presentación; no es client prediction.";
  }
  if (query.includes("client prediction") || query.includes("client-side prediction") || query.includes("prediccion del cliente") || query.includes("predicción del cliente")) {
    return "Client-side prediction aplica inputs locales antes de recibir confirmación para reducir latencia percibida. El servidor puede seguir siendo autoritativo; después reconciliation corrige diferencias.";
  }
  if (query.includes("reconciliation") || query.includes("reconciliacion") || query.includes("reconciliación")) {
    return "Server reconciliation restaura el estado autoritativo confirmado, elimina inputs ya reconocidos y reaplica en orden los inputs locales posteriores. El smoothing visual de la corrección es una capa distinta.";
  }
  if (query.includes("lag compensation") || query.includes("compensacion de lag") || query.includes("compensación de lag") || query.includes("rewind") && query.includes("red")) {
    return "Lag compensation puede reconstruir/consultar estados históricos para juzgar una acción según un instante pasado, por ejemplo un disparo hitscan. No reduce físicamente el RTT y requiere límites de confianza, historial y una política explícita de fairness.";
  }
  if (query.includes("rollback") && (query.includes("network") || query.includes("netcode") || query.includes("multiplayer") || query.includes("multijugador"))) {
    return "Rollback conserva estados pasados; cuando llega un input tardío restaura un tick anterior y resimula hasta el presente con la historia corregida. No es snapshot interpolation: rollback modifica/resimula la lógica.";
  }
  if (query.includes("tick rate") && (query.includes("server") || query.includes("servidor") || query.includes("multiplayer") || query.includes("red"))) {
    return "Tick rate es la frecuencia de la simulación, no el FPS de render ni necesariamente la frecuencia de snapshots. Un servidor a 60 Hz tiene un tick ideal de ~16.67 ms, aunque pueda enviar estado a otra cadencia.";
  }
  if (query.includes("interest management") || query.includes("relevancia de red") || query.includes("network relevancy")) {
    return "Interest management decide qué entidades son relevantes para cada cliente por espacio, gameplay, privacidad y otros criterios. No es lo mismo que frustum culling: algo fuera de cámara puede seguir siendo relevante para la red.";
  }
  if (query.includes("reliable") && query.includes("ordered") || query.includes("fiable") && query.includes("orden")) {
    return "Reliable y ordered son semánticas de entrega, no sinónimos de 'mejor'. Estados reemplazables pueden volverse obsoletos si llegan tarde; eventos críticos pueden requerir garantías fuertes. Diseña la semántica por tipo de mensaje.";
  }
  if (query.includes("p2p") || query.includes("peer to peer") || query.includes("client/server") || query.includes("cliente servidor")) {
    return "Client/server y P2P describen topologías, pero autoridad, relay, transporte y confianza son decisiones separadas. P2P no elimina NAT traversal, host migration o cheating; client/server no implica que todo dato deba pasar por un único proceso monolítico.";
  }
  if (query.includes("determin") && (query.includes("multiplayer") || query.includes("rollback") || query.includes("netcode") || query.includes("red"))) {
    return "Fixed timestep ayuda, pero no garantiza determinismo. PRNG, orden de iteración, floating point, threads y fuentes externas pueden divergir; hashes por tick sirven para localizar la primera diferencia.";
  }
  if (query.includes("replicacion") || query.includes("replicación") || query.includes("state replication")) {
    return "Replicar estado significa enviar una representación de red suficiente y versionada, no copiar memoria interna. Deltas, cuantización e interest management reducen ancho de banda, pero añaden contratos sobre baselines, precisión y relevancia.";
  }

  // IA para videojuegos: decisión, navegación y locomoción antes de animación/física genéricas.
  if (query.includes("behaviour tree") || query.includes("behavior tree") || query.includes("selector") && query.includes("running") || query.includes("sequence") && query.includes("running")) {
    return "Un behaviour tree compone acciones/condiciones con estados como SUCCESS, FAILURE y RUNNING. Sequence y Selector tienen semánticas distintas; además debes decidir si recuerdan progreso entre ticks y cómo abortan/limpian acciones RUNNING. El BT organiza decisión, no sustituye percepción, pathfinding ni locomoción.";
  }
  if (query.includes("utility ai") || query.includes("utility score") || query.includes("consideration") || query.includes("argmax") && query.includes("ia")) {
    return "Utility AI puntúa acciones desde el contexto. Un score no es automáticamente probabilidad; combinar considerations por suma, producto o curvas cambia la semántica. Argmax puede oscilar con ruido, por lo que inertia, cooldowns o hysteresis suelen ser parte del diseño.";
  }
  if ((query.includes("fsm") || query.includes("finite state machine") || query.includes("maquina de estados") || query.includes("máquina de estados")) && (query.includes("npc") || query.includes("ia") || query.includes("game"))) {
    return "Una FSM modela modos discretos y transiciones con guards/eventos. Es clara para pocos estados, pero dimensiones ortogonales pueden explotar combinaciones; HFSM o máquinas separadas ayudan. Define prioridad e hysteresis para evitar thrashing entre transiciones.";
  }
  if (query.includes("astar") || query.includes("a*") || query.includes("heuristica admisible") || query.includes("heurística admisible") || query.includes("heuristica consistente") || query.includes("heurística consistente")) {
    return "A* prioriza f=g+h. g es coste conocido y h estima coste restante en las mismas unidades. Con costes no negativos y una heurística adecuada, puede garantizar optimalidad; h=0 reduce el comportamiento a Dijkstra. Weighted A* puede explorar menos sacrificando optimalidad exacta.";
  }
  if (query.includes("navmesh") || query.includes("navigation mesh") || query.includes("funnel") || query.includes("string pulling") || query.includes("off-mesh")) {
    return "Una navmesh representa regiones transitables para un agente/configuración, no la malla visual. La búsqueda produce un corredor de polígonos y funnel/string-pulling puede refinarlo. Off-mesh links añaden conectividad semántica como saltos o puertas; navigation y avoidance siguen siendo capas distintas.";
  }
  if (query.includes("steering") || query.includes("seek") || query.includes("arrive") || query.includes("flocking") || query.includes("cohesion") || query.includes("separation")) {
    return "Steering convierte objetivos locales en velocidad/aceleración deseada: seek persigue, arrive frena, separation/alignment/cohesion generan comportamiento grupal. No sustituye pathfinding global y la velocidad deseada todavía debe pasar por límites, avoidance y el controller físico.";
  }
  if (query.includes("avoidance") || query.includes("rvo") || query.includes("local avoidance") || query.includes("path following")) {
    return "Pathfinding global decide por dónde llegar; path following escoge objetivos locales y avoidance ajusta velocidades para reducir colisiones dinámicas. Un sistema RVO-like no conoce por sí solo cambios globales de conectividad y no sustituye collision response física.";
  }
  if (query.includes("percepcion") || query.includes("percepción") || query.includes("last seen") || query.includes("blackboard") && query.includes("ia") || query.includes("field of view") && query.includes("npc")) {
    return "Percepción define qué puede conocer el agente. lastSeenPosition es una observación histórica con timestamp/confidence, no la posición actual. Un blackboard almacena hechos compartidos pero necesita schema/ownership; consultar todo el world state directamente crea omnisciencia accidental.";
  }
  if (query.includes("influence map") || query.includes("cover point") || query.includes("tactical") || query.includes("tactica") || query.includes("táctica")) {
    return "Razonamiento táctico genera candidatos y los puntúa por cobertura, visibilidad, riesgo y coste de navegación. El mejor score local no sirve si el punto es inalcanzable; filtra factibilidad y reparte consultas caras en el tiempo para evitar spikes.";
  }
  if (query.includes("procedural behavior") || query.includes("comportamiento procedural") || query.includes("random stream") || query.includes("seed") && query.includes("npc")) {
    return "Comportamiento procedural usa reglas/parámetros y aleatoriedad controlada para variar conducta. Random no equivale a inteligente: necesita constraints y contexto. Seeds y streams PRNG separados ayudan a reproducir bugs y evitan que una llamada aleatoria de otro subsistema cambie decisiones.";
  }
  if (query.includes("ai lod") || query.includes("ia lod") || query.includes("time slicing") && query.includes("ia") || query.includes("budget") && query.includes("npc")) {
    return "Para escalar IA, mide por subsistema y distribuye sensores/decisiones/pathfinding en buckets o presupuestos. AI LOD y time slicing reducen CPU, pero aumentan staleness/latencia de reacción: es un trade-off que debe ser visible y medido, no una optimización gratuita.";
  }

  // Animación: clip/pose/deformación y lógica temporal antes de física/game-loop genéricos.
  if (query.includes("keyframe") || query.includes("track de anim") || query.includes("curva de anim") || query.includes("animation clip")) {
    return "Un clip contiene tracks que mapean tiempo a valores. Un keyframe es un punto de control del track, no un frame de pantalla obligatorio. Playback rate, looping y sampling transforman/evalúan el tiempo; eventos discretos necesitan una semántica distinta de las curvas continuas.";
  }
  if (query.includes("slerp") || query.includes("nlerp") || query.includes("interpolar rot") || query.includes("interpolacion de rot") || query.includes("interpolación de rot")) {
    return "Traslación/escala pueden interpolarse afínmente, pero rotaciones 3D requieren una representación/mezcla que preserve rotaciones válidas. q y -q representan la misma rotación; elegir signo/camino importa para continuidad. Interpolar matrices elemento a elemento no es una solución general.";
  }
  if (query.includes("skeleton") || query.includes("bone") || query.includes("rest pose") || query.includes("bind pose") || query.includes("inverse bind")) {
    return "Un skeleton es una jerarquía de joints/bones. Distingue transform local, global, rest/bind y pose actual. En skinning, la inverse bind reconcilia el espacio de la malla vinculada con el transform actual del joint; rest pose y pose animada no son sinónimos.";
  }
  if (query.includes("skinning") || query.includes("lbs") || query.includes("linear blend skinning") || query.includes("peso de hueso") || query.includes("bone weight")) {
    return "Linear Blend Skinning combina transforms de joints ponderados: p'≈Σ w_i M_i p. Es eficiente, pero la mezcla lineal de matrices puede perder volumen en torsiones. Pesos, joint indices y espacios deben corresponder; dual-quaternion skinning es una alternativa, no una ley universal.";
  }
  if (query.includes("forward kinematics") || query.includes("fk ") || query.includes("cinematica directa") || query.includes("cinemática directa")) {
    return "FK propaga transforms desde padres a hijos: con una convención típica G_child=G_parent·L_child. Dada la pose local, la pose global sale directamente. No resuelve el problema inverso de alcanzar un target; eso corresponde a IK.";
  }
  if (query.includes("inverse kinematics") || query.includes(" ik ") || query.startsWith("ik ") || query.includes("fabrik") || query.includes("ccd ik") || query.includes("pole vector")) {
    return "IK busca parámetros articulares para que un end-effector alcance un objetivo. Puede haber cero, una o varias soluciones; joint limits y pole vectors seleccionan poses plausibles. CCD/FABRIK son métodos iterativos y necesitan criterio de parada, límites y política para targets fuera de alcance.";
  }
  if (query.includes("blend space") || query.includes("blendspace") || query.includes("crossfade") || query.includes("animation blending") || query.includes("mezcla de anim")) {
    return "Blending mezcla poses; un blend space mapea parámetros continuos a pesos sobre clips. La continuidad de pesos no garantiza continuidad perceptual: fase de locomotion, root motion y contactos de pies también importan. Blend normalizado y animación aditiva son operaciones distintas.";
  }
  if (query.includes("state machine") && (query.includes("anim") || query.includes("estado")) || query.includes("animation state")) {
    return "Una animation state machine organiza estados, transiciones, condiciones, crossfades e interrupciones. No tiene por qué ser la única fuente de verdad del gameplay: el estado visual puede tener lifetimes y granularidad distintos del estado lógico.";
  }
  if (query.includes("root motion") || query.includes("root delta")) {
    return "Root motion extrae desplazamiento/rotación del root del clip. Debes decidir si lo consume la simulación, el character controller o solo la presentación. Aplicar el mismo delta desde animación y gameplay duplica movimiento; en rollback/networking conviene registrar una semántica reproducible por tick.";
  }
  if (query.includes("additive animation") || query.includes("animacion aditiva") || query.includes("animación aditiva") || query.includes("bone mask") || query.includes("layer mask")) {
    return "Una capa aditiva aplica un delta respecto a una pose de referencia; no es un crossfade normalizado. Masks limitan su influencia por joints. El orden de capas puede importar porque las rotaciones no conmutan en general.";
  }
  if (query.includes("animation event") || query.includes("marker de anim") || query.includes("sync marker") || query.includes("footstep") && query.includes("anim")) {
    return "Los eventos de animación deben detectarse por cruce de intervalos temporales, no por igualdad float exacta con un timestamp. Loops, seeks, reverse y rollback requieren reglas explícitas para evitar eventos perdidos o duplicados; sync markers ayudan a alinear fases entre clips.";
  }
  if (query.includes("retarget") || query.includes("retargeting") || query.includes("compresion de anim") || query.includes("compresión de anim") || query.includes("key reduction")) {
    return "Retargeting mapea movimiento entre rigs y debe reconciliar rest pose, proporciones y convenciones; nombres iguales de bones no garantizan compatibilidad. La compresión reduce keys/precisión y debe medirse por error de pose/pantalla, no solo por bytes.";
  }
  // Física de videojuegos: modelo, integración, colisiones y solver antes del game-loop genérico.
  if (query.includes("cinematica") || query.includes("cinemática") || query.includes("velocidad") && query.includes("aceleracion") || query.includes("aceleración")) {
    return "Cinemática describe movimiento sin modelar sus causas. Declara unidades y frame de referencia: posición, velocidad y aceleración tienen dimensiones distintas; una actualización discreta aproxima la evolución continua cuando las derivadas cambian dentro del timestep.";
  }
  if (query.includes("impulso") || query.includes("impulse") || query.includes("momentum") && query.includes("colision")) {
    return "Un impulso J cambia momentum: Δp=J y, para masa constante sin rotación, Δv=J/m. Fuerza e impulso no son lo mismo: una fuerza sostenida integra a impulso. En contactos, calcula la velocidad relativa del punto incluyendo ω×r.";
  }
  if (query.includes("semi-implicit") || query.includes("semi implicit") || query.includes("verlet") || query.includes("integrador") && query.includes("euler")) {
    return "Euler explícito mueve x con la velocidad vieja; semi-implícito actualiza v antes de x. Ambos son de primer orden, pero su estabilidad cualitativa puede ser muy distinta. 'Verlet' nombra una familia; especifica variante y no confundas orden de precisión con estabilidad para cualquier dt.";
  }
  if (query.includes("rigid body") || query.includes("cuerpo rigido") || query.includes("cuerpo rígido") || query.includes("tensor de inercia")) {
    return "Un rigid body ideal conserva su forma y mantiene pose, velocidad lineal y angular. Masa gobierna respuesta traslacional; el tensor de inercia la rotacional y depende de distribución/orientación. En 3D general no es un único escalar.";
  }
  if (query.includes("broad phase") || query.includes("broad-phase") || query.includes("aabb tree") || query.includes("dynamic tree")) {
    return "Broad phase produce pares candidatos conservadores usando bounds/estructuras espaciales; puede devolver falsos positivos. Árboles AABB dinámicos son una técnica común (Box2D la usa), pero no sustituyen narrow phase ni garantizan una complejidad fija para toda distribución.";
  }
  if (query.includes("narrow phase") || query.includes("narrow-phase") || query.includes("gjk") || query.includes("sat") || query.includes("tunneling")) {
    return "Narrow phase prueba la geometría real del par y genera separación/manifold. SAT y GJK sirven a convexos bajo formulaciones distintas. Detección discreta puede sufrir tunneling; CCD estima interacción durante el intervalo, con coste y aproximaciones adicionales.";
  }
  if (query.includes("restitucion") || query.includes("restitución") || query.includes("rebote") && query.includes("contacto")) {
    return "Restitución parametriza el rebote normal idealizado, pero motores iterativos pueden usar umbrales y aproximaciones para evitar jitter. En contactos múltiples no basta resolver cada choque una sola vez de forma independiente.";
  }
  if (query.includes("constraint solver") || query.includes("sequential impulse") || query.includes("warm start") || query.includes("warm-start") || query.includes("jacobiano") && query.includes("constraint")) {
    return "Contacts y joints pueden formularse como constraints. Sequential impulses/PGS los resuelve iterativamente; orden e iteraciones afectan convergencia. Warm starting reutiliza impulsos acumulados del step previo cuando persiste el contacto; no convierte el solver en una solución exacta continua.";
  }
  if (query.includes("friccion") || query.includes("fricción") || query.includes("coulomb")) {
    return "En un modelo Coulomb básico, el impulso tangencial se limita aproximadamente por |λt|≤μλn. Eso no es equivalente a multiplicar velocidad global por 0.9 cada frame. Friction del engine es un modelo numérico/material y puede combinar coeficientes según reglas propias.";
  }
  if (query.includes("joint") || query.includes("hinge") || query.includes("revolute") || query.includes("prismatic")) {
    return "Un joint restringe grados de libertad mediante constraints del solver; no equivale a parenting de scene graph. Distance, hinge/revolute y prismatic combinan restricciones lineales/angulares, y motores/límites necesitan fuerzas o impulsos máximos explícitos.";
  }
  if (query.includes("penetracion") || query.includes("penetración") || query.includes("baumgarte") || query.includes("slop") || query.includes("position correction")) {
    return "Los solvers suelen tolerar pequeña penetración y corregirla gradualmente. Bias/Baumgarte convierte error posicional en objetivo de corrección; demasiado agresivo puede inyectar energía y jitter, demasiado débil deja drift/sinking. Cero error instantáneo no es sinónimo de estabilidad.";
  }
  if (query.includes("ccd") || query.includes("continuous collision") || query.includes("substep") || query.includes("sub-step")) {
    return "Substeps reducen movimiento por solve y suelen mejorar robustez a costa de CPU; CCD trata posibles contactos entre endpoints para objetos rápidos. Ninguno es gratuito ni sustituye automáticamente al otro. Interpolación visual entre physics ticks no cambia la simulación autoritativa ya calculada.";
  }
  if (query.includes("sensor") || query.includes("trigger") && query.includes("physics") || query.includes("sleeping") || query.includes("physics pipeline")) {
    return "Un physics step típico integra, actualiza broad phase, genera contactos, forma islands, resuelve constraints y gestiona sleeping/eventos. Sensors/triggers pueden reportar overlap sin impulso de separación. Difiere mutaciones estructurales si el callback ocurre dentro del solver.";
  }

  // Arquitectura de videojuegos: tiempo, composición, eventos, input y persistencia.
  if (query.includes("game loop") || query.includes("bucle de juego") || query.includes("frame pacing")) {
    return "El game loop coordina tiempo, input, simulación, render y presentación. Render FPS y simulation rate pueden ser distintos; usa reloj monotónico para deltas y trata el orden de fases como parte de la semántica, no como un detalle accidental.";
  }
  if (query.includes("fixed timestep") || query.includes("paso fijo") || query.includes("acumulador") || query.includes("spiral of death")) {
    return "Fixed timestep avanza la simulación con dt constante. Un acumulador ejecuta 0..N ticks por frame y deja un remanente para interpolación. Si cada tick cuesta sostenidamente más que su presupuesto aparece backlog/spiral of death; limita catch-up. Fixed timestep por sí solo no garantiza determinismo.";
  }
  if (query.includes("variable timestep") || query.includes("paso variable") || query.includes("delta time") || query.includes("frame independent")) {
    return "Variable timestep usa el delta observado del frame. Multiplicar una velocidad por dt corrige unidades, pero no vuelve estable cualquier integrador ni hace frame-independent toda fórmula. Sistemas sensibles pueden necesitar clamp, substeps o un timestep separado.";
  }
  if (query.includes("ecs") || query.includes("entity component system") || query.includes("archetype") || query.includes("sparse set")) {
    return "ECS separa identidad (entity), datos (components) y lógica que opera sobre queries (systems). No exige una implementación única: sparse sets y archetypes tienen trade-offs distintos. Un entity ID tampoco tiene por qué ser un puntero estable.";
  }
  if (query.includes("component system") || query.includes("system scheduling") || query.includes("deferred command") || query.includes("structural change")) {
    return "Para scheduling de systems declara qué componentes lee y escribe cada uno. Read/Read suele paralelizarse; Write/Read y Write/Write requieren orden o partición. Spawn/despawn y add/remove component suelen diferirse para no invalidar iteraciones activas.";
  }
  if (query.includes("scene management") || query.includes("cambio de escena") || query.includes("world streaming") || query.includes("streaming de escena")) {
    return "Scene asset e instancia runtime son cosas distintas. Una transición robusta separa preload, activation y teardown, y world streaming necesita presupuestos de memoria/IO. Servicios como networking o perfil pueden vivir fuera de la escena actual.";
  }
  if (query.includes("resource system") || query.includes("cooked asset") || query.includes("hot reload") || query.includes("asset pipeline")) {
    return "Un resource system distingue source asset, producto importado/cooked e instancia runtime. La carga asíncrona necesita estados como queued/loading/ready/failed, y hot reload/versioning requiere un grafo de dependencias e IDs estables.";
  }
  if (query.includes("event bus") || query.includes("event system") || query.includes("evento") && query.includes("comando") || query.includes("reentrancy")) {
    return "Un evento describe algo que ocurrió; un comando solicita una acción. Dispatch inmediato puede reentrar en sistemas aún mutando estado; una cola diferida cambia esa semántica. Un bus global reduce acoplamiento sintáctico, pero puede ocultar dependencias semánticas si no hay tracing y contratos.";
  }
  if (query.includes("input action") || query.includes("action map") || query.includes("input map") || query.includes("polling") && query.includes("input")) {
    return "Separa input físico de acciones de gameplay. Eventos capturan transiciones; polling captura estado actual, y un tap breve puede ocurrir entre polls. En simulación fija/rollback, etiqueta o bufferiza input por tick para reproducirlo en el instante correcto.";
  }
  if (query.includes("serializacion") || query.includes("serialización") || query.includes("snapshot") || query.includes("schema migration") || query.includes("migracion de save") || query.includes("migración de save")) {
    return "Serializar no es volcar memoria cruda: persiste un esquema versionado y convierte referencias runtime en IDs reconstruibles. Caches derivados pueden omitirse; punteros no son identidad portable. Al leer, valida límites y aplica migraciones explícitas.";
  }
  if (query.includes("save game") || query.includes("guardado") || query.includes("save file") || query.includes("atomic save")) {
    return "Un save robusto captura un snapshot consistente y evita sobrescribir la única copia válida antes de completar la nueva. El patrón temporal→write/flush→rename/replace reduce corrupción, con garantías exactas dependientes del SO/filesystem. Un checksum sin clave detecta cambios, no autenticidad frente a un atacante.";
  }
  if (query.includes("replay") || query.includes("determinismo") || query.includes("determinism") || query.includes("state hash")) {
    return "Determinismo significa mismo estado inicial + mismas entradas + mismas reglas de ejecución bajo el contrato definido. Fixed timestep ayuda, pero PRNG, orden de iteración, threads, IO y floating point también pueden divergir. Replays por tick + hashes periódicos ayudan a localizar el primer estado distinto.";
  }
  if (query.includes("stutter") || query.includes("percentil") || query.includes("percentile") || query.includes("frame time") && query.includes("promedio")) {
    return "FPS medio puede ocultar stutter. Mide distribución de frame time, percentiles, máximos, backlog de ticks, jobs e IO. Un único frame de 50 ms sigue siendo visible aunque la media sea excelente.";
  }

  // Motor gráfico: arquitectura, ownership, visibilidad y scheduling antes de detalles del pipeline.
  if (query.includes("scene graph") || query.includes("scenegraph") || query.includes("reparent")) {
    return "Un scene graph expresa jerarquía espacial y composición de transformaciones; no tiene por qué ser también ownership de memoria, recursos o gameplay. Reparenting cambia la cadena local→world y debe definir si preserva o no la world transform.";
  }
  if (query.includes("resource manager") || query.includes("resource management") || query.includes("handle generation") || query.includes("hot reload")) {
    return "Separa asset lógico, slot/handle versionado, staging y recurso GPU residente. Una generation detecta handles stale; destruir CPU-side state no implica que la GPU haya terminado. Hot reload debe migrar o invalidar dependencias compatibles de forma explícita.";
  }
  if (query.includes("material system") || query.includes("shader variant") || query.includes("material instance")) {
    return "Material template fija contrato/shaders/layout; una instance cambia parámetros/recursos. n keywords booleanas pueden explotar hasta 2^n variantes, así que diferencia cambios que requieren pipeline de datos dinámicos que caben en buffers/descriptors.";
  }
  if (query.includes("frustum culling") || query.includes("occlusion culling") || query.includes("hi-z") || query.includes("hiz") || query.includes("visibility system")) {
    return "Frustum culling elimina lo claramente fuera; occlusion intenta eliminar lo tapado. Usa bounds conservadores: un falso positivo cuesta rendimiento, un falso negativo puede borrar geometría visible. Hi-Z y GPU-driven culling cambian granularidad y sincronización, no la necesidad de medir overhead.";
  }
  if (query.includes("lod") || query.includes("level of detail") || query.includes("hysteresis")) {
    return "LOD debe aproximar error perceptual/proyectado, no solo distancia world. Screen-space size/error incorpora cámara; hysteresis usa umbrales distintos al subir/bajar para evitar thrashing. Coordina geometría, mip/texture streaming e impostors.";
  }
  if (query.includes("batching") || query.includes("draw call") || query.includes("instancing") || query.includes("instance count")) {
    return "Batching reduce cambios de estado/submission; instancing reutiliza geometría/pipeline con datos por instancia. Menos draw calls no garantiza más FPS: batches enormes empeoran culling y las instancias siguen consumiendo vertex/fragment work. Mide CPU y GPU por separado.";
  }
  if (query.includes("render graph") || query.includes("frame graph") || query.includes("transient resource") || query.includes("resource aliasing")) {
    return "Un render graph declara reads/writes para derivar orden, lifetimes y posibles aliases de recursos transitorios. Ayuda a compilar scheduling/synchronization, pero no sustituye el memory model del backend. History buffers introducen dependencias entre frames y suelen ser persistentes/versionados.";
  }
  if (query.includes("post-processing") || query.includes("post processing") || query.includes("bloom") || query.includes("taa") || query.includes("history buffer")) {
    return "Post-processing es una cadena de passes con dominios y resoluciones explícitos. Bloom/TAA/tone mapping/UI no son conmutativos en general. TAA necesita history/reprojection y debe invalidar historia ante discontinuidades; muchos passes pueden bajar resolución a cambio de calidad/bandwidth.";
  }
  if (query.includes("render extraction") || query.includes("render snapshot") || query.includes("frames in flight") || query.includes("renderer architecture")) {
    return "Un renderer escalable suele consumir un snapshot estable: extraction → culling/sorting/preparation → command generation → GPU. Más frames in flight puede mejorar throughput pero aumentar input-to-photon latency. Perfila extraction, CPU submission y cada pass GPU antes de rediseñar.";
  }

  // Pixel art y arte técnico: priorizar intención discreta y pipeline antes de píxel genérico.
  if (query.includes("pixel cluster") || query.includes("pixel clusters") || query.includes("cluster de pixeles") || query.includes("cluster de píxeles")) {
    return "Un pixel cluster es una masa conectada que funciona como unidad visual. No maximices singles ni microdetalle: evalúa figura y espacio negativo a 1×, y usa píxeles aislados solo cuando cumplan una función clara.";
  }
  if (query.includes("silueta") && (query.includes("pixel") || query.includes("sprite"))) {
    return "La silueta prueba pose, proporción y separación de masas sin depender de textura o color interno. Conviene verla monocroma y a tamaño final: una pose anatómicamente plausible puede ser ilegible si extremidades y accesorios se fusionan.";
  }
  if (query.includes("paleta") || query.includes("palette") || query.includes("hue shifting")) {
    return "Una paleta es un sistema de relaciones y roles, no solo una lista de hex. Diseña separación de valor, ramps y reutilización; hue shifting es una estrategia estilística, no una ley que obligue a que toda sombra sea azul.";
  }
  if (query.includes("dither") || query.includes("dithering")) {
    return "Dithering mezcla espacialmente colores disponibles para aproximar valores o textura. No es lo mismo que antialiasing: un checker 50/50 puede sugerir un tono intermedio, pero a 1× sigue siendo un patrón y puede romper clusters si se abusa.";
  }
  if (query.includes("antialiasing manual") || query.includes("aa manual") || (query.includes("antialias") && query.includes("pixel art"))) {
    return "El AA manual coloca píxeles de transición en bordes seleccionados; no busca borrar toda escalera. Internal AA suele ser más robusto que contaminar el exterior con un color de fondo fijo, que puede crear halos al cambiar de fondo.";
  }
  if (query.includes("subpixel animation") || query.includes("animacion subpixel") || query.includes("animación subpixel")) {
    return "En una textura discreta no dibujas medio píxel lógico: simulas desplazamientos menores mediante cambios de patrón/masa entre frames. Distingue esa técnica artística de mover el sprite con coordenadas subpixel del renderer.";
  }
  if (query.includes("tileset") || query.includes("autotile") || query.includes("tile seam") || query.includes("tilemap")) {
    return "Un tileset debe probarse con vecinos: un tile bonito aislado puede producir seams al repetirse. Autotiling codifica relaciones de conectividad y las variantes visuales deben conservar la semántica del caso; atlas/padding pertenecen al pipeline de sampling.";
  }
  if (query.includes("sprite atlas") || query.includes("atlas de sprites") || (query.includes("pivot") && query.includes("sprite"))) {
    return "Un sprite incluye imagen y metadatos como región, pivot/origin y offsets. Trimming o atlas packing no deben cambiar su origen lógico; con bilinear/mipmaps, padding o extrusion ayudan a impedir bleeding desde regiones vecinas.";
  }
  if ((query.includes("pixel perfect") || query.includes("pixel-perfect")) && (query.includes("render") || query.includes("camera") || query.includes("cámara") || query.includes("scale") || query.includes("escala"))) {
    return "Pixel-perfect exige una política coherente de resolución lógica, scaling, transforms y sampling. Nearest por sí solo no arregla una escala 2.5× ni una cámara fraccional; una estrategia robusta es renderizar a low-res y escalar por factor entero cuando el display lo permite.";
  }
  if (query.includes("procedural pixel") || query.includes("pixel art procedural") || query.includes("generacion procedural de sprites") || query.includes("generación procedural de sprites")) {
    return "Generación procedural con estilo = aleatoriedad dentro de restricciones de silueta, paleta, clusters y conectividad. Guarda seed y versión del generador: misma seed no garantiza mismo resultado si cambia el algoritmo o el orden de consumo del PRNG.";
  }

  // Gráficos por ordenador: localizar primero el espacio, formato y etapa del pipeline.
  if (query.includes("framebuffer") || query.includes("pixel") || query.includes("píxel") || query.includes("msaa")) {
    return "Píxel, sample y texel son conceptos distintos. Un framebuffer es un conjunto de attachments de render (color/depth/stencil, etc.), no la pantalla física. MSAA puede mantener varias muestras por píxel y resolverlas después.";
  }
  if (query.includes("srgb") || query.includes("gamma") || query.includes("espacio de color") || query.includes("premultiplied") || query.includes("alpha")) {
    return "RGB necesita un espacio de color y una transferencia. sRGB codificado no es lineal respecto a luz, así que iluminación y muchas mezclas deben hacerse en lineal. Straight y premultiplied alpha son convenciones distintas; mezclarlas produce halos.";
  }
  if (query.includes("model space") || query.includes("world space") || query.includes("view space") || query.includes("clip space") || query.includes("ndc") || query.includes("homogene")) {
    return "Separa object/model → world → view → clip → NDC → window. Clip y NDC no son iguales: NDC aparece tras dividir por w. Handedness, orden de matrices y rango z dependen de convención/API; documentarlos evita errores aparentemente misteriosos.";
  }
  if (query.includes("normal matrix") || query.includes("inversa transpuesta") || (query.includes("normal") && query.includes("escala"))) {
    return "Las normales representan covectores geométricos: con una parte lineal A invertible deben transformarse proporcionalmente con (A^{-1})^T para conservar ortogonalidad con las tangentes. Aplicar A directamente falla bajo escalado no uniforme.";
  }
  if (query.includes("camara") || query.includes("cámara") || query.includes("look-at") || query.includes("view matrix")) {
    return "La matriz view transforma mundo→cámara y es conceptualmente la inversa del pose cámara→mundo. Un look-at construye una base de cámara; dirección y up casi paralelos son una degeneración que debe tratarse.";
  }
  if (query.includes("perspectiva") || query.includes("projection") || query.includes("fov") || query.includes("frustum") || query.includes("divide por w")) {
    return "La matriz perspective produce clip coordinates y la apariencia de perspectiva surge al dividir por w. FOV, aspect y near/far definen el frustum; la precisión de depth depende fuertemente del mapping y del near plane.";
  }
  if (query.includes("clipping") || query.includes("viewport")) {
    return "Clipping geométrico se hace en clip space antes del perspective divide; luego NDC se mapea al viewport. El rango z canónico no es universal entre APIs, así que no copies una matriz projection sin comprobar la convención.";
  }
  if (query.includes("raster") || query.includes("triangulo") || query.includes("triángulo") || query.includes("fragment")) {
    return "Rasterizar un triángulo evalúa cobertura sobre samples y genera fragments candidatos. Edge functions/baricéntricas ayudan a determinar interior; un fragment todavía puede fallar depth/stencil, ser descartado o no contribuir al color.";
  }
  if (query.includes("baricentr") || query.includes("interpolacion") || query.includes("interpolación") || query.includes("perspective-correct")) {
    return "Las baricéntricas expresan un punto como pesos que suman 1. Tras perspective divide, UV y otros atributos normalmente requieren interpolación perspective-correct usando atributo/w y 1/w; interpolar linealmente en pantalla puede deformarlos.";
  }
  if (query.includes("z-buffer") || query.includes("depth buffer") || query.includes("z-fighting") || query.includes("depth test")) {
    return "El depth buffer almacena una representación de profundidad del pipeline, no necesariamente distancia euclídea lineal. Z-fighting aparece cuando superficies cercanas no se distinguen bien con la precisión disponible; transparencia requiere además blending/orden u otras técnicas.";
  }
  if (query.includes("textura") || query.includes("texel") || query.includes("mipmap") || query.includes(" uv") || query.startsWith("uv ")) {
    return "Texel y píxel no son equivalentes. UV parametriza la superficie y puede tener seams/distorsión. Mipmaps son versiones prefiltradas a menor resolución que ayudan especialmente en minificación y selección de LOD.";
  }
  if (query.includes("bilinear") || query.includes("trilinear") || query.includes("anisotrop") || (query.includes("filter") && query.includes("texture"))) {
    return "Bilinear interpola un vecindario 2×2 dentro de un nivel; trilinear mezcla además dos mip levels. En superficies oblicuas, anisotropic filtering aproxima mejor una huella elongada. Ninguno crea detalle que la textura original no contiene.";
  }

  // Audio para videojuegos: priorizar tiempo real, reloj de audio y arquitectura de voces.
  if (query.includes("audio callback") || query.includes("underrun") || query.includes("dropout") || query.includes("audio thread") || query.includes("real-time audio")) {
    return "El callback de audio tiene un deadline periódico: bufferFrames/sampleRate. El peor caso importa más que la media. Evita I/O síncrono, locks contenciosos y allocations impredecibles; mueve decode/streaming a workers y comunica mediante colas/snapshots con ownership claro.";
  }
  if (query.includes("mixing") || query.includes("mezcla") || query.includes("headroom") || query.includes("bus de audio") || query.includes("audio bus")) {
    return "Mezclar significa sumar/procesar señales en dominio lineal coherente. Buses agrupan música/SFX/voz y permiten gain, efectos y ducking. 0 dBFS es full scale digital, no SPL físico; deja headroom porque varias fuentes pueden sumar picos y clippear.";
  }
  if (query.includes("spatial audio") || query.includes("audio espacial") || query.includes("hrtf") || query.includes("atenuacion de audio") || query.includes("atenuación de audio")) {
    return "Spatial audio usa posición/orientación relativas, atenuación y un modelo de reproducción. HRTF no es solo pan L/R: incluye diferencias temporales/nivel y filtrado espectral direccional. Las curvas de distancia de un juego pueden ser artísticas y acotadas en vez de 1/r² exacto.";
  }
  if (query.includes("doppler") || query.includes("efecto doppler")) {
    return "Doppler depende de la componente radial de la velocidad relativa fuente-listener. Movimiento puramente tangencial instantáneo puede tener v_r=0. Teleports o correcciones de red no deberían convertirse sin más en velocidades gigantes que produzcan chirps absurdos.";
  }
  if (query.includes("reverb") || query.includes("reverber") || query.includes("rt60") || query.includes("impulse response") || query.includes("respuesta impulsional de sala")) {
    return "Reverb combina reflexiones tempranas y una cola más difusa. Puede modelarse algorítmicamente o por convolución con una IR. RT60 es un tiempo de decaimiento aproximado de 60 dB; una IR fija no se adapta automáticamente si cambia la geometría virtual.";
  }
  if (query.includes("occlusion audio") || query.includes("oclusion audio") || query.includes("oclusión audio") || query.includes("audio obstruction")) {
    return "Occlusion acústica no equivale a visibility de render. Puede modificar gain, filtros y sends; un ray cast es solo una aproximación. Actualiza geometría a una tasa razonable y suaviza parámetros para evitar clicks/zippering.";
  }
  // Música procedural / síntesis demoscene: antes del fallback de audio procedural genérico.
  if (query.includes("tiny synth") || query.includes("tiny synthesizer") || query.includes("sintetizador tiny") || query.includes("synth pequeño")) {
    return "Un tiny synth reemplaza PCM distribuido por código DSP + eventos + parámetros. Mide synth, song data y tamaño packed final; puede prerenderizar al arrancar o generar por bloques. Menor código bruto no garantiza menor release comprimida.";
  }
  if (query.includes("tracker music") || query.includes("tracker") || query.includes("pattern") && query.includes("musica")) {
    return "Tracker music representa eventos en patterns/filas/canales e instrumentos reutilizables. Una fila no tiene duración universal: tempo, speed/ticks y effect commands dependen del formato/tracker. Pattern data no es PCM ya renderizado.";
  }
  if (query.includes("fm synthesis") || query.includes("sintesis fm") || query.includes("síntesis fm") || query.includes("phase modulation")) {
    return "En síntesis FM/PM hay portadora, moduladora e índice/profundidad. Una forma típica es sin(ωc·t + I·sin(ωm·t)); I y fm no son lo mismo. La modulación audible produce sidebands y puede aliasar si el espectro supera Nyquist.";
  }
  if (query.includes("lfo") || query.includes("vibrato") || query.includes("tremolo")) {
    return "Un LFO es una señal de control lenta: rate y depth son parámetros distintos. Vibrato suele modular pitch y tremolo amplitud; el LFO también puede modular cutoff/pan y sincronizarse al tempo. A tasas audibles deja de comportarse simplemente como una modulación lenta.";
  }
  if (query.includes("sequencer") || query.includes("secuenciador") || query.includes("ppq") || query.includes("sample-accurate")) {
    return "Un sequencer agenda eventos en tiempo musical y finalmente los convierte a sample positions. BPM, beats, PPQ ticks, samples y frames gráficos son dominios distintos. Para precisión, programa offsets dentro del audio buffer en vez de cuantizar todo al callback o al frame.";
  }
  if (query.includes("musica procedural") || query.includes("música procedural") || query.includes("generative music") || query.includes("musica generativa") || query.includes("música generativa")) {
    return "Música procedural usa reglas, estado, restricciones y a veces azar para generar estructura. Random no equivale a composición: modela escala temporal, forma, armonía/densidad y guarda seed + versión + parámetros si necesitas reproducibilidad.";
  }
  if (query.includes("adsr") || query.includes("envelope") || query.includes("envolvente")) {
    return "ADSR separa attack, decay, sustain y release. Sustain suele ser un nivel, no una duración. Note-off puede llegar durante attack/decay y la política de retrigger debe declararse; la curva lineal/exponencial cambia el resultado perceptual.";
  }
  if (query.includes("oscilador") || query.includes("oscillator") || query.includes("saw") || query.includes("square wave") || query.includes("onda cuadrada") || query.includes("onda sierra")) {
    return "Un oscilador digital necesita fase persistente entre buffers. Δfase=f/Fs por sample en fase normalizada. Saw/square ideales tienen armónicos sobre Nyquist, así que una implementación ingenua puede aliasar; band-limiting/oversampling/PolyBLEP son estrategias distintas para mitigarlo.";
  }
  if (query.includes("procedural audio") || query.includes("audio procedural") || query.includes("adsr") || query.includes("oscilador") || query.includes("sintesis") || query.includes("síntesis")) {
    return "Audio procedural genera señal desde estado y parámetros. Osciladores deben mantener fase entre buffers; saw/square ingenuas pueden aliasar por armónicos sobre Nyquist. ADSR controla envolvente y sustain es un nivel, no una duración fija por definición.";
  }
  if (query.includes("adaptive music") || query.includes("musica adaptativa") || query.includes("música adaptativa") || query.includes("stem") || query.includes("beat sync") || query.includes("transicion musical") || query.includes("transición musical")) {
    return "La música interactiva puede cambiar por stems o segmentos. Agenda transiciones contra el reloj de audio y cuantízalas a beat/bar; no confíes en el frame de render para precisión musical. Pre-roll y streaming deben estar listos antes de la frontera.";
  }
  if (query.includes("voice stealing") || query.includes("virtual voice") || query.includes("virtualizacion de voces") || query.includes("virtualización de voces") || query.includes("voice management")) {
    return "Cuando las voces lógicas superan el budget físico, virtualiza o roba voces según audibilidad e importancia. Una voz virtual puede conservar playhead lógico para reactivarse coherentemente; voice stealing suele usar fades para evitar discontinuidades.";
  }
  if (query.includes("resampling") || query.includes("resampler") || query.includes("playback rate") || query.includes("pitch shift") || query.includes("time stretch")) {
    return "Playback rate cambia la velocidad temporal y normalmente también pitch. Resampling convierte entre grids de sample rate; pitch-shift/time-stretch intentan desacoplar pitch y duración. Interpoladores baratos pueden introducir imágenes/aliasing, así que calidad, CPU y latencia son trade-offs.";
  }

  // Señales y FFT: separar fenómeno, muestreo, representación y algoritmo.
  if (query.includes("fft") || query.includes("dft") || query.includes("bin spacing") || query.includes("bin de frecuencia")) {
    return "La DFT es la transformación matemática de N muestras en N coeficientes; FFT es una familia de algoritmos para calcularla eficientemente. El bin k corresponde a k·fs/N antes de reinterpretar la mitad superior como frecuencias negativas. Zero-padding densifica la rejilla, pero no añade duración observada ni elimina leakage.";
  }
  if (query.includes("fourier") || query.includes("transformada de fourier") || query.includes("serie de fourier")) {
    return "Fourier representa señales mediante exponenciales complejas. Serie de Fourier y transformada están relacionadas, pero no son literalmente la misma fórmula sobre el mismo tipo de señal. Desplazar en tiempo cambia fase espectral; convolucionar en tiempo corresponde a multiplicar en frecuencia, con factores según convención.";
  }
  if (query.includes("convolucion") || query.includes("convolución") || query.includes("respuesta al impulso")) {
    return "En un sistema LTI, y=x*h. Para secuencias finitas, la convolución lineal de longitudes L y M tiene longitud L+M−1. Multiplicar DFTs del mismo tamaño produce convolución circular; zero-padding suficiente permite obtener la lineal mediante FFT sin wrap-around.";
  }
  if (query.includes("sampling") || query.includes("muestreo") || query.includes("nyquist") || query.includes("aliasing")) {
    return "Muestrear a fs replica el espectro cada fs en el modelo ideal. Para una señal estrictamente bandlimited a B, fs>2B permite reconstrucción ideal bajo las hipótesis de Nyquist-Shannon. Frecuencia de Nyquist=fs/2; tasa de Nyquist de la señal=2B. El aliasing ya ocurrido no se deshace simplemente haciendo upsampling.";
  }
  if (query.includes("ventana") || query.includes("windowing") || query.includes("leakage") || query.includes("fuga espectral") || query.includes("espectro")) {
    return "Observar un tramo finito equivale a multiplicar por una ventana, que convoluciona el espectro con el de esa ventana. Leakage no es un bug de la FFT. Hann/Hamming/Blackman intercambian anchura de lóbulo principal, sidelobes y ganancia; declara ventana, fs, N y normalización antes de comparar espectros.";
  }
  if (query.includes("fir") || query.includes("iir") || query.includes("filtro digital") || query.includes("low-pass") || query.includes("low pass")) {
    return "FIR tiene respuesta al impulso finita; IIR usa realimentación y puede ser estable o inestable. En un sistema causal racional discreto estándar, polos dentro del círculo unidad son compatibles con estabilidad BIBO. Diseñar un filtro exige banda, transición, ripple/atenuación, fase, coste y latencia.";
  }
  if (query.includes("sample rate") || query.includes("bit depth") || query.includes("audio digital") || query.includes("dbfs")) {
    return "Sample rate controla el eje temporal y la banda representable bajo las hipótesis de muestreo; bit depth controla cuantización/rango dinámico idealizado. Son parámetros distintos. En PCM bruto: bitrate=fs·bits_por_muestra·canales. dBFS usa full-scale como referencia; 0 dBFS no es silencio.";
  }
  if (query.includes("stft") || query.includes("espectrograma") || query.includes("spectrogram")) {
    return "La STFT calcula DFTs sobre ventanas solapadas para obtener una representación tiempo-frecuencia. Ventanas más largas suelen mejorar discriminación frecuencial y empeorar localización temporal. Hop size controla muestreo temporal/coste; ventana y normalización determinan amplitudes interpretables.";
  }
  if (query.includes("frecuencia espacial") || query.includes("fourier 2d") || query.includes("imagen") && query.includes("frecuencia")) {
    return "Una imagen puede tratarse como señal 2D: sus frecuencias son espaciales, por ejemplo ciclos/píxel. La DFT 2D descompone variación horizontal/vertical; altas frecuencias pueden ser detalle, bordes, ruido o artefactos. Convolución 2D y condiciones de frontera determinan muchos filtros de imagen.";
  }
  if (query.includes("lti") || query.includes("lineal invariante") || query.includes("respuesta en frecuencia")) {
    return "En un sistema LTI, las exponenciales complejas son funciones propias: una componente e^{jωt} sale multiplicada por H(ω), conservando frecuencia y cambiando amplitud/fase. Esto depende de linealidad e invariancia temporal; saturación, modulación u otras no linealidades rompen ese modelo.";
  }


  // Cálculo: separar existencia, derivada total y aproximación numérica.
  if (query.includes("epsilon") || query.includes("épsilon") || query.includes("limite") || query.includes("límite")) {
    return "Un límite describe el comportamiento cerca del punto, no el valor puntual. En ε-δ: para todo ε>0 existe δ>0 tal que 0<|x-a|<δ implica |f(x)-L|<ε. Formas como 0/0 son indeterminaciones, no resultados.";
  }
  if (query.includes("continuidad") || query.includes("valor intermedio") || query.includes("valor extremo")) {
    return "Continuidad en a exige valor, límite y coincidencia. El valor intermedio da existencia de valores intermedios bajo continuidad; no da unicidad. El valor extremo necesita compacidad del intervalo cerrado y acotado en el caso estándar.";
  }
  if (query.includes("derivada") && !query.includes("parcial") && !query.includes("direccional")) {
    return "La derivada es el límite del cociente incremental y la mejor aproximación lineal local: f(a+h)=f(a)+f'(a)h+o(h). Derivabilidad implica continuidad; la recíproca no. Un punto crítico f'=0 no tiene por qué ser extremo.";
  }
  if (query.includes("regla de la cadena") || query.includes("derivacion implicita") || query.includes("derivación implícita")) {
    return "La regla de la cadena compone sensibilidades: (f∘g)'=f'(g)g'. Implícitamente, F(x,y(x))=0 produce F_x+F_y y'=0 cuando las derivadas existen. En varias variables, la cadena se convierte en producto de Jacobianos.";
  }
  if (query.includes("teorema fundamental") || query.includes("integral") || query.includes("riemann") || query.includes("simpson") || query.includes("trapecio")) {
    return "La integral definida es una acumulación/área firmada como límite de sumas. El Teorema Fundamental conecta acumulación y derivación. Una cuadratura numérica imprime una aproximación; para certificar precisión hace falta un control de error bajo hipótesis del método.";
  }
  if (query.includes("serie") || query.includes("convergencia") || query.includes("cociente") || query.includes("p-series") || query.includes("p series")) {
    return "a_n→0 es necesario pero no suficiente para que Σa_n converja. Convergencia absoluta sí implica convergencia. Los tests de cociente/raíz son inconclusos en su caso límite L=1; usa otro criterio en vez de forzar una conclusión.";
  }
  if (query.includes("taylor") || query.includes("maclaurin") || query.includes("radio de convergencia")) {
    return "Taylor iguala derivadas locales: P_n(x)=Σ f^(k)(a)(x-a)^k/k!. Ser C∞ no implica ser analítica. Para garantizar una tolerancia necesitas información sobre el resto/error, no solo truncar y confiar en los decimales.";
  }
  if (query.includes("derivada parcial") || query.includes("diferenciabilidad") || query.includes("multivariable")) {
    return "En varias variables, tener todas las parciales en un punto no garantiza diferenciabilidad total. Diferenciabilidad significa que existe un mapa lineal L con f(a+h)=f(a)+Lh+o(||h||). Probar algunos caminos puede refutar un límite, no demostrarlo en general.";
  }
  if (query.includes("gradiente") || query.includes("derivada direccional") || query.includes("curva de nivel")) {
    return "Para f:R^n→R diferenciable, D_u f=∇f·u. Con ||u||=1, el gradiente da la dirección de máximo crecimiento euclídeo y es normal a una superficie de nivel regular. Sin normalizar u, la escala del vector también escala la tasa.";
  }
  if (query.includes("jacobiano") || query.includes("jacobian") || query.includes("diferencial total")) {
    return "Para F:R^n→R^m, el Jacobiano representa la derivada lineal local y tiene tamaño m×n bajo la convención estándar. La cadena es J_{G∘F}=J_G(F)J_F. det J≠0 en dimensión cuadrada da invertibilidad local bajo hipótesis, no global.";
  }
  if (query.includes("integral doble") || query.includes("integral multiple") || query.includes("integral múltiple") || query.includes("fubini") || query.includes("polares") || query.includes("cambio de variables")) {
    return "En integrales múltiples el dominio forma parte del integrando geométrico. Fubini/Tonelli requieren hipótesis; cambiar el orden obliga a redescribir la región. En x=T(u), el elemento de volumen incorpora |det J_T|; en polares dA=r dr dθ.";
  }
  if (query.includes("hessiano") || query.includes("hessian") || query.includes("punto silla") || query.includes("segundo orden")) {
    return "En un punto crítico, Hessiano positivo definido implica mínimo local estricto, negativo definido máximo e indefinido silla. Si es semidefinido o singular, el test de segundo orden puede ser inconcluso; hay que mirar órdenes superiores u otra estructura.";
  }
  if (query.includes("ecuacion diferencial") || query.includes("ecuación diferencial") || query.includes("euler explicito") || query.includes("euler explícito") || query.includes("ode")) {
    return "Una ODE + condición inicial define un problema de valor inicial. Existencia/unicidad requieren hipótesis; una fórmula cerrada no sustituye ese análisis. Euler explícito y otros métodos tienen regiones de estabilidad: un paso grande puede crear inestabilidad numérica que no existe en la dinámica real.";
  }


  // Probabilidad y estadística: distinguir modelo, muestreo, asociación e inferencia.
  if (query.includes("espacio muestral") || query.includes("axioma") || query.includes("evento imposible")) {
    return "Un espacio de probabilidad separa resultados Ω, eventos y una medida P. P(A)=0 no siempre significa imposibilidad lógica en modelos continuos; complemento e inclusión-exclusión se derivan de los axiomas.";
  }
  if (query.includes("variable aleatoria") || query.includes("pmf") || query.includes("pdf") || query.includes("cdf") || query.includes("densidad")) {
    return "Una variable aleatoria es una función X:Ω→R. En discreto, una PMF asigna masa puntual; en continuo, una PDF es densidad y P(X=x)=0 típicamente. La CDF F(x)=P(X≤x) funciona en ambos casos.";
  }
  if (query.includes("binomial") || query.includes("poisson") || query.includes("exponencial") || query.includes("bernoulli") || query.includes("distribucion") || query.includes("distribución")) {
    return "Elige distribución por mecanismo y supuestos: Bernoulli para un ensayo binario, Binomial para suma de ensayos iid Bernoulli, Poisson para conteos bajo una tasa y Exponencial para ciertos tiempos de espera memoryless. Ajustar la media no valida el modelo.";
  }
  if (query.includes("esperanza") || query.includes("varianza") || query.includes("valor esperado")) {
    return "La esperanza es lineal sin requerir independencia. Var(aX+b)=a²Var(X). Para sumas, Var(X+Y)=Var(X)+Var(Y)+2Cov(X,Y), por lo que la dependencia importa en la dispersión.";
  }
  if (query.includes("covarianza") || query.includes("independencia") || query.includes("correlacion cero") || query.includes("correlación cero")) {
    return "Independencia implica covarianza cero si existen segundos momentos, pero la recíproca falla en general: puede haber dependencia no lineal con correlación cero. En gaussianas conjuntas, covarianza cero sí tiene consecuencias más fuertes.";
  }
  if (query.includes("bayes") || query.includes("probabilidad condicionada") || query.includes("tasa base") || query.includes("likelihood ratio")) {
    return "P(A|B)=P(A∩B)/P(B) y no es lo mismo que P(B|A). Bayes combina likelihood y prior: posterior ∝ likelihood×prior. Ignorar la tasa base puede hacer que una prueba muy sensible tenga un valor predictivo positivo modesto.";
  }
  if (query.includes("gauss") || query.includes("normal multivariante") || query.includes("z-score") || query.includes("z score")) {
    return "N(μ,σ²) usa σ² como varianza; z=(x−μ)/σ estandariza. En multivariante, μ y Σ controlan centro y geometría; una transformación lineal de un vector gaussiano conjunto sigue siendo gaussiana.";
  }
  if (query.includes("ley de los grandes") || query.includes("clt") || query.includes("teorema central") || query.includes("muestreo") || query.includes("error estandar") || query.includes("error estándar")) {
    return "LLN dice que promedios se estabilizan hacia la esperanza bajo hipótesis; CLT describe la distribución normalizada de sumas/promedios, no vuelve normales los datos originales. Más n reduce error aleatorio, pero no corrige sesgo de selección.";
  }
  if (query.includes("estimador") || query.includes("estimacion") || query.includes("estimación") || query.includes("mle") || query.includes("verosimilitud") || query.includes("bias")) {
    return "Un estimador es una variable aleatoria antes de ver datos. MSE=Var+Bias² y expone el trade-off sesgo-varianza. MLE maximiza p(datos|θ); no es una posterior P(θ|datos) sin prior y normalización.";
  }
  if (query.includes("intervalo de confianza") || query.includes("cobertura") || query.includes("confidence interval")) {
    return "Un IC frecuentista 95% es un procedimiento con ~95% de cobertura bajo el modelo en repetición. Tras observar el intervalo, no significa automáticamente P(θ dentro)=0.95; esa es una interpretación posterior distinta.";
  }
  if (query.includes("p-value") || query.includes("p value") || query.includes("hipotesis") || query.includes("hipótesis") || query.includes("potencia") || query.includes("tipo i") || query.includes("tipo ii")) {
    return "Un p-value es P(resultado al menos tan extremo | H0 y modelo), no P(H0|datos). α controla un error tipo I del procedimiento; potencia depende de la alternativa. Significancia no sustituye tamaño de efecto ni relevancia práctica.";
  }
  if (query.includes("pearson") || query.includes("spearman") || query.includes("correlacion") || query.includes("correlación")) {
    return "Pearson mide asociación lineal estandarizada; Spearman usa rangos y asociación monótona. Correlación alta no demuestra causalidad y correlación cero no descarta relaciones no lineales. Visualiza la distribución conjunta.";
  }
  if (query.includes("regresion") || query.includes("regresión") || query.includes("ols") || query.includes("residuales") || query.includes("r2") || query.includes("r²")) {
    return "OLS minimiza la suma de cuadrados residuales. Los coeficientes son asociaciones condicionales dentro del modelo, no efectos causales automáticos. Revisa residuales, heterocedasticidad, dependencia y especificación; R² alto no certifica validez.";
  }


  // Bloque 063 — Transformers. Antes de Deep Learning genérico para que
  // Q/K/V, masking y encoder/decoder conserven su contrato específico.
  // Bloque 066 — Modelos Generativos. Antes de RL/LLM/Deep Learning genéricos.
  if (query.includes("latent diffusion") || query.includes("difusion latente") || query.includes("difusión latente")) return "Latent diffusion ejecuta el proceso generativo principal en una representación comprimida producida por un encoder y luego decodifica a píxeles. Reduce coste potencialmente, pero la calidad también queda limitada por el autoencoder; no es pixel-space diffusion con otro nombre.";
  if (query.includes("score matching") || query.includes("score-based") || query.includes("score based")) return "En modelos score-based, score suele significar ∇x log p(x): gradiente del log de densidad respecto al dato x, no respecto a los pesos θ. Denoising score matching aprende ese campo sobre datos perturbados y se conecta estrechamente con diffusion.";
  if (query.includes("mode collapse") || query.includes("colapso de modos")) return "Mode collapse describe cobertura insuficiente: el generador concentra masa en pocos modos y puede producir muestras nítidas pero poco diversas. Una loss adversarial o una galería bonita no demuestran cobertura de distribución.";
  if (query.includes("gan") || query.includes("generative adversarial") || query.includes("adversarial generativ")) return "Una GAN entrena un generador G y un discriminador D en un juego adversarial. D sirve para proporcionar señal de entrenamiento y no es necesario para muestrear con G después; estabilidad, diversidad y calidad deben evaluarse por separado.";
  if (query.includes("elbo") || query.includes("reparameter") || query.includes("reparametr")) return "La ELBO es una cota inferior del log-likelihood marginal y combina un término esperado de reconstrucción/likelihood con regularización KL. La reparameterización mueve la aleatoriedad a ε para permitir gradientes respecto a parámetros de q(z|x); ELBO no es el likelihood exacto en general.";
  if (query.includes("vae") || query.includes("variational autoencoder") || query.includes("autoencoder variacional")) return "Un VAE modela q(z|x) probabilísticamente y un decoder p(x|z), regularizando el latent hacia un prior mediante un objetivo variacional. No es solo un autoencoder al que se añade ruido.";
  if (query.includes("autoencoder") || query.includes("bottleneck") && query.includes("latent")) return "Un autoencoder aprende encoder→latent→decoder para reconstrucción. Reconstruir bien no garantiza que puntos arbitrarios del espacio latente produzcan muestras válidas; un autoencoder determinista no es automáticamente un modelo generativo probabilístico.";
  if (query.includes("diffusion") || query.includes("difusion") || query.includes("difusión") || query.includes("denoising")) return "Diffusion define un proceso forward de ruido y aprende información para invertirlo/denoise durante sampling. El forward conocido no es la generación; el muestreo suele requerir múltiples evaluaciones secuenciales, y más pasos no garantizan calidad monótonamente mejor.";
  if (query.includes("guidance") || query.includes("conditioning") && query.includes("gener")) return "Conditioning aporta información como clase, texto o máscara; guidance modifica cómo se favorece esa condición durante sampling. Más guidance puede mejorar adherencia y simultáneamente reducir diversidad o introducir artefactos.";
  if (query.includes("modelo generativo") || query.includes("modelos generativos") || query.includes("generative model")) return "Modelo generativo es una categoría amplia: autoencoders, VAEs, GANs y diffusion tienen objetivos y samplers distintos. Generar muestras plausibles no demuestra causalidad, cobertura completa ni ausencia de memorización; declara datos, objective y protocolo de evaluación.";
  // Bloque 065 — Reinforcement Learning. Antes de fallbacks de IA/optimización
  // para separar reward, value, policy y objetivos de control.
  if (query.includes("q-learning") || query.includes("q learning") || query.includes("td control")) return "Q-learning actualiza Q(s,a) hacia r+γ max_a Q(s',a) y es off-policy en su forma tabular clásica. La policy de comportamiento puede explorar aunque el target sea greedy; sus garantías tabulares no se transfieren automáticamente a redes profundas.";
  if (query.includes("actor-critic") || query.includes("actor critic") || query.includes("advantage")) return "Actor-critic separa una policy (actor) de un estimador de valor/advantage (critic). El critic puede reducir variance y aportar bootstrapping, pero también introducir bias; compartir backbone no convierte ambas cabezas en la misma función.";
  if (query.includes("policy gradient") || query.includes("gradiente de politica") || query.includes("gradiente de política")) return "Policy gradient optimiza directamente parámetros de π(a|s), normalmente ponderando ∇logπ por return o advantage. Un baseline adecuado puede reducir variance sin cambiar la expectativa bajo sus supuestos; on-policy/off-policy depende del algoritmo concreto.";
  if (query.includes("bellman") && (query.includes("reinforcement") || query.includes("value") || query.includes("q("))) return "Bellman descompone valor en recompensa inmediata más valor futuro esperado/descontado. Es una relación recursiva o fixed point; no es por sí sola Q-learning ni un algoritmo concreto de optimización.";
  if (query.includes("exploration") || query.includes("exploitation") || query.includes("epsilon-greedy") || query.includes("epsilon greedy")) return "Exploration recopila información; exploitation usa lo ya aprendido. ε-greedy es una estrategia simple, no la definición de exploración, y explorar no justifica violar restricciones de seguridad del entorno.";
  if ((query.includes("value function") || query.includes("funcion de valor") || query.includes("función de valor") || query.includes("q-value")) && !query.includes("transform")) return "Vπ(s) es retorno esperado desde un estado siguiendo π; Qπ(s,a) condiciona además la primera acción. Reward inmediata, return observado y value estimado son objetos distintos; A=Q−V mide ventaja relativa al baseline del estado.";
  if (query.includes("reward") && (query.includes("agent") || query.includes("agente") || query.includes("reinforcement") || query.includes("rl"))) return "Reward es la señal escalar de un paso; el objetivo suele ser maximizar return esperado. Reward shaping puede acelerar aprendizaje pero también cambiar incentivos; reward alta no implica por sí sola seguridad, utilidad humana o generalización.";
  if (query.includes("markov") || ((query.includes("estado") && query.includes("observacion")) || query.includes("observación"))) return "Estado y observación no son sinónimos. Un estado Markoviano resume la información relevante para la dinámica futura; una observación puede ser parcial, en cuyo caso memoria o belief state pueden ser necesarios.";
  if (query.includes("reinforcement learning") || query.includes("aprendizaje por refuerzo") || (query.includes("agente") && query.includes("entorno"))) return "Reinforcement learning modela interacción secuencial: el agente elige acciones, el entorno produce transiciones/observaciones y reward, y la policy busca optimizar return esperado. Reward, dinámica y evaluación deben declararse por separado.";
  // Bloque 064 — LLM: priorizar semántica de entrenamiento/inferencia antes del Transformer genérico.
  if (query.includes("kv cache") || query.includes("kv-cache")) return "KV cache reutiliza keys/values de tokens previos durante decode autoregresivo para evitar recomputarlos; reduce cómputo pero consume memoria que crece con contexto y arquitectura. No elimina la atención a tokens previos.";
  if (query.includes("top-k") || query.includes("top k")) return "Top-k conserva hasta k tokens de mayor score y renormaliza. k fija un número máximo de candidatos, no una masa de probabilidad; no es equivalente a top-p.";
  if (query.includes("top-p") || query.includes("top p") || query.includes("nucleus")) return "Top-p o nucleus sampling conserva el conjunto mínimo ordenado cuya probabilidad acumulada alcanza p; su número de candidatos cambia en cada paso. No es lo mismo que top-k.";
  if (query.includes("temperature") || query.includes("temperatura") && query.includes("logit")) return "Temperature reescala logits como logits/T antes de softmax. T menor suele concentrar y T mayor aplanar la distribución; modifica decoding, no añade conocimiento ni cambia los pesos.";
  if (query.includes("rag") || query.includes("retrieval-augmented") || query.includes("retrieval augmented")) return "RAG combina retrieval externo con generación: recuperar, seleccionar/chunkear evidencia, insertarla en contexto y generar. No actualiza automáticamente los pesos; un fallo de retrieval puede limitar al generador aunque la fuente correcta exista.";
  if (query.includes("instruction tuning") || query.includes("instruction-tuning")) return "Instruction tuning adapta un modelo con ejemplos supervisados instrucción→respuesta. Es una fase/objetivo de adaptación, no una propiedad arquitectónica del Transformer ni sinónimo de pretraining.";
  if (query.includes("preference optimization") || query.includes("rlhf") || query.includes("dpo")) return "Preference optimization usa comparaciones/señales de preferencia para favorecer conductas. RLHF y métodos directos son familias diferentes; optimizar preferencias no demuestra por sí solo verdad factual o seguridad universal.";
  if (query.includes("fine-tuning") || query.includes("finetuning") || query.includes("fine tuning")) return "Fine-tuning continúa el entrenamiento sobre datos/objetivos más específicos. Puede ser full o parameter-efficient; no significa siempre actualizar todos los pesos y puede cambiar capacidades previas.";
  if (query.includes("quantization") || query.includes("cuantizacion") || query.includes("cuantización")) return "Cuantización representa pesos/activaciones/KV con menor precisión o formatos compactos. Reduce memoria potencialmente, pero metadata, escalas, kernels y hardware determinan el ahorro y la velocidad reales.";
  if (query.includes("distributed training") || query.includes("tensor parallel") || query.includes("data parallel") || query.includes("pipeline parallel")) return "Entrenamiento distribuido puede repartir datos, tensores o etapas. La comunicación y sincronización impiden asumir speedup lineal: mide eficiencia de escala, memoria por worker y coste de collectives.";
  if (query.includes("context window") || query.includes("ventana de contexto")) return "La ventana de contexto limita posiciones/tokens procesables en una invocación; no es memoria permanente ni garantiza que información distante se use perfectamente. Más contexto también aumenta memoria y cómputo.";
  if (query.includes("next-token") || query.includes("next token") || query.includes("siguiente token")) return "Next-token prediction entrena un modelo causal para predecir x[t+1] desde el prefijo permitido. Teacher forcing permite calcular muchas pérdidas en paralelo durante training, pero generation sigue siendo autoregresiva entre tokens.";
  if (query.includes("pretraining") || query.includes("preentrenamiento")) return "Pretraining optimiza un objetivo amplio sobre gran cantidad de datos antes de adaptaciones específicas. No equivale a instruction following, fine-tuning ni conocimiento perfecto; calidad, mezcla y contaminación de datos importan.";
  if (query.includes("sampling") || query.includes("muestreo") && query.includes("llm")) return "Sampling es una política de decodificación aplicada a la distribución de salida. Greedy, temperature, top-k y top-p cambian cómo se elige el siguiente token sin reentrenar necesariamente el modelo.";
  if (query.includes("scaling law") || query.includes("scaling laws") || query.includes("leyes de escalado")) return "Las scaling laws de LLM son relaciones empíricas entre loss y recursos como parámetros, datos y compute bajo un régimen experimental. Son tendencias útiles para presupuestar, no garantías universales de que más parámetros siempre mejoren.";
  if (query.includes("token") && (query.includes("transformer") || query.includes("tokenizacion") || query.includes("tokenización"))) {
    return "Un token es una unidad discreta definida por el tokenizer; no equivale necesariamente a palabra. El Transformer opera sobre IDs/embeddings, y cambiar tokenizer cambia vocabulario, longitud y compatibilidad con la tabla de embeddings.";
  }
  if (query.includes("positional") || query.includes("posicion") || query.includes("posición") || query.includes("rope")) {
    return "Self-attention base no incorpora por sí sola un orden absoluto. El Transformer original suma positional encodings sinusoidales; posiciones aprendidas, relativas o RoPE son variantes posteriores. Información posicional e identidad del token son señales distintas.";
  }
  if (query.includes("query") || query.includes("key") || query.includes("value") || query.includes("qkv") || query.includes("q/k/v")) {
    return "En una cabeza típica Q=XW_Q, K=XW_K y V=XW_V. Q y K producen scores de compatibilidad; tras mask+softmax, esos pesos combinan V. En self-attention parten de la misma secuencia; en cross-attention Q puede venir del decoder y K/V del encoder.";
  }
  if (query.includes("self-attention") || query.includes("self attention") || query.includes("scaled dot") || query.includes("sqrt(d") || query.includes("sqrt d")) {
    return "Scaled dot-product attention usa softmax(QK^T/√d_k)V, aplicando antes el masking necesario. Para longitud n la matriz densa de scores es n×n por cabeza. El escalado controla la magnitud típica de logits; attention weights no prueban causalidad ni explicación humana.";
  }
  if (query.includes("multi-head") || query.includes("multihead") || query.includes("cabezas de atencion") || query.includes("cabezas de atención")) {
    return "Multi-head attention calcula varias atenciones con proyecciones aprendidas, concatena sus salidas y aplica una proyección final. Con d_model divisible por h suele usarse d_head=d_model/h. Más heads no garantiza más calidad y no son Transformers independientes.";
  }
  if ((query.includes("ffn") || query.includes("feed-forward") || query.includes("feed forward")) && query.includes("transform")) {
    return "La FFN Transformer se aplica por posición con pesos compartidos: típicamente d_model→d_ff→d_model con una no linealidad. Attention mezcla información entre posiciones; la FFN mezcla features dentro de cada posición.";
  }
  if (query.includes("layernorm") || query.includes("layer norm") || query.includes("pre-norm") || query.includes("pre norm") || query.includes("post-norm") || query.includes("post norm")) {
    return "LayerNorm normaliza features dentro de cada ejemplo/posición y aprende gamma/beta; no depende de estadísticas de minibatch como BatchNorm clásica. Pre-norm y post-norm colocan la normalización en lugares diferentes respecto a residual/subcapa y no son algebraicamente idénticos.";
  }
  if (query.includes("encoder") && query.includes("transform")) {
    return "El encoder Transformer original apila self-attention no causal sobre la entrada y FFN, con residuals y LayerNorm. Puede usar padding mask sin causal mask. Encoder-only describe el backbone; una tarea puede añadir heads de clasificación u otras salidas.";
  }
  if (query.includes("decoder") && query.includes("transform")) {
    return "El decoder original usa masked self-attention, cross-attention hacia la memoria del encoder y FFN. Un decoder-only moderno puede omitir cross-attention, así que no conviertas la arquitectura encoder-decoder de 2017 en definición universal de todo decoder Transformer.";
  }
  if (query.includes("causal mask") || query.includes("causal masking") || query.includes("mascara causal") || query.includes("máscara causal")) {
    return "La causal mask bloquea posiciones futuras en self-attention autoregresiva; padding mask excluye relleno y resuelve otro problema. Una máscara triangular de longitud n permite n(n+1)/2 pares incluyendo diagonal. Esto restringe flujo de información, no demuestra causalidad del mundo real.";
  }
  // Bloque 062 — Deep Learning. Antes de la red neuronal genérica para que
  // CNN/RNN/attention/embeddings no se diluyan en respuestas de MLP o estadística.
  if (query.includes("convolution") || query.includes("convolucion") || query.includes("convolución") || query.includes("kernel") && query.includes("stride")) {
    return "Una convolución comparte un kernel sobre posiciones espaciales. El shape depende de kernel, padding, stride y dilation; los parámetros dependen además de canales de entrada/salida. Weight sharing reduce parámetros, pero convolution no significa automáticamente invariancia ni ausencia de aliasing.";
  }
  if (query.includes("cnn") || query.includes("convolutional neural") || query.includes("red convolucional") || query.includes("receptive field")) {
    return "Una CNN combina localidad y weight sharing para construir features jerárquicas. El receptive field teórico crece con capas/stride/dilation, pero no es idéntico al receptive field efectivo. Más profundidad o receptive field no garantizan mejor generalización.";
  }
  if (query.includes("pooling") || query.includes("max pool") || query.includes("average pool") || query.includes("downsampling")) {
    return "Pooling agrega vecindarios y reduce resolución; max y average pooling conservan información distinta. Downsampling puede introducir aliasing si se eliminan frecuencias espaciales demasiado altas, así que pooling no es un sustituto universal de un filtro anti-aliasing.";
  }
  if (query.includes("lstm") || query.includes("forget gate") || query.includes("cell state")) {
    return "LSTM añade cell state y gates de entrada/olvido/salida para controlar el flujo recurrente. Facilita dependencias largas y el flujo de gradiente frente a una RNN simple, pero no ofrece memoria infinita ni elimina automáticamente vanishing/exploding gradients.";
  }
  if (query.includes("gru") || query.includes("update gate") || query.includes("reset gate")) {
    return "GRU es una unidad recurrente gated más compacta que LSTM, normalmente con update/reset gates y un estado principal. Menos gates no implica que sea universalmente más rápida o mejor; coste, implementación y tarea deciden.";
  }
  if (query.includes("rnn") || query.includes("recurrente") || query.includes("bptt") || query.includes("backpropagation through time")) {
    return "Una RNN comparte parámetros a través del tiempo y actualiza h_t=f(h_{t-1},x_t). BPTT desenrolla la recurrencia para calcular gradientes. Truncar BPTT limita el horizonte por el que viaja el gradiente; no obliga necesariamente a borrar el estado forward.";
  }
  if (query.includes("attention") || query.includes("atencion") || query.includes("atención")) {
    return "Attention calcula compatibilidades, normaliza pesos y combina valores relevantes para una consulta. Attention genérica no es necesariamente self-attention ni causal; esos detalles dependen de de dónde salen consultas/claves/valores y del masking. Q/K/V y multi-head se desarrollan en el Bloque 063.";
  }
  if (query.includes("embedding") || query.includes("representacion aprendida") || query.includes("representación aprendida")) {
    return "Un embedding es una tabla o función que asigna elementos discretos a vectores aprendibles. Su geometría refleja regularidades inducidas por datos y objetivo; similitud vectorial no equivale a significado humano fijo o universal.";
  }
  if (query.includes("representation learning") || query.includes("transfer learning") || query.includes("feature aprendida")) {
    return "Representation learning permite que el modelo aprenda features internas útiles para el objetivo. Evalúa esas representaciones por transferencia, probes, robustez y ablations; una visualización 2D o una correlación aislada no demuestra que una neurona represente un concepto humano inequívoco.";
  }
  if (query.includes("residual") || query.includes("skip connection") || query.includes("gradient checkpoint") || query.includes("mixed precision")) {
    return "Residual connections, normalización, mixed precision y checkpointing resuelven problemas distintos. Un residual y=F(x)+x facilita rutas de información/gradiente; checkpointing intercambia memoria por recomputación y mixed precision exige cuidar rango/acumulación. Ninguna técnica garantiza convergencia por sí sola.";
  }
  if (query.includes("causal mask") || query.includes("masking") && query.includes("sequence")) {
    return "El masking define qué posiciones pueden aportar información. Causal mask bloquea el futuro; padding mask excluye relleno. Attention no es causal automáticamente y una RNN bidireccional tampoco sirve para un escenario causal online sin cambiar el contrato de información.";
  }

  // Bloque 061 — Redes Neuronales desde cero. Prioridad antes de ML genérico.
  if (query.includes("backprop") || query.includes("backpropagation") || query.includes("reverse-mode")) {
    return "Backpropagation es diferenciación en modo reverso sobre el grafo computacional: reutiliza valores del forward y propaga adjoints desde la loss hacia parámetros. No es gradient descent; el optimizador consume los gradientes que backprop calcula.";
  }
  if (query.includes("chain rule") || query.includes("regla de la cadena") || query.includes("grafo computacional")) {
    return "La regla de la cadena compone derivadas locales. En un grafo con ramas, una variable puede influir por varios caminos y sus contribuciones al gradiente se acumulan. Backprop organiza esta aplicación de chain rule eficientemente.";
  }
  if (query.includes("batch normalization") || query.includes("batchnorm") || query.includes("batch norm")) {
    return "BatchNorm usa estadísticas del minibatch durante training y estadísticas acumuladas/estimadas durante inference, además de parámetros gamma y beta. Modo train y eval no son intercambiables.";
  }
  if (query.includes("xavier") || query.includes("he initialization") || query.includes("inicializacion") && query.includes("peso")) {
    return "La inicialización controla la escala con la que activaciones y gradientes atraviesan capas. Inicializar todos los pesos iguales rompe mal la simetría; esquemas Xavier/He escalan según fan-in/fan-out y activación, pero no garantizan convergencia.";
  }
  if (query.includes("perceptron") || query.includes("perceptrón") || query.includes("xor") && query.includes("lineal")) {
    return "El perceptrón aprende una frontera lineal mediante actualizaciones sobre errores cuando los datos son linealmente separables. XOR no es linealmente separable en sus dos entradas originales; una red con capa oculta y no linealidad puede representarlo.";
  }
  if (query.includes("relu") || query.includes("sigmoid") || query.includes("tanh") || query.includes("activacion") || query.includes("activación")) {
    return "Las activaciones introducen no linealidad. Sin ellas, componer capas afines sigue dando una transformación afín. Sigmoid/tanh pueden saturar; ReLU evita parte de ese problema pero puede dejar unidades con gradiente cero en regiones negativas.";
  }
  if (query.includes("forward pass") || query.includes("pasada forward") || query.includes("propagacion hacia adelante") || query.includes("propagación hacia adelante")) {
    return "El forward pass calcula activaciones capa por capa y produce predicciones/loss. Para backprop suelen conservarse intermediarios necesarios; shapes y broadcasting forman parte del contrato y deben verificarse explícitamente.";
  }
  if (query.includes("neurona artificial") || query.includes("neural network") || query.includes("red neuronal") || query.includes("mlp")) {
    return "Una neurona típica calcula z=w·x+b y aplica una activación. Una MLP compone muchas de estas transformaciones. Arquitectura, pesos, loss y optimizador son piezas distintas; más capas o parámetros no garantizan mejor generalización.";
  }

  // Algoritmos y estructuras de datos: priorizar antes de criptografía porque
  // "hash", "tree" o "graph" también aparecen en otros dominios.
  // Bloque 060 — IA: fundamentos. Prioridad antes de estadística/optimización.
  if (query.includes("train test") || query.includes("train/test") || query.includes("validation set") || query.includes("test set") || query.includes("data leakage")) {
    return "Train ajusta parámetros; validation guía selección de modelo/hiperparámetros; test estima rendimiento final cuando las decisiones ya están cerradas. Consultar repetidamente el test para decidir lo convierte de facto en otro validation set. El preprocessing aprendido también debe ajustarse solo con train.";
  }
  if (query.includes("overfitting") || query.includes("underfitting") || query.includes("generalization gap") || query.includes("generalizacion") || query.includes("generalización") || query.includes("distribution shift")) {
    return "Overfitting es buen ajuste al entrenamiento con peor comportamiento fuera de muestra; underfitting es ajuste insuficiente incluso al train. Generalización es rendimiento sobre datos nuevos relevantes para la distribución objetivo. Buen test IID no garantiza robustez bajo distribution shift.";
  }
  if (query.includes("loss function") || query.includes("funcion de perdida") || query.includes("función de pérdida") || query.includes("training loss") || query.includes("surrogate loss")) {
    return "La loss convierte predicción y objetivo en una cantidad optimizable. No tiene por qué coincidir con la métrica final: puede ser un surrogate diferenciable. Una train loss menor no demuestra mejor generalización; hay que comparar validation/test bajo un protocolo fijo.";
  }
  if (query.includes("learning rate") || query.includes("gradient descent") || query.includes("sgd") || query.includes("optimizador")) {
    return "El optimizador ajusta parámetros para reducir un objetivo. En SGD, θ ← θ − ηg. El learning rate controla tamaño de paso: demasiado pequeño puede hacer training lento y demasiado grande puede volverlo inestable. Optimización y generalización son problemas distintos.";
  }
  if (query.includes("hiperparametro") || query.includes("hiperparámetro") || query.includes("parametros del modelo") || query.includes("parámetros del modelo")) {
    return "Los parámetros son valores aprendidos por el entrenamiento, como pesos y biases. Los hiperparámetros configuran modelo/proceso, como learning rate o profundidad, y normalmente se seleccionan fuera de la actualización estándar de parámetros. Más parámetros no garantiza mejor generalización.";
  }
  if (query.includes("dataset") || query.includes("leakage") || query.includes("feature") && query.includes("label")) {
    return "Un dataset es una muestra finita de un proceso/distribución, no la realidad completa. Features son entradas y labels/targets objetivos cuando existen. Calidad, cobertura, duplicados, errores de etiqueta y leakage pueden dominar el resultado incluso con un modelo sofisticado.";
  }
  if (query.includes("regularizacion") || query.includes("regularización") || query.includes("early stopping") || query.includes("data augmentation")) {
    return "Regularizar sesga el entrenamiento hacia ciertas soluciones: L1/L2, early stopping, augmentation o restricciones arquitectónicas lo hacen de formas distintas. Más regularización no siempre ayuda; puede pasar de reducir overfitting a causar underfitting.";
  }
  if (query.includes("baseline") || query.includes("accuracy") && (query.includes("desbalance") || query.includes("imbalanced"))) {
    return "Un baseline da una referencia mínima para saber si la complejidad aporta valor. Accuracy puede ocultar fallos con clases desbalanceadas; la métrica debe reflejar el coste real de errores. Compara modelos con el mismo split y preprocessing.";
  }
  if (query.includes("que significa aprender") || query.includes("qué significa aprender") || query.includes("aprendizaje automatico") || query.includes("aprendizaje automático")) {
    return "En ML, aprender se define operacionalmente: usar experiencia/datos para mejorar una métrica en una tarea. No implica consciencia ni comprensión humana. Conviene declarar siempre tarea, datos y criterio de rendimiento.";
  }
  if (query.includes("modelo parametrizado") || query.includes("inductive bias") || query.includes("sesgo inductivo")) {
    return "Un modelo puede verse como una familia de funciones fθ(x). La arquitectura define qué funciones son fáciles de representar y aporta inductive bias; los parámetros θ seleccionan una función concreta tras training. Arquitectura, pesos y optimizador son cosas diferentes.";
  }

  if (query.includes("big o") || query.includes("complejidad temporal") || query.includes("complejidad espacial") || query.includes("theta(") || query.includes("omega(")) {
    return "Declara primero qué significa n y qué caso analizas. O(g(n)) es cota superior asintótica, Ω(g(n)) inferior y Θ(g(n)) ajustada; Big O no significa por definición worst-case ni mide segundos exactos. Separa también espacio auxiliar de memoria total.";
  }
  if (query.includes("array") || query.includes("vector dinamico") || query.includes("vector dinámico") || query.includes("linked list") || query.includes("lista enlazada")) {
    if (query.includes("linked") || query.includes("enlazada")) {
      return "Una linked list da relinking O(1) solo cuando ya tienes la posición/nodo; encontrar el índice sigue siendo O(n). Su coste real incluye punteros, allocator y peor locality que un array contiguo.";
    }
    return "Un array ofrece acceso por índice O(1) bajo el modelo RAM gracias a contigüidad y cálculo de offset. Insertar en medio puede mover O(n) elementos; un dynamic array logra append O(1) amortizado mediante crecimiento geométrico, aunque algunas expansiones copien O(n).";
  }
  if (query.includes("stack") || query.includes("pila lifo")) {
    return "Stack es un ADT LIFO: push/pop actúan sobre el mismo extremo. No lo confundas con el call stack concreto de una ABI; el ADT puede implementarse sobre array o lista. En parsing/DFS la tarea más reciente queda arriba.";
  }
  if (query.includes("queue") || query.includes("cola fifo") || query.includes("ring buffer")) {
    return "Queue es FIFO; un ring buffer implementa una cola limitada sin desplazar todo tras cada dequeue. Si el productor supera sostenidamente al consumidor, una capacidad finita exige backpressure, drop o bloqueo: la cola no elimina el déficit de throughput.";
  }
  if (query.includes("hash table") || query.includes("hashmap") || query.includes("hash map") || query.includes("tabla hash") || query.includes("factor de carga") || query.includes("load factor")) {
    return "Una hash table mapea claves a buckets y necesita resolver colisiones. O(1) lookup suele ser esperado/amortizado bajo supuestos de distribución y load factor; el worst-case puede degradarse. Una colisión de tabla no equivale por sí misma a romper una función hash criptográfica.";
  }
  if (query.includes("binary search tree") || query.includes("bst") || query.includes("arbol binario de busqueda") || query.includes("árbol binario de búsqueda")) {
    return "En un BST válido, el invariante de orden guía cada comparación y las operaciones cuestan O(h). Balanceado h≈log n; un BST simple puede degenerar a h≈n. Inorder produce claves ordenadas, pero BST no significa automáticamente AVL/Red-Black.";
  }
  if (query.includes("heap") || query.includes("priority queue") || query.includes("cola de prioridad")) {
    return "Un binary heap mantiene orden parcial padre-hijos: la raíz contiene el mínimo/máximo, pero el array interno no está totalmente ordenado. Peek es O(1), insert/extract O(log n) y build-heap bottom-up es Θ(n).";
  }
  if (query.includes("trie") || query.includes("patricia") || query.includes("radix tree")) {
    return "Un trie representa claves por caminos y comparte prefijos. Buscar una clave de longitud L suele costar O(L) pasos, pero la memoria depende muchísimo de cómo representas los hijos; Patricia/radix tries comprimen cadenas de nodos con un solo hijo.";
  }
  if (query.includes("binary search") || query.includes("busqueda binaria") || query.includes("búsqueda binaria") || query.includes("lower bound") || query.includes("upper bound")) {
    return "Binary search mantiene un invariante sobre un rango ordenado/monótono y elimina aproximadamente la mitad cada paso. Define consistentemente [lo,hi) o [lo,hi]; O(log n) comparaciones no implica O(log n) si acceder al midpoint cuesta O(n), como en una linked list.";
  }
  if (query.includes("merge sort") || query.includes("quicksort") || query.includes("heap sort") || query.includes("heapsort") || query.includes("sorting") || query.includes("ordenacion") || query.includes("ordenación")) {
    return "Comparison sorting tiene una cota Ω(n log n) en el modelo general de comparaciones. Estabilidad, memoria, worst-case y locality distinguen algoritmos; counting/radix pueden superar esa cota porque explotan estructura adicional de las claves.";
  }
  if (query.includes("dynamic programming") || query.includes("programacion dinamica") || query.includes("programación dinámica") || query.includes("memoization") || query.includes("tabulation")) {
    return "DP empieza por definir estado, base cases y recurrencia. Memoization es top-down con caché; tabulation es bottom-up. Evita recomputar subproblemas solapados, pero no garantiza complejidad polinómica si el espacio de estados ya es enorme.";
  }
  if (query.includes("greedy") || query.includes("voraz") || query.includes("exchange argument")) {
    return "Greedy toma decisiones locales irrevocables. Para afirmar optimalidad global necesitas una propiedad/prueba —por ejemplo exchange argument o cut property—; que la regla parezca razonable no basta y un contraejemplo invalida una afirmación universal.";
  }
  if (query.includes("dijkstra") || query.includes("bellman-ford") || query.includes("bellman ford") || query.includes("minimum spanning") || query.includes("mst") || query.includes("union-find") || query.includes("union find") || query.includes("disjoint set") || query.includes("bfs") || query.includes("dfs")) {
    return "BFS/DFS recorren en O(V+E) con adjacency lists. BFS da shortest path por número de aristas en grafos no ponderados; Dijkstra clásico requiere pesos no negativos; Bellman-Ford admite negativos y puede detectar ciclos negativos alcanzables. MST y shortest-path tree optimizan objetivos distintos; DSU ayuda a Kruskal a mantener componentes.";
  }
  if (query.includes("grafo") || query.includes(" graph ") || query.startsWith("graph ") || query.includes("adjacency list") || query.includes("adjacency matrix")) {
    return "Un grafo modela vértices y aristas con dirección/peso según el problema. Adjacency matrix usa Θ(V²) memoria; adjacency lists suelen usar Θ(V+E) y favorecen grafos dispersos. No asumas conectividad ni simetría en grafos dirigidos.";
  }
  if (query.includes("tree") || query.includes("arbol") || query.includes("árbol")) {
    return "Un árbol es un grafo conectado y acíclico; con n>0 nodos tiene n−1 aristas. Profundidad de un nodo y altura del árbol son conceptos distintos. Un tree general no garantiza búsqueda O(log n): eso depende de invariantes/forma adicionales.";
  }

  // Criptografía: propiedad, primitiva, protocolo y lifecycle son capas distintas.
  if (query.includes("threat model") || query.includes("confidencial") || query.includes("autenticidad")) {
    return "Empieza por la propiedad: confidencialidad oculta contenido; integridad detecta cambios; autenticidad vincula datos/peer a una clave o identidad bajo un modelo. Una primitiva sólida no compensa un threat model incompleto o un endpoint comprometido.";
  }
  if (query.includes("csprng") || query.includes("drbg") || query.includes("entropia") || query.includes("random")) {
    return "Separa fuente de entropía de DRBG: la fuente aporta incertidumbre estimada y el generador determinista la expande desde estado secreto. Pasar tests estadísticos no demuestra impredecibilidad criptográfica ni crea entropía nueva.";
  }
  if (query.includes("hmac") || query.includes(" mac ") || query.startsWith("mac ")) {
    return "Un MAC autentica con clave compartida; HMAC es una construcción específica sobre hash, no hash(key||mensaje). Un tag válido no demuestra frescura: anti-replay necesita nonce/contador/estado autenticado.";
  }
  if (query.includes("sha") || query.includes("hash") || query.includes("colision") || query.includes("preimagen")) {
    return "Hash, MAC y firma no son equivalentes. Para un hash ideal n-bit, preimagen genérica ronda 2^n y colisión ~2^(n/2). Un hash sin clave no autentica frente a un atacante que puede recomputarlo.";
  }
  if (query.includes("gcm") || query.includes("aead") || query.includes("nonce")) {
    return "En AEAD separa plaintext, AAD, nonce y tag. AAD se autentica sin cifrarse. En AES-GCM reutilizar nonce con la misma clave es crítico: puede romper confidencialidad y autenticidad; el nonce no necesita ser secreto, sí cumplir el contrato del esquema.";
  }
  if (query.includes("aes") || query.includes("ecb") || query.includes("cifrado simetr")) {
    return "AES es un block cipher de bloque fijo 128 bits; AES-128/192/256 cambia el tamaño de clave. El modo de operación define cómo cifrar mensajes; ECB revela patrones y un sistema moderno suele preferir AEAD.";
  }
  if (query.includes("rsa") || query.includes("oaep") || query.includes("pss")) {
    return "No uses textbook RSA. RSA-OAEP es un esquema de cifrado y RSA-PSS uno de firma; padding/encoding forman parte de la seguridad. Para datos grandes se usa normalmente un esquema híbrido con AEAD.";
  }
  if (query.includes("diffie") || query.includes("ecdh") || query.includes("mitm")) {
    return "DH/ECDH acuerda un secreto pero no autentica por sí solo al peer. Sin firma, certificado, PSK u otro binding del transcript, un atacante activo puede hacer MITM. El shared secret suele entrar en una KDF, no convertirse directamente en todas las claves.";
  }
  if (query.includes("firma") || query.includes("ecdsa") || query.includes("eddsa")) {
    return "Una firma no es 'cifrar con la privada'. Verifica autenticidad/integridad pública bajo un esquema concreto. En ECDSA, reutilizar o sesgar el nonce puede revelar la clave privada; una firma válida tampoco demuestra por sí sola qué identidad posee esa clave.";
  }
  if (query.includes("certificado") || query.includes("pki") || query.includes("hostname") || query.includes("trust anchor")) {
    return "PKI valida más que firmas: ruta hacia un trust anchor, restricciones, vigencia, uso e identidad esperada. Una cadena matemáticamente firmada para otro hostname no autentica el hostname que pediste.";
  }
  if (query.includes("tls") || query.includes("forward secrecy") || query.includes("0-rtt") || query.includes("0rtt")) {
    return "TLS 1.3 compone (EC)DHE/PSK, autenticación, transcript y HKDF para derivar traffic secrets. Forward secrecy limita el daño de comprometer después la clave de autenticación, no protege un endpoint comprometido durante la sesión. 0-RTT tiene riesgo de replay distinto.";
  }
  if (query.includes("argon") || query.includes("password") || query.includes("salt") || query.includes("pepper")) {
    return "Para passwords evita hashes rápidos: el atacante offline también disfruta de SHA-256 rápido. Un salt único puede ser público y evita precomputación compartida; Argon2 añade coste de memoria/tiempo. Pepper, si existe, es otro secreto operacional, no sustituto del salt.";
  }
  if (query.includes("hkdf") || query.includes("kdf") || query.includes("separacion de claves")) {
    return "Una KDF deriva claves con contexto/domain separation. HKDF separa extract y expand y es útil con secretos como DH; no sustituye una password KDF memory-hard. Deriva claves distintas para usos/direcciones distintos en vez de reciclar la misma.";
  }

  return `Para esta lección (${escapeHtml(lesson.shortTitle)}), prueba a separar: <b>definición → supuesto → consecuencia</b>. Dime cuál de esas tres piezas no te cuadra y la reformulo con otro ejemplo.`;
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
        <article class="lab-card" onclick="route('lab', '${lab.id}')">
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
        <button class="back-link" onclick="route('laboratorio')">← Todos los laboratorios</button>
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
      <button class="btn btn-primary" onclick="route('inicio')">Volver al inicio</button>
    </div>
  `;
}

$$("[data-route]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    route(button.dataset.route);
    $("#sidebar").classList.remove("open");
  });
});

$("#mobileMenu").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
$("#searchTrigger").addEventListener("click", openSearch);
$("#closeSearch").addEventListener("click", closeSearch);
$("#globalSearch").addEventListener("input", event => performSearch(event.target.value));

searchOverlay.addEventListener("click", event => {
  if (event.target === searchOverlay) closeSearch();
});

document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
  if (event.key === "Escape") closeSearch();
});

$("#tutorFab").addEventListener("click", () => openTutor());
$("#closeTutor").addEventListener("click", closeTutor);

$("#tutorForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("#tutorInput");
  const question = input.value.trim();
  if (!question) return;

  $("#tutorMessages").insertAdjacentHTML(
    "beforeend",
    `<div class="msg user">${escapeHtml(question)}</div>`
  );

  input.value = "";
  const answer = tutorReply(question);

  $("#tutorMessages").insertAdjacentHTML(
    "beforeend",
    `<div class="msg ai">${answer}</div>`
  );

  $("#tutorMessages").scrollTop = $("#tutorMessages").scrollHeight;
});

window.addEventListener("hashchange", renderRoute);

// Exponemos solo las funciones que se usan desde atributos onclick del HTML generado.
Object.assign(window, {
  route,
  goSection,
  closeSearch
});

renderRoute();
