/**
 * BLOQUE 062 — DEEP LEARNING
 *
 * Regla editorial: una arquitectura es una composición concreta de operaciones,
 * inductive biases y restricciones de coste. No atribuimos propiedades mágicas a
 * "ser deep": derivamos shapes, flujo de información, gradientes y trade-offs.
 */
window.LEARNING_PATHS[62] = {
  "level": "Deep Learning",
  "estimatedHours": 156,
  "description": "Arquitecturas profundas desde operaciones concretas: convolución, recurrencia, gates, attention, embeddings, representation learning y entrenamiento estable a escala.",
  "outcomes": [
    "Derivar shapes, parámetros y coste básico de CNN/RNN y módulos de attention.",
    "Explicar BPTT, LSTM/GRU, embeddings y representation learning sin confundirlos con garantías de memoria o significado.",
    "Diagnosticar gradient flow, receptive fields, masking, aliasing y coste de entrenamiento.",
    "Construir y evaluar un sistema deep reproducible con baselines, ablations y profiling."
  ],
  "modules": [
    {
      "id": "m1-conv",
      "title": "Visión y convolución",
      "description": "Visión y convolución",
      "lessons": [
        "dl-depth",
        "dl-convolution",
        "dl-cnn",
        "dl-pooling",
        "dl-receptive"
      ]
    },
    {
      "id": "m2-seq",
      "title": "Secuencias y atención",
      "description": "Secuencias y atención",
      "lessons": [
        "dl-rnn",
        "dl-lstm",
        "dl-gru",
        "dl-attention",
        "dl-sequence-models"
      ]
    },
    {
      "id": "m3-repr",
      "title": "Representaciones y entrenamiento",
      "description": "Representaciones y entrenamiento",
      "lessons": [
        "dl-embeddings",
        "dl-representation",
        "dl-training-scale",
        "dl-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "dl-depth": {
    "id": "dl-depth",
    "courseId": 62,
    "title": "Profundidad y representación jerárquica",
    "shortTitle": "Profundidad",
    "duration": 115,
    "objective": "Explicar qué aporta componer muchas transformaciones y por qué profundidad no equivale automáticamente a mejor rendimiento.",
    "summary": [
      "Una red profunda compone transformaciones para construir representaciones sucesivas; más capas aumentan capacidad y cambian la optimización, pero no garantizan generalización.",
      "Profundidad habilita composiciones jerárquicas y reutilización de features, pero también alarga caminos de optimización y puede elevar memoria/latencia. Arquitectura, datos y objective siguen siendo decisivos.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "Una red profunda compone transformaciones para construir representaciones sucesivas; más capas aumentan capacidad y cambian la optimización, pero no garantizan generalización.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Explicar qué aporta componer muchas transformaciones y por qué profundidad no equivale automáticamente a mejor rendimiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una red profunda compone transformaciones para construir representaciones sucesivas; más capas aumentan capacidad y cambian la optimización, pero no garantizan generalización."
        },
        {
          "title": "Mecánica y límites",
          "body": "Profundidad habilita composiciones jerárquicas y reutilización de features, pero también alarga caminos de optimización y puede elevar memoria/latencia. Arquitectura, datos y objective siguen siendo decisivos."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Una red de 8 bloques residuales con 2 capas por bloque contiene 16 capas de transformación dentro de los bloques.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "16"
    },
    "check": {
      "question": "¿Más profundidad garantiza mejor test?",
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
      "feedback": "Una red profunda compone transformaciones para construir representaciones sucesivas; más capas aumentan capacidad y cambian la optimización, pero no garantizan generalización."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una red de 8 bloques residuales con 2 capas por bloque contiene 16 capas de transformación dentro de los bloques.",
        "answer": "16",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-convolution": {
    "id": "dl-convolution",
    "courseId": 62,
    "title": "Convolution: kernels, stride, padding y canales",
    "shortTitle": "Convolution",
    "duration": 125,
    "objective": "Derivar shapes y parámetros de una convolución y distinguir la operación matemática de su implementación optimizada.",
    "summary": [
      "Una convolución comparte pesos espacialmente y explota localidad; stride, padding, dilation, grupos y canales determinan conectividad, shape y coste.",
      "Para H_out=floor((H+2P-D(K-1)-1)/S)+1. Cuenta también C_in·C_out·K_h·K_w pesos más bias si existe; MACs y memoria dependen además del tamaño de salida.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "Una convolución comparte pesos espacialmente y explota localidad; stride, padding, dilation, grupos y canales determinan conectividad, shape y coste.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Derivar shapes y parámetros de una convolución y distinguir la operación matemática de su implementación optimizada.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una convolución comparte pesos espacialmente y explota localidad; stride, padding, dilation, grupos y canales determinan conectividad, shape y coste."
        },
        {
          "title": "Mecánica y límites",
          "body": "Para H_out=floor((H+2P-D(K-1)-1)/S)+1. Cuenta también C_in·C_out·K_h·K_w pesos más bias si existe; MACs y memoria dependen además del tamaño de salida."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Entrada 32×32, kernel 3, padding 1, stride 1: tamaño espacial de salida.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "32"
    },
    "check": {
      "question": "¿Una convolución usa un peso distinto para cada posición espacial?",
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
      "feedback": "Una convolución comparte pesos espacialmente y explota localidad; stride, padding, dilation, grupos y canales determinan conectividad, shape y coste."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Entrada 32×32, kernel 3, padding 1, stride 1: tamaño espacial de salida.",
        "answer": "32",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-cnn": {
    "id": "dl-cnn",
    "courseId": 62,
    "title": "CNN: inductive bias, jerarquías y receptive fields",
    "shortTitle": "CNN",
    "duration": 120,
    "objective": "Construir CNNs entendiendo locality, weight sharing y crecimiento del receptive field.",
    "summary": [
      "Una CNN introduce sesgos inductivos de localidad y compartición de pesos; sus features aprendidas y receptive fields emergen de la composición de capas.",
      "Weight sharing reduce parámetros frente a conexiones densas equivalentes y favorece equivariancia traslacional local. Pooling/stride, padding y fronteras alteran esa propiedad.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "Una CNN introduce sesgos inductivos de localidad y compartición de pesos; sus features aprendidas y receptive fields emergen de la composición de capas.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Construir CNNs entendiendo locality, weight sharing y crecimiento del receptive field.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una CNN introduce sesgos inductivos de localidad y compartición de pesos; sus features aprendidas y receptive fields emergen de la composición de capas."
        },
        {
          "title": "Mecánica y límites",
          "body": "Weight sharing reduce parámetros frente a conexiones densas equivalentes y favorece equivariancia traslacional local. Pooling/stride, padding y fronteras alteran esa propiedad."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Dos conv 3×3 stride 1 consecutivas tienen receptive field 5×5 sin dilation. Lado.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "5"
    },
    "check": {
      "question": "¿Una CNN es únicamente una MLP con menos parámetros?",
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
      "feedback": "Una CNN introduce sesgos inductivos de localidad y compartición de pesos; sus features aprendidas y receptive fields emergen de la composición de capas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Dos conv 3×3 stride 1 consecutivas tienen receptive field 5×5 sin dilation. Lado.",
        "answer": "5",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-pooling": {
    "id": "dl-pooling",
    "courseId": 62,
    "title": "Pooling, downsampling y pérdida de información",
    "shortTitle": "Pooling",
    "duration": 105,
    "objective": "Comparar max/average pooling con downsampling mediante stride y razonar sobre invariancia y aliasing.",
    "summary": [
      "Pooling reduce resolución y agrega vecindarios; puede aportar robustez local pero descarta información y no sustituye automáticamente un diseño anti-aliasing.",
      "Downsampling puede aliasar componentes espaciales altas. Max pooling y average pooling agregan de forma distinta; una convolución con stride aprende el filtro pero tampoco garantiza anti-aliasing.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "Pooling reduce resolución y agrega vecindarios; puede aportar robustez local pero descarta información y no sustituye automáticamente un diseño anti-aliasing.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Comparar max/average pooling con downsampling mediante stride y razonar sobre invariancia y aliasing.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Pooling reduce resolución y agrega vecindarios; puede aportar robustez local pero descarta información y no sustituye automáticamente un diseño anti-aliasing."
        },
        {
          "title": "Mecánica y límites",
          "body": "Downsampling puede aliasar componentes espaciales altas. Max pooling y average pooling agregan de forma distinta; una convolución con stride aprende el filtro pero tampoco garantiza anti-aliasing."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Max-pooling 2×2 stride 2 sobre 28×28 produce lado de salida.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "14"
    },
    "check": {
      "question": "¿Pooling conserva toda la información espacial?",
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
      "feedback": "Pooling reduce resolución y agrega vecindarios; puede aportar robustez local pero descarta información y no sustituye automáticamente un diseño anti-aliasing."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Max-pooling 2×2 stride 2 sobre 28×28 produce lado de salida.",
        "answer": "14",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-rnn": {
    "id": "dl-rnn",
    "courseId": 62,
    "title": "RNN: estado recurrente y backpropagation through time",
    "shortTitle": "RNN",
    "duration": 125,
    "objective": "Modelar secuencias con estado recurrente y comprender BPTT, dependencias y gradientes temporales.",
    "summary": [
      "Una RNN reutiliza parámetros a través del tiempo y actualiza un estado h_t=f(h_{t-1},x_t); BPTT desenrolla esa recurrencia para propagar gradientes.",
      "BPTT comparte parámetros entre pasos y acumula contribuciones temporales. Productos repetidos de Jacobianos ayudan a explicar vanishing/exploding gradients; truncar BPTT limita horizonte de gradiente, no necesariamente el estado forward.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "Una RNN reutiliza parámetros a través del tiempo y actualiza un estado h_t=f(h_{t-1},x_t); BPTT desenrolla esa recurrencia para propagar gradientes.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Modelar secuencias con estado recurrente y comprender BPTT, dependencias y gradientes temporales.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una RNN reutiliza parámetros a través del tiempo y actualiza un estado h_t=f(h_{t-1},x_t); BPTT desenrolla esa recurrencia para propagar gradientes."
        },
        {
          "title": "Mecánica y límites",
          "body": "BPTT comparte parámetros entre pasos y acumula contribuciones temporales. Productos repetidos de Jacobianos ayudan a explicar vanishing/exploding gradients; truncar BPTT limita horizonte de gradiente, no necesariamente el estado forward."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Secuencia de longitud 20 truncada en ventanas de 5 pasos produce cuántas ventanas completas.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "4"
    },
    "check": {
      "question": "¿Cada timestep de una RNN tiene necesariamente parámetros independientes?",
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
      "feedback": "Una RNN reutiliza parámetros a través del tiempo y actualiza un estado h_t=f(h_{t-1},x_t); BPTT desenrolla esa recurrencia para propagar gradientes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Secuencia de longitud 20 truncada en ventanas de 5 pasos produce cuántas ventanas completas.",
        "answer": "4",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-lstm": {
    "id": "dl-lstm",
    "courseId": 62,
    "title": "LSTM: estado de celda, gates y flujo de gradiente",
    "shortTitle": "LSTM",
    "duration": 130,
    "objective": "Derivar la lógica de gates de una LSTM y entender qué problema intenta aliviar sin prometer memoria infinita.",
    "summary": [
      "LSTM añade un estado de celda y gates multiplicativas para controlar escritura, olvido y lectura; facilita dependencias largas, pero no elimina todos los problemas de optimización.",
      "Las gates suelen usar sigmoid y el candidato tanh; el camino aditivo del cell state puede facilitar propagación, pero forget gates, saturación y secuencias largas siguen condicionando el gradiente.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "LSTM añade un estado de celda y gates multiplicativas para controlar escritura, olvido y lectura; facilita dependencias largas, pero no elimina todos los problemas de optimización.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Derivar la lógica de gates de una LSTM y entender qué problema intenta aliviar sin prometer memoria infinita.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "LSTM añade un estado de celda y gates multiplicativas para controlar escritura, olvido y lectura; facilita dependencias largas, pero no elimina todos los problemas de optimización."
        },
        {
          "title": "Mecánica y límites",
          "body": "Las gates suelen usar sigmoid y el candidato tanh; el camino aditivo del cell state puede facilitar propagación, pero forget gates, saturación y secuencias largas siguen condicionando el gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Si forget gate=0.8 y cell previa=10, contribución retenida antes de sumar input.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "8"
    },
    "check": {
      "question": "¿Una LSTM recuerda información arbitrariamente para siempre por definición?",
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
      "feedback": "LSTM añade un estado de celda y gates multiplicativas para controlar escritura, olvido y lectura; facilita dependencias largas, pero no elimina todos los problemas de optimización."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si forget gate=0.8 y cell previa=10, contribución retenida antes de sumar input.",
        "answer": "8",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-gru": {
    "id": "dl-gru",
    "courseId": 62,
    "title": "GRU: update/reset gates y estado compacto",
    "shortTitle": "GRU",
    "duration": 120,
    "objective": "Comparar GRU y LSTM por ecuaciones, estado y coste, sin declarar una ganadora universal.",
    "summary": [
      "GRU combina mecanismos de gating en una recurrencia más compacta que LSTM; la elección depende de datos, coste y objetivo, no de una jerarquía universal.",
      "GRU suele mantener un único estado y combina update/reset gates. Menos gates no implica universalmente menos coste total ni mayor calidad: shapes, implementación y tarea mandan.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "GRU combina mecanismos de gating en una recurrencia más compacta que LSTM; la elección depende de datos, coste y objetivo, no de una jerarquía universal.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Comparar GRU y LSTM por ecuaciones, estado y coste, sin declarar una ganadora universal.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "GRU combina mecanismos de gating en una recurrencia más compacta que LSTM; la elección depende de datos, coste y objetivo, no de una jerarquía universal."
        },
        {
          "title": "Mecánica y límites",
          "body": "GRU suele mantener un único estado y combina update/reset gates. Menos gates no implica universalmente menos coste total ni mayor calidad: shapes, implementación y tarea mandan."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Si z=0.25, h_prev=4 y h_tilde=8 usando h=(1-z)h_prev+z h_tilde, resultado.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "5"
    },
    "check": {
      "question": "¿GRU es siempre mejor que LSTM?",
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
      "feedback": "GRU combina mecanismos de gating en una recurrencia más compacta que LSTM; la elección depende de datos, coste y objetivo, no de una jerarquía universal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si z=0.25, h_prev=4 y h_tilde=8 usando h=(1-z)h_prev+z h_tilde, resultado.",
        "answer": "5",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-attention": {
    "id": "dl-attention",
    "courseId": 62,
    "title": "Attention: scores, pesos y combinación contextual",
    "shortTitle": "Attention",
    "duration": 135,
    "objective": "Entender attention como selección diferenciable de información y derivar scores, softmax y weighted sum.",
    "summary": [
      "Attention calcula compatibilidades entre una consulta y un conjunto de representaciones, normaliza pesos y combina valores; no implica por sí sola la arquitectura Transformer.",
      "Attention genérica puede ser encoder-decoder/cross-attention u otras variantes. Self-attention es el caso donde consultas, claves y valores provienen del mismo conjunto; el Bloque 063 desarrollará Q/K/V y multi-head en detalle.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "Attention calcula compatibilidades entre una consulta y un conjunto de representaciones, normaliza pesos y combina valores; no implica por sí sola la arquitectura Transformer.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Entender attention como selección diferenciable de información y derivar scores, softmax y weighted sum.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Attention calcula compatibilidades entre una consulta y un conjunto de representaciones, normaliza pesos y combina valores; no implica por sí sola la arquitectura Transformer."
        },
        {
          "title": "Mecánica y límites",
          "body": "Attention genérica puede ser encoder-decoder/cross-attention u otras variantes. Self-attention es el caso donde consultas, claves y valores provienen del mismo conjunto; el Bloque 063 desarrollará Q/K/V y multi-head en detalle."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Pesos attention 0.2,0.3,0.5 sobre valores escalares 1,2,4. Salida.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "2.8"
    },
    "check": {
      "question": "¿Todo mecanismo de attention es self-attention?",
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
      "feedback": "Attention calcula compatibilidades entre una consulta y un conjunto de representaciones, normaliza pesos y combina valores; no implica por sí sola la arquitectura Transformer."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Pesos attention 0.2,0.3,0.5 sobre valores escalares 1,2,4. Salida.",
        "answer": "2.8",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-embeddings": {
    "id": "dl-embeddings",
    "courseId": 62,
    "title": "Embeddings: índices discretos a espacios continuos",
    "shortTitle": "Embeddings",
    "duration": 115,
    "objective": "Representar categorías/tokens mediante vectores aprendibles y distinguir lookup, geometría y significado.",
    "summary": [
      "Un embedding es una tabla de vectores aprendibles indexada por símbolos; similitud geométrica puede reflejar regularidades del objetivo de entrenamiento, pero no constituye significado universal.",
      "Un lookup de embedding selecciona filas de una matriz entrenable; no es one-hot materializado + multiplicación en implementación necesaria, aunque matemáticamente pueden relacionarse.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "Un embedding es una tabla de vectores aprendibles indexada por símbolos; similitud geométrica puede reflejar regularidades del objetivo de entrenamiento, pero no constituye significado universal.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Representar categorías/tokens mediante vectores aprendibles y distinguir lookup, geometría y significado.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un embedding es una tabla de vectores aprendibles indexada por símbolos; similitud geométrica puede reflejar regularidades del objetivo de entrenamiento, pero no constituye significado universal."
        },
        {
          "title": "Mecánica y límites",
          "body": "Un lookup de embedding selecciona filas de una matriz entrenable; no es one-hot materializado + multiplicación en implementación necesaria, aunque matemáticamente pueden relacionarse."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Vocabulario 10000 y embedding dim 128: parámetros de la tabla.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "1280000"
    },
    "check": {
      "question": "¿Un embedding contiene significado fijo independiente del entrenamiento?",
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
      "feedback": "Un embedding es una tabla de vectores aprendibles indexada por símbolos; similitud geométrica puede reflejar regularidades del objetivo de entrenamiento, pero no constituye significado universal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Vocabulario 10000 y embedding dim 128: parámetros de la tabla.",
        "answer": "1280000",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-representation": {
    "id": "dl-representation",
    "courseId": 62,
    "title": "Representation learning y transferencia",
    "shortTitle": "Representation learning",
    "duration": 120,
    "objective": "Explicar cómo una red aprende features internas y evaluar transferencia, invariancias y probing sin antropomorfizar representaciones.",
    "summary": [
      "Representation learning desplaza parte de la ingeniería manual de features al modelo; una representación útil conserva información relevante para tareas y descarta o transforma otra.",
      "La utilidad de una representación se evalúa por tareas, transferencia, robustez y probes; una proyección 2D o un vecino cercano no basta para atribuir conceptos humanos inequívocos.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "Representation learning desplaza parte de la ingeniería manual de features al modelo; una representación útil conserva información relevante para tareas y descarta o transforma otra.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Explicar cómo una red aprende features internas y evaluar transferencia, invariancias y probing sin antropomorfizar representaciones.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Representation learning desplaza parte de la ingeniería manual de features al modelo; una representación útil conserva información relevante para tareas y descarta o transforma otra."
        },
        {
          "title": "Mecánica y límites",
          "body": "La utilidad de una representación se evalúa por tareas, transferencia, robustez y probes; una proyección 2D o un vecino cercano no basta para atribuir conceptos humanos inequívocos."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Encoder produce vector 256 y batch 64. Escalares del batch de embeddings.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "16384"
    },
    "check": {
      "question": "¿Una feature aprendida es necesariamente interpretable para humanos?",
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
      "feedback": "Representation learning desplaza parte de la ingeniería manual de features al modelo; una representación útil conserva información relevante para tareas y descarta o transforma otra."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Encoder produce vector 256 y batch 64. Escalares del batch de embeddings.",
        "answer": "16384",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-receptive": {
    "id": "dl-receptive",
    "courseId": 62,
    "title": "Receptive fields, dilation y multiescala",
    "shortTitle": "Receptive fields",
    "duration": 115,
    "objective": "Calcular receptive fields efectivos y diseñar contexto multiescala con stride y dilation.",
    "summary": [
      "El receptive field teórico crece con capas, stride y dilation, pero la influencia efectiva de cada posición puede ser muy desigual.",
      "Dilation aumenta separación entre taps sin aumentar necesariamente parámetros. El receptive field efectivo puede concentrarse cerca del centro aunque el teórico abarque una región mayor.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "El receptive field teórico crece con capas, stride y dilation, pero la influencia efectiva de cada posición puede ser muy desigual.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Calcular receptive fields efectivos y diseñar contexto multiescala con stride y dilation.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El receptive field teórico crece con capas, stride y dilation, pero la influencia efectiva de cada posición puede ser muy desigual."
        },
        {
          "title": "Mecánica y límites",
          "body": "Dilation aumenta separación entre taps sin aumentar necesariamente parámetros. El receptive field efectivo puede concentrarse cerca del centro aunque el teórico abarque una región mayor."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Conv dilated kernel 3 con dilation 2 tiene kernel efectivo de lado.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "5"
    },
    "check": {
      "question": "¿Receptive field teórico y efectivo son siempre idénticos?",
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
      "feedback": "El receptive field teórico crece con capas, stride y dilation, pero la influencia efectiva de cada posición puede ser muy desigual."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Conv dilated kernel 3 con dilation 2 tiene kernel efectivo de lado.",
        "answer": "5",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-training-scale": {
    "id": "dl-training-scale",
    "courseId": 62,
    "title": "Entrenamiento profundo: estabilidad, residuals y escala",
    "shortTitle": "Entrenamiento profundo",
    "duration": 130,
    "objective": "Relacionar profundidad con gradient flow, residual connections, normalización, precisión y coste de memoria.",
    "summary": [
      "Entrenar redes profundas exige controlar optimización y numerics; residual connections facilitan rutas de información/gradiente, pero no hacen irrelevantes initialization, normalization o learning rate.",
      "Residual learning y normalización son técnicas distintas. Mixed precision reduce memoria/ancho de banda en muchos casos, pero necesita atención a rango, acumulación y estabilidad; checkpointing intercambia compute por memoria.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "Entrenar redes profundas exige controlar optimización y numerics; residual connections facilitan rutas de información/gradiente, pero no hacen irrelevantes initialization, normalization o learning rate.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Relacionar profundidad con gradient flow, residual connections, normalización, precisión y coste de memoria.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Entrenar redes profundas exige controlar optimización y numerics; residual connections facilitan rutas de información/gradiente, pero no hacen irrelevantes initialization, normalization o learning rate."
        },
        {
          "title": "Mecánica y límites",
          "body": "Residual learning y normalización son técnicas distintas. Mixed precision reduce memoria/ancho de banda en muchos casos, pero necesita atención a rango, acumulación y estabilidad; checkpointing intercambia compute por memoria."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Bloque residual y=F(x)+x con F(x)=3 y x=7. y.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "10"
    },
    "check": {
      "question": "¿Una residual connection hace imposible el vanishing gradient?",
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
      "feedback": "Entrenar redes profundas exige controlar optimización y numerics; residual connections facilitan rutas de información/gradiente, pero no hacen irrelevantes initialization, normalization o learning rate."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Bloque residual y=F(x)+x con F(x)=3 y x=7. y.",
        "answer": "10",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-sequence-models": {
    "id": "dl-sequence-models",
    "courseId": 62,
    "title": "Diseño de modelos secuenciales y masking",
    "shortTitle": "Secuencias",
    "duration": 120,
    "objective": "Elegir entre recurrencia, attention y representaciones temporales atendiendo a causalidad, masking, longitud y coste.",
    "summary": [
      "Modelar secuencias exige declarar qué posiciones pueden consultar a cuáles; causal masking es una restricción de información, no una propiedad automática de toda attention.",
      "Causal, bidireccional y padding masks responden a restricciones diferentes. Elegir RNN, gated RNN o attention exige considerar dependencia, paralelismo, longitud, memoria y latencia.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "Modelar secuencias exige declarar qué posiciones pueden consultar a cuáles; causal masking es una restricción de información, no una propiedad automática de toda attention.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Elegir entre recurrencia, attention y representaciones temporales atendiendo a causalidad, masking, longitud y coste.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Modelar secuencias exige declarar qué posiciones pueden consultar a cuáles; causal masking es una restricción de información, no una propiedad automática de toda attention."
        },
        {
          "title": "Mecánica y límites",
          "body": "Causal, bidireccional y padding masks responden a restricciones diferentes. Elegir RNN, gated RNN o attention exige considerar dependencia, paralelismo, longitud, memoria y latencia."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Secuencia causal de longitud 6: posiciones previas o iguales visibles para la posición índice 4 en indexación desde 0.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "5"
    },
    "check": {
      "question": "¿Attention es causal automáticamente?",
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
      "feedback": "Modelar secuencias exige declarar qué posiciones pueden consultar a cuáles; causal masking es una restricción de información, no una propiedad automática de toda attention."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Secuencia causal de longitud 6: posiciones previas o iguales visibles para la posición índice 4 en indexación desde 0.",
        "answer": "5",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  },
  "dl-integration": {
    "id": "dl-integration",
    "courseId": 62,
    "title": "Proyecto: CNN + encoder secuencial + representación aprendida",
    "shortTitle": "Proyecto Deep Learning",
    "duration": 150,
    "objective": "Diseñar, entrenar y auditar un sistema deep completo con shapes, baseline, métricas, ablations y presupuestos de cómputo.",
    "summary": [
      "Un proyecto deep learning reproducible conecta datos, arquitectura, objective, optimizer, evaluación y profiling; la mejora debe demostrarse con controles y no atribuirse automáticamente a la parte más llamativa del modelo.",
      "Una ablation elimina o sustituye un componente manteniendo comparables los demás factores. Sin controles, una mejora conjunta no identifica causalmente qué módulo produjo el cambio.",
      "Mide shapes, parámetros, memoria, latencia y métricas de generalización por separado; una mejora en una dimensión no garantiza las demás."
    ],
    "concept": "Un proyecto deep learning reproducible conecta datos, arquitectura, objective, optimizer, evaluación y profiling; la mejora debe demostrarse con controles y no atribuirse automáticamente a la parte más llamativa del modelo.",
    "rules": [
      "Escribe shapes y ejes antes de implementar una operación tensorial.",
      "Separa propiedades arquitectónicas de resultados empíricos: ninguna capa garantiza por sí sola generalización o estabilidad.",
      "Compara contra un baseline y usa ablations/perfiles antes de atribuir mejoras a un componente."
    ],
    "deep": {
      "intro": "Diseñar, entrenar y auditar un sistema deep completo con shapes, baseline, métricas, ablations y presupuestos de cómputo.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un proyecto deep learning reproducible conecta datos, arquitectura, objective, optimizer, evaluación y profiling; la mejora debe demostrarse con controles y no atribuirse automáticamente a la parte más llamativa del modelo."
        },
        {
          "title": "Mecánica y límites",
          "body": "Una ablation elimina o sustituye un componente manteniendo comparables los demás factores. Sin controles, una mejora conjunta no identifica causalmente qué módulo produjo el cambio."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba shapes, coste por batch/secuencia, activaciones retenidas para backward, estabilidad numérica y comportamiento train/eval. En secuencias declara masking y estado; en visión declara padding/stride/dilation."
        },
        {
          "title": "Validación",
          "body": "Construye un caso diminuto calculable a mano, añade tests de shape y luego compara baseline/ablation. Reporta tanto objective de training como métrica externa y coste."
        }
      ]
    },
    "example": {
      "problem": "Baseline 0.72 y modelo 0.81 accuracy. Mejora en puntos porcentuales.",
      "steps": [
        "Identifica la fórmula o shape relevante.",
        "Calcula el resultado y comprueba la interpretación, no solo el número."
      ],
      "solution": "9"
    },
    "check": {
      "question": "¿Una mejora total prueba por sí sola que attention fue la causa?",
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
      "feedback": "Un proyecto deep learning reproducible conecta datos, arquitectura, objective, optimizer, evaluación y profiling; la mejora debe demostrarse con controles y no atribuirse automáticamente a la parte más llamativa del modelo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Baseline 0.72 y modelo 0.81 accuracy. Mejora en puntos porcentuales.",
        "answer": "9",
        "hint": "Usa la fórmula o relación indicada en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad o profundidad garantiza mejor generalización?",
        "answer": "no",
        "hint": "Capacidad, optimización y generalización son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes comparar shapes, coste y baseline antes de atribuir una mejora a la arquitectura?",
        "answer": "si",
        "hint": "Una explicación causal necesita controles y medición."
      }
    ]
  }
});
