/**
 * BLOQUE 070 — SISTEMAS DISTRIBUIDOS
 *
 * Regla editorial: toda garantía se formula respecto a un modelo de fallos, red y observación.
 * Safety, liveness, consistencia y disponibilidad no se usan como sinónimos.
 */
window.LEARNING_PATHS[70] = {
  "level": "Sistemas Distribuidos",
  "estimatedHours": 210,
  "description": "Computadores que cooperan: replicación, particionado, consistencia, CAP, consenso, Raft, relojes, tolerancia a fallos, bases distribuidas y mensajería.",
  "outcomes": [
    "Modelar sistemas donde mensajes pueden retrasarse, perderse y nodos pueden fallar parcialmente.",
    "Distinguir consistencia, disponibilidad, particiones y consenso sin recurrir a slogans incorrectos.",
    "Aplicar Raft, relojes lógicos, elección de líder e idempotencia desde sus invariantes y límites.",
    "Diseñar y probar un servicio distribuido declarando modelo de fallos, garantías y trade-offs."
  ],
  "modules": [
    {
      "id": "m1-foundations",
      "title": "Fundamentos",
      "description": "Modelo, replicación y particionado",
      "lessons": [
        "distributed-systems",
        "replication",
        "partitioning"
      ]
    },
    {
      "id": "m2-contracts",
      "title": "Contratos",
      "description": "Consistencia, disponibilidad y CAP",
      "lessons": [
        "consistency",
        "availability",
        "cap"
      ]
    },
    {
      "id": "m3-consensus",
      "title": "Consenso",
      "description": "Consenso, Raft y elección",
      "lessons": [
        "consensus",
        "raft",
        "leader-election"
      ]
    },
    {
      "id": "m4-time-faults",
      "title": "Tiempo y fallos",
      "description": "Clocks, Lamport y fault tolerance",
      "lessons": [
        "distributed-clocks",
        "lamport-clocks",
        "fault-tolerance"
      ]
    },
    {
      "id": "m5-data-messaging",
      "title": "Datos y mensajería",
      "description": "Bases distribuidas, queues e idempotencia",
      "lessons": [
        "distributed-databases",
        "message-queues",
        "idempotency-delivery"
      ]
    },
    {
      "id": "m6-project",
      "title": "Integración",
      "description": "Proyecto final",
      "lessons": [
        "distributed-integration-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "distributed-systems": {
    "id": "distributed-systems",
    "courseId": 70,
    "title": "Sistemas distribuidos: coordinación sin memoria compartida",
    "shortTitle": "Sistemas distribuidos",
    "duration": 120,
    "objective": "Explicar qué convierte un conjunto de procesos en un sistema distribuido y por qué retrasos y fallos parciales cambian el modelo mental.",
    "summary": [
      "Un sistema distribuido coordina procesos independientes mediante mensajes; no existe un reloj global perfecto ni una observación instantánea del estado completo.",
      "Nodo caído y mensaje retrasado pueden ser indistinguibles desde otro nodo.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Un sistema distribuido coordina procesos independientes mediante mensajes; no existe un reloj global perfecto ni una observación instantánea del estado completo.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Explicar qué convierte un conjunto de procesos en un sistema distribuido y por qué retrasos y fallos parciales cambian el modelo mental.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un sistema distribuido coordina procesos independientes mediante mensajes; no existe un reloj global perfecto ni una observación instantánea del estado completo."
        },
        {
          "title": "Mecánica",
          "body": "Nodo caído y mensaje retrasado pueden ser indistinguibles desde otro nodo. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Puede un nodo distinguir siempre entre otro nodo caído y una red muy lenta?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Puede un nodo distinguir siempre entre otro nodo caído y una red muy lenta?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Un sistema distribuido coordina procesos independientes mediante mensajes; no existe un reloj global perfecto ni una observación instantánea del estado completo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Puede un nodo distinguir siempre entre otro nodo caído y una red muy lenta?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Sistemas distribuidos.",
        "answer": "fallos parciales",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Sistemas distribuidos y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "replication": {
    "id": "replication",
    "courseId": 70,
    "title": "Replicación: copias, quorum y convergencia",
    "shortTitle": "Replicación",
    "duration": 120,
    "objective": "Comparar replicación síncrona/asíncrona y razonar sobre lecturas, escrituras y quorums.",
    "summary": [
      "Replicar mejora tolerancia a fallos y/o lectura, pero introduce coordinación y el riesgo de copias temporalmente divergentes.",
      "Más réplicas no eliminan por sí solas conflictos ni garantizan consistencia fuerte.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Replicar mejora tolerancia a fallos y/o lectura, pero introduce coordinación y el riesgo de copias temporalmente divergentes.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Comparar replicación síncrona/asíncrona y razonar sobre lecturas, escrituras y quorums.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Replicar mejora tolerancia a fallos y/o lectura, pero introduce coordinación y el riesgo de copias temporalmente divergentes."
        },
        {
          "title": "Mecánica",
          "body": "Más réplicas no eliminan por sí solas conflictos ni garantizan consistencia fuerte. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Tres réplicas implican automáticamente consistencia fuerte?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Tres réplicas implican automáticamente consistencia fuerte?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Replicar mejora tolerancia a fallos y/o lectura, pero introduce coordinación y el riesgo de copias temporalmente divergentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Tres réplicas implican automáticamente consistencia fuerte?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Replicación.",
        "answer": "replicacion",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Replicación y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "partitioning": {
    "id": "partitioning",
    "courseId": 70,
    "title": "Particionado: repartir datos y carga",
    "shortTitle": "Particionado",
    "duration": 120,
    "objective": "Diseñar particiones y reconocer hotspots, rebalanceos y consultas cross-partition.",
    "summary": [
      "Particionar divide estado o trabajo entre nodos; la clave de partición determina distribución, localidad y coste de reequilibrio.",
      "Una clave sesgada puede concentrar tráfico aunque haya muchos nodos.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Particionar divide estado o trabajo entre nodos; la clave de partición determina distribución, localidad y coste de reequilibrio.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Diseñar particiones y reconocer hotspots, rebalanceos y consultas cross-partition.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Particionar divide estado o trabajo entre nodos; la clave de partición determina distribución, localidad y coste de reequilibrio."
        },
        {
          "title": "Mecánica",
          "body": "Una clave sesgada puede concentrar tráfico aunque haya muchos nodos. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Un buen número de particiones elimina un hotspot causado por una clave muy sesgada?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un buen número de particiones elimina un hotspot causado por una clave muy sesgada?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Particionar divide estado o trabajo entre nodos; la clave de partición determina distribución, localidad y coste de reequilibrio."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un buen número de particiones elimina un hotspot causado por una clave muy sesgada?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Particionado.",
        "answer": "partitioning",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Particionado y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "consistency": {
    "id": "consistency",
    "courseId": 70,
    "title": "Consistencia: qué puede observar cada cliente",
    "shortTitle": "Consistencia",
    "duration": 120,
    "objective": "Distinguir modelos de consistencia y separar orden de operaciones, visibilidad y garantías por sesión.",
    "summary": [
      "Consistencia es un contrato de observación; linearizability, sequential consistency y eventual consistency no son sinónimos.",
      "Consistencia eventual no define por sí sola cuánto tarda la convergencia ni qué ve un cliente durante conflictos.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Consistencia es un contrato de observación; linearizability, sequential consistency y eventual consistency no son sinónimos.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Distinguir modelos de consistencia y separar orden de operaciones, visibilidad y garantías por sesión.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Consistencia es un contrato de observación; linearizability, sequential consistency y eventual consistency no son sinónimos."
        },
        {
          "title": "Mecánica",
          "body": "Consistencia eventual no define por sí sola cuánto tarda la convergencia ni qué ve un cliente durante conflictos. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Consistencia eventual garantiza un tiempo máximo universal de convergencia?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Consistencia eventual garantiza un tiempo máximo universal de convergencia?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Consistencia es un contrato de observación; linearizability, sequential consistency y eventual consistency no son sinónimos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Consistencia eventual garantiza un tiempo máximo universal de convergencia?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Consistencia.",
        "answer": "consistency",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Consistencia y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "availability": {
    "id": "availability",
    "courseId": 70,
    "title": "Disponibilidad: responder bajo fallos",
    "shortTitle": "Disponibilidad",
    "duration": 120,
    "objective": "Razonar sobre disponibilidad como propiedad del servicio bajo un modelo de fallos concreto.",
    "summary": [
      "Disponibilidad útil exige definir qué peticiones reciben respuesta, en qué plazo y con qué semántica cuando hay fallos.",
      "Responder siempre con un error o dato arbitrario no satisface cualquier definición útil de disponibilidad.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Disponibilidad útil exige definir qué peticiones reciben respuesta, en qué plazo y con qué semántica cuando hay fallos.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Razonar sobre disponibilidad como propiedad del servicio bajo un modelo de fallos concreto.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Disponibilidad útil exige definir qué peticiones reciben respuesta, en qué plazo y con qué semántica cuando hay fallos."
        },
        {
          "title": "Mecánica",
          "body": "Responder siempre con un error o dato arbitrario no satisface cualquier definición útil de disponibilidad. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Disponibilidad significa necesariamente devolver el dato más reciente?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Disponibilidad significa necesariamente devolver el dato más reciente?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Disponibilidad útil exige definir qué peticiones reciben respuesta, en qué plazo y con qué semántica cuando hay fallos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Disponibilidad significa necesariamente devolver el dato más reciente?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Disponibilidad.",
        "answer": "availability",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Disponibilidad y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "cap": {
    "id": "cap",
    "courseId": 70,
    "title": "CAP: particiones, consistencia y disponibilidad",
    "shortTitle": "CAP",
    "duration": 120,
    "objective": "Explicar CAP sin la simplificación incorrecta de “elige dos de tres”.",
    "summary": [
      "Bajo una partición de red, un objeto read/write no puede garantizar simultáneamente consistencia fuerte y disponibilidad para todas las solicitudes.",
      "CAP condiciona el trade-off a la presencia de particiones; no obliga a sacrificar siempre una propiedad durante operación normal.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Bajo una partición de red, un objeto read/write no puede garantizar simultáneamente consistencia fuerte y disponibilidad para todas las solicitudes.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Explicar CAP sin la simplificación incorrecta de “elige dos de tres”.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Bajo una partición de red, un objeto read/write no puede garantizar simultáneamente consistencia fuerte y disponibilidad para todas las solicitudes."
        },
        {
          "title": "Mecánica",
          "body": "CAP condiciona el trade-off a la presencia de particiones; no obliga a sacrificar siempre una propiedad durante operación normal. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿CAP significa que un sistema debe elegir permanentemente solo dos letras de C, A y P?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿CAP significa que un sistema debe elegir permanentemente solo dos letras de C, A y P?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Bajo una partición de red, un objeto read/write no puede garantizar simultáneamente consistencia fuerte y disponibilidad para todas las solicitudes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿CAP significa que un sistema debe elegir permanentemente solo dos letras de C, A y P?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de CAP.",
        "answer": "cap",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba CAP y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "consensus": {
    "id": "consensus",
    "courseId": 70,
    "title": "Consenso: acordar una decisión común",
    "shortTitle": "Consenso",
    "duration": 120,
    "objective": "Explicar qué problema resuelve consenso y distinguir seguridad de vivacidad.",
    "summary": [
      "Consenso busca que participantes no defectuosos acuerden una decisión compatible pese a fallos permitidos por el modelo.",
      "Safety y liveness son ejes distintos: una implementación puede preservar una decisión correcta y dejar de progresar.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Consenso busca que participantes no defectuosos acuerden una decisión compatible pese a fallos permitidos por el modelo.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Explicar qué problema resuelve consenso y distinguir seguridad de vivacidad.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Consenso busca que participantes no defectuosos acuerden una decisión compatible pese a fallos permitidos por el modelo."
        },
        {
          "title": "Mecánica",
          "body": "Safety y liveness son ejes distintos: una implementación puede preservar una decisión correcta y dejar de progresar. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Un protocolo puede preservar safety durante una partición y perder liveness?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "si"
    },
    "check": {
      "question": "¿Un protocolo puede preservar safety durante una partición y perder liveness?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Consenso busca que participantes no defectuosos acuerden una decisión compatible pese a fallos permitidos por el modelo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un protocolo puede preservar safety durante una partición y perder liveness?",
        "answer": "si",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Consenso.",
        "answer": "consensus",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Consenso y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "raft": {
    "id": "raft",
    "courseId": 70,
    "title": "Raft: líder, log replicado y términos",
    "shortTitle": "Raft",
    "duration": 120,
    "objective": "Comprender election, log replication y commit en Raft sin reducirlo a “un líder copia datos”.",
    "summary": [
      "Raft organiza consenso alrededor de términos, elección de líder y un log replicado que alimenta máquinas de estado.",
      "Una entrada recibida por una réplica no está necesariamente committed; el commit depende de las reglas de mayoría y del término.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Raft organiza consenso alrededor de términos, elección de líder y un log replicado que alimenta máquinas de estado.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Comprender election, log replication y commit en Raft sin reducirlo a “un líder copia datos”.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Raft organiza consenso alrededor de términos, elección de líder y un log replicado que alimenta máquinas de estado."
        },
        {
          "title": "Mecánica",
          "body": "Una entrada recibida por una réplica no está necesariamente committed; el commit depende de las reglas de mayoría y del término. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Recibir una entrada en un follower significa que ya está committed?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Recibir una entrada en un follower significa que ya está committed?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Raft organiza consenso alrededor de términos, elección de líder y un log replicado que alimenta máquinas de estado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Recibir una entrada en un follower significa que ya está committed?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Raft.",
        "answer": "raft",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Raft y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "distributed-clocks": {
    "id": "distributed-clocks",
    "courseId": 70,
    "title": "Relojes distribuidos: tiempo físico y orden lógico",
    "shortTitle": "Relojes distribuidos",
    "duration": 120,
    "objective": "Separar reloj físico, sincronización, drift y relojes lógicos.",
    "summary": [
      "Los relojes físicos tienen error y deriva; muchos algoritmos necesitan ordenar eventos sin asumir timestamps físicos perfectamente comparables.",
      "NTP/PTP reducen error, no crean un reloj global matemáticamente perfecto.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Los relojes físicos tienen error y deriva; muchos algoritmos necesitan ordenar eventos sin asumir timestamps físicos perfectamente comparables.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Separar reloj físico, sincronización, drift y relojes lógicos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Los relojes físicos tienen error y deriva; muchos algoritmos necesitan ordenar eventos sin asumir timestamps físicos perfectamente comparables."
        },
        {
          "title": "Mecánica",
          "body": "NTP/PTP reducen error, no crean un reloj global matemáticamente perfecto. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Sincronizar relojes físicos elimina completamente skew y drift?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Sincronizar relojes físicos elimina completamente skew y drift?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Los relojes físicos tienen error y deriva; muchos algoritmos necesitan ordenar eventos sin asumir timestamps físicos perfectamente comparables."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Sincronizar relojes físicos elimina completamente skew y drift?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Relojes distribuidos.",
        "answer": "clocks",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Relojes distribuidos y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "lamport-clocks": {
    "id": "lamport-clocks",
    "courseId": 70,
    "title": "Relojes de Lamport: happens-before",
    "shortTitle": "Lamport",
    "duration": 120,
    "objective": "Aplicar happens-before y timestamps de Lamport correctamente.",
    "summary": [
      "Si a→b, entonces L(a)<L(b); la implicación inversa no vale en general.",
      "Dos eventos concurrentes pueden recibir timestamps distintos y un orden total artificial sin que uno haya causado al otro.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Si a→b, entonces L(a)<L(b); la implicación inversa no vale en general.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Aplicar happens-before y timestamps de Lamport correctamente.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Si a→b, entonces L(a)<L(b); la implicación inversa no vale en general."
        },
        {
          "title": "Mecánica",
          "body": "Dos eventos concurrentes pueden recibir timestamps distintos y un orden total artificial sin que uno haya causado al otro. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "Si L(a)<L(b), ¿se deduce siempre que a ocurrió causalmente antes que b?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "Si L(a)<L(b), ¿se deduce siempre que a ocurrió causalmente antes que b?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Si a→b, entonces L(a)<L(b); la implicación inversa no vale en general."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si L(a)<L(b), ¿se deduce siempre que a ocurrió causalmente antes que b?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Lamport.",
        "answer": "lamport",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Lamport y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "fault-tolerance": {
    "id": "fault-tolerance",
    "courseId": 70,
    "title": "Tolerancia a fallos: detectar, aislar y recuperar",
    "shortTitle": "Fault tolerance",
    "duration": 120,
    "objective": "Diseñar mecanismos de tolerancia a fallos desde un modelo explícito.",
    "summary": [
      "Timeouts, retries, redundancy, checkpoints y failover responden a fallos distintos y pueden interactuar de forma peligrosa.",
      "Retries sin idempotencia pueden duplicar efectos; timeouts son sospechas, no pruebas perfectas de fallo.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Timeouts, retries, redundancy, checkpoints y failover responden a fallos distintos y pueden interactuar de forma peligrosa.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Diseñar mecanismos de tolerancia a fallos desde un modelo explícito.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Timeouts, retries, redundancy, checkpoints y failover responden a fallos distintos y pueden interactuar de forma peligrosa."
        },
        {
          "title": "Mecánica",
          "body": "Retries sin idempotencia pueden duplicar efectos; timeouts son sospechas, no pruebas perfectas de fallo. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Un timeout demuestra con certeza que el servidor está caído?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un timeout demuestra con certeza que el servidor está caído?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Timeouts, retries, redundancy, checkpoints y failover responden a fallos distintos y pueden interactuar de forma peligrosa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un timeout demuestra con certeza que el servidor está caído?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Fault tolerance.",
        "answer": "fault tolerance",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Fault tolerance y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "leader-election": {
    "id": "leader-election",
    "courseId": 70,
    "title": "Elección de líder: autoridad y fencing",
    "shortTitle": "Leader election",
    "duration": 120,
    "objective": "Explicar elección de líder, leases/epochs y split-brain.",
    "summary": [
      "Elegir un líder no basta: los participantes deben rechazar líderes obsoletos mediante términos, epochs o fencing tokens.",
      "Dos nodos que se creen líderes pueden corromper estado si el recurso compartido no valida autoridad vigente.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Elegir un líder no basta: los participantes deben rechazar líderes obsoletos mediante términos, epochs o fencing tokens.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Explicar elección de líder, leases/epochs y split-brain.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Elegir un líder no basta: los participantes deben rechazar líderes obsoletos mediante términos, epochs o fencing tokens."
        },
        {
          "title": "Mecánica",
          "body": "Dos nodos que se creen líderes pueden corromper estado si el recurso compartido no valida autoridad vigente. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Elegir un líder una vez evita por sí solo todo split-brain futuro?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Elegir un líder una vez evita por sí solo todo split-brain futuro?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Elegir un líder no basta: los participantes deben rechazar líderes obsoletos mediante términos, epochs o fencing tokens."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Elegir un líder una vez evita por sí solo todo split-brain futuro?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Leader election.",
        "answer": "leader election",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Leader election y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "distributed-databases": {
    "id": "distributed-databases",
    "courseId": 70,
    "title": "Bases de datos distribuidas: estado, transacciones y replicas",
    "shortTitle": "BD distribuidas",
    "duration": 120,
    "objective": "Relacionar particionado, replicación, transacciones y modelos de consistencia.",
    "summary": [
      "Una base distribuida combina placement de datos, replicación, control de concurrencia y recuperación; cada capa añade garantías y costes.",
      "“NoSQL” no implica ausencia de transacciones ni consistencia eventual obligatoria.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "Una base distribuida combina placement de datos, replicación, control de concurrencia y recuperación; cada capa añade garantías y costes.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Relacionar particionado, replicación, transacciones y modelos de consistencia.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una base distribuida combina placement de datos, replicación, control de concurrencia y recuperación; cada capa añade garantías y costes."
        },
        {
          "title": "Mecánica",
          "body": "“NoSQL” no implica ausencia de transacciones ni consistencia eventual obligatoria. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Toda base NoSQL es necesariamente eventually consistent?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Toda base NoSQL es necesariamente eventually consistent?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "Una base distribuida combina placement de datos, replicación, control de concurrencia y recuperación; cada capa añade garantías y costes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Toda base NoSQL es necesariamente eventually consistent?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de BD distribuidas.",
        "answer": "distributed database",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba BD distribuidas y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "message-queues": {
    "id": "message-queues",
    "courseId": 70,
    "title": "Colas y logs: mensajería, orden y entrega",
    "shortTitle": "Message queues",
    "duration": 120,
    "objective": "Distinguir cola, log particionado y semánticas de entrega.",
    "summary": [
      "La mensajería desacopla productores y consumidores; orden, retención, ack y redelivery dependen del sistema y de la partición.",
      "At-least-once permite duplicados; exactamente una vez extremo a extremo requiere coordinar efectos, no solo un broker.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "La mensajería desacopla productores y consumidores; orden, retención, ack y redelivery dependen del sistema y de la partición.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Distinguir cola, log particionado y semánticas de entrega.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La mensajería desacopla productores y consumidores; orden, retención, ack y redelivery dependen del sistema y de la partición."
        },
        {
          "title": "Mecánica",
          "body": "At-least-once permite duplicados; exactamente una vez extremo a extremo requiere coordinar efectos, no solo un broker. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿At-least-once permite que un mensaje se procese más de una vez?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "si"
    },
    "check": {
      "question": "¿At-least-once permite que un mensaje se procese más de una vez?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "La mensajería desacopla productores y consumidores; orden, retención, ack y redelivery dependen del sistema y de la partición."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿At-least-once permite que un mensaje se procese más de una vez?",
        "answer": "si",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Message queues.",
        "answer": "message queues",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Message queues y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "idempotency-delivery": {
    "id": "idempotency-delivery",
    "courseId": 70,
    "title": "Idempotencia y entrega efectiva",
    "shortTitle": "Idempotencia",
    "duration": 120,
    "objective": "Diseñar consumidores seguros ante retries y duplicados.",
    "summary": [
      "La idempotencia permite repetir una operación sin multiplicar su efecto lógico; claves de deduplicación y transacciones ayudan a implementarla.",
      "Exactly-once suele ser una propiedad delimitada por un sistema/protocolo concreto, no magia global entre servicios arbitrarios.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "La idempotencia permite repetir una operación sin multiplicar su efecto lógico; claves de deduplicación y transacciones ayudan a implementarla.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Diseñar consumidores seguros ante retries y duplicados.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La idempotencia permite repetir una operación sin multiplicar su efecto lógico; claves de deduplicación y transacciones ayudan a implementarla."
        },
        {
          "title": "Mecánica",
          "body": "Exactly-once suele ser una propiedad delimitada por un sistema/protocolo concreto, no magia global entre servicios arbitrarios. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Un productor con retry puede requerir deduplicación en el consumidor?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "si"
    },
    "check": {
      "question": "¿Un productor con retry puede requerir deduplicación en el consumidor?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "La idempotencia permite repetir una operación sin multiplicar su efecto lógico; claves de deduplicación y transacciones ayudan a implementarla."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un productor con retry puede requerir deduplicación en el consumidor?",
        "answer": "si",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Idempotencia.",
        "answer": "idempotencia",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Idempotencia y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  },
  "distributed-integration-project": {
    "id": "distributed-integration-project",
    "courseId": 70,
    "title": "Proyecto: servicio distribuido observable y tolerante a fallos",
    "shortTitle": "Proyecto distribuido",
    "duration": 120,
    "objective": "Integrar replicación, fallos, clocks, consenso/mensajería y observabilidad en un prototipo justificable.",
    "summary": [
      "El proyecto debe declarar modelo de fallos, invariantes, garantías y experimentos de partición/reinicio antes de hablar de resiliencia.",
      "Una demo feliz sin inyección de fallos no valida tolerancia a fallos.",
      "El diseño debe declarar su modelo de fallos, la garantía prometida y qué observación permitiría refutarla."
    ],
    "concept": "El proyecto debe declarar modelo de fallos, invariantes, garantías y experimentos de partición/reinicio antes de hablar de resiliencia.",
    "rules": [
      "Declara el modelo de fallos y de red antes de afirmar una garantía.",
      "Separa safety de liveness y estado confirmado de estado meramente observado.",
      "Prueba con retrasos, duplicados, reordenamiento, particiones y reinicios; una ejecución feliz no basta."
    ],
    "deep": {
      "intro": "Integrar replicación, fallos, clocks, consenso/mensajería y observabilidad en un prototipo justificable.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El proyecto debe declarar modelo de fallos, invariantes, garantías y experimentos de partición/reinicio antes de hablar de resiliencia."
        },
        {
          "title": "Mecánica",
          "body": "Una demo feliz sin inyección de fallos no valida tolerancia a fallos. Razona siempre desde mensajes, estados locales, orden observable y fallos permitidos."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Evita inferir una propiedad global a partir de una observación local. En sistemas distribuidos, retraso, duplicación, reordenamiento y fallos parciales rompen intuiciones válidas en un proceso único."
        },
        {
          "title": "Validación",
          "body": "Formula un invariante concreto, crea una ejecución adversarial que intente romperlo y registra qué nodos, mensajes y estados participan. Si solo validas el camino feliz, la evidencia es insuficiente."
        }
      ]
    },
    "example": {
      "problem": "¿Una demo sin fallos basta para demostrar tolerancia a fallos?",
      "steps": [
        "Identifica qué garantía se afirma y bajo qué modelo de fallos.",
        "Busca un contraejemplo con retraso, partición, retry o concurrencia antes de aceptar una conclusión universal."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una demo sin fallos basta para demostrar tolerancia a fallos?",
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
          "No puede saberse sin ejecutar siempre",
          false
        ]
      ],
      "feedback": "El proyecto debe declarar modelo de fallos, invariantes, garantías y experimentos de partición/reinicio antes de hablar de resiliencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una demo sin fallos basta para demostrar tolerancia a fallos?",
        "answer": "no",
        "hint": "Distingue observación local de garantía global."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica en una frase el principal trade-off de Proyecto distribuido.",
        "answer": "proyecto",
        "hint": "Nombra la propiedad central, no una herramienta concreta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un fallo adversarial que ponga a prueba Proyecto distribuido y nombra el invariante que debería sobrevivir.",
        "answer": "invariante",
        "hint": "Usa partición, retraso, duplicado, reordenamiento o reinicio."
      }
    ]
  }
});
