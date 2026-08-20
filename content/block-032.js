/**
 * BLOQUE 032 — Optimización
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar formulación, certificado matemático y algoritmo
 * numérico. Convergencia de un optimizador no certifica que la función de
 * coste represente correctamente el objetivo real.
 */
window.LEARNING_PATHS[32] = {
  "level": "Experto progresivo",
  "estimatedHours": 102,
  "description": "Optimización desde formulación y convexidad hasta métodos de primer/segundo orden, restricciones, dualidad, problemas combinatorios y diagnóstico numérico.",
  "outcomes": [
    "Formular objetivos y restricciones distinguiendo proxy, factibilidad y criterio real.",
    "Analizar gradiente, SGD, momentum, Newton y quasi-Newton según geometría y coste computacional.",
    "Usar proyección, Lagrange, KKT y dualidad declarando las hipótesis de validez.",
    "Evaluar optimización combinatoria, conditioning, regularización y trade-offs con criterios reproducibles."
  ],
  "modules": [
    {
      "id": "m1-formulation",
      "title": "Formulación y geometría",
      "description": "Objetivos, convexidad y optimalidad",
      "lessons": [
        "opt-objective-modeling",
        "opt-convexity",
        "opt-first-order"
      ]
    },
    {
      "id": "m2-first-second-order",
      "title": "Métodos iterativos",
      "description": "Gradiente, SGD, momentum y Newton",
      "lessons": [
        "opt-gradient-descent",
        "opt-sgd",
        "opt-momentum",
        "opt-newton-quasi"
      ]
    },
    {
      "id": "m3-constraints-duality",
      "title": "Restricciones y dualidad",
      "description": "Factibilidad, KKT y cotas",
      "lessons": [
        "opt-constraints",
        "opt-lagrange-kkt",
        "opt-duality"
      ]
    },
    {
      "id": "m4-combinatorial-numerical",
      "title": "Problemas reales",
      "description": "Discreto, robustez numérica y trade-offs",
      "lessons": [
        "opt-combinatorial",
        "opt-numerical",
        "opt-multiobjective-regularization",
        "opt-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "opt-objective-modeling": {
    "id": "opt-objective-modeling",
    "courseId": 32,
    "title": "Objetivos, variables y funciones de coste",
    "shortTitle": "Objetivos, variables y funciones de coste",
    "duration": 92,
    "objective": "formular problemas de optimización separando variables de decisión, objetivo, restricciones, parámetros y criterios de evaluación.",
    "summary": [
      "Un problema de optimización declara variables de decisión, una función objetivo y, si existen, restricciones; cambiar cualquiera de esas piezas cambia el problema.",
      "Minimizar una función proxy no garantiza optimizar el objetivo real del sistema; la función de coste codifica prioridades y trade-offs.",
      "Escalas, unidades y regularización afectan la geometría numérica y deben documentarse antes de comparar algoritmos."
    ],
    "concept": "Un problema de optimización declara variables de decisión, una función objetivo y, si existen, restricciones; cambiar cualquiera de esas piezas cambia el problema.",
    "rules": [
      "Un problema de optimización declara variables de decisión, una función objetivo y, si existen, restricciones; cambiar cualquiera de esas piezas cambia el problema.",
      "Minimizar una función proxy no garantiza optimizar el objetivo real del sistema; la función de coste codifica prioridades y trade-offs.",
      "Escalas, unidades y regularización afectan la geometría numérica y deben documentarse antes de comparar algoritmos."
    ],
    "deep": {
      "intro": "Formular problemas de optimización separando variables de decisión, objetivo, restricciones, parámetros y criterios de evaluación..",
      "sections": [
        {
          "title": "Del objetivo real al objetivo matemático",
          "body": "Tiempo, energía, error, coste monetario o riesgo pueden competir. Una función escalar es una decisión de modelado, no una verdad natural."
        },
        {
          "title": "Variables, parámetros y restricciones",
          "body": "x es aquello que el optimizador puede cambiar; datos y parámetros del entorno no deben confundirse con decisiones. Las restricciones delimitan el conjunto factible."
        },
        {
          "title": "Costes proxy y métricas",
          "body": "Una loss de entrenamiento puede ser diferenciable y conveniente pero no idéntica a la métrica de negocio o seguridad. Optimizar el proxy puede producir soluciones adversas si está mal alineado."
        },
        {
          "title": "Escalado y unidades",
          "body": "Dos términos con magnitudes muy distintas pueden dominar por pura escala. Normalizar o ponderar debe justificarse por significado y condicionamiento."
        }
      ]
    },
    "example": {
      "problem": "Un sistema elige frecuencia f para minimizar E(f)=f²+4/f con f>0. ¿Qué representa el problema?",
      "steps": [
        "La variable de decisión es f.",
        "El objetivo es E(f).",
        "La restricción f>0 delimita el dominio factible.",
        "Los coeficientes codifican el modelo energético; no son universales."
      ],
      "solution": "Una optimización escalar restringida en una variable."
    },
    "check": {
      "question": "¿Una función de coste es necesariamente idéntica al objetivo real del sistema?",
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
          "Solo si es convexa",
          false
        ]
      ],
      "feedback": "Una loss es un modelo cuantitativo del objetivo y puede ser un proxy imperfecto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "En min_x (x-3)^2, identifica la variable de decisión.",
        "answer": "x",
        "hint": "Es la cantidad que puede cambiar el optimizador."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "En min_{x,y} x^2+y^2 sujeto a x+y=1, ¿x+y=1 forma parte del objetivo? sí/no",
        "answer": "no",
        "hint": "Es una restricción."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Multiplicar toda la función objetivo por una constante positiva cambia el argmin de un problema sin otras modificaciones? sí/no",
        "answer": "no",
        "hint": "Preserva el orden de todos los valores."
      }
    ]
  },
  "opt-convexity": {
    "id": "opt-convexity",
    "courseId": 32,
    "title": "Convexidad: geometría de objetivos y conjuntos",
    "shortTitle": "Convexidad: geometría de objetivos y conjuntos",
    "duration": 98,
    "objective": "reconocer conjuntos y funciones convexas y usar sus consecuencias para distinguir garantías globales de comportamiento local.",
    "summary": [
      "Un conjunto convexo contiene el segmento entre cualesquiera dos de sus puntos.",
      "f es convexa si f(θx+(1-θ)y)≤θf(x)+(1-θ)f(y) para θ∈[0,1].",
      "En un problema convexo, todo mínimo local es global; eso no significa que cualquier algoritmo encuentre el mínimo instantáneamente."
    ],
    "concept": "Un conjunto convexo contiene el segmento entre cualesquiera dos de sus puntos.",
    "rules": [
      "Un conjunto convexo contiene el segmento entre cualesquiera dos de sus puntos.",
      "f es convexa si f(θx+(1-θ)y)≤θf(x)+(1-θ)f(y) para θ∈[0,1].",
      "En un problema convexo, todo mínimo local es global; eso no significa que cualquier algoritmo encuentre el mínimo instantáneamente."
    ],
    "deep": {
      "intro": "Reconocer conjuntos y funciones convexas y usar sus consecuencias para distinguir garantías globales de comportamiento local..",
      "sections": [
        {
          "title": "Conjuntos convexos",
          "body": "La factibilidad convexa evita agujeros y regiones desconectadas a lo largo de segmentos. Intersecciones de conjuntos convexos siguen siendo convexas."
        },
        {
          "title": "Funciones convexas",
          "body": "La cuerda queda por encima de la gráfica. Para funciones dos veces diferenciables, Hessiano positivo semidefinido en un dominio convexo es un criterio útil."
        },
        {
          "title": "Mínimo local frente a global",
          "body": "La convexidad elimina mínimos locales estrictamente peores, pero puede haber múltiples minimizadores y regiones planas."
        },
        {
          "title": "Convexidad estricta y fuerte",
          "body": "Convexidad estricta ayuda a unicidad; convexidad fuerte impone curvatura cuantitativa y permite cotas de convergencia más fuertes."
        }
      ]
    },
    "example": {
      "problem": "Demuestra que f(x)=x² es convexa.",
      "steps": [
        "f''(x)=2.",
        "2≥0 para todo x.",
        "En R, Hessiano no negativo implica convexidad para una función C²."
      ],
      "solution": "f(x)=x² es convexa y estrictamente convexa."
    },
    "check": {
      "question": "En un problema convexo, ¿todo mínimo local es global?",
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
      "feedback": "Ésa es una de las propiedades centrales de la convexidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El intervalo [0,1] es convexo? sí/no",
        "answer": "si",
        "hint": "Todo segmento entre dos puntos del intervalo permanece dentro."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿f(x)=|x| es convexa aunque no sea diferenciable en 0? sí/no",
        "answer": "si",
        "hint": "Convexidad no exige diferenciabilidad."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La suma de dos funciones convexas es convexa? sí/no",
        "answer": "si",
        "hint": "La desigualdad convexa se conserva al sumar."
      }
    ]
  },
  "opt-first-order": {
    "id": "opt-first-order",
    "courseId": 32,
    "title": "Optimalidad de primer orden y geometría local",
    "shortTitle": "Optimalidad de primer orden y geometría local",
    "duration": 96,
    "objective": "interpretar gradientes, condiciones estacionarias y desigualdades de primer orden sin confundirlas con garantías universales de mínimo.",
    "summary": [
      "En un punto interior diferenciable, un mínimo local necesita ∇f(x*)=0, pero esa condición no es suficiente en problemas no convexos.",
      "Para f convexa diferenciable, f(y)≥f(x)+∇f(x)^T(y-x); un gradiente cero sí certifica mínimo global.",
      "Con restricciones, la dirección de descenso debe respetar la geometría del conjunto factible."
    ],
    "concept": "En un punto interior diferenciable, un mínimo local necesita ∇f(x*)=0, pero esa condición no es suficiente en problemas no convexos.",
    "rules": [
      "En un punto interior diferenciable, un mínimo local necesita ∇f(x*)=0, pero esa condición no es suficiente en problemas no convexos.",
      "Para f convexa diferenciable, f(y)≥f(x)+∇f(x)^T(y-x); un gradiente cero sí certifica mínimo global.",
      "Con restricciones, la dirección de descenso debe respetar la geometría del conjunto factible."
    ],
    "deep": {
      "intro": "Interpretar gradientes, condiciones estacionarias y desigualdades de primer orden sin confundirlas con garantías universales de mínimo..",
      "sections": [
        {
          "title": "Estacionariedad",
          "body": "∇f=0 identifica candidatos interiores. Puntos silla y máximos también pueden ser estacionarios."
        },
        {
          "title": "Desigualdad de soporte convexa",
          "body": "El plano tangente de una función convexa queda por debajo de la función y transforma una condición local en una garantía global."
        },
        {
          "title": "Direcciones factibles",
          "body": "En una frontera puede no existir gradiente cero aunque el punto sea óptimo; lo relevante es que no haya dirección factible de descenso."
        },
        {
          "title": "Condiciones y certificados",
          "body": "Las condiciones de optimalidad dependen de suavidad y restricciones; declarar hipótesis evita convertir heurísticas en teoremas."
        }
      ]
    },
    "example": {
      "problem": "Para f(x)=x^4-x², ¿x=0 es estacionario y es mínimo?",
      "steps": [
        "f'(x)=4x³-2x.",
        "f'(0)=0.",
        "f''(0)=-2<0.",
        "Por tanto x=0 es máximo local, no mínimo."
      ],
      "solution": "Estacionario no implica mínimo."
    },
    "check": {
      "question": "¿∇f(x)=0 basta para demostrar mínimo global de una función diferenciable arbitraria?",
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
          "Solo si la dimensión es 1",
          false
        ]
      ],
      "feedback": "Hace falta estructura adicional, por ejemplo convexidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Para f(x)=(x-2)^2, resuelve f'(x)=0.",
        "answer": "2",
        "hint": "Deriva 2(x-2)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿En una función convexa diferenciable, ∇f=0 certifica mínimo global? sí/no",
        "answer": "si",
        "hint": "Usa la desigualdad de primer orden."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un óptimo restringido en la frontera necesita siempre ∇f=0? sí/no",
        "answer": "no",
        "hint": "Puede no haber direcciones factibles de descenso aunque el gradiente no sea cero."
      }
    ]
  },
  "opt-gradient-descent": {
    "id": "opt-gradient-descent",
    "courseId": 32,
    "title": "Gradiente descendente y tamaño de paso",
    "shortTitle": "Gradiente descendente y tamaño de paso",
    "duration": 104,
    "objective": "analizar gradiente descendente como discretización iterativa y comprender el papel del learning rate, suavidad, condicionamiento y criterios de parada.",
    "summary": [
      "Gradiente descendente usa x_{k+1}=x_k-α_k∇f(x_k); el signo y la escala del paso importan tanto como el gradiente.",
      "Un α demasiado grande puede oscilar o divergir aun en una cuadrática convexa; un α demasiado pequeño puede converger de forma desesperadamente lenta.",
      "Condicionamiento y suavidad controlan la geometría de convergencia; reducir la loss no certifica por sí solo proximidad al óptimo."
    ],
    "concept": "Gradiente descendente usa x_{k+1}=x_k-α_k∇f(x_k); el signo y la escala del paso importan tanto como el gradiente.",
    "rules": [
      "Gradiente descendente usa x_{k+1}=x_k-α_k∇f(x_k); el signo y la escala del paso importan tanto como el gradiente.",
      "Un α demasiado grande puede oscilar o divergir aun en una cuadrática convexa; un α demasiado pequeño puede converger de forma desesperadamente lenta.",
      "Condicionamiento y suavidad controlan la geometría de convergencia; reducir la loss no certifica por sí solo proximidad al óptimo."
    ],
    "deep": {
      "intro": "Analizar gradiente descendente como discretización iterativa y comprender el papel del learning rate, suavidad, condicionamiento y criterios de parada..",
      "sections": [
        {
          "title": "Actualización básica",
          "body": "El gradiente da la dirección de máximo crecimiento euclídeo, por eso -∇f es dirección local de descenso cuando el gradiente no es cero."
        },
        {
          "title": "Learning rate",
          "body": "En una cuadrática f(x)=1/2 λx², la iteración es x_{k+1}=(1-αλ)x_k; la estabilidad depende de |1-αλ|<1."
        },
        {
          "title": "Condicionamiento",
          "body": "Valles alargados producen zig-zag y velocidades diferentes por dirección. Precondicionar intenta cambiar coordenadas para mejorar esa geometría."
        },
        {
          "title": "Parada y diagnóstico",
          "body": "Norma de gradiente, cambio de objetivo, feasibility y presupuesto son señales distintas. Una sola tolerancia no mide todos los errores."
        }
      ]
    },
    "example": {
      "problem": "Para f(x)=x² y α=0.25, ¿cómo evoluciona x?",
      "steps": [
        "∇f=2x.",
        "x_{k+1}=x_k-0.25·2x_k=0.5x_k.",
        "La magnitud se reduce a la mitad cada iteración."
      ],
      "solution": "Converge linealmente a 0."
    },
    "check": {
      "question": "¿Un learning rate grande siempre acelera gradiente descendente?",
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
          "Solo en funciones convexas",
          false
        ]
      ],
      "feedback": "Puede provocar oscilación o divergencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "f=x², x0=4, α=0.25. Calcula x1.",
        "answer": "2",
        "hint": "x1=4-0.25·8."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Para f=0.5·10x², ¿α=0.3 produce |1-αλ|<1? sí/no",
        "answer": "no",
        "hint": "1-3=-2, magnitud 2."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una loss decreciente garantiza que ||∇f|| sea pequeña? sí/no",
        "answer": "no",
        "hint": "Puede seguir lejos de estacionariedad o descender muy lentamente."
      }
    ]
  },
  "opt-sgd": {
    "id": "opt-sgd",
    "courseId": 32,
    "title": "SGD, minibatches y ruido de gradiente",
    "shortTitle": "SGD, minibatches y ruido de gradiente",
    "duration": 102,
    "objective": "comprender SGD como estimación estocástica del gradiente y razonar sobre varianza, minibatches, epochs y schedules.",
    "summary": [
      "SGD reemplaza el gradiente completo por un estimador construido con una muestra o minibatch.",
      "Un gradiente estocástico puede ser insesgado bajo muestreo adecuado y aun tener alta varianza; insesgado no significa exacto.",
      "Batch size, learning-rate schedule y orden de datos afectan coste, ruido y reproducibilidad."
    ],
    "concept": "SGD reemplaza el gradiente completo por un estimador construido con una muestra o minibatch.",
    "rules": [
      "SGD reemplaza el gradiente completo por un estimador construido con una muestra o minibatch.",
      "Un gradiente estocástico puede ser insesgado bajo muestreo adecuado y aun tener alta varianza; insesgado no significa exacto.",
      "Batch size, learning-rate schedule y orden de datos afectan coste, ruido y reproducibilidad."
    ],
    "deep": {
      "intro": "Comprender SGD como estimación estocástica del gradiente y razonar sobre varianza, minibatches, epochs y schedules..",
      "sections": [
        {
          "title": "Riesgo empírico",
          "body": "Para F(θ)=1/n Σ_i ℓ_i(θ), un minibatch estima ∇F usando una fracción de ejemplos."
        },
        {
          "title": "Varianza",
          "body": "El ruido puede ayudar a explorar y abaratar pasos, pero también exige controlar α y sampling. Reducir batch suele aumentar varianza."
        },
        {
          "title": "Epochs y muestreo",
          "body": "Una epoch es una convención de recorrido del dataset, no una unidad matemática universal. Sampling con/sin reemplazo cambia dependencias."
        },
        {
          "title": "Reproducibilidad",
          "body": "Semillas, shuffling, paralelismo y reducción floating-point pueden cambiar trayectorias aunque el algoritmo nominal sea el mismo."
        }
      ]
    },
    "example": {
      "problem": "Dos gradientes de muestra son g1=2 y g2=6. ¿Gradiente de minibatch medio?",
      "steps": [
        "Se promedian contribuciones.",
        "(2+6)/2=4."
      ],
      "solution": "4."
    },
    "check": {
      "question": "¿Un estimador de gradiente insesgado coincide en cada paso con el gradiente completo?",
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
          "Solo con momentum",
          false
        ]
      ],
      "feedback": "Insesgado describe la esperanza del estimador."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Gradientes de batch: 1,3,8. Calcula la media.",
        "answer": "4",
        "hint": "(1+3+8)/3."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Aumentar batch suele reducir varianza del promedio bajo muestreo razonable? sí/no",
        "answer": "si",
        "hint": "Promediar más observaciones reduce ruido."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La misma seed garantiza bit a bit el mismo entrenamiento en cualquier hardware/paralelismo? sí/no",
        "answer": "no",
        "hint": "Puede haber no determinismo y distinto orden de operaciones floating-point."
      }
    ]
  },
  "opt-momentum": {
    "id": "opt-momentum",
    "courseId": 32,
    "title": "Momentum y aceleración",
    "shortTitle": "Momentum y aceleración",
    "duration": 98,
    "objective": "interpretar momentum como dinámica con estado y distinguir momentum clásico, Nesterov y aceleración garantizada bajo hipótesis.",
    "summary": [
      "Momentum mantiene una variable de velocidad/acumulación; el paso depende de gradientes pasados, no solo del actual.",
      "Puede amortiguar zig-zag y acelerar direcciones persistentes, pero parámetros agresivos también pueden producir oscilaciones.",
      "Nesterov evalúa o interpreta el gradiente con una mirada adelantada; no debe reducirse a “momentum pero mejor” en todo problema."
    ],
    "concept": "Momentum mantiene una variable de velocidad/acumulación; el paso depende de gradientes pasados, no solo del actual.",
    "rules": [
      "Momentum mantiene una variable de velocidad/acumulación; el paso depende de gradientes pasados, no solo del actual.",
      "Puede amortiguar zig-zag y acelerar direcciones persistentes, pero parámetros agresivos también pueden producir oscilaciones.",
      "Nesterov evalúa o interpreta el gradiente con una mirada adelantada; no debe reducirse a “momentum pero mejor” en todo problema."
    ],
    "deep": {
      "intro": "Interpretar momentum como dinámica con estado y distinguir momentum clásico, Nesterov y aceleración garantizada bajo hipótesis..",
      "sections": [
        {
          "title": "Estado dinámico",
          "body": "v_{k+1}=βv_k+g_k y θ_{k+1}=θ_k-αv_{k+1} es una forma habitual; distintas bibliotecas cambian signos y escalas."
        },
        {
          "title": "Valles anisótropos",
          "body": "La memoria de dirección puede acumular progreso en ejes consistentes y cancelar oscilaciones en ejes de alta curvatura."
        },
        {
          "title": "Nesterov",
          "body": "La aceleración de Nesterov tiene garantías específicas en problemas convexos suaves; implementaciones ML pueden usar variantes equivalentes o aproximadas."
        },
        {
          "title": "Hiperparámetros",
          "body": "α y β interactúan. Copiar β=0.9 sin considerar escala, batch o precondicionamiento no es una demostración de estabilidad."
        }
      ]
    },
    "example": {
      "problem": "Con v0=0, β=0.9 y g0=5, usando v1=βv0+g0, calcula v1.",
      "steps": [
        "v1=0+5."
      ],
      "solution": "5."
    },
    "check": {
      "question": "¿Momentum elimina la necesidad de elegir learning rate?",
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
          "Solo en convexas",
          false
        ]
      ],
      "feedback": "Momentum añade estado pero el tamaño de paso sigue siendo crítico."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "v=2, β=0.5, g=4. Calcula v_nuevo=βv+g.",
        "answer": "5",
        "hint": "1+4."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Momentum puede oscilar con parámetros agresivos? sí/no",
        "answer": "si",
        "hint": "Es una dinámica de segundo orden discreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Nesterov garantiza aceleración para cualquier función no convexa arbitraria? sí/no",
        "answer": "no",
        "hint": "Las garantías clásicas requieren hipótesis concretas."
      }
    ]
  },
  "opt-newton-quasi": {
    "id": "opt-newton-quasi",
    "courseId": 32,
    "title": "Newton, Hessiano y métodos quasi-Newton",
    "shortTitle": "Newton, Hessiano y métodos quasi-Newton",
    "duration": 110,
    "objective": "derivar el paso de Newton desde el modelo cuadrático local y comprender ventajas, riesgos y aproximaciones quasi-Newton.",
    "summary": [
      "Newton usa información de segundo orden: resuelve H(x_k)p=-∇f(x_k) y actualiza x_{k+1}=x_k+p.",
      "Cerca de un mínimo bien condicionado y bajo hipótesis adecuadas puede converger muy rápido; lejos del óptimo el Hessiano puede ser indefinido o el modelo local pobre.",
      "BFGS/L-BFGS aproximan curvatura sin formar o invertir el Hessiano completo y suelen combinarse con line search."
    ],
    "concept": "Newton usa información de segundo orden: resuelve H(x_k)p=-∇f(x_k) y actualiza x_{k+1}=x_k+p.",
    "rules": [
      "Newton usa información de segundo orden: resuelve H(x_k)p=-∇f(x_k) y actualiza x_{k+1}=x_k+p.",
      "Cerca de un mínimo bien condicionado y bajo hipótesis adecuadas puede converger muy rápido; lejos del óptimo el Hessiano puede ser indefinido o el modelo local pobre.",
      "BFGS/L-BFGS aproximan curvatura sin formar o invertir el Hessiano completo y suelen combinarse con line search."
    ],
    "deep": {
      "intro": "Derivar el paso de Newton desde el modelo cuadrático local y comprender ventajas, riesgos y aproximaciones quasi-Newton..",
      "sections": [
        {
          "title": "Modelo cuadrático",
          "body": "Taylor de segundo orden produce m(p)=f+g^Tp+1/2 p^THp. Su estacionario satisface Hp=-g."
        },
        {
          "title": "No invertir explícitamente",
          "body": "Numéricamente se resuelve el sistema lineal; formar H^{-1} explícita suele ser más caro e inestable."
        },
        {
          "title": "Hessiano indefinido",
          "body": "Si H no es positiva definida, el paso de Newton puede no ser dirección de descenso. Damping o trust regions corrigen el modelo."
        },
        {
          "title": "Quasi-Newton",
          "body": "BFGS actualiza una aproximación de curvatura usando diferencias de posiciones y gradientes; L-BFGS limita memoria para gran dimensión."
        }
      ]
    },
    "example": {
      "problem": "Para f(x)=1/2·4x²-8x, aplica Newton desde cualquier x.",
      "steps": [
        "g=4x-8.",
        "H=4.",
        "p=-(4x-8)/4=2-x.",
        "x+p=2."
      ],
      "solution": "En una cuadrática exacta, Newton llega al minimizador x=2 en un paso."
    },
    "check": {
      "question": "¿Implementar Newton requiere calcular H^{-1} explícitamente?",
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
          "Solo si H es diagonal",
          false
        ]
      ],
      "feedback": "Se resuelve H p=-g mediante álgebra lineal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "g=6, H=3 en 1D. Calcula el paso Newton p.",
        "answer": "-2",
        "hint": "p=-g/H."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un Hessiano indefinido puede hacer que el paso Newton no sea de descenso? sí/no",
        "answer": "si",
        "hint": "El modelo cuadrático puede apuntar a una dirección de curvatura negativa."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿L-BFGS almacena necesariamente el Hessiano d×d completo? sí/no",
        "answer": "no",
        "hint": "Conserva un historial limitado de pares de corrección."
      }
    ]
  },
  "opt-constraints": {
    "id": "opt-constraints",
    "courseId": 32,
    "title": "Restricciones, factibilidad y proyección",
    "shortTitle": "Restricciones, factibilidad y proyección",
    "duration": 100,
    "objective": "modelar restricciones de igualdad/desigualdad y razonar sobre factibilidad, active sets y métodos proyectados.",
    "summary": [
      "Una solución óptima restringida debe ser factible antes de ser buena según el objetivo.",
      "Restricciones g_i(x)≤0 y h_j(x)=0 definen una geometría que puede situar el óptimo en la frontera.",
      "Projected gradient alterna un paso y una proyección sobre el conjunto factible cuando esa proyección es tratable."
    ],
    "concept": "Una solución óptima restringida debe ser factible antes de ser buena según el objetivo.",
    "rules": [
      "Una solución óptima restringida debe ser factible antes de ser buena según el objetivo.",
      "Restricciones g_i(x)≤0 y h_j(x)=0 definen una geometría que puede situar el óptimo en la frontera.",
      "Projected gradient alterna un paso y una proyección sobre el conjunto factible cuando esa proyección es tratable."
    ],
    "deep": {
      "intro": "Modelar restricciones de igualdad/desigualdad y razonar sobre factibilidad, active sets y métodos proyectados..",
      "sections": [
        {
          "title": "Conjunto factible",
          "body": "El problema no es “minimizar f y luego comprobar restricciones”; la factibilidad forma parte de la definición de solución."
        },
        {
          "title": "Restricciones activas",
          "body": "Una desigualdad es activa en x cuando alcanza igualdad. Solo algunas fronteras suelen determinar el óptimo local."
        },
        {
          "title": "Proyección",
          "body": "Para conjunto convexo C, Π_C(z)=argmin_{x∈C}||x-z||₂. El paso proyectado puede interpretarse como corregir factibilidad tras descenso."
        },
        {
          "title": "Penalización no es igualdad exacta",
          "body": "Añadir λ·violación al objetivo cambia el problema salvo en esquemas exactos/limites bajo hipótesis. Elegir λ es parte del método."
        }
      ]
    },
    "example": {
      "problem": "Minimiza (x-3)² sujeto a x≤1.",
      "steps": [
        "El mínimo sin restricción es x=3, no factible.",
        "En el conjunto (-∞,1], el punto más cercano a 3 es 1."
      ],
      "solution": "x*=1."
    },
    "check": {
      "question": "¿Un punto con menor coste que todos los factibles pero que viola una restricción es solución?",
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
          "Solo si la violación es pequeña",
          false
        ]
      ],
      "feedback": "Una solución restringida debe satisfacer las restricciones según la formulación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿x=2 es factible para x²≤1? sí/no",
        "answer": "no",
        "hint": "4≤1 es falso."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Proyecta z=5 sobre el intervalo [0,2].",
        "answer": "2",
        "hint": "El punto factible más cercano es el extremo 2."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Añadir una penalización finita arbitraria garantiza siempre exactamente la misma solución que la restricción original? sí/no",
        "answer": "no",
        "hint": "Depende de la penalización, peso e hipótesis."
      }
    ]
  },
  "opt-lagrange-kkt": {
    "id": "opt-lagrange-kkt",
    "courseId": 32,
    "title": "Lagrange, KKT y restricciones activas",
    "shortTitle": "Lagrange, KKT y restricciones activas",
    "duration": 112,
    "objective": "usar multiplicadores de Lagrange y condiciones KKT como condiciones de optimalidad bajo hipótesis, distinguiendo necesidad, suficiencia y dualidad.",
    "summary": [
      "Para igualdades h(x)=0, L(x,λ)=f(x)+λ^Th(x) combina objetivo y geometría de la restricción.",
      "KKT añade factibilidad primal, factibilidad dual, estacionariedad y complementariedad para desigualdades bajo una convención consistente.",
      "KKT no es un hechizo universal: su necesidad/suficiencia depende de regularidad y convexidad."
    ],
    "concept": "Para igualdades h(x)=0, L(x,λ)=f(x)+λ^Th(x) combina objetivo y geometría de la restricción.",
    "rules": [
      "Para igualdades h(x)=0, L(x,λ)=f(x)+λ^Th(x) combina objetivo y geometría de la restricción.",
      "KKT añade factibilidad primal, factibilidad dual, estacionariedad y complementariedad para desigualdades bajo una convención consistente.",
      "KKT no es un hechizo universal: su necesidad/suficiencia depende de regularidad y convexidad."
    ],
    "deep": {
      "intro": "Usar multiplicadores de Lagrange y condiciones KKT como condiciones de optimalidad bajo hipótesis, distinguiendo necesidad, suficiencia y dualidad..",
      "sections": [
        {
          "title": "Multiplicadores de Lagrange",
          "body": "En un óptimo regular de igualdad, el gradiente del objetivo pertenece al span de normales de restricciones."
        },
        {
          "title": "KKT",
          "body": "Para g_i(x)≤0 con L=f+Σλ_i g_i, se requiere λ_i≥0 y λ_i g_i(x)=0 además de estacionariedad y factibilidad."
        },
        {
          "title": "Complementary slackness",
          "body": "Una restricción estrictamente inactiva tiene multiplicador cero en KKT; una activa puede tener multiplicador positivo o cero."
        },
        {
          "title": "Cuándo certifican globalidad",
          "body": "En problemas convexos con condiciones de regularidad apropiadas, KKT puede ser suficiente para optimalidad global; fuera de ahí da candidatos/condiciones locales."
        }
      ]
    },
    "example": {
      "problem": "Minimiza x²+y² sujeto a x+y=1.",
      "steps": [
        "L=x²+y²+λ(x+y-1).",
        "2x+λ=0 y 2y+λ=0, así que x=y.",
        "Con x+y=1: x=y=1/2."
      ],
      "solution": "(1/2,1/2)."
    },
    "check": {
      "question": "¿KKT es siempre suficiente para mínimo global en cualquier problema no convexo?",
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
          "Solo con una restricción",
          false
        ]
      ],
      "feedback": "La suficiencia global requiere estructura como convexidad y condiciones apropiadas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "En min f sujeto a h(x)=0, ¿λ es una variable de decisión primal? sí/no",
        "answer": "no",
        "hint": "Es un multiplicador/variable dual."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si g_i(x)<0 en una solución KKT con convención g≤0, ¿λ_i debe ser 0? sí/no",
        "answer": "si",
        "hint": "Por complementariedad y λ_i≥0."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La estacionariedad KKT sola garantiza factibilidad? sí/no",
        "answer": "no",
        "hint": "La factibilidad primal es una condición separada."
      }
    ]
  },
  "opt-duality": {
    "id": "opt-duality",
    "courseId": 32,
    "title": "Dualidad, cotas y sensibilidad",
    "shortTitle": "Dualidad, cotas y sensibilidad",
    "duration": 102,
    "objective": "interpretar problemas duales como fuentes de cotas y sensibilidad, distinguiendo dualidad débil de dualidad fuerte.",
    "summary": [
      "Para un problema primal de minimización, el dual de Lagrange suele producir cotas inferiores sobre el valor óptimo.",
      "La dualidad débil es general; igualdad entre óptimos primal y dual requiere hipótesis adicionales como condiciones de Slater en ciertos problemas convexos.",
      "Los multiplicadores pueden interpretarse como sensibilidades marginales del valor óptimo respecto a restricciones bajo condiciones adecuadas."
    ],
    "concept": "Para un problema primal de minimización, el dual de Lagrange suele producir cotas inferiores sobre el valor óptimo.",
    "rules": [
      "Para un problema primal de minimización, el dual de Lagrange suele producir cotas inferiores sobre el valor óptimo.",
      "La dualidad débil es general; igualdad entre óptimos primal y dual requiere hipótesis adicionales como condiciones de Slater en ciertos problemas convexos.",
      "Los multiplicadores pueden interpretarse como sensibilidades marginales del valor óptimo respecto a restricciones bajo condiciones adecuadas."
    ],
    "deep": {
      "intro": "Interpretar problemas duales como fuentes de cotas y sensibilidad, distinguiendo dualidad débil de dualidad fuerte..",
      "sections": [
        {
          "title": "Función dual",
          "body": "q(λ)=inf_x L(x,λ) construye una cota al eliminar variables primales. El dual maximiza esa cota dentro del dominio dual."
        },
        {
          "title": "Dualidad débil",
          "body": "Cualquier valor dual factible no supera el óptimo primal de un problema de minimización bajo la convención adecuada."
        },
        {
          "title": "Dualidad fuerte",
          "body": "En convexos bien comportados puede desaparecer el duality gap. No debe asumirse en problemas arbitrarios."
        },
        {
          "title": "Sensibilidad",
          "body": "Un multiplicador grande puede señalar que relajar una restricción tiene gran valor marginal local; interpretación depende de regularidad y unidades."
        }
      ]
    },
    "example": {
      "problem": "Si un dual factible da 8 y una solución primal factible da 10, ¿qué sabes del óptimo primal p*?",
      "steps": [
        "Dualidad débil: 8≤p*.",
        "Factibilidad primal: p*≤10."
      ],
      "solution": "8≤p*≤10."
    },
    "check": {
      "question": "¿Dualidad débil implica que el gap primal-dual sea cero?",
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
          "Solo en lineales",
          false
        ]
      ],
      "feedback": "Solo da una desigualdad; dualidad fuerte requiere más estructura."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Cota dual=4, solución primal factible=7. ¿Puede p*=9? sí/no",
        "answer": "no",
        "hint": "p* no puede exceder el valor de una solución primal factible."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un valor dual factible puede certificar una cota inferior en minimización? sí/no",
        "answer": "si",
        "hint": "Ésa es la idea de dualidad débil."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Slater es una condición típica para dualidad fuerte en ciertos convexos? sí/no",
        "answer": "si",
        "hint": "Es una condición de regularidad ampliamente usada."
      }
    ]
  },
  "opt-combinatorial": {
    "id": "opt-combinatorial",
    "courseId": 32,
    "title": "Optimización combinatoria y relajaciones",
    "shortTitle": "Optimización combinatoria y relajaciones",
    "duration": 106,
    "objective": "distinguir optimización continua de discreta y razonar sobre búsqueda exacta, relajaciones, branch-and-bound, heurísticas y límites de complejidad.",
    "summary": [
      "Variables discretas convierten el espacio factible en combinatorio; derivadas pueden dejar de ser la herramienta principal.",
      "Una relajación reemplaza restricciones difíciles por otras más fáciles y puede producir cotas útiles aunque su solución no sea factible para el problema original.",
      "NP-hard no significa “imposible de resolver”: tamaño, estructura, exactitud requerida y tiempo disponible determinan la estrategia práctica."
    ],
    "concept": "Variables discretas convierten el espacio factible en combinatorio; derivadas pueden dejar de ser la herramienta principal.",
    "rules": [
      "Variables discretas convierten el espacio factible en combinatorio; derivadas pueden dejar de ser la herramienta principal.",
      "Una relajación reemplaza restricciones difíciles por otras más fáciles y puede producir cotas útiles aunque su solución no sea factible para el problema original.",
      "NP-hard no significa “imposible de resolver”: tamaño, estructura, exactitud requerida y tiempo disponible determinan la estrategia práctica."
    ],
    "deep": {
      "intro": "Distinguir optimización continua de discreta y razonar sobre búsqueda exacta, relajaciones, branch-and-bound, heurísticas y límites de complejidad..",
      "sections": [
        {
          "title": "Discreto frente a continuo",
          "body": "Elegir rutas, subconjuntos o asignaciones produce dominios finitos/integer donde una pequeña dimensión puede esconder exponencialidad."
        },
        {
          "title": "Relajaciones",
          "body": "Un ILP puede relajarse a LP para obtener cotas. Redondear una solución relajada puede violar restricciones o degradar el objetivo."
        },
        {
          "title": "Branch-and-bound",
          "body": "Divide el espacio y usa cotas para podar regiones que no pueden mejorar la mejor solución conocida."
        },
        {
          "title": "Heurísticas y aproximación",
          "body": "Heurísticas pueden funcionar muy bien sin garantía; algoritmos de aproximación sí ofrecen una relación demostrable bajo problemas específicos."
        }
      ]
    },
    "example": {
      "problem": "Un problema binario tiene 20 variables independientes. ¿Cuántas asignaciones brutas posibles?",
      "steps": [
        "Cada variable tiene 2 valores.",
        "2^20=1,048,576."
      ],
      "solution": "1,048,576."
    },
    "check": {
      "question": "¿NP-hard significa que ninguna instancia puede resolverse exactamente rápido?",
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
          "Solo si hay enteros",
          false
        ]
      ],
      "feedback": "Es una afirmación de complejidad del problema general, no de cada instancia concreta."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "10 variables binarias: ¿cuántas asignaciones posibles?",
        "answer": "1024",
        "hint": "2^10."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La solución de una relajación LP de un ILP tiene que ser entera? sí/no",
        "answer": "no",
        "hint": "La relajación elimina integridad."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una cota inferior de relajación puede ayudar a podar en branch-and-bound de minimización? sí/no",
        "answer": "si",
        "hint": "Si ya no puede superar a la mejor solución, la rama se descarta."
      }
    ]
  },
  "opt-numerical": {
    "id": "opt-numerical",
    "courseId": 32,
    "title": "Optimización numérica: line search, trust regions y conditioning",
    "shortTitle": "Optimización numérica: line search, trust regions y conditioning",
    "duration": 110,
    "objective": "evaluar robustez numérica mediante line search, trust regions, escalado, conditioning y errores floating-point.",
    "summary": [
      "Una dirección de descenso necesita un tamaño de paso; line search intenta elegirlo usando suficiente descenso o condiciones de curvatura.",
      "Trust-region methods limitan el paso a una región donde el modelo local se considera fiable y adaptan el radio según predicción frente a realidad.",
      "Un problema mal condicionado amplifica errores y ralentiza métodos; cambiar algoritmo no corrige datos/modelos intrínsecamente mal condicionados."
    ],
    "concept": "Una dirección de descenso necesita un tamaño de paso; line search intenta elegirlo usando suficiente descenso o condiciones de curvatura.",
    "rules": [
      "Una dirección de descenso necesita un tamaño de paso; line search intenta elegirlo usando suficiente descenso o condiciones de curvatura.",
      "Trust-region methods limitan el paso a una región donde el modelo local se considera fiable y adaptan el radio según predicción frente a realidad.",
      "Un problema mal condicionado amplifica errores y ralentiza métodos; cambiar algoritmo no corrige datos/modelos intrínsecamente mal condicionados."
    ],
    "deep": {
      "intro": "Evaluar robustez numérica mediante line search, trust regions, escalado, conditioning y errores floating-point..",
      "sections": [
        {
          "title": "Line search",
          "body": "Backtracking/Armijo reduce α hasta obtener descenso suficiente. Wolfe añade información de curvatura para métodos como BFGS."
        },
        {
          "title": "Trust regions",
          "body": "Se optimiza un modelo local bajo ||p||≤Δ. Si la reducción real concuerda con la predicha, el radio puede crecer; si no, se reduce."
        },
        {
          "title": "Conditioning",
          "body": "Curvaturas con escalas muy distintas producen números de condición altos y sensibilidad. Escalado/preconditioning puede ayudar."
        },
        {
          "title": "Floating-point",
          "body": "Cancelar, saturar o restar números cercanos puede distorsionar criterios de parada. Tolerancias deben escalar con magnitudes del problema."
        }
      ]
    },
    "example": {
      "problem": "Una dirección p cumple g^T p<0. ¿Qué significa localmente?",
      "steps": [
        "La derivada direccional en p es negativa.",
        "Para pasos suficientemente pequeños, f puede disminuir."
      ],
      "solution": "p es una dirección de descenso local."
    },
    "check": {
      "question": "¿Una dirección de descenso garantiza que cualquier tamaño de paso reducirá f?",
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
          "Solo en convexas",
          false
        ]
      ],
      "feedback": "La garantía es local; un paso demasiado grande puede aumentar el objetivo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si g^T p=-3, ¿p es dirección de descenso local? sí/no",
        "answer": "si",
        "hint": "La derivada direccional es negativa."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Backtracking puede reducir α varias veces antes de aceptar? sí/no",
        "answer": "si",
        "hint": "Busca suficiente descenso."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Preconditioning cambia necesariamente el minimizador del problema original? sí/no",
        "answer": "no",
        "hint": "Bien diseñado cambia coordenadas/geometría del algoritmo, no el objetivo físico."
      }
    ]
  },
  "opt-multiobjective-regularization": {
    "id": "opt-multiobjective-regularization",
    "courseId": 32,
    "title": "Regularización, penalizaciones y objetivos múltiples",
    "shortTitle": "Regularización, penalizaciones y objetivos múltiples",
    "duration": 100,
    "objective": "razonar sobre regularización y multiobjetivo sin confundir preferencias de diseño con propiedades intrínsecas de los datos.",
    "summary": [
      "Regularizar añade estructura o preferencia al objetivo, por ejemplo λ||x||²; no es “gratis” y puede introducir sesgo.",
      "Una suma ponderada de objetivos selecciona un compromiso según unidades/pesos y puede no recuperar todos los puntos Pareto en problemas no convexos.",
      "La frontera de Pareto representa soluciones no dominadas; elegir una requiere preferencias adicionales."
    ],
    "concept": "Regularizar añade estructura o preferencia al objetivo, por ejemplo λ||x||²; no es “gratis” y puede introducir sesgo.",
    "rules": [
      "Regularizar añade estructura o preferencia al objetivo, por ejemplo λ||x||²; no es “gratis” y puede introducir sesgo.",
      "Una suma ponderada de objetivos selecciona un compromiso según unidades/pesos y puede no recuperar todos los puntos Pareto en problemas no convexos.",
      "La frontera de Pareto representa soluciones no dominadas; elegir una requiere preferencias adicionales."
    ],
    "deep": {
      "intro": "Razonar sobre regularización y multiobjetivo sin confundir preferencias de diseño con propiedades intrínsecas de los datos..",
      "sections": [
        {
          "title": "Regularización",
          "body": "L2 favorece magnitudes pequeñas; L1 puede inducir sparsity en ciertos problemas. El efecto depende de parametrización y escalado."
        },
        {
          "title": "Penalización frente a restricción",
          "body": "min f+λR y min f sujeto a R≤c pueden relacionarse bajo hipótesis, pero λ y c no son intercambiables sin análisis."
        },
        {
          "title": "Pareto optimality",
          "body": "Una solución es no dominada si no puede mejorarse un objetivo sin empeorar al menos otro."
        },
        {
          "title": "Escalarización",
          "body": "Pesos convierten múltiples objetivos en uno, pero codifican preferencia y unidades; normalizar puede cambiar la elección."
        }
      ]
    },
    "example": {
      "problem": "Compara A=(coste 5,error 2) y B=(coste 6,error 3), ambos a minimizar.",
      "steps": [
        "A tiene menor coste.",
        "A también tiene menor error.",
        "A domina a B."
      ],
      "solution": "B no es Pareto-óptima frente a A."
    },
    "check": {
      "question": "¿Añadir regularización deja siempre el mismo minimizador?",
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
          "Solo con L2",
          false
        ]
      ],
      "feedback": "La regularización cambia el objetivo salvo casos especiales."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si λ=0 en f+λR, ¿R afecta al objetivo? sí/no",
        "answer": "no",
        "hint": "Su peso es cero."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una solución dominada puede ser Pareto-óptima? sí/no",
        "answer": "no",
        "hint": "Por definición existe otra solución mejor o igual en todo y mejor en algo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La suma ponderada recupera necesariamente toda la frontera Pareto de un problema no convexo? sí/no",
        "answer": "no",
        "hint": "Puede perder regiones no soportadas."
      }
    ]
  },
  "opt-integration": {
    "id": "opt-integration",
    "courseId": 32,
    "title": "Integración: elegir método, verificar y comunicar",
    "shortTitle": "Integración: elegir método, verificar y comunicar",
    "duration": 116,
    "objective": "diseñar un workflow de optimización reproducible que conecte formulación, estructura matemática, algoritmo, diagnóstico, validación y comunicación de límites.",
    "summary": [
      "El algoritmo debe elegirse después de identificar dimensión, suavidad, convexidad, restricciones, ruido y coste de evaluar derivadas.",
      "Convergencia del algoritmo no garantiza que el modelo represente el objetivo real ni que la solución generalice fuera de los datos usados.",
      "Un resultado profesional incluye baseline, criterios de parada, sensibilidad a hiperparámetros, feasibility y evidencia reproducible."
    ],
    "concept": "El algoritmo debe elegirse después de identificar dimensión, suavidad, convexidad, restricciones, ruido y coste de evaluar derivadas.",
    "rules": [
      "El algoritmo debe elegirse después de identificar dimensión, suavidad, convexidad, restricciones, ruido y coste de evaluar derivadas.",
      "Convergencia del algoritmo no garantiza que el modelo represente el objetivo real ni que la solución generalice fuera de los datos usados.",
      "Un resultado profesional incluye baseline, criterios de parada, sensibilidad a hiperparámetros, feasibility y evidencia reproducible."
    ],
    "deep": {
      "intro": "Diseñar un workflow de optimización reproducible que conecte formulación, estructura matemática, algoritmo, diagnóstico, validación y comunicación de límites..",
      "sections": [
        {
          "title": "Checklist estructural",
          "body": "¿Continua o discreta? ¿convexa? ¿smooth? ¿constraints? ¿gradientes exactos/estocásticos? ¿Hessiano accesible? Estas respuestas reducen el espacio de métodos."
        },
        {
          "title": "Baseline y verificación",
          "body": "Compara con una solución simple, evalúa gradient checks cuando proceda, verifica KKT/feasibility y reproduce desde múltiples inicializaciones en no convexos."
        },
        {
          "title": "Generalización del objetivo",
          "body": "En ML, optimizar training loss no garantiza validation performance; en sistemas, optimizar un benchmark puede desplazar coste a memoria, energía o tail latency."
        },
        {
          "title": "Comunicación",
          "body": "Reporta objetivo, restricciones, tolerancias, seed, hardware/software, presupuesto, mejor solución factible y gaps/cotas si existen."
        }
      ]
    },
    "example": {
      "problem": "Tienes una loss no convexa con millones de ejemplos y gradientes baratos por minibatch. ¿Qué familia es razonable como baseline?",
      "steps": [
        "El gradiente completo por paso es costoso.",
        "Hay acceso a estimadores por minibatch.",
        "Un método SGD/Adam-like puede ser baseline, acompañado de validación y schedules."
      ],
      "solution": "Elegir baseline por estructura, no por moda."
    },
    "check": {
      "question": "¿Convergencia numérica de la loss demuestra que el objetivo de negocio está bien modelado?",
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
          "Solo si la loss es convexa",
          false
        ]
      ],
      "feedback": "Optimización resuelve la formulación; no certifica que la formulación sea correcta."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes comprobar factibilidad antes de declarar óptimo restringido? sí/no",
        "answer": "si",
        "hint": "Un óptimo restringido debe ser factible."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿En un problema no convexo es razonable comparar varias inicializaciones? sí/no",
        "answer": "si",
        "hint": "Puede revelar sensibilidad a basins/local minima/saddles."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un gradient check numérico sustituye una prueba de correctitud del modelo? sí/no",
        "answer": "no",
        "hint": "Solo contrasta una implementación local de derivadas."
      }
    ]
  }
});
