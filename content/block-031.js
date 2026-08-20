/**
 * BLOQUE 031 — Probabilidad y estadística
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar probabilidad de frecuencia, dependencia de
 * correlación e inferencia de causalidad. Declarar modelo, muestreo y
 * condicionamiento antes de interpretar un número como evidencia.
 */
window.LEARNING_PATHS[31] = {
  "level": "Experto progresivo",
  "estimatedHours": 94,
  "description": "Probabilidad e inferencia estadística desde variables aleatorias y distribuciones hasta Bayes, muestreo, estimación, contrastes, correlación y regresión, con foco en interpretación y supuestos.",
  "outcomes": [
    "Modelar incertidumbre con variables aleatorias, distribuciones, momentos y condicionamiento.",
    "Razonar sobre dependencia, covarianza y Bayes sin confundir correlación con independencia o causalidad.",
    "Construir estimadores, intervalos y tests interpretando correctamente cobertura, p-values, potencia y sesgo.",
    "Analizar correlación y regresión separando predicción, asociación e inferencia causal."
  ],
  "modules": [
    {
      "id": "m1-foundations",
      "title": "Fundamentos de incertidumbre",
      "description": "Espacios, variables y distribuciones",
      "lessons": [
        "prob-foundations",
        "prob-random-variables",
        "prob-distributions"
      ]
    },
    {
      "id": "m2-moments-bayes",
      "title": "Momentos y dependencia",
      "description": "Esperanza, varianza, covarianza y Bayes",
      "lessons": [
        "prob-expectation-variance",
        "prob-covariance-independence",
        "prob-conditioning-bayes",
        "prob-gaussian"
      ]
    },
    {
      "id": "m3-inference",
      "title": "Muestreo e inferencia",
      "description": "LLN/CLT, estimación, intervalos y tests",
      "lessons": [
        "prob-sampling-lln-clt",
        "prob-estimation",
        "prob-confidence-intervals",
        "prob-hypothesis-testing"
      ]
    },
    {
      "id": "m4-modeling",
      "title": "Asociación y modelos",
      "description": "Correlación, regresión e integración",
      "lessons": [
        "prob-correlation",
        "prob-regression",
        "prob-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "prob-foundations": {
    "id": "prob-foundations",
    "courseId": 31,
    "title": "Probabilidad: espacio muestral, eventos y axiomas",
    "shortTitle": "Probabilidad: espacio muestral, eventos y axiomas",
    "duration": 88,
    "objective": "modelar experimentos aleatorios con espacios muestrales y eventos, aplicar los axiomas de probabilidad y distinguir modelo, frecuencia observada y creencia condicionada.",
    "summary": [
      "Un espacio de probabilidad separa resultados posibles, eventos y una medida P que satisface no negatividad, normalización y aditividad numerable.",
      "La frecuencia relativa puede aproximar probabilidades bajo repetición y supuestos adecuados, pero una muestra finita no define por sí sola la probabilidad verdadera.",
      "Complemento, unión e intersección se calculan con reglas derivadas de los axiomas; P(A∪B)=P(A)+P(B)-P(A∩B)."
    ],
    "concept": "Un espacio de probabilidad separa resultados posibles, eventos y una medida P que satisface no negatividad, normalización y aditividad numerable.",
    "rules": [
      "Un espacio de probabilidad separa resultados posibles, eventos y una medida P que satisface no negatividad, normalización y aditividad numerable.",
      "La frecuencia relativa puede aproximar probabilidades bajo repetición y supuestos adecuados, pero una muestra finita no define por sí sola la probabilidad verdadera.",
      "Complemento, unión e intersección se calculan con reglas derivadas de los axiomas; P(A∪B)=P(A)+P(B)-P(A∩B)."
    ],
    "deep": {
      "intro": "La probabilidad empieza antes de las fórmulas: hay que declarar qué resultados son posibles, qué eventos nos interesan y qué modelo asigna masa a esos eventos.",
      "sections": [
        {
          "title": "Modelo antes de calcular",
          "body": "El mismo fenómeno puede admitir distintos espacios muestrales válidos según el nivel de descripción. Cambiar el espacio sin actualizar el modelo puede cambiar el significado de una probabilidad."
        },
        {
          "title": "Axiomas y consecuencias",
          "body": "P(Ω)=1, P(A)≥0 y la aditividad para eventos disjuntos generan reglas como P(A^c)=1-P(A) y la fórmula de inclusión-exclusión para dos eventos."
        },
        {
          "title": "Probabilidad frente a frecuencia",
          "body": "Una frecuencia observada es un estadístico aleatorio. Con muchas repeticiones puede estabilizarse alrededor de la probabilidad bajo condiciones como independencia idéntica, pero no debe confundirse con la definición del modelo."
        },
        {
          "title": "Eventos imposibles y medida cero",
          "body": "P(A)=0 no siempre significa que A sea lógicamente imposible en modelos continuos; un punto individual puede tener probabilidad cero y aun pertenecer al espacio muestral."
        }
      ]
    },
    "example": {
      "problem": "En una baraja estándar, A=“carta roja” y B=“figura”. Calcula P(A∪B).",
      "steps": [
        "P(A)=26/52.",
        "P(B)=12/52.",
        "Hay 6 figuras rojas, así que P(A∩B)=6/52.",
        "P(A∪B)=26/52+12/52-6/52=32/52=8/13."
      ],
      "solution": "8/13."
    },
    "check": {
      "question": "Si P(A)=0.6, ¿P(A^c)=0.4?",
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
          "Solo si A y A^c son independientes",
          false
        ]
      ],
      "feedback": "Por complemento, P(A^c)=1-P(A)."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Calcula P(A^c) si P(A)=0.27.",
        "answer": "0.73",
        "hint": "Usa 1-P(A)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si A y B son disjuntos, P(A)=0.2 y P(B)=0.5, calcula P(A∪B).",
        "answer": "0.7",
        "hint": "La intersección vale 0."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede un resultado puntual de una variable continua tener probabilidad 0 sin ser imposible? sí/no",
        "answer": "si",
        "hint": "Piensa en un punto bajo una distribución continua."
      }
    ]
  },
  "prob-random-variables": {
    "id": "prob-random-variables",
    "courseId": 31,
    "title": "Variables aleatorias: funciones sobre resultados",
    "shortTitle": "Variables aleatorias: funciones sobre resultados",
    "duration": 90,
    "objective": "interpretar variables aleatorias como funciones medibles del espacio muestral y trabajar con variables discretas, continuas y transformaciones.",
    "summary": [
      "Una variable aleatoria X asigna un valor numérico a cada resultado; no es “un número que cambia solo” sino una función sobre Ω.",
      "En el caso discreto se describen masas p_X(x); en el continuo una densidad f_X integra probabilidades y no es una probabilidad puntual.",
      "Transformar Y=g(X) induce una nueva distribución; en variables continuas el cambio de variable requiere controlar cómo se deforman los intervalos."
    ],
    "concept": "Una variable aleatoria X asigna un valor numérico a cada resultado; no es “un número que cambia solo” sino una función sobre Ω.",
    "rules": [
      "Una variable aleatoria X asigna un valor numérico a cada resultado; no es “un número que cambia solo” sino una función sobre Ω.",
      "En el caso discreto se describen masas p_X(x); en el continuo una densidad f_X integra probabilidades y no es una probabilidad puntual.",
      "Transformar Y=g(X) induce una nueva distribución; en variables continuas el cambio de variable requiere controlar cómo se deforman los intervalos."
    ],
    "deep": {
      "intro": "La variable aleatoria traduce resultados posiblemente complejos a cantidades numéricas que podemos resumir, comparar y modelar.",
      "sections": [
        {
          "title": "Variable como función",
          "body": "X:Ω→R permite que muchos resultados diferentes tengan el mismo valor. El evento {X≤x} es un subconjunto de Ω y su probabilidad define la CDF."
        },
        {
          "title": "PMF, PDF y CDF",
          "body": "Una PMF suma a 1; una PDF integra a 1 pero puede superar 1 localmente. La CDF F_X(x)=P(X≤x) existe en ambos casos y es no decreciente."
        },
        {
          "title": "Transformaciones",
          "body": "Para Y=g(X), la distribución de Y depende de cómo g agrupa o estira valores. En transformaciones continuas monótonas aparece un factor Jacobiano."
        },
        {
          "title": "Soporte",
          "body": "El soporte indica dónde la variable puede concentrar masa o densidad. Fórmulas válidas fuera del soporte no deben interpretarse como probabilidades positivas."
        }
      ]
    },
    "example": {
      "problem": "X es el resultado de un dado justo y Y=X². ¿Cuál es P(Y≤9)?",
      "steps": [
        "Y≤9 equivale a X≤3 porque X es positivo.",
        "Los resultados favorables son 1,2,3.",
        "P=3/6."
      ],
      "solution": "1/2."
    },
    "check": {
      "question": "En una distribución continua, ¿f_X(x)=P(X=x)?",
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
          "Solo si f_X(x)<1",
          false
        ]
      ],
      "feedback": "La densidad no es una probabilidad puntual; la probabilidad se obtiene integrando."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Dado justo: X∈{1,...,6}. Calcula P(X>4).",
        "answer": "1/3",
        "hint": "Resultados 5 y 6."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si F_X(3)=0.8, ¿qué representa?",
        "answer": "P(X<=3)=0.8",
        "hint": "CDF = probabilidad acumulada."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede una densidad valer 2 en algún punto y seguir siendo válida? sí/no",
        "answer": "si",
        "hint": "Lo importante es que sea no negativa e integre 1."
      }
    ]
  },
  "prob-distributions": {
    "id": "prob-distributions",
    "courseId": 31,
    "title": "Distribuciones: familias, parámetros y soporte",
    "shortTitle": "Distribuciones: familias, parámetros y soporte",
    "duration": 94,
    "objective": "seleccionar e interpretar distribuciones Bernoulli, binomial, geométrica, Poisson, uniforme y exponencial según el mecanismo generador y sus supuestos.",
    "summary": [
      "Una familia de distribuciones codifica supuestos estructurales; elegirla requiere modelar el mecanismo, no solo ajustar una curva visualmente.",
      "Bernoulli modela un ensayo binario; binomial suma ensayos Bernoulli independientes con p común; Poisson modela conteos bajo un régimen de tasa.",
      "La exponencial es memoryless en tiempo continuo y la geométrica tiene la propiedad análoga en tiempo discreto."
    ],
    "concept": "Una familia de distribuciones codifica supuestos estructurales; elegirla requiere modelar el mecanismo, no solo ajustar una curva visualmente.",
    "rules": [
      "Una familia de distribuciones codifica supuestos estructurales; elegirla requiere modelar el mecanismo, no solo ajustar una curva visualmente.",
      "Bernoulli modela un ensayo binario; binomial suma ensayos Bernoulli independientes con p común; Poisson modela conteos bajo un régimen de tasa.",
      "La exponencial es memoryless en tiempo continuo y la geométrica tiene la propiedad análoga en tiempo discreto."
    ],
    "deep": {
      "intro": "Las distribuciones son modelos comprimidos de incertidumbre. Sus parámetros tienen significado solo dentro de los supuestos de la familia.",
      "sections": [
        {
          "title": "Discretas comunes",
          "body": "Bernoulli(p) toma 0/1; Bin(n,p) cuenta éxitos en n ensayos independientes con p constante; Poisson(λ) modela conteos con media λ en el intervalo modelado."
        },
        {
          "title": "Continuas comunes",
          "body": "Uniforme reparte densidad constante en un intervalo; Exponencial(λ) modela tiempos entre eventos en un proceso de Poisson ideal y tiene media 1/λ."
        },
        {
          "title": "Memorylessness",
          "body": "Para exponencial, P(T>s+t|T>s)=P(T>t). No es una propiedad genérica de tiempos de espera; usarla sin justificación puede sesgar modelos de fiabilidad."
        },
        {
          "title": "Modelo y diagnóstico",
          "body": "La distribución no se valida solo porque media y varianza coincidan. Hay que revisar soporte, colas, dependencia, dispersión y mecanismo generador."
        }
      ]
    },
    "example": {
      "problem": "X~Bin(10,0.2). Calcula E[X].",
      "steps": [
        "Para una binomial E[X]=np.",
        "n=10 y p=0.2.",
        "10·0.2=2."
      ],
      "solution": "2."
    },
    "check": {
      "question": "¿Una Binomial(n,p) estándar asume ensayos independientes con el mismo p?",
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
          "Solo cuando n es grande",
          false
        ]
      ],
      "feedback": "Es parte del modelo binomial estándar."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Para X~Bernoulli(0.3), calcula P(X=1).",
        "answer": "0.3",
        "hint": "El parámetro p es la probabilidad de éxito."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si N~Poisson(4), ¿cuál es E[N]?",
        "answer": "4",
        "hint": "La media de Poisson es λ."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La distribución exponencial es memoryless? sí/no",
        "answer": "si",
        "hint": "Es una propiedad característica de esta familia."
      }
    ]
  },
  "prob-expectation-variance": {
    "id": "prob-expectation-variance",
    "courseId": 31,
    "title": "Esperanza y varianza: centro, dispersión y linealidad",
    "shortTitle": "Esperanza y varianza: centro, dispersión y linealidad",
    "duration": 92,
    "objective": "calcular esperanza y varianza, usar linealidad sin exigir independencia y reconocer qué propiedades sí dependen de independencia.",
    "summary": [
      "La esperanza es un promedio ponderado teórico y es lineal siempre que las expectativas implicadas existan: E[aX+bY]=aE[X]+bE[Y].",
      "La varianza mide dispersión cuadrática alrededor de la media: Var(X)=E[(X-μ)²]=E[X²]-μ².",
      "Var(X+Y)=Var(X)+Var(Y)+2Cov(X,Y); solo desaparece el término cruzado cuando la covarianza es cero."
    ],
    "concept": "La esperanza es un promedio ponderado teórico y es lineal siempre que las expectativas implicadas existan: E[aX+bY]=aE[X]+bE[Y].",
    "rules": [
      "La esperanza es un promedio ponderado teórico y es lineal siempre que las expectativas implicadas existan: E[aX+bY]=aE[X]+bE[Y].",
      "La varianza mide dispersión cuadrática alrededor de la media: Var(X)=E[(X-μ)²]=E[X²]-μ².",
      "Var(X+Y)=Var(X)+Var(Y)+2Cov(X,Y); solo desaparece el término cruzado cuando la covarianza es cero."
    ],
    "deep": {
      "intro": "Esperanza y varianza resumen aspectos distintos: centro y dispersión. Ninguno describe por sí solo la forma completa de la distribución.",
      "sections": [
        {
          "title": "Linealidad de la esperanza",
          "body": "No hace falta independencia para sumar expectativas. Esta propiedad permite analizar sumas de indicadores y conteos incluso cuando los eventos interactúan."
        },
        {
          "title": "Varianza",
          "body": "La varianza cambia con la escala al cuadrado: Var(aX+b)=a²Var(X). La desviación estándar recupera las unidades originales."
        },
        {
          "title": "Suma de variables",
          "body": "La varianza de una suma depende de covarianzas. Independencia implica covarianza cero bajo momentos finitos, pero la recíproca no es cierta en general."
        },
        {
          "title": "Expectativa no es valor típico",
          "body": "Distribuciones asimétricas o pesadas pueden tener media lejos de la mediana o incluso esperanza inexistente. Un resumen debe interpretarse con la distribución."
        }
      ]
    },
    "example": {
      "problem": "X tiene E[X]=3 y Var(X)=4. Para Y=2X-5, calcula E[Y] y Var(Y).",
      "steps": [
        "E[Y]=2·3-5=1.",
        "Var(Y)=2²·4 porque restar una constante no cambia varianza.",
        "Var(Y)=16."
      ],
      "solution": "E[Y]=1, Var(Y)=16."
    },
    "check": {
      "question": "¿E[X+Y]=E[X]+E[Y] requiere independencia?",
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
          "Solo para variables gaussianas",
          false
        ]
      ],
      "feedback": "La linealidad de la esperanza no necesita independencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si E[X]=5, calcula E[3X+2].",
        "answer": "17",
        "hint": "Linealidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si Var(X)=9, calcula Var(-2X+7).",
        "answer": "36",
        "hint": "Multiplica por (-2)^2."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Var(X+Y)=Var(X)+Var(Y) siempre? sí/no",
        "answer": "no",
        "hint": "Falta el término 2Cov(X,Y)."
      }
    ]
  },
  "prob-covariance-independence": {
    "id": "prob-covariance-independence",
    "courseId": 31,
    "title": "Covarianza, correlación e independencia",
    "shortTitle": "Covarianza, correlación e independencia",
    "duration": 96,
    "objective": "distinguir dependencia, covarianza y correlación, interpretar matrices de covarianza y reconocer casos donde correlación cero no implica independencia.",
    "summary": [
      "Cov(X,Y)=E[(X-E[X])(Y-E[Y])] mide asociación lineal con escala; la correlación normaliza por desviaciones estándar.",
      "Independencia implica covarianza cero cuando existen segundos momentos, pero covarianza/correlación cero no implican independencia en general.",
      "La matriz de covarianza es simétrica y positiva semidefinida; su diagonal contiene varianzas y los términos fuera de diagonal codifican covarianzas."
    ],
    "concept": "Cov(X,Y)=E[(X-E[X])(Y-E[Y])] mide asociación lineal con escala; la correlación normaliza por desviaciones estándar.",
    "rules": [
      "Cov(X,Y)=E[(X-E[X])(Y-E[Y])] mide asociación lineal con escala; la correlación normaliza por desviaciones estándar.",
      "Independencia implica covarianza cero cuando existen segundos momentos, pero covarianza/correlación cero no implican independencia en general.",
      "La matriz de covarianza es simétrica y positiva semidefinida; su diagonal contiene varianzas y los términos fuera de diagonal codifican covarianzas."
    ],
    "deep": {
      "intro": "Dependencia es una propiedad de la distribución conjunta completa; correlación captura solo una clase de relación lineal.",
      "sections": [
        {
          "title": "Covarianza",
          "body": "El signo indica dirección lineal promedio, pero la magnitud depende de unidades. Tras normalizar se obtiene ρ∈[-1,1] cuando las desviaciones son positivas."
        },
        {
          "title": "Cero no significa independiente",
          "body": "Si X es simétrica alrededor de 0 y Y=X², puede ocurrir Cov(X,Y)=0 aunque Y esté completamente determinado por X."
        },
        {
          "title": "Matriz de covarianza",
          "body": "Para un vector aleatorio, Σ=E[(X-μ)(X-μ)^T]. Es PSD porque a^TΣa=Var(a^TX)≥0."
        },
        {
          "title": "Gaussianas",
          "body": "En una distribución conjunta multivariante gaussiana, covarianza cero sí implica independencia entre componentes correspondientes; es una propiedad especial de esa familia."
        }
      ]
    },
    "example": {
      "problem": "X es uniforme sobre {-1,0,1} y Y=X². ¿Pueden tener covarianza 0 y ser dependientes?",
      "steps": [
        "E[X]=0 y E[XY]=E[X³]=0, así que Cov(X,Y)=0.",
        "Pero Y está determinado por X: Y=0 exactamente cuando X=0 y Y=1 en los otros casos.",
        "Por ejemplo P(X=0,Y=0)=1/3, mientras P(X=0)P(Y=0)=1/9; no son independientes."
      ],
      "solution": "Sí: Cov(X,Y)=0 pero X e Y son dependientes."
    },
    "check": {
      "question": "¿Correlación cero implica independencia para variables arbitrarias?",
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
          "Solo si sus medias son cero",
          false
        ]
      ],
      "feedback": "Solo bajo estructuras especiales, como gaussianidad conjunta, la implicación inversa puede sostenerse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si Cov(X,Y)=6, σX=2 y σY=3, calcula ρ.",
        "answer": "1",
        "hint": "ρ=6/(2·3)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Independencia implica covarianza cero si existen segundos momentos? sí/no",
        "answer": "si",
        "hint": "Factoriza E[XY]=E[X]E[Y]."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una matriz de covarianza puede tener un eigenvalue negativo idealmente? sí/no",
        "answer": "no",
        "hint": "Debe ser positiva semidefinida."
      }
    ]
  },
  "prob-conditioning-bayes": {
    "id": "prob-conditioning-bayes",
    "courseId": 31,
    "title": "Probabilidad condicionada y teorema de Bayes",
    "shortTitle": "Probabilidad condicionada y teorema de Bayes",
    "duration": 100,
    "objective": "calcular probabilidades condicionadas y posteriores, distinguir P(A|B) de P(B|A) y usar Bayes con tasas base explícitas.",
    "summary": [
      "P(A|B)=P(A∩B)/P(B) para P(B)>0; condicionamiento restringe el universo probabilístico al evento observado.",
      "Bayes invierte una condición combinando likelihood y prior: P(H|E) ∝ P(E|H)P(H).",
      "Una prueba muy sensible puede producir muchos falsos positivos posteriores cuando la condición buscada tiene prevalencia baja."
    ],
    "concept": "P(A|B)=P(A∩B)/P(B) para P(B)>0; condicionamiento restringe el universo probabilístico al evento observado.",
    "rules": [
      "P(A|B)=P(A∩B)/P(B) para P(B)>0; condicionamiento restringe el universo probabilístico al evento observado.",
      "Bayes invierte una condición combinando likelihood y prior: P(H|E) ∝ P(E|H)P(H).",
      "Una prueba muy sensible puede producir muchos falsos positivos posteriores cuando la condición buscada tiene prevalencia baja."
    ],
    "deep": {
      "intro": "Bayes no es una fórmula para cambiar barras de dirección: es contabilidad coherente de evidencia, hipótesis y tasas base.",
      "sections": [
        {
          "title": "Condicionamiento",
          "body": "P(A|B) y P(B|A) responden preguntas diferentes. Intercambiarlas es el prosecutor’s fallacy en algunos contextos forenses."
        },
        {
          "title": "Bayes",
          "body": "P(H|E)=P(E|H)P(H)/P(E), con P(E) obtenido por partición de hipótesis cuando sea necesario."
        },
        {
          "title": "Tasas base",
          "body": "El posterior depende de la prevalencia. Una tasa de falsos positivos pequeña puede dominar si hay muchísimos negativos reales."
        },
        {
          "title": "Odds y likelihood ratios",
          "body": "En forma de odds, posterior odds = prior odds × likelihood ratio. Esta forma separa evidencia del punto de partida probabilístico."
        }
      ]
    },
    "example": {
      "problem": "En una población, prevalencia 1%, sensibilidad 99% y especificidad 95%. Aproxima P(enfermedad|positivo).",
      "steps": [
        "En 10,000 personas: ~100 enfermas, 9900 no enfermas.",
        "Positivos verdaderos≈99; falsos positivos≈495.",
        "Posterior≈99/(99+495)=1/6."
      ],
      "solution": "≈16.7%."
    },
    "check": {
      "question": "¿P(A|B)=P(B|A) en general?",
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
          "Sí si P(A)>0",
          false
        ]
      ],
      "feedback": "Son condicionales distintos; Bayes relaciona ambos mediante priors."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si P(A∩B)=0.2 y P(B)=0.5, calcula P(A|B).",
        "answer": "0.4",
        "hint": "Divide intersección por P(B)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Bayes necesita una tasa base/prior? sí/no",
        "answer": "si",
        "hint": "El posterior combina likelihood con prior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Una prueba con sensibilidad 100% ¿garantiza que todo positivo sea caso real? sí/no",
        "answer": "no",
        "hint": "Depende también de especificidad y prevalencia."
      }
    ]
  },
  "prob-gaussian": {
    "id": "prob-gaussian",
    "courseId": 31,
    "title": "Distribución gaussiana y normal multivariante",
    "shortTitle": "Distribución gaussiana y normal multivariante",
    "duration": 92,
    "objective": "trabajar con gaussianas univariantes y multivariantes, estandarizar variables y comprender el papel geométrico de media y covarianza.",
    "summary": [
      "Una normal univariante N(μ,σ²) queda determinada por media y varianza; estandarizar produce Z=(X-μ)/σ.",
      "La normal multivariante usa un vector de medias μ y matriz de covarianza Σ; sus contornos de densidad son elipsoides cuando Σ es positiva definida.",
      "Las combinaciones lineales de un vector gaussiano conjunto siguen siendo gaussianas, una propiedad central en inferencia y procesamiento de señales."
    ],
    "concept": "Una normal univariante N(μ,σ²) queda determinada por media y varianza; estandarizar produce Z=(X-μ)/σ.",
    "rules": [
      "Una normal univariante N(μ,σ²) queda determinada por media y varianza; estandarizar produce Z=(X-μ)/σ.",
      "La normal multivariante usa un vector de medias μ y matriz de covarianza Σ; sus contornos de densidad son elipsoides cuando Σ es positiva definida.",
      "Las combinaciones lineales de un vector gaussiano conjunto siguen siendo gaussianas, una propiedad central en inferencia y procesamiento de señales."
    ],
    "deep": {
      "intro": "La gaussiana aparece por propiedades algebraicas y teoremas límite, pero “muchas cosas son normales” no es una licencia para ignorar colas, asimetrías o truncamientos.",
      "sections": [
        {
          "title": "Univariante",
          "body": "La densidad es simétrica alrededor de μ. La varianza controla escala, pero eventos puntuales siguen teniendo probabilidad cero."
        },
        {
          "title": "Estandarización",
          "body": "Z=(X-μ)/σ convierte N(μ,σ²) en N(0,1), permitiendo usar una CDF común."
        },
        {
          "title": "Multivariante",
          "body": "Σ define orientación y escala de elipsoides. Si Σ es singular, la distribución puede concentrarse en un subespacio y no tener densidad ordinaria respecto a volumen completo."
        },
        {
          "title": "Cierre lineal",
          "body": "Si X es gaussiano conjunto, AX+b también lo es, con media Aμ+b y covarianza AΣA^T."
        }
      ]
    },
    "example": {
      "problem": "X~N(10,4). ¿Cuál es el z-score de x=14?",
      "steps": [
        "σ=2 porque la varianza es 4.",
        "z=(14-10)/2.",
        "=2."
      ],
      "solution": "2."
    },
    "check": {
      "question": "En N(μ,σ²), ¿σ² es la varianza?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No, es la desviación estándar",
          false
        ],
        [
          "Solo si μ=0",
          false
        ]
      ],
      "feedback": "La notación estándar usa σ² como varianza y σ como desviación estándar."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "X~N(5,9). ¿σ?",
        "answer": "3",
        "hint": "Raíz cuadrada de la varianza."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Estandariza x=7 si μ=5 y σ=2.",
        "answer": "1",
        "hint": "(7-5)/2."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una transformación lineal de un vector gaussiano conjunto sigue siendo gaussiana? sí/no",
        "answer": "si",
        "hint": "Propiedad de cierre lineal."
      }
    ]
  },
  "prob-sampling-lln-clt": {
    "id": "prob-sampling-lln-clt",
    "courseId": 31,
    "title": "Muestreo, Ley de los Grandes Números y CLT",
    "shortTitle": "Muestreo, Ley de los Grandes Números y CLT",
    "duration": 102,
    "objective": "distinguir población, muestra y distribución muestral, y usar LLN/CLT con sus hipótesis y límites.",
    "summary": [
      "Una muestra aleatoria es un mecanismo de selección; sesgo de cobertura o dependencia no desaparecen aumentando n.",
      "La Ley de los Grandes Números describe convergencia de promedios muestrales hacia la esperanza bajo hipótesis adecuadas.",
      "El Teorema Central del Límite describe la distribución normalizada de sumas/promedios en regímenes asintóticos; no afirma que los datos originales se vuelvan gaussianos."
    ],
    "concept": "Una muestra aleatoria es un mecanismo de selección; sesgo de cobertura o dependencia no desaparecen aumentando n.",
    "rules": [
      "Una muestra aleatoria es un mecanismo de selección; sesgo de cobertura o dependencia no desaparecen aumentando n.",
      "La Ley de los Grandes Números describe convergencia de promedios muestrales hacia la esperanza bajo hipótesis adecuadas.",
      "El Teorema Central del Límite describe la distribución normalizada de sumas/promedios en regímenes asintóticos; no afirma que los datos originales se vuelvan gaussianos."
    ],
    "deep": {
      "intro": "Muestrear no es copiar filas de una tabla: el diseño de muestreo determina qué inferencias son justificables.",
      "sections": [
        {
          "title": "Población y muestra",
          "body": "La población es el objeto inferencial; la muestra es el conjunto observado bajo un mecanismo de selección. Sesgo de selección rompe representatividad aunque n sea enorme."
        },
        {
          "title": "LLN",
          "body": "Bajo condiciones estándar, el promedio converge hacia μ. Es una afirmación sobre estabilización, no sobre que una muestra concreta sea exacta."
        },
        {
          "title": "CLT",
          "body": "Con varianza finita y condiciones adecuadas, sqrt(n)(X̄-μ)/σ tiende a N(0,1). El tamaño “suficientemente grande” depende de la distribución y dependencia."
        },
        {
          "title": "Dependencia y heavy tails",
          "body": "Series temporales, clusters y colas pesadas pueden requerir versiones diferentes o invalidar aproximaciones ingenuas. iid es una hipótesis, no un ritual."
        }
      ]
    },
    "example": {
      "problem": "Si σ=10 y n=100 observaciones iid, ¿cuál es el error estándar de la media?",
      "steps": [
        "SE=σ/√n.",
        "10/√100=10/10.",
        "=1."
      ],
      "solution": "1."
    },
    "check": {
      "question": "¿El CLT dice que los datos originales se vuelven normales cuando n crece?",
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
          "Solo si la media es cero",
          false
        ]
      ],
      "feedback": "Describe la distribución normalizada de sumas/promedios, no transforma los datos originales."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si σ=12 y n=36, calcula SE de la media.",
        "answer": "2",
        "hint": "σ/√n."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una muestra enorme corrige automáticamente sesgo de selección? sí/no",
        "answer": "no",
        "hint": "Más datos sesgados pueden dar una estimación muy precisa del objetivo equivocado."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿LLN y CLT son el mismo teorema? sí/no",
        "answer": "no",
        "hint": "Uno trata convergencia del promedio; otro su distribución asintótica normalizada."
      }
    ]
  },
  "prob-estimation": {
    "id": "prob-estimation",
    "courseId": 31,
    "title": "Estimación: sesgo, varianza, consistencia y likelihood",
    "shortTitle": "Estimación: sesgo, varianza, consistencia y likelihood",
    "duration": 100,
    "objective": "comparar estimadores mediante sesgo, varianza, MSE y consistencia, y construir estimadores por máxima verosimilitud sin confundir parámetro con variable aleatoria.",
    "summary": [
      "Un estimador es una función de la muestra y por tanto una variable aleatoria antes de observar datos; una estimación es su valor realizado.",
      "MSE(θ̂)=Var(θ̂)+Bias(θ̂)², lo que expone el trade-off sesgo-varianza.",
      "La máxima verosimilitud elige parámetros que hacen los datos observados relativamente más plausibles dentro del modelo; no es P(θ|datos)."
    ],
    "concept": "Un estimador es una función de la muestra y por tanto una variable aleatoria antes de observar datos; una estimación es su valor realizado.",
    "rules": [
      "Un estimador es una función de la muestra y por tanto una variable aleatoria antes de observar datos; una estimación es su valor realizado.",
      "MSE(θ̂)=Var(θ̂)+Bias(θ̂)², lo que expone el trade-off sesgo-varianza.",
      "La máxima verosimilitud elige parámetros que hacen los datos observados relativamente más plausibles dentro del modelo; no es P(θ|datos)."
    ],
    "deep": {
      "intro": "Inferir un parámetro exige separar el parámetro fijo del mecanismo aleatorio que genera datos y estimadores.",
      "sections": [
        {
          "title": "Estimador vs estimación",
          "body": "θ̂(X1,...,Xn) es aleatorio antes de muestrear; tras observar los datos obtenemos un número. Confundir ambos borra la distribución muestral."
        },
        {
          "title": "Sesgo y MSE",
          "body": "Un estimador insesgado puede tener varianza enorme. MSE combina ambas fuentes de error cuadrático y permite comparar compromisos."
        },
        {
          "title": "Consistencia",
          "body": "Consistencia significa que θ̂_n converge al parámetro cuando n crece bajo el modelo. No garantiza buen comportamiento para n pequeño."
        },
        {
          "title": "Máxima verosimilitud",
          "body": "MLE maximiza L(θ;data)=p(data|θ). La likelihood se ve como función de θ con los datos fijos; no es una distribución posterior sin prior/normalización."
        }
      ]
    },
    "example": {
      "problem": "Dos estimadores: A tiene sesgo 0 y varianza 9; B sesgo 1 y varianza 4. ¿Cuál tiene menor MSE?",
      "steps": [
        "MSE_A=9.",
        "MSE_B=4+1²=5.",
        "B tiene menor MSE."
      ],
      "solution": "B."
    },
    "check": {
      "question": "¿La likelihood L(θ;data) es automáticamente P(θ|data)?",
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
          "Solo para gaussianas",
          false
        ]
      ],
      "feedback": "La likelihood es p(data|θ) vista como función de θ; una posterior requiere Bayes y un prior."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Estimador con bias=2 y varianza=5. Calcula MSE.",
        "answer": "9",
        "hint": "5+2^2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un estimador consistente tiene que ser insesgado para todo n? sí/no",
        "answer": "no",
        "hint": "Consistencia es asintótica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿MLE maximiza p(datos|parámetro)? sí/no",
        "answer": "si",
        "hint": "Eso define la likelihood."
      }
    ]
  },
  "prob-confidence-intervals": {
    "id": "prob-confidence-intervals",
    "courseId": 31,
    "title": "Intervalos de confianza y cobertura frecuentista",
    "shortTitle": "Intervalos de confianza y cobertura frecuentista",
    "duration": 96,
    "objective": "construir e interpretar intervalos de confianza, distinguir cobertura de probabilidad posterior y reconocer el impacto de supuestos y selección.",
    "summary": [
      "Un intervalo de confianza frecuentista es un procedimiento aleatorio cuya cobertura a largo plazo es el nivel nominal bajo el modelo.",
      "Tras observar un intervalo clásico, el parámetro fijo no adquiere automáticamente probabilidad 95% de estar dentro; esa es una lectura bayesiana distinta.",
      "La anchura depende de variabilidad, tamaño muestral y nivel de confianza, además de correcciones por diseño o estimación de varianza."
    ],
    "concept": "Un intervalo de confianza frecuentista es un procedimiento aleatorio cuya cobertura a largo plazo es el nivel nominal bajo el modelo.",
    "rules": [
      "Un intervalo de confianza frecuentista es un procedimiento aleatorio cuya cobertura a largo plazo es el nivel nominal bajo el modelo.",
      "Tras observar un intervalo clásico, el parámetro fijo no adquiere automáticamente probabilidad 95% de estar dentro; esa es una lectura bayesiana distinta.",
      "La anchura depende de variabilidad, tamaño muestral y nivel de confianza, además de correcciones por diseño o estimación de varianza."
    ],
    "deep": {
      "intro": "“95% de confianza” describe el procedimiento de construcción antes de observar los datos, no una probabilidad posterior automática sobre un parámetro fijo.",
      "sections": [
        {
          "title": "Cobertura",
          "body": "Si repetimos muestreo y construcción bajo las hipótesis, alrededor del 95% de los intervalos de un procedimiento 95% cubrirán θ."
        },
        {
          "title": "Media con SE",
          "body": "En aproximaciones normales, X̄±z*SE ilustra la estructura. Cuando σ es desconocida y los supuestos son apropiados aparece la distribución t."
        },
        {
          "title": "Anchura",
          "body": "Más confianza ensancha el intervalo; más información efectiva suele estrecharlo. Dependencia y diseño complejo cambian el error estándar."
        },
        {
          "title": "Selección y multiplicidad",
          "body": "Construir intervalos después de seleccionar hipótesis o variables puede destruir cobertura nominal. La inferencia debe reflejar el proceso de análisis."
        }
      ]
    },
    "example": {
      "problem": "Media 100, SE=5 y aproximación z 95% con 1.96. ¿Intervalo?",
      "steps": [
        "Margen=1.96·5=9.8.",
        "Límite inferior=90.2.",
        "Superior=109.8."
      ],
      "solution": "[90.2,109.8]."
    },
    "check": {
      "question": "En un IC frecuentista clásico 95% ya observado, ¿es correcto decir automáticamente P(θ dentro)=0.95?",
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
          "Sí si n>30",
          false
        ]
      ],
      "feedback": "La interpretación frecuentista es de cobertura del procedimiento, no posterior sobre θ fijo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Media=20, SE=2, usa z*=2. Da intervalo aproximado.",
        "answer": "16,24",
        "hint": "20±4."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Subir el nivel de confianza suele ensanchar el intervalo? sí/no",
        "answer": "si",
        "hint": "Hace falta mayor margen."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Duplicar n siempre divide el SE por 2? sí/no",
        "answer": "no",
        "hint": "En iid con varianza fija, SE escala como 1/√n."
      }
    ]
  },
  "prob-hypothesis-testing": {
    "id": "prob-hypothesis-testing",
    "courseId": 31,
    "title": "Contrastes de hipótesis, p-values y errores",
    "shortTitle": "Contrastes de hipótesis, p-values y errores",
    "duration": 104,
    "objective": "formular hipótesis, interpretar p-values, errores tipo I/II, potencia y multiplicidad sin confundir significancia con efecto o probabilidad de la hipótesis.",
    "summary": [
      "Un p-value es la probabilidad, bajo H0 y el modelo del test, de observar un estadístico al menos tan extremo como el observado; no es P(H0|datos).",
      "El nivel α controla una tasa de error tipo I bajo el procedimiento y supuestos; la potencia es P(rechazar H0|alternativa específica).",
      "Un efecto puede ser estadísticamente significativo y prácticamente irrelevante; tamaño de efecto e incertidumbre deben acompañar el test."
    ],
    "concept": "Un p-value es la probabilidad, bajo H0 y el modelo del test, de observar un estadístico al menos tan extremo como el observado; no es P(H0|datos).",
    "rules": [
      "Un p-value es la probabilidad, bajo H0 y el modelo del test, de observar un estadístico al menos tan extremo como el observado; no es P(H0|datos).",
      "El nivel α controla una tasa de error tipo I bajo el procedimiento y supuestos; la potencia es P(rechazar H0|alternativa específica).",
      "Un efecto puede ser estadísticamente significativo y prácticamente irrelevante; tamaño de efecto e incertidumbre deben acompañar el test."
    ],
    "deep": {
      "intro": "Los tests son procedimientos de decisión bajo un modelo, no máquinas que imprimen la probabilidad de que una teoría sea verdadera.",
      "sections": [
        {
          "title": "Hipótesis y estadístico",
          "body": "H0/H1, estadístico y regla de rechazo deben definirse antes de mirar el resultado idealmente. El null determina la distribución de referencia."
        },
        {
          "title": "p-value",
          "body": "p pequeño indica datos poco compatibles con H0 según el estadístico, no una probabilidad posterior de H0 ni el tamaño del efecto."
        },
        {
          "title": "Errores y potencia",
          "body": "Tipo I: rechazar H0 siendo cierta; tipo II: no rechazar bajo una alternativa. La potencia depende de efecto, n, ruido y α."
        },
        {
          "title": "Multiplicidad y p-hacking",
          "body": "Probar muchas hipótesis y reportar solo las significativas infla falsos positivos. Correcciones y preregistro atacan partes distintas del problema."
        }
      ]
    },
    "example": {
      "problem": "Un estudio reporta p=0.03 con α=0.05. ¿P(H0)=3%?",
      "steps": [
        "No.",
        "p=0.03 se calcula suponiendo H0.",
        "Para P(H0|datos) haría falta un modelo bayesiano con prior."
      ],
      "solution": "No; p-value no es probabilidad posterior de H0."
    },
    "check": {
      "question": "¿p=0.01 significa que H0 tiene 1% de probabilidad de ser cierta?",
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
          "Solo con n grande",
          false
        ]
      ],
      "feedback": "El p-value condiciona en H0; no asigna probabilidad a H0."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Con α=0.05 y p=0.2, ¿rechazas H0 por esa regla? sí/no",
        "answer": "no",
        "hint": "p>α."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Aumentar n puede hacer significativo un efecto muy pequeño? sí/no",
        "answer": "si",
        "hint": "La precisión puede aumentar aun si el efecto es minúsculo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Probar 100 hipótesis al 5% sin ajuste mantiene 5% de probabilidad de al menos un falso positivo? sí/no",
        "answer": "no",
        "hint": "La tasa familiar puede crecer mucho."
      }
    ]
  },
  "prob-correlation": {
    "id": "prob-correlation",
    "courseId": 31,
    "title": "Correlación: asociación, no causalidad",
    "shortTitle": "Correlación: asociación, no causalidad",
    "duration": 90,
    "objective": "interpretar Pearson y Spearman, reconocer no linealidad, outliers, variables de confusión y el límite causal de datos observacionales.",
    "summary": [
      "La correlación de Pearson normaliza covarianza y mide asociación lineal; Spearman opera sobre rangos y captura asociación monótona.",
      "Una correlación alta no demuestra causalidad: confusión, selección, causalidad inversa o variables latentes pueden producirla.",
      "Correlación cercana a cero puede ocultar relaciones no lineales fuertes; visualizar la distribución conjunta sigue siendo esencial."
    ],
    "concept": "La correlación de Pearson normaliza covarianza y mide asociación lineal; Spearman opera sobre rangos y captura asociación monótona.",
    "rules": [
      "La correlación de Pearson normaliza covarianza y mide asociación lineal; Spearman opera sobre rangos y captura asociación monótona.",
      "Una correlación alta no demuestra causalidad: confusión, selección, causalidad inversa o variables latentes pueden producirla.",
      "Correlación cercana a cero puede ocultar relaciones no lineales fuertes; visualizar la distribución conjunta sigue siendo esencial."
    ],
    "deep": {
      "intro": "Un único coeficiente comprime una nube de puntos hasta un número. Esa compresión es útil y peligrosa a la vez.",
      "sections": [
        {
          "title": "Pearson",
          "body": "ρ=Cov(X,Y)/(σXσY) mide alineamiento lineal estandarizado. Es sensible a outliers y puede ser engañoso en mezclas o relaciones curvas."
        },
        {
          "title": "Spearman",
          "body": "Correlaciona rangos y detecta relaciones monótonas aunque no lineales. Tampoco demuestra causalidad ni inmunidad total a estructura compleja."
        },
        {
          "title": "Confusión",
          "body": "Una tercera variable puede explicar parte o toda la asociación. Ajustar por variables requiere un modelo causal/estadístico; controlar indiscriminadamente también puede sesgar."
        },
        {
          "title": "Visualización",
          "body": "Datasets con el mismo coeficiente pueden tener geometrías radicalmente distintas. Scatterplots, residuales y estratificación son parte del análisis, no decoración."
        }
      ]
    },
    "example": {
      "problem": "X uniforme simétrica y Y=X². ¿Puede Pearson ser 0 aunque Y dependa de X?",
      "steps": [
        "Sí.",
        "La relación es no lineal y simétrica.",
        "Los productos XY=X³ pueden promediar a 0."
      ],
      "solution": "Sí."
    },
    "check": {
      "question": "¿ρ=0 demuestra independencia para variables arbitrarias?",
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
          "Sí si tienen varianza finita",
          false
        ]
      ],
      "feedback": "Correlación cero elimina asociación lineal, no toda dependencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Pearson es invariante a cambios positivos de escala lineal? sí/no",
        "answer": "si",
        "hint": "Normaliza por desviaciones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Spearman trabaja con rangos? sí/no",
        "answer": "si",
        "hint": "Es una correlación de rangos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlación alta prueba causalidad? sí/no",
        "answer": "no",
        "hint": "Hace falta razonamiento/diseño causal."
      }
    ]
  },
  "prob-regression": {
    "id": "prob-regression",
    "courseId": 31,
    "title": "Regresión lineal: modelo, mínimos cuadrados e inferencia",
    "shortTitle": "Regresión lineal: modelo, mínimos cuadrados e inferencia",
    "duration": 108,
    "objective": "ajustar e interpretar regresión lineal, analizar residuales y separar predicción, asociación e inferencia causal.",
    "summary": [
      "La regresión lineal modela E[Y|X] o una relación aproximada mediante parámetros; OLS minimiza la suma de cuadrados residuales.",
      "Los coeficientes dependen de las variables incluidas, escalas y colinealidad; un coeficiente no es automáticamente un efecto causal.",
      "Las fórmulas inferenciales clásicas requieren supuestos sobre el error y diseño; heterocedasticidad, dependencia y selección pueden exigir métodos distintos."
    ],
    "concept": "La regresión lineal modela E[Y|X] o una relación aproximada mediante parámetros; OLS minimiza la suma de cuadrados residuales.",
    "rules": [
      "La regresión lineal modela E[Y|X] o una relación aproximada mediante parámetros; OLS minimiza la suma de cuadrados residuales.",
      "Los coeficientes dependen de las variables incluidas, escalas y colinealidad; un coeficiente no es automáticamente un efecto causal.",
      "Las fórmulas inferenciales clásicas requieren supuestos sobre el error y diseño; heterocedasticidad, dependencia y selección pueden exigir métodos distintos."
    ],
    "deep": {
      "intro": "Regresión es una familia de modelos y objetivos. Ajustar una recta no convierte la recta en una ley causal.",
      "sections": [
        {
          "title": "OLS",
          "body": "En y=Xβ+ε, OLS minimiza ||y-Xβ||². Con rango completo, β̂=(X^TX)^{-1}X^Ty conceptualmente; numéricamente QR/SVD suelen ser preferibles."
        },
        {
          "title": "Interpretación",
          "body": "Un coeficiente mide cambio condicional dentro del modelo, manteniendo otras covariables fijas. Cambiar especificación puede cambiar coeficientes por confusión, colinealidad o mediación."
        },
        {
          "title": "Residuales",
          "body": "Patrones en residuales pueden revelar no linealidad, heterocedasticidad, dependencia o puntos influyentes. R² no certifica que el modelo sea correcto."
        },
        {
          "title": "Predicción vs causalidad",
          "body": "Un predictor excelente puede explotar correlaciones no causales. Para intervención causal hacen falta supuestos/diseños adicionales como randomización o identificación."
        }
      ]
    },
    "example": {
      "problem": "Modelo y=2+3x. ¿Predicción en x=4?",
      "steps": [
        "Sustituye x=4.",
        "2+3·4=14.",
        "=14."
      ],
      "solution": "14."
    },
    "check": {
      "question": "¿Un coeficiente OLS positivo demuestra que aumentar X causará aumentar Y?",
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
          "Sí si R²>0.9",
          false
        ]
      ],
      "feedback": "La causalidad requiere supuestos o diseño adicionales."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "En y=5-2x, predice y para x=3.",
        "answer": "-1",
        "hint": "5-6."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿OLS minimiza suma de cuadrados residuales? sí/no",
        "answer": "si",
        "hint": "Ese es su criterio estándar."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿R² alto garantiza residuos bien comportados? sí/no",
        "answer": "no",
        "hint": "R² no diagnostica todos los supuestos."
      }
    ]
  },
  "prob-integration": {
    "id": "prob-integration",
    "courseId": 31,
    "title": "Integración estadística: del modelo a una conclusión reproducible",
    "shortTitle": "Integración estadística: del modelo a una conclusión reproducible",
    "duration": 112,
    "objective": "diseñar un análisis probabilístico completo: pregunta, mecanismo de muestreo, modelo, estimación, incertidumbre, diagnóstico y comunicación responsable.",
    "summary": [
      "Un análisis reproducible empieza por la pregunta y el mecanismo de datos, no por seleccionar el test que produce el menor p-value.",
      "Estimación, intervalos, tests y predicción responden preguntas distintas y deben acompañarse de supuestos, diagnósticos y tamaños de efecto.",
      "La incertidumbre incluye variabilidad muestral, sesgo, medición, missingness, dependencia y decisiones analíticas; un único error estándar no captura todos los fallos posibles."
    ],
    "concept": "Un análisis reproducible empieza por la pregunta y el mecanismo de datos, no por seleccionar el test que produce el menor p-value.",
    "rules": [
      "Un análisis reproducible empieza por la pregunta y el mecanismo de datos, no por seleccionar el test que produce el menor p-value.",
      "Estimación, intervalos, tests y predicción responden preguntas distintas y deben acompañarse de supuestos, diagnósticos y tamaños de efecto.",
      "La incertidumbre incluye variabilidad muestral, sesgo, medición, missingness, dependencia y decisiones analíticas; un único error estándar no captura todos los fallos posibles."
    ],
    "deep": {
      "intro": "La estadística útil es una cadena de inferencias auditable. Cada flecha puede introducir supuestos y cada supuesto debería ser visible.",
      "sections": [
        {
          "title": "Pregunta y estimando",
          "body": "Define qué población, parámetro o predicción interesa. Un análisis técnicamente perfecto del estimando equivocado sigue respondiendo la pregunta equivocada."
        },
        {
          "title": "Diseño y calidad de datos",
          "body": "Documenta muestreo, missingness, unidades, transformaciones y leakage. Separar train/test no corrige sesgo de selección del universo de datos."
        },
        {
          "title": "Estimación e incertidumbre",
          "body": "Reporta tamaño de efecto, intervalo o distribución predictiva según el objetivo. Evita convertir “no significativo” en “no hay efecto”."
        },
        {
          "title": "Reproducibilidad y sensibilidad",
          "body": "Congela seeds cuando proceda, conserva código/datos/versiones y realiza análisis de sensibilidad a decisiones razonables. Las conclusiones robustas deberían sobrevivir variaciones justificadas del pipeline."
        }
      ]
    },
    "example": {
      "problem": "Un A/B test tiene p=0.01 pero mejora 0.01% una métrica. ¿Qué falta para decidir?",
      "steps": [
        "Tamaño de efecto y su incertidumbre.",
        "Coste/beneficio y relevancia práctica.",
        "Diseño, multiplicidad y posibles sesgos."
      ],
      "solution": "La significancia sola no decide utilidad."
    },
    "check": {
      "question": "¿“No significativo” equivale a demostrar que el efecto es exactamente cero?",
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
          "Sí cuando p>0.5",
          false
        ]
      ],
      "feedback": "No rechazar H0 no prueba igualdad exacta; puede haber poca potencia o efecto compatible con varios valores."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debe documentarse el mecanismo de muestreo en un análisis inferencial? sí/no",
        "answer": "si",
        "hint": "Determina qué población puede representarse."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un intervalo estrecho elimina sesgo sistemático? sí/no",
        "answer": "no",
        "hint": "Precisión no corrige necesariamente sesgo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Significancia estadística implica importancia práctica? sí/no",
        "answer": "no",
        "hint": "Hay que mirar magnitud y contexto."
      }
    ]
  }
});
