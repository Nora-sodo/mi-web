/**
 * BLOQUE 043 — Audio para videojuegos
 *
 * Regla editorial: separar señal digital, reloj de audio, mezcla, DSP,
 * espacialización y lógica de gameplay. El callback real-time tiene deadline:
 * una operación “normalmente rápida” no basta si a veces bloquea.
 */
window.LEARNING_PATHS[43] = {
  "level": "Experto progresivo",
  "estimatedHours": 126,
  "description": "Audio interactivo para videojuegos: PCM y mezcla, DSP real-time, espacialización, reverb, procedural, música adaptativa y arquitectura de engine.",
  "outcomes": [
    "Diseñar una cadena de audio digital con latencia y headroom medibles.",
    "Implementar espacialización, Doppler, reverb y occlusion entendiendo sus aproximaciones.",
    "Construir audio procedural y música adaptativa sincronizados al reloj de audio.",
    "Integrar streaming, virtualización de voces y callback real-time sin bloquear el dispositivo."
  ],
  "modules": [
    {
      "id": "m1-foundations",
      "title": "Fundamentos de audio interactivo",
      "description": "PCM, mezcla, DSP y resampling",
      "lessons": [
        "gameaudio-digital-audio",
        "gameaudio-mixing",
        "gameaudio-realtime-dsp",
        "gameaudio-sampling-resampling"
      ]
    },
    {
      "id": "m2-spatial",
      "title": "Audio espacial y entorno",
      "description": "Spatial, Doppler, reverb y occlusion",
      "lessons": [
        "gameaudio-spatial-audio",
        "gameaudio-doppler",
        "gameaudio-reverb",
        "gameaudio-occlusion"
      ]
    },
    {
      "id": "m3-content",
      "title": "Contenido y reproducción",
      "description": "Procedural, música, streaming y voices",
      "lessons": [
        "gameaudio-procedural",
        "gameaudio-music-systems",
        "gameaudio-streaming",
        "gameaudio-voice-management"
      ]
    },
    {
      "id": "m4-production",
      "title": "Integración de engine",
      "description": "Arquitectura y proyecto",
      "lessons": [
        "gameaudio-engine-integration",
        "gameaudio-integration-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "gameaudio-digital-audio": {
    "id": "gameaudio-digital-audio",
    "courseId": 43,
    "title": "Audio digital para tiempo real",
    "shortTitle": "Audio digital para tiempo real",
    "duration": 110,
    "objective": "Modelar PCM, sample rate, bit depth, canales y buffers sin confundir resolución temporal con resolución de amplitud.",
    "summary": [
      "PCM representa muestras discretas de amplitud; sample rate determina cuántas muestras por segundo y bit depth la cuantización de cada muestra.",
      "En un motor el audio circula en buffers: tamaño y frecuencia de callbacks afectan latencia, overhead y tolerancia a jitter.",
      "Clipping digital ocurre al exceder el rango representable del formato de mezcla; reducir la ganancia antes del clip es distinto de bajar volumen después."
    ],
    "concept": "PCM representa muestras discretas de amplitud; sample rate determina cuántas muestras por segundo y bit depth la cuantización de cada muestra.",
    "rules": [
      "sample rate y bit depth describen ejes distintos.",
      "Calcula latencia de buffer como frames/sampleRate.",
      "Deja headroom en la mezcla; el saturado accidental no es mastering."
    ],
    "deep": {
      "intro": "Modelar PCM, sample rate, bit depth, canales y buffers sin confundir resolución temporal con resolución de amplitud.",
      "sections": [
        {
          "title": "PCM y cuantización",
          "body": "Un sample PCM codifica amplitud cuantizada en un instante; estéreo interleaved suele alternar L,R,L,R... pero el layout depende de API/formato."
        },
        {
          "title": "Buffers",
          "body": "256 frames a 48 kHz duran 256/48000≈5.33 ms. Dos o tres buffers en cola pueden multiplicar la latencia práctica."
        },
        {
          "title": "Clipping",
          "body": "Una suma que supera el rango del bus genera clipping si no hay headroom/limitación. Float interno amplía rango numérico, no evita saturación al convertir/salir."
        },
        {
          "title": "Canales",
          "body": "Frame de audio significa conjunto simultáneo de samples de todos los canales; no debe confundirse con frame de vídeo."
        }
      ]
    },
    "example": {
      "problem": "Buffer de 480 frames a 48 kHz. Duración.",
      "steps": [
        "480/48000=0.01 s",
        "0.01 s=10 ms"
      ],
      "solution": "10 ms"
    },
    "check": {
      "question": "¿Duplicar bit depth duplica sample rate?",
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
      "feedback": "Son dimensiones independientes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "48 kHz durante 0.25 s. Samples por canal.",
        "answer": "12000",
        "hint": "48000·0.25."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un frame estéreo contiene dos samples, uno por canal?",
        "answer": "si",
        "hint": "Frame de audio agrupa canales simultáneos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Float interno garantiza ausencia de clipping en la salida final?",
        "answer": "no",
        "hint": "La conversión/salida tiene rango finito."
      }
    ]
  },
  "gameaudio-mixing": {
    "id": "gameaudio-mixing",
    "courseId": 43,
    "title": "Mixing, buses, ganancia y headroom",
    "shortTitle": "Mixing, buses, ganancia y headroom",
    "duration": 110,
    "objective": "Diseñar una mezcla jerárquica con buses, gain staging, pan y headroom sin sumar señales a ciegas.",
    "summary": [
      "La mezcla lineal suma señales en el dominio adecuado; varias fuentes correlacionadas pueden elevar picos mucho más de lo esperado.",
      "Buses permiten controlar grupos como música, SFX, voz y ambience y aplicar procesamiento compartido.",
      "Decibelios expresan ratios logarítmicos: para amplitud 20·log10(A2/A1); +6.02 dB aproximadamente duplica amplitud, no potencia acústica percibida universalmente."
    ],
    "concept": "La mezcla lineal suma señales en el dominio adecuado; varias fuentes correlacionadas pueden elevar picos mucho más de lo esperado.",
    "rules": [
      "Suma y procesa audio en un dominio lineal coherente.",
      "Usa buses para ownership y control, no solo para ordenar sliders.",
      "No interpretes dBFS como SPL físico sin calibración."
    ],
    "deep": {
      "intro": "Diseñar una mezcla jerárquica con buses, gain staging, pan y headroom sin sumar señales a ciegas.",
      "sections": [
        {
          "title": "Suma",
          "body": "Dos señales idénticas y en fase de amplitud 0.5 suman pico 1.0; señales no correlacionadas no tienen el mismo comportamiento de pico/RMS."
        },
        {
          "title": "dB",
          "body": "Ganancia de amplitud 0.5 corresponde a 20log10(0.5)≈-6.02 dB."
        },
        {
          "title": "Headroom",
          "body": "Mantener margen antes de 0 dBFS reduce clipping cuando coinciden transitorios."
        },
        {
          "title": "Buses",
          "body": "Master←Music/SFX/Voice permite ducking, mute, metering y efectos por grupo."
        }
      ]
    },
    "example": {
      "problem": "Ganancia lineal 0.25 expresada en dB de amplitud.",
      "steps": [
        "20log10(0.25)=20·(-0.60206)",
        "≈-12.04 dB"
      ],
      "solution": "≈ -12.04 dB"
    },
    "check": {
      "question": "¿0 dBFS significa 0 dB SPL en una habitación?",
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
          "Solo con auriculares",
          false
        ]
      ],
      "feedback": "dBFS es referencia digital; SPL requiere cadena/calibración física."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Dos fuentes constantes 0.2 y 0.3 sumadas linealmente. Salida.",
        "answer": "0.5",
        "hint": "Suma."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿-6.02 dB es aproximadamente amplitud ×0.5?",
        "answer": "si",
        "hint": "20log10(0.5)."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un bus puede aplicar procesamiento a varias voces?",
        "answer": "si",
        "hint": "Ese es uno de sus usos."
      }
    ]
  },
  "gameaudio-realtime-dsp": {
    "id": "gameaudio-realtime-dsp",
    "courseId": 43,
    "title": "DSP en tiempo real y presupuesto de callback",
    "shortTitle": "DSP en tiempo real y presupuesto de callback",
    "duration": 110,
    "objective": "Procesar audio en callbacks de tiempo real sin bloqueos, allocations impredecibles ni trabajo que exceda el deadline.",
    "summary": [
      "El callback de audio tiene un deadline periódico: si tarda más que la duración del buffer aparece underrun/glitch aunque la media de CPU del juego sea baja.",
      "Locks contenciosos, I/O, allocations no acotadas y logging pesado son riesgos porque introducen latencia impredecible.",
      "DSP por bloques debe conservar estado entre buffers para filtros, delays y osciladores; partir una señal en callbacks no reinicia el sistema físico cada bloque."
    ],
    "concept": "El callback de audio tiene un deadline periódico: si tarda más que la duración del buffer aparece underrun/glitch aunque la media de CPU del juego sea baja.",
    "rules": [
      "No bloquees el hilo de audio esperando gameplay o disco.",
      "Preasigna y usa colas/estructuras adecuadas al contrato real-time.",
      "Mide worst-case/deadline misses, no solo promedio."
    ],
    "deep": {
      "intro": "Procesar audio en callbacks de tiempo real sin bloqueos, allocations impredecibles ni trabajo que exceda el deadline.",
      "sections": [
        {
          "title": "Deadline",
          "body": "128 frames/48 kHz≈2.67 ms: el trabajo del callback debe terminar antes de necesitar el siguiente bloque."
        },
        {
          "title": "Estado",
          "body": "Un biquad conserva delays internos z1/z2 entre callbacks; resetearlos cada bloque crea discontinuidades."
        },
        {
          "title": "Comunicación",
          "body": "Gameplay puede publicar parámetros mediante atomics/ring buffers; audio consume snapshots sin esperar locks largos."
        },
        {
          "title": "Underrun",
          "body": "Si el dispositivo pide datos y el motor no entrega a tiempo, reproduce silencio/datos viejos según backend: se oye como click/dropout."
        }
      ]
    },
    "example": {
      "problem": "Callback: 128 frames a 48 kHz. Deadline aproximado.",
      "steps": [
        "128/48000=0.0026667 s",
        "≈2.667 ms"
      ],
      "solution": "≈ 2.667 ms"
    },
    "check": {
      "question": "¿Un callback de audio puede hacer I/O de disco síncrono sin riesgo temporal?",
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
          "Solo si es WAV",
          false
        ]
      ],
      "feedback": "La latencia de I/O no está acotada al deadline."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "64 frames a 32 kHz. Duración ms.",
        "answer": "2",
        "hint": "64/32000·1000."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un filtro IIR debe conservar estado entre buffers?",
        "answer": "si",
        "hint": "Su salida depende del estado previo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿CPU media baja garantiza cero glitches?",
        "answer": "no",
        "hint": "Importa el peor caso respecto al deadline."
      }
    ]
  },
  "gameaudio-sampling-resampling": {
    "id": "gameaudio-sampling-resampling",
    "courseId": 43,
    "title": "Sampling, resampling y pitch",
    "shortTitle": "Sampling, resampling y pitch",
    "duration": 110,
    "objective": "Relacionar sample rate, reproducción, resampling y pitch sin confundir conversión de tasa con simple reinterpretación temporal.",
    "summary": [
      "Reproducir samples a una tasa efectiva mayor consume la señal más rápido y eleva pitch; un resampler convierte entre grids temporales para mantener duración/pitch según objetivo.",
      "Interpolación nearest/linear es barata pero introduce error espectral; filtros de reconstrucción mejores cuestan más CPU/latencia.",
      "Cambiar pitch manteniendo duración requiere procesamiento distinto (time-stretch/pitch-shift), no solo cambiar la velocidad de lectura."
    ],
    "concept": "Reproducir samples a una tasa efectiva mayor consume la señal más rápido y eleva pitch; un resampler convierte entre grids temporales para mantener duración/pitch según objetivo.",
    "rules": [
      "Distingue playback rate de sample-rate conversion.",
      "Elige calidad de resampling según aliasing, CPU y latencia.",
      "Pitch-shift y time-stretch son problemas separados de reproducir más rápido."
    ],
    "deep": {
      "intro": "Relacionar sample rate, reproducción, resampling y pitch sin confundir conversión de tasa con simple reinterpretación temporal.",
      "sections": [
        {
          "title": "Playback rate",
          "body": "Clip 48 kHz leído con ratio 2× termina en la mitad de tiempo y sube una octava idealmente para contenido tonal."
        },
        {
          "title": "Resampling",
          "body": "Convertir 44.1→48 kHz genera nuevos samples aproximando la señal continua subyacente."
        },
        {
          "title": "Aliasing",
          "body": "Interpoladores pobres pueden producir imágenes/aliasing audibles, especialmente al transponer hacia arriba."
        },
        {
          "title": "Tiempo y pitch",
          "body": "Phase vocoder/WSOLA y otras familias intentan desacoplar duración y pitch con artefactos/trade-offs."
        }
      ]
    },
    "example": {
      "problem": "Clip de 6 s reproducido a rate 1.5×. Duración.",
      "steps": [
        "6/1.5=4"
      ],
      "solution": "4 s"
    },
    "check": {
      "question": "¿Resampling de calidad infinita se consigue solo duplicando samples?",
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
          "Solo a 48 kHz",
          false
        ]
      ],
      "feedback": "Duplicar no reconstruye el espectro correctamente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Clip 8 s a 2×. Duración.",
        "answer": "4",
        "hint": "8/2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Playback 2× suele elevar pitch de contenido tonal?",
        "answer": "si",
        "hint": "La frecuencia temporal se escala."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Pitch-shift con duración fija es idéntico a cambiar playback rate?",
        "answer": "no",
        "hint": "Objetivos temporales distintos."
      }
    ]
  },
  "gameaudio-spatial-audio": {
    "id": "gameaudio-spatial-audio",
    "courseId": 43,
    "title": "Spatial audio: distancia, dirección y escucha",
    "shortTitle": "Spatial audio: distancia, dirección y escucha",
    "duration": 110,
    "objective": "Construir audio 3D separando atenuación, paneo/HRTF, orientación y geometría de la escena.",
    "summary": [
      "Spatial audio transforma una fuente del mundo en señales de salida según posición relativa, orientación del listener y modelo de reproducción.",
      "La atenuación física ideal puede seguir 1/r en presión o 1/r² en intensidad en campo libre, pero juegos suelen usar curvas artísticas acotadas para jugabilidad.",
      "Stereo panning aproxima dirección horizontal; HRTF modela filtrado dependiente de dirección para pistas binaurales, con dependencia del oyente y del contenido."
    ],
    "concept": "Spatial audio transforma una fuente del mundo en señales de salida según posición relativa, orientación del listener y modelo de reproducción.",
    "rules": [
      "No uses 1/r² sin clamps y luego culpes al jugador por no oír nada.",
      "Separa distancia de directividad/occlusión.",
      "HRTF no equivale simplemente a pan L/R."
    ],
    "deep": {
      "intro": "Construir audio 3D separando atenuación, paneo/HRTF, orientación y geometría de la escena.",
      "sections": [
        {
          "title": "Marco relativo",
          "body": "Transforma source-listener al espacio del listener para calcular azimuth/elevation."
        },
        {
          "title": "Distancia",
          "body": "Una curva de rolloff de juego puede tener min/max distance y no seguir exactamente una ley física."
        },
        {
          "title": "HRTF",
          "body": "Funciones de transferencia cabeza-oído incluyen diferencias de tiempo, nivel y filtrado espectral."
        },
        {
          "title": "Multicanal",
          "body": "5.1/7.1 y binaural resuelven reproducción con modelos distintos; el contenido puede abstraerse como fuentes/camas."
        }
      ]
    },
    "example": {
      "problem": "Modelo intensidad ∝1/r²: al duplicar distancia, factor relativo.",
      "steps": [
        "1/(2r)^2 dividido por 1/r² =1/4"
      ],
      "solution": "0.25"
    },
    "check": {
      "question": "¿HRTF es exactamente lo mismo que linear stereo panning?",
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
      "feedback": "Incluye filtrado direccional más rico."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Ley 1/r²: triplicar distancia divide intensidad por.",
        "answer": "9",
        "hint": "3²."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La orientación del listener importa para dirección percibida?",
        "answer": "si",
        "hint": "Define el marco auditivo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Curvas de atenuación de juegos deben ser físicamente exactas siempre?",
        "answer": "no",
        "hint": "Jugabilidad y mezcla pueden justificar modelos artísticos."
      }
    ]
  },
  "gameaudio-doppler": {
    "id": "gameaudio-doppler",
    "courseId": 43,
    "title": "Efecto Doppler",
    "shortTitle": "Efecto Doppler",
    "duration": 110,
    "objective": "Aplicar Doppler usando velocidad radial relativa y límites coherentes sin confundir velocidad tangencial con acercamiento.",
    "summary": [
      "Doppler depende de la componente de velocidad a lo largo de la línea fuente-listener; movimiento puramente tangencial instantáneo puede tener componente radial cero.",
      "Para velocidades pequeñas frente a la velocidad del sonido, el cambio de frecuencia es moderado; fórmulas exactas dependen de si fuente, observador y medio se modelan por separado.",
      "Engines suelen exponer un factor Doppler artístico y clamps para evitar transposiciones extremas o inestables."
    ],
    "concept": "Doppler depende de la componente de velocidad a lo largo de la línea fuente-listener; movimiento puramente tangencial instantáneo puede tener componente radial cero.",
    "rules": [
      "Proyecta velocidad sobre la línea de visión.",
      "Declara convención de signos antes de aplicar fórmula.",
      "No derives Doppler de distancia entre frames con jitter sin filtrar."
    ],
    "deep": {
      "intro": "Aplicar Doppler usando velocidad radial relativa y límites coherentes sin confundir velocidad tangencial con acercamiento.",
      "sections": [
        {
          "title": "Componente radial",
          "body": "v_r = dot(v_rel, direction). Solo esa componente entra en el corrimiento idealizado."
        },
        {
          "title": "Aproximación",
          "body": "Para |v|≪c, Δf/f es aproximadamente proporcional a v_r/c con signo según acercamiento/alejamiento."
        },
        {
          "title": "Tangencial",
          "body": "Una fuente que cruza lateralmente cambia de acercamiento a alejamiento; en el instante de máximo acercamiento la componente radial puede ser 0."
        },
        {
          "title": "Gameplay",
          "body": "Teleports y correcciones de red deben tratarse para no generar chirps absurdos."
        }
      ]
    },
    "example": {
      "problem": "Aproximación |Δf/f|≈|v_r|/c con v_r=34.3 m/s y c=343 m/s.",
      "steps": [
        "34.3/343=0.1"
      ],
      "solution": "0.1 (10%)"
    },
    "check": {
      "question": "¿Movimiento tangencial puro produce necesariamente gran Doppler instantáneo?",
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
          "Siempre 2× pitch",
          false
        ]
      ],
      "feedback": "Importa la componente radial."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "v_r/c=0.05. Cambio relativo aproximado en magnitud.",
        "answer": "0.05",
        "hint": "Es la aproximación dada."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Teleport debe convertirse sin más en velocidad Doppler enorme?",
        "answer": "no",
        "hint": "Es una discontinuidad lógica, no movimiento físico continuo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El signo depende de acercarse o alejarse?",
        "answer": "si",
        "hint": "Cambia la dirección del corrimiento."
      }
    ]
  },
  "gameaudio-reverb": {
    "id": "gameaudio-reverb",
    "courseId": 43,
    "title": "Reverb, delays y acústica aproximada",
    "shortTitle": "Reverb, delays y acústica aproximada",
    "duration": 110,
    "objective": "Modelar reverberación con early reflections, cola difusa y envíos por entorno sin convertir cada habitación en un simulador de ondas completo.",
    "summary": [
      "Reverb describe energía reflejada que llega tras múltiples trayectorias; early reflections aportan pistas de tamaño/geometría y la cola tardía se vuelve más difusa.",
      "Algoritmos prácticos usan redes de delays/filtros, convolución con impulse responses o modelos híbridos; cada uno intercambia memoria, CPU, variabilidad y realismo.",
      "En motores, sends a buses de reverb permiten mezclar señal directa y reverberada y transicionar entre zonas sin duplicar toda la fuente."
    ],
    "concept": "Reverb describe energía reflejada que llega tras múltiples trayectorias; early reflections aportan pistas de tamaño/geometría y la cola tardía se vuelve más difusa.",
    "rules": [
      "Separa señal directa de envío wet.",
      "Crossfadea parámetros/IR para evitar discontinuidades.",
      "Convolution reverb reproduce una respuesta medida, no adapta automáticamente geometría dinámica."
    ],
    "deep": {
      "intro": "Modelar reverberación con early reflections, cola difusa y envíos por entorno sin convertir cada habitación en un simulador de ondas completo.",
      "sections": [
        {
          "title": "RT60",
          "body": "RT60 es tiempo aproximado para que nivel energético decaiga 60 dB bajo determinadas condiciones."
        },
        {
          "title": "Convolución",
          "body": "y=x*h aplica una IR al audio; IR larga implica coste/latencia que puede acelerarse por FFT partitioned convolution."
        },
        {
          "title": "Zonas",
          "body": "Portal/room systems pueden asignar sends y filtros según región/occlusión."
        },
        {
          "title": "Predelay",
          "body": "Retrasar inicio de la cola puede separar perceptualmente directo y reverberación."
        }
      ]
    },
    "example": {
      "problem": "RT60=1.8 s. ¿Cuánto tarda, por definición idealizada, en caer 60 dB?",
      "steps": [
        "1.8 s"
      ],
      "solution": "1.8 s"
    },
    "check": {
      "question": "¿Una IR grabada se adapta sola cuando mueves una pared virtual?",
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
          "Solo si es estéreo",
          false
        ]
      ],
      "feedback": "Es una respuesta fija salvo procesamiento/modelado adicional."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Delay de 2400 samples a 48 kHz. Tiempo ms.",
        "answer": "50",
        "hint": "2400/48000·1000."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Wet/dry permiten controlar reverb frente a señal directa?",
        "answer": "si",
        "hint": "Dos contribuciones separadas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Reverb algorítmica y convolution son exactamente la misma técnica?",
        "answer": "no",
        "hint": "Modelos distintos."
      }
    ]
  },
  "gameaudio-occlusion": {
    "id": "gameaudio-occlusion",
    "courseId": 43,
    "title": "Occlusion, obstruction y propagación",
    "shortTitle": "Occlusion, obstruction y propagación",
    "duration": 110,
    "objective": "Representar cómo geometría bloquea o modifica audio mediante modelos económicos y coherentes con la escena.",
    "summary": [
      "Occlusion no es solo bajar volumen: materiales y aperturas pueden filtrar frecuencias y cambiar proporción directo/reverb.",
      "Un único ray cast puede ser aproximación útil, pero falla para fuentes grandes, múltiples aperturas o difracción; multi-ray/portals ofrecen modelos intermedios.",
      "Actualizar acústica a menor frecuencia que audio es normal; smoothing evita zippering cuando cambia el resultado geométrico."
    ],
    "concept": "Occlusion no es solo bajar volumen: materiales y aperturas pueden filtrar frecuencias y cambiar proporción directo/reverb.",
    "rules": [
      "Filtra parámetros de occlusion antes de aplicarlos sample a sample.",
      "No confundas line-of-sight visual con transmisión acústica exacta.",
      "Presupuesta raycasts por prioridad/distancia."
    ],
    "deep": {
      "intro": "Representar cómo geometría bloquea o modifica audio mediante modelos económicos y coherentes con la escena.",
      "sections": [
        {
          "title": "Modelo simple",
          "body": "Bloqueado→gain -12 dB + low-pass; visible→0 dB. Es estilización, no ley física."
        },
        {
          "title": "Smoothing",
          "body": "Cambiar cutoff instantáneamente de 20 kHz a 800 Hz puede clickear; interpola parámetros."
        },
        {
          "title": "Portals",
          "body": "Habitaciones conectadas por puertas pueden propagar sends/delay de forma topológica."
        },
        {
          "title": "Prioridad",
          "body": "Voces inaudibles o lejanas pueden usar actualización acústica menos frecuente."
        }
      ]
    },
    "example": {
      "problem": "80 fuentes, acústica actualiza 1/4 por frame. Consultas por frame.",
      "steps": [
        "80/4=20"
      ],
      "solution": "20"
    },
    "check": {
      "question": "¿Occlusion acústica es exactamente igual a visibility de render?",
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
          "Solo con paredes opacas",
          false
        ]
      ],
      "feedback": "El sonido puede transmitir/difractar/reflejar de forma distinta."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "120 fuentes en 6 buckets. Fuentes/bucket.",
        "answer": "20",
        "hint": "120/6."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Smoothing puede reducir clicks al cambiar filtros?",
        "answer": "si",
        "hint": "Evita discontinuidades bruscas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un solo ray es un modelo completo de propagación acústica?",
        "answer": "no",
        "hint": "Es una aproximación."
      }
    ]
  },
  "gameaudio-procedural": {
    "id": "gameaudio-procedural",
    "courseId": 43,
    "title": "Audio procedural y síntesis",
    "shortTitle": "Audio procedural y síntesis",
    "duration": 110,
    "objective": "Generar sonidos mediante osciladores, ruido, envolventes y modulación con control determinista y límites anti-aliasing.",
    "summary": [
      "Audio procedural produce señal a partir de parámetros y estado en vez de reproducir siempre un sample fijo; puede reaccionar continuamente a gameplay.",
      "Osciladores discontinuos como square/saw generan armónicos infinitos idealmente y aliasing si se discretizan ingenuamente; band-limited techniques reducen artefactos.",
      "Envelopes ADSR, filtros y modulación permiten construir timbre; seeds y streams separados hacen reproducibles eventos aleatorios."
    ],
    "concept": "Audio procedural produce señal a partir de parámetros y estado en vez de reproducir siempre un sample fijo; puede reaccionar continuamente a gameplay.",
    "rules": [
      "Mantén fase/estado continuo entre buffers.",
      "Control-rate y audio-rate son frecuencias de actualización distintas.",
      "Procedural no significa necesariamente barato: mide voces y DSP."
    ],
    "deep": {
      "intro": "Generar sonidos mediante osciladores, ruido, envolventes y modulación con control determinista y límites anti-aliasing.",
      "sections": [
        {
          "title": "Oscilador",
          "body": "phase += f/fs; wrap phase. No reinicies fase cada callback."
        },
        {
          "title": "ADSR",
          "body": "Attack/Decay/Sustain/Release controlan amplitud temporal; sustain es nivel, no duración fija por definición."
        },
        {
          "title": "FM",
          "body": "Modular frecuencia/fase genera sidebands; profundidad y ratio cambian el espectro."
        },
        {
          "title": "Ruido",
          "body": "PRNG determinista permite reproducir una explosión procedural con misma seed y secuencia."
        }
      ]
    },
    "example": {
      "problem": "Oscilador 440 Hz a 44 kHz. Incremento de fase en ciclos/sample.",
      "steps": [
        "440/44000=0.01"
      ],
      "solution": "0.01"
    },
    "check": {
      "question": "¿Una saw ingenua puede aliasar al contener armónicos por encima de Nyquist?",
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
          "Solo en mono",
          false
        ]
      ],
      "feedback": "Las discontinuidades generan muchos armónicos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "1 kHz a 50 kHz. Incremento ciclos/sample.",
        "answer": "0.02",
        "hint": "1000/50000."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Sustain ADSR es un nivel?",
        "answer": "si",
        "hint": "No es una duración fija en la definición habitual."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Seed ayuda a reproducibilidad procedural?",
        "answer": "si",
        "hint": "Si la secuencia de llamadas también se conserva."
      }
    ]
  },
  "gameaudio-music-systems": {
    "id": "gameaudio-music-systems",
    "courseId": 43,
    "title": "Sistemas de música adaptativa",
    "shortTitle": "Sistemas de música adaptativa",
    "duration": 110,
    "objective": "Diseñar música interactiva con stems, estados, transiciones cuantizadas y sincronización musical sin depender del frame rate.",
    "summary": [
      "La música adaptativa puede cambiar por capas verticales (stems) o por secuencias horizontales (segmentos), manteniendo pulso y fraseo.",
      "Transiciones cuantizadas a beat/bar requieren un reloj musical derivado del tiempo de audio, no de frames de render variables.",
      "Pre-roll y scheduling anticipado compensan latencia de streaming/decoder para que el cambio ocurra exactamente en la frontera musical."
    ],
    "concept": "La música adaptativa puede cambiar por capas verticales (stems) o por secuencias horizontales (segmentos), manteniendo pulso y fraseo.",
    "rules": [
      "Usa el reloj de audio como autoridad temporal de música.",
      "Programa transiciones por beat/bar, no por igualdad float de tiempo de frame.",
      "Separa intención musical de reproducción/streaming."
    ],
    "deep": {
      "intro": "Diseñar música interactiva con stems, estados, transiciones cuantizadas y sincronización musical sin depender del frame rate.",
      "sections": [
        {
          "title": "Tempo",
          "body": "120 BPM =2 beats/s; un beat dura 0.5 s."
        },
        {
          "title": "Stems",
          "body": "Combat puede subir percusión y metales manteniendo bajo/armonía sincronizados."
        },
        {
          "title": "Horizontal",
          "body": "Exploration_A termina en compás compatible y salta a Combat_B en el siguiente bar."
        },
        {
          "title": "Scheduling",
          "body": "Solicita decodificación antes de la frontera para evitar huecos."
        }
      ]
    },
    "example": {
      "problem": "120 BPM, compás 4/4. Duración de un compás.",
      "steps": [
        "60/120=0.5 s por beat",
        "4·0.5=2 s"
      ],
      "solution": "2 s"
    },
    "check": {
      "question": "¿El reloj de render es una buena autoridad para transiciones sample-accurate?",
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
      "feedback": "El render tiene jitter y frecuencia independiente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "90 BPM. Duración beat en segundos.",
        "answer": "0.6667",
        "hint": "60/90≈0.6667."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Vertical re-orchestration puede usar stems sincronizados?",
        "answer": "si",
        "hint": "Capas simultáneas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una transición musical debe esperar a que gameplay haga polling exacto en el beat?",
        "answer": "no",
        "hint": "Se agenda contra reloj de audio."
      }
    ]
  },
  "gameaudio-streaming": {
    "id": "gameaudio-streaming",
    "courseId": 43,
    "title": "Streaming, decoding y virtualización de voces",
    "shortTitle": "Streaming, decoding y virtualización de voces",
    "duration": 110,
    "objective": "Administrar clips largos y muchas voces con streaming, buffers, prioridades y virtualización sin romper continuidad temporal.",
    "summary": [
      "Clips largos como música suelen streamarse/decodificarse por bloques para no residir completos en RAM; SFX cortos pueden precargarse.",
      "Cuando hay más voces lógicas que voces físicas/mix budget, la virtualización puede dejar de renderizar algunas manteniendo su timeline para reactivarlas coherentemente.",
      "Prioridad debe considerar audibilidad, importancia narrativa, distancia y coste; robar una voz puede requerir fade para evitar clicks."
    ],
    "concept": "Clips largos como música suelen streamarse/decodificarse por bloques para no residir completos en RAM; SFX cortos pueden precargarse.",
    "rules": [
      "No hagas decode pesado en el callback real-time.",
      "Mantén suficiente prebuffer para absorber jitter de I/O.",
      "Virtualizar no significa olvidar el tiempo lógico de la voz."
    ],
    "deep": {
      "intro": "Administrar clips largos y muchas voces con streaming, buffers, prioridades y virtualización sin romper continuidad temporal.",
      "sections": [
        {
          "title": "Streaming",
          "body": "Un worker lee/decodifica hacia ring buffer; callback consume sin esperar disco."
        },
        {
          "title": "Voces",
          "body": "200 fuentes lógicas y 64 físicas requieren seleccionar/virtualizar al menos 136 en ese instante."
        },
        {
          "title": "Reactivación",
          "body": "Una música virtualizada debe reentrar en la posición temporal correcta, no reiniciarse salvo diseño."
        },
        {
          "title": "Stealing",
          "body": "Fade corto puede ocultar discontinuidad al reasignar una voz física."
        }
      ]
    },
    "example": {
      "problem": "200 voces lógicas, máximo 64 físicas. Mínimo virtualizadas.",
      "steps": [
        "200-64=136"
      ],
      "solution": "136"
    },
    "check": {
      "question": "¿Decodificar OGG síncronamente en el callback es una arquitectura robusta?",
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
          "Solo si dura <1 min",
          false
        ]
      ],
      "feedback": "El decode puede exceder el deadline."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "96 voces lógicas, 32 físicas. Virtualizadas mínimas.",
        "answer": "64",
        "hint": "96-32."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Virtual voice puede conservar playhead lógico?",
        "answer": "si",
        "hint": "Permite reactivación coherente."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Streaming elimina toda necesidad de buffering?",
        "answer": "no",
        "hint": "Precisamente usa buffers para desacoplar I/O y consumo."
      }
    ]
  },
  "gameaudio-voice-management": {
    "id": "gameaudio-voice-management",
    "courseId": 43,
    "title": "Voice management, prioridades y concurrency",
    "shortTitle": "Voice management, prioridades y concurrency",
    "duration": 110,
    "objective": "Controlar polifonía, límites por evento y voice stealing para evitar caos acústico y coste no acotado.",
    "summary": [
      "Cada sonido disparado no necesita convertirse en una voz física independiente; concurrency rules limitan instancias por evento, emisor o grupo.",
      "Voice stealing puede elegir la menos audible/importante y aplicar fade; la métrica debe ser estable para evitar churn de asignación.",
      "Un sistema de prioridades no reemplaza mezcla: demasiadas voces 'importantes' siguen pudiendo saturar espectro y headroom."
    ],
    "concept": "Cada sonido disparado no necesita convertirse en una voz física independiente; concurrency rules limitan instancias por evento, emisor o grupo.",
    "rules": [
      "Define límites por categoría/evento.",
      "Evita ordenar solo por distancia; UI/voz narrativa puede ser más importante.",
      "Mide voces activas, virtualizadas y robadas."
    ],
    "deep": {
      "intro": "Controlar polifonía, límites por evento y voice stealing para evitar caos acústico y coste no acotado.",
      "sections": [
        {
          "title": "Concurrency",
          "body": "Footstep max 4 por personaje evita 30 instancias superpuestas por eventos duplicados."
        },
        {
          "title": "Score",
          "body": "priority×audibility puede ordenar, pero requiere reglas para no dejar música/diálogo sin voz."
        },
        {
          "title": "Stealing",
          "body": "Elige candidato y fade-out antes de reciclar si el budget temporal lo permite."
        },
        {
          "title": "Telemetría",
          "body": "Contadores de steals/s revelan que el límite de voces o los eventos están mal dimensionados."
        }
      ]
    },
    "example": {
      "problem": "Límite 48 voces; hay 61 solicitadas simultáneas. Al menos cuántas no pueden ser físicas.",
      "steps": [
        "61-48=13"
      ],
      "solution": "13"
    },
    "check": {
      "question": "¿Voice priority es exactamente lo mismo que volumen?",
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
          "Solo para SFX",
          false
        ]
      ],
      "feedback": "Puede incluir importancia semántica y audibilidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "24 slots y 30 solicitudes. Exceso.",
        "answer": "6",
        "hint": "30-24."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Concurrency rule puede limitar instancias del mismo evento?",
        "answer": "si",
        "hint": "Evita acumulación."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Voice stealing debería generar clicks deliberadamente?",
        "answer": "no",
        "hint": "Fades/zero-crossing ayudan a evitar discontinuidad."
      }
    ]
  },
  "gameaudio-engine-integration": {
    "id": "gameaudio-engine-integration",
    "courseId": 43,
    "title": "Arquitectura de audio en el engine",
    "shortTitle": "Arquitectura de audio en el engine",
    "duration": 110,
    "objective": "Integrar gameplay, mixer, DSP, spatialización, streaming y dispositivo mediante ownership y colas temporales explícitas.",
    "summary": [
      "El engine de audio suele separar hilo de juego, hilo/worker de streaming y callback/device thread; compartir objetos mutables sin contrato crea races o glitches.",
      "Gameplay emite comandos con timestamps/IDs; audio mantiene su propio estado de voces y procesa en orden temporal sin necesitar acceder al world completo.",
      "La depuración debe incluir waveform/meters, buses, voces, underruns, latency y eventos; 'se oye raro' no es una traza reproducible."
    ],
    "concept": "El engine de audio suele separar hilo de juego, hilo/worker de streaming y callback/device thread; compartir objetos mutables sin contrato crea races o glitches.",
    "rules": [
      "Trata audio como subsistema temporal con autoridad propia.",
      "Envía comandos/snapshots, no punteros efímeros a entidades del juego.",
      "Perfila deadline misses, voces, DSP y streaming por separado."
    ],
    "deep": {
      "intro": "Integrar gameplay, mixer, DSP, spatialización, streaming y dispositivo mediante ownership y colas temporales explícitas.",
      "sections": [
        {
          "title": "Frontera",
          "body": "Game thread: PlaySound(entity,asset,params); audio resuelve una voz propia y copia parámetros necesarios."
        },
        {
          "title": "Command queue",
          "body": "Comandos timestamped permiten ordenar play/stop/parameter sin bloquear el callback."
        },
        {
          "title": "Shutdown",
          "body": "Detén productor, drena/termina callback y libera device/resources en un orden explícito."
        },
        {
          "title": "Diagnóstico",
          "body": "Registra max callback time frente a buffer deadline; si max>deadline existe riesgo real aunque promedio sea bajo."
        }
      ]
    },
    "example": {
      "problem": "Deadline 5.33 ms y peor callback 4.1 ms. Margen.",
      "steps": [
        "5.33-4.1=1.23 ms"
      ],
      "solution": "1.23 ms"
    },
    "check": {
      "question": "¿El callback debería leer directamente estructuras gameplay que pueden mutar en paralelo?",
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
          "Solo en debug",
          false
        ]
      ],
      "feedback": "Usa snapshots/comandos con ownership claro."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Deadline 10 ms, callback 7.5 ms. Margen ms.",
        "answer": "2.5",
        "hint": "10-7.5."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Underrun count es una métrica útil?",
        "answer": "si",
        "hint": "Mide fallos de deadline/dispositivo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Audio y render deben compartir necesariamente el mismo reloj?",
        "answer": "no",
        "hint": "Tienen cadencias y contratos distintos."
      }
    ]
  },
  "gameaudio-integration-project": {
    "id": "gameaudio-integration-project",
    "courseId": 43,
    "title": "Proyecto: sistema de audio interactivo",
    "shortTitle": "Proyecto: sistema de audio interactivo",
    "duration": 110,
    "objective": "Construir un subsistema de audio de juego que combine mezcla, espacialización, música adaptativa y audio procedural con métricas reproducibles.",
    "summary": [
      "El proyecto debe demostrar un pipeline completo, no una colección de samples: fuentes→voices→spatial/DSP→buses→master→device.",
      "Debe incluir al menos una decisión de virtualización/streaming, una transición musical cuantizada y una fuente procedural o efecto DSP stateful.",
      "La evaluación usa métricas: latencia aproximada, max callback time, underruns, voces físicas/virtuales, CPU de DSP y memoria/streaming."
    ],
    "concept": "El proyecto debe demostrar un pipeline completo, no una colección de samples: fuentes→voices→spatial/DSP→buses→master→device.",
    "rules": [
      "Diseña primero contratos de hilos y ownership.",
      "Crea escenas de stress reproducibles.",
      "Documenta qué aproximaciones acústicas son físicas y cuáles artísticas."
    ],
    "deep": {
      "intro": "Construir un subsistema de audio de juego que combine mezcla, espacialización, música adaptativa y audio procedural con métricas reproducibles.",
      "sections": [
        {
          "title": "Arquitectura",
          "body": "Gameplay publica comandos; audio thread procesa; workers alimentan streaming; mixer entrega bloques al device."
        },
        {
          "title": "Stress",
          "body": "100+ fuentes, movimiento 3D, reverb zones y música: medir no solo escuchar."
        },
        {
          "title": "Reproducibilidad",
          "body": "Seeds fijas para procedural y script de cámara/NPC permiten comparar cambios."
        },
        {
          "title": "Resultado",
          "body": "Entrega diagrama, métricas before/after y explicación de trade-offs de buffer/latencia/calidad."
        }
      ]
    },
    "example": {
      "problem": "Max callback baja de 3.6 a 2.4 ms. Speedup del tiempo de callback.",
      "steps": [
        "3.6/2.4=1.5"
      ],
      "solution": "1.5×"
    },
    "check": {
      "question": "¿Un demo que suena bien pero no mide underruns/latencia demuestra robustez real-time?",
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
          "Siempre",
          false
        ]
      ],
      "feedback": "La robustez temporal necesita métricas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "CPU DSP pasa 4 ms→3 ms. Mejora porcentual del tiempo.",
        "answer": "25%",
        "hint": "(4-3)/4·100."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El proyecto debe incluir stress test reproducible?",
        "answer": "si",
        "hint": "Sin él no comparas regresiones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Debe documentar aproximaciones artísticas de acústica?",
        "answer": "si",
        "hint": "Evita venderlas como leyes físicas."
      }
    ]
  }
});
