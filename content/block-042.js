/**
 * BLOQUE 042 — IA para videojuegos
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar percepción, decisión, planificación, navegación y
 * locomoción. Un algoritmo de decisión no concede conocimiento omnisciente y
 * un path global no sustituye steering, avoidance ni collision response.
 */
window.LEARNING_PATHS[42] = {
  "level": "Experto progresivo",
  "estimatedHours": 126,
  "description": "IA para videojuegos: decisión, comportamiento, pathfinding, navmeshes, steering, percepción y depuración a escala.",
  "outcomes": [
    "Separar decisión, navegación y movimiento en contratos depurables.",
    "Construir FSM, behaviour trees y utility AI con semántica temporal explícita.",
    "Aplicar A*, navmeshes, path following y avoidance con garantías y límites claros.",
    "Integrar percepción, comportamiento procedural y presupuestos de CPU en NPC reproducibles."
  ],
  "modules": [
    {
      "id": "m1-decision",
      "title": "Decisión",
      "description": "Arquitectura, FSM, BT y utility",
      "lessons": [
        "gameai-architecture",
        "gameai-fsm",
        "gameai-behavior-trees",
        "gameai-utility"
      ]
    },
    {
      "id": "m2-navigation",
      "title": "Movimiento y navegación",
      "description": "Steering, A*, paths y navmeshes",
      "lessons": [
        "gameai-steering",
        "gameai-astar",
        "gameai-pathfinding",
        "gameai-navmesh"
      ]
    },
    {
      "id": "m3-agents",
      "title": "Agentes en mundo dinámico",
      "description": "Following, avoidance, percepción y táctica",
      "lessons": [
        "gameai-path-following-avoidance",
        "gameai-perception-memory",
        "gameai-tactical-reasoning"
      ]
    },
    {
      "id": "m4-production",
      "title": "Producción",
      "description": "Procedural, depuración e integración",
      "lessons": [
        "gameai-procedural-behavior",
        "gameai-debugging-performance",
        "gameai-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "gameai-architecture": {
    "id": "gameai-architecture",
    "courseId": 42,
    "title": "Arquitectura de IA: decisión, navegación y movimiento",
    "shortTitle": "Arquitectura de IA: decisión, navegación y movimiento",
    "duration": 110,
    "objective": "Separar percepción, memoria, decisión, planificación, navegación y locomoción para construir agentes depurables y escalables.",
    "summary": [
      "La IA de un NPC no es un único algoritmo: percepción, estado interno, selección de intención, planificación, pathfinding y steering resuelven problemas diferentes.",
      "Separar capas permite actualizar cada una con frecuencias, presupuestos y datos distintos sin convertir cada agente en una función monolítica por frame.",
      "La salida de una capa debe ser un contrato explícito: una decisión puede pedir “llegar a cobertura”, mientras navegación produce un corredor y locomoción una velocidad deseada."
    ],
    "concept": "La IA de un NPC no es un único algoritmo: percepción, estado interno, selección de intención, planificación, pathfinding y steering resuelven problemas diferentes.",
    "rules": [
      "Define contratos entre decisión, navegación y movimiento.",
      "No uses el transform visual como única memoria cognitiva del agente.",
      "Presupuesta CPU y frecuencia de actualización por subsistema."
    ],
    "deep": {
      "intro": "Separar percepción, memoria, decisión, planificación, navegación y locomoción para construir agentes depurables y escalables.",
      "sections": [
        {
          "title": "Capas",
          "body": "Un agente práctico puede dividirse en sensores→blackboard/memoria→selector/planner→pathfinding→path following/steering→controller físico."
        },
        {
          "title": "Frecuencias",
          "body": "Percepción costosa puede actualizarse a 5–10 Hz mientras steering opera a frecuencia de simulación. Escalonar agentes evita picos sincronizados."
        },
        {
          "title": "Autoridad",
          "body": "La IA propone intención; el character controller/physics decide movimiento realmente factible y devuelve feedback."
        },
        {
          "title": "Depuración",
          "body": "Log de decisiones, objetivos, costes, path y steering debe poder visualizarse sin inferirlo desde la animación."
        }
      ]
    },
    "example": {
      "problem": "200 NPC. Decisión cuesta 0.08 ms y se actualiza a 10 Hz. Si se distribuye uniformemente en un juego de 60 FPS, coste medio por frame aproximado.",
      "steps": [
        "200·10=2000 evaluaciones/s.",
        "2000/60≈33.333 evaluaciones/frame.",
        "33.333·0.08≈2.667 ms."
      ],
      "solution": "≈2.67 ms/frame de media."
    },
    "check": {
      "question": "¿Pathfinding global y steering local resuelven exactamente el mismo problema?",
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
          "Solo a 60 FPS",
          false
        ]
      ],
      "feedback": "Uno busca ruta/conectividad; el otro produce movimiento local."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "120 NPC, sensor 0.02 ms cada uno. Coste si todos actualizan en un frame.",
        "answer": "2.4",
        "hint": "120·0.02."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Decisión y locomoción deben compartir necesariamente la misma frecuencia?",
        "answer": "no",
        "hint": "Pueden presupuestarse distinto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El controller físico puede rechazar una velocidad deseada?",
        "answer": "si",
        "hint": "La IA propone; física valida."
      }
    ]
  },
  "gameai-fsm": {
    "id": "gameai-fsm",
    "courseId": 42,
    "title": "Finite State Machines para comportamiento",
    "shortTitle": "Finite State Machines para comportamiento",
    "duration": 110,
    "objective": "Diseñar FSM con estados, transiciones, guards y prioridades sin convertirlas en grafos inmanejables.",
    "summary": [
      "Una FSM representa un estado discreto activo y transiciones gobernadas por eventos/condiciones; es adecuada cuando el espacio de modos es pequeño y explícito.",
      "Añadir estados para cada combinación ortogonal causa explosión combinatoria; máquinas jerárquicas o regiones independientes pueden modelar mejor dimensiones separadas.",
      "Las condiciones de transición deben tener prioridad y semántica de interrupción claras para evitar oscilaciones y dependencias implícitas del orden."
    ],
    "concept": "Una FSM representa un estado discreto activo y transiciones gobernadas por eventos/condiciones; es adecuada cuando el espacio de modos es pequeño y explícito.",
    "rules": [
      "Separa estado, condición y efecto de transición.",
      "Evita codificar cada combinación de variables como un estado nuevo.",
      "Define prioridad, cooldown o hysteresis cuando dos transiciones puedan alternar."
    ],
    "deep": {
      "intro": "Diseñar FSM con estados, transiciones, guards y prioridades sin convertirlas en grafos inmanejables.",
      "sections": [
        {
          "title": "Modelo",
          "body": "FSM=(S, eventos/inputs, transición). Un estado describe modo, no toda la memoria del agente."
        },
        {
          "title": "Explosión",
          "body": "Locomoción, postura y combate son dimensiones potencialmente ortogonales; su producto cartesiano crece rápido."
        },
        {
          "title": "Hysteresis",
          "body": "Umbrales distintos para entrar/salir de un estado reducen thrashing cerca de fronteras."
        },
        {
          "title": "HFSM",
          "body": "Estados jerárquicos comparten comportamiento padre y reducen duplicación, pero añaden reglas de entrada/salida."
        }
      ]
    },
    "example": {
      "problem": "Una FSM plana combina 5 modos de locomoción, 4 posturas y 3 estados de alerta. Máximo de combinaciones si se materializan todas.",
      "steps": [
        "5·4·3=60."
      ],
      "solution": "60 estados combinados."
    },
    "check": {
      "question": "¿Una FSM plana debe crear un estado por cada combinación ortogonal?",
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
          "Siempre 2^n",
          false
        ]
      ],
      "feedback": "La explosión combinatoria suele justificar jerarquía o dimensiones separadas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "4 estados con transición dirigida completa entre distintos. Aristas.",
        "answer": "12",
        "hint": "4·3."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Hysteresis puede reducir cambios repetidos de estado?",
        "answer": "si",
        "hint": "Usa umbrales distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿HFSM elimina toda complejidad de transiciones?",
        "answer": "no",
        "hint": "Solo reorganiza/compartimenta."
      }
    ]
  },
  "gameai-behavior-trees": {
    "id": "gameai-behavior-trees",
    "courseId": 42,
    "title": "Behaviour Trees: composición reactiva",
    "shortTitle": "Behaviour Trees: composición reactiva",
    "duration": 110,
    "objective": "Construir behaviour trees con Sequence, Selector, condiciones y acciones comprendiendo SUCCESS/FAILURE/RUNNING y estado temporal.",
    "summary": [
      "Un behaviour tree evalúa nodos jerárquicos con estados como SUCCESS, FAILURE y RUNNING; Sequence y Selector implementan composiciones distintas.",
      "Un árbol reactivo puede reevaluar condiciones y abortar ramas, pero eso exige políticas explícitas de memoria, interrupción y cleanup.",
      "Un BT organiza control, no resuelve por sí mismo percepción, pathfinding ni movimiento físico."
    ],
    "concept": "Un behaviour tree evalúa nodos jerárquicos con estados como SUCCESS, FAILURE y RUNNING; Sequence y Selector implementan composiciones distintas.",
    "rules": [
      "Define qué nodos recuerdan progreso entre ticks.",
      "Cancela/limpia acciones RUNNING al abortar una rama.",
      "No escondas side effects importantes dentro de condiciones supuestamente puras."
    ],
    "deep": {
      "intro": "Construir behaviour trees con Sequence, Selector, condiciones y acciones comprendiendo SUCCESS/FAILURE/RUNNING y estado temporal.",
      "sections": [
        {
          "title": "Sequence",
          "body": "Ejecuta hijos hasta que uno falla o queda RUNNING; tiene éxito cuando todos tienen éxito."
        },
        {
          "title": "Selector",
          "body": "Prueba alternativas hasta encontrar una que tenga éxito o siga RUNNING; falla si todas fallan."
        },
        {
          "title": "Reactive vs memory",
          "body": "Reiniciar desde el primer hijo cada tick puede permitir reacción rápida; recordar índice evita repetir trabajo. Son semánticas distintas."
        },
        {
          "title": "Abort",
          "body": "Cambiar de rama mientras una acción controla navegación/animación requiere cancelación determinista de recursos y objetivos."
        }
      ]
    },
    "example": {
      "problem": "Sequence con hijos SUCCESS, SUCCESS, FAILURE, Action4. ¿Se ejecuta Action4 en esa evaluación?",
      "steps": [
        "Sequence se detiene en el primer FAILURE.",
        "El tercer hijo falla antes de Action4."
      ],
      "solution": "No."
    },
    "check": {
      "question": "¿Un Selector continúa tras un hijo SUCCESS en la misma evaluación?",
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
          "Solo si es leaf",
          false
        ]
      ],
      "feedback": "Un selector estándar acepta la primera alternativa exitosa/RUNNING según semántica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Sequence: SUCCESS,RUNNING,SUCCESS. Resultado del Sequence.",
        "answer": "running",
        "hint": "Se detiene en RUNNING."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una condition debería iniciar una animación con side effect como regla general?",
        "answer": "no",
        "hint": "Mantén condiciones observacionales."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Abortar una acción RUNNING puede requerir cleanup?",
        "answer": "si",
        "hint": "Puede poseer navegación/animación."
      }
    ]
  },
  "gameai-utility": {
    "id": "gameai-utility",
    "courseId": 42,
    "title": "Utility AI y selección por puntuación",
    "shortTitle": "Utility AI y selección por puntuación",
    "duration": 110,
    "objective": "Diseñar sistemas utility con consideraciones, curvas, normalización, hysteresis y selección estable.",
    "summary": [
      "Utility AI asigna puntuaciones comparables a acciones a partir del contexto y selecciona o samplea según esas utilidades.",
      "Combinar consideraciones exige controlar escalas: sumar, multiplicar o usar curvas produce comportamientos muy distintos.",
      "Elegir siempre el máximo puede causar thrashing cuando dos acciones intercambian ventaja por ruido; inertia, cooldowns o hysteresis pueden estabilizar."
    ],
    "concept": "Utility AI asigna puntuaciones comparables a acciones a partir del contexto y selecciona o samplea según esas utilidades.",
    "rules": [
      "Normaliza o documenta escalas de cada consideration.",
      "No confundas score con probabilidad sin una transformación explícita.",
      "Registra la descomposición de la puntuación para depurar decisiones."
    ],
    "deep": {
      "intro": "Diseñar sistemas utility con consideraciones, curvas, normalización, hysteresis y selección estable.",
      "sections": [
        {
          "title": "Scoring",
          "body": "Una acción Heal puede depender de salud baja, peligro y disponibilidad de recurso; cada factor transforma input→utility."
        },
        {
          "title": "Combinar",
          "body": "Producto penaliza fuertemente cualquier factor cercano a cero; suma permite compensaciones. Ninguna combinación es universal."
        },
        {
          "title": "Selección",
          "body": "Argmax es determinista dado el estado; softmax/weighted random introduce stochasticidad controlada y necesita seed para replay."
        },
        {
          "title": "Estabilidad",
          "body": "Bonus de continuidad o cooldown evita cambiar de acción por diferencias minúsculas cada tick."
        }
      ]
    },
    "example": {
      "problem": "Acción A score=0.72, B=0.68 y A recibe bonus de continuidad 0.05. Score efectivo A.",
      "steps": [
        "0.72+0.05=0.77."
      ],
      "solution": "0.77."
    },
    "check": {
      "question": "¿Un utility score es automáticamente una probabilidad?",
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
          "Solo si está entre 0 y 1",
          false
        ]
      ],
      "feedback": "Hace falta una semántica/transformación explícita."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Scores A=0.4,B=0.9. Argmax elige.",
        "answer": "b",
        "hint": "Mayor score."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Multiplicar considerations y sumarlas son equivalentes?",
        "answer": "no",
        "hint": "Cambian compensaciones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene registrar componentes del score?",
        "answer": "si",
        "hint": "Ayuda a explicar decisiones."
      }
    ]
  },
  "gameai-steering": {
    "id": "gameai-steering",
    "courseId": 42,
    "title": "Steering: seek, arrive, flee y flocking",
    "shortTitle": "Steering: seek, arrive, flee y flocking",
    "duration": 110,
    "objective": "Convertir objetivos espaciales en velocidades/aceleraciones deseadas con límites y combinaciones estables.",
    "summary": [
      "Steering produce aceleración o velocidad deseada local; no calcula necesariamente una ruta global alrededor de obstáculos.",
      "Seek persigue un target, Arrive reduce velocidad cerca del objetivo y behaviours como separation/alignment/cohesion pueden combinarse para grupos.",
      "Sumar vectores sin límites ni prioridades puede producir cancelaciones, oscilaciones o velocidades imposibles; el controller final debe respetar dinámica y colisiones."
    ],
    "concept": "Steering produce aceleración o velocidad deseada local; no calcula necesariamente una ruta global alrededor de obstáculos.",
    "rules": [
      "Distingue desired velocity de velocidad realmente alcanzable.",
      "Clampa aceleración/velocidad según el modelo físico.",
      "No uses steering local como sustituto universal del pathfinding global."
    ],
    "deep": {
      "intro": "Convertir objetivos espaciales en velocidades/aceleraciones deseadas con límites y combinaciones estables.",
      "sections": [
        {
          "title": "Seek",
          "body": "desiredVelocity = normalize(target-position)·maxSpeed; steering puede ser desired-current velocity según el modelo."
        },
        {
          "title": "Arrive",
          "body": "Reduce desired speed dentro de un slowing radius para no oscilar atravesando el objetivo."
        },
        {
          "title": "Flocking",
          "body": "Separation, alignment y cohesion son objetivos locales; pesos y vecindad determinan comportamiento emergente."
        },
        {
          "title": "Composición",
          "body": "Blending ponderado, priority steering o arbitration evitan que una suma ingenua de deseos incompatibles destruya el control."
        }
      ]
    },
    "example": {
      "problem": "Agente a x=0 quiere x=10, maxSpeed=4. En seek 1D ideal, desired velocity.",
      "steps": [
        "Dirección positiva.",
        "Magnitud maxSpeed=4."
      ],
      "solution": "+4."
    },
    "check": {
      "question": "¿Seek local garantiza rodear una pared que bloquea el target?",
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
          "Solo con maxSpeed alto",
          false
        ]
      ],
      "feedback": "Para conectividad global se necesita pathfinding/navegación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "desired=8,current=5 en 1D; steering desired-current.",
        "answer": "3",
        "hint": "8-5."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Arrive reduce velocidad cerca del target?",
        "answer": "si",
        "hint": "Evita overshoot."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Separation y cohesion pueden competir?",
        "answer": "si",
        "hint": "Necesitan pesos/arbitration."
      }
    ]
  },
  "gameai-astar": {
    "id": "gameai-astar",
    "courseId": 42,
    "title": "A*: costes, heurísticas y optimalidad",
    "shortTitle": "A*: costes, heurísticas y optimalidad",
    "duration": 110,
    "objective": "Aplicar A* entendiendo g, h, f, heurísticas admisibles/consistentes y los trade-offs entre exactitud y expansión.",
    "summary": [
      "A* prioriza nodos con f(n)=g(n)+h(n): g es coste conocido desde origen y h estima coste restante.",
      "Con costes no negativos y condiciones apropiadas sobre la heurística, A* puede garantizar caminos óptimos; una heurística que sobreestima puede sacrificar esa garantía.",
      "h=0 reduce A* a una búsqueda tipo Dijkstra; una heurística informativa puede reducir expansiones sin cambiar el coste óptimo cuando conserva las propiedades requeridas."
    ],
    "concept": "A* prioriza nodos con f(n)=g(n)+h(n): g es coste conocido desde origen y h estima coste restante.",
    "rules": [
      "Usa la misma unidad para g y h.",
      "No declares optimalidad sin indicar propiedades de h y del grafo.",
      "Gestiona correctamente mejoras de coste/reaperturas según consistencia e implementación."
    ],
    "deep": {
      "intro": "Aplicar A* entendiendo g, h, f, heurísticas admisibles/consistentes y los trade-offs entre exactitud y expansión.",
      "sections": [
        {
          "title": "f=g+h",
          "body": "OPEN contiene frontera; se expande según prioridad f. CLOSED/estado visitado requiere cuidado si aparecen mejores caminos."
        },
        {
          "title": "Admisible",
          "body": "h(n)≤h*(n) no sobreestima el coste óptimo restante. Es una condición clave para garantías de optimalidad en formulaciones estándar."
        },
        {
          "title": "Consistente",
          "body": "h(n)≤c(n,n′)+h(n′) impone desigualdad triangular sobre aristas; simplifica la lógica de cierre en graph search estándar."
        },
        {
          "title": "Weighted A*",
          "body": "f=g+w·h con w>1 puede explorar menos a cambio de renunciar a optimalidad exacta; útil cuando el presupuesto importa más que el camino perfecto."
        }
      ]
    },
    "example": {
      "problem": "Nodo tiene g=12 y h=7. Calcula f en A* estándar.",
      "steps": [
        "f=g+h.",
        "12+7=19."
      ],
      "solution": "19."
    },
    "check": {
      "question": "¿h=0 convierte A* en una búsqueda tipo Dijkstra?",
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
          "Solo en árboles",
          false
        ]
      ],
      "feedback": "Con h cero la prioridad depende solo de g."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "g=5,h=9. f.",
        "answer": "14",
        "hint": "Suma."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una heurística admisible puede sobreestimar h*?",
        "answer": "no",
        "hint": "Por definición no."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Weighted A* w>1 conserva siempre optimalidad exacta?",
        "answer": "no",
        "hint": "Puede sacrificarla."
      }
    ]
  },
  "gameai-pathfinding": {
    "id": "gameai-pathfinding",
    "courseId": 42,
    "title": "Pathfinding práctico: grafos, grids y búsqueda jerárquica",
    "shortTitle": "Pathfinding práctico: grafos, grids y búsqueda jerárquica",
    "duration": 110,
    "objective": "Construir grafos de navegación y elegir búsqueda, costes y abstracciones adecuadas para mapas grandes y dinámicos.",
    "summary": [
      "Pathfinding opera sobre una representación navegable: grid, waypoint graph, polygon graph u otra abstracción; el resultado depende tanto del grafo como del algoritmo.",
      "Costes pueden modelar distancia, terreno, riesgo o preferencias, pero deben mantener semántica coherente con la heurística y las garantías deseadas.",
      "Mapas grandes requieren presupuestos, búsqueda incremental o jerárquica, caching y replanning; ejecutar A* completo para todos los agentes cada frame suele ser innecesario."
    ],
    "concept": "Pathfinding opera sobre una representación navegable: grid, waypoint graph, polygon graph u otra abstracción; el resultado depende tanto del grafo como del algoritmo.",
    "rules": [
      "Separa geometría del mundo de grafo de navegación.",
      "Versiona/invalida caminos cuando cambie conectividad relevante.",
      "Mide expansiones y latencia, no solo longitud final del path."
    ],
    "deep": {
      "intro": "Construir grafos de navegación y elegir búsqueda, costes y abstracciones adecuadas para mapas grandes y dinámicos.",
      "sections": [
        {
          "title": "Representación",
          "body": "Una grid facilita vecindad regular; waypoints reducen nodos; navmesh representa regiones caminables continuas."
        },
        {
          "title": "Costes",
          "body": "Terreno lento puede aumentar coste sin volverlo bloqueado; evita costes negativos en A*/Dijkstra estándar."
        },
        {
          "title": "Escala",
          "body": "Hierarchical pathfinding primero planifica entre regiones y luego refina localmente; reduce espacio de búsqueda."
        },
        {
          "title": "Dinámica",
          "body": "Puertas y obstáculos móviles pueden invalidar aristas o exigir replanning parcial; path cached no es una verdad eterna."
        }
      ]
    },
    "example": {
      "problem": "Ruta A cuesta 4+6+5; ruta B cuesta 8+3+2. ¿Cuál coste es menor?",
      "steps": [
        "A=15.",
        "B=13."
      ],
      "solution": "Ruta B, coste 13."
    },
    "check": {
      "question": "¿El path más corto geométricamente tiene que ser el de menor coste del juego?",
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
          "Siempre en navmesh",
          false
        ]
      ],
      "feedback": "El coste puede incluir terreno/riesgo/preferencias."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Costes de edges 2,7,4. Total.",
        "answer": "13",
        "hint": "Suma."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cambiar conectividad puede invalidar paths cacheados?",
        "answer": "si",
        "hint": "Necesita versión/replan."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Pathfinding jerárquico puede reducir espacio de búsqueda?",
        "answer": "si",
        "hint": "Planifica por abstracciones."
      }
    ]
  },
  "gameai-navmesh": {
    "id": "gameai-navmesh",
    "courseId": 42,
    "title": "Navigation meshes y corredores de camino",
    "shortTitle": "Navigation meshes y corredores de camino",
    "duration": 110,
    "objective": "Entender navmeshes como representación de espacio transitable, generación de corredores y refinamiento mediante portales/funnel.",
    "summary": [
      "Una navmesh representa regiones poligonales transitables para un agente/configuración concretos; no es la malla visual ni garantiza paso para cualquier radio/altura.",
      "Pathfinding suele operar sobre conectividad de polígonos y produce un corredor; después puede refinarse una trayectoria mediante portales/funnel.",
      "Cambios dinámicos pueden requerir obstáculos, links o rebake/actualización según el sistema; navegación y avoidance son problemas distintos."
    ],
    "concept": "Una navmesh representa regiones poligonales transitables para un agente/configuración concretos; no es la malla visual ni garantiza paso para cualquier radio/altura.",
    "rules": [
      "Baña/genera la navmesh con parámetros compatibles con el agente.",
      "No confundas corredor poligonal con trayectoria física final.",
      "Separa off-mesh links y semántica de acciones como saltar/abrir puerta."
    ],
    "deep": {
      "intro": "Entender navmeshes como representación de espacio transitable, generación de corredores y refinamiento mediante portales/funnel.",
      "sections": [
        {
          "title": "Walkable surface",
          "body": "Navmesh aproxima regiones por donde puede moverse un agente; slope, radius y clearance afectan la representación."
        },
        {
          "title": "Adjacency",
          "body": "Polígonos conectados forman un grafo de búsqueda más compacto que una discretización fina."
        },
        {
          "title": "Funnel",
          "body": "Dado un corredor de portales, funnel/string pulling busca una trayectoria más directa dentro del corredor."
        },
        {
          "title": "Dynamic world",
          "body": "Obstáculos locales, navigation links y rebuilds tienen costes y semánticas diferentes; no todo cambio exige rebake completo."
        }
      ]
    },
    "example": {
      "problem": "Un corredor contiene 9 polígonos. Si la búsqueda devuelve esos 9, ¿significa necesariamente 9 waypoints finales después de funnel?",
      "steps": [
        "Funnel puede eliminar esquinas innecesarias dentro del corredor."
      ],
      "solution": "No."
    },
    "check": {
      "question": "¿Una navmesh es la misma malla que se renderiza?",
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
          "Solo en 2D",
          false
        ]
      ],
      "feedback": "Representa espacio navegable para agentes, no geometría visual completa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un agente más ancho puede necesitar navmesh/parámetros diferentes?",
        "answer": "si",
        "hint": "Clearance/radius importan."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Funnel opera sobre portales de un corredor?",
        "answer": "si",
        "hint": "String pulling."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Off-mesh link puede representar un salto?",
        "answer": "si",
        "hint": "Añade conectividad semántica."
      }
    ]
  },
  "gameai-path-following-avoidance": {
    "id": "gameai-path-following-avoidance",
    "courseId": 42,
    "title": "Path following y local avoidance",
    "shortTitle": "Path following y local avoidance",
    "duration": 110,
    "objective": "Separar ruta global, seguimiento de corredor y avoidance local para agentes que comparten espacio dinámico.",
    "summary": [
      "Pathfinding global propone por dónde llegar; path following transforma el path en objetivos locales y avoidance ajusta velocidades para reducir colisiones dinámicas.",
      "Avoidance local no cambia necesariamente la conectividad global: puede rodear agentes cercanos pero no sabe que una puerta bloqueada obliga a otra habitación salvo integración con navegación.",
      "Algoritmos tipo RVO/ORCA trabajan con velocidades y horizontes temporales; parámetros extremos pueden generar oscilación, bloqueo o movimiento antinatural."
    ],
    "concept": "Pathfinding global propone por dónde llegar; path following transforma el path en objetivos locales y avoidance ajusta velocidades para reducir colisiones dinámicas.",
    "rules": [
      "No escribas la posición del agente directamente desde el nodo de navegación si physics/controller es autoritativo.",
      "Replanifica cuando el desvío local ya no puede recuperar el corredor.",
      "Distingue obstacle avoidance de collision response física."
    ],
    "deep": {
      "intro": "Separar ruta global, seguimiento de corredor y avoidance local para agentes que comparten espacio dinámico.",
      "sections": [
        {
          "title": "Following",
          "body": "Look-ahead y selección de siguiente punto evitan perseguir cada vértice exacto del path."
        },
        {
          "title": "Avoidance",
          "body": "RVO-like methods escogen velocidades evitando colisiones predichas entre agentes/obstáculos bajo un horizonte."
        },
        {
          "title": "Feedback",
          "body": "La velocidad segura calculada sigue siendo una propuesta; el controller puede rechazarla por paredes, pendientes o constraints."
        },
        {
          "title": "Deadlock",
          "body": "Pasillos estrechos y prioridades simétricas pueden crear bloqueo; se necesitan reglas de prioridad, replanning o reservas según el juego."
        }
      ]
    },
    "example": {
      "problem": "Velocidad preferida 5 m/s y avoidance limita solución segura a 3 m/s. ¿Cuál debería enviar el agente al controller si respeta avoidance?",
      "steps": [
        "Usa la velocidad segura calculada, no la preferida sin ajustar."
      ],
      "solution": "3 m/s."
    },
    "check": {
      "question": "¿Avoidance local sustituye siempre al replanning global?",
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
          "Solo con RVO",
          false
        ]
      ],
      "feedback": "Puede resolver interacciones locales, no cambios de conectividad arbitrarios."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "preferred=6,safe=4. Velocidad propuesta respetando avoidance.",
        "answer": "4",
        "hint": "Usa safe."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Avoidance equivale a collision response?",
        "answer": "no",
        "hint": "Uno previene/ajusta; otro resuelve contactos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un deadlock local puede requerir replanning/prioridad?",
        "answer": "si",
        "hint": "Sí, según entorno."
      }
    ]
  },
  "gameai-perception-memory": {
    "id": "gameai-perception-memory",
    "courseId": 42,
    "title": "Percepción, conocimiento y memoria del agente",
    "shortTitle": "Percepción, conocimiento y memoria del agente",
    "duration": 110,
    "objective": "Modelar sensores, line of sight, incertidumbre, memoria y blackboards sin conceder omnisciencia accidental a los NPC.",
    "summary": [
      "Percepción define qué información puede observar un agente; consultar directamente todo el world state crea omnisciencia aunque la decisión parezca sofisticada.",
      "Sensores pueden tener range, field of view, line-of-sight, frecuencia y ruido; la memoria debe distinguir observado ahora, recordado e inferido.",
      "Un blackboard es almacenamiento compartido de hechos/estado, no una garantía de consistencia ni una licencia para cualquier sistema escribir cualquier clave."
    ],
    "concept": "Percepción define qué información puede observar un agente; consultar directamente todo el world state crea omnisciencia aunque la decisión parezca sofisticada.",
    "rules": [
      "Etiqueta tiempo y procedencia de observaciones.",
      "Expira o degrada recuerdos cuando la semántica lo requiera.",
      "No uses queries globales como shortcut invisible de percepción."
    ],
    "deep": {
      "intro": "Modelar sensores, line of sight, incertidumbre, memoria y blackboards sin conceder omnisciencia accidental a los NPC.",
      "sections": [
        {
          "title": "Vision",
          "body": "FOV + distancia + ray/occlusion forman un modelo básico de visión; cada componente puede ser aproximado por presupuesto."
        },
        {
          "title": "Memory",
          "body": "lastSeenPosition necesita timestamp/confidence; no equivale a posición actual del target."
        },
        {
          "title": "Blackboard",
          "body": "Puede contener target, threat, cover y objetivos, pero necesita ownership/schema para evitar dependencias ocultas."
        },
        {
          "title": "Scheduling",
          "body": "Sensores escalonados y spatial queries reducen coste; la latencia perceptiva resultante puede incluso ser parte del diseño del NPC."
        }
      ]
    },
    "example": {
      "problem": "Un NPC vio al jugador en t=12.0 s y el recuerdo expira tras 5 s. En t=18.2 s, ¿sigue válido bajo esa regla?",
      "steps": [
        "Edad=6.2 s.",
        "6.2>5."
      ],
      "solution": "No."
    },
    "check": {
      "question": "¿lastSeenPosition equivale necesariamente a la posición actual del target?",
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
          "Durante 1 s sí",
          false
        ]
      ],
      "feedback": "Es una observación histórica con edad/confianza."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "FOV total 120°. Semiangulo desde forward.",
        "answer": "60",
        "hint": "Mitad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una observación debería tener timestamp?",
        "answer": "si",
        "hint": "Permite edad/staleness."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Blackboard global sin ownership puede crear acoplamiento?",
        "answer": "si",
        "hint": "Dependencias invisibles."
      }
    ]
  },
  "gameai-tactical-reasoning": {
    "id": "gameai-tactical-reasoning",
    "courseId": 42,
    "title": "Táctica: influencia, cobertura y selección espacial",
    "shortTitle": "Táctica: influencia, cobertura y selección espacial",
    "duration": 110,
    "objective": "Combinar consultas espaciales, costes y scores para elegir posiciones tácticas sin confundir score local con plan global.",
    "summary": [
      "Selección táctica transforma candidatos espaciales en decisiones evaluando cobertura, distancia, visibilidad, riesgo y coste de navegación.",
      "Influence maps y campos de coste resumen información sobre regiones, pero son aproximaciones que deben actualizarse con una frecuencia y resolución adecuadas.",
      "El mejor punto por score puede ser inaccesible o demasiado caro; la evaluación debe integrar factibilidad y coste de path."
    ],
    "concept": "Selección táctica transforma candidatos espaciales en decisiones evaluando cobertura, distancia, visibilidad, riesgo y coste de navegación.",
    "rules": [
      "Filtra candidatos imposibles antes o durante scoring.",
      "Separa score táctico de coste de navegación y documenta cómo se combinan.",
      "Evita recalcular consultas costosas para todos los agentes en el mismo frame."
    ],
    "deep": {
      "intro": "Combinar consultas espaciales, costes y scores para elegir posiciones tácticas sin confundir score local con plan global.",
      "sections": [
        {
          "title": "Candidates",
          "body": "Cover points, EQS-like samples o polígonos navmesh generan un conjunto finito de posiciones evaluables."
        },
        {
          "title": "Influence",
          "body": "Mapas de influencia propagan amenaza/control; resolución espacial y decay cambian la interpretación."
        },
        {
          "title": "Visibility",
          "body": "Ray tests o aproximaciones determinan exposure; estar cerca de cobertura no significa estar oculto desde el enemigo relevante."
        },
        {
          "title": "Budget",
          "body": "Procesar candidatos incrementalmente permite repartir coste en frames sin congelar el juego."
        }
      ]
    },
    "example": {
      "problem": "Punto A utility=9 y coste path=4; B utility=8 y coste=1. Si score final=utility-coste, ¿cuál gana?",
      "steps": [
        "A=5.",
        "B=7."
      ],
      "solution": "B."
    },
    "check": {
      "question": "¿El punto con mayor utility local debe elegirse aunque sea inalcanzable?",
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
          "Si utility>1",
          false
        ]
      ],
      "feedback": "La factibilidad/coste de navegación forma parte de la decisión."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "20 candidatos, filtras 7 imposibles. Quedan.",
        "answer": "13",
        "hint": "20-7."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cover point cercano garantiza cobertura contra cualquier enemigo?",
        "answer": "no",
        "hint": "Depende de dirección/visibilidad."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Se puede time-slicear evaluación táctica?",
        "answer": "si",
        "hint": "Reparte presupuesto."
      }
    ]
  },
  "gameai-procedural-behavior": {
    "id": "gameai-procedural-behavior",
    "courseId": 42,
    "title": "Comportamiento procedural y variación controlada",
    "shortTitle": "Comportamiento procedural y variación controlada",
    "duration": 110,
    "objective": "Generar variación reproducible mediante parámetros, semillas, gramáticas y selección contextual sin perder depurabilidad.",
    "summary": [
      "Procedural behaviour genera secuencias o parámetros a partir de reglas/datos en vez de authored scripts totalmente fijos; la aleatoriedad debe estar controlada y observable.",
      "Random no significa inteligente: la variación debe respetar constraints, contexto y objetivos, o solo produce ruido conductual.",
      "Semillas y streams PRNG separados permiten reproducir bugs y evitar que añadir una llamada aleatoria de VFX cambie decisiones de IA."
    ],
    "concept": "Procedural behaviour genera secuencias o parámetros a partir de reglas/datos en vez de authored scripts totalmente fijos; la aleatoriedad debe estar controlada y observable.",
    "rules": [
      "Usa PRNG con seed registrada para replays/debug.",
      "Separa random streams por subsistema cuando el orden de consumo no deba acoplarlos.",
      "Valida constraints después de generar variación."
    ],
    "deep": {
      "intro": "Generar variación reproducible mediante parámetros, semillas, gramáticas y selección contextual sin perder depurabilidad.",
      "sections": [
        {
          "title": "Parametric",
          "body": "Cambiar tiempos, pesos o rutas dentro de rangos produce variación barata sin crear estados nuevos."
        },
        {
          "title": "Rule systems",
          "body": "Gramáticas/GOAP-like compositions pueden generar secuencias, pero necesitan precondiciones/efectos o validadores."
        },
        {
          "title": "Random streams",
          "body": "Un único RNG global acopla sistemas por orden de llamadas; streams separados mejoran reproducibilidad."
        },
        {
          "title": "Quality",
          "body": "Mide diversidad y fallos de comportamiento con seeds de regresión, no solo con una partida visual."
        }
      ]
    },
    "example": {
      "problem": "PRNG determinista con misma seed y mismas llamadas en mismo orden. ¿Debe producir la misma secuencia?",
      "steps": [
        "Ésa es la propiedad de reproducibilidad esperada del generador determinista."
      ],
      "solution": "Sí."
    },
    "check": {
      "question": "¿Randomness por sí sola produce comportamiento inteligente?",
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
          "Con buena seed",
          false
        ]
      ],
      "feedback": "La variación necesita constraints, contexto y objetivos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "4 elecciones independientes de 3 opciones. Combinaciones.",
        "answer": "81",
        "hint": "3^4."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Misma seed basta si cambia el orden de llamadas PRNG?",
        "answer": "no",
        "hint": "La secuencia consumida cambia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Streams RNG separados reducen acoplamiento?",
        "answer": "si",
        "hint": "Aíslan consumo."
      }
    ]
  },
  "gameai-debugging-performance": {
    "id": "gameai-debugging-performance",
    "courseId": 42,
    "title": "Debugging, telemetría y presupuestos de IA",
    "shortTitle": "Debugging, telemetría y presupuestos de IA",
    "duration": 110,
    "objective": "Instrumentar agentes con trazas, overlays, contadores y presupuestos para explicar decisiones y evitar spikes.",
    "summary": [
      "Una IA mantenible debe explicar por qué eligió una acción: inputs perceptivos, scores, transición, path y steering necesitan observabilidad.",
      "El coste debe medirse por subsistema y distribución temporal; 500 agentes actualizados simultáneamente cada segundo pueden producir spikes aunque el promedio sea bajo.",
      "Time slicing, LOD de IA y actualizaciones escalonadas reducen coste, pero cambian latencia de reacción y deben tratarse como trade-offs de diseño."
    ],
    "concept": "Una IA mantenible debe explicar por qué eligió una acción: inputs perceptivos, scores, transición, path y steering necesitan observabilidad.",
    "rules": [
      "Registra razón de transición/selección, no solo estado final.",
      "Mide percentiles/spikes además del promedio.",
      "Haz visible cuándo un agente está usando información stale por presupuesto."
    ],
    "deep": {
      "intro": "Instrumentar agentes con trazas, overlays, contadores y presupuestos para explicar decisiones y evitar spikes.",
      "sections": [
        {
          "title": "Overlays",
          "body": "Dibuja FOV, target, path, corridor, velocity y BT/FSM activo para relacionar decisión con mundo."
        },
        {
          "title": "Trace",
          "body": "Un ring buffer por agente puede registrar eventos recientes sin volcar logs ilimitados."
        },
        {
          "title": "Budget",
          "body": "Asigna número máximo de expansiones A*, sensores o evaluaciones utility por frame."
        },
        {
          "title": "AI LOD",
          "body": "Agentes lejanos pueden simularse con menor frecuencia/modelo; debe preservarse gameplay relevante y evitar discontinuidades visibles."
        }
      ]
    },
    "example": {
      "problem": "600 agentes, se actualiza decisión de 1/6 por frame. ¿Cuántos agentes por frame si reparto exacto?",
      "steps": [
        "600/6=100."
      ],
      "solution": "100."
    },
    "check": {
      "question": "¿Un coste medio bajo descarta spikes de IA?",
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
          "Solo con 60 FPS",
          false
        ]
      ],
      "feedback": "Promedio no informa del peor frame/percentiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "500 agentes repartidos en 5 buckets. Por bucket.",
        "answer": "100",
        "hint": "500/5."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Debes medir picos además de media?",
        "answer": "si",
        "hint": "Para stutter."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿AI LOD puede aumentar latencia de reacción?",
        "answer": "si",
        "hint": "Trade-off de frecuencia/modelo."
      }
    ]
  },
  "gameai-integration": {
    "id": "gameai-integration",
    "courseId": 42,
    "title": "Proyecto: arquitectura completa de NPC",
    "shortTitle": "Proyecto: arquitectura completa de NPC",
    "duration": 110,
    "objective": "Integrar percepción, decisión, pathfinding, navmesh, steering y debugging en un NPC reproducible y medible.",
    "summary": [
      "El proyecto final construye un agente cuya cadena de decisión pueda inspeccionarse desde observación hasta movimiento, con contratos y frecuencias explícitas.",
      "Se prueban escenarios de target perdido, puerta bloqueada, corredor estrecho, múltiples agentes y cambios dinámicos para validar replanning y avoidance.",
      "La evaluación final incluye corrección, coste, latencia de reacción, estabilidad y reproducibilidad; comportamiento aparentemente inteligente sin trazas no es suficiente."
    ],
    "concept": "El proyecto final construye un agente cuya cadena de decisión pueda inspeccionarse desde observación hasta movimiento, con contratos y frecuencias explícitas.",
    "rules": [
      "Mantén decisión, path global y locomoción como capas testeables.",
      "Añade escenarios deterministas/seeds de regresión.",
      "Perfila con muchos agentes y documenta degradación controlada."
    ],
    "deep": {
      "intro": "Integrar percepción, decisión, pathfinding, navmesh, steering y debugging en un NPC reproducible y medible.",
      "sections": [
        {
          "title": "Pipeline",
          "body": "Perception→memory→decision→goal→path→local target→avoidance/steering→controller→feedback."
        },
        {
          "title": "Tests",
          "body": "Casos sintéticos validan A*, transiciones BT/FSM y caducidad de memoria por separado antes del mundo completo."
        },
        {
          "title": "Dynamic world",
          "body": "Al cambiar una puerta u obstáculo, invalida/replanifica según versión/conectividad y no por polling ciego de toda la escena."
        },
        {
          "title": "Metrics",
          "body": "Reporta expansions/path, decision ms, sensor ms, replans/s y fallos de navegación además del FPS general."
        }
      ]
    },
    "example": {
      "problem": "Un frame destina 3 ms a IA. Sensores consumen 1.1 ms y navegación 1.4 ms. Presupuesto restante para decisión.",
      "steps": [
        "3-1.1-1.4=0.5."
      ],
      "solution": "0.5 ms."
    },
    "check": {
      "question": "¿La animación visual debe ser la única fuente de verdad del objetivo de IA?",
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
          "Solo en NPC",
          false
        ]
      ],
      "feedback": "La intención debe vivir en datos lógicos explícitos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Budget 4 ms; path=1.5,sensors=1.0,decision=0.8. Resto.",
        "answer": "0.7",
        "hint": "4-3.3."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Debes testear pathfinding aislado del NPC completo?",
        "answer": "si",
        "hint": "Facilita diagnóstico."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un replay con seeds ayuda a reproducir bugs?",
        "answer": "si",
        "hint": "Controla stochasticidad."
      }
    ]
  }
});
