/**
 * BLOQUE 025 — Explotación binaria (análisis defensivo y laboratorio aislado)
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: enseñar primitives, invariantes y mitigaciones a nivel
 * experto sin convertir los ejemplos en cadenas operativas reutilizables
 * contra sistemas reales. Cada finding termina en causa raíz + hardening.
 */
window.LEARNING_PATHS[25] = {
  "level": "Experto progresivo",
  "estimatedHours": 108,
  "description": "Corrupción de memoria y explotabilidad binaria desde la perspectiva de primitives, mitigaciones, toolchain y hardening reproducible en laboratorios aislados.",
  "outcomes": [
    "Caracterizar overflows, UAF, double-free, integer overflow y type confusion por primitive y causa raíz, sin saltar directamente de crash a RCE.",
    "Explicar NX/W^X, ASLR/PIE, stack canaries, RELRO, CFI/CET/PAC y hardening de allocator por la capacidad concreta que restringen.",
    "Razonar sobre GOT/PLT, linking dinámico, code-reuse y control-flow en términos de ABI/ELF y defensas, evitando recetas operativas contra sistemas reales.",
    "Realizar triage y laboratorios defensivos reproducibles con sanitizers, debugger y herramientas ELF, cerrando siempre con patch y regression test."
  ],
  "modules": [
    {
      "id": "m1-memory-control",
      "title": "Corrupción y control",
      "description": "Stack, overflows y control-flow",
      "lessons": [
        "bin-stack-frames",
        "bin-stack-overflow",
        "bin-return-control",
        "bin-nx-wx-shellcode"
      ]
    },
    {
      "id": "m2-mitigations-elf",
      "title": "Mitigaciones y ELF",
      "description": "ASLR/PIE, canaries, RELRO y linking",
      "lessons": [
        "bin-aslr-pie",
        "bin-canaries",
        "bin-elf-got-plt-relro"
      ]
    },
    {
      "id": "m3-code-reuse-input",
      "title": "Code-reuse y parsing inseguro",
      "description": "ROP conceptual y format strings",
      "lessons": [
        "bin-code-reuse",
        "bin-format-strings"
      ]
    },
    {
      "id": "m4-heap-types",
      "title": "Heap, enteros y tipos",
      "description": "Lifetime, arithmetic y type confusion",
      "lessons": [
        "bin-heap-uaf",
        "bin-integer-overflow",
        "bin-type-confusion"
      ]
    },
    {
      "id": "m5-defense",
      "title": "Triage y hardening",
      "description": "Evaluación defensiva y laboratorio",
      "lessons": [
        "bin-exploitability-triage",
        "bin-hardening-lab"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "bin-stack-frames": {
    "id": "bin-stack-frames",
    "courseId": 25,
    "title": "Stack frames, límites y corrupción de memoria",
    "shortTitle": "Antes del exploit: entender qué memoria se corrompe",
    "duration": 105,
    "objective": "analizar un fallo de memoria en términos de objetos, límites, lifetime y estado de control sin asumir automáticamente ejecución de código.",
    "summary": [
      "Un stack frame es una convención de activación, no un formato universal fijo: ABI, optimización y arquitectura cambian su layout.",
      "Un out-of-bounds write puede corromper datos, metadatos o estado de control; la primitive depende de qué bytes sean alcanzables.",
      "Crash, information disclosure y control-flow hijack son consecuencias distintas de una misma familia de bugs."
    ],
    "concept": "La primera pregunta profesional no es “¿qué payload uso?”, sino “¿qué objeto fue sobrescrito, con qué control sobre offset/contenido y qué invariant se rompió?”.",
    "diagram": [],
    "rules": [
      "No dibujes todos los frames como [buffer][saved FP][return address]: es un modelo, no una garantía ABI.",
      "Distingue write-what-where parcial, overwrite contiguo y read out-of-bounds.",
      "Confirma el fallo con sanitizers/debugger antes de razonar sobre explotabilidad."
    ],
    "deep": {
      "sections": [
        {
          "title": "Stack frame como abstracción",
          "body": "Una llamada necesita preservar suficiente estado para ejecutar y retornar. El compilador puede mantener valores en registros, omitir frame pointer, realinear el stack o inlinear funciones."
        },
        {
          "title": "Primitive antes que técnica",
          "body": "Un overflow de 4 bytes adyacente a un boolean de autorización no es el mismo problema que un overwrite de puntero de función. La geometría del bug importa."
        },
        {
          "title": "Exploitabilidad contextual",
          "body": "Mitigaciones, allocator, arquitectura, privilegios, protocolo y capacidad de reinicio cambian el riesgo. “Hay overflow” no equivale automáticamente a “RCE”."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "ASan informa un write 8 bytes fuera de un array local. ¿Qué debes establecer antes de hablar de return addresses?",
      "steps": [
        [
          "Paso 1",
          "Identifica el objeto y su tamaño/lifetime."
        ],
        [
          "Paso 2",
          "Determina qué bytes adyacentes existen en esa build concreta."
        ],
        [
          "Paso 3",
          "Clasifica el control del atacante sobre longitud, offset y contenido."
        ]
      ],
      "answer": "Primero caracteriza la primitive de corrupción; el layout de control no debe asumirse."
    },
    "check": {
      "question": "¿Un stack frame tiene el mismo layout exacto en todas las builds?",
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
          "Solo en x86-64",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un buffer overflow implica necesariamente ejecución de código?",
        "answer": "no",
        "hint": "Puede terminar en crash o corrupción de datos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La optimización puede cambiar el layout del stack frame?",
        "answer": "si",
        "hint": "Registros, inlining y frame-pointer omission influyen."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La primitive de un bug depende de qué bytes/objetos sean alcanzables?",
        "answer": "si",
        "hint": "La geometría de corrupción determina capacidades."
      }
    ]
  },
  "bin-stack-overflow": {
    "id": "bin-stack-overflow",
    "courseId": 25,
    "title": "Buffer overflow y stack smashing",
    "shortTitle": "De write fuera de límites a invariant rota",
    "duration": 110,
    "objective": "explicar cómo un overflow contiguo puede modificar objetos vecinos y cómo prevenirlo con diseño de memoria segura, bounds checking y stack protection.",
    "summary": [
      "Stack smashing describe corrupción del stack, pero no toda corrupción del stack alcanza una return address.",
      "Las causas raíz típicas son longitud no validada, aritmética de tamaños incorrecta o APIs que no expresan capacidad del destino.",
      "Stack protector detecta determinadas corrupciones antes del retorno, pero no previene toda escritura fuera de límites."
    ],
    "concept": "La defensa fuerte empieza evitando la escritura inválida; el canary es una red de detección, no una licencia para seguir escribiendo fuera del array.",
    "diagram": [],
    "rules": [
      "Propaga tamaños como valores de primera clase y comprueba overflow al calcularlos.",
      "Usa ASan/fuzzing para descubrir el bug; no dependas solo de canaries.",
      "No desactives mitigaciones del sistema como paso pedagógico por defecto: usa binaries/labs deliberadamente construidos para observar conceptos."
    ],
    "deep": {
      "sections": [
        {
          "title": "Causa raíz",
          "body": "Copias cuya longitud proviene de input deben validarse contra la capacidad real del objeto destino. “El paquete normalmente mide menos” no es un contrato."
        },
        {
          "title": "Canaries",
          "body": "El compilador puede colocar un guard value en funciones seleccionadas y comprobarlo antes de retornar. Si el overwrite lo modifica, aborta en vez de usar estado posiblemente corrupto."
        },
        {
          "title": "Límites",
          "body": "Un canary no protege necesariamente objetos situados antes de él, heap, globals, non-control data ni todos los frames. Es mitigación parcial."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un parser copia len bytes a char name[32] después de verificar solo que len<4096. ¿Cuál es la corrección primaria?",
      "steps": [
        [
          "Paso 1",
          "La capacidad relevante es 32 bytes, no el tamaño máximo del paquete."
        ],
        [
          "Paso 2",
          "Valida len contra sizeof(name) y la semántica del formato."
        ],
        [
          "Paso 3",
          "Mantén stack protector como defensa adicional."
        ]
      ],
      "answer": "Corregir el bounds check en la causa raíz; stack protector queda como mitigación adicional."
    },
    "check": {
      "question": "¿Un canary evita que ocurra la escritura fuera de límites?",
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
          "Solo con PIE",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Stack smashing y buffer overflow son exactamente sinónimos universales?",
        "answer": "no",
        "hint": "Stack smashing es una clase/contexto de corrupción."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La defensa primaria es validar la escritura, no confiar solo en el canary?",
        "answer": "si",
        "hint": "Prevención antes que detección."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un canary puede dejar intacta corrupción de non-control data?",
        "answer": "si",
        "hint": "No cubre toda memoria ni toda disposición."
      }
    ]
  },
  "bin-return-control": {
    "id": "bin-return-control",
    "courseId": 25,
    "title": "Return addresses y control-flow integrity",
    "shortTitle": "Qué significa realmente secuestrar el flujo",
    "duration": 100,
    "objective": "razonar sobre return addresses, indirect calls y control-flow integrity sin asumir que todo overwrite concede control arbitrario del instruction pointer.",
    "summary": [
      "La return address representa dónde continuar tras una llamada, pero su almacenamiento/protección depende de ABI y hardware.",
      "Control-flow hijack requiere convertir corrupción de memoria en una transferencia no prevista; esa conversión es una primitive adicional.",
      "Shadow stacks, CFI y pointer authentication intentan restringir distintas clases de transferencias, no arreglar el bug de memoria original."
    ],
    "concept": "Corromper memoria y controlar el flujo son etapas conceptualmente distintas. Las mitigaciones modernas intentan romper precisamente ese puente.",
    "diagram": [],
    "rules": [
      "Separa backward-edge (returns) de forward-edge (indirect calls/jumps).",
      "No confundas una crash en RET con control fiable del destino.",
      "Evalúa mitigaciones de control-flow junto con memory safety, no en sustitución."
    ],
    "deep": {
      "sections": [
        {
          "title": "Backward edge",
          "body": "Returns son transferencias indirectas cuya integridad puede protegerse con shadow stacks o mecanismos equivalentes."
        },
        {
          "title": "Forward edge",
          "body": "Indirect calls/jumps pueden limitarse por CFI basado en tipos/conjuntos válidos u otras políticas."
        },
        {
          "title": "Composición",
          "body": "CFI puede convertir una corrupción explotable en crash, pero data-only attacks pueden seguir siendo relevantes si el bug modifica estado de autorización o tamaños."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una corrupción cambia un function pointer, pero CFI solo permite destinos compatibles con una política. ¿Qué cambia?",
      "steps": [
        [
          "Paso 1",
          "El bug de memoria sigue existiendo."
        ],
        [
          "Paso 2",
          "El conjunto de destinos de control permitidos se restringe."
        ],
        [
          "Paso 3",
          "Todavía deben evaluarse ataques de datos y bypasses del modelo."
        ]
      ],
      "answer": "CFI restringe la primitive de control-flow; no repara la corrupción subyacente."
    },
    "check": {
      "question": "¿CFI elimina automáticamente todos los efectos de una escritura OOB?",
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
          "Solo en C++",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una return address es la única clase de dato sensible a corrupción?",
        "answer": "no",
        "hint": "Punteros, flags, longitudes y objetos también importan."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Shadow stack protege principalmente el backward edge?",
        "answer": "si",
        "hint": "Compara/gestiona returns."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿CFI puede coexistir con ataques data-only?",
        "answer": "si",
        "hint": "Restringir control-flow no protege todo estado de datos."
      }
    ]
  },
  "bin-nx-wx-shellcode": {
    "id": "bin-nx-wx-shellcode",
    "courseId": 25,
    "title": "NX/W^X y shellcode como concepto",
    "shortTitle": "Separar bytes controlados de bytes ejecutables",
    "duration": 95,
    "objective": "explicar por qué páginas no ejecutables dificultan ejecutar datos inyectados y por qué NX/W^X no elimina la corrupción ni el code-reuse.",
    "summary": [
      "NX marca regiones como no ejecutables; W^X busca que una página no sea simultáneamente writable y executable.",
      "Shellcode es código máquina inyectado/controlado; estudiar su existencia no requiere publicar payloads funcionales.",
      "Code-reuse surgió en parte porque impedir ejecutar el stack no impide reutilizar código ya ejecutable."
    ],
    "concept": "NX cambia la pregunta de “puedo escribir bytes?” a “puedo conseguir que la CPU los ejecute?”. Esa separación es una defensa poderosa, pero no una corrección de memory safety.",
    "diagram": [],
    "rules": [
      "Mantén datos writable y código executable con permisos mínimos.",
      "Trata cambios RW→RX de runtimes JIT como una frontera de seguridad explícita.",
      "No enseñes bytes de shellcode como objetivo; analiza permisos y control-flow en un binario de juguete."
    ],
    "deep": {
      "sections": [
        {
          "title": "Permisos de página",
          "body": "MMU/page tables permiten separar read/write/execute. Un fault al saltar a una página NX es una consecuencia de política de ejecución."
        },
        {
          "title": "W^X",
          "body": "Algunos runtimes necesitan generar código; pueden escribir en una fase y ejecutar en otra, evitando RWX permanente."
        },
        {
          "title": "Límite",
          "body": "NX no impide modificar datos de control ni reutilizar secuencias ya presentes en módulos ejecutables."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un proceso recibe datos en heap RW y accidentalmente salta a esa dirección bajo NX. ¿Qué defensa actúa?",
      "steps": [
        [
          "Paso 1",
          "La página no tiene permiso execute."
        ],
        [
          "Paso 2",
          "La CPU/OS produce una violación de ejecución."
        ],
        [
          "Paso 3",
          "El overflow original todavía debe corregirse."
        ]
      ],
      "answer": "NX bloquea la ejecución desde esa página, no la escritura que originó el estado corrupto."
    },
    "check": {
      "question": "¿NX evita todas las formas de control-flow hijack?",
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
          "Solo con ASLR desactivado",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿NX significa que una página no puede leerse?",
        "answer": "no",
        "hint": "NX controla ejecución."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿W^X intenta evitar páginas writable+executable simultáneamente?",
        "answer": "si",
        "hint": "Reduce superficie de inyección."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un JIT puede requerir transiciones de permisos sin mantener RWX permanente?",
        "answer": "si",
        "hint": "Puede escribir y luego sellar RX."
      }
    ]
  },
  "bin-aslr-pie": {
    "id": "bin-aslr-pie",
    "courseId": 25,
    "title": "ASLR, PIE e information disclosure",
    "shortTitle": "Aleatorizar direcciones sin confundir entropía con invulnerabilidad",
    "duration": 105,
    "objective": "explicar cómo ASLR y PIE randomizan layouts, qué componentes necesitan relocation/PIE y por qué una fuga de direcciones puede degradar la mitigación.",
    "summary": [
      "ASLR randomiza regiones compatibles del address space; PIE permite que el ejecutable principal sea relocatable para variar su base.",
      "ASLR aumenta incertidumbre de direcciones, pero no elimina el bug ni garantiza que toda región tenga la misma entropía.",
      "Una information leak puede revelar bases/punteros y reducir la incertidumbre que ASLR aporta."
    ],
    "concept": "ASLR es una mitigación probabilística/estructural: dificulta predecir direcciones. PIE extiende esa posibilidad al main executable.",
    "diagram": [],
    "rules": [
      "No uses “ASLR está activado” como conclusión de exploitabilidad; inspecciona qué se randomiza en esa plataforma/build.",
      "Trata pointer leaks y logs de direcciones como información sensible cuando reducen incertidumbre.",
      "Combina ASLR/PIE con NX, canaries, RELRO y control-flow defenses."
    ],
    "deep": {
      "sections": [
        {
          "title": "ASLR",
          "body": "El kernel puede randomizar stack, mmap regions, heap y otras bases según plataforma/configuración."
        },
        {
          "title": "PIE",
          "body": "Un executable position-independent puede cargarse en bases diferentes sin asumir una dirección fija del texto principal."
        },
        {
          "title": "Fugas",
          "body": "Si una respuesta expone un puntero dentro de un módulo, conocer el offset interno puede permitir inferir su base en ciertas condiciones; por eso leaks y corruption se analizan juntas."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Dos ejecuciones muestran distintas bases de libc pero el ejecutable principal conserva siempre la misma base. ¿Qué hipótesis revisas?",
      "steps": [
        [
          "Paso 1",
          "ASLR puede estar activo para shared libraries."
        ],
        [
          "Paso 2",
          "El main executable puede no ser PIE."
        ],
        [
          "Paso 3",
          "Comprueba el tipo ELF/build flags antes de concluir."
        ]
      ],
      "answer": "ASLR y PIE son mecanismos relacionados pero distintos; la evidencia sugiere revisar si el ejecutable es position-independent."
    },
    "check": {
      "question": "¿PIE y ASLR son exactamente la misma mitigación?",
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
          "Solo en Linux",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿ASLR corrige una UAF?",
        "answer": "no",
        "hint": "Cambia direcciones, no lifetime."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿PIE permite randomizar la base del ejecutable principal?",
        "answer": "si",
        "hint": "Ese es su papel típico."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una fuga de puntero puede debilitar ASLR?",
        "answer": "si",
        "hint": "Puede revelar información de layout."
      }
    ]
  },
  "bin-canaries": {
    "id": "bin-canaries",
    "courseId": 25,
    "title": "Stack canaries y detección de smashing",
    "shortTitle": "Qué detectan y qué dejan fuera",
    "duration": 90,
    "objective": "entender la instrumentación de stack protector, sus supuestos y por qué un canary es un detector de ciertas corrupciones, no un mecanismo universal de memory safety.",
    "summary": [
      "El compilador selecciona funciones y coloca/valida un guard alrededor de estado sensible según la estrategia de stack protector.",
      "Si la corrupción alcanza y modifica el guard antes de un retorno protegido, el runtime puede abortar.",
      "Canaries no cubren heap, globals, todos los objetos ni necesariamente corrupciones que no atraviesan el guard."
    ],
    "concept": "El canary convierte ciertas corrupciones silenciosas en fallos detectables. Eso mejora seguridad, pero el bug sigue siendo un bug.",
    "diagram": [],
    "rules": [
      "No publiques/uses fugas de canary como meta del laboratorio; céntrate en observar detección y corregir la causa.",
      "Comprueba qué funciones fueron instrumentadas en la build real.",
      "Mantén sanitizers y revisión de límites incluso con stack protector."
    ],
    "deep": {
      "sections": [
        {
          "title": "Instrumentación",
          "body": "GCC/Clang pueden insertar un guard en el frame y una comprobación al salir de funciones consideradas vulnerables según la opción seleccionada."
        },
        {
          "title": "Aleatoriedad",
          "body": "El guard suele inicializarse desde estado runtime. Su valor exacto y disposición son detalles de implementación/plataforma."
        },
        {
          "title": "Cobertura parcial",
          "body": "Una corrupción de un flag situado antes del canary, un UAF o un overflow de heap no queda resuelto por esta protección."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un programa aborta con diagnóstico de stack smashing. ¿Cuál es la conclusión correcta?",
      "steps": [
        [
          "Paso 1",
          "La mitigación detectó corrupción compatible con su modelo."
        ],
        [
          "Paso 2",
          "Debes localizar la escritura inválida original."
        ],
        [
          "Paso 3",
          "No asumas que el canary “arregló” el input malicioso."
        ]
      ],
      "answer": "El abort es evidencia de detección, no una reparación de la causa raíz."
    },
    "check": {
      "question": "¿Stack protector sustituye ASan/fuzzing y bounds checks?",
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
          "Solo en release",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El canary suele comprobarse antes de retornar de una función protegida?",
        "answer": "si",
        "hint": "Esa es la idea básica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un heap overflow queda cubierto por un stack canary?",
        "answer": "no",
        "hint": "Otra región y otro mecanismo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Que una función no tenga canary demuestra que sea segura?",
        "answer": "no",
        "hint": "Instrumentación y ausencia de bug son cosas distintas."
      }
    ]
  },
  "bin-elf-got-plt-relro": {
    "id": "bin-elf-got-plt-relro",
    "courseId": 25,
    "title": "GOT, PLT y RELRO",
    "shortTitle": "Dynamic linking visto desde la defensa",
    "duration": 110,
    "objective": "relacionar relocations, GOT/PLT y RELRO con el dynamic linker, distinguiendo datos de enlace de una “tabla mágica de funciones”.",
    "summary": [
      "GOT/PLT son mecanismos ELF/toolchain para resolver referencias dinámicas; sus detalles dependen de arquitectura y modo de linking.",
      "RELRO crea una región que puede hacerse read-only después de relocations; bind-now puede permitir proteger más estado antes de ejecutar código de aplicación.",
      "RELRO reduce superficies de overwrite sobre estructuras de linking, pero no elimina corruption primitives en otros objetos."
    ],
    "concept": "Entender GOT/PLT como infraestructura de relocation permite razonar sobre por qué hacer ciertas tablas read-only reduce el impacto de writes arbitrarios.",
    "diagram": [],
    "rules": [
      "Distingue symbol resolution, relocation y lazy binding.",
      "No conviertas partial/full RELRO en etiquetas absolutas sin mirar flags/segments efectivos.",
      "Usa readelf/objdump de forma analítica; no como receta de redirección ofensiva."
    ],
    "deep": {
      "sections": [
        {
          "title": "GOT/PLT",
          "body": "El código puede usar indirection para alcanzar símbolos cuyo address final se conoce en load/link time. PLT/GOT son piezas de ese mecanismo en ELF habitual."
        },
        {
          "title": "RELRO",
          "body": "El linker puede emitir PT_GNU_RELRO para que una región quede read-only después de procesar relocations, si el loader/plataforma lo soporta."
        },
        {
          "title": "Lazy binding",
          "body": "Resolver símbolos bajo demanda tiene trade-offs de startup/indirection y puede afectar qué estructuras deben permanecer mutables durante la ejecución."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un segmento PT_GNU_RELRO aparece en el ELF. ¿Qué debes verificar para saber qué protección efectiva existe?",
      "steps": [
        [
          "Paso 1",
          "Qué rangos contiene."
        ],
        [
          "Paso 2",
          "Si el loader los hace read-only tras relocation."
        ],
        [
          "Paso 3",
          "Qué estrategia de binding usa la build."
        ]
      ],
      "answer": "RELRO se evalúa por región y fase de relocation/binding, no por una etiqueta decorativa."
    },
    "check": {
      "question": "¿RELRO corrige un buffer overflow de heap?",
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
          "Solo con PIE",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿GOT/PLT pertenecen al mecanismo de linking dinámico ELF habitual?",
        "answer": "si",
        "hint": "Relacionan referencias y resolución."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿PT_GNU_RELRO pretende hacerse read-only después de relocations?",
        "answer": "si",
        "hint": "Ese es el objetivo del segmento."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿RELRO protege automáticamente todos los punteros del proceso?",
        "answer": "no",
        "hint": "Solo regiones/estructuras cubiertas."
      }
    ]
  },
  "bin-code-reuse": {
    "id": "bin-code-reuse",
    "courseId": 25,
    "title": "ret2libc, ROP y code-reuse como modelo",
    "shortTitle": "Por qué NX no fue el final de la historia",
    "duration": 105,
    "objective": "explicar conceptualmente ret2libc/ROP y las defensas de control-flow sin proporcionar cadenas operativas reutilizables.",
    "summary": [
      "Code-reuse reutiliza instrucciones ya ejecutables en lugar de introducir necesariamente código nuevo.",
      "ret2libc reutiliza funciones existentes; ROP encadena pequeñas secuencias terminadas típicamente en transferencias de control.",
      "CET shadow stack, IBT/CFI y pointer authentication buscan dificultar clases concretas de code-reuse/control-flow subversion."
    ],
    "concept": "NX rompe ejecución directa desde datos, pero si existe una primitive de control fuerte, el atacante puede intentar redirigir hacia código legítimo. Las defensas modernas restringen esos destinos y returns.",
    "diagram": [],
    "rules": [
      "Estudia chains solo de forma abstracta con grafos de control, no como payloads para software real.",
      "Relaciona cada mitigación con backward-edge, forward-edge o secrecy del layout.",
      "No asumas que “ROP posible” implica una chain estable: register state, calling convention y mitigaciones importan."
    ],
    "deep": {
      "sections": [
        {
          "title": "ret2libc",
          "body": "Modelo de reutilización de rutinas ya cargadas; depende de alcanzar una transferencia útil y satisfacer su convención/estado."
        },
        {
          "title": "ROP",
          "body": "Generaliza code-reuse mediante secuencias disponibles. La utilidad real depende del binario, arquitectura y restricciones de control."
        },
        {
          "title": "Defensas",
          "body": "Shadow stack protege returns; IBT/CFI restringe indirect branches; PAC puede autenticar punteros bajo modelos concretos. Ninguna reemplaza memory safety."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "NX está activo y una escritura logra alterar estado de control. ¿Qué conclusión es válida?",
      "steps": [
        [
          "Paso 1",
          "NX dificulta ejecutar bytes de datos."
        ],
        [
          "Paso 2",
          "Todavía debes evaluar code-reuse y CFI/CET/PAC."
        ],
        [
          "Paso 3",
          "El bug original sigue existiendo."
        ]
      ],
      "answer": "NX es una capa; code-reuse y control-flow defenses viven en otra."
    },
    "check": {
      "question": "¿ROP necesita necesariamente inyectar nuevo código ejecutable?",
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
          "Solo en ARM",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿ret2libc es una forma de reutilizar código existente?",
        "answer": "si",
        "hint": "No necesita introducir una función nueva."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Shadow stack está orientado a proteger returns/backward edge?",
        "answer": "si",
        "hint": "Compara la ruta de retorno."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿CFI/PAC/CET reparan la corrupción de memoria original?",
        "answer": "no",
        "hint": "Mitigan consecuencias de control-flow."
      }
    ]
  },
  "bin-format-strings": {
    "id": "bin-format-strings",
    "courseId": 25,
    "title": "Format strings y separación de datos/formato",
    "shortTitle": "Cuando el texto se convierte en instrucciones para el formatter",
    "duration": 95,
    "objective": "detectar format string bugs, explicar sus riesgos de disclosure/corrupción y corregirlos separando formato constante de datos no confiables.",
    "summary": [
      "Funciones printf-like interpretan una mini-gramática de formato; input no confiable no debe convertirse en esa gramática.",
      "El riesgo no se limita a crash: especificadores pueden causar lecturas inesperadas y, en APIs C clásicas, existen conversiones con efectos de escritura.",
      "La corrección típica es formato constante y datos como argumentos, además de warnings y APIs más estructuradas."
    ],
    "concept": "Es la misma lección que SQLi y command injection: código/formato y datos deben viajar por canales distintos.",
    "diagram": [],
    "rules": [
      "Nunca uses printf(user_input) cuando el input es dato.",
      "Activa warnings de formato y trátalos seriamente.",
      "No dependas de sanitizar porcentajes como política principal; usa un formato constante."
    ],
    "deep": {
      "sections": [
        {
          "title": "Mini-lenguaje",
          "body": "El primer argumento de printf define cómo consumir los argumentos variádicos. Hacerlo controlable por input cambia la gramática ejecutada por la biblioteca."
        },
        {
          "title": "Variadic ABI",
          "body": "La función confía en que el formato describa correctamente tipos/cantidad. Inconsistencias pueden producir comportamiento indefinido."
        },
        {
          "title": "Defensa",
          "body": "printf(\"%s\", user) expresa explícitamente que user es texto y no formato."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Código: printf(message); donde message viene de red. ¿Cuál es la refactorización primaria?",
      "steps": [
        [
          "Paso 1",
          "Usar un format string constante."
        ],
        [
          "Paso 2",
          "Pasar message como argumento de datos."
        ],
        [
          "Paso 3",
          "Mantener validación de tamaño del mensaje por separado."
        ]
      ],
      "answer": "Usar una forma como printf(\"%s\", message) separa formato y datos."
    },
    "check": {
      "question": "¿Escapar manualmente algunos “%” es una defensa mejor que usar formato constante?",
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
          "Solo en Linux",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿printf(user) trata user como formato?",
        "answer": "si",
        "hint": "Es el primer argumento format."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿printf(\"%s\", user) separa formato y dato?",
        "answer": "si",
        "hint": "El formato ya no depende de user."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Los format bugs pueden producir más que disclosure?",
        "answer": "si",
        "hint": "Algunas conversiones/UB pueden afectar memoria/estado."
      }
    ]
  },
  "bin-heap-uaf": {
    "id": "bin-heap-uaf",
    "courseId": 25,
    "title": "Heap exploitation: UAF, double free y allocator invariants",
    "shortTitle": "Lifetime antes que “heap feng shui”",
    "duration": 115,
    "objective": "analizar use-after-free/double-free como violaciones de lifetime y ownership, entendiendo cómo allocators modernos añaden metadatos y hardening.",
    "summary": [
      "Use-after-free usa una referencia después de terminar el lifetime; double free libera dos veces la misma asignación viva lógica.",
      "Allocators reutilizan chunks y mantienen metadata/free lists/caches; por eso un bug de lifetime puede cambiar qué objeto ocupa una dirección.",
      "Hardening de allocator como checks y pointer mangling/safe-linking reduce técnicas concretas, pero la corrección sigue siendo ownership correcto."
    ],
    "concept": "La dirección no es la identidad del objeto. Tras free, que el patrón de bits del puntero siga igual no conserva lifetime ni tipo.",
    "diagram": [],
    "rules": [
      "Diseña ownership explícito y nulifica/retira referencias cuando ayude a la arquitectura, sin confundir NULLing con prueba formal.",
      "Usa ASan, fuzzing y pruebas de lifetime; no dependas de allocator aborts.",
      "No documentes offsets internos de una versión de glibc como reglas universales del heap."
    ],
    "deep": {
      "sections": [
        {
          "title": "UAF",
          "body": "El allocator puede entregar la misma región a un objeto diferente. Una referencia antigua puede entonces observar/modificar un objeto con otra semántica."
        },
        {
          "title": "Double free",
          "body": "Reinsertar incorrectamente una región ya libre viola invariantes del allocator. Implementaciones modernas incluyen comprobaciones, pero no toda variante se detecta igual."
        },
        {
          "title": "Versiones",
          "body": "ptmalloc/tcache y sus mitigaciones cambian entre versiones. Enseña invariantes y ownership antes que layouts congelados."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Objeto A se libera; después otra asignación B reutiliza la misma dirección y un puntero antiguo de A escribe allí. ¿Cómo se clasifica?",
      "steps": [
        [
          "Paso 1",
          "El lifetime de A terminó."
        ],
        [
          "Paso 2",
          "La referencia antigua es dangling."
        ],
        [
          "Paso 3",
          "El write puede corromper B aunque la dirección numérica coincida."
        ]
      ],
      "answer": "Es un use-after-free; igualdad de dirección no restaura la identidad/lifetime de A."
    },
    "check": {
      "question": "¿La misma dirección después de free implica el mismo objeto C?",
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
          "Solo con malloc",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Double free es una violación de lifetime/ownership?",
        "answer": "si",
        "hint": "Se libera una asignación que ya no está viva como tal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿tcache es una propiedad universal de todos los allocators?",
        "answer": "no",
        "hint": "Es una implementación/estrategia concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Hardening del allocator sustituye una política de ownership correcta?",
        "answer": "no",
        "hint": "Mitigación y causa raíz son capas distintas."
      }
    ]
  },
  "bin-integer-overflow": {
    "id": "bin-integer-overflow",
    "courseId": 25,
    "title": "Integer overflow y cálculos de tamaños",
    "shortTitle": "Cuando el bug ocurre antes de reservar memoria",
    "duration": 100,
    "objective": "detectar overflow/truncation en tamaños, offsets y multiplicaciones y entender cómo convierten validaciones aparentemente correctas en corrupciones de memoria.",
    "summary": [
      "Unsigned wrap es aritmética modular definida en C, pero puede ser lógicamente peligroso para tamaños; signed overflow ordinario puede ser UB.",
      "size = count * elem_size puede overflowear antes de malloc y reservar menos memoria de la necesaria.",
      "Conversión entre anchos/signos puede truncar valores y romper checks incluso sin un overflow de escritura inmediato."
    ],
    "concept": "Muchos memory-safety bugs nacen en aritmética: el programa valida una longitud ya truncada o reserva un tamaño envuelto y después copia según la magnitud original.",
    "diagram": [],
    "rules": [
      "Comprueba overflow antes de multiplicar/sumar tamaños o usa helpers checked.",
      "Mantén tipos de tamaño coherentes a través de API boundaries.",
      "Distingue overflow del lenguaje, truncation y overflow de puntero/offset."
    ],
    "deep": {
      "sections": [
        {
          "title": "Multiplicación",
          "body": "Para count*size, una comprobación típica razona si count > MAX/size antes de multiplicar, cuidando el caso size=0 según semántica."
        },
        {
          "title": "Truncation",
          "body": "Guardar una longitud 64-bit en 16-bit puede perder bits altos sin que malloc ni memcpy sepan la intención original."
        },
        {
          "title": "CWE chain",
          "body": "Integer bug → under-allocation → out-of-bounds write es una cadena de causas; corregir solo la última copia puede dejar otros consumidores vulnerables."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "count es controlado y se calcula bytes=count*sizeof(Item). ¿Qué debes proteger antes de malloc?",
      "steps": [
        [
          "Paso 1",
          "La multiplicación debe representarse sin overflow."
        ],
        [
          "Paso 2",
          "El resultado debe respetar límites de negocio/memoria."
        ],
        [
          "Paso 3",
          "Las copias posteriores deben usar la misma magnitud validada."
        ]
      ],
      "answer": "Usa aritmética checked y una única longitud validada end-to-end."
    },
    "check": {
      "question": "¿Unsigned wrap definido significa que sea seguro para calcular tamaños?",
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
          "Solo en 64-bit",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿count*size puede overflowear antes de malloc?",
        "answer": "si",
        "hint": "La expresión se evalúa primero."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Truncar 64 bits a 16 puede cambiar una longitud sin memory write?",
        "answer": "si",
        "hint": "La conversión pierde información."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Signed overflow ordinario en C debe asumirse wraparound portable?",
        "answer": "no",
        "hint": "Puede ser UB."
      }
    ]
  },
  "bin-type-confusion": {
    "id": "bin-type-confusion",
    "courseId": 25,
    "title": "Type confusion y dispatch inseguro",
    "shortTitle": "Cuando los bytes existen pero el tipo mental es falso",
    "duration": 100,
    "objective": "explicar type confusion como discrepancia entre la identidad/tipo real de un objeto y la interpretación usada para acceder o despachar sobre él.",
    "summary": [
      "Type confusion puede surgir en runtimes, C/C++, tagged unions, downcasts incorrectos o metadata corrupta.",
      "El peligro no requiere out-of-bounds: un objeto válido puede interpretarse con layout/dispatch incompatible.",
      "Type-safe APIs, validación de tags, CFI y memory-safe languages pueden reducir superficies, según el origen del bug."
    ],
    "concept": "Memory safety también incluye la identidad del objeto: tener una dirección válida no implica que cualquier interpretación del objeto sea válida.",
    "diagram": [],
    "rules": [
      "Valida discriminantes antes de acceder a variantes.",
      "Evita casts que silencian el sistema de tipos sin demostrar invariantes.",
      "Trata metadata de tipo/vtables/tags como estado crítico si input puede corromperlo."
    ],
    "deep": {
      "sections": [
        {
          "title": "Tagged unions",
          "body": "Un tag debe corresponder a la variante realmente inicializada. Si tag y storage divergen, el consumidor puede usar el layout equivocado."
        },
        {
          "title": "OO dispatch",
          "body": "Downcasts o metadata corrupta pueden conducir a accesos de campos o dispatch no válidos."
        },
        {
          "title": "Defensas",
          "body": "CFI puede limitar indirect calls; UBSan puede detectar algunas conversiones/UB; pero el diseño de tipos y lifetime sigue siendo primordial."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un parser guarda kind=IMAGE pero el storage contiene un objeto TEXT y el código accede al layout IMAGE. ¿Qué clase de fallo conceptual es?",
      "steps": [
        [
          "Paso 1",
          "El tag y el objeto real no coinciden."
        ],
        [
          "Paso 2",
          "El consumidor interpreta memoria con un tipo/layout incorrecto."
        ],
        [
          "Paso 3",
          "Debe corregirse el invariant de construcción/validación."
        ]
      ],
      "answer": "Es type confusion por inconsistencia entre discriminante e identidad real del objeto."
    },
    "check": {
      "question": "¿Type confusion requiere necesariamente un buffer overflow?",
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
          "Solo en C++",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un cast hace verdadero un invariant de tipo que no se ha comprobado?",
        "answer": "no",
        "hint": "Solo cambia la interpretación del compilador."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un tag de union debe corresponder a la variante activa?",
        "answer": "si",
        "hint": "El discriminante sostiene el invariant."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿CFI puede mitigar parte del dispatch corrupto sin arreglar el type confusion original?",
        "answer": "si",
        "hint": "Mitiga una consecuencia concreta."
      }
    ]
  },
  "bin-exploitability-triage": {
    "id": "bin-exploitability-triage",
    "courseId": 25,
    "title": "Exploitability triage y mitigaciones combinadas",
    "shortTitle": "De crash reproducible a riesgo defendible",
    "duration": 115,
    "objective": "evaluar un memory-safety finding por primitive, precondiciones, mitigaciones, privilegio y exposición, produciendo evidencia reproducible sin desarrollar un exploit operacional.",
    "summary": [
      "Triage separa reachability, attacker control, primitive, reliability, impact y mitigations.",
      "NX/ASLR/PIE/canaries/RELRO/CFI/CET/PAC reducen distintas capacidades; ninguna puntuación binaria “mitigated=yes” sustituye el análisis.",
      "Un crash remoto en proceso sandboxed y un arbitrary write en broker privilegiado tienen superficies de impacto radicalmente distintas."
    ],
    "concept": "El objetivo defensivo es explicar por qué el bug importa, cómo reproducirlo de forma segura, qué barreras existen y cuál es la corrección de causa raíz.",
    "diagram": [],
    "rules": [
      "Documenta input mínimo y stack trace/sanitizer report, no weaponization.",
      "Enumera mitigaciones por capa y prueba cuáles están realmente activas.",
      "Prioriza patch, regression test y hardening; evita conclusiones absolutas basadas solo en una sigla."
    ],
    "deep": {
      "sections": [
        {
          "title": "Matriz de primitive",
          "body": "Read OOB, write OOB, UAF, arbitrary free, type confusion e info leak ofrecen capacidades distintas."
        },
        {
          "title": "Precondiciones",
          "body": "¿Requiere autenticación, formato raro, race, reinicio, heap grooming o local access? Las precondiciones alteran riesgo."
        },
        {
          "title": "Impacto",
          "body": "Evalúa autoridad del proceso, secrets, isolation boundary y posibilidad de pivot. Un sandbox reduce impacto potencial sin hacer aceptable el bug."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un fuzzer encuentra UAF en un worker sin privilegios, seccomp y namespace aislado. ¿Qué haces?",
      "steps": [
        [
          "Paso 1",
          "Reproduces con sanitizer y minimizas input."
        ],
        [
          "Paso 2",
          "Corriges lifetime y añades regression test."
        ],
        [
          "Paso 3",
          "Documentas que el sandbox reduce impacto pero no elimina la vulnerabilidad."
        ]
      ],
      "answer": "La corrección de causa raíz sigue siendo obligatoria; el aislamiento modifica el impacto y la exposición."
    },
    "check": {
      "question": "¿“ASLR+NX activos” basta para cerrar un bug de memory safety sin parche?",
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
          "Solo si no crashea",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El privilegio del proceso forma parte del impacto?",
        "answer": "si",
        "hint": "Autoridad determina consecuencias."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una info leak puede combinarse conceptualmente con otras corrupciones para debilitar mitigaciones?",
        "answer": "si",
        "hint": "Composición de primitives importa."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un sandbox convierte automáticamente una vulnerabilidad en riesgo cero?",
        "answer": "no",
        "hint": "Reduce alcance, no elimina el bug."
      }
    ]
  },
  "bin-hardening-lab": {
    "id": "bin-hardening-lab",
    "courseId": 25,
    "title": "Laboratorio defensivo de hardening binario",
    "shortTitle": "Medir defensas sin fabricar armas reutilizables",
    "duration": 120,
    "objective": "construir un laboratorio reproducible que compare diagnósticos y mitigaciones sobre programas de juguete, documentando qué cambia y qué no.",
    "summary": [
      "El laboratorio usa código propio deliberadamente defectuoso, ASan/UBSan, debugger y herramientas ELF para observar causa y mitigaciones.",
      "Las comparaciones deben mantener constante el bug y variar una defensa a la vez: stack protector, PIE, RELRO, NX/permissions o CFI cuando esté disponible.",
      "El resultado esperado es una matriz de comportamiento y un patch, no una cadena de explotación."
    ],
    "concept": "Una buena práctica de seguridad binaria produce evidencia: crash reproducible, diagnóstico, propiedad de mitigación, corrección y regression test.",
    "diagram": [],
    "rules": [
      "Ejecuta únicamente binaries/labs propios o explícitamente autorizados.",
      "No desactives mitigaciones del host globalmente; usa builds aisladas y configuraciones explícitas por artefacto.",
      "Conserva compiler/linker versions y flags para reproducibilidad."
    ],
    "deep": {
      "sections": [
        {
          "title": "Experimento",
          "body": "Build A: bug + diagnostics. Build B: misma fuente + stack protector. Build C: PIE/RELRO. Compara mapas/ELF/diagnósticos sin convertir diferencias en exploit steps."
        },
        {
          "title": "Herramientas",
          "body": "ASan/UBSan localizan memory/UB; debugger muestra estado; readelf/objdump inspeccionan ELF; compiler/linker flags describen mitigaciones."
        },
        {
          "title": "Cierre",
          "body": "El ejercicio termina cuando el bug está corregido, existe test negativo/regresión y se documenta qué mitigación habría reducido impacto si un fallo similar reaparece."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Quieres demostrar el valor de stack protector. ¿Cuál es un experimento responsable?",
      "steps": [
        [
          "Paso 1",
          "Usa un programa de juguete propio con un overflow reproducible."
        ],
        [
          "Paso 2",
          "Compara diagnóstico/comportamiento con builds controladas."
        ],
        [
          "Paso 3",
          "Parchea el bounds bug y añade regression test."
        ]
      ],
      "answer": "El laboratorio mide defensas y causa raíz en un entorno propio; no necesita atacar software de terceros."
    },
    "check": {
      "question": "¿El objetivo final del laboratorio debe ser un exploit funcional contra un servicio real?",
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
          "Solo si es público",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la primitive real y la mitigación que actúa en esa capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes registrar compiler/linker flags para reproducibilidad?",
        "answer": "si",
        "hint": "Las mitigaciones dependen de la build."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Es mejor variar una defensa a la vez para comparar efectos?",
        "answer": "si",
        "hint": "Aísla causalidad."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El patch y regression test forman parte del laboratorio, no solo el crash?",
        "answer": "si",
        "hint": "La ingeniería defensiva debe cerrar el ciclo."
      }
    ]
  }
});
