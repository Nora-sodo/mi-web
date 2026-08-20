/**
 * BLOQUE 016 — Redes físicas
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar fenómeno físico, representación, estándar y métrica.
 * Señal, símbolo, bit, bandwidth, bitrate y throughput no son sinónimos.
 */

window.LEARNING_PATHS[16] = {
  "level": "Experto progresivo",
  "estimatedHours": 58,
  "description": "Cómo viajan físicamente los bits: señales, espectro, ruido, modulación, coding, cobre, fibra, radio, Wi-Fi y Ethernet PHY, con medición y presupuestos de enlace.",
  "outcomes": [
    "Distinguir señal, símbolo, bit, tasa, ancho de banda y latencia usando modelos y unidades correctos.",
    "Calcular SNR, límites de capacidad, serialización, propagación, reflexiones y presupuestos de potencia dentro de sus supuestos.",
    "Explicar compromisos de modulación, line coding, cobre, fibra y radio sin confundir estándares con leyes físicas.",
    "Analizar PHY de Wi-Fi/Ethernet y diseñar mediciones de BER/jitter/margen para validar un enlace real."
  ],
  "modules": [
    {
      "id": "m1-signal-channel",
      "title": "Señal y canal",
      "description": "Formas de onda, espectro, latencia, ruido y capacidad.",
      "lessons": [
        "phy-signals-waveforms",
        "phy-bandwidth-latency",
        "phy-noise-snr-capacity"
      ]
    },
    {
      "id": "m2-representation",
      "title": "Representación física",
      "description": "Modulación, símbolos y codificación de línea.",
      "lessons": [
        "phy-modulation-symbols",
        "phy-line-coding"
      ]
    },
    {
      "id": "m3-media",
      "title": "Medios de transmisión",
      "description": "Cobre, fibra y radio con sus pérdidas y distorsiones.",
      "lessons": [
        "phy-copper-transmission-lines",
        "phy-optical-fiber",
        "phy-radio-propagation"
      ]
    },
    {
      "id": "m4-phys",
      "title": "PHY reales y validación",
      "description": "Wi-Fi, Ethernet y medición de enlaces.",
      "lessons": [
        "phy-wifi",
        "phy-ethernet",
        "phy-measurement-link-budget",
        "phy-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "phy-signals-waveforms": {
    "id": "phy-signals-waveforms",
    "courseId": 16,
    "title": "Señales físicas: amplitud, tiempo, frecuencia y fase",
    "shortTitle": "Una señal no es un bit",
    "duration": 95,
    "objective": "modelar una señal eléctrica, óptica o electromagnética como una magnitud física variable y distinguir forma de onda, símbolo y dato.",
    "summary": [
      "Una señal es una magnitud física medible que varía en tiempo/espacio; un bit es una interpretación discreta.",
      "Frecuencia, periodo, amplitud y fase describen componentes o formas de onda, no “el significado” del dato.",
      "Las señales reales tienen espectro y transitorios; ninguna arista física es infinitamente rápida."
    ],
    "concept": "La capa física transforma estados lógicos y símbolos en fenómenos medibles: tensiones/corrientes, potencia óptica o campos electromagnéticos. El receptor no “ve bits”; estima símbolos a partir de una señal ruidosa y limitada por el canal.",
    "diagram": [],
    "rules": [
      "Separa siempre variable física, forma de onda, símbolo y bit.",
      "Usa f=1/T solo para periodicidad bien definida.",
      "No modeles un borde digital real como discontinuidad de ancho de banda infinito."
    ],
    "deep": {
      "sections": [
        {
          "title": "Dominio temporal",
          "body": "Una forma de onda x(t) muestra cómo cambia una magnitud. Periodo, duty cycle y tiempo de subida describen comportamiento temporal."
        },
        {
          "title": "Dominio frecuencial",
          "body": "Fourier permite representar una señal como combinación de componentes sinusoidales; el espectro ayuda a razonar sobre canal, filtros y EMI."
        },
        {
          "title": "Recepción",
          "body": "El receptor mide una variable física y decide entre hipótesis/símbolos. Umbrales, sincronización y ruido convierten esa decisión en un problema estadístico."
        }
      ],
      "commonErrors": [
        "Decir que “un voltio es un 1” sin especificar estándar/umbral.",
        "Confundir frecuencia portadora con bit rate."
      ],
      "connections": [
        "Señales y FFT",
        "Electricidad",
        "Teoría de información"
      ]
    },
    "example": {
      "problem": "Una onda cuadrada ideal de 1 MHz atraviesa un canal que elimina armónicos altos.",
      "steps": [
        [
          "Paso 1",
          "Reconoces que 1 MHz describe la periodicidad fundamental, no todo el espectro."
        ],
        [
          "Paso 2",
          "Los armónicos contribuyen a la forma de los flancos."
        ],
        [
          "Paso 3",
          "Al atenuarlos, la forma se redondea y aumenta el tiempo de transición."
        ]
      ],
      "answer": "El receptor puede seguir recuperando símbolos si quedan márgenes suficientes; “frecuencia fundamental presente” no garantiza integridad de señal."
    },
    "check": {
      "question": "¿Un bit es por sí mismo una magnitud física?",
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
          "Solo en fibra",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Un bit es una abstracción interpretada mediante estados físicos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una señal periódica tiene T=2 µs. Frecuencia en kHz.",
        "answer": "500",
        "hint": "f=1/T."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una onda cuadrada física requiere armónicos además de la fundamental? sí/no",
        "answer": "si",
        "hint": "Los flancos implican contenido espectral."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Dos señales con igual frecuencia fundamental pueden tener distinta forma temporal? sí/no",
        "answer": "si",
        "hint": "Pueden diferir en armónicos y fase."
      }
    ]
  },
  "phy-bandwidth-latency": {
    "id": "phy-bandwidth-latency",
    "courseId": 16,
    "title": "Ancho de banda, throughput y latencia",
    "shortTitle": "Más ancho no acelera la luz",
    "duration": 100,
    "objective": "distinguir ancho de banda físico, tasa de símbolos, throughput y componentes de latencia, y calcular retardos de propagación y serialización.",
    "summary": [
      "Bandwidth físico describe rango de frecuencias/recursos del canal; throughput describe datos útiles por unidad de tiempo.",
      "Latencia total combina propagación, serialización, procesamiento y colas.",
      "Aumentar bitrate reduce serialización, pero no hace que la señal se propague más rápido en el mismo medio."
    ],
    "concept": "Una red puede ser de gran capacidad y alta latencia al mismo tiempo. El ancho de banda permite transportar más información por unidad de tiempo bajo un esquema dado; la latencia responde cuánto tarda una unidad/causa en producir un efecto extremo a extremo.",
    "diagram": [],
    "rules": [
      "No uses bandwidth y throughput como sinónimos universales.",
      "Calcula propagación como distancia/velocidad del medio.",
      "Calcula serialización como tamaño/tasa del enlace cuando aplica."
    ],
    "deep": {
      "sections": [
        {
          "title": "Propagación",
          "body": "t_prop=d/v. En cobre/fibra v es una fracción de c y depende del medio."
        },
        {
          "title": "Serialización",
          "body": "t_ser=L/R para L bits en un enlace de tasa R, antes de considerar codificación/overheads si R es line rate."
        },
        {
          "title": "Colas y procesamiento",
          "body": "Switches, NICs, buffers y protocolos añaden retardos variables; más throughput disponible puede reducir colas sin alterar propagación."
        }
      ],
      "commonErrors": [
        "Afirmar que 10 Gb/s viaja diez veces más rápido que 1 Gb/s.",
        "Llamar “ping” a una latencia unidireccional sin aclarar RTT."
      ],
      "connections": [
        "Performance",
        "Ethernet",
        "Routing"
      ]
    },
    "example": {
      "problem": "Un frame de 12 000 bits cruza un enlace de 1 Gb/s y 200 km de fibra con v≈2×10^8 m/s.",
      "steps": [
        [
          "Paso 1",
          "Serialización: 12000/10^9 = 12 µs."
        ],
        [
          "Paso 2",
          "Propagación: 200000/(2×10^8)=1 ms."
        ],
        [
          "Paso 3",
          "Sin colas/procesamiento, una contribución aproximada es 1,012 ms unidireccional."
        ]
      ],
      "answer": "La propagación domina en este ejemplo; subir line rate reduce 12 µs, no el ~1 ms físico."
    },
    "check": {
      "question": "¿Subir de 1 Gb/s a 10 Gb/s reduce por sí mismo el retardo de propagación de 200 km de la misma fibra?",
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
          "Solo si es full duplex",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "La velocidad de propagación la fija principalmente el medio, no la tasa de bits."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "1000 bits a 100 Mb/s: serialización en µs.",
        "answer": "10",
        "hint": "1000/100e6."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "100 km a 2×10^8 m/s: propagación en ms.",
        "answer": "0.5",
        "hint": "100000/2e8."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un enlace puede tener gran throughput y gran RTT simultáneamente? sí/no",
        "answer": "si",
        "hint": "Capacidad y latencia son dimensiones distintas."
      }
    ]
  },
  "phy-noise-snr-capacity": {
    "id": "phy-noise-snr-capacity",
    "courseId": 16,
    "title": "Ruido, SNR y límites de capacidad",
    "shortTitle": "La señal no viaja sola",
    "duration": 110,
    "objective": "calcular SNR en forma lineal/dB e interpretar Shannon como límite idealizado de capacidad bajo un modelo de canal.",
    "summary": [
      "SNR compara potencia de señal y ruido; en dB se usa 10·log10(Ps/Pn).",
      "Shannon-Hartley: C=B·log2(1+S/N) para un canal AWGN idealizado con ancho de banda B.",
      "Capacidad es un límite teórico de comunicación fiable asintótica bajo el modelo, no un throughput garantizado de una NIC real."
    ],
    "concept": "Ruido térmico, interferencia, distorsión y cuantización degradan la estimación de símbolos. La teoría de información separa el límite fundamental del diseño concreto de modulación/codificación/protocolo.",
    "diagram": [],
    "rules": [
      "Convierte dB a razón lineal antes de insertar S/N en Shannon.",
      "Usa 20·log10 para razón de amplitudes solo bajo las condiciones que convierten potencia en amplitud al cuadrado con impedancias comparables.",
      "No prometas alcanzar C exactamente con bloque finito y latencia cero."
    ],
    "deep": {
      "sections": [
        {
          "title": "SNR",
          "body": "SNR_dB=10 log10(S/N). 20 dB corresponde a razón de potencia 100."
        },
        {
          "title": "Shannon",
          "body": "C=B log2(1+S/N) fija un techo para el modelo AWGN; acercarse requiere códigos/modulación y bloques adecuados."
        },
        {
          "title": "BER",
          "body": "La tasa de error depende de modulación, código, detector y canal; mismo SNR no implica universalmente misma BER entre sistemas diferentes."
        }
      ],
      "commonErrors": [
        "Meter SNR_dB directamente dentro de log2(1+SNR).",
        "Confundir capacidad de Shannon con tasa de símbolos."
      ],
      "connections": [
        "Teoría de información",
        "Probabilidad",
        "Codificación"
      ]
    },
    "example": {
      "problem": "Canal idealizado B=1 MHz y SNR=30 dB.",
      "steps": [
        [
          "Paso 1",
          "30 dB => S/N=10^(30/10)=1000."
        ],
        [
          "Paso 2",
          "C≈10^6·log2(1001)."
        ],
        [
          "Paso 3",
          "log2(1001)≈9,97, así que C≈9,97 Mb/s."
        ]
      ],
      "answer": "Es un límite del modelo, no una especificación de throughput de aplicación."
    },
    "check": {
      "question": "¿Para Shannon-Hartley debes usar S/N lineal dentro del logaritmo?",
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
          "Solo para fibra",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "dB es una representación logarítmica; la fórmula usa la razón lineal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "SNR de potencia 100 equivale a cuántos dB.",
        "answer": "20",
        "hint": "10 log10(100)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "0 dB de SNR corresponde a S/N lineal igual a…",
        "answer": "1",
        "hint": "10^(0/10)."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Shannon C garantiza esa tasa con cualquier código finito y cualquier latencia? sí/no",
        "answer": "no",
        "hint": "Es un límite asintótico bajo un modelo."
      }
    ]
  },
  "phy-modulation-symbols": {
    "id": "phy-modulation-symbols",
    "courseId": 16,
    "title": "Modulación, símbolos y constelaciones",
    "shortTitle": "Un símbolo puede llevar más de un bit",
    "duration": 110,
    "objective": "relacionar portadora, símbolos, constelaciones y bit rate, y razonar sobre ASK/PSK/QAM sin confundir orden de modulación con eficiencia útil.",
    "summary": [
      "Modulación hace variar parámetros de una señal para representar símbolos.",
      "Con M símbolos equiprobables y mapeo binario simple, cada símbolo puede representar log2(M) bits antes de overhead/codificación.",
      "Aumentar M separa más estados en un espacio finito y suele exigir mejor SNR/EVM para la misma fiabilidad."
    ],
    "concept": "ASK, PSK, FSK y QAM son familias de representación física. La constelación muestra estados posibles en componentes I/Q; el detector decide qué símbolo fue enviado a partir de una muestra/estimación ruidosa.",
    "diagram": [],
    "rules": [
      "Distingue symbol rate (baud) de raw bit rate.",
      "No supongas Rb=Rs·log2(M) para payload cuando hay FEC, pilotos, guard intervals y headers.",
      "Más orden de modulación no significa automáticamente más throughput en cualquier canal."
    ],
    "deep": {
      "sections": [
        {
          "title": "I/Q",
          "body": "Una sinusoide puede expresarse con componentes en cuadratura; variar I y Q permite construir constelaciones QAM/PSK."
        },
        {
          "title": "Baud y bits",
          "body": "64-QAM tiene 64 puntos y log2(64)=6 bits de etiquetado por símbolo en el mapeo ideal, antes de overhead."
        },
        {
          "title": "Decisión",
          "body": "Ruido y distorsión desplazan puntos; EVM y distancia entre regiones de decisión ayudan a cuantificar margen."
        }
      ],
      "commonErrors": [
        "Decir “64-QAM = 64 bits por símbolo”.",
        "Confundir frecuencia de la portadora con baud rate."
      ],
      "connections": [
        "Números binarios",
        "Probabilidad",
        "Wi-Fi"
      ]
    },
    "example": {
      "problem": "Un sistema usa 16-QAM a 5 Mbaud sin considerar FEC/overhead.",
      "steps": [
        [
          "Paso 1",
          "16-QAM => log2(16)=4 bits etiquetados por símbolo."
        ],
        [
          "Paso 2",
          "5 Msymbol/s × 4 bit/symbol = 20 Mbit/s raw de etiquetado."
        ],
        [
          "Paso 3",
          "La tasa útil real será menor si hay codificación y overhead."
        ]
      ],
      "answer": "Raw mapping rate: 20 Mb/s bajo esos supuestos."
    },
    "check": {
      "question": "¿16-QAM representa conceptualmente 4 bits por símbolo con mapeo binario ideal?",
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
          "16 bits",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "log2(16)=4."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "QPSK tiene M=4. Bits de etiquetado por símbolo.",
        "answer": "2",
        "hint": "log2(4)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "64-QAM a 1 Mbaud: raw mapping rate en Mb/s.",
        "answer": "6",
        "hint": "6 bits/símbolo × 1M."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Duplicar M duplica necesariamente throughput útil? sí/no",
        "answer": "no",
        "hint": "SNR, coding y overhead condicionan el modo utilizable."
      }
    ]
  },
  "phy-line-coding": {
    "id": "phy-line-coding",
    "courseId": 16,
    "title": "Codificación de línea, DC balance y recuperación de reloj",
    "shortTitle": "Bits con disciplina temporal",
    "duration": 100,
    "objective": "explicar por qué una interfaz digital necesita una codificación física y analizar transiciones, componente DC, sincronización y overhead.",
    "summary": [
      "Line coding convierte una secuencia lógica en símbolos/niveles adecuados al medio y receptor.",
      "Las transiciones ayudan a clock recovery; largas rachas constantes pueden ser problemáticas en algunos esquemas.",
      "Scrambling y block coding pueden controlar espectro, transición y DC sin ser lo mismo que cifrado."
    ],
    "concept": "La representación física debe permitir distinguir símbolos y mantener sincronización. NRZ, Manchester y códigos por bloques son ejemplos con compromisos distintos en ancho de banda, densidad de transiciones y overhead.",
    "diagram": [],
    "rules": [
      "No llames “encriptación” a un scrambler.",
      "No supongas que Manchester es universal en Ethernet moderno.",
      "Separa coding de canal para errores de line coding de FEC, aunque puedan coexistir."
    ],
    "deep": {
      "sections": [
        {
          "title": "Clock recovery",
          "body": "El receptor necesita estimar dónde muestrear. La densidad de transiciones y PLL/CDR ayudan a mantener fase/frecuencia."
        },
        {
          "title": "DC y baseline",
          "body": "Acoplamientos, transformadores o canales pueden penalizar componente DC y largas rachas; algunas codificaciones controlan disparidad."
        },
        {
          "title": "Overhead",
          "body": "Un block code puede usar más símbolos físicos que bits de payload para obtener propiedades útiles; la eficiencia debe calcularse explícitamente."
        }
      ],
      "commonErrors": [
        "Pensar que “0=0V, 1=5V” describe cualquier enlace.",
        "Confundir scrambler con compresor o cifrador."
      ],
      "connections": [
        "Lógica digital",
        "Ethernet",
        "Señales"
      ]
    },
    "example": {
      "problem": "Un código 8b/10b transmite 10 bits de línea por cada 8 bits de datos antes de otros overheads.",
      "steps": [
        [
          "Paso 1",
          "Eficiencia de coding = 8/10 = 0,8."
        ],
        [
          "Paso 2",
          "A 1 Gbit/s de línea, la tasa de datos tras solo ese overhead sería 0,8 Gbit/s."
        ],
        [
          "Paso 3",
          "Otros protocolos pueden reducir más la tasa útil."
        ]
      ],
      "answer": "La codificación consume 20 % del line rate en este ejemplo idealizado."
    },
    "check": {
      "question": "¿Scrambling y cifrado son la misma operación?",
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
      "failure": "Un scrambler busca propiedades estadísticas/espectrales, no confidencialidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Eficiencia de 8b/10b en porcentaje.",
        "answer": "80",
        "hint": "8/10×100."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una codificación puede añadir transiciones para facilitar CDR? sí/no",
        "answer": "si",
        "hint": "Es una propiedad buscada en varios esquemas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una buena densidad de transiciones elimina la necesidad de controlar jitter/ruido? sí/no",
        "answer": "no",
        "hint": "Ayuda a sincronizar, no elimina otras degradaciones."
      }
    ]
  },
  "phy-copper-transmission-lines": {
    "id": "phy-copper-transmission-lines",
    "courseId": 16,
    "title": "Cobre, impedancia, reflexiones y cableado",
    "shortTitle": "Un cable largo deja de ser “solo un cable”",
    "duration": 115,
    "objective": "analizar interconexiones de cobre como líneas de transmisión cuando corresponde y calcular reflexión, pérdida y efecto de terminación.",
    "summary": [
      "Cuando la longitud eléctrica es relevante frente al tiempo de transición, importa la impedancia característica Z0.",
      "Una discontinuidad de impedancia produce reflexión con Γ=(ZL−Z0)/(ZL+Z0) en el modelo ideal.",
      "Par trenzado y señalización diferencial reducen susceptibilidad/emisión bajo diseño y balance adecuados; no hacen inmune el enlace."
    ],
    "concept": "En altas velocidades, la interconexión distribuye L y C a lo largo del trayecto. El receptor ve ondas incidentes/reflejadas, pérdidas dependientes de frecuencia, crosstalk y retorno; por eso conectores, vias y terminaciones forman parte del canal.",
    "diagram": [],
    "rules": [
      "No uses el modelo lumped cuando el retardo de vuelo compite con el tiempo de subida.",
      "Mantén consistente la referencia de impedancia al interpretar Γ/return loss.",
      "Diferencial no significa “sin referencia” ni “sin modo común”."
    ],
    "deep": {
      "sections": [
        {
          "title": "Impedancia característica",
          "body": "Z0 describe relación onda V/I de una línea uniforme; no es la resistencia DC del cable."
        },
        {
          "title": "Reflexión",
          "body": "Carga adaptada ZL=Z0 da Γ=0 idealmente; abierto produce Γ≈+1 y corto Γ≈−1."
        },
        {
          "title": "Pérdidas reales",
          "body": "Skin effect, pérdidas dieléctricas, conectores y crosstalk hacen que la atenuación dependa de frecuencia."
        }
      ],
      "commonErrors": [
        "Confundir 100 Ω diferencial con 100 Ω de resistencia DC.",
        "Pensar que un cable de cobre tiene la misma pérdida a cualquier frecuencia."
      ],
      "connections": [
        "Integridad de señal",
        "Ethernet",
        "PCB"
      ]
    },
    "example": {
      "problem": "Línea ideal Z0=50 Ω terminada en 100 Ω.",
      "steps": [
        [
          "Paso 1",
          "Γ=(100−50)/(100+50)."
        ],
        [
          "Paso 2",
          "Γ=50/150=1/3."
        ],
        [
          "Paso 3",
          "La onda de tensión reflejada tiene amplitud +1/3 de la incidente en la carga idealizada."
        ]
      ],
      "answer": "Γ≈+0,333: hay reflexión positiva porque la carga supera Z0."
    },
    "check": {
      "question": "¿Una terminación ZL=Z0 elimina idealmente la reflexión en la carga?",
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
          "Solo en DC",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "En el modelo ideal Γ=0."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Z0=50 Ω, ZL=50 Ω. Γ.",
        "answer": "0",
        "hint": "Numerador cero."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Z0=50 Ω, circuito abierto ideal. Γ aproximado.",
        "answer": "1",
        "hint": "ZL→∞."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La impedancia característica es igual a la resistencia DC del cable? sí/no",
        "answer": "no",
        "hint": "Es una propiedad distribuida de propagación."
      }
    ]
  },
  "phy-optical-fiber": {
    "id": "phy-optical-fiber",
    "courseId": 16,
    "title": "Fibra óptica: modos, pérdidas y dispersión",
    "shortTitle": "Fotones con presupuesto",
    "duration": 110,
    "objective": "explicar propagación guiada en fibra, distinguir monomodo/multimodo y construir un presupuesto óptico básico con atenuación y márgenes.",
    "summary": [
      "La fibra guía luz mediante una estructura de índices; monomodo y multimodo tienen comportamientos de dispersión distintos.",
      "La atenuación se expresa habitualmente en dB/km y las pérdidas de conectores/empalmes se suman en dB.",
      "La potencia recibida suficiente no garantiza por sí sola BER objetivo: también importan dispersión, ruido y receptor."
    ],
    "concept": "La comunicación óptica modula una fuente, la propaga por fibra y la detecta. En enlaces largos, pérdida y dispersión limitan alcance/tasa; estándares como ITU‑T G.652 especifican características de fibra monomodo.",
    "diagram": [],
    "rules": [
      "Suma pérdidas y márgenes en dB de forma coherente.",
      "No confundas longitud de onda óptica con velocidad de propagación.",
      "No llames “sin pérdida” a la fibra por tener baja atenuación."
    ],
    "deep": {
      "sections": [
        {
          "title": "Guiado y modos",
          "body": "El núcleo/cladding y sus índices permiten modos guiados; una fibra monomodo limita la propagación espacial a un modo fundamental en su régimen."
        },
        {
          "title": "Dispersión",
          "body": "Dispersión cromática y modal pueden ensanchar pulsos; en monomodo desaparece la dispersión modal intermodal, pero no toda dispersión."
        },
        {
          "title": "Link budget",
          "body": "P_rx(dBm)=P_tx−pérdidas+ganancias. Debe compararse con sensibilidad/overload y margen del receptor."
        }
      ],
      "commonErrors": [
        "Afirmar que fibra siempre tiene latencia menor que cualquier cobre por definición.",
        "Confundir dBm (potencia absoluta) con dB (razón/pérdida)."
      ],
      "connections": [
        "Óptica",
        "Link budget",
        "Ethernet"
      ]
    },
    "example": {
      "problem": "Tx=0 dBm, 10 km a 0,3 dB/km, dos conectores de 0,5 dB y margen de diseño 3 dB.",
      "steps": [
        [
          "Paso 1",
          "Fibra: 10×0,3=3 dB."
        ],
        [
          "Paso 2",
          "Conectores: 1 dB. Pérdidas físicas=4 dB."
        ],
        [
          "Paso 3",
          "Con margen de 3 dB, presupuesto requerido=7 dB; potencia equivalente tras pérdidas físicas ≈−4 dBm."
        ]
      ],
      "answer": "Se necesitan al menos 7 dB de presupuesto disponible para cubrir pérdidas + margen bajo este modelo."
    },
    "check": {
      "question": "¿dBm y dB significan exactamente lo mismo?",
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
          "Solo en fibra monomodo",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "dBm es potencia referida a 1 mW; dB es una razón logarítmica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "5 km × 0,4 dB/km: pérdida en dB.",
        "answer": "2",
        "hint": "Multiplica distancia por pérdida específica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Tx=3 dBm y pérdidas=8 dB. Rx ideal en dBm.",
        "answer": "-5",
        "hint": "3−8."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Eliminar dispersión modal significa eliminar toda dispersión en monomodo? sí/no",
        "answer": "no",
        "hint": "Queda, por ejemplo, dispersión cromática."
      }
    ]
  },
  "phy-radio-propagation": {
    "id": "phy-radio-propagation",
    "courseId": 16,
    "title": "Radio: propagación, path loss, multipath y link budget",
    "shortTitle": "El aire también tiene canal",
    "duration": 115,
    "objective": "construir un modelo de enlace radio que distinga potencia, ganancia, path loss, multipath, fading e interferencia.",
    "summary": [
      "La propagación radio depende de frecuencia, geometría, obstáculos, antenas y entorno; “inalámbrico” no es un canal uniforme.",
      "En espacio libre ideal, FSPL=(4πd/λ)^2; en dB las pérdidas se suman/restan en un link budget.",
      "Multipath puede causar fading selectivo y por ello sistemas modernos usan diversidad, ecualización u OFDM."
    ],
    "concept": "Una antena convierte entre corrientes/campos guiados y radiación electromagnética. La potencia que alcanza el receptor depende del patrón de antena y del canal; paredes, suelo y objetos crean reflexión, difracción, scattering y trayectorias múltiples.",
    "diagram": [],
    "rules": [
      "Trata free-space path loss como modelo, no como predicción universal indoor.",
      "Distingue ganancia de antena de potencia transmitida.",
      "No interpretes RSSI como SNR universal sin conocer ruido/calibración."
    ],
    "deep": {
      "sections": [
        {
          "title": "Link budget",
          "body": "P_rx≈P_tx+G_tx+G_rx−L_path−otras pérdidas en dB/dBm coherentes."
        },
        {
          "title": "Multipath",
          "body": "Copias retardadas pueden sumarse constructiva/destructivamente y hacer que el canal varíe con frecuencia/posición."
        },
        {
          "title": "Frecuencia",
          "body": "A igualdad de condiciones geométricas, λ=c/f interviene en FSPL y dimensiones de antena, pero entornos reales añaden muchas dependencias."
        }
      ],
      "commonErrors": [
        "Decir “5 GHz llega exactamente la mitad que 2,4 GHz”.",
        "Confundir dBi de antena con potencia adicional creada de la nada."
      ],
      "connections": [
        "Electromagnetismo",
        "Wi-Fi",
        "Probabilidad"
      ]
    },
    "example": {
      "problem": "Link budget: 20 dBm Tx, 3 dBi en cada antena, 90 dB de path loss y 2 dB de otras pérdidas.",
      "steps": [
        [
          "Paso 1",
          "Suma Tx y ganancias: 20+3+3=26 dBm equivalentes en presupuesto."
        ],
        [
          "Paso 2",
          "Resta path loss: 26−90=−64 dBm."
        ],
        [
          "Paso 3",
          "Resta otras pérdidas: −66 dBm."
        ]
      ],
      "answer": "P_rx≈−66 dBm bajo el modelo del presupuesto."
    },
    "check": {
      "question": "¿FSPL describe por sí solo todos los efectos de un canal indoor real?",
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
          "Solo en 2,4 GHz",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Es un modelo de espacio libre; indoor añade multipath, obstáculos e interferencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Tx=10 dBm, ganancia total 4 dB, pérdidas 70 dB. Rx dBm.",
        "answer": "-56",
        "hint": "10+4−70."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Mover un receptor pocos centímetros puede cambiar potencia por multipath? sí/no",
        "answer": "si",
        "hint": "Las fases relativas de trayectorias cambian."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una antena de +6 dBi crea 6 dB de potencia total adicional? sí/no",
        "answer": "no",
        "hint": "Redistribuye radiación respecto a referencia; no crea energía."
      }
    ]
  },
  "phy-wifi": {
    "id": "phy-wifi",
    "courseId": 16,
    "title": "Wi‑Fi PHY: canales, OFDM, MCS y medio compartido",
    "shortTitle": "Wi‑Fi no es Ethernet sin cable",
    "duration": 120,
    "objective": "explicar cómo un PHY 802.11 combina canal radio, OFDM/OFDMA, modulación, coding y spatial streams para producir tasas físicas variables.",
    "summary": [
      "IEEE 802.11 define WLAN con múltiples PHY y evoluciones; Wi‑Fi comercial se basa en esa familia, no en un único modo físico eterno.",
      "La PHY rate depende de ancho de canal, MCS, coding, guard interval, número de spatial streams y generación.",
      "PHY rate no es throughput TCP/UDP: preámbulos, contention, ACKs, retransmisiones y capas superiores consumen tiempo."
    ],
    "concept": "Wi‑Fi usa un medio radio compartido y adapta su modo físico al canal. OFDM divide el ancho de banda en subportadoras ortogonales; cada símbolo transporta datos, pilotos y estructura de control según el PHY concreto.",
    "diagram": [],
    "rules": [
      "No deduzcas throughput de aplicación directamente del número impreso en la caja.",
      "No equipares canal de 80 MHz con 80 Mbit/s.",
      "MCS mayor requiere condiciones de canal adecuadas; no es una preferencia gratuita."
    ],
    "deep": {
      "sections": [
        {
          "title": "OFDM",
          "body": "Divide el canal en subportadoras y añade guard interval/cyclic prefix según PHY, lo que ayuda frente a multipath y simplifica ecualización."
        },
        {
          "title": "MCS",
          "body": "Índices MCS combinan modulación y coding rate; modos más densos suelen necesitar mayor calidad de señal."
        },
        {
          "title": "MIMO",
          "body": "Múltiples antenas pueden aportar spatial streams, diversidad o beamforming; más antenas físicas no implican automáticamente igual número de streams."
        }
      ],
      "commonErrors": [
        "Confundir Wi‑Fi 6/7 con frecuencia exacta única.",
        "Pensar que 2×2 MIMO garantiza siempre 2 streams útiles."
      ],
      "connections": [
        "Radio",
        "OFDM",
        "MAC 802.11"
      ]
    },
    "example": {
      "problem": "Un PHY hipotético duplica spatial streams de 1 a 2 manteniendo idéntico MCS, ancho y overhead físico compatible.",
      "steps": [
        [
          "Paso 1",
          "En el ideal del modelo, se duplican datos transportados en paralelo por símbolo OFDM."
        ],
        [
          "Paso 2",
          "La PHY rate podría aproximadamente duplicarse."
        ],
        [
          "Paso 3",
          "El throughput real puede escalar menos por contention, overhead, canal y capacidad del peer."
        ]
      ],
      "answer": "Los spatial streams son un factor de PHY rate, no una garantía de throughput ×2 extremo a extremo."
    },
    "check": {
      "question": "¿La PHY rate anunciada de Wi‑Fi es igual al throughput útil de aplicación?",
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
          "Solo con UDP",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Hay overhead y medio compartido, además de capas superiores."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un MCS suele combinar modulación y coding rate? sí/no",
        "answer": "si",
        "hint": "Eso caracteriza el modo físico."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Aumentar ancho de canal puede aumentar capacidad pero también exposición a interferencia/ocupación? sí/no",
        "answer": "si",
        "hint": "Más espectro no elimina coexistencia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿4 antenas físicas garantizan 4 spatial streams en toda conexión? sí/no",
        "answer": "no",
        "hint": "Depende de radios, peer, canal y PHY."
      }
    ]
  },
  "phy-ethernet": {
    "id": "phy-ethernet",
    "courseId": 16,
    "title": "Ethernet físico: PHY, MDI, autonegotiation y medios",
    "shortTitle": "El frame necesita un transceptor",
    "duration": 120,
    "objective": "separar MAC y PHY de Ethernet y explicar cómo distintos medios/codificaciones pueden transportar la misma semántica de trama.",
    "summary": [
      "IEEE 802.3 define Ethernet incluyendo MAC y múltiples PHY para cobre/fibra y diferentes velocidades.",
      "El PHY convierte la interfaz lógica/serial entre MAC y medio en señalización física adecuada al enlace.",
      "Autonegotiation y training dependen del PHY; no todos los Ethernet comparten idéntica codificación o medio."
    ],
    "concept": "Ethernet es una familia. 1000BASE-T, 10GBASE-SR o enlaces single-pair pertenecen al ecosistema 802.3 pero usan canales, PCS/PMA/PMD y técnicas físicas distintas. El frame Ethernet no especifica por sí solo la forma de onda del cable.",
    "diagram": [],
    "rules": [
      "Distingue frame/MAC de PHY.",
      "No supongas CSMA/CD como mecanismo activo universal en Ethernet full-duplex moderno.",
      "No extrapoles cableado/alcance de un PHY a otro solo porque ambos digan Ethernet."
    ],
    "deep": {
      "sections": [
        {
          "title": "Sublayers",
          "body": "Arquitecturas 802.3 separan funciones de coding, adaptación y medium-dependent; los nombres exactos varían con PHY, pero la separación ayuda a razonar."
        },
        {
          "title": "Copper PHY",
          "body": "Puede usar múltiples pares, PAM, echo cancellation y DSP según estándar; no es simplemente NRZ 0/1."
        },
        {
          "title": "Optical PHY",
          "body": "Usa transmisor/receptor óptico y especifica alcance, wavelength/lane characteristics y presupuestos según variante."
        }
      ],
      "commonErrors": [
        "Decir que Ethernet siempre usa Manchester.",
        "Decir que todo Ethernet moderno comparte un bus y colisiones."
      ],
      "connections": [
        "Layer 2",
        "Drivers",
        "Cableado"
      ]
    },
    "example": {
      "problem": "Una captura muestra un frame Ethernet válido. Preguntas qué forma de onda exacta viajó por el medio.",
      "steps": [
        [
          "Paso 1",
          "El frame determina estructura MAC, no el PHY usado."
        ],
        [
          "Paso 2",
          "Necesitas saber si fue 1000BASE-T, 10GBASE-SR, etc."
        ],
        [
          "Paso 3",
          "Cada PHY define codificación/modulación y medio diferentes."
        ]
      ],
      "answer": "Con solo el frame no puedes reconstruir una forma de onda física única."
    },
    "check": {
      "question": "¿Dos PHY Ethernet distintos pueden transportar la misma estructura de frame MAC?",
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
          "Solo si ambos son cobre",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "MAC y PHY son capas separadas dentro de la familia Ethernet."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿1000BASE-T es un PHY sobre cobre? sí/no",
        "answer": "si",
        "hint": "BASE-T identifica variantes sobre twisted pair."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ethernet full-duplex moderno necesita colisiones para funcionar? sí/no",
        "answer": "no",
        "hint": "El enlace punto a punto full duplex evita el modelo clásico de colisión."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conocer una MAC address revela el tipo exacto de señalización PHY? sí/no",
        "answer": "no",
        "hint": "La identidad MAC no codifica el PHY usado."
      }
    ]
  },
  "phy-measurement-link-budget": {
    "id": "phy-measurement-link-budget",
    "courseId": 16,
    "title": "Medición física: BER, eye diagram, jitter y presupuesto de enlace",
    "shortTitle": "Sin medir, solo estamos narrando",
    "duration": 110,
    "objective": "diseñar una estrategia de medición de un enlace usando potencia, BER, eye diagrams, jitter y márgenes sin confundir métricas de capas diferentes.",
    "summary": [
      "BER mide errores de bits bajo una condición definida; requiere suficientes bits para dar confianza estadística.",
      "Un eye diagram agrega muchas transiciones/símbolos y ayuda a visualizar margen temporal y de amplitud.",
      "Jitter describe variación temporal de eventos; ruido de amplitud y jitter pueden interactuar pero no son la misma magnitud."
    ],
    "concept": "La ingeniería física combina modelos y medición. Un link budget predice margen; BER y eye measurements verifican el resultado bajo condiciones de prueba. Una sola captura bonita no demuestra fiabilidad en temperatura, proceso, cable y tiempo.",
    "diagram": [],
    "rules": [
      "Documenta patrón, tasa, duración, temperatura y punto de medida.",
      "No declares BER=0 como probabilidad real cero por observar cero errores finitos.",
      "Separa line rate/PHY errors de pérdidas de paquetes de capas superiores."
    ],
    "deep": {
      "sections": [
        {
          "title": "BER y confianza",
          "body": "Observar 0 errores en N bits solo acota la BER con cierta confianza; no prueba BER matemática igual a cero."
        },
        {
          "title": "Eye diagram",
          "body": "Apertura vertical/temporal resume margen frente a ruido y jitter, pero la máscara y procedimiento dependen del estándar."
        },
        {
          "title": "Jitter",
          "body": "Puede descomponerse/modelarse de distintas maneras; el número solo es interpretable con ancho de banda de medición y definición."
        }
      ],
      "commonErrors": [
        "Confundir packet loss con BER.",
        "Afirmar “BER=0” después de una prueba corta sin intervalo de confianza."
      ],
      "connections": [
        "Estadística",
        "Integridad de señal",
        "Testing"
      ]
    },
    "example": {
      "problem": "Prueba transmite 10^12 bits y observa 10 errores.",
      "steps": [
        [
          "Paso 1",
          "BER estimada puntual=10/10^12."
        ],
        [
          "Paso 2",
          "=10^-11."
        ],
        [
          "Paso 3",
          "Ese estimador no sustituye un intervalo/confianza ni explica la causa de los errores."
        ]
      ],
      "answer": "BER observada≈1×10^-11 bajo esas condiciones."
    },
    "check": {
      "question": "¿Cero errores observados en una prueba finita demuestra BER real exactamente cero?",
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
          "Solo con fibra",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Una muestra finita permite acotar, no demostrar probabilidad exactamente cero."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "1 error en 10^9 bits: BER observada.",
        "answer": "1e-9",
        "hint": "errores/bits."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Eye opening más amplio suele indicar más margen de decisión bajo la misma definición de prueba? sí/no",
        "answer": "si",
        "hint": "Mayor apertura suele significar más margen."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Packet loss de 1% implica necesariamente BER física de 1%? sí/no",
        "answer": "no",
        "hint": "Las pérdidas pueden ocurrir por colas, MAC, routing, etc."
      }
    ]
  },
  "phy-integration": {
    "id": "phy-integration",
    "courseId": 16,
    "title": "Reto integrador: del bit a la onda y vuelta",
    "shortTitle": "Seguir el bit sin perder las capas",
    "duration": 125,
    "objective": "seguir una transmisión completa desde payload lógico hasta señal física y recepción, identificando dónde aparecen coding, modulación, canal, sincronización y errores.",
    "summary": [
      "La cadena física incluye framing/coding/modulation/transmission/channel/detection según tecnología, pero no todos los sistemas usan exactamente las mismas etapas.",
      "Cada etapa transforma una representación y añade restricciones; depurar requiere saber qué capa produce la métrica observada.",
      "El diseño correcto se hace con presupuestos de SNR, ancho de banda, timing, potencia y error, no con una única “velocidad del cable”."
    ],
    "concept": "Esta lección integra teoría de información, señales, electrónica y estándares de red. El objetivo es poder explicar por qué una trama que parecía perfecta en memoria se convierte en voltajes/fotones/campos, atraviesa un canal imperfecto y vuelve a bytes con una probabilidad de error controlada.",
    "diagram": [],
    "rules": [
      "Nombra explícitamente la capa de cada magnitud.",
      "Cuando uses una fórmula, declara el modelo y unidades.",
      "Distingue límite teórico, especificación de estándar y medición real."
    ],
    "deep": {
      "sections": [
        {
          "title": "Transmisor",
          "body": "Bytes → coding/FEC → símbolos → waveform/optical/radio front-end, dependiendo del PHY."
        },
        {
          "title": "Canal",
          "body": "Introduce atenuación, ruido, dispersión, multipath, reflexiones y delay según medio."
        },
        {
          "title": "Receptor",
          "body": "Front-end → sincronización/ecualización → detección → decodificación → entrega a la capa superior, con métricas de error/margen."
        }
      ],
      "commonErrors": [
        "Usar una única tasa “Mbps” para describir todo el sistema.",
        "Atribuir cualquier packet loss a ruido físico sin evidencia."
      ],
      "connections": [
        "Teoría de información",
        "Señales",
        "Ethernet/Wi-Fi"
      ]
    },
    "example": {
      "problem": "Un enlace pierde throughput cuando aumenta la distancia, pero el RTT apenas cambia.",
      "steps": [
        [
          "Paso 1",
          "El pequeño cambio de distancia puede añadir propagación despreciable frente al RTT total."
        ],
        [
          "Paso 2",
          "La mayor pérdida/SNR peor puede forzar un MCS más robusto o más retransmisiones."
        ],
        [
          "Paso 3",
          "Por eso throughput puede caer mucho sin un cambio comparable de propagación."
        ]
      ],
      "answer": "Es coherente: tasa efectiva y retardo de propagación responden a mecanismos distintos."
    },
    "check": {
      "question": "¿Un descenso de throughput demuestra por sí solo que la velocidad de propagación física haya disminuido?",
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
          "Solo en radio",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Puede deberse a SNR, coding, retransmisiones, colas u otras causas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir line rate y payload throughput? sí/no",
        "answer": "si",
        "hint": "Hay coding y overhead."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una mejora de SNR puede permitir usar un MCS más denso sin cambiar la velocidad de propagación? sí/no",
        "answer": "si",
        "hint": "Son dimensiones distintas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una fórmula de espacio libre basta para certificar un enlace indoor multipath? sí/no",
        "answer": "no",
        "hint": "Necesitas modelo/medición adecuados."
      }
    ]
  }
});
