/**
 * BLOQUE 026 — Ingeniería inversa
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar observación, inferencia y validación. Disassembly,
 * decompilation e IR son representaciones; ninguna reconstruye por decreto el
 * fuente original. Los ejercicios usan binarios propios o autorizados.
 */
window.LEARNING_PATHS[26] = {
  "level": "Experto progresivo",
  "estimatedHours": 112,
  "description": "Ingeniería inversa reproducible de binarios y firmware: representación, recuperación de control/data-flow, ABI, decompilation, transformación y validación dinámica en artefactos propios o autorizados.",
  "outcomes": [
    "Distinguir bytes, instrucciones, IR, decompilation y fuente, asignando confianza explícita a cada representación.",
    "Recuperar control-flow, data-flow, prototipos y estructuras usando ABI, xrefs, múltiples call sites y validación dinámica.",
    "Analizar binarios stripped, packed/ofuscados y firmware sin confundir indicios heurísticos con conclusiones.",
    "Documentar un reverse engineering reproducible separando hechos, inferencias y limitaciones."
  ],
  "modules": [
    {
      "id": "m1-representations",
      "title": "Representaciones y herramientas",
      "description": "Assembly, disassembly, decompilers y workflows",
      "lessons": [
        "re-assembly-advanced",
        "re-disassembly-decompilation",
        "re-ghidra-workflow",
        "re-tools-conceptual"
      ]
    },
    {
      "id": "m2-analysis",
      "title": "Control, datos y ABI",
      "description": "CFG, data-flow y calling conventions",
      "lessons": [
        "re-control-flow",
        "re-data-flow",
        "re-calling-conventions"
      ]
    },
    {
      "id": "m3-recovery",
      "title": "Recuperación bajo pérdida y transformación",
      "description": "Optimización, stripping, packing y anti-analysis",
      "lessons": [
        "re-compiler-patterns",
        "re-stripped-binaries",
        "re-packers-obfuscation",
        "re-antidebug"
      ]
    },
    {
      "id": "m4-firmware-validation",
      "title": "Firmware y validación",
      "description": "Hardware, análisis dinámico y proyecto",
      "lessons": [
        "re-firmware",
        "re-validation",
        "re-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "re-assembly-advanced": {
    "id": "re-assembly-advanced",
    "courseId": 26,
    "title": "Assembly avanzado para reversing",
    "shortTitle": "Assembly avanzado para reversing",
    "duration": 105,
    "objective": "reconstruir intención desde instrucciones, ABI y efectos observables sin suponer que el desensamblado conserva el fuente original.",
    "summary": [
      "La unidad de análisis es el efecto sobre estado, no el nombre mnemónico aislado.",
      "Prologue/epilogue son patrones de compilador, no contratos universales.",
      "Optimización puede borrar variables, fusionar bloques e introducir idioms."
    ],
    "concept": "La unidad de análisis es el efecto sobre estado, no el nombre mnemónico aislado. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "ABI, registros volátiles/no volátiles y stack alignment permiten recuperar contratos de llamada.",
      "Idioms como test/xor/lea deben interpretarse por semántica, no por traducción literal a C.",
      "Control-flow indirecto y tail calls requieren comprobar targets y contexto."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La unidad de análisis es el efecto sobre estado, no el nombre mnemónico aislado. ABI, registros volátiles/no volátiles y stack alignment permiten recuperar contratos de llamada."
        },
        {
          "title": "Análisis experto",
          "body": "Prologue/epilogue son patrones de compilador, no contratos universales. Idioms como test/xor/lea deben interpretarse por semántica, no por traducción literal a C. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Optimización puede borrar variables, fusionar bloques e introducir idioms. Control-flow indirecto y tail calls requieren comprobar targets y contexto. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-disassembly-decompilation": {
    "id": "re-disassembly-decompilation",
    "courseId": 26,
    "title": "Disassembly, lifting y decompilation",
    "shortTitle": "Disassembly, lifting y decompilation",
    "duration": 105,
    "objective": "distinguir bytes, instrucciones, IR y pseudocódigo decompilado y evaluar la confianza de cada capa.",
    "summary": [
      "Disassembler decodifica instrucciones; decompiler reconstruye una representación de más alto nivel.",
      "Una decompilación es una hipótesis útil, no el código fuente perdido.",
      "Tipos y nombres recuperados pueden ser inferidos y corregibles."
    ],
    "concept": "Disassembler decodifica instrucciones; decompiler reconstruye una representación de más alto nivel. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "El mismo byte stream puede ser ambiguo si arquitectura/modo/base son incorrectos.",
      "Lifting a IR facilita data-flow y simplificación antes del pseudocódigo.",
      "Renombrar y re-tipar interactivamente mejora análisis porque alimenta inferencias posteriores."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Disassembler decodifica instrucciones; decompiler reconstruye una representación de más alto nivel. El mismo byte stream puede ser ambiguo si arquitectura/modo/base son incorrectos."
        },
        {
          "title": "Análisis experto",
          "body": "Una decompilación es una hipótesis útil, no el código fuente perdido. Lifting a IR facilita data-flow y simplificación antes del pseudocódigo. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Tipos y nombres recuperados pueden ser inferidos y corregibles. Renombrar y re-tipar interactivamente mejora análisis porque alimenta inferencias posteriores. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-ghidra-workflow": {
    "id": "re-ghidra-workflow",
    "courseId": 26,
    "title": "Ghidra: workflow de análisis reproducible",
    "shortTitle": "Ghidra: workflow de análisis reproducible",
    "duration": 105,
    "objective": "usar Ghidra de forma sistemática para importar, analizar, anotar y validar hipótesis sobre binarios propios o autorizados.",
    "summary": [
      "Importar con formato/arquitectura correctos es una precondición de todo análisis posterior.",
      "Auto-analysis crea hipótesis que deben revisarse, no verdades reveladas.",
      "Bookmarks, labels, types y comments deben registrar evidencia y dudas."
    ],
    "concept": "Importar con formato/arquitectura correctos es una precondición de todo análisis posterior. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "Program Tree, Symbol Tree, Function Graph y Decompiler son vistas complementarias del mismo programa.",
      "Scripts/headless analysis ayudan a hacer análisis repetible a escala.",
      "Una buena sesión conserva qué cambió el analista respecto al análisis automático."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Importar con formato/arquitectura correctos es una precondición de todo análisis posterior. Program Tree, Symbol Tree, Function Graph y Decompiler son vistas complementarias del mismo programa."
        },
        {
          "title": "Análisis experto",
          "body": "Auto-analysis crea hipótesis que deben revisarse, no verdades reveladas. Scripts/headless analysis ayudan a hacer análisis repetible a escala. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Bookmarks, labels, types y comments deben registrar evidencia y dudas. Una buena sesión conserva qué cambió el analista respecto al análisis automático. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-tools-conceptual": {
    "id": "re-tools-conceptual",
    "courseId": 26,
    "title": "IDA y Binary Ninja: modelos conceptuales comparados",
    "shortTitle": "IDA y Binary Ninja: modelos conceptuales comparados",
    "duration": 105,
    "objective": "comparar herramientas de reversing por sus abstracciones sin convertir una interfaz concreta en teoría universal.",
    "summary": [
      "Todas separan de algún modo bytes, instrucciones, funciones, referencias y representaciones intermedias.",
      "UI diferente no implica semántica diferente del binario.",
      "Los resultados de análisis automático dependen de heurísticas, firmas y tipos disponibles."
    ],
    "concept": "Todas separan de algún modo bytes, instrucciones, funciones, referencias y representaciones intermedias. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "El criterio útil es qué evidencia produce una herramienta y cómo se valida.",
      "IRs como p-code/MLIL/HLIL permiten distintas preguntas de análisis.",
      "Cross-check entre herramientas puede descubrir supuestos erróneos, no decidir por mayoría."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Todas separan de algún modo bytes, instrucciones, funciones, referencias y representaciones intermedias. El criterio útil es qué evidencia produce una herramienta y cómo se valida."
        },
        {
          "title": "Análisis experto",
          "body": "UI diferente no implica semántica diferente del binario. IRs como p-code/MLIL/HLIL permiten distintas preguntas de análisis. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Los resultados de análisis automático dependen de heurísticas, firmas y tipos disponibles. Cross-check entre herramientas puede descubrir supuestos erróneos, no decidir por mayoría. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-control-flow": {
    "id": "re-control-flow",
    "courseId": 26,
    "title": "Control-flow recovery y CFG",
    "shortTitle": "Control-flow recovery y CFG",
    "duration": 105,
    "objective": "reconstruir funciones y grafos de control entendiendo por qué indirect jumps, tail calls y jump tables complican el análisis.",
    "summary": [
      "CFG modela bloques básicos y transferencias posibles, no necesariamente todas las ejecuciones reales.",
      "Indirect branches requieren resolver targets de forma conservadora o asistida.",
      "Exception handling y tail calls pueden romper patrones ingenuos de funciones."
    ],
    "concept": "CFG modela bloques básicos y transferencias posibles, no necesariamente todas las ejecuciones reales. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "Basic block termina ante transferencia de control o target entrante relevante.",
      "CFG recovery estático puede perder targets o incluir edges espurias.",
      "Dominadores, loops y post-dominadores ayudan a razonar sobre estructura."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "CFG modela bloques básicos y transferencias posibles, no necesariamente todas las ejecuciones reales. Basic block termina ante transferencia de control o target entrante relevante."
        },
        {
          "title": "Análisis experto",
          "body": "Indirect branches requieren resolver targets de forma conservadora o asistida. CFG recovery estático puede perder targets o incluir edges espurias. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Exception handling y tail calls pueden romper patrones ingenuos de funciones. Dominadores, loops y post-dominadores ayudan a razonar sobre estructura. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-data-flow": {
    "id": "re-data-flow",
    "courseId": 26,
    "title": "Data-flow, def-use y slicing",
    "shortTitle": "Data-flow, def-use y slicing",
    "duration": 105,
    "objective": "seguir cómo se producen, transforman y consumen valores para responder preguntas causales sobre el binario.",
    "summary": [
      "Control-flow responde por dónde puede pasar; data-flow responde qué valores pueden llegar.",
      "Def-use chains y SSA ayudan a reducir ruido de registros reutilizados.",
      "Un slice depende de la pregunta: backward para causas, forward para consecuencias."
    ],
    "concept": "Control-flow responde por dónde puede pasar; data-flow responde qué valores pueden llegar. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "Aliasing y memoria indirecta hacen el data-flow más difícil que el de registros.",
      "Const propagation y range analysis pueden revelar invariantes.",
      "La precisión siempre negocia coste, soundness y false positives."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Control-flow responde por dónde puede pasar; data-flow responde qué valores pueden llegar. Aliasing y memoria indirecta hacen el data-flow más difícil que el de registros."
        },
        {
          "title": "Análisis experto",
          "body": "Def-use chains y SSA ayudan a reducir ruido de registros reutilizados. Const propagation y range analysis pueden revelar invariantes. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Un slice depende de la pregunta: backward para causas, forward para consecuencias. La precisión siempre negocia coste, soundness y false positives. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-calling-conventions": {
    "id": "re-calling-conventions",
    "courseId": 26,
    "title": "Calling conventions y recuperación de prototipos",
    "shortTitle": "Calling conventions y recuperación de prototipos",
    "duration": 105,
    "objective": "inferir parámetros, retornos y ownership usando ABI, call sites y efectos, sin confiar ciegamente en firmas automáticas.",
    "summary": [
      "Calling convention es evidencia fuerte sobre dónde buscar argumentos/retorno.",
      "Optimización e inlining pueden ocultar llamadas o eliminar marcos.",
      "Una firma recuperada debe validarse en varios call sites."
    ],
    "concept": "Calling convention es evidencia fuerte sobre dónde buscar argumentos/retorno. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "Stack cleanup, preserved registers y variadic calls dejan patrones observables.",
      "C++ agrega this, name mangling, RTTI/vtables según ABI/toolchain.",
      "Interprocedural analysis mejora tipos cuando múltiples funciones comparten estructuras."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Calling convention es evidencia fuerte sobre dónde buscar argumentos/retorno. Stack cleanup, preserved registers y variadic calls dejan patrones observables."
        },
        {
          "title": "Análisis experto",
          "body": "Optimización e inlining pueden ocultar llamadas o eliminar marcos. C++ agrega this, name mangling, RTTI/vtables según ABI/toolchain. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Una firma recuperada debe validarse en varios call sites. Interprocedural analysis mejora tipos cuando múltiples funciones comparten estructuras. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-compiler-patterns": {
    "id": "re-compiler-patterns",
    "courseId": 26,
    "title": "Patrones de compilador y optimización",
    "shortTitle": "Patrones de compilador y optimización",
    "duration": 105,
    "objective": "reconocer transformaciones comunes para no confundir código generado con intención fuente literal.",
    "summary": [
      "Switch puede convertirse en jump table, árbol o secuencia según densidad y perfil.",
      "Inlining borra fronteras de funciones fuente.",
      "Strength reduction y vectorización cambian radicalmente la forma del código."
    ],
    "concept": "Switch puede convertirse en jump table, árbol o secuencia según densidad y perfil. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "Comparar builds -O0/-O2 de programas propios entrena reconocimiento sin adivinar.",
      "Idioms dependen de ISA, compilador, versión y flags.",
      "Debug info cuando existe sirve como ground truth parcial para evaluar inferencias."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Switch puede convertirse en jump table, árbol o secuencia según densidad y perfil. Comparar builds -O0/-O2 de programas propios entrena reconocimiento sin adivinar."
        },
        {
          "title": "Análisis experto",
          "body": "Inlining borra fronteras de funciones fuente. Idioms dependen de ISA, compilador, versión y flags. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Strength reduction y vectorización cambian radicalmente la forma del código. Debug info cuando existe sirve como ground truth parcial para evaluar inferencias. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-stripped-binaries": {
    "id": "re-stripped-binaries",
    "courseId": 26,
    "title": "Stripped binaries y recuperación de estructura",
    "shortTitle": "Stripped binaries y recuperación de estructura",
    "duration": 105,
    "objective": "analizar binarios con símbolos reducidos distinguiendo qué información se perdió y qué evidencia sigue disponible.",
    "summary": [
      "Strip puede eliminar símbolos/debug info, pero no borra semántica necesaria para ejecutar.",
      "Imports/exports, strings, relocations y metadata pueden seguir aportando estructura.",
      "Nombres inventados por el analista deben marcarse como hipótesis."
    ],
    "concept": "Strip puede eliminar símbolos/debug info, pero no borra semántica necesaria para ejecutar. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "El loader aún necesita información dinámica relevante en ejecutables enlazados dinámicamente.",
      "Signatures y library identification ayudan, pero pueden equivocarse.",
      "Comparar con builds conocidas o paquetes reproducibles puede recuperar contexto legítimo."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Strip puede eliminar símbolos/debug info, pero no borra semántica necesaria para ejecutar. El loader aún necesita información dinámica relevante en ejecutables enlazados dinámicamente."
        },
        {
          "title": "Análisis experto",
          "body": "Imports/exports, strings, relocations y metadata pueden seguir aportando estructura. Signatures y library identification ayudan, pero pueden equivocarse. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Nombres inventados por el analista deben marcarse como hipótesis. Comparar con builds conocidas o paquetes reproducibles puede recuperar contexto legítimo. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-packers-obfuscation": {
    "id": "re-packers-obfuscation",
    "courseId": 26,
    "title": "Packers y obfuscation: análisis defensivo",
    "shortTitle": "Packers y obfuscation: análisis defensivo",
    "duration": 105,
    "objective": "distinguir empaquetado, compresión y ofuscación y diseñar un análisis seguro sin asumir automáticamente malware.",
    "summary": [
      "Alta entropía o pocas imports son indicios, no veredictos.",
      "Packing transforma representación; la lógica original debe existir de algún modo al ejecutarse.",
      "Obfuscation busca elevar coste del análisis, no cambiar la semántica requerida."
    ],
    "concept": "Alta entropía o pocas imports son indicios, no veredictos. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "Dynamic observation en sandbox puede complementar static analysis.",
      "Self-modifying/JIT code exige capturar estados en momentos adecuados.",
      "La cadena de custodia del sample y hashes importan tanto como la herramienta."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Alta entropía o pocas imports son indicios, no veredictos. Dynamic observation en sandbox puede complementar static analysis."
        },
        {
          "title": "Análisis experto",
          "body": "Packing transforma representación; la lógica original debe existir de algún modo al ejecutarse. Self-modifying/JIT code exige capturar estados en momentos adecuados. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Obfuscation busca elevar coste del análisis, no cambiar la semántica requerida. La cadena de custodia del sample y hashes importan tanto como la herramienta. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-antidebug": {
    "id": "re-antidebug",
    "courseId": 26,
    "title": "Anti-debugging y anti-analysis como señales",
    "shortTitle": "Anti-debugging y anti-analysis como señales",
    "duration": 115,
    "objective": "reconocer anti-analysis a nivel conceptual y neutralizar conclusiones falsas mediante observación controlada y múltiples fuentes de evidencia.",
    "summary": [
      "Timing checks y environment probes pueden detectar diferencias de observación, pero también generar false positives.",
      "Un comportamiento diferente bajo debugger es evidencia, no prueba de intención maliciosa.",
      "La respuesta defensiva es instrumentación redundante y control experimental."
    ],
    "concept": "Timing checks y environment probes pueden detectar diferencias de observación, pero también generar false positives. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "Comparar ejecución nativa, trazada y emulada ayuda a aislar Heisenbugs.",
      "Patch temporal para análisis debe documentarse y no confundirse con comportamiento original.",
      "Snapshots y replay facilitan experimentos reproducibles."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Timing checks y environment probes pueden detectar diferencias de observación, pero también generar false positives. Comparar ejecución nativa, trazada y emulada ayuda a aislar Heisenbugs."
        },
        {
          "title": "Análisis experto",
          "body": "Un comportamiento diferente bajo debugger es evidencia, no prueba de intención maliciosa. Patch temporal para análisis debe documentarse y no confundirse con comportamiento original. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "La respuesta defensiva es instrumentación redundante y control experimental. Snapshots y replay facilitan experimentos reproducibles. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-firmware": {
    "id": "re-firmware",
    "courseId": 26,
    "title": "Firmware reversing: formatos, memoria y periféricos",
    "shortTitle": "Firmware reversing: formatos, memoria y periféricos",
    "duration": 115,
    "objective": "analizar imágenes de firmware propias o autorizadas separando container, filesystem, código, datos y modelo hardware.",
    "summary": [
      "Firmware image puede contener bootloader, kernels, filesystems, blobs y múltiples arquitecturas.",
      "Direcciones de ejecución dependen del memory map y del SoC, no solo del offset del archivo.",
      "MMIO y tablas de vectores conectan código con hardware."
    ],
    "concept": "Firmware image puede contener bootloader, kernels, filesystems, blobs y múltiples arquitecturas. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "Identificar formato y arquitectura precede a desensamblar.",
      "Device trees, strings y headers pueden revelar layout y periféricos.",
      "Emulación parcial requiere modelar suficientes dispositivos; no es “ejecutar el binario y ya”."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Firmware image puede contener bootloader, kernels, filesystems, blobs y múltiples arquitecturas. Identificar formato y arquitectura precede a desensamblar."
        },
        {
          "title": "Análisis experto",
          "body": "Direcciones de ejecución dependen del memory map y del SoC, no solo del offset del archivo. Device trees, strings y headers pueden revelar layout y periféricos. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "MMIO y tablas de vectores conectan código con hardware. Emulación parcial requiere modelar suficientes dispositivos; no es “ejecutar el binario y ya”. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-validation": {
    "id": "re-validation",
    "courseId": 26,
    "title": "Validación dinámica de hipótesis",
    "shortTitle": "Validación dinámica de hipótesis",
    "duration": 115,
    "objective": "usar debugging, tracing y tests controlados para confirmar o refutar hipótesis estáticas sin sobreinterpretar el pseudocódigo.",
    "summary": [
      "Static y dynamic analysis se complementan; ninguna domina universalmente.",
      "Breakpoints sobre efectos observables suelen ser más fiables que nombres inferidos.",
      "Una hipótesis debe producir una predicción falsable."
    ],
    "concept": "Static y dynamic analysis se complementan; ninguna domina universalmente. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "Inputs mínimos reducen ruido y facilitan comparar caminos.",
      "Watchpoints/traces pueden confirmar ownership y data-flow.",
      "Registrar versiones, hashes y configuración hace reproducible el análisis."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Static y dynamic analysis se complementan; ninguna domina universalmente. Inputs mínimos reducen ruido y facilitan comparar caminos."
        },
        {
          "title": "Análisis experto",
          "body": "Breakpoints sobre efectos observables suelen ser más fiables que nombres inferidos. Watchpoints/traces pueden confirmar ownership y data-flow. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Una hipótesis debe producir una predicción falsable. Registrar versiones, hashes y configuración hace reproducible el análisis. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  },
  "re-project": {
    "id": "re-project",
    "courseId": 26,
    "title": "Proyecto: reverse engineering documentado",
    "shortTitle": "Proyecto: reverse engineering documentado",
    "duration": 115,
    "objective": "producir un informe técnico reproducible de un binario propio, open-source o de laboratorio desde inventario hasta modelo de comportamiento.",
    "summary": [
      "El entregable principal es una explicación verificable, no una captura de pantalla de un decompiler.",
      "Cada afirmación importante debe enlazar evidencia estática/dinámica.",
      "Separar hechos, inferencias y dudas evita convertir intuición en documentación."
    ],
    "concept": "El entregable principal es una explicación verificable, no una captura de pantalla de un decompiler. En ingeniería inversa, la meta es reconstruir un modelo suficientemente preciso del comportamiento a partir de artefactos compilados, conservando la diferencia entre observación e inferencia.",
    "rules": [
      "El proyecto incluye mapa de funciones, CFG relevante, data-flow, formatos y ABI.",
      "Debe comparar al menos una hipótesis del decompiler con ejecución observada.",
      "Cierra con limitaciones, preguntas abiertas y artefactos para reproducir el análisis."
    ],
    "deep": {
      "intro": "La ingeniería inversa útil combina representación binaria, ABI, control/data-flow y validación experimental. Un decompiler acelera el trabajo, pero no reemplaza el razonamiento.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El entregable principal es una explicación verificable, no una captura de pantalla de un decompiler. El proyecto incluye mapa de funciones, CFG relevante, data-flow, formatos y ABI."
        },
        {
          "title": "Análisis experto",
          "body": "Cada afirmación importante debe enlazar evidencia estática/dinámica. Debe comparar al menos una hipótesis del decompiler con ejecución observada. La evidencia debe contrastarse con ABI, formato binario y comportamiento observado."
        },
        {
          "title": "Límites y validación",
          "body": "Separar hechos, inferencias y dudas evita convertir intuición en documentación. Cierra con limitaciones, preguntas abiertas y artefactos para reproducir el análisis. Toda inferencia importante se trata como hipótesis hasta validarla."
        }
      ]
    },
    "example": {
      "problem": "Analizas un binario de laboratorio y la herramienta propone una función con nombres genéricos y tipos dudosos.",
      "steps": [
        "Comprueba arquitectura, formato, base y límites de función antes de interpretar pseudocódigo.",
        "Cruza call sites, registros/stack según ABI, xrefs y efectos sobre memoria.",
        "Formula una hipótesis concreta sobre la función y valida con un input controlado o tracing."
      ],
      "solution": "La conclusión se documenta con evidencia y nivel de confianza; los nombres/tipos inferidos se corrigen solo cuando varias señales convergen."
    },
    "check": {
      "question": "¿El pseudocódigo de un decompiler debe tratarse como el código fuente original?",
      "options": [
        [
          "Sí, si compila",
          false
        ],
        [
          "No; es una reconstrucción inferida que debe validarse",
          true
        ],
        [
          "Sí, si no hay símbolos",
          false
        ]
      ],
      "feedback": "La decompilación es una representación reconstruida. Optimización, pérdida de tipos y decisiones heurísticas impiden tratarla como fuente original."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debes distinguir hechos observados de inferencias del analista? sí/no",
        "answer": "si",
        "hint": "La trazabilidad de evidencia es central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una única herramienta de análisis automático convierte sus tipos/nombres inferidos en verdad? sí/no",
        "answer": "no",
        "hint": "Son hipótesis heurísticas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Validar una hipótesis estática con una observación dinámica controlada aumenta la confianza? sí/no",
        "answer": "si",
        "hint": "Combina fuentes de evidencia independientes."
      }
    ]
  }
});
