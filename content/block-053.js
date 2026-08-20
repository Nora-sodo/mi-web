/**
 * BLOQUE 053 — Microcontroladores
 *
 * Regla editorial: distinguir core, MCU, placa y framework; todo timing debe derivarse
 * del clock real del periférico y todo pin/bus debe respetar su contrato eléctrico.
 */
window.LEARNING_PATHS[53] = {
  "level": "Experto práctico",
  "estimatedHours": 144,
  "description": "Microcontroladores desde la abstracción Arduino hasta firmware bare-metal real-time, periféricos, DMA, boot y diagnóstico temporal.",
  "outcomes": [
    "Distinguir core, MCU, placa y framework de software sin mezclar sus contratos.",
    "Configurar GPIO, timers, conversiones y buses razonando desde clocks y señales reales.",
    "Diseñar firmware interrupt/DMA-safe con buffers, watchdog y boot robusto.",
    "Medir deadlines, jitter, bandwidth y límites eléctricos en hardware real."
  ],
  "modules": [
    {
      "id": "m1-platform",
      "title": "Plataforma y arquitectura",
      "description": "MCU, Arduino, AVR, STM32 y Cortex-M",
      "lessons": [
        "mcu-system",
        "mcu-arduino-internals",
        "mcu-avr",
        "mcu-stm32",
        "mcu-cortexm"
      ]
    },
    {
      "id": "m2-time-io",
      "title": "GPIO y tiempo",
      "description": "GPIO, timers/PWM e interrupciones",
      "lessons": [
        "mcu-gpio",
        "mcu-timers-pwm",
        "mcu-interrupts"
      ]
    },
    {
      "id": "m3-peripherals",
      "title": "Conversión y buses",
      "description": "ADC/DAC, UART, SPI, I²C y DMA",
      "lessons": [
        "mcu-adc-dac",
        "mcu-uart",
        "mcu-spi",
        "mcu-i2c",
        "mcu-dma"
      ]
    },
    {
      "id": "m4-runtime",
      "title": "Robustez y tiempo real",
      "description": "Watchdogs, bare metal, bootloaders e integración",
      "lessons": [
        "mcu-watchdogs",
        "mcu-baremetal-boot",
        "mcu-realtime-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "mcu-system": {
    "id": "mcu-system",
    "courseId": 53,
    "title": "Microcontrolador: un sistema completo en un chip",
    "shortTitle": "Anatomía MCU",
    "duration": 90,
    "objective": "Entender un microcontrolador como CPU, memorias, reloj, reset, buses y periféricos integrados con restricciones de potencia y tiempo.",
    "summary": [
      "Un microcontrolador integra un procesador con memoria y periféricos; no es solo una CPU pequeña.",
      "Flash, SRAM, registros periféricos y señales externas tienen funciones y costes distintos.",
      "Clock tree, reset y alimentación forman parte de la arquitectura observable por firmware."
    ],
    "concept": "Un microcontrolador integra un procesador con memoria y periféricos; no es solo una CPU pequeña.",
    "rules": [
      "Separa CPU de periféricos y memorias.",
      "Distingue capacidad nominal de latencia/ancho de banda útil.",
      "Lee siempre datasheet, reference manual y errata del dispositivo concreto."
    ],
    "deep": {
      "intro": "Entender un microcontrolador como CPU, memorias, reloj, reset, buses y periféricos integrados con restricciones de potencia y tiempo.",
      "sections": [
        {
          "title": "CPU y memoria",
          "body": "El core ejecuta instrucciones; Flash suele almacenar código no volátil y SRAM estado mutable. Algunos dispositivos añaden EEPROM, caches u otras memorias."
        },
        {
          "title": "Periféricos",
          "body": "GPIO, timers, ADC, comunicaciones y DMA viven alrededor del core y normalmente se controlan mediante registros memory-mapped."
        },
        {
          "title": "Clock y reset",
          "body": "La frecuencia del core no implica la misma frecuencia en todos los buses/periféricos. Reset establece un estado inicial definido por el fabricante."
        },
        {
          "title": "Familias",
          "body": "AVR, STM32 y Cortex-M nombran capas diferentes: una familia MCU, una familia de MCUs y una familia de cores respectivamente."
        }
      ]
    },
    "example": {
      "problem": "MCU a 48 MHz ejecuta una tarea de 24000 ciclos. Tiempo ideal de CPU.",
      "steps": [
        "t=24000/48e6 s.",
        "Eso equivale a 0.0005 s."
      ],
      "solution": "0.5 ms."
    },
    "check": {
      "question": "¿La frecuencia del CPU determina automáticamente la frecuencia de todos los periféricos?",
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
          "Solo en bare metal",
          false
        ]
      ],
      "feedback": "El clock tree puede dividir, multiplicar o seleccionar fuentes distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Flash y SRAM cumplen la misma función? sí/no",
        "answer": "no",
        "hint": "Persistencia y mutabilidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "16 MHz: duración ideal de 160 ciclos en µs.",
        "answer": "10",
        "hint": "160/16e6·1e6."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cortex-M es por sí solo un modelo completo de MCU con ADC y GPIO específicos? sí/no",
        "answer": "no",
        "hint": "Es una familia de cores; el fabricante integra periféricos."
      }
    ]
  },
  "mcu-arduino-internals": {
    "id": "mcu-arduino-internals",
    "courseId": 53,
    "title": "Arduino por dentro: core, board package y runtime",
    "shortTitle": "Arduino interno",
    "duration": 90,
    "objective": "Atravesar la capa Arduino desde setup()/loop() hasta el core, variantes de placa, registros y periféricos reales.",
    "summary": [
      "Arduino es un ecosistema/API sobre C/C++ y cores concretos; no es una arquitectura de CPU.",
      "setup() y loop() forman parte del runtime del core; debajo siguen existiendo startup, timers, interrupciones y registros.",
      "digitalWrite() prioriza portabilidad/ergonomía y no equivale a una única instrucción universal."
    ],
    "concept": "Arduino es un ecosistema/API sobre C/C++ y cores concretos; no es una arquitectura de CPU.",
    "rules": [
      "Identifica siempre board y core antes de inferir hardware.",
      "Usa la API de alto nivel hasta que una medición justifique bajar de nivel.",
      "No confundas analogWrite() con DAC: en muchas placas genera PWM."
    ],
    "deep": {
      "intro": "Atravesar la capa Arduino desde setup()/loop() hasta el core, variantes de placa, registros y periféricos reales.",
      "sections": [
        {
          "title": "Capas",
          "body": "Sketch → API Arduino → core de plataforma → HAL/registros → MCU. Cada board package puede implementar estas capas de forma distinta."
        },
        {
          "title": "setup/loop",
          "body": "El runtime inicializa la plataforma, ejecuta setup() una vez y llama loop() repetidamente; interrupciones pueden ocurrir en paralelo al flujo principal."
        },
        {
          "title": "Abstracción",
          "body": "pinMode/digitalWrite/analogRead esconden detalles de puertos, multiplexores y ADC. El coste exacto depende del core y compilación."
        },
        {
          "title": "Escape hatch",
          "body": "Cuando necesitas timing, potencia o periféricos avanzados, puedes combinar API Arduino con acceso específico del core, documentando la pérdida de portabilidad."
        }
      ]
    },
    "example": {
      "problem": "loop() tarda 250 µs de trabajo útil sin bloqueos. Máximo teórico de iteraciones por segundo.",
      "steps": [
        "1/250e-6 = 4000."
      ],
      "solution": "4000 iteraciones/s."
    },
    "check": {
      "question": "¿analogWrite() garantiza una salida DAC analógica verdadera en todas las placas Arduino?",
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
          "Solo si el valor es 255",
          false
        ]
      ],
      "feedback": "La implementación depende de la placa; frecuentemente es PWM."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Arduino es una ISA? sí/no",
        "answer": "no",
        "hint": "Es un ecosistema/API."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "loop tarda 2 ms. Iteraciones/s ideales.",
        "answer": "500",
        "hint": "1/0.002."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Acceder registros directamente puede reducir portabilidad? sí/no",
        "answer": "si",
        "hint": "Acopla firmware a MCU/core concreto."
      }
    ]
  },
  "mcu-avr": {
    "id": "mcu-avr",
    "courseId": 53,
    "title": "AVR: arquitectura de un MCU de 8 bits",
    "shortTitle": "AVR",
    "duration": 90,
    "objective": "Usar AVR clásico como caso de estudio de CPU de 8 bits, espacios de memoria, registros, interrupciones y periféricos integrados.",
    "summary": [
      "AVR es una familia; los periféricos y tamaños concretos cambian entre dispositivos.",
      "En AVR clásicos como ATmega, programa y datos se organizan con espacios diferenciados; Flash no debe tratarse como SRAM.",
      "Las interrupciones transfieren control a vectores definidos por el dispositivo y el estado global de interrupción importa."
    ],
    "concept": "AVR es una familia; los periféricos y tamaños concretos cambian entre dispositivos.",
    "rules": [
      "No extrapoles registros de un ATmega a toda la familia AVR.",
      "Distingue ancho del datapath de tamaños de direcciones/periféricos.",
      "Consulta el datasheet para timings, fuse bits y secuencias protegidas."
    ],
    "deep": {
      "intro": "Usar AVR clásico como caso de estudio de CPU de 8 bits, espacios de memoria, registros, interrupciones y periféricos integrados.",
      "sections": [
        {
          "title": "Core",
          "body": "Los AVR 8-bit clásicos usan un conjunto de registros de propósito general y una ISA RISC orientada a operaciones compactas."
        },
        {
          "title": "Memorias",
          "body": "Flash de programa, SRAM de datos y, en muchos modelos, EEPROM no tienen las mismas instrucciones, latencia ni endurance."
        },
        {
          "title": "Interrupciones",
          "body": "Una fuente pendiente solo ejecuta su ISR si está habilitada según la lógica del dispositivo y el estado global correspondiente."
        },
        {
          "title": "Fuses y reloj",
          "body": "Configuración de clock, boot y brown-out puede vivir en fuse/config bits; un valor incorrecto puede cambiar cómo arranca o se programa el chip."
        }
      ]
    },
    "example": {
      "problem": "CPU AVR a 16 MHz. Instrucción de 4 ciclos: tiempo ideal.",
      "steps": [
        "4/16e6 s = 0.25 µs."
      ],
      "solution": "0.25 µs."
    },
    "check": {
      "question": "¿Todos los AVR tienen exactamente los mismos periféricos y registros?",
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
          "Solo los de 8 bits",
          false
        ]
      ],
      "feedback": "La familia comparte conceptos, pero el dispositivo concreto define memoria y periféricos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Flash de programa y SRAM son equivalentes? sí/no",
        "answer": "no",
        "hint": "Espacios y propiedades distintas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "20 MHz y 10 ciclos: duración en µs.",
        "answer": "0.5",
        "hint": "10/20e6·1e6."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un fuse de reloj puede afectar la frecuencia efectiva del MCU? sí/no",
        "answer": "si",
        "hint": "Configuración no volátil de clock."
      }
    ]
  },
  "mcu-stm32": {
    "id": "mcu-stm32",
    "courseId": 53,
    "title": "STM32: familia, clock tree y capas de software",
    "shortTitle": "STM32",
    "duration": 90,
    "objective": "Entender STM32 como una familia amplia de MCUs Arm con buses, clock tree y periféricos que varían por serie y referencia.",
    "summary": [
      "STM32 no es un único microcontrolador: cambia core, memoria, periféricos y clocks entre familias.",
      "HAL, LL, CMSIS y acceso a registros son capas diferentes; ninguna cambia las capacidades físicas del silicio.",
      "Habilitar el reloj de un periférico y configurar sus pines/multiplexores suele ser parte del contrato antes de usarlo."
    ],
    "concept": "STM32 no es un único microcontrolador: cambia core, memoria, periféricos y clocks entre familias.",
    "rules": [
      "Identifica siempre referencia exacta del MCU.",
      "No copies bitfields entre familias sin reference manual.",
      "Separa frecuencia del core, bus y timer/peripheral clocks."
    ],
    "deep": {
      "intro": "Entender STM32 como una familia amplia de MCUs Arm con buses, clock tree y periféricos que varían por serie y referencia.",
      "sections": [
        {
          "title": "Familia",
          "body": "STM32 integra diferentes Cortex-M y periféricos según la línea. El nombre de familia orienta, pero el reference manual del dispositivo manda."
        },
        {
          "title": "Clock tree",
          "body": "Osciladores internos/externos, PLL y prescalers alimentan dominios distintos. Un timer puede recibir una frecuencia distinta de la del CPU."
        },
        {
          "title": "Capas",
          "body": "CMSIS define interfaces de core/dispositivo; ST ofrece HAL/LL. Acceso directo puede ser más explícito, pero exige conocer bien registros y secuencias."
        },
        {
          "title": "Pin mux",
          "body": "Un pin físico suele multiplexar GPIO y alternate functions. Configurar UART/SPI requiere tanto periférico como pinout correcto."
        }
      ]
    },
    "example": {
      "problem": "Bus periférico a 80 MHz con prescaler /4. Frecuencia resultante simple.",
      "steps": [
        "80/4=20."
      ],
      "solution": "20 MHz."
    },
    "check": {
      "question": "¿Un ejemplo para STM32F103 puede asumirse bit a bit válido para cualquier STM32?",
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
          "Sí si usa C",
          false
        ]
      ],
      "feedback": "Las familias difieren en registros, clocks y periféricos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿STM32 es un único chip? sí/no",
        "answer": "no",
        "hint": "Es una familia amplia."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Clock 96 MHz / prescaler 3. Resultado MHz.",
        "answer": "32",
        "hint": "96/3."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Configurar UART puede requerir también alternate function del pin? sí/no",
        "answer": "si",
        "hint": "Periférico y pin mux son capas distintas."
      }
    ]
  },
  "mcu-cortexm": {
    "id": "mcu-cortexm",
    "courseId": 53,
    "title": "Arm Cortex-M: core, excepciones y NVIC",
    "shortTitle": "Cortex-M",
    "duration": 90,
    "objective": "Separar el core Cortex-M del MCU completo y razonar sobre vector table, excepciones, prioridades, NVIC y SysTick.",
    "summary": [
      "Cortex-M describe un core/arquitectura de procesamiento; ADC, UART o GPIO concretos los integra el fabricante.",
      "Las excepciones usan una tabla de vectores y el NVIC gestiona interrupciones externas con prioridades según la implementación.",
      "SysTick es un temporizador del core presente en muchas variantes Cortex-M, no un scheduler por sí mismo."
    ],
    "concept": "Cortex-M describe un core/arquitectura de procesamiento; ADC, UART o GPIO concretos los integra el fabricante.",
    "rules": [
      "Distingue excepción de periférico.",
      "No asumas número de bits de prioridad efectivo sin el MCU concreto.",
      "Mantén las ISR acotadas y documenta qué estado comparten con thread/main context."
    ],
    "deep": {
      "intro": "Separar el core Cortex-M del MCU completo y razonar sobre vector table, excepciones, prioridades, NVIC y SysTick.",
      "sections": [
        {
          "title": "Vector table",
          "body": "El arranque usa una tabla con stack inicial y handlers/excepciones según la arquitectura/dispositivo. La ubicación y remapeo dependen del sistema."
        },
        {
          "title": "NVIC",
          "body": "El Nested Vectored Interrupt Controller permite habilitar, priorizar y anidar excepciones externas dentro de las capacidades implementadas."
        },
        {
          "title": "SysTick",
          "body": "Puede generar ticks periódicos, pero transformar esos ticks en timebase, scheduler o timeout es responsabilidad del software."
        },
        {
          "title": "Stack/contexto",
          "body": "Entrada/salida de excepción tiene soporte hardware de stacking, pero el coste total incluye latencia, handler y posible nesting."
        }
      ]
    },
    "example": {
      "problem": "Tick de 1 kHz. Periodo.",
      "steps": [
        "1/1000 s = 1 ms."
      ],
      "solution": "1 ms."
    },
    "check": {
      "question": "¿NVIC configura directamente el baud rate de un UART?",
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
      "feedback": "NVIC gestiona interrupciones; el baud pertenece al periférico UART y su clock."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Cortex-M incluye necesariamente el mismo ADC en todos los MCUs? sí/no",
        "answer": "no",
        "hint": "El fabricante integra periféricos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "SysTick 500 Hz. Periodo en ms.",
        "answer": "2",
        "hint": "1000/500."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La cantidad efectiva de niveles de prioridad NVIC puede depender de la implementación? sí/no",
        "answer": "si",
        "hint": "No todos implementan los mismos bits."
      }
    ]
  },
  "mcu-gpio": {
    "id": "mcu-gpio",
    "courseId": 53,
    "title": "GPIO: eléctricos, modos y multiplexación",
    "shortTitle": "GPIO",
    "duration": 90,
    "objective": "Configurar GPIO entendiendo dirección, pull-up/down, push-pull/open-drain, alternate functions, límites eléctricos y rebote.",
    "summary": [
      "GPIO es una interfaz eléctrica además de un registro lógico.",
      "Open-drain necesita una fuente de pull-up para obtener nivel alto; push-pull conduce activamente ambos estados.",
      "Nunca excedas límites absolutos de tensión/corriente del pin ni asumas que todos son 5 V tolerant."
    ],
    "concept": "GPIO es una interfaz eléctrica además de un registro lógico.",
    "rules": [
      "Configura modo antes de conducir una carga.",
      "Distingue pull resistor interno de una resistencia externa dimensionada.",
      "Debounce puede resolverse en hardware, software o ambos según timing/ruido."
    ],
    "deep": {
      "intro": "Configurar GPIO entendiendo dirección, pull-up/down, push-pull/open-drain, alternate functions, límites eléctricos y rebote.",
      "sections": [
        {
          "title": "Entrada",
          "body": "Un pin flotante puede adoptar estados indeterminados; pull-up/down define un estado débil cuando ningún agente lo conduce."
        },
        {
          "title": "Salida",
          "body": "Push-pull sirve para lógica directa; open-drain permite wired-AND y buses como I²C cuando todos respetan la línea."
        },
        {
          "title": "Alternate function",
          "body": "UART/SPI/timers pueden tomar control del pin mediante mux; escribir el registro GPIO ya no implica controlar físicamente la salida."
        },
        {
          "title": "Integridad",
          "body": "Capacitancia, carga y drive strength afectan tiempos de subida y EMI; GPIO rápido no significa que siempre debas elegir máxima velocidad."
        }
      ]
    },
    "example": {
      "problem": "Pull-up 10 kΩ a 3.3 V con botón cerrado a GND. Corriente aproximada.",
      "steps": [
        "I=3.3/10000=0.00033 A."
      ],
      "solution": "0.33 mA."
    },
    "check": {
      "question": "¿Open-drain produce por sí solo un nivel alto activo?",
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
          "Solo en PWM",
          false
        ]
      ],
      "feedback": "Normalmente libera la línea y el pull-up genera el alto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un input flotante tiene nivel lógico garantizado? sí/no",
        "answer": "no",
        "hint": "Necesita bias o fuente externa."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "3.3 V / 4.7 kΩ. Corriente mA aproximada.",
        "answer": "0.702",
        "hint": "3.3/4700·1000."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Alternate function puede entregar el control del pin a un timer? sí/no",
        "answer": "si",
        "hint": "El mux conecta periférico y pad."
      }
    ]
  },
  "mcu-timers-pwm": {
    "id": "mcu-timers-pwm",
    "courseId": 53,
    "title": "Timers y PWM: tiempo en hardware",
    "shortTitle": "Timers/PWM",
    "duration": 90,
    "objective": "Usar timers para medir/generar tiempo, compare/capture y PWM sin convertir el CPU en un cronómetro ocupado.",
    "summary": [
      "Un timer cuenta ticks de un clock configurado; prescaler y periodo determinan su escala temporal.",
      "PWM codifica duty cycle mediante pulsos digitales; no es un DAC ideal.",
      "La fórmula exacta depende de modo, alineación y periférico; no copies una ecuación sin revisar el timer concreto."
    ],
    "concept": "Un timer cuenta ticks de un clock configurado; prescaler y periodo determinan su escala temporal.",
    "rules": [
      "Deriva frecuencia desde el clock real del timer.",
      "Usa output compare/input capture para timing preciso cuando exista.",
      "Distingue frecuencia PWM, resolución y respuesta de la carga."
    ],
    "deep": {
      "intro": "Usar timers para medir/generar tiempo, compare/capture y PWM sin convertir el CPU en un cronómetro ocupado.",
      "sections": [
        {
          "title": "Base temporal",
          "body": "En un up-counter típico, f_update=f_timer/((PSC+1)(ARR+1)); otros modos pueden introducir factores distintos."
        },
        {
          "title": "Compare/capture",
          "body": "Output compare genera eventos al alcanzar un valor; input capture registra el contador ante una transición externa."
        },
        {
          "title": "PWM",
          "body": "CCR controla el instante de comparación y por tanto duty. Un filtro/carga puede convertir el promedio en una magnitud analógica aproximada."
        },
        {
          "title": "Trade-off",
          "body": "A clock fijo, aumentar ARR puede mejorar resolución pero reducir frecuencia; cambiar prescaler altera granularidad temporal."
        }
      ]
    },
    "example": {
      "problem": "Timer 72 MHz, PSC=71, ARR=999 en modo up-counter típico. Frecuencia update.",
      "steps": [
        "72e6/(72·1000)=1000."
      ],
      "solution": "1000 Hz."
    },
    "check": {
      "question": "¿PWM es por definición una salida analógica continua?",
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
      "feedback": "Es una señal digital modulada en duty; el promedio puede filtrarse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un timer puede medir intervalos sin busy-wait continuo del CPU? sí/no",
        "answer": "si",
        "hint": "Capture/compare y contadores hardware."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Timer 48 MHz, PSC=47, ARR=999. Frecuencia Hz.",
        "answer": "1000",
        "hint": "48e6/(48·1000)."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La fórmula de PWM es idéntica para todos los modos center/edge aligned? sí/no",
        "answer": "no",
        "hint": "Modo de conteo cambia periodo."
      }
    ]
  },
  "mcu-interrupts": {
    "id": "mcu-interrupts",
    "courseId": 53,
    "title": "Interrupciones: latencia, prioridades y estado compartido",
    "shortTitle": "Interrupts",
    "duration": 90,
    "objective": "Diseñar ISR cortas y correctas entendiendo latencia, nesting, prioridades, atomicidad y comunicación con el contexto principal.",
    "summary": [
      "Una interrupción no hace desaparecer la concurrencia: introduce interleavings entre ISR y código principal.",
      "volatile afecta optimizaciones/visibilidad del compilador, pero no convierte operaciones compuestas en atómicas.",
      "ISR largas aumentan latencia y jitter de otras tareas; trabajo pesado suele diferirse."
    ],
    "concept": "Una interrupción no hace desaparecer la concurrencia: introduce interleavings entre ISR y código principal.",
    "rules": [
      "Reconoce y limpia la fuente de interrupción según el periférico.",
      "Comparte el mínimo estado posible y usa primitivas atómicas adecuadas.",
      "Mide worst-case latency, no solo promedio."
    ],
    "deep": {
      "intro": "Diseñar ISR cortas y correctas entendiendo latencia, nesting, prioridades, atomicidad y comunicación con el contexto principal.",
      "sections": [
        {
          "title": "Entrada",
          "body": "Hardware guarda el contexto mínimo definido y salta al vector. El coste depende del core, prioridad y estado previo."
        },
        {
          "title": "Flags",
          "body": "Una ISR suele capturar datos/flags y despertar trabajo posterior. No toda bandera se limpia igual: algunos registros usan write-1-to-clear u otras secuencias."
        },
        {
          "title": "Concurrencia",
          "body": "Un contador multi-byte en un MCU estrecho puede leerse parcialmente mientras la ISR lo actualiza; se requiere atomicidad explícita."
        },
        {
          "title": "Prioridades",
          "body": "Una ISR de mayor prioridad puede preemptar otra si la arquitectura/configuración lo permite; nesting cambia el worst-case timing."
        }
      ]
    },
    "example": {
      "problem": "Evento cada 100 µs; ISR tarda 18 µs. Porcentaje de CPU ocupado si no hay solapamiento.",
      "steps": [
        "18/100=0.18."
      ],
      "solution": "18%."
    },
    "check": {
      "question": "¿volatile hace atómico automáticamente un incremento compartido?",
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
      "feedback": "Volatile no es una primitiva de sincronización/atomicidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una ISR puede interrumpir el flujo principal? sí/no",
        "answer": "si",
        "hint": "Ese es el mecanismo."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "ISR 8 µs cada 200 µs. Carga porcentual.",
        "answer": "4",
        "hint": "8/200·100."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una ISR más larga puede aumentar jitter de otra de menor prioridad? sí/no",
        "answer": "si",
        "hint": "Bloqueo/preemption según prioridades."
      }
    ]
  },
  "mcu-adc-dac": {
    "id": "mcu-adc-dac",
    "courseId": 53,
    "title": "ADC y DAC en microcontroladores",
    "shortTitle": "ADC/DAC",
    "duration": 90,
    "objective": "Aplicar los fundamentos analógicos a convertidores integrados considerando referencia, sample time, trigger, calibración y periféricos disponibles.",
    "summary": [
      "El ADC integrado hereda problemas de source impedance, Vref, ruido y anti-aliasing.",
      "No todo MCU incorpora DAC verdadero; PWM filtrado y DAC son mecanismos distintos.",
      "Trigger por timer + DMA puede dar sampling más regular que iniciar cada conversión desde software."
    ],
    "concept": "El ADC integrado hereda problemas de source impedance, Vref, ruido y anti-aliasing.",
    "rules": [
      "Comprueba rango de entrada y referencia.",
      "Dimensiona sample time según driver/fuente.",
      "Separa resolución nominal de ENOB/accuracy real."
    ],
    "deep": {
      "intro": "Aplicar los fundamentos analógicos a convertidores integrados considerando referencia, sample time, trigger, calibración y periféricos disponibles.",
      "sections": [
        {
          "title": "ADC",
          "body": "Mux, sample-and-hold y conversor comparten recursos según el MCU; cambiar canal puede requerir tiempo de adquisición."
        },
        {
          "title": "Trigger",
          "body": "Un timer puede disparar conversiones con jitter bajo y DMA mover resultados a RAM sin ISR por muestra."
        },
        {
          "title": "DAC",
          "body": "Un DAC integrado genera códigos analógicos con settling y carga limitados. Si no existe, PWM+filtro es una alternativa con espectro/ripple diferentes."
        },
        {
          "title": "Calibración",
          "body": "Offset, gain y referencia pueden medirse/compensarse, pero calibrar no recupera información perdida por clipping o aliasing."
        }
      ]
    },
    "example": {
      "problem": "ADC 12-bit, Vref=3.3 V, code=2048. Tensión ideal aproximada usando code/4096.",
      "steps": [
        "3.3·2048/4096=1.65."
      ],
      "solution": "1.65 V."
    },
    "check": {
      "question": "¿Timer-trigger + DMA puede reducir jitter de muestreo respecto a disparar conversiones desde un loop variable?",
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
          "Solo si usa UART",
          false
        ]
      ],
      "feedback": "El hardware puede separar el instante de adquisición del jitter del CPU."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Todo MCU tiene DAC real? sí/no",
        "answer": "no",
        "hint": "Depende del dispositivo."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "ADC 10-bit, Vref 5 V, code 512 usando code/1024. Voltios.",
        "answer": "2.5",
        "hint": "5·512/1024."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Aumentar sample time puede ayudar con una fuente de alta impedancia? sí/no",
        "answer": "si",
        "hint": "Más tiempo para cargar sample capacitor."
      }
    ]
  },
  "mcu-uart": {
    "id": "mcu-uart",
    "courseId": 53,
    "title": "UART: bytes asíncronos y framing",
    "shortTitle": "UART",
    "duration": 90,
    "objective": "Diseñar enlaces UART entendiendo baud, framing, clocks independientes, buffering y diferencia entre protocolo lógico y niveles eléctricos.",
    "summary": [
      "UART es asíncrono: emisor y receptor acuerdan baud/framing sin compartir una línea de clock.",
      "UART lógico/TTL no es lo mismo que RS-232 eléctrico.",
      "Un byte de datos suele consumir más de 8 bits en la línea por start/stop/paridad."
    ],
    "concept": "UART es asíncrono: emisor y receptor acuerdan baud/framing sin compartir una línea de clock.",
    "rules": [
      "Calcula throughput con bits de framing.",
      "Usa buffers/FIFO para desacoplar CPU de la línea.",
      "Define protocolo de mensajes encima de la secuencia de bytes."
    ],
    "deep": {
      "intro": "Diseñar enlaces UART entendiendo baud, framing, clocks independientes, buffering y diferencia entre protocolo lógico y niveles eléctricos.",
      "sections": [
        {
          "title": "Framing",
          "body": "Una configuración 8N1 transmite normalmente 1 start + 8 data + 1 stop = 10 bits por byte."
        },
        {
          "title": "Baud error",
          "body": "Los clocks no son idénticos; el receptor tolera un margen finito de error acumulado dentro del frame."
        },
        {
          "title": "Buffers",
          "body": "Interrupciones o DMA alimentan ring buffers para que la aplicación no tenga que esperar cada byte."
        },
        {
          "title": "Niveles",
          "body": "3.3 V UART, 5 V UART y RS-232 tienen niveles distintos; conectar sin adaptación puede fallar o dañar hardware."
        }
      ]
    },
    "example": {
      "problem": "UART 115200 baud, 8N1. Máximo ideal de bytes/s sin huecos.",
      "steps": [
        "10 bits por byte.",
        "115200/10=11520."
      ],
      "solution": "11520 bytes/s."
    },
    "check": {
      "question": "¿UART 8N1 envía solo 8 bits físicos por byte de payload?",
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
          "Solo a 9600",
          false
        ]
      ],
      "feedback": "Incluye start y stop."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿UART necesita una línea SCLK compartida? sí/no",
        "answer": "no",
        "hint": "Es asíncrono."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "9600 baud 8N1. Bytes/s ideales.",
        "answer": "960",
        "hint": "9600/10."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿UART TTL y RS-232 garantizan los mismos niveles eléctricos? sí/no",
        "answer": "no",
        "hint": "Necesitan transceiver/adaptación."
      }
    ]
  },
  "mcu-spi": {
    "id": "mcu-spi",
    "courseId": 53,
    "title": "SPI: clock compartido y transacciones",
    "shortTitle": "SPI",
    "duration": 90,
    "objective": "Usar SPI entendiendo master/controller, clock, chip-select, full-duplex, CPOL/CPHA y contratos específicos del dispositivo.",
    "summary": [
      "SPI define señales y timing básicos, pero no un protocolo universal de comandos, direcciones o framing.",
      "CPOL/CPHA deben coincidir entre extremos.",
      "La frecuencia máxima la limita el esclavo/dispositivo, routing y timing, no solo el controlador."
    ],
    "concept": "SPI define señales y timing básicos, pero no un protocolo universal de comandos, direcciones o framing.",
    "rules": [
      "Consulta timing diagram del periférico esclavo.",
      "Controla CS con la semántica requerida por la transacción.",
      "No confundas full-duplex eléctrico con que el protocolo use ambos sentidos de forma útil simultánea."
    ],
    "deep": {
      "intro": "Usar SPI entendiendo master/controller, clock, chip-select, full-duplex, CPOL/CPHA y contratos específicos del dispositivo.",
      "sections": [
        {
          "title": "Señales",
          "body": "SCLK sincroniza bits; MOSI/MISO transportan datos y CS selecciona típicamente un dispositivo."
        },
        {
          "title": "Modos",
          "body": "CPOL define nivel idle y CPHA el borde de captura/desplazamiento. Un modo incorrecto puede desplazar o corromper bits."
        },
        {
          "title": "Transacción",
          "body": "Cada sensor/memoria define opcodes, direcciones, dummy cycles y longitud propios sobre SPI."
        },
        {
          "title": "Topología",
          "body": "Varios dispositivos pueden compartir SCLK/MOSI/MISO con CS separados si sus salidas se liberan correctamente."
        }
      ]
    },
    "example": {
      "problem": "SPI 8 MHz transmite 32 bits sin overhead. Tiempo ideal.",
      "steps": [
        "32/8e6=4 µs."
      ],
      "solution": "4 µs."
    },
    "check": {
      "question": "¿SPI define universalmente qué opcode significa leer un registro?",
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
          "Solo en modo 0",
          false
        ]
      ],
      "feedback": "Los comandos pertenecen al dispositivo/protocolo encima de SPI."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿SPI comparte una línea de clock? sí/no",
        "answer": "si",
        "hint": "SCLK."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "SPI 4 MHz, 24 bits. Tiempo en µs.",
        "answer": "6",
        "hint": "24/4e6."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿CPOL/CPHA incorrectos pueden corromper la captura? sí/no",
        "answer": "si",
        "hint": "Cambian bordes y nivel idle."
      }
    ]
  },
  "mcu-i2c": {
    "id": "mcu-i2c",
    "courseId": 53,
    "title": "I²C: open-drain, addressing y arbitraje",
    "shortTitle": "I²C",
    "duration": 90,
    "objective": "Entender I²C como bus síncrono de dos hilos con open-drain, pull-ups, ACK/NACK, addressing y timing dependiente de la capacitancia.",
    "summary": [
      "SDA y SCL se implementan típicamente como open-drain/open-collector con pull-ups.",
      "Un 1 lógico aparece porque los dispositivos liberan la línea; por eso el tiempo de subida depende de Rpullup y capacitancia.",
      "I²C incluye addressing/arbitraje a nivel de bus, pero el mapa de registros del dispositivo sigue siendo específico."
    ],
    "concept": "SDA y SCL se implementan típicamente como open-drain/open-collector con pull-ups.",
    "rules": [
      "Dimensiona pull-ups por tensión, capacitancia y modo de velocidad.",
      "Comprueba ACK/NACK y timeouts; no bloquees para siempre.",
      "Distingue dirección I²C del registro interno del dispositivo."
    ],
    "deep": {
      "intro": "Entender I²C como bus síncrono de dos hilos con open-drain, pull-ups, ACK/NACK, addressing y timing dependiente de la capacitancia.",
      "sections": [
        {
          "title": "Wired-AND",
          "body": "Cualquier participante puede forzar LOW; HIGH aparece cuando todos liberan la línea. Esto hace posible arbitraje sin conducción opuesta activa."
        },
        {
          "title": "Address/ACK",
          "body": "Una transacción incluye dirección y bits de ACK/NACK; 7-bit addressing es común, pero existen variantes y reserved addresses."
        },
        {
          "title": "Rise time",
          "body": "Una aproximación RC muestra por qué mucha capacitancia o pull-up demasiado grande limita velocidad."
        },
        {
          "title": "Clock stretching",
          "body": "Algunos targets pueden mantener SCL LOW para retrasar al controller si ambos soportan la característica."
        }
      ]
    },
    "example": {
      "problem": "Pull-up 4.7 kΩ y capacitancia 100 pF. Constante RC simple.",
      "steps": [
        "τ=4700·100e-12=470e-9 s."
      ],
      "solution": "470 ns."
    },
    "check": {
      "question": "¿Un HIGH de I²C se obtiene normalmente porque un dispositivo conduce activamente la línea a VDD?",
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
          "Solo durante ACK",
          false
        ]
      ],
      "feedback": "Los dispositivos suelen liberar la línea y el pull-up la eleva."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿I2C usa normalmente pull-ups? sí/no",
        "answer": "si",
        "hint": "Open-drain."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "R=2 kΩ,C=200 pF. Tau RC en ns.",
        "answer": "400",
        "hint": "2000·200e-12=400 ns."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La dirección I2C identifica automáticamente un registro interno? sí/no",
        "answer": "no",
        "hint": "Address del dispositivo y protocolo interno son capas distintas."
      }
    ]
  },
  "mcu-dma": {
    "id": "mcu-dma",
    "courseId": 53,
    "title": "DMA: mover datos sin atender cada elemento",
    "shortTitle": "DMA",
    "duration": 90,
    "objective": "Usar DMA para desacoplar transferencia de datos y CPU, entendiendo triggers, buffers circulares, prioridades y coherencia.",
    "summary": [
      "DMA evita que el CPU ejecute una carga/almacenamiento por cada elemento, pero no significa coste cero.",
      "El periférico, bus, DMA y memoria compiten por ancho de banda y tienen restricciones de alineación/tamaño.",
      "En sistemas con cache, DMA y CPU pueden requerir mantenimiento/coherencia explícita según la arquitectura."
    ],
    "concept": "DMA evita que el CPU ejecute una carga/almacenamiento por cada elemento, pero no significa coste cero.",
    "rules": [
      "Define quién posee cada buffer en cada instante.",
      "Usa half/full transfer o double buffering para streaming.",
      "Sincroniza antes de reutilizar memoria todavía en uso por DMA."
    ],
    "deep": {
      "intro": "Usar DMA para desacoplar transferencia de datos y CPU, entendiendo triggers, buffers circulares, prioridades y coherencia.",
      "sections": [
        {
          "title": "Trigger",
          "body": "ADC/UART/SPI/timer pueden generar requests de DMA; el controlador mueve datos según dirección, longitud y configuración."
        },
        {
          "title": "Circular",
          "body": "Un ring/circular buffer permite adquisición continua. Half-transfer permite procesar una mitad mientras DMA llena la otra."
        },
        {
          "title": "Bus",
          "body": "DMA descarga instrucciones del CPU, pero sigue consumiendo buses y memoria; puede interferir con CPU u otros masters."
        },
        {
          "title": "Coherencia",
          "body": "En MCUs con data cache, limpiar/invalidatear líneas puede ser necesario; la regla exacta depende del core/memory region."
        }
      ]
    },
    "example": {
      "problem": "ADC produce 20 ksample/s de 16 bits. Ancho de banda de payload.",
      "steps": [
        "20000·2=40000 bytes/s."
      ],
      "solution": "40000 bytes/s."
    },
    "check": {
      "question": "¿DMA significa que la transferencia no usa ningún ancho de banda de memoria/bus?",
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
          "Solo en circular",
          false
        ]
      ],
      "feedback": "Elimina trabajo por elemento del CPU, no el movimiento físico de datos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿DMA puede transferir periférico→RAM? sí/no",
        "answer": "si",
        "hint": "Caso típico ADC/UART."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "50 ksample/s × 4 bytes. Bytes/s.",
        "answer": "200000",
        "hint": "50000·4."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿DMA puede necesitar gestión de cache en algunos Cortex-M con D-cache? sí/no",
        "answer": "si",
        "hint": "CPU y DMA pueden observar memoria mediante rutas distintas."
      }
    ]
  },
  "mcu-watchdogs": {
    "id": "mcu-watchdogs",
    "courseId": 53,
    "title": "Watchdogs: detectar pérdida de progreso",
    "shortTitle": "Watchdogs",
    "duration": 90,
    "objective": "Diseñar watchdogs como mecanismo de recuperación de fallos y no como ritual de refresco incondicional.",
    "summary": [
      "Un watchdog debe refrescarse solo cuando el sistema demuestra progreso saludable.",
      "Si la misma tarea bloqueada sigue refrescando el watchdog, el mecanismo deja de detectar ese fallo.",
      "El clock, ventana y comportamiento tras timeout dependen del dispositivo."
    ],
    "concept": "Un watchdog debe refrescarse solo cuando el sistema demuestra progreso saludable.",
    "rules": [
      "Define qué condiciones habilitan el refresh.",
      "Registra reset cause cuando sea posible.",
      "Prueba watchdog provocando fallos reales/controlados."
    ],
    "deep": {
      "intro": "Diseñar watchdogs como mecanismo de recuperación de fallos y no como ritual de refresco incondicional.",
      "sections": [
        {
          "title": "Timeout",
          "body": "El contador independiente o periférico de watchdog expira si no recibe una secuencia de servicio a tiempo."
        },
        {
          "title": "Health gate",
          "body": "Una tarea supervisora puede comprobar heartbeats de subsistemas y refrescar solo si todos avanzan."
        },
        {
          "title": "Windowed",
          "body": "Un watchdog de ventana puede detectar refresh demasiado temprano además de demasiado tarde."
        },
        {
          "title": "Recovery",
          "body": "Reset puede restaurar servicio, pero también debes conservar diagnóstico mínimo y evitar boot loops permanentes."
        }
      ]
    },
    "example": {
      "problem": "Watchdog 250 ms; tarea saludable reporta cada 50 ms. Cuántos reportes caben idealmente antes del timeout.",
      "steps": [
        "250/50=5."
      ],
      "solution": "5."
    },
    "check": {
      "question": "¿Refrescar el watchdog en cada iteración de un loop bloqueable garantiza detectar bloqueos?",
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
      "feedback": "El refresh debe representar progreso saludable real."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Watchdog puede provocar reset tras timeout? sí/no",
        "answer": "si",
        "hint": "Uso típico."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Timeout 2 s, heartbeat 100 ms. Heartbeats por ventana ideal.",
        "answer": "20",
        "hint": "2000/100."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un watchdog de ventana puede detectar refresh demasiado temprano? sí/no",
        "answer": "si",
        "hint": "Ese es el objetivo de la ventana."
      }
    ]
  },
  "mcu-baremetal-boot": {
    "id": "mcu-baremetal-boot",
    "courseId": 53,
    "title": "Bare metal, startup y bootloaders",
    "shortTitle": "Bare metal/boot",
    "duration": 90,
    "objective": "Seguir el camino desde reset hasta main y diseñar un bootloader entendiendo startup, vector table, memoria, actualización y recuperación.",
    "summary": [
      "Bare metal significa que tu firmware controla directamente la plataforma sin un OS general; no significa ausencia de runtime/startup.",
      "Antes de main suelen inicializarse stack, .data, .bss, clocks y runtime según toolchain/plataforma.",
      "Un bootloader de actualización debe considerar integridad, autenticidad, power loss y camino de recuperación."
    ],
    "concept": "Bare metal significa que tu firmware controla directamente la plataforma sin un OS general; no significa ausencia de runtime/startup.",
    "rules": [
      "Comprende linker script y memory map.",
      "No saltes a una app sin establecer vector/stack/estado requeridos.",
      "Diseña actualización como transacción recuperable, no como overwrite ciego."
    ],
    "deep": {
      "intro": "Seguir el camino desde reset hasta main y diseñar un bootloader entendiendo startup, vector table, memoria, actualización y recuperación.",
      "sections": [
        {
          "title": "Reset/startup",
          "body": "Tras reset, el core toma su estado inicial según arquitectura; startup copia datos inicializados a RAM, limpia BSS y prepara el entorno."
        },
        {
          "title": "Linker",
          "body": "El linker script ubica código, datos, stack/heap y secciones especiales en Flash/SRAM. Direcciones incorrectas pueden producir firmware que compila pero no arranca."
        },
        {
          "title": "Bootloader",
          "body": "Decide si ejecutar app o modo update, valida imagen y transfiere control con el estado requerido por el core."
        },
        {
          "title": "Update seguro",
          "body": "CRC/hash detecta corrupción accidental; autenticidad frente a atacante requiere una construcción con clave/firma y una raíz de confianza adecuada."
        }
      ]
    },
    "example": {
      "problem": "Flash 256 KiB; bootloader 24 KiB. Espacio bruto restante para aplicación.",
      "steps": [
        "256-24=232."
      ],
      "solution": "232 KiB."
    },
    "check": {
      "question": "¿Un CRC por sí solo autentica firmware frente a un atacante que puede reemplazar imagen y CRC?",
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
          "Solo con UART",
          false
        ]
      ],
      "feedback": "CRC detecta errores accidentales; no aporta autenticidad criptográfica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Bare metal puede seguir necesitando startup antes de main? sí/no",
        "answer": "si",
        "hint": "Stack, data, bss, runtime."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "512 KiB flash - 32 KiB boot - 16 KiB metadata. Resto KiB.",
        "answer": "464",
        "hint": "512-32-16."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una actualización robusta debe considerar power loss durante escritura? sí/no",
        "answer": "si",
        "hint": "Evitar brick/imagen parcial."
      }
    ]
  },
  "mcu-realtime-integration": {
    "id": "mcu-realtime-integration",
    "courseId": 53,
    "title": "Firmware real-time: deadlines, DMA y arquitectura integrada",
    "shortTitle": "Tiempo real",
    "duration": 90,
    "objective": "Integrar timers, interrupciones, DMA, comunicaciones, watchdog y boot con deadlines medibles y una arquitectura no bloqueante.",
    "summary": [
      "Real-time significa cumplir restricciones temporales, no simplemente ejecutar rápido.",
      "Promedio bajo no demuestra deadline: importan worst-case execution time, blocking, jitter e interferencia.",
      "Busy-wait simplifica demos, pero consume presupuesto temporal y dificulta composición de subsistemas."
    ],
    "concept": "Real-time significa cumplir restricciones temporales, no simplemente ejecutar rápido.",
    "rules": [
      "Define periodos y deadlines antes de optimizar.",
      "Usa hardware para timestamp/trigger/transfer cuando reduce jitter.",
      "Mide latencia y holgura bajo carga máxima representativa."
    ],
    "deep": {
      "intro": "Integrar timers, interrupciones, DMA, comunicaciones, watchdog y boot con deadlines medibles y una arquitectura no bloqueante.",
      "sections": [
        {
          "title": "Pipeline",
          "body": "Timer → ADC → DMA → buffer → procesamiento → UART/SPI forma una cadena de productores/consumidores con ownership explícito."
        },
        {
          "title": "Deadline",
          "body": "Si una tarea periódica tiene periodo 1 ms y WCET 0.7 ms, la holgura local ideal es 0.3 ms antes de interferencias."
        },
        {
          "title": "No bloqueante",
          "body": "State machines, ring buffers y DMA permiten progresar varias actividades sin esperar ocupadamente cada periférico."
        },
        {
          "title": "Observabilidad",
          "body": "GPIO trace pins, cycle counters, timestamps, reset cause y telemetry permiten comprobar timing en hardware real."
        }
      ]
    },
    "example": {
      "problem": "Tarea cada 2 ms, WCET 1.35 ms. Holgura ideal antes de interferencias.",
      "steps": [
        "2-1.35=0.65."
      ],
      "solution": "0.65 ms."
    },
    "check": {
      "question": "¿Una tarea con 0.2 ms de tiempo promedio cumple necesariamente un deadline de 1 ms?",
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
          "Sí si usa DMA",
          false
        ]
      ],
      "feedback": "Necesitas acotar worst-case y blocking/interferencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Real-time significa únicamente alto throughput? sí/no",
        "answer": "no",
        "hint": "Lo esencial son restricciones temporales."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Periodo 5 ms, WCET 3.8 ms. Holgura ideal ms.",
        "answer": "1.2",
        "hint": "5-3.8."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Timer-trigger ADC + DMA puede reducir jitter de adquisición respecto a polling variable? sí/no",
        "answer": "si",
        "hint": "Hardware fija el instante y mueve muestras."
      }
    ]
  }
});
