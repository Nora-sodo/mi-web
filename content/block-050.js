/**
 * BLOQUE 050 — Raymarching y Shader Art
 *
 * Regla editorial: distinguir función implícita, SDF exacta y distance bound;
 * separar traversal, shading y postprocesado; etiquetar heurísticas visuales
 * (soft shadows/AO) como aproximaciones y no como transporte físico exacto.
 */
window.LEARNING_PATHS[50] = {
  "level": "Experto técnico-creativo",
  "estimatedHours": 126,
  "description": "Geometría implícita y shader art procedural mediante SDFs, sphere tracing, CSG, iluminación, fractales y ruido.",
  "outcomes": [
    "Construir escenas implícitas con SDFs y distance estimators sin confundir sus garantías.",
    "Implementar raymarching/sphere tracing, normales, sombras y AO con presupuestos explícitos.",
    "Usar repetición de dominio, noise y texturas procedurales para generación compacta.",
    "Perfilar e integrar una pieza shader art sincronizable y preparada para sizecoding."
  ],
  "modules": [
    {
      "id": "m1-fields",
      "title": "Campos y recorrido",
      "description": "SDF, raymarching, sphere tracing y CSG",
      "lessons": [
        "ray-sdf",
        "ray-raymarch",
        "ray-sphere-tracing",
        "ray-csg"
      ]
    },
    {
      "id": "m2-shading",
      "title": "Superficie y luz",
      "description": "Normales, iluminación, sombras y AO",
      "lessons": [
        "ray-normals",
        "ray-lighting",
        "ray-soft-shadows",
        "ray-ao"
      ]
    },
    {
      "id": "m3-procedural",
      "title": "Geometría y señal procedural",
      "description": "Fractales, repetición, noise y texturas",
      "lessons": [
        "ray-fractals",
        "ray-domain-repetition",
        "ray-noise",
        "ray-procedural-textures"
      ]
    },
    {
      "id": "m4-production",
      "title": "Producción shader art",
      "description": "Rendimiento, depuración e integración",
      "lessons": [
        "ray-performance",
        "ray-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "ray-sdf": {
    "id": "ray-sdf",
    "courseId": 50,
    "title": "Signed distance fields",
    "shortTitle": "SDF",
    "duration": 95,
    "objective": "Representar superficies implícitas con campos de distancia con signo y distinguir distancia exacta de distance bound.",
    "summary": [
      "Una SDF ideal devuelve distancia euclídea con signo hasta la superficie; negativo/interior y positivo/exterior según la convención declarada.",
      "Primitivas analíticas simples permiten construir escenas sin mallas, pero transformaciones y combinaciones pueden romper la propiedad de distancia exacta.",
      "Para sphere tracing importa que el paso sea conservador: sobreestimar la distancia puede atravesar una superficie."
    ],
    "concept": "Una SDF ideal devuelve distancia euclídea con signo hasta la superficie; negativo/interior y positivo/exterior según la convención declarada.",
    "rules": [
      "Declara la convención de signo.",
      "Distingue SDF exacta de distance estimator/bound.",
      "No asumas que toda función implícita puede usarse como paso seguro."
    ],
    "deep": {
      "intro": "Representar superficies implícitas con campos de distancia con signo y distinguir distancia exacta de distance bound.",
      "sections": [
        {
          "title": "Esfera",
          "body": "Para una esfera centrada en c de radio r, una SDF clásica es d(p)=||p-c||-r."
        },
        {
          "title": "Transformaciones",
          "body": "Trasladar equivale a evaluar en p-c. Escalas no uniformes requieren cuidado: transformar el dominio no conserva automáticamente una distancia euclídea exacta."
        },
        {
          "title": "Lipschitz/bounds",
          "body": "Sphere tracing necesita un límite conservador del espacio libre; una distancia sobreestimada puede saltar por encima de geometría."
        },
        {
          "title": "Gradiente",
          "body": "Cerca de una superficie regular, el gradiente de una SDF apunta aproximadamente en la dirección normal."
        }
      ]
    },
    "example": {
      "problem": "Esfera radio 2; punto a distancia 5 del centro. Valor SDF.",
      "steps": [
        "5-2=3."
      ],
      "solution": "3."
    },
    "check": {
      "question": "¿Una función implícita cualquiera es automáticamente una SDF?",
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
          "Solo en GPU",
          false
        ]
      ],
      "feedback": "Una SDF tiene una propiedad métrica adicional."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Dentro suele tener signo negativo en la convención usada?",
        "answer": "si",
        "hint": "La convención debe declararse."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Radio 4, punto a distancia 10: d=?",
        "answer": "6",
        "hint": "10-4."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Escala no uniforme conserva automáticamente una SDF exacta?",
        "answer": "no",
        "hint": "La métrica se deforma."
      }
    ]
  },
  "ray-raymarch": {
    "id": "ray-raymarch",
    "courseId": 50,
    "title": "Raymarching",
    "shortTitle": "Raymarch",
    "duration": 90,
    "objective": "Entender ray marching como integración/muestreo incremental a lo largo de un rayo y separarlo de sphere tracing.",
    "summary": [
      "Raymarching es una familia de técnicas que avanza por un rayo evaluando una función de escena o medio.",
      "El tamaño del paso puede ser fijo, adaptativo o derivado de información geométrica; sus garantías dependen de esa regla.",
      "Volumetric ray marching y surface sphere tracing comparten un recorrido por rayos pero estiman cantidades diferentes."
    ],
    "concept": "Raymarching es una familia de técnicas que avanza por un rayo evaluando una función de escena o medio.",
    "rules": [
      "No uses raymarching como sinónimo universal de sphere tracing.",
      "Controla maxSteps y maxDistance.",
      "Mide coste en evaluaciones de escena, no solo en píxeles."
    ],
    "deep": {
      "intro": "Entender ray marching como integración/muestreo incremental a lo largo de un rayo y separarlo de sphere tracing.",
      "sections": [
        {
          "title": "Rayo",
          "body": "p(t)=o+t d con d normalizada permite expresar puntos recorridos con una distancia paramétrica t."
        },
        {
          "title": "Paso fijo",
          "body": "Un paso fijo pequeño mejora muestreo pero aumenta coste; uno grande puede perder estructuras finas."
        },
        {
          "title": "Terminación",
          "body": "Se termina por impacto, distancia máxima o presupuesto de pasos."
        },
        {
          "title": "Volúmenes",
          "body": "En medios volumétricos se acumula densidad/transmitancia en vez de buscar solo una superficie."
        }
      ]
    },
    "example": {
      "problem": "64 pasos de 0.125 unidades recorren como máximo cuánto si todos se ejecutan.",
      "steps": [
        "64·0.125=8."
      ],
      "solution": "8 unidades."
    },
    "check": {
      "question": "¿Todo raymarching usa una SDF?",
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
          "Solo HLSL",
          false
        ]
      ],
      "feedback": "También existen pasos fijos y volume marching."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Raymarching y sphere tracing son idénticos?",
        "answer": "no",
        "hint": "Sphere tracing es un caso especializado."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "32 pasos de 0.25 recorren cuánto?",
        "answer": "8",
        "hint": "Multiplica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿MaxSteps también es un presupuesto de rendimiento?",
        "answer": "si",
        "hint": "Limita evaluaciones."
      }
    ]
  },
  "ray-sphere-tracing": {
    "id": "ray-sphere-tracing",
    "courseId": 50,
    "title": "Sphere tracing",
    "shortTitle": "Sphere tracing",
    "duration": 105,
    "objective": "Aplicar sphere tracing con pasos conservadores y entender cuándo sus garantías dejan de ser válidas.",
    "summary": [
      "Sphere tracing avanza por el rayo usando una distancia o bound conservador hasta la superficie.",
      "Con una distancia válida, una esfera del radio retornado cabe en espacio libre y el paso no debería atravesar la primera superficie.",
      "Epsilon de hit, maxSteps y maxDistance son parámetros numéricos, no propiedades geométricas absolutas."
    ],
    "concept": "Sphere tracing avanza por el rayo usando una distancia o bound conservador hasta la superficie.",
    "rules": [
      "No sobreestimes el espacio libre si quieres conservar seguridad de paso.",
      "Separa epsilon visual de escala de escena.",
      "Evita afirmar O(log n): el coste depende del campo y del rayo."
    ],
    "deep": {
      "intro": "Aplicar sphere tracing con pasos conservadores y entender cuándo sus garantías dejan de ser válidas.",
      "sections": [
        {
          "title": "Paso seguro",
          "body": "Si d(p)=0.7 es una distancia conservadora a cualquier superficie, avanzar 0.7 a lo largo del rayo no cruza geometría."
        },
        {
          "title": "Hit epsilon",
          "body": "Se suele aceptar hit cuando d(p)<eps; un eps grande infla superficies y uno diminuto puede desperdiciar pasos."
        },
        {
          "title": "Distance estimators",
          "body": "Fractales y deformaciones usan a menudo estimadores que no son SDF exactas; hay que razonar sobre su conservadurismo."
        },
        {
          "title": "Stalling",
          "body": "Rayos tangentes o campos pobres pueden converger lentamente y consumir maxSteps."
        }
      ]
    },
    "example": {
      "problem": "Distancias consecutivas 1.5,0.5,0.08; distancia total avanzada.",
      "steps": [
        "1.5+0.5+0.08=2.08."
      ],
      "solution": "2.08."
    },
    "check": {
      "question": "¿Sphere tracing puede atravesar geometría si el campo sobreestima la distancia?",
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
          "Solo con sombras",
          false
        ]
      ],
      "feedback": "La garantía depende de un paso conservador."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Sphere tracing es un caso de ray marching?",
        "answer": "si",
        "hint": "Usa la distancia para adaptar el paso."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "1.2+0.3+0.1=?",
        "answer": "1.6",
        "hint": "Suma avances."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Reducir epsilon siempre mejora rendimiento?",
        "answer": "no",
        "hint": "Puede aumentar iteraciones."
      }
    ]
  },
  "ray-csg": {
    "id": "ray-csg",
    "courseId": 50,
    "title": "CSG con campos",
    "shortTitle": "CSG",
    "duration": 95,
    "objective": "Combinar primitivas implícitas mediante operaciones booleanas y entender sus límites métricos.",
    "summary": [
      "Para SDFs compatibles, union se expresa típicamente con min(a,b), intersección con max(a,b) y diferencia con max(a,-b).",
      "Las operaciones booleanas preservan correctamente la superficie implícita bajo condiciones habituales, pero suavizados y deformaciones pueden dejar de ser distancias exactas.",
      "Smooth union cambia geometría y transición, no es una unión booleana exacta."
    ],
    "concept": "Para SDFs compatibles, union se expresa típicamente con min(a,b), intersección con max(a,b) y diferencia con max(a,-b).",
    "rules": [
      "Distingue superficie correcta de distancia exacta.",
      "Etiqueta smooth CSG como modelado aproximado/suavizado.",
      "No confundas combinar funciones con duplicar meshes."
    ],
    "deep": {
      "intro": "Combinar primitivas implícitas mediante operaciones booleanas y entender sus límites métricos.",
      "sections": [
        {
          "title": "Union",
          "body": "min(dA,dB) elige la superficie más cercana de ambas formas."
        },
        {
          "title": "Intersección",
          "body": "max(dA,dB) exige estar dentro de ambas bajo la convención negativa-interior."
        },
        {
          "title": "Diferencia",
          "body": "max(dA,-dB) conserva A excepto donde B lo recorta."
        },
        {
          "title": "Smooth min",
          "body": "Funciones smooth-min redondean la transición y añaden un parámetro de suavidad."
        }
      ]
    },
    "example": {
      "problem": "dA=0.3,dB=-0.2. Union min.",
      "steps": [
        "min(0.3,-0.2)=-0.2."
      ],
      "solution": "-0.2."
    },
    "check": {
      "question": "¿Smooth union es exactamente la misma geometría que la unión booleana?",
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
          "Solo en 2D",
          false
        ]
      ],
      "feedback": "Introduce una transición nueva."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Union usa min o max?",
        "answer": "min",
        "hint": "Con negativo interior."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "max(-1,0.4)=?",
        "answer": "0.4",
        "hint": "Máximo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿CSG opera sobre funciones de campo?",
        "answer": "si",
        "hint": "No necesita fusionar buffers de vértices."
      }
    ]
  },
  "ray-normals": {
    "id": "ray-normals",
    "courseId": 50,
    "title": "Normales desde el campo",
    "shortTitle": "Normales",
    "duration": 90,
    "objective": "Estimar normales de superficies implícitas mediante el gradiente del campo.",
    "summary": [
      "Para una superficie f(p)=0, el gradiente ∇f es perpendicular a las isosuperficies cuando no se anula.",
      "En shaders se aproxima el gradiente con diferencias finitas o esquemas tetraédricos.",
      "El epsilon de normal debe relacionarse con escala y precisión; demasiado pequeño puede amplificar ruido numérico."
    ],
    "concept": "Para una superficie f(p)=0, el gradiente ∇f es perpendicular a las isosuperficies cuando no se anula.",
    "rules": [
      "Normaliza el gradiente antes de iluminar.",
      "No reutilices ciegamente el epsilon de hit.",
      "Diferencia error geométrico de error de derivada numérica."
    ],
    "deep": {
      "intro": "Estimar normales de superficies implícitas mediante el gradiente del campo.",
      "sections": [
        {
          "title": "Central differences",
          "body": "nx≈f(p+ex)-f(p-ex), análogo para y,z; después se normaliza."
        },
        {
          "title": "Escala",
          "body": "Si eps es enorme, suavizas detalles; si es minúsculo, floating point puede dominar."
        },
        {
          "title": "Analíticas",
          "body": "Para primitivas simples pueden existir normales analíticas más baratas."
        },
        {
          "title": "Transformaciones",
          "body": "Transformar el dominio exige razonar también cómo cambia el gradiente."
        }
      ]
    },
    "example": {
      "problem": "f(x+h)=0.3 y f(x-h)=0.1. Diferencia central sin dividir por 2h.",
      "steps": [
        "0.3-0.1=0.2."
      ],
      "solution": "0.2."
    },
    "check": {
      "question": "¿El gradiente de una superficie implícita regular apunta normal a la isosuperficie?",
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
          "Solo para planos",
          false
        ]
      ],
      "feedback": "Es perpendicular a curvas/superficies de nivel."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Hay que normalizar el gradiente para usarlo como normal unitaria?",
        "answer": "si",
        "hint": "Su magnitud no tiene por qué ser 1."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "0.7-0.2=?",
        "answer": "0.5",
        "hint": "Diferencia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿eps demasiado pequeño puede empeorar una normal numérica?",
        "answer": "si",
        "hint": "Precisión finita."
      }
    ]
  },
  "ray-lighting": {
    "id": "ray-lighting",
    "courseId": 50,
    "title": "Iluminación en shader art",
    "shortTitle": "Iluminación",
    "duration": 95,
    "objective": "Aplicar iluminación local a superficies raymarched sin confundir visibilidad, BRDF y exposición.",
    "summary": [
      "Una vez hallado un hit, posición, normal, material, dirección a luz y dirección a cámara alimentan un modelo de shading.",
      "Lambert, microfacetas o estilización son independientes de cómo se encontró la intersección.",
      "Raymarching no vuelve físicamente correcto un modelo de iluminación por sí mismo."
    ],
    "concept": "Una vez hallado un hit, posición, normal, material, dirección a luz y dirección a cámara alimentan un modelo de shading.",
    "rules": [
      "Separa intersección de shading.",
      "Haz cálculos de iluminación en espacio lineal cuando corresponda.",
      "No confundas distancia de luz con visibility/shadowing."
    ],
    "deep": {
      "intro": "Aplicar iluminación local a superficies raymarched sin confundir visibilidad, BRDF y exposición.",
      "sections": [
        {
          "title": "Lambert",
          "body": "Con n y l unitarios, diffuse usa max(dot(n,l),0) multiplicado por albedo y radiancia según convención."
        },
        {
          "title": "Material IDs",
          "body": "La función de escena puede devolver distancia + identificador/material, no solo un float."
        },
        {
          "title": "Attenuation",
          "body": "Luces puntuales pueden aplicar atenuación con distancia; el modelo debe declararse."
        },
        {
          "title": "Tone mapping",
          "body": "HDR y exposición siguen siendo etapas posteriores al transporte/shading."
        }
      ]
    },
    "example": {
      "problem": "dot(n,l)=0.6 y factor diffuse 0.8. Producto simple.",
      "steps": [
        "0.6·0.8=0.48."
      ],
      "solution": "0.48."
    },
    "check": {
      "question": "¿Cambiar rasterización por raymarching convierte Lambert en PBR?",
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
          "Solo con HDR",
          false
        ]
      ],
      "feedback": "La técnica de intersección y la BRDF son capas distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿N·L negativo suele clamp a 0 en Lambert unilateral?",
        "answer": "si",
        "hint": "Evita iluminar desde detrás."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "0.75·0.4=?",
        "answer": "0.3",
        "hint": "Multiplica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Raymarching define automáticamente la BRDF?",
        "answer": "no",
        "hint": "Es independiente."
      }
    ]
  },
  "ray-soft-shadows": {
    "id": "ray-soft-shadows",
    "courseId": 50,
    "title": "Soft shadows aproximadas",
    "shortTitle": "Soft shadows",
    "duration": 100,
    "objective": "Estimar penumbras visuales recorriendo la dirección hacia la luz y entender qué se está aproximando.",
    "summary": [
      "Un shadow ray puede marchar hacia la luz y detectar oclusión con el mismo campo.",
      "Aproximaciones populares acumulan una cota basada en distancia al oclusor frente a distancia recorrida para producir una sombra suave aparente.",
      "Estas fórmulas no equivalen necesariamente a integrar una luz de área físicamente."
    ],
    "concept": "Un shadow ray puede marchar hacia la luz y detectar oclusión con el mismo campo.",
    "rules": [
      "Distingue visibilidad binaria de heurística de penumbra.",
      "Limita el recorrido a la distancia real a la luz.",
      "Evita self-shadowing con offsets/bias razonados."
    ],
    "deep": {
      "intro": "Estimar penumbras visuales recorriendo la dirección hacia la luz y entender qué se está aproximando.",
      "sections": [
        {
          "title": "Hard shadow",
          "body": "Si el march encuentra superficie antes de la luz, visibility=0; si no, 1."
        },
        {
          "title": "Soft heuristic",
          "body": "Una razón proporcional a k·h/t puede reducir el factor si la geometría pasa cerca del rayo."
        },
        {
          "title": "Bias",
          "body": "Comenzar exactamente en la superficie puede detectar el propio objeto por precisión numérica."
        },
        {
          "title": "Area lights",
          "body": "Una solución física integra visibilidad sobre posiciones de la fuente; una heurística SDF es otra aproximación."
        }
      ]
    },
    "example": {
      "problem": "Distancia a luz 10 y oclusor a t=4: ¿se debe seguir marchando más allá de 10 para esa luz puntual?",
      "steps": [
        "No; la luz ya delimita el segmento relevante."
      ],
      "solution": "No."
    },
    "check": {
      "question": "¿Una fórmula de soft shadow SDF equivale siempre a integrar una luz de área?",
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
          "Solo si k=1",
          false
        ]
      ],
      "feedback": "Suele ser una heurística visual."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Shadow march termina al llegar a la luz?",
        "answer": "si",
        "hint": "Más allá no afecta ese segmento."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si visibility=0, ¿hay luz directa no ocluida por ese sample?",
        "answer": "no",
        "hint": "Está bloqueada."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Bias excesivo puede despegar sombras?",
        "answer": "si",
        "hint": "Puede perder oclusores cercanos."
      }
    ]
  },
  "ray-ao": {
    "id": "ray-ao",
    "courseId": 50,
    "title": "Ambient occlusion en SDF",
    "shortTitle": "AO",
    "duration": 90,
    "objective": "Aproximar oclusión local a partir del campo sin confundirla con iluminación global.",
    "summary": [
      "AO en shader art suele muestrear el campo a varias distancias a lo largo de la normal y medir cuánto invade la geometría esos samples.",
      "Es una medida geométrica/local y no transporta color ni energía indirecta completa.",
      "Número de muestras, radios y pesos definen coste y apariencia."
    ],
    "concept": "AO en shader art suele muestrear el campo a varias distancias a lo largo de la normal y medir cuánto invade la geometría esos samples.",
    "rules": [
      "AO no es GI.",
      "Evita samplear a escalas incompatibles con la escena.",
      "Mide coste adicional de cada evaluación del campo."
    ],
    "deep": {
      "intro": "Aproximar oclusión local a partir del campo sin confundirla con iluminación global.",
      "sections": [
        {
          "title": "Sampling",
          "body": "Para p+n·r, comparas la distancia esperada r con la distancia que devuelve la escena; una diferencia grande sugiere oclusión."
        },
        {
          "title": "Weights",
          "body": "Muestras cercanas y lejanas pueden recibir pesos distintos."
        },
        {
          "title": "Bent normal",
          "body": "Técnicas más avanzadas estiman dirección de mayor apertura, pero no es equivalente a radiancia indirecta."
        },
        {
          "title": "Coste",
          "body": "5 samples de AO pueden añadir 5 scene evaluations por hit, multiplicadas por píxeles visibles."
        }
      ]
    },
    "example": {
      "problem": "4 muestras AO por 200000 píxeles sombreado: evaluaciones extra máximas.",
      "steps": [
        "4·200000=800000."
      ],
      "solution": "800000."
    },
    "check": {
      "question": "¿AO calcula color bleeding completo?",
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
          "Solo en fractales",
          false
        ]
      ],
      "feedback": "No resuelve transporte global."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿AO es principalmente geométrico/local?",
        "answer": "si",
        "hint": "No integra GI completa."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "6·100000=?",
        "answer": "600000",
        "hint": "Evaluaciones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más samples AO siempre mejora FPS?",
        "answer": "no",
        "hint": "Aumenta coste."
      }
    ]
  },
  "ray-fractals": {
    "id": "ray-fractals",
    "courseId": 50,
    "title": "Fractales y distance estimators",
    "shortTitle": "Fractales",
    "duration": 110,
    "objective": "Renderizar fractales implícitos con distance estimators distinguiendo estimación, iteración y geometría exacta.",
    "summary": [
      "Muchos fractales 3D raymarched usan iteraciones y distance estimators, no SDFs euclídeas exactas.",
      "La órbita iterativa puede producir tanto una estimación de distancia como datos de shading/coloración.",
      "Bailout, iteraciones y parámetros cambian coste y apariencia; no son pruebas matemáticas universales de pertenencia."
    ],
    "concept": "Muchos fractales 3D raymarched usan iteraciones y distance estimators, no SDFs euclídeas exactas.",
    "rules": [
      "Llama distance estimator a lo que no sea una SDF exacta.",
      "Acota iteraciones y registra bailout.",
      "No confundas detalle aparente infinito con precisión numérica infinita."
    ],
    "deep": {
      "intro": "Renderizar fractales implícitos con distance estimators distinguiendo estimación, iteración y geometría exacta.",
      "sections": [
        {
          "title": "Iteración",
          "body": "Fractales tipo Mandelbulb transforman repetidamente un punto y acumulan magnitud/derivadas para estimar distancia."
        },
        {
          "title": "Orbit traps",
          "body": "Valores observados durante la órbita pueden alimentar color y material."
        },
        {
          "title": "Precision",
          "body": "Zoom y detalle extremos chocan con precisión floating point."
        },
        {
          "title": "Performance",
          "body": "Cada evaluación de escena puede contener decenas de iteraciones internas: pasos de raymarch × iteraciones fractales."
        }
      ]
    },
    "example": {
      "problem": "80 pasos y máximo 12 iteraciones internas por evaluación. Cota de iteraciones internas.",
      "steps": [
        "80·12=960."
      ],
      "solution": "960."
    },
    "check": {
      "question": "¿Un distance estimator fractal tiene que ser una SDF exacta?",
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
          "Solo en CPU",
          false
        ]
      ],
      "feedback": "Es precisamente una estimación/bound."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Orbit trap puede usarse para colorear?",
        "answer": "si",
        "hint": "Reutiliza información de la órbita."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "30·20=?",
        "answer": "600",
        "hint": "Coste compuesto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más iteraciones significan precisión infinita?",
        "answer": "no",
        "hint": "Sigue existiendo precisión finita."
      }
    ]
  },
  "ray-domain-repetition": {
    "id": "ray-domain-repetition",
    "courseId": 50,
    "title": "Domain repetition",
    "shortTitle": "Repetición",
    "duration": 95,
    "objective": "Repetir patrones transformando coordenadas antes de evaluar una única primitiva.",
    "summary": [
      "La repetición de dominio pliega o remapea p a una celda canónica y evalúa allí la misma función.",
      "Esto puede describir aparentemente muchas instancias con muy pocos parámetros, ideal para shader art y sizecoding.",
      "Operadores mod/repetition introducen discontinuidades y pueden requerir tratamiento especial cerca de fronteras."
    ],
    "concept": "La repetición de dominio pliega o remapea p a una celda canónica y evalúa allí la misma función.",
    "rules": [
      "Distingue repetición procedural de instancing de meshes.",
      "Controla celdas finitas cuando no quieras una escena infinita.",
      "No pierdas el ID de celda si necesitas variar material o animación."
    ],
    "deep": {
      "intro": "Repetir patrones transformando coordenadas antes de evaluar una única primitiva.",
      "sections": [
        {
          "title": "Repetition",
          "body": "q = mod(p+0.5c,c)-0.5c centra cada celda de tamaño c alrededor de 0."
        },
        {
          "title": "Cell ID",
          "body": "floor((p+0.5c)/c) puede identificar la celda para variar seeds."
        },
        {
          "title": "Finite repetition",
          "body": "Clamp del cell ID permite repetir solo un número limitado de veces."
        },
        {
          "title": "Symmetry",
          "body": "abs(p) puede plegar el espacio y crear simetría con poco código."
        }
      ]
    },
    "example": {
      "problem": "Periodo 4; posiciones separadas exactamente 12 unidades difieren cuántos periodos.",
      "steps": [
        "12/4=3."
      ],
      "solution": "3."
    },
    "check": {
      "question": "¿Domain repetition necesita almacenar una copia de la geometría por celda?",
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
          "Solo en Vulkan",
          false
        ]
      ],
      "feedback": "Remapea coordenadas y reutiliza la función."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿mod puede implementar repetición periódica?",
        "answer": "si",
        "hint": "Pliega el dominio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "20/5=? periodos",
        "answer": "4",
        "hint": "Divide."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Repetition infinita puede complicar bounds/aceleración?",
        "answer": "si",
        "hint": "La escena deja de ser localmente finita."
      }
    ]
  },
  "ray-noise": {
    "id": "ray-noise",
    "courseId": 50,
    "title": "Noise procedural",
    "shortTitle": "Noise",
    "duration": 105,
    "objective": "Usar ruido coherente y fBm como señal procedural, distinguiendo valor pseudoaleatorio de ruido filtrable y libre de artefactos.",
    "summary": [
      "Noise procedural genera variación reproducible a partir de coordenadas y seed, normalmente con continuidad espacial controlada.",
      "Value/gradient/simplex-like noise y hashes tienen propiedades espectrales y costes distintos; no todo hash visual es buen noise.",
      "fBm suma octavas con frecuencia creciente y amplitud decreciente, aumentando detalle y bandwidth."
    ],
    "concept": "Noise procedural genera variación reproducible a partir de coordenadas y seed, normalmente con continuidad espacial controlada.",
    "rules": [
      "Random por píxel no equivale a noise coherente.",
      "Controla frecuencia respecto al sampling para evitar aliasing.",
      "Haz explícitos seed, lacunarity y gain."
    ],
    "deep": {
      "intro": "Usar ruido coherente y fBm como señal procedural, distinguiendo valor pseudoaleatorio de ruido filtrable y libre de artefactos.",
      "sections": [
        {
          "title": "fBm",
          "body": "f(p)=Σ a_i noise(f_i p); típicamente f aumenta por lacunarity y amplitud cae por gain."
        },
        {
          "title": "Reproducibilidad",
          "body": "Misma seed + algoritmo + coordenada debe producir el mismo valor determinista."
        },
        {
          "title": "Aliasing",
          "body": "Frecuencias por encima de lo resoluble por el píxel pueden producir shimmering."
        },
        {
          "title": "Domain warping",
          "body": "Usar noise para perturbar las coordenadas antes de otro noise crea estructuras más ricas."
        }
      ]
    },
    "example": {
      "problem": "Amplitudes 1,0.5,0.25,0.125. Suma máxima si cada octave devuelve 1.",
      "steps": [
        "1.875."
      ],
      "solution": "1.875."
    },
    "check": {
      "question": "¿Hash independiente por píxel es necesariamente noise coherente?",
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
          "Solo si RGB",
          false
        ]
      ],
      "feedback": "La coherencia espacial es una propiedad adicional."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿fBm usa múltiples octavas?",
        "answer": "si",
        "hint": "Combina escalas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "1+0.5+0.25=?",
        "answer": "1.75",
        "hint": "Suma."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Frecuencia procedural demasiado alta puede alias?",
        "answer": "si",
        "hint": "Sampling discreto."
      }
    ]
  },
  "ray-procedural-textures": {
    "id": "ray-procedural-textures",
    "courseId": 50,
    "title": "Texturas procedurales",
    "shortTitle": "Texturas procedural",
    "duration": 100,
    "objective": "Construir materiales y texturas a partir de funciones sin confundir ausencia de bitmap con ausencia de coste o memoria.",
    "summary": [
      "Una textura procedural evalúa color/material desde coordenadas, parámetros y señales como noise, distance fields o patrones analíticos.",
      "Puede ahorrar distribución y permitir resolución virtual alta, pero consume ALU, bandwidth intermedio o tiempo de bake según estrategia.",
      "Procedural en runtime y procedural baked offline son arquitecturas distintas."
    ],
    "concept": "Una textura procedural evalúa color/material desde coordenadas, parámetros y señales como noise, distance fields o patrones analíticos.",
    "rules": [
      "No llames gratis a una textura que cambia bytes por cómputo.",
      "Distingue coordenadas del material de coordenadas del mundo.",
      "Filtra o antialias patrones de alta frecuencia."
    ],
    "deep": {
      "intro": "Construir materiales y texturas a partir de funciones sin confundir ausencia de bitmap con ausencia de coste o memoria.",
      "sections": [
        {
          "title": "Checker",
          "body": "floor(u*s)+floor(v*s) mod 2 produce una cuadrícula, pero puede alias lejos de cámara."
        },
        {
          "title": "Triplanar",
          "body": "Proyecta desde varios ejes y mezcla por normal para evitar UV explícitas en ciertos objetos."
        },
        {
          "title": "Bake",
          "body": "Puedes evaluar procedural offline y guardar bitmap si runtime es prioritario."
        },
        {
          "title": "Sizecoding",
          "body": "Parámetros + función pueden sustituir muchos KB/MB de texturas distribuidas."
        }
      ]
    },
    "example": {
      "problem": "Generador 900 B sustituye 5 texturas de 32 KiB. Ahorro bruto bytes ignorando compresión.",
      "steps": [
        "5·32768-900=162940."
      ],
      "solution": "162940."
    },
    "check": {
      "question": "¿Procedural texture implica que no existe coste de cómputo?",
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
          "Solo en 2D",
          false
        ]
      ],
      "feedback": "Cambia almacenamiento por cálculo/tooling."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Procedural puede bakearse offline?",
        "answer": "si",
        "hint": "Procedural describe generación, no necesariamente ejecución runtime."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "2 texturas de 1024 B sustituidas por 300 B: ahorro.",
        "answer": "1748",
        "hint": "2048-300."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Checker sin filtrado puede alias?",
        "answer": "si",
        "hint": "Patrón de alta frecuencia."
      }
    ]
  },
  "ray-performance": {
    "id": "ray-performance",
    "courseId": 50,
    "title": "Rendimiento y depuración",
    "shortTitle": "Performance",
    "duration": 100,
    "objective": "Perfilar raymarching por evaluaciones de campo, divergencia y precisión, usando visualizaciones diagnósticas.",
    "summary": [
      "El coste dominante suele ser píxeles × pasos × coste de scene evaluation, más sombras/AO/normal estimation.",
      "Early exit, bounds, menor resolución, temporal accumulation y simplificación de distancia pueden cambiar mucho el coste.",
      "Visualizar step count, distancia mínima, normal y material ID convierte artefactos en datos diagnosticables."
    ],
    "concept": "El coste dominante suele ser píxeles × pasos × coste de scene evaluation, más sombras/AO/normal estimation.",
    "rules": [
      "Perfila la GPU, no deduzcas rendimiento solo del source.",
      "Cuenta evaluaciones anidadas.",
      "No sacrifiques conservadurismo del distance bound sin medir artefactos."
    ],
    "deep": {
      "intro": "Perfilar raymarching por evaluaciones de campo, divergencia y precisión, usando visualizaciones diagnósticas.",
      "sections": [
        {
          "title": "Modelo de coste",
          "body": "1920×1080×80 pasos ya supera 165 millones de evaluaciones máximas antes de sombras/AO."
        },
        {
          "title": "Bounds",
          "body": "Intersecar primero un bounding volume puede evitar marchar regiones que no contienen la escena."
        },
        {
          "title": "Half resolution",
          "body": "Reducir dimensiones a la mitad reduce píxeles a una cuarta parte, antes de upscale."
        },
        {
          "title": "Debug views",
          "body": "Colorear por número de pasos revela zonas tangenciales o campos problemáticos."
        }
      ]
    },
    "example": {
      "problem": "960×540 a 64 pasos máximos. Evaluaciones de escena máximas.",
      "steps": [
        "960·540·64=33177600."
      ],
      "solution": "33177600."
    },
    "check": {
      "question": "¿Reducir ancho y alto a la mitad deja aproximadamente 1/4 de píxeles?",
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
          "Solo con MSAA",
          false
        ]
      ],
      "feedback": "Área escala con el producto de dimensiones."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Step-count heatmap ayuda a localizar rayos caros?",
        "answer": "si",
        "hint": "Muestra convergencia."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "100×100×20=?",
        "answer": "200000",
        "hint": "Píxeles por pasos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más ALU siempre significa más lento si evita bandwidth?",
        "answer": "no",
        "hint": "Hay trade-offs y hardware."
      }
    ]
  },
  "ray-integration": {
    "id": "ray-integration",
    "courseId": 50,
    "title": "Shader Art: escena integrada",
    "shortTitle": "Shader Art",
    "duration": 115,
    "objective": "Integrar cámara, SDF/DE, materiales, iluminación, efectos y sincronización en una pieza shader reproducible.",
    "summary": [
      "Una pieza shader art robusta separa función de escena, camera ray generation, traversal, shading y postprocesado aunque termine comprimida.",
      "La sincronización con audio/tiempo debe usar parámetros bien definidos y no depender accidentalmente del FPS.",
      "Para sizecoding, una arquitectura clara puede compactarse después; empezar con código incomprensible dificulta validar geometría y rendimiento."
    ],
    "concept": "Una pieza shader art robusta separa función de escena, camera ray generation, traversal, shading y postprocesado aunque termine comprimida.",
    "rules": [
      "Construye primero una referencia correcta y medible.",
      "Usa tiempo continuo/audio clock, no frame count, para sincronía.",
      "Documenta convenciones de cámara, unidades y límites numéricos."
    ],
    "deep": {
      "intro": "Integrar cámara, SDF/DE, materiales, iluminación, efectos y sincronización en una pieza shader reproducible.",
      "sections": [
        {
          "title": "Pipeline",
          "body": "uv→ray→march→hit/material→normal→lighting/shadow/AO→tone/color→post."
        },
        {
          "title": "Timeline",
          "body": "Parámetros de escena pueden derivarse de beats/segundos y controlar transforms, palette y camera."
        },
        {
          "title": "Quality tiers",
          "body": "maxSteps, shadow steps, AO samples y resolución son knobs explícitos."
        },
        {
          "title": "Sizecoding",
          "body": "Tras validar, minificación, shared expressions y procedural parameters reducen distribución sin cambiar la semántica objetivo."
        }
      ]
    },
    "example": {
      "problem": "A 120 BPM, 16 beats duran cuántos segundos.",
      "steps": [
        "120 BPM=2 beats/s; 16/2=8 s."
      ],
      "solution": "8 segundos."
    },
    "check": {
      "question": "¿Sincronizar por frame index garantiza el mismo timing a FPS diferentes?",
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
          "Solo a 60 Hz",
          false
        ]
      ],
      "feedback": "El tiempo debe estar desacoplado del render FPS."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Primero conviene una referencia correcta antes de micro-sizecoding?",
        "answer": "si",
        "hint": "Facilita comparar."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "120 BPM = cuántos beats/s?",
        "answer": "2",
        "hint": "120/60."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Raymarch y shading deberían poder depurarse por separado?",
        "answer": "si",
        "hint": "Son etapas distintas."
      }
    ]
  }
});
