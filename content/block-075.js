/**
 * BLOQUE 075 — LABORATORIO DE SISTEMAS REALES
 *
 * Regla editorial: una autopsia técnica distingue observación, inferencia y supuesto.
 * El objetivo es recorrer capas con evidencia reproducible, no memorizar marcas o recetas.
 */
window.LEARNING_PATHS[75] = {
  "level": "Laboratorio de Sistemas Reales",
  "estimatedHours": 285,
  "description": "Autopsias técnicas de sistemas reales: Git, Linux, Doom, Godot, Blender, SSD, GPU, Internet, consolas y LLMs, conectando observación, código y hardware.",
  "outcomes": [
    "Desmontar un sistema real en capas, contratos, estados y flujos verificables.",
    "Seguir datos y eventos verticalmente desde aplicaciones y runtimes hasta OS, drivers, almacenamiento, red y hardware.",
    "Contrastar documentación, código fuente, mediciones y experimentos sin confundir inferencia con observación.",
    "Producir autopsias reproducibles que expliquen mecanismos, trade-offs, límites y evidencia."
  ],
  "modules": [
    {
      "id": "m1-method",
      "title": "Método",
      "description": "Cómo desmontar y comprobar sistemas",
      "lessons": [
        "real-systems-method"
      ]
    },
    {
      "id": "m2-git-linux",
      "title": "Git y Linux",
      "description": "Repositorios, procesos, memoria y E/S",
      "lessons": [
        "real-git-internals",
        "real-linux-process",
        "real-linux-memory-io"
      ]
    },
    {
      "id": "m3-doom-godot",
      "title": "Motores reales",
      "description": "Doom y Godot",
      "lessons": [
        "real-doom-renderer",
        "real-doom-data-loop",
        "real-godot-architecture",
        "real-godot-source"
      ]
    },
    {
      "id": "m4-blender-storage",
      "title": "Contenido y almacenamiento",
      "description": "Blender y SSD",
      "lessons": [
        "real-blender-geometry",
        "real-blender-render",
        "real-ssd-ftl",
        "real-ssd-endurance"
      ]
    },
    {
      "id": "m5-gpu-internet",
      "title": "GPU e Internet",
      "description": "Compute, routing y protocolos",
      "lessons": [
        "real-gpu-pipeline",
        "real-gpu-memory",
        "real-internet-path",
        "real-internet-stack"
      ]
    },
    {
      "id": "m6-platform-ai",
      "title": "Plataformas e IA",
      "description": "Consolas y LLMs",
      "lessons": [
        "real-console-stack",
        "real-llm-transformer",
        "real-llm-systems"
      ]
    },
    {
      "id": "m7-integration",
      "title": "Integración vertical",
      "description": "Trazado y autopsia final",
      "lessons": [
        "real-cross-layer-trace",
        "real-systems-capstone"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "real-systems-method": {
    "id": "real-systems-method",
    "courseId": 75,
    "title": "Método para desmontar sistemas reales",
    "shortTitle": "Método",
    "duration": 125,
    "objective": "Descomponer un sistema existente en capas, contratos, estados y flujos observables antes de sacar conclusiones.",
    "summary": [
      "Un laboratorio de sistemas reales empieza por una pregunta concreta y un mapa de capas; leer código sin hipótesis produce detalle sin comprensión.",
      "Separa interfaz observable, estado persistente, ejecución, dependencias y recursos físicos; después sigue un dato o evento de extremo a extremo.",
      "La explicación final debe distinguir hechos observados, inferencias y supuestos, y debe poder refutarse con una prueba reproducible."
    ],
    "concept": "Un laboratorio de sistemas reales empieza por una pregunta concreta y un mapa de capas; leer código sin hipótesis produce detalle sin comprensión.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Descomponer un sistema existente en capas, contratos, estados y flujos observables antes de sacar conclusiones.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un laboratorio de sistemas reales empieza por una pregunta concreta y un mapa de capas; leer código sin hipótesis produce detalle sin comprensión."
        },
        {
          "title": "Mecánica",
          "body": "Separa interfaz observable, estado persistente, ejecución, dependencias y recursos físicos; después sigue un dato o evento de extremo a extremo."
        },
        {
          "title": "Límites y trade-offs",
          "body": "La explicación final debe distinguir hechos observados, inferencias y supuestos, y debe poder refutarse con una prueba reproducible."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Leer miles de líneas de código sin una pregunta garantiza comprender la arquitectura?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Leer miles de líneas de código sin una pregunta garantiza comprender la arquitectura?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Un laboratorio de sistemas reales empieza por una pregunta concreta y un mapa de capas; leer código sin hipótesis produce detalle sin comprensión."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Leer miles de líneas de código sin una pregunta garantiza comprender la arquitectura?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Método distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Método: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-git-internals": {
    "id": "real-git-internals",
    "courseId": 75,
    "title": "Git: objetos, DAG y packfiles",
    "shortTitle": "Git",
    "duration": 140,
    "objective": "Reconstruir un repositorio Git desde objetos, refs, DAG de commits y almacenamiento empaquetado.",
    "summary": [
      "Git puede entenderse como almacenamiento direccionado por contenido más referencias mutables; los commits conectan trees y padres formando un DAG.",
      "Los blobs no almacenan nombres de archivo; los trees relacionan nombres/modos con objetos, y las refs/HEAD aportan nombres móviles sobre IDs.",
      "Los packfiles cambian la representación física y pueden usar deltas, pero no cambian la identidad lógica de los objetos."
    ],
    "concept": "Git puede entenderse como almacenamiento direccionado por contenido más referencias mutables; los commits conectan trees y padres formando un DAG.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Reconstruir un repositorio Git desde objetos, refs, DAG de commits y almacenamiento empaquetado.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Git puede entenderse como almacenamiento direccionado por contenido más referencias mutables; los commits conectan trees y padres formando un DAG."
        },
        {
          "title": "Mecánica",
          "body": "Los blobs no almacenan nombres de archivo; los trees relacionan nombres/modos con objetos, y las refs/HEAD aportan nombres móviles sobre IDs."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Los packfiles cambian la representación física y pueden usar deltas, pero no cambian la identidad lógica de los objetos."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Un packfile constituye un nuevo tipo lógico de objeto Git?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un packfile constituye un nuevo tipo lógico de objeto Git?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Git puede entenderse como almacenamiento direccionado por contenido más referencias mutables; los commits conectan trees y padres formando un DAG."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un packfile constituye un nuevo tipo lógico de objeto Git?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Git distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Git: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-linux-process": {
    "id": "real-linux-process",
    "courseId": 75,
    "title": "Linux: boot, procesos y kernel",
    "shortTitle": "Linux procesos",
    "duration": 145,
    "objective": "Seguir el arranque y la vida de un proceso desde firmware/bootloader hasta syscalls y scheduling.",
    "summary": [
      "Linux se estudia mejor siguiendo transiciones de privilegio y ownership: firmware→bootloader→kernel→init/user space→procesos.",
      "Un proceso visible en user space se relaciona con estructuras del kernel, mappings, file descriptors, credenciales y estado de scheduling.",
      "/proc expone interfaces a estructuras internas, pero su contenido es una vista del kernel en ejecución, no “archivos normales” persistentes."
    ],
    "concept": "Linux se estudia mejor siguiendo transiciones de privilegio y ownership: firmware→bootloader→kernel→init/user space→procesos.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Seguir el arranque y la vida de un proceso desde firmware/bootloader hasta syscalls y scheduling.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Linux se estudia mejor siguiendo transiciones de privilegio y ownership: firmware→bootloader→kernel→init/user space→procesos."
        },
        {
          "title": "Mecánica",
          "body": "Un proceso visible en user space se relaciona con estructuras del kernel, mappings, file descriptors, credenciales y estado de scheduling."
        },
        {
          "title": "Límites y trade-offs",
          "body": "/proc expone interfaces a estructuras internas, pero su contenido es una vista del kernel en ejecución, no “archivos normales” persistentes."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿/proc es un directorio persistente guardado como archivos ordinarios en disco?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿/proc es un directorio persistente guardado como archivos ordinarios en disco?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Linux se estudia mejor siguiendo transiciones de privilegio y ownership: firmware→bootloader→kernel→init/user space→procesos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿/proc es un directorio persistente guardado como archivos ordinarios en disco?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Linux procesos distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Linux procesos: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-linux-memory-io": {
    "id": "real-linux-memory-io",
    "courseId": 75,
    "title": "Linux: memoria, VFS, drivers y E/S",
    "shortTitle": "Linux memoria/E/S",
    "duration": 150,
    "objective": "Trazar una operación de archivo o dispositivo a través de memoria virtual, VFS, filesystem, page cache y drivers.",
    "summary": [
      "Una llamada read/write puede atravesar VFS, cachés y drivers; la ruta exacta depende de filesystem, flags, caché y dispositivo.",
      "La memoria virtual conecta mappings de proceso, page faults y page cache; VFS ofrece una capa común sobre múltiples filesystems.",
      "Un driver media con hardware mediante mecanismos como MMIO, interrupciones o DMA; no toda E/S implica que la CPU copie cada byte."
    ],
    "concept": "Una llamada read/write puede atravesar VFS, cachés y drivers; la ruta exacta depende de filesystem, flags, caché y dispositivo.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Trazar una operación de archivo o dispositivo a través de memoria virtual, VFS, filesystem, page cache y drivers.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una llamada read/write puede atravesar VFS, cachés y drivers; la ruta exacta depende de filesystem, flags, caché y dispositivo."
        },
        {
          "title": "Mecánica",
          "body": "La memoria virtual conecta mappings de proceso, page faults y page cache; VFS ofrece una capa común sobre múltiples filesystems."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Un driver media con hardware mediante mecanismos como MMIO, interrupciones o DMA; no toda E/S implica que la CPU copie cada byte."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Toda lectura de archivo provoca necesariamente acceso físico inmediato al dispositivo?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Toda lectura de archivo provoca necesariamente acceso físico inmediato al dispositivo?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Una llamada read/write puede atravesar VFS, cachés y drivers; la ruta exacta depende de filesystem, flags, caché y dispositivo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Toda lectura de archivo provoca necesariamente acceso físico inmediato al dispositivo?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Linux memoria/E/S distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Linux memoria/E/S: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-doom-renderer": {
    "id": "real-doom-renderer",
    "courseId": 75,
    "title": "Doom: BSP, renderer y fixed point",
    "shortTitle": "Doom renderer",
    "duration": 145,
    "objective": "Explicar cómo Doom organiza el mundo y acelera visibilidad/render mediante BSP y aritmética adecuada a su época.",
    "summary": [
      "El Doom clásico es un excelente laboratorio porque hace explícitas decisiones de renderer software, BSP y representación numérica bajo restricciones fuertes.",
      "El BSP organiza particiones espaciales y ayuda a recorrer geometría/visibilidad; no debe confundirse con un z-buffer moderno de propósito general.",
      "El uso de fixed point reduce dependencia de floating point costoso/variable en hardware histórico, a cambio de rango y precisión limitados."
    ],
    "concept": "El Doom clásico es un excelente laboratorio porque hace explícitas decisiones de renderer software, BSP y representación numérica bajo restricciones fuertes.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Explicar cómo Doom organiza el mundo y acelera visibilidad/render mediante BSP y aritmética adecuada a su época.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El Doom clásico es un excelente laboratorio porque hace explícitas decisiones de renderer software, BSP y representación numérica bajo restricciones fuertes."
        },
        {
          "title": "Mecánica",
          "body": "El BSP organiza particiones espaciales y ayuda a recorrer geometría/visibilidad; no debe confundirse con un z-buffer moderno de propósito general."
        },
        {
          "title": "Límites y trade-offs",
          "body": "El uso de fixed point reduce dependencia de floating point costoso/variable en hardware histórico, a cambio de rango y precisión limitados."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿El BSP de Doom es simplemente un z-buffer almacenado como árbol?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿El BSP de Doom es simplemente un z-buffer almacenado como árbol?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "El Doom clásico es un excelente laboratorio porque hace explícitas decisiones de renderer software, BSP y representación numérica bajo restricciones fuertes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El BSP de Doom es simplemente un z-buffer almacenado como árbol?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Doom renderer distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Doom renderer: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-doom-data-loop": {
    "id": "real-doom-data-loop",
    "courseId": 75,
    "title": "Doom: WAD, game loop y separación código/datos",
    "shortTitle": "Doom datos",
    "duration": 135,
    "objective": "Relacionar WAD, recursos, lógica de juego y game loop sin confundir motor con contenido.",
    "summary": [
      "El código fuente del motor y los datos WAD son artefactos distintos: el motor interpreta mapas, sprites, sonidos y otros lumps almacenados como datos.",
      "El game loop coordina ticks de simulación, entrada y render; estudiar sus límites muestra por qué determinismo temporal y presentación no son lo mismo.",
      "Modificar datos puede cambiar el juego sin recompilar el motor, mientras cambiar reglas/renderer suele afectar código o ejecutable."
    ],
    "concept": "El código fuente del motor y los datos WAD son artefactos distintos: el motor interpreta mapas, sprites, sonidos y otros lumps almacenados como datos.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Relacionar WAD, recursos, lógica de juego y game loop sin confundir motor con contenido.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El código fuente del motor y los datos WAD son artefactos distintos: el motor interpreta mapas, sprites, sonidos y otros lumps almacenados como datos."
        },
        {
          "title": "Mecánica",
          "body": "El game loop coordina ticks de simulación, entrada y render; estudiar sus límites muestra por qué determinismo temporal y presentación no son lo mismo."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Modificar datos puede cambiar el juego sin recompilar el motor, mientras cambiar reglas/renderer suele afectar código o ejecutable."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿El repositorio abierto del motor de Doom incluye por definición todos los datos comerciales necesarios?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿El repositorio abierto del motor de Doom incluye por definición todos los datos comerciales necesarios?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "El código fuente del motor y los datos WAD son artefactos distintos: el motor interpreta mapas, sprites, sonidos y otros lumps almacenados como datos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El repositorio abierto del motor de Doom incluye por definición todos los datos comerciales necesarios?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Doom datos distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Doom datos: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-godot-architecture": {
    "id": "real-godot-architecture",
    "courseId": 75,
    "title": "Godot: SceneTree, Nodes y Servers",
    "shortTitle": "Godot arquitectura",
    "duration": 140,
    "objective": "Seguir una escena Godot desde Nodes/SceneTree hacia los servers internos de rendering y física.",
    "summary": [
      "La SceneTree organiza la jerarquía de Nodes y escenas; debajo, los Servers implementan subsistemas como rendering, física y audio.",
      "Los Nodes ofrecen una capa de alto nivel; los APIs de servers pueden evitar parte del scene system cuando esa capa es el cuello de botella.",
      "Un nodo de física puede corresponder a un objeto en PhysicsServer; comprender esa traducción evita tratar la escena como representación física única."
    ],
    "concept": "La SceneTree organiza la jerarquía de Nodes y escenas; debajo, los Servers implementan subsistemas como rendering, física y audio.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Seguir una escena Godot desde Nodes/SceneTree hacia los servers internos de rendering y física.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La SceneTree organiza la jerarquía de Nodes y escenas; debajo, los Servers implementan subsistemas como rendering, física y audio."
        },
        {
          "title": "Mecánica",
          "body": "Los Nodes ofrecen una capa de alto nivel; los APIs de servers pueden evitar parte del scene system cuando esa capa es el cuello de botella."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Un nodo de física puede corresponder a un objeto en PhysicsServer; comprender esa traducción evita tratar la escena como representación física única."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿SceneTree y RenderingServer son exactamente la misma capa de abstracción?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿SceneTree y RenderingServer son exactamente la misma capa de abstracción?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "La SceneTree organiza la jerarquía de Nodes y escenas; debajo, los Servers implementan subsistemas como rendering, física y audio."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿SceneTree y RenderingServer son exactamente la misma capa de abstracción?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Godot arquitectura distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Godot arquitectura: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-godot-source": {
    "id": "real-godot-source",
    "courseId": 75,
    "title": "Godot: scripting, profiling y código fuente",
    "shortTitle": "Godot source",
    "duration": 145,
    "objective": "Investigar un comportamiento de Godot desde script/editor hasta profiler, módulo C++ y código fuente relevante.",
    "summary": [
      "GDScript, C#, GDExtension y C++ del motor ocupan fronteras distintas: elegir una exige conocer coste de llamada, portabilidad y acceso a internals.",
      "El profiler ayuda a localizar dónde se consume tiempo; solo después conviene bajar desde la API pública a servers o source code.",
      "Leer el source del motor sirve para confirmar contratos y mecanismos, pero no sustituye medir el caso real ni respetar APIs/versiones."
    ],
    "concept": "GDScript, C#, GDExtension y C++ del motor ocupan fronteras distintas: elegir una exige conocer coste de llamada, portabilidad y acceso a internals.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Investigar un comportamiento de Godot desde script/editor hasta profiler, módulo C++ y código fuente relevante.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "GDScript, C#, GDExtension y C++ del motor ocupan fronteras distintas: elegir una exige conocer coste de llamada, portabilidad y acceso a internals."
        },
        {
          "title": "Mecánica",
          "body": "El profiler ayuda a localizar dónde se consume tiempo; solo después conviene bajar desde la API pública a servers o source code."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Leer el source del motor sirve para confirmar contratos y mecanismos, pero no sustituye medir el caso real ni respetar APIs/versiones."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Usar directamente un Server de Godot garantiza siempre mejor rendimiento?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Usar directamente un Server de Godot garantiza siempre mejor rendimiento?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "GDScript, C#, GDExtension y C++ del motor ocupan fronteras distintas: elegir una exige conocer coste de llamada, portabilidad y acceso a internals."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Usar directamente un Server de Godot garantiza siempre mejor rendimiento?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Godot source distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Godot source: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-blender-geometry": {
    "id": "real-blender-geometry",
    "courseId": 75,
    "title": "Blender: geometría, meshes y modifiers",
    "shortTitle": "Blender geometría",
    "duration": 140,
    "objective": "Rastrear cómo Blender representa y transforma geometría mediante meshes, conectividad y modifiers.",
    "summary": [
      "Un mesh combina datos geométricos/topológicos con objetos y transformaciones; la representación editable no es idéntica a la malla evaluada final.",
      "Los modifiers forman una cadena de evaluación no destructiva hasta que se aplican; BMesh expone una API interna orientada a conectividad y edición.",
      "La geometría visible puede depender de modifiers, instancias, dependencias y estado de evaluación; exportar exige decidir qué representación se quiere."
    ],
    "concept": "Un mesh combina datos geométricos/topológicos con objetos y transformaciones; la representación editable no es idéntica a la malla evaluada final.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Rastrear cómo Blender representa y transforma geometría mediante meshes, conectividad y modifiers.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un mesh combina datos geométricos/topológicos con objetos y transformaciones; la representación editable no es idéntica a la malla evaluada final."
        },
        {
          "title": "Mecánica",
          "body": "Los modifiers forman una cadena de evaluación no destructiva hasta que se aplican; BMesh expone una API interna orientada a conectividad y edición."
        },
        {
          "title": "Límites y trade-offs",
          "body": "La geometría visible puede depender de modifiers, instancias, dependencias y estado de evaluación; exportar exige decidir qué representación se quiere."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿La malla base almacenada siempre coincide byte por byte con la geometría renderizada?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿La malla base almacenada siempre coincide byte por byte con la geometría renderizada?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Un mesh combina datos geométricos/topológicos con objetos y transformaciones; la representación editable no es idéntica a la malla evaluada final."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La malla base almacenada siempre coincide byte por byte con la geometría renderizada?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Blender geometría distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Blender geometría: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-blender-render": {
    "id": "real-blender-render",
    "courseId": 75,
    "title": "Blender: Cycles, GPU y Python API",
    "shortTitle": "Blender render",
    "duration": 145,
    "objective": "Relacionar escena, motor de render, backend de cómputo y automatización con Python en Blender.",
    "summary": [
      "Cycles puede ejecutar render en CPU o backends GPU compatibles; el backend disponible depende de hardware, build y configuración.",
      "La Python API permite automatizar escenas y datos, pero no toda funcionalidad de bajo nivel se expone con el mismo coste o capacidad que C/C++.",
      "Un render lento puede estar limitado por kernels, memoria, transferencia, geometría o shaders; “usar GPU” no identifica por sí solo el cuello de botella."
    ],
    "concept": "Cycles puede ejecutar render en CPU o backends GPU compatibles; el backend disponible depende de hardware, build y configuración.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Relacionar escena, motor de render, backend de cómputo y automatización con Python en Blender.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Cycles puede ejecutar render en CPU o backends GPU compatibles; el backend disponible depende de hardware, build y configuración."
        },
        {
          "title": "Mecánica",
          "body": "La Python API permite automatizar escenas y datos, pero no toda funcionalidad de bajo nivel se expone con el mismo coste o capacidad que C/C++."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Un render lento puede estar limitado por kernels, memoria, transferencia, geometría o shaders; “usar GPU” no identifica por sí solo el cuello de botella."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Seleccionar GPU implica automáticamente que todo el pipeline de Blender se ejecute exclusivamente en GPU?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Seleccionar GPU implica automáticamente que todo el pipeline de Blender se ejecute exclusivamente en GPU?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Cycles puede ejecutar render en CPU o backends GPU compatibles; el backend disponible depende de hardware, build y configuración."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Seleccionar GPU implica automáticamente que todo el pipeline de Blender se ejecute exclusivamente en GPU?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Blender render distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Blender render: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-ssd-ftl": {
    "id": "real-ssd-ftl",
    "courseId": 75,
    "title": "SSD: NAND, controller y FTL",
    "shortTitle": "SSD FTL",
    "duration": 145,
    "objective": "Seguir una escritura lógica desde el host hasta páginas NAND mediante controller y Flash Translation Layer.",
    "summary": [
      "El host ve bloques lógicos; el SSD debe mapearlos a ubicaciones físicas NAND mediante una FTL administrada por el controller.",
      "NAND suele programarse por páginas y borrarse en unidades mayores, por lo que las actualizaciones in-place no funcionan como en RAM.",
      "Garbage collection y over-provisioning aparecen porque liberar espacio físico requiere mover datos válidos y borrar bloques."
    ],
    "concept": "El host ve bloques lógicos; el SSD debe mapearlos a ubicaciones físicas NAND mediante una FTL administrada por el controller.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Seguir una escritura lógica desde el host hasta páginas NAND mediante controller y Flash Translation Layer.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El host ve bloques lógicos; el SSD debe mapearlos a ubicaciones físicas NAND mediante una FTL administrada por el controller."
        },
        {
          "title": "Mecánica",
          "body": "NAND suele programarse por páginas y borrarse en unidades mayores, por lo que las actualizaciones in-place no funcionan como en RAM."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Garbage collection y over-provisioning aparecen porque liberar espacio físico requiere mover datos válidos y borrar bloques."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Un LBA del host identifica permanentemente una página NAND física concreta?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un LBA del host identifica permanentemente una página NAND física concreta?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "El host ve bloques lógicos; el SSD debe mapearlos a ubicaciones físicas NAND mediante una FTL administrada por el controller."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un LBA del host identifica permanentemente una página NAND física concreta?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de SSD FTL distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre SSD FTL: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-ssd-endurance": {
    "id": "real-ssd-endurance",
    "courseId": 75,
    "title": "SSD: wear leveling, ECC y pérdida de energía",
    "shortTitle": "SSD fiabilidad",
    "duration": 140,
    "objective": "Explicar endurance y fiabilidad del SSD mediante wear leveling, ECC, garbage collection y protección frente a power loss.",
    "summary": [
      "Las celdas NAND soportan ciclos finitos de program/erase; wear leveling distribuye desgaste para evitar agotar prematuramente zonas calientes.",
      "ECC detecta/corrige errores dentro de su capacidad, pero no convierte el medio en infalible; la retención y el desgaste siguen importando.",
      "Caches volátiles pueden mejorar rendimiento, pero sin power-loss protection exigen razonar cuidadosamente sobre qué significa “persistido”."
    ],
    "concept": "Las celdas NAND soportan ciclos finitos de program/erase; wear leveling distribuye desgaste para evitar agotar prematuramente zonas calientes.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Explicar endurance y fiabilidad del SSD mediante wear leveling, ECC, garbage collection y protección frente a power loss.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Las celdas NAND soportan ciclos finitos de program/erase; wear leveling distribuye desgaste para evitar agotar prematuramente zonas calientes."
        },
        {
          "title": "Mecánica",
          "body": "ECC detecta/corrige errores dentro de su capacidad, pero no convierte el medio en infalible; la retención y el desgaste siguen importando."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Caches volátiles pueden mejorar rendimiento, pero sin power-loss protection exigen razonar cuidadosamente sobre qué significa “persistido”."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Wear leveling elimina el desgaste físico de NAND?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Wear leveling elimina el desgaste físico de NAND?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Las celdas NAND soportan ciclos finitos de program/erase; wear leveling distribuye desgaste para evitar agotar prematuramente zonas calientes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Wear leveling elimina el desgaste físico de NAND?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de SSD fiabilidad distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre SSD fiabilidad: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-gpu-pipeline": {
    "id": "real-gpu-pipeline",
    "courseId": 75,
    "title": "GPU: pipeline, rasterización y SIMT",
    "shortTitle": "GPU pipeline",
    "duration": 145,
    "objective": "Conectar draw/dispatch con front-end, rasterización, grupos de ejecución SIMT y unidades de cómputo.",
    "summary": [
      "Una GPU combina hardware especializado de gráficos con ejecución programable masivamente paralela; rasterización y compute comparten recursos pero no son la misma etapa.",
      "SIMT ejecuta grupos de threads de forma coordinada; divergencia de control puede serializar caminos dentro del grupo y reducir eficiencia.",
      "La ocupación es un medio para ocultar latencia, no una meta absoluta; más occupancy no garantiza un kernel más rápido."
    ],
    "concept": "Una GPU combina hardware especializado de gráficos con ejecución programable masivamente paralela; rasterización y compute comparten recursos pero no son la misma etapa.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Conectar draw/dispatch con front-end, rasterización, grupos de ejecución SIMT y unidades de cómputo.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una GPU combina hardware especializado de gráficos con ejecución programable masivamente paralela; rasterización y compute comparten recursos pero no son la misma etapa."
        },
        {
          "title": "Mecánica",
          "body": "SIMT ejecuta grupos de threads de forma coordinada; divergencia de control puede serializar caminos dentro del grupo y reducir eficiencia."
        },
        {
          "title": "Límites y trade-offs",
          "body": "La ocupación es un medio para ocultar latencia, no una meta absoluta; más occupancy no garantiza un kernel más rápido."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Duplicar occupancy garantiza duplicar throughput de un kernel?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Duplicar occupancy garantiza duplicar throughput de un kernel?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Una GPU combina hardware especializado de gráficos con ejecución programable masivamente paralela; rasterización y compute comparten recursos pero no son la misma etapa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Duplicar occupancy garantiza duplicar throughput de un kernel?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de GPU pipeline distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre GPU pipeline: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-gpu-memory": {
    "id": "real-gpu-memory",
    "courseId": 75,
    "title": "GPU: jerarquía de memoria y compute",
    "shortTitle": "GPU memoria",
    "duration": 145,
    "objective": "Analizar un kernel desde accesos globales hasta caches/shared memory/registers y sincronización.",
    "summary": [
      "El rendimiento GPU depende tanto del movimiento de datos como de FLOPs: coalescing, reuse y tiling buscan aumentar trabajo útil por byte movido.",
      "Registers y shared memory son recursos finitos por bloque/SM; aumentar su uso puede reducir concurrencia residente.",
      "La sincronización tiene ámbito y coste; una barrera dentro de un bloque no sincroniza por defecto todos los bloques de un grid."
    ],
    "concept": "El rendimiento GPU depende tanto del movimiento de datos como de FLOPs: coalescing, reuse y tiling buscan aumentar trabajo útil por byte movido.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Analizar un kernel desde accesos globales hasta caches/shared memory/registers y sincronización.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El rendimiento GPU depende tanto del movimiento de datos como de FLOPs: coalescing, reuse y tiling buscan aumentar trabajo útil por byte movido."
        },
        {
          "title": "Mecánica",
          "body": "Registers y shared memory son recursos finitos por bloque/SM; aumentar su uso puede reducir concurrencia residente."
        },
        {
          "title": "Límites y trade-offs",
          "body": "La sincronización tiene ámbito y coste; una barrera dentro de un bloque no sincroniza por defecto todos los bloques de un grid."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Shared memory es simplemente una caché global automática gestionada igual que L2?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Shared memory es simplemente una caché global automática gestionada igual que L2?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "El rendimiento GPU depende tanto del movimiento de datos como de FLOPs: coalescing, reuse y tiling buscan aumentar trabajo útil por byte movido."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Shared memory es simplemente una caché global automática gestionada igual que L2?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de GPU memoria distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre GPU memoria: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-internet-path": {
    "id": "real-internet-path",
    "courseId": 75,
    "title": "Internet: del cable al routing global",
    "shortTitle": "Internet routing",
    "duration": 150,
    "objective": "Seguir un paquete desde el enlace local hasta ISP, routers, sistemas autónomos, BGP y destino.",
    "summary": [
      "Internet es una interconexión de redes: Ethernet/Wi‑Fi resuelve el enlace local, IP direcciona/rutea paquetes y BGP intercambia reachability entre AS.",
      "La ruta real depende de políticas, peering, transit y cambios de topología; “camino más corto” no es una definición suficiente de routing global.",
      "DNS ayuda a localizar servicios, pero resolver un nombre no determina toda la ruta de red que seguirán los paquetes."
    ],
    "concept": "Internet es una interconexión de redes: Ethernet/Wi‑Fi resuelve el enlace local, IP direcciona/rutea paquetes y BGP intercambia reachability entre AS.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Seguir un paquete desde el enlace local hasta ISP, routers, sistemas autónomos, BGP y destino.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Internet es una interconexión de redes: Ethernet/Wi‑Fi resuelve el enlace local, IP direcciona/rutea paquetes y BGP intercambia reachability entre AS."
        },
        {
          "title": "Mecánica",
          "body": "La ruta real depende de políticas, peering, transit y cambios de topología; “camino más corto” no es una definición suficiente de routing global."
        },
        {
          "title": "Límites y trade-offs",
          "body": "DNS ayuda a localizar servicios, pero resolver un nombre no determina toda la ruta de red que seguirán los paquetes."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿BGP elige necesariamente el camino con menos routers físicos?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿BGP elige necesariamente el camino con menos routers físicos?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Internet es una interconexión de redes: Ethernet/Wi‑Fi resuelve el enlace local, IP direcciona/rutea paquetes y BGP intercambia reachability entre AS."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿BGP elige necesariamente el camino con menos routers físicos?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Internet routing distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Internet routing: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-internet-stack": {
    "id": "real-internet-stack",
    "courseId": 75,
    "title": "Internet: DNS, TCP/QUIC, TLS, HTTP y CDN",
    "shortTitle": "Internet stack",
    "duration": 155,
    "objective": "Reconstruir una petición web desde resolución DNS hasta transporte, seguridad, HTTP y entrega por CDN.",
    "summary": [
      "Una visita web puede implicar DNS, establecimiento de transporte, criptografía TLS y protocolo HTTP antes de recibir contenido de origen o edge.",
      "TCP proporciona un byte stream fiable; QUIC integra transporte fiable/multiplexado sobre UDP y TLS, pero ambos siguen sujetos a pérdida, RTT y congestión.",
      "Una CDN acerca/copía contenido y termina conexiones en edges según diseño; no convierte automáticamente todo recurso en cache hit ni elimina el origen."
    ],
    "concept": "Una visita web puede implicar DNS, establecimiento de transporte, criptografía TLS y protocolo HTTP antes de recibir contenido de origen o edge.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Reconstruir una petición web desde resolución DNS hasta transporte, seguridad, HTTP y entrega por CDN.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una visita web puede implicar DNS, establecimiento de transporte, criptografía TLS y protocolo HTTP antes de recibir contenido de origen o edge."
        },
        {
          "title": "Mecánica",
          "body": "TCP proporciona un byte stream fiable; QUIC integra transporte fiable/multiplexado sobre UDP y TLS, pero ambos siguen sujetos a pérdida, RTT y congestión."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Una CDN acerca/copía contenido y termina conexiones en edges según diseño; no convierte automáticamente todo recurso en cache hit ni elimina el origen."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿HTTPS evita la necesidad de DNS y routing IP?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿HTTPS evita la necesidad de DNS y routing IP?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Una visita web puede implicar DNS, establecimiento de transporte, criptografía TLS y protocolo HTTP antes de recibir contenido de origen o edge."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿HTTPS evita la necesidad de DNS y routing IP?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Internet stack distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Internet stack: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-console-stack": {
    "id": "real-console-stack",
    "courseId": 75,
    "title": "Consolas: hardware, OS, APIs y optimización",
    "shortTitle": "Consolas",
    "duration": 150,
    "objective": "Analizar una consola como stack integrado de CPU, GPU, memoria, sistema operativo, APIs y restricciones de plataforma.",
    "summary": [
      "Una consola fija un target de hardware mucho más estable que el PC, pero el rendimiento depende de budgets, APIs, scheduling y diseño del engine.",
      "Memoria compartida/unificada no significa coste cero ni ancho de banda infinito; CPU y GPU pueden competir por recursos y locality.",
      "Las APIs de plataforma y el OS median acceso a hardware, almacenamiento, input, red y servicios; “programar la consola” no equivale a bare metal."
    ],
    "concept": "Una consola fija un target de hardware mucho más estable que el PC, pero el rendimiento depende de budgets, APIs, scheduling y diseño del engine.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Analizar una consola como stack integrado de CPU, GPU, memoria, sistema operativo, APIs y restricciones de plataforma.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una consola fija un target de hardware mucho más estable que el PC, pero el rendimiento depende de budgets, APIs, scheduling y diseño del engine."
        },
        {
          "title": "Mecánica",
          "body": "Memoria compartida/unificada no significa coste cero ni ancho de banda infinito; CPU y GPU pueden competir por recursos y locality."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Las APIs de plataforma y el OS median acceso a hardware, almacenamiento, input, red y servicios; “programar la consola” no equivale a bare metal."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Hardware fijo elimina la necesidad de profiling y presupuestos de frame?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Hardware fijo elimina la necesidad de profiling y presupuestos de frame?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Una consola fija un target de hardware mucho más estable que el PC, pero el rendimiento depende de budgets, APIs, scheduling y diseño del engine."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Hardware fijo elimina la necesidad de profiling y presupuestos de frame?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Consolas distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Consolas: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-llm-transformer": {
    "id": "real-llm-transformer",
    "courseId": 75,
    "title": "LLM: tokens, embeddings, transformer y attention",
    "shortTitle": "LLM arquitectura",
    "duration": 150,
    "objective": "Trazar texto hasta tokens, embeddings y operaciones de attention/MLP dentro de un transformer.",
    "summary": [
      "El texto se tokeniza en IDs que indexan representaciones; las capas transformer transforman estados mediante attention, MLPs, residuales y normalización.",
      "Attention calcula relaciones dependientes del contexto, pero no es una base de datos de hechos ni una memoria simbólica separada del modelo.",
      "El coste y la memoria dependen de longitud de contexto, dimensiones, capas, batch y estrategia de atención/serving."
    ],
    "concept": "El texto se tokeniza en IDs que indexan representaciones; las capas transformer transforman estados mediante attention, MLPs, residuales y normalización.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Trazar texto hasta tokens, embeddings y operaciones de attention/MLP dentro de un transformer.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El texto se tokeniza en IDs que indexan representaciones; las capas transformer transforman estados mediante attention, MLPs, residuales y normalización."
        },
        {
          "title": "Mecánica",
          "body": "Attention calcula relaciones dependientes del contexto, pero no es una base de datos de hechos ni una memoria simbólica separada del modelo."
        },
        {
          "title": "Límites y trade-offs",
          "body": "El coste y la memoria dependen de longitud de contexto, dimensiones, capas, batch y estrategia de atención/serving."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Un token corresponde necesariamente a una palabra humana completa?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Un token corresponde necesariamente a una palabra humana completa?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "El texto se tokeniza en IDs que indexan representaciones; las capas transformer transforman estados mediante attention, MLPs, residuales y normalización."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un token corresponde necesariamente a una palabra humana completa?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de LLM arquitectura distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre LLM arquitectura: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-llm-systems": {
    "id": "real-llm-systems",
    "courseId": 75,
    "title": "LLM: training, inference, GPUs y quantization",
    "shortTitle": "LLM sistemas",
    "duration": 155,
    "objective": "Relacionar entrenamiento e inferencia de LLMs con GPUs, paralelismo distribuido, KV cache, quantization y sampling.",
    "summary": [
      "Training actualiza parámetros a partir de batches y gradientes; inference usa parámetros ya aprendidos y genera tokens según una política de decoding.",
      "Data/tensor/pipeline parallelism reparten trabajo de formas distintas y añaden comunicación; más GPUs no implican escalado lineal.",
      "Quantization reduce representación numérica y a menudo memoria/bandwidth, pero calidad y speedup dependen de formato, kernels y hardware; sampling afecta salidas, no conocimientos almacenados."
    ],
    "concept": "Training actualiza parámetros a partir de batches y gradientes; inference usa parámetros ya aprendidos y genera tokens según una política de decoding.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Relacionar entrenamiento e inferencia de LLMs con GPUs, paralelismo distribuido, KV cache, quantization y sampling.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Training actualiza parámetros a partir de batches y gradientes; inference usa parámetros ya aprendidos y genera tokens según una política de decoding."
        },
        {
          "title": "Mecánica",
          "body": "Data/tensor/pipeline parallelism reparten trabajo de formas distintas y añaden comunicación; más GPUs no implican escalado lineal."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Quantization reduce representación numérica y a menudo memoria/bandwidth, pero calidad y speedup dependen de formato, kernels y hardware; sampling afecta salidas, no conocimientos almacenados."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Bajar de FP16 a int8 garantiza exactamente 2× de velocidad end-to-end?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Bajar de FP16 a int8 garantiza exactamente 2× de velocidad end-to-end?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "Training actualiza parámetros a partir de batches y gradientes; inference usa parámetros ya aprendidos y genera tokens según una política de decoding."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Bajar de FP16 a int8 garantiza exactamente 2× de velocidad end-to-end?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de LLM sistemas distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre LLM sistemas: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-cross-layer-trace": {
    "id": "real-cross-layer-trace",
    "courseId": 75,
    "title": "Trazado vertical: de una acción al hardware",
    "shortTitle": "Trazado vertical",
    "duration": 150,
    "objective": "Practicar el recorrido reversible aplicación→runtime→OS→drivers→hardware y vuelta.",
    "summary": [
      "La comprensión vertical consiste en explicar qué frontera atraviesa un evento y qué representación adopta en cada capa.",
      "Una acción como cargar una textura puede implicar formato de archivo, syscalls, page cache, almacenamiento, descompresión, driver, transferencia y memoria GPU.",
      "No todas las capas participan siempre ni en el mismo orden; el objetivo es demostrar el camino observado, no recitar una pila fija."
    ],
    "concept": "La comprensión vertical consiste en explicar qué frontera atraviesa un evento y qué representación adopta en cada capa.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Practicar el recorrido reversible aplicación→runtime→OS→drivers→hardware y vuelta.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La comprensión vertical consiste en explicar qué frontera atraviesa un evento y qué representación adopta en cada capa."
        },
        {
          "title": "Mecánica",
          "body": "Una acción como cargar una textura puede implicar formato de archivo, syscalls, page cache, almacenamiento, descompresión, driver, transferencia y memoria GPU."
        },
        {
          "title": "Límites y trade-offs",
          "body": "No todas las capas participan siempre ni en el mismo orden; el objetivo es demostrar el camino observado, no recitar una pila fija."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Toda operación de una aplicación atraviesa exactamente la misma secuencia de capas?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Toda operación de una aplicación atraviesa exactamente la misma secuencia de capas?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "La comprensión vertical consiste en explicar qué frontera atraviesa un evento y qué representación adopta en cada capa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Toda operación de una aplicación atraviesa exactamente la misma secuencia de capas?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Trazado vertical distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Trazado vertical: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  },
  "real-systems-capstone": {
    "id": "real-systems-capstone",
    "courseId": 75,
    "title": "Proyecto: autopsia reproducible de un sistema real",
    "shortTitle": "Proyecto laboratorio",
    "duration": 180,
    "objective": "Realizar una autopsia técnica reproducible de un sistema, conectando código, ejecución, almacenamiento, red y hardware con evidencia.",
    "summary": [
      "El proyecto final del laboratorio debe partir de una pregunta falsable y terminar con un mapa causal respaldado por traces, perfiles, dumps, código o experimentos.",
      "Incluye al menos tres capas y una medición que conecte síntomas de alto nivel con un mecanismo inferior.",
      "Documenta versiones, comandos, datasets, hashes y límites de la investigación para que otra persona pueda repetirla y distinguir observación de inferencia."
    ],
    "concept": "El proyecto final del laboratorio debe partir de una pregunta falsable y terminar con un mapa causal respaldado por traces, perfiles, dumps, código o experimentos.",
    "rules": [
      "Empieza por una pregunta falsable y conserva versiones, entradas y condiciones del experimento.",
      "Distingue interfaz, representación, mecanismo y evidencia; no conviertas una inferencia plausible en un hecho observado.",
      "Sigue al menos un dato o evento entre capas y valida el mecanismo con código, documentación o instrumentación."
    ],
    "deep": {
      "intro": "Realizar una autopsia técnica reproducible de un sistema, conectando código, ejecución, almacenamiento, red y hardware con evidencia.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El proyecto final del laboratorio debe partir de una pregunta falsable y terminar con un mapa causal respaldado por traces, perfiles, dumps, código o experimentos."
        },
        {
          "title": "Mecánica",
          "body": "Incluye al menos tres capas y una medición que conecte síntomas de alto nivel con un mecanismo inferior."
        },
        {
          "title": "Límites y trade-offs",
          "body": "Documenta versiones, comandos, datasets, hashes y límites de la investigación para que otra persona pueda repetirla y distinguir observación de inferencia."
        },
        {
          "title": "Laboratorio",
          "body": "Formula una hipótesis concreta, identifica una señal observable y diseña un experimento pequeño que pueda refutar tu explicación. Registra versiones, comandos, entradas y resultados para que otra persona pueda repetirlo."
        }
      ]
    },
    "example": {
      "problem": "¿Una explicación elegante sin evidencia reproducible basta para cerrar una autopsia técnica?",
      "steps": [
        "Identifica la frontera de abstracción que hace relevante la pregunta.",
        "Busca una observación o experimento que distinga entre las explicaciones posibles."
      ],
      "solution": "no"
    },
    "check": {
      "question": "¿Una explicación elegante sin evidencia reproducible basta para cerrar una autopsia técnica?",
      "options": [
        [
          "Sí",
          false
        ],
        [
          "No",
          true
        ],
        [
          "Depende, pero sin evidencia no puede afirmarse",
          false
        ]
      ],
      "feedback": "El proyecto final del laboratorio debe partir de una pregunta falsable y terminar con un mapa causal respaldado por traces, perfiles, dumps, código o experimentos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una explicación elegante sin evidencia reproducible basta para cerrar una autopsia técnica?",
        "answer": "no",
        "hint": "Razona desde la arquitectura y no desde una analogía superficial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Explica el mecanismo central de Proyecto laboratorio distinguiendo al menos dos capas o representaciones.",
        "answer": "capas",
        "hint": "Nombra la interfaz visible y el mecanismo inferior."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Diseña un experimento reproducible sobre Proyecto laboratorio: hipótesis, instrumento, observación esperada y resultado que la refutaría.",
        "answer": "experimento",
        "hint": "Debe poder fallar tu hipótesis, no solo confirmarla."
      }
    ]
  }
});
