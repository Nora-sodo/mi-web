/**
 * BLOQUE 008 — Jerarquía de memoria y almacenamiento
 *
 * Este archivo contiene únicamente conocimiento pedagógico. app.js renderiza,
 * state.js persiste progreso y challenges.js añade el nivel 4.
 *
 * Regla editorial: separar siempre caché, memoria virtual y almacenamiento;
 * comparten vocabulario como “página” o “bloque”, pero no son la misma capa.
 */

window.LEARNING_PATHS[8] = {
  "level": "Experto progresivo",
  "estimatedHours": 36,
  "description": "Jerarquía de memoria, cachés, coherencia, DRAM/NUMA, memoria virtual/TLB y almacenamiento SSD/NVMe.",
  "outcomes": [
    "Modelar rendimiento de una jerarquía usando localidad, hits/misses, latencia y ancho de banda.",
    "Explicar mapeo, asociatividad, políticas de escritura y coherencia sin confundirlas con consistencia.",
    "Razonar sobre DRAM, canales y NUMA distinguiendo latencia de ancho de banda.",
    "Explicar traducción virtual, page tables, TLB, page faults y huge pages.",
    "Distinguir HDD, SSD, NAND, FTL, wear leveling y NVMe por capas y responsabilidades."
  ],
  "modules": [
    {
      "id": "m1-cache-basics",
      "title": "Jerarquía y cachés",
      "description": "Localidad, líneas, hits/misses, asociatividad y escritura.",
      "lessons": [
        "jerarquia-localidad",
        "cache-lines-hits",
        "cache-mapping",
        "cache-writes"
      ]
    },
    {
      "id": "m2-coherence-dram",
      "title": "Coherencia y memoria principal",
      "description": "MESI, false sharing, DRAM, canales y NUMA.",
      "lessons": [
        "coherencia-mesi",
        "dram-controlador-numa"
      ]
    },
    {
      "id": "m3-virtual",
      "title": "Memoria virtual",
      "description": "MMU, páginas, page tables, TLB y huge pages.",
      "lessons": [
        "virtual-mmu-pages",
        "tlb-hugepages"
      ]
    },
    {
      "id": "m4-storage",
      "title": "Almacenamiento",
      "description": "HDD/SSD, NAND/FTL y NVMe.",
      "lessons": [
        "almacenamiento-hdd-ssd",
        "nand-ftl-wear",
        "nvme-controladores"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "jerarquia-localidad": {
    "id": "jerarquia-localidad",
    "courseId": 8,
    "title": "Jerarquía de memoria y principio de localidad",
    "shortTitle": "La memoria rápida es pequeña por una razón",
    "duration": 82,
    "objective": "explicar por qué una jerarquía puede acercar el rendimiento aparente al nivel rápido explotando localidad temporal y espacial.",
    "summary": [
      "La jerarquía combina niveles con distinta latencia, ancho de banda, capacidad y coste.",
      "La localidad temporal favorece reutilizar datos recientes; la espacial favorece accesos cercanos.",
      "El rendimiento depende del patrón de acceso, no solo del tamaño nominal de cada nivel."
    ],
    "concept": "Una jerarquía funciona porque el programa no accede uniformemente a todos los bytes todo el tiempo. El hardware mueve bloques entre niveles intentando mantener cerca lo que probablemente se reutilizará.",
    "diagram": [
      "CPU → registros → L1 → L2 → LLC → DRAM → almacenamiento",
      "más arriba: menor latencia / menor capacidad",
      "más abajo: mayor capacidad / mayor latencia"
    ],
    "rules": [
      "Distingue latencia, throughput y capacidad.",
      "Localidad es una propiedad del patrón de acceso, no del dato.",
      "La jerarquía no elimina misses: intenta hacerlos infrecuentes o tolerables."
    ],
    "deep": {
      "sections": [
        {
          "title": "Modelo de coste",
          "body": "No existe un único número de “velocidad de memoria”. Cada nivel tiene latencias, anchos y capacidades diferentes, y además puede haber colas y concurrencia."
        },
        {
          "title": "Localidad temporal",
          "body": "Si un dato se usa repetidamente en poco tiempo, conservarlo en niveles cercanos reduce accesos a niveles inferiores."
        },
        {
          "title": "Localidad espacial",
          "body": "Acceder a una dirección hace probable que se accedan direcciones próximas; por eso se transfieren bloques mayores que un único byte."
        },
        {
          "title": "Trade-off",
          "body": "Bloques grandes aprovechan espacialidad pero también consumen capacidad y ancho de banda; si el patrón es disperso pueden traer datos inútiles."
        }
      ],
      "commonErrors": [
        "Decir que L1 siempre tarda exactamente N ciclos en cualquier CPU.",
        "Confundir localidad espacial con que las direcciones sean físicamente contiguas en todos los niveles."
      ],
      "connections": [
        "Bloque 007: throughput y stalls.",
        "Bloque 009: layout de datos en C."
      ]
    },
    "example": {
      "problem": "Un bucle recorre secuencialmente un array de 4096 enteros. ¿Qué localidad domina entre elementos consecutivos?",
      "steps": [
        [
          "Patrón",
          "Las direcciones consecutivas están muy próximas."
        ],
        [
          "Conclusión",
          "Predomina localidad espacial; además puede haber temporal si se reutiliza el array."
        ]
      ],
      "answer": "Localidad espacial."
    },
    "check": {
      "question": "¿Un acceso secuencial suele favorecer la localidad espacial?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Los elementos consecutivos suelen compartir o seguir líneas próximas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Reutilizar inmediatamente el mismo dato explota localidad ¿temporal o espacial?",
        "answer": "temporal",
        "hint": "Se reutiliza en el tiempo."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una jerarquía elimina todos los misses? sí/no",
        "answer": "no",
        "hint": "Reduce su impacto/frecuencia, no los hace imposibles."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un bloque mayor siempre mejora rendimiento? sí/no",
        "answer": "no",
        "hint": "Puede aumentar tráfico y contaminación."
      }
    ]
  },
  "cache-lines-hits": {
    "id": "cache-lines-hits",
    "courseId": 8,
    "title": "Cache lines, hits, misses y coste efectivo",
    "shortTitle": "La caché mueve bloques, no pensamientos",
    "duration": 86,
    "objective": "razonar sobre líneas de caché, hit/miss y tiempo medio de acceso sin asumir latencias universales.",
    "summary": [
      "Una caché almacena copias de bloques de memoria llamados líneas.",
      "Un hit encuentra el bloque en el nivel consultado; un miss obliga a buscar más abajo.",
      "El tiempo medio depende de hit time, miss rate y miss penalty."
    ],
    "concept": "La unidad típica de transferencia entre niveles de caché es una línea. Pedir un byte puede provocar que llegue una línea completa; eso es crucial para localidad, false sharing y ancho de banda.",
    "diagram": [
      "dirección → tag | index | offset",
      "hit: tag coincide",
      "miss: traer línea desde nivel inferior"
    ],
    "rules": [
      "No confundas línea con palabra o página.",
      "Miss rate y miss penalty son magnitudes distintas.",
      "AMAT es un modelo; jerarquías no bloqueantes y solapamiento añaden matices."
    ],
    "deep": {
      "sections": [
        {
          "title": "AMAT básico",
          "body": "En un modelo de un nivel: AMAT = hit time + miss rate·miss penalty."
        },
        {
          "title": "Tipos de miss",
          "body": "Compulsory, capacity y conflict son categorías conceptuales útiles; en sistemas reales pueden interactuar con prefetch y coherencia."
        },
        {
          "title": "Línea",
          "body": "El offset selecciona bytes dentro de la línea; index el conjunto; tag identifica qué bloque ocupa la entrada."
        },
        {
          "title": "No bloqueo",
          "body": "Caches modernas pueden permitir varios misses pendientes y solapar trabajo; por eso una media escalar no describe toda la dinámica."
        }
      ],
      "commonErrors": [
        "Multiplicar hit rate por hit time y olvidar la penalización.",
        "Creer que un miss de L1 implica siempre DRAM."
      ],
      "connections": [
        "Bloque 004: memorias.",
        "Bloque 007: stalls."
      ]
    },
    "example": {
      "problem": "Hit time=1 ns, miss rate=5 %, miss penalty=40 ns. AMAT simplificado:",
      "steps": [
        [
          "Base",
          "1 ns."
        ],
        [
          "Penalización media",
          "0,05·40=2 ns."
        ],
        [
          "Total",
          "3 ns."
        ]
      ],
      "answer": "3 ns."
    },
    "check": {
      "question": "¿Un miss de L1 puede ser hit en L2?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ]
      ],
      "success": "Exacto.",
      "failure": "La jerarquía tiene varios niveles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Hit time 2 ns, miss rate 0: AMAT en ns",
        "answer": "2",
        "hint": "No hay penalización."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Hit=1 ns, miss=10 %, penalty=20 ns. AMAT",
        "answer": "3",
        "hint": "1+0,1·20."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿AMAT básico captura totalmente múltiples misses solapados? sí/no",
        "answer": "no",
        "hint": "Es un modelo promedio simplificado."
      }
    ]
  },
  "cache-mapping": {
    "id": "cache-mapping",
    "courseId": 8,
    "title": "Asociatividad, conjuntos y reemplazo",
    "shortTitle": "Dónde puede vivir una línea",
    "duration": 90,
    "objective": "calcular mapeo a sets y explicar direct-mapped, set-associative, fully associative y políticas de reemplazo.",
    "summary": [
      "La asociatividad determina cuántas posiciones candidatas tiene un bloque dentro de un conjunto.",
      "Más asociatividad puede reducir conflict misses, pero aumenta coste de búsqueda/implementación.",
      "Las políticas de reemplazo deciden qué línea expulsar cuando el conjunto está lleno."
    ],
    "concept": "Una caché N-way agrupa N líneas por set. La dirección selecciona un set y el tag decide si alguna vía contiene el bloque requerido.",
    "diagram": [
      "bloque → set = bloque mod nº_sets (modelo simple)",
      "set → N vías",
      "reemplazo: elegir víctima"
    ],
    "rules": [
      "Direct-mapped = 1-way.",
      "Fully associative = un único set con muchas vías.",
      "LRU exacto no es obligatorio ni siempre práctico en alta asociatividad."
    ],
    "deep": {
      "sections": [
        {
          "title": "Capacidad",
          "body": "capacidad = sets·ways·bytes_por_línea, ignorando metadatos."
        },
        {
          "title": "Conflictos",
          "body": "Dos bloques que mapean al mismo set compiten aunque haya espacio libre en otros sets."
        },
        {
          "title": "Reemplazo",
          "body": "LRU, pseudo-LRU, random y políticas adaptativas son posibilidades; no asumas una universal."
        },
        {
          "title": "Coste",
          "body": "Más vías implican más comparaciones y estructuras de selección, con efectos en energía y timing."
        }
      ],
      "commonErrors": [
        "Confundir asociatividad con número de niveles.",
        "Decir que fully associative no puede tener misses de capacidad."
      ],
      "connections": [
        "Bloque 004: multiplexores.",
        "Bloque 074: performance."
      ]
    },
    "example": {
      "problem": "Caché 32 KiB, línea 64 B, 8-way. ¿Cuántos sets?",
      "steps": [
        [
          "Líneas",
          "32768/64=512 líneas."
        ],
        [
          "Sets",
          "512/8=64 sets."
        ]
      ],
      "answer": "64 sets."
    },
    "check": {
      "question": "¿Una caché direct-mapped es 1-way?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Direct-mapped significa una vía por set."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "16 KiB, línea 64 B: número total de líneas",
        "answer": "256",
        "hint": "16384/64."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "32 KiB, 4-way, línea 64 B: sets",
        "answer": "128",
        "hint": "32768/(4·64)."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más asociatividad elimina compulsory misses? sí/no",
        "answer": "no",
        "hint": "El primer acceso sigue siendo primero."
      }
    ]
  },
  "cache-writes": {
    "id": "cache-writes",
    "courseId": 8,
    "title": "Write-through, write-back y write allocation",
    "shortTitle": "Escribir también tiene política",
    "duration": 82,
    "objective": "comparar políticas de escritura y razonar sobre dirty lines, write allocate y tráfico.",
    "summary": [
      "Write-through propaga la escritura al nivel inferior según la política del sistema.",
      "Write-back modifica la copia en caché y difiere la propagación hasta reemplazo/evicción u otros eventos.",
      "Write-allocate decide si un store miss trae la línea antes de escribir."
    ],
    "concept": "Las políticas de escritura controlan cuándo y dónde se actualiza el siguiente nivel. Write-back necesita metadatos de suciedad; write-through genera tráfico más inmediato pero puede apoyarse en buffers.",
    "diagram": [
      "store hit → actualizar caché",
      "write-back: marcar dirty",
      "evicción dirty → escribir abajo"
    ],
    "rules": [
      "Write-back no significa “nunca escribir a memoria”.",
      "Write-through no implica necesariamente bloquear hasta DRAM.",
      "Write allocate y write policy son ejes distintos."
    ],
    "deep": {
      "sections": [
        {
          "title": "Dirty bit",
          "body": "Una línea write-back necesita saber si difiere del siguiente nivel para evitar escrituras innecesarias."
        },
        {
          "title": "Store buffer",
          "body": "Permite desacoplar parte de la latencia de escritura; la consistencia/orden de memoria es otro problema distinto."
        },
        {
          "title": "Write allocate",
          "body": "Es común con write-back, pero no es una identidad lógica."
        },
        {
          "title": "Jerarquía",
          "body": "“Nivel inferior” puede ser L2/LLC, no necesariamente DRAM."
        }
      ],
      "commonErrors": [
        "Equiparar write-through con coherencia perfecta.",
        "Confundir write allocate con reservar espacio en heap."
      ],
      "connections": [
        "Bloque 007: memory ordering futuro.",
        "Bloque 059: modelos de memoria."
      ]
    },
    "example": {
      "problem": "Una línea limpia en write-back se reemplaza sin modificaciones. ¿Debe escribirse por el mero hecho de ser expulsada?",
      "steps": [
        [
          "Estado",
          "Está limpia: coincide con nivel inferior."
        ],
        [
          "Resultado",
          "No necesita write-back por suciedad."
        ]
      ],
      "answer": "No."
    },
    "check": {
      "question": "¿Una línea dirty contiene cambios aún no propagados al nivel inferior?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Eso indica el dirty bit."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Write-back suele usar dirty bit? sí/no",
        "answer": "si",
        "hint": "Debe distinguir líneas modificadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Write-through obliga a que cada store espere a DRAM? sí/no",
        "answer": "no",
        "hint": "Buffers y niveles intermedios desacoplan."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Write-allocate y write-back son exactamente la misma decisión? sí/no",
        "answer": "no",
        "hint": "Son ejes distintos."
      }
    ]
  },
  "coherencia-mesi": {
    "id": "coherencia-mesi",
    "courseId": 8,
    "title": "Coherencia de caché, MESI y false sharing",
    "shortTitle": "Cuando varios núcleos comparten una mentira útil",
    "duration": 94,
    "objective": "explicar el problema de coherencia, interpretar conceptualmente MESI y reconocer false sharing.",
    "summary": [
      "Coherencia mantiene una visión compatible de copias cacheadas de una misma ubicación.",
      "MESI usa estados Modified, Exclusive, Shared e Invalid como protocolo conceptual común.",
      "False sharing aparece cuando núcleos modifican datos distintos que comparten una línea de coherencia."
    ],
    "concept": "Con caches privadas, la misma línea puede existir en varios núcleos. Un protocolo de coherencia coordina permisos y copias a granularidad de línea; no sustituye al modelo de consistencia de memoria.",
    "diagram": [
      "Core0 cache ⇄ coherencia ⇄ Core1 cache",
      "misma línea, distintos estados",
      "false sharing: A y B distintos pero misma línea"
    ],
    "rules": [
      "Coherencia ≠ consistencia.",
      "MESI no es el único protocolo posible.",
      "False sharing no requiere que los hilos compartan la misma variable."
    ],
    "deep": {
      "sections": [
        {
          "title": "Modified",
          "body": "Conceptualmente, la copia es modificada y exclusiva respecto a otras caches coherentes."
        },
        {
          "title": "Shared",
          "body": "Puede haber múltiples copias compartidas de lectura."
        },
        {
          "title": "Invalid",
          "body": "La entrada no contiene una copia válida para ese bloque."
        },
        {
          "title": "False sharing",
          "body": "Dos contadores independientes en la misma línea pueden provocar invalidaciones repetidas y tráfico de coherencia."
        }
      ],
      "commonErrors": [
        "Decir que MESI obliga a escribir cada modificación inmediatamente a DRAM.",
        "Confundir data race con false sharing: pueden existir por separado."
      ],
      "connections": [
        "Bloque 059: concurrencia.",
        "Bloque 074: optimización multicore."
      ]
    },
    "example": {
      "problem": "Dos hilos incrementan contadores distintos pero adyacentes y el rendimiento cae al ejecutarlos en cores distintos. ¿Qué sospechas?",
      "steps": [
        [
          "Observación",
          "No comparten variable lógica."
        ],
        [
          "Granularidad",
          "Podrían compartir línea de caché."
        ],
        [
          "Diagnóstico",
          "False sharing."
        ]
      ],
      "answer": "False sharing."
    },
    "check": {
      "question": "¿Coherencia y consistencia de memoria son exactamente lo mismo?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Resuelven problemas relacionados pero distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Estado MESI que significa no válido:",
        "answer": "invalid",
        "hint": "I = Invalid."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿False sharing puede ocurrir con variables distintas? sí/no",
        "answer": "si",
        "hint": "Si comparten línea."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿MESI es el único protocolo de coherencia posible? sí/no",
        "answer": "no",
        "hint": "Hay variantes y otros protocolos."
      }
    ]
  },
  "dram-controlador-numa": {
    "id": "dram-controlador-numa",
    "courseId": 8,
    "title": "DRAM, controlador, canales, latencia y NUMA",
    "shortTitle": "La memoria principal tampoco es una piscina uniforme",
    "duration": 88,
    "objective": "explicar bancos/canales de DRAM a nivel conceptual y razonar sobre ancho de banda, latencia y NUMA.",
    "summary": [
      "DRAM se organiza internamente en jerarquías de canales, ranks, bancos y filas según la plataforma/dispositivo.",
      "El controlador de memoria programa comandos y arbitra solicitudes.",
      "NUMA hace que la latencia/ancho de banda dependan de dónde esté físicamente la memoria respecto al procesador que accede."
    ],
    "concept": "“RAM” es una abstracción útil para software, pero debajo hay controladores, canales, bancos y restricciones temporales. En NUMA, el lugar de asignación de páginas puede afectar al rendimiento.",
    "diagram": [
      "CPU socket 0 → memoria local 0",
      "interconnect → memoria del socket 1",
      "local ≠ remoto en coste"
    ],
    "rules": [
      "Más canales pueden elevar ancho de banda agregado, no reducir mágicamente toda latencia.",
      "NUMA remoto sigue siendo memoria, no almacenamiento.",
      "No atribuyas timings DDR concretos a toda DRAM."
    ],
    "deep": {
      "sections": [
        {
          "title": "Filas y bancos",
          "body": "Accesos que reutilizan una fila abierta pueden comportarse distinto de los que requieren cambiarla; el detalle depende del controlador y DRAM."
        },
        {
          "title": "Canales",
          "body": "Canales independientes permiten más concurrencia/ancho de banda si el patrón y controlador pueden aprovecharlos."
        },
        {
          "title": "NUMA",
          "body": "El SO puede intentar ubicar páginas cerca del hilo que las usa; migración y afinidad importan."
        },
        {
          "title": "Latencia vs ancho",
          "body": "Una carga dependiente es sensible a latencia; streams paralelos pueden saturar ancho de banda."
        }
      ],
      "commonErrors": [
        "Decir que dual-channel duplica siempre el rendimiento de cualquier programa.",
        "Confundir NUMA con caché distribuida."
      ],
      "connections": [
        "Bloque 012: planificación.",
        "Bloque 059: paralelismo."
      ]
    },
    "example": {
      "problem": "Un workload streaming usa muchos accesos independientes. ¿Qué métrica puede ser especialmente crítica: ancho de banda o solo latencia de una carga?",
      "steps": [
        [
          "Patrón",
          "Hay muchas transferencias en paralelo."
        ],
        [
          "Métrica",
          "El ancho de banda agregado puede dominar."
        ]
      ],
      "answer": "Ancho de banda."
    },
    "check": {
      "question": "¿NUMA significa que todos los accesos a RAM cuestan igual?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Exacto.",
      "failure": "La N significa non-uniform."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Más canales pueden aumentar ancho de banda agregado? sí/no",
        "answer": "si",
        "hint": "Aportan paralelismo."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Memoria NUMA remota es un SSD? sí/no",
        "answer": "no",
        "hint": "Sigue siendo memoria principal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Duplicar canales garantiza 2× en cualquier aplicación? sí/no",
        "answer": "no",
        "hint": "Depende del cuello de botella."
      }
    ]
  },
  "virtual-mmu-pages": {
    "id": "virtual-mmu-pages",
    "courseId": 8,
    "title": "Memoria virtual, MMU, páginas y tablas",
    "shortTitle": "Direcciones que necesitan traducción",
    "duration": 94,
    "objective": "explicar traducción virtual→física, page tables, protección y page faults sin confundirlos con cache misses.",
    "summary": [
      "La memoria virtual desacopla el espacio de direcciones usado por un proceso de la memoria física.",
      "La MMU aplica traducciones y permisos usando estructuras configuradas por el sistema operativo.",
      "Un page fault es una excepción por una traducción/acceso que requiere intervención; no significa necesariamente “leer del disco”."
    ],
    "concept": "Una dirección virtual se divide conceptualmente en número de página virtual y offset. La traducción produce un marco físico más permisos/atributos; el offset dentro de la página se conserva en traducciones paginadas convencionales.",
    "diagram": [
      "VA: VPN | offset",
      "page tables → PPN + permisos",
      "PA: PPN | offset"
    ],
    "rules": [
      "Page fault ≠ cache miss.",
      "Fault no implica siempre swap.",
      "Las tablas de páginas ocupan memoria y pueden tener varios niveles."
    ],
    "deep": {
      "sections": [
        {
          "title": "Protección",
          "body": "Permisos de lectura/escritura/ejecución y privilegio pueden integrarse en la traducción."
        },
        {
          "title": "Faults",
          "body": "Una página ausente, permiso inválido, copy-on-write u otras condiciones pueden provocar fault según arquitectura/SO."
        },
        {
          "title": "Multinivel",
          "body": "Las tablas jerárquicas evitan reservar una tabla plana gigantesca para todo el espacio virtual."
        },
        {
          "title": "MMU",
          "body": "Es hardware de gestión/traducción; el SO configura estructuras y políticas."
        }
      ],
      "commonErrors": [
        "Decir que virtual significa “en disco”.",
        "Confundir página virtual con línea de caché."
      ],
      "connections": [
        "Bloque 012: procesos.",
        "Bloque 013: mmap/files."
      ]
    },
    "example": {
      "problem": "Página de 4 KiB: ¿cuántos bits de offset tiene una dirección byte-addressable?",
      "steps": [
        [
          "Tamaño",
          "4 KiB = 4096 = 2^12 bytes."
        ],
        [
          "Offset",
          "Se necesitan 12 bits."
        ]
      ],
      "answer": "12 bits."
    },
    "check": {
      "question": "¿Todo page fault implica acceso a disco?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Hay muchas causas de fault y páginas que pueden resolverse sin I/O."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Página 8 KiB: bits de offset",
        "answer": "13",
        "hint": "8192=2^13."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿VA y PA son necesariamente iguales? sí/no",
        "answer": "no",
        "hint": "La MMU puede traducir."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un page fault y un cache miss son el mismo evento? sí/no",
        "answer": "no",
        "hint": "Capas distintas."
      }
    ]
  },
  "tlb-hugepages": {
    "id": "tlb-hugepages",
    "courseId": 8,
    "title": "TLB, page walks y huge pages",
    "shortTitle": "Una caché de traducciones, no de datos",
    "duration": 90,
    "objective": "explicar TLB hits/misses, page-table walks y trade-offs de páginas grandes.",
    "summary": [
      "El TLB cachea traducciones recientes de direcciones virtuales a físicas y metadatos asociados.",
      "Un TLB miss puede desencadenar un page-table walk; no es necesariamente un page fault.",
      "Páginas grandes amplían el alcance cubierto por cada entrada TLB, a cambio de otros trade-offs."
    ],
    "concept": "La traducción también tiene localidad. El TLB evita consultar repetidamente las tablas de páginas para cada acceso; cuando falla, hardware o software según arquitectura debe obtener la traducción.",
    "diagram": [
      "VA → TLB hit → traducción",
      "TLB miss → page-table walk",
      "PTE inválida/permisos → posible fault"
    ],
    "rules": [
      "TLB miss ≠ page fault.",
      "TLB no almacena los datos de usuario de la página.",
      "Huge pages pueden reducir presión de TLB pero no son universalmente mejores."
    ],
    "deep": {
      "sections": [
        {
          "title": "Reach",
          "body": "TLB reach ≈ entradas efectivas·tamaño de página, simplificando asociaciones y múltiples tamaños."
        },
        {
          "title": "Walk",
          "body": "Un walk puede requerir varios accesos a memoria, aunque caches de page-walk/PTEs pueden reducir coste."
        },
        {
          "title": "Huge pages",
          "body": "Aumentan reach y pueden reducir niveles/entradas necesarias, pero complican asignación y pueden aumentar fragmentación interna."
        },
        {
          "title": "Invalidación",
          "body": "Cambiar page tables exige sincronizar caches de traducción conforme a la arquitectura."
        }
      ],
      "commonErrors": [
        "Decir que TLB miss obliga al kernel en toda arquitectura.",
        "Confundir huge page con cache line gigante."
      ],
      "connections": [
        "RISC-V privileged: SFENCE.VMA.",
        "Bloque 012: memoria virtual del SO."
      ]
    },
    "example": {
      "problem": "TLB de 128 entradas, páginas de 4 KiB, sin considerar asociatividad: reach aproximado:",
      "steps": [
        [
          "Cálculo",
          "128·4096 = 524288 bytes."
        ],
        [
          "Conversión",
          "524288 B = 512 KiB."
        ]
      ],
      "answer": "512 KiB."
    },
    "check": {
      "question": "¿Un TLB miss implica necesariamente page fault?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Puede resolverse con un page-table walk válido."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "64 entradas × 4 KiB: reach en KiB",
        "answer": "256",
        "hint": "64·4 KiB."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿TLB almacena normalmente datos de usuario de la página? sí/no",
        "answer": "no",
        "hint": "Cachea traducciones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Huge pages pueden reducir presión de TLB? sí/no",
        "answer": "si",
        "hint": "Cada traducción cubre más bytes."
      }
    ]
  },
  "almacenamiento-hdd-ssd": {
    "id": "almacenamiento-hdd-ssd",
    "courseId": 8,
    "title": "HDD, SSD y modelos de almacenamiento",
    "shortTitle": "Persistencia no significa misma física",
    "duration": 78,
    "objective": "comparar HDD y SSD por mecanismos físicos, latencia, paralelismo y granularidades.",
    "summary": [
      "HDD usa medios magnéticos y mecánica; SSD usa memoria no volátil y controladores electrónicos.",
      "Ambos exponen abstracciones de bloques lógicos, pero sus costes internos son distintos.",
      "Acceso aleatorio y secuencial afectan de manera muy diferente según tecnología."
    ],
    "concept": "El sistema operativo suele ver bloques lógicos, no cabezales ni celdas NAND. El dispositivo traduce esa abstracción a su medio físico y controlador.",
    "diagram": [
      "host → bloques lógicos",
      "HDD → pistas/sectores + mecánica",
      "SSD → controlador + NAND"
    ],
    "rules": [
      "SSD no significa “una gran RAM no volátil”.",
      "HDD no es simplemente “SSD lento”.",
      "Los números concretos dependen de dispositivo y carga."
    ],
    "deep": {
      "sections": [
        {
          "title": "HDD",
          "body": "Seek y rotación introducen costes mecánicos, especialmente en acceso aleatorio."
        },
        {
          "title": "SSD",
          "body": "El controlador explota canales/dies y mantiene mapeos internos; no hay seek mecánico."
        },
        {
          "title": "Abstracción",
          "body": "LBA es una interfaz lógica; la ubicación física puede cambiar."
        },
        {
          "title": "Durabilidad",
          "body": "SSD tiene límites de programa/borrado y gestión; HDD tiene otros modos de fallo. Ninguno es inmortal, tristemente."
        }
      ],
      "commonErrors": [
        "Afirmar que SSD nunca tiene latencia variable.",
        "Confundir LBA con dirección física NAND fija."
      ],
      "connections": [
        "Bloque 013: sistemas de archivos.",
        "Bloque 074: I/O."
      ]
    },
    "example": {
      "problem": "¿Qué dispositivo tiene normalmente una penalización mecánica de seek: HDD o SSD?",
      "steps": [
        [
          "Medio",
          "El HDD mueve cabezal y espera rotación."
        ],
        [
          "Resultado",
          "HDD."
        ]
      ],
      "answer": "HDD."
    },
    "check": {
      "question": "¿Un LBA identifica necesariamente una celda NAND física fija?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El controlador puede remapear."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿HDD tiene partes mecánicas móviles? sí/no",
        "answer": "si",
        "hint": "Cabezal/platos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿SSD elimina toda variabilidad de latencia? sí/no",
        "answer": "no",
        "hint": "Controlador, GC y paralelismo influyen."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿LBA es una abstracción lógica? sí/no",
        "answer": "si",
        "hint": "La física queda oculta."
      }
    ]
  },
  "nand-ftl-wear": {
    "id": "nand-ftl-wear",
    "courseId": 8,
    "title": "NAND Flash, páginas, bloques, FTL y wear leveling",
    "shortTitle": "Escribir bytes sueltos sería demasiado fácil",
    "duration": 94,
    "objective": "explicar granularidades NAND, erase-before-write, FTL, garbage collection, ECC y wear leveling.",
    "summary": [
      "NAND programa típicamente páginas y borra unidades mayores llamadas bloques.",
      "El FTL traduce bloques lógicos del host a ubicaciones físicas y permite remapeo.",
      "Wear leveling, ECC, bad-block management y garbage collection son funciones esenciales del controlador."
    ],
    "concept": "NAND no se actualiza in-place como una RAM ideal. La asimetría programar/borrar obliga al controlador a mover datos y mantener mapeos, lo que produce write amplification y trabajo interno.",
    "diagram": [
      "host LBA → FTL → página física",
      "programación: página",
      "borrado: bloque con muchas páginas"
    ],
    "rules": [
      "Página NAND ≠ página virtual de la MMU.",
      "Wear leveling distribuye desgaste; no lo elimina.",
      "Garbage collection puede añadir latencia aunque el host no vea sus pasos internos."
    ],
    "deep": {
      "sections": [
        {
          "title": "Erase-before-write",
          "body": "Para reutilizar celdas hace falta borrar a granularidad de bloque; actualizar datos suele escribirse en otro lugar y actualizar el mapeo."
        },
        {
          "title": "FTL",
          "body": "Flash Translation Layer mantiene la ilusión de bloques reescribibles."
        },
        {
          "title": "ECC",
          "body": "La NAND necesita corrección de errores; controladores también gestionan bloques defectuosos."
        },
        {
          "title": "Wear leveling",
          "body": "Distribuye ciclos de programa/borrado para evitar agotar prematuramente zonas concretas."
        }
      ],
      "commonErrors": [
        "Confundir página NAND con 4 KiB universal.",
        "Decir que wear leveling hace infinita la endurance."
      ],
      "connections": [
        "Bloque 069: integridad/testing.",
        "Bloque 075: laboratorio SSD."
      ]
    },
    "example": {
      "problem": "El host sobrescribe un LBA. ¿El SSD tiene que reprogramar necesariamente exactamente la misma página física?",
      "steps": [
        [
          "Restricción",
          "NAND favorece escritura fuera de lugar."
        ],
        [
          "FTL",
          "Puede asignar otra página y actualizar el mapeo."
        ]
      ],
      "answer": "No."
    },
    "check": {
      "question": "¿Wear leveling elimina el desgaste físico?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Lo distribuye; no lo hace desaparecer."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "En NAND, ¿qué suele ser mayor: página o bloque de borrado?",
        "answer": "bloque",
        "hint": "Un bloque contiene páginas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿FTL remapea direcciones lógicas a físicas? sí/no",
        "answer": "si",
        "hint": "Esa es una función central."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Garbage collection puede causar variabilidad de latencia? sí/no",
        "answer": "si",
        "hint": "Hace trabajo interno adicional."
      }
    ]
  },
  "nvme-controladores": {
    "id": "nvme-controladores",
    "courseId": 8,
    "title": "NVMe, colas y controladores de almacenamiento",
    "shortTitle": "NVMe no es un formato de tornillo M.2",
    "duration": 88,
    "objective": "explicar NVMe como protocolo, submission/completion queues y separación entre transporte, formato físico y medio.",
    "summary": [
      "NVMe define un protocolo para que software host se comunique con subsistemas de memoria no volátil.",
      "Su modelo usa Submission Queues y Completion Queues en memoria del host.",
      "NVMe, PCIe, M.2 y NAND son conceptos de capas distintas."
    ],
    "concept": "NVMe organiza comandos y completions mediante colas, reduciendo serialización y facilitando paralelismo. La especificación puede usar PCIe como transporte, pero M.2 es un factor de forma y NAND es un medio de almacenamiento.",
    "diagram": [
      "host driver → Submission Queue",
      "controller → ejecuta comando",
      "Completion Queue → host"
    ],
    "rules": [
      "NVMe ≠ M.2.",
      "NVMe ≠ NAND.",
      "Una cola profunda no garantiza más rendimiento si el workload o dispositivo no puede aprovecharla."
    ],
    "deep": {
      "sections": [
        {
          "title": "Submission/Completion",
          "body": "El host coloca comandos en SQ y el controlador publica resultados en CQ, coordinados mediante registros/doorbells y memoria."
        },
        {
          "title": "Paralelismo",
          "body": "Múltiples colas ayudan a escalar con múltiples CPU/flows, aunque los límites reales dependen del controlador."
        },
        {
          "title": "Transporte",
          "body": "NVMe over PCIe define el transporte PCIe; NVMe también existe sobre fabrics en otros contextos."
        },
        {
          "title": "Capas",
          "body": "Un SSD M.2 puede usar NVMe o SATA según diseño; “M.2 NVMe” combina factor de forma y protocolo."
        }
      ],
      "commonErrors": [
        "Llamar NVMe “tipo de memoria flash”.",
        "Suponer que todos los NVMe tienen la misma latencia."
      ],
      "connections": [
        "Bloque 014: PCIe/drivers.",
        "Bloque 073: almacenamiento a escala."
      ]
    },
    "example": {
      "problem": "Un dispositivo es M.2. ¿Eso demuestra por sí solo que use NVMe?",
      "steps": [
        [
          "Capa",
          "M.2 describe factor de forma/conectorización."
        ],
        [
          "Protocolo",
          "Puede haber dispositivos M.2 que usen SATA."
        ]
      ],
      "answer": "No."
    },
    "check": {
      "question": "¿NVMe usa conceptualmente colas de submission y completion?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Es una pieza central del modelo NVMe."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿M.2 es exactamente lo mismo que NVMe? sí/no",
        "answer": "no",
        "hint": "Factor de forma vs protocolo."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿NVMe puede usar PCIe como transporte? sí/no",
        "answer": "si",
        "hint": "NVMe over PCIe."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Aumentar queue depth garantiza siempre más throughput? sí/no",
        "answer": "no",
        "hint": "Puede saturar o aumentar latencia."
      }
    ]
  }
});
