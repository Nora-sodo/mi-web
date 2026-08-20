/**
 * BLOQUE 036 — Shaders y APIs gráficas
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar lenguaje shader, IR, pipeline state, recursos,
 * command submission y sincronización. Una API válida no elimina hazards;
 * los contratos de lifetime y memoria deben demostrarse explícitamente.
 */
window.LEARNING_PATHS[36] = {
  "level": "Experto progresivo",
  "estimatedHours": 122,
  "description": "Programación gráfica moderna desde shader stages y GLSL/SPIR-V hasta modelos OpenGL/Vulkan, recursos, descriptors, command submission y synchronization.",
  "outcomes": [
    "Distinguir etapas shader, lenguaje fuente, IR y pipeline executable.",
    "Comparar el modelo de estado implícito de OpenGL con el control explícito de Vulkan sin caricaturizar ninguno.",
    "Diseñar recursos y bindings coherentes entre host, shaders y pipeline layouts.",
    "Construir un frame con command buffers y dependencias de ejecución/memoria correctas."
  ],
  "modules": [
    {
      "id": "m1-shaders",
      "title": "Shaders y compilación",
      "description": "Etapas, GLSL, toolchain y SPIR-V",
      "lessons": [
        "api-shader-stages",
        "api-glsl",
        "api-shader-toolchain",
        "api-spirv"
      ]
    },
    {
      "id": "m2-apis",
      "title": "Modelos de API",
      "description": "OpenGL, Vulkan y pipeline state",
      "lessons": [
        "api-opengl",
        "api-vulkan-model",
        "api-pipelines"
      ]
    },
    {
      "id": "m3-resources",
      "title": "Recursos y binding",
      "description": "Buffers, images, uniforms y descriptors",
      "lessons": [
        "api-buffers-memory",
        "api-images-textures",
        "api-uniforms-resources",
        "api-descriptor-sets"
      ]
    },
    {
      "id": "m4-submission",
      "title": "Rendering y sincronización",
      "description": "Render scopes, command buffers, sync e integración",
      "lessons": [
        "api-rendering-passes",
        "api-command-buffers",
        "api-synchronization",
        "api-integration-frame"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "api-shader-stages": {
    "id": "api-shader-stages",
    "courseId": 36,
    "title": "Shader stages: vertex, fragment y compute",
    "shortTitle": "Shader stages: vertex, fragment y compute",
    "duration": 100,
    "objective": "Distinguir las etapas programables principales y sus contratos de entrada/salida sin confundir invocación shader, primitive, fragment y thread lógico.",
    "summary": [
      "Un vertex shader procesa invocaciones asociadas a vértices y produce, entre otros valores, posición en clip space; no rasteriza triángulos por sí solo.",
      "Un fragment shader procesa fragments generados por rasterización y puede producir outputs de color/depth, pero un fragment todavía puede fallar tests posteriores.",
      "Un compute shader no pertenece al pipeline de rasterización: ejecuta workgroups/invocations sobre recursos generales y exige sincronización explícita según el modelo de la API."
    ],
    "concept": "Un vertex shader procesa invocaciones asociadas a vértices y produce, entre otros valores, posición en clip space; no rasteriza triángulos por sí solo.",
    "rules": [
      "Un vertex shader procesa invocaciones asociadas a vértices y produce, entre otros valores, posición en clip space; no rasteriza triángulos por sí solo.",
      "Un fragment shader procesa fragments generados por rasterización y puede producir outputs de color/depth, pero un fragment todavía puede fallar tests posteriores.",
      "Un compute shader no pertenece al pipeline de rasterización: ejecuta workgroups/invocations sobre recursos generales y exige sincronización explícita según el modelo de la API."
    ],
    "deep": {
      "intro": "Distinguir las etapas programables principales y sus contratos de entrada/salida sin confundir invocación shader, primitive, fragment y thread lógico.",
      "sections": [
        {
          "title": "Vertex",
          "body": "El vertex shader transforma atributos por invocación y comunica varyings a etapas posteriores. La posición de salida alimenta primitive assembly/clipping; una llamada no equivale a un triángulo completo."
        },
        {
          "title": "Fragment",
          "body": "El fragment shader ejecuta sobre fragments candidatos. En OpenGL se llama fragment shader; Direct3D usa tradicionalmente pixel shader, pero el concepto de fragment/pixel no debe confundirse con un píxel ya escrito."
        },
        {
          "title": "Compute",
          "body": "Compute se lanza mediante dispatch y organiza trabajo en workgroups e invocations. No hay rasterizador que genere el trabajo: el programa calcula IDs y accede a buffers/images explícitamente."
        },
        {
          "title": "Interfaces",
          "body": "Cada etapa tiene un contrato de entradas, salidas, recursos y built-ins. Enlazar etapas requiere interfaces compatibles; el driver/compilador no puede adivinar una convención ausente."
        }
      ]
    },
    "example": {
      "problem": "Un draw procesa 3 vértices y genera 120 fragments; ¿cuántas invocaciones mínimas conceptuales hay?",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "3 vertex invocations y hasta 120 fragment invocations antes de considerar optimizaciones/early tests; no son 123 píxeles garantizados."
    },
    "check": {
      "question": "¿Un fragment shader escribe necesariamente un píxel visible?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "El fragment puede ser descartado o fallar depth/stencil."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un compute shader necesita rasterización para crear invocations?",
        "answer": "no",
        "hint": "Compute usa dispatch."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La salida de posición de un vertex shader está normalmente en clip space antes del divide por w?",
        "answer": "si",
        "hint": "Conecta con el bloque de gráficos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cómo se llama tradicionalmente en Direct3D la etapa análoga al fragment shader?",
        "answer": "pixel shader",
        "hint": "Es una diferencia de nomenclatura/API."
      }
    ]
  },
  "api-glsl": {
    "id": "api-glsl",
    "courseId": 36,
    "title": "GLSL: tipos, interfaces y storage qualifiers",
    "shortTitle": "GLSL: tipos, interfaces y storage qualifiers",
    "duration": 105,
    "objective": "Leer y escribir GLSL entendiendo tipos vectoriales/matriciales, qualifiers, interfaces y diferencias de perfil/versión.",
    "summary": [
      "GLSL es un lenguaje de shading especificado por Khronos; su semántica depende de versión, perfil y entorno cliente.",
      "`in`/`out`, uniform/storage blocks y layout qualifiers forman contratos entre etapas y API; no son simples variables globales de C.",
      "El layout de memoria de structs/buffers depende de reglas explícitas y extensiones/entorno; copiar una struct C byte a byte sin verificar layout es una fuente clásica de bugs."
    ],
    "concept": "GLSL es un lenguaje de shading especificado por Khronos; su semántica depende de versión, perfil y entorno cliente.",
    "rules": [
      "GLSL es un lenguaje de shading especificado por Khronos; su semántica depende de versión, perfil y entorno cliente.",
      "`in`/`out`, uniform/storage blocks y layout qualifiers forman contratos entre etapas y API; no son simples variables globales de C.",
      "El layout de memoria de structs/buffers depende de reglas explícitas y extensiones/entorno; copiar una struct C byte a byte sin verificar layout es una fuente clásica de bugs."
    ],
    "deep": {
      "intro": "Leer y escribir GLSL entendiendo tipos vectoriales/matriciales, qualifiers, interfaces y diferencias de perfil/versión.",
      "sections": [
        {
          "title": "Versión y entorno",
          "body": "`#version` selecciona versión del lenguaje; OpenGL GLSL y GLSL para Vulkan comparten sintaxis pero el entorno/SPIR-V introduce reglas y extensiones distintas."
        },
        {
          "title": "Tipos y precisión",
          "body": "Vectores, matrices y tipos escalares tienen operaciones definidas por GLSL. Matrices no deben mezclarse con convenciones row/column de otras APIs sin revisar semántica y layout."
        },
        {
          "title": "Interfaces",
          "body": "`in` y `out` describen datos entre etapas; locations permiten contratos explícitos. Los nombres pueden dejar de importar cuando el enlace se basa en locations, pero tipos y cantidades siguen siendo relevantes."
        },
        {
          "title": "Layouts",
          "body": "UBO/SSBO y recursos necesitan layouts compatibles con el host. Offset, alignment y stride deben derivarse de las reglas del layout elegido, no de `sizeof` asumido."
        }
      ]
    },
    "example": {
      "problem": "Host escribe vec3+float consecutivos suponiendo 16 bytes totales en cualquier uniform block.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "Ese supuesto no es universal: hay que aplicar las reglas de layout del bloque/entorno y comprobar offsets; usar reflection o layouts explícitos cuando proceda."
    },
    "check": {
      "question": "¿Una struct C y un uniform block GLSL con campos de igual nombre garantizan el mismo layout binario?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "La ABI/layout del host y las reglas shader son contratos distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿`in` y `out` expresan interfaces entre etapas?",
        "answer": "si",
        "hint": "Piensa en contratos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cambiar `#version` puede cambiar qué sintaxis/semántica GLSL está disponible?",
        "answer": "si",
        "hint": "La versión forma parte del lenguaje."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debes calcular offsets de UBO según reglas del layout y no por intuición?",
        "answer": "si",
        "hint": "El padding importa."
      }
    ]
  },
  "api-shader-toolchain": {
    "id": "api-shader-toolchain",
    "courseId": 36,
    "title": "Toolchain de shaders: fuente, IR, validación y reflexión",
    "shortTitle": "Toolchain de shaders: fuente, IR, validación y reflexión",
    "duration": 108,
    "objective": "Seguir un shader desde fuente hasta módulo ejecutable y distinguir compilación offline, runtime, validación, optimización y reflexión.",
    "summary": [
      "Fuente GLSL/HLSL es una representación; la API puede consumir binarios/IR como SPIR-V o DXIL según plataforma.",
      "Compilar sin errores no demuestra que el módulo sea compatible con todas las features, layouts, interfaces o pipeline state del dispositivo.",
      "Reflection extrae metadata útil de recursos/interfaces, pero no sustituye el contrato de versión, features y sincronización del programa."
    ],
    "concept": "Fuente GLSL/HLSL es una representación; la API puede consumir binarios/IR como SPIR-V o DXIL según plataforma.",
    "rules": [
      "Fuente GLSL/HLSL es una representación; la API puede consumir binarios/IR como SPIR-V o DXIL según plataforma.",
      "Compilar sin errores no demuestra que el módulo sea compatible con todas las features, layouts, interfaces o pipeline state del dispositivo.",
      "Reflection extrae metadata útil de recursos/interfaces, pero no sustituye el contrato de versión, features y sincronización del programa."
    ],
    "deep": {
      "intro": "Seguir un shader desde fuente hasta módulo ejecutable y distinguir compilación offline, runtime, validación, optimización y reflexión.",
      "sections": [
        {
          "title": "Pipeline de compilación",
          "body": "Fuente → frontend → IR → optimización → binario/IR de API → driver/backend. Distintas herramientas pueden hacer optimizaciones en etapas diferentes."
        },
        {
          "title": "Offline vs runtime",
          "body": "Compilar offline mejora reproducibilidad y startup; runtime compilation permite variantes dinámicas. Ambas requieren cache/versionado y manejo de diagnósticos."
        },
        {
          "title": "Validación",
          "body": "SPIR-V puede validarse estructuralmente, pero además debe ser válido para el entorno Vulkan y las capacidades habilitadas. 'Valida' no significa 'rápido' ni 'correcto visualmente'."
        },
        {
          "title": "Reflection",
          "body": "Bindings, sets, locations y push constants pueden inspeccionarse para construir interfaces del host; aun así la aplicación debe decidir lifetimes, ownership y sincronización."
        }
      ]
    },
    "example": {
      "problem": "Un shader compila offline pero falla al crear pipeline en otra GPU.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "La fuente puede ser válida, pero el módulo/pipeline puede requerir una feature, formato, límite o interfaz no soportada/configurada en ese dispositivo."
    },
    "check": {
      "question": "¿Compilar un shader con éxito garantiza que el pipeline Vulkan será válido en cualquier dispositivo?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "Pipeline y dispositivo añaden requisitos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿SPIR-V es código fuente GLSL?",
        "answer": "no",
        "hint": "Es una representación intermedia binaria."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Reflection puede descubrir bindings declarados?",
        "answer": "si",
        "hint": "Pero no la política completa de sincronización."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Versionar shaders compilados junto con su toolchain ayuda a reproducibilidad?",
        "answer": "si",
        "hint": "El compilador también es una dependencia."
      }
    ]
  },
  "api-spirv": {
    "id": "api-spirv",
    "courseId": 36,
    "title": "SPIR-V: módulos, entry points y decorations",
    "shortTitle": "SPIR-V: módulos, entry points y decorations",
    "duration": 112,
    "objective": "Entender SPIR-V como IR binaria tipada para gráficos/compute y relacionar entry points, storage classes, capabilities y decorations con la API.",
    "summary": [
      "SPIR-V es una representación intermedia binaria estandarizada; no es bytecode universal que ignore el entorno cliente.",
      "Un módulo puede contener entry points y funciones; Execution Model, capabilities y decorations describen contratos que la API debe respetar.",
      "`DescriptorSet`, `Binding` y `Location` conectan variables SPIR-V con recursos e interfaces definidos por el cliente."
    ],
    "concept": "SPIR-V es una representación intermedia binaria estandarizada; no es bytecode universal que ignore el entorno cliente.",
    "rules": [
      "SPIR-V es una representación intermedia binaria estandarizada; no es bytecode universal que ignore el entorno cliente.",
      "Un módulo puede contener entry points y funciones; Execution Model, capabilities y decorations describen contratos que la API debe respetar.",
      "`DescriptorSet`, `Binding` y `Location` conectan variables SPIR-V con recursos e interfaces definidos por el cliente."
    ],
    "deep": {
      "intro": "Entender SPIR-V como IR binaria tipada para gráficos/compute y relacionar entry points, storage classes, capabilities y decorations con la API.",
      "sections": [
        {
          "title": "Módulo",
          "body": "SPIR-V es una secuencia de palabras de 32 bits con tipos, instrucciones, funciones y metadata. La estructura permite validación y tooling sin depender del lenguaje fuente."
        },
        {
          "title": "Entry points",
          "body": "Cada entry point declara Execution Model como Vertex, Fragment o GLCompute y sus interfaces. Un mismo módulo puede conceptualmente contener más de un entry point."
        },
        {
          "title": "Capabilities",
          "body": "Las capabilities declaran familias de funcionalidad que el módulo usa. El entorno cliente determina cuáles son legales/soportadas y qué extensiones/features se necesitan."
        },
        {
          "title": "Decorations",
          "body": "Decorations como Location, Binding y DescriptorSet enlazan variables con el contrato del pipeline/API; los números no 'buscan' recursos por nombre."
        }
      ]
    },
    "example": {
      "problem": "SPIR-V declara DescriptorSet=2, Binding=5 para una imagen.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "El pipeline layout/descriptor set del host debe proporcionar un descriptor compatible en set 2 binding 5; un nombre de variable coincidente no compensa un binding incorrecto."
    },
    "check": {
      "question": "¿SPIR-V elimina la necesidad de respetar el entorno Vulkan y sus features?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "SPIR-V se valida dentro de un entorno cliente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿SPIR-V es una representación binaria estandarizada?",
        "answer": "si",
        "hint": "IR, no fuente."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿`Binding` y `DescriptorSet` participan en el enlace con recursos de la API?",
        "answer": "si",
        "hint": "Son decorations de interfaz."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una capability usada por el módulo puede requerir soporte/feature del dispositivo?",
        "answer": "si",
        "hint": "El módulo no crea hardware inexistente."
      }
    ]
  },
  "api-opengl": {
    "id": "api-opengl",
    "courseId": 36,
    "title": "OpenGL: contexto, state machine y objetos",
    "shortTitle": "OpenGL: contexto, state machine y objetos",
    "duration": 108,
    "objective": "Modelar OpenGL como API con contexto y estado mutable, entendiendo programas, VAO, buffers, texturas y draw calls sin extrapolarlo a Vulkan.",
    "summary": [
      "OpenGL 4.6 core mantiene un contexto con estado; muchas llamadas modifican estado que draws posteriores consumen.",
      "Objetos como buffers, textures, VAO y programs encapsulan recursos/estado, pero binding y lifetime siguen el modelo OpenGL.",
      "El driver realiza mucha validación y traducción implícita; comodidad de API no significa ausencia de sincronización o coste."
    ],
    "concept": "OpenGL 4.6 core mantiene un contexto con estado; muchas llamadas modifican estado que draws posteriores consumen.",
    "rules": [
      "OpenGL 4.6 core mantiene un contexto con estado; muchas llamadas modifican estado que draws posteriores consumen.",
      "Objetos como buffers, textures, VAO y programs encapsulan recursos/estado, pero binding y lifetime siguen el modelo OpenGL.",
      "El driver realiza mucha validación y traducción implícita; comodidad de API no significa ausencia de sincronización o coste."
    ],
    "deep": {
      "intro": "Modelar OpenGL como API con contexto y estado mutable, entendiendo programas, VAO, buffers, texturas y draw calls sin extrapolarlo a Vulkan.",
      "sections": [
        {
          "title": "Contexto",
          "body": "El contexto contiene el estado OpenGL actual. Una llamada como bind cambia qué objeto recibe operaciones posteriores según el target/slot correspondiente."
        },
        {
          "title": "Program y VAO",
          "body": "Un program enlaza stages shaders; el VAO describe cómo fetch de vértices interpreta buffers. Ninguno contiene por sí solo todos los recursos del draw."
        },
        {
          "title": "Estado mutable",
          "body": "Blend, depth, viewport, bindings y otros estados pueden cambiar entre draws. Bugs de 'estado fantasma' aparecen cuando una función depende de estado configurado lejos."
        },
        {
          "title": "Driver",
          "body": "OpenGL oculta decisiones de memoria, command submission y hazard tracking en mayor medida que Vulkan. Eso simplifica API pero puede mover trabajo al driver."
        }
      ]
    },
    "example": {
      "problem": "Una función dibuja bien solo si otra función anterior dejó la textura correcta ligada.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "Hay una dependencia oculta de state machine. Encapsula/establece el estado requerido explícitamente o usa patrones/objetos que reduzcan estado implícito."
    },
    "check": {
      "question": "¿OpenGL y Vulkan exponen exactamente el mismo modelo de estado y sincronización?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "Vulkan hace mucho más explícitos recursos, comandos y dependencias."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un bind de OpenGL puede afectar llamadas posteriores del contexto?",
        "answer": "si",
        "hint": "State machine."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un VAO contiene el contenido completo del vertex buffer?",
        "answer": "no",
        "hint": "Describe bindings/formato; el buffer es recurso separado."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Que OpenGL oculte hazard tracking significa que los hazards no existen en GPU?",
        "answer": "no",
        "hint": "Los gestiona en mayor medida el driver/API."
      }
    ]
  },
  "api-vulkan-model": {
    "id": "api-vulkan-model",
    "courseId": 36,
    "title": "Vulkan: objetos, queues y control explícito",
    "shortTitle": "Vulkan: objetos, queues y control explícito",
    "duration": 115,
    "objective": "Entender el modelo explícito de Vulkan: instance/device, queues, recursos, command buffers y responsabilidad de la aplicación.",
    "summary": [
      "Vulkan separa instance, physical device, logical device, queues y objetos de recursos; las capabilities se consultan y habilitan explícitamente.",
      "El trabajo se registra en command buffers y se somete a queues; que el thread CPU termine de grabar no significa que la GPU haya ejecutado el trabajo.",
      "Vulkan reduce estado implícito y trabajo del driver, pero traslada al programa más responsabilidad de lifetimes, synchronization y compatibilidad."
    ],
    "concept": "Vulkan separa instance, physical device, logical device, queues y objetos de recursos; las capabilities se consultan y habilitan explícitamente.",
    "rules": [
      "Vulkan separa instance, physical device, logical device, queues y objetos de recursos; las capabilities se consultan y habilitan explícitamente.",
      "El trabajo se registra en command buffers y se somete a queues; que el thread CPU termine de grabar no significa que la GPU haya ejecutado el trabajo.",
      "Vulkan reduce estado implícito y trabajo del driver, pero traslada al programa más responsabilidad de lifetimes, synchronization y compatibilidad."
    ],
    "deep": {
      "intro": "Entender el modelo explícito de Vulkan: instance/device, queues, recursos, command buffers y responsabilidad de la aplicación.",
      "sections": [
        {
          "title": "Dispositivo",
          "body": "Physical device expone properties/features/limits; logical device habilita un subconjunto y crea colas/objetos. No se debe asumir que toda extensión presente está habilitada."
        },
        {
          "title": "Queues",
          "body": "Queue families declaran capacidades. Graphics, compute, transfer y present pueden compartir o no familias; el diseño debe consultar el dispositivo."
        },
        {
          "title": "Objetos explícitos",
          "body": "Buffers, images, views, samplers, pipeline layouts, descriptor sets y sync objects tienen lifetimes concretos. Destruir un recurso todavía usado por GPU es un bug aunque el handle CPU ya no se toque."
        },
        {
          "title": "Validación",
          "body": "Validation layers ayudan a detectar mal uso de API, pero no prueban ausencia de races lógicas ni rendimiento correcto."
        }
      ]
    },
    "example": {
      "problem": "CPU destruye un buffer justo después de `vkQueueSubmit` porque la llamada ya retornó.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "Incorrecto salvo que exista garantía de que el trabajo ya terminó. Submission es asíncrona; usa fences/timeline semaphores u otra sincronización/lifetime seguro."
    },
    "check": {
      "question": "¿Retornar de `vkQueueSubmit` implica que la GPU terminó el trabajo?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "Submission y completion son eventos distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Features Vulkan deben consultarse y habilitarse?",
        "answer": "si",
        "hint": "No asumas capacidades."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una queue family define capacidades de las queues?",
        "answer": "si",
        "hint": "Graphics/compute/transfer/present pueden variar."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validation layers sustituyen pruebas de rendimiento?",
        "answer": "no",
        "hint": "Validación de API y performance son cosas distintas."
      }
    ]
  },
  "api-pipelines": {
    "id": "api-pipelines",
    "courseId": 36,
    "title": "Pipeline state: graphics, compute y compatibilidad",
    "shortTitle": "Pipeline state: graphics, compute y compatibilidad",
    "duration": 110,
    "objective": "Distinguir pipeline executable, pipeline layout, fixed-function state y dynamic state, y entender por qué crear pipelines suele ser costoso.",
    "summary": [
      "Un graphics pipeline combina shader stages con gran parte del fixed-function state y formatos/compatibilidades relevantes; compute usa un pipeline distinto.",
      "Pipeline layout define la interfaz de descriptor sets y push constants; no contiene por sí solo los recursos concretos.",
      "Parte del estado puede ser dinámica según API/features, pero 'dynamic' significa que se suministra en command recording, no que deje de existir."
    ],
    "concept": "Un graphics pipeline combina shader stages con gran parte del fixed-function state y formatos/compatibilidades relevantes; compute usa un pipeline distinto.",
    "rules": [
      "Un graphics pipeline combina shader stages con gran parte del fixed-function state y formatos/compatibilidades relevantes; compute usa un pipeline distinto.",
      "Pipeline layout define la interfaz de descriptor sets y push constants; no contiene por sí solo los recursos concretos.",
      "Parte del estado puede ser dinámica según API/features, pero 'dynamic' significa que se suministra en command recording, no que deje de existir."
    ],
    "deep": {
      "intro": "Distinguir pipeline executable, pipeline layout, fixed-function state y dynamic state, y entender por qué crear pipelines suele ser costoso.",
      "sections": [
        {
          "title": "Graphics pipeline",
          "body": "Agrupa stages programables y estado de input assembly, rasterización, multisampling, depth/stencil, blending y compatibilidad de targets según el modelo usado."
        },
        {
          "title": "Compute pipeline",
          "body": "Tiene un compute shader y layout, sin rasterizador ni attachments de color. Sigue usando recursos, descriptors y sincronización."
        },
        {
          "title": "Pipeline layout",
          "body": "Describe sets/bindings visibles y rangos push constant. Descriptor set layout y pipeline layout son esquemas; descriptor set contiene referencias concretas."
        },
        {
          "title": "Compilación/cache",
          "body": "Crear pipelines puede disparar compilación/optimización. Precompilar/cachear variantes reduce stutter; una explosión combinatoria de variantes también tiene coste."
        }
      ]
    },
    "example": {
      "problem": "Cambias únicamente el color de un material y recompilas el pipeline por cada objeto.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "Normalmente el color pertenece a datos de recurso/push constant/uniform, no a una variante de pipeline; separar estado de programa de datos evita combinaciones innecesarias."
    },
    "check": {
      "question": "¿Pipeline layout contiene directamente todos los buffers y textures usados en un draw?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "Describe la interfaz; los recursos concretos se enlazan aparte."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Graphics pipeline y compute pipeline son el mismo objeto lógico?",
        "answer": "no",
        "hint": "Tienen etapas diferentes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Dynamic state sigue siendo estado requerido aunque no esté horneado en el pipeline?",
        "answer": "si",
        "hint": "Se establece al grabar comandos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Crear demasiadas variantes de pipeline puede causar stutter/cache pressure?",
        "answer": "si",
        "hint": "La compilación tiene coste."
      }
    ]
  },
  "api-buffers-memory": {
    "id": "api-buffers-memory",
    "courseId": 36,
    "title": "Buffers, memoria y transferencias",
    "shortTitle": "Buffers, memoria y transferencias",
    "duration": 112,
    "objective": "Gestionar buffers distinguiendo objeto, memoria, visibilidad host/device, staging y hazards de acceso.",
    "summary": [
      "Un buffer describe un rango y usos; la memoria que lo respalda puede tener propiedades distintas y en Vulkan se gestiona explícitamente.",
      "Host-visible no implica necesariamente host-coherent; flush/invalidate pueden ser necesarios según las memory properties y el patrón de mapeo.",
      "Staging copia datos entre memoria adecuada para CPU y memoria adecuada para GPU; copiar bytes no sincroniza automáticamente futuros consumidores."
    ],
    "concept": "Un buffer describe un rango y usos; la memoria que lo respalda puede tener propiedades distintas y en Vulkan se gestiona explícitamente.",
    "rules": [
      "Un buffer describe un rango y usos; la memoria que lo respalda puede tener propiedades distintas y en Vulkan se gestiona explícitamente.",
      "Host-visible no implica necesariamente host-coherent; flush/invalidate pueden ser necesarios según las memory properties y el patrón de mapeo.",
      "Staging copia datos entre memoria adecuada para CPU y memoria adecuada para GPU; copiar bytes no sincroniza automáticamente futuros consumidores."
    ],
    "deep": {
      "intro": "Gestionar buffers distinguiendo objeto, memoria, visibilidad host/device, staging y hazards de acceso.",
      "sections": [
        {
          "title": "Buffer vs memory",
          "body": "En Vulkan el buffer y la device memory son conceptos separados; allocator/suballocation suelen agrupar múltiples recursos sobre grandes allocations."
        },
        {
          "title": "Host visibility",
          "body": "Mapped memory permite acceso CPU cuando la memoria lo soporta. Coherencia define si writes/reads requieren operaciones explícitas de flush/invalidate."
        },
        {
          "title": "Staging",
          "body": "Un staging buffer host-visible puede alimentar un buffer device-local mediante transfer. La copia se graba como comando y requiere dependencias antes de que otro stage consuma los datos."
        },
        {
          "title": "Hazards",
          "body": "RAW, WAR y WAW describen dependencias de datos. El hecho de que dos comandos aparezcan en el mismo command buffer no crea por sí solo toda la visibilidad de memoria requerida."
        }
      ]
    },
    "example": {
      "problem": "CPU llena staging, GPU copia a vertex buffer y el draw consume el buffer inmediatamente.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "Debe existir orden/visibilidad correctos entre host write → transfer read → transfer write → vertex input read, usando las reglas de sincronización de la API."
    },
    "check": {
      "question": "¿Host-visible implica siempre host-coherent en Vulkan?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "Son propiedades distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Buffer y allocation de memoria son conceptos separados en Vulkan?",
        "answer": "si",
        "hint": "Objeto vs backing memory."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Staging es útil para subir datos a memoria device-local?",
        "answer": "si",
        "hint": "Patrón común."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una copia de buffer elimina la necesidad de sincronizar al consumidor posterior?",
        "answer": "no",
        "hint": "El hazard sigue existiendo."
      }
    ]
  },
  "api-images-textures": {
    "id": "api-images-textures",
    "courseId": 36,
    "title": "Images, textures, views y samplers",
    "shortTitle": "Images, textures, views y samplers",
    "duration": 114,
    "objective": "Separar image storage, image view, sampler, layout y sampled/storage usage en APIs gráficas modernas.",
    "summary": [
      "Una image almacena texels con dimensiones/formato/usage; una image view selecciona cómo interpretar una subregión/aspect del recurso.",
      "Sampler describe addressing/filtering y puede estar separado de la image; 'texture' suele ser una abstracción de aplicación que combina varios objetos.",
      "En Vulkan los image layouts forman parte del estado de uso/sincronización; una transición no convierte mágicamente el formato ni copia datos."
    ],
    "concept": "Una image almacena texels con dimensiones/formato/usage; una image view selecciona cómo interpretar una subregión/aspect del recurso.",
    "rules": [
      "Una image almacena texels con dimensiones/formato/usage; una image view selecciona cómo interpretar una subregión/aspect del recurso.",
      "Sampler describe addressing/filtering y puede estar separado de la image; 'texture' suele ser una abstracción de aplicación que combina varios objetos.",
      "En Vulkan los image layouts forman parte del estado de uso/sincronización; una transición no convierte mágicamente el formato ni copia datos."
    ],
    "deep": {
      "intro": "Separar image storage, image view, sampler, layout y sampled/storage usage en APIs gráficas modernas.",
      "sections": [
        {
          "title": "Image",
          "body": "Las images tienen formatos, mip levels, array layers, sample counts y usage flags. Color, depth/stencil y storage/sampled usos tienen requisitos distintos."
        },
        {
          "title": "View",
          "body": "Una view elige formato compatible, aspect, mip range y layers para acceder a la image. Varias views pueden referirse al mismo storage con diferentes rangos permitidos."
        },
        {
          "title": "Sampler",
          "body": "Filtering, LOD y address modes viven en un sampler en modelos separados. Mismo image view puede usarse con samplers distintos."
        },
        {
          "title": "Layouts",
          "body": "Vulkan usa layouts para describir organización/uso esperado de images. Transiciones se coordinan mediante dependencias; el layout correcto por sí solo no resuelve un race."
        }
      ]
    },
    "example": {
      "problem": "Una image acaba de recibir un transfer write y se usará como sampled texture.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "Se necesita una dependencia que haga visible el transfer write al shader read y, si corresponde, transición al layout apropiado para sampling."
    },
    "check": {
      "question": "¿Un image layout Vulkan es simplemente el formato de píxel?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "Formato y layout/estado de uso son conceptos distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una image view puede seleccionar mip levels concretos?",
        "answer": "si",
        "hint": "La view describe una subregión/aspect."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Sampler y image pueden ser objetos separados?",
        "answer": "si",
        "hint": "Filtrado y storage no son lo mismo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cambiar layout por sí solo garantiza ausencia de race?",
        "answer": "no",
        "hint": "La dependencia de memoria también importa."
      }
    ]
  },
  "api-uniforms-resources": {
    "id": "api-uniforms-resources",
    "courseId": 36,
    "title": "Uniforms, storage buffers y push constants",
    "shortTitle": "Uniforms, storage buffers y push constants",
    "duration": 108,
    "objective": "Elegir mecanismos de datos shader según tamaño, frecuencia de cambio y patrones de acceso.",
    "summary": [
      "Uniform/constant buffers están pensados para datos de lectura uniforme/estructurada; storage buffers permiten accesos más generales y potencialmente escrituras.",
      "Push constants ofrecen un rango pequeño de datos de baja latencia vinculado al pipeline layout; su capacidad exacta se consulta al dispositivo.",
      "Elegir mecanismo de binding es un problema de frecuencia, tamaño, lifetime y acceso, no una jerarquía universal de velocidad."
    ],
    "concept": "Uniform/constant buffers están pensados para datos de lectura uniforme/estructurada; storage buffers permiten accesos más generales y potencialmente escrituras.",
    "rules": [
      "Uniform/constant buffers están pensados para datos de lectura uniforme/estructurada; storage buffers permiten accesos más generales y potencialmente escrituras.",
      "Push constants ofrecen un rango pequeño de datos de baja latencia vinculado al pipeline layout; su capacidad exacta se consulta al dispositivo.",
      "Elegir mecanismo de binding es un problema de frecuencia, tamaño, lifetime y acceso, no una jerarquía universal de velocidad."
    ],
    "deep": {
      "intro": "Elegir mecanismos de datos shader según tamaño, frecuencia de cambio y patrones de acceso.",
      "sections": [
        {
          "title": "Uniform buffers",
          "body": "Adecuados para matrices, parámetros de cámara/material y datos que muchos invocations leen. Alignment/offset dinámico deben respetar límites."
        },
        {
          "title": "Storage buffers",
          "body": "Permiten arrays grandes y acceso read/write más general. Escribir desde shaders introduce hazards y puede necesitar atomics/barriers."
        },
        {
          "title": "Push constants",
          "body": "Permiten pequeños bloques de datos establecidos al grabar comandos. Son parte del pipeline layout y tienen límites mínimos/específicos del dispositivo."
        },
        {
          "title": "Frecuencia",
          "body": "Datos per-frame, per-material y per-draw pueden mapearse a mecanismos distintos. Cambiar un recurso por draw puede costar más que indexarlo desde tablas persistentes."
        }
      ]
    },
    "example": {
      "problem": "Necesitas enviar una matriz model 4×4 y un ID por draw.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "Push constants pueden ser adecuados si caben en el límite/disposición y la frecuencia lo justifica; UBO/dynamic offsets son otra opción. La API no impone una única arquitectura."
    },
    "check": {
      "question": "¿Push constants tienen tamaño ilimitado?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "El dispositivo expone límites."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Storage buffer puede permitir escrituras shader según uso?",
        "answer": "si",
        "hint": "Más general que uniform buffer."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Push constants forman parte de la interfaz del pipeline layout?",
        "answer": "si",
        "hint": "El rango/stages se declaran."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El mejor mecanismo de recurso depende de tamaño/frecuencia/lifetime?",
        "answer": "si",
        "hint": "No hay ganador universal."
      }
    ]
  },
  "api-descriptor-sets": {
    "id": "api-descriptor-sets",
    "courseId": 36,
    "title": "Descriptor sets: layouts, pools, updates y binding",
    "shortTitle": "Descriptor sets: layouts, pools, updates y binding",
    "duration": 118,
    "objective": "Modelar descriptor sets como tablas de referencias tipadas a recursos y gestionar compatibilidad, lifetime y actualizaciones.",
    "summary": [
      "Descriptor set layout declara bindings y tipos; descriptor set es una instancia con descriptors concretos; descriptor pool gestiona su asignación.",
      "Pipeline layout organiza descriptor set layouts y push constants; set/binding deben coincidir con la interfaz shader/SPIR-V.",
      "Actualizar descriptors mientras trabajo pendiente puede usarlos exige reglas explícitas; features como update-after-bind cambian contratos, no eliminan sincronización."
    ],
    "concept": "Descriptor set layout declara bindings y tipos; descriptor set es una instancia con descriptors concretos; descriptor pool gestiona su asignación.",
    "rules": [
      "Descriptor set layout declara bindings y tipos; descriptor set es una instancia con descriptors concretos; descriptor pool gestiona su asignación.",
      "Pipeline layout organiza descriptor set layouts y push constants; set/binding deben coincidir con la interfaz shader/SPIR-V.",
      "Actualizar descriptors mientras trabajo pendiente puede usarlos exige reglas explícitas; features como update-after-bind cambian contratos, no eliminan sincronización."
    ],
    "deep": {
      "intro": "Modelar descriptor sets como tablas de referencias tipadas a recursos y gestionar compatibilidad, lifetime y actualizaciones.",
      "sections": [
        {
          "title": "Esquema vs instancia",
          "body": "Layout dice 'binding 0 es UBO'; set dice 'binding 0 referencia este buffer/rango'. Confundirlos es como confundir una struct type con una instancia."
        },
        {
          "title": "Pools",
          "body": "Descriptor pools suministran almacenamiento para sets y tienen reglas de lifetime/thread-safety. Reset/free invalida sets según flags/contrato."
        },
        {
          "title": "Binding",
          "body": "Al grabar comandos se enlazan sets compatibles con el pipeline layout. Dynamic offsets pueden cambiar rangos sin reescribir el descriptor base."
        },
        {
          "title": "Actualización",
          "body": "Los descriptors que la GPU puede estar consumiendo no se modifican arbitrariamente. Descriptor indexing/update-after-bind añaden flexibilidad bajo features y reglas concretas."
        }
      ]
    },
    "example": {
      "problem": "Shader usa set=1,binding=3 como sampled image pero pipeline layout declara binding 3 como uniform buffer.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "La interfaz es incompatible; nombres de variables o que ambos handles existan no corrige la discrepancia de descriptor type."
    },
    "check": {
      "question": "¿Descriptor set layout y descriptor set son el mismo objeto?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "Uno es esquema, el otro instancia recursos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un descriptor pool asigna descriptor sets?",
        "answer": "si",
        "hint": "Es su función de almacenamiento/asignación."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Set y binding deben casar con la interfaz shader?",
        "answer": "si",
        "hint": "Contrato explícito."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Update-after-bind significa que cualquier update concurrente es automáticamente seguro?",
        "answer": "no",
        "hint": "Añade reglas/features, no anula sincronización."
      }
    ]
  },
  "api-rendering-passes": {
    "id": "api-rendering-passes",
    "courseId": 36,
    "title": "Render passes, attachments y dynamic rendering",
    "shortTitle": "Render passes, attachments y dynamic rendering",
    "duration": 116,
    "objective": "Entender attachments, load/store operations, subpasses/render scopes y dynamic rendering sin tratar un único mecanismo como universal.",
    "summary": [
      "Un render pass tradicional de Vulkan describe attachments, subpasses y dependencias/uso dentro de un render scope.",
      "Dynamic rendering permite especificar attachments al comenzar rendering sin crear objetos `VkRenderPass`/`VkFramebuffer` explícitos.",
      "Load/store ops y layouts afectan contenido y dependencias; `DONT_CARE` significa que preservar el valor no está garantizado, no 'limpiar a cero'."
    ],
    "concept": "Un render pass tradicional de Vulkan describe attachments, subpasses y dependencias/uso dentro de un render scope.",
    "rules": [
      "Un render pass tradicional de Vulkan describe attachments, subpasses y dependencias/uso dentro de un render scope.",
      "Dynamic rendering permite especificar attachments al comenzar rendering sin crear objetos `VkRenderPass`/`VkFramebuffer` explícitos.",
      "Load/store ops y layouts afectan contenido y dependencias; `DONT_CARE` significa que preservar el valor no está garantizado, no 'limpiar a cero'."
    ],
    "deep": {
      "intro": "Entender attachments, load/store operations, subpasses/render scopes y dynamic rendering sin tratar un único mecanismo como universal.",
      "sections": [
        {
          "title": "Attachments",
          "body": "Color, depth/stencil y resolve attachments tienen formato/sample count y load/store semantics. El contenido inicial/final depende de operaciones y sincronización."
        },
        {
          "title": "Render pass",
          "body": "El objeto tradicional puede describir subpasses y relaciones de attachments. Sigue siendo parte de Vulkan moderno y útil en diseños compatibles."
        },
        {
          "title": "Dynamic rendering",
          "body": "Core moderno permite comenzar rendering con attachments especificados directamente. Simplifica creación de objetos, pero no elimina pipeline compatibility ni sincronización."
        },
        {
          "title": "Load/store",
          "body": "LOAD preserva/lee contenido válido previo; CLEAR inicializa con un valor; DONT_CARE permite descartar contenido según la operación. STORE determina si el resultado debe preservarse."
        }
      ]
    },
    "example": {
      "problem": "Attachment usa loadOp=DONT_CARE y el shader mezcla con el color previo.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "El color previo no está garantizado. Si blending necesita contenido anterior válido, el diseño debe preservarlo/cargarlo correctamente."
    },
    "check": {
      "question": "¿Dynamic rendering elimina la necesidad de attachments y sincronización?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "Elimina ciertos objetos declarativos, no las dependencias reales."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un render pass tradicional puede tener varios subpasses?",
        "answer": "si",
        "hint": "Modelo clásico de Vulkan."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Dynamic rendering puede evitar crear `VkRenderPass` explícito?",
        "answer": "si",
        "hint": "Eso es parte de su objetivo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿`DONT_CARE` equivale a clear=0?",
        "answer": "no",
        "hint": "El contenido no está garantizado."
      }
    ]
  },
  "api-command-buffers": {
    "id": "api-command-buffers",
    "courseId": 36,
    "title": "Command buffers, queues y submission",
    "shortTitle": "Command buffers, queues y submission",
    "duration": 112,
    "objective": "Diseñar grabación y submission de comandos entendiendo estados, reutilización, pools y asincronía CPU/GPU.",
    "summary": [
      "Command buffers registran comandos para ejecución posterior; grabar un comando no ejecuta inmediatamente la operación en GPU.",
      "Command pools gobiernan allocation/reset y suelen asociarse a una queue family; su uso multithread requiere respetar reglas de sincronización externa.",
      "Queue submission establece lotes y dependencias; reutilizar/resetear recursos de comandos antes de completion puede invalidar trabajo pendiente."
    ],
    "concept": "Command buffers registran comandos para ejecución posterior; grabar un comando no ejecuta inmediatamente la operación en GPU.",
    "rules": [
      "Command buffers registran comandos para ejecución posterior; grabar un comando no ejecuta inmediatamente la operación en GPU.",
      "Command pools gobiernan allocation/reset y suelen asociarse a una queue family; su uso multithread requiere respetar reglas de sincronización externa.",
      "Queue submission establece lotes y dependencias; reutilizar/resetear recursos de comandos antes de completion puede invalidar trabajo pendiente."
    ],
    "deep": {
      "intro": "Diseñar grabación y submission de comandos entendiendo estados, reutilización, pools y asincronía CPU/GPU.",
      "sections": [
        {
          "title": "Recording",
          "body": "Un command buffer pasa por estados de lifecycle. Begin/record/end produce una secuencia que luego puede ser sometida; errores de estado son distintos de hazards de GPU."
        },
        {
          "title": "Command pools",
          "body": "Pools amortizan allocation y permiten estrategias por thread/frame. Compartir un pool entre threads sin sincronización cuando el spec exige external synchronization es un race CPU."
        },
        {
          "title": "Submission",
          "body": "Queues consumen submissions asíncronamente. Varias queues no implican necesariamente ejecución física paralela, y una única queue no elimina hazards de memoria."
        },
        {
          "title": "Frames in flight",
          "body": "Duplicar per-frame resources evita sobrescribir datos aún usados. El número de frames in flight es una decisión de latencia/throughput/memoria."
        }
      ]
    },
    "example": {
      "problem": "Frame N+1 reescribe un uniform buffer per-frame que Frame N sigue leyendo.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "Usa recursos por frame/ring buffer con fences/timeline values o espera explícitamente antes de reutilizar el rango."
    },
    "check": {
      "question": "¿Grabar `vkCmdDraw` ejecuta el draw inmediatamente?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "Solo registra el comando."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Command buffer recording y GPU execution son fases distintas?",
        "answer": "si",
        "hint": "Asincronía."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Command pool puede necesitar sincronización externa entre threads?",
        "answer": "si",
        "hint": "Consulta el contrato de la API."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más frames in flight siempre reducen latencia?",
        "answer": "no",
        "hint": "Pueden aumentar throughput y también latencia/uso de memoria."
      }
    ]
  },
  "api-synchronization": {
    "id": "api-synchronization",
    "courseId": 36,
    "title": "Synchronization: execution, memory y ownership",
    "shortTitle": "Synchronization: execution, memory y ownership",
    "duration": 122,
    "objective": "Construir dependencias correctas distinguiendo orden de ejecución, disponibilidad/visibilidad de memoria y ownership entre queues.",
    "summary": [
      "Sincronización GPU tiene al menos dos dimensiones: execution dependency y memory dependency; ordenar stages no siempre hace visibles los writes.",
      "Barriers expresan scopes/stages/accesses sobre recursos; semaphores coordinan submissions/queues y fences permiten al host observar completion.",
      "El objetivo no es 'poner una barrera grande': es expresar el productor, consumidor, acceso y rango mínimos correctos sin carreras ni serialización innecesaria."
    ],
    "concept": "Sincronización GPU tiene al menos dos dimensiones: execution dependency y memory dependency; ordenar stages no siempre hace visibles los writes.",
    "rules": [
      "Sincronización GPU tiene al menos dos dimensiones: execution dependency y memory dependency; ordenar stages no siempre hace visibles los writes.",
      "Barriers expresan scopes/stages/accesses sobre recursos; semaphores coordinan submissions/queues y fences permiten al host observar completion.",
      "El objetivo no es 'poner una barrera grande': es expresar el productor, consumidor, acceso y rango mínimos correctos sin carreras ni serialización innecesaria."
    ],
    "deep": {
      "intro": "Construir dependencias correctas distinguiendo orden de ejecución, disponibilidad/visibilidad de memoria y ownership entre queues.",
      "sections": [
        {
          "title": "Execution vs memory",
          "body": "Que B ejecute después de A no basta si B debe ver writes de A: la dependencia de memoria debe hacer disponibles/visibles los accesos correspondientes."
        },
        {
          "title": "Barriers",
          "body": "Pipeline barriers definen source/destination stage/access y resource range. Elegir ALL_COMMANDS/MEMORY_READ_WRITE para todo puede ser correcto pero destruye concurrencia y oculta el modelo."
        },
        {
          "title": "Semaphores y fences",
          "body": "Binary/timeline semaphores sincronizan trabajo GPU entre submissions; fences son típicamente host-visible para saber que una submission terminó. Sus roles no son intercambiables."
        },
        {
          "title": "Queue ownership",
          "body": "Recursos usados entre queue families pueden requerir ownership transfers según sharing mode. Present también participa en el modelo de sincronización."
        }
      ]
    },
    "example": {
      "problem": "Compute escribe una image y fragment shader la samplea en el siguiente pass.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "Necesitas dependencia compute-write → fragment-read, con access/stage scopes y layout apropiados; ordenar ambos comandos sin memory visibility puede ser insuficiente."
    },
    "check": {
      "question": "¿Una execution dependency garantiza por sí sola visibilidad de todos los writes de memoria?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "Execution y memory dependencies son dimensiones relacionadas pero distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Fence se usa típicamente para que el host observe completion de GPU?",
        "answer": "si",
        "hint": "Host synchronization."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Semaphore puede coordinar submissions entre queues?",
        "answer": "si",
        "hint": "GPU-GPU submission dependency."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Usar siempre la barrera más amplia es una estrategia de rendimiento óptima?",
        "answer": "no",
        "hint": "Puede sobre-serializar."
      }
    ]
  },
  "api-integration-frame": {
    "id": "api-integration-frame",
    "courseId": 36,
    "title": "Frame completo: recursos, draw, presentación y depuración",
    "shortTitle": "Frame completo: recursos, draw, presentación y depuración",
    "duration": 128,
    "objective": "Integrar shader toolchain, recursos, pipeline, command recording, synchronization y presentation en un frame reproducible.",
    "summary": [
      "Un frame robusto separa actualización CPU, adquisición de imagen, recording, submission, presentation y reciclaje de recursos según completion.",
      "Swapchain/presentation añade otra frontera de ownership/synchronization; adquirir una imagen no significa que esté lista para cualquier acceso sin respetar el contrato.",
      "Validation, debug markers, shader reflection y capturas GPU ayudan a diagnosticar, pero el estado final debe justificarse con invariantes de lifetime y dependencias."
    ],
    "concept": "Un frame robusto separa actualización CPU, adquisición de imagen, recording, submission, presentation y reciclaje de recursos según completion.",
    "rules": [
      "Un frame robusto separa actualización CPU, adquisición de imagen, recording, submission, presentation y reciclaje de recursos según completion.",
      "Swapchain/presentation añade otra frontera de ownership/synchronization; adquirir una imagen no significa que esté lista para cualquier acceso sin respetar el contrato.",
      "Validation, debug markers, shader reflection y capturas GPU ayudan a diagnosticar, pero el estado final debe justificarse con invariantes de lifetime y dependencias."
    ],
    "deep": {
      "intro": "Integrar shader toolchain, recursos, pipeline, command recording, synchronization y presentation en un frame reproducible.",
      "sections": [
        {
          "title": "Frame loop",
          "body": "Acquire → actualizar recursos seguros → grabar → submit → present. Con varios frames in flight, cada frame tiene sync y buffers/ranges que no se pisan."
        },
        {
          "title": "Pipeline/resources",
          "body": "Shader interfaces, pipeline layout, descriptors, vertex/index buffers, images y samplers deben ser compatibles. Un fallo visual puede originarse en cualquiera de esas capas."
        },
        {
          "title": "Presentation",
          "body": "Swapchain images tienen formatos/usos/layouts y sincronización con present engine. Resize/out-of-date exige recrear objetos dependientes de dimensiones/formato según la arquitectura."
        },
        {
          "title": "Debugging",
          "body": "Validation layers, debug utils, RenderDoc/PIX/Nsight equivalentes y nombres de objetos reducen ambigüedad. Primero valida API/lifetimes, luego contenido y por último performance."
        }
      ]
    },
    "example": {
      "problem": "La app renderiza un frame correcto y luego muestra corrupción intermitente con dos frames in flight.",
      "steps": [
        "Identifica los objetos/etapas implicados y su contrato.",
        "Separa ejecución, recursos, lifetime y sincronización.",
        "Concluye solo lo que garantiza la API; no extrapoles desde una implementación."
      ],
      "solution": "Busca reutilización prematura de command buffers, descriptor/data ranges o swapchain image synchronization; que funcione con un frame in flight es una pista de lifetime/race."
    },
    "check": {
      "question": "¿Una imagen adquirida del swapchain elimina toda necesidad de sincronización antes de presentarla?",
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
          "Depende solo del shader source",
          false
        ]
      ],
      "feedback": "Acquire/render/present tienen dependencias específicas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Frames in flight requieren evitar sobrescribir recursos todavía usados?",
        "answer": "si",
        "hint": "Lifetime."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Validation layers pueden ayudar a encontrar misuse de Vulkan?",
        "answer": "si",
        "hint": "No garantizan lógica perfecta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un bug que desaparece con `wait idle` puede indicar sincronización/lifetime incorrectos?",
        "answer": "si",
        "hint": "La serialización puede esconder races."
      }
    ]
  }
});
