/**
 * BLOQUE 078 — PROYECTOS DE INTEGRACIÓN
 *
 * Capstone curricular: construir, medir, probar y explicar sistemas completos.
 */
window.LEARNING_PATHS[78] = {
  "level": "Proyectos de Integración",
  "estimatedHours": 1600,
  "description": "Ruta final de proyectos acumulativos: desde codificación y lógica hasta sistemas, gráficos, hardware, IA y un capstone multidisciplinar.",
  "outcomes": [
    "Convertir conocimientos aislados en sistemas ejecutables y verificables.",
    "Trabajar por hitos con criterios de aceptación, pruebas y evidencia reproducible.",
    "Explicar interfaces y trade-offs entre capas de hardware, software, red, gráficos e IA.",
    "Cerrar la formación con un proyecto multidisciplinar defendible técnicamente."
  ],
  "modules": [
    {
      "id": "m1-nivel-1",
      "title": "Nivel 1",
      "description": "Proyectos de integración de nivel 1",
      "lessons": [
        "proj-codificacion",
        "proj-calculadora-binaria",
        "proj-simulador-electrico",
        "proj-puertas-logicas",
        "proj-alu"
      ]
    },
    {
      "id": "m2-nivel-2",
      "title": "Nivel 2",
      "description": "Proyectos de integración de nivel 2",
      "lessons": [
        "proj-cpu-educativa",
        "proj-programas-assembly",
        "proj-emulador",
        "proj-allocator",
        "proj-shell"
      ]
    },
    {
      "id": "m3-nivel-3",
      "title": "Nivel 3",
      "description": "Proyectos de integración de nivel 3",
      "lessons": [
        "proj-lenguaje",
        "proj-compilador",
        "proj-filesystem",
        "proj-kernel",
        "proj-http-server",
        "proj-dns"
      ]
    },
    {
      "id": "m4-nivel-4",
      "title": "Nivel 4",
      "description": "Proyectos de integración de nivel 4",
      "lessons": [
        "proj-trafico",
        "proj-vuln-labs",
        "proj-reverse",
        "proj-renderer3d",
        "proj-motor-grafico"
      ]
    },
    {
      "id": "m5-nivel-5",
      "title": "Nivel 5",
      "description": "Proyectos de integración de nivel 5",
      "lessons": [
        "proj-videojuego",
        "proj-sintetizador",
        "proj-demoscene",
        "proj-intro64k",
        "proj-stm32",
        "proj-fpga",
        "proj-pcb"
      ]
    },
    {
      "id": "m6-nivel-6",
      "title": "Nivel 6",
      "description": "Proyectos de integración de nivel 6",
      "lessons": [
        "proj-nn-zero",
        "proj-transformer",
        "proj-modelo-propio",
        "proj-distribuido",
        "proj-final"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "proj-codificacion": {
    "id": "proj-codificacion",
    "courseId": 78,
    "title": "Sistema de codificación",
    "shortTitle": "Sistema de codificación",
    "duration": 180,
    "objective": "Diseña un formato reversible con alfabeto, codificación/decodificación, errores y pruebas.",
    "summary": [
      "Integra varias capas mediante la cadena information → representation → encoding.",
      "El resultado mínimo verificable es: Un codificador/decodificador con casos válidos, inválidos y documentación del formato.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 1: Sistema de codificación. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Diseña un formato reversible con alfabeto, codificación/decodificación, errores y pruebas.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena information → representation → encoding. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Un codificador/decodificador con casos válidos, inválidos y documentación del formato. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Sistema de codificación?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Sistema de codificación, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Sistema de codificación en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Sistema de codificación y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Sistema de codificación y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-calculadora-binaria": {
    "id": "proj-calculadora-binaria",
    "courseId": 78,
    "title": "Calculadora binaria",
    "shortTitle": "Calculadora binaria",
    "duration": 180,
    "objective": "Construye una calculadora que opere y explique conversiones, complemento a dos y overflow.",
    "summary": [
      "Integra varias capas mediante la cadena bits → arithmetic → representation.",
      "El resultado mínimo verificable es: Calculadora interactiva con trazas de cada operación y tests de límites.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 1: Calculadora binaria. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Construye una calculadora que opere y explique conversiones, complemento a dos y overflow.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena bits → arithmetic → representation. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Calculadora interactiva con trazas de cada operación y tests de límites. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Calculadora binaria?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Calculadora binaria, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Calculadora binaria en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Calculadora binaria y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Calculadora binaria y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-simulador-electrico": {
    "id": "proj-simulador-electrico",
    "courseId": 78,
    "title": "Simulador eléctrico",
    "shortTitle": "Simulador eléctrico",
    "duration": 180,
    "objective": "Modela circuitos DC sencillos y contrasta resultados con leyes de Ohm y Kirchhoff.",
    "summary": [
      "Integra varias capas mediante la cadena voltage/current → equations → simulation.",
      "El resultado mínimo verificable es: Simulador de resistencias y redes serie/paralelo con validación numérica.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 1: Simulador eléctrico. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Modela circuitos DC sencillos y contrasta resultados con leyes de Ohm y Kirchhoff.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena voltage/current → equations → simulation. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Simulador de resistencias y redes serie/paralelo con validación numérica. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Simulador eléctrico?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Simulador eléctrico, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Simulador eléctrico en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Simulador eléctrico y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Simulador eléctrico y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-puertas-logicas": {
    "id": "proj-puertas-logicas",
    "courseId": 78,
    "title": "Puertas lógicas",
    "shortTitle": "Puertas lógicas",
    "duration": 180,
    "objective": "Compón puertas y circuitos combinacionales a partir de expresiones booleanas.",
    "summary": [
      "Integra varias capas mediante la cadena boolean algebra → gates → truth tables.",
      "El resultado mínimo verificable es: Editor lógico con tabla de verdad y equivalencia entre expresiones.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 1: Puertas lógicas. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Compón puertas y circuitos combinacionales a partir de expresiones booleanas.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena boolean algebra → gates → truth tables. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Editor lógico con tabla de verdad y equivalencia entre expresiones. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Puertas lógicas?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Puertas lógicas, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Puertas lógicas en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Puertas lógicas y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Puertas lógicas y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-alu": {
    "id": "proj-alu",
    "courseId": 78,
    "title": "ALU",
    "shortTitle": "ALU",
    "duration": 180,
    "objective": "Implementa una ALU educativa con operaciones, flags y pruebas exhaustivas pequeñas.",
    "summary": [
      "Integra varias capas mediante la cadena gates → arithmetic → datapath.",
      "El resultado mínimo verificable es: ALU con suma, resta, lógica, flags y batería de vectores de prueba.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 1: ALU. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Implementa una ALU educativa con operaciones, flags y pruebas exhaustivas pequeñas.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena gates → arithmetic → datapath. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: ALU con suma, resta, lógica, flags y batería de vectores de prueba. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para ALU?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En ALU, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de ALU en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de ALU y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para ALU y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-cpu-educativa": {
    "id": "proj-cpu-educativa",
    "courseId": 78,
    "title": "CPU educativa",
    "shortTitle": "CPU educativa",
    "duration": 180,
    "objective": "Integra ALU, registros, PC, control e ISA en una CPU pequeña ejecutable.",
    "summary": [
      "Integra varias capas mediante la cadena ALU → registers → ISA → execution.",
      "El resultado mínimo verificable es: CPU que ejecute programas cortos paso a paso mostrando estado interno.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 2: CPU educativa. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Integra ALU, registros, PC, control e ISA en una CPU pequeña ejecutable.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena ALU → registers → ISA → execution. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: CPU que ejecute programas cortos paso a paso mostrando estado interno. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para CPU educativa?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En CPU educativa, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de CPU educativa en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de CPU educativa y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para CPU educativa y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-programas-assembly": {
    "id": "proj-programas-assembly",
    "courseId": 78,
    "title": "Programas assembly",
    "shortTitle": "Programas assembly",
    "duration": 180,
    "objective": "Escribe programas no triviales sobre una ISA y razona sobre stack, saltos y convenciones.",
    "summary": [
      "Integra varias capas mediante la cadena ISA → assembly → control flow.",
      "El resultado mínimo verificable es: Colección de programas con trazas, tests y explicación de invariantes.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 2: Programas assembly. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Escribe programas no triviales sobre una ISA y razona sobre stack, saltos y convenciones.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena ISA → assembly → control flow. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Colección de programas con trazas, tests y explicación de invariantes. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Programas assembly?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Programas assembly, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Programas assembly en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Programas assembly y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Programas assembly y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-emulador": {
    "id": "proj-emulador",
    "courseId": 78,
    "title": "Emulador",
    "shortTitle": "Emulador",
    "duration": 180,
    "objective": "Implementa fetch/decode/execute para una máquina definida por ti.",
    "summary": [
      "Integra varias capas mediante la cadena binary format → decoder → machine state.",
      "El resultado mínimo verificable es: Emulador reproducible con ROM de prueba y comparación contra resultados esperados.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 2: Emulador. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Implementa fetch/decode/execute para una máquina definida por ti.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena binary format → decoder → machine state. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Emulador reproducible con ROM de prueba y comparación contra resultados esperados. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Emulador?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Emulador, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Emulador en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Emulador y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Emulador y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-allocator": {
    "id": "proj-allocator",
    "courseId": 78,
    "title": "Allocator",
    "shortTitle": "Allocator",
    "duration": 180,
    "objective": "Construye un asignador de memoria educativo y mide fragmentación y coste.",
    "summary": [
      "Integra varias capas mediante la cadena heap → metadata → allocation policy.",
      "El resultado mínimo verificable es: Allocator con allocate/free, invariantes, tests y visualización del heap.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 2: Allocator. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Construye un asignador de memoria educativo y mide fragmentación y coste.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena heap → metadata → allocation policy. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Allocator con allocate/free, invariantes, tests y visualización del heap. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Allocator?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Allocator, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Allocator en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Allocator y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Allocator y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-shell": {
    "id": "proj-shell",
    "courseId": 78,
    "title": "Shell",
    "shortTitle": "Shell",
    "duration": 180,
    "objective": "Construye una shell pequeña con parsing, procesos y redirecciones en un entorno controlado.",
    "summary": [
      "Integra varias capas mediante la cadena parser → processes → file descriptors.",
      "El resultado mínimo verificable es: Shell educativa documentada con comandos propios o backend local controlado.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 2: Shell. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Construye una shell pequeña con parsing, procesos y redirecciones en un entorno controlado.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena parser → processes → file descriptors. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Shell educativa documentada con comandos propios o backend local controlado. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Shell?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Shell, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Shell en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Shell y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Shell y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-lenguaje": {
    "id": "proj-lenguaje",
    "courseId": 78,
    "title": "Lenguaje propio",
    "shortTitle": "Lenguaje propio",
    "duration": 180,
    "objective": "Define sintaxis, semántica y errores de un lenguaje pequeño.",
    "summary": [
      "Integra varias capas mediante la cadena tokens → grammar → AST → semantics.",
      "El resultado mínimo verificable es: Especificación y parser ejecutable con programas de ejemplo.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 3: Lenguaje propio. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Define sintaxis, semántica y errores de un lenguaje pequeño.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena tokens → grammar → AST → semantics. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Especificación y parser ejecutable con programas de ejemplo. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Lenguaje propio?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Lenguaje propio, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Lenguaje propio en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Lenguaje propio y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Lenguaje propio y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-compilador": {
    "id": "proj-compilador",
    "courseId": 78,
    "title": "Compilador",
    "shortTitle": "Compilador",
    "duration": 180,
    "objective": "Transforma el lenguaje a bytecode o código objetivo y valida cada fase.",
    "summary": [
      "Integra varias capas mediante la cadena lexer → parser → IR → codegen.",
      "El resultado mínimo verificable es: Compilador con inspección de tokens, AST, bytecode y suite de tests.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 3: Compilador. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Transforma el lenguaje a bytecode o código objetivo y valida cada fase.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena lexer → parser → IR → codegen. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Compilador con inspección de tokens, AST, bytecode y suite de tests. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Compilador?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Compilador, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Compilador en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Compilador y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Compilador y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-filesystem": {
    "id": "proj-filesystem",
    "courseId": 78,
    "title": "Sistema de archivos",
    "shortTitle": "Sistema de archivos",
    "duration": 180,
    "objective": "Diseña bloques, metadatos, directorios y recuperación para un filesystem educativo.",
    "summary": [
      "Integra varias capas mediante la cadena blocks → metadata → namespace → recovery.",
      "El resultado mínimo verificable es: Imagen de disco simulada, operaciones básicas y checker de consistencia.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 3: Sistema de archivos. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Diseña bloques, metadatos, directorios y recuperación para un filesystem educativo.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena blocks → metadata → namespace → recovery. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Imagen de disco simulada, operaciones básicas y checker de consistencia. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Sistema de archivos?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Sistema de archivos, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Sistema de archivos en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Sistema de archivos y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Sistema de archivos y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-kernel": {
    "id": "proj-kernel",
    "courseId": 78,
    "title": "Kernel educativo",
    "shortTitle": "Kernel educativo",
    "duration": 180,
    "objective": "Integra boot, memoria, interrupciones y scheduling en un núcleo mínimo o simulador fiel.",
    "summary": [
      "Integra varias capas mediante la cadena boot → privilege → memory → scheduling.",
      "El resultado mínimo verificable es: Kernel/simulador con hitos verificables y documentación de arquitectura.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 3: Kernel educativo. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Integra boot, memoria, interrupciones y scheduling en un núcleo mínimo o simulador fiel.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena boot → privilege → memory → scheduling. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Kernel/simulador con hitos verificables y documentación de arquitectura. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Kernel educativo?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Kernel educativo, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Kernel educativo en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Kernel educativo y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Kernel educativo y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-http-server": {
    "id": "proj-http-server",
    "courseId": 78,
    "title": "Servidor HTTP",
    "shortTitle": "Servidor HTTP",
    "duration": 180,
    "objective": "Implementa parsing, framing, métodos y respuestas HTTP para un subconjunto bien definido.",
    "summary": [
      "Integra varias capas mediante la cadena TCP stream → HTTP syntax → application semantics.",
      "El resultado mínimo verificable es: Servidor probado con peticiones válidas, parciales, erróneas y concurrentes.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 3: Servidor HTTP. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Implementa parsing, framing, métodos y respuestas HTTP para un subconjunto bien definido.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena TCP stream → HTTP syntax → application semantics. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Servidor probado con peticiones válidas, parciales, erróneas y concurrentes. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Servidor HTTP?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Servidor HTTP, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Servidor HTTP en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Servidor HTTP y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Servidor HTTP y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-dns": {
    "id": "proj-dns",
    "courseId": 78,
    "title": "DNS simplificado",
    "shortTitle": "DNS simplificado",
    "duration": 180,
    "objective": "Construye encoder/decoder de mensajes DNS y un resolvedor educativo limitado.",
    "summary": [
      "Integra varias capas mediante la cadena names → wire format → transport → cache.",
      "El resultado mínimo verificable es: Codec DNS con consultas de laboratorio, compresión de nombres y tests.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 3: DNS simplificado. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Construye encoder/decoder de mensajes DNS y un resolvedor educativo limitado.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena names → wire format → transport → cache. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Codec DNS con consultas de laboratorio, compresión de nombres y tests. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para DNS simplificado?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En DNS simplificado, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de DNS simplificado en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de DNS simplificado y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para DNS simplificado y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-trafico": {
    "id": "proj-trafico",
    "courseId": 78,
    "title": "Analizador de tráfico",
    "shortTitle": "Analizador de tráfico",
    "duration": 240,
    "objective": "Decodifica capturas propias y reconstruye capas sin convertir el laboratorio en herramienta ofensiva.",
    "summary": [
      "Integra varias capas mediante la cadena frame → packet → segment → protocol.",
      "El resultado mínimo verificable es: Analizador offline de PCAP/datos sintéticos con filtros y estadísticas.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 4: Analizador de tráfico. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Decodifica capturas propias y reconstruye capas sin convertir el laboratorio en herramienta ofensiva.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena frame → packet → segment → protocol. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Analizador offline de PCAP/datos sintéticos con filtros y estadísticas. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Analizador de tráfico?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Analizador de tráfico, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Analizador de tráfico en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Analizador de tráfico y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Analizador de tráfico y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-vuln-labs": {
    "id": "proj-vuln-labs",
    "courseId": 78,
    "title": "Laboratorios de vulnerabilidades",
    "shortTitle": "Laboratorios de vulnerabilidades",
    "duration": 240,
    "objective": "Crea fallos deliberados en entornos aislados y acompáñalos de mitigación y regresión.",
    "summary": [
      "Integra varias capas mediante la cadena bug → exploitability → mitigation → regression.",
      "El resultado mínimo verificable es: Laboratorios propios/autorizados con explicación defensiva y tests de parche.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 4: Laboratorios de vulnerabilidades. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Crea fallos deliberados en entornos aislados y acompáñalos de mitigación y regresión.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena bug → exploitability → mitigation → regression. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Laboratorios propios/autorizados con explicación defensiva y tests de parche. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Laboratorios de vulnerabilidades?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Laboratorios de vulnerabilidades, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Laboratorios de vulnerabilidades en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Laboratorios de vulnerabilidades y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Laboratorios de vulnerabilidades y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-reverse": {
    "id": "proj-reverse",
    "courseId": 78,
    "title": "Reverse engineering de programas",
    "shortTitle": "Reverse engineering de programas",
    "duration": 240,
    "objective": "Reconstruye estructura y comportamiento de binarios propios o de laboratorio.",
    "summary": [
      "Integra varias capas mediante la cadena machine code → control/data flow → hypothesis.",
      "El resultado mínimo verificable es: Informe reproducible con funciones, formatos, evidencia y límites.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 4: Reverse engineering de programas. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Reconstruye estructura y comportamiento de binarios propios o de laboratorio.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena machine code → control/data flow → hypothesis. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Informe reproducible con funciones, formatos, evidencia y límites. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Reverse engineering de programas?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Reverse engineering de programas, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Reverse engineering de programas en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Reverse engineering de programas y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Reverse engineering de programas y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-renderer3d": {
    "id": "proj-renderer3d",
    "courseId": 78,
    "title": "Renderer 3D",
    "shortTitle": "Renderer 3D",
    "duration": 240,
    "objective": "Construye un rasterizador que lleve vértices a píxeles con profundidad y perspectiva.",
    "summary": [
      "Integra varias capas mediante la cadena linear algebra → pipeline → rasterization.",
      "El resultado mínimo verificable es: Renderer con triángulos, cámara, z-buffer, texturas y tests visuales.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 4: Renderer 3D. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Construye un rasterizador que lleve vértices a píxeles con profundidad y perspectiva.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena linear algebra → pipeline → rasterization. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Renderer con triángulos, cámara, z-buffer, texturas y tests visuales. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Renderer 3D?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Renderer 3D, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Renderer 3D en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Renderer 3D y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Renderer 3D y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-motor-grafico": {
    "id": "proj-motor-grafico",
    "courseId": 78,
    "title": "Motor gráfico",
    "shortTitle": "Motor gráfico",
    "duration": 240,
    "objective": "Organiza renderer, recursos, escena y herramientas en una arquitectura mantenible.",
    "summary": [
      "Integra varias capas mediante la cadena renderer → resources → scene → tooling.",
      "El resultado mínimo verificable es: Motor pequeño con escena, materiales, assets y profiling básico.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 4: Motor gráfico. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Organiza renderer, recursos, escena y herramientas en una arquitectura mantenible.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena renderer → resources → scene → tooling. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Motor pequeño con escena, materiales, assets y profiling básico. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Motor gráfico?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Motor gráfico, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Motor gráfico en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Motor gráfico y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Motor gráfico y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-videojuego": {
    "id": "proj-videojuego",
    "courseId": 78,
    "title": "Videojuego completo",
    "shortTitle": "Videojuego completo",
    "duration": 240,
    "objective": "Integra game loop, input, física, IA, audio, guardado y presentación.",
    "summary": [
      "Integra varias capas mediante la cadena engine systems → gameplay → testing.",
      "El resultado mínimo verificable es: Vertical slice jugable con métricas, bugs conocidos y build reproducible.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 5: Videojuego completo. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Integra game loop, input, física, IA, audio, guardado y presentación.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena engine systems → gameplay → testing. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Vertical slice jugable con métricas, bugs conocidos y build reproducible. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Videojuego completo?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Videojuego completo, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Videojuego completo en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Videojuego completo y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Videojuego completo y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-sintetizador": {
    "id": "proj-sintetizador",
    "courseId": 78,
    "title": "Sintetizador procedural",
    "shortTitle": "Sintetizador procedural",
    "duration": 240,
    "objective": "Genera audio desde osciladores, envolventes, filtros y secuenciación.",
    "summary": [
      "Integra varias capas mediante la cadena signal → oscillator → envelope → mix.",
      "El resultado mínimo verificable es: Sintetizador interactivo con presets y visualización de señal.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 5: Sintetizador procedural. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Genera audio desde osciladores, envolventes, filtros y secuenciación.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena signal → oscillator → envelope → mix. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Sintetizador interactivo con presets y visualización de señal. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Sintetizador procedural?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Sintetizador procedural, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Sintetizador procedural en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Sintetizador procedural y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Sintetizador procedural y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-demoscene": {
    "id": "proj-demoscene",
    "courseId": 78,
    "title": "Demo demoscene",
    "shortTitle": "Demo demoscene",
    "duration": 240,
    "objective": "Integra gráficos, audio, timing y proceduralidad bajo una dirección técnica coherente.",
    "summary": [
      "Integra varias capas mediante la cadena procedural graphics + audio + timing.",
      "El resultado mínimo verificable es: Demo reproducible con sincronización audiovisual y análisis de presupuesto.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 5: Demo demoscene. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Integra gráficos, audio, timing y proceduralidad bajo una dirección técnica coherente.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena procedural graphics + audio + timing. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Demo reproducible con sincronización audiovisual y análisis de presupuesto. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Demo demoscene?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Demo demoscene, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Demo demoscene en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Demo demoscene y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Demo demoscene y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-intro64k": {
    "id": "proj-intro64k",
    "courseId": 78,
    "title": "Intro 64 KB",
    "shortTitle": "Intro 64 KB",
    "duration": 240,
    "objective": "Diseña una pieza bajo restricción extrema de tamaño midiendo cada decisión.",
    "summary": [
      "Integra varias capas mediante la cadena size budget → procedural generation → compression.",
      "El resultado mínimo verificable es: Intro o simulación del presupuesto con mapa de bytes y trade-offs documentados.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 5: Intro 64 KB. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Diseña una pieza bajo restricción extrema de tamaño midiendo cada decisión.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena size budget → procedural generation → compression. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Intro o simulación del presupuesto con mapa de bytes y trade-offs documentados. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Intro 64 KB?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Intro 64 KB, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Intro 64 KB en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Intro 64 KB y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Intro 64 KB y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-stm32": {
    "id": "proj-stm32",
    "courseId": 78,
    "title": "Proyecto STM32",
    "shortTitle": "Proyecto STM32",
    "duration": 240,
    "objective": "Integra periféricos, interrupciones y tiempo real sobre un microcontrolador o simulación equivalente.",
    "summary": [
      "Integra varias capas mediante la cadena GPIO/timers/DMA → firmware → hardware.",
      "El resultado mínimo verificable es: Firmware con máquina de estados, medición temporal y manejo de fallos.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 5: Proyecto STM32. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Integra periféricos, interrupciones y tiempo real sobre un microcontrolador o simulación equivalente.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena GPIO/timers/DMA → firmware → hardware. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Firmware con máquina de estados, medición temporal y manejo de fallos. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Proyecto STM32?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Proyecto STM32, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Proyecto STM32 en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Proyecto STM32 y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Proyecto STM32 y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-fpga": {
    "id": "proj-fpga",
    "courseId": 78,
    "title": "Diseño FPGA",
    "shortTitle": "Diseño FPGA",
    "duration": 240,
    "objective": "Describe, sintetiza y verifica un circuito secuencial con timing explícito.",
    "summary": [
      "Integra varias capas mediante la cadena RTL → simulation → synthesis → timing.",
      "El resultado mínimo verificable es: Diseño HDL con testbench y reporte de timing/recursos cuando haya toolchain.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 5: Diseño FPGA. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Describe, sintetiza y verifica un circuito secuencial con timing explícito.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena RTL → simulation → synthesis → timing. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Diseño HDL con testbench y reporte de timing/recursos cuando haya toolchain. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Diseño FPGA?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Diseño FPGA, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Diseño FPGA en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Diseño FPGA y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Diseño FPGA y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-pcb": {
    "id": "proj-pcb",
    "courseId": 78,
    "title": "PCB",
    "shortTitle": "PCB",
    "duration": 240,
    "objective": "Lleva un circuito desde esquema a placa revisable y fabricable.",
    "summary": [
      "Integra varias capas mediante la cadena schematic → layout → DRC → manufacturing.",
      "El resultado mínimo verificable es: Diseño con BOM, reglas, revisión de potencia/señal y outputs de fabricación.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 5: PCB. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Lleva un circuito desde esquema a placa revisable y fabricable.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena schematic → layout → DRC → manufacturing. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Diseño con BOM, reglas, revisión de potencia/señal y outputs de fabricación. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para PCB?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En PCB, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de PCB en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de PCB y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para PCB y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-nn-zero": {
    "id": "proj-nn-zero",
    "courseId": 78,
    "title": "Red neuronal desde cero",
    "shortTitle": "Red neuronal desde cero",
    "duration": 240,
    "objective": "Implementa forward, loss, backpropagation y optimización sin framework de autograd.",
    "summary": [
      "Integra varias capas mediante la cadena linear algebra → derivatives → optimization.",
      "El resultado mínimo verificable es: MLP entrenable con gradient check y curvas de pérdida.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 6: Red neuronal desde cero. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Implementa forward, loss, backpropagation y optimización sin framework de autograd.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena linear algebra → derivatives → optimization. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: MLP entrenable con gradient check y curvas de pérdida. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Red neuronal desde cero?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Red neuronal desde cero, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Red neuronal desde cero en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Red neuronal desde cero y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Red neuronal desde cero y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-transformer": {
    "id": "proj-transformer",
    "courseId": 78,
    "title": "Transformer pequeño",
    "shortTitle": "Transformer pequeño",
    "duration": 240,
    "objective": "Implementa atención, máscara causal, MLP y entrenamiento de un modelo pequeño.",
    "summary": [
      "Integra varias capas mediante la cadena tokens → attention → residual blocks → loss.",
      "El resultado mínimo verificable es: Transformer diminuto con tests de shapes/masking y generación reproducible.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 6: Transformer pequeño. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Implementa atención, máscara causal, MLP y entrenamiento de un modelo pequeño.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena tokens → attention → residual blocks → loss. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Transformer diminuto con tests de shapes/masking y generación reproducible. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Transformer pequeño?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Transformer pequeño, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Transformer pequeño en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Transformer pequeño y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Transformer pequeño y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-modelo-propio": {
    "id": "proj-modelo-propio",
    "courseId": 78,
    "title": "Modelo propio",
    "shortTitle": "Modelo propio",
    "duration": 240,
    "objective": "Diseña un experimento ML completo con datos, baseline, entrenamiento y evaluación.",
    "summary": [
      "Integra varias capas mediante la cadena data → objective → training → evaluation.",
      "El resultado mínimo verificable es: Modelo con baseline, split correcto, métricas y análisis de errores.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 6: Modelo propio. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Diseña un experimento ML completo con datos, baseline, entrenamiento y evaluación.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena data → objective → training → evaluation. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Modelo con baseline, split correcto, métricas y análisis de errores. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Modelo propio?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Modelo propio, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Modelo propio en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Modelo propio y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Modelo propio y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-distribuido": {
    "id": "proj-distribuido",
    "courseId": 78,
    "title": "Sistema distribuido pequeño",
    "shortTitle": "Sistema distribuido pequeño",
    "duration": 240,
    "objective": "Integra replicación, fallos, idempotencia y observabilidad en varios nodos simulados o reales.",
    "summary": [
      "Integra varias capas mediante la cadena messages → replication → failure → recovery.",
      "El resultado mínimo verificable es: Servicio multi-nodo con fallos inyectados, invariantes y trazas.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 6: Sistema distribuido pequeño. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Integra replicación, fallos, idempotencia y observabilidad en varios nodos simulados o reales.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena messages → replication → failure → recovery. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Servicio multi-nodo con fallos inyectados, invariantes y trazas. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Sistema distribuido pequeño?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Sistema distribuido pequeño, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Sistema distribuido pequeño en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Sistema distribuido pequeño y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Sistema distribuido pequeño y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  },
  "proj-final": {
    "id": "proj-final",
    "courseId": 78,
    "title": "Proyecto final multidisciplinar",
    "shortTitle": "Proyecto final multidisciplinar",
    "duration": 240,
    "objective": "Construye un sistema vertical que puedas explicar desde sus capas físicas/lógicas hasta su software y comportamiento.",
    "summary": [
      "Integra varias capas mediante la cadena hardware/emulation → runtime → network/graphics/AI → evidence.",
      "El resultado mínimo verificable es: Capstone con arquitectura, prototipo, pruebas, mediciones, documentación y defensa técnica.",
      "La evaluación exige evidencia reproducible, tests o mediciones y una explicación de límites; que “funcione una vez” no basta."
    ],
    "concept": "Proyecto de nivel 6: Proyecto final multidisciplinar. El objetivo es integrar conocimientos previos mediante un artefacto verificable, no acumular funcionalidades sin criterio.",
    "rules": [
      "Define primero un alcance mínimo y una prueba de aceptación observable.",
      "Trabaja por hitos pequeños que siempre dejen una versión ejecutable o verificable.",
      "Documenta decisiones, supuestos, fallos conocidos y evidencia; evita declarar éxito solo porque la demo funciona."
    ],
    "deep": {
      "intro": "Construye un sistema vertical que puedas explicar desde sus capas físicas/lógicas hasta su software y comportamiento.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Dibuja y explica la cadena hardware/emulation → runtime → network/graphics/AI → evidence. Para cada frontera indica datos de entrada/salida, invariantes y qué bloque previo de la universidad la justifica."
        },
        {
          "title": "MVP verificable",
          "body": "Primera meta: Capstone con arquitectura, prototipo, pruebas, mediciones, documentación y defensa técnica. Reduce el alcance hasta poder probarlo de extremo a extremo antes de añadir complejidad."
        },
        {
          "title": "Instrumentación y pruebas",
          "body": "Añade tests, asserts, logs, trazas o métricas apropiadas. Guarda casos de regresión para cada fallo importante encontrado."
        },
        {
          "title": "Cierre técnico",
          "body": "Entrega instrucciones reproducibles, decisiones/trade-offs, limitaciones, resultados medidos y una lista concreta de mejoras futuras."
        }
      ]
    },
    "example": {
      "problem": "¿Cuál es el criterio de terminado para Proyecto final multidisciplinar?",
      "steps": [
        "Define un comportamiento observable y una prueba de aceptación.",
        "Ejecuta la prueba desde un estado limpio y conserva la evidencia."
      ],
      "solution": "evidencia reproducible"
    },
    "check": {
      "question": "En Proyecto final multidisciplinar, ¿qué demuestra mejor que el proyecto está realmente terminado?",
      "options": [
        [
          "Tiene muchas líneas de código",
          false
        ],
        [
          "Existe un resultado reproducible que cumple criterios de aceptación y pruebas",
          true
        ],
        [
          "Funciona una vez en la máquina del autor",
          false
        ]
      ],
      "feedback": "Un proyecto de integración se evalúa por comportamiento reproducible, evidencia y comprensión de las capas, no por tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Escribe el MVP de Proyecto final multidisciplinar en una sola frase con entrada, salida y criterio de aceptación.",
        "answer": "criterio",
        "alternatives": [
          "mvp"
        ],
        "hint": "Debe poder decidirse objetivamente si pasa o falla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dibuja al menos tres componentes de Proyecto final multidisciplinar y anota un contrato entre dos de ellos.",
        "answer": "contrato",
        "hint": "Incluye datos y una precondición o invariante."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba de fallo para Proyecto final multidisciplinar y explica qué evidencia recogerías.",
        "answer": "evidencia",
        "hint": "Elige un fallo capaz de romper un supuesto importante."
      }
    ]
  }
});
