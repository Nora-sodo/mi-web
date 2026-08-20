/**
 * BLOQUE 064 — LARGE LANGUAGE MODELS
 *
 * Regla editorial: un LLM no es solo una arquitectura Transformer. Separamos
 * tokenizer, datos, objetivo, adaptación, decoding y sistemas de serving/training.
 */
window.LEARNING_PATHS[64] = {
  "level": "Large Language Models",
  "estimatedHours": 210,
  "description": "LLM de extremo a extremo: tokenización, objetivo autoregresivo, escala, inferencia/decoding, contexto/KV cache, adaptación, RAG, cuantización y entrenamiento distribuido.",
  "outcomes": [
    "Derivar el objetivo de next-token prediction y separar arquitectura Transformer, tokenizer, datos y objetivo.",
    "Analizar inferencia autoregresiva, sampling, contexto y KV cache con métricas de latencia, memoria y throughput.",
    "Distinguir pretraining, fine-tuning, instruction tuning, preference optimization y RAG por el dato/objetivo que modifican.",
    "Construir y entrenar un Transformer pequeño propio con pipeline reproducible y explicar sus costes de sistema."
  ],
  "modules": [
    {
      "id": "m1-objective",
      "title": "Representación y objetivo",
      "description": "Representación y objetivo",
      "lessons": [
        "llm-tokenization",
        "llm-language-modeling",
        "llm-pretraining",
        "llm-next-token"
      ]
    },
    {
      "id": "m2-scale-inference",
      "title": "Escala e inferencia",
      "description": "Escala e inferencia",
      "lessons": [
        "llm-scaling",
        "llm-inference",
        "llm-sampling",
        "llm-temperature",
        "llm-topk",
        "llm-topp",
        "llm-context"
      ]
    },
    {
      "id": "m3-adaptation",
      "title": "Adaptación y conocimiento externo",
      "description": "Adaptación y conocimiento externo",
      "lessons": [
        "llm-kv-cache",
        "llm-finetuning",
        "llm-instruction",
        "llm-preference",
        "llm-rag",
        "llm-quantization"
      ]
    },
    {
      "id": "m4-systems",
      "title": "Escala de sistema y proyecto",
      "description": "Escala de sistema y proyecto",
      "lessons": [
        "llm-distributed",
        "llm-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "llm-tokenization": {
    "id": "llm-tokenization",
    "courseId": 64,
    "title": "Tokenization para LLM",
    "shortTitle": "Tokenization",
    "duration": 125,
    "objective": "Entender cómo el tokenizer define la interfaz discreta del modelo y por qué vocabulario, longitud y bytes no son equivalentes.",
    "summary": [
      "Tokenización es parte del contrato del modelo: IDs diferentes apuntan a filas diferentes del embedding.",
      "La misma cadena puede producir distinto número de tokens con tokenizers distintos; normalización y tratamiento de bytes importan.",
      "Versiona tokenizer junto al checkpoint: cambiarlo rompe directamente la interpretación de los IDs."
    ],
    "concept": "El tokenizer transforma entradas en IDs; cambia la longitud efectiva, el vocabulario y la compatibilidad con embeddings.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Entender cómo el tokenizer define la interfaz discreta del modelo y por qué vocabulario, longitud y bytes no son equivalentes.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Tokenización es parte del contrato del modelo: IDs diferentes apuntan a filas diferentes del embedding."
        },
        {
          "title": "Mecánica y límites",
          "body": "La misma cadena puede producir distinto número de tokens con tokenizers distintos; normalización y tratamiento de bytes importan."
        },
        {
          "title": "Ingeniería",
          "body": "Versiona tokenizer junto al checkpoint: cambiarlo rompe directamente la interpretación de los IDs."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Un texto de 120 palabras produce 156 tokens. Ratio tokens/palabra.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "1.3"
    },
    "check": {
      "question": "¿Un token equivale siempre a una palabra?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "El tokenizer transforma entradas en IDs; cambia la longitud efectiva, el vocabulario y la compatibilidad con embeddings."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un texto de 120 palabras produce 156 tokens. Ratio tokens/palabra.",
        "answer": "1.3",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un token equivale siempre a una palabra?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-language-modeling": {
    "id": "llm-language-modeling",
    "courseId": 64,
    "title": "Language modeling",
    "shortTitle": "Language modeling",
    "duration": 125,
    "objective": "Formular el modelado de lenguaje como estimación de distribuciones sobre secuencias y distinguir probabilidad conjunta de predicción local.",
    "summary": [
      "La regla de la cadena permite escribir p(x1…xn)=∏ p(xt|x<t) en un modelo autoregresivo.",
      "Cross-entropy mide ajuste probabilístico; perplexity es una transformación de esa loss bajo convenciones concretas.",
      "Evalúa por dominio y longitud: una media global puede ocultar degradaciones importantes."
    ],
    "concept": "La regla de la cadena factoriza una secuencia como producto de probabilidades condicionales; el objetivo depende del contrato causal o de enmascarado.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Formular el modelado de lenguaje como estimación de distribuciones sobre secuencias y distinguir probabilidad conjunta de predicción local.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La regla de la cadena permite escribir p(x1…xn)=∏ p(xt|x<t) en un modelo autoregresivo."
        },
        {
          "title": "Mecánica y límites",
          "body": "Cross-entropy mide ajuste probabilístico; perplexity es una transformación de esa loss bajo convenciones concretas."
        },
        {
          "title": "Ingeniería",
          "body": "Evalúa por dominio y longitud: una media global puede ocultar degradaciones importantes."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Probabilidades 0.5,0.25,0.8 para tres pasos. Probabilidad conjunta.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "0.1"
    },
    "check": {
      "question": "¿Un language model necesita asignar probabilidad a secuencias?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "La regla de la cadena factoriza una secuencia como producto de probabilidades condicionales; el objetivo depende del contrato causal o de enmascarado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Probabilidades 0.5,0.25,0.8 para tres pasos. Probabilidad conjunta.",
        "answer": "0.1",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un language model necesita asignar probabilidad a secuencias?",
        "answer": "si",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-pretraining": {
    "id": "llm-pretraining",
    "courseId": 64,
    "title": "Pretraining",
    "shortTitle": "Pretraining",
    "duration": 125,
    "objective": "Entender pretraining como optimización a gran escala sobre un objetivo previo a la adaptación y distinguir datos, objetivo y arquitectura.",
    "summary": [
      "Pretraining aprende parámetros a partir de un objetivo amplio antes de una adaptación específica.",
      "Datos duplicados, contaminación de evaluación, calidad, mezcla de dominios y tokenización cambian el resultado tanto como el número bruto de tokens.",
      "Registra procedencia, filtrado y versiones; 'más datos' no significa automáticamente 'más señal'."
    ],
    "concept": "Pretraining ajusta parámetros con un objetivo amplio sobre gran cantidad de datos; no implica instruction-following ni conocimiento perfecto.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Entender pretraining como optimización a gran escala sobre un objetivo previo a la adaptación y distinguir datos, objetivo y arquitectura.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Pretraining aprende parámetros a partir de un objetivo amplio antes de una adaptación específica."
        },
        {
          "title": "Mecánica y límites",
          "body": "Datos duplicados, contaminación de evaluación, calidad, mezcla de dominios y tokenización cambian el resultado tanto como el número bruto de tokens."
        },
        {
          "title": "Ingeniería",
          "body": "Registra procedencia, filtrado y versiones; 'más datos' no significa automáticamente 'más señal'."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Dataset de 12B tokens durante 2 epochs. Tokens vistos.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "24000000000"
    },
    "check": {
      "question": "¿Pretraining e instruction tuning son la misma fase?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Pretraining ajusta parámetros con un objetivo amplio sobre gran cantidad de datos; no implica instruction-following ni conocimiento perfecto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Dataset de 12B tokens durante 2 epochs. Tokens vistos.",
        "answer": "24000000000",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Pretraining e instruction tuning son la misma fase?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-next-token": {
    "id": "llm-next-token",
    "courseId": 64,
    "title": "Next-token prediction",
    "shortTitle": "Next token",
    "duration": 125,
    "objective": "Derivar el objetivo autoregresivo next-token y entender teacher forcing, shift de targets y causalidad del entrenamiento.",
    "summary": [
      "En un decoder causal se desplazan input y targets para que cada posición prediga la siguiente.",
      "Teacher forcing permite calcular muchas pérdidas en paralelo durante training aunque generation sea autoregresiva.",
      "Comprueba que el mask impida leakage del token objetivo y que padding no contribuya a la loss."
    ],
    "concept": "En next-token prediction, la entrada hasta t predice el token t+1; la causal mask evita consultar el target futuro durante el forward.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Derivar el objetivo autoregresivo next-token y entender teacher forcing, shift de targets y causalidad del entrenamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "En un decoder causal se desplazan input y targets para que cada posición prediga la siguiente."
        },
        {
          "title": "Mecánica y límites",
          "body": "Teacher forcing permite calcular muchas pérdidas en paralelo durante training aunque generation sea autoregresiva."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba que el mask impida leakage del token objetivo y que padding no contribuya a la loss."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Secuencia de 1024 tokens usada completa en training autoregresivo. Pares input-target disponibles.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "1023"
    },
    "check": {
      "question": "¿El target del paso t puede filtrarse dentro de la entrada causal del mismo paso?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "En next-token prediction, la entrada hasta t predice el token t+1; la causal mask evita consultar el target futuro durante el forward."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Secuencia de 1024 tokens usada completa en training autoregresivo. Pares input-target disponibles.",
        "answer": "1023",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El target del paso t puede filtrarse dentro de la entrada causal del mismo paso?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-scaling": {
    "id": "llm-scaling",
    "courseId": 64,
    "title": "Scaling laws y presupuestos",
    "shortTitle": "Scaling",
    "duration": 125,
    "objective": "Razonar sobre escala de parámetros, datos y cómputo sin convertir leyes empíricas en garantías universales.",
    "summary": [
      "Escalar es asignar un presupuesto entre parámetros, datos y compute, no maximizar una sola variable.",
      "Las scaling laws son empíricas y dependen del régimen experimental; extrapolarlas fuera de él exige cautela.",
      "Compara modelos con FLOPs/tokens/calidad y no solo con parameter count."
    ],
    "concept": "Scaling laws describen tendencias empíricas bajo regímenes concretos; tamaño, tokens y compute deben analizarse conjuntamente.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Razonar sobre escala de parámetros, datos y cómputo sin convertir leyes empíricas en garantías universales.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Escalar es asignar un presupuesto entre parámetros, datos y compute, no maximizar una sola variable."
        },
        {
          "title": "Mecánica y límites",
          "body": "Las scaling laws son empíricas y dependen del régimen experimental; extrapolarlas fuera de él exige cautela."
        },
        {
          "title": "Ingeniería",
          "body": "Compara modelos con FLOPs/tokens/calidad y no solo con parameter count."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Modelo 7B parámetros entrenado con 140B tokens. Tokens por parámetro.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "20"
    },
    "check": {
      "question": "¿Más parámetros garantizan mejor modelo con datos y cómputo fijos?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Scaling laws describen tendencias empíricas bajo regímenes concretos; tamaño, tokens y compute deben analizarse conjuntamente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Modelo 7B parámetros entrenado con 140B tokens. Tokens por parámetro.",
        "answer": "20",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más parámetros garantizan mejor modelo con datos y cómputo fijos?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-inference": {
    "id": "llm-inference",
    "courseId": 64,
    "title": "Inference autoregresiva",
    "shortTitle": "Inference",
    "duration": 125,
    "objective": "Separar prefill y decode, logits y selección de token, y entender por qué inferencia autoregresiva es secuencial entre tokens generados.",
    "summary": [
      "Prefill procesa el prompt; decode genera nuevos tokens de forma autoregresiva.",
      "Throughput de batch y latencia de un usuario son objetivos distintos; la memoria puede dominar por weights y KV cache.",
      "Mide TTFT, time-per-output-token y tokens/s por configuración."
    ],
    "concept": "Inference genera logits, selecciona un token y lo reincorpora al contexto; cada nuevo token depende de los anteriores.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Separar prefill y decode, logits y selección de token, y entender por qué inferencia autoregresiva es secuencial entre tokens generados.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Prefill procesa el prompt; decode genera nuevos tokens de forma autoregresiva."
        },
        {
          "title": "Mecánica y límites",
          "body": "Throughput de batch y latencia de un usuario son objetivos distintos; la memoria puede dominar por weights y KV cache."
        },
        {
          "title": "Ingeniería",
          "body": "Mide TTFT, time-per-output-token y tokens/s por configuración."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Prefill 80 ms y 20 tokens de decode a 12 ms/token. Latencia total ms.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "320"
    },
    "check": {
      "question": "¿Generar 100 tokens autoregresivos permite conocer el token 100 antes del 99?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Inference genera logits, selecciona un token y lo reincorpora al contexto; cada nuevo token depende de los anteriores."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Prefill 80 ms y 20 tokens de decode a 12 ms/token. Latencia total ms.",
        "answer": "320",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Generar 100 tokens autoregresivos permite conocer el token 100 antes del 99?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-sampling": {
    "id": "llm-sampling",
    "courseId": 64,
    "title": "Sampling y decodificación",
    "shortTitle": "Sampling",
    "duration": 125,
    "objective": "Comparar greedy, sampling y búsqueda limitada, distinguiendo distribución del modelo de política de decodificación.",
    "summary": [
      "Greedy toma argmax; sampling extrae según una distribución transformada; beam/search es otra política.",
      "Decoding puede cambiar diversidad, repetición y probabilidad de errores sin cambiar el modelo subyacente.",
      "Evalúa con seeds y múltiples muestras cuando el método es estocástico."
    ],
    "concept": "El modelo produce logits/probabilidades; sampling es una política externa de selección y puede modificar diversidad sin reentrenar pesos.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Comparar greedy, sampling y búsqueda limitada, distinguiendo distribución del modelo de política de decodificación.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Greedy toma argmax; sampling extrae según una distribución transformada; beam/search es otra política."
        },
        {
          "title": "Mecánica y límites",
          "body": "Decoding puede cambiar diversidad, repetición y probabilidad de errores sin cambiar el modelo subyacente."
        },
        {
          "title": "Ingeniería",
          "body": "Evalúa con seeds y múltiples muestras cuando el método es estocástico."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Distribución 0.6,0.3,0.1. Probabilidad de seleccionar una de las dos opciones más probables sin truncar.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "0.9"
    },
    "check": {
      "question": "¿Sampling cambia los pesos del modelo?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "El modelo produce logits/probabilidades; sampling es una política externa de selección y puede modificar diversidad sin reentrenar pesos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Distribución 0.6,0.3,0.1. Probabilidad de seleccionar una de las dos opciones más probables sin truncar.",
        "answer": "0.9",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Sampling cambia los pesos del modelo?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-temperature": {
    "id": "llm-temperature",
    "courseId": 64,
    "title": "Temperature",
    "shortTitle": "Temperature",
    "duration": 125,
    "objective": "Entender cómo temperature reescala logits y cómo modifica entropía sin crear conocimiento nuevo.",
    "summary": [
      "T reescala logits antes de softmax y cambia concentración relativa.",
      "T→0 aproxima selección muy concentrada; T alta aplana, pero no vuelve correctos tokens improbables por conocimiento nuevo.",
      "Aplica temperature antes de truncaciones según el pipeline declarado y documenta el orden."
    ],
    "concept": "Temperature aplica logits/T antes de softmax: T<1 suele concentrar y T>1 suele aplanar la distribución, salvo degeneraciones.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Entender cómo temperature reescala logits y cómo modifica entropía sin crear conocimiento nuevo.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "T reescala logits antes de softmax y cambia concentración relativa."
        },
        {
          "title": "Mecánica y límites",
          "body": "T→0 aproxima selección muy concentrada; T alta aplana, pero no vuelve correctos tokens improbables por conocimiento nuevo."
        },
        {
          "title": "Ingeniería",
          "body": "Aplica temperature antes de truncaciones según el pipeline declarado y documenta el orden."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Logits 4 y 2 con T=2. Diferencia entre logits reescalados.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "1"
    },
    "check": {
      "question": "¿Temperature añade información que no está en los logits?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Temperature aplica logits/T antes de softmax: T<1 suele concentrar y T>1 suele aplanar la distribución, salvo degeneraciones."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Logits 4 y 2 con T=2. Diferencia entre logits reescalados.",
        "answer": "1",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Temperature añade información que no está en los logits?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-topk": {
    "id": "llm-topk",
    "courseId": 64,
    "title": "Top-k sampling",
    "shortTitle": "Top-k",
    "duration": 125,
    "objective": "Entender top-k como truncación por rango y distinguirlo de top-p y temperature.",
    "summary": [
      "Top-k elimina todos salvo los k candidatos mejor puntuados y renormaliza.",
      "Con una distribución plana o muy concentrada, la masa retenida puede variar mucho aun con el mismo k.",
      "k es un hiperparámetro de decoding, no una propiedad entrenada en los pesos."
    ],
    "concept": "Top-k conserva exactamente hasta k candidatos de mayor score antes de renormalizar; no garantiza una masa de probabilidad fija.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Entender top-k como truncación por rango y distinguirlo de top-p y temperature.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Top-k elimina todos salvo los k candidatos mejor puntuados y renormaliza."
        },
        {
          "title": "Mecánica y límites",
          "body": "Con una distribución plana o muy concentrada, la masa retenida puede variar mucho aun con el mismo k."
        },
        {
          "title": "Ingeniería",
          "body": "k es un hiperparámetro de decoding, no una propiedad entrenada en los pesos."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Vocabulario 50000 y top-k=40. Candidatos máximos tras truncar.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "40"
    },
    "check": {
      "question": "¿Top-k=40 garantiza conservar al menos 90% de masa original?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Top-k conserva exactamente hasta k candidatos de mayor score antes de renormalizar; no garantiza una masa de probabilidad fija."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Vocabulario 50000 y top-k=40. Candidatos máximos tras truncar.",
        "answer": "40",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Top-k=40 garantiza conservar al menos 90% de masa original?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-topp": {
    "id": "llm-topp",
    "courseId": 64,
    "title": "Top-p / nucleus sampling",
    "shortTitle": "Top-p",
    "duration": 125,
    "objective": "Entender top-p como conjunto mínimo ordenado que acumula una masa objetivo y por qué su tamaño varía por paso.",
    "summary": [
      "Nucleus sampling elige un conjunto dinámico cuya masa acumulada alcanza p.",
      "Top-p y top-k pueden combinarse, pero el orden y la implementación deben declararse.",
      "p cercano a 1 no equivale exactamente a sampling sin truncar si existen otros filtros."
    ],
    "concept": "Top-p conserva un prefijo de tokens ordenados por probabilidad cuya masa acumulada alcanza p; el número de candidatos es dinámico.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Entender top-p como conjunto mínimo ordenado que acumula una masa objetivo y por qué su tamaño varía por paso.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Nucleus sampling elige un conjunto dinámico cuya masa acumulada alcanza p."
        },
        {
          "title": "Mecánica y límites",
          "body": "Top-p y top-k pueden combinarse, pero el orden y la implementación deben declararse."
        },
        {
          "title": "Ingeniería",
          "body": "p cercano a 1 no equivale exactamente a sampling sin truncar si existen otros filtros."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Probabilidades ordenadas .5,.25,.15,.1 y p=.8. Número mínimo de tokens conservados.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "3"
    },
    "check": {
      "question": "¿Top-p conserva siempre el mismo número de tokens?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Top-p conserva un prefijo de tokens ordenados por probabilidad cuya masa acumulada alcanza p; el número de candidatos es dinámico."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Probabilidades ordenadas .5,.25,.15,.1 y p=.8. Número mínimo de tokens conservados.",
        "answer": "3",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Top-p conserva siempre el mismo número de tokens?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-context": {
    "id": "llm-context",
    "courseId": 64,
    "title": "Context windows",
    "shortTitle": "Context",
    "duration": 125,
    "objective": "Entender qué limita una ventana de contexto y distinguir tokens disponibles de memoria factual, atención efectiva o almacenamiento externo.",
    "summary": [
      "Context window es capacidad de posiciones de entrada/salida de una ejecución, no memoria permanente del sistema.",
      "Más longitud incrementa memoria y, para atención densa, puede incrementar fuertemente el coste computacional.",
      "Distingue límite máximo, longitud efectiva de trabajo y calidad al recuperar información distante."
    ],
    "concept": "La ventana de contexto limita cuántas posiciones puede procesar una invocación según arquitectura/configuración; no equivale a memoria permanente.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Entender qué limita una ventana de contexto y distinguir tokens disponibles de memoria factual, atención efectiva o almacenamiento externo.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Context window es capacidad de posiciones de entrada/salida de una ejecución, no memoria permanente del sistema."
        },
        {
          "title": "Mecánica y límites",
          "body": "Más longitud incrementa memoria y, para atención densa, puede incrementar fuertemente el coste computacional."
        },
        {
          "title": "Ingeniería",
          "body": "Distingue límite máximo, longitud efectiva de trabajo y calidad al recuperar información distante."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Ventana 8192; prompt 5300; reserva de salida 1200. Tokens libres restantes.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "1692"
    },
    "check": {
      "question": "¿Una ventana mayor garantiza que el modelo use perfectamente todo el contexto?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "La ventana de contexto limita cuántas posiciones puede procesar una invocación según arquitectura/configuración; no equivale a memoria permanente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Ventana 8192; prompt 5300; reserva de salida 1200. Tokens libres restantes.",
        "answer": "1692",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una ventana mayor garantiza que el modelo use perfectamente todo el contexto?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-kv-cache": {
    "id": "llm-kv-cache",
    "courseId": 64,
    "title": "KV cache",
    "shortTitle": "KV cache",
    "duration": 125,
    "objective": "Derivar qué reutiliza KV cache en decoders autoregresivos y separar ahorro de cómputo de coste de memoria.",
    "summary": [
      "En decoder autoregresivo, los K/V de tokens previos no cambian para capas causales estándar y pueden reutilizarse.",
      "La cache reduce recomputación pero introduce un coste de memoria que escala con longitud y arquitectura.",
      "Batching, multi-query/grouped-query y formatos de precisión cambian la huella; no asumas una fórmula universal sin declarar shapes."
    ],
    "concept": "KV cache guarda keys/values previos por capa para evitar recomputarlos en cada token; crece con secuencia, capas, heads relevantes y dimensión.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Derivar qué reutiliza KV cache en decoders autoregresivos y separar ahorro de cómputo de coste de memoria.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "En decoder autoregresivo, los K/V de tokens previos no cambian para capas causales estándar y pueden reutilizarse."
        },
        {
          "title": "Mecánica y límites",
          "body": "La cache reduce recomputación pero introduce un coste de memoria que escala con longitud y arquitectura."
        },
        {
          "title": "Ingeniería",
          "body": "Batching, multi-query/grouped-query y formatos de precisión cambian la huella; no asumas una fórmula universal sin declarar shapes."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Cache usa 2 KiB por token por capa en 24 capas. Para 1000 tokens, MiB aproximados usando 1024 KiB/MiB.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "46.875"
    },
    "check": {
      "question": "¿KV cache elimina la atención sobre tokens previos?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "KV cache guarda keys/values previos por capa para evitar recomputarlos en cada token; crece con secuencia, capas, heads relevantes y dimensión."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Cache usa 2 KiB por token por capa en 24 capas. Para 1000 tokens, MiB aproximados usando 1024 KiB/MiB.",
        "answer": "46.875",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿KV cache elimina la atención sobre tokens previos?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-finetuning": {
    "id": "llm-finetuning",
    "courseId": 64,
    "title": "Fine-tuning",
    "shortTitle": "Fine-tuning",
    "duration": 125,
    "objective": "Distinguir full fine-tuning de adaptación parcial y entender riesgo de forgetting, distribución y evaluación.",
    "summary": [
      "Fine-tuning adapta un modelo preentrenado a otra distribución/objetivo.",
      "Full FT y métodos parameter-efficient tienen costes y capacidad distintos; ninguno garantiza ausencia de catastrophic forgetting.",
      "Evalúa tanto la tarea nueva como capacidades que quieras preservar."
    ],
    "concept": "Fine-tuning continúa optimizando parámetros sobre datos/objetivo más específicos; puede modificar comportamiento y no garantiza conservar todas las capacidades previas.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Distinguir full fine-tuning de adaptación parcial y entender riesgo de forgetting, distribución y evaluación.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Fine-tuning adapta un modelo preentrenado a otra distribución/objetivo."
        },
        {
          "title": "Mecánica y límites",
          "body": "Full FT y métodos parameter-efficient tienen costes y capacidad distintos; ninguno garantiza ausencia de catastrophic forgetting."
        },
        {
          "title": "Ingeniería",
          "body": "Evalúa tanto la tarea nueva como capacidades que quieras preservar."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Modelo 2B parámetros, se actualiza 1% mediante adaptación parcial. Parámetros actualizados.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "20000000"
    },
    "check": {
      "question": "¿Fine-tuning significa siempre actualizar todos los parámetros?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Fine-tuning continúa optimizando parámetros sobre datos/objetivo más específicos; puede modificar comportamiento y no garantiza conservar todas las capacidades previas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Modelo 2B parámetros, se actualiza 1% mediante adaptación parcial. Parámetros actualizados.",
        "answer": "20000000",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Fine-tuning significa siempre actualizar todos los parámetros?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-instruction": {
    "id": "llm-instruction",
    "courseId": 64,
    "title": "Instruction tuning",
    "shortTitle": "Instruction tuning",
    "duration": 125,
    "objective": "Entender instruction tuning como adaptación supervisada a pares instrucción-respuesta y distinguirla de pretraining autoregresivo genérico.",
    "summary": [
      "SFT con instrucciones enseña formatos y conductas a partir de demostraciones supervisadas.",
      "Instruction following depende de datos, mezcla, objective y evaluación, no de añadir un token llamado 'instruction'.",
      "Evita leakage entre variantes casi duplicadas de prompts en train y eval."
    ],
    "concept": "Instruction tuning cambia la distribución de tareas y formatos de respuesta mediante ejemplos supervisados; no es una propiedad arquitectónica del Transformer.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Entender instruction tuning como adaptación supervisada a pares instrucción-respuesta y distinguirla de pretraining autoregresivo genérico.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "SFT con instrucciones enseña formatos y conductas a partir de demostraciones supervisadas."
        },
        {
          "title": "Mecánica y límites",
          "body": "Instruction following depende de datos, mezcla, objective y evaluación, no de añadir un token llamado 'instruction'."
        },
        {
          "title": "Ingeniería",
          "body": "Evita leakage entre variantes casi duplicadas de prompts en train y eval."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Dataset 250000 ejemplos; batch 125. Steps por epoch ignorando remainder.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "2000"
    },
    "check": {
      "question": "¿Instruction tuning y pretraining usan necesariamente el mismo tipo de ejemplo?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Instruction tuning cambia la distribución de tareas y formatos de respuesta mediante ejemplos supervisados; no es una propiedad arquitectónica del Transformer."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Dataset 250000 ejemplos; batch 125. Steps por epoch ignorando remainder.",
        "answer": "2000",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Instruction tuning y pretraining usan necesariamente el mismo tipo de ejemplo?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-preference": {
    "id": "llm-preference",
    "courseId": 64,
    "title": "Preference optimization",
    "shortTitle": "Preference optimization",
    "duration": 125,
    "objective": "Entender datos de preferencias, reward/preference models y optimización directa sin presentar una familia concreta como requisito universal.",
    "summary": [
      "Los datos de preferencias expresan comparaciones o puntuaciones; pueden ser ruidosos, inconsistentes o dependientes del criterio.",
      "RLHF es una familia de pipelines, mientras técnicas directas de preference optimization pueden evitar un loop RL online.",
      "No confundas optimizar una señal de preferencia con demostrar verdad factual o seguridad universal."
    ],
    "concept": "Preference optimization usa comparaciones o señales de preferencia para favorecer respuestas deseadas; distintas técnicas implementan objetivos diferentes.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Entender datos de preferencias, reward/preference models y optimización directa sin presentar una familia concreta como requisito universal.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Los datos de preferencias expresan comparaciones o puntuaciones; pueden ser ruidosos, inconsistentes o dependientes del criterio."
        },
        {
          "title": "Mecánica y límites",
          "body": "RLHF es una familia de pipelines, mientras técnicas directas de preference optimization pueden evitar un loop RL online."
        },
        {
          "title": "Ingeniería",
          "body": "No confundas optimizar una señal de preferencia con demostrar verdad factual o seguridad universal."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "120000 pares de preferencia, 15% reservados para validación. Pares de entrenamiento.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "102000"
    },
    "check": {
      "question": "¿Preference optimization implica necesariamente RL online?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Preference optimization usa comparaciones o señales de preferencia para favorecer respuestas deseadas; distintas técnicas implementan objetivos diferentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "120000 pares de preferencia, 15% reservados para validación. Pares de entrenamiento.",
        "answer": "102000",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Preference optimization implica necesariamente RL online?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-rag": {
    "id": "llm-rag",
    "courseId": 64,
    "title": "Retrieval-Augmented Generation",
    "shortTitle": "RAG",
    "duration": 125,
    "objective": "Separar retrieval, contexto recuperado y generación; razonar sobre recall, ranking, grounding, provenance y fallos del retriever.",
    "summary": [
      "RAG separa retriever/index de generador: primero recupera evidencia, luego la incorpora al contexto de generación.",
      "Fallo de retrieval, chunking o ranking puede impedir responder aunque la fuente correcta exista en la colección.",
      "Mide retrieval recall/precision y respuesta por separado; provenance debe conservar qué evidencia se usó."
    ],
    "concept": "RAG combina memoria paramétrica con información recuperada externamente; el generador solo puede usar correctamente evidencia que se recupera y se incorpora de forma adecuada.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Separar retrieval, contexto recuperado y generación; razonar sobre recall, ranking, grounding, provenance y fallos del retriever.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "RAG separa retriever/index de generador: primero recupera evidencia, luego la incorpora al contexto de generación."
        },
        {
          "title": "Mecánica y límites",
          "body": "Fallo de retrieval, chunking o ranking puede impedir responder aunque la fuente correcta exista en la colección."
        },
        {
          "title": "Ingeniería",
          "body": "Mide retrieval recall/precision y respuesta por separado; provenance debe conservar qué evidencia se usó."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Retriever devuelve 8 chunks de 420 tokens. Tokens recuperados brutos.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "3360"
    },
    "check": {
      "question": "¿RAG actualiza automáticamente los pesos del modelo en cada consulta?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "RAG combina memoria paramétrica con información recuperada externamente; el generador solo puede usar correctamente evidencia que se recupera y se incorpora de forma adecuada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Retriever devuelve 8 chunks de 420 tokens. Tokens recuperados brutos.",
        "answer": "3360",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿RAG actualiza automáticamente los pesos del modelo en cada consulta?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-quantization": {
    "id": "llm-quantization",
    "courseId": 64,
    "title": "Quantization",
    "shortTitle": "Quantization",
    "duration": 125,
    "objective": "Entender cuantización de pesos/activaciones como intercambio precisión-memoria-throughput y distinguir bit-width nominal de coste total del sistema.",
    "summary": [
      "Quantization representa valores con menos bits o formatos más compactos mediante escalas/grupos y, a veces, outliers especiales.",
      "Weight-only, activation quantization y KV-cache quantization son problemas distintos.",
      "Mide calidad, memoria y latencia en el hardware real: menor bit-width no garantiza kernel más rápido."
    ],
    "concept": "Cuantizar reduce bits por valor pero requiere escalas, metadata, kernels y puede introducir error; el ahorro real depende del formato y hardware.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Entender cuantización de pesos/activaciones como intercambio precisión-memoria-throughput y distinguir bit-width nominal de coste total del sistema.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Quantization representa valores con menos bits o formatos más compactos mediante escalas/grupos y, a veces, outliers especiales."
        },
        {
          "title": "Mecánica y límites",
          "body": "Weight-only, activation quantization y KV-cache quantization son problemas distintos."
        },
        {
          "title": "Ingeniería",
          "body": "Mide calidad, memoria y latencia en el hardware real: menor bit-width no garantiza kernel más rápido."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "1B pesos: FP16 usa 2 bytes/peso; int8 ideal usa 1. Ahorro ideal en GB decimales.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "1"
    },
    "check": {
      "question": "¿Int8 hace que todo el modelo ocupe exactamente la mitad sin overhead?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Cuantizar reduce bits por valor pero requiere escalas, metadata, kernels y puede introducir error; el ahorro real depende del formato y hardware."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "1B pesos: FP16 usa 2 bytes/peso; int8 ideal usa 1. Ahorro ideal en GB decimales.",
        "answer": "1",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Int8 hace que todo el modelo ocupe exactamente la mitad sin overhead?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-distributed": {
    "id": "llm-distributed",
    "courseId": 64,
    "title": "Distributed training",
    "shortTitle": "Distributed training",
    "duration": 125,
    "objective": "Distinguir data, tensor y pipeline parallelism; entender comunicación, sincronización, memoria y eficiencia de escala.",
    "summary": [
      "Data parallel replica pesos y divide batches; tensor parallel divide operaciones/tensores; pipeline parallel divide capas/etapas.",
      "All-reduce, all-gather y transferencias entre etapas pueden dominar al escalar.",
      "Mide scaling efficiency y memoria por worker; más dispositivos pueden empeorar coste/eficiencia si la comunicación domina."
    ],
    "concept": "Entrenar distribuido reparte datos, parámetros o capas; añadir aceleradores introduce comunicación y no garantiza speedup lineal.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Distinguir data, tensor y pipeline parallelism; entender comunicación, sincronización, memoria y eficiencia de escala.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Data parallel replica pesos y divide batches; tensor parallel divide operaciones/tensores; pipeline parallel divide capas/etapas."
        },
        {
          "title": "Mecánica y límites",
          "body": "All-reduce, all-gather y transferencias entre etapas pueden dominar al escalar."
        },
        {
          "title": "Ingeniería",
          "body": "Mide scaling efficiency y memoria por worker; más dispositivos pueden empeorar coste/eficiencia si la comunicación domina."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Paso 800 ms en 1 GPU y 250 ms en 4 GPU. Speedup.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "3.2"
    },
    "check": {
      "question": "¿4 GPU garantizan 4x speedup?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Entrenar distribuido reparte datos, parámetros o capas; añadir aceleradores introduce comunicación y no garantiza speedup lineal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Paso 800 ms en 1 GPU y 250 ms en 4 GPU. Speedup.",
        "answer": "3.2",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿4 GPU garantizan 4x speedup?",
        "answer": "no",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  },
  "llm-integration": {
    "id": "llm-integration",
    "courseId": 64,
    "title": "Proyecto: pequeño LLM propio",
    "shortTitle": "Proyecto LLM",
    "duration": 125,
    "objective": "Construir y entrenar un Transformer pequeño, medir tokenización, loss, generación, memoria y reproducibilidad de extremo a extremo.",
    "summary": [
      "Construye un corpus pequeño, tokenizer fijo, decoder causal y training loop con checkpoints reproducibles.",
      "La meta no es competir con un LLM industrial sino poder inspeccionar logits, loss, masks, generación y memoria sin cajas negras.",
      "Entrega curvas train/validation, muestras con decoding controlado, seeds, config y un informe de límites/fallos."
    ],
    "concept": "El proyecto integra tokenizer, dataset, decoder causal, training loop, checkpoints e inferencia; debe poder explicar cada tensor y cada coste.",
    "rules": [
      "Separa arquitectura, datos, objetivo de entrenamiento y política de inferencia antes de atribuir una propiedad al LLM.",
      "Declara shapes, unidades y presupuesto de memoria/cómputo cuando una afirmación dependa de escala.",
      "No conviertas resultados empíricos o una implementación concreta en garantías universales; mide en el workload relevante."
    ],
    "deep": {
      "intro": "Construir y entrenar un Transformer pequeño, medir tokenización, loss, generación, memoria y reproducibilidad de extremo a extremo.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Construye un corpus pequeño, tokenizer fijo, decoder causal y training loop con checkpoints reproducibles."
        },
        {
          "title": "Mecánica y límites",
          "body": "La meta no es competir con un LLM industrial sino poder inspeccionar logits, loss, masks, generación y memoria sin cajas negras."
        },
        {
          "title": "Ingeniería",
          "body": "Entrega curvas train/validation, muestras con decoding controlado, seeds, config y un informe de límites/fallos."
        },
        {
          "title": "Validación",
          "body": "Construye un caso mínimo calculable, registra configuración/tokenizer/checkpoint y mide una propiedad separada de calidad, memoria o latencia para falsar supuestos."
        }
      ]
    },
    "example": {
      "problem": "Modelo procesa 50M tokens en 100000 steps. Tokens promedio por step.",
      "steps": [
        "Identifica la magnitud, distribución o presupuesto relevante.",
        "Calcula el resultado y explica qué sí demuestra y qué no demuestra."
      ],
      "solution": "500"
    },
    "check": {
      "question": "¿Un modelo pequeño propio necesita registrar tokenizer y configuración para ser reproducible?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "El proyecto integra tokenizer, dataset, decoder causal, training loop, checkpoints e inferencia; debe poder explicar cada tensor y cada coste."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Modelo procesa 50M tokens en 100000 steps. Tokens promedio por step.",
        "answer": "500",
        "hint": "Usa las cantidades explícitas y conserva unidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un modelo pequeño propio necesita registrar tokenizer y configuración para ser reproducible?",
        "answer": "si",
        "hint": "Distingue mecanismo del modelo, objetivo y pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Esta lección requiere declarar supuestos de datos, arquitectura o inferencia antes de generalizar el resultado?",
        "answer": "si",
        "hint": "Una propiedad local o empírica no es una garantía universal."
      }
    ]
  }
});
