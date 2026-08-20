/**
 * BLOQUE 076 — HISTORIA DE LA COMPUTACIÓN
 *
 * Regla editorial: historia técnica causal, sin teleología ni mitos de inventor único.
 */
window.LEARNING_PATHS[76] = {
  "level": "Historia de la Computación",
  "estimatedHours": 315,
  "description": "Historia técnica y causal de la computación: de mecanismos y lógica a semiconductores, sistemas, Internet, plataformas personales, cloud e IA moderna.",
  "outcomes": [
    "Explicar la historia de la computación como cadena de problemas, mecanismos e impactos y no como lista de fechas.",
    "Distinguir contribuciones conceptuales, implementaciones, productos y estándares sin caer en atribuciones simplistas.",
    "Relacionar cambios de tecnología física con cambios de arquitectura, software, redes y modelos de uso.",
    "Analizar fuentes históricas y separar evidencia documentada de interpretación retrospectiva."
  ],
  "modules": [
    {
      "id": "m1-mechanical",
      "title": "Fundamentos mecánicos y lógicos",
      "description": "De mecanismos a modelos",
      "lessons": [
        "hist-mechanical-machines",
        "hist-pascal",
        "hist-leibniz",
        "hist-babbage",
        "hist-ada-lovelace",
        "hist-boole"
      ]
    },
    {
      "id": "m2-computation",
      "title": "Computabilidad y programa almacenado",
      "description": "De la lógica a la máquina general",
      "lessons": [
        "hist-turing",
        "hist-shannon",
        "hist-von-neumann"
      ]
    },
    {
      "id": "m3-electronics",
      "title": "Tecnologías de conmutación",
      "description": "Relés, válvulas y semiconductores",
      "lessons": [
        "hist-relays",
        "hist-vacuum-tubes",
        "hist-transistor",
        "hist-integrated-circuit",
        "hist-microprocessor"
      ]
    },
    {
      "id": "m4-systems",
      "title": "Sistemas y acceso",
      "description": "Mainframes, minis, micros y Unix",
      "lessons": [
        "hist-mainframes",
        "hist-minicomputers",
        "hist-microcomputers",
        "hist-unix"
      ]
    },
    {
      "id": "m5-network-personal",
      "title": "Redes y plataformas personales",
      "description": "Internet, PC y consolas",
      "lessons": [
        "hist-internet",
        "hist-pc",
        "hist-consoles"
      ]
    },
    {
      "id": "m6-modern",
      "title": "Aceleración y ubicuidad",
      "description": "GPU, smartphone y cloud",
      "lessons": [
        "hist-gpu",
        "hist-smartphone",
        "hist-cloud"
      ]
    },
    {
      "id": "m7-ai-capstone",
      "title": "IA y síntesis histórica",
      "description": "IA moderna y proyecto",
      "lessons": [
        "hist-modern-ai",
        "hist-capstone"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "hist-mechanical-machines": {
    "id": "hist-mechanical-machines",
    "courseId": 76,
    "title": "Máquinas mecánicas y cálculo antes de lo electrónico",
    "shortTitle": "Máquinas mecánicas",
    "duration": 125,
    "objective": "Explicar cómo engranajes, ruedas y mecanismos discretos permitieron automatizar operaciones antes de la electrónica.",
    "summary": [
      "Las máquinas de cálculo mecánicas demostraron que una operación simbólica puede materializarse en estados físicos y transiciones controladas.",
      "Su límite principal era mecánico: velocidad, desgaste, precisión, fabricación y complejidad crecían rápidamente.",
      "Una calculadora mecánica no es todavía un computador de propósito general: automatiza procedimientos concretos y carece de la combinación moderna de memoria, control programable y E/S flexible."
    ],
    "concept": "Las máquinas de cálculo mecánicas demostraron que una operación simbólica puede materializarse en estados físicos y transiciones controladas.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Explicar cómo engranajes, ruedas y mecanismos discretos permitieron automatizar operaciones antes de la electrónica.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Las máquinas de cálculo mecánicas demostraron que una operación simbólica puede materializarse en estados físicos y transiciones controladas."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "Su límite principal era mecánico: velocidad, desgaste, precisión, fabricación y complejidad crecían rápidamente."
        },
        {
          "title": "Matiz histórico",
          "body": "Una calculadora mecánica no es todavía un computador de propósito general: automatiza procedimientos concretos y carece de la combinación moderna de memoria, control programable y E/S flexible."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Una máquina debe ser electrónica para realizar cómputo automático?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una máquina debe ser electrónica para realizar cómputo automático?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "Una calculadora mecánica no es todavía un computador de propósito general: automatiza procedimientos concretos y carece de la combinación moderna de memoria, control programable y E/S flexible."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una máquina debe ser electrónica para realizar cómputo automático?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Máquinas mecánicas indicando problema, mecanismo y consecuencia.",
        "answer": "mecanismo",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Máquinas mecánicas con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-pascal": {
    "id": "hist-pascal",
    "courseId": 76,
    "title": "Pascal y la Pascalina",
    "shortTitle": "Pascal",
    "duration": 115,
    "objective": "Situar la Pascalina como ejemplo temprano de automatización mecánica de la aritmética y entender qué problema resolvía.",
    "summary": [
      "Blaise Pascal construyó calculadoras mecánicas en el siglo XVII para automatizar sumas y restas mediante ruedas y mecanismos de acarreo.",
      "El avance clave no fue “inventar el ordenador”, sino convertir reglas aritméticas repetitivas en un mecanismo físico reproducible.",
      "Las atribuciones históricas deben ser específicas: hubo dispositivos y conceptos anteriores; Pascal es importante por una máquina mecánica funcional y documentada, no como origen único de toda computación."
    ],
    "concept": "Blaise Pascal construyó calculadoras mecánicas en el siglo XVII para automatizar sumas y restas mediante ruedas y mecanismos de acarreo.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Situar la Pascalina como ejemplo temprano de automatización mecánica de la aritmética y entender qué problema resolvía.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Blaise Pascal construyó calculadoras mecánicas en el siglo XVII para automatizar sumas y restas mediante ruedas y mecanismos de acarreo."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "El avance clave no fue “inventar el ordenador”, sino convertir reglas aritméticas repetitivas en un mecanismo físico reproducible."
        },
        {
          "title": "Matiz histórico",
          "body": "Las atribuciones históricas deben ser específicas: hubo dispositivos y conceptos anteriores; Pascal es importante por una máquina mecánica funcional y documentada, no como origen único de toda computación."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Es correcto llamar a Pascal inventor único de la computación?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Es correcto llamar a Pascal inventor único de la computación?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "Las atribuciones históricas deben ser específicas: hubo dispositivos y conceptos anteriores; Pascal es importante por una máquina mecánica funcional y documentada, no como origen único de toda computación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Es correcto llamar a Pascal inventor único de la computación?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Pascal indicando problema, mecanismo y consecuencia.",
        "answer": "atribucion",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Pascal con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-leibniz": {
    "id": "hist-leibniz",
    "courseId": 76,
    "title": "Leibniz: cálculo mecánico y aritmética binaria",
    "shortTitle": "Leibniz",
    "duration": 120,
    "objective": "Relacionar las máquinas de Leibniz y su interés por el binario con la posterior representación digital.",
    "summary": [
      "Leibniz extendió la ambición de las calculadoras mecánicas hacia multiplicación/división y estudió sistemáticamente la aritmética binaria.",
      "La aritmética binaria ofrece una representación matemática con dos símbolos; siglos después encajaría especialmente bien con circuitos electrónicos de dos regiones lógicas robustas.",
      "Que Leibniz estudiara el binario no significa que diseñara la electrónica digital moderna: la conexión histórica atraviesa desarrollos posteriores en lógica, relés, electrónica y teoría de circuitos."
    ],
    "concept": "Leibniz extendió la ambición de las calculadoras mecánicas hacia multiplicación/división y estudió sistemáticamente la aritmética binaria.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Relacionar las máquinas de Leibniz y su interés por el binario con la posterior representación digital.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Leibniz extendió la ambición de las calculadoras mecánicas hacia multiplicación/división y estudió sistemáticamente la aritmética binaria."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "La aritmética binaria ofrece una representación matemática con dos símbolos; siglos después encajaría especialmente bien con circuitos electrónicos de dos regiones lógicas robustas."
        },
        {
          "title": "Matiz histórico",
          "body": "Que Leibniz estudiara el binario no significa que diseñara la electrónica digital moderna: la conexión histórica atraviesa desarrollos posteriores en lógica, relés, electrónica y teoría de circuitos."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿El estudio del binario por Leibniz equivale a haber diseñado un computador digital moderno?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿El estudio del binario por Leibniz equivale a haber diseñado un computador digital moderno?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "Que Leibniz estudiara el binario no significa que diseñara la electrónica digital moderna: la conexión histórica atraviesa desarrollos posteriores en lógica, relés, electrónica y teoría de circuitos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El estudio del binario por Leibniz equivale a haber diseñado un computador digital moderno?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Leibniz indicando problema, mecanismo y consecuencia.",
        "answer": "binario",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Leibniz con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-babbage": {
    "id": "hist-babbage",
    "courseId": 76,
    "title": "Babbage: Difference Engine y Analytical Engine",
    "shortTitle": "Babbage",
    "duration": 140,
    "objective": "Distinguir una máquina especializada de tablas matemáticas de la concepción de una máquina programable de propósito general.",
    "summary": [
      "La Difference Engine estaba orientada a tabular funciones mediante diferencias finitas; la Analytical Engine fue concebida con almacenamiento, una unidad de operación y control programable mediante tarjetas.",
      "La importancia de la Analytical Engine está en su arquitectura conceptual: separar datos, operaciones, memoria y secuenciación acerca la máquina al computador programable.",
      "El proyecto no llegó a construirse completo en vida de Babbage; por tanto hay que separar diseño conceptual, prototipos parciales y máquinas posteriormente reconstruidas."
    ],
    "concept": "La Difference Engine estaba orientada a tabular funciones mediante diferencias finitas; la Analytical Engine fue concebida con almacenamiento, una unidad de operación y control programable mediante tarjetas.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Distinguir una máquina especializada de tablas matemáticas de la concepción de una máquina programable de propósito general.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "La Difference Engine estaba orientada a tabular funciones mediante diferencias finitas; la Analytical Engine fue concebida con almacenamiento, una unidad de operación y control programable mediante tarjetas."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "La importancia de la Analytical Engine está en su arquitectura conceptual: separar datos, operaciones, memoria y secuenciación acerca la máquina al computador programable."
        },
        {
          "title": "Matiz histórico",
          "body": "El proyecto no llegó a construirse completo en vida de Babbage; por tanto hay que separar diseño conceptual, prototipos parciales y máquinas posteriormente reconstruidas."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿La Analytical Engine llegó a construirse completa y operar como sistema terminado durante la vida de Babbage?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿La Analytical Engine llegó a construirse completa y operar como sistema terminado durante la vida de Babbage?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "El proyecto no llegó a construirse completo en vida de Babbage; por tanto hay que separar diseño conceptual, prototipos parciales y máquinas posteriormente reconstruidas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La Analytical Engine llegó a construirse completa y operar como sistema terminado durante la vida de Babbage?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Babbage indicando problema, mecanismo y consecuencia.",
        "answer": "analytical engine",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Babbage con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-ada-lovelace": {
    "id": "hist-ada-lovelace",
    "courseId": 76,
    "title": "Ada Lovelace: programa, notación y límites de la máquina",
    "shortTitle": "Ada Lovelace",
    "duration": 130,
    "objective": "Analizar las notas de Lovelace sobre la Analytical Engine sin reducirlas a una etiqueta biográfica simplista.",
    "summary": [
      "Las notas de Ada Lovelace sobre la máquina de Babbage incluyeron un procedimiento detallado para calcular números de Bernoulli y una reflexión notable sobre qué puede hacer una máquina simbólica.",
      "Su aportación ayuda a distinguir máquina y programa: una misma arquitectura podría ejecutar procedimientos diferentes si las operaciones y datos se codifican adecuadamente.",
      "La etiqueta “primera programadora” resume una historia compleja de colaboración y precedentes; es más útil estudiar el algoritmo, la notación y su interpretación de la máquina."
    ],
    "concept": "Las notas de Ada Lovelace sobre la máquina de Babbage incluyeron un procedimiento detallado para calcular números de Bernoulli y una reflexión notable sobre qué puede hacer una máquina simbólica.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Analizar las notas de Lovelace sobre la Analytical Engine sin reducirlas a una etiqueta biográfica simplista.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Las notas de Ada Lovelace sobre la máquina de Babbage incluyeron un procedimiento detallado para calcular números de Bernoulli y una reflexión notable sobre qué puede hacer una máquina simbólica."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "Su aportación ayuda a distinguir máquina y programa: una misma arquitectura podría ejecutar procedimientos diferentes si las operaciones y datos se codifican adecuadamente."
        },
        {
          "title": "Matiz histórico",
          "body": "La etiqueta “primera programadora” resume una historia compleja de colaboración y precedentes; es más útil estudiar el algoritmo, la notación y su interpretación de la máquina."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿La relevancia de Lovelace se reduce únicamente a una etiqueta de “primera programadora”?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿La relevancia de Lovelace se reduce únicamente a una etiqueta de “primera programadora”?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "La etiqueta “primera programadora” resume una historia compleja de colaboración y precedentes; es más útil estudiar el algoritmo, la notación y su interpretación de la máquina."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La relevancia de Lovelace se reduce únicamente a una etiqueta de “primera programadora”?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Ada Lovelace indicando problema, mecanismo y consecuencia.",
        "answer": "algoritmo",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Ada Lovelace con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-boole": {
    "id": "hist-boole",
    "courseId": 76,
    "title": "Boole y el álgebra de la lógica",
    "shortTitle": "Boole",
    "duration": 120,
    "objective": "Entender cómo una formalización algebraica de proposiciones creó un lenguaje que después pudo mapearse a circuitos de conmutación.",
    "summary": [
      "George Boole formuló un álgebra para razonar con valores lógicos y operaciones; décadas después esa estructura resultó crucial para describir circuitos de conmutación.",
      "El puente hacia hardware digital no es automático: fue necesario demostrar que redes de interruptores/relés podían modelarse mediante álgebra booleana.",
      "La lógica booleana no obliga a usar transistores ni binario eléctrico concreto; es una abstracción que puede implementarse con tecnologías físicas distintas."
    ],
    "concept": "George Boole formuló un álgebra para razonar con valores lógicos y operaciones; décadas después esa estructura resultó crucial para describir circuitos de conmutación.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Entender cómo una formalización algebraica de proposiciones creó un lenguaje que después pudo mapearse a circuitos de conmutación.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "George Boole formuló un álgebra para razonar con valores lógicos y operaciones; décadas después esa estructura resultó crucial para describir circuitos de conmutación."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "El puente hacia hardware digital no es automático: fue necesario demostrar que redes de interruptores/relés podían modelarse mediante álgebra booleana."
        },
        {
          "title": "Matiz histórico",
          "body": "La lógica booleana no obliga a usar transistores ni binario eléctrico concreto; es una abstracción que puede implementarse con tecnologías físicas distintas."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿El álgebra de Boole depende específicamente de transistores de silicio?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿El álgebra de Boole depende específicamente de transistores de silicio?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "La lógica booleana no obliga a usar transistores ni binario eléctrico concreto; es una abstracción que puede implementarse con tecnologías físicas distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El álgebra de Boole depende específicamente de transistores de silicio?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Boole indicando problema, mecanismo y consecuencia.",
        "answer": "abstraccion",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Boole con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-turing": {
    "id": "hist-turing",
    "courseId": 76,
    "title": "Turing: computabilidad y máquina universal",
    "shortTitle": "Turing",
    "duration": 145,
    "objective": "Separar el modelo matemático de Turing de las máquinas electrónicas concretas y comprender la universalidad.",
    "summary": [
      "La máquina de Turing es un modelo abstracto de computación; la máquina universal muestra que una sola máquina puede simular descripciones de muchas otras máquinas.",
      "El concepto hace explícita la separación entre mecanismo general y descripción/programa, una de las ideas fundamentales de la computación de propósito general.",
      "Una máquina de Turing no es un diseño práctico de CPU ni una especificación de arquitectura Von Neumann; responde a preguntas de computabilidad y procedimiento efectivo."
    ],
    "concept": "La máquina de Turing es un modelo abstracto de computación; la máquina universal muestra que una sola máquina puede simular descripciones de muchas otras máquinas.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Separar el modelo matemático de Turing de las máquinas electrónicas concretas y comprender la universalidad.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "La máquina de Turing es un modelo abstracto de computación; la máquina universal muestra que una sola máquina puede simular descripciones de muchas otras máquinas."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "El concepto hace explícita la separación entre mecanismo general y descripción/programa, una de las ideas fundamentales de la computación de propósito general."
        },
        {
          "title": "Matiz histórico",
          "body": "Una máquina de Turing no es un diseño práctico de CPU ni una especificación de arquitectura Von Neumann; responde a preguntas de computabilidad y procedimiento efectivo."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Una máquina de Turing es una receta directa para construir una CPU moderna?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una máquina de Turing es una receta directa para construir una CPU moderna?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "Una máquina de Turing no es un diseño práctico de CPU ni una especificación de arquitectura Von Neumann; responde a preguntas de computabilidad y procedimiento efectivo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una máquina de Turing es una receta directa para construir una CPU moderna?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Turing indicando problema, mecanismo y consecuencia.",
        "answer": "computabilidad",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Turing con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-shannon": {
    "id": "hist-shannon",
    "courseId": 76,
    "title": "Shannon: bits, información y circuitos de relés",
    "shortTitle": "Shannon",
    "duration": 145,
    "objective": "Conectar teoría de la información y lógica de conmutación sin confundir ambos trabajos.",
    "summary": [
      "Shannon mostró tempranamente cómo el álgebra booleana podía analizar circuitos de relés y, más tarde, formalizó una teoría cuantitativa de la información basada en incertidumbre.",
      "Estas dos líneas son distintas pero convergen en computación: una ayuda a diseñar lógica discreta; la otra permite razonar sobre codificación, capacidad, ruido y comunicación.",
      "El bit como unidad de información no significa que toda información física sea literalmente un transistor; es una medida abstracta realizable en múltiples soportes."
    ],
    "concept": "Shannon mostró tempranamente cómo el álgebra booleana podía analizar circuitos de relés y, más tarde, formalizó una teoría cuantitativa de la información basada en incertidumbre.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Conectar teoría de la información y lógica de conmutación sin confundir ambos trabajos.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Shannon mostró tempranamente cómo el álgebra booleana podía analizar circuitos de relés y, más tarde, formalizó una teoría cuantitativa de la información basada en incertidumbre."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "Estas dos líneas son distintas pero convergen en computación: una ayuda a diseñar lógica discreta; la otra permite razonar sobre codificación, capacidad, ruido y comunicación."
        },
        {
          "title": "Matiz histórico",
          "body": "El bit como unidad de información no significa que toda información física sea literalmente un transistor; es una medida abstracta realizable en múltiples soportes."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿La teoría de la información de Shannon y su trabajo sobre circuitos de relés son exactamente la misma contribución?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿La teoría de la información de Shannon y su trabajo sobre circuitos de relés son exactamente la misma contribución?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "El bit como unidad de información no significa que toda información física sea literalmente un transistor; es una medida abstracta realizable en múltiples soportes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La teoría de la información de Shannon y su trabajo sobre circuitos de relés son exactamente la misma contribución?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Shannon indicando problema, mecanismo y consecuencia.",
        "answer": "shannon",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Shannon con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-von-neumann": {
    "id": "hist-von-neumann",
    "courseId": 76,
    "title": "Von Neumann y el programa almacenado",
    "shortTitle": "Von Neumann",
    "duration": 140,
    "objective": "Entender la arquitectura de programa almacenado y evitar atribuirla a una sola persona o confundirla con cualquier computador.",
    "summary": [
      "Los diseños de programa almacenado consolidaron la idea de representar instrucciones y datos en memoria accesible a la máquina, simplificando la reprogramación.",
      "El llamado modelo de Von Neumann organiza CPU, memoria y E/S con un espacio de memoria para instrucciones y datos; muchas arquitecturas reales introducen caches y caminos separados internamente.",
      "La historia fue colectiva: el informe asociado a EDVAC difundió ideas desarrolladas por varios investigadores; usar “Von Neumann” como nombre arquitectónico no debe borrar esa colaboración."
    ],
    "concept": "Los diseños de programa almacenado consolidaron la idea de representar instrucciones y datos en memoria accesible a la máquina, simplificando la reprogramación.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Entender la arquitectura de programa almacenado y evitar atribuirla a una sola persona o confundirla con cualquier computador.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Los diseños de programa almacenado consolidaron la idea de representar instrucciones y datos en memoria accesible a la máquina, simplificando la reprogramación."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "El llamado modelo de Von Neumann organiza CPU, memoria y E/S con un espacio de memoria para instrucciones y datos; muchas arquitecturas reales introducen caches y caminos separados internamente."
        },
        {
          "title": "Matiz histórico",
          "body": "La historia fue colectiva: el informe asociado a EDVAC difundió ideas desarrolladas por varios investigadores; usar “Von Neumann” como nombre arquitectónico no debe borrar esa colaboración."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Nombrar una arquitectura “Von Neumann” demuestra que una sola persona inventó por sí sola el programa almacenado?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Nombrar una arquitectura “Von Neumann” demuestra que una sola persona inventó por sí sola el programa almacenado?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "La historia fue colectiva: el informe asociado a EDVAC difundió ideas desarrolladas por varios investigadores; usar “Von Neumann” como nombre arquitectónico no debe borrar esa colaboración."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Nombrar una arquitectura “Von Neumann” demuestra que una sola persona inventó por sí sola el programa almacenado?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Von Neumann indicando problema, mecanismo y consecuencia.",
        "answer": "programa almacenado",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Von Neumann con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-relays": {
    "id": "hist-relays",
    "courseId": 76,
    "title": "Relés: lógica electromecánica",
    "shortTitle": "Relés",
    "duration": 115,
    "objective": "Explicar cómo un interruptor electromagnético puede implementar lógica y memoria, y por qué fue una etapa tecnológica importante.",
    "summary": [
      "Un relé permite que una señal eléctrica controle contactos, haciendo posible construir puertas lógicas, secuenciadores y máquinas automáticas con elementos discretos.",
      "Frente a mecanismos puramente mecánicos, los relés facilitan control eléctrico; frente a electrónica posterior son lentos, voluminosos y sufren desgaste mecánico.",
      "La evolución tecnológica no fue una sustitución instantánea: relés, válvulas y otras técnicas coexistieron según disponibilidad, coste y aplicación."
    ],
    "concept": "Un relé permite que una señal eléctrica controle contactos, haciendo posible construir puertas lógicas, secuenciadores y máquinas automáticas con elementos discretos.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Explicar cómo un interruptor electromagnético puede implementar lógica y memoria, y por qué fue una etapa tecnológica importante.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Un relé permite que una señal eléctrica controle contactos, haciendo posible construir puertas lógicas, secuenciadores y máquinas automáticas con elementos discretos."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "Frente a mecanismos puramente mecánicos, los relés facilitan control eléctrico; frente a electrónica posterior son lentos, voluminosos y sufren desgaste mecánico."
        },
        {
          "title": "Matiz histórico",
          "body": "La evolución tecnológica no fue una sustitución instantánea: relés, válvulas y otras técnicas coexistieron según disponibilidad, coste y aplicación."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Un relé es un dispositivo semiconductor?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un relé es un dispositivo semiconductor?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "La evolución tecnológica no fue una sustitución instantánea: relés, válvulas y otras técnicas coexistieron según disponibilidad, coste y aplicación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un relé es un dispositivo semiconductor?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Relés indicando problema, mecanismo y consecuencia.",
        "answer": "electromecanico",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Relés con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-vacuum-tubes": {
    "id": "hist-vacuum-tubes",
    "courseId": 76,
    "title": "Tubos de vacío y computación electrónica",
    "shortTitle": "Tubos de vacío",
    "duration": 125,
    "objective": "Comprender por qué las válvulas permitieron elevar drásticamente la velocidad de conmutación y qué costes introdujeron.",
    "summary": [
      "Los tubos de vacío permiten amplificación y conmutación electrónica sin partes mecánicas móviles, posibilitando computadores mucho más rápidos que las máquinas basadas en relés.",
      "Su uso trajo costes severos de tamaño, potencia, calor y mantenimiento, por lo que la fiabilidad del sistema dependía también de ingeniería de alimentación, refrigeración y reemplazo.",
      "“Primera computadora electrónica” depende de criterios como propósito general, programabilidad y forma de programa; conviene evitar rankings históricos sin definir el criterio."
    ],
    "concept": "Los tubos de vacío permiten amplificación y conmutación electrónica sin partes mecánicas móviles, posibilitando computadores mucho más rápidos que las máquinas basadas en relés.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Comprender por qué las válvulas permitieron elevar drásticamente la velocidad de conmutación y qué costes introdujeron.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Los tubos de vacío permiten amplificación y conmutación electrónica sin partes mecánicas móviles, posibilitando computadores mucho más rápidos que las máquinas basadas en relés."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "Su uso trajo costes severos de tamaño, potencia, calor y mantenimiento, por lo que la fiabilidad del sistema dependía también de ingeniería de alimentación, refrigeración y reemplazo."
        },
        {
          "title": "Matiz histórico",
          "body": "“Primera computadora electrónica” depende de criterios como propósito general, programabilidad y forma de programa; conviene evitar rankings históricos sin definir el criterio."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿La expresión “primera computadora” tiene una respuesta única independientemente del criterio utilizado?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿La expresión “primera computadora” tiene una respuesta única independientemente del criterio utilizado?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "“Primera computadora electrónica” depende de criterios como propósito general, programabilidad y forma de programa; conviene evitar rankings históricos sin definir el criterio."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La expresión “primera computadora” tiene una respuesta única independientemente del criterio utilizado?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Tubos de vacío indicando problema, mecanismo y consecuencia.",
        "answer": "criterio",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Tubos de vacío con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-transistor": {
    "id": "hist-transistor",
    "courseId": 76,
    "title": "El transistor y la miniaturización electrónica",
    "shortTitle": "Transistor",
    "duration": 135,
    "objective": "Explicar por qué el transistor cambió la escala, consumo y fiabilidad de la electrónica digital.",
    "summary": [
      "El transistor semiconductor puede funcionar como amplificador o interruptor; sustituyó progresivamente a muchas válvulas al permitir circuitos más pequeños, eficientes y fiables.",
      "La demostración del transistor en Bell Labs en 1947 abrió una transición tecnológica; después llegaron nuevas estructuras, procesos de fabricación y el dominio de dispositivos MOS en integración a gran escala.",
      "El transistor no “calcula” por sí solo: la computación emerge de circuitos organizados que implementan lógica, estado, memoria y control."
    ],
    "concept": "El transistor semiconductor puede funcionar como amplificador o interruptor; sustituyó progresivamente a muchas válvulas al permitir circuitos más pequeños, eficientes y fiables.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Explicar por qué el transistor cambió la escala, consumo y fiabilidad de la electrónica digital.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "El transistor semiconductor puede funcionar como amplificador o interruptor; sustituyó progresivamente a muchas válvulas al permitir circuitos más pequeños, eficientes y fiables."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "La demostración del transistor en Bell Labs en 1947 abrió una transición tecnológica; después llegaron nuevas estructuras, procesos de fabricación y el dominio de dispositivos MOS en integración a gran escala."
        },
        {
          "title": "Matiz histórico",
          "body": "El transistor no “calcula” por sí solo: la computación emerge de circuitos organizados que implementan lógica, estado, memoria y control."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Un transistor aislado constituye por sí mismo una CPU?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un transistor aislado constituye por sí mismo una CPU?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "El transistor no “calcula” por sí solo: la computación emerge de circuitos organizados que implementan lógica, estado, memoria y control."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un transistor aislado constituye por sí mismo una CPU?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Transistor indicando problema, mecanismo y consecuencia.",
        "answer": "transistor",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Transistor con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-integrated-circuit": {
    "id": "hist-integrated-circuit",
    "courseId": 76,
    "title": "Circuito integrado: muchos componentes en un chip",
    "shortTitle": "Circuito integrado",
    "duration": 135,
    "objective": "Entender cómo la integración monolítica cambió coste, densidad, fiabilidad y posibilidades arquitectónicas.",
    "summary": [
      "El circuito integrado permitió fabricar múltiples componentes y conexiones como una unidad, reduciendo cableado discreto y haciendo posible aumentar enormemente la densidad.",
      "La integración cambió el problema de ingeniería: además del esquema lógico importan fabricación, yield, interconexiones, encapsulado, potencia y diseño físico.",
      "El circuito integrado no apareció como una única invención aislada ni hizo obsoletos todos los componentes discretos; su adopción fue progresiva y dependiente de la aplicación."
    ],
    "concept": "El circuito integrado permitió fabricar múltiples componentes y conexiones como una unidad, reduciendo cableado discreto y haciendo posible aumentar enormemente la densidad.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Entender cómo la integración monolítica cambió coste, densidad, fiabilidad y posibilidades arquitectónicas.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "El circuito integrado permitió fabricar múltiples componentes y conexiones como una unidad, reduciendo cableado discreto y haciendo posible aumentar enormemente la densidad."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "La integración cambió el problema de ingeniería: además del esquema lógico importan fabricación, yield, interconexiones, encapsulado, potencia y diseño físico."
        },
        {
          "title": "Matiz histórico",
          "body": "El circuito integrado no apareció como una única invención aislada ni hizo obsoletos todos los componentes discretos; su adopción fue progresiva y dependiente de la aplicación."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Un circuito integrado implica necesariamente que todo un computador esté en un único chip?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un circuito integrado implica necesariamente que todo un computador esté en un único chip?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "El circuito integrado no apareció como una única invención aislada ni hizo obsoletos todos los componentes discretos; su adopción fue progresiva y dependiente de la aplicación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un circuito integrado implica necesariamente que todo un computador esté en un único chip?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Circuito integrado indicando problema, mecanismo y consecuencia.",
        "answer": "integracion",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Circuito integrado con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-microprocessor": {
    "id": "hist-microprocessor",
    "courseId": 76,
    "title": "Microprocesador: CPU integrada",
    "shortTitle": "Microprocesador",
    "duration": 140,
    "objective": "Distinguir microprocesador, microcontrolador y computador completo, y comprender su impacto económico y arquitectónico.",
    "summary": [
      "Un microprocesador integra en uno o pocos circuitos integrados la unidad central de procesamiento, haciendo viable producir CPUs compactas y estandarizadas a gran escala.",
      "Su impacto dependió de memoria, buses, periféricos, herramientas y software; una CPU en un chip no constituye por sí sola un sistema completo.",
      "La noción de “primer microprocesador” puede variar según criterios de integración, propósito, comercialización y número de chips; conviene explicitar el criterio histórico."
    ],
    "concept": "Un microprocesador integra en uno o pocos circuitos integrados la unidad central de procesamiento, haciendo viable producir CPUs compactas y estandarizadas a gran escala.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Distinguir microprocesador, microcontrolador y computador completo, y comprender su impacto económico y arquitectónico.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Un microprocesador integra en uno o pocos circuitos integrados la unidad central de procesamiento, haciendo viable producir CPUs compactas y estandarizadas a gran escala."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "Su impacto dependió de memoria, buses, periféricos, herramientas y software; una CPU en un chip no constituye por sí sola un sistema completo."
        },
        {
          "title": "Matiz histórico",
          "body": "La noción de “primer microprocesador” puede variar según criterios de integración, propósito, comercialización y número de chips; conviene explicitar el criterio histórico."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Microprocesador y computador completo son sinónimos?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Microprocesador y computador completo son sinónimos?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "La noción de “primer microprocesador” puede variar según criterios de integración, propósito, comercialización y número de chips; conviene explicitar el criterio histórico."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Microprocesador y computador completo son sinónimos?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Microprocesador indicando problema, mecanismo y consecuencia.",
        "answer": "cpu",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Microprocesador con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-mainframes": {
    "id": "hist-mainframes",
    "courseId": 76,
    "title": "Mainframes: computación centralizada y compartida",
    "shortTitle": "Mainframes",
    "duration": 125,
    "objective": "Comprender por qué los grandes sistemas centralizados dominaron cargas empresariales y científicas y cómo evolucionó el uso compartido.",
    "summary": [
      "Los mainframes priorizaron capacidad, fiabilidad, E/S y servicio a múltiples usuarios o workloads, con una economía basada en recursos caros y centralizados.",
      "Batch processing, multiprogramación y time-sharing fueron respuestas distintas al objetivo de utilizar mejor máquinas costosas y dar acceso interactivo a más personas.",
      "Mainframe no significa simplemente “ordenador viejo y grande”: es una categoría de sistemas orientada históricamente a alta capacidad, continuidad y grandes volúmenes de E/S/transacciones."
    ],
    "concept": "Los mainframes priorizaron capacidad, fiabilidad, E/S y servicio a múltiples usuarios o workloads, con una economía basada en recursos caros y centralizados.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Comprender por qué los grandes sistemas centralizados dominaron cargas empresariales y científicas y cómo evolucionó el uso compartido.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Los mainframes priorizaron capacidad, fiabilidad, E/S y servicio a múltiples usuarios o workloads, con una economía basada en recursos caros y centralizados."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "Batch processing, multiprogramación y time-sharing fueron respuestas distintas al objetivo de utilizar mejor máquinas costosas y dar acceso interactivo a más personas."
        },
        {
          "title": "Matiz histórico",
          "body": "Mainframe no significa simplemente “ordenador viejo y grande”: es una categoría de sistemas orientada históricamente a alta capacidad, continuidad y grandes volúmenes de E/S/transacciones."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Un mainframe se define únicamente por su tamaño físico?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un mainframe se define únicamente por su tamaño físico?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "Mainframe no significa simplemente “ordenador viejo y grande”: es una categoría de sistemas orientada históricamente a alta capacidad, continuidad y grandes volúmenes de E/S/transacciones."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un mainframe se define únicamente por su tamaño físico?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Mainframes indicando problema, mecanismo y consecuencia.",
        "answer": "sistema",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Mainframes con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-minicomputers": {
    "id": "hist-minicomputers",
    "courseId": 76,
    "title": "Minicomputers: reducir el coste de acceso",
    "shortTitle": "Minicomputers",
    "duration": 120,
    "objective": "Situar los minicomputers entre grandes sistemas institucionales y la posterior microcomputación personal.",
    "summary": [
      "Los minicomputers redujeron coste y tamaño respecto a muchos mainframes y llevaron computación interactiva a departamentos, laboratorios y organizaciones que no podían justificar sistemas mayores.",
      "Su éxito impulsó ecosistemas de terminales, sistemas operativos multiusuario, instrumentación y software técnico, y ayudó a ampliar quién podía poseer y administrar una máquina.",
      "“Mini” es una categoría histórica relativa a su época; muchas de esas máquinas seguían ocupando armarios y atendiendo a múltiples usuarios."
    ],
    "concept": "Los minicomputers redujeron coste y tamaño respecto a muchos mainframes y llevaron computación interactiva a departamentos, laboratorios y organizaciones que no podían justificar sistemas mayores.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Situar los minicomputers entre grandes sistemas institucionales y la posterior microcomputación personal.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Los minicomputers redujeron coste y tamaño respecto a muchos mainframes y llevaron computación interactiva a departamentos, laboratorios y organizaciones que no podían justificar sistemas mayores."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "Su éxito impulsó ecosistemas de terminales, sistemas operativos multiusuario, instrumentación y software técnico, y ayudó a ampliar quién podía poseer y administrar una máquina."
        },
        {
          "title": "Matiz histórico",
          "body": "“Mini” es una categoría histórica relativa a su época; muchas de esas máquinas seguían ocupando armarios y atendiendo a múltiples usuarios."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿“Minicomputer” significaba necesariamente un equipo de sobremesa personal?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿“Minicomputer” significaba necesariamente un equipo de sobremesa personal?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "“Mini” es una categoría histórica relativa a su época; muchas de esas máquinas seguían ocupando armarios y atendiendo a múltiples usuarios."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿“Minicomputer” significaba necesariamente un equipo de sobremesa personal?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Minicomputers indicando problema, mecanismo y consecuencia.",
        "answer": "categoria",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Minicomputers con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-microcomputers": {
    "id": "hist-microcomputers",
    "courseId": 76,
    "title": "Microcomputers y computación personal",
    "shortTitle": "Microcomputers",
    "duration": 130,
    "objective": "Explicar cómo microprocesadores, memoria semiconductora y ecosistemas de software permitieron computación de bajo coste y propiedad individual.",
    "summary": [
      "Los microcomputers basados en microprocesadores redujeron radicalmente el coste de una CPU y favorecieron sistemas que podían ser adquiridos por pequeñas empresas, aficionados y hogares.",
      "El salto social vino del ecosistema completo: almacenamiento, pantallas, teclados, lenguajes, sistemas operativos y aplicaciones hicieron que el hardware programable se convirtiera en herramienta general.",
      "Microcomputer y PC se solapan históricamente pero no son categorías idénticas; hubo muchos microordenadores domésticos y profesionales fuera del estándar IBM PC."
    ],
    "concept": "Los microcomputers basados en microprocesadores redujeron radicalmente el coste de una CPU y favorecieron sistemas que podían ser adquiridos por pequeñas empresas, aficionados y hogares.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Explicar cómo microprocesadores, memoria semiconductora y ecosistemas de software permitieron computación de bajo coste y propiedad individual.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Los microcomputers basados en microprocesadores redujeron radicalmente el coste de una CPU y favorecieron sistemas que podían ser adquiridos por pequeñas empresas, aficionados y hogares."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "El salto social vino del ecosistema completo: almacenamiento, pantallas, teclados, lenguajes, sistemas operativos y aplicaciones hicieron que el hardware programable se convirtiera en herramienta general."
        },
        {
          "title": "Matiz histórico",
          "body": "Microcomputer y PC se solapan históricamente pero no son categorías idénticas; hubo muchos microordenadores domésticos y profesionales fuera del estándar IBM PC."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Todo microcomputer histórico era compatible con IBM PC?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Todo microcomputer histórico era compatible con IBM PC?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "Microcomputer y PC se solapan históricamente pero no son categorías idénticas; hubo muchos microordenadores domésticos y profesionales fuera del estándar IBM PC."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Todo microcomputer histórico era compatible con IBM PC?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Microcomputers indicando problema, mecanismo y consecuencia.",
        "answer": "ecosistema",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Microcomputers con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-unix": {
    "id": "hist-unix",
    "courseId": 76,
    "title": "Unix: portabilidad, procesos y herramientas componibles",
    "shortTitle": "Unix",
    "duration": 140,
    "objective": "Entender qué decisiones de Unix influyeron en sistemas operativos posteriores y por qué C fue importante para su portabilidad.",
    "summary": [
      "Unix consolidó un modelo de procesos, archivos, pipes y pequeñas herramientas combinables, y su reescritura temprana en C facilitó portar gran parte del sistema entre máquinas.",
      "La interfaz y filosofía Unix influyeron en BSD, sistemas comerciales y posteriormente Linux y otros sistemas tipo Unix; estándares como POSIX ayudaron a estabilizar interfaces.",
      "Unix no es Linux: Linux es un kernel posterior de tipo Unix combinado normalmente con userland y otras piezas; además existen linajes Unix distintos."
    ],
    "concept": "Unix consolidó un modelo de procesos, archivos, pipes y pequeñas herramientas combinables, y su reescritura temprana en C facilitó portar gran parte del sistema entre máquinas.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Entender qué decisiones de Unix influyeron en sistemas operativos posteriores y por qué C fue importante para su portabilidad.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Unix consolidó un modelo de procesos, archivos, pipes y pequeñas herramientas combinables, y su reescritura temprana en C facilitó portar gran parte del sistema entre máquinas."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "La interfaz y filosofía Unix influyeron en BSD, sistemas comerciales y posteriormente Linux y otros sistemas tipo Unix; estándares como POSIX ayudaron a estabilizar interfaces."
        },
        {
          "title": "Matiz histórico",
          "body": "Unix no es Linux: Linux es un kernel posterior de tipo Unix combinado normalmente con userland y otras piezas; además existen linajes Unix distintos."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Unix y Linux son exactamente el mismo sistema operativo?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Unix y Linux son exactamente el mismo sistema operativo?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "Unix no es Linux: Linux es un kernel posterior de tipo Unix combinado normalmente con userland y otras piezas; además existen linajes Unix distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Unix y Linux son exactamente el mismo sistema operativo?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Unix indicando problema, mecanismo y consecuencia.",
        "answer": "unix",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Unix con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-internet": {
    "id": "hist-internet",
    "courseId": 76,
    "title": "De ARPANET a Internet",
    "shortTitle": "Internet",
    "duration": 145,
    "objective": "Explicar la transición de una red experimental a una internetwork abierta basada en protocolos interoperables.",
    "summary": [
      "Internet surgió de la interconexión de redes y de un diseño de arquitectura abierta; ARPANET fue un antecedente crucial, pero Internet no es simplemente ARPANET renombrada.",
      "TCP/IP permitió interconectar redes heterogéneas; la migración de ARPANET a TCP/IP el 1 de enero de 1983 fue un hito importante, seguido por expansión académica, comercial y global.",
      "Internet y Web no son sinónimos: la Web apareció después como un sistema de información construido sobre protocolos de Internet."
    ],
    "concept": "Internet surgió de la interconexión de redes y de un diseño de arquitectura abierta; ARPANET fue un antecedente crucial, pero Internet no es simplemente ARPANET renombrada.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Explicar la transición de una red experimental a una internetwork abierta basada en protocolos interoperables.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Internet surgió de la interconexión de redes y de un diseño de arquitectura abierta; ARPANET fue un antecedente crucial, pero Internet no es simplemente ARPANET renombrada."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "TCP/IP permitió interconectar redes heterogéneas; la migración de ARPANET a TCP/IP el 1 de enero de 1983 fue un hito importante, seguido por expansión académica, comercial y global."
        },
        {
          "title": "Matiz histórico",
          "body": "Internet y Web no son sinónimos: la Web apareció después como un sistema de información construido sobre protocolos de Internet."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Internet y World Wide Web son exactamente la misma cosa?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Internet y World Wide Web son exactamente la misma cosa?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "Internet y Web no son sinónimos: la Web apareció después como un sistema de información construido sobre protocolos de Internet."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Internet y World Wide Web son exactamente la misma cosa?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Internet indicando problema, mecanismo y consecuencia.",
        "answer": "tcp/ip",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Internet con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-pc": {
    "id": "hist-pc",
    "courseId": 76,
    "title": "PC y estandarización de una plataforma",
    "shortTitle": "PC",
    "duration": 130,
    "objective": "Analizar cómo la estandarización de interfaces y un ecosistema compatible cambió el mercado del ordenador personal.",
    "summary": [
      "El PC representa la consolidación de computación personal de propósito general y, en el caso del ecosistema IBM PC, una plataforma cuyos componentes y software fueron ampliamente compatibles y clonados.",
      "El valor de una plataforma crece con interfaces, herramientas, periféricos y software disponibles; la arquitectura técnica y la dinámica económica se retroalimentan.",
      "El IBM PC no fue el primer ordenador personal ni el único camino posible; coexistió con Apple, Commodore, Atari y muchos otros ecosistemas."
    ],
    "concept": "El PC representa la consolidación de computación personal de propósito general y, en el caso del ecosistema IBM PC, una plataforma cuyos componentes y software fueron ampliamente compatibles y clonados.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Analizar cómo la estandarización de interfaces y un ecosistema compatible cambió el mercado del ordenador personal.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "El PC representa la consolidación de computación personal de propósito general y, en el caso del ecosistema IBM PC, una plataforma cuyos componentes y software fueron ampliamente compatibles y clonados."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "El valor de una plataforma crece con interfaces, herramientas, periféricos y software disponibles; la arquitectura técnica y la dinámica económica se retroalimentan."
        },
        {
          "title": "Matiz histórico",
          "body": "El IBM PC no fue el primer ordenador personal ni el único camino posible; coexistió con Apple, Commodore, Atari y muchos otros ecosistemas."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿El IBM PC fue el primer ordenador personal de la historia?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿El IBM PC fue el primer ordenador personal de la historia?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "El IBM PC no fue el primer ordenador personal ni el único camino posible; coexistió con Apple, Commodore, Atari y muchos otros ecosistemas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El IBM PC fue el primer ordenador personal de la historia?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de PC indicando problema, mecanismo y consecuencia.",
        "answer": "plataforma",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara PC con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-consoles": {
    "id": "hist-consoles",
    "courseId": 76,
    "title": "Consolas: hardware fijo y plataformas de juego",
    "shortTitle": "Consolas",
    "duration": 125,
    "objective": "Entender cómo hardware relativamente fijo, APIs y distribución de software produjeron una rama propia de la historia de la computación.",
    "summary": [
      "Las consolas convierten una configuración hardware controlada en una plataforma: desarrolladores pueden optimizar para objetivos concretos de CPU, GPU, memoria, E/S y dispositivos de entrada.",
      "Las generaciones incorporaron progresivamente gráficos especializados, almacenamiento, networking y sistemas operativos más complejos, acercándose en algunos componentes a otras computadoras pero manteniendo contratos de plataforma propios.",
      "Una consola no se reduce a “un PC cerrado”: historia, costes, APIs, ciclos de vida y restricciones de compatibilidad generan decisiones de diseño diferentes."
    ],
    "concept": "Las consolas convierten una configuración hardware controlada en una plataforma: desarrolladores pueden optimizar para objetivos concretos de CPU, GPU, memoria, E/S y dispositivos de entrada.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Entender cómo hardware relativamente fijo, APIs y distribución de software produjeron una rama propia de la historia de la computación.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Las consolas convierten una configuración hardware controlada en una plataforma: desarrolladores pueden optimizar para objetivos concretos de CPU, GPU, memoria, E/S y dispositivos de entrada."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "Las generaciones incorporaron progresivamente gráficos especializados, almacenamiento, networking y sistemas operativos más complejos, acercándose en algunos componentes a otras computadoras pero manteniendo contratos de plataforma propios."
        },
        {
          "title": "Matiz histórico",
          "body": "Una consola no se reduce a “un PC cerrado”: historia, costes, APIs, ciclos de vida y restricciones de compatibilidad generan decisiones de diseño diferentes."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Tener CPU y GPU similares convierte automáticamente una consola en un PC convencional?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Tener CPU y GPU similares convierte automáticamente una consola en un PC convencional?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "Una consola no se reduce a “un PC cerrado”: historia, costes, APIs, ciclos de vida y restricciones de compatibilidad generan decisiones de diseño diferentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Tener CPU y GPU similares convierte automáticamente una consola en un PC convencional?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Consolas indicando problema, mecanismo y consecuencia.",
        "answer": "plataforma",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Consolas con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-gpu": {
    "id": "hist-gpu",
    "courseId": 76,
    "title": "De aceleradores gráficos a GPU programable",
    "shortTitle": "GPU",
    "duration": 135,
    "objective": "Seguir la transición desde pipelines gráficos especializados hacia procesadores masivamente paralelos programables.",
    "summary": [
      "El hardware gráfico pasó de funciones muy especializadas a pipelines cada vez más programables; shaders y posteriormente compute ampliaron el uso de la GPU más allá del rasterizado clásico.",
      "La GPU explota paralelismo masivo y throughput; su evolución está ligada a videojuegos, APIs gráficas, memoria de alto ancho de banda y después cargas científicas y de aprendizaje automático.",
      "GPU no significa “CPU con más núcleos”: su arquitectura, ejecución SIMT/SIMD, jerarquía de memoria y objetivos de latencia/throughput son distintos."
    ],
    "concept": "El hardware gráfico pasó de funciones muy especializadas a pipelines cada vez más programables; shaders y posteriormente compute ampliaron el uso de la GPU más allá del rasterizado clásico.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Seguir la transición desde pipelines gráficos especializados hacia procesadores masivamente paralelos programables.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "El hardware gráfico pasó de funciones muy especializadas a pipelines cada vez más programables; shaders y posteriormente compute ampliaron el uso de la GPU más allá del rasterizado clásico."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "La GPU explota paralelismo masivo y throughput; su evolución está ligada a videojuegos, APIs gráficas, memoria de alto ancho de banda y después cargas científicas y de aprendizaje automático."
        },
        {
          "title": "Matiz histórico",
          "body": "GPU no significa “CPU con más núcleos”: su arquitectura, ejecución SIMT/SIMD, jerarquía de memoria y objetivos de latencia/throughput son distintos."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Una GPU es simplemente una CPU con muchos núcleos idénticos?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una GPU es simplemente una CPU con muchos núcleos idénticos?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "GPU no significa “CPU con más núcleos”: su arquitectura, ejecución SIMT/SIMD, jerarquía de memoria y objetivos de latencia/throughput son distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una GPU es simplemente una CPU con muchos núcleos idénticos?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de GPU indicando problema, mecanismo y consecuencia.",
        "answer": "paralelismo",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara GPU con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-smartphone": {
    "id": "hist-smartphone",
    "courseId": 76,
    "title": "Smartphone: computador conectado y ubicuo",
    "shortTitle": "Smartphone",
    "duration": 130,
    "objective": "Explicar cómo integración SoC, radio, sensores, batería y software móvil convergieron en una nueva plataforma informática.",
    "summary": [
      "El smartphone reúne CPU/GPU, memoria, almacenamiento, módems, sensores, cámara, pantalla y gestión energética en una plataforma portátil permanentemente conectada.",
      "Su éxito dependió tanto de semiconductores y baterías como de redes celulares, interfaces táctiles, sistemas operativos móviles, tiendas de aplicaciones y servicios cloud.",
      "No existe un único instante universal en que “se inventa” el smartphone: hubo una evolución de comunicadores, PDAs, teléfonos inteligentes y plataformas modernas."
    ],
    "concept": "El smartphone reúne CPU/GPU, memoria, almacenamiento, módems, sensores, cámara, pantalla y gestión energética en una plataforma portátil permanentemente conectada.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Explicar cómo integración SoC, radio, sensores, batería y software móvil convergieron en una nueva plataforma informática.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "El smartphone reúne CPU/GPU, memoria, almacenamiento, módems, sensores, cámara, pantalla y gestión energética en una plataforma portátil permanentemente conectada."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "Su éxito dependió tanto de semiconductores y baterías como de redes celulares, interfaces táctiles, sistemas operativos móviles, tiendas de aplicaciones y servicios cloud."
        },
        {
          "title": "Matiz histórico",
          "body": "No existe un único instante universal en que “se inventa” el smartphone: hubo una evolución de comunicadores, PDAs, teléfonos inteligentes y plataformas modernas."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿La historia del smartphone puede atribuirse rigurosamente a un único dispositivo sin definir criterios?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿La historia del smartphone puede atribuirse rigurosamente a un único dispositivo sin definir criterios?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "No existe un único instante universal en que “se inventa” el smartphone: hubo una evolución de comunicadores, PDAs, teléfonos inteligentes y plataformas modernas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La historia del smartphone puede atribuirse rigurosamente a un único dispositivo sin definir criterios?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Smartphone indicando problema, mecanismo y consecuencia.",
        "answer": "convergencia",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Smartphone con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-cloud": {
    "id": "hist-cloud",
    "courseId": 76,
    "title": "Cloud: de time-sharing a infraestructura como servicio",
    "shortTitle": "Cloud",
    "duration": 135,
    "objective": "Relacionar ideas históricas de recursos compartidos con la automatización, virtualización y provisión bajo demanda del cloud moderno.",
    "summary": [
      "Cloud computing combina centros de datos, virtualización/aislamiento, redes, APIs de provisión, elasticidad y modelos de servicio para ofrecer recursos compartidos bajo demanda.",
      "Tiene antecedentes conceptuales en time-sharing, utility computing y hosting, pero el cloud moderno añade automatización a gran escala, autoservicio y servicios gestionados accesibles por red.",
      "Cloud no significa que la computación sea inmaterial: desplaza y abstrae hardware físico, energía, redes y operaciones hacia infraestructura remota."
    ],
    "concept": "Cloud computing combina centros de datos, virtualización/aislamiento, redes, APIs de provisión, elasticidad y modelos de servicio para ofrecer recursos compartidos bajo demanda.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Relacionar ideas históricas de recursos compartidos con la automatización, virtualización y provisión bajo demanda del cloud moderno.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Cloud computing combina centros de datos, virtualización/aislamiento, redes, APIs de provisión, elasticidad y modelos de servicio para ofrecer recursos compartidos bajo demanda."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "Tiene antecedentes conceptuales en time-sharing, utility computing y hosting, pero el cloud moderno añade automatización a gran escala, autoservicio y servicios gestionados accesibles por red."
        },
        {
          "title": "Matiz histórico",
          "body": "Cloud no significa que la computación sea inmaterial: desplaza y abstrae hardware físico, energía, redes y operaciones hacia infraestructura remota."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Cloud computing elimina la necesidad de hardware físico?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Cloud computing elimina la necesidad de hardware físico?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "Cloud no significa que la computación sea inmaterial: desplaza y abstrae hardware físico, energía, redes y operaciones hacia infraestructura remota."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Cloud computing elimina la necesidad de hardware físico?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Cloud indicando problema, mecanismo y consecuencia.",
        "answer": "abstraccion",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Cloud con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-modern-ai": {
    "id": "hist-modern-ai",
    "courseId": 76,
    "title": "IA moderna: ciclos, datos, cómputo y aprendizaje profundo",
    "shortTitle": "IA moderna",
    "duration": 150,
    "objective": "Construir una historia no lineal de la IA que conecte métodos simbólicos, redes neuronales, aprendizaje estadístico, GPUs y modelos fundacionales.",
    "summary": [
      "La IA ha avanzado en oleadas: enfoques simbólicos, sistemas expertos, aprendizaje estadístico, redes neuronales profundas y modelos generativos han prosperado bajo combinaciones distintas de algoritmos, datos y cómputo.",
      "El resurgimiento del deep learning se apoyó en mejores métodos de entrenamiento, datasets y hardware paralelo; transformers y escalado posterior impulsaron modelos de lenguaje y multimodales de gran capacidad.",
      "La historia no es una marcha inevitable hacia sistemas cada vez mejores: hubo límites, inviernos de financiación, cambios de paradigma y problemas que siguen abiertos."
    ],
    "concept": "La IA ha avanzado en oleadas: enfoques simbólicos, sistemas expertos, aprendizaje estadístico, redes neuronales profundas y modelos generativos han prosperado bajo combinaciones distintas de algoritmos, datos y cómputo.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Construir una historia no lineal de la IA que conecte métodos simbólicos, redes neuronales, aprendizaje estadístico, GPUs y modelos fundacionales.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "La IA ha avanzado en oleadas: enfoques simbólicos, sistemas expertos, aprendizaje estadístico, redes neuronales profundas y modelos generativos han prosperado bajo combinaciones distintas de algoritmos, datos y cómputo."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "El resurgimiento del deep learning se apoyó en mejores métodos de entrenamiento, datasets y hardware paralelo; transformers y escalado posterior impulsaron modelos de lenguaje y multimodales de gran capacidad."
        },
        {
          "title": "Matiz histórico",
          "body": "La historia no es una marcha inevitable hacia sistemas cada vez mejores: hubo límites, inviernos de financiación, cambios de paradigma y problemas que siguen abiertos."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿La historia de la IA es una progresión lineal sin periodos de retroceso ni cambios de paradigma?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿La historia de la IA es una progresión lineal sin periodos de retroceso ni cambios de paradigma?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "La historia no es una marcha inevitable hacia sistemas cada vez mejores: hubo límites, inviernos de financiación, cambios de paradigma y problemas que siguen abiertos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La historia de la IA es una progresión lineal sin periodos de retroceso ni cambios de paradigma?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de IA moderna indicando problema, mecanismo y consecuencia.",
        "answer": "oleadas",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara IA moderna con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  },
  "hist-capstone": {
    "id": "hist-capstone",
    "courseId": 76,
    "title": "Proyecto: reconstruir una línea causal de la computación",
    "shortTitle": "Proyecto histórico",
    "duration": 170,
    "objective": "Construir una explicación histórica causal que conecte ideas, tecnologías, costes y necesidades desde la mecánica hasta la IA moderna.",
    "summary": [
      "Una buena historia técnica no es una lista de fechas: explica qué restricción existía, qué innovación la cambió y qué nuevas posibilidades o cuellos de botella aparecieron.",
      "El proyecto debe escoger una cadena de al menos ocho hitos y justificar cada enlace con mecanismo técnico y contexto, distinguiendo influencia documentada de semejanza retrospectiva.",
      "Evita teleología y mitos de “inventor único”: muchas transiciones son acumulativas, paralelas y dependientes de infraestructura económica, científica y manufacturera."
    ],
    "concept": "Una buena historia técnica no es una lista de fechas: explica qué restricción existía, qué innovación la cambió y qué nuevas posibilidades o cuellos de botella aparecieron.",
    "rules": [
      "Distingue fecha, mecanismo técnico e interpretación histórica; una coincidencia temporal no demuestra causalidad.",
      "Evita el mito del inventor único cuando la evidencia muestra desarrollos acumulativos, paralelos o colaborativos.",
      "Conecta cada hito con la restricción que resolvió y con las nuevas posibilidades o trade-offs que introdujo."
    ],
    "deep": {
      "intro": "Construir una explicación histórica causal que conecte ideas, tecnologías, costes y necesidades desde la mecánica hasta la IA moderna.",
      "sections": [
        {
          "title": "Contexto y problema",
          "body": "Una buena historia técnica no es una lista de fechas: explica qué restricción existía, qué innovación la cambió y qué nuevas posibilidades o cuellos de botella aparecieron."
        },
        {
          "title": "Mecanismo y cambio",
          "body": "El proyecto debe escoger una cadena de al menos ocho hitos y justificar cada enlace con mecanismo técnico y contexto, distinguiendo influencia documentada de semejanza retrospectiva."
        },
        {
          "title": "Matiz histórico",
          "body": "Evita teleología y mitos de “inventor único”: muchas transiciones son acumulativas, paralelas y dependientes de infraestructura económica, científica y manufacturera."
        },
        {
          "title": "Laboratorio histórico",
          "body": "Construye una mini-línea temporal con una fuente primaria o institucional, un artefacto técnico y una afirmación falsable. Separa hechos documentados de interpretación y explica qué evidencia cambiaría tu conclusión."
        }
      ]
    },
    "example": {
      "problem": "¿Una cronología ordenada de fechas basta para demostrar causalidad histórica?",
      "steps": [
        "Define el criterio histórico antes de comparar hitos o atribuir prioridad.",
        "Explica la relación técnica entre el problema anterior, la innovación y lo que hizo posible después."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una cronología ordenada de fechas basta para demostrar causalidad histórica?",
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
          "Solo si se define un criterio y la evidencia lo respalda",
          false
        ]
      ],
      "feedback": "Evita teleología y mitos de “inventor único”: muchas transiciones son acumulativas, paralelas y dependientes de infraestructura económica, científica y manufacturera."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una cronología ordenada de fechas basta para demostrar causalidad histórica?",
        "answer": "no",
        "hint": "Evita respuestas de “primer X” sin definir el criterio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica la importancia histórica de Proyecto histórico indicando problema, mecanismo y consecuencia.",
        "answer": "causalidad",
        "hint": "No enumeres solo fechas: conecta causa técnica y efecto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Compara Proyecto histórico con el hito anterior o posterior y explica una continuidad y una ruptura.",
        "answer": "continuidad",
        "hint": "Distingue qué idea permanece y qué restricción cambia."
      }
    ]
  }
});
