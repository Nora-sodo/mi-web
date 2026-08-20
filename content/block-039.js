/**
 * BLOQUE 039 — Arquitectura de videojuegos
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar tiempo de simulación, presentación, identidad,
 * ownership y persistencia. Un frame es una unidad de scheduling, no una
 * unidad física universal; ECS, scene graph y event bus resuelven problemas
 * distintos y se combinan solo bajo contratos explícitos.
 */
window.LEARNING_PATHS[39] = {
  "level": "Experto progresivo",
  "estimatedHours": 126,
  "description": "Arquitectura de videojuegos: loop, tiempo, ECS, escenas, recursos, eventos, input, serialización, persistencia y reproducibilidad.",
  "outcomes": [
    "Diseñar un game loop con dominios temporales explícitos y pacing observable.",
    "Construir ECS/component systems y scene management con dependencias y ownership claros.",
    "Diseñar input, eventos, recursos y persistencia robustos ante async, fallos y versionado.",
    "Integrar un runtime reproducible con snapshots, jobs, métricas y replays."
  ],
  "modules": [
    {
      "id": "m1-loop-time",
      "title": "Loop y tiempo",
      "description": "Arquitectura, game loop y timestep",
      "lessons": [
        "game-engine-boundaries",
        "game-loop",
        "game-fixed-timestep",
        "game-variable-timestep"
      ]
    },
    {
      "id": "m2-ecs-scenes",
      "title": "Estado y composición",
      "description": "ECS, systems y escenas",
      "lessons": [
        "game-ecs",
        "game-component-systems",
        "game-scene-management"
      ]
    },
    {
      "id": "m3-services",
      "title": "Servicios de juego",
      "description": "Recursos, eventos, input y serialización",
      "lessons": [
        "game-resource-systems",
        "game-event-systems",
        "game-input",
        "game-serialization"
      ]
    },
    {
      "id": "m4-persistence-integration",
      "title": "Persistencia e integración",
      "description": "Save games, determinismo y frame completo",
      "lessons": [
        "game-save-games",
        "game-determinism-replay",
        "game-engine-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "game-engine-boundaries": {
    "id": "game-engine-boundaries",
    "courseId": 39,
    "title": "Arquitectura de engine: separar dominios y contratos",
    "shortTitle": "Arquitectura de engine: separar dominios y contratos",
    "duration": 110,
    "objective": "Diseñar fronteras entre simulación, presentación, recursos y plataforma para que el motor pueda evolucionar sin acoplamiento circular.",
    "summary": [
      "Un game engine coordina subsistemas con ritmos y lifetimes distintos; no es una clase gigante con un update().",
      "Gameplay, renderer, audio, input, física y recursos deben comunicarse mediante contratos explícitos, no conocimiento mutuo arbitrario.",
      "La arquitectura se evalúa por dependencias, ownership, observabilidad y capacidad de cambio, no por cantidad de patrones usados."
    ],
    "concept": "Un game engine coordina subsistemas con ritmos y lifetimes distintos; no es una clase gigante con un update().",
    "rules": [
      "Haz explícita la dirección de dependencias entre subsistemas.",
      "Separa estado autoritativo de simulación de caches o representaciones para render/audio.",
      "Prefiere APIs estrechas y datos de transferencia estables a singletons globales omniscientes."
    ],
    "deep": {
      "intro": "Diseñar fronteras entre simulación, presentación, recursos y plataforma para que el motor pueda evolucionar sin acoplamiento circular.",
      "sections": [
        {
          "title": "Capas",
          "body": "Platform abstrae ventana, tiempo, filesystem e input; runtime coordina subsistemas; gameplay define reglas; tools/editor producen datos. Las fronteras pueden variar, pero las dependencias deben ser deliberadas."
        },
        {
          "title": "Ownership",
          "body": "Quien crea un objeto no siempre es quien decide su lifetime. Define ownership, handles y referencias débiles para evitar ciclos y recursos zombies."
        },
        {
          "title": "Datos derivados",
          "body": "Render proxies, audio voices y caches de navegación pueden derivarse del estado de juego y reconstruirse; no deberían convertirse accidentalmente en la única verdad."
        },
        {
          "title": "Observabilidad",
          "body": "Cada subsistema necesita métricas y tracing. Una arquitectura imposible de medir termina optimizándose por intuición."
        }
      ]
    },
    "example": {
      "problem": "Gameplay muta directamente un buffer GPU y el renderer también lo recicla. ¿Qué problema arquitectónico aparece?",
      "steps": [
        "Dos subsistemas creen poseer el mismo recurso.",
        "El lifetime queda implícito.",
        "Una capa de extracción/handles separaría estado de juego y recurso GPU."
      ],
      "solution": "Ownership ambiguo y acoplamiento entre simulación y backend."
    },
    "check": {
      "question": "¿Un engine bien modular exige que cada subsistema sea un proceso separado?",
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
          "Solo en 3D",
          false
        ]
      ],
      "feedback": "Modularidad significa fronteras y contratos; no prescribe procesos separados."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Renderer y gameplay deberían compartir ownership implícito de recursos GPU?",
        "answer": "no",
        "hint": "Separa ownership."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un cache derivado puede reconstruirse desde estado autoritativo?",
        "answer": "si",
        "hint": "Esa es una propiedad útil."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más patrones de diseño garantizan mejor arquitectura?",
        "answer": "no",
        "hint": "Evalúa trade-offs y dependencias."
      }
    ]
  },
  "game-loop": {
    "id": "game-loop",
    "courseId": 39,
    "title": "Game loop: tiempo, orden y pacing del frame",
    "shortTitle": "Game loop: tiempo, orden y pacing del frame",
    "duration": 110,
    "objective": "Construir un bucle principal que distinga tiempo real, simulación, render y pacing, evitando que la velocidad del juego dependa accidentalmente del FPS.",
    "summary": [
      "El game loop coordina adquisición de tiempo/input, simulación, render, presentación y tareas de plataforma.",
      "FPS de render y frecuencia de simulación pueden ser distintas; acoplarlas rigidamente introduce dependencia del hardware.",
      "El orden de actualización es parte de la semántica del juego y debe documentarse y medirse."
    ],
    "concept": "El game loop coordina adquisición de tiempo/input, simulación, render, presentación y tareas de plataforma.",
    "rules": [
      "Usa un reloj monotónico para medir duraciones; el reloj de pared puede saltar.",
      "No uses 'un frame' como unidad física sin especificar su duración.",
      "Define límites para delta excesivo tras pausas, breakpoints o suspensión."
    ],
    "deep": {
      "intro": "Construir un bucle principal que distinga tiempo real, simulación, render y pacing, evitando que la velocidad del juego dependa accidentalmente del FPS.",
      "sections": [
        {
          "title": "Esqueleto",
          "body": "Un loop típico mide tiempo, recoge eventos, avanza simulación una o más veces, extrae estado para render, presenta y regula pacing."
        },
        {
          "title": "Relojes",
          "body": "Tiempo de pared sirve para calendarios; un reloj monotónico es preferible para deltas porque no retrocede por ajustes."
        },
        {
          "title": "Pacing",
          "body": "VSync, límites de FPS y colas de presentación afectan cadencia y latencia. Pacing no es lo mismo que simulation timestep."
        },
        {
          "title": "Orden",
          "body": "Input→gameplay→physics→animation→render es solo un ejemplo; cambiar el orden puede cambiar resultados observables."
        }
      ]
    },
    "example": {
      "problem": "Render tarda 8 ms, simulación 4 ms y otros trabajos seriales 2 ms. Sin solapamiento, ¿frame time?",
      "steps": [
        "8+4+2=14 ms.",
        "FPS ideal aproximado 1000/14.",
        "La frecuencia real puede estar limitada además por presentación."
      ],
      "solution": "14 ms, ≈71.4 FPS antes de otros límites."
    },
    "check": {
      "question": "¿Debe la simulación avanzar exactamente una vez por cada frame renderizado?",
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
          "Solo con VSync",
          false
        ]
      ],
      "feedback": "Render y simulación pueden tener frecuencias distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Qué reloj conviene para deltas: monotónico o calendario?",
        "answer": "monotonico",
        "hint": "Evita saltos de pared."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿VSync define necesariamente el timestep de física?",
        "answer": "no",
        "hint": "Presentación y simulación son dominios distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El orden de subsistemas puede cambiar el comportamiento?",
        "answer": "si",
        "hint": "Es parte de la semántica."
      }
    ]
  },
  "game-fixed-timestep": {
    "id": "game-fixed-timestep",
    "courseId": 39,
    "title": "Fixed timestep: acumulador, catch-up y espiral de la muerte",
    "shortTitle": "Fixed timestep: acumulador, catch-up y espiral de la muerte",
    "duration": 110,
    "objective": "Implementar simulación a paso fijo con acumulador, límites de catch-up e interpolación de presentación.",
    "summary": [
      "Un fixed timestep usa un Δt constante para la simulación aunque el render tenga cadencia variable.",
      "El patrón de acumulador ejecuta cero, uno o varios ticks para consumir tiempo acumulado.",
      "Si simular un tick cuesta de forma sostenida más que el presupuesto de ese tick, aparece la spiral of death."
    ],
    "concept": "Un fixed timestep usa un Δt constante para la simulación aunque el render tenga cadencia variable.",
    "rules": [
      "Limita el tiempo acumulado o número de catch-up steps tras stalls extremos.",
      "No confundas fixed timestep con determinismo bit a bit.",
      "Interpola presentación entre estados si el render es más frecuente que los ticks."
    ],
    "deep": {
      "intro": "Implementar simulación a paso fijo con acumulador, límites de catch-up e interpolación de presentación.",
      "sections": [
        {
          "title": "Acumulador",
          "body": "accumulator += frameDelta; while accumulator>=dt: simulate(dt); accumulator-=dt. El remanente define alpha=accumulator/dt."
        },
        {
          "title": "Catch-up",
          "body": "Un stall puede acumular muchos ticks. Un límite protege responsiveness a costa de perder/ralentizar tiempo simulado según política."
        },
        {
          "title": "Spiral",
          "body": "Para dt=16.67 ms, si cada tick tarda 25 ms de forma sostenida, el backlog crece mientras intentas recuperarlo."
        },
        {
          "title": "Interpolación",
          "body": "Con estados previous/current, render puede usar lerp(previous,current,alpha) para suavizar presentación sin alterar la simulación."
        }
      ]
    },
    "example": {
      "problem": "dt=20 ms y acumulador=55 ms. ¿Cuántos ticks completos y qué remanente?",
      "steps": [
        "55/20 permite 2 ticks completos.",
        "Se consumen 40 ms.",
        "Quedan 15 ms; alpha=0.75."
      ],
      "solution": "2 ticks, 15 ms de remanente, alpha=0.75."
    },
    "check": {
      "question": "¿Fixed timestep garantiza por sí solo determinismo idéntico entre máquinas?",
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
          "Solo en enteros",
          false
        ]
      ],
      "feedback": "Orden, inputs, floating point y estado externo también importan."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "dt=10 ms, acumulador=34 ms. ¿ticks completos?",
        "answer": "3",
        "hint": "Consume 30 ms."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Interpolar render modifica el estado autoritativo?",
        "answer": "no",
        "hint": "Debe ser presentación."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Catch-up ilimitado puede empeorar un stall?",
        "answer": "si",
        "hint": "Puede producir spiral of death."
      }
    ]
  },
  "game-variable-timestep": {
    "id": "game-variable-timestep",
    "courseId": 39,
    "title": "Variable timestep: integración, sensibilidad y semántica temporal",
    "shortTitle": "Variable timestep: integración, sensibilidad y semántica temporal",
    "duration": 110,
    "objective": "Usar delta variable con criterio, entendiendo qué sistemas toleran el paso variable y cuáles necesitan substepping o desacoplamiento.",
    "summary": [
      "Variable timestep avanza la simulación con el delta observado del frame; es simple pero hace que el integrador vea pasos diferentes.",
      "Multiplicar una velocidad por delta corrige unidades, pero no vuelve automáticamente estable ni frame-rate-independent a cualquier algoritmo.",
      "Sistemas de cámara, UI o efectos pueden tolerar delta variable mejor que física rígida sensible."
    ],
    "concept": "Variable timestep avanza la simulación con el delta observado del frame; es simple pero hace que el integrador vea pasos diferentes.",
    "rules": [
      "Expresa magnitudes en unidades por segundo, no por frame.",
      "No sustituyas estabilidad numérica por un simple *delta en código existente.",
      "Clampa o subdivide deltas extremos cuando el sistema tenga límites de estabilidad."
    ],
    "deep": {
      "intro": "Usar delta variable con criterio, entendiendo qué sistemas toleran el paso variable y cuáles necesitan substepping o desacoplamiento.",
      "sections": [
        {
          "title": "Unidades",
          "body": "position += velocity*dt tiene unidades consistentes; position += velocity por frame cambia velocidad física con FPS."
        },
        {
          "title": "Integradores",
          "body": "Euler explícito, constraints y controladores pueden reaccionar de manera distinta ante pasos grandes aunque uses dt correctamente."
        },
        {
          "title": "Damping",
          "body": "Interpolaciones tipo x += (target-x)*k*dt son solo aproximaciones; para respuesta exponencial independiente de frame puede derivarse alpha=1-exp(-k dt)."
        },
        {
          "title": "Elección",
          "body": "No hay una ley que obligue a usar un solo timestep para todos los subsistemas."
        }
      ]
    },
    "example": {
      "problem": "v=6 m/s durante dt=0.025 s. ¿desplazamiento ideal de integración de velocidad constante?",
      "steps": [
        "Δx=v·dt.",
        "6·0.025=0.15."
      ],
      "solution": "0.15 m."
    },
    "check": {
      "question": "¿Multiplicar todo por delta garantiza estabilidad numérica a cualquier FPS?",
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
          "Solo con floats",
          false
        ]
      ],
      "feedback": "Las propiedades del integrador y del sistema también importan."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "v=10 m/s, dt=0.02 s. Δx en m.",
        "answer": "0.2",
        "hint": "v·dt."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿UI y física tienen que compartir timestep?",
        "answer": "no",
        "hint": "Pueden tener requisitos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Clampear delta cambia la semántica del tiempo simulado?",
        "answer": "si",
        "hint": "Es una decisión de política."
      }
    ]
  },
  "game-ecs": {
    "id": "game-ecs",
    "courseId": 39,
    "title": "ECS: identidad, componentes, sistemas y arquetipos",
    "shortTitle": "ECS: identidad, componentes, sistemas y arquetipos",
    "duration": 110,
    "objective": "Entender ECS como una familia de modelos de datos/composición y no como sinónimo de cualquier sistema basado en componentes.",
    "summary": [
      "En ECS, una entity suele ser identidad; componentes contienen datos; systems operan sobre conjuntos de componentes.",
      "ECS no prescribe una única implementación: sparse sets, archetypes y tablas tienen trade-offs distintos.",
      "El beneficio principal puede ser composición y data locality, pero un ECS mal diseñado también puede crear indirection y sincronización costosa."
    ],
    "concept": "En ECS, una entity suele ser identidad; componentes contienen datos; systems operan sobre conjuntos de componentes.",
    "rules": [
      "No metas comportamiento oculto y ownership arbitrario en cada componente si buscas un modelo data-oriented.",
      "Distingue ID de entity de puntero estable; storage puede mover componentes.",
      "No conviertas ECS en requisito para todos los objetos del motor."
    ],
    "deep": {
      "intro": "Entender ECS como una familia de modelos de datos/composición y no como sinónimo de cualquier sistema basado en componentes.",
      "sections": [
        {
          "title": "Conceptos",
          "body": "Entity identifica; Component aporta datos; System consulta y transforma entidades con firmas relevantes."
        },
        {
          "title": "Storage",
          "body": "Sparse-set favorece añadir/quitar determinados componentes; archetype agrupa entidades con la misma firma y puede favorecer iteración contigua."
        },
        {
          "title": "Cambios estructurales",
          "body": "Añadir/quitar componentes puede mover datos entre pools/archetypes y requiere políticas para iteración concurrente."
        },
        {
          "title": "Fronteras",
          "body": "Assets, GPU resources y servicios globales no tienen por qué ser entities."
        }
      ]
    },
    "example": {
      "problem": "10000 entidades; 2500 tienen Position+Velocity. Un system de movimiento necesita procesar ¿cuántas si consulta solo esa firma?",
      "steps": [
        "La query selecciona la intersección.",
        "Solo 2500 cumplen ambos componentes."
      ],
      "solution": "2500 entidades."
    },
    "check": {
      "question": "¿ECS implica obligatoriamente archetype storage?",
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
          "Solo en C++",
          false
        ]
      ],
      "feedback": "ECS es una familia de modelos; el almacenamiento varía."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "En ECS, ¿qué suele representar identidad: entity o component?",
        "answer": "entity",
        "hint": "El componente es dato."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un entity ID debe ser necesariamente un puntero estable?",
        "answer": "no",
        "hint": "El storage puede moverse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Sparse set y archetype tienen los mismos trade-offs?",
        "answer": "no",
        "hint": "Optimizan patrones distintos."
      }
    ]
  },
  "game-component-systems": {
    "id": "game-component-systems",
    "courseId": 39,
    "title": "Component systems: composición, scheduling y dependencias",
    "shortTitle": "Component systems: composición, scheduling y dependencias",
    "duration": 110,
    "objective": "Diseñar sistemas de componentes con dependencias explícitas, acceso de lectura/escritura y scheduling paralelizable.",
    "summary": [
      "Un component system debe declarar qué datos lee y escribe para razonar sobre orden y paralelismo.",
      "Dos systems que solo leen el mismo componente pueden ejecutarse en paralelo con mucha más facilidad que dos writers.",
      "Eventos, comandos diferidos o double buffering pueden separar cambios estructurales de iteraciones activas."
    ],
    "concept": "Un component system debe declarar qué datos lee y escribe para razonar sobre orden y paralelismo.",
    "rules": [
      "Declara read/write sets antes de paralelizar systems.",
      "No modifiques arbitrariamente la colección que estás iterando sin una política de deferred commands.",
      "Usa barriers solo donde exista una dependencia real; globalizar la sincronización destruye paralelismo."
    ],
    "deep": {
      "intro": "Diseñar sistemas de componentes con dependencias explícitas, acceso de lectura/escritura y scheduling paralelizable.",
      "sections": [
        {
          "title": "Hazards",
          "body": "Read/Read no introduce data race por sí solo; Write/Read y Write/Write exigen orden o partición segura."
        },
        {
          "title": "Scheduling",
          "body": "Un grafo de dependencias puede ordenar systems y ejecutar ramas independientes en paralelo."
        },
        {
          "title": "Structural changes",
          "body": "Spawn/despawn y add/remove component suelen diferirse para preservar iteradores y storage."
        },
        {
          "title": "Determinismo",
          "body": "Paralelismo puede alterar orden de reducciones/eventos; si el gameplay depende del orden, debe definirse."
        }
      ]
    },
    "example": {
      "problem": "A escribe Position; B lee Position; C lee Health. ¿qué dependencia directa es obligatoria?",
      "steps": [
        "B necesita observar Position escrito por A.",
        "Por tanto A→B.",
        "C no depende de esos datos."
      ],
      "solution": "A debe preceder a B; C puede ser independiente."
    },
    "check": {
      "question": "¿Dos systems que solo leen el mismo componente necesitan serializarse por data race?",
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
      "feedback": "Lecturas concurrentes no escriben el estado compartido."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Writer y reader del mismo dato: ¿hay dependencia?",
        "answer": "si",
        "hint": "El reader necesita un estado definido."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Deferred commands ayudan durante iteración ECS?",
        "answer": "si",
        "hint": "Aíslan cambios estructurales."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Paralelismo conserva automáticamente el orden de eventos?",
        "answer": "no",
        "hint": "Debes definirlo."
      }
    ]
  },
  "game-scene-management": {
    "id": "game-scene-management",
    "courseId": 39,
    "title": "Scene management: mundos, transiciones y streaming",
    "shortTitle": "Scene management: mundos, transiciones y streaming",
    "duration": 110,
    "objective": "Gestionar escenas como unidades de composición/carga sin confundirlas con ownership total del runtime ni con el scene graph del renderer.",
    "summary": [
      "Una scene puede ser unidad de authoring, carga o gameplay; esas responsabilidades no tienen por qué coincidir exactamente.",
      "Transiciones robustas necesitan estados de carga, activación, desactivación y rollback ante fallo.",
      "World streaming requiere presupuestos de memoria/IO y fronteras espaciales o lógicas."
    ],
    "concept": "Una scene puede ser unidad de authoring, carga o gameplay; esas responsabilidades no tienen por qué coincidir exactamente.",
    "rules": [
      "Distingue scene asset de scene instance/world runtime.",
      "No hagas que cambiar de escena bloquee necesariamente todo el thread principal.",
      "Define qué servicios persisten entre escenas y qué estado pertenece al mundo actual."
    ],
    "deep": {
      "intro": "Gestionar escenas como unidades de composición/carga sin confundirlas con ownership total del runtime ni con el scene graph del renderer.",
      "sections": [
        {
          "title": "Asset vs instance",
          "body": "Una escena serializada es una plantilla/dato; al instanciarla aparecen entidades y recursos runtime."
        },
        {
          "title": "Transition",
          "body": "Puede haber preload, staging, activation y teardown; un fallo de carga no debe dejar medio mundo destruido."
        },
        {
          "title": "Streaming",
          "body": "Chunks/cells pueden cargarse por distancia, visibilidad o predicción, con hysteresis y presupuestos."
        },
        {
          "title": "Persistencia",
          "body": "Audio global, networking o profile pueden vivir fuera de la scene actual; la frontera debe ser explícita."
        }
      ]
    },
    "example": {
      "problem": "Una transición necesita 900 MB nuevos pero solo hay 600 MB libres y la escena vieja ocupa 500 MB. ¿Puede coexistir completa sin liberar/streaming?",
      "steps": [
        "900 MB > 600 MB libres.",
        "No cabe todo el nuevo contenido simultáneamente.",
        "Hace falta liberar, stream o escalonar."
      ],
      "solution": "No, con ese presupuesto no cabe completa."
    },
    "check": {
      "question": "¿Una scene serializada y una instancia runtime son exactamente el mismo objeto conceptual?",
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
      "feedback": "Template/dato e instancia tienen lifetimes distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un servicio de networking puede persistir entre escenas?",
        "answer": "si",
        "hint": "La frontera es arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Streaming necesita presupuesto?",
        "answer": "si",
        "hint": "Memoria e IO son finitos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Preload obliga a activar inmediatamente?",
        "answer": "no",
        "hint": "Carga y activación pueden separarse."
      }
    ]
  },
  "game-resource-systems": {
    "id": "game-resource-systems",
    "courseId": 39,
    "title": "Resource systems: assets, dependencia, streaming y hot reload",
    "shortTitle": "Resource systems: assets, dependencia, streaming y hot reload",
    "duration": 110,
    "objective": "Extender resource management al contexto de juego completo: assets versionados, dependencias, streaming y herramientas.",
    "summary": [
      "El resource system transforma assets de authoring en representaciones runtime y mantiene identidad/dependencias.",
      "Carga asíncrona necesita estados y placeholders; bloquear el game loop por cada asset destruye pacing.",
      "Hot reload y content versioning necesitan invalidar dependencias de forma controlada."
    ],
    "concept": "El resource system transforma assets de authoring en representaciones runtime y mantiene identidad/dependencias.",
    "rules": [
      "Separa source asset, cooked asset e instancia runtime cuando la plataforma lo requiera.",
      "No expongas file paths como identidad estable universal si empaquetado/versionado puede cambiarlos.",
      "Registra dependencias para recocinar o recargar solo lo necesario."
    ],
    "deep": {
      "intro": "Extender resource management al contexto de juego completo: assets versionados, dependencias, streaming y herramientas.",
      "sections": [
        {
          "title": "Pipeline",
          "body": "Source (PNG/FBX/etc.) puede importarse/cookearse a formato optimizado; runtime consume producto, no necesariamente el source."
        },
        {
          "title": "Async",
          "body": "Requests pasan por queued/loading/ready/failed; consumidores deben tolerar que un recurso aún no esté residente."
        },
        {
          "title": "Dependencies",
          "body": "Material→textures, scene→meshes, prefab→scripts forman grafos; cambios deben propagarse."
        },
        {
          "title": "Versioning",
          "body": "Save games y mods pueden referirse a assets de versiones distintas; IDs estables y migraciones importan."
        }
      ]
    },
    "example": {
      "problem": "Una escena usa 120 assets y 30 ya están residentes. ¿Cuántos requests adicionales como máximo necesita si no hay sharing extra?",
      "steps": [
        "120 totales - 30 residentes.",
        "Quedan 90."
      ],
      "solution": "90 requests adicionales."
    },
    "check": {
      "question": "¿El path de desarrollo debe ser necesariamente la identidad runtime estable de un asset?",
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
          "Solo en Windows",
          false
        ]
      ],
      "feedback": "Cook/packaging/versioning pueden cambiar rutas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Carga asíncrona puede terminar en estado failed?",
        "answer": "si",
        "hint": "Debe modelarse."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Hot reload puede requerir invalidar pipelines/materiales dependientes?",
        "answer": "si",
        "hint": "Hay grafo de dependencias."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cooked asset y source asset tienen que ser byte a byte iguales?",
        "answer": "no",
        "hint": "El pipeline puede transformar."
      }
    ]
  },
  "game-event-systems": {
    "id": "game-event-systems",
    "courseId": 39,
    "title": "Event systems: mensajes, comandos y acoplamiento temporal",
    "shortTitle": "Event systems: mensajes, comandos y acoplamiento temporal",
    "duration": 110,
    "objective": "Diseñar comunicación desacoplada sin convertir un event bus global en un flujo invisible e imposible de depurar.",
    "summary": [
      "Eventos describen hechos; comandos solicitan acciones. Mezclarlos oculta quién decide y quién observa.",
      "Dispatch inmediato y colas diferidas tienen semánticas temporales distintas, especialmente con reentrancy.",
      "Un bus global reduce acoplamiento sintáctico pero puede aumentar acoplamiento semántico e invisibilidad."
    ],
    "concept": "Eventos describen hechos; comandos solicitan acciones. Mezclarlos oculta quién decide y quién observa.",
    "rules": [
      "Distingue event (ocurrió) de command (haz esto).",
      "Define si el dispatch es inmediato, diferido, ordenado o best-effort.",
      "Incluye tracing/IDs de causalidad en eventos relevantes para debugging."
    ],
    "deep": {
      "intro": "Diseñar comunicación desacoplada sin convertir un event bus global en un flujo invisible e imposible de depurar.",
      "sections": [
        {
          "title": "Semántica",
          "body": "DamageApplied es un hecho; ApplyDamage puede ser un comando. Los consumidores y garantías son distintos."
        },
        {
          "title": "Tiempo",
          "body": "Immediate dispatch puede reentrar en sistemas mientras aún mutan estado; queue end-of-tick evita algunos ciclos."
        },
        {
          "title": "Orden",
          "body": "Si dos eventos deben observarse en orden, declara esa garantía; una cola paralela no la da gratis."
        },
        {
          "title": "Backpressure",
          "body": "Eventos de telemetría o red pueden acumularse; define límites, drop policy o batching."
        }
      ]
    },
    "example": {
      "problem": "Una cola recibe 2000 eventos/s y consume 1500/s de forma sostenida. ¿crecimiento neto por segundo?",
      "steps": [
        "2000-1500=500."
      ],
      "solution": "500 eventos/s de backlog."
    },
    "check": {
      "question": "¿Un event bus global elimina el acoplamiento semántico entre sistemas?",
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
          "Solo con ECS",
          false
        ]
      ],
      "feedback": "Puede ocultarlo en vez de eliminarlo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿'PlayerDied' suena más a evento o comando?",
        "answer": "evento",
        "hint": "Describe un hecho."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Immediate dispatch puede producir reentrancy?",
        "answer": "si",
        "hint": "El handler corre dentro del emisor."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una cola sin límites puede sufrir backlog?",
        "answer": "si",
        "hint": "Necesita política."
      }
    ]
  },
  "game-input": {
    "id": "game-input",
    "courseId": 39,
    "title": "Input: eventos, polling, acciones y sampling temporal",
    "shortTitle": "Input: eventos, polling, acciones y sampling temporal",
    "duration": 110,
    "objective": "Modelar input físico y acciones de gameplay separando eventos, estado, dispositivos y el momento exacto en que la simulación consume entradas.",
    "summary": [
      "Input físico (tecla, eje, touch) y acción semántica (jump, move) son capas diferentes.",
      "Eventos capturan transiciones/metadata; polling captura estado actual. Muchos juegos necesitan ambos.",
      "En simulación fija o networking importa en qué tick se muestrea/aplica el input, no solo qué botón se pulsó."
    ],
    "concept": "Input físico (tecla, eje, touch) y acción semántica (jump, move) son capas diferentes.",
    "rules": [
      "Mapea dispositivos a acciones reconfigurables antes de gameplay siempre que sea posible.",
      "No pierdas taps breves entre ticks: bufferiza transiciones cuando haga falta.",
      "Normaliza dead zones y curvas de ejes de forma explícita y testeable."
    ],
    "deep": {
      "intro": "Modelar input físico y acciones de gameplay separando eventos, estado, dispositivos y el momento exacto en que la simulación consume entradas.",
      "sections": [
        {
          "title": "Eventos vs estado",
          "body": "KeyDown/KeyUp expresan transiciones; is_pressed expresa estado. Un tap puede ocurrir entre dos polls lentos."
        },
        {
          "title": "Action map",
          "body": "Jump puede mapear a teclado, gamepad o touch sin que gameplay conozca scan codes."
        },
        {
          "title": "Timing",
          "body": "Para rollback o lockstep, inputs suelen etiquetarse por tick/frame de simulación."
        },
        {
          "title": "Analógico",
          "body": "Dead zone, radial vs axial y response curves cambian control; deben formar parte de la política de input."
        }
      ]
    },
    "example": {
      "problem": "Simulación a 60 Hz: duración de tick aproximada en ms.",
      "steps": [
        "1000/60.",
        "≈16.667 ms."
      ],
      "solution": "≈16.667 ms."
    },
    "check": {
      "question": "¿Polling de estado y eventos de input son exactamente equivalentes para taps breves?",
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
          "Solo con mouse",
          false
        ]
      ],
      "feedback": "Una transición puede empezar y terminar entre polls."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿'jump' debería depender de una tecla concreta en gameplay?",
        "answer": "no",
        "hint": "Usa action mapping."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Input para rollback necesita asociarse a ticks?",
        "answer": "si",
        "hint": "Debe reproducirse temporalmente."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Dead zone es solo una constante universal?",
        "answer": "no",
        "hint": "Depende del dispositivo/política."
      }
    ]
  },
  "game-serialization": {
    "id": "game-serialization",
    "courseId": 39,
    "title": "Serialization: snapshots, esquemas, referencias y migraciones",
    "shortTitle": "Serialization: snapshots, esquemas, referencias y migraciones",
    "duration": 110,
    "objective": "Serializar estado con esquemas explícitos, referencias estables, versionado y límites de confianza.",
    "summary": [
      "Serializar es transformar estado a una representación persistente/transmisible; no significa volcar memoria cruda.",
      "Los formatos necesitan esquema, versión y estrategia para campos añadidos/eliminados.",
      "Punteros, handles efímeros y recursos runtime deben convertirse en IDs/referencias reconstruibles."
    ],
    "concept": "Serializar es transformar estado a una representación persistente/transmisible; no significa volcar memoria cruda.",
    "rules": [
      "Nunca persistas direcciones de memoria como identidad de gameplay.",
      "Incluye versión/esquema y valida límites al leer datos.",
      "Trata save files externos como input no confiable: parsea defensivamente."
    ],
    "deep": {
      "intro": "Serializar estado con esquemas explícitos, referencias estables, versionado y límites de confianza.",
      "sections": [
        {
          "title": "Snapshot",
          "body": "Un snapshot contiene datos necesarios para reconstruir un estado, no necesariamente todos los caches derivados."
        },
        {
          "title": "Referencias",
          "body": "Entity 123 puede referenciarse por ID estable y resolverse después de cargar todas las entidades."
        },
        {
          "title": "Versioning",
          "body": "Migraciones v1→v2→v3 o loaders compatibles permiten conservar saves viejos."
        },
        {
          "title": "Formatos",
          "body": "Texto facilita diff/debug; binario puede ser compacto/rápido. La elección depende del uso, no de una superioridad universal."
        }
      ]
    },
    "example": {
      "problem": "Save v3 añade campo stamina con default=100. Al cargar v2 sin ese campo, ¿qué política compatible?",
      "steps": [
        "Detectar versión v2.",
        "Crear campo nuevo con default definido.",
        "Continuar migración."
      ],
      "solution": "Migrar y usar stamina=100 según esquema."
    },
    "check": {
      "question": "¿Serializar un puntero crudo permite reconstruir de forma portable la misma referencia tras reiniciar?",
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
          "Solo en 64-bit",
          false
        ]
      ],
      "feedback": "La dirección pertenece a una ejecución concreta."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un save debería incluir versión de esquema?",
        "answer": "si",
        "hint": "Facilita migraciones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Caches derivados siempre deben persistirse?",
        "answer": "no",
        "hint": "Pueden reconstruirse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un save local debe parsearse sin validación porque 'lo creó el juego'?",
        "answer": "no",
        "hint": "Puede corromperse o manipularse."
      }
    ]
  },
  "game-save-games": {
    "id": "game-save-games",
    "courseId": 39,
    "title": "Save games: consistencia, atomicidad y compatibilidad",
    "shortTitle": "Save games: consistencia, atomicidad y compatibilidad",
    "duration": 110,
    "objective": "Diseñar guardado/carga robustos ante crashes, actualizaciones, datos parcialmente escritos y referencias entre sistemas.",
    "summary": [
      "Un save game es una transacción de estado de aplicación, no solo llamar write() sobre un archivo.",
      "Escribir a temporal, flush cuando proceda y rename/replace atómico según plataforma reduce saves truncados.",
      "Compatibilidad requiere versionar datos y también semántica: IDs de assets, quests o scripts pueden cambiar."
    ],
    "concept": "Un save game es una transacción de estado de aplicación, no solo llamar write() sobre un archivo.",
    "rules": [
      "No sobrescribas el único save válido hasta que la nueva versión esté completa/verificada.",
      "Incluye checks de integridad para detectar corrupción, sin confundir checksum con autenticidad.",
      "Define qué estado es autoritativo y captura un snapshot consistente respecto a los subsistemas."
    ],
    "deep": {
      "intro": "Diseñar guardado/carga robustos ante crashes, actualizaciones, datos parcialmente escritos y referencias entre sistemas.",
      "sections": [
        {
          "title": "Consistencia",
          "body": "Guardar mientras otro thread muta inventario puede producir una mezcla imposible; usa snapshot, lock o copy-on-write apropiado."
        },
        {
          "title": "Atomicidad",
          "body": "Patrón temp→write→flush→rename reduce ventanas de pérdida, pero garantías exactas dependen de filesystem/SO."
        },
        {
          "title": "Integridad",
          "body": "Checksum/hash detecta corrupción accidental; para datos adversarios hace falta autenticación si ese threat model importa."
        },
        {
          "title": "Compatibilidad",
          "body": "Migrar estructura no basta si cambió significado de IDs o reglas del juego."
        }
      ]
    },
    "example": {
      "problem": "Save principal válido; escribes 80% del nuevo directamente encima y hay crash. ¿riesgo?",
      "steps": [
        "El archivo puede quedar truncado o híbrido.",
        "Se perdió potencialmente la última copia válida."
      ],
      "solution": "Corrupción del único save; usa temp + reemplazo seguro."
    },
    "check": {
      "question": "¿Un checksum sin clave demuestra que el save no fue modificado maliciosamente?",
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
          "Solo SHA-256",
          false
        ]
      ],
      "feedback": "Detecta cambios, pero no autenticidad frente a un atacante que puede recomputarlo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Conviene conservar el save previo hasta completar el nuevo?",
        "answer": "si",
        "hint": "Reduce pérdida."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Snapshot inconsistente puede mezclar estados imposibles?",
        "answer": "si",
        "hint": "Coordina subsistemas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Migración de formato resuelve siempre cambios semánticos de IDs?",
        "answer": "no",
        "hint": "También cambia significado."
      }
    ]
  },
  "game-determinism-replay": {
    "id": "game-determinism-replay",
    "courseId": 39,
    "title": "Determinismo, replay y depuración reproducible",
    "shortTitle": "Determinismo, replay y depuración reproducible",
    "duration": 110,
    "objective": "Construir replays y simulaciones reproducibles distinguiendo determinismo lógico, floating-point, orden y estado externo.",
    "summary": [
      "Determinismo significa mismo estado inicial + mismas entradas + mismas reglas de ejecución → mismo resultado bajo el contrato definido.",
      "Fixed timestep ayuda a controlar el tiempo, pero no garantiza determinismo por sí solo.",
      "Replays basados en inputs/ticks son útiles para debugging, tests y networking si capturan todas las fuentes relevantes de no determinismo."
    ],
    "concept": "Determinismo significa mismo estado inicial + mismas entradas + mismas reglas de ejecución → mismo resultado bajo el contrato definido.",
    "rules": [
      "Semilla PRNG, orden de iteración y eventos externos deben formar parte del estado reproducible.",
      "No asumas resultados floating-point bit-identical entre plataformas sin imponer ese requisito y sus restricciones.",
      "Incluye hashes periódicos de estado para localizar el primer tick de divergencia."
    ],
    "deep": {
      "intro": "Construir replays y simulaciones reproducibles distinguiendo determinismo lógico, floating-point, orden y estado externo.",
      "sections": [
        {
          "title": "Fuentes",
          "body": "PRNG, unordered containers, threads, tiempo real, IO y floating-point pueden introducir divergencia."
        },
        {
          "title": "Replay",
          "body": "Registrar inputs por tick + seed + versión puede ser mucho más compacto que grabar snapshots completos."
        },
        {
          "title": "Checks",
          "body": "Hash de estado cada N ticks permite binary search temporal de divergencias."
        },
        {
          "title": "Contrato",
          "body": "Puedes exigir determinismo solo dentro de una plataforma/build, o cross-platform; el coste cambia mucho."
        }
      ]
    },
    "example": {
      "problem": "Hash coincide hasta tick 999 y difiere en 1000. ¿primer tick conocido de divergencia?",
      "steps": [
        "Último confirmado igual: 999.",
        "Primero observado distinto: 1000."
      ],
      "solution": "Tick 1000, salvo que solo hashes periódicamente y debas acotar más."
    },
    "check": {
      "question": "¿Fixed timestep garantiza automáticamente replay bit-identical cross-platform?",
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
          "Solo con 60 Hz",
          false
        ]
      ],
      "feedback": "Hay muchas otras fuentes de no determinismo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Semilla PRNG debe registrarse para replay determinista?",
        "answer": "si",
        "hint": "Afecta decisiones aleatorias."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿unordered iteration puede cambiar orden?",
        "answer": "si",
        "hint": "Depende del contenedor/runtime."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Determinismo cross-platform puede costar más que within-build?",
        "answer": "si",
        "hint": "Impone restricciones adicionales."
      }
    ]
  },
  "game-engine-integration": {
    "id": "game-engine-integration",
    "courseId": 39,
    "title": "Integración: frame de juego, jobs, snapshots y métricas",
    "shortTitle": "Integración: frame de juego, jobs, snapshots y métricas",
    "duration": 110,
    "objective": "Integrar loop, ECS, escenas, input, eventos, recursos y persistencia en un frame observable con contratos temporales.",
    "summary": [
      "La integración robusta define fases y dependencias, pero permite paralelizar trabajos independientes mediante jobs.",
      "Render/audio pueden consumir snapshots derivados del estado autoritativo en vez de leer gameplay mutable a mitad de tick.",
      "Un engine necesita métricas de frame time, tick backlog, jobs, IO, memoria y latencia de input para depurarse como sistema."
    ],
    "concept": "La integración robusta define fases y dependencias, pero permite paralelizar trabajos independientes mediante jobs.",
    "rules": [
      "Haz visible el frame/tick ID en logs, eventos y perfiles.",
      "Mide picos y percentiles, no solo FPS medio.",
      "Diseña shutdown/reload como rutas normales de lifetime, no como casos especiales sin contratos."
    ],
    "deep": {
      "intro": "Integrar loop, ECS, escenas, input, eventos, recursos y persistencia en un frame observable con contratos temporales.",
      "sections": [
        {
          "title": "Frame",
          "body": "Poll input → map actions → fixed ticks → event flush → extraction → render/audio submit → async IO/jobs → present es un ejemplo de DAG, no una liturgia universal."
        },
        {
          "title": "Jobs",
          "body": "Task graph permite ejecutar AI, animation o streaming en paralelo si sus read/write sets lo permiten."
        },
        {
          "title": "Snapshots",
          "body": "Render snapshot congela la vista de presentación de un tick/frame y reduce data races con gameplay."
        },
        {
          "title": "Métricas",
          "body": "Promedio puede ocultar stutter. Percentiles de frame time, backlog de ticks e IO stalls cuentan la historia real."
        }
      ]
    },
    "example": {
      "problem": "Frame times: 10,10,10,10,50 ms. ¿promedio?",
      "steps": [
        "Suma=90 ms.",
        "90/5=18 ms.",
        "Pero el spike de 50 ms sigue siendo visible como stutter."
      ],
      "solution": "18 ms de media; la media oculta un pico de 50 ms."
    },
    "check": {
      "question": "¿Un FPS medio alto garantiza ausencia de stutter?",
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
          "Solo a 144 Hz",
          false
        ]
      ],
      "feedback": "Los picos y percentiles importan."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Logs deberían incluir tick/frame ID?",
        "answer": "si",
        "hint": "Ayuda a correlacionar."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Render snapshot puede reducir carreras con gameplay?",
        "answer": "si",
        "hint": "Separa lectura de presentación."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El promedio basta para diagnosticar frame pacing?",
        "answer": "no",
        "hint": "Mira distribución y picos."
      }
    ]
  }
});
