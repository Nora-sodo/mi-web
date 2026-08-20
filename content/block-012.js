/**
 * BLOQUE 012 — Sistemas operativos
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar mecanismo, política y contrato; distinguir siempre
 * proceso/thread, API/ABI/syscall y safety/liveness.
 */

window.LEARNING_PATHS[12] = {
  "level": "Experto progresivo",
  "estimatedHours": 42,
  "description": "Kernel, privilegios, boot, procesos, threads, scheduling, syscalls, IPC y concurrencia desde el contrato de usuario hasta los mecanismos internos.",
  "outcomes": [
    "Explicar cómo el SO abstrae, protege y multiplexa CPU, memoria y dispositivos.",
    "Seguir transiciones user/kernel, arranque, context switches y syscalls sin mezclar API, ABI e ISA.",
    "Elegir mecanismos IPC y primitivas de sincronización según su semántica y coste.",
    "Diagnosticar carreras y fallos de progreso distinguiendo safety, liveness, deadlock, livelock y starvation."
  ],
  "modules": [
    {
      "id": "m1-foundations",
      "title": "Kernel, privilegios y arranque",
      "description": "Qué resuelve el SO y cómo obtiene el control.",
      "lessons": [
        "os-role-kernel",
        "privilege-user-kernel",
        "boot-bios-uefi"
      ]
    },
    {
      "id": "m2-execution",
      "title": "Procesos, threads y scheduling",
      "description": "Estado ejecutable y reparto de CPU.",
      "lessons": [
        "processes-pcb-context",
        "threads-scheduling-preemption",
        "syscalls-api-abi"
      ]
    },
    {
      "id": "m3-ipc",
      "title": "Comunicación entre procesos",
      "description": "Flujos, notificaciones, mensajes y memoria compartida.",
      "lessons": [
        "ipc-pipes-signals",
        "ipc-shm-mq-sockets"
      ]
    },
    {
      "id": "m4-concurrency",
      "title": "Sincronización y progreso",
      "description": "Primitivas, memoria y fallos de concurrencia.",
      "lessons": [
        "sync-mutex-semaphore-condvar-atomics",
        "races-memory-order",
        "deadlock-livelock-starvation"
      ]
    },
    {
      "id": "m5-integration",
      "title": "Integración",
      "description": "Seguir una operación real a través del kernel.",
      "lessons": [
        "os-integration-challenge"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "os-role-kernel": {
    "id": "os-role-kernel",
    "courseId": 12,
    "title": "Qué resuelve un sistema operativo: abstracción, protección y multiplexación",
    "shortTitle": "El árbitro que también presta servicios",
    "duration": 95,
    "objective": "explicar por qué existe un sistema operativo y separar abstracción, protección, gestión de recursos y política de planificación.",
    "summary": [
      "El SO ofrece abstracciones como procesos, memoria virtual, archivos y sockets sobre hardware heterogéneo.",
      "El kernel ejecuta mecanismos privilegiados; las políticas deciden cómo repartir recursos dentro de objetivos concretos.",
      "Un sistema operativo no elimina el hardware: media entre programas y dispositivos preservando aislamiento y control."
    ],
    "concept": "Un sistema operativo coordina hardware y software mediante mecanismos de protección, virtualización y multiplexación. El kernel es la parte que opera con privilegios suficientes para gestionar memoria, CPU, interrupciones y dispositivos, aunque la arquitectura exacta varía entre sistemas.",
    "diagram": [],
    "rules": [
      "Distingue mecanismo de política: poder cambiar de proceso no decide por sí solo cuál debe ejecutarse.",
      "No confundas kernel con toda la distribución o entorno gráfico.",
      "Las abstracciones tienen coste y semántica concreta; un archivo, proceso o socket no es una metáfora sin implementación."
    ],
    "deep": {
      "sections": [
        {
          "title": "Abstracción",
          "body": "El SO presenta interfaces estables sobre detalles de CPU, memoria y dispositivos. Eso reduce acoplamiento entre cada aplicación y cada pieza de hardware."
        },
        {
          "title": "Protección",
          "body": "Modos de privilegio, memoria virtual y controles de acceso limitan qué puede hacer un programa y contienen fallos dentro de fronteras razonables."
        },
        {
          "title": "Multiplexación",
          "body": "CPU, memoria, almacenamiento y dispositivos se comparten en el tiempo o espacio. El kernel conserva estado y decide transiciones según políticas."
        }
      ],
      "commonErrors": [
        "Describir el SO solo como gestor de archivos.",
        "Asumir que todas las llamadas de biblioteca requieren entrar al kernel."
      ],
      "connections": [
        "Arquitectura de computadores",
        "Memoria virtual",
        "Drivers"
      ]
    },
    "example": {
      "problem": "Dos procesos quieren usar la misma CPU física al mismo tiempo.",
      "steps": [
        [
          "Paso 1",
          "El hardware solo ejecuta un conjunto limitado de contextos simultáneos."
        ],
        [
          "Paso 2",
          "El kernel conserva el estado de cada tarea y puede cambiar cuál está ejecutándose."
        ],
        [
          "Paso 3",
          "El scheduler aplica una política para elegir la siguiente tarea."
        ]
      ],
      "answer": "El mecanismo permite el cambio; la política elige a quién favorecer y cuándo."
    },
    "check": {
      "question": "¿Kernel y sistema operativo completo son necesariamente sinónimos?",
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
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El SO virtualiza recursos físicos mediante abstracciones? sí/no",
        "answer": "si",
        "hint": "Procesos y memoria virtual son ejemplos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una política de scheduling es lo mismo que el mecanismo de context switch? sí/no",
        "answer": "no",
        "hint": "Una decide; el otro ejecuta el cambio."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una GUI forma parte necesariamente del kernel? sí/no",
        "answer": "no",
        "hint": "Suele vivir en user space."
      }
    ]
  },
  "privilege-user-kernel": {
    "id": "privilege-user-kernel",
    "courseId": 12,
    "title": "User space, kernel space, privilegios y traps",
    "shortTitle": "La frontera que evita que malloc apague el Wi‑Fi",
    "duration": 95,
    "objective": "distinguir espacios de ejecución, niveles de privilegio y transición controlada al kernel mediante excepciones, interrupciones o syscalls.",
    "summary": [
      "User space ejecuta con privilegios restringidos; kernel space dispone de operaciones que el hardware protege.",
      "Ring 0/ring 3 es terminología típica de x86, no una taxonomía universal de toda ISA.",
      "Una syscall es una transición controlada: no es un salto arbitrario a cualquier dirección privilegiada."
    ],
    "concept": "Las CPU modernas implementan estados de privilegio. El SO configura qué operaciones y regiones de memoria son accesibles en cada estado y define puertas de entrada controladas al código privilegiado.",
    "diagram": [],
    "rules": [
      "No universalices los rings de x86 a ARM o RISC-V.",
      "Un cambio a kernel mode no implica necesariamente cambiar de proceso.",
      "Una interrupción hardware y una syscall pueden entrar al kernel por mecanismos relacionados pero tienen causas distintas."
    ],
    "deep": {
      "sections": [
        {
          "title": "Protección hardware",
          "body": "La ISA define operaciones privilegiadas y mecanismos de excepción. La MMU añade permisos por página y el kernel configura ambos."
        },
        {
          "title": "Entradas controladas",
          "body": "Syscalls, faults e interrupts transfieren control a handlers configurados por el SO; el hardware salva estado suficiente para poder retornar."
        },
        {
          "title": "Aislamiento",
          "body": "El kernel debe validar punteros, longitudes y permisos provenientes de user space. Confiar en ellos convertiría la frontera de privilegio en decoración."
        }
      ],
      "commonErrors": [
        "Decir ring 0 para cualquier arquitectura.",
        "Creer que toda ejecución del kernel es un proceso separado."
      ],
      "connections": [
        "ISA privilegiada",
        "MMU",
        "Syscalls"
      ]
    },
    "example": {
      "problem": "Un programa intenta ejecutar una instrucción privilegiada desde user mode.",
      "steps": [
        [
          "Paso 1",
          "La CPU detecta que el nivel actual no autoriza la operación."
        ],
        [
          "Paso 2",
          "Genera una excepción/trap según la ISA."
        ],
        [
          "Paso 3",
          "El handler del SO decide cómo responder, por ejemplo terminando el proceso."
        ]
      ],
      "answer": "La protección depende del hardware y de la política del kernel."
    },
    "check": {
      "question": "¿Entrar al kernel mediante syscall cambia obligatoriamente el PID del proceso?",
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
          "Solo con multicore",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿User space suele tener menos privilegios que kernel space? sí/no",
        "answer": "si",
        "hint": "Esa es la frontera principal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ring 3 es un concepto universal de RISC-V? sí/no",
        "answer": "no",
        "hint": "Es nomenclatura x86."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El kernel debe validar direcciones recibidas desde user space? sí/no",
        "answer": "si",
        "hint": "No puede confiar en punteros de una tarea no privilegiada."
      }
    ]
  },
  "boot-bios-uefi": {
    "id": "boot-bios-uefi",
    "courseId": 12,
    "title": "Boot: firmware, BIOS, UEFI, bootloader e inicialización del kernel",
    "shortTitle": "De reset a PID 1 sin teletransporte",
    "duration": 95,
    "objective": "describir la cadena de arranque y distinguir firmware, boot manager/loader e inicialización del kernel.",
    "summary": [
      "Tras reset, la CPU comienza en un estado definido por la plataforma y ejecuta firmware.",
      "BIOS y UEFI son modelos de firmware diferentes; UEFI ofrece interfaces y servicios estandarizados más ricos.",
      "El bootloader prepara y transfiere control al kernel, que después inicializa subsistemas antes de arrancar user space."
    ],
    "concept": "El boot es una cadena de transferencia de control y descubrimiento de plataforma. No existe un único camino universal: depende de firmware, arquitectura, política de arranque y formato del sistema.",
    "diagram": [],
    "rules": [
      "No trates BIOS y UEFI como nombres intercambiables.",
      "UEFI Boot Services dejan de estar disponibles tras ExitBootServices; Runtime Services son otra categoría.",
      "El kernel no aparece ya plenamente operativo al primer salto: debe establecer memoria, interrupciones, drivers y scheduler, entre otros subsistemas."
    ],
    "deep": {
      "sections": [
        {
          "title": "Firmware",
          "body": "Inicializa suficiente plataforma para localizar y ejecutar el siguiente componente. UEFI expone Boot Services y Runtime Services con contratos separados."
        },
        {
          "title": "Bootloader",
          "body": "Puede seleccionar kernel, cargar imagen/initramfs, preparar parámetros y transferir control siguiendo el protocolo de arranque."
        },
        {
          "title": "Kernel init",
          "body": "Configura memoria, tablas de interrupción, temporizadores, dispositivos y finalmente crea el entorno desde el que arranca user space."
        }
      ],
      "commonErrors": [
        "Suponer que UEFI es simplemente BIOS con interfaz gráfica.",
        "Asumir que todos los sistemas usan GRUB o incluso un bootloader separado."
      ],
      "connections": [
        "UEFI",
        "Arquitectura",
        "Linux interno"
      ]
    },
    "example": {
      "problem": "Una aplicación UEFI ha llamado con éxito a ExitBootServices.",
      "steps": [
        [
          "Paso 1",
          "Antes podía usar Boot Services para memoria/dispositivos definidos por UEFI."
        ],
        [
          "Paso 2",
          "ExitBootServices transfiere el control de esos recursos al sistema operativo."
        ],
        [
          "Paso 3",
          "Las Runtime Services que la plataforma soporte pertenecen a una interfaz distinta."
        ]
      ],
      "answer": "Boot Services no son servicios generales disponibles indefinidamente durante toda la vida del SO."
    },
    "check": {
      "question": "¿UEFI Boot Services siguen disponibles normalmente después de ExitBootServices?",
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
          "Solo en x86",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Firmware ejecuta antes que el kernel durante un arranque normal? sí/no",
        "answer": "si",
        "hint": "La plataforma debe iniciar la cadena."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿BIOS y UEFI son exactamente la misma interfaz? sí/no",
        "answer": "no",
        "hint": "Son modelos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El kernel necesita inicializar sus propios subsistemas tras recibir control? sí/no",
        "answer": "si",
        "hint": "Todavía debe construir su entorno de ejecución."
      }
    ]
  },
  "processes-pcb-context": {
    "id": "processes-pcb-context",
    "courseId": 12,
    "title": "Procesos, estado, PCB y context switch",
    "shortTitle": "Guardar una ejecución para poder traicionarla después",
    "duration": 95,
    "objective": "modelar un proceso como contexto de ejecución protegido y explicar qué estado necesita conservar el kernel al cambiar entre tareas.",
    "summary": [
      "Un proceso combina un espacio de recursos con uno o más flujos de ejecución, según el modelo del SO.",
      "El kernel mantiene metadatos de planificación, identidad, memoria, credenciales y estado necesario para reanudar la ejecución.",
      "Context switch es cambio de contexto ejecutable; no equivale obligatoriamente a cambiar todo el espacio de direcciones."
    ],
    "concept": "El proceso es una abstracción del SO para ejecutar un programa con identidad, recursos y protección. Un PCB es un nombre pedagógico para las estructuras de kernel que conservan el estado administrativo y ejecutable correspondiente.",
    "diagram": [],
    "rules": [
      "Programa y proceso no son sinónimos: un binario puede originar muchos procesos.",
      "No presupongas que cada context switch invalida todas las cachés o TLB.",
      "PCB es una abstracción conceptual; kernels reales pueden repartir el estado entre múltiples estructuras."
    ],
    "deep": {
      "sections": [
        {
          "title": "Estado ejecutable",
          "body": "PC, SP y registros relevantes deben preservarse cuando la tarea deja de ejecutar, salvo estado gestionado por otros mecanismos."
        },
        {
          "title": "Recursos",
          "body": "El proceso puede referenciar espacio virtual, descriptores, credenciales y señales; los detalles de compartición dependen del SO."
        },
        {
          "title": "Coste",
          "body": "Cambiar contexto tiene coste directo y efectos indirectos sobre cachés, TLB y predictor, pero no una penalización universal fija."
        }
      ],
      "commonErrors": [
        "Confundir proceso con archivo ejecutable.",
        "Definir PCB como una estructura con layout universal."
      ],
      "connections": [
        "Assembly",
        "Memoria virtual",
        "Scheduler"
      ]
    },
    "example": {
      "problem": "El scheduler detiene A y pasa a ejecutar B.",
      "steps": [
        [
          "Paso 1",
          "Se guarda el estado necesario de A."
        ],
        [
          "Paso 2",
          "Se selecciona/restaura el contexto ejecutable de B y, si procede, su contexto de memoria."
        ],
        [
          "Paso 3",
          "La CPU continúa desde el punto de B correspondiente."
        ]
      ],
      "answer": "El cambio preserva la ilusión de ejecuciones independientes que progresan en el tiempo."
    },
    "check": {
      "question": "¿Dos threads del mismo proceso pueden provocar un context switch sin cambiar de espacio virtual?",
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
          "Solo en Windows",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un programa en disco es lo mismo que un proceso ejecutándose? sí/no",
        "answer": "no",
        "hint": "Uno es código/datos almacenados; el otro es una instancia de ejecución."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El kernel conserva estado para reanudar tareas? sí/no",
        "answer": "si",
        "hint": "Sin ello no podría multiplexar la CPU."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿PCB tiene un layout estándar entre todos los kernels? sí/no",
        "answer": "no",
        "hint": "Es una abstracción pedagógica."
      }
    ]
  },
  "threads-scheduling-preemption": {
    "id": "threads-scheduling-preemption",
    "courseId": 12,
    "title": "Threads, scheduler, preemption y prioridades",
    "shortTitle": "Compartir memoria, compartir problemas",
    "duration": 95,
    "objective": "explicar threads dentro de un proceso y comparar scheduling preemptivo, prioridades y objetivos de política.",
    "summary": [
      "Threads de un mismo proceso suelen compartir espacio de direcciones y recursos, pero cada thread posee estado de ejecución propio como registros y stack.",
      "Preemption permite al scheduler retirar CPU a una tarea sin que esta ceda voluntariamente.",
      "Prioridad no implica una semántica universal: distintas políticas interpretan prioridades, fairness y deadlines de forma diferente."
    ],
    "concept": "Un thread representa un flujo de ejecución schedulable. El scheduler decide qué entidad runnable ocupa una CPU bajo una política; la implementación y entidad exacta varían por SO.",
    "diagram": [],
    "rules": [
      "No digas que threads comparten el stack: normalmente cada thread tiene el suyo.",
      "Concurrencia no implica paralelismo físico.",
      "Una prioridad alta no garantiza latencia arbitrariamente pequeña si existen bloqueos, interrupciones o políticas distintas."
    ],
    "deep": {
      "sections": [
        {
          "title": "Estados",
          "body": "Tareas suelen alternar entre runnable/running y estados de espera; los nombres exactos dependen del kernel."
        },
        {
          "title": "Preemption",
          "body": "Timers, wakeups u otros eventos pueden desencadenar decisiones de scheduling. Un scheduler no necesita esperar a que cada proceso sea amable."
        },
        {
          "title": "Políticas",
          "body": "Throughput, latencia, fairness y tiempo real son objetivos potencialmente en tensión. No existe una política óptima para todos los workloads."
        }
      ],
      "commonErrors": [
        "Confundir thread con core.",
        "Suponer que round-robin describe todos los schedulers modernos."
      ],
      "connections": [
        "Concurrencia",
        "Multicore",
        "Tiempo real"
      ]
    },
    "example": {
      "problem": "Dos threads CPU-bound están runnable en una máquina con un solo core disponible.",
      "steps": [
        [
          "Paso 1",
          "Solo uno puede ejecutar instrucciones en ese core en un instante."
        ],
        [
          "Paso 2",
          "El scheduler puede repartir tiempo mediante preemption."
        ],
        [
          "Paso 3",
          "Ambos son concurrentes aunque no ejecuten físicamente en paralelo."
        ]
      ],
      "answer": "Concurrencia describe solapamiento lógico; paralelismo exige recursos de ejecución simultáneos."
    },
    "check": {
      "question": "¿Dos threads concurrentes necesitan estar ejecutándose simultáneamente?",
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
          "Solo si comparten heap",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Cada thread suele tener su propio stack? sí/no",
        "answer": "si",
        "hint": "Comparte heap/globales, no el stack de ejecución."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Preemption requiere que la tarea llame voluntariamente yield? sí/no",
        "answer": "no",
        "hint": "El SO puede interrumpirla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Concurrencia implica necesariamente paralelismo? sí/no",
        "answer": "no",
        "hint": "Puede haber interleaving en un solo core."
      }
    ]
  },
  "syscalls-api-abi": {
    "id": "syscalls-api-abi",
    "courseId": 12,
    "title": "Syscalls, API, ABI y entrada al kernel",
    "shortTitle": "Una función bonita encima de un contrato menos bonito",
    "duration": 95,
    "objective": "distinguir llamada al sistema, wrapper de biblioteca, API y ABI, siguiendo el camino desde código de usuario hasta handler privilegiado.",
    "summary": [
      "Una syscall es una interfaz de entrada al kernel; una función de biblioteca puede envolverla, combinar varias o no realizar ninguna.",
      "API describe interfaz a nivel fuente; ABI fija detalles binarios como registros, layout y convenciones relevantes.",
      "El número y convenio de syscalls son dependientes de SO y arquitectura."
    ],
    "concept": "El programa suele invocar una API de biblioteca; el wrapper prepara argumentos según la ABI de syscall y ejecuta el mecanismo ISA de transición. El kernel valida, ejecuta y devuelve estado/error según ese contrato.",
    "diagram": [],
    "rules": [
      "No existe una syscall printf.",
      "No confundas ABI de funciones con ABI de syscalls.",
      "Los wrappers pueden reiniciar operaciones, traducir errores o mantener estado adicional."
    ],
    "deep": {
      "sections": [
        {
          "title": "API",
          "body": "Contrato pensado para código fuente: nombres, tipos y comportamiento documentado."
        },
        {
          "title": "ABI",
          "body": "Contrato binario: registros, stack, símbolos, representación y convenciones que permiten interoperabilidad sin recompilar cada componente."
        },
        {
          "title": "Syscall path",
          "body": "La instrucción/trap de entrada cambia privilegio de forma controlada y llega a código de kernel que valida argumentos y permisos."
        }
      ],
      "commonErrors": [
        "Asumir que todas las libc calls entran al kernel.",
        "Copiar números de syscall entre arquitecturas."
      ],
      "connections": [
        "Assembly",
        "Calling conventions",
        "Kernel"
      ]
    },
    "example": {
      "problem": "El programa llama a `write(fd, buf, n)` en libc.",
      "steps": [
        [
          "Paso 1",
          "El wrapper recibe argumentos según la ABI normal de funciones."
        ],
        [
          "Paso 2",
          "Prepara el convenio específico de syscall de la plataforma y entra al kernel."
        ],
        [
          "Paso 3",
          "El kernel valida el descriptor y buffer, realiza la operación o devuelve error."
        ]
      ],
      "answer": "La interfaz fuente, ABI de biblioteca y ABI de syscall son capas conectadas pero distintas."
    },
    "check": {
      "question": "¿Una llamada a biblioteca equivale siempre a una syscall 1:1?",
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
          "Solo en C",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿API y ABI son exactamente lo mismo? sí/no",
        "answer": "no",
        "hint": "Una es contrato fuente; otra binario."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una syscall cruza una frontera de privilegio? sí/no",
        "answer": "si",
        "hint": "Es su papel central."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Los números de syscall son universales entre Linux x86-64 y AArch64? sí/no",
        "answer": "no",
        "hint": "Son dependientes de arquitectura/ABI."
      }
    ]
  },
  "ipc-pipes-signals": {
    "id": "ipc-pipes-signals",
    "courseId": 12,
    "title": "IPC I: pipes y signals",
    "shortTitle": "Hablar entre procesos sin gritar por stdout",
    "duration": 95,
    "objective": "explicar pipes y signals como mecanismos IPC con semánticas diferentes y restricciones de uso.",
    "summary": [
      "Un pipe transporta un flujo de bytes entre extremos de lectura/escritura; no conserva mensajes salvo protocolos construidos encima.",
      "Una signal es una notificación asíncrona con semántica limitada, no un canal general de datos estructurados.",
      "Bloqueo, buffering, cierre de descriptores y atomicidad parcial importan para diseñar protocolos correctos sobre pipes."
    ],
    "concept": "IPC engloba mecanismos con modelos distintos. Pipes encajan bien en flujos; signals notifican eventos. Elegir por semántica evita convertir cada problema en bytes anónimos y esperanza.",
    "diagram": [],
    "rules": [
      "Pipe no preserva fronteras arbitrarias entre write() sucesivos.",
      "Los signal handlers tienen restricciones severas sobre qué funciones pueden usar de forma segura.",
      "Cerrar extremos no usados es parte de la semántica: afecta EOF y bloqueos."
    ],
    "deep": {
      "sections": [
        {
          "title": "Pipes",
          "body": "El kernel mantiene un buffer; lectores y escritores sincronizan indirectamente mediante disponibilidad de datos/espacio y estado de los extremos."
        },
        {
          "title": "Signals",
          "body": "Pueden interrumpir el flujo normal y ejecutar un handler o acción por defecto; algunas señales no se encolan de forma ilimitada."
        },
        {
          "title": "Protocolos",
          "body": "Si necesitas mensajes, define framing explícito sobre un byte stream o usa un mecanismo que preserve mensajes."
        }
      ],
      "commonErrors": [
        "Asumir que cada write produce exactamente un read.",
        "Llamar a cualquier función desde un signal handler."
      ],
      "connections": [
        "File descriptors",
        "Shell",
        "POSIX"
      ]
    },
    "example": {
      "problem": "Padre escribe dos registros binarios consecutivos en un pipe y el hijo hace un read grande.",
      "steps": [
        [
          "Paso 1",
          "El pipe expone bytes, no objetos C."
        ],
        [
          "Paso 2",
          "El read puede devolver una cantidad disponible dentro de las reglas del sistema."
        ],
        [
          "Paso 3",
          "El protocolo debe reconstruir framing y gestionar lecturas parciales."
        ]
      ],
      "answer": "La aplicación debe definir cómo delimitar y reconstruir mensajes."
    },
    "check": {
      "question": "¿Un pipe POSIX normal conserva por sí solo tus estructuras como mensajes tipados?",
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
          "Solo con fork",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Pipe es conceptualmente un flujo de bytes? sí/no",
        "answer": "si",
        "hint": "No es un serializador de structs."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una signal es un canal adecuado para enviar megabytes estructurados? sí/no",
        "answer": "no",
        "hint": "Es una notificación limitada."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cerrar extremos de pipe no usados puede ser necesario para que aparezca EOF? sí/no",
        "answer": "si",
        "hint": "La existencia de escritores abiertos importa."
      }
    ]
  },
  "ipc-shm-mq-sockets": {
    "id": "ipc-shm-mq-sockets",
    "courseId": 12,
    "title": "IPC II: shared memory, message queues y sockets",
    "shortTitle": "Tres formas de discutir sobre los mismos bytes",
    "duration": 95,
    "objective": "comparar memoria compartida, colas de mensajes y sockets por coste, aislamiento, framing y sincronización.",
    "summary": [
      "Shared memory evita copias de payload entre espacios tras el mapeo, pero exige sincronización explícita y un layout compartido correcto.",
      "Message queues proporcionan semántica de mensajes administrada por el sistema, con límites y políticas concretas.",
      "Sockets ofrecen una abstracción de comunicación local o de red; stream y datagram tienen semánticas diferentes."
    ],
    "concept": "No existe un IPC universalmente mejor. Shared memory optimiza acceso compartido pero aumenta responsabilidad; colas aportan framing; sockets unifican comunicación local/remota bajo APIs ampliamente usadas.",
    "diagram": [],
    "rules": [
      "Memoria compartida sin sincronización crea data races, no rendimiento gratis.",
      "SOCK_STREAM no preserva fronteras de send; SOCK_DGRAM sí preserva datagramas dentro de sus reglas.",
      "IPC local y networking pueden compartir API sin compartir todos los costes o garantías."
    ],
    "deep": {
      "sections": [
        {
          "title": "Shared memory",
          "body": "Dos procesos mapean páginas comunes. Los punteros absolutos pueden diferir entre espacios, así que el layout debe evitar supuestos inválidos."
        },
        {
          "title": "Message queues",
          "body": "El kernel mantiene mensajes y metadatos; simplifica framing a cambio de syscalls, copias o límites según implementación."
        },
        {
          "title": "Sockets",
          "body": "Un socket endpoint participa en un protocolo. TCP ofrece byte stream; UDP datagramas, y sockets Unix añaden transporte local con semántica propia."
        }
      ],
      "commonErrors": [
        "Poner un mutex pthread privado dentro de shared memory sin configurarlo para proceso compartido.",
        "Suponer que TCP entrega un mensaje por send."
      ],
      "connections": [
        "Redes",
        "Memoria virtual",
        "Serialización"
      ]
    },
    "example": {
      "problem": "Dos procesos comparten un ring buffer en memoria.",
      "steps": [
        [
          "Paso 1",
          "El payload puede residir en páginas compartidas."
        ],
        [
          "Paso 2",
          "Deben coordinar índices/productor-consumidor con sincronización válida entre procesos."
        ],
        [
          "Paso 3",
          "También necesitan reglas de lifetime, overflow y recuperación si uno muere."
        ]
      ],
      "answer": "Eliminar copias no elimina los problemas de concurrencia ni protocolo."
    },
    "check": {
      "question": "¿Shared memory elimina la necesidad de sincronización entre escritores concurrentes?",
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
          "Solo en NUMA",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿TCP preserva fronteras entre send() como mensajes? sí/no",
        "answer": "no",
        "hint": "Es byte stream."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Shared memory puede mapear las mismas páginas en dos procesos? sí/no",
        "answer": "si",
        "hint": "Esa es su base."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una message queue puede preservar unidades de mensaje? sí/no",
        "answer": "si",
        "hint": "Ese es su modelo típico."
      }
    ]
  },
  "sync-mutex-semaphore-condvar-atomics": {
    "id": "sync-mutex-semaphore-condvar-atomics",
    "courseId": 12,
    "title": "Sincronización: mutexes, semáforos, condition variables y atomics",
    "shortTitle": "El club donde “solo una persona” necesita definición formal",
    "duration": 95,
    "objective": "elegir primitivas de sincronización según exclusión, conteo, espera por condición y acceso atómico.",
    "summary": [
      "Mutex protege una región/invariante con ownership; semáforo representa un contador de permisos y no es simplemente un mutex con otro nombre.",
      "Condition variable permite dormir hasta que una condición pueda haber cambiado y debe usarse junto con un predicado protegido.",
      "Atomicidad no implica automáticamente orden suficiente entre threads; el modelo de memoria define qué ordenamientos existen."
    ],
    "concept": "Las primitivas de sincronización combinan atomicidad, espera y relaciones de orden. Elegirlas por nombre en lugar de por invariante suele producir programas que funcionan hasta que dejan de hacerlo.",
    "diagram": [],
    "rules": [
      "Espera de condition variable siempre en bucle sobre el predicado.",
      "Un semaphore no necesariamente tiene ownership del thread que decrementó.",
      "Atomic no significa lock-free ni wait-free automáticamente."
    ],
    "deep": {
      "sections": [
        {
          "title": "Mutex",
          "body": "Serializa acceso a un estado compartido y suele establecer relaciones de sincronización entre unlock/lock."
        },
        {
          "title": "Condition variable",
          "body": "El wait libera el mutex y duerme de forma coordinada, después reacquire; el despertar indica revisar el predicado, no que sea verdadero."
        },
        {
          "title": "Atomics",
          "body": "Operaciones indivisibles sobre objetos atómicos con órdenes de memoria especificables. Son base de locks y estructuras lock-free, pero requieren razonamiento formal."
        }
      ],
      "commonErrors": [
        "Usar if en vez de while alrededor de cond_wait.",
        "Creer que sem_post debe hacerlo el mismo thread que sem_wait."
      ],
      "connections": [
        "C memory model",
        "Futex",
        "Lock-free"
      ]
    },
    "example": {
      "problem": "Consumidor espera `queue_not_empty` con condition variable.",
      "steps": [
        [
          "Paso 1",
          "Bloquea el mutex y comprueba el predicado `queue.empty()` en bucle."
        ],
        [
          "Paso 2",
          "Si está vacío, wait libera mutex y duerme atómicamente respecto al protocolo."
        ],
        [
          "Paso 3",
          "Al despertar reacquire el mutex y vuelve a comprobar antes de consumir."
        ]
      ],
      "answer": "El predicado es la verdad; la notificación solo invita a volver a mirarla."
    },
    "check": {
      "question": "¿Un wakeup de condition variable garantiza que el predicado ya es verdadero cuando el thread ejecuta?",
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
          "Solo con un productor",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un mutex suele modelar ownership? sí/no",
        "answer": "si",
        "hint": "Lo adquiere un thread y ese ownership importa."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un semáforo es necesariamente binario? sí/no",
        "answer": "no",
        "hint": "Puede contar múltiples permisos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una operación atomic implica automáticamente consistencia secuencial si eliges otro memory_order? sí/no",
        "answer": "no",
        "hint": "El orden depende del modo utilizado."
      }
    ]
  },
  "races-memory-order": {
    "id": "races-memory-order",
    "courseId": 12,
    "title": "Race conditions, data races y orden de memoria",
    "shortTitle": "Cuando “funciona en mi máquina” adquiere doctorado",
    "duration": 95,
    "objective": "distinguir race condition general de data race formal y razonar sobre sincronización, visibilidad y orden de memoria.",
    "summary": [
      "Race condition es un término amplio: el resultado depende de una intercalación temporal relevante.",
      "En C/C++, una data race sobre objetos no atómicos puede producir undefined behavior; no es solo “a veces sale 41”.",
      "Locks y atomics crean relaciones de sincronización que permiten razonar sobre qué escrituras son visibles."
    ],
    "concept": "Concurrencia correcta necesita una relación happens-before adecuada entre accesos conflictivos. El hardware, compilador y lenguaje pueden reordenar operaciones dentro de las libertades permitidas, por lo que observar el código fuente no basta.",
    "diagram": [],
    "rules": [
      "`volatile` no arregla data races de threads.",
      "Una CPU coherente en caché no proporciona por sí sola el modelo de memoria del lenguaje.",
      "No uses sleeps para crear orden lógico."
    ],
    "deep": {
      "sections": [
        {
          "title": "Race vs data race",
          "body": "Toda data race es un problema de concurrencia, pero no toda race condition se reduce a dos accesos no atómicos a la misma dirección."
        },
        {
          "title": "Ordering",
          "body": "Compilador y hardware pueden reordenar si preservan las reglas observables aplicables. Las primitivas de sincronización restringen esas libertades."
        },
        {
          "title": "Invariantes",
          "body": "La unidad de corrección suele ser una invariante que abarca múltiples variables; hacer cada campo atomic por separado no hace atómica la transacción completa."
        }
      ],
      "commonErrors": [
        "Confundir cache coherence con sequential consistency.",
        "Poner atomic en un contador y asumir protegido el resto de estructura."
      ],
      "connections": [
        "Bloque 009 C",
        "Bloque 059 concurrencia",
        "Caches"
      ]
    },
    "example": {
      "problem": "Dos threads ejecutan `counter++` sobre un int no atómico sin lock.",
      "steps": [
        [
          "Paso 1",
          "Cada incremento implica read-modify-write lógico, no una transacción indivisible garantizada."
        ],
        [
          "Paso 2",
          "Los accesos pueden interlevar y en C producir una data race con UB."
        ],
        [
          "Paso 3",
          "Usa una primitiva atómica apropiada o protege la invariante con lock."
        ]
      ],
      "answer": "El problema no se resuelve esperando que una instrucción concreta del compilador sea “casi atómica”."
    },
    "check": {
      "question": "¿`volatile int counter` convierte `counter++` concurrente en operación segura entre threads en C?",
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
          "Solo en x86",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un data race puede ser UB en C? sí/no",
        "answer": "si",
        "hint": "El modelo de memoria lo prohíbe."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cache coherence y lenguaje memory model son la misma capa? sí/no",
        "answer": "no",
        "hint": "Una es hardware/protocolo; otra semántica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Atomicidad de cada campo garantiza una invariante multi-campo atómica? sí/no",
        "answer": "no",
        "hint": "La composición requiere diseño adicional."
      }
    ]
  },
  "deadlock-livelock-starvation": {
    "id": "deadlock-livelock-starvation",
    "courseId": 12,
    "title": "Deadlock, livelock y starvation",
    "shortTitle": "Tres maneras distintas de no avanzar",
    "duration": 95,
    "objective": "distinguir deadlock, livelock y starvation y aplicar condiciones, orden global y estrategias de prevención.",
    "summary": [
      "Deadlock implica un conjunto de ejecuciones bloqueadas esperando recursos/eventos que no pueden producirse bajo ese estado.",
      "Livelock tiene actividad pero no progreso útil; starvation permite progreso global mientras una tarea concreta puede esperar indefinidamente.",
      "Las cuatro condiciones de Coffman son un modelo clásico útil para deadlock de recursos reutilizables, no una descripción universal de todo bloqueo posible."
    ],
    "concept": "Los fallos de progreso son distintos de los fallos de seguridad. Un programa puede proteger perfectamente sus datos y aun así no terminar jamás porque sus protocolos de adquisición/espera están mal diseñados.",
    "diagram": [],
    "rules": [
      "Orden global de locks rompe ciclos si se aplica de forma consistente al conjunto relevante.",
      "Timeout no demuestra ausencia de deadlock; solo crea otra política de recuperación.",
      "Fairness ayuda starvation pero puede costar throughput/latencia."
    ],
    "deep": {
      "sections": [
        {
          "title": "Deadlock",
          "body": "Mutual exclusion, hold-and-wait, no preemption y circular wait forman el modelo clásico de Coffman. Romper una condición puede prevenir esa clase de deadlock."
        },
        {
          "title": "Livelock",
          "body": "Los participantes cambian estado repetidamente reaccionando entre sí sin completar trabajo, como dos agentes excesivamente educados cediéndose el paso."
        },
        {
          "title": "Starvation",
          "body": "Una política puede servir siempre a otros antes que a una tarea. Aging o fairness explícita son posibles mitigaciones según el sistema."
        }
      ],
      "commonErrors": [
        "Llamar deadlock a cualquier programa lento.",
        "Creer que try_lock elimina automáticamente todo problema de progreso."
      ],
      "connections": [
        "Scheduling",
        "Locks",
        "Distributed systems"
      ]
    },
    "example": {
      "problem": "Thread A toma L1 y espera L2; thread B toma L2 y espera L1.",
      "steps": [
        [
          "Paso 1",
          "Existe exclusión mutua en ambos locks."
        ],
        [
          "Paso 2",
          "Cada thread conserva uno mientras espera el otro y aparece un ciclo de espera."
        ],
        [
          "Paso 3",
          "Un orden global, por ejemplo siempre L1 antes que L2, rompe ese ciclo."
        ]
      ],
      "answer": "Es el patrón clásico de circular wait."
    },
    "check": {
      "question": "¿Un livelock puede consumir CPU aunque nadie complete trabajo útil?",
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
          "Solo con spinlocks",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Deadlock y starvation son exactamente lo mismo? sí/no",
        "answer": "no",
        "hint": "Uno puede bloquear un ciclo; el otro perjudica a una tarea mientras otras avanzan."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un orden global consistente de locks puede prevenir ciclos de adquisición? sí/no",
        "answer": "si",
        "hint": "Rompe circular wait en ese esquema."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Livelock implica ausencia total de actividad? sí/no",
        "answer": "no",
        "hint": "Hay actividad, falta progreso."
      }
    ]
  },
  "os-integration-challenge": {
    "id": "os-integration-challenge",
    "courseId": 12,
    "title": "Reto integrador: seguir una operación de usuario hasta hardware y vuelta",
    "shortTitle": "Una syscall completa, sin saltarse las capas incómodas",
    "duration": 95,
    "objective": "integrar proceso, privilegios, scheduling, IPC y sincronización siguiendo causalmente una operación bloqueante.",
    "summary": [
      "Una operación de usuario puede atravesar biblioteca, ABI, syscall, scheduler, driver e interrupciones antes de retornar.",
      "Bloquear no significa consumir CPU esperando: el scheduler puede ejecutar otras tareas hasta que llegue el evento.",
      "Wakeup vuelve una tarea elegible/runnable; no garantiza que ejecute inmediatamente."
    ],
    "concept": "El objetivo del bloque es poder seguir una operación real a través de capas sin confundir quién ejecuta, qué estado conserva y qué evento permite progresar.",
    "diagram": [],
    "rules": [
      "Distingue bloquear de busy-wait.",
      "Un interrupt handler que despierta una tarea no necesariamente hace que esa tarea ejecute en el mismo instante.",
      "El retorno de syscall debe restaurar un contexto válido y respetar permisos/errores."
    ],
    "deep": {
      "sections": [
        {
          "title": "Bloqueo",
          "body": "Si no hay datos, una syscall puede poner la tarea en espera y ceder CPU. Esa espera está representada en estructuras del kernel."
        },
        {
          "title": "Evento",
          "body": "Un dispositivo, otro proceso o timeout puede generar el evento que cambia el estado de la tarea."
        },
        {
          "title": "Reanudación",
          "body": "El scheduler eventualmente puede seleccionarla; el kernel completa la syscall y retorna a user mode con resultado o error."
        }
      ],
      "commonErrors": [
        "Narrar una syscall bloqueante como un loop dentro del proceso quemando CPU.",
        "Confundir wakeup con ejecución inmediata garantizada."
      ],
      "connections": [
        "Drivers",
        "Interrupciones",
        "Scheduler"
      ]
    },
    "example": {
      "problem": "`read()` sobre un descriptor bloqueante no tiene datos disponibles todavía.",
      "steps": [
        [
          "Paso 1",
          "El proceso entra al kernel mediante syscall y el kernel comprueba el estado del descriptor."
        ],
        [
          "Paso 2",
          "Si debe esperar, se bloquea la tarea y el scheduler ejecuta otra."
        ],
        [
          "Paso 3",
          "Cuando llega el evento, la tarea pasa a runnable; más tarde será seleccionada, completa read y retorna a user space."
        ]
      ],
      "answer": "La CPU puede hacer trabajo útil para otras tareas mientras esta espera."
    },
    "check": {
      "question": "¿Despertar una tarea (`wakeup`) significa necesariamente que ejecutará inmediatamente en la misma CPU?",
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
          "Solo si tiene PID menor",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa la separación de capas y el contrato que está actuando aquí."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una syscall bloqueante tiene que hacer busy-wait? sí/no",
        "answer": "no",
        "hint": "El SO puede desprogramar la tarea."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una interrupción puede causar que una tarea bloqueada pase a runnable? sí/no",
        "answer": "si",
        "hint": "El evento puede satisfacer la espera."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Runnable significa exactamente running? sí/no",
        "answer": "no",
        "hint": "Está elegible, no necesariamente ejecutando."
      }
    ]
  }
});
