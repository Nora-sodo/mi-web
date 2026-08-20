/**
 * Validador estático del contenido pedagógico.
 *
 * Uso:
 *   node tools/validate-content.mjs
 *
 * Descubre automáticamente content/block-XXX.js. Así el validador crece con
 * el proyecto y no depende de acordarnos de editar una lista manual.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, "..");
const contentDir = path.join(rootDir, "content");

const blockFiles = fs.readdirSync(contentDir)
  .filter(name => /^block-\d{3}\.js$/.test(name))
  .sort();

const files = [
  path.join(rootDir, "data.js"),
  ...blockFiles.map(name => path.join(contentDir, name)),
  path.join(contentDir, "challenges.js")
];

const sandbox = { window: {}, console };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  vm.runInContext(source, sandbox, { filename: path.relative(rootDir, file) });
}

const { COURSES, GOAL_AREAS, LEARNING_PATHS, LESSONS, EXPERT_CHALLENGES } = sandbox.window;
const errors = [];
const warnings = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function normalize(value) {
  // Debe coincidir con normalizeAnswer() de app.js para que el validador y
  // la interfaz compartan exactamente la misma noción de respuesta equivalente.
  return String(value)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

assert(Array.isArray(COURSES) && COURSES.length === 78, "El catálogo debe contener 78 bloques.");
assert(Array.isArray(GOAL_AREAS) && GOAL_AREAS.length === 10, "Deben existir las 10 áreas de aprendizaje orientadas a objetivos.");
if (Array.isArray(GOAL_AREAS)) {
  const areaIds = new Set();
  for (const area of GOAL_AREAS) {
    assert(area.id && area.name && area.description, "Área de aprendizaje incompleta.");
    assert(!areaIds.has(area.id), `Área duplicada: ${area.id}.`);
    areaIds.add(area.id);
    assert(Array.isArray(area.blocks) && area.blocks.length > 0, `${area.id}: no tiene bloques.`);
    assert(Array.isArray(area.focus) && area.focus.length > 0, `${area.id}: no tiene núcleo prioritario.`);
    assert(new Set(area.blocks || []).size === (area.blocks || []).length, `${area.id}: contiene bloques duplicados.`);
    assert(new Set(area.focus || []).size === (area.focus || []).length, `${area.id}: contiene bloques prioritarios duplicados.`);
    for (const courseId of area.blocks || []) {
      assert(COURSES.some(course => course.id === courseId), `${area.id}: referencia bloque inexistente ${courseId}.`);
    }
    for (const courseId of area.focus || []) {
      assert(area.blocks.includes(courseId), `${area.id}: bloque prioritario ${courseId} no está incluido en la ruta.`);
    }
  }
}
assert(LEARNING_PATHS && typeof LEARNING_PATHS === "object", "Falta LEARNING_PATHS.");
assert(LESSONS && typeof LESSONS === "object", "Falta LESSONS.");

const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
for (const blockFile of blockFiles) {
  assert(indexHtml.includes(`content/${blockFile}`), `index.html no carga content/${blockFile}.`);
}

const seenLessonIds = new Set();
for (const [key, lesson] of Object.entries(LESSONS || {})) {
  assert(key === lesson.id, `La clave '${key}' no coincide con lesson.id '${lesson.id}'.`);
  assert(!seenLessonIds.has(lesson.id), `ID de lección duplicado: ${lesson.id}.`);
  seenLessonIds.add(lesson.id);

  for (const field of ["title", "shortTitle", "objective", "concept", "example", "check", "practice", "deep"]) {
    assert(Boolean(lesson[field]), `${lesson.id}: falta el campo '${field}'.`);
  }

  assert(Number.isFinite(lesson.duration) && lesson.duration > 0, `${lesson.id}: duration debe ser positivo.`);
  assert(Array.isArray(lesson.summary) && lesson.summary.length >= 3, `${lesson.id}: summary debe tener al menos 3 puntos.`);
  assert(Array.isArray(lesson.rules) && lesson.rules.length >= 3, `${lesson.id}: rules debe tener al menos 3 reglas.`);
  assert(Array.isArray(lesson.deep?.sections) && lesson.deep.sections.length >= 3, `${lesson.id}: explicación profunda insuficiente.`);
  assert(Array.isArray(lesson.practice) && lesson.practice.length >= 4, `${lesson.id}: debe haber al menos 4 ejercicios.`);

  const practiceLevels = new Set((lesson.practice || []).map(item => item.level));
  for (const level of [1, 2, 3, 4]) {
    assert(practiceLevels.has(level), `${lesson.id}: falta práctica de nivel ${level}.`);
  }

  for (const item of lesson.practice || []) {
    assert(item.prompt && item.answer !== undefined, `${lesson.id}: ejercicio sin prompt o answer.`);
    assert(item.hint, `${lesson.id}: ejercicio '${item.prompt}' no tiene pista.`);

    const alternatives = item.alternatives || [];
    const normalizedAnswer = normalize(item.answer);
    const normalizedAlternatives = alternatives.map(normalize);
    assert(!normalizedAlternatives.includes(""), `${lesson.id}: una respuesta alternativa está vacía.`);
    assert(!normalizedAlternatives.includes(normalizedAnswer), `${lesson.id}: alternativa duplicada respecto a la respuesta principal en '${item.prompt}'.`);
    assert(new Set(normalizedAlternatives).size === normalizedAlternatives.length, `${lesson.id}: alternativas duplicadas en '${item.prompt}'.`);
  }

  const correctOptions = (lesson.check?.options || []).filter(([, correct]) => correct);
  assert(correctOptions.length === 1, `${lesson.id}: la comprobación rápida debe tener exactamente una opción correcta.`);
}

for (const [courseId, pathData] of Object.entries(LEARNING_PATHS || {})) {
  const course = COURSES.find(item => item.id === Number(courseId));
  assert(course, `Ruta desarrollada para un curso inexistente: ${courseId}.`);
  assert(Number.isFinite(pathData.estimatedHours) && pathData.estimatedHours > 0, `Curso ${courseId}: estimatedHours inválido.`);
  assert(Array.isArray(pathData.outcomes) && pathData.outcomes.length >= 3, `Curso ${courseId}: faltan resultados de aprendizaje.`);

  const referenced = [];
  for (const module of pathData.modules || []) {
    assert(module.id && module.title, `Curso ${courseId}: módulo sin id o title.`);
    assert(Array.isArray(module.lessons) && module.lessons.length > 0, `Curso ${courseId}: módulo '${module.id}' vacío.`);
    for (const lessonId of module.lessons || []) {
      referenced.push(lessonId);
      assert(Boolean(LESSONS[lessonId]), `Curso ${courseId}: referencia una lección inexistente '${lessonId}'.`);
      if (LESSONS[lessonId]) {
        assert(LESSONS[lessonId].courseId === Number(courseId), `${lessonId}: courseId no coincide con la ruta ${courseId}.`);
      }
    }
  }

  if (new Set(referenced).size !== referenced.length) {
    errors.push(`Curso ${courseId}: una lección aparece más de una vez en sus módulos.`);
  }
}

for (const lesson of Object.values(LESSONS || {})) {
  if (!LEARNING_PATHS[lesson.courseId]) {
    warnings.push(`${lesson.id}: tiene contenido pero su curso ${lesson.courseId} no tiene LEARNING_PATHS.`);
  }
}

for (const [lessonId, challenge] of Object.entries(EXPERT_CHALLENGES || {})) {
  assert(Boolean(LESSONS[lessonId]), `Reto de nivel 4 huérfano: ${lessonId}.`);
  assert(challenge.prompt && challenge.answer !== undefined && challenge.hint, `${lessonId}: reto incompleto.`);
}

if (warnings.length) {
  console.warn("\nAdvertencias:");
  warnings.forEach(item => console.warn(`  - ${item}`));
}

if (errors.length) {
  console.error("\nValidación FALLIDA:");
  errors.forEach(item => console.error(`  - ${item}`));
  process.exit(1);
}

console.log(`✓ ${COURSES.length} bloques en catálogo`);
console.log(`✓ ${GOAL_AREAS.length} áreas generales de aprendizaje validadas`);
console.log(`✓ ${blockFiles.length} archivos de bloque descubiertos automáticamente`);
console.log(`✓ ${Object.keys(LEARNING_PATHS).length} bloques desarrollados`);
console.log(`✓ ${Object.keys(LESSONS).length} lecciones validadas`);
console.log("✓ rutas, IDs, preguntas, explicaciones y prácticas consistentes");
