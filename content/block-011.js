/**
 * BLOQUE 011 — Debugging y análisis de programas
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: cada herramienta se presenta por la frontera que observa.
 * Debugger, tracer, sanitizer y profiler no son sustitutos intercambiables.
 */

window.LEARNING_PATHS[11] = {
  "level": "Experto progresivo",
  "estimatedHours": 35,
  "description": "Depuración nativa y análisis de programas en ejecución o post-mortem: debuggers, tracing, instrumentación, sanitizers, profiling y metadatos.",
  "outcomes": [
    "Elegir la herramienta de observación adecuada según la capa y clase de fallo.",
    "Interpretar breakpoints, watchpoints, registros, backtraces, core dumps y mappings sin asumir correspondencias fuente-máquina inexistentes.",
    "Diagnosticar memoria, syscalls, bibliotecas, concurrencia y rendimiento con instrumentación apropiada.",
    "Construir un flujo de debugging reproducible basado en hipótesis, minimización y tests de regresión."
  ],
  "modules": [
    {
      "id": "m1-debugger",
      "title": "Debugger y estado de ejecución",
      "description": "Control, breakpoints, watchpoints y unwinding.",
      "lessons": [
        "debugger-model-gdb-lldb",
        "breakpoints-stepping",
        "watchpoints-memory",
        "registers-stack-unwinding"
      ]
    },
    {
      "id": "m2-postmortem-tracing",
      "title": "Post-mortem y fronteras",
      "description": "Cores, mapas, syscalls y bibliotecas.",
      "lessons": [
        "core-dumps-memory-maps",
        "strace-ltrace-boundaries"
      ]
    },
    {
      "id": "m3-instrumentation",
      "title": "Instrumentación y detectores",
      "description": "Valgrind y sanitizers.",
      "lessons": [
        "valgrind-dynamic-instrumentation",
        "sanitizers-asan-ubsan-tsan"
      ]
    },
    {
      "id": "m4-performance-symbols",
      "title": "Rendimiento, símbolos y metodología",
      "description": "Profiling, DWARF y debugging sistemático.",
      "lessons": [
        "profiling-perf",
        "debug-symbols-dwarf",
        "debugging-systematic-workflow"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "debugger-model-gdb-lldb": {
    "id": "debugger-model-gdb-lldb",
    "courseId": 11,
    "title": "Modelo de depuración: GDB, LLDB y control de ejecución",
    "shortTitle": "Parar el programa sin parar de pensar",
    "duration": 95,
    "objective": "explicar qué puede observar y controlar un debugger, cómo se relaciona con el proceso objetivo y cuándo una pausa cambia el fenómeno que intentamos estudiar.",
    "summary": [
      "GDB y LLDB permiten detener, continuar, inspeccionar memoria/registros y evaluar estado del programa.",
      "El debugger observa una ejecución concreta; no demuestra por sí solo propiedades universales del programa.",
      "Depurar puede perturbar temporización, concurrencia y señales, así que el observador también forma parte del experimento."
    ],
    "concept": "Un debugger es una herramienta de observación y control de un programa en ejecución o de un estado post-mortem. En sistemas tipo Unix suele apoyarse en mecanismos del sistema operativo como ptrace o equivalentes, pero la interfaz y arquitectura concretas dependen de plataforma.",
    "diagram": [],
    "rules": [
      "Distingue depuración source-level de inspección de instrucciones y registros.",
      "No confundas reproducir un fallo una vez con demostrar su causa.",
      "Anota entorno, binario, símbolos y argumentos: sin contexto, una sesión interactiva es difícil de reproducir."
    ],
    "deep": {
      "sections": [
        {
          "title": "Control del proceso",
          "body": "El debugger puede lanzar o adjuntarse a un proceso, detener threads, continuar ejecución y leer o modificar estado. La disponibilidad exacta depende del SO, permisos y target."
        },
        {
          "title": "Source level y machine level",
          "body": "Con debug info puede mapear direcciones a archivos, líneas, scopes y tipos. Sin ella sigue pudiendo inspeccionar direcciones, instrucciones y registros, aunque la reconstrucción del fuente sea limitada."
        },
        {
          "title": "Heisenbugs",
          "body": "Breakpoints, logging o single-step alteran el timing. En carreras y sistemas tiempo-real, que el bug desaparezca bajo debugger es información, no una absolución."
        }
      ],
      "commonErrors": [
        "Confiar ciegamente en el valor mostrado de una variable optimizada.",
        "Modificar estado en el debugger y olvidar que ya no observas la ejecución original."
      ],
      "connections": [
        "Bloque 006 Assembly",
        "Bloque 009 C",
        "Bloque 010 debug info"
      ]
    },
    "example": {
      "problem": "Un programa falla solo en Release. En Debug no falla.",
      "steps": [
        [
          "Paso 1",
          "Verifica que comparas el mismo input, entorno y build flags."
        ],
        [
          "Paso 2",
          "Carga el binario Release con símbolos si es posible."
        ],
        [
          "Paso 3",
          "Inspecciona assembly/estado real, no presupongas que las variables fuente siguen materializadas."
        ],
        [
          "Paso 4",
          "Considera UB, carreras o dependencias de timing antes de culpar al optimizador."
        ]
      ],
      "answer": "La diferencia Debug/Release es una pista; no una prueba de que 'el compilador esté roto'."
    },
    "check": {
      "question": "¿Que un bug desaparezca al poner un breakpoint demuestra que el bug no existe?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo en C",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El debugger puede cambiar temporización y estado observable."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un debugger puede inspeccionar registros de máquina? sí/no",
        "answer": "si",
        "hint": "Es una capacidad básica de depuración nativa."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una variable fuente optimizada tiene que existir siempre en memoria? sí/no",
        "answer": "no",
        "hint": "Puede vivir en registro, ser constante o desaparecer."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Single-step puede cambiar el timing de una carrera? sí/no",
        "answer": "si",
        "hint": "La observación perturba la ejecución."
      }
    ]
  },
  "breakpoints-stepping": {
    "id": "breakpoints-stepping",
    "courseId": 11,
    "title": "Breakpoints, stepping y control fino del flujo",
    "shortTitle": "Detenerse justo donde duele",
    "duration": 90,
    "objective": "usar breakpoints de software/hardware, condiciones y stepping entendiendo sus límites frente a optimización, threads y código generado dinámicamente.",
    "summary": [
      "Un breakpoint detiene al alcanzar una ubicación o condición; no es lo mismo que vigilar una dirección de datos.",
      "Software breakpoints suelen modificar temporalmente el código; hardware breakpoints usan recursos de depuración del procesador.",
      "step/next operan sobre una correspondencia fuente que puede volverse no intuitiva bajo optimización."
    ],
    "concept": "Los breakpoints son puntos de parada asociados a ubicaciones, símbolos o condiciones. La implementación puede usar trampas software o comparadores hardware, y la disponibilidad exacta depende de arquitectura/debugger.",
    "diagram": [],
    "rules": [
      "Breakpoint de ejecución y watchpoint de datos resuelven preguntas distintas.",
      "Una línea fuente puede corresponder a cero, una o muchas instrucciones.",
      "En multithreading, especifica si quieres detener un thread o el proceso completo cuando la herramienta lo permita."
    ],
    "deep": {
      "sections": [
        {
          "title": "Software breakpoint",
          "body": "Una técnica habitual sustituye temporalmente una instrucción por una trap, guarda la original y la restaura alrededor de la reanudación. Los detalles son dependientes de ISA y debugger."
        },
        {
          "title": "Hardware breakpoint",
          "body": "Los procesadores suelen ofrecer un número limitado de comparadores de depuración. Son útiles cuando no puedes escribir el código objetivo o necesitas ciertas clases de acceso."
        },
        {
          "title": "Stepping con optimización",
          "body": "Inlining, reordenación y eliminación de código rompen la intuición 'una línea = un paso'. next/step trabajan con debug info, no con una máquina ideal que conserva el fuente."
        }
      ],
      "commonErrors": [
        "Poner cientos de breakpoints condicionales caros en un hot loop.",
        "Interpretar un salto aparente de líneas como ejecución fuera del lenguaje."
      ],
      "connections": [
        "DWARF",
        "Optimización de compiladores"
      ]
    },
    "example": {
      "problem": "Quieres detenerte solo cuando `count == 1000` dentro de un loop muy largo.",
      "steps": [
        [
          "Paso 1",
          "Coloca breakpoint en la ubicación relevante."
        ],
        [
          "Paso 2",
          "Añade condición `count == 1000`."
        ],
        [
          "Paso 3",
          "Comprueba si el coste de evaluar la condición altera demasiado el timing."
        ],
        [
          "Paso 4",
          "Si el problema es temporal/concurrente, considera tracing o instrumentación menos intrusiva."
        ]
      ],
      "answer": "Un conditional breakpoint reduce ruido, pero no es gratis."
    },
    "check": {
      "question": "¿Un breakpoint de ejecución y un watchpoint responden exactamente a la misma pregunta?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo en LLDB",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Uno observa llegar a código; el otro observa accesos/cambios de datos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un breakpoint condicional puede filtrar paradas según una expresión? sí/no",
        "answer": "si",
        "hint": "Esa es su función."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Los hardware breakpoints/watchpoints son un recurso ilimitado? sí/no",
        "answer": "no",
        "hint": "El hardware dispone de recursos finitos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿`next` garantiza ejecutar exactamente una instrucción de CPU? sí/no",
        "answer": "no",
        "hint": "Es una operación source-level; para instrucción usa stepping de instrucción."
      }
    ]
  },
  "watchpoints-memory": {
    "id": "watchpoints-memory",
    "courseId": 11,
    "title": "Watchpoints, memoria y cambios de estado",
    "shortTitle": "¿Quién escribió aquí?",
    "duration": 85,
    "objective": "localizar quién modifica una región de memoria usando watchpoints, distinguiendo dirección, objeto fuente, tamaño y limitaciones hardware.",
    "summary": [
      "Un watchpoint puede detenerse ante lecturas/escrituras de una dirección o rango según soporte.",
      "Los watchpoints hardware suelen ser pocos y tienen restricciones de tamaño/alineación dependientes del target.",
      "Vigilar una variable fuente requiere saber dónde reside realmente en ese momento."
    ],
    "concept": "Un watchpoint responde a una pregunta causal muy útil: '¿qué instrucción accedió o modificó estos bytes?'. Es especialmente valioso para corrupción de memoria que se descubre mucho después de producirse.",
    "diagram": [],
    "rules": [
      "Vigila la dirección del objeto correcto, no una copia temporal.",
      "Comprueba lifetime: reutilización de stack/heap puede hacer que una dirección pase a representar otro objeto.",
      "Si el hardware no soporta el rango solicitado, el debugger puede rechazarlo o usar una estrategia más costosa."
    ],
    "deep": {
      "sections": [
        {
          "title": "Datos frente a nombres",
          "body": "El hardware observa direcciones y tipos de acceso, no conceptos de alto nivel. El debugger traduce una variable a una ubicación válida cuando puede."
        },
        {
          "title": "Lifetime y realloc",
          "body": "Tras free/realloc exitoso, una dirección previa puede dejar de pertenecer al objeto original. Un watchpoint antiguo puede empezar a observar memoria reutilizada."
        },
        {
          "title": "Concurrencia",
          "body": "Un watchpoint puede identificar el thread y la instrucción responsables de una escritura, lo que ayuda a separar corrupción de síntomas posteriores."
        }
      ],
      "commonErrors": [
        "Vigilar una dirección después de que termine el lifetime del objeto.",
        "Creer que un watchpoint detecta automáticamente toda corrupción relacionada con el objeto."
      ],
      "connections": [
        "C lifetime",
        "Heap",
        "Data races"
      ]
    },
    "example": {
      "problem": "`config->mode` aparece corrupto cientos de llamadas después.",
      "steps": [
        [
          "Paso 1",
          "Detente cuando `config` tenga lifetime válido."
        ],
        [
          "Paso 2",
          "Obtén la dirección real de `mode`."
        ],
        [
          "Paso 3",
          "Instala watchpoint de escritura."
        ],
        [
          "Paso 4",
          "Continúa hasta la escritura responsable e inspecciona stack/thread."
        ]
      ],
      "answer": "El watchpoint desplaza la investigación desde el síntoma hacia la escritura causal."
    },
    "check": {
      "question": "¿Un hardware watchpoint suele observar direcciones de memoria, no 'nombres de variables' como abstracción física?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ],
        [
          "Solo en x86",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El debugger traduce el nombre a una ubicación; el hardware observa accesos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un watchpoint de escritura sirve para localizar quién modifica unos bytes? sí/no",
        "answer": "si",
        "hint": "Ese es el caso típico."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una dirección sigue representando necesariamente el mismo objeto después de free? sí/no",
        "answer": "no",
        "hint": "El lifetime terminó y el allocator puede reutilizarla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Los watchpoints hardware suelen ser más escasos que los breakpoints software? sí/no",
        "answer": "si",
        "hint": "Hay un número limitado de registros/comparadores hardware."
      }
    ]
  },
  "registers-stack-unwinding": {
    "id": "registers-stack-unwinding",
    "courseId": 11,
    "title": "Registros, stack traces y unwinding",
    "shortTitle": "La pila cuenta una historia, pero puede omitir capítulos",
    "duration": 105,
    "objective": "interpretar registros, frames y backtraces distinguiendo pila física, frame lógico, frame pointer y metadatos de unwinding.",
    "summary": [
      "Un stack trace reconstruye una cadena de frames usando registros, memoria y/o unwind info.",
      "Frame pointer omission no impide necesariamente unwinding si existe información adecuada.",
      "Optimización, inlining, tail calls o corrupción de stack pueden cambiar o limitar el backtrace."
    ],
    "concept": "Un backtrace no es una lista mágica guardada por el hardware. El debugger reconstruye frames a partir del estado del thread y reglas de unwinding específicas de ABI/debug info.",
    "diagram": [],
    "rules": [
      "Distingue SP, FP y CFA: no son sinónimos universales.",
      "Un frame lógico puede existir en debug info aunque una función haya sido inlined.",
      "Un backtrace truncado puede significar falta de unwind info, corrupción o transición difícil de desenrollar."
    ],
    "deep": {
      "sections": [
        {
          "title": "Unwinding",
          "body": "Para pasar de un frame al anterior necesitas recuperar estado como PC de retorno y stack pointer previo. Esto puede apoyarse en frame pointers o tablas de unwind."
        },
        {
          "title": "Optimización",
          "body": "Tail calls pueden eliminar frames; inlining puede crear frames lógicos sin llamada física. El debugger intenta presentar una vista útil, no una fotografía literal de pushes."
        },
        {
          "title": "CFA",
          "body": "Formatos como DWARF modelan un Canonical Frame Address y reglas para ubicar registros guardados; permite unwind sin depender exclusivamente de un frame pointer encadenado."
        }
      ],
      "commonErrors": [
        "Asumir que todo frame tiene `rbp` enlazado.",
        "Leer un backtrace corrupto como verdad absoluta."
      ],
      "connections": [
        "Calling conventions",
        "DWARF",
        "Core dumps"
      ]
    },
    "example": {
      "problem": "Un crash muestra tres frames y luego `??`.",
      "steps": [
        [
          "Paso 1",
          "Comprueba símbolos y unwind info disponibles."
        ],
        [
          "Paso 2",
          "Inspecciona SP/PC y memoria alrededor del stack."
        ],
        [
          "Paso 3",
          "Busca corrupción previa o transición a código sin metadatos."
        ],
        [
          "Paso 4",
          "Correlaciona con sanitizers/core dump si es reproducible."
        ]
      ],
      "answer": "La ausencia de frames posteriores es un dato diagnóstico, no prueba de que no existieran llamadas anteriores."
    },
    "check": {
      "question": "¿Un stack trace exige siempre frame pointers encadenados explícitos?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo en x86-64",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Las tablas de unwind pueden permitir reconstrucción sin frame pointers."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un backtrace puede verse afectado por inlining? sí/no",
        "answer": "si",
        "hint": "Optimización cambia la relación fuente-máquina."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Tail-call optimization puede eliminar un frame físico intermedio? sí/no",
        "answer": "si",
        "hint": "La llamada puede convertirse en salto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un stack corrupto puede impedir unwinding fiable? sí/no",
        "answer": "si",
        "hint": "Se pueden perder datos necesarios para reconstruir frames."
      }
    ]
  },
  "core-dumps-memory-maps": {
    "id": "core-dumps-memory-maps",
    "courseId": 11,
    "title": "Core dumps y mapas de memoria: depuración post-mortem",
    "shortTitle": "El cadáver digital todavía habla",
    "duration": 105,
    "objective": "analizar un crash después de ocurrido usando core dumps, mappings, registros y módulos cargados, entendiendo qué estado queda y qué no.",
    "summary": [
      "Un core dump captura estado de proceso suficiente para análisis post-mortem según política del sistema.",
      "Los memory maps relacionan rangos virtuales con permisos, archivos/mappings y regiones anónimas.",
      "Un core no contiene el pasado completo: es una instantánea parcial del estado al producirse el evento."
    ],
    "concept": "La depuración post-mortem separa captura y análisis. El artefacto debe emparejarse con el binario, bibliotecas y símbolos correctos para que direcciones y tipos tengan sentido.",
    "diagram": [],
    "rules": [
      "Conserva build ID/hash del binario y símbolos correspondientes.",
      "ASLR cambia direcciones de carga; usa mappings y metadatos, no direcciones absolutas memorizadas.",
      "Un core puede omitir regiones por configuración, tamaño, privacidad o política."
    ],
    "deep": {
      "sections": [
        {
          "title": "Qué captura",
          "body": "Según SO/configuración puede incluir registros de threads, segmentos de memoria, mappings y notas auxiliares. El formato y selección exactos no son universales."
        },
        {
          "title": "Memory maps",
          "body": "Un mapping tiene rango virtual y permisos; puede estar respaldado por archivo o ser anónimo. Heap, stacks, shared libraries y mmap aparecen como regiones distintas."
        },
        {
          "title": "Reproducibilidad",
          "body": "Para simbolizar correctamente necesitas el ejecutable y objetos compartidos compatibles. Un core sin artefactos de build puede convertirse en una sopa hexadecimal de altísima calidad artesanal."
        }
      ],
      "commonErrors": [
        "Analizar un core con otro build del ejecutable.",
        "Suponer que todos los bytes del espacio virtual están presentes."
      ],
      "connections": [
        "ELF/loader",
        "ASLR",
        "Debug symbols"
      ]
    },
    "example": {
      "problem": "Producción entrega un core pero el binario desplegado ya fue reemplazado.",
      "steps": [
        [
          "Paso 1",
          "Obtén build ID o artefacto exacto asociado al core."
        ],
        [
          "Paso 2",
          "Recupera símbolos separados y shared libraries correspondientes."
        ],
        [
          "Paso 3",
          "Carga core + ejecutable exacto en debugger."
        ],
        [
          "Paso 4",
          "Valida mappings antes de interpretar direcciones."
        ]
      ],
      "answer": "La identidad del build es parte del dato de depuración."
    },
    "check": {
      "question": "¿Un core dump es un registro completo de toda la historia de ejecución?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo si es ELF",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Es una instantánea post-mortem, no un replay completo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Conviene conservar el binario exacto asociado a un core? sí/no",
        "answer": "si",
        "hint": "Las direcciones y símbolos dependen del build."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿ASLR puede cambiar bases de carga entre ejecuciones? sí/no",
        "answer": "si",
        "hint": "Address Space Layout Randomization."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un mapping `r-x` indica típicamente permiso de lectura y ejecución sin escritura? sí/no",
        "answer": "si",
        "hint": "Interpreta los bits de permisos."
      }
    ]
  },
  "strace-ltrace-boundaries": {
    "id": "strace-ltrace-boundaries",
    "courseId": 11,
    "title": "strace y ltrace: observar fronteras del programa",
    "shortTitle": "¿Qué le está pidiendo realmente al sistema?",
    "duration": 100,
    "objective": "usar tracing de syscalls y llamadas de bibliotecas para localizar fallos de E/S, permisos, archivos, señales y dependencias dinámicas sin confundir ambas capas.",
    "summary": [
      "strace observa interacciones proceso-kernel como syscalls, señales y ciertos cambios de estado.",
      "ltrace intercepta llamadas a bibliotecas dinámicas y puede mostrar también syscalls según opciones.",
      "Ver una función de libc no implica que exista una syscall con el mismo nombre ni una correspondencia 1:1."
    ],
    "concept": "Tracing de fronteras responde a '¿qué pidió el programa y qué devolvió la capa inferior?'. Es especialmente potente cuando no tienes fuente o el fallo está en entorno/recursos más que en cálculo interno.",
    "diagram": [],
    "rules": [
      "Interpreta retorno y errno/contexto, no solo el nombre de la syscall.",
      "No confundas wrapper de libc con syscall.",
      "Tracing puede ser costoso y alterar temporización; filtra eventos cuando sea necesario."
    ],
    "deep": {
      "sections": [
        {
          "title": "strace",
          "body": "En Linux registra syscalls, señales y estados asociados mediante mecanismos de tracing. Permite filtrar por llamadas, procesos, archivos y otras clases de eventos según versión."
        },
        {
          "title": "ltrace",
          "body": "Intercepta llamadas a bibliotecas dinámicas del proceso. Su cobertura depende del mecanismo de enlace, símbolos y plataforma; funciones inline/estáticas pueden no aparecer."
        },
        {
          "title": "Diagnóstico",
          "body": "ENOENT, EACCES, conexiones, opens inesperados o waits bloqueantes suelen saltar a la vista porque ves petición, argumentos y resultado en la frontera."
        }
      ],
      "commonErrors": [
        "Buscar con ltrace una función que fue inlined o enlazada estáticamente.",
        "Concluir causa solo por la última syscall antes de un crash."
      ],
      "connections": [
        "Syscalls",
        "Dynamic linking",
        "Linux internals"
      ]
    },
    "example": {
      "problem": "Una aplicación dice 'configuración inválida' pero sospechas que ni siquiera encuentra el archivo.",
      "steps": [
        [
          "Paso 1",
          "Ejecuta tracing filtrando aperturas/metadata de archivos."
        ],
        [
          "Paso 2",
          "Busca rutas intentadas y códigos de error."
        ],
        [
          "Paso 3",
          "Distingue ENOENT de EACCES u otros fallos."
        ],
        [
          "Paso 4",
          "Corrige entorno/ruta antes de depurar parser de configuración."
        ]
      ],
      "answer": "El tracing comprueba primero si el supuesto de 'archivo leído' era cierto."
    },
    "check": {
      "question": "¿`strace` y `ltrace` observan exactamente la misma frontera?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo difieren en color",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Syscalls y llamadas de biblioteca son capas distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿`strace` puede mostrar una syscall `openat` fallando con ENOENT? sí/no",
        "answer": "si",
        "hint": "Es un caso clásico."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Toda función de libc corresponde 1:1 a una syscall del mismo nombre? sí/no",
        "answer": "no",
        "hint": "Hay wrappers, buffering y lógica userspace."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una función enlazada estáticamente tiene que ser visible como llamada de biblioteca dinámica en ltrace? sí/no",
        "answer": "no",
        "hint": "ltrace se centra en la frontera de linking dinámico."
      }
    ]
  },
  "valgrind-dynamic-instrumentation": {
    "id": "valgrind-dynamic-instrumentation",
    "courseId": 11,
    "title": "Valgrind y Memcheck: instrumentación dinámica",
    "shortTitle": "Más lento, pero con lupa",
    "duration": 95,
    "objective": "entender cómo herramientas tipo Valgrind/Memcheck detectan accesos inválidos y uso de datos no inicializados, y cuándo elegirlas frente a sanitizers.",
    "summary": [
      "Valgrind instrumenta/ejecuta código mediante su infraestructura dinámica y Memcheck mantiene metadatos sobre memoria.",
      "Puede detectar accesos inválidos, frees incorrectos y usos de valores no inicializados en escenarios compatibles.",
      "La sobrecarga suele ser mucho mayor que sanitizers y el soporte depende de arquitectura/plataforma."
    ],
    "concept": "Memcheck observa la ejecución a nivel binario/instrumentado y mantiene shadow state para razonar sobre direccionabilidad y definición de bits. Eso le da capacidades distintas de un simple debugger.",
    "diagram": [],
    "rules": [
      "No uses 'Valgrind' como sinónimo de cualquier detector de memoria: es una suite.",
      "Una ejecución limpia no prueba ausencia de bugs en caminos no ejecutados.",
      "Compila con símbolos para diagnósticos legibles, aunque la optimización puede seguir afectando la correspondencia fuente."
    ],
    "deep": {
      "sections": [
        {
          "title": "Shadow state",
          "body": "Memcheck mantiene metadatos para saber si bytes son direccionables y si valores están definidos, propagando ese estado durante operaciones."
        },
        {
          "title": "Coste",
          "body": "La instrumentación dinámica puede imponer gran overhead temporal y de memoria. Eso la hace excelente para ciertas pruebas, no para reproducir todo problema de timing."
        },
        {
          "title": "Comparación con sanitizers",
          "body": "ASan/UBSan se instrumentan normalmente en compilación y usan runtime; Valgrind puede trabajar con binarios sin esa instrumentación específica, con trade-offs de cobertura, compatibilidad y coste."
        }
      ],
      "commonErrors": [
        "Ignorar leaks 'still reachable' y 'definitely lost' como si fueran idénticos.",
        "Ejecutar una prueba mínima y declarar el heap certificado por la ONU."
      ],
      "connections": [
        "Heap allocator",
        "ASan",
        "Undefined behavior"
      ]
    },
    "example": {
      "problem": "Hay un use-after-free intermitente en una prueba determinista.",
      "steps": [
        [
          "Paso 1",
          "Ejecuta bajo Memcheck si la plataforma está soportada."
        ],
        [
          "Paso 2",
          "Localiza el acceso inválido y el sitio donde se liberó el bloque."
        ],
        [
          "Paso 3",
          "Reconstruye ownership/lifetime desde ambas trazas."
        ],
        [
          "Paso 4",
          "Añade test de regresión después de corregir la causa."
        ]
      ],
      "answer": "La fuerza está en unir sitio del acceso con historia de asignación/liberación."
    },
    "check": {
      "question": "¿Una ejecución sin errores bajo Memcheck demuestra que todos los caminos del programa son seguros?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo en C23",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Solo se observan los caminos realmente ejecutados."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Memcheck puede detectar accesos a memoria ya liberada en ejecuciones que alcanzan el bug? sí/no",
        "answer": "si",
        "hint": "Es uno de sus usos principales."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Valgrind suele tener coste de ejecución despreciable? sí/no",
        "answer": "no",
        "hint": "La instrumentación dinámica es cara."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Valgrind y AddressSanitizer usan exactamente el mismo mecanismo de instrumentación? sí/no",
        "answer": "no",
        "hint": "Uno instrumenta dinámicamente; ASan integra instrumentación de compilador + runtime."
      }
    ]
  },
  "sanitizers-asan-ubsan-tsan": {
    "id": "sanitizers-asan-ubsan-tsan",
    "courseId": 11,
    "title": "Sanitizers: ASan, UBSan, TSan y amigos",
    "shortTitle": "Haz que el bug grite antes",
    "duration": 110,
    "objective": "seleccionar sanitizers según la clase de fallo, interpretar sus informes y comprender que instrumentación, cobertura y semántica detectada difieren entre herramientas.",
    "summary": [
      "ASan detecta muchas violaciones de seguridad de memoria como out-of-bounds y use-after-free.",
      "UBSan instrumenta operaciones para detectar clases configuradas de undefined behavior durante ejecución.",
      "TSan busca data races y tiene un modelo/coste distinto; combinar sanitizers tiene restricciones dependientes de toolchain."
    ],
    "concept": "Los sanitizers convierten clases de errores silenciosos en fallos diagnosticables mediante instrumentación del compilador y runtimes especializados. No sustituyen testing: necesitan ejecutar el camino defectuoso.",
    "diagram": [],
    "rules": [
      "Activa símbolos y conserva el informe completo, incluida primera traza relevante.",
      "No interpretes 'UBSan no informó' como prueba formal de ausencia de UB.",
      "Data race y race condition no son términos idénticos; TSan busca principalmente carreras de datos según su modelo."
    ],
    "deep": {
      "sections": [
        {
          "title": "AddressSanitizer",
          "body": "Usa shadow memory y redzones para detectar accesos fuera de límites y usos después de free, entre otras clases documentadas. Requiere instrumentación al compilar/enlazar."
        },
        {
          "title": "UndefinedBehaviorSanitizer",
          "body": "Añade checks para categorías seleccionadas como desalineación, overflow signed, ciertos shifts o bounds. No toda forma concebible de UB es necesariamente detectable dinámicamente."
        },
        {
          "title": "ThreadSanitizer",
          "body": "Instrumenta accesos/sincronización para detectar data races. Tiene overhead importante y su propia matriz de plataformas/compatibilidades."
        }
      ],
      "commonErrors": [
        "Corregir solo el punto donde ASan explota sin investigar quién corrompió antes.",
        "Activar todo indiscriminadamente y luego ignorar cien diagnósticos."
      ],
      "connections": [
        "C UB",
        "Concurrencia",
        "Testing"
      ]
    },
    "example": {
      "problem": "ASan informa heap-use-after-free al leer `node->next`.",
      "steps": [
        [
          "Paso 1",
          "Lee la traza del acceso inválido."
        ],
        [
          "Paso 2",
          "Lee la traza donde el bloque fue liberado."
        ],
        [
          "Paso 3",
          "Reconstruye qué referencia conservó ownership inválido."
        ],
        [
          "Paso 4",
          "Corrige el protocolo de lifetime y añade test que ejecute ese camino."
        ]
      ],
      "answer": "El informe contiene dos momentos causales: liberación y uso posterior."
    },
    "check": {
      "question": "¿ASan necesita que el camino defectuoso se ejecute para observar un use-after-free dinámico?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ],
        [
          "Nunca",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Es detección dinámica sobre la ejecución instrumentada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿ASan puede detectar heap-use-after-free? sí/no",
        "answer": "si",
        "hint": "Está entre las clases documentadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿UBSan demuestra formalmente ausencia de todo undefined behavior si no informa nada? sí/no",
        "answer": "no",
        "hint": "Cobertura dinámica y checks configurados."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿TSan se orienta a detectar data races? sí/no",
        "answer": "si",
        "hint": "ThreadSanitizer."
      }
    ]
  },
  "profiling-perf": {
    "id": "profiling-perf",
    "courseId": 11,
    "title": "Profilers y perf: medir antes de optimizar",
    "shortTitle": "El cuello de botella vota con muestras",
    "duration": 110,
    "objective": "distinguir profiling por muestreo/instrumentación, interpretar hotspots y usar eventos hardware con cautela para formular y verificar hipótesis de rendimiento.",
    "summary": [
      "Un profiler atribuye tiempo/eventos a código mediante muestreo, instrumentación u otros mecanismos.",
      "perf en Linux puede registrar muestras y eventos software/hardware expuestos por el kernel/PMU.",
      "Un contador aislado rara vez explica rendimiento: necesitas denominadores, contexto, repetición y una hipótesis."
    ],
    "concept": "Profiling transforma 'creo que esta función es lenta' en evidencia. La primera pregunta no es qué optimizar, sino dónde se consume el recurso relevante bajo un workload representativo.",
    "diagram": [],
    "rules": [
      "Perfila una carga representativa y registra versión/build/CPU/configuración.",
      "Distingue CPU time, wall time, latencia y throughput.",
      "No compares raw counter values entre ejecuciones con distinto trabajo sin normalización."
    ],
    "deep": {
      "sections": [
        {
          "title": "Sampling",
          "body": "El profiler interrumpe o registra periódicamente el estado y estima dónde se consume tiempo. Reduce overhead frente a instrumentar cada evento, pero introduce error estadístico."
        },
        {
          "title": "Hardware counters",
          "body": "Las PMU pueden contar ciclos, instrucciones, branches, misses y otros eventos dependientes de microarquitectura. Nombres y semántica exactos no son universales."
        },
        {
          "title": "Call graphs",
          "body": "Un hotspot puede ser coste propio o coste acumulado de callees. Un flame graph/perfil de stacks ayuda a distinguir ambos cuando las muestras conservan call chains."
        }
      ],
      "commonErrors": [
        "Optimizar una función que solo aparece arriba porque llama a todo lo caro.",
        "Comparar cache-miss counts sin considerar número de accesos/trabajo."
      ],
      "connections": [
        "IPC/CPI",
        "Caches",
        "Benchmarking"
      ]
    },
    "example": {
      "problem": "Una API tarda 200 ms y sospechas del parser.",
      "steps": [
        [
          "Paso 1",
          "Captura perfil de CPU durante workload representativo."
        ],
        [
          "Paso 2",
          "Comprueba si el parser domina muestras o si espera I/O."
        ],
        [
          "Paso 3",
          "Formula hipótesis concreta: CPU, locks, faults, misses..."
        ],
        [
          "Paso 4",
          "Mide antes/después con la misma metodología."
        ]
      ],
      "answer": "La optimización comienza con localizar el recurso que realmente limita."
    },
    "check": {
      "question": "¿Un profiler de CPU que muestra pocas muestras en una función prueba que la latencia total no puede venir de esperas I/O?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo con perf",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "CPU sampling y wall-clock waiting miden fenómenos distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El profiling por muestreo produce una estimación estadística? sí/no",
        "answer": "si",
        "hint": "No observa necesariamente cada instrucción."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Los eventos PMU disponibles son idénticos en toda microarquitectura? sí/no",
        "answer": "no",
        "hint": "Muchos son específicos del hardware."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "10000 muestras, 2500 en una función. Fracción observada en porcentaje:",
        "answer": "25",
        "alternatives": [
          "25%"
        ],
        "hint": "2500/10000·100."
      }
    ]
  },
  "debug-symbols-dwarf": {
    "id": "debug-symbols-dwarf",
    "courseId": 11,
    "title": "Debug symbols y DWARF: reconstruir el programa fuente",
    "shortTitle": "Metadatos para que 0x7f... vuelva a tener nombre",
    "duration": 110,
    "objective": "explicar cómo la información de depuración relaciona direcciones de máquina con líneas, scopes, tipos, variables y reglas de unwinding sin formar parte necesariamente del código ejecutable.",
    "summary": [
      "Debug info describe relaciones entre programa fuente y código generado; puede almacenarse separada del binario desplegado.",
      "DWARF representa unidades, tipos, líneas, ubicaciones variables y reglas de call-frame entre otras cosas.",
      "Optimización puede hacer que una variable cambie de ubicación, tenga ubicación por rangos o deje de estar disponible."
    ],
    "concept": "Los símbolos de depuración no 'desoptimizan' el programa. Son metadatos que permiten al debugger interpretar una ejecución optimizada con la mejor correspondencia disponible.",
    "diagram": [],
    "rules": [
      "Separa tabla de símbolos de debug info completa: no contienen la misma riqueza.",
      "Conserva identificadores de build para casar binario y símbolos separados.",
      "`optimized out` puede ser una descripción exacta, no un fallo del debugger."
    ],
    "deep": {
      "sections": [
        {
          "title": "Line tables",
          "body": "Relacionan rangos de direcciones con archivos/líneas. Una misma línea puede mapear a múltiples rangos y el orden de ejecución puede parecer no lineal bajo optimización."
        },
        {
          "title": "Location lists",
          "body": "Una variable puede residir en diferentes registros/memoria a lo largo de la función, o ser representable como expresión. DWARF puede describir ubicaciones por rangos."
        },
        {
          "title": "Call Frame Information",
          "body": "Las CFI describen cómo recuperar estado de frames anteriores para unwinding. Esta información también puede ser útil en runtime independientemente de la experiencia source-level."
        }
      ],
      "commonErrors": [
        "Creer que `strip` cambia por sí solo la lógica del programa.",
        "Suponer que un nombre de función basta para mostrar variables locales y tipos."
      ],
      "connections": [
        "ELF",
        "Stack unwinding",
        "Optimización"
      ]
    },
    "example": {
      "problem": "Producción usa binario stripped y recibes una dirección de crash.",
      "steps": [
        [
          "Paso 1",
          "Identifica exactamente el build desplegado."
        ],
        [
          "Paso 2",
          "Obtén debug info separada correspondiente."
        ],
        [
          "Paso 3",
          "Usa dirección + base/mapping para simbolizar."
        ],
        [
          "Paso 4",
          "Consulta line info y unwind data para reconstruir contexto."
        ]
      ],
      "answer": "Separar símbolos del artefacto desplegado permite binarios pequeños sin renunciar al análisis."
    },
    "check": {
      "question": "¿Añadir debug info obliga a desactivar optimizaciones?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo con DWARF",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Optimización y generación de debug info son dimensiones distintas, aunque la optimización dificulte la correspondencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿DWARF puede contener información de líneas fuente? sí/no",
        "answer": "si",
        "hint": "Line tables."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una variable optimizada puede cambiar de ubicación durante su lifetime? sí/no",
        "answer": "si",
        "hint": "Location lists/expressions pueden describirlo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un binario stripped puede simbolizarse después si conservas debug info separada compatible? sí/no",
        "answer": "si",
        "hint": "Ese es un flujo común de producción."
      }
    ]
  },
  "debugging-systematic-workflow": {
    "id": "debugging-systematic-workflow",
    "courseId": 11,
    "title": "Debugging sistemático: de síntoma a causa mínima",
    "shortTitle": "Menos adivinación, más experimentos",
    "duration": 120,
    "objective": "combinar debugger, tracing, sanitizers, core dumps y profiling en un proceso reproducible basado en hipótesis, reducción y evidencia.",
    "summary": [
      "El debugging eficaz reduce el espacio de hipótesis mediante experimentos discriminantes.",
      "Reproducibilidad, minimización y observabilidad son activos de ingeniería, no tareas administrativas.",
      "La herramienta correcta depende de la capa: memoria, syscalls, concurrencia, rendimiento, crash post-mortem o lógica."
    ],
    "concept": "Depurar es inferencia causal. Parte de un síntoma, construye hipótesis compatibles con la evidencia, diseña una observación que las separe y conserva un test de regresión cuando encuentres la causa.",
    "diagram": [],
    "rules": [
      "Describe el fallo con input, build, entorno y resultado esperado/observado antes de tocar código.",
      "Cambia una variable experimental cada vez cuando sea posible.",
      "Una corrección sin explicación causal ni test de regresión es una tregua, no necesariamente una solución."
    ],
    "deep": {
      "sections": [
        {
          "title": "Triage por capa",
          "body": "Crash reproducible: debugger/sanitizer. Fallo solo en producción: core + símbolos + logging/tracing. I/O extraño: strace. Corrupción tardía: watchpoint/ASan/Memcheck. Lentitud: profiler/perf. Concurrencia: TSan, tracing y diseño de sincronización."
        },
        {
          "title": "Minimización",
          "body": "Reducir input, threads, módulos o configuración convierte un sistema enorme en una prueba discriminante. Delta debugging conceptual busca el subconjunto mínimo que conserva el fallo."
        },
        {
          "title": "Regresión",
          "body": "El resultado final debe ser una explicación causal y una prueba automatizada o monitorización que falle con el bug y pase con la corrección, cuando sea viable."
        }
      ],
      "commonErrors": [
        "Cambiar cinco cosas y atribuir el éxito a la favorita.",
        "Añadir sleeps hasta que una carrera 'desaparece'."
      ],
      "connections": [
        "Testing",
        "Performance engineering",
        "Metodología de ingeniería"
      ]
    },
    "example": {
      "problem": "Servicio: a veces devuelve 500 tras desplegar nueva versión.",
      "steps": [
        [
          "Paso 1",
          "Acota: versión, requests, hosts, frecuencia y error exacto."
        ],
        [
          "Paso 2",
          "Correlaciona logs/traces y captura core si hay crash."
        ],
        [
          "Paso 3",
          "Reproduce con input reducido; usa sanitizer/debugger según la clase."
        ],
        [
          "Paso 4",
          "Formula causa, corrige y crea regresión/alerta."
        ]
      ],
      "answer": "El objetivo no es hacer desaparecer el síntoma, sino explicar y bloquear la causa."
    },
    "check": {
      "question": "¿Añadir un `sleep(100)` que hace desaparecer una carrera demuestra que el problema está corregido?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo si pasa CI",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Cambiar timing puede ocultar la carrera sin arreglar sincronización."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un test de regresión debe intentar reproducir el bug corregido? sí/no",
        "answer": "si",
        "hint": "Debe fallar antes y pasar después cuando sea viable."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Para saber qué archivo no encuentra un programa Linux sin fuente, ¿strace es una herramienta razonable? sí/no",
        "answer": "si",
        "hint": "Observa syscalls de archivo y errores."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Optimizar rendimiento antes de perfilar puede atacar una fracción irrelevante del tiempo? sí/no",
        "answer": "si",
        "hint": "Amdahl sigue observando desde la esquina."
      }
    ]
  }
});
