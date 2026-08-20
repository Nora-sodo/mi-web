/**
 * BLOQUE 071 — BASES DE DATOS
 *
 * Regla editorial: separar modelo lógico, plan físico, concurrencia y durabilidad.
 * Ninguna palabra como ACID, MVCC, índice o NoSQL se usa como garantía sin declarar su alcance.
 */
window.LEARNING_PATHS[71] = {
  "level": "Bases de Datos",
  "estimatedHours": 210,
  "description": "Persistencia estructurada: modelo relacional, SQL, índices, B-trees, transacciones, aislamiento, MVCC, planner, WAL, NoSQL y distribución.",
  "outcomes": [
    "Diseñar esquemas relacionales con constraints que expresen invariantes del dominio.",
    "Razonar sobre índices, B-trees y planes de ejecución usando costes y estadísticas.",
    "Comparar transacciones, niveles de aislamiento y MVCC mediante anomalías observables.",
    "Explicar recuperación con WAL y elegir modelos NoSQL/distribuidos según patrones de acceso y garantías."
  ],
  "modules": [
    {
      "id": "m1-relational",
      "title": "Modelo y lenguaje",
      "description": "Relaciones, SQL y esquema",
      "lessons": [
        "relational-model",
        "sql",
        "tables-schema-constraints"
      ]
    },
    {
      "id": "m2-access",
      "title": "Acceso físico",
      "description": "Índices y B-trees",
      "lessons": [
        "indexes",
        "btrees"
      ]
    },
    {
      "id": "m3-transactions",
      "title": "Transacciones",
      "description": "Transacciones, ACID y aislamiento",
      "lessons": [
        "transactions",
        "acid",
        "isolation"
      ]
    },
    {
      "id": "m4-concurrency",
      "title": "Concurrencia y ejecución",
      "description": "MVCC y planificación",
      "lessons": [
        "mvcc",
        "query-planners"
      ]
    },
    {
      "id": "m5-storage",
      "title": "Persistencia y modelos",
      "description": "WAL, NoSQL y key-value",
      "lessons": [
        "wal",
        "nosql",
        "key-value-databases"
      ]
    },
    {
      "id": "m6-scale",
      "title": "Diseño a escala",
      "description": "Distribución y normalización",
      "lessons": [
        "distributed-databases-db",
        "normalization-denormalization"
      ]
    },
    {
      "id": "m7-project",
      "title": "Integración",
      "description": "Proyecto final",
      "lessons": [
        "database-integration-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "relational-model": {
    "id": "relational-model",
    "courseId": 71,
    "title": "Modelo relacional: relaciones, tuplas y claves",
    "shortTitle": "Modelo relacional",
    "duration": 120,
    "objective": "Explicar el modelo relacional como una abstracción lógica basada en relaciones, atributos, tuplas y restricciones, separándolo de la representación física.",
    "summary": [
      "El modelo relacional describe datos mediante relaciones y operaciones sobre ellas; una tabla SQL es una realización práctica, no una identidad perfecta con la relación matemática.",
      "Una clave candidata identifica tuplas; una clave primaria es una candidata elegida. Las foreign keys expresan integridad referencial entre relaciones.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "El modelo relacional describe datos mediante relaciones y operaciones sobre ellas; una tabla SQL es una realización práctica, no una identidad perfecta con la relación matemática.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Explicar el modelo relacional como una abstracción lógica basada en relaciones, atributos, tuplas y restricciones, separándolo de la representación física.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El modelo relacional describe datos mediante relaciones y operaciones sobre ellas; una tabla SQL es una realización práctica, no una identidad perfecta con la relación matemática."
        },
        {
          "title": "Mecánica",
          "body": "Una clave candidata identifica tuplas; una clave primaria es una candidata elegida. Las foreign keys expresan integridad referencial entre relaciones."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿Una tabla SQL y una relación matemática son exactamente lo mismo en todos sus detalles?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una tabla SQL y una relación matemática son exactamente lo mismo en todos sus detalles?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "El modelo relacional describe datos mediante relaciones y operaciones sobre ellas; una tabla SQL es una realización práctica, no una identidad perfecta con la relación matemática."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una tabla SQL y una relación matemática son exactamente lo mismo en todos sus detalles?",
        "answer": "no",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Modelo relacional.",
        "answer": "tabla",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Modelo relacional: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "sql": {
    "id": "sql",
    "courseId": 71,
    "title": "SQL: lenguaje declarativo y álgebra relacional",
    "shortTitle": "SQL",
    "duration": 120,
    "objective": "Razonar sobre SQL como lenguaje declarativo: expresar qué resultado se desea y dejar la estrategia física al optimizador.",
    "summary": [
      "SQL permite describir resultados mediante selección, proyección, joins, agrupación y otras operaciones sin fijar necesariamente el algoritmo de ejecución.",
      "El orden lógico de una consulta y el plan físico elegido son capas distintas; un mismo resultado puede obtenerse con planes diferentes.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "SQL permite describir resultados mediante selección, proyección, joins, agrupación y otras operaciones sin fijar necesariamente el algoritmo de ejecución.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Razonar sobre SQL como lenguaje declarativo: expresar qué resultado se desea y dejar la estrategia física al optimizador.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "SQL permite describir resultados mediante selección, proyección, joins, agrupación y otras operaciones sin fijar necesariamente el algoritmo de ejecución."
        },
        {
          "title": "Mecánica",
          "body": "El orden lógico de una consulta y el plan físico elegido son capas distintas; un mismo resultado puede obtenerse con planes diferentes."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿SQL obliga normalmente a indicar el algoritmo físico exacto para ejecutar un JOIN?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿SQL obliga normalmente a indicar el algoritmo físico exacto para ejecutar un JOIN?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "SQL permite describir resultados mediante selección, proyección, joins, agrupación y otras operaciones sin fijar necesariamente el algoritmo de ejecución."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿SQL obliga normalmente a indicar el algoritmo físico exacto para ejecutar un JOIN?",
        "answer": "no",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de SQL.",
        "answer": "declarativo",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para SQL: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "tables-schema-constraints": {
    "id": "tables-schema-constraints",
    "courseId": 71,
    "title": "Tablas, esquema y constraints",
    "shortTitle": "Tablas y constraints",
    "duration": 120,
    "objective": "Diseñar esquemas con tipos, claves, nullability, CHECK, UNIQUE y foreign keys para trasladar invariantes al sistema de datos.",
    "summary": [
      "El esquema define estructura y restricciones; los constraints convierten parte de las reglas del dominio en invariantes comprobables por la base de datos.",
      "NOT NULL, CHECK, UNIQUE, PRIMARY KEY y FOREIGN KEY reducen estados inválidos, pero no sustituyen toda regla de negocio ni validación externa.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "El esquema define estructura y restricciones; los constraints convierten parte de las reglas del dominio en invariantes comprobables por la base de datos.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Diseñar esquemas con tipos, claves, nullability, CHECK, UNIQUE y foreign keys para trasladar invariantes al sistema de datos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El esquema define estructura y restricciones; los constraints convierten parte de las reglas del dominio en invariantes comprobables por la base de datos."
        },
        {
          "title": "Mecánica",
          "body": "NOT NULL, CHECK, UNIQUE, PRIMARY KEY y FOREIGN KEY reducen estados inválidos, pero no sustituyen toda regla de negocio ni validación externa."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿Un UNIQUE constraint puede proteger mejor una unicidad concurrente que un check-then-insert hecho solo en aplicación?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "si"
    },
    "check": {
      "question": "¿Un UNIQUE constraint puede proteger mejor una unicidad concurrente que un check-then-insert hecho solo en aplicación?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "El esquema define estructura y restricciones; los constraints convierten parte de las reglas del dominio en invariantes comprobables por la base de datos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un UNIQUE constraint puede proteger mejor una unicidad concurrente que un check-then-insert hecho solo en aplicación?",
        "answer": "si",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Tablas y constraints.",
        "answer": "constraint",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Tablas y constraints: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "indexes": {
    "id": "indexes",
    "courseId": 71,
    "title": "Índices: acelerar lecturas pagando escrituras y espacio",
    "shortTitle": "Índices",
    "duration": 120,
    "objective": "Explicar qué estructura auxiliar es un índice, cuándo puede reducir trabajo y qué coste introduce en almacenamiento, escrituras y mantenimiento.",
    "summary": [
      "Un índice mantiene una estructura adicional que permite localizar filas sin recorrer necesariamente toda la tabla, a cambio de espacio y trabajo extra en modificaciones.",
      "Que exista un índice no obliga al planner a usarlo; para algunas consultas un scan secuencial puede ser más barato.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "Un índice mantiene una estructura adicional que permite localizar filas sin recorrer necesariamente toda la tabla, a cambio de espacio y trabajo extra en modificaciones.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Explicar qué estructura auxiliar es un índice, cuándo puede reducir trabajo y qué coste introduce en almacenamiento, escrituras y mantenimiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un índice mantiene una estructura adicional que permite localizar filas sin recorrer necesariamente toda la tabla, a cambio de espacio y trabajo extra en modificaciones."
        },
        {
          "title": "Mecánica",
          "body": "Que exista un índice no obliga al planner a usarlo; para algunas consultas un scan secuencial puede ser más barato."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿Crear un índice garantiza que todas las consultas que mencionen esa columna lo usarán?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Crear un índice garantiza que todas las consultas que mencionen esa columna lo usarán?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Un índice mantiene una estructura adicional que permite localizar filas sin recorrer necesariamente toda la tabla, a cambio de espacio y trabajo extra en modificaciones."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Crear un índice garantiza que todas las consultas que mencionen esa columna lo usarán?",
        "answer": "no",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Índices.",
        "answer": "indice",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Índices: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "btrees": {
    "id": "btrees",
    "courseId": 71,
    "title": "B-trees: búsqueda ordenada en almacenamiento secundario",
    "shortTitle": "B-trees",
    "duration": 120,
    "objective": "Comprender por qué árboles B/B+ son adecuados para índices: gran fan-out, altura pequeña y recorrido ordenado.",
    "summary": [
      "Los B-trees organizan claves ordenadas en nodos de alto fan-out para mantener pocas visitas de página incluso con grandes conjuntos de datos.",
      "Sirven especialmente para igualdad y rangos ordenados, pero el comportamiento concreto depende de la implementación, comparadores y patrón de consulta.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "Los B-trees organizan claves ordenadas en nodos de alto fan-out para mantener pocas visitas de página incluso con grandes conjuntos de datos.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Comprender por qué árboles B/B+ son adecuados para índices: gran fan-out, altura pequeña y recorrido ordenado.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Los B-trees organizan claves ordenadas en nodos de alto fan-out para mantener pocas visitas de página incluso con grandes conjuntos de datos."
        },
        {
          "title": "Mecánica",
          "body": "Sirven especialmente para igualdad y rangos ordenados, pero el comportamiento concreto depende de la implementación, comparadores y patrón de consulta."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿Un B-tree mantiene las claves ordenadas y permite búsquedas por rango de forma natural?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "si"
    },
    "check": {
      "question": "¿Un B-tree mantiene las claves ordenadas y permite búsquedas por rango de forma natural?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Los B-trees organizan claves ordenadas en nodos de alto fan-out para mantener pocas visitas de página incluso con grandes conjuntos de datos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un B-tree mantiene las claves ordenadas y permite búsquedas por rango de forma natural?",
        "answer": "si",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de B-trees.",
        "answer": "btree",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para B-trees: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "transactions": {
    "id": "transactions",
    "courseId": 71,
    "title": "Transacciones: unidad lógica, commit y rollback",
    "shortTitle": "Transacciones",
    "duration": 120,
    "objective": "Modelar una transacción como una unidad de trabajo con estados, commit/rollback y efectos concurrentes observables.",
    "summary": [
      "Una transacción agrupa operaciones cuya publicación se controla mediante commit; rollback descarta su trabajo según la semántica del motor.",
      "Transacción no significa automáticamente serialización global: el aislamiento determina qué interacciones concurrentes son permitidas.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "Una transacción agrupa operaciones cuya publicación se controla mediante commit; rollback descarta su trabajo según la semántica del motor.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Modelar una transacción como una unidad de trabajo con estados, commit/rollback y efectos concurrentes observables.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una transacción agrupa operaciones cuya publicación se controla mediante commit; rollback descarta su trabajo según la semántica del motor."
        },
        {
          "title": "Mecánica",
          "body": "Transacción no significa automáticamente serialización global: el aislamiento determina qué interacciones concurrentes son permitidas."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿Usar transacciones implica automáticamente que dos transacciones concurrentes se ejecutan como si fueran estrictamente una detrás de otra?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Usar transacciones implica automáticamente que dos transacciones concurrentes se ejecutan como si fueran estrictamente una detrás de otra?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Una transacción agrupa operaciones cuya publicación se controla mediante commit; rollback descarta su trabajo según la semántica del motor."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Usar transacciones implica automáticamente que dos transacciones concurrentes se ejecutan como si fueran estrictamente una detrás de otra?",
        "answer": "no",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Transacciones.",
        "answer": "commit",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Transacciones: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "acid": {
    "id": "acid",
    "courseId": 71,
    "title": "ACID sin slogans: atomicidad, consistencia, aislamiento y durabilidad",
    "shortTitle": "ACID",
    "duration": 120,
    "objective": "Definir ACID con precisión y distinguir propiedades de transacción, invariantes de aplicación y garantías condicionadas de persistencia.",
    "summary": [
      "Atomicidad evita commits parciales; consistencia en ACID se refiere a preservar invariantes bajo operaciones correctas; aislamiento limita interferencias; durabilidad define qué sobrevive tras commit según el contrato del sistema.",
      "ACID no garantiza que el esquema modele bien el negocio, ni que un sistema distribuido sea siempre disponible, ni que todo fallo físico imaginable preserve datos.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "Atomicidad evita commits parciales; consistencia en ACID se refiere a preservar invariantes bajo operaciones correctas; aislamiento limita interferencias; durabilidad define qué sobrevive tras commit según el contrato del sistema.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Definir ACID con precisión y distinguir propiedades de transacción, invariantes de aplicación y garantías condicionadas de persistencia.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Atomicidad evita commits parciales; consistencia en ACID se refiere a preservar invariantes bajo operaciones correctas; aislamiento limita interferencias; durabilidad define qué sobrevive tras commit según el contrato del sistema."
        },
        {
          "title": "Mecánica",
          "body": "ACID no garantiza que el esquema modele bien el negocio, ni que un sistema distribuido sea siempre disponible, ni que todo fallo físico imaginable preserve datos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿ACID garantiza por sí solo que cualquier regla de negocio esté correctamente modelada?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿ACID garantiza por sí solo que cualquier regla de negocio esté correctamente modelada?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Atomicidad evita commits parciales; consistencia en ACID se refiere a preservar invariantes bajo operaciones correctas; aislamiento limita interferencias; durabilidad define qué sobrevive tras commit según el contrato del sistema."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿ACID garantiza por sí solo que cualquier regla de negocio esté correctamente modelada?",
        "answer": "no",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de ACID.",
        "answer": "acid",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para ACID: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "isolation": {
    "id": "isolation",
    "courseId": 71,
    "title": "Aislamiento: anomalías y serializabilidad",
    "shortTitle": "Aislamiento",
    "duration": 120,
    "objective": "Comparar niveles de aislamiento mediante anomalías observables y entender serializabilidad como equivalencia a alguna ejecución serial.",
    "summary": [
      "Los niveles de aislamiento determinan qué efectos concurrentes pueden observar las transacciones; nombres similares pueden tener detalles distintos entre motores.",
      "Read Committed, Repeatable Read y Serializable no deben estudiarse solo como una lista: hay que razonar sobre dirty/nonrepeatable/phantom reads, lost updates y write skew según el motor.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "Los niveles de aislamiento determinan qué efectos concurrentes pueden observar las transacciones; nombres similares pueden tener detalles distintos entre motores.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Comparar niveles de aislamiento mediante anomalías observables y entender serializabilidad como equivalencia a alguna ejecución serial.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Los niveles de aislamiento determinan qué efectos concurrentes pueden observar las transacciones; nombres similares pueden tener detalles distintos entre motores."
        },
        {
          "title": "Mecánica",
          "body": "Read Committed, Repeatable Read y Serializable no deben estudiarse solo como una lista: hay que razonar sobre dirty/nonrepeatable/phantom reads, lost updates y write skew según el motor."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿Serializable pretende que el resultado sea equivalente a alguna ejecución serial de las transacciones comprometidas?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "si"
    },
    "check": {
      "question": "¿Serializable pretende que el resultado sea equivalente a alguna ejecución serial de las transacciones comprometidas?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Los niveles de aislamiento determinan qué efectos concurrentes pueden observar las transacciones; nombres similares pueden tener detalles distintos entre motores."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Serializable pretende que el resultado sea equivalente a alguna ejecución serial de las transacciones comprometidas?",
        "answer": "si",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Aislamiento.",
        "answer": "aislamiento",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Aislamiento: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "mvcc": {
    "id": "mvcc",
    "courseId": 71,
    "title": "MVCC: múltiples versiones y visibilidad",
    "shortTitle": "MVCC",
    "duration": 120,
    "objective": "Explicar cómo MVCC desacopla muchas lecturas de escrituras mediante versiones y snapshots, y por qué necesita reglas de visibilidad y limpieza.",
    "summary": [
      "MVCC conserva versiones de filas y decide qué versión es visible para cada operación o snapshot, reduciendo ciertos conflictos lector-escritor.",
      "MVCC no significa ausencia de locks: escrituras conflictivas, DDL y otras operaciones pueden bloquear; además las versiones antiguas necesitan reclamación.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "MVCC conserva versiones de filas y decide qué versión es visible para cada operación o snapshot, reduciendo ciertos conflictos lector-escritor.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Explicar cómo MVCC desacopla muchas lecturas de escrituras mediante versiones y snapshots, y por qué necesita reglas de visibilidad y limpieza.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "MVCC conserva versiones de filas y decide qué versión es visible para cada operación o snapshot, reduciendo ciertos conflictos lector-escritor."
        },
        {
          "title": "Mecánica",
          "body": "MVCC no significa ausencia de locks: escrituras conflictivas, DDL y otras operaciones pueden bloquear; además las versiones antiguas necesitan reclamación."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿MVCC significa que una base de datos jamás usa locks?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿MVCC significa que una base de datos jamás usa locks?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "MVCC conserva versiones de filas y decide qué versión es visible para cada operación o snapshot, reduciendo ciertos conflictos lector-escritor."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿MVCC significa que una base de datos jamás usa locks?",
        "answer": "no",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de MVCC.",
        "answer": "mvcc",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para MVCC: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "query-planners": {
    "id": "query-planners",
    "courseId": 71,
    "title": "Query planner: costes, estadísticas y planes",
    "shortTitle": "Query planner",
    "duration": 120,
    "objective": "Entender cómo el optimizador transforma una consulta lógica en un plan físico usando equivalencias, estadísticas y un modelo de costes.",
    "summary": [
      "El planner compara alternativas como scans, índices, algoritmos de join y órdenes de join usando estimaciones de cardinalidad y costes.",
      "Estadísticas inexactas pueden inducir malas estimaciones y planes lentos; EXPLAIN ayuda a observar el plan, no a demostrar que sea globalmente óptimo.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "El planner compara alternativas como scans, índices, algoritmos de join y órdenes de join usando estimaciones de cardinalidad y costes.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Entender cómo el optimizador transforma una consulta lógica en un plan físico usando equivalencias, estadísticas y un modelo de costes.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El planner compara alternativas como scans, índices, algoritmos de join y órdenes de join usando estimaciones de cardinalidad y costes."
        },
        {
          "title": "Mecánica",
          "body": "Estadísticas inexactas pueden inducir malas estimaciones y planes lentos; EXPLAIN ayuda a observar el plan, no a demostrar que sea globalmente óptimo."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿Las estadísticas de cardinalidad pueden cambiar qué plan elige un optimizador?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "si"
    },
    "check": {
      "question": "¿Las estadísticas de cardinalidad pueden cambiar qué plan elige un optimizador?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "El planner compara alternativas como scans, índices, algoritmos de join y órdenes de join usando estimaciones de cardinalidad y costes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Las estadísticas de cardinalidad pueden cambiar qué plan elige un optimizador?",
        "answer": "si",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Query planner.",
        "answer": "planner",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Query planner: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "wal": {
    "id": "wal",
    "courseId": 71,
    "title": "Write-ahead logging: recuperación antes que páginas",
    "shortTitle": "WAL",
    "duration": 120,
    "objective": "Explicar el principio write-ahead: registrar información de recuperación antes de depender de la escritura final de páginas de datos.",
    "summary": [
      "En WAL, los cambios relevantes para recuperación se registran en un log antes de que las páginas modificadas tengan que llegar de forma permanente a su ubicación final.",
      "WAL permite recuperación y puede alimentar replicación, pero checkpoint, fsync, buffers y configuración determinan el contrato real de durabilidad y rendimiento.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "En WAL, los cambios relevantes para recuperación se registran en un log antes de que las páginas modificadas tengan que llegar de forma permanente a su ubicación final.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Explicar el principio write-ahead: registrar información de recuperación antes de depender de la escritura final de páginas de datos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "En WAL, los cambios relevantes para recuperación se registran en un log antes de que las páginas modificadas tengan que llegar de forma permanente a su ubicación final."
        },
        {
          "title": "Mecánica",
          "body": "WAL permite recuperación y puede alimentar replicación, pero checkpoint, fsync, buffers y configuración determinan el contrato real de durabilidad y rendimiento."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿El principio WAL exige que la información necesaria del log se haga durable antes de depender de la página de datos modificada?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "si"
    },
    "check": {
      "question": "¿El principio WAL exige que la información necesaria del log se haga durable antes de depender de la página de datos modificada?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "En WAL, los cambios relevantes para recuperación se registran en un log antes de que las páginas modificadas tengan que llegar de forma permanente a su ubicación final."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El principio WAL exige que la información necesaria del log se haga durable antes de depender de la página de datos modificada?",
        "answer": "si",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de WAL.",
        "answer": "wal",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para WAL: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "nosql": {
    "id": "nosql",
    "courseId": 71,
    "title": "NoSQL: familias de modelos y trade-offs",
    "shortTitle": "NoSQL",
    "duration": 120,
    "objective": "Clasificar sistemas NoSQL por modelo y garantías, evitando tratarlos como una única tecnología opuesta a SQL.",
    "summary": [
      "NoSQL agrupa familias heterogéneas —key-value, document, wide-column, graph y otras— con modelos de datos, consultas y garantías diferentes.",
      "No usar SQL no implica automáticamente falta de transacciones, ni escalabilidad infinita, ni ausencia de esquema; cada sistema debe evaluarse por su contrato real.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "NoSQL agrupa familias heterogéneas —key-value, document, wide-column, graph y otras— con modelos de datos, consultas y garantías diferentes.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Clasificar sistemas NoSQL por modelo y garantías, evitando tratarlos como una única tecnología opuesta a SQL.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "NoSQL agrupa familias heterogéneas —key-value, document, wide-column, graph y otras— con modelos de datos, consultas y garantías diferentes."
        },
        {
          "title": "Mecánica",
          "body": "No usar SQL no implica automáticamente falta de transacciones, ni escalabilidad infinita, ni ausencia de esquema; cada sistema debe evaluarse por su contrato real."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿“NoSQL” describe una única arquitectura y un único modelo de consistencia?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿“NoSQL” describe una única arquitectura y un único modelo de consistencia?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "NoSQL agrupa familias heterogéneas —key-value, document, wide-column, graph y otras— con modelos de datos, consultas y garantías diferentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿“NoSQL” describe una única arquitectura y un único modelo de consistencia?",
        "answer": "no",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de NoSQL.",
        "answer": "nosql",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para NoSQL: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "key-value-databases": {
    "id": "key-value-databases",
    "courseId": 71,
    "title": "Bases key-value: claves, valores y acceso directo",
    "shortTitle": "Key-value",
    "duration": 120,
    "objective": "Diseñar alrededor de claves y operaciones simples entendiendo cómo el patrón de acceso determina el modelado.",
    "summary": [
      "Una base key-value mapea claves a valores y suele optimizar operaciones de acceso por clave; estructuras adicionales y consultas dependen del sistema concreto.",
      "El diseño de la clave afecta distribución, locality, invalidación y escalado; intentar reconstruir joins relacionales ad hoc puede trasladar complejidad a la aplicación.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "Una base key-value mapea claves a valores y suele optimizar operaciones de acceso por clave; estructuras adicionales y consultas dependen del sistema concreto.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Diseñar alrededor de claves y operaciones simples entendiendo cómo el patrón de acceso determina el modelado.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una base key-value mapea claves a valores y suele optimizar operaciones de acceso por clave; estructuras adicionales y consultas dependen del sistema concreto."
        },
        {
          "title": "Mecánica",
          "body": "El diseño de la clave afecta distribución, locality, invalidación y escalado; intentar reconstruir joins relacionales ad hoc puede trasladar complejidad a la aplicación."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿En un modelo key-value la elección de la clave forma parte central del diseño de acceso?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "si"
    },
    "check": {
      "question": "¿En un modelo key-value la elección de la clave forma parte central del diseño de acceso?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Una base key-value mapea claves a valores y suele optimizar operaciones de acceso por clave; estructuras adicionales y consultas dependen del sistema concreto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿En un modelo key-value la elección de la clave forma parte central del diseño de acceso?",
        "answer": "si",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Key-value.",
        "answer": "clave",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Key-value: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "distributed-databases-db": {
    "id": "distributed-databases-db",
    "courseId": 71,
    "title": "Bases de datos distribuidas: particiones, réplicas y transacciones",
    "shortTitle": "BD distribuidas",
    "duration": 120,
    "objective": "Integrar almacenamiento con los conceptos del bloque distribuido: particionado, replicación, consenso y transacciones entre nodos.",
    "summary": [
      "Una base distribuida reparte y/o replica datos entre nodos; las garantías de lectura, escritura y transacción dependen de protocolos concretos.",
      "Sharding y replication resuelven problemas distintos; una transacción multi-shard introduce coordinación adicional y nuevos modos de fallo.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "Una base distribuida reparte y/o replica datos entre nodos; las garantías de lectura, escritura y transacción dependen de protocolos concretos.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Integrar almacenamiento con los conceptos del bloque distribuido: particionado, replicación, consenso y transacciones entre nodos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una base distribuida reparte y/o replica datos entre nodos; las garantías de lectura, escritura y transacción dependen de protocolos concretos."
        },
        {
          "title": "Mecánica",
          "body": "Sharding y replication resuelven problemas distintos; una transacción multi-shard introduce coordinación adicional y nuevos modos de fallo."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿Replicación y sharding son exactamente la misma técnica?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Replicación y sharding son exactamente la misma técnica?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Una base distribuida reparte y/o replica datos entre nodos; las garantías de lectura, escritura y transacción dependen de protocolos concretos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Replicación y sharding son exactamente la misma técnica?",
        "answer": "no",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de BD distribuidas.",
        "answer": "sharding",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para BD distribuidas: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "normalization-denormalization": {
    "id": "normalization-denormalization",
    "courseId": 71,
    "title": "Normalización y desnormalización guiadas por invariantes",
    "shortTitle": "Normalización",
    "duration": 120,
    "objective": "Usar dependencias y formas normales como herramientas para reducir anomalías, y desnormalizar solo con un coste de consistencia explícito.",
    "summary": [
      "Normalizar separa hechos para reducir redundancia y anomalías de actualización; desnormalizar puede mejorar ciertos accesos a costa de mantener copias coherentes.",
      "Una forma normal no decide por sí sola el esquema óptimo: patrones de acceso, constraints, volumen y coste de mantenimiento también importan.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "Normalizar separa hechos para reducir redundancia y anomalías de actualización; desnormalizar puede mejorar ciertos accesos a costa de mantener copias coherentes.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Usar dependencias y formas normales como herramientas para reducir anomalías, y desnormalizar solo con un coste de consistencia explícito.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Normalizar separa hechos para reducir redundancia y anomalías de actualización; desnormalizar puede mejorar ciertos accesos a costa de mantener copias coherentes."
        },
        {
          "title": "Mecánica",
          "body": "Una forma normal no decide por sí sola el esquema óptimo: patrones de acceso, constraints, volumen y coste de mantenimiento también importan."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿Desnormalizar elimina el problema de mantener consistentes los datos duplicados?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Desnormalizar elimina el problema de mantener consistentes los datos duplicados?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Normalizar separa hechos para reducir redundancia y anomalías de actualización; desnormalizar puede mejorar ciertos accesos a costa de mantener copias coherentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Desnormalizar elimina el problema de mantener consistentes los datos duplicados?",
        "answer": "no",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Normalización.",
        "answer": "normalizacion",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Normalización: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  },
  "database-integration-project": {
    "id": "database-integration-project",
    "courseId": 71,
    "title": "Proyecto: diseña, mide y rompe una base de datos",
    "shortTitle": "Proyecto de bases de datos",
    "duration": 120,
    "objective": "Integrar modelado, constraints, índices, aislamiento, MVCC, planner y recuperación en un laboratorio reproducible.",
    "summary": [
      "Un diseño de base de datos defendible conecta invariantes del dominio con esquema, transacciones, índices, planes y un protocolo de recuperación medible.",
      "El proyecto debe incluir cargas concurrentes, EXPLAIN/mediciones, fallos controlados y pruebas de constraints; una demo de CRUD no demuestra corrección ni rendimiento.",
      "La decisión correcta se justifica con invariantes, workload y evidencia del motor concreto, no con slogans."
    ],
    "concept": "Un diseño de base de datos defendible conecta invariantes del dominio con esquema, transacciones, índices, planes y un protocolo de recuperación medible.",
    "rules": [
      "Separa modelo lógico, ejecución física y garantías de concurrencia/durabilidad.",
      "Declara invariantes y workload antes de elegir esquema, índice o aislamiento.",
      "Mide planes, bloqueos, latencia y recuperación; una intuición sin evidencia puede fallar con datos reales."
    ],
    "deep": {
      "intro": "Integrar modelado, constraints, índices, aislamiento, MVCC, planner y recuperación en un laboratorio reproducible.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un diseño de base de datos defendible conecta invariantes del dominio con esquema, transacciones, índices, planes y un protocolo de recuperación medible."
        },
        {
          "title": "Mecánica",
          "body": "El proyecto debe incluir cargas concurrentes, EXPLAIN/mediciones, fallos controlados y pruebas de constraints; una demo de CRUD no demuestra corrección ni rendimiento."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita extrapolar una propiedad del lenguaje SQL a una garantía física del motor, o una técnica de almacenamiento a una garantía de concurrencia. Las garantías dependen del nivel de aislamiento, configuración, índices, estadísticas y protocolo de persistencia."
        },
        {
          "title": "Validación",
          "body": "Escribe el invariante, construye una carga mínima que pueda violarlo y observa plan, locks/versiones, commit y recuperación. Para rendimiento, conserva dataset, consulta, plan y métricas para poder reproducir el resultado."
        }
      ]
    },
    "example": {
      "problem": "¿Un CRUD funcional basta para demostrar que el diseño concurrente y de recuperación es correcto?",
      "steps": [
        "Identifica qué capa se está afirmando: modelo, consulta, almacenamiento, concurrencia o durabilidad.",
        "Busca un contraejemplo y decide qué evidencia del motor permitiría confirmar o refutar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un CRUD funcional basta para demostrar que el diseño concurrente y de recuperación es correcto?",
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
          "Depende, pero la afirmación anterior no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Un diseño de base de datos defendible conecta invariantes del dominio con esquema, transacciones, índices, planes y un protocolo de recuperación medible."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un CRUD funcional basta para demostrar que el diseño concurrente y de recuperación es correcto?",
        "answer": "no",
        "hint": "Distingue la abstracción lógica de la garantía concreta del motor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Proyecto de bases de datos.",
        "answer": "proyecto",
        "hint": "Nombra el mecanismo o propiedad, no una marca de base de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Proyecto de bases de datos: declara una invariante, una carga o concurrencia adversarial y qué métrica/observación usarías.",
        "answer": "invariante",
        "hint": "Incluye esquema/datos, operación, condición adversarial y observación."
      }
    ]
  }
});
