/**
 * BLOQUE 077 — FILOSOFÍA Y METODOLOGÍA DE INGENIERÍA
 *
 * Regla editorial: distinguir hechos, modelos, supuestos y decisiones; exigir evidencia reproducible.
 */
window.LEARNING_PATHS[77] = {
  "level": "Filosofía y Metodología de Ingeniería",
  "estimatedHours": 230,
  "description": "Método de ingeniería para convertir problemas ambiguos en modelos, evidencia y decisiones técnicas reproducibles y auditables.",
  "outcomes": [
    "Modelar problemas y declarar supuestos, fronteras y criterios de éxito antes de implementar.",
    "Diseñar mediciones y experimentos que distingan hipótesis y permitan comparar alternativas con evidencia.",
    "Leer documentación, estándares, papers y código fuente con criterio de alcance, versión y validez.",
    "Depurar, validar y documentar decisiones de manera incremental y reproducible."
  ],
  "modules": [
    {
      "id": "m1-model",
      "title": "Modelar antes de construir",
      "description": "Problemas, abstracciones y supuestos",
      "lessons": [
        "eng-model-problems",
        "eng-abstraction-implementation",
        "eng-assumptions"
      ]
    },
    {
      "id": "m2-evidence",
      "title": "Experimentar y medir",
      "description": "Experimentos, medición y comparación",
      "lessons": [
        "eng-experiments",
        "eng-measurement",
        "eng-compare-alternatives"
      ]
    },
    {
      "id": "m3-decisions",
      "title": "Decidir bajo restricciones",
      "description": "Trade-offs y límites",
      "lessons": [
        "eng-tradeoffs",
        "eng-limits"
      ]
    },
    {
      "id": "m4-sources",
      "title": "Leer evidencia técnica",
      "description": "Documentación, estándares, papers y código",
      "lessons": [
        "eng-read-docs",
        "eng-read-standards",
        "eng-read-papers",
        "eng-read-source"
      ]
    },
    {
      "id": "m5-investigation",
      "title": "Investigar sistemas",
      "description": "Reverse engineering y debugging",
      "lessons": [
        "eng-conceptual-re",
        "eng-systematic-debugging"
      ]
    },
    {
      "id": "m6-engineering-loop",
      "title": "Cerrar el ciclo",
      "description": "Documentación, diseño incremental, validación y reproducibilidad",
      "lessons": [
        "eng-technical-documentation",
        "eng-incremental-design",
        "eng-validation",
        "eng-reproducibility"
      ]
    },
    {
      "id": "m7-capstone",
      "title": "Síntesis",
      "description": "Decisión de ingeniería auditable",
      "lessons": [
        "eng-capstone"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "eng-model-problems": {
    "id": "eng-model-problems",
    "courseId": 77,
    "title": "Modelar problemas",
    "shortTitle": "Modelar problemas",
    "duration": 110,
    "objective": "Convertir una situación ambigua en un modelo explícito con objetivos, variables, restricciones, entradas, salidas y criterios de éxito.",
    "summary": [
      "Un modelo es una representación deliberadamente incompleta: conserva las propiedades relevantes para una pregunta y omite otras.",
      "Modelar bien exige declarar objetivo, frontera del sistema, variables controlables/no controlables, restricciones e incertidumbres.",
      "Un modelo útil puede ser falso en detalles y aun así predecir o guiar decisiones dentro de un dominio de validez claramente declarado."
    ],
    "concept": "Un modelo es una representación deliberadamente incompleta: conserva las propiedades relevantes para una pregunta y omite otras.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Convertir una situación ambigua en un modelo explícito con objetivos, variables, restricciones, entradas, salidas y criterios de éxito.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un modelo es una representación deliberadamente incompleta: conserva las propiedades relevantes para una pregunta y omite otras."
        },
        {
          "title": "Método",
          "body": "Modelar bien exige declarar objetivo, frontera del sistema, variables controlables/no controlables, restricciones e incertidumbres."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Un modelo útil puede ser falso en detalles y aun así predecir o guiar decisiones dentro de un dominio de validez claramente declarado."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Un modelo de ingeniería debe reproducir todos los detalles del sistema real?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un modelo de ingeniería debe reproducir todos los detalles del sistema real?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Un modelo selecciona lo relevante para la decisión; añadir detalle innecesario puede dificultar razonar y medir."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Modelar problemas.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Modelar problemas a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Modelar problemas.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-abstraction-implementation": {
    "id": "eng-abstraction-implementation",
    "courseId": 77,
    "title": "Separar abstracción e implementación",
    "shortTitle": "Separar abstracción e implementación",
    "duration": 110,
    "objective": "Distinguir el contrato observable de un componente de los mecanismos concretos que utiliza para cumplirlo.",
    "summary": [
      "La abstracción define qué puede asumirse; la implementación decide cómo se consigue bajo ciertas restricciones.",
      "Una buena abstracción oculta detalles accidentales sin ocultar propiedades que afectan a corrección, coste, latencia, seguridad o fallos.",
      "Cambiar una implementación sin romper consumidores requiere preservar el contrato observable o versionarlo explícitamente."
    ],
    "concept": "La abstracción define qué puede asumirse; la implementación decide cómo se consigue bajo ciertas restricciones.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Distinguir el contrato observable de un componente de los mecanismos concretos que utiliza para cumplirlo.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La abstracción define qué puede asumirse; la implementación decide cómo se consigue bajo ciertas restricciones."
        },
        {
          "title": "Método",
          "body": "Una buena abstracción oculta detalles accidentales sin ocultar propiedades que afectan a corrección, coste, latencia, seguridad o fallos."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Cambiar una implementación sin romper consumidores requiere preservar el contrato observable o versionarlo explícitamente."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Una abstracción correcta puede ocultar una limitación observable de latencia o consistencia?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una abstracción correcta puede ocultar una limitación observable de latencia o consistencia?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Ocultar mecanismos es útil; ocultar restricciones relevantes convierte la abstracción en una mentira operacional."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Separar abstracción e implementación.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Separar abstracción e implementación a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Separar abstracción e implementación.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-assumptions": {
    "id": "eng-assumptions",
    "courseId": 77,
    "title": "Identificar supuestos",
    "shortTitle": "Identificar supuestos",
    "duration": 110,
    "objective": "Hacer visibles los supuestos técnicos y operativos para poder verificarlos, invalidarlos o diseñar defensas.",
    "summary": [
      "Todo diseño descansa sobre supuestos: carga, comportamiento de usuarios, propiedades del hardware, red, datos y entorno.",
      "Un supuesto no documentado se convierte en una dependencia invisible y suele descubrirse durante un fallo.",
      "Los supuestos importantes deben expresarse de forma falsable y, cuando sea viable, comprobarse mediante tests, telemetría o límites de interfaz."
    ],
    "concept": "Todo diseño descansa sobre supuestos: carga, comportamiento de usuarios, propiedades del hardware, red, datos y entorno.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Hacer visibles los supuestos técnicos y operativos para poder verificarlos, invalidarlos o diseñar defensas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Todo diseño descansa sobre supuestos: carga, comportamiento de usuarios, propiedades del hardware, red, datos y entorno."
        },
        {
          "title": "Método",
          "body": "Un supuesto no documentado se convierte en una dependencia invisible y suele descubrirse durante un fallo."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Los supuestos importantes deben expresarse de forma falsable y, cuando sea viable, comprobarse mediante tests, telemetría o límites de interfaz."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Un supuesto deja de ser un riesgo por estar escrito en un documento?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un supuesto deja de ser un riesgo por estar escrito en un documento?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Documentarlo permite gestionarlo, pero aún debe validarse o mitigarse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Identificar supuestos.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Identificar supuestos a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Identificar supuestos.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-experiments": {
    "id": "eng-experiments",
    "courseId": 77,
    "title": "Diseñar experimentos",
    "shortTitle": "Diseñar experimentos",
    "duration": 110,
    "objective": "Diseñar experimentos capaces de distinguir entre hipótesis competidoras y evitar conclusiones causales débiles.",
    "summary": [
      "Un experimento útil comienza con una pregunta y una hipótesis falsable, no con una herramienta.",
      "Controlar variables, fijar baseline y repetir mediciones permite atribuir cambios con mayor confianza.",
      "Una comparación A/B o benchmark puede estar sesgada por warm-up, cachés, ruido, selección de muestras o cambios simultáneos."
    ],
    "concept": "Un experimento útil comienza con una pregunta y una hipótesis falsable, no con una herramienta.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Diseñar experimentos capaces de distinguir entre hipótesis competidoras y evitar conclusiones causales débiles.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un experimento útil comienza con una pregunta y una hipótesis falsable, no con una herramienta."
        },
        {
          "title": "Método",
          "body": "Controlar variables, fijar baseline y repetir mediciones permite atribuir cambios con mayor confianza."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Una comparación A/B o benchmark puede estar sesgada por warm-up, cachés, ruido, selección de muestras o cambios simultáneos."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Cambiar tres variables a la vez permite atribuir con seguridad una mejora a una de ellas?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Cambiar tres variables a la vez permite atribuir con seguridad una mejora a una de ellas?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Sin aislamiento o diseño factorial apropiado, la atribución causal queda confundida."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Diseñar experimentos.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Diseñar experimentos a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Diseñar experimentos.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-measurement": {
    "id": "eng-measurement",
    "courseId": 77,
    "title": "Medir",
    "shortTitle": "Medir",
    "duration": 110,
    "objective": "Construir mediciones con unidades, incertidumbre y contexto suficientes para tomar decisiones reproducibles.",
    "summary": [
      "Medir no es registrar números: requiere definir qué variable representa cada métrica, cómo se obtiene y qué error puede introducir.",
      "Precisión, exactitud, resolución y sesgo describen propiedades diferentes del proceso de medición.",
      "Una métrica proxy puede ser útil, pero debe validarse contra el objetivo real para evitar optimizar lo que es fácil medir en vez de lo que importa."
    ],
    "concept": "Medir no es registrar números: requiere definir qué variable representa cada métrica, cómo se obtiene y qué error puede introducir.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Construir mediciones con unidades, incertidumbre y contexto suficientes para tomar decisiones reproducibles.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Medir no es registrar números: requiere definir qué variable representa cada métrica, cómo se obtiene y qué error puede introducir."
        },
        {
          "title": "Método",
          "body": "Precisión, exactitud, resolución y sesgo describen propiedades diferentes del proceso de medición."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Una métrica proxy puede ser útil, pero debe validarse contra el objetivo real para evitar optimizar lo que es fácil medir en vez de lo que importa."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Una medición con muchos decimales es necesariamente exacta?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una medición con muchos decimales es necesariamente exacta?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Resolución de representación no implica baja incertidumbre ni ausencia de sesgo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Medir.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Medir a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Medir.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-compare-alternatives": {
    "id": "eng-compare-alternatives",
    "courseId": 77,
    "title": "Comparar alternativas",
    "shortTitle": "Comparar alternativas",
    "duration": 110,
    "objective": "Comparar diseños mediante criterios comunes, restricciones y evidencia en vez de preferencias aisladas.",
    "summary": [
      "Comparar alternativas requiere una misma definición del problema y un conjunto explícito de criterios.",
      "Una matriz de decisión ayuda a hacer visibles pesos y trade-offs, pero no transforma juicios subjetivos en hechos objetivos.",
      "La alternativa dominante depende del contexto: presupuesto, riesgo, experiencia del equipo, tiempo, escala y coste de reversión pueden cambiar la decisión."
    ],
    "concept": "Comparar alternativas requiere una misma definición del problema y un conjunto explícito de criterios.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Comparar diseños mediante criterios comunes, restricciones y evidencia en vez de preferencias aisladas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Comparar alternativas requiere una misma definición del problema y un conjunto explícito de criterios."
        },
        {
          "title": "Método",
          "body": "Una matriz de decisión ayuda a hacer visibles pesos y trade-offs, pero no transforma juicios subjetivos en hechos objetivos."
        },
        {
          "title": "Límite y error frecuente",
          "body": "La alternativa dominante depende del contexto: presupuesto, riesgo, experiencia del equipo, tiempo, escala y coste de reversión pueden cambiar la decisión."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿La tecnología con mayor puntuación bruta es siempre la mejor alternativa?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿La tecnología con mayor puntuación bruta es siempre la mejor alternativa?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Los pesos, restricciones y sensibilidad de la decisión deben formar parte de la comparación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Comparar alternativas.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Comparar alternativas a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Comparar alternativas.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-tradeoffs": {
    "id": "eng-tradeoffs",
    "courseId": 77,
    "title": "Analizar trade-offs",
    "shortTitle": "Analizar trade-offs",
    "duration": 110,
    "objective": "Razonar sobre mejoras que desplazan coste o riesgo entre atributos como rendimiento, consistencia, seguridad y operabilidad.",
    "summary": [
      "Un trade-off aparece cuando mejorar una propiedad consume recursos o degrada otra bajo las restricciones actuales.",
      "Los trade-offs deben formularse con escenarios medibles, no con etiquetas vagas como “más escalable” o “más limpio”.",
      "Algunas tensiones pueden mitigarse con una arquitectura distinta; no todo conflicto es una ley fundamental, por lo que conviene distinguir límites físicos/teóricos de decisiones contingentes."
    ],
    "concept": "Un trade-off aparece cuando mejorar una propiedad consume recursos o degrada otra bajo las restricciones actuales.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Razonar sobre mejoras que desplazan coste o riesgo entre atributos como rendimiento, consistencia, seguridad y operabilidad.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un trade-off aparece cuando mejorar una propiedad consume recursos o degrada otra bajo las restricciones actuales."
        },
        {
          "title": "Método",
          "body": "Los trade-offs deben formularse con escenarios medibles, no con etiquetas vagas como “más escalable” o “más limpio”."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Algunas tensiones pueden mitigarse con una arquitectura distinta; no todo conflicto es una ley fundamental, por lo que conviene distinguir límites físicos/teóricos de decisiones contingentes."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Todo trade-off observado en una implementación es necesariamente fundamental?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Todo trade-off observado en una implementación es necesariamente fundamental?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Puede deberse a una arquitectura o restricción concreta y desaparecer al cambiar el diseño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Analizar trade-offs.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Analizar trade-offs a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Analizar trade-offs.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-limits": {
    "id": "eng-limits",
    "courseId": 77,
    "title": "Identificar límites",
    "shortTitle": "Identificar límites",
    "duration": 110,
    "objective": "Determinar los límites teóricos, físicos, económicos y operativos de un diseño y su dominio de validez.",
    "summary": [
      "Un sistema correcto dentro de cierto rango puede fallar fuera de él; documentar ese rango es parte del diseño.",
      "Los límites pueden venir de teoría, capacidad física, representación numérica, presupuesto, latencia, coordinación o supuestos humanos.",
      "Probar límites exige buscar condiciones frontera y modos de degradación, no solo el caso nominal."
    ],
    "concept": "Un sistema correcto dentro de cierto rango puede fallar fuera de él; documentar ese rango es parte del diseño.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Determinar los límites teóricos, físicos, económicos y operativos de un diseño y su dominio de validez.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un sistema correcto dentro de cierto rango puede fallar fuera de él; documentar ese rango es parte del diseño."
        },
        {
          "title": "Método",
          "body": "Los límites pueden venir de teoría, capacidad física, representación numérica, presupuesto, latencia, coordinación o supuestos humanos."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Probar límites exige buscar condiciones frontera y modos de degradación, no solo el caso nominal."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Que un prototipo funcione con 100 usuarios demuestra que funcionará con 10 millones?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Que un prototipo funcione con 100 usuarios demuestra que funcionará con 10 millones?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "La extrapolación exige un modelo de escalado y evidencia sobre los cuellos de botella relevantes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Identificar límites.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Identificar límites a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Identificar límites.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-read-docs": {
    "id": "eng-read-docs",
    "courseId": 77,
    "title": "Leer documentación",
    "shortTitle": "Leer documentación",
    "duration": 110,
    "objective": "Leer documentación técnica como contrato contextual: versión, alcance, garantías, ejemplos y condiciones de validez.",
    "summary": [
      "La documentación oficial suele ser la primera fuente para comportamiento soportado, pero hay que comprobar versión y alcance.",
      "Ejemplos ilustran usos; no sustituyen la especificación de errores, concurrencia, lifetime, límites o compatibilidad.",
      "Cuando documentación y comportamiento divergen, un caso mínimo reproducible ayuda a determinar si hay bug, malentendido o cambio de versión."
    ],
    "concept": "La documentación oficial suele ser la primera fuente para comportamiento soportado, pero hay que comprobar versión y alcance.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Leer documentación técnica como contrato contextual: versión, alcance, garantías, ejemplos y condiciones de validez.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La documentación oficial suele ser la primera fuente para comportamiento soportado, pero hay que comprobar versión y alcance."
        },
        {
          "title": "Método",
          "body": "Ejemplos ilustran usos; no sustituyen la especificación de errores, concurrencia, lifetime, límites o compatibilidad."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Cuando documentación y comportamiento divergen, un caso mínimo reproducible ayuda a determinar si hay bug, malentendido o cambio de versión."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Un ejemplo de documentación define necesariamente todos los casos límite de una API?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un ejemplo de documentación define necesariamente todos los casos límite de una API?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Los ejemplos son parciales; hay que leer contratos, notas y restricciones."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Leer documentación.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Leer documentación a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Leer documentación.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-read-standards": {
    "id": "eng-read-standards",
    "courseId": 77,
    "title": "Leer estándares",
    "shortTitle": "Leer estándares",
    "duration": 110,
    "objective": "Extraer requisitos normativos y semántica precisa de estándares sin confundirlos con una implementación concreta.",
    "summary": [
      "Los estándares describen interfaces, formatos, protocolos o requisitos de conformidad para permitir interoperabilidad.",
      "Palabras normativas como MUST/SHOULD/MAY tienen significado específico cuando el documento adopta esa convención.",
      "Una implementación puede añadir extensiones o comportamientos no normativos; comprobar conformidad requiere distinguir ambos niveles."
    ],
    "concept": "Los estándares describen interfaces, formatos, protocolos o requisitos de conformidad para permitir interoperabilidad.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Extraer requisitos normativos y semántica precisa de estándares sin confundirlos con una implementación concreta.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Los estándares describen interfaces, formatos, protocolos o requisitos de conformidad para permitir interoperabilidad."
        },
        {
          "title": "Método",
          "body": "Palabras normativas como MUST/SHOULD/MAY tienen significado específico cuando el documento adopta esa convención."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Una implementación puede añadir extensiones o comportamientos no normativos; comprobar conformidad requiere distinguir ambos niveles."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Que dos implementaciones interoperan implica que ambas cumplen íntegramente un estándar?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Que dos implementaciones interoperan implica que ambas cumplen íntegramente un estándar?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "La interoperabilidad observada cubre solo los casos ejercitados."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Leer estándares.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Leer estándares a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Leer estándares.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-read-papers": {
    "id": "eng-read-papers",
    "courseId": 77,
    "title": "Leer papers",
    "shortTitle": "Leer papers",
    "duration": 110,
    "objective": "Evaluar papers por pregunta, método, evidencia, amenazas a validez y reproducibilidad, no solo por conclusiones.",
    "summary": [
      "Un paper técnico debe leerse separando pregunta de investigación, método, resultados e interpretación.",
      "Una cifra de mejora solo es significativa respecto a baseline, datasets/workloads, hardware, presupuesto y metodología declarados.",
      "Las amenazas a validez y resultados negativos ayudan a delimitar qué afirmaciones soporta realmente el estudio."
    ],
    "concept": "Un paper técnico debe leerse separando pregunta de investigación, método, resultados e interpretación.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Evaluar papers por pregunta, método, evidencia, amenazas a validez y reproducibilidad, no solo por conclusiones.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un paper técnico debe leerse separando pregunta de investigación, método, resultados e interpretación."
        },
        {
          "title": "Método",
          "body": "Una cifra de mejora solo es significativa respecto a baseline, datasets/workloads, hardware, presupuesto y metodología declarados."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Las amenazas a validez y resultados negativos ayudan a delimitar qué afirmaciones soporta realmente el estudio."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Un resultado estadísticamente significativo implica automáticamente una mejora práctica importante?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un resultado estadísticamente significativo implica automáticamente una mejora práctica importante?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Significancia estadística y magnitud/valor práctico son cuestiones distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Leer papers.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Leer papers a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Leer papers.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-read-source": {
    "id": "eng-read-source",
    "courseId": 77,
    "title": "Leer código fuente",
    "shortTitle": "Leer código fuente",
    "duration": 110,
    "objective": "Usar código fuente para responder preguntas concretas sobre implementación, control de flujo, invariantes y costes.",
    "summary": [
      "Leer código fuente es más eficaz cuando parte de una pregunta y una ruta de ejecución, no intentando leer un repositorio linealmente.",
      "Nombres, tipos, tests, commits y trazas ayudan a reconstruir intención, pero la verdad ejecutable depende del código y configuración concretos.",
      "Una función aislada puede ser engañosa sin call sites, ownership, concurrencia, datos y mecanismos de error."
    ],
    "concept": "Leer código fuente es más eficaz cuando parte de una pregunta y una ruta de ejecución, no intentando leer un repositorio linealmente.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Usar código fuente para responder preguntas concretas sobre implementación, control de flujo, invariantes y costes.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Leer código fuente es más eficaz cuando parte de una pregunta y una ruta de ejecución, no intentando leer un repositorio linealmente."
        },
        {
          "title": "Método",
          "body": "Nombres, tipos, tests, commits y trazas ayudan a reconstruir intención, pero la verdad ejecutable depende del código y configuración concretos."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Una función aislada puede ser engañosa sin call sites, ownership, concurrencia, datos y mecanismos de error."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Leer una función aislada suele bastar para entender el comportamiento completo de un subsistema?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Leer una función aislada suele bastar para entender el comportamiento completo de un subsistema?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Hay que seguir llamadas, datos, estados y contexto de ejecución."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Leer código fuente.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Leer código fuente a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Leer código fuente.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-conceptual-re": {
    "id": "eng-conceptual-re",
    "courseId": 77,
    "title": "Reverse engineering conceptual",
    "shortTitle": "Reverse engineering conceptual",
    "duration": 110,
    "objective": "Reconstruir un sistema desde observaciones, interfaces y artefactos sin confundir hipótesis con hechos.",
    "summary": [
      "La ingeniería inversa conceptual parte del comportamiento observable y formula modelos internos que expliquen evidencias.",
      "Varias implementaciones diferentes pueden producir la misma observación; por eso una hipótesis necesita pruebas discriminantes.",
      "El objetivo no es adivinar detalles ocultos, sino construir el modelo mínimo que prediga comportamientos y saber qué evidencia lo refutaría."
    ],
    "concept": "La ingeniería inversa conceptual parte del comportamiento observable y formula modelos internos que expliquen evidencias.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Reconstruir un sistema desde observaciones, interfaces y artefactos sin confundir hipótesis con hechos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La ingeniería inversa conceptual parte del comportamiento observable y formula modelos internos que expliquen evidencias."
        },
        {
          "title": "Método",
          "body": "Varias implementaciones diferentes pueden producir la misma observación; por eso una hipótesis necesita pruebas discriminantes."
        },
        {
          "title": "Límite y error frecuente",
          "body": "El objetivo no es adivinar detalles ocultos, sino construir el modelo mínimo que prediga comportamientos y saber qué evidencia lo refutaría."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Una única observación externa identifica de forma única la implementación interna?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una única observación externa identifica de forma única la implementación interna?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Sistemas internamente distintos pueden ser observacionalmente equivalentes para esa prueba."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Reverse engineering conceptual.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Reverse engineering conceptual a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Reverse engineering conceptual.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-systematic-debugging": {
    "id": "eng-systematic-debugging",
    "courseId": 77,
    "title": "Debugging sistemático",
    "shortTitle": "Debugging sistemático",
    "duration": 110,
    "objective": "Depurar mediante reproducción, reducción, hipótesis y experimentos controlados en vez de cambios aleatorios.",
    "summary": [
      "El debugging sistemático reduce primero el espacio de búsqueda: reproduce, caracteriza y minimiza el fallo.",
      "Cada intervención debe distinguir hipótesis; cambiar muchas cosas a la vez puede hacer desaparecer el síntoma sin explicar la causa.",
      "La causa raíz útil conecta mecanismo con evidencia y debe verificarse reintroduciendo o eliminando de forma controlada la condición causal."
    ],
    "concept": "El debugging sistemático reduce primero el espacio de búsqueda: reproduce, caracteriza y minimiza el fallo.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Depurar mediante reproducción, reducción, hipótesis y experimentos controlados en vez de cambios aleatorios.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El debugging sistemático reduce primero el espacio de búsqueda: reproduce, caracteriza y minimiza el fallo."
        },
        {
          "title": "Método",
          "body": "Cada intervención debe distinguir hipótesis; cambiar muchas cosas a la vez puede hacer desaparecer el síntoma sin explicar la causa."
        },
        {
          "title": "Límite y error frecuente",
          "body": "La causa raíz útil conecta mecanismo con evidencia y debe verificarse reintroduciendo o eliminando de forma controlada la condición causal."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Que un bug desaparezca tras varios cambios demuestra cuál era la causa?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Que un bug desaparezca tras varios cambios demuestra cuál era la causa?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Sin aislar cambios no hay atribución fiable."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Debugging sistemático.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Debugging sistemático a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Debugging sistemático.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-technical-documentation": {
    "id": "eng-technical-documentation",
    "courseId": 77,
    "title": "Documentación técnica",
    "shortTitle": "Documentación técnica",
    "duration": 110,
    "objective": "Documentar decisiones, contratos y procedimientos para preservar conocimiento operativo y permitir verificación.",
    "summary": [
      "Documentación útil responde a una audiencia y una tarea: tutorial, referencia, ADR, runbook o explicación tienen funciones diferentes.",
      "La documentación cercana a interfaces y automatizada cuando sea posible envejece mejor que descripciones duplicadas sin verificación.",
      "Una decisión arquitectónica debe registrar contexto y consecuencias, no solo el resultado final."
    ],
    "concept": "Documentación útil responde a una audiencia y una tarea: tutorial, referencia, ADR, runbook o explicación tienen funciones diferentes.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Documentar decisiones, contratos y procedimientos para preservar conocimiento operativo y permitir verificación.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Documentación útil responde a una audiencia y una tarea: tutorial, referencia, ADR, runbook o explicación tienen funciones diferentes."
        },
        {
          "title": "Método",
          "body": "La documentación cercana a interfaces y automatizada cuando sea posible envejece mejor que descripciones duplicadas sin verificación."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Una decisión arquitectónica debe registrar contexto y consecuencias, no solo el resultado final."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Un README largo sustituye a contratos de API, ADRs y runbooks especializados?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un README largo sustituye a contratos de API, ADRs y runbooks especializados?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Cada artefacto responde preguntas diferentes y tiene distinta cadencia de mantenimiento."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Documentación técnica.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Documentación técnica a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Documentación técnica.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-incremental-design": {
    "id": "eng-incremental-design",
    "courseId": 77,
    "title": "Diseño incremental",
    "shortTitle": "Diseño incremental",
    "duration": 110,
    "objective": "Reducir riesgo construyendo en incrementos verificables con feedback temprano y puntos de reversión.",
    "summary": [
      "Diseño incremental no significa ausencia de arquitectura: significa tomar decisiones al nivel necesario y validar pronto las hipótesis costosas.",
      "Incrementos pequeños reducen blast radius, facilitan revisión y permiten comparar comportamiento antes/después.",
      "Una secuencia incremental necesita criterios de aceptación y estrategia de migración; dividir tareas sin producir evidencia no reduce automáticamente el riesgo."
    ],
    "concept": "Diseño incremental no significa ausencia de arquitectura: significa tomar decisiones al nivel necesario y validar pronto las hipótesis costosas.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Reducir riesgo construyendo en incrementos verificables con feedback temprano y puntos de reversión.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Diseño incremental no significa ausencia de arquitectura: significa tomar decisiones al nivel necesario y validar pronto las hipótesis costosas."
        },
        {
          "title": "Método",
          "body": "Incrementos pequeños reducen blast radius, facilitan revisión y permiten comparar comportamiento antes/después."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Una secuencia incremental necesita criterios de aceptación y estrategia de migración; dividir tareas sin producir evidencia no reduce automáticamente el riesgo."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Diseño incremental significa “no diseñar hasta que aparezcan problemas”?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Diseño incremental significa “no diseñar hasta que aparezcan problemas”?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Requiere arquitectura suficiente para el siguiente riesgo y validación continua."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Diseño incremental.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Diseño incremental a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Diseño incremental.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-validation": {
    "id": "eng-validation",
    "courseId": 77,
    "title": "Validación y verificación",
    "shortTitle": "Validación y verificación",
    "duration": 110,
    "objective": "Distinguir construir el sistema conforme a su especificación de comprobar que resuelve el problema real.",
    "summary": [
      "Verificación pregunta si el artefacto satisface requisitos o especificación; validación pregunta si esos requisitos y el resultado satisfacen la necesidad real.",
      "Un sistema puede estar perfectamente verificado contra una especificación equivocada.",
      "Tests, revisión, simulación, experimentos de usuario y operación controlada aportan evidencias diferentes y deben elegirse según el riesgo."
    ],
    "concept": "Verificación pregunta si el artefacto satisface requisitos o especificación; validación pregunta si esos requisitos y el resultado satisfacen la necesidad real.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Distinguir construir el sistema conforme a su especificación de comprobar que resuelve el problema real.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Verificación pregunta si el artefacto satisface requisitos o especificación; validación pregunta si esos requisitos y el resultado satisfacen la necesidad real."
        },
        {
          "title": "Método",
          "body": "Un sistema puede estar perfectamente verificado contra una especificación equivocada."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Tests, revisión, simulación, experimentos de usuario y operación controlada aportan evidencias diferentes y deben elegirse según el riesgo."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Un sistema que pasa todos sus tests está necesariamente validado para la necesidad del usuario?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un sistema que pasa todos sus tests está necesariamente validado para la necesidad del usuario?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Los tests verifican propiedades modeladas; pueden omitir requisitos incorrectos o necesidades no capturadas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Validación y verificación.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Validación y verificación a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Validación y verificación.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-reproducibility": {
    "id": "eng-reproducibility",
    "courseId": 77,
    "title": "Reproducibilidad",
    "shortTitle": "Reproducibilidad",
    "duration": 110,
    "objective": "Diseñar resultados que otra persona pueda reconstruir con datos, versiones, configuración y procedimiento suficientemente especificados.",
    "summary": [
      "Reproducibilidad requiere registrar entradas, versiones, entorno, seeds cuando correspondan y pasos de ejecución.",
      "Un resultado reproducible no es automáticamente correcto, pero permite auditarlo, compararlo y detectar dependencias ocultas.",
      "Entornos herméticos, lockfiles, datasets versionados y automatización reducen variabilidad, aunque hardware y servicios externos pueden seguir introduciendo diferencias."
    ],
    "concept": "Reproducibilidad requiere registrar entradas, versiones, entorno, seeds cuando correspondan y pasos de ejecución.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Diseñar resultados que otra persona pueda reconstruir con datos, versiones, configuración y procedimiento suficientemente especificados.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Reproducibilidad requiere registrar entradas, versiones, entorno, seeds cuando correspondan y pasos de ejecución."
        },
        {
          "title": "Método",
          "body": "Un resultado reproducible no es automáticamente correcto, pero permite auditarlo, compararlo y detectar dependencias ocultas."
        },
        {
          "title": "Límite y error frecuente",
          "body": "Entornos herméticos, lockfiles, datasets versionados y automatización reducen variabilidad, aunque hardware y servicios externos pueden seguir introduciendo diferencias."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Reproducibilidad y corrección significan lo mismo?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Reproducibilidad y corrección significan lo mismo?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "Un procedimiento puede reproducir de forma consistente un resultado equivocado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Reproducibilidad.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Reproducibilidad a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Reproducibilidad.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  },
  "eng-capstone": {
    "id": "eng-capstone",
    "courseId": 77,
    "title": "Proyecto: dossier de decisión de ingeniería",
    "shortTitle": "Proyecto: dossier de decisión de ingeniería",
    "duration": 180,
    "objective": "Integrar modelado, evidencia, lectura técnica, experimentación, trade-offs, validación y reproducibilidad en una decisión auditable.",
    "summary": [
      "El proyecto final parte de una decisión real con al menos dos alternativas y consecuencias medibles.",
      "Debe contener modelo del problema, supuestos, fuentes, experimento reproducible, métricas, amenazas a validez y un registro explícito de trade-offs.",
      "La conclusión debe poder revisarse si cambian los datos o restricciones: una buena decisión de ingeniería deja trazabilidad de por qué fue razonable en su contexto."
    ],
    "concept": "El proyecto final parte de una decisión real con al menos dos alternativas y consecuencias medibles.",
    "rules": [
      "Distingue observación, hipótesis, modelo y conclusión; no eleves una inferencia a hecho sin evidencia.",
      "Declara supuestos, versiones, restricciones y criterio de éxito antes de comparar alternativas.",
      "Busca evidencia que pueda refutar tu explicación, no solo ejemplos que la confirmen."
    ],
    "deep": {
      "intro": "Integrar modelado, evidencia, lectura técnica, experimentación, trade-offs, validación y reproducibilidad en una decisión auditable.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El proyecto final parte de una decisión real con al menos dos alternativas y consecuencias medibles."
        },
        {
          "title": "Método",
          "body": "Debe contener modelo del problema, supuestos, fuentes, experimento reproducible, métricas, amenazas a validez y un registro explícito de trade-offs."
        },
        {
          "title": "Límite y error frecuente",
          "body": "La conclusión debe poder revisarse si cambian los datos o restricciones: una buena decisión de ingeniería deja trazabilidad de por qué fue razonable en su contexto."
        },
        {
          "title": "Aplicación",
          "body": "Aplica la idea a un sistema real del curso. Escribe la pregunta, los supuestos, la evidencia que observarías y una condición concreta que refutaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Una recomendación técnica sin supuestos ni evidencia es suficiente como dossier de decisión?",
      "steps": [
        "Define exactamente qué afirmación quieres evaluar y bajo qué condiciones.",
        "Separa evidencia observable de la explicación causal y documenta qué prueba podría cambiar tu conclusión."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una recomendación técnica sin supuestos ni evidencia es suficiente como dossier de decisión?",
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
          "Solo si el resultado coincide con la intuición",
          false
        ]
      ],
      "feedback": "La trazabilidad de contexto, evidencia y trade-offs es parte del resultado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Define con tus palabras el núcleo de Proyecto: dossier de decisión de ingeniería.",
        "answer": "evidencia",
        "alternatives": [
          "modelo",
          "criterio"
        ],
        "hint": "Incluye al menos una afirmación comprobable, no solo una definición nominal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Aplica Proyecto: dossier de decisión de ingeniería a una decisión técnica de uno de los bloques anteriores e identifica un supuesto que podría fallar.",
        "answer": "supuesto",
        "hint": "Formula el supuesto de forma que pueda verificarse o refutarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba que distinga dos explicaciones competidoras relacionadas con Proyecto: dossier de decisión de ingeniería.",
        "answer": "experimento",
        "alternatives": [
          "prueba"
        ],
        "hint": "La observación esperada debe ser diferente bajo cada hipótesis."
      }
    ]
  }
});
