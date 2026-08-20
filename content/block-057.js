/**
 * BLOQUE 057 — ALGORITMOS Y ESTRUCTURAS DE DATOS
 *
 * Regla editorial: una estructura se elige por invariantes y operaciones;
 * una complejidad se declara junto con modelo, caso y tamaño de entrada.
 */
window.LEARNING_PATHS[57] = {
  "level": "Experto práctico",
  "estimatedHours": 162,
  "description": "Algoritmos y estructuras de datos desde análisis asintótico hasta grafos, hashing, árboles y estrategias de diseño.",
  "outcomes": [
    "Analizar tiempo y memoria declarando modelo, tamaño de entrada, casos y supuestos.",
    "Elegir estructuras por operaciones, invariantes, locality y costes reales, no por popularidad.",
    "Implementar y verificar arrays dinámicos, listas, stacks, queues, hash tables, trees, heaps, tries y grafos.",
    "Diseñar soluciones con sorting/searching, dynamic programming, greedy y algoritmos de grafos, justificando cuándo son correctas."
  ],
  "modules": [
    {
      "id": "m1-complexity-sequential",
      "title": "Coste y estructuras secuenciales",
      "description": "Complejidad, arrays, listas, stacks y queues",
      "lessons": [
        "algo-time-complexity",
        "algo-space-complexity",
        "algo-big-o",
        "algo-arrays",
        "algo-linked-lists",
        "algo-stacks",
        "algo-queues"
      ]
    },
    {
      "id": "m2-indexed-trees",
      "title": "Indexación y jerarquías",
      "description": "Hashing, trees, BST, heaps y tries",
      "lessons": [
        "algo-hash-tables",
        "algo-trees",
        "algo-bst",
        "algo-heaps",
        "algo-tries"
      ]
    },
    {
      "id": "m3-graphs-order",
      "title": "Grafos, ordenación y búsqueda",
      "description": "Representaciones, sorting y searching",
      "lessons": [
        "algo-graphs",
        "algo-sorting",
        "algo-searching"
      ]
    },
    {
      "id": "m4-design",
      "title": "Diseño algorítmico",
      "description": "DP, greedy y algoritmos de grafos",
      "lessons": [
        "algo-dynamic-programming",
        "algo-greedy",
        "algo-graph-algorithms"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "algo-time-complexity": {
    "id": "algo-time-complexity",
    "courseId": 57,
    "title": "Complejidad temporal: contar trabajo, no cronómetro",
    "shortTitle": "Complejidad temporal",
    "duration": 90,
    "objective": "Modelar cómo crece el trabajo de un algoritmo respecto al tamaño de entrada y distinguir coste asintótico, caso y constantes.",
    "summary": [
      "La complejidad temporal modela el crecimiento del número de operaciones relevantes con el tamaño de entrada; no es una medición de segundos en una máquina concreta.",
      "Declara qué representa n antes de analizar.",
      "Distingue worst, average y amortized cost cuando cambien la conclusión."
    ],
    "concept": "La complejidad temporal modela el crecimiento del número de operaciones relevantes con el tamaño de entrada; no es una medición de segundos en una máquina concreta.",
    "rules": [
      "Declara qué representa n antes de analizar.",
      "Distingue worst, average y amortized cost cuando cambien la conclusión.",
      "No confundas menor Big O con menor tiempo real para todo tamaño."
    ],
    "deep": {
      "intro": "Modelar cómo crece el trabajo de un algoritmo respecto al tamaño de entrada y distinguir coste asintótico, caso y constantes.",
      "sections": [
        {
          "title": "Modelo de coste",
          "body": "Elegir una operación dominante y expresar su frecuencia permite comparar algoritmos sin fijar una CPU concreta."
        },
        {
          "title": "Casos",
          "body": "Best, average y worst case pueden diferir mucho; una estructura puede ofrecer O(1) amortizado y picos O(n)."
        },
        {
          "title": "Asintótica",
          "body": "La notación asintótica describe crecimiento para n grande y omite constantes, no el trabajo exacto."
        },
        {
          "title": "Medición",
          "body": "Benchmarking complementa el análisis porque caches, branch prediction, allocation y constantes importan."
        }
      ]
    },
    "example": {
      "problem": "Un bucle realiza 7 operaciones por elemento para n=1200. Operaciones del modelo.",
      "steps": [
        "7·1200 = 8400."
      ],
      "solution": "8400"
    },
    "check": {
      "question": "¿O(n) garantiza ser más rápido que O(n log n) para todo n y toda implementación?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "La complejidad temporal modela el crecimiento del número de operaciones relevantes con el tamaño de entrada; no es una medición de segundos en una máquina concreta."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Big O mide segundos exactos? sí/no",
        "answer": "no",
        "hint": "Modela crecimiento, no reloj."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "7 operaciones por elemento para n=1200. Total.",
        "answer": "8400",
        "hint": "7·1200."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un coste amortizado O(1) prohíbe operaciones individuales O(n)? sí/no",
        "answer": "no",
        "hint": "Amortizado distribuye picos sobre una secuencia."
      }
    ]
  },
  "algo-space-complexity": {
    "id": "algo-space-complexity",
    "courseId": 57,
    "title": "Complejidad espacial: memoria total, auxiliar y profundidad",
    "shortTitle": "Complejidad espacial",
    "duration": 90,
    "objective": "Analizar memoria adicional, representación de entrada y stack sin confundir espacio auxiliar con memoria total.",
    "summary": [
      "La complejidad espacial describe cómo crece la memoria requerida; conviene distinguir memoria de entrada, salida, auxiliar y stack de recursión.",
      "Declara si analizas espacio total o auxiliar.",
      "Cuenta profundidad recursiva cuando consume stack."
    ],
    "concept": "La complejidad espacial describe cómo crece la memoria requerida; conviene distinguir memoria de entrada, salida, auxiliar y stack de recursión.",
    "rules": [
      "Declara si analizas espacio total o auxiliar.",
      "Cuenta profundidad recursiva cuando consume stack.",
      "No llames in-place a un algoritmo que esconde O(n) memoria en otra estructura."
    ],
    "deep": {
      "intro": "Analizar memoria adicional, representación de entrada y stack sin confundir espacio auxiliar con memoria total.",
      "sections": [
        {
          "title": "Capas",
          "body": "Entrada, salida, buffers, tablas, heap y stack pueden contribuir de forma distinta."
        },
        {
          "title": "Auxiliar",
          "body": "Espacio auxiliar excluye normalmente la entrada y puede ser O(1) aunque el conjunto de datos ocupe O(n)."
        },
        {
          "title": "Recursión",
          "body": "Una llamada recursiva por nivel puede convertir un algoritmo aparentemente sin buffers en O(h) stack."
        },
        {
          "title": "Trade-offs",
          "body": "Precomputar o cachear puede gastar memoria para reducir tiempo; el análisis debe hacer visible ese intercambio."
        }
      ]
    },
    "example": {
      "problem": "Array auxiliar de 4096 enteros de 4 bytes. Bytes.",
      "steps": [
        "4096·4 = 16384 bytes."
      ],
      "solution": "16384"
    },
    "check": {
      "question": "¿Espacio auxiliar y memoria total significan siempre lo mismo?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "La complejidad espacial describe cómo crece la memoria requerida; conviene distinguir memoria de entrada, salida, auxiliar y stack de recursión."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El stack de recursión cuenta como memoria? sí/no",
        "answer": "si",
        "hint": "Es estado necesario para ejecutar."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "4096 enteros de 4 bytes. Bytes.",
        "answer": "16384",
        "hint": "4096·4."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿O(1) auxiliar significa que la entrada ocupa O(1)? sí/no",
        "answer": "no",
        "hint": "La entrada puede crecer con n."
      }
    ]
  },
  "algo-big-o": {
    "id": "algo-big-o",
    "courseId": 57,
    "title": "Big O, Ω y Θ: cotas sin mitología",
    "shortTitle": "Big O",
    "duration": 90,
    "objective": "Usar notación asintótica correctamente y distinguir cota superior, inferior y ajustada.",
    "summary": [
      "O(g(n)) es una cota asintótica superior; Ω(g(n)) una inferior y Θ(g(n)) una cota ajustada cuando ambas coinciden.",
      "Big O no significa automáticamente worst case.",
      "No descartes log bases en análisis exacto, aunque sean constantes asintóticamente."
    ],
    "concept": "O(g(n)) es una cota asintótica superior; Ω(g(n)) una inferior y Θ(g(n)) una cota ajustada cuando ambas coinciden.",
    "rules": [
      "Big O no significa automáticamente worst case.",
      "No descartes log bases en análisis exacto, aunque sean constantes asintóticamente.",
      "Usa Θ cuando conoces una cota ajustada, no solo O por costumbre."
    ],
    "deep": {
      "intro": "Usar notación asintótica correctamente y distinguir cota superior, inferior y ajustada.",
      "sections": [
        {
          "title": "Cotas",
          "body": "O, Ω y Θ describen familias de crecimiento y requieren constantes y un umbral n₀."
        },
        {
          "title": "Dominancia",
          "body": "En 4n²+20n+9, el término cuadrático domina asintóticamente."
        },
        {
          "title": "Logaritmos",
          "body": "Cambiar la base de un logaritmo multiplica por una constante, así que O(log₂n)=O(log₁₀n)."
        },
        {
          "title": "No es caso",
          "body": "Worst-case y Big O son ejes distintos: puedes dar O para best, average o worst case."
        }
      ]
    },
    "example": {
      "problem": "Simplifica asintóticamente 6n³ + 40n² + 2.",
      "steps": [
        "El término dominante es n³."
      ],
      "solution": "O(n^3)"
    },
    "check": {
      "question": "¿Big O significa por definición 'peor caso'?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "O(g(n)) es una cota asintótica superior; Ω(g(n)) una inferior y Θ(g(n)) una cota ajustada cuando ambas coinciden."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Θ(n) es también O(n)? sí/no",
        "answer": "si",
        "hint": "Una cota ajustada implica cota superior."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Término dominante de 6n³+40n²+2.",
        "answer": "n^3",
        "hint": "El grado mayor domina."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿O(log2 n) y O(log10 n) son clases distintas? sí/no",
        "answer": "no",
        "hint": "Difieren por factor constante."
      }
    ]
  },
  "algo-arrays": {
    "id": "algo-arrays",
    "courseId": 57,
    "title": "Arrays: contigüidad, acceso y locality",
    "shortTitle": "Arrays",
    "duration": 90,
    "objective": "Relacionar contigüidad, indexación O(1), inserciones, capacidad y locality con el coste real.",
    "summary": [
      "Un array almacena elementos contiguos y permite localizar el elemento i mediante una dirección base más un desplazamiento calculable.",
      "Acceso por índice es O(1) bajo el modelo RAM, no búsqueda por valor.",
      "Insertar en medio puede requerir desplazar O(n) elementos."
    ],
    "concept": "Un array almacena elementos contiguos y permite localizar el elemento i mediante una dirección base más un desplazamiento calculable.",
    "rules": [
      "Acceso por índice es O(1) bajo el modelo RAM, no búsqueda por valor.",
      "Insertar en medio puede requerir desplazar O(n) elementos.",
      "Capacidad reservada y longitud lógica son conceptos distintos en arrays dinámicos."
    ],
    "deep": {
      "intro": "Relacionar contigüidad, indexación O(1), inserciones, capacidad y locality con el coste real.",
      "sections": [
        {
          "title": "Direccionamiento",
          "body": "Para elementos de tamaño s, dirección(i)=base+i·s bajo layout contiguo."
        },
        {
          "title": "Locality",
          "body": "Recorrer secuencialmente suele aprovechar caches y prefetch mejor que seguir punteros dispersos."
        },
        {
          "title": "Inserciones",
          "body": "Mover un sufijo de elementos hace caras las inserciones/borrados intermedios."
        },
        {
          "title": "Dynamic arrays",
          "body": "Crecimiento geométrico permite append amortizado O(1), aunque algunas expansiones copien O(n)."
        }
      ]
    },
    "example": {
      "problem": "Array de 32-bit. Offset en bytes del índice 250.",
      "steps": [
        "250·4 = 1000 bytes."
      ],
      "solution": "1000"
    },
    "check": {
      "question": "¿Acceder a array[i] implica buscar linealmente desde el principio?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Un array almacena elementos contiguos y permite localizar el elemento i mediante una dirección base más un desplazamiento calculable."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un array suele ser contiguo? sí/no",
        "answer": "si",
        "hint": "Esa es su propiedad estructural central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Índice 250, elementos de 4 bytes. Offset.",
        "answer": "1000",
        "hint": "250·4."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Append amortizado O(1) significa que ninguna expansión cuesta O(n)? sí/no",
        "answer": "no",
        "hint": "Algunas expansiones copian."
      }
    ]
  },
  "algo-linked-lists": {
    "id": "algo-linked-lists",
    "courseId": 57,
    "title": "Linked lists: enlaces, ownership y coste de locality",
    "shortTitle": "Linked lists",
    "duration": 90,
    "objective": "Entender listas enlazadas como nodos conectados, sus costes de inserción y su peor locality frente a arrays.",
    "summary": [
      "Una linked list representa una secuencia mediante nodos que almacenan datos y enlaces; localizar la posición i requiere seguir enlaces desde una referencia conocida.",
      "Inserción O(1) requiere tener ya el nodo/posición adecuada.",
      "Buscar la posición i sigue siendo O(n) en una lista simple."
    ],
    "concept": "Una linked list representa una secuencia mediante nodos que almacenan datos y enlaces; localizar la posición i requiere seguir enlaces desde una referencia conocida.",
    "rules": [
      "Inserción O(1) requiere tener ya el nodo/posición adecuada.",
      "Buscar la posición i sigue siendo O(n) en una lista simple.",
      "Cuenta overhead de punteros, allocator y cache misses en sistemas reales."
    ],
    "deep": {
      "intro": "Entender listas enlazadas como nodos conectados, sus costes de inserción y su peor locality frente a arrays.",
      "sections": [
        {
          "title": "Estructura",
          "body": "Singly y doubly linked lists intercambian más enlaces por navegación bidireccional."
        },
        {
          "title": "Inserción",
          "body": "Relinkear unos pocos punteros es O(1) si la posición ya está localizada."
        },
        {
          "title": "Búsqueda",
          "body": "Sin índice auxiliar, el acceso posicional requiere caminar nodo a nodo."
        },
        {
          "title": "Locality",
          "body": "Nodos asignados por separado pueden dispersarse por memoria y degradar locality pese a buenos costes asintóticos de edición."
        }
      ]
    },
    "example": {
      "problem": "Lista simple con 300 nodos; en peor caso se inspeccionan todos para buscar una clave ausente. Nodos.",
      "steps": [
        "300 nodos."
      ],
      "solution": "300"
    },
    "check": {
      "question": "¿Insertar en una lista es O(1) incluso si antes debes buscar la posición durante O(n)?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Una linked list representa una secuencia mediante nodos que almacenan datos y enlaces; localizar la posición i requiere seguir enlaces desde una referencia conocida."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una lista simple permite acceso aleatorio O(1) por índice? sí/no",
        "answer": "no",
        "hint": "Hay que seguir enlaces."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Peor caso de búsqueda en 300 nodos.",
        "answer": "300",
        "hint": "Se visitan todos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una doubly linked list elimina el overhead de punteros? sí/no",
        "answer": "no",
        "hint": "Añade un enlace anterior."
      }
    ]
  },
  "algo-stacks": {
    "id": "algo-stacks",
    "courseId": 57,
    "title": "Stacks: LIFO, llamadas y parsing",
    "shortTitle": "Stacks",
    "duration": 90,
    "objective": "Aplicar la abstracción LIFO a llamadas, parsing, undo y algoritmos iterativos.",
    "summary": [
      "Un stack ofrece push/pop sobre un único extremo y sigue una política LIFO: el último elemento insertado es el primero en salir.",
      "Push/pop son O(1) en implementaciones habituales.",
      "No confundas stack ADT con stack de llamadas del sistema."
    ],
    "concept": "Un stack ofrece push/pop sobre un único extremo y sigue una política LIFO: el último elemento insertado es el primero en salir.",
    "rules": [
      "Push/pop son O(1) en implementaciones habituales.",
      "No confundas stack ADT con stack de llamadas del sistema.",
      "Comprueba underflow/overflow según la representación concreta."
    ],
    "deep": {
      "intro": "Aplicar la abstracción LIFO a llamadas, parsing, undo y algoritmos iterativos.",
      "sections": [
        {
          "title": "ADT",
          "body": "Las operaciones centrales son push, pop, top/peek y empty."
        },
        {
          "title": "Call stack",
          "body": "Frames de llamadas forman una pila, pero incluyen retorno, registros y variables según ABI/runtime."
        },
        {
          "title": "Parsing",
          "body": "Paréntesis y DFS iterativo usan stacks porque la tarea pendiente más reciente se resuelve primero."
        },
        {
          "title": "Representación",
          "body": "Un stack puede implementarse sobre array dinámico o linked list; ADT e implementación son capas distintas."
        }
      ]
    },
    "example": {
      "problem": "Push A,B,C,D y luego dos pop. Elemento en top.",
      "steps": [
        "Salen D y C; queda B arriba."
      ],
      "solution": "B"
    },
    "check": {
      "question": "¿LIFO significa que sale primero el elemento más antiguo?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Un stack ofrece push/pop sobre un único extremo y sigue una política LIFO: el último elemento insertado es el primero en salir."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Stack sigue LIFO? sí/no",
        "answer": "si",
        "hint": "Último en entrar, primero en salir."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Push 5 elementos y pop 2. Elementos restantes.",
        "answer": "3",
        "hint": "5-2."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Stack ADT exige linked list? sí/no",
        "answer": "no",
        "hint": "Puede usar varias representaciones."
      }
    ]
  },
  "algo-queues": {
    "id": "algo-queues",
    "courseId": 57,
    "title": "Queues: FIFO, ring buffers y backpressure",
    "shortTitle": "Queues",
    "duration": 90,
    "objective": "Usar FIFO para scheduling y streaming, y distinguir cola lógica de buffer circular limitado.",
    "summary": [
      "Una queue entrega elementos en orden FIFO: enqueue añade al final lógico y dequeue retira del frente.",
      "Una cola eficiente no desplaza todos los elementos en cada dequeue.",
      "Capacidad finita exige política de backpressure, drop o bloqueo."
    ],
    "concept": "Una queue entrega elementos en orden FIFO: enqueue añade al final lógico y dequeue retira del frente.",
    "rules": [
      "Una cola eficiente no desplaza todos los elementos en cada dequeue.",
      "Capacidad finita exige política de backpressure, drop o bloqueo.",
      "FIFO describe orden, no prioridad."
    ],
    "deep": {
      "intro": "Usar FIFO para scheduling y streaming, y distinguir cola lógica de buffer circular limitado.",
      "sections": [
        {
          "title": "ADT",
          "body": "enqueue/dequeue definen una política FIFO."
        },
        {
          "title": "Ring buffer",
          "body": "Head/tail sobre un array circular evitan mover el contenido después de cada dequeue."
        },
        {
          "title": "Sistemas",
          "body": "Queues desacoplan productor y consumidor, pero no eliminan diferencias sostenidas de throughput."
        },
        {
          "title": "Backpressure",
          "body": "Si λproductor>λconsumidor durante suficiente tiempo, la cola finita acabará llena."
        }
      ]
    },
    "example": {
      "problem": "Productor 900 msg/s, consumidor 750 msg/s durante 4 s. Crecimiento ideal de cola.",
      "steps": [
        "(900-750)·4 = 600."
      ],
      "solution": "600"
    },
    "check": {
      "question": "¿FIFO implica que el elemento más nuevo sale primero?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Una queue entrega elementos en orden FIFO: enqueue añade al final lógico y dequeue retira del frente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Queue estándar sigue FIFO? sí/no",
        "answer": "si",
        "hint": "Primero en entrar, primero en salir."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Diferencia 150 msg/s durante 4 s.",
        "answer": "600",
        "hint": "150·4."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una cola infinita resuelve un productor permanentemente más rápido en memoria finita? sí/no",
        "answer": "no",
        "hint": "La acumulación crece sin límite."
      }
    ]
  },
  "algo-hash-tables": {
    "id": "algo-hash-tables",
    "courseId": 57,
    "title": "Hash tables: buckets, colisiones y load factor",
    "shortTitle": "Hash tables",
    "duration": 90,
    "objective": "Entender hashing, colisiones, factor de carga y por qué O(1) esperado no equivale a O(1) garantizado.",
    "summary": [
      "Una hash table usa una función hash para seleccionar una región/bucket y resuelve colisiones mediante una estrategia como chaining u open addressing.",
      "Colisión no significa hash criptográficamente roto.",
      "O(1) lookup suele ser esperado/amortizado bajo supuestos, no worst-case universal."
    ],
    "concept": "Una hash table usa una función hash para seleccionar una región/bucket y resuelve colisiones mediante una estrategia como chaining u open addressing.",
    "rules": [
      "Colisión no significa hash criptográficamente roto.",
      "O(1) lookup suele ser esperado/amortizado bajo supuestos, no worst-case universal.",
      "Controla load factor y calidad/distribución del hash."
    ],
    "deep": {
      "intro": "Entender hashing, colisiones, factor de carga y por qué O(1) esperado no equivale a O(1) garantizado.",
      "sections": [
        {
          "title": "Hashing",
          "body": "El hash transforma una clave a un valor que se mapea al número finito de buckets."
        },
        {
          "title": "Colisiones",
          "body": "Dos claves diferentes pueden ocupar el mismo bucket; la tabla debe resolverlo correctamente."
        },
        {
          "title": "Load factor",
          "body": "α=n/m relaciona entradas y buckets/capacidad y afecta probing o longitud de cadenas."
        },
        {
          "title": "Adversarial",
          "body": "Entradas elegidas maliciosamente o un hash pobre pueden degradar rendimiento; seguridad y estructura de datos son problemas relacionados pero distintos."
        }
      ]
    },
    "example": {
      "problem": "750 entradas en 1000 buckets. Load factor.",
      "steps": [
        "α=750/1000=0.75."
      ],
      "solution": "0.75"
    },
    "check": {
      "question": "¿Una colisión en una hash table implica una vulnerabilidad criptográfica?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Una hash table usa una función hash para seleccionar una región/bucket y resuelve colisiones mediante una estrategia como chaining u open addressing."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Dos claves pueden compartir bucket? sí/no",
        "answer": "si",
        "hint": "Eso es una colisión de tabla."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "750 entradas/1000 buckets. α.",
        "answer": "0.75",
        "hint": "750/1000."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Lookup en hash table es O(1) worst-case universal? sí/no",
        "answer": "no",
        "hint": "Puede degradarse con colisiones."
      }
    ]
  },
  "algo-trees": {
    "id": "algo-trees",
    "courseId": 57,
    "title": "Trees: jerarquía, profundidad y recorridos",
    "shortTitle": "Trees",
    "duration": 90,
    "objective": "Razonar sobre árboles mediante raíz, hijos, altura, profundidad y recorridos.",
    "summary": [
      "Un tree es un grafo conectado y acíclico; al enraizarlo aparecen relaciones padre/hijo, profundidad y subárboles.",
      "No confundas profundidad de nodo con altura del árbol.",
      "DFS preorder/inorder/postorder dependen del orden de visita."
    ],
    "concept": "Un tree es un grafo conectado y acíclico; al enraizarlo aparecen relaciones padre/hijo, profundidad y subárboles.",
    "rules": [
      "No confundas profundidad de nodo con altura del árbol.",
      "DFS preorder/inorder/postorder dependen del orden de visita.",
      "Un árbol general no garantiza búsqueda eficiente por clave."
    ],
    "deep": {
      "intro": "Razonar sobre árboles mediante raíz, hijos, altura, profundidad y recorridos.",
      "sections": [
        {
          "title": "Estructura",
          "body": "Con n nodos, un árbol no vacío tiene n-1 aristas."
        },
        {
          "title": "Altura",
          "body": "La forma del árbol determina profundidad de operaciones; balancear puede ser crucial."
        },
        {
          "title": "Recorridos",
          "body": "DFS y BFS visitan la estructura en órdenes distintos y sirven a problemas distintos."
        },
        {
          "title": "Representación",
          "body": "Adjacency lists, arrays de hijos o parent pointers cambian memoria y operaciones disponibles."
        }
      ]
    },
    "example": {
      "problem": "Árbol con 250 nodos. Número de aristas.",
      "steps": [
        "n-1=249."
      ],
      "solution": "249"
    },
    "check": {
      "question": "¿Todo árbol permite buscar cualquier clave en O(log n)?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Un tree es un grafo conectado y acíclico; al enraizarlo aparecen relaciones padre/hijo, profundidad y subárboles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un árbol de n>0 nodos tiene n-1 aristas? sí/no",
        "answer": "si",
        "hint": "Propiedad de tree conectado y acíclico."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "250 nodos. Aristas.",
        "answer": "249",
        "hint": "250-1."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿BFS y DFS visitan necesariamente en el mismo orden? sí/no",
        "answer": "no",
        "hint": "Usan políticas distintas."
      }
    ]
  },
  "algo-bst": {
    "id": "algo-bst",
    "courseId": 57,
    "title": "Binary Search Trees: orden, balance y degeneración",
    "shortTitle": "BST",
    "duration": 90,
    "objective": "Usar el invariante de orden de un BST y analizar cómo su altura controla búsqueda, inserción y borrado.",
    "summary": [
      "En un BST, las claves del subárbol izquierdo y derecho respetan un invariante de orden definido; el coste de las operaciones es O(h), donde h es la altura.",
      "BST no significa automáticamente balanceado.",
      "Una inserción ordenada puede degenerar un BST simple a una cadena."
    ],
    "concept": "En un BST, las claves del subárbol izquierdo y derecho respetan un invariante de orden definido; el coste de las operaciones es O(h), donde h es la altura.",
    "rules": [
      "BST no significa automáticamente balanceado.",
      "Una inserción ordenada puede degenerar un BST simple a una cadena.",
      "Define cómo manejas claves duplicadas."
    ],
    "deep": {
      "intro": "Usar el invariante de orden de un BST y analizar cómo su altura controla búsqueda, inserción y borrado.",
      "sections": [
        {
          "title": "Invariante",
          "body": "Cada comparación elige un subárbol según la relación de orden."
        },
        {
          "title": "Altura",
          "body": "En un árbol balanceado h≈log n; en el peor caso h≈n."
        },
        {
          "title": "Recorrido",
          "body": "Inorder produce claves ordenadas si el invariante BST se mantiene."
        },
        {
          "title": "Balance",
          "body": "AVL/Red-Black añaden invariantes para mantener altura logarítmica a cambio de rotaciones/metadata."
        }
      ]
    },
    "example": {
      "problem": "BST degenerado con 1000 nodos. Comparaciones worst-case de búsqueda ausente aproximadas.",
      "steps": [
        "Puede recorrer los 1000 nodos."
      ],
      "solution": "1000"
    },
    "check": {
      "question": "¿Todo BST tiene altura O(log n)?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "En un BST, las claves del subárbol izquierdo y derecho respetan un invariante de orden definido; el coste de las operaciones es O(h), donde h es la altura."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Inorder de un BST válido produce orden de claves? sí/no",
        "answer": "si",
        "hint": "Por el invariante."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Peor búsqueda en BST degenerado de 1000 nodos.",
        "answer": "1000",
        "hint": "Puede comportarse como lista."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Balancear un BST puede requerir rotaciones? sí/no",
        "answer": "si",
        "hint": "AVL/RB reestructuran localmente."
      }
    ]
  },
  "algo-heaps": {
    "id": "algo-heaps",
    "courseId": 57,
    "title": "Heaps: prioridad parcial y heapify",
    "shortTitle": "Heaps",
    "duration": 90,
    "objective": "Distinguir heap de árbol totalmente ordenado y aplicar insert, extract y heapify con sus costes.",
    "summary": [
      "Un binary heap mantiene una relación de prioridad entre cada nodo y sus hijos, suficiente para acceder al mínimo/máximo sin ordenar todos los elementos.",
      "Heap property no implica orden total.",
      "Peek min/max es O(1), insert y extract suelen ser O(log n)."
    ],
    "concept": "Un binary heap mantiene una relación de prioridad entre cada nodo y sus hijos, suficiente para acceder al mínimo/máximo sin ordenar todos los elementos.",
    "rules": [
      "Heap property no implica orden total.",
      "Peek min/max es O(1), insert y extract suelen ser O(log n).",
      "Build-heap bottom-up es O(n), no O(n log n) necesariamente."
    ],
    "deep": {
      "intro": "Distinguir heap de árbol totalmente ordenado y aplicar insert, extract y heapify con sus costes.",
      "sections": [
        {
          "title": "Representación",
          "body": "Un heap binario completo cabe naturalmente en un array con relaciones índice padre/hijos."
        },
        {
          "title": "Sift",
          "body": "Inserción usa sift-up; extracción de raíz suele usar sift-down."
        },
        {
          "title": "Orden parcial",
          "body": "Solo se garantiza la relación padre-hijo, no que recorrer el array produzca secuencia ordenada."
        },
        {
          "title": "Heapify",
          "body": "Construcción bottom-up aprovecha que la mayoría de nodos están cerca de las hojas y cuesta Θ(n)."
        }
      ]
    },
    "example": {
      "problem": "Heap array 0-indexed. Hijos del índice i=12.",
      "steps": [
        "left=2i+1=25; right=2i+2=26."
      ],
      "solution": "25,26"
    },
    "check": {
      "question": "¿El array interno de un min-heap está completamente ordenado?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Un binary heap mantiene una relación de prioridad entre cada nodo y sus hijos, suficiente para acceder al mínimo/máximo sin ordenar todos los elementos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Peek de la raíz de un heap es O(1)? sí/no",
        "answer": "si",
        "hint": "La prioridad extrema está en raíz."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Hijos 0-indexed de i=12.",
        "answer": "25,26",
        "hint": "2i+1 y 2i+2."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Build-heap bottom-up es Θ(n)? sí/no",
        "answer": "si",
        "hint": "No equivale a insertar n veces desde cero."
      }
    ]
  },
  "algo-tries": {
    "id": "algo-tries",
    "courseId": 57,
    "title": "Tries: prefijos, alfabetos y memoria",
    "shortTitle": "Tries",
    "duration": 90,
    "objective": "Usar tries para claves secuenciales/prefijos y analizar coste según longitud de clave y representación de hijos.",
    "summary": [
      "Un trie representa claves por caminos etiquetados; buscar una clave de longitud L cuesta típicamente O(L) pasos de caracteres/símbolos, independientemente del número total de claves bajo el modelo adecuado.",
      "O(L) no significa O(1) si L crece.",
      "La representación de hijos domina memoria en alfabetos grandes."
    ],
    "concept": "Un trie representa claves por caminos etiquetados; buscar una clave de longitud L cuesta típicamente O(L) pasos de caracteres/símbolos, independientemente del número total de claves bajo el modelo adecuado.",
    "rules": [
      "O(L) no significa O(1) si L crece.",
      "La representación de hijos domina memoria en alfabetos grandes.",
      "Un trie comparte prefijos, no sufijos arbitrarios por defecto."
    ],
    "deep": {
      "intro": "Usar tries para claves secuenciales/prefijos y analizar coste según longitud de clave y representación de hijos.",
      "sections": [
        {
          "title": "Prefijos",
          "body": "Claves con inicio común comparten nodos, lo que hace naturales prefix queries."
        },
        {
          "title": "Complejidad",
          "body": "Lookup depende de la longitud de la clave y del coste de localizar cada hijo."
        },
        {
          "title": "Memoria",
          "body": "Arrays de tamaño |Σ| por nodo son rápidos pero pueden desperdiciar memoria; maps o estructuras compactas cambian el trade-off."
        },
        {
          "title": "Compresión",
          "body": "Radix/Patricia tries comprimen cadenas de nodos con un solo hijo."
        }
      ]
    },
    "example": {
      "problem": "Insertar palabra de 18 símbolos en trie vacío crea como máximo cuántos nodos nuevos, ignorando raíz.",
      "steps": [
        "Uno por símbolo: 18."
      ],
      "solution": "18"
    },
    "check": {
      "question": "¿El coste de buscar en un trie depende normalmente de la longitud de la clave?",
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
          "Solo si n es par",
          false
        ]
      ],
      "feedback": "Un trie representa claves por caminos etiquetados; buscar una clave de longitud L cuesta típicamente O(L) pasos de caracteres/símbolos, independientemente del número total de claves bajo el modelo adecuado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Trie comparte prefijos? sí/no",
        "answer": "si",
        "hint": "Es su estructura central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Clave de longitud 18 en trie vacío. Máximo nodos nuevos.",
        "answer": "18",
        "hint": "Uno por símbolo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Array de 256 hijos por nodo siempre es óptimo en memoria? sí/no",
        "answer": "no",
        "hint": "Puede ser muy disperso."
      }
    ]
  },
  "algo-graphs": {
    "id": "algo-graphs",
    "courseId": 57,
    "title": "Graphs: vértices, aristas y representaciones",
    "shortTitle": "Graphs",
    "duration": 90,
    "objective": "Modelar relaciones generales con grafos dirigidos/no dirigidos, ponderados y representaciones adecuadas.",
    "summary": [
      "Un graph G=(V,E) modela entidades y relaciones; dirección, peso, multiplicidad y representación forman parte del contrato del problema.",
      "No asumas que todo grafo es conectado.",
      "Adjacency matrix y adjacency list tienen costes distintos."
    ],
    "concept": "Un graph G=(V,E) modela entidades y relaciones; dirección, peso, multiplicidad y representación forman parte del contrato del problema.",
    "rules": [
      "No asumas que todo grafo es conectado.",
      "Adjacency matrix y adjacency list tienen costes distintos.",
      "En grafo no dirigido, la suma de grados es 2|E|."
    ],
    "deep": {
      "intro": "Modelar relaciones generales con grafos dirigidos/no dirigidos, ponderados y representaciones adecuadas.",
      "sections": [
        {
          "title": "Modelo",
          "body": "Vértices y aristas pueden representar redes, dependencias, mapas, estados o flujo."
        },
        {
          "title": "Dirección",
          "body": "A→B no implica B→A en un grafo dirigido."
        },
        {
          "title": "Representación",
          "body": "Matriz cuesta Θ(V²) memoria; listas suelen costar Θ(V+E) para grafos dispersos."
        },
        {
          "title": "Propiedades",
          "body": "Conectividad, ciclos, componentes y pesos determinan qué algoritmos son apropiados."
        }
      ]
    },
    "example": {
      "problem": "Grafo no dirigido con 40 aristas. Suma de grados.",
      "steps": [
        "Handshake lemma: 2E=80."
      ],
      "solution": "80"
    },
    "check": {
      "question": "¿Una arista A→B en un grafo dirigido implica automáticamente B→A?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Un graph G=(V,E) modela entidades y relaciones; dirección, peso, multiplicidad y representación forman parte del contrato del problema."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La suma de grados en no dirigido es 2E? sí/no",
        "answer": "si",
        "hint": "Cada arista toca dos extremos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "40 aristas no dirigidas. Suma de grados.",
        "answer": "80",
        "hint": "2·40."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Adjacency matrix usa Θ(V²) memoria? sí/no",
        "answer": "si",
        "hint": "Reserva relación para cada par."
      }
    ]
  },
  "algo-sorting": {
    "id": "algo-sorting",
    "courseId": 57,
    "title": "Sorting: comparaciones, estabilidad y límites",
    "shortTitle": "Sorting",
    "duration": 90,
    "objective": "Comparar algoritmos de ordenación por coste, estabilidad, memoria y supuestos sobre las claves.",
    "summary": [
      "Sorting reorganiza elementos según un orden; algoritmos comparison-based y no comparison-based tienen límites y supuestos diferentes.",
      "No declares un sort 'mejor' sin especificar tamaño, datos, memoria y estabilidad.",
      "Comparison sorting tiene cota Ω(n log n) en el modelo general de comparaciones."
    ],
    "concept": "Sorting reorganiza elementos según un orden; algoritmos comparison-based y no comparison-based tienen límites y supuestos diferentes.",
    "rules": [
      "No declares un sort 'mejor' sin especificar tamaño, datos, memoria y estabilidad.",
      "Comparison sorting tiene cota Ω(n log n) en el modelo general de comparaciones.",
      "Counting/radix sort escapan a esa cota usando estructura adicional de las claves."
    ],
    "deep": {
      "intro": "Comparar algoritmos de ordenación por coste, estabilidad, memoria y supuestos sobre las claves.",
      "sections": [
        {
          "title": "Comparación",
          "body": "Merge sort, heapsort y quicksort comparan claves pero difieren en worst-case, memoria y locality."
        },
        {
          "title": "Estabilidad",
          "body": "Un sort estable conserva el orden relativo de elementos con claves iguales."
        },
        {
          "title": "In-place",
          "body": "La definición exacta de memoria auxiliar importa; algunos algoritmos usan buffers O(n)."
        },
        {
          "title": "No comparación",
          "body": "Counting/radix requieren supuestos sobre rango/representación y pueden superar n log n en esos modelos."
        }
      ]
    },
    "example": {
      "problem": "Merge sort divide 1024 elementos a la mitad hasta subarrays de 1. Niveles de división.",
      "steps": [
        "log2(1024)=10."
      ],
      "solution": "10"
    },
    "check": {
      "question": "¿La cota Ω(n log n) de sorting por comparaciones prohíbe counting sort O(n+k)?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Sorting reorganiza elementos según un orden; algoritmos comparison-based y no comparison-based tienen límites y supuestos diferentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un sort estable conserva el orden relativo de claves iguales? sí/no",
        "answer": "si",
        "hint": "Esa es la definición."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "log2(1024).",
        "answer": "10",
        "hint": "2^10=1024."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Quicksort tiene worst-case O(n log n) universal? sí/no",
        "answer": "no",
        "hint": "Puede llegar a O(n²) según pivot/entrada."
      }
    ]
  },
  "algo-searching": {
    "id": "algo-searching",
    "courseId": 57,
    "title": "Searching: lineal, binaria e invariantes",
    "shortTitle": "Searching",
    "duration": 90,
    "objective": "Elegir búsqueda según organización de datos y mantener invariantes correctos en binary search.",
    "summary": [
      "Searching localiza un elemento o posición; binary search reduce a la mitad un rango ordenado manteniendo un invariante sobre dónde puede estar la respuesta.",
      "Binary search requiere una propiedad monotónica/ordenada apropiada.",
      "Define intervalos [lo,hi), [lo,hi] de forma consistente."
    ],
    "concept": "Searching localiza un elemento o posición; binary search reduce a la mitad un rango ordenado manteniendo un invariante sobre dónde puede estar la respuesta.",
    "rules": [
      "Binary search requiere una propiedad monotónica/ordenada apropiada.",
      "Define intervalos [lo,hi), [lo,hi] de forma consistente.",
      "O(log n) comparaciones no incluye necesariamente coste de acceder al elemento en cualquier estructura."
    ],
    "deep": {
      "intro": "Elegir búsqueda según organización de datos y mantener invariantes correctos en binary search.",
      "sections": [
        {
          "title": "Linear search",
          "body": "No requiere orden y cuesta O(n) en peor caso."
        },
        {
          "title": "Binary search",
          "body": "Cada comparación elimina aproximadamente la mitad del rango candidato."
        },
        {
          "title": "Invariantes",
          "body": "Errores off-by-one suelen venir de mezclar convenciones de límites."
        },
        {
          "title": "Lower/upper bound",
          "body": "Buscar primera posición ≥x o >x generaliza más que solo encontrar igualdad."
        }
      ]
    },
    "example": {
      "problem": "Binary search sobre 1,048,576 elementos. log2(n).",
      "steps": [
        "1,048,576=2^20."
      ],
      "solution": "20"
    },
    "check": {
      "question": "¿Binary search funciona correctamente sobre cualquier lista no ordenada?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Searching localiza un elemento o posición; binary search reduce a la mitad un rango ordenado manteniendo un invariante sobre dónde puede estar la respuesta."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Binary search necesita un orden/monotonicidad compatible? sí/no",
        "answer": "si",
        "hint": "La mitad descartada debe ser segura."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "log2(1048576).",
        "answer": "20",
        "hint": "2^20."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Acceso O(log n) por comparaciones garantiza O(log n) en linked list? sí/no",
        "answer": "no",
        "hint": "Acceder al midpoint puede costar."
      }
    ]
  },
  "algo-dynamic-programming": {
    "id": "algo-dynamic-programming",
    "courseId": 57,
    "title": "Dynamic Programming: estado, recurrencia y reutilización",
    "shortTitle": "Dynamic Programming",
    "duration": 90,
    "objective": "Reconocer subproblemas solapados y diseñar estados, transiciones, base cases y orden de evaluación.",
    "summary": [
      "Dynamic programming resuelve problemas mediante estados reutilizables y una recurrencia, almacenando resultados para evitar recomputar subproblemas solapados.",
      "Define el estado antes de escribir la tabla.",
      "Memoization y tabulation son estrategias, no problemas diferentes."
    ],
    "concept": "Dynamic programming resuelve problemas mediante estados reutilizables y una recurrencia, almacenando resultados para evitar recomputar subproblemas solapados.",
    "rules": [
      "Define el estado antes de escribir la tabla.",
      "Memoization y tabulation son estrategias, no problemas diferentes.",
      "DP no garantiza solución polinómica si el espacio de estados es enorme."
    ],
    "deep": {
      "intro": "Reconocer subproblemas solapados y diseñar estados, transiciones, base cases y orden de evaluación.",
      "sections": [
        {
          "title": "Estado",
          "body": "Un estado debe contener suficiente información para que el futuro dependa solo de él."
        },
        {
          "title": "Recurrencia",
          "body": "Transiciones conectan estados menores con mayores; base cases anclan el cálculo."
        },
        {
          "title": "Memoization",
          "body": "Top-down calcula estados demandados y cachea resultados."
        },
        {
          "title": "Tabulation",
          "body": "Bottom-up elige un orden que garantice dependencias resueltas y puede facilitar reducción de memoria."
        }
      ]
    },
    "example": {
      "problem": "Tabla DP de 800 estados con 6 transiciones O(1) por estado. Transiciones máximas del modelo.",
      "steps": [
        "800·6=4800."
      ],
      "solution": "4800"
    },
    "check": {
      "question": "¿Dynamic programming equivale simplemente a usar recursión?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Dynamic programming resuelve problemas mediante estados reutilizables y una recurrencia, almacenando resultados para evitar recomputar subproblemas solapados."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Memoization guarda subproblemas ya resueltos? sí/no",
        "answer": "si",
        "hint": "Evita recomputación."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "800 estados × 6 transiciones.",
        "answer": "4800",
        "hint": "800·6."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿DP siempre usa O(n) memoria? sí/no",
        "answer": "no",
        "hint": "Depende del número/dimensión de estados."
      }
    ]
  },
  "algo-greedy": {
    "id": "algo-greedy",
    "courseId": 57,
    "title": "Greedy algorithms: elección local y prueba global",
    "shortTitle": "Greedy",
    "duration": 90,
    "objective": "Entender cuándo una elección local puede producir un óptimo global y por qué hacen falta propiedades/pruebas.",
    "summary": [
      "Un algoritmo greedy construye una solución mediante decisiones locales irrevocables; su corrección requiere estructura del problema, no intuición de que 'lo mejor ahora' será lo mejor al final.",
      "Una heurística greedy no es automáticamente un algoritmo exacto.",
      "Busca exchange argument, cut property u otra prueba apropiada."
    ],
    "concept": "Un algoritmo greedy construye una solución mediante decisiones locales irrevocables; su corrección requiere estructura del problema, no intuición de que 'lo mejor ahora' será lo mejor al final.",
    "rules": [
      "Una heurística greedy no es automáticamente un algoritmo exacto.",
      "Busca exchange argument, cut property u otra prueba apropiada.",
      "Un contraejemplo invalida una regla greedy universal."
    ],
    "deep": {
      "intro": "Entender cuándo una elección local puede producir un óptimo global y por qué hacen falta propiedades/pruebas.",
      "sections": [
        {
          "title": "Elección local",
          "body": "La estrategia selecciona una opción según un criterio local y continúa sobre el problema restante."
        },
        {
          "title": "Corrección",
          "body": "Greedy-choice property y optimal substructure aparecen en muchos problemas, pero deben justificarse."
        },
        {
          "title": "Contraejemplos",
          "body": "Coin change con denominaciones arbitrarias muestra que tomar siempre la moneda mayor puede fallar."
        },
        {
          "title": "Relación con DP",
          "body": "Algunos problemas admiten DP exacto pero no una regla greedy correcta; otros permiten ambos con costes distintos."
        }
      ]
    },
    "example": {
      "problem": "Monedas 1,3,4; cantidad 6. Greedy toma 4+1+1: monedas.",
      "steps": [
        "Son 3 monedas; óptimo es 3+3=2, por eso greedy falla."
      ],
      "solution": "3"
    },
    "check": {
      "question": "¿Una estrategia greedy localmente razonable es siempre óptima globalmente?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Un algoritmo greedy construye una solución mediante decisiones locales irrevocables; su corrección requiere estructura del problema, no intuición de que 'lo mejor ahora' será lo mejor al final."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Greedy hace decisiones locales? sí/no",
        "answer": "si",
        "hint": "Ese es el patrón."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Greedy con 1,3,4 para 6 toma 4+1+1. Monedas.",
        "answer": "3",
        "hint": "Cuenta piezas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un contraejemplo basta para refutar una regla greedy universal? sí/no",
        "answer": "si",
        "hint": "Una afirmación universal cae con un caso válido."
      }
    ]
  },
  "algo-graph-algorithms": {
    "id": "algo-graph-algorithms",
    "courseId": 57,
    "title": "Graph algorithms: BFS, DFS, shortest paths, MST y DSU",
    "shortTitle": "Algoritmos de grafos",
    "duration": 90,
    "objective": "Elegir algoritmos de grafos según pesos, dirección y objetivo, y distinguir recorrido, shortest path, MST y conectividad.",
    "summary": [
      "Los algoritmos de grafos explotan propiedades distintas: BFS/DFS recorren, Dijkstra resuelve shortest paths con pesos no negativos, Bellman-Ford admite pesos negativos, y MST optimiza conectividad global en grafos no dirigidos ponderados.",
      "BFS da shortest path por número de aristas solo en grafos no ponderados/equiponderados.",
      "Dijkstra clásico no admite aristas negativas."
    ],
    "concept": "Los algoritmos de grafos explotan propiedades distintas: BFS/DFS recorren, Dijkstra resuelve shortest paths con pesos no negativos, Bellman-Ford admite pesos negativos, y MST optimiza conectividad global en grafos no dirigidos ponderados.",
    "rules": [
      "BFS da shortest path por número de aristas solo en grafos no ponderados/equiponderados.",
      "Dijkstra clásico no admite aristas negativas.",
      "MST y shortest-path tree optimizan objetivos diferentes."
    ],
    "deep": {
      "intro": "Elegir algoritmos de grafos según pesos, dirección y objetivo, y distinguir recorrido, shortest path, MST y conectividad.",
      "sections": [
        {
          "title": "BFS y DFS",
          "body": "Con adjacency lists recorren en O(V+E) y difieren en orden/frontera."
        },
        {
          "title": "Shortest paths",
          "body": "Dijkstra usa prioridades bajo pesos no negativos; Bellman-Ford relaja repetidamente y puede detectar ciclos negativos alcanzables."
        },
        {
          "title": "MST",
          "body": "Kruskal/Prim minimizan suma total del árbol de expansión, no distancia desde una fuente."
        },
        {
          "title": "Union-Find",
          "body": "DSU mantiene componentes disjuntos eficientemente y ayuda a Kruskal a detectar si una arista cerraría un ciclo."
        }
      ]
    },
    "example": {
      "problem": "BFS en grafo con V=700 y E=2300 usando adjacency lists. V+E del modelo.",
      "steps": [
        "700+2300=3000."
      ],
      "solution": "3000"
    },
    "check": {
      "question": "¿Dijkstra clásico es correcto con aristas de peso negativo arbitrarias?",
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
          "Siempre en una CPU moderna",
          false
        ]
      ],
      "feedback": "Los algoritmos de grafos explotan propiedades distintas: BFS/DFS recorren, Dijkstra resuelve shortest paths con pesos no negativos, Bellman-Ford admite pesos negativos, y MST optimiza conectividad global en grafos no dirigidos ponderados."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿BFS sirve para shortest path por aristas en no ponderado? sí/no",
        "answer": "si",
        "hint": "Explora por capas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "V=700,E=2300. V+E.",
        "answer": "3000",
        "hint": "700+2300."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿MST minimiza necesariamente la distancia desde una fuente a todos los nodos? sí/no",
        "answer": "no",
        "hint": "Ese es otro objetivo."
      }
    ]
  }
});
