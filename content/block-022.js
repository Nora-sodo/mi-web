/**
 * BLOQUE 022 — Criptografía
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar propiedad, primitiva, protocolo y lifecycle. Un
 * algoritmo seguro puede quedar roto por nonces, claves, contexto o composición.
 */
window.LEARNING_PATHS[22] = {
  "level": "Experto progresivo",
  "estimatedHours": 88,
  "description": "Criptografía aplicada desde threat models y entropía hasta AEAD, clave pública, PKI, TLS 1.3, KDF y password hashing.",
  "outcomes": [
    "Elegir primitivas según propiedades y amenazas sin confundir confidencialidad, integridad, autenticidad y frescura.",
    "Razonar sobre randomness, hashes, MAC, AES/AEAD, RSA, DH/ECC y firmas con sus contratos operativos.",
    "Validar conceptualmente PKI/TLS y diseñar lifecycle de claves, nonces, KDF y password hashing robustos.",
    "Detectar fallos de composición como nonce reuse, replay, key reuse, padding ad hoc o confianza incorrecta en certificados."
  ],
  "modules": [
    {
      "id": "m1-goals-random",
      "title": "Amenazas, entropía y hashes",
      "description": "Amenazas, entropía y hashes",
      "lessons": [
        "crypto-threat-goals",
        "crypto-entropy-csprng",
        "crypto-hash-sha"
      ]
    },
    {
      "id": "m2-symmetric",
      "title": "Autenticidad y cifrado simétrico",
      "description": "Autenticidad y cifrado simétrico",
      "lessons": [
        "crypto-mac-hmac",
        "crypto-symmetric-aes",
        "crypto-aead-modes"
      ]
    },
    {
      "id": "m3-public-key",
      "title": "Criptografía de clave pública",
      "description": "Criptografía de clave pública",
      "lessons": [
        "crypto-rsa",
        "crypto-dh-ecc",
        "crypto-signatures"
      ]
    },
    {
      "id": "m4-pki-tls",
      "title": "PKI y protocolos",
      "description": "PKI y protocolos",
      "lessons": [
        "crypto-pki-certificates",
        "crypto-tls13"
      ]
    },
    {
      "id": "m5-kdf-passwords",
      "title": "Derivación y credenciales",
      "description": "Derivación y credenciales",
      "lessons": [
        "crypto-password-kdf",
        "crypto-kdf-key-separation"
      ]
    },
    {
      "id": "m6-integration",
      "title": "Integración",
      "description": "Integración",
      "lessons": [
        "crypto-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "crypto-threat-goals": {
    "id": "crypto-threat-goals",
    "courseId": 22,
    "title": "Objetivos criptográficos y threat models",
    "shortTitle": "La criptografía no arregla el threat model",
    "duration": 105,
    "objective": "distinguir confidencialidad, integridad, autenticidad y amenazas, y seleccionar primitivas según el adversario y los activos.",
    "summary": [
      "La seguridad criptográfica siempre se formula respecto a un adversario, capacidades, activos y propiedades deseadas; “usar cifrado” no es un objetivo completo.",
      "Confidencialidad evita revelar contenido; integridad detecta modificación; autenticidad vincula datos o peers a una clave/identidad bajo un modelo concreto.",
      "Una primitiva puede ser sólida y el sistema inseguro por gestión de claves, nonces, endpoints, metadatos o composición incorrecta."
    ],
    "concept": "Antes de elegir algoritmos, define qué protege el sistema, de quién, durante cuánto tiempo y qué ocurre si una clave, endpoint o canal se compromete.",
    "diagram": [],
    "rules": [
      "No uses “cifrado” como sinónimo de autenticación.",
      "No atribuyas a una primitiva propiedades que pertenecen al protocolo completo.",
      "El threat model debe incluir compromisos parciales, replay y gestión de claves."
    ],
    "deep": {
      "sections": [
        {
          "title": "Propiedades separadas",
          "body": "Confidencialidad, integridad, autenticidad y disponibilidad son propiedades distintas. Un ciphertext sin autenticación puede ocultar contenido y seguir siendo maleable; una firma puede autenticar datos sin ocultarlos."
        },
        {
          "title": "Adversarios y oráculos",
          "body": "Los modelos modernos describen qué puede observar, elegir o modificar el adversario. CPA/CCA son ejemplos de modelos para cifrado; su utilidad está en capturar capacidades y exigir indistinguibilidad, no en decorar una diapositiva con siglas."
        },
        {
          "title": "Composición y endpoints",
          "body": "La criptografía protege ciertas fronteras. Si el endpoint ya descifró los datos y está comprometido, el secreto puede perderse sin romper AES. La gestión de claves, nonces y errores forma parte del sistema."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una API cifra tokens pero no autentica el ciphertext. ¿Qué falta analizar?",
      "steps": [
        [
          "Paso 1",
          "Confidencialidad por sí sola no demuestra integridad."
        ],
        [
          "Paso 2",
          "Un atacante puede intentar modificar ciphertexts y observar respuestas."
        ],
        [
          "Paso 3",
          "Conviene usar un esquema AEAD y diseñar además anti-replay/context binding."
        ]
      ],
      "answer": "La primitiva debe seleccionarse según amenazas y propiedades, no solo por “estar cifrado”."
    },
    "check": {
      "question": "¿Confidencialidad implica automáticamente integridad?",
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
          "Solo con SHA",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Son propiedades distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una firma digital oculta el contenido por sí sola?",
        "answer": "no",
        "hint": "Firma y cifrado persiguen propiedades distintas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un threat model debe incluir capacidades del adversario?",
        "answer": "si",
        "hint": "Sin adversario definido, “seguro” carece de frontera."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un AES correcto impide que malware robe plaintext ya descifrado?",
        "answer": "no",
        "hint": "El endpoint comprometido está fuera de esa garantía."
      }
    ]
  },
  "crypto-entropy-csprng": {
    "id": "crypto-entropy-csprng",
    "courseId": 22,
    "title": "Entropía, randomness, PRNG y CSPRNG",
    "shortTitle": "Random no significa “se ve caótico”",
    "duration": 120,
    "objective": "distinguir fuente de entropía, DRBG/CSPRNG, seed, estado interno y tests estadísticos, y razonar sobre fallos de inicialización o reutilización.",
    "summary": [
      "Una fuente de entropía aporta incertidumbre física/ambiental estimada; un DRBG expande un estado/seed mediante un mecanismo determinista.",
      "Pasar tests estadísticos no demuestra impredecibilidad criptográfica ni estima por sí solo la entropía de la fuente.",
      "La seguridad depende de seed suficiente, aislamiento del estado, reseeding cuando corresponda y resistencia a compromisos según el diseño."
    ],
    "concept": "La aleatoriedad criptográfica es una cadena: fuente de entropía → conditioning/seed → DRBG → bytes. Cada eslabón tiene propiedades y fallos distintos.",
    "diagram": [],
    "rules": [
      "No uses timestamps o IDs como claves aleatorias.",
      "No confundas entropía de la fuente con longitud de la salida del DRBG.",
      "Tests estadísticos no sustituyen un modelo de entropía ni un CSPRNG adecuado."
    ],
    "deep": {
      "sections": [
        {
          "title": "Fuente y estimación",
          "body": "NIST SP 800-90B trata diseño y validación de fuentes de entropía. El objetivo no es que la secuencia “parezca random”, sino estimar incertidumbre bajo supuestos explícitos y detectar fallos de salud."
        },
        {
          "title": "DRBG",
          "body": "SP 800-90A especifica generadores deterministas: con un seed/estado secreto adecuado generan salidas computacionalmente impredecibles dentro de su modelo. Determinista no significa inseguro; significa que el secreto está en el estado inicial y su evolución."
        },
        {
          "title": "Compromiso de estado",
          "body": "Si un atacante conoce el estado interno, puede comprometer salidas según el diseño. Backtracking/prediction resistance describen propiedades diferentes; reseeding puede limitar ciertos daños."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un DRBG produce 1 GiB a partir de un seed con 256 bits de entropía. ¿Tiene 1 GiB de entropía nueva?",
      "steps": [
        [
          "Paso 1",
          "La expansión es determinista."
        ],
        [
          "Paso 2",
          "La salida puede ser computacionalmente impredecible sin contener 1 GiB de entropía independiente."
        ],
        [
          "Paso 3",
          "La seguridad está acotada por el seed, el algoritmo y el estado."
        ]
      ],
      "answer": "Longitud de salida y entropía independiente no son la misma magnitud."
    },
    "check": {
      "question": "¿Pasar muchos tests estadísticos demuestra que un generador es criptográficamente impredecible?",
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
          "Solo si genera 256 bits",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Los tests no prueban impredecibilidad criptográfica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un CSPRNG puede ser determinista después de inicializarse?",
        "answer": "si",
        "hint": "DRBG significa justamente determinista."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Duplicar la longitud de salida duplica automáticamente la entropía de la fuente?",
        "answer": "no",
        "hint": "La expansión no crea incertidumbre física nueva."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un timestamp de nanosegundos es una clave criptográfica suficiente por definición?",
        "answer": "no",
        "hint": "Predictibilidad y espacio efectivo importan."
      }
    ]
  },
  "crypto-hash-sha": {
    "id": "crypto-hash-sha",
    "courseId": 22,
    "title": "Hashes criptográficos y familias SHA",
    "shortTitle": "Hash no es cifrado sin llave",
    "duration": 120,
    "objective": "razonar sobre preimagen, segunda preimagen, colisiones, domain separation y usos/abusos de funciones hash modernas.",
    "summary": [
      "Un hash criptográfico comprime entradas arbitrarias a un digest fijo y busca propiedades como resistencia a preimagen y colisión; estas propiedades tienen costes de ataque distintos.",
      "Colisión no significa invertir un digest concreto: para un hash ideal de n bits, búsqueda genérica de colisión cuesta del orden de 2^(n/2), mientras preimagen ronda 2^n.",
      "Un hash sin clave no autentica por sí solo mensajes frente a un atacante activo; para autenticidad simétrica se usa un MAC como HMAC."
    ],
    "concept": "Un hash es una función pública determinista. Su seguridad no depende de ocultar el algoritmo, sino de propiedades computacionales bajo un modelo y tamaño de salida.",
    "diagram": [],
    "rules": [
      "No llames “encriptar” a calcular SHA-256.",
      "No uses hash(mensaje) como MAC.",
      "Distingue collision resistance de preimage resistance."
    ],
    "deep": {
      "sections": [
        {
          "title": "Propiedades",
          "body": "Preimagen: dado y, hallar x con H(x)=y. Segunda preimagen: dado x, hallar x’ distinto con mismo hash. Colisión: hallar cualquier par distinto con igual digest. Son juegos diferentes."
        },
        {
          "title": "Birthday bound",
          "body": "Para salida n-bit ideal, las colisiones aparecen genéricamente alrededor de 2^(n/2) evaluaciones por el efecto cumpleaños. Esto explica por qué 256 bits de digest ofrecen ~128 bits contra colisión genérica."
        },
        {
          "title": "Construcción y contexto",
          "body": "SHA-2 y SHA-3 tienen diseños internos diferentes. Cuando un hash se usa dentro de protocolos, domain separation y formatos no ambiguos evitan que contextos distintos reutilicen accidentalmente el mismo espacio semántico."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "¿Por qué SHA-256 no ofrece 256 bits de resistencia genérica a colisiones?",
      "steps": [
        [
          "Paso 1",
          "Hay 2^256 posibles digests."
        ],
        [
          "Paso 2",
          "No hace falta fijar uno: buscamos cualquier par que choque."
        ],
        [
          "Paso 3",
          "El birthday bound reduce el coste genérico esperado a ~2^128."
        ]
      ],
      "answer": "La resistencia genérica a colisión de un hash n-bit es aproximadamente n/2 bits."
    },
    "check": {
      "question": "¿Una colisión en un hash equivale a invertir un digest elegido previamente?",
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
          "Solo en SHA-3",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Son problemas criptográficos diferentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿SHA-256 necesita una clave secreta para calcularse?",
        "answer": "no",
        "hint": "Es una función pública."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Hash(mensaje) autentica al emisor frente a quien también puede modificar el hash?",
        "answer": "no",
        "hint": "El atacante puede recomputarlo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La búsqueda genérica de colisión en un hash ideal de 256 bits ronda 2^128?",
        "answer": "si",
        "hint": "Birthday bound."
      }
    ]
  },
  "crypto-mac-hmac": {
    "id": "crypto-mac-hmac",
    "courseId": 22,
    "title": "MAC y HMAC",
    "shortTitle": "Integridad con clave compartida",
    "duration": 110,
    "objective": "distinguir MAC de hash y firma, explicar HMAC y verificar tags de forma segura bajo una clave simétrica.",
    "summary": [
      "Un MAC usa una clave compartida para autenticar integridad/origen dentro del grupo que conoce esa clave.",
      "HMAC construye un MAC a partir de una función hash mediante una composición específica; no es simplemente hash(key || message).",
      "Un MAC no ofrece no-repudio entre participantes que comparten la misma clave: cualquiera de ellos puede producir tags válidos."
    ],
    "concept": "MAC = autenticidad simétrica. Emisor y verificador comparten secreto; la verificación prueba conocimiento de ese secreto dentro del modelo, no una identidad pública transferible.",
    "diagram": [],
    "rules": [
      "No inventes MACs concatenando clave y mensaje.",
      "Compara tags con primitivas diseñadas para evitar filtraciones temporales cuando aplique.",
      "Separa autenticidad simétrica de firma digital pública."
    ],
    "deep": {
      "sections": [
        {
          "title": "HMAC",
          "body": "HMAC aplica un hash con inner/outer pads y clave normalizada. La construcción fue diseñada para aprovechar propiedades de hashes iterativos sin heredar ingenuamente problemas de construcciones ad hoc."
        },
        {
          "title": "Tag truncation",
          "body": "Truncar un tag reduce el trabajo de forgery genérico. La longitud debe elegirse según el protocolo y número de intentos; “64 bits siempre bastan” no es una regla universal."
        },
        {
          "title": "Replay",
          "body": "Un MAC válido demuestra autenticidad del mensaje, no frescura. Sin nonce, contador, timestamp autenticado u otro mecanismo, un atacante puede repetir un mensaje válido."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un mensaje lleva HMAC correcto pero un atacante lo reenvía mañana. ¿El HMAC detecta replay?",
      "steps": [
        [
          "Paso 1",
          "El mensaje y tag siguen siendo válidos."
        ],
        [
          "Paso 2",
          "HMAC autentica contenido bajo la clave."
        ],
        [
          "Paso 3",
          "La frescura requiere estado/nonce/contador dentro de lo autenticado."
        ]
      ],
      "answer": "Autenticidad no implica anti-replay."
    },
    "check": {
      "question": "¿Un MAC compartido permite probar a un tercero cuál de dos poseedores de la clave creó el mensaje?",
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
          "Solo con HMAC-SHA-256",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Ambos pueden producir tags."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿HMAC es simplemente SHA256(key||message)?",
        "answer": "no",
        "hint": "La construcción HMAC es específica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un MAC requiere secreto compartido?",
        "answer": "si",
        "hint": "Ese es el modelo simétrico típico."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un tag válido prueba frescura del mensaje?",
        "answer": "no",
        "hint": "Hace falta anti-replay adicional."
      }
    ]
  },
  "crypto-symmetric-aes": {
    "id": "crypto-symmetric-aes",
    "courseId": 22,
    "title": "Cifrado simétrico y AES",
    "shortTitle": "AES cifra bloques; el protocolo hace el resto",
    "duration": 125,
    "objective": "explicar AES como block cipher, sus tamaños de bloque/clave y por qué el modo de operación y los nonces son parte esencial del sistema.",
    "summary": [
      "AES es un cifrador por bloques de 128 bits con claves de 128, 192 o 256 bits; el tamaño de bloque no cambia con la clave.",
      "Un block cipher es una permutación keyed sobre bloques; para mensajes arbitrarios se necesita un modo/construcción segura.",
      "ECB revela patrones y no debe usarse como cifrado general de datos estructurados; los modos modernos suelen proporcionar autenticación además de confidencialidad."
    ],
    "concept": "AES por sí solo transforma un bloque de 128 bits bajo una clave. La seguridad de mensajes completos depende del modo, nonces/IV, autenticación y gestión de claves.",
    "diagram": [],
    "rules": [
      "AES-256 no significa bloque de 256 bits.",
      "No uses ECB para mensajes generales.",
      "No reutilices nonce cuando el modo lo prohíba: la clave puede seguir siendo secreta y el esquema quedar roto."
    ],
    "deep": {
      "sections": [
        {
          "title": "Estructura",
          "body": "AES opera sobre un estado 4×4 de bytes con rondas de sustitución, permutación y mezcla lineal, más round keys derivadas. La seguridad no se explica por “muchas operaciones”, sino por el diseño criptográfico completo."
        },
        {
          "title": "Key schedule",
          "body": "AES-128/192/256 usan distintos tamaños de clave y números de rondas, pero bloque de 128 bits. Confundir key size y block size produce errores al razonar sobre modos y límites."
        },
        {
          "title": "Modo de operación",
          "body": "CBC, CTR, GCM y otros modos tienen propiedades diferentes. En sistemas nuevos suele preferirse una construcción AEAD adecuada antes que combinar manualmente cifrado y autenticación."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "¿Cuánto mide un bloque AES-256?",
      "steps": [
        [
          "Paso 1",
          "“256” nombra el tamaño de clave."
        ],
        [
          "Paso 2",
          "FIPS 197 fija el bloque AES en 128 bits."
        ],
        [
          "Paso 3",
          "AES-256 usa clave 256-bit y bloque 128-bit."
        ]
      ],
      "answer": "128 bits."
    },
    "check": {
      "question": "¿AES-256 cifra bloques de 256 bits?",
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
          "Solo en GCM",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "AES siempre usa bloque de 128 bits."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿AES es una función pública sin clave?",
        "answer": "no",
        "hint": "Es un block cipher keyed."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿ECB puede revelar igualdad/patrones de bloques?",
        "answer": "si",
        "hint": "Bloques iguales bajo la misma clave producen bloques cifrados iguales."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Aumentar clave de 128 a 256 cambia el tamaño de bloque AES?",
        "answer": "no",
        "hint": "El bloque sigue siendo 128 bits."
      }
    ]
  },
  "crypto-aead-modes": {
    "id": "crypto-aead-modes",
    "courseId": 22,
    "title": "Modos, AEAD, nonces y AES-GCM",
    "shortTitle": "Nonce repetido: el pequeño detalle que incendia GCM",
    "duration": 135,
    "objective": "usar el modelo AEAD para separar plaintext, AAD, nonce y tag, y entender las consecuencias de reutilizar nonces en GCM/CTR-like modes.",
    "summary": [
      "AEAD protege confidencialidad e integridad del plaintext y autentica AAD que permanece visible; el tag debe verificarse antes de aceptar el mensaje.",
      "GCM combina counter mode con autenticación GHASH; la unicidad del nonce bajo una clave es una condición crítica.",
      "Nonce no tiene por qué ser secreto, pero su regla de unicidad/aleatoriedad depende del esquema; no debe improvisarse."
    ],
    "concept": "AEAD recibe clave, nonce, plaintext y AAD; devuelve ciphertext y tag. La seguridad depende de cumplir el contrato del esquema, especialmente el uso del nonce.",
    "diagram": [],
    "rules": [
      "No reutilices nonce GCM con la misma clave.",
      "AAD se autentica pero no se cifra.",
      "No liberes plaintext como confiable antes de validar el tag."
    ],
    "deep": {
      "sections": [
        {
          "title": "CTR y reuse",
          "body": "En counter-like encryption, reutilizar keystream permite relacionar plaintexts: C1 xor C2 = P1 xor P2 cuando el keystream coincide. En GCM el daño también afecta autenticidad."
        },
        {
          "title": "AAD",
          "body": "Cabeceras de routing, IDs de protocolo o contexto pueden permanecer visibles pero vinculadas criptográficamente mediante AAD. Si cambian, la verificación debe fallar."
        },
        {
          "title": "Límites operativos",
          "body": "Los modos tienen límites de mensajes, nonces y tags. NIST está revisando SP 800-38D; un diseño serio trata límites y política de nonce como parámetros operativos, no como detalles de implementación."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Dos mensajes usan GCM con misma clave y nonce. ¿Por qué es grave?",
      "steps": [
        [
          "Paso 1",
          "La parte CTR reutiliza material de keystream."
        ],
        [
          "Paso 2",
          "Los ciphertexts filtran relaciones XOR entre plaintexts."
        ],
        [
          "Paso 3",
          "La estructura de autenticación también puede quedar comprometida."
        ]
      ],
      "answer": "La reutilización de nonce bajo la misma clave viola una condición crítica de GCM."
    },
    "check": {
      "question": "¿El nonce de GCM debe mantenerse secreto para que el esquema funcione?",
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
          "Es la clave",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "La propiedad crítica es el uso correcto/único, no el secreto."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿AAD se cifra en AEAD?",
        "answer": "no",
        "hint": "Se autentica pero permanece visible."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Se puede aceptar plaintext antes de verificar el tag?",
        "answer": "no",
        "hint": "No debe tratarse como autenticado."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Reusar nonce GCM con la misma clave puede comprometer confidencialidad y autenticidad?",
        "answer": "si",
        "hint": "Es una violación crítica del contrato."
      }
    ]
  },
  "crypto-rsa": {
    "id": "crypto-rsa",
    "courseId": 22,
    "title": "RSA: primitivas, padding y esquemas",
    "shortTitle": "RSA desnudo no es un protocolo",
    "duration": 130,
    "objective": "distinguir la primitiva RSA de RSA-OAEP/RSA-PSS y explicar por qué padding/encoding y tamaños importan para seguridad.",
    "summary": [
      "RSA se basa en aritmética modular con clave pública/privada, pero la operación matemática desnuda es determinista y no debe usarse directamente como esquema seguro.",
      "PKCS #1 define esquemas como RSAES-OAEP para cifrado y RSASSA-PSS para firmas, además de variantes legacy.",
      "RSA no se usa normalmente para cifrar grandes flujos: se emplea en construcciones híbridas o para envolver material pequeño bajo protocolos bien definidos."
    ],
    "concept": "La primitiva RSA es una operación matemática; el esquema seguro añade encoding/padding, hashing, aleatoriedad y validaciones. Quitar esas capas no “simplifica”, elimina propiedades.",
    "diagram": [],
    "rules": [
      "No implementes textbook RSA para mensajes reales.",
      "No confundas RSA encryption con RSA signature invirtiendo flechas.",
      "Usa esquemas especificados como OAEP/PSS según protocolo, no padding casero."
    ],
    "deep": {
      "sections": [
        {
          "title": "Trapdoor permutation",
          "body": "La seguridad práctica depende de claves bien generadas y del problema matemático subyacente, pero el mapa algebraico por sí solo carece de aleatorización y estructura segura contra ataques adaptativos."
        },
        {
          "title": "OAEP y PSS",
          "body": "OAEP transforma el mensaje antes de la operación RSA de cifrado; PSS codifica hashes/salt para firmas. Son esquemas distintos con objetivos distintos."
        },
        {
          "title": "Híbridos",
          "body": "Para datos grandes se genera una clave simétrica aleatoria, se cifra el contenido con AEAD y se protege/deriva la clave mediante criptografía pública. Esa separación mejora rendimiento y diseño."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "¿Por qué no cifrar un archivo de 4 GiB aplicando RSA bloque por bloque?",
      "steps": [
        [
          "Paso 1",
          "RSA tiene límites estrictos de tamaño por operación y es costoso."
        ],
        [
          "Paso 2",
          "El padding seguro consume parte del módulo."
        ],
        [
          "Paso 3",
          "Un diseño híbrido usa AEAD para datos y criptografía pública para material de clave."
        ]
      ],
      "answer": "RSA suele ser componente de key transport/signature, no cifrador de stream masivo."
    },
    "check": {
      "question": "¿La operación matemática RSA sin encoding/padding seguro es un esquema de cifrado moderno suficiente?",
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
          "Solo con clave 4096",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Hace falta un esquema definido."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿RSA-OAEP y RSA-PSS persiguen la misma función?",
        "answer": "no",
        "hint": "OAEP es cifrado; PSS es firma."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿RSA suele combinarse con cifrado simétrico en esquemas híbridos?",
        "answer": "si",
        "hint": "Es el patrón habitual."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Aumentar el tamaño de clave arregla un padding inseguro por sí solo?",
        "answer": "no",
        "hint": "El diseño del esquema sigue importando."
      }
    ]
  },
  "crypto-dh-ecc": {
    "id": "crypto-dh-ecc",
    "courseId": 22,
    "title": "Diffie-Hellman y curvas elípticas",
    "shortTitle": "Acordar un secreto no autentica al vecino",
    "duration": 135,
    "objective": "explicar key agreement DH/ECDH, ataques MITM sin autenticación y el papel de curvas/elípticas como grupos eficientes, sin confundir acuerdo con firma.",
    "summary": [
      "Diffie-Hellman permite acordar material secreto sobre un canal observable, pero por sí solo no autentica a los participantes y es vulnerable a MITM activo.",
      "ECDH realiza un patrón análogo en grupos de curva elíptica, con representaciones y validaciones específicas.",
      "El shared secret bruto debe procesarse con una KDF/contexto apropiado antes de convertirse en claves de protocolo."
    ],
    "concept": "Key agreement produce material compartido; autenticación vincula ese intercambio a identidades/credenciales. Son propiedades diferentes y los protocolos seguros las componen explícitamente.",
    "diagram": [],
    "rules": [
      "DH sin autenticación no evita MITM activo.",
      "No uses directamente el secreto DH como múltiples claves sin derivación/contexto.",
      "Valida inputs/puntos según el esquema y biblioteca; “es un número” no basta."
    ],
    "deep": {
      "sections": [
        {
          "title": "DH clásico",
          "body": "Cada parte combina su secreto efímero con el valor público del peer para obtener un mismo elemento compartido. Un observador pasivo no debería recuperar el secreto bajo el supuesto matemático."
        },
        {
          "title": "MITM",
          "body": "Un atacante activo puede negociar un secreto con cada lado si no existe autenticación. Firmas, certificados o PSKs pueden autenticar el transcript según el protocolo."
        },
        {
          "title": "ECC",
          "body": "Las curvas elípticas ofrecen grupos donde operaciones y tamaños son eficientes. La seguridad depende de parámetros, encoding, validación y algoritmo concreto; “ECC” no es una única curva ni un único protocolo."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Alice y Bob hacen DH sin firmas, certificados ni PSK. Mallory controla la red. ¿Puede MITM?",
      "steps": [
        [
          "Paso 1",
          "Mallory sustituye valores públicos."
        ],
        [
          "Paso 2",
          "Acordará un secreto con Alice y otro con Bob."
        ],
        [
          "Paso 3",
          "Sin autenticación del transcript, ambos pueden creer erróneamente que hablan entre sí."
        ]
      ],
      "answer": "DH aporta secreto compartido frente a observación; no autenticación por sí solo."
    },
    "check": {
      "question": "¿Diffie-Hellman autentica automáticamente la identidad del peer?",
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
          "Solo si es ECDH",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Key agreement y autenticación son propiedades distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿ECDH es una firma digital?",
        "answer": "no",
        "hint": "Es key agreement."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El shared secret suele pasar por una KDF antes de crear claves de sesión?",
        "answer": "si",
        "hint": "Deriva claves separadas y contexto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cambiar DH clásico por ECDH elimina la necesidad de autenticar el intercambio?",
        "answer": "no",
        "hint": "MITM sigue siendo un problema de protocolo."
      }
    ]
  },
  "crypto-signatures": {
    "id": "crypto-signatures",
    "courseId": 22,
    "title": "Firmas digitales",
    "shortTitle": "Firmar no es “cifrar con la privada”",
    "duration": 130,
    "objective": "explicar generación/verificación de firmas, hashing/context binding y diferencias entre RSA-PSS, ECDSA y EdDSA sin recurrir al mito de “encrypt with private key”.",
    "summary": [
      "Una firma usa clave privada para producir evidencia verificable con clave pública sobre un mensaje/contexto; no proporciona confidencialidad.",
      "Los algoritmos modernos de firma tienen esquemas específicos y requisitos de nonce/aleatoriedad o determinismo según el diseño.",
      "La validez matemática de una firma no demuestra por sí sola que la clave pública pertenece a una identidad: esa vinculación corresponde a PKI u otro mecanismo."
    ],
    "concept": "Firma = autenticidad pública + integridad bajo una clave privada, dentro de un esquema concreto. No es la operación inversa del cifrado ni sustituye la gestión de identidad.",
    "diagram": [],
    "rules": [
      "No describas firmas como “cifrar el hash con la privada” de forma general.",
      "No reutilices nonces secretos donde el esquema exige unicidad; ECDSA puede filtrar la clave.",
      "Firma válida no equivale a certificado/identidad válida."
    ],
    "deep": {
      "sections": [
        {
          "title": "Esquemas",
          "body": "FIPS 186-5 especifica RSA, ECDSA y EdDSA para firmas. Cada familia tiene algoritmos y encodings concretos; sus ecuaciones no son intercambiables."
        },
        {
          "title": "Nonce en ECDSA",
          "body": "ECDSA depende de un nonce por firma. Reutilización o sesgo puede permitir recuperar la clave privada; por eso la generación correcta del nonce es crítica."
        },
        {
          "title": "Context binding",
          "body": "Firmar bytes ambiguos puede ser peligroso. Serialización canónica, domain separation y transcript hashes evitan que la misma firma adquiera significado en otro contexto."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Dos firmas ECDSA reutilizan el mismo nonce secreto k. ¿Es solo un problema de “aleatoriedad fea”?",
      "steps": [
        [
          "Paso 1",
          "Las ecuaciones comparten el mismo término k."
        ],
        [
          "Paso 2",
          "La diferencia entre firmas puede eliminar k algebraicamente."
        ],
        [
          "Paso 3",
          "En condiciones conocidas puede recuperarse la clave privada."
        ]
      ],
      "answer": "La reutilización de nonce en ECDSA puede ser catastrófica."
    },
    "check": {
      "question": "¿Una firma digital cifra el mensaje y lo mantiene secreto?",
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
          "Solo EdDSA",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Firma y confidencialidad son propiedades distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una firma válida prueba que la clave pública pertenece a “example.com” sin otra infraestructura?",
        "answer": "no",
        "hint": "Hace falta vinculación de identidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿ECDSA puede ser vulnerable si reutiliza nonce?",
        "answer": "si",
        "hint": "Puede revelar la clave privada."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿FIPS 186-5 incluye RSA, ECDSA y EdDSA para firmas?",
        "answer": "si",
        "hint": "Son las técnicas actuales del estándar."
      }
    ]
  },
  "crypto-pki-certificates": {
    "id": "crypto-pki-certificates",
    "courseId": 22,
    "title": "Certificados, PKI y validación",
    "shortTitle": "Certificado válido no significa “confía en todo”",
    "duration": 140,
    "objective": "seguir una cadena X.509, distinguir firma, hostname, vigencia, EKU/revocación y trust store, y razonar sobre qué valida realmente una PKI.",
    "summary": [
      "Un certificado vincula una clave pública a nombres/atributos bajo la firma de un emisor; la validación construye y verifica una ruta hacia un trust anchor aceptado localmente.",
      "Firma correcta de la cadena no basta: deben aplicarse restricciones, nombre esperado, vigencia, key usage/EKU y políticas pertinentes.",
      "El trust store es una decisión local/operacional; una CA raíz no es “matemáticamente verdadera”, sino un ancla explícitamente confiada."
    ],
    "concept": "PKI responde “¿qué clave pública acepto para esta identidad/contexto?” mediante certificados, rutas, restricciones y anchors. La criptografía de firmas es solo una parte.",
    "diagram": [],
    "rules": [
      "No confundas certificado autofirmado con automáticamente inseguro; importa si es trust anchor configurado.",
      "No aceptes cualquier cadena firmada sin verificar el nombre/uso esperado.",
      "Trust anchor y certificado intermedio tienen roles distintos."
    ],
    "deep": {
      "sections": [
        {
          "title": "Path validation",
          "body": "El cliente puede construir una cadena leaf → intermediates → anchor y verificar firmas/restricciones. La ruta no tiene que coincidir con el orden exacto recibido en todos los casos."
        },
        {
          "title": "Nombre y uso",
          "body": "Para TLS servidor importa que la identidad presentada corresponda al nombre esperado y que el certificado sea válido para ese propósito. Una firma válida sobre “otro nombre” no autentica tu destino."
        },
        {
          "title": "Revocación y tiempo",
          "body": "CRL/OCSP y mecanismos relacionados tienen trade-offs de disponibilidad, privacidad y freshness. La revocación no convierte PKI en un sistema instantáneamente consistente."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "El servidor presenta una cadena criptográficamente firmada para otro.example. ¿Debe aceptar cliente que pidió api.example?",
      "steps": [
        [
          "Paso 1",
          "La cadena puede ser válida respecto a un anchor."
        ],
        [
          "Paso 2",
          "Pero la identidad esperada también debe validarse."
        ],
        [
          "Paso 3",
          "Si el nombre no coincide según las reglas, la autenticación falla."
        ]
      ],
      "answer": "Path signature y hostname/identity validation son pasos distintos."
    },
    "check": {
      "question": "¿Una cadena con firmas matemáticamente válidas basta siempre para autenticar el hostname esperado?",
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
          "Solo si usa RSA",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "La identidad esperada debe comprobarse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un trust anchor es una decisión/configuración local de confianza?",
        "answer": "si",
        "hint": "La confianza no surge solo de la firma."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un certificado expirado puede pasar todas las demás firmas y aun fallar validación?",
        "answer": "si",
        "hint": "La vigencia es otra restricción."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una CA intermedia es automáticamente un trust anchor?",
        "answer": "no",
        "hint": "El anchor es aceptado explícitamente por el verificador."
      }
    ]
  },
  "crypto-tls13": {
    "id": "crypto-tls13",
    "courseId": 22,
    "title": "TLS 1.3, handshake y forward secrecy",
    "shortTitle": "TLS no es “AES + certificado”",
    "duration": 150,
    "objective": "seguir un handshake TLS 1.3, separar autenticación, key agreement, transcript, traffic keys y explicar forward secrecy y 0-RTT/replay.",
    "summary": [
      "TLS 1.3 combina key agreement, autenticación y un key schedule para derivar secretos y traffic keys ligados al transcript.",
      "El uso de (EC)DHE efímero en el handshake normal proporciona forward secrecy frente al compromiso posterior de claves de autenticación, bajo sus supuestos.",
      "0-RTT reduce latencia pero tiene propiedades de replay diferentes; la aplicación debe decidir si sus operaciones son seguras bajo ese riesgo."
    ],
    "concept": "TLS es un protocolo compuesto: negocia parámetros, acuerda secretos, autentica el transcript y deriva claves distintas para fases/direcciones. Ninguna primitiva aislada “es TLS”.",
    "diagram": [],
    "rules": [
      "No confundas certificado con cifrado de aplicación.",
      "Forward secrecy no protege datos si el endpoint fue comprometido mientras los procesa.",
      "0-RTT no debe tratarse como equivalente semántico a datos 1-RTT respecto a replay."
    ],
    "deep": {
      "sections": [
        {
          "title": "Transcript y key schedule",
          "body": "TLS 1.3 usa HKDF para derivar secretos con contexto ligado al transcript. Separar handshake/application traffic secrets limita reutilización accidental de claves."
        },
        {
          "title": "Autenticación",
          "body": "El servidor normalmente demuestra posesión de la clave asociada a su certificado mediante CertificateVerify; Finished autentica el transcript con secretos derivados."
        },
        {
          "title": "Forward secrecy",
          "body": "Con claves efímeras DH, robar más tarde la clave de firma del servidor no basta por sí solo para reconstruir antiguos secretos efímeros borrados. Esto no es una máquina del tiempo contra compromisos de endpoint."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un atacante graba TLS 1.3 hoy y roba mañana la clave privada del certificado del servidor. ¿Puede descifrar automáticamente las sesiones pasadas normales ECDHE?",
      "steps": [
        [
          "Paso 1",
          "La clave del certificado autentica; no es el secreto efímero DH."
        ],
        [
          "Paso 2",
          "El shared secret pasado dependía de exponentes efímeros."
        ],
        [
          "Paso 3",
          "Si esos secretos fueron borrados y el protocolo fue correcto, la clave de firma posterior no basta por sí sola."
        ]
      ],
      "answer": "Ese es el objetivo de forward secrecy."
    },
    "check": {
      "question": "¿TLS 1.3 normal con ECDHE usa la clave privada del certificado como clave directa para cifrar todo el tráfico?",
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
          "Solo en HTTP/3",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Las traffic keys se derivan del key schedule."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Forward secrecy significa que malware presente durante la sesión no puede ver plaintext?",
        "answer": "no",
        "hint": "No protege contra endpoint comprometido en tiempo real."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿TLS 1.3 usa HKDF en su key schedule?",
        "answer": "si",
        "hint": "Es una pieza central del schedule."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿0-RTT tiene consideraciones especiales de replay?",
        "answer": "si",
        "hint": "La aplicación debe considerarlas."
      }
    ]
  },
  "crypto-password-kdf": {
    "id": "crypto-password-kdf",
    "courseId": 22,
    "title": "Password hashing, salt y KDF",
    "shortTitle": "SHA-256(password) es demasiado amable con el atacante",
    "duration": 135,
    "objective": "distinguir password hashing de KDF general, explicar salts, parámetros de coste y funciones memory-hard como Argon2.",
    "summary": [
      "Las contraseñas tienen baja entropía humana; almacenarlas con un hash rápido permite ataques offline extremadamente eficientes.",
      "Un salt público único por credencial evita precomputación compartida y hace que contraseñas iguales no produzcan el mismo verifier; no necesita ser secreto.",
      "Funciones de password hashing como Argon2 incorporan costes de memoria/tiempo parametrizables; los parámetros deben evolucionar con hardware y presupuesto operativo."
    ],
    "concept": "Password hashing busca hacer caro cada intento offline del atacante, no convertir una contraseña débil mágicamente en una clave de 256 bits.",
    "diagram": [],
    "rules": [
      "No almacenes SHA-256(password) como esquema moderno de password hashing.",
      "El salt es público y único; no es sustituto de una contraseña fuerte.",
      "Pepper, si se usa, pertenece a otro dominio de secreto y operación; no reemplaza salt/coste."
    ],
    "deep": {
      "sections": [
        {
          "title": "Ataque offline",
          "body": "Si se roba la base de verifiers, el atacante puede probar candidatos sin rate limit del servidor. El coste por intento de la KDF es por tanto una defensa fundamental."
        },
        {
          "title": "Salt",
          "body": "Un salt único obliga a recomputar por cuenta y evita tablas precomputadas universales. No pretende esconderse; debe almacenarse junto al verifier."
        },
        {
          "title": "Argon2 y memory hardness",
          "body": "RFC 9106 describe Argon2 como memory-hard. Memoria, iteraciones y paralelismo son parámetros; deben calibrarse para el entorno sin provocar DoS operacional."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Dos usuarios eligen “correct horse”. ¿Deben tener el mismo verifier?",
      "steps": [
        [
          "Paso 1",
          "Cada cuenta recibe salt aleatorio/único."
        ],
        [
          "Paso 2",
          "La KDF procesa password + salt + parámetros."
        ],
        [
          "Paso 3",
          "Con salts diferentes, los verifiers deben diferir normalmente."
        ]
      ],
      "answer": "El salt evita igualdad directa y precomputación compartida."
    },
    "check": {
      "question": "¿El salt de password hashing debe mantenerse secreto para cumplir su función principal?",
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
          "Es la contraseña",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Debe ser único; puede almacenarse públicamente con el verifier."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿SHA-256 puro es deliberadamente rápido y por eso poco adecuado como password hash?",
        "answer": "si",
        "hint": "El atacante también disfruta de esa velocidad."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un salt único evita que dos contraseñas iguales tengan necesariamente el mismo verifier?",
        "answer": "si",
        "hint": "Cambia la entrada de la KDF."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Argon2 está diseñado con coste de memoria además de tiempo?",
        "answer": "si",
        "hint": "Es memory-hard."
      }
    ]
  },
  "crypto-kdf-key-separation": {
    "id": "crypto-kdf-key-separation",
    "courseId": 22,
    "title": "KDF, HKDF y separación de claves",
    "shortTitle": "Una clave para todo: la multiherramienta que no quieres",
    "duration": 115,
    "objective": "explicar extract/expand, context binding y por qué claves distintas deben derivarse para propósitos/direcciones diferentes.",
    "summary": [
      "Una KDF transforma keying material en una o más claves con contexto; HKDF separa conceptualmente extract y expand.",
      "El campo de contexto/info permite domain separation: claves para “client write”, “server write” o “exporter” pueden derivarse del mismo secreto sin reutilizar bytes como la misma clave.",
      "KDF general y password hashing resuelven problemas diferentes: HKDF no está diseñado para hacer caras las adivinanzas de contraseñas humanas."
    ],
    "concept": "Derivar claves no es “hacer hash hasta tener suficientes bytes”; la KDF define cómo extraer pseudorandomness y expandirla con etiquetas/contexto.",
    "diagram": [],
    "rules": [
      "No uses la misma clave para cifrado, MAC y otros protocolos salvo construcción que lo especifique.",
      "Incluye contexto/domain separation cuando derive múltiples propósitos.",
      "HKDF no sustituye Argon2 para contraseñas."
    ],
    "deep": {
      "sections": [
        {
          "title": "Extract",
          "body": "HKDF-Extract convierte input keying material potencialmente no uniforme en una pseudorandom key usando HMAC, bajo sus supuestos."
        },
        {
          "title": "Expand",
          "body": "HKDF-Expand genera output keying material de longitud requerida con info/context y contador, permitiendo separar dominios."
        },
        {
          "title": "Key hierarchy",
          "body": "Protocolos como TLS usan jerarquías de secretos para fases/direcciones. Esta estructura reduce reutilización accidental y vincula claves al transcript/contexto."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un shared secret DH debe alimentar claves de cliente→servidor y servidor→cliente. ¿Copiar el mismo AES key en ambas direcciones es ideal?",
      "steps": [
        [
          "Paso 1",
          "Los dos usos pertenecen a dominios distintos."
        ],
        [
          "Paso 2",
          "La KDF puede derivar claves con labels diferentes."
        ],
        [
          "Paso 3",
          "Así se obtiene separación criptográfica aun partiendo del mismo secreto."
        ]
      ],
      "answer": "Deriva claves independientes con contexto."
    },
    "check": {
      "question": "¿HKDF está pensado como sustituto directo de una función memory-hard de password hashing?",
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
          "Solo con SHA-512",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Los problemas y modelos son distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿HKDF puede usar info/context para separar usos?",
        "answer": "si",
        "hint": "Ese es un propósito central."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Reutilizar exactamente la misma clave en protocolos distintos es una buena regla general?",
        "answer": "no",
        "hint": "Aumenta acoplamiento y riesgos de composición."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿HKDF puede derivar varias claves de un shared secret DH?",
        "answer": "si",
        "hint": "Es un uso típico."
      }
    ]
  },
  "crypto-integration": {
    "id": "crypto-integration",
    "courseId": 22,
    "title": "Diseño criptográfico integrado",
    "shortTitle": "No diseñes tu propio protocolo a las 2:00",
    "duration": 160,
    "objective": "diseñar un canal autenticado de alto nivel seleccionando primitivas estándar, lifecycle de claves, nonces, anti-replay, rotación y manejo de errores.",
    "summary": [
      "Un sistema criptográfico seguro combina generación de claves, acuerdos/autenticación, KDF, AEAD, nonces, anti-replay, almacenamiento y rotación bajo un protocolo especificado.",
      "La validación debe ser fail-closed: tags, firmas, certificados y transcript se verifican antes de tratar datos como confiables.",
      "La regla profesional es preferir protocolos y bibliotecas bien analizados; la creatividad criptográfica es excelente para estudiar y peligrosa para producción."
    ],
    "concept": "El valor del bloque está en componer correctamente: primitives → protocol → key lifecycle → operational controls. El punto más débil puede vivir fuera del algoritmo matemático.",
    "diagram": [],
    "rules": [
      "No inventes protocolos de producción combinando primitivas ad hoc.",
      "Diseña contadores/nonces y recuperación de estado antes de desplegar.",
      "Define rotación, borrado, logging y errores sin filtrar secretos."
    ],
    "deep": {
      "sections": [
        {
          "title": "Envelope encryption",
          "body": "Un patrón útil cifra datos con una data-encryption key aleatoria mediante AEAD y protege esa DEK mediante una key-encryption/master key o KMS. Permite rotación y separación de responsabilidades."
        },
        {
          "title": "Anti-replay",
          "body": "Counters/sequence numbers autenticados y ventanas de aceptación pueden impedir replay. Reinicios y persistencia son parte del diseño: resetear un contador y reutilizar nonce bajo misma clave puede ser catastrófico."
        },
        {
          "title": "Agilidad y migración",
          "body": "Algoritmo IDs, versiones y formatos deben estar autenticados para evitar downgrade/confusion. La agilidad no significa permitir cualquier algoritmo; significa poder evolucionar bajo política segura."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Servicio reinicia y su contador de nonce vuelve a cero, pero conserva la misma clave GCM. ¿Qué riesgo aparece?",
      "steps": [
        [
          "Paso 1",
          "Los nonces antiguos pueden repetirse."
        ],
        [
          "Paso 2",
          "GCM requiere evitar reutilización bajo la misma clave."
        ],
        [
          "Paso 3",
          "Hay que persistir estado o rotar clave/usar una estrategia de nonce robusta."
        ]
      ],
      "answer": "El lifecycle operativo puede romper un algoritmo matemáticamente sólido."
    },
    "check": {
      "question": "¿Usar AES-GCM basta para que un protocolo sea seguro aunque gestione mal nonces y claves?",
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
          "Solo con AES-256",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "La composición y lifecycle importan."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un esquema de envelope encryption puede usar una DEK por objeto y una KEK para proteger DEKs?",
        "answer": "si",
        "hint": "Es un patrón habitual."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Los IDs de algoritmo/versiones pueden necesitar autenticación para evitar downgrade/confusion?",
        "answer": "si",
        "hint": "El contexto también forma parte de la seguridad."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Es recomendable inventar un protocolo criptográfico de producción si existe uno estándar bien analizado?",
        "answer": "no",
        "hint": "Preferir estándares y bibliotecas maduras."
      }
    ]
  }
});
