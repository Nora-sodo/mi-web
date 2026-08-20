/**
 * BLOQUE 058 — TEORÍA DE LA COMPUTACIÓN
 *
 * Regla editorial: separar poder computacional, decidibilidad y complejidad;
 * una reducción solo demuestra lo que permite su dirección y su tipo.
 */
window.LEARNING_PATHS[58] = {
  "level": "Experto teórico-práctico",
  "estimatedHours": 132,
  "description": "Teoría de la computación desde autómatas finitos y máquinas de Turing hasta decidibilidad, reducciones y P/NP.",
  "outcomes": [
    "Modelar reconocedores con autómatas finitos y máquinas de Turing distinguiendo lenguaje, ejecución y poder computacional.",
    "Demostrar decidibilidad o indecidibilidad mediante algoritmos, recognizers y reducciones con dirección correcta.",
    "Interpretar P, NP, NP-hard y NP-complete sin confundir verificación, resolución, dificultad práctica e indecidibilidad.",
    "Construir argumentos formales que indiquen modelo, tipo de reducción, hipótesis y exactamente qué conclusión queda demostrada."
  ],
  "modules": [
    {
      "id": "m1-automata",
      "title": "Autómatas y modelos",
      "description": "Regulares, máquinas de Turing y computabilidad",
      "lessons": [
        "toc-finite-automata",
        "toc-regular-languages",
        "toc-turing-machines",
        "toc-computability"
      ]
    },
    {
      "id": "m2-decidability",
      "title": "Decidibilidad y reducciones",
      "description": "Halting, recognizers y pruebas por reducción",
      "lessons": [
        "toc-decidability",
        "toc-halting-problem",
        "toc-reductions",
        "toc-reduction-proofs"
      ]
    },
    {
      "id": "m3-complexity",
      "title": "Complejidad clásica",
      "description": "Clases, P, NP y NP-completeness",
      "lessons": [
        "toc-complexity-classes",
        "toc-p",
        "toc-np",
        "toc-np-completeness"
      ]
    },
    {
      "id": "m4-limits",
      "title": "Dureza e integración",
      "description": "NP-hard, intratabilidad y proyecto de síntesis",
      "lessons": [
        "toc-intractability",
        "toc-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "toc-finite-automata": {
    "id": "toc-finite-automata",
    "courseId": 58,
    "title": "Autómatas finitos: estado, transición y aceptación",
    "shortTitle": "Autómatas finitos",
    "duration": 90,
    "objective": "Modelar computación con un conjunto finito de estados y distinguir DFA, NFA, lenguaje reconocido y ejecución.",
    "summary": [
      "Un autómata finito consume símbolos y actualiza un estado de un conjunto finito; acepta si termina en un estado de aceptación.",
      "DFA y NFA reconocen exactamente los lenguajes regulares, aunque la representación NFA puede ser mucho más compacta.",
      "El lenguaje reconocido es un conjunto de cadenas; no es la lista de estados ni una única ejecución."
    ],
    "concept": "Un autómata finito consume símbolos y actualiza un estado de un conjunto finito; acepta si termina en un estado de aceptación.",
    "rules": [
      "DFA y NFA reconocen exactamente los lenguajes regulares, aunque la representación NFA puede ser mucho más compacta.",
      "El lenguaje reconocido es un conjunto de cadenas; no es la lista de estados ni una única ejecución.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Modelar computación con un conjunto finito de estados y distinguir DFA, NFA, lenguaje reconocido y ejecución.",
      "sections": [
        {
          "title": "Modelo",
          "body": "Un DFA se especifica mediante estados Q, alfabeto Σ, función de transición δ, estado inicial q0 y conjunto de aceptación F."
        },
        {
          "title": "NFA",
          "body": "Un NFA puede tener cero, una o varias transiciones posibles por símbolo y transiciones ε; acepta si existe al menos una trayectoria aceptante."
        },
        {
          "title": "Equivalencia expresiva",
          "body": "Subset construction convierte un NFA en un DFA equivalente; el número de estados puede crecer exponencialmente."
        },
        {
          "title": "Límite",
          "body": "Los autómatas finitos no disponen de memoria no acotada; patrones que requieren recordar cantidades arbitrarias pueden no ser regulares."
        }
      ]
    },
    "example": {
      "problem": "Un DFA tiene 12 estados y 5 son de aceptación. ¿Cuántos estados no aceptantes?",
      "steps": [
        "12-5 = 7."
      ],
      "solution": "7"
    },
    "check": {
      "question": "¿DFA y NFA reconocen clases distintas de lenguajes?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí, NFA reconoce más",
          false
        ],
        [
          "Solo si hay ε",
          false
        ]
      ],
      "feedback": "Un autómata finito consume símbolos y actualiza un estado de un conjunto finito; acepta si termina en un estado de aceptación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un NFA acepta si existe una trayectoria aceptante? sí/no",
        "answer": "si",
        "hint": "La aceptación es existencial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "DFA con 20 estados, 8 finales. No finales.",
        "answer": "12",
        "hint": "20-8."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Subset construction puede crecer exponencialmente? sí/no",
        "answer": "si",
        "hint": "Puede llegar a 2^n estados."
      }
    ]
  },
  "toc-regular-languages": {
    "id": "toc-regular-languages",
    "courseId": 58,
    "title": "Lenguajes regulares: equivalencias, cierre y minimización",
    "shortTitle": "Lenguajes regulares",
    "duration": 90,
    "objective": "Relacionar DFA/NFA/regex, usar propiedades de cierre y comprender qué significa minimizar un autómata.",
    "summary": [
      "Regex clásicas, DFA y NFA describen exactamente los lenguajes regulares.",
      "Las propiedades de cierre permiten construir reconocedores para unión, intersección, complemento y otras operaciones sin rederivar desde cero.",
      "Minimizar un DFA preserva el lenguaje y fusiona estados indistinguibles; no cambia la especificación del lenguaje."
    ],
    "concept": "Regex clásicas, DFA y NFA describen exactamente los lenguajes regulares.",
    "rules": [
      "Las propiedades de cierre permiten construir reconocedores para unión, intersección, complemento y otras operaciones sin rederivar desde cero.",
      "Minimizar un DFA preserva el lenguaje y fusiona estados indistinguibles; no cambia la especificación del lenguaje.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Relacionar DFA/NFA/regex, usar propiedades de cierre y comprender qué significa minimizar un autómata.",
      "sections": [
        {
          "title": "Tres vistas",
          "body": "Una regex describe sintaxis algebraica, un NFA permite nondeterminismo representacional y un DFA ofrece una transición determinada por símbolo."
        },
        {
          "title": "Cierre",
          "body": "Los regulares son cerrados bajo unión, intersección, complemento, concatenación y estrella, entre otras operaciones."
        },
        {
          "title": "Minimización",
          "body": "Estados equivalentes respecto a todos los sufijos futuros pueden fusionarse; el DFA mínimo es único salvo renombrado de estados."
        },
        {
          "title": "No-regularidad",
          "body": "Pumping lemma/Myhill–Nerode pueden demostrar que ciertos lenguajes no son regulares; fallar en encontrar una regex no es prueba."
        }
      ]
    },
    "example": {
      "problem": "Un DFA de 9 estados se minimiza a 6. ¿Cuántos estados se eliminaron por fusión?",
      "steps": [
        "9-6 = 3."
      ],
      "solution": "3"
    },
    "check": {
      "question": "¿Minimizar un DFA cambia el lenguaje reconocido?",
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
          "Solo con regex",
          false
        ]
      ],
      "feedback": "Regex clásicas, DFA y NFA describen exactamente los lenguajes regulares."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Regex, DFA y NFA caracterizan los regulares? sí/no",
        "answer": "si",
        "hint": "Son equivalentes en poder expresivo clásico."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "DFA 15→10 estados. Estados eliminados.",
        "answer": "5",
        "hint": "15-10."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cumplir una condición de pumping prueba regularidad? sí/no",
        "answer": "no",
        "hint": "El lema se usa principalmente para refutar regularidad."
      }
    ]
  },
  "toc-turing-machines": {
    "id": "toc-turing-machines",
    "courseId": 58,
    "title": "Máquinas de Turing: memoria no acotada y modelos equivalentes",
    "shortTitle": "Máquinas de Turing",
    "duration": 90,
    "objective": "Entender la máquina de Turing como modelo matemático de algoritmo y distinguir reconocer, decidir y ejecutar eficientemente.",
    "summary": [
      "Una máquina de Turing idealiza control finito más una cinta no acotada accesible mediante lectura/escritura y movimiento del cabezal.",
      "Variantes razonables como varias cintas cambian eficiencia, no la clase de funciones computables bajo equivalencias estándar.",
      "Poder computar algo no implica hacerlo eficientemente."
    ],
    "concept": "Una máquina de Turing idealiza control finito más una cinta no acotada accesible mediante lectura/escritura y movimiento del cabezal.",
    "rules": [
      "Variantes razonables como varias cintas cambian eficiencia, no la clase de funciones computables bajo equivalencias estándar.",
      "Poder computar algo no implica hacerlo eficientemente.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Entender la máquina de Turing como modelo matemático de algoritmo y distinguir reconocer, decidir y ejecutar eficientemente.",
      "sections": [
        {
          "title": "Configuración",
          "body": "El comportamiento depende del estado de control, contenido de cinta y posición del cabezal."
        },
        {
          "title": "Aceptación",
          "body": "Una máquina puede aceptar, rechazar o no detenerse; por eso reconocer y decidir son nociones distintas."
        },
        {
          "title": "Robustez",
          "body": "Muchos modelos razonables de computación universal son equivalentes en computabilidad, aunque difieran en coste."
        },
        {
          "title": "Abstracción",
          "body": "La máquina de Turing no pretende ser una CPU real; sirve para razonar sobre límites de algoritmos."
        }
      ]
    },
    "example": {
      "problem": "Una MT realiza 400 transiciones y después otras 125. Total de transiciones.",
      "steps": [
        "400+125 = 525."
      ],
      "solution": "525"
    },
    "check": {
      "question": "¿Ser computable implica ser eficiente?",
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
          "Solo en una cinta",
          false
        ]
      ],
      "feedback": "Una máquina de Turing idealiza control finito más una cinta no acotada accesible mediante lectura/escritura y movimiento del cabezal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una MT que reconoce un lenguaje debe detenerse en toda entrada? sí/no",
        "answer": "no",
        "hint": "Un recognizer puede divergir en entradas no pertenecientes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "400+125 transiciones. Total.",
        "answer": "525",
        "hint": "Suma."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Varias cintas aumentan la clase computable estándar? sí/no",
        "answer": "no",
        "hint": "Cambian eficiencia, no computabilidad."
      }
    ]
  },
  "toc-computability": {
    "id": "toc-computability",
    "courseId": 58,
    "title": "Computabilidad: qué significa que exista un algoritmo",
    "shortTitle": "Computabilidad",
    "duration": 90,
    "objective": "Definir funciones/lenguajes computables y separar existencia de algoritmo, recursos y propiedades de una implementación concreta.",
    "summary": [
      "Computabilidad pregunta si existe un procedimiento efectivo que produzca la respuesta bajo un modelo universal razonable.",
      "Una función parcial puede estar definida solo para algunas entradas; una función total produce resultado para todas las entradas de su dominio.",
      "La tesis de Church–Turing relaciona la noción informal de procedimiento efectivo con modelos formales equivalentes; no es un teorema sobre la velocidad del hardware."
    ],
    "concept": "Computabilidad pregunta si existe un procedimiento efectivo que produzca la respuesta bajo un modelo universal razonable.",
    "rules": [
      "Una función parcial puede estar definida solo para algunas entradas; una función total produce resultado para todas las entradas de su dominio.",
      "La tesis de Church–Turing relaciona la noción informal de procedimiento efectivo con modelos formales equivalentes; no es un teorema sobre la velocidad del hardware.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Definir funciones/lenguajes computables y separar existencia de algoritmo, recursos y propiedades de una implementación concreta.",
      "sections": [
        {
          "title": "Funciones y lenguajes",
          "body": "Problemas de decisión pueden verse como lenguajes; funciones generales devuelven valores más ricos que sí/no."
        },
        {
          "title": "Totalidad",
          "body": "Que un programa termine en tus tests no demuestra que compute una función total."
        },
        {
          "title": "Universalidad",
          "body": "Una máquina universal puede simular descripciones de otras máquinas y sus entradas."
        },
        {
          "title": "Recursos",
          "body": "Computable no significa práctico: tiempo o espacio pueden crecer de manera prohibitiva."
        }
      ]
    },
    "example": {
      "problem": "Un procedimiento termina para 999 de 1000 tests. ¿Cuántos tests no prueban terminación?",
      "steps": [
        "1000-999 = 1."
      ],
      "solution": "1"
    },
    "check": {
      "question": "¿Computable significa polinómico?",
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
          "Siempre si termina",
          false
        ]
      ],
      "feedback": "Computabilidad pregunta si existe un procedimiento efectivo que produzca la respuesta bajo un modelo universal razonable."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una función total termina para toda entrada válida? sí/no",
        "answer": "si",
        "hint": "Totalidad exige resultado en todo el dominio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "1000 tests, 999 terminan. No terminan en el conjunto observado.",
        "answer": "1",
        "hint": "1000-999."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Church–Turing es una cota de rendimiento de CPU? sí/no",
        "answer": "no",
        "hint": "Trata poder computacional efectivo, no velocidad."
      }
    ]
  },
  "toc-decidability": {
    "id": "toc-decidability",
    "courseId": 58,
    "title": "Decidibilidad: decidir no es solo reconocer",
    "shortTitle": "Decidibilidad",
    "duration": 90,
    "objective": "Distinguir lenguajes decidibles, reconocibles y problemas para los que ningún decider puede existir.",
    "summary": [
      "Un lenguaje es decidible si existe una máquina que se detiene en toda entrada y responde correctamente sí/no.",
      "Reconocible es más débil: en miembros debe aceptar, pero en no miembros puede rechazar o no detenerse.",
      "Indecidible no significa “muy lento”; significa que no existe un algoritmo total correcto para todas las instancias bajo el modelo."
    ],
    "concept": "Un lenguaje es decidible si existe una máquina que se detiene en toda entrada y responde correctamente sí/no.",
    "rules": [
      "Reconocible es más débil: en miembros debe aceptar, pero en no miembros puede rechazar o no detenerse.",
      "Indecidible no significa “muy lento”; significa que no existe un algoritmo total correcto para todas las instancias bajo el modelo.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Distinguir lenguajes decidibles, reconocibles y problemas para los que ningún decider puede existir.",
      "sections": [
        {
          "title": "Decider",
          "body": "Termina tanto en casos sí como no."
        },
        {
          "title": "Recognizer",
          "body": "Debe aceptar miembros; puede divergir fuera del lenguaje."
        },
        {
          "title": "Complemento",
          "body": "Si un lenguaje y su complemento son ambos reconocibles, el lenguaje es decidible mediante dovetailing."
        },
        {
          "title": "Error conceptual",
          "body": "Un timeout práctico no convierte un problema decidible en indecidible y una gran complejidad no prueba indecidibilidad."
        }
      ]
    },
    "example": {
      "problem": "Un decider se prueba con 70 casos sí y 30 casos no. ¿Cuántos casos debe terminar?",
      "steps": [
        "70+30 = 100."
      ],
      "solution": "100"
    },
    "check": {
      "question": "¿Un problema indecidible es simplemente uno que necesita tiempo exponencial?",
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
          "Solo en NP",
          false
        ]
      ],
      "feedback": "Un lenguaje es decidible si existe una máquina que se detiene en toda entrada y responde correctamente sí/no."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un decider debe detenerse también en entradas no? sí/no",
        "answer": "si",
        "hint": "Decidir exige terminación total."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "70 casos sí +30 no. Total.",
        "answer": "100",
        "hint": "Suma."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Reconocible implica siempre decidible? sí/no",
        "answer": "no",
        "hint": "Existe una diferencia estricta."
      }
    ]
  },
  "toc-halting-problem": {
    "id": "toc-halting-problem",
    "courseId": 58,
    "title": "Halting problem: diagonalización y autorreferencia",
    "shortTitle": "Halting problem",
    "duration": 90,
    "objective": "Comprender por qué no existe un algoritmo general que decida si cualquier programa se detendrá sobre cualquier entrada.",
    "summary": [
      "El halting problem pregunta, dada una descripción de programa/máquina M y entrada w, si M se detendrá sobre w.",
      "La prueba clásica asume un decider universal de halting y construye una máquina que contradice su respuesta cuando se aplica a su propia descripción.",
      "La indecidibilidad es una afirmación sobre todos los algoritmos posibles, no sobre que los analizadores estáticos sean inútiles."
    ],
    "concept": "El halting problem pregunta, dada una descripción de programa/máquina M y entrada w, si M se detendrá sobre w.",
    "rules": [
      "La prueba clásica asume un decider universal de halting y construye una máquina que contradice su respuesta cuando se aplica a su propia descripción.",
      "La indecidibilidad es una afirmación sobre todos los algoritmos posibles, no sobre que los analizadores estáticos sean inútiles.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Comprender por qué no existe un algoritmo general que decida si cualquier programa se detendrá sobre cualquier entrada.",
      "sections": [
        {
          "title": "Suposición",
          "body": "Imagina HALT(M,w) correcto y total."
        },
        {
          "title": "Diagonalización",
          "body": "Construye D(x) que hace lo contrario de la predicción de HALT(x,x): si predice parada, D diverge; si predice divergencia, D termina."
        },
        {
          "title": "Contradicción",
          "body": "Ejecutar D(D) hace imposible que HALT responda correctamente en ambos casos."
        },
        {
          "title": "Consecuencia práctica",
          "body": "Herramientas pueden decidir subconjuntos, usar aproximaciones conservadoras o requerir anotaciones; lo imposible es la solución total universal."
        }
      ]
    },
    "example": {
      "problem": "Un analizador decide correctamente 9999 casos de 10000. Casos restantes sin garantía en esa prueba.",
      "steps": [
        "10000-9999 = 1."
      ],
      "solution": "1"
    },
    "check": {
      "question": "¿La indecidibilidad de halting implica que ningún analizador pueda probar terminación de programas concretos?",
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
          "Solo los compiladores",
          false
        ]
      ],
      "feedback": "El halting problem pregunta, dada una descripción de programa/máquina M y entrada w, si M se detendrá sobre w."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Existe un decider universal correcto de halting para todo programa y entrada? sí/no",
        "answer": "no",
        "hint": "Ese es el resultado de indecidibilidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "10000 casos, 9999 resueltos. Restantes.",
        "answer": "1",
        "hint": "Resta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La prueba usa autorreferencia/diagonalización? sí/no",
        "answer": "si",
        "hint": "La contradicción aparece al aplicar el constructor a sí mismo."
      }
    ]
  },
  "toc-reductions": {
    "id": "toc-reductions",
    "courseId": 58,
    "title": "Reducciones: transportar dificultad entre problemas",
    "shortTitle": "Reducciones",
    "duration": 90,
    "objective": "Usar reducciones para demostrar decidibilidad, indecidibilidad o dureza sin invertir accidentalmente la dirección lógica.",
    "summary": [
      "Una reducción transforma instancias de A en instancias de B preservando la respuesta relevante.",
      "Para demostrar que B es al menos tan difícil como A, se reduce A a B, no B a A.",
      "La noción concreta de reducción importa: computable, many-one, polynomial-time, Turing, etc."
    ],
    "concept": "Una reducción transforma instancias de A en instancias de B preservando la respuesta relevante.",
    "rules": [
      "Para demostrar que B es al menos tan difícil como A, se reduce A a B, no B a A.",
      "La noción concreta de reducción importa: computable, many-one, polynomial-time, Turing, etc.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Usar reducciones para demostrar decidibilidad, indecidibilidad o dureza sin invertir accidentalmente la dirección lógica.",
      "sections": [
        {
          "title": "Dirección",
          "body": "A ≤ B significa que resolver B permite resolver A mediante la transformación especificada."
        },
        {
          "title": "Indecidibilidad",
          "body": "Si A es indecidible y A ≤m B mediante reducción computable, entonces B no puede ser decidible."
        },
        {
          "title": "Complejidad",
          "body": "Para NP-hardness se usan típicamente reducciones de tiempo polinómico desde un problema ya NP-hard/NP-complete."
        },
        {
          "title": "No equivalencia",
          "body": "Que A reduzca a B no implica automáticamente que B reduzca a A."
        }
      ]
    },
    "example": {
      "problem": "Una transformación tarda n^2 y luego el solver de B tarda n^3 sobre tamaño comparable. Exponente dominante simple.",
      "steps": [
        "max(2,3)=3."
      ],
      "solution": "3"
    },
    "check": {
      "question": "Para demostrar que B es difícil usando A conocido como difícil, ¿se reduce A a B?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No, B a A",
          false
        ],
        [
          "La dirección no importa",
          false
        ]
      ],
      "feedback": "Una reducción transforma instancias de A en instancias de B preservando la respuesta relevante."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿A≤B significa que B puede usarse para resolver A? sí/no",
        "answer": "si",
        "hint": "Esa es la intuición de la reducción."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dominante entre n² y n³. Exponente.",
        "answer": "3",
        "hint": "max(2,3)."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿A≤B implica siempre B≤A? sí/no",
        "answer": "no",
        "hint": "La reducción no es simétrica por defecto."
      }
    ]
  },
  "toc-reduction-proofs": {
    "id": "toc-reduction-proofs",
    "courseId": 58,
    "title": "Cómo construir una reducción: corrección en ambos sentidos",
    "shortTitle": "Pruebas por reducción",
    "duration": 90,
    "objective": "Diseñar reducciones con una transformación eficiente y demostrar la equivalencia sí↔sí necesaria, evitando “parece parecido”.",
    "summary": [
      "Una reducción correcta necesita una función de transformación bien definida y una prueba de preservación de respuestas.",
      "En una many-one reduction de decisiones, normalmente debes demostrar x∈A si y solo si f(x)∈B.",
      "Una transformación que solo funciona en ejemplos positivos no basta."
    ],
    "concept": "Una reducción correcta necesita una función de transformación bien definida y una prueba de preservación de respuestas.",
    "rules": [
      "En una many-one reduction de decisiones, normalmente debes demostrar x∈A si y solo si f(x)∈B.",
      "Una transformación que solo funciona en ejemplos positivos no basta.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Diseñar reducciones con una transformación eficiente y demostrar la equivalencia sí↔sí necesaria, evitando “parece parecido”.",
      "sections": [
        {
          "title": "Construcción",
          "body": "Define cómo mapear cualquier instancia válida x de A a f(x) de B."
        },
        {
          "title": "Forward",
          "body": "Prueba x∈A ⇒ f(x)∈B."
        },
        {
          "title": "Backward",
          "body": "Prueba f(x)∈B ⇒ x∈A."
        },
        {
          "title": "Coste",
          "body": "Para reducciones polinómicas, demuestra además que f se calcula en tiempo polinómico y que su tamaño no explota superpolinómicamente."
        }
      ]
    },
    "example": {
      "problem": "Una reducción genera una instancia de tamaño 4n+7. Para n=100, tamaño.",
      "steps": [
        "4·100+7 = 407."
      ],
      "solution": "407"
    },
    "check": {
      "question": "¿Probar solo la implicación A-sí ⇒ B-sí suele bastar para una reducción many-one de decisión?",
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
          "Solo si n es grande",
          false
        ]
      ],
      "feedback": "Una reducción correcta necesita una función de transformación bien definida y una prueba de preservación de respuestas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una prueba many-one típica necesita equivalencia de respuestas? sí/no",
        "answer": "si",
        "hint": "Se demuestra iff."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "4n+7 para n=100.",
        "answer": "407",
        "hint": "400+7."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La transformación polinómica puede producir salida exponencial y seguir siendo polinómica? sí/no",
        "answer": "no",
        "hint": "Escribir salida exponencial ya cuesta tiempo exponencial."
      }
    ]
  },
  "toc-complexity-classes": {
    "id": "toc-complexity-classes",
    "courseId": 58,
    "title": "Clases de complejidad: recursos, modelos y promesas",
    "shortTitle": "Clases de complejidad",
    "duration": 90,
    "objective": "Entender una clase de complejidad como conjunto de problemas definidos por límites de recursos y un modelo computacional.",
    "summary": [
      "Una clase de complejidad agrupa problemas según recursos como tiempo, espacio, aleatoriedad o nondeterminismo.",
      "Las inclusiones entre clases son afirmaciones sobre problemas completos, no sobre un programa concreto.",
      "La codificación de la entrada y el tamaño n forman parte del análisis."
    ],
    "concept": "Una clase de complejidad agrupa problemas según recursos como tiempo, espacio, aleatoriedad o nondeterminismo.",
    "rules": [
      "Las inclusiones entre clases son afirmaciones sobre problemas completos, no sobre un programa concreto.",
      "La codificación de la entrada y el tamaño n forman parte del análisis.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Entender una clase de complejidad como conjunto de problemas definidos por límites de recursos y un modelo computacional.",
      "sections": [
        {
          "title": "Definición",
          "body": "P y NP se formulan usualmente para problemas de decisión y tiempo polinómico bajo modelos razonables."
        },
        {
          "title": "Robustez",
          "body": "Cambios polinómicamente equivalentes de modelo/codificación suelen preservar estas clases, pero una codificación compacta vs unary puede cambiar qué significa n."
        },
        {
          "title": "Jerarquías",
          "body": "TIME(f(n)) y SPACE(f(n)) muestran explícitamente el recurso limitado."
        },
        {
          "title": "Decisión vs optimización",
          "body": "Un problema de optimización puede relacionarse con una variante de decisión, pero no son literalmente el mismo objeto formal."
        }
      ]
    },
    "example": {
      "problem": "Un algoritmo O(n^4) con n=10 realiza en el modelo 10^4 unidades. Valor.",
      "steps": [
        "10000."
      ],
      "solution": "10000"
    },
    "check": {
      "question": "¿Una clase de complejidad describe un único algoritmo?",
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
          "Solo P",
          false
        ]
      ],
      "feedback": "Una clase de complejidad agrupa problemas según recursos como tiempo, espacio, aleatoriedad o nondeterminismo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿P y NP suelen definirse sobre problemas de decisión? sí/no",
        "answer": "si",
        "hint": "Es la formulación estándar."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "10^4.",
        "answer": "10000",
        "hint": "Potencia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La codificación de entrada puede afectar el tamaño n? sí/no",
        "answer": "si",
        "hint": "El análisis depende de la representación."
      }
    ]
  },
  "toc-p": {
    "id": "toc-p",
    "courseId": 58,
    "title": "P: decisión eficiente bajo tiempo polinómico",
    "shortTitle": "Clase P",
    "duration": 90,
    "objective": "Comprender P como problemas de decisión resolubles determinísticamente en tiempo polinómico y evitar equiparar polinómico con rápido en toda práctica.",
    "summary": [
      "P contiene problemas de decisión con algoritmos determinísticos de tiempo polinómico.",
      "Polinómico es una frontera teórica robusta, no una garantía de que n^100 sea práctico.",
      "P está contenido en NP porque una solución puede ignorar el certificado y ejecutar el algoritmo polinómico."
    ],
    "concept": "P contiene problemas de decisión con algoritmos determinísticos de tiempo polinómico.",
    "rules": [
      "Polinómico es una frontera teórica robusta, no una garantía de que n^100 sea práctico.",
      "P está contenido en NP porque una solución puede ignorar el certificado y ejecutar el algoritmo polinómico.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Comprender P como problemas de decisión resolubles determinísticamente en tiempo polinómico y evitar equiparar polinómico con rápido en toda práctica.",
      "sections": [
        {
          "title": "Tiempo polinómico",
          "body": "Existe k constante tal que el tiempo está acotado por O(n^k) bajo el modelo."
        },
        {
          "title": "Práctica",
          "body": "Grado, constantes, locality y tamaño real siguen importando."
        },
        {
          "title": "Inclusión",
          "body": "P⊆NP es conocida; la cuestión abierta es si P=NP."
        },
        {
          "title": "No confundir",
          "body": "Un problema con algoritmo exponencial conocido no queda demostrado fuera de P solo porque no conozcamos uno mejor."
        }
      ]
    },
    "example": {
      "problem": "n^3 para n=20. Unidades del modelo.",
      "steps": [
        "20^3 = 8000."
      ],
      "solution": "8000"
    },
    "check": {
      "question": "¿P significa “instantáneo en la práctica”?",
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
          "Siempre menos de un segundo",
          false
        ]
      ],
      "feedback": "P contiene problemas de decisión con algoritmos determinísticos de tiempo polinómico."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿P⊆NP? sí/no",
        "answer": "si",
        "hint": "Un decider polinómico también verifica trivialmente."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "20^3.",
        "answer": "8000",
        "hint": "20·20·20."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿No conocer algoritmo polinómico prueba que el problema no está en P? sí/no",
        "answer": "no",
        "hint": "Ausencia de algoritmo conocido no es prueba de imposibilidad."
      }
    ]
  },
  "toc-np": {
    "id": "toc-np",
    "courseId": 58,
    "title": "NP: certificados verificables y nondeterminismo",
    "shortTitle": "Clase NP",
    "duration": 90,
    "objective": "Definir NP mediante verificación polinómica/certificados y distinguirlo de “no polinómico” o “problemas difíciles”.",
    "summary": [
      "NP contiene problemas de decisión cuyas instancias sí tienen certificados verificables en tiempo polinómico; equivalentemente, decidibles por una MT nondeterminista en tiempo polinómico.",
      "NP no significa “non-polynomial”.",
      "Un problema puede pertenecer a NP y también a P."
    ],
    "concept": "NP contiene problemas de decisión cuyas instancias sí tienen certificados verificables en tiempo polinómico; equivalentemente, decidibles por una MT nondeterminista en tiempo polinómico.",
    "rules": [
      "NP no significa “non-polynomial”.",
      "Un problema puede pertenecer a NP y también a P.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Definir NP mediante verificación polinómica/certificados y distinguirlo de “no polinómico” o “problemas difíciles”.",
      "sections": [
        {
          "title": "Certificado",
          "body": "Para una instancia x, un witness y de longitud polinómica permite a un verifier comprobar una respuesta sí en tiempo polinómico."
        },
        {
          "title": "Asimetría",
          "body": "La definición se centra en certificados de instancias sí; coNP estudia la clase complementaria relacionada."
        },
        {
          "title": "Inclusión",
          "body": "P⊆NP; no sabemos si la inclusión es estricta."
        },
        {
          "title": "Ejemplo conceptual",
          "body": "SAT tiene como certificado una asignación; verificar que satisface la fórmula es eficiente."
        }
      ]
    },
    "example": {
      "problem": "Certificado con 250 variables, 1 bit por variable. Bits del certificado.",
      "steps": [
        "250."
      ],
      "solution": "250"
    },
    "check": {
      "question": "¿NP significa “problemas que no tienen algoritmo polinómico”?",
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
          "Por definición",
          false
        ]
      ],
      "feedback": "NP contiene problemas de decisión cuyas instancias sí tienen certificados verificables en tiempo polinómico; equivalentemente, decidibles por una MT nondeterminista en tiempo polinómico."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Todo problema en P está también en NP? sí/no",
        "answer": "si",
        "hint": "P⊆NP."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "250 variables booleanas, un bit cada una. Bits.",
        "answer": "250",
        "hint": "1 por variable."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿NP significa non-polynomial? sí/no",
        "answer": "no",
        "hint": "Significa nondeterministic polynomial time."
      }
    ]
  },
  "toc-np-completeness": {
    "id": "toc-np-completeness",
    "courseId": 58,
    "title": "NP-completeness: pertenencia + dureza",
    "shortTitle": "NP-completeness",
    "duration": 90,
    "objective": "Comprender qué hace NP-complete a un problema y cómo una solución polinómica para uno colapsaría P y NP.",
    "summary": [
      "Un problema es NP-complete si está en NP y es NP-hard bajo la reducción elegida, normalmente many-one polinómica.",
      "Para demostrar NP-completeness necesitas probar tanto pertenencia a NP como NP-hardness.",
      "Si cualquier problema NP-complete tuviera un algoritmo polinómico, entonces P=NP."
    ],
    "concept": "Un problema es NP-complete si está en NP y es NP-hard bajo la reducción elegida, normalmente many-one polinómica.",
    "rules": [
      "Para demostrar NP-completeness necesitas probar tanto pertenencia a NP como NP-hardness.",
      "Si cualquier problema NP-complete tuviera un algoritmo polinómico, entonces P=NP.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Comprender qué hace NP-complete a un problema y cómo una solución polinómica para uno colapsaría P y NP.",
      "sections": [
        {
          "title": "Pertenencia",
          "body": "Exhibe un certificado polinómico y un verifier polinómico."
        },
        {
          "title": "Dureza",
          "body": "Reduce un problema NP-complete conocido A al candidato B en dirección A≤pB."
        },
        {
          "title": "Cook–Levin",
          "body": "SAT fue el primer problema demostrado NP-complete y sirve de base histórica para muchas cadenas de reducciones."
        },
        {
          "title": "No confundir",
          "body": "NP-complete es una propiedad de problemas, no de instancias individuales."
        }
      ]
    },
    "example": {
      "problem": "Una reducción transforma una instancia de tamaño n=50 en tamaño n^2. Tamaño resultante.",
      "steps": [
        "50^2 = 2500."
      ],
      "solution": "2500"
    },
    "check": {
      "question": "¿NP-hard basta por sí solo para concluir NP-complete?",
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
          "Siempre si es difícil",
          false
        ]
      ],
      "feedback": "Un problema es NP-complete si está en NP y es NP-hard bajo la reducción elegida, normalmente many-one polinómica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿NP-complete = NP-hard y además en NP? sí/no",
        "answer": "si",
        "hint": "Se necesitan ambas condiciones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "50^2.",
        "answer": "2500",
        "hint": "2500."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un algoritmo polinómico para un NP-complete implicaría P=NP? sí/no",
        "answer": "si",
        "hint": "Todos los problemas de NP reducen a él."
      }
    ]
  },
  "toc-intractability": {
    "id": "toc-intractability",
    "courseId": 58,
    "title": "NP-hard, intratabilidad y límites de la clasificación",
    "shortTitle": "Problemas intratables",
    "duration": 90,
    "objective": "Distinguir NP-hard, NP-complete, exponential-time, parameterized/approximation y problemas indecidibles sin meterlos en el mismo saco.",
    "summary": [
      "NP-hard significa ser al menos tan difícil como todo problema de NP bajo la reducción elegida; un problema NP-hard no tiene por qué pertenecer a NP ni siquiera ser decidible.",
      "No sabemos demostrar en general que los NP-complete requieran tiempo exponencial: eso sería más fuerte que P≠NP y permanece abierto.",
      "“Intratable” es un término práctico/contextual; estructura de instancias, parámetros, aproximación y heurísticas pueden hacer útil un problema difícil."
    ],
    "concept": "NP-hard significa ser al menos tan difícil como todo problema de NP bajo la reducción elegida; un problema NP-hard no tiene por qué pertenecer a NP ni siquiera ser decidible.",
    "rules": [
      "No sabemos demostrar en general que los NP-complete requieran tiempo exponencial: eso sería más fuerte que P≠NP y permanece abierto.",
      "“Intratable” es un término práctico/contextual; estructura de instancias, parámetros, aproximación y heurísticas pueden hacer útil un problema difícil.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Distinguir NP-hard, NP-complete, exponential-time, parameterized/approximation y problemas indecidibles sin meterlos en el mismo saco.",
      "sections": [
        {
          "title": "NP-hard vs NP-complete",
          "body": "NP-complete requiere además ser un problema de decisión en NP; NP-hard es una condición de dureza."
        },
        {
          "title": "Exponencial",
          "body": "Un algoritmo 2^n no prueba que ningún algoritmo polinómico exista."
        },
        {
          "title": "Estrategias",
          "body": "Parameterized algorithms, approximation, branch-and-bound, SAT/ILP solvers y heurísticas explotan estructura real."
        },
        {
          "title": "Indecidibilidad",
          "body": "Indecidible está fuera de la discusión de “cuánto tarda un decider” porque no existe decider total."
        }
      ]
    },
    "example": {
      "problem": "Un algoritmo 2^n con n=20 explora hasta cuántos subconjuntos.",
      "steps": [
        "2^20 = 1048576."
      ],
      "solution": "1048576"
    },
    "check": {
      "question": "¿Todo problema NP-hard pertenece necesariamente a NP?",
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
          "Solo si es exponencial",
          false
        ]
      ],
      "feedback": "NP-hard significa ser al menos tan difícil como todo problema de NP bajo la reducción elegida; un problema NP-hard no tiene por qué pertenecer a NP ni siquiera ser decidible."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿NP-hard implica NP-complete? sí/no",
        "answer": "no",
        "hint": "Falta pertenencia a NP."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "2^20.",
        "answer": "1048576",
        "hint": "Potencia de dos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Indecidible significa “exponencialmente lento”? sí/no",
        "answer": "no",
        "hint": "No existe decider total."
      }
    ]
  },
  "toc-integration": {
    "id": "toc-integration",
    "courseId": 58,
    "title": "Proyecto: mapa de límites, reducciones y complejidad",
    "shortTitle": "Proyecto de teoría",
    "duration": 90,
    "objective": "Integrar autómatas, decidibilidad, reducciones y complejidad en un dossier que clasifique problemas con pruebas explícitas.",
    "summary": [
      "Clasificar un problema exige declarar el modelo y justificar cada afirmación mediante construcción, algoritmo o reducción.",
      "Una cadena de reducciones debe conservar dirección y tipo de reducción.",
      "El proyecto debe separar con claridad regularidad, computabilidad, decidibilidad y complejidad."
    ],
    "concept": "Clasificar un problema exige declarar el modelo y justificar cada afirmación mediante construcción, algoritmo o reducción.",
    "rules": [
      "Una cadena de reducciones debe conservar dirección y tipo de reducción.",
      "El proyecto debe separar con claridad regularidad, computabilidad, decidibilidad y complejidad.",
      "Declara siempre el modelo, la dirección de reducción o el recurso cuando la conclusión dependa de ello."
    ],
    "deep": {
      "intro": "Integrar autómatas, decidibilidad, reducciones y complejidad en un dossier que clasifique problemas con pruebas explícitas.",
      "sections": [
        {
          "title": "Parte A",
          "body": "Construye/minimiza un DFA para una especificación regular y demuestra su comportamiento sobre casos frontera."
        },
        {
          "title": "Parte B",
          "body": "Escoge un problema indecidible y documenta una reducción desde Halting/Acceptance con ambas direcciones de corrección."
        },
        {
          "title": "Parte C",
          "body": "Escoge un problema NP-complete y presenta verifier, reducción de dureza y límites de lo que la clasificación demuestra."
        },
        {
          "title": "Parte D",
          "body": "Añade una matriz: decidible/reconocible, clase conocida, algoritmo práctico, heurística/approximation y evidencia."
        }
      ]
    },
    "example": {
      "problem": "Un dossier contiene 4 problemas regulares, 3 indecidibles y 5 NP-complete. Total de casos estudiados.",
      "steps": [
        "4+3+5 = 12."
      ],
      "solution": "12"
    },
    "check": {
      "question": "¿Una tabla que solo etiqueta “difícil” sin pruebas basta para clasificar formalmente?",
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
          "Si el problema es famoso",
          false
        ]
      ],
      "feedback": "Clasificar un problema exige declarar el modelo y justificar cada afirmación mediante construcción, algoritmo o reducción."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una reducción debe indicar dirección y tipo? sí/no",
        "answer": "si",
        "hint": "Ambas determinan qué concluyes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "4+3+5 casos.",
        "answer": "12",
        "hint": "Suma."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Indecidibilidad y NP-completeness son la misma barrera? sí/no",
        "answer": "no",
        "hint": "Una niega decider total; la otra clasifica decidibles verificables bajo tiempo."
      }
    ]
  }
});
