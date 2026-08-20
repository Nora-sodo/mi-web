/**
 * BLOQUE 009 — C profundo y programación de sistemas
 *
 * Responsabilidades:
 * - este archivo contiene conocimiento pedagógico y ejercicios base;
 * - app.js renderiza la experiencia;
 * - state.js persiste progreso/errores;
 * - challenges.js añade el nivel 4.
 *
 * Regla editorial: separar estrictamente lo que garantiza el lenguaje C de
 * decisiones de ABI, compilador, sistema operativo o hardware concreto.
 */

window.LEARNING_PATHS[9] = {
  "level": "Experto progresivo",
  "estimatedHours": 40,
  "description": "C profundo: modelo de memoria, punteros, layout, qualifiers, UB, aliasing, lifetime, asignación dinámica, callbacks, macros y un allocator educativo.",
  "outcomes": [
    "Razonar sobre punteros, arrays y layout usando el modelo abstracto de C en lugar de suposiciones de una ABI concreta.",
    "Distinguir const/volatile/restrict, UB/implementation-defined/unspecified y reglas de aliasing.",
    "Gestionar lifetime y memoria dinámica de forma robusta, incluyendo fallos de realloc y overflow de tamaños.",
    "Diseñar un allocator educativo con alineación, free lists, split/coalescing, invariantes y pruebas."
  ],
  "modules": [
    {
      "id": "m1-modelo-layout",
      "title": "Modelo de memoria y layout",
      "description": "Objetos, punteros, arrays, structs, unions y alineación.",
      "lessons": [
        "c-modelo-punteros",
        "c-arrays-pointer-arithmetic",
        "c-struct-union-layout"
      ]
    },
    {
      "id": "m2-semantica-opt",
      "title": "Semántica que guía al compilador",
      "description": "Qualifiers, UB y aliasing.",
      "lessons": [
        "c-qualifiers",
        "c-ub-implementation",
        "c-aliasing-effective-type"
      ]
    },
    {
      "id": "m3-lifetime-allocation",
      "title": "Lifetime y memoria dinámica",
      "description": "Duración, malloc/realloc/free y diseño de allocators.",
      "lessons": [
        "c-storage-lifetime-scope",
        "c-dynamic-allocation",
        "c-fragmentation-allocator"
      ]
    },
    {
      "id": "m4-control-traduccion-proyecto",
      "title": "Callbacks, preprocesador y proyecto",
      "description": "Indirección de control, macros y allocator integrador.",
      "lessons": [
        "c-function-pointers-callbacks",
        "c-preprocessor-macros",
        "c-allocator-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "c-modelo-punteros": {
    "id": "c-modelo-punteros",
    "courseId": 9,
    "title": "Modelo de memoria de C: objetos, direcciones y punteros",
    "shortTitle": "Un puntero no es una variable con flecha mágica",
    "duration": 95,
    "objective": "razonar sobre objetos, almacenamiento, direcciones, punteros, null y dereferenciación sin confundir el modelo abstracto de C con una dirección física concreta.",
    "summary": [
      "C define objetos con tipo, tamaño, alineación, duración de almacenamiento y valor.",
      "Un puntero representa una dirección apta para referirse a un objeto o función de tipo compatible; su representación concreta es dependiente de implementación.",
      "Dereferenciar exige que el puntero sea válido para el acceso que se intenta realizar."
    ],
    "concept": "El modelo útil no es 'puntero = entero'. Un puntero participa en reglas de tipo, procedencia, lifetime y aritmética definidas por C; convertirlo a entero puede existir, pero no convierte esas reglas en simples matemáticas de direcciones.",
    "diagram": [
      "objeto x ── tiene almacenamiento y tipo",
      "&x ── produce un puntero a x",
      "*p ── accede al objeto designado por p, si el acceso es válido"
    ],
    "rules": [
      "No dereferencies punteros nulos, indeterminados o que ya no designan un objeto vivo.",
      "No asumas que sizeof(void*) coincide con sizeof(long) en toda plataforma.",
      "Distingue dirección abstracta del programa de dirección virtual/física del sistema."
    ],
    "deep": {
      "sections": [
        {
          "title": "Objeto y almacenamiento",
          "body": "En C, un objeto es una región de almacenamiento cuyo contenido representa valores. El lenguaje especifica propiedades abstractas; la implementación decide muchos detalles concretos."
        },
        {
          "title": "Puntero nulo",
          "body": "Un null pointer no designa ningún objeto o función. No tiene por qué estar representado por todos los bits a cero, aunque eso sea habitual en muchas plataformas."
        },
        {
          "title": "Validez",
          "body": "Un puntero puede conservar un patrón de bits y aun dejar de ser válido para dereferenciar después de que termine la vida del objeto."
        },
        {
          "title": "Conversiones",
          "body": "C permite determinadas conversiones entre punteros y enteros mediante tipos capaces de representarlos cuando existen, pero la portabilidad de resultados y round-trips depende de las garantías concretas del estándar y la implementación."
        }
      ],
      "commonErrors": [
        "Pensar que todo puntero es simplemente uint64_t.",
        "Confundir null con dirección física cero.",
        "Usar un puntero después de free."
      ],
      "connections": [
        "Bloque 008: memoria virtual.",
        "Bloque 010: optimizaciones basadas en aliasing."
      ]
    },
    "example": {
      "problem": "int x=7; int *p=&x;",
      "steps": [
        [
          "Paso 2",
          "p designa x."
        ],
        [
          "Paso 3",
          "*p=9 modifica el objeto x."
        ],
        [
          "Paso 4",
          "El valor final observable de x es 9."
        ]
      ],
      "answer": "x termina valiendo 9."
    },
    "check": {
      "question": "¿Conservar el valor numérico aparente de un puntero garantiza que siga siendo válido tras free?",
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
          "Solo en x86-64",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "La validez depende también de la vida del objeto, no solo de los bits del puntero."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿&x produce un puntero a x? sí/no",
        "answer": "si",
        "hint": "El operador & obtiene la dirección del objeto."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿NULL puede dereferenciarse de forma válida? sí/no",
        "answer": "no",
        "hint": "No designa un objeto válido."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El estándar obliga a que sizeof(void*) sea 8? sí/no",
        "answer": "no",
        "hint": "El tamaño es dependiente de implementación."
      }
    ]
  },
  "c-arrays-pointer-arithmetic": {
    "id": "c-arrays-pointer-arithmetic",
    "courseId": 9,
    "title": "Arrays, pointer arithmetic y one-past-the-end",
    "shortTitle": "p+1 avanza un elemento, no un byte",
    "duration": 100,
    "objective": "explicar la relación entre arrays y punteros, aritmética escalada y la regla one-past-the-end sin afirmar que arrays y punteros son el mismo tipo.",
    "summary": [
      "Un array y un puntero no son el mismo tipo, aunque una expresión array suele convertirse a puntero a su primer elemento en muchos contextos.",
      "p+n avanza n elementos del tipo apuntado, no n bytes.",
      "C permite formar un puntero one-past-the-end para comparación/arimética limitada, pero no dereferenciarlo."
    ],
    "concept": "La aritmética de punteros está definida dentro de un mismo objeto array (incluido el puntero justo después del último elemento). Salirse de ese dominio convierte una intuición numérica en comportamiento no definido.",
    "diagram": [
      "int a[4]: [a0][a1][a2][a3] | one-past",
      "a      → &a[0] en expresión habitual",
      "a + 4  → one-past, válido para comparar; no para *"
    ],
    "rules": [
      "No digas 'array = puntero': describe el decay cuando corresponda.",
      "Resta de punteros solo tiene significado definido dentro del mismo array (o one-past).",
      "No dereferencies el puntero one-past-the-end."
    ],
    "deep": {
      "sections": [
        {
          "title": "Decay",
          "body": "Excepto en contextos como sizeof, _Alignof/alignof cuando aplique, unary &, y ciertos usos de literales, una expresión de tipo array se convierte a puntero a su primer elemento."
        },
        {
          "title": "Escala",
          "body": "Si p es int*, p+1 apunta al siguiente int; el compilador incorpora sizeof(int) al cálculo de dirección."
        },
        {
          "title": "Diferencia",
          "body": "p2-p1 produce una distancia en elementos con tipo ptrdiff_t cuando ambos pertenecen al mismo array permitido."
        },
        {
          "title": "Límites",
          "body": "La regla one-past permite escribir loops idiomáticos con un sentinel sin inventar un objeto inexistente al final."
        }
      ],
      "commonErrors": [
        "Usar sizeof(p) esperando tamaño del array después del decay.",
        "Restar punteros a objetos no relacionados.",
        "Dereferenciar a+n cuando n es la longitud."
      ],
      "connections": [
        "Bloque 057: arrays y complejidad.",
        "Bloque 074: locality y layouts."
      ]
    },
    "example": {
      "problem": "int a[5]; int *p=&a[1];",
      "steps": [
        [
          "Paso 2",
          "p+2 designa a[3]."
        ],
        [
          "Paso 3",
          "La diferencia (&a[4]-&a[1]) es 3 elementos."
        ],
        [
          "Paso 4",
          "&a[5] puede formarse como one-past, pero no leerse."
        ]
      ],
      "answer": "p+2 → a[3], y la diferencia indicada es 3."
    },
    "check": {
      "question": "¿int a[8] e int *p tienen siempre el mismo sizeof?",
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
          "Solo si apuntan al mismo sitio",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El array contiene 8 elementos; el puntero es otro objeto con su propio tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si p es double*, p+3 avanza ¿cuántos elementos double?",
        "answer": "3",
        "hint": "La aritmética está escalada por el tipo."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Array de 10 elementos: índice del one-past respecto al primero:",
        "answer": "10",
        "hint": "Es a+10."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede dereferenciarse legalmente a+10 en un array de longitud 10? sí/no",
        "answer": "no",
        "hint": "One-past puede formarse, no dereferenciarse."
      }
    ]
  },
  "c-struct-union-layout": {
    "id": "c-struct-union-layout",
    "courseId": 9,
    "title": "Structs, unions, alignment y padding",
    "shortTitle": "El compilador también juega al Tetris",
    "duration": 100,
    "objective": "razonar sobre layout, alineación y padding sin asumir offsets o tamaños portables que el lenguaje no garantiza.",
    "summary": [
      "Los miembros de struct aparecen en orden de declaración, pero puede existir padding entre ellos y al final.",
      "Una union comparte almacenamiento entre sus miembros; su tamaño debe acomodar al miembro pertinente y su alineación.",
      "sizeof incluye padding y no equivale necesariamente a la suma de sizeof de los miembros."
    ],
    "concept": "El layout conecta el modelo de tipos con requisitos de alineación de la implementación. El compilador puede insertar bytes que no corresponden a ningún miembro para que accesos posteriores satisfagan alineación.",
    "diagram": [
      "struct { char c; int x; }",
      "[c][pad?][pad?][pad?][x x x x]  ← ejemplo posible, no contrato universal"
    ],
    "rules": [
      "Usa offsetof cuando necesites offsets definidos por la implementación actual.",
      "No serialices structs crudos esperando un formato binario portable.",
      "No confundas union con conversión numérica segura entre representaciones."
    ],
    "deep": {
      "sections": [
        {
          "title": "Alineación",
          "body": "Cada tipo tiene requisitos de alineación definidos por la implementación dentro de las reglas del lenguaje."
        },
        {
          "title": "Padding interno",
          "body": "Puede insertarse espacio entre miembros, pero los miembros no se reordenan respecto a su declaración."
        },
        {
          "title": "Padding final",
          "body": "Puede existir para que elementos consecutivos de un array de structs queden correctamente alineados."
        },
        {
          "title": "Union",
          "body": "Los miembros solapan almacenamiento. Leer un miembro distinto del último escrito tiene reglas y matices dependientes del caso; no debe usarse como sustituto informal de memcpy sin conocer esas reglas."
        }
      ],
      "commonErrors": [
        "Suponer sizeof(struct)==suma de miembros.",
        "Enviar struct por red directamente.",
        "Asumir el mismo padding entre compiladores/ABI."
      ],
      "connections": [
        "Bloque 005: ABI.",
        "Bloque 071: formatos persistentes."
      ]
    },
    "example": {
      "problem": "struct S { char c; int x; };",
      "steps": [
        [
          "Paso 2",
          "El orden lógico es c antes de x."
        ],
        [
          "Paso 3",
          "Puede haber padding entre ambos para alinear x."
        ],
        [
          "Paso 4",
          "sizeof(S) puede incluir padding final adicional."
        ]
      ],
      "answer": "El layout exacto es dependiente de implementación/ABI; el orden de miembros se conserva."
    },
    "check": {
      "question": "¿Puede sizeof(struct) ser mayor que la suma de sizeof de sus miembros?",
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
          "Solo con unions",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El padding puede aumentar el tamaño."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El compilador puede reordenar los miembros declarados de un struct de C? sí/no",
        "answer": "no",
        "hint": "El orden de declaración se conserva."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿sizeof incluye padding? sí/no",
        "answer": "si",
        "hint": "Sí, forma parte del tamaño del objeto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Es portable escribir bytes crudos de un struct a disco y leerlos con cualquier ABI? sí/no",
        "answer": "no",
        "hint": "Padding, endianness y representaciones pueden variar."
      }
    ]
  },
  "c-qualifiers": {
    "id": "c-qualifiers",
    "courseId": 9,
    "title": "const, volatile y restrict: contratos distintos",
    "shortTitle": "volatile no es un mutex con capa",
    "duration": 95,
    "objective": "distinguir const, volatile y restrict y saber qué optimizaciones o accesos condicionan sin atribuirles garantías de concurrencia que no poseen.",
    "summary": [
      "const restringe modificaciones a través de una determinada expresión/lvalue; no significa necesariamente memoria físicamente inmutable.",
      "volatile obliga a tratar accesos al objeto volatile como efectos observables según el modelo del lenguaje, pero no proporciona atomicidad ni sincronización entre threads.",
      "restrict es una promesa de aliasing para determinados accesos durante un bloque de ejecución y permite optimizaciones si el programa cumple el contrato."
    ],
    "concept": "Los qualifiers no son sinónimos de seguridad. Cada uno expresa un contrato diferente entre programa y compilador; violar restrict puede producir UB y usar volatile para sincronizar threads es una receta para bugs con excelente autoestima.",
    "diagram": [
      "const    → restricción de modificación vía ese acceso",
      "volatile → accesos con semántica observable especial",
      "restrict → promesa sobre aliasing"
    ],
    "rules": [
      "No uses volatile como sustituto de _Atomic o primitivas de sincronización.",
      "No concluyas que const hace imposible toda modificación del objeto por otras vías válidas.",
      "Solo usa restrict cuando puedes sostener su contrato de acceso."
    ],
    "deep": {
      "sections": [
        {
          "title": "const",
          "body": "Un puntero a const impide modificar el objeto a través de ese lvalue; la constancia puede pertenecer al objeto o únicamente al tipo de acceso."
        },
        {
          "title": "volatile",
          "body": "Está pensado para objetos cuyo valor puede cambiar por mecanismos fuera del flujo ordinario de la máquina abstracta, como ciertos registros MMIO; los detalles de dispositivo requieren además reglas de plataforma."
        },
        {
          "title": "Concurrencia",
          "body": "Un acceso volatile puede seguir participando en data races si varios threads acceden sin sincronización adecuada."
        },
        {
          "title": "restrict",
          "body": "Permite al compilador asumir independencia entre accesos basados en punteros restringidos bajo las condiciones definidas por C."
        }
      ],
      "commonErrors": [
        "volatile hace thread-safe.",
        "const significa ROM.",
        "restrict es solo una pista opcional sin consecuencias semánticas."
      ],
      "connections": [
        "Bloque 014: MMIO.",
        "Bloque 059: atomics y memory model."
      ]
    },
    "example": {
      "problem": "void f(size_t n, int *restrict a, int *restrict b);",
      "steps": [
        [
          "Paso 2",
          "La firma permite optimizaciones suponiendo el contrato restrict durante los accesos relevantes."
        ],
        [
          "Paso 3",
          "Si el llamador viola las condiciones de aliasing exigidas, el problema es semántico, no solo de rendimiento."
        ],
        [
          "Paso 4",
          "volatile no arreglaría esa violación."
        ]
      ],
      "answer": "restrict es un contrato de aliasing; volatile y const resuelven problemas distintos."
    },
    "check": {
      "question": "¿volatile garantiza atomicidad entre threads?",
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
          "Solo en x86",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Atomicidad y sincronización pertenecen al modelo atómico, no a volatile."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿const y volatile significan lo mismo? sí/no",
        "answer": "no",
        "hint": "Expresan contratos distintos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿volatile sustituye a _Atomic? sí/no",
        "answer": "no",
        "hint": "No proporciona las garantías atómicas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Violar el contrato restrict puede provocar comportamiento no definido? sí/no",
        "answer": "si",
        "hint": "restrict tiene requisitos semánticos reales."
      }
    ]
  },
  "c-ub-implementation": {
    "id": "c-ub-implementation",
    "courseId": 9,
    "title": "Undefined, unspecified e implementation-defined behavior",
    "shortTitle": "Cuando el estándar deja de sujetarte la bicicleta",
    "duration": 110,
    "objective": "clasificar comportamientos de C y explicar por qué UB permite optimizaciones agresivas sin reducirlo a 'puede pasar cualquier cosa' como explicación única.",
    "summary": [
      "Undefined behavior significa que el estándar no impone requisitos para ese caso.",
      "Implementation-defined behavior exige que la implementación elija y documente una posibilidad permitida.",
      "Unspecified behavior permite varias posibilidades sin exigir documentar cuál ocurre en cada caso."
    ],
    "concept": "Estas categorías son parte del contrato del lenguaje. El compilador optimiza programas válidos bajo la suposición de que no ejecutan UB; por eso una operación aparentemente inocente puede cambiar de forma drástica cuando el programa viola precondiciones del modelo.",
    "diagram": [
      "definido → contrato portable",
      "implementation-defined → elección documentada",
      "unspecified → varias elecciones permitidas",
      "undefined → estándar no impone requisitos"
    ],
    "rules": [
      "No dependas de UB aunque 'funcione en mi máquina'.",
      "Distingue signed overflow de unsigned wraparound.",
      "Lee documentación del compilador cuando dependas de comportamiento implementation-defined."
    ],
    "deep": {
      "sections": [
        {
          "title": "UB",
          "body": "Ejemplos clásicos incluyen dereferenciar null, acceso fuera de los límites permitidos y signed integer overflow en operaciones donde el estándar no define wraparound."
        },
        {
          "title": "Unsigned",
          "body": "La aritmética unsigned se define módulo 2^N para el ancho correspondiente; no es UB por overflow aritmético ordinario."
        },
        {
          "title": "Unspecified",
          "body": "El estándar puede permitir más de un resultado sin obligar a la implementación a documentar una selección fija."
        },
        {
          "title": "Optimización",
          "body": "Si el compilador demuestra que una rama solo sería alcanzable después de UB, puede transformar el programa basándose en que una ejecución definida no llega allí."
        }
      ],
      "commonErrors": [
        "UB significa siempre crash inmediato.",
        "Todos los enteros desbordan módulo 2^N.",
        "Implementation-defined y unspecified son idénticos."
      ],
      "connections": [
        "Bloque 010: optimización.",
        "Bloque 023: vulnerabilidades de memoria."
      ]
    },
    "example": {
      "problem": "int x = INT_MAX;",
      "steps": [
        [
          "Paso 2",
          "x + 1 como int signed no tiene wraparound portable garantizado."
        ],
        [
          "Paso 3",
          "El compilador puede asumir que una ejecución definida no produce ese overflow."
        ],
        [
          "Paso 4",
          "Para unsigned, la aritmética modular sí está especificada."
        ]
      ],
      "answer": "Signed overflow ordinario puede ser UB; unsigned wraparound está definido modularmente."
    },
    "check": {
      "question": "¿Undefined behavior obliga al programa a lanzar una excepción?",
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
          "Solo con optimización",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El estándar no exige un mecanismo concreto de diagnóstico o fallo para UB en ejecución."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El overflow aritmético unsigned ordinario está definido módulo 2^N? sí/no",
        "answer": "si",
        "hint": "Es parte del modelo unsigned."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Implementation-defined requiere documentación de la elección? sí/no",
        "answer": "si",
        "hint": "Esa es una diferencia clave."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Signed overflow puede usarse portably como wraparound? sí/no",
        "answer": "no",
        "hint": "No en el caso ordinario de overflow signed."
      }
    ]
  },
  "c-aliasing-effective-type": {
    "id": "c-aliasing-effective-type",
    "courseId": 9,
    "title": "Aliasing, effective type y acceso a la representación",
    "shortTitle": "Dos punteros iguales no siempre cuentan la misma historia",
    "duration": 110,
    "objective": "explicar aliasing, effective type y acceso mediante character types para razonar sobre optimización y type punning sin invocar reglas inexistentes.",
    "summary": [
      "Aliasing significa que dos expresiones pueden designar almacenamiento solapado.",
      "Las reglas de tipo efectivo limitan mediante qué tipos puede accederse a ciertos objetos almacenados.",
      "Los tipos character tienen permisos especiales para inspeccionar la representación de objetos."
    ],
    "concept": "El compilador usa información de tipos para demostrar que ciertos accesos no pueden referirse al mismo objeto. Romper las reglas no hace al compilador 'demasiado listo': hace que el programa salga del contrato que permite interpretar esos accesos.",
    "diagram": [
      "memoria de un objeto T",
      "acceso compatible → permitido",
      "acceso incompatible arbitrario → puede ser UB",
      "unsigned char* → inspección de representación"
    ],
    "rules": [
      "Usa memcpy para mover representaciones cuando quieras evitar type-punning dudoso.",
      "No asumas que convertir T* a U* y dereferenciar es válido porque tamaños coinciden.",
      "Distingue aliasing del mero hecho de que direcciones numéricas parezcan iguales."
    ],
    "deep": {
      "sections": [
        {
          "title": "Effective type",
          "body": "Para almacenamiento sin tipo declarado, ciertas escrituras y copias determinan cómo puede accederse posteriormente al objeto según las reglas del lenguaje."
        },
        {
          "title": "Character access",
          "body": "Un lvalue de character type puede acceder a la representación de un objeto; esto es la base de muchas rutinas de serialización e inspección de bytes."
        },
        {
          "title": "Optimización",
          "body": "Si dos punteros tienen tipos que las reglas permiten considerar no aliasing, el compilador puede mantener valores en registros o reordenar cargas dentro de las demás restricciones."
        },
        {
          "title": "memcpy",
          "body": "Copiar bytes con memcpy expresa traslado de representación y suele ser la herramienta adecuada para reinterpretaciones controladas sin dereferenciar punteros incompatibles."
        }
      ],
      "commonErrors": [
        "Creer que mismo sizeof implica aliasing válido.",
        "Usar casts para silenciar una violación semántica.",
        "Pensar que strict aliasing es solo una opción de GCC y no se apoya en reglas del lenguaje."
      ],
      "connections": [
        "Bloque 010: optimización.",
        "Bloque 069: sanitizers y análisis."
      ]
    },
    "example": {
      "problem": "float f=1.0f;",
      "steps": [
        [
          "Paso 2",
          "No es portable reinterpretar sus bits escribiendo `*(uint32_t*)&f` y asumir que el acceso cumple siempre las reglas de aliasing."
        ],
        [
          "Paso 3",
          "Puede copiarse la representación con memcpy a un uint32_t de tamaño adecuado."
        ],
        [
          "Paso 4",
          "Después se interpreta el entero como patrón de bits, sujeto a tamaño/representación de la plataforma."
        ]
      ],
      "answer": "Para inspección portable del patrón, memcpy es una técnica adecuada; el cast+dereference puede violar aliasing/alineación."
    },
    "check": {
      "question": "¿Un cast de puntero vuelve automáticamente válido cualquier acceso mediante el nuevo tipo?",
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
          "Solo con -O0",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El cast cambia el tipo de la expresión, no elimina las reglas de acceso al objeto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿unsigned char puede usarse para inspeccionar bytes de representación? sí/no",
        "answer": "si",
        "hint": "Los character types tienen permiso especial."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Mismo tamaño de dos tipos garantiza type-punning válido mediante puntero? sí/no",
        "answer": "no",
        "hint": "Tamaño no sustituye las reglas de tipo efectivo/alineación."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿memcpy puede evitar dereferenciar un puntero de tipo incompatible al copiar representación? sí/no",
        "answer": "si",
        "hint": "Copia bytes como bytes."
      }
    ]
  },
  "c-storage-lifetime-scope": {
    "id": "c-storage-lifetime-scope",
    "courseId": 9,
    "title": "Storage duration, lifetime y scope",
    "shortTitle": "Que el nombre desaparezca no significa que el objeto ya haya muerto",
    "duration": 95,
    "objective": "distinguir scope, linkage, storage duration y lifetime, y detectar punteros colgantes derivados de objetos automáticos o memoria liberada.",
    "summary": [
      "Scope determina dónde un identificador es visible en el texto del programa.",
      "Storage duration determina cuánto tiempo existe el almacenamiento asociado a una clase de objeto.",
      "Lifetime determina cuándo un objeto existe y puede ser accedido según las reglas aplicables."
    ],
    "concept": "Visibilidad del nombre y existencia del objeto son ejes diferentes. Un objeto puede seguir vivo aunque un nombre ya no esté en scope, y un puntero puede seguir en scope aunque el objeto que señalaba ya haya muerto.",
    "diagram": [
      "scope → visibilidad del identificador",
      "storage duration → duración del almacenamiento",
      "lifetime → existencia válida del objeto"
    ],
    "rules": [
      "Nunca devuelvas un puntero a un objeto automático local cuyo lifetime termina al retornar.",
      "No confundas static storage duration con que la variable sea visible globalmente.",
      "Comprueba ownership y lifetime antes de guardar punteros en estructuras de larga vida."
    ],
    "deep": {
      "sections": [
        {
          "title": "Automatic",
          "body": "Muchos objetos locales tienen automatic storage duration asociada a la entrada/salida del bloque correspondiente."
        },
        {
          "title": "Static",
          "body": "Objetos con static storage duration existen durante toda la ejecución, aunque su scope pueda ser local."
        },
        {
          "title": "Allocated",
          "body": "La memoria obtenida dinámicamente existe desde una asignación exitosa hasta que se libera o termina la ejecución, con reglas adicionales sobre objetos almacenados allí."
        },
        {
          "title": "Scope",
          "body": "Un identificador local puede dejar de ser visible sin que eso describa por sí solo cada aspecto del almacenamiento de otros objetos relacionados."
        }
      ],
      "commonErrors": [
        "Devolver &local.",
        "Pensar que static dentro de función tiene scope global.",
        "Usar un puntero después de free porque la variable puntero sigue existiendo."
      ],
      "connections": [
        "Bloque 012: stack de procesos.",
        "Bloque 069: AddressSanitizer."
      ]
    },
    "example": {
      "problem": "int *bad(void) { int x=3; return &x; }",
      "steps": [
        [
          "Paso 2",
          "x tiene automatic storage duration."
        ],
        [
          "Paso 3",
          "Al retornar termina su lifetime."
        ],
        [
          "Paso 4",
          "El puntero devuelto queda colgante para dereferenciar."
        ]
      ],
      "answer": "El puntero devuelto no puede usarse válidamente para acceder a x después del retorno."
    },
    "check": {
      "question": "¿Una variable `static` local puede tener scope local y storage duration estática a la vez?",
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
          "Solo en C++",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Scope y storage duration son propiedades distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Es válido devolver &x si x es un int automático local? sí/no",
        "answer": "no",
        "hint": "Su lifetime termina al retornar."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿static local implica scope global? sí/no",
        "answer": "no",
        "hint": "Conserva scope local."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Que una variable puntero siga viva implica que el objeto apuntado siga vivo? sí/no",
        "answer": "no",
        "hint": "Los lifetimes son independientes."
      }
    ]
  },
  "c-dynamic-allocation": {
    "id": "c-dynamic-allocation",
    "courseId": 9,
    "title": "malloc, calloc, realloc y free",
    "shortTitle": "realloc: Schrödinger con ownership",
    "duration": 115,
    "objective": "usar correctamente las funciones de asignación dinámica, manejar fallos y explicar las consecuencias de realloc sin perder el bloque original.",
    "summary": [
      "malloc reserva almacenamiento sin inicializar su contenido como valores de usuario; calloc además inicializa todos los bits del almacenamiento asignado a cero.",
      "free libera un bloque previamente asignado que aún no fue liberado y cuyo puntero cumple las precondiciones.",
      "realloc puede mover el bloque; si falla, el bloque original permanece asignado y el valor original debe conservarse."
    ],
    "concept": "Asignación dinámica es gestión explícita de lifetime y ownership. El patrón seguro con realloc usa un temporal para no sobrescribir el único puntero al bloque antes de saber si la operación tuvo éxito.",
    "diagram": [
      "p = malloc(n)",
      "tmp = realloc(p, m)",
      "tmp != NULL → p = tmp",
      "tmp == NULL → p sigue designando el bloque original"
    ],
    "rules": [
      "Comprueba overflow al calcular tamaños antes de asignar.",
      "Usa temporal con realloc cuando necesites conservar el bloque original ante fallo.",
      "Después de free, no dereferencies ni uses el puntero como si todavía designara el objeto liberado."
    ],
    "deep": {
      "sections": [
        {
          "title": "malloc",
          "body": "Devuelve un puntero adecuadamente alineado para los tipos que permita la interfaz y tamaño solicitado, o null en fallo; el contenido previo del almacenamiento no constituye inicialización de tus objetos."
        },
        {
          "title": "calloc",
          "body": "Realiza una asignación para un número de elementos y pone todos los bits del bloque a cero; 'all-bits-zero' no debe generalizarse sin matices a cualquier representación abstracta imaginable."
        },
        {
          "title": "realloc",
          "body": "Puede mantener o cambiar la ubicación. Tras una realloc exitosa, el valor de puntero anterior no debe seguir utilizándose para acceder al bloque, aunque numéricamente la dirección parezca idéntica."
        },
        {
          "title": "free",
          "body": "Liberar dos veces el mismo bloque o liberar un puntero no válido incumple las precondiciones y puede causar UB."
        }
      ],
      "commonErrors": [
        "p=realloc(p,n) sin temporal cuando no se tolera perder referencia ante fallo.",
        "double free.",
        "Multiplicar count*size sin controlar overflow."
      ],
      "connections": [
        "Bloque 009 proyecto: allocator.",
        "Bloque 023: heap vulnerabilities."
      ]
    },
    "example": {
      "problem": "int *tmp = realloc(p, new_count * sizeof *p);",
      "steps": [
        [
          "Paso 2",
          "Si tmp==NULL, p conserva la referencia al bloque anterior."
        ],
        [
          "Paso 3",
          "Si tmp!=NULL, se adopta tmp."
        ],
        [
          "Paso 4",
          "El cálculo de new_count*sizeof *p debe comprobar overflow cuando los valores son externos/no confiables."
        ]
      ],
      "answer": "Usar un temporal preserva el ownership del bloque original cuando realloc falla."
    },
    "check": {
      "question": "Si realloc falla por falta de memoria, ¿libera automáticamente el bloque original?",
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
          "Siempre lo mueve",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "En fallo, el bloque original permanece asignado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿free(NULL) es una operación permitida sin efecto? sí/no",
        "answer": "si",
        "hint": "La biblioteca define ese caso."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿realloc puede devolver una dirección distinta? sí/no",
        "answer": "si",
        "hint": "Puede mover el bloque."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Es seguro asumir que calloc produce una representación válida de cualquier tipo puntero solo porque pone bits a cero? sí/no",
        "answer": "no",
        "hint": "All-bits-zero no es una afirmación universal sobre todas las representaciones."
      }
    ]
  },
  "c-fragmentation-allocator": {
    "id": "c-fragmentation-allocator",
    "courseId": 9,
    "title": "Allocators, fragmentación y metadatos",
    "shortTitle": "malloc no invoca un duende con una cinta métrica",
    "duration": 105,
    "objective": "explicar cómo un allocator organiza bloques, diferencia fragmentación interna/externa y usa políticas de bins, split y coalescing.",
    "summary": [
      "Un allocator transforma una región de memoria en bloques asignados/libres y mantiene metadatos para encontrarlos.",
      "Fragmentación interna desperdicia espacio dentro de asignaciones; externa dispersa huecos libres que dificultan satisfacer bloques grandes.",
      "Split, coalescing, segregated free lists, arenas y size classes son técnicas con compromisos distintos."
    ],
    "concept": "No existe un allocator universalmente mejor. Latencia, throughput, memoria desperdiciada, concurrencia, predictibilidad y seguridad compiten entre sí.",
    "diagram": [
      "[used 32][free 16][used 64][free 48]",
      "coalescing solo une libres adyacentes",
      "size classes → búsqueda rápida a cambio de redondeo interno"
    ],
    "rules": [
      "Distingue fragmentación interna de externa.",
      "No guardes metadatos sin protegerte contra overflow/corrupción.",
      "Mide workloads reales antes de afirmar que una política es mejor."
    ],
    "deep": {
      "sections": [
        {
          "title": "Free lists",
          "body": "Una lista explícita enlaza bloques libres y permite búsqueda first-fit, best-fit u otras políticas."
        },
        {
          "title": "Segregación",
          "body": "Bins por tamaño reducen búsqueda pero pueden aumentar fragmentación interna por redondeo."
        },
        {
          "title": "Coalescing",
          "body": "Combinar bloques libres contiguos reduce fragmentación externa, pero cuesta trabajo y depende de conocer límites vecinos."
        },
        {
          "title": "Concurrencia",
          "body": "Arenas por thread o CPU pueden reducir contención y aumentar footprint/fragmentación; el diseño es un trade-off."
        }
      ],
      "commonErrors": [
        "Confundir leak con fragmentación.",
        "Suponer que best-fit elimina fragmentación.",
        "Olvidar alineación al calcular tamaño real de bloque."
      ],
      "connections": [
        "Bloque 008: páginas/VM.",
        "Bloque 074: performance."
      ]
    },
    "example": {
      "problem": "Solicitud de 33 B con size class de 48 B.",
      "steps": [
        [
          "Paso 2",
          "El allocator entrega 48 B de capacidad reservada para esa clase."
        ],
        [
          "Paso 3",
          "15 B quedan sin usar dentro de esa asignación."
        ],
        [
          "Paso 4",
          "Eso es fragmentación interna, no externa."
        ]
      ],
      "answer": "15 B de fragmentación interna en ese modelo simplificado."
    },
    "check": {
      "question": "¿Muchos huecos libres pequeños no contiguos son un ejemplo de fragmentación externa?",
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
          "Solo en SSD",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El espacio total puede ser suficiente y aun no existir un bloque contiguo apropiado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Clase 64 B para petición de 52 B: desperdicio interno en B:",
        "answer": "12",
        "hint": "64-52."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Coalescing une bloques libres que no son adyacentes físicamente? sí/no",
        "answer": "no",
        "hint": "Solo puede fusionar regiones contiguas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una memory leak y fragmentación son exactamente el mismo problema? sí/no",
        "answer": "no",
        "hint": "Leak pierde reachability/ownership; fragmentación describe distribución/desperdicio."
      }
    ]
  },
  "c-function-pointers-callbacks": {
    "id": "c-function-pointers-callbacks",
    "courseId": 9,
    "title": "Function pointers y callbacks",
    "shortTitle": "Pasar comportamiento como dato, pero con tipos",
    "duration": 90,
    "objective": "usar punteros a función y callbacks respetando tipos compatibles y comprender cómo desacoplan políticas de mecanismos.",
    "summary": [
      "Un puntero a función designa una función con un tipo de retorno y parámetros determinados.",
      "Los callbacks permiten que una API invoque comportamiento proporcionado por el llamador.",
      "Llamar mediante un tipo de función incompatible puede violar el contrato del lenguaje aunque la ABI parezca tolerarlo."
    ],
    "concept": "Los function pointers son una forma de indirección de control. Son fundamentales en qsort, tablas de despacho, drivers y arquitecturas plugin, pero su seguridad depende de tipos y lifetimes de datos asociados.",
    "diagram": [
      "algoritmo genérico → callback comparator",
      "datos ────────────────↑",
      "política separada del mecanismo"
    ],
    "rules": [
      "Declara typedefs cuando mejoren legibilidad de firmas complejas.",
      "No fuerces casts para ocultar incompatibilidades de callback.",
      "Documenta ownership/lifetime del contexto que usa el callback."
    ],
    "deep": {
      "sections": [
        {
          "title": "Tipo",
          "body": "El tipo de función incluye retorno y parámetros relevantes; la compatibilidad importa al invocar indirectamente."
        },
        {
          "title": "Dispatch",
          "body": "Una tabla de punteros a función puede implementar un dispatcher sin un switch gigante."
        },
        {
          "title": "Callbacks",
          "body": "Bibliotecas llaman al callback en momentos definidos por su contrato; si guardan el callback para más tarde, el contexto asociado debe seguir siendo válido."
        },
        {
          "title": "ABI",
          "body": "Aunque a nivel máquina dos firmas puedan coincidir accidentalmente en registros, el programa C debe obedecer reglas de tipos y convenciones definidas."
        }
      ],
      "commonErrors": [
        "Castear cualquier función a cualquier callback.",
        "Capturar contexto local muerto mediante void*.",
        "Confundir function pointer con data pointer como representación universalmente intercambiable."
      ],
      "connections": [
        "Bloque 014: drivers.",
        "Bloque 067: diseño de interfaces."
      ]
    },
    "example": {
      "problem": "qsort necesita una función de comparación.",
      "steps": [
        [
          "Paso 2",
          "El algoritmo de ordenación no conoce el significado de cada elemento."
        ],
        [
          "Paso 3",
          "El callback decide orden relativo."
        ],
        [
          "Paso 4",
          "Así se separa mecanismo de política."
        ]
      ],
      "answer": "El callback parametriza el comportamiento del algoritmo genérico."
    },
    "check": {
      "question": "¿Es correcto asumir que un void* y un puntero a función son universalmente intercambiables en C portable?",
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
          "Solo con typedef",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Son categorías distintas de puntero y la portabilidad exige respetar sus reglas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿qsort usa un callback de comparación? sí/no",
        "answer": "si",
        "hint": "Es el mecanismo de personalización."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un callback puede necesitar que su contexto siga vivo hasta la invocación? sí/no",
        "answer": "si",
        "hint": "El lifetime del contexto importa."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un cast garantiza que una firma incompatible sea segura de invocar? sí/no",
        "answer": "no",
        "hint": "No elimina incompatibilidades semánticas."
      }
    ]
  },
  "c-preprocessor-macros": {
    "id": "c-preprocessor-macros",
    "courseId": 9,
    "title": "Preprocesador, macros y traducción",
    "shortTitle": "Texto antes de C: qué podría salir mal",
    "duration": 95,
    "objective": "explicar fases relevantes de traducción, macros, include guards y riesgos de evaluación múltiple sin tratar el preprocesador como un sistema de tipos.",
    "summary": [
      "El preprocesador transforma tokens antes del análisis semántico completo del programa C.",
      "Las macros de función son sustitución de tokens y pueden evaluar argumentos varias veces si se escriben mal.",
      "#if, #include y macros permiten configuración, pero demasiada lógica preprocesada dificulta análisis y depuración."
    ],
    "concept": "Una macro no es una función. No recibe valores en runtime: reescribe tokens. Por eso necesita paréntesis defensivos y cuidado con efectos laterales.",
    "diagram": [
      "fuente → preprocesado → traducción C → objeto → enlace",
      "MAX(i++, j++) → peligro si macro evalúa argumento más de una vez"
    ],
    "rules": [
      "Parentetiza parámetros y expansión completa en macros de expresión.",
      "Evita argumentos con efectos laterales en macros que no garantizan evaluación única.",
      "Prefiere funciones inline cuando necesitas semántica de función y tipos."
    ],
    "deep": {
      "sections": [
        {
          "title": "Macros objeto/función",
          "body": "Ambas operan sobre tokens; una macro de función solo se expande cuando su nombre aparece seguido por paréntesis de invocación según las reglas del preprocesador."
        },
        {
          "title": "Stringification y token pasting",
          "body": "# y ## permiten construir texto/tokens, útiles en metaprogramación limitada pero fáciles de abusar."
        },
        {
          "title": "Conditional compilation",
          "body": "#if puede seleccionar código por plataforma/configuración, aunque multiplicar ramas produce combinaciones difíciles de probar."
        },
        {
          "title": "Headers",
          "body": "Include guards o #pragma once según entorno evitan inclusiones repetidas; las interfaces deben minimizar dependencias innecesarias."
        }
      ],
      "commonErrors": [
        "Macro SQUARE(x) sin parentetizar.",
        "Pasar i++ a macro que usa x dos veces.",
        "Creer que una macro respeta tipos como una función."
      ],
      "connections": [
        "Bloque 010: pipeline de compilación.",
        "Bloque 067: mantenibilidad."
      ]
    },
    "example": {
      "problem": "#define SQUARE(x) ((x)*(x))",
      "steps": [
        [
          "Paso 2",
          "SQUARE(i++) puede incrementar i dos veces."
        ],
        [
          "Paso 3",
          "El problema nace de sustitución textual/token, no de una llamada de función."
        ],
        [
          "Paso 4",
          "Una función inline puede dar evaluación única del argumento según semántica normal de llamada."
        ]
      ],
      "answer": "Evita efectos laterales en macros que reutilizan parámetros; considera inline function."
    },
    "check": {
      "question": "¿Una macro de función es una llamada runtime normal?",
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
          "Solo con -O0",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Se expande durante preprocesado/traducción."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿#include pertenece al preprocesador? sí/no",
        "answer": "si",
        "hint": "Es una directiva de preprocesado."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una macro puede evaluar un argumento más de una vez? sí/no",
        "answer": "si",
        "hint": "Si el parámetro aparece múltiples veces en la expansión."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un cast dentro de una macro le da automáticamente type safety equivalente a una función genérica bien diseñada? sí/no",
        "answer": "no",
        "hint": "Sigue siendo sustitución de tokens con sus propios riesgos."
      }
    ]
  },
  "c-allocator-project": {
    "id": "c-allocator-project",
    "courseId": 9,
    "title": "Proyecto: construir un allocator educativo",
    "shortTitle": "Ahora sí: tu propio malloc, con casco",
    "duration": 180,
    "objective": "diseñar e implementar un allocator educativo con región controlada, alignment, free list, split, coalescing, invariantes y pruebas de corrupción.",
    "summary": [
      "El proyecto integra layout, aritmética de punteros, lifetime, alignment y estructuras de datos.",
      "La versión educativa debe trabajar sobre un buffer/región controlada para no competir con el allocator real del proceso.",
      "Las invariantes y tests son parte del allocator, no un adorno posterior."
    ],
    "concept": "El objetivo no es reemplazar malloc del sistema, sino entender sus problemas. Se implementa una API pequeña sobre una región reservada: alloc(size), dealloc(ptr), opcional realloc, y herramientas de inspección.",
    "diagram": [
      "arena → [header|used][header|free][header|used]",
      "free list → bloques libres",
      "alloc → buscar/split",
      "free → marcar/coalesce"
    ],
    "rules": [
      "Redondea tamaños y cabeceras según alignment calculado, con overflow checks.",
      "Valida que cada bloque permanezca dentro de la arena y que listas no formen ciclos accidentales.",
      "Añade tests de secuencias aleatorias y comprobación de invariantes tras cada operación."
    ],
    "deep": {
      "sections": [
        {
          "title": "Fase 1",
          "body": "Allocator bump-only: aprende alignment y límites sin free."
        },
        {
          "title": "Fase 2",
          "body": "Añade headers y free list; define formato, tamaño mínimo y políticas de búsqueda."
        },
        {
          "title": "Fase 3",
          "body": "Implementa split/coalescing con invariantes: bloques no solapados, tamaños alineados, cobertura válida de arena."
        },
        {
          "title": "Fase 4",
          "body": "Instrumenta métricas: bytes pedidos, reservados, fragmentación aproximada, búsquedas y fallos. Compara first-fit y segregated bins sin declarar vencedor universal."
        }
      ],
      "commonErrors": [
        "Hacer aritmética fuera de la arena.",
        "Olvidar overflow en header+payload+alignment.",
        "Probar solo alloc/free triviales y no secuencias adversas."
      ],
      "connections": [
        "Bloque 011: debugging.",
        "Bloque 069: fuzzing/property-based testing."
      ]
    },
    "example": {
      "problem": "Arena de 1024 B; petición 100 B.",
      "steps": [
        [
          "Paso 2",
          "Redondea payload y reserva header respetando alignment."
        ],
        [
          "Paso 3",
          "Si el bloque libre restante supera el mínimo útil, split."
        ],
        [
          "Paso 4",
          "Al liberar vecinos adyacentes, coalesce y vuelve a comprobar invariantes."
        ]
      ],
      "answer": "El allocator debe preservar límites, alineación y estructura de bloques después de cada operación."
    },
    "check": {
      "question": "¿El objetivo educativo exige reemplazar el malloc real de libc?",
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
          "Solo en Linux",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Una arena controlada permite estudiar el problema con menos riesgos y dependencias."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Arena 256 B, cabecera 16 B y payload 64 B sin padding extra: bytes consumidos:",
        "answer": "80",
        "hint": "16+64."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Coalescing debería comprobar adyacencia real antes de fusionar? sí/no",
        "answer": "si",
        "hint": "Fusionar bloques no contiguos corrompería la arena."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Fuzzing de secuencias alloc/free puede revelar invariantes rotas que tests manuales no cubren? sí/no",
        "answer": "si",
        "hint": "Explora combinaciones difíciles de anticipar."
      }
    ]
  }
});
