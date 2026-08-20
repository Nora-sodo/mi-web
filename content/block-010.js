/**
 * BLOQUE 010 — Compiladores y lenguajes
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: distinguir siempre lenguaje fuente, IR, ISA, ABI, formato
 * de objeto, linker, loader y runtime. Compartir siglas no fusiona capas.
 */

window.LEARNING_PATHS[10] = {
  "level": "Experto progresivo",
  "estimatedHours": 46,
  "description": "De código fuente a ejecutable y runtime: toolchains, object formats, linking/loading, frontend, IR, optimización, codegen, VM, JIT y proyecto de lenguaje.",
  "outcomes": [
    "Seguir y depurar la cadena fuente→tokens→AST→IR→objeto→link→load→ejecución.",
    "Interpretar símbolos, relocations y formatos ELF/PE sin confundir capas de archivo y memoria.",
    "Diseñar frontend, IR y optimizaciones respetando la semántica del lenguaje.",
    "Construir una VM/intérprete y un compilador pequeño con pruebas por fases."
  ],
  "modules": [
    {
      "id": "m1-toolchain-link",
      "title": "Toolchain, objetos y carga",
      "description": "Compilación separada, símbolos, relocations y formatos ejecutables.",
      "lessons": [
        "toolchain-programa-maquina",
        "object-symbol-relocation",
        "static-dynamic-linking",
        "elf-pe-loader"
      ]
    },
    {
      "id": "m2-frontend",
      "title": "Frontend del lenguaje",
      "description": "Tokens, gramáticas, AST, nombres y tipos.",
      "lessons": [
        "tokens-lexer",
        "grammar-parser",
        "ast-semantics-types"
      ]
    },
    {
      "id": "m3-ir-backend",
      "title": "IR, optimización y backend",
      "description": "Representaciones intermedias, optimización y generación de máquina.",
      "lessons": [
        "ir-ssa",
        "compiler-optimization",
        "codegen-register-allocation"
      ]
    },
    {
      "id": "m4-runtime-project",
      "title": "VM, JIT y proyecto integrador",
      "description": "Bytecode, compilación dinámica y lenguaje propio.",
      "lessons": [
        "bytecode-vm",
        "jit-compilation",
        "language-compiler-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "toolchain-programa-maquina": {
    "id": "toolchain-programa-maquina",
    "courseId": 10,
    "title": "De fuente a proceso: preprocesado, compilación, ensamblado, linking y carga",
    "shortTitle": "El ejecutable no aparece por generación espontánea",
    "duration": 110,
    "objective": "seguir la cadena completa desde archivos fuente hasta una imagen ejecutable y un proceso, distinguiendo fases que pueden fusionarse en herramientas pero no conceptualmente.",
    "summary": [
      "Preprocesado transforma directivas y macros antes del análisis del lenguaje en C/C++.",
      "Compilar puede producir assembly, IR u objeto según la herramienta y opciones.",
      "Linking resuelve/combina referencias entre unidades; loading crea el estado de ejecución del proceso."
    ],
    "concept": "Un “compilador” de línea de comandos suele ser un driver que coordina preprocesador, frontend, optimizador, backend, assembler y linker. Conviene distinguir la tubería conceptual de la herramienta concreta que la orquesta.",
    "diagram": [],
    "rules": [
      "No confundas el driver gcc/clang con una sola fase interna.",
      "Un archivo objeto puede contener código máquina todavía no listo para ejecutar por sí solo.",
      "La secuencia exacta depende del lenguaje, toolchain y plataforma."
    ],
    "deep": {
      "sections": [
        {
          "title": "Fases conceptuales",
          "body": "Una tubería clásica de C es fuente → preprocesado → frontend → IR/optimización → código máquina/assembly → objeto relocatable → link → ejecutable/shared object → loader."
        },
        {
          "title": "Driver frente a fase",
          "body": "gcc y clang suelen actuar como drivers: deciden qué subherramientas invocar y con qué opciones. `-c`, `-S` y `-E` permiten detenerse en distintos puntos."
        },
        {
          "title": "Compilación separada",
          "body": "Cada translation unit puede compilarse por separado. Eso reduce trabajo incremental, pero obliga a que interfaces y ABI encajen durante el enlace."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "main.c llama a función definida en util.c. ¿Qué ocurre antes de ejecutar?",
      "steps": [
        [
          "Paso 1",
          "Cada fuente se procesa/compila en su unidad correspondiente."
        ],
        [
          "Paso 2",
          "Los objetos contienen código y referencias/símbolos aún por resolver."
        ],
        [
          "Paso 3",
          "El linker combina objetos y bibliotecas y aplica resoluciones/relocaciones necesarias."
        ],
        [
          "Paso 4",
          "El loader mapea la imagen y prepara el proceso según el formato/plataforma."
        ]
      ],
      "answer": "La cadena separa traducción, enlace y carga."
    },
    "check": {
      "question": "¿Linking y loading son la misma fase?",
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
          "Solo con C",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El linker construye una imagen enlazada; el loader la lleva al proceso y completa trabajo de carga/runtime cuando corresponda."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿`-c` en un driver C típico evita el link final? sí/no",
        "answer": "si",
        "hint": "Produce objeto, no ejecutable final."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un archivo .o relocatable es necesariamente ejecutable por sí solo? sí/no",
        "answer": "no",
        "hint": "Puede contener referencias/relocaciones pendientes."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La herramienta llamada “compiler” puede coordinar varias fases internas? sí/no",
        "answer": "si",
        "hint": "Piensa en compiler driver."
      }
    ]
  },
  "object-symbol-relocation": {
    "id": "object-symbol-relocation",
    "courseId": 10,
    "title": "Object files, símbolos y relocations",
    "shortTitle": "Un .o sabe más de lo que parece",
    "duration": 105,
    "objective": "explicar por qué un objeto relocatable contiene secciones, símbolos y relocations y cómo el linker usa esa información para construir direcciones finales.",
    "summary": [
      "Los símbolos pueden estar definidos, no definidos, locales o globales según formato/toolchain.",
      "Una relocation no es “un error”: es información deliberadamente diferida.",
      "La resolución de símbolos y la aplicación de relocations son operaciones relacionadas pero distintas."
    ],
    "concept": "El código máquina emitido por compilación separada no conoce necesariamente las direcciones finales. Los símbolos nombran entidades y las relocations describen lugares que deben ajustarse cuando se conozca el layout definitivo.",
    "diagram": [],
    "rules": [
      "No asumas que un símbolo de lenguaje de alto nivel conserva el mismo nombre tras mangling.",
      "No confundas sección con segmento: sirven a vistas distintas del archivo/carga.",
      "Una referencia puede resolverse estáticamente o quedar para el runtime linker según el modelo."
    ],
    "deep": {
      "sections": [
        {
          "title": "Tabla de símbolos",
          "body": "Asocia nombres/índices con atributos como binding, tipo, sección y valor. Los detalles exactos dependen del formato."
        },
        {
          "title": "Relocation",
          "body": "Indica qué ubicación debe ajustarse y con qué tipo de cálculo. El tipo de relocation es dependiente de ISA/ABI."
        },
        {
          "title": "Layout",
          "body": "Cuando el linker coloca secciones y conoce ubicaciones, puede calcular desplazamientos/direcciones que antes eran desconocidos."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "foo.o contiene `call bar`, pero bar está en bar.o.",
      "steps": [
        [
          "Paso 1",
          "foo.o registra una referencia a `bar`."
        ],
        [
          "Paso 2",
          "La instrucción o dato correspondiente lleva información de relocation."
        ],
        [
          "Paso 3",
          "El linker encuentra una definición compatible de `bar`."
        ],
        [
          "Paso 4",
          "Tras decidir el layout, aplica el cálculo de relocation apropiado."
        ]
      ],
      "answer": "La referencia diferida se vuelve concreta al enlazar."
    },
    "check": {
      "question": "¿Una relocation significa necesariamente que el compilador “no pudo compilar”?",
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
          "Solo en ELF",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Es una parte normal de la compilación separada y del enlace."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un símbolo undefined en un objeto puede resolverse al enlazar con otro objeto? sí/no",
        "answer": "si",
        "hint": "Ese es un caso normal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El tipo exacto de relocation es independiente de ISA? sí/no",
        "answer": "no",
        "hint": "Hay relocations específicas de arquitectura."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Resolver un símbolo y calcular el parche final son exactamente la misma operación conceptual? sí/no",
        "answer": "no",
        "hint": "Primero identificas qué entidad; luego aplicas la relocation correspondiente."
      }
    ]
  },
  "static-dynamic-linking": {
    "id": "static-dynamic-linking",
    "courseId": 10,
    "title": "Static linking, dynamic linking y bibliotecas compartidas",
    "shortTitle": "Copiar código o compartirlo: hay trade-offs",
    "duration": 105,
    "objective": "comparar enlace estático y dinámico, entendiendo dependencias, relocations, symbol lookup y coste de despliegue/runtime sin reducirlo a “estático grande, dinámico pequeño”.",
    "summary": [
      "Static y dynamic linking cambian cuándo y dónde se resuelven dependencias.",
      "Una shared library no implica que toda resolución sea necesariamente eager; puede existir lazy binding según plataforma/configuración.",
      "PIC/PIE ayudan a ejecutar código en direcciones variables evitando ciertas relocations costosas o incompatibles con compartición."
    ],
    "concept": "El enlace estático incorpora al artefacto final las partes necesarias de bibliotecas estáticas; el dinámico deja dependencias sobre shared objects que el runtime linker/loader deberá mapear y resolver según las reglas de la plataforma.",
    "diagram": [],
    "rules": [
      "No confundas `.a` con “un único objeto”: suele ser un archivo/archivo índice de objetos.",
      "No afirmes que dynamic linking siempre ahorra memoria: depende de páginas realmente compartidas, working sets y duplicación.",
      "ABI compatibility importa tanto como encontrar el nombre de una biblioteca."
    ],
    "deep": {
      "sections": [
        {
          "title": "Enlace estático",
          "body": "El linker extrae/combina código de objetos y archivos estáticos según referencias y reglas de selección."
        },
        {
          "title": "Enlace dinámico",
          "body": "El ejecutable conserva metadatos de dependencias y relocations dinámicas; un runtime linker participa al cargar/ejecutar."
        },
        {
          "title": "Trade-offs",
          "body": "Portabilidad del despliegue, actualizaciones, sharing, startup, reproducibilidad y superficie de compatibilidad cambian según estrategia."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Dos programas usan la misma shared library.",
      "steps": [
        [
          "Paso 1",
          "El loader puede mapear páginas de código de la biblioteca en ambos procesos."
        ],
        [
          "Paso 2",
          "Las páginas read-only pueden compartir backing físico cuando el SO/formato lo permiten."
        ],
        [
          "Paso 3",
          "Cada proceso conserva su propio estado writable necesario."
        ]
      ],
      "answer": "Compartir una biblioteca no significa compartir todo su estado mutable."
    },
    "check": {
      "question": "¿Dynamic linking elimina todas las relocations en runtime?",
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
      "failure": "Precisamente suele dejar trabajo de carga/resolución dinámica según el modelo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una biblioteca estática típica puede ser un archivo de múltiples objetos? sí/no",
        "answer": "si",
        "hint": "Piensa en `ar` y miembros del archive."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿ABI incompatible puede romper uso de una shared library aunque el nombre exista? sí/no",
        "answer": "si",
        "hint": "La interfaz binaria también importa."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿PIE permite que el ejecutable se cargue en distintas direcciones? sí/no",
        "answer": "si",
        "hint": "Position-independent executable."
      }
    ]
  },
  "elf-pe-loader": {
    "id": "elf-pe-loader",
    "courseId": 10,
    "title": "ELF, PE y loader: del archivo a la imagen de proceso",
    "shortTitle": "Secciones en disco, segmentos en memoria",
    "duration": 110,
    "objective": "distinguir los formatos ELF y PE/COFF a nivel conceptual y explicar cómo headers, secciones/segmentos y loader cooperan para mapear una imagen ejecutable.",
    "summary": [
      "ELF suele separar section headers (vista de link) y program headers/segments (vista de carga).",
      "PE describe image files y COFF object files con headers, sections y data directories.",
      "El loader usa permisos, offsets, direcciones y metadatos; no “copia el archivo entero tal cual a RAM”."
    ],
    "concept": "Los formatos ejecutables describen tanto datos de archivo como información necesaria para construir una imagen de memoria. ELF y PE/COFF usan estructuras distintas, pero ambos codifican metadatos para linking/loading.",
    "diagram": [],
    "rules": [
      "No digas que `.text` siempre queda en una única página o segmento físico.",
      "No confundas RVA/virtual address/file offset en PE.",
      "No confundas section header table de ELF con lo que el kernel necesita obligatoriamente para mapear un ejecutable."
    ],
    "deep": {
      "sections": [
        {
          "title": "ELF",
          "body": "El Generic ABI define ELF headers, sections, symbol tables, relocations y program headers. Los detalles de ABI/relocation por arquitectura se complementan con psABI."
        },
        {
          "title": "PE/COFF",
          "body": "Microsoft documenta PE image files y COFF object files; las data directories localizan estructuras como imports, exports o relocations."
        },
        {
          "title": "Loader",
          "body": "Valida formato, crea mappings con permisos y participa en preparación de stack, entry point y linking dinámico según SO."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un ELF ejecutable contiene `.text`, `.data` y program headers.",
      "steps": [
        [
          "Paso 1",
          "El linker organiza contenido del archivo."
        ],
        [
          "Paso 2",
          "Program headers describen regiones que el loader debe mapear."
        ],
        [
          "Paso 3",
          "El SO crea mappings virtuales con permisos apropiados."
        ],
        [
          "Paso 4",
          "La ejecución salta al entry point después de la preparación requerida."
        ]
      ],
      "answer": "La vista de archivo no es idéntica a la vista de memoria."
    },
    "check": {
      "question": "¿En ELF las secciones y los segmentos son exactamente lo mismo?",
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
          "Solo en 64 bits",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Son vistas con propósitos diferentes, aunque un segmento pueda abarcar contenido de varias secciones."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿PE se usa para image files de Windows y COFF para object files relacionados? sí/no",
        "answer": "si",
        "hint": "Microsoft los documenta conjuntamente como PE/COFF."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El loader necesita tratar permisos de memoria de las regiones? sí/no",
        "answer": "si",
        "hint": "Código, datos y metadatos no tienen todos los mismos permisos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un file offset y una virtual address son necesariamente el mismo número? sí/no",
        "answer": "no",
        "hint": "Son espacios distintos."
      }
    ]
  },
  "tokens-lexer": {
    "id": "tokens-lexer",
    "courseId": 10,
    "title": "Tokens y lexer",
    "shortTitle": "Antes de entender una frase, separa sus piezas",
    "duration": 90,
    "objective": "diseñar un lexer que transforme caracteres en tokens conservando posiciones y diferenciando categorías léxicas de significado semántico.",
    "summary": [
      "Token kind y lexeme son conceptos distintos.",
      "Conservar span/posición mejora diagnósticos y tooling.",
      "La estrategia maximal munch es común pero debe combinarse con las reglas exactas del lenguaje."
    ],
    "concept": "El lexer reconoce patrones locales —identificadores, literales, operadores, palabras clave— y produce tokens. Todavía no decide si `x` está declarado ni si una suma tiene tipos compatibles.",
    "diagram": [],
    "rules": [
      "No metas type checking en el lexer.",
      "No destruyas información de ubicación demasiado pronto.",
      "Unicode, escapes, comentarios y literales pueden complicar mucho una fase aparentemente sencilla."
    ],
    "deep": {
      "sections": [
        {
          "title": "Especificación léxica",
          "body": "Puede expresarse con expresiones regulares/autómatas para muchas categorías, aunque lenguajes reales añaden casos contextuales."
        },
        {
          "title": "Maximal munch",
          "body": "Cuando varias reglas coinciden, suele elegirse la coincidencia válida más larga, con prioridades definidas por la especificación."
        },
        {
          "title": "Errores",
          "body": "Un lexer robusto informa un token/caracter inválido con rango de fuente y trata de recuperarse sin cascadas absurdas."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Entrada: `let total = a+42;`",
      "steps": [
        [
          "Paso 1",
          "Reconoce `let` como keyword."
        ],
        [
          "Paso 2",
          "Reconoce `total` y `a` como identifiers."
        ],
        [
          "Paso 3",
          "Reconoce `=`, `+`, `;` como punctuation/operators."
        ],
        [
          "Paso 4",
          "Reconoce `42` como integer literal."
        ]
      ],
      "answer": "Se produce una secuencia de tokens con spans."
    },
    "check": {
      "question": "¿El lexer debería decidir por sí solo si `a` está declarado?",
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
          "Solo en compiladores JIT",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Eso pertenece a análisis semántico/símbolos, no a tokenización."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿“identifier” puede ser el token kind y “contador” su lexeme? sí/no",
        "answer": "si",
        "hint": "Categoría frente al texto concreto."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Guardar línea/columna o spans ayuda a diagnósticos? sí/no",
        "answer": "si",
        "hint": "Necesitas señalar el origen."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Maximal munch significa escoger siempre el token más corto? sí/no",
        "answer": "no",
        "hint": "Es justamente la coincidencia válida más larga en el esquema típico."
      }
    ]
  },
  "grammar-parser": {
    "id": "grammar-parser",
    "courseId": 10,
    "title": "Gramáticas y parsers",
    "shortTitle": "La recursión ahora tiene papeles",
    "duration": 100,
    "objective": "explicar cómo una gramática define estructura sintáctica y comparar recursive descent, precedencia y LR a nivel conceptual, incluyendo ambigüedad y recuperación de errores.",
    "summary": [
      "Una gramática ambigua puede dar más de un árbol a la misma entrada.",
      "Left recursion es problemática para recursive descent ingenuo, pero no para todos los algoritmos de parsing.",
      "Error recovery es parte del diseño de un parser usable, no un añadido cosmético."
    ],
    "concept": "Un parser transforma tokens en estructura sintáctica conforme a una gramática. La gramática debe capturar precedencia/asociatividad o el parser debe imponerlas mediante una técnica equivalente.",
    "diagram": [],
    "rules": [
      "No confundas parser con regex gigante.",
      "No elimines paréntesis/precedencia sin conservar su efecto semántico.",
      "Una gramática que acepta demasiado puede desplazar errores hacia fases posteriores y empeorar mensajes."
    ],
    "deep": {
      "sections": [
        {
          "title": "CFG",
          "body": "Una context-free grammar usa producciones para describir cómo símbolos no terminales forman estructuras."
        },
        {
          "title": "Precedencia",
          "body": "`1+2*3` necesita estructura equivalente a `1+(2*3)` si `*` tiene mayor precedencia."
        },
        {
          "title": "Algoritmos",
          "body": "Recursive descent es sencillo de implementar a mano; LR/LALR y variantes manejan otras clases de gramáticas con tablas/automación."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Parsea `1 + 2 * 3`.",
      "steps": [
        [
          "Paso 1",
          "Tokeniza números y operadores."
        ],
        [
          "Paso 2",
          "La regla de multiplicación agrupa `2*3`."
        ],
        [
          "Paso 3",
          "La regla de suma combina `1` con ese subárbol."
        ]
      ],
      "answer": "El árbol representa 1+(2*3)."
    },
    "check": {
      "question": "¿Una gramática ambigua puede producir dos parses válidos para la misma secuencia?",
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
          "Solo con Unicode",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Eso es precisamente ambigüedad sintáctica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿La precedencia puede representarse mediante niveles de no terminales? sí/no",
        "answer": "si",
        "hint": "expr/term/factor es el patrón clásico."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Left recursion directa rompe recursive descent ingenuo? sí/no",
        "answer": "si",
        "hint": "Puede recursar sin consumir entrada."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Todos los algoritmos de parsing requieren eliminar left recursion? sí/no",
        "answer": "no",
        "hint": "La limitación depende del algoritmo."
      }
    ]
  },
  "ast-semantics-types": {
    "id": "ast-semantics-types",
    "courseId": 10,
    "title": "AST, símbolos, semántica y type checking",
    "shortTitle": "La sintaxis pasó; ahora toca demostrar que significa algo",
    "duration": 100,
    "objective": "construir ASTs y realizar name resolution y type checking separando estructura sintáctica, scopes, símbolos y reglas semánticas.",
    "summary": [
      "Parse tree y AST no tienen por qué contener el mismo nivel de detalle.",
      "Name resolution suele depender de scopes y tablas de símbolos.",
      "Type checking puede ser estático, dinámico o mixto según el lenguaje; no todo compilador exige el mismo modelo."
    ],
    "concept": "El AST elimina detalles sintácticos irrelevantes y conserva la estructura semántica necesaria. Después, análisis de nombres y tipos determina si referencias y operaciones son válidas bajo las reglas del lenguaje.",
    "diagram": [],
    "rules": [
      "No uses una única tabla global si el lenguaje tiene scopes léxicos.",
      "No confundas type inference con ausencia de tipos.",
      "No hagas codegen antes de haber establecido invariantes semánticas suficientes."
    ],
    "deep": {
      "sections": [
        {
          "title": "AST",
          "body": "Nodos como BinaryExpr, Call, If, FunctionDecl representan intención del programa sin cada token de puntuación."
        },
        {
          "title": "Nombres",
          "body": "Resolver un identifier significa asociarlo con la declaración/entidad visible correcta según scopes y reglas de shadowing."
        },
        {
          "title": "Tipos",
          "body": "El checker valida operaciones, conversiones y llamadas; puede anotar el AST/IR con tipos resultantes."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "`let x:int = 3; x + true`",
      "steps": [
        [
          "Paso 1",
          "El parser puede aceptar sintácticamente la expresión."
        ],
        [
          "Paso 2",
          "Name resolution vincula `x` con su declaración."
        ],
        [
          "Paso 3",
          "Type checking ve `int + bool` y consulta las reglas del lenguaje."
        ],
        [
          "Paso 4",
          "Si no existe operación/conversión válida, emite error semántico."
        ]
      ],
      "answer": "Sintaxis válida no implica programa semánticamente válido."
    },
    "check": {
      "question": "¿Un programa puede parsear correctamente y fallar en type checking?",
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
          "Solo si usa pointers",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Parsing comprueba estructura; los tipos son una capa posterior en muchos diseños."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un AST suele omitir puntuación irrelevante como ciertos paréntesis ya reflejados en la estructura? sí/no",
        "answer": "si",
        "hint": "Conserva significado, no cada token."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Shadowing obliga a considerar scope al resolver nombres? sí/no",
        "answer": "si",
        "hint": "El mismo nombre puede referirse a distintas declaraciones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Type inference significa que el lenguaje no tiene tipos? sí/no",
        "answer": "no",
        "hint": "Puede inferirlos en vez de exigir anotaciones explícitas."
      }
    ]
  },
  "ir-ssa": {
    "id": "ir-ssa",
    "courseId": 10,
    "title": "Intermediate Representation y SSA",
    "shortTitle": "El idioma común dentro del compilador",
    "duration": 105,
    "objective": "explicar por qué los compiladores usan IRs y cómo SSA facilita análisis y transformaciones sin confundir LLVM IR con una ISA o con assembly físico.",
    "summary": [
      "IR puede existir a varios niveles: alto, medio y cercano a máquina.",
      "SSA habla de nombres/valores en la representación, no de que el hardware tenga registros infinitos.",
      "LLVM IR tiene semántica propia; no es “assembly portable” en el sentido de una ISA de hardware."
    ],
    "concept": "Una IR desacopla el frontend del backend y ofrece una representación diseñada para análisis/transformación. SSA exige que cada nombre SSA se defina una vez y usa mecanismos como `phi` o equivalentes para fusionar valores de control flow.",
    "diagram": [],
    "rules": [
      "No identifiques `%x` de LLVM IR con un registro físico.",
      "No elimines control-flow semantics al hacer transformaciones SSA.",
      "Poison/undef y atributos de IR pueden afectar profundamente la legalidad de optimizaciones."
    ],
    "deep": {
      "sections": [
        {
          "title": "Por qué IR",
          "body": "Permite N frontends × M targets sin escribir N×M compiladores completos."
        },
        {
          "title": "SSA",
          "body": "Cada definición produce un valor nuevo; esto simplifica use-def chains y muchas optimizaciones."
        },
        {
          "title": "Phi",
          "body": "En SSA clásica, un `phi` selecciona el valor correspondiente al predecessor del bloque, modelando merges de control."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "if cond: x=1 else: x=2; y=x+3",
      "steps": [
        [
          "Paso 1",
          "Cada rama produce un valor SSA distinto."
        ],
        [
          "Paso 2",
          "En el bloque merge se combina con un phi/equivalente."
        ],
        [
          "Paso 3",
          "`y` usa el valor resultante."
        ]
      ],
      "answer": "SSA hace explícita la procedencia del valor."
    },
    "check": {
      "question": "¿Un valor SSA es necesariamente un registro físico de CPU?",
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
          "Solo en LLVM",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Es una entidad de la representación; register allocation ocurre después."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una IR puede facilitar reutilizar un backend para varios lenguajes? sí/no",
        "answer": "si",
        "hint": "Desacopla frontend y target."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿SSA exige una única asignación por nombre SSA? sí/no",
        "answer": "si",
        "hint": "Static Single Assignment."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿LLVM IR y x86-64 son la misma capa? sí/no",
        "answer": "no",
        "hint": "Una es IR de compilador; la otra, ISA."
      }
    ]
  },
  "compiler-optimization": {
    "id": "compiler-optimization",
    "courseId": 10,
    "title": "Optimización: preservar semántica, cambiar implementación",
    "shortTitle": "Más rápido sin cambiar el programa... dentro del contrato",
    "duration": 100,
    "objective": "analizar optimizaciones como constant folding, DCE, CSE, inlining y loop transforms entendiendo que su legalidad depende de la semántica observable del lenguaje/IR.",
    "summary": [
      "Constant folding evalúa expresiones conocidas en compile time.",
      "Dead code elimination elimina trabajo sin efectos observables requeridos.",
      "Aliasing, overflow, floating-point y concurrencia condicionan qué transformaciones son legales."
    ],
    "concept": "Optimizar no significa “hacer cualquier transformación que parezca equivalente en ejemplos”. El compilador puede cambiar radicalmente la implementación solo si preserva el comportamiento exigido por el modelo semántico relevante.",
    "diagram": [],
    "rules": [
      "No uses “as-if rule” como permiso para ignorar comportamiento observable.",
      "No supongas asociatividad real exacta de floating point.",
      "No confundas inlining con macro expansion: opera sobre representación semántica y tiene otros efectos/costes."
    ],
    "deep": {
      "sections": [
        {
          "title": "Local y global",
          "body": "Algunas optimizaciones miran un bloque; otras requieren CFG, dataflow o información interprocedural."
        },
        {
          "title": "Cost model",
          "body": "Una transformación legal no es necesariamente rentable en un target/workload concreto."
        },
        {
          "title": "Semántica",
          "body": "Flags/metadata de IR y reglas del lenguaje pueden ampliar o restringir transformaciones posibles."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "`int f(){ return 2*3+4; }`",
      "steps": [
        [
          "Paso 1",
          "El frontend/IR representa operaciones constantes."
        ],
        [
          "Paso 2",
          "Constant folding calcula 2*3 y luego +4."
        ],
        [
          "Paso 3",
          "Codegen puede emitir directamente el valor 10."
        ]
      ],
      "answer": "El resultado observable se preserva sin ejecutar las operaciones originales."
    },
    "check": {
      "question": "¿Toda transformación semánticamente legal mejora rendimiento?",
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
          "Solo con -O3",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Legalidad y rentabilidad son decisiones distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿DCE puede eliminar una computación cuyo resultado no se usa y sin efectos observables? sí/no",
        "answer": "si",
        "hint": "Dead code."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿`(a+b)+c` y `a+(b+c)` son siempre exactamente equivalentes en IEEE 754? sí/no",
        "answer": "no",
        "hint": "El redondeo puede cambiar."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Inlining puede aumentar tamaño de código? sí/no",
        "answer": "si",
        "hint": "Duplicar cuerpos tiene coste de i-cache/code size."
      }
    ]
  },
  "codegen-register-allocation": {
    "id": "codegen-register-allocation",
    "courseId": 10,
    "title": "Code generation y register allocation",
    "shortTitle": "De valores infinitos imaginarios a registros finitos",
    "duration": 105,
    "objective": "explicar instruction selection, scheduling y register allocation, incluyendo spills y calling convention, sin asumir que una IR se traduce instrucción por instrucción.",
    "summary": [
      "Instruction selection busca patrones legales/rentables del target.",
      "Register allocation puede introducir spills/reloads.",
      "Calling convention reserva roles y preservación para ciertos registros en fronteras de llamada."
    ],
    "concept": "El backend selecciona operaciones del target, asigna recursos físicos y respeta ABI. Una operación IR puede expandirse, fusionarse o desaparecer; register allocation mapea muchos valores virtuales sobre un conjunto finito de registros y memoria.",
    "diagram": [],
    "rules": [
      "No esperes correspondencia 1:1 IR→machine instruction.",
      "No asumas que más registros virtuales implica más registros físicos.",
      "Un spill no es necesariamente un bug: puede ser la mejor solución bajo presión de registros."
    ],
    "deep": {
      "sections": [
        {
          "title": "Selection",
          "body": "Convierte operaciones abstractas en instrucciones/idiomas del target, aprovechando addressing modes y extensiones."
        },
        {
          "title": "Allocation",
          "body": "Interference y liveness ayudan a decidir qué valores pueden compartir registro."
        },
        {
          "title": "Scheduling",
          "body": "Reordenar dentro de dependencias puede mejorar uso de unidades o latencias en ciertos targets."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Cinco valores vivos compiten por tres registros disponibles en un punto.",
      "steps": [
        [
          "Paso 1",
          "El allocator calcula liveness/interferencia."
        ],
        [
          "Paso 2",
          "Asigna registros a valores compatibles."
        ],
        [
          "Paso 3",
          "Si la presión excede recursos, algún valor puede spillarse a stack/memoria."
        ],
        [
          "Paso 4",
          "Se insertan reloads donde sea necesario."
        ]
      ],
      "answer": "La escasez física se resuelve mediante asignación y, si hace falta, spills."
    },
    "check": {
      "question": "¿Cada valor SSA debe terminar en un registro físico distinto?",
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
          "Solo en RISC-V",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Los lifetimes permiten reutilización y algunos valores ni siquiera sobreviven hasta machine code."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Register allocation ocurre conceptualmente después de disponer de valores virtuales? sí/no",
        "answer": "si",
        "hint": "Mapea virtuales a físicos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un spill guarda temporalmente un valor fuera de registros? sí/no",
        "answer": "si",
        "hint": "Normalmente en stack/frame u otra ubicación definida."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La calling convention condiciona registros disponibles para el backend? sí/no",
        "answer": "si",
        "hint": "Hay caller/callee-saved y registros con roles especiales."
      }
    ]
  },
  "bytecode-vm": {
    "id": "bytecode-vm",
    "courseId": 10,
    "title": "Bytecode y máquinas virtuales",
    "shortTitle": "Otra ISA, pero esta vez inventada por software",
    "duration": 90,
    "objective": "distinguir bytecode, VM, interpreter y runtime, diseñando una máquina stack o register-based y entendiendo sus trade-offs.",
    "summary": [
      "Una VM puede ser stack-based o register-based.",
      "Bytecode puede mejorar portabilidad al fijar una ISA virtual estable.",
      "El runtime puede incluir GC, loader, verifier, profiler y servicios más allá del intérprete."
    ],
    "concept": "Bytecode es una representación ejecutable por una máquina virtual, no necesariamente por CPU física. Una VM define estado e instrucciones abstractas y un intérprete puede implementar su ciclo fetch/decode/execute en software.",
    "diagram": [],
    "rules": [
      "No confundas VM con virtualización de hardware.",
      "No confundas bytecode con texto fuente serializado.",
      "Una VM no necesita ser lenta por definición; puede incorporar JIT y especialización."
    ],
    "deep": {
      "sections": [
        {
          "title": "Stack VM",
          "body": "Operaciones consumen/produccen valores en una pila operand stack; instrucciones suelen ser compactas."
        },
        {
          "title": "Register VM",
          "body": "Instrucciones nombran registros virtuales explícitos y pueden reducir tráfico de push/pop."
        },
        {
          "title": "Runtime",
          "body": "La VM es una abstracción; su implementación concreta decide dispatch, memoria, GC y optimización."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Bytecode stack: PUSH 2, PUSH 3, ADD, RET",
      "steps": [
        [
          "Paso 1",
          "PUSH 2 deja 2 en la pila."
        ],
        [
          "Paso 2",
          "PUSH 3 deja 3 encima."
        ],
        [
          "Paso 3",
          "ADD consume ambos y empuja 5."
        ],
        [
          "Paso 4",
          "RET devuelve/termina con el valor definido por la VM."
        ]
      ],
      "answer": "Resultado: 5."
    },
    "check": {
      "question": "¿Bytecode implica que la CPU física lo ejecute directamente?",
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
          "Solo en Java",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Normalmente lo interpreta o traduce un runtime/VM."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una stack VM puede implementar ADD consumiendo dos operandos de la pila? sí/no",
        "answer": "si",
        "hint": "Es el modelo habitual."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una VM de bytecode es lo mismo que un hypervisor? sí/no",
        "answer": "no",
        "hint": "Son virtualizaciones de capas distintas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El mismo bytecode puede ejecutarse en hosts distintos si existe una VM compatible? sí/no",
        "answer": "si",
        "hint": "Esa es una ventaja de una ISA virtual."
      }
    ]
  },
  "jit-compilation": {
    "id": "jit-compilation",
    "courseId": 10,
    "title": "JIT: compilar con información del programa vivo",
    "shortTitle": "El compilador que espera a tener chismes del runtime",
    "duration": 100,
    "objective": "explicar tiered compilation, profiling, specialization, guards y deoptimization como técnicas JIT, separando latencia de compilación y calidad de código.",
    "summary": [
      "JIT y interpreter pueden coexistir en un runtime por tiers.",
      "Especialización suele apoyarse en guards que validan supuestos.",
      "Deoptimization permite volver a una representación menos especializada cuando un supuesto falla."
    ],
    "concept": "Un JIT compila durante la ejecución y puede usar perfiles reales para especializar caminos calientes. A cambio paga tiempo/memoria de compilación y necesita mecanismos para invalidar supuestos cuando dejan de ser ciertos.",
    "diagram": [],
    "rules": [
      "No digas que JIT siempre supera AOT: depende del workload, warmup y costes.",
      "No confundas cache de código JIT con KV cache o cache de CPU.",
      "Perfilar cambia overhead y puede sesgar decisiones si la fase observada no representa el resto."
    ],
    "deep": {
      "sections": [
        {
          "title": "Warmup",
          "body": "Al inicio puede interpretarse o usar código de baja optimización mientras se recogen perfiles."
        },
        {
          "title": "Hot paths",
          "body": "Métodos/bloques frecuentes reciben compilación más cara porque amortizan el coste."
        },
        {
          "title": "Deopt",
          "body": "Si un guard falla, el runtime reconstruye un estado válido para continuar en código menos especializado/interpreter."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una llamada recibe casi siempre objetos de tipo A.",
      "steps": [
        [
          "Paso 1",
          "El profiler observa el patrón."
        ],
        [
          "Paso 2",
          "El JIT genera un camino especializado para A protegido por un guard."
        ],
        [
          "Paso 3",
          "Mientras el guard se cumple, usa el camino rápido."
        ],
        [
          "Paso 4",
          "Si llega B, deoptimiza o entra en fallback."
        ]
      ],
      "answer": "La especialización es válida mientras se verifican sus supuestos."
    },
    "check": {
      "question": "¿Un JIT puede necesitar deoptimización?",
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
          "Solo si usa GC",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Los supuestos especulativos pueden dejar de ser válidos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Tiered compilation puede combinar interpreter y varios niveles de JIT? sí/no",
        "answer": "si",
        "hint": "Es un diseño común."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿JIT elimina por completo el coste de compilación? sí/no",
        "answer": "no",
        "hint": "Lo mueve al runtime."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un guard comprueba que sigue siendo válido un supuesto de especialización? sí/no",
        "answer": "si",
        "hint": "Si falla puede activar fallback/deopt."
      }
    ]
  },
  "language-compiler-project": {
    "id": "language-compiler-project",
    "courseId": 10,
    "title": "Proyecto: lenguaje, intérprete, compilador pequeño y VM",
    "shortTitle": "Construye el dragón por capas",
    "duration": 120,
    "objective": "integrar lexer, parser, AST, semántica, bytecode/IR, VM y backend mínimo en un lenguaje pequeño con pruebas y diagnósticos reproducibles.",
    "summary": [
      "Empieza con una especificación mínima del lenguaje antes del código.",
      "Haz cada fase testeable de forma independiente y conserva spans para errores.",
      "Añade características solo cuando la cadena anterior tenga invariantes y pruebas."
    ],
    "concept": "El proyecto no busca inventar “el próximo Rust” en una tarde. Busca construir una cadena vertical verificable donde cada fase tenga entradas, salidas e invariantes claras.",
    "diagram": [],
    "rules": [
      "No diseñes sintaxis durante el debugging del backend.",
      "No mezcles parser, evaluator y codegen en una sola función gigante.",
      "No añadas closures, GC y generics antes de tener variables, control flow y funciones sólidas."
    ],
    "deep": {
      "sections": [
        {
          "title": "MVP",
          "body": "Literales, variables, aritmética, if/while, funciones simples y errores con spans son suficientes para una primera vertical slice."
        },
        {
          "title": "Dos backends",
          "body": "Una opción pedagógica potente es interpretar AST/bytecode primero y después añadir codegen a una ISA/assembly o C como backend."
        },
        {
          "title": "Verificación",
          "body": "Golden tests, parser tests, semantic error tests y differential testing entre interpreter/compiler encuentran divergencias rápidamente."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Planifica un lenguaje con expresiones, variables y funciones.",
      "steps": [
        [
          "Paso 1",
          "Define grammar y semántica por escrito."
        ],
        [
          "Paso 2",
          "Implementa lexer y parser con AST."
        ],
        [
          "Paso 3",
          "Añade resolución de nombres y tipos/reglas semánticas."
        ],
        [
          "Paso 4",
          "Genera bytecode y ejecuta en VM; luego añade un backend pequeño opcional."
        ]
      ],
      "answer": "La arquitectura permite observar cada transformación."
    },
    "check": {
      "question": "¿Conviene probar cada fase de forma aislada además de end-to-end?",
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
          "Solo el lexer",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Los fallos son mucho más localizables cuando cada frontera tiene contratos y tests."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una especificación mínima del lenguaje debe preceder a implementar todos los detalles? sí/no",
        "answer": "si",
        "hint": "Necesitas saber qué significa cada construcción."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Differential testing puede comparar interpreter y compiler con los mismos programas? sí/no",
        "answer": "si",
        "hint": "Deben concordar en comportamiento definido."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Separar fases facilita diagnostics y testing? sí/no",
        "answer": "si",
        "hint": "Cada fase tiene entradas/salidas claras."
      }
    ]
  }
});
