/**
 * BLOQUE 066 — MODELOS GENERATIVOS
 *
 * Regla editorial: generar muestras plausibles no demuestra cobertura, causalidad
 * ni ausencia de memorización; objective, latent representation y sampler se separan.
 */
window.LEARNING_PATHS[66] = {
  "level": "Modelos Generativos",
  "estimatedHours": 170,
  "description": "Autoencoders, VAEs, GANs y diffusion desde objetivos matemáticos hasta generación de imágenes, score matching y latent diffusion.",
  "outcomes": [
    "Distinguir reconstrucción, modelos latentes probabilísticos, entrenamiento adversarial y diffusion.",
    "Derivar conceptualmente ELBO/reparameterization, objetivos GAN y procesos de ruido/denoising.",
    "Explicar score matching, conditioning y latent diffusion sin confundir score, likelihood o espacio latente.",
    "Construir y evaluar un generador pequeño con protocolo reproducible, métricas y análisis de fallos."
  ],
  "modules": [
    {
      "id": "m1-latent",
      "title": "Autoencoders y variables latentes",
      "description": "Reconstrucción, espacios latentes y variational inference",
      "lessons": [
        "gen-modeling",
        "gen-autoencoders",
        "gen-latent-space",
        "gen-vae",
        "gen-elbo"
      ]
    },
    {
      "id": "m2-adversarial",
      "title": "Generación adversarial",
      "description": "GANs y estabilidad del juego",
      "lessons": [
        "gen-gans",
        "gen-gan-stability"
      ]
    },
    {
      "id": "m3-diffusion",
      "title": "Diffusion y score",
      "description": "Ruido, denoising, score y conditioning",
      "lessons": [
        "gen-diffusion-forward",
        "gen-diffusion-reverse",
        "gen-score-matching",
        "gen-conditioning"
      ]
    },
    {
      "id": "m4-image",
      "title": "Latent diffusion y evaluación",
      "description": "Generación de imágenes y proyecto comparativo",
      "lessons": [
        "gen-latent-diffusion",
        "gen-image-evaluation",
        "gen-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "gen-modeling": {
    "id": "gen-modeling",
    "courseId": 66,
    "title": "Modelos generativos: qué se aprende",
    "shortTitle": "Modelado generativo",
    "duration": 125,
    "objective": "Definir un modelo generativo y distinguir modelar una distribución de reconstruir, clasificar o memorizar ejemplos.",
    "summary": [
      "Un modelo generativo aprende estructura suficiente para asignar probabilidad, densidad, score o un mecanismo de muestreo a datos plausibles.",
      "Generar una muestra nueva no demuestra que el modelo haya aprendido causalidad ni que no memorice ejemplos del training set.",
      "Las familias generativas difieren en objetivo, representación latente, likelihood explícita/implícita y procedimiento de muestreo."
    ],
    "concept": "Generativo ≠ discriminativo ≠ memorizar: el objeto aprendido y el mecanismo de muestreo deben declararse por separado.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Definir un modelo generativo y distinguir modelar una distribución de reconstruir, clasificar o memorizar ejemplos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un modelo generativo aprende estructura suficiente para asignar probabilidad, densidad, score o un mecanismo de muestreo a datos plausibles."
        },
        {
          "title": "Mecánica y límites",
          "body": "Generar una muestra nueva no demuestra que el modelo haya aprendido causalidad ni que no memorice ejemplos del training set."
        },
        {
          "title": "Ingeniería",
          "body": "Las familias generativas difieren en objetivo, representación latente, likelihood explícita/implícita y procedimiento de muestreo."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Un dataset contiene 50 000 imágenes y se reservan 10 000 para test. Imágenes de entrenamiento.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "40000"
    },
    "check": {
      "question": "¿Generar ejemplos plausibles prueba por sí solo que el modelo no memorizó el training set?",
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
      "feedback": "Generativo ≠ discriminativo ≠ memorizar: el objeto aprendido y el mecanismo de muestreo deben declararse por separado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un dataset contiene 50 000 imágenes y se reservan 10 000 para test. Imágenes de entrenamiento.",
        "answer": "40000",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Generar ejemplos plausibles prueba por sí solo que el modelo no memorizó el training set?",
        "answer": "no",
        "hint": "Separar calidad visual de evidencia sobre distribución, generalización y privacidad."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-autoencoders": {
    "id": "gen-autoencoders",
    "courseId": 66,
    "title": "Autoencoders: encoder, bottleneck y decoder",
    "shortTitle": "Autoencoders",
    "duration": 125,
    "objective": "Explicar un autoencoder como reconstrucción comprimida y distinguir representación útil de modelo generativo completo.",
    "summary": [
      "Un encoder transforma x en un código z y un decoder intenta reconstruir x desde z.",
      "Un bottleneck restringe la información disponible, pero un autoencoder determinista no define automáticamente una distribución de la que podamos muestrear correctamente.",
      "La reconstruction loss mide fidelidad respecto al objetivo elegido; no garantiza semántica, disentanglement ni buena generación fuera de los códigos observados."
    ],
    "concept": "Autoencoder ≠ generador probabilístico por definición: reconstruir bien no basta para que puntos arbitrarios del espacio latente decodifiquen a muestras válidas.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Explicar un autoencoder como reconstrucción comprimida y distinguir representación útil de modelo generativo completo.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un encoder transforma x en un código z y un decoder intenta reconstruir x desde z."
        },
        {
          "title": "Mecánica y límites",
          "body": "Un bottleneck restringe la información disponible, pero un autoencoder determinista no define automáticamente una distribución de la que podamos muestrear correctamente."
        },
        {
          "title": "Ingeniería",
          "body": "La reconstruction loss mide fidelidad respecto al objetivo elegido; no garantiza semántica, disentanglement ni buena generación fuera de los códigos observados."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Entrada de 784 valores comprimida a 32. Factor de compresión dimensional idealizado 784/32.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "24.5"
    },
    "check": {
      "question": "¿Un autoencoder determinista con baja reconstruction loss define automáticamente una distribución latente fácil de muestrear?",
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
      "feedback": "Autoencoder ≠ generador probabilístico por definición: reconstruir bien no basta para que puntos arbitrarios del espacio latente decodifiquen a muestras válidas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Entrada de 784 valores comprimida a 32. Factor de compresión dimensional idealizado 784/32.",
        "answer": "24.5",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un autoencoder determinista con baja reconstruction loss define automáticamente una distribución latente fácil de muestrear?",
        "answer": "no",
        "hint": "Reconstrucción y muestreo desde una distribución son objetivos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-latent-space": {
    "id": "gen-latent-space",
    "courseId": 66,
    "title": "Espacios latentes y representación",
    "shortTitle": "Latentes",
    "duration": 125,
    "objective": "Razonar sobre variables latentes, interpolación y estructura geométrica sin asumir que cada dimensión tiene significado humano.",
    "summary": [
      "Una variable latente representa factores internos no observados directamente por el modelo de datos.",
      "Una interpolación suave en z puede producir transiciones útiles, pero no prueba que el espacio esté disentangled o sea lineal semánticamente.",
      "La dimensionalidad latente intercambia capacidad, compresión, coste y facilidad de regularización."
    ],
    "concept": "Espacio latente ≠ mapa semántico humano: cercanía geométrica y significado dependen del entrenamiento, métrica y arquitectura.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Razonar sobre variables latentes, interpolación y estructura geométrica sin asumir que cada dimensión tiene significado humano.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una variable latente representa factores internos no observados directamente por el modelo de datos."
        },
        {
          "title": "Mecánica y límites",
          "body": "Una interpolación suave en z puede producir transiciones útiles, pero no prueba que el espacio esté disentangled o sea lineal semánticamente."
        },
        {
          "title": "Ingeniería",
          "body": "La dimensionalidad latente intercambia capacidad, compresión, coste y facilidad de regularización."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Un latent 16×16×4 contiene cuántos escalares.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "1024"
    },
    "check": {
      "question": "¿Dos latentes cercanos implican siempre dos imágenes semánticamente equivalentes?",
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
      "feedback": "Espacio latente ≠ mapa semántico humano: cercanía geométrica y significado dependen del entrenamiento, métrica y arquitectura."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un latent 16×16×4 contiene cuántos escalares.",
        "answer": "1024",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Dos latentes cercanos implican siempre dos imágenes semánticamente equivalentes?",
        "answer": "no",
        "hint": "La geometría aprendida no tiene una interpretación humana universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-vae": {
    "id": "gen-vae",
    "courseId": 66,
    "title": "Variational Autoencoders",
    "shortTitle": "VAE",
    "duration": 125,
    "objective": "Explicar el VAE como modelo latente probabilístico con encoder aproximado, decoder generativo y regularización hacia un prior.",
    "summary": [
      "El encoder parametriza una distribución aproximada q(z|x), en vez de devolver solo un punto latente determinista.",
      "El decoder modela p(x|z) y el entrenamiento equilibra reconstrucción con regularización de la distribución latente.",
      "El prior permite muestrear z y decodificar muestras, pero la calidad depende del modelo, objective y capacidad."
    ],
    "concept": "VAE ≠ autoencoder con ruido: introduce una formulación probabilística y un objetivo variacional sobre variables latentes.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Explicar el VAE como modelo latente probabilístico con encoder aproximado, decoder generativo y regularización hacia un prior.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El encoder parametriza una distribución aproximada q(z|x), en vez de devolver solo un punto latente determinista."
        },
        {
          "title": "Mecánica y límites",
          "body": "El decoder modela p(x|z) y el entrenamiento equilibra reconstrucción con regularización de la distribución latente."
        },
        {
          "title": "Ingeniería",
          "body": "El prior permite muestrear z y decodificar muestras, pero la calidad depende del modelo, objective y capacidad."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Un encoder produce 64 medias y 64 log-varianzas. Escalares de salida.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "128"
    },
    "check": {
      "question": "¿Un VAE suele parametrizar una distribución latente por ejemplo en lugar de un único código determinista?",
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
      "feedback": "VAE ≠ autoencoder con ruido: introduce una formulación probabilística y un objetivo variacional sobre variables latentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un encoder produce 64 medias y 64 log-varianzas. Escalares de salida.",
        "answer": "128",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un VAE suele parametrizar una distribución latente por ejemplo en lugar de un único código determinista?",
        "answer": "si",
        "hint": "La inferencia aproximada q(z|x) devuelve parámetros de una distribución."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-elbo": {
    "id": "gen-elbo",
    "courseId": 66,
    "title": "ELBO y reparameterization trick",
    "shortTitle": "ELBO",
    "duration": 125,
    "objective": "Derivar conceptualmente la ELBO y explicar por qué la reparameterización permite estimar gradientes a través del muestreo continuo.",
    "summary": [
      "La ELBO combina un término de reconstrucción/likelihood esperado con una penalización KL respecto al prior.",
      "Optimizar la ELBO maximiza una cota inferior del log-likelihood marginal bajo el modelo, no el log-likelihood exacto en general.",
      "La reparameterización escribe un muestreo como transformación determinista de parámetros y ruido externo, permitiendo backpropagation en variables continuas comunes."
    ],
    "concept": "ELBO ≠ log-likelihood exacto: la brecha depende de la calidad del posterior aproximado.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Derivar conceptualmente la ELBO y explicar por qué la reparameterización permite estimar gradientes a través del muestreo continuo.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La ELBO combina un término de reconstrucción/likelihood esperado con una penalización KL respecto al prior."
        },
        {
          "title": "Mecánica y límites",
          "body": "Optimizar la ELBO maximiza una cota inferior del log-likelihood marginal bajo el modelo, no el log-likelihood exacto en general."
        },
        {
          "title": "Ingeniería",
          "body": "La reparameterización escribe un muestreo como transformación determinista de parámetros y ruido externo, permitiendo backpropagation en variables continuas comunes."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Si reconstruction term=120 y KL=8 en una convención loss=recon+KL, loss total.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "128"
    },
    "check": {
      "question": "¿Maximizar la ELBO equivale siempre a maximizar exactamente el log-likelihood marginal?",
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
      "feedback": "ELBO ≠ log-likelihood exacto: la brecha depende de la calidad del posterior aproximado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si reconstruction term=120 y KL=8 en una convención loss=recon+KL, loss total.",
        "answer": "128",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Maximizar la ELBO equivale siempre a maximizar exactamente el log-likelihood marginal?",
        "answer": "no",
        "hint": "Es una cota; puede existir variational gap."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-gans": {
    "id": "gen-gans",
    "courseId": 66,
    "title": "GANs: generador y discriminador",
    "shortTitle": "GANs",
    "duration": 125,
    "objective": "Explicar el entrenamiento adversarial y separar la distribución implícita del generador del discriminador usado durante training.",
    "summary": [
      "El generador transforma ruido z en muestras; el discriminador intenta distinguir datos reales de muestras generadas.",
      "El entrenamiento es un juego adversarial: mejorar un componente cambia el objetivo efectivo del otro.",
      "El discriminador es una herramienta de entrenamiento clásica; no tiene por qué participar en el muestreo final."
    ],
    "concept": "GAN ≠ clasificador + generador independientes: sus objetivos están acoplados por un juego adversarial.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Explicar el entrenamiento adversarial y separar la distribución implícita del generador del discriminador usado durante training.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El generador transforma ruido z en muestras; el discriminador intenta distinguir datos reales de muestras generadas."
        },
        {
          "title": "Mecánica y límites",
          "body": "El entrenamiento es un juego adversarial: mejorar un componente cambia el objetivo efectivo del otro."
        },
        {
          "title": "Ingeniería",
          "body": "El discriminador es una herramienta de entrenamiento clásica; no tiene por qué participar en el muestreo final."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Batch de 64 reales y 64 falsos para una actualización del discriminador. Ejemplos evaluados.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "128"
    },
    "check": {
      "question": "¿El discriminador clásico es necesario para generar una muestra después del entrenamiento?",
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
      "feedback": "GAN ≠ clasificador + generador independientes: sus objetivos están acoplados por un juego adversarial."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Batch de 64 reales y 64 falsos para una actualización del discriminador. Ejemplos evaluados.",
        "answer": "128",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El discriminador clásico es necesario para generar una muestra después del entrenamiento?",
        "answer": "no",
        "hint": "El generador puede muestrear a partir de z sin ejecutar el discriminador."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-gan-stability": {
    "id": "gen-gan-stability",
    "courseId": 66,
    "title": "Estabilidad adversarial y mode collapse",
    "shortTitle": "GAN stability",
    "duration": 125,
    "objective": "Diagnosticar mode collapse, desequilibrio G/D y métricas engañosas sin reducir GAN training a una única loss escalar.",
    "summary": [
      "Mode collapse ocurre cuando el generador cubre insuficientemente la diversidad de la distribución y produce modos repetidos o estrechos.",
      "Una loss del discriminador o generador aislada puede ser difícil de interpretar porque ambos objetivos cambian durante el juego.",
      "Regularización, arquitectura, objective, balance de updates y evaluación de diversidad influyen en estabilidad."
    ],
    "concept": "Loss adversarial baja ≠ cobertura de distribución buena: calidad y diversidad deben evaluarse explícitamente.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Diagnosticar mode collapse, desequilibrio G/D y métricas engañosas sin reducir GAN training a una única loss escalar.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Mode collapse ocurre cuando el generador cubre insuficientemente la diversidad de la distribución y produce modos repetidos o estrechos."
        },
        {
          "title": "Mecánica y límites",
          "body": "Una loss del discriminador o generador aislada puede ser difícil de interpretar porque ambos objetivos cambian durante el juego."
        },
        {
          "title": "Ingeniería",
          "body": "Regularización, arquitectura, objective, balance de updates y evaluación de diversidad influyen en estabilidad."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "1000 muestras generadas contienen solo 25 prototipos distintos repetidos uniformemente. Repeticiones promedio por prototipo.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "40"
    },
    "check": {
      "question": "¿Una GAN puede producir imágenes nítidas y aun sufrir mode collapse?",
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
      "feedback": "Loss adversarial baja ≠ cobertura de distribución buena: calidad y diversidad deben evaluarse explícitamente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "1000 muestras generadas contienen solo 25 prototipos distintos repetidos uniformemente. Repeticiones promedio por prototipo.",
        "answer": "40",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una GAN puede producir imágenes nítidas y aun sufrir mode collapse?",
        "answer": "si",
        "hint": "Nitidez local no demuestra cobertura de la distribución."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-diffusion-forward": {
    "id": "gen-diffusion-forward",
    "courseId": 66,
    "title": "Diffusion: proceso forward de ruido",
    "shortTitle": "Forward diffusion",
    "duration": 125,
    "objective": "Construir el proceso forward que degrada datos gradualmente y distinguirlo del modelo aprendido de denoising.",
    "summary": [
      "El proceso forward añade ruido según un schedule conocido hasta aproximar una distribución simple.",
      "En DDPM se puede muestrear x_t directamente desde x_0 usando coeficientes acumulados, sin simular necesariamente todos los pasos previos.",
      "El schedule de ruido define SNR por timestep y condiciona qué tarea de denoising aprende el modelo."
    ],
    "concept": "Forward diffusion ≠ generación: el proceso de corrupción es conocido; el modelo aprende el proceso inverso/score necesario para volver hacia datos.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Construir el proceso forward que degrada datos gradualmente y distinguirlo del modelo aprendido de denoising.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El proceso forward añade ruido según un schedule conocido hasta aproximar una distribución simple."
        },
        {
          "title": "Mecánica y límites",
          "body": "En DDPM se puede muestrear x_t directamente desde x_0 usando coeficientes acumulados, sin simular necesariamente todos los pasos previos."
        },
        {
          "title": "Ingeniería",
          "body": "El schedule de ruido define SNR por timestep y condiciona qué tarea de denoising aprende el modelo."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Schedule con 1000 timesteps y se muestrean 256 ejemplos con un timestep por ejemplo. Timesteps muestreados en el batch.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "256"
    },
    "check": {
      "question": "¿El proceso forward necesita una red neuronal para añadir ruido gaussiano según un schedule conocido?",
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
      "feedback": "Forward diffusion ≠ generación: el proceso de corrupción es conocido; el modelo aprende el proceso inverso/score necesario para volver hacia datos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Schedule con 1000 timesteps y se muestrean 256 ejemplos con un timestep por ejemplo. Timesteps muestreados en el batch.",
        "answer": "256",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El proceso forward necesita una red neuronal para añadir ruido gaussiano según un schedule conocido?",
        "answer": "no",
        "hint": "La corrupción puede definirse analíticamente; la red se aprende para la dirección inversa/objetivo asociado."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-diffusion-reverse": {
    "id": "gen-diffusion-reverse",
    "courseId": 66,
    "title": "Denoising y proceso inverso",
    "shortTitle": "Reverse diffusion",
    "duration": 125,
    "objective": "Explicar el muestreo iterativo de diffusion y diferenciar predicción de ruido, x0 y otros parameterizations.",
    "summary": [
      "El generador parte de ruido y aplica una secuencia de actualizaciones condicionadas por el modelo para reducir ruido progresivamente.",
      "Distintas parametrizaciones pueden predecir ruido, datos limpios o combinaciones equivalentes bajo transformaciones conocidas.",
      "Más pasos de sampling no garantizan calidad monótonamente mejor; solver, schedule y modelo también importan."
    ],
    "concept": "Diffusion sampling ≠ una sola pasada de decoder: normalmente requiere múltiples evaluaciones secuenciales del modelo o un solver equivalente.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Explicar el muestreo iterativo de diffusion y diferenciar predicción de ruido, x0 y otros parameterizations.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El generador parte de ruido y aplica una secuencia de actualizaciones condicionadas por el modelo para reducir ruido progresivamente."
        },
        {
          "title": "Mecánica y límites",
          "body": "Distintas parametrizaciones pueden predecir ruido, datos limpios o combinaciones equivalentes bajo transformaciones conocidas."
        },
        {
          "title": "Ingeniería",
          "body": "Más pasos de sampling no garantizan calidad monótonamente mejor; solver, schedule y modelo también importan."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Sampler ejecuta 40 pasos y cada evaluación tarda 18 ms. Tiempo ideal total ms.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "720"
    },
    "check": {
      "question": "¿Duplicar siempre el número de pasos de sampling garantiza una imagen mejor?",
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
      "feedback": "Diffusion sampling ≠ una sola pasada de decoder: normalmente requiere múltiples evaluaciones secuenciales del modelo o un solver equivalente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Sampler ejecuta 40 pasos y cada evaluación tarda 18 ms. Tiempo ideal total ms.",
        "answer": "720",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Duplicar siempre el número de pasos de sampling garantiza una imagen mejor?",
        "answer": "no",
        "hint": "Calidad depende del sampler, schedule, modelo y régimen de pasos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-score-matching": {
    "id": "gen-score-matching",
    "courseId": 66,
    "title": "Score matching y score-based models",
    "shortTitle": "Score matching",
    "duration": 125,
    "objective": "Explicar el score ∇x log p(x), denoising score matching y su relación con procesos generativos basados en ruido.",
    "summary": [
      "El score es el gradiente del log de la densidad respecto al dato, no la probabilidad ni el gradiente de los parámetros del modelo.",
      "Score matching permite aprender información sobre la geometría de una distribución sin necesitar conocer su constante de normalización.",
      "Denoising score matching entrena sobre datos perturbados y se conecta estrechamente con formulaciones modernas de diffusion."
    ],
    "concept": "Score ∇x log p(x) ≠ likelihood p(x) ≠ gradient respecto a pesos θ.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Explicar el score ∇x log p(x), denoising score matching y su relación con procesos generativos basados en ruido.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El score es el gradiente del log de la densidad respecto al dato, no la probabilidad ni el gradiente de los parámetros del modelo."
        },
        {
          "title": "Mecánica y límites",
          "body": "Score matching permite aprender información sobre la geometría de una distribución sin necesitar conocer su constante de normalización."
        },
        {
          "title": "Ingeniería",
          "body": "Denoising score matching entrena sobre datos perturbados y se conecta estrechamente con formulaciones modernas de diffusion."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Vector score de una imagen 32×32×3 tiene cuántos componentes.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "3072"
    },
    "check": {
      "question": "¿El score es el gradiente respecto a los parámetros θ del modelo?",
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
      "feedback": "Score ∇x log p(x) ≠ likelihood p(x) ≠ gradient respecto a pesos θ."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Vector score de una imagen 32×32×3 tiene cuántos componentes.",
        "answer": "3072",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El score es el gradiente respecto a los parámetros θ del modelo?",
        "answer": "no",
        "hint": "Se define respecto a la variable de datos x."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-conditioning": {
    "id": "gen-conditioning",
    "courseId": 66,
    "title": "Conditioning y guidance",
    "shortTitle": "Conditioning",
    "duration": 125,
    "objective": "Distinguir generación incondicional, conditioning y guidance, y razonar sobre trade-offs entre adherencia y diversidad.",
    "summary": [
      "Conditioning introduce información como clase, texto, máscara u otra modalidad para modificar la distribución generada.",
      "Guidance altera el proceso de sampling para favorecer el condicionamiento; no equivale simplemente a añadir más tokens al prompt.",
      "Aumentar fuerza de guidance puede mejorar adherencia bajo ciertas métricas y simultáneamente reducir diversidad o producir artefactos."
    ],
    "concept": "Conditioning ≠ guidance: uno define información condicionante; el otro puede modificar cómo se usa durante sampling.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Distinguir generación incondicional, conditioning y guidance, y razonar sobre trade-offs entre adherencia y diversidad.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Conditioning introduce información como clase, texto, máscara u otra modalidad para modificar la distribución generada."
        },
        {
          "title": "Mecánica y límites",
          "body": "Guidance altera el proceso de sampling para favorecer el condicionamiento; no equivale simplemente a añadir más tokens al prompt."
        },
        {
          "title": "Ingeniería",
          "body": "Aumentar fuerza de guidance puede mejorar adherencia bajo ciertas métricas y simultáneamente reducir diversidad o producir artefactos."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Sampler usa una evaluación condicional y una incondicional por paso durante 30 pasos. Evaluaciones totales.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "60"
    },
    "check": {
      "question": "¿Más guidance garantiza siempre más calidad y diversidad simultáneamente?",
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
      "feedback": "Conditioning ≠ guidance: uno define información condicionante; el otro puede modificar cómo se usa durante sampling."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Sampler usa una evaluación condicional y una incondicional por paso durante 30 pasos. Evaluaciones totales.",
        "answer": "60",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más guidance garantiza siempre más calidad y diversidad simultáneamente?",
        "answer": "no",
        "hint": "Existe un trade-off dependiente del modelo y sampler."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-latent-diffusion": {
    "id": "gen-latent-diffusion",
    "courseId": 66,
    "title": "Latent Diffusion",
    "shortTitle": "Latent diffusion",
    "duration": 125,
    "objective": "Explicar por qué ejecutar diffusion en un espacio latente comprimido reduce coste y qué información puede perder el autoencoder.",
    "summary": [
      "Latent diffusion codifica la imagen a un espacio latente y ejecuta el proceso generativo principalmente allí.",
      "El ahorro proviene de operar sobre una representación espacial/dimensional más pequeña, no de que la diffusion deje de ser iterativa.",
      "La calidad final está limitada tanto por el modelo diffusion como por el encoder/decoder que comprime y reconstruye la imagen."
    ],
    "concept": "Latent diffusion ≠ pixel-space diffusion con otro nombre: cambia el espacio donde ocurre el proceso generativo principal.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Explicar por qué ejecutar diffusion en un espacio latente comprimido reduce coste y qué información puede perder el autoencoder.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Latent diffusion codifica la imagen a un espacio latente y ejecuta el proceso generativo principalmente allí."
        },
        {
          "title": "Mecánica y límites",
          "body": "El ahorro proviene de operar sobre una representación espacial/dimensional más pequeña, no de que la diffusion deje de ser iterativa."
        },
        {
          "title": "Ingeniería",
          "body": "La calidad final está limitada tanto por el modelo diffusion como por el encoder/decoder que comprime y reconstruye la imagen."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Imagen latente 64×64×4 frente a RGB 512×512×3. Ratio de escalares RGB/latent.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "48"
    },
    "check": {
      "question": "¿Latent diffusion elimina la necesidad de decoder para volver al espacio de imagen?",
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
      "feedback": "Latent diffusion ≠ pixel-space diffusion con otro nombre: cambia el espacio donde ocurre el proceso generativo principal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Imagen latente 64×64×4 frente a RGB 512×512×3. Ratio de escalares RGB/latent.",
        "answer": "48",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Latent diffusion elimina la necesidad de decoder para volver al espacio de imagen?",
        "answer": "no",
        "hint": "El latent generado debe decodificarse a píxeles."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-image-evaluation": {
    "id": "gen-image-evaluation",
    "courseId": 66,
    "title": "Generación de imágenes y evaluación",
    "shortTitle": "Evaluación",
    "duration": 125,
    "objective": "Evaluar generación de imágenes separando fidelidad, diversidad, conditioning, memorization y evaluación humana.",
    "summary": [
      "Una cuadrícula de muestras bonitas es evidencia cualitativa útil, pero insuficiente para caracterizar una distribución generativa.",
      "Métricas como FID comparan estadísticas de features bajo un extractor concreto; no son una medida universal de calidad ni verdad semántica.",
      "La evaluación debe incluir diversidad, adherencia al conditioning, duplicados/memorization y protocolo reproducible."
    ],
    "concept": "Una métrica generativa ≠ calidad universal: toda métrica hereda supuestos del dataset, extractor y protocolo.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Evaluar generación de imágenes separando fidelidad, diversidad, conditioning, memorization y evaluación humana.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una cuadrícula de muestras bonitas es evidencia cualitativa útil, pero insuficiente para caracterizar una distribución generativa."
        },
        {
          "title": "Mecánica y límites",
          "body": "Métricas como FID comparan estadísticas de features bajo un extractor concreto; no son una medida universal de calidad ni verdad semántica."
        },
        {
          "title": "Ingeniería",
          "body": "La evaluación debe incluir diversidad, adherencia al conditioning, duplicados/memorization y protocolo reproducible."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Se generan 5000 imágenes y 125 son duplicados exactos según el detector. Porcentaje marcado.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "2.5"
    },
    "check": {
      "question": "¿Un FID mejor demuestra por sí solo que cada imagen individual es mejor para humanos?",
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
      "feedback": "Una métrica generativa ≠ calidad universal: toda métrica hereda supuestos del dataset, extractor y protocolo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Se generan 5000 imágenes y 125 son duplicados exactos según el detector. Porcentaje marcado.",
        "answer": "2.5",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un FID mejor demuestra por sí solo que cada imagen individual es mejor para humanos?",
        "answer": "no",
        "hint": "FID resume estadísticas bajo un protocolo; no sustituye toda evaluación perceptual o semántica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  },
  "gen-integration": {
    "id": "gen-integration",
    "courseId": 66,
    "title": "Proyecto: generador pequeño comparativo",
    "shortTitle": "Proyecto generativo",
    "duration": 125,
    "objective": "Construir y comparar un autoencoder/VAE y un pequeño diffusion o GAN bajo un protocolo común de datos, sampling y evaluación.",
    "summary": [
      "El proyecto fija dataset/split, baseline de reconstrucción, modelo generativo, seeds, checkpoints y presupuesto de cómputo.",
      "Debe visualizar tanto muestras como fallos: colapso, blur, artefactos, mala cobertura, sensitivity al sampler o al latent bottleneck.",
      "La comparación final separa objetivo de training, coste de sampling, memoria, diversidad y calidad, sin declarar un ganador universal."
    ],
    "concept": "Comparar modelos generativos exige fijar datos y protocolo: arquitectura distinta ≠ comparación válida si cambian simultáneamente dataset, compute y evaluación.",
    "rules": [
      "Separa siempre objetivo de entrenamiento, representación interna y procedimiento de muestreo.",
      "No conviertas una métrica o una muestra visual en garantía de cobertura, causalidad, privacidad o generalización.",
      "Declara dataset, split, seed, presupuesto de cómputo y protocolo de sampling/evaluación antes de comparar modelos."
    ],
    "deep": {
      "intro": "Construir y comparar un autoencoder/VAE y un pequeño diffusion o GAN bajo un protocolo común de datos, sampling y evaluación.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El proyecto fija dataset/split, baseline de reconstrucción, modelo generativo, seeds, checkpoints y presupuesto de cómputo."
        },
        {
          "title": "Mecánica y límites",
          "body": "Debe visualizar tanto muestras como fallos: colapso, blur, artefactos, mala cobertura, sensitivity al sampler o al latent bottleneck."
        },
        {
          "title": "Ingeniería",
          "body": "La comparación final separa objetivo de training, coste de sampling, memoria, diversidad y calidad, sin declarar un ganador universal."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo calculable y comprueba shapes, objetivo, sampling, seeds y métricas antes de atribuir calidad a la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "3 modelos × 4 seeds × 2500 muestras de evaluación. Muestras totales.",
      "steps": [
        "Escribe la ecuación, shape o presupuesto relevante.",
        "Calcula el resultado y explica qué supuesto del modelo generativo se está usando."
      ],
      "solution": "30000"
    },
    "check": {
      "question": "¿Es válida una comparación causal si cada modelo usa un dataset y presupuesto de cómputo distintos sin controlarlo?",
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
      "feedback": "Comparar modelos generativos exige fijar datos y protocolo: arquitectura distinta ≠ comparación válida si cambian simultáneamente dataset, compute y evaluación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "3 modelos × 4 seeds × 2500 muestras de evaluación. Muestras totales.",
        "answer": "30000",
        "hint": "Calcula usando únicamente las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Es válida una comparación causal si cada modelo usa un dataset y presupuesto de cómputo distintos sin controlarlo?",
        "answer": "no",
        "hint": "El protocolo debe controlar o declarar las variables que cambian."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene declarar objective, datos y sampling/evaluación antes de generalizar este resultado?",
        "answer": "si",
        "hint": "En modelos generativos, el mecanismo de entrenamiento y el de muestreo no son intercambiables."
      }
    ]
  }
});
