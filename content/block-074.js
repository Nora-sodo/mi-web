/**
 * BLOQUE 074 — PERFORMANCE ENGINEERING
 *
 * Regla editorial: optimizar exige medir. Ninguna cifra se interpreta fuera de su
 * workload, entorno, distribución y mecanismo causal plausible.
 */
window.LEARNING_PATHS[74] = {
  "level": "Performance Engineering",
  "estimatedHours": 215,
  "description": "Ingeniería de rendimiento basada en medición: benchmarking, profiling, CPU, cachés, branches, memoria, SIMD, multithreading, GPU, I/O, latencia, throughput y tail latency.",
  "outcomes": [
    "Diseñar benchmarks reproducibles y distinguir medición, profiling, diagnóstico y optimización.",
    "Relacionar síntomas de rendimiento con CPU, cachés, memoria, paralelismo, GPU e I/O mediante evidencia.",
    "Analizar latencia, throughput, saturación y percentiles altos como distribuciones acopladas a colas y capacidad.",
    "Validar optimizaciones end-to-end con baseline, guardrails, modelos y pruebas de regresión."
  ],
  "modules": [
    {
      "id": "m1-method",
      "title": "Medición antes de optimizar",
      "description": "Método, benchmarking y profiling",
      "lessons": [
        "performance-methodology",
        "benchmarking-performance",
        "profiling-performance"
      ]
    },
    {
      "id": "m2-cpu",
      "title": "CPU y memoria",
      "description": "Microarquitectura y datos",
      "lessons": [
        "cpu-bottlenecks",
        "cache-behaviour-performance",
        "branch-prediction-performance",
        "memory-bandwidth-performance"
      ]
    },
    {
      "id": "m3-parallel",
      "title": "Paralelismo y aceleración",
      "description": "SIMD, threads y GPU",
      "lessons": [
        "simd-performance",
        "multithreading-performance",
        "gpu-acceleration-performance"
      ]
    },
    {
      "id": "m4-io-latency",
      "title": "E/S y servicio",
      "description": "I/O, latencia y throughput",
      "lessons": [
        "io-performance",
        "latency-performance",
        "throughput-performance"
      ]
    },
    {
      "id": "m5-tail-models",
      "title": "Colas y límites",
      "description": "Tail latency y modelos",
      "lessons": [
        "tail-latency-performance",
        "performance-models"
      ]
    },
    {
      "id": "m6-project",
      "title": "Integración",
      "description": "Proyecto de optimización",
      "lessons": [
        "performance-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "performance-methodology": {
    "id": "performance-methodology",
    "courseId": 74,
    "title": "Método de ingeniería de rendimiento",
    "shortTitle": "Método",
    "duration": 120,
    "objective": "Optimizar a partir de una hipótesis medible, una carga representativa y una restricción explícita antes de tocar código.",
    "summary": [
      "Performance engineering no es “hacerlo más rápido” a ciegas: define objetivo, workload, métrica, presupuesto y condición de éxito.",
      "Separa síntoma, recurso saturado y causa; una optimización sin baseline no demuestra mejora.",
      "Define una métrica primaria y guardrails de correctitud, memoria, energía o coste para evitar optimizaciones regresivas."
    ],
    "concept": "Performance engineering no es “hacerlo más rápido” a ciegas: define objetivo, workload, métrica, presupuesto y condición de éxito.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Optimizar a partir de una hipótesis medible, una carga representativa y una restricción explícita antes de tocar código.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Performance engineering no es “hacerlo más rápido” a ciegas: define objetivo, workload, métrica, presupuesto y condición de éxito."
        },
        {
          "title": "Mecánica",
          "body": "Separa síntoma, recurso saturado y causa; una optimización sin baseline no demuestra mejora."
        },
        {
          "title": "Trade-offs",
          "body": "Define una métrica primaria y guardrails de correctitud, memoria, energía o coste para evitar optimizaciones regresivas."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Una mejora del 20% en una microprueba demuestra automáticamente que el sistema real será 20% más rápido?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una mejora del 20% en una microprueba demuestra automáticamente que el sistema real será 20% más rápido?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "Performance engineering no es “hacerlo más rápido” a ciegas: define objetivo, workload, métrica, presupuesto y condición de éxito."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una mejora del 20% en una microprueba demuestra automáticamente que el sistema real será 20% más rápido?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Método.",
        "answer": "metodologia",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Método: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "benchmarking-performance": {
    "id": "benchmarking-performance",
    "courseId": 74,
    "title": "Benchmarking reproducible",
    "shortTitle": "Benchmarking",
    "duration": 125,
    "objective": "Diseñar benchmarks que comparen implementaciones bajo condiciones controladas y estadísticamente interpretables.",
    "summary": [
      "Un benchmark es un experimento: workload, entorno, warm-up, número de muestras y método de agregación forman parte del resultado.",
      "Evita comparar ejecuciones con frecuencias, afinidad, datasets, compiladores o estados de caché distintos sin declararlo.",
      "Promedio, mediana y percentiles responden preguntas distintas; reporta dispersión y no una sola cifra decorativa."
    ],
    "concept": "Un benchmark es un experimento: workload, entorno, warm-up, número de muestras y método de agregación forman parte del resultado.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Diseñar benchmarks que comparen implementaciones bajo condiciones controladas y estadísticamente interpretables.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un benchmark es un experimento: workload, entorno, warm-up, número de muestras y método de agregación forman parte del resultado."
        },
        {
          "title": "Mecánica",
          "body": "Evita comparar ejecuciones con frecuencias, afinidad, datasets, compiladores o estados de caché distintos sin declararlo."
        },
        {
          "title": "Trade-offs",
          "body": "Promedio, mediana y percentiles responden preguntas distintas; reporta dispersión y no una sola cifra decorativa."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Cambiar simultáneamente dataset y compilador permite atribuir la mejora a una sola causa?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Cambiar simultáneamente dataset y compilador permite atribuir la mejora a una sola causa?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "Un benchmark es un experimento: workload, entorno, warm-up, número de muestras y método de agregación forman parte del resultado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Cambiar simultáneamente dataset y compilador permite atribuir la mejora a una sola causa?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Benchmarking.",
        "answer": "benchmark",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Benchmarking: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "profiling-performance": {
    "id": "profiling-performance",
    "courseId": 74,
    "title": "Profiling y hotspots",
    "shortTitle": "Profiling",
    "duration": 125,
    "objective": "Usar sampling, instrumentación y contadores para localizar dónde se consume tiempo o recursos antes de optimizar.",
    "summary": [
      "Profiling responde dónde se gasta el recurso; no convierte correlación en causalidad ni sustituye un modelo del sistema.",
      "Sampling reduce perturbación pero es estadístico; instrumentación puede dar detalle mayor a costa de overhead.",
      "Perf/PMU permiten observar ciclos, instrucciones, misses o branches, pero cada contador exige contexto y denominador."
    ],
    "concept": "Profiling responde dónde se gasta el recurso; no convierte correlación en causalidad ni sustituye un modelo del sistema.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Usar sampling, instrumentación y contadores para localizar dónde se consume tiempo o recursos antes de optimizar.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Profiling responde dónde se gasta el recurso; no convierte correlación en causalidad ni sustituye un modelo del sistema."
        },
        {
          "title": "Mecánica",
          "body": "Sampling reduce perturbación pero es estadístico; instrumentación puede dar detalle mayor a costa de overhead."
        },
        {
          "title": "Trade-offs",
          "body": "Perf/PMU permiten observar ciclos, instrucciones, misses o branches, pero cada contador exige contexto y denominador."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Un hotspot de CPU implica necesariamente que esa función sea la causa raíz de la latencia end-to-end?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un hotspot de CPU implica necesariamente que esa función sea la causa raíz de la latencia end-to-end?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "Profiling responde dónde se gasta el recurso; no convierte correlación en causalidad ni sustituye un modelo del sistema."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un hotspot de CPU implica necesariamente que esa función sea la causa raíz de la latencia end-to-end?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Profiling.",
        "answer": "profiling",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Profiling: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "cpu-bottlenecks": {
    "id": "cpu-bottlenecks",
    "courseId": 74,
    "title": "Cuellos de botella de CPU",
    "shortTitle": "CPU bottlenecks",
    "duration": 130,
    "objective": "Distinguir límites de frontend, backend, dependencias, especulación y ejecución al analizar CPU.",
    "summary": [
      "“CPU al 100%” solo describe utilización; no identifica si el límite son instrucciones, memoria, branches, locks o throttling.",
      "IPC/CPI son indicadores agregados y dependen de microarquitectura, workload y mezcla de instrucciones.",
      "Relaciona ciclos con retiros, stalls y eventos relevantes; evita interpretar un contador aislado como diagnóstico completo."
    ],
    "concept": "“CPU al 100%” solo describe utilización; no identifica si el límite son instrucciones, memoria, branches, locks o throttling.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Distinguir límites de frontend, backend, dependencias, especulación y ejecución al analizar CPU.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "“CPU al 100%” solo describe utilización; no identifica si el límite son instrucciones, memoria, branches, locks o throttling."
        },
        {
          "title": "Mecánica",
          "body": "IPC/CPI son indicadores agregados y dependen de microarquitectura, workload y mezcla de instrucciones."
        },
        {
          "title": "Trade-offs",
          "body": "Relaciona ciclos con retiros, stalls y eventos relevantes; evita interpretar un contador aislado como diagnóstico completo."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Dos programas con la misma utilización de CPU deben tener el mismo IPC?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Dos programas con la misma utilización de CPU deben tener el mismo IPC?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "“CPU al 100%” solo describe utilización; no identifica si el límite son instrucciones, memoria, branches, locks o throttling."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Dos programas con la misma utilización de CPU deben tener el mismo IPC?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de CPU bottlenecks.",
        "answer": "cpu",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para CPU bottlenecks: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "cache-behaviour-performance": {
    "id": "cache-behaviour-performance",
    "courseId": 74,
    "title": "Comportamiento de caché",
    "shortTitle": "Caches",
    "duration": 130,
    "objective": "Relacionar localidad, working set, cache lines y misses con coste de memoria y diseño de datos.",
    "summary": [
      "La caché explota localidad temporal y espacial; un algoritmo O(n) puede perder frente a otro por layout y patrones de acceso.",
      "Miss rate sin coste por miss es incompleto: niveles distintos y concurrencia de misses cambian el impacto.",
      "Data-oriented layouts pueden reducir tráfico y mejorar prefetching, pero deben medirse en el hardware objetivo."
    ],
    "concept": "La caché explota localidad temporal y espacial; un algoritmo O(n) puede perder frente a otro por layout y patrones de acceso.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Relacionar localidad, working set, cache lines y misses con coste de memoria y diseño de datos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La caché explota localidad temporal y espacial; un algoritmo O(n) puede perder frente a otro por layout y patrones de acceso."
        },
        {
          "title": "Mecánica",
          "body": "Miss rate sin coste por miss es incompleto: niveles distintos y concurrencia de misses cambian el impacto."
        },
        {
          "title": "Trade-offs",
          "body": "Data-oriented layouts pueden reducir tráfico y mejorar prefetching, pero deben medirse en el hardware objetivo."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Una tasa de miss menor garantiza siempre menor tiempo total?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una tasa de miss menor garantiza siempre menor tiempo total?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "La caché explota localidad temporal y espacial; un algoritmo O(n) puede perder frente a otro por layout y patrones de acceso."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una tasa de miss menor garantiza siempre menor tiempo total?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Caches.",
        "answer": "cache",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Caches: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "branch-prediction-performance": {
    "id": "branch-prediction-performance",
    "courseId": 74,
    "title": "Predicción de saltos",
    "shortTitle": "Branch prediction",
    "duration": 125,
    "objective": "Explicar por qué branches difíciles de predecir pueden vaciar trabajo especulativo y reducir throughput.",
    "summary": [
      "El predictor intenta anticipar dirección/target; un fallo obliga a descartar trabajo especulativo dependiente del camino incorrecto.",
      "El coste depende de la microarquitectura y del contexto; “branchless” puede añadir instrucciones o dependencias y no siempre gana.",
      "Mide branches retirados y mispredictions normalizados; controla distribución de datos antes de comparar."
    ],
    "concept": "El predictor intenta anticipar dirección/target; un fallo obliga a descartar trabajo especulativo dependiente del camino incorrecto.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Explicar por qué branches difíciles de predecir pueden vaciar trabajo especulativo y reducir throughput.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El predictor intenta anticipar dirección/target; un fallo obliga a descartar trabajo especulativo dependiente del camino incorrecto."
        },
        {
          "title": "Mecánica",
          "body": "El coste depende de la microarquitectura y del contexto; “branchless” puede añadir instrucciones o dependencias y no siempre gana."
        },
        {
          "title": "Trade-offs",
          "body": "Mide branches retirados y mispredictions normalizados; controla distribución de datos antes de comparar."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Reescribir código como branchless garantiza una mejora en cualquier CPU y dataset?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Reescribir código como branchless garantiza una mejora en cualquier CPU y dataset?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "El predictor intenta anticipar dirección/target; un fallo obliga a descartar trabajo especulativo dependiente del camino incorrecto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Reescribir código como branchless garantiza una mejora en cualquier CPU y dataset?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Branch prediction.",
        "answer": "branch",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Branch prediction: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "memory-bandwidth-performance": {
    "id": "memory-bandwidth-performance",
    "courseId": 74,
    "title": "Ancho de banda de memoria",
    "shortTitle": "Memory bandwidth",
    "duration": 130,
    "objective": "Distinguir latencia de memoria, ancho de banda, MLP y límites impuestos por el subsistema de memoria.",
    "summary": [
      "Bandwidth es tasa de transferencia; latency es tiempo de una operación. Saturar uno no implica saturar el otro.",
      "Accesos secuenciales y múltiples misses independientes pueden explotar paralelismo de memoria; pointer chasing suele serializar dependencias.",
      "Compara bytes útiles/s con el tráfico real y el techo medido, no solo con la especificación teórica del módulo DRAM."
    ],
    "concept": "Bandwidth es tasa de transferencia; latency es tiempo de una operación. Saturar uno no implica saturar el otro.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Distinguir latencia de memoria, ancho de banda, MLP y límites impuestos por el subsistema de memoria.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Bandwidth es tasa de transferencia; latency es tiempo de una operación. Saturar uno no implica saturar el otro."
        },
        {
          "title": "Mecánica",
          "body": "Accesos secuenciales y múltiples misses independientes pueden explotar paralelismo de memoria; pointer chasing suele serializar dependencias."
        },
        {
          "title": "Trade-offs",
          "body": "Compara bytes útiles/s con el tráfico real y el techo medido, no solo con la especificación teórica del módulo DRAM."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Un workload de pointer chasing serial suele aprovechar todo el ancho de banda disponible?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un workload de pointer chasing serial suele aprovechar todo el ancho de banda disponible?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "Bandwidth es tasa de transferencia; latency es tiempo de una operación. Saturar uno no implica saturar el otro."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un workload de pointer chasing serial suele aprovechar todo el ancho de banda disponible?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Memory bandwidth.",
        "answer": "bandwidth",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Memory bandwidth: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "simd-performance": {
    "id": "simd-performance",
    "courseId": 74,
    "title": "SIMD y vectorización",
    "shortTitle": "SIMD",
    "duration": 130,
    "objective": "Entender cuándo varias operaciones independientes pueden ejecutarse con instrucciones vectoriales y qué limita su beneficio.",
    "summary": [
      "SIMD aplica una instrucción a varios lanes; el speedup real depende de ancho vectorial, mezcla escalar, memoria y dependencias.",
      "Auto-vectorización necesita demostrar seguridad de dependencias y aliasing; intrinsics no eliminan límites de memoria.",
      "Verifica código generado, vectorización efectiva y throughput; compara también frecuencia y tails si instrucciones anchas cambian el régimen."
    ],
    "concept": "SIMD aplica una instrucción a varios lanes; el speedup real depende de ancho vectorial, mezcla escalar, memoria y dependencias.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Entender cuándo varias operaciones independientes pueden ejecutarse con instrucciones vectoriales y qué limita su beneficio.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "SIMD aplica una instrucción a varios lanes; el speedup real depende de ancho vectorial, mezcla escalar, memoria y dependencias."
        },
        {
          "title": "Mecánica",
          "body": "Auto-vectorización necesita demostrar seguridad de dependencias y aliasing; intrinsics no eliminan límites de memoria."
        },
        {
          "title": "Trade-offs",
          "body": "Verifica código generado, vectorización efectiva y throughput; compara también frecuencia y tails si instrucciones anchas cambian el régimen."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Usar una instrucción de 8 lanes implica automáticamente un speedup de 8×?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Usar una instrucción de 8 lanes implica automáticamente un speedup de 8×?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "SIMD aplica una instrucción a varios lanes; el speedup real depende de ancho vectorial, mezcla escalar, memoria y dependencias."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Usar una instrucción de 8 lanes implica automáticamente un speedup de 8×?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de SIMD.",
        "answer": "simd",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para SIMD: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "multithreading-performance": {
    "id": "multithreading-performance",
    "courseId": 74,
    "title": "Multithreading y escalado",
    "shortTitle": "Multithreading",
    "duration": 135,
    "objective": "Analizar escalado con paralelismo disponible, sincronización, coherencia, afinidad y la fracción serial.",
    "summary": [
      "Más threads ayudan solo mientras exista trabajo paralelizable y recursos; locks, false sharing y bandwidth pueden invertir la ganancia.",
      "Amdahl limita el speedup por fracción serial; además existen overheads de scheduling, comunicación y NUMA.",
      "Mide speedup y eficiencia por número de threads, no solo throughput absoluto; observa saturación y variabilidad."
    ],
    "concept": "Más threads ayudan solo mientras exista trabajo paralelizable y recursos; locks, false sharing y bandwidth pueden invertir la ganancia.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Analizar escalado con paralelismo disponible, sincronización, coherencia, afinidad y la fracción serial.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Más threads ayudan solo mientras exista trabajo paralelizable y recursos; locks, false sharing y bandwidth pueden invertir la ganancia."
        },
        {
          "title": "Mecánica",
          "body": "Amdahl limita el speedup por fracción serial; además existen overheads de scheduling, comunicación y NUMA."
        },
        {
          "title": "Trade-offs",
          "body": "Mide speedup y eficiencia por número de threads, no solo throughput absoluto; observa saturación y variabilidad."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Duplicar threads garantiza duplicar throughput?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Duplicar threads garantiza duplicar throughput?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "Más threads ayudan solo mientras exista trabajo paralelizable y recursos; locks, false sharing y bandwidth pueden invertir la ganancia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Duplicar threads garantiza duplicar throughput?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Multithreading.",
        "answer": "threads",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Multithreading: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "gpu-acceleration-performance": {
    "id": "gpu-acceleration-performance",
    "courseId": 74,
    "title": "Aceleración con GPU",
    "shortTitle": "GPU acceleration",
    "duration": 135,
    "objective": "Decidir cuándo transferir trabajo a GPU compensa launch overhead, transferencias y estructura paralela del problema.",
    "summary": [
      "GPU acceleration funciona bien con paralelismo masivo y suficiente intensidad computacional; offload pequeño puede perder frente a CPU.",
      "Transferencias host↔device, sincronización, occupancy y divergencia forman parte del coste end-to-end.",
      "Mide tiempo total incluyendo copias y sincronizaciones; un kernel rápido aislado no prueba una aplicación más rápida."
    ],
    "concept": "GPU acceleration funciona bien con paralelismo masivo y suficiente intensidad computacional; offload pequeño puede perder frente a CPU.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Decidir cuándo transferir trabajo a GPU compensa launch overhead, transferencias y estructura paralela del problema.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "GPU acceleration funciona bien con paralelismo masivo y suficiente intensidad computacional; offload pequeño puede perder frente a CPU."
        },
        {
          "title": "Mecánica",
          "body": "Transferencias host↔device, sincronización, occupancy y divergencia forman parte del coste end-to-end."
        },
        {
          "title": "Trade-offs",
          "body": "Mide tiempo total incluyendo copias y sincronizaciones; un kernel rápido aislado no prueba una aplicación más rápida."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Un kernel GPU 10× más rápido garantiza que la aplicación completa sea 10× más rápida?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un kernel GPU 10× más rápido garantiza que la aplicación completa sea 10× más rápida?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "GPU acceleration funciona bien con paralelismo masivo y suficiente intensidad computacional; offload pequeño puede perder frente a CPU."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un kernel GPU 10× más rápido garantiza que la aplicación completa sea 10× más rápida?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de GPU acceleration.",
        "answer": "gpu",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para GPU acceleration: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "io-performance": {
    "id": "io-performance",
    "courseId": 74,
    "title": "Rendimiento de E/S",
    "shortTitle": "I/O",
    "duration": 130,
    "objective": "Modelar E/S por latencia, throughput, tamaño de operación, profundidad de cola, cachés y sincronización.",
    "summary": [
      "El rendimiento de I/O depende del patrón: secuencial/random, reads/writes, sync/async, queue depth y tamaño de bloque.",
      "Page cache y buffering pueden hacer que una prueba mida RAM en vez del dispositivo; fsync cambia el contrato de persistencia observado.",
      "Declara dataset mayor que cachés cuando corresponda y separa tiempo de servicio del tiempo en cola."
    ],
    "concept": "El rendimiento de I/O depende del patrón: secuencial/random, reads/writes, sync/async, queue depth y tamaño de bloque.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Modelar E/S por latencia, throughput, tamaño de operación, profundidad de cola, cachés y sincronización.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El rendimiento de I/O depende del patrón: secuencial/random, reads/writes, sync/async, queue depth y tamaño de bloque."
        },
        {
          "title": "Mecánica",
          "body": "Page cache y buffering pueden hacer que una prueba mida RAM en vez del dispositivo; fsync cambia el contrato de persistencia observado."
        },
        {
          "title": "Trade-offs",
          "body": "Declara dataset mayor que cachés cuando corresponda y separa tiempo de servicio del tiempo en cola."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Una lectura repetida de un archivo pequeño mide necesariamente el almacenamiento físico?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una lectura repetida de un archivo pequeño mide necesariamente el almacenamiento físico?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "El rendimiento de I/O depende del patrón: secuencial/random, reads/writes, sync/async, queue depth y tamaño de bloque."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una lectura repetida de un archivo pequeño mide necesariamente el almacenamiento físico?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de I/O.",
        "answer": "io",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para I/O: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "latency-performance": {
    "id": "latency-performance",
    "courseId": 74,
    "title": "Latencia",
    "shortTitle": "Latency",
    "duration": 125,
    "objective": "Descomponer latencia end-to-end en servicio, colas, red, sincronización y dependencias.",
    "summary": [
      "Latency es una distribución, no una constante; el promedio puede ocultar experiencias lentas importantes.",
      "Little y modelos de colas ayudan a razonar, pero sus supuestos deben declararse; al acercarse a saturación las colas pueden crecer con rapidez.",
      "Instrumenta spans o etapas con reloj consistente y evita sumar percentiles independientes como si describieran la misma petición."
    ],
    "concept": "Latency es una distribución, no una constante; el promedio puede ocultar experiencias lentas importantes.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Descomponer latencia end-to-end en servicio, colas, red, sincronización y dependencias.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Latency es una distribución, no una constante; el promedio puede ocultar experiencias lentas importantes."
        },
        {
          "title": "Mecánica",
          "body": "Little y modelos de colas ayudan a razonar, pero sus supuestos deben declararse; al acercarse a saturación las colas pueden crecer con rapidez."
        },
        {
          "title": "Trade-offs",
          "body": "Instrumenta spans o etapas con reloj consistente y evita sumar percentiles independientes como si describieran la misma petición."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿El promedio basta para caracterizar una distribución con una cola larga?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿El promedio basta para caracterizar una distribución con una cola larga?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "Latency es una distribución, no una constante; el promedio puede ocultar experiencias lentas importantes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El promedio basta para caracterizar una distribución con una cola larga?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Latency.",
        "answer": "latency",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Latency: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "throughput-performance": {
    "id": "throughput-performance",
    "courseId": 74,
    "title": "Throughput y saturación",
    "shortTitle": "Throughput",
    "duration": 125,
    "objective": "Relacionar tasa de trabajo completado con concurrencia, capacidad y punto de saturación.",
    "summary": [
      "Throughput aumenta con carga hasta que un recurso limita el sistema; después, más concurrencia suele aumentar cola y latencia.",
      "El throughput máximo útil debe respetar SLOs y error rate: récord de operaciones con latencia inaceptable no es capacidad operativa.",
      "Construye curvas carga→throughput/latencia/error para localizar la rodilla y el recurso limitante."
    ],
    "concept": "Throughput aumenta con carga hasta que un recurso limita el sistema; después, más concurrencia suele aumentar cola y latencia.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Relacionar tasa de trabajo completado con concurrencia, capacidad y punto de saturación.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Throughput aumenta con carga hasta que un recurso limita el sistema; después, más concurrencia suele aumentar cola y latencia."
        },
        {
          "title": "Mecánica",
          "body": "El throughput máximo útil debe respetar SLOs y error rate: récord de operaciones con latencia inaceptable no es capacidad operativa."
        },
        {
          "title": "Trade-offs",
          "body": "Construye curvas carga→throughput/latencia/error para localizar la rodilla y el recurso limitante."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Aumentar la concurrencia después de saturar siempre aumenta throughput útil?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Aumentar la concurrencia después de saturar siempre aumenta throughput útil?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "Throughput aumenta con carga hasta que un recurso limita el sistema; después, más concurrencia suele aumentar cola y latencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Aumentar la concurrencia después de saturar siempre aumenta throughput útil?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Throughput.",
        "answer": "throughput",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Throughput: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "tail-latency-performance": {
    "id": "tail-latency-performance",
    "courseId": 74,
    "title": "Tail latency",
    "shortTitle": "Tail latency",
    "duration": 130,
    "objective": "Medir y reducir percentiles altos entendiendo fan-out, colas, pausas y variabilidad entre réplicas.",
    "summary": [
      "p95/p99 describen cuantiles de una distribución; en servicios con fan-out, una petición puede quedar limitada por el subresultado más lento.",
      "Retries y hedging pueden reducir algunas colas a costa de más carga; si se aplican sin presupuesto pueden amplificar una sobrecarga.",
      "Conserva histogramas con resolución suficiente y ventanas explícitas; no derives p99 a partir de promedios por host."
    ],
    "concept": "p95/p99 describen cuantiles de una distribución; en servicios con fan-out, una petición puede quedar limitada por el subresultado más lento.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Medir y reducir percentiles altos entendiendo fan-out, colas, pausas y variabilidad entre réplicas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "p95/p99 describen cuantiles de una distribución; en servicios con fan-out, una petición puede quedar limitada por el subresultado más lento."
        },
        {
          "title": "Mecánica",
          "body": "Retries y hedging pueden reducir algunas colas a costa de más carga; si se aplican sin presupuesto pueden amplificar una sobrecarga."
        },
        {
          "title": "Trade-offs",
          "body": "Conserva histogramas con resolución suficiente y ventanas explícitas; no derives p99 a partir de promedios por host."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿El p99 puede calcularse correctamente promediando los p99 de cada servidor?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿El p99 puede calcularse correctamente promediando los p99 de cada servidor?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "p95/p99 describen cuantiles de una distribución; en servicios con fan-out, una petición puede quedar limitada por el subresultado más lento."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El p99 puede calcularse correctamente promediando los p99 de cada servidor?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Tail latency.",
        "answer": "tail latency",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Tail latency: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "performance-models": {
    "id": "performance-models",
    "courseId": 74,
    "title": "Modelos de rendimiento y límites",
    "shortTitle": "Modelos",
    "duration": 135,
    "objective": "Usar Amdahl, roofline y teoría de colas como modelos para formular límites y experimentos, no como oráculos universales.",
    "summary": [
      "Un modelo útil elimina detalle para destacar una restricción: compute, bandwidth, fracción serial o utilización.",
      "Roofline relaciona intensidad aritmética con techos de compute/bandwidth; Amdahl acota speedup; las colas conectan demanda y espera bajo supuestos.",
      "Ajusta el modelo con mediciones y busca residuos sistemáticos: cuando no predice, probablemente falta una restricción relevante."
    ],
    "concept": "Un modelo útil elimina detalle para destacar una restricción: compute, bandwidth, fracción serial o utilización.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Usar Amdahl, roofline y teoría de colas como modelos para formular límites y experimentos, no como oráculos universales.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un modelo útil elimina detalle para destacar una restricción: compute, bandwidth, fracción serial o utilización."
        },
        {
          "title": "Mecánica",
          "body": "Roofline relaciona intensidad aritmética con techos de compute/bandwidth; Amdahl acota speedup; las colas conectan demanda y espera bajo supuestos."
        },
        {
          "title": "Trade-offs",
          "body": "Ajusta el modelo con mediciones y busca residuos sistemáticos: cuando no predice, probablemente falta una restricción relevante."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Un modelo simplificado que no declara supuestos debe tratarse como garantía universal?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un modelo simplificado que no declara supuestos debe tratarse como garantía universal?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "Un modelo útil elimina detalle para destacar una restricción: compute, bandwidth, fracción serial o utilización."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un modelo simplificado que no declara supuestos debe tratarse como garantía universal?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Modelos.",
        "answer": "modelo",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Modelos: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  },
  "performance-project": {
    "id": "performance-project",
    "courseId": 74,
    "title": "Proyecto: laboratorio de rendimiento",
    "shortTitle": "Proyecto performance",
    "duration": 180,
    "objective": "Ejecutar una investigación completa de rendimiento con baseline, profiler, hipótesis, optimización y validación de regresiones.",
    "summary": [
      "El proyecto debe producir una cadena de evidencia: problema observado → medición → hipótesis → cambio → comparación → límites.",
      "Optimiza un sistema pequeño en varias capas sin sacrificar correctitud; conserva scripts, datasets, builds y raw results.",
      "Incluye benchmark reproducible, perfiles antes/después, percentiles, consumo de recursos y una explicación de por qué la mejora aparece."
    ],
    "concept": "El proyecto debe producir una cadena de evidencia: problema observado → medición → hipótesis → cambio → comparación → límites.",
    "rules": [
      "Mide una baseline reproducible antes de optimizar y conserva el workload exacto.",
      "Distingue utilización, saturación, latencia, throughput y causa raíz; una métrica aislada no basta.",
      "Valida la mejora end-to-end y conserva guardrails de correctitud, memoria, energía o coste."
    ],
    "deep": {
      "intro": "Ejecutar una investigación completa de rendimiento con baseline, profiler, hipótesis, optimización y validación de regresiones.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El proyecto debe producir una cadena de evidencia: problema observado → medición → hipótesis → cambio → comparación → límites."
        },
        {
          "title": "Mecánica",
          "body": "Optimiza un sistema pequeño en varias capas sin sacrificar correctitud; conserva scripts, datasets, builds y raw results."
        },
        {
          "title": "Trade-offs",
          "body": "Incluye benchmark reproducible, perfiles antes/después, percentiles, consumo de recursos y una explicación de por qué la mejora aparece."
        },
        {
          "title": "Validación",
          "body": "Compara antes/después con el mismo workload y entorno controlado. Ejecuta suficientes muestras, registra dispersión y perfiles/contadores pertinentes, y declara qué cambio de métrica sería evidencia contra tu hipótesis."
        }
      ]
    },
    "example": {
      "problem": "¿Un proyecto de rendimiento está completo si solo muestra el resultado final sin baseline ni metodología?",
      "steps": [
        "Define primero qué métrica y propiedad estás intentando mejorar.",
        "Identifica el recurso limitante y diseña una comparación que cambie una variable relevante cada vez."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un proyecto de rendimiento está completo si solo muestra el resultado final sin baseline ni metodología?",
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
          "Solo si la medición demuestra la propiedad bajo el mismo workload",
          false
        ]
      ],
      "feedback": "El proyecto debe producir una cadena de evidencia: problema observado → medición → hipótesis → cambio → comparación → límites."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un proyecto de rendimiento está completo si solo muestra el resultado final sin baseline ni metodología?",
        "answer": "no",
        "hint": "No confundas una observación local con una garantía end-to-end."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Proyecto performance.",
        "answer": "proyecto",
        "hint": "Relaciona medición, mecanismo y métrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Proyecto performance: baseline, workload, métrica primaria y guardrail.",
        "answer": "baseline",
        "hint": "Indica qué resultado refutaría tu hipótesis de optimización."
      }
    ]
  }
});
