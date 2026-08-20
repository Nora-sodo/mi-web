/**
 * BLOQUE 051 — Música Procedural
 *
 * Regla editorial: separar señal de audio, control y representación musical;
 * usar el reloj de audio para scheduling preciso; distinguir síntesis procedural
 * de aleatoriedad sin restricciones y medir bytes, CPU, RAM y calidad por separado.
 */
window.LEARNING_PATHS[51] = {
  "level": "Experto técnico-creativo",
  "estimatedHours": 120,
  "description": "Síntesis y composición procedural para tiempo real, demoscene y sizecoding: DSP, timing musical, trackers y tiny synths.",
  "outcomes": [
    "Construir osciladores, envelopes, filtros y moduladores con timing de audio correcto.",
    "Diseñar secuenciadores y representaciones tracker/procedurales reproducibles.",
    "Crear tiny synths entendiendo trade-offs entre bytes distribuidos, CPU, RAM y compresibilidad.",
    "Sincronizar música procedural con visuales mediante un timeline independiente del frame rate."
  ],
  "modules": [
    {
      "id": "m1-synthesis",
      "title": "Síntesis fundamental",
      "description": "Osciladores, ondas, envelopes, filtros y modulación",
      "lessons": [
        "music-oscillators",
        "music-waveforms",
        "music-adsr",
        "music-filters",
        "music-lfo",
        "music-fm",
        "music-subtractive"
      ]
    },
    {
      "id": "m2-sequencing",
      "title": "Tiempo y composición",
      "description": "Secuenciación, tracker music y música procedural",
      "lessons": [
        "music-sequencers",
        "music-tracker",
        "music-procedural",
        "music-audio-clock"
      ]
    },
    {
      "id": "m3-sizecoding",
      "title": "Generación compacta",
      "description": "Tiny synths y composición generativa",
      "lessons": [
        "music-tiny-synths",
        "music-generative-composition"
      ]
    },
    {
      "id": "m4-integration",
      "title": "Producción demoscene",
      "description": "Integración audiovisual y presupuestos",
      "lessons": [
        "music-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "music-oscillators": {
    "id": "music-oscillators",
    "courseId": 51,
    "title": "Osciladores, fase y frecuencia",
    "shortTitle": "Osciladores",
    "duration": 90,
    "objective": "Construir osciladores digitales continuos entre buffers y razonar sobre frecuencia, fase y sample rate.",
    "summary": [
      "Un oscilador digital genera muestras a partir de un estado de fase que debe mantenerse continuo entre callbacks.",
      "La frecuencia controla el avance de fase por segundo; el sample rate determina cuántas muestras representan ese avance.",
      "Reiniciar fase accidentalmente en cada buffer produce discontinuidades y clics, aunque la fórmula de la onda sea correcta."
    ],
    "concept": "Un oscilador digital genera muestras a partir de un estado de fase que debe mantenerse continuo entre callbacks.",
    "rules": [
      "Mantén fase como estado persistente.",
      "Expresa el incremento como frecuencia/sample rate.",
      "Separa frecuencia musical de frecuencia de muestreo."
    ],
    "deep": {
      "intro": "Construir osciladores digitales continuos entre buffers y razonar sobre frecuencia, fase y sample rate.",
      "sections": [
        {
          "title": "Acumulador de fase",
          "body": "Para una fase normalizada φ∈[0,1), un oscilador puede hacer φ←fract(φ+f/Fs) por muestra."
        },
        {
          "title": "Continuidad",
          "body": "El callback siguiente debe comenzar desde la fase donde terminó el anterior, salvo que el diseño musical pida un reset."
        },
        {
          "title": "Afinación",
          "body": "La relación entre frecuencias musicales es multiplicativa: subir una octava duplica la frecuencia."
        },
        {
          "title": "Numerical wrap",
          "body": "Acotar periódicamente la fase evita crecimiento ilimitado y mantiene una representación estable."
        }
      ]
    },
    "example": {
      "problem": "Fs=48000 Hz y f=1000 Hz. Incremento de fase normalizada por muestra.",
      "steps": [
        "Δφ=1000/48000.",
        "Δφ=1/48."
      ],
      "solution": "1/48 ≈ 0.0208333."
    },
    "check": {
      "question": "¿Reiniciar la fase al principio de cada audio buffer es transparente en general?",
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
          "Solo en estéreo",
          false
        ]
      ],
      "feedback": "Puede crear discontinuidades y clics."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una octava por encima duplica frecuencia?",
        "answer": "si",
        "hint": "Relación 2:1."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Fs=48000, f=12000. Δφ normalizada.",
        "answer": "0.25",
        "hint": "12000/48000."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La fase debe sobrevivir entre callbacks para un tono continuo?",
        "answer": "si",
        "hint": "Piensa en continuidad temporal."
      }
    ]
  },
  "music-waveforms": {
    "id": "music-waveforms",
    "courseId": 51,
    "title": "Formas de onda, armónicos y aliasing",
    "shortTitle": "Ondas",
    "duration": 90,
    "objective": "Relacionar formas de onda con espectro armónico y producir variantes digitales sin confundir fórmula ideal con señal band-limited.",
    "summary": [
      "Seno, cuadrada, sierra y triángulo tienen estructuras espectrales distintas; las discontinuidades ideales implican armónicos arbitrariamente altos.",
      "Una sierra o cuadrada evaluada ingenuamente en tiempo discreto puede plegar armónicos por encima de Nyquist y producir aliasing audible.",
      "Band-limiting, oversampling o técnicas como PolyBLEP reducen artefactos sin cambiar la intención musical de la forma de onda."
    ],
    "concept": "Seno, cuadrada, sierra y triángulo tienen estructuras espectrales distintas; las discontinuidades ideales implican armónicos arbitrariamente altos.",
    "rules": [
      "No asumas que una fórmula ideal es digitalmente band-limited.",
      "Relaciona timbre con espectro, no solo con dibujo temporal.",
      "Mide aliasing cerca de frecuencias altas."
    ],
    "deep": {
      "intro": "Relacionar formas de onda con espectro armónico y producir variantes digitales sin confundir fórmula ideal con señal band-limited.",
      "sections": [
        {
          "title": "Seno",
          "body": "Una sinusoidal ideal contiene una sola frecuencia."
        },
        {
          "title": "Cuadrada",
          "body": "Una cuadrada ideal simétrica contiene principalmente armónicos impares con amplitud decreciente."
        },
        {
          "title": "Sierra",
          "body": "La sierra ideal contiene armónicos enteros y su discontinuidad la vuelve especialmente sensible al aliasing digital."
        },
        {
          "title": "Band limiting",
          "body": "Métodos como PolyBLEP corrigen discontinuidades localmente; oversampling desplaza el Nyquist interno y después filtra/decima."
        }
      ]
    },
    "example": {
      "problem": "Fs=48000 Hz. Frecuencia de Nyquist.",
      "steps": [
        "Fs/2=24000."
      ],
      "solution": "24000 Hz."
    },
    "check": {
      "question": "¿Una sierra digital ingenua es automáticamente band-limited?",
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
          "Solo a 44.1 kHz",
          false
        ]
      ],
      "feedback": "Sus armónicos ideales exceden Nyquist."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Nyquist para 44100 Hz.",
        "answer": "22050",
        "hint": "Fs/2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una sinusoidal pura ideal tiene armónicos adicionales?",
        "answer": "no",
        "hint": "Es una sola componente."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Oversampling elimina la necesidad de filtrar al reducir sample rate?",
        "answer": "no",
        "hint": "La decimación necesita controlar contenido fuera de banda."
      }
    ]
  },
  "music-adsr": {
    "id": "music-adsr",
    "courseId": 51,
    "title": "ADSR y envolventes",
    "shortTitle": "ADSR",
    "duration": 90,
    "objective": "Modelar amplitud y otros parámetros mediante envolventes temporales con estados y unidades explícitas.",
    "summary": [
      "ADSR divide una envolvente típica en attack, decay, sustain y release; sustain es un nivel, no una duración fija.",
      "La envolvente debe evolucionar de forma coherente incluso si note-off llega antes de completar attack/decay.",
      "Curvas lineales y exponenciales producen respuestas perceptualmente distintas aunque compartan tiempos nominales."
    ],
    "concept": "ADSR divide una envolvente típica en attack, decay, sustain y release; sustain es un nivel, no una duración fija.",
    "rules": [
      "Trata sustain como nivel.",
      "Define comportamiento ante note-off en cualquier fase.",
      "No confundas tiempo musical con número de callbacks."
    ],
    "deep": {
      "intro": "Modelar amplitud y otros parámetros mediante envolventes temporales con estados y unidades explícitas.",
      "sections": [
        {
          "title": "Estados",
          "body": "Attack sube, decay cae hacia sustain, sustain mantiene mientras la nota siga activa y release conduce al reposo."
        },
        {
          "title": "Retrigger",
          "body": "Un nuevo note-on puede reiniciar desde cero o desde el nivel actual; ambas políticas son válidas si se declaran."
        },
        {
          "title": "Curvas",
          "body": "Una interpolación exponencial suele aproximar mejor algunos fenómenos perceptivos y circuitos, pero requiere cuidado cerca de cero."
        },
        {
          "title": "Modulación",
          "body": "La misma arquitectura puede envolver cutoff, pitch u otros parámetros, no solo amplitud."
        }
      ]
    },
    "example": {
      "problem": "Attack lineal de 0 a 1 en 0.1 s a 48000 Hz. Muestras.",
      "steps": [
        "0.1·48000=4800."
      ],
      "solution": "4800 muestras."
    },
    "check": {
      "question": "¿Sustain especifica necesariamente cuánto dura esa fase?",
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
          "Solo en MIDI",
          false
        ]
      ],
      "feedback": "Sustain suele ser un nivel sostenido hasta note-off."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "0.25 s a 48000 Hz son muestras.",
        "answer": "12000",
        "hint": "Multiplica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Release puede empezar antes de alcanzar sustain?",
        "answer": "si",
        "hint": "Note-off puede ocurrir en cualquier fase."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cambiar curva lineal por exponencial deja idéntica la evolución perceptual?",
        "answer": "no",
        "hint": "La forma temporal cambia."
      }
    ]
  },
  "music-filters": {
    "id": "music-filters",
    "courseId": 51,
    "title": "Filtros musicales y estabilidad",
    "shortTitle": "Filtros",
    "duration": 90,
    "objective": "Usar filtros para modelar timbre separando frecuencia de corte, resonancia, respuesta y estabilidad numérica.",
    "summary": [
      "Los filtros modifican el espectro mediante una respuesta en frecuencia; low-pass, high-pass, band-pass y notch describen familias de respuesta, no implementaciones únicas.",
      "Un filtro IIR introduce estado realimentado y puede ser eficiente, pero sus coeficientes y actualización deben respetar estabilidad y límites numéricos.",
      "En un sintetizador la modulación rápida de cutoff/resonancia puede exigir suavizado o estructuras diseñadas para parámetros variables."
    ],
    "concept": "Los filtros modifican el espectro mediante una respuesta en frecuencia; low-pass, high-pass, band-pass y notch describen familias de respuesta, no implementaciones únicas.",
    "rules": [
      "Distingue tipo de respuesta de estructura de implementación.",
      "No cambies coeficientes bruscamente sin analizar estabilidad/zipper noise.",
      "Mide respuesta y no confíes solo en nombres como low-pass."
    ],
    "deep": {
      "intro": "Usar filtros para modelar timbre separando frecuencia de corte, resonancia, respuesta y estabilidad numérica.",
      "sections": [
        {
          "title": "Cutoff",
          "body": "La frecuencia de corte caracteriza una transición, no un muro ideal donde toda señal desaparece."
        },
        {
          "title": "Resonancia",
          "body": "Aumentar Q/resonancia enfatiza una región alrededor del cutoff y puede acercar algunas estructuras a auto-oscilación."
        },
        {
          "title": "IIR",
          "body": "El estado previo entra en la salida futura; errores o inestabilidad pueden persistir."
        },
        {
          "title": "Smoothing",
          "body": "Interpolar parámetros o usar filtros topology-preserving puede reducir artefactos durante modulación intensa."
        }
      ]
    },
    "example": {
      "problem": "Un low-pass atenúa principalmente qué región respecto a cutoff.",
      "steps": [
        "Frecuencias superiores al cutoff."
      ],
      "solution": "Las altas frecuencias."
    },
    "check": {
      "question": "¿Low-pass significa que toda frecuencia sobre cutoff vale exactamente cero?",
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
          "Solo digital",
          false
        ]
      ],
      "feedback": "Los filtros realizables tienen transición finita."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un high-pass atenúa principalmente bajas frecuencias?",
        "answer": "si",
        "hint": "Nombre del filtro."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un IIR puede depender de salidas/estado anteriores?",
        "answer": "si",
        "hint": "Tiene feedback."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cambiar cutoff por saltos grandes puede crear artefactos?",
        "answer": "si",
        "hint": "Zipper noise/transitorios."
      }
    ]
  },
  "music-lfo": {
    "id": "music-lfo",
    "courseId": 51,
    "title": "LFO y modulación",
    "shortTitle": "LFO",
    "duration": 90,
    "objective": "Aplicar osciladores de baja frecuencia como señales de control sin confundir frecuencia de modulación con frecuencia audible portadora.",
    "summary": [
      "Un LFO es un oscilador usado como modulador lento de parámetros como pitch, amplitude, pan o cutoff.",
      "Vibrato y tremolo suelen corresponder a modulación de pitch y amplitud respectivamente, aunque profundidad y tasa determinan el efecto real.",
      "El mismo mecanismo deja de ser conceptualmente LFO cuando la tasa sube al dominio audible y puede generar sidebands perceptibles."
    ],
    "concept": "Un LFO es un oscilador usado como modulador lento de parámetros como pitch, amplitude, pan o cutoff.",
    "rules": [
      "Nombra siempre parámetro modulado y profundidad.",
      "Separa rate de depth.",
      "No asumas que LFO debe ser sinusoidal."
    ],
    "deep": {
      "intro": "Aplicar osciladores de baja frecuencia como señales de control sin confundir frecuencia de modulación con frecuencia audible portadora.",
      "sections": [
        {
          "title": "Vibrato",
          "body": "Una pequeña modulación periódica de frecuencia/pitch produce vibrato."
        },
        {
          "title": "Tremolo",
          "body": "Modular ganancia periódicamente produce tremolo."
        },
        {
          "title": "Forma",
          "body": "Triángulo, sample-and-hold o noise pueden crear modulaciones distintas."
        },
        {
          "title": "Sync",
          "body": "Un LFO puede ser libre en Hz o sincronizado a tempo mediante divisiones musicales."
        }
      ]
    },
    "example": {
      "problem": "LFO de 5 Hz completa ciclos en 2 s.",
      "steps": [
        "5·2=10."
      ],
      "solution": "10 ciclos."
    },
    "check": {
      "question": "¿Rate y depth de un LFO son el mismo parámetro?",
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
          "Solo en FM",
          false
        ]
      ],
      "feedback": "Rate controla velocidad; depth amplitud de modulación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "4 Hz durante 3 s: ciclos.",
        "answer": "12",
        "hint": "4·3."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Tremolo suele modular amplitud?",
        "answer": "si",
        "hint": "Ganancia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un LFO puede sincronizarse al tempo en vez de usar Hz libres?",
        "answer": "si",
        "hint": "Clock musical."
      }
    ]
  },
  "music-fm": {
    "id": "music-fm",
    "courseId": 51,
    "title": "FM, PM y síntesis por modulación",
    "shortTitle": "FM",
    "duration": 90,
    "objective": "Entender síntesis FM/PM mediante portadora, moduladora e índice de modulación, separándola de vibrato lento.",
    "summary": [
      "La modulación rápida de fase/frecuencia genera nuevas componentes espectrales alrededor de la portadora; no es simplemente un vibrato acelerado en términos perceptivos.",
      "En la formulación clásica de phase modulation, el índice controla la profundidad espectral y la razón entre frecuencias ayuda a determinar periodicidad/timbre.",
      "Implementaciones musicales llamadas FM pueden estar formuladas internamente como phase modulation por razones numéricas y de control."
    ],
    "concept": "La modulación rápida de fase/frecuencia genera nuevas componentes espectrales alrededor de la portadora; no es simplemente un vibrato acelerado en términos perceptivos.",
    "rules": [
      "Distingue portadora y moduladora.",
      "Separa frecuencia de modulación de índice.",
      "No prometas equivalencia exacta entre toda FM analógica y PM digital."
    ],
    "deep": {
      "intro": "Entender síntesis FM/PM mediante portadora, moduladora e índice de modulación, separándola de vibrato lento.",
      "sections": [
        {
          "title": "Modelo",
          "body": "Una forma típica es y=sin(ωc t + I sin(ωm t))."
        },
        {
          "title": "Sidebands",
          "body": "La modulación crea componentes en torno a combinaciones de fc y fm con amplitudes dependientes de I."
        },
        {
          "title": "Ratios",
          "body": "Ratios racionales suelen producir espectros armónicos/periódicos; ratios no enteras pueden sonar más inarmónicas."
        },
        {
          "title": "Aliasing",
          "body": "Índices/tasas altos pueden producir sidebands sobre Nyquist que deben controlarse."
        }
      ]
    },
    "example": {
      "problem": "Portadora 440 Hz y moduladora 220 Hz. Ratio fc/fm.",
      "steps": [
        "440/220=2."
      ],
      "solution": "2."
    },
    "check": {
      "question": "¿Índice de modulación y frecuencia moduladora son lo mismo?",
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
          "Solo en DX7",
          false
        ]
      ],
      "feedback": "Uno controla profundidad; otro tasa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "fc=600, fm=200. Ratio.",
        "answer": "3",
        "hint": "Divide."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿FM/PM rápida puede generar nuevas componentes espectrales?",
        "answer": "si",
        "hint": "Sidebands."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Índice mayor garantiza ausencia de aliasing?",
        "answer": "no",
        "hint": "Puede ampliar espectro."
      }
    ]
  },
  "music-subtractive": {
    "id": "music-subtractive",
    "courseId": 51,
    "title": "Síntesis sustractiva",
    "shortTitle": "Sustractiva",
    "duration": 90,
    "objective": "Diseñar una voz sustractiva desde una fuente espectral rica, filtros y envolventes con signal flow explícito.",
    "summary": [
      "La síntesis sustractiva parte típicamente de osciladores ricos en armónicos y elimina/realza regiones mediante filtros.",
      "Oscillator, mixer, filter, amplifier y moduladores forman un signal flow; cambiar el orden puede cambiar el resultado.",
      "La arquitectura es modular: envelopes y LFOs son señales de control que pueden dirigirse a múltiples destinos."
    ],
    "concept": "La síntesis sustractiva parte típicamente de osciladores ricos en armónicos y elimina/realza regiones mediante filtros.",
    "rules": [
      "Dibuja signal flow antes de ajustar parámetros.",
      "Distingue señal de audio de señal de control.",
      "No asumas que el orden de bloques conmuta."
    ],
    "deep": {
      "intro": "Diseñar una voz sustractiva desde una fuente espectral rica, filtros y envolventes con signal flow explícito.",
      "sections": [
        {
          "title": "Fuente",
          "body": "Saw/pulse/noise proporcionan espectro que el filtro puede moldear."
        },
        {
          "title": "VCF/VCA",
          "body": "Filter y amplifier pueden recibir envelopes independientes."
        },
        {
          "title": "Mod matrix",
          "body": "Una matriz de modulación permite conectar fuentes de control a destinos con profundidad."
        },
        {
          "title": "Orden",
          "body": "Distorsión antes o después de un filtro no tiene, en general, el mismo resultado."
        }
      ]
    },
    "example": {
      "problem": "Dos osciladores a ganancia 0.4 cada uno se suman linealmente sin clipping. Pico máximo simple si ambos coinciden.",
      "steps": [
        "0.4+0.4=0.8."
      ],
      "solution": "0.8."
    },
    "check": {
      "question": "¿Mover una distorsión antes/después de un filtro es siempre equivalente?",
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
          "Solo mono",
          false
        ]
      ],
      "feedback": "Los bloques no lineales y filtros no conmutan en general."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "0.25+0.35 de dos osciladores alineados.",
        "answer": "0.6",
        "hint": "Suma."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una envelope puede modular cutoff además de volumen?",
        "answer": "si",
        "hint": "Es señal de control."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Signal flow debe distinguir audio de control?",
        "answer": "si",
        "hint": "Evita conexiones conceptualmente ambiguas."
      }
    ]
  },
  "music-sequencers": {
    "id": "music-sequencers",
    "courseId": 51,
    "title": "Sequencers, eventos y tiempo musical",
    "shortTitle": "Sequencers",
    "duration": 90,
    "objective": "Representar música como eventos sobre un reloj musical y convertir beats/ticks a tiempos de audio reproducibles.",
    "summary": [
      "Un sequencer representa eventos y automatización respecto a un timeline musical; no necesita depender del frame rate gráfico.",
      "Tempo, beats, bars, PPQ/ticks y sample positions son dominios temporales distintos que deben convertirse explícitamente.",
      "La programación sample-accurate evita jitter perceptible cuando la UI o el game loop entregan eventos de forma irregular."
    ],
    "concept": "Un sequencer representa eventos y automatización respecto a un timeline musical; no necesita depender del frame rate gráfico.",
    "rules": [
      "Usa reloj de audio para scheduling final.",
      "Distingue beat index de sample index.",
      "No programes notas comparando frame == beat."
    ],
    "deep": {
      "intro": "Representar música como eventos sobre un reloj musical y convertir beats/ticks a tiempos de audio reproducibles.",
      "sections": [
        {
          "title": "Tempo",
          "body": "A BPM beats/min, un beat dura 60/BPM segundos."
        },
        {
          "title": "PPQ",
          "body": "Pulses per quarter subdivide beats para expresar posiciones discretas con resolución musical."
        },
        {
          "title": "Scheduling",
          "body": "El hilo de control puede preparar eventos con anticipación y el callback los ejecuta en offsets de muestra exactos."
        },
        {
          "title": "Swing",
          "body": "Desplazar subdivisiones cambia timing expresivo; no equivale necesariamente a cambiar BPM global."
        }
      ]
    },
    "example": {
      "problem": "A 120 BPM, duración de 8 beats.",
      "steps": [
        "60/120=0.5 s/beat.",
        "8·0.5=4."
      ],
      "solution": "4 s."
    },
    "check": {
      "question": "¿El frame rate gráfico debe ser el reloj maestro de un sequencer de audio?",
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
          "Solo a 60 FPS",
          false
        ]
      ],
      "feedback": "El audio necesita su propio timeline estable."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "A 150 BPM, segundos por beat.",
        "answer": "0.4",
        "hint": "60/150."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "A 100 BPM, 10 beats duran segundos.",
        "answer": "6",
        "hint": "10·60/100."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿PPQ y sample rate son la misma unidad?",
        "answer": "no",
        "hint": "Ticks musicales vs muestras por segundo."
      }
    ]
  },
  "music-tracker": {
    "id": "music-tracker",
    "courseId": 51,
    "title": "Tracker music, patterns y effect commands",
    "shortTitle": "Trackers",
    "duration": 90,
    "objective": "Entender tracker music como representación musical compacta basada en patrones, filas, canales, instrumentos y comandos.",
    "summary": [
      "Un tracker organiza eventos en patrones y filas temporales, a menudo con canales verticales y comandos de efecto compactos.",
      "Pattern reuse y referencias a instrumentos separan estructura musical de samples/synth data, lo que favorece edición y, en ciertos contextos, compactación.",
      "Tempo, speed/ticks y semántica de efectos dependen del formato/tracker; no existe una regla universal idéntica para MOD, XM, S3M, IT y herramientas modernas."
    ],
    "concept": "Un tracker organiza eventos en patrones y filas temporales, a menudo con canales verticales y comandos de efecto compactos.",
    "rules": [
      "Declara formato/tracker cuando uses semántica exacta.",
      "Distingue pattern data de sample/instrument data.",
      "No asumas que una fila equivale a una duración fija universal."
    ],
    "deep": {
      "intro": "Entender tracker music como representación musical compacta basada en patrones, filas, canales, instrumentos y comandos.",
      "sections": [
        {
          "title": "Pattern",
          "body": "Un patrón es una rejilla de eventos reutilizable, no necesariamente audio renderizado."
        },
        {
          "title": "Instrumentos",
          "body": "Una nota puede referenciar un sample o un instrumento/synth compartido."
        },
        {
          "title": "Effects",
          "body": "Comandos pueden controlar pitch slides, volume, arpeggio u otras operaciones con semántica histórica específica."
        },
        {
          "title": "Demoscene",
          "body": "Trackers fueron una forma muy eficiente de transportar composición + samples bajo restricciones de memoria y distribución."
        }
      ]
    },
    "example": {
      "problem": "Pattern de 64 filas repetido 4 veces. Filas secuenciadas totales antes de loops internos.",
      "steps": [
        "64·4=256."
      ],
      "solution": "256."
    },
    "check": {
      "question": "¿Una fila de tracker tiene duración universal idéntica en todos los formatos?",
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
          "Solo MOD",
          false
        ]
      ],
      "feedback": "Tempo/speed y semántica dependen del formato."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "32 filas × 8 patterns: filas.",
        "answer": "256",
        "hint": "Multiplica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Pattern reuse puede reducir datos repetidos?",
        "answer": "si",
        "hint": "Reutiliza estructura."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Tracker pattern es PCM renderizado?",
        "answer": "no",
        "hint": "Es una representación de eventos."
      }
    ]
  },
  "music-procedural": {
    "id": "music-procedural",
    "courseId": 51,
    "title": "Música procedural: reglas, estado y reproducibilidad",
    "shortTitle": "Procedural",
    "duration": 90,
    "objective": "Generar estructura musical desde reglas, estado y seeds sin confundir aleatoriedad con composición.",
    "summary": [
      "Música procedural representa decisiones musicales mediante algoritmos y parámetros; puede generar notas, ritmos, armonía, timbre o estructura.",
      "Randomness útil suele estar restringida por escalas, voice leading, densidad, forma y reglas estilísticas; random puro no equivale a composición.",
      "Seeds y streams de PRNG permiten reproducibilidad solo si también se conserva el algoritmo, el orden de llamadas y el estado relevante."
    ],
    "concept": "Música procedural representa decisiones musicales mediante algoritmos y parámetros; puede generar notas, ritmos, armonía, timbre o estructura.",
    "rules": [
      "Haz explícitas las restricciones musicales.",
      "Separa seed de versión de algoritmo.",
      "No uses un único stream aleatorio global si el orden de subsistemas puede cambiar."
    ],
    "deep": {
      "intro": "Generar estructura musical desde reglas, estado y seeds sin confundir aleatoriedad con composición.",
      "sections": [
        {
          "title": "Gramáticas/reglas",
          "body": "Una regla puede transformar motivos o elegir transiciones dentro de un conjunto permitido."
        },
        {
          "title": "Probabilidad",
          "body": "Distribuciones ponderadas expresan preferencias, no certezas."
        },
        {
          "title": "Estado",
          "body": "La salida puede depender de historia: tonalidad, compás, último motivo o tensión acumulada."
        },
        {
          "title": "Reproducibilidad",
          "body": "Guardar seed + versión + parámetros permite reconstruir una pieza si el generador es determinista bajo esas condiciones."
        }
      ]
    },
    "example": {
      "problem": "Elección ponderada A=0.5, B=0.3, C=0.2. Suma de probabilidades.",
      "steps": [
        "0.5+0.3+0.2=1."
      ],
      "solution": "1."
    },
    "check": {
      "question": "¿Una seed por sí sola garantiza la misma pieza después de cambiar el algoritmo?",
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
          "Solo MIDI",
          false
        ]
      ],
      "feedback": "El mapping PRNG→decisiones también debe permanecer compatible."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Pesos 2,3,5. Peso total.",
        "answer": "10",
        "hint": "Suma."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Random puro garantiza coherencia armónica?",
        "answer": "no",
        "hint": "Necesita restricciones/modelo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Separar streams aleatorios puede mejorar reproducibilidad modular?",
        "answer": "si",
        "hint": "Evita que un subsistema desplace la secuencia de otro."
      }
    ]
  },
  "music-tiny-synths": {
    "id": "music-tiny-synths",
    "courseId": 51,
    "title": "Tiny synthesizers y arquitectura para sizecoding",
    "shortTitle": "Tiny synths",
    "duration": 90,
    "objective": "Diseñar sintetizadores mínimos que reconstruyan audio desde eventos y parámetros bajo presupuestos estrictos de distribución.",
    "summary": [
      "Un tiny synth sustituye PCM distribuido por código DSP, eventos musicales y parámetros que generan la señal en runtime.",
      "El coste relevante incluye synth, player/event data, parámetros y su compresibilidad; menos código bruto no siempre produce menor release comprimida.",
      "Una arquitectura pequeña favorece reutilización de operadores, tablas, envelopes y automatizaciones entre muchas voces."
    ],
    "concept": "Un tiny synth sustituye PCM distribuido por código DSP, eventos musicales y parámetros que generan la señal en runtime.",
    "rules": [
      "Mide tamaño final packed, no solo source.",
      "Cuenta también song data y decoder/runtime.",
      "No sacrifiques estabilidad real-time sin medir startup/render strategy."
    ],
    "deep": {
      "intro": "Diseñar sintetizadores mínimos que reconstruyan audio desde eventos y parámetros bajo presupuestos estrictos de distribución.",
      "sections": [
        {
          "title": "PCM vs síntesis",
          "body": "Audio largo ocupa muchos bytes como PCM; un synth puede reconstruirlo a cambio de CPU y código."
        },
        {
          "title": "Voice model",
          "body": "Una voz mínima puede compartir oscilador, envelope, filter y routing parametrizado."
        },
        {
          "title": "Offline render",
          "body": "Una intro puede sintetizar toda la canción al arrancar o generar bloques en streaming; son trade-offs distintos de RAM/startup/CPU."
        },
        {
          "title": "Compresibilidad",
          "body": "Reutilizar patrones y reducir entropía estructural puede ayudar al compresor más que micro-optimizar una instrucción aislada."
        }
      ]
    },
    "example": {
      "problem": "48 kHz, estéreo, 16-bit, 60 s PCM bruto. Bytes.",
      "steps": [
        "48000·2·2·60."
      ],
      "solution": "11,520,000 bytes."
    },
    "check": {
      "question": "¿Tiny synth significa que todo el audio ocupa cero bytes?",
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
          "Solo 4K",
          false
        ]
      ],
      "feedback": "Todavía distribuyes código, eventos y parámetros."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "44100 Hz mono 16-bit 10 s: bytes.",
        "answer": "882000",
        "hint": "44100·1·2·10."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Offline pre-render puede aumentar startup a cambio de callback más barato?",
        "answer": "si",
        "hint": "Trade-off."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Menor código bruto garantiza menor packed release?",
        "answer": "no",
        "hint": "Importa compresibilidad y datos asociados."
      }
    ]
  },
  "music-audio-clock": {
    "id": "music-audio-clock",
    "courseId": 51,
    "title": "Audio clock, buffers y sample-accurate scheduling",
    "shortTitle": "Audio clock",
    "duration": 90,
    "objective": "Sincronizar síntesis y música con el reloj de audio, separando sample time, wall time, frame time y beat time.",
    "summary": [
      "El callback de audio trabaja en bloques, pero los eventos pueden ocurrir en offsets de muestra dentro de cada bloque.",
      "Sample-accurate scheduling convierte posiciones musicales a sample indices y evita cuantizar todos los eventos al inicio del callback.",
      "El render loop puede leer una estimación del timeline musical, pero no debería ser la autoridad temporal de la señal de audio."
    ],
    "concept": "El callback de audio trabaja en bloques, pero los eventos pueden ocurrir en offsets de muestra dentro de cada bloque.",
    "rules": [
      "Programa eventos dentro del buffer cuando corresponda.",
      "Distingue callback boundary de event boundary.",
      "Compensa latencias conocidas cuando sincronices imagen y audio."
    ],
    "deep": {
      "intro": "Sincronizar síntesis y música con el reloj de audio, separando sample time, wall time, frame time y beat time.",
      "sections": [
        {
          "title": "Sample index",
          "body": "A Fs muestras/s, un instante t corresponde idealmente a n≈t·Fs."
        },
        {
          "title": "Offsets",
          "body": "Si una nota cae 37 muestras después del inicio del buffer, puede procesarse desde ese offset en vez de esperar al buffer siguiente."
        },
        {
          "title": "Latency",
          "body": "Device buffers y pipelines añaden latencia entre generación y percepción; sincronización audiovisual puede requerir estimarla."
        },
        {
          "title": "Clock domains",
          "body": "Audio device clock y sistema/reloj gráfico pueden derivar lentamente; sistemas largos necesitan política de sincronización."
        }
      ]
    },
    "example": {
      "problem": "Fs=48000. Evento a 0.125 s desde origen. Sample index ideal.",
      "steps": [
        "0.125·48000=6000."
      ],
      "solution": "6000."
    },
    "check": {
      "question": "¿Todo evento musical debe empezar en el sample 0 de un callback?",
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
          "Solo ASIO",
          false
        ]
      ],
      "feedback": "Puede programarse a un offset dentro del buffer."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "0.5 s a 44100 Hz: sample index.",
        "answer": "22050",
        "hint": "Multiplica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Buffer de 256 a 48000 Hz: duración ms aproximada.",
        "answer": "5.333",
        "hint": "256/48000·1000.",
        "alternatives": [
          "5.33"
        ]
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Audio clock y render frame counter son el mismo dominio temporal?",
        "answer": "no",
        "hint": "Pueden tener jitter/deriva distintos."
      }
    ]
  },
  "music-generative-composition": {
    "id": "music-generative-composition",
    "courseId": 51,
    "title": "Composición generativa y forma musical",
    "shortTitle": "Composición",
    "duration": 90,
    "objective": "Diseñar generadores que produzcan forma musical controlable mediante jerarquías temporales, restricciones y parámetros de alto nivel.",
    "summary": [
      "Una pieza generativa útil necesita estructura a varias escalas: evento, beat, compás, frase, sección y forma global.",
      "Separar decisiones de alto nivel de realización sonora permite cambiar synth/palette tímbrica sin reescribir la lógica compositiva.",
      "La evaluación debe considerar repetición, sorpresa, continuidad y control artístico, no solo que el algoritmo produzca notas válidas."
    ],
    "concept": "Una pieza generativa útil necesita estructura a varias escalas: evento, beat, compás, frase, sección y forma global.",
    "rules": [
      "Modela varias escalas temporales.",
      "Separa composición de síntesis cuando aporte claridad.",
      "Mantén controles artísticos reproducibles sobre la generación."
    ],
    "deep": {
      "intro": "Diseñar generadores que produzcan forma musical controlable mediante jerarquías temporales, restricciones y parámetros de alto nivel.",
      "sections": [
        {
          "title": "Jerarquía",
          "body": "Una sección elige armonía/densidad; una frase crea motivos; eventos concretos asignan notas y articulación."
        },
        {
          "title": "Constraint solving",
          "body": "Reglas pueden evitar saltos, limitar registro o preservar notas comunes entre acordes."
        },
        {
          "title": "Variation",
          "body": "Transformaciones como transposición, inversión, desplazamiento rítmico o mutación parametrizada producen variación estructurada."
        },
        {
          "title": "Director artístico",
          "body": "Seeds, macros y snapshots de parámetros permiten seleccionar resultados en vez de depender de azar irrepetible."
        }
      ]
    },
    "example": {
      "problem": "4 compases de 4/4 a 120 BPM. Duración.",
      "steps": [
        "16 beats.",
        "0.5 s/beat.",
        "16·0.5=8 s."
      ],
      "solution": "8 s."
    },
    "check": {
      "question": "¿Generar notas válidas en una escala garantiza una forma musical interesante?",
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
          "Solo tonal",
          false
        ]
      ],
      "feedback": "Validez local no sustituye estructura global."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "8 compases 4/4 contienen beats.",
        "answer": "32",
        "hint": "8·4."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "A 90 BPM, 3 beats duran segundos.",
        "answer": "2",
        "hint": "3·60/90."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Separar composición de síntesis facilita cambiar timbre sin cambiar forma?",
        "answer": "si",
        "hint": "Capas distintas."
      }
    ]
  },
  "music-integration": {
    "id": "music-integration",
    "courseId": 51,
    "title": "Mini motor de música procedural para demoscene",
    "shortTitle": "Integración",
    "duration": 90,
    "objective": "Integrar synth, sequencer, timeline y generación musical en un sistema reproducible, perfilable y sincronizable con visuales.",
    "summary": [
      "Un sistema procedural completo separa song data/reglas, scheduler, synth/DSP, audio clock y una interfaz de sincronización audiovisual.",
      "La misma timeline puede exportar eventos o parámetros para shaders/escenas sin hacer que el render frame sea el reloj musical maestro.",
      "Para sizecoding deben medirse simultáneamente tamaño packed, tiempo de generación, RAM, CPU de audio y calidad artística."
    ],
    "concept": "Un sistema procedural completo separa song data/reglas, scheduler, synth/DSP, audio clock y una interfaz de sincronización audiovisual.",
    "rules": [
      "Define contratos entre compositor, scheduler y synth.",
      "Expón tiempo musical de forma estable a los visuales.",
      "Mide bytes y tiempo real; no optimices una sola métrica a ciegas."
    ],
    "deep": {
      "intro": "Integrar synth, sequencer, timeline y generación musical en un sistema reproducible, perfilable y sincronizable con visuales.",
      "sections": [
        {
          "title": "Pipeline",
          "body": "Seed/song data → sequencer → eventos sample-accurate → synth → mix/master → device."
        },
        {
          "title": "Sync visual",
          "body": "El renderer consulta beat/row/section o parámetros derivados del audio timeline para dirigir cámaras, palettes y efectos."
        },
        {
          "title": "Determinismo",
          "body": "Con seed/version/song data constantes, una renderización offline debería ser reproducible salvo fuentes externas/no deterministas declaradas."
        },
        {
          "title": "Presupuestos",
          "body": "Una release puede comparar bytes de synth/song, startup de prerender, peak RAM y callback worst-case para elegir arquitectura."
        }
      ]
    },
    "example": {
      "problem": "A 128 BPM, una sección de 32 beats dura segundos.",
      "steps": [
        "60/128=0.46875 s/beat.",
        "32·0.46875=15."
      ],
      "solution": "15 s."
    },
    "check": {
      "question": "¿La sincronización visual debe depender obligatoriamente de frame++?",
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
          "Solo en demos",
          false
        ]
      ],
      "feedback": "Puede derivarse del timeline de audio/música."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "A 120 BPM, 16 beats duran segundos.",
        "answer": "8",
        "hint": "0.5 s/beat."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Synth y sequencer son la misma responsabilidad?",
        "answer": "no",
        "hint": "Uno genera señal; otro agenda eventos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Para sizecoding conviene medir packed bytes además de CPU/RAM?",
        "answer": "si",
        "hint": "Son presupuestos simultáneos."
      }
    ]
  }
});
