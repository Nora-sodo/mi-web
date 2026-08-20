/**
 * BLOQUE 030 — Cálculo
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar existencia, identidad exacta y aproximación. Una
 * fórmula simbólica no garantiza estabilidad numérica; declarar hipótesis,
 * dominio y objeto derivado antes de operar.
 */
window.LEARNING_PATHS[30] = {
  "level": "Experto progresivo",
  "estimatedHours": 92,
  "description": "Cálculo desde límites y derivadas hasta integración, series, cálculo multivariable, Hessianos y ecuaciones diferenciales, con atención a hipótesis y estabilidad numérica.",
  "outcomes": [
    "Razonar con límites, continuidad, derivadas e integrales a partir de definiciones y teoremas, no solo reglas mecánicas.",
    "Usar series y aproximaciones de Taylor entendiendo convergencia, error y dominio de validez.",
    "Trabajar con derivadas parciales, gradiente, Jacobiano y Hessiano distinguiendo objetos escalares, vectoriales y multilineales.",
    "Modelar ecuaciones diferenciales y reconocer la diferencia entre solución analítica, existencia/unicidad y aproximación numérica."
  ],
  "modules": [
    {
      "id": "m1-local-change",
      "title": "Límites y cambio local",
      "description": "Continuidad, derivadas y aproximación lineal",
      "lessons": [
        "calc-limits",
        "calc-continuity",
        "calc-derivative",
        "calc-diff-rules"
      ]
    },
    {
      "id": "m2-accum-series",
      "title": "Acumulación y aproximación",
      "description": "Integrales, teorema fundamental y series",
      "lessons": [
        "calc-integral",
        "calc-ftc-numerical",
        "calc-series",
        "calc-taylor"
      ]
    },
    {
      "id": "m3-multivariable",
      "title": "Cálculo multivariable",
      "description": "Derivadas parciales, gradiente, Jacobiano y Hessiano",
      "lessons": [
        "calc-multivariable",
        "calc-gradient",
        "calc-jacobian",
        "calc-multiple-integrals",
        "calc-hessian"
      ]
    },
    {
      "id": "m4-differential-equations",
      "title": "Dinámica continua",
      "description": "Ecuaciones diferenciales y aproximación numérica",
      "lessons": [
        "calc-odes"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "calc-limits": {
    "id": "calc-limits",
    "courseId": 30,
    "title": "Límites: comportamiento local y definiciones",
    "shortTitle": "Límites: comportamiento local y definiciones",
    "duration": 92,
    "objective": "calcular y justificar límites, distinguir valor de la función y comportamiento local, y reconocer cuándo hacen falta argumentos epsilon-delta o equivalentes.",
    "summary": [
      "El límite lim_{x→a} f(x)=L describe el comportamiento de f cerca de a; no exige que f(a) exista ni que sea igual a L.",
      "Las leyes algebraicas de límites requieren que los límites implicados existan y que operaciones como divisiones no introduzcan denominadores nulos en el paso final.",
      "La definición epsilon-delta formaliza que podemos hacer f(x) tan cercana a L como queramos haciendo x suficientemente cercana a a, sin exigir x=a."
    ],
    "concept": "El límite lim_{x→a} f(x)=L describe el comportamiento de f cerca de a; no exige que f(a) exista ni que sea igual a L.",
    "rules": [
      "El límite lim_{x→a} f(x)=L describe el comportamiento de f cerca de a; no exige que f(a) exista ni que sea igual a L.",
      "Las leyes algebraicas de límites requieren que los límites implicados existan y que operaciones como divisiones no introduzcan denominadores nulos en el paso final.",
      "La definición epsilon-delta formaliza que podemos hacer f(x) tan cercana a L como queramos haciendo x suficientemente cercana a a, sin exigir x=a."
    ],
    "deep": {
      "intro": "Una función puede tener un agujero, salto o valor redefinido en a y aun así poseer un límite. El límite es una afirmación local sobre valores cercanos, no una consulta del valor puntual.",
      "sections": [
        {
          "title": "Valor frente a límite",
          "body": "Una función puede tener un agujero, salto o valor redefinido en a y aun así poseer un límite. El límite es una afirmación local sobre valores cercanos, no una consulta del valor puntual."
        },
        {
          "title": "Definición epsilon-delta",
          "body": "Para todo ε>0 debe existir δ>0 tal que 0<|x-a|<δ implique |f(x)-L|<ε. El orden de cuantificadores importa: δ puede depender de ε, pero no del punto x elegido después."
        },
        {
          "title": "Indeterminaciones",
          "body": "Expresiones como 0/0 o ∞/∞ no son resultados; indican que la sustitución directa no decide el límite. Puede hacer falta factorizar, racionalizar, usar desigualdades o teoremas adicionales."
        },
        {
          "title": "Límites laterales e infinito",
          "body": "Un límite bilateral existe solo si coinciden los laterales. Los límites infinitos describen crecimiento sin cota y no convierten ∞ en un número real ordinario."
        }
      ]
    },
    "example": {
      "problem": "Calcula lim_{x→2} (x²-4)/(x-2).",
      "steps": [
        "La sustitución directa produce 0/0, una forma indeterminada.",
        "Factoriza x²-4=(x-2)(x+2).",
        "Para x≠2, simplifica a x+2 y toma el límite: 4."
      ],
      "solution": "El límite vale 4, aunque la expresión original no esté definida en x=2."
    },
    "check": {
      "question": "Si f(2)=100 pero lim_{x→2}f(x)=3, ¿hay contradicción?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí, el límite debe valer f(2)",
          false
        ],
        [
          "Solo si f es periódica",
          false
        ]
      ],
      "feedback": "No hay contradicción: el límite describe valores próximos. Igualdad con f(2) es la condición adicional de continuidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Calcula lim_{x→3}(2x+1).",
        "answer": "7",
        "hint": "Los polinomios son continuos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Calcula lim_{x→1}(x²-1)/(x-1).",
        "answer": "2",
        "hint": "Factoriza x²-1."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede existir lim_{x→0}f(x) si f(0) no está definida? sí/no",
        "answer": "si",
        "hint": "El límite excluye el punto x=a."
      }
    ]
  },
  "calc-continuity": {
    "id": "calc-continuity",
    "courseId": 30,
    "title": "Continuidad y teoremas de existencia",
    "shortTitle": "Continuidad y teoremas de existencia",
    "duration": 88,
    "objective": "usar continuidad con precisión y aplicar los teoremas de valor intermedio y extremo entendiendo sus hipótesis.",
    "summary": [
      "f es continua en a cuando f(a) existe, lim_{x→a}f(x) existe y ambos coinciden.",
      "La continuidad se preserva bajo suma, producto, composición y cociente donde el denominador no sea cero.",
      "Teoremas globales como valor intermedio y extremo necesitan hipótesis sobre intervalos y compacidad; no son consecuencias automáticas de tener una fórmula “bonita”."
    ],
    "concept": "f es continua en a cuando f(a) existe, lim_{x→a}f(x) existe y ambos coinciden.",
    "rules": [
      "f es continua en a cuando f(a) existe, lim_{x→a}f(x) existe y ambos coinciden.",
      "La continuidad se preserva bajo suma, producto, composición y cociente donde el denominador no sea cero.",
      "Teoremas globales como valor intermedio y extremo necesitan hipótesis sobre intervalos y compacidad; no son consecuencias automáticas de tener una fórmula “bonita”."
    ],
    "deep": {
      "intro": "Continuidad en a combina valor, límite y coincidencia. Una discontinuidad removible puede repararse redefiniendo un punto; un salto o una asíntota no.",
      "sections": [
        {
          "title": "Continuidad puntual",
          "body": "Continuidad en a combina valor, límite y coincidencia. Una discontinuidad removible puede repararse redefiniendo un punto; un salto o una asíntota no."
        },
        {
          "title": "Valor intermedio",
          "body": "Si f es continua en [a,b], entonces toma todo valor entre f(a) y f(b). Esto demuestra existencia de raíces cuando hay cambio de signo, pero no unicidad."
        },
        {
          "title": "Teorema del valor extremo",
          "body": "Una función continua en un compacto [a,b] alcanza máximo y mínimo. En intervalos abiertos o dominios no compactos esa conclusión puede fallar."
        },
        {
          "title": "Uniformidad y estabilidad conceptual",
          "body": "Continuidad puntual no implica uniformidad global. En análisis numérico y optimización importa distinguir propiedades locales de garantías globales."
        }
      ]
    },
    "example": {
      "problem": "Demuestra que x³+x-1 tiene al menos una raíz en (0,1).",
      "steps": [
        "Define f(x)=x³+x-1, continua por ser polinomio.",
        "f(0)=-1 y f(1)=1.",
        "Como 0 está entre -1 y 1, el teorema del valor intermedio garantiza c∈(0,1) con f(c)=0."
      ],
      "solution": "Existe al menos una raíz en (0,1); el argumento no demuestra por sí solo cuántas."
    },
    "check": {
      "question": "¿El cambio de signo más continuidad demuestra una raíz única?",
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
          "Solo para polinomios pares",
          false
        ]
      ],
      "feedback": "El valor intermedio demuestra existencia. Para unicidad hace falta información adicional, por ejemplo monotonicidad estricta."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿f(x)=1/x es continua en x=0? sí/no",
        "answer": "no",
        "hint": "Ni siquiera está definida allí."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una continua en [a,b] alcanza máximo y mínimo? sí/no",
        "answer": "si",
        "hint": "Teorema del valor extremo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una función continua en (0,1) tiene que estar acotada? sí/no",
        "answer": "no",
        "hint": "Piensa en 1/x."
      }
    ]
  },
  "calc-derivative": {
    "id": "calc-derivative",
    "courseId": 30,
    "title": "Derivada: tasa local y mejor aproximación lineal",
    "shortTitle": "Derivada: tasa local y mejor aproximación lineal",
    "duration": 92,
    "objective": "interpretar la derivada como límite de cocientes incrementales y como aproximación lineal local, no solo como una regla de símbolos.",
    "summary": [
      "f'(a)=lim_{h→0}[f(a+h)-f(a)]/h cuando ese límite existe.",
      "La derivabilidad implica continuidad, pero continuidad no implica derivabilidad.",
      "La derivada es la parte lineal de primer orden del cambio: f(a+h)=f(a)+f'(a)h+o(h)."
    ],
    "concept": "f'(a)=lim_{h→0}[f(a+h)-f(a)]/h cuando ese límite existe.",
    "rules": [
      "f'(a)=lim_{h→0}[f(a+h)-f(a)]/h cuando ese límite existe.",
      "La derivabilidad implica continuidad, pero continuidad no implica derivabilidad.",
      "La derivada es la parte lineal de primer orden del cambio: f(a+h)=f(a)+f'(a)h+o(h)."
    ],
    "deep": {
      "intro": "El cociente incremental compara cambio de salida y entrada. El límite elimina la escala finita y captura la respuesta infinitesimal de primer orden.",
      "sections": [
        {
          "title": "Definición local",
          "body": "El cociente incremental compara cambio de salida y entrada. El límite elimina la escala finita y captura la respuesta infinitesimal de primer orden."
        },
        {
          "title": "Aproximación lineal",
          "body": "La interpretación más potente es f(a+h)=f(a)+f'(a)h+error de orden menor que h. Esa idea generaliza directamente al Jacobiano multivariable."
        },
        {
          "title": "No derivabilidad",
          "body": "Esquinas, cúspides, tangentes verticales o oscilación pueden impedir una derivada finita aun cuando la función sea continua."
        },
        {
          "title": "Unidades",
          "body": "Si x tiene unidades U y f unidades V, f' tiene unidades V/U. Ignorar unidades es una manera eficiente de obtener una derivada algebraicamente elegante y físicamente absurda."
        }
      ]
    },
    "example": {
      "problem": "Usa la definición para derivar f(x)=x² en x=a.",
      "steps": [
        "Forma [(a+h)²-a²]/h.",
        "Expande: (2ah+h²)/h=2a+h para h≠0.",
        "Al hacer h→0 queda 2a."
      ],
      "solution": "f'(a)=2a."
    },
    "check": {
      "question": "¿Toda función continua es derivable?",
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
          "Solo si es acotada",
          false
        ]
      ],
      "feedback": "Derivable implica continua, pero la recíproca falla; |x| es continua y no derivable en 0."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Derivada de x³ en x=2.",
        "answer": "12",
        "hint": "f'(x)=3x²."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿|x| es derivable en 0? sí/no",
        "answer": "no",
        "hint": "Compara pendientes laterales."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Si f'(a)=0, ¿a debe ser máximo o mínimo? sí/no",
        "answer": "no",
        "hint": "x³ en 0 es contraejemplo."
      }
    ]
  },
  "calc-diff-rules": {
    "id": "calc-diff-rules",
    "courseId": 30,
    "title": "Reglas de derivación, cadena y derivación implícita",
    "shortTitle": "Reglas de derivación, cadena y derivación implícita",
    "duration": 92,
    "objective": "aplicar producto, cociente y regla de la cadena entendiendo la composición y usar derivación implícita sin perder las dependencias entre variables.",
    "summary": [
      "(fg)'=f'g+fg'; la derivada no distribuye sobre productos como si fuera una sustitución algebraica.",
      "La regla de la cadena compone sensibilidades: (f∘g)'(x)=f'(g(x))g'(x).",
      "En una relación F(x,y)=0 con y=y(x), derivar respecto a x exige incluir dy/dx donde aparezca y."
    ],
    "concept": "(fg)'=f'g+fg'; la derivada no distribuye sobre productos como si fuera una sustitución algebraica.",
    "rules": [
      "(fg)'=f'g+fg'; la derivada no distribuye sobre productos como si fuera una sustitución algebraica.",
      "La regla de la cadena compone sensibilidades: (f∘g)'(x)=f'(g(x))g'(x).",
      "En una relación F(x,y)=0 con y=y(x), derivar respecto a x exige incluir dy/dx donde aparezca y."
    ],
    "deep": {
      "intro": "Estas reglas surgen de la definición y controlan términos de primer orden. Memorizar sin reconocer la estructura suele producir errores al combinar capas.",
      "sections": [
        {
          "title": "Producto y cociente",
          "body": "Estas reglas surgen de la definición y controlan términos de primer orden. Memorizar sin reconocer la estructura suele producir errores al combinar capas."
        },
        {
          "title": "Regla de la cadena",
          "body": "La cadena es el prototipo del backpropagation: cambios locales se multiplican a través de composiciones. En varias variables se convertirá en producto de Jacobianos."
        },
        {
          "title": "Derivación implícita",
          "body": "Una ecuación puede definir localmente y como función de x bajo condiciones apropiadas. Derivar F(x,y(x))=0 produce F_x+F_y y'=0 cuando las derivadas existen."
        },
        {
          "title": "Diferenciación logarítmica",
          "body": "Tomar logaritmos puede simplificar productos y potencias variables, siempre respetando el dominio donde la transformación es válida."
        }
      ]
    },
    "example": {
      "problem": "Para x²+y²=25, halla dy/dx donde y≠0.",
      "steps": [
        "Deriva: 2x+2y·y'=0.",
        "Aísla y': 2y y'=-2x.",
        "Divide por 2y: y'=-x/y."
      ],
      "solution": "dy/dx=-x/y donde y≠0."
    },
    "check": {
      "question": "En d/dx[sin(x²)], ¿aparece un factor 2x?",
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
          "Solo si x>0",
          false
        ]
      ],
      "feedback": "Sí. La derivada exterior cos(x²) se multiplica por la derivada interior 2x."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Deriva x·e^x y evalúa en x=0.",
        "answer": "1",
        "hint": "Producto: e^x+x e^x."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Deriva ln(x²) para x≠0 y da el resultado.",
        "answer": "2/x",
        "hint": "Cadena: (1/x²)·2x."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Para xy=1, da y' en términos de x usando y=1/x.",
        "answer": "-1/x^2",
        "hint": "Deriva xy: y+xy'=0."
      }
    ]
  },
  "calc-integral": {
    "id": "calc-integral",
    "courseId": 30,
    "title": "Integral definida: acumulación, área firmada y Riemann",
    "shortTitle": "Integral definida: acumulación, área firmada y Riemann",
    "duration": 92,
    "objective": "interpretar la integral definida como límite de sumas, diferenciar área firmada de área geométrica y reconocer cuándo una función es integrable en sentido de Riemann.",
    "summary": [
      "La integral definida acumula contribuciones locales y puede definirse como límite de sumas de Riemann.",
      "∫_a^b f(x)dx es área firmada: regiones bajo el eje contribuyen negativamente.",
      "La linealidad permite separar sumas y escalares, pero la integral de un producto no factoriza en el producto de integrales en general."
    ],
    "concept": "La integral definida acumula contribuciones locales y puede definirse como límite de sumas de Riemann.",
    "rules": [
      "La integral definida acumula contribuciones locales y puede definirse como límite de sumas de Riemann.",
      "∫_a^b f(x)dx es área firmada: regiones bajo el eje contribuyen negativamente.",
      "La linealidad permite separar sumas y escalares, pero la integral de un producto no factoriza en el producto de integrales en general."
    ],
    "deep": {
      "intro": "Particionamos [a,b], elegimos puntos de muestra y sumamos f(x_i*)Δx_i. Si todas las particiones suficientemente finas convergen al mismo valor, obtenemos la integral de Riemann.",
      "sections": [
        {
          "title": "Sumas de Riemann",
          "body": "Particionamos [a,b], elegimos puntos de muestra y sumamos f(x_i*)Δx_i. Si todas las particiones suficientemente finas convergen al mismo valor, obtenemos la integral de Riemann."
        },
        {
          "title": "Área y acumulación",
          "body": "La integral modela más que área: masa desde densidad, carga desde corriente, distancia firmada desde velocidad o probabilidad desde densidad."
        },
        {
          "title": "Integrabilidad",
          "body": "Toda función continua en [a,b] es Riemann-integrable. Hay funciones discontinuas integrables, pero no toda función acotada lo es en el sentido de Riemann."
        },
        {
          "title": "Cambio de variable",
          "body": "La sustitución transforma simultáneamente integrando y diferencial. Es la versión integral de la regla de la cadena, no un simple renombrado de letras."
        }
      ]
    },
    "example": {
      "problem": "Calcula ∫_0^2 x² dx.",
      "steps": [
        "Una primitiva es x³/3.",
        "Evalúa en 2 y 0: 8/3-0.",
        "El resultado es 8/3."
      ],
      "solution": "∫_0^2 x² dx = 8/3."
    },
    "check": {
      "question": "¿Una integral definida puede ser negativa?",
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
          "Solo si el intervalo tiene longitud negativa",
          false
        ]
      ],
      "feedback": "Sí. La integral es área firmada/acumulación; f puede ser negativa en parte o todo el intervalo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Calcula ∫_0^1 2x dx.",
        "answer": "1",
        "hint": "Primitiva x²."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Calcula ∫_0^2 (3) dx.",
        "answer": "6",
        "hint": "Constante por longitud."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿En general ∫fg=(∫f)(∫g)? sí/no",
        "answer": "no",
        "hint": "La integral es lineal, no multiplicativa."
      }
    ]
  },
  "calc-ftc-numerical": {
    "id": "calc-ftc-numerical",
    "courseId": 30,
    "title": "Teorema Fundamental del Cálculo e integración numérica",
    "shortTitle": "Teorema Fundamental del Cálculo e integración numérica",
    "duration": 94,
    "objective": "conectar derivación e integración mediante el Teorema Fundamental y estimar integrales numéricamente con control explícito del error.",
    "summary": [
      "Si F(x)=∫_a^x f(t)dt y f es continua, entonces F'(x)=f(x).",
      "Si G'=f en [a,b], entonces ∫_a^b f=G(b)-G(a).",
      "Métodos numéricos como trapecios o Simpson aproximan integrales; un valor decimal sin estimación de error no es una garantía matemática."
    ],
    "concept": "Si F(x)=∫_a^x f(t)dt y f es continua, entonces F'(x)=f(x).",
    "rules": [
      "Si F(x)=∫_a^x f(t)dt y f es continua, entonces F'(x)=f(x).",
      "Si G'=f en [a,b], entonces ∫_a^b f=G(b)-G(a).",
      "Métodos numéricos como trapecios o Simpson aproximan integrales; un valor decimal sin estimación de error no es una garantía matemática."
    ],
    "deep": {
      "intro": "Una parte del teorema dice que acumular y luego derivar recupera la función; la otra permite evaluar integrales definidas con primitivas.",
      "sections": [
        {
          "title": "Las dos direcciones",
          "body": "Una parte del teorema dice que acumular y luego derivar recupera la función; la otra permite evaluar integrales definidas con primitivas."
        },
        {
          "title": "Condiciones",
          "body": "La continuidad es una hipótesis suficiente estándar para la forma básica. Versiones más generales existen, pero no debemos borrar las hipótesis al aplicar el resultado."
        },
        {
          "title": "Trapecios y Simpson",
          "body": "Estos métodos aproximan f por polinomios locales. Su error depende de regularidad, tamaño de paso y derivadas superiores bajo las hipótesis correspondientes."
        },
        {
          "title": "Cuadratura adaptativa",
          "body": "Una estrategia práctica refina donde la función es difícil. La estabilidad numérica y tolerancias importan tanto como la fórmula cerrada del método."
        }
      ]
    },
    "example": {
      "problem": "Sea F(x)=∫_1^x t³ dt. Calcula F'(2).",
      "steps": [
        "Por el Teorema Fundamental, F'(x)=x³.",
        "Sustituye x=2.",
        "F'(2)=8."
      ],
      "solution": "F'(2)=8."
    },
    "check": {
      "question": "¿Que un método numérico dé 3.14159 demuestra que el error es menor que 10^-5?",
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
          "Solo para Simpson",
          false
        ]
      ],
      "feedback": "No. Hace falta un análisis o estimador de error; muchos dígitos impresos no son una certificación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si F(x)=∫_0^x cos(t)dt, calcula F'(0).",
        "answer": "1",
        "hint": "FTC: F'(x)=cos x."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Calcula ∫_0^1 e^x dx.",
        "answer": "e-1",
        "hint": "Primitiva e^x."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más subintervalos siempre garantizan menor error para cualquier algoritmo y función? sí/no",
        "answer": "no",
        "hint": "La garantía depende del método, regularidad y aritmética."
      }
    ]
  },
  "calc-series": {
    "id": "calc-series",
    "courseId": 30,
    "title": "Sucesiones y series: convergencia y criterios",
    "shortTitle": "Sucesiones y series: convergencia y criterios",
    "duration": 94,
    "objective": "analizar convergencia de sucesiones y series, distinguir convergencia absoluta/condicional y aplicar criterios sin convertirlos en equivalencias cuando solo son suficientes.",
    "summary": [
      "Para que Σa_n converja es necesario que a_n→0, pero no es suficiente.",
      "La convergencia absoluta, Σ|a_n|<∞, implica convergencia; la recíproca puede fallar.",
      "Criterios de comparación, cociente, raíz e integral tienen hipótesis y zonas inconclusas; un resultado límite igual a 1 no decide por sí solo el cociente/raíz."
    ],
    "concept": "Para que Σa_n converja es necesario que a_n→0, pero no es suficiente.",
    "rules": [
      "Para que Σa_n converja es necesario que a_n→0, pero no es suficiente.",
      "La convergencia absoluta, Σ|a_n|<∞, implica convergencia; la recíproca puede fallar.",
      "Criterios de comparación, cociente, raíz e integral tienen hipótesis y zonas inconclusas; un resultado límite igual a 1 no decide por sí solo el cociente/raíz."
    ],
    "deep": {
      "intro": "Una sucesión estudia términos a_n; una serie estudia sumas parciales S_N=Σ_{n≤N}a_n. Confundir a_n→0 con S_N convergente es un error clásico.",
      "sections": [
        {
          "title": "Sucesiones frente a series",
          "body": "Una sucesión estudia términos a_n; una serie estudia sumas parciales S_N=Σ_{n≤N}a_n. Confundir a_n→0 con S_N convergente es un error clásico."
        },
        {
          "title": "Geométrica y p-series",
          "body": "Σ ar^n converge para |r|<1. Σ1/n^p converge iff p>1. Estos modelos sirven como patrones de comparación."
        },
        {
          "title": "Absoluta y condicional",
          "body": "La serie alternante armónica converge pero no absolutamente. Reordenar series condicionalmente puede alterar su suma; en series absolutamente convergentes, el comportamiento es mucho más estable."
        },
        {
          "title": "Criterios",
          "body": "Un criterio debe usarse bajo sus hipótesis. El test del cociente con límite L<1 da convergencia absoluta; L>1 divergencia; L=1 es inconcluso."
        }
      ]
    },
    "example": {
      "problem": "Determina si Σ_{n=0}∞ (1/2)^n converge y calcula su suma.",
      "steps": [
        "Es geométrica con a=1 y r=1/2.",
        "Como |r|<1, converge.",
        "Suma=1/(1-r)=2."
      ],
      "solution": "Converge a 2."
    },
    "check": {
      "question": "Si a_n→0, ¿Σa_n converge necesariamente?",
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
          "Solo si a_n>0",
          false
        ]
      ],
      "feedback": "No. La serie armónica tiene términos que tienden a 0 y aun así diverge."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Suma Σ_{n=0}∞(1/3)^n.",
        "answer": "3/2",
        "alternatives": [
          "1.5"
        ],
        "hint": "1/(1-1/3)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Σ 1/n² converge? sí/no",
        "answer": "si",
        "hint": "p-series con p=2."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Convergencia absoluta implica convergencia? sí/no",
        "answer": "si",
        "hint": "Sí; la recíproca no necesariamente."
      }
    ]
  },
  "calc-taylor": {
    "id": "calc-taylor",
    "courseId": 30,
    "title": "Series de Taylor, aproximación local y error",
    "shortTitle": "Series de Taylor, aproximación local y error",
    "duration": 94,
    "objective": "construir aproximaciones de Taylor, interpretar radio de convergencia y usar términos de resto para distinguir aproximación formal de garantía de error.",
    "summary": [
      "El polinomio de Taylor de orden n usa derivadas en un punto para igualar el comportamiento local hasta ese orden.",
      "Que una función sea infinitamente derivable no garantiza que su serie de Taylor converja a la función fuera —o incluso dentro— de una vecindad adecuada.",
      "El término de resto cuantifica el error bajo hipótesis; truncar una serie sin analizarlo es una aproximación, no una demostración de precisión."
    ],
    "concept": "El polinomio de Taylor de orden n usa derivadas en un punto para igualar el comportamiento local hasta ese orden.",
    "rules": [
      "El polinomio de Taylor de orden n usa derivadas en un punto para igualar el comportamiento local hasta ese orden.",
      "Que una función sea infinitamente derivable no garantiza que su serie de Taylor converja a la función fuera —o incluso dentro— de una vecindad adecuada.",
      "El término de resto cuantifica el error bajo hipótesis; truncar una serie sin analizarlo es una aproximación, no una demostración de precisión."
    ],
    "deep": {
      "intro": "P_n(x)=Σ_{k=0}^n f^(k)(a)(x-a)^k/k!. Igualar derivadas hace que el error local empiece en orden superior cuando las hipótesis son favorables.",
      "sections": [
        {
          "title": "Construcción",
          "body": "P_n(x)=Σ_{k=0}^n f^(k)(a)(x-a)^k/k!. Igualar derivadas hace que el error local empiece en orden superior cuando las hipótesis son favorables."
        },
        {
          "title": "Radio de convergencia",
          "body": "Una serie de potencias tiene un radio R: converge absolutamente dentro y diverge fuera; los extremos se analizan aparte."
        },
        {
          "title": "Resto",
          "body": "El resto de Lagrange da una cota usando una derivada de orden n+1 en el intervalo. La calidad depende de esa cota y de |x-a|."
        },
        {
          "title": "Analítica vs suave",
          "body": "Existen funciones C^∞ no analíticas cuya serie de Taylor no reconstruye la función. Suavidad infinita y analiticidad son propiedades distintas."
        }
      ]
    },
    "example": {
      "problem": "Aproxima e^1 con Taylor de orden 3 alrededor de 0.",
      "steps": [
        "e^x=1+x+x²/2!+x³/3!+...",
        "En x=1: 1+1+1/2+1/6.",
        "La aproximación es 8/3≈2.6667."
      ],
      "solution": "P_3(1)=8/3≈2.6667; no es el valor exacto de e."
    },
    "check": {
      "question": "¿Toda función C∞ coincide con su serie de Taylor?",
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
          "Solo si es positiva",
          false
        ]
      ],
      "feedback": "No. Analiticidad es una condición más fuerte que ser infinitamente derivable."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Taylor de orden 1 de e^x en 0: escribe a+bx.",
        "answer": "1+x",
        "hint": "f(0)=1 y f'(0)=1."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Radio de convergencia de Σx^n.",
        "answer": "1",
        "hint": "Serie geométrica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El resto es necesario para certificar una tolerancia de aproximación? sí/no",
        "answer": "si",
        "hint": "Un truncamiento por sí solo no da garantía de error."
      }
    ]
  },
  "calc-multivariable": {
    "id": "calc-multivariable",
    "courseId": 30,
    "title": "Funciones multivariables, continuidad y diferenciabilidad",
    "shortTitle": "Funciones multivariables, continuidad y diferenciabilidad",
    "duration": 94,
    "objective": "distinguir derivadas parciales, derivadas direccionales y diferenciabilidad total en varias variables, incluyendo los límites de comprobar solo caminos particulares.",
    "summary": [
      "Para f:R^n→R^m, la diferenciabilidad en a significa que existe una aplicación lineal que aproxima el incremento con error pequeño relativo a ||h||.",
      "La existencia de todas las derivadas parciales en un punto no garantiza por sí sola diferenciabilidad allí.",
      "Comprobar algunos caminos puede demostrar no existencia de un límite si dan valores distintos, pero que varios caminos coincidan no prueba un límite multivariable."
    ],
    "concept": "Para f:R^n→R^m, la diferenciabilidad en a significa que existe una aplicación lineal que aproxima el incremento con error pequeño relativo a ||h||.",
    "rules": [
      "Para f:R^n→R^m, la diferenciabilidad en a significa que existe una aplicación lineal que aproxima el incremento con error pequeño relativo a ||h||.",
      "La existencia de todas las derivadas parciales en un punto no garantiza por sí sola diferenciabilidad allí.",
      "Comprobar algunos caminos puede demostrar no existencia de un límite si dan valores distintos, pero que varios caminos coincidan no prueba un límite multivariable."
    ],
    "deep": {
      "intro": "x puede acercarse a a por infinitas trayectorias. Probar dos caminos basta para refutar si difieren, pero nunca basta en general para demostrar existencia.",
      "sections": [
        {
          "title": "Límites en varias dimensiones",
          "body": "x puede acercarse a a por infinitas trayectorias. Probar dos caminos basta para refutar si difieren, pero nunca basta en general para demostrar existencia."
        },
        {
          "title": "Diferenciabilidad total",
          "body": "f(a+h)=f(a)+L(h)+o(||h||), donde L es lineal. En coordenadas, L se representa por el Jacobiano."
        },
        {
          "title": "Parciales",
          "body": "Las parciales miran ejes coordenados. Si existen y son continuas en una vecindad, tenemos una condición suficiente útil para diferenciabilidad, aunque no necesaria en toda generalidad."
        },
        {
          "title": "Geometría local",
          "body": "Para una función escalar de dos variables, la diferenciabilidad produce un plano tangente que aproxima la superficie localmente."
        }
      ]
    },
    "example": {
      "problem": "Para f(x,y)=x²+3xy, calcula las parciales en (1,2).",
      "steps": [
        "f_x=2x+3y.",
        "f_y=3x.",
        "En (1,2): f_x=8 y f_y=3."
      ],
      "solution": "∂f/∂x=8 y ∂f/∂y=3 en (1,2)."
    },
    "check": {
      "question": "¿Tener todas las parciales en un punto garantiza diferenciabilidad?",
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
          "Solo en R²",
          false
        ]
      ],
      "feedback": "No. Las parciales son información direccional limitada; hacen falta condiciones adicionales para asegurar una aproximación lineal total."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Para f=x²+y², calcula f_x en (3,4).",
        "answer": "6",
        "hint": "f_x=2x."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Para f=x²+y², calcula f_y en (3,4).",
        "answer": "8",
        "hint": "f_y=2y."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Si dos caminos dan límites distintos, ¿el límite multivariable existe? sí/no",
        "answer": "no",
        "hint": "Un límite único no puede depender del camino."
      }
    ]
  },
  "calc-gradient": {
    "id": "calc-gradient",
    "courseId": 30,
    "title": "Gradiente, derivadas direccionales y geometría de nivel",
    "shortTitle": "Gradiente, derivadas direccionales y geometría de nivel",
    "duration": 94,
    "objective": "usar el gradiente para calcular tasas direccionales, reconocer dirección de máximo crecimiento local y relacionarlo con superficies de nivel.",
    "summary": [
      "Para f:R^n→R diferenciable, ∇f reúne las derivadas parciales en un vector.",
      "La derivada direccional en un vector unitario u es D_u f=∇f·u.",
      "Si ∇f≠0, el gradiente es normal a la superficie de nivel y apunta en la dirección de máximo incremento por unidad de distancia en la métrica euclídea."
    ],
    "concept": "Para f:R^n→R diferenciable, ∇f reúne las derivadas parciales en un vector.",
    "rules": [
      "Para f:R^n→R diferenciable, ∇f reúne las derivadas parciales en un vector.",
      "La derivada direccional en un vector unitario u es D_u f=∇f·u.",
      "Si ∇f≠0, el gradiente es normal a la superficie de nivel y apunta en la dirección de máximo incremento por unidad de distancia en la métrica euclídea."
    ],
    "deep": {
      "intro": "Para hablar de “máximo por unidad de distancia” se usa u unitario. Si no normalizas, escalar u escala también la derivada direccional.",
      "sections": [
        {
          "title": "Dirección y escala",
          "body": "Para hablar de “máximo por unidad de distancia” se usa u unitario. Si no normalizas, escalar u escala también la derivada direccional."
        },
        {
          "title": "Superficies de nivel",
          "body": "Sobre f(x)=c, un desplazamiento tangente v satisface localmente ∇f·v=0. Por eso el gradiente es normal a la superficie regular."
        },
        {
          "title": "Máximo crecimiento",
          "body": "Por Cauchy–Schwarz, ∇f·u≤||∇f|| para ||u||=1, con igualdad cuando u apunta como el gradiente."
        },
        {
          "title": "Métrica y coordenadas",
          "body": "La interpretación de “steepest descent” depende de la geometría/métrica usada; el gradiente euclídeo es una representación concreta del diferencial bajo ese producto interno."
        }
      ]
    },
    "example": {
      "problem": "Para f(x,y)=x²+y², calcula ∇f(3,4) y la derivada direccional hacia u=(3/5,4/5).",
      "steps": [
        "∇f=(2x,2y), luego ∇f(3,4)=(6,8).",
        "u ya es unitario.",
        "D_u f=(6,8)·(3/5,4/5)=10."
      ],
      "solution": "∇f=(6,8) y D_u f=10."
    },
    "check": {
      "question": "¿La derivada direccional estándar D_u f=∇f·u supone normalmente u unitario para interpretar “por unidad de distancia”?",
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
          "Solo en una dimensión",
          false
        ]
      ],
      "feedback": "Sí. La fórmula algebraica funciona con cualquier vector, pero la interpretación de tasa por unidad de distancia usa dirección normalizada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Para f=x²+y², da ∇f(1,2).",
        "answer": "2,4",
        "hint": "(2x,2y)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si ∇f=(3,4), ¿cuál es ||∇f||₂?",
        "answer": "5",
        "hint": "Pitágoras."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Si v es tangente a una curva de nivel regular, ¿∇f·v=0? sí/no",
        "answer": "si",
        "hint": "El valor de f no cambia a primer orden a lo largo del nivel."
      }
    ]
  },
  "calc-jacobian": {
    "id": "calc-jacobian",
    "courseId": 30,
    "title": "Jacobiano, diferencial total y regla de la cadena",
    "shortTitle": "Jacobiano, diferencial total y regla de la cadena",
    "duration": 96,
    "objective": "representar la derivada de funciones vectoriales mediante Jacobianos y componer sensibilidades con la regla de la cadena multivariable.",
    "summary": [
      "Para F:R^n→R^m diferenciable, el Jacobiano J_F(a) es la matriz de la aplicación lineal que aproxima el cambio local.",
      "La regla de la cadena es J_{G∘F}(x)=J_G(F(x))J_F(x), con dimensiones compatibles.",
      "El determinante Jacobiano de una transformación cuadrada mide escala local de volumen orientado, no la norma completa de la deformación."
    ],
    "concept": "Para F:R^n→R^m diferenciable, el Jacobiano J_F(a) es la matriz de la aplicación lineal que aproxima el cambio local.",
    "rules": [
      "Para F:R^n→R^m diferenciable, el Jacobiano J_F(a) es la matriz de la aplicación lineal que aproxima el cambio local.",
      "La regla de la cadena es J_{G∘F}(x)=J_G(F(x))J_F(x), con dimensiones compatibles.",
      "El determinante Jacobiano de una transformación cuadrada mide escala local de volumen orientado, no la norma completa de la deformación."
    ],
    "deep": {
      "intro": "DF(a)[h]≈F(a+h)-F(a). Elegidas bases canónicas, DF(a) se representa por una matriz m×n: el Jacobiano.",
      "sections": [
        {
          "title": "Diferencial como mapa lineal",
          "body": "DF(a)[h]≈F(a+h)-F(a). Elegidas bases canónicas, DF(a) se representa por una matriz m×n: el Jacobiano."
        },
        {
          "title": "Cadena matricial",
          "body": "Las sensibilidades se componen en el mismo orden que las transformaciones. Esta es la estructura matemática que explota backpropagation."
        },
        {
          "title": "Determinante Jacobiano",
          "body": "En cambios de variables R^n→R^n, |det J| corrige volumen. El valor cero señala pérdida de invertibilidad lineal local, pero la invertibilidad global requiere más."
        },
        {
          "title": "Convenciones",
          "body": "Algunas disciplinas usan convenciones de filas/columnas distintas para derivadas. La matemática es coherente si declaras formas y mantienes dimensiones; la notación sin dimensiones es terreno fértil para bugs."
        }
      ]
    },
    "example": {
      "problem": "Sea F(x,y)=(x²+y, xy). Calcula J_F(1,2).",
      "steps": [
        "Primera componente: derivadas (2x,1).",
        "Segunda componente: derivadas (y,x).",
        "En (1,2): [[2,1],[2,1]]."
      ],
      "solution": "J_F(1,2)=[[2,1],[2,1]], cuyo determinante es 0."
    },
    "check": {
      "question": "¿El Jacobiano de F:R^3→R^2 tiene tamaño 2×3 con la convención estándar de salidas por filas?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No, 3×2 siempre",
          false
        ],
        [
          "Solo si F es lineal",
          false
        ]
      ],
      "feedback": "Sí. Cada fila corresponde a una componente de salida y cada columna a una variable de entrada bajo esa convención."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Para F(x,y)=(x+y,x-y), calcula det J_F.",
        "answer": "-2",
        "hint": "J=[[1,1],[1,-1]]."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "F:R^5→R^3. ¿Cuántas filas tiene J_F con la convención estándar?",
        "answer": "3",
        "hint": "Una por componente de salida."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿det J≠0 en un punto garantiza invertibilidad global? sí/no",
        "answer": "no",
        "hint": "El teorema inverso da una conclusión local bajo hipótesis."
      }
    ]
  },
  "calc-multiple-integrals": {
  "id": "calc-multiple-integrals",
  "courseId": 30,
  "title": "Integrales múltiples y cambio de variables",
  "shortTitle": "Integrales múltiples y cambio de variables",
  "duration": 98,
  "objective": "calcular integrales dobles/triples, aplicar Fubini bajo hipótesis adecuadas y usar cambios de variables con el factor Jacobiano correcto.",
  "summary": [
    "Una integral múltiple acumula una densidad sobre regiones de dimensión mayor; el dominio geométrico forma parte del problema, no es decoración del integrando.",
    "Fubini/Tonelli permiten relacionar integrales múltiples e iteradas bajo hipótesis de integrabilidad o no negatividad apropiadas.",
    "En un cambio de variables, el elemento de volumen se escala por |det J|; omitirlo cambia la medida y, por tanto, la integral."
  ],
  "concept": "Una integral múltiple acumula una densidad sobre regiones de dimensión mayor; el dominio geométrico forma parte del problema, no es decoración del integrando.",
  "rules": [
    "Una integral múltiple acumula una densidad sobre regiones de dimensión mayor; el dominio geométrico forma parte del problema, no es decoración del integrando.",
    "Fubini/Tonelli permiten relacionar integrales múltiples e iteradas bajo hipótesis de integrabilidad o no negatividad apropiadas.",
    "En un cambio de variables, el elemento de volumen se escala por |det J|; omitirlo cambia la medida y, por tanto, la integral."
  ],
  "deep": {
    "intro": "En R² y R³ integramos sobre regiones, no simplemente “dos veces”. La descripción del dominio decide límites, orden de integración y si conviene cambiar coordenadas.",
    "sections": [
      {
        "title": "Dominio y orden",
        "body": "Una región D puede describirse con límites anidados de distintas maneras. Cambiar el orden de integración exige redescribir D correctamente; no basta con intercambiar los símbolos dx y dy."
      },
      {
        "title": "Fubini y Tonelli",
        "body": "Para funciones integrables, Fubini permite calcular mediante integrales iteradas. Tonelli da resultados potentes para funciones no negativas, incluso antes de saber integrabilidad absoluta. Las hipótesis importan especialmente en integrales impropias."
      },
      {
        "title": "Cambio de variables",
        "body": "Si x=T(u), el volumen local se transforma por |det J_T(u)|. El valor absoluto aparece porque la medida geométrica no cambia de signo al invertir orientación."
      },
      {
        "title": "Coordenadas polares",
        "body": "x=r cosθ, y=r sinθ tiene |det J|=r, por lo que dA=r dr dθ. Ese factor r no es una convención memorística: es la expansión local de área de la transformación."
      }
    ]
  },
  "example": {
    "problem": "Calcula ∬_D 1 dA sobre el disco unitario usando polares.",
    "steps": [
      "Usa x=r cosθ, y=r sinθ con 0≤r≤1 y 0≤θ≤2π.",
      "El Jacobiano tiene |det J|=r, así que dA=r dr dθ.",
      "Integra ∫_0^{2π}∫_0^1 r dr dθ = 2π·1/2 = π."
    ],
    "solution": "El área del disco unitario es π."
  },
  "check": {
    "question": "En polares, ¿dA es dr dθ o r dr dθ?",
    "options": [
      [
        "r dr dθ",
        true
      ],
      [
        "dr dθ",
        false
      ],
      [
        "r² dr dθ",
        false
      ]
    ],
    "feedback": "El factor r es |det J| de la transformación polar."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Calcula ∬_[0,1]×[0,2] 1 dA.",
      "answer": "2",
      "hint": "Es el área del rectángulo."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "Calcula ∫_0^1∫_0^1 (x+y) dy dx.",
      "answer": "1",
      "hint": "Integra y de 0 a 1 y después x."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "Para x=2u, y=3v, calcula |det J|.",
      "answer": "6",
      "hint": "J=diag(2,3)."
    }
  ]
},
  "calc-hessian": {
    "id": "calc-hessian",
    "courseId": 30,
    "title": "Hessiano, curvatura local y clasificación crítica",
    "shortTitle": "Hessiano, curvatura local y clasificación crítica",
    "duration": 98,
    "objective": "usar el Hessiano como información de segundo orden, clasificar puntos críticos bajo hipótesis apropiadas y reconocer casos degenerados donde el test es inconcluso.",
    "summary": [
      "Para f:R^n→R dos veces diferenciable, el Hessiano reúne segundas parciales y describe la parte cuadrática local.",
      "Si f es suficientemente regular, las parciales mixtas coinciden y el Hessiano es simétrico.",
      "En un punto crítico, Hessiano positivo definido implica mínimo local estricto; negativo definido máximo; indefinido silla; semidefinido puede ser inconcluso."
    ],
    "concept": "Para f:R^n→R dos veces diferenciable, el Hessiano reúne segundas parciales y describe la parte cuadrática local.",
    "rules": [
      "Para f:R^n→R dos veces diferenciable, el Hessiano reúne segundas parciales y describe la parte cuadrática local.",
      "Si f es suficientemente regular, las parciales mixtas coinciden y el Hessiano es simétrico.",
      "En un punto crítico, Hessiano positivo definido implica mínimo local estricto; negativo definido máximo; indefinido silla; semidefinido puede ser inconcluso."
    ],
    "deep": {
      "intro": "f(a+h)≈f(a)+∇f(a)^T h + 1/2 h^T H(a)h. En un punto crítico desaparece el término lineal y la forma cuadrática domina cuando no es degenerada.",
      "sections": [
        {
          "title": "Taylor de segundo orden",
          "body": "f(a+h)≈f(a)+∇f(a)^T h + 1/2 h^T H(a)h. En un punto crítico desaparece el término lineal y la forma cuadrática domina cuando no es degenerada."
        },
        {
          "title": "Definitud",
          "body": "Para Hessianos simétricos, signos de eigenvalues clasifican la forma cuadrática. Todos positivos: positiva definida; signos mezclados: indefinida."
        },
        {
          "title": "Casos degenerados",
          "body": "Si H es semidefinido o singular, el test de segundo orden puede no decidir. x^4 tiene Hessiano cero en 0 y aun así mínimo; x^3 también tiene segunda derivada cero y no es mínimo."
        },
        {
          "title": "Optimización numérica",
          "body": "Newton usa información de curvatura, pero un Hessiano mal condicionado o indefinido puede causar pasos problemáticos. La fórmula exacta no elimina necesidades de line search, damping o trust regions."
        }
      ]
    },
    "example": {
      "problem": "Clasifica el punto crítico (0,0) de f(x,y)=x²-y².",
      "steps": [
        "∇f=(2x,-2y), así que (0,0) es crítico.",
        "H=diag(2,-2).",
        "Tiene eigenvalues de signos opuestos: H es indefinido."
      ],
      "solution": "(0,0) es un punto silla."
    },
    "check": {
      "question": "Si el Hessiano es cero en un punto crítico, ¿el punto debe ser mínimo?",
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
          "Solo en R²",
          false
        ]
      ],
      "feedback": "No. El test de segundo orden es inconcluso en casos degenerados; hay que mirar órdenes superiores u otros argumentos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "H=diag(2,5) en un punto crítico. ¿Clasifica como mínimo local estricto? sí/no",
        "answer": "si",
        "hint": "Positiva definida."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "H=diag(-1,-3) en un punto crítico. ¿Clasifica como máximo local estricto? sí/no",
        "answer": "si",
        "hint": "Negativa definida."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "H tiene eigenvalues 2 y -1. ¿Es indefinido? sí/no",
        "answer": "si",
        "hint": "Signos mezclados."
      }
    ]
  },
  "calc-odes": {
    "id": "calc-odes",
    "courseId": 30,
    "title": "Ecuaciones diferenciales: modelos, existencia y métodos numéricos",
    "shortTitle": "Ecuaciones diferenciales: modelos, existencia y métodos numéricos",
    "duration": 104,
    "objective": "modelar ecuaciones diferenciales ordinarias, distinguir existencia y unicidad de solución, resolver casos básicos y analizar la estabilidad de discretizaciones como Euler.",
    "summary": [
      "Una ODE relaciona una función desconocida y sus derivadas; una condición inicial selecciona una trayectoria concreta entre las posibles soluciones.",
      "Existencia y unicidad dependen de hipótesis sobre el campo vectorial; resolver algebraicamente una fórmula no sustituye comprobar el dominio de validez.",
      "Los métodos numéricos discretizan la dinámica: consistencia, estabilidad y tamaño de paso determinan si la aproximación es útil."
    ],
    "concept": "Una ODE relaciona una función desconocida y sus derivadas; una condición inicial selecciona una trayectoria concreta entre las posibles soluciones.",
    "rules": [
      "Una ODE relaciona una función desconocida y sus derivadas; una condición inicial selecciona una trayectoria concreta entre las posibles soluciones.",
      "Existencia y unicidad dependen de hipótesis sobre el campo vectorial; resolver algebraicamente una fórmula no sustituye comprobar el dominio de validez.",
      "Los métodos numéricos discretizan la dinámica: consistencia, estabilidad y tamaño de paso determinan si la aproximación es útil."
    ],
    "deep": {
      "intro": "Un problema y'=f(t,y), y(t0)=y0 combina dinámica y estado inicial. Bajo hipótesis tipo Lipschitz local en y se obtienen resultados estándar de unicidad local.",
      "sections": [
        {
          "title": "Problemas de valor inicial",
          "body": "Un problema y'=f(t,y), y(t0)=y0 combina dinámica y estado inicial. Bajo hipótesis tipo Lipschitz local en y se obtienen resultados estándar de unicidad local."
        },
        {
          "title": "Ecuaciones separables y lineales",
          "body": "Algunas ODE admiten técnicas cerradas: separación dy/g(y)=h(t)dt o factor integrante para y'+p(t)y=q(t). Estas familias no cubren toda ODE."
        },
        {
          "title": "Euler explícito",
          "body": "y_{n+1}=y_n+h f(t_n,y_n). Es de primer orden y muy útil pedagógicamente, pero puede ser inestable para problemas stiff o pasos demasiado grandes."
        },
        {
          "title": "Error y estabilidad",
          "body": "Un error local pequeño no garantiza una trayectoria global buena si la dinámica amplifica errores. En simulación científica hay que distinguir error de truncamiento, redondeo y estabilidad del método."
        }
      ]
    },
    "example": {
      "problem": "Resuelve y'=2y, y(0)=3.",
      "steps": [
        "Separa: dy/y=2dt.",
        "Integra: ln|y|=2t+C, luego y=Ce^{2t}.",
        "Usa y(0)=3: C=3."
      ],
      "solution": "y(t)=3e^{2t}."
    },
    "check": {
      "question": "¿Euler explícito es estable para cualquier ODE si usamos cualquier paso h>0?",
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
          "Solo para ODE lineales",
          false
        ]
      ],
      "feedback": "No. La región de estabilidad depende del método y el problema; pasos grandes pueden producir crecimiento numérico artificial."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resuelve y'=y, y(0)=2: escribe la solución.",
        "answer": "2e^t",
        "hint": "y=Ce^t y C=2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Con Euler, y'=y, y0=1, h=0.1. ¿y1?",
        "answer": "1.1",
        "hint": "y1=y0+h*y0."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una condición inicial puede ser necesaria para seleccionar una solución concreta? sí/no",
        "answer": "si",
        "hint": "La ecuación diferencial sola suele describir una familia."
      }
    ]
  }
});
