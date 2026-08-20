/**
 * BLOQUE 072 — VIRTUALIZACIÓN Y CONTENEDORES
 *
 * Regla editorial: una VM, un contenedor, un namespace y un cgroup no son sinónimos.
 * Toda garantía se vincula a la frontera y mecanismo que realmente la implementa.
 */
window.LEARNING_PATHS[72] = {
  "level": "Virtualización y Contenedores",
  "estimatedHours": 205,
  "description": "Máquinas dentro de máquinas y procesos aislados: VMs, hypervisors, virtualización de hardware, namespaces, cgroups, Docker, imágenes, capas y filesystems superpuestos.",
  "outcomes": [
    "Distinguir con precisión una VM de un contenedor y localizar dónde existe cada frontera de aislamiento.",
    "Explicar el papel de hypervisors y asistencia de hardware en CPU, memoria y E/S virtuales.",
    "Relacionar namespaces y cgroups con aislamiento, límites y seguridad de contenedores Linux.",
    "Descomponer imágenes, capas, writable layers y OverlayFS y diseñar persistencia explícita."
  ],
  "modules": [
    {
      "id": "m1-vm",
      "title": "Virtualización de máquinas",
      "description": "VMs, hypervisors y hardware",
      "lessons": [
        "virtual-machines",
        "hypervisors",
        "hardware-virtualization",
        "vm-memory-io"
      ]
    },
    {
      "id": "m2-container-kernel",
      "title": "Aislamiento de procesos",
      "description": "Contenedores, namespaces y cgroups",
      "lessons": [
        "containers",
        "namespaces",
        "cgroups"
      ]
    },
    {
      "id": "m3-docker-images",
      "title": "Docker e imágenes",
      "description": "Engine, imágenes y capas",
      "lessons": [
        "docker-internals",
        "container-images",
        "image-layers"
      ]
    },
    {
      "id": "m4-storage",
      "title": "Filesystem y persistencia",
      "description": "OverlayFS y datos",
      "lessons": [
        "overlay-filesystems",
        "container-storage-persistence"
      ]
    },
    {
      "id": "m5-boundaries",
      "title": "Seguridad y elección",
      "description": "Fronteras y diagnóstico",
      "lessons": [
        "container-security",
        "vm-vs-container",
        "container-observability-debugging"
      ]
    },
    {
      "id": "m6-project",
      "title": "Integración",
      "description": "Laboratorio final",
      "lessons": [
        "virtualization-containers-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "virtual-machines": {
    "id": "virtual-machines",
    "courseId": 72,
    "title": "Máquinas virtuales: aislamiento de una máquina completa",
    "shortTitle": "VMs",
    "duration": 120,
    "objective": "Explicar una VM como una abstracción de hardware capaz de ejecutar un sistema operativo invitado con CPU, memoria y dispositivos virtualizados.",
    "summary": [
      "Una máquina virtual presenta recursos de máquina al guest y mantiene un límite más fuerte que un simple proceso, pero ese límite depende del hypervisor, hardware y configuración.",
      "El guest ejecuta su propio kernel y ve vCPU, memoria y dispositivos virtuales; el host/hypervisor multiplexa recursos físicos y controla transiciones privilegiadas.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "Una máquina virtual presenta recursos de máquina al guest y mantiene un límite más fuerte que un simple proceso, pero ese límite depende del hypervisor, hardware y configuración.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Explicar una VM como una abstracción de hardware capaz de ejecutar un sistema operativo invitado con CPU, memoria y dispositivos virtualizados.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una máquina virtual presenta recursos de máquina al guest y mantiene un límite más fuerte que un simple proceso, pero ese límite depende del hypervisor, hardware y configuración."
        },
        {
          "title": "Mecánica",
          "body": "El guest ejecuta su propio kernel y ve vCPU, memoria y dispositivos virtuales; el host/hypervisor multiplexa recursos físicos y controla transiciones privilegiadas."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Un contenedor Linux normal necesita arrancar un kernel invitado propio?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un contenedor Linux normal necesita arrancar un kernel invitado propio?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Una máquina virtual presenta recursos de máquina al guest y mantiene un límite más fuerte que un simple proceso, pero ese límite depende del hypervisor, hardware y configuración."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un contenedor Linux normal necesita arrancar un kernel invitado propio?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de VMs.",
        "answer": "vms",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para VMs: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "hypervisors": {
    "id": "hypervisors",
    "courseId": 72,
    "title": "Hypervisors: quién controla los guests",
    "shortTitle": "Hypervisors",
    "duration": 120,
    "objective": "Distinguir hypervisors tipo 1/tipo 2 como modelos arquitectónicos y razonar sobre las funciones reales de scheduling, memoria, interrupciones y dispositivos.",
    "summary": [
      "El hypervisor arbitra CPU, memoria y E/S entre guests y establece la frontera de virtualización; “tipo 1 vs tipo 2” es una clasificación útil, no una garantía de rendimiento o seguridad.",
      "Un VMM crea vCPUs, mapea memoria del guest, maneja exits y expone dispositivos emulados o paravirtualizados. En KVM, Linux aporta infraestructura de kernel y userspace suele completar el modelo de máquina.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "El hypervisor arbitra CPU, memoria y E/S entre guests y establece la frontera de virtualización; “tipo 1 vs tipo 2” es una clasificación útil, no una garantía de rendimiento o seguridad.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Distinguir hypervisors tipo 1/tipo 2 como modelos arquitectónicos y razonar sobre las funciones reales de scheduling, memoria, interrupciones y dispositivos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El hypervisor arbitra CPU, memoria y E/S entre guests y establece la frontera de virtualización; “tipo 1 vs tipo 2” es una clasificación útil, no una garantía de rendimiento o seguridad."
        },
        {
          "title": "Mecánica",
          "body": "Un VMM crea vCPUs, mapea memoria del guest, maneja exits y expone dispositivos emulados o paravirtualizados. En KVM, Linux aporta infraestructura de kernel y userspace suele completar el modelo de máquina."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Ser “tipo 1” garantiza por sí solo que un hypervisor sea siempre más rápido y seguro?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Ser “tipo 1” garantiza por sí solo que un hypervisor sea siempre más rápido y seguro?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "El hypervisor arbitra CPU, memoria y E/S entre guests y establece la frontera de virtualización; “tipo 1 vs tipo 2” es una clasificación útil, no una garantía de rendimiento o seguridad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Ser “tipo 1” garantiza por sí solo que un hypervisor sea siempre más rápido y seguro?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Hypervisors.",
        "answer": "hypervisors",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Hypervisors: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "hardware-virtualization": {
    "id": "hardware-virtualization",
    "courseId": 72,
    "title": "Virtualización asistida por hardware: VMX/SVM y traps",
    "shortTitle": "Hardware virtualization",
    "duration": 120,
    "objective": "Entender por qué extensiones de CPU y MMU reducen el coste de ejecutar código guest privilegiado y permiten controlar transiciones guest↔host.",
    "summary": [
      "La virtualización asistida por hardware añade modos/estructuras para ejecutar guests y transferir control al VMM ante eventos definidos; no elimina todos los costes ni reproduce siempre bare metal perfectamente.",
      "Extensiones como Intel VMX o AMD SVM permiten guest execution y exits; EPT/NPT aceleran traducción de memoria anidada. La virtualización de interrupciones, tiempo y dispositivos añade otras capas.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "La virtualización asistida por hardware añade modos/estructuras para ejecutar guests y transferir control al VMM ante eventos definidos; no elimina todos los costes ni reproduce siempre bare metal perfectamente.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Entender por qué extensiones de CPU y MMU reducen el coste de ejecutar código guest privilegiado y permiten controlar transiciones guest↔host.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La virtualización asistida por hardware añade modos/estructuras para ejecutar guests y transferir control al VMM ante eventos definidos; no elimina todos los costes ni reproduce siempre bare metal perfectamente."
        },
        {
          "title": "Mecánica",
          "body": "Extensiones como Intel VMX o AMD SVM permiten guest execution y exits; EPT/NPT aceleran traducción de memoria anidada. La virtualización de interrupciones, tiempo y dispositivos añade otras capas."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿La asistencia de hardware elimina todos los VM exits y hace idéntico el comportamiento a bare metal?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿La asistencia de hardware elimina todos los VM exits y hace idéntico el comportamiento a bare metal?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "La virtualización asistida por hardware añade modos/estructuras para ejecutar guests y transferir control al VMM ante eventos definidos; no elimina todos los costes ni reproduce siempre bare metal perfectamente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La asistencia de hardware elimina todos los VM exits y hace idéntico el comportamiento a bare metal?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Hardware virtualization.",
        "answer": "hardware",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Hardware virtualization: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "vm-memory-io": {
    "id": "vm-memory-io",
    "courseId": 72,
    "title": "Memoria y E/S virtuales: páginas, MMU y virtio",
    "shortTitle": "Memoria/E/S VM",
    "duration": 120,
    "objective": "Relacionar memoria guest, traducción de direcciones, dispositivos emulados y paravirtualización con sus costes y trade-offs.",
    "summary": [
      "Virtualizar una CPU no basta: el VMM debe virtualizar memoria e I/O, donde emulación completa y paravirtualización intercambian compatibilidad por eficiencia.",
      "La dirección virtual guest se traduce a física guest y luego a física host; dispositivos emulados maximizan compatibilidad, mientras interfaces como virtio cooperan con el guest para reducir emulación costosa.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "Virtualizar una CPU no basta: el VMM debe virtualizar memoria e I/O, donde emulación completa y paravirtualización intercambian compatibilidad por eficiencia.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Relacionar memoria guest, traducción de direcciones, dispositivos emulados y paravirtualización con sus costes y trade-offs.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Virtualizar una CPU no basta: el VMM debe virtualizar memoria e I/O, donde emulación completa y paravirtualización intercambian compatibilidad por eficiencia."
        },
        {
          "title": "Mecánica",
          "body": "La dirección virtual guest se traduce a física guest y luego a física host; dispositivos emulados maximizan compatibilidad, mientras interfaces como virtio cooperan con el guest para reducir emulación costosa."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Un dispositivo paravirtualizado como virtio intenta imitar bit a bit un dispositivo físico legado?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un dispositivo paravirtualizado como virtio intenta imitar bit a bit un dispositivo físico legado?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Virtualizar una CPU no basta: el VMM debe virtualizar memoria e I/O, donde emulación completa y paravirtualización intercambian compatibilidad por eficiencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un dispositivo paravirtualizado como virtio intenta imitar bit a bit un dispositivo físico legado?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Memoria/E/S VM.",
        "answer": "memoria/e/s",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Memoria/E/S VM: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "containers": {
    "id": "containers",
    "courseId": 72,
    "title": "Contenedores: procesos aislados que comparten kernel",
    "shortTitle": "Containers",
    "duration": 120,
    "objective": "Diferenciar contenedores de VMs y explicar qué se aísla realmente en un sistema Linux.",
    "summary": [
      "Un contenedor es un conjunto de procesos con vistas y límites controlados del sistema; normalmente comparte el kernel del host, por lo que no equivale a una VM con kernel independiente.",
      "El runtime prepara namespaces, cgroups, filesystem raíz, credenciales y otras políticas antes de ejecutar el proceso. El aislamiento se compone de varios mecanismos, no de una única “caja”.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "Un contenedor es un conjunto de procesos con vistas y límites controlados del sistema; normalmente comparte el kernel del host, por lo que no equivale a una VM con kernel independiente.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Diferenciar contenedores de VMs y explicar qué se aísla realmente en un sistema Linux.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un contenedor es un conjunto de procesos con vistas y límites controlados del sistema; normalmente comparte el kernel del host, por lo que no equivale a una VM con kernel independiente."
        },
        {
          "title": "Mecánica",
          "body": "El runtime prepara namespaces, cgroups, filesystem raíz, credenciales y otras políticas antes de ejecutar el proceso. El aislamiento se compone de varios mecanismos, no de una única “caja”."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Dos contenedores Linux comunes en el mismo host ejecutan necesariamente dos kernels Linux independientes?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Dos contenedores Linux comunes en el mismo host ejecutan necesariamente dos kernels Linux independientes?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Un contenedor es un conjunto de procesos con vistas y límites controlados del sistema; normalmente comparte el kernel del host, por lo que no equivale a una VM con kernel independiente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Dos contenedores Linux comunes en el mismo host ejecutan necesariamente dos kernels Linux independientes?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Containers.",
        "answer": "containers",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Containers: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "namespaces": {
    "id": "namespaces",
    "courseId": 72,
    "title": "Namespaces: distintas vistas del mismo kernel",
    "shortTitle": "Namespaces",
    "duration": 120,
    "objective": "Explicar cómo namespaces aíslan identificadores y vistas de recursos sin confundir aislamiento de nombres con control de consumo.",
    "summary": [
      "Namespaces crean vistas separadas de recursos como procesos, mounts, red, hostname o usuarios; aíslan visibilidad/identidad, no asignan por sí solos cuotas de CPU o memoria.",
      "PID, mount, network, IPC, UTS, user, cgroup y time namespaces cubren dimensiones distintas. Un proceso puede pertenecer a combinaciones diferentes y las fronteras no son equivalentes.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "Namespaces crean vistas separadas de recursos como procesos, mounts, red, hostname o usuarios; aíslan visibilidad/identidad, no asignan por sí solos cuotas de CPU o memoria.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Explicar cómo namespaces aíslan identificadores y vistas de recursos sin confundir aislamiento de nombres con control de consumo.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Namespaces crean vistas separadas de recursos como procesos, mounts, red, hostname o usuarios; aíslan visibilidad/identidad, no asignan por sí solos cuotas de CPU o memoria."
        },
        {
          "title": "Mecánica",
          "body": "PID, mount, network, IPC, UTS, user, cgroup y time namespaces cubren dimensiones distintas. Un proceso puede pertenecer a combinaciones diferentes y las fronteras no son equivalentes."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Un PID namespace limita por sí mismo cuánta memoria puede consumir un proceso?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un PID namespace limita por sí mismo cuánta memoria puede consumir un proceso?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Namespaces crean vistas separadas de recursos como procesos, mounts, red, hostname o usuarios; aíslan visibilidad/identidad, no asignan por sí solos cuotas de CPU o memoria."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un PID namespace limita por sí mismo cuánta memoria puede consumir un proceso?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Namespaces.",
        "answer": "namespaces",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Namespaces: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "cgroups": {
    "id": "cgroups",
    "courseId": 72,
    "title": "cgroups v2: contabilidad y control de recursos",
    "shortTitle": "cgroups",
    "duration": 120,
    "objective": "Entender cgroups como jerarquía de grupos con controladores para distribuir, contabilizar o limitar recursos.",
    "summary": [
      "cgroups agrupan tareas y aplican políticas de recursos; complementan namespaces porque controlar consumo y controlar visibilidad son problemas distintos.",
      "En cgroup v2 una jerarquía unificada coordina controladores como cpu, memory, io y pids. Límites, pesos y presión deben interpretarse según el controlador, no como una cuota universal.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "cgroups agrupan tareas y aplican políticas de recursos; complementan namespaces porque controlar consumo y controlar visibilidad son problemas distintos.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Entender cgroups como jerarquía de grupos con controladores para distribuir, contabilizar o limitar recursos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "cgroups agrupan tareas y aplican políticas de recursos; complementan namespaces porque controlar consumo y controlar visibilidad son problemas distintos."
        },
        {
          "title": "Mecánica",
          "body": "En cgroup v2 una jerarquía unificada coordina controladores como cpu, memory, io y pids. Límites, pesos y presión deben interpretarse según el controlador, no como una cuota universal."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Namespaces y cgroups resuelven exactamente el mismo problema?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Namespaces y cgroups resuelven exactamente el mismo problema?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "cgroups agrupan tareas y aplican políticas de recursos; complementan namespaces porque controlar consumo y controlar visibilidad son problemas distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Namespaces y cgroups resuelven exactamente el mismo problema?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de cgroups.",
        "answer": "cgroups",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para cgroups: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "docker-internals": {
    "id": "docker-internals",
    "courseId": 72,
    "title": "Docker internals: cliente, daemon, containerd y runtime",
    "shortTitle": "Docker internals",
    "duration": 120,
    "objective": "Descomponer Docker en API/daemon, gestión de imágenes y runtime de contenedores, evitando tratar `docker run` como una operación monolítica.",
    "summary": [
      "Docker coordina varias capas: API/daemon, almacenamiento de imágenes, networking y runtimes; el CLI es un cliente, no el mecanismo de aislamiento del kernel.",
      "Una ejecución típica resuelve/pulla una imagen, crea configuración y root filesystem, prepara namespaces/cgroups/red y delega la ejecución al runtime. Los detalles exactos evolucionan entre versiones.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "Docker coordina varias capas: API/daemon, almacenamiento de imágenes, networking y runtimes; el CLI es un cliente, no el mecanismo de aislamiento del kernel.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Descomponer Docker en API/daemon, gestión de imágenes y runtime de contenedores, evitando tratar `docker run` como una operación monolítica.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Docker coordina varias capas: API/daemon, almacenamiento de imágenes, networking y runtimes; el CLI es un cliente, no el mecanismo de aislamiento del kernel."
        },
        {
          "title": "Mecánica",
          "body": "Una ejecución típica resuelve/pulla una imagen, crea configuración y root filesystem, prepara namespaces/cgroups/red y delega la ejecución al runtime. Los detalles exactos evolucionan entre versiones."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿El comando `docker` del CLI implementa directamente en userspace los namespaces del kernel?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿El comando `docker` del CLI implementa directamente en userspace los namespaces del kernel?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Docker coordina varias capas: API/daemon, almacenamiento de imágenes, networking y runtimes; el CLI es un cliente, no el mecanismo de aislamiento del kernel."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El comando `docker` del CLI implementa directamente en userspace los namespaces del kernel?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Docker internals.",
        "answer": "docker",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Docker internals: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "container-images": {
    "id": "container-images",
    "courseId": 72,
    "title": "Imágenes: contenido inmutable y configuración reproducible",
    "shortTitle": "Images",
    "duration": 120,
    "objective": "Explicar una imagen de contenedor como artefacto direccionable compuesto por configuración y capas, distinto de una instancia en ejecución.",
    "summary": [
      "Una imagen describe un filesystem y metadatos/configuración reutilizables; un contenedor es una instancia creada a partir de esa imagen con estado de ejecución propio.",
      "Los manifests/configs referencian contenido por digest y permiten compartir blobs entre imágenes. Tags son nombres mutables; digest y tag no deben confundirse.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "Una imagen describe un filesystem y metadatos/configuración reutilizables; un contenedor es una instancia creada a partir de esa imagen con estado de ejecución propio.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Explicar una imagen de contenedor como artefacto direccionable compuesto por configuración y capas, distinto de una instancia en ejecución.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una imagen describe un filesystem y metadatos/configuración reutilizables; un contenedor es una instancia creada a partir de esa imagen con estado de ejecución propio."
        },
        {
          "title": "Mecánica",
          "body": "Los manifests/configs referencian contenido por digest y permiten compartir blobs entre imágenes. Tags son nombres mutables; digest y tag no deben confundirse."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Un tag como `latest` identifica de forma inmutable el mismo contenido para siempre?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un tag como `latest` identifica de forma inmutable el mismo contenido para siempre?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Una imagen describe un filesystem y metadatos/configuración reutilizables; un contenedor es una instancia creada a partir de esa imagen con estado de ejecución propio."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un tag como `latest` identifica de forma inmutable el mismo contenido para siempre?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Images.",
        "answer": "images",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Images: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "image-layers": {
    "id": "image-layers",
    "courseId": 72,
    "title": "Capas de imagen: diffs, sharing y cache",
    "shortTitle": "Layers",
    "duration": 120,
    "objective": "Razonar sobre capas como cambios de filesystem reutilizables y sobre cómo afectan tamaño, distribución y build cache.",
    "summary": [
      "Las capas de imagen son contenido inmutable compartible; el orden importa porque cada capa se interpreta sobre las inferiores. Un contenedor agrega estado escribible separado.",
      "Una instrucción de build puede producir una nueva capa o metadatos; borrar un archivo en una capa superior no borra mágicamente sus bytes de capas inferiores ya distribuidas.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "Las capas de imagen son contenido inmutable compartible; el orden importa porque cada capa se interpreta sobre las inferiores. Un contenedor agrega estado escribible separado.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Razonar sobre capas como cambios de filesystem reutilizables y sobre cómo afectan tamaño, distribución y build cache.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Las capas de imagen son contenido inmutable compartible; el orden importa porque cada capa se interpreta sobre las inferiores. Un contenedor agrega estado escribible separado."
        },
        {
          "title": "Mecánica",
          "body": "Una instrucción de build puede producir una nueva capa o metadatos; borrar un archivo en una capa superior no borra mágicamente sus bytes de capas inferiores ya distribuidas."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Borrar en una capa posterior un archivo grande añadido antes garantiza que la imagen final deje de contener esos bytes en capas anteriores?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Borrar en una capa posterior un archivo grande añadido antes garantiza que la imagen final deje de contener esos bytes en capas anteriores?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Las capas de imagen son contenido inmutable compartible; el orden importa porque cada capa se interpreta sobre las inferiores. Un contenedor agrega estado escribible separado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Borrar en una capa posterior un archivo grande añadido antes garantiza que la imagen final deje de contener esos bytes en capas anteriores?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Layers.",
        "answer": "layers",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Layers: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "overlay-filesystems": {
    "id": "overlay-filesystems",
    "courseId": 72,
    "title": "Overlay/union filesystems y copy-on-write",
    "shortTitle": "Overlay filesystems",
    "duration": 120,
    "objective": "Entender cómo un filesystem superpuesto presenta una vista combinada de capas inferiores y una capa superior escribible.",
    "summary": [
      "OverlayFS combina lower layers con una upper layer; copy-up permite modificar una vista sin reescribir todas las capas inferiores. No todo backend de imágenes usa exactamente el mismo driver.",
      "Una lectura puede resolverse desde lowerdir; al modificar un archivo de una capa inferior se copia a upperdir. Whiteouts representan eliminaciones en la vista combinada.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "OverlayFS combina lower layers con una upper layer; copy-up permite modificar una vista sin reescribir todas las capas inferiores. No todo backend de imágenes usa exactamente el mismo driver.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Entender cómo un filesystem superpuesto presenta una vista combinada de capas inferiores y una capa superior escribible.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "OverlayFS combina lower layers con una upper layer; copy-up permite modificar una vista sin reescribir todas las capas inferiores. No todo backend de imágenes usa exactamente el mismo driver."
        },
        {
          "title": "Mecánica",
          "body": "Una lectura puede resolverse desde lowerdir; al modificar un archivo de una capa inferior se copia a upperdir. Whiteouts representan eliminaciones en la vista combinada."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Modificar un archivo procedente de una lower layer suele reescribir directamente esa lower layer inmutable?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Modificar un archivo procedente de una lower layer suele reescribir directamente esa lower layer inmutable?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "OverlayFS combina lower layers con una upper layer; copy-up permite modificar una vista sin reescribir todas las capas inferiores. No todo backend de imágenes usa exactamente el mismo driver."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Modificar un archivo procedente de una lower layer suele reescribir directamente esa lower layer inmutable?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Overlay filesystems.",
        "answer": "overlay",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Overlay filesystems: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "container-storage-persistence": {
    "id": "container-storage-persistence",
    "courseId": 72,
    "title": "Persistencia: writable layer, bind mounts y volumes",
    "shortTitle": "Persistencia",
    "duration": 120,
    "objective": "Separar filesystem efímero del contenedor de almacenamiento que debe sobrevivir a su eliminación.",
    "summary": [
      "La writable layer pertenece a una instancia de contenedor y no es un buen contrato de persistencia duradera. Volumes/bind mounts desacoplan datos del ciclo de vida de esa instancia.",
      "Bind mounts exponen rutas del host; volumes son administrados por la plataforma/runtime. Ambos cambian la frontera de backup, permisos, portabilidad y seguridad.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "La writable layer pertenece a una instancia de contenedor y no es un buen contrato de persistencia duradera. Volumes/bind mounts desacoplan datos del ciclo de vida de esa instancia.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Separar filesystem efímero del contenedor de almacenamiento que debe sobrevivir a su eliminación.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La writable layer pertenece a una instancia de contenedor y no es un buen contrato de persistencia duradera. Volumes/bind mounts desacoplan datos del ciclo de vida de esa instancia."
        },
        {
          "title": "Mecánica",
          "body": "Bind mounts exponen rutas del host; volumes son administrados por la plataforma/runtime. Ambos cambian la frontera de backup, permisos, portabilidad y seguridad."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Guardar datos críticos solo en la writable layer es una estrategia robusta si el contenedor puede destruirse y recrearse?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Guardar datos críticos solo en la writable layer es una estrategia robusta si el contenedor puede destruirse y recrearse?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "La writable layer pertenece a una instancia de contenedor y no es un buen contrato de persistencia duradera. Volumes/bind mounts desacoplan datos del ciclo de vida de esa instancia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Guardar datos críticos solo en la writable layer es una estrategia robusta si el contenedor puede destruirse y recrearse?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Persistencia.",
        "answer": "persistencia",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Persistencia: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "container-security": {
    "id": "container-security",
    "courseId": 72,
    "title": "Seguridad de contenedores: aislamiento no es una frontera absoluta",
    "shortTitle": "Seguridad",
    "duration": 120,
    "objective": "Evaluar la seguridad de contenedores como composición de kernel, namespaces, credenciales, capabilities, seccomp, LSM y configuración.",
    "summary": [
      "Compartir kernel reduce ciertas fronteras respecto a una VM; un contenedor privilegiado o con mounts/capabilities amplios puede erosionar fuertemente el aislamiento.",
      "User namespaces pueden remapear identidades; capabilities dividen privilegios; seccomp filtra syscalls; SELinux/AppArmor añaden políticas MAC. La superficie del daemon/runtime también importa.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "Compartir kernel reduce ciertas fronteras respecto a una VM; un contenedor privilegiado o con mounts/capabilities amplios puede erosionar fuertemente el aislamiento.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Evaluar la seguridad de contenedores como composición de kernel, namespaces, credenciales, capabilities, seccomp, LSM y configuración.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Compartir kernel reduce ciertas fronteras respecto a una VM; un contenedor privilegiado o con mounts/capabilities amplios puede erosionar fuertemente el aislamiento."
        },
        {
          "title": "Mecánica",
          "body": "User namespaces pueden remapear identidades; capabilities dividen privilegios; seccomp filtra syscalls; SELinux/AppArmor añaden políticas MAC. La superficie del daemon/runtime también importa."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Ejecutar un proceso “dentro de Docker” lo vuelve automáticamente seguro frente al host?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Ejecutar un proceso “dentro de Docker” lo vuelve automáticamente seguro frente al host?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Compartir kernel reduce ciertas fronteras respecto a una VM; un contenedor privilegiado o con mounts/capabilities amplios puede erosionar fuertemente el aislamiento."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Ejecutar un proceso “dentro de Docker” lo vuelve automáticamente seguro frente al host?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Seguridad.",
        "answer": "seguridad",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Seguridad: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "vm-vs-container": {
    "id": "vm-vs-container",
    "courseId": 72,
    "title": "VM vs contenedor: elegir la frontera adecuada",
    "shortTitle": "VM vs contenedor",
    "duration": 120,
    "objective": "Comparar VMs y contenedores según kernel, aislamiento, densidad, compatibilidad y operación, no mediante slogans.",
    "summary": [
      "VMs y contenedores virtualizan fronteras distintas y se combinan con frecuencia: una VM puede alojar muchos contenedores. La elección depende del threat model y de compatibilidad/operación.",
      "VMs permiten kernels guests distintos y una frontera de máquina; contenedores suelen arrancar más rápido y compartir kernel. MicroVMs y sandboxed containers ocupan puntos intermedios.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "VMs y contenedores virtualizan fronteras distintas y se combinan con frecuencia: una VM puede alojar muchos contenedores. La elección depende del threat model y de compatibilidad/operación.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Comparar VMs y contenedores según kernel, aislamiento, densidad, compatibilidad y operación, no mediante slogans.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "VMs y contenedores virtualizan fronteras distintas y se combinan con frecuencia: una VM puede alojar muchos contenedores. La elección depende del threat model y de compatibilidad/operación."
        },
        {
          "title": "Mecánica",
          "body": "VMs permiten kernels guests distintos y una frontera de máquina; contenedores suelen arrancar más rápido y compartir kernel. MicroVMs y sandboxed containers ocupan puntos intermedios."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Usar contenedores impide que la infraestructura subyacente esté compuesta por VMs?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Usar contenedores impide que la infraestructura subyacente esté compuesta por VMs?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "VMs y contenedores virtualizan fronteras distintas y se combinan con frecuencia: una VM puede alojar muchos contenedores. La elección depende del threat model y de compatibilidad/operación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Usar contenedores impide que la infraestructura subyacente esté compuesta por VMs?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de VM vs contenedor.",
        "answer": "vm",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para VM vs contenedor: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "container-observability-debugging": {
    "id": "container-observability-debugging",
    "courseId": 72,
    "title": "Observabilidad y debugging: atravesar las capas",
    "shortTitle": "Observabilidad",
    "duration": 120,
    "objective": "Diagnosticar fallos distinguiendo proceso, namespace, cgroup, red, mount, imagen y host.",
    "summary": [
      "Un “contenedor lento” puede estar limitado por CPU, memory pressure, I/O, page cache, red o el host; el nombre del contenedor no identifica la capa causal.",
      "Inspección de procesos, cgroups, mounts, namespaces, métricas y eventos permite correlacionar la vista del runtime con la del kernel. Deben conservarse límites y contexto del host.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "Un “contenedor lento” puede estar limitado por CPU, memory pressure, I/O, page cache, red o el host; el nombre del contenedor no identifica la capa causal.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Diagnosticar fallos distinguiendo proceso, namespace, cgroup, red, mount, imagen y host.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un “contenedor lento” puede estar limitado por CPU, memory pressure, I/O, page cache, red o el host; el nombre del contenedor no identifica la capa causal."
        },
        {
          "title": "Mecánica",
          "body": "Inspección de procesos, cgroups, mounts, namespaces, métricas y eventos permite correlacionar la vista del runtime con la del kernel. Deben conservarse límites y contexto del host."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Una alta latencia dentro de un contenedor demuestra por sí sola que Docker sea la causa?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una alta latencia dentro de un contenedor demuestra por sí sola que Docker sea la causa?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "Un “contenedor lento” puede estar limitado por CPU, memory pressure, I/O, page cache, red o el host; el nombre del contenedor no identifica la capa causal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una alta latencia dentro de un contenedor demuestra por sí sola que Docker sea la causa?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Observabilidad.",
        "answer": "observabilidad",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Observabilidad: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  },
  "virtualization-containers-project": {
    "id": "virtualization-containers-project",
    "courseId": 72,
    "title": "Proyecto: laboratorio VM + contenedores medible",
    "shortTitle": "Proyecto integrador",
    "duration": 120,
    "objective": "Construir un laboratorio que compare una VM y contenedores midiendo aislamiento, recursos, filesystem y recuperación sin conclusiones universales.",
    "summary": [
      "La integración final debe hacer observables las fronteras: qué kernel se ejecuta, qué namespace cambia, qué cgroup limita, dónde viven los datos y qué ocurre al destruir/recrear instancias.",
      "Diseña escenarios equivalentes, fija hardware/workload, captura versiones y mide startup, memoria, CPU/I/O y efectos de límites. Añade un experimento de persistencia y otro de seguridad con privilegios mínimos.",
      "La decisión correcta se justifica declarando frontera de aislamiento, amenaza/workload y evidencia observable del kernel/runtime, no con slogans como “ligero” o “aislado”."
    ],
    "concept": "La integración final debe hacer observables las fronteras: qué kernel se ejecuta, qué namespace cambia, qué cgroup limita, dónde viven los datos y qué ocurre al destruir/recrear instancias.",
    "rules": [
      "Separa virtualización de máquina, aislamiento de procesos y control de recursos.",
      "Declara qué kernel, privilegios, mounts, red y almacenamiento participan antes de afirmar aislamiento o persistencia.",
      "Mide desde host y guest/contenedor: procesos, namespaces, cgroups, memoria, I/O y latencia deben correlacionarse."
    ],
    "deep": {
      "intro": "Construir un laboratorio que compare una VM y contenedores midiendo aislamiento, recursos, filesystem y recuperación sin conclusiones universales.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La integración final debe hacer observables las fronteras: qué kernel se ejecuta, qué namespace cambia, qué cgroup limita, dónde viven los datos y qué ocurre al destruir/recrear instancias."
        },
        {
          "title": "Mecánica",
          "body": "Diseña escenarios equivalentes, fija hardware/workload, captura versiones y mide startup, memoria, CPU/I/O y efectos de límites. Añade un experimento de persistencia y otro de seguridad con privilegios mínimos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "No conviertas una implementación concreta en definición universal. Versiones de Docker, backends de imágenes, hypervisors y kernels cambian; namespace no implica cuota, cgroup no implica invisibilidad, imagen no equivale a contenedor y aislamiento no equivale a seguridad absoluta."
        },
        {
          "title": "Validación",
          "body": "Construye un experimento mínimo y observa la capa relevante: /proc, namespaces, cgroups, mounts, procesos del host, configuración del runtime, consumo y efectos al detener/destruir/recrear. Conserva versiones y comandos para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Una comparación válida puede atribuir diferencias a virtualización si cambia a la vez hardware, workload y configuración?",
      "steps": [
        "Identifica la frontera: hardware/VM, kernel/proceso, recursos, filesystem o runtime.",
        "Busca el mecanismo concreto que implementa la propiedad y un contraejemplo que revele sus límites."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una comparación válida puede atribuir diferencias a virtualización si cambia a la vez hardware, workload y configuración?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero esa afirmación no define por sí sola la garantía",
          false
        ]
      ],
      "feedback": "La integración final debe hacer observables las fronteras: qué kernel se ejecuta, qué namespace cambia, qué cgroup limita, dónde viven los datos y qué ocurre al destruir/recrear instancias."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una comparación válida puede atribuir diferencias a virtualización si cambia a la vez hardware, workload y configuración?",
        "answer": "no",
        "hint": "Localiza primero qué capa implementa esa propiedad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Proyecto integrador.",
        "answer": "proyecto",
        "hint": "Nombra la frontera o mecanismo principal, no solo una herramienta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible para Proyecto integrador: declara frontera, workload, condición adversarial y observación del host/kernel.",
        "answer": "frontera",
        "hint": "Incluye qué namespace/cgroup/VM/filesystem observas y cómo sabrás si la hipótesis era correcta."
      }
    ]
  }
});
