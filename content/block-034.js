/**
 * BLOQUE 034 — Gráficos por ordenador
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: nombrar siempre el espacio de coordenadas, la convención y
 * el dominio de color. Matrices correctas bajo convenciones distintas siguen
 * produciendo una imagen incorrecta si se mezclan sin adaptación.
 */
window.LEARNING_PATHS[34] = {
  "level": "Experto progresivo",
  "estimatedHours": 108,
  "description": "Fundamentos del pipeline gráfico desde píxeles y color hasta transformaciones, proyección, clipping, rasterización, profundidad, texturas y filtrado.",
  "outcomes": [
    "Razonar sobre framebuffers, resolución y color distinguiendo representación digital, espacio de color y presentación.",
    "Seguir geometría por model, world, view, clip, NDC y window space con convenciones explícitas.",
    "Explicar clipping, rasterización, interpolación perspective-correct y depth testing como etapas distintas.",
    "Diagnosticar texturing y sampling con mipmaps, filtering y visualizaciones intermedias."
  ],
  "modules": [
    {
      "id": "m1-frame-color",
      "title": "Imagen y color",
      "description": "Píxeles, framebuffer, resolución y color",
      "lessons": [
        "gfx-pixels-framebuffer",
        "gfx-resolution-viewport",
        "gfx-color-spaces"
      ]
    },
    {
      "id": "m2-transforms-camera",
      "title": "Espacios, transformaciones y cámara",
      "description": "Coordenadas homogéneas, model, view y projection",
      "lessons": [
        "gfx-coordinate-spaces",
        "gfx-model-transform",
        "gfx-view-camera",
        "gfx-projection-perspective"
      ]
    },
    {
      "id": "m3-raster-depth",
      "title": "Clipping y rasterización",
      "description": "NDC, triángulos, interpolación y profundidad",
      "lessons": [
        "gfx-clipping-ndc-viewport",
        "gfx-rasterization-triangles",
        "gfx-barycentric-interpolation",
        "gfx-depth-zbuffer"
      ]
    },
    {
      "id": "m4-texturing",
      "title": "Texturas e integración",
      "description": "UV, sampling, filtering y pipeline completo",
      "lessons": [
        "gfx-textures-uv",
        "gfx-sampling-filtering",
        "gfx-integration-pipeline"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "gfx-pixels-framebuffer": {
    "id": "gfx-pixels-framebuffer",
    "courseId": 34,
    "title": "Píxeles, muestras y framebuffer",
    "shortTitle": "Píxeles, muestras y framebuffer",
    "duration": 92,
    "objective": "Modelar píxeles y framebuffers sin confundir muestra, píxel físico y valor almacenado.",
    "summary": [
      "Un píxel es una muestra discreta de una imagen; su significado depende del formato y del espacio de color.",
      "Un framebuffer almacena attachments como color, profundidad o stencil; no es sinónimo de la pantalla física.",
      "Multisampling puede almacenar varias muestras por píxel y resolverlas después en un valor de salida."
    ],
    "concept": "Un píxel es una muestra discreta de una imagen; su significado depende del formato y del espacio de color.",
    "rules": [
      "Un píxel es una muestra discreta de una imagen; su significado depende del formato y del espacio de color.",
      "Un framebuffer almacena attachments como color, profundidad o stencil; no es sinónimo de la pantalla física.",
      "Multisampling puede almacenar varias muestras por píxel y resolverlas después en un valor de salida."
    ],
    "deep": {
      "intro": "Modelar píxeles y framebuffers sin confundir muestra, píxel físico y valor almacenado.",
      "sections": [
        {
          "title": "Píxel, texel y muestra",
          "body": "Píxel es una muestra de imagen, texel una muestra de textura y sample una ubicación evaluada por el rasterizador. Pueden coincidir en cantidad, pero son conceptos distintos."
        },
        {
          "title": "Attachments",
          "body": "Un framebuffer puede tener uno o más color attachments y buffers auxiliares como depth/stencil. El formato determina precisión, canales y representación."
        },
        {
          "title": "Presentación",
          "body": "El resultado renderizado suele pasar por composición y presentación antes de llegar al display. La memoria de render no debe identificarse automáticamente con los subpíxeles físicos del panel."
        },
        {
          "title": "MSAA",
          "body": "En multisampling, cobertura y profundidad pueden evaluarse por muestra. El resolve combina muestras; no crea detalle geométrico inexistente."
        }
      ]
    },
    "example": {
      "problem": "Framebuffer RGBA8 de 1920×1080 sin compresión.",
      "steps": [
        "Bytes/píxel=4.",
        "Píxeles=2,073,600.",
        "Multiplica."
      ],
      "solution": "≈8.29 MB (8,294,400 bytes)."
    },
    "check": {
      "question": "¿Framebuffer y panel físico son necesariamente el mismo objeto?",
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
          "Solo en HDR",
          false
        ]
      ],
      "feedback": "Render target y dispositivo de presentación son capas distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "RGBA8 almacena 4 canales de 8 bits. ¿Cuántos bytes por píxel sin compresión?",
        "answer": "4",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Framebuffer y panel físico son necesariamente el mismo objeto?",
        "answer": "no",
        "hint": "Render target y dispositivo de presentación son capas distintas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué píxeles, muestras y framebuffer requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-resolution-viewport": {
    "id": "gfx-resolution-viewport",
    "courseId": 34,
    "title": "Resolución, aspect ratio y viewport",
    "shortTitle": "Resolución, aspect ratio y viewport",
    "duration": 96,
    "objective": "Razonar sobre resolución, relación de aspecto, densidad y viewport sin asumir que tamaño lógico y físico coinciden.",
    "summary": [
      "Resolución describe una rejilla de muestras; no determina por sí sola tamaño físico ni densidad angular.",
      "Aspect ratio y viewport influyen en cómo se mapea la imagen; estirar una proyección cambia geometría aparente.",
      "HiDPI y escalado de interfaz separan unidades lógicas de píxeles físicos."
    ],
    "concept": "Resolución describe una rejilla de muestras; no determina por sí sola tamaño físico ni densidad angular.",
    "rules": [
      "Resolución describe una rejilla de muestras; no determina por sí sola tamaño físico ni densidad angular.",
      "Aspect ratio y viewport influyen en cómo se mapea la imagen; estirar una proyección cambia geometría aparente.",
      "HiDPI y escalado de interfaz separan unidades lógicas de píxeles físicos."
    ],
    "deep": {
      "intro": "Razonar sobre resolución, relación de aspecto, densidad y viewport sin asumir que tamaño lógico y físico coinciden.",
      "sections": [
        {
          "title": "Resolución y densidad",
          "body": "1920×1080 especifica una matriz de muestras, no el tamaño en centímetros. PPI requiere además tamaño físico."
        },
        {
          "title": "Aspect ratio",
          "body": "Mantener la relación de aspecto evita deformación geométrica, aunque letterboxing o crop pueden ser decisiones deliberadas."
        },
        {
          "title": "Viewport",
          "body": "El viewport transforma coordenadas normalizadas a coordenadas de ventana; su origen y convención exacta dependen de la API."
        },
        {
          "title": "Resolución dinámica",
          "body": "Motores modernos pueden renderizar a una resolución y presentar a otra mediante escalado/reconstrucción."
        }
      ]
    },
    "example": {
      "problem": "Viewport 1280×720.",
      "steps": [
        "Aspect=1280/720.",
        "Simplifica 16/9."
      ],
      "solution": "Aspect ratio 16:9."
    },
    "check": {
      "question": "¿1920×1080 determina por sí solo el tamaño físico de una pantalla?",
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
          "Solo en LCD",
          false
        ]
      ],
      "feedback": "Falta información física como diagonal/dimensiones."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una imagen 3840×2160 tiene aspect ratio simplificado ¿16:9 sí/no?",
        "answer": "si",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿1920×1080 determina por sí solo el tamaño físico de una pantalla?",
        "answer": "no",
        "hint": "Falta información física como diagonal/dimensiones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué resolución, aspect ratio y viewport requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-color-spaces": {
    "id": "gfx-color-spaces",
    "courseId": 34,
    "title": "Color, gamma y espacios de color",
    "shortTitle": "Color, gamma y espacios de color",
    "duration": 100,
    "objective": "Distinguir valores RGB, colorimetría, transferencia y composición lineal.",
    "summary": [
      "RGB son coordenadas respecto de primarias y blanco definidos; el mismo triple numérico no identifica un color físico sin un espacio.",
      "sRGB usa una función de transferencia no lineal aproximada a gamma; operaciones de iluminación y mezcla deben hacerse normalmente en un dominio lineal.",
      "Alpha puede ser straight o premultiplied; mezclar convenciones produce halos y errores de composición."
    ],
    "concept": "RGB son coordenadas respecto de primarias y blanco definidos; el mismo triple numérico no identifica un color físico sin un espacio.",
    "rules": [
      "RGB son coordenadas respecto de primarias y blanco definidos; el mismo triple numérico no identifica un color físico sin un espacio.",
      "sRGB usa una función de transferencia no lineal aproximada a gamma; operaciones de iluminación y mezcla deben hacerse normalmente en un dominio lineal.",
      "Alpha puede ser straight o premultiplied; mezclar convenciones produce halos y errores de composición."
    ],
    "deep": {
      "intro": "Distinguir valores RGB, colorimetría, transferencia y composición lineal.",
      "sections": [
        {
          "title": "RGB no basta",
          "body": "El triple (1,0,0) necesita primarias, punto blanco y codificación. sRGB, Display-P3 y otros espacios no son intercambiables por nombre de canal."
        },
        {
          "title": "Transferencia sRGB",
          "body": "Los valores codificados sRGB no son proporcionales a radiancia. Se decodifican a lineal antes de muchas operaciones físicas y se recodifican al mostrar."
        },
        {
          "title": "Alpha",
          "body": "Alpha representa cobertura/opacidad según la convención del pipeline. Premultiplied alpha almacena color ya multiplicado por alpha y simplifica composición repetida."
        },
        {
          "title": "HDR",
          "body": "HDR introduce rangos, primarias y funciones de transferencia adicionales. Más bits no implica automáticamente HDR ni mayor gamut."
        }
      ]
    },
    "example": {
      "problem": "Combina dos intensidades lineales 0.2 y 0.8.",
      "steps": [
        "Promedia en lineal.",
        "(0.2+0.8)/2=0.5."
      ],
      "solution": "La intensidad física promedio idealizada es 0.5 antes de codificar."
    },
    "check": {
      "question": "¿sRGB codificado es lineal respecto a luz?",
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
          "Solo el canal verde",
          false
        ]
      ],
      "feedback": "La función de transferencia sRGB es no lineal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Promediar directamente dos valores sRGB codificados equivale siempre a promediar luz física? sí/no",
        "answer": "no",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿sRGB codificado es lineal respecto a luz?",
        "answer": "no",
        "hint": "La función de transferencia sRGB es no lineal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué color, gamma y espacios de color requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-coordinate-spaces": {
    "id": "gfx-coordinate-spaces",
    "courseId": 34,
    "title": "Espacios de coordenadas y coordenadas homogéneas",
    "shortTitle": "Espacios de coordenadas y coordenadas homogéneas",
    "duration": 104,
    "objective": "Seguir un vértice por espacios local, mundo, vista, clip, NDC y ventana con convenciones explícitas.",
    "summary": [
      "Model, world, view, clip, NDC y window son espacios distintos; un vector numérico solo tiene sentido junto a su espacio.",
      "Las coordenadas homogéneas permiten representar traslaciones y perspectiva con matrices 4×4.",
      "Puntos suelen usar w=1 y direcciones w=0 en la convención afín habitual; después de proyección, w tiene otro papel y se divide para obtener NDC."
    ],
    "concept": "Model, world, view, clip, NDC y window son espacios distintos; un vector numérico solo tiene sentido junto a su espacio.",
    "rules": [
      "Model, world, view, clip, NDC y window son espacios distintos; un vector numérico solo tiene sentido junto a su espacio.",
      "Las coordenadas homogéneas permiten representar traslaciones y perspectiva con matrices 4×4.",
      "Puntos suelen usar w=1 y direcciones w=0 en la convención afín habitual; después de proyección, w tiene otro papel y se divide para obtener NDC."
    ],
    "deep": {
      "intro": "Seguir un vértice por espacios local, mundo, vista, clip, NDC y ventana con convenciones explícitas.",
      "sections": [
        {
          "title": "Cadena de espacios",
          "body": "Un vértice parte de object/model space, pasa a world y view, luego a clip mediante projection. Tras clipping y división por w se obtiene NDC y finalmente ventana."
        },
        {
          "title": "Homogéneas",
          "body": "[x,y,z,1] permite que una traslación 4×4 afecte puntos; [x,y,z,0] ignora traslación, útil para direcciones afines."
        },
        {
          "title": "Convenciones",
          "body": "Orden de multiplicación, handedness y rango de profundidad varían entre APIs/motores. Deben declararse y mantenerse consistentes."
        },
        {
          "title": "Errores de mezcla",
          "body": "Sumar una posición en world space con una normal en view space carece de sentido aunque ambos sean vec3."
        }
      ]
    },
    "example": {
      "problem": "Punto local p=(1,0,0,1) y traslación +2 en x.",
      "steps": [
        "Usa w=1.",
        "La traslación afecta a puntos."
      ],
      "solution": "Resultado x=3 en la convención afín indicada."
    },
    "check": {
      "question": "¿Clip space y NDC son el mismo espacio?",
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
          "Solo en ortográfica",
          false
        ]
      ],
      "feedback": "NDC aparece después de dividir clip coordinates por w."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "En coordenadas homogéneas afines, ¿una dirección suele representarse con w=0? sí/no",
        "answer": "si",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Clip space y NDC son el mismo espacio?",
        "answer": "no",
        "hint": "NDC aparece después de dividir clip coordinates por w."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué espacios de coordenadas y coordenadas homogéneas requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-model-transform": {
    "id": "gfx-model-transform",
    "courseId": 34,
    "title": "Transformaciones model y normales",
    "shortTitle": "Transformaciones model y normales",
    "duration": 92,
    "objective": "Construir transformaciones de objeto y transformar normales correctamente bajo escalado no uniforme.",
    "summary": [
      "La matriz model coloca geometría local en el mundo mediante escala, rotación y traslación según la convención.",
      "El orden de transformaciones importa porque las matrices no conmutan en general.",
      "Las normales no deben transformarse como posiciones; bajo transformación lineal general usan la inversa transpuesta de la parte lineal."
    ],
    "concept": "La matriz model coloca geometría local en el mundo mediante escala, rotación y traslación según la convención.",
    "rules": [
      "La matriz model coloca geometría local en el mundo mediante escala, rotación y traslación según la convención.",
      "El orden de transformaciones importa porque las matrices no conmutan en general.",
      "Las normales no deben transformarse como posiciones; bajo transformación lineal general usan la inversa transpuesta de la parte lineal."
    ],
    "deep": {
      "intro": "Construir transformaciones de objeto y transformar normales correctamente bajo escalado no uniforme.",
      "sections": [
        {
          "title": "Composición",
          "body": "Aplicar escala y luego traslación no equivale a trasladar y luego escalar. La notación columna/fila decide cómo se escribe el producto, no la física."
        },
        {
          "title": "Normales",
          "body": "Una normal n debe seguir siendo ortogonal a las tangentes transformadas. Eso conduce a n' ∝ (A^{-1})^T n para A invertible."
        },
        {
          "title": "Escala uniforme",
          "body": "Con rotación y escala uniforme, transformar y renormalizar la normal suele coincidir con el resultado esperado."
        },
        {
          "title": "Singularidad",
          "body": "Una escala cero hace la transformación no invertible; la matriz normal clásica deja de estar definida."
        }
      ]
    },
    "example": {
      "problem": "Normal bajo A=diag(2,1,1).",
      "steps": [
        "Usa (A^{-1})^T.",
        "A^{-T}=diag(1/2,1,1).",
        "Renormaliza."
      ],
      "solution": "La normal se transforma con la inversa transpuesta, no como una posición."
    },
    "check": {
      "question": "¿El orden de rotar y trasladar puede cambiar el resultado?",
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
          "Solo en 2D",
          false
        ]
      ],
      "feedback": "Las transformaciones no conmutan en general."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Tras escalado no uniforme basta aplicar la misma matriz 3×3 a una normal y normalizar en general? sí/no",
        "answer": "no",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El orden de rotar y trasladar puede cambiar el resultado?",
        "answer": "si",
        "hint": "Las transformaciones no conmutan en general."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué transformaciones model y normales requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-view-camera": {
    "id": "gfx-view-camera",
    "courseId": 34,
    "title": "Cámara y matriz view",
    "shortTitle": "Cámara y matriz view",
    "duration": 96,
    "objective": "Entender la cámara como cambio de coordenadas y construir una view matrix coherente.",
    "summary": [
      "La cámara virtual define un marco; la matriz view transforma el mundo a coordenadas de cámara y es conceptualmente la inversa del pose de cámara.",
      "Look-at requiere manejar degeneraciones cuando dirección de vista y up son paralelas o casi paralelas.",
      "Mover la cámara a la derecha produce, en view space, un desplazamiento aparente del mundo en sentido opuesto."
    ],
    "concept": "La cámara virtual define un marco; la matriz view transforma el mundo a coordenadas de cámara y es conceptualmente la inversa del pose de cámara.",
    "rules": [
      "La cámara virtual define un marco; la matriz view transforma el mundo a coordenadas de cámara y es conceptualmente la inversa del pose de cámara.",
      "Look-at requiere manejar degeneraciones cuando dirección de vista y up son paralelas o casi paralelas.",
      "Mover la cámara a la derecha produce, en view space, un desplazamiento aparente del mundo en sentido opuesto."
    ],
    "deep": {
      "intro": "Entender la cámara como cambio de coordenadas y construir una view matrix coherente.",
      "sections": [
        {
          "title": "Pose frente a view",
          "body": "Si C lleva coordenadas de cámara a mundo, view=C^{-1}. Confundir ambas matrices invierte el significado del movimiento."
        },
        {
          "title": "Base de cámara",
          "body": "Right, up y forward forman una base según handedness. Deben ser ortonormales para evitar shear/scale involuntario."
        },
        {
          "title": "Look-at",
          "body": "Se construye una dirección hacia target, un eje lateral mediante producto vectorial y un up corregido; los signos dependen de convención."
        },
        {
          "title": "Cámaras no físicas",
          "body": "Una cámara gráfica puede usar proyección ortográfica, perspectiva o modelos no pinhole. View y projection son etapas conceptualmente separadas."
        }
      ]
    },
    "example": {
      "problem": "Cámara con pose C.",
      "steps": [
        "C lleva cámara→mundo.",
        "View debe llevar mundo→cámara."
      ],
      "solution": "View=C^{-1}."
    },
    "check": {
      "question": "¿La view matrix es conceptualmente la inversa del pose de cámara?",
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
          "Solo con FOV 90°",
          false
        ]
      ],
      "feedback": "Pose y cambio a camera space son transformaciones inversas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si C es el transform de pose cámara→mundo, ¿view=C^{-1}? sí/no",
        "answer": "si",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La view matrix es conceptualmente la inversa del pose de cámara?",
        "answer": "si",
        "hint": "Pose y cambio a camera space son transformaciones inversas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué cámara y matriz view requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-projection-perspective": {
    "id": "gfx-projection-perspective",
    "courseId": 34,
    "title": "Proyección, perspectiva y frustum",
    "shortTitle": "Proyección, perspectiva y frustum",
    "duration": 100,
    "objective": "Derivar el papel de la proyección perspectiva, FOV, aspect, near/far y la división por w.",
    "summary": [
      "La perspectiva pinhole hace que el tamaño proyectado sea aproximadamente inverso a la profundidad.",
      "La matriz projection produce clip coordinates; la perspectiva aparece tras la división por w, no por una mera transformación afín 3D.",
      "Near/far y la convención de depth afectan precisión; acercar near excesivamente a cero puede desperdiciar precisión en pipelines convencionales."
    ],
    "concept": "La perspectiva pinhole hace que el tamaño proyectado sea aproximadamente inverso a la profundidad.",
    "rules": [
      "La perspectiva pinhole hace que el tamaño proyectado sea aproximadamente inverso a la profundidad.",
      "La matriz projection produce clip coordinates; la perspectiva aparece tras la división por w, no por una mera transformación afín 3D.",
      "Near/far y la convención de depth afectan precisión; acercar near excesivamente a cero puede desperdiciar precisión en pipelines convencionales."
    ],
    "deep": {
      "intro": "Derivar el papel de la proyección perspectiva, FOV, aspect, near/far y la división por w.",
      "sections": [
        {
          "title": "Pinhole",
          "body": "Para un modelo simple, x_ndc depende de x/z (con signos según convención). Objetos lejanos ocupan menos pantalla."
        },
        {
          "title": "FOV",
          "body": "Un FOV vertical junto con aspect ratio define la apertura horizontal correspondiente; grados/radianes deben manejarse explícitamente."
        },
        {
          "title": "Clip w",
          "body": "La matriz perspectiva prepara x,y,z,w de modo que después se divide por w. Antes de esa división el volumen de clipping es simple en homogéneas."
        },
        {
          "title": "Depth precision",
          "body": "La relación near/far y el mapping elegido concentran precisión de forma no uniforme. Técnicas reversed-Z cambian el reparto, dependiendo de la API/formato."
        }
      ]
    },
    "example": {
      "problem": "Dos puntos con igual x y profundidades z y 2z.",
      "steps": [
        "En pinhole, coordenada proyectada escala como x/z.",
        "Duplicar profundidad divide por dos."
      ],
      "solution": "El más lejano ocupa aproximadamente la mitad en esa dimensión."
    },
    "check": {
      "question": "¿La perspectiva completa se obtiene sin división por w?",
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
          "Solo con depth buffer",
          false
        ]
      ],
      "feedback": "La perspective divide es parte esencial del mapping."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "En perspectiva pinhole ideal, duplicar z manteniendo x tiende a reducir x proyectada a la mitad en magnitud. ¿sí/no?",
        "answer": "si",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La perspectiva completa se obtiene sin división por w?",
        "answer": "no",
        "hint": "La perspective divide es parte esencial del mapping."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué proyección, perspectiva y frustum requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-clipping-ndc-viewport": {
    "id": "gfx-clipping-ndc-viewport",
    "courseId": 34,
    "title": "Clipping, NDC y viewport",
    "shortTitle": "Clipping, NDC y viewport",
    "duration": 104,
    "objective": "Separar clipping homogéneo, perspective divide y viewport transform.",
    "summary": [
      "El clipping debe ocurrir en clip space antes de dividir por w para manejar correctamente primitivas que cruzan el plano de cámara.",
      "NDC surge después de perspective divide; sus rangos exactos, especialmente z, dependen de la API.",
      "Viewport transforma NDC a coordenadas de ventana y depth range; no es una proyección 3D adicional."
    ],
    "concept": "El clipping debe ocurrir en clip space antes de dividir por w para manejar correctamente primitivas que cruzan el plano de cámara.",
    "rules": [
      "El clipping debe ocurrir en clip space antes de dividir por w para manejar correctamente primitivas que cruzan el plano de cámara.",
      "NDC surge después de perspective divide; sus rangos exactos, especialmente z, dependen de la API.",
      "Viewport transforma NDC a coordenadas de ventana y depth range; no es una proyección 3D adicional."
    ],
    "deep": {
      "intro": "Separar clipping homogéneo, perspective divide y viewport transform.",
      "sections": [
        {
          "title": "Clip space",
          "body": "Las desigualdades del volumen canónico se evalúan sobre x_c,y_c,z_c,w_c con convención de API."
        },
        {
          "title": "Clipping de triángulos",
          "body": "Una primitiva que cruza un plano se recorta y puede generar nuevos vértices con atributos interpolados."
        },
        {
          "title": "Perspective divide",
          "body": "x_ndc=x_c/w_c y análogos. Dividir antes de clipping puede producir singularidades y topología incorrecta cerca de w=0."
        },
        {
          "title": "Viewport",
          "body": "El mapping final escala y desplaza NDC hacia píxeles/ventana; scissor es un control adicional distinto."
        }
      ]
    },
    "example": {
      "problem": "Un triángulo cruza el near plane.",
      "steps": [
        "No descartes toda la primitiva.",
        "Clipa contra el volumen homogéneo.",
        "Genera vértices nuevos."
      ],
      "solution": "Se rasteriza la porción visible."
    },
    "check": {
      "question": "¿El rango z de NDC es idéntico en todas las APIs?",
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
          "Solo cambia en móviles",
          false
        ]
      ],
      "feedback": "Las convenciones de clip/depth varían."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debe hacerse el clipping geométrico del frustum normalmente antes de dividir por w? sí/no",
        "answer": "si",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El rango z de NDC es idéntico en todas las APIs?",
        "answer": "no",
        "hint": "Las convenciones de clip/depth varían."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué clipping, ndc y viewport requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-rasterization-triangles": {
    "id": "gfx-rasterization-triangles",
    "courseId": 34,
    "title": "Rasterización de triángulos",
    "shortTitle": "Rasterización de triángulos",
    "duration": 92,
    "objective": "Entender cobertura, edge functions, reglas de relleno y generación de fragments.",
    "summary": [
      "Rasterización convierte una primitiva proyectada en fragments candidatos; no “convierte triángulos en píxeles” de forma independiente del sample pattern.",
      "Edge functions y coordenadas baricéntricas permiten probar interior y calcular pesos.",
      "Las reglas de relleno evitan doble cobertura inconsistente en bordes compartidos; los detalles exactos dependen de la API."
    ],
    "concept": "Rasterización convierte una primitiva proyectada en fragments candidatos; no “convierte triángulos en píxeles” de forma independiente del sample pattern.",
    "rules": [
      "Rasterización convierte una primitiva proyectada en fragments candidatos; no “convierte triángulos en píxeles” de forma independiente del sample pattern.",
      "Edge functions y coordenadas baricéntricas permiten probar interior y calcular pesos.",
      "Las reglas de relleno evitan doble cobertura inconsistente en bordes compartidos; los detalles exactos dependen de la API."
    ],
    "deep": {
      "intro": "Entender cobertura, edge functions, reglas de relleno y generación de fragments.",
      "sections": [
        {
          "title": "Triángulo como primitiva",
          "body": "Tras transformación y clipping, el rasterizador evalúa qué samples cubre el triángulo."
        },
        {
          "title": "Edge functions",
          "body": "El signo de una función de borde respecto a cada arista permite clasificar un punto según la orientación elegida."
        },
        {
          "title": "Fragments",
          "body": "Un fragment es un candidato de rasterización con atributos; puede descartarse por depth, stencil, shader o coverage antes de contribuir al framebuffer."
        },
        {
          "title": "Degenerados",
          "body": "Triángulos de área proyectada cero no cubren área útil; back-face culling y winding son decisiones configurables."
        }
      ]
    },
    "example": {
      "problem": "Sample center frente a tres edge functions.",
      "steps": [
        "Evalúa signos coherentes.",
        "Aplica regla de borde de la API."
      ],
      "solution": "Si satisface cobertura, se genera un fragment candidato."
    },
    "check": {
      "question": "¿Todo fragment generado termina escribiendo color?",
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
      "feedback": "Puede fallar tests o descartarse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un fragment es necesariamente un píxel ya escrito en el framebuffer? sí/no",
        "answer": "no",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Todo fragment generado termina escribiendo color?",
        "answer": "no",
        "hint": "Puede fallar tests o descartarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué rasterización de triángulos requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-barycentric-interpolation": {
    "id": "gfx-barycentric-interpolation",
    "courseId": 34,
    "title": "Interpolación baricéntrica y corrección perspectiva",
    "shortTitle": "Interpolación baricéntrica y corrección perspectiva",
    "duration": 96,
    "objective": "Interpolar atributos en triángulos y entender por qué UV/depth requieren tratamiento cuidadoso.",
    "summary": [
      "Las coordenadas baricéntricas suman 1 y expresan un punto como combinación de los vértices del triángulo.",
      "Interpolar linealmente valores ya divididos en screen space no preserva en general atributos definidos linealmente antes de perspectiva.",
      "La interpolación perspective-correct usa cantidades relacionadas con atributo/w y 1/w para reconstruir el valor correcto."
    ],
    "concept": "Las coordenadas baricéntricas suman 1 y expresan un punto como combinación de los vértices del triángulo.",
    "rules": [
      "Las coordenadas baricéntricas suman 1 y expresan un punto como combinación de los vértices del triángulo.",
      "Interpolar linealmente valores ya divididos en screen space no preserva en general atributos definidos linealmente antes de perspectiva.",
      "La interpolación perspective-correct usa cantidades relacionadas con atributo/w y 1/w para reconstruir el valor correcto."
    ],
    "deep": {
      "intro": "Interpolar atributos en triángulos y entender por qué UV/depth requieren tratamiento cuidadoso.",
      "sections": [
        {
          "title": "Baricéntricas",
          "body": "Para pesos λ0+λ1+λ2=1, un atributo afín en el triángulo se combina como Σλ_i a_i cuando el espacio de interpolación apropiado es afín."
        },
        {
          "title": "Perspectiva",
          "body": "Después de projection divide, la geometría ya no mantiene linealidad de ciertos atributos respecto a pantalla."
        },
        {
          "title": "Corrección",
          "body": "Se interpola a_i/w_i y 1/w_i, luego se divide para recuperar el atributo en el punto."
        },
        {
          "title": "Flat/no-perspective",
          "body": "APIs pueden ofrecer qualifiers de interpolación distintos; deben elegirse según la semántica del dato."
        }
      ]
    },
    "example": {
      "problem": "Pesos (0.2,0.3,0.5), colores escalares (0,10,20).",
      "steps": [
        "Combina 0.2·0+0.3·10+0.5·20."
      ],
      "solution": "Valor interpolado afín=13."
    },
    "check": {
      "question": "¿Los pesos baricéntricos de un punto afín dentro del triángulo suman 1?",
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
          "Solo en 2D",
          false
        ]
      ],
      "feedback": "Ésa es parte de la definición afín."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "En el centroide baricéntrico de un triángulo, ¿los pesos son 1/3,1/3,1/3? sí/no",
        "answer": "si",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Los pesos baricéntricos de un punto afín dentro del triángulo suman 1?",
        "answer": "si",
        "hint": "Ésa es parte de la definición afín."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué interpolación baricéntrica y corrección perspectiva requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-depth-zbuffer": {
    "id": "gfx-depth-zbuffer",
    "courseId": 34,
    "title": "Depth test y Z-buffer",
    "shortTitle": "Depth test y Z-buffer",
    "duration": 100,
    "objective": "Razonar sobre visibilidad, profundidad, precisión y artefactos del depth buffer.",
    "summary": [
      "El Z-buffer resuelve visibilidad local comparando valores de profundidad por sample/fragment bajo una función configurada.",
      "Depth buffer no almacena necesariamente distancia euclídea a la cámara; contiene una transformación de profundidad determinada por el pipeline.",
      "Z-fighting aparece cuando superficies quedan demasiado próximas en la representación de profundidad disponible."
    ],
    "concept": "El Z-buffer resuelve visibilidad local comparando valores de profundidad por sample/fragment bajo una función configurada.",
    "rules": [
      "El Z-buffer resuelve visibilidad local comparando valores de profundidad por sample/fragment bajo una función configurada.",
      "Depth buffer no almacena necesariamente distancia euclídea a la cámara; contiene una transformación de profundidad determinada por el pipeline.",
      "Z-fighting aparece cuando superficies quedan demasiado próximas en la representación de profundidad disponible."
    ],
    "deep": {
      "intro": "Razonar sobre visibilidad, profundidad, precisión y artefactos del depth buffer.",
      "sections": [
        {
          "title": "Visibilidad",
          "body": "Con depth test típico, el fragment más cercano según la convención de depth gana, salvo configuraciones alternativas."
        },
        {
          "title": "No linealidad",
          "body": "En perspectiva convencional la distribución de depth no es lineal en distancia de view space; precisión suele concentrarse cerca del near plane."
        },
        {
          "title": "Z-fighting",
          "body": "Dos superficies casi coplanares pueden cuantizar a valores similares y alternar cobertura visible."
        },
        {
          "title": "Orden y transparencia",
          "body": "Z-buffer resuelve bien opacidad ordinaria, pero blending transparente suele requerir estrategias adicionales como ordenación u OIT."
        }
      ]
    },
    "example": {
      "problem": "Dos fragments opacos cubren el mismo sample.",
      "steps": [
        "Compara depth según función configurada.",
        "El que pasa puede actualizar color/depth."
      ],
      "solution": "La visibilidad depende del depth test y la convención elegida."
    },
    "check": {
      "question": "¿Z-buffer resuelve por sí solo toda transparencia?",
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
          "Solo con 32 bits",
          false
        ]
      ],
      "feedback": "Blending/transparencia requiere estrategias adicionales."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El valor almacenado en un depth buffer perspectiva es siempre distancia euclídea lineal a la cámara? sí/no",
        "answer": "no",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Z-buffer resuelve por sí solo toda transparencia?",
        "answer": "no",
        "hint": "Blending/transparencia requiere estrategias adicionales."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué depth test y z-buffer requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-textures-uv": {
    "id": "gfx-textures-uv",
    "courseId": 34,
    "title": "Texturas, UV y mipmaps",
    "shortTitle": "Texturas, UV y mipmaps",
    "duration": 104,
    "objective": "Entender texturas como funciones discretizadas, coordenadas UV y niveles mip para distintas escalas.",
    "summary": [
      "Una textura es un recurso de datos muestreables; un texel no equivale automáticamente a un píxel de pantalla.",
      "UV parametriza una superficie y puede tener seams, distorsión y wrapping.",
      "Mipmaps almacenan representaciones prefiltradas a resoluciones decrecientes para reducir aliasing y coste en minificación."
    ],
    "concept": "Una textura es un recurso de datos muestreables; un texel no equivale automáticamente a un píxel de pantalla.",
    "rules": [
      "Una textura es un recurso de datos muestreables; un texel no equivale automáticamente a un píxel de pantalla.",
      "UV parametriza una superficie y puede tener seams, distorsión y wrapping.",
      "Mipmaps almacenan representaciones prefiltradas a resoluciones decrecientes para reducir aliasing y coste en minificación."
    ],
    "deep": {
      "intro": "Entender texturas como funciones discretizadas, coordenadas UV y niveles mip para distintas escalas.",
      "sections": [
        {
          "title": "UV",
          "body": "Coordenadas de textura suelen estar normalizadas conceptualmente, aunque APIs admiten otras formas. El mapeo depende de la parametrización del mesh."
        },
        {
          "title": "Seams",
          "body": "Una misma posición geométrica puede necesitar UV distintos en diferentes caras; por eso se duplican vértices lógicos en la malla."
        },
        {
          "title": "Mipmaps",
          "body": "Cada nivel aproxima una versión filtrada más pequeña. Elegir LOD depende de cómo cambia la huella del fragment en texture space."
        },
        {
          "title": "Wrap",
          "body": "Repeat, clamp y mirror cambian qué texels se consultan fuera del rango base; no alteran la geometría del mesh."
        }
      ]
    },
    "example": {
      "problem": "Una textura se minifica a una fracción de su tamaño.",
      "steps": [
        "Muchos texels contribuyen a cada píxel.",
        "Selecciona un mip apropiado."
      ],
      "solution": "El prefiltrado reduce aliasing frente a muestrear solo el nivel base."
    },
    "check": {
      "question": "¿Mipmaps ayudan especialmente en minificación?",
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
          "Solo en texturas 1D",
          false
        ]
      ],
      "feedback": "Representan versiones prefiltradas a menor resolución."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un texel de una textura 4K tiene que corresponder a exactamente un píxel de pantalla? sí/no",
        "answer": "no",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Mipmaps ayudan especialmente en minificación?",
        "answer": "si",
        "hint": "Representan versiones prefiltradas a menor resolución."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué texturas, uv y mipmaps requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-sampling-filtering": {
    "id": "gfx-sampling-filtering",
    "courseId": 34,
    "title": "Sampling, filtering y anisotropía",
    "shortTitle": "Sampling, filtering y anisotropía",
    "duration": 92,
    "objective": "Analizar magnificación/minificación, aliasing, filtrado bilineal/trilineal y anisotrópico.",
    "summary": [
      "Nearest y bilinear son filtros de reconstrucción local; bilinear no elimina por sí solo aliasing severo de minificación.",
      "Trilinear interpola entre dos niveles mip además de filtrar dentro de cada nivel.",
      "Anisotropic filtering mejora huellas muy alargadas donde un único LOD isotrópico pierde demasiado detalle o aliasa."
    ],
    "concept": "Nearest y bilinear son filtros de reconstrucción local; bilinear no elimina por sí solo aliasing severo de minificación.",
    "rules": [
      "Nearest y bilinear son filtros de reconstrucción local; bilinear no elimina por sí solo aliasing severo de minificación.",
      "Trilinear interpola entre dos niveles mip además de filtrar dentro de cada nivel.",
      "Anisotropic filtering mejora huellas muy alargadas donde un único LOD isotrópico pierde demasiado detalle o aliasa."
    ],
    "deep": {
      "intro": "Analizar magnificación/minificación, aliasing, filtrado bilineal/trilineal y anisotrópico.",
      "sections": [
        {
          "title": "Magnificación",
          "body": "Cuando una huella de pantalla cubre menos de un texel, se reconstruye la textura; nearest y bilinear ofrecen compromisos distintos."
        },
        {
          "title": "Minificación",
          "body": "Cuando muchos texels contribuyen a un píxel, hay que prefiltrar/filtrar para evitar aliasing."
        },
        {
          "title": "Trilinear",
          "body": "Combina muestreo bilinear en dos mip levels vecinos y mezcla entre niveles para reducir transiciones."
        },
        {
          "title": "Anisotropía",
          "body": "En superficies oblicuas la huella en texture space puede ser elongada; anisotropic filtering toma más muestras en la dirección pertinente."
        }
      ]
    },
    "example": {
      "problem": "LOD cae entre mip 3 y 4.",
      "steps": [
        "Bilinear en nivel 3.",
        "Bilinear en nivel 4.",
        "Interpola ambos resultados."
      ],
      "solution": "Eso describe filtrado trilineal."
    },
    "check": {
      "question": "¿Bilinear usa cuatro texels vecinos en 2D en el caso ordinario?",
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
          "Siempre ocho",
          false
        ]
      ],
      "feedback": "Interpola 2×2 texels."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El filtrado trilineal interpola entre niveles mip además de hacer bilinear? sí/no",
        "answer": "si",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Bilinear usa cuatro texels vecinos en 2D en el caso ordinario?",
        "answer": "si",
        "hint": "Interpola 2×2 texels."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué sampling, filtering y anisotropía requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  },
  "gfx-integration-pipeline": {
    "id": "gfx-integration-pipeline",
    "courseId": 34,
    "title": "Pipeline gráfico integrado",
    "shortTitle": "Pipeline gráfico integrado",
    "duration": 96,
    "objective": "Seguir un triángulo completo desde CPU/mesh hasta framebuffer y diagnosticar errores por etapa.",
    "summary": [
      "Un pipeline gráfico es una composición de espacios, transformaciones, clipping, rasterización, shading, tests y blending.",
      "Cada bug debe localizarse por etapa y convención: geometría, cámara, proyección, clipping, interpolation, depth, color o sampling.",
      "Capturas de frame y visualizaciones intermedias convierten errores “mágicos” en estados observables y reproducibles."
    ],
    "concept": "Un pipeline gráfico es una composición de espacios, transformaciones, clipping, rasterización, shading, tests y blending.",
    "rules": [
      "Un pipeline gráfico es una composición de espacios, transformaciones, clipping, rasterización, shading, tests y blending.",
      "Cada bug debe localizarse por etapa y convención: geometría, cámara, proyección, clipping, interpolation, depth, color o sampling.",
      "Capturas de frame y visualizaciones intermedias convierten errores “mágicos” en estados observables y reproducibles."
    ],
    "deep": {
      "intro": "Seguir un triángulo completo desde CPU/mesh hasta framebuffer y diagnosticar errores por etapa.",
      "sections": [
        {
          "title": "Recorrido",
          "body": "Mesh/object → model/world → view → projection/clip → clipping → perspective divide/NDC → viewport → rasterization → fragment shading → depth/stencil → blending → framebuffer."
        },
        {
          "title": "Debug por visualización",
          "body": "Renderizar normales, UV, depth o barycentrics como color ayuda a verificar una etapa sin depender de la iluminación final."
        },
        {
          "title": "Convenciones",
          "body": "Documenta handedness, matrix order, clip-depth range, color space y texture origin. Muchos bugs aparecen al mezclar convenciones correctas por separado."
        },
        {
          "title": "Validación",
          "body": "Un triángulo mínimo con posiciones y colores conocidos sirve como test de humo del pipeline antes de cargar assets complejos."
        }
      ]
    },
    "example": {
      "problem": "La malla aparece invertida y el depth falla.",
      "steps": [
        "Visualiza clip/NDC y depth.",
        "Comprueba handedness y rango z de la API.",
        "Comprueba winding/cull."
      ],
      "solution": "Diagnostica por etapa en lugar de cambiar matrices al azar."
    },
    "check": {
      "question": "¿Documentar espacios y convenciones ayuda a aislar bugs?",
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
          "Solo en ray tracing",
          false
        ]
      ],
      "feedback": "Evita mezclar transformaciones correctas bajo convenciones incompatibles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Es buena estrategia depurar primero con un triángulo mínimo y visualizar valores intermedios? sí/no",
        "answer": "si",
        "hint": "Usa la definición central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Documentar espacios y convenciones ayuda a aislar bugs?",
        "answer": "si",
        "hint": "Evita mezclar transformaciones correctas bajo convenciones incompatibles."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Explica en una frase por qué pipeline gráfico integrado requiere declarar convenciones o dominio.",
        "answer": "convenciones",
        "alternatives": [
          "declarar convenciones",
          "convenciones y dominio"
        ],
        "hint": "La misma cifra/matriz puede significar cosas distintas según el espacio, formato o API."
      }
    ]
  }
});
