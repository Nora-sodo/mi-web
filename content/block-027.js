/**
 * BLOQUE 027 — Malware y forense
 *
 * Contenido pedagógico defensivo. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar indicador, comportamiento, evidencia y atribución.
 * Persistencia/evasión se estudian para detección y respuesta, no como recetas
 * de despliegue. Los ejercicios usan artefactos simulados o autorizados.
 */
window.LEARNING_PATHS[27] = {
  "level": "Experto progresivo",
  "estimatedHours": 112,
  "description": "Análisis defensivo de malware e investigación forense: comportamiento, host, memoria, disco, red, detección, respuesta y evidencia reproducible en laboratorios autorizados.",
  "outcomes": [
    "Modelar malware por comportamientos y artefactos sin confundir indicadores con atribución.",
    "Combinar análisis estático/dinámico, memoria, disco, red y logs en timelines reproducibles.",
    "Construir detecciones YARA/IOC/IOA con tests de cobertura y falsos positivos.",
    "Integrar forense con incident response, preservación de evidencia, contención y recuperación."
  ],
  "modules": [
    {
      "id": "m1-malware",
      "title": "Modelo y análisis de malware",
      "description": "Arquitectura, persistencia, evasión y análisis",
      "lessons": [
        "mal-architecture",
        "mal-persistence-evasion",
        "mal-static-analysis",
        "mal-dynamic-analysis"
      ]
    },
    {
      "id": "m2-forensics",
      "title": "Forense de host y red",
      "description": "Memoria, disco, red y timeline",
      "lessons": [
        "mal-memory-forensics",
        "mal-disk-forensics",
        "mal-network-forensics",
        "mal-logs-timeline"
      ]
    },
    {
      "id": "m3-response-detection",
      "title": "Respuesta y detección",
      "description": "IR, IOC/IOA, YARA y Volatility",
      "lessons": [
        "mal-incident-response",
        "mal-ioc-detection",
        "mal-yara",
        "mal-volatility"
      ]
    },
    {
      "id": "m4-evidence-project",
      "title": "Evidencia e integración",
      "description": "Custodia y proyecto final",
      "lessons": [
        "mal-evidence",
        "mal-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "mal-architecture": {
    "id": "mal-architecture",
    "courseId": 27,
    "title": "Arquitectura de malware y modelo de comportamiento",
    "shortTitle": "Arquitectura de malware y modelo de comportamiento",
    "duration": 100,
    "objective": "descomponer una muestra en capacidades, dependencias, configuración, persistencia, ejecución y comunicaciones sin inferir intención solo por una cadena o API.",
    "summary": [
      "Familia, campaña, muestra y comportamiento son niveles de análisis distintos.",
      "Una capability se documenta por evidencia observable, no por una etiqueta antivirus.",
      "ATT&CK ayuda a describir comportamiento adversario, pero no sustituye el análisis del artefacto."
    ],
    "concept": "Familia, campaña, muestra y comportamiento son niveles de análisis distintos. Una capability se documenta por evidencia observable, no por una etiqueta antivirus.",
    "rules": [
      "Familia, campaña, muestra y comportamiento son niveles de análisis distintos.",
      "Una capability se documenta por evidencia observable, no por una etiqueta antivirus.",
      "ATT&CK ayuda a describir comportamiento adversario, pero no sustituye el análisis del artefacto."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Familia, campaña, muestra y comportamiento son niveles de análisis distintos. Una capability se documenta por evidencia observable, no por una etiqueta antivirus."
        },
        {
          "title": "Análisis experto",
          "body": "ATT&CK ayuda a describir comportamiento adversario, pero no sustituye el análisis del artefacto. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "Un analista encuentra un binario que abre ficheros, crea un proceso hijo y usa red. ¿Puede llamarlo ransomware solo por esas APIs?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. Las APIs son evidencia débil sin contexto; hay que reconstruir data-flow, inputs, efectos y comportamiento observado."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-persistence-evasion": {
    "id": "mal-persistence-evasion",
    "courseId": 27,
    "title": "Persistencia y evasión desde la óptica defensiva",
    "shortTitle": "Persistencia y evasión desde la óptica defensiva",
    "duration": 100,
    "objective": "reconocer categorías de persistencia y defensa evasiva mediante cambios de estado y telemetría, sin convertir técnicas en instrucciones de despliegue.",
    "summary": [
      "Persistencia describe mantener acceso o ejecución a través de interrupciones.",
      "Evasión/stealth describe reducir observabilidad o interferir con controles; no toda ofuscación es maliciosa.",
      "La defensa útil combina baseline, cambios, procedencia y correlación temporal."
    ],
    "concept": "Persistencia describe mantener acceso o ejecución a través de interrupciones. Evasión/stealth describe reducir observabilidad o interferir con controles; no toda ofuscación es maliciosa.",
    "rules": [
      "Persistencia describe mantener acceso o ejecución a través de interrupciones.",
      "Evasión/stealth describe reducir observabilidad o interferir con controles; no toda ofuscación es maliciosa.",
      "La defensa útil combina baseline, cambios, procedencia y correlación temporal."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Persistencia describe mantener acceso o ejecución a través de interrupciones. Evasión/stealth describe reducir observabilidad o interferir con controles; no toda ofuscación es maliciosa."
        },
        {
          "title": "Análisis experto",
          "body": "La defensa útil combina baseline, cambios, procedencia y correlación temporal. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "Aparece una nueva entrada de inicio automático y un binario desconocido. ¿La entrada por sí sola prueba malware?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. Es un indicador de cambio que debe correlacionarse con firma, provenance, usuario, timeline y comportamiento."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-static-analysis": {
    "id": "mal-static-analysis",
    "courseId": 27,
    "title": "Análisis estático de artefactos",
    "shortTitle": "Análisis estático de artefactos",
    "duration": 100,
    "objective": "extraer estructura, metadata, strings, imports y código sin ejecutar la muestra, asignando confianza y evitando conclusiones por indicadores aislados.",
    "summary": [
      "Hash identifica bytes concretos, no comportamiento universal de una familia.",
      "Strings e imports pueden estar ausentes, cifrados o ser señuelos.",
      "El análisis estático debe preservar el artefacto original y trabajar sobre copias verificadas."
    ],
    "concept": "Hash identifica bytes concretos, no comportamiento universal de una familia. Strings e imports pueden estar ausentes, cifrados o ser señuelos.",
    "rules": [
      "Hash identifica bytes concretos, no comportamiento universal de una familia.",
      "Strings e imports pueden estar ausentes, cifrados o ser señuelos.",
      "El análisis estático debe preservar el artefacto original y trabajar sobre copias verificadas."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Hash identifica bytes concretos, no comportamiento universal de una familia. Strings e imports pueden estar ausentes, cifrados o ser señuelos."
        },
        {
          "title": "Análisis experto",
          "body": "El análisis estático debe preservar el artefacto original y trabajar sobre copias verificadas. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "Dos archivos tienen hashes distintos pero comportamiento casi idéntico. ¿Un hash distinto demuestra familias distintas?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. Un cambio mínimo altera un hash criptográfico; hay que comparar estructura y comportamiento."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-dynamic-analysis": {
    "id": "mal-dynamic-analysis",
    "courseId": 27,
    "title": "Análisis dinámico y sandboxing",
    "shortTitle": "Análisis dinámico y sandboxing",
    "duration": 100,
    "objective": "observar procesos, ficheros, registro/configuración, red y memoria en un entorno aislado, entendiendo cobertura, contaminación y límites de la sandbox.",
    "summary": [
      "Ejecutar una muestra cambia el sistema observado: captura baseline y eventos.",
      "Una sandbox aporta evidencia de caminos ejecutados, no cobertura total del programa.",
      "El aislamiento debe evitar credenciales reales, shares sensibles y rutas de salida no controladas."
    ],
    "concept": "Ejecutar una muestra cambia el sistema observado: captura baseline y eventos. Una sandbox aporta evidencia de caminos ejecutados, no cobertura total del programa.",
    "rules": [
      "Ejecutar una muestra cambia el sistema observado: captura baseline y eventos.",
      "Una sandbox aporta evidencia de caminos ejecutados, no cobertura total del programa.",
      "El aislamiento debe evitar credenciales reales, shares sensibles y rutas de salida no controladas."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Ejecutar una muestra cambia el sistema observado: captura baseline y eventos. Una sandbox aporta evidencia de caminos ejecutados, no cobertura total del programa."
        },
        {
          "title": "Análisis experto",
          "body": "El aislamiento debe evitar credenciales reales, shares sensibles y rutas de salida no controladas. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "Una muestra no hace nada en una sandbox de cinco minutos. ¿Eso demuestra benignidad?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. Puede depender de input, tiempo, entorno o caminos no ejecutados; el resultado es ausencia de evidencia en esa ejecución."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-memory-forensics": {
    "id": "mal-memory-forensics",
    "courseId": 27,
    "title": "Memory forensics y estado volátil",
    "shortTitle": "Memory forensics y estado volátil",
    "duration": 100,
    "objective": "reconstruir procesos, mappings, módulos, conexiones y artefactos residentes desde una adquisición de memoria, diferenciando adquisición de interpretación.",
    "summary": [
      "La memoria puede contener estado no persistido en disco.",
      "Una adquisición es una instantánea parcial y temporal, no un replay completo.",
      "Símbolos, capas y contexto del sistema son esenciales para interpretar estructuras."
    ],
    "concept": "La memoria puede contener estado no persistido en disco. Una adquisición es una instantánea parcial y temporal, no un replay completo.",
    "rules": [
      "La memoria puede contener estado no persistido en disco.",
      "Una adquisición es una instantánea parcial y temporal, no un replay completo.",
      "Símbolos, capas y contexto del sistema son esenciales para interpretar estructuras."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La memoria puede contener estado no persistido en disco. Una adquisición es una instantánea parcial y temporal, no un replay completo."
        },
        {
          "title": "Análisis experto",
          "body": "Símbolos, capas y contexto del sistema son esenciales para interpretar estructuras. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "Volatility encuentra un proceso y una región ejecutable anónima. ¿Eso basta para clasificarla como malware?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. Es una pista que requiere correlación con permisos, contenido, ancestry, módulos, handles y otros artefactos."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-disk-forensics": {
    "id": "mal-disk-forensics",
    "courseId": 27,
    "title": "Disk forensics, filesystem y artefactos persistentes",
    "shortTitle": "Disk forensics, filesystem y artefactos persistentes",
    "duration": 100,
    "objective": "analizar imágenes y artefactos de filesystem preservando integridad, tiempos, metadata y semántica del filesystem.",
    "summary": [
      "MACB timestamps tienen semánticas dependientes de filesystem y operación.",
      "Deleted no significa necesariamente recuperable completo.",
      "Una imagen forense debe mantener provenance, hash y registro de transformaciones."
    ],
    "concept": "MACB timestamps tienen semánticas dependientes de filesystem y operación. Deleted no significa necesariamente recuperable completo.",
    "rules": [
      "MACB timestamps tienen semánticas dependientes de filesystem y operación.",
      "Deleted no significa necesariamente recuperable completo.",
      "Una imagen forense debe mantener provenance, hash y registro de transformaciones."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "MACB timestamps tienen semánticas dependientes de filesystem y operación. Deleted no significa necesariamente recuperable completo."
        },
        {
          "title": "Análisis experto",
          "body": "Una imagen forense debe mantener provenance, hash y registro de transformaciones. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "Un fichero tiene mtime anterior al incidente. ¿Eso excluye que se usara durante el incidente?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. Los tiempos pueden no reflejar cada acceso, pueden cambiarse y tienen semánticas diferentes; correlaciona múltiples fuentes."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-network-forensics": {
    "id": "mal-network-forensics",
    "courseId": 27,
    "title": "Network forensics y comunicaciones",
    "shortTitle": "Network forensics y comunicaciones",
    "duration": 100,
    "objective": "analizar flows, DNS, TLS metadata, HTTP y capturas para relacionar endpoints, tiempos y protocolos sin confundir correlación con atribución.",
    "summary": [
      "Una IP puede representar CDN, NAT, VPN, proxy o infraestructura compartida.",
      "Cifrado oculta contenido, no necesariamente toda la metadata.",
      "PCAP y flow logs tienen granularidad y pérdida de información distintas."
    ],
    "concept": "Una IP puede representar CDN, NAT, VPN, proxy o infraestructura compartida. Cifrado oculta contenido, no necesariamente toda la metadata.",
    "rules": [
      "Una IP puede representar CDN, NAT, VPN, proxy o infraestructura compartida.",
      "Cifrado oculta contenido, no necesariamente toda la metadata.",
      "PCAP y flow logs tienen granularidad y pérdida de información distintas."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una IP puede representar CDN, NAT, VPN, proxy o infraestructura compartida. Cifrado oculta contenido, no necesariamente toda la metadata."
        },
        {
          "title": "Análisis experto",
          "body": "PCAP y flow logs tienen granularidad y pérdida de información distintas. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "Una IP aparece en tráfico sospechoso y en un feed de reputación. ¿Eso atribuye el incidente a un actor?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. La infraestructura puede ser compartida o comprometida; reputación es contexto, no identidad probada."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-logs-timeline": {
    "id": "mal-logs-timeline",
    "courseId": 27,
    "title": "Logs, timelines y correlación",
    "shortTitle": "Logs, timelines y correlación",
    "duration": 100,
    "objective": "construir timelines multi-fuente normalizando tiempo, identidad y calidad de evidencia, y reconocer huecos de telemetría.",
    "summary": [
      "Ordenar timestamps no basta: zona horaria, skew y resolución importan.",
      "Ausencia de log puede significar ausencia de evento o ausencia de observación.",
      "Un timeline debe conservar fuente y nivel de confianza por evento."
    ],
    "concept": "Ordenar timestamps no basta: zona horaria, skew y resolución importan. Ausencia de log puede significar ausencia de evento o ausencia de observación.",
    "rules": [
      "Ordenar timestamps no basta: zona horaria, skew y resolución importan.",
      "Ausencia de log puede significar ausencia de evento o ausencia de observación.",
      "Un timeline debe conservar fuente y nivel de confianza por evento."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Ordenar timestamps no basta: zona horaria, skew y resolución importan. Ausencia de log puede significar ausencia de evento o ausencia de observación."
        },
        {
          "title": "Análisis experto",
          "body": "Un timeline debe conservar fuente y nivel de confianza por evento. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "Dos fuentes difieren 90 segundos. ¿Debes forzar sus eventos al mismo timestamp sin documentarlo?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. Estima/explica clock skew y conserva el tiempo original junto a la normalización."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-incident-response": {
    "id": "mal-incident-response",
    "courseId": 27,
    "title": "Incident response: preparación, detección, respuesta y recuperación",
    "shortTitle": "Incident response: preparación, detección, respuesta y recuperación",
    "duration": 100,
    "objective": "integrar análisis forense en gestión del incidente priorizando contención, evidencia, impacto, recuperación y aprendizaje.",
    "summary": [
      "Incident response no empieza cuando llega el malware: preparación y telemetría importan.",
      "Contener rápido y preservar evidencia pueden entrar en tensión; la decisión depende del riesgo.",
      "Recuperar servicio no cierra el incidente: valida causa, persistencia residual y lecciones aprendidas."
    ],
    "concept": "Incident response no empieza cuando llega el malware: preparación y telemetría importan. Contener rápido y preservar evidencia pueden entrar en tensión; la decisión depende del riesgo.",
    "rules": [
      "Incident response no empieza cuando llega el malware: preparación y telemetría importan.",
      "Contener rápido y preservar evidencia pueden entrar en tensión; la decisión depende del riesgo.",
      "Recuperar servicio no cierra el incidente: valida causa, persistencia residual y lecciones aprendidas."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Incident response no empieza cuando llega el malware: preparación y telemetría importan. Contener rápido y preservar evidencia pueden entrar en tensión; la decisión depende del riesgo."
        },
        {
          "title": "Análisis experto",
          "body": "Recuperar servicio no cierra el incidente: valida causa, persistencia residual y lecciones aprendidas. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "Un host crítico está activamente cifrando datos. ¿Debe preservarse toda evidencia antes de contener?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No existe regla universal: primero gestiona el riesgo del incidente; documenta decisiones y preserva lo posible sin permitir daño evitable."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-ioc-detection": {
    "id": "mal-ioc-detection",
    "courseId": 27,
    "title": "IOC, IOA y detección basada en comportamiento",
    "shortTitle": "IOC, IOA y detección basada en comportamiento",
    "duration": 100,
    "objective": "diseñar detecciones entendiendo durabilidad, precisión, cobertura y coste operacional de hashes, dominios, paths y comportamientos.",
    "summary": [
      "IOC puntual puede ser muy preciso y muy frágil.",
      "Behavioral detection suele generalizar mejor, con posible mayor coste/falsos positivos.",
      "Una detección necesita contexto, owner, test corpus y estrategia de actualización."
    ],
    "concept": "IOC puntual puede ser muy preciso y muy frágil. Behavioral detection suele generalizar mejor, con posible mayor coste/falsos positivos.",
    "rules": [
      "IOC puntual puede ser muy preciso y muy frágil.",
      "Behavioral detection suele generalizar mejor, con posible mayor coste/falsos positivos.",
      "Una detección necesita contexto, owner, test corpus y estrategia de actualización."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "IOC puntual puede ser muy preciso y muy frágil. Behavioral detection suele generalizar mejor, con posible mayor coste/falsos positivos."
        },
        {
          "title": "Análisis experto",
          "body": "Una detección necesita contexto, owner, test corpus y estrategia de actualización. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "¿Un SHA-256 conocido es un IOC útil pero normalmente poco generalizable a variantes?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "Sí. Identifica exactamente esos bytes; cambios triviales pueden producir otro hash."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-yara": {
    "id": "mal-yara",
    "courseId": 27,
    "title": "YARA: clasificación reproducible de artefactos",
    "shortTitle": "YARA: clasificación reproducible de artefactos",
    "duration": 100,
    "objective": "escribir reglas YARA defensivas con strings, condiciones y metadata, priorizando rasgos estables y test corpus sobre firmas frágiles.",
    "summary": [
      "YARA describe patrones y lógica; no demuestra por sí sola que un archivo sea malicioso.",
      "Strings demasiado genéricas generan falsos positivos; demasiada especificidad rompe cobertura.",
      "Toda regla debe probarse contra positivos y negativos representativos."
    ],
    "concept": "YARA describe patrones y lógica; no demuestra por sí sola que un archivo sea malicioso. Strings demasiado genéricas generan falsos positivos; demasiada especificidad rompe cobertura.",
    "rules": [
      "YARA describe patrones y lógica; no demuestra por sí sola que un archivo sea malicioso.",
      "Strings demasiado genéricas generan falsos positivos; demasiada especificidad rompe cobertura.",
      "Toda regla debe probarse contra positivos y negativos representativos."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "YARA describe patrones y lógica; no demuestra por sí sola que un archivo sea malicioso. Strings demasiado genéricas generan falsos positivos; demasiada especificidad rompe cobertura."
        },
        {
          "title": "Análisis experto",
          "body": "Toda regla debe probarse contra positivos y negativos representativos. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "Una regla coincide solo porque contiene la cadena “powershell”. ¿Es evidencia suficiente de malware?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. Esa cadena aparece en mucho software legítimo; combina rasgos más discriminativos y contexto estructural."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-volatility": {
    "id": "mal-volatility",
    "courseId": 27,
    "title": "Volatility 3 y análisis de memoria reproducible",
    "shortTitle": "Volatility 3 y análisis de memoria reproducible",
    "duration": 100,
    "objective": "usar el modelo de layers, symbols, objects y plugins de Volatility 3 para formular y comprobar hipótesis sobre memoria adquirida.",
    "summary": [
      "Volatility analiza imágenes adquiridas; no es por sí mismo el mecanismo de adquisición.",
      "El plugin correcto depende de la pregunta, plataforma y contexto.",
      "Un resultado de plugin es evidencia derivada que debe conservar inputs, versión y parámetros."
    ],
    "concept": "Volatility analiza imágenes adquiridas; no es por sí mismo el mecanismo de adquisición. El plugin correcto depende de la pregunta, plataforma y contexto.",
    "rules": [
      "Volatility analiza imágenes adquiridas; no es por sí mismo el mecanismo de adquisición.",
      "El plugin correcto depende de la pregunta, plataforma y contexto.",
      "Un resultado de plugin es evidencia derivada que debe conservar inputs, versión y parámetros."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Volatility analiza imágenes adquiridas; no es por sí mismo el mecanismo de adquisición. El plugin correcto depende de la pregunta, plataforma y contexto."
        },
        {
          "title": "Análisis experto",
          "body": "Un resultado de plugin es evidencia derivada que debe conservar inputs, versión y parámetros. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "¿Que Volatility liste un proceso oculto o anómalo prueba automáticamente intención maliciosa?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. Debe validarse con relaciones, memoria, módulos, handles, red y contexto del sistema."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-evidence": {
    "id": "mal-evidence",
    "courseId": 27,
    "title": "Evidencia, integridad y cadena de custodia",
    "shortTitle": "Evidencia, integridad y cadena de custodia",
    "duration": 100,
    "objective": "preservar artefactos, hashes, tiempos, herramientas, decisiones y transformaciones para que el análisis pueda reproducirse y auditarse.",
    "summary": [
      "Trabaja sobre copias cuando sea posible y conserva originales inmutables.",
      "Hash verifica identidad de bytes entre etapas, no que la adquisición sea conceptualmente completa.",
      "Cadena de custodia documenta quién, cuándo, cómo y por qué manipuló evidencia."
    ],
    "concept": "Trabaja sobre copias cuando sea posible y conserva originales inmutables. Hash verifica identidad de bytes entre etapas, no que la adquisición sea conceptualmente completa.",
    "rules": [
      "Trabaja sobre copias cuando sea posible y conserva originales inmutables.",
      "Hash verifica identidad de bytes entre etapas, no que la adquisición sea conceptualmente completa.",
      "Cadena de custodia documenta quién, cuándo, cómo y por qué manipuló evidencia."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Trabaja sobre copias cuando sea posible y conserva originales inmutables. Hash verifica identidad de bytes entre etapas, no que la adquisición sea conceptualmente completa."
        },
        {
          "title": "Análisis experto",
          "body": "Cadena de custodia documenta quién, cuándo, cómo y por qué manipuló evidencia. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "El hash de una imagen coincide antes y después del análisis. ¿Eso prueba que la adquisición original capturó todo correctamente?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. Prueba integridad de esos bytes entre mediciones, no completitud o corrección del procedimiento de adquisición."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  },
  "mal-project": {
    "id": "mal-project",
    "courseId": 27,
    "title": "Proyecto: investigación defensiva de un incidente simulado",
    "shortTitle": "Proyecto: investigación defensiva de un incidente simulado",
    "duration": 100,
    "objective": "integrar estático, dinámico, memoria, disco, red, logs, YARA y respuesta a incidentes en un caso reproducible y autorizado.",
    "summary": [
      "El proyecto usa muestras inertes, simuladas o artefactos explícitamente autorizados.",
      "Cada conclusión se etiqueta como hecho, inferencia o hipótesis.",
      "El entregable incluye contención, detecciones, remediation y regression tests, no solo indicadores."
    ],
    "concept": "El proyecto usa muestras inertes, simuladas o artefactos explícitamente autorizados. Cada conclusión se etiqueta como hecho, inferencia o hipótesis.",
    "rules": [
      "El proyecto usa muestras inertes, simuladas o artefactos explícitamente autorizados.",
      "Cada conclusión se etiqueta como hecho, inferencia o hipótesis.",
      "El entregable incluye contención, detecciones, remediation y regression tests, no solo indicadores."
    ],
    "deep": {
      "intro": "El análisis defensivo separa observación, inferencia, contexto y acción. La prioridad es producir evidencia reproducible y reducir riesgo sin convertir un indicador aislado en una historia completa.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El proyecto usa muestras inertes, simuladas o artefactos explícitamente autorizados. Cada conclusión se etiqueta como hecho, inferencia o hipótesis."
        },
        {
          "title": "Análisis experto",
          "body": "El entregable incluye contención, detecciones, remediation y regression tests, no solo indicadores. Correlaciona artefactos entre host, red y tiempo; registra provenance, herramientas y límites de cobertura."
        },
        {
          "title": "Límites y validación",
          "body": "Una herramienta o indicador produce evidencia parcial. Valida con una segunda fuente cuando la conclusión afecte contención, atribución o recuperación; documenta falsos positivos y desconocidos."
        }
      ]
    },
    "example": {
      "problem": "El análisis descubre un dominio sospechoso. ¿El proyecto termina al bloquear ese dominio?",
      "steps": [
        "Define exactamente qué observaste y de qué fuente procede.",
        "Formula una hipótesis mínima que explique la evidencia sin asumir intención no demostrada.",
        "Busca una segunda fuente independiente y registra qué conclusión queda respaldada o refutada."
      ],
      "solution": "No. Hay que explicar causa, alcance, persistencia, variantes, recuperación, detección y evidencia que respalda cada conclusión."
    },
    "check": {
      "question": "¿Una única señal o herramienta basta normalmente para demostrar por sí sola toda la historia de un incidente?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No; hace falta contexto y correlación",
          true
        ],
        [
          "Solo si el hash es SHA-256",
          false
        ]
      ],
      "feedback": "El análisis forense es acumulativo: artefactos, contexto, tiempo y fuentes independientes reducen inferencias frágiles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir observación de inferencia en un informe forense? sí/no",
        "answer": "si",
        "hint": "La trazabilidad permite revisar conclusiones."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ausencia de evidencia en una fuente equivale siempre a evidencia de ausencia? sí/no",
        "answer": "no",
        "hint": "Puede existir un hueco de cobertura o retención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Correlacionar host, red y timeline puede aumentar la confianza de una hipótesis? sí/no",
        "answer": "si",
        "hint": "Fuentes independientes reducen ambigüedad."
      }
    ]
  }
});
