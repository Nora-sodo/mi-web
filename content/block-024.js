/**
 * BLOQUE 024 — Seguridad web
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar política del navegador, autorización del servidor,
 * parsing y credenciales. Los ejemplos ofensivos se limitan a laboratorios
 * controlados; la prioridad es causa raíz, defensa y verificación.
 */
window.LEARNING_PATHS[24] = {
  "level": "Experto progresivo",
  "estimatedHours": 105,
  "description": "Seguridad web desde el modelo de navegador/origen hasta autorización, inyecciones, parsers, JWT/OAuth y testing defensivo en laboratorios controlados.",
  "outcomes": [
    "Razonar sobre Same-Origin Policy, CORS, cookies/sesiones y trust boundaries del navegador sin confundir controles de cliente y servidor.",
    "Prevenir inyecciones y vulnerabilidades de parsing mediante separación código/datos, APIs estructuradas y reducción de capacidades.",
    "Diseñar autorización object-level, manejo de archivos, protección SSRF/CSRF/XSS y concurrencia preservando invariantes de negocio.",
    "Validar JWT/OAuth según perfiles y Best Current Practices y ejecutar testing de seguridad únicamente en entornos autorizados y reproducibles."
  ],
  "modules": [
    {
      "id": "m1-browser-origin",
      "title": "Navegador, origen y estado",
      "description": "SOP, CORS, autenticación y sesiones",
      "lessons": [
        "web-boundaries-sop",
        "web-cors",
        "web-auth-sessions"
      ]
    },
    {
      "id": "m2-injection-client",
      "title": "Inyección y navegador",
      "description": "SQLi, command injection, XSS y CSRF",
      "lessons": [
        "web-sqli",
        "web-command-injection",
        "web-xss",
        "web-csrf"
      ]
    },
    {
      "id": "m3-server-data",
      "title": "Servidor, archivos y autorización",
      "description": "SSRF, paths/uploads, IDOR y parsers",
      "lessons": [
        "web-ssrf",
        "web-files-paths",
        "web-idor-access",
        "web-xxe-deserialization"
      ]
    },
    {
      "id": "m4-state-tokens",
      "title": "Estado concurrente y tokens",
      "description": "Races, JWT y OAuth",
      "lessons": [
        "web-races",
        "web-jwt",
        "web-oauth"
      ]
    },
    {
      "id": "m5-lab",
      "title": "Laboratorio defensivo",
      "description": "Metodología segura y reproducible",
      "lessons": [
        "web-security-labs"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "web-boundaries-sop": {
    "id": "web-boundaries-sop",
    "courseId": 24,
    "title": "Modelo de seguridad web, origin y Same-Origin Policy",
    "shortTitle": "El navegador es una máquina de trust boundaries",
    "duration": 110,
    "objective": "razonar sobre origin, ambient authority, navegación, DOM y Same-Origin Policy sin tratar “mismo sitio” y “mismo origen” como sinónimos.",
    "summary": [
      "Un origin web se identifica conceptualmente por scheme, host y port; Same-Origin Policy limita cómo documentos/scripts de un origen interactúan con recursos de otro.",
      "“Same-site” y “same-origin” son relaciones distintas: site interviene en mecanismos como SameSite cookies, mientras origin gobierna gran parte del aislamiento DOM/red del navegador.",
      "La seguridad web depende de varias fronteras simultáneas: navegador↔servidor, origen↔origen, frontend↔API y usuario↔objeto."
    ],
    "concept": "El navegador actúa como un mediador con credenciales ambientales, almacenamiento, parsing y múltiples políticas; entender sus fronteras evita atribuir a CORS, cookies o SOP garantías que no poseen.",
    "diagram": [],
    "rules": [
      "Calcula origin con scheme+host+port; no uses “dominio parecido” como criterio.",
      "Distingue lectura de respuesta, envío de request y navegación: SOP no bloquea todas las interacciones cross-origin.",
      "No uses CORS como sistema de autenticación o autorización."
    ],
    "deep": {
      "sections": [
        {
          "title": "Origin frente a site",
          "body": "https://app.example y https://api.example son cross-origin por hostname, aunque pueden pertenecer al mismo site para ciertos mecanismos. http://app.example y https://app.example tampoco comparten origin por scheme."
        },
        {
          "title": "Ambient authority",
          "body": "Cookies y otras credenciales pueden adjuntarse automáticamente a requests bajo reglas del navegador. Esa automaticidad explica parte del riesgo CSRF y por qué una request “salió del navegador” no significa que el usuario pretendiera la acción."
        },
        {
          "title": "Qué limita SOP",
          "body": "SOP restringe muchas lecturas e interacciones entre orígenes, especialmente DOM y respuestas de fetch/XHR, pero no convierte toda request cross-origin en imposible. Formularios, imágenes, navegación y otros mecanismos tienen reglas diferentes."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una aplicación en https://app.example intenta leer por fetch una API en https://api.example. ¿Son mismo origin?",
      "steps": [
        [
          "Paso 1",
          "Compara scheme: ambos usan HTTPS."
        ],
        [
          "Paso 2",
          "Compara host: app.example y api.example son distintos."
        ],
        [
          "Paso 3",
          "Aunque compartan site registrable, son cross-origin; la lectura necesita una política de CORS adecuada si el navegador la aplica."
        ]
      ],
      "answer": "Son cross-origin por hostname; same-site no implica same-origin."
    },
    "check": {
      "question": "¿https://example.com y http://example.com comparten origin?",
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
          "Solo si usan el mismo path",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El scheme forma parte del origin."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El puerto forma parte del origin?",
        "answer": "si",
        "hint": "Origin incluye scheme, host y port."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Same-site implica siempre same-origin?",
        "answer": "no",
        "hint": "Son relaciones diferentes."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿SOP es un sustituto de autorización del servidor?",
        "answer": "no",
        "hint": "El servidor debe autorizar independientemente del navegador."
      }
    ]
  },
  "web-cors": {
    "id": "web-cors",
    "courseId": 24,
    "title": "CORS y preflight",
    "shortTitle": "Permitir lectura cross-origin sin regalar autorización",
    "duration": 100,
    "objective": "configurar y razonar sobre CORS como política del navegador para acceso cross-origin, distinguiendo preflight, credenciales y autorización de servidor.",
    "summary": [
      "CORS permite que un servidor declare qué orígenes pueden leer determinadas respuestas desde código navegador; no autentica usuarios ni decide permisos sobre objetos.",
      "Un preflight OPTIONS consulta si una operación cross-origin no simple está permitida antes de enviar la request efectiva, pero no convierte la aplicación en segura.",
      "Las respuestas con credenciales exigen reglas más estrictas; un origen reflejado sin validación puede ampliar la superficie de exposición."
    ],
    "concept": "CORS es una extensión controlada de la política de origen del navegador. Su pregunta es “¿puede este origen leer/usar esta respuesta desde script?”, no “¿está este usuario autorizado?”.",
    "diagram": [],
    "rules": [
      "Autoriza orígenes explícitos cuando se permiten credenciales; no reflejes Origin ciegamente.",
      "Valida permisos en el backend aunque CORS bloquee al navegador.",
      "No asumas que una request sin preflight es inocua: “simple” describe reglas del navegador, no riesgo de negocio."
    ],
    "deep": {
      "sections": [
        {
          "title": "Preflight",
          "body": "El navegador puede enviar OPTIONS con Origin y Access-Control-Request-* para consultar permisos. El servidor responde con su política; si no coincide, el navegador bloquea el uso por script."
        },
        {
          "title": "Credenciales",
          "body": "Permitir cookies/credenciales cross-origin cambia el modelo: la respuesta debe declarar un origen concreto compatible y la aplicación sigue necesitando autenticación, CSRF y autorización según el caso."
        },
        {
          "title": "CORS no protege al servidor",
          "body": "Clientes no navegador, proxies o requests same-origin no están “detenidos por CORS”. Nunca diseñes un endpoint sensible confiando en que un atacante no podrá emitir la request."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una API comprueba solo que Origin sea https://panel.example pero no verifica si el usuario puede leer invoice/42. ¿CORS resuelve el IDOR?",
      "steps": [
        [
          "Paso 1",
          "CORS puede controlar si cierto JavaScript cross-origin lee la respuesta."
        ],
        [
          "Paso 2",
          "La autorización sobre invoice/42 sigue siendo una decisión del servidor."
        ],
        [
          "Paso 3",
          "Por tanto CORS no corrige un fallo de object-level authorization."
        ]
      ],
      "answer": "No: CORS y autorización responden preguntas diferentes."
    },
    "check": {
      "question": "¿Un preflight exitoso autoriza al usuario a modificar cualquier objeto?",
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
          "Solo en HTTP/2",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Preflight autoriza una clase de request cross-origin desde el punto de vista del navegador."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿CORS puede sustituir autorización backend?",
        "answer": "no",
        "hint": "No controla permisos de negocio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Reflejar cualquier Origin recibido es una política estricta?",
        "answer": "no",
        "hint": "Amplía la confianza a orígenes no previstos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una request “simple” puede seguir causar un cambio de estado sensible?",
        "answer": "si",
        "hint": "Simple describe condiciones CORS, no inocuidad."
      }
    ]
  },
  "web-auth-sessions": {
    "id": "web-auth-sessions",
    "courseId": 24,
    "title": "Autenticación, sesiones y lifecycle",
    "shortTitle": "La sesión es una credencial en movimiento",
    "duration": 115,
    "objective": "diseñar autenticación y sesiones web considerando fijación, rotación, expiración, logout, recuperación y reautenticación sin confundir cookie con sesión.",
    "summary": [
      "Una sesión enlaza requests a un contexto autenticado; su identificador debe tratarse como credencial si su posesión basta para actuar.",
      "El lifecycle importa tanto como el login: creación, rotación tras cambios de privilegio, expiración, revocación y recuperación de cuenta forman parte del modelo.",
      "Authentication bugs suelen aparecer por estados inconsistentes, flujos alternativos y recuperación, no solo por contraseñas débiles."
    ],
    "concept": "La seguridad de autenticación es una máquina de estados: cada transición debe preservar identidad, frescura, privilegios y revocabilidad.",
    "diagram": [],
    "rules": [
      "Rota identificadores de sesión al autenticar o cambiar privilegios para reducir fijación.",
      "Invalida server-side cuando el modelo requiera logout/revocación; borrar una cookie cliente puede no ser suficiente.",
      "Protege recuperación de cuenta como un flujo de autenticación de alto impacto, con tokens de un solo uso y expiración."
    ],
    "deep": {
      "sections": [
        {
          "title": "Session fixation",
          "body": "Si el servidor conserva el mismo identificador preautenticado después del login, alguien que ya conocía ese ID puede reutilizarlo. La mitigación típica es regenerar la sesión al elevar identidad/privilegio."
        },
        {
          "title": "Reautenticación y acciones sensibles",
          "body": "Una sesión antigua o de baja confianza puede no ser suficiente para cambiar contraseña, MFA o datos críticos. Step-up authentication reduce el impacto de una sesión robada."
        },
        {
          "title": "Revocación y múltiples dispositivos",
          "body": "Una arquitectura debe decidir si tokens/sesiones pueden revocarse de inmediato, por dispositivo o globalmente. La elección afecta almacenamiento, escalabilidad y respuesta a incidentes."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un usuario inicia sesión pero el servidor conserva exactamente el session ID anónimo que ya tenía. ¿Qué propiedad conviene revisar?",
      "steps": [
        [
          "Paso 1",
          "Antes del login el ID podía haber sido conocido o fijado."
        ],
        [
          "Paso 2",
          "El login elevó el significado del mismo identificador."
        ],
        [
          "Paso 3",
          "Rotar el session ID tras autenticación corta esa continuidad."
        ]
      ],
      "answer": "Es un riesgo de session fixation; rota el identificador al elevar autenticación/privilegios."
    },
    "check": {
      "question": "¿Borrar la cookie del navegador garantiza por sí solo revocación server-side?",
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
          "Solo con HTTPS",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "La validez real depende del estado/política del servidor."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un session ID puede actuar como credencial bearer?",
        "answer": "si",
        "hint": "Quien lo posee puede poder actuar como el usuario."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Conviene rotar sesión tras login/cambio de privilegio?",
        "answer": "si",
        "hint": "Reduce fixation y separa contextos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El flujo de recuperación de cuenta debe considerarse parte de la autenticación?",
        "answer": "si",
        "hint": "Puede conceder control de la cuenta."
      }
    ]
  },
  "web-sqli": {
    "id": "web-sqli",
    "courseId": 24,
    "title": "SQL injection y consultas parametrizadas",
    "shortTitle": "Datos no son sintaxis SQL",
    "duration": 105,
    "objective": "prevenir SQL injection separando estructura de consulta y valores mediante parámetros, validando identificadores no parametrizables y aplicando mínimo privilegio en la base de datos.",
    "summary": [
      "SQL injection aparece cuando datos controlables influyen en la sintaxis SQL en lugar de ocupar posiciones de datos bien definidas.",
      "Prepared statements/parameterized queries separan código SQL y valores para las posiciones soportadas por el driver; escapar cadenas manualmente es más frágil.",
      "Parámetros no suelen servir para nombres de tablas, columnas u orden dinámico: esas decisiones requieren allowlists o construcción estructurada segura."
    ],
    "concept": "La defensa principal no consiste en “detectar caracteres malos”, sino en impedir que input cambie la gramática de la consulta.",
    "diagram": [],
    "rules": [
      "Usa parámetros para valores y evita concatenar input en SQL.",
      "Para identificadores dinámicos, mapea opciones de usuario a identificadores conocidos; no pases texto arbitrario.",
      "Aplica una cuenta DB con privilegios mínimos para limitar blast radius si otra defensa falla."
    ],
    "deep": {
      "sections": [
        {
          "title": "Separación código/datos",
          "body": "Una consulta preparada fija la estructura y transmite valores por un canal de parámetros definido por el driver. El motor no debe reinterpretar esos valores como tokens SQL de la consulta."
        },
        {
          "title": "Dinámica estructural",
          "body": "ORDER BY, nombres de columna o tabla requieren diseño: la aplicación puede mapear “fecha”→created_at y “precio”→price, rechazando cualquier opción fuera de la lista."
        },
        {
          "title": "Defense in depth",
          "body": "Errores genéricos, mínimos privilegios y límites de resultados reducen información/impacto, pero no sustituyen la parametrización."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una API permite ordenar por un parámetro sort y concatena ese texto como nombre de columna. ¿Basta con parametrizar el valor del filtro?",
      "steps": [
        [
          "Paso 1",
          "El valor del filtro sí puede parametrizarse."
        ],
        [
          "Paso 2",
          "El identificador de columna es parte de la estructura SQL y suele no aceptar binding como valor."
        ],
        [
          "Paso 3",
          "Mapea sort a una lista fija de columnas permitidas."
        ]
      ],
      "answer": "Parametriza valores y usa allowlist estructural para identificadores dinámicos."
    },
    "check": {
      "question": "¿Escapar manualmente todas las comillas es preferible a prepared statements cuando estos están disponibles?",
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
          "Solo si la DB es remota",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "La separación estructural es más robusta que filtros ad hoc."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una query parametrizada separa sintaxis y valores?",
        "answer": "si",
        "hint": "Ese es su objetivo."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Los nombres de columna dinámicos deben venir de una allowlist estructurada?",
        "answer": "si",
        "hint": "No son simples valores parametrizables en muchos APIs."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Mínimo privilegio de la cuenta DB sustituye parametrización?",
        "answer": "no",
        "hint": "Solo limita consecuencias."
      }
    ]
  },
  "web-command-injection": {
    "id": "web-command-injection",
    "courseId": 24,
    "title": "Command injection y ejecución de procesos",
    "shortTitle": "No conviertas input en un mini-shell",
    "duration": 100,
    "objective": "evitar command injection eliminando shell innecesario, usando APIs con argv separado, validación de dominio y privilegios mínimos.",
    "summary": [
      "Command injection aparece cuando input no confiable se interpreta como sintaxis de shell/comando en lugar de como dato.",
      "La defensa más fuerte suele ser evitar el shell y llamar una API o ejecutable con argumentos estructurados.",
      "Incluso sin shell, algunos programas interpretan argumentos como opciones; validar dominio y usar terminadores/opciones seguras cuando proceda sigue siendo necesario."
    ],
    "concept": "La frontera clave es quién parsea el texto: shell, programa invocado o API. Cuantos más parsers interpreten input, más gramáticas debes controlar.",
    "diagram": [],
    "rules": [
      "Prefiere APIs nativas a ejecutar utilidades externas para operaciones que la plataforma ya ofrece.",
      "Si ejecutas un proceso, pasa programa y argv por separado; no construyas una línea de shell con concatenación.",
      "Usa allowlists de operaciones/identificadores de negocio, no blocklists de metacaracteres."
    ],
    "deep": {
      "sections": [
        {
          "title": "Shell como parser",
          "body": "Un shell expande metacaracteres, sustituciones y redirecciones. Evitar esa capa elimina toda una gramática de interpretación."
        },
        {
          "title": "Option injection",
          "body": "Un argumento que empieza por “-” puede ser interpretado como opción por ciertos programas aunque no haya shell. El contrato del ejecutable sigue importando."
        },
        {
          "title": "Diseño por capacidades",
          "body": "En vez de aceptar un comando arbitrario, una API interna puede exponer operaciones estrechas como resize_image(id,size) y resolver internamente el recurso permitido."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un servicio necesita obtener el tamaño de una imagen. ¿Qué es preferible: concatenar “identify ” + filename en shell o usar una librería/API con parámetro de ruta validado?",
      "steps": [
        [
          "Paso 1",
          "La concatenación introduce un parser shell y semántica de comando."
        ],
        [
          "Paso 2",
          "Una API estructurada reduce intérpretes y puede validar el recurso directamente."
        ],
        [
          "Paso 3",
          "Mantén además una raíz/allowlist de archivos permitidos."
        ]
      ],
      "answer": "Prefiere API/librería estructurada y validación de dominio; evita shell innecesario."
    },
    "check": {
      "question": "¿Eliminar el shell reduce una clase completa de metacaracteres interpretables?",
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
          "Solo en Windows",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Aunque el programa destino aún puede tener su propia gramática de argumentos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Construir una línea de shell con input es una frontera peligrosa?",
        "answer": "si",
        "hint": "Input puede adquirir significado sintáctico."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿argv separado evita necesariamente option injection del programa destino?",
        "answer": "no",
        "hint": "El programa puede interpretar opciones."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una API de negocio estrecha suele ser más segura que “ejecuta cualquier comando”?",
        "answer": "si",
        "hint": "Reduce autoridad y gramática expuesta."
      }
    ]
  },
  "web-xss": {
    "id": "web-xss",
    "courseId": 24,
    "title": "XSS, contextos de salida y DOM",
    "shortTitle": "Escapar HTML no arregla todos los parsers",
    "duration": 120,
    "objective": "prevenir XSS identificando el contexto de interpretación, usando auto-escaping seguro, APIs DOM no ejecutables y políticas complementarias como CSP.",
    "summary": [
      "XSS ocurre cuando datos no confiables alcanzan un contexto ejecutable en el navegador; la defensa depende del contexto HTML, atributo, URL, JavaScript o DOM.",
      "Output encoding es contextual: una transformación válida para texto HTML no es automáticamente segura dentro de JavaScript o una URL.",
      "APIs como textContent reducen riesgo al tratar input como texto; sinks como innerHTML requieren confianza/sanitización apropiada."
    ],
    "concept": "XSS es un problema de transición datos→código en parsers del navegador. La pregunta útil no es “¿filtré <script>?”, sino “¿en qué gramática se interpretará este valor?”.",
    "diagram": [],
    "rules": [
      "Usa templates/frameworks con auto-escaping y evita desactivar sus protecciones sin necesidad.",
      "Prefiere sinks de texto/atributos seguros; sanitiza HTML solo cuando el producto realmente necesita HTML no confiable.",
      "Trata CSP como defensa en profundidad, no como sustituto de encoding/sanitización."
    ],
    "deep": {
      "sections": [
        {
          "title": "Contextos",
          "body": "Texto HTML, atributos, URLs y JavaScript tienen reglas distintas. Reutilizar una función de escape fuera de su contexto puede abrir una ruta de ejecución."
        },
        {
          "title": "DOM XSS",
          "body": "Un valor puede no pasar por HTML generado en servidor y aun terminar en un sink ejecutable del DOM. El análisis source→transform→sink es esencial."
        },
        {
          "title": "CSP",
          "body": "Una Content Security Policy bien diseñada puede limitar fuentes y ejecución, especialmente sin unsafe-inline, pero compatibilidad, nonces/hashes y sinks siguen importando."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "La app muestra un nombre de usuario con element.innerHTML. ¿Qué alternativa es preferible si solo debe ser texto?",
      "steps": [
        [
          "Paso 1",
          "El dato no necesita markup."
        ],
        [
          "Paso 2",
          "textContent conserva el valor como texto en vez de parsearlo como HTML."
        ],
        [
          "Paso 3",
          "CSP puede añadirse como defensa complementaria, no como excusa para conservar el sink innecesario."
        ]
      ],
      "answer": "textContent es la opción natural cuando el requisito es texto, no HTML."
    },
    "check": {
      "question": "¿Escapar solo los caracteres < y > hace segura cualquier inserción en JavaScript inline?",
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
          "Solo con HTTPS",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Cada contexto tiene gramática y encoding propios."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿textContent trata el valor como texto en vez de HTML?",
        "answer": "si",
        "hint": "Evita parsing HTML del valor."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿CSP sustituye output encoding contextual?",
        "answer": "no",
        "hint": "Es defensa en profundidad."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿DOM XSS puede ocurrir sin que el servidor refleje HTML malicioso?",
        "answer": "si",
        "hint": "Puede nacer completamente en código cliente."
      }
    ]
  },
  "web-csrf": {
    "id": "web-csrf",
    "courseId": 24,
    "title": "CSRF, credenciales ambientales y SameSite",
    "shortTitle": "El navegador puede estar autenticado y aun así hacer algo no pedido",
    "duration": 105,
    "objective": "prevenir CSRF comprendiendo ambient authority, tokens anti-CSRF, SameSite, Origin/Referer y la diferencia entre autenticidad de request e intención del usuario.",
    "summary": [
      "CSRF explota que el navegador puede adjuntar credenciales automáticamente a una request iniciada desde un contexto atacante.",
      "Los tokens anti-CSRF vinculan la acción a un valor que el sitio legítimo puede emitir/verificar; SameSite cookies y comprobaciones de Origin aportan capas adicionales.",
      "XSS puede debilitar muchas defensas CSRF porque el atacante pasa a ejecutar código dentro del origen confiable."
    ],
    "concept": "CSRF no falsifica necesariamente la cookie: induce al navegador de la víctima a usar su propia autoridad en una acción no pretendida.",
    "diagram": [],
    "rules": [
      "Protege acciones state-changing con mecanismos del framework o tokens robustos; no uses GET para cambios sensibles.",
      "Configura SameSite según el flujo real y no lo trates como defensa única para todos los clientes/escenarios.",
      "Valida Origin/Referer cuando sea apropiado y diseña APIs para distinguir credenciales ambientales de tokens explícitos."
    ],
    "deep": {
      "sections": [
        {
          "title": "Token synchronizer/double submit",
          "body": "Existen patrones distintos según arquitectura; el principio es que el atacante cross-site no pueda producir un valor válido vinculado a la sesión/contexto."
        },
        {
          "title": "SameSite",
          "body": "Lax/Strict/None modifican cuándo una cookie acompaña requests cross-site. None requiere Secure en navegadores modernos, pero compatibilidad y flujos federados requieren diseño consciente."
        },
        {
          "title": "Fetch metadata y origen",
          "body": "Headers de contexto y Origin pueden reforzar políticas en aplicaciones navegador, aunque siempre deben entenderse dentro del proxy/cliente real y no reemplazan autorización."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una transferencia bancaria acepta POST autenticado solo por cookie y no comprueba token/origen. ¿Por qué existe riesgo CSRF?",
      "steps": [
        [
          "Paso 1",
          "La cookie puede adjuntarse automáticamente según sus atributos/contexto."
        ],
        [
          "Paso 2",
          "Otro sitio puede intentar inducir una request state-changing."
        ],
        [
          "Paso 3",
          "El servidor necesita una señal adicional que el contexto atacante no pueda fabricar bajo el modelo."
        ]
      ],
      "answer": "La autenticación por cookie no demuestra intención del usuario; añade una defensa CSRF apropiada."
    },
    "check": {
      "question": "¿CSRF requiere robar la cookie de sesión para funcionar?",
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
          "Solo con HTTP/3",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Aprovecha credenciales que el navegador puede enviar automáticamente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿SameSite puede reducir requests cross-site con cookies?",
        "answer": "si",
        "hint": "Es una capa relevante del navegador."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Usar GET para borrar una cuenta es una buena semántica defensiva?",
        "answer": "no",
        "hint": "GET debe ser safe y no ejecutar cambios destructivos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una XSS puede socavar defensas CSRF del mismo origen?",
        "answer": "si",
        "hint": "El atacante gana capacidad dentro del origen."
      }
    ]
  },
  "web-ssrf": {
    "id": "web-ssrf",
    "courseId": 24,
    "title": "SSRF y salidas de red del servidor",
    "shortTitle": "El servidor también necesita una política de destinos",
    "duration": 110,
    "objective": "prevenir SSRF controlando destinos, resolución, redirects, protocolos y egress, y modelando servicios internos/cloud metadata como recursos sensibles.",
    "summary": [
      "SSRF aparece cuando input controla a qué recurso externo o interno realiza una petición el servidor, cruzando fronteras de red con la autoridad del backend.",
      "Validar solo la cadena inicial de una URL puede fallar ante resolución DNS, redirects, variantes de dirección o protocolos alternativos.",
      "Una defensa robusta combina allowlists por caso de uso, resolución/IP policy, límites de protocolo, redirect policy y controles de egress."
    ],
    "concept": "SSRF convierte al backend en un “confused deputy” de red: el atacante intenta hacer que use conectividad o identidad que él no posee directamente.",
    "diagram": [],
    "rules": [
      "Diseña una allowlist de destinos/operaciones cuando el producto conoce los servicios permitidos.",
      "Resuelve y valida la dirección efectiva según política, considerando redirects y cambios de resolución cuando aplique.",
      "Bloquea por arquitectura el acceso innecesario a redes administrativas, loopback, link-local y metadata desde componentes expuestos."
    ],
    "deep": {
      "sections": [
        {
          "title": "Parsing y normalización",
          "body": "URLs tienen scheme, authority, host, puertos y encodings. La validación debe usar un parser correcto y operar sobre la representación semántica, no una búsqueda substring."
        },
        {
          "title": "DNS y redirects",
          "body": "Un host inicialmente aceptable puede resolver de forma inesperada o redirigir a otro destino. La política debe decidir si se siguen redirects y volver a validar cada salto cuando proceda."
        },
        {
          "title": "Egress como defensa",
          "body": "Firewall/proxy de salida y separación de red limitan blast radius incluso si una aplicación contiene una vulnerabilidad SSRF."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un servicio “preview URL” permite cualquier https:// y solo rechaza strings que contengan “127.0.0.1”. ¿Es suficiente?",
      "steps": [
        [
          "Paso 1",
          "El filtro textual no cubre otras representaciones/direcciones ni DNS."
        ],
        [
          "Paso 2",
          "Los redirects pueden cambiar el destino efectivo."
        ],
        [
          "Paso 3",
          "Conviene una allowlist de destinos y controles de egress acordes al producto."
        ]
      ],
      "answer": "No: valida semántica/destino efectivo y aplica política de salida, no substrings."
    },
    "check": {
      "question": "¿Un SSRF puede alcanzar servicios internos que el atacante no puede contactar directamente?",
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
          "Solo mediante SQL",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El backend aporta su propia conectividad/identidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Validar solo el hostname textual basta contra todos los SSRF?",
        "answer": "no",
        "hint": "Resolución, redirects y formatos importan."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El egress filtering puede limitar impacto de SSRF?",
        "answer": "si",
        "hint": "Reduce destinos alcanzables."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un redirect debe considerarse un nuevo destino bajo la política?",
        "answer": "si",
        "hint": "Puede cambiar la frontera alcanzada."
      }
    ]
  },
  "web-files-paths": {
    "id": "web-files-paths",
    "courseId": 24,
    "title": "Path traversal, file inclusion y uploads",
    "shortTitle": "Un nombre de archivo no es una ruta de confianza",
    "duration": 115,
    "objective": "diseñar manejo de archivos con IDs opacos, raíces controladas, canonicalización segura, almacenamiento separado y procesamiento de uploads como contenido hostil.",
    "summary": [
      "Path traversal aparece cuando input influye en una ruta de filesystem y puede escapar del conjunto de recursos autorizado.",
      "File inclusion añade riesgo cuando una ruta controlable selecciona contenido que después se interpreta/ejecuta por un runtime o template engine.",
      "File upload es una frontera completa: nombre, tamaño, tipo real, parser, almacenamiento, serving, permisos y lifecycle deben modelarse."
    ],
    "concept": "La defensa preferible es no aceptar rutas arbitrarias: el usuario elige un identificador de negocio y el servidor resuelve internamente un recurso autorizado.",
    "diagram": [],
    "rules": [
      "No uses el filename suministrado como ruta final; genera nombres internos y guarda metadata separada.",
      "Comprueba que la ruta resuelta/canónica permanece bajo la raíz permitida y considera symlinks/races según el entorno.",
      "Almacena uploads fuera de zonas ejecutables y sírvelos con Content-Type/Content-Disposition y controles de autorización apropiados."
    ],
    "deep": {
      "sections": [
        {
          "title": "Traversal y canonicalización",
          "body": "Filtrar literalmente “../” no cubre todas las codificaciones, separadores o symlinks. Resolver bajo una raíz controlada o usar APIs basadas en directory handles reduce ambigüedad."
        },
        {
          "title": "Uploads",
          "body": "La extensión declarada y Content-Type cliente no prueban el contenido. El servidor puede verificar firmas/magic, límites, descompresión y parsers según el caso de uso."
        },
        {
          "title": "Serving",
          "body": "Incluso un archivo no ejecutado por el servidor puede causar XSS o content sniffing si se sirve inline bajo el mismo origin con tipo peligroso. Separar origin de contenido subido es una defensa potente."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una app guarda uploads en /var/www/public usando directamente el filename del usuario. ¿Qué rediseño reduce riesgos?",
      "steps": [
        [
          "Paso 1",
          "Genera un identificador interno independiente del filename."
        ],
        [
          "Paso 2",
          "Guarda fuera del document root/área ejecutable y conserva el nombre original solo como metadata."
        ],
        [
          "Paso 3",
          "Sirve mediante un handler que aplica autorización y headers adecuados."
        ]
      ],
      "answer": "Desacopla nombre externo, path interno y serving; trata el contenido como hostil."
    },
    "check": {
      "question": "¿Content-Type enviado por el cliente demuestra el tipo real del archivo?",
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
          "Solo si usa HTTPS",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Es metadata controlable por el cliente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Filtrar solo la cadena ../ elimina todo traversal?",
        "answer": "no",
        "hint": "Existen normalización, separadores y symlinks."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Conviene generar un nombre interno para uploads?",
        "answer": "si",
        "hint": "Reduce control del usuario sobre paths."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Servir uploads desde un origin separado puede limitar impacto web?",
        "answer": "si",
        "hint": "Aísla cookies/DOM/origin principal."
      }
    ]
  },
  "web-idor-access": {
    "id": "web-idor-access",
    "courseId": 24,
    "title": "IDOR y autorización a nivel de objeto",
    "shortTitle": "El identificador no es el permiso",
    "duration": 105,
    "objective": "prevenir IDOR/BOLA aplicando autorización sobre cada objeto y acción independientemente de si el identificador es predecible, UUID o “oculto”.",
    "summary": [
      "IDOR/BOLA aparece cuando el servidor usa un identificador controlable para acceder a un objeto sin verificar que el principal actual esté autorizado para esa acción.",
      "Cambiar IDs incrementales por UUID puede reducir enumeración, pero no reemplaza la comprobación de autorización.",
      "La autorización debe ejecutarse en la capa que conoce sujeto, acción, objeto y tenant/contexto, incluidos endpoints secundarios y operaciones batch."
    ],
    "concept": "Un object ID responde “qué objeto”; la política debe responder aparte “¿puede este principal hacer esta operación sobre ese objeto ahora?”.",
    "diagram": [],
    "rules": [
      "Filtra/consulta por principal o tenant autorizado en vez de cargar globalmente y confiar en el frontend.",
      "Aplica checks consistentes a read, write, delete, export, nested resources y endpoints administrativos.",
      "No uses la imposibilidad de adivinar IDs como frontera de seguridad."
    ],
    "deep": {
      "sections": [
        {
          "title": "Object-level authorization",
          "body": "Una ruta /invoices/{id} debe verificar acceso a esa invoice concreta. Estar autenticado o tener acceso a alguna invoice no basta."
        },
        {
          "title": "Mass endpoints",
          "body": "Listados, búsquedas y acciones batch pueden reintroducir BOLA aunque el endpoint individual esté protegido; la política debe acompañar cada objeto afectado."
        },
        {
          "title": "Tenant boundaries",
          "body": "En SaaS multi-tenant, incluir tenant_id en la query/constraint y verificar ownership/policy reduce el riesgo de cruces accidentales entre tenants."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "La API cambia invoice IDs 41,42,43 por UUID aleatorios pero no añade autorización. ¿Se arregló el IDOR?",
      "steps": [
        [
          "Paso 1",
          "Los UUID dificultan adivinar referencias."
        ],
        [
          "Paso 2",
          "Si un UUID se filtra o obtiene, el servidor sigue sin verificar permiso."
        ],
        [
          "Paso 3",
          "La corrección es autorización object-level independiente del formato del ID."
        ]
      ],
      "answer": "No: IDs opacos son defensa secundaria; la autorización es obligatoria."
    },
    "check": {
      "question": "¿Un UUID imposible de adivinar sustituye el control de acceso?",
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
          "Solo con CORS",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "La no enumerabilidad no demuestra autorización."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿IDOR es esencialmente un fallo de autorización?",
        "answer": "si",
        "hint": "Falta comprobar permiso sobre el objeto."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Debe autorizarse también delete/export y no solo GET?",
        "answer": "si",
        "hint": "La política depende de la acción."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Filtrar por tenant en la query puede reforzar aislamiento?",
        "answer": "si",
        "hint": "Reduce objetos candidatos fuera del tenant."
      }
    ]
  },
  "web-xxe-deserialization": {
    "id": "web-xxe-deserialization",
    "courseId": 24,
    "title": "XXE y deserialización insegura",
    "shortTitle": "Los parsers también tienen poderes",
    "duration": 110,
    "objective": "endurecer XML y deserialización deshabilitando features innecesarias, evitando tipos arbitrarios y usando formatos/esquemas con contratos explícitos.",
    "summary": [
      "XXE aparece cuando un parser XML procesa entidades externas/DTD de forma que input puede provocar lecturas o solicitudes no previstas.",
      "Deserialización insegura surge cuando datos no confiables seleccionan tipos, construyen grafos de objetos o activan callbacks con autoridad inesperada.",
      "La defensa es reducir capacidades del parser: desactivar DTD/entidades externas si no se necesitan, usar tipos allowlisted y formatos simples con validación de esquema."
    ],
    "concept": "Un parser no “solo convierte bytes a objetos”: puede resolver recursos, instanciar tipos y ejecutar hooks. Cada capability debe justificarse.",
    "diagram": [],
    "rules": [
      "Configura explícitamente el parser XML para bloquear DTD/entidades externas cuando el caso de uso no las requiere.",
      "No deserialices formatos nativos con tipos arbitrarios desde input no confiable; mapea a DTOs/esquemas simples.",
      "Valida límites de tamaño/profundidad para evitar ataques de expansión/recursos además de ejecución o lecturas."
    ],
    "deep": {
      "sections": [
        {
          "title": "XXE",
          "body": "Los detalles de configuración dependen de librería/versión. La regla editorial es fail-closed: si no necesitas resolución externa, no debe estar habilitada por defecto “porque siempre funcionó”."
        },
        {
          "title": "Deserialización",
          "body": "Object graphs con polimorfismo dinámico pueden permitir seleccionar clases no previstas. JSON “normal” no es automáticamente seguro si el framework habilita type metadata peligrosa."
        },
        {
          "title": "Integridad y autenticidad",
          "body": "Firmar un blob serializado puede impedir manipulación por terceros si las claves/lifecycle son correctos, pero no corrige gadgets peligrosos si el productor legítimo puede generar estados inseguros o hay confusion de tipos."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una API recibe XML solo para campos simples y no necesita DTD. ¿Qué política es razonable?",
      "steps": [
        [
          "Paso 1",
          "Deshabilita DTD y resolución de entidades externas."
        ],
        [
          "Paso 2",
          "Valida tamaño/esquema esperado."
        ],
        [
          "Paso 3",
          "Ejecuta el parser con privilegios/acceso de red/FS mínimos."
        ]
      ],
      "answer": "Reduce capacidades del parser a las estrictamente necesarias."
    },
    "check": {
      "question": "¿Deserializar JSON con type metadata arbitraria puede ser peligroso aunque no sea “pickle”?",
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
          "Solo con XML",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El riesgo depende de capacidades del deserializador, no del nombre del formato."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Conviene deshabilitar entidades externas si no son necesarias?",
        "answer": "si",
        "hint": "Reduce capacidades del parser."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una allowlist de DTOs/tipos es preferible a instanciar clases arbitrarias?",
        "answer": "si",
        "hint": "Limita objetos construibles."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Firmar datos sustituye todos los controles del deserializador?",
        "answer": "no",
        "hint": "Autenticidad no elimina lógica peligrosa."
      }
    ]
  },
  "web-races": {
    "id": "web-races",
    "courseId": 24,
    "title": "Race conditions web y atomicidad de negocio",
    "shortTitle": "Dos requests correctas pueden producir un estado incorrecto",
    "duration": 105,
    "objective": "detectar race conditions en check-then-act, límites y operaciones financieras usando transacciones, constraints, locks/idempotency y tests concurrentes.",
    "summary": [
      "Una race web aparece cuando requests concurrentes observan estados compatibles individualmente pero violan una invariante al intercalarse.",
      "Validar “saldo suficiente” y después actualizar en operaciones separadas no es atómico; otra request puede cambiar el estado entre ambos pasos.",
      "Constraints de base de datos, transacciones con aislamiento apropiado, compare-and-swap, locks o idempotency keys son herramientas distintas según la invariante."
    ],
    "concept": "La seguridad de una operación no se evalúa request por request si la propiedad vive a través de múltiples transiciones concurrentes.",
    "diagram": [],
    "rules": [
      "Expresa invariantes críticas en la capa transaccional/constraint más cercana al dato.",
      "Usa idempotency keys para reintentos cuando la semántica de negocio lo permita; no las confundas con exclusión mutua.",
      "Prueba concurrencia con barreras controladas en laboratorio para reproducir interleavings, no solo con “hacer clic muy rápido”."
    ],
    "deep": {
      "sections": [
        {
          "title": "Check-then-act",
          "body": "Dos workers pueden leer stock=1 y ambos aprobar antes de que ninguno descuente. El check debe formar parte de una operación atómica o serializable apropiada."
        },
        {
          "title": "Idempotencia",
          "body": "Una key asociada a una operación permite reconocer reintentos equivalentes, pero no arregla todas las carreras entre operaciones distintas."
        },
        {
          "title": "Constraints",
          "body": "Unique constraints, saldo no negativo u otras invariantes modelables en DB pueden convertir una condición de carrera en un conflicto detectable que la aplicación maneja."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Dos requests leen coupon.remaining=1, ambas validan y luego decrementan. ¿Qué falla?",
      "steps": [
        [
          "Paso 1",
          "El check y la actualización no forman una unidad atómica."
        ],
        [
          "Paso 2",
          "Ambas requests pueden observar el mismo estado previo."
        ],
        [
          "Paso 3",
          "Usa una operación/constraint/transacción que preserve la invariante bajo concurrencia."
        ]
      ],
      "answer": "Es un clásico check-then-act; la invariante debe protegerse de forma atómica."
    },
    "check": {
      "question": "¿Una idempotency key evita automáticamente carreras entre dos operaciones diferentes?",
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
          "Solo en PostgreSQL",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Evita ciertos duplicados/reintentos, no toda concurrencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una race puede existir aunque cada request sea válida por separado?",
        "answer": "si",
        "hint": "El interleaving rompe la invariante."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una constraint DB puede ser parte de la defensa?",
        "answer": "si",
        "hint": "Hace la invariante verificable en la capa de datos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Testear solo de forma secuencial demuestra ausencia de races?",
        "answer": "no",
        "hint": "No explora interleavings concurrentes."
      }
    ]
  },
  "web-jwt": {
    "id": "web-jwt",
    "courseId": 24,
    "title": "JWT: validación criptográfica y semántica",
    "shortTitle": "Firmado no significa “válido para mí”",
    "duration": 115,
    "objective": "validar JWT con algoritmo/clave fijados por política, claims obligatorios, issuer/audience/time y separación de tipos/contextos.",
    "summary": [
      "JWT es un formato de claims; puede estar firmado (JWS) o cifrado (JWE) según el perfil, y Base64url no proporciona confidencialidad.",
      "La verificación segura requiere fijar algoritmos aceptados por política y validar operación criptográfica, issuer, audience, expiración y claims requeridos.",
      "RFC 8725 recomienda evitar confusión entre tipos de JWT y validar reglas específicas del contexto; un token válido en un sistema no debe aceptarse automáticamente en otro."
    ],
    "concept": "La pregunta no es solo “¿la firma verifica?”, sino “¿este token, de este issuer, para este audience y propósito, es aceptable ahora?”.",
    "diagram": [],
    "rules": [
      "No selecciones ciegamente el algoritmo a partir del token; configura una allowlist por deployment/perfil.",
      "Valida iss, aud, exp/nbf y claims requeridos según el protocolo, con tolerancias temporales explícitas.",
      "Separa access tokens, ID tokens y otros JWT por issuer/audience/type para prevenir cross-JWT confusion."
    ],
    "deep": {
      "sections": [
        {
          "title": "JWT no es cifrado",
          "body": "Las partes de un JWS compact suelen ser decodificables; no pongas secretos pensando que Base64url los oculta. Si necesitas confidencialidad, usa un mecanismo diseñado para ello."
        },
        {
          "title": "Algorithm confusion",
          "body": "El verificador debe conocer qué algoritmos/keys son válidos. Aceptar lo que el header solicite sin política firme puede abrir sustituciones."
        },
        {
          "title": "Claims semánticos",
          "body": "Una firma correcta solo autentica el token respecto a una clave. Issuer/audience y contexto determinan si esa declaración aplica a tu servicio."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un JWT firma correctamente pero aud=service-B y llega a service-A. ¿Debe aceptarse solo porque la firma es válida?",
      "steps": [
        [
          "Paso 1",
          "La firma prueba autenticidad respecto a la clave."
        ],
        [
          "Paso 2",
          "aud expresa para qué receptor se emitió según el perfil."
        ],
        [
          "Paso 3",
          "service-A debe rechazar si su política exige audience propio."
        ]
      ],
      "answer": "No: valida audience y demás claims de contexto además de la firma."
    },
    "check": {
      "question": "¿Base64url del JWT cifra los claims?",
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
          "Solo con RS256",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Encoding no es cifrado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debe fijarse una lista de algoritmos JWT permitidos?",
        "answer": "si",
        "hint": "La política no debe delegarse ciegamente al token."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una firma válida basta sin validar aud/iss/exp?",
        "answer": "no",
        "hint": "Falta semántica del contexto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿ID token y access token son intercambiables por ser ambos JWT?",
        "answer": "no",
        "hint": "Tienen propósitos/perfiles distintos."
      }
    ]
  },
  "web-oauth": {
    "id": "web-oauth",
    "courseId": 24,
    "title": "OAuth 2.0 moderno, PKCE y fronteras de autorización",
    "shortTitle": "Delegar acceso no es autenticar por casualidad",
    "duration": 125,
    "objective": "razonar sobre OAuth 2.0 con authorization server, client y resource server, usando Authorization Code + PKCE, redirect URIs exactas y state/nonce según el protocolo.",
    "summary": [
      "OAuth 2.0 delega autorización de acceso a recursos; no define por sí solo identidad de usuario como lo hace un protocolo de autenticación construido encima, como OpenID Connect.",
      "RFC 9700 recoge Best Current Practice: evita flows obsoletos/inseguros, usa Authorization Code con PKCE y protege redirect URI, tokens y mix-up/CSRF según el escenario.",
      "PKCE vincula el authorization code a un secreto efímero del cliente; state y otros bindings protegen propiedades distintas y no deben colapsarse en “un parámetro de seguridad”."
    ],
    "concept": "OAuth es una coreografía entre actores y credenciales. La seguridad depende de vincular correctamente request, redirect, code, client, issuer y resource.",
    "diagram": [],
    "rules": [
      "Usa Authorization Code + PKCE para clientes modernos donde aplique; evita implicit grant como patrón nuevo.",
      "Registra/compara redirect URIs con reglas estrictas y no permitas redirects abiertos como destino de códigos/tokens.",
      "El resource server valida issuer, audience/scope y formato/perfil de access token; no confía en que “viene del frontend”."
    ],
    "deep": {
      "sections": [
        {
          "title": "Actores",
          "body": "Resource owner, client, authorization server y resource server tienen responsabilidades distintas. Un client puede ser público o confidencial según capacidad de custodiar secretos."
        },
        {
          "title": "PKCE",
          "body": "El cliente envía challenge en la autorización y verifier al canjear el code. Un code interceptado sin el verifier no debería poder canjearse bajo el modelo."
        },
        {
          "title": "BCP moderna",
          "body": "RFC 9700 actualiza prácticas: depreca patrones inseguros y recomienda defensas contra mix-up, redirect URI attacks, token leakage y otros problemas observados en despliegues reales."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una SPA usa Authorization Code + PKCE. Un atacante intercepta solo el authorization code pero no conoce code_verifier. ¿Qué propiedad aporta PKCE?",
      "steps": [
        [
          "Paso 1",
          "El code quedó vinculado al challenge enviado al iniciar el flujo."
        ],
        [
          "Paso 2",
          "El token endpoint exige el verifier correspondiente."
        ],
        [
          "Paso 3",
          "El code aislado no basta bajo el modelo correcto."
        ]
      ],
      "answer": "PKCE vincula el code al cliente que conserva el verifier efímero."
    },
    "check": {
      "question": "¿OAuth 2.0 por sí solo define autenticación de usuario final equivalente a OpenID Connect?",
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
          "Solo con JWT",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "OAuth es un framework de autorización; OIDC añade autenticación/identidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿PKCE protege el canje de un code interceptado?",
        "answer": "si",
        "hint": "Lo vincula a un verifier."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Conviene permitir redirect_uri con coincidencia “empieza por” muy amplia?",
        "answer": "no",
        "hint": "Los redirects deben estar fuertemente controlados."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El resource server debe validar audience/scope del access token?",
        "answer": "si",
        "hint": "La autorización final vive en el recurso."
      }
    ]
  },
  "web-security-labs": {
    "id": "web-security-labs",
    "courseId": 24,
    "title": "Laboratorio defensivo de seguridad web",
    "shortTitle": "Romper solo lo que está diseñado para romperse",
    "duration": 120,
    "objective": "aplicar una metodología de testing segura y reproducible en laboratorios autorizados, documentando hipótesis, evidencia, impacto y corrección sin atacar sistemas reales.",
    "summary": [
      "La práctica debe realizarse en targets deliberadamente vulnerables o explícitamente autorizados, con datos y cuentas de laboratorio.",
      "PortSwigger Web Security Academy, OWASP/Natas/PicoCTF/OverTheWire pueden servir como entornos formativos según el tema y sus reglas; cada reto debe conectarse con una mitigación verificable.",
      "Un buen informe reproduce la condición de fallo con mínimo impacto y demuestra después que la corrección bloquea la clase de problema sin romper funcionalidad legítima."
    ],
    "concept": "La habilidad experta no es memorizar payloads, sino formular una hipótesis sobre una trust boundary, diseñar una prueba mínima, interpretar evidencia y cerrar el ciclo con una defensa.",
    "diagram": [],
    "rules": [
      "Practica solo contra laboratorios propios, CTFs o sistemas para los que exista autorización explícita y alcance definido.",
      "Empieza con pruebas de lectura/observación y minimiza efectos; evita datos reales y acciones destructivas.",
      "Documenta causa raíz, no solo el síntoma, y añade regression tests defensivos cuando sea posible."
    ],
    "deep": {
      "sections": [
        {
          "title": "Metodología",
          "body": "Mapea endpoint→entrada→transformaciones→sink/objeto→control esperado. Formula qué debería ocurrir y qué evidencia demostraría una violación sin ampliar el impacto."
        },
        {
          "title": "Entornos",
          "body": "PortSwigger Academy ofrece laboratorios web controlados; Natas, PicoCTF y otros wargames/CTF están diseñados para aprendizaje bajo sus reglas. Verifica siempre scope y términos del entorno."
        },
        {
          "title": "Cierre del ciclo",
          "body": "Tras corregir, repite el test original y añade casos negativos/positivos. Un fix que solo bloquea un string concreto no corrige una clase de vulnerabilidad."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Encuentras un posible IDOR en un laboratorio autorizado. ¿Cuál es la siguiente acción de ingeniería más útil?",
      "steps": [
        [
          "Paso 1",
          "Confirma con dos objetos/cuentas de prueba y mínimo acceso necesario."
        ],
        [
          "Paso 2",
          "Identifica qué check de autorización falta y dónde debe vivir."
        ],
        [
          "Paso 3",
          "Añade una corrección y un regression test que verifique acceso permitido y denegado."
        ]
      ],
      "answer": "Demuestra la causa con mínimo impacto y verifica una corrección general, no colecciones payloads."
    },
    "check": {
      "question": "¿Es apropiado reutilizar estas pruebas contra un sistema ajeno sin permiso porque “solo es para aprender”?",
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
          "Solo si no cambias datos",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "La autorización y el alcance son parte del laboratorio."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un CTF/lab autorizado es el lugar adecuado para practicar técnicas ofensivas?",
        "answer": "si",
        "hint": "Está diseñado para ello bajo sus reglas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un informe debe explicar causa raíz y mitigación?",
        "answer": "si",
        "hint": "La evidencia aislada no completa el aprendizaje."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Bloquear un payload literal demuestra que corregiste toda la vulnerabilidad?",
        "answer": "no",
        "hint": "Hay que corregir la clase de fallo."
      }
    ]
  }
});
