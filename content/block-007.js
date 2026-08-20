/**
 * BLOQUE 007 — Microarquitectura avanzada
 *
 * Separación de responsabilidades pedagógicas:
 * - este archivo contiene conocimiento y ejercicios del bloque;
 * - app.js decide cómo se representa en pantalla;
 * - state.js conserva progreso y errores;
 * - challenges.js añade el nivel 4 sin duplicar la estructura base.
 *
 * Principio editorial: distinguir siempre estado arquitectónico de mecanismos
 * internos. Una optimización microarquitectónica nunca debe presentarse como
 * parte obligatoria de la ISA salvo que la especificación lo diga.
 */

window.LEARNING_PATHS[7] = {
  "level": "Experto progresivo",
  "estimatedHours": 30,
  "description": "Pipeline, hazards, predicción, especulación, ejecución fuera de orden, renombrado, retiro, superscalaridad, micro-ops y análisis riguroso de rendimiento.",
  "outcomes": [
    "Explicar cómo una CPU solapa y reordena trabajo sin cambiar el contrato arquitectónico.",
    "Clasificar hazards y distinguir dependencias verdaderas de dependencias de nombre.",
    "Razonar sobre branch prediction, especulación, recuperación y estado preciso.",
    "Explicar register renaming, scheduling dinámico y reorder/retirement.",
    "Relacionar superscalaridad e ILP con cuellos de botella reales.",
    "Interpretar IPC, CPI, latencia, throughput y ley de Amdahl sin abusar de métricas aisladas."
  ],
  "modules": [
    {
      "id": "m1-pipeline",
      "title": "Pipeline y hazards",
      "description": "Solapamiento, dependencias, forwarding y stalls.",
      "lessons": [
        "pipeline-etapas",
        "hazards-forwarding"
      ]
    },
    {
      "id": "m2-control",
      "title": "Predicción y especulación",
      "description": "Control hazards, branch prediction y recuperación.",
      "lessons": [
        "branch-prediction",
        "speculation-precise"
      ]
    },
    {
      "id": "m3-ooo",
      "title": "Motor fuera de orden",
      "description": "Renaming, scheduling, ROB y retiro.",
      "lessons": [
        "ooo-renaming",
        "rob-retirement"
      ]
    },
    {
      "id": "m4-width",
      "title": "Ancho y operaciones internas",
      "description": "Superscalaridad, ILP, micro-ops y microcode.",
      "lessons": [
        "superscalar-ilp",
        "microops-microcode"
      ]
    },
    {
      "id": "m5-performance",
      "title": "Medir rendimiento",
      "description": "IPC/CPI, latencia, throughput, Amdahl y benchmarking.",
      "lessons": [
        "ipc-cpi-latency-throughput",
        "amdahl-benchmarking"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "pipeline-etapas": {
    "id": "pipeline-etapas",
    "courseId": 7,
    "title": "Pipeline: solapar trabajo sin violar dependencias",
    "shortTitle": "Más etapas no significan magia",
    "duration": 78,
    "objective": "explicar throughput y latencia de un pipeline y distinguir profundidad de pipeline de rendimiento real.",
    "summary": [
      "Un pipeline divide el procesamiento en etapas y permite solapar instrucciones distintas.",
      "En régimen ideal puede aumentar throughput sin reducir necesariamente la latencia de una instrucción.",
      "Profundizar un pipeline introduce registros, control y penalizaciones que pueden anular beneficios."
    ],
    "concept": "El pipeline es una técnica de solapamiento. La pregunta útil no es cuántas etapas tiene, sino qué trabajo hace cada etapa, dónde están los caminos críticos y cuánto cuesta vaciar o detener el flujo.",
    "diagram": [
      "I1: F D E M W",
      "I2:   F D E M W",
      "I3:     F D E M W"
    ],
    "rules": [
      "Distingue latencia de throughput.",
      "No supongas CPI=1 ante hazards o misses.",
      "Una etapa extra tiene coste de registros y control."
    ],
    "deep": {
      "sections": [
        {
          "title": "Latencia frente a throughput",
          "body": "Si una instrucción atraviesa cinco etapas puede tardar varios ciclos desde fetch hasta retiro, aunque tras llenar el pipeline pueda completarse aproximadamente una por ciclo en un diseño ideal de una sola vía."
        },
        {
          "title": "Profundidad",
          "body": "Dividir lógica combinacional puede permitir un periodo de reloj menor, pero aumenta fronteras de etapa y puede elevar la penalización de redirecciones y dependencias."
        },
        {
          "title": "Pipeline real",
          "body": "Front-end, renombrado, scheduling, ejecución y retiro de una CPU moderna no forman necesariamente un pipeline lineal simple. El diagrama de cinco etapas es un modelo pedagógico."
        },
        {
          "title": "Límites",
          "body": "Caches, branches, dependencias y recursos compartidos introducen burbujas. La frecuencia máxima tampoco es el único determinante del rendimiento."
        }
      ],
      "commonErrors": [
        "Confundir más GHz con más trabajo útil.",
        "Creer que una instrucción termina en un ciclo porque el throughput sea uno por ciclo."
      ],
      "connections": [
        "Bloque 004: temporización.",
        "Bloque 005: fetch/decode.",
        "Bloque 008: cachés."
      ]
    },
    "example": {
      "problem": "Pipeline ideal de 5 etapas, una instrucción por ciclo tras llenado. ¿Cuántos ciclos desde el inicio hasta completar 4 instrucciones?",
      "steps": [
        [
          "Primera",
          "Necesita 5 ciclos."
        ],
        [
          "Solapamiento",
          "Cada instrucción adicional termina un ciclo después."
        ],
        [
          "Total",
          "5 + (4−1) = 8 ciclos."
        ]
      ],
      "answer": "8 ciclos."
    },
    "check": {
      "question": "¿Un pipeline puede mejorar throughput sin reducir la latencia individual?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ]
      ],
      "success": "Correcto: ese es precisamente uno de sus beneficios.",
      "failure": "Throughput y latencia son métricas distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Pipeline ideal de 4 etapas: ciclos para completar 3 instrucciones desde vacío:",
        "answer": "6",
        "hint": "k+n−1."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Duplicar etapas garantiza duplicar rendimiento? sí/no",
        "answer": "no",
        "hint": "Hay overhead, hazards y penalizaciones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿CPI ideal 1 implica latencia de 1 ciclo por instrucción? sí/no",
        "answer": "no",
        "hint": "CPI de flujo y latencia no son lo mismo."
      }
    ]
  },
  "hazards-forwarding": {
    "id": "hazards-forwarding",
    "courseId": 7,
    "title": "Hazards: datos, control, estructura y forwarding",
    "shortTitle": "Cuando el pipeline tropieza consigo mismo",
    "duration": 84,
    "objective": "clasificar hazards y razonar cuándo forwarding evita un stall y cuándo no basta.",
    "summary": [
      "Data hazards aparecen cuando instrucciones relacionadas se solapan.",
      "Forwarding puede entregar resultados antes de escribirlos al banco de registros.",
      "Control y structural hazards requieren mecanismos distintos."
    ],
    "concept": "Un hazard no es necesariamente un error; es una situación que la microarquitectura debe resolver conservando la semántica arquitectónica.",
    "diagram": [
      "ADD r1,...",
      "   ↓ resultado",
      "forward → SUB ...,r1"
    ],
    "rules": [
      "RAW es una dependencia verdadera.",
      "WAR/WAW pueden ser dependencias de nombre en ciertos diseños.",
      "Forwarding no elimina toda latencia, especialmente load-use."
    ],
    "deep": {
      "sections": [
        {
          "title": "RAW",
          "body": "Read After Write representa flujo real de datos: el consumidor necesita el resultado del productor."
        },
        {
          "title": "WAR y WAW",
          "body": "En ejecución fuera de orden pueden limitar planificación aunque no representen flujo de valor. El renombrado de registros puede eliminarlas."
        },
        {
          "title": "Forwarding",
          "body": "Bypass networks reenvían resultados desde etapas internas al consumidor, evitando esperar a writeback cuando el dato ya existe."
        },
        {
          "title": "Load-use",
          "body": "Si el dato de un load aparece demasiado tarde para el consumidor inmediato, puede ser necesario insertar un stall incluso con forwarding."
        }
      ],
      "commonErrors": [
        "Llamar hazard a cualquier dependencia sin distinguir tipo.",
        "Afirmar que forwarding elimina todos los stalls."
      ],
      "connections": [
        "Bloque 004: datapath.",
        "Bloque 006: dependencias en assembly."
      ]
    },
    "example": {
      "problem": "ADD produce r1 y la siguiente instrucción SUB consume r1. Si el resultado de ADD está disponible antes de writeback, ¿qué técnica puede evitar esperar al banco?",
      "steps": [
        [
          "Dependencia",
          "Existe RAW."
        ],
        [
          "Disponibilidad",
          "El dato ya está en una etapa interna."
        ],
        [
          "Solución",
          "Se reenvía directamente al consumidor."
        ]
      ],
      "answer": "Forwarding/bypassing."
    },
    "check": {
      "question": "¿RAW representa dependencia verdadera de datos?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "RAW conecta un valor producido con su consumidor."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Nombre habitual de Read After Write:",
        "answer": "raw",
        "hint": "Iniciales inglesas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Forwarding puede eliminar una dependencia RAW semántica? sí/no",
        "answer": "no",
        "hint": "Acelera entrega; no cambia la dependencia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Renombrado puede eliminar WAR/WAW de nombre? sí/no",
        "answer": "si",
        "hint": "Asigna destinos físicos distintos."
      }
    ]
  },
  "branch-prediction": {
    "id": "branch-prediction",
    "courseId": 7,
    "title": "Branch prediction y control hazards",
    "shortTitle": "Adivinar para no quedarse mirando",
    "duration": 88,
    "objective": "explicar predicción de dirección y destino, coste de misprediction y por qué la precisión depende del workload.",
    "summary": [
      "Los branches rompen el flujo secuencial antes de conocerse su resultado.",
      "Un predictor intenta anticipar dirección y a menudo destino para mantener alimentado el front-end.",
      "Una predicción incorrecta obliga a descartar trabajo especulativo incorrecto."
    ],
    "concept": "Predecir no cambia el resultado arquitectónico: solo apuesta por un camino para ganar tiempo. Si falla, la máquina debe volver a un estado correcto.",
    "diagram": [
      "predict → fetch especulativo",
      "   ✓ continúa",
      "   ✗ flush + redirect"
    ],
    "rules": [
      "Distingue predictor de dirección y BTB/target prediction.",
      "La penalización depende de microarquitectura.",
      "La precisión global no describe todos los branches."
    ],
    "deep": {
      "sections": [
        {
          "title": "Predicción dinámica",
          "body": "Usa historia observada y estructuras internas para estimar comportamiento futuro. Existen múltiples familias de predictores."
        },
        {
          "title": "Destino",
          "body": "Saber tomado/no tomado no siempre basta: también puede ser necesario disponer pronto de la dirección destino."
        },
        {
          "title": "Misprediction",
          "body": "Las instrucciones del camino erróneo no deben alterar estado arquitectónico visible. El trabajo invertido consume ciclos y energía."
        },
        {
          "title": "Contexto",
          "body": "Un predictor excelente en un patrón puede rendir peor en otro. Por eso hablar de una precisión universal carece de sentido."
        }
      ],
      "commonErrors": [
        "Pensar que el predictor conoce el futuro.",
        "Dar una penalización fija universal por fallo."
      ],
      "connections": [
        "Bloque 006: branches.",
        "Bloque 074: profiling."
      ]
    },
    "example": {
      "problem": "De 1000 branches, 60 son mal predichos. ¿Precisión observada?",
      "steps": [
        [
          "Aciertos",
          "1000−60=940."
        ],
        [
          "Fracción",
          "940/1000=0,94."
        ],
        [
          "Porcentaje",
          "94 %."
        ]
      ],
      "answer": "94 %."
    },
    "check": {
      "question": "¿Una predicción incorrecta puede retirarse como si fuera correcta?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Correcto: el estado arquitectónico debe conservar la ejecución correcta.",
      "failure": "El trabajo especulativo erróneo debe descartarse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "100 branches, 8 fallos: precisión en %:",
        "answer": "92",
        "hint": "92 aciertos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Taken/not-taken siempre basta para conocer el siguiente PC? sí/no",
        "answer": "no",
        "hint": "Puede hacer falta predecir destino."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La penalización de misprediction es constante entre todas las CPUs? sí/no",
        "answer": "no",
        "hint": "Depende del diseño y situación."
      }
    ]
  },
  "speculation-precise": {
    "id": "speculation-precise",
    "courseId": 7,
    "title": "Ejecución especulativa y estado arquitectónico preciso",
    "shortTitle": "Trabajar antes de saber, comprometer después",
    "duration": 92,
    "objective": "distinguir ejecución especulativa de retiro y explicar por qué el estado arquitectónico solo se compromete cuando corresponde.",
    "summary": [
      "La CPU puede ejecutar trabajo cuyo camino aún no está confirmado.",
      "Los resultados especulativos deben mantenerse de forma que puedan descartarse.",
      "Retiro/commit en orden ayuda a presentar excepciones precisas y estado coherente."
    ],
    "concept": "La idea central es separar “haber calculado” de “haber hecho visible arquitectónicamente”. Una CPU puede conocer un resultado antes de estar autorizada a comprometerlo.",
    "diagram": [
      "execute early",
      "↓ resultado temporal",
      "validate",
      "↓",
      "retire / discard"
    ],
    "rules": [
      "Especular no significa saltarse la semántica ISA.",
      "Una excepción detectada especulativamente no siempre se entrega inmediatamente.",
      "Rollback requiere conservar suficiente información."
    ],
    "deep": {
      "sections": [
        {
          "title": "Especulación",
          "body": "Puede apoyarse en predicción de saltos, memoria u otros mecanismos. El objetivo es ocultar latencias y mantener unidades ocupadas."
        },
        {
          "title": "Estado preciso",
          "body": "El software debe observar un orden permitido por la arquitectura. Para excepciones precisas, las instrucciones anteriores aparecen completadas y las posteriores no comprometidas."
        },
        {
          "title": "Retiro",
          "body": "Retirement/commit marca la transición de resultados desde estado interno especulativo a estado arquitectónico visible según el diseño."
        },
        {
          "title": "Seguridad",
          "body": "Aunque el estado arquitectónico se revierta, efectos microarquitectónicos pueden persistir. Esa separación es relevante para canales laterales, tema que se tratará en seguridad."
        }
      ],
      "commonErrors": [
        "Equivaler ejecución a commit.",
        "Creer que rollback deshace necesariamente todos los efectos microarquitectónicos."
      ],
      "connections": [
        "Bloque 023: seguridad.",
        "Bloque 007: ROB."
      ]
    },
    "example": {
      "problem": "Una instrucción especulativa calcula un valor pero luego se descubre que pertenecía a un camino mal predicho. ¿Debe modificar el registro arquitectónico final?",
      "steps": [
        [
          "Cálculo",
          "Puede haberse ejecutado internamente."
        ],
        [
          "Validación",
          "El branch invalida el camino."
        ],
        [
          "Resultado",
          "El efecto arquitectónico se descarta."
        ]
      ],
      "answer": "No."
    },
    "check": {
      "question": "¿Ejecutada y retirada significan siempre lo mismo?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Una instrucción puede ejecutarse antes y retirarse más tarde."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Trabajo del camino mal predicho debe comprometer estado arquitectónico? sí/no",
        "answer": "no",
        "hint": "Debe descartarse."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Término inglés habitual para retiro/compromiso:",
        "answer": "retire",
        "alternatives": [
          "commit"
        ],
        "hint": "Retirement/commit."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Rollback arquitectónico garantiza borrar todos los rastros microarquitectónicos? sí/no",
        "answer": "no",
        "hint": "Caches/predictores pueden conservar efectos."
      }
    ]
  },
  "ooo-renaming": {
    "id": "ooo-renaming",
    "courseId": 7,
    "title": "Ejecución fuera de orden y register renaming",
    "shortTitle": "Reordenar trabajo sin reordenar el contrato",
    "duration": 100,
    "objective": "explicar cómo scheduling dinámico y renombrado explotan ILP eliminando dependencias falsas.",
    "summary": [
      "OoO permite ejecutar instrucciones listas antes que otras anteriores bloqueadas.",
      "Register renaming asigna registros físicos para eliminar WAR y WAW de nombre.",
      "Las dependencias RAW verdaderas permanecen."
    ],
    "concept": "La máquina puede cambiar el orden interno de ejecución mientras preserve el comportamiento arquitectónico permitido. Renombrar no inventa paralelismo: elimina obstáculos artificiales creados por reutilizar nombres.",
    "diagram": [
      "reg arquitectónico r1",
      "↓ rename",
      "p17 / p42 / ...",
      "↓ scheduler",
      "unidades ejecución"
    ],
    "rules": [
      "RAW no desaparece con renombrado.",
      "WAW/WAR pueden desaparecer si eran solo conflictos de nombre.",
      "OoO necesita seguimiento de operandos y recursos."
    ],
    "deep": {
      "sections": [
        {
          "title": "Ventana de instrucciones",
          "body": "El procesador mantiene varias instrucciones en vuelo y selecciona las listas cuyos operandos y recursos están disponibles."
        },
        {
          "title": "Renombrado",
          "body": "Cada nueva escritura puede recibir un registro físico distinto. Así, dos escrituras al mismo nombre arquitectónico no tienen por qué serializarse internamente."
        },
        {
          "title": "Wakeup/select",
          "body": "Cuando llegan operandos, estructuras de scheduling pueden despertar consumidores y elegir qué micro-operaciones emitir."
        },
        {
          "title": "Límites",
          "body": "ILP finito, misses de memoria, branches y tamaño de ventana limitan cuánto paralelismo puede descubrirse."
        }
      ],
      "commonErrors": [
        "Creer que OoO viola el programa.",
        "Pensar que renombrado elimina RAW."
      ],
      "connections": [
        "Bloque 059: paralelismo.",
        "Bloque 074: performance."
      ]
    },
    "example": {
      "problem": "I1 escribe R1, I2 lee R2 independiente, I3 vuelve a escribir R1. ¿Qué dependencia entre I1 e I3 puede eliminar renombrado?",
      "steps": [
        [
          "Nombres",
          "Ambas escriben el mismo registro arquitectónico."
        ],
        [
          "Flujo",
          "I3 no necesita el valor de I1."
        ],
        [
          "Tipo",
          "Es WAW de nombre."
        ]
      ],
      "answer": "WAW."
    },
    "check": {
      "question": "¿Register renaming elimina una RAW verdadera?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El consumidor sigue necesitando el valor real."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Dependencia eliminable típica por renombrado entre dos escrituras:",
        "answer": "waw",
        "hint": "Write After Write."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿OoO exige que todas las instrucciones se retiren fuera de orden? sí/no",
        "answer": "no",
        "hint": "Muchos diseños retiran en orden."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Renombrar aumenta por sí solo el ILP verdadero del algoritmo? sí/no",
        "answer": "no",
        "hint": "Elimina falsas dependencias, no las verdaderas."
      }
    ]
  },
  "rob-retirement": {
    "id": "rob-retirement",
    "courseId": 7,
    "title": "Reorder buffer y retiro de instrucciones",
    "shortTitle": "El árbitro del orden arquitectónico",
    "duration": 94,
    "objective": "explicar el papel conceptual de estructuras de reorder/retirement en excepciones precisas y commit ordenado.",
    "summary": [
      "Una estructura de reorder sigue instrucciones en vuelo en orden de programa.",
      "Resultados pueden completarse fuera de orden y hacerse visibles más tarde.",
      "El retiro ordenado facilita estado preciso y recuperación."
    ],
    "concept": "El ROB es una solución microarquitectónica común, no una obligación de toda ISA ni el único diseño posible. Su función conceptual es separar finalización física y compromiso arquitectónico.",
    "diagram": [
      "program order → ROB entries",
      "execution ↕",
      "head → retire"
    ],
    "rules": [
      "No atribuyas ROB a la ISA.",
      "Completed ≠ retired.",
      "Una entrada bloqueada en cabeza puede limitar retiro aunque posteriores hayan terminado."
    ],
    "deep": {
      "sections": [
        {
          "title": "Seguimiento",
          "body": "Cada instrucción o micro-op mantiene metadatos suficientes para saber si terminó, si produjo excepción y cuándo puede comprometerse."
        },
        {
          "title": "Head of ROB",
          "body": "Retirar desde el frente preserva orden visible. Una instrucción antigua pendiente puede impedir retirar resultados posteriores ya listos."
        },
        {
          "title": "Excepciones",
          "body": "Si una instrucción debe generar una excepción, el procesador puede descartar trabajo posterior y presentar un punto arquitectónico coherente."
        },
        {
          "title": "Implementaciones",
          "body": "Los nombres y particiones concretas varían. El concepto de ROB se usa aquí como modelo de muchas CPUs OoO modernas, no como requisito universal."
        }
      ],
      "commonErrors": [
        "Pensar que ROB almacena necesariamente todos los datos de la misma forma en toda CPU.",
        "Confundir completar con retirar."
      ],
      "connections": [
        "Bloque 012: excepciones y kernel.",
        "Bloque 011: debugging."
      ]
    },
    "example": {
      "problem": "I1 tarda, I2 termina antes. En un diseño con retiro en orden, ¿puede I2 retirarse antes que I1?",
      "steps": [
        [
          "Ejecución",
          "I2 puede terminar primero."
        ],
        [
          "Retiro",
          "La cabeza sigue siendo I1."
        ],
        [
          "Conclusión",
          "I2 espera para commit."
        ]
      ],
      "answer": "No."
    },
    "check": {
      "question": "¿El ROB forma parte obligatoria de la ISA?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Es una técnica microarquitectónica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Completed y retired son necesariamente simultáneos? sí/no",
        "answer": "no",
        "hint": "Puede terminar antes de commit."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Retiro ordenado ayuda a excepciones precisas? sí/no",
        "answer": "si",
        "hint": "Mantiene un punto visible coherente."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Toda CPU OoO debe implementar un ROB con exactamente la misma estructura? sí/no",
        "answer": "no",
        "hint": "Es una familia de diseños, no contrato ISA."
      }
    ]
  },
  "superscalar-ilp": {
    "id": "superscalar-ilp",
    "courseId": 7,
    "title": "Superscalaridad, ancho e ILP",
    "shortTitle": "Más carriles solo sirven si hay tráfico independiente",
    "duration": 90,
    "objective": "relacionar ancho de fetch/decode/issue/retire con ILP y reconocer cuellos de botella del front-end y back-end.",
    "summary": [
      "Superscalar describe capacidad de procesar múltiples operaciones por ciclo en determinadas etapas.",
      "El ancho teórico no garantiza IPC igual al ancho.",
      "ILP disponible y recursos físicos limitan la utilización."
    ],
    "concept": "Una CPU de ancho 6 no promete 6 instrucciones retiradas cada ciclo. El programa, el front-end, las dependencias, la memoria y las unidades de ejecución tienen derecho a arruinar la fiesta.",
    "diagram": [
      "fetch width",
      "→ decode width",
      "→ issue width",
      "→ execute ports",
      "→ retire width"
    ],
    "rules": [
      "Distingue ancho máximo de throughput observado.",
      "IPC puede superar 1 en un diseño superscalar.",
      "El cuello de botella puede cambiar por workload."
    ],
    "deep": {
      "sections": [
        {
          "title": "Anchos diferentes",
          "body": "Fetch, decode, rename, issue y retire pueden tener anchos distintos. La menor capacidad relevante puede limitar el flujo."
        },
        {
          "title": "ILP",
          "body": "Instruction-Level Parallelism mide oportunidades de ejecutar operaciones independientes simultáneamente dentro de un hilo."
        },
        {
          "title": "Puertos y unidades",
          "body": "Dos instrucciones listas pueden competir por la misma unidad funcional, generando structural pressure."
        },
        {
          "title": "Front-end",
          "body": "Caches de instrucciones, decodificadores y predicción pueden impedir alimentar el back-end incluso cuando hay capacidad de ejecución libre."
        }
      ],
      "commonErrors": [
        "Igualar superscalar a multicore.",
        "Tomar el ancho nominal como IPC garantizado."
      ],
      "connections": [
        "Bloque 059: TLP/SIMD.",
        "Bloque 008: front-end y cachés."
      ]
    },
    "example": {
      "problem": "CPU con retire width 4 retira 240 instrucciones en 100 ciclos. IPC observado:",
      "steps": [
        [
          "División",
          "240/100."
        ],
        [
          "Resultado",
          "2,4 instrucciones/ciclo."
        ],
        [
          "Interpretación",
          "Por debajo del máximo 4."
        ]
      ],
      "answer": "2.4."
    },
    "check": {
      "question": "¿Una CPU superscalar puede tener IPC mayor que 1?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Puede retirar varias instrucciones por ciclo si existen recursos y paralelismo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "300 instrucciones retiradas en 200 ciclos: IPC:",
        "answer": "1.5",
        "alternatives": [
          "1,5"
        ],
        "hint": "300/200."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ancho 8 garantiza IPC=8? sí/no",
        "answer": "no",
        "hint": "Dependencias y cuellos de botella."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿ILP y número de cores son la misma forma de paralelismo? sí/no",
        "answer": "no",
        "hint": "ILP opera dentro del flujo de instrucciones."
      }
    ]
  },
  "microops-microcode": {
    "id": "microops-microcode",
    "courseId": 7,
    "title": "Micro-ops, macroinstrucciones y microcode",
    "shortTitle": "Una instrucción visible puede esconder bastante fontanería",
    "duration": 86,
    "objective": "distinguir instrucción ISA, micro-op y microcode sin generalizar detalles de una familia a todas las CPUs.",
    "summary": [
      "Algunas microarquitecturas traducen instrucciones arquitectónicas a operaciones internas más simples.",
      "Micro-op no es un concepto arquitectónico universal ni visible al software ordinario.",
      "Microcode puede implementar o asistir secuencias complejas en determinados diseños."
    ],
    "concept": "La instrucción que ve el programador y las operaciones internas que ejecuta la CPU pertenecen a niveles distintos. Intel documenta explícitamente micro-ops en sus microarquitecturas; no debes extrapolar ese mecanismo exacto a cualquier procesador.",
    "diagram": [
      "instrucción ISA",
      "↓ decode",
      "μops internas",
      "↓ schedule/execute"
    ],
    "rules": [
      "No llames micro-op a toda instrucción RISC.",
      "Microcode ≠ firmware del sistema.",
      "Una instrucción puede mapear a distinto número de operaciones internas según implementación."
    ],
    "deep": {
      "sections": [
        {
          "title": "Traducción interna",
          "body": "En diseños x86 modernos, el front-end puede traducir instrucciones a micro-ops que consume el motor OoO. Algunas secuencias pueden venir de mecanismos de microcode."
        },
        {
          "title": "Fusión",
          "body": "Determinadas microarquitecturas pueden fusionar operaciones en ciertas etapas; estos detalles son específicos del diseño."
        },
        {
          "title": "Microcode",
          "body": "Es control interno del procesador para determinadas operaciones y puede ser actualizable en algunas plataformas. No sustituye BIOS/UEFI ni el kernel."
        },
        {
          "title": "Portabilidad",
          "body": "Optimizar contra detalles de μops exige identificar microarquitectura concreta; la ISA por sí sola no especifica esos costes."
        }
      ],
      "commonErrors": [
        "Decir “x86 ejecuta RISC internamente” como descripción completa.",
        "Confundir microcode con ISA."
      ],
      "connections": [
        "Bloque 010: compiladores.",
        "Bloque 074: optimización."
      ]
    },
    "example": {
      "problem": "Dos CPUs implementan x86-64 pero descomponen una instrucción de manera interna diferente. ¿Pueden ambas cumplir la ISA?",
      "steps": [
        [
          "Contrato",
          "La ISA fija resultado visible."
        ],
        [
          "Interior",
          "Las μops no forman parte de ese contrato."
        ],
        [
          "Conclusión",
          "Pueden diferir internamente."
        ]
      ],
      "answer": "Sí."
    },
    "check": {
      "question": "¿El número de micro-ops está fijado por la ISA x86-64?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Es un detalle microarquitectónico."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Micro-op es necesariamente visible al programa? sí/no",
        "answer": "no",
        "hint": "Es interna."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Microcode y BIOS son sinónimos? sí/no",
        "answer": "no",
        "hint": "Operan en capas distintas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Dos microarquitecturas de la misma ISA pueden usar distinto número interno de operaciones? sí/no",
        "answer": "si",
        "hint": "La ISA fija semántica, no implementación."
      }
    ]
  },
  "ipc-cpi-latency-throughput": {
    "id": "ipc-cpi-latency-throughput",
    "courseId": 7,
    "title": "IPC, CPI, latencia y throughput",
    "shortTitle": "Cuatro métricas; ninguna merece gobernar sola",
    "duration": 96,
    "objective": "calcular IPC/CPI en contextos simples y explicar por qué comparar rendimiento exige workload y metodología.",
    "summary": [
      "IPC = instrucciones retiradas / ciclos bajo una definición concreta.",
      "CPI es su inverso solo cuando ambos se calculan sobre exactamente la misma población y periodo.",
      "Latencia y throughput describen aspectos distintos del rendimiento."
    ],
    "concept": "Las métricas de rendimiento son cocientes de eventos definidos. Sin especificar qué se cuenta, durante cuánto tiempo y bajo qué condiciones, un número con tres decimales puede ser solo decoración científica.",
    "diagram": [
      "instructions retired / cycles → IPC",
      "cycles / instructions → CPI",
      "latency ≠ throughput"
    ],
    "rules": [
      "Compara misma tarea y configuración.",
      "Distingue instrucciones ISA de micro-ops.",
      "Contadores pueden incluir efectos del sistema según plataforma."
    ],
    "deep": {
      "sections": [
        {
          "title": "IPC y CPI",
          "body": "En un intervalo con N instrucciones retiradas y C ciclos, IPC=N/C y CPI=C/N. Si cambias qué eventos entran en N o C, la relación deja de ser comparable."
        },
        {
          "title": "Frecuencia",
          "body": "Tiempo ≈ ciclos/frecuencia. Una CPU con menor CPI puede aun tardar más si su frecuencia o workload difieren; tampoco frecuencia alta garantiza menor tiempo."
        },
        {
          "title": "Latencia",
          "body": "Tiempo para completar una operación o petición. Throughput es tasa sostenida de trabajo completado. Optimizar uno puede perjudicar otro."
        },
        {
          "title": "Medición",
          "body": "Warm-up, afinidad, frecuencia dinámica, interrupciones, caches y ruido estadístico importan. El benchmarking serio requiere repetición y contexto."
        }
      ],
      "commonErrors": [
        "Comparar IPC entre ISA como medida universal de eficiencia.",
        "Confundir instrucciones retiradas con micro-ops.",
        "Usar frecuencia como rendimiento."
      ],
      "connections": [
        "Bloque 074: benchmarking.",
        "RISC-V Zicntr: cycle/instret."
      ]
    },
    "example": {
      "problem": "Se retiran 1.2e9 instrucciones en 8e8 ciclos. IPC y CPI:",
      "steps": [
        [
          "IPC",
          "1.2e9 / 0.8e9 = 1.5."
        ],
        [
          "CPI",
          "0.8e9 / 1.2e9 ≈ 0.667."
        ],
        [
          "Chequeo",
          "Son inversos bajo la misma medición."
        ]
      ],
      "answer": "IPC=1.5, CPI≈0.667."
    },
    "check": {
      "question": "¿IPC mayor siempre implica menor tiempo de ejecución entre programas diferentes?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "También importan número de instrucciones, frecuencia y condiciones."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "600 instrucciones / 400 ciclos: IPC:",
        "answer": "1.5",
        "alternatives": [
          "1,5"
        ],
        "hint": "600/400."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "IPC=2 con misma definición: CPI:",
        "answer": "0.5",
        "alternatives": [
          "0,5"
        ],
        "hint": "Inverso."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿IPC de dos ISA distintas basta para decidir cuál ejecuta antes una tarea? sí/no",
        "answer": "no",
        "hint": "Instruction count y frecuencia también cambian."
      }
    ]
  },
  "amdahl-benchmarking": {
    "id": "amdahl-benchmarking",
    "courseId": 7,
    "title": "Ley de Amdahl y benchmarking",
    "shortTitle": "Optimizar el 1 % con heroísmo sigue siendo optimizar el 1 %",
    "duration": 92,
    "objective": "aplicar la ley de Amdahl y diseñar comparaciones de rendimiento que midan tiempo útil y no solo métricas aisladas.",
    "summary": [
      "Amdahl limita el speedup global por la fracción que realmente mejora.",
      "Speedup = 1 / ((1−p)+p/s) en el modelo clásico.",
      "Benchmarking válido exige workload representativo, medición repetible y análisis de variabilidad."
    ],
    "concept": "Optimizar una parte infinitamente rápido no hace desaparecer el resto. Amdahl es una vacuna matemática contra el entusiasmo selectivo.",
    "diagram": [
      "p mejorable → speedup s",
      "resto 1−p sin cambio",
      "↓",
      "speedup global limitado"
    ],
    "rules": [
      "Declara la fracción p y el speedup local s.",
      "El modelo supone una descomposición concreta del tiempo.",
      "Mide tiempo extremo a extremo cuando ese sea el objetivo real."
    ],
    "deep": {
      "sections": [
        {
          "title": "Fórmula",
          "body": "Si una fracción p del tiempo original mejora por factor s, el nuevo tiempo normalizado es (1−p)+p/s. Su inverso es el speedup global."
        },
        {
          "title": "Límite",
          "body": "Si s→∞, el speedup máximo es 1/(1−p). Una parte serial o no mejorada domina el límite."
        },
        {
          "title": "Benchmark",
          "body": "Un benchmark debe representar la pregunta. Microbenchmarks aíslan mecanismos; suites y cargas end-to-end responden preguntas diferentes."
        },
        {
          "title": "Reproducibilidad",
          "body": "Documenta hardware, software, compilador, flags, datos, número de repeticiones y estadísticos. Elegir el mejor resultado de veinte sin explicación no es metodología, es casting."
        }
      ],
      "commonErrors": [
        "Sumar speedups locales.",
        "Aplicar Amdahl sin definir la fracción temporal.",
        "Cambiar workload entre comparaciones."
      ],
      "connections": [
        "Bloque 032: optimización.",
        "Bloque 059: paralelismo.",
        "Bloque 074: performance engineering."
      ]
    },
    "example": {
      "problem": "El 80 % del tiempo mejora 4×. Speedup global:",
      "steps": [
        [
          "Nuevo tiempo",
          "0.2 + 0.8/4 = 0.4."
        ],
        [
          "Speedup",
          "1/0.4 = 2.5."
        ],
        [
          "Límite",
          "No es 4× porque 20 % no mejora."
        ]
      ],
      "answer": "2.5×."
    },
    "check": {
      "question": "Si solo mejoras el 10 % del tiempo infinitamente, ¿el speedup máximo es menor que 2×?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ]
      ],
      "success": "Correcto: 1/0.9≈1.11×.",
      "failure": "La parte no mejorada domina."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "p=0.5, s=2. Speedup global:",
        "answer": "1.333",
        "alternatives": [
          "1.33",
          "4/3"
        ],
        "hint": "1/(0.5+0.25)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "p=0.75 y s→infinito. Speedup máximo:",
        "answer": "4",
        "hint": "1/(1−p)."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un microbenchmark sustituye siempre una prueba end-to-end? sí/no",
        "answer": "no",
        "hint": "Responden preguntas distintas."
      }
    ]
  }
});
