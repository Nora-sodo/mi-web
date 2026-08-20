/**
 * BLOQUE 069 — TESTING
 *
 * Regla editorial: una prueba aporta evidencia bajo un alcance, entorno y oráculo.
 * Ninguna técnica o métrica aislada se presenta como garantía de correctitud.
 */
window.LEARNING_PATHS[69] = {
  "level": "Testing",
  "estimatedHours": 180,
  "description": "Verificación de software desde unit/integration/system testing hasta property-based testing, fuzzing, regresiones, test doubles, CI y análisis estático/dinámico.",
  "outcomes": [
    "Diseñar una estrategia de pruebas por riesgo separando alcance, entorno, oráculo y coste de feedback.",
    "Usar property-based testing y fuzzing para explorar espacios de entrada más amplios sin confundir evidencia empírica con prueba formal.",
    "Elegir test doubles y mocks sin ocultar las integraciones que realmente necesitan validación.",
    "Combinar CI, análisis estático/dinámico, cobertura y métricas de calidad sin convertir ninguna señal en garantía de correctitud."
  ],
  "modules": [
    {
      "id": "m1-levels",
      "title": "Niveles de prueba",
      "description": "Unit, integration y system",
      "lessons": [
        "testing-unit",
        "testing-integration",
        "testing-system"
      ]
    },
    {
      "id": "m2-generative",
      "title": "Generación y regresión",
      "description": "Property-based, fuzzing y regresiones",
      "lessons": [
        "testing-property",
        "testing-fuzzing",
        "testing-regression"
      ]
    },
    {
      "id": "m3-doubles-ci",
      "title": "Aislamiento e integración continua",
      "description": "Test doubles, mocks y CI",
      "lessons": [
        "testing-test-doubles",
        "testing-mocks",
        "testing-ci"
      ]
    },
    {
      "id": "m4-analysis",
      "title": "Análisis y calidad",
      "description": "Static/dynamic analysis, oráculos y cobertura",
      "lessons": [
        "testing-static-analysis",
        "testing-dynamic-analysis",
        "testing-oracles",
        "testing-coverage-quality"
      ]
    },
    {
      "id": "m5-project",
      "title": "Integración",
      "description": "Estrategia completa por riesgo",
      "lessons": [
        "testing-integration-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "testing-unit": {
    "id": "testing-unit",
    "courseId": 69,
    "title": "Unit tests: contratos pequeños y feedback rápido",
    "shortTitle": "Unit tests",
    "duration": 120,
    "objective": "Diseñar pruebas unitarias que aíslen una unidad de comportamiento sin confundir aislamiento con ausencia total de dependencias.",
    "summary": [
      "Un unit test verifica una unidad de comportamiento con un alcance pequeño y un fallo que debería ser fácil de localizar.",
      "La unidad no tiene por qué coincidir con una función: puede ser una clase, módulo o componente pequeño según el diseño y el lenguaje.",
      "Velocidad, determinismo y diagnóstico importan más que perseguir una definición dogmática de unidad."
    ],
    "concept": "Unit test ≠ test de una sola función: la frontera útil es la que produce feedback rápido, determinista y localizable.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Diseñar pruebas unitarias que aíslen una unidad de comportamiento sin confundir aislamiento con ausencia total de dependencias.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un unit test verifica una unidad de comportamiento con un alcance pequeño y un fallo que debería ser fácil de localizar."
        },
        {
          "title": "Mecánica",
          "body": "La unidad no tiene por qué coincidir con una función: puede ser una clase, módulo o componente pequeño según el diseño y el lenguaje."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Velocidad, determinismo y diagnóstico importan más que perseguir una definición dogmática de unidad."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "Una suite tiene 240 unit tests y tarda 12 s. Tiempo medio por test en ms.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "50"
    },
    "check": {
      "question": "¿Un unit test debe probar obligatoriamente una única función?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "Unit test ≠ test de una sola función: la frontera útil es la que produce feedback rápido, determinista y localizable."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una suite tiene 240 unit tests y tarda 12 s. Tiempo medio por test en ms.",
        "answer": "50",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un unit test debe probar obligatoriamente una única función?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-integration": {
    "id": "testing-integration",
    "courseId": 69,
    "title": "Integration tests: verificar fronteras reales",
    "shortTitle": "Integration",
    "duration": 120,
    "objective": "Verificar que varias unidades o subsistemas cooperan correctamente a través de contratos reales.",
    "summary": [
      "Un integration test comprueba la interacción entre componentes que individualmente pueden estar bien probados.",
      "Las fronteras de mayor riesgo suelen ser persistencia, red, serialización, colas, procesos y APIs de terceros.",
      "Sustituir todas las dependencias por mocks puede eliminar precisamente la integración que se pretendía validar."
    ],
    "concept": "Integración ≠ muchos unit tests juntos: debe ejercitar una frontera real cuya compatibilidad pueda fallar.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Verificar que varias unidades o subsistemas cooperan correctamente a través de contratos reales.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un integration test comprueba la interacción entre componentes que individualmente pueden estar bien probados."
        },
        {
          "title": "Mecánica",
          "body": "Las fronteras de mayor riesgo suelen ser persistencia, red, serialización, colas, procesos y APIs de terceros."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Sustituir todas las dependencias por mocks puede eliminar precisamente la integración que se pretendía validar."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "20 integration tests tardan 80 s. Tiempo medio por test.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "4"
    },
    "check": {
      "question": "¿Mockear todas las dependencias demuestra que la integración real funciona?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "Integración ≠ muchos unit tests juntos: debe ejercitar una frontera real cuya compatibilidad pueda fallar."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "20 integration tests tardan 80 s. Tiempo medio por test.",
        "answer": "4",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Mockear todas las dependencias demuestra que la integración real funciona?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-system": {
    "id": "testing-system",
    "courseId": 69,
    "title": "System tests: el sistema como producto observable",
    "shortTitle": "System tests",
    "duration": 120,
    "objective": "Evaluar un sistema completo desde interfaces externas y requisitos observables.",
    "summary": [
      "Un system test ejecuta una configuración representativa del sistema completo y verifica comportamiento desde fuera.",
      "Puede cubrir flujos funcionales, errores, recuperación, configuración y propiedades no funcionales cuando el entorno lo permite.",
      "Los system/end-to-end tests suelen ser más lentos y frágiles que pruebas de menor alcance, por lo que deben reservarse para riesgos que realmente exigen el sistema completo."
    ],
    "concept": "System test ≠ prueba de cada detalle interno: valida comportamiento observable del sistema ensamblado.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Evaluar un sistema completo desde interfaces externas y requisitos observables.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un system test ejecuta una configuración representativa del sistema completo y verifica comportamiento desde fuera."
        },
        {
          "title": "Mecánica",
          "body": "Puede cubrir flujos funcionales, errores, recuperación, configuración y propiedades no funcionales cuando el entorno lo permite."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Los system/end-to-end tests suelen ser más lentos y frágiles que pruebas de menor alcance, por lo que deben reservarse para riesgos que realmente exigen el sistema completo."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "Una suite ejecuta 30 system tests de 8 s cada uno. Duración secuencial en minutos.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "4"
    },
    "check": {
      "question": "¿Conviene trasladar toda la cobertura a pruebas end-to-end?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "System test ≠ prueba de cada detalle interno: valida comportamiento observable del sistema ensamblado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una suite ejecuta 30 system tests de 8 s cada uno. Duración secuencial en minutos.",
        "answer": "4",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Conviene trasladar toda la cobertura a pruebas end-to-end?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-property": {
    "id": "testing-property",
    "courseId": 69,
    "title": "Property-based testing: buscar contra invariantes",
    "shortTitle": "Property-based",
    "duration": 120,
    "objective": "Expresar propiedades generales y generar muchos casos para intentar falsarlas, conservando contraejemplos mínimos y reproducibles.",
    "summary": [
      "Property-based testing describe un dominio de entradas y propiedades que deberían cumplirse para todas las muestras válidas generadas.",
      "Propiedades útiles incluyen round-trip, idempotencia, invariantes algebraicos, monotonía y relaciones metamórficas.",
      "Generar muchos ejemplos no prueba matemáticamente universalidad; aumenta capacidad de descubrir contraejemplos dentro de la estrategia y presupuesto usados."
    ],
    "concept": "Property-based testing ≠ prueba formal: automatiza búsqueda de contraejemplos sobre propiedades ejecutables.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Expresar propiedades generales y generar muchos casos para intentar falsarlas, conservando contraejemplos mínimos y reproducibles.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Property-based testing describe un dominio de entradas y propiedades que deberían cumplirse para todas las muestras válidas generadas."
        },
        {
          "title": "Mecánica",
          "body": "Propiedades útiles incluyen round-trip, idempotencia, invariantes algebraicos, monotonía y relaciones metamórficas."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Generar muchos ejemplos no prueba matemáticamente universalidad; aumenta capacidad de descubrir contraejemplos dentro de la estrategia y presupuesto usados."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "Se ejecutan 2 500 ejemplos en 5 s. Throughput en ejemplos/s.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "500"
    },
    "check": {
      "question": "¿Pasar 10 000 casos generados demuestra matemáticamente una propiedad universal?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "Property-based testing ≠ prueba formal: automatiza búsqueda de contraejemplos sobre propiedades ejecutables."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Se ejecutan 2 500 ejemplos en 5 s. Throughput en ejemplos/s.",
        "answer": "500",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Pasar 10 000 casos generados demuestra matemáticamente una propiedad universal?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-fuzzing": {
    "id": "testing-fuzzing",
    "courseId": 69,
    "title": "Fuzzing: explorar entradas y estados inesperados",
    "shortTitle": "Fuzzing",
    "duration": 120,
    "objective": "Construir fuzz targets que exploren entradas de alto riesgo con oráculos útiles, corpus y feedback de cobertura cuando proceda.",
    "summary": [
      "Un fuzzer genera o muta entradas para descubrir crashes, hangs, violaciones de invariantes u otros comportamientos anómalos.",
      "Los fuzzers coverage-guided usan feedback de ejecución para conservar entradas que alcanzan comportamiento nuevo y guiar futuras mutaciones.",
      "Fuzzing sin un oráculo apropiado puede no detectar corrupción lógica; ausencia de crashes no equivale a corrección ni seguridad."
    ],
    "concept": "Fuzzing ≠ lanzar bytes al azar: target, oráculo, corpus, instrumentación y minimización determinan su valor.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Construir fuzz targets que exploren entradas de alto riesgo con oráculos útiles, corpus y feedback de cobertura cuando proceda.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un fuzzer genera o muta entradas para descubrir crashes, hangs, violaciones de invariantes u otros comportamientos anómalos."
        },
        {
          "title": "Mecánica",
          "body": "Los fuzzers coverage-guided usan feedback de ejecución para conservar entradas que alcanzan comportamiento nuevo y guiar futuras mutaciones."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Fuzzing sin un oráculo apropiado puede no detectar corrupción lógica; ausencia de crashes no equivale a corrección ni seguridad."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "Un fuzzer ejecuta 3 600 000 casos en una hora. Ejecuciones por segundo.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "1000"
    },
    "check": {
      "question": "¿Que un fuzzer no encuentre crashes demuestra que el programa es correcto?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "Fuzzing ≠ lanzar bytes al azar: target, oráculo, corpus, instrumentación y minimización determinan su valor."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un fuzzer ejecuta 3 600 000 casos en una hora. Ejecuciones por segundo.",
        "answer": "1000",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Que un fuzzer no encuentre crashes demuestra que el programa es correcto?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-regression": {
    "id": "testing-regression",
    "courseId": 69,
    "title": "Regression tests: convertir bugs en memoria ejecutable",
    "shortTitle": "Regression",
    "duration": 120,
    "objective": "Capturar fallos corregidos como pruebas que impidan su reaparición y documenten el contrato que se violó.",
    "summary": [
      "Un regression test reproduce un bug o comportamiento importante y queda en la suite después de corregirlo.",
      "La prueba debe fallar antes del fix y pasar después; si nunca se observó esa transición, puede no estar protegiendo la causa real.",
      "Una suite de regresión sin poda puede acumular duplicación y coste; conservar valor requiere trazabilidad y mantenimiento."
    ],
    "concept": "Regression test ≠ test antiguo: es una barrera ejecutable contra la reaparición de un fallo o comportamiento roto.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Capturar fallos corregidos como pruebas que impidan su reaparición y documenten el contrato que se violó.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un regression test reproduce un bug o comportamiento importante y queda en la suite después de corregirlo."
        },
        {
          "title": "Mecánica",
          "body": "La prueba debe fallar antes del fix y pasar después; si nunca se observó esa transición, puede no estar protegiendo la causa real."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Una suite de regresión sin poda puede acumular duplicación y coste; conservar valor requiere trazabilidad y mantenimiento."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "De 75 bugs corregidos, 60 tienen regression test. Porcentaje cubierto.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "80"
    },
    "check": {
      "question": "¿Una buena prueba de regresión debería fallar con la versión que contiene el bug?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "Regression test ≠ test antiguo: es una barrera ejecutable contra la reaparición de un fallo o comportamiento roto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "De 75 bugs corregidos, 60 tienen regression test. Porcentaje cubierto.",
        "answer": "80",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una buena prueba de regresión debería fallar con la versión que contiene el bug?",
        "answer": "si",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-test-doubles": {
    "id": "testing-test-doubles",
    "courseId": 69,
    "title": "Test doubles: sustituir colaboradores con intención explícita",
    "shortTitle": "Test doubles",
    "duration": 120,
    "objective": "Elegir fakes, stubs, spies y mocks según el riesgo a aislar y evitando acoplar tests a detalles irrelevantes.",
    "summary": [
      "Test double es el término general para sustitutos usados en pruebas; distintas variantes ofrecen datos, comportamiento simplificado u observación de interacciones.",
      "Un fake suele implementar una versión funcional simplificada; un stub devuelve respuestas controladas; un spy registra uso; un mock suele incorporar expectativas de interacción.",
      "Los nombres varían entre frameworks, por lo que importa más el papel semántico que la etiqueta concreta."
    ],
    "concept": "Test double ≠ mock: mock es una posible categoría; el sustituto debe elegirse por el comportamiento que la prueba necesita controlar u observar.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Elegir fakes, stubs, spies y mocks según el riesgo a aislar y evitando acoplar tests a detalles irrelevantes.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Test double es el término general para sustitutos usados en pruebas; distintas variantes ofrecen datos, comportamiento simplificado u observación de interacciones."
        },
        {
          "title": "Mecánica",
          "body": "Un fake suele implementar una versión funcional simplificada; un stub devuelve respuestas controladas; un spy registra uso; un mock suele incorporar expectativas de interacción."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Los nombres varían entre frameworks, por lo que importa más el papel semántico que la etiqueta concreta."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "Una prueba sustituye 3 de 12 colaboradores. Porcentaje sustituido.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "25"
    },
    "check": {
      "question": "¿Todo test double es necesariamente un mock?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "Test double ≠ mock: mock es una posible categoría; el sustituto debe elegirse por el comportamiento que la prueba necesita controlar u observar."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una prueba sustituye 3 de 12 colaboradores. Porcentaje sustituido.",
        "answer": "25",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Todo test double es necesariamente un mock?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-mocks": {
    "id": "testing-mocks",
    "courseId": 69,
    "title": "Mocks: verificar protocolos sin congelar implementación",
    "shortTitle": "Mocks",
    "duration": 120,
    "objective": "Usar mocks para contratos de interacción relevantes sin convertir cada llamada interna en parte accidental de la especificación.",
    "summary": [
      "Un mock puede verificar que una colaboración observable ocurrió con argumentos o cardinalidad esperados.",
      "Es apropiado cuando la interacción forma parte del contrato, por ejemplo publicar un evento o efectuar una operación irreversible detrás de un puerto.",
      "Mockear detalles internos produce tests frágiles que fallan al refactorizar aunque el comportamiento externo siga correcto."
    ],
    "concept": "Mock ≠ simulación fiel del mundo real: su valor está en controlar/verificar una colaboración específica del test.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Usar mocks para contratos de interacción relevantes sin convertir cada llamada interna en parte accidental de la especificación.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un mock puede verificar que una colaboración observable ocurrió con argumentos o cardinalidad esperados."
        },
        {
          "title": "Mecánica",
          "body": "Es apropiado cuando la interacción forma parte del contrato, por ejemplo publicar un evento o efectuar una operación irreversible detrás de un puerto."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Mockear detalles internos produce tests frágiles que fallan al refactorizar aunque el comportamiento externo siga correcto."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "10 tests tienen 4 expectativas de mock cada uno. Total de expectativas.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "40"
    },
    "check": {
      "question": "¿Conviene mockear cada método interno para maximizar aislamiento?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "Mock ≠ simulación fiel del mundo real: su valor está en controlar/verificar una colaboración específica del test."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "10 tests tienen 4 expectativas de mock cada uno. Total de expectativas.",
        "answer": "40",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Conviene mockear cada método interno para maximizar aislamiento?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-ci": {
    "id": "testing-ci",
    "courseId": 69,
    "title": "CI: integrar cambios con evidencia automática",
    "shortTitle": "CI",
    "duration": 120,
    "objective": "Diseñar una pipeline de integración continua que produzca feedback reproducible y rápido sobre cada cambio.",
    "summary": [
      "Continuous Integration implica integrar cambios frecuentemente y validarlos automáticamente con build, tests y controles pertinentes.",
      "Una pipeline útil separa checks rápidos de gates más costosos, conserva artefactos/logs y hace visible por qué falló.",
      "CI no garantiza entrega ni despliegue continuo; tampoco compensa tests no deterministas o entornos irreproducibles."
    ],
    "concept": "CI ≠ servidor de builds: es una práctica de integración frecuente respaldada por validación automática y feedback accionable.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Diseñar una pipeline de integración continua que produzca feedback reproducible y rápido sobre cada cambio.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Continuous Integration implica integrar cambios frecuentemente y validarlos automáticamente con build, tests y controles pertinentes."
        },
        {
          "title": "Mecánica",
          "body": "Una pipeline útil separa checks rápidos de gates más costosos, conserva artefactos/logs y hace visible por qué falló."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "CI no garantiza entrega ni despliegue continuo; tampoco compensa tests no deterministas o entornos irreproducibles."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "Una pipeline tarda 18 min y se ejecutan 40 al día. Minutos de ejecución acumulados.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "720"
    },
    "check": {
      "question": "¿Tener una herramienta de CI significa automáticamente practicar continuous delivery?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "CI ≠ servidor de builds: es una práctica de integración frecuente respaldada por validación automática y feedback accionable."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una pipeline tarda 18 min y se ejecutan 40 al día. Minutos de ejecución acumulados.",
        "answer": "720",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Tener una herramienta de CI significa automáticamente practicar continuous delivery?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-static-analysis": {
    "id": "testing-static-analysis",
    "courseId": 69,
    "title": "Static analysis: inferir defectos sin ejecutar el programa",
    "shortTitle": "Static analysis",
    "duration": 120,
    "objective": "Entender qué propiedades puede inferir un analizador estático, sus modelos y el equilibrio entre falsos positivos y falsos negativos.",
    "summary": [
      "El análisis estático examina código o representaciones intermedias sin ejecutar el programa sobre entradas concretas.",
      "Puede abarcar type checking, dataflow, taint, abstract interpretation, reglas sintácticas y detección de patrones de bugs.",
      "Resultados dependen del modelo y aproximaciones; sonido, completitud, escalabilidad y precisión rara vez pueden maximizarse simultáneamente para propiedades no triviales."
    ],
    "concept": "Static analysis ≠ linting exclusivamente: puede razonar sobre flujos y estados, pero sus conclusiones están limitadas por su modelo.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Entender qué propiedades puede inferir un analizador estático, sus modelos y el equilibrio entre falsos positivos y falsos negativos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El análisis estático examina código o representaciones intermedias sin ejecutar el programa sobre entradas concretas."
        },
        {
          "title": "Mecánica",
          "body": "Puede abarcar type checking, dataflow, taint, abstract interpretation, reglas sintácticas y detección de patrones de bugs."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Resultados dependen del modelo y aproximaciones; sonido, completitud, escalabilidad y precisión rara vez pueden maximizarse simultáneamente para propiedades no triviales."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "Un analizador reporta 120 hallazgos; 30 son falsos positivos confirmados. Precisión porcentual si el resto son verdaderos.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "75"
    },
    "check": {
      "question": "¿Un análisis estático sin warnings demuestra ausencia de bugs?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "Static analysis ≠ linting exclusivamente: puede razonar sobre flujos y estados, pero sus conclusiones están limitadas por su modelo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un analizador reporta 120 hallazgos; 30 son falsos positivos confirmados. Precisión porcentual si el resto son verdaderos.",
        "answer": "75",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un análisis estático sin warnings demuestra ausencia de bugs?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-dynamic-analysis": {
    "id": "testing-dynamic-analysis",
    "courseId": 69,
    "title": "Dynamic analysis: observar ejecuciones instrumentadas",
    "shortTitle": "Dynamic analysis",
    "duration": 120,
    "objective": "Detectar errores mediante ejecución instrumentada y entender qué garantiza —y qué no— una corrida concreta.",
    "summary": [
      "El análisis dinámico observa el programa mientras ejecuta entradas concretas, a menudo con instrumentación de memoria, carreras, cobertura o rendimiento.",
      "Sanitizers pueden convertir ciertas clases de comportamiento erróneo en fallos diagnosticables con información de contexto.",
      "Solo se observa lo que se ejecuta: una ruta no cubierta puede contener defectos invisibles a esa campaña dinámica."
    ],
    "concept": "Dynamic analysis ≠ prueba exhaustiva: aumenta observabilidad de ejecuciones concretas, no cubre automáticamente estados no visitados.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Detectar errores mediante ejecución instrumentada y entender qué garantiza —y qué no— una corrida concreta.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El análisis dinámico observa el programa mientras ejecuta entradas concretas, a menudo con instrumentación de memoria, carreras, cobertura o rendimiento."
        },
        {
          "title": "Mecánica",
          "body": "Sanitizers pueden convertir ciertas clases de comportamiento erróneo en fallos diagnosticables con información de contexto."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Solo se observa lo que se ejecuta: una ruta no cubierta puede contener defectos invisibles a esa campaña dinámica."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "Una campaña cubre 72 000 de 90 000 branches instrumentadas. Cobertura porcentual.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "80"
    },
    "check": {
      "question": "¿Una ejecución limpia bajo AddressSanitizer garantiza que todas las rutas estén libres de errores de memoria?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "Dynamic analysis ≠ prueba exhaustiva: aumenta observabilidad de ejecuciones concretas, no cubre automáticamente estados no visitados."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una campaña cubre 72 000 de 90 000 branches instrumentadas. Cobertura porcentual.",
        "answer": "80",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una ejecución limpia bajo AddressSanitizer garantiza que todas las rutas estén libres de errores de memoria?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-oracles": {
    "id": "testing-oracles",
    "courseId": 69,
    "title": "Oráculos de prueba: decidir qué significa correcto",
    "shortTitle": "Oráculos",
    "duration": 120,
    "objective": "Diseñar oráculos capaces de distinguir resultados aceptables de fallos sin depender circularmente de la misma implementación.",
    "summary": [
      "El oráculo es el mecanismo que decide si una ejecución satisface la propiedad esperada.",
      "Puede ser un valor esperado, una referencia independiente, un invariante, una propiedad metamórfica o una comprobación diferencial entre implementaciones.",
      "Un test puede ejecutar mucho código y aun ser débil si sus assertions no observan el defecto relevante."
    ],
    "concept": "Cobertura de ejecución ≠ calidad del oráculo: recorrer una línea no significa comprobar que produjo el resultado correcto.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Diseñar oráculos capaces de distinguir resultados aceptables de fallos sin depender circularmente de la misma implementación.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El oráculo es el mecanismo que decide si una ejecución satisface la propiedad esperada."
        },
        {
          "title": "Mecánica",
          "body": "Puede ser un valor esperado, una referencia independiente, un invariante, una propiedad metamórfica o una comprobación diferencial entre implementaciones."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Un test puede ejecutar mucho código y aun ser débil si sus assertions no observan el defecto relevante."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "Un test ejecuta 900 líneas pero verifica 3 invariantes. Número de líneas por invariante, como razón descriptiva.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "300"
    },
    "check": {
      "question": "¿Un test sin assertions útiles puede aportar alta cobertura y aun detectar pocos fallos?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "Cobertura de ejecución ≠ calidad del oráculo: recorrer una línea no significa comprobar que produjo el resultado correcto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un test ejecuta 900 líneas pero verifica 3 invariantes. Número de líneas por invariante, como razón descriptiva.",
        "answer": "300",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un test sin assertions útiles puede aportar alta cobertura y aun detectar pocos fallos?",
        "answer": "si",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-coverage-quality": {
    "id": "testing-coverage-quality",
    "courseId": 69,
    "title": "Cobertura, mutación y calidad de suite",
    "shortTitle": "Calidad de suite",
    "duration": 120,
    "objective": "Interpretar cobertura como señal de ejecución y complementarla con análisis de defectos, mutation testing y coste de mantenimiento.",
    "summary": [
      "Statement/branch coverage informa qué partes fueron ejecutadas, no si sus resultados fueron validados correctamente.",
      "Mutation testing introduce cambios artificiales y mide si la suite los detecta; mutantes equivalentes y coste computacional complican la interpretación.",
      "Una suite fuerte combina alcance adecuado, oráculos útiles, baja flakiness, diagnóstico rápido y relación coste/riesgo razonable."
    ],
    "concept": "100% coverage ≠ 100% correctitud: cobertura mide ejecución, no fuerza del oráculo ni completitud del espacio de estados.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Interpretar cobertura como señal de ejecución y complementarla con análisis de defectos, mutation testing y coste de mantenimiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Statement/branch coverage informa qué partes fueron ejecutadas, no si sus resultados fueron validados correctamente."
        },
        {
          "title": "Mecánica",
          "body": "Mutation testing introduce cambios artificiales y mide si la suite los detecta; mutantes equivalentes y coste computacional complican la interpretación."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Una suite fuerte combina alcance adecuado, oráculos útiles, baja flakiness, diagnóstico rápido y relación coste/riesgo razonable."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "Una suite mata 180 de 240 mutantes no equivalentes. Mutation score porcentual.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "75"
    },
    "check": {
      "question": "¿Alcanzar 100% statement coverage demuestra correctitud?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "100% coverage ≠ 100% correctitud: cobertura mide ejecución, no fuerza del oráculo ni completitud del espacio de estados."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una suite mata 180 de 240 mutantes no equivalentes. Mutation score porcentual.",
        "answer": "75",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Alcanzar 100% statement coverage demuestra correctitud?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  },
  "testing-integration-project": {
    "id": "testing-integration-project",
    "courseId": 69,
    "title": "Proyecto: estrategia de testing por riesgo",
    "shortTitle": "Proyecto Testing",
    "duration": 120,
    "objective": "Diseñar y medir una estrategia completa de pruebas para un sistema del curso, justificando cada nivel por riesgo y coste.",
    "summary": [
      "Una estrategia madura asigna técnicas a riesgos: unit para lógica local, integration para fronteras, system para journeys críticos, property/fuzz para espacios amplios y static/dynamic analysis para clases específicas.",
      "La pirámide de tests es una heurística, no una proporción universal; arquitectura, dominio y coste de fallos cambian la mezcla óptima.",
      "La entrega debe incluir matriz riesgo→prueba, tiempos, flakiness, cobertura relevante, defectos encontrados y criterios de retirada/mantenimiento."
    ],
    "concept": "Estrategia de testing ≠ maximizar cantidad de tests: optimiza evidencia útil por unidad de tiempo, riesgo y coste de mantenimiento.",
    "rules": [
      "Define primero riesgo, frontera y oráculo; después elige técnica y nivel de prueba.",
      "Haz fallos reproducibles y diagnosticables: controla fuentes de no determinismo, registra contexto y minimiza casos cuando sea posible.",
      "Trata cobertura, mutation score y número de tests como señales parciales; ninguna métrica aislada demuestra correctitud."
    ],
    "deep": {
      "intro": "Diseñar y medir una estrategia completa de pruebas para un sistema del curso, justificando cada nivel por riesgo y coste.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una estrategia madura asigna técnicas a riesgos: unit para lógica local, integration para fronteras, system para journeys críticos, property/fuzz para espacios amplios y static/dynamic analysis para clases específicas."
        },
        {
          "title": "Mecánica",
          "body": "La pirámide de tests es una heurística, no una proporción universal; arquitectura, dominio y coste de fallos cambian la mezcla óptima."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "La entrega debe incluir matriz riesgo→prueba, tiempos, flakiness, cobertura relevante, defectos encontrados y criterios de retirada/mantenimiento."
        },
        {
          "title": "Validación",
          "body": "Diseña un caso mínimo, predice qué fallo debería detectar, ejecútalo de forma reproducible y comprueba que el test falla ante una mutación o implementación defectuosa relevante antes de aceptar que aporta evidencia."
        }
      ]
    },
    "example": {
      "problem": "Una pipeline reduce de 30 a 18 min. Reducción porcentual.",
      "steps": [
        "Identifica numerador, denominador y unidad de la métrica solicitada.",
        "Calcula el resultado y explica qué informa la métrica y qué no garantiza."
      ],
      "solution": "40"
    },
    "check": {
      "question": "¿Existe una proporción universal de unit/integration/system tests válida para todo sistema?",
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
          "Siempre depende del framework",
          false
        ]
      ],
      "feedback": "Estrategia de testing ≠ maximizar cantidad de tests: optimiza evidencia útil por unidad de tiempo, riesgo y coste de mantenimiento."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una pipeline reduce de 30 a 18 min. Reducción porcentual.",
        "answer": "40",
        "hint": "Calcula solo con los datos dados y conserva la unidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Existe una proporción universal de unit/integration/system tests válida para todo sistema?",
        "answer": "no",
        "hint": "Distingue evidencia observada de garantía universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede esta técnica producir una suite verde y aun dejar defectos fuera de su alcance?",
        "answer": "si",
        "hint": "Razona sobre espacio de estados, oráculo, entorno y rutas no ejercitadas."
      }
    ]
  }
});
