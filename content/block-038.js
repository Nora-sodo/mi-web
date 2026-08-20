/**
 * BLOQUE 038 — Motor gráfico
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar jerarquía espacial, ownership, visibilidad,
 * scheduling y ejecución GPU. Menos draw calls o más abstracción no son
 * objetivos absolutos: se optimiza el frame medido bajo contratos explícitos.
 */
window.LEARNING_PATHS[38] = {
  "level": "Experto progresivo",
  "estimatedHours": 126,
  "description": "Arquitectura de un renderer: escena, recursos, materiales, visibilidad, LOD, batching, instancing, render graph y frame completo.",
  "outcomes": [
    "Diseñar scene/resource/material systems con lifetimes explícitos.",
    "Construir visibilidad, LOD y agrupación guiados por coste medido.",
    "Representar dependencias de render con un graph y recursos transitorios.",
    "Integrar un motor gráfico pequeño con profiling, tests y documentación de trade-offs."
  ],
  "modules": [
    {
      "id": "m1-architecture",
      "title": "Escena y recursos",
      "description": "Scene graph, resources, materials y meshes",
      "lessons": [
        "engine-scene-graph",
        "engine-resource-management",
        "engine-material-system",
        "engine-mesh-system"
      ]
    },
    {
      "id": "m2-view-light",
      "title": "Cámara, luz y visibilidad",
      "description": "Cameras, lighting, culling y LOD",
      "lessons": [
        "engine-camera-system",
        "engine-lighting-system",
        "engine-visibility-culling",
        "engine-lod"
      ]
    },
    {
      "id": "m3-submit",
      "title": "Agrupación y scheduling",
      "description": "Batching, instancing y render graph",
      "lessons": [
        "engine-batching",
        "engine-instancing",
        "engine-render-graph"
      ]
    },
    {
      "id": "m4-frame",
      "title": "Frame y proyecto",
      "description": "Post-processing, frame architecture y renderer propio",
      "lessons": [
        "engine-post-processing",
        "engine-frame-architecture",
        "engine-renderer-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "engine-scene-graph": {
    "id": "engine-scene-graph",
    "courseId": 38,
    "title": "Scene graph: jerarquía espacial sin confundirla con ownership",
    "shortTitle": "Scene graph: jerarquía espacial sin confundirla con ownership",
    "duration": 110,
    "objective": "Modelar jerarquías de transformaciones y escenas separando parentesco espacial, identidad de entidad y lifetime de recursos.",
    "summary": [
      "Un scene graph organiza relaciones espaciales/jerárquicas; no tiene por qué ser el sistema universal de ownership del motor.",
      "Las world transforms se obtienen componiendo transformaciones locales a lo largo de la jerarquía y requieren una política de actualización/invalidation.",
      "Árbol de escena, ECS, recursos y render graph resuelven problemas distintos y pueden coexistir."
    ],
    "concept": "Un scene graph organiza relaciones espaciales/jerárquicas; no tiene por qué ser el sistema universal de ownership del motor.",
    "rules": [
      "No hagas que parent-child implique automáticamente ownership de memoria.",
      "Evita recomputar toda la jerarquía si puedes propagar dirty flags con una política clara.",
      "Distingue scene graph lógico de estructuras especializadas de visibilidad/render."
    ],
    "deep": {
      "intro": "Modelar jerarquías de transformaciones y escenas separando parentesco espacial, identidad de entidad y lifetime de recursos.",
      "sections": [
        {
          "title": "Jerarquía",
          "body": "Local transform expresa un nodo respecto a su parent; world transform compone ancestors. Reparenting cambia la ruta espacial y puede requerir preservar world transform."
        },
        {
          "title": "Ownership",
          "body": "Un mesh/material puede compartirse entre muchos nodos. Si destruir un nodo destruyera siempre el recurso, compartir assets sería frágil."
        },
        {
          "title": "Actualización",
          "body": "Dirty flags, generaciones o versiones permiten invalidar descendientes cuando cambia un ancestor."
        },
        {
          "title": "Arquitectura",
          "body": "Un ECS puede almacenar identidad/componentes mientras una jerarquía separada expresa parent-child. No son modelos mutuamente excluyentes."
        }
      ]
    },
    "example": {
      "problem": "Root tiene escala 2; child tiene traslación local x=3. Ignorando rotación, ¿posición world x del origen del child?",
      "steps": [
        "La traslación local se aplica en el espacio escalado del parent.",
        "3 unidades locales pasan a 6 world.",
        "El origen del child queda en x=6."
      ],
      "solution": "x=6 bajo esa convención de composición."
    },
    "check": {
      "question": "¿Scene graph y ownership de recursos deben ser necesariamente la misma jerarquía?",
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
          "Solo con Vulkan",
          false
        ]
      ],
      "feedback": "Árbol de escena, ECS, recursos y render graph resuelven problemas distintos y pueden coexistir."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Transform local está expresada respecto a quién?",
        "answer": "parent",
        "hint": "Es relativa al nodo padre."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Reparenting puede cambiar la world transform si no la compensas?",
        "answer": "si",
        "hint": "Cambia la cadena de composición."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿ECS y scene graph pueden coexistir?",
        "answer": "si",
        "hint": "Resuelven preocupaciones distintas."
      }
    ]
  },
  "engine-resource-management": {
    "id": "engine-resource-management",
    "courseId": 38,
    "title": "Resource management: handles, lifetimes y carga asíncrona",
    "shortTitle": "Resource management: handles, lifetimes y carga asíncrona",
    "duration": 110,
    "objective": "Diseñar un sistema de recursos que permita compartir assets, cargar/descargar de forma segura y separar identidad lógica de objetos GPU concretos.",
    "summary": [
      "Resource management coordina identidad, lifetime, sharing y residencia; un puntero crudo no expresa todas esas políticas.",
      "Handles con generación pueden detectar referencias obsoletas y desacoplar usuarios de relocations/reloads internos.",
      "CPU asset, upload staging y GPU resource tienen lifetimes relacionados pero no idénticos."
    ],
    "concept": "Resource management coordina identidad, lifetime, sharing y residencia; un puntero crudo no expresa todas esas políticas.",
    "rules": [
      "No destruyas un recurso GPU hasta que el último submission que lo usa haya completado.",
      "Distingue asset lógico de instancia/residencia GPU y de descriptor/binding temporal.",
      "Hot reload debe preservar contratos o invalidar dependencias de forma explícita."
    ],
    "deep": {
      "intro": "Diseñar un sistema de recursos que permita compartir assets, cargar/descargar de forma segura y separar identidad lógica de objetos GPU concretos.",
      "sections": [
        {
          "title": "Identidad",
          "body": "IDs/paths/hashes localizan assets; handles internos pueden apuntar a slots versionados."
        },
        {
          "title": "Lifetime GPU",
          "body": "La CPU puede dejar de necesitar staging mientras la GPU sigue usando la imagen/buffer final; completion fences/timeline values gobiernan reciclaje."
        },
        {
          "title": "Streaming",
          "body": "Carga asíncrona necesita estados como requested, CPU-ready, uploading, resident y failed, sin bloquear el frame entero."
        },
        {
          "title": "Presupuesto",
          "body": "LRU o prioridades ayudan a eviction, pero solo si el recurso no está in-flight y puede reconstruirse/releerse."
        }
      ]
    },
    "example": {
      "problem": "Un handle codifica index=42,generation=7; el slot 42 ahora tiene generation=8. ¿Debe aceptarse el handle viejo?",
      "steps": [
        "Compara generaciones.",
        "7 != 8.",
        "El handle es stale y debe rechazarse."
      ],
      "solution": "Debe rechazarse; apunta a una encarnación anterior del slot."
    },
    "check": {
      "question": "¿Que la CPU haya soltado una referencia implica que la GPU ya terminó de usar el recurso?",
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
          "Solo si es textura",
          false
        ]
      ],
      "feedback": "CPU asset, upload staging y GPU resource tienen lifetimes relacionados pero no idénticos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Qué detecta una generation en un handle?",
        "answer": "referencia obsoleta",
        "hint": "Un slot pudo reutilizarse."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Hot reload necesita manejar dependencias?",
        "answer": "si",
        "hint": "Shaders/materiales/pipelines pueden depender entre sí."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Submission retornado significa recurso destruible?",
        "answer": "no",
        "hint": "Submission no equivale a completion."
      }
    ]
  },
  "engine-material-system": {
    "id": "engine-material-system",
    "courseId": 38,
    "title": "Material system: datos, shader variants y contratos",
    "shortTitle": "Material system: datos, shader variants y contratos",
    "duration": 110,
    "objective": "Diseñar materiales como combinación de parámetros, recursos y pipeline/shader compatible sin explotar el número de variantes.",
    "summary": [
      "Un material es un contrato de shading + parámetros/recursos; no es simplemente una textura o un shader aislado.",
      "Keywords/defines pueden crear combinaciones exponenciales, por lo que las variantes deben presupuestarse y medirse.",
      "Material instance y material template permiten compartir pipeline/layout y variar datos por objeto."
    ],
    "concept": "Un material es un contrato de shading + parámetros/recursos; no es simplemente una textura o un shader aislado.",
    "rules": [
      "No recompiles pipelines por cada cambio de un parámetro dinámico.",
      "Separa propiedades que cambian código/pipeline de valores que pueden vivir en buffers/descriptors.",
      "Valida compatibilidad entre shader reflection, layouts y datos serializados."
    ],
    "deep": {
      "intro": "Diseñar materiales como combinación de parámetros, recursos y pipeline/shader compatible sin explotar el número de variantes.",
      "sections": [
        {
          "title": "Template vs instance",
          "body": "Template fija modelo/shaders/layout; instances cambian baseColor, roughness, texturas u otros parámetros."
        },
        {
          "title": "Variants",
          "body": "n flags booleanos pueden producir hasta 2^n combinaciones teóricas; muchas deben colapsarse en branches/datos o limitarse."
        },
        {
          "title": "Binding",
          "body": "Un sistema de materiales traduce parámetros de alto nivel a UBO/SSBO/descriptors/push constants según backend."
        },
        {
          "title": "Reload",
          "body": "Shader reload puede cambiar layout; el motor necesita migrar o invalidar materiales incompatibles."
        }
      ]
    },
    "example": {
      "problem": "Un sistema tiene 8 keywords booleanas independientes. ¿Máximo teórico de combinaciones?",
      "steps": [
        "Cada flag tiene dos estados.",
        "2^8=256.",
        "No implica que debas compilar las 256."
      ],
      "solution": "256 combinaciones teóricas."
    },
    "check": {
      "question": "¿Cambiar roughness de 0.4 a 0.5 debería obligar por definición a crear un pipeline distinto?",
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
          "Solo en PBR",
          false
        ]
      ],
      "feedback": "Material instance y material template permiten compartir pipeline/layout y variar datos por objeto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un material es solo un shader?",
        "answer": "no",
        "hint": "Incluye contrato y datos/recursos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "6 flags booleanos dan máximo cuántas variantes?",
        "answer": "64",
        "hint": "2^6."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Reflection puede ayudar a validar bindings?",
        "answer": "si",
        "hint": "Expone interfaces del shader."
      }
    ]
  },
  "engine-mesh-system": {
    "id": "engine-mesh-system",
    "courseId": 38,
    "title": "Meshes: geometría, layouts y submeshes",
    "shortTitle": "Meshes: geometría, layouts y submeshes",
    "duration": 110,
    "objective": "Representar geometría de render separando topología, atributos, buffers, submeshes y bounds para minimizar duplicación y errores de layout.",
    "summary": [
      "Un mesh agrupa geometría y metadata de dibujo; no tiene por qué corresponder a una entidad ni a un único material.",
      "Indexed drawing reutiliza vértices cuando varios triángulos comparten atributos compatibles, pero seams pueden obligar a duplicar vertices lógicos.",
      "Bounds de objeto son datos derivados clave para culling, LOD y streaming."
    ],
    "concept": "Un mesh agrupa geometría y metadata de dibujo; no tiene por qué corresponder a una entidad ni a un único material.",
    "rules": [
      "No confundas posición geométrica única con vertex record único cuando UV/normal/tangent difieren.",
      "Mantén explícito el vertex layout y su compatibilidad con shader input.",
      "Recalcula o invalida bounds cuando la geometría deformable los supera."
    ],
    "deep": {
      "intro": "Representar geometría de render separando topología, atributos, buffers, submeshes y bounds para minimizar duplicación y errores de layout.",
      "sections": [
        {
          "title": "Buffers",
          "body": "Vertex/index buffers contienen representación GPU; mesh asset añade layout, ranges, topology y bounds."
        },
        {
          "title": "Submeshes",
          "body": "Un asset puede tener ranges distintos por material sin duplicar todo el vertex buffer."
        },
        {
          "title": "Seams",
          "body": "Una esquina puede necesitar múltiples vertex records si cambia UV, normal o tangent por cara."
        },
        {
          "title": "Bounds",
          "body": "AABB/sphere pueden almacenarse en object space y transformarse/expandirse conservadoramente para visibilidad."
        }
      ]
    },
    "example": {
      "problem": "Un quad usa 4 posiciones compartidas y dos triángulos con índices. ¿Cuántos índices hay normalmente?",
      "steps": [
        "Dos triángulos.",
        "Cada uno usa 3 índices.",
        "Total 6."
      ],
      "solution": "6 índices."
    },
    "check": {
      "question": "¿Una posición 3D única garantiza un único vertex record?",
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
          "Solo si hay índices",
          false
        ]
      ],
      "feedback": "Bounds de objeto son datos derivados clave para culling, LOD y streaming."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Qué reutiliza indexed drawing?",
        "answer": "vertices",
        "hint": "Los índices referencian vertex records."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dos triángulos usan cuántos índices?",
        "answer": "6",
        "hint": "3 por triángulo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿UV seams pueden duplicar vertex records?",
        "answer": "si",
        "hint": "Los atributos completos difieren."
      }
    ]
  },
  "engine-camera-system": {
    "id": "engine-camera-system",
    "courseId": 38,
    "title": "Camera system: vistas, proyección y temporalidad",
    "shortTitle": "Camera system: vistas, proyección y temporalidad",
    "duration": 110,
    "objective": "Diseñar cámaras como productores de view/projection y metadata de exposición/jitter, separando pose, render target y estado temporal.",
    "summary": [
      "Una cámara de motor combina pose, proyección, viewport/target y a menudo parámetros temporales; no es solo una matriz view.",
      "Jitter para TAA modifica la proyección por frame y exige conservar matrices previas para reproyección.",
      "Culling debe usar un frustum coherente con la cámara/render pass, pero algunas técnicas amplían o desacoplan ese volumen."
    ],
    "concept": "Una cámara de motor combina pose, proyección, viewport/target y a menudo parámetros temporales; no es solo una matriz view.",
    "rules": [
      "No sobrescribas la matriz previa antes de calcular motion vectors/reprojection.",
      "Separa parámetros físicos/artist-friendly de la matriz final derivada.",
      "Declara si jitter afecta culling o solo raster, porque bordes del frustum pueden parpadear."
    ],
    "deep": {
      "intro": "Diseñar cámaras como productores de view/projection y metadata de exposición/jitter, separando pose, render target y estado temporal.",
      "sections": [
        {
          "title": "Estado derivado",
          "body": "Pose + lens/projection params generan view/projection; caches deben invalidarse al cambiar inputs."
        },
        {
          "title": "Temporal",
          "body": "TAA, motion blur y temporal upscalers usan current/previous transforms y jitter history."
        },
        {
          "title": "Targets",
          "body": "Una cámara puede renderizar a swapchain, cubemap, shadow atlas o textura offscreen."
        },
        {
          "title": "Culling",
          "body": "El frustum deriva de view-projection, pero sistemas con portals, mirrors o jitter pueden requerir policy específica."
        }
      ]
    },
    "example": {
      "problem": "Jitter alterna +0.25 y -0.25 píxel en x. ¿Promedio de ambos offsets?",
      "steps": [
        "Suma: 0.",
        "Divide entre 2.",
        "Promedio 0."
      ],
      "solution": "0 píxeles."
    },
    "check": {
      "question": "¿Una cámara de motor es necesariamente solo la matriz view?",
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
          "Solo en ray tracing",
          false
        ]
      ],
      "feedback": "Culling debe usar un frustum coherente con la cámara/render pass, pero algunas técnicas amplían o desacoplan ese volumen."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿TAA suele necesitar matrices previas?",
        "answer": "si",
        "hint": "Para reproyección/motion."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Jitter cambia típicamente la proyección?",
        "answer": "si",
        "hint": "Desplaza muestras subpíxel."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cámara puede renderizar offscreen?",
        "answer": "si",
        "hint": "No está ligada al swapchain."
      }
    ]
  },
  "engine-lighting-system": {
    "id": "engine-lighting-system",
    "courseId": 38,
    "title": "Lighting system: luces, probes y listas por región",
    "shortTitle": "Lighting system: luces, probes y listas por región",
    "duration": 110,
    "objective": "Organizar luces y datos de iluminación para escalar desde pocas fuentes a escenas densas sin convertir cada objeto-luz en un draw separado.",
    "summary": [
      "Un lighting system transforma entidades de luz en datos compactos consumibles por los passes de render.",
      "Forward simple escala mal con muchas luces por objeto; tiled/clustered approaches construyen listas de luces por región de pantalla/espacio.",
      "Probes, environment maps y shadow resources tienen lifetimes/actualizaciones distintos de las luces analíticas."
    ],
    "concept": "Un lighting system transforma entidades de luz en datos compactos consumibles por los passes de render.",
    "rules": [
      "No asumas que cada luz debe evaluarse para cada fragmento.",
      "Distingue luz visible geométricamente de luz que afecta una región/cluster.",
      "Actualiza sombras/probes según necesidad y presupuesto, no por reflejo cada frame."
    ],
    "deep": {
      "intro": "Organizar luces y datos de iluminación para escalar desde pocas fuentes a escenas densas sin convertir cada objeto-luz en un draw separado.",
      "sections": [
        {
          "title": "Representación",
          "body": "Directional, point, spot y area approximations requieren parámetros y bounds diferentes."
        },
        {
          "title": "Culling de luces",
          "body": "Tiled/clustered shading reduce la lista candidata por tile/cluster antes del shading."
        },
        {
          "title": "Shadows",
          "body": "Una luz puede referenciar atlas slice/cascade/cubemap y su actualización puede desacoplarse de la luz misma."
        },
        {
          "title": "Probes",
          "body": "Reflection/irradiance probes capturan iluminación de entorno y suelen actualizarse con otra frecuencia."
        }
      ]
    },
    "example": {
      "problem": "1000 luces totales; un cluster contiene 12 candidatas. ¿Cuántas evalúa el shader si usa solo la lista del cluster?",
      "steps": [
        "No itera las 1000 globales.",
        "Usa la lista compactada.",
        "Evalúa 12 candidatas."
      ],
      "solution": "12, antes de filtros adicionales."
    },
    "check": {
      "question": "¿Tiled/clustered lighting busca reducir luces candidatas por región?",
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
          "Solo para sombras",
          false
        ]
      ],
      "feedback": "Probes, environment maps y shadow resources tienen lifetimes/actualizaciones distintos de las luces analíticas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Cada fragmento debe evaluar todas las luces globales?",
        "answer": "no",
        "hint": "Hay light culling."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una shadow map puede actualizarse menos que cada frame?",
        "answer": "si",
        "hint": "Depende de cambios/presupuesto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un cluster puede almacenar una lista de luces?",
        "answer": "si",
        "hint": "Ese es el objetivo del culling por regiones."
      }
    ]
  },
  "engine-visibility-culling": {
    "id": "engine-visibility-culling",
    "courseId": 38,
    "title": "Visibility: frustum, occlusion y temporal coherence",
    "shortTitle": "Visibility: frustum, occlusion y temporal coherence",
    "duration": 110,
    "objective": "Construir un sistema de visibilidad jerárquico que descarte trabajo temprano sin producir falsos negativos visibles.",
    "summary": [
      "Frustum culling elimina objetos fuera del volumen visible; occlusion culling intenta eliminar objetos ocultos por otros.",
      "Bounds conservadores pueden causar falsos positivos aceptables; un falso negativo puede hacer desaparecer geometría visible.",
      "Culling CPU, GPU-driven y Hi-Z tienen trade-offs distintos de latencia, sincronización y granularidad."
    ],
    "concept": "Frustum culling elimina objetos fuera del volumen visible; occlusion culling intenta eliminar objetos ocultos por otros.",
    "rules": [
      "Prioriza culling barato antes de pruebas caras cuando el coste esperado lo justifique.",
      "Usa bounds conservadores para no eliminar objetos potencialmente visibles.",
      "Mide overhead: hacer culling de miles de objetos diminutos puede costar más que dibujarlos agrupados."
    ],
    "deep": {
      "intro": "Construir un sistema de visibilidad jerárquico que descarte trabajo temprano sin producir falsos negativos visibles.",
      "sections": [
        {
          "title": "Frustum",
          "body": "Se testean bounds contra planos; outside claro se descarta, intersecting se conserva para etapas posteriores."
        },
        {
          "title": "Occlusion",
          "body": "Hi-Z usa una pirámide de depth para consultas conservadoras en GPU."
        },
        {
          "title": "Temporal",
          "body": "La visibilidad del frame anterior puede ayudar, pero cambios rápidos/cámara teleportada requieren fallback seguro."
        },
        {
          "title": "GPU-driven",
          "body": "Indirect draws y compaction permiten que compute produzca comandos/listas visibles con menos round trips CPU."
        }
      ]
    },
    "example": {
      "problem": "De 10 000 objetos, frustum descarta 6000 y occlusion descarta 2500 de los restantes. ¿Cuántos quedan?",
      "steps": [
        "Tras frustum: 4000.",
        "Resta 2500 ocultos.",
        "Quedan 1500."
      ],
      "solution": "1500 objetos candidatos."
    },
    "check": {
      "question": "¿Un bound conservador puede incluir espacio vacío sin ser incorrecto para culling?",
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
          "Solo si es esfera",
          false
        ]
      ],
      "feedback": "Culling CPU, GPU-driven y Hi-Z tienen trade-offs distintos de latencia, sincronización y granularidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Qué tipo de error es más peligroso: falso negativo o falso positivo de visibilidad?",
        "answer": "falso negativo",
        "hint": "Puede ocultar geometría visible."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "100 objetos, descartas 70: quedan cuántos?",
        "answer": "30",
        "hint": "100-70."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Hi-Z se usa para occlusion culling?",
        "answer": "si",
        "hint": "Jerarquía de profundidad."
      }
    ]
  },
  "engine-lod": {
    "id": "engine-lod",
    "courseId": 38,
    "title": "LOD: error proyectado, hysteresis y streaming",
    "shortTitle": "LOD: error proyectado, hysteresis y streaming",
    "duration": 110,
    "objective": "Diseñar niveles de detalle guiados por error perceptual/proyectado, evitando popping y thrashing alrededor de umbrales.",
    "summary": [
      "LOD reduce coste usando representaciones más baratas cuando el error proyectado es aceptable.",
      "Umbrales puramente por distancia ignoran FOV, tamaño del objeto y resolución; screen-space error suele ser una señal mejor.",
      "Hysteresis y transiciones reducen oscilación cuando una métrica ronda un umbral."
    ],
    "concept": "LOD reduce coste usando representaciones más baratas cuando el error proyectado es aceptable.",
    "rules": [
      "No uses el mismo umbral de distancia para todos los objetos sin considerar escala/FOV.",
      "Añade hysteresis o cross-fade cuando el cambio abrupto sea visible.",
      "Coordina LOD geométrico con mip/texture streaming para no ahorrar triángulos y mantener recursos innecesarios residentes."
    ],
    "deep": {
      "intro": "Diseñar niveles de detalle guiados por error perceptual/proyectado, evitando popping y thrashing alrededor de umbrales.",
      "sections": [
        {
          "title": "Métrica",
          "body": "Screen-space projected size/error conecta geometría con percepción de la cámara."
        },
        {
          "title": "Hysteresis",
          "body": "Usar umbral distinto al subir/bajar LOD evita alternancia frame a frame."
        },
        {
          "title": "Streaming",
          "body": "LOD selection puede generar prioridades de assets para cargar versiones necesarias antes del cambio."
        },
        {
          "title": "Impostors",
          "body": "A gran distancia, billboards/impostors pueden reemplazar geometría compleja con otro tipo de representación."
        }
      ]
    },
    "example": {
      "problem": "Un objeto alterna entre LOD0 y LOD1 cada frame alrededor del mismo umbral. ¿Qué mecanismo simple ayuda?",
      "steps": [
        "El problema es thrashing cerca de frontera.",
        "Usa dos umbrales distintos según dirección del cambio.",
        "Eso es hysteresis."
      ],
      "solution": "Hysteresis."
    },
    "check": {
      "question": "¿LOD debe basarse necesariamente solo en distancia world?",
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
          "Solo con perspectiva",
          false
        ]
      ],
      "feedback": "Hysteresis y transiciones reducen oscilación cuando una métrica ronda un umbral."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Qué reduce thrashing de LOD?",
        "answer": "hysteresis",
        "hint": "Dos umbrales."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Screen-space error depende de cámara?",
        "answer": "si",
        "hint": "FOV/resolución/proyección influyen."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿LOD y streaming pueden coordinarse?",
        "answer": "si",
        "hint": "Cambiar detalle puede requerir assets distintos."
      }
    ]
  },
  "engine-batching": {
    "id": "engine-batching",
    "courseId": 38,
    "title": "Batching y sorting: reducir overhead sin destruir flexibilidad",
    "shortTitle": "Batching y sorting: reducir overhead sin destruir flexibilidad",
    "duration": 110,
    "objective": "Agrupar trabajo compatible para reducir cambios de estado y overhead CPU/driver, distinguiendo batching lógico de una regla universal de draw count mínimo.",
    "summary": [
      "Batching reduce overhead al combinar draws compatibles o al ordenar para minimizar cambios de pipeline/material.",
      "Un batch demasiado grande puede empeorar culling, streaming o actualización dinámica.",
      "Sorting opaque suele priorizar estado/depth; transparencia suele imponer restricciones de orden distintas."
    ],
    "concept": "Batching reduce overhead al combinar draws compatibles o al ordenar para minimizar cambios de pipeline/material.",
    "rules": [
      "No persigas un único draw call si eso impide culling útil o dispara memoria/actualizaciones.",
      "Agrupa por compatibilidad real de pipeline/material/layout.",
      "Mide CPU submission y GPU cost por separado; menos draws no garantiza más FPS."
    ],
    "deep": {
      "intro": "Agrupar trabajo compatible para reducir cambios de estado y overhead CPU/driver, distinguiendo batching lógico de una regla universal de draw count mínimo.",
      "sections": [
        {
          "title": "State sorting",
          "body": "Ordenar por pipeline/material reduce rebinding; front-to-back puede mejorar early-Z en opaque."
        },
        {
          "title": "Merge",
          "body": "Combinar geometría estática puede ahorrar draws, pero aumenta granularidad de visibilidad y coste de rebuild."
        },
        {
          "title": "Transparency",
          "body": "Alpha blending clásico puede requerir back-to-front o técnicas OIT; el sorting cambia."
        },
        {
          "title": "Trade-off",
          "body": "Batching intercambia overhead por flexibilidad y granularidad. El óptimo depende de workload/backend."
        }
      ]
    },
    "example": {
      "problem": "1200 draws; batching agrupa de media 6 compatibles por draw. Aproximación de draws resultantes?",
      "steps": [
        "Divide 1200 entre 6.",
        "1200/6=200.",
        "Es una estimación si el agrupamiento es uniforme."
      ],
      "solution": "Aproximadamente 200 draws."
    },
    "check": {
      "question": "¿Menos draw calls garantiza siempre mayor rendimiento?",
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
      "feedback": "Sorting opaque suele priorizar estado/depth; transparencia suele imponer restricciones de orden distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "120 draws agrupados de 4 en 4 quedan cuántos?",
        "answer": "30",
        "hint": "120/4."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Transparencia puede imponer otro orden que opaque?",
        "answer": "si",
        "hint": "Blending es order-dependent en el caso clásico."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Batch gigante puede empeorar culling?",
        "answer": "si",
        "hint": "Aumenta granularidad."
      }
    ]
  },
  "engine-instancing": {
    "id": "engine-instancing",
    "courseId": 38,
    "title": "Instancing: muchos objetos, una geometría, datos por instancia",
    "shortTitle": "Instancing: muchos objetos, una geometría, datos por instancia",
    "duration": 110,
    "objective": "Usar instancing para compartir geometría/pipeline mientras se suministran transformaciones y parámetros por instancia con buena granularidad de culling.",
    "summary": [
      "Instancing permite que muchas instancias compartan mesh/material y difieran en datos por instancia.",
      "Instancing reduce overhead de submission, pero no hace gratis vertex/fragment work ni visibilidad.",
      "Culling por instancia o por clusters puede ser necesario para no dibujar miles de instancias ocultas."
    ],
    "concept": "Instancing permite que muchas instancias compartan mesh/material y difieran en datos por instancia.",
    "rules": [
      "No confundas instancing con batching de geometría: comparten objetivos pero representan datos de forma distinta.",
      "Mantén datos por instancia compactos y bien alineados.",
      "Si la mayoría de instancias está oculta, combina instancing con compaction/indirect drawing o culling adecuado."
    ],
    "deep": {
      "intro": "Usar instancing para compartir geometría/pipeline mientras se suministran transformaciones y parámetros por instancia con buena granularidad de culling.",
      "sections": [
        {
          "title": "Datos",
          "body": "Transform, color, material index o custom data pueden residir en vertex attributes instanced o buffers indexados."
        },
        {
          "title": "Draw",
          "body": "Una draw instanced repite la geometría para instanceCount entradas."
        },
        {
          "title": "Culling",
          "body": "CPU puede formar listas visibles; GPU compute puede compactarlas y producir indirect args."
        },
        {
          "title": "Coste",
          "body": "Menos draw overhead no reduce automáticamente overdraw ni complejidad de shader."
        }
      ]
    },
    "example": {
      "problem": "Un mesh tiene 3000 índices y se dibuja 100 instancias. ¿Cuántas referencias de índice procesa conceptualmente el draw antes de culling interno?",
      "steps": [
        "Cada instancia reutiliza los 3000 índices.",
        "3000×100.",
        "Resultado 300000."
      ],
      "solution": "300000 referencias de índice conceptuales."
    },
    "check": {
      "question": "¿Instancing elimina el coste de shading de cada instancia?",
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
          "Solo con indirect",
          false
        ]
      ],
      "feedback": "Culling por instancia o por clusters puede ser necesario para no dibujar miles de instancias ocultas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Qué comparte típicamente instancing?",
        "answer": "mesh",
        "hint": "La geometría base."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "100 índices × 50 instancias = ?",
        "answer": "5000",
        "hint": "Multiplica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede combinarse con indirect drawing?",
        "answer": "si",
        "hint": "Es común en GPU-driven rendering."
      }
    ]
  },
  "engine-render-graph": {
    "id": "engine-render-graph",
    "courseId": 38,
    "title": "Render graph: dependencias, recursos transitorios y scheduling",
    "shortTitle": "Render graph: dependencias, recursos transitorios y scheduling",
    "duration": 110,
    "objective": "Representar passes y recursos como un grafo para derivar orden, lifetimes y aliasing sin ocultar las dependencias reales del backend.",
    "summary": [
      "Un render graph describe qué pass lee/escribe qué recurso y permite derivar dependencias y lifetimes.",
      "Recursos transitorios con lifetimes no solapados pueden aliasar memoria si el backend y las restricciones lo permiten.",
      "El grafo ayuda a planificar synchronization, pero no vuelve irrelevante el memory model ni las reglas de la API."
    ],
    "concept": "Un render graph describe qué pass lee/escribe qué recurso y permite derivar dependencias y lifetimes.",
    "rules": [
      "Declara reads/writes y subresources con suficiente precisión para derivar hazards reales.",
      "No permitas ciclos causales sin un mecanismo temporal explícito entre frames.",
      "Usa el graph como compilador de scheduling, no como caja negra que justifica cualquier barrier global."
    ],
    "deep": {
      "intro": "Representar passes y recursos como un grafo para derivar orden, lifetimes y aliasing sin ocultar las dependencias reales del backend.",
      "sections": [
        {
          "title": "DAG",
          "body": "Dentro de un frame, passes con dependencias acíclicas pueden ordenarse topológicamente."
        },
        {
          "title": "Lifetime",
          "body": "First/last use permite asignar pools y aliasar recursos transitorios no simultáneos."
        },
        {
          "title": "Synchronization",
          "body": "Write→read, write→write y ownership transitions se traducen a primitives del backend."
        },
        {
          "title": "Temporal",
          "body": "History buffers/TAA introducen edges entre frames y suelen representarse como recursos persistentes/versionados."
        }
      ]
    },
    "example": {
      "problem": "Pass A escribe GBuffer, B lo lee y escribe Lighting, C lee Lighting. ¿Orden mínimo compatible?",
      "steps": [
        "B depende de A.",
        "C depende de B.",
        "Orden A→B→C."
      ],
      "solution": "A → B → C."
    },
    "check": {
      "question": "¿Un render graph elimina la necesidad de entender synchronization del backend?",
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
      "feedback": "El grafo ayuda a planificar synchronization, pero no vuelve irrelevante el memory model ni las reglas de la API."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Qué estructura suele formar un render graph intra-frame?",
        "answer": "dag",
        "hint": "Directed acyclic graph."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Recursos transitorios no solapados pueden aliasar memoria?",
        "answer": "si",
        "hint": "Si backend/requisitos lo permiten."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿History buffer suele vivir entre frames?",
        "answer": "si",
        "hint": "Es persistente/versionado."
      }
    ]
  },
  "engine-post-processing": {
    "id": "engine-post-processing",
    "courseId": 38,
    "title": "Post-processing: HDR buffers, efectos y composición",
    "shortTitle": "Post-processing: HDR buffers, efectos y composición",
    "duration": 110,
    "objective": "Diseñar una cadena de post-procesado explícita en sus espacios de color, dependencias y resolución para combinar tone mapping, bloom, TAA y otros efectos.",
    "summary": [
      "Post-processing opera sobre imágenes producidas por etapas previas y suele encadenar passes fullscreen/compute.",
      "El orden importa: aplicar bloom, exposición, tone mapping, UI y encoding en órdenes distintos produce resultados distintos.",
      "Muchos efectos pueden ejecutarse a media/cuarta resolución, intercambiando calidad, bandwidth y coste."
    ],
    "concept": "Post-processing opera sobre imágenes producidas por etapas previas y suele encadenar passes fullscreen/compute.",
    "rules": [
      "Declara si cada pass espera HDR lineal, LDR o datos ya codificados.",
      "No acumules feedback temporal sin invalidar history cuando cámara/resolución/escena cambian de forma incompatible.",
      "Mide bandwidth: passes aparentemente baratos pueden mover imágenes enormes varias veces."
    ],
    "deep": {
      "intro": "Diseñar una cadena de post-procesado explícita en sus espacios de color, dependencias y resolución para combinar tone mapping, bloom, TAA y otros efectos.",
      "sections": [
        {
          "title": "Bloom",
          "body": "Extrae/filtra energía brillante y recompone; hacerlo en un dominio coherente evita umbrales arbitrarios por encoding."
        },
        {
          "title": "TAA",
          "body": "Usa history + reproyección + rechazo/clamping para reducir aliasing temporal; ghosting aparece si la historia es inválida."
        },
        {
          "title": "Resolución",
          "body": "Downsample/upsample puede abaratar blur/AO/bloom, pero introduce filtering y edge cases."
        },
        {
          "title": "Composición",
          "body": "UI suele requerir tratamiento distinto de tone mapping/exposure según pipeline y espacio de salida."
        }
      ]
    },
    "example": {
      "problem": "Una imagen 1920×1080 RGBA16F usa 8 bytes/píxel. ¿Tamaño aproximado en bytes?",
      "steps": [
        "Píxeles=1920×1080=2,073,600.",
        "Multiplica por 8 bytes.",
        "16,588,800 bytes."
      ],
      "solution": "16,588,800 bytes (~15.82 MiB)."
    },
    "check": {
      "question": "¿El orden de tone mapping y UI puede afectar el resultado?",
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
          "Solo con HDR10",
          false
        ]
      ],
      "feedback": "Muchos efectos pueden ejecutarse a media/cuarta resolución, intercambiando calidad, bandwidth y coste."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿TAA usa información temporal?",
        "answer": "si",
        "hint": "History buffer."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Bloom puede ejecutarse a menor resolución?",
        "answer": "si",
        "hint": "Trade-off común."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "1920×1080 tiene cuántos píxeles?",
        "answer": "2073600",
        "hint": "Multiplica."
      }
    ]
  },
  "engine-frame-architecture": {
    "id": "engine-frame-architecture",
    "courseId": 38,
    "title": "Frame architecture: extracción, preparación y ejecución",
    "shortTitle": "Frame architecture: extracción, preparación y ejecución",
    "duration": 110,
    "objective": "Separar world/update de render extraction, preparación de comandos y ejecución GPU para controlar concurrencia, latencia y consistencia de snapshots.",
    "summary": [
      "Un renderer escalable suele consumir un snapshot/render world estable en vez de recorrer arbitrariamente el gameplay world mientras muta.",
      "Render extraction transforma estado de juego en datos orientados a render; preparation clasifica/culla/batchea; execution registra/envía trabajo.",
      "Double/triple buffering de datos puede aumentar throughput a costa de memoria y latencia."
    ],
    "concept": "Un renderer escalable suele consumir un snapshot/render world estable en vez de recorrer arbitrariamente el gameplay world mientras muta.",
    "rules": [
      "Evita data races entre gameplay y renderer mediante snapshots, ownership por frame o sincronización explícita.",
      "Distingue latency CPU→present de throughput de frames in flight.",
      "Perfila cada fase: extraction, culling, sorting, command recording, GPU passes y present."
    ],
    "deep": {
      "intro": "Separar world/update de render extraction, preparación de comandos y ejecución GPU para controlar concurrencia, latencia y consistencia de snapshots.",
      "sections": [
        {
          "title": "Snapshot",
          "body": "Copiar/extraer solo datos renderizables estabiliza el frame y reduce acoplamiento con estructuras de gameplay."
        },
        {
          "title": "Parallelism",
          "body": "Culling/sorting/command generation pueden particionarse, pero merge y ordering deben estar definidos."
        },
        {
          "title": "Frames in flight",
          "body": "Más buffering mantiene GPU ocupada, pero puede aumentar input-to-photon latency."
        },
        {
          "title": "Instrumentation",
          "body": "Timestamp queries + CPU traces permiten atribuir stalls a la fase real."
        }
      ]
    },
    "example": {
      "problem": "CPU tarda 4 ms en extraction y 3 ms en preparation; sin solapamiento, ¿tiempo CPU de esas fases?",
      "steps": [
        "Suma fases seriales.",
        "4+3=7.",
        "Resultado 7 ms."
      ],
      "solution": "7 ms."
    },
    "check": {
      "question": "¿Más frames in flight puede aumentar latencia aunque mejore utilización?",
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
          "Solo con VSync",
          false
        ]
      ],
      "feedback": "Double/triple buffering de datos puede aumentar throughput a costa de memoria y latencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Render extraction ayuda a desacoplar gameplay y renderer?",
        "answer": "si",
        "hint": "Crea un snapshot orientado a render."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "4 ms + 5 ms seriales = ?",
        "answer": "9",
        "hint": "Suma."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Throughput y latency son la misma métrica?",
        "answer": "no",
        "hint": "Un pipeline puede procesar mucho y responder tarde."
      }
    ]
  },
  "engine-renderer-project": {
    "id": "engine-renderer-project",
    "courseId": 38,
    "title": "Proyecto: construir un motor gráfico propio medible",
    "shortTitle": "Proyecto: construir un motor gráfico propio medible",
    "duration": 110,
    "objective": "Integrar scene/resource/material/visibility/render-graph y backend en un renderer pequeño con métricas, invariantes y pruebas reproducibles.",
    "summary": [
      "Un motor gráfico propio debe demostrar arquitectura y medición, no solo producir una imagen bonita.",
      "La entrega debe separar frontend de escena/materiales del backend API y documentar lifetimes, synchronization y ownership.",
      "Los benchmarks deben indicar escena, resolución, hardware, configuración y métricas para que una optimización sea reproducible."
    ],
    "concept": "Un motor gráfico propio debe demostrar arquitectura y medición, no solo producir una imagen bonita.",
    "rules": [
      "Empieza con un vertical slice pequeño antes de añadir PBR, streaming o GPU-driven rendering.",
      "Añade assertions/debug names/validation y pruebas de lifetime desde el principio.",
      "Optimiza con profiling: identifica cuello de botella antes de cambiar arquitectura."
    ],
    "deep": {
      "intro": "Integrar scene/resource/material/visibility/render-graph y backend en un renderer pequeño con métricas, invariantes y pruebas reproducibles.",
      "sections": [
        {
          "title": "Milestones",
          "body": "Triángulo→mesh/cámara→materials→visibility→lighting→post→streaming/perf. Cada etapa debe mantener el frame verificable."
        },
        {
          "title": "Backend",
          "body": "Una interfaz de renderer puede abstraer recursos/commands sin pretender borrar diferencias semánticas entre APIs."
        },
        {
          "title": "Tests",
          "body": "Headless/image regression, validation layers y tests de handles/material serialization cubren fallos distintos."
        },
        {
          "title": "Informe",
          "body": "Incluye frame graph, ownership, presupuestos, timings CPU/GPU y una lista de trade-offs aceptados."
        }
      ]
    },
    "example": {
      "problem": "Versión A tarda 11 ms/frame y B 8 ms/frame en la misma escena. ¿speedup A/B aproximado?",
      "steps": [
        "Speedup=11/8.",
        "11/8=1.375.",
        "B es 1.375× más rápida en tiempo por frame bajo esa medición."
      ],
      "solution": "Speedup aproximado 1.375×."
    },
    "check": {
      "question": "¿Una imagen correcta basta para demostrar que el renderer no tiene lifetime/synchronization bugs?",
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
          "Solo si pasa 60 FPS",
          false
        ]
      ],
      "feedback": "Los benchmarks deben indicar escena, resolución, hardware, configuración y métricas para que una optimización sea reproducible."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Qué debes medir además de FPS?",
        "answer": "cpu y gpu",
        "hint": "Timings por fase/passes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "11/8 speedup = ?",
        "answer": "1.375",
        "hint": "Divide."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validation layers sustituyen tests de lógica?",
        "answer": "no",
        "hint": "Cubren contratos API, no toda la arquitectura."
      }
    ]
  }
});
