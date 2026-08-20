/**
 * BLOQUE 029 — Álgebra lineal
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar objeto abstracto, coordenadas y representación
 * matricial. Declarar siempre el campo, bases y producto interno cuando una
 * afirmación dependa de ellos; no confundir exactitud algebraica con estabilidad
 * numérica.
 */
window.LEARNING_PATHS[29] = {
  "level": "Experto progresivo",
  "estimatedHours": 86,
  "description": "Álgebra lineal desde espacios y transformaciones hasta eigenestructura, SVD, mínimos cuadrados y aplicaciones computacionales.",
  "outcomes": [
    "Razonar con vectores, matrices, sistemas lineales, bases, subespacios, transformaciones y cambio de coordenadas con precisión estructural.",
    "Usar determinantes, rango, eigenvalues/eigenvectors y el teorema espectral entendiendo sus hipótesis y límites.",
    "Aplicar SVD, pseudoinversa, normas, proyecciones y mínimos cuadrados con atención al condicionamiento numérico.",
    "Conectar las construcciones con gráficos, física, IA y procesamiento de señales sin confundir representación matricial con significado del modelo."
  ],
  "modules": [
    {
      "id": "m1-linear-objects",
      "title": "Vectores, matrices y sistemas",
      "description": "Representación, operaciones y resolución",
      "lessons": [
        "la-vectors",
        "la-matrices",
        "la-systems",
        "la-dot-orthogonality",
        "la-cross"
      ]
    },
    {
      "id": "m2-spaces-maps",
      "title": "Espacios y transformaciones",
      "description": "Bases, dimensión, operadores y cambio de base",
      "lessons": [
        "la-spaces-basis",
        "la-transformations",
        "la-determinant-inverse"
      ]
    },
    {
      "id": "m3-spectral",
      "title": "Estructura espectral",
      "description": "Eigenestructura, simetría y SVD",
      "lessons": [
        "la-eigen",
        "la-symmetric",
        "la-svd"
      ]
    },
    {
      "id": "m4-approx-apps",
      "title": "Aproximación y aplicaciones",
      "description": "Normas, proyecciones, mínimos cuadrados y conexiones",
      "lessons": [
        "la-norms-projections",
        "la-applications"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "la-vectors": {
    "id": "la-vectors",
    "courseId": 29,
    "title": "Vectores, coordenadas y operaciones",
    "shortTitle": "Vectores, coordenadas y operaciones",
    "duration": 90,
    "objective": "interpretar vectores como elementos de un espacio vectorial y distinguir el objeto geométrico de sus coordenadas en una base.",
    "summary": [
      "Un vector es un elemento de un espacio vectorial; una lista de números son sus coordenadas respecto de una base elegida, no el vector abstracto en sí.",
      "La suma y el producto por escalares deben satisfacer los axiomas del espacio vectorial; en R^n estas operaciones son componente a componente.",
      "Norma, dirección y coordenadas dependen del contexto: cambiar de base modifica las coordenadas pero no el vector geométrico representado."
    ],
    "concept": "Un vector es un elemento de un espacio vectorial; una lista de números son sus coordenadas respecto de una base elegida, no el vector abstracto en sí.",
    "rules": [
      "Un vector es un elemento de un espacio vectorial; una lista de números son sus coordenadas respecto de una base elegida, no el vector abstracto en sí.",
      "La suma y el producto por escalares deben satisfacer los axiomas del espacio vectorial; en R^n estas operaciones son componente a componente.",
      "Norma, dirección y coordenadas dependen del contexto: cambiar de base modifica las coordenadas pero no el vector geométrico representado."
    ],
    "deep": {
      "intro": "En R^n solemos identificar un vector con una n-tupla porque usamos la base canónica. En un espacio abstracto, el vector existe independientemente de una base; elegir una base permite codificarlo mediante coordenadas. Esta separación será esencial en transformaciones y cambio de base.",
      "sections": [
        {
          "title": "Objeto y coordenadas",
          "body": "En R^n solemos identificar un vector con una n-tupla porque usamos la base canónica. En un espacio abstracto, el vector existe independientemente de una base; elegir una base permite codificarlo mediante coordenadas. Esta separación será esencial en transformaciones y cambio de base."
        },
        {
          "title": "Combinaciones lineales",
          "body": "Una combinación lineal α1v1+...+αkvk usa escalares del campo. El conjunto de todas esas combinaciones es el span. Preguntar si un vector está en un span equivale a preguntar si cierto sistema lineal tiene solución."
        },
        {
          "title": "Geometría y unidades",
          "body": "En aplicaciones físicas, las componentes pueden tener unidades y bases concretas. Sumar vectores con significado incompatible puede ser algebraicamente posible y físicamente absurdo; el álgebra no sustituye el modelado."
        },
        {
          "title": "Dependencia de representación",
          "body": "Dos listas numéricas distintas pueden representar el mismo vector bajo bases distintas. Por eso una transformación lineal abstracta y una matriz que la representa son conceptos relacionados, pero no idénticos."
        }
      ]
    },
    "example": {
      "problem": "Dada la base B={(1,1),(1,-1)} de R², expresa v=(4,2) en coordenadas B.",
      "steps": [
        "Busca a,b tales que a(1,1)+b(1,-1)=(4,2).",
        "Esto da a+b=4 y a-b=2.",
        "Sumando: 2a=6, luego a=3; entonces b=1."
      ],
      "solution": "[v]_B=(3,1)."
    },
    "check": {
      "question": "¿Cambiar de base cambia el vector abstracto o solo sus coordenadas?",
      "options": [
        [
          "Solo sus coordenadas",
          true
        ],
        [
          "El vector abstracto",
          false
        ],
        [
          "Ambos necesariamente",
          false
        ]
      ],
      "feedback": "Una base cambia la representación numérica. El objeto abstracto no cambia por elegir otra base."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Calcula (1,2,3)+(4,-1,0).",
        "answer": "5,1,3",
        "hint": "Suma componente a componente."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Está (3,6) en span{(1,2)}? sí/no",
        "answer": "si",
        "hint": "Busca un escalar k con k(1,2)=(3,6)."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "En B={(1,1),(1,-1)}, da las coordenadas de (2,0).",
        "answer": "1,1",
        "hint": "Resuelve a+b=2 y a-b=0."
      }
    ]
  },
  "la-matrices": {
    "id": "la-matrices",
    "courseId": 29,
    "title": "Matrices: operadores, composición y estructura",
    "shortTitle": "Matrices: operadores, composición y estructura",
    "duration": 90,
    "objective": "operar con matrices y comprenderlas como representaciones de aplicaciones lineales entre espacios coordinatizados.",
    "summary": [
      "Una matriz m×n representa una aplicación lineal de un espacio n-dimensional a uno m-dimensional una vez fijadas bases de dominio y codominio.",
      "El producto AB representa composición: primero actúa B y después A; por eso el orden importa y, en general, AB≠BA.",
      "Transpuesta, rango y estructura por bloques describen propiedades útiles, pero no toda matriz cuadrada es invertible ni toda matriz es diagonalizable."
    ],
    "concept": "Una matriz m×n representa una aplicación lineal de un espacio n-dimensional a uno m-dimensional una vez fijadas bases de dominio y codominio.",
    "rules": [
      "Una matriz m×n representa una aplicación lineal de un espacio n-dimensional a uno m-dimensional una vez fijadas bases de dominio y codominio.",
      "El producto AB representa composición: primero actúa B y después A; por eso el orden importa y, en general, AB≠BA.",
      "Transpuesta, rango y estructura por bloques describen propiedades útiles, pero no toda matriz cuadrada es invertible ni toda matriz es diagonalizable."
    ],
    "deep": {
      "intro": "Las columnas de una matriz A son las coordenadas de las imágenes de los vectores de la base del dominio. Para x escrito en esa base, Ax combina esas columnas con los coeficientes de x.",
      "sections": [
        {
          "title": "Matriz como representación",
          "body": "Las columnas de una matriz A son las coordenadas de las imágenes de los vectores de la base del dominio. Para x escrito en esa base, Ax combina esas columnas con los coeficientes de x."
        },
        {
          "title": "Producto y composición",
          "body": "Si B:U→V y A:V→W, entonces AB:U→W. La compatibilidad de dimensiones no es notación caprichosa: expresa que el codominio intermedio de B coincide con el dominio de A."
        },
        {
          "title": "Transpuesta y simetría",
          "body": "La transpuesta intercambia filas y columnas. Sobre R, A^T participa en productos internos, mínimos cuadrados y matrices simétricas. Sobre C, muchas afirmaciones usan adjunta conjugada A* en lugar de simple transpuesta."
        },
        {
          "title": "Bloques y estructura",
          "body": "Particionar matrices en bloques puede exponer subsistemas, variables acopladas o transformaciones separables. Las reglas de multiplicación por bloques son válidas cuando las dimensiones internas son compatibles."
        }
      ]
    },
    "example": {
      "problem": "Sean A=[[1,2],[0,1]] y B=[[2,0],[3,1]]. Calcula AB y BA.",
      "steps": [
        "AB=[[1·2+2·3,1·0+2·1],[0·2+1·3,0·0+1·1]]=[[8,2],[3,1]].",
        "BA=[[2·1+0·0,2·2+0·1],[3·1+1·0,3·2+1·1]]=[[2,4],[3,7]].",
        "Los resultados difieren: la multiplicación matricial no es conmutativa en general."
      ],
      "solution": "AB=[[8,2],[3,1]] y BA=[[2,4],[3,7]]."
    },
    "check": {
      "question": "¿Si AB está definido, BA está necesariamente definido?",
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
          "Solo para matrices cuadradas y siempre iguales",
          false
        ]
      ],
      "feedback": "La compatibilidad de dimensiones puede darse en un orden y no en el otro; incluso si ambos existen, no tienen por qué coincidir."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Multiplica [[1,0],[0,2]] por (3,4).",
        "answer": "3,8",
        "hint": "Cada fila produce una componente."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿AB representa primero A y luego B? sí/no",
        "answer": "no",
        "hint": "En vectores columna, ABx=A(Bx)."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Si A es 3×5 y B es 5×2, ¿qué tamaño tiene AB?",
        "answer": "3x2",
        "hint": "Las dimensiones internas 5 se contraen."
      }
    ]
  },
  "la-systems": {
    "id": "la-systems",
    "courseId": 29,
    "title": "Sistemas lineales, eliminación, rango y nulidad",
    "shortTitle": "Sistemas lineales, eliminación, rango y nulidad",
    "duration": 90,
    "objective": "resolver y clasificar sistemas lineales mediante eliminación, rango, espacios fundamentales y el teorema rango-nulidad.",
    "summary": [
      "Un sistema Ax=b es consistente exactamente cuando b pertenece al espacio columna de A.",
      "La eliminación gaussiana preserva el conjunto de soluciones mediante operaciones elementales de fila, pero las formas intermedias no deben confundirse con la matriz original como transformación.",
      "El rango mide dimensiones de imagen/espacio fila; para A:R^n→R^m, rank(A)+nullity(A)=n."
    ],
    "concept": "Un sistema Ax=b es consistente exactamente cuando b pertenece al espacio columna de A.",
    "rules": [
      "Un sistema Ax=b es consistente exactamente cuando b pertenece al espacio columna de A.",
      "La eliminación gaussiana preserva el conjunto de soluciones mediante operaciones elementales de fila, pero las formas intermedias no deben confundirse con la matriz original como transformación.",
      "El rango mide dimensiones de imagen/espacio fila; para A:R^n→R^m, rank(A)+nullity(A)=n."
    ],
    "deep": {
      "intro": "Ax=b pregunta si b puede escribirse como combinación lineal de las columnas de A. Una fila [0 ... 0 | c] con c≠0 en la forma escalonada demuestra inconsistencia.",
      "sections": [
        {
          "title": "Consistencia",
          "body": "Ax=b pregunta si b puede escribirse como combinación lineal de las columnas de A. Una fila [0 ... 0 | c] con c≠0 en la forma escalonada demuestra inconsistencia."
        },
        {
          "title": "Pivotes y variables libres",
          "body": "Cada pivote determina una variable básica; columnas sin pivote producen grados de libertad. En un sistema homogéneo, variables libres producen soluciones no triviales."
        },
        {
          "title": "Cuatro espacios fundamentales",
          "body": "Column space y null space viven en espacios distintos; row space y left null space completan la estructura. Confundir filas con columnas conduce a afirmaciones dimensionalmente incorrectas."
        },
        {
          "title": "Rango-nulidad",
          "body": "Para una transformación lineal finito-dimensional, dim(domain)=dim(kernel)+dim(image). No es solo una fórmula: explica el intercambio entre grados de libertad perdidos y dimensiones transmitidas."
        }
      ]
    },
    "example": {
      "problem": "Resuelve x+y+z=2 y x+y-z=0.",
      "steps": [
        "Resta la segunda ecuación de la primera: 2z=2, así que z=1.",
        "Sustituye: x+y=1.",
        "Queda un parámetro libre: tomando y=t, x=1-t."
      ],
      "solution": "(x,y,z)=(1-t,t,1), t∈R."
    },
    "check": {
      "question": "¿Un sistema homogéneo Ax=0 puede ser inconsistente?",
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
          "Solo si A no es cuadrada",
          false
        ]
      ],
      "feedback": "El vector x=0 siempre es solución de un sistema homogéneo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Resuelve x+y=3, x-y=1. Da x,y.",
        "answer": "2,1",
        "hint": "Suma las ecuaciones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Una matriz 3×5 tiene rango 3. ¿Cuál es su nulidad?",
        "answer": "2",
        "hint": "Rango+nulidad=número de columnas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Si b∉Col(A), Ax=b tiene solución? sí/no",
        "answer": "no",
        "hint": "La imagen de A es exactamente el espacio columna."
      }
    ]
  },
  "la-dot-orthogonality": {
    "id": "la-dot-orthogonality",
    "courseId": 29,
    "title": "Producto escalar, ortogonalidad y geometría",
    "shortTitle": "Producto escalar, ortogonalidad y geometría",
    "duration": 90,
    "objective": "usar productos internos para medir ángulos, longitudes, ortogonalidad y construir bases ortonormales.",
    "summary": [
      "En R^n, x·y=x^T y; induce ||x||₂=sqrt(x·x) y define ortogonalidad mediante x·y=0.",
      "Cauchy-Schwarz garantiza |x·y|≤||x||||y|| y sustenta la definición de ángulo; la igualdad ocurre cuando los vectores son linealmente dependientes.",
      "Una base ortonormal simplifica coordenadas y proyecciones: los coeficientes se obtienen mediante productos internos."
    ],
    "concept": "En R^n, x·y=x^T y; induce ||x||₂=sqrt(x·x) y define ortogonalidad mediante x·y=0.",
    "rules": [
      "En R^n, x·y=x^T y; induce ||x||₂=sqrt(x·x) y define ortogonalidad mediante x·y=0.",
      "Cauchy-Schwarz garantiza |x·y|≤||x||||y|| y sustenta la definición de ángulo; la igualdad ocurre cuando los vectores son linealmente dependientes.",
      "Una base ortonormal simplifica coordenadas y proyecciones: los coeficientes se obtienen mediante productos internos."
    ],
    "deep": {
      "intro": "Un producto interno no es solo una multiplicación: debe satisfacer positividad, linealidad apropiada y simetría/conjugate-symmetry. En espacios complejos se usa conjugación.",
      "sections": [
        {
          "title": "Producto interno",
          "body": "Un producto interno no es solo una multiplicación: debe satisfacer positividad, linealidad apropiada y simetría/conjugate-symmetry. En espacios complejos se usa conjugación."
        },
        {
          "title": "Ortogonalidad",
          "body": "Vectores ortogonales no nulos son linealmente independientes. La ortogonalidad permite descomponer energía/norma mediante Pitágoras y reduce problemas acoplados a coeficientes independientes."
        },
        {
          "title": "Gram-Schmidt",
          "body": "Gram-Schmidt transforma una familia linealmente independiente en una ortogonal/ortonormal con el mismo span. En computación numérica, variantes como modified Gram-Schmidt o QR por Householder pueden ser más estables que la versión clásica ingenua."
        },
        {
          "title": "Ángulos",
          "body": "Para vectores no nulos, cos θ=(x·y)/(||x||||y||). El signo del producto indica ángulos agudos/obtusos, pero el valor depende de la métrica elegida."
        }
      ]
    },
    "example": {
      "problem": "Calcula el ángulo entre x=(1,1) e y=(1,-1).",
      "steps": [
        "x·y=1-1=0.",
        "Ambos vectores son no nulos.",
        "Producto cero implica ortogonalidad, por tanto θ=90°."
      ],
      "solution": "90° (π/2)."
    },
    "check": {
      "question": "¿Dos vectores ortogonales no nulos son necesariamente linealmente independientes?",
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
          "Solo en R²",
          false
        ]
      ],
      "feedback": "Si av+bw=0 y v·w=0 con ambos no nulos, tomar productos internos fuerza a=b=0."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Calcula (1,2)·(3,4).",
        "answer": "11",
        "hint": "1·3+2·4."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Norma euclídea de (3,4).",
        "answer": "5",
        "hint": "sqrt(9+16)."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede un vector no nulo ser ortogonal a sí mismo bajo el producto euclídeo? sí/no",
        "answer": "no",
        "hint": "v·v=||v||²>0."
      }
    ]
  },
  "la-cross": {
    "id": "la-cross",
    "courseId": 29,
    "title": "Producto vectorial, orientación y geometría 3D",
    "shortTitle": "Producto vectorial, orientación y geometría 3D",
    "duration": 90,
    "objective": "interpretar el producto vectorial en R³, distinguirlo del producto escalar y usarlo para áreas, normales y orientación.",
    "summary": [
      "El producto vectorial u×v en R³ es perpendicular a u y v, con magnitud ||u||||v||sinθ y orientación dada por la convención de mano derecha.",
      "No es conmutativo: u×v=−(v×u), y u×u=0.",
      "Su existencia con estas propiedades está ligada a la estructura tridimensional; no debe tratarse como una operación vectorial universal en R^n."
    ],
    "concept": "El producto vectorial u×v en R³ es perpendicular a u y v, con magnitud ||u||||v||sinθ y orientación dada por la convención de mano derecha.",
    "rules": [
      "El producto vectorial u×v en R³ es perpendicular a u y v, con magnitud ||u||||v||sinθ y orientación dada por la convención de mano derecha.",
      "No es conmutativo: u×v=−(v×u), y u×u=0.",
      "Su existencia con estas propiedades está ligada a la estructura tridimensional; no debe tratarse como una operación vectorial universal en R^n."
    ],
    "deep": {
      "intro": "u×v codifica simultáneamente área orientada y una normal al plano generado por u y v. Si los vectores son paralelos, la magnitud es cero.",
      "sections": [
        {
          "title": "Definición geométrica",
          "body": "u×v codifica simultáneamente área orientada y una normal al plano generado por u y v. Si los vectores son paralelos, la magnitud es cero."
        },
        {
          "title": "Determinante y orientación",
          "body": "Las componentes pueden calcularse con el determinante formal de la matriz con i,j,k y los vectores. El signo depende de la orientación de la base."
        },
        {
          "title": "Aplicaciones",
          "body": "En gráficos se usa para normales y orientación de triángulos; en física aparece en torque y momento angular. La interpretación física depende de unidades y modelo."
        },
        {
          "title": "Generalización",
          "body": "En dimensiones distintas se usan construcciones como productos exteriores/wedge y formas alternantes. “Cross product” no es simplemente una función disponible con idénticas propiedades para cualquier n."
        }
      ]
    },
    "example": {
      "problem": "Calcula (1,0,0)×(0,1,0).",
      "steps": [
        "Los vectores son e1 y e2.",
        "Por la orientación estándar de mano derecha, e1×e2=e3.",
        "El resultado tiene magnitud 1 y es perpendicular a ambos."
      ],
      "solution": "(0,0,1)."
    },
    "check": {
      "question": "¿u×v=v×u para todos u,v?",
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
          "Solo si son unitarios",
          false
        ]
      ],
      "feedback": "El producto vectorial es anticomutativo: u×v=−v×u."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Calcula (0,1,0)×(1,0,0).",
        "answer": "0,0,-1",
        "hint": "Invierte el orden de e1×e2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si u y v son paralelos, ¿||u×v||=0? sí/no",
        "answer": "si",
        "hint": "sin(0)=0."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Área del paralelogramo generado por (2,0,0) y (0,3,0).",
        "answer": "6",
        "hint": "||u×v||=2·3."
      }
    ]
  },
  "la-spaces-basis": {
    "id": "la-spaces-basis",
    "courseId": 29,
    "title": "Espacios vectoriales, subespacios, bases y dimensión",
    "shortTitle": "Espacios vectoriales, subespacios, bases y dimensión",
    "duration": 90,
    "objective": "probar propiedades de subespacios, construir bases y razonar con independencia, span y dimensión.",
    "summary": [
      "Un subespacio debe contener 0 y estar cerrado bajo suma y producto por escalares; condiciones homogéneas lineales producen subespacios, desplazamientos afines en general no.",
      "Una base es simultáneamente linealmente independiente y generadora; respecto a ella cada vector tiene coordenadas únicas.",
      "En dimensión finita, toda familia independiente puede extenderse a una base y todo conjunto generador puede reducirse a una base."
    ],
    "concept": "Un subespacio debe contener 0 y estar cerrado bajo suma y producto por escalares; condiciones homogéneas lineales producen subespacios, desplazamientos afines en general no.",
    "rules": [
      "Un subespacio debe contener 0 y estar cerrado bajo suma y producto por escalares; condiciones homogéneas lineales producen subespacios, desplazamientos afines en general no.",
      "Una base es simultáneamente linealmente independiente y generadora; respecto a ella cada vector tiene coordenadas únicas.",
      "En dimensión finita, toda familia independiente puede extenderse a una base y todo conjunto generador puede reducirse a una base."
    ],
    "deep": {
      "intro": "El conjunto {x:Ax=0}=ker A es subespacio. En cambio {x:Ax=b} con b≠0, si es no vacío, suele ser un espacio afín: una solución particular más ker A, y no contiene necesariamente 0.",
      "sections": [
        {
          "title": "Subespacio vs conjunto afín",
          "body": "El conjunto {x:Ax=0}=ker A es subespacio. En cambio {x:Ax=b} con b≠0, si es no vacío, suele ser un espacio afín: una solución particular más ker A, y no contiene necesariamente 0."
        },
        {
          "title": "Independencia y span",
          "body": "Independencia significa que la combinación lineal nula solo admite coeficientes todos cero. Span responde qué puede construirse; una base equilibra ausencia de redundancia con cobertura completa."
        },
        {
          "title": "Dimensión",
          "body": "Todas las bases de un espacio vectorial finito tienen el mismo número de vectores. Esa cardinalidad es la dimensión y es una propiedad del espacio, no de una base concreta."
        },
        {
          "title": "Coordenadas",
          "body": "La aplicación que lleva un vector a sus coordenadas en una base es un isomorfismo con F^n. Elegir base permite computar; cambiar de base cambia números, no la estructura abstracta."
        }
      ]
    },
    "example": {
      "problem": "Determina si S={(x,y,z): x+y+z=0} es subespacio de R³ y da una base.",
      "steps": [
        "La ecuación es homogénea, así que 0∈S y el conjunto es kernel de [1 1 1].",
        "Despeja z=-x-y: (x,y,z)=x(1,0,-1)+y(0,1,-1).",
        "Los dos generadores son independientes."
      ],
      "solution": "S es subespacio y una base es {(1,0,-1),(0,1,-1)}."
    },
    "check": {
      "question": "¿El conjunto {(x,y): x+y=1} es subespacio de R²?",
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
          "Solo si x,y son enteros",
          false
        ]
      ],
      "feedback": "No contiene al vector cero, por lo que falla una condición básica de subespacio."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Dimensión de span{(1,0),(0,1),(1,1)} en R².",
        "answer": "2",
        "hint": "El tercer vector es combinación de los dos primeros."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Toda base de R^5 tiene 5 vectores? sí/no",
        "answer": "si",
        "hint": "La dimensión es 5."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿ker(A) siempre es subespacio? sí/no",
        "answer": "si",
        "hint": "Es la preimagen de 0 bajo una transformación lineal."
      }
    ]
  },
  "la-transformations": {
    "id": "la-transformations",
    "courseId": 29,
    "title": "Transformaciones lineales, matrices y cambio de base",
    "shortTitle": "Transformaciones lineales, matrices y cambio de base",
    "duration": 90,
    "objective": "relacionar transformaciones lineales con sus matrices, kernels/imágenes y cambios de coordenadas.",
    "summary": [
      "T es lineal si T(αu+βv)=αT(u)+βT(v); basta conocer T sobre una base para determinarla completamente.",
      "La matriz de T depende de las bases elegidas. Cambiar de base produce una matriz similar cuando dominio y codominio son el mismo espacio y se cambia la base de ambos de forma coherente.",
      "Kernel mide direcciones colapsadas e imagen los resultados alcanzables; T es inyectiva iff ker T={0}."
    ],
    "concept": "T es lineal si T(αu+βv)=αT(u)+βT(v); basta conocer T sobre una base para determinarla completamente.",
    "rules": [
      "T es lineal si T(αu+βv)=αT(u)+βT(v); basta conocer T sobre una base para determinarla completamente.",
      "La matriz de T depende de las bases elegidas. Cambiar de base produce una matriz similar cuando dominio y codominio son el mismo espacio y se cambia la base de ambos de forma coherente.",
      "Kernel mide direcciones colapsadas e imagen los resultados alcanzables; T es inyectiva iff ker T={0}."
    ],
    "deep": {
      "intro": "Si B={v1,...,vn} es base, cualquier x=Σcivi y por linealidad T(x)=ΣciT(vi). Por eso las columnas de la matriz son coordenadas de T(vi).",
      "sections": [
        {
          "title": "Determinación por una base",
          "body": "Si B={v1,...,vn} es base, cualquier x=Σcivi y por linealidad T(x)=ΣciT(vi). Por eso las columnas de la matriz son coordenadas de T(vi)."
        },
        {
          "title": "Kernel e imagen",
          "body": "ker T es subespacio del dominio e im T del codominio. Rango-nulidad relaciona sus dimensiones. Para endomorfismos finito-dimensionales cuadrados, inyectividad y sobreyectividad son equivalentes."
        },
        {
          "title": "Cambio de base",
          "body": "Si P transforma coordenadas nuevas a antiguas, la matriz de un endomorfismo cambia como A_new=P^{-1} A_old P. Esto es similitud, no igualdad numérica."
        },
        {
          "title": "Composición",
          "body": "La composición corresponde al producto matricial. El orden AB expresa A∘B con vectores columna; invertirlo cambia el problema salvo casos especiales."
        }
      ]
    },
    "example": {
      "problem": "T:R²→R² satisface T(1,0)=(2,1) y T(0,1)=(-1,3). Halla la matriz estándar y T(4,2).",
      "steps": [
        "Las columnas son las imágenes de e1 y e2: A=[[2,-1],[1,3]].",
        "Multiplica A(4,2)^T.",
        "Resultado: (8-2,4+6)=(6,10)."
      ],
      "solution": "A=[[2,-1],[1,3]] y T(4,2)=(6,10)."
    },
    "check": {
      "question": "¿Dos matrices distintas pueden representar la misma transformación abstracta usando bases distintas?",
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
          "Solo si son diagonales",
          false
        ]
      ],
      "feedback": "La matriz depende de las bases. La transformación abstracta puede ser la misma."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si T(e1)=(1,2), T(e2)=(3,4), primera columna de [T]?",
        "answer": "1,2",
        "hint": "Las columnas son imágenes de vectores base."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿T lineal y ker T={0} implica inyectiva? sí/no",
        "answer": "si",
        "hint": "Es una caracterización estándar."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Si A_new=P^-1 A P, ¿A_new y A representan el mismo endomorfismo en bases distintas? sí/no",
        "answer": "si",
        "hint": "Son matrices similares."
      }
    ]
  },
  "la-determinant-inverse": {
    "id": "la-determinant-inverse",
    "courseId": 29,
    "title": "Determinante, invertibilidad y orientación",
    "shortTitle": "Determinante, invertibilidad y orientación",
    "duration": 90,
    "objective": "interpretar el determinante como factor de volumen orientado y usar equivalencias de invertibilidad sin depender de expansión por cofactores como método principal.",
    "summary": [
      "Para A cuadrada, det(A) escala volumen orientado; det(A)=0 exactamente cuando A colapsa alguna dimensión y no es invertible.",
      "det(AB)=det(A)det(B), y operaciones elementales afectan el determinante de forma controlada.",
      "Invertibilidad equivale, en dimensión finita cuadrada, a rango completo, kernel trivial, pivote en cada columna y determinante no nulo."
    ],
    "concept": "Para A cuadrada, det(A) escala volumen orientado; det(A)=0 exactamente cuando A colapsa alguna dimensión y no es invertible.",
    "rules": [
      "Para A cuadrada, det(A) escala volumen orientado; det(A)=0 exactamente cuando A colapsa alguna dimensión y no es invertible.",
      "det(AB)=det(A)det(B), y operaciones elementales afectan el determinante de forma controlada.",
      "Invertibilidad equivale, en dimensión finita cuadrada, a rango completo, kernel trivial, pivote en cada columna y determinante no nulo."
    ],
    "deep": {
      "intro": "El valor absoluto de det A es el factor por el que A escala volúmenes; el signo indica cambio de orientación sobre R. En 2D es área orientada, en 3D volumen orientado.",
      "sections": [
        {
          "title": "Interpretación geométrica",
          "body": "El valor absoluto de det A es el factor por el que A escala volúmenes; el signo indica cambio de orientación sobre R. En 2D es área orientada, en 3D volumen orientado."
        },
        {
          "title": "Determinante e independencia",
          "body": "Si las columnas son dependientes, el paralelepípedo colapsa y el determinante vale cero. Esto enlaza determinant, rank y null space."
        },
        {
          "title": "Inverse y sistemas",
          "body": "Si A es invertible, Ax=b tiene solución única x=A^{-1}b para todo b. En computación numérica normalmente es preferible resolver el sistema mediante factorización en lugar de formar explícitamente A^{-1}."
        },
        {
          "title": "Cofactores vs algoritmos",
          "body": "La expansión por cofactores es útil teóricamente para matrices pequeñas y pruebas, pero no es la forma general eficiente de calcular determinantes grandes. Eliminación/LU ofrece coste cúbico y mejor estructura computacional."
        }
      ]
    },
    "example": {
      "problem": "Para A=[[2,1],[4,2]], decide si es invertible.",
      "steps": [
        "det(A)=2·2-1·4=0.",
        "Determinante cero implica columnas linealmente dependientes.",
        "Por tanto el rango es menor que 2 y no existe inversa."
      ],
      "solution": "A no es invertible."
    },
    "check": {
      "question": "¿det(A)≠0 para una matriz cuadrada equivale a que ker(A)={0}?",
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
          "Solo para matrices diagonales",
          false
        ]
      ],
      "feedback": "Es parte del teorema de la matriz invertible en dimensión finita."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "det([[3,0],[0,5]])",
        "answer": "15",
        "hint": "Producto diagonal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si det(A)=-2, det(3A) para A 2×2.",
        "answer": "-18",
        "hint": "det(cA)=c^n det(A), aquí n=2."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Es recomendable computar A^-1 explícitamente solo para resolver Ax=b? sí/no",
        "answer": "no",
        "hint": "Usa una factorización/solver apropiado."
      }
    ]
  },
  "la-eigen": {
    "id": "la-eigen",
    "courseId": 29,
    "title": "Eigenvalues, eigenvectors y diagonalización",
    "shortTitle": "Eigenvalues, eigenvectors y diagonalización",
    "duration": 90,
    "objective": "calcular e interpretar eigenpares, distinguir multiplicidades y determinar cuándo una matriz es diagonalizable.",
    "summary": [
      "Av=λv con v≠0 significa que v conserva su dirección bajo A salvo escala/signo complejo; λ es un eigenvalue y v un eigenvector.",
      "Los eigenvalues satisfacen det(A−λI)=0, pero hallar raíces del polinomio característico no garantiza una base completa de eigenvectors.",
      "A es diagonalizable iff existe una base de eigenvectors; tener n eigenvalues distintos es suficiente, no necesario."
    ],
    "concept": "Av=λv con v≠0 significa que v conserva su dirección bajo A salvo escala/signo complejo; λ es un eigenvalue y v un eigenvector.",
    "rules": [
      "Av=λv con v≠0 significa que v conserva su dirección bajo A salvo escala/signo complejo; λ es un eigenvalue y v un eigenvector.",
      "Los eigenvalues satisfacen det(A−λI)=0, pero hallar raíces del polinomio característico no garantiza una base completa de eigenvectors.",
      "A es diagonalizable iff existe una base de eigenvectors; tener n eigenvalues distintos es suficiente, no necesario."
    ],
    "deep": {
      "intro": "Para cada λ, el eigenspace es ker(A−λI). Su dimensión es la multiplicidad geométrica. Esta no excede la multiplicidad algebraica de λ como raíz del polinomio característico.",
      "sections": [
        {
          "title": "Eigenspaces",
          "body": "Para cada λ, el eigenspace es ker(A−λI). Su dimensión es la multiplicidad geométrica. Esta no excede la multiplicidad algebraica de λ como raíz del polinomio característico."
        },
        {
          "title": "Diagonalización",
          "body": "Si P tiene eigenvectors independientes como columnas, A=PDP^{-1}. Entonces A^k=PD^kP^{-1}, lo que simplifica iteraciones, recurrencias lineales y sistemas dinámicos."
        },
        {
          "title": "No toda matriz diagonaliza",
          "body": "Una matriz Jordan no trivial puede tener un único eigenvector independiente pese a repetir un eigenvalue. El fallo de diagonalización es estructural, no un error del algoritmo."
        },
        {
          "title": "Complejos",
          "body": "Matrices reales pueden tener eigenvalues complejos. Trabajar sobre R o C cambia qué eigenvectores están disponibles; por eso siempre hay que declarar el campo."
        }
      ]
    },
    "example": {
      "problem": "Halla eigenvalues de A=[[2,0],[0,5]].",
      "steps": [
        "A−λI es diagonal con entradas 2−λ y 5−λ.",
        "det(A−λI)=(2−λ)(5−λ).",
        "Las raíces son λ=2 y λ=5; e1 y e2 son eigenvectors asociados."
      ],
      "solution": "λ=2 y λ=5."
    },
    "check": {
      "question": "¿Una matriz 2×2 con un único eigenvalue repetido es necesariamente no diagonalizable?",
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
          "Solo si su determinante es cero",
          false
        ]
      ],
      "feedback": "La identidad, por ejemplo, tiene un eigenvalue repetido y una base completa de eigenvectors."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Eigenvalues de diag(1,-3,4).",
        "answer": "1,-3,4",
        "hint": "En una diagonal son las entradas diagonales."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un eigenvector puede ser el vector cero? sí/no",
        "answer": "no",
        "hint": "La definición exige v≠0."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Tres eigenvalues distintos en una matriz 3×3 garantizan diagonalización? sí/no",
        "answer": "si",
        "hint": "Sus eigenvectors asociados son independientes."
      }
    ]
  },
  "la-symmetric": {
    "id": "la-symmetric",
    "courseId": 29,
    "title": "Matrices simétricas, teorema espectral y formas cuadráticas",
    "shortTitle": "Matrices simétricas, teorema espectral y formas cuadráticas",
    "duration": 90,
    "objective": "usar la estructura de matrices simétricas reales para diagonalización ortogonal, clasificación de formas cuadráticas y estabilidad geométrica.",
    "summary": [
      "Toda matriz real simétrica admite una base ortonormal de eigenvectors y todos sus eigenvalues son reales.",
      "El teorema espectral da A=QΛQ^T con Q ortogonal; esto es más fuerte que una diagonalización arbitraria.",
      "La forma cuadrática x^T A x para A simétrica se clasifica por los signos de los eigenvalues: positiva definida, semidefinida, indefinida, etc."
    ],
    "concept": "Toda matriz real simétrica admite una base ortonormal de eigenvectors y todos sus eigenvalues son reales.",
    "rules": [
      "Toda matriz real simétrica admite una base ortonormal de eigenvectors y todos sus eigenvalues son reales.",
      "El teorema espectral da A=QΛQ^T con Q ortogonal; esto es más fuerte que una diagonalización arbitraria.",
      "La forma cuadrática x^T A x para A simétrica se clasifica por los signos de los eigenvalues: positiva definida, semidefinida, indefinida, etc."
    ],
    "deep": {
      "intro": "La simetría implica que eigenvectors asociados a eigenvalues distintos son ortogonales. Agrupando bases ortonormales de los eigenspaces se obtiene una matriz ortogonal Q.",
      "sections": [
        {
          "title": "Teorema espectral",
          "body": "La simetría implica que eigenvectors asociados a eigenvalues distintos son ortogonales. Agrupando bases ortonormales de los eigenspaces se obtiene una matriz ortogonal Q."
        },
        {
          "title": "Matrices ortogonales",
          "body": "Q^TQ=I preserva producto escalar, normas y ángulos. Invertir Q cuesta conceptualmente solo transponer: Q^{-1}=Q^T."
        },
        {
          "title": "Formas cuadráticas",
          "body": "En coordenadas espectrales y=Q^Tx, x^TAx=Σ λ_i y_i². Los signos de λ_i hacen transparente curvatura y definitud."
        },
        {
          "title": "Aplicaciones",
          "body": "Covarianzas, Hessianos simétricos, energía en sistemas físicos y PCA explotan esta estructura. No toda matriz real tiene estas garantías; dependen de simetría/normalidad apropiada."
        }
      ]
    },
    "example": {
      "problem": "Clasifica A=diag(2,5) como forma cuadrática.",
      "steps": [
        "Sus eigenvalues son 2 y 5.",
        "Ambos son estrictamente positivos.",
        "Para x≠0, x^TAx=2x1²+5x2²>0."
      ],
      "solution": "A es positiva definida."
    },
    "check": {
      "question": "¿Toda matriz real simétrica tiene eigenvalues reales?",
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
          "Solo si det(A)>0",
          false
        ]
      ],
      "feedback": "Es una consecuencia del teorema espectral para matrices simétricas reales."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Q ortogonal implica Q^-1=Q^T? sí/no",
        "answer": "si",
        "hint": "Q^TQ=I."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Clasifica diag(1,-1).",
        "answer": "indefinida",
        "hint": "La forma toma valores positivos y negativos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Eigenvectors de una simétrica para eigenvalues distintos pueden elegirse ortogonales? sí/no",
        "answer": "si",
        "hint": "De hecho son ortogonales automáticamente."
      }
    ]
  },
  "la-svd": {
    "id": "la-svd",
    "courseId": 29,
    "title": "SVD, pseudoinversa y aproximación de bajo rango",
    "shortTitle": "SVD, pseudoinversa y aproximación de bajo rango",
    "duration": 90,
    "objective": "descomponer matrices mediante SVD, relacionar singular values con rango/condicionamiento y construir pseudoinversas y aproximaciones óptimas.",
    "summary": [
      "Toda matriz real m×n admite una SVD A=UΣV^T con U,V ortogonales (o versiones reducidas) y singular values σ_i≥0.",
      "Los singular values son raíces cuadradas de eigenvalues de A^T A; el número de singular values positivos es rank(A).",
      "Truncar la SVD produce una mejor aproximación de rango k en normas espectral y Frobenius según Eckart–Young–Mirsky."
    ],
    "concept": "Toda matriz real m×n admite una SVD A=UΣV^T con U,V ortogonales (o versiones reducidas) y singular values σ_i≥0.",
    "rules": [
      "Toda matriz real m×n admite una SVD A=UΣV^T con U,V ortogonales (o versiones reducidas) y singular values σ_i≥0.",
      "Los singular values son raíces cuadradas de eigenvalues de A^T A; el número de singular values positivos es rank(A).",
      "Truncar la SVD produce una mejor aproximación de rango k en normas espectral y Frobenius según Eckart–Young–Mirsky."
    ],
    "deep": {
      "intro": "A diferencia de la diagonalización por eigenvectors, la SVD existe para cualquier matriz rectangular. V describe direcciones de entrada, Σ escala y U describe direcciones de salida.",
      "sections": [
        {
          "title": "Existencia universal",
          "body": "A diferencia de la diagonalización por eigenvectors, la SVD existe para cualquier matriz rectangular. V describe direcciones de entrada, Σ escala y U describe direcciones de salida."
        },
        {
          "title": "Singular values y condición",
          "body": "σ_max mide máxima amplificación euclídea y, si A tiene rango completo apropiado, σ_min controla la mínima. El cociente κ2=σ_max/σ_min refleja sensibilidad en problemas lineales."
        },
        {
          "title": "Pseudoinversa",
          "body": "La Moore-Penrose pseudoinverse se construye como A^+=VΣ^+U^T, invirtiendo singular values no nulos. Generaliza la inversa y aparece en mínimos cuadrados/minimum norm."
        },
        {
          "title": "Low rank",
          "body": "Conservar los k singular values mayores produce compresión y denoising. La calidad depende del decaimiento del espectro; si todos los σ_i son comparables, una aproximación muy baja en rango perderá mucha información."
        }
      ]
    },
    "example": {
      "problem": "Para A=diag(3,1), ¿cuáles son sus singular values y la mejor aproximación de rango 1?",
      "steps": [
        "Como A es diagonal positiva, sus singular values son 3 y 1.",
        "Conserva σ1=3 y anula σ2=1.",
        "La aproximación es diag(3,0)."
      ],
      "solution": "σ=(3,1); A₁=diag(3,0)."
    },
    "check": {
      "question": "¿Toda matriz rectangular tiene SVD?",
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
          "Solo si tiene rango completo",
          false
        ]
      ],
      "feedback": "La SVD existe para toda matriz finita real o compleja, con la formulación apropiada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Singular values de diag(4,2).",
        "answer": "4,2",
        "hint": "Son valores absolutos de la diagonal en este caso."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si A tiene singular values 5,2,0, ¿rank(A)?",
        "answer": "2",
        "hint": "Cuenta singular values positivos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿SVD requiere que A sea cuadrada? sí/no",
        "answer": "no",
        "hint": "Funciona para m×n."
      }
    ]
  },
  "la-norms-projections": {
    "id": "la-norms-projections",
    "courseId": 29,
    "title": "Normas, proyecciones y mínimos cuadrados",
    "shortTitle": "Normas, proyecciones y mínimos cuadrados",
    "duration": 90,
    "objective": "usar normas vectoriales/matriciales, proyecciones ortogonales y mínimos cuadrados para aproximar datos y resolver sistemas inconsistentes.",
    "summary": [
      "Una norma mide tamaño y debe cumplir positividad, homogeneidad y desigualdad triangular; ||·||1, ||·||2 y ||·||∞ capturan geometrías distintas.",
      "La proyección ortogonal sobre un subespacio minimiza la distancia euclídea; el residual es ortogonal al subespacio.",
      "Para mínimos cuadrados min_x||Ax−b||₂, las ecuaciones normales A^T A x=A^T b expresan ortogonalidad del residual, pero QR/SVD suelen ser numéricamente preferibles."
    ],
    "concept": "Una norma mide tamaño y debe cumplir positividad, homogeneidad y desigualdad triangular; ||·||1, ||·||2 y ||·||∞ capturan geometrías distintas.",
    "rules": [
      "Una norma mide tamaño y debe cumplir positividad, homogeneidad y desigualdad triangular; ||·||1, ||·||2 y ||·||∞ capturan geometrías distintas.",
      "La proyección ortogonal sobre un subespacio minimiza la distancia euclídea; el residual es ortogonal al subespacio.",
      "Para mínimos cuadrados min_x||Ax−b||₂, las ecuaciones normales A^T A x=A^T b expresan ortogonalidad del residual, pero QR/SVD suelen ser numéricamente preferibles."
    ],
    "deep": {
      "intro": "Normas distintas son equivalentes topológicamente en dimensión finita, pero sus valores y bolas unitarias difieren. En optimización/ML, elegir norma cambia regularización y geometría.",
      "sections": [
        {
          "title": "Normas",
          "body": "Normas distintas son equivalentes topológicamente en dimensión finita, pero sus valores y bolas unitarias difieren. En optimización/ML, elegir norma cambia regularización y geometría."
        },
        {
          "title": "Proyección sobre un vector",
          "body": "Para u≠0, proj_u(v)=(v·u)/(u·u) u. Si u está normalizado, el coeficiente es simplemente v·u."
        },
        {
          "title": "Proyección sobre un subespacio",
          "body": "Con Q de columnas ortonormales, P=QQ^T es el proyector ortogonal. P es simétrico e idempotente: P^T=P y P²=P."
        },
        {
          "title": "Mínimos cuadrados y estabilidad",
          "body": "Las ecuaciones normales cuadran el número de condición en sentido 2, por lo que QR o SVD pueden ser mejores en problemas mal condicionados. Resolver de forma exacta las normales no elimina errores de condicionamiento."
        }
      ]
    },
    "example": {
      "problem": "Proyecta v=(3,4) sobre u=(1,0).",
      "steps": [
        "u·u=1 y v·u=3.",
        "proj_u(v)=3u.",
        "El residual (0,4) es ortogonal a u."
      ],
      "solution": "proj=(3,0)."
    },
    "check": {
      "question": "¿En mínimos cuadrados el residual óptimo es ortogonal al espacio columna de A?",
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
          "Solo si A es cuadrada",
          false
        ]
      ],
      "feedback": "Las ecuaciones normales son A^T(Ax-b)=0, exactamente la condición de ortogonalidad al espacio columna."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "||(-3,4)||2",
        "answer": "5",
        "hint": "sqrt(9+16)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Proyección de (2,2) sobre span{(1,0)}.",
        "answer": "2,0",
        "hint": "Conserva la componente x."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿P=QQ^T con Q ortonormal satisface P^2=P? sí/no",
        "answer": "si",
        "hint": "QQ^TQQ^T=QIQ^T."
      }
    ]
  },
  "la-applications": {
    "id": "la-applications",
    "courseId": 29,
    "title": "Aplicaciones: gráficos, física, IA y señales",
    "shortTitle": "Aplicaciones: gráficos, física, IA y señales",
    "duration": 90,
    "objective": "conectar álgebra lineal con transformaciones geométricas, estados físicos, aprendizaje automático y procesamiento de señales sin perder las hipótesis matemáticas.",
    "summary": [
      "Gráficos usan matrices para transformaciones y coordenadas homogéneas; física usa vectores/operadores para estados y cambios de base; IA usa productos matriciales, embeddings, covarianzas y factorizaciones.",
      "Procesamiento de señales explota bases y transformaciones para expresar una señal en dominios donde estructura, energía o filtrado son más simples.",
      "La representación correcta depende de unidades, base, métrica y condicionamiento; una multiplicación matricial válida puede representar un modelo físicamente incorrecto."
    ],
    "concept": "Gráficos usan matrices para transformaciones y coordenadas homogéneas; física usa vectores/operadores para estados y cambios de base; IA usa productos matriciales, embeddings, covarianzas y factorizaciones.",
    "rules": [
      "Gráficos usan matrices para transformaciones y coordenadas homogéneas; física usa vectores/operadores para estados y cambios de base; IA usa productos matriciales, embeddings, covarianzas y factorizaciones.",
      "Procesamiento de señales explota bases y transformaciones para expresar una señal en dominios donde estructura, energía o filtrado son más simples.",
      "La representación correcta depende de unidades, base, métrica y condicionamiento; una multiplicación matricial válida puede representar un modelo físicamente incorrecto."
    ],
    "deep": {
      "intro": "Rotaciones, escalados y proyecciones se representan mediante matrices. Las coordenadas homogéneas añaden una dimensión para representar transformaciones afines y proyectivas mediante multiplicación matricial.",
      "sections": [
        {
          "title": "Gráficos",
          "body": "Rotaciones, escalados y proyecciones se representan mediante matrices. Las coordenadas homogéneas añaden una dimensión para representar transformaciones afines y proyectivas mediante multiplicación matricial."
        },
        {
          "title": "Física",
          "body": "Estados y observables lineales aparecen en múltiples modelos. Bases ortonormales permiten descomponer componentes; eigenmodes describen modos naturales en sistemas lineales. Las unidades y la métrica importan."
        },
        {
          "title": "IA",
          "body": "Una capa lineal y=Wx+b es afín, no estrictamente lineal si b≠0. PCA explota eigenestructura/SVD de datos centrados; embeddings y atención contienen operaciones matriciales, pero su semántica no se reduce a “solo matrices”."
        },
        {
          "title": "Señales",
          "body": "DFT/FFT pueden verse como cambio de coordenadas hacia una base compleja de frecuencias. Convolución y filtrado se relacionan con operadores lineales bajo hipótesis apropiadas. Esto enlaza con el futuro bloque de señales y FFT."
        }
      ]
    },
    "example": {
      "problem": "Una capa y=Wx+b tiene W lineal y b≠0. ¿Es la aplicación completa y=Wx+b lineal?",
      "steps": [
        "Para linealidad debe cumplirse f(0)=0.",
        "Aquí f(0)=b.",
        "Si b≠0, la aplicación completa es afín, no lineal."
      ],
      "solution": "No; es afín salvo b=0."
    },
    "check": {
      "question": "¿Una traslación 2D ordinaria es una transformación lineal de R²?",
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
          "Solo si se escribe con matrices",
          false
        ]
      ],
      "feedback": "Una traslación no fija el origen. Puede representarse linealmente en coordenadas homogéneas de dimensión aumentada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una rotación euclídea preserva norma? sí/no",
        "answer": "si",
        "hint": "Su matriz es ortogonal en la métrica estándar."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si b≠0, ¿x↦Wx+b es lineal? sí/no",
        "answer": "no",
        "hint": "No envía 0 a 0."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿PCA usa estructura espectral/SVD? sí/no",
        "answer": "si",
        "hint": "Relaciona varianza con direcciones principales."
      }
    ]
  }
});
