/**
 * BLOQUE 073 — CLOUD Y SISTEMAS A GRAN ESCALA
 *
 * Regla editorial: cloud no elimina la física, la distribución ni los failure domains;
 * los abstrae y automatiza. Toda garantía se liga a un mecanismo y a una prueba.
 */
window.LEARNING_PATHS[73] = {
  "level": "Cloud y Sistemas a Gran Escala",
  "estimatedHours": 210,
  "description": "Infraestructura moderna: servidores, data centers, virtualización, contenedores, orquestación, Kubernetes, balanceo, autoscaling, tolerancia a fallos, observabilidad, almacenamiento distribuido y networking cloud.",
  "outcomes": [
    "Modelar infraestructura cloud por recursos, failure domains y contratos operativos en lugar de por nombres comerciales.",
    "Explicar control loops de orquestación y autoscaling, incluida la arquitectura conceptual de Kubernetes.",
    "Diseñar alta disponibilidad con load balancing, redundancia, observabilidad y recuperación medible.",
    "Razonar sobre storage, networking, capacidad, SLOs y coste como trade-offs acoplados."
  ],
  "modules": [
    {
      "id": "m1-infra",
      "title": "Infraestructura cloud",
      "description": "Servidores, ubicaciones y virtualización",
      "lessons": [
        "cloud-servers",
        "data-centers-cloud",
        "cloud-virtualization",
        "cloud-containers"
      ]
    },
    {
      "id": "m2-orchestration",
      "title": "Orquestación",
      "description": "Estado deseado, Kubernetes y tráfico",
      "lessons": [
        "orchestration",
        "kubernetes-concepts",
        "load-balancers-cloud"
      ]
    },
    {
      "id": "m3-elasticity",
      "title": "Elasticidad y resiliencia",
      "description": "Autoscaling y tolerancia a fallos",
      "lessons": [
        "autoscaling",
        "fault-tolerance-cloud"
      ]
    },
    {
      "id": "m4-observability-storage",
      "title": "Operación y datos",
      "description": "Observabilidad y almacenamiento",
      "lessons": [
        "observability-cloud",
        "distributed-storage-cloud"
      ]
    },
    {
      "id": "m5-network-capacity",
      "title": "Red y capacidad",
      "description": "Networking, capacidad y SLOs",
      "lessons": [
        "cloud-networking",
        "capacity-planning",
        "slo-reliability"
      ]
    },
    {
      "id": "m6-economics-project",
      "title": "Economía e integración",
      "description": "Coste y proyecto final",
      "lessons": [
        "cloud-cost-efficiency",
        "cloud-integration-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "cloud-servers": {
    "id": "cloud-servers",
    "courseId": 73,
    "title": "Servidores en cloud",
    "shortTitle": "Servers",
    "duration": 120,
    "objective": "Explicar el servidor como capacidad de cómputo dentro de una arquitectura, no como sinónimo de una máquina física concreta.",
    "summary": [
      "En cloud, un “servidor” puede ser una VM, una instancia, un nodo de contenedores o una función de cómputo; la unidad de operación importa más que la etiqueta comercial.",
      "Diseña alrededor de contratos de CPU, memoria, red, almacenamiento, lifecycle y failure domain, no alrededor del supuesto de que una instancia es permanente.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "En cloud, un “servidor” puede ser una VM, una instancia, un nodo de contenedores o una función de cómputo; la unidad de operación importa más que la etiqueta comercial.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Explicar el servidor como capacidad de cómputo dentro de una arquitectura, no como sinónimo de una máquina física concreta.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "En cloud, un “servidor” puede ser una VM, una instancia, un nodo de contenedores o una función de cómputo; la unidad de operación importa más que la etiqueta comercial."
        },
        {
          "title": "Mecánica",
          "body": "Diseña alrededor de contratos de CPU, memoria, red, almacenamiento, lifecycle y failure domain, no alrededor del supuesto de que una instancia es permanente."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Una instancia cloud debe considerarse permanente por defecto?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una instancia cloud debe considerarse permanente por defecto?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "En cloud, un “servidor” puede ser una VM, una instancia, un nodo de contenedores o una función de cómputo; la unidad de operación importa más que la etiqueta comercial."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una instancia cloud debe considerarse permanente por defecto?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Servers.",
        "answer": "servers",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Servers: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "data-centers-cloud": {
    "id": "data-centers-cloud",
    "courseId": 73,
    "title": "Centros de datos y dominios de fallo",
    "shortTitle": "Data centers",
    "duration": 120,
    "objective": "Relacionar regiones, zonas y centros de datos con latencia, disponibilidad y aislamiento de fallos.",
    "summary": [
      "La infraestructura a gran escala se organiza en dominios de fallo. Replicar recursos solo ayuda si las copias no comparten exactamente el mismo modo de fallo.",
      "Distribuir entre ubicaciones reduce ciertos fallos correlacionados, pero aumenta latencia, coste y complejidad de consistencia.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "La infraestructura a gran escala se organiza en dominios de fallo. Replicar recursos solo ayuda si las copias no comparten exactamente el mismo modo de fallo.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Relacionar regiones, zonas y centros de datos con latencia, disponibilidad y aislamiento de fallos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La infraestructura a gran escala se organiza en dominios de fallo. Replicar recursos solo ayuda si las copias no comparten exactamente el mismo modo de fallo."
        },
        {
          "title": "Mecánica",
          "body": "Distribuir entre ubicaciones reduce ciertos fallos correlacionados, pero aumenta latencia, coste y complejidad de consistencia."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Dos réplicas en el mismo failure domain eliminan ese failure domain como riesgo?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Dos réplicas en el mismo failure domain eliminan ese failure domain como riesgo?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "La infraestructura a gran escala se organiza en dominios de fallo. Replicar recursos solo ayuda si las copias no comparten exactamente el mismo modo de fallo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Dos réplicas en el mismo failure domain eliminan ese failure domain como riesgo?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Data centers.",
        "answer": "data centers",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Data centers: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "cloud-virtualization": {
    "id": "cloud-virtualization",
    "courseId": 73,
    "title": "Virtualización como sustrato cloud",
    "shortTitle": "Virtualization",
    "duration": 120,
    "objective": "Conectar hypervisors, VMs y aislamiento con la abstracción de infraestructura consumible bajo demanda.",
    "summary": [
      "La virtualización desacopla capacidad lógica de hardware físico y permite multiplexar, migrar, provisionar y aislar workloads con diferentes fronteras.",
      "El modelo operativo debe incluir overcommit, noisy neighbors, límites de aislamiento y dependencia del plano de control.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "La virtualización desacopla capacidad lógica de hardware físico y permite multiplexar, migrar, provisionar y aislar workloads con diferentes fronteras.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Conectar hypervisors, VMs y aislamiento con la abstracción de infraestructura consumible bajo demanda.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La virtualización desacopla capacidad lógica de hardware físico y permite multiplexar, migrar, provisionar y aislar workloads con diferentes fronteras."
        },
        {
          "title": "Mecánica",
          "body": "El modelo operativo debe incluir overcommit, noisy neighbors, límites de aislamiento y dependencia del plano de control."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿La virtualización elimina el riesgo de noisy neighbors?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿La virtualización elimina el riesgo de noisy neighbors?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "La virtualización desacopla capacidad lógica de hardware físico y permite multiplexar, migrar, provisionar y aislar workloads con diferentes fronteras."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La virtualización elimina el riesgo de noisy neighbors?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Virtualization.",
        "answer": "virtualization",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Virtualization: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "cloud-containers": {
    "id": "cloud-containers",
    "courseId": 73,
    "title": "Contenedores en infraestructura cloud",
    "shortTitle": "Containers",
    "duration": 120,
    "objective": "Explicar por qué los contenedores facilitan empaquetado y scheduling sin convertirlos en una unidad mágica de disponibilidad.",
    "summary": [
      "Un contenedor empaqueta proceso, filesystem y configuración de ejecución, pero su disponibilidad depende del scheduler, nodos, red, almacenamiento y health model.",
      "Recrear un contenedor es barato; preservar estado, identidad y efectos externos requiere diseños adicionales.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "Un contenedor empaqueta proceso, filesystem y configuración de ejecución, pero su disponibilidad depende del scheduler, nodos, red, almacenamiento y health model.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Explicar por qué los contenedores facilitan empaquetado y scheduling sin convertirlos en una unidad mágica de disponibilidad.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un contenedor empaqueta proceso, filesystem y configuración de ejecución, pero su disponibilidad depende del scheduler, nodos, red, almacenamiento y health model."
        },
        {
          "title": "Mecánica",
          "body": "Recrear un contenedor es barato; preservar estado, identidad y efectos externos requiere diseños adicionales."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Recrear un contenedor garantiza recuperar su estado persistente?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Recrear un contenedor garantiza recuperar su estado persistente?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "Un contenedor empaqueta proceso, filesystem y configuración de ejecución, pero su disponibilidad depende del scheduler, nodos, red, almacenamiento y health model."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Recrear un contenedor garantiza recuperar su estado persistente?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Containers.",
        "answer": "containers",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Containers: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "orchestration": {
    "id": "orchestration",
    "courseId": 73,
    "title": "Orquestación: estado deseado y reconciliación",
    "shortTitle": "Orchestration",
    "duration": 120,
    "objective": "Entender la orquestación como control continuo de estado deseado frente a estado observado.",
    "summary": [
      "Un orquestador no ejecuta solo un deployment inicial: mantiene un bucle de reconciliación, reprograma cargas y coordina identidad, red, configuración y lifecycle.",
      "La automatización amplifica tanto las buenas políticas como los errores; el plano de control también es parte del sistema distribuido.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "Un orquestador no ejecuta solo un deployment inicial: mantiene un bucle de reconciliación, reprograma cargas y coordina identidad, red, configuración y lifecycle.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Entender la orquestación como control continuo de estado deseado frente a estado observado.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un orquestador no ejecuta solo un deployment inicial: mantiene un bucle de reconciliación, reprograma cargas y coordina identidad, red, configuración y lifecycle."
        },
        {
          "title": "Mecánica",
          "body": "La automatización amplifica tanto las buenas políticas como los errores; el plano de control también es parte del sistema distribuido."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Un orquestador se limita a ejecutar el deployment una sola vez?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un orquestador se limita a ejecutar el deployment una sola vez?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "Un orquestador no ejecuta solo un deployment inicial: mantiene un bucle de reconciliación, reprograma cargas y coordina identidad, red, configuración y lifecycle."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un orquestador se limita a ejecutar el deployment una sola vez?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Orchestration.",
        "answer": "orchestration",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Orchestration: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "kubernetes-concepts": {
    "id": "kubernetes-concepts",
    "courseId": 73,
    "title": "Kubernetes conceptualmente",
    "shortTitle": "Kubernetes",
    "duration": 120,
    "objective": "Describir control plane, nodes, Pods, controllers y Services sin reducir Kubernetes a una colección de comandos.",
    "summary": [
      "Kubernetes separa un plano de control que decide y reconcilia de nodos que ejecutan workloads. Los objetos declarativos representan intención; controllers intentan acercar el estado real al deseado.",
      "Kubernetes no elimina la necesidad de diseñar datos, networking, seguridad ni SLOs; automatiza parte de la operación.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "Kubernetes separa un plano de control que decide y reconcilia de nodos que ejecutan workloads. Los objetos declarativos representan intención; controllers intentan acercar el estado real al deseado.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Describir control plane, nodes, Pods, controllers y Services sin reducir Kubernetes a una colección de comandos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Kubernetes separa un plano de control que decide y reconcilia de nodos que ejecutan workloads. Los objetos declarativos representan intención; controllers intentan acercar el estado real al deseado."
        },
        {
          "title": "Mecánica",
          "body": "Kubernetes no elimina la necesidad de diseñar datos, networking, seguridad ni SLOs; automatiza parte de la operación."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Un cluster Kubernetes estándar tiene control plane y uno o más worker nodes?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "sí"
    },
    "check": {
      "question": "¿Un cluster Kubernetes estándar tiene control plane y uno o más worker nodes?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "Kubernetes separa un plano de control que decide y reconcilia de nodos que ejecutan workloads. Los objetos declarativos representan intención; controllers intentan acercar el estado real al deseado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un cluster Kubernetes estándar tiene control plane y uno o más worker nodes?",
        "answer": "sí",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Kubernetes.",
        "answer": "kubernetes",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Kubernetes: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "load-balancers-cloud": {
    "id": "load-balancers-cloud",
    "courseId": 73,
    "title": "Load balancing y health checking",
    "shortTitle": "Load balancers",
    "duration": 120,
    "objective": "Razonar sobre reparto de tráfico, health checks, afinidad y failure domains.",
    "summary": [
      "Un load balancer distribuye tráfico entre targets elegibles y suele retirar targets no saludables según señales configuradas.",
      "Balancear tráfico no replica estado ni garantiza alta disponibilidad si todos los targets dependen del mismo recurso crítico.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "Un load balancer distribuye tráfico entre targets elegibles y suele retirar targets no saludables según señales configuradas.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Razonar sobre reparto de tráfico, health checks, afinidad y failure domains.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un load balancer distribuye tráfico entre targets elegibles y suele retirar targets no saludables según señales configuradas."
        },
        {
          "title": "Mecánica",
          "body": "Balancear tráfico no replica estado ni garantiza alta disponibilidad si todos los targets dependen del mismo recurso crítico."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Un load balancer por sí solo replica el estado de aplicación?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un load balancer por sí solo replica el estado de aplicación?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "Un load balancer distribuye tráfico entre targets elegibles y suele retirar targets no saludables según señales configuradas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un load balancer por sí solo replica el estado de aplicación?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Load balancers.",
        "answer": "load balancers",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Load balancers: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "autoscaling": {
    "id": "autoscaling",
    "courseId": 73,
    "title": "Autoscaling: capacidad frente a demanda",
    "shortTitle": "Autoscaling",
    "duration": 120,
    "objective": "Distinguir escalado horizontal, vertical y de nodos, y diseñar señales estables de autoscaling.",
    "summary": [
      "Autoscaling es un sistema de control: mide una señal, aplica una política y modifica capacidad con retardos y límites.",
      "Una métrica reactiva mal elegida puede oscilar, llegar tarde o amplificar una sobrecarga; debes considerar cold starts, queues, cooldowns y capacidad aguas abajo.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "Autoscaling es un sistema de control: mide una señal, aplica una política y modifica capacidad con retardos y límites.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Distinguir escalado horizontal, vertical y de nodos, y diseñar señales estables de autoscaling.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Autoscaling es un sistema de control: mide una señal, aplica una política y modifica capacidad con retardos y límites."
        },
        {
          "title": "Mecánica",
          "body": "Una métrica reactiva mal elegida puede oscilar, llegar tarde o amplificar una sobrecarga; debes considerar cold starts, queues, cooldowns y capacidad aguas abajo."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Autoscaling puede modelarse como un sistema de control con retardos?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "sí"
    },
    "check": {
      "question": "¿Autoscaling puede modelarse como un sistema de control con retardos?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "Autoscaling es un sistema de control: mide una señal, aplica una política y modifica capacidad con retardos y límites."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Autoscaling puede modelarse como un sistema de control con retardos?",
        "answer": "sí",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Autoscaling.",
        "answer": "autoscaling",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Autoscaling: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "fault-tolerance-cloud": {
    "id": "fault-tolerance-cloud",
    "courseId": 73,
    "title": "Tolerancia a fallos y degradación",
    "shortTitle": "Fault tolerance",
    "duration": 120,
    "objective": "Diseñar redundancia, failover y degradación controlada a partir de failure modes explícitos.",
    "summary": [
      "La tolerancia a fallos requiere detectar, aislar y recuperarse de fallos dentro de objetivos concretos; añadir réplicas no elimina fallos correlacionados.",
      "La arquitectura debe declarar RTO/RPO, dependencias comunes y qué funcionalidad puede degradarse sin perder invariantes críticas.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "La tolerancia a fallos requiere detectar, aislar y recuperarse de fallos dentro de objetivos concretos; añadir réplicas no elimina fallos correlacionados.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Diseñar redundancia, failover y degradación controlada a partir de failure modes explícitos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La tolerancia a fallos requiere detectar, aislar y recuperarse de fallos dentro de objetivos concretos; añadir réplicas no elimina fallos correlacionados."
        },
        {
          "title": "Mecánica",
          "body": "La arquitectura debe declarar RTO/RPO, dependencias comunes y qué funcionalidad puede degradarse sin perder invariantes críticas."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Añadir réplicas elimina automáticamente todos los fallos correlacionados?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Añadir réplicas elimina automáticamente todos los fallos correlacionados?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "La tolerancia a fallos requiere detectar, aislar y recuperarse de fallos dentro de objetivos concretos; añadir réplicas no elimina fallos correlacionados."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Añadir réplicas elimina automáticamente todos los fallos correlacionados?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Fault tolerance.",
        "answer": "fault tolerance",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Fault tolerance: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "observability-cloud": {
    "id": "observability-cloud",
    "courseId": 73,
    "title": "Observabilidad: métricas, logs y traces",
    "shortTitle": "Observability",
    "duration": 120,
    "objective": "Usar telemetría para inferir el estado interno y depurar sistemas distribuidos.",
    "summary": [
      "Observabilidad combina señales como métricas, logs y trazas para responder preguntas nuevas sobre comportamiento y fallos.",
      "Recolectar datos no basta: necesitas cardinalidad controlada, contexto correlacionable, retención, sampling y SLOs que conecten telemetría con experiencia.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "Observabilidad combina señales como métricas, logs y trazas para responder preguntas nuevas sobre comportamiento y fallos.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Usar telemetría para inferir el estado interno y depurar sistemas distribuidos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Observabilidad combina señales como métricas, logs y trazas para responder preguntas nuevas sobre comportamiento y fallos."
        },
        {
          "title": "Mecánica",
          "body": "Recolectar datos no basta: necesitas cardinalidad controlada, contexto correlacionable, retención, sampling y SLOs que conecten telemetría con experiencia."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Logs, métricas y trazas son señales complementarias y no garantías de observabilidad por sí mismas?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "sí"
    },
    "check": {
      "question": "¿Logs, métricas y trazas son señales complementarias y no garantías de observabilidad por sí mismas?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "Observabilidad combina señales como métricas, logs y trazas para responder preguntas nuevas sobre comportamiento y fallos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Logs, métricas y trazas son señales complementarias y no garantías de observabilidad por sí mismas?",
        "answer": "sí",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Observability.",
        "answer": "observability",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Observability: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "distributed-storage-cloud": {
    "id": "distributed-storage-cloud",
    "courseId": 73,
    "title": "Almacenamiento distribuido en cloud",
    "shortTitle": "Distributed storage",
    "duration": 120,
    "objective": "Comparar almacenamiento por bloques, objetos y archivos con replicación, consistencia y durabilidad.",
    "summary": [
      "El almacenamiento distribuido separa datos de una única máquina y replica o codifica información entre nodos/failure domains.",
      "Durabilidad, disponibilidad, consistencia, latencia y coste son dimensiones distintas; una cifra de durabilidad no describe por sí sola semántica de lectura/escritura.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "El almacenamiento distribuido separa datos de una única máquina y replica o codifica información entre nodos/failure domains.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Comparar almacenamiento por bloques, objetos y archivos con replicación, consistencia y durabilidad.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El almacenamiento distribuido separa datos de una única máquina y replica o codifica información entre nodos/failure domains."
        },
        {
          "title": "Mecánica",
          "body": "Durabilidad, disponibilidad, consistencia, latencia y coste son dimensiones distintas; una cifra de durabilidad no describe por sí sola semántica de lectura/escritura."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Durabilidad y consistencia son la misma propiedad?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "sí"
    },
    "check": {
      "question": "¿Durabilidad y consistencia son la misma propiedad?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "El almacenamiento distribuido separa datos de una única máquina y replica o codifica información entre nodos/failure domains."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Durabilidad y consistencia son la misma propiedad?",
        "answer": "sí",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Distributed storage.",
        "answer": "distributed storage",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Distributed storage: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "cloud-networking": {
    "id": "cloud-networking",
    "courseId": 73,
    "title": "Cloud networking",
    "shortTitle": "Cloud networking",
    "duration": 120,
    "objective": "Construir el modelo de redes virtuales, subredes, routing, NAT, firewalls y balanceo sobre redes físicas compartidas.",
    "summary": [
      "Cloud networking crea topologías lógicas sobre infraestructura física mediante direccionamiento, routing, filtrado y encapsulación/virtualización de red.",
      "Una red “privada” no es automáticamente segura; seguridad depende de rutas, identidades, reglas, endpoints y controles de salida/entrada.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "Cloud networking crea topologías lógicas sobre infraestructura física mediante direccionamiento, routing, filtrado y encapsulación/virtualización de red.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Construir el modelo de redes virtuales, subredes, routing, NAT, firewalls y balanceo sobre redes físicas compartidas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Cloud networking crea topologías lógicas sobre infraestructura física mediante direccionamiento, routing, filtrado y encapsulación/virtualización de red."
        },
        {
          "title": "Mecánica",
          "body": "Una red “privada” no es automáticamente segura; seguridad depende de rutas, identidades, reglas, endpoints y controles de salida/entrada."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Que una subred sea privada garantiza por sí sola que el workload sea seguro?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Que una subred sea privada garantiza por sí sola que el workload sea seguro?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "Cloud networking crea topologías lógicas sobre infraestructura física mediante direccionamiento, routing, filtrado y encapsulación/virtualización de red."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Que una subred sea privada garantiza por sí sola que el workload sea seguro?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Cloud networking.",
        "answer": "cloud networking",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Cloud networking: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "capacity-planning": {
    "id": "capacity-planning",
    "courseId": 73,
    "title": "Capacity planning y límites",
    "shortTitle": "Capacity planning",
    "duration": 120,
    "objective": "Convertir demanda esperada y objetivos de servicio en presupuesto de capacidad y headroom.",
    "summary": [
      "Capacity planning combina perfil de carga, límites de recursos, crecimiento, failure scenarios y margen operativo.",
      "Autoscaling no sustituye conocer máximos, cuotas, saturación aguas abajo y tiempo de aprovisionamiento.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "Capacity planning combina perfil de carga, límites de recursos, crecimiento, failure scenarios y margen operativo.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Convertir demanda esperada y objetivos de servicio en presupuesto de capacidad y headroom.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Capacity planning combina perfil de carga, límites de recursos, crecimiento, failure scenarios y margen operativo."
        },
        {
          "title": "Mecánica",
          "body": "Autoscaling no sustituye conocer máximos, cuotas, saturación aguas abajo y tiempo de aprovisionamiento."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Autoscaling elimina la necesidad de conocer cuotas y límites máximos?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Autoscaling elimina la necesidad de conocer cuotas y límites máximos?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "Capacity planning combina perfil de carga, límites de recursos, crecimiento, failure scenarios y margen operativo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Autoscaling elimina la necesidad de conocer cuotas y límites máximos?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Capacity planning.",
        "answer": "capacity planning",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Capacity planning: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "slo-reliability": {
    "id": "slo-reliability",
    "courseId": 73,
    "title": "SLOs, SLIs y error budgets",
    "shortTitle": "SLOs",
    "duration": 120,
    "objective": "Definir fiabilidad desde señales observables y presupuestos de error en vez de aspiraciones vagas.",
    "summary": [
      "Un SLI mide comportamiento observado, un SLO fija un objetivo y el error budget convierte la fiabilidad permitida en margen operativo.",
      "El objetivo no es 100% por defecto: objetivos imposibles pueden bloquear cambios sin producir un sistema realmente más resiliente.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "Un SLI mide comportamiento observado, un SLO fija un objetivo y el error budget convierte la fiabilidad permitida en margen operativo.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Definir fiabilidad desde señales observables y presupuestos de error en vez de aspiraciones vagas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un SLI mide comportamiento observado, un SLO fija un objetivo y el error budget convierte la fiabilidad permitida en margen operativo."
        },
        {
          "title": "Mecánica",
          "body": "El objetivo no es 100% por defecto: objetivos imposibles pueden bloquear cambios sin producir un sistema realmente más resiliente."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Un SLO tiene que ser 100% para ser útil?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un SLO tiene que ser 100% para ser útil?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "Un SLI mide comportamiento observado, un SLO fija un objetivo y el error budget convierte la fiabilidad permitida en margen operativo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un SLO tiene que ser 100% para ser útil?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de SLOs.",
        "answer": "slos",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para SLOs: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "cloud-cost-efficiency": {
    "id": "cloud-cost-efficiency",
    "courseId": 73,
    "title": "Coste y eficiencia a gran escala",
    "shortTitle": "Cost efficiency",
    "duration": 120,
    "objective": "Tratar coste como una propiedad arquitectónica medible junto a rendimiento y fiabilidad.",
    "summary": [
      "En cloud, coste depende de capacidad reservada/consumida, tráfico, almacenamiento, operaciones y ociosidad; optimizar una sola factura puede trasladar coste a otra capa.",
      "La eficiencia exige atribución, presupuestos, unit economics y pruebas de que el ahorro no viola SLOs ni aumenta riesgos desproporcionados.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "En cloud, coste depende de capacidad reservada/consumida, tráfico, almacenamiento, operaciones y ociosidad; optimizar una sola factura puede trasladar coste a otra capa.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Tratar coste como una propiedad arquitectónica medible junto a rendimiento y fiabilidad.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "En cloud, coste depende de capacidad reservada/consumida, tráfico, almacenamiento, operaciones y ociosidad; optimizar una sola factura puede trasladar coste a otra capa."
        },
        {
          "title": "Mecánica",
          "body": "La eficiencia exige atribución, presupuestos, unit economics y pruebas de que el ahorro no viola SLOs ni aumenta riesgos desproporcionados."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Reducir coste de cómputo garantiza reducir el coste total del sistema?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Reducir coste de cómputo garantiza reducir el coste total del sistema?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "En cloud, coste depende de capacidad reservada/consumida, tráfico, almacenamiento, operaciones y ociosidad; optimizar una sola factura puede trasladar coste a otra capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Reducir coste de cómputo garantiza reducir el coste total del sistema?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Cost efficiency.",
        "answer": "cost efficiency",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Cost efficiency: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  },
  "cloud-integration-project": {
    "id": "cloud-integration-project",
    "courseId": 73,
    "title": "Proyecto: servicio cloud resiliente",
    "shortTitle": "Proyecto cloud",
    "duration": 120,
    "objective": "Integrar cómputo, orquestación, red, autoscaling, observabilidad y tolerancia a fallos en un laboratorio reproducible.",
    "summary": [
      "Un proyecto cloud serio demuestra comportamiento bajo carga y fallo, no solo que el despliegue arranca.",
      "La entrega debe incluir arquitectura, hipótesis de fallo, SLOs, pruebas de carga/failover, telemetría, coste aproximado y runbook.",
      "La decisión correcta se formula con workload, failure domain, objetivo medible y evidencia operativa; cloud no convierte límites físicos y distribuidos en abstracciones gratuitas."
    ],
    "concept": "Un proyecto cloud serio demuestra comportamiento bajo carga y fallo, no solo que el despliegue arranca.",
    "rules": [
      "Declara siempre el failure domain y el recurso compartido antes de afirmar alta disponibilidad.",
      "Separa escalabilidad, elasticidad, disponibilidad, durabilidad y consistencia: son propiedades distintas.",
      "Valida con carga, fallos inducidos y telemetría correlacionada; un diagrama o un deployment exitoso no bastan."
    ],
    "deep": {
      "intro": "Integrar cómputo, orquestación, red, autoscaling, observabilidad y tolerancia a fallos en un laboratorio reproducible.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un proyecto cloud serio demuestra comportamiento bajo carga y fallo, no solo que el despliegue arranca."
        },
        {
          "title": "Mecánica",
          "body": "La entrega debe incluir arquitectura, hipótesis de fallo, SLOs, pruebas de carga/failover, telemetría, coste aproximado y runbook."
        },
        {
          "title": "Trade-offs",
          "body": "A gran escala, cada capa introduce colas, límites, timeouts, cuotas y dependencias. Replica o escala solo donde el modelo de fallo y la demanda lo justifiquen; más componentes también crean más estados y modos de fallo."
        },
        {
          "title": "Validación",
          "body": "Define una hipótesis medible, ejecuta carga representativa, provoca un fallo controlado y observa latencia, error rate, saturación, recovery time y estado de dependencias. Conserva configuración, versiones y timestamps para reproducibilidad."
        }
      ]
    },
    "example": {
      "problem": "¿Un proyecto cloud se valida solo porque el deployment arranca?",
      "steps": [
        "Nombra la propiedad exacta que intentas demostrar.",
        "Identifica el mecanismo, el failure domain y una prueba que pueda falsar la afirmación."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un proyecto cloud se valida solo porque el deployment arranca?",
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
          "Depende, pero esa frase no basta para demostrar la propiedad",
          false
        ]
      ],
      "feedback": "Un proyecto cloud serio demuestra comportamiento bajo carga y fallo, no solo que el despliegue arranca."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un proyecto cloud se valida solo porque el deployment arranca?",
        "answer": "no",
        "hint": "Separa la etiqueta del servicio de la garantía arquitectónica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase la idea central de Proyecto cloud.",
        "answer": "proyecto cloud",
        "hint": "Nombra el mecanismo y la propiedad que controla."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña una prueba reproducible para Proyecto cloud: workload, failure domain, métrica y condición de fallo.",
        "answer": "failure domain",
        "alternatives": [
          "dominio de fallo"
        ],
        "hint": "Incluye qué resultado refutaría tu hipótesis."
      }
    ]
  }
});
