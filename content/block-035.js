/**
 * BLOQUE 035 — GPU / Arquitectura gráfica
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar modelo de programación, grupo de ejecución y
 * microarquitectura. Warp/wavefront/subgroup, caches y unidades cambian entre
 * fabricantes y generaciones; el rendimiento se demuestra con medición.
 */
window.LEARNING_PATHS[35] = {
  "level": "Experto progresivo",
  "estimatedHours": 116,
  "description": "Arquitectura GPU desde el modelo CPU/GPU y SIMT hasta warps/wavefronts, jerarquía de memoria, occupancy, divergence, fixed-function y compute.",
  "outcomes": [
    "Distinguir SIMD, SIMT, warp/wavefront/subgroup y sus dependencias de arquitectura.",
    "Diagnosticar rendimiento mediante occupancy, arithmetic intensity, coalescing, caches y divergence.",
    "Relacionar unidades programables y fixed-function del pipeline gráfico.",
    "Diseñar y medir dispatches compute sin asumir tamaños universales de subgroup."
  ],
  "modules": [
    {
      "id": "m1-model",
      "title": "Modelo de ejecución",
      "description": "CPU/GPU, SIMD/SIMT, warps y unidades",
      "lessons": [
        "gpu-cpu-vs-gpu",
        "gpu-simd-simt",
        "gpu-warps-wavefronts",
        "gpu-execution-units"
      ]
    },
    {
      "id": "m2-memory",
      "title": "Memoria y residencia",
      "description": "Jerarquía, VRAM, coalescing y occupancy",
      "lessons": [
        "gpu-memory-hierarchy",
        "gpu-vram-bandwidth",
        "gpu-coalescing",
        "gpu-occupancy-latency"
      ]
    },
    {
      "id": "m3-control-cache",
      "title": "Control y unidades especializadas",
      "description": "Divergence, caches, textura y raster",
      "lessons": [
        "gpu-divergence",
        "gpu-caches",
        "gpu-texture-units",
        "gpu-rasterizer-fixed-function"
      ]
    },
    {
      "id": "m4-compute",
      "title": "Compute e integración",
      "description": "Workgroups y metodología de rendimiento",
      "lessons": [
        "gpu-compute-workgroups",
        "gpu-integration-performance"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "gpu-cpu-vs-gpu": {
    "id": "gpu-cpu-vs-gpu",
    "courseId": 35,
    "title": "CPU frente a GPU: latencia, throughput y paralelismo",
    "shortTitle": "CPU frente a GPU: latencia, throughput y paralelismo",
    "duration": 98,
    "objective": "Comparar CPU y GPU por objetivos microarquitectónicos sin reducir la diferencia a frecuencia o número de cores.",
    "summary": [
      "Una CPU suele dedicar más recursos por hilo a latencia, control y caches; una GPU dedica gran parte del silicio a throughput masivamente paralelo.",
      "La GPU gana cuando existe suficiente trabajo paralelo y regular; transferencias, serialización y kernels pequeños pueden dominar.",
      "CPU y GPU son complementarias: el host organiza, la GPU acelera regiones adecuadas y el sistema completo se mide extremo a extremo."
    ],
    "concept": "Una CPU suele dedicar más recursos por hilo a latencia, control y caches; una GPU dedica gran parte del silicio a throughput masivamente paralelo.",
    "rules": [
      "Una CPU suele dedicar más recursos por hilo a latencia, control y caches; una GPU dedica gran parte del silicio a throughput masivamente paralelo.",
      "La GPU gana cuando existe suficiente trabajo paralelo y regular; transferencias, serialización y kernels pequeños pueden dominar.",
      "CPU y GPU son complementarias: el host organiza, la GPU acelera regiones adecuadas y el sistema completo se mide extremo a extremo."
    ],
    "deep": {
      "intro": "Comparar CPU y GPU por objetivos microarquitectónicos sin reducir la diferencia a frecuencia o número de cores.",
      "sections": [
        {
          "title": "Latencia frente a throughput",
          "body": "La CPU optimiza una mezcla amplia de cargas con ejecución especulativa, grandes caches y pocos hilos potentes. La GPU busca mantener muchas operaciones en vuelo y amortizar latencias con paralelismo."
        },
        {
          "title": "No comparar cores por nombre",
          "body": "Un core CPU y una lane/ALU GPU no tienen el mismo diseño, ancho, estado ni scheduler. Contar “cores” entre arquitecturas distintas no da una comparación de rendimiento válida."
        },
        {
          "title": "Coste de offload",
          "body": "Lanzar trabajo y mover/sincronizar datos tiene coste. Si el problema es pequeño o secuencial, la aceleración puede perder frente a permanecer en CPU."
        },
        {
          "title": "Modelo roofline mental",
          "body": "Rendimiento puede limitarse por cómputo, ancho de banda, latencia, dependencias o sincronización. El cuello de botella cambia con el kernel y el hardware."
        }
      ]
    },
    "example": {
      "problem": "Un kernel tarda 20 µs pero preparar/lanzar/sincronizar cuesta 50 µs.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "70 µs de coste total aproximado; acelerar solo el kernel no elimina el overhead."
    },
    "check": {
      "question": "¿Más “GPU cores” implica por sí solo más rendimiento que una CPU?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Los cores no son unidades comparables entre arquitecturas y el rendimiento depende de la carga."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿CPU y GPU optimizan exactamente el mismo objetivo microarquitectónico?",
        "answer": "no",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si el kernel dura 5 µs y el overhead de lanzamiento 30 µs, ¿el overhead puede dominar?",
        "answer": "si",
        "hint": "Los cores no son unidades comparables entre arquitecturas y el rendimiento depende de la carga."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Nombra la métrica que suele priorizar una GPU frente a latencia de un solo hilo.",
        "answer": "throughput",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "rendimiento agregado"
        ]
      }
    ]
  },
  "gpu-simd-simt": {
    "id": "gpu-simd-simt",
    "courseId": 35,
    "title": "SIMD y SIMT: vectores, lanes y threads",
    "shortTitle": "SIMD y SIMT: vectores, lanes y threads",
    "duration": 102,
    "objective": "Distinguir SIMD como modelo de instrucción vectorial y SIMT como modelo de programación/ejecución de muchos threads agrupados.",
    "summary": [
      "SIMD aplica una operación a múltiples lanes de datos bajo una instrucción vectorial.",
      "SIMT presenta threads lógicos con estado propio que el hardware ejecuta en grupos sobre recursos vectoriales/subgrupo.",
      "SIMT no elimina la realidad SIMD del hardware: control divergente puede enmascarar lanes y reducir utilización."
    ],
    "concept": "SIMD aplica una operación a múltiples lanes de datos bajo una instrucción vectorial.",
    "rules": [
      "SIMD aplica una operación a múltiples lanes de datos bajo una instrucción vectorial.",
      "SIMT presenta threads lógicos con estado propio que el hardware ejecuta en grupos sobre recursos vectoriales/subgrupo.",
      "SIMT no elimina la realidad SIMD del hardware: control divergente puede enmascarar lanes y reducir utilización."
    ],
    "deep": {
      "intro": "Distinguir SIMD como modelo de instrucción vectorial y SIMT como modelo de programación/ejecución de muchos threads agrupados.",
      "sections": [
        {
          "title": "SIMD",
          "body": "Una instrucción vectorial opera sobre varias lanes. El programador o compilador expresa vectores y máscaras según ISA/modelo."
        },
        {
          "title": "SIMT",
          "body": "En CUDA/HIP y modelos afines se escriben muchos threads con IDs propios; el hardware agrupa threads para ejecutar instrucciones en paralelo."
        },
        {
          "title": "Máscara activa",
          "body": "Cuando no todos los threads ejecutan la misma ruta, el grupo puede ejecutar rutas con distintas máscaras activas. La semántica de thread sigue existiendo, pero la utilización de lanes cae."
        },
        {
          "title": "Subgroups portables",
          "body": "APIs como Vulkan/OpenCL exponen subgroups sin prometer que su tamaño sea idéntico en todos los dispositivos. El código portable debe consultar capacidades o evitar supuestos rígidos."
        }
      ]
    },
    "example": {
      "problem": "Un grupo de 32 lanes ejecuta una operación y solo 20 lanes están activas.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "La utilización instantánea de lanes para esa instrucción es 20/32 = 62.5%."
    },
    "check": {
      "question": "¿SIMT significa que cada thread siempre dispone de una ALU física exclusiva?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Los threads lógicos se agrupan y comparten recursos de ejecución."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿SIMD y SIMT son términos estrictamente idénticos?",
        "answer": "no",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "20 lanes activas de 32 equivalen a ¿qué porcentaje?",
        "answer": "62.5%",
        "hint": "Los threads lógicos se agrupan y comparten recursos de ejecución."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Qué mecanismo representa lanes que no participan temporalmente en una instrucción?",
        "answer": "mascara",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "active mask",
          "máscara activa"
        ]
      }
    ]
  },
  "gpu-warps-wavefronts": {
    "id": "gpu-warps-wavefronts",
    "courseId": 35,
    "title": "Warps, wavefronts y subgroups",
    "shortTitle": "Warps, wavefronts y subgroups",
    "duration": 104,
    "objective": "Razonar sobre grupos hardware de ejecución sin asumir un tamaño universal.",
    "summary": [
      "NVIDIA denomina warp a su grupo básico de threads y documenta 32 threads por warp en CUDA actual.",
      "AMD usa wavefront; el tamaño depende de arquitectura y puede ser 32 o 64 en familias distintas/configuraciones.",
      "Vulkan denomina subgroup al conjunto de invocations que puede comunicarse mediante operaciones de subgroup; su tamaño es propiedad del dispositivo/pipeline, no una constante universal."
    ],
    "concept": "NVIDIA denomina warp a su grupo básico de threads y documenta 32 threads por warp en CUDA actual.",
    "rules": [
      "NVIDIA denomina warp a su grupo básico de threads y documenta 32 threads por warp en CUDA actual.",
      "AMD usa wavefront; el tamaño depende de arquitectura y puede ser 32 o 64 en familias distintas/configuraciones.",
      "Vulkan denomina subgroup al conjunto de invocations que puede comunicarse mediante operaciones de subgroup; su tamaño es propiedad del dispositivo/pipeline, no una constante universal."
    ],
    "deep": {
      "intro": "Razonar sobre grupos hardware de ejecución sin asumir un tamaño universal.",
      "sections": [
        {
          "title": "Warp NVIDIA",
          "body": "La guía CUDA actual describe warps de 32 threads por SM. Esa es una propiedad del modelo/hardware CUDA de NVIDIA, no una definición universal de GPU."
        },
        {
          "title": "Wavefront AMD",
          "body": "HIP documenta tamaños dependientes de arquitectura. RDNA usa típicamente wave32 en hardware moderno, mientras generaciones GCN se asocian con wave64; no hardcodear 64 como ley general."
        },
        {
          "title": "Subgroup de API",
          "body": "Vulkan expone subgroupSize y mecanismos de control/consulta. Una API portable debe tratar el tamaño como capacidad, especialmente para algoritmos de shuffle/reduction."
        },
        {
          "title": "Sincronización",
          "body": "Operaciones dentro de subgroup no sustituyen automáticamente barreras de workgroup ni ordenamiento global. El alcance de sincronización debe declararse correctamente."
        }
      ]
    },
    "example": {
      "problem": "Un algoritmo presupone warpSize=32 y se porta a un dispositivo con subgroup de 64.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "Puede producir índices/máscaras incorrectos; debe consultar o parametrizar el tamaño."
    },
    "check": {
      "question": "¿Wavefront=64 es una ley universal de todas las GPU AMD modernas?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "El tamaño depende de la arquitectura/configuración; RDNA usa nativamente wave32 en muchos casos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿CUDA actual de NVIDIA documenta warps de 32 threads?",
        "answer": "si",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Debe un shader portable asumir subgroupSize=32 sin consultar capacidades?",
        "answer": "no",
        "hint": "El tamaño depende de la arquitectura/configuración; RDNA usa nativamente wave32 en muchos casos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Nombre genérico de Vulkan para un grupo de invocations que ejecutan coordinadamente.",
        "answer": "subgroup",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "subgrupo"
        ]
      }
    ]
  },
  "gpu-execution-units": {
    "id": "gpu-execution-units",
    "courseId": 35,
    "title": "SM/CU, lanes y unidades especializadas",
    "shortTitle": "SM/CU, lanes y unidades especializadas",
    "duration": 106,
    "objective": "Construir un modelo jerárquico de la GPU separando unidades de scheduling, ALUs escalares/vectoriales y aceleradores especializados.",
    "summary": [
      "SM (NVIDIA) y CU/WGP (AMD, según arquitectura) son bloques de cómputo que contienen múltiples recursos de ejecución, registros, memoria local y schedulers.",
      "“GPU core” es un término comercial ambiguo: CUDA cores, stream processors, lanes y matrix/tensor units no son intercambiables.",
      "El throughput de una operación depende de qué unidades la ejecutan, precisión, issue rate, ocupación y dependencias."
    ],
    "concept": "SM (NVIDIA) y CU/WGP (AMD, según arquitectura) son bloques de cómputo que contienen múltiples recursos de ejecución, registros, memoria local y schedulers.",
    "rules": [
      "SM (NVIDIA) y CU/WGP (AMD, según arquitectura) son bloques de cómputo que contienen múltiples recursos de ejecución, registros, memoria local y schedulers.",
      "“GPU core” es un término comercial ambiguo: CUDA cores, stream processors, lanes y matrix/tensor units no son intercambiables.",
      "El throughput de una operación depende de qué unidades la ejecutan, precisión, issue rate, ocupación y dependencias."
    ],
    "deep": {
      "intro": "Construir un modelo jerárquico de la GPU separando unidades de scheduling, ALUs escalares/vectoriales y aceleradores especializados.",
      "sections": [
        {
          "title": "Jerarquía",
          "body": "Un dispositivo contiene múltiples bloques de cómputo; cada bloque aloja schedulers y unidades de ejecución. El nombre exacto y composición cambian entre arquitecturas."
        },
        {
          "title": "Unidades escalares/vectoriales",
          "body": "No toda instrucción usa la misma tubería. Integer, FP, special function, load/store y otras operaciones pueden competir por unidades diferentes."
        },
        {
          "title": "Matrix/tensor acceleration",
          "body": "Algunas GPU incluyen unidades para operaciones matriciales de alta densidad y precisiones concretas. No aceleran automáticamente cualquier multiplicación escalar."
        },
        {
          "title": "Picos teóricos",
          "body": "TFLOP/s pico presupone una mezcla concreta de instrucciones, frecuencia y utilización. El rendimiento real puede estar limitado por memoria, control o dependencias."
        }
      ]
    },
    "example": {
      "problem": "Un chip anuncia 60 TFLOP/s FP16, pero el kernel es memory-bound.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "El pico aritmético no será el límite relevante; el ancho de banda/AI puede dominar."
    },
    "check": {
      "question": "¿“GPU core” tiene una definición microarquitectónica única entre fabricantes?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Es un término demasiado ambiguo para comparar arquitecturas directamente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una unidad matricial acelera automáticamente cualquier instrucción escalar?",
        "answer": "no",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿TFLOP/s pico garantiza ese rendimiento en cualquier kernel?",
        "answer": "no",
        "hint": "Es un término demasiado ambiguo para comparar arquitecturas directamente."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Qué nombre usa NVIDIA para uno de sus bloques principales de cómputo?",
        "answer": "SM",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "streaming multiprocessor"
        ]
      }
    ]
  },
  "gpu-memory-hierarchy": {
    "id": "gpu-memory-hierarchy",
    "courseId": 35,
    "title": "Jerarquía de memoria: registros, shared/LDS y global",
    "shortTitle": "Jerarquía de memoria: registros, shared/LDS y global",
    "duration": 112,
    "objective": "Relacionar alcance, latencia, capacidad y sincronización de los espacios de memoria GPU.",
    "summary": [
      "Registros son estado rápido por thread/lane, pero su cantidad limita cuántos grupos pueden residir simultáneamente.",
      "Shared memory/LDS es memoria on-chip explícitamente compartida por threads de un bloque/workgroup y requiere sincronización correcta.",
      "Global memory es visible ampliamente y suele residir en VRAM/memoria del dispositivo; caches y coalescing median su coste efectivo."
    ],
    "concept": "Registros son estado rápido por thread/lane, pero su cantidad limita cuántos grupos pueden residir simultáneamente.",
    "rules": [
      "Registros son estado rápido por thread/lane, pero su cantidad limita cuántos grupos pueden residir simultáneamente.",
      "Shared memory/LDS es memoria on-chip explícitamente compartida por threads de un bloque/workgroup y requiere sincronización correcta.",
      "Global memory es visible ampliamente y suele residir en VRAM/memoria del dispositivo; caches y coalescing median su coste efectivo."
    ],
    "deep": {
      "intro": "Relacionar alcance, latencia, capacidad y sincronización de los espacios de memoria GPU.",
      "sections": [
        {
          "title": "Registros",
          "body": "Muchos registros por thread pueden mejorar localidad pero elevar presión de registros y reducir residencia. Spilling puede terminar usando memoria más lenta."
        },
        {
          "title": "Shared/LDS",
          "body": "CUDA shared memory y AMD LDS cumplen papeles de scratchpad cooperativo. No son caches automáticas: el programa decide qué datos colocar y cuándo sincronizar."
        },
        {
          "title": "Global",
          "body": "Accesos globales pueden tener alta latencia. El hardware intenta agrupar/coalescer transacciones y aprovechar caches, pero patrones pobres desperdician ancho de banda."
        },
        {
          "title": "Alcance y barreras",
          "body": "Una barrera de workgroup coordina threads del grupo bajo reglas del modelo. No sincroniza automáticamente todos los grupos del dispatch."
        }
      ]
    },
    "example": {
      "problem": "256 threads usan 64 KiB de shared por bloque en un SM con 128 KiB disponibles para esa finalidad.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "Como techo por shared memory, caben 2 bloques residentes; otros recursos pueden reducirlo."
    },
    "check": {
      "question": "¿Shared memory es simplemente una cache automática de global memory?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Es scratchpad gestionado explícitamente por el programa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Los registros son normalmente privados por thread/lane?",
        "answer": "si",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "128 KiB / 64 KiB permite como máximo ¿cuántos bloques por ese recurso?",
        "answer": "2",
        "hint": "Es scratchpad gestionado explícitamente por el programa."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Nombre AMD habitual del scratchpad local compartido dentro de un workgroup.",
        "answer": "LDS",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "local data share"
        ]
      }
    ]
  },
  "gpu-vram-bandwidth": {
    "id": "gpu-vram-bandwidth",
    "courseId": 35,
    "title": "VRAM, ancho de banda y arithmetic intensity",
    "shortTitle": "VRAM, ancho de banda y arithmetic intensity",
    "duration": 108,
    "objective": "Diagnosticar kernels limitados por memoria usando bytes transferidos y trabajo aritmético.",
    "summary": [
      "VRAM ofrece gran capacidad y ancho de banda, pero acceder a ella sigue siendo caro frente a registros/scratchpad on-chip.",
      "Arithmetic intensity relaciona operaciones útiles con bytes movidos y ayuda a distinguir regiones memory-bound de compute-bound.",
      "Ancho de banda anunciado es un máximo teórico; patrón de acceso, caches, controlador y concurrencia determinan el ancho de banda efectivo."
    ],
    "concept": "VRAM ofrece gran capacidad y ancho de banda, pero acceder a ella sigue siendo caro frente a registros/scratchpad on-chip.",
    "rules": [
      "VRAM ofrece gran capacidad y ancho de banda, pero acceder a ella sigue siendo caro frente a registros/scratchpad on-chip.",
      "Arithmetic intensity relaciona operaciones útiles con bytes movidos y ayuda a distinguir regiones memory-bound de compute-bound.",
      "Ancho de banda anunciado es un máximo teórico; patrón de acceso, caches, controlador y concurrencia determinan el ancho de banda efectivo."
    ],
    "deep": {
      "intro": "Diagnosticar kernels limitados por memoria usando bytes transferidos y trabajo aritmético.",
      "sections": [
        {
          "title": "Capacidad vs velocidad",
          "body": "Más VRAM permite datasets mayores, no garantiza menor latencia ni mayor throughput."
        },
        {
          "title": "Arithmetic intensity",
          "body": "AI=operaciones/byte transferido. A baja AI, el rendimiento máximo puede aproximarse por ancho_de_banda × AI, idea central de Roofline."
        },
        {
          "title": "Tráfico real",
          "body": "Lecturas redundantes, writes, writebacks y mala localidad pueden mover muchos más bytes que el tamaño lógico del array."
        },
        {
          "title": "Unified memory",
          "body": "Sistemas con memoria unificada o migración de páginas cambian el coste de “transferencia”, pero no eliminan ancho de banda, coherencia ni locality como restricciones."
        }
      ]
    },
    "example": {
      "problem": "Kernel hace 8 FLOP por elemento y mueve 16 bytes por elemento.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "Arithmetic intensity = 0.5 FLOP/byte."
    },
    "check": {
      "question": "¿Más capacidad de VRAM garantiza más ancho de banda?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Capacidad y ancho de banda son propiedades distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "8 FLOP / 16 bytes = ¿AI?",
        "answer": "0.5",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un kernel de baja arithmetic intensity puede ser memory-bound aun con muchas ALUs libres?",
        "answer": "si",
        "hint": "Capacidad y ancho de banda son propiedades distintas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Qué modelo relaciona techo de cómputo con ancho de banda y arithmetic intensity?",
        "answer": "roofline",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "modelo roofline"
        ]
      }
    ]
  },
  "gpu-coalescing": {
    "id": "gpu-coalescing",
    "courseId": 35,
    "title": "Coalescing, alineación y patrones de acceso",
    "shortTitle": "Coalescing, alineación y patrones de acceso",
    "duration": 110,
    "objective": "Diseñar accesos globales que aprovechen transacciones de memoria y localidad sin asumir una granularidad universal.",
    "summary": [
      "Threads vecinos accediendo a direcciones vecinas suelen facilitar transacciones coalesced y mejor utilización de líneas/sectores.",
      "Stride, alineación y tamaño de elemento afectan cuántas transacciones son necesarias; detalles exactos dependen de arquitectura.",
      "Reordenar layout AoS/SoA o usar tiling puede convertir un patrón disperso en uno más amigable para memoria."
    ],
    "concept": "Threads vecinos accediendo a direcciones vecinas suelen facilitar transacciones coalesced y mejor utilización de líneas/sectores.",
    "rules": [
      "Threads vecinos accediendo a direcciones vecinas suelen facilitar transacciones coalesced y mejor utilización de líneas/sectores.",
      "Stride, alineación y tamaño de elemento afectan cuántas transacciones son necesarias; detalles exactos dependen de arquitectura.",
      "Reordenar layout AoS/SoA o usar tiling puede convertir un patrón disperso en uno más amigable para memoria."
    ],
    "deep": {
      "intro": "Diseñar accesos globales que aprovechen transacciones de memoria y localidad sin asumir una granularidad universal.",
      "sections": [
        {
          "title": "Coalescing conceptual",
          "body": "El controlador intenta servir solicitudes de un grupo con pocas transacciones. Direcciones compactas y alineadas suelen ayudar."
        },
        {
          "title": "Stride",
          "body": "Si cada lane accede a elementos muy separados, se pueden traer muchas líneas para usar pocos bytes de cada una."
        },
        {
          "title": "AoS vs SoA",
          "body": "Procesar un único campo de muchos objetos suele favorecer SoA; procesar todos los campos de un objeto puede beneficiar otra localidad. No hay layout universal."
        },
        {
          "title": "Medir",
          "body": "El tamaño de transacción, sectores y políticas de cache cambian; la optimización fiable usa profiler y counters del dispositivo objetivo."
        }
      ]
    },
    "example": {
      "problem": "32 lanes leen float consecutivos de 4 bytes.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "La región lógica es 128 bytes contiguos; es un patrón favorable para coalescing, sujeto a alineación/arquitectura."
    },
    "check": {
      "question": "¿“coalesced” significa una única transacción en absolutamente toda GPU?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "La granularidad exacta depende de la arquitectura y alineación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "32 floats consecutivos ocupan ¿cuántos bytes?",
        "answer": "128",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Stride grande puede desperdiciar ancho de banda aunque el total lógico sea pequeño?",
        "answer": "si",
        "hint": "La granularidad exacta depende de la arquitectura y alineación."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Layout que separa cada campo en un array independiente.",
        "answer": "SoA",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "structure of arrays"
        ]
      }
    ]
  },
  "gpu-occupancy-latency": {
    "id": "gpu-occupancy-latency",
    "courseId": 35,
    "title": "Occupancy, residencia y ocultación de latencia",
    "shortTitle": "Occupancy, residencia y ocultación de latencia",
    "duration": 112,
    "objective": "Entender occupancy como capacidad de mantener grupos residentes, no como objetivo absoluto de rendimiento.",
    "summary": [
      "Occupancy mide aproximadamente cuántos warps/waves activos residen respecto al máximo soportado bajo ciertos recursos.",
      "Registros, shared/LDS, tamaño de bloque y límites arquitectónicos restringen residencia.",
      "Más occupancy puede ayudar a ocultar latencia, pero 100% occupancy no garantiza máximo rendimiento y reducir registros a la fuerza puede provocar spilling."
    ],
    "concept": "Occupancy mide aproximadamente cuántos warps/waves activos residen respecto al máximo soportado bajo ciertos recursos.",
    "rules": [
      "Occupancy mide aproximadamente cuántos warps/waves activos residen respecto al máximo soportado bajo ciertos recursos.",
      "Registros, shared/LDS, tamaño de bloque y límites arquitectónicos restringen residencia.",
      "Más occupancy puede ayudar a ocultar latencia, pero 100% occupancy no garantiza máximo rendimiento y reducir registros a la fuerza puede provocar spilling."
    ],
    "deep": {
      "intro": "Entender occupancy como capacidad de mantener grupos residentes, no como objetivo absoluto de rendimiento.",
      "sections": [
        {
          "title": "Residencia",
          "body": "El scheduler necesita warps/waves listos para alternar cuando otros esperan memoria o dependencias. Más residentes ofrecen más opciones."
        },
        {
          "title": "Recursos finitos",
          "body": "Registros y scratchpad se reparten entre grupos residentes; aumentar recursos por grupo puede reducir su número."
        },
        {
          "title": "No es KPI universal",
          "body": "Un kernel compute-bound con alto ILP puede rendir bien con occupancy moderada. Un kernel memory-latency-bound puede beneficiarse más de concurrencia."
        },
        {
          "title": "Trade-offs",
          "body": "Cambiar block size, unrolling o registros altera occupancy y también instruction count/localidad. Hay que medir rendimiento, no perseguir el porcentaje aislado."
        }
      ]
    },
    "example": {
      "problem": "Un SM soporta 64 warps residentes; un kernel mantiene 32.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "Occupancy simplificada = 50%, aunque el rendimiento real no se deduce solo de ese número."
    },
    "check": {
      "question": "¿100% occupancy garantiza el máximo rendimiento?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Occupancy es un medio para ocultar latencia, no una métrica final universal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "32 warps de máximo 64 = ¿occupancy simplificada?",
        "answer": "50%",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Reducir registros siempre mejora rendimiento si sube occupancy?",
        "answer": "no",
        "hint": "Occupancy es un medio para ocultar latencia, no una métrica final universal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Fenómeno por el que más waves listas permiten ejecutar otra mientras una espera memoria.",
        "answer": "ocultacion de latencia",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "latency hiding"
        ]
      }
    ]
  },
  "gpu-divergence": {
    "id": "gpu-divergence",
    "courseId": 35,
    "title": "Divergence, máscaras y control de flujo",
    "shortTitle": "Divergence, máscaras y control de flujo",
    "duration": 108,
    "objective": "Analizar control divergente por grupo de ejecución y distinguirlo de divergencia entre grupos independientes.",
    "summary": [
      "Divergence ocurre cuando lanes de un warp/wave siguen rutas de control distintas y no pueden aprovechar simultáneamente todos los recursos de una misma instrucción.",
      "Branches uniformes para todo el grupo no generan el mismo coste de divergencia que decisiones por lane.",
      "Eliminar branches no garantiza mejora: predicación, trabajo extra y presión de registros también cuestan."
    ],
    "concept": "Divergence ocurre cuando lanes de un warp/wave siguen rutas de control distintas y no pueden aprovechar simultáneamente todos los recursos de una misma instrucción.",
    "rules": [
      "Divergence ocurre cuando lanes de un warp/wave siguen rutas de control distintas y no pueden aprovechar simultáneamente todos los recursos de una misma instrucción.",
      "Branches uniformes para todo el grupo no generan el mismo coste de divergencia que decisiones por lane.",
      "Eliminar branches no garantiza mejora: predicación, trabajo extra y presión de registros también cuestan."
    ],
    "deep": {
      "intro": "Analizar control divergente por grupo de ejecución y distinguirlo de divergencia entre grupos independientes.",
      "sections": [
        {
          "title": "Ruta divergente",
          "body": "Si parte del grupo toma A y otra parte B, la implementación puede ejecutar ambas rutas con máscaras diferentes, reduciendo utilización durante cada tramo."
        },
        {
          "title": "Uniformidad",
          "body": "Una condición basada en un valor común al grupo puede seleccionar una sola ruta. La estructura visual del if no basta para inferir divergencia."
        },
        {
          "title": "Reconvergencia",
          "body": "El hardware mantiene información para reconverger control. Los detalles cambian por arquitectura; pensar en máscaras activas es un modelo útil pero no una ISA universal."
        },
        {
          "title": "Optimización",
          "body": "Reordenar datos para agrupar comportamiento puede ayudar, pero puede perjudicar localidad o añadir sorting. El profiler decide si divergence es realmente el cuello de botella."
        }
      ]
    },
    "example": {
      "problem": "Warp 32: 16 lanes ejecutan rama A y 16 rama B, con costes iguales y sin solapamiento útil.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "La utilización de lanes puede aproximarse al 50% durante cada rama; el tiempo no se reduce a la mitad."
    },
    "check": {
      "question": "¿Todo if en un shader produce divergence?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Si la condición es uniforme para el grupo, todos siguen la misma ruta."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una condición idéntica para todas las lanes causa necesariamente divergence?",
        "answer": "no",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "16 lanes activas de 32 equivalen a ¿qué utilización instantánea?",
        "answer": "50%",
        "hint": "Si la condición es uniforme para el grupo, todos siguen la misma ruta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Nombre del proceso de volver a una ruta común después de branches divergentes.",
        "answer": "reconvergencia",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "reconvergence"
        ]
      }
    ]
  },
  "gpu-caches": {
    "id": "gpu-caches",
    "courseId": 35,
    "title": "GPU caches, localidad y consistencia",
    "shortTitle": "GPU caches, localidad y consistencia",
    "duration": 110,
    "objective": "Usar caches como parte de la jerarquía sin asumir coherencia, tamaño o política idénticos a CPU.",
    "summary": [
      "GPU modernas incluyen varios niveles/caches especializados, pero su topología y políticas dependen de arquitectura.",
      "Localidad temporal y espacial siguen importando, aunque el gran número de threads y streaming cambian patrones respecto a CPU.",
      "Cache hit no sustituye sincronización: visibilidad y orden de memoria se gobiernan por el memory model y las barreras adecuadas."
    ],
    "concept": "GPU modernas incluyen varios niveles/caches especializados, pero su topología y políticas dependen de arquitectura.",
    "rules": [
      "GPU modernas incluyen varios niveles/caches especializados, pero su topología y políticas dependen de arquitectura.",
      "Localidad temporal y espacial siguen importando, aunque el gran número de threads y streaming cambian patrones respecto a CPU.",
      "Cache hit no sustituye sincronización: visibilidad y orden de memoria se gobiernan por el memory model y las barreras adecuadas."
    ],
    "deep": {
      "intro": "Usar caches como parte de la jerarquía sin asumir coherencia, tamaño o política idénticos a CPU.",
      "sections": [
        {
          "title": "Caches generales",
          "body": "L1/L2 y caches de datos/instrucciones pueden existir con organización distinta por fabricante/generación."
        },
        {
          "title": "Caches especializadas",
          "body": "Texture/read-only caches están optimizadas para patrones concretos y pueden incluir lógica de sampling; no son equivalentes a una L1 CPU."
        },
        {
          "title": "Thrashing",
          "body": "Working sets grandes o strides desfavorables pueden expulsar datos rápidamente. Una cache grande no arregla un patrón sin reutilización."
        },
        {
          "title": "Memory model",
          "body": "Que una línea esté en cache no define por sí sola cuándo otro invocation observa un write. Atomics, scopes y barriers tienen semántica propia."
        }
      ]
    },
    "example": {
      "problem": "Dos lecturas consecutivas del mismo dato tienen alta localidad temporal.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "Podrían aprovechar cache, pero no existe garantía de hit sin conocer política/competencia."
    },
    "check": {
      "question": "¿Un cache hit constituye una barrera de memoria?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Cache y orden/visibilidad son conceptos distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Todas las GPU tienen exactamente la misma jerarquía de caches?",
        "answer": "no",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Reutilización temporal suele favorecer caches?",
        "answer": "si",
        "hint": "Cache y orden/visibilidad son conceptos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Qué concepto del modelo de memoria establece orden/visibilidad, no el hit de cache?",
        "answer": "sincronizacion",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "memory model",
          "barrera"
        ]
      }
    ]
  },
  "gpu-texture-units": {
    "id": "gpu-texture-units",
    "courseId": 35,
    "title": "Texture units y sampling dedicado",
    "shortTitle": "Texture units y sampling dedicado",
    "duration": 102,
    "objective": "Explicar qué trabajo pueden acelerar las unidades de textura y qué no pertenece a ellas.",
    "summary": [
      "Texture units realizan addressing, filtering y sampling de formatos de textura mediante hardware dedicado en muchas GPU.",
      "Nearest/bilinear/aniso y formatos concretos pueden apoyarse en unidades especializadas, pero los detalles y throughput varían.",
      "Texture cache y texture unit no sustituyen la ejecución shader: el shader sigue calculando coordenadas, lógica y composición."
    ],
    "concept": "Texture units realizan addressing, filtering y sampling de formatos de textura mediante hardware dedicado en muchas GPU.",
    "rules": [
      "Texture units realizan addressing, filtering y sampling de formatos de textura mediante hardware dedicado en muchas GPU.",
      "Nearest/bilinear/aniso y formatos concretos pueden apoyarse en unidades especializadas, pero los detalles y throughput varían.",
      "Texture cache y texture unit no sustituyen la ejecución shader: el shader sigue calculando coordenadas, lógica y composición."
    ],
    "deep": {
      "intro": "Explicar qué trabajo pueden acelerar las unidades de textura y qué no pertenece a ellas.",
      "sections": [
        {
          "title": "Addressing",
          "body": "Hardware puede aplicar wrap/clamp y convertir coordenadas a ubicaciones de texel según sampler/API."
        },
        {
          "title": "Filtering",
          "body": "Bilinear y otros filtros comunes pueden obtenerse eficientemente; anisotropía implica más muestras/huella y su implementación es específica."
        },
        {
          "title": "Format conversion",
          "body": "Sampling puede normalizar/convertir formatos según reglas del API, reduciendo trabajo explícito en shader."
        },
        {
          "title": "No es magia",
          "body": "Un texture fetch sigue teniendo dependencia y latencia. Si el patrón tiene mala localidad o demasiadas muestras, las unidades pueden saturarse."
        }
      ]
    },
    "example": {
      "problem": "Un shader hace cuatro samples bilineares por fragmento en vez de uno.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "La demanda sobre texture units/cache crece aproximadamente con el número de samples, aunque hits y scheduling alteran el coste real."
    },
    "check": {
      "question": "¿Texture unit y shader ALU son exactamente la misma unidad funcional?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Son recursos conceptualmente distintos que colaboran en el pipeline."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Bilinear sampling puede estar acelerado por hardware dedicado?",
        "answer": "si",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una texture cache elimina toda latencia de sampling?",
        "answer": "no",
        "hint": "Son recursos conceptualmente distintos que colaboran en el pipeline."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Objeto/API que describe filtering y addressing de una textura.",
        "answer": "sampler",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "muestreador"
        ]
      }
    ]
  },
  "gpu-rasterizer-fixed-function": {
    "id": "gpu-rasterizer-fixed-function",
    "courseId": 35,
    "title": "Rasterizer y fixed-function hardware",
    "shortTitle": "Rasterizer y fixed-function hardware",
    "duration": 106,
    "objective": "Separar etapas fijas del pipeline de ejecución shader programable y entender su paralelismo.",
    "summary": [
      "El rasterizer convierte primitivas en cobertura/fragments candidatos; no es simplemente “un shader más”.",
      "Clipping, setup, rasterización, interpolación, depth/stencil y blending pueden incluir hardware fixed-function especializado.",
      "El cuello de botella puede estar en geometría, raster, fragment shading, ROP/blending o memoria; “GPU bound” necesita localizar etapa."
    ],
    "concept": "El rasterizer convierte primitivas en cobertura/fragments candidatos; no es simplemente “un shader más”.",
    "rules": [
      "El rasterizer convierte primitivas en cobertura/fragments candidatos; no es simplemente “un shader más”.",
      "Clipping, setup, rasterización, interpolación, depth/stencil y blending pueden incluir hardware fixed-function especializado.",
      "El cuello de botella puede estar en geometría, raster, fragment shading, ROP/blending o memoria; “GPU bound” necesita localizar etapa."
    ],
    "deep": {
      "intro": "Separar etapas fijas del pipeline de ejecución shader programable y entender su paralelismo.",
      "sections": [
        {
          "title": "Frontend gráfico",
          "body": "Command processor y etapas geométricas preparan trabajo antes del raster. Las arquitecturas pueden fusionar o reorganizar etapas internamente."
        },
        {
          "title": "Rasterizer",
          "body": "Evalúa cobertura y genera trabajo por sample/fragment. El detalle de tile/binning vs immediate mode depende de arquitectura."
        },
        {
          "title": "Backend",
          "body": "Depth/stencil/blending y writes pueden tener unidades especializadas; overdraw puede consumir fragment shading y bandwidth."
        },
        {
          "title": "Perf counters",
          "body": "Para diagnosticar hay que observar occupancy, utilization, cache misses, primitive rate, overdraw, bandwidth y counters específicos, no inferir solo por FPS."
        }
      ]
    },
    "example": {
      "problem": "Escena mantiene mismo shader pero duplica overdraw opaco innecesario.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "Puede aumentar fragment work/bandwidth sin cambiar número de triángulos visibles finales."
    },
    "check": {
      "question": "¿Rasterizer y compute shader son la misma etapa programable?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Rasterizer pertenece al pipeline gráfico y realiza trabajo especializado de cobertura."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Overdraw puede aumentar trabajo aunque el framebuffer final muestre el mismo color visible?",
        "answer": "si",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Todas las GPU usan exactamente la misma arquitectura de rasterización interna?",
        "answer": "no",
        "hint": "Rasterizer pertenece al pipeline gráfico y realiza trabajo especializado de cobertura."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Nombre de la etapa que convierte primitivas en cobertura/fragments candidatos.",
        "answer": "rasterizer",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "rasterizador"
        ]
      }
    ]
  },
  "gpu-compute-workgroups": {
    "id": "gpu-compute-workgroups",
    "courseId": 35,
    "title": "Compute shaders, grids y workgroups",
    "shortTitle": "Compute shaders, grids y workgroups",
    "duration": 112,
    "objective": "Mapear dispatches de compute a invocations, workgroups y subgroups sin confundir niveles de sincronización.",
    "summary": [
      "Compute shaders ejecutan invocations organizadas en workgroups; el dispatch contiene múltiples workgroups independientes.",
      "Threads de un workgroup pueden cooperar mediante shared/LDS y barreras; una barrera local no sincroniza todo el dispatch.",
      "El tamaño del workgroup influye en occupancy, desperdicio de lanes, shared memory y mapping a warps/waves, pero no existe un tamaño universal óptimo."
    ],
    "concept": "Compute shaders ejecutan invocations organizadas en workgroups; el dispatch contiene múltiples workgroups independientes.",
    "rules": [
      "Compute shaders ejecutan invocations organizadas en workgroups; el dispatch contiene múltiples workgroups independientes.",
      "Threads de un workgroup pueden cooperar mediante shared/LDS y barreras; una barrera local no sincroniza todo el dispatch.",
      "El tamaño del workgroup influye en occupancy, desperdicio de lanes, shared memory y mapping a warps/waves, pero no existe un tamaño universal óptimo."
    ],
    "deep": {
      "intro": "Mapear dispatches de compute a invocations, workgroups y subgroups sin confundir niveles de sincronización.",
      "sections": [
        {
          "title": "Jerarquía lógica",
          "body": "Dispatch → workgroups → invocations. El hardware divide/agrupa invocations en subgroups/warps/waves según dispositivo."
        },
        {
          "title": "IDs",
          "body": "Global/local/workgroup IDs permiten mapear datos. El kernel debe validar límites cuando el dominio no es múltiplo exacto del group size."
        },
        {
          "title": "Sincronización",
          "body": "Barrier de workgroup coordina invocations del grupo bajo scopes concretos. Para coordinación global suelen requerirse dispatches separados, atomics/protocolos o mecanismos de API."
        },
        {
          "title": "Elección de tamaño",
          "body": "Múltiplos del subgroup suelen evitar lanes ociosas, pero registros, LDS y forma 2D/3D también importan. Se mide por dispositivo objetivo."
        }
      ]
    },
    "example": {
      "problem": "Procesas N=1000 elementos con grupos de 256.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "Necesitas ceil(1000/256)=4 grupos y el kernel debe descartar IDs ≥1000."
    },
    "check": {
      "question": "¿Una barrera de workgroup sincroniza todos los workgroups del dispatch?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Su alcance es local al workgroup salvo mecanismos adicionales del modelo/API."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "ceil(1000/256) = ¿cuántos workgroups?",
        "answer": "4",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El último grupo puede contener invocations fuera del dominio lógico?",
        "answer": "si",
        "hint": "Su alcance es local al workgroup salvo mecanismos adicionales del modelo/API."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Nivel lógico que comparte scratchpad y barreras locales en compute.",
        "answer": "workgroup",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "grupo de trabajo",
          "thread block",
          "block"
        ]
      }
    ]
  },
  "gpu-integration-performance": {
    "id": "gpu-integration-performance",
    "courseId": 35,
    "title": "Diagnóstico integrado: compute, memoria y scheduling",
    "shortTitle": "Diagnóstico integrado: compute, memoria y scheduling",
    "duration": 120,
    "objective": "Construir una metodología reproducible para localizar cuellos de botella GPU antes de optimizar.",
    "summary": [
      "Perfil primero: tiempo de GPU/CPU, occupancy, bandwidth, cache, stalls, divergence y utilización de unidades cuentan historias diferentes.",
      "Optimizar exige formular una hipótesis causal y comparar una variante controlada; FPS aislado no identifica el cuello de botella.",
      "El rendimiento portable requiere evitar supuestos rígidos de warp/subgroup, validar límites y documentar arquitectura/API/driver."
    ],
    "concept": "Perfil primero: tiempo de GPU/CPU, occupancy, bandwidth, cache, stalls, divergence y utilización de unidades cuentan historias diferentes.",
    "rules": [
      "Perfil primero: tiempo de GPU/CPU, occupancy, bandwidth, cache, stalls, divergence y utilización de unidades cuentan historias diferentes.",
      "Optimizar exige formular una hipótesis causal y comparar una variante controlada; FPS aislado no identifica el cuello de botella.",
      "El rendimiento portable requiere evitar supuestos rígidos de warp/subgroup, validar límites y documentar arquitectura/API/driver."
    ],
    "deep": {
      "intro": "Construir una metodología reproducible para localizar cuellos de botella GPU antes de optimizar.",
      "sections": [
        {
          "title": "Baseline",
          "body": "Fija escena/dataset, resolución, clocks cuando sea posible, warm-up y múltiples repeticiones. Separa tiempo de CPU, submit, queue y GPU."
        },
        {
          "title": "Clasificación",
          "body": "Pregunta si el kernel está compute-bound, bandwidth-bound, latency-bound, launch-bound o synchronization-bound. Roofline/counters ayudan a descartar hipótesis."
        },
        {
          "title": "Experimentos",
          "body": "Reduce resolución, bytes, operaciones, branches o workgroup size de uno en uno. Una mejora predicha por la hipótesis fortalece la explicación."
        },
        {
          "title": "Portabilidad",
          "body": "No hardcodees warpSize salvo contrato del backend; consulta subgroup/device limits y conserva caminos alternativos cuando el algoritmo lo necesite."
        }
      ]
    },
    "example": {
      "problem": "Reducir a la mitad las operaciones ALU no cambia tiempo, pero reducir bytes globales 40% mejora casi 35%.",
      "steps": [
        "Identifica la magnitud y el nivel arquitectónico relevante.",
        "Aplica la relación cuantitativa sin asumir detalles no declarados.",
        "Interpreta el resultado como límite/modelo, no como promesa universal."
      ],
      "solution": "Evidencia compatible con cuello de botella de memoria más que aritmético."
    },
    "check": {
      "question": "¿Una occupancy baja demuestra por sí sola que ese es el cuello de botella?",
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
          "Depende solo del número de cores",
          false
        ]
      ],
      "feedback": "Hay que relacionarla con stalls, throughput y cambios experimentales."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debe medirse antes de optimizar?",
        "answer": "si",
        "hint": "Distingue el concepto central de la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Si bajar ALU no cambia tiempo pero bajar bytes sí, ¿memory-bound es una hipótesis razonable?",
        "answer": "si",
        "hint": "Hay que relacionarla con stalls, throughput y cambios experimentales."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Nombre del método que compara ceilings de compute y bandwidth usando arithmetic intensity.",
        "answer": "roofline",
        "hint": "Relaciona el término con su alcance y garantía exactos.",
        "alternatives": [
          "modelo roofline"
        ]
      }
    ]
  }
});
