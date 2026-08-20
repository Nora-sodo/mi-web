/**
 * BLOQUE 014 — Drivers y hardware
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar siempre bus, dispositivo, modelo de programación,
 * subsistema del SO y driver. MMIO, DMA e interrupciones son mecanismos; no
 * sustituyen la semántica del dispositivo.
 */

window.LEARNING_PATHS[14] = {
  "level": "Experto progresivo",
  "estimatedHours": 52,
  "description": "Drivers, buses, DMA, interrupciones y subsistemas reales desde registros de dispositivo hasta colas de almacenamiento, red y GPU.",
  "outcomes": [
    "Distinguir driver, dispositivo, bus, subsistema y ABI de acceso sin mezclar capas.",
    "Programar mentalmente un dispositivo mediante MMIO/PIO, interrupciones y DMA considerando ordering y ownership.",
    "Explicar enumeración PCI/PCIe y USB/HID con sus modelos de configuración y transferencia.",
    "Seguir operaciones de almacenamiento, red y gráficos a través de colas, DMA, completados y sincronización."
  ],
  "modules": [
    {
      "id": "m1-driver-io",
      "title": "Modelo del driver e I/O",
      "description": "Contratos, registros y eventos.",
      "lessons": [
        "drivers-role-model",
        "drivers-mmio-pio",
        "drivers-interrupts-irq",
        "drivers-dma-iommu"
      ]
    },
    {
      "id": "m2-pci",
      "title": "PCI y PCI Express",
      "description": "Enumeración, recursos y fabric.",
      "lessons": [
        "drivers-pci",
        "drivers-pcie"
      ]
    },
    {
      "id": "m3-usb",
      "title": "USB y HID",
      "description": "Host-centric I/O y drivers de clase.",
      "lessons": [
        "drivers-usb",
        "drivers-hid"
      ]
    },
    {
      "id": "m4-subsystems",
      "title": "Drivers de subsistema",
      "description": "Storage, networking y graphics.",
      "lessons": [
        "drivers-storage",
        "drivers-network",
        "drivers-graphics"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "drivers-role-model": {
    "id": "drivers-role-model",
    "courseId": 14,
    "title": "Device drivers: contrato entre kernel y dispositivo",
    "shortTitle": "Quién habla con el hardware",
    "duration": 95,
    "objective": "explicar qué responsabilidades asume un driver y separar interfaz del SO, protocolo del dispositivo y mecanismo del bus.",
    "summary": [
      "Un driver traduce operaciones del subsistema del SO a comandos/estado de un dispositivo concreto.",
      "El modelo de programación del dispositivo puede exponer registros, colas, memoria compartida e interrupciones.",
      "Bus, dispositivo y driver son capas relacionadas pero no equivalentes."
    ],
    "concept": "Un driver es software privilegiado que conoce el contrato de un dispositivo y lo integra en las abstracciones del sistema operativo. No “controla electrones” directamente: programa interfaces definidas por hardware y bus.",
    "diagram": [],
    "rules": [
      "Separa API del subsistema, driver y protocolo hardware.",
      "No asumas que un driver es siempre monolítico o vive siempre en kernel space.",
      "Trata errores, hot-unplug y concurrencia como parte del diseño, no como excepciones decorativas."
    ],
    "deep": {
      "sections": [
        {
          "title": "Responsabilidades",
          "body": "Inicialización, descubrimiento de recursos, programación del dispositivo, sincronización, manejo de errores, power management y exposición al subsistema superior."
        },
        {
          "title": "Modelo de dispositivo",
          "body": "Registros de control/estado, descriptor rings, buffers y doorbells son patrones comunes, no requisitos universales."
        },
        {
          "title": "Fallo y aislamiento",
          "body": "Un bug de driver puede corromper memoria o bloquear el kernel; IOMMU, validación de entradas y separación de privilegios reducen superficie de fallo."
        }
      ],
      "commonErrors": [
        "Confundir driver con protocolo del bus.",
        "Suponer que toda E/S requiere polling continuo."
      ],
      "connections": [
        "Sistemas operativos",
        "PCIe",
        "DMA"
      ]
    },
    "example": {
      "problem": "Una NIC debe enviar un paquete.",
      "steps": [
        [
          "Paso 1",
          "El stack de red entrega un buffer al driver."
        ],
        [
          "Paso 2",
          "El driver prepara descriptores según el formato de la NIC."
        ],
        [
          "Paso 3",
          "Programa/avisa al dispositivo y más tarde procesa completado mediante interrupción o polling."
        ]
      ],
      "answer": "La abstracción “enviar paquete” se traduce a un protocolo concreto de colas y registros."
    },
    "check": {
      "question": "¿Un driver y el bus PCIe son la misma capa?",
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
      "failure": "Revisa qué capa, mecanismo o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un driver debe conocer el contrato concreto de su dispositivo? sí/no",
        "answer": "si",
        "hint": "Sin ese contrato no puede programarlo."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Puede un bug de driver afectar a todo el sistema? sí/no",
        "answer": "si",
        "hint": "Suele ejecutar con privilegios altos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Todo driver debe usar exactamente la misma estructura interna? sí/no",
        "answer": "no",
        "hint": "Depende del SO, subsistema y hardware."
      }
    ]
  },
  "drivers-mmio-pio": {
    "id": "drivers-mmio-pio",
    "courseId": 14,
    "title": "MMIO y port-mapped I/O",
    "shortTitle": "Registros que parecen memoria",
    "duration": 100,
    "objective": "distinguir memory-mapped I/O de port-mapped I/O y razonar sobre accesos, ordering y side effects.",
    "summary": [
      "MMIO ubica recursos de dispositivo en el espacio de direcciones accesible mediante operaciones de memoria apropiadas.",
      "Port-mapped I/O usa un espacio separado y suele requerir instrucciones específicas en arquitecturas que lo soportan.",
      "Los accesos a I/O no deben tratarse como RAM ordinaria: pueden tener side effects y reglas de ordering especiales."
    ],
    "concept": "MMIO asigna rangos de direcciones a registros o ventanas de dispositivo. El software usa primitivas de I/O adecuadas porque leer/escribir puede disparar acciones, limpiar flags o requerir barreras.",
    "diagram": [],
    "rules": [
      "No dereferencies MMIO como si fuera memoria normal portable.",
      "Respeta ancho, ordering y semántica del registro.",
      "No confundas volatile del lenguaje con todas las garantías de I/O del kernel/arquitectura."
    ],
    "deep": {
      "sections": [
        {
          "title": "MMIO",
          "body": "El dispositivo decodifica transacciones dirigidas a un rango de direcciones y responde como recurso de I/O."
        },
        {
          "title": "Port I/O",
          "body": "En x86 existe un espacio de puertos separado accesible mediante instrucciones como IN/OUT; no es universal."
        },
        {
          "title": "Ordering",
          "body": "CPU, compiler y fabric pueden imponer reglas diferentes; los kernels proporcionan APIs y barreras específicas para acceder a I/O."
        }
      ],
      "commonErrors": [
        "Usar un puntero C ordinario como sustituto universal de readl()/writel().",
        "Asumir que leer un status register nunca cambia el dispositivo."
      ],
      "connections": [
        "Memoria",
        "Buses",
        "Memory barriers"
      ]
    },
    "example": {
      "problem": "Un registro STATUS se limpia al leerlo.",
      "steps": [
        [
          "Paso 1",
          "El driver usa la primitiva de lectura correcta."
        ],
        [
          "Paso 2",
          "La lectura devuelve flags actuales."
        ],
        [
          "Paso 3",
          "El hardware borra esos bits como side effect definido por el dispositivo."
        ]
      ],
      "answer": "Releer el registro puede producir un valor distinto aunque ningún thread haya escrito RAM."
    },
    "check": {
      "question": "¿MMIO debe tratarse exactamente como RAM ordinaria?",
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
          "Solo si es PCIe",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué capa, mecanismo o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Port-mapped I/O es universal a todas las ISA? sí/no",
        "answer": "no",
        "hint": "Es dependiente de arquitectura."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un registro MMIO puede tener side effects al leer? sí/no",
        "answer": "si",
        "hint": "La semántica la define el dispositivo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿volatile por sí solo sustituye las barreras y APIs de I/O del kernel? sí/no",
        "answer": "no",
        "hint": "Son garantías distintas."
      }
    ]
  },
  "drivers-interrupts-irq": {
    "id": "drivers-interrupts-irq",
    "courseId": 14,
    "title": "Interrupts, IRQ y manejo diferido",
    "shortTitle": "El hardware pide atención",
    "duration": 100,
    "objective": "explicar cómo una interrupción transfiere control, qué representa una IRQ y por qué el trabajo suele dividirse entre contexto inmediato y diferido.",
    "summary": [
      "Una interrupción notifica un evento asíncrono y provoca entrada a código privilegiado según la arquitectura/controlador.",
      "IRQ identifica una fuente/ruta lógica de interrupción en el sistema; no es sinónimo universal de pin físico.",
      "El handler suele reconocer la causa y posponer trabajo pesado para reducir latencia y bloqueo."
    ],
    "concept": "Las interrupciones evitan polling permanente, pero introducen concurrencia y prioridades. El driver debe reconocer la fuente, limpiar/acknowledge según contrato y coordinar con el resto del kernel.",
    "diagram": [],
    "rules": [
      "No bloquees indiscriminadamente en contexto de interrupción.",
      "Distingue máscara, acknowledge y condición que originó el evento.",
      "Considera carreras entre handler, proceso y dispositivo."
    ],
    "deep": {
      "sections": [
        {
          "title": "Ruta",
          "body": "Dispositivo → controlador de interrupciones → CPU → vector/handler es un modelo útil; los detalles varían."
        },
        {
          "title": "MSI/MSI-X",
          "body": "PCIe puede señalizar interrupciones mediante mensajes en lugar de líneas físicas compartidas."
        },
        {
          "title": "Trabajo diferido",
          "body": "Bottom halves, softirqs, tasklets/workqueues u otros mecanismos trasladan trabajo fuera del tramo crítico según el SO."
        }
      ],
      "commonErrors": [
        "Pensar que IRQ es siempre un cable.",
        "Hacer procesamiento ilimitado dentro del handler."
      ],
      "connections": [
        "Scheduling",
        "PCIe",
        "Concurrencia"
      ]
    },
    "example": {
      "problem": "Una NIC recibe miles de paquetes por segundo.",
      "steps": [
        [
          "Paso 1",
          "Una interrupción notifica trabajo nuevo."
        ],
        [
          "Paso 2",
          "El handler reconoce/limita la fuente y activa procesamiento diferido."
        ],
        [
          "Paso 3",
          "El kernel procesa lotes para amortizar overhead."
        ]
      ],
      "answer": "Interrupción y polling pueden combinarse para controlar coste bajo carga."
    },
    "check": {
      "question": "¿IRQ significa necesariamente un pin físico dedicado?",
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
          "Solo con MSI-X",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué capa, mecanismo o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una interrupción puede ocurrir mientras otro código del driver está ejecutándose? sí/no",
        "answer": "si",
        "hint": "Introduce concurrencia."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿MSI/MSI-X usa mensajes para señalizar interrupciones PCIe? sí/no",
        "answer": "si",
        "hint": "No depende de una línea legacy por vector."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene hacer trabajo pesado ilimitado en el handler inmediato? sí/no",
        "answer": "no",
        "hint": "Aumenta latencia y bloqueo."
      }
    ]
  },
  "drivers-dma-iommu": {
    "id": "drivers-dma-iommu",
    "courseId": 14,
    "title": "DMA, coherencia e IOMMU",
    "shortTitle": "Mover datos sin copiar byte a byte",
    "duration": 115,
    "objective": "razonar sobre DMA mappings, direcciones del dispositivo, coherencia, ownership de buffers e IOMMU.",
    "summary": [
      "DMA permite que dispositivos transfieran datos hacia/desde memoria sin que la CPU copie cada byte.",
      "La dirección que ve un dispositivo no tiene por qué ser una dirección física CPU trivial; la DMA API abstrae mapeos.",
      "IOMMU puede traducir y restringir accesos DMA, mejorando aislamiento y virtualización."
    ],
    "concept": "DMA es un protocolo de ownership y visibilidad además de una transferencia. CPU y dispositivo deben acordar qué buffer existe, qué dirección usa el dispositivo y cuándo cada lado puede leer/escribirlo.",
    "diagram": [],
    "rules": [
      "Usa la DMA API del sistema, no casts de virtual a physical.",
      "Respeta sync/ownership en plataformas no coherentes.",
      "Configura límites de direccionamiento y tamaño que soporte el dispositivo."
    ],
    "deep": {
      "sections": [
        {
          "title": "DMA address",
          "body": "dma_addr_t representa una dirección utilizable por el dispositivo; puede diferir de CPU virtual/physical address."
        },
        {
          "title": "Coherent vs streaming",
          "body": "APIs coherentes y streaming tienen costes/semánticas diferentes; la segunda puede requerir sincronización explícita."
        },
        {
          "title": "IOMMU",
          "body": "Traduce direcciones de dispositivo y puede limitar qué memoria puede tocar cada dispositivo."
        }
      ],
      "commonErrors": [
        "Suponer que DMA significa cero participación de CPU.",
        "Dar al dispositivo una dirección virtual de proceso."
      ],
      "connections": [
        "IOMMU",
        "PCIe",
        "Caches"
      ]
    },
    "example": {
      "problem": "Una controladora lee un bloque hacia RAM.",
      "steps": [
        [
          "Paso 1",
          "El driver reserva/mapea un buffer para DMA."
        ],
        [
          "Paso 2",
          "Programa el dispositivo con la dirección DMA y longitud."
        ],
        [
          "Paso 3",
          "Tras completado y sincronización necesaria, la CPU consume el contenido."
        ]
      ],
      "answer": "El buffer cambia de ownership lógico durante la operación."
    },
    "check": {
      "question": "¿Una dirección DMA tiene que ser idéntica a una dirección virtual de CPU?",
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
          "Solo en USB",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué capa, mecanismo o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿DMA elimina toda intervención de CPU en una operación? sí/no",
        "answer": "no",
        "hint": "La CPU configura, sincroniza y procesa completados."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una IOMMU puede restringir qué memoria puede tocar un dispositivo? sí/no",
        "answer": "si",
        "hint": "Aísla mediante traducciones/permisos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Es correcto convertir directamente un puntero virtual a entero y entregarlo siempre al dispositivo? sí/no",
        "answer": "no",
        "hint": "Usa la DMA API/mapeo apropiado."
      }
    ]
  },
  "drivers-pci": {
    "id": "drivers-pci",
    "courseId": 14,
    "title": "PCI: configuración, BARs y enumeración",
    "shortTitle": "Descubrir recursos PCI",
    "duration": 110,
    "objective": "explicar configuration space, identificación, BARs, enumeración y asignación de recursos PCI.",
    "summary": [
      "PCI define configuration space para identificar funciones y exponer capacidades/recursos.",
      "Los BARs describen regiones de I/O o memoria que el sistema asigna y mapea.",
      "Enumerar no significa que el dispositivo esté listo para operar: el driver debe habilitar y configurar recursos."
    ],
    "concept": "PCI permite descubrir funciones de dispositivo y negociar recursos. El software lee configuration space, identifica vendor/device/class y obtiene BARs/capabilities para programar el dispositivo.",
    "diagram": [],
    "rules": [
      "No confundas BAR con el contenido del dispositivo.",
      "No asumas direcciones BAR fijas entre boots.",
      "Distingue configuration space de MMIO operativo."
    ],
    "deep": {
      "sections": [
        {
          "title": "Configuration space",
          "body": "Contiene IDs, class codes, command/status y capability structures."
        },
        {
          "title": "BARs",
          "body": "Base Address Registers describen ventanas que firmware/SO asignan al address map."
        },
        {
          "title": "Enumeración",
          "body": "Bridges crean una jerarquía; el sistema recorre funciones y asigna buses/recursos según plataforma."
        }
      ],
      "commonErrors": [
        "Creer que vendor ID basta para elegir siempre el driver correcto.",
        "Tratar config space y register space como la misma región."
      ],
      "connections": [
        "PCIe",
        "MMIO",
        "Drivers"
      ]
    },
    "example": {
      "problem": "El SO encuentra una NIC PCI.",
      "steps": [
        [
          "Paso 1",
          "Lee IDs/class code."
        ],
        [
          "Paso 2",
          "Identifica BARs y recursos."
        ],
        [
          "Paso 3",
          "Asocia driver, habilita dispositivo y mapea registros."
        ]
      ],
      "answer": "Descubrimiento precede a la programación funcional."
    },
    "check": {
      "question": "¿Un BAR contiene necesariamente datos de paquete de la NIC?",
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
          "Solo el BAR0",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué capa, mecanismo o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Configuration space y MMIO operativo son la misma cosa? sí/no",
        "answer": "no",
        "hint": "Son espacios/propósitos distintos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Los BARs permiten describir ventanas de recursos? sí/no",
        "answer": "si",
        "hint": "Eso es parte central de PCI."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La dirección final de un BAR debe ser idéntica en todos los arranques? sí/no",
        "answer": "no",
        "hint": "El sistema puede reasignar recursos."
      }
    ]
  },
  "drivers-pcie": {
    "id": "drivers-pcie",
    "courseId": 14,
    "title": "PCI Express: enlaces, TLP y jerarquía",
    "shortTitle": "PCI convertido en fabric serie",
    "duration": 120,
    "objective": "explicar PCIe como interconexión packetizada punto a punto y distinguir lanes, links, switches, TLP y programming model PCI.",
    "summary": [
      "PCIe mantiene gran parte del modelo de programación PCI pero usa enlaces serie punto a punto y paquetes.",
      "Un link combina una o más lanes bidireccionales y puede atravesar switches dentro de una jerarquía.",
      "TLP transporta transacciones de memoria, I/O/configuración y mensajes según la especificación."
    ],
    "concept": "PCIe no es “un bus paralelo más rápido”: es una fabric de enlaces seriales packetizados que preserva compatibilidad de software con el modelo PCI en muchos aspectos.",
    "diagram": [],
    "rules": [
      "Distingue ancho de link (x1/x4/x8/x16) de generación/velocidad.",
      "No conviertas TLP en paquete IP: comparten la idea de paquete, no el protocolo.",
      "Separa Physical/Data Link/Transaction Layer del driver funcional."
    ],
    "deep": {
      "sections": [
        {
          "title": "Topología",
          "body": "Root Complex conecta la CPU/memoria con endpoints y switches."
        },
        {
          "title": "Transaction Layer",
          "body": "TLP expresa operaciones y mensajes; Data Link aporta fiabilidad hop-by-hop y Physical transmite símbolos/bits."
        },
        {
          "title": "Compatibilidad de software",
          "body": "Configuration space, BARs y capabilities permiten continuidad del modelo PCI aunque el transporte sea distinto."
        }
      ],
      "commonErrors": [
        "Decir que PCIe es un bus compartido eléctrico clásico.",
        "Confundir lane con dispositivo."
      ],
      "connections": [
        "PCI",
        "SerDes",
        "DMA"
      ]
    },
    "example": {
      "problem": "Una GPU x16 accede a memoria host mediante PCIe.",
      "steps": [
        [
          "Paso 1",
          "El driver configura recursos y DMA."
        ],
        [
          "Paso 2",
          "La operación genera transacciones PCIe apropiadas."
        ],
        [
          "Paso 3",
          "La fabric enruta TLP entre endpoint y root complex."
        ]
      ],
      "answer": "El driver programa el endpoint; no construye manualmente cada símbolo del enlace."
    },
    "check": {
      "question": "¿PCIe es físicamente un bus paralelo compartido como PCI clásico?",
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
          "Solo x16",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué capa, mecanismo o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿x16 describe el número de lanes del link? sí/no",
        "answer": "si",
        "hint": "Es ancho del enlace."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un TLP es un paquete IP? sí/no",
        "answer": "no",
        "hint": "Son protocolos/capas distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿PCIe conserva conceptos como configuration space y BARs? sí/no",
        "answer": "si",
        "hint": "Mantiene compatibilidad del programming model."
      }
    ]
  },
  "drivers-usb": {
    "id": "drivers-usb",
    "courseId": 14,
    "title": "USB: host, dispositivos, endpoints y transfers",
    "shortTitle": "El host lleva el ritmo",
    "duration": 120,
    "objective": "explicar la arquitectura host-centric de USB, enumeración, endpoints, pipes y tipos de transferencia.",
    "summary": [
      "USB es host-centric: el host/controller inicia y agenda las transferencias.",
      "Un dispositivo expone descriptors, configurations, interfaces y endpoints.",
      "Control, bulk, interrupt e isochronous ofrecen semánticas y compromisos distintos."
    ],
    "concept": "USB separa topología física, descriptors y endpoints lógicos. El host enumera el dispositivo, asigna dirección, lee descriptors y vincula drivers por interfaces/clases.",
    "diagram": [],
    "rules": [
      "No confundas “interrupt transfer” con una IRQ directa del dispositivo a la CPU.",
      "Distingue endpoint del dispositivo y pipe del host.",
      "No asumas que USB garantiza latencia idéntica para todos los tipos de transferencia."
    ],
    "deep": {
      "sections": [
        {
          "title": "Enumeración",
          "body": "Reset, dirección y lectura de descriptors permiten descubrir capacidades y configurar interfaces."
        },
        {
          "title": "Endpoints",
          "body": "Son puntos lógicos numerados con dirección IN/OUT salvo endpoint 0, usado para control."
        },
        {
          "title": "Transfers",
          "body": "Control configura; bulk prioriza integridad/throughput sin garantía temporal fuerte; interrupt reserva oportunidades periódicas; isochronous prioriza tiempo y tolera pérdida según clase."
        }
      ],
      "commonErrors": [
        "Pensar que el dispositivo transmite arbitrariamente sin ser sondeado/programado por host.",
        "Interpretar interrupt endpoint como línea IRQ PCI."
      ],
      "connections": [
        "HID",
        "Host controller",
        "Drivers de clase"
      ]
    },
    "example": {
      "problem": "Se conecta un teclado USB HID.",
      "steps": [
        [
          "Paso 1",
          "El host detecta conexión y enumera."
        ],
        [
          "Paso 2",
          "Lee descriptors e identifica interfaz HID."
        ],
        [
          "Paso 3",
          "El driver de clase configura el endpoint y recibe reports mediante transferencias programadas."
        ]
      ],
      "answer": "La clase permite driver genérico sin conocer cada modelo de teclado."
    },
    "check": {
      "question": "¿Un USB interrupt transfer es lo mismo que una IRQ PCIe directa?",
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
          "Solo en HID",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué capa, mecanismo o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El host USB inicia/agenda las transferencias del bus? sí/no",
        "answer": "si",
        "hint": "USB es host-centric."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Endpoint 0 se usa para control durante enumeración? sí/no",
        "answer": "si",
        "hint": "Es fundamental en control transfers."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Bulk ofrece normalmente una garantía estricta de latencia periódica? sí/no",
        "answer": "no",
        "hint": "Prioriza entrega fiable/throughput según disponibilidad."
      }
    ]
  },
  "drivers-hid": {
    "id": "drivers-hid",
    "courseId": 14,
    "title": "HID: reports, usages y drivers de clase",
    "shortTitle": "Teclados sin driver por modelo",
    "duration": 95,
    "objective": "interpretar el modelo HID de reports/usages y explicar cómo un driver de clase abstrae dispositivos heterogéneos.",
    "summary": [
      "HID define una clase de dispositivos y un formato descriptivo para reportar controles/datos.",
      "Report descriptors describen campos y usages; no son simples listas fijas de teclas.",
      "Un driver de clase puede soportar múltiples dispositivos compatibles sin un driver específico por modelo."
    ],
    "concept": "HID desplaza parte de la descripción del dispositivo a metadata interpretable. El host analiza el report descriptor y sabe cómo interpretar input/output/feature reports.",
    "diagram": [],
    "rules": [
      "No hardcodees layouts cuando el report descriptor define el formato.",
      "Distingue usage page/usage de valores brutos del report.",
      "No supongas que HID significa exclusivamente teclado/ratón."
    ],
    "deep": {
      "sections": [
        {
          "title": "Report descriptor",
          "body": "Describe tamaño, conteo, usages y naturaleza de los campos que aparecerán en reports."
        },
        {
          "title": "Reports",
          "body": "Input lleva datos del dispositivo; Output/Feature permiten control/estado según el dispositivo."
        },
        {
          "title": "Clase",
          "body": "La estandarización permite un driver genérico, aunque quirks concretos sigan existiendo."
        }
      ],
      "commonErrors": [
        "Confundir HID descriptor con report descriptor.",
        "Suponer un byte por tecla universal."
      ],
      "connections": [
        "USB",
        "Input subsystem",
        "Drivers de clase"
      ]
    },
    "example": {
      "problem": "Un gamepad HID anuncia ejes y botones.",
      "steps": [
        [
          "Paso 1",
          "El host lee el report descriptor."
        ],
        [
          "Paso 2",
          "Asocia usages a ejes/botones."
        ],
        [
          "Paso 3",
          "Cada input report se decodifica con ese layout."
        ]
      ],
      "answer": "El mismo driver puede interpretar layouts diferentes descritos por metadata."
    },
    "check": {
      "question": "¿HID requiere un driver distinto para cada teclado compatible?",
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
          "Solo en USB 3",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué capa, mecanismo o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El report descriptor describe el layout de reports HID? sí/no",
        "answer": "si",
        "hint": "Es su función central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿HID se limita a teclado y ratón? sí/no",
        "answer": "no",
        "hint": "Incluye muchas categorías de control."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un driver debe asumir universalmente que cada botón ocupa un byte completo? sí/no",
        "answer": "no",
        "hint": "El descriptor define tamaños/campos."
      }
    ]
  },
  "drivers-storage": {
    "id": "drivers-storage",
    "courseId": 14,
    "title": "Drivers de almacenamiento: colas, bloques y completados",
    "shortTitle": "Del bloque lógico al dispositivo",
    "duration": 110,
    "objective": "seguir una petición de bloques desde el subsistema de almacenamiento hasta una controladora y su completado.",
    "summary": [
      "El driver traduce requests del subsistema de bloques al protocolo de la controladora.",
      "Colas y command descriptors permiten múltiples operaciones en vuelo.",
      "Timeouts, errores, flushes y ordering son parte del contrato de almacenamiento, no detalles accesorios."
    ],
    "concept": "Un driver de almacenamiento no implementa el filesystem: recibe operaciones de bloques/comandos y las transforma al lenguaje de SATA/SCSI/NVMe u otra controladora.",
    "diagram": [],
    "rules": [
      "No confundas filesystem con block driver.",
      "Respeta semántica de flush/FUA cuando la durabilidad lo requiera.",
      "Gestiona timeouts y reset/recovery como caminos normales de fallo."
    ],
    "deep": {
      "sections": [
        {
          "title": "Colas",
          "body": "Requests pueden agruparse y mantenerse en vuelo; la profundidad afecta throughput/latencia."
        },
        {
          "title": "Completado",
          "body": "Interrupts o polling notifican command completion y el driver despierta/completa requests superiores."
        },
        {
          "title": "Errores",
          "body": "Media errors, transport errors y controller reset requieren recuperación estratificada."
        }
      ],
      "commonErrors": [
        "Afirmar que el driver conoce directorios/inodes por necesidad.",
        "Confundir “write completado por controladora” con toda garantía de durabilidad del filesystem."
      ],
      "connections": [
        "NVMe",
        "Sistemas de archivos",
        "DMA"
      ]
    },
    "example": {
      "problem": "El filesystem solicita leer bloques.",
      "steps": [
        [
          "Paso 1",
          "Block layer genera requests."
        ],
        [
          "Paso 2",
          "Driver prepara comandos/descriptores y DMA."
        ],
        [
          "Paso 3",
          "Controladora completa y el driver devuelve estado/datos."
        ]
      ],
      "answer": "Filesystem y driver colaboran a través de capas, no comparten necesariamente sus estructuras internas."
    },
    "check": {
      "question": "¿Un driver NVMe necesita interpretar inodes ext4 para leer un LBA?",
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
          "Solo con journaling",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué capa, mecanismo o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un block driver opera típicamente sobre requests de bloques/comandos y no pathnames? sí/no",
        "answer": "si",
        "hint": "La resolución de nombres ocurre arriba."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Queue depth puede afectar throughput y latencia? sí/no",
        "answer": "si",
        "hint": "Permite concurrencia en vuelo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un timeout debe tratarse como camino imposible? sí/no",
        "answer": "no",
        "hint": "Recovery es parte del diseño."
      }
    ]
  },
  "drivers-network": {
    "id": "drivers-network",
    "courseId": 14,
    "title": "Drivers de red: rings, NAPI y offloads",
    "shortTitle": "Paquetes entre NIC y stack",
    "duration": 115,
    "objective": "explicar TX/RX descriptor rings, DMA, interrupciones/polling y offloads sin confundir driver con protocolo de red.",
    "summary": [
      "NICs suelen usar descriptor rings para buffers TX/RX accesibles mediante DMA.",
      "El driver coordina ownership entre CPU y dispositivo y entrega paquetes al stack de red.",
      "Offloads pueden mover checksums, segmentation u otras tareas al hardware, pero cambian observabilidad y requisitos."
    ],
    "concept": "El driver de red conecta el stack con una NIC concreta. Programa colas, buffers y completados; IP/TCP viven en capas superiores salvo offloads específicos.",
    "diagram": [],
    "rules": [
      "Mantén ownership claro de cada descriptor/buffer.",
      "Controla interrupt storms con batching/polling cuando proceda.",
      "No atribuyas al driver toda semántica TCP/IP."
    ],
    "deep": {
      "sections": [
        {
          "title": "Rings",
          "body": "Descriptores circulares permiten productor/consumidor entre CPU y NIC."
        },
        {
          "title": "NAPI/polling",
          "body": "Linux combina interrupción para señal y polling por lotes bajo carga para evitar tormentas de IRQ."
        },
        {
          "title": "Offloads",
          "body": "Checksum, TSO/GSO y RSS pueden cambiar dónde se realiza trabajo y cómo se observa el tráfico."
        }
      ],
      "commonErrors": [
        "Confundir RX ring con socket receive buffer.",
        "Suponer que cada paquete recibido genera obligatoriamente una IRQ independiente."
      ],
      "connections": [
        "Redes",
        "DMA",
        "Interrupt mitigation"
      ]
    },
    "example": {
      "problem": "Llega una ráfaga de paquetes.",
      "steps": [
        [
          "Paso 1",
          "NIC DMA-escribe buffers y actualiza descriptors."
        ],
        [
          "Paso 2",
          "Interrupción inicial activa procesamiento."
        ],
        [
          "Paso 3",
          "El kernel procesa varios descriptors por lote y repone buffers."
        ]
      ],
      "answer": "Batching amortiza overhead de interrupciones."
    },
    "check": {
      "question": "¿Cada paquete de red debe causar obligatoriamente una IRQ separada?",
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
          "Solo en Ethernet",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué capa, mecanismo o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿RX ring y socket buffer son exactamente la misma estructura? sí/no",
        "answer": "no",
        "hint": "Viven en capas distintas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una NIC puede DMA-escribir paquetes en buffers preparados por el driver? sí/no",
        "answer": "si",
        "hint": "Es un patrón habitual."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Offload significa que TCP/IP entero siempre se ejecuta dentro de la NIC? sí/no",
        "answer": "no",
        "hint": "Los offloads son funciones específicas."
      }
    ]
  },
  "drivers-graphics": {
    "id": "drivers-graphics",
    "courseId": 14,
    "title": "Drivers gráficos: command buffers, memoria y sincronización",
    "shortTitle": "La GPU recibe trabajo",
    "duration": 120,
    "objective": "explicar cómo un driver gráfico gestiona contextos, memoria, command buffers, sincronización y frontera kernel/user space.",
    "summary": [
      "Drivers gráficos modernos suelen repartir responsabilidades entre kernel y user space.",
      "La aplicación/API produce comandos que terminan en buffers/queues consumidos por GPU.",
      "Memory management, fences y synchronization son esenciales para coordinar CPU/GPU y múltiples clientes."
    ],
    "concept": "El driver gráfico no “dibuja píxeles uno a uno desde la CPU”. Gestiona recursos, valida/programa trabajo y coordina una GPU altamente paralela mediante command submission.",
    "diagram": [],
    "rules": [
      "Separa API gráfica, user-space driver y kernel driver.",
      "No reutilices recursos antes de que la GPU haya terminado.",
      "Trata memoria GPU/compartida y mappings como recursos explícitos."
    ],
    "deep": {
      "sections": [
        {
          "title": "User/kernel split",
          "body": "Compilación de shaders y construcción de comandos puede vivir en user space; kernel gestiona privilegio, memoria y scheduling según plataforma."
        },
        {
          "title": "Submission",
          "body": "Command buffers describen trabajo; doorbells/queues notifican a hardware."
        },
        {
          "title": "Sync",
          "body": "Fences/semaphores/eventos expresan dependencias y completado; CPU y GPU son agentes concurrentes."
        }
      ],
      "commonErrors": [
        "Pensar que OpenGL/Vulkan son drivers de kernel.",
        "Suponer que finalizar una llamada API significa que la GPU terminó físicamente."
      ],
      "connections": [
        "GPU",
        "Vulkan",
        "DMA-buf"
      ]
    },
    "example": {
      "problem": "La aplicación envía un frame.",
      "steps": [
        [
          "Paso 1",
          "User-space driver construye/valida comandos."
        ],
        [
          "Paso 2",
          "Kernel/driver gestiona mappings y submission según API."
        ],
        [
          "Paso 3",
          "GPU ejecuta; fences indican cuándo recursos pueden reutilizarse."
        ]
      ],
      "answer": "La llamada CPU puede retornar antes de que termine el frame en GPU."
    },
    "check": {
      "question": "¿Retornar de una llamada gráfica implica siempre que la GPU ya terminó el trabajo?",
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
      "success": "Correcto.",
      "failure": "Revisa qué capa, mecanismo o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿CPU y GPU pueden trabajar concurrentemente? sí/no",
        "answer": "si",
        "hint": "Las colas permiten solapamiento."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una fence puede representar completado/dependencia de trabajo GPU? sí/no",
        "answer": "si",
        "hint": "Es un mecanismo de sincronización."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Vulkan es simplemente un driver de kernel? sí/no",
        "answer": "no",
        "hint": "Es una API con componentes de driver en user/kernel según plataforma."
      }
    ]
  }
});
