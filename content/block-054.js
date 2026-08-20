/**
 * BLOQUE 054 — Sistemas Embebidos
 *
 * Regla editorial: cada abstracción software debe volver a sus límites físicos: tiempo,
 * memoria, energía, buses, actuadores y modos de fallo. “Funciona” no sustituye un budget.
 */
window.LEARNING_PATHS[54] = {
  "level": "Experto práctico",
  "estimatedHours": 126,
  "description": "Sistemas embebidos completos: RTOS, scheduling, recursos limitados, energía, I/O físico, control y fiabilidad.",
  "outcomes": [
    "Diseñar tareas y comunicaciones RTOS con prioridades, blocking y ownership explícitos.",
    "Presupuestar memoria, energía y latencia end-to-end bajo restricciones reales.",
    "Integrar sensores, actuadores, buses y control de motores con interfaces eléctricas seguras.",
    "Diseñar detección, recuperación y degradación segura ante fallos previsibles."
  ],
  "modules": [
    {
      "id": "m1-rtos",
      "title": "RTOS y recursos",
      "description": "Arquitectura, scheduling, memoria e IPC",
      "lessons": [
        "emb-system-architecture",
        "emb-rtos",
        "emb-scheduling",
        "emb-memory",
        "emb-ipc-concurrency"
      ]
    },
    {
      "id": "m2-physical",
      "title": "Energía y mundo físico",
      "description": "Power, sensores y actuadores",
      "lessons": [
        "emb-power",
        "emb-sensors",
        "emb-actuators",
        "emb-motor-control"
      ]
    },
    {
      "id": "m3-comms-reliability",
      "title": "Comunicaciones y fiabilidad",
      "description": "Buses, timing y fault management",
      "lessons": [
        "emb-buses",
        "emb-reliability",
        "emb-timing-analysis",
        "emb-fault-management"
      ]
    },
    {
      "id": "m4-project",
      "title": "Integración",
      "description": "Proyecto de sistema embebido verificable",
      "lessons": [
        "emb-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "emb-system-architecture": {
    "id": "emb-system-architecture",
    "courseId": 54,
    "title": "Sistema embebido: hardware, firmware y entorno físico",
    "shortTitle": "Sistema embebido",
    "duration": 90,
    "objective": "Modelar un sistema embebido como un conjunto de restricciones físicas, temporales, energéticas y de fiabilidad, no como un PC pequeño.",
    "summary": [
      "Un sistema embebido combina computación con sensores/actuadores y suele estar diseñado para una función concreta bajo restricciones observables.",
      "Escribe primero requisitos medibles: deadline, consumo, memoria, precisión y modos de fallo.",
      "Separa mecanismo físico, periférico, driver, tarea y política de control."
    ],
    "concept": "Un sistema embebido combina computación con sensores/actuadores y suele estar diseñado para una función concreta bajo restricciones observables.",
    "rules": [
      "Escribe primero requisitos medibles: deadline, consumo, memoria, precisión y modos de fallo.",
      "Separa mecanismo físico, periférico, driver, tarea y política de control.",
      "Distingue promedio de peor caso y nominal de tolerancias."
    ],
    "deep": {
      "intro": "Modelar un sistema embebido como un conjunto de restricciones físicas, temporales, energéticas y de fiabilidad, no como un PC pequeño.",
      "sections": [
        {
          "title": "Capas",
          "body": "Sensor/actuador → electrónica → MCU/periféricos → drivers → RTOS/firmware → control/aplicación."
        },
        {
          "title": "Restricciones",
          "body": "Flash, RAM, energía, temperatura, latencia, tamaño y coste limitan decisiones arquitectónicas."
        },
        {
          "title": "Entorno",
          "body": "Ruido, rebotes, EMI, vibración y alimentación imperfecta forman parte del sistema real."
        },
        {
          "title": "Requisitos",
          "body": "Una especificación útil dice cuánto, cuándo y bajo qué condiciones; “rápido y fiable” no es verificable."
        }
      ]
    },
    "example": {
      "problem": "Loop de control tiene periodo 5 ms y ejecución WCET 1.4 ms. Holgura ideal.",
      "steps": [
        "5-1.4 = 3.6 ms."
      ],
      "solution": "3.6 ms."
    },
    "check": {
      "question": "¿Un sistema embebido es simplemente un ordenador de propósito general más pequeño?",
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
          "Solo si usa RTOS",
          false
        ]
      ],
      "feedback": "La función dedicada y las restricciones físicas/temporales cambian el diseño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un sensor pertenece solo al software? sí/no",
        "answer": "no",
        "hint": "Forma parte del sistema físico."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Periodo 10 ms y WCET 3 ms. Holgura ms.",
        "answer": "7",
        "hint": "10-3."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El promedio de ejecución demuestra el cumplimiento de un deadline? sí/no",
        "answer": "no",
        "hint": "Importa el peor caso relevante."
      }
    ]
  },
  "emb-rtos": {
    "id": "emb-rtos",
    "courseId": 54,
    "title": "RTOS: tareas, estados y objetos de sincronización",
    "shortTitle": "RTOS",
    "duration": 90,
    "objective": "Entender qué aporta un RTOS y qué responsabilidades siguen perteneciendo al diseño de la aplicación.",
    "summary": [
      "Un RTOS organiza tareas, espera, temporización y sincronización con overhead acotable; no convierte automáticamente el firmware en tiempo real correcto.",
      "Bloquea tareas cuando esperan eventos en vez de hacer busy-wait sin necesidad.",
      "Usa primitives con semántica explícita: queue, semaphore, mutex, event flags."
    ],
    "concept": "Un RTOS organiza tareas, espera, temporización y sincronización con overhead acotable; no convierte automáticamente el firmware en tiempo real correcto.",
    "rules": [
      "Bloquea tareas cuando esperan eventos en vez de hacer busy-wait sin necesidad.",
      "Usa primitives con semántica explícita: queue, semaphore, mutex, event flags.",
      "No confundas tick del kernel con precisión temporal universal."
    ],
    "deep": {
      "intro": "Entender qué aporta un RTOS y qué responsabilidades siguen perteneciendo al diseño de la aplicación.",
      "sections": [
        {
          "title": "Task states",
          "body": "Ready, Running y Blocked permiten al scheduler elegir trabajo ejecutable sin quemar CPU esperando."
        },
        {
          "title": "Objetos",
          "body": "Queues transportan mensajes; mutex protege exclusión y puede aportar priority inheritance; semáforos modelan tokens/eventos según diseño."
        },
        {
          "title": "Tick",
          "body": "El tick puede servir para timeouts/scheduling, pero timers de hardware o mecanismos tickless pueden coexistir."
        },
        {
          "title": "Overhead",
          "body": "Context switches, stacks y kernel objects consumen tiempo y memoria; medir importa."
        }
      ]
    },
    "example": {
      "problem": "Tres tareas usan stacks de 1024, 1536 y 2048 bytes. RAM total de stacks.",
      "steps": [
        "1024+1536+2048=4608."
      ],
      "solution": "4608 bytes."
    },
    "check": {
      "question": "¿Usar un RTOS garantiza que todos los deadlines se cumplan?",
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
          "Solo con más prioridad",
          false
        ]
      ],
      "feedback": "El scheduler aporta mecanismos; prioridades, WCET, blocking y carga siguen siendo responsabilidad del diseño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una task bloqueada consume necesariamente CPU ejecutando un loop? sí/no",
        "answer": "no",
        "hint": "Puede dormir hasta evento/timeout."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Stacks 512+768+1024 bytes. Total.",
        "answer": "2304",
        "hint": "Suma."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una queue y un mutex expresan el mismo contrato? sí/no",
        "answer": "no",
        "hint": "Mensaje vs exclusión mutua."
      }
    ]
  },
  "emb-scheduling": {
    "id": "emb-scheduling",
    "courseId": 54,
    "title": "Scheduling real-time: prioridad, bloqueo e inversión",
    "shortTitle": "Scheduling",
    "duration": 90,
    "objective": "Razonar sobre prioridad fija, preemption, utilización, blocking e inversión de prioridad.",
    "summary": [
      "El scheduler elige entre tareas listas según una política; prioridad alta expresa urgencia relativa, no hace que una tarea sea más rápida.",
      "Asigna prioridades desde requisitos temporales, no desde importancia subjetiva.",
      "Incluye blocking, ISR y jitter en el análisis; no uses solo utilización media."
    ],
    "concept": "El scheduler elige entre tareas listas según una política; prioridad alta expresa urgencia relativa, no hace que una tarea sea más rápida.",
    "rules": [
      "Asigna prioridades desde requisitos temporales, no desde importancia subjetiva.",
      "Incluye blocking, ISR y jitter en el análisis; no uses solo utilización media.",
      "Reconoce priority inversion y usa protocolos/mutex adecuados cuando proceda."
    ],
    "deep": {
      "intro": "Razonar sobre prioridad fija, preemption, utilización, blocking e inversión de prioridad.",
      "sections": [
        {
          "title": "Prioridad fija",
          "body": "En kernels como FreeRTOS por defecto, la tarea Ready de mayor prioridad obtiene CPU; iguales pueden compartir tiempo según configuración."
        },
        {
          "title": "Preemption",
          "body": "Una tarea más urgente que se desbloquea puede interrumpir a otra de menor prioridad."
        },
        {
          "title": "Inversión",
          "body": "Una tarea alta puede esperar un mutex retenido por una baja mientras una media corre; priority inheritance reduce ciertos casos."
        },
        {
          "title": "Utilización",
          "body": "Σ(Ci/Ti) es una señal útil de carga, pero por sí sola no demuestra schedulability general."
        }
      ]
    },
    "example": {
      "problem": "Tareas periódicas: C/T = 1/5 y 2/10. Utilización total.",
      "steps": [
        "0.2+0.2=0.4."
      ],
      "solution": "40%."
    },
    "check": {
      "question": "¿Dar máxima prioridad a todas las tareas elimina problemas de scheduling?",
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
          "Solo en un core",
          false
        ]
      ],
      "feedback": "Las prioridades relativas, tiempos, dependencias y blocking siguen existiendo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una tarea de alta prioridad corre si está Blocked? sí/no",
        "answer": "no",
        "hint": "Solo tareas listas compiten por CPU."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "C1=1 ms/T1=4 ms y C2=1 ms/T2=5 ms. Utilización %.",
        "answer": "45",
        "hint": "25%+20%."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Priority inheritance elimina todos los deadlocks? sí/no",
        "answer": "no",
        "hint": "Mitiga inversión; no resuelve ciclos de locks."
      }
    ]
  },
  "emb-memory": {
    "id": "emb-memory",
    "courseId": 54,
    "title": "Memoria restringida: stacks, pools y fragmentación",
    "shortTitle": "Memoria",
    "duration": 90,
    "objective": "Diseñar memoria predecible cuando Flash/RAM son pequeñas y el fallo de asignación no puede improvisarse.",
    "summary": [
      "En embebidos, el presupuesto de memoria es parte del diseño: stacks, heaps, buffers y caches deben dimensionarse y observarse.",
      "Mide high-water marks y reserva margen documentado para stacks.",
      "Prefiere ownership y tamaños acotados en caminos críticos; pools fijos pueden hacer coste/capacidad más predecibles."
    ],
    "concept": "En embebidos, el presupuesto de memoria es parte del diseño: stacks, heaps, buffers y caches deben dimensionarse y observarse.",
    "rules": [
      "Mide high-water marks y reserva margen documentado para stacks.",
      "Prefiere ownership y tamaños acotados en caminos críticos; pools fijos pueden hacer coste/capacidad más predecibles.",
      "Distingue fragmentación externa, interna y agotamiento total."
    ],
    "deep": {
      "intro": "Diseñar memoria predecible cuando Flash/RAM son pequeñas y el fallo de asignación no puede improvisarse.",
      "sections": [
        {
          "title": "Mapa",
          "body": "Flash contiene código/datos persistentes; RAM alberga .data/.bss, heaps, stacks y buffers."
        },
        {
          "title": "Stacks",
          "body": "Cada tarea puede requerir stack propio; overflow puede corromper silenciosamente si no hay protección/detección."
        },
        {
          "title": "Pools",
          "body": "Bloques fijos cambian flexibilidad por tiempos y capacidad más previsibles."
        },
        {
          "title": "Buffers",
          "body": "Double/ring buffers reducen copias o absorben jitter, pero consumen RAM explícita."
        }
      ]
    },
    "example": {
      "problem": "RAM 128 KiB; estático 30 KiB, stacks 38 KiB, buffers 44 KiB. Libre KiB.",
      "steps": [
        "128-30-38-44=16."
      ],
      "solution": "16 KiB."
    },
    "check": {
      "question": "¿Un heap sin fallos en una prueba corta demuestra ausencia de fragmentación futura?",
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
      "feedback": "La secuencia de tamaños/lifetimes puede cambiar el estado del heap con el tiempo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Cada task puede necesitar stack propio? sí/no",
        "answer": "si",
        "hint": "En RTOS es habitual."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "64 KiB RAM menos 18 y 30 KiB. Restante KiB.",
        "answer": "16",
        "hint": "64-18-30."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Memory pool fijo elimina la necesidad de controlar capacidad? sí/no",
        "answer": "no",
        "hint": "Puede agotarse; solo hace explícito el límite."
      }
    ]
  },
  "emb-power": {
    "id": "emb-power",
    "courseId": 54,
    "title": "Power management: energía, estados y wakeups",
    "shortTitle": "Power management",
    "duration": 90,
    "objective": "Construir presupuestos energéticos y coordinar CPU, clocks y dispositivos para reducir consumo sin romper deadlines.",
    "summary": [
      "Bajo consumo es un problema de energía por ciclo de trabajo, no una propiedad de activar un modo sleep aislado.",
      "Calcula energía con duty cycle y corrientes de cada estado.",
      "Suspende periféricos o baja clocks solo cuando sus consumidores y wakeups están coordinados."
    ],
    "concept": "Bajo consumo es un problema de energía por ciclo de trabajo, no una propiedad de activar un modo sleep aislado.",
    "rules": [
      "Calcula energía con duty cycle y corrientes de cada estado.",
      "Suspende periféricos o baja clocks solo cuando sus consumidores y wakeups están coordinados.",
      "Incluye coste de transición, latencia de wakeup y tiempo de estabilización."
    ],
    "deep": {
      "intro": "Construir presupuestos energéticos y coordinar CPU, clocks y dispositivos para reducir consumo sin romper deadlines.",
      "sections": [
        {
          "title": "Duty cycle",
          "body": "Iavg ≈ Σ Ii·di cuando los estados cubren el tiempo y el modelo de corriente es adecuado."
        },
        {
          "title": "CPU sleep",
          "body": "Idle/tickless puede permitir estados de bajo consumo cuando no hay tareas listas."
        },
        {
          "title": "Device PM",
          "body": "Un periférico puede gestionarse independientemente del estado global, con contadores/ownership de uso."
        },
        {
          "title": "Wakeup",
          "body": "RTC, GPIO o periféricos pueden despertar, pero cada fuente necesita latencia y política explícitas."
        }
      ]
    },
    "example": {
      "problem": "Dispositivo consume 12 mA 10% del tiempo y 0.4 mA 90%. Corriente media.",
      "steps": [
        "12·0.1 + 0.4·0.9 = 1.56 mA."
      ],
      "solution": "1.56 mA."
    },
    "check": {
      "question": "¿Dormir la CPU garantiza que todos los periféricos estén apagados?",
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
          "Solo con RTOS",
          false
        ]
      ],
      "feedback": "CPU/system PM y device PM son capas coordinadas pero distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Wakeup tiene latencia? sí/no",
        "answer": "si",
        "hint": "Clock/periféricos pueden necesitar estabilizar."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "20 mA 25% y 2 mA 75%. Iavg mA.",
        "answer": "6.5",
        "hint": "5+1.5."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Reducir frecuencia siempre reduce energía total de una tarea? sí/no",
        "answer": "no",
        "hint": "Puede aumentar tiempo activo y cambiar voltaje/periféricos."
      }
    ]
  },
  "emb-sensors": {
    "id": "emb-sensors",
    "courseId": 54,
    "title": "Sensores: transducción, calibración y timestamps",
    "shortTitle": "Sensores",
    "duration": 90,
    "objective": "Convertir fenómenos físicos en datos con unidades, calibración, incertidumbre y tiempo correctamente representados.",
    "summary": [
      "Un sensor entrega una medición condicionada por rango, ruido, bias, dinámica y cadena de adquisición; no “la verdad física”.",
      "Conserva unidades, escala, timestamp y estado de validez junto al valor.",
      "Distingue precisión, resolución, repetibilidad, bias y ruido."
    ],
    "concept": "Un sensor entrega una medición condicionada por rango, ruido, bias, dinámica y cadena de adquisición; no “la verdad física”.",
    "rules": [
      "Conserva unidades, escala, timestamp y estado de validez junto al valor.",
      "Distingue precisión, resolución, repetibilidad, bias y ruido.",
      "Filtra solo después de definir qué dinámica útil no quieres destruir."
    ],
    "deep": {
      "intro": "Convertir fenómenos físicos en datos con unidades, calibración, incertidumbre y tiempo correctamente representados.",
      "sections": [
        {
          "title": "Transducción",
          "body": "Temperatura, presión, luz o aceleración se transforman en tensión, corriente, frecuencia o códigos digitales."
        },
        {
          "title": "Calibración",
          "body": "Offset y gain pueden corregirse con referencias; temperatura y envejecimiento pueden requerir modelos adicionales."
        },
        {
          "title": "Timing",
          "body": "La edad de la muestra importa: adquisición, bus, cola y procesamiento añaden latencia."
        },
        {
          "title": "Filtros",
          "body": "Promediado reduce cierto ruido pero añade latencia y no elimina bias sistemático."
        }
      ]
    },
    "example": {
      "problem": "Sensor lineal: 0 V=0 °C, 2.5 V=100 °C. Lectura 1.0 V.",
      "steps": [
        "100/2.5=40 °C/V; 1 V→40 °C."
      ],
      "solution": "40 °C."
    },
    "check": {
      "question": "¿Promediar muchas muestras elimina un offset constante desconocido?",
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
          "Solo en ADC de 16 bits",
          false
        ]
      ],
      "feedback": "El promedio reduce ruido aleatorio bajo supuestos, no corrige automáticamente bias."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Timestamp forma parte útil de una medición? sí/no",
        "answer": "si",
        "hint": "Define cuándo era válida."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Sensor 10 mV/°C: 0.37 V equivale a °C.",
        "answer": "37",
        "hint": "370 mV/10."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Mayor resolución implica automáticamente mayor exactitud? sí/no",
        "answer": "no",
        "hint": "Error sistemático y calibración son distintos."
      }
    ]
  },
  "emb-actuators": {
    "id": "emb-actuators",
    "courseId": 54,
    "title": "Actuadores: drivers, energía y estados seguros",
    "shortTitle": "Actuadores",
    "duration": 90,
    "objective": "Controlar cargas físicas respetando potencia, transitorios, protección y estados seguros.",
    "summary": [
      "El MCU normalmente ordena; la etapa de potencia entrega la energía al actuador y necesita protección adecuada.",
      "No conduzcas cargas inductivas o de potencia directamente desde un GPIO salvo que el datasheet lo permita explícitamente.",
      "Define safe state para reset, boot, brownout y pérdida de comunicación."
    ],
    "concept": "El MCU normalmente ordena; la etapa de potencia entrega la energía al actuador y necesita protección adecuada.",
    "rules": [
      "No conduzcas cargas inductivas o de potencia directamente desde un GPIO salvo que el datasheet lo permita explícitamente.",
      "Define safe state para reset, boot, brownout y pérdida de comunicación.",
      "Separa comando lógico, driver eléctrico y respuesta mecánica."
    ],
    "deep": {
      "intro": "Controlar cargas físicas respetando potencia, transitorios, protección y estados seguros.",
      "sections": [
        {
          "title": "Drivers",
          "body": "MOSFETs, puentes y drivers adaptan tensión/corriente y pueden incorporar protección."
        },
        {
          "title": "Inductivos",
          "body": "Relés, solenoides y motores almacenan energía; flyback/freewheel gestiona transitorios según topología."
        },
        {
          "title": "Safe state",
          "body": "Enable, brake, coast o closed valve deben tener una política que sobreviva a resets."
        },
        {
          "title": "Feedback",
          "body": "Un actuador puede necesitar corriente, posición o velocidad medida para cerrar el loop."
        }
      ]
    },
    "example": {
      "problem": "Solenoide 12 V y 24 Ω en DC ideal. Corriente.",
      "steps": [
        "I=12/24=0.5 A."
      ],
      "solution": "0.5 A."
    },
    "check": {
      "question": "¿Un GPIO de MCU debe alimentar directamente cualquier motor pequeño?",
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
          "Si usa PWM",
          false
        ]
      ],
      "feedback": "La corriente, inductancia y transitorios suelen exigir una etapa de potencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un actuador puede almacenar energía? sí/no",
        "answer": "si",
        "hint": "Motores/solenoides son inductivos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "24 V sobre 48 Ω. Corriente A.",
        "answer": "0.5",
        "hint": "V/R."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿PWM elimina la necesidad de un driver de potencia? sí/no",
        "answer": "no",
        "hint": "Solo define conmutación/control."
      }
    ]
  },
  "emb-motor-control": {
    "id": "emb-motor-control",
    "courseId": 54,
    "title": "Control de motores: PWM, corriente, velocidad y lazo",
    "shortTitle": "Motor control",
    "duration": 90,
    "objective": "Entender la cadena de potencia y control para motores DC/BLDC sin confundir modulación con regulación.",
    "summary": [
      "PWM aplica una orden; un controlador usa feedback y un modelo para conseguir corriente, velocidad o posición bajo límites eléctricos y mecánicos.",
      "Sincroniza sampling de corriente con PWM cuando la topología lo requiera.",
      "Aplica límites de corriente, tensión, temperatura y velocidad antes de pedir más control."
    ],
    "concept": "PWM aplica una orden; un controlador usa feedback y un modelo para conseguir corriente, velocidad o posición bajo límites eléctricos y mecánicos.",
    "rules": [
      "Sincroniza sampling de corriente con PWM cuando la topología lo requiera.",
      "Aplica límites de corriente, tensión, temperatura y velocidad antes de pedir más control.",
      "Distingue control open-loop de closed-loop y variable regulada de señal de conmutación."
    ],
    "deep": {
      "intro": "Entender la cadena de potencia y control para motores DC/BLDC sin confundir modulación con regulación.",
      "sections": [
        {
          "title": "Cadena",
          "body": "setpoint → controlador → PWM/gate driver → puente → motor → sensor → feedback."
        },
        {
          "title": "DC motor",
          "body": "Torque suele relacionarse con corriente; back-EMF con velocidad en modelos básicos."
        },
        {
          "title": "BLDC",
          "body": "Conmutación y sensado de fase requieren coordinación temporal; FOC añade transformaciones/control vectorial."
        },
        {
          "title": "Protección",
          "body": "Overcurrent hardware/timer break puede detener PWM más rápido que una tarea de software."
        }
      ]
    },
    "example": {
      "problem": "Motor ideal: constante de torque 0.08 N·m/A, corriente 3 A. Torque.",
      "steps": [
        "0.08·3=0.24."
      ],
      "solution": "0.24 N·m."
    },
    "check": {
      "question": "¿PWM por sí solo garantiza una velocidad constante bajo carga variable?",
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
          "Solo al 50%",
          false
        ]
      ],
      "feedback": "Sin feedback, la velocidad puede cambiar con carga, tensión y dinámica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Torque y corriente suelen estar relacionados en un motor DC idealizado? sí/no",
        "answer": "si",
        "hint": "Kt·I."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Kt=0.05 N·m/A e I=4 A. Torque N·m.",
        "answer": "0.2",
        "hint": "0.05·4."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un software loop es siempre suficiente para cortar una sobrecorriente extrema? sí/no",
        "answer": "no",
        "hint": "Protección hardware puede ser necesaria."
      }
    ]
  },
  "emb-buses": {
    "id": "emb-buses",
    "courseId": 54,
    "title": "Buses de comunicación: contrato, framing y recuperación",
    "shortTitle": "Buses",
    "duration": 90,
    "objective": "Diseñar comunicaciones internas/externas considerando semántica, errores, ownership, throughput y recuperación.",
    "summary": [
      "UART, SPI, I²C, CAN y otros buses difieren en arbitraje, framing, topología y garantías; “es un bus” no define el protocolo completo.",
      "Calcula throughput útil incluyendo framing y frecuencia de actualización, no solo bitrate nominal.",
      "Define timeouts, CRC/checksum cuando corresponda, retries y estrategia tras peripheral reset."
    ],
    "concept": "UART, SPI, I²C, CAN y otros buses difieren en arbitraje, framing, topología y garantías; “es un bus” no define el protocolo completo.",
    "rules": [
      "Calcula throughput útil incluyendo framing y frecuencia de actualización, no solo bitrate nominal.",
      "Define timeouts, CRC/checksum cuando corresponda, retries y estrategia tras peripheral reset.",
      "No bloquees una tarea crítica indefinidamente esperando un dispositivo ausente."
    ],
    "deep": {
      "intro": "Diseñar comunicaciones internas/externas considerando semántica, errores, ownership, throughput y recuperación.",
      "sections": [
        {
          "title": "Capas",
          "body": "El bus físico/eléctrico, el controlador hardware y el protocolo de dispositivo son contratos distintos."
        },
        {
          "title": "Throughput",
          "body": "Bits de start/stop, address, ACK, headers y gaps reducen payload útil."
        },
        {
          "title": "Errores",
          "body": "NACK, arbitration loss, framing error o bus stuck necesitan recuperación explícita según bus."
        },
        {
          "title": "Arquitectura",
          "body": "DMA/interrupts y queues desacoplan transferencia de tareas, pero añaden ownership y backpressure."
        }
      ]
    },
    "example": {
      "problem": "Bus 1 Mbit/s con eficiencia útil 70%. Payload efectivo.",
      "steps": [
        "1e6·0.7=700000 bit/s."
      ],
      "solution": "700 kbit/s."
    },
    "check": {
      "question": "¿La frecuencia de SCLK de SPI es igual automáticamente al throughput útil de aplicación?",
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
          "Solo con DMA",
          false
        ]
      ],
      "feedback": "Comandos, gaps y framing reducen payload útil."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿I²C y SPI tienen el mismo arbitraje? sí/no",
        "answer": "no",
        "hint": "Son contratos distintos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "2 Mbit/s al 60% útil. Mbit/s payload.",
        "answer": "1.2",
        "hint": "2·0.6."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿DMA elimina la necesidad de gestionar overflow/backpressure? sí/no",
        "answer": "no",
        "hint": "Los productores pueden superar consumidores/buffers."
      }
    ]
  },
  "emb-reliability": {
    "id": "emb-reliability",
    "courseId": 54,
    "title": "Reliability: fallos, degradación y recuperación",
    "shortTitle": "Reliability",
    "duration": 90,
    "objective": "Diseñar el sistema para detectar, contener, recuperar y explicar fallos en vez de confiar en que no ocurrirán.",
    "summary": [
      "Fiabilidad combina prevención, detección, contención y recuperación; un watchdog aislado no sustituye una estrategia de fault management.",
      "Define fault model: qué puede fallar, cómo se detecta y cuál es el estado seguro.",
      "Registra reset cause y diagnóstico persistente mínimo cuando sea útil."
    ],
    "concept": "Fiabilidad combina prevención, detección, contención y recuperación; un watchdog aislado no sustituye una estrategia de fault management.",
    "rules": [
      "Define fault model: qué puede fallar, cómo se detecta y cuál es el estado seguro.",
      "Registra reset cause y diagnóstico persistente mínimo cuando sea útil.",
      "Prueba brownout, sensor desconectado, bus bloqueado, corrupción y timing extremo de forma deliberada."
    ],
    "deep": {
      "intro": "Diseñar el sistema para detectar, contener, recuperar y explicar fallos en vez de confiar en que no ocurrirán.",
      "sections": [
        {
          "title": "Fault model",
          "body": "Stuck sensor, timeout, bit flip, overtemperature, brownout o missed deadline requieren respuestas diferentes."
        },
        {
          "title": "Detection",
          "body": "Range checks, plausibility, sequence counters, CRC/ECC, watchdogs y self-tests cubren clases distintas."
        },
        {
          "title": "Recovery",
          "body": "Retry, reset periférico, restart task, fallback mode o system reset tienen costes/alcance diferentes."
        },
        {
          "title": "Safe degradation",
          "body": "Puede ser mejor perder una función secundaria que continuar con una salida peligrosa."
        }
      ]
    },
    "example": {
      "problem": "Sistema tiene MTBF 2000 h y se usa 100 h; aproximación de probabilidad de al menos un fallo para tasa exponencial baja: 1-exp(-100/2000).",
      "steps": [
        "100/2000=0.05; 1-exp(-0.05)≈0.04877."
      ],
      "solution": "≈4.88%."
    },
    "check": {
      "question": "¿Un watchdog demuestra que el sistema está produciendo resultados correctos?",
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
          "Solo si es externo",
          false
        ]
      ],
      "feedback": "Puede demostrar cierta liveness, no corrección funcional completa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Brownout puede ser un modo de fallo? sí/no",
        "answer": "si",
        "hint": "Alimentación insuficiente puede corromper ejecución/estado."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "MTBF 1000 h; tasa λ aproximada por hora.",
        "answer": "0.001",
        "hint": "1/1000."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Retry infinito es una política de recuperación segura universal? sí/no",
        "answer": "no",
        "hint": "Puede bloquear/consumir energía e impedir degradación segura."
      }
    ]
  },
  "emb-ipc-concurrency": {
    "id": "emb-ipc-concurrency",
    "courseId": 54,
    "title": "IPC y concurrencia embebida: ISR, task y ownership",
    "shortTitle": "IPC",
    "duration": 90,
    "objective": "Diseñar el flujo ISR→task→driver sin carreras, bloqueo inapropiado ni pérdida silenciosa de datos.",
    "summary": [
      "En firmware concurrente, la propiedad del dato y el contexto de ejecución importan tanto como el valor transferido.",
      "Mantén ISR cortas y difiere trabajo pesado a tasks cuando sea posible.",
      "Usa APIs explícitamente seguras desde ISR; una API thread-safe no implica ISR-safe."
    ],
    "concept": "En firmware concurrente, la propiedad del dato y el contexto de ejecución importan tanto como el valor transferido.",
    "rules": [
      "Mantén ISR cortas y difiere trabajo pesado a tasks cuando sea posible.",
      "Usa APIs explícitamente seguras desde ISR; una API thread-safe no implica ISR-safe.",
      "Define ownership del buffer durante DMA y cambios de productor/consumidor."
    ],
    "deep": {
      "intro": "Diseñar el flujo ISR→task→driver sin carreras, bloqueo inapropiado ni pérdida silenciosa de datos.",
      "sections": [
        {
          "title": "ISR to task",
          "body": "Una ISR puede capturar timestamp/estado y despertar una task mediante primitive adecuada."
        },
        {
          "title": "Queues",
          "body": "Copiar mensajes simplifica ownership pero consume CPU/RAM; pasar punteros exige lifetime claro."
        },
        {
          "title": "Priority inversion",
          "body": "Mutexes entre tasks pueden necesitar inheritance; ISR no debe intentar un mutex bloqueante."
        },
        {
          "title": "DMA ownership",
          "body": "Mientras DMA posee un buffer, CPU no debe modificar regiones en uso sin protocolo/coherencia adecuada."
        }
      ]
    },
    "example": {
      "problem": "Ring buffer de 256 muestras, productor 8 ksample/s. Tiempo hasta llenarse sin consumidor.",
      "steps": [
        "256/8000=0.032 s."
      ],
      "solution": "32 ms."
    },
    "check": {
      "question": "¿Una ISR debe bloquear esperando indefinidamente un mutex de task?",
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
          "Solo con prioridad alta",
          false
        ]
      ],
      "feedback": "El contexto de interrupción no debe usar operaciones bloqueantes de esa forma."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿DMA y CPU pueden necesitar ownership coordinado de buffer? sí/no",
        "answer": "si",
        "hint": "Pueden acceder concurrentemente."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Buffer 100 muestras a 5 ksample/s. Llenado ms.",
        "answer": "20",
        "hint": "100/5000 s."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Thread-safe implica automáticamente ISR-safe? sí/no",
        "answer": "no",
        "hint": "Las restricciones de contexto pueden diferir."
      }
    ]
  },
  "emb-timing-analysis": {
    "id": "emb-timing-analysis",
    "courseId": 54,
    "title": "Timing, jitter y budgets end-to-end",
    "shortTitle": "Timing",
    "duration": 90,
    "objective": "Pasar de “cada tarea parece rápida” a un presupuesto temporal extremo a extremo medible.",
    "summary": [
      "Un deadline end-to-end incluye adquisición, espera, ejecución, comunicación y actuación; optimizar solo una función puede no cambiar la latencia total.",
      "Mide timestamps en fronteras del pipeline, no solo duración de funciones aisladas.",
      "Distingue latency, period, jitter, response time y throughput."
    ],
    "concept": "Un deadline end-to-end incluye adquisición, espera, ejecución, comunicación y actuación; optimizar solo una función puede no cambiar la latencia total.",
    "rules": [
      "Mide timestamps en fronteras del pipeline, no solo duración de funciones aisladas.",
      "Distingue latency, period, jitter, response time y throughput.",
      "Reserva budget para ISR, blocking, buses y variación de hardware."
    ],
    "deep": {
      "intro": "Pasar de “cada tarea parece rápida” a un presupuesto temporal extremo a extremo medible.",
      "sections": [
        {
          "title": "Pipeline",
          "body": "sensor → ADC/DMA → task → control → bus → actuator tiene múltiples colas y clocks."
        },
        {
          "title": "Jitter",
          "body": "Variación de activación o finalización puede importar incluso si el promedio cumple."
        },
        {
          "title": "Response time",
          "body": "Arrival-to-completion es distinto de CPU execution time."
        },
        {
          "title": "Backlog",
          "body": "Si producción media supera consumo sostenido, ningún buffer finito evita overflow para siempre."
        }
      ]
    },
    "example": {
      "problem": "Pipeline: adquisición 0.4 ms, cola 0.6, control 1.2, bus 0.8. Latencia total.",
      "steps": [
        "0.4+0.6+1.2+0.8=3.0."
      ],
      "solution": "3 ms."
    },
    "check": {
      "question": "¿Una función de 1 ms garantiza latencia end-to-end de 1 ms?",
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
          "Solo con RTOS",
          false
        ]
      ],
      "feedback": "Esperas, adquisición, buses y otras etapas también cuentan."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Jitter es variación temporal? sí/no",
        "answer": "si",
        "hint": "Describe dispersión en timing."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Etapas 0.2+0.5+0.9 ms. Total.",
        "answer": "1.6",
        "hint": "Suma."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un buffer infinito puede arreglar un productor sostenidamente más rápido que consumidor? sí/no",
        "answer": "no",
        "hint": "Solo pospone el backlog; en la realidad además es finito."
      }
    ]
  },
  "emb-fault-management": {
    "id": "emb-fault-management",
    "courseId": 54,
    "title": "Fault management, health monitoring y estados degradados",
    "shortTitle": "Fault management",
    "duration": 90,
    "objective": "Convertir detecciones dispersas en una política coherente de salud, reset, fallback y trazabilidad.",
    "summary": [
      "La recuperación debe tener jerarquía: primero la intervención menos destructiva que restaure el contrato, escalando si falla.",
      "Clasifica faults como transitorios, persistentes o desconocidos cuando sea útil.",
      "Evita reset loops con contadores/backoff y una ruta de recuperación verificable."
    ],
    "concept": "La recuperación debe tener jerarquía: primero la intervención menos destructiva que restaure el contrato, escalando si falla.",
    "rules": [
      "Clasifica faults como transitorios, persistentes o desconocidos cuando sea útil.",
      "Evita reset loops con contadores/backoff y una ruta de recuperación verificable.",
      "Conserva evidencia mínima: causa, timestamp/boot counter y contexto relevante."
    ],
    "deep": {
      "intro": "Convertir detecciones dispersas en una política coherente de salud, reset, fallback y trazabilidad.",
      "sections": [
        {
          "title": "Health monitor",
          "body": "Heartbeats y counters pueden indicar progreso, pero deben representar trabajo útil."
        },
        {
          "title": "Escalation",
          "body": "Retry → peripheral reset → subsystem restart → system reset → safe mode es un patrón posible, no una receta universal."
        },
        {
          "title": "Persistence",
          "body": "Reset cause y crash record permiten diferenciar watchdog, brownout y software reset."
        },
        {
          "title": "Degraded mode",
          "body": "Reducir frecuencia, desactivar motor o usar sensor redundante puede mantener una función segura."
        }
      ]
    },
    "example": {
      "problem": "Health check cada 50 ms y se toleran 3 intervalos sin heartbeat. Tiempo nominal antes de declarar timeout.",
      "steps": [
        "50·3=150 ms."
      ],
      "solution": "150 ms."
    },
    "check": {
      "question": "¿Reiniciar todo el MCU debe ser siempre la primera recuperación ante cualquier error periférico?",
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
          "Solo con watchdog",
          false
        ]
      ],
      "feedback": "Una recuperación local puede ser menos disruptiva si restaura el contrato."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Conviene registrar reset cause? sí/no",
        "answer": "si",
        "hint": "Ayuda al diagnóstico."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Heartbeat 40 ms, 5 intervalos. Timeout ms.",
        "answer": "200",
        "hint": "40·5."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un heartbeat frecuente garantiza que el algoritmo produce datos correctos? sí/no",
        "answer": "no",
        "hint": "Liveness no prueba corrección."
      }
    ]
  },
  "emb-integration": {
    "id": "emb-integration",
    "courseId": 54,
    "title": "Proyecto embebido integrado: control, energía y fiabilidad",
    "shortTitle": "Proyecto embebido",
    "duration": 90,
    "objective": "Integrar RTOS, sensores, actuadores, buses, energía y fault management en un diseño medible y auditable.",
    "summary": [
      "Un buen proyecto embebido define contratos entre tareas y hardware, presupuestos de tiempo/memoria/energía y respuestas verificables a fallos.",
      "Documenta diagrama de bloques, task graph, ownership de buffers y prioridades.",
      "Entrega budgets de RAM, CPU, energía y latencia con mediciones reales."
    ],
    "concept": "Un buen proyecto embebido define contratos entre tareas y hardware, presupuestos de tiempo/memoria/energía y respuestas verificables a fallos.",
    "rules": [
      "Documenta diagrama de bloques, task graph, ownership de buffers y prioridades.",
      "Entrega budgets de RAM, CPU, energía y latencia con mediciones reales.",
      "Incluye fault injection y criterios de safe state en las pruebas."
    ],
    "deep": {
      "intro": "Integrar RTOS, sensores, actuadores, buses, energía y fault management en un diseño medible y auditable.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Sensor task → queue → control task → actuator driver; telemetry/logging quedan desacoplados por prioridad/buffers."
        },
        {
          "title": "Budgets",
          "body": "RAM estática, stacks, buffers, CPU utilization, Iavg y response time deben caber con margen."
        },
        {
          "title": "Power",
          "body": "Tickless/device PM solo se activan cuando el sistema conoce deadlines y wake sources."
        },
        {
          "title": "Validation",
          "body": "Pruebas incluyen bus desconectado, sensor saturado, overrun, brownout, watchdog y carga máxima."
        }
      ]
    },
    "example": {
      "problem": "Batería ideal 1200 mAh e Iavg 6 mA. Autonomía ideal.",
      "steps": [
        "1200/6=200 h."
      ],
      "solution": "200 h."
    },
    "check": {
      "question": "¿Una autonomía calculada como capacidad/Iavg es una predicción perfecta de batería real?",
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
          "Solo con RTOS",
          false
        ]
      ],
      "feedback": "Es una primera aproximación; química, temperatura, eficiencia y perfil de carga importan."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El proyecto debe medir RAM y timing? sí/no",
        "answer": "si",
        "hint": "Son requisitos embebidos centrales."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "900 mAh / 3 mA = horas.",
        "answer": "300",
        "hint": "900/3."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Pasar happy-path tests sustituye fault injection? sí/no",
        "answer": "no",
        "hint": "No ejercita recuperación ni safe state."
      }
    ]
  }
});
