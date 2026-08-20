/**
 * BLOQUE 041 — Animación digital
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar clip, pose, jerarquía, deformación y lógica temporal.
 * Una animación suave no es necesariamente físicamente correcta, determinista
 * ni compatible con cualquier rig; espacios, referencias y lifetimes importan.
 */
window.LEARNING_PATHS[41] = {
  "level": "Experto progresivo",
  "estimatedHours": 126,
  "description": "Animación digital: clips, interpolación, skeletons, skinning, FK/IK, blending, state machines y pipeline de engine.",
  "outcomes": [
    "Modelar clips y poses con espacios/tiempo explícitos.",
    "Construir skeletons y skinning con bind/rest pose correctas.",
    "Combinar FK, IK, blending, layers, root motion y state machines.",
    "Integrar animación en un engine con eventos reproducibles, paralelismo y métricas."
  ],
  "modules": [
    {
      "id": "m1-clips",
      "title": "Clips y poses",
      "description": "Keyframes, interpolación y skeletons",
      "lessons": [
        "anim-keyframes-curves",
        "anim-interpolation",
        "anim-skeleton-hierarchy",
        "anim-skinning"
      ]
    },
    {
      "id": "m2-kinematics",
      "title": "Cinemática de animación",
      "description": "FK, IK y blending",
      "lessons": [
        "anim-forward-kinematics",
        "anim-inverse-kinematics",
        "anim-blending",
        "anim-blend-spaces"
      ]
    },
    {
      "id": "m3-control",
      "title": "Control de movimiento",
      "description": "State machines, root motion y capas",
      "lessons": [
        "anim-state-machines",
        "anim-root-motion",
        "anim-additive-layers"
      ]
    },
    {
      "id": "m4-production",
      "title": "Producción e integración",
      "description": "Retargeting, compresión e integración del engine",
      "lessons": [
        "anim-events-sync",
        "anim-retargeting-compression",
        "anim-integration-engine"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "anim-keyframes-curves": {
    "id": "anim-keyframes-curves",
    "courseId": 41,
    "title": "Keyframes, tracks y curvas de animación",
    "shortTitle": "Keyframes, tracks y curvas de animación",
    "duration": 110,
    "objective": "Construir clips como funciones del tiempo y distinguir keyframes, tracks, tangentes, eventos y sampling.",
    "summary": [
      "Un clip de animación es una colección de canales/tracks que mapean tiempo a valores; un keyframe es una muestra de control, no un frame renderizado obligatorio.",
      "La evaluación puede ocurrir a cualquier tiempo y la interpolación define los valores entre keys; frame rate del juego y densidad de keys son conceptos distintos.",
      "Eventos discretos y curvas continuas requieren semánticas distintas: interpolar un sonido o un cambio de estado como si fuera un vector carece de sentido."
    ],
    "concept": "Un clip de animación es una colección de canales/tracks que mapean tiempo a valores; un keyframe es una muestra de control, no un frame renderizado obligatorio.",
    "rules": [
      "Separa tiempo del clip, tiempo global y tiempo normalizado.",
      "No assumes que 30 keys/s implica reproducir a 30 FPS.",
      "Declara si un track es continuo, discreto o evento."
    ],
    "deep": {
      "intro": "Construir clips como funciones del tiempo y distinguir keyframes, tracks, tangentes, eventos y sampling.",
      "sections": [
        {
          "title": "Clip como función",
          "body": "Un track de traslación puede verse como T(t); otro de rotación como R(t). El clip evalúa varios canales en el mismo tiempo lógico."
        },
        {
          "title": "Keyframes",
          "body": "Keys almacenan tiempo y valor, y a veces tangentes. No son equivalentes a frames de render."
        },
        {
          "title": "Playback",
          "body": "Loop, clamp, ping-pong y playback rate transforman el tiempo antes de evaluar los tracks."
        },
        {
          "title": "Eventos",
          "body": "Footsteps y markers suelen dispararse al cruzar instantes; necesitan reglas claras al saltar tiempo o reproducir en reversa."
        }
      ]
    },
    "example": {
      "problem": "Keys a t=0 s y t=2 s. Se reproduce al doble de velocidad. ¿Cuánto tiempo real tarda el clip en recorrer esos 2 s?",
      "steps": [
        "playbackRate=2 significa avanzar 2 s de clip por 1 s real.",
        "2/2=1 s."
      ],
      "solution": "1 s."
    },
    "check": {
      "question": "¿Un keyframe equivale necesariamente a un frame de pantalla?",
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
          "Solo en 60 Hz",
          false
        ]
      ],
      "feedback": "La evaluación puede ocurrir a cualquier tiempo y la interpolación define los valores entre keys; frame rate del juego y densidad de keys son conceptos distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Clip de 3 s a playbackRate=1.5. Duración real en s.",
        "answer": "2",
        "hint": "3/1.5."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una curva puede evaluarse entre keyframes?",
        "answer": "si",
        "hint": "La interpolación lo permite."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un evento discreto debe interpolarse numéricamente entre dos estados?",
        "answer": "no",
        "hint": "Usa semántica de evento/marker."
      }
    ]
  },
  "anim-interpolation": {
    "id": "anim-interpolation",
    "courseId": 41,
    "title": "Interpolación de posición, escala y rotación",
    "shortTitle": "Interpolación de posición, escala y rotación",
    "duration": 110,
    "objective": "Distinguir interpolación escalar/vectorial de interpolación de rotaciones y manejar continuidad, parametrización y overshoot.",
    "summary": [
      "LERP interpola linealmente componentes; para rotaciones 3D conviene trabajar con cuaterniones normalizados y caminos de rotación bien definidos.",
      "Interpolar matrices de transformación componente a componente puede introducir shear, escala no deseada o perder ortogonalidad.",
      "Interpoladores cúbicos pueden ofrecer continuidad de velocidad, pero también overshoot; elegirlos es una decisión de autoría y no una mejora automática."
    ],
    "concept": "LERP interpola linealmente componentes; para rotaciones 3D conviene trabajar con cuaterniones normalizados y caminos de rotación bien definidos.",
    "rules": [
      "No hagas lerp directo de matrices de pose como método general.",
      "Normaliza cuaterniones cuando la representación/algoritmo lo requiera.",
      "Controla la rama corta en interpolación quaternion si la semántica del clip la requiere."
    ],
    "deep": {
      "intro": "Distinguir interpolación escalar/vectorial de interpolación de rotaciones y manejar continuidad, parametrización y overshoot.",
      "sections": [
        {
          "title": "LERP",
          "body": "lerp(a,b,u)=(1-u)a+ub es apropiado para escalares y vectores en un espacio afín."
        },
        {
          "title": "Rotación",
          "body": "Quaternions q y -q representan la misma rotación; el signo importa al escoger un camino de interpolación continuo."
        },
        {
          "title": "Cúbicas",
          "body": "Hermite/CUBICSPLINE usan tangentes y pueden mejorar suavidad; la continuidad depende de cómo se construyan tangentes y tiempos."
        },
        {
          "title": "Tiempo",
          "body": "Interpolar con u derivado del tiempo real requiere normalizar por la separación temporal entre keys."
        }
      ]
    },
    "example": {
      "problem": "Posiciones 2 y 10 con u=0.25. LERP.",
      "steps": [
        "(1-0.25)·2 + 0.25·10",
        "1.5+2.5=4."
      ],
      "solution": "4."
    },
    "check": {
      "question": "¿Es correcto interpolar matrices de pose elemento a elemento como método general?",
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
          "Solo con perspectiva",
          false
        ]
      ],
      "feedback": "Interpolar matrices de transformación componente a componente puede introducir shear, escala no deseada o perder ortogonalidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "LERP entre 0 y 20 con u=0.35.",
        "answer": "7",
        "hint": "0.65·0+0.35·20."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿q y -q representan la misma rotación física?",
        "answer": "si",
        "hint": "Son la doble cobertura quaternion."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una spline cúbica elimina por definición todo overshoot?",
        "answer": "no",
        "hint": "Depende de tangentes y esquema."
      }
    ]
  },
  "anim-skeleton-hierarchy": {
    "id": "anim-skeleton-hierarchy",
    "courseId": 41,
    "title": "Skeletons, bones y espacios de transformación",
    "shortTitle": "Skeletons, bones y espacios de transformación",
    "duration": 110,
    "objective": "Modelar un esqueleto como jerarquía de joints/bones y distinguir transform local, global, rest/bind pose y pose animada.",
    "summary": [
      "Un skeleton es una jerarquía: la transformación global de un joint compone la de sus ancestros con su transformación local.",
      "Rest pose y bind pose están relacionadas con autoría/deformación, pero no deben confundirse con la pose animada actual.",
      "Bone es un término de autoría; matemáticamente la deformación suele estar gobernada por transforms de joints y matrices de skinning."
    ],
    "concept": "Un skeleton es una jerarquía: la transformación global de un joint compone la de sus ancestros con su transformación local.",
    "rules": [
      "Declara siempre si un transform es local, global, rest o animated.",
      "No derives ownership de recursos únicamente de la jerarquía ósea.",
      "Evita ciclos: una jerarquía de joints para FK debe ser acíclica."
    ],
    "deep": {
      "intro": "Modelar un esqueleto como jerarquía de joints/bones y distinguir transform local, global, rest/bind pose y pose animada.",
      "sections": [
        {
          "title": "Jerarquía",
          "body": "G_child=G_parent·L_child bajo convención column-vector; el orden se adapta si el motor usa otra convención."
        },
        {
          "title": "Rest pose",
          "body": "Describe la configuración base de autoría; la pose actual introduce transforms animados."
        },
        {
          "title": "Bind",
          "body": "Las inverse bind matrices convierten desde el espacio en que fue vinculada la malla al espacio requerido por el joint en la deformación."
        },
        {
          "title": "Topología",
          "body": "La evaluación suele procesar padres antes que hijos para disponer del transform global del ancestro."
        }
      ]
    },
    "example": {
      "problem": "Parent global translation x=3 y child local translation x=2, sin rotación/escala. World x del child.",
      "steps": [
        "Composición simple: 3+2."
      ],
      "solution": "5."
    },
    "check": {
      "question": "¿La transformación local de un hijo es ya su transformación global?",
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
          "Solo en skeletons",
          false
        ]
      ],
      "feedback": "Rest pose y bind pose están relacionadas con autoría/deformación, pero no deben confundirse con la pose animada actual."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Parent x=7, child local x=-2. World x.",
        "answer": "5",
        "hint": "Suma en este caso simplificado."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un skeleton para FK debe contener ciclos?",
        "answer": "no",
        "hint": "La dependencia parent→child sería circular."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Rest pose y pose animada actual son necesariamente iguales?",
        "answer": "no",
        "hint": "La animación modifica la pose."
      }
    ]
  },
  "anim-skinning": {
    "id": "anim-skinning",
    "courseId": 41,
    "title": "Skinning: pesos, inverse bind y deformación",
    "shortTitle": "Skinning: pesos, inverse bind y deformación",
    "duration": 110,
    "objective": "Explicar linear blend skinning con joints, pesos y matrices de skinning, incluyendo sus límites y artefactos.",
    "summary": [
      "Linear Blend Skinning deforma cada vértice combinando transforms de varios joints ponderados; los pesos suelen normalizarse para una mezcla afín coherente.",
      "La matriz de skinning de un joint combina su transform actual con la inverse bind matrix correspondiente; usar solo el transform global mueve la malla desde un espacio equivocado.",
      "LBS es eficiente pero puede producir artefactos como pérdida de volumen en torsiones; dual-quaternion skinning es una alternativa, no una obligación universal."
    ],
    "concept": "Linear Blend Skinning deforma cada vértice combinando transforms de varios joints ponderados; los pesos suelen normalizarse para una mezcla afín coherente.",
    "rules": [
      "Comprueba que joint indices y weights correspondan al mismo skin.",
      "Normaliza pesos cuando el formato/asset pipeline no lo garantice.",
      "No confundas normal/tangent skinning con position skinning si hay escalas no uniformes."
    ],
    "deep": {
      "intro": "Explicar linear blend skinning con joints, pesos y matrices de skinning, incluyendo sus límites y artefactos.",
      "sections": [
        {
          "title": "LBS",
          "body": "p' = Σ w_i M_i p, con Σw_i≈1."
        },
        {
          "title": "Skin matrix",
          "body": "M_i = G_i(actual) · inverseBind_i bajo una convención típica; el objetivo es mapear del bind al pose actual."
        },
        {
          "title": "Pesos",
          "body": "Cuatro influencias son comunes en pipelines, pero no una ley matemática universal."
        },
        {
          "title": "Artefactos",
          "body": "La mezcla lineal de matrices no preserva rigidez perfecta; torsiones pueden adelgazar geometría."
        }
      ]
    },
    "example": {
      "problem": "Vertice con dos joints que producen x=2 y x=6, pesos 0.25 y 0.75. x final.",
      "steps": [
        "0.25·2+0.75·6",
        "0.5+4.5=5."
      ],
      "solution": "5."
    },
    "check": {
      "question": "¿Linear Blend Skinning garantiza preservar volumen en cualquier torsión?",
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
          "Solo con 4 bones",
          false
        ]
      ],
      "feedback": "La matriz de skinning de un joint combina su transform actual con la inverse bind matrix correspondiente; usar solo el transform global mueve la malla desde un espacio equivocado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Pesos 0.2,0.3,0.5. ¿Suman 1? sí/no",
        "answer": "si",
        "hint": "0.2+0.3+0.5."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dos posiciones 0 y 10 con pesos 0.6 y 0.4. Resultado.",
        "answer": "4",
        "hint": "0+4."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La inverse bind matrix es prescindible en general si la malla fue vinculada fuera del origin de cada joint?",
        "answer": "no",
        "hint": "Hace falta reconciliar espacios."
      }
    ]
  },
  "anim-forward-kinematics": {
    "id": "anim-forward-kinematics",
    "courseId": 41,
    "title": "Forward kinematics (FK)",
    "shortTitle": "Forward kinematics (FK)",
    "duration": 110,
    "objective": "Propagar transforms desde la raíz a las hojas y razonar sobre grados de libertad, pivotes y coste de evaluación.",
    "summary": [
      "FK calcula la pose global a partir de parámetros locales y la jerarquía; es directa y determinista dada la pose local.",
      "Modificar un joint padre afecta a todos sus descendientes, mientras modificar una hoja no cambia sus ancestros.",
      "FK no resuelve por sí sola el problema inverso de colocar una mano exactamente sobre un objetivo; para eso se introduce IK."
    ],
    "concept": "FK calcula la pose global a partir de parámetros locales y la jerarquía; es directa y determinista dada la pose local.",
    "rules": [
      "Evalúa padres antes que hijos o usa una estrategia equivalente.",
      "Mantén clara la convención de multiplicación y los pivotes.",
      "No confundas una cadena de FK con un solver de constraints."
    ],
    "deep": {
      "intro": "Propagar transforms desde la raíz a las hojas y razonar sobre grados de libertad, pivotes y coste de evaluación.",
      "sections": [
        {
          "title": "Propagación",
          "body": "G_i=G_parent(i)·L_i."
        },
        {
          "title": "DOF",
          "body": "Cada joint puede exponer un subconjunto de traslación/rotación; un rig humano suele restringirlos según anatomía/autoría."
        },
        {
          "title": "Dirty propagation",
          "body": "Cambiar un ancestro invalida transforms globales de descendientes; motores pueden usar flags dirty."
        },
        {
          "title": "Uso",
          "body": "FK es natural para reproducir clips donde las rotaciones locales ya fueron authored."
        }
      ]
    },
    "example": {
      "problem": "Cadena de 3 segmentos colineales de longitudes 1,2,3 con rotaciones cero. Distancia root→effector.",
      "steps": [
        "1+2+3=6."
      ],
      "solution": "6."
    },
    "check": {
      "question": "¿FK encuentra automáticamente los ángulos necesarios para alcanzar un target arbitrario?",
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
          "Solo con quaternions",
          false
        ]
      ],
      "feedback": "Modificar un joint padre afecta a todos sus descendientes, mientras modificar una hoja no cambia sus ancestros."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Longitudes 2,2,1 alineadas. Alcance total.",
        "answer": "5",
        "hint": "Suma."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Mover un joint padre puede cambiar la pose global de un nieto?",
        "answer": "si",
        "hint": "La composición jerárquica se propaga."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿FK necesita resolver un sistema inverso por definición?",
        "answer": "no",
        "hint": "Parte de parámetros locales conocidos."
      }
    ]
  },
  "anim-inverse-kinematics": {
    "id": "anim-inverse-kinematics",
    "courseId": 41,
    "title": "Inverse kinematics (IK)",
    "shortTitle": "Inverse kinematics (IK)",
    "duration": 110,
    "objective": "Resolver objetivos espaciales para cadenas articuladas y distinguir soluciones analíticas, iterativas, restricciones y alcance.",
    "summary": [
      "IK busca parámetros articulares que satisfagan un objetivo de posición/orientación; puede haber cero, una o múltiples soluciones.",
      "Un target fuera del alcance debe tratarse explícitamente mediante clamp, extensión máxima o una política del solver.",
      "Solvers como CCD y FABRIK son aproximaciones iterativas útiles; su convergencia y restricciones dependen de la cadena y parámetros."
    ],
    "concept": "IK busca parámetros articulares que satisfagan un objetivo de posición/orientación; puede haber cero, una o múltiples soluciones.",
    "rules": [
      "Declara qué DOF pueden cambiar y sus límites.",
      "Separa objetivo de posición de objetivo de orientación.",
      "Define criterio de parada por error y máximo de iteraciones."
    ],
    "deep": {
      "intro": "Resolver objetivos espaciales para cadenas articuladas y distinguir soluciones analíticas, iterativas, restricciones y alcance.",
      "sections": [
        {
          "title": "Problema inverso",
          "body": "Dado end-effector target, encuentra pose local q tal que FK(q)≈target."
        },
        {
          "title": "Alcance",
          "body": "Una cadena de segmentos tiene límites geométricos; solver no puede crear longitud."
        },
        {
          "title": "Iterativos",
          "body": "CCD rota joints sucesivamente; FABRIK reposiciona puntos hacia target/root manteniendo longitudes."
        },
        {
          "title": "Constraints",
          "body": "Joint limits y pole vectors ayudan a seleccionar soluciones plausibles entre múltiples posibilidades."
        }
      ]
    },
    "example": {
      "problem": "Brazo planar con segmentos 2 y 3. Target a distancia 6 del hombro. ¿Es alcanzable sin estirar segmentos?",
      "steps": [
        "Alcance máximo=2+3=5.",
        "6>5."
      ],
      "solution": "No."
    },
    "check": {
      "question": "¿IK puede tener múltiples poses válidas para el mismo target?",
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
          "Solo en 1D",
          false
        ]
      ],
      "feedback": "Un target fuera del alcance debe tratarse explícitamente mediante clamp, extensión máxima o una política del solver."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Segmentos 4 y 1. Alcance máximo.",
        "answer": "5",
        "hint": "Suma."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Target a distancia 7 con alcance 5. ¿Alcanzable exactamente?",
        "answer": "no",
        "hint": "Supera el alcance."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un solver iterativo debe tener criterio de parada?",
        "answer": "si",
        "hint": "Error o iteraciones máximas."
      }
    ]
  },
  "anim-blending": {
    "id": "anim-blending",
    "courseId": 41,
    "title": "Animation blending y crossfades",
    "shortTitle": "Animation blending y crossfades",
    "duration": 110,
    "objective": "Mezclar poses y entender pesos, normalización, rotaciones, desincronización temporal y artifacts de crossfade.",
    "summary": [
      "Blending mezcla valores de varias poses; para traslación/escala puede usarse interpolación afín y para rotación se necesita una mezcla apropiada de quaternions.",
      "Un crossfade suave en valores no garantiza continuidad perceptual si los clips están fuera de fase, tienen velocidades distintas o root motion incompatible.",
      "Los pesos deben tener una semántica clara: mezcla normalizada, aditiva o máscara por joint no son la misma operación."
    ],
    "concept": "Blending mezcla valores de varias poses; para traslación/escala puede usarse interpolación afín y para rotación se necesita una mezcla apropiada de quaternions.",
    "rules": [
      "No mezcles blindly poses con espacios distintos.",
      "Sincroniza fases para locomotion cíclica cuando sea necesario.",
      "Distingue blend normalizado de additive animation."
    ],
    "deep": {
      "intro": "Mezclar poses y entender pesos, normalización, rotaciones, desincronización temporal y artifacts de crossfade.",
      "sections": [
        {
          "title": "Dos poses",
          "body": "Pose=blend(A,B,w) para w∈[0,1] es el caso básico."
        },
        {
          "title": "Rotaciones",
          "body": "nlerp/slerp y esquemas multi-quaternion tienen trade-offs; no uses promedio componente a componente sin normalización/semántica."
        },
        {
          "title": "Fase",
          "body": "Walk y run pueden alinearse por eventos de contacto o tiempo normalizado para evitar foot sliding."
        },
        {
          "title": "Root motion",
          "body": "Crossfading root del clip y movimiento gameplay exige una política coherente para evitar dobles desplazamientos."
        }
      ]
    },
    "example": {
      "problem": "Blend escalar A=2, B=8, w=0.3 hacia B. Resultado.",
      "steps": [
        "(1-0.3)·2+0.3·8",
        "1.4+2.4=3.8."
      ],
      "solution": "3.8."
    },
    "check": {
      "question": "¿Un crossfade de pesos suave garantiza por sí solo ausencia de foot sliding?",
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
      "feedback": "Un crossfade suave en valores no garantiza continuidad perceptual si los clips están fuera de fase, tienen velocidades distintas o root motion incompatible."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "A=0,B=10,w=0.6. Resultado.",
        "answer": "6",
        "hint": "Lerp."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Walk y run desfasados pueden producir artifacts aunque el blend sea continuo?",
        "answer": "si",
        "hint": "La fase temporal importa."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Blend normalizado y additive animation son operaciones equivalentes?",
        "answer": "no",
        "hint": "La aditiva aplica deltas respecto a referencia."
      }
    ]
  },
  "anim-blend-spaces": {
    "id": "anim-blend-spaces",
    "courseId": 41,
    "title": "Blend spaces y parametrización de locomotion",
    "shortTitle": "Blend spaces y parametrización de locomotion",
    "duration": 110,
    "objective": "Interpolar clips mediante parámetros continuos como velocidad/dirección y entender triangulación, cobertura y sincronización.",
    "summary": [
      "Un blend space mapea parámetros de gameplay a pesos sobre clips; no decide por sí solo la física ni la intención del personaje.",
      "En 1D se mezcla entre vecinos sobre un eje; en 2D se puede interpolar dentro de triángulos o esquemas equivalentes según la implementación.",
      "La calidad depende de la cobertura del espacio, fase de clips, extrapolación/clamping y significado de los parámetros."
    ],
    "concept": "Un blend space mapea parámetros de gameplay a pesos sobre clips; no decide por sí solo la física ni la intención del personaje.",
    "rules": [
      "Usa parámetros con unidades/semántica conocidas.",
      "Alinea eventos/fase en ciclos de locomotion.",
      "Define comportamiento fuera del dominio cubierto por ejemplos."
    ],
    "deep": {
      "intro": "Interpolar clips mediante parámetros continuos como velocidad/dirección y entender triangulación, cobertura y sincronización.",
      "sections": [
        {
          "title": "1D",
          "body": "Velocidad 0→idle, 2→walk, 6→run permite interpolar vecinos en el eje speed."
        },
        {
          "title": "2D",
          "body": "Un punto (vx,vz) puede seleccionar/mezclar clips direccionales vecinos."
        },
        {
          "title": "Triangulación",
          "body": "En un triángulo, pesos baricéntricos suman 1 para interpolación afín."
        },
        {
          "title": "Limitaciones",
          "body": "Una mala distribución de samples puede generar zonas con movimientos físicamente/plásticamente incoherentes."
        }
      ]
    },
    "example": {
      "problem": "Blend 1D entre walk a 2 m/s y run a 6 m/s. Parámetro 4 m/s. Peso hacia run.",
      "steps": [
        "u=(4-2)/(6-2)=2/4=0.5."
      ],
      "solution": "0.5."
    },
    "check": {
      "question": "¿Un blend space calcula automáticamente la trayectoria física del personaje?",
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
      "feedback": "En 1D se mezcla entre vecinos sobre un eje; en 2D se puede interpolar dentro de triángulos o esquemas equivalentes según la implementación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Entre 0 y 8, parámetro 2. Peso hacia el segundo sample.",
        "answer": "0.25",
        "hint": "2/8."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Pesos baricéntricos internos de un triángulo suman 1?",
        "answer": "si",
        "hint": "Propiedad afín."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Samples mal sincronizados pueden producir foot sliding?",
        "answer": "si",
        "hint": "La parametrización no corrige fase por magia."
      }
    ]
  },
  "anim-state-machines": {
    "id": "anim-state-machines",
    "courseId": 41,
    "title": "Animation state machines y transiciones",
    "shortTitle": "Animation state machines y transiciones",
    "duration": 110,
    "objective": "Diseñar máquinas de estado de animación como lógica explícita de selección/transición sin confundirlas con toda la lógica de gameplay.",
    "summary": [
      "Una animation state machine organiza estados, transiciones y condiciones; cada estado puede contener clips o subgrafos de blend.",
      "Transición, duración de crossfade, prioridad y posibilidad de interrupción son parte de la semántica y afectan responsiveness.",
      "Una state machine de animación no debería convertirse automáticamente en la única fuente de verdad del gameplay; locomotion, combate y animación pueden requerir contratos distintos."
    ],
    "concept": "Una animation state machine organiza estados, transiciones y condiciones; cada estado puede contener clips o subgrafos de blend.",
    "rules": [
      "Evita transiciones implícitas no trazables.",
      "Define reglas de interrupción y prioridad.",
      "Separa estado lógico de gameplay de estado visual cuando sus lifetimes difieren."
    ],
    "deep": {
      "intro": "Diseñar máquinas de estado de animación como lógica explícita de selección/transición sin confundirlas con toda la lógica de gameplay.",
      "sections": [
        {
          "title": "Estados",
          "body": "Idle, locomotion, jump y attack son nodos posibles, no una taxonomía obligatoria."
        },
        {
          "title": "Transiciones",
          "body": "Guard conditions y exit times controlan cuándo puede cambiar el estado."
        },
        {
          "title": "Jerarquía",
          "body": "Sub-state machines permiten reducir explosión de conexiones, pero añaden nesting."
        },
        {
          "title": "Debug",
          "body": "Registrar estado actual, transición y parámetros facilita reproducir glitches de animación."
        }
      ]
    },
    "example": {
      "problem": "Hay 5 estados y una transición dirigida completa entre cada par distinto. ¿Cuántas transiciones posibles?",
      "steps": [
        "5·4=20 transiciones dirigidas."
      ],
      "solution": "20."
    },
    "check": {
      "question": "¿El estado de animación debe ser siempre idéntico al estado de gameplay?",
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
          "Solo en combate",
          false
        ]
      ],
      "feedback": "Transición, duración de crossfade, prioridad y posibilidad de interrupción son parte de la semántica y afectan responsiveness."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "4 estados, grafo dirigido completo sin self-loops. Transiciones.",
        "answer": "12",
        "hint": "n(n-1)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una transición puede tener duración de crossfade distinta de cero?",
        "answer": "si",
        "hint": "Es parte del blending."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un state machine elimina automáticamente la necesidad de prioridad/interrupción?",
        "answer": "no",
        "hint": "Hay que diseñarlas."
      }
    ]
  },
  "anim-root-motion": {
    "id": "anim-root-motion",
    "courseId": 41,
    "title": "Root motion y movimiento autoritativo",
    "shortTitle": "Root motion y movimiento autoritativo",
    "duration": 110,
    "objective": "Separar desplazamiento codificado en clips de movimiento gameplay/físico y diseñar una política autoritativa reproducible.",
    "summary": [
      "Root motion extrae desplazamiento/rotación de un root bone o track y lo aplica al personaje o lo compara con el controlador.",
      "Aplicar root motion y además velocity gameplay sin reconciliarlos puede duplicar movimiento o producir foot sliding.",
      "Networking, rollback y colisiones obligan a decidir qué sistema es autoritativo y cómo se reproyecta/corrige el movimiento visual."
    ],
    "concept": "Root motion extrae desplazamiento/rotación de un root bone o track y lo aplica al personaje o lo compara con el controlador.",
    "rules": [
      "Define si la simulación o el clip manda sobre la traslación global.",
      "No apliques dos veces el mismo delta root.",
      "Registra root delta por tick si debe ser reproducible/rollbackable."
    ],
    "deep": {
      "intro": "Separar desplazamiento codificado en clips de movimiento gameplay/físico y diseñar una política autoritativa reproducible.",
      "sections": [
        {
          "title": "Extracción",
          "body": "Δroot entre t0 y t1 puede convertirse en movimiento deseado del character controller."
        },
        {
          "title": "In-place",
          "body": "Clips in-place dejan desplazamiento al gameplay; clips con root motion lo contienen parcialmente."
        },
        {
          "title": "Colisión",
          "body": "El delta deseado puede ser recortado por collision/physics; la pose visual debe reconciliarse con el movimiento real."
        },
        {
          "title": "Red",
          "body": "En multiplayer, el movimiento autoritativo necesita una representación reproducible y correcciones visuales separadas."
        }
      ]
    },
    "example": {
      "problem": "Clip produce root delta de 0.6 m y controlador aplica exactamente ese delta una vez. Movimiento total.",
      "steps": [
        "Una única aplicación: 0.6 m."
      ],
      "solution": "0.6 m."
    },
    "check": {
      "question": "¿Aplicar root delta y además sumar el mismo delta como velocidad gameplay duplicaría movimiento?",
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
          "Solo en 2D",
          false
        ]
      ],
      "feedback": "Aplicar root motion y además velocity gameplay sin reconciliarlos puede duplicar movimiento o producir foot sliding."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Root delta 0.25 m por tick durante 4 ticks. Total.",
        "answer": "1",
        "hint": "0.25·4."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un character controller puede recortar un root delta por colisión?",
        "answer": "si",
        "hint": "El movimiento real debe respetar el mundo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Root motion implica que la animación deba ser la única autoridad de networking?",
        "answer": "no",
        "hint": "La política del engine decide."
      }
    ]
  },
  "anim-additive-layers": {
    "id": "anim-additive-layers",
    "courseId": 41,
    "title": "Animación aditiva, capas y máscaras",
    "shortTitle": "Animación aditiva, capas y máscaras",
    "duration": 110,
    "objective": "Combinar deltas de pose sobre una base y limitar influencia por joints/partes del cuerpo sin mezclar semánticas.",
    "summary": [
      "Una animación aditiva representa un delta respecto a una pose de referencia y se compone sobre una pose base; no es un crossfade normalizado.",
      "Masks permiten limitar qué joints reciben una capa, por ejemplo aim en torso mientras piernas mantienen locomotion.",
      "El orden de capas puede importar porque las transformaciones no conmutan en general, especialmente las rotaciones."
    ],
    "concept": "Una animación aditiva representa un delta respecto a una pose de referencia y se compone sobre una pose base; no es un crossfade normalizado.",
    "rules": [
      "Define claramente la pose de referencia de cada capa aditiva.",
      "Normaliza/compone rotaciones con el método previsto por el rig.",
      "Documenta orden y masks; no asumas conmutatividad."
    ],
    "deep": {
      "intro": "Combinar deltas de pose sobre una base y limitar influencia por joints/partes del cuerpo sin mezclar semánticas.",
      "sections": [
        {
          "title": "Additive",
          "body": "base + delta conceptual; para rotación se usa composición relativa, no suma de Euler angles como regla general."
        },
        {
          "title": "Mask",
          "body": "Un peso por joint controla influencia de una capa."
        },
        {
          "title": "Orden",
          "body": "Aplicar recoil después de aim puede diferir de aim después de recoil."
        },
        {
          "title": "Uso",
          "body": "Upper-body overlays permiten acciones simultáneas sin duplicar todos los clips de locomotion."
        }
      ]
    },
    "example": {
      "problem": "Base escalar 10, delta aditivo +3 con peso 0.5. Resultado conceptual.",
      "steps": [
        "10 + 0.5·3 = 11.5."
      ],
      "solution": "11.5."
    },
    "check": {
      "question": "¿Una capa aditiva es equivalente a un crossfade 50/50 entre dos poses?",
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
          "Solo con Euler",
          false
        ]
      ],
      "feedback": "Masks permiten limitar qué joints reciben una capa, por ejemplo aim en torso mientras piernas mantienen locomotion."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Base 4, delta +2, peso 0.25. Resultado.",
        "answer": "4.5",
        "hint": "4+0.25·2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una mask puede dar peso 0 a las piernas y 1 al torso?",
        "answer": "si",
        "hint": "Es un uso típico."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El orden de dos capas rotacionales es siempre irrelevante?",
        "answer": "no",
        "hint": "Las rotaciones no conmutan en general."
      }
    ]
  },
  "anim-retargeting-compression": {
    "id": "anim-retargeting-compression",
    "courseId": 41,
    "title": "Retargeting, compresión y precisión",
    "shortTitle": "Retargeting, compresión y precisión",
    "duration": 110,
    "objective": "Mover animaciones entre rigs compatibles y reducir tamaño/ancho de banda sin confundir equivalencia semántica con igualdad de skeletons.",
    "summary": [
      "Retargeting mapea movimiento entre skeletons con proporciones, rest poses o convenciones distintas; nombres iguales de bones no garantizan compatibilidad geométrica.",
      "Compresión de animación explota redundancia temporal/espacial mediante reducción de keys, cuantización y codificación; introduce error que debe medirse en pose o pantalla.",
      "La tolerancia adecuada depende del joint, distancia a cámara, uso gameplay y cadena jerárquica: un pequeño error en un ancestro puede amplificarse en el end-effector."
    ],
    "concept": "Retargeting mapea movimiento entre skeletons con proporciones, rest poses o convenciones distintas; nombres iguales de bones no garantizan compatibilidad geométrica.",
    "rules": [
      "Valida retargeting con poses y movimientos, no solo nombres.",
      "Mide error angular/posicional tras compresión.",
      "No uses una tolerancia única sin considerar importancia y jerarquía."
    ],
    "deep": {
      "intro": "Mover animaciones entre rigs compatibles y reducir tamaño/ancho de banda sin confundir equivalencia semántica con igualdad de skeletons.",
      "sections": [
        {
          "title": "Retargeting",
          "body": "Puede mapear hips/spine/limbs entre rigs, corrigiendo rest pose y escala según una convención del pipeline."
        },
        {
          "title": "Key reduction",
          "body": "Elimina keys cuya reconstrucción queda dentro de una tolerancia."
        },
        {
          "title": "Quantization",
          "body": "Reduce bits de valores/tangentes; error debe propagarse y medirse."
        },
        {
          "title": "Streaming",
          "body": "Clips grandes pueden cargarse/decodificarse por bloques; CPU, memoria y latencia forman parte del presupuesto."
        }
      ]
    },
    "example": {
      "problem": "Clip ocupa 12 MiB y compresión lo deja en 3 MiB. Ratio original/comprimido.",
      "steps": [
        "12/3=4."
      ],
      "solution": "4×."
    },
    "check": {
      "question": "¿Mismos nombres de bones garantizan retargeting correcto?",
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
          "Solo en humanoides",
          false
        ]
      ],
      "feedback": "Compresión de animación explota redundancia temporal/espacial mediante reducción de keys, cuantización y codificación; introduce error que debe medirse en pose o pantalla."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "10 MiB→2 MiB. Ratio.",
        "answer": "5",
        "hint": "10/2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un error pequeño en shoulder puede afectar posición de hand?",
        "answer": "si",
        "hint": "Se propaga por la cadena."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La compresión de animación debe evaluarse solo por bytes y nunca por error visual?",
        "answer": "no",
        "hint": "Hay trade-off tamaño/calidad."
      }
    ]
  },
  "anim-integration-engine": {
    "id": "anim-integration-engine",
    "courseId": 41,
    "title": "Pipeline de animación, jobs y proyecto integrador",
    "shortTitle": "Pipeline de animación, jobs y proyecto integrador",
    "duration": 110,
    "objective": "Integrar clips, graphs, FK/IK, skinning, events y render extraction con ownership temporal, paralelismo y métricas reproducibles.",
    "summary": [
      "Un frame de animación robusto separa selección/blending de pose, FK/IK, events, root motion, skinning data y consumo por render/physics.",
      "Paralelizar por personaje o por etapas requiere declarar dependencias; skinning GPU puede mover coste del CPU al GPU sin eliminar ancho de banda ni sincronización.",
      "La calidad del sistema se mide por pose correctness, latencia, tiempo CPU/GPU, memoria y estabilidad temporal, no solo por número de personajes animados."
    ],
    "concept": "Un frame de animación robusto separa selección/blending de pose, FK/IK, events, root motion, skinning data y consumo por render/physics.",
    "rules": [
      "Define una única pose authoritativa por etapa y usa buffers/snapshots si hay threads.",
      "Dispara eventos según cruces temporales reproducibles, incluyendo loops/seeks.",
      "Perfila evaluación de graph, IK, FK, upload y skinning por separado."
    ],
    "deep": {
      "intro": "Integrar clips, graphs, FK/IK, skinning, events y render extraction con ownership temporal, paralelismo y métricas reproducibles.",
      "sections": [
        {
          "title": "Pipeline",
          "body": "sample clips→blend graph→apply additive→IK→global pose→events/root delta→skinning matrices→render."
        },
        {
          "title": "Jobs",
          "body": "Personajes independientes pueden evaluarse en paralelo si comparten assets read-only y escriben buffers separados."
        },
        {
          "title": "GPU skinning",
          "body": "Envía palette/pose y deja deformación al vertex/compute stage; evalúa coste de upload, cache y vertex throughput."
        },
        {
          "title": "Proyecto",
          "body": "Construye un character con locomotion blend space, state machine, upper-body layer, IK de pies/manos, root-motion policy, debug UI y métricas."
        }
      ]
    },
    "example": {
      "problem": "100 personajes cuestan 0.06 ms cada uno en CPU si fueran perfectamente seriales. Coste total.",
      "steps": [
        "100·0.06=6 ms."
      ],
      "solution": "6 ms."
    },
    "check": {
      "question": "¿Mover skinning a GPU elimina por definición todo coste de animación en CPU?",
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
          "Solo con Vulkan",
          false
        ]
      ],
      "feedback": "Paralelizar por personaje o por etapas requiere declarar dependencias; skinning GPU puede mover coste del CPU al GPU sin eliminar ancho de banda ni sincronización."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "250 personajes × 0.02 ms seriales. Total ms.",
        "answer": "5",
        "hint": "Multiplica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Dos jobs pueden escribir el mismo pose buffer sin sincronización/partición?",
        "answer": "no",
        "hint": "Hay hazard de escritura."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El profiler debe separar graph evaluation e IK si quieres optimizar con evidencia?",
        "answer": "si",
        "hint": "Mide etapas por separado."
      }
    ]
  },
  "anim-events-sync": {
    "id": "anim-events-sync",
    "courseId": 41,
    "title": "Sincronización temporal, markers y eventos",
    "shortTitle": "Sincronización temporal, markers y eventos",
    "duration": 110,
    "objective": "Diseñar markers y eventos de animación reproducibles a través de loops, seeks, blends y cambios de playback rate.",
    "summary": [
      "Animation events son señales discretas asociadas al tiempo del clip; deben dispararse al cruzar intervalos, no al coincidir exactamente con un timestamp de frame.",
      "Loops, seeks y playback inverso obligan a definir si un marker se dispara, se omite o se repite; sin contrato aparecen dobles footsteps o eventos perdidos.",
      "Sync markers ayudan a alinear fases semánticas —por ejemplo contacto de pie— entre clips de distinta duración durante blending."
    ],
    "concept": "Animation events son señales discretas asociadas al tiempo del clip; deben dispararse al cruzar intervalos, no al coincidir exactamente con un timestamp de frame.",
    "rules": [
      "Dispara eventos por cruce de intervalo temporal, no igualdad float exacta.",
      "Define semántica para loop, seek, reverse y teleport de tiempo.",
      "Separa markers de sincronización de efectos de gameplay irreversibles cuando rollback sea posible."
    ],
    "deep": {
      "intro": "Diseñar markers y eventos de animación reproducibles a través de loops, seeks, blends y cambios de playback rate.",
      "sections": [
        {
          "title": "Cruce temporal",
          "body": "Si avanzas de 0.10 a 0.18 y hay marker en 0.15, debe detectarse aunque ningún frame evalúe exactamente 0.15."
        },
        {
          "title": "Loops",
          "body": "Al cruzar final→inicio, el intervalo temporal se divide y deben considerarse markers de ambos tramos."
        },
        {
          "title": "Sync markers",
          "body": "Walk/run pueden alinear heel-strike/toe-off para mezclar fases equivalentes."
        },
        {
          "title": "Rollback",
          "body": "Efectos irreversibles requieren IDs/deduplicación o una capa de eventos confirmados para no repetirse al resimular."
        }
      ]
    },
    "example": {
      "problem": "Tiempo avanza de 0.40 a 0.55 y existe marker en 0.50. ¿Se cruza?",
      "steps": [
        "0.50 pertenece al intervalo recorrido."
      ],
      "solution": "Sí."
    },
    "check": {
      "question": "¿Conviene depender de igualdad exacta t==markerTime para disparar eventos?",
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
      "feedback": "Loops, seeks y playback inverso obligan a definir si un marker se dispara, se omite o se repite; sin contrato aparecen dobles footsteps o eventos perdidos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Avanza 0.1→0.3 con marker 0.2. ¿Se cruza?",
        "answer": "si",
        "hint": "Está dentro del intervalo."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un loop puede cruzar markers al final y al inicio del clip en un mismo step?",
        "answer": "si",
        "hint": "Divide el intervalo alrededor del wrap."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Los eventos irreversibles deben repetirse ciegamente durante rollback?",
        "answer": "no",
        "hint": "Necesitan política de confirmación/deduplicación."
      }
    ]
  }
});
