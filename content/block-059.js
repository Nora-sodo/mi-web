/**
 * BLOQUE 059 — CONCURRENCIA Y PARALELISMO
 *
 * Regla editorial: separar concurrencia de paralelismo, atomicidad de orden de
 * memoria y progreso global de progreso por thread. Correctness antes que speedup.
 */
window.LEARNING_PATHS[59] = {
  "level": "Experto de sistemas",
  "estimatedHours": 142,
  "description": "Concurrencia y paralelismo desde threads/procesos y sincronización hasta memory models, lock-free, SIMD, GPU y paralelismo distribuido.",
  "outcomes": [
    "Diseñar código concurrente con ownership, invariantes y sincronización explícitos.",
    "Razonar sobre atomics, happens-before, memory ordering y garantías de progreso sin mezclar capas de lenguaje, compilador y CPU.",
    "Elegir entre task parallelism, SIMD, GPU y distribución según dependencias, locality y costes de comunicación.",
    "Medir speedup, throughput, tail latency y contention distinguiendo corrección de rendimiento."
  ],
  "modules": [
    {
      "id": "m1-foundations",
      "title": "Modelo concurrente",
      "description": "Concurrencia, procesos, threads y races",
      "lessons": [
        "conc-concurrency-parallelism",
        "conc-processes-threads",
        "conc-races"
      ]
    },
    {
      "id": "m2-sync",
      "title": "Sincronización y progreso",
      "description": "Locks, liveness, atomics y memory ordering",
      "lessons": [
        "conc-locks",
        "conc-liveness",
        "conc-atomics",
        "conc-memory-order"
      ]
    },
    {
      "id": "m3-memory",
      "title": "Memory models y lock-free",
      "description": "Capas de memoria, progreso y task parallelism",
      "lessons": [
        "conc-memory-models",
        "conc-lock-free",
        "conc-task-parallelism"
      ]
    },
    {
      "id": "m4-parallel",
      "title": "Paralelismo de datos y sistemas",
      "description": "SIMD, GPU, distribuido e integración",
      "lessons": [
        "conc-simd",
        "conc-gpu",
        "conc-distributed",
        "conc-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "conc-concurrency-parallelism": {
    "id": "conc-concurrency-parallelism",
    "courseId": 59,
    "title": "Concurrencia y paralelismo: progreso solapado vs simultáneo",
    "shortTitle": "Concurrencia vs paralelismo",
    "duration": 95,
    "objective": "Distinguir concurrencia de paralelismo y razonar sobre interleavings, simultaneidad física y throughput.",
    "summary": [
      "Concurrencia significa que varias actividades tienen progreso solapado; no exige ejecución simultánea en distintos cores.",
      "Paralelismo significa que varias operaciones se ejecutan físicamente al mismo tiempo o mediante recursos paralelos.",
      "Un programa concurrente puede ejecutarse en un solo core mediante interleaving; uno paralelo necesita recursos capaces de ejecutar trabajo simultáneo."
    ],
    "concept": "Concurrencia significa que varias actividades tienen progreso solapado; no exige ejecución simultánea en distintos cores.",
    "rules": [
      "Paralelismo significa que varias operaciones se ejecutan físicamente al mismo tiempo o mediante recursos paralelos.",
      "Un programa concurrente puede ejecutarse en un solo core mediante interleaving; uno paralelo necesita recursos capaces de ejecutar trabajo simultáneo.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Distinguir concurrencia de paralelismo y razonar sobre interleavings, simultaneidad física y throughput.",
      "sections": [
        {
          "title": "Dos ejes",
          "body": "Concurrencia describe estructura/progreso; paralelismo describe ejecución simultánea. Son conceptos relacionados pero no sinónimos."
        },
        {
          "title": "Interleaving",
          "body": "Un scheduler puede alternar A y B en un único core y producir concurrencia sin paralelismo físico."
        },
        {
          "title": "Paralelismo de datos/tareas",
          "body": "El trabajo puede dividirse por datos, por tareas independientes o por pipelines; cada forma expone dependencias distintas."
        },
        {
          "title": "Coste",
          "body": "Más paralelismo introduce coordinación, particionado, sincronización y movimiento de datos; medir speedup real importa más que contar threads."
        }
      ]
    },
    "example": {
      "problem": "Un trabajo tarda 12 s serial y 4 s con paralelismo. Speedup.",
      "steps": [
        "12/4 = 3."
      ],
      "solution": "3"
    },
    "check": {
      "question": "¿Concurrencia exige dos cores?",
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
          "Solo con GPU",
          false
        ]
      ],
      "feedback": "Concurrencia significa que varias actividades tienen progreso solapado; no exige ejecución simultánea en distintos cores."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Puede haber concurrencia en un core?",
        "answer": "si",
        "hint": "Interleaving basta."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "12 s → 3 s. Speedup.",
        "answer": "4",
        "hint": "12/3."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Paralelismo elimina sincronización?",
        "answer": "no",
        "hint": "Las dependencias siguen existiendo."
      }
    ]
  },
  "conc-processes-threads": {
    "id": "conc-processes-threads",
    "courseId": 59,
    "title": "Processes y threads: aislamiento, memoria y estado de ejecución",
    "shortTitle": "Processes vs threads",
    "duration": 95,
    "objective": "Comparar procesos y threads por address space, recursos, coste de comunicación y aislamiento de fallos.",
    "summary": [
      "Un proceso suele poseer un espacio virtual y recursos; sus threads comparten gran parte de ese estado pero mantienen stacks y contexto de ejecución propios.",
      "Compartir memoria abarata comunicación pero expone data races y corrupción compartida; procesos separados mejoran aislamiento a cambio de IPC explícito.",
      "Un context switch entre threads del mismo proceso no implica necesariamente cambiar de address space."
    ],
    "concept": "Un proceso suele poseer un espacio virtual y recursos; sus threads comparten gran parte de ese estado pero mantienen stacks y contexto de ejecución propios.",
    "rules": [
      "Compartir memoria abarata comunicación pero expone data races y corrupción compartida; procesos separados mejoran aislamiento a cambio de IPC explícito.",
      "Un context switch entre threads del mismo proceso no implica necesariamente cambiar de address space.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Comparar procesos y threads por address space, recursos, coste de comunicación y aislamiento de fallos.",
      "sections": [
        {
          "title": "Proceso",
          "body": "Es una unidad de aislamiento/recursos del SO, no simplemente una función ejecutándose."
        },
        {
          "title": "Thread",
          "body": "Es un flujo de ejecución con registros, stack y scheduling propio dentro de un contexto que suele compartir memoria con otros threads del proceso."
        },
        {
          "title": "IPC",
          "body": "Procesos pueden comunicarse mediante pipes, sockets, shared memory o message queues; elegir IPC define framing, copias, ownership y sincronización."
        },
        {
          "title": "Trade-off",
          "body": "Threads reducen frontera de comunicación; procesos pueden limitar blast radius. La arquitectura depende de aislamiento, latencia y failure model."
        }
      ]
    },
    "example": {
      "problem": "Proceso con 6 threads. Si cada thread reserva 1 MiB de stack, reserva teórica total de stack.",
      "steps": [
        "6·1 = 6 MiB."
      ],
      "solution": "6"
    },
    "check": {
      "question": "¿Threads del mismo proceso suelen compartir address space?",
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
          "Solo en Windows",
          false
        ]
      ],
      "feedback": "Un proceso suele poseer un espacio virtual y recursos; sus threads comparten gran parte de ese estado pero mantienen stacks y contexto de ejecución propios."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Cada thread suele tener stack propio?",
        "answer": "si",
        "hint": "El estado de ejecución es por thread."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "8 threads × 512 KiB stack. KiB.",
        "answer": "4096",
        "hint": "8·512."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Proceso y thread son sinónimos?",
        "answer": "no",
        "hint": "Tienen aislamiento/estado distintos."
      }
    ]
  },
  "conc-races": {
    "id": "conc-races",
    "courseId": 59,
    "title": "Race conditions y data races: interleavings que rompen invariantes",
    "shortTitle": "Races",
    "duration": 95,
    "objective": "Detectar race conditions y distinguirlas de la definición más estricta de data race en modelos de memoria de lenguajes.",
    "summary": [
      "Una race condition es un defecto dependiente del orden relativo de eventos; una data race es una categoría formal más estrecha en lenguajes como C/C++.",
      "Read-modify-write no es atómico por escribirlo en una sola línea fuente.",
      "volatile no es un mecanismo general de sincronización entre threads."
    ],
    "concept": "Una race condition es un defecto dependiente del orden relativo de eventos; una data race es una categoría formal más estrecha en lenguajes como C/C++.",
    "rules": [
      "Read-modify-write no es atómico por escribirlo en una sola línea fuente.",
      "volatile no es un mecanismo general de sincronización entre threads.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Detectar race conditions y distinguirlas de la definición más estricta de data race en modelos de memoria de lenguajes.",
      "sections": [
        {
          "title": "Lost update",
          "body": "Dos threads pueden leer el mismo valor, calcular incrementos separados y sobrescribirse, perdiendo una actualización."
        },
        {
          "title": "Invariante",
          "body": "El problema real suele ser una propiedad compuesta: saldo no negativo, contador coherente, ownership único o relación entre varias variables."
        },
        {
          "title": "Data race",
          "body": "Accesos conflictivos no atómicos sin orden de sincronización válido pueden quedar fuera del comportamiento definido por el modelo del lenguaje."
        },
        {
          "title": "Diagnóstico",
          "body": "Stress tests ayudan pero no prueban ausencia de races; sanitizers, model checking y diseño de ownership reducen el espacio de interleavings peligrosos."
        }
      ]
    },
    "example": {
      "problem": "Dos threads hacen 100000 incrementos cada uno. Resultado esperado con incremento correcto.",
      "steps": [
        "2·100000 = 200000."
      ],
      "solution": "200000"
    },
    "check": {
      "question": "¿x++ sobre un int compartido es automáticamente atómico?",
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
          "Solo si cabe en un registro",
          false
        ]
      ],
      "feedback": "Una race condition es un defecto dependiente del orden relativo de eventos; una data race es una categoría formal más estrecha en lenguajes como C/C++."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿volatile evita data races?",
        "answer": "no",
        "hint": "No crea sincronización general."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "3 threads × 4000 incrementos correctos. Total.",
        "answer": "12000",
        "hint": "3·4000."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una race puede depender del interleaving?",
        "answer": "si",
        "hint": "Ese es el rasgo central."
      }
    ]
  },
  "conc-locks": {
    "id": "conc-locks",
    "courseId": 59,
    "title": "Locks, mutexes, semáforos y condition variables",
    "shortTitle": "Locks",
    "duration": 95,
    "objective": "Elegir primitivas de bloqueo según exclusión, conteo, espera por condición y liveness.",
    "summary": [
      "Un mutex protege exclusión mutua; un semáforo cuenta permisos; una condition variable espera cambios de un predicado protegido por un lock.",
      "Mantener un lock durante I/O o trabajo lento puede inflar latencia y contención.",
      "Una condition variable debe usarse reevaluando el predicado, típicamente en un bucle, porque despertar no implica que la condición siga siendo cierta."
    ],
    "concept": "Un mutex protege exclusión mutua; un semáforo cuenta permisos; una condition variable espera cambios de un predicado protegido por un lock.",
    "rules": [
      "Mantener un lock durante I/O o trabajo lento puede inflar latencia y contención.",
      "Una condition variable debe usarse reevaluando el predicado, típicamente en un bucle, porque despertar no implica que la condición siga siendo cierta.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Elegir primitivas de bloqueo según exclusión, conteo, espera por condición y liveness.",
      "sections": [
        {
          "title": "Critical section",
          "body": "Haz pequeña la región que requiere exclusión y define qué invariante protege cada lock."
        },
        {
          "title": "Condvar",
          "body": "La secuencia segura es comprobar predicado bajo mutex, esperar liberando atómicamente el mutex y volver a comprobar al despertar."
        },
        {
          "title": "Semáforo",
          "body": "Modela capacidad/permisos; no confundirlo con ownership exclusivo de un mutex."
        },
        {
          "title": "Granularidad",
          "body": "Un lock global simplifica corrección pero reduce paralelismo; muchos locks aumentan complejidad, deadlock risk y coste mental."
        }
      ]
    },
    "example": {
      "problem": "Lock está ocupado 18 ms de cada ventana de 60 ms. Porcentaje de ocupación.",
      "steps": [
        "18/60·100 = 30%."
      ],
      "solution": "30"
    },
    "check": {
      "question": "¿Un semáforo y un mutex expresan exactamente la misma semántica?",
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
          "Solo con dos threads",
          false
        ]
      ],
      "feedback": "Un mutex protege exclusión mutua; un semáforo cuenta permisos; una condition variable espera cambios de un predicado protegido por un lock."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Condvar wait debe reevaluar predicado?",
        "answer": "si",
        "hint": "Despertar no es garantía suficiente."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "9 ms/30 ms. Ocupación %.",
        "answer": "30",
        "hint": "9/30·100."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿I/O largo dentro del lock suele aumentar contención?",
        "answer": "si",
        "hint": "El lock queda retenido más tiempo."
      }
    ]
  },
  "conc-liveness": {
    "id": "conc-liveness",
    "courseId": 59,
    "title": "Deadlock, livelock, starvation y progreso",
    "shortTitle": "Liveness",
    "duration": 95,
    "objective": "Razonar sobre bloqueo mutuo, actividad sin progreso, inanición y condiciones de progreso global.",
    "summary": [
      "Deadlock implica que participantes esperan de forma que no pueden progresar; livelock conserva actividad pero no progreso útil; starvation permite progreso global mientras un participante queda pospuesto.",
      "Un orden global de adquisición de locks puede romper ciclos de espera circular si se aplica consistentemente.",
      "Eliminar deadlock no demuestra ausencia de starvation ni buen rendimiento."
    ],
    "concept": "Deadlock implica que participantes esperan de forma que no pueden progresar; livelock conserva actividad pero no progreso útil; starvation permite progreso global mientras un participante queda pospuesto.",
    "rules": [
      "Un orden global de adquisición de locks puede romper ciclos de espera circular si se aplica consistentemente.",
      "Eliminar deadlock no demuestra ausencia de starvation ni buen rendimiento.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Razonar sobre bloqueo mutuo, actividad sin progreso, inanición y condiciones de progreso global.",
      "sections": [
        {
          "title": "Coffman",
          "body": "Mutual exclusion, hold-and-wait, no preemption y circular wait son condiciones clásicas necesarias para deadlock de recursos."
        },
        {
          "title": "Lock ordering",
          "body": "Numerar recursos y adquirirlos siempre en un orden puede eliminar circular wait en ese diseño."
        },
        {
          "title": "Livelock",
          "body": "Dos agentes pueden ceder repetidamente entre sí y seguir activos sin completar trabajo."
        },
        {
          "title": "Starvation",
          "body": "Policies injustas, prioridades o contención pueden posponer un thread indefinidamente sin detener al sistema completo."
        }
      ]
    },
    "example": {
      "problem": "Cuatro locks se adquieren en un orden total 1<2<3<4. ¿Cuántas relaciones adyacentes hay?",
      "steps": [
        "3: 1<2, 2<3, 3<4."
      ],
      "solution": "3"
    },
    "check": {
      "question": "¿Livelock significa que no ocurre ninguna actividad?",
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
          "Solo en distributed systems",
          false
        ]
      ],
      "feedback": "Deadlock implica que participantes esperan de forma que no pueden progresar; livelock conserva actividad pero no progreso útil; starvation permite progreso global mientras un participante queda pospuesto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Lock ordering puede romper circular wait?",
        "answer": "si",
        "hint": "Si todos respetan el orden."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "5 recursos en cadena: relaciones adyacentes.",
        "answer": "4",
        "hint": "n-1."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Sin deadlock implica sin starvation?",
        "answer": "no",
        "hint": "Son propiedades distintas."
      }
    ]
  },
  "conc-atomics": {
    "id": "conc-atomics",
    "courseId": 59,
    "title": "Atomics y operaciones read-modify-write",
    "shortTitle": "Atomics",
    "duration": 95,
    "objective": "Usar atomics para actualizaciones indivisibles y distinguir atomicidad, sincronización y lock-freedom.",
    "summary": [
      "Una operación atomic evita que otros threads observen una modificación parcial del objeto atómico bajo el contrato del lenguaje.",
      "Operaciones read-modify-write como compare-exchange pueden implementar contadores y protocolos sin un mutex global.",
      "Atomic no implica automáticamente lock-free, wait-free ni el memory ordering correcto para datos relacionados."
    ],
    "concept": "Una operación atomic evita que otros threads observen una modificación parcial del objeto atómico bajo el contrato del lenguaje.",
    "rules": [
      "Operaciones read-modify-write como compare-exchange pueden implementar contadores y protocolos sin un mutex global.",
      "Atomic no implica automáticamente lock-free, wait-free ni el memory ordering correcto para datos relacionados.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Usar atomics para actualizaciones indivisibles y distinguir atomicidad, sincronización y lock-freedom.",
      "sections": [
        {
          "title": "RMW",
          "body": "fetch_add y compare_exchange combinan lectura y escritura de un objeto atómico bajo una única operación lógica."
        },
        {
          "title": "CAS loop",
          "body": "Compare-and-swap puede fallar porque otro thread modificó el valor; el algoritmo debe reintentar o reaccionar según su invariante."
        },
        {
          "title": "Lock-free property",
          "body": "Una implementación atómica concreta puede internamente requerir locks según tipo/plataforma; consulta la garantía real."
        },
        {
          "title": "False sharing",
          "body": "Atomics distintos en la misma cache line pueden contencionar aunque sean variables lógicamente independientes."
        }
      ]
    },
    "example": {
      "problem": "Contador atómico empieza en 100 y recibe 6 fetch_add(7). Valor final.",
      "steps": [
        "100 + 6·7 = 142."
      ],
      "solution": "142"
    },
    "check": {
      "question": "¿atomic garantiza que la implementación sea lock-free?",
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
          "Solo con enteros",
          false
        ]
      ],
      "feedback": "Una operación atomic evita que otros threads observen una modificación parcial del objeto atómico bajo el contrato del lenguaje."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿compare-exchange puede necesitar retry?",
        "answer": "si",
        "hint": "Otro thread puede ganar la carrera."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "50 + 8·5.",
        "answer": "90",
        "hint": "50+40."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Atomicidad y memory ordering son idénticos?",
        "answer": "no",
        "hint": "Resuelven dimensiones distintas."
      }
    ]
  },
  "conc-memory-order": {
    "id": "conc-memory-order",
    "courseId": 59,
    "title": "Memory ordering y happens-before",
    "shortTitle": "Memory ordering",
    "duration": 95,
    "objective": "Comprender relaxed, acquire/release y orden secuencial como contratos sobre observación y sincronización, no como simples instrucciones de barrera.",
    "summary": [
      "Memory ordering define qué relaciones de orden/visibilidad puede asumir el programa alrededor de operaciones atómicas.",
      "Una publicación típica usa store-release del flag/puntero y load-acquire correspondiente para transferir visibilidad de escrituras anteriores cuando se establece synchronizes-with.",
      "memory_order_relaxed conserva atomicidad del objeto pero no crea por sí solo orden de sincronización para datos ordinarios relacionados."
    ],
    "concept": "Memory ordering define qué relaciones de orden/visibilidad puede asumir el programa alrededor de operaciones atómicas.",
    "rules": [
      "Una publicación típica usa store-release del flag/puntero y load-acquire correspondiente para transferir visibilidad de escrituras anteriores cuando se establece synchronizes-with.",
      "memory_order_relaxed conserva atomicidad del objeto pero no crea por sí solo orden de sincronización para datos ordinarios relacionados.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Comprender relaxed, acquire/release y orden secuencial como contratos sobre observación y sincronización, no como simples instrucciones de barrera.",
      "sections": [
        {
          "title": "Happens-before",
          "body": "Es una relación lógica del modelo del lenguaje usada para razonar qué efectos deben ser visibles y para excluir data races."
        },
        {
          "title": "Acquire/release",
          "body": "Release publica operaciones anteriores; acquire que observa la publicación puede establecer el vínculo necesario para consumir datos inicializados."
        },
        {
          "title": "Relaxed",
          "body": "Útil para contadores/estadísticas donde solo necesitas atomicidad/modification order del objeto, no publicación de otros datos."
        },
        {
          "title": "Seq-cst",
          "body": "Añade restricciones globales más fuertes sobre operaciones seq-cst, simplificando razonamiento a costa de posible libertad de optimización/hardware."
        }
      ]
    },
    "example": {
      "problem": "Productor escribe 4 campos y luego publica un flag. ¿Cuántos campos deben quedar inicializados antes de publicar?",
      "steps": [
        "Los 4."
      ],
      "solution": "4"
    },
    "check": {
      "question": "¿memory_order_relaxed crea por sí solo happens-before para datos normales asociados?",
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
          "Solo en x86",
          false
        ]
      ],
      "feedback": "Memory ordering define qué relaciones de orden/visibilidad puede asumir el programa alrededor de operaciones atómicas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Release/acquire puede usarse para publicación?",
        "answer": "si",
        "hint": "Con el vínculo correcto."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Se publican 12 slots y 3 no se inicializaron. Inicializados.",
        "answer": "9",
        "hint": "12-3."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Happens-before es lo mismo que wall-clock order?",
        "answer": "no",
        "hint": "Es una relación formal del modelo."
      }
    ]
  },
  "conc-memory-models": {
    "id": "conc-memory-models",
    "courseId": 59,
    "title": "Memory models: lenguaje, compilador, CPU y coherencia",
    "shortTitle": "Memory models",
    "duration": 95,
    "objective": "Separar el modelo del lenguaje de optimizaciones del compilador, orden de memoria de la ISA y protocolos de coherencia de caché.",
    "summary": [
      "El modelo de memoria del lenguaje define los comportamientos permitidos para el programa; el compilador debe mapear ese contrato a instrucciones válidas para la arquitectura.",
      "Cache coherence mantiene propiedades sobre copias de una misma ubicación/cache line, pero no proporciona por sí sola el orden de alto nivel que necesita un algoritmo concurrente.",
      "Fences son mecanismos específicos de orden; no reparan una data race ordinaria si el programa viola el contrato del lenguaje."
    ],
    "concept": "El modelo de memoria del lenguaje define los comportamientos permitidos para el programa; el compilador debe mapear ese contrato a instrucciones válidas para la arquitectura.",
    "rules": [
      "Cache coherence mantiene propiedades sobre copias de una misma ubicación/cache line, pero no proporciona por sí sola el orden de alto nivel que necesita un algoritmo concurrente.",
      "Fences son mecanismos específicos de orden; no reparan una data race ordinaria si el programa viola el contrato del lenguaje.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Separar el modelo del lenguaje de optimizaciones del compilador, orden de memoria de la ISA y protocolos de coherencia de caché.",
      "sections": [
        {
          "title": "Capas",
          "body": "Source model → compiler transformations → ISA memory ordering → microarchitecture/cache coherence. Mezclarlas produce argumentos frágiles."
        },
        {
          "title": "Coherence vs consistency",
          "body": "Coherence suele tratar orden de escrituras a una misma ubicación; consistency/memory model define relaciones entre múltiples operaciones/ubicaciones."
        },
        {
          "title": "Compiler reorder",
          "body": "Incluso si el hardware parece fuerte, el compilador puede reorganizar dentro de lo permitido por el lenguaje; usa primitivas del lenguaje, no folklore de CPU."
        },
        {
          "title": "Portability",
          "body": "Un algoritmo que funciona accidentalmente en una arquitectura puede romperse al compilar distinto o migrar a otra ISA."
        }
      ]
    },
    "example": {
      "problem": "Hay 4 capas del modelo descritas: lenguaje, compilador, ISA y microarquitectura. ¿Cuántas?",
      "steps": [
        "4."
      ],
      "solution": "4"
    },
    "check": {
      "question": "¿Cache coherence sustituye un memory model del lenguaje?",
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
          "Solo con una cache",
          false
        ]
      ],
      "feedback": "El modelo de memoria del lenguaje define los comportamientos permitidos para el programa; el compilador debe mapear ese contrato a instrucciones válidas para la arquitectura."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Compiler y CPU pueden tener reglas de reorder distintas?",
        "answer": "si",
        "hint": "Son capas distintas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "5 capas, eliminas 2 del análisis. Restan.",
        "answer": "3",
        "hint": "5-2."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una fence convierte cualquier race en programa correcto?",
        "answer": "no",
        "hint": "Debe existir protocolo válido."
      }
    ]
  },
  "conc-lock-free": {
    "id": "conc-lock-free",
    "courseId": 59,
    "title": "Lock-free, wait-free, ABA y reclamación de memoria",
    "shortTitle": "Lock-free",
    "duration": 95,
    "objective": "Distinguir garantías de progreso y diseñar estructuras lock-free considerando ABA, reclamación y contention.",
    "summary": [
      "Lock-free garantiza progreso global: en un número finito de pasos algún participante completa una operación; no garantiza que cada thread progrese.",
      "Wait-free exige una cota de pasos por operación para cada participante y es una garantía más fuerte.",
      "Un CAS correcto sobre punteros no resuelve automáticamente lifetime: ABA y memory reclamation pueden invalidar nodos observados."
    ],
    "concept": "Lock-free garantiza progreso global: en un número finito de pasos algún participante completa una operación; no garantiza que cada thread progrese.",
    "rules": [
      "Wait-free exige una cota de pasos por operación para cada participante y es una garantía más fuerte.",
      "Un CAS correcto sobre punteros no resuelve automáticamente lifetime: ABA y memory reclamation pueden invalidar nodos observados.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Distinguir garantías de progreso y diseñar estructuras lock-free considerando ABA, reclamación y contention.",
      "sections": [
        {
          "title": "Progress hierarchy",
          "body": "Obstruction-free, lock-free y wait-free expresan garantías distintas; no usar lock-free como sinónimo de 'sin mutex en el source'."
        },
        {
          "title": "ABA",
          "body": "Un valor puede cambiar A→B→A y engañar a un CAS que solo compara el valor final, aunque el estado lógico haya cambiado."
        },
        {
          "title": "Reclamation",
          "body": "Hazard pointers, epoch-based reclamation y esquemas similares evitan liberar memoria que otro thread aún podría leer."
        },
        {
          "title": "Contention",
          "body": "Lock-free puede degradarse con retries, cache-line bouncing y starvation. Benchmarks deben incluir percentiles/contención, no solo throughput medio."
        }
      ]
    },
    "example": {
      "problem": "CAS falla 7 veces y tiene éxito en el octavo intento. Intentos totales.",
      "steps": [
        "8."
      ],
      "solution": "8"
    },
    "check": {
      "question": "¿Lock-free garantiza que cada thread termina en una cota fija de pasos?",
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
          "Solo con CAS",
          false
        ]
      ],
      "feedback": "Lock-free garantiza progreso global: en un número finito de pasos algún participante completa una operación; no garantiza que cada thread progrese."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Wait-free es más fuerte que lock-free?",
        "answer": "si",
        "hint": "Garantiza progreso por participante."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "11 retries + 1 éxito. Intentos.",
        "answer": "12",
        "hint": "11+1."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿CAS elimina el problema de reclamación?",
        "answer": "no",
        "hint": "Lifetime sigue siendo necesario."
      }
    ]
  },
  "conc-task-parallelism": {
    "id": "conc-task-parallelism",
    "courseId": 59,
    "title": "Task parallelism, pools, work stealing y Amdahl",
    "shortTitle": "Task parallelism",
    "duration": 95,
    "objective": "Descomponer trabajo en tareas, controlar granularidad y estimar speedup limitado por fracción serial y overhead.",
    "summary": [
      "Crear un thread por tarea pequeña suele ser más caro que usar un pool y colas de trabajo.",
      "Work stealing permite que workers ociosos tomen tareas de otros workers, pero no elimina dependencias ni overhead de scheduling.",
      "La ley de Amdahl acota el speedup cuando una fracción del trabajo permanece serial."
    ],
    "concept": "Crear un thread por tarea pequeña suele ser más caro que usar un pool y colas de trabajo.",
    "rules": [
      "Work stealing permite que workers ociosos tomen tareas de otros workers, pero no elimina dependencias ni overhead de scheduling.",
      "La ley de Amdahl acota el speedup cuando una fracción del trabajo permanece serial.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Descomponer trabajo en tareas, controlar granularidad y estimar speedup limitado por fracción serial y overhead.",
      "sections": [
        {
          "title": "Granularidad",
          "body": "Tareas demasiado pequeñas pagan más scheduling/synchronization; demasiado grandes dejan cores ociosos y empeoran balance."
        },
        {
          "title": "DAG",
          "body": "Dependencias entre tareas forman un grafo: solo nodos listos pueden ejecutarse; critical path limita la latencia mínima."
        },
        {
          "title": "Amdahl",
          "body": "Speedup ideal S=1/((1-p)+p/N) para fracción paralelizable p y N recursos, ignorando overhead extra."
        },
        {
          "title": "Work stealing",
          "body": "Distribuye dinámicamente carga irregular; sigue requiriendo colas, sincronización y cuidado con locality."
        }
      ]
    },
    "example": {
      "problem": "p=0.8 y N=4. Speedup ideal de Amdahl.",
      "steps": [
        "1/(0.2+0.8/4)=1/0.4=2.5."
      ],
      "solution": "2.5"
    },
    "check": {
      "question": "¿Más threads siempre aumenta speedup?",
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
          "Solo si N es potencia de 2",
          false
        ]
      ],
      "feedback": "Crear un thread por tarea pequeña suele ser más caro que usar un pool y colas de trabajo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Thread pool reduce creación repetida de threads?",
        "answer": "si",
        "hint": "Reutiliza workers."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "p=0.75, N=3. Speedup ideal.",
        "answer": "2",
        "hint": "1/(0.25+0.25)=2."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Work stealing elimina el critical path?",
        "answer": "no",
        "hint": "Las dependencias siguen limitando."
      }
    ]
  },
  "conc-simd": {
    "id": "conc-simd",
    "courseId": 59,
    "title": "SIMD y vectorización: una instrucción, múltiples lanes",
    "shortTitle": "SIMD",
    "duration": 95,
    "objective": "Vectorizar trabajo sobre datos independientes distinguiendo lanes, máscara, alignment, dependencias y throughput.",
    "summary": [
      "SIMD ejecuta una operación vectorial sobre múltiples elementos/lane; no es lo mismo que crear múltiples threads.",
      "Dependencias entre iteraciones pueden impedir vectorización aunque el loop parezca numéricamente simple.",
      "Vector width teórica no equivale a speedup lineal: memory bandwidth, gathers, masks y tail handling pueden dominar."
    ],
    "concept": "SIMD ejecuta una operación vectorial sobre múltiples elementos/lane; no es lo mismo que crear múltiples threads.",
    "rules": [
      "Dependencias entre iteraciones pueden impedir vectorización aunque el loop parezca numéricamente simple.",
      "Vector width teórica no equivale a speedup lineal: memory bandwidth, gathers, masks y tail handling pueden dominar.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Vectorizar trabajo sobre datos independientes distinguiendo lanes, máscara, alignment, dependencias y throughput.",
      "sections": [
        {
          "title": "Vector lanes",
          "body": "Un vector de 256 bits puede contener ocho float32, pero el número real de operaciones/ciclo depende de la ISA y microarquitectura."
        },
        {
          "title": "Auto-vectorization",
          "body": "Compiladores necesitan demostrar independencia/aliasing suficiente; restrict/alignment y estructura de datos pueden ayudar cuando son semánticamente correctos."
        },
        {
          "title": "AoS vs SoA",
          "body": "Structure-of-arrays suele facilitar cargas contiguas por campo; array-of-structures puede ser mejor para otras locality patterns."
        },
        {
          "title": "Tail",
          "body": "Si n no es múltiplo del vector width, usa máscaras o un remainder loop; no ignores elementos finales."
        }
      ]
    },
    "example": {
      "problem": "Vector de 256 bits sobre float32. Lanes.",
      "steps": [
        "256/32 = 8."
      ],
      "solution": "8"
    },
    "check": {
      "question": "¿SIMD implica múltiples threads?",
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
          "Solo con AVX",
          false
        ]
      ],
      "feedback": "SIMD ejecuta una operación vectorial sobre múltiples elementos/lane; no es lo mismo que crear múltiples threads."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "512-bit / 64-bit doubles. Lanes.",
        "answer": "8",
        "hint": "512/64."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Dependencias entre iteraciones pueden impedir vectorización?",
        "answer": "si",
        "hint": "Rompen independencia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿8 lanes garantizan 8× speedup?",
        "answer": "no",
        "hint": "Otros cuellos de botella importan."
      }
    ]
  },
  "conc-gpu": {
    "id": "conc-gpu",
    "courseId": 59,
    "title": "GPU parallelism: SIMT, warps, occupancy y memoria",
    "shortTitle": "GPU parallelism",
    "duration": 95,
    "objective": "Mapear paralelismo masivo a threads/blocks/SIMT entendiendo divergence, jerarquía de memoria y sincronización.",
    "summary": [
      "GPU parallelism explota miles de threads ligeros y ejecución SIMT; en CUDA los threads de un block se agrupan en warps para scheduling.",
      "Branch divergence puede serializar caminos dentro de una unidad SIMT, aunque threads mantengan estado lógico independiente.",
      "Occupancy alta no garantiza rendimiento: bandwidth, latency hiding, instruction mix y locality importan."
    ],
    "concept": "GPU parallelism explota miles de threads ligeros y ejecución SIMT; en CUDA los threads de un block se agrupan en warps para scheduling.",
    "rules": [
      "Branch divergence puede serializar caminos dentro de una unidad SIMT, aunque threads mantengan estado lógico independiente.",
      "Occupancy alta no garantiza rendimiento: bandwidth, latency hiding, instruction mix y locality importan.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Mapear paralelismo masivo a threads/blocks/SIMT entendiendo divergence, jerarquía de memoria y sincronización.",
      "sections": [
        {
          "title": "Jerarquía",
          "body": "Grid → blocks → threads; bloques permiten cooperación/sincronización local y son unidades de scheduling más grandes que threads individuales."
        },
        {
          "title": "Warp/SIMT",
          "body": "En CUDA moderno un warp agrupa 32 threads, pero no extrapoles ese tamaño a todas las GPU/APIs."
        },
        {
          "title": "Memory",
          "body": "Global, shared/local y caches tienen alcances/costes distintos; coalescing y acceso regular suelen ser críticos."
        },
        {
          "title": "Divergence",
          "body": "Ifs diferentes entre lanes pueden reducir eficiencia; no significa que el resultado funcional de cada thread deje de ser independiente."
        }
      ]
    },
    "example": {
      "problem": "1024 threads organizados en blocks de 256. Blocks.",
      "steps": [
        "1024/256 = 4."
      ],
      "solution": "4"
    },
    "check": {
      "question": "¿Occupancy máxima garantiza kernel más rápido?",
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
          "Solo en NVIDIA",
          false
        ]
      ],
      "feedback": "GPU parallelism explota miles de threads ligeros y ejecución SIMT; en CUDA los threads de un block se agrupan en warps para scheduling."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "2048 threads / 256 por block. Blocks.",
        "answer": "8",
        "hint": "2048/256."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Branch divergence puede reducir eficiencia SIMT?",
        "answer": "si",
        "hint": "Se ejecutan caminos diferentes."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Warp size es universal para toda GPU?",
        "answer": "no",
        "hint": "Depende de arquitectura/modelo."
      }
    ]
  },
  "conc-distributed": {
    "id": "conc-distributed",
    "courseId": 59,
    "title": "Distributed parallelism: partición, comunicación y fallos",
    "shortTitle": "Distributed parallelism",
    "duration": 95,
    "objective": "Extender paralelismo a múltiples máquinas distinguiendo comunicación, particionado, consistencia, stragglers y fallos parciales.",
    "summary": [
      "En un sistema distribuido no existe memoria compartida uniforme ni un reloj global perfecto; comunicación y fallos parciales son parte del modelo.",
      "Mover trabajo puede ser más barato que mover datos o al revés; data locality y tamaño de mensajes dominan muchas cargas.",
      "Un speedup distribuido debe descontar serialización, red, coordinación, stragglers y recuperación."
    ],
    "concept": "En un sistema distribuido no existe memoria compartida uniforme ni un reloj global perfecto; comunicación y fallos parciales son parte del modelo.",
    "rules": [
      "Mover trabajo puede ser más barato que mover datos o al revés; data locality y tamaño de mensajes dominan muchas cargas.",
      "Un speedup distribuido debe descontar serialización, red, coordinación, stragglers y recuperación.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Extender paralelismo a múltiples máquinas distinguiendo comunicación, particionado, consistencia, stragglers y fallos parciales.",
      "sections": [
        {
          "title": "Partitioning",
          "body": "Divide datos/tareas para minimizar comunicación y balancear carga; particiones desiguales crean stragglers."
        },
        {
          "title": "Messages",
          "body": "Latencia fija y bandwidth afectan de forma distinta a muchos mensajes pequeños frente a pocos grandes."
        },
        {
          "title": "Failures",
          "body": "Una máquina puede fallar mientras otras siguen vivas; retry/idempotencia/checkpointing deben formar parte del diseño."
        },
        {
          "title": "Collectives",
          "body": "Broadcast, reduce, all-reduce y barriers coordinan workers, pero sus costes dependen de topología y escala."
        }
      ]
    },
    "example": {
      "problem": "8 workers producen 125 MB cada uno antes de un reduce. Datos agregados MB.",
      "steps": [
        "8·125 = 1000 MB."
      ],
      "solution": "1000"
    },
    "check": {
      "question": "¿Distributed parallelism puede ignorar fallos parciales?",
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
          "Solo en LAN",
          false
        ]
      ],
      "feedback": "En un sistema distribuido no existe memoria compartida uniforme ni un reloj global perfecto; comunicación y fallos parciales son parte del modelo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "16 workers × 50 MB. MB.",
        "answer": "800",
        "hint": "16·50."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Muchos mensajes pequeños pueden pagar más latencia fija?",
        "answer": "si",
        "hint": "Cada mensaje tiene overhead."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un cluster equivale a memoria compartida uniforme?",
        "answer": "no",
        "hint": "La red es parte del modelo."
      }
    ]
  },
  "conc-integration": {
    "id": "conc-integration",
    "courseId": 59,
    "title": "Proyecto integrado: pipeline concurrente medible y correcto",
    "shortTitle": "Proyecto concurrente",
    "duration": 95,
    "objective": "Diseñar un pipeline que combine tasks, atomics/locks, SIMD y GPU/distribución con correctness y performance medibles.",
    "summary": [
      "Primero define invariantes, ownership y orden de sincronización; después optimiza paralelismo.",
      "Un speedup sin baseline, workload y número de recursos es una cifra incompleta.",
      "Mide throughput y latencia junto con contention, retries, queue depth, CPU/GPU utilization y tail latency."
    ],
    "concept": "Primero define invariantes, ownership y orden de sincronización; después optimiza paralelismo.",
    "rules": [
      "Un speedup sin baseline, workload y número de recursos es una cifra incompleta.",
      "Mide throughput y latencia junto con contention, retries, queue depth, CPU/GPU utilization y tail latency.",
      "Declara ownership, modelo de memoria, garantía de progreso y métrica cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Diseñar un pipeline que combine tasks, atomics/locks, SIMD y GPU/distribución con correctness y performance medibles.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Input → partition → worker pool → SIMD/GPU stage → aggregation → output, con backpressure y ownership explícitos."
        },
        {
          "title": "Correctness",
          "body": "Especifica qué datos son immutable, thread-confined, atomics o protegidos por lock; documenta happens-before donde publica estado."
        },
        {
          "title": "Performance",
          "body": "Compara T1, TN y speedup/efficiency; identifica serial fraction, communication, imbalance y synchronization overhead."
        },
        {
          "title": "Stress",
          "body": "Prueba alta contención, trabajo skewed, cancelación, shutdown y fallos parciales; un benchmark feliz no certifica liveness."
        }
      ]
    },
    "example": {
      "problem": "T1=80 ms y T8=14 ms. Speedup a 3 decimales.",
      "steps": [
        "80/14 = 5.714285..., ≈5.714."
      ],
      "solution": "5.714"
    },
    "check": {
      "question": "¿Debes definir invariantes antes de optimizar un algoritmo concurrente?",
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
          "Solo si usa mutex",
          false
        ]
      ],
      "feedback": "Primero define invariantes, ownership y orden de sincronización; después optimiza paralelismo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "T1=100, T4=30. Speedup a 3 decimales.",
        "answer": "3.333",
        "hint": "100/30."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Speedup debe indicar baseline/workload?",
        "answer": "si",
        "hint": "Sin contexto es ambiguo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Throughput alto garantiza baja tail latency?",
        "answer": "no",
        "hint": "Son métricas distintas."
      }
    ]
  }
});
