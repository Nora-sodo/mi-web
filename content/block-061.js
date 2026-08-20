/**
 * BLOQUE 061 — REDES NEURONALES DESDE CERO
 *
 * Regla editorial: derivar antes de abstraer. Backpropagation es diferenciación
 * reverse-mode; el optimizador usa sus gradientes, pero no son el mismo algoritmo.
 */
window.LEARNING_PATHS[61] = {
  "level": "IA desde primeros principios",
  "estimatedHours": 142,
  "description": "Redes neuronales desde cero: unidades, capas, forward, loss, cálculo diferencial, backprop, inicialización, regularización, BatchNorm y optimizadores.",
  "outcomes": [
    "Derivar y programar una red multicapa sin frameworks.",
    "Implementar backpropagation y verificar gradientes numéricamente.",
    "Separar arquitectura, loss, optimizador, regularización y modos train/inference.",
    "Reimplementar la red con NumPy manteniendo las mismas ecuaciones e invariantes."
  ],
  "modules": [
    {
      "id": "m1-units",
      "title": "Unidades y composición",
      "description": "Unidades y composición",
      "lessons": [
        "nn-neuron",
        "nn-perceptron",
        "nn-activations",
        "nn-multilayer"
      ]
    },
    {
      "id": "m2-forward-loss",
      "title": "Forward y objetivo",
      "description": "Forward y objetivo",
      "lessons": [
        "nn-forward",
        "nn-loss"
      ]
    },
    {
      "id": "m3-gradients",
      "title": "Derivación y backprop",
      "description": "Derivación y backprop",
      "lessons": [
        "nn-derivatives",
        "nn-chain-rule",
        "nn-backprop",
        "nn-gradient-descent"
      ]
    },
    {
      "id": "m4-training",
      "title": "Inicialización, regularización e integración",
      "description": "Inicialización, regularización e integración",
      "lessons": [
        "nn-initialization",
        "nn-regularization",
        "nn-batchnorm",
        "nn-optimizers-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "nn-neuron": {
    "id": "nn-neuron",
    "courseId": 61,
    "title": "Neurona artificial: combinación afín y activación",
    "shortTitle": "Neurona artificial",
    "duration": 105,
    "objective": "Separar combinación afín, bias y activación, y calcular dimensiones y parámetros.",
    "summary": [
      "Una neurona calcula z=w·x+b y aplica una activación; no es una neurona biológica ni una unidad que 'entienda'.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "Una neurona calcula z=w·x+b y aplica una activación; no es una neurona biológica ni una unidad que 'entienda'.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Separar combinación afín, bias y activación, y calcular dimensiones y parámetros.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una neurona calcula z=w·x+b y aplica una activación; no es una neurona biológica ni una unidad que 'entienda'."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "Con 3 entradas, w=(2,-1,0.5), x=(1,4,2), b=1: z=0.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "0"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "Una neurona calcula z=w·x+b y aplica una activación; no es una neurona biológica ni una unidad que 'entienda'."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Con 3 entradas, w=(2,-1,0.5), x=(1,4,2), b=1: z=0.",
        "answer": "0",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-perceptron": {
    "id": "nn-perceptron",
    "courseId": 61,
    "title": "Perceptrón: clasificación lineal y límites",
    "shortTitle": "Perceptrón",
    "duration": 105,
    "objective": "Entender la regla del perceptrón, separabilidad lineal y su limitación representacional.",
    "summary": [
      "El perceptrón aprende una frontera lineal mediante actualizaciones sobre errores; no puede separar XOR en el espacio original.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "El perceptrón aprende una frontera lineal mediante actualizaciones sobre errores; no puede separar XOR en el espacio original.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Entender la regla del perceptrón, separabilidad lineal y su limitación representacional.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El perceptrón aprende una frontera lineal mediante actualizaciones sobre errores; no puede separar XOR en el espacio original."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "Si y=1, yhat=0, eta=0.1, x=(2,3), actualización Δw=η(y-yhat)x. Primer componente.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "0.2"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "El perceptrón aprende una frontera lineal mediante actualizaciones sobre errores; no puede separar XOR en el espacio original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si y=1, yhat=0, eta=0.1, x=(2,3), actualización Δw=η(y-yhat)x. Primer componente.",
        "answer": "0.2",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-activations": {
    "id": "nn-activations",
    "courseId": 61,
    "title": "Activaciones: sigmoid, tanh, ReLU y gradientes",
    "shortTitle": "Activaciones",
    "duration": 105,
    "objective": "Comparar activaciones por rango, derivada, saturación y coste.",
    "summary": [
      "Las activaciones introducen no linealidad; apilar capas afines sin activación sigue siendo una transformación afín.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "Las activaciones introducen no linealidad; apilar capas afines sin activación sigue siendo una transformación afín.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Comparar activaciones por rango, derivada, saturación y coste.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Las activaciones introducen no linealidad; apilar capas afines sin activación sigue siendo una transformación afín."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "ReLU(-3).",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "0"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "Las activaciones introducen no linealidad; apilar capas afines sin activación sigue siendo una transformación afín."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "ReLU(-3).",
        "answer": "0",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-multilayer": {
    "id": "nn-multilayer",
    "courseId": 61,
    "title": "Redes multicapa: composición y capacidad",
    "shortTitle": "Redes multicapa",
    "duration": 105,
    "objective": "Razonar sobre shapes, parámetros y composición de capas.",
    "summary": [
      "Una red multicapa compone transformaciones parametrizadas; profundidad y anchura cambian capacidad, no garantizan generalización.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "Una red multicapa compone transformaciones parametrizadas; profundidad y anchura cambian capacidad, no garantizan generalización.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Razonar sobre shapes, parámetros y composición de capas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una red multicapa compone transformaciones parametrizadas; profundidad y anchura cambian capacidad, no garantizan generalización."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "Capa 4→5 seguida de 5→2, ambas con bias. Parámetros totales.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "37"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "Una red multicapa compone transformaciones parametrizadas; profundidad y anchura cambian capacidad, no garantizan generalización."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Capa 4→5 seguida de 5→2, ambas con bias. Parámetros totales.",
        "answer": "37",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-forward": {
    "id": "nn-forward",
    "courseId": 61,
    "title": "Forward pass: tensores, shapes y caches",
    "shortTitle": "Forward pass",
    "duration": 105,
    "objective": "Ejecutar forward pass verificando dimensiones, broadcasting y estados intermedios.",
    "summary": [
      "El forward pass transforma un batch capa a capa y conserva intermediarios necesarios para loss/backprop.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "El forward pass transforma un batch capa a capa y conserva intermediarios necesarios para loss/backprop.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Ejecutar forward pass verificando dimensiones, broadcasting y estados intermedios.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El forward pass transforma un batch capa a capa y conserva intermediarios necesarios para loss/backprop."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "Batch 32×10 multiplicado por W 10×6 produce shape final escrito como 32x6.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "32x6"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "El forward pass transforma un batch capa a capa y conserva intermediarios necesarios para loss/backprop."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Batch 32×10 multiplicado por W 10×6 produce shape final escrito como 32x6.",
        "answer": "32x6",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-loss": {
    "id": "nn-loss",
    "courseId": 61,
    "title": "Loss para redes: regresión y clasificación",
    "shortTitle": "Loss",
    "duration": 105,
    "objective": "Distinguir MSE, cross-entropy y logits/probabilidades.",
    "summary": [
      "La loss define el objetivo numérico de entrenamiento; elegirla depende del modelo probabilístico y la tarea, no de una preferencia estética.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "La loss define el objetivo numérico de entrenamiento; elegirla depende del modelo probabilístico y la tarea, no de una preferencia estética.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Distinguir MSE, cross-entropy y logits/probabilidades.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La loss define el objetivo numérico de entrenamiento; elegirla depende del modelo probabilístico y la tarea, no de una preferencia estética."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "MSE de errores (1,-2,3): promedio de cuadrados.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "4.667"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "La loss define el objetivo numérico de entrenamiento; elegirla depende del modelo probabilístico y la tarea, no de una preferencia estética."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "MSE de errores (1,-2,3): promedio de cuadrados.",
        "answer": "4.667",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-derivatives": {
    "id": "nn-derivatives",
    "courseId": 61,
    "title": "Derivadas locales y Jacobianos",
    "shortTitle": "Derivadas",
    "duration": 105,
    "objective": "Calcular derivadas escalares y entender gradientes/Jacobianos en funciones vectoriales.",
    "summary": [
      "Backprop necesita derivadas locales y estructuras de dependencia; una derivada escalar es solo el caso más simple.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "Backprop necesita derivadas locales y estructuras de dependencia; una derivada escalar es solo el caso más simple.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Calcular derivadas escalares y entender gradientes/Jacobianos en funciones vectoriales.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Backprop necesita derivadas locales y estructuras de dependencia; una derivada escalar es solo el caso más simple."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "f(x)=x^3; f'(2).",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "12"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "Backprop necesita derivadas locales y estructuras de dependencia; una derivada escalar es solo el caso más simple."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "f(x)=x^3; f'(2).",
        "answer": "12",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-chain-rule": {
    "id": "nn-chain-rule",
    "courseId": 61,
    "title": "Chain rule y grafos computacionales",
    "shortTitle": "Chain rule",
    "duration": 105,
    "objective": "Aplicar chain rule en composiciones y ramas compartidas.",
    "summary": [
      "La regla de la cadena propaga sensibilidad a través de composiciones; el grafo computacional organiza dependencias y acumulación.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "La regla de la cadena propaga sensibilidad a través de composiciones; el grafo computacional organiza dependencias y acumulación.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Aplicar chain rule en composiciones y ramas compartidas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La regla de la cadena propaga sensibilidad a través de composiciones; el grafo computacional organiza dependencias y acumulación."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "y=(3x+1)^2. dy/dx en x=1.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "24"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "La regla de la cadena propaga sensibilidad a través de composiciones; el grafo computacional organiza dependencias y acumulación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "y=(3x+1)^2. dy/dx en x=1.",
        "answer": "24",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-backprop": {
    "id": "nn-backprop",
    "courseId": 61,
    "title": "Backpropagation: reverse-mode autodiff",
    "shortTitle": "Backpropagation",
    "duration": 105,
    "objective": "Derivar gradientes de parámetros reutilizando adjoints/intermediarios del forward.",
    "summary": [
      "Backprop es reverse-mode differentiation sobre el grafo; no es sinónimo de gradient descent.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "Backprop es reverse-mode differentiation sobre el grafo; no es sinónimo de gradient descent.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Derivar gradientes de parámetros reutilizando adjoints/intermediarios del forward.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Backprop es reverse-mode differentiation sobre el grafo; no es sinónimo de gradient descent."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "Si L=z^2 y z=wx con w=3,x=2, dL/dw.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "24"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "Backprop es reverse-mode differentiation sobre el grafo; no es sinónimo de gradient descent."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si L=z^2 y z=wx con w=3,x=2, dL/dw.",
        "answer": "24",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-gradient-descent": {
    "id": "nn-gradient-descent",
    "courseId": 61,
    "title": "Entrenamiento con gradient descent y minibatches",
    "shortTitle": "Gradient descent",
    "duration": 105,
    "objective": "Implementar SGD/minibatches y distinguir gradiente, update y epoch.",
    "summary": [
      "El optimizador usa gradientes para actualizar parámetros; batch size cambia varianza/coste y no convierte el gradiente en otra derivada.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "El optimizador usa gradientes para actualizar parámetros; batch size cambia varianza/coste y no convierte el gradiente en otra derivada.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Implementar SGD/minibatches y distinguir gradiente, update y epoch.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El optimizador usa gradientes para actualizar parámetros; batch size cambia varianza/coste y no convierte el gradiente en otra derivada."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "w=5, grad=8, eta=0.05. Nuevo w.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "4.6"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "El optimizador usa gradientes para actualizar parámetros; batch size cambia varianza/coste y no convierte el gradiente en otra derivada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "w=5, grad=8, eta=0.05. Nuevo w.",
        "answer": "4.6",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-initialization": {
    "id": "nn-initialization",
    "courseId": 61,
    "title": "Inicialización: escala de activaciones y gradientes",
    "shortTitle": "Inicialización",
    "duration": 105,
    "objective": "Entender simetría, fan-in/fan-out y por qué la escala inicial afecta el flujo de señal.",
    "summary": [
      "Inicializar todos los pesos iguales destruye ruptura de simetría; escalas tipo Xavier/He buscan controlar varianzas según arquitectura/activación.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "Inicializar todos los pesos iguales destruye ruptura de simetría; escalas tipo Xavier/He buscan controlar varianzas según arquitectura/activación.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Entender simetría, fan-in/fan-out y por qué la escala inicial afecta el flujo de señal.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Inicializar todos los pesos iguales destruye ruptura de simetría; escalas tipo Xavier/He buscan controlar varianzas según arquitectura/activación."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "He normal usa varianza aproximada 2/fan_in. fan_in=100: varianza.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "0.02"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "Inicializar todos los pesos iguales destruye ruptura de simetría; escalas tipo Xavier/He buscan controlar varianzas según arquitectura/activación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "He normal usa varianza aproximada 2/fan_in. fan_in=100: varianza.",
        "answer": "0.02",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-regularization": {
    "id": "nn-regularization",
    "courseId": 61,
    "title": "Regularización en redes: weight decay, dropout y early stopping",
    "shortTitle": "Regularización",
    "duration": 105,
    "objective": "Comparar weight decay, dropout y early stopping sin confundirlos.",
    "summary": [
      "Regularizar modifica el proceso/hipótesis para reducir sobreajuste; dropout de entrenamiento no significa apagar unidades aleatoriamente durante inferencia estándar.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "Regularizar modifica el proceso/hipótesis para reducir sobreajuste; dropout de entrenamiento no significa apagar unidades aleatoriamente durante inferencia estándar.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Comparar weight decay, dropout y early stopping sin confundirlos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Regularizar modifica el proceso/hipótesis para reducir sobreajuste; dropout de entrenamiento no significa apagar unidades aleatoriamente durante inferencia estándar."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "Dropout p=0.25 sobre 200 unidades: activas esperadas durante training antes de escalado, en promedio.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "150"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "Regularizar modifica el proceso/hipótesis para reducir sobreajuste; dropout de entrenamiento no significa apagar unidades aleatoriamente durante inferencia estándar."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Dropout p=0.25 sobre 200 unidades: activas esperadas durante training antes de escalado, en promedio.",
        "answer": "150",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-batchnorm": {
    "id": "nn-batchnorm",
    "courseId": 61,
    "title": "Batch normalization: train vs inference",
    "shortTitle": "Batch normalization",
    "duration": 105,
    "objective": "Distinguir parámetros aprendibles gamma/beta de estadísticas y modos train/eval.",
    "summary": [
      "BatchNorm normaliza usando estadísticas del minibatch durante training y estadísticas acumuladas/estimadas en inference; no es una capa que haga cada muestra media cero por sí sola en producción.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "BatchNorm normaliza usando estadísticas del minibatch durante training y estadísticas acumuladas/estimadas en inference; no es una capa que haga cada muestra media cero por sí sola en producción.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Distinguir parámetros aprendibles gamma/beta de estadísticas y modos train/eval.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "BatchNorm normaliza usando estadísticas del minibatch durante training y estadísticas acumuladas/estimadas en inference; no es una capa que haga cada muestra media cero por sí sola en producción."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "Batch de valores 1,3,5,7. Media.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "4"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "BatchNorm normaliza usando estadísticas del minibatch durante training y estadísticas acumuladas/estimadas en inference; no es una capa que haga cada muestra media cero por sí sola en producción."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Batch de valores 1,3,5,7. Media.",
        "answer": "4",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  },
  "nn-optimizers-project": {
    "id": "nn-optimizers-project",
    "courseId": 61,
    "title": "Optimizadores y proyecto: red desde cero y NumPy",
    "shortTitle": "Optimizadores + proyecto",
    "duration": 105,
    "objective": "Construir, verificar con gradient checking y entrenar una MLP sin frameworks, después vectorizarla con NumPy.",
    "summary": [
      "Momentum, RMSProp y Adam transforman el historial de gradientes; no reemplazan una loss correcta ni garantizan mejor generalización. El proyecto implementa primero arrays/loops y luego NumPy.",
      "El análisis correcto separa representación matemática, implementación numérica y comportamiento durante training/inference.",
      "Verifica dimensiones, supuestos y gradientes con ejemplos pequeños antes de escalar."
    ],
    "concept": "Momentum, RMSProp y Adam transforman el historial de gradientes; no reemplazan una loss correcta ni garantizan mejor generalización. El proyecto implementa primero arrays/loops y luego NumPy.",
    "rules": [
      "Declara shapes, unidades y modo train/eval cuando sean relevantes.",
      "No confundas una propiedad matemática con una garantía de optimización o generalización.",
      "Comprueba numéricamente casos pequeños y usa gradient checking cuando implementes derivadas propias."
    ],
    "deep": {
      "intro": "Construir, verificar con gradient checking y entrenar una MLP sin frameworks, después vectorizarla con NumPy.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Momentum, RMSProp y Adam transforman el historial de gradientes; no reemplazan una loss correcta ni garantizan mejor generalización. El proyecto implementa primero arrays/loops y luego NumPy."
        },
        {
          "title": "Frontera conceptual",
          "body": "Distingue qué calcula la operación local de cómo se compone en la red y de cómo el optimizador usa finalmente el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Controla shapes, estabilidad numérica, memoria de activaciones, reproducibilidad y separación entre modo de entrenamiento e inferencia."
        },
        {
          "title": "Criterio práctico",
          "body": "Empieza con un caso escalar o batch diminuto que puedas calcular a mano; compara después la implementación vectorizada y mide loss, gradientes y métricas por separado."
        }
      ]
    },
    "example": {
      "problem": "Baseline 0.50 accuracy; red 0.82. Mejora absoluta en puntos porcentuales.",
      "steps": [
        "Identifica la fórmula y sustituye los valores.",
        "Comprueba orden de operaciones y unidades/shapes."
      ],
      "solution": "32"
    },
    "check": {
      "question": "¿Esta lección separa cálculo local, entrenamiento y generalización?",
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
          "Solo en inferencia",
          false
        ]
      ],
      "feedback": "Momentum, RMSProp y Adam transforman el historial de gradientes; no reemplazan una loss correcta ni garantizan mejor generalización. El proyecto implementa primero arrays/loops y luego NumPy."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Baseline 0.50 accuracy; red 0.82. Mejora absoluta en puntos porcentuales.",
        "answer": "32",
        "hint": "Usa el ejemplo y calcula sin saltar pasos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una implementación que baja train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Optimización y generalización son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes verificar shapes y gradientes en una implementación desde cero?",
        "answer": "si",
        "hint": "Los bugs silenciosos de broadcasting/derivadas son frecuentes."
      }
    ]
  }
});
