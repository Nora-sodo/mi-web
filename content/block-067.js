/**
 * BLOQUE 067 — INGENIERÍA DEL SOFTWARE
 *
 * Regla editorial: los nombres de patrones no sustituyen contratos, invariantes,
 * dependencias ni evidencia. El objetivo es reducir riesgo y coste de cambio.
 */
window.LEARNING_PATHS[67] = {
  "level": "Ingeniería del Software",
  "estimatedHours": 182,
  "description": "Diseño profesional de software: modularidad, contratos, arquitectura, evolución, refactoring, deuda técnica, review y documentación verificable.",
  "outcomes": [
    "Diseñar módulos y APIs que protejan invariantes y reduzcan el radio de cambio.",
    "Evaluar arquitectura mediante quality attributes, dependencias y trade-offs explícitos.",
    "Refactorizar y evolucionar sistemas con pruebas, compatibilidad y gestión consciente de deuda técnica.",
    "Revisar y documentar decisiones de ingeniería para mantener sistemas verificables y operables."
  ],
  "modules": [
    {
      "id": "m1-boundaries",
      "title": "Límites y contratos",
      "description": "Modularidad, abstracción, encapsulación y APIs",
      "lessons": [
        "se-modularity",
        "se-abstraction",
        "se-encapsulation",
        "se-api-contracts",
        "se-cohesion-coupling",
        "se-interface-design"
      ]
    },
    {
      "id": "m2-architecture",
      "title": "Arquitectura y evolución",
      "description": "Quality attributes, decisiones y refactoring",
      "lessons": [
        "se-architecture",
        "se-quality-attributes",
        "se-refactoring",
        "se-technical-debt"
      ]
    },
    {
      "id": "m3-collaboration",
      "title": "Colaboración y conocimiento",
      "description": "Review, documentación y dependencias",
      "lessons": [
        "se-code-review",
        "se-documentation",
        "se-dependency-evolution"
      ]
    },
    {
      "id": "m4-project",
      "title": "Integración profesional",
      "description": "Proyecto completo de evolución segura",
      "lessons": [
        "se-integration-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "se-modularity": {
    "id": "se-modularity",
    "courseId": 67,
    "title": "Modularidad y límites de cambio",
    "shortTitle": "Modularidad",
    "duration": 125,
    "objective": "Diseñar módulos con responsabilidades explícitas y límites de cambio que reduzcan el radio de impacto.",
    "summary": [
      "Un módulo útil agrupa decisiones que cambian juntas y expone un contrato menor que su implementación.",
      "La modularidad no se mide por número de archivos: dividir código sin reducir dependencias puede aumentar la complejidad.",
      "Los límites deben evaluarse por change coupling, ownership, testabilidad y capacidad de reemplazo."
    ],
    "concept": "Módulo ≠ archivo: un buen límite encapsula decisiones y minimiza dependencias observables.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Diseñar módulos con responsabilidades explícitas y límites de cambio que reduzcan el radio de impacto.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un módulo útil agrupa decisiones que cambian juntas y expone un contrato menor que su implementación."
        },
        {
          "title": "Mecánica y límites",
          "body": "La modularidad no se mide por número de archivos: dividir código sin reducir dependencias puede aumentar la complejidad."
        },
        {
          "title": "Ingeniería",
          "body": "Los límites deben evaluarse por change coupling, ownership, testabilidad y capacidad de reemplazo."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Un cambio toca 3 módulos de 12. Porcentaje de módulos afectados.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "25"
    },
    "check": {
      "question": "¿Crear muchos archivos pequeños garantiza modularidad?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Módulo ≠ archivo: un buen límite encapsula decisiones y minimiza dependencias observables."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un cambio toca 3 módulos de 12. Porcentaje de módulos afectados.",
        "answer": "25",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Crear muchos archivos pequeños garantiza modularidad?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-abstraction": {
    "id": "se-abstraction",
    "courseId": 67,
    "title": "Abstracción: contratos e información relevante",
    "shortTitle": "Abstracción",
    "duration": 125,
    "objective": "Construir abstracciones que oculten detalles irrelevantes sin ocultar restricciones que el consumidor necesita conocer.",
    "summary": [
      "Abstraer es elegir qué propiedades forman parte del contrato y cuáles quedan detrás del límite.",
      "Una abstracción con fugas no es automáticamente inútil; el problema es fingir que costes, fallos o semántica que importan no existen.",
      "El nivel correcto depende del consumidor: una API de archivos, una syscall y un controlador de bloque exponen contratos distintos."
    ],
    "concept": "Abstracción ≠ ocultar toda la realidad: debe esconder mecanismo sin mentir sobre semántica, coste o fallos relevantes.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Construir abstracciones que oculten detalles irrelevantes sin ocultar restricciones que el consumidor necesita conocer.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Abstraer es elegir qué propiedades forman parte del contrato y cuáles quedan detrás del límite."
        },
        {
          "title": "Mecánica y límites",
          "body": "Una abstracción con fugas no es automáticamente inútil; el problema es fingir que costes, fallos o semántica que importan no existen."
        },
        {
          "title": "Ingeniería",
          "body": "El nivel correcto depende del consumidor: una API de archivos, una syscall y un controlador de bloque exponen contratos distintos."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Una API reduce 18 detalles internos visibles a 5 operaciones contractuales. Detalles ocultos.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "13"
    },
    "check": {
      "question": "¿Una buena abstracción debe ocultar incluso costes y fallos que afectan al consumidor?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Abstracción ≠ ocultar toda la realidad: debe esconder mecanismo sin mentir sobre semántica, coste o fallos relevantes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una API reduce 18 detalles internos visibles a 5 operaciones contractuales. Detalles ocultos.",
        "answer": "13",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una buena abstracción debe ocultar incluso costes y fallos que afectan al consumidor?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-encapsulation": {
    "id": "se-encapsulation",
    "courseId": 67,
    "title": "Encapsulación e invariantes",
    "shortTitle": "Encapsulación",
    "duration": 125,
    "objective": "Usar encapsulación para proteger invariantes y controlar mutación, no solo para añadir getters y setters.",
    "summary": [
      "Encapsular significa controlar qué estados y transiciones pueden observar o provocar otros componentes.",
      "Un setter público para cada campo puede conservar exactamente el mismo acoplamiento que exponer los campos.",
      "Las invariantes deben mantenerse en todos los caminos de construcción, mutación, serialización y recuperación de errores."
    ],
    "concept": "Encapsulación ≠ campos privados: el objetivo es preservar invariantes mediante una frontera de mutación coherente.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Usar encapsulación para proteger invariantes y controlar mutación, no solo para añadir getters y setters.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Encapsular significa controlar qué estados y transiciones pueden observar o provocar otros componentes."
        },
        {
          "title": "Mecánica y límites",
          "body": "Un setter público para cada campo puede conservar exactamente el mismo acoplamiento que exponer los campos."
        },
        {
          "title": "Ingeniería",
          "body": "Las invariantes deben mantenerse en todos los caminos de construcción, mutación, serialización y recuperación de errores."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Un objeto admite 9 mutaciones públicas; se reemplazan 6 por 2 operaciones de dominio. Operaciones públicas finales.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "5"
    },
    "check": {
      "question": "¿Hacer todos los campos privados y añadir setters garantiza encapsulación de invariantes?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Encapsulación ≠ campos privados: el objetivo es preservar invariantes mediante una frontera de mutación coherente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un objeto admite 9 mutaciones públicas; se reemplazan 6 por 2 operaciones de dominio. Operaciones públicas finales.",
        "answer": "5",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Hacer todos los campos privados y añadir setters garantiza encapsulación de invariantes?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-api-contracts": {
    "id": "se-api-contracts",
    "courseId": 67,
    "title": "APIs y contratos observables",
    "shortTitle": "APIs",
    "duration": 130,
    "objective": "Diseñar APIs alrededor de precondiciones, postcondiciones, errores, compatibilidad y semántica observable.",
    "summary": [
      "Una API es un contrato para consumidores; la implementación puede cambiar mientras se preserve ese contrato.",
      "Firma de función no basta: errores, ordering, idempotencia, ownership, concurrencia y latencia pueden formar parte de la semántica observable.",
      "Versionar una API exige distinguir cambios compatibles de cambios que alteran comportamiento o supuestos del consumidor."
    ],
    "concept": "API ≠ firma: el contrato incluye toda conducta observable que el consumidor razonablemente depende de ella.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Diseñar APIs alrededor de precondiciones, postcondiciones, errores, compatibilidad y semántica observable.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una API es un contrato para consumidores; la implementación puede cambiar mientras se preserve ese contrato."
        },
        {
          "title": "Mecánica y límites",
          "body": "Firma de función no basta: errores, ordering, idempotencia, ownership, concurrencia y latencia pueden formar parte de la semántica observable."
        },
        {
          "title": "Ingeniería",
          "body": "Versionar una API exige distinguir cambios compatibles de cambios que alteran comportamiento o supuestos del consumidor."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Una API tiene 20 consumidores; un breaking change obliga a migrar 7. Porcentaje directamente afectado.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "35"
    },
    "check": {
      "question": "¿La firma de una función describe necesariamente todo el contrato observable de una API?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "API ≠ firma: el contrato incluye toda conducta observable que el consumidor razonablemente depende de ella."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una API tiene 20 consumidores; un breaking change obliga a migrar 7. Porcentaje directamente afectado.",
        "answer": "35",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La firma de una función describe necesariamente todo el contrato observable de una API?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-cohesion-coupling": {
    "id": "se-cohesion-coupling",
    "courseId": 67,
    "title": "Cohesión, acoplamiento y dependencias",
    "shortTitle": "Cohesión/acoplamiento",
    "duration": 130,
    "objective": "Evaluar diseño mediante cohesión interna, acoplamiento externo y dirección de dependencias.",
    "summary": [
      "Alta cohesión agrupa comportamiento y datos relacionados por una razón de cambio común.",
      "Bajo acoplamiento no significa cero dependencias: significa dependencias explícitas, estables y estrechas.",
      "Acoplamiento temporal, de datos, de control y de implementación pueden crear fragilidad aunque no exista un import directo evidente."
    ],
    "concept": "Bajo acoplamiento ≠ ausencia de dependencias: importa cuántas, cuáles, en qué dirección y qué detalles filtran.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Evaluar diseño mediante cohesión interna, acoplamiento externo y dirección de dependencias.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Alta cohesión agrupa comportamiento y datos relacionados por una razón de cambio común."
        },
        {
          "title": "Mecánica y límites",
          "body": "Bajo acoplamiento no significa cero dependencias: significa dependencias explícitas, estables y estrechas."
        },
        {
          "title": "Ingeniería",
          "body": "Acoplamiento temporal, de datos, de control y de implementación pueden crear fragilidad aunque no exista un import directo evidente."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Un módulo depende de 4 interfaces estables en vez de 11 detalles concretos. Dependencias eliminadas.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "7"
    },
    "check": {
      "question": "¿Bajo acoplamiento significa que un módulo no debe depender de nada?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Bajo acoplamiento ≠ ausencia de dependencias: importa cuántas, cuáles, en qué dirección y qué detalles filtran."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un módulo depende de 4 interfaces estables en vez de 11 detalles concretos. Dependencias eliminadas.",
        "answer": "7",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Bajo acoplamiento significa que un módulo no debe depender de nada?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-interface-design": {
    "id": "se-interface-design",
    "courseId": 67,
    "title": "Diseño de interfaces y ownership",
    "shortTitle": "Diseño de interfaces",
    "duration": 130,
    "objective": "Diseñar interfaces pequeñas que expresen ownership, lifetime, errores y capacidades sin forzar conocimiento interno.",
    "summary": [
      "Una buena interfaz hace difícil expresar estados inválidos y obliga a tratar los fallos relevantes.",
      "Ownership y lifetime forman parte del contrato cuando recursos, handles, buffers o callbacks sobreviven a una llamada.",
      "Interfaces demasiado genéricas suelen trasladar complejidad al consumidor mediante flags, estados implícitos y combinaciones inválidas."
    ],
    "concept": "Interfaz pequeña ≠ interfaz pobre: debe exponer toda la semántica necesaria y nada accidental.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Diseñar interfaces pequeñas que expresen ownership, lifetime, errores y capacidades sin forzar conocimiento interno.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una buena interfaz hace difícil expresar estados inválidos y obliga a tratar los fallos relevantes."
        },
        {
          "title": "Mecánica y límites",
          "body": "Ownership y lifetime forman parte del contrato cuando recursos, handles, buffers o callbacks sobreviven a una llamada."
        },
        {
          "title": "Ingeniería",
          "body": "Interfaces demasiado genéricas suelen trasladar complejidad al consumidor mediante flags, estados implícitos y combinaciones inválidas."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Una función acepta 5 flags booleanos independientes. Combinaciones posibles.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "32"
    },
    "check": {
      "question": "¿Cinco flags booleanos siempre producen una interfaz clara y difícil de usar mal?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Interfaz pequeña ≠ interfaz pobre: debe exponer toda la semántica necesaria y nada accidental."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una función acepta 5 flags booleanos independientes. Combinaciones posibles.",
        "answer": "32",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cinco flags booleanos siempre producen una interfaz clara y difícil de usar mal?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-architecture": {
    "id": "se-architecture",
    "courseId": 67,
    "title": "Arquitectura y decisiones irreversibles",
    "shortTitle": "Arquitectura",
    "duration": 135,
    "objective": "Razonar sobre arquitectura como conjunto de decisiones de alto impacto, dependencias y quality attributes.",
    "summary": [
      "Arquitectura no es un diagrama bonito: son decisiones que condicionan evolución, despliegue, rendimiento, seguridad y operación.",
      "Monolito, módulos, servicios o eventos son medios; la arquitectura debe responder a restricciones concretas.",
      "Las decisiones arquitectónicas tienen trade-offs y deben conservar contexto, alternativas y consecuencias."
    ],
    "concept": "Arquitectura ≠ patrón de moda: se justifica por requisitos, restricciones y costes de cambio.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Razonar sobre arquitectura como conjunto de decisiones de alto impacto, dependencias y quality attributes.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Arquitectura no es un diagrama bonito: son decisiones que condicionan evolución, despliegue, rendimiento, seguridad y operación."
        },
        {
          "title": "Mecánica y límites",
          "body": "Monolito, módulos, servicios o eventos son medios; la arquitectura debe responder a restricciones concretas."
        },
        {
          "title": "Ingeniería",
          "body": "Las decisiones arquitectónicas tienen trade-offs y deben conservar contexto, alternativas y consecuencias."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Una decisión arquitectónica afecta 4 quality attributes de 8 evaluadas. Porcentaje afectado.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "50"
    },
    "check": {
      "question": "¿Elegir microservicios por popularidad constituye por sí solo una justificación arquitectónica?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Arquitectura ≠ patrón de moda: se justifica por requisitos, restricciones y costes de cambio."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una decisión arquitectónica afecta 4 quality attributes de 8 evaluadas. Porcentaje afectado.",
        "answer": "50",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Elegir microservicios por popularidad constituye por sí solo una justificación arquitectónica?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-quality-attributes": {
    "id": "se-quality-attributes",
    "courseId": 67,
    "title": "Quality attributes y trade-offs",
    "shortTitle": "Trade-offs",
    "duration": 130,
    "objective": "Traducir objetivos vagos de arquitectura a atributos medibles y analizar trade-offs entre ellos.",
    "summary": [
      "Rendimiento, disponibilidad, seguridad, modificabilidad, testabilidad y coste pueden competir entre sí.",
      "Una mejora local debe evaluarse contra el sistema completo: caching puede reducir latencia y aumentar complejidad de consistencia.",
      "Los quality attributes útiles necesitan escenarios y métricas, no adjetivos como rápido, escalable o robusto sin umbral."
    ],
    "concept": "Trade-off ≠ fallo de diseño: ingeniería consiste en optimizar bajo restricciones explícitas.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Traducir objetivos vagos de arquitectura a atributos medibles y analizar trade-offs entre ellos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Rendimiento, disponibilidad, seguridad, modificabilidad, testabilidad y coste pueden competir entre sí."
        },
        {
          "title": "Mecánica y límites",
          "body": "Una mejora local debe evaluarse contra el sistema completo: caching puede reducir latencia y aumentar complejidad de consistencia."
        },
        {
          "title": "Ingeniería",
          "body": "Los quality attributes útiles necesitan escenarios y métricas, no adjetivos como rápido, escalable o robusto sin umbral."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Una SLO exige p95 < 200 ms; el servicio mide 260 ms. Exceso porcentual sobre el límite.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "30"
    },
    "check": {
      "question": "¿Mejorar una quality attribute puede empeorar otra?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Trade-off ≠ fallo de diseño: ingeniería consiste en optimizar bajo restricciones explícitas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una SLO exige p95 < 200 ms; el servicio mide 260 ms. Exceso porcentual sobre el límite.",
        "answer": "30",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Mejorar una quality attribute puede empeorar otra?",
        "answer": "si",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-refactoring": {
    "id": "se-refactoring",
    "courseId": 67,
    "title": "Refactoring seguro y comportamiento observable",
    "shortTitle": "Refactoring",
    "duration": 130,
    "objective": "Refactorizar estructura interna preservando comportamiento observable y usando pruebas como red de regresión.",
    "summary": [
      "Refactoring cambia la estructura del código sin cambiar intencionalmente su comportamiento externo.",
      "Una gran reescritura no es sinónimo de refactoring; mezclar cambios estructurales y funcionales aumenta el espacio de diagnóstico.",
      "Los pasos pequeños, tests y commits coherentes permiten aislar regresiones y revertir con menor coste."
    ],
    "concept": "Refactoring ≠ feature change: separar ambos reduce riesgo y hace el review más verificable.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Refactorizar estructura interna preservando comportamiento observable y usando pruebas como red de regresión.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Refactoring cambia la estructura del código sin cambiar intencionalmente su comportamiento externo."
        },
        {
          "title": "Mecánica y límites",
          "body": "Una gran reescritura no es sinónimo de refactoring; mezclar cambios estructurales y funcionales aumenta el espacio de diagnóstico."
        },
        {
          "title": "Ingeniería",
          "body": "Los pasos pequeños, tests y commits coherentes permiten aislar regresiones y revertir con menor coste."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Un refactor reduce cyclomatic hotspots de 15 a 9 en una función. Reducción porcentual.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "40"
    },
    "check": {
      "question": "¿Añadir una feature y cambiar comportamiento es refactoring puro?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Refactoring ≠ feature change: separar ambos reduce riesgo y hace el review más verificable."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un refactor reduce cyclomatic hotspots de 15 a 9 en una función. Reducción porcentual.",
        "answer": "40",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Añadir una feature y cambiar comportamiento es refactoring puro?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-technical-debt": {
    "id": "se-technical-debt",
    "courseId": 67,
    "title": "Deuda técnica y coste de cambio",
    "shortTitle": "Technical debt",
    "duration": 130,
    "objective": "Modelar deuda técnica como decisiones que abaratan el presente a cambio de costes o riesgos futuros cuantificables.",
    "summary": [
      "Deuda técnica no significa simplemente código feo: implica una elección o condición que aumenta el coste futuro de cambio, operación o corrección.",
      "Puede ser deliberada y racional si el beneficio inmediato supera el coste esperado y existe una estrategia de pago.",
      "Registrar principal, interés, riesgo y trigger de remediación permite priorizarla frente a trabajo de producto."
    ],
    "concept": "Deuda técnica ≠ pecado moral: es un pasivo de ingeniería que debe hacerse visible y gestionarse.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Modelar deuda técnica como decisiones que abaratan el presente a cambio de costes o riesgos futuros cuantificables.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Deuda técnica no significa simplemente código feo: implica una elección o condición que aumenta el coste futuro de cambio, operación o corrección."
        },
        {
          "title": "Mecánica y límites",
          "body": "Puede ser deliberada y racional si el beneficio inmediato supera el coste esperado y existe una estrategia de pago."
        },
        {
          "title": "Ingeniería",
          "body": "Registrar principal, interés, riesgo y trigger de remediación permite priorizarla frente a trabajo de producto."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Un atajo ahorra 12 h hoy y añade 1.5 h por cambio durante 10 cambios. Coste neto adicional frente a hacerlo bien ahora.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "3"
    },
    "check": {
      "question": "¿Toda deuda técnica es necesariamente irracional o accidental?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Deuda técnica ≠ pecado moral: es un pasivo de ingeniería que debe hacerse visible y gestionarse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un atajo ahorra 12 h hoy y añade 1.5 h por cambio durante 10 cambios. Coste neto adicional frente a hacerlo bien ahora.",
        "answer": "3",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Toda deuda técnica es necesariamente irracional o accidental?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-code-review": {
    "id": "se-code-review",
    "courseId": 67,
    "title": "Code review como verificación técnica",
    "shortTitle": "Code review",
    "duration": 130,
    "objective": "Realizar reviews que busquen defectos, riesgos de diseño y mantenibilidad sin sustituir pruebas automatizadas.",
    "summary": [
      "El review examina corrección, claridad, seguridad, testabilidad, compatibilidad y coherencia con el diseño.",
      "Nitpicks de estilo no deben ocultar problemas de invariantes, concurrencia, errores o contratos.",
      "Cambios pequeños y explicados reducen carga cognitiva y permiten revisar intención además de diffs."
    ],
    "concept": "Code review ≠ ejecutar mentalmente todo el programa: complementa tests, analizadores y observabilidad.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Realizar reviews que busquen defectos, riesgos de diseño y mantenibilidad sin sustituir pruebas automatizadas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El review examina corrección, claridad, seguridad, testabilidad, compatibilidad y coherencia con el diseño."
        },
        {
          "title": "Mecánica y límites",
          "body": "Nitpicks de estilo no deben ocultar problemas de invariantes, concurrencia, errores o contratos."
        },
        {
          "title": "Ingeniería",
          "body": "Cambios pequeños y explicados reducen carga cognitiva y permiten revisar intención además de diffs."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Un PR de 600 líneas se divide en 4 cambios iguales. Líneas medias por cambio.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "150"
    },
    "check": {
      "question": "¿Code review sustituye unit/integration tests?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Code review ≠ ejecutar mentalmente todo el programa: complementa tests, analizadores y observabilidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un PR de 600 líneas se divide en 4 cambios iguales. Líneas medias por cambio.",
        "answer": "150",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Code review sustituye unit/integration tests?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-documentation": {
    "id": "se-documentation",
    "courseId": 67,
    "title": "Documentación que conserva decisiones",
    "shortTitle": "Documentation",
    "duration": 125,
    "objective": "Escribir documentación que preserve contratos, decisiones y operaciones sin duplicar innecesariamente el código.",
    "summary": [
      "La documentación más valiosa explica por qué, contratos, invariantes, decisiones y procedimientos que no se deducen fácilmente del código.",
      "Comentarios que repiten una asignación envejecen mal; documentación cercana al contrato y validada por herramientas tiene menos deriva.",
      "READMEs, API docs, ADRs, runbooks y diagramas responden a públicos y horizontes temporales distintos."
    ],
    "concept": "Documentar ≠ narrar cada línea: documenta intención, contrato, restricciones y conocimiento que de otro modo se perdería.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Escribir documentación que preserve contratos, decisiones y operaciones sin duplicar innecesariamente el código.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La documentación más valiosa explica por qué, contratos, invariantes, decisiones y procedimientos que no se deducen fácilmente del código."
        },
        {
          "title": "Mecánica y límites",
          "body": "Comentarios que repiten una asignación envejecen mal; documentación cercana al contrato y validada por herramientas tiene menos deriva."
        },
        {
          "title": "Ingeniería",
          "body": "READMEs, API docs, ADRs, runbooks y diagramas responden a públicos y horizontes temporales distintos."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Un runbook tiene 12 pasos y se automatizan 5 manteniendo verificación. Pasos manuales restantes.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "7"
    },
    "check": {
      "question": "¿La mejor documentación repite línea por línea lo que hace el código?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Documentar ≠ narrar cada línea: documenta intención, contrato, restricciones y conocimiento que de otro modo se perdería."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un runbook tiene 12 pasos y se automatizan 5 manteniendo verificación. Pasos manuales restantes.",
        "answer": "7",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La mejor documentación repite línea por línea lo que hace el código?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-dependency-evolution": {
    "id": "se-dependency-evolution",
    "courseId": 67,
    "title": "Dependencias, compatibilidad y evolución",
    "shortTitle": "Evolución",
    "duration": 130,
    "objective": "Gestionar dependencias y cambios de contrato con versiones, adaptadores, migraciones y límites de compatibilidad.",
    "summary": [
      "Una dependencia introduce capacidad pero también superficie de actualización, fallos, seguridad y compatibilidad.",
      "Semantic Versioning puede comunicar intención de compatibilidad, pero no prueba que una biblioteca carezca de breaking changes accidentales.",
      "Adaptadores y anti-corruption layers pueden aislar detalles externos cuando su ritmo de cambio no debe contaminar el dominio interno."
    ],
    "concept": "Versión ≠ garantía: compatibilidad real se verifica con contrato, pruebas y estrategia de migración.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Gestionar dependencias y cambios de contrato con versiones, adaptadores, migraciones y límites de compatibilidad.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una dependencia introduce capacidad pero también superficie de actualización, fallos, seguridad y compatibilidad."
        },
        {
          "title": "Mecánica y límites",
          "body": "Semantic Versioning puede comunicar intención de compatibilidad, pero no prueba que una biblioteca carezca de breaking changes accidentales."
        },
        {
          "title": "Ingeniería",
          "body": "Adaptadores y anti-corruption layers pueden aislar detalles externos cuando su ritmo de cambio no debe contaminar el dominio interno."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "12 servicios dependen de una API; 9 migran a v2. Porcentaje migrado.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "75"
    },
    "check": {
      "question": "¿Semantic Versioning demuestra que una actualización será compatible en la práctica?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Versión ≠ garantía: compatibilidad real se verifica con contrato, pruebas y estrategia de migración."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "12 servicios dependen de una API; 9 migran a v2. Porcentaje migrado.",
        "answer": "75",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Semantic Versioning demuestra que una actualización será compatible en la práctica?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  },
  "se-integration-project": {
    "id": "se-integration-project",
    "courseId": 67,
    "title": "Proyecto: sistema evolutivo y verificable",
    "shortTitle": "Proyecto integrado",
    "duration": 150,
    "objective": "Aplicar modularidad, contratos, arquitectura, refactoring, review y documentación sobre un sistema real medible.",
    "summary": [
      "El proyecto parte de un sistema con dolor observable: cambios caros, dependencia cíclica, API ambigua, deuda o documentación insuficiente.",
      "Cada mejora debe formular una hipótesis, preservar comportamiento cuando corresponda y demostrar el efecto con tests, métricas o reducción del radio de cambio.",
      "La entrega incluye ADRs, contratos, mapa de dependencias, plan de migración, review checklist y evidencia antes/después."
    ],
    "concept": "Ingeniería del software ≠ acumular patrones: cada decisión debe reducir un riesgo o coste identificable del sistema.",
    "rules": [
      "Explicita el contrato y la razón de cambio antes de elegir una abstracción o patrón.",
      "Mide impacto, dependencias y comportamiento observable; no uses nombres de arquitectura como sustituto de evidencia.",
      "Separa decisiones reversibles de las costosas de cambiar y documenta supuestos, riesgos y estrategia de validación."
    ],
    "deep": {
      "intro": "Aplicar modularidad, contratos, arquitectura, refactoring, review y documentación sobre un sistema real medible.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El proyecto parte de un sistema con dolor observable: cambios caros, dependencia cíclica, API ambigua, deuda o documentación insuficiente."
        },
        {
          "title": "Mecánica y límites",
          "body": "Cada mejora debe formular una hipótesis, preservar comportamiento cuando corresponda y demostrar el efecto con tests, métricas o reducción del radio de cambio."
        },
        {
          "title": "Ingeniería",
          "body": "La entrega incluye ADRs, contratos, mapa de dependencias, plan de migración, review checklist y evidencia antes/después."
        },
        {
          "title": "Validación",
          "body": "Construye un ejemplo pequeño, enumera consumidores e invariantes, mide el radio de cambio y comprueba el contrato con tests o evidencia observable."
        }
      ]
    },
    "example": {
      "problem": "Antes un cambio típico toca 8 archivos; después de modularizar toca 3. Reducción porcentual.",
      "steps": [
        "Identifica la cantidad inicial y el cambio descrito.",
        "Calcula el resultado y explica qué decisión de ingeniería representa."
      ],
      "solution": "62.5"
    },
    "check": {
      "question": "¿Aplicar muchos patrones es por sí solo evidencia de mejor ingeniería?",
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
          "Solo si compila",
          false
        ]
      ],
      "feedback": "Ingeniería del software ≠ acumular patrones: cada decisión debe reducir un riesgo o coste identificable del sistema."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Antes un cambio típico toca 8 archivos; después de modularizar toca 3. Reducción porcentual.",
        "answer": "62.5",
        "hint": "Usa solo las cantidades dadas y conserva unidades/porcentajes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Aplicar muchos patrones es por sí solo evidencia de mejor ingeniería?",
        "answer": "no",
        "hint": "Razona sobre contrato, dependencias y comportamiento observable, no sobre el nombre del patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe justificarse esta decisión con una restricción, riesgo o métrica observable?",
        "answer": "si",
        "hint": "Una decisión de ingeniería necesita contexto y evidencia verificable."
      }
    ]
  }
});
