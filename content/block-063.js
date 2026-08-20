/**
 * BLOQUE 063 — TRANSFORMERS
 *
 * Regla editorial: Transformer describe una arquitectura concreta de representación,
 * atención, MLP, residuals y normalización. No usamos “attention” como explicación
 * mágica: cada lección declara shapes, origen de Q/K/V y contrato de información.
 */
window.LEARNING_PATHS[63] = {
  "level": "Transformers",
  "estimatedHours": 164,
  "description": "Arquitectura Transformer desde tensores y flujo de información: tokens, embeddings, posiciones, Q/K/V, attention, heads, FFN, residuals, LayerNorm, encoder, decoder y causal masking.",
  "outcomes": [
    "Derivar shapes y parámetros de embeddings, Q/K/V, multi-head attention y FFN.",
    "Explicar scaled dot-product attention, masking y coste cuadrático de attention densa.",
    "Distinguir encoder, decoder, self-attention y cross-attention sin mezclar sus contratos de información.",
    "Construir un Transformer pequeño trazando cada tensor y validando que ninguna posición vea información prohibida."
  ],
  "modules": [
    {
      "id": "m1-input",
      "title": "Representación de entrada",
      "description": "Representación de entrada",
      "lessons": [
        "tf-tokens",
        "tf-embeddings",
        "tf-positional"
      ]
    },
    {
      "id": "m2-attention",
      "title": "Q/K/V y atención",
      "description": "Q/K/V y atención",
      "lessons": [
        "tf-query",
        "tf-key",
        "tf-value",
        "tf-self-attention",
        "tf-multihead"
      ]
    },
    {
      "id": "m3-block",
      "title": "Bloque Transformer",
      "description": "Bloque Transformer",
      "lessons": [
        "tf-ffn",
        "tf-residual",
        "tf-layernorm"
      ]
    },
    {
      "id": "m4-architecture",
      "title": "Encoder, decoder y masking",
      "description": "Encoder, decoder y masking",
      "lessons": [
        "tf-encoder",
        "tf-decoder",
        "tf-causal-mask"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "tf-tokens": {
    "id": "tf-tokens",
    "courseId": 63,
    "title": "Tokens: unidades discretas antes del Transformer",
    "shortTitle": "Tokens",
    "duration": 115,
    "objective": "Entender qué representa un token y por qué token, palabra, carácter y byte no son sinónimos.",
    "summary": [
      "La tokenización es una transformación previa al modelo: texto/entrada → unidades → IDs; el Transformer no recibe palabras “semánticas” directamente.",
      "Un token puede representar palabra, subpalabra, carácter, byte u otra unidad según el tokenizer. Cambiar tokenizer cambia longitud, vocabulario y compatibilidad con embeddings.",
      "Cuenta tokens con el tokenizer real del modelo; contar espacios o palabras no es una sustitución fiable."
    ],
    "concept": "El Transformer recibe secuencias de IDs discretos; la tokenización determina la granularidad antes de cualquier atención.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Entender qué representa un token y por qué token, palabra, carácter y byte no son sinónimos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La tokenización es una transformación previa al modelo: texto/entrada → unidades → IDs; el Transformer no recibe palabras “semánticas” directamente."
        },
        {
          "title": "Mecánica y límites",
          "body": "Un token puede representar palabra, subpalabra, carácter, byte u otra unidad según el tokenizer. Cambiar tokenizer cambia longitud, vocabulario y compatibilidad con embeddings."
        },
        {
          "title": "Ingeniería",
          "body": "Cuenta tokens con el tokenizer real del modelo; contar espacios o palabras no es una sustitución fiable."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "Una secuencia de 12 tokens con contexto máximo de 16 deja cuántas posiciones libres?",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "4"
    },
    "check": {
      "question": "¿Un token equivale siempre a una palabra?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "El Transformer recibe secuencias de IDs discretos; la tokenización determina la granularidad antes de cualquier atención."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una secuencia de 12 tokens con contexto máximo de 16 deja cuántas posiciones libres?",
        "answer": "4",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Debes contar tokens con el tokenizer real en vez de asumir una palabra por token?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cambiar tokenizer puede cambiar la longitud de contexto medida en tokens?",
        "answer": "si",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-embeddings": {
    "id": "tf-embeddings",
    "courseId": 63,
    "title": "Embeddings y dimensión del modelo",
    "shortTitle": "Embeddings",
    "duration": 120,
    "objective": "Construir la representación vectorial inicial y distinguir tabla de embeddings, dimensión del modelo y significado aprendido.",
    "summary": [
      "La tabla E∈R^{V×d_model} selecciona una fila por token; no es one-hot almacenado explícitamente en cada paso.",
      "La geometría surge del objetivo y los datos. Cercanía vectorial describe una regularidad aprendida, no una ontología humana universal.",
      "Si se comparten pesos entre embedding y output projection, dilo explícitamente: weight tying es una decisión arquitectónica, no una propiedad obligatoria del Transformer."
    ],
    "concept": "Un embedding convierte cada ID discreto en un vector d_model aprendido; la tabla tiene vocab_size × d_model parámetros salvo sharing/tie específico.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Construir la representación vectorial inicial y distinguir tabla de embeddings, dimensión del modelo y significado aprendido.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La tabla E∈R^{V×d_model} selecciona una fila por token; no es one-hot almacenado explícitamente en cada paso."
        },
        {
          "title": "Mecánica y límites",
          "body": "La geometría surge del objetivo y los datos. Cercanía vectorial describe una regularidad aprendida, no una ontología humana universal."
        },
        {
          "title": "Ingeniería",
          "body": "Si se comparten pesos entre embedding y output projection, dilo explícitamente: weight tying es una decisión arquitectónica, no una propiedad obligatoria del Transformer."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "Vocabulario 8000 y d_model 256. Parámetros de la tabla de embeddings.",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "2048000"
    },
    "check": {
      "question": "¿Dos tokens con embedding cercano tienen significado humano idéntico por definición?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Un embedding convierte cada ID discreto en un vector d_model aprendido; la tabla tiene vocab_size × d_model parámetros salvo sharing/tie específico."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Vocabulario 8000 y d_model 256. Parámetros de la tabla de embeddings.",
        "answer": "2048000",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La tabla de embeddings forma parte de los parámetros aprendibles normalmente?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Weight tying debe declararse en vez de asumirse?",
        "answer": "si",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-positional": {
    "id": "tf-positional",
    "courseId": 63,
    "title": "Positional encoding y orden",
    "shortTitle": "Positional encoding",
    "duration": 120,
    "objective": "Explicar por qué la atención sin información posicional no distingue por sí sola permutaciones y comparar posiciones fijas/aprendidas.",
    "summary": [
      "El Transformer original suma codificaciones posicionales sinusoidales a embeddings de token; otras arquitecturas usan posiciones aprendidas o mecanismos relativos/rotatorios.",
      "Positional information ≠ token identity. Dos tokens iguales en posiciones distintas pueden compartir embedding léxico y diferir por la información posicional.",
      "No atribuyas propiedades de RoPE/relative bias al Transformer original: son variantes posteriores."
    ],
    "concept": "Self-attention necesita alguna fuente de información sobre orden/posición si la tarea depende de secuencia; el mecanismo base no contiene una noción absoluta de “primero” o “después”.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Explicar por qué la atención sin información posicional no distingue por sí sola permutaciones y comparar posiciones fijas/aprendidas.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El Transformer original suma codificaciones posicionales sinusoidales a embeddings de token; otras arquitecturas usan posiciones aprendidas o mecanismos relativos/rotatorios."
        },
        {
          "title": "Mecánica y límites",
          "body": "Positional information ≠ token identity. Dos tokens iguales en posiciones distintas pueden compartir embedding léxico y diferir por la información posicional."
        },
        {
          "title": "Ingeniería",
          "body": "No atribuyas propiedades de RoPE/relative bias al Transformer original: son variantes posteriores."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "Con d_model 512 y longitud 128, shape de una matriz posicional por posición en número de escalares.",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "65536"
    },
    "check": {
      "question": "¿Self-attention base conoce el orden absoluto solo por los IDs de token?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Self-attention necesita alguna fuente de información sobre orden/posición si la tarea depende de secuencia; el mecanismo base no contiene una noción absoluta de “primero” o “después”."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Con d_model 512 y longitud 128, shape de una matriz posicional por posición en número de escalares.",
        "answer": "65536",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La información posicional y la identidad del token son señales distintas?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Las codificaciones sinusoidales del Transformer original son solo una opción entre varias?",
        "answer": "si",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-query": {
    "id": "tf-query",
    "courseId": 63,
    "title": "Query: qué busca cada posición",
    "shortTitle": "Query",
    "duration": 115,
    "objective": "Derivar Q=XW_Q y entender la query como representación usada para puntuar compatibilidad con keys.",
    "summary": [
      "Para una cabeza típica: Q=XW_Q, K=XW_K y V=XW_V; las proyecciones son parámetros aprendidos distintos aunque tengan shapes compatibles.",
      "La semántica funcional de Q/K/V emerge del entrenamiento; evita antropomorfizar un vector de query como una pregunta simbólica explícita.",
      "Comprueba siempre batch, heads, sequence length y head dimension antes de multiplicar tensores."
    ],
    "concept": "Cada posición proyecta su estado a un espacio de query. La query no “contiene la pregunta en lenguaje natural”; es un vector aprendido para el cálculo de compatibilidad.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Derivar Q=XW_Q y entender la query como representación usada para puntuar compatibilidad con keys.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Para una cabeza típica: Q=XW_Q, K=XW_K y V=XW_V; las proyecciones son parámetros aprendidos distintos aunque tengan shapes compatibles."
        },
        {
          "title": "Mecánica y límites",
          "body": "La semántica funcional de Q/K/V emerge del entrenamiento; evita antropomorfizar un vector de query como una pregunta simbólica explícita."
        },
        {
          "title": "Ingeniería",
          "body": "Comprueba siempre batch, heads, sequence length y head dimension antes de multiplicar tensores."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "X tiene shape 32×512 y W_Q 512×64. Número de escalares en Q.",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "2048"
    },
    "check": {
      "question": "¿Q se obtiene necesariamente de una matriz distinta de K y V?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Cada posición proyecta su estado a un espacio de query. La query no “contiene la pregunta en lenguaje natural”; es un vector aprendido para el cálculo de compatibilidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "X tiene shape 32×512 y W_Q 512×64. Número de escalares en Q.",
        "answer": "2048",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Q suele ser una proyección aprendida del estado de entrada de la cabeza?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La semántica de una query emerge del entrenamiento en vez de ser una pregunta simbólica literal?",
        "answer": "si",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-key": {
    "id": "tf-key",
    "courseId": 63,
    "title": "Key: índice aprendido para compatibilidad",
    "shortTitle": "Key",
    "duration": 115,
    "objective": "Explicar K=XW_K y cómo las keys participan en scores sin confundirse con los valores que finalmente se agregan.",
    "summary": [
      "QK^T produce compatibilidades; V contiene las representaciones que se combinarán después de normalizar los scores.",
      "Una key puede obtener score alto para una query sin que su vector se sume directamente a la salida: lo que se pondera es el value correspondiente.",
      "Key/value pueden provenir de la misma secuencia en self-attention o de otra fuente en cross-attention."
    ],
    "concept": "Las keys son vectores contra los que se comparan las queries para producir scores de atención; no son el contenido agregado final.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Explicar K=XW_K y cómo las keys participan en scores sin confundirse con los valores que finalmente se agregan.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "QK^T produce compatibilidades; V contiene las representaciones que se combinarán después de normalizar los scores."
        },
        {
          "title": "Mecánica y límites",
          "body": "Una key puede obtener score alto para una query sin que su vector se sume directamente a la salida: lo que se pondera es el value correspondiente."
        },
        {
          "title": "Ingeniería",
          "body": "Key/value pueden provenir de la misma secuencia en self-attention o de otra fuente en cross-attention."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "Secuencia 20, d_k 32. Una matriz K por cabeza contiene cuántos escalares.",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "640"
    },
    "check": {
      "question": "¿La key es el mismo papel matemático que el value?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Las keys son vectores contra los que se comparan las queries para producir scores de atención; no son el contenido agregado final."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Secuencia 20, d_k 32. Una matriz K por cabeza contiene cuántos escalares.",
        "answer": "640",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿K participa en el cálculo de scores de compatibilidad?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Self-attention y cross-attention pueden diferir en el origen de keys/values?",
        "answer": "si",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-value": {
    "id": "tf-value",
    "courseId": 63,
    "title": "Value: contenido que se mezcla",
    "shortTitle": "Value",
    "duration": 115,
    "objective": "Entender V=XW_V y la salida como combinación ponderada de values.",
    "summary": [
      "Attention = softmax(scores)·V: los weights y los contents tienen papeles separados.",
      "Cada fila de pesos softmax suma 1 sobre las posiciones permitidas, salvo detalles numéricos/masking de implementación.",
      "Cambiar V manteniendo Q/K fijos puede cambiar la salida sin cambiar los pesos; cambiar Q/K puede cambiar pesos aun con V fijo."
    ],
    "concept": "Los values son los vectores que se agregan con los pesos de atención; los scores se calculan con Q y K, no comparando directamente V con Q.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Entender V=XW_V y la salida como combinación ponderada de values.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Attention = softmax(scores)·V: los weights y los contents tienen papeles separados."
        },
        {
          "title": "Mecánica y límites",
          "body": "Cada fila de pesos softmax suma 1 sobre las posiciones permitidas, salvo detalles numéricos/masking de implementación."
        },
        {
          "title": "Ingeniería",
          "body": "Cambiar V manteniendo Q/K fijos puede cambiar la salida sin cambiar los pesos; cambiar Q/K puede cambiar pesos aun con V fijo."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "Pesos 0.2,0.3,0.5 y values escalares 1,2,4. Salida ponderada.",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "2.8"
    },
    "check": {
      "question": "¿Los values determinan por sí solos los pesos softmax?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Los values son los vectores que se agregan con los pesos de atención; los scores se calculan con Q y K, no comparando directamente V con Q."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Pesos 0.2,0.3,0.5 y values escalares 1,2,4. Salida ponderada.",
        "answer": "2.8",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La salida ponderada combina values y no keys?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cambiar V con Q/K fijos puede cambiar la salida sin cambiar los pesos?",
        "answer": "si",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-self-attention": {
    "id": "tf-self-attention",
    "courseId": 63,
    "title": "Self-attention escalada",
    "shortTitle": "Self-attention",
    "duration": 135,
    "objective": "Derivar scaled dot-product self-attention, shapes y coste cuadrático en longitud de secuencia.",
    "summary": [
      "La fórmula base es Attention(Q,K,V)=softmax(QK^T/√d_k)V, con masking cuando corresponda.",
      "Para longitud n, la matriz densa de scores por cabeza tiene n×n elementos; por eso memoria/cómputo de atención densa crecen cuadráticamente en n para esa parte.",
      "Softmax normaliza scores, no convierte atención en una explicación causal ni en una medida garantizada de importancia humana."
    ],
    "concept": "En self-attention, Q, K y V se derivan de la misma secuencia. Los scores típicos son QK^T/√d_k antes de mask y softmax.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Derivar scaled dot-product self-attention, shapes y coste cuadrático en longitud de secuencia.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La fórmula base es Attention(Q,K,V)=softmax(QK^T/√d_k)V, con masking cuando corresponda."
        },
        {
          "title": "Mecánica y límites",
          "body": "Para longitud n, la matriz densa de scores por cabeza tiene n×n elementos; por eso memoria/cómputo de atención densa crecen cuadráticamente en n para esa parte."
        },
        {
          "title": "Ingeniería",
          "body": "Softmax normaliza scores, no convierte atención en una explicación causal ni en una medida garantizada de importancia humana."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "d_k=64. Factor divisor sqrt(d_k).",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "8"
    },
    "check": {
      "question": "¿El factor 1/√d_k reduce el tamaño típico de los logits cuando crece d_k?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "En self-attention, Q, K y V se derivan de la misma secuencia. Los scores típicos son QK^T/√d_k antes de mask y softmax."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "d_k=64. Factor divisor sqrt(d_k).",
        "answer": "8",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La attention densa forma una matriz de scores n×n por cabeza?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Attention weights por sí solos prueban importancia causal humana?",
        "answer": "no",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-multihead": {
    "id": "tf-multihead",
    "courseId": 63,
    "title": "Multi-head attention",
    "shortTitle": "Multi-head",
    "duration": 130,
    "objective": "Explicar cómo varias cabezas proyectan subespacios distintos, concatenan resultados y vuelven a d_model.",
    "summary": [
      "Con reparto uniforme suele cumplirse d_head=d_model/h, aunque una implementación no está obligada a usar cualquier combinación arbitraria.",
      "Cada head tiene proyecciones propias (o equivalentes empaquetadas en matrices grandes); después se concatenan y proyectan.",
      "Más heads no garantiza mejor calidad: modifica capacidad, granularidad y coste, y debe evaluarse empíricamente."
    ],
    "concept": "Multi-head attention ejecuta varias atenciones con proyecciones aprendidas por cabeza, concatena sus salidas y aplica una proyección final.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Explicar cómo varias cabezas proyectan subespacios distintos, concatenan resultados y vuelven a d_model.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Con reparto uniforme suele cumplirse d_head=d_model/h, aunque una implementación no está obligada a usar cualquier combinación arbitraria."
        },
        {
          "title": "Mecánica y límites",
          "body": "Cada head tiene proyecciones propias (o equivalentes empaquetadas en matrices grandes); después se concatenan y proyectan."
        },
        {
          "title": "Ingeniería",
          "body": "Más heads no garantiza mejor calidad: modifica capacidad, granularidad y coste, y debe evaluarse empíricamente."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "d_model=512 y 8 heads con división uniforme. d_head.",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "64"
    },
    "check": {
      "question": "¿Ocho heads significan ocho Transformers independientes?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Multi-head attention ejecuta varias atenciones con proyecciones aprendidas por cabeza, concatena sus salidas y aplica una proyección final."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "d_model=512 y 8 heads con división uniforme. d_head.",
        "answer": "64",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Las heads se concatenan antes de la proyección de salida en la formulación clásica?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más heads garantiza una mejora de calidad?",
        "answer": "no",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-ffn": {
    "id": "tf-ffn",
    "courseId": 63,
    "title": "Feed-forward network por posición",
    "shortTitle": "FFN",
    "duration": 125,
    "objective": "Entender la MLP/FFN aplicada independientemente a cada posición y calcular parámetros/shapes.",
    "summary": [
      "Una forma clásica es FFN(x)=W2·σ(W1·x+b1)+b2 aplicada por posición con pesos compartidos a lo largo de la secuencia.",
      "La mezcla entre posiciones ocurre principalmente en attention; la FFN mezcla dimensiones/features dentro de cada posición.",
      "La elección de activación y ratio d_ff/d_model es arquitectónica y varía entre familias modernas."
    ],
    "concept": "El bloque feed-forward transforma cada posición con las mismas matrices, típicamente expandiendo d_model a d_ff y proyectando de vuelta.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Entender la MLP/FFN aplicada independientemente a cada posición y calcular parámetros/shapes.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una forma clásica es FFN(x)=W2·σ(W1·x+b1)+b2 aplicada por posición con pesos compartidos a lo largo de la secuencia."
        },
        {
          "title": "Mecánica y límites",
          "body": "La mezcla entre posiciones ocurre principalmente en attention; la FFN mezcla dimensiones/features dentro de cada posición."
        },
        {
          "title": "Ingeniería",
          "body": "La elección de activación y ratio d_ff/d_model es arquitectónica y varía entre familias modernas."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "d_model=512,d_ff=2048,sin contar bias. Pesos de dos matrices.",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "2097152"
    },
    "check": {
      "question": "¿La FFN mezcla directamente información entre posiciones distintas?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "El bloque feed-forward transforma cada posición con las mismas matrices, típicamente expandiendo d_model a d_ff y proyectando de vuelta."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "d_model=512,d_ff=2048,sin contar bias. Pesos de dos matrices.",
        "answer": "2097152",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La FFN comparte sus pesos entre posiciones de una misma capa?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La FFN mezcla features dentro de cada posición más que posiciones entre sí?",
        "answer": "si",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-residual": {
    "id": "tf-residual",
    "courseId": 63,
    "title": "Residual connections y flujo de información",
    "shortTitle": "Residuals",
    "duration": 120,
    "objective": "Explicar x+F(x), requisitos de shape y por qué residual no elimina automáticamente problemas de optimización.",
    "summary": [
      "La suma residual permite una ruta directa para señal y gradiente, pero estabilidad total depende de normalización, inicialización, profundidad y entrenamiento.",
      "En Transformer original cada subcapa se envuelve con residual y luego LayerNorm (post-norm); muchas variantes modernas usan pre-norm. No son algebraicamente idénticas.",
      "Residual ≠ concatenation: sumar conserva dimensionalidad; concatenar aumenta una dimensión y cambia los parámetros posteriores."
    ],
    "concept": "Las conexiones residuales añaden una ruta identidad alrededor de subcapas; requieren shapes compatibles o una proyección explícita.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Explicar x+F(x), requisitos de shape y por qué residual no elimina automáticamente problemas de optimización.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La suma residual permite una ruta directa para señal y gradiente, pero estabilidad total depende de normalización, inicialización, profundidad y entrenamiento."
        },
        {
          "title": "Mecánica y límites",
          "body": "En Transformer original cada subcapa se envuelve con residual y luego LayerNorm (post-norm); muchas variantes modernas usan pre-norm. No son algebraicamente idénticas."
        },
        {
          "title": "Ingeniería",
          "body": "Residual ≠ concatenation: sumar conserva dimensionalidad; concatenar aumenta una dimensión y cambia los parámetros posteriores."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "x=7 y F(x)=3 en un caso escalar. Salida residual.",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "10"
    },
    "check": {
      "question": "¿Una residual connection garantiza que los gradientes nunca se desvanezcan?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Las conexiones residuales añaden una ruta identidad alrededor de subcapas; requieren shapes compatibles o una proyección explícita."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "x=7 y F(x)=3 en un caso escalar. Salida residual.",
        "answer": "10",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La suma residual requiere shapes compatibles salvo proyección?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Pre-norm y post-norm son arquitecturas distintas?",
        "answer": "si",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-layernorm": {
    "id": "tf-layernorm",
    "courseId": 63,
    "title": "Layer normalization en Transformers",
    "shortTitle": "LayerNorm",
    "duration": 125,
    "objective": "Distinguir LayerNorm de BatchNorm y analizar normalización por posición/features en un Transformer.",
    "summary": [
      "LayerNorm calcula media/varianza sobre las features normalizadas del caso; después aplica parámetros aprendibles gamma y beta.",
      "A diferencia de BatchNorm clásica, no depende de running statistics de minibatch para cambiar entre train/inference de la misma manera.",
      "Pre-norm y post-norm cambian dónde se coloca LayerNorm respecto a residual/subcapa; declara qué variante estudias."
    ],
    "concept": "LayerNorm normaliza activaciones usando estadísticas dentro de cada ejemplo/posición sobre sus features, no estadísticas agregadas del minibatch como BatchNorm clásica.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Distinguir LayerNorm de BatchNorm y analizar normalización por posición/features en un Transformer.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "LayerNorm calcula media/varianza sobre las features normalizadas del caso; después aplica parámetros aprendibles gamma y beta."
        },
        {
          "title": "Mecánica y límites",
          "body": "A diferencia de BatchNorm clásica, no depende de running statistics de minibatch para cambiar entre train/inference de la misma manera."
        },
        {
          "title": "Ingeniería",
          "body": "Pre-norm y post-norm cambian dónde se coloca LayerNorm respecto a residual/subcapa; declara qué variante estudias."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "Vector con 512 features usa gamma y beta aprendibles de 512 cada uno. Parámetros.",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "1024"
    },
    "check": {
      "question": "¿LayerNorm necesita un batch grande para estimar sus estadísticas?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "LayerNorm normaliza activaciones usando estadísticas dentro de cada ejemplo/posición sobre sus features, no estadísticas agregadas del minibatch como BatchNorm clásica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Vector con 512 features usa gamma y beta aprendibles de 512 cada uno. Parámetros.",
        "answer": "1024",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿LayerNorm y BatchNorm usan estadísticas distintas?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿LayerNorm usa running averages de batch como BatchNorm clásica?",
        "answer": "no",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-encoder": {
    "id": "tf-encoder",
    "courseId": 63,
    "title": "Encoder Transformer",
    "shortTitle": "Encoder",
    "duration": 135,
    "objective": "Componer self-attention bidireccional/no causal, FFN, residuals y LayerNorm en un encoder.",
    "summary": [
      "El encoder original puede atender a todas las posiciones no enmascaradas de la entrada; padding masks siguen siendo relevantes.",
      "Encoder-only no significa “sin output head”: una tarea puede añadir clasificación, tagging u otra cabeza sobre las representaciones.",
      "BERT es un ejemplo histórico de modelo basado en encoder bidireccional, pero sus objetivos de pretraining no definen a todo encoder Transformer."
    ],
    "concept": "Un encoder Transformer produce representaciones contextualizadas de una secuencia; en el Transformer original cada layer combina self-attention y FFN con residuals/normalization.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Componer self-attention bidireccional/no causal, FFN, residuals y LayerNorm en un encoder.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El encoder original puede atender a todas las posiciones no enmascaradas de la entrada; padding masks siguen siendo relevantes."
        },
        {
          "title": "Mecánica y límites",
          "body": "Encoder-only no significa “sin output head”: una tarea puede añadir clasificación, tagging u otra cabeza sobre las representaciones."
        },
        {
          "title": "Ingeniería",
          "body": "BERT es un ejemplo histórico de modelo basado en encoder bidireccional, pero sus objetivos de pretraining no definen a todo encoder Transformer."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "Encoder de 6 layers, cada uno con 2 subcapas principales. Total de subcapas principales.",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "12"
    },
    "check": {
      "question": "¿Un encoder Transformer estándar necesita causal mask por definición?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Un encoder Transformer produce representaciones contextualizadas de una secuencia; en el Transformer original cada layer combina self-attention y FFN con residuals/normalization."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Encoder de 6 layers, cada uno con 2 subcapas principales. Total de subcapas principales.",
        "answer": "12",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El encoder puede usar padding mask sin usar causal mask?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Encoder-only significa que nunca puede tener una cabeza de salida?",
        "answer": "no",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-decoder": {
    "id": "tf-decoder",
    "courseId": 63,
    "title": "Decoder Transformer y cross-attention",
    "shortTitle": "Decoder",
    "duration": 140,
    "objective": "Construir un decoder autoregresivo con masked self-attention, cross-attention y FFN.",
    "summary": [
      "En encoder-decoder attention, las queries vienen del decoder y las keys/values de la salida del encoder.",
      "En un decoder-only moderno puede no existir cross-attention; no confundas “decoder Transformer” histórico con toda arquitectura autoregresiva actual.",
      "Durante training autoregresivo suele poder procesarse una secuencia completa en paralelo usando causal mask; generación inferencial sigue siendo secuencial token a token salvo técnicas específicas."
    ],
    "concept": "El decoder original usa self-attention causal sobre tokens previos, atención encoder-decoder hacia la memoria del encoder y una FFN por posición.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Construir un decoder autoregresivo con masked self-attention, cross-attention y FFN.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "En encoder-decoder attention, las queries vienen del decoder y las keys/values de la salida del encoder."
        },
        {
          "title": "Mecánica y límites",
          "body": "En un decoder-only moderno puede no existir cross-attention; no confundas “decoder Transformer” histórico con toda arquitectura autoregresiva actual."
        },
        {
          "title": "Ingeniería",
          "body": "Durante training autoregresivo suele poder procesarse una secuencia completa en paralelo usando causal mask; generación inferencial sigue siendo secuencial token a token salvo técnicas específicas."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "Decoder original de 6 layers con 3 subcapas principales por layer. Total.",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "18"
    },
    "check": {
      "question": "¿Cross-attention usa necesariamente K/V de la misma secuencia que Q?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "El decoder original usa self-attention causal sobre tokens previos, atención encoder-decoder hacia la memoria del encoder y una FFN por posición."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Decoder original de 6 layers con 3 subcapas principales por layer. Total.",
        "answer": "18",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El decoder original usa cross-attention hacia el encoder?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un decoder-only moderno necesita necesariamente cross-attention?",
        "answer": "no",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  },
  "tf-causal-mask": {
    "id": "tf-causal-mask",
    "courseId": 63,
    "title": "Causal masking y flujo de información",
    "shortTitle": "Causal mask",
    "duration": 130,
    "objective": "Implementar causal masking y distinguirlo de padding mask, attention weights y causalidad del mundo real.",
    "summary": [
      "Para longitud n, una máscara causal triangular permite n(n+1)/2 pares incluyendo self-attention a la posición actual.",
      "Padding mask y causal mask resuelven problemas distintos: padding excluye posiciones sin contenido; causal bloquea información futura.",
      "Aplicar la máscara antes de softmax (por ejemplo con -∞ conceptual) hace que las posiciones bloqueadas reciban peso cero idealmente; cuida estabilidad numérica y broadcasting."
    ],
    "concept": "Un causal mask impide que la posición t utilice información de posiciones futuras en el cálculo de self-attention autoregresiva.",
    "rules": [
      "Escribe shapes con ejes explícitos antes de cada multiplicación o broadcast.",
      "Distingue el contrato de información (qué puede ver cada posición) del mecanismo numérico que mezcla tensores.",
      "No atribuyas a “Transformer” propiedades que pertenecen a una variante posterior concreta; declara arquitectura, masking y normalización."
    ],
    "deep": {
      "intro": "Implementar causal masking y distinguirlo de padding mask, attention weights y causalidad del mundo real.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Para longitud n, una máscara causal triangular permite n(n+1)/2 pares incluyendo self-attention a la posición actual."
        },
        {
          "title": "Mecánica y límites",
          "body": "Padding mask y causal mask resuelven problemas distintos: padding excluye posiciones sin contenido; causal bloquea información futura."
        },
        {
          "title": "Ingeniería",
          "body": "Aplicar la máscara antes de softmax (por ejemplo con -∞ conceptual) hace que las posiciones bloqueadas reciban peso cero idealmente; cuida estabilidad numérica y broadcasting."
        },
        {
          "title": "Validación",
          "body": "Construye un caso pequeño calculable a mano, imprime shapes y matrices de máscara, verifica sumas de softmax y añade tests que fallen si aparece acceso a información futura o dimensiones incompatibles."
        }
      ]
    },
    "example": {
      "problem": "En longitud 5 incluyendo diagonal, cuántos pares (query,key) quedan permitidos bajo máscara causal inferior triangular?",
      "steps": [
        "Identifica los tensores, dimensiones o fórmula relevante.",
        "Calcula el resultado y comprueba qué propiedad arquitectónica representa."
      ],
      "solution": "15"
    },
    "check": {
      "question": "¿Causal mask demuestra una relación causal entre variables del mundo?",
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
          "Depende solo del número de capas",
          false
        ]
      ],
      "feedback": "Un causal mask impide que la posición t utilice información de posiciones futuras en el cálculo de self-attention autoregresiva."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "En longitud 5 incluyendo diagonal, cuántos pares (query,key) quedan permitidos bajo máscara causal inferior triangular?",
        "answer": "15",
        "hint": "Usa la relación o shape descrito en la lección."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Padding mask y causal mask resuelven problemas distintos?",
        "answer": "si",
        "hint": "Separa representación, contrato de información y operación matemática."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Causal masking equivale a causalidad estadística del mundo real?",
        "answer": "no",
        "hint": "Busca una garantía universal frente a una propiedad que depende de la variante."
      }
    ]
  }
});
