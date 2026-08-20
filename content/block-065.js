/**
 * BLOQUE 065 — REINFORCEMENT LEARNING
 *
 * Regla editorial: reward no es objetivo humano por definición y una mejora
 * de training return no demuestra generalización, seguridad ni estabilidad.
 */
window.LEARNING_PATHS[65] = {
  "level": "Reinforcement Learning",
  "estimatedHours": 175,
  "description": "Aprendizaje por interacción: MDP, políticas y valores, Bellman, exploración, Q-learning, policy gradients, actor-critic y evaluación reproducible.",
  "outcomes": [
    "Formalizar un problema RL distinguiendo agente, entorno, observación/estado, acción, reward y return.",
    "Derivar value functions y Bellman, e implementar control tabular con Q-learning.",
    "Explicar policy gradients y actor-critic incluyendo bias/variance y on/off-policy.",
    "Construir y evaluar un agente reproducible con múltiples seeds, métricas y análisis de reward hacking/fallos."
  ],
  "modules": [
    {
      "id": "m1-mdp",
      "title": "Interacción y MDP",
      "description": "Agente, entorno, estado, acciones, recompensas y retorno.",
      "lessons": [
        "rl-agent-environment",
        "rl-state-observation",
        "rl-actions-rewards",
        "rl-returns-discount"
      ]
    },
    {
      "id": "m2-policy-value",
      "title": "Políticas y valor",
      "description": "Policies, value functions, Bellman y exploración.",
      "lessons": [
        "rl-policy",
        "rl-value-functions",
        "rl-bellman",
        "rl-exploration"
      ]
    },
    {
      "id": "m3-control",
      "title": "Control y aprendizaje profundo",
      "description": "Q-learning, aproximación de funciones, policy gradients y actor-critic.",
      "lessons": [
        "rl-q-learning",
        "rl-deep-q",
        "rl-policy-gradients",
        "rl-actor-critic"
      ]
    },
    {
      "id": "m4-engineering",
      "title": "Evaluación y proyecto",
      "description": "Estabilidad, reproducibilidad y sistema RL completo.",
      "lessons": [
        "rl-evaluation-stability",
        "rl-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "rl-agent-environment": {
    "id": "rl-agent-environment",
    "courseId": 65,
    "title": "Agente y entorno",
    "shortTitle": "Interacción",
    "duration": 120,
    "objective": "Modelar reinforcement learning como un bucle de interacción y distinguir agente, entorno y frontera de control.",
    "summary": [
      "El agente selecciona acciones; el entorno produce observaciones/estados, recompensas y transiciones según su dinámica.",
      "La frontera agente-entorno es una decisión de modelado: lo que queda fuera del agente forma parte del entorno, aunque sea software propio.",
      "Una trayectoria registra la secuencia de interacción; evalúa episodios completos y no solo recompensas instantáneas."
    ],
    "concept": "El bucle agente→acción→entorno→transición/recompensa define la interfaz del problema; no implica que el agente controle la dinámica.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Modelar reinforcement learning como un bucle de interacción y distinguir agente, entorno y frontera de control.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El agente selecciona acciones; el entorno produce observaciones/estados, recompensas y transiciones según su dinámica."
        },
        {
          "title": "Mecánica y límites",
          "body": "La frontera agente-entorno es una decisión de modelado: lo que queda fuera del agente forma parte del entorno, aunque sea software propio."
        },
        {
          "title": "Ingeniería",
          "body": "Una trayectoria registra la secuencia de interacción; evalúa episodios completos y no solo recompensas instantáneas."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Un episodio tiene 240 pasos y cada paso dura 50 ms. Duración total en segundos.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "12"
    },
    "check": {
      "question": "¿El agente controla necesariamente la transición siguiente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "El bucle agente→acción→entorno→transición/recompensa define la interfaz del problema; no implica que el agente controle la dinámica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un episodio tiene 240 pasos y cada paso dura 50 ms. Duración total en segundos.",
        "answer": "12",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El agente controla necesariamente la transición siguiente?",
        "answer": "no",
        "hint": "Separar la política del agente de la dinámica del entorno."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-state-observation": {
    "id": "rl-state-observation",
    "courseId": 65,
    "title": "Estado, observación y propiedad de Markov",
    "shortTitle": "Estado",
    "duration": 125,
    "objective": "Distinguir estado del entorno, observación del agente y representación suficiente para decisiones Markovianas.",
    "summary": [
      "Un estado Markoviano contiene la información relevante para que el futuro dependa del presente y la acción, no del historial completo.",
      "La observación disponible puede ser parcial; entonces el agente puede necesitar memoria o belief state.",
      "Agregar historial puede mejorar información pero también coste, dimensionalidad y dificultad de aprendizaje."
    ],
    "concept": "Estado ≠ observación: una observación parcial puede ocultar variables que afectan transiciones o recompensas.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Distinguir estado del entorno, observación del agente y representación suficiente para decisiones Markovianas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un estado Markoviano contiene la información relevante para que el futuro dependa del presente y la acción, no del historial completo."
        },
        {
          "title": "Mecánica y límites",
          "body": "La observación disponible puede ser parcial; entonces el agente puede necesitar memoria o belief state."
        },
        {
          "title": "Ingeniería",
          "body": "Agregar historial puede mejorar información pero también coste, dimensionalidad y dificultad de aprendizaje."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Un vector apila 4 observaciones de 84×84 píxeles escala de grises. Número de valores.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "28224"
    },
    "check": {
      "question": "¿Estado y observación son siempre idénticos?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "Estado ≠ observación: una observación parcial puede ocultar variables que afectan transiciones o recompensas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un vector apila 4 observaciones de 84×84 píxeles escala de grises. Número de valores.",
        "answer": "28224",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Estado y observación son siempre idénticos?",
        "answer": "no",
        "hint": "Distingue información real del entorno de lo que el agente puede observar."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-actions-rewards": {
    "id": "rl-actions-rewards",
    "courseId": 65,
    "title": "Acciones, transiciones y recompensa",
    "shortTitle": "Acción y recompensa",
    "duration": 125,
    "objective": "Diseñar espacios de acción y señales de recompensa sin confundir objetivo deseado con proxy local.",
    "summary": [
      "Acciones pueden ser discretas, continuas, híbridas o parametrizadas; su semántica determina qué política es viable.",
      "Reward define la señal local de aprendizaje, mientras el objetivo suele ser retorno acumulado; maximizar reward inmediato puede ser miope.",
      "Reward shaping puede acelerar aprendizaje pero cambiar incentivos o introducir reward hacking si altera mal el objetivo."
    ],
    "concept": "La recompensa es una señal escalar del problema; no equivale automáticamente a seguridad, utilidad humana ni éxito a largo plazo.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Diseñar espacios de acción y señales de recompensa sin confundir objetivo deseado con proxy local.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Acciones pueden ser discretas, continuas, híbridas o parametrizadas; su semántica determina qué política es viable."
        },
        {
          "title": "Mecánica y límites",
          "body": "Reward define la señal local de aprendizaje, mientras el objetivo suele ser retorno acumulado; maximizar reward inmediato puede ser miope."
        },
        {
          "title": "Ingeniería",
          "body": "Reward shaping puede acelerar aprendizaje pero cambiar incentivos o introducir reward hacking si altera mal el objetivo."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Recompensas de un episodio: 2,-1,3,0,4. Suma no descontada.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "8"
    },
    "check": {
      "question": "¿Maximizar recompensa inmediata garantiza maximizar retorno futuro?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "La recompensa es una señal escalar del problema; no equivale automáticamente a seguridad, utilidad humana ni éxito a largo plazo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Recompensas de un episodio: 2,-1,3,0,4. Suma no descontada.",
        "answer": "8",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Maximizar recompensa inmediata garantiza maximizar retorno futuro?",
        "answer": "no",
        "hint": "Piensa en recompensas retrasadas y consecuencias de acciones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-returns-discount": {
    "id": "rl-returns-discount",
    "courseId": 65,
    "title": "Retorno, episodios y descuento",
    "shortTitle": "Retorno",
    "duration": 125,
    "objective": "Calcular returns y entender descuento, horizonte y diferencia entre tareas episódicas y continuas.",
    "summary": [
      "El retorno G_t agrega recompensas futuras; con descuento, G_t=R_{t+1}+γR_{t+2}+γ²R_{t+3}+…",
      "γ pequeño prioriza consecuencias cercanas; γ próximo a 1 amplía el horizonte efectivo, sin convertir todos los problemas en equivalentes.",
      "En tareas episódicas la terminación corta el retorno; truncation por límite de tiempo puede requerir tratamiento diferente a un terminal semántico."
    ],
    "concept": "Reward es la señal de un paso; return es la acumulación futura que una policy intenta optimizar.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Calcular returns y entender descuento, horizonte y diferencia entre tareas episódicas y continuas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El retorno G_t agrega recompensas futuras; con descuento, G_t=R_{t+1}+γR_{t+2}+γ²R_{t+3}+…"
        },
        {
          "title": "Mecánica y límites",
          "body": "γ pequeño prioriza consecuencias cercanas; γ próximo a 1 amplía el horizonte efectivo, sin convertir todos los problemas en equivalentes."
        },
        {
          "title": "Ingeniería",
          "body": "En tareas episódicas la terminación corta el retorno; truncation por límite de tiempo puede requerir tratamiento diferente a un terminal semántico."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "R1=1,R2=2,R3=4 y gamma=0.5. Return desde el inicio.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "3"
    },
    "check": {
      "question": "¿Reward y return son la misma magnitud?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "Reward es la señal de un paso; return es la acumulación futura que una policy intenta optimizar."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "R1=1,R2=2,R3=4 y gamma=0.5. Return desde el inicio.",
        "answer": "3",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Reward y return son la misma magnitud?",
        "answer": "no",
        "hint": "El retorno agrega recompensas futuras, posiblemente descontadas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-policy": {
    "id": "rl-policy",
    "courseId": 65,
    "title": "Políticas y distribución de acciones",
    "shortTitle": "Policy",
    "duration": 125,
    "objective": "Representar políticas deterministas/estocásticas y separar comportamiento de evaluación y dinámica.",
    "summary": [
      "Una política π(a|s) define una distribución de acciones condicionada al estado/observación.",
      "Política determinista es un caso particular; una política estocástica puede representar exploración o incertidumbre.",
      "La calidad de una policy depende de la distribución de estados que induce, no solo de una acción aislada."
    ],
    "concept": "La policy decide acciones; no es la función de valor ni el modelo de transición.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Representar políticas deterministas/estocásticas y separar comportamiento de evaluación y dinámica.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una política π(a|s) define una distribución de acciones condicionada al estado/observación."
        },
        {
          "title": "Mecánica y límites",
          "body": "Política determinista es un caso particular; una política estocástica puede representar exploración o incertidumbre."
        },
        {
          "title": "Ingeniería",
          "body": "La calidad de una policy depende de la distribución de estados que induce, no solo de una acción aislada."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Policy asigna probabilidades 0.1,0.2,0.7 a tres acciones. Probabilidad total.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "1"
    },
    "check": {
      "question": "¿Una policy tiene que ser determinista?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "La policy decide acciones; no es la función de valor ni el modelo de transición."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Policy asigna probabilidades 0.1,0.2,0.7 a tres acciones. Probabilidad total.",
        "answer": "1",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una policy tiene que ser determinista?",
        "answer": "no",
        "hint": "Una política puede devolver una distribución sobre acciones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-value-functions": {
    "id": "rl-value-functions",
    "courseId": 65,
    "title": "Value functions: V y Q",
    "shortTitle": "Value functions",
    "duration": 130,
    "objective": "Distinguir Vπ(s), Qπ(s,a), retorno observado y estimaciones aprendidas.",
    "summary": [
      "Vπ(s) es el retorno esperado desde s siguiendo π; Qπ(s,a) condiciona además la primera acción.",
      "Value function es una expectativa bajo una policy y dinámica, no una recompensa inmediata ni una garantía de trayectoria.",
      "Advantage Aπ(s,a)=Qπ(s,a)-Vπ(s) compara una acción con el baseline del estado."
    ],
    "concept": "V y Q resumen retornos esperados bajo una policy; son estimaciones de futuro, no contadores de recompensa pasada.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Distinguir Vπ(s), Qπ(s,a), retorno observado y estimaciones aprendidas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Vπ(s) es el retorno esperado desde s siguiendo π; Qπ(s,a) condiciona además la primera acción."
        },
        {
          "title": "Mecánica y límites",
          "body": "Value function es una expectativa bajo una policy y dinámica, no una recompensa inmediata ni una garantía de trayectoria."
        },
        {
          "title": "Ingeniería",
          "body": "Advantage Aπ(s,a)=Qπ(s,a)-Vπ(s) compara una acción con el baseline del estado."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Q(s,a)=7.5 y V(s)=5.0. Advantage.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "2.5"
    },
    "check": {
      "question": "¿Q(s,a) es simplemente la recompensa inmediata de a?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "V y Q resumen retornos esperados bajo una policy; son estimaciones de futuro, no contadores de recompensa pasada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Q(s,a)=7.5 y V(s)=5.0. Advantage.",
        "answer": "2.5",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Q(s,a) es simplemente la recompensa inmediata de a?",
        "answer": "no",
        "hint": "Q incorpora retorno futuro esperado después de la acción."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-bellman": {
    "id": "rl-bellman",
    "courseId": 65,
    "title": "Ecuaciones de Bellman",
    "shortTitle": "Bellman",
    "duration": 135,
    "objective": "Derivar Bellman expectation/optimality y entenderlas como relaciones recursivas, no algoritmos por sí solas.",
    "summary": [
      "Bellman descompone valor en recompensa inmediata más valor descontado del futuro.",
      "Para una policy fija aparece una expectativa sobre acciones/transiciones; para optimalidad aparece max sobre acciones en la forma clásica.",
      "Una ecuación de Bellman define una relación/fixed point; resolverla puede hacerse por dynamic programming, TD u otros métodos."
    ],
    "concept": "Bellman conecta valor presente y futuro; Bellman equation ≠ Q-learning.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Derivar Bellman expectation/optimality y entenderlas como relaciones recursivas, no algoritmos por sí solas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Bellman descompone valor en recompensa inmediata más valor descontado del futuro."
        },
        {
          "title": "Mecánica y límites",
          "body": "Para una policy fija aparece una expectativa sobre acciones/transiciones; para optimalidad aparece max sobre acciones en la forma clásica."
        },
        {
          "title": "Ingeniería",
          "body": "Una ecuación de Bellman define una relación/fixed point; resolverla puede hacerse por dynamic programming, TD u otros métodos."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Reward=2, gamma=.9 y V(next)=5. Target de un paso sin terminal.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "6.5"
    },
    "check": {
      "question": "¿Una ecuación de Bellman es por sí sola un algoritmo de aprendizaje?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "Bellman conecta valor presente y futuro; Bellman equation ≠ Q-learning."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Reward=2, gamma=.9 y V(next)=5. Target de un paso sin terminal.",
        "answer": "6.5",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una ecuación de Bellman es por sí sola un algoritmo de aprendizaje?",
        "answer": "no",
        "hint": "Es una relación recursiva; el método numérico/algoritmo es otra capa."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-exploration": {
    "id": "rl-exploration",
    "courseId": 65,
    "title": "Exploration vs exploitation",
    "shortTitle": "Exploración",
    "duration": 125,
    "objective": "Analizar exploración/explotación, cobertura de estados y el coste de recopilar experiencia.",
    "summary": [
      "Exploitation elige acciones actualmente prometedoras; exploration recopila información que puede mejorar decisiones futuras.",
      "ε-greedy no es la única estrategia y su epsilon necesita interpretación junto al número de acciones y schedule.",
      "Exploración segura puede requerir restricciones: visitar estados informativos no justifica aceptar riesgos arbitrarios."
    ],
    "concept": "Exploration es una estrategia de adquisición de información; no equivale a ruido aleatorio sin límites.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Analizar exploración/explotación, cobertura de estados y el coste de recopilar experiencia.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Exploitation elige acciones actualmente prometedoras; exploration recopila información que puede mejorar decisiones futuras."
        },
        {
          "title": "Mecánica y límites",
          "body": "ε-greedy no es la única estrategia y su epsilon necesita interpretación junto al número de acciones y schedule."
        },
        {
          "title": "Ingeniería",
          "body": "Exploración segura puede requerir restricciones: visitar estados informativos no justifica aceptar riesgos arbitrarios."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Con epsilon=0.2 durante 500 decisiones, exploraciones esperadas bajo Bernoulli simple.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "100"
    },
    "check": {
      "question": "¿Exploration significa elegir siempre una acción aleatoria?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "Exploration es una estrategia de adquisición de información; no equivale a ruido aleatorio sin límites."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Con epsilon=0.2 durante 500 decisiones, exploraciones esperadas bajo Bernoulli simple.",
        "answer": "100",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Exploration significa elegir siempre una acción aleatoria?",
        "answer": "no",
        "hint": "Existen políticas de exploración estructuradas y explotación parcial."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-q-learning": {
    "id": "rl-q-learning",
    "courseId": 65,
    "title": "Q-learning y TD control",
    "shortTitle": "Q-learning",
    "duration": 140,
    "objective": "Derivar la actualización Q-learning, distinguir target/bootstrap y entender su naturaleza off-policy.",
    "summary": [
      "Q-learning usa el target r+γ max_a Q(s',a) para transiciones no terminales y actualiza hacia ese target con paso α.",
      "Es off-policy: el comportamiento que genera datos puede incluir exploración mientras el target usa la acción greedy del valor actual.",
      "Las garantías tabulares clásicas requieren supuestos fuertes de visitas y stepsizes; no se trasladan automáticamente a redes profundas."
    ],
    "concept": "Q-learning combina temporal-difference learning, bootstrapping y un target greedy; no es equivalente a Monte Carlo ni a policy gradient.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Derivar la actualización Q-learning, distinguir target/bootstrap y entender su naturaleza off-policy.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Q-learning usa el target r+γ max_a Q(s',a) para transiciones no terminales y actualiza hacia ese target con paso α."
        },
        {
          "title": "Mecánica y límites",
          "body": "Es off-policy: el comportamiento que genera datos puede incluir exploración mientras el target usa la acción greedy del valor actual."
        },
        {
          "title": "Ingeniería",
          "body": "Las garantías tabulares clásicas requieren supuestos fuertes de visitas y stepsizes; no se trasladan automáticamente a redes profundas."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Q=4, reward=1, gamma=.9, maxQnext=6, alpha=.5. Nuevo Q.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "5.7"
    },
    "check": {
      "question": "¿Q-learning tabular clásico es on-policy?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "Q-learning combina temporal-difference learning, bootstrapping y un target greedy; no es equivalente a Monte Carlo ni a policy gradient."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Q=4, reward=1, gamma=.9, maxQnext=6, alpha=.5. Nuevo Q.",
        "answer": "5.7",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Q-learning tabular clásico es on-policy?",
        "answer": "no",
        "hint": "El target usa max sobre acciones aunque el comportamiento pueda explorar."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-deep-q": {
    "id": "rl-deep-q",
    "courseId": 65,
    "title": "Aproximación de funciones y Deep Q-learning",
    "shortTitle": "Deep Q",
    "duration": 140,
    "objective": "Entender qué cambia al sustituir tablas por funciones aproximadoras y por qué replay/target networks ayudan sin dar garantías universales.",
    "summary": [
      "Con espacios grandes, Q(s,a;θ) comparte parámetros entre estados y puede generalizar, pero introduce interacción entre actualizaciones.",
      "Replay rompe correlaciones temporales y reutiliza experiencia; una target network desacopla parcialmente target y red online.",
      "Bootstrapping + off-policy + function approximation puede ser inestable; clipping, normalización o target networks son técnicas, no pruebas de convergencia."
    ],
    "concept": "DQN aproxima Q con una red; eso cambia el problema de optimización y estabilidad respecto al caso tabular.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Entender qué cambia al sustituir tablas por funciones aproximadoras y por qué replay/target networks ayudan sin dar garantías universales.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Con espacios grandes, Q(s,a;θ) comparte parámetros entre estados y puede generalizar, pero introduce interacción entre actualizaciones."
        },
        {
          "title": "Mecánica y límites",
          "body": "Replay rompe correlaciones temporales y reutiliza experiencia; una target network desacopla parcialmente target y red online."
        },
        {
          "title": "Ingeniería",
          "body": "Bootstrapping + off-policy + function approximation puede ser inestable; clipping, normalización o target networks son técnicas, no pruebas de convergencia."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Replay buffer tiene 120000 transiciones y batch 64. Porcentaje del buffer muestreado en un batch sin reemplazo.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "0.05333333333333334"
    },
    "check": {
      "question": "¿Las garantías tabulares de Q-learning se transfieren automáticamente a DQN?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "DQN aproxima Q con una red; eso cambia el problema de optimización y estabilidad respecto al caso tabular."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Replay buffer tiene 120000 transiciones y batch 64. Porcentaje del buffer muestreado en un batch sin reemplazo.",
        "answer": "0.05333333333333334",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Las garantías tabulares de Q-learning se transfieren automáticamente a DQN?",
        "answer": "no",
        "hint": "La función aproximadora y el bootstrapping cambian las garantías."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-policy-gradients": {
    "id": "rl-policy-gradients",
    "courseId": 65,
    "title": "Policy gradients",
    "shortTitle": "Policy gradients",
    "duration": 140,
    "objective": "Optimizar políticas parametrizadas directamente y razonar sobre retorno, log-probabilities, variance y baselines.",
    "summary": [
      "Policy gradient ajusta θ para aumentar retorno esperado mediante gradientes de log π(a|s) ponderados por una señal de retorno/advantage.",
      "Un baseline independiente de la acción puede reducir variance sin cambiar el gradiente esperado bajo condiciones estándar.",
      "On-policy sampling limita reutilización directa de datos viejos cuando la distribución de comportamiento ya no coincide con la policy objetivo."
    ],
    "concept": "Policy gradient optimiza parámetros de la policy directamente; no necesita construir una Q-table, aunque puede usar un critic.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Optimizar políticas parametrizadas directamente y razonar sobre retorno, log-probabilities, variance y baselines.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Policy gradient ajusta θ para aumentar retorno esperado mediante gradientes de log π(a|s) ponderados por una señal de retorno/advantage."
        },
        {
          "title": "Mecánica y límites",
          "body": "Un baseline independiente de la acción puede reducir variance sin cambiar el gradiente esperado bajo condiciones estándar."
        },
        {
          "title": "Ingeniería",
          "body": "On-policy sampling limita reutilización directa de datos viejos cuando la distribución de comportamiento ya no coincide con la policy objetivo."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Grad log-prob=0.4, advantage=3, learning-rate=.01. Magnitud del incremento escalar simplificado.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "0.012"
    },
    "check": {
      "question": "¿Un baseline apropiado puede reducir variance del policy gradient?",
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
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "Policy gradient optimiza parámetros de la policy directamente; no necesita construir una Q-table, aunque puede usar un critic."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Grad log-prob=0.4, advantage=3, learning-rate=.01. Magnitud del incremento escalar simplificado.",
        "answer": "0.012",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un baseline apropiado puede reducir variance del policy gradient?",
        "answer": "si",
        "hint": "El baseline centra la señal sin cambiar la expectativa bajo los supuestos apropiados."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-actor-critic": {
    "id": "rl-actor-critic",
    "courseId": 65,
    "title": "Actor-critic y advantage",
    "shortTitle": "Actor-critic",
    "duration": 145,
    "objective": "Separar actor y critic, construir advantages y entender bias/variance en bootstrapped policy optimization.",
    "summary": [
      "El actor representa/mejora la policy; el critic estima value/Q/advantage para guiar la actualización.",
      "Actor-critic mezcla policy optimization con bootstrapped value estimation, intercambiando variance y bias.",
      "El critic puede estar equivocado: una estimación de valor sesgada puede degradar la señal del actor."
    ],
    "concept": "Actor ≠ critic: uno decide/mejora acciones y el otro estima retorno/advantage; pueden compartir backbone sin convertirse en la misma función.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Separar actor y critic, construir advantages y entender bias/variance en bootstrapped policy optimization.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El actor representa/mejora la policy; el critic estima value/Q/advantage para guiar la actualización."
        },
        {
          "title": "Mecánica y límites",
          "body": "Actor-critic mezcla policy optimization con bootstrapped value estimation, intercambiando variance y bias."
        },
        {
          "title": "Ingeniería",
          "body": "El critic puede estar equivocado: una estimación de valor sesgada puede degradar la señal del actor."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Return estimado 8 y baseline V=5.5. Advantage simple.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "2.5"
    },
    "check": {
      "question": "¿Compartir capas hace que actor y critic sean conceptualmente la misma salida?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "Actor ≠ critic: uno decide/mejora acciones y el otro estima retorno/advantage; pueden compartir backbone sin convertirse en la misma función."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Return estimado 8 y baseline V=5.5. Advantage simple.",
        "answer": "2.5",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Compartir capas hace que actor y critic sean conceptualmente la misma salida?",
        "answer": "no",
        "hint": "Las cabezas y objetivos cumplen papeles distintos aunque compartan representación."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-evaluation-stability": {
    "id": "rl-evaluation-stability",
    "courseId": 65,
    "title": "Evaluación, on/off-policy y estabilidad",
    "shortTitle": "Evaluación",
    "duration": 135,
    "objective": "Diseñar evaluaciones de RL que separen entrenamiento, exploración, seeds, sample efficiency, estabilidad y seguridad.",
    "summary": [
      "Una curva de reward de una sola seed no caracteriza la distribución del algoritmo; RL puede tener alta variance entre ejecuciones.",
      "Training return con exploración y evaluation return con policy controlada son métricas distintas.",
      "Sample efficiency, wall-clock, asymptotic return y robustness son ejes diferentes; mejora en uno no implica mejora en todos."
    ],
    "concept": "Evaluar RL exige declarar protocolo, seeds y distribución de entornos; mejor media no implica automáticamente comportamiento robusto.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Diseñar evaluaciones de RL que separen entrenamiento, exploración, seeds, sample efficiency, estabilidad y seguridad.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una curva de reward de una sola seed no caracteriza la distribución del algoritmo; RL puede tener alta variance entre ejecuciones."
        },
        {
          "title": "Mecánica y límites",
          "body": "Training return con exploración y evaluation return con policy controlada son métricas distintas."
        },
        {
          "title": "Ingeniería",
          "body": "Sample efficiency, wall-clock, asymptotic return y robustness son ejes diferentes; mejora en uno no implica mejora en todos."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "Returns de 4 seeds: 80,100,120,100. Media.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "100"
    },
    "check": {
      "question": "¿Una sola seed basta para afirmar estabilidad de un algoritmo RL?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "Evaluar RL exige declarar protocolo, seeds y distribución de entornos; mejor media no implica automáticamente comportamiento robusto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Returns de 4 seeds: 80,100,120,100. Media.",
        "answer": "100",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una sola seed basta para afirmar estabilidad de un algoritmo RL?",
        "answer": "no",
        "hint": "La variabilidad entre seeds puede ser material."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  },
  "rl-integration": {
    "id": "rl-integration",
    "courseId": 65,
    "title": "Proyecto: agente RL reproducible",
    "shortTitle": "Proyecto RL",
    "duration": 180,
    "objective": "Integrar MDP, policy, value learning, evaluación y observabilidad en un agente pequeño reproducible.",
    "summary": [
      "Define primero estado/observación, acciones, transiciones, reward y criterio de terminación; después selecciona algoritmo.",
      "Implementa un baseline tabular o pequeño antes de deep RL y registra trajectories, TD errors, returns y seeds.",
      "Entrega evaluación separada del training, ablations de reward/exploration y un análisis de fallos/reward hacking."
    ],
    "concept": "El proyecto integra definición del entorno, algoritmo y evaluación; cambiar reward o terminal conditions cambia el problema aprendido.",
    "rules": [
      "Distingue siempre reward inmediato, return esperado, policy y value antes de atribuir causalidad al aprendizaje.",
      "Declara si el método es on-policy/off-policy, tabular/aproximado y episódico/continuo cuando esas propiedades cambien el razonamiento.",
      "Evalúa con varias seeds y métricas separadas de calidad, coste de muestras y estabilidad; una curva favorable no es una garantía universal."
    ],
    "deep": {
      "intro": "Integrar MDP, policy, value learning, evaluación y observabilidad en un agente pequeño reproducible.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Define primero estado/observación, acciones, transiciones, reward y criterio de terminación; después selecciona algoritmo."
        },
        {
          "title": "Mecánica y límites",
          "body": "Implementa un baseline tabular o pequeño antes de deep RL y registra trajectories, TD errors, returns y seeds."
        },
        {
          "title": "Ingeniería",
          "body": "Entrega evaluación separada del training, ablations de reward/exploration y un análisis de fallos/reward hacking."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño calculable, registra seed/configuración y separa training return, evaluation return, sample efficiency y fallos."
        }
      ]
    },
    "example": {
      "problem": "10 seeds × 200 episodios de evaluación. Episodios totales.",
      "steps": [
        "Escribe la ecuación o presupuesto relevante con sus unidades.",
        "Calcula el resultado y explica qué supuesto del modelo RL se está usando."
      ],
      "solution": "2000"
    },
    "check": {
      "question": "¿Cambiar la reward puede cambiar la tarea efectiva aunque el entorno físico sea el mismo?",
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
          "Depende solo del número de parámetros",
          false
        ]
      ],
      "feedback": "El proyecto integra definición del entorno, algoritmo y evaluación; cambiar reward o terminal conditions cambia el problema aprendido."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "10 seeds × 200 episodios de evaluación. Episodios totales.",
        "answer": "2000",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cambiar la reward puede cambiar la tarea efectiva aunque el entorno físico sea el mismo?",
        "answer": "si",
        "hint": "La señal de recompensa define el objetivo optimizado por el agente."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar el protocolo de evaluación y los supuestos del entorno antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En RL, reward, dinámica, datos y evaluación forman parte del experimento."
      }
    ]
  }
});
