/**
 * USIC — Laboratorios interactivos
 *
 * Esta capa contiene prácticas que pueden ejecutarse enteramente en el navegador.
 * Se distingue explícitamente entre runtimes reales (JavaScript/Web) y máquinas
 * educativas (CPU/assembly y compilador USIC) para no presentar una simulación
 * como si fuera un compilador nativo.
 */

window.PRACTICAL_LABS = {
  javascript: {
    id: "javascript",
    title: "JavaScript Runner",
    badge: "Ejecución real · Web Worker",
    description: "Escribe JavaScript, ejecútalo en un Worker aislado y observa stdout, errores y tests sin salir de la universidad.",
    mode: "javascript",
    courseIds: [9, 10, 39, 57, 59, 60, 61, 62, 63, 64, 65, 66, 67, 69, 74, 75],
    starter: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log("factorial(6) =", factorial(6));`,
    tests: [
      { label: "factorial(0) === 1", expression: "factorial(0) === 1" },
      { label: "factorial(5) === 120", expression: "factorial(5) === 120" }
    ]
  },
  web: {
    id: "web",
    title: "Playground Web",
    badge: "HTML/CSS/JS · Preview real",
    description: "Edita un documento web completo y ejecútalo dentro de un iframe sandboxed. Útil para HTTP/web, UI, gráficos DOM y prototipos.",
    mode: "web",
    courseIds: [21, 24, 34, 36, 39, 45, 67, 69, 75],
    starter: `<main class="card">
  <h1>Hola, USIC</h1>
  <p id="out">Pulsa el botón.</p>
  <button onclick="document.querySelector('#out').textContent='Código ejecutado ✓'">Ejecutar interacción</button>
</main>
<style>
  body { font-family: system-ui; padding: 2rem; background: #f4f7f5; }
  .card { max-width: 34rem; padding: 2rem; background: white; border-radius: 18px; }
  button { padding: .7rem 1rem; }
</style>`
  },
  logic: {
    id: "logic",
    title: "Laboratorio de Lógica",
    badge: "Simulador educativo",
    description: "Escribe expresiones booleanas y genera su tabla de verdad. Admite !, &&, ||, ^ y paréntesis.",
    mode: "logic",
    courseIds: [1, 2, 4, 5, 28, 55, 58, 75],
    starter: "(A && !B) || C"
  },
  assembly: {
    id: "assembly",
    title: "CPU + Assembly USIC",
    badge: "Máquina educativa ejecutable",
    description: "Programa una CPU sencilla y observa registros, flags, PC y salida instrucción a instrucción. No emula x86/ARM/RISC-V: enseña el modelo común con una ISA propia y pequeña.",
    mode: "assembly",
    courseIds: [4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 26, 49, 53, 55, 74, 75],
    starter: `; suma 5 + 4 + 3 + 2 + 1
MOV R0, 5
MOV R1, 0
loop:
ADD R1, R0
SUB R0, 1
CMP R0, 0
JNZ loop
PRINT R1
HLT`
  },
  compiler: {
    id: "compiler",
    title: "Compilador USIC",
    badge: "Lexer → parser → bytecode → VM",
    description: "Compila y ejecuta un lenguaje pequeño dentro del navegador. Puedes inspeccionar tokens, AST conceptual, bytecode y salida de la VM.",
    mode: "compiler",
    courseIds: [2, 5, 6, 9, 10, 11, 28, 57, 58, 67, 69, 75],
    starter: `let x = 7;
let y = x * 6 + 1;
print y;
print (y - 3) / 2;`
  }
};

window.LESSON_LABS = {
  "asm-modelo": "assembly",
  "asm-datos-memoria": "assembly",
  "asm-aritmetica-logica": "assembly",
  "asm-comparaciones-saltos": "assembly",
  "asm-loops": "assembly",
  "proj-codificacion": ["javascript"],
  "proj-calculadora-binaria": ["javascript", "logic"],
  "proj-puertas-logicas": ["logic"],
  "proj-alu": ["logic", "assembly"],
  "proj-cpu-educativa": ["assembly"],
  "proj-programas-assembly": ["assembly"],
  "proj-emulador": ["assembly", "javascript"],
  "proj-allocator": ["javascript"],
  "proj-lenguaje": ["compiler"],
  "proj-compilador": ["compiler"],
  "proj-http-server": ["javascript", "web"],
  "proj-dns": ["javascript"],
  "proj-renderer3d": ["web", "javascript"],
  "proj-motor-grafico": ["web", "javascript"],
  "proj-videojuego": ["web", "javascript"],
  "proj-sintetizador": ["javascript"],
  "proj-demoscene": ["web", "javascript"],
  "proj-intro64k": ["web", "javascript"],
  "proj-nn-zero": ["javascript"],
  "proj-transformer": ["javascript"],
  "proj-modelo-propio": ["javascript"],
  "proj-distribuido": ["javascript"],
  "proj-final": ["compiler", "assembly", "web"]
};
