/**
 * BLOQUE 028 — Matemáticas discretas
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: definir antes de calcular y distinguir estructura, prueba y
 * representación. Un dibujo puede sugerir una propiedad; la demostración debe
 * establecerla bajo las definiciones y supuestos declarados.
 */
window.LEARNING_PATHS[28] = {
  "level": "Experto progresivo",
  "estimatedHours": 78,
  "description": "Fundamentos matemáticos rigurosos para computación: lógica y prueba, estructuras discretas, conteo, recurrencias, grafos, árboles, autómatas y lenguajes formales.",
  "outcomes": [
    "Formalizar afirmaciones con lógica proposicional y de predicados y construir pruebas correctas, incluida inducción.",
    "Razonar con conjuntos, relaciones, funciones y técnicas de conteo sin confundir estructura, cardinalidad y orden.",
    "Modelar problemas computacionales con recurrencias, grafos y árboles y derivar propiedades mediante invariantes y teoremas.",
    "Relacionar autómatas y lenguajes formales, distinguiendo reconocimiento, generación y límites de cada formalismo."
  ],
  "modules": [
    {
      "id": "m1-foundations",
      "title": "Lógica y estructuras fundamentales",
      "description": "Prueba, conjuntos, relaciones y funciones",
      "lessons": [
        "dm-logic",
        "dm-sets",
        "dm-relations",
        "dm-functions"
      ]
    },
    {
      "id": "m2-counting",
      "title": "Conteo y razonamiento recursivo",
      "description": "Combinatoria, permutaciones, combinaciones, recurrencias e inducción",
      "lessons": [
        "dm-combinatorics",
        "dm-permutations",
        "dm-combinations",
        "dm-recurrences",
        "dm-induction"
      ]
    },
    {
      "id": "m3-graphs",
      "title": "Grafos y árboles",
      "description": "Estructuras de conectividad y jerarquía",
      "lessons": [
        "dm-graphs",
        "dm-trees"
      ]
    },
    {
      "id": "m4-automata",
      "title": "Autómatas y lenguajes formales",
      "description": "Máquinas finitas, expresiones, gramáticas y clases de lenguajes",
      "lessons": [
        "dm-automata",
        "dm-formal-languages"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "dm-logic": {
    "id": "dm-logic",
    "courseId": 28,
    "title": "Lógica proposicional y de predicados",
    "shortTitle": "Lógica proposicional y de predicados",
    "duration": 85,
    "objective": "formalizar proposiciones, cuantificadores e implicaciones y distinguir validez, satisfacibilidad y equivalencia lógica.",
    "summary": [
      "Una implicación P→Q es falsa solo cuando P es verdadera y Q falsa; lógicamente equivale a ¬P∨Q.",
      "La negación de cuantificadores intercambia ∀ y ∃: ¬∀x P(x) ≡ ∃x ¬P(x), y ¬∃x P(x) ≡ ∀x ¬P(x).",
      "Validez, satisfacibilidad y verdad bajo una interpretación son conceptos distintos; una tabla de verdad prueba equivalencias proposicionales finitas, no sustituye toda demostración matemática."
    ],
    "concept": "Una implicación P→Q es falsa solo cuando P es verdadera y Q falsa; lógicamente equivale a ¬P∨Q.",
    "rules": [
      "Una implicación P→Q es falsa solo cuando P es verdadera y Q falsa; lógicamente equivale a ¬P∨Q.",
      "La negación de cuantificadores intercambia ∀ y ∃: ¬∀x P(x) ≡ ∃x ¬P(x), y ¬∃x P(x) ≡ ∀x ¬P(x).",
      "Validez, satisfacibilidad y verdad bajo una interpretación son conceptos distintos; una tabla de verdad prueba equivalencias proposicionales finitas, no sustituye toda demostración matemática."
    ],
    "deep": {
      "intro": "La lógica formal separa sintaxis de semántica. Una fórmula bien formada puede evaluarse bajo una interpretación; una tautología es verdadera bajo todas las valuaciones proposicionales, mientras una contradicción no lo es bajo ninguna.",
      "sections": [
        {
          "title": "Semántica antes que símbolos",
          "body": "La lógica formal separa sintaxis de semántica. Una fórmula bien formada puede evaluarse bajo una interpretación; una tautología es verdadera bajo todas las valuaciones proposicionales, mientras una contradicción no lo es bajo ninguna."
        },
        {
          "title": "Implicación y contrapositiva",
          "body": "P→Q equivale a ¬P∨Q y a su contrapositiva ¬Q→¬P. La conversa Q→P y la inversa ¬P→¬Q no son equivalentes en general. Esta distinción evita demostrar accidentalmente otro teorema."
        },
        {
          "title": "Cuantificadores y alcance",
          "body": "El orden de cuantificadores importa: ∀x∃y R(x,y) permite elegir y según x; ∃y∀x R(x,y) exige un único y que sirva para todos. Las variables libres y ligadas dependen del alcance sintáctico."
        },
        {
          "title": "Pruebas y contraejemplos",
          "body": "Para refutar ∀x P(x) basta un contraejemplo. Para demostrar ∃x P(x) se exhibe un testigo o se prueba existencia indirectamente. Negar correctamente la afirmación objetivo suele revelar qué evidencia sería suficiente."
        }
      ]
    },
    "example": {
      "problem": "Niega correctamente: “Para todo programa p existe una entrada x tal que p termina en x”.",
      "steps": [
        "Identifica la estructura ∀p ∃x T(p,x).",
        "Niega el cuantificador exterior: ∃p ¬∃x T(p,x).",
        "Empuja la negación: ∃p ∀x ¬T(p,x)."
      ],
      "solution": "La negación es: “Existe un programa p que no termina para ninguna entrada x”."
    },
    "check": {
      "question": "¿La contrapositiva de P→Q es lógicamente equivalente a P→Q?",
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
          "Solo si P y Q son verdaderas",
          false
        ]
      ],
      "feedback": "La contrapositiva ¬Q→¬P es equivalente; la conversa Q→P no lo es en general."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿P→Q es equivalente a ¬P∨Q? sí/no",
        "answer": "si",
        "hint": "Compara las cuatro valuaciones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Niega “∀x P(x)” usando cuantificadores. Responde: existe x no P / para todo x no P",
        "answer": "existe x no P",
        "hint": "La negación de universal produce existencia de un contraejemplo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿∀x∃y R(x,y) implica siempre ∃y∀x R(x,y)? sí/no",
        "answer": "no",
        "hint": "El testigo y puede depender de x."
      }
    ]
  },
  "dm-sets": {
    "id": "dm-sets",
    "courseId": 28,
    "title": "Conjuntos, operaciones y cardinalidad",
    "shortTitle": "Conjuntos, operaciones y cardinalidad",
    "duration": 85,
    "objective": "razonar con pertenencia, inclusión, producto cartesiano, conjunto potencia y cardinalidades finitas.",
    "summary": [
      "x∈A y A⊆B hablan de relaciones de tipos distintos: elemento-conjunto frente a conjunto-conjunto.",
      "Si |A|=n, entonces |P(A)|=2^n porque cada subconjunto corresponde a una elección binaria por elemento.",
      "Para conjuntos finitos, |A∪B|=|A|+|B|−|A∩B|; la intersección se resta porque fue contada dos veces."
    ],
    "concept": "x∈A y A⊆B hablan de relaciones de tipos distintos: elemento-conjunto frente a conjunto-conjunto.",
    "rules": [
      "x∈A y A⊆B hablan de relaciones de tipos distintos: elemento-conjunto frente a conjunto-conjunto.",
      "Si |A|=n, entonces |P(A)|=2^n porque cada subconjunto corresponde a una elección binaria por elemento.",
      "Para conjuntos finitos, |A∪B|=|A|+|B|−|A∩B|; la intersección se resta porque fue contada dos veces."
    ],
    "deep": {
      "intro": "Un conjunto queda determinado por sus elementos, no por su orden de escritura ni por repeticiones. A⊆B significa que cada elemento de A pertenece a B; A∈B es una afirmación diferente sobre A como objeto.",
      "sections": [
        {
          "title": "Pertenencia e inclusión",
          "body": "Un conjunto queda determinado por sus elementos, no por su orden de escritura ni por repeticiones. A⊆B significa que cada elemento de A pertenece a B; A∈B es una afirmación diferente sobre A como objeto."
        },
        {
          "title": "Álgebra de conjuntos",
          "body": "Unión, intersección, diferencia y complemento obedecen identidades análogas a la lógica, incluidas las leyes de De Morgan. Las identidades pueden demostrarse por doble inclusión o razonamiento elemento a elemento."
        },
        {
          "title": "Producto cartesiano y potencia",
          "body": "A×B contiene pares ordenados; en el caso finito |A×B|=|A||B|. P(A) contiene todos los subconjuntos de A y tiene 2^|A| elementos cuando A es finito."
        },
        {
          "title": "Cardinalidad e inclusión-exclusión",
          "body": "Las cardinalidades permiten contar sin enumerar. Inclusión-exclusión corrige sobreconteos; para tres conjuntos aparecen términos individuales, pares con signo negativo y la triple intersección con signo positivo."
        }
      ]
    },
    "example": {
      "problem": "Sea A={1,2,3} y B={3,4}. Calcula |P(A)| y |A∪B|.",
      "steps": [
        "|A|=3, por tanto |P(A)|=2³=8.",
        "A∩B={3}, de cardinalidad 1.",
        "|A∪B|=3+2−1=4."
      ],
      "solution": "|P(A)|=8 y |A∪B|=4."
    },
    "check": {
      "question": "Si A⊆B y B⊆A, ¿entonces A=B?",
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
          "Solo si son finitos",
          false
        ]
      ],
      "feedback": "La extensionalidad da igualdad por doble inclusión, sin exigir finitud."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si |A|=5, ¿cuántos subconjuntos tiene A?",
        "answer": "32",
        "hint": "Cada elemento se incluye o no."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si |A|=7, |B|=6 y |A∩B|=2, calcula |A∪B|.",
        "answer": "11",
        "hint": "Suma y corrige el doble conteo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿A∈B y A⊆B significan lo mismo? sí/no",
        "answer": "no",
        "hint": "Una habla de elemento; otra, de inclusión."
      }
    ]
  },
  "dm-relations": {
    "id": "dm-relations",
    "courseId": 28,
    "title": "Relaciones, equivalencias y órdenes parciales",
    "shortTitle": "Relaciones, equivalencias y órdenes parciales",
    "duration": 85,
    "objective": "clasificar relaciones por reflexividad, simetría, antisimetría y transitividad y conectar equivalencias con particiones y órdenes parciales con posets.",
    "summary": [
      "Una relación binaria sobre A es un subconjunto de A×A.",
      "Una relación de equivalencia es reflexiva, simétrica y transitiva; sus clases forman una partición de A.",
      "Un orden parcial es reflexivo, antisimétrico y transitivo; antisimétrico no significa “no simétrico”."
    ],
    "concept": "Una relación binaria sobre A es un subconjunto de A×A.",
    "rules": [
      "Una relación binaria sobre A es un subconjunto de A×A.",
      "Una relación de equivalencia es reflexiva, simétrica y transitiva; sus clases forman una partición de A.",
      "Un orden parcial es reflexivo, antisimétrico y transitivo; antisimétrico no significa “no simétrico”."
    ],
    "deep": {
      "intro": "Modelar R⊆A×A permite aplicar operaciones de conjuntos y composición. Propiedades como reflexividad o transitividad son restricciones sobre esos pares, no etiquetas informales.",
      "sections": [
        {
          "title": "Relaciones como conjuntos de pares",
          "body": "Modelar R⊆A×A permite aplicar operaciones de conjuntos y composición. Propiedades como reflexividad o transitividad son restricciones sobre esos pares, no etiquetas informales."
        },
        {
          "title": "Equivalencia y cociente",
          "body": "Si R es equivalencia, [a]={x∈A:xRa}. Dos clases son iguales o disjuntas, y la colección de clases particiona A. Recíprocamente, toda partición induce una relación de equivalencia."
        },
        {
          "title": "Órdenes parciales",
          "body": "Un poset admite elementos incomparables. “≤” es orden total en números usuales, mientras “divide a” sobre enteros positivos es parcial. Minimal y mínimo no son sinónimos: puede haber varios minimales y ningún mínimo."
        },
        {
          "title": "Cierres y composición",
          "body": "El cierre reflexivo/simétrico/transitivo añade los pares mínimos necesarios para obtener la propiedad correspondiente. La clausura transitiva aparece naturalmente en reachability de grafos."
        }
      ]
    },
    "example": {
      "problem": "Sobre {1,2,3,6}, define aRb si a divide a b. ¿1 es mínimo y 2,3 son comparables?",
      "steps": [
        "La divisibilidad es reflexiva, antisimétrica y transitiva.",
        "1 divide a todos, así que es un mínimo.",
        "Ni 2 divide 3 ni 3 divide 2, por lo que son incomparables."
      ],
      "solution": "Es un orden parcial; 1 es mínimo y 2 y 3 son incomparables."
    },
    "check": {
      "question": "¿Una relación antisimétrica puede contener aRb y bRa con a≠b?",
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
          "Solo si también es simétrica",
          false
        ]
      ],
      "feedback": "Antisimetría exige que aRb y bRa impliquen a=b."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Toda relación de equivalencia induce una partición? sí/no",
        "answer": "si",
        "hint": "Piensa en clases de equivalencia."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Antisimétrica significa “nunca simétrica”? sí/no",
        "answer": "no",
        "hint": "La igualdad es simétrica y antisimétrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "En un poset, ¿puede haber dos elementos minimales distintos? sí/no",
        "answer": "si",
        "hint": "Minimal no significa mínimo global."
      }
    ]
  },
  "dm-functions": {
    "id": "dm-functions",
    "courseId": 28,
    "title": "Funciones, composición e inversas",
    "shortTitle": "Funciones, composición e inversas",
    "duration": 85,
    "objective": "distinguir inyectividad, sobreyectividad y biyectividad y razonar con composición, imágenes, preimágenes e inversas.",
    "summary": [
      "Una función f:A→B asigna a cada elemento del dominio A exactamente un valor en el codominio B.",
      "Inyectiva: entradas distintas no colisionan; sobreyectiva: todo elemento del codominio tiene preimagen; biyectiva: ambas.",
      "Una función tiene inversa bilateral f⁻¹:B→A exactamente cuando es biyectiva."
    ],
    "concept": "Una función f:A→B asigna a cada elemento del dominio A exactamente un valor en el codominio B.",
    "rules": [
      "Una función f:A→B asigna a cada elemento del dominio A exactamente un valor en el codominio B.",
      "Inyectiva: entradas distintas no colisionan; sobreyectiva: todo elemento del codominio tiene preimagen; biyectiva: ambas.",
      "Una función tiene inversa bilateral f⁻¹:B→A exactamente cuando es biyectiva."
    ],
    "deep": {
      "intro": "El codominio forma parte de la función. Dos expresiones idénticas pueden tener propiedades de sobreyectividad distintas si cambia el codominio. La imagen f(A) puede ser un subconjunto propio del codominio.",
      "sections": [
        {
          "title": "Dominio, codominio e imagen",
          "body": "El codominio forma parte de la función. Dos expresiones idénticas pueden tener propiedades de sobreyectividad distintas si cambia el codominio. La imagen f(A) puede ser un subconjunto propio del codominio."
        },
        {
          "title": "Inyección y sobreyección",
          "body": "Para conjuntos finitos de igual cardinalidad, inyectividad y sobreyectividad son equivalentes entre sí; en conjuntos infinitos esa intuición requiere más cuidado. Las pruebas suelen partir de definiciones: f(x)=f(y)⇒x=y o ∀b∈B∃a∈A f(a)=b."
        },
        {
          "title": "Composición",
          "body": "(g∘f)(x)=g(f(x)). La composición es asociativa pero no conmutativa en general. La composición de inyectivas es inyectiva; la de sobreyectivas, sobreyectiva."
        },
        {
          "title": "Preimagen e inversa",
          "body": "La preimagen f⁻¹(S) de un subconjunto S⊆B existe como conjunto incluso si f no es invertible. No debe confundirse esa notación con una función inversa global."
        }
      ]
    },
    "example": {
      "problem": "Sea f:Z→Z, f(x)=2x. ¿Es inyectiva? ¿Sobreyectiva?",
      "steps": [
        "Si 2x=2y, entonces x=y: es inyectiva.",
        "Para y=1 no existe entero x con 2x=1.",
        "Por tanto no es sobreyectiva sobre Z y no tiene inversa Z→Z."
      ],
      "solution": "Es inyectiva pero no sobreyectiva sobre Z."
    },
    "check": {
      "question": "¿Puede hablarse de la preimagen de un conjunto aunque f no sea biyectiva?",
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
          "Solo si f es inyectiva",
          false
        ]
      ],
      "feedback": "La preimagen de conjuntos está definida para cualquier función; la inversa bilateral exige biyectividad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La composición de dos funciones inyectivas es inyectiva? sí/no",
        "answer": "si",
        "hint": "Encadena la definición de inyectividad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Para f:Z→Z, f(x)=x+1, ¿es biyectiva? sí/no",
        "answer": "si",
        "hint": "Cada entero y tiene preimagen y−1."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La función f(x)=x² de R→R es sobreyectiva? sí/no",
        "answer": "no",
        "hint": "No produce valores negativos."
      }
    ]
  },
  "dm-combinatorics": {
    "id": "dm-combinatorics",
    "courseId": 28,
    "title": "Combinatoria y principios de conteo",
    "shortTitle": "Combinatoria y principios de conteo",
    "duration": 85,
    "objective": "resolver conteos mediante suma, producto, complementos, biyecciones, principio del palomar e inclusión-exclusión.",
    "summary": [
      "Regla del producto: decisiones secuenciales independientes en el sentido combinatorio multiplican el número de posibilidades.",
      "Regla de la suma: casos mutuamente excluyentes se suman; si se solapan hace falta corregir el sobreconteo.",
      "Principio del palomar: al distribuir n objetos en m cajas con n>m, alguna caja contiene al menos dos; su forma general usa ⌈n/m⌉."
    ],
    "concept": "Regla del producto: decisiones secuenciales independientes en el sentido combinatorio multiplican el número de posibilidades.",
    "rules": [
      "Regla del producto: decisiones secuenciales independientes en el sentido combinatorio multiplican el número de posibilidades.",
      "Regla de la suma: casos mutuamente excluyentes se suman; si se solapan hace falta corregir el sobreconteo.",
      "Principio del palomar: al distribuir n objetos en m cajas con n>m, alguna caja contiene al menos dos; su forma general usa ⌈n/m⌉."
    ],
    "deep": {
      "intro": "La dificultad principal es definir exactamente qué constituye un resultado y cuándo dos resultados son iguales. Orden, repetición y restricciones deben fijarse antes de escoger una fórmula.",
      "sections": [
        {
          "title": "Contar estructuras, no fórmulas",
          "body": "La dificultad principal es definir exactamente qué constituye un resultado y cuándo dos resultados son iguales. Orden, repetición y restricciones deben fijarse antes de escoger una fórmula."
        },
        {
          "title": "Bijecciones y complemento",
          "body": "Una biyección transforma un conjunto difícil de contar en otro conocido. Contar por complemento es eficaz cuando “todos menos los malos” tiene estructura más simple."
        },
        {
          "title": "Palomar generalizado",
          "body": "Con N objetos y k cajas, alguna caja contiene al menos ⌈N/k⌉ objetos. El principio demuestra existencia sin identificar necesariamente cuál caja."
        },
        {
          "title": "Inclusión-exclusión",
          "body": "Para eventos/propiedades solapadas, inclusión-exclusión alterna signos según el número de intersecciones para corregir multiplicidades de conteo."
        }
      ]
    },
    "example": {
      "problem": "Entre 13 personas, demuestra que al menos dos nacen en el mismo mes.",
      "steps": [
        "Modela 12 meses como cajas.",
        "Distribuye 13 personas entre 12 cajas.",
        "Como 13>12, por palomar alguna caja recibe al menos 2 personas."
      ],
      "solution": "Al menos dos personas comparten mes de nacimiento."
    },
    "check": {
      "question": "¿El principio del palomar identifica necesariamente qué caja contiene la colisión?",
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
          "Solo con dos cajas",
          false
        ]
      ],
      "feedback": "Es un principio existencial: garantiza que alguna caja cumple la propiedad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Hay 4 camisetas y 3 pantalones. ¿Cuántos conjuntos camiseta+pantalón?",
        "answer": "12",
        "hint": "Una elección de cada categoría."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cuántos strings binarios de longitud 8 existen?",
        "answer": "256",
        "hint": "Dos elecciones independientes por posición."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "101 objetos se reparten en 10 cajas. ¿Cuál es el mínimo garantizado en alguna caja?",
        "answer": "11",
        "hint": "Usa techo de 101/10."
      }
    ]
  },
  "dm-permutations": {
    "id": "dm-permutations",
    "courseId": 28,
    "title": "Permutaciones y ordenaciones",
    "shortTitle": "Permutaciones y ordenaciones",
    "duration": 85,
    "objective": "contar ordenaciones con y sin repetición, permutaciones parciales y permutaciones de multiconjuntos.",
    "summary": [
      "Las permutaciones de n objetos distintos son n!.",
      "Las ordenaciones de k objetos distintos elegidos de n sin reemplazo son P(n,k)=n!/(n−k)!.",
      "Si hay repeticiones indistinguibles con multiplicidades n₁,…,nᵣ que suman n, el número de ordenaciones distintas es n!/(n₁!⋯nᵣ!)."
    ],
    "concept": "Las permutaciones de n objetos distintos son n!.",
    "rules": [
      "Las permutaciones de n objetos distintos son n!.",
      "Las ordenaciones de k objetos distintos elegidos de n sin reemplazo son P(n,k)=n!/(n−k)!.",
      "Si hay repeticiones indistinguibles con multiplicidades n₁,…,nᵣ que suman n, el número de ordenaciones distintas es n!/(n₁!⋯nᵣ!)."
    ],
    "deep": {
      "intro": "Una permutación distingue secuencias con los mismos elementos en diferente posición. Antes de usar factoriales, pregunta si AB y BA cuentan como resultados distintos.",
      "sections": [
        {
          "title": "Orden importa",
          "body": "Una permutación distingue secuencias con los mismos elementos en diferente posición. Antes de usar factoriales, pregunta si AB y BA cuentan como resultados distintos."
        },
        {
          "title": "Permutaciones parciales",
          "body": "Elegir y ordenar k de n objetos puede verse como n opciones, luego n−1, etc., lo que produce el factorial descendente n(n−1)…(n−k+1)."
        },
        {
          "title": "Repeticiones indistinguibles",
          "body": "Si ciertos elementos son indistinguibles, n! sobrecuenta por cada permutación interna de copias idénticas; dividir por los factoriales de multiplicidades corrige ese sobreconteo."
        },
        {
          "title": "Con reemplazo",
          "body": "Si cada una de k posiciones puede tomar cualquiera de n símbolos independientemente, hay n^k strings ordenados. No debe confundirse con P(n,k), que excluye reutilización."
        }
      ]
    },
    "example": {
      "problem": "¿Cuántas ordenaciones distintas tiene la palabra LEVEL?",
      "steps": [
        "Hay 5 posiciones.",
        "L aparece 2 veces, E aparece 2 veces y V una vez.",
        "Cuenta 5!/(2!2!)=30."
      ],
      "solution": "Hay 30 ordenaciones distintas."
    },
    "check": {
      "question": "¿P(n,k) cuenta elecciones donde el orden importa y no hay reemplazo?",
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
          "Solo cuando k=n",
          false
        ]
      ],
      "feedback": "P(n,k)=n!/(n−k)! cuenta secuencias de longitud k sin repetir elementos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Cuántas permutaciones tienen 6 objetos distintos?",
        "answer": "720",
        "hint": "6!."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Calcula P(8,3).",
        "answer": "336",
        "hint": "8·7·6."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cuántos strings de longitud 4 sobre alfabeto de 3 símbolos si se permite repetir?",
        "answer": "81",
        "hint": "3^4."
      }
    ]
  },
  "dm-combinations": {
    "id": "dm-combinations",
    "courseId": 28,
    "title": "Combinaciones, binomios y selección sin orden",
    "shortTitle": "Combinaciones, binomios y selección sin orden",
    "duration": 85,
    "objective": "contar subconjuntos, conectar coeficientes binomiales con identidades y resolver selecciones con repetición.",
    "summary": [
      "Las selecciones de k elementos de n sin orden ni repetición son C(n,k)=n!/(k!(n−k)!).",
      "C(n,k)=C(n,n−k) por complementariedad y C(n,k)=C(n−1,k)+C(n−1,k−1) por partición de casos.",
      "Las combinaciones con repetición de k objetos de n tipos corresponden a C(n+k−1,k) mediante stars and bars."
    ],
    "concept": "Las selecciones de k elementos de n sin orden ni repetición son C(n,k)=n!/(k!(n−k)!).",
    "rules": [
      "Las selecciones de k elementos de n sin orden ni repetición son C(n,k)=n!/(k!(n−k)!).",
      "C(n,k)=C(n,n−k) por complementariedad y C(n,k)=C(n−1,k)+C(n−1,k−1) por partición de casos.",
      "Las combinaciones con repetición de k objetos de n tipos corresponden a C(n+k−1,k) mediante stars and bars."
    ],
    "deep": {
      "intro": "Cada subconjunto de tamaño k tiene k! ordenaciones, por eso dividir P(n,k) entre k! produce C(n,k).",
      "sections": [
        {
          "title": "Del orden a la selección",
          "body": "Cada subconjunto de tamaño k tiene k! ordenaciones, por eso dividir P(n,k) entre k! produce C(n,k)."
        },
        {
          "title": "Identidades combinatorias",
          "body": "Las identidades binomiales pueden probarse algebraicamente, pero una prueba biyectiva o por partición de casos suele explicar por qué son verdaderas."
        },
        {
          "title": "Teorema binomial",
          "body": "(x+y)^n=Σ C(n,k)x^k y^(n−k). El coeficiente cuenta qué k factores aportan x al expandir el producto."
        },
        {
          "title": "Stars and bars",
          "body": "Distribuir k unidades indistinguibles entre n categorías permite codificar soluciones no negativas de x₁+…+xₙ=k con k estrellas y n−1 separadores."
        }
      ]
    },
    "example": {
      "problem": "¿Cuántos comités de 3 personas pueden formarse con 10 personas?",
      "steps": [
        "El orden dentro del comité no importa.",
        "Elegimos 3 de 10 sin repetición.",
        "C(10,3)=10·9·8/(3·2·1)=120."
      ],
      "solution": "Se pueden formar 120 comités."
    },
    "check": {
      "question": "¿C(n,k)=C(n,n−k)?",
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
          "Solo si n es par",
          false
        ]
      ],
      "feedback": "Elegir k elementos equivale a decidir cuáles n−k quedan fuera."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Calcula C(8,2).",
        "answer": "28",
        "hint": "8·7/2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cuántos subconjuntos de tamaño 0 tiene un conjunto no vacío?",
        "answer": "1",
        "hint": "El conjunto vacío."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Número de soluciones no negativas de x+y+z=5.",
        "answer": "21",
        "hint": "Stars and bars: C(7,2)."
      }
    ]
  },
  "dm-recurrences": {
    "id": "dm-recurrences",
    "courseId": 28,
    "title": "Recurrencias y crecimiento discreto",
    "shortTitle": "Recurrencias y crecimiento discreto",
    "duration": 85,
    "objective": "formular y resolver recurrencias lineales básicas, verificar condiciones iniciales y analizar crecimiento asintótico.",
    "summary": [
      "Una recurrencia necesita condiciones iniciales suficientes; la ecuación sola suele describir muchas secuencias.",
      "Para recurrencias lineales homogéneas con coeficientes constantes, las raíces de la ecuación característica determinan la forma de la solución.",
      "Verificar una solución exige sustituirla en la recurrencia y comprobar también las condiciones iniciales."
    ],
    "concept": "Una recurrencia necesita condiciones iniciales suficientes; la ecuación sola suele describir muchas secuencias.",
    "rules": [
      "Una recurrencia necesita condiciones iniciales suficientes; la ecuación sola suele describir muchas secuencias.",
      "Para recurrencias lineales homogéneas con coeficientes constantes, las raíces de la ecuación característica determinan la forma de la solución.",
      "Verificar una solución exige sustituirla en la recurrencia y comprobar también las condiciones iniciales."
    ],
    "deep": {
      "intro": "Una recurrence relaciona términos mediante anteriores. En algoritmos, puede modelar tamaño de problema, coste por nivel o estado temporal; elegir la recurrencia correcta es parte del análisis, no un paso automático.",
      "sections": [
        {
          "title": "Modelo recursivo",
          "body": "Una recurrence relaciona términos mediante anteriores. En algoritmos, puede modelar tamaño de problema, coste por nivel o estado temporal; elegir la recurrencia correcta es parte del análisis, no un paso automático."
        },
        {
          "title": "Primer orden",
          "body": "Para a_n=c a_{n−1}+d, el punto fijo y la parte homogénea permiten derivar una forma cerrada. Si c≠1, puede escribirse a_n=c^n(a_0−a*)+a*, con a*=d/(1−c)."
        },
        {
          "title": "Ecuación característica",
          "body": "En a_n=αa_{n−1}+βa_{n−2}, probar a_n=r^n produce r²=αr+β. Raíces distintas generan combinaciones lineales; raíces repetidas introducen factores polinómicos en n."
        },
        {
          "title": "Asintótica y verificación",
          "body": "Una forma cerrada puede simplificar el análisis O/Θ, pero no siempre es necesaria. Inducción puede verificar cotas propuestas incluso cuando no buscamos una solución exacta."
        }
      ]
    },
    "example": {
      "problem": "Resuelve a_n=2a_{n−1}+1 con a_0=0.",
      "steps": [
        "Busca el patrón: 0,1,3,7,15,…",
        "El punto fijo satisface a*=2a*+1, luego a*=−1.",
        "a_n=2^n(a_0+1)−1=2^n−1."
      ],
      "solution": "a_n=2^n−1."
    },
    "check": {
      "question": "¿Basta resolver la ecuación característica sin usar condiciones iniciales para obtener una secuencia única?",
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
          "Solo si hay una raíz",
          false
        ]
      ],
      "feedback": "Las condiciones iniciales fijan las constantes de la solución general."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Para a_n=a_{n-1}+3, a_0=2, calcula a_4.",
        "answer": "14",
        "hint": "Suma 3 cuatro veces."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "La recurrencia Fibonacci F_n=F_{n-1}+F_{n-2} tiene ecuación característica r²=r+1. ¿sí/no",
        "answer": "si",
        "hint": "Sustituye r^n."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una forma cerrada propuesta debe satisfacer recurrencia y condiciones iniciales? sí/no",
        "answer": "si",
        "hint": "Ambas forman la definición de la secuencia concreta."
      }
    ]
  },
  "dm-induction": {
    "id": "dm-induction",
    "courseId": 28,
    "title": "Inducción, inducción fuerte e invariantes",
    "shortTitle": "Inducción, inducción fuerte e invariantes",
    "duration": 85,
    "objective": "construir pruebas inductivas rigurosas y elegir entre inducción simple, fuerte e invariantes según la estructura del problema.",
    "summary": [
      "Una prueba por inducción necesita base(s), hipótesis inductiva explícita y un paso que derive el siguiente caso sin asumir lo que pretende probar.",
      "La inducción fuerte permite usar todos los casos anteriores; no demuestra “más teoremas” que la inducción ordinaria en los naturales, pero puede encajar mejor con la estructura recursiva.",
      "El principio de inducción está estrechamente relacionado con el buen orden de los naturales y con invariantes de procesos discretos."
    ],
    "concept": "Una prueba por inducción necesita base(s), hipótesis inductiva explícita y un paso que derive el siguiente caso sin asumir lo que pretende probar.",
    "rules": [
      "Una prueba por inducción necesita base(s), hipótesis inductiva explícita y un paso que derive el siguiente caso sin asumir lo que pretende probar.",
      "La inducción fuerte permite usar todos los casos anteriores; no demuestra “más teoremas” que la inducción ordinaria en los naturales, pero puede encajar mejor con la estructura recursiva.",
      "El principio de inducción está estrechamente relacionado con el buen orden de los naturales y con invariantes de procesos discretos."
    ],
    "deep": {
      "intro": "Para P(n) desde n₀: prueba P(n₀), luego ∀k≥n₀, P(k)⇒P(k+1). El paso es una implicación universal; comprobar ejemplos grandes no la sustituye.",
      "sections": [
        {
          "title": "Estructura lógica",
          "body": "Para P(n) desde n₀: prueba P(n₀), luego ∀k≥n₀, P(k)⇒P(k+1). El paso es una implicación universal; comprobar ejemplos grandes no la sustituye."
        },
        {
          "title": "Inducción fuerte",
          "body": "El paso usa P(n₀),…,P(k) para demostrar P(k+1). Es útil cuando el objeto k+1 se descompone en varios tamaños menores, como factorizaciones o árboles."
        },
        {
          "title": "Inducción estructural",
          "body": "Para estructuras recursivas, la inducción sigue constructores: prueba casos base y demuestra que cada constructor preserva la propiedad suponiéndola para subestructuras."
        },
        {
          "title": "Invariantes",
          "body": "Un invariante permanece verdadero durante una transición de estado. Para demostrar seguridad: se prueba en estado inicial y se demuestra preservación por cada transición posible."
        }
      ]
    },
    "example": {
      "problem": "Demuestra por inducción que 1+2+…+n=n(n+1)/2.",
      "steps": [
        "Base n=1: 1=1·2/2.",
        "Hipótesis: suma hasta k = k(k+1)/2.",
        "Para k+1: k(k+1)/2+(k+1)=(k+1)(k+2)/2."
      ],
      "solution": "La identidad vale para todo n≥1."
    },
    "check": {
      "question": "¿La inducción fuerte es lógicamente capaz de demostrar teoremas sobre N que la inducción ordinaria no pueda?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No, son equivalentes como principios sobre N",
          true
        ],
        [
          "Solo para números primos",
          false
        ]
      ],
      "feedback": "La fuerte puede ser más cómoda, pero es equivalente en poder demostrativo sobre los naturales."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una prueba inductiva necesita al menos un caso base adecuado? sí/no",
        "answer": "si",
        "hint": "Sin anclaje, el paso puede sostener una cadena sin inicio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Comprobar P(1),P(2),…,P(1000) prueba P(n) para todo n? sí/no",
        "answer": "no",
        "hint": "Falta un argumento universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La inducción estructural sigue la definición recursiva del objeto? sí/no",
        "answer": "si",
        "hint": "Casos base + constructores."
      }
    ]
  },
  "dm-graphs": {
    "id": "dm-graphs",
    "courseId": 28,
    "title": "Grafos: conectividad, caminos y estructura",
    "shortTitle": "Grafos: conectividad, caminos y estructura",
    "duration": 85,
    "objective": "modelar sistemas mediante grafos dirigidos/no dirigidos y razonar con grados, caminos, conectividad, ciclos y recorridos.",
    "summary": [
      "En un grafo no dirigido finito, la suma de grados es 2|E|; cada arista contribuye dos incidencias.",
      "Un camino y un ciclo son propiedades de secuencias de vértices/aristas; conectividad pregunta por existencia de caminos entre pares.",
      "Euleriano y hamiltoniano son problemas distintos: Euler recorre aristas; Hamilton visita vértices."
    ],
    "concept": "En un grafo no dirigido finito, la suma de grados es 2|E|; cada arista contribuye dos incidencias.",
    "rules": [
      "En un grafo no dirigido finito, la suma de grados es 2|E|; cada arista contribuye dos incidencias.",
      "Un camino y un ciclo son propiedades de secuencias de vértices/aristas; conectividad pregunta por existencia de caminos entre pares.",
      "Euleriano y hamiltoniano son problemas distintos: Euler recorre aristas; Hamilton visita vértices."
    ],
    "deep": {
      "intro": "Un grafo G=(V,E) abstrae conectividad. En grafos dirigidos, (u,v) y (v,u) son aristas distintas; aparecen indegree y outdegree. Multigrafos y loops requieren convenciones explícitas.",
      "sections": [
        {
          "title": "Modelo de grafo",
          "body": "Un grafo G=(V,E) abstrae conectividad. En grafos dirigidos, (u,v) y (v,u) son aristas distintas; aparecen indegree y outdegree. Multigrafos y loops requieren convenciones explícitas."
        },
        {
          "title": "Handshake lemma",
          "body": "En grafos no dirigidos, Σ_v deg(v)=2|E|. Consecuencia: el número de vértices de grado impar es par. En digrafos, la suma de indegrees y la de outdegrees valen ambas |E|."
        },
        {
          "title": "Caminos y componentes",
          "body": "Reachability induce componentes en grafos no dirigidos y componentes fuertemente conexas en dirigidos. BFS calcula distancias mínimas en número de aristas en grafos no ponderados; DFS revela otra estructura útil para ciclos y orden topológico."
        },
        {
          "title": "Euler y Hamilton",
          "body": "Los criterios eulerianos dependen de grados/conectividad y están bien caracterizados; Hamiltonianidad no admite una condición local tan simple. Confundir ambos problemas produce soluciones muy convincentes a la pregunta equivocada."
        }
      ]
    },
    "example": {
      "problem": "Un grafo no dirigido tiene grados 3,3,2,2,2. ¿Cuántas aristas tiene?",
      "steps": [
        "Suma grados: 3+3+2+2+2=12.",
        "Por handshake lemma, 12=2|E|.",
        "Entonces |E|=6."
      ],
      "solution": "El grafo tiene 6 aristas."
    },
    "check": {
      "question": "¿En un grafo no dirigido el número de vértices de grado impar es siempre par?",
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
          "Solo en árboles",
          false
        ]
      ],
      "feedback": "La suma de grados es par, por lo que la cantidad de sumandos impares debe ser par."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si un grafo no dirigido tiene suma de grados 20, ¿cuántas aristas tiene?",
        "answer": "10",
        "hint": "Divide por 2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿BFS obtiene distancias mínimas en número de aristas en un grafo no ponderado? sí/no",
        "answer": "si",
        "hint": "Explora por capas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un ciclo euleriano exige visitar cada vértice exactamente una vez? sí/no",
        "answer": "no",
        "hint": "Euler habla de aristas; Hamilton de vértices."
      }
    ]
  },
  "dm-trees": {
    "id": "dm-trees",
    "courseId": 28,
    "title": "Árboles, recorridos y spanning trees",
    "shortTitle": "Árboles, recorridos y spanning trees",
    "duration": 85,
    "objective": "usar caracterizaciones equivalentes de árboles, razonar sobre árboles enraizados y comprender spanning trees.",
    "summary": [
      "Para un grafo no dirigido finito, ser árbol equivale a ser conexo y acíclico; también equivale a ser conexo con |V|−1 aristas.",
      "En un árbol existe un único camino simple entre cada par de vértices.",
      "Un spanning tree conserva todos los vértices de un grafo conexo y elige suficientes aristas para mantener conectividad sin ciclos."
    ],
    "concept": "Para un grafo no dirigido finito, ser árbol equivale a ser conexo y acíclico; también equivale a ser conexo con |V|−1 aristas.",
    "rules": [
      "Para un grafo no dirigido finito, ser árbol equivale a ser conexo y acíclico; también equivale a ser conexo con |V|−1 aristas.",
      "En un árbol existe un único camino simple entre cada par de vértices.",
      "Un spanning tree conserva todos los vértices de un grafo conexo y elige suficientes aristas para mantener conectividad sin ciclos."
    ],
    "deep": {
      "intro": "Para grafos finitos no dirigidos, varias propiedades se implican mutuamente: conexo+acíclico, acíclico con n−1 aristas, conexo con n−1 aristas y camino simple único entre pares. Cada caracterización es útil en pruebas diferentes.",
      "sections": [
        {
          "title": "Caracterizaciones equivalentes",
          "body": "Para grafos finitos no dirigidos, varias propiedades se implican mutuamente: conexo+acíclico, acíclico con n−1 aristas, conexo con n−1 aristas y camino simple único entre pares. Cada caracterización es útil en pruebas diferentes."
        },
        {
          "title": "Árboles enraizados",
          "body": "Elegir una raíz orienta relaciones padre/hijo, profundidad, altura y subárboles. La estructura abstracta subyacente puede ser la misma aunque cambie la raíz."
        },
        {
          "title": "Recorridos",
          "body": "Preorder, inorder y postorder dependen de estructura/convenciones del árbol; inorder es especialmente natural para árboles binarios. BFS produce recorrido por niveles."
        },
        {
          "title": "Spanning trees",
          "body": "Todo grafo conexo contiene un spanning tree. Eliminar una arista de un ciclo preserva conectividad; repetir hasta eliminar ciclos construye uno. Los minimum spanning trees añaden pesos y pertenecen a un problema de optimización diferente."
        }
      ]
    },
    "example": {
      "problem": "Un árbol tiene 37 vértices. ¿Cuántas aristas tiene?",
      "steps": [
        "Todo árbol finito no dirigido con n vértices tiene n−1 aristas.",
        "Sustituye n=37.",
        "37−1=36."
      ],
      "solution": "Tiene 36 aristas."
    },
    "check": {
      "question": "¿Puede un árbol finito no dirigido contener dos caminos simples distintos entre el mismo par de vértices?",
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
          "Solo si tiene más de 2 vértices",
          false
        ]
      ],
      "feedback": "Dos caminos simples distintos formarían un ciclo, contradiciendo que sea árbol."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un árbol con 12 vértices tiene ¿cuántas aristas?",
        "answer": "11",
        "hint": "n−1."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Todo grafo conexo finito tiene al menos un spanning tree? sí/no",
        "answer": "si",
        "hint": "Elimina aristas de ciclos preservando conectividad."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cambiar la raíz de un árbol cambia necesariamente su conjunto de aristas? sí/no",
        "answer": "no",
        "hint": "Cambia la estructura padre/hijo, no el grafo subyacente."
      }
    ]
  },
  "dm-automata": {
    "id": "dm-automata",
    "courseId": 28,
    "title": "Autómatas finitos: DFA, NFA y estados",
    "shortTitle": "Autómatas finitos: DFA, NFA y estados",
    "duration": 85,
    "objective": "definir DFA/NFA formalmente, ejecutar máquinas, construir productos y comprender la equivalencia expresiva entre DFA y NFA.",
    "summary": [
      "Un DFA se especifica por (Q,Σ,δ,q₀,F) con transición determinista δ:Q×Σ→Q.",
      "Un NFA puede tener varias transiciones posibles (y, según formalismo, ε-transiciones), pero reconoce exactamente la misma clase de lenguajes regulares que los DFA.",
      "La construcción por subconjuntos transforma estados NFA posibles en conjuntos de estados del DFA, con potencial crecimiento exponencial."
    ],
    "concept": "Un DFA se especifica por (Q,Σ,δ,q₀,F) con transición determinista δ:Q×Σ→Q.",
    "rules": [
      "Un DFA se especifica por (Q,Σ,δ,q₀,F) con transición determinista δ:Q×Σ→Q.",
      "Un NFA puede tener varias transiciones posibles (y, según formalismo, ε-transiciones), pero reconoce exactamente la misma clase de lenguajes regulares que los DFA.",
      "La construcción por subconjuntos transforma estados NFA posibles en conjuntos de estados del DFA, con potencial crecimiento exponencial."
    ],
    "deep": {
      "intro": "El estado resume la información del prefijo necesaria para decidir el futuro reconocimiento. Diseñar un autómata consiste en decidir qué historia debe recordarse y qué detalles pueden olvidarse.",
      "sections": [
        {
          "title": "Estado como información suficiente",
          "body": "El estado resume la información del prefijo necesaria para decidir el futuro reconocimiento. Diseñar un autómata consiste en decidir qué historia debe recordarse y qué detalles pueden olvidarse."
        },
        {
          "title": "DFA formal",
          "body": "La función extendida δ* procesa strings completos. Un string w se acepta si δ*(q₀,w)∈F. Aceptar no significa que la máquina “termine” en un sentido de Turing: un DFA consume una entrada finita y llega a un estado."
        },
        {
          "title": "NFA y no determinismo",
          "body": "Un NFA acepta si existe al menos una trayectoria compatible que termina en estado aceptante. El no determinismo es una semántica matemática; no requiere que una CPU física clone universos."
        },
        {
          "title": "Construcciones",
          "body": "Producto de DFA permite intersección/diferencia; complemento invierte aceptación en un DFA completo. Subset construction demuestra equivalencia DFA/NFA y explica por qué una representación NFA puede ser exponencialmente más compacta."
        }
      ]
    },
    "example": {
      "problem": "Diseña el estado mínimo conceptual para reconocer strings binarios que terminan en 01.",
      "steps": [
        "Solo importa un sufijo relevante del prefijo leído.",
        "Usa estados: sin prefijo útil, último símbolo 0, sufijo 01 aceptante.",
        "Actualiza estado según cada 0/1 y acepta solo en el estado sufijo 01 al finalizar."
      ],
      "solution": "Basta recordar el sufijo relevante para saber si el string termina en 01."
    },
    "check": {
      "question": "¿DFA y NFA reconocen exactamente los mismos lenguajes?",
      "options": [
        [
          "Sí, los regulares",
          true
        ],
        [
          "No, NFA reconoce más",
          false
        ],
        [
          "Solo si no hay ε-transiciones",
          false
        ]
      ],
      "feedback": "La construcción por subconjuntos convierte cualquier NFA finito en un DFA equivalente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un DFA puede tener dos destinos distintos para el mismo estado y símbolo? sí/no",
        "answer": "no",
        "hint": "Determinismo exige una única transición."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un NFA puede ser más compacto que su DFA equivalente? sí/no",
        "answer": "si",
        "hint": "Subset construction puede producir hasta 2^n estados."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Complementar un DFA completo puede hacerse intercambiando estados aceptantes y no aceptantes? sí/no",
        "answer": "si",
        "hint": "Cada string tiene una única ejecución total."
      }
    ]
  },
  "dm-formal-languages": {
    "id": "dm-formal-languages",
    "courseId": 28,
    "title": "Lenguajes formales, regex y gramáticas",
    "shortTitle": "Lenguajes formales, regex y gramáticas",
    "duration": 85,
    "objective": "razonar con alfabetos, strings y lenguajes y distinguir lenguajes regulares de context-free mediante autómatas, expresiones regulares y gramáticas.",
    "summary": [
      "Un lenguaje formal es un conjunto de strings sobre un alfabeto; puede ser finito o infinito aunque el alfabeto sea finito.",
      "Expresiones regulares, DFA y NFA describen exactamente la clase de lenguajes regulares.",
      "El pumping lemma es útil para demostrar que ciertos lenguajes no son regulares; satisfacer su condición no prueba regularidad."
    ],
    "concept": "Un lenguaje formal es un conjunto de strings sobre un alfabeto; puede ser finito o infinito aunque el alfabeto sea finito.",
    "rules": [
      "Un lenguaje formal es un conjunto de strings sobre un alfabeto; puede ser finito o infinito aunque el alfabeto sea finito.",
      "Expresiones regulares, DFA y NFA describen exactamente la clase de lenguajes regulares.",
      "El pumping lemma es útil para demostrar que ciertos lenguajes no son regulares; satisfacer su condición no prueba regularidad."
    ],
    "deep": {
      "intro": "Para un alfabeto Σ, Σ* contiene todos los strings finitos, incluido ε. Un lenguaje L es cualquier subconjunto de Σ*. Operaciones como unión, concatenación y estrella de Kleene construyen lenguajes nuevos.",
      "sections": [
        {
          "title": "Alfabetos y lenguajes",
          "body": "Para un alfabeto Σ, Σ* contiene todos los strings finitos, incluido ε. Un lenguaje L es cualquier subconjunto de Σ*. Operaciones como unión, concatenación y estrella de Kleene construyen lenguajes nuevos."
        },
        {
          "title": "Regularidad",
          "body": "DFA, NFA y regex tienen igual poder expresivo para lenguajes regulares, aunque difieran en conveniencia y tamaño. Las propiedades de cierre permiten construir reconocedores de unión, intersección, complemento y otras operaciones."
        },
        {
          "title": "Gramáticas context-free",
          "body": "Una CFG usa producciones A→α y genera strings por derivaciones. Los pushdown automata caracterizan los lenguajes context-free. La ambigüedad es propiedad de una gramática concreta; un lenguaje puede tener gramáticas ambiguas y no ambiguas, salvo lenguajes inherentemente ambiguos."
        },
        {
          "title": "Pumping y límites",
          "body": "El pumping lemma regular da una propiedad necesaria de todos los lenguajes regulares. Para probar no regularidad se asume una longitud de bombeo arbitraria y se derrota toda descomposición permitida; mostrar una descomposición que bombea no basta para probar regularidad."
        }
      ]
    },
    "example": {
      "problem": "¿Por qué L={0^n1^n : n≥0} no puede reconocerse con un DFA finito?",
      "steps": [
        "Un DFA finito tiene memoria finita de estado.",
        "La cantidad de 0 iniciales es no acotada y debe compararse exactamente con la de 1.",
        "El pumping lemma/Myhill–Nerode formaliza que se necesitan infinitas clases distinguibles."
      ],
      "solution": "L no es regular; requiere memoria no acotada del conteo, aunque sí es context-free."
    },
    "check": {
      "question": "¿Que un lenguaje cumpla una instancia de “bombeo” demuestra que es regular?",
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
          "Solo si el alfabeto es binario",
          false
        ]
      ],
      "feedback": "El pumping lemma aporta una condición necesaria, no una caracterización suficiente para demostrar regularidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿ε pertenece a Σ* para cualquier alfabeto Σ? sí/no",
        "answer": "si",
        "hint": "Σ* incluye strings de longitud 0."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Regex, DFA y NFA tienen el mismo poder expresivo para lenguajes regulares? sí/no",
        "answer": "si",
        "hint": "Existen conversiones entre los tres formalismos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El lenguaje {0^n1^n:n≥0} es regular? sí/no",
        "answer": "no",
        "hint": "Un DFA finito no puede recordar un conteo no acotado exacto."
      }
    ]
  }
});
