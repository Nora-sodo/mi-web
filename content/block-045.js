/**
 * BLOQUE 045 — Godot profundo
 *
 * Regla editorial: separar el modelo de escena de la arquitectura interna del motor,
 * y distinguir contrato público, binding de lenguaje, subsistema runtime e implementación.
 */
window.LEARNING_PATHS[45] = {
  "level": "Experto progresivo",
  "estimatedHours": 122,
  "description": "Godot profundo: arquitectura interna, SceneTree/Nodes/Resources/Signals, rendering/physics/input, GDScript/C#/GDExtension, profiling, networking, editor tooling y lectura del engine source.",
  "outcomes": [
    "Diseñar escenas y recursos con lifetimes y ownership explícitos.",
    "Relacionar APIs de alto nivel con rendering/physics/network servers sin confundir contrato e implementación.",
    "Elegir GDScript, C# o GDExtension según tooling, interoperabilidad y perfiles medidos.",
    "Construir plugins/custom nodes y navegar el engine source para diagnosticar o extender el motor."
  ],
  "modules": [
    {
      "id": "m1-model",
      "title": "Modelo del motor",
      "description": "Modelo del motor",
      "lessons": [
        "godot-architecture",
        "godot-scenetree",
        "godot-nodes-scenes",
        "godot-resources",
        "godot-signals"
      ]
    },
    {
      "id": "m2-runtime",
      "title": "Subsistemas runtime",
      "description": "Subsistemas runtime",
      "lessons": [
        "godot-rendering",
        "godot-physics",
        "godot-input",
        "godot-scripting"
      ]
    },
    {
      "id": "m3-languages",
      "title": "Lenguajes y extensiones",
      "description": "Lenguajes y extensiones",
      "lessons": [
        "godot-gdscript",
        "godot-csharp",
        "godot-gdextension"
      ]
    },
    {
      "id": "m4-production",
      "title": "Producción, red y tooling",
      "description": "Producción, red y tooling",
      "lessons": [
        "godot-profiling",
        "godot-networking",
        "godot-editor-tools",
        "godot-engine-source"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "godot-architecture": {
    "id": "godot-architecture",
    "courseId": 45,
    "title": "Arquitectura interna de Godot",
    "shortTitle": "Arquitectura interna",
    "duration": 110,
    "objective": "Entender las capas del motor y ubicar Scene, Servers, Core, Drivers y editor sin confundir API pública con implementación.",
    "summary": [
      "Godot separa una capa Core de servicios base, una capa Scene de alto nivel y subsistemas/servers especializados; el editor reutiliza el mismo motor.",
      "La API orientada a Nodes no significa que todo el engine interno sea un árbol de nodos.",
      "Leer arquitectura por capas permite seguir una llamada desde script hasta server/driver y plataforma."
    ],
    "concept": "Godot separa una capa Core de servicios base, una capa Scene de alto nivel y subsistemas/servers especializados; el editor reutiliza el mismo motor.",
    "rules": [
      "API de gameplay ≠ arquitectura interna.",
      "Scene layer es alto nivel; los servers concentran subsistemas como rendering/physics.",
      "Usa el source tree para verificar dónde vive una responsabilidad."
    ],
    "deep": {
      "intro": "Entender las capas del motor y ubicar Scene, Servers, Core, Drivers y editor sin confundir API pública con implementación.",
      "sections": [
        {
          "title": "Capas",
          "body": "La arquitectura oficial ubica la Scene layer como la capa de alto nivel del sistema de escenas; por debajo aparecen servicios y componentes de engine."
        },
        {
          "title": "Servers",
          "body": "RenderingServer, PhysicsServer y otros exponen APIs de bajo nivel que pueden existir sin que cada operación sea un Node."
        },
        {
          "title": "Editor",
          "body": "El editor es una aplicación construida con el propio engine y añade tooling sobre las mismas capas base."
        },
        {
          "title": "Lectura de código",
          "body": "Empieza por una API conocida, localiza su clase y sigue la llamada hacia servers/drivers en vez de leer el repositorio linealmente."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Arquitectura interna» a una decisión de arquitectura.",
      "steps": [
        "API de gameplay ≠ arquitectura interna.",
        "Scene layer es alto nivel; los servers concentran subsistemas como rendering/physics."
      ],
      "solution": "La API orientada a Nodes no significa que todo el engine interno sea un árbol de nodos."
    },
    "check": {
      "question": "¿La arquitectura interna de Godot es simplemente un SceneTree gigante?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "Nodes son una interfaz de alto nivel, no toda la implementación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Arquitectura interna».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "API de gameplay ≠ arquitectura interna."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La arquitectura interna de Godot es simplemente un SceneTree gigante?",
        "answer": "no",
        "hint": "Nodes son una interfaz de alto nivel, no toda la implementación."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Arquitectura interna» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-scenetree": {
    "id": "godot-scenetree",
    "courseId": 45,
    "title": "SceneTree, escenas y ciclo de vida",
    "shortTitle": "SceneTree",
    "duration": 110,
    "objective": "Dominar la jerarquía activa, current scene, grupos, pausa y lifecycle de nodos.",
    "summary": [
      "SceneTree administra la jerarquía de Nodes y las escenas activas.",
      "Entrar al árbol, estar ready y salir del árbol son estados/lifecycle distintos.",
      "Cambiar escena y liberar nodos son operaciones de lifetime, no simples cambios de variable."
    ],
    "concept": "SceneTree administra la jerarquía de Nodes y las escenas activas.",
    "rules": [
      "_enter_tree ocurre antes que _ready en una incorporación normal.",
      "No conserves referencias a Nodes liberados como si fueran recursos persistentes.",
      "Usa groups para clasificación transversal, no como sustituto automático de ownership."
    ],
    "deep": {
      "intro": "Dominar la jerarquía activa, current scene, grupos, pausa y lifecycle de nodos.",
      "sections": [
        {
          "title": "Árbol activo",
          "body": "Solo los Nodes dentro de un SceneTree participan en callbacks/lifecycle asociados al árbol."
        },
        {
          "title": "Ready",
          "body": "_ready sucede cuando el nodo y sus hijos relevantes ya han entrado al árbol; orden y dependencias importan."
        },
        {
          "title": "Cambio de escena",
          "body": "Una transición de escena puede diferir carga, reemplazo y liberación; no asumas que todo ocurre instantáneamente en el mismo punto lógico."
        },
        {
          "title": "Pausa y grupos",
          "body": "SceneTree también coordina pausa, grupos y llamadas sobre conjuntos de nodos."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «SceneTree» a una decisión de arquitectura.",
      "steps": [
        "_enter_tree ocurre antes que _ready en una incorporación normal.",
        "No conserves referencias a Nodes liberados como si fueran recursos persistentes."
      ],
      "solution": "Entrar al árbol, estar ready y salir del árbol son estados/lifecycle distintos."
    },
    "check": {
      "question": "¿Un Node instanciado pero no añadido al SceneTree ya participa en _process?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "Necesita estar dentro del árbol activo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «SceneTree».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "_enter_tree ocurre antes que _ready en una incorporación normal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un Node instanciado pero no añadido al SceneTree ya participa en _process?",
        "answer": "no",
        "hint": "Necesita estar dentro del árbol activo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «SceneTree» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-nodes-scenes": {
    "id": "godot-nodes-scenes",
    "courseId": 45,
    "title": "Nodes, escenas y composición",
    "shortTitle": "Nodes y escenas",
    "duration": 110,
    "objective": "Diseñar escenas componibles y distinguir Node, PackedScene e instancia runtime.",
    "summary": [
      "Node aporta comportamiento/posición en jerarquía; una escena serializa una composición reutilizable.",
      "PackedScene es una representación serializada que puede instanciarse múltiples veces.",
      "Composición suele escalar mejor que jerarquías profundas de herencia para entidades de gameplay."
    ],
    "concept": "Node aporta comportamiento/posición en jerarquía; una escena serializa una composición reutilizable.",
    "rules": [
      "Scene asset ≠ instancia runtime.",
      "Parenting expresa jerarquía/lifecycle, no toda relación lógica.",
      "No conviertas cada concepto de dominio en un Node si solo necesita datos."
    ],
    "deep": {
      "intro": "Diseñar escenas componibles y distinguir Node, PackedScene e instancia runtime.",
      "sections": [
        {
          "title": "Composición",
          "body": "Una escena Character puede contener cuerpo, collider, sprite, audio y scripts como subnodos."
        },
        {
          "title": "Instanciación",
          "body": "La misma PackedScene puede producir muchas instancias con estado runtime independiente."
        },
        {
          "title": "Ownership editor",
          "body": "El concepto owner afecta qué nodos pertenecen/serializan dentro de una escena; no es idéntico al parent."
        },
        {
          "title": "Fronteras",
          "body": "Usa Nodes cuando necesitas lifecycle/árbol; Resources cuando necesitas datos compartibles y serializables."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Nodes y escenas» a una decisión de arquitectura.",
      "steps": [
        "Scene asset ≠ instancia runtime.",
        "Parenting expresa jerarquía/lifecycle, no toda relación lógica."
      ],
      "solution": "PackedScene es una representación serializada que puede instanciarse múltiples veces."
    },
    "check": {
      "question": "¿Dos instancias de la misma PackedScene comparten automáticamente todo su estado runtime?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "La plantilla se reutiliza; la instancia tiene estado propio salvo recursos compartidos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Nodes y escenas».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "Scene asset ≠ instancia runtime."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Dos instancias de la misma PackedScene comparten automáticamente todo su estado runtime?",
        "answer": "no",
        "hint": "La plantilla se reutiliza; la instancia tiene estado propio salvo recursos compartidos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Nodes y escenas» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-resources": {
    "id": "godot-resources",
    "courseId": 45,
    "title": "Resources, datos y sharing",
    "shortTitle": "Resources",
    "duration": 110,
    "objective": "Usar Resources como datos serializables y comprender sharing, cache y duplicación.",
    "summary": [
      "Resource es la base de tipos de datos específicos de Godot y suele ser compartible/serializable.",
      "Nodes consumen Resources; un Resource no necesita formar parte del SceneTree.",
      "Cargar el mismo recurso puede devolver una instancia cacheada según la ruta y política, por lo que mutarlo puede afectar a varios consumidores."
    ],
    "concept": "Resource es la base de tipos de datos específicos de Godot y suele ser compartible/serializable.",
    "rules": [
      "Resource ≠ Node.",
      "Compartido ≠ copia por consumidor.",
      "Define explícitamente cuándo necesitas duplicate/local-to-scene/datos inmutables."
    ],
    "deep": {
      "intro": "Usar Resources como datos serializables y comprender sharing, cache y duplicación.",
      "sections": [
        {
          "title": "Datos",
          "body": "Materiales, meshes, animations y configuraciones pueden ser Resources."
        },
        {
          "title": "Cache",
          "body": "El loader puede reutilizar recursos cargados; identidad y mutabilidad importan."
        },
        {
          "title": "Subresources",
          "body": "Un recurso puede contener otros recursos y serializarse como parte del asset."
        },
        {
          "title": "Diseño",
          "body": "Custom Resource es útil para datos de dominio, pero no debería absorber lógica que depende del SceneTree sin necesidad."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Resources» a una decisión de arquitectura.",
      "steps": [
        "Resource ≠ Node.",
        "Compartido ≠ copia por consumidor."
      ],
      "solution": "Nodes consumen Resources; un Resource no necesita formar parte del SceneTree."
    },
    "check": {
      "question": "¿Un Resource necesita add_child para existir?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "No pertenece al árbol de Nodes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Resources».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "Resource ≠ Node."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un Resource necesita add_child para existir?",
        "answer": "no",
        "hint": "No pertenece al árbol de Nodes."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Resources» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-signals": {
    "id": "godot-signals",
    "courseId": 45,
    "title": "Signals, callables y acoplamiento",
    "shortTitle": "Signals",
    "duration": 105,
    "objective": "Diseñar comunicación por eventos sin ocultar dependencias ni crear conexiones con lifetimes rotos.",
    "summary": [
      "Signals notifican que ocurrió algo y permiten conectar Callables sin que el emisor invoque directamente una API concreta del receptor.",
      "Desacoplar conocimiento directo no elimina la necesidad de definir semántica, orden y lifetime.",
      "Las conexiones deben respetar quién vive más tiempo y si una señal puede emitirse durante teardown/reentrancy."
    ],
    "concept": "Signals notifican que ocurrió algo y permiten conectar Callables sin que el emisor invoque directamente una API concreta del receptor.",
    "rules": [
      "Signal ≠ message bus global automáticamente.",
      "Evento describe algo ocurrido; command expresa una solicitud de acción.",
      "Evita strings mágicos cuando la API tipada/declared signal puede expresar el contrato."
    ],
    "deep": {
      "intro": "Diseñar comunicación por eventos sin ocultar dependencias ni crear conexiones con lifetimes rotos.",
      "sections": [
        {
          "title": "Emisor",
          "body": "Un Button puede emitir pressed sin conocer qué sistema reacciona."
        },
        {
          "title": "Conexión",
          "body": "Un Callable representa el destino; conecta/desconecta según lifecycle cuando sea necesario."
        },
        {
          "title": "Reentrancy",
          "body": "Un callback puede cambiar el árbol o emitir otras señales; diseña invariantes frente a ello."
        },
        {
          "title": "Arquitectura",
          "body": "Signals son una herramienta; para flujos críticos conviene documentar productores, consumidores y ownership."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Signals» a una decisión de arquitectura.",
      "steps": [
        "Signal ≠ message bus global automáticamente.",
        "Evento describe algo ocurrido; command expresa una solicitud de acción."
      ],
      "solution": "Desacoplar conocimiento directo no elimina la necesidad de definir semántica, orden y lifetime."
    },
    "check": {
      "question": "¿Usar signals elimina automáticamente todo acoplamiento entre sistemas?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "Reduce conocimiento directo, no la dependencia semántica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Signals».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "Signal ≠ message bus global automáticamente."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Usar signals elimina automáticamente todo acoplamiento entre sistemas?",
        "answer": "no",
        "hint": "Reduce conocimiento directo, no la dependencia semántica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Signals» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-rendering": {
    "id": "godot-rendering",
    "courseId": 45,
    "title": "Rendering en Godot: Node2D/3D a RenderingServer",
    "shortTitle": "Rendering",
    "duration": 115,
    "objective": "Relacionar la API de escena con RenderingServer, recursos GPU y el pipeline ya estudiado.",
    "summary": [
      "Los nodos visuales de alto nivel traducen estado a la infraestructura de rendering; RenderingServer expone una API más baja.",
      "CanvasItem/Node2D y Node3D pertenecen a dominios 2D/3D distintos aunque compartan conceptos de transforms y visibilidad.",
      "Manipular APIs de bajo nivel puede reducir overhead en casos concretos, pero aumenta responsabilidad y no sustituye profiling."
    ],
    "concept": "Los nodos visuales de alto nivel traducen estado a la infraestructura de rendering; RenderingServer expone una API más baja.",
    "rules": [
      "Node visual ≠ recurso GPU.",
      "RenderingServer ≠ GPU driver directamente.",
      "Mide antes de saltar de la API de escena a APIs server de bajo nivel."
    ],
    "deep": {
      "intro": "Relacionar la API de escena con RenderingServer, recursos GPU y el pipeline ya estudiado.",
      "sections": [
        {
          "title": "Alto nivel",
          "body": "Sprite2D/MeshInstance3D integran lifecycle, transform y recursos."
        },
        {
          "title": "Server",
          "body": "RenderingServer gestiona objetos de render mediante identificadores internos/RIDs y comandos de render."
        },
        {
          "title": "Threads",
          "body": "El render puede ejecutarse con threading interno; no asumas que una llamada de script equivale a ejecución GPU inmediata."
        },
        {
          "title": "Perfil",
          "body": "Bottlenecks pueden estar en CPU scene traversal, submission, shaders, fill-rate o bandwidth."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Rendering» a una decisión de arquitectura.",
      "steps": [
        "Node visual ≠ recurso GPU.",
        "RenderingServer ≠ GPU driver directamente."
      ],
      "solution": "CanvasItem/Node2D y Node3D pertenecen a dominios 2D/3D distintos aunque compartan conceptos de transforms y visibilidad."
    },
    "check": {
      "question": "¿Llamar a una API RenderingServer significa que la GPU termina ese trabajo inmediatamente?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "La ejecución real es diferida/pipelineada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Rendering».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "Node visual ≠ recurso GPU."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Llamar a una API RenderingServer significa que la GPU termina ese trabajo inmediatamente?",
        "answer": "no",
        "hint": "La ejecución real es diferida/pipelineada."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Rendering» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-physics": {
    "id": "godot-physics",
    "courseId": 45,
    "title": "Physics en Godot: bodies, areas y servers",
    "shortTitle": "Physics",
    "duration": 115,
    "objective": "Mapear CharacterBody/RigidBody/Area a las capas de simulación y entender autoridad de movimiento.",
    "summary": [
      "Godot distingue cuerpos controlados cinemáticamente, cuerpos rígidos simulados y Areas para detección/influencia.",
      "Mover un CharacterBody y aplicar fuerzas a un RigidBody son contratos diferentes.",
      "PhysicsServer expone una capa de bajo nivel; el SceneTree integra nodos y callbacks de física sobre ella."
    ],
    "concept": "Godot distingue cuerpos controlados cinemáticamente, cuerpos rígidos simulados y Areas para detección/influencia.",
    "rules": [
      "CharacterBody ≠ RigidBody.",
      "Area/trigger ≠ contacto con respuesta física obligatoria.",
      "No mutar transforms de un rigid body arbitrariamente como sustituto de fuerzas/estado del solver salvo teletransporte deliberado."
    ],
    "deep": {
      "intro": "Mapear CharacterBody/RigidBody/Area a las capas de simulación y entender autoridad de movimiento.",
      "sections": [
        {
          "title": "Character",
          "body": "CharacterBody usa movimiento controlado por gameplay y consultas de colisión."
        },
        {
          "title": "Rigid",
          "body": "RigidBody está gobernado por simulación de masa/inercia/constraints."
        },
        {
          "title": "Area",
          "body": "Area detecta overlaps y puede modelar zonas sin imponer separación física."
        },
        {
          "title": "Tick",
          "body": "La lógica física debe respetar el timestep de física y no derivar su estabilidad del FPS de render."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Physics» a una decisión de arquitectura.",
      "steps": [
        "CharacterBody ≠ RigidBody.",
        "Area/trigger ≠ contacto con respuesta física obligatoria."
      ],
      "solution": "Mover un CharacterBody y aplicar fuerzas a un RigidBody son contratos diferentes."
    },
    "check": {
      "question": "¿CharacterBody y RigidBody tienen el mismo modelo de autoridad de movimiento?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "Uno suele ser controlado; el otro simulado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Physics».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "CharacterBody ≠ RigidBody."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿CharacterBody y RigidBody tienen el mismo modelo de autoridad de movimiento?",
        "answer": "no",
        "hint": "Uno suele ser controlado; el otro simulado."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Physics» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-input": {
    "id": "godot-input",
    "courseId": 45,
    "title": "Input, InputMap y acciones",
    "shortTitle": "Input",
    "duration": 100,
    "objective": "Separar dispositivo físico, acción de juego y sampling temporal.",
    "summary": [
      "InputMap desacopla acciones como jump/fire de teclas o botones concretos.",
      "Eventos de input y polling de estado responden preguntas distintas.",
      "La lógica de gameplay reproducible se beneficia de convertir input físico en comandos/acciones etiquetados por tick cuando corresponde."
    ],
    "concept": "InputMap desacopla acciones como jump/fire de teclas o botones concretos.",
    "rules": [
      "Hardware event ≠ gameplay action.",
      "Polling puede perder semántica de transiciones si no se conserva estado/eventos.",
      "No mezcles mapping de controles con reglas de gameplay."
    ],
    "deep": {
      "intro": "Separar dispositivo físico, acción de juego y sampling temporal.",
      "sections": [
        {
          "title": "Mapeo",
          "body": "Una acción move_left puede tener teclado y gamepad sin cambiar gameplay."
        },
        {
          "title": "Eventos",
          "body": "_input/_unhandled_input procesan eventos; Input consulta estado global de dispositivos/acciones."
        },
        {
          "title": "Consumo",
          "body": "UI puede consumir input antes de gameplay según el flujo."
        },
        {
          "title": "Replays",
          "body": "Para replays/rollback registra intención normalizada, no necesariamente eventos de hardware crudos."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Input» a una decisión de arquitectura.",
      "steps": [
        "Hardware event ≠ gameplay action.",
        "Polling puede perder semántica de transiciones si no se conserva estado/eventos."
      ],
      "solution": "Eventos de input y polling de estado responden preguntas distintas."
    },
    "check": {
      "question": "¿InputMap obliga a que una acción tenga una sola tecla?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "Una acción puede mapear múltiples entradas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Input».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "Hardware event ≠ gameplay action."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿InputMap obliga a que una acción tenga una sola tecla?",
        "answer": "no",
        "hint": "Una acción puede mapear múltiples entradas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Input» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-scripting": {
    "id": "godot-scripting",
    "courseId": 45,
    "title": "Scripting y Object model",
    "shortTitle": "Scripting",
    "duration": 105,
    "objective": "Entender Object, RefCounted, Node y el binding común detrás de varios lenguajes.",
    "summary": [
      "Todas las clases del engine derivan conceptualmente de Object y exponen propiedades, métodos y signals mediante el sistema de clases de Godot.",
      "Node añade integración con SceneTree; RefCounted aporta conteo de referencias para ciertos objetos/resources.",
      "GDScript, C# y GDExtension acceden al mismo modelo de objetos con costes/idiomas/toolchains distintos."
    ],
    "concept": "Todas las clases del engine derivan conceptualmente de Object y exponen propiedades, métodos y signals mediante el sistema de clases de Godot.",
    "rules": [
      "Lenguaje ≠ subsistema del engine.",
      "Object lifetime depende del tipo: no asumas GC uniforme para todo.",
      "Cruzar el boundary de scripting tiene coste; optimiza solo después de medir."
    ],
    "deep": {
      "intro": "Entender Object, RefCounted, Node y el binding común detrás de varios lenguajes.",
      "sections": [
        {
          "title": "Object",
          "body": "Propiedades/métodos/signals se exponen mediante reflexión/ClassDB/bindings del motor."
        },
        {
          "title": "Node",
          "body": "Tiene lifecycle del árbol y suele liberarse explícitamente/diferido por la escena."
        },
        {
          "title": "RefCounted",
          "body": "Puede liberar cuando desaparecen referencias, pero ciclos y referencias externas requieren comprensión del modelo."
        },
        {
          "title": "Interop",
          "body": "Cada lenguaje tiene sus reglas de tipos, nullability y marshaling."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Scripting» a una decisión de arquitectura.",
      "steps": [
        "Lenguaje ≠ subsistema del engine.",
        "Object lifetime depende del tipo: no asumas GC uniforme para todo."
      ],
      "solution": "Node añade integración con SceneTree; RefCounted aporta conteo de referencias para ciertos objetos/resources."
    },
    "check": {
      "question": "¿Todos los Objects de Godot se liberan exactamente por el mismo mecanismo de GC?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "Node/Object y RefCounted tienen lifetimes distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Scripting».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "Lenguaje ≠ subsistema del engine."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Todos los Objects de Godot se liberan exactamente por el mismo mecanismo de GC?",
        "answer": "no",
        "hint": "Node/Object y RefCounted tienen lifetimes distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Scripting» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-gdscript": {
    "id": "godot-gdscript",
    "courseId": 45,
    "title": "GDScript: tipado, lifecycle y rendimiento",
    "shortTitle": "GDScript",
    "duration": 110,
    "objective": "Escribir GDScript idiomático con tipado gradual, callbacks y separación de datos/lógica.",
    "summary": [
      "GDScript está diseñado para integrarse estrechamente con el modelo de objetos y editor de Godot.",
      "El tipado estático opcional mejora contratos/tooling, pero no convierte el lenguaje en C++ ni elimina todos los checks/runtime costs.",
      "La optimización más importante suele ser evitar trabajo innecesario por frame y elegir mejores algoritmos antes de microoptimizar sintaxis."
    ],
    "concept": "GDScript está diseñado para integrarse estrechamente con el modelo de objetos y editor de Godot.",
    "rules": [
      "@onready resuelve timing de referencia, no ownership.",
      "Typed GDScript ≠ native code.",
      "Evita _process en miles de nodos si un sistema agregado puede hacer menos trabajo."
    ],
    "deep": {
      "intro": "Escribir GDScript idiomático con tipado gradual, callbacks y separación de datos/lógica.",
      "sections": [
        {
          "title": "Tipos",
          "body": "Puedes declarar tipos para variables, parámetros y retornos y obtener análisis/editor más fuerte."
        },
        {
          "title": "Lifecycle",
          "body": "@onready evalúa cuando el nodo está ready; usarlo antes de ese punto sigue siendo un error de diseño."
        },
        {
          "title": "Signals",
          "body": "Declarar signals y conectar Callables da contratos más claros que strings dispersos."
        },
        {
          "title": "Perfil",
          "body": "Optimiza según profiler; hotspots de algoritmo/datos dominan a menudo sobre detalles sintácticos."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «GDScript» a una decisión de arquitectura.",
      "steps": [
        "@onready resuelve timing de referencia, no ownership.",
        "Typed GDScript ≠ native code."
      ],
      "solution": "El tipado estático opcional mejora contratos/tooling, pero no convierte el lenguaje en C++ ni elimina todos los checks/runtime costs."
    },
    "check": {
      "question": "¿Añadir tipos estáticos a GDScript lo convierte en código nativo C++?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "Mejora contratos/tooling, no cambia mágicamente el runtime."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «GDScript».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "@onready resuelve timing de referencia, no ownership."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Añadir tipos estáticos a GDScript lo convierte en código nativo C++?",
        "answer": "no",
        "hint": "Mejora contratos/tooling, no cambia mágicamente el runtime."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «GDScript» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-csharp": {
    "id": "godot-csharp",
    "courseId": 45,
    "title": "C# en Godot y frontera .NET",
    "shortTitle": "C#",
    "duration": 110,
    "objective": "Usar C# entendiendo bindings, lifecycle, GC y diferencias de plataforma/toolchain.",
    "summary": [
      "Godot soporta C# mediante su integración .NET; la API se proyecta con convenciones propias del binding.",
      "El GC de objetos C# no implica que un Node nativo pueda ignorar el lifecycle de Godot.",
      "Interop y asignaciones administradas pueden importar en hot paths, pero el perfil decide si son relevantes."
    ],
    "concept": "Godot soporta C# mediante su integración .NET; la API se proyecta con convenciones propias del binding.",
    "rules": [
      "C# object lifetime ≠ Node lifetime.",
      "No supongas equivalencia textual exacta entre nombres GDScript y C#; sigue el binding/documentación.",
      "Evita allocation churn en callbacks muy frecuentes si el profiler lo demuestra."
    ],
    "deep": {
      "intro": "Usar C# entendiendo bindings, lifecycle, GC y diferencias de plataforma/toolchain.",
      "sections": [
        {
          "title": "Binding",
          "body": "Tipos del engine aparecen como clases .NET que envuelven/interactúan con objetos nativos."
        },
        {
          "title": "Lifetime",
          "body": "Mantener una referencia administrada no siempre significa que el objeto nativo siga válido tras queue_free."
        },
        {
          "title": "Signals",
          "body": "C# puede usar eventos/delegates/bindings de signals; conserva semántica de conexión y lifetime."
        },
        {
          "title": "Toolchain",
          "body": "La versión/build .NET del editor/export determina soporte de plataformas y pipeline."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «C#» a una decisión de arquitectura.",
      "steps": [
        "C# object lifetime ≠ Node lifetime.",
        "No supongas equivalencia textual exacta entre nombres GDScript y C#; sigue el binding/documentación."
      ],
      "solution": "El GC de objetos C# no implica que un Node nativo pueda ignorar el lifecycle de Godot."
    },
    "check": {
      "question": "¿El GC de C# sustituye queue_free para todos los Nodes?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "El objeto nativo sigue el lifecycle del engine."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «C#».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "C# object lifetime ≠ Node lifetime."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El GC de C# sustituye queue_free para todos los Nodes?",
        "answer": "no",
        "hint": "El objeto nativo sigue el lifecycle del engine."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «C#» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-gdextension": {
    "id": "godot-gdextension",
    "courseId": 45,
    "title": "GDExtension y código nativo",
    "shortTitle": "GDExtension",
    "duration": 120,
    "objective": "Entender GDExtension como ABI/API de extensión nativa y decidir cuándo usarla.",
    "summary": [
      "GDExtension permite que Godot cargue librerías nativas y extienda funcionalidad sin recompilar el engine.",
      "GDExtension no es un lenguaje; C++ mediante godot-cpp es una opción común, no la definición del mecanismo.",
      "La compatibilidad depende de la API/ABI de extensión y de construir contra versiones/bindings adecuados."
    ],
    "concept": "GDExtension permite que Godot cargue librerías nativas y extienda funcionalidad sin recompilar el engine.",
    "rules": [
      "GDExtension ≠ GDScript.",
      "Native ≠ automáticamente más rápido end-to-end.",
      "No saltes a C++ para ocultar un algoritmo O(n²) o exceso de llamadas al engine."
    ],
    "deep": {
      "intro": "Entender GDExtension como ABI/API de extensión nativa y decidir cuándo usarla.",
      "sections": [
        {
          "title": "Boundary",
          "body": "La extensión registra clases/métodos y se comunica con el Object model del engine."
        },
        {
          "title": "Build",
          "body": "La librería debe compilarse para plataforma/arquitectura objetivo y usar bindings compatibles."
        },
        {
          "title": "Rendimiento",
          "body": "Es útil para cómputo pesado, integración de SDKs o APIs nativas cuando la frontera está bien diseñada."
        },
        {
          "title": "Riesgo",
          "body": "Código nativo añade toolchain, crashes nativos, ABI y distribución; exige tests y sanitizers cuando corresponda."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «GDExtension» a una decisión de arquitectura.",
      "steps": [
        "GDExtension ≠ GDScript.",
        "Native ≠ automáticamente más rápido end-to-end."
      ],
      "solution": "GDExtension no es un lenguaje; C++ mediante godot-cpp es una opción común, no la definición del mecanismo."
    },
    "check": {
      "question": "¿GDExtension es un lenguaje de scripting propio de Godot?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "Es tecnología de extensión para librerías nativas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «GDExtension».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "GDExtension ≠ GDScript."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿GDExtension es un lenguaje de scripting propio de Godot?",
        "answer": "no",
        "hint": "Es tecnología de extensión para librerías nativas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «GDExtension» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-profiling": {
    "id": "godot-profiling",
    "courseId": 45,
    "title": "Profiling, debugging y observabilidad",
    "shortTitle": "Profiling",
    "duration": 110,
    "objective": "Diagnosticar CPU, GPU, memoria, física y red con métricas antes de optimizar.",
    "summary": [
      "El profiler del engine ayuda a separar coste de scripts, física, rendering y otros subsistemas; los monitores muestran métricas runtime.",
      "Un frame lento puede venir de CPU, GPU, sincronización, allocaciones, IO o shaders; FPS medio no identifica la causa.",
      "Los perfiles deben capturarse en escena/configuración reproducible y, cuando importa, en hardware objetivo."
    ],
    "concept": "El profiler del engine ayuda a separar coste de scripts, física, rendering y otros subsistemas; los monitores muestran métricas runtime.",
    "rules": [
      "FPS ≠ diagnóstico.",
      "Editor profiling ≠ build final idéntica.",
      "Mide percentiles/spikes además de promedios."
    ],
    "deep": {
      "intro": "Diagnosticar CPU, GPU, memoria, física y red con métricas antes de optimizar.",
      "sections": [
        {
          "title": "CPU",
          "body": "Busca funciones/callbacks dominantes y cantidad de llamadas, no solo porcentajes aislados."
        },
        {
          "title": "GPU",
          "body": "Usa métricas/timestamps/rendering profiler cuando el cuello es gráfico; CPU profiler no ve todo el tiempo GPU."
        },
        {
          "title": "Memoria",
          "body": "Monitorea allocations, objetos y recursos residentes; un leak puede ser lifetime lógico aunque el proceso no crezca inmediatamente."
        },
        {
          "title": "Producción",
          "body": "Compara debug/editor/release y dispositivo objetivo antes de concluir."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Profiling» a una decisión de arquitectura.",
      "steps": [
        "FPS ≠ diagnóstico.",
        "Editor profiling ≠ build final idéntica."
      ],
      "solution": "Un frame lento puede venir de CPU, GPU, sincronización, allocaciones, IO o shaders; FPS medio no identifica la causa."
    },
    "check": {
      "question": "¿Un contador de 120 FPS demuestra que no hay stutter?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "El promedio puede esconder spikes de frame time."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Profiling».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "FPS ≠ diagnóstico."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un contador de 120 FPS demuestra que no hay stutter?",
        "answer": "no",
        "hint": "El promedio puede esconder spikes de frame time."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Profiling» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-networking": {
    "id": "godot-networking",
    "courseId": 45,
    "title": "Networking en Godot: peers, autoridad y replicación",
    "shortTitle": "Networking",
    "duration": 115,
    "objective": "Conectar MultiplayerAPI/RPC con los modelos de autoridad, prediction y replicación del bloque 044.",
    "summary": [
      "La API multiplayer de alto nivel organiza peers, RPCs y autoridad sobre el SceneTree, pero no elimina latencia, seguridad ni diseño de protocolo.",
      "RPC es una invocación remota con reglas de autoridad/reliability; no es una llamada local transparente.",
      "MultiplayerSynchronizer/Spawner pueden automatizar partes de replicación, pero interest management, prediction y validación siguen siendo decisiones de diseño."
    ],
    "concept": "La API multiplayer de alto nivel organiza peers, RPCs y autoridad sobre el SceneTree, pero no elimina latencia, seguridad ni diseño de protocolo.",
    "rules": [
      "RPC ≠ función local.",
      "Authority API ≠ seguridad completa por sí sola.",
      "Replicación automática ≠ enviar todo a todos."
    ],
    "deep": {
      "intro": "Conectar MultiplayerAPI/RPC con los modelos de autoridad, prediction y replicación del bloque 044.",
      "sections": [
        {
          "title": "Peer",
          "body": "MultiplayerPeer aporta transporte/conexión al MultiplayerAPI."
        },
        {
          "title": "Authority",
          "body": "Define qué peer controla determinados nodos/operaciones y valida en servidor cuando la lógica lo requiere."
        },
        {
          "title": "Replicación",
          "body": "Synchronizer/Spawner ayudan con propiedades y spawn/despawn dentro del modelo de Godot."
        },
        {
          "title": "Netcode",
          "body": "Prediction, rollback o lag compensation siguen necesitando estado/ticks/protocolo explícito encima o alrededor de esas APIs."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Networking» a una decisión de arquitectura.",
      "steps": [
        "RPC ≠ función local.",
        "Authority API ≠ seguridad completa por sí sola."
      ],
      "solution": "RPC es una invocación remota con reglas de autoridad/reliability; no es una llamada local transparente."
    },
    "check": {
      "question": "¿Usar RPC hace que una llamada remota tenga la misma latencia/fiabilidad que una llamada local?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "La red mantiene sus propiedades físicas y de transporte."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Networking».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "RPC ≠ función local."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Usar RPC hace que una llamada remota tenga la misma latencia/fiabilidad que una llamada local?",
        "answer": "no",
        "hint": "La red mantiene sus propiedades físicas y de transporte."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Networking» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-editor-tools": {
    "id": "godot-editor-tools",
    "courseId": 45,
    "title": "Editor tools, plugins y custom nodes",
    "shortTitle": "Editor tools",
    "duration": 115,
    "objective": "Extender el editor con herramientas que mejoren flujos de producción sin contaminar runtime.",
    "summary": [
      "EditorPlugin permite extender el editor con docks, inspectors, importers y herramientas especializadas.",
      "Scripts @tool pueden ejecutarse en el editor, por lo que sus side effects deben diseñarse con más cuidado que código solo-runtime.",
      "Custom nodes/resources bien diseñados convierten invariantes de proyecto en interfaces reutilizables y validables."
    ],
    "concept": "EditorPlugin permite extender el editor con docks, inspectors, importers y herramientas especializadas.",
    "rules": [
      "Editor code ≠ runtime code necesariamente.",
      "@tool puede mutar escenas/assets mientras editas.",
      "Una herramienta vale por reducir errores/repetición medible, no por añadir botones."
    ],
    "deep": {
      "intro": "Extender el editor con herramientas que mejoren flujos de producción sin contaminar runtime.",
      "sections": [
        {
          "title": "Plugin",
          "body": "EditorPlugin registra UI, inspectores, gizmos, importers u otros hooks del editor."
        },
        {
          "title": "@tool",
          "body": "Permite ejecutar scripts en editor; evita operaciones destructivas/expensivas sin controles claros."
        },
        {
          "title": "Custom types",
          "body": "Puedes exponer nodos/resources de dominio con iconos, propiedades y validación."
        },
        {
          "title": "Pipeline",
          "body": "Herramientas de import/cook pueden transformar assets en formatos runtime reproducibles."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Editor tools» a una decisión de arquitectura.",
      "steps": [
        "Editor code ≠ runtime code necesariamente.",
        "@tool puede mutar escenas/assets mientras editas."
      ],
      "solution": "Scripts @tool pueden ejecutarse en el editor, por lo que sus side effects deben diseñarse con más cuidado que código solo-runtime."
    },
    "check": {
      "question": "¿Un script @tool solo se ejecuta cuando exportas el juego?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "Puede ejecutarse dentro del editor."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Editor tools».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "Editor code ≠ runtime code necesariamente."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un script @tool solo se ejecuta cuando exportas el juego?",
        "answer": "no",
        "hint": "Puede ejecutarse dentro del editor."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Editor tools» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  },
  "godot-engine-source": {
    "id": "godot-engine-source",
    "courseId": 45,
    "title": "Leer y modificar el engine source",
    "shortTitle": "Engine source",
    "duration": 130,
    "objective": "Aprender a navegar el repositorio de Godot, seguir una feature y construir una modificación verificable.",
    "summary": [
      "El repositorio oficial del engine permite estudiar la implementación real desde Scene/Core/Servers hasta drivers y editor.",
      "Leer source eficazmente empieza por una pregunta concreta y símbolos conocidos, no por abrir miles de archivos en orden.",
      "Modificar el engine exige distinguir parche local, módulo/engine build y GDExtension; cada opción tiene distinto coste de mantenimiento."
    ],
    "concept": "El repositorio oficial del engine permite estudiar la implementación real desde Scene/Core/Servers hasta drivers y editor.",
    "rules": [
      "Docs explican contrato; source muestra implementación actual.",
      "Implementación actual ≠ garantía eterna de API.",
      "Prefiere extensión/plugin cuando satisface el requisito; recompilar engine cuando necesitas cambiar internals reales."
    ],
    "deep": {
      "intro": "Aprender a navegar el repositorio de Godot, seguir una feature y construir una modificación verificable.",
      "sections": [
        {
          "title": "Ruta",
          "body": "Parte de una clase/documentación, busca su definición y llamadas hacia subsistemas inferiores."
        },
        {
          "title": "Historial",
          "body": "git blame/log ayudan a entender por qué existe una decisión, no solo qué hace hoy."
        },
        {
          "title": "Build",
          "body": "Una modificación del engine debe compilarse y probarse en configuración/plataformas relevantes."
        },
        {
          "title": "Contribución",
          "body": "Un cambio upstream necesita reproducibilidad, tests/benchmarks y ajuste al estilo/arquitectura del proyecto."
        }
      ]
    },
    "example": {
      "problem": "Aplica la idea central de «Engine source» a una decisión de arquitectura.",
      "steps": [
        "Docs explican contrato; source muestra implementación actual.",
        "Implementación actual ≠ garantía eterna de API."
      ],
      "solution": "Leer source eficazmente empieza por una pregunta concreta y símbolos conocidos, no por abrir miles de archivos en orden."
    },
    "check": {
      "question": "¿Leer el source actual convierte cualquier detalle interno en API pública estable?",
      "options": [
        [
          "no",
          true
        ],
        [
          "si",
          false
        ],
        [
          "depende siempre",
          false
        ]
      ],
      "feedback": "La implementación puede cambiar aunque el contrato público se preserve."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resume la distinción central de «Engine source».",
        "answer": "separar conceptos",
        "alternatives": [
          "separar responsabilidades"
        ],
        "hint": "Docs explican contrato; source muestra implementación actual."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Leer el source actual convierte cualquier detalle interno en API pública estable?",
        "answer": "no",
        "hint": "La implementación puede cambiar aunque el contrato público se preserve."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene verificar «Engine source» con profiler, debugger, documentación o source según el contrato que investigas? sí/no",
        "answer": "si",
        "hint": "Godot es un motor real: distingue contrato, medición e implementación."
      }
    ]
  }
});
