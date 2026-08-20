/**
 * BLOQUE 044 — Networking de videojuegos
 *
 * Regla editorial: separar autoridad, simulación, transporte y presentación.
 * La red entrega información con latencia/jitter/pérdida; prediction, interpolation
 * y rollback son políticas distintas para convivir con esas restricciones.
 */
window.LEARNING_PATHS[44] = {
  "level": "Experto progresivo",
  "estimatedHours": 132,
  "description": "Netcode de videojuegos: topologías, tick/snapshots, replicación, prediction/reconciliation, lag compensation, rollback, determinismo, fiabilidad, ancho de banda y observabilidad.",
  "outcomes": [
    "Diseñar una arquitectura client/server o híbrida con autoridad y semántica temporal explícitas.",
    "Implementar snapshot interpolation, client prediction y reconciliation sin confundir presentación con estado autoritativo.",
    "Razonar sobre lag compensation, rollback y determinismo mediante historiales, ticks y resimulación.",
    "Presupuestar ancho de banda, relevancia y métricas bajo RTT, jitter, pérdida y reordering reproducibles."
  ],
  "modules": [
    {
      "id": "m1-model",
      "title": "Arquitectura y tiempo",
      "description": "Arquitectura y tiempo",
      "lessons": [
        "netgame-architectures",
        "netgame-tick-rate",
        "netgame-state-replication",
        "netgame-snapshot-interpolation"
      ]
    },
    {
      "id": "m2-local",
      "title": "Respuesta local y corrección",
      "description": "Respuesta local y corrección",
      "lessons": [
        "netgame-client-prediction",
        "netgame-reconciliation",
        "netgame-lag-compensation",
        "netgame-rollback"
      ]
    },
    {
      "id": "m3-protocol",
      "title": "Determinismo y protocolo",
      "description": "Determinismo y protocolo",
      "lessons": [
        "netgame-determinism",
        "netgame-input-delay",
        "netgame-reliability-ordering",
        "netgame-bandwidth-serialization"
      ]
    },
    {
      "id": "m4-scale",
      "title": "Escalado y producción",
      "description": "Escalado y producción",
      "lessons": [
        "netgame-interest-management",
        "netgame-security-observability",
        "netgame-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "netgame-architectures": {
  "id": "netgame-architectures",
  "courseId": 44,
  "title": "Arquitecturas client/server y P2P",
  "shortTitle": "Arquitecturas client/server y P2P",
  "duration": 115,
  "objective": "Separar autoridad, topología y transporte en un juego multijugador.",
  "summary": [
    "Client/server centraliza autoridad o coordinación en uno o más servidores; P2P distribuye comunicación/autoridad entre peers y cambia NAT, confianza y escalado.",
    "Servidor autoritativo puede validar reglas y simplificar consistencia, a costa de infraestructura y RTT hacia el servidor.",
    "La pregunta clave no es solo quién envía datos, sino quién decide el estado válido."
  ],
  "concept": "Client/server centraliza autoridad o coordinación en uno o más servidores; P2P distribuye comunicación/autoridad entre peers y cambia NAT, confianza y escalado.",
  "rules": [
    "Topología no determina por sí sola el protocolo de transporte.",
    "Autoridad y relay son decisiones distintas.",
    "Diseña amenazas y coste operativo junto con latencia."
  ],
  "deep": {
    "intro": "Separar autoridad, topología y transporte en un juego multijugador.",
    "sections": [
      {
        "title": "Client/server",
        "body": "Servidor autoritativo puede validar reglas y simplificar consistencia, a costa de infraestructura y RTT hacia el servidor."
      },
      {
        "title": "P2P",
        "body": "P2P puede reducir infraestructura, pero NAT traversal, cheating, host migration y conectividad son problemas adicionales."
      },
      {
        "title": "Híbridos",
        "body": "Relay, listen server, dedicated server y servicios backend pueden combinarse."
      },
      {
        "title": "Autoridad",
        "body": "La pregunta clave no es solo quién envía datos, sino quién decide el estado válido."
      }
    ]
  },
  "example": {
    "problem": "100 jugadores envían 20 inputs/s de 20 bytes a servidor. Tráfico de subida agregado sin headers.",
    "steps": [
      "100·20·20 = 40000 B/s"
    ],
    "solution": "40000"
  },
  "check": {
    "question": "¿P2P elimina automáticamente la necesidad de autoridad?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "La topología no resuelve confianza."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Arquitecturas client/server y P2P» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Arquitecturas client/server y P2P» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Arquitecturas client/server y P2P» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-tick-rate": {
  "id": "netgame-tick-rate",
  "courseId": 44,
  "title": "Tick rate, frame rate y relojes de red",
  "shortTitle": "Tick rate, frame rate y relojes de red",
  "duration": 115,
  "objective": "Distinguir simulation tick, render frame y cadencia de snapshots/packets.",
  "summary": [
    "El tick rate fija la frecuencia de simulación autoritativa; render y networking pueden operar a frecuencias diferentes.",
    "Render, simulación y red pueden tener cadencias distintas.",
    "Tick IDs permiten reconciliation, replays y detección de inputs ya procesados."
  ],
  "concept": "El tick rate fija la frecuencia de simulación autoritativa; render y networking pueden operar a frecuencias diferentes.",
  "rules": [
    "No derives tick rate de FPS.",
    "Presupuesta CPU y ancho de banda por tick.",
    "Etiqueta mensajes con tiempo/tick cuando su semántica dependa de ello."
  ],
  "deep": {
    "intro": "Distinguir simulation tick, render frame y cadencia de snapshots/packets.",
    "sections": [
      {
        "title": "Tres relojes",
        "body": "Render, simulación y red pueden tener cadencias distintas."
      },
      {
        "title": "Coste",
        "body": "Duplicar tick rate puede aumentar CPU y tráfico si no cambia otra cosa."
      },
      {
        "title": "Jitter",
        "body": "Llegada de paquetes no coincide con ticks exactos; se bufferiza/reordena."
      },
      {
        "title": "Identidad temporal",
        "body": "Tick IDs permiten reconciliation, replays y detección de inputs ya procesados."
      }
    ]
  },
  "example": {
    "problem": "Servidor a 60 Hz. Duración ideal de tick.",
    "steps": [
      "1000/60 ≈ 16.667 ms"
    ],
    "solution": "16.667"
  },
  "check": {
    "question": "¿60 FPS implica que el servidor simula a 60 Hz?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Son relojes distintos."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Tick rate, frame rate y relojes de red» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Tick rate, frame rate y relojes de red» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Tick rate, frame rate y relojes de red» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-state-replication": {
  "id": "netgame-state-replication",
  "courseId": 44,
  "title": "Replicación de estado, deltas y relevancia",
  "shortTitle": "Replicación de estado, deltas y relevancia",
  "duration": 115,
  "objective": "Diseñar qué estado replicar, a quién y con qué frecuencia.",
  "summary": [
    "Replicar estado significa transmitir una representación suficiente del mundo remoto; no implica copiar toda la memoria del servidor.",
    "Un snapshot puede contener posiciones, orientaciones, estados y IDs estables.",
    "Reducir precisión puede ahorrar ancho de banda a cambio de error medible."
  ],
  "concept": "Replicar estado significa transmitir una representación suficiente del mundo remoto; no implica copiar toda la memoria del servidor.",
  "rules": [
    "Replica semántica, no punteros ni layouts internos.",
    "Usa relevancia/interest management para escalar.",
    "Deltas requieren una base conocida y manejo de pérdida/desfase."
  ],
  "deep": {
    "intro": "Diseñar qué estado replicar, a quién y con qué frecuencia.",
    "sections": [
      {
        "title": "Snapshots",
        "body": "Un snapshot puede contener posiciones, orientaciones, estados y IDs estables."
      },
      {
        "title": "Deltas",
        "body": "Enviar cambios respecto a una base reduce bytes, pero exige conocer la base correcta."
      },
      {
        "title": "Relevancia",
        "body": "No todos los clientes necesitan todos los objetos."
      },
      {
        "title": "Cuantización",
        "body": "Reducir precisión puede ahorrar ancho de banda a cambio de error medible."
      }
    ]
  },
  "example": {
    "problem": "Snapshot completo 20 KiB; delta medio 5 KiB. Ahorro porcentual.",
    "steps": [
      "(20-5)/20·100 = 75%"
    ],
    "solution": "75%"
  },
  "check": {
    "question": "¿Replicación de estado significa memcpy del world del servidor?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "La representación de red debe ser estable y explícita."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Replicación de estado, deltas y relevancia» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Replicación de estado, deltas y relevancia» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Replicación de estado, deltas y relevancia» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-snapshot-interpolation": {
  "id": "netgame-snapshot-interpolation",
  "courseId": 44,
  "title": "Snapshot interpolation y jitter buffer",
  "shortTitle": "Snapshot interpolation y jitter buffer",
  "duration": 115,
  "objective": "Suavizar estados remotos deliberadamente retrasando la presentación.",
  "summary": [
    "Snapshot interpolation renderiza entre snapshots recibidos usando un pequeño retraso para absorber jitter; añade latencia de presentación intencionadamente.",
    "El cliente conserva snapshots ordenados por server time/tick.",
    "Si falta el futuro conocido, extrapolar es una política distinta y más arriesgada."
  ],
  "concept": "Snapshot interpolation renderiza entre snapshots recibidos usando un pequeño retraso para absorber jitter; añade latencia de presentación intencionadamente.",
  "rules": [
    "Interpolate between known samples; do not call interpolation prediction.",
    "Buffer insuficiente causa extrapolación/stutter.",
    "Más delay suaviza jitter pero aumenta latencia visual."
  ],
  "deep": {
    "intro": "Suavizar estados remotos deliberadamente retrasando la presentación.",
    "sections": [
      {
        "title": "Buffer",
        "body": "El cliente conserva snapshots ordenados por server time/tick."
      },
      {
        "title": "Interpolación",
        "body": "Se eligen dos estados que rodean el tiempo de render remoto."
      },
      {
        "title": "Jitter",
        "body": "El buffer desacopla arrival time de presentation time."
      },
      {
        "title": "Extrapolación",
        "body": "Si falta el futuro conocido, extrapolar es una política distinta y más arriesgada."
      }
    ]
  },
  "example": {
    "problem": "Snapshots a 20 Hz. Separación nominal.",
    "steps": [
      "1/20 = 0.05 s = 50 ms"
    ],
    "solution": "50 ms"
  },
  "check": {
    "question": "¿Snapshot interpolation muestra necesariamente el estado remoto más reciente recibido?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Normalmente renderiza algo retrasado."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Snapshot interpolation y jitter buffer» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Snapshot interpolation y jitter buffer» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Snapshot interpolation y jitter buffer» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-client-prediction": {
  "id": "netgame-client-prediction",
  "courseId": 44,
  "title": "Client-side prediction",
  "shortTitle": "Client-side prediction",
  "duration": 115,
  "objective": "Reducir latencia aparente aplicando localmente inputs antes de confirmación.",
  "summary": [
    "La predicción local ejecuta una aproximación de la simulación del jugador antes de recibir la respuesta autoritativa.",
    "Esperar RTT completo para mover el avatar local se siente lento.",
    "Dependencias secretas del servidor o física divergente aumentan error."
  ],
  "concept": "La predicción local ejecuta una aproximación de la simulación del jugador antes de recibir la respuesta autoritativa.",
  "rules": [
    "Predicción no cambia la autoridad.",
    "Guarda inputs pendientes con IDs/ticks.",
    "La simulación cliente-servidor debe ser suficientemente compatible para evitar correcciones constantes."
  ],
  "deep": {
    "intro": "Reducir latencia aparente aplicando localmente inputs antes de confirmación.",
    "sections": [
      {
        "title": "Latencia",
        "body": "Esperar RTT completo para mover el avatar local se siente lento."
      },
      {
        "title": "Predicción",
        "body": "El cliente aplica input inmediatamente y luego compara con servidor."
      },
      {
        "title": "Historia",
        "body": "Inputs no confirmados deben poder reaplicarse."
      },
      {
        "title": "Límites",
        "body": "Dependencias secretas del servidor o física divergente aumentan error."
      }
    ]
  },
  "example": {
    "problem": "RTT=100 ms. Sin predicción, orden local podría esperar aproximadamente cuánto para confirmación ida/vuelta.",
    "steps": [
      "100 ms"
    ],
    "solution": "100 ms"
  },
  "check": {
    "question": "¿Client prediction convierte al cliente en autoridad?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Solo adelanta una estimación local."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Client-side prediction» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Client-side prediction» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Client-side prediction» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-reconciliation": {
  "id": "netgame-reconciliation",
  "courseId": 44,
  "title": "Server reconciliation",
  "shortTitle": "Server reconciliation",
  "duration": 115,
  "objective": "Corregir predicciones usando estado autoritativo y reejecución de inputs pendientes.",
  "summary": [
    "Reconciliation toma el estado confirmado del servidor, descarta inputs ya reconocidos y reaplica los posteriores.",
    "Servidor comunica hasta qué input/tick incorporó.",
    "La pose visual puede suavizar una corrección sin falsificar el estado lógico."
  ],
  "concept": "Reconciliation toma el estado confirmado del servidor, descarta inputs ya reconocidos y reaplica los posteriores.",
  "rules": [
    "Usa acknowledgements/tick IDs para saber qué input confirmó el servidor.",
    "No sumes la corrección encima del estado ya predicho sin reconstruir coherentemente.",
    "Separa corrección lógica de suavizado visual."
  ],
  "deep": {
    "intro": "Corregir predicciones usando estado autoritativo y reejecución de inputs pendientes.",
    "sections": [
      {
        "title": "ACK",
        "body": "Servidor comunica hasta qué input/tick incorporó."
      },
      {
        "title": "Rebase",
        "body": "Cliente restaura estado autoritativo correspondiente."
      },
      {
        "title": "Replay",
        "body": "Reaplica inputs más nuevos en orden."
      },
      {
        "title": "Presentación",
        "body": "La pose visual puede suavizar una corrección sin falsificar el estado lógico."
      }
    ]
  },
  "example": {
    "problem": "Inputs pendientes IDs 101..108; servidor ACK 104. ¿Cuántos reaplicar?",
    "steps": [
      "4"
    ],
    "solution": "4"
  },
  "check": {
    "question": "¿Reconciliation suele reaplicar inputs posteriores al último ACK?",
    "options": [
      [
        "si",
        true
      ],
      [
        "no",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Ese es el mecanismo básico."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Server reconciliation» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Server reconciliation» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Server reconciliation» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-lag-compensation": {
  "id": "netgame-lag-compensation",
  "courseId": 44,
  "title": "Lag compensation y rewinding",
  "shortTitle": "Lag compensation y rewinding",
  "duration": 115,
  "objective": "Evaluar acciones contra una reconstrucción temporal coherente del mundo.",
  "summary": [
    "Lag compensation puede rebobinar estados históricos para juzgar una acción según el tiempo percibido por el cliente, bajo límites de confianza y política.",
    "Servidor puede consultar posiciones históricas al validar un disparo.",
    "Favorecer al tirador puede perjudicar al objetivo que ya estaba detrás de cobertura en tiempo actual."
  ],
  "concept": "Lag compensation puede rebobinar estados históricos para juzgar una acción según el tiempo percibido por el cliente, bajo límites de confianza y política.",
  "rules": [
    "Rewind no significa aceptar cualquier timestamp del cliente.",
    "Guarda historia suficiente y acotada.",
    "Define explícitamente a quién favorece la política de latencia."
  ],
  "deep": {
    "intro": "Evaluar acciones contra una reconstrucción temporal coherente del mundo.",
    "sections": [
      {
        "title": "Hitscan",
        "body": "Servidor puede consultar posiciones históricas al validar un disparo."
      },
      {
        "title": "Historia",
        "body": "Se necesitan snapshots/poses pasadas indexadas temporalmente."
      },
      {
        "title": "Trust",
        "body": "Clock offset, RTT y límites anticheat importan."
      },
      {
        "title": "Trade-off",
        "body": "Favorecer al tirador puede perjudicar al objetivo que ya estaba detrás de cobertura en tiempo actual."
      }
    ]
  },
  "example": {
    "problem": "Historial guarda 250 ms a 60 Hz. Aproximadamente cuántos estados por entidad.",
    "steps": [
      "15"
    ],
    "solution": "15"
  },
  "check": {
    "question": "¿Lag compensation equivale a reducir físicamente el RTT?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Cambia la evaluación temporal, no la red."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Lag compensation y rewinding» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Lag compensation y rewinding» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Lag compensation y rewinding» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-rollback": {
  "id": "netgame-rollback",
  "courseId": 44,
  "title": "Rollback networking",
  "shortTitle": "Rollback networking",
  "duration": 115,
  "objective": "Corregir inputs tardíos rebobinando y resimulando una ventana del juego.",
  "summary": [
    "Rollback conserva estados pasados; cuando llega un input tardío, restaura un estado anterior y resimula hasta el presente.",
    "Se conserva estado suficiente por tick o checkpoints reconstruibles.",
    "Audio/partículas/UI requieren políticas para no duplicar side effects al resimular."
  ],
  "concept": "Rollback conserva estados pasados; cuando llega un input tardío, restaura un estado anterior y resimula hasta el presente.",
  "rules": [
    "Rollback exige estados restaurables y simulación reproducible suficiente.",
    "Separa rollback lógico de smoothing audiovisual.",
    "Ventana mayor cuesta memoria/CPU y tolera más latencia."
  ],
  "deep": {
    "intro": "Corregir inputs tardíos rebobinando y resimulando una ventana del juego.",
    "sections": [
      {
        "title": "Save state",
        "body": "Se conserva estado suficiente por tick o checkpoints reconstruibles."
      },
      {
        "title": "Input tardío",
        "body": "Un input para tick pasado invalida la historia predicha desde ese punto."
      },
      {
        "title": "Resimulación",
        "body": "Se restaura y ejecutan ticks nuevamente con inputs corregidos."
      },
      {
        "title": "Efectos",
        "body": "Audio/partículas/UI requieren políticas para no duplicar side effects al resimular."
      }
    ]
  },
  "example": {
    "problem": "Rollback desde tick 980 hasta presente 1000 inclusive de transiciones 980→1000. ¿Cuántos ticks de simulación rehacer?",
    "steps": [
      "20"
    ],
    "solution": "20"
  },
  "check": {
    "question": "¿Rollback es lo mismo que snapshot interpolation?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Uno resimula lógica; el otro suaviza presentación remota."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Rollback networking» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Rollback networking» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Rollback networking» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-determinism": {
  "id": "netgame-determinism",
  "courseId": 44,
  "title": "Determinismo práctico para multiplayer",
  "shortTitle": "Determinismo práctico para multiplayer",
  "duration": 115,
  "objective": "Identificar fuentes de divergencia y definir qué nivel de reproducibilidad necesita el protocolo.",
  "summary": [
    "Determinismo significa que el mismo estado e inputs bajo el mismo modelo producen el mismo resultado relevante; fixed timestep ayuda pero no lo garantiza.",
    "Floating point, threading, unordered containers y clocks pueden divergir.",
    "Comparar hashes de estado por tick localiza el primer desacuerdo."
  ],
  "concept": "Determinismo significa que el mismo estado e inputs bajo el mismo modelo producen el mismo resultado relevante; fixed timestep ayuda pero no lo garantiza.",
  "rules": [
    "Controla PRNG, orden de iteración y fuentes externas.",
    "No presupongas bitwise determinism entre plataformas sin demostrarlo.",
    "Hash por tick ayuda a localizar la primera divergencia."
  ],
  "deep": {
    "intro": "Identificar fuentes de divergencia y definir qué nivel de reproducibilidad necesita el protocolo.",
    "sections": [
      {
        "title": "Fuentes",
        "body": "Floating point, threading, unordered containers y clocks pueden divergir."
      },
      {
        "title": "Niveles",
        "body": "Puede bastar determinismo dentro de una misma build/plataforma o requerirse más."
      },
      {
        "title": "PRNG",
        "body": "Seed sola no basta si cambia el orden de llamadas."
      },
      {
        "title": "Diagnóstico",
        "body": "Comparar hashes de estado por tick localiza el primer desacuerdo."
      }
    ]
  },
  "example": {
    "problem": "Hashes iguales hasta tick 700 y distintos en 701. Primer tick divergente observado.",
    "steps": [
      "701"
    ],
    "solution": "701"
  },
  "check": {
    "question": "¿Fixed timestep por sí solo garantiza determinismo bit a bit?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Hay otras fuentes de no determinismo."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Determinismo práctico para multiplayer» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Determinismo práctico para multiplayer» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Determinismo práctico para multiplayer» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-input-delay": {
  "id": "netgame-input-delay",
  "courseId": 44,
  "title": "Input delay y fairness",
  "shortTitle": "Input delay y fairness",
  "duration": 115,
  "objective": "Usar retraso deliberado para absorber variación de red y reducir predicciones/rollbacks.",
  "summary": [
    "Input delay pospone la aplicación local/remota de inputs algunos ticks para esperar datos; intercambia responsiveness por estabilidad/fairness.",
    "Unos pocos frames de delay pueden reducir rollbacks.",
    "Cambiar delay dinámicamente puede causar discontinuidades si no se diseña con cuidado."
  ],
  "concept": "Input delay pospone la aplicación local/remota de inputs algunos ticks para esperar datos; intercambia responsiveness por estabilidad/fairness.",
  "rules": [
    "Delay intencional no es lo mismo que RTT.",
    "Mide distribución de llegada, no solo promedio.",
    "Combina con rollback/interpolation según género y objetivos."
  ],
  "deep": {
    "intro": "Usar retraso deliberado para absorber variación de red y reducir predicciones/rollbacks.",
    "sections": [
      {
        "title": "Fighting games",
        "body": "Unos pocos frames de delay pueden reducir rollbacks."
      },
      {
        "title": "Jitter",
        "body": "Margen temporal absorbe variación de llegada."
      },
      {
        "title": "Fairness",
        "body": "Políticas asimétricas cambian quién paga la latencia."
      },
      {
        "title": "Adaptación",
        "body": "Cambiar delay dinámicamente puede causar discontinuidades si no se diseña con cuidado."
      }
    ]
  },
  "example": {
    "problem": "Juego 60 Hz con 3 frames de input delay. Retraso nominal.",
    "steps": [
      "3·1000/60 = 50 ms"
    ],
    "solution": "50 ms"
  },
  "check": {
    "question": "¿Input delay elimina el RTT de Internet?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Solo cambia cuándo aplicas inputs."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Input delay y fairness» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Input delay y fairness» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Input delay y fairness» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-reliability-ordering": {
  "id": "netgame-reliability-ordering",
  "courseId": 44,
  "title": "Fiabilidad, orden y canales lógicos",
  "shortTitle": "Fiabilidad, orden y canales lógicos",
  "duration": 115,
  "objective": "Elegir semántica de entrega por tipo de mensaje en vez de hacer todo reliable-ordered.",
  "summary": [
    "Juegos suelen mezclar datos que necesitan fiabilidad/orden con datos obsoletos si llegan tarde; la semántica debe diseñarse por mensaje.",
    "Según protocolo, pueden retransmitirse o incluir redundancia.",
    "Separar streams lógicos evita que un mensaje grande bloquee información independiente en capas que lo permiten."
  ],
  "concept": "Juegos suelen mezclar datos que necesitan fiabilidad/orden con datos obsoletos si llegan tarde; la semántica debe diseñarse por mensaje.",
  "rules": [
    "Reliable no implica baja latencia.",
    "Orden global puede causar head-of-line blocking lógico.",
    "Estados reemplazables pueden preferir latest-wins."
  ],
  "deep": {
    "intro": "Elegir semántica de entrega por tipo de mensaje en vez de hacer todo reliable-ordered.",
    "sections": [
      {
        "title": "Inputs",
        "body": "Según protocolo, pueden retransmitirse o incluir redundancia."
      },
      {
        "title": "Snapshots",
        "body": "Un snapshot viejo puede ser inútil si ya llegó uno más reciente."
      },
      {
        "title": "Eventos",
        "body": "Compras, joins o inventario suelen requerir semántica más fuerte."
      },
      {
        "title": "Canales",
        "body": "Separar streams lógicos evita que un mensaje grande bloquee información independiente en capas que lo permiten."
      }
    ]
  },
  "example": {
    "problem": "Secuencias 50,51,53 recibidas; falta cuál.",
    "steps": [
      "52"
    ],
    "solution": "52"
  },
  "check": {
    "question": "¿Todo mensaje de juego debería ser reliable y ordered por defecto?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Depende de semántica y obsolescencia."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Fiabilidad, orden y canales lógicos» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Fiabilidad, orden y canales lógicos» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Fiabilidad, orden y canales lógicos» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-bandwidth-serialization": {
  "id": "netgame-bandwidth-serialization",
  "courseId": 44,
  "title": "Serialización, compresión y presupuesto de ancho de banda",
  "shortTitle": "Serialización, compresión y presupuesto de ancho de banda",
  "duration": 115,
  "objective": "Medir bytes por entidad/tick y diseñar formatos de red robustos.",
  "summary": [
    "El bandwidth se obtiene de frecuencia × payload × receptores más overhead; bit packing y cuantización son útiles solo si preservan la precisión necesaria.",
    "Bytes por snapshot × snapshots/s × clientes da una primera cota.",
    "Nunca confíes en lengths/counts recibidos sin límites."
  ],
  "concept": "El bandwidth se obtiene de frecuencia × payload × receptores más overhead; bit packing y cuantización son útiles solo si preservan la precisión necesaria.",
  "rules": [
    "Mide payload y overhead real.",
    "Versiona mensajes/protocolo.",
    "Optimiza relevancia antes de microcomprimir campos irrelevantes."
  ],
  "deep": {
    "intro": "Medir bytes por entidad/tick y diseñar formatos de red robustos.",
    "sections": [
      {
        "title": "Presupuesto",
        "body": "Bytes por snapshot × snapshots/s × clientes da una primera cota."
      },
      {
        "title": "Cuantización",
        "body": "Posiciones en un área acotada pueden codificarse con menos bits."
      },
      {
        "title": "Compatibilidad",
        "body": "Protocol versions y optional fields evitan reinterpretaciones silenciosas."
      },
      {
        "title": "Seguridad",
        "body": "Nunca confíes en lengths/counts recibidos sin límites."
      }
    ]
  },
  "example": {
    "problem": "8 KiB por snapshot a 20 Hz para un cliente. Payload aproximado KiB/s.",
    "steps": [
      "160"
    ],
    "solution": "160"
  },
  "check": {
    "question": "¿Bit packing arregla un sistema que replica miles de entidades irrelevantes?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Primero reduce qué envías."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Serialización, compresión y presupuesto de ancho de banda» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Serialización, compresión y presupuesto de ancho de banda» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Serialización, compresión y presupuesto de ancho de banda» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-interest-management": {
  "id": "netgame-interest-management",
  "courseId": 44,
  "title": "Interest management y escalado",
  "shortTitle": "Interest management y escalado",
  "duration": 115,
  "objective": "Limitar replicación según relevancia espacial, lógica y de gameplay.",
  "summary": [
    "Interest management construye para cada cliente un conjunto de entidades relevantes; es una decisión de semántica y escalado, no solo culling gráfico.",
    "Grid, BVH o zonas pueden generar candidatos.",
    "No enviar secretos reduce superficie frente a clientes modificados."
  ],
  "concept": "Interest management construye para cada cliente un conjunto de entidades relevantes; es una decisión de semántica y escalado, no solo culling gráfico.",
  "rules": [
    "Visibilidad gráfica y relevancia de red no son equivalentes.",
    "Añade hysteresis para evitar churn en fronteras.",
    "Privacidad/anti-cheat pueden exigir no enviar datos aunque sean técnicamente cercanos."
  ],
  "deep": {
    "intro": "Limitar replicación según relevancia espacial, lógica y de gameplay.",
    "sections": [
      {
        "title": "Espacial",
        "body": "Grid, BVH o zonas pueden generar candidatos."
      },
      {
        "title": "Gameplay",
        "body": "Party, quest, sonido o equipos pueden crear relevancia no espacial."
      },
      {
        "title": "Churn",
        "body": "Entrar/salir del conjunto implica spawn/despawn y baseline management."
      },
      {
        "title": "Seguridad",
        "body": "No enviar secretos reduce superficie frente a clientes modificados."
      }
    ]
  },
  "example": {
    "problem": "2000 entidades globales; 180 relevantes para un cliente. Reducción de conteo porcentual.",
    "steps": [
      "91%"
    ],
    "solution": "91%"
  },
  "check": {
    "question": "¿Frustum culling del renderer define por sí solo qué debe replicar la red?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Relevancia de red tiene otras reglas."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Interest management y escalado» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Interest management y escalado» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Interest management y escalado» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-security-observability": {
  "id": "netgame-security-observability",
  "courseId": 44,
  "title": "Seguridad, métricas y diagnóstico de red",
  "shortTitle": "Seguridad, métricas y diagnóstico de red",
  "duration": 115,
  "objective": "Diseñar validación autoritativa, límites y telemetría para depurar multiplayer real.",
  "summary": [
    "El servidor debe validar acciones según reglas y límites; observabilidad necesita distinguir RTT, jitter, pérdida, bandwidth, queueing, corrections y rollbacks.",
    "Inputs describen intención; servidor aplica reglas y estado autoritativo.",
    "Timeline de send/receive/tick/ACK permite explicar una corrección."
  ],
  "concept": "El servidor debe validar acciones según reglas y límites; observabilidad necesita distinguir RTT, jitter, pérdida, bandwidth, queueing, corrections y rollbacks.",
  "rules": [
    "Nunca confíes en coordenadas/velocidades del cliente sin política.",
    "Mide percentiles y distribución, no solo ping medio.",
    "Registra tick IDs y causas de corrección para reproducibilidad."
  ],
  "deep": {
    "intro": "Diseñar validación autoritativa, límites y telemetría para depurar multiplayer real.",
    "sections": [
      {
        "title": "Validación",
        "body": "Inputs describen intención; servidor aplica reglas y estado autoritativo."
      },
      {
        "title": "Métricas",
        "body": "RTT medio no revela p95/p99 ni jitter."
      },
      {
        "title": "Pérdida",
        "body": "Loss y reordering afectan canales de forma distinta."
      },
      {
        "title": "Debug",
        "body": "Timeline de send/receive/tick/ACK permite explicar una corrección."
      }
    ]
  },
  "example": {
    "problem": "RTT samples 20,20,20,20,120 ms. Promedio.",
    "steps": [
      "40 ms"
    ],
    "solution": "40 ms"
  },
  "check": {
    "question": "¿Ping medio de 40 ms demuestra ausencia de spikes?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "La distribución contiene un spike de 120 ms."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Seguridad, métricas y diagnóstico de red» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Seguridad, métricas y diagnóstico de red» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Seguridad, métricas y diagnóstico de red» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
},
  "netgame-integration": {
  "id": "netgame-integration",
  "courseId": 44,
  "title": "Proyecto multiplayer integrado",
  "shortTitle": "Proyecto multiplayer integrado",
  "duration": 115,
  "objective": "Construir y medir un prototipo con autoridad, replicación, prediction y simulación de condiciones de red.",
  "summary": [
    "El proyecto integra topología, temporalidad, replicación y corrección bajo latencia/jitter/loss artificialmente controlados.",
    "Localhost no basta: simula RTT, jitter, loss y reordering.",
    "Optimiza para experiencia y robustez, no solo bytes mínimos."
  ],
  "concept": "El proyecto integra topología, temporalidad, replicación y corrección bajo latencia/jitter/loss artificialmente controlados.",
  "rules": [
    "Prueba con network emulation reproducible.",
    "Documenta autoridad y semántica por mensaje.",
    "Compara calidad y coste con métricas antes/después."
  ],
  "deep": {
    "intro": "Construir y medir un prototipo con autoridad, replicación, prediction y simulación de condiciones de red.",
    "sections": [
      {
        "title": "Escenarios",
        "body": "Localhost no basta: simula RTT, jitter, loss y reordering."
      },
      {
        "title": "Instrumentación",
        "body": "Grafica snapshots, buffer, prediction error y rollback depth."
      },
      {
        "title": "Protocol",
        "body": "Documenta mensajes, frecuencia, fiabilidad y ownership."
      },
      {
        "title": "Criterio",
        "body": "Optimiza para experiencia y robustez, no solo bytes mínimos."
      }
    ]
  },
  "example": {
    "problem": "Errores de prediction por minuto bajan de 80 a 20. Reducción porcentual.",
    "steps": [
      "75%"
    ],
    "solution": "75%"
  },
  "check": {
    "question": "¿Una prueba perfecta en localhost demuestra que el netcode funciona bien en Internet?",
    "options": [
      [
        "no",
        true
      ],
      [
        "si",
        false
      ],
      [
        "depende siempre",
        false
      ]
    ],
    "feedback": "Faltan latencia, jitter, pérdida y reordering."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "Resume la distinción central de «Proyecto multiplayer integrado» con la idea clave de la lección.",
      "answer": "separar conceptos",
      "alternatives": [
        "separar responsabilidades"
      ],
      "hint": "No mezcles capas distintas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿La técnica de «Proyecto multiplayer integrado» elimina por sí sola latencia, jitter y pérdida de red? sí/no",
      "answer": "no",
      "hint": "El protocolo puede mitigarlas, no abolirlas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir «Proyecto multiplayer integrado» bajo condiciones de red reproducibles además de localhost? sí/no",
      "answer": "si",
      "hint": "Emula RTT, jitter, pérdida y reordering."
    }
  ]
}
});
