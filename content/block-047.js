/**
 * BLOQUE 047 — Demoscene: historia y cultura
 *
 * Regla editorial: distinguir hechos históricos verificables, recepción comunitaria
 * y análisis técnico. La genealogía desde crack intros se estudia como historia;
 * no como guía para vulnerar protecciones o licencias.
 */
window.LEARNING_PATHS[47] = {
  "level": "Experto histórico-técnico",
  "estimatedHours": 112,
  "description": "Historia y cultura de la demoscene desde crack intros y micros de 8/16 bits hasta Future Crew, Second Reality, grupos posteriores, archivos y compos.",
  "outcomes": [
    "Reconstruir la genealogía de la demoscene sin confundirla con cracking actual.",
    "Analizar producciones en contexto de plataforma, party, categoría y restricciones.",
    "Explicar el papel de Future Crew y Second Reality en la historia de la PC demo scene.",
    "Usar archivos comunitarios y resultados de parties con criterio de fuente y preservación."
  ],
  "modules": [
    {
      "id": "m1-origins-platforms",
      "title": "Orígenes y plataformas",
      "description": "Cracktros, C64, Amiga, Atari y PC",
      "lessons": [
        "demo-origins",
        "demo-cracktros",
        "demo-c64",
        "demo-amiga",
        "demo-atari",
        "demo-pc"
      ]
    },
    {
      "id": "m2-future-crew",
      "title": "Future Crew y Second Reality",
      "description": "Grupo, obra y Assembly 1993",
      "lessons": [
        "demo-future-crew",
        "demo-second-reality",
        "demo-assembly"
      ]
    },
    {
      "id": "m3-groups",
      "title": "Grupos y evolución de la scene",
      "description": "TBL, Farbrausch y Conspiracy",
      "lessons": [
        "demo-black-lotus",
        "demo-farbrausch",
        "demo-conspiracy"
      ]
    },
    {
      "id": "m4-culture",
      "title": "Infraestructura cultural",
      "description": "Archivos, parties y competitions",
      "lessons": [
        "demo-sceneorg",
        "demo-parties",
        "demo-competitions"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "demo-origins": {
    "id": "demo-origins",
    "courseId": 47,
    "title": "Origen de la demoscene: de la crack intro a la obra autónoma",
    "shortTitle": "Origen de la scene",
    "duration": 95,
    "objective": "Reconstruir el origen cultural de la demoscene sin confundir cracking, distribución de software y creación artística.",
    "summary": [
      "La demoscene surgió históricamente en estrecha relación con escenas de cracking y grupos que añadían intros a software modificado, pero terminó desarrollando una cultura creativa autónoma.",
      "Una demo es una producción audiovisual ejecutable que genera su presentación en tiempo real; su valor cultural no depende de modificar software ajeno.",
      "Entender la scene exige mirar a la vez limitaciones de hardware, competencia entre grupos, identidad, distribución y colaboración artística."
    ],
    "concept": "La demoscene surgió históricamente en estrecha relación con escenas de cracking y grupos que añadían intros a software modificado, pero terminó desarrollando una cultura creativa autónoma.",
    "rules": [
      "Distingue genealogía histórica de identidad actual.",
      "No uses 'cracking' y 'demoscene' como sinónimos.",
      "Analiza producción, plataforma, party y contexto antes de juzgar una obra."
    ],
    "deep": {
      "intro": "Reconstruir el origen cultural de la demoscene sin confundir cracking, distribución de software y creación artística.",
      "sections": [
        {
          "title": "Genealogía",
          "body": "En los microordenadores de los años 80, firmas y pequeñas intros asociadas a cracks se convirtieron en espacios para mostrar código, gráficos y música. Ese impulso competitivo y autoral ayudó a formar una escena de demos independientes."
        },
        {
          "title": "Autonomía",
          "body": "La demo elimina la necesidad de que exista software crackeado: el ejecutable es la obra. Grupos y artistas compiten por técnica, diseño, música, dirección y uso creativo de restricciones."
        },
        {
          "title": "Identidad",
          "body": "Handles, logos, greetings y group identity funcionan como mecanismos sociales. La producción técnica y la reputación comunitaria están entrelazadas."
        },
        {
          "title": "Preservación",
          "body": "Archivos, capturas y emulación son importantes porque muchas producciones dependen de hardware, sistemas y timings antiguos."
        }
      ]
    },
    "example": {
      "problem": "Clasifica: una pequeña presentación añadida antes de un crack frente a una demo independiente.",
      "steps": [
        "La primera es una crack intro/cracktro asociada al crack.",
        "La segunda es una producción autónoma cuyo propósito es la propia presentación."
      ],
      "solution": "Comparten raíces culturales, pero no son la misma categoría."
    },
    "check": {
      "question": "¿Toda demo es una crack intro?",
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
          "Solo en PC",
          false
        ]
      ],
      "feedback": "Una demo es una producción audiovisual ejecutable que genera su presentación en tiempo real; su valor cultural no depende de modificar software ajeno."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Demoscene y cracking son sinónimos?",
        "answer": "no",
        "hint": "Comparten historia, no identidad completa."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una demo necesita incluir un juego crackeado?",
        "answer": "no",
        "hint": "La obra puede ser autónoma."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Nombra la unidad social típica que firma una producción: grupo o protocolo.",
        "answer": "grupo",
        "hint": "Future Crew es un ejemplo."
      }
    ]
  },
  "demo-cracktros": {
    "id": "demo-cracktros",
    "courseId": 47,
    "title": "Crack intros, cracktros y la lógica de la firma técnica",
    "shortTitle": "Crack intros",
    "duration": 95,
    "objective": "Entender qué función cumplieron las crack intros y cómo su formato impulsó habilidades luego centrales en la demoscene.",
    "summary": [
      "Una crack intro era una presentación pequeña vinculada a una release modificada y servía como firma, anuncio y demostración técnica del grupo.",
      "Las restricciones de tamaño y arranque favorecieron código compacto, tipografía, scrolltext, música y efectos inmediatamente reconocibles.",
      "La relevancia histórica de las crack intros no implica presentar la vulneración de licencias o protecciones como objetivo formativo del curso."
    ],
    "concept": "Una crack intro era una presentación pequeña vinculada a una release modificada y servía como firma, anuncio y demostración técnica del grupo.",
    "rules": [
      "Estudia el formato históricamente, no como guía de cracking.",
      "Separa payload artístico de la actividad que originó la release.",
      "Observa qué técnicas sobreviven después en intros y demos autónomas."
    ],
    "deep": {
      "intro": "Entender qué función cumplieron las crack intros y cómo su formato impulsó habilidades luego centrales en la demoscene.",
      "sections": [
        {
          "title": "Firma",
          "body": "Logos, handles y greetings convertían la intro en identidad pública."
        },
        {
          "title": "Restricción",
          "body": "Poco espacio y poco tiempo de arranque empujaban hacia rutinas compactas y assets comprimidos/procedurales."
        },
        {
          "title": "Lenguaje visual",
          "body": "Scrollers, raster effects, chiptunes y logos se convirtieron en convenciones reconocibles."
        },
        {
          "title": "Herencia",
          "body": "La cultura de intros limitadas por tamaño continúa en categorías 64K, 4K, 1K y menores, ya desligadas del crack."
        }
      ]
    },
    "example": {
      "problem": "Una intro ocupa 4096 bytes y 1024 son música/datos. ¿Cuántos quedan para código y otros datos?",
      "steps": [
        "4096-1024=3072."
      ],
      "solution": "3072 bytes."
    },
    "check": {
      "question": "¿Una cracktro es idéntica por definición a una 4K intro moderna de compo?",
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
          "Solo si usa assembly",
          false
        ]
      ],
      "feedback": "Las restricciones de tamaño y arranque favorecieron código compacto, tipografía, scrolltext, música y efectos inmediatamente reconocibles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "4096-1536 bytes.",
        "answer": "2560",
        "hint": "Resta."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una crack intro funciona históricamente también como firma de grupo? sí/no",
        "answer": "si",
        "hint": "Identidad y reputación."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El curso usa crack intros como guía para romper protecciones? sí/no",
        "answer": "no",
        "hint": "El foco es historia/cultura/técnica audiovisual."
      }
    ]
  },
  "demo-c64": {
    "id": "demo-c64",
    "courseId": 47,
    "title": "Commodore 64: VIC-II, SID y cultura de restricciones",
    "shortTitle": "Commodore 64",
    "duration": 95,
    "objective": "Relacionar la cultura C64 con sus restricciones técnicas y con convenciones duraderas de la demoscene.",
    "summary": [
      "La escena C64 convirtió límites de CPU, vídeo y memoria en un lenguaje propio de efectos, raster timing, sprites y música SID.",
      "Muchos efectos dependen de comprender hardware específico y temporización; una captura moderna puede ocultar parte de ese virtuosismo.",
      "La relevancia de una producción no se mide solo por apariencia moderna, sino por lo conseguido bajo su plataforma objetivo."
    ],
    "concept": "La escena C64 convirtió límites de CPU, vídeo y memoria en un lenguaje propio de efectos, raster timing, sprites y música SID.",
    "rules": [
      "Evalúa una demo respecto de su hardware real.",
      "Distingue efecto visual de mecanismo que lo hace posible.",
      "No extrapoles timings o capacidades del C64 a otras máquinas."
    ],
    "deep": {
      "intro": "Relacionar la cultura C64 con sus restricciones técnicas y con convenciones duraderas de la demoscene.",
      "sections": [
        {
          "title": "Plataforma",
          "body": "CPU 8-bit, chip VIC-II y SID forman un entorno con restricciones y posibilidades muy distintas de un PC moderno."
        },
        {
          "title": "Raster",
          "body": "Cambiar registros sincronizados con el barrido permite construir efectos que explotan el comportamiento del vídeo."
        },
        {
          "title": "Audio",
          "body": "El SID hizo de la síntesis y composición una parte central de la identidad C64."
        },
        {
          "title": "Cultura viva",
          "body": "La plataforma sigue siendo objeto de nuevas producciones, no solo una etapa arqueológica."
        }
      ]
    },
    "example": {
      "problem": "Una rutina dispone de 312 líneas de raster y reserva 40 para una zona estable. ¿Cuántas quedan para otras fases?",
      "steps": [
        "312-40=272."
      ],
      "solution": "272 líneas."
    },
    "check": {
      "question": "¿Debe juzgarse una demo C64 como si dispusiera de una GPU moderna?",
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
          "Solo si está emulada",
          false
        ]
      ],
      "feedback": "Muchos efectos dependen de comprender hardware específico y temporización; una captura moderna puede ocultar parte de ese virtuosismo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "256 sprites teóricos no son posibles si el hardware expone 8 sprites sin multiplexado. ¿Cuántos slots base?",
        "answer": "8",
        "hint": "Dato del enunciado."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Raster timing depende de temporización de hardware? sí/no",
        "answer": "si",
        "hint": "Es parte del mecanismo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una captura de vídeo revela siempre el coste técnico de un efecto C64? sí/no",
        "answer": "no",
        "hint": "Oculta restricciones de la plataforma."
      }
    ]
  },
  "demo-amiga": {
    "id": "demo-amiga",
    "courseId": 47,
    "title": "Amiga: custom chips, trackers y salto audiovisual",
    "shortTitle": "Amiga",
    "duration": 95,
    "objective": "Entender por qué el Amiga fue una plataforma decisiva para la estética y técnica de demos.",
    "summary": [
      "El Amiga combinó CPU con chips especializados para gráficos y audio, ofreciendo una plataforma especialmente fértil para demos audiovisuales.",
      "Copper, blitter, bitplanes y audio sampleado permitieron técnicas que no se explican bien usando solo el modelo de framebuffer moderno.",
      "La cultura tracker y la composición por módulos estrecharon la colaboración entre coders, graphicians y musicians."
    ],
    "concept": "El Amiga combinó CPU con chips especializados para gráficos y audio, ofreciendo una plataforma especialmente fértil para demos audiovisuales.",
    "rules": [
      "Aprende la arquitectura suficiente para interpretar el efecto.",
      "No llames 'GPU' moderna a cada chip especializado.",
      "Relaciona producción visual con música y sincronización."
    ],
    "deep": {
      "intro": "Entender por qué el Amiga fue una plataforma decisiva para la estética y técnica de demos.",
      "sections": [
        {
          "title": "Custom chips",
          "body": "El trabajo se reparte entre CPU y hardware especializado; el patrón de uso importa tanto como la potencia bruta."
        },
        {
          "title": "Copper/blitter",
          "body": "Permiten secuencias sincronizadas con vídeo y operaciones de memoria/gráficos específicas."
        },
        {
          "title": "Trackers",
          "body": "Música basada en samples y patterns encaja bien en una producción ejecutable y editable por pasos."
        },
        {
          "title": "Dirección",
          "body": "Muchas demos Amiga son relevantes por la combinación de diseño, timing, música y código, no por un único truco."
        }
      ]
    },
    "example": {
      "problem": "Un módulo tiene 64 rows por pattern y usa 12 patterns. Rows totales si todos se reproducen completos una vez.",
      "steps": [
        "64·12=768."
      ],
      "solution": "768 rows."
    },
    "check": {
      "question": "¿El Amiga puede explicarse completamente como CPU que escribe un framebuffer lineal?",
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
          "Solo con AGA",
          false
        ]
      ],
      "feedback": "Copper, blitter, bitplanes y audio sampleado permitieron técnicas que no se explican bien usando solo el modelo de framebuffer moderno."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "64 rows × 8 patterns.",
        "answer": "512",
        "hint": "Multiplica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Trackers favorecieron colaboración entre código y música? sí/no",
        "answer": "si",
        "hint": "Patterns y samples forman parte del flujo creativo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Copper y blitter son equivalentes exactos a un shader moderno? sí/no",
        "answer": "no",
        "hint": "Arquitecturas y contratos distintos."
      }
    ]
  },
  "demo-atari": {
    "id": "demo-atari",
    "courseId": 47,
    "title": "Atari ST/Falcon: otra rama de la cultura demo europea",
    "shortTitle": "Atari",
    "duration": 95,
    "objective": "Situar Atari ST y Falcon dentro de la historia de la scene y reconocer que plataformas distintas producen tradiciones técnicas distintas.",
    "summary": [
      "La demoscene europea no fue una línea C64→Amiga→PC: Atari ST y Falcon desarrollaron comunidades, técnicas y producciones propias.",
      "Compartir una familia de CPU con otros sistemas no hace idénticos sus subsistemas de vídeo, audio, memoria o timing.",
      "Comparar escenas por plataforma ayuda a entender cómo una restricción concreta puede convertirse en estilo."
    ],
    "concept": "La demoscene europea no fue una línea C64→Amiga→PC: Atari ST y Falcon desarrollaron comunidades, técnicas y producciones propias.",
    "rules": [
      "Evita historias lineales que borran escenas paralelas.",
      "Compara arquitectura completa, no solo CPU.",
      "Busca producciones y party context de cada plataforma."
    ],
    "deep": {
      "intro": "Situar Atari ST y Falcon dentro de la historia de la scene y reconocer que plataformas distintas producen tradiciones técnicas distintas.",
      "sections": [
        {
          "title": "ST",
          "body": "La plataforma desarrolló una fuerte cultura de demos con énfasis en sincronización, overscan y explotación del hardware."
        },
        {
          "title": "Falcon",
          "body": "Amplió capacidades multimedia y mantuvo producción demo propia."
        },
        {
          "title": "Cruces",
          "body": "Grupos y miembros podían trabajar en varias máquinas, trasladando ideas sin que el código fuese necesariamente portable."
        },
        {
          "title": "Comparación",
          "body": "La misma intención visual puede requerir técnicas totalmente distintas en C64, Amiga, Atari o PC."
        }
      ]
    },
    "example": {
      "problem": "Dos plataformas comparten CPU pero tienen chips de vídeo distintos. ¿Compartir CPU implica mismo efecto implementado igual?",
      "steps": [
        "No; vídeo, memoria, timers y sistema cambian."
      ],
      "solution": "No."
    },
    "check": {
      "question": "¿La historia de la demoscene europea se reduce a C64, Amiga y PC?",
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
          "Solo después de 1993",
          false
        ]
      ],
      "feedback": "Compartir una familia de CPU con otros sistemas no hace idénticos sus subsistemas de vídeo, audio, memoria o timing."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Atari ST y Falcon pertenecen a la historia demoscene? sí/no",
        "answer": "si",
        "hint": "Tienen comunidades y producciones propias."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Misma CPU implica mismo subsistema gráfico? sí/no",
        "answer": "no",
        "hint": "La plataforma es más que CPU."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un efecto visual semejante garantiza técnica interna semejante entre plataformas? sí/no",
        "answer": "no",
        "hint": "Puede construirse con hardware diferente."
      }
    ]
  },
  "demo-pc": {
    "id": "demo-pc",
    "courseId": 47,
    "title": "PC demo scene: de plataforma empresarial a máquina multimedia",
    "shortTitle": "PC demo scene",
    "duration": 95,
    "objective": "Explicar el ascenso del PC demoscene y por qué sus restricciones fueron diferentes de las de micros con hardware más uniforme.",
    "summary": [
      "La escena PC tuvo que lidiar con hardware más heterogéneo, DOS, múltiples tarjetas de sonido y una rápida evolución de CPU y vídeo.",
      "Los demos PC de principios de los 90 ayudaron a demostrar que la plataforma podía producir experiencias audiovisuales en tiempo real competitivas.",
      "Compatibilidad, autodetección y rendimiento en varias configuraciones se convirtieron en parte del reto técnico."
    ],
    "concept": "La escena PC tuvo que lidiar con hardware más heterogéneo, DOS, múltiples tarjetas de sonido y una rápida evolución de CPU y vídeo.",
    "rules": [
      "No supongas una única configuración 'PC'.",
      "Distingue DOS-era PC de pipelines GPU posteriores.",
      "Relaciona innovación con disponibilidad real de hardware y drivers."
    ],
    "deep": {
      "intro": "Explicar el ascenso del PC demoscene y por qué sus restricciones fueron diferentes de las de micros con hardware más uniforme.",
      "sections": [
        {
          "title": "Heterogeneidad",
          "body": "CPU, VGA/SVGA y tarjetas de sonido podían variar; una producción tenía que elegir objetivos y fallbacks."
        },
        {
          "title": "Modo protegido y memoria",
          "body": "Extenders y técnicas de gestión de memoria ampliaron lo que podía hacer un demo DOS."
        },
        {
          "title": "Audio",
          "body": "Sound Blaster, Gravis Ultrasound y otros dispositivos implicaban rutas distintas."
        },
        {
          "title": "Transición",
          "body": "Con aceleración 3D y APIs modernas, la escena PC cambia de técnicas sin perder la lógica de producción ejecutable."
        }
      ]
    },
    "example": {
      "problem": "Una demo soporta 3 backends de audio y 2 modos de vídeo independientes. Combinaciones teóricas de configuración.",
      "steps": [
        "3·2=6."
      ],
      "solution": "6 combinaciones."
    },
    "check": {
      "question": "¿'PC demo' implica una única configuración de hardware?",
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
          "Solo en DOS",
          false
        ]
      ],
      "feedback": "Los demos PC de principios de los 90 ayudaron a demostrar que la plataforma podía producir experiencias audiovisuales en tiempo real competitivas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "4 tarjetas de sonido × 3 modos de vídeo. Combinaciones.",
        "answer": "12",
        "hint": "4·3."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Compatibilidad puede ser parte del desafío de una demo PC? sí/no",
        "answer": "si",
        "hint": "Hardware heterogéneo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una demo DOS de 1993 usa necesariamente API gráfica moderna? sí/no",
        "answer": "no",
        "hint": "Contexto histórico."
      }
    ]
  },
  "demo-future-crew": {
    "id": "demo-future-crew",
    "courseId": 47,
    "title": "Future Crew: grupo, herramientas y consolidación de la PC scene",
    "shortTitle": "Future Crew",
    "duration": 95,
    "objective": "Estudiar Future Crew como caso de grupo multidisciplinar y como puente entre cultura demo, herramientas y la industria posterior.",
    "summary": [
      "Future Crew fue un influyente demogroup finlandés que pasó de C64 a PC y produjo demos, música y herramientas como Scream Tracker.",
      "Su relevancia no se reduce a Second Reality: Unreal, Panic, herramientas y su relación con Assembly ayudan a explicar una etapa decisiva de la PC scene.",
      "Analizar un grupo significa estudiar división de roles, tooling, distribución, reputación y contexto de party, no inventar un único 'autor genial'."
    ],
    "concept": "Future Crew fue un influyente demogroup finlandés que pasó de C64 a PC y produjo demos, música y herramientas como Scream Tracker.",
    "rules": [
      "Atribuye trabajos a grupo y roles cuando sea posible.",
      "Separa impacto documentado de mitología retrospectiva.",
      "Usa archivos de party y releases para verificar fechas/resultados."
    ],
    "deep": {
      "intro": "Estudiar Future Crew como caso de grupo multidisciplinar y como puente entre cultura demo, herramientas y la industria posterior.",
      "sections": [
        {
          "title": "Grupo",
          "body": "Future Crew reunió código, gráficos y música; los handles de miembros forman parte de la cultura scene."
        },
        {
          "title": "Tooling",
          "body": "Scream Tracker ejemplifica cómo una herramienta creada alrededor de la escena puede influir en workflows musicales más amplios."
        },
        {
          "title": "Assembly",
          "body": "Future Crew estuvo estrechamente vinculado a los primeros años de Assembly, un punto clave para la escena finlandesa."
        },
        {
          "title": "Legado",
          "body": "Miembros del ecosistema Future Crew continuaron después en empresas y proyectos tecnológicos, pero el bloque distingue esa trayectoria posterior de las producciones del grupo."
        }
      ]
    },
    "example": {
      "problem": "Una producción acredita 3 coders, 2 músicos y 2 graphicians. Créditos de roles contados, suponiendo personas distintas.",
      "steps": [
        "3+2+2=7."
      ],
      "solution": "7 personas/roles individuales bajo la hipótesis dada."
    },
    "check": {
      "question": "¿Future Crew debe estudiarse únicamente a través de Second Reality?",
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
          "Solo para PC",
          false
        ]
      ],
      "feedback": "Su relevancia no se reduce a Second Reality: Unreal, Panic, herramientas y su relación con Assembly ayudan a explicar una etapa decisiva de la PC scene."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Future Crew es un grupo finlandés? sí/no",
        "answer": "si",
        "hint": "Caso central de la PC scene finlandesa."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Scream Tracker es una herramienta musical asociada a Future Crew? sí/no",
        "answer": "si",
        "hint": "Tooling de la escena."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La reputación de un demogroup depende necesariamente de una única persona? sí/no",
        "answer": "no",
        "hint": "Producción multidisciplinar."
      }
    ]
  },
  "demo-second-reality": {
    "id": "demo-second-reality",
    "courseId": 47,
    "title": "Second Reality: leer una demo como sistema audiovisual",
    "shortTitle": "Second Reality",
    "duration": 95,
    "objective": "Analizar Second Reality de Future Crew como obra, como software y como producción de competición sin convertir su prestigio en argumento técnico.",
    "summary": [
      "Second Reality, de Future Crew, ganó la competición PC demo de Assembly 1993 y se convirtió en una referencia histórica de la escena PC.",
      "La obra encadena múltiples efectos 2D/3D y sincronización musical; su fuerza está en la dirección de la secuencia tanto como en cada rutina aislada.",
      "Una lectura técnica responsable diferencia lo confirmado por archivos/source de rumores sobre cómo supuestamente funcionaba."
    ],
    "concept": "Second Reality, de Future Crew, ganó la competición PC demo de Assembly 1993 y se convirtió en una referencia histórica de la escena PC.",
    "rules": [
      "Verifica resultado y release con archivos de party.",
      "Analiza escenas individuales y transiciones, no solo el final.",
      "No conviertas leyendas técnicas no verificadas en hechos."
    ],
    "deep": {
      "intro": "Analizar Second Reality de Future Crew como obra, como software y como producción de competición sin convertir su prestigio en argumento técnico.",
      "sections": [
        {
          "title": "Contexto",
          "body": "Assembly Archive registra Second Reality como primer puesto de la PC demo competition de 1993."
        },
        {
          "title": "Secuencia",
          "body": "La producción combina partes con técnicas y ritmos distintos, unidas por música, transiciones y dirección."
        },
        {
          "title": "Hardware",
          "body": "Fue diseñada para PCs de su época y distintas opciones de audio; ejecutar hoy mediante emulación cambia el entorno, no la obra original."
        },
        {
          "title": "Source",
          "body": "La disponibilidad posterior del código permite contrastar afirmaciones y estudiar decisiones reales, un puente ideal con assembly/reversing."
        }
      ]
    },
    "example": {
      "problem": "Si una secuencia dura 9 min y se divide en 6 partes iguales para un análisis temporal, duración media por parte.",
      "steps": [
        "9/6=1.5 min."
      ],
      "solution": "1.5 minutos."
    },
    "check": {
      "question": "¿Second Reality ganó la competición PC demo de Assembly 1993?",
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
          "Fue una 4K intro",
          false
        ]
      ],
      "feedback": "La obra encadena múltiples efectos 2D/3D y sincronización musical; su fuerza está en la dirección de la secuencia tanto como en cada rutina aislada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Autoría de Second Reality: Future Crew o Farbrausch?",
        "answer": "Future Crew",
        "hint": "Assembly 1993."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Quedó 1º en la PC demo compo de Assembly 1993? sí/no",
        "answer": "si",
        "hint": "Archivo oficial de Assembly."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Prestigio histórico demuestra por sí solo una afirmación sobre su implementación interna? sí/no",
        "answer": "no",
        "hint": "Consulta source/documentación."
      }
    ]
  },
  "demo-assembly": {
    "id": "demo-assembly",
    "courseId": 47,
    "title": "Assembly y el papel de las grandes demoparties",
    "shortTitle": "Assembly",
    "duration": 95,
    "objective": "Entender Assembly como party/competición y distinguir el evento social de la arquitectura assembly del procesador.",
    "summary": [
      "Assembly es una demoparty finlandesa histórica; en este bloque la palabra designa el evento, no el lenguaje ensamblador.",
      "Las parties combinan encuentro físico, deadlines, compos, proyección pública y circulación de releases, creando una infraestructura social de producción.",
      "Un resultado de compo documenta una clasificación concreta bajo reglas concretas; no establece una jerarquía eterna de valor artístico."
    ],
    "concept": "Assembly es una demoparty finlandesa histórica; en este bloque la palabra designa el evento, no el lenguaje ensamblador.",
    "rules": [
      "Desambigua siempre Assembly-party de assembly-language.",
      "Lee reglas de la compo antes de comparar resultados.",
      "Usa el archivo del evento para fechas, categorías y puestos."
    ],
    "deep": {
      "intro": "Entender Assembly como party/competición y distinguir el evento social de la arquitectura assembly del procesador.",
      "sections": [
        {
          "title": "Party",
          "body": "Una demoparty reúne creadores y público alrededor de producciones, compos y actividades sociales."
        },
        {
          "title": "Compo",
          "body": "Las categorías definen plataforma, tamaño o tipo; las reglas cambian según evento y época."
        },
        {
          "title": "Deadline",
          "body": "El deadline influye en proceso creativo: integración final, compatibilidad y sincronización suelen concentrarse antes de la entrega."
        },
        {
          "title": "Archivo",
          "body": "Assembly Archive preserva resultados y releases históricas, útil para verificar Future Crew/Second Reality."
        }
      ]
    },
    "example": {
      "problem": "Una compo recibe 18 entries y muestra las 12 finalistas. ¿Cuántas no entran en esa proyección final bajo esta regla?",
      "steps": [
        "18-12=6."
      ],
      "solution": "6 entries."
    },
    "check": {
      "question": "En este bloque, ¿'Assembly' se refiere principalmente a lenguaje ensamblador?",
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
          "Solo en C64",
          false
        ]
      ],
      "feedback": "Las parties combinan encuentro físico, deadlines, compos, proyección pública y circulación de releases, creando una infraestructura social de producción."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "20 entries, 15 seleccionadas. No seleccionadas.",
        "answer": "5",
        "hint": "20-15."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una compo tiene reglas y contexto propios? sí/no",
        "answer": "si",
        "hint": "Categorías y límites varían."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Ganar una compo demuestra superioridad universal para toda época/plataforma? sí/no",
        "answer": "no",
        "hint": "Es un resultado contextual."
      }
    ]
  },
  "demo-black-lotus": {
    "id": "demo-black-lotus",
    "courseId": 47,
    "title": "The Black Lotus: continuidad de la excelencia Amiga",
    "shortTitle": "The Black Lotus",
    "duration": 95,
    "objective": "Usar The Black Lotus como caso de longevidad, dirección audiovisual y explotación profunda de plataformas Amiga.",
    "summary": [
      "The Black Lotus (TBL) es un demogroup especialmente asociado a producciones Amiga y a una larga continuidad de trabajo sobre hardware clásico.",
      "Producciones como Starstruck muestran que una plataforma histórica puede seguir generando obras competitivas muchos años después de su etapa comercial principal.",
      "La lección analiza dirección, diseño y técnica conjuntamente: el efecto aislado no explica toda la producción."
    ],
    "concept": "The Black Lotus (TBL) es un demogroup especialmente asociado a producciones Amiga y a una larga continuidad de trabajo sobre hardware clásico.",
    "rules": [
      "No confundas antigüedad de plataforma con ausencia de innovación.",
      "Compara la obra con las restricciones de su target.",
      "Separa valoración comunitaria de hechos verificables como plataforma/party/puesto."
    ],
    "deep": {
      "intro": "Usar The Black Lotus como caso de longevidad, dirección audiovisual y explotación profunda de plataformas Amiga.",
      "sections": [
        {
          "title": "Continuidad",
          "body": "La escena mantiene vivas plataformas históricas mediante conocimiento acumulado, toolchains y hardware/emulación."
        },
        {
          "title": "Starstruck",
          "body": "Archivos comunitarios registran Starstruck como producción TBL de 2006 y ganadora de una compo combinada en Assembly."
        },
        {
          "title": "Dirección",
          "body": "Composición, pacing, música y transitions pueden ser tan decisivos como un efecto técnicamente extremo."
        },
        {
          "title": "Transferencia",
          "body": "TBL también ilustra que los grupos no tienen por qué estar limitados a una sola plataforma durante toda su historia."
        }
      ]
    },
    "example": {
      "problem": "Una demo tiene 5 partes de 40 s y una intro de 20 s. Duración total.",
      "steps": [
        "5·40+20=220 s."
      ],
      "solution": "220 segundos."
    },
    "check": {
      "question": "¿Una plataforma antigua impide por definición producir una demo nueva?",
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
          "Solo sin emulador",
          false
        ]
      ],
      "feedback": "Producciones como Starstruck muestran que una plataforma histórica puede seguir generando obras competitivas muchos años después de su etapa comercial principal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿TBL está especialmente asociado a Amiga? sí/no",
        "answer": "si",
        "hint": "Es una parte central de su historia."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "5 escenas × 30 s = segundos.",
        "answer": "150",
        "hint": "Multiplica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El valor de una demo se reduce a contar efectos? sí/no",
        "answer": "no",
        "hint": "Dirección y música importan."
      }
    ]
  },
  "demo-farbrausch": {
    "id": "demo-farbrausch",
    "courseId": 47,
    "title": "Farbrausch y la revolución procedural de 64K",
    "shortTitle": "Farbrausch",
    "duration": 95,
    "objective": "Analizar Farbrausch como caso de toolchain procedural, compresión y síntesis orientadas a límites de tamaño.",
    "summary": [
      "Farbrausch convirtió la restricción de 64K en un problema de generación: almacenar programas y parámetros que reconstruyen contenido en runtime en vez de guardar todos los assets explícitamente.",
      "fr-08: .the .product, ganadora de la 64K compo de The Party 2000, es una referencia histórica de ese enfoque procedural.",
      "El tamaño del ejecutable no es memoria runtime: una intro pequeña puede generar y almacenar estructuras mucho mayores después de arrancar."
    ],
    "concept": "Farbrausch convirtió la restricción de 64K en un problema de generación: almacenar programas y parámetros que reconstruyen contenido en runtime en vez de guardar todos los assets explícitamente.",
    "rules": [
      "Distingue tamaño en disco de memoria/tiempo de ejecución.",
      "Analiza toolchain y generadores, no solo el compresor final.",
      "No asumas que procedural siempre produce menos coste runtime."
    ],
    "deep": {
      "intro": "Analizar Farbrausch como caso de toolchain procedural, compresión y síntesis orientadas a límites de tamaño.",
      "sections": [
        {
          "title": "64K",
          "body": "65 536 bytes obligan a optimizar representación y tooling, no solo instrucciones individuales."
        },
        {
          "title": "Procedural",
          "body": "Texturas, geometría y música pueden derivarse de parámetros, seeds y pequeños programas."
        },
        {
          "title": "Toolchain",
          "body": "Herramientas como generadores internos permiten que artistas trabajen con una representación compacta sin escribir cada byte manualmente."
        },
        {
          "title": "fr-08",
          "body": "El sitio original de .the .product documenta su intención como demo de 64K y su uso intensivo de contenido generado."
        }
      ]
    },
    "example": {
      "problem": "Presupuesto 65536 bytes; 8192 bytes para código de síntesis y 12288 para audio/tool data. Resto.",
      "steps": [
        "65536-8192-12288=45056."
      ],
      "solution": "45056 bytes."
    },
    "check": {
      "question": "¿Una 64K intro está limitada a 64 KiB de RAM durante ejecución?",
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
          "Solo en DOS",
          false
        ]
      ],
      "feedback": "fr-08: .the .product, ganadora de la 64K compo de The Party 2000, es una referencia histórica de ese enfoque procedural."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "64 KiB en bytes.",
        "answer": "65536",
        "hint": "64·1024."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "65536-16384 bytes.",
        "answer": "49152",
        "hint": "Resta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Generar una textura en runtime puede ahorrar bytes de archivo? sí/no",
        "answer": "si",
        "hint": "Guardas reglas/parámetros en vez del bitmap completo."
      }
    ]
  },
  "demo-conspiracy": {
    "id": "demo-conspiracy",
    "courseId": 47,
    "title": "Conspiracy: 64K como dirección, engine y narrativa",
    "shortTitle": "Conspiracy",
    "duration": 95,
    "objective": "Estudiar Conspiracy como ejemplo de producción 64K donde tecnología, dirección y narrativa visual se diseñan conjuntamente.",
    "summary": [
      "Conspiracy es un demogroup conocido por intros 64K y por construir herramientas/engines orientados a producción procedural compacta.",
      "A Place Called Universe es un ejemplo documentado de 64K intro de 2003 y muestra que la restricción de tamaño puede convivir con dirección audiovisual sostenida.",
      "Comparar grupos sizecoding exige observar pipeline, generación de assets, síntesis musical y decisiones visuales, no solo bytes finales."
    ],
    "concept": "Conspiracy es un demogroup conocido por intros 64K y por construir herramientas/engines orientados a producción procedural compacta.",
    "rules": [
      "Usa el tamaño como restricción, no como único criterio artístico.",
      "Distingue engine/tooling de la producción concreta.",
      "Verifica releases en archivos del grupo/scene."
    ],
    "deep": {
      "intro": "Estudiar Conspiracy como ejemplo de producción 64K donde tecnología, dirección y narrativa visual se diseñan conjuntamente.",
      "sections": [
        {
          "title": "Producción",
          "body": "Una 64K se diseña alrededor de dependencias y representación compacta desde el inicio."
        },
        {
          "title": "A Place Called Universe",
          "body": "El archivo oficial de releases de Conspiracy la identifica como una producción 64K."
        },
        {
          "title": "Dirección",
          "body": "Una narrativa visual coherente puede ser más importante que mostrar el máximo número de algoritmos."
        },
        {
          "title": "Comparación",
          "body": "Farbrausch y Conspiracy comparten cultura procedural, pero sus toolchains, estilos y decisiones no deben presentarse como idénticos."
        }
      ]
    },
    "example": {
      "problem": "Una intro usa 25% de 64 KiB en código base. Bytes aproximados bajo 65536 exactos.",
      "steps": [
        "0.25·65536=16384."
      ],
      "solution": "16384 bytes."
    },
    "check": {
      "question": "¿Farbrausch y Conspiracy son el mismo demogroup?",
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
          "Solo en 64K",
          false
        ]
      ],
      "feedback": "A Place Called Universe es un ejemplo documentado de 64K intro de 2003 y muestra que la restricción de tamaño puede convivir con dirección audiovisual sostenida."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿A Place Called Universe se clasifica como 64K? sí/no",
        "answer": "si",
        "hint": "Release oficial de Conspiracy."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "50% de 65536 bytes.",
        "answer": "32768",
        "hint": "Divide por dos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Dos grupos con contenido procedural usan necesariamente el mismo engine? sí/no",
        "answer": "no",
        "hint": "La estrategia general no identifica la implementación."
      }
    ]
  },
  "demo-sceneorg": {
    "id": "demo-sceneorg",
    "courseId": 47,
    "title": "Scene.org, archivos y preservación de producciones",
    "shortTitle": "Scene.org",
    "duration": 95,
    "objective": "Entender el papel de archivos comunitarios como Scene.org y aprender a distinguir archivo, catálogo, comentario y fuente primaria.",
    "summary": [
      "Scene.org funciona como infraestructura de archivo y distribución de producciones de la demoscene y es una pieza importante de su memoria digital.",
      "Un archivo conserva bytes; metadatos, capturas y emulación añaden otras capas necesarias para entender correctamente una producción.",
      "Pouët, Demozoo, Assembly Archive y otros recursos cumplen funciones diferentes: comentarios comunitarios, catalogación, party results o almacenamiento no son equivalentes."
    ],
    "concept": "Scene.org funciona como infraestructura de archivo y distribución de producciones de la demoscene y es una pieza importante de su memoria digital.",
    "rules": [
      "Distingue binario original, metadata y comentario.",
      "Conserva checksums cuando hagas una colección técnica.",
      "Prefiere archivo/party/source para afirmaciones verificables de release."
    ],
    "deep": {
      "intro": "Entender el papel de archivos comunitarios como Scene.org y aprender a distinguir archivo, catálogo, comentario y fuente primaria.",
      "sections": [
        {
          "title": "Archivo",
          "body": "Los ejecutables y data originales son evidencia técnica que permite emulación, reversing e investigación."
        },
        {
          "title": "Metadatos",
          "body": "Autor, grupo, plataforma, party, compo y puesto necesitan procedencia verificable."
        },
        {
          "title": "Catálogos",
          "body": "Demozoo/Pouët ayudan a descubrir relaciones y recepción, pero una opinión de usuario no sustituye a una especificación o release original."
        },
        {
          "title": "Preservación",
          "body": "Viejo software puede requerir DOSBox, emulación de Amiga/C64/Atari o hardware real; preservar experiencia es más que guardar un ZIP."
        }
      ]
    },
    "example": {
      "problem": "Tres mirrors guardan un archivo de 8 MiB cada uno. Almacenamiento agregado bruto.",
      "steps": [
        "3·8=24 MiB."
      ],
      "solution": "24 MiB."
    },
    "check": {
      "question": "¿Un comentario de usuario en un catálogo equivale a metadata oficial de una compo?",
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
          "Solo con muchos votos",
          false
        ]
      ],
      "feedback": "Un archivo conserva bytes; metadatos, capturas y emulación añaden otras capas necesarias para entender correctamente una producción."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "4 mirrors × 12 MiB. Total bruto MiB.",
        "answer": "48",
        "hint": "Multiplica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Checksum ayuda a verificar integridad de un archivo? sí/no",
        "answer": "si",
        "hint": "Detecta cambios accidentales."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Guardar solo un vídeo conserva necesariamente el ejecutable original? sí/no",
        "answer": "no",
        "hint": "Son artefactos distintos."
      }
    ]
  },
  "demo-parties": {
    "id": "demo-parties",
    "courseId": 47,
    "title": "Demoparties: comunidad, deadline y estreno colectivo",
    "shortTitle": "Demo parties",
    "duration": 95,
    "objective": "Analizar la demoparty como infraestructura social y técnica de la scene.",
    "summary": [
      "Una demoparty combina comunidad, creación, competiciones y estreno colectivo; no es solamente una conferencia ni solamente una LAN party.",
      "El deadline y la proyección en pantalla grande influyen en cómo se diseñan, prueban y entregan producciones.",
      "La party conecta roles: coder, musician, graphician, designer, organizer, archivist y público."
    ],
    "concept": "Una demoparty combina comunidad, creación, competiciones y estreno colectivo; no es solamente una conferencia ni solamente una LAN party.",
    "rules": [
      "Entiende las reglas antes de producir para una party.",
      "Prueba en condiciones cercanas a la proyección real.",
      "No confundas party attendance con autoría de una release."
    ],
    "deep": {
      "intro": "Analizar la demoparty como infraestructura social y técnica de la scene.",
      "sections": [
        {
          "title": "Proceso",
          "body": "Muchas producciones convergen en un build final cerca del deadline; versionado y fallback reducen riesgo."
        },
        {
          "title": "Proyección",
          "body": "Audio, contraste y escala cambian en una sala grande: una producción debe sobrevivir fuera del monitor del autor."
        },
        {
          "title": "Comunidad",
          "body": "Feedback inmediato, greetings y colaboraciones forman parte de la experiencia scene."
        },
        {
          "title": "Archivo",
          "body": "Party results y releases permiten reconstruir la historia mejor que la memoria aislada."
        }
      ]
    },
    "example": {
      "problem": "Una party tiene 4 compos y cada una reserva 45 min de proyección. Tiempo total.",
      "steps": [
        "4·45=180 min."
      ],
      "solution": "180 minutos = 3 horas."
    },
    "check": {
      "question": "¿Una demoparty es únicamente una competición?",
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
          "Solo Assembly",
          false
        ]
      ],
      "feedback": "El deadline y la proyección en pantalla grande influyen en cómo se diseñan, prueban y entregan producciones."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "6 compos × 30 min. Minutos.",
        "answer": "180",
        "hint": "6·30."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El entorno de proyección puede afectar decisiones de diseño? sí/no",
        "answer": "si",
        "hint": "Pantalla, audio y público cambian el contexto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Asistir a una party convierte a alguien automáticamente en autor de todas sus releases? sí/no",
        "answer": "no",
        "hint": "Autoría se acredita por producción."
      }
    ]
  },
  "demo-competitions": {
    "id": "demo-competitions",
    "courseId": 47,
    "title": "Competitions: categorías, reglas y lectura crítica de resultados",
    "shortTitle": "Competitions",
    "duration": 95,
    "objective": "Aprender a interpretar compos y resultados sin confundir restricción de categoría con medida absoluta de calidad.",
    "summary": [
      "Las compos crean restricciones explícitas —plataforma, tamaño, tipo de producción o formato— y convierten esas restricciones en parte del diseño.",
      "Un puesto es el resultado de una votación/jurado bajo reglas y contexto concretos; sirve como dato histórico, no como verdad universal sobre calidad.",
      "Comparar una demo unrestricted con una 64K, una 4K o una oldschool compo requiere respetar objetivos diferentes."
    ],
    "concept": "Las compos crean restricciones explícitas —plataforma, tamaño, tipo de producción o formato— y convierten esas restricciones en parte del diseño.",
    "rules": [
      "Lee categoría y reglas junto al puesto.",
      "No compares bytes sin considerar qué se genera en runtime.",
      "Distingue jury score, audience vote y popularidad posterior."
    ],
    "deep": {
      "intro": "Aprender a interpretar compos y resultados sin confundir restricción de categoría con medida absoluta de calidad.",
      "sections": [
        {
          "title": "Categorías",
          "body": "Demo, intro, 64K, 4K, executable graphics, music, graphics y oldschool son ejemplos de formatos que pueden existir según party."
        },
        {
          "title": "Restricciones",
          "body": "Una restricción cambia arquitectura: sizecoding favorece procedural; oldschool favorece conocimiento de hardware; wild puede permitir formatos distintos."
        },
        {
          "title": "Resultados",
          "body": "1º, 2º y 3º son hechos de esa compo; la recepción posterior puede divergir."
        },
        {
          "title": "Aprendizaje",
          "body": "Rehacer un efecto dentro de una categoría es un excelente laboratorio porque obliga a medir coste, bytes y calidad."
        }
      ]
    },
    "example": {
      "problem": "Compo con 25 entradas: top 3 representa qué porcentaje del total.",
      "steps": [
        "3/25·100=12%."
      ],
      "solution": "12%."
    },
    "check": {
      "question": "¿Un primer puesto demuestra que una producción es objetivamente mejor en todo contexto?",
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
          "Solo si votó el público",
          false
        ]
      ],
      "feedback": "Un puesto es el resultado de una votación/jurado bajo reglas y contexto concretos; sirve como dato histórico, no como verdad universal sobre calidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Top 5 de 40 entries. Porcentaje.",
        "answer": "12.5%",
        "alternatives": [
          "12.5"
        ],
        "hint": "5/40·100."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una categoría 64K modifica decisiones de arquitectura? sí/no",
        "answer": "si",
        "hint": "El tamaño es parte del problema."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Audience vote y jury score son necesariamente la misma métrica? sí/no",
        "answer": "no",
        "hint": "Sistemas de evaluación distintos."
      }
    ]
  }
});
