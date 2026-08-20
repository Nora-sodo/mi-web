/**
 * BLOQUE 037 — Iluminación y render
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar magnitud radiométrica, modelo de reflectancia,
 * visibilidad e integrador. PBR no significa exactitud total y una imagen
 * visualmente plausible no certifica conservación de energía ni convergencia.
 */
window.LEARNING_PATHS[37] = {
  "level": "Experto progresivo",
  "estimatedHours": 132,
  "description": "Iluminación desde magnitudes radiométricas y BRDF hasta PBR, sombras, HDR, transporte global, ray/path tracing y Monte Carlo.",
  "outcomes": [
    "Razonar con radiometría y BRDF sin mezclar unidades ni espacios de color.",
    "Implementar modelos diffuse/specular y un workflow PBR coherente.",
    "Distinguir visibilidad, shadow mapping, AO, HDR y tone mapping por el problema que resuelven.",
    "Explicar ray tracing, path tracing y Monte Carlo como capas distintas de un renderer físico."
  ],
  "modules": [
    {
      "id": "m1-light",
      "title": "Luz y reflectancia",
      "description": "Radiometría, BRDF y modelos locales",
      "lessons": [
        "render-light-radiometry",
        "render-brdf",
        "render-lambert",
        "render-phong-blinn"
      ]
    },
    {
      "id": "m2-pbr",
      "title": "Materiales físicamente motivados",
      "description": "PBR, microfacetas y normales",
      "lessons": [
        "render-pbr-materials",
        "render-microfacet",
        "render-normal-mapping"
      ]
    },
    {
      "id": "m3-visibility",
      "title": "Sombras y rango dinámico",
      "description": "Visibilidad, shadow maps, AO y HDR",
      "lessons": [
        "render-shadows-visibility",
        "render-shadow-maps",
        "render-ambient-occlusion",
        "render-hdr-tonemapping"
      ]
    },
    {
      "id": "m4-transport",
      "title": "Transporte global",
      "description": "GI, ray/path tracing y Monte Carlo",
      "lessons": [
        "render-global-illumination",
        "render-ray-tracing",
        "render-path-tracing",
        "render-monte-carlo"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "render-light-radiometry": {
    "id": "render-light-radiometry",
    "courseId": 37,
    "title": "Luz y radiometría: qué magnitudes viajan por la escena",
    "shortTitle": "Luz y radiometría: qué magnitudes viajan por la escena",
    "duration": 110,
    "objective": "Distinguir potencia radiante, irradiancia y radiancia para razonar sobre iluminación sin mezclar magnitudes ni aplicar leyes geométricas fuera de contexto.",
    "summary": [
      "La radiometría mide energía electromagnética ponderada físicamente; potencia, irradiancia y radiancia tienen unidades y dominios distintos.",
      "La irradiancia de una fuente puntual ideal cae con el cuadrado de la distancia por expansión geométrica, pero la radiancia a lo largo de un rayo en vacío no sigue esa misma ley.",
      "Un renderer físicamente motivado debe conservar unidades y factores geométricos antes de aplicar exposición o tone mapping."
    ],
    "concept": "La radiometría mide energía electromagnética ponderada físicamente; potencia, irradiancia y radiancia tienen unidades y dominios distintos.",
    "rules": [
      "Potencia radiante Φ se mide en W; irradiancia E en W/m²; radiancia L en W/(m²·sr).",
      "No reemplaces toda atenuación por 1/r²: esa relación corresponde a configuraciones geométricas concretas como una fuente puntual ideal sobre irradiancia.",
      "Separa magnitudes lineales de color/display de sus codificaciones no lineales."
    ],
    "deep": {
      "intro": "Distinguir potencia radiante, irradiancia y radiancia para razonar sobre iluminación sin mezclar magnitudes ni aplicar leyes geométricas fuera de contexto.",
      "sections": [
        {
          "title": "Magnitudes",
          "body": "La potencia describe energía por tiempo; irradiancia, potencia incidente por área; radiancia, flujo por área proyectada y ángulo sólido. Esta última es central en transporte de luz porque describe cuánto viaja en una dirección."
        },
        {
          "title": "Geometría",
          "body": "Para una fuente puntual isotrópica ideal, la potencia se distribuye sobre una esfera de área 4πr², de donde emerge la caída 1/r² en irradiancia. No significa que toda cantidad de iluminación tenga que multiplicarse ciegamente por esa expresión."
        },
        {
          "title": "Radiancia",
          "body": "En un medio no participativo ideal, la radiancia se conserva a lo largo del rayo entre superficies. La geometría aparece al convertir entre radiancia, irradiancia y áreas/ángulos sólidos."
        },
        {
          "title": "Pipeline",
          "body": "La iluminación se calcula en un dominio lineal; exposición y tone mapping convierten posteriormente el rango radiométrico a uno apto para display."
        }
      ]
    },
    "example": {
      "problem": "Una fuente puntual ideal emite 100 W isotrópicamente. ¿Qué densidad de potencia cruza una esfera de radio 2 m?",
      "steps": [
        "Área de la esfera: 4πr² = 16π m².",
        "Distribuye la potencia de forma uniforme sobre esa superficie.",
        "E = 100/(16π) ≈ 1.989 W/m²."
      ],
      "solution": "Aproximadamente 1.989 W/m²; es un ejemplo de irradiancia geométrica, no una regla universal para cualquier magnitud de rendering."
    },
    "check": {
      "question": "¿La radiancia de un rayo en vacío ideal cae automáticamente como 1/r² por viajar más lejos?",
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
          "Solo si el framebuffer es HDR",
          false
        ]
      ],
      "feedback": "La caída 1/r² aparece al distribuir flujo sobre área; radiancia y irradiancia no son la misma magnitud."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Unidad SI de irradiancia?",
        "answer": "w/m2",
        "hint": "Es potencia por área."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si duplicas distancia a una fuente puntual isotrópica ideal, ¿por qué factor cae la irradiancia?",
        "answer": "4",
        "hint": "Usa r²."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Radiancia e irradiancia son intercambiables?",
        "answer": "no",
        "hint": "Tienen unidades y geometría distintas."
      }
    ]
  },
  "render-brdf": {
    "id": "render-brdf",
    "courseId": 37,
    "title": "Reflectancia y BRDF: cómo una superficie redistribuye luz",
    "shortTitle": "Reflectancia y BRDF: cómo una superficie redistribuye luz",
    "duration": 115,
    "objective": "Interpretar una BRDF como función direccional de reflectancia, con restricciones físicas de positividad, energía y, en materiales recíprocos, reciprocidad.",
    "summary": [
      "Una BRDF relaciona radiancia incidente desde una dirección con radiancia reflejada hacia otra por unidad de irradiancia diferencial.",
      "Una BRDF tiene unidades de sr⁻¹ y se integra junto con el coseno geométrico y la iluminación incidente sobre el hemisferio.",
      "Los modelos físicamente plausibles controlan energía y, para materiales recíprocos ordinarios, satisfacen reciprocidad; no toda función brillante lo hace."
    ],
    "concept": "Una BRDF relaciona radiancia incidente desde una dirección con radiancia reflejada hacia otra por unidad de irradiancia diferencial.",
    "rules": [
      "No interpretes el valor de una BRDF como porcentaje directo de luz reflejada.",
      "La contribución reflejada incluye f_r, L_i, cosθ_i y dω_i.",
      "Conservación de energía se comprueba integrando la respuesta hemisférica, no mirando un valor aislado."
    ],
    "deep": {
      "intro": "Interpretar una BRDF como función direccional de reflectancia, con restricciones físicas de positividad, energía y, en materiales recíprocos, reciprocidad.",
      "sections": [
        {
          "title": "Definición",
          "body": "Conceptualmente f_r(ω_i,ω_o) expresa dL_o/(L_i cosθ_i dω_i). La dependencia de dos direcciones permite representar diffuse, glossy y otros comportamientos de superficie."
        },
        {
          "title": "Integración",
          "body": "La radiancia saliente refleja la integral hemisférica de luz incidente multiplicada por BRDF y coseno. El coseno aparece por área proyectada."
        },
        {
          "title": "Física",
          "body": "En modelos pasivos se exige no crear energía. Para muchos materiales ordinarios también se usa reciprocidad de Helmholtz; existen sistemas no recíprocos, por lo que conviene declarar el modelo."
        },
        {
          "title": "BSDF",
          "body": "Una BSDF generaliza la idea para incluir reflexión y transmisión; vidrio y otros dieléctricos necesitan tratar ambas rutas."
        }
      ]
    },
    "example": {
      "problem": "Una BRDF lambertiana tiene albedo ρ=0.8. ¿Cuál es f_r?",
      "steps": [
        "Para Lambert, f_r=ρ/π.",
        "Sustituye ρ=0.8.",
        "0.8/π ≈ 0.2546 sr⁻¹."
      ],
      "solution": "f_r≈0.2546 sr⁻¹. El 0.8 no es el valor directo de la BRDF; el factor 1/π asegura la normalización energética del modelo diffuse."
    },
    "check": {
      "question": "¿Una BRDF se interpreta simplemente como “el porcentaje reflejado” en una dirección?",
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
          "Solo en OpenGL",
          false
        ]
      ],
      "feedback": "Su valor es una densidad direccional con unidades sr⁻¹ y debe integrarse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Unidad típica de una BRDF?",
        "answer": "sr^-1",
        "hint": "Piensa en densidad sobre ángulo sólido."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una BSDF puede incluir transmisión además de reflexión?",
        "answer": "si",
        "hint": "Generaliza BRDF."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Para verificar energía basta exigir f_r≤1 punto a punto?",
        "answer": "no",
        "hint": "La condición relevante involucra integración hemisférica."
      }
    ]
  },
  "render-lambert": {
    "id": "render-lambert",
    "courseId": 37,
    "title": "Lambert: difusión ideal y ley del coseno",
    "shortTitle": "Lambert: difusión ideal y ley del coseno",
    "duration": 95,
    "objective": "Derivar el término difuso lambertiano y entender por qué el coseno, el albedo y el factor 1/π representan cosas distintas.",
    "summary": [
      "Lambert modela una superficie perfectamente difusa cuya BRDF es constante ρ/π.",
      "El término N·L proviene de la irradiancia proyectada, no de una BRDF que dependa del ángulo de salida.",
      "Una implementación “albedo × max(N·L,0)” puede omitir constantes porque la intensidad de luz ya las absorbió; eso es convención, no nueva física."
    ],
    "concept": "Lambert modela una superficie perfectamente difusa cuya BRDF es constante ρ/π.",
    "rules": [
      "Lambert BRDF = ρ/π para un albedo difuso ρ.",
      "Clampa N·L a cero cuando la luz está bajo la superficie en el modelo opaco local.",
      "No confundas diffuse albedo con color mostrado tras iluminación y tone mapping."
    ],
    "deep": {
      "intro": "Derivar el término difuso lambertiano y entender por qué el coseno, el albedo y el factor 1/π representan cosas distintas.",
      "sections": [
        {
          "title": "BRDF constante",
          "body": "Una superficie lambertiana devuelve igual radiancia hacia todas las direcciones de salida del hemisferio para una irradiancia dada; “igual” aquí se refiere a radiancia, no a intensidad visual codificada."
        },
        {
          "title": "Coseno",
          "body": "El factor cosθ_i aparece porque un mismo haz se reparte sobre mayor área cuando llega oblicuamente."
        },
        {
          "title": "Normalización",
          "body": "Integrar cosθ sobre el hemisferio produce π; por eso ρ/π hace que la reflectancia hemisférica sea ρ."
        },
        {
          "title": "Motor real",
          "body": "Muchos shaders empaquetan π dentro de la definición de luz o del diffuse term. Hay que mantener una convención consistente de unidades."
        }
      ]
    },
    "example": {
      "problem": "ρ=0.6 y una luz produce irradiancia E=50 W/m² en la superficie. ¿Radiancia diffuse lambertiana?",
      "steps": [
        "Usa L_o=ρE/π.",
        "0.6×50=30.",
        "30/π≈9.549."
      ],
      "solution": "Aproximadamente 9.549 W/(m²·sr), suponiendo solo reflexión diffuse lambertiana."
    },
    "check": {
      "question": "¿En Lambert ideal la BRDF depende de la dirección de salida?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí, siempre",
          false
        ],
        [
          "Solo con shadow maps",
          false
        ]
      ],
      "feedback": "La BRDF lambertiana es constante; el coseno está en el término geométrico de entrada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Para ρ=1, ¿f_r lambertiana es 1 o 1/π?",
        "answer": "1/pi",
        "hint": "La normalización hemisférica aporta π."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si N·L<0 en una superficie opaca local, ¿se clampa a 0?",
        "answer": "si",
        "hint": "La luz está bajo el hemisferio visible."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Albedo difuso y valor sRGB final son lo mismo?",
        "answer": "no",
        "hint": "Iluminación, exposición y transferencia alteran el display."
      }
    ]
  },
  "render-phong-blinn": {
    "id": "render-phong-blinn",
    "courseId": 37,
    "title": "Phong y Blinn-Phong: modelos empíricos de brillo",
    "shortTitle": "Phong y Blinn-Phong: modelos empíricos de brillo",
    "duration": 95,
    "objective": "Usar Phong y Blinn-Phong como aproximaciones históricas entendiendo su geometría, parámetros y límites físicos.",
    "summary": [
      "Phong evalúa una potencia del alineamiento entre vector reflejado y vista; Blinn-Phong usa la half-vector entre luz y vista.",
      "El exponente de shininess controla anchura del lóbulo, pero no es un parámetro universalmente equivalente a roughness física.",
      "Son modelos útiles y baratos, pero sus parámetros y normalización dependen de convención; no son PBR por el simple hecho de producir highlights plausibles."
    ],
    "concept": "Phong evalúa una potencia del alineamiento entre vector reflejado y vista; Blinn-Phong usa la half-vector entre luz y vista.",
    "rules": [
      "Normaliza N, L, V y H antes de usar productos escalares en estos modelos.",
      "No conviertas shininess a roughness con una fórmula universal sin declarar el modelo concreto.",
      "Diffuse+specular sin normalización/energy split puede crear energía de forma no física."
    ],
    "deep": {
      "intro": "Usar Phong y Blinn-Phong como aproximaciones históricas entendiendo su geometría, parámetros y límites físicos.",
      "sections": [
        {
          "title": "Phong",
          "body": "El término clásico usa max(R·V,0)^s, donde R es la reflexión de -L alrededor de N según convención. s grande produce highlight estrecho."
        },
        {
          "title": "Blinn-Phong",
          "body": "Usa H=normalize(L+V) y max(N·H,0)^s. Su exponente no tiene exactamente la misma interpretación numérica que el de Phong."
        },
        {
          "title": "Empírico",
          "body": "Ambos fueron diseñados por eficacia visual y computacional. Pueden normalizarse y ajustarse, pero no describen por sí solos Fresnel o microgeometría."
        },
        {
          "title": "Legado útil",
          "body": "Siguen siendo excelentes para aprender geometría de shading y para estilos no fotorrealistas o presupuestos simples."
        }
      ]
    },
    "example": {
      "problem": "Si N·H=0.9, compara s=4 y s=32.",
      "steps": [
        "Calcula 0.9^4≈0.6561.",
        "Calcula 0.9^32≈0.03434.",
        "Un exponente mayor hace caer mucho más rápido el lóbulo fuera del máximo."
      ],
      "solution": "s=32 produce un highlight mucho más estrecho; eso no significa directamente “roughness=1/32”."
    },
    "check": {
      "question": "¿El exponente shininess de Blinn-Phong es idéntico por definición a roughness PBR?",
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
      "feedback": "Son parametrizaciones de modelos distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "En Blinn-Phong, ¿H suele construirse a partir de L+V normalizado?",
        "answer": "si",
        "hint": "Es la half-vector."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si N·H=1, ¿elevarlo a cualquier exponente positivo cambia el valor?",
        "answer": "no",
        "hint": "1^s=1."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Phong incorpora Fresnel físico completo por sí solo?",
        "answer": "no",
        "hint": "Es un modelo empírico."
      }
    ]
  },
  "render-pbr-materials": {
    "id": "render-pbr-materials",
    "courseId": 37,
    "title": "PBR: materiales metallic-roughness y coherencia energética",
    "shortTitle": "PBR: materiales metallic-roughness y coherencia energética",
    "duration": 120,
    "objective": "Interpretar un workflow PBR metallic-roughness sin confundir parámetros artísticos, propiedades físicas y convenciones de asset interchange.",
    "summary": [
      "PBR agrupa modelos y restricciones físicamente motivadas: energía, Fresnel, microfacetas y parámetros con comportamiento consistente bajo iluminación cambiante.",
      "El workflow glTF metallic-roughness usa base color, metallic y roughness como parámetros principales, con texturas y factores combinables.",
      "Metallic no es “cantidad de brillo”: interpola conceptualmente entre respuesta dieléctrica y metálica dentro de un workflow concreto; roughness modifica la distribución especular."
    ],
    "concept": "PBR agrupa modelos y restricciones físicamente motivadas: energía, Fresnel, microfacetas y parámetros con comportamiento consistente bajo iluminación cambiante.",
    "rules": [
      "No uses metallic como control de intensidad especular genérico.",
      "Trabaja las cantidades de lighting en espacio lineal y decodifica texturas según su semántica/color space.",
      "PBR no significa exactitud espectral ni global illumination automática; sigue siendo un modelo aproximado."
    ],
    "deep": {
      "intro": "Interpretar un workflow PBR metallic-roughness sin confundir parámetros artísticos, propiedades físicas y convenciones de asset interchange.",
      "sections": [
        {
          "title": "Workflow",
          "body": "En metallic-roughness, baseColor representa diffuse color en dieléctricos y reflectancia base tintada en metales según el modelo. metallic suele interpretarse 0 dieléctrico, 1 metal, con valores intermedios útiles para mezclas/antialiasing."
        },
        {
          "title": "Roughness",
          "body": "Roughness controla dispersión de normales microscópicas y anchura del lóbulo especular. Su mapeo exacto a un parámetro de distribución depende de implementación."
        },
        {
          "title": "Fresnel",
          "body": "Dieléctricos presentan reflectancia especular no nula incluso de frente; metales tienen respuesta espectral/tintada y prácticamente no un diffuse lobe clásico en el modelo simplificado."
        },
        {
          "title": "Intercambio",
          "body": "glTF define de forma interoperable un modelo metallic-roughness y extensiones. Un motor puede usar otro BRDF internamente, pero debe convertir parámetros de forma documentada."
        }
      ]
    },
    "example": {
      "problem": "Material con metallic=1 y baseColor rojo intenso en workflow metallic-roughness. ¿Debe conservar un diffuse lambertiano rojo fuerte por defecto?",
      "steps": [
        "Identifica que metallic=1 representa metal idealizado en este workflow.",
        "La energía baseColor alimenta principalmente la reflectancia especular del metal.",
        "El diffuse clásico se reduce/elimina en el modelo simplificado."
      ],
      "solution": "No: el rojo debe aparecer principalmente en la reflexión especular metálica, no como diffuse lambertiano fuerte."
    },
    "check": {
      "question": "¿PBR garantiza por sí solo que el renderer simule toda la física de la luz?",
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
      "feedback": "PBR describe modelos/restricciones físicamente motivadas, no exactitud universal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿metallic=0 representa típicamente un dieléctrico en metallic-roughness?",
        "answer": "si",
        "hint": "Es la convención del workflow."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Roughness y shininess Phong son exactamente el mismo parámetro?",
        "answer": "no",
        "hint": "Modelos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un metal idealizado conserva diffuse clásico fuerte en el workflow?",
        "answer": "no",
        "hint": "La respuesta está principalmente en el lóbulo especular."
      }
    ]
  },
  "render-microfacet": {
    "id": "render-microfacet",
    "courseId": 37,
    "title": "Microfacetas: D, G, Fresnel y Cook-Torrance",
    "shortTitle": "Microfacetas: D, G, Fresnel y Cook-Torrance",
    "duration": 125,
    "objective": "Descomponer un BRDF microfacet en distribución de normales, masking-shadowing y Fresnel para entender de dónde sale el highlight PBR.",
    "summary": [
      "El modelo microfacet aproxima una superficie rugosa como muchas facetas microscópicas especulares con una distribución estadística de normales.",
      "Un BRDF Cook-Torrance típico combina D (distribución), G (masking-shadowing) y F (Fresnel) sobre un denominador geométrico.",
      "Roughness afecta principalmente la distribución microfacet y puede cambiar también términos correlacionados; no debe aplicarse como simple blur posterior."
    ],
    "concept": "El modelo microfacet aproxima una superficie rugosa como muchas facetas microscópicas especulares con una distribución estadística de normales.",
    "rules": [
      "Protege denominadores y clamps cerca de ángulos rasantes de forma coherente con el modelo, no con epsilons arbitrarios que cambien energía sin control.",
      "Fresnel depende del ángulo y del material; F0 es reflectancia de incidencia normal, no “specular intensity” universal.",
      "D, G y F deben pertenecer a una combinación compatible; mezclar fórmulas aisladas puede romper energía o forma del lóbulo."
    ],
    "deep": {
      "intro": "Descomponer un BRDF microfacet en distribución de normales, masking-shadowing y Fresnel para entender de dónde sale el highlight PBR.",
      "sections": [
        {
          "title": "D",
          "body": "La normal distribution function pondera cuántas microfacetas tienen normal aproximadamente alineada con H. GGX/Trowbridge-Reitz es común por sus colas largas."
        },
        {
          "title": "G",
          "body": "El geometry term modela microfacetas ocultas o en sombra unas por otras; a ángulos rasantes se vuelve especialmente importante."
        },
        {
          "title": "F",
          "body": "Fresnel describe qué fracción se refleja frente a transmite en una interfaz según ángulo e índices/material. Schlick es una aproximación frecuente, no la ecuación completa para todos los materiales."
        },
        {
          "title": "Composición",
          "body": "Una forma común es f_spec = DFG/(4(N·L)(N·V)) con clamps y dominios apropiados. Las convenciones exactas de roughness/alpha varían."
        }
      ]
    },
    "example": {
      "problem": "En la aproximación de Schlick, F=F0+(1-F0)(1-V·H)^5. Si F0=0.04 y V·H=1, ¿F?",
      "steps": [
        "1-V·H=0.",
        "El término de quinta potencia desaparece.",
        "F=F0."
      ],
      "solution": "F=0.04 en incidencia normal bajo esa aproximación."
    },
    "check": {
      "question": "¿Roughness microfacet se implementa correctamente como un blur de la imagen final?",
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
          "Solo si hay mipmaps",
          false
        ]
      ],
      "feedback": "Roughness cambia la distribución de scattering antes de integrar la iluminación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Qué término microfacet representa distribución de normales?",
        "answer": "d",
        "hint": "D = NDF."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Qué término representa masking-shadowing?",
        "answer": "g",
        "hint": "Geometry term."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿F0 suele significar reflectancia Fresnel a incidencia normal?",
        "answer": "si",
        "hint": "Es su interpretación habitual en estos modelos."
      }
    ]
  },
  "render-normal-mapping": {
    "id": "render-normal-mapping",
    "courseId": 37,
    "title": "Normal mapping: detalle aparente, TBN y límites geométricos",
    "shortTitle": "Normal mapping: detalle aparente, TBN y límites geométricos",
    "duration": 105,
    "objective": "Aplicar normal maps en tangent space construyendo una base TBN consistente y entendiendo qué propiedades geométricas no modifican.",
    "summary": [
      "Un normal map perturba la normal usada por shading sin cambiar la geometría real ni la silueta.",
      "Los valores RGB almacenan una dirección bajo una convención de tangent space; deben decodificarse y transformarse con una base TBN coherente.",
      "Tangentes, handedness, UV seams y normal matrix pueden cambiar la base; ignorarlos produce costuras, inversión del canal verde o highlights incorrectos."
    ],
    "concept": "Un normal map perturba la normal usada por shading sin cambiar la geometría real ni la silueta.",
    "rules": [
      "Decodifica una normal map típica de [0,1] a un vector aproximadamente en [-1,1] antes de normalizar.",
      "T, B y N deben estar en el mismo espacio que L/V cuando se evalúa el BRDF.",
      "Normal mapping no crea self-shadowing ni altera intersecciones/silueta por sí solo."
    ],
    "deep": {
      "intro": "Aplicar normal maps en tangent space construyendo una base TBN consistente y entendiendo qué propiedades geométricas no modifican.",
      "sections": [
        {
          "title": "Tangent space",
          "body": "La textura codifica normales relativas a una base local de la superficie construida a partir de geometría y parametrización UV."
        },
        {
          "title": "TBN",
          "body": "Tangent, bitangent y normal forman la transformación entre tangent space y el espacio de shading. El signo de handedness puede guardarse con la tangente para reconstruir B."
        },
        {
          "title": "Seams",
          "body": "UV seams y tangentes discontinuas pueden requerir duplicar vértices o mantener bases coherentes. Las convenciones DirectX/OpenGL de eje Y de normal maps pueden diferir por tooling."
        },
        {
          "title": "Límite",
          "body": "La normal perturbada cambia iluminación local, pero no la posición real: la silueta y occlusion geométrica siguen siendo las de la malla salvo técnicas adicionales."
        }
      ]
    },
    "example": {
      "problem": "Texel normal map RGB=(0.5,0.5,1.0). ¿Qué normal tangent-space aproximada representa?",
      "steps": [
        "Mapea 2*RGB-1.",
        "Obtienes (0,0,1).",
        "Normaliza; ya tiene norma 1."
      ],
      "solution": "Aproximadamente (0,0,1): normal sin perturbación en tangent space estándar."
    },
    "check": {
      "question": "¿Normal mapping cambia automáticamente la silueta de la malla?",
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
          "Solo con sRGB",
          false
        ]
      ],
      "feedback": "Modifica la normal de shading, no la geometría real."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿RGB 0.5,0.5,1 suele representar normal 0,0,1?",
        "answer": "si",
        "hint": "Aplica 2c-1."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿TBN debe ser coherente con la parametrización UV?",
        "answer": "si",
        "hint": "Las tangentes derivan de UV/geometría."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Normal map por sí sola genera oclusión geométrica real?",
        "answer": "no",
        "hint": "No mueve la superficie."
      }
    ]
  },
  "render-shadows-visibility": {
    "id": "render-shadows-visibility",
    "courseId": 37,
    "title": "Sombras como problema de visibilidad",
    "shortTitle": "Sombras como problema de visibilidad",
    "duration": 100,
    "objective": "Entender sombras como visibilidad entre punto sombreado y emisor, distinguiendo luces puntuales, de área y aproximaciones raster.",
    "summary": [
      "Una sombra aparece cuando parte o toda la radiancia desde una fuente queda bloqueada por geometría entre el punto y el emisor.",
      "Una luz puntual ideal produce una decisión binaria de visibilidad por dirección; una luz de área integra muchas direcciones y produce penumbra.",
      "Shadowing es un término de visibilidad del transporte de luz, no un oscurecimiento artístico fijo multiplicado al final."
    ],
    "concept": "Una sombra aparece cuando parte o toda la radiancia desde una fuente queda bloqueada por geometría entre el punto y el emisor.",
    "rules": [
      "Para una luz puntual, un shadow ray debe limitarse al intervalo entre superficie y luz; cualquier hit detrás de la luz no bloquea.",
      "Usa un origen/offset robusto para evitar self-intersection, pero no conviertas un bias grande en sustituto de precisión.",
      "Area light softness depende de geometría angular de la fuente, no de blur arbitrario de la sombra."
    ],
    "deep": {
      "intro": "Entender sombras como visibilidad entre punto sombreado y emisor, distinguiendo luces puntuales, de área y aproximaciones raster.",
      "sections": [
        {
          "title": "Visibilidad",
          "body": "En una integral de iluminación, V(x,y) vale conceptualmente 0 si hay oclusión entre dos puntos y 1 si son mutuamente visibles."
        },
        {
          "title": "Puntual",
          "body": "Una fuente puntual muestrea una dirección hacia una posición; la sombra es dura en el modelo geométrico ideal."
        },
        {
          "title": "Área",
          "body": "Una fuente extendida cubre un conjunto de direcciones. Algunas pueden estar ocluidas y otras no, generando penumbra."
        },
        {
          "title": "Robustez",
          "body": "Errores numéricos en el origen del rayo pueden causar acne o light leaks. La solución requiere offsets/representación coherentes, no solo incrementar un epsilon hasta que “se vea bien”."
        }
      ]
    },
    "example": {
      "problem": "Un punto ve 3 de 8 muestras uniformes de una luz de área, todas con igual peso. Estimación simple de visibilidad media:",
      "steps": [
        "Cuenta muestras visibles: 3.",
        "Divide entre 8.",
        "3/8=0.375."
      ],
      "solution": "Visibilidad estimada 0.375; en un renderer real cada muestra además lleva BRDF, geometría y PDF."
    },
    "check": {
      "question": "¿Una luz de área produce penumbra porque hay múltiples direcciones potenciales hacia el emisor?",
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
          "Solo si usa Phong",
          false
        ]
      ],
      "feedback": "La visibilidad parcial de una fuente extendida produce sombra suave físicamente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un objeto detrás de una luz puntual debe bloquear el shadow ray hacia esa luz?",
        "answer": "no",
        "hint": "Limita t a la distancia de la luz."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Shadow ray y cámara ray son el mismo objetivo aunque ambos sean rayos?",
        "answer": "no",
        "hint": "Responden preguntas de visibilidad distintas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una luz puntual ideal geométrica produce penumbra por tamaño de emisor?",
        "answer": "no",
        "hint": "Su tamaño es cero."
      }
    ]
  },
  "render-shadow-maps": {
    "id": "render-shadow-maps",
    "courseId": 37,
    "title": "Shadow maps: profundidad desde la luz y sus artefactos",
    "shortTitle": "Shadow maps: profundidad desde la luz y sus artefactos",
    "duration": 120,
    "objective": "Construir y depurar shadow mapping entendiendo comparación de profundidad, bias, filtrado, cascades y limitaciones de discretización.",
    "summary": [
      "Shadow mapping rasteriza profundidad desde la luz y compara después la profundidad del fragmento transformado al espacio de esa luz.",
      "Acne, peter-panning y aliasing nacen de precisión, discretización y bias; un único bias fijo no es universal.",
      "PCF filtra comparaciones de visibilidad; CSM reparte resolución para luces direccionales, mientras luces puntuales requieren varias direcciones/cubemap u otras técnicas."
    ],
    "concept": "Shadow mapping rasteriza profundidad desde la luz y compara después la profundidad del fragmento transformado al espacio de esa luz.",
    "rules": [
      "Compara profundidades bajo la misma convención/espacio y rango usados al crear el shadow map.",
      "Slope-scaled/normal bias y resolución deben ajustarse considerando geometría y proyección; no existe un epsilon mágico portable.",
      "Filtrar depth crudo y filtrar resultados de comparación no son operaciones equivalentes para shadow maps convencionales."
    ],
    "deep": {
      "intro": "Construir y depurar shadow mapping entendiendo comparación de profundidad, bias, filtrado, cascades y limitaciones de discretización.",
      "sections": [
        {
          "title": "Pass de luz",
          "body": "Se renderiza la escena desde el punto de vista de la fuente y se almacena la profundidad del receptor más cercano por sample."
        },
        {
          "title": "Comparación",
          "body": "Durante shading, el punto se transforma a light space, se proyecta a UV/depth y se pregunta si queda detrás de la profundidad almacenada."
        },
        {
          "title": "Bias",
          "body": "La cuantización y diferencias de muestreo entre passes pueden hacer que una superficie se auto-ocluya. Bias reduce acne pero demasiado bias separa visualmente la sombra."
        },
        {
          "title": "Escala",
          "body": "Una luz direccional cubriendo grandes distancias desperdicia resolución; cascaded shadow maps asignan mapas a rangos de cámara. No eliminan todos los problemas de estabilidad."
        }
      ]
    },
    "example": {
      "problem": "Depth almacenado=0.40; fragmento en light space=0.43; bias=0.01. ¿Se considera en sombra con test z_frag-bias > z_map?",
      "steps": [
        "Calcula 0.43-0.01=0.42.",
        "Compara 0.42>0.40.",
        "La condición es verdadera."
      ],
      "solution": "Sí, bajo esa convención concreta el fragmento se considera ocluido."
    },
    "check": {
      "question": "¿Aumentar mucho el bias elimina acne sin introducir ningún otro artefacto?",
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
          "Solo en CSM",
          false
        ]
      ],
      "feedback": "Bias excesivo causa separación/peter-panning y light leaks."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Shadow map almacena normalmente profundidad desde la luz?",
        "answer": "si",
        "hint": "Es la idea base."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿PCF suele filtrar resultados de comparaciones de profundidad?",
        "answer": "si",
        "hint": "Percentage-closer filtering."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una luz puntual omnidireccional cabe naturalmente en una sola proyección perspectiva estándar sin trucos?",
        "answer": "no",
        "hint": "Necesita cubrir múltiples direcciones."
      }
    ]
  },
  "render-ambient-occlusion": {
    "id": "render-ambient-occlusion",
    "courseId": 37,
    "title": "Ambient occlusion: accesibilidad local, no iluminación global",
    "shortTitle": "Ambient occlusion: accesibilidad local, no iluminación global",
    "duration": 95,
    "objective": "Interpretar AO como una heurística/estimador geométrico de accesibilidad y evitar confundirlo con radiancia indirecta real.",
    "summary": [
      "Ambient occlusion estima cuánto del hemisferio local está geométricamente accesible; no calcula por sí sola el color ni la intensidad de luz indirecta.",
      "SSAO usa información de screen space y por ello desconoce geometría fuera de pantalla u oculta tras otras superficies.",
      "Multiplicar AO sobre toda la iluminación puede oscurecer incorrectamente direct lighting o materiales emisivos; la integración depende del modelo del motor."
    ],
    "concept": "Ambient occlusion estima cuánto del hemisferio local está geométricamente accesible; no calcula por sí sola el color ni la intensidad de luz indirecta.",
    "rules": [
      "AO ≠ shadow map ≠ global illumination.",
      "SSAO solo dispone de la información reconstruible desde buffers visibles y puede fallar en bordes/disocclusions.",
      "Usa AO como aproximación del término ambiental/indirecto según el pipeline, no como “factor de suciedad” universal."
    ],
    "deep": {
      "intro": "Interpretar AO como una heurística/estimador geométrico de accesibilidad y evitar confundirlo con radiancia indirecta real.",
      "sections": [
        {
          "title": "Definición",
          "body": "AO aproxima la fracción/ponderación de direcciones del hemisferio bloqueadas cerca de un punto. No contiene por sí misma radiancia incidente."
        },
        {
          "title": "Screen space",
          "body": "SSAO samplea depth/normal del frame. Es barato y coherente con rasterización, pero ignora aquello que no está representado en esos buffers."
        },
        {
          "title": "Bake",
          "body": "AO precomputada puede usar geometría completa y más muestras, pero queda atada a una configuración estática o requiere actualización."
        },
        {
          "title": "Uso",
          "body": "En un pipeline PBR suele modular principalmente iluminación ambiental/indirecta. Aplicarla indiscriminadamente a direct light puede duplicar shadowing."
        }
      ]
    },
    "example": {
      "problem": "Un punto tiene AO=0.2 pero recibe una luz solar directa no ocluida. ¿Debe AO anular por definición el 80% de esa luz directa?",
      "steps": [
        "AO mide accesibilidad ambiental/local.",
        "La visibilidad de la luz solar es otra consulta direccional.",
        "No mezcles ambos términos automáticamente."
      ],
      "solution": "No: el direct lighting debe usar su propia visibilidad; cómo se combina AO con indirecto depende del modelo del renderer."
    },
    "check": {
      "question": "¿SSAO puede conocer geometría completamente fuera del framebuffer actual?",
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
          "Solo con MSAA",
          false
        ]
      ],
      "feedback": "Screen-space methods carecen de geometría que no esté representada en sus buffers."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿AO calcula por sí sola el color de rebotes de luz?",
        "answer": "no",
        "hint": "Eso pertenece a GI."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿SSAO puede sufrir artefactos de borde?",
        "answer": "si",
        "hint": "Carece de muestras fuera de pantalla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿AO y shadow map responden exactamente la misma pregunta?",
        "answer": "no",
        "hint": "Uno estima accesibilidad hemisférica, el otro visibilidad desde una luz/proyección."
      }
    ]
  },
  "render-hdr-tonemapping": {
    "id": "render-hdr-tonemapping",
    "courseId": 37,
    "title": "HDR, exposición y tone mapping",
    "shortTitle": "HDR, exposición y tone mapping",
    "duration": 115,
    "objective": "Mantener lighting en rango dinámico lineal y convertirlo a display mediante exposición y tone mapping sin confundir clipping, gamma y adaptación.",
    "summary": [
      "Un framebuffer HDR puede almacenar valores de escena mayores que 1 y conservar relaciones de intensidad antes de la transformación a display.",
      "Exposure escala el nivel de la señal; tone mapping comprime rango dinámico con una curva que puede alterar contraste y color.",
      "Tone mapping no es gamma correction: primero se mapea la escena al rango de display y después se aplica la función de transferencia/color management apropiada."
    ],
    "concept": "Un framebuffer HDR puede almacenar valores de escena mayores que 1 y conservar relaciones de intensidad antes de la transformación a display.",
    "rules": [
      "Haz lighting/blending físicamente motivado en espacio lineal antes de la codificación de display.",
      "Clampear a [0,1] antes de bloom/tone mapping destruye información de highlights.",
      "Una curva de tone mapping es una decisión de apariencia y display; documenta exposición, white point y espacio de color."
    ],
    "deep": {
      "intro": "Mantener lighting en rango dinámico lineal y convertirlo a display mediante exposición y tone mapping sin confundir clipping, gamma y adaptación.",
      "sections": [
        {
          "title": "HDR",
          "body": "HDR en rendering significa mantener un rango de valores de escena amplio, por ejemplo con formatos floating-point, para evitar saturación prematura."
        },
        {
          "title": "Exposure",
          "body": "Exposure multiplica (o escala logarítmicamente en stops) la señal antes del mapeo. +1 stop equivale a duplicar exposición en la convención fotográfica usual."
        },
        {
          "title": "Tone mapping",
          "body": "Operadores como Reinhard o curvas filmic comprimen intensidades altas para caber en el display preservando contraste de forma elegida."
        },
        {
          "title": "Color management",
          "body": "Después del tone mapping se transforma al espacio/transfer function de salida. Gamma aproximada, sRGB y otros EOTF/OETF no deben mezclarse como sinónimos."
        }
      ]
    },
    "example": {
      "problem": "Un valor lineal de escena 4.0 se procesa con Reinhard simple x/(1+x). ¿Salida?",
      "steps": [
        "Sustituye x=4.",
        "4/(1+4)=4/5.",
        "Resultado 0.8."
      ],
      "solution": "0.8 antes de la codificación de display posterior bajo este ejemplo simplificado."
    },
    "check": {
      "question": "¿Tone mapping y codificación sRGB son exactamente la misma operación?",
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
          "Solo en HDR10",
          false
        ]
      ],
      "feedback": "Una comprime rango/crea apariencia; la otra pertenece a color encoding/display transform."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Clampear highlights a 1 antes de tone mapping pierde información?",
        "answer": "si",
        "hint": "Destruye rango HDR."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿+1 stop suele duplicar exposición?",
        "answer": "si",
        "hint": "Convención fotográfica habitual."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Lighting debe hacerse normalmente sobre valores sRGB codificados?",
        "answer": "no",
        "hint": "Primero linealiza."
      }
    ]
  },
  "render-global-illumination": {
    "id": "render-global-illumination",
    "courseId": 37,
    "title": "Global illumination y ecuación de rendering",
    "shortTitle": "Global illumination y ecuación de rendering",
    "duration": 130,
    "objective": "Interpretar la ecuación de rendering como balance entre emisión y reflexión de iluminación incidente, separando direct, indirect y visibilidad.",
    "summary": [
      "Global illumination incluye caminos donde la luz rebota entre superficies; direct lighting es solo un subconjunto del transporte.",
      "La ecuación de rendering expresa radiancia saliente como emisión más integral de radiancia incidente modulada por BSDF/BRDF y geometría.",
      "Resolverla exactamente en escenas generales es difícil porque L_i depende de la radiancia saliente de otros puntos; los renderers usan aproximaciones o integración Monte Carlo."
    ],
    "concept": "Global illumination incluye caminos donde la luz rebota entre superficies; direct lighting es solo un subconjunto del transporte.",
    "rules": [
      "No llames GI a un simple término ambient constante.",
      "Una bounce indirecta puede transportar color, energía y visibilidad de superficies lejanas; AO no la sustituye.",
      "La ecuación de rendering necesita declarar si hay medios participantes; la versión de superficie estándar no cubre por sí sola scattering volumétrico."
    ],
    "deep": {
      "intro": "Interpretar la ecuación de rendering como balance entre emisión y reflexión de iluminación incidente, separando direct, indirect y visibilidad.",
      "sections": [
        {
          "title": "Ecuación",
          "body": "L_o(x,ω_o)=L_e(x,ω_o)+∫ f_s(x,ω_i,ω_o)L_i(x,ω_i)|n·ω_i| dω_i sobre el hemisferio apropiado, omitiendo aquí medios participantes."
        },
        {
          "title": "Recursión",
          "body": "L_i en x viene de otro punto visible en dirección ω_i, cuyo L_o depende a su vez de más luz. Esa dependencia global hace aparecer rebotes."
        },
        {
          "title": "Direct/indirect",
          "body": "Direct suele referirse a caminos cámara-superficie-luz sin rebotes intermedios difusos/glossy adicionales; indirect incluye rebotes entre superficies."
        },
        {
          "title": "Métodos",
          "body": "Lightmaps, probes, radiosity, photon mapping, path tracing y técnicas híbridas aproximan diferentes partes del problema con trade-offs de memoria, sesgo, ruido y dinamismo."
        }
      ]
    },
    "example": {
      "problem": "Una pared roja iluminada rebota luz sobre una pared blanca. ¿Ese tinte rojo en la pared blanca es direct o indirect lighting?",
      "steps": [
        "La fuente ilumina primero la pared roja.",
        "La pared roja refleja radiancia hacia la blanca.",
        "Existe al menos un rebote de superficie adicional."
      ],
      "solution": "Es iluminación indirecta/color bleeding."
    },
    "check": {
      "question": "¿Un término “ambient=0.1” constante resuelve la ecuación de rendering global?",
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
          "Solo con Lambert",
          false
        ]
      ],
      "feedback": "Es una aproximación artística muy simple, no una solución general de transporte."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La ecuación incluye emisión L_e además de reflexión?",
        "answer": "si",
        "hint": "Una superficie puede emitir."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Color bleeding es evidencia de transporte indirecto?",
        "answer": "si",
        "hint": "La luz rebota llevando espectro/color."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿AO por sí sola calcula esa radiancia rebotada?",
        "answer": "no",
        "hint": "Solo accesibilidad aproximada."
      }
    ]
  },
  "render-ray-tracing": {
    "id": "render-ray-tracing",
    "courseId": 37,
    "title": "Ray tracing: intersección, aceleración y visibilidad",
    "shortTitle": "Ray tracing: intersección, aceleración y visibilidad",
    "duration": 120,
    "objective": "Descomponer ray tracing en generación de rayos, traversal, intersección y shading, distinguiéndolo de path tracing.",
    "summary": [
      "Ray tracing es una familia de técnicas basada en consultar intersecciones de rayos con geometría; no especifica por sí sola cómo integrar toda la iluminación.",
      "Una búsqueda ingenua rayo×triángulo escala mal; estructuras como BVH reducen el conjunto de primitivas candidatas mediante bounding volumes.",
      "Primary, shadow, reflection y other rays responden preguntas distintas; path tracing es un algoritmo de transporte que usa ray tracing como mecanismo de visibilidad/intersección."
    ],
    "concept": "Ray tracing es una familia de técnicas basada en consultar intersecciones de rayos con geometría; no especifica por sí sola cómo integrar toda la iluminación.",
    "rules": [
      "No confundas ray tracing con path tracing.",
      "Una BVH acelera consultas pero su calidad/build/update tienen coste y trade-offs; no elimina intersecciones reales.",
      "Define intervalos t_min/t_max y espacios de coordenadas coherentes para evitar self-hits y hits detrás del objetivo."
    ],
    "deep": {
      "intro": "Descomponer ray tracing en generación de rayos, traversal, intersección y shading, distinguiéndolo de path tracing.",
      "sections": [
        {
          "title": "Ray",
          "body": "r(t)=o+td, t≥0 bajo una convención. Intersectar significa encontrar valores t donde el rayo entra en una primitiva válida."
        },
        {
          "title": "Acceleration structure",
          "body": "Una BVH agrupa geometría en cajas jerárquicas. Si el rayo no intersecta un nodo, se descartan todas sus primitivas descendientes."
        },
        {
          "title": "Tipos de rayos",
          "body": "Camera rays buscan visibilidad primaria; shadow rays prueban un segmento hacia luz; reflection/refraction rays continúan scattering."
        },
        {
          "title": "Hardware/API",
          "body": "APIs modernas pueden exponer acceleration structures y ray queries/pipelines, pero el algoritmo de iluminación sigue siendo responsabilidad del renderer."
        }
      ]
    },
    "example": {
      "problem": "Escena con 1,000,000 triángulos. ¿Una BVH garantiza exactamente O(log n) tests de triángulo por rayo en cualquier caso?",
      "steps": [
        "Una BVH permite podar grandes regiones.",
        "La cantidad visitada depende de la geometría, construcción y rayo.",
        "Los peores casos no quedan reducidos a una garantía simple logarítmica universal."
      ],
      "solution": "No: mejora mucho el caso típico, pero no garantiza exactamente O(log n) tests de primitiva para toda escena/rayo."
    },
    "check": {
      "question": "¿Todo ray tracer es automáticamente un path tracer?",
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
          "Solo si usa BVH",
          false
        ]
      ],
      "feedback": "Path tracing es una técnica concreta de integración de transporte que usa ray tracing."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una shadow ray debería aceptar hits detrás de la luz como bloqueadores?",
        "answer": "no",
        "hint": "Limita el intervalo del rayo."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿BVH significa bounding volume hierarchy?",
        "answer": "si",
        "hint": "Estructura jerárquica de aceleración."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Ray tracing por sí solo determina cuántas muestras Monte Carlo usar?",
        "answer": "no",
        "hint": "Eso pertenece al integrador/sampling."
      }
    ]
  },
  "render-path-tracing": {
    "id": "render-path-tracing",
    "courseId": 37,
    "title": "Path tracing: caminos aleatorios de transporte de luz",
    "shortTitle": "Path tracing: caminos aleatorios de transporte de luz",
    "duration": 135,
    "objective": "Entender path tracing como estimador Monte Carlo de transporte, con rebotes, next-event estimation, Russian roulette y varianza.",
    "summary": [
      "Path tracing construye caminos aleatorios de scattering y estima la ecuación de transporte mediante muestras Monte Carlo.",
      "Más samples reducen varianza, pero el error RMS de Monte Carlo cae típicamente como 1/√N, por lo que limpiar ruido cuesta rápidamente muchas muestras.",
      "Importance sampling, next-event estimation y multiple importance sampling reducen varianza sin cambiar el objetivo matemático; Russian roulette puede terminar caminos sin sesgo si se repondera correctamente."
    ],
    "concept": "Path tracing construye caminos aleatorios de scattering y estima la ecuación de transporte mediante muestras Monte Carlo.",
    "rules": [
      "No interpretes una imagen ruidosa como un resultado necesariamente sesgado: ruido/varianza y sesgo son propiedades distintas.",
      "Cada elección de dirección debe acompañarse de su PDF en el estimador.",
      "No cortes caminos a profundidad fija y luego afirmes “unbiased” sin analizar el sesgo introducido; Russian roulette bien ponderada es una alternativa clásica."
    ],
    "deep": {
      "intro": "Entender path tracing como estimador Monte Carlo de transporte, con rebotes, next-event estimation, Russian roulette y varianza.",
      "sections": [
        {
          "title": "Camino",
          "body": "Desde cámara se intersecta una superficie, se evalúa emisión/direct light y se samplea una nueva dirección según BSDF; el proceso repite hasta terminar."
        },
        {
          "title": "PDF",
          "body": "Si una dirección se samplea con densidad p(ω), la contribución debe dividirse por esa PDF según el estimador correspondiente. Cambiar p cambia varianza, no la integral objetivo."
        },
        {
          "title": "Direct sampling",
          "body": "Next-event estimation samplea explícitamente luces en vértices del camino, reduciendo el problema de esperar a “chocar” aleatoriamente con emisores pequeños."
        },
        {
          "title": "Terminación",
          "body": "Russian roulette conserva esperanza ajustando supervivencia/peso; evita seguir indefinidamente caminos de contribución decreciente."
        }
      ]
    },
    "example": {
      "problem": "Si el error RMS Monte Carlo escala ~1/√N, ¿cuántas muestras aproximadas necesitas para reducir el error a la mitad?",
      "steps": [
        "Queremos 1/√N nuevo = 1/2 del anterior.",
        "Necesitamos √N crecer por factor 2.",
        "N debe crecer por factor 4."
      ],
      "solution": "Aproximadamente 4× más muestras."
    },
    "check": {
      "question": "¿Duplicar samples por pixel reduce típicamente el error Monte Carlo a la mitad?",
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
          "Siempre exactamente",
          false
        ]
      ],
      "feedback": "El error RMS típico escala como 1/√N; para la mitad suele requerirse ~4× muestras."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Path tracing usa ray tracing para consultar intersecciones?",
        "answer": "si",
        "hint": "Los rayos construyen los caminos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Next-event estimation samplea fuentes de luz explícitamente?",
        "answer": "si",
        "hint": "Reduce varianza en direct lighting."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una profundidad fija pequeña puede introducir sesgo al eliminar caminos largos?",
        "answer": "si",
        "hint": "Descarta contribuciones no nulas."
      }
    ]
  },
  "render-monte-carlo": {
    "id": "render-monte-carlo",
    "courseId": 37,
    "title": "Monte Carlo, importance sampling y MIS",
    "shortTitle": "Monte Carlo, importance sampling y MIS",
    "duration": 140,
    "objective": "Construir estimadores Monte Carlo correctos para rendering y distinguir unbiasedness, consistencia y varianza.",
    "summary": [
      "Para integrar ∫f(x)dx muestreando x~p, un estimador básico usa la media de f(x)/p(x) donde p>0 sobre las contribuciones relevantes.",
      "Importance sampling reduce varianza cuando p concentra muestras donde |f| contribuye más, pero una PDF mal elegida no cambia por sí sola el valor esperado si el estimador sigue siendo válido.",
      "MIS combina estrategias complementarias, por ejemplo light sampling y BSDF sampling, para evitar depender de una sola distribución en escenas difíciles."
    ],
    "concept": "Para integrar ∫f(x)dx muestreando x~p, un estimador básico usa la media de f(x)/p(x) donde p>0 sobre las contribuciones relevantes.",
    "rules": [
      "Nunca divides por una PDF cero en una región con contribución no nula; esa estrategia no cubre el integrando.",
      "Unbiased no significa baja varianza ni buena imagen con pocas muestras.",
      "El sample count por sí solo no permite comparar integradores si sus varianzas y costes por muestra difieren."
    ],
    "deep": {
      "intro": "Construir estimadores Monte Carlo correctos para rendering y distinguir unbiasedness, consistencia y varianza.",
      "sections": [
        {
          "title": "Estimador",
          "body": "I=∫f(x)dx = E[f(X)/p(X)] si X~p y p cubre el soporte relevante. La media de N muestras aproxima esa esperanza."
        },
        {
          "title": "Varianza",
          "body": "La varianza del promedio decrece como 1/N para muestras independientes; su desviación estándar decrece como 1/√N."
        },
        {
          "title": "Importance",
          "body": "Elegir p proporcional a la magnitud del integrando idealmente reduce pesos extremos. En rendering se samplean BSDF, luces o ambos."
        },
        {
          "title": "MIS",
          "body": "Multiple importance sampling combina varios estimadores con pesos que balancean sus PDFs. La heuristic exacta importa para varianza, pero la idea central es explotar estrategias complementarias."
        }
      ]
    },
    "example": {
      "problem": "Estimas una integral con muestras x_i~p y valores f/p = [2,4,3,3]. ¿Estimación Monte Carlo?",
      "steps": [
        "Suma los pesos: 12.",
        "Divide entre N=4.",
        "Resultado 3."
      ],
      "solution": "La estimación es 3."
    },
    "check": {
      "question": "¿Un estimador unbiased garantiza una imagen poco ruidosa con 1 sample por pixel?",
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
          "Solo con Lambert",
          false
        ]
      ],
      "feedback": "Unbiasedness habla del valor esperado; la varianza puede seguir siendo enorme."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si cuadruplicas N, ¿la desviación estándar Monte Carlo ideal cae aproximadamente por factor 2?",
        "answer": "si",
        "hint": "1/sqrt(N)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Importance sampling pretende reducir varianza?",
        "answer": "si",
        "hint": "Concentra muestras donde contribuyen más."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿MIS puede combinar light sampling y BSDF sampling?",
        "answer": "si",
        "hint": "Es un uso clásico."
      }
    ]
  }
});
