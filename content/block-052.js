/**
 * BLOQUE 052 — Electrónica Analógica
 *
 * Regla editorial: distinguir modelo ideal, especificación de componente y comportamiento
 * medido; toda señal debe tener unidades, referencia, impedancia y bandwidth explícitos.
 */
window.LEARNING_PATHS[52] = {
  "level": "Experto práctico",
  "estimatedHours": 126,
  "description": "Electrónica analógica real: acondicionamiento de señal, op-amps, filtros, conversión, alimentación, ruido e instrumentación.",
  "outcomes": [
    "Diseñar y verificar etapas analógicas con límites reales de componentes.",
    "Construir cadenas sensor/ADC y DAC/actuador con presupuestos de señal y error.",
    "Medir circuitos sin ignorar carga, bandwidth, referencia y seguridad.",
    "Diagnosticar saturación, ruido, estabilidad y problemas de alimentación de forma sistemática."
  ],
  "modules": [
    {
      "id": "m1-real",
      "title": "Señal y amplificación",
      "description": "Señales reales, amplificadores, op-amps y estabilidad",
      "lessons": [
        "analog-signal-real",
        "analog-amplifiers",
        "analog-opamps",
        "analog-feedback-stability"
      ]
    },
    {
      "id": "m2-filter-power",
      "title": "Filtrado y generación",
      "description": "Filtros, osciladores y regulación",
      "lessons": [
        "analog-filters",
        "analog-oscillators",
        "analog-regulators"
      ]
    },
    {
      "id": "m3-conversion",
      "title": "Conversión y alimentación",
      "description": "ADC, DAC y fuentes",
      "lessons": [
        "analog-adc",
        "analog-dac",
        "analog-power-supplies"
      ]
    },
    {
      "id": "m4-measure",
      "title": "Ruido e instrumentación",
      "description": "Ruido, medición e integración de cadena",
      "lessons": [
        "analog-noise",
        "analog-instrumentation",
        "analog-signal-chain",
        "analog-lab-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "analog-signal-real": {
    "id": "analog-signal-real",
    "courseId": 52,
    "title": "Señales analógicas reales",
    "shortTitle": "Señal real",
    "duration": 90,
    "objective": "Pasar del modelo ideal de señal a amplitud, offset, impedancia, bandwidth, distorsión, headroom y referencia de masa.",
    "summary": [
      "Una señal real está definida tanto por su forma de onda como por niveles, referencia, impedancia, bandwidth y ruido.",
      "La carga del siguiente bloque puede modificar la señal; medir también carga el circuito.",
      "Headroom y rango común/importante deben comprobarse antes de asumir que una señal cabe en la alimentación."
    ],
    "concept": "Una señal real está definida tanto por su forma de onda como por niveles, referencia, impedancia, bandwidth y ruido.",
    "rules": [
      "Declara referencia y unidades.",
      "Modela fuente y carga con impedancias finitas.",
      "Comprueba amplitud, offset y bandwidth antes de conectar etapas."
    ],
    "deep": {
      "intro": "Pasar del modelo ideal de señal a amplitud, offset, impedancia, bandwidth, distorsión, headroom y referencia de masa.",
      "sections": [
        {
          "title": "Modelo de Thévenin",
          "body": "Una fuente real puede modelarse localmente como tensión ideal más impedancia de salida; la carga forma un divisor."
        },
        {
          "title": "Headroom",
          "body": "Una señal de 4 Vpp centrada a 2.5 V ocupa 0.5..4.5 V; una etapa de 0..5 V necesita margen adicional para no saturar."
        },
        {
          "title": "Impedancia",
          "body": "La transferencia depende de Zsource y Zload, no solo de la tensión de circuito abierto."
        },
        {
          "title": "Bandwidth",
          "body": "Una señal cuadrada exige armónicos; que la fundamental esté dentro de banda no preserva automáticamente sus flancos."
        }
      ]
    },
    "example": {
      "problem": "Fuente de 1 V con Rs=1 kΩ y carga 9 kΩ. Tensión en carga.",
      "steps": [
        "Divisor: 1·9/(1+9)."
      ],
      "solution": "0.9 V."
    },
    "check": {
      "question": "¿Una sonda idealmente infinita y una sonda real cargan siempre igual el nodo?",
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
          "Solo en DC",
          false
        ]
      ],
      "feedback": "La impedancia y capacitancia de entrada del instrumento importan."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una fuente real puede tener impedancia de salida?",
        "answer": "si",
        "hint": "Modelo de Thévenin."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "1 V, Rs=1k y RL=1k: Vload.",
        "answer": "0.5",
        "hint": "Divisor 1/2."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una fundamental en banda garantiza una cuadrada perfecta?",
        "answer": "no",
        "hint": "Faltan armónicos."
      }
    ]
  },
  "analog-amplifiers": {
    "id": "analog-amplifiers",
    "courseId": 52,
    "title": "Amplificadores: ganancia, impedancia y distorsión",
    "shortTitle": "Amplificadores",
    "duration": 90,
    "objective": "Diseñar etapas de amplificación entendiendo ganancia, impedancias, bandwidth, linealidad, ruido y clipping.",
    "summary": [
      "La ganancia útil existe dentro de un rango de frecuencia y amplitud; fuera aparecen roll-off, slew limiting o clipping.",
      "Ganancia de tensión, corriente y potencia son magnitudes distintas.",
      "Una buena etapa suele combinar ganancia con impedancias adecuadas, bajo ruido y suficiente margen dinámico."
    ],
    "concept": "La ganancia útil existe dentro de un rango de frecuencia y amplitud; fuera aparecen roll-off, slew limiting o clipping.",
    "rules": [
      "No especifiques solo ganancia; incluye banda y carga.",
      "Distingue clipping por rails de limitación por slew rate.",
      "Reserva headroom para tolerancias y transitorios."
    ],
    "deep": {
      "intro": "Diseñar etapas de amplificación entendiendo ganancia, impedancias, bandwidth, linealidad, ruido y clipping.",
      "sections": [
        {
          "title": "Ganancia",
          "body": "Av=Vout/Vin en régimen lineal; 20·log10|Av| expresa ganancia de tensión en dB si las impedancias de referencia son compatibles."
        },
        {
          "title": "Clipping",
          "body": "Si la salida exigida excede el swing permitido, la transferencia deja de ser lineal."
        },
        {
          "title": "Bandwidth",
          "body": "La ganancia suele caer con frecuencia; el producto gain-bandwidth es relevante en muchos amplificadores realimentados."
        },
        {
          "title": "Distorsión",
          "body": "No linealidad añade componentes espectrales que no estaban en la entrada."
        }
      ]
    },
    "example": {
      "problem": "Vin=80 mV y Av=25. Salida ideal.",
      "steps": [
        "0.08·25=2."
      ],
      "solution": "2 V."
    },
    "check": {
      "question": "¿Av=100 garantiza 100× para cualquier frecuencia y amplitud?",
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
          "Solo con carga alta",
          false
        ]
      ],
      "feedback": "La ganancia depende del régimen operativo y de frecuencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Av=10, Vin=0.2 V: Vout ideal.",
        "answer": "2",
        "hint": "Multiplica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Ganancia 20 V/V en dB.",
        "answer": "26.0206",
        "hint": "20 log10(20)."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Clipping es una operación lineal?",
        "answer": "no",
        "hint": "Corta la transferencia."
      }
    ]
  },
  "analog-opamps": {
    "id": "analog-opamps",
    "courseId": 52,
    "title": "Op-amps: ideal, realimentación y límites",
    "shortTitle": "Op-amps",
    "duration": 90,
    "objective": "Usar el modelo ideal de op-amp sin olvidar common-mode, output swing, offset, bias current, GBW y slew rate.",
    "summary": [
      "El modelo ideal con realimentación negativa puede llevar a V+≈V−, pero solo cuando el amplificador opera en su región lineal.",
      "Rail-to-rail no significa necesariamente llegar exactamente a ambos rails bajo cualquier carga ni que input/output tengan el mismo rango.",
      "Offset, bias current, ruido, GBW y slew rate convierten un esquema algebraicamente perfecto en un circuito con error y límites."
    ],
    "concept": "El modelo ideal con realimentación negativa puede llevar a V+≈V−, pero solo cuando el amplificador opera en su región lineal.",
    "rules": [
      "Nunca uses V+=V− como ley universal; deriva de high gain + feedback + no saturación.",
      "Comprueba common-mode y output swing del datasheet.",
      "Distingue GBW de slew rate: small-signal y large-signal no son el mismo límite."
    ],
    "deep": {
      "intro": "Usar el modelo ideal de op-amp sin olvidar common-mode, output swing, offset, bias current, GBW y slew rate.",
      "sections": [
        {
          "title": "Inversor",
          "body": "Con op-amp ideal lineal: Av=-Rf/Rin."
        },
        {
          "title": "No inversor",
          "body": "Av=1+Rf/Rg bajo las hipótesis del modelo ideal."
        },
        {
          "title": "Common-mode",
          "body": "Las entradas pueden estar casi iguales y aun así situarse fuera del rango permitido."
        },
        {
          "title": "Slew rate",
          "body": "Una senoide de amplitud Vp y frecuencia f requiere SR≥2πfVp para no limitarse por pendiente."
        }
      ]
    },
    "example": {
      "problem": "Inversor Rin=10 kΩ, Rf=47 kΩ, Vin=0.2 V. Vout ideal.",
      "steps": [
        "Av=-47/10=-4.7.",
        "Vout=-0.94 V."
      ],
      "solution": "-0.94 V."
    },
    "check": {
      "question": "¿V+=V− sigue siendo válido si el op-amp está saturado?",
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
          "Solo en DC",
          false
        ]
      ],
      "feedback": "La igualdad virtual es una aproximación de operación lineal con feedback."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "No inversor Rf=9k,Rg=1k: ganancia.",
        "answer": "10",
        "hint": "1+9/1."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "SR mínimo para 10 kHz y 2 Vp, V/s aproximado.",
        "answer": "125663.706",
        "hint": "2πfVp."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Rail-to-rail significa salida exactamente igual a rails siempre?",
        "answer": "no",
        "hint": "Carga y dispositivo importan."
      }
    ]
  },
  "analog-feedback-stability": {
    "id": "analog-feedback-stability",
    "courseId": 52,
    "title": "Realimentación y estabilidad",
    "shortTitle": "Feedback",
    "duration": 90,
    "objective": "Analizar por qué la realimentación negativa mejora precisión pero puede oscilar si fase, ganancia y carga erosionan margen de estabilidad.",
    "summary": [
      "La realimentación negativa reduce sensibilidad a ganancia abierta y puede mejorar linealidad, pero el loop tiene dinámica propia.",
      "Cuando la fase acumulada convierte feedback efectivo en positivo alrededor de ganancia de lazo unidad, puede aparecer oscilación o ringing.",
      "Capacidades de carga, layout y red de feedback pueden modificar polos/ceros y estabilidad."
    ],
    "concept": "La realimentación negativa reduce sensibilidad a ganancia abierta y puede mejorar linealidad, pero el loop tiene dinámica propia.",
    "rules": [
      "No confundas feedback negativo DC con estabilidad a toda frecuencia.",
      "Observa margen de fase/ganancia cuando el diseño lo exige.",
      "Prueba cargas capacitivas y transitorios, no solo un punto DC."
    ],
    "deep": {
      "intro": "Analizar por qué la realimentación negativa mejora precisión pero puede oscilar si fase, ganancia y carga erosionan margen de estabilidad.",
      "sections": [
        {
          "title": "Loop gain",
          "body": "T=Aβ; la closed-loop idealizada es A/(1+Aβ)."
        },
        {
          "title": "Fase",
          "body": "El signo efectivo del feedback depende de fase, no solo del signo algebraico a baja frecuencia."
        },
        {
          "title": "Carga",
          "body": "Una capacidad en salida puede introducir polo adicional y reducir margen de fase."
        },
        {
          "title": "Compensación",
          "body": "Resistencias serie, compensation caps o elección de op-amp estable para la ganancia pueden recuperar margen según topología."
        }
      ]
    },
    "example": {
      "problem": "A=100000 y beta=0.01. Ganancia closed-loop A/(1+Aβ).",
      "steps": [
        "Aβ=1000.",
        "100000/1001≈99.9001."
      ],
      "solution": "≈99.9001."
    },
    "check": {
      "question": "¿Realimentación negativa a DC garantiza que el circuito nunca oscile?",
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
          "Solo con op-amp",
          false
        ]
      ],
      "feedback": "La fase y ganancia de lazo varían con frecuencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "A=10000,beta=0.1: A/(1+Aβ) aprox.",
        "answer": "9.99001",
        "hint": "10000/1001."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una carga capacitiva puede afectar estabilidad?",
        "answer": "si",
        "hint": "Añade dinámica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Margen de fase y slew rate son la misma especificación?",
        "answer": "no",
        "hint": "Uno es estabilidad de lazo; otro pendiente máxima."
      }
    ]
  },
  "analog-filters": {
    "id": "analog-filters",
    "courseId": 52,
    "title": "Filtros analógicos",
    "shortTitle": "Filtros",
    "duration": 90,
    "objective": "Diseñar filtros RC/activos distinguiendo frecuencia de corte, pendiente, Q, fase, tolerancias y carga.",
    "summary": [
      "Un filtro real tiene transición, fase y tolerancias; cutoff no es una pared espectral.",
      "Para un RC de primer orden fc=1/(2πRC), pero la carga puede cambiar el R efectivo.",
      "Orden mayor permite pendientes más fuertes a costa de sensibilidad, fase y complejidad."
    ],
    "concept": "Un filtro real tiene transición, fase y tolerancias; cutoff no es una pared espectral.",
    "rules": [
      "Calcula con componentes efectivos, incluida la carga.",
      "Especifica ripple, atenuación, fase y Q cuando importen.",
      "No confíes en valores nominales sin tolerancia."
    ],
    "deep": {
      "intro": "Diseñar filtros RC/activos distinguiendo frecuencia de corte, pendiente, Q, fase, tolerancias y carga.",
      "sections": [
        {
          "title": "RC low-pass",
          "body": "H(jω)=1/(1+jωRC) para el modelo ideal sin carga adicional."
        },
        {
          "title": "Cutoff",
          "body": "En primer orden, |H| cae a 1/√2 del valor de baja frecuencia, ≈-3.01 dB."
        },
        {
          "title": "Orden",
          "body": "Cada polo aporta aproximadamente -20 dB/dec muy por encima de su frecuencia característica."
        },
        {
          "title": "Activo",
          "body": "Op-amps permiten filtros con ganancia/Q, sujetos a GBW, slew y rango de señal."
        }
      ]
    },
    "example": {
      "problem": "R=10 kΩ, C=10 nF. fc aproximada.",
      "steps": [
        "fc=1/(2π·10000·10e-9)."
      ],
      "solution": "≈1591.55 Hz."
    },
    "check": {
      "question": "¿Un low-pass deja exactamente 0 V justo por encima de fc?",
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
          "Solo primer orden",
          false
        ]
      ],
      "feedback": "La transición es gradual."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "R=1k,C=1uF: fc aproximada Hz.",
        "answer": "159.155",
        "hint": "1/(2πRC)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un polo ideal aporta ~-20 dB/dec lejos del corte?",
        "answer": "si",
        "hint": "Primer orden."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La carga puede mover fc?",
        "answer": "si",
        "hint": "Modifica impedancias."
      }
    ]
  },
  "analog-oscillators": {
    "id": "analog-oscillators",
    "courseId": 52,
    "title": "Osciladores analógicos",
    "shortTitle": "Osciladores",
    "duration": 90,
    "objective": "Entender oscilación como lazo dinámico: condición de arranque, amplitud, frecuencia y estabilización no lineal.",
    "summary": [
      "Un oscilador genera una señal sin entrada periódica externa mediante realimentación y energía de la fuente.",
      "La condición de Barkhausen es una guía de fase/ganancia de lazo, no una prueba suficiente de amplitud estable para cualquier circuito.",
      "Para arrancar, el lazo debe amplificar perturbaciones; luego alguna no linealidad estabiliza la amplitud."
    ],
    "concept": "Un oscilador genera una señal sin entrada periódica externa mediante realimentación y energía de la fuente.",
    "rules": [
      "Distingue condición de arranque de régimen estacionario.",
      "Especifica frecuencia, amplitud, distorsión y estabilidad.",
      "Incluye ruido/tolerancias: el arranque real no necesita una perturbación ideal explícita."
    ],
    "deep": {
      "intro": "Entender oscilación como lazo dinámico: condición de arranque, amplitud, frecuencia y estabilización no lineal.",
      "sections": [
        {
          "title": "RC/LC/cristal",
          "body": "Distintas redes seleccionan frecuencia con diferentes Q, coste y estabilidad."
        },
        {
          "title": "Arranque",
          "body": "Si el loop gain pequeño-señal es >1 en la fase correcta, ruido/perturbaciones pueden crecer."
        },
        {
          "title": "Limitación",
          "body": "Saturación, AGC o no linealidad reduce ganancia efectiva hasta un ciclo límite."
        },
        {
          "title": "Jitter/phase noise",
          "body": "La frecuencia instantánea real fluctúa; la pureza espectral importa en clocks y comunicaciones."
        }
      ]
    },
    "example": {
      "problem": "Oscilador ideal de 2 MHz: periodo.",
      "steps": [
        "T=1/f=1/2e6."
      ],
      "solution": "0.5 µs."
    },
    "check": {
      "question": "¿Barkhausen por sí sola fija la amplitud final exacta?",
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
          "Solo en RC",
          false
        ]
      ],
      "feedback": "La estabilización de amplitud requiere dinámica/no linealidad adicional."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "100 kHz: periodo en microsegundos.",
        "answer": "10",
        "hint": "1/100000 s."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un oscilador necesita alimentación?",
        "answer": "si",
        "hint": "La energía sale de la fuente."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Phase noise es idéntico a frecuencia nominal?",
        "answer": "no",
        "hint": "Describe fluctuaciones alrededor de ella."
      }
    ]
  },
  "analog-regulators": {
    "id": "analog-regulators",
    "courseId": 52,
    "title": "Reguladores lineales y alimentación limpia",
    "shortTitle": "Reguladores",
    "duration": 90,
    "objective": "Diseñar regulación lineal entendiendo dropout, disipación, PSRR, ruido, estabilidad y desacoplo.",
    "summary": [
      "Un LDO mantiene regulación solo si existe suficiente headroom entre entrada y salida según corriente/temperatura/dispositivo.",
      "PSRR describe rechazo de ripple de entrada y depende de frecuencia; ruido de salida del regulador es una especificación diferente.",
      "En un regulador lineal la potencia disipada aproximada es (Vin−Vout)·I, lo que puede dominar el diseño térmico."
    ],
    "concept": "Un LDO mantiene regulación solo si existe suficiente headroom entre entrada y salida según corriente/temperatura/dispositivo.",
    "rules": [
      "Comprueba dropout en condiciones reales, no solo típico.",
      "Separa PSRR de output noise.",
      "Calcula disipación y temperatura antes de elegir encapsulado."
    ],
    "deep": {
      "intro": "Diseñar regulación lineal entendiendo dropout, disipación, PSRR, ruido, estabilidad y desacoplo.",
      "sections": [
        {
          "title": "Dropout",
          "body": "Si Vin cae demasiado cerca de Vout, el lazo pierde margen y la salida deja de regular."
        },
        {
          "title": "Disipación",
          "body": "P≈(Vin−Vout)I para un regulador lineal, ignorando corriente quiescente."
        },
        {
          "title": "PSRR",
          "body": "Es función de frecuencia; un buen valor a baja frecuencia no garantiza igual rechazo en MHz."
        },
        {
          "title": "Estabilidad",
          "body": "Algunos LDO requieren rango/ESR concreto de capacitor de salida; hay que seguir datasheet."
        }
      ]
    },
    "example": {
      "problem": "12 V→5 V a 0.3 A con regulador lineal. Potencia aproximada disipada.",
      "steps": [
        "(12-5)·0.3=2.1."
      ],
      "solution": "2.1 W."
    },
    "check": {
      "question": "¿PSRR y ruido propio del regulador son exactamente la misma métrica?",
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
          "Solo en LDO",
          false
        ]
      ],
      "feedback": "Una mide rechazo de ripple de entrada; otra ruido generado/saliente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "9→3.3 V a 0.1 A: disipación W.",
        "answer": "0.57",
        "hint": "(9-3.3)·0.1."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un LDO regula con Vin=Vout para cualquier corriente?",
        "answer": "no",
        "hint": "Existe dropout/headroom."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿PSRR puede depender de frecuencia?",
        "answer": "si",
        "hint": "Es una respuesta frecuencial."
      }
    ]
  },
  "analog-adc": {
    "id": "analog-adc",
    "courseId": 52,
    "title": "ADC: del voltaje al código",
    "shortTitle": "ADC",
    "duration": 90,
    "objective": "Diseñar una entrada ADC entendiendo muestreo, cuantización, rango, referencia, ENOB, aliasing y driver de adquisición.",
    "summary": [
      "Un ADC combina muestreo y cuantización: resolución nominal N bits ofrece 2^N códigos, no precisión analógica perfecta.",
      "LSB, offset/gain error, INL/DNL, ruido y referencia determinan error real; ENOB resume parte del rendimiento dinámico.",
      "La red de sample-and-hold presenta una carga dinámica; una fuente de alta impedancia puede no asentarse a tiempo."
    ],
    "concept": "Un ADC combina muestreo y cuantización: resolución nominal N bits ofrece 2^N códigos, no precisión analógica perfecta.",
    "rules": [
      "No confundas resolución con exactitud.",
      "Filtra alias antes de samplear cuando el contenido fuera de banda importa.",
      "Comprueba referencia y settling del driver ADC."
    ],
    "deep": {
      "intro": "Diseñar una entrada ADC entendiendo muestreo, cuantización, rango, referencia, ENOB, aliasing y driver de adquisición.",
      "sections": [
        {
          "title": "Cuantización",
          "body": "Para rango 0..Vref ideal unipolar, un LSB es aproximadamente Vref/2^N según convención de códigos."
        },
        {
          "title": "Sample-and-hold",
          "body": "El capacitor interno debe cargarse suficientemente durante acquisition time."
        },
        {
          "title": "ENOB",
          "body": "Relaciona SINAD con una resolución efectiva para seno; no sustituye todas las specs DC."
        },
        {
          "title": "Referencia",
          "body": "Error/ruido de Vref escala la conversión; la referencia es parte de la cadena analógica."
        }
      ]
    },
    "example": {
      "problem": "ADC ideal 12-bit, Vref=4.096 V. Tamaño aproximado de 1 LSB.",
      "steps": [
        "4.096/4096=0.001."
      ],
      "solution": "1 mV."
    },
    "check": {
      "question": "¿Un ADC de 16 bits garantiza 16 bits de exactitud absoluta?",
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
          "Solo a DC",
          false
        ]
      ],
      "feedback": "Resolución nominal y exactitud/ENOB son conceptos distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "ADC 10-bit, 1.024 V: LSB V.",
        "answer": "0.001",
        "hint": "1.024/1024."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un anti-alias filter debe actuar antes del muestreo?",
        "answer": "si",
        "hint": "Después el alias ya está plegado."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿ENOB es siempre igual a bits nominales?",
        "answer": "no",
        "hint": "Ruido/distorsión lo reducen."
      }
    ]
  },
  "analog-dac": {
    "id": "analog-dac",
    "courseId": 52,
    "title": "DAC: del código a señal",
    "shortTitle": "DAC",
    "duration": 90,
    "objective": "Diseñar salidas DAC distinguiendo resolución, referencia, settling, glitch, reconstrucción y capacidad de carga.",
    "summary": [
      "Un DAC convierte códigos en niveles analógicos, pero la salida real incluye error, settling, glitch y límites de drive.",
      "La salida escalonada puede requerir filtro de reconstrucción dependiendo de la aplicación.",
      "Resolución de código no implica que cada paso sea exacto ni monotónico salvo especificación."
    ],
    "concept": "Un DAC convierte códigos en niveles analógicos, pero la salida real incluye error, settling, glitch y límites de drive.",
    "rules": [
      "Comprueba settling y carga, no solo bits.",
      "Separa cuantización de glitch transitorio.",
      "Añade buffer/filtro cuando la salida DAC no pueda manejar directamente la carga."
    ],
    "deep": {
      "intro": "Diseñar salidas DAC distinguiendo resolución, referencia, settling, glitch, reconstrucción y capacidad de carga.",
      "sections": [
        {
          "title": "Transferencia",
          "body": "Un DAC ideal unipolar aproxima Vout=code/2^N·Vref según convención."
        },
        {
          "title": "Settling",
          "body": "Tras un cambio de código, la salida necesita tiempo para entrar y permanecer en una banda de error."
        },
        {
          "title": "Glitch",
          "body": "Conmutaciones internas no simultáneas pueden crear pulsos breves, especialmente en major-carry transitions."
        },
        {
          "title": "Reconstrucción",
          "body": "Un filtro puede atenuar imágenes/steps cuando se desea señal continua de banda limitada."
        }
      ]
    },
    "example": {
      "problem": "DAC ideal 8-bit, Vref=2.56 V, code=128. Vout aproximada usando code/256.",
      "steps": [
        "128/256·2.56."
      ],
      "solution": "1.28 V."
    },
    "check": {
      "question": "¿Un DAC de más bits elimina automáticamente glitch y settling time?",
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
          "Solo R-2R",
          false
        ]
      ],
      "feedback": "Son especificaciones distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "DAC 10-bit,Vref=1.024,code=512: Vout.",
        "answer": "0.512",
        "hint": "512/1024·1.024."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Puede hacer falta buffer tras un DAC?",
        "answer": "si",
        "hint": "Depende de drive/carga."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Monotonicidad y resolución son idénticas?",
        "answer": "no",
        "hint": "Una es propiedad de la transferencia."
      }
    ]
  },
  "analog-power-supplies": {
    "id": "analog-power-supplies",
    "courseId": 52,
    "title": "Fuentes, rails, desacoplo y retorno",
    "shortTitle": "Fuentes",
    "duration": 90,
    "objective": "Diseñar alimentación analógica como red de energía e impedancias: rails, desacoplo, retorno, ripple, transitorios y separación funcional.",
    "summary": [
      "La fuente no es un nodo ideal: tiene impedancia, ripple, transitorios, retorno y límites de corriente.",
      "Desacoplo local reduce impedancia de alimentación en un rango de frecuencia, pero layout e inductancia parásita importan.",
      "Ground es una referencia y camino de retorno físico; corrientes compartidas pueden convertir impedancia común en error de señal."
    ],
    "concept": "La fuente no es un nodo ideal: tiene impedancia, ripple, transitorios, retorno y límites de corriente.",
    "rules": [
      "Dibuja caminos de corriente de retorno.",
      "Coloca desacoplo según loop físico, no solo por proximidad visual.",
      "Separa ruido de alimentación, regulación y referencia analógica."
    ],
    "deep": {
      "intro": "Diseñar alimentación analógica como red de energía e impedancias: rails, desacoplo, retorno, ripple, transitorios y separación funcional.",
      "sections": [
        {
          "title": "Rail impedance",
          "body": "Un cambio de corriente ΔI sobre impedancia Z produce perturbación ΔV=Z·ΔI en el modelo lineal."
        },
        {
          "title": "Decoupling",
          "body": "Capacitores de distintos valores/tecnologías cubren rangos, pero sus ESL/ESR crean resonancias."
        },
        {
          "title": "Ground",
          "body": "Una pista/plano real tiene impedancia; ground bounce es una caída dinámica, no un cambio metafísico del cero."
        },
        {
          "title": "Power tree",
          "body": "Convertidores switching, LDOs y filtros pueden combinar eficiencia y limpieza según la carga."
        }
      ]
    },
    "example": {
      "problem": "Impedancia de rail 0.08 Ω y step de corriente 0.5 A. Perturbación resistiva ideal.",
      "steps": [
        "0.08·0.5=0.04."
      ],
      "solution": "40 mV."
    },
    "check": {
      "question": "¿Ground real tiene siempre exactamente 0 Ω entre todos sus puntos?",
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
          "Solo en PCB",
          false
        ]
      ],
      "feedback": "Pistas, planos y conexiones tienen impedancia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Z=0.02Ω, ΔI=1.5A: ΔV V.",
        "answer": "0.03",
        "hint": "Z·I."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Decoupling depende de layout?",
        "answer": "si",
        "hint": "ESL del loop importa."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Ripple y ruido aleatorio son necesariamente lo mismo?",
        "answer": "no",
        "hint": "Pueden tener orígenes/espectros distintos."
      }
    ]
  },
  "analog-noise": {
    "id": "analog-noise",
    "courseId": 52,
    "title": "Ruido, SNR y presupuesto de ruido",
    "shortTitle": "Ruido",
    "duration": 90,
    "objective": "Construir presupuestos de ruido distinguiendo ruido térmico, shot/1-f, bandwidth, densidad espectral y SNR.",
    "summary": [
      "El ruido se integra sobre bandwidth; una densidad V/√Hz no es un voltaje RMS hasta definir banda y shaping.",
      "Ruido térmico de una resistencia ideal tiene densidad sqrt(4kTR) V/√Hz en circuito abierto bajo el modelo clásico.",
      "Las fuentes de ruido no correlacionadas se combinan en potencia/varianza, no sumando directamente amplitudes RMS."
    ],
    "concept": "El ruido se integra sobre bandwidth; una densidad V/√Hz no es un voltaje RMS hasta definir banda y shaping.",
    "rules": [
      "Siempre adjunta bandwidth a una cifra de ruido integrada.",
      "Suma ruido no correlacionado por raíz de suma de cuadrados.",
      "Separa ruido aleatorio de interferencia determinista como hum o switching ripple."
    ],
    "deep": {
      "intro": "Construir presupuestos de ruido distinguiendo ruido térmico, shot/1-f, bandwidth, densidad espectral y SNR.",
      "sections": [
        {
          "title": "Johnson noise",
          "body": "e_n=sqrt(4kTR) V/√Hz para una resistencia a temperatura T en el modelo térmico clásico."
        },
        {
          "title": "Integración",
          "body": "Ruido blanco de densidad e_n sobre bandwidth B produce aproximadamente e_rms=e_n·sqrt(B)."
        },
        {
          "title": "SNR",
          "body": "SNR de amplitudes RMS compatibles: 20 log10(Vsignal/Vnoise)."
        },
        {
          "title": "1/f",
          "body": "A baja frecuencia muchos dispositivos muestran flicker noise que deja de ser blanco."
        }
      ]
    },
    "example": {
      "problem": "Ruido blanco 10 nV/√Hz sobre 10 kHz. RMS aproximado.",
      "steps": [
        "10e-9·sqrt(10000)=10e-9·100."
      ],
      "solution": "1 µV RMS."
    },
    "check": {
      "question": "¿10 nV/√Hz significa 10 nV RMS independientemente del bandwidth?",
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
          "Solo a 1 kHz",
          false
        ]
      ],
      "feedback": "La densidad debe integrarse sobre banda."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "5 nV/√Hz sobre 40 kHz: nV RMS.",
        "answer": "1000",
        "hint": "5·sqrt(40000)=1000 nV."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Ruidos RMS 3 y 4 uV no correlacionados: total uV.",
        "answer": "5",
        "hint": "RSS."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Hum de 50 Hz es necesariamente ruido blanco?",
        "answer": "no",
        "hint": "Es interferencia tonal/determinista."
      }
    ]
  },
  "analog-instrumentation": {
    "id": "analog-instrumentation",
    "courseId": 52,
    "title": "Instrumentación: medir sin engañarte",
    "shortTitle": "Instrumentación",
    "duration": 90,
    "objective": "Usar multímetro, osciloscopio, sondas y generador entendiendo bandwidth, loading, referencia, seguridad y error de medida.",
    "summary": [
      "El instrumento forma parte temporalmente del circuito: resistencia/capacitancia de entrada y ground lead pueden alterar lo medido.",
      "Sample rate y bandwidth del osciloscopio son especificaciones relacionadas pero no equivalentes.",
      "La referencia de una sonda de banco puede estar unida a protective earth; conectarla donde no corresponde puede cortocircuitar nodos peligrosamente."
    ],
    "concept": "El instrumento forma parte temporalmente del circuito: resistencia/capacitancia de entrada y ground lead pueden alterar lo medido.",
    "rules": [
      "Antes de medir, identifica referencia y límites de seguridad.",
      "Minimiza loop de ground para señales rápidas.",
      "Comprueba bandwidth, probe attenuation y compensation."
    ],
    "deep": {
      "intro": "Usar multímetro, osciloscopio, sondas y generador entendiendo bandwidth, loading, referencia, seguridad y error de medida.",
      "sections": [
        {
          "title": "Probe loading",
          "body": "Una sonda típica puede modelarse por Rinput || Cinput; la capacitancia domina más a alta frecuencia."
        },
        {
          "title": "Bandwidth",
          "body": "Un scope/probe de bandwidth limitada atenúa y desfasa contenido cercano/superior a su banda."
        },
        {
          "title": "Ground lead",
          "body": "Su inductancia puede producir ringing aparente en flancos rápidos."
        },
        {
          "title": "DMM vs scope",
          "body": "El multímetro resume magnitudes lentamente; el scope revela forma temporal. Ninguno reemplaza al otro."
        }
      ]
    },
    "example": {
      "problem": "Rsource=100 kΩ medido con DMM de 10 MΩ, fuente ideal 1 V. Lectura por divisor.",
      "steps": [
        "1·10M/(10M+100k)."
      ],
      "solution": "≈0.990099 V."
    },
    "check": {
      "question": "¿Una sonda puede crear ringing que no existía igual antes de conectarla?",
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
          "Solo en audio",
          false
        ]
      ],
      "feedback": "El loop y la capacitancia/inductancia de la sonda cargan el nodo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "1V, Rs=1M, DMM=10M: lectura V.",
        "answer": "0.909091",
        "hint": "10/(10+1)."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Bandwidth y sample rate son la misma especificación?",
        "answer": "no",
        "hint": "Una es respuesta analógica, otra muestreo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El ground clip de un scope de banco puede estar a earth?",
        "answer": "si",
        "hint": "Debe comprobarse por seguridad."
      }
    ]
  },
  "analog-signal-chain": {
    "id": "analog-signal-chain",
    "courseId": 52,
    "title": "Cadena analógica: sensor → ADC / DAC → actuador",
    "shortTitle": "Cadena de señal",
    "duration": 90,
    "objective": "Integrar sensores, amplificación, filtrado, referencia y conversión con un presupuesto de señal, ruido y error de extremo a extremo.",
    "summary": [
      "Optimizar una etapa aislada no garantiza una buena cadena: cada bloque consume headroom, noise budget, error y bandwidth.",
      "La ganancia debe colocar la señal útil en el rango del ADC sin saturar por offset, tolerancia o transitorios.",
      "Filtros, referencias y alimentación son parte de la medición, no accesorios externos."
    ],
    "concept": "Optimizar una etapa aislada no garantiza una buena cadena: cada bloque consume headroom, noise budget, error y bandwidth.",
    "rules": [
      "Haz presupuesto de amplitud y error de extremo a extremo.",
      "Coloca ganancia donde mejore SNR sin saturar.",
      "Define bandwidth útil antes de elegir sample rate y filtros."
    ],
    "deep": {
      "intro": "Integrar sensores, amplificación, filtrado, referencia y conversión con un presupuesto de señal, ruido y error de extremo a extremo.",
      "sections": [
        {
          "title": "Sensor",
          "body": "Especifica rango, source impedance, offset y ruido."
        },
        {
          "title": "AFE",
          "body": "Amplificador/filtro adapta niveles e impedancia y limita banda."
        },
        {
          "title": "ADC",
          "body": "Referencia y driver convierten señal condicionada a códigos."
        },
        {
          "title": "DAC/actuator",
          "body": "La salida puede requerir reconstrucción, buffer o etapa de potencia; separar señal de potencia evita exigir corriente imposible a un DAC."
        }
      ]
    },
    "example": {
      "problem": "Sensor 0..50 mV y ADC 0..2.5 V. Ganancia ideal para usar full-scale sin margen.",
      "steps": [
        "2.5/0.05=50."
      ],
      "solution": "50 V/V."
    },
    "check": {
      "question": "¿Usar exactamente full-scale nominal sin margen es siempre robusto?",
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
          "Solo con 24 bits",
          false
        ]
      ],
      "feedback": "Offset, tolerancia y transitorios pueden saturar."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Sensor 0..20mV a ADC 0..2V: ganancia ideal.",
        "answer": "100",
        "hint": "2/0.02."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La referencia ADC forma parte del error?",
        "answer": "si",
        "hint": "Escala la transferencia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más ganancia siempre mejora SNR sin coste?",
        "answer": "no",
        "hint": "Puede amplificar ruido/offset y saturar."
      }
    ]
  },
  "analog-lab-integration": {
    "id": "analog-lab-integration",
    "courseId": 52,
    "title": "Laboratorio: diseñar, simular, montar y medir",
    "shortTitle": "Laboratorio",
    "duration": 90,
    "objective": "Cerrar el ciclo de ingeniería analógica mediante cálculo, simulación, prototipo, medición, comparación y revisión de supuestos.",
    "summary": [
      "La simulación es un modelo y la medición es una interacción física; ambos pueden estar equivocados de formas distintas.",
      "Un buen experimento registra condiciones, instrumento, configuración, incertidumbre y diferencia respecto al modelo.",
      "La depuración analógica mejora cuando se divide la cadena y se inyectan/observan señales controladas por etapas."
    ],
    "concept": "La simulación es un modelo y la medición es una interacción física; ambos pueden estar equivocados de formas distintas.",
    "rules": [
      "Predice antes de medir.",
      "Registra configuración y unidades junto al resultado.",
      "Cuando modelo y medida discrepan, prueba primero supuestos observables: alimentación, referencia, carga, bandwidth y saturación."
    ],
    "deep": {
      "intro": "Cerrar el ciclo de ingeniería analógica mediante cálculo, simulación, prototipo, medición, comparación y revisión de supuestos.",
      "sections": [
        {
          "title": "Flujo",
          "body": "requirements → cálculo → simulación → breadboard/PCB → medición → comparación → iteración."
        },
        {
          "title": "Injection",
          "body": "Un generador permite aislar etapas; un scope de dos canales puede comparar entrada/salida y fase."
        },
        {
          "title": "Error budget",
          "body": "Tolerancias, offset, gain error, ruido e instrumento pueden estimarse antes de culpar al componente."
        },
        {
          "title": "Seguridad",
          "body": "Fuentes flotantes/earth-referenced, mains y high voltage requieren procedimientos adecuados; el curso no trata una breadboard como protección."
        }
      ]
    },
    "example": {
      "problem": "Diseño esperaba 2.00 V y mide 1.92 V. Error relativo respecto al esperado.",
      "steps": [
        "(1.92-2.00)/2.00=-0.04."
      ],
      "solution": "-4 %."
    },
    "check": {
      "question": "¿Una simulación que coincide con el esquema demuestra que el montaje real está bien?",
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
          "Solo SPICE",
          false
        ]
      ],
      "feedback": "Parásitos, modelos, conexiones e instrumentos pueden diferir."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Esperado 5.0 V, medido 4.9: error relativo %.",
        "answer": "-2",
        "hint": "(4.9-5)/5·100."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Conviene predecir antes de medir?",
        "answer": "si",
        "hint": "Permite falsar el modelo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una breadboard elimina riesgos de alimentación?",
        "answer": "no",
        "hint": "No es un sistema de seguridad."
      }
    ]
  }
});
