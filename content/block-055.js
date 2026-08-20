/**
 * BLOQUE 055 — FPGA
 *
 * Regla editorial: HDL describe hardware concurrente; toda abstracción vuelve a recursos,
 * clocks, timing, CDC y restricciones físicas de implementación.
 */
window.LEARNING_PATHS[55] = {
  "level": "Experto práctico",
  "estimatedHours": 144,
  "description": "Diseño FPGA desde RTL y clocking hasta synthesis, timing closure, bloques dedicados, soft CPUs y gráficos hardware.",
  "outcomes": [
    "Diseñar RTL combinacional/secuencial verificable en Verilog/SystemVerilog y leer VHDL conceptualmente.",
    "Analizar CDC, setup/hold, constraints y timing closure sin esconder violaciones con excepciones falsas.",
    "Inferir y utilizar BRAM, DSP y recursos de clocking conscientemente.",
    "Construir una ALU/CPU pequeña y un pipeline de vídeo/gráficos dentro de una FPGA."
  ],
  "modules": [
    {
      "id": "m1-model",
      "title": "Modelo RTL",
      "description": "Arquitectura, HDL y lenguajes",
      "lessons": [
        "fpga-architecture",
        "fpga-hdl-rtl",
        "fpga-systemverilog",
        "fpga-vhdl"
      ]
    },
    {
      "id": "m2-logic-time",
      "title": "Lógica y tiempo",
      "description": "Combinacional, secuencial, CDC y STA",
      "lessons": [
        "fpga-combinational-alu",
        "fpga-sequential",
        "fpga-cdc",
        "fpga-timing"
      ]
    },
    {
      "id": "m3-implementation",
      "title": "Implementación física",
      "description": "Síntesis, place & route y bloques dedicados",
      "lessons": [
        "fpga-synthesis",
        "fpga-place-route",
        "fpga-bram",
        "fpga-dsp",
        "fpga-clocking"
      ]
    },
    {
      "id": "m4-systems",
      "title": "Sistemas sobre FPGA",
      "description": "Soft CPU, vídeo e integración",
      "lessons": [
        "fpga-softcpu",
        "fpga-video",
        "fpga-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "fpga-architecture": {
    "id": "fpga-architecture",
    "courseId": 55,
    "title": "FPGA: arquitectura programable, LUTs, flip-flops e interconexión",
    "shortTitle": "Arquitectura FPGA",
    "duration": 90,
    "objective": "Entender qué recursos físicos configura un bitstream y por qué una FPGA implementa circuitos concurrentes en lugar de ejecutar RTL como instrucciones.",
    "summary": [
      "Una FPGA contiene lógica programable, registros, interconexión, I/O y bloques especializados; el bitstream configura esos recursos para implementar un circuito.",
      "Piensa en hardware concurrente, no en ejecución línea a línea.",
      "Distingue recursos lógicos de rutas físicas y bloques dedicados."
    ],
    "concept": "Una FPGA contiene lógica programable, registros, interconexión, I/O y bloques especializados; el bitstream configura esos recursos para implementar un circuito.",
    "rules": [
      "Piensa en hardware concurrente, no en ejecución línea a línea.",
      "Distingue recursos lógicos de rutas físicas y bloques dedicados.",
      "Presupuesta LUTs, FFs, memoria, DSP, clocks e I/O, no solo líneas de HDL."
    ],
    "deep": {
      "intro": "Entender qué recursos físicos configura un bitstream y por qué una FPGA implementa circuitos concurrentes en lugar de ejecutar RTL como instrucciones.",
      "sections": [
        {
          "title": "Recursos",
          "body": "LUTs implementan funciones lógicas pequeñas; flip-flops almacenan estado; una red de routing conecta ambos y suele dominar parte importante del retardo."
        },
        {
          "title": "Configuración",
          "body": "El bitstream configura celdas, conexiones y bloques del dispositivo; no es un binario de CPU que recorra las sentencias HDL."
        },
        {
          "title": "Bloques dedicados",
          "body": "BRAM, DSP, PLL/MMCM, transceivers e I/O especializados evitan implementar todo con LUTs."
        },
        {
          "title": "Concurrencia",
          "body": "Dos procesos RTL independientes describen hardware que puede operar simultáneamente cada ciclo."
        }
      ]
    },
    "example": {
      "problem": "Diseño usa 18 000 LUT de un dispositivo con 60 000. Utilización.",
      "steps": [
        "18000/60000·100 = 30%."
      ],
      "solution": "30%."
    },
    "check": {
      "question": "¿Una FPGA ejecuta normalmente el HDL línea a línea como una CPU?",
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
          "Solo Verilog",
          false
        ]
      ],
      "feedback": "El HDL sintetizable describe estructura/comportamiento de hardware concurrente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿LUT y flip-flop son el mismo recurso? sí/no",
        "answer": "no",
        "hint": "Combinación frente a estado."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "9000 LUT de 45000. Utilización %.",
        "answer": "20",
        "hint": "9000/45000·100."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿50% LUT implica necesariamente 50% de routing o BRAM? sí/no",
        "answer": "no",
        "hint": "Los recursos tienen presupuestos distintos."
      }
    ]
  },
  "fpga-hdl-rtl": {
    "id": "fpga-hdl-rtl",
    "courseId": 55,
    "title": "HDL y RTL: describir hardware, simular y sintetizar",
    "shortTitle": "HDL y RTL",
    "duration": 90,
    "objective": "Separar descripción de hardware, simulación, síntesis y comportamiento físico implementado.",
    "summary": [
      "HDL puede modelar hardware a varios niveles; RTL sintetizable describe transferencias entre registros y lógica combinacional con una interpretación de hardware concreta.",
      "No asumas que todo constructo simulable es sintetizable.",
      "Expresa clocks, resets y estado de forma reconocible por la herramienta."
    ],
    "concept": "HDL puede modelar hardware a varios niveles; RTL sintetizable describe transferencias entre registros y lógica combinacional con una interpretación de hardware concreta.",
    "rules": [
      "No asumas que todo constructo simulable es sintetizable.",
      "Expresa clocks, resets y estado de forma reconocible por la herramienta.",
      "Usa testbench para verificar comportamiento; synthesis no sustituye simulación."
    ],
    "deep": {
      "intro": "Separar descripción de hardware, simulación, síntesis y comportamiento físico implementado.",
      "sections": [
        {
          "title": "Modelo",
          "body": "RTL suele organizar registros separados por lógica combinacional y control de enable/reset."
        },
        {
          "title": "Simulación",
          "body": "El simulador ejecuta un modelo de eventos y puede aceptar delays, archivos u objetos que no representan hardware sintetizable."
        },
        {
          "title": "Síntesis",
          "body": "Synthesis transforma el subconjunto soportado en una netlist lógica optimizada para la tecnología objetivo."
        },
        {
          "title": "Contrato",
          "body": "La semántica de simulación y la inferencia de hardware deben coincidir; warnings de latches, clocks o width no son decoración."
        }
      ]
    },
    "example": {
      "problem": "Registro de 32 bits actualizado a 100 MHz. Máximo de actualizaciones por segundo si cambia cada ciclo.",
      "steps": [
        "100 MHz = 100 000 000 ciclos/s."
      ],
      "solution": "100000000."
    },
    "check": {
      "question": "¿Todo código HDL que simula correctamente es sintetizable?",
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
          "Solo en FPGA",
          false
        ]
      ],
      "feedback": "Simulación admite construcciones sin equivalente sintetizable."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un testbench debe sintetizarse para verificar RTL? sí/no",
        "answer": "no",
        "hint": "Puede usar construcciones solo de simulación."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Clock 125 MHz. Periodo ns.",
        "answer": "8",
        "hint": "1/125e6 s."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Síntesis equivale a place-and-route? sí/no",
        "answer": "no",
        "hint": "La netlist lógica aún debe implementarse físicamente."
      }
    ]
  },
  "fpga-systemverilog": {
    "id": "fpga-systemverilog",
    "courseId": 55,
    "title": "Verilog/SystemVerilog sintetizable: tipos, procesos y asignaciones",
    "shortTitle": "SystemVerilog RTL",
    "duration": 90,
    "objective": "Escribir RTL claro evitando carreras y confusiones entre lógica combinacional y secuencial.",
    "summary": [
      "SystemVerilog amplía Verilog, pero el hardware resultante depende del subconjunto que la herramienta sintetiza y de la semántica temporal de las asignaciones.",
      "Usa always_comb para combinacional y always_ff para estado cuando el toolchain lo soporte.",
      "En lógica secuencial usa nonblocking para modelar actualización simultánea de registros."
    ],
    "concept": "SystemVerilog amplía Verilog, pero el hardware resultante depende del subconjunto que la herramienta sintetiza y de la semántica temporal de las asignaciones.",
    "rules": [
      "Usa always_comb para combinacional y always_ff para estado cuando el toolchain lo soporte.",
      "En lógica secuencial usa nonblocking para modelar actualización simultánea de registros.",
      "Da valor a todas las salidas combinacionales para no inferir latches accidentales."
    ],
    "deep": {
      "intro": "Escribir RTL claro evitando carreras y confusiones entre lógica combinacional y secuencial.",
      "sections": [
        {
          "title": "always_comb",
          "body": "Debe describir una función combinacional: cada salida recibe valor para todos los caminos relevantes."
        },
        {
          "title": "always_ff",
          "body": "Modela registros disparados por clock/reset y ayuda a hacer explícita la intención de estado."
        },
        {
          "title": "Blocking/nonblocking",
          "body": "Blocking actualiza en orden procedural; nonblocking agenda actualizaciones, modelando mejor bancos de registros concurrentes."
        },
        {
          "title": "Widths",
          "body": "Signedness, truncación y extensión de bits deben declararse conscientemente; una advertencia de width puede cambiar el circuito."
        }
      ]
    },
    "example": {
      "problem": "Bus de 12 bits tiene cuántos patrones binarios.",
      "steps": [
        "2^12 = 4096."
      ],
      "solution": "4096."
    },
    "check": {
      "question": "¿always_comb incompleto puede implicar memoria/latch no deseado?",
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
          "Solo en VHDL",
          false
        ]
      ],
      "feedback": "Una salida que conserva el valor anterior necesita estado; eso contradice la intención combinacional."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿nonblocking suele ser preferible para registros secuenciales? sí/no",
        "answer": "si",
        "hint": "Modela actualizaciones concurrentes al flanco."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Bus 10 bits. Patrones.",
        "answer": "1024",
        "hint": "2^10."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una warning de truncación puede ser funcionalmente relevante? sí/no",
        "answer": "si",
        "hint": "Puede perder bits de datos o signo."
      }
    ]
  },
  "fpga-vhdl": {
    "id": "fpga-vhdl",
    "courseId": 55,
    "title": "VHDL conceptualmente: entidades, arquitecturas, procesos y tipos",
    "shortTitle": "VHDL",
    "duration": 90,
    "objective": "Leer y razonar sobre VHDL suficiente para reconocer la misma arquitectura RTL expresada con otra sintaxis y sistema de tipos.",
    "summary": [
      "VHDL describe hardware mediante entities, architectures, signals, processes y un sistema de tipos fuerte; los principios de sincronía, combinacionalidad y timing no cambian por el lenguaje.",
      "Separa interfaz entity de implementación architecture.",
      "Distingue signal de variable y comprende cuándo se actualiza cada una."
    ],
    "concept": "VHDL describe hardware mediante entities, architectures, signals, processes y un sistema de tipos fuerte; los principios de sincronía, combinacionalidad y timing no cambian por el lenguaje.",
    "rules": [
      "Separa interfaz entity de implementación architecture.",
      "Distingue signal de variable y comprende cuándo se actualiza cada una.",
      "No confundas sintaxis distinta con arquitectura hardware distinta."
    ],
    "deep": {
      "intro": "Leer y razonar sobre VHDL suficiente para reconocer la misma arquitectura RTL expresada con otra sintaxis y sistema de tipos.",
      "sections": [
        {
          "title": "Entity",
          "body": "Declara interfaz, generics y ports del bloque."
        },
        {
          "title": "Architecture",
          "body": "Describe estructura o comportamiento asociado a la entity."
        },
        {
          "title": "Signals/processes",
          "body": "Los procesos reaccionan a eventos; las signals representan conexiones/estado con semántica de actualización propia."
        },
        {
          "title": "Tipos",
          "body": "El tipado fuerte puede hacer más explícitos widths, enumeraciones y conversiones, pero no elimina errores de arquitectura o CDC."
        }
      ]
    },
    "example": {
      "problem": "Contador unsigned de 8 bits antes de wrap tiene cuántos estados.",
      "steps": [
        "2^8=256."
      ],
      "solution": "256."
    },
    "check": {
      "question": "¿Cambiar Verilog por VHDL elimina la necesidad de timing constraints?",
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
          "Solo si todo es síncrono",
          false
        ]
      ],
      "feedback": "Timing pertenece al circuito y su implementación física, no a la sintaxis HDL."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Entity describe normalmente la interfaz del bloque? sí/no",
        "answer": "si",
        "hint": "Ports/generics."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Unsigned 6 bits. Estados.",
        "answer": "64",
        "hint": "2^6."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿VHDL y Verilog pueden describir el mismo circuito RTL? sí/no",
        "answer": "si",
        "hint": "El lenguaje no fija una arquitectura única."
      }
    ]
  },
  "fpga-combinational-alu": {
    "id": "fpga-combinational-alu",
    "courseId": 55,
    "title": "Lógica combinacional y proyecto ALU",
    "shortTitle": "Combinacional y ALU",
    "duration": 90,
    "objective": "Diseñar una ALU combinacional con flags, widths y caminos críticos explícitos.",
    "summary": [
      "La lógica combinacional produce salidas como función del estado actual de sus entradas; una ALU combina operadores y selección sin almacenar por sí sola historial.",
      "Asigna todas las salidas en todos los caminos.",
      "Define carry, borrow y overflow según interpretación signed/unsigned."
    ],
    "concept": "La lógica combinacional produce salidas como función del estado actual de sus entradas; una ALU combina operadores y selección sin almacenar por sí sola historial.",
    "rules": [
      "Asigna todas las salidas en todos los caminos.",
      "Define carry, borrow y overflow según interpretación signed/unsigned.",
      "Mide profundidad del camino crítico; una ALU grande puede necesitar pipeline."
    ],
    "deep": {
      "intro": "Diseñar una ALU combinacional con flags, widths y caminos críticos explícitos.",
      "sections": [
        {
          "title": "ALU",
          "body": "Un opcode selecciona suma, resta, AND, OR, shifts u otras funciones."
        },
        {
          "title": "Flags",
          "body": "Zero, negative, carry y overflow tienen semánticas distintas; carry no es overflow signed."
        },
        {
          "title": "Multiplexado",
          "body": "Cada operación adicional puede aumentar fan-in/profundidad si la arquitectura no se estructura."
        },
        {
          "title": "Proyecto",
          "body": "Construye una ALU parametrizable y verifica exhaustivamente anchos pequeños antes de escalar."
        }
      ]
    },
    "example": {
      "problem": "ALU 8-bit: 0xFF + 0x01 módulo 256.",
      "steps": [
        "255+1=256; low 8 bits = 0."
      ],
      "solution": "0."
    },
    "check": {
      "question": "¿Carry-out y overflow signed son la misma condición?",
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
          "Solo en suma",
          false
        ]
      ],
      "feedback": "Carry describe aritmética unsigned; overflow signed depende de signos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una ALU puramente combinacional conserva estado entre ciclos? sí/no",
        "answer": "no",
        "hint": "Necesitaría registros para estado."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "8-bit: 200+100 módulo 256.",
        "answer": "44",
        "hint": "300-256."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Añadir pipeline cambia la latencia en ciclos? sí/no",
        "answer": "si",
        "hint": "Aumenta registros/etapas aunque pueda mejorar frecuencia."
      }
    ]
  },
  "fpga-sequential": {
    "id": "fpga-sequential",
    "courseId": 55,
    "title": "Lógica secuencial: registros, FSM, enables y reset",
    "shortTitle": "Secuencial y FSM",
    "duration": 90,
    "objective": "Diseñar estado síncrono con FSMs y resets conscientes de recuperación, fanout y timing.",
    "summary": [
      "La lógica secuencial captura estado en flancos de reloj; el circuito siguiente depende de entradas presentes y del estado almacenado.",
      "Usa un único dominio de clock por registro salvo primitivas específicas.",
      "Define estado inicial/recuperación sin asumir que reset global es gratis."
    ],
    "concept": "La lógica secuencial captura estado en flancos de reloj; el circuito siguiente depende de entradas presentes y del estado almacenado.",
    "rules": [
      "Usa un único dominio de clock por registro salvo primitivas específicas.",
      "Define estado inicial/recuperación sin asumir que reset global es gratis.",
      "Evita generar clocks con lógica ordinaria; prefiere clock enables cuando corresponda."
    ],
    "deep": {
      "intro": "Diseñar estado síncrono con FSMs y resets conscientes de recuperación, fanout y timing.",
      "sections": [
        {
          "title": "Registro",
          "body": "Un flip-flop captura D alrededor del flanco sujeto a setup/hold."
        },
        {
          "title": "FSM",
          "body": "Separa estado, next-state y outputs según Mealy/Moore cuando ayude a verificar."
        },
        {
          "title": "Enable",
          "body": "Un clock enable conserva el dominio y suele ser preferible a un clock fabricado por LUTs."
        },
        {
          "title": "Reset",
          "body": "Synchronous/asynchronous reset tienen consecuencias de routing, control sets y recovery/removal según dispositivo."
        }
      ]
    },
    "example": {
      "problem": "FSM de 9 estados. Bits mínimos de codificación binaria.",
      "steps": [
        "ceil(log2(9))=4."
      ],
      "solution": "4."
    },
    "check": {
      "question": "¿Dividir un clock con una LUT crea automáticamente un clock limpio y bien distribuido?",
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
          "Solo a baja frecuencia",
          false
        ]
      ],
      "feedback": "Los clocks requieren recursos/routing y constraints apropiados."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "FSM 5 estados. Bits mínimos binarios.",
        "answer": "3",
        "hint": "ceil(log2 5)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Clock enable conserva normalmente el mismo dominio de reloj? sí/no",
        "answer": "si",
        "hint": "El registro sigue viendo el clock original."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Reset asíncrono tiene coste/constraints físicos irrelevantes? sí/no",
        "answer": "no",
        "hint": "Recovery/removal, routing y control sets importan."
      }
    ]
  },
  "fpga-cdc": {
    "id": "fpga-cdc",
    "courseId": 55,
    "title": "Clock Domain Crossing: metastabilidad, synchronizers y handshakes",
    "shortTitle": "CDC",
    "duration": 90,
    "objective": "Transferir señales entre dominios de reloj sin suponer sincronía inexistente ni aplicar dos flip-flops indiscriminadamente.",
    "summary": [
      "Cuando una señal se muestrea asíncronamente respecto al clock receptor puede violar setup/hold y dejar un registro metastable; CDC diseña cómo contener y comunicar esa incertidumbre.",
      "Para un bit de nivel lento usa una cadena synchronizer apropiada; no la generalices a buses coherentes.",
      "Usa handshake, toggle o pulse-stretching para eventos según relación de clocks."
    ],
    "concept": "Cuando una señal se muestrea asíncronamente respecto al clock receptor puede violar setup/hold y dejar un registro metastable; CDC diseña cómo contener y comunicar esa incertidumbre.",
    "rules": [
      "Para un bit de nivel lento usa una cadena synchronizer apropiada; no la generalices a buses coherentes.",
      "Usa handshake, toggle o pulse-stretching para eventos según relación de clocks.",
      "Para flujos multibit usa async FIFO o protocolos que garanticen coherencia."
    ],
    "deep": {
      "intro": "Transferir señales entre dominios de reloj sin suponer sincronía inexistente ni aplicar dos flip-flops indiscriminadamente.",
      "sections": [
        {
          "title": "Metastabilidad",
          "body": "No puede eliminarse probabilísticamente; se da tiempo de resolución para reducir muchísimo la probabilidad de propagación."
        },
        {
          "title": "Single-bit",
          "body": "Dos o más FF en el dominio receptor son una técnica típica para niveles independientes, con MTBF dependiente de tecnología y clocks."
        },
        {
          "title": "Eventos",
          "body": "Un pulso más estrecho que el periodo receptor puede perderse; handshake/toggle evita asumir que será observado."
        },
        {
          "title": "Bus/FIFO",
          "body": "Sincronizar cada bit por separado no garantiza palabra coherente; una async FIFO usa almacenamiento dual-clock y punteros codificados/apropiados."
        }
      ]
    },
    "example": {
      "problem": "Clock receptor 100 MHz. Periodo ns.",
      "steps": [
        "1/100e6=10 ns."
      ],
      "solution": "10."
    },
    "check": {
      "question": "¿Dos synchronizer FF por cada bit de un bus garantizan una palabra coherente?",
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
          "Solo si el bus es de 8 bits",
          false
        ]
      ],
      "feedback": "Cada bit puede resolverse en ciclos distintos; usa protocolo/FIFO coherente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Clock 50 MHz. Periodo ns.",
        "answer": "20",
        "hint": "1/50e6."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La metastabilidad puede hacerse probabilidad exactamente cero con 2 FF? sí/no",
        "answer": "no",
        "hint": "Se reduce, no se elimina matemáticamente."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un pulso estrecho puede perderse al cruzar a un clock más lento? sí/no",
        "answer": "si",
        "hint": "Necesita protocolo o stretching."
      }
    ]
  },
  "fpga-timing": {
    "id": "fpga-timing",
    "courseId": 55,
    "title": "Timing: setup, hold, constraints y análisis estático",
    "shortTitle": "Timing y STA",
    "duration": 90,
    "objective": "Leer slack, definir clocks y distinguir caminos máximos/mínimos, constraints reales y excepciones justificadas.",
    "summary": [
      "Static Timing Analysis comprueba relaciones temporales de caminos bajo clocks y constraints sin necesitar enumerar vectores de entrada.",
      "Constraint incorrecto puede producir un diseño “verde” que no representa el requisito real.",
      "Setup usa principalmente el camino máximo; hold el mínimo."
    ],
    "concept": "Static Timing Analysis comprueba relaciones temporales de caminos bajo clocks y constraints sin necesitar enumerar vectores de entrada.",
    "rules": [
      "Constraint incorrecto puede producir un diseño “verde” que no representa el requisito real.",
      "Setup usa principalmente el camino máximo; hold el mínimo.",
      "No uses false-path o multicycle para esconder violaciones sin justificar la relación funcional."
    ],
    "deep": {
      "intro": "Leer slack, definir clocks y distinguir caminos máximos/mínimos, constraints reales y excepciones justificadas.",
      "sections": [
        {
          "title": "Setup",
          "body": "El dato debe llegar con suficiente antelación al flanco de captura; frecuencia, skew y delay máximo importan."
        },
        {
          "title": "Hold",
          "body": "El dato no debe cambiar demasiado pronto después del flanco; bajar frecuencia no arregla automáticamente un hold violation."
        },
        {
          "title": "Slack",
          "body": "Slack positivo indica margen respecto al constraint analizado; negativo indica violación."
        },
        {
          "title": "Constraints",
          "body": "Clocks generados, I/O delays, asynchronous groups y exceptions forman parte de la especificación temporal del sistema."
        }
      ]
    },
    "example": {
      "problem": "Required 8 ns, arrival 9.3 ns. Setup slack.",
      "steps": [
        "8-9.3=-1.3 ns."
      ],
      "solution": "-1.3."
    },
    "check": {
      "question": "¿Reducir la frecuencia corrige necesariamente una violación de hold?",
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
          "Siempre en FPGA",
          false
        ]
      ],
      "feedback": "Hold depende del camino mínimo y relación local alrededor del flanco."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Required 5 ns, arrival 4.2 ns. Slack ns.",
        "answer": "0.8",
        "hint": "5-4.2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Slack negativo significa timing violation? sí/no",
        "answer": "si",
        "hint": "No se cumplió el constraint."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿False path debe usarse solo porque un camino falla timing? sí/no",
        "answer": "no",
        "hint": "Debe ser funcionalmente falso para el análisis pertinente."
      }
    ]
  },
  "fpga-synthesis": {
    "id": "fpga-synthesis",
    "courseId": 55,
    "title": "Synthesis e inferencia: de RTL a netlist",
    "shortTitle": "Síntesis",
    "duration": 90,
    "objective": "Entender cómo coding style, parámetros y constraints influyen en lógica inferida sin confundir síntesis con implementación física.",
    "summary": [
      "Synthesis elabora RTL, infiere operadores/memorias, optimiza lógica y produce una netlist tecnológica que después debe colocarse y rutearse.",
      "Revisa reports de inferencia y warnings, no supongas que el RTL produjo el bloque deseado.",
      "Escribe patrones compatibles con BRAM/DSP cuando quieras inferencia dedicada."
    ],
    "concept": "Synthesis elabora RTL, infiere operadores/memorias, optimiza lógica y produce una netlist tecnológica que después debe colocarse y rutearse.",
    "rules": [
      "Revisa reports de inferencia y warnings, no supongas que el RTL produjo el bloque deseado.",
      "Escribe patrones compatibles con BRAM/DSP cuando quieras inferencia dedicada.",
      "Compara area, timing estimado y estructura; optimizar una métrica puede empeorar otra."
    ],
    "deep": {
      "intro": "Entender cómo coding style, parámetros y constraints influyen en lógica inferida sin confundir síntesis con implementación física.",
      "sections": [
        {
          "title": "Elaboration",
          "body": "Generics/parameters y hierarchy se concretan para construir el diseño lógico."
        },
        {
          "title": "Inference",
          "body": "Arrays, multiplicaciones, muxes y FSM pueden mapearse a recursos dedicados o lógica general según estilo/target."
        },
        {
          "title": "Optimization",
          "body": "Constant propagation, resource sharing, retiming u otras transformaciones pueden cambiar la netlist sin cambiar funcionalidad."
        },
        {
          "title": "Reports",
          "body": "LUT/FF/BRAM/DSP counts y inferred objects son evidencia del circuito resultante."
        }
      ]
    },
    "example": {
      "problem": "32 multiplicadores lógicos, synthesis comparte 8 por scheduling externo. Reducción de instancias.",
      "steps": [
        "32-8=24."
      ],
      "solution": "24."
    },
    "check": {
      "question": "¿Un array RTL se convierte necesariamente en BRAM?",
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
          "Solo en SystemVerilog",
          false
        ]
      ],
      "feedback": "Depende de tamaño, puertos, estilo de acceso, target y herramienta."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Synthesis produce normalmente placement final? sí/no",
        "answer": "no",
        "hint": "Produce netlist antes de implementación física."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "64 operaciones mapeadas a 16 DSP. Reducción de instancias dedicadas respecto a una por operación.",
        "answer": "48",
        "hint": "64-16."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Hay que revisar el report de memoria inferida? sí/no",
        "answer": "si",
        "hint": "Confirma qué hardware se creó."
      }
    ]
  },
  "fpga-place-route": {
    "id": "fpga-place-route",
    "courseId": 55,
    "title": "Place & route y timing closure",
    "shortTitle": "Place & route",
    "duration": 90,
    "objective": "Relacionar placement, routing, congestion, fanout y pipelining con frecuencia alcanzable y reproducibilidad de implementación.",
    "summary": [
      "Implementation asigna la netlist a recursos físicos y rutas reales; el retardo de interconexión puede transformar una lógica correcta en un diseño que no cumple timing.",
      "Mide post-route timing; estimaciones pre-route no son cierre final.",
      "Pipelinea caminos largos y reduce fanout/congestión antes de micro-optimizar sintaxis."
    ],
    "concept": "Implementation asigna la netlist a recursos físicos y rutas reales; el retardo de interconexión puede transformar una lógica correcta en un diseño que no cumple timing.",
    "rules": [
      "Mide post-route timing; estimaciones pre-route no son cierre final.",
      "Pipelinea caminos largos y reduce fanout/congestión antes de micro-optimizar sintaxis.",
      "Trata timing closure como iteración entre arquitectura, constraints y layout automático/físico."
    ],
    "deep": {
      "intro": "Relacionar placement, routing, congestion, fanout y pipelining con frecuencia alcanzable y reproducibilidad de implementación.",
      "sections": [
        {
          "title": "Placement",
          "body": "El placer decide qué LUT/FF/BRAM/DSP físicos implementan cada celda."
        },
        {
          "title": "Routing",
          "body": "El router selecciona recursos de interconexión; distancia y congestión añaden delay."
        },
        {
          "title": "Closure",
          "body": "Una violación puede requerir pipeline, floorplanning, duplicación de drivers o arquitectura distinta, no solo una opción de tool."
        },
        {
          "title": "Reproducibilidad",
          "body": "Seeds/estrategias pueden cambiar resultados; automatiza reports y conserva constraints/versiones para comparar."
        }
      ]
    },
    "example": {
      "problem": "Objetivo 200 MHz. Periodo requerido ns.",
      "steps": [
        "1/200e6=5 ns."
      ],
      "solution": "5."
    },
    "check": {
      "question": "¿Timing limpio después de synthesis garantiza timing limpio post-route?",
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
          "Solo si LUT<50%",
          false
        ]
      ],
      "feedback": "Routing y placement añaden retardos físicos reales."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "250 MHz. Periodo ns.",
        "answer": "4",
        "hint": "1/250e6."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Congestión puede empeorar timing? sí/no",
        "answer": "si",
        "hint": "Puede forzar rutas largas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Pipelining suele intercambiar latencia por mayor frecuencia posible? sí/no",
        "answer": "si",
        "hint": "Añade registros/etapas."
      }
    ]
  },
  "fpga-bram": {
    "id": "fpga-bram",
    "courseId": 55,
    "title": "BRAM y memorias on-chip: puertos, latencia e inferencia",
    "shortTitle": "BRAM",
    "duration": 90,
    "objective": "Diseñar buffers y memorias internas respetando puertos, latencia, modos read-during-write y capacidad física.",
    "summary": [
      "Block RAM es memoria dedicada on-chip con geometrías y puertos concretos; no se comporta como un array abstracto de lectura combinacional ilimitada.",
      "Cuenta bits y puertos necesarios, no solo profundidad.",
      "Pipelinea lecturas cuando la frecuencia lo requiera y acepta su latencia."
    ],
    "concept": "Block RAM es memoria dedicada on-chip con geometrías y puertos concretos; no se comporta como un array abstracto de lectura combinacional ilimitada.",
    "rules": [
      "Cuenta bits y puertos necesarios, no solo profundidad.",
      "Pipelinea lecturas cuando la frecuencia lo requiera y acepta su latencia.",
      "Define semántica de lectura/escritura simultánea y no dependas de comportamiento ambiguo."
    ],
    "deep": {
      "intro": "Diseñar buffers y memorias internas respetando puertos, latencia, modos read-during-write y capacidad física.",
      "sections": [
        {
          "title": "Capacidad",
          "body": "La memoria se organiza en bloques físicos con anchuras/profundidades configurables; desperdicio de fragmentación puede importar."
        },
        {
          "title": "Puertos",
          "body": "Simple/dual-port permiten ciertas combinaciones, pero dos ports no equivalen a accesos ilimitados."
        },
        {
          "title": "Latencia",
          "body": "Salidas registradas mejoran timing a cambio de ciclos adicionales; herramientas actuales incluso recomiendan registros para frecuencia alta."
        },
        {
          "title": "Buffers",
          "body": "Line buffers, FIFOs, frame tiles y lookup tables son usos típicos donde el patrón de acceso define la arquitectura."
        }
      ]
    },
    "example": {
      "problem": "Framebuffer 320×240 de 8 bits. Bytes.",
      "steps": [
        "320·240·1 = 76800."
      ],
      "solution": "76800."
    },
    "check": {
      "question": "¿BRAM ofrece un número ilimitado de lecturas independientes por ciclo?",
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
          "Solo si es dual-port",
          false
        ]
      ],
      "feedback": "El número de puertos físicos es limitado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "1024 palabras × 32 bits. Bytes.",
        "answer": "4096",
        "hint": "1024·32/8."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Registrar salida BRAM puede añadir latencia? sí/no",
        "answer": "si",
        "hint": "A cambio puede facilitar timing."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Read-during-write debe asumirse idéntico en todo dispositivo? sí/no",
        "answer": "no",
        "hint": "Consulta modo/primitiva/target."
      }
    ]
  },
  "fpga-dsp": {
    "id": "fpga-dsp",
    "courseId": 55,
    "title": "DSP blocks: multiplicación, acumulación y pipelines numéricos",
    "shortTitle": "DSP blocks",
    "duration": 90,
    "objective": "Mapear aritmética intensa a bloques DSP y diseñar pipelines de throughput alto con widths y saturación explícitos.",
    "summary": [
      "Muchas FPGAs integran bloques DSP dedicados para multiplicación, suma, acumulación y pre/post-processing con registros internos para frecuencia alta.",
      "Alinea widths y signedness con el bloque objetivo cuando importe eficiencia.",
      "Usa registros de pipeline internos cuando el throughput/fmax lo requiera."
    ],
    "concept": "Muchas FPGAs integran bloques DSP dedicados para multiplicación, suma, acumulación y pre/post-processing con registros internos para frecuencia alta.",
    "rules": [
      "Alinea widths y signedness con el bloque objetivo cuando importe eficiencia.",
      "Usa registros de pipeline internos cuando el throughput/fmax lo requiera.",
      "Distingue throughput de latencia: un pipeline puede aceptar una muestra por ciclo y tardar varios ciclos en devolverla."
    ],
    "deep": {
      "intro": "Mapear aritmética intensa a bloques DSP y diseñar pipelines de throughput alto con widths y saturación explícitos.",
      "sections": [
        {
          "title": "MAC",
          "body": "Filtros FIR, transforms y control digital usan operaciones multiply-accumulate repetitivas."
        },
        {
          "title": "Pipeline",
          "body": "Registros dentro/alrededor del DSP acortan caminos combinacionales y elevan fmax."
        },
        {
          "title": "Precisión",
          "body": "Productos amplían width; truncar, redondear o saturar son decisiones numéricas, no detalles del sintetizador."
        },
        {
          "title": "Recursos",
          "body": "Si faltan DSP, synthesis puede compartir o mapear parte a LUTs, alterando latencia/area/timing."
        }
      ]
    },
    "example": {
      "problem": "Filtro FIR de 24 taps, una MAC dedicada por tap. Multiplicaciones por muestra.",
      "steps": [
        "24."
      ],
      "solution": "24."
    },
    "check": {
      "question": "¿Pipeline de 6 etapas puede tener throughput de una muestra por ciclo tras llenarse?",
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
          "Solo con 6 clocks",
          false
        ]
      ],
      "feedback": "Latencia y throughput son métricas diferentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "16 taps a 100 Msamples/s. MAC/s si una por tap.",
        "answer": "1600000000",
        "hint": "16·100e6."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Producto 16×16 cabe siempre exacto en 16 bits? sí/no",
        "answer": "no",
        "hint": "Puede necesitar hasta 32 bits."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Usar DSP block elimina la necesidad de pipeline? sí/no",
        "answer": "no",
        "hint": "Fmax y routing siguen importando."
      }
    ]
  },
  "fpga-clocking": {
    "id": "fpga-clocking",
    "courseId": 55,
    "title": "PLL/MMCM, redes de clock y reset entre dominios",
    "shortTitle": "Clocking",
    "duration": 90,
    "objective": "Generar y distribuir clocks con recursos dedicados y diseñar reset/lock sequencing seguro.",
    "summary": [
      "PLLs/MMCMs y redes globales generan, condicionan y distribuyen clocks; crear un nuevo dominio cambia tanto timing como CDC y reset.",
      "Declara cada clock derivado con sus relaciones/constraints correctos.",
      "No uses lógica ordinaria como clock mux/divider salvo arquitectura explícitamente soportada."
    ],
    "concept": "PLLs/MMCMs y redes globales generan, condicionan y distribuyen clocks; crear un nuevo dominio cambia tanto timing como CDC y reset.",
    "rules": [
      "Declara cada clock derivado con sus relaciones/constraints correctos.",
      "No uses lógica ordinaria como clock mux/divider salvo arquitectura explícitamente soportada.",
      "Sincroniza la liberación de reset en cada dominio cuando el diseño lo requiera."
    ],
    "deep": {
      "intro": "Generar y distribuir clocks con recursos dedicados y diseñar reset/lock sequencing seguro.",
      "sections": [
        {
          "title": "PLL/MMCM",
          "body": "Pueden multiplicar/dividir frecuencia, ajustar fase y filtrar jitter dentro de límites específicos del dispositivo."
        },
        {
          "title": "Clock networks",
          "body": "Buffers globales/regionales distribuyen clocks con skew controlado mejor que routing general."
        },
        {
          "title": "Lock",
          "body": "Una salida de clock no debe asumirse utilizable instantáneamente durante arranque o reconfiguración; lock/reset sequencing importa."
        },
        {
          "title": "Reset domains",
          "body": "Asynchronous assertion puede ser útil, pero deassertion suele necesitar sincronización para evitar recovery/removal inconsistentes."
        }
      ]
    },
    "example": {
      "problem": "Entrada 25 MHz, multiplicación ×20 y división ÷5. Salida MHz.",
      "steps": [
        "25·20/5=100."
      ],
      "solution": "100."
    },
    "check": {
      "question": "¿Crear un segundo clock con PLL introduce automáticamente un nuevo problema CDC respecto al primero?",
      "options": [
        [
          "Puede requerir análisis",
          true
        ],
        [
          "Nunca",
          false
        ],
        [
          "Solo si es más lento",
          false
        ]
      ],
      "feedback": "La relación exacta de frecuencia/fase y constraints determina si el cruce es síncrono o asíncrono."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "50 MHz ×12 ÷6. MHz.",
        "answer": "100",
        "hint": "50·12/6."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una PLL puede usarse fuera de cualquier rango sin restricciones? sí/no",
        "answer": "no",
        "hint": "Hay rangos VCO/input/output específicos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Deassert de reset asíncrono merece análisis por dominio? sí/no",
        "answer": "si",
        "hint": "Recovery/removal y sincronización importan."
      }
    ]
  },
  "fpga-softcpu": {
    "id": "fpga-softcpu",
    "courseId": 55,
    "title": "Soft CPUs y proyecto CPU: hardware configurable + software",
    "shortTitle": "Soft CPU y CPU",
    "duration": 90,
    "objective": "Entender qué es una soft CPU y construir una CPU pequeña para conectar ISA, datapath, memoria y periféricos dentro de FPGA.",
    "summary": [
      "Una soft CPU es una arquitectura de procesador implementada con recursos programables de la FPGA; ocupa LUTs/FF/BRAM y puede personalizarse junto con periféricos.",
      "Distingue soft CPU de hard CPU integrada físicamente en un SoC.",
      "Presupuesta CPU, memoria e interconnect como recursos del mismo FPGA."
    ],
    "concept": "Una soft CPU es una arquitectura de procesador implementada con recursos programables de la FPGA; ocupa LUTs/FF/BRAM y puede personalizarse junto con periféricos.",
    "rules": [
      "Distingue soft CPU de hard CPU integrada físicamente en un SoC.",
      "Presupuesta CPU, memoria e interconnect como recursos del mismo FPGA.",
      "Para una CPU educativa separa fetch, decode, execute, memory y writeback aunque luego simplifiques etapas."
    ],
    "deep": {
      "intro": "Entender qué es una soft CPU y construir una CPU pequeña para conectar ISA, datapath, memoria y periféricos dentro de FPGA.",
      "sections": [
        {
          "title": "Soft core",
          "body": "MicroBlaze/MicroBlaze V y otros cores se sintetizan dentro de la lógica programable y pueden configurarse según la plataforma."
        },
        {
          "title": "Datapath",
          "body": "PC, register file, ALU y muxes implementan movimiento y transformación de datos."
        },
        {
          "title": "Control",
          "body": "Decoder/FSM o pipeline genera enables, selects y memoria según la ISA."
        },
        {
          "title": "SoC",
          "body": "BRAM, UART, timers y buses memory-mapped convierten la CPU en un pequeño sistema programable dentro del FPGA."
        }
      ]
    },
    "example": {
      "problem": "CPU a 80 MHz con CPI medio 2. IPC equivalente.",
      "steps": [
        "IPC=1/CPI=0.5."
      ],
      "solution": "0.5."
    },
    "check": {
      "question": "¿Una soft CPU está necesariamente fabricada como un core fijo de silicio?",
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
          "Solo MicroBlaze",
          false
        ]
      ],
      "feedback": "Se implementa usando recursos programables; un hard core es otra categoría."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "CPI 4. IPC.",
        "answer": "0.25",
        "hint": "1/4."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿BRAM puede albergar instruction/data memory de una soft CPU pequeña? sí/no",
        "answer": "si",
        "hint": "Es un uso típico."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cambiar el RTL de la soft CPU puede cambiar recursos y timing? sí/no",
        "answer": "si",
        "hint": "Es hardware sintetizado."
      }
    ]
  },
  "fpga-video": {
    "id": "fpga-video",
    "courseId": 55,
    "title": "Controlador de vídeo y hardware gráfico sencillo",
    "shortTitle": "Vídeo y gráficos",
    "duration": 90,
    "objective": "Generar timing de vídeo y un pipeline gráfico streaming con contadores, memoria y latencia alineada.",
    "summary": [
      "Un controlador de vídeo produce coordenadas/timing a ritmo de píxel; hardware gráfico puede generar color como pipeline determinista sin framebuffer completo.",
      "Separa active area de blanking/sync y deriva todo del pixel clock real.",
      "Alinea señales de control con la latencia del pipeline de píxel."
    ],
    "concept": "Un controlador de vídeo produce coordenadas/timing a ritmo de píxel; hardware gráfico puede generar color como pipeline determinista sin framebuffer completo.",
    "rules": [
      "Separa active area de blanking/sync y deriva todo del pixel clock real.",
      "Alinea señales de control con la latencia del pipeline de píxel.",
      "No asumas que un framebuffer completo cabe en BRAM; calcula capacidad y bandwidth."
    ],
    "deep": {
      "intro": "Generar timing de vídeo y un pipeline gráfico streaming con contadores, memoria y latencia alineada.",
      "sections": [
        {
          "title": "Raster timing",
          "body": "Contadores horizontal/vertical recorren píxeles activos y periodos de porch/sync definidos por el modo de vídeo."
        },
        {
          "title": "Pipeline",
          "body": "Sprites, tilemaps, paletas y mezclado pueden procesarse una muestra por ciclo con latencias conocidas."
        },
        {
          "title": "Memoria",
          "body": "Line buffers o tile/sprite RAM reducen almacenamiento frente a framebuffer completo cuando la arquitectura lo permite."
        },
        {
          "title": "Bandwidth",
          "body": "Resolución, bytes/pixel y refresh determinan tráfico; external memory puede convertirse en cuello de botella."
        }
      ]
    },
    "example": {
      "problem": "640×480, 8 bits/pixel. Framebuffer bytes sin padding.",
      "steps": [
        "640·480=307200 bytes."
      ],
      "solution": "307200."
    },
    "check": {
      "question": "¿Un generador procedural de píxeles necesita obligatoriamente framebuffer completo?",
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
          "Solo para VGA",
          false
        ]
      ],
      "feedback": "Puede producir cada píxel en streaming si el efecto lo permite."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "320×240×16 bpp. Bytes.",
        "answer": "153600",
        "hint": "320·240·2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La latencia de BRAM debe compensarse en señales de sync/coordenadas? sí/no",
        "answer": "si",
        "hint": "Datos y control deben permanecer alineados."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿60 Hz de frame equivale al pixel clock? sí/no",
        "answer": "no",
        "hint": "El pixel clock incluye todos los píxeles/blanking por frame."
      }
    ]
  },
  "fpga-integration": {
    "id": "fpga-integration",
    "courseId": 55,
    "title": "Proyecto FPGA integrado: verificación, recursos, timing y bring-up",
    "shortTitle": "Proyecto integrado",
    "duration": 90,
    "objective": "Integrar ALU/CPU, memoria, CDC y vídeo con un flujo reproducible de simulación, synthesis, implementation y depuración en placa.",
    "summary": [
      "Un proyecto FPGA termina cuando comportamiento, constraints, timing, recursos e I/O físicos están verificados conjuntamente; “simula bien” es solo una etapa.",
      "Automatiza testbenches, builds y extracción de reports.",
      "Cierra timing antes de atribuir fallos de placa al HDL funcional."
    ],
    "concept": "Un proyecto FPGA termina cuando comportamiento, constraints, timing, recursos e I/O físicos están verificados conjuntamente; “simula bien” es solo una etapa.",
    "rules": [
      "Automatiza testbenches, builds y extracción de reports.",
      "Cierra timing antes de atribuir fallos de placa al HDL funcional.",
      "Añade observabilidad interna con counters/debug cores sin olvidar que el debug también consume recursos y altera timing."
    ],
    "deep": {
      "intro": "Integrar ALU/CPU, memoria, CDC y vídeo con un flujo reproducible de simulación, synthesis, implementation y depuración en placa.",
      "sections": [
        {
          "title": "Flujo",
          "body": "lint/sim → synthesis → implementation → STA → bitstream → programming → hardware tests."
        },
        {
          "title": "Verification",
          "body": "Testbenches auto-checking comparan DUT con modelo/reference y cubren corner cases antes de usar la placa como osciloscopio caro."
        },
        {
          "title": "Bring-up",
          "body": "Verifica clocks, reset, pin constraints e interfaces simples antes de habilitar toda la arquitectura."
        },
        {
          "title": "Presupuesto",
          "body": "Entrega LUT/FF/BRAM/DSP, WNS/TNS, frecuencia, latency, bandwidth y pruebas de CDC junto con funcionalidad."
        }
      ]
    },
    "example": {
      "problem": "Target 100 MHz; critical path 11 ns. Frecuencia aproximada máxima por ese path en MHz.",
      "steps": [
        "1/11 ns ≈ 90.91 MHz."
      ],
      "solution": "90.91."
    },
    "check": {
      "question": "¿Una simulación funcional correcta demuestra por sí sola que el bitstream cumplirá timing?",
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
          "Solo si no usa BRAM",
          false
        ]
      ],
      "feedback": "Timing físico, constraints y routing se verifican después."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Critical path 8 ns. Fmax ideal MHz.",
        "answer": "125",
        "hint": "1/8e-9."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un debug core interno consume recursos FPGA? sí/no",
        "answer": "si",
        "hint": "Lógica, memoria y routing."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Pin constraints incorrectos pueden hacer fallar hardware aunque RTL sea correcto? sí/no",
        "answer": "si",
        "hint": "La conexión física forma parte del diseño."
      }
    ]
  }
});
