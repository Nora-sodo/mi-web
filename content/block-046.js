/**
 * BLOQUE 046 — Pixel art y arte técnico
 *
 * Regla editorial: tratar el píxel como decisión visual discreta y separar
 * intención artística de sampling, escalado, color-space, importación y runtime.
 * Pixel-perfect no significa simplemente activar nearest-neighbor.
 */
window.LEARNING_PATHS[46] = {
  "level": "Experto progresivo",
  "estimatedHours": 108,
  "description": "Pixel art y arte técnico: representación discreta, clusters, silueta, paletas, color, dithering, AA manual, subpixel animation, tilesets, sprites, animación, pixel-perfect, procedural y pipeline.",
  "outcomes": [
    "Diseñar sprites y tiles legibles mediante clusters, silueta, paletas y timing.",
    "Integrar pixel art en un renderer moderno controlando sampling, escalado, color, atlases y pivots.",
    "Construir animación y generación procedural preservando masa visual, conectividad y reproducibilidad.",
    "Automatizar un pipeline técnico que valide importación/exportación sin sustituir el juicio artístico."
  ],
  "modules": [
    {
      "id": "m1-language",
      "title": "Lenguaje visual discreto",
      "description": "Rejilla, clusters, silueta, paletas y color",
      "lessons": [
        "pixelart-discrete-representation",
        "pixelart-clusters",
        "pixelart-silhouette",
        "pixelart-palettes",
        "pixelart-color"
      ]
    },
    {
      "id": "m2-edge-motion",
      "title": "Bordes y movimiento",
      "description": "Dithering, AA y animación subpixel",
      "lessons": [
        "pixelart-dithering",
        "pixelart-manual-aa",
        "pixelart-subpixel-animation"
      ]
    },
    {
      "id": "m3-assets",
      "title": "Assets modulares y animación",
      "description": "Tilesets, sprites y animación",
      "lessons": [
        "pixelart-tilesets",
        "pixelart-sprites",
        "pixelart-animation"
      ]
    },
    {
      "id": "m4-runtime",
      "title": "Runtime y producción",
      "description": "Pixel-perfect, procedural y pipeline",
      "lessons": [
        "pixelart-pixel-perfect",
        "pixelart-procedural",
        "pixelart-pipeline"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "pixelart-discrete-representation": {
    "id": "pixelart-discrete-representation",
    "courseId": 46,
    "title": "Representación visual discreta y pixel intent",
    "shortTitle": "Representación discreta",
    "duration": 100,
    "objective": "Entender el píxel como unidad de decisión visual dentro de una rejilla y distinguir resolución lógica, resolución de salida y escalado.",
    "summary": [
      "El pixel art diseña formas deliberadamente sobre una rejilla discreta; no es una imagen continua reducida al final.",
      "La resolución lógica determina cuántas decisiones espaciales existen; el escalado entero preserva esas decisiones mejor que un remuestreo fraccional.",
      "Píxel lógico, píxel físico y sample de rasterización pueden no coincidir uno a uno en una pantalla moderna."
    ],
    "concept": "El pixel art diseña formas deliberadamente sobre una rejilla discreta; no es una imagen continua reducida al final.",
    "rules": [
      "Define primero la resolución lógica y la escala objetivo.",
      "No confundas estética pixel art con simple baja resolución.",
      "Evita remuestreo fraccional cuando el objetivo sea preservar una cuadrícula exacta."
    ],
    "deep": {
      "intro": "Entender el píxel como unidad de decisión visual dentro de una rejilla y distinguir resolución lógica, resolución de salida y escalado.",
      "sections": [
        {
          "title": "Tres rejillas",
          "body": "Una obra puede vivir en una rejilla lógica de 320×180 y mostrarse en 1920×1080 con escala 6×. La pantalla física puede además tener su propia densidad y scaling del sistema."
        },
        {
          "title": "Decisión discreta",
          "body": "Cada celda representa una decisión explícita de forma/color. Reducir una pintura de alta resolución puede crear píxeles, pero no necesariamente clusters intencionados."
        },
        {
          "title": "Escalado",
          "body": "Una escala entera replica cada píxel lógico en bloques uniformes. Escalas 2.5× obligan a distribuir tamaños de forma desigual o filtrar."
        },
        {
          "title": "Conexión técnica",
          "body": "Sampling, color y framebuffer ya estudiados siguen aplicando; aquí se usan como restricciones artísticas deliberadas."
        }
      ]
    },
    "example": {
      "problem": "Juego lógico 320×180 mostrado en 1920×1080.",
      "steps": [
        "1920/320=6",
        "1080/180=6"
      ],
      "solution": "Escala entera 6×."
    },
    "check": {
      "question": "¿Una imagen reducida automáticamente a 64×64 es necesariamente pixel art?",
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
          "Solo si usa PNG",
          false
        ]
      ],
      "feedback": "La rejilla debe formar parte de la intención visual."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "160×90 a 1280×720. Escala entera.",
        "answer": "8",
        "hint": "1280/160."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Pixel lógico y píxel físico son siempre equivalentes?",
        "answer": "no",
        "hint": "Display scaling puede romper la correspondencia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Escala 3.5× preserva una réplica uniforme de cada celda sin filtrado?",
        "answer": "no",
        "hint": "No hay número entero de píxeles físicos por celda."
      }
    ]
  },
  "pixelart-clusters": {
    "id": "pixelart-clusters",
    "courseId": 46,
    "title": "Pixel clusters y economía de forma",
    "shortTitle": "Pixel clusters",
    "duration": 100,
    "objective": "Construir formas mediante grupos coherentes de píxeles y analizar ruido, tangentes y continuidad local.",
    "summary": [
      "Un cluster es un grupo conectado de píxeles que funciona como una unidad visual, no una colección arbitraria de puntos.",
      "Clusters fuertes describen volumen, borde o detalle con economía; single pixels aislados pueden ser útiles, pero también introducir ruido.",
      "La calidad depende de relaciones entre masas positivas y negativas, no de maximizar cantidad de detalle."
    ],
    "concept": "Un cluster es un grupo conectado de píxeles que funciona como una unidad visual, no una colección arbitraria de puntos.",
    "rules": [
      "Evalúa clusters a escala 1× y ampliada.",
      "Usa píxeles aislados solo cuando tengan función visual clara.",
      "Prioriza masas legibles antes que microdetalle."
    ],
    "deep": {
      "intro": "Construir formas mediante grupos coherentes de píxeles y analizar ruido, tangentes y continuidad local.",
      "sections": [
        {
          "title": "Cluster",
          "body": "Un cluster puede ser una mancha de sombra, brillo, contorno o plano. Su lectura emerge del conjunto, no de cada píxel por separado."
        },
        {
          "title": "Ruido",
          "body": "Singles desconectados repetidos crean textura ruidosa y dificultan leer volumen. El ruido puede ser intencional, pero debe tener escala y densidad controladas."
        },
        {
          "title": "Curvas discretas",
          "body": "Las curvas se aproximan con secuencias de pasos. Ritmos inconsistentes de 1-1-1-3-1 pueden producir bultos perceptuales."
        },
        {
          "title": "Negativo",
          "body": "Los huecos entre clusters son parte de la forma: una silueta puede mejorar eliminando píxeles, no añadiéndolos."
        }
      ]
    },
    "example": {
      "problem": "Un borde usa pasos horizontales 2,2,2,2.",
      "steps": [
        "El ritmo de escalones es constante.",
        "La curva discreta produce una pendiente visual regular."
      ],
      "solution": "Ritmo uniforme; luego se ajusta por intención."
    },
    "check": {
      "question": "¿Más píxeles aislados implican automáticamente más detalle útil?",
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
          "Solo en 1-bit",
          false
        ]
      ],
      "feedback": "El detalle debe reforzar estructura."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Cluster de 3×4 píxeles lleno. Área en píxeles.",
        "answer": "12",
        "hint": "3·4."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un single pixel puede ser intencional?",
        "answer": "si",
        "hint": "Puede actuar como brillo, ojo o acento."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La forma negativa entre clusters participa en la lectura?",
        "answer": "si",
        "hint": "Figura y fondo interactúan."
      }
    ]
  },
  "pixelart-silhouette": {
    "id": "pixelart-silhouette",
    "courseId": 46,
    "title": "Silueta, lectura y jerarquía visual",
    "shortTitle": "Silueta",
    "duration": 100,
    "objective": "Diseñar siluetas reconocibles antes de depender de textura, outline interno o color.",
    "summary": [
      "La silueta comprime una figura a su frontera y masas principales; es una prueba fuerte de legibilidad.",
      "Pose, proporción y separación de extremidades suelen aportar más reconocimiento que detalles interiores.",
      "La lectura depende también del tamaño final y del contraste con el fondo."
    ],
    "concept": "La silueta comprime una figura a su frontera y masas principales; es una prueba fuerte de legibilidad.",
    "rules": [
      "Prueba sprites como máscara monocroma.",
      "Evalúa a resolución final, no solo con zoom.",
      "Separa masas que deban leerse como partes distintas."
    ],
    "deep": {
      "intro": "Diseñar siluetas reconocibles antes de depender de textura, outline interno o color.",
      "sections": [
        {
          "title": "Máscara",
          "body": "Convertir el sprite a una única tinta elimina textura y obliga a comprobar si la forma se sostiene sola."
        },
        {
          "title": "Pose",
          "body": "Extremidades superpuestas pueden fundirse en una masa ilegible aunque anatómicamente sean correctas."
        },
        {
          "title": "Escala",
          "body": "Una antena de 1 px puede ser clara a 32×32 y desaparecer perceptualmente al mostrarse más pequeña."
        },
        {
          "title": "Contexto",
          "body": "La misma silueta puede perderse sobre un fondo de luminancia semejante; legibilidad es relacional."
        }
      ]
    },
    "example": {
      "problem": "Un personaje ocupa 24 px de alto y su espada sobresale 8 px.",
      "steps": [
        "Extensión total vertical potencial=24+8 si están alineados.",
        "La espada ocupa 8/32=25% de la altura total."
      ],
      "solution": "La masa externa puede dominar una cuarta parte de la silueta."
    },
    "check": {
      "question": "¿Una silueta legible garantiza que todos los detalles interiores funcionen?",
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
          "Solo en sprites grandes",
          false
        ]
      ],
      "feedback": "Es necesaria a menudo, no suficiente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Sprite 32 px, sombrero añade 4 px. Porcentaje de altura final aportado por sombrero.",
        "answer": "11.11%",
        "hint": "4/36·100."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Conviene revisar la silueta a tamaño final?",
        "answer": "si",
        "hint": "El zoom oculta problemas perceptuales."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Separar brazos del torso puede mejorar lectura aunque cambie la pose?",
        "answer": "si",
        "hint": "La claridad de masas importa."
      }
    ]
  },
  "pixelart-palettes": {
    "id": "pixelart-palettes",
    "courseId": 46,
    "title": "Paletas y restricciones cromáticas",
    "shortTitle": "Paletas",
    "duration": 100,
    "objective": "Diseñar paletas pequeñas con roles, ramps y reutilización de colores sin tratar el color como una lista de códigos hex.",
    "summary": [
      "Una paleta útil organiza relaciones de valor, temperatura y saturación; su tamaño no determina por sí solo la calidad.",
      "Color ramps pueden compartir colores entre materiales para cohesión y economía.",
      "Hue shifting es una estrategia artística, no una ley física: sombras y luces pueden desplazarse de tono según estilo y contexto."
    ],
    "concept": "Una paleta útil organiza relaciones de valor, temperatura y saturación; su tamaño no determina por sí solo la calidad.",
    "rules": [
      "Piensa en roles y relaciones antes que en nombres de color.",
      "Comprueba separación de valores además de hue.",
      "No asumas que una paleta más pequeña es automáticamente superior."
    ],
    "deep": {
      "intro": "Diseñar paletas pequeñas con roles, ramps y reutilización de colores sin tratar el color como una lista de códigos hex.",
      "sections": [
        {
          "title": "Roles",
          "body": "Un color puede servir de sombra en un material y de tono medio en otro, aumentando cohesión."
        },
        {
          "title": "Ramps",
          "body": "Una ramp ordena valores de oscuro a claro; puede variar hue y saturación en vez de cambiar solo luminancia."
        },
        {
          "title": "Restricción",
          "body": "Paletas de hardware histórico imponían límites reales; una paleta artística moderna puede imponer restricciones voluntarias."
        },
        {
          "title": "Accesibilidad",
          "body": "Contraste de luminancia y distinción cromática deben probarse en contexto; dos colores distintos en RGB pueden verse casi iguales."
        }
      ]
    },
    "example": {
      "problem": "Paleta con 16 colores, 4 reservados para UI.",
      "steps": [
        "16-4=12",
        "Quedan 12 colores para escena si la reserva es estricta."
      ],
      "solution": "12 colores disponibles."
    },
    "check": {
      "question": "¿Hue shifting significa que toda sombra debe ser azul?",
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
          "Solo en noche",
          false
        ]
      ],
      "feedback": "Es una estrategia, no una regla universal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "24 colores, 6 UI y 2 transparentes/reservados. Colores restantes.",
        "answer": "16",
        "hint": "24-6-2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Dos materiales pueden compartir un mismo color de la paleta?",
        "answer": "si",
        "hint": "La reutilización puede cohesionar."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más colores garantiza más legibilidad?",
        "answer": "no",
        "hint": "Relaciones importan más que conteo."
      }
    ]
  },
  "pixelart-color": {
    "id": "pixelart-color",
    "courseId": 46,
    "title": "Color técnico: valor, contraste y espacio lineal",
    "shortTitle": "Color",
    "duration": 100,
    "objective": "Conectar decisiones artísticas de valor/saturación con el pipeline técnico de sRGB, blending y display.",
    "summary": [
      "La lectura de valor puede fallar aunque los hue sean distintos; conviene inspeccionar luminancia percibida además del RGB crudo.",
      "Los valores sRGB almacenados están codificados de forma no lineal respecto a luz; mezclar físicamente requiere trabajar en un dominio lineal apropiado.",
      "Pixel art puede buscar deliberadamente mezclas estilizadas, pero el artista técnico debe saber cuándo el engine aplica conversiones de color."
    ],
    "concept": "La lectura de valor puede fallar aunque los hue sean distintos; conviene inspeccionar luminancia percibida además del RGB crudo.",
    "rules": [
      "Distingue valor artístico de componente RGB individual.",
      "Conoce si una textura está marcada como sRGB o datos lineales.",
      "No hagas correcciones gamma duplicadas por intuición."
    ],
    "deep": {
      "intro": "Conectar decisiones artísticas de valor/saturación con el pipeline técnico de sRGB, blending y display.",
      "sections": [
        {
          "title": "Valor",
          "body": "Un sprite puede usar hue contrastante pero valores similares; en escala de grises podría perder lectura."
        },
        {
          "title": "sRGB",
          "body": "El pipeline suele decodificar texturas de color a lineal para iluminación y volver a codificar para display."
        },
        {
          "title": "Datos",
          "body": "Normal maps, masks y algunos LUT no representan color perceptual y no deberían tratarse como sRGB por defecto."
        },
        {
          "title": "Estilo",
          "body": "Una paleta limitada puede elegir relaciones no físicas conscientemente; saber la física permite romperla con control."
        }
      ]
    },
    "example": {
      "problem": "Canal normalizado 128/255.",
      "steps": [
        "128/255≈0.502",
        "Ese código sRGB no equivale a 50.2% de radiancia lineal."
      ],
      "solution": "≈0.502 en código normalizado, no en luz lineal."
    },
    "check": {
      "question": "¿Una normal map debe tratarse automáticamente como color sRGB?",
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
          "Solo si es azul",
          false
        ]
      ],
      "feedback": "Sus canales suelen codificar datos vectoriales."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Valor byte 64 normalizado por 255, a 3 decimales.",
        "answer": "0.251",
        "hint": "64/255."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Dos colores con hue distinto pueden tener valor perceptual parecido?",
        "answer": "si",
        "hint": "Hue y luminancia no son lo mismo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Blending físico correcto suele hacerse sobre códigos sRGB directos?",
        "answer": "no",
        "hint": "Normalmente se linealiza primero."
      }
    ]
  },
  "pixelart-dithering": {
    "id": "pixelart-dithering",
    "courseId": 46,
    "title": "Dithering: patrones, gradientes y textura",
    "shortTitle": "Dithering",
    "duration": 100,
    "objective": "Usar dithering como técnica de mezcla espacial discreta y textura sin confundirlo con antialiasing.",
    "summary": [
      "Dithering alterna colores disponibles para aproximar valores o introducir textura a cierta escala espacial.",
      "Patrones ordenados como checkerboard son deterministas; error diffusion distribuye error de cuantización de forma dependiente del contenido.",
      "Dithering puede romper clusters y añadir ruido si se usa indiscriminadamente."
    ],
    "concept": "Dithering alterna colores disponibles para aproximar valores o introducir textura a cierta escala espacial.",
    "rules": [
      "Usa dithering con una finalidad: valor, textura o transición.",
      "Evalúa el patrón a tamaño final.",
      "No confundas dithering con suavizado geométrico de bordes."
    ],
    "deep": {
      "intro": "Usar dithering como técnica de mezcla espacial discreta y textura sin confundirlo con antialiasing.",
      "sections": [
        {
          "title": "Mezcla espacial",
          "body": "Un patrón 50/50 de dos colores puede percibirse como un valor intermedio a cierta distancia."
        },
        {
          "title": "Ordenado",
          "body": "Matrices/tiles de umbral producen patrones regulares fáciles de controlar."
        },
        {
          "title": "Error diffusion",
          "body": "Algoritmos como Floyd-Steinberg reparten error a vecinos y generan textura irregular."
        },
        {
          "title": "Estética",
          "body": "En pixel art manual, el patrón puede formar parte del lenguaje visual y no buscar una mezcla óptica perfecta."
        }
      ]
    },
    "example": {
      "problem": "Tile 4×4 con 8 píxeles A y 8 B.",
      "steps": [
        "16 celdas totales",
        "8/16=0.5"
      ],
      "solution": "Cobertura 50% de cada color."
    },
    "check": {
      "question": "¿Dithering y antialiasing manual resuelven exactamente el mismo problema?",
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
          "Siempre en 1-bit",
          false
        ]
      ],
      "feedback": "Dithering aproxima tonos/texturas; AA trata transición de borde."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Patrón 8×8 con 16 píxeles claros. Cobertura clara.",
        "answer": "25%",
        "hint": "16/64·100."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Checkerboard 50/50 siempre se percibe como mezcla homogénea a cualquier zoom?",
        "answer": "no",
        "hint": "A 1×/zoom alto se ve el patrón."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Dithering puede empeorar clusters?",
        "answer": "si",
        "hint": "Introduce alta frecuencia espacial."
      }
    ]
  },
  "pixelart-manual-aa": {
    "id": "pixelart-manual-aa",
    "courseId": 46,
    "title": "Antialiasing manual y control de bordes",
    "shortTitle": "AA manual",
    "duration": 100,
    "objective": "Suavizar bordes seleccionados con píxeles de transición sin borrar la naturaleza discreta del sprite.",
    "summary": [
      "El antialiasing manual coloca colores intermedios en bordes concretos para reducir escalones perceptuales.",
      "AA interno y externo tienen implicaciones distintas: el externo mezcla conceptualmente con el fondo y puede crear halos si el fondo cambia.",
      "En pixel art el objetivo no es eliminar toda escalera, sino controlar el ritmo del borde."
    ],
    "concept": "El antialiasing manual coloca colores intermedios en bordes concretos para reducir escalones perceptuales.",
    "rules": [
      "Aplica AA solo donde mejora la lectura a tamaño final.",
      "Evita colores de AA externos ligados a un fondo desconocido.",
      "Mantén coherencia con la paleta y los clusters."
    ],
    "deep": {
      "intro": "Suavizar bordes seleccionados con píxeles de transición sin borrar la naturaleza discreta del sprite.",
      "sections": [
        {
          "title": "Cobertura",
          "body": "Un píxel de transición imita cobertura parcial o una transición perceptual, pero sigue siendo una celda entera."
        },
        {
          "title": "Interno",
          "body": "Internal AA usa tonos de la propia forma cerca del borde y suele ser más robusto a fondos variables."
        },
        {
          "title": "Externo",
          "body": "External AA puede contaminar el contorno con color del fondo esperado y generar fringe en otro fondo."
        },
        {
          "title": "Escalones",
          "body": "Un borde nítido puede ser estilísticamente correcto; AA no es una puntuación que deba maximizarse."
        }
      ]
    },
    "example": {
      "problem": "Borde diagonal de 8 pasos; se suavizan 3 esquinas con color intermedio.",
      "steps": [
        "3 de 8 posiciones reciben transición.",
        "Cobertura de intervención=37.5% de los pasos."
      ],
      "solution": "3/8=37.5% de posiciones tratadas."
    },
    "check": {
      "question": "¿Más píxeles de AA implican siempre un borde mejor?",
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
          "Solo con alpha",
          false
        ]
      ],
      "feedback": "Puede emborronar la forma y romper clusters."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "12 esquinas candidatas, AA en 3. Porcentaje.",
        "answer": "25%",
        "hint": "3/12·100."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿AA externo puede producir halo sobre otro fondo?",
        "answer": "si",
        "hint": "Puede incorporar el color del fondo original."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Pixel art debe eliminar toda escalera visible?",
        "answer": "no",
        "hint": "Los escalones forman parte del medio discreto."
      }
    ]
  },
  "pixelart-subpixel-animation": {
    "id": "pixelart-subpixel-animation",
    "courseId": 46,
    "title": "Subpixel animation y movimiento aparente",
    "shortTitle": "Subpixel animation",
    "duration": 100,
    "objective": "Simular desplazamientos menores que un píxel lógico mediante cambios de forma y distribución de cobertura, sin afirmar que existe media celda real.",
    "summary": [
      "En una rejilla lógica no existe una posición geométrica de media celda para un píxel dibujado; el efecto subpixel se simula cambiando patrones entre frames.",
      "Alternar clusters puede producir movimiento aparente más suave sin aumentar la resolución lógica.",
      "El método debe equilibrar suavidad, flicker y estabilidad de la silueta."
    ],
    "concept": "En una rejilla lógica no existe una posición geométrica de media celda para un píxel dibujado; el efecto subpixel se simula cambiando patrones entre frames.",
    "rules": [
      "Distingue subpixel visual de coordenada física subpixel del renderer.",
      "Mantén masa aparente consistente entre frames.",
      "Prueba animaciones en tiempo real y a 1×."
    ],
    "deep": {
      "intro": "Simular desplazamientos menores que un píxel lógico mediante cambios de forma y distribución de cobertura, sin afirmar que existe media celda real.",
      "sections": [
        {
          "title": "Apariencia",
          "body": "Un highlight puede alternar entre dos patrones para sugerir una traslación de 0.5 px aunque cada frame use enteros."
        },
        {
          "title": "Masa",
          "body": "Si el número o distribución de píxeles cambia demasiado, el objeto parece pulsar en vez de moverse."
        },
        {
          "title": "Temporal",
          "body": "El ojo integra secuencias; una forma que aislada parece irregular puede funcionar en movimiento."
        },
        {
          "title": "Renderer",
          "body": "Un sprite completo puede moverse en coordenadas subpixel del engine, pero si buscas pixel-perfect quizá la cámara/transform requiera snapping."
        }
      ]
    },
    "example": {
      "problem": "Movimiento deseado 1 px cada 2 frames.",
      "steps": [
        "Promedio temporal=0.5 px/frame",
        "Cada frame puede alternar dos patrones/posiciones enteras."
      ],
      "solution": "0.5 px/frame aparente."
    },
    "check": {
      "question": "¿Subpixel animation exige dibujar medio píxel físico dentro de la textura?",
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
      "feedback": "Se simula temporal/espacialmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un objeto avanza 3 px en 6 frames. Promedio px/frame.",
        "answer": "0.5",
        "hint": "3/6."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cambiar demasiado el área del cluster puede causar pulsación?",
        "answer": "si",
        "hint": "La masa visual cambia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Subpixel visual y transform subpixel del motor son lo mismo?",
        "answer": "no",
        "hint": "Uno es técnica artística, otro coordenadas/render."
      }
    ]
  },
  "pixelart-tilesets": {
    "id": "pixelart-tilesets",
    "courseId": 46,
    "title": "Tilesets, seams y construcción modular",
    "shortTitle": "Tilesets",
    "duration": 100,
    "objective": "Diseñar tiles reutilizables que conecten sin seams y soporten variantes, autotiling y restricciones de memoria/dibujo.",
    "summary": [
      "Un tileset divide escenarios en unidades reutilizables; sus bordes deben obedecer reglas de conectividad si se repiten o combinan.",
      "Repetición visible puede reducirse con variantes, overlays y reglas de selección, no solo aumentando el tile.",
      "Autotiling transforma relaciones de vecinos en elecciones de tile, por lo que la codificación de casos debe ser explícita."
    ],
    "concept": "Un tileset divide escenarios en unidades reutilizables; sus bordes deben obedecer reglas de conectividad si se repiten o combinan.",
    "rules": [
      "Prueba los tiles en mosaico, no aislados.",
      "Diseña reglas de borde antes de producir variantes masivas.",
      "Distingue tile lógico, atlas y chunk de mundo."
    ],
    "deep": {
      "intro": "Diseñar tiles reutilizables que conecten sin seams y soporten variantes, autotiling y restricciones de memoria/dibujo.",
      "sections": [
        {
          "title": "Seams",
          "body": "Un borde derecho que no continúa el izquierdo correspondiente produce una costura al repetir."
        },
        {
          "title": "Variantes",
          "body": "Variantes visuales deben conservar compatibilidad geométrica si ocupan el mismo caso lógico."
        },
        {
          "title": "Autotiling",
          "body": "Bits de vecinos N/E/S/W pueden formar una máscara de conectividad; no todas las 16 combinaciones necesitan arte distinto según simetrías/reglas."
        },
        {
          "title": "Atlas",
          "body": "Empaquetar tiles en atlas reduce cambios de recurso, pero padding/extrusion puede ser necesario para evitar bleeding con filtrado."
        }
      ]
    },
    "example": {
      "problem": "Máscara de 4 vecinos binarios.",
      "steps": [
        "2^4=16",
        "Hay 16 patrones teóricos antes de reducir por reglas/simetrías."
      ],
      "solution": "16 combinaciones teóricas."
    },
    "check": {
      "question": "¿Un tile que se ve bien aislado garantiza ausencia de seams al repetirse?",
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
          "Solo si es cuadrado",
          false
        ]
      ],
      "feedback": "Debe probarse en contexto de vecinos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Autotile con 8 vecinos booleanos: combinaciones teóricas.",
        "answer": "256",
        "hint": "2^8."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Variantes de un mismo caso deberían conservar conectividad?",
        "answer": "si",
        "hint": "Cambian apariencia, no semántica del borde."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Padding de atlas puede ayudar contra bleeding?",
        "answer": "si",
        "hint": "Evita samplear texels vecinos."
      }
    ]
  },
  "pixelart-sprites": {
    "id": "pixelart-sprites",
    "courseId": 46,
    "title": "Sprites, atlases y pivotes",
    "shortTitle": "Sprites",
    "duration": 100,
    "objective": "Preparar sprites con pivotes, bounds, atlases y metadatos coherentes para integrarlos en un engine sin perder intención artística.",
    "summary": [
      "Un sprite combina imagen con metadatos: región, pivot/origin, tamaño lógico y a menudo colisión o sockets asociados.",
      "Atlas packing ahorra cambios de textura pero puede introducir bleeding y problemas de padding si el filtering no se controla.",
      "Pivot consistente evita que animaciones parezcan vibrar aunque cada frame individual sea correcto."
    ],
    "concept": "Un sprite combina imagen con metadatos: región, pivot/origin, tamaño lógico y a menudo colisión o sockets asociados.",
    "rules": [
      "Define pivots por función, no por centro automático.",
      "Añade padding/extrusion si el sampling del atlas puede tocar vecinos.",
      "Separa bounds visuales de collision shapes cuando sea necesario."
    ],
    "deep": {
      "intro": "Preparar sprites con pivotes, bounds, atlases y metadatos coherentes para integrarlos en un engine sin perder intención artística.",
      "sections": [
        {
          "title": "Pivot",
          "body": "Feet pivot para personajes puede estabilizar contacto con suelo aunque los frames tengan tamaños de bounding box distintos."
        },
        {
          "title": "Atlas",
          "body": "Regiones compactas reducen desperdicio, pero mipmaps/bilinear pueden mezclar texels de sprites adyacentes."
        },
        {
          "title": "Trim",
          "body": "Recortar transparencias cambia offsets; el importer debe conservar el origen lógico."
        },
        {
          "title": "Metadata",
          "body": "Sockets, hitboxes y eventos pueden pertenecer al frame/clip, no deben inferirse de píxeles a runtime."
        }
      ]
    },
    "example": {
      "problem": "Atlas 1024×1024 con sprites 64×64 sin padding.",
      "steps": [
        "1024/64=16 por eje",
        "16·16=256 sprites teóricos."
      ],
      "solution": "256 regiones teóricas."
    },
    "check": {
      "question": "¿Recortar transparencia sin conservar offsets puede cambiar la posición aparente de una animación?",
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
          "Solo con rotación",
          false
        ]
      ],
      "feedback": "El origen lógico puede desplazarse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Atlas 512×512 con tiles 32×32. Capacidad teórica sin padding.",
        "answer": "256",
        "hint": "16×16."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Pivot y centro geométrico deben ser siempre iguales?",
        "answer": "no",
        "hint": "Depende de función."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Bilinear en atlas sin padding puede causar bleeding?",
        "answer": "si",
        "hint": "Puede samplear regiones vecinas."
      }
    ]
  },
  "pixelart-animation": {
    "id": "pixelart-animation",
    "courseId": 46,
    "title": "Animación pixel art: timing, spacing y conservación de masa",
    "shortTitle": "Animación pixel art",
    "duration": 100,
    "objective": "Construir animaciones legibles con poses clave, timing, spacing, arcs y smears dentro de una rejilla discreta.",
    "summary": [
      "En pixel art pocos frames pueden comunicar mucho si las poses clave y el timing están bien elegidos.",
      "Spacing describe cuánto cambia la posición entre frames; timing define cuándo ocurren esos cambios.",
      "Smears y deformaciones pueden romper geometría física deliberadamente para mejorar lectura temporal."
    ],
    "concept": "En pixel art pocos frames pueden comunicar mucho si las poses clave y el timing están bien elegidos.",
    "rules": [
      "Diseña primero poses clave y siluetas.",
      "Evalúa loop y ritmo, no solo frames individuales.",
      "Usa smears como herramienta temporal, no como error anatómico accidental."
    ],
    "deep": {
      "intro": "Construir animaciones legibles con poses clave, timing, spacing, arcs y smears dentro de una rejilla discreta.",
      "sections": [
        {
          "title": "Timing",
          "body": "Un hold de 4 frames y un impacto de 1 frame transmiten pesos distintos aunque la trayectoria sea igual."
        },
        {
          "title": "Spacing",
          "body": "Espaciado creciente sugiere aceleración; decreciente, desaceleración."
        },
        {
          "title": "Arcos",
          "body": "Extremidades suelen seguir trayectorias curvas; cuantizarlas exige controlar escalones frame a frame."
        },
        {
          "title": "Loop",
          "body": "Primero y último frame deben conectarse temporalmente sin duplicar un frame de hold si no se desea pausa."
        }
      ]
    },
    "example": {
      "problem": "Animación 8 frames a 12 fps.",
      "steps": [
        "8/12=0.6667 s por ciclo",
        "Frecuencia de loop≈1.5 ciclos/s."
      ],
      "solution": "≈0.667 s por ciclo."
    },
    "check": {
      "question": "¿Más frames garantizan una animación mejor?",
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
          "Solo a 60 fps",
          false
        ]
      ],
      "feedback": "Timing y poses pesan más que el conteo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "6 frames a 10 fps. Duración s.",
        "answer": "0.6",
        "hint": "6/10."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Spacing y timing son el mismo concepto?",
        "answer": "no",
        "hint": "Relacionados, pero distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un smear puede deformar deliberadamente la forma?",
        "answer": "si",
        "hint": "Comunica movimiento rápido."
      }
    ]
  },
  "pixelart-pixel-perfect": {
    "id": "pixelart-pixel-perfect",
    "courseId": 46,
    "title": "Pixel-perfect rendering en motores modernos",
    "shortTitle": "Pixel-perfect rendering",
    "duration": 100,
    "objective": "Configurar cámara, transforms, filtering y escalado para preservar una rejilla visual sin confundir estabilidad de sprites con movimiento de mundo.",
    "summary": [
      "Pixel-perfect requiere una política coherente de resolución lógica, escalado, sampling y snapping; nearest filter por sí solo no basta.",
      "Cámara subpixel, sprites rotados o escalas no enteras pueden producir tamaños de texel desiguales y shimmering.",
      "Snapping absoluto puede introducir judder en cámara; a veces se separa posición lógica, render position y upscale final."
    ],
    "concept": "Pixel-perfect requiere una política coherente de resolución lógica, escalado, sampling y snapping; nearest filter por sí solo no basta.",
    "rules": [
      "Define quién se ajusta a la rejilla: cámara, sprites, o composición final.",
      "Usa nearest cuando quieres texels duros, pero recuerda que no arregla transforms fraccionales.",
      "Prueba múltiples resoluciones/aspect ratios soportados."
    ],
    "deep": {
      "intro": "Configurar cámara, transforms, filtering y escalado para preservar una rejilla visual sin confundir estabilidad de sprites con movimiento de mundo.",
      "sections": [
        {
          "title": "Nearest",
          "body": "Nearest selecciona un texel, pero un quad transformado a escala 2.3× seguirá distribuyendo cobertura de manera irregular."
        },
        {
          "title": "Integer scaling",
          "body": "Una imagen 320×180 encaja exactamente 6× en 1920×1080; en 1366×768 no existe el mismo factor entero lleno."
        },
        {
          "title": "Camera",
          "body": "Redondear cámara cada frame puede generar saltos. Algunos pipelines renderizan a low-res offscreen y escalan el resultado."
        },
        {
          "title": "Rotación",
          "body": "Rotar pixel art arbitrariamente rompe la alineación con la rejilla; puede ser aceptable estilísticamente, pero deja de preservar clusters exactos."
        }
      ]
    },
    "example": {
      "problem": "Resolución lógica 256×144 y salida 1280×720.",
      "steps": [
        "1280/256=5",
        "720/144=5"
      ],
      "solution": "Escala entera 5×."
    },
    "check": {
      "question": "¿Nearest-neighbor garantiza por sí solo pixel-perfect con escala 2.5×?",
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
          "Solo en Godot",
          false
        ]
      ],
      "feedback": "La geometría sigue sin mapear uniformemente a la rejilla física."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "320×180 a 1600×900. Escala.",
        "answer": "5",
        "hint": "1600/320."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Rotación arbitraria preserva los mismos clusters de texels?",
        "answer": "no",
        "hint": "La rejilla cambia respecto a la imagen."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Render low-res y upscale entero puede estabilizar el look?",
        "answer": "si",
        "hint": "Es una estrategia común."
      }
    ]
  },
  "pixelart-procedural": {
    "id": "pixelart-procedural",
    "courseId": 46,
    "title": "Pixel art procedural: reglas, ruido y reproducibilidad",
    "shortTitle": "Pixel art procedural",
    "duration": 100,
    "objective": "Generar sprites, tiles y texturas mediante reglas discretas preservando estilo, conectividad y reproducibilidad.",
    "summary": [
      "Generación procedural útil combina parámetros y restricciones; ruido aleatorio sin estructura rara vez produce una dirección artística coherente.",
      "Seeds permiten reproducir resultados solo si el algoritmo y el orden de consumo aleatorio son estables.",
      "Reglas de simetría, conectividad, paleta y clusters pueden reducir drásticamente el espacio de resultados inválidos."
    ],
    "concept": "Generación procedural útil combina parámetros y restricciones; ruido aleatorio sin estructura rara vez produce una dirección artística coherente.",
    "rules": [
      "Genera dentro de restricciones visuales explícitas.",
      "Guarda seed y versión del generador para reproducibilidad.",
      "Valida conectividad y silueta después de generar, no solo estadísticas de color."
    ],
    "deep": {
      "intro": "Generar sprites, tiles y texturas mediante reglas discretas preservando estilo, conectividad y reproducibilidad.",
      "sections": [
        {
          "title": "Seed",
          "body": "Misma seed con mismo generador y misma secuencia de llamadas reproduce la secuencia; cambiar código puede cambiar el resultado."
        },
        {
          "title": "Gramática visual",
          "body": "Una nave puede construirse con cuerpo, alas y luces bajo reglas de simetría y paleta."
        },
        {
          "title": "Ruido",
          "body": "Perlin/value/noise puede alimentar patrones, pero debe cuantizarse y organizarse para encajar en clusters."
        },
        {
          "title": "Validación",
          "body": "Un autotile procedural puede comprobar que sus bordes codificados coincidan antes de aceptar el asset."
        }
      ]
    },
    "example": {
      "problem": "Generador elige 4 cuerpos, 3 alas y 5 paletas independientemente.",
      "steps": [
        "4·3·5=60"
      ],
      "solution": "60 combinaciones antes de restricciones."
    },
    "check": {
      "question": "¿Misma seed garantiza el mismo sprite si cambia el algoritmo?",
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
          "Siempre con PRNG",
          false
        ]
      ],
      "feedback": "La transformación de números aleatorios también forma parte del resultado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "8 cuerpos, 4 alas, 3 detalles. Combinaciones.",
        "answer": "96",
        "hint": "8·4·3."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Random puro garantiza estilo coherente?",
        "answer": "no",
        "hint": "Faltan restricciones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene guardar versión del generador junto a seed?",
        "answer": "si",
        "hint": "El algoritmo puede evolucionar."
      }
    ]
  },
  "pixelart-pipeline": {
    "id": "pixelart-pipeline",
    "courseId": 46,
    "title": "Pipeline de arte técnico: importación, QA y exportación",
    "shortTitle": "Pipeline e integración",
    "duration": 120,
    "objective": "Diseñar un flujo reproducible desde el archivo fuente hasta el runtime, con validación automática de paleta, pivotes, scaling y compresión.",
    "summary": [
      "El arte técnico convierte reglas visuales en contratos verificables de importación/exportación.",
      "Un pipeline puede validar dimensiones, paleta, transparencia, naming, pivots, atlas padding y configuración de filtering.",
      "Compresión, mipmaps y color-space deben decidirse por tipo de asset; una configuración global puede destruir pixel art o datos técnicos."
    ],
    "concept": "El arte técnico convierte reglas visuales en contratos verificables de importación/exportación.",
    "rules": [
      "Automatiza reglas repetibles y deja la decisión artística a revisión humana.",
      "Versiona fuente, exporter e import settings.",
      "Prueba el asset final dentro del engine y en la resolución real de destino."
    ],
    "deep": {
      "intro": "Diseñar un flujo reproducible desde el archivo fuente hasta el runtime, con validación automática de paleta, pivotes, scaling y compresión.",
      "sections": [
        {
          "title": "Validación",
          "body": "Un script puede rechazar sprites con colores fuera de paleta o dimensiones incompatibles con el grid."
        },
        {
          "title": "Import",
          "body": "Filtros, mipmaps y compresión deben configurarse según uso; pixel art UI y normal maps necesitan políticas distintas."
        },
        {
          "title": "Atlases",
          "body": "Packing debe preservar pivot/offset y añadir padding suficiente cuando el sampler lo requiera."
        },
        {
          "title": "QA",
          "body": "Golden screenshots, overlays de grid y test scenes detectan seams, bleeding, jitter y errores de color."
        }
      ]
    },
    "example": {
      "problem": "Pipeline procesa 240 sprites; 18 fallan validación.",
      "steps": [
        "240-18=222",
        "222/240=92.5% pasan."
      ],
      "solution": "222 válidos; 92.5% de aprobación inicial."
    },
    "check": {
      "question": "¿Una única configuración de importación es ideal para color sprites, normal maps y UI pixel-perfect?",
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
          "Solo en PNG",
          false
        ]
      ],
      "feedback": "Representan datos y usos distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "500 assets, 35 fallan. Tasa de aprobación.",
        "answer": "93%",
        "hint": "465/500·100."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Los pivots deberían sobrevivir al atlas packing?",
        "answer": "si",
        "hint": "Son metadatos semánticos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿QA visual final puede detectar problemas que un validador de dimensiones no ve?",
        "answer": "si",
        "hint": "Seams/jitter/color son contextuales."
      }
    ]
  }
});
