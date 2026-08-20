/**
 * BLOQUE 015 — Linux interno
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar interfaz de observación, aislamiento, control de
 * recursos, política de seguridad y extensibilidad. /proc, namespaces,
 * cgroups, LSM y eBPF viven cerca del kernel, pero no son capas equivalentes.
 */

window.LEARNING_PATHS[15] = {
  "level": "Experto progresivo",
  "estimatedHours": 64,
  "description": "Linux desde dentro: pseudo-filesystems, aislamiento, control de recursos, service management, seguridad, módulos y eBPF, con proyectos de integración.",
  "outcomes": [
    "Explicar cómo Linux expone estado y objetos del kernel mediante /proc, /sys y /dev sin confundir sus contratos.",
    "Construir un modelo preciso de namespaces, cgroups y containers, separando aislamiento, control y privilegios.",
    "Analizar systemd, permisos/capabilities y LSM como capas de política y supervisión sobre mecanismos del kernel.",
    "Razonar sobre módulos y eBPF considerando lifecycle, verifier, attach points, seguridad y compatibilidad."
  ],
  "modules": [
    {
      "id": "m1-linux-interfaces",
      "title": "Kernel e interfaces de observación",
      "description": "Tareas, procfs, sysfs, device nodes y señales.",
      "lessons": [
        "linux-kernel-process-model",
        "linux-procfs",
        "linux-sysfs-dev",
        "linux-syscalls-signals"
      ]
    },
    {
      "id": "m2-isolation",
      "title": "Aislamiento y recursos",
      "description": "Namespaces, cgroups y composición de containers.",
      "lessons": [
        "linux-namespaces",
        "linux-cgroups-v2",
        "linux-containers"
      ]
    },
    {
      "id": "m3-management-security",
      "title": "Gestión y seguridad",
      "description": "systemd, capabilities y Linux Security Modules.",
      "lessons": [
        "linux-systemd",
        "linux-permissions-capabilities",
        "linux-lsm-selinux-apparmor"
      ]
    },
    {
      "id": "m4-extension",
      "title": "Extender y observar el kernel",
      "description": "Módulos, eBPF y proyectos integradores.",
      "lessons": [
        "linux-kernel-modules",
        "linux-ebpf",
        "linux-integration-projects"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "linux-kernel-process-model": {
    "id": "linux-kernel-process-model",
    "courseId": 15,
    "title": "Linux kernel: arquitectura y modelo de procesos",
    "shortTitle": "Qué significa realmente 'Linux'",
    "duration": 105,
    "objective": "distinguir kernel Linux, user space, distribución y modelo de tarea, y seguir una operación desde proceso hasta subsistema del kernel.",
    "summary": [
      "Linux es el kernel; una distribución añade user space, herramientas, bibliotecas y políticas.",
      "El kernel integra scheduling, memoria, VFS, networking, drivers, seguridad y otras infraestructuras.",
      "En Linux, procesos y threads se representan mediante tareas que pueden compartir distintos recursos."
    ],
    "concept": "Linux es un kernel monolítico modular: muchos subsistemas ejecutan en el mismo espacio privilegiado, pero el código puede estar compilado dentro del kernel o cargarse como módulo. 'Monolítico' no significa 'un archivo gigantesco sin interfaces'.",
    "diagram": [],
    "rules": [
      "Distingue kernel de distribución y de shell.",
      "No conviertas detalles de Linux en propiedades universales de Unix.",
      "Razona en términos de tareas, credenciales, mm, files y namespaces compartidos o separados."
    ],
    "deep": {
      "sections": [
        {
          "title": "Kernel y user space",
          "body": "El kernel proporciona mecanismos y ABI de syscalls; libc, systemd, shells y la mayoría de servicios viven en user space."
        },
        {
          "title": "Modelo de tarea",
          "body": "Linux usa estructuras de tarea para representar unidades planificables; clone puede crear relaciones de compartición más finas que la dicotomía proceso/thread sugiere."
        },
        {
          "title": "Monolítico modular",
          "body": "Drivers, filesystems y protocolos pueden compartir address space de kernel y aun mantener fronteras de subsistema, ownership y APIs internas."
        }
      ],
      "commonErrors": [
        "Llamar 'Linux' a cualquier componente de una distribución sin distinguir capas.",
        "Suponer que módulo cargable implica aislamiento de memoria frente al kernel."
      ],
      "connections": [
        "Sistemas operativos",
        "Syscalls",
        "Drivers"
      ]
    },
    "example": {
      "problem": "Una aplicación hace read() sobre un socket.",
      "steps": [
        [
          "Paso 1",
          "La biblioteca prepara la syscall conforme al ABI."
        ],
        [
          "Paso 2",
          "El kernel valida el descriptor y entra en VFS/socket layer."
        ],
        [
          "Paso 3",
          "El stack de red y el driver pueden bloquear, despertar y devolver datos al proceso."
        ]
      ],
      "answer": "La operación atraviesa varias capas del kernel; no existe una única función universal llamada 'leer Internet'."
    },
    "check": {
      "question": "¿systemd forma parte del kernel Linux?",
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
          "Solo con cgroups",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Linux kernel y user space son capas distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Linux es estrictamente el kernel? sí/no",
        "answer": "si",
        "hint": "Una distribución añade mucho user space."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un módulo cargable comparte normalmente el address space del kernel? sí/no",
        "answer": "si",
        "hint": "No es un proceso aislado."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿clone() puede controlar qué recursos comparten dos tareas? sí/no",
        "answer": "si",
        "hint": "Flags como CLONE_VM/CLONE_FILES modelan compartición."
      }
    ]
  },
  "linux-procfs": {
    "id": "linux-procfs",
    "courseId": 15,
    "title": "/proc: procesos, estado y sysctl",
    "shortTitle": "Un filesystem que no es un disco",
    "duration": 95,
    "objective": "interpretar procfs como interfaz dinámica a estado del kernel y procesos, y usar /proc/PID con conciencia de namespaces, permisos y races.",
    "summary": [
      "/proc es un pseudo-filesystem que expone información de procesos y del sistema.",
      "Muchos ficheros se generan al leerlos; no representan bloques persistidos en disco.",
      "/proc/sys expone parte de la interfaz sysctl y algunos nodos son modificables."
    ],
    "concept": "procfs proyecta estructuras internas y estado del kernel en una interfaz de ficheros. Esa interfaz es útil para observabilidad y control, pero una lectura puede quedar obsoleta inmediatamente después.",
    "diagram": [],
    "rules": [
      "Trata /proc/PID como una vista dinámica, no como snapshot consistente global.",
      "No parsees campos no documentados suponiendo estabilidad eterna.",
      "Recuerda que permisos, hidepid y namespaces pueden cambiar lo visible."
    ],
    "deep": {
      "sections": [
        {
          "title": "Por proceso",
          "body": "Entradas como /proc/PID/status, maps, fd y task exponen distintas vistas del proceso/tareas."
        },
        {
          "title": "Sistema",
          "body": "Archivos como /proc/meminfo, /proc/cpuinfo o /proc/interrupts exponen información global o por CPU según interfaz."
        },
        {
          "title": "sysctl",
          "body": "/proc/sys contiene knobs de kernel; escribirlos puede cambiar comportamiento del sistema en vivo."
        }
      ],
      "commonErrors": [
        "Confundir /proc/PID/fd/N con una copia del archivo abierto.",
        "Suponer que dos lecturas consecutivas describen un estado atómico."
      ],
      "connections": [
        "VFS",
        "Observabilidad",
        "Sysctl"
      ]
    },
    "example": {
      "problem": "Quieres saber qué descriptores mantiene abiertos un proceso 4242.",
      "steps": [
        [
          "Paso 1",
          "Inspeccionas /proc/4242/fd."
        ],
        [
          "Paso 2",
          "Cada entrada representa un descriptor y suele ser un symlink descriptivo."
        ],
        [
          "Paso 3",
          "Correlacionas con /proc/4242/fdinfo cuando necesitas flags/offset u otros detalles disponibles."
        ]
      ],
      "answer": "Procfs permite inspección sin que el proceso coopere explícitamente, sujeta a permisos y a que el proceso siga existiendo."
    },
    "check": {
      "question": "¿/proc debe corresponder a un filesystem persistente en disco?",
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
          "Solo /proc/sys",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "procfs es un pseudo-filesystem."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿/proc puede exponer datos generados dinámicamente al leer? sí/no",
        "answer": "si",
        "hint": "Interfaz a estructuras del kernel."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿/proc/PID puede desaparecer entre dos operaciones si termina el proceso? sí/no",
        "answer": "si",
        "hint": "Existe una race natural con lifecycle."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Escribir ciertos nodos de /proc/sys puede cambiar parámetros del kernel en ejecución? sí/no",
        "answer": "si",
        "hint": "Es una interfaz sysctl."
      }
    ]
  },
  "linux-sysfs-dev": {
    "id": "linux-sysfs-dev",
    "courseId": 15,
    "title": "/sys y /dev: objetos del kernel y nodos de dispositivo",
    "shortTitle": "Dos árboles, dos contratos",
    "duration": 105,
    "objective": "distinguir sysfs de /dev y explicar kobjects, atributos, device nodes, major/minor y el papel de device manager en user space.",
    "summary": [
      "sysfs expone objetos del kernel, atributos y relaciones; está ligado a kobjects.",
      "/dev contiene nodos de dispositivo que participan en el namespace VFS y permiten abrir dispositivos mediante interfaces character/block.",
      "sysfs no es un sustituto general de /dev, y /dev no es una base de datos de todos los atributos del hardware."
    ],
    "concept": "/sys representa topologías y atributos del device model; /dev proporciona nombres de acceso a muchos dispositivos. En sistemas actuales, la creación y gestión de nodos puede combinar devtmpfs del kernel con políticas de user space como udev/systemd-udevd.",
    "diagram": [],
    "rules": [
      "No confundas sysfs con la syscall obsoleta sysfs(2).",
      "Usa APIs/ABIs documentadas en vez de inferir topología por rutas accidentales.",
      "Major/minor identifica el dispositivo para el kernel; el pathname de /dev es una convención de namespace."
    ],
    "deep": {
      "sections": [
        {
          "title": "sysfs",
          "body": "Cada kobject registrado puede tener un directorio y atributos; symlinks expresan relaciones entre objetos/subsistemas."
        },
        {
          "title": "Device nodes",
          "body": "Un character/block special file contiene tipo y dev_t; open conecta esa referencia con operaciones del driver/subsistema."
        },
        {
          "title": "Hotplug",
          "body": "El kernel emite eventos y user space puede aplicar naming, permisos y symlinks según política."
        }
      ],
      "commonErrors": [
        "Creer que /sys contiene device files equivalentes a /dev.",
        "Asumir que renombrar un nodo /dev cambia la identidad hardware subyacente."
      ],
      "connections": [
        "Device model",
        "VFS",
        "Drivers"
      ]
    },
    "example": {
      "problem": "Un dispositivo aparece como /sys/class/net/eth0 pero no es un archivo de datos de red.",
      "steps": [
        [
          "Paso 1",
          "sysfs expone atributos y relaciones del netdev."
        ],
        [
          "Paso 2",
          "El tráfico se maneja mediante sockets/stack de red, no leyendo el directorio sysfs."
        ],
        [
          "Paso 3",
          "Herramientas pueden consultar atributos en /sys sin convertirlo en el datapath."
        ]
      ],
      "answer": "sysfs es control/observabilidad de objetos; el datapath puede vivir en APIs totalmente distintas."
    },
    "check": {
      "question": "¿/sys y /dev tienen exactamente la misma función?",
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
          "Solo para block devices",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Son interfaces distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿sysfs expone kobjects y atributos? sí/no",
        "answer": "si",
        "hint": "Está ligado al device model."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un nodo /dev es necesariamente un archivo regular almacenado en ext4? sí/no",
        "answer": "no",
        "hint": "Es un special file del VFS."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El nombre /dev/sda es por sí solo la identidad física universal del dispositivo? sí/no",
        "answer": "no",
        "hint": "Naming es política/contexto."
      }
    ]
  },
  "linux-syscalls-signals": {
    "id": "linux-syscalls-signals",
    "courseId": 15,
    "title": "Syscalls y signals en Linux",
    "shortTitle": "Entradas síncronas y eventos asíncronos",
    "duration": 100,
    "objective": "analizar la ABI Linux de syscalls y el modelo de señales sin confundir wrapper de libc, trap, signal delivery y handler de usuario.",
    "summary": [
      "Una syscall es una entrada controlada al kernel mediante el ABI de la arquitectura.",
      "Una señal es un mecanismo de notificación que puede quedar pending, bloquearse o provocar una acción por defecto/handler.",
      "El kernel puede interrumpir el flujo de user space para entregar una señal, pero signal handler no equivale a interrupt handler de hardware."
    ],
    "concept": "Linux define una syscall ABI por arquitectura y un modelo de señales por proceso/thread. La entrega de una señal modifica temporalmente el contexto de user space de acuerdo con reglas del kernel y ABI.",
    "diagram": [],
    "rules": [
      "Distingue wrapper de libc de syscall real.",
      "En handlers usa únicamente operaciones async-signal-safe cuando la portabilidad POSIX importe.",
      "No confundas pending con delivered ni process-directed con thread-directed."
    ],
    "deep": {
      "sections": [
        {
          "title": "Entrada de syscall",
          "body": "Los números, registros y mecanismo de trap dependen de la arquitectura."
        },
        {
          "title": "Signal mask",
          "body": "Cada thread tiene máscara de señales; las señales pueden quedar pendientes hasta que sean desbloqueadas."
        },
        {
          "title": "Entrega",
          "body": "El kernel prepara contexto para ejecutar el handler y luego restaurar el flujo mediante el mecanismo ABI correspondiente."
        }
      ],
      "commonErrors": [
        "Llamar 'interrupción' a señal y asumir que ejecuta en kernel interrupt context.",
        "Hacer malloc/printf arbitrariamente desde handlers y asumir seguridad."
      ],
      "connections": [
        "ABI",
        "POSIX signals",
        "Context switch"
      ]
    },
    "example": {
      "problem": "SIGTERM llega a un proceso con handler instalado mientras un thread ejecuta user space.",
      "steps": [
        [
          "Paso 1",
          "La señal pasa a pending/selección de thread según reglas aplicables."
        ],
        [
          "Paso 2",
          "Al regresar/entrar a user space, el kernel puede preparar el frame de señal."
        ],
        [
          "Paso 3",
          "El handler ejecuta en user space y después se restaura el contexto para continuar."
        ]
      ],
      "answer": "La señal altera el flujo del programa mediante cooperación kernel/ABI; no es una IRQ hardware ejecutando el handler del proceso en kernel mode."
    },
    "check": {
      "question": "¿Un signal handler de usuario ejecuta normalmente como interrupt handler hardware en kernel mode?",
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
          "Solo SIGKILL",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Signals y IRQ son mecanismos distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una función libc puede envolver una syscall? sí/no",
        "answer": "si",
        "hint": "API y syscall ABI son capas distintas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cada thread posee una signal mask propia? sí/no",
        "answer": "si",
        "hint": "La máscara es por thread."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿SIGKILL puede capturarse con un handler de usuario? sí/no",
        "answer": "no",
        "hint": "Tiene acción no capturable."
      }
    ]
  },
  "linux-namespaces": {
    "id": "linux-namespaces",
    "courseId": 15,
    "title": "Namespaces: aislar vistas del sistema",
    "shortTitle": "Mismo kernel, mundos distintos",
    "duration": 110,
    "objective": "explicar mount, PID, network, IPC, UTS, user, cgroup y time namespaces como aislamiento de vistas y razonar con clone/unshare/setns.",
    "summary": [
      "Namespaces aíslan recursos o vistas globales para grupos de procesos.",
      "No virtualizan una máquina completa ni crean otro kernel.",
      "Un proceso pertenece a un namespace de cada tipo soportado y puede observar IDs/topologías relativos a esa vista."
    ],
    "concept": "Namespaces cambian qué objetos/nombres ve un proceso. Se crean o unen mediante APIs como clone(), unshare() y setns(); /proc/PID/ns expone handles de namespace.",
    "diagram": [],
    "rules": [
      "Distingue aislamiento de nombres/vistas de control de recursos.",
      "User namespaces cambian el contexto en el que se evalúan capacidades; root dentro no equivale automáticamente a root del host.",
      "PID 1 dentro de un PID namespace tiene semántica especial dentro de ese namespace."
    ],
    "deep": {
      "sections": [
        {
          "title": "Tipos",
          "body": "Mount aísla tabla de mounts; PID IDs; net stack/ifaces; IPC objetos SysV/POSIX; UTS hostname; user UID/GID+capabilities; cgroup vista; time ciertos relojes."
        },
        {
          "title": "Jerarquías",
          "body": "Algunos namespaces son jerárquicos, como PID y user; las relaciones importan para visibilidad y privilegios."
        },
        {
          "title": "Handles",
          "body": "Los symlinks de /proc/PID/ns permiten identificar/abrir namespaces y setns puede asociar una tarea a namespaces compatibles."
        }
      ],
      "commonErrors": [
        "Decir que namespace = container.",
        "Suponer que dos procesos en distintos mount namespaces no pueden compartir el mismo inode subyacente."
      ],
      "connections": [
        "Containers",
        "Capabilities",
        "VFS"
      ]
    },
    "example": {
      "problem": "Un proceso en un nuevo PID namespace ve a su init como PID 1.",
      "steps": [
        [
          "Paso 1",
          "El kernel mantiene identidad interna y relaciones de namespace."
        ],
        [
          "Paso 2",
          "La misma tarea puede tener un PID distinto visto desde un namespace ancestro."
        ],
        [
          "Paso 3",
          "Herramientas deben interpretar IDs en el contexto correcto."
        ]
      ],
      "answer": "Los IDs son una vista namespace-relative, no una propiedad global única visible igual desde todas partes."
    },
    "check": {
      "question": "¿Crear un network namespace crea un segundo kernel Linux?",
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
          "Solo con veth",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Namespaces comparten kernel."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿/proc/PID/ns expone referencias a namespaces? sí/no",
        "answer": "si",
        "hint": "Permite inspección/handles."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿setns() puede usarse para unirse a ciertos namespaces existentes? sí/no",
        "answer": "si",
        "hint": "Con permisos y restricciones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un mount namespace y un cgroup limitan exactamente el mismo recurso? sí/no",
        "answer": "no",
        "hint": "Aislamiento de vista vs control/contabilidad."
      }
    ]
  },
  "linux-cgroups-v2": {
    "id": "linux-cgroups-v2",
    "courseId": 15,
    "title": "cgroups v2: control, contabilidad y presión",
    "shortTitle": "Presupuestos para procesos",
    "duration": 115,
    "objective": "modelar la jerarquía unificada de cgroup v2, controllers, límites, estadísticas y presión sin confundir cgroup con namespace.",
    "summary": [
      "cgroups agrupan procesos jerárquicamente para contabilizar y controlar recursos.",
      "cgroup v2 usa una jerarquía unificada con controllers habilitados según reglas de delegación.",
      "CPU, memory, pids e I/O tienen semánticas diferentes: un 'límite' no significa lo mismo en todos los controllers."
    ],
    "concept": "Un cgroup es una pertenencia jerárquica que los controllers usan para aplicar políticas y contabilizar consumo. No oculta por sí mismo el recurso al proceso; para aislamiento de vistas entran namespaces y otras capas.",
    "diagram": [],
    "rules": [
      "Distingue hard limits, weights, max y pressure según controller.",
      "No edites cgroupfs arbitrariamente bajo un manager que posee la jerarquía sin respetar delegación.",
      "Interpreta memory.current/memory.max y eventos en conjunto; OOM no es un simple contador lineal."
    ],
    "deep": {
      "sections": [
        {
          "title": "Jerarquía v2",
          "body": "Los procesos aparecen en nodos de una jerarquía única y controllers se habilitan hacia descendientes."
        },
        {
          "title": "CPU",
          "body": "cpu.weight reparte preferencia relativa; cpu.max puede imponer cuota/periodo."
        },
        {
          "title": "Memoria e I/O",
          "body": "memory.high/max y io.* expresan controles distintos; PSI puede ayudar a observar presión y stalls."
        }
      ],
      "commonErrors": [
        "Confundir cgroup namespace con cgroup controller.",
        "Suponer que cpu.weight reserva exactamente un porcentaje fijo en cualquier carga."
      ],
      "connections": [
        "Containers",
        "Scheduling",
        "Memory pressure"
      ]
    },
    "example": {
      "problem": "Dos servicios compiten por CPU y uno tiene mayor cpu.weight.",
      "steps": [
        [
          "Paso 1",
          "Ambos pertenecen a cgroups hermanos con controller CPU activo."
        ],
        [
          "Paso 2",
          "El scheduler usa los pesos relativos cuando existe contención relevante."
        ],
        [
          "Paso 3",
          "Si un grupo queda solo, el peso no tiene por qué limitarlo a una fracción fija del CPU."
        ]
      ],
      "answer": "Weight es una política relativa de reparto, no un techo absoluto equivalente a cpu.max."
    },
    "check": {
      "question": "¿cgroup v2 y namespace son el mismo mecanismo?",
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
          "Solo para memory",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Control y aislamiento son capas distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿cgroups pueden contabilizar y limitar recursos? sí/no",
        "answer": "si",
        "hint": "Ese es su objetivo central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿cpu.weight equivale necesariamente a un límite duro de porcentaje? sí/no",
        "answer": "no",
        "hint": "Es peso relativo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿memory.max puede actuar como límite superior de memoria del cgroup? sí/no",
        "answer": "si",
        "hint": "Es un control de v2."
      }
    ]
  },
  "linux-containers": {
    "id": "linux-containers",
    "courseId": 15,
    "title": "Containers: composición de primitivas Linux",
    "shortTitle": "No hay syscall create_container()",
    "duration": 115,
    "objective": "descomponer un container en namespaces, cgroups, root filesystem, capabilities, seccomp/LSM y runtime, y analizar sus límites de aislamiento.",
    "summary": [
      "Un container comparte el kernel del host; no es una VM por definición.",
      "Runtimes componen múltiples primitivas del kernel y configuración de user space.",
      "Namespaces aíslan vistas; cgroups controlan recursos; capabilities/LSM/seccomp restringen privilegios/acciones."
    ],
    "concept": "'Container' es una construcción de sistema, no una única abstracción del kernel. Un runtime prepara namespaces, mounts, credenciales, cgroups y políticas, y después ejecuta el proceso de entrada.",
    "diagram": [],
    "rules": [
      "No llames sandbox perfecta a un container por defecto.",
      "Mantén mínima la superficie de capacidades y mounts compartidos.",
      "Distingue imagen, filesystem root, proceso y runtime."
    ],
    "deep": {
      "sections": [
        {
          "title": "Composición",
          "body": "Mount/PID/net/user namespaces + cgroups + capabilities + LSM/seccomp forman piezas comunes, pero la configuración concreta varía."
        },
        {
          "title": "Root filesystem",
          "body": "pivot_root/chroot/mount namespaces ayudan a construir vista de filesystem; chroot solo no es frontera de seguridad completa."
        },
        {
          "title": "Ataque",
          "body": "Compartir kernel implica que vulnerabilidades del kernel y configuraciones privilegiadas importan para el aislamiento."
        }
      ],
      "commonErrors": [
        "Equiparar container con VM.",
        "Pensar que UID 0 dentro siempre equivale a host root."
      ],
      "connections": [
        "Namespaces",
        "cgroups",
        "Security"
      ]
    },
    "example": {
      "problem": "Un runtime crea un container sin network host.",
      "steps": [
        [
          "Paso 1",
          "Crea un network namespace."
        ],
        [
          "Paso 2",
          "Configura interfaces virtuales/routing desde el host o un helper privilegiado."
        ],
        [
          "Paso 3",
          "Aplica cgroups/credenciales y ejecuta el init del container en los namespaces preparados."
        ]
      ],
      "answer": "El aislamiento resulta de la composición; ninguna syscall individual crea todo el container."
    },
    "check": {
      "question": "¿Existe una única syscall Linux estándar llamada create_container()?",
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
          "Solo en cgroup v2",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Containers se componen."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Los containers comparten normalmente el kernel del host? sí/no",
        "answer": "si",
        "hint": "A diferencia de una VM clásica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿chroot por sí solo constituye toda la seguridad de un container moderno? sí/no",
        "answer": "no",
        "hint": "Faltan muchas capas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un container puede combinar namespaces y cgroups? sí/no",
        "answer": "si",
        "hint": "Aislamiento + control."
      }
    ]
  },
  "linux-systemd": {
    "id": "linux-systemd",
    "courseId": 15,
    "title": "systemd: units, dependencias y supervisión",
    "shortTitle": "PID 1 sin hechicería",
    "duration": 110,
    "objective": "razonar sobre systemd como manager de unidades, distinguir dependency ordering, activation y restart semantics, y leer service units sin memorizar recetas.",
    "summary": [
      "systemd como PID 1 actúa como system/service manager en sistemas que lo usan.",
      "Una unit describe recursos como services, sockets, mounts, devices, timers o targets.",
      "Dependencia y orden son conceptos distintos: Wants/Requires no equivalen a Before/After."
    ],
    "concept": "systemd construye un grafo de units y jobs. La activación puede ser explícita o por socket, timer, path, device, D-Bus, etc.; supervisar un servicio implica lifecycle y cgroups, no solo ejecutar un shell script.",
    "diagram": [],
    "rules": [
      "Distingue requirement dependencies de ordering dependencies.",
      "No uses Type=forking o shell wrappers por costumbre si el servicio puede permanecer foreground.",
      "Interpreta restart policy junto con exit status, rate limiting y dependencies."
    ],
    "deep": {
      "sections": [
        {
          "title": "Units",
          "body": ".service, .socket, .mount, .timer, .target y otros tipos comparten infraestructura de dependencias."
        },
        {
          "title": "Ordering",
          "body": "After=B ordena arranque relativo si ambos jobs existen; no necesariamente arrastra B al transaction por sí solo."
        },
        {
          "title": "Supervisión",
          "body": "El manager sigue procesos del servicio y puede aplicar cgroups, sandboxing, limits y reinicios según configuración."
        }
      ],
      "commonErrors": [
        "Creer que After=network.target significa 'Internet funcional'.",
        "Confundir enable con start inmediato."
      ],
      "connections": [
        "Boot",
        "cgroups",
        "Service supervision"
      ]
    },
    "example": {
      "problem": "foo.service declara Requires=bar.service y After=bar.service.",
      "steps": [
        [
          "Paso 1",
          "Requires incorpora una relación de requirement entre units."
        ],
        [
          "Paso 2",
          "After establece que, cuando ambos jobs se ejecutan, foo se ordena después de bar."
        ],
        [
          "Paso 3",
          "Son ejes distintos: dependencia y orden se expresan por directivas diferentes."
        ]
      ],
      "answer": "El par modela tanto inclusión/fortaleza de dependencia como orden de arranque."
    },
    "check": {
      "question": "¿After=x.service por sí solo expresa necesariamente que x debe arrancarse?",
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
          "Solo con Type=simple",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Ordering no es requirement."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿systemd puede gestionar units que no sean .service? sí/no",
        "answer": "si",
        "hint": "Sockets, timers, mounts, etc."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿enable y start significan exactamente lo mismo? sí/no",
        "answer": "no",
        "hint": "Enable configura activación futura; start lanza ahora."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Requires y After modelan dimensiones distintas? sí/no",
        "answer": "si",
        "hint": "Dependencia vs orden."
      }
    ]
  },
  "linux-permissions-capabilities": {
    "id": "linux-permissions-capabilities",
    "courseId": 15,
    "title": "Permisos y capabilities",
    "shortTitle": "Root partido en piezas (más o menos)",
    "duration": 115,
    "objective": "analizar DAC Unix y Linux capabilities, distinguir real/effective/fs UID y capability sets, y diseñar least privilege sin asumir que capabilities son permisos de archivo normales.",
    "summary": [
      "Los bits rwx y ownership implementan DAC tradicional; ACLs pueden ampliar ese modelo.",
      "Linux capabilities dividen muchos privilegios tradicionales de UID 0 en unidades más finas asociadas a threads/ejecutables.",
      "Effective, permitted, inheritable, bounding y ambient sets tienen papeles distintos."
    ],
    "concept": "Capabilities reducen la necesidad de otorgar todos los privilegios de root a un proceso, pero algunas capacidades son muy amplias y las reglas de exec/user namespaces importan. No son una lista simple de 'permisos extra'.",
    "diagram": [],
    "rules": [
      "Aplica least privilege y evita CAP_SYS_ADMIN salvo necesidad muy justificada.",
      "Distingue file capabilities de sets actuales del proceso/thread.",
      "Evalúa capabilities respecto al user namespace relevante."
    ],
    "deep": {
      "sections": [
        {
          "title": "DAC",
          "body": "UID/GID, mode bits y ACLs controlan accesos discrecionales a objetos como archivos."
        },
        {
          "title": "Capability sets",
          "body": "Permitted delimita qué puede hacerse efectivo; effective se consulta para operaciones privilegiadas; bounding limita ganancias; ambient facilita propagación controlada en ciertos exec."
        },
        {
          "title": "Namespaces",
          "body": "Las capabilities están contextualizadas por user namespace; tener una capability dentro de uno no equivale necesariamente a poseerla en el namespace inicial."
        }
      ],
      "commonErrors": [
        "Interpretar CAP_SYS_ADMIN como 'admin solo de una cosa'.",
        "Suponer que file capability ignora todas las reglas de exec/securebits/no_new_privs."
      ],
      "connections": [
        "Security",
        "execve",
        "User namespaces"
      ]
    },
    "example": {
      "problem": "Un servidor necesita bind a un puerto privilegiado sin root completo.",
      "steps": [
        [
          "Paso 1",
          "Se identifica la operación privilegiada concreta."
        ],
        [
          "Paso 2",
          "Se otorga únicamente la capability necesaria mediante mecanismo apropiado."
        ],
        [
          "Paso 3",
          "Se eliminan capacidades innecesarias y se combina con otras restricciones."
        ]
      ],
      "answer": "Least privilege busca reducir el conjunto efectivo de autoridad, no rebautizar root."
    },
    "check": {
      "question": "¿CAP_SYS_ADMIN es una capability estrecha y específica?",
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
          "Solo en containers",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Es históricamente muy amplia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Capabilities dividen parte del privilegio tradicional de root? sí/no",
        "answer": "si",
        "hint": "Ese es su diseño."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El effective set participa en checks de operaciones privilegiadas? sí/no",
        "answer": "si",
        "hint": "El kernel consulta capabilities efectivas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una capability en un user namespace implica automáticamente la misma autoridad sobre el host? sí/no",
        "answer": "no",
        "hint": "Está contextualizada."
      }
    ]
  },
  "linux-lsm-selinux-apparmor": {
    "id": "linux-lsm-selinux-apparmor",
    "courseId": 15,
    "title": "LSM, SELinux y AppArmor",
    "shortTitle": "DAC no es la última palabra",
    "duration": 115,
    "objective": "explicar el framework LSM y comparar conceptualmente SELinux/AppArmor como MAC sin reducirlos a 'firewalls de archivos'.",
    "summary": [
      "Linux Security Modules proporciona hooks para controles de acceso adicionales a la política base.",
      "SELinux y AppArmor son LSM con modelos/políticas diferentes; ambos pueden aplicar Mandatory Access Control.",
      "Una denegación LSM puede ocurrir aunque los mode bits DAC permitan la operación."
    ],
    "concept": "LSM inserta puntos de decisión de seguridad en operaciones del kernel. Las políticas se evalúan sobre sujetos/objetos/contexto según el módulo activo; la semántica concreta pertenece a SELinux, AppArmor u otro LSM, no al framework genérico.",
    "diagram": [],
    "rules": [
      "Distingue DAC de MAC/LSM.",
      "No extrapoles sintaxis o labels de SELinux a AppArmor.",
      "Usa logs/audit para diagnosticar denegaciones antes de desactivar enforcement."
    ],
    "deep": {
      "sections": [
        {
          "title": "LSM",
          "body": "Framework de hooks y blobs de seguridad usado por módulos para implementar políticas adicionales."
        },
        {
          "title": "SELinux",
          "body": "Modelo basado en security contexts/labels y policy rules, con type enforcement como pieza central."
        },
        {
          "title": "AppArmor",
          "body": "Política centrada en profiles asociados a tareas y reglas que incluyen paths/capabilities y otros recursos."
        }
      ],
      "commonErrors": [
        "Arreglar cualquier denegación con chmod 777.",
        "Desactivar SELinux/AppArmor para 'demostrar' que una app funciona y dejarlo así."
      ],
      "connections": [
        "Capabilities",
        "Filesystem permissions",
        "Containers"
      ]
    },
    "example": {
      "problem": "Un proceso tiene rw por DAC sobre un archivo pero recibe EACCES debido a policy.",
      "steps": [
        [
          "Paso 1",
          "Compruebas ownership/mode para confirmar DAC."
        ],
        [
          "Paso 2",
          "Inspeccionas audit/logs del LSM activo."
        ],
        [
          "Paso 3",
          "Ajustas policy/contexto si la operación es legítima, en vez de desactivar todo el mecanismo."
        ]
      ],
      "answer": "DAC permisivo no obliga a que una política MAC permita la operación."
    },
    "check": {
      "question": "¿chmod 777 garantiza que SELinux/AppArmor permitirán cualquier acceso?",
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
          "Solo root",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "LSM añade decisiones independientes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿LSM es un framework de hooks de seguridad del kernel? sí/no",
        "answer": "si",
        "hint": "Los módulos implementan política sobre esos hooks."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿SELinux y AppArmor tienen exactamente el mismo modelo de policy? sí/no",
        "answer": "no",
        "hint": "Son LSM distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una operación permitida por DAC puede ser denegada por un LSM? sí/no",
        "answer": "si",
        "hint": "Son capas acumulativas."
      }
    ]
  },
  "linux-kernel-modules": {
    "id": "linux-kernel-modules",
    "courseId": 15,
    "title": "Módulos del kernel y kbuild",
    "shortTitle": "Código que entra en ring 0",
    "duration": 105,
    "objective": "construir un modelo correcto de módulos loadable, símbolos, refcounts, taint, kbuild y compatibilidad sin tratarlos como plugins seguros de user space.",
    "summary": [
      "Un loadable kernel module añade código al kernel en ejecución cuando la configuración/política lo permite.",
      "Los módulos usan kbuild y dependen de APIs/símbolos del kernel; la compatibilidad no es una ABI interna estable universal.",
      "Un fallo del módulo puede comprometer estabilidad/seguridad del kernel."
    ],
    "concept": "Los módulos permiten extender drivers, filesystems y otras funciones sin recompilar el kernel completo, pero ejecutan con privilegios del kernel. modprobe además resuelve aliases/dependencias y policy de módulos, mientras insmod es más directo.",
    "diagram": [],
    "rules": [
      "Construye módulos externos contra headers/config del kernel objetivo.",
      "Gestiona ownership/refcount de recursos en init/exit y rutas de error.",
      "No asumas que compilar contra una versión implica compatibilidad binaria eterna."
    ],
    "deep": {
      "sections": [
        {
          "title": "kbuild",
          "body": "Es el sistema oficial de construcción del kernel y módulos; aplica flags/configuración necesarios."
        },
        {
          "title": "Símbolos",
          "body": "EXPORT_SYMBOL y mecanismos asociados permiten resolver referencias permitidas; module dependencies se derivan de esas relaciones y metadata."
        },
        {
          "title": "Lifecycle",
          "body": "Carga, init, uso, referencias, unload y cleanup requieren que no queden callbacks/objetos vivos apuntando a código retirado."
        }
      ],
      "commonErrors": [
        "Escribir cleanup solo para el camino feliz.",
        "Usar módulos como mecanismo de aislamiento frente a bugs."
      ],
      "connections": [
        "Drivers",
        "ELF/linking",
        "Kernel API"
      ]
    },
    "example": {
      "problem": "Un módulo registra un misc device y falla después al crear un segundo recurso.",
      "steps": [
        [
          "Paso 1",
          "La init debe detectar el fallo."
        ],
        [
          "Paso 2",
          "Libera en orden inverso los recursos ya registrados."
        ],
        [
          "Paso 3",
          "Devuelve error sin dejar callbacks, device nodes o referencias colgantes."
        ]
      ],
      "answer": "Las rutas de error son parte del lifecycle; en kernel, una fuga de ownership puede sobrevivir mucho más que tu paciencia."
    },
    "check": {
      "question": "¿Un módulo cargable ejecuta normalmente aislado como proceso de user space?",
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
          "Solo drivers",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Comparte contexto privilegiado del kernel."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿kbuild es el sistema de build del kernel Linux? sí/no",
        "answer": "si",
        "hint": "También soporta módulos externos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un bug de módulo puede causar kernel panic o corrupción? sí/no",
        "answer": "si",
        "hint": "Ejecuta privilegiado."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La API interna del kernel promete ABI binaria estable universal para módulos externos entre versiones? sí/no",
        "answer": "no",
        "hint": "Debe reconstruirse/adaptarse según kernel/config."
      }
    ]
  },
  "linux-ebpf": {
    "id": "linux-ebpf",
    "courseId": 15,
    "title": "eBPF: programas verificados en hooks del kernel",
    "shortTitle": "Kernel programable con cinturón de seguridad",
    "duration": 125,
    "objective": "explicar programas BPF, verifier, maps, helpers/kfuncs, JIT y attach points, y diseñar observabilidad/red/seguridad sin afirmar que eBPF es 'C dentro del kernel'.",
    "summary": [
      "eBPF ejecuta un ISA/VM definida por el kernel en hooks autorizados; programas se cargan mediante la syscall bpf y APIs asociadas.",
      "El verifier analiza propiedades de seguridad y validez antes de aceptar programas; aceptar no equivale a demostrar lógica correcta.",
      "Maps proporcionan almacenamiento/compartición; helpers/kfuncs exponen operaciones controladas; el JIT puede traducir BPF a código nativo."
    ],
    "concept": "eBPF es infraestructura de ejecución segura y extensible dentro del kernel con múltiples program types y attach points. El fuente puede escribirse en C restringido y compilarse a BPF, pero el contrato real es bytecode + verifier + APIs del kernel.",
    "diagram": [],
    "rules": [
      "Distingue verifier safety de correctness funcional.",
      "No asumas que cualquier función C o kernel es invocable desde BPF.",
      "Considera concurrency, map lifetime, per-CPU data y límites del program type."
    ],
    "deep": {
      "sections": [
        {
          "title": "Carga y verificación",
          "body": "BPF_PROG_LOAD entrega instrucciones/metadata; verifier explora estados y rechaza accesos/flows no permitidos según reglas del kernel."
        },
        {
          "title": "Maps",
          "body": "Hash, array, ring buffer y otras clases permiten compartir estado entre BPF/user space o entre ejecuciones, cada una con semántica específica."
        },
        {
          "title": "Attach points",
          "body": "Tracing, networking (XDP/tc), cgroup hooks y seguridad son familias distintas; program type determina contexto y helpers disponibles."
        },
        {
          "title": "CO-RE/BTF",
          "body": "BTF describe tipos y CO-RE ayuda a adaptar accesos a layouts de kernels compatibles sin convertir toda API interna en estable."
        }
      ],
      "commonErrors": [
        "Pensar que el verifier elimina bugs lógicos.",
        "Llamar eBPF 'sandbox de user space' y olvidar que ejecuta en hooks del kernel con reglas específicas."
      ],
      "connections": [
        "Tracing",
        "Networking",
        "Security"
      ]
    },
    "example": {
      "problem": "Quieres contar syscalls por PID con eBPF.",
      "steps": [
        [
          "Paso 1",
          "Eliges un attach point de tracing apropiado."
        ],
        [
          "Paso 2",
          "El programa obtiene identificador y actualiza un map con concurrencia adecuada."
        ],
        [
          "Paso 3",
          "User space lee/agrega el map; el verifier garantiza restricciones estructurales, no que tu estadística sea conceptualmente correcta."
        ]
      ],
      "answer": "eBPF separa fast path en kernel y control/visualización en user space mediante programas y maps."
    },
    "check": {
      "question": "¿Que el verifier acepte un programa demuestra que su resultado lógico es correcto?",
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
          "Solo con JIT",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Safety verificable no es especificación funcional completa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿eBPF puede adjuntarse a distintos hooks de networking/tracing/security? sí/no",
        "answer": "si",
        "hint": "Program types/attach points difieren."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿BPF maps pueden compartir estado entre programa BPF y user space? sí/no",
        "answer": "si",
        "hint": "Son una pieza central de la API."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un programa BPF puede llamar cualquier función arbitraria de libc? sí/no",
        "answer": "no",
        "hint": "Ejecuta bajo helpers/kfuncs/reglas específicas."
      }
    ]
  },
  "linux-integration-projects": {
    "id": "linux-integration-projects",
    "courseId": 15,
    "title": "Proyectos Linux: shell, herramientas Unix y kernel educativo",
    "shortTitle": "Aprender desmontando el sistema",
    "duration": 130,
    "objective": "integrar procesos, fd, pipes, signals, procfs, sysfs, namespaces y kernel interfaces en tres proyectos progresivos con pruebas e invariantes.",
    "summary": [
      "Una shell ejercita fork/exec, pipes, redirections, process groups, terminal control y signals.",
      "Herramientas tipo Unix obligan a respetar streams, errores, exit status, filesystem y composición.",
      "Un kernel educativo debe reducir alcance: boot, consola, memoria, traps y scheduler simple antes de competir con Linux, porque Linux lleva ventaja de varias décadas."
    ],
    "concept": "Los proyectos integradores convierten interfaces observadas en mecanismos construidos. La meta no es replicar GNU/Linux, sino ser capaz de explicar y verificar cada frontera que implementas.",
    "diagram": [],
    "rules": [
      "Define invariantes y tests antes de ampliar features.",
      "Separa compatibilidad POSIX/Linux de decisiones de tu diseño educativo.",
      "Añade observabilidad propia: logs estructurados, counters y dumps de estado."
    ],
    "deep": {
      "sections": [
        {
          "title": "Shell",
          "body": "Parser mínimo, fork/exec, redirections, pipelines, foreground/background, process groups y manejo correcto de SIGCHLD/terminal."
        },
        {
          "title": "Unix tools",
          "body": "Implementa cat/head/wc/find simplificados con I/O robusto, short reads/writes, exit codes y composición por pipes."
        },
        {
          "title": "Kernel educativo",
          "body": "En QEMU: arranque, serial console, allocator, traps, timer, scheduler cooperativo/preemptivo simple y syscalls mínimas; cada etapa con tests reproducibles."
        },
        {
          "title": "Laboratorio de namespaces",
          "body": "Construye una mini herramienta container-like con clone/unshare, mount namespace, rootfs y cgroup controlado para comprender composición."
        }
      ],
      "commonErrors": [
        "Escribir la shell con system() y declarar terminado el aprendizaje.",
        "Empezar el kernel educativo por USB, Wi-Fi y compositor gráfico simultáneamente."
      ],
      "connections": [
        "Assembly",
        "OS",
        "Containers"
      ]
    },
    "example": {
      "problem": "Diseñas una pipeline `producer | consumer` en tu shell.",
      "steps": [
        [
          "Paso 1",
          "Creas pipe y preservas ambos fd antes de fork/clone equivalente."
        ],
        [
          "Paso 2",
          "En cada hijo duplicas el extremo correcto sobre stdin/stdout y cierras todos los fd no usados."
        ],
        [
          "Paso 3",
          "El padre cierra sus copias y espera/gestiona process group según foreground/background."
        ]
      ],
      "answer": "Cerrar descriptores no usados es parte de la semántica: si alguien conserva el write end, consumer puede no observar EOF."
    },
    "check": {
      "question": "¿Una shell educativa que implementa pipelines debe cerrar copias de pipe que no usa cada proceso?",
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
          "Solo si hay más de 2 comandos",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El lifetime de fd afecta EOF y recursos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una shell real necesita comprender exit status de hijos? sí/no",
        "answer": "si",
        "hint": "Forma parte del contrato de comandos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una herramienta Unix robusta debe asumir que write siempre consume todos los bytes pedidos? sí/no",
        "answer": "no",
        "hint": "Short writes existen."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Es razonable probar un kernel educativo en QEMU antes de hardware real? sí/no",
        "answer": "si",
        "hint": "Reduce variables y mejora reproducibilidad."
      }
    ]
  }
});
