/**
 * BLOQUE 049 — Sizecoding
 *
 * Regla editorial: optimizar el artefacto distribuido real y separar tamaño bruto,
 * compresibilidad, memoria runtime y coste de reconstrucción. Los trucos dependientes
 * de plataforma se etiquetan como tales; no se convierten en reglas universales.
 */
window.LEARNING_PATHS[49] = {
  "level": "Experto técnico-creativo",
  "estimatedHours": 118,
  "description": "Programación y producción audiovisual bajo presupuestos extremos de distribución, desde 256 bytes hasta 64 KiB.",
  "outcomes": [
    "Medir el coste real de cada byte a través del pipeline de compilación/link/compresión.",
    "Distinguir microoptimización de representación, compresibilidad y arquitectura orientada a tamaño.",
    "Construir contenido procedural, shaders y audio con toolchains que exporten players mínimos.",
    "Analizar límites de portabilidad, startup y compatibilidad de técnicas extremas."
  ],
  "modules": [
    {
      "id": "m1-categories",
      "title": "Escalas extremas",
      "description": "256 B, 1K, 4K y 64K",
      "lessons": [
        "size-256",
        "size-1k",
        "size-4k",
        "size-64k"
      ]
    },
    {
      "id": "m2-binary",
      "title": "Bytes de máquina y ejecutable",
      "description": "Assembly, binary size, compresores y formatos",
      "lessons": [
        "size-assembly",
        "size-binary",
        "size-compressors",
        "size-executable",
        "size-code-data"
      ]
    },
    {
      "id": "m3-generative",
      "title": "Contenido comprimible",
      "description": "Procedural, shaders, synths y entropy coding",
      "lessons": [
        "size-procedural",
        "size-shaders",
        "size-synths",
        "size-entropy"
      ]
    },
    {
      "id": "m4-architecture",
      "title": "Arquitectura de producción",
      "description": "Diseñar todo el pipeline alrededor del presupuesto",
      "lessons": [
        "size-architecture"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "size-256": {
  "id": "size-256",
  "courseId": 49,
  "title": "256-byte intros",
  "shortTitle": "256 bytes",
  "duration": 95,
  "objective": "Entender qué cambia cuando todo el programa debe caber en unos cientos de bytes.",
  "summary": [
    "Una intro de 256 bytes obliga a tratar formato ejecutable, entorno de arranque, código y datos como un único presupuesto.",
    "En tamaños extremos se explotan invariantes del entorno, instrucciones compactas y reutilización de estado, pero cada supuesto reduce portabilidad.",
    "La métrica válida es el artefacto distribuido según las reglas de la compo; el tamaño del source o de la RAM en ejecución es otra cosa."
  ],
  "concept": "Una intro de 256 bytes obliga a tratar formato ejecutable, entorno de arranque, código y datos como un único presupuesto.",
  "rules": [
    "Cuenta bytes del artefacto final, no líneas de source.",
    "Documenta cada supuesto del entorno que ahorra bytes.",
    "No confundas tamaño extremo con seguridad, robustez o portabilidad."
  ],
  "deep": {
    "intro": "Entender qué cambia cuando todo el programa debe caber en unos cientos de bytes.",
    "sections": [
      {
        "title": "Presupuesto total",
        "body": "En una categoría de 256 bytes, cabecera/cargador, código, datos y cualquier bootstrap deben respetar el límite definido por la plataforma o compo."
      },
      {
        "title": "Entorno como diccionario",
        "body": "Estados iniciales, registros, servicios de firmware/OS o modos gráficos pueden actuar como información implícita. Depender de ellos ahorra bytes pero crea fragilidad."
      },
      {
        "title": "Reutilización",
        "body": "Una constante puede servir como color, contador y parte de una dirección si el diseño lo permite. El ahorro nace de compartir representación."
      },
      {
        "title": "Validación",
        "body": "El binario debe probarse en el entorno objetivo y medirse después de ensamblado/empaquetado."
      }
    ]
  },
  "example": {
    "problem": "256 bytes totales; 43 bytes de datos y 31 de bootstrap. ¿Máximo restante para código/otros?",
    "steps": [
      "256-43-31=182."
    ],
    "solution": "182 bytes."
  },
  "check": {
    "question": "¿Una intro de 256 bytes implica usar como máximo 256 bytes de RAM?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "El límite de distribución y la memoria runtime son contratos distintos."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "¿El source debe medir 256 bytes?",
      "answer": "no",
      "hint": "Se mide el artefacto según reglas."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "256-120= ? bytes libres.",
      "answer": "136",
      "hint": "Resta."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Depender de estado inicial no documentado puede romper portabilidad?",
      "answer": "si",
      "hint": "El supuesto forma parte del diseño."
    }
  ]
},
  "size-1k": {
  "id": "size-1k",
  "courseId": 49,
  "title": "1 KB intros",
  "shortTitle": "1K",
  "duration": 95,
  "objective": "Diseñar una intro donde engine, efecto, música o timing compiten dentro de ~1 KiB.",
  "summary": [
    "1K añade margen respecto a 256 bytes, pero sigue haciendo dominante el overhead del ejecutable y de las APIs.",
    "El ahorro puede venir de generación matemática, tablas pequeñas y reutilización de parámetros, no solo de instrucciones cortas.",
    "La categoría concreta puede usar 1000 o 1024 bytes según reglas; el curso siempre exige comprobar el límite de la compo."
  ],
  "concept": "1K añade margen respecto a 256 bytes, pero sigue haciendo dominante el overhead del ejecutable y de las APIs.",
  "rules": [
    "No presupongas que 1K siempre significa exactamente 1024 bytes en todas las competiciones.",
    "Optimiza el artefacto final medido.",
    "Reserva bytes según impacto audiovisual, no por subsistema sentimentalmente favorito."
  ],
  "deep": {
    "intro": "Diseñar una intro donde engine, efecto, música o timing compiten dentro de ~1 KiB.",
    "sections": [
      {
        "title": "Presupuesto",
        "body": "En 1K, decenas de bytes de cabecera o imports ya son porcentajes apreciables."
      },
      {
        "title": "Procedural",
        "body": "Una función compacta puede generar patrones o geometría que costarían mucho más como datos explícitos."
      },
      {
        "title": "Audio",
        "body": "En categorías diminutas, audio puede ser una síntesis mínima o estar ausente según objetivo/reglas."
      },
      {
        "title": "Iteración",
        "body": "Mantén un mapa de bytes por subsistema para decidir dónde compensa invertir esfuerzo."
      }
    ]
  },
  "example": {
    "problem": "Límite 1024 B; runtime/bootstrap 210 B y datos 190 B. Resto.",
    "steps": [
      "1024-210-190=624."
    ],
    "solution": "624 bytes."
  },
  "check": {
    "question": "¿Una función procedural puede sustituir datos explícitos para ahorrar distribución?",
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
        "Solo en debug",
        false
      ]
    ],
    "feedback": "Reconstrucción runtime intercambia bytes por cómputo."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "1024-768= ?",
      "answer": "256",
      "hint": "Resta."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿1K debe interpretarse según reglas concretas?",
      "answer": "si",
      "hint": "La unidad/categoría puede estar definida explícitamente."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Más compresión siempre gana si añade demasiado stub?",
      "answer": "no",
      "hint": "Importa el total stub+payload."
    }
  ]
},
  "size-4k": {
  "id": "size-4k",
  "courseId": 49,
  "title": "4 KB intros",
  "shortTitle": "4K",
  "duration": 95,
  "objective": "Entender el ecosistema 4K: linker compresor, shaders, synth mínimo y contenido procedural.",
  "summary": [
    "En 4K, el formato ejecutable sigue importando pero ya puede existir una arquitectura pequeña con gráficos, timeline y audio.",
    "Un compressing linker como Crinkler optimiza conjuntamente layout/enlaces y compresión para ejecutables muy pequeños; no es equivalente a comprimir cualquier archivo después.",
    "La compresibilidad del código y los datos puede ser más importante que el tamaño sin comprimir."
  ],
  "concept": "En 4K, el formato ejecutable sigue importando pero ya puede existir una arquitectura pequeña con gráficos, timeline y audio.",
  "rules": [
    "Mide tamaño comprimido real, no solo objeto o ejecutable sin pack.",
    "Optimiza para compresibilidad cuando el pipeline final usa compresión.",
    "No atribuyas a 4K una toolchain universal: plataforma y compo cambian."
  ],
  "deep": {
    "intro": "Entender el ecosistema 4K: linker compresor, shaders, synth mínimo y contenido procedural.",
    "sections": [
      {
        "title": "Stub y payload",
        "body": "El descompresor/loader tiene coste; el compresor solo compensa si el payload reducido supera ese overhead."
      },
      {
        "title": "Orden/layout",
        "body": "Agrupar datos e instrucciones con patrones parecidos puede mejorar compresión."
      },
      {
        "title": "Shaders",
        "body": "Shaders minificados y repetitivos pueden comprimirse bien, pero múltiples variantes pueden destruir ganancias."
      },
      {
        "title": "Tool feedback",
        "body": "Mapas de símbolos y análisis de tamaño convierten la optimización en proceso medible."
      }
    ]
  },
  "example": {
    "problem": "4096 B; stub 180 B; payload comprimido 3500 B. Margen.",
    "steps": [
      "4096-180-3500=416."
    ],
    "solution": "416 bytes."
  },
  "check": {
    "question": "¿El menor ejecutable sin comprimir garantiza el menor 4K final comprimido?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "La compresibilidad puede cambiar el resultado."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "4096-4000= ?",
      "answer": "96",
      "hint": "Resta."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿El stub del descompresor consume presupuesto?",
      "answer": "si",
      "hint": "Forma parte del artefacto final."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Layout puede afectar ratio de compresión?",
      "answer": "si",
      "hint": "Cambiar vecindad/patrones altera el modelo estadístico."
    }
  ]
},
  "size-64k": {
  "id": "size-64k",
  "courseId": 49,
  "title": "64 KB intros",
  "shortTitle": "64K",
  "duration": 95,
  "objective": "Diseñar una producción 64K como sistema procedural completo en vez de miniaturizar una demo convencional.",
  "summary": [
    "64K permite engines y toolchains serios, pero el ejecutable distribuido sigue siendo muchísimo menor que sus assets generados en runtime.",
    "La tradición 64K moderna usa compresores especializados, generación procedural, sintetizadores y herramientas offline de autoría.",
    "El gran ahorro suele venir de representar contenido como procedimientos, grafos y parámetros que se reconstruyen al arrancar."
  ],
  "concept": "64K permite engines y toolchains serios, pero el ejecutable distribuido sigue siendo muchísimo menor que sus assets generados en runtime.",
  "rules": [
    "64 KiB de distribución no limita a 64 KiB la memoria runtime.",
    "Separa tool/editor grande del player final mínimo.",
    "Evalúa startup/decompression time además del tamaño."
  ],
  "deep": {
    "intro": "Diseñar una producción 64K como sistema procedural completo en vez de miniaturizar una demo convencional.",
    "sections": [
      {
        "title": "Tool versus player",
        "body": "El editor de producción puede medir cientos de MB; el runtime final contiene solo evaluadores y datos necesarios."
      },
      {
        "title": "Generación",
        "body": "Texturas, meshes, animación y música pueden reconstruirse desde parámetros."
      },
      {
        "title": "Compresión",
        "body": "kkrunchy/squishy representan familias de herramientas especializadas; su conveniencia depende del target y del tiempo de compresión."
      },
      {
        "title": "Trade-off",
        "body": "Bytes ahorrados pueden costar startup, CPU/GPU o complejidad de authoring."
      }
    ]
  },
  "example": {
    "problem": "65536 B; player+datos comprimidos usan 61200 B. Margen.",
    "steps": [
      "65536-61200=4336."
    ],
    "solution": "4336 bytes."
  },
  "check": {
    "question": "¿Una 64K puede generar cientos de MB de datos temporales al ejecutarse?",
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
        "Solo en debug",
        false
      ]
    ],
    "feedback": "El límite de distribución no es el de RAM."
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
      "prompt": "¿Editor y player final deben medir lo mismo?",
      "answer": "no",
      "hint": "El toolchain no tiene por qué distribuirse."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Startup es un coste posible de reconstrucción procedural?",
      "answer": "si",
      "hint": "Descompresión/generación consumen tiempo."
    }
  ]
},
  "size-assembly": {
  "id": "size-assembly",
  "courseId": 49,
  "title": "Assembly extremo",
  "shortTitle": "ASM extremo",
  "duration": 95,
  "objective": "Razonar sobre encoding, registros, immediates y control-flow cuando cada byte de máquina importa.",
  "summary": [
    "En ensamblador extremo importa la codificación real: dos instrucciones semánticamente similares pueden tener longitudes distintas.",
    "Usar registros implícitos, operandos pequeños o reutilizar flags puede ahorrar bytes a costa de restricciones y legibilidad.",
    "La optimización depende de la ISA y del modo de ejecución; un truco x86 no es una ley general de assembly."
  ],
  "concept": "En ensamblador extremo importa la codificación real: dos instrucciones semánticamente similares pueden tener longitudes distintas.",
  "rules": [
    "Consulta encoding real, no estimes por número de mnemonics.",
    "Nombra ISA/modo/ABI antes de comparar tamaños.",
    "No uses undefined/undocumented behavior sin documentar el riesgo."
  ],
  "deep": {
    "intro": "Razonar sobre encoding, registros, immediates y control-flow cuando cada byte de máquina importa.",
    "sections": [
      {
        "title": "Encoding",
        "body": "Opcode, prefixes, ModR/M, SIB, displacement e immediate pueden contribuir a longitud en x86."
      },
      {
        "title": "Implicit operands",
        "body": "Algunas instrucciones codifican operandos implícitamente y pueden ser más compactas."
      },
      {
        "title": "Control-flow",
        "body": "Fall-through y layout pueden evitar saltos o acortar desplazamientos."
      },
      {
        "title": "Trade-off",
        "body": "Una secuencia más larga sin comprimir puede comprimir mejor; el objetivo final manda."
      }
    ]
  },
  "example": {
    "problem": "Opción A 7 B y B 5 B, repetida 18 veces sin compresión. Ahorro bruto.",
    "steps": [
      "(7-5)*18=36."
    ],
    "solution": "36 bytes."
  },
  "check": {
    "question": "¿Menos mnemonics garantiza menos bytes de máquina?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "La codificación determina longitud."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "7-5= ?",
      "answer": "2",
      "hint": "Diferencia."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿Un truco de encoding x86 se generaliza a ARM automáticamente?",
      "answer": "no",
      "hint": "Cada ISA codifica distinto."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿El layout puede permitir fall-through y ahorrar branch?",
      "answer": "si",
      "hint": "Orden del código importa."
    }
  ]
},
  "size-binary": {
  "id": "size-binary",
  "courseId": 49,
  "title": "Binary size y presupuestos",
  "shortTitle": "Binary size",
  "duration": 95,
  "objective": "Medir de dónde salen los bytes y distinguir tamaño de source, object, executable, packed payload y memoria runtime.",
  "summary": [
    "Binary size es una propiedad del artefacto en una etapa concreta del pipeline; source, objeto, ejecutable y packed exe pueden tener tamaños muy distintos.",
    "Headers, imports, relocations, alignment, runtime y símbolos pueden dominar programas pequeños.",
    "Un informe por símbolos/secciones evita optimizar una función de 12 bytes mientras una tabla accidental ocupa 4 KiB."
  ],
  "concept": "Binary size es una propiedad del artefacto en una etapa concreta del pipeline; source, objeto, ejecutable y packed exe pueden tener tamaños muy distintos.",
  "rules": [
    "Siempre especifica qué archivo/etapa estás midiendo.",
    "Compara builds reproducibles con mismas opciones.",
    "Ataca primero los contributors dominantes."
  ],
  "deep": {
    "intro": "Medir de dónde salen los bytes y distinguir tamaño de source, object, executable, packed payload y memoria runtime.",
    "sections": [
      {
        "title": "Mapa de tamaño",
        "body": "Clasifica text/code, rodata, data, metadata, imports y overhead del formato."
      },
      {
        "title": "Alignment",
        "body": "Padding puede existir por alineación de secciones/segmentos."
      },
      {
        "title": "Dead stripping",
        "body": "Link-time garbage collection elimina código/datos no referenciados cuando el toolchain puede demostrarlo."
      },
      {
        "title": "Compresión",
        "body": "El tamaño packed depende de entropía/patrones, no solo del total bruto."
      }
    ]
  },
  "example": {
    "problem": "Binario 6144 B: código 2400, datos 1600, metadata 700. Otros bytes.",
    "steps": [
      "6144-2400-1600-700=1444."
    ],
    "solution": "1444 bytes."
  },
  "check": {
    "question": "¿El tamaño del source permite inferir directamente el tamaño final comprimido?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "Hay compilación, link, metadata y compresión."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "8192-2048= ?",
      "answer": "6144",
      "hint": "Resta."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿Padding puede contar en tamaño de archivo?",
      "answer": "si",
      "hint": "Depende del layout/formato."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Debes medir con idénticas opciones al comparar cambios?",
      "answer": "si",
      "hint": "Si no, confundes variables."
    }
  ]
},
  "size-compressors": {
  "id": "size-compressors",
  "courseId": 49,
  "title": "Compressors y compressing linkers",
  "shortTitle": "Compressors",
  "duration": 95,
  "objective": "Entender por qué los compresores especializados de intros combinan modelo estadístico, layout y un stub diminuto.",
  "summary": [
    "Un ejecutable comprimido contiene al menos payload codificado y lógica suficiente para reconstruir/arrancar el programa.",
    "En 4K son comunes compressing linkers especializados; en 64K existen packers con modelos más costosos porque el stub se amortiza mejor.",
    "El mejor ratio no es la única variable: stub, tiempo de compresión, tiempo de arranque, compatibilidad y diagnósticos importan."
  ],
  "concept": "Un ejecutable comprimido contiene al menos payload codificado y lógica suficiente para reconstruir/arrancar el programa.",
  "rules": [
    "Compara tamaño total final, no solo ratio del payload.",
    "Trata false positives antivirus como problema operacional de distribución, no como propiedad deseable.",
    "No confundas compresión con cifrado u ofuscación de seguridad."
  ],
  "deep": {
    "intro": "Entender por qué los compresores especializados de intros combinan modelo estadístico, layout y un stub diminuto.",
    "sections": [
      {
        "title": "Modelo",
        "body": "El compresor explota redundancia y asigna códigos más cortos a patrones probables."
      },
      {
        "title": "Stub",
        "body": "El descompresor tiene tamaño propio; cuanto menor el target, más importante es."
      },
      {
        "title": "Tooling",
        "body": "Analizadores pueden atribuir qué símbolos/datos comprimen mal."
      },
      {
        "title": "Seguridad",
        "body": "Un packer de intro reduce tamaño; no proporciona autenticidad/confidencialidad por sí mismo."
      }
    ]
  },
  "example": {
    "problem": "Payload pasa 9000→3600 B; stub 220 B. Tamaño final.",
    "steps": [
      "3600+220=3820."
    ],
    "solution": "3820 bytes."
  },
  "check": {
    "question": "¿Un packer de intros debe considerarse cifrado seguro por defecto?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "Compresión y seguridad son objetivos diferentes."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "3600+220= ?",
      "answer": "3820",
      "hint": "Suma."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿Un stub mayor puede borrar el beneficio de comprimir un payload pequeño?",
      "answer": "si",
      "hint": "Cuenta el total."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Mejor ratio implica siempre mejor workflow?",
      "answer": "no",
      "hint": "También importan tiempo, compatibilidad y análisis."
    }
  ]
},
  "size-executable": {
  "id": "size-executable",
  "courseId": 49,
  "title": "Executable structure",
  "shortTitle": "Executable",
  "duration": 95,
  "objective": "Entender qué partes de PE/ELF/Mach-O o un formato mínimo consumen bytes antes de ejecutar la primera instrucción útil.",
  "summary": [
    "Un ejecutable contiene estructura para que loader/OS sepa mapear, proteger, enlazar y transferir control; esa metadata tiene coste.",
    "Imports dinámicos, relocations, secciones y alignment pueden ser más caros proporcionalmente en sizecoding que en software normal.",
    "Algunas intros usan loaders/headers mínimos o supuestos del entorno; eso es dependiente de plataforma y puede sacrificar compatibilidad."
  ],
  "concept": "Un ejecutable contiene estructura para que loader/OS sepa mapear, proteger, enlazar y transferir control; esa metadata tiene coste.",
  "rules": [
    "No enseñes headers mínimos de una plataforma como formato universal.",
    "Separa requisito del loader de conveniencia del toolchain.",
    "Verifica en sistemas/entornos objetivo; los parsers/loaders cambian."
  ],
  "deep": {
    "intro": "Entender qué partes de PE/ELF/Mach-O o un formato mínimo consumen bytes antes de ejecutar la primera instrucción útil.",
    "sections": [
      {
        "title": "Loader contract",
        "body": "El SO necesita reconocer formato, punto de entrada y regiones mapeables."
      },
      {
        "title": "Imports",
        "body": "Resolver APIs por tabla de importación cuesta metadata; otros enfoques tienen diferentes costes/riesgos."
      },
      {
        "title": "Sections",
        "body": "Una sección extra puede implicar cabeceras/alignment adicionales."
      },
      {
        "title": "Compatibilidad",
        "body": "Trucos que violan expectativas de tooling o loaders pueden dejar de funcionar."
      }
    ]
  },
  "example": {
    "problem": "Cabeceras 512 B, imports 180 B, padding 96 B. Overhead total.",
    "steps": [
      "512+180+96=788."
    ],
    "solution": "788 bytes."
  },
  "check": {
    "question": "¿PE, ELF y Mach-O tienen la misma estructura de cabecera?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "Son formatos distintos."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "512+180= ?",
      "answer": "692",
      "hint": "Suma."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿El loader impone un contrato al ejecutable?",
      "answer": "si",
      "hint": "Debe reconocer y mapear el artefacto."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Eliminar metadata puede reducir compatibilidad/debuggability?",
      "answer": "si",
      "hint": "Es un trade-off."
    }
  ]
},
  "size-code-data": {
  "id": "size-code-data",
  "courseId": 49,
  "title": "Code/data dual use",
  "shortTitle": "Code/Data",
  "duration": 95,
  "objective": "Razonar sobre bytes que cumplen más de un papel sin convertir la técnica en una excusa para comportamiento indefinido accidental.",
  "summary": [
    "En sizecoding, una misma secuencia de bytes puede interpretarse como datos en un contexto y como instrucciones en otro si la plataforma/flujo lo permite.",
    "También puede haber dualidad semántica menos extrema: una constante o tabla sirve a varios efectos, reduciendo información explícita.",
    "Code/data dual use aumenta acoplamiento y dificulta mantenimiento, tooling y análisis; debe ser deliberado y validado."
  ],
  "concept": "En sizecoding, una misma secuencia de bytes puede interpretarse como datos en un contexto y como instrucciones en otro si la plataforma/flujo lo permite.",
  "rules": [
    "Distingue reutilización semántica de ejecutar datos arbitrarios.",
    "Documenta alineación, endianness y permisos relevantes.",
    "No presupongas memoria ejecutable-escribible en plataformas modernas."
  ],
  "deep": {
    "intro": "Razonar sobre bytes que cumplen más de un papel sin convertir la técnica en una excusa para comportamiento indefinido accidental.",
    "sections": [
      {
        "title": "Múltiples interpretaciones",
        "body": "Los bytes no poseen significado aislado; el consumidor y su formato/ISA determinan interpretación."
      },
      {
        "title": "Constantes compartidas",
        "body": "Un vector puede parametrizar color, movimiento y ruido si el diseño visual acepta esa correlación."
      },
      {
        "title": "Protecciones",
        "body": "W^X/NX y políticas modernas pueden invalidar trucos históricos de memoria."
      },
      {
        "title": "Compresión",
        "body": "Reutilizar datos puede bajar tamaño bruto, pero cambiar patrones puede mejorar o empeorar compresión final."
      }
    ]
  },
  "example": {
    "problem": "Tabla 48 B reemplaza dos tablas independientes de 48 B. Ahorro bruto.",
    "steps": [
      "96-48=48."
    ],
    "solution": "48 bytes."
  },
  "check": {
    "question": "¿Code/data dual use implica que toda memoria moderna sea RWX?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "Permisos dependen de plataforma y política."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "96-48= ?",
      "answer": "48",
      "hint": "Resta."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿Un mismo byte puede tener significado distinto para consumidores distintos?",
      "answer": "si",
      "hint": "La interpretación depende del contexto."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Compartir constantes siempre mejora compresión final?",
      "answer": "no",
      "hint": "Mide el artefacto packed."
    }
  ]
},
  "size-procedural": {
  "id": "size-procedural",
  "courseId": 49,
  "title": "Procedural generation para tamaño",
  "shortTitle": "Procedural",
  "duration": 95,
  "objective": "Representar assets como programas, seeds y parámetros y analizar el intercambio entre bytes, startup y expresividad.",
  "summary": [
    "La generación procedural sustituye muestras explícitas por una descripción generativa que reconstruye contenido en runtime.",
    "Funciona especialmente bien cuando muchas estructuras comparten reglas: ruido, L-systems, primitivas, materiales, curvas y grafos.",
    "Una seed no contiene por sí sola el algoritmo: para reproducibilidad necesitas versión y orden de operaciones compatibles."
  ],
  "concept": "La generación procedural sustituye muestras explícitas por una descripción generativa que reconstruye contenido en runtime.",
  "rules": [
    "Cuenta también el coste del generador reutilizable.",
    "Prefiere generadores composables que sirvan a muchos assets.",
    "Versiona algoritmos/seeds si deseas reproducibilidad futura."
  ],
  "deep": {
    "intro": "Representar assets como programas, seeds y parámetros y analizar el intercambio entre bytes, startup y expresividad.",
    "sections": [
      {
        "title": "Representación",
        "body": "Una textura de millones de texels puede surgir de unas funciones y parámetros si su estructura es procedural."
      },
      {
        "title": "Amortización",
        "body": "Un generador de 600 B que reemplaza diez assets de 400 B puede ser rentable; para uno solo quizá no."
      },
      {
        "title": "Startup",
        "body": "Reconstruir tiene coste temporal y memoria temporal."
      },
      {
        "title": "Authoring",
        "body": "Herramientas grandes pueden editar grafos que el player serializa en forma compacta."
      }
    ]
  },
  "example": {
    "problem": "Generador 600 B + 10 parámetros de 20 B reemplazan 10 assets de 400 B. Ahorro bruto.",
    "steps": [
      "4000-(600+200)=3200."
    ],
    "solution": "3200 bytes."
  },
  "check": {
    "question": "¿Una seed basta para reproducir el resultado si cambia el algoritmo generador?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "Seed y algoritmo forman parte del contrato."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "10*20= ?",
      "answer": "200",
      "hint": "Multiplica."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿Procedural generation puede intercambiar bytes por CPU?",
      "answer": "si",
      "hint": "Reconstrucción cuesta cómputo."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Un generador reusable puede amortizar su coste entre assets?",
      "answer": "si",
      "hint": "Ese es uno de sus grandes beneficios."
    }
  ]
},
  "size-shaders": {
  "id": "size-shaders",
  "courseId": 49,
  "title": "Shader compression y minification",
  "shortTitle": "Shaders",
  "duration": 95,
  "objective": "Diseñar shaders que sean pequeños y compresibles sin confundir minificación con optimización de GPU.",
  "summary": [
    "Shader minification elimina/reescribe representación fuente para reducir bytes y favorecer compresión; no implica que el shader ejecute más rápido.",
    "Renombrar, plegar constantes y compartir funciones puede reducir source, mientras variantes duplicadas pueden inflar drásticamente el payload.",
    "GLSL/HLSL fuente, IR y binario de driver son etapas diferentes; en muchas intros se distribuye source porque el driver compila en runtime."
  ],
  "concept": "Shader minification elimina/reescribe representación fuente para reducir bytes y favorecer compresión; no implica que el shader ejecute más rápido.",
  "rules": [
    "Mide tamaño final comprimido después del minificador.",
    "No sacrifiques corrección numérica o compatibilidad sin medir el target real.",
    "Separa shader-size optimization de GPU performance optimization."
  ],
  "deep": {
    "intro": "Diseñar shaders que sean pequeños y compresibles sin confundir minificación con optimización de GPU.",
    "sections": [
      {
        "title": "Minificación",
        "body": "Whitespace, identificadores y formas algebraicas pueden transformarse preservando semántica pretendida."
      },
      {
        "title": "Compresibilidad",
        "body": "Repetir estructuras puede parecer más largo sin comprimir y resultar barato tras compresión."
      },
      {
        "title": "Variantes",
        "body": "N keywords booleanas pueden crear hasta 2^N combinaciones si se materializan todas."
      },
      {
        "title": "Runtime compile",
        "body": "Distribuir fuente desplaza parte del trabajo al driver y puede introducir tiempo de compilación/compatibilidad."
      }
    ]
  },
  "example": {
    "problem": "Shader 1800 B pasa a 1050 B antes de compresión. Reducción porcentual a 3 decimales.",
    "steps": [
      "(1800-1050)/1800*100=41.667%."
    ],
    "solution": "41.667%."
  },
  "check": {
    "question": "¿Minificar un shader garantiza mayor FPS?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "Tamaño de source y coste GPU son dimensiones distintas."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "8 flags: máximo variantes.",
      "answer": "256",
      "hint": "2^8."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿Fuente GLSL e IR SPIR-V son la misma etapa?",
      "answer": "no",
      "hint": "Son representaciones distintas."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Conviene medir después de compresión final?",
      "answer": "si",
      "hint": "Ese es el presupuesto real."
    }
  ]
},
  "size-synths": {
  "id": "size-synths",
  "courseId": 49,
  "title": "Synthesizers procedurales",
  "shortTitle": "Tiny synth",
  "duration": 95,
  "objective": "Generar música desde eventos y parámetros compactos en lugar de distribuir audio PCM completo.",
  "summary": [
    "Un tiny synth representa composición y timbre mediante notas, eventos, instrumentos y DSP compacto y renderiza audio al iniciar o durante ejecución.",
    "Osciladores, envolventes, filtros, modulación y delay/reverb pueden producir gran variedad con pocos parámetros reutilizables.",
    "El coste se desplaza de almacenamiento a código, CPU, startup y diseño del sintetizador."
  ],
  "concept": "Un tiny synth representa composición y timbre mediante notas, eventos, instrumentos y DSP compacto y renderiza audio al iniciar o durante ejecución.",
  "rules": [
    "Distingue datos musicales de audio renderizado.",
    "Controla aliasing y estabilidad numérica incluso bajo presupuesto extremo.",
    "No atribuyas byte cost cero a un instrumento procedural: necesita motor y parámetros."
  ],
  "deep": {
    "intro": "Generar música desde eventos y parámetros compactos en lugar de distribuir audio PCM completo.",
    "sections": [
      {
        "title": "PCM versus eventos",
        "body": "180 s estéreo 48 kHz 16-bit son decenas de MiB; una partitura/event stream procedural puede ser órdenes de magnitud menor."
      },
      {
        "title": "Instrumentos",
        "body": "Un patch compacto parametriza un grafo de DSP compartido."
      },
      {
        "title": "Precalc",
        "body": "Renderizar música al inicio simplifica callback pero aumenta startup y memoria."
      },
      {
        "title": "Streaming synth",
        "body": "Generar en tiempo real reduce buffer precalculado pero exige deadlines de audio."
      }
    ]
  },
  "example": {
    "problem": "Audio PCM: 48kHz, estéreo, 16-bit, 10 s. Bytes.",
    "steps": [
      "48000*2*2*10=1920000."
    ],
    "solution": "1,920,000 bytes."
  },
  "check": {
    "question": "¿Un synth procedural elimina todo coste de datos y código musical?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "Reemplaza PCM por engine+eventos+parámetros."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "48000*2*2= ? bytes/s",
      "answer": "192000",
      "hint": "sample rate·channels·bytes/sample."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿Precalcular audio puede aumentar startup?",
      "answer": "si",
      "hint": "Renderizas antes de reproducir."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Tiny synth conecta directamente con el Bloque 051?",
      "answer": "si",
      "hint": "Es la base de música procedural."
    }
  ]
},
  "size-entropy": {
  "id": "size-entropy",
  "courseId": 49,
  "title": "Entropy coding",
  "shortTitle": "Entropía",
  "duration": 95,
  "objective": "Relacionar entropía, modelos de probabilidad y códigos con el tamaño final sin prometer compresión por debajo de los límites de información.",
  "summary": [
    "Un entropy coder asigna representaciones según probabilidades estimadas; símbolos más probables pueden costar menos bits en promedio.",
    "La entropía de Shannon da un límite medio bajo un modelo/distribución, no promete que cada archivo individual comprima hasta exactamente H bits/símbolo.",
    "Modelar contexto puede reducir entropía condicional aparente, pero el modelo y el decoder también tienen coste."
  ],
  "concept": "Un entropy coder asigna representaciones según probabilidades estimadas; símbolos más probables pueden costar menos bits en promedio.",
  "rules": [
    "Separa entropía teórica, cross-entropy del modelo y tamaño real con overhead.",
    "No afirmes que datos uniformemente aleatorios son compresibles sin información lateral.",
    "Cuenta modelo/decoder/stub en targets diminutos."
  ],
  "deep": {
    "intro": "Relacionar entropía, modelos de probabilidad y códigos con el tamaño final sin prometer compresión por debajo de los límites de información.",
    "sections": [
      {
        "title": "Información",
        "body": "Para distribución p, H=-Σp log2 p mide incertidumbre media."
      },
      {
        "title": "Modelo imperfecto",
        "body": "Si el coder usa q distinto de p, el coste medio se relaciona con cross-entropy y paga una penalización."
      },
      {
        "title": "Contexto",
        "body": "Predecir bytes según contexto puede concentrar probabilidades y mejorar codificación."
      },
      {
        "title": "Overhead",
        "body": "En 256 B o 4K, un coder sofisticado puede perder frente a uno simple por tamaño de decoder."
      }
    ]
  },
  "example": {
    "problem": "Fuente equiprobable de 8 símbolos. Entropía en bits/símbolo.",
    "steps": [
      "log2(8)=3."
    ],
    "solution": "3 bits/símbolo."
  },
  "check": {
    "question": "¿La entropía H garantiza que cada archivo concreto mida exactamente H bits por símbolo tras comprimir?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "Es un límite/promedio bajo supuestos."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "log2(16)= ?",
      "answer": "4",
      "hint": "Potencia de dos."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿Un modelo más complejo puede perder por overhead en un intro pequeño?",
      "answer": "si",
      "hint": "Cuenta decoder/modelo."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Compresión lossless crea información nueva?",
      "answer": "no",
      "hint": "Explota redundancia/modelo."
    }
  ]
},
  "size-architecture": {
  "id": "size-architecture",
  "courseId": 49,
  "title": "Arquitecturas orientadas a tamaño",
  "shortTitle": "Arquitectura",
  "duration": 95,
  "objective": "Diseñar engine, toolchain y contenido para minimizar información distribuida total en vez de microoptimizar subsistemas aislados.",
  "summary": [
    "Una arquitectura orientada a tamaño maximiza reutilización de evaluadores, formatos, parámetros y operadores entre gráficos, animación y audio.",
    "El editor/tool offline puede ser enorme mientras exporte una representación mínima que entiende un player compacto.",
    "La métrica final combina tamaño, calidad, startup, compatibilidad y tiempo de producción; el mínimo absoluto de bytes no siempre maximiza la obra."
  ],
  "concept": "Una arquitectura orientada a tamaño maximiza reutilización de evaluadores, formatos, parámetros y operadores entre gráficos, animación y audio.",
  "rules": [
    "Diseña desde el presupuesto global antes de optimizar funciones locales.",
    "Haz que herramientas muestren coste incremental comprimido por asset/operator.",
    "Conserva un baseline reproducible para saber si cada cambio realmente ahorra bytes."
  ],
  "deep": {
    "intro": "Diseñar engine, toolchain y contenido para minimizar información distribuida total en vez de microoptimizar subsistemas aislados.",
    "sections": [
      {
        "title": "Sistema de operadores",
        "body": "Un mismo grafo compacto puede describir texturas, geometría o animación mediante operadores reutilizados."
      },
      {
        "title": "Export",
        "body": "El tool serializa solo parámetros y conexiones requeridos por la release."
      },
      {
        "title": "Coste marginal",
        "body": "Añadir una feature de 300 B que permite eliminar 2 KiB de datos puede ser una ganancia neta."
      },
      {
        "title": "Criterio final",
        "body": "Bytes son una restricción; sincronía, estética y fiabilidad siguen siendo objetivos de producción."
      }
    ]
  },
  "example": {
    "problem": "Feature cuesta 300 B y elimina 2048 B de datos. Ganancia neta.",
    "steps": [
      "2048-300=1748."
    ],
    "solution": "1748 bytes."
  },
  "check": {
    "question": "¿La mejor arquitectura 64K debe minimizar también el tamaño del editor de autoría?",
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
        "Solo si el compilador lo decide",
        false
      ]
    ],
    "feedback": "El editor no forma necesariamente parte de la release."
  },
  "practice": [
    {
      "level": 1,
      "label": "Básico",
      "prompt": "2048-300= ?",
      "answer": "1748",
      "hint": "Resta."
    },
    {
      "level": 2,
      "label": "Normal",
      "prompt": "¿Coste incremental comprimido es una métrica útil?",
      "answer": "si",
      "hint": "Alinea decisión con el artefacto final."
    },
    {
      "level": 3,
      "label": "Difícil",
      "prompt": "¿Menos bytes siempre significa mejor demo?",
      "answer": "no",
      "hint": "La restricción convive con objetivos audiovisuales y robustez."
    }
  ]
}
});
