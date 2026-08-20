/**
 * BLOQUE 056 — PCB
 *
 * Regla editorial: el esquema expresa intención; la PCB es una estructura electromagnética,
 * térmica, mecánica y fabricable cuya geometría forma parte del circuito.
 */
window.LEARNING_PATHS[56] = {
  "level": "Experto práctico",
  "estimatedHours": 144,
  "description": "Diseño físico de PCB desde captura esquemática hasta PI/SI, EMC, fabricación, montaje y bring-up.",
  "outcomes": [
    "Traducir un circuito a layout manteniendo retorno, alimentación y restricciones mecánicas.",
    "Analizar PI/SI, impedancia y pares diferenciales sin confundir reglas de estilo con leyes físicas universales.",
    "Preparar outputs fabricables y diseñar para assembly, test y rework.",
    "Ejecutar un bring-up reproducible con instrumentación que no introduzca conclusiones falsas."
  ],
  "modules": [
    {
      "id": "m1-capture-layout",
      "title": "De intención a geometría",
      "description": "Esquemático, placement, traces y stackup",
      "lessons": [
        "pcb-schematics",
        "pcb-layout",
        "pcb-traces",
        "pcb-layers"
      ]
    },
    {
      "id": "m2-power-return",
      "title": "Referencia y alimentación",
      "description": "Retorno, desacoplo y power integrity",
      "lessons": [
        "pcb-ground-planes",
        "pcb-decoupling",
        "pcb-power-integrity"
      ]
    },
    {
      "id": "m3-signals-emc",
      "title": "Señales rápidas y compatibilidad",
      "description": "SI, pares, impedancia y EMC",
      "lessons": [
        "pcb-signal-integrity",
        "pcb-differential-pairs",
        "pcb-impedance",
        "pcb-emc"
      ]
    },
    {
      "id": "m4-production",
      "title": "Del conector al producto",
      "description": "Interfaces, fabricación, montaje y bring-up",
      "lessons": [
        "pcb-connectors",
        "pcb-manufacturing",
        "pcb-soldering",
        "pcb-physical-debug",
        "pcb-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "pcb-schematics": {
    "id": "pcb-schematics",
    "courseId": 56,
    "title": "Schematics: intención eléctrica antes de geometría",
    "shortTitle": "Esquemático",
    "duration": 90,
    "objective": "Traducir requisitos a una red eléctrica legible, verificable y trazable hacia footprints y nets.",
    "summary": [
      "El esquemático expresa conectividad e intención eléctrica; no contiene todavía la geometría física final de la placa.",
      "Nombra nets por función, no por posición accidental.",
      "Anota valores, referencias, power flags y test points con intención de revisión."
    ],
    "concept": "El esquemático expresa conectividad e intención eléctrica; no contiene todavía la geometría física final de la placa.",
    "rules": [
      "Nombra nets por función, no por posición accidental.",
      "Anota valores, referencias, power flags y test points con intención de revisión.",
      "ERC detecta clases de errores; no demuestra que el circuito cumpla requisitos."
    ],
    "deep": {
      "intro": "Traducir requisitos a una red eléctrica legible, verificable y trazable hacia footprints y nets.",
      "sections": [
        {
          "title": "Conectividad",
          "body": "Símbolos y wires definen una red lógica; net labels y buses organizan esa conectividad sin cambiar la física."
        },
        {
          "title": "Contrato",
          "body": "El esquemático debe dejar visibles rails, referencias, interfaces, polaridades y dependencias críticas."
        },
        {
          "title": "Footprints",
          "body": "Símbolo y footprint son capas distintas: una elección eléctrica correcta puede fallar si el package/pinout físico es erróneo."
        },
        {
          "title": "Revisión",
          "body": "ERC, BOM y revisión por bloques reducen errores antes de que el cobre haga caros los malentendidos."
        }
      ]
    },
    "example": {
      "problem": "Divisor 10 kΩ/10 kΩ desde 5 V. Tensión ideal en el nodo.",
      "steps": [
        "5·10/(10+10)=2.5 V."
      ],
      "solution": "2.5"
    },
    "check": {
      "question": "¿ERC garantiza que el diseño funcionará físicamente?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "ERC no valida todos los requisitos analógicos, térmicos o de layout."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿ERC garantiza que el diseño funcionará físicamente?",
        "answer": "no",
        "hint": "ERC no valida todos los requisitos analógicos, térmicos o de layout."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Divisor 10 kΩ/10 kΩ desde 5 V. Tensión ideal en el nodo.",
        "answer": "2.5",
        "hint": "5·10/(10+10)=2.5 V."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Esquemático ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-layout": {
    "id": "pcb-layout",
    "courseId": 56,
    "title": "PCB layout: placement antes de routing",
    "shortTitle": "Layout",
    "duration": 90,
    "objective": "Convertir conectividad en una geometría fabricable con placement guiado por flujo de señal, potencia, térmica y mecánica.",
    "summary": [
      "El layout asigna componentes y cobre a posiciones reales; placement y routing determinan parasitismos, retorno, manufactura y depuración.",
      "Coloca primero interfaces, potencia, clocks y bloques críticos.",
      "Minimiza loops críticos antes de optimizar estética."
    ],
    "concept": "El layout asigna componentes y cobre a posiciones reales; placement y routing determinan parasitismos, retorno, manufactura y depuración.",
    "rules": [
      "Coloca primero interfaces, potencia, clocks y bloques críticos.",
      "Minimiza loops críticos antes de optimizar estética.",
      "No uses el autorouter como sustituto de arquitectura física."
    ],
    "deep": {
      "intro": "Convertir conectividad en una geometría fabricable con placement guiado por flujo de señal, potencia, térmica y mecánica.",
      "sections": [
        {
          "title": "Placement",
          "body": "La posición de conectores, reguladores, ICs y desacoplos condiciona rutas, corrientes y accesibilidad."
        },
        {
          "title": "Flujo",
          "body": "Agrupar por función ayuda a que señal y retorno recorran trayectos cortos y comprensibles."
        },
        {
          "title": "Mecánica",
          "body": "Keepouts, alturas, tornillos y bordes son restricciones eléctricamente relevantes cuando rompen rutas o retornos."
        },
        {
          "title": "Iteración",
          "body": "Placement y routing se retroalimentan; mover un componente puede valer más que diez vias de emergencia."
        }
      ]
    },
    "example": {
      "problem": "Dos bloques separados 18 mm pasan a 7 mm. Reducción de distancia.",
      "steps": [
        "18-7=11 mm."
      ],
      "solution": "11"
    },
    "check": {
      "question": "¿Placement y routing son problemas independientes?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "La colocación determina gran parte del routing posible."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Placement y routing son problemas independientes?",
        "answer": "no",
        "hint": "La colocación determina gran parte del routing posible."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Dos bloques separados 18 mm pasan a 7 mm. Reducción de distancia.",
        "answer": "11",
        "hint": "18-7=11 mm."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Layout ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-traces": {
    "id": "pcb-traces",
    "courseId": 56,
    "title": "Traces y vias: interconexiones con R, L y C",
    "shortTitle": "Traces",
    "duration": 90,
    "objective": "Modelar una pista como interconexión física con resistencia, inductancia, capacitancia, corriente admisible y retorno.",
    "summary": [
      "Una trace no es un wire ideal: su geometría y entorno determinan resistencia, inductancia, capacitancia y acoplamiento.",
      "Ancho, espesor, longitud y temperatura importan para potencia.",
      "En señales rápidas importa el tiempo de subida, no solo la frecuencia de repetición."
    ],
    "concept": "Una trace no es un wire ideal: su geometría y entorno determinan resistencia, inductancia, capacitancia y acoplamiento.",
    "rules": [
      "Ancho, espesor, longitud y temperatura importan para potencia.",
      "En señales rápidas importa el tiempo de subida, no solo la frecuencia de repetición.",
      "Cada via añade geometría y cambia el camino de señal y retorno."
    ],
    "deep": {
      "intro": "Modelar una pista como interconexión física con resistencia, inductancia, capacitancia, corriente admisible y retorno.",
      "sections": [
        {
          "title": "DC",
          "body": "R≈ρL/(wt) muestra por qué longitud y sección afectan caída y calentamiento."
        },
        {
          "title": "Alta frecuencia",
          "body": "Una transición rápida contiene contenido espectral alto aunque el dato lógico cambie lentamente."
        },
        {
          "title": "Vias",
          "body": "Una via conecta capas pero añade inductancia/parásitos y puede obligar al retorno a buscar otra ruta."
        },
        {
          "title": "Corriente",
          "body": "La ampacidad depende de cobre, geometría, ventilación y límites térmicos; no uses una cifra universal."
        }
      ]
    },
    "example": {
      "problem": "Trace con 0.08 Ω lleva 1.5 A. Caída de tensión.",
      "steps": [
        "V=IR=0.12 V."
      ],
      "solution": "0.12"
    },
    "check": {
      "question": "¿Una señal de 1 MHz con flancos de 1 ns puede requerir tratamiento de alta velocidad?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "El tiempo de subida domina gran parte del contenido espectral."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una señal de 1 MHz con flancos de 1 ns puede requerir tratamiento de alta velocidad?",
        "answer": "si",
        "hint": "El tiempo de subida domina gran parte del contenido espectral."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Trace con 0.08 Ω lleva 1.5 A. Caída de tensión.",
        "answer": "0.12",
        "hint": "V=IR=0.12 V."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Traces ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-layers": {
    "id": "pcb-layers",
    "courseId": 56,
    "title": "Stackup y layers: dónde viven señal, potencia y referencia",
    "shortTitle": "Layers",
    "duration": 90,
    "objective": "Diseñar un stackup que dé referencias continuas, rutas razonables y fabricación controlable.",
    "summary": [
      "Las capas forman una estructura electromagnética: señales necesitan una referencia cercana y el stackup define acoplamiento e impedancia.",
      "Define stackup antes de fijar impedancias.",
      "Evita cambiar de referencia sin planificar el retorno."
    ],
    "concept": "Las capas forman una estructura electromagnética: señales necesitan una referencia cercana y el stackup define acoplamiento e impedancia.",
    "rules": [
      "Define stackup antes de fijar impedancias.",
      "Evita cambiar de referencia sin planificar el retorno.",
      "Más capas no arreglan automáticamente una arquitectura de retorno deficiente."
    ],
    "deep": {
      "intro": "Diseñar un stackup que dé referencias continuas, rutas razonables y fabricación controlable.",
      "sections": [
        {
          "title": "Stackup",
          "body": "Un 4-layer típico puede dedicar capas internas a referencias/potencia y externas a señales, pero no es receta universal."
        },
        {
          "title": "Referencia",
          "body": "La distancia a un plano cambia capacitancia, campo e impedancia de la interconexión."
        },
        {
          "title": "Cambio de capa",
          "body": "Una via de señal puede cambiar de plano de referencia; el retorno necesita una transición cercana adecuada."
        },
        {
          "title": "Fabricación",
          "body": "El fabricante controla espesores/dieléctricos reales, por lo que el stackup final debe acordarse con él."
        }
      ]
    },
    "example": {
      "problem": "Placa 1.6 mm con 4 capas; si dos dieléctricos suman 1.2 mm, resto total para otros materiales.",
      "steps": [
        "1.6-1.2=0.4 mm."
      ],
      "solution": "0.4"
    },
    "check": {
      "question": "¿El stackup puede cambiar la impedancia de una trace sin cambiar su ancho?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "La geometría respecto al plano de referencia importa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El stackup puede cambiar la impedancia de una trace sin cambiar su ancho?",
        "answer": "si",
        "hint": "La geometría respecto al plano de referencia importa."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Placa 1.6 mm con 4 capas; si dos dieléctricos suman 1.2 mm, resto total para otros materiales.",
        "answer": "0.4",
        "hint": "1.6-1.2=0.4 mm."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Layers ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-ground-planes": {
    "id": "pcb-ground-planes",
    "courseId": 56,
    "title": "Ground planes y caminos de retorno",
    "shortTitle": "Planos de masa",
    "duration": 90,
    "objective": "Razonar sobre corrientes de retorno y evitar cortes, slits o cambios de referencia que aumenten el área de loop.",
    "summary": [
      "Ground es una red física con impedancia; a alta frecuencia la corriente de retorno tiende a seguir una trayectoria de baja impedancia cercana a la señal.",
      "No trates ground como un nodo equipotencial perfecto.",
      "Mantén referencias continuas bajo señales rápidas cuando sea posible."
    ],
    "concept": "Ground es una red física con impedancia; a alta frecuencia la corriente de retorno tiende a seguir una trayectoria de baja impedancia cercana a la señal.",
    "rules": [
      "No trates ground como un nodo equipotencial perfecto.",
      "Mantén referencias continuas bajo señales rápidas cuando sea posible.",
      "No cruces un split de plano sin proporcionar un retorno controlado."
    ],
    "deep": {
      "intro": "Razonar sobre corrientes de retorno y evitar cortes, slits o cambios de referencia que aumenten el área de loop.",
      "sections": [
        {
          "title": "Retorno",
          "body": "El camino de ida y retorno forman un loop; aumentar su área incrementa inductancia y susceptibilidad EMI."
        },
        {
          "title": "Planos",
          "body": "Un plano continuo ofrece baja impedancia y retorno local para muchas rutas, pero no convierte toda la placa en ground ideal."
        },
        {
          "title": "Splits",
          "body": "Cruzar una discontinuidad puede forzar una gran desviación del retorno y aumentar EMI/crosstalk."
        },
        {
          "title": "Vias de stitching",
          "body": "En cambios de capa o bordes, vias de referencia pueden ayudar a mantener continuidad del retorno según la geometría."
        }
      ]
    },
    "example": {
      "problem": "Loop rectangular aproximado 20 mm × 5 mm. Área en mm².",
      "steps": [
        "20·5=100 mm²."
      ],
      "solution": "100"
    },
    "check": {
      "question": "¿Una señal rápida puede cruzar alegremente un split de plano sin consecuencias?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "El retorno puede verse obligado a desviarse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una señal rápida puede cruzar alegremente un split de plano sin consecuencias?",
        "answer": "no",
        "hint": "El retorno puede verse obligado a desviarse."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Loop rectangular aproximado 20 mm × 5 mm. Área en mm².",
        "answer": "100",
        "hint": "20·5=100 mm²."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Planos de masa ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-decoupling": {
    "id": "pcb-decoupling",
    "courseId": 56,
    "title": "Decoupling: cerrar el loop local de corriente",
    "shortTitle": "Desacoplo",
    "duration": 90,
    "objective": "Diseñar desacoplo por impedancia y geometría, no como una lista ritual de capacitores.",
    "summary": [
      "El desacoplo local proporciona corriente transitoria cerca del IC y reduce la impedancia del loop de alimentación en una banda de frecuencias.",
      "Minimiza el loop pin-capacitor-plane.",
      "Capacitancia nominal no basta: ESR, ESL y montaje importan."
    ],
    "concept": "El desacoplo local proporciona corriente transitoria cerca del IC y reduce la impedancia del loop de alimentación en una banda de frecuencias.",
    "rules": [
      "Minimiza el loop pin-capacitor-plane.",
      "Capacitancia nominal no basta: ESR, ESL y montaje importan.",
      "Combina bulk y local según la demanda y la red de potencia."
    ],
    "deep": {
      "intro": "Diseñar desacoplo por impedancia y geometría, no como una lista ritual de capacitores.",
      "sections": [
        {
          "title": "Transitorio",
          "body": "Cuando un IC cambia estado necesita corriente en poco tiempo; una ruta larga desde la fuente añade inductancia."
        },
        {
          "title": "Parásitos",
          "body": "Un capacitor real tiene ESR/ESL y frecuencia de autorresonancia."
        },
        {
          "title": "Placement",
          "body": "Un buen valor colocado con un loop largo puede rendir peor que un valor menor bien conectado."
        },
        {
          "title": "PDN",
          "body": "El desacoplo es parte de una red completa que incluye regulador, planos, vias, capacitores y carga."
        }
      ]
    },
    "example": {
      "problem": "Capacitor 100 nF entrega 20 mA durante 1 µs idealmente. Caída ΔV=IΔt/C.",
      "steps": [
        "0.02·1e-6/100e-9=0.2 V."
      ],
      "solution": "0.2"
    },
    "check": {
      "question": "¿100 nF cerca de cada IC garantiza una PDN correcta?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "La impedancia depende de frecuencia, parásitos y geometría."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿100 nF cerca de cada IC garantiza una PDN correcta?",
        "answer": "no",
        "hint": "La impedancia depende de frecuencia, parásitos y geometría."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Capacitor 100 nF entrega 20 mA durante 1 µs idealmente. Caída ΔV=IΔt/C.",
        "answer": "0.2",
        "hint": "0.02·1e-6/100e-9=0.2 V."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Desacoplo ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-power-integrity": {
    "id": "pcb-power-integrity",
    "courseId": 56,
    "title": "Power integrity: rails con impedancia finita",
    "shortTitle": "Power integrity",
    "duration": 90,
    "objective": "Presupuestar droop, ripple, transitorios y resonancias de la PDN desde regulador hasta cargas.",
    "summary": [
      "Power integrity busca que cada rail permanezca dentro de límites dinámicos pese a corriente variable e impedancia distribuida.",
      "Usa Ztarget≈ΔVpermitida/ΔI como primera cota, no como modelo completo.",
      "Revisa resonancias y anti-resonancias de la red."
    ],
    "concept": "Power integrity busca que cada rail permanezca dentro de límites dinámicos pese a corriente variable e impedancia distribuida.",
    "rules": [
      "Usa Ztarget≈ΔVpermitida/ΔI como primera cota, no como modelo completo.",
      "Revisa resonancias y anti-resonancias de la red.",
      "Separa caída DC, ripple periódico y transitorios rápidos."
    ],
    "deep": {
      "intro": "Presupuestar droop, ripple, transitorios y resonancias de la PDN desde regulador hasta cargas.",
      "sections": [
        {
          "title": "Target impedance",
          "body": "Si se permiten 50 mV ante 2 A de step, Ztarget≈25 mΩ."
        },
        {
          "title": "Frecuencia",
          "body": "Regulador, bulk, MLCC y package dominan bandas diferentes."
        },
        {
          "title": "Resonancia",
          "body": "Combinar capacitores puede crear picos de impedancia si sus parásitos interactúan."
        },
        {
          "title": "Medición",
          "body": "Osciloscopio/probe setup puede inventar o esconder ringing si el loop de medida es grande."
        }
      ]
    },
    "example": {
      "problem": "ΔV permitida 30 mV y step 1.5 A. Ztarget en mΩ.",
      "steps": [
        "0.03/1.5=0.02 Ω=20 mΩ."
      ],
      "solution": "20"
    },
    "check": {
      "question": "¿Una rail estable en DC demuestra buena power integrity?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "Los transitorios y resonancias pueden violar límites dinámicos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una rail estable en DC demuestra buena power integrity?",
        "answer": "no",
        "hint": "Los transitorios y resonancias pueden violar límites dinámicos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "ΔV permitida 30 mV y step 1.5 A. Ztarget en mΩ.",
        "answer": "20",
        "hint": "0.03/1.5=0.02 Ω=20 mΩ."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Power integrity ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-signal-integrity": {
    "id": "pcb-signal-integrity",
    "courseId": 56,
    "title": "Signal integrity: flancos, reflexión y crosstalk",
    "shortTitle": "Signal integrity",
    "duration": 90,
    "objective": "Decidir cuándo una interconexión debe tratarse como línea de transmisión y cómo controlar reflexión, crosstalk y retorno.",
    "summary": [
      "Signal integrity estudia si la forma temporal que llega al receptor conserva márgenes eléctricos suficientes ante la interconexión real.",
      "Compara tiempo de propagación con tiempo de subida, no solo baud rate.",
      "Terminación modifica reflexiones pero también carga/consumo."
    ],
    "concept": "Signal integrity estudia si la forma temporal que llega al receptor conserva márgenes eléctricos suficientes ante la interconexión real.",
    "rules": [
      "Compara tiempo de propagación con tiempo de subida, no solo baud rate.",
      "Terminación modifica reflexiones pero también carga/consumo.",
      "Crosstalk depende de acoplamiento y longitud paralela."
    ],
    "deep": {
      "intro": "Decidir cuándo una interconexión debe tratarse como línea de transmisión y cómo controlar reflexión, crosstalk y retorno.",
      "sections": [
        {
          "title": "Línea de transmisión",
          "body": "Cuando el delay ya no es despreciable frente al rise time, lumped-wire deja de ser un modelo suficiente."
        },
        {
          "title": "Reflexión",
          "body": "Mismatch de impedancia produce ondas reflejadas; Γ=(ZL-Z0)/(ZL+Z0)."
        },
        {
          "title": "Crosstalk",
          "body": "Campos compartidos entre pistas acoplan energía; separación y referencia cercana ayudan."
        },
        {
          "title": "Medida",
          "body": "Eye diagrams/TDR pueden revelar margen y discontinuidades, pero requieren instrumentación adecuada."
        }
      ]
    },
    "example": {
      "problem": "Z0=50 Ω, ZL=100 Ω. Coeficiente de reflexión Γ.",
      "steps": [
        "(100-50)/(100+50)=1/3≈0.333."
      ],
      "solution": "0.333"
    },
    "check": {
      "question": "¿Una frecuencia de clock baja garantiza que no haya problemas SI si los flancos son muy rápidos?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "Los flancos contienen frecuencias altas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una frecuencia de clock baja garantiza que no haya problemas SI si los flancos son muy rápidos?",
        "answer": "no",
        "hint": "Los flancos contienen frecuencias altas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Z0=50 Ω, ZL=100 Ω. Coeficiente de reflexión Γ.",
        "answer": "0.333",
        "hint": "(100-50)/(100+50)=1/3≈0.333."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Signal integrity ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-differential-pairs": {
    "id": "pcb-differential-pairs",
    "courseId": 56,
    "title": "Differential pairs: modo diferencial, common-mode y skew",
    "shortTitle": "Pares diferenciales",
    "duration": 90,
    "objective": "Rutar pares diferenciales preservando referencia, acoplamiento razonable y skew dentro del presupuesto del protocolo.",
    "summary": [
      "Un par diferencial transmite información principalmente por la diferencia entre dos conductores; el retorno y los campos siguen dependiendo del entorno físico.",
      "No confundas matched length con impedancia diferencial correcta.",
      "Prioriza simetría y referencia continua antes que serpentinas decorativas."
    ],
    "concept": "Un par diferencial transmite información principalmente por la diferencia entre dos conductores; el retorno y los campos siguen dependiendo del entorno físico.",
    "rules": [
      "No confundas matched length con impedancia diferencial correcta.",
      "Prioriza simetría y referencia continua antes que serpentinas decorativas.",
      "El skew permitido depende del receptor y del protocolo."
    ],
    "deep": {
      "intro": "Rutar pares diferenciales preservando referencia, acoplamiento razonable y skew dentro del presupuesto del protocolo.",
      "sections": [
        {
          "title": "Modos",
          "body": "Vdiff=Vp-Vn; Vcm=(Vp+Vn)/2 separa componentes diferencial y común."
        },
        {
          "title": "Impedancia",
          "body": "La impedancia diferencial depende de ancho, separación, dieléctrico y plano de referencia."
        },
        {
          "title": "Skew",
          "body": "Desigualdad de delay convierte parte del modo diferencial en error/common-mode."
        },
        {
          "title": "Tuning",
          "body": "Length tuning puede ayudar al skew, pero meandros excesivos añaden acoplamiento propio y pérdidas."
        }
      ]
    },
    "example": {
      "problem": "Vp=0.9 V, Vn=0.3 V. Vdiff.",
      "steps": [
        "0.9-0.3=0.6 V."
      ],
      "solution": "0.6"
    },
    "check": {
      "question": "¿Igualar longitudes garantiza por sí solo la impedancia diferencial correcta?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "La impedancia depende del stackup y geometría del par."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Igualar longitudes garantiza por sí solo la impedancia diferencial correcta?",
        "answer": "no",
        "hint": "La impedancia depende del stackup y geometría del par."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Vp=0.9 V, Vn=0.3 V. Vdiff.",
        "answer": "0.6",
        "hint": "0.9-0.3=0.6 V."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Pares diferenciales ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-impedance": {
    "id": "pcb-impedance",
    "courseId": 56,
    "title": "Controlled impedance: geometría, stackup y tolerancia",
    "shortTitle": "Impedancia",
    "duration": 90,
    "objective": "Entender por qué microstrip/stripline necesitan stackup y fabricación controlados para cumplir una impedancia objetivo.",
    "summary": [
      "La impedancia característica es una propiedad distribuida de la interconexión y su referencia, no una resistencia DC medida con multímetro.",
      "No uses una fórmula genérica sin stackup real.",
      "Acordar impedancia con fabricante es parte del diseño."
    ],
    "concept": "La impedancia característica es una propiedad distribuida de la interconexión y su referencia, no una resistencia DC medida con multímetro.",
    "rules": [
      "No uses una fórmula genérica sin stackup real.",
      "Acordar impedancia con fabricante es parte del diseño.",
      "Distingue impedance target, tolerance y termination."
    ],
    "deep": {
      "intro": "Entender por qué microstrip/stripline necesitan stackup y fabricación controlados para cumplir una impedancia objetivo.",
      "sections": [
        {
          "title": "Distribuida",
          "body": "L y C por unidad de longitud determinan aproximadamente Z0≈sqrt(L/C) en un modelo simple."
        },
        {
          "title": "Geometría",
          "body": "Ancho, espesor de cobre, altura al plano y permitividad modifican Z0."
        },
        {
          "title": "Fabricación",
          "body": "Etch y variación dieléctrica añaden tolerancia; el fabricante puede ajustar ancho para su proceso."
        },
        {
          "title": "DC vs RF",
          "body": "Una trace puede tener milésimas de ohm DC y 50 Ω de impedancia característica: no son la misma magnitud."
        }
      ]
    },
    "example": {
      "problem": "L=400 nH/m y C=160 pF/m. Z0 ideal sqrt(L/C).",
      "steps": [
        "sqrt(400e-9/160e-12)=50 Ω."
      ],
      "solution": "50"
    },
    "check": {
      "question": "¿50 Ω de impedancia característica significa 50 Ω de resistencia DC de la pista?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "Son magnitudes físicas distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿50 Ω de impedancia característica significa 50 Ω de resistencia DC de la pista?",
        "answer": "no",
        "hint": "Son magnitudes físicas distintas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "L=400 nH/m y C=160 pF/m. Z0 ideal sqrt(L/C).",
        "answer": "50",
        "hint": "sqrt(400e-9/160e-12)=50 Ω."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Impedancia ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-emc": {
    "id": "pcb-emc",
    "courseId": 56,
    "title": "EMC: emisiones, inmunidad y loops",
    "shortTitle": "EMC",
    "duration": 90,
    "objective": "Diseñar para limitar emisiones y susceptibilidad mediante retorno, filtrado, edge-rate, shielding y partitioning.",
    "summary": [
      "EMC exige que el equipo no emita interferencia excesiva y mantenga funcionamiento aceptable ante perturbaciones del entorno.",
      "Reduce áreas de loop antes de añadir ferritas al azar.",
      "Filtra en el punto donde la interferencia entra o sale."
    ],
    "concept": "EMC exige que el equipo no emita interferencia excesiva y mantenga funcionamiento aceptable ante perturbaciones del entorno.",
    "rules": [
      "Reduce áreas de loop antes de añadir ferritas al azar.",
      "Filtra en el punto donde la interferencia entra o sale.",
      "EMI debugging necesita hipótesis, probe adecuada y cambios controlados."
    ],
    "deep": {
      "intro": "Diseñar para limitar emisiones y susceptibilidad mediante retorno, filtrado, edge-rate, shielding y partitioning.",
      "sections": [
        {
          "title": "Fuentes",
          "body": "Clocks, switchers, cables y grandes loops son fuentes/antenas frecuentes."
        },
        {
          "title": "Acoplamiento",
          "body": "Conductivo, capacitivo, inductivo y radiado son mecanismos distintos."
        },
        {
          "title": "Contención",
          "body": "Planos, stitching, filtros y control de edge rate atacan mecanismos concretos."
        },
        {
          "title": "Compliance",
          "body": "Pasar EMC requiere condiciones y límites de una norma aplicable; una prueba casera no certifica el producto."
        }
      ]
    },
    "example": {
      "problem": "Reducir un loop de 300 mm² a 75 mm². Factor de reducción de área.",
      "steps": [
        "300/75=4."
      ],
      "solution": "4"
    },
    "check": {
      "question": "¿Añadir una ferrita cualquiera garantiza resolver EMI?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "Hay que identificar mecanismo, frecuencia y corriente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Añadir una ferrita cualquiera garantiza resolver EMI?",
        "answer": "no",
        "hint": "Hay que identificar mecanismo, frecuencia y corriente."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Reducir un loop de 300 mm² a 75 mm². Factor de reducción de área.",
        "answer": "4",
        "hint": "300/75=4."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: EMC ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-connectors": {
    "id": "pcb-connectors",
    "courseId": 56,
    "title": "Connectors, ESD y entradas/salidas del mundo real",
    "shortTitle": "Conectores",
    "duration": 90,
    "objective": "Diseñar interfaces que sobrevivan mecánica, hot-plug, ESD, sobrecorriente y retornos de cable.",
    "summary": [
      "El conector es frontera eléctrica y mecánica; puede introducir discontinuidades, transitorios y caminos de descarga hacia la placa.",
      "Protección debe desviar energía por un camino corto y controlado.",
      "Define pinout pensando en retorno, secuencia de conexión y error humano."
    ],
    "concept": "El conector es frontera eléctrica y mecánica; puede introducir discontinuidades, transitorios y caminos de descarga hacia la placa.",
    "rules": [
      "Protección debe desviar energía por un camino corto y controlado.",
      "Define pinout pensando en retorno, secuencia de conexión y error humano.",
      "No coloques protección ESD lejos del punto de entrada sin analizar el trayecto previo."
    ],
    "deep": {
      "intro": "Diseñar interfaces que sobrevivan mecánica, hot-plug, ESD, sobrecorriente y retornos de cable.",
      "sections": [
        {
          "title": "ESD",
          "body": "TVS y elementos de protección buscan conducir el pulso antes de que atraviese circuitería sensible."
        },
        {
          "title": "Mecánica",
          "body": "Retención, ciclos de inserción y strain relief pueden ser tan críticos como el pinout."
        },
        {
          "title": "Alta velocidad",
          "body": "Conector y footprint forman parte de la línea de transmisión."
        },
        {
          "title": "Potencia",
          "body": "Hot-plug e inrush pueden exigir limitación y secuenciación."
        }
      ]
    },
    "example": {
      "problem": "Conector entrega 5 V a carga de 2.5 Ω. Corriente ideal.",
      "steps": [
        "5/2.5=2 A."
      ],
      "solution": "2"
    },
    "check": {
      "question": "¿Un TVS muy lejos del conector protege igual automáticamente?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "El trayecto entre entrada y protección también participa en el transitorio."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un TVS muy lejos del conector protege igual automáticamente?",
        "answer": "no",
        "hint": "El trayecto entre entrada y protección también participa en el transitorio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Conector entrega 5 V a carga de 2.5 Ω. Corriente ideal.",
        "answer": "2",
        "hint": "5/2.5=2 A."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Conectores ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-manufacturing": {
    "id": "pcb-manufacturing",
    "courseId": 56,
    "title": "Manufacturing: DFM, Gerber/ODB++, drills y tolerancias",
    "shortTitle": "Fabricación",
    "duration": 90,
    "objective": "Preparar una placa para que una fábrica pueda producirla repetiblemente con reglas explícitas y outputs verificables.",
    "summary": [
      "Manufacturing traduce el diseño CAD a capas de cobre, máscara, serigrafía, taladros, perfiles y especificaciones de proceso.",
      "DRC debe usar capacidades reales del fabricante.",
      "Verifica archivos de fabricación con un visor independiente."
    ],
    "concept": "Manufacturing traduce el diseño CAD a capas de cobre, máscara, serigrafía, taladros, perfiles y especificaciones de proceso.",
    "rules": [
      "DRC debe usar capacidades reales del fabricante.",
      "Verifica archivos de fabricación con un visor independiente.",
      "Distingue finished hole de drill/tool size cuando aplique."
    ],
    "deep": {
      "intro": "Preparar una placa para que una fábrica pueda producirla repetiblemente con reglas explícitas y outputs verificables.",
      "sections": [
        {
          "title": "Outputs",
          "body": "Copper layers, solder mask, silkscreen, drill y board outline son entregables diferentes."
        },
        {
          "title": "Tolerancias",
          "body": "Ancho/espacio, annular ring, drill y registro tienen límites de proceso."
        },
        {
          "title": "Panelización",
          "body": "Rails, fiducials, tooling holes y tabs pueden ser requisitos de montaje/fábrica."
        },
        {
          "title": "Revisión",
          "body": "Un Gerber correcto puede seguir corresponder al revisionado equivocado: controla release y BOM."
        }
      ]
    },
    "example": {
      "problem": "Taladro acabado 0.8 mm y tolerancia radial total de plating 0.1 mm por diámetro asumido. Drill previo aproximado.",
      "steps": [
        "0.8+0.1=0.9 mm."
      ],
      "solution": "0.9"
    },
    "check": {
      "question": "¿Pasar DRC con reglas genéricas garantiza fabricabilidad en cualquier fabricante?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "Las capacidades del proceso varían."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Pasar DRC con reglas genéricas garantiza fabricabilidad en cualquier fabricante?",
        "answer": "no",
        "hint": "Las capacidades del proceso varían."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Taladro acabado 0.8 mm y tolerancia radial total de plating 0.1 mm por diámetro asumido. Drill previo aproximado.",
        "answer": "0.9",
        "hint": "0.8+0.1=0.9 mm."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Fabricación ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-soldering": {
    "id": "pcb-soldering",
    "courseId": 56,
    "title": "Soldering y assembly: convertir PCB en PCBA",
    "shortTitle": "Soldadura",
    "duration": 90,
    "objective": "Entender soldadura manual/reflow, wetting, perfiles, defectos y diseño para ensamblaje/rework.",
    "summary": [
      "La soldadura forma unión eléctrica y mecánica entre terminal y pad; calidad depende de superficies, temperatura, aleación, flux, geometría y proceso.",
      "Más temperatura no significa mejor unión.",
      "Diseña footprints pensando en montaje e inspección."
    ],
    "concept": "La soldadura forma unión eléctrica y mecánica entre terminal y pad; calidad depende de superficies, temperatura, aleación, flux, geometría y proceso.",
    "rules": [
      "Más temperatura no significa mejor unión.",
      "Diseña footprints pensando en montaje e inspección.",
      "Distingue defecto cosmético de defecto eléctrico/mecánico real."
    ],
    "deep": {
      "intro": "Entender soldadura manual/reflow, wetting, perfiles, defectos y diseño para ensamblaje/rework.",
      "sections": [
        {
          "title": "Wetting",
          "body": "Una unión sana requiere superficies adecuadas, flux y tiempo/temperatura dentro del proceso."
        },
        {
          "title": "Reflow",
          "body": "El perfil térmico limita ramp, soak, peak y time-above-liquidus según componentes/pasta."
        },
        {
          "title": "Defectos",
          "body": "Bridges, tombstoning, opens y voids tienen causas diferentes."
        },
        {
          "title": "Rework",
          "body": "Acceso y masa térmica determinan reparabilidad; una placa imposible de reparar aumenta coste de bring-up."
        }
      ]
    },
    "example": {
      "problem": "100 placas con 24 joints cada una. Joints totales.",
      "steps": [
        "100·24=2400."
      ],
      "solution": "2400"
    },
    "check": {
      "question": "¿Subir indefinidamente la temperatura del soldador mejora siempre la soldadura?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "Puede dañar pads/componentes y degradar flux."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Subir indefinidamente la temperatura del soldador mejora siempre la soldadura?",
        "answer": "no",
        "hint": "Puede dañar pads/componentes y degradar flux."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "100 placas con 24 joints cada una. Joints totales.",
        "answer": "2400",
        "hint": "100·24=2400."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Soldadura ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-physical-debug": {
    "id": "pcb-physical-debug",
    "courseId": 56,
    "title": "Debugging físico: medir sin engañarte",
    "shortTitle": "Debug físico",
    "duration": 90,
    "objective": "Localizar fallos reales con inspección, continuidad, consumo, rails, osciloscopio, térmica y estrategia por bloques.",
    "summary": [
      "Debugging físico combina observación eléctrica y mecánica; la propia medición puede alterar el circuito y debe respetar seguridad y referencias.",
      "Empieza por alimentación, cortos y orientación antes de culpar al firmware.",
      "Usa ground spring/probes adecuadas en señales rápidas."
    ],
    "concept": "Debugging físico combina observación eléctrica y mecánica; la propia medición puede alterar el circuito y debe respetar seguridad y referencias.",
    "rules": [
      "Empieza por alimentación, cortos y orientación antes de culpar al firmware.",
      "Usa ground spring/probes adecuadas en señales rápidas.",
      "Compara contra puntos esperados y divide el sistema por bloques."
    ],
    "deep": {
      "intro": "Localizar fallos reales con inspección, continuidad, consumo, rails, osciloscopio, térmica y estrategia por bloques.",
      "sections": [
        {
          "title": "Bring-up",
          "body": "Secuencia típica: inspección visual, resistencia rail-ground sin energizar, fuente limitada, rails/clocks/reset, luego interfaces."
        },
        {
          "title": "Instrumentación",
          "body": "Una ground lead larga añade inductancia y puede crear ringing ficticio."
        },
        {
          "title": "Térmica",
          "body": "Cámara/termopar puede detectar cortos, reguladores saturados o componentes invertidos."
        },
        {
          "title": "Trazabilidad",
          "body": "Registra board revision, firmware, condiciones y mediciones para que el fallo sea reproducible."
        }
      ]
    },
    "example": {
      "problem": "Fuente limitada a 0.25 A sobre 5 V. Potencia máxima antes de current limit.",
      "steps": [
        "5·0.25=1.25 W."
      ],
      "solution": "1.25"
    },
    "check": {
      "question": "¿Un ringing visto con ground lead largo prueba automáticamente que existe en la placa?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "El loop de la sonda puede introducir artefactos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un ringing visto con ground lead largo prueba automáticamente que existe en la placa?",
        "answer": "no",
        "hint": "El loop de la sonda puede introducir artefactos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Fuente limitada a 0.25 A sobre 5 V. Potencia máxima antes de current limit.",
        "answer": "1.25",
        "hint": "5·0.25=1.25 W."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Debug físico ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  },
  "pcb-integration": {
    "id": "pcb-integration",
    "courseId": 56,
    "title": "Proyecto PCB: del esquema al bring-up reproducible",
    "shortTitle": "Proyecto PCB",
    "duration": 90,
    "objective": "Integrar esquemático, stackup, placement, PI/SI/EMC, fabricación, montaje y test en un flujo reproducible.",
    "summary": [
      "Un proyecto PCB profesional es una cadena de decisiones y verificaciones desde requisitos hasta bring-up; no termina cuando desaparecen las ratsnests.",
      "Congela revisiones de schematic, layout, BOM y firmware de prueba.",
      "Diseña test points y observabilidad antes de fabricar."
    ],
    "concept": "Un proyecto PCB profesional es una cadena de decisiones y verificaciones desde requisitos hasta bring-up; no termina cuando desaparecen las ratsnests.",
    "rules": [
      "Congela revisiones de schematic, layout, BOM y firmware de prueba.",
      "Diseña test points y observabilidad antes de fabricar.",
      "Entrega checklist de DRC/ERC/DFM y plan de bring-up."
    ],
    "deep": {
      "intro": "Integrar esquemático, stackup, placement, PI/SI/EMC, fabricación, montaje y test en un flujo reproducible.",
      "sections": [
        {
          "title": "Flujo",
          "body": "Requirements → schematic/ERC → placement → routing/DRC → outputs → fab/assembly → bring-up → validation."
        },
        {
          "title": "Testability",
          "body": "Test points, LEDs, headers y separaciones de bloques reducen tiempo de diagnóstico."
        },
        {
          "title": "Presupuestos",
          "body": "Incluye corriente, pérdidas, temperatura, impedancia, skew y margins donde apliquen."
        },
        {
          "title": "Postmortem",
          "body": "Cada fallo de prototipo debe volver como regla, test o checklist para la siguiente revisión."
        }
      ]
    },
    "example": {
      "problem": "Fabricación 5 días + montaje 2 + bring-up 3. Duración total mínima secuencial.",
      "steps": [
        "5+2+3=10 días."
      ],
      "solution": "10"
    },
    "check": {
      "question": "¿Una placa sin errores DRC está automáticamente lista para producción?",
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
          "Depende del color de la PCB",
          false
        ]
      ],
      "feedback": "Faltan revisión eléctrica, DFM, BOM, test y validación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una placa sin errores DRC está automáticamente lista para producción?",
        "answer": "no",
        "hint": "Faltan revisión eléctrica, DFM, BOM, test y validación."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Fabricación 5 días + montaje 2 + bring-up 3. Duración total mínima secuencial.",
        "answer": "10",
        "hint": "5+2+3=10 días."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Resume en una palabra si la siguiente equivalencia es válida: Proyecto PCB ideal = comportamiento físico completo. sí/no",
        "answer": "no",
        "hint": "Los modelos y reglas de diseño tienen dominio de validez."
      }
    ]
  }
});
