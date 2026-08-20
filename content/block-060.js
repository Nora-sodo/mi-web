/**
 * BLOQUE 060 — INTELIGENCIA ARTIFICIAL: FUNDAMENTOS
 *
 * Regla editorial: aprender se define operacionalmente. Separar modelo, objetivo,
 * optimización y evaluación; train loss no es sinónimo de generalización.
 */
window.LEARNING_PATHS[60] = {
  "level": "Fundamentos de IA",
  "estimatedHours": 128,
  "description": "Fundamentos matemáticos del aprendizaje automático: modelos parametrizados, loss, optimización, datos, evaluación, overfitting y generalización.",
  "outcomes": [
    "Formular aprendizaje automático en términos de tareas, datos, funciones parametrizadas y objetivos medibles.",
    "Separar optimización de generalización y diseñar splits/evaluaciones sin leakage.",
    "Detectar overfitting, construir baselines y razonar sobre regularización y distribution shift.",
    "Construir un experimento reproducible desde dataset y baseline hasta evaluación y deployment."
  ],
  "modules": [
    {
      "id": "m1-foundations",
      "title": "Fundamentos matemáticos",
      "description": "Aprendizaje, funciones, parámetros y modelos",
      "lessons": [
        "ai-learning",
        "ai-functions",
        "ai-parameters",
        "ai-models"
      ]
    },
    {
      "id": "m2-objective",
      "title": "Objetivo y optimización",
      "description": "Loss, optimización y datos",
      "lessons": [
        "ai-loss",
        "ai-optimization",
        "ai-dataset"
      ]
    },
    {
      "id": "m3-evaluation",
      "title": "Evaluación y generalización",
      "description": "Splits, overfitting, generalización y baselines",
      "lessons": [
        "ai-splits",
        "ai-overfitting",
        "ai-generalization",
        "ai-baselines"
      ]
    },
    {
      "id": "m4-production",
      "title": "Regularización e integración",
      "description": "Regularización, pipeline y proyecto completo",
      "lessons": [
        "ai-regularization",
        "ai-pipeline",
        "ai-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "ai-learning": {
    "id": "ai-learning",
    "courseId": 60,
    "title": "Qué significa aprender: ajustar comportamiento desde datos",
    "shortTitle": "Qué significa aprender",
    "duration": 95,
    "objective": "Definir aprendizaje operacionalmente como mejorar una métrica sobre una tarea a partir de experiencia/datos, sin antropomorfizar el modelo.",
    "summary": [
      "En ML, aprender significa ajustar un sistema usando datos o experiencia para mejorar una métrica definida sobre una tarea.",
      "Aprender no implica consciencia, intención ni comprensión humana; describe un cambio medible en comportamiento o rendimiento.",
      "Una definición útil separa tarea, experiencia/dataset y criterio de rendimiento."
    ],
    "concept": "En ML, aprender significa ajustar un sistema usando datos o experiencia para mejorar una métrica definida sobre una tarea.",
    "rules": [
      "No confundas aprendizaje con memorización ni con inteligencia general.",
      "Declara siempre tarea, datos y métrica antes de afirmar que un sistema ha aprendido.",
      "Mejor rendimiento en entrenamiento no implica mejor rendimiento fuera de muestra."
    ],
    "deep": {
      "intro": "Definir aprendizaje operacionalmente como mejorar una métrica sobre una tarea a partir de experiencia/datos, sin antropomorfizar el modelo.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "En ML, aprender significa ajustar un sistema usando datos o experiencia para mejorar una métrica definida sobre una tarea."
        },
        {
          "title": "Frontera conceptual",
          "body": "Aprender no implica consciencia, intención ni comprensión humana; describe un cambio medible en comportamiento o rendimiento."
        },
        {
          "title": "Ingeniería",
          "body": "Una definición útil separa tarea, experiencia/dataset y criterio de rendimiento."
        },
        {
          "title": "Criterio práctico",
          "body": "No confundas aprendizaje con memorización ni con inteligencia general. Declara siempre tarea, datos y métrica antes de afirmar que un sistema ha aprendido."
        }
      ]
    },
    "example": {
      "problem": "Un clasificador pasa de 72% a 86% accuracy en un conjunto de evaluación comparable. Mejora absoluta en puntos porcentuales.",
      "steps": [
        "86-72 = 14."
      ],
      "solution": "14"
    },
    "check": {
      "question": "¿Aprender implica comprensión humana?",
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
          "Solo con redes profundas",
          false
        ]
      ],
      "feedback": "En ML, aprender significa ajustar un sistema usando datos o experiencia para mejorar una métrica definida sobre una tarea."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Aprender implica consciencia?",
        "answer": "no",
        "hint": "Es una definición operacional."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "72%→82%. Mejora absoluta en puntos porcentuales.",
        "answer": "10",
        "hint": "Resta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Menor train loss garantiza mejor test?",
        "answer": "no",
        "hint": "Generalización es aparte."
      }
    ]
  },
  "ai-functions": {
    "id": "ai-functions",
    "courseId": 60,
    "title": "Funciones como mapas: de entradas a salidas",
    "shortTitle": "Funciones",
    "duration": 95,
    "objective": "Modelar sistemas de ML como funciones que transforman entradas en predicciones y distinguir dominio, codominio y composición.",
    "summary": [
      "Un modelo puede verse como una función parametrizada fθ(x) que transforma una entrada x en una salida/predicción.",
      "Las dimensiones, unidades y dominio de entrada forman parte del contrato del modelo; una función no acepta cualquier objeto por arte de magia.",
      "Componer funciones permite representar pipelines completos: preprocesado, modelo, postprocesado."
    ],
    "concept": "Un modelo puede verse como una función parametrizada fθ(x) que transforma una entrada x en una salida/predicción.",
    "rules": [
      "Distingue variable de entrada, salida y parámetro.",
      "No confundas una función matemática con su implementación numérica concreta.",
      "Una misma función puede tener múltiples representaciones/implementaciones."
    ],
    "deep": {
      "intro": "Modelar sistemas de ML como funciones que transforman entradas en predicciones y distinguir dominio, codominio y composición.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un modelo puede verse como una función parametrizada fθ(x) que transforma una entrada x en una salida/predicción."
        },
        {
          "title": "Frontera conceptual",
          "body": "Las dimensiones, unidades y dominio de entrada forman parte del contrato del modelo; una función no acepta cualquier objeto por arte de magia."
        },
        {
          "title": "Ingeniería",
          "body": "Componer funciones permite representar pipelines completos: preprocesado, modelo, postprocesado."
        },
        {
          "title": "Criterio práctico",
          "body": "Distingue variable de entrada, salida y parámetro. No confundas una función matemática con su implementación numérica concreta."
        }
      ]
    },
    "example": {
      "problem": "f(x)=3x+2. Evalúa f(4).",
      "steps": [
        "3·4+2 = 14."
      ],
      "solution": "14"
    },
    "check": {
      "question": "¿θ en fθ(x) representa normalmente parámetros?",
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
          "Solo la etiqueta",
          false
        ]
      ],
      "feedback": "Un modelo puede verse como una función parametrizada fθ(x) que transforma una entrada x en una salida/predicción."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "f(x)=2x+1; f(3).",
        "answer": "7",
        "hint": "Sustituye x."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "g(x)=x²; g(-4).",
        "answer": "16",
        "hint": "Cuadrado."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Entrada y parámetro son lo mismo?",
        "answer": "no",
        "hint": "Roles distintos."
      }
    ]
  },
  "ai-parameters": {
    "id": "ai-parameters",
    "courseId": 60,
    "title": "Parámetros, hiperparámetros y estado aprendido",
    "shortTitle": "Parámetros",
    "duration": 95,
    "objective": "Distinguir parámetros aprendidos de hiperparámetros y otro estado del sistema.",
    "summary": [
      "Los parámetros son valores ajustados por el procedimiento de entrenamiento para determinar el comportamiento del modelo.",
      "Los hiperparámetros configuran el proceso/modelo —por ejemplo learning rate o profundidad— y no son necesariamente optimizados por el mismo gradiente.",
      "Estado aprendido, buffers y estadísticas auxiliares deben distinguirse de parámetros entrenables cuando se analiza reproducibilidad o deployment."
    ],
    "concept": "Los parámetros son valores ajustados por el procedimiento de entrenamiento para determinar el comportamiento del modelo.",
    "rules": [
      "Parámetro ≠ hiperparámetro.",
      "Número de parámetros ≠ capacidad útil universal ni calidad garantizada.",
      "Cuenta qué valores se actualizan, por qué algoritmo y con qué datos."
    ],
    "deep": {
      "intro": "Distinguir parámetros aprendidos de hiperparámetros y otro estado del sistema.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Los parámetros son valores ajustados por el procedimiento de entrenamiento para determinar el comportamiento del modelo."
        },
        {
          "title": "Frontera conceptual",
          "body": "Los hiperparámetros configuran el proceso/modelo —por ejemplo learning rate o profundidad— y no son necesariamente optimizados por el mismo gradiente."
        },
        {
          "title": "Ingeniería",
          "body": "Estado aprendido, buffers y estadísticas auxiliares deben distinguirse de parámetros entrenables cuando se analiza reproducibilidad o deployment."
        },
        {
          "title": "Criterio práctico",
          "body": "Parámetro ≠ hiperparámetro. Número de parámetros ≠ capacidad útil universal ni calidad garantizada."
        }
      ]
    },
    "example": {
      "problem": "Una capa lineal tiene 8 entradas y 3 salidas con bias. Número de parámetros.",
      "steps": [
        "Pesos: 8·3=24; biases: 3; total=27."
      ],
      "solution": "27"
    },
    "check": {
      "question": "¿Learning rate es normalmente un parámetro aprendido del modelo?",
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
          "Siempre",
          false
        ]
      ],
      "feedback": "Los parámetros son valores ajustados por el procedimiento de entrenamiento para determinar el comportamiento del modelo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "4 entradas→2 salidas con bias. Parámetros.",
        "answer": "10",
        "hint": "4·2+2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Pesos y biases suelen ser parámetros?",
        "answer": "si",
        "hint": "Se ajustan durante training."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más parámetros garantiza mejor generalización?",
        "answer": "no",
        "hint": "Depende de datos, regularización y tarea."
      }
    ]
  },
  "ai-models": {
    "id": "ai-models",
    "courseId": 60,
    "title": "Modelos: hipótesis, capacidad e inductive bias",
    "shortTitle": "Modelos",
    "duration": 95,
    "objective": "Entender un modelo como una familia de funciones/hipótesis y analizar capacidad, supuestos e inductive bias.",
    "summary": [
      "Un modelo no es solo un archivo de pesos: define una familia de funciones posibles y una forma de representar relaciones entre variables.",
      "La arquitectura introduce inductive biases: supuestos que hacen algunas soluciones más fáciles de expresar o aprender que otras.",
      "Más capacidad reduce restricciones expresivas, pero puede aumentar coste, necesidad de datos y riesgo de sobreajuste si el problema no lo justifica."
    ],
    "concept": "Un modelo no es solo un archivo de pesos: define una familia de funciones posibles y una forma de representar relaciones entre variables.",
    "rules": [
      "Modelo ≠ algoritmo de optimización.",
      "Arquitectura ≠ pesos entrenados.",
      "Capacidad mayor ≠ generalización mejor automáticamente."
    ],
    "deep": {
      "intro": "Entender un modelo como una familia de funciones/hipótesis y analizar capacidad, supuestos e inductive bias.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un modelo no es solo un archivo de pesos: define una familia de funciones posibles y una forma de representar relaciones entre variables."
        },
        {
          "title": "Frontera conceptual",
          "body": "La arquitectura introduce inductive biases: supuestos que hacen algunas soluciones más fáciles de expresar o aprender que otras."
        },
        {
          "title": "Ingeniería",
          "body": "Más capacidad reduce restricciones expresivas, pero puede aumentar coste, necesidad de datos y riesgo de sobreajuste si el problema no lo justifica."
        },
        {
          "title": "Criterio práctico",
          "body": "Modelo ≠ algoritmo de optimización. Arquitectura ≠ pesos entrenados."
        }
      ]
    },
    "example": {
      "problem": "Modelo A tiene 2 parámetros y B 2000. ¿Cuál generaliza mejor solo con esa información?",
      "steps": [
        "No puede determinarse solo por el número de parámetros."
      ],
      "solution": "no se puede determinar"
    },
    "check": {
      "question": "¿Arquitectura y pesos son lo mismo?",
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
          "Solo en regresión",
          false
        ]
      ],
      "feedback": "Un modelo no es solo un archivo de pesos: define una familia de funciones posibles y una forma de representar relaciones entre variables."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Modelo y optimizador son lo mismo?",
        "answer": "no",
        "hint": "Uno representa hipótesis; otro ajusta parámetros."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Más capacidad siempre mejora test?",
        "answer": "no",
        "hint": "Puede sobreajustar."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Inductive bias restringe/favorece ciertas soluciones?",
        "answer": "si",
        "hint": "Ese es su papel."
      }
    ]
  },
  "ai-loss": {
    "id": "ai-loss",
    "courseId": 60,
    "title": "Loss functions: convertir error en objetivo",
    "shortTitle": "Loss functions",
    "duration": 95,
    "objective": "Diseñar e interpretar funciones de pérdida distinguiendo error por ejemplo, agregación, escala y métrica final.",
    "summary": [
      "La loss transforma predicciones y objetivos en una cantidad que el entrenamiento intenta minimizar o, equivalentemente, maximizar tras una transformación de signo.",
      "La elección de loss define qué errores se penalizan y con qué geometría; no es intercambiable de forma inocua.",
      "Training loss y métrica de negocio/evaluación pueden ser distintas: una loss diferenciable puede actuar como surrogate."
    ],
    "concept": "La loss transforma predicciones y objetivos en una cantidad que el entrenamiento intenta minimizar o, equivalentemente, maximizar tras una transformación de signo.",
    "rules": [
      "Loss ≠ accuracy ni métrica final necesariamente.",
      "Promedio, suma y weighting cambian la escala y a veces el significado del objetivo.",
      "Una loss baja solo tiene sentido respecto a definición, dataset y baseline concretos."
    ],
    "deep": {
      "intro": "Diseñar e interpretar funciones de pérdida distinguiendo error por ejemplo, agregación, escala y métrica final.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La loss transforma predicciones y objetivos en una cantidad que el entrenamiento intenta minimizar o, equivalentemente, maximizar tras una transformación de signo."
        },
        {
          "title": "Frontera conceptual",
          "body": "La elección de loss define qué errores se penalizan y con qué geometría; no es intercambiable de forma inocua."
        },
        {
          "title": "Ingeniería",
          "body": "Training loss y métrica de negocio/evaluación pueden ser distintas: una loss diferenciable puede actuar como surrogate."
        },
        {
          "title": "Criterio práctico",
          "body": "Loss ≠ accuracy ni métrica final necesariamente. Promedio, suma y weighting cambian la escala y a veces el significado del objetivo."
        }
      ]
    },
    "example": {
      "problem": "Errores cuadrados: 1,4,9,16. MSE.",
      "steps": [
        "(1+4+9+16)/4 = 7.5."
      ],
      "solution": "7.5"
    },
    "check": {
      "question": "¿La loss de entrenamiento debe ser siempre igual a la métrica final?",
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
          "Solo en clasificación",
          false
        ]
      ],
      "feedback": "La loss transforma predicciones y objetivos en una cantidad que el entrenamiento intenta minimizar o, equivalentemente, maximizar tras una transformación de signo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Errores cuadrados 1 y 9. MSE.",
        "answer": "5",
        "hint": "(1+9)/2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cambiar sum por mean cambia escala?",
        "answer": "si",
        "hint": "Divide por tamaño del batch."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Loss más baja en train basta para elegir modelo?",
        "answer": "no",
        "hint": "Hay que evaluar fuera de muestra."
      }
    ]
  },
  "ai-optimization": {
    "id": "ai-optimization",
    "courseId": 60,
    "title": "Optimización: buscar parámetros que reduzcan el objetivo",
    "shortTitle": "Optimización",
    "duration": 95,
    "objective": "Comprender gradient descent, learning rate, convergencia y por qué optimizar una loss no garantiza encontrar el mejor modelo posible.",
    "summary": [
      "El optimizador actualiza parámetros para reducir un objetivo; gradient descent usa información local del gradiente.",
      "El learning rate controla la magnitud de actualización y puede hacer el entrenamiento lento, inestable o divergente.",
      "Optimización y generalización son problemas distintos: llegar a menor train loss no implica automáticamente mejor test loss."
    ],
    "concept": "El optimizador actualiza parámetros para reducir un objetivo; gradient descent usa información local del gradiente.",
    "rules": [
      "Gradiente cero ≠ mínimo global universal.",
      "Learning rate grande ≠ aprendizaje más rápido necesariamente.",
      "El optimizador ve el objetivo que le das, no la intención humana detrás de la tarea."
    ],
    "deep": {
      "intro": "Comprender gradient descent, learning rate, convergencia y por qué optimizar una loss no garantiza encontrar el mejor modelo posible.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El optimizador actualiza parámetros para reducir un objetivo; gradient descent usa información local del gradiente."
        },
        {
          "title": "Frontera conceptual",
          "body": "El learning rate controla la magnitud de actualización y puede hacer el entrenamiento lento, inestable o divergente."
        },
        {
          "title": "Ingeniería",
          "body": "Optimización y generalización son problemas distintos: llegar a menor train loss no implica automáticamente mejor test loss."
        },
        {
          "title": "Criterio práctico",
          "body": "Gradiente cero ≠ mínimo global universal. Learning rate grande ≠ aprendizaje más rápido necesariamente."
        }
      ]
    },
    "example": {
      "problem": "θ=10, gradiente=4, learning rate=0.1. Un paso SGD θ'=θ-ηg.",
      "steps": [
        "10-0.1·4 = 9.6."
      ],
      "solution": "9.6"
    },
    "check": {
      "question": "¿Gradiente cero garantiza mínimo global?",
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
          "Solo con SGD",
          false
        ]
      ],
      "feedback": "El optimizador actualiza parámetros para reducir un objetivo; gradient descent usa información local del gradiente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "θ=5,g=2,η=0.25. Nuevo θ.",
        "answer": "4.5",
        "hint": "5-0.5."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿η enorme puede divergir?",
        "answer": "si",
        "hint": "Puede sobrepasar regiones útiles."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Optimización y generalización son equivalentes?",
        "answer": "no",
        "hint": "Objetivos distintos."
      }
    ]
  },
  "ai-dataset": {
    "id": "ai-dataset",
    "courseId": 60,
    "title": "Dataset: muestras, features, labels y distribución",
    "shortTitle": "Dataset",
    "duration": 95,
    "objective": "Razonar sobre datasets como muestras de una distribución/proceso, distinguiendo features, labels, cobertura, sesgo y leakage.",
    "summary": [
      "Un dataset es una colección finita de observaciones; no es la distribución real completa que queremos modelar.",
      "Features son entradas y labels/targets son objetivos cuando existen; en aprendizaje no supervisado puede no haber labels explícitas.",
      "Calidad, cobertura, representatividad, errores de etiquetado y leakage pueden dominar el rendimiento más que cambiar de arquitectura."
    ],
    "concept": "Un dataset es una colección finita de observaciones; no es la distribución real completa que queremos modelar.",
    "rules": [
      "Dataset grande ≠ dataset representativo.",
      "Más ejemplos duplicados ≠ más información independiente.",
      "Leakage ocurre cuando el entrenamiento accede a información que no estará legítimamente disponible al predecir."
    ],
    "deep": {
      "intro": "Razonar sobre datasets como muestras de una distribución/proceso, distinguiendo features, labels, cobertura, sesgo y leakage.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un dataset es una colección finita de observaciones; no es la distribución real completa que queremos modelar."
        },
        {
          "title": "Frontera conceptual",
          "body": "Features son entradas y labels/targets son objetivos cuando existen; en aprendizaje no supervisado puede no haber labels explícitas."
        },
        {
          "title": "Ingeniería",
          "body": "Calidad, cobertura, representatividad, errores de etiquetado y leakage pueden dominar el rendimiento más que cambiar de arquitectura."
        },
        {
          "title": "Criterio práctico",
          "body": "Dataset grande ≠ dataset representativo. Más ejemplos duplicados ≠ más información independiente."
        }
      ]
    },
    "example": {
      "problem": "Dataset de 12000 ejemplos con 900 positivos. Porcentaje positivo.",
      "steps": [
        "900/12000·100 = 7.5%."
      ],
      "solution": "7.5"
    },
    "check": {
      "question": "¿Un dataset finito es la distribución real completa?",
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
          "Solo si es grande",
          false
        ]
      ],
      "feedback": "Un dataset es una colección finita de observaciones; no es la distribución real completa que queremos modelar."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "200 ejemplos, 50 positivos. Porcentaje.",
        "answer": "25",
        "hint": "50/200·100."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Duplicar todas las filas duplica información independiente?",
        "answer": "no",
        "hint": "Solo replica observaciones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Usar una feature futura al entrenar puede ser leakage?",
        "answer": "si",
        "hint": "No existe al tiempo de inferencia."
      }
    ]
  },
  "ai-splits": {
    "id": "ai-splits",
    "courseId": 60,
    "title": "Train, validation y test: separar ajuste de evaluación",
    "shortTitle": "Train/validation/test",
    "duration": 95,
    "objective": "Diseñar particiones de datos que separen ajuste, selección y evaluación final sin contaminar el test.",
    "summary": [
      "Training data ajusta parámetros; validation ayuda a seleccionar hiperparámetros/modelos; test estima rendimiento final una vez cerrado el proceso.",
      "Consultar repetidamente el test para tomar decisiones lo convierte de facto en otro validation set y sesga la evaluación.",
      "La estrategia de split debe respetar la estructura del problema: tiempo, grupos, usuarios o entidades correlacionadas pueden requerir particiones específicas."
    ],
    "concept": "Training data ajusta parámetros; validation ayuda a seleccionar hiperparámetros/modelos; test estima rendimiento final una vez cerrado el proceso.",
    "rules": [
      "Train/test split aleatorio no es universalmente válido.",
      "Test ≠ conjunto para tunear hiperparámetros.",
      "Preprocesado aprendido debe ajustarse solo con la parte de training correspondiente."
    ],
    "deep": {
      "intro": "Diseñar particiones de datos que separen ajuste, selección y evaluación final sin contaminar el test.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Training data ajusta parámetros; validation ayuda a seleccionar hiperparámetros/modelos; test estima rendimiento final una vez cerrado el proceso."
        },
        {
          "title": "Frontera conceptual",
          "body": "Consultar repetidamente el test para tomar decisiones lo convierte de facto en otro validation set y sesga la evaluación."
        },
        {
          "title": "Ingeniería",
          "body": "La estrategia de split debe respetar la estructura del problema: tiempo, grupos, usuarios o entidades correlacionadas pueden requerir particiones específicas."
        },
        {
          "title": "Criterio práctico",
          "body": "Train/test split aleatorio no es universalmente válido. Test ≠ conjunto para tunear hiperparámetros."
        }
      ]
    },
    "example": {
      "problem": "Dataset 10000; split 70/15/15. Tamaño test.",
      "steps": [
        "0.15·10000 = 1500."
      ],
      "solution": "1500"
    },
    "check": {
      "question": "¿Debemos elegir hiperparámetros mirando continuamente el test?",
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
          "Solo si el dataset es grande",
          false
        ]
      ],
      "feedback": "Training data ajusta parámetros; validation ayuda a seleccionar hiperparámetros/modelos; test estima rendimiento final una vez cerrado el proceso."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "8000 ejemplos, 75% train. Train count.",
        "answer": "6000",
        "hint": "0.75·8000."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Validation y test cumplen exactamente el mismo papel?",
        "answer": "no",
        "hint": "Selección vs evaluación final."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Normalizador puede fittear con train+test?",
        "answer": "no",
        "hint": "Eso filtra información."
      }
    ]
  },
  "ai-overfitting": {
    "id": "ai-overfitting",
    "courseId": 60,
    "title": "Overfitting y underfitting: error de train no es el mundo",
    "shortTitle": "Overfitting",
    "duration": 95,
    "objective": "Detectar overfitting y underfitting mediante curvas de entrenamiento/evaluación y relacionarlos con capacidad, datos y regularización.",
    "summary": [
      "Overfitting ocurre cuando el modelo se adapta demasiado a peculiaridades del entrenamiento y pierde rendimiento fuera de muestra.",
      "Underfitting ocurre cuando el modelo/procedimiento ni siquiera captura adecuadamente la estructura del entrenamiento.",
      "El gap train-validation es una señal útil, pero su interpretación depende de ruido, distribución y métricas."
    ],
    "concept": "Overfitting ocurre cuando el modelo se adapta demasiado a peculiaridades del entrenamiento y pierde rendimiento fuera de muestra.",
    "rules": [
      "Train loss muy baja ≠ modelo bueno por sí sola.",
      "Más epochs pueden empeorar generalización.",
      "Regularización, más datos relevantes, data augmentation o menor capacidad pueden ayudar según la causa."
    ],
    "deep": {
      "intro": "Detectar overfitting y underfitting mediante curvas de entrenamiento/evaluación y relacionarlos con capacidad, datos y regularización.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Overfitting ocurre cuando el modelo se adapta demasiado a peculiaridades del entrenamiento y pierde rendimiento fuera de muestra."
        },
        {
          "title": "Frontera conceptual",
          "body": "Underfitting ocurre cuando el modelo/procedimiento ni siquiera captura adecuadamente la estructura del entrenamiento."
        },
        {
          "title": "Ingeniería",
          "body": "El gap train-validation es una señal útil, pero su interpretación depende de ruido, distribución y métricas."
        },
        {
          "title": "Criterio práctico",
          "body": "Train loss muy baja ≠ modelo bueno por sí sola. Más epochs pueden empeorar generalización."
        }
      ]
    },
    "example": {
      "problem": "Accuracy train 99%, validation 78%. Gap en puntos porcentuales.",
      "steps": [
        "99-78 = 21."
      ],
      "solution": "21"
    },
    "check": {
      "question": "¿Más epochs siempre reducen overfitting?",
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
          "Solo con Adam",
          false
        ]
      ],
      "feedback": "Overfitting ocurre cuando el modelo se adapta demasiado a peculiaridades del entrenamiento y pierde rendimiento fuera de muestra."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Train 95, val 90. Gap.",
        "answer": "5",
        "hint": "95-90."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Train y val bajos pueden sugerir underfitting?",
        "answer": "si",
        "hint": "El modelo no ajusta ni train."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más capacidad siempre reduce overfitting?",
        "answer": "no",
        "hint": "Puede aumentarlo."
      }
    ]
  },
  "ai-generalization": {
    "id": "ai-generalization",
    "courseId": 60,
    "title": "Generalización: rendimiento fuera de muestra",
    "shortTitle": "Generalization",
    "duration": 95,
    "objective": "Entender generalización como rendimiento sobre datos nuevos de la distribución objetivo y distinguir IID, shift y robustez.",
    "summary": [
      "Generalizar significa mantener buen rendimiento sobre ejemplos no usados para ajustar el modelo y relevantes para la distribución objetivo.",
      "Una buena métrica IID no garantiza robustez bajo distribution shift, cambios de población, sensores o condiciones operativas.",
      "La generalización se estima; no se demuestra a partir de un único test finito salvo supuestos estadísticos adicionales."
    ],
    "concept": "Generalizar significa mantener buen rendimiento sobre ejemplos no usados para ajustar el modelo y relevantes para la distribución objetivo.",
    "rules": [
      "Test accuracy alta ≠ garantía universal futura.",
      "IID split ≠ evaluación de distribution shift.",
      "Define población objetivo y condiciones de deployment antes de interpretar la métrica."
    ],
    "deep": {
      "intro": "Entender generalización como rendimiento sobre datos nuevos de la distribución objetivo y distinguir IID, shift y robustez.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Generalizar significa mantener buen rendimiento sobre ejemplos no usados para ajustar el modelo y relevantes para la distribución objetivo."
        },
        {
          "title": "Frontera conceptual",
          "body": "Una buena métrica IID no garantiza robustez bajo distribution shift, cambios de población, sensores o condiciones operativas."
        },
        {
          "title": "Ingeniería",
          "body": "La generalización se estima; no se demuestra a partir de un único test finito salvo supuestos estadísticos adicionales."
        },
        {
          "title": "Criterio práctico",
          "body": "Test accuracy alta ≠ garantía universal futura. IID split ≠ evaluación de distribution shift."
        }
      ]
    },
    "example": {
      "problem": "Error train 4%, test 7%. Generalization gap en puntos porcentuales.",
      "steps": [
        "7-4 = 3."
      ],
      "solution": "3"
    },
    "check": {
      "question": "¿Buen test IID garantiza robustez a cualquier shift?",
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
          "Solo con muchos datos",
          false
        ]
      ],
      "feedback": "Generalizar significa mantener buen rendimiento sobre ejemplos no usados para ajustar el modelo y relevantes para la distribución objetivo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Train error 2,test 5. Gap.",
        "answer": "3",
        "hint": "5-2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Test finito prueba rendimiento futuro exacto?",
        "answer": "no",
        "hint": "Es una estimación."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cambiar cámara/sensor puede crear distribution shift?",
        "answer": "si",
        "hint": "Cambia el proceso de datos."
      }
    ]
  },
  "ai-baselines": {
    "id": "ai-baselines",
    "courseId": 60,
    "title": "Baselines, métricas y comparación experimental",
    "shortTitle": "Baselines",
    "duration": 95,
    "objective": "Construir baselines y comparar modelos con métricas adecuadas evitando mejoras sin referencia o métricas engañosas.",
    "summary": [
      "Un baseline establece qué rendimiento obtiene una estrategia simple y permite medir si la complejidad añadida aporta valor real.",
      "Accuracy puede ser engañosa en clases desbalanceadas; la métrica debe corresponder al coste de errores de la tarea.",
      "Una comparación válida mantiene splits, preprocessing y protocolo de evaluación comparables."
    ],
    "concept": "Un baseline establece qué rendimiento obtiene una estrategia simple y permite medir si la complejidad añadida aporta valor real.",
    "rules": [
      "Modelo complejo ≠ baseline superado.",
      "Accuracy alta ≠ buena detección de minoría.",
      "Una mejora debe reportar baseline, métrica, incertidumbre y condiciones de evaluación."
    ],
    "deep": {
      "intro": "Construir baselines y comparar modelos con métricas adecuadas evitando mejoras sin referencia o métricas engañosas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un baseline establece qué rendimiento obtiene una estrategia simple y permite medir si la complejidad añadida aporta valor real."
        },
        {
          "title": "Frontera conceptual",
          "body": "Accuracy puede ser engañosa en clases desbalanceadas; la métrica debe corresponder al coste de errores de la tarea."
        },
        {
          "title": "Ingeniería",
          "body": "Una comparación válida mantiene splits, preprocessing y protocolo de evaluación comparables."
        },
        {
          "title": "Criterio práctico",
          "body": "Modelo complejo ≠ baseline superado. Accuracy alta ≠ buena detección de minoría."
        }
      ]
    },
    "example": {
      "problem": "Baseline 80%, modelo 86%. Mejora relativa porcentual sobre baseline.",
      "steps": [
        "(86-80)/80·100 = 7.5%."
      ],
      "solution": "7.5"
    },
    "check": {
      "question": "¿Accuracy siempre es suficiente con clases muy desbalanceadas?",
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
          "Solo con redes",
          false
        ]
      ],
      "feedback": "Un baseline establece qué rendimiento obtiene una estrategia simple y permite medir si la complejidad añadida aporta valor real."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Baseline 50,modelo 60. Mejora absoluta puntos.",
        "answer": "10",
        "hint": "60-50."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Baseline puede ser una regla simple?",
        "answer": "si",
        "hint": "Debe ser comparativa útil."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Comparar modelos con splits distintos puede sesgar conclusión?",
        "answer": "si",
        "hint": "No es una comparación controlada."
      }
    ]
  },
  "ai-regularization": {
    "id": "ai-regularization",
    "courseId": 60,
    "title": "Regularización: controlar la solución, no solo la loss",
    "shortTitle": "Regularización",
    "duration": 95,
    "objective": "Entender regularización explícita e implícita como mecanismos que sesgan la solución hacia modelos con propiedades deseadas.",
    "summary": [
      "Regularizar significa modificar el problema de entrenamiento o la representación para favorecer soluciones que generalicen mejor bajo ciertos supuestos.",
      "L1/L2, early stopping, data augmentation y restricciones arquitectónicas actúan de formas diferentes; no son intercambiables.",
      "Más regularización puede reducir overfitting pero también causar underfitting."
    ],
    "concept": "Regularizar significa modificar el problema de entrenamiento o la representación para favorecer soluciones que generalicen mejor bajo ciertos supuestos.",
    "rules": [
      "Regularización ≠ garantía de generalización.",
      "L2 penalty añade un término al objetivo; no equivale a borrar parámetros pequeños.",
      "Early stopping usa una señal de validación/criterio temporal y forma parte del procedimiento de selección."
    ],
    "deep": {
      "intro": "Entender regularización explícita e implícita como mecanismos que sesgan la solución hacia modelos con propiedades deseadas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Regularizar significa modificar el problema de entrenamiento o la representación para favorecer soluciones que generalicen mejor bajo ciertos supuestos."
        },
        {
          "title": "Frontera conceptual",
          "body": "L1/L2, early stopping, data augmentation y restricciones arquitectónicas actúan de formas diferentes; no son intercambiables."
        },
        {
          "title": "Ingeniería",
          "body": "Más regularización puede reducir overfitting pero también causar underfitting."
        },
        {
          "title": "Criterio práctico",
          "body": "Regularización ≠ garantía de generalización. L2 penalty añade un término al objetivo; no equivale a borrar parámetros pequeños."
        }
      ]
    },
    "example": {
      "problem": "Loss de datos=0.8, penalty=0.5, λ=0.2. Loss total = data + λ·penalty.",
      "steps": [
        "0.8+0.2·0.5 = 0.9."
      ],
      "solution": "0.9"
    },
    "check": {
      "question": "¿Más regularización siempre mejora validation?",
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
          "Solo L2",
          false
        ]
      ],
      "feedback": "Regularizar significa modificar el problema de entrenamiento o la representación para favorecer soluciones que generalicen mejor bajo ciertos supuestos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "0.6 + λ0.1·penalty2. Total.",
        "answer": "0.8",
        "hint": "0.6+0.2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Early stopping puede actuar como regularización?",
        "answer": "si",
        "hint": "Limita ajuste prolongado."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿L1 y L2 son idénticas?",
        "answer": "no",
        "hint": "Penalizan de forma distinta."
      }
    ]
  },
  "ai-pipeline": {
    "id": "ai-pipeline",
    "courseId": 60,
    "title": "Pipeline de aprendizaje: del problema al deployment",
    "shortTitle": "Pipeline de aprendizaje",
    "duration": 95,
    "objective": "Integrar definición del problema, datos, split, modelo, loss, optimización, evaluación y monitoreo como un sistema reproducible.",
    "summary": [
      "Un pipeline de ML empieza por definir objetivo y datos, no por elegir una arquitectura popular.",
      "Preprocesado, features, modelo y postprocesado forman una cadena cuyo estado debe versionarse para reproducibilidad.",
      "Deployment introduce nuevas restricciones: latencia, memoria, drift, calibración, privacidad y observabilidad pueden cambiar qué modelo es adecuado."
    ],
    "concept": "Un pipeline de ML empieza por definir objetivo y datos, no por elegir una arquitectura popular.",
    "rules": [
      "Offline metric ≠ comportamiento de producción.",
      "El mismo preprocessing debe aplicarse coherentemente en train e inference.",
      "Versiona dataset, código, configuración y artefactos; una seed sola no garantiza reproducibilidad total."
    ],
    "deep": {
      "intro": "Integrar definición del problema, datos, split, modelo, loss, optimización, evaluación y monitoreo como un sistema reproducible.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un pipeline de ML empieza por definir objetivo y datos, no por elegir una arquitectura popular."
        },
        {
          "title": "Frontera conceptual",
          "body": "Preprocesado, features, modelo y postprocesado forman una cadena cuyo estado debe versionarse para reproducibilidad."
        },
        {
          "title": "Ingeniería",
          "body": "Deployment introduce nuevas restricciones: latencia, memoria, drift, calibración, privacidad y observabilidad pueden cambiar qué modelo es adecuado."
        },
        {
          "title": "Criterio práctico",
          "body": "Offline metric ≠ comportamiento de producción. El mismo preprocessing debe aplicarse coherentemente en train e inference."
        }
      ]
    },
    "example": {
      "problem": "Preprocesado 3 ms, modelo 12 ms, post 2 ms. Latencia secuencial total.",
      "steps": [
        "3+12+2 = 17 ms."
      ],
      "solution": "17"
    },
    "check": {
      "question": "¿Elegir arquitectura debe ser necesariamente el primer paso?",
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
          "Solo en deep learning",
          false
        ]
      ],
      "feedback": "Un pipeline de ML empieza por definir objetivo y datos, no por elegir una arquitectura popular."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "2+8+1 ms. Total.",
        "answer": "11",
        "hint": "Suma etapas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Train e inference deben usar transformaciones compatibles?",
        "answer": "si",
        "hint": "Evita train-serving skew."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Seed única garantiza reproducibilidad bit a bit?",
        "answer": "no",
        "hint": "Hay más fuentes de variación."
      }
    ]
  },
  "ai-integration": {
    "id": "ai-integration",
    "courseId": 60,
    "title": "Proyecto integrado: aprender desde las matemáticas",
    "shortTitle": "Proyecto integrado",
    "duration": 130,
    "objective": "Construir un experimento completo de ML pequeño justificando modelo, loss, split, baseline, optimización y generalización.",
    "summary": [
      "El proyecto integrado obliga a formular una hipótesis medible, construir un baseline y separar ajuste de evaluación.",
      "Cada resultado debe acompañarse de condiciones: split, seed/configuración, métrica, dataset versionado y coste computacional.",
      "El objetivo no es producir el modelo más grande, sino demostrar que entiendes qué se optimizó, por qué y cómo sabes si generaliza."
    ],
    "concept": "El proyecto integrado obliga a formular una hipótesis medible, construir un baseline y separar ajuste de evaluación.",
    "rules": [
      "No uses el test para iterar decisiones.",
      "Compara contra baseline y reporta train/validation/test de forma separada.",
      "Documenta errores cualitativos y casos donde la métrica agregada oculta fallos."
    ],
    "deep": {
      "intro": "Construir un experimento completo de ML pequeño justificando modelo, loss, split, baseline, optimización y generalización.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El proyecto integrado obliga a formular una hipótesis medible, construir un baseline y separar ajuste de evaluación."
        },
        {
          "title": "Frontera conceptual",
          "body": "Cada resultado debe acompañarse de condiciones: split, seed/configuración, métrica, dataset versionado y coste computacional."
        },
        {
          "title": "Ingeniería",
          "body": "El objetivo no es producir el modelo más grande, sino demostrar que entiendes qué se optimizó, por qué y cómo sabes si generaliza."
        },
        {
          "title": "Criterio práctico",
          "body": "No uses el test para iterar decisiones. Compara contra baseline y reporta train/validation/test de forma separada."
        }
      ]
    },
    "example": {
      "problem": "Baseline test=0.72, modelo test=0.81. Mejora absoluta puntos porcentuales.",
      "steps": [
        "(0.81-0.72)·100 = 9."
      ],
      "solution": "9"
    },
    "check": {
      "question": "¿El test debe guiar cada iteración del modelo?",
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
          "Solo si se reporta",
          false
        ]
      ],
      "feedback": "El proyecto integrado obliga a formular una hipótesis medible, construir un baseline y separar ajuste de evaluación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Val 0.76,test 0.74. Diferencia puntos.",
        "answer": "2",
        "hint": "(0.76-0.74)·100."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Debes registrar baseline?",
        "answer": "si",
        "hint": "Sin referencia no sabes qué aportó el modelo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Menor train loss basta para declarar éxito?",
        "answer": "no",
        "hint": "Evalúa generalización y objetivo real."
      }
    ]
  }
});
