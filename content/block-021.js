/**
 * BLOQUE 021 — Protocolos de aplicación
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar semántica de aplicación, framing, transporte,
 * estado e intermediación. Compartir TCP/UDP/QUIC no convierte a DNS, HTTP,
 * SMTP, SSH o WebSocket en variantes del mismo protocolo.
 */

window.LEARNING_PATHS[21] = {
  "level": "Experto progresivo",
  "estimatedHours": 74,
  "description": "Protocolos de aplicación desde DNS y semántica HTTP hasta correo, SSH, WebSocket y construcción de parsers robustos.",
  "outcomes": [
    "Resolver y diagnosticar DNS distinguiendo namespace, autoridad, caché, wire format y transporte.",
    "Analizar HTTP/1.1, HTTP/2 y HTTP/3 separando semántica, framing, multiplexación, caching y estado.",
    "Distinguir proxies, correo, FTP/SSH y WebSocket por sus contratos, transportes y fronteras de confianza.",
    "Construir implementaciones educativas de DNS/HTTP y analizadores de paquetes con parsers acotados, pruebas y observabilidad."
  ],
  "modules": [
    {
      "id": "m1-dns",
      "title": "DNS",
      "description": "Namespace, resolución, caché, wire format y transportes.",
      "lessons": [
        "app-dns-hierarchy",
        "app-dns-wire-transport"
      ]
    },
    {
      "id": "m2-http-core",
      "title": "HTTP y versiones",
      "description": "Semántica común y mappings HTTP/1.1, HTTP/2 y HTTP/3.",
      "lessons": [
        "app-http-semantics-urls",
        "app-http1",
        "app-http2",
        "app-http3"
      ]
    },
    {
      "id": "m3-state-intermediaries",
      "title": "Estado, caché e intermediarios",
      "description": "Fields, caché, cookies, sesiones y proxies.",
      "lessons": [
        "app-http-cache-fields",
        "app-cookies-sessions",
        "app-proxies"
      ]
    },
    {
      "id": "m4-other-protocols",
      "title": "Correo, acceso remoto y tiempo real",
      "description": "SMTP/IMAP, FTP/SSH y WebSocket.",
      "lessons": [
        "app-mail",
        "app-ftp-ssh",
        "app-websocket"
      ]
    },
    {
      "id": "m5-projects",
      "title": "Laboratorio de protocolos",
      "description": "Implementaciones educativas y análisis por capas.",
      "lessons": [
        "app-protocol-projects"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "app-dns-hierarchy": {
    "id": "app-dns-hierarchy",
    "courseId": 21,
    "title": "DNS: namespace, zonas, autoridad y caché",
    "shortTitle": "DNS no es una agenda gigante",
    "duration": 115,
    "objective": "explicar el namespace DNS, delegación, autoridad, resource records, resolvers recursivos y TTL sin confundir nombre, zona y servidor.",
    "summary": [
      "DNS es una base de datos distribuida jerárquica: el namespace se divide mediante delegaciones, no mediante una tabla central descargada por todos.",
      "Una zona es una porción administrativa del namespace servida autoritativamente; no es sinónimo de dominio ni de servidor DNS.",
      "Resolvers recursivos pueden cachear respuestas y negativas durante tiempos acotados por las reglas DNS; el TTL limita reutilización, no garantiza propagación instantánea mundial."
    ],
    "concept": "Resolver un nombre es recorrer delegaciones y conjuntos de resource records bajo políticas de caché. El nombre pertenece al árbol; la zona define autoridad; el servidor es una máquina/proceso que puede servir muchas zonas.",
    "diagram": [],
    "rules": [
      "No confundas dominio con zona: una delegación puede cortar un subárbol administrativo.",
      "No interpretes TTL como “el cambio aparecerá exactamente cuando llegue a cero en todo Internet”.",
      "Un registro CNAME no contiene una dirección IP: apunta a otro nombre."
    ],
    "deep": {
      "sections": [
        {
          "title": "Árbol y delegación",
          "body": "La raíz delega TLD, éstos pueden delegar dominios y así sucesivamente. Un resolver iterativo sigue referrals; un resolver recursivo realiza ese trabajo en nombre del cliente y puede cachear resultados."
        },
        {
          "title": "Resource Record Sets",
          "body": "DNS devuelve RRsets: registros del mismo owner name, type y class se tratan como conjunto. A/AAAA son direcciones, MX orienta entrega de correo, NS delega/declara servidores y CNAME introduce alias con reglas específicas."
        },
        {
          "title": "TTL y negative caching",
          "body": "TTL controla cuánto puede reutilizarse información cacheada. NXDOMAIN y otros resultados negativos también pueden cachearse bajo reglas específicas; por ello cambiar una zona no invalida mágicamente todas las cachés existentes."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un resolver necesita www.ejemplo.test y no tiene caché. ¿Qué idea sigue?",
      "steps": [
        [
          "Paso 1",
          "Consulta una raíz para conocer la delegación del TLD."
        ],
        [
          "Paso 2",
          "Sigue referrals hacia servidores autoritativos de niveles inferiores."
        ],
        [
          "Paso 3",
          "Obtiene el RRset final y lo cachea dentro de su TTL."
        ]
      ],
      "answer": "Sigue la cadena de delegaciones; no existe una consulta a una “base DNS central”."
    },
    "check": {
      "question": "¿Zona DNS y dominio son siempre exactamente lo mismo?",
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
          "Solo en IPv6",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Una zona es una frontera administrativa/autoritativa dentro del namespace."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un CNAME contiene directamente una IPv4? sí/no",
        "answer": "no",
        "hint": "Es un alias hacia otro nombre."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un resolver recursivo puede cachear respuestas? sí/no",
        "answer": "si",
        "hint": "La caché es parte esencial del modelo operativo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿TTL=300 garantiza que todos verán un cambio exactamente a los 300 s? sí/no",
        "answer": "no",
        "hint": "Las cachés no empiezan su temporizador simultáneamente y existen más capas de estado."
      }
    ]
  },
  "app-dns-wire-transport": {
    "id": "app-dns-wire-transport",
    "courseId": 21,
    "title": "DNS en el wire: mensajes, UDP/TCP, EDNS y privacidad",
    "shortTitle": "DNS tampoco es “UDP puerto 53”",
    "duration": 115,
    "objective": "razonar sobre mensajes DNS, transaction IDs, truncación, EDNS y transportes UDP/TCP/TLS/QUIC sin reducir DNS a un único transporte.",
    "summary": [
      "DNS clásico usa un formato de mensaje común sobre UDP o TCP; TCP es obligatorio para implementaciones conformes modernas en escenarios definidos y no es solo “fallback para zone transfer”.",
      "EDNS amplía capacidades del protocolo, incluido el tamaño UDP anunciado, sin cambiar el header DNS base por una versión completamente nueva.",
      "DoT y DoQ protegen el tramo DNS sobre transportes cifrados concretos; cifrar la consulta al resolver no convierte automáticamente todo el sistema DNS extremo a extremo en confidencial."
    ],
    "concept": "El protocolo DNS tiene semántica y formato propios; el transporte es otra decisión. UDP reduce estado, TCP aporta stream fiable, EDNS negocia extensiones y mecanismos cifrados protegen enlaces específicos.",
    "diagram": [],
    "rules": [
      "No fijes “DNS máximo=512 bytes” como regla moderna: EDNS amplió ese límite operativo UDP.",
      "No asumas que TC=1 significa error definitivo: normalmente indica que la respuesta fue truncada y puede requerir otro transporte.",
      "DoT/DoQ no autentican el contenido autoritativo por sí solos frente a todos los actores; DNSSEC resuelve otro problema."
    ],
    "deep": {
      "sections": [
        {
          "title": "Mensaje DNS",
          "body": "Header, question, answer, authority y additional forman el mensaje clásico. Los nombres pueden comprimirse mediante pointers; parsearlos exige límites estrictos para evitar ciclos y lecturas fuera de buffer."
        },
        {
          "title": "UDP y TCP",
          "body": "RFC 1035 define ambos; RFC 7766 refuerza soporte TCP. Sobre TCP, cada mensaje DNS se enmarca con longitud de dos octetos: el stream no conserva mensajes por sí mismo."
        },
        {
          "title": "EDNS y transportes cifrados",
          "body": "EDNS(0) usa un pseudo-RR OPT para anunciar extensiones y tamaños. DoT usa TLS; DoQ mapea DNS sobre QUIC. Elegir transporte afecta privacidad, latencia y comportamiento de conexiones, no la jerarquía del namespace."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una respuesta UDP llega con TC=1. ¿Qué debe concluir el resolver?",
      "steps": [
        [
          "Paso 1",
          "La respuesta está truncada."
        ],
        [
          "Paso 2",
          "No debe asumir que el nombre no existe."
        ],
        [
          "Paso 3",
          "Puede reintentar por un transporte que admita la respuesta completa, típicamente TCP según el caso."
        ]
      ],
      "answer": "TC indica truncación, no NXDOMAIN."
    },
    "check": {
      "question": "¿DNS está definido exclusivamente sobre UDP?",
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
          "Solo desde HTTP/3",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "DNS clásico contempla UDP y TCP; existen además transportes cifrados posteriores."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿EDNS puede anunciar un tamaño UDP mayor que el límite DNS clásico de 512 bytes? sí/no",
        "answer": "si",
        "hint": "Ese fue uno de sus objetivos prácticos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿TC=1 significa NXDOMAIN? sí/no",
        "answer": "no",
        "hint": "Es el bit de truncación."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿DNS sobre TCP necesita framing porque TCP es byte stream? sí/no",
        "answer": "si",
        "hint": "RFC 1035 usa un prefijo de longitud para cada mensaje."
      }
    ]
  },
  "app-http-semantics-urls": {
    "id": "app-http-semantics-urls",
    "courseId": 21,
    "title": "HTTP: semántica, URI, métodos y status",
    "shortTitle": "HTTP no es “pedir páginas”",
    "duration": 120,
    "objective": "explicar semántica HTTP independiente de versión, componentes de URI, métodos, status y representación sin confundir recurso con bytes almacenados.",
    "summary": [
      "HTTP define una interfaz uniforme de mensajes request/response y semántica de métodos, status y fields compartida por sus versiones modernas.",
      "Una URI identifica un recurso; la representación transferida es una vista del estado del recurso, no el recurso metafísico mismo.",
      "Propiedades como safe e idempotent describen semántica esperada del método y son cruciales para retries, cachés e intermediarios."
    ],
    "concept": "HTTP/1.1, HTTP/2 y HTTP/3 cambian el wire mapping y transporte, pero comparten la semántica definida por HTTP Semantics. Separar semántica de framing evita reaprender GET tres veces.",
    "diagram": [],
    "rules": [
      "No concluyas que POST “crea” y PUT “actualiza” universalmente: la semántica depende del recurso y del método normativo.",
      "Idempotent no significa “la respuesta siempre será idéntica”.",
      "URL/URI no implica automáticamente DNS: el scheme determina cómo interpretar el identificador."
    ],
    "deep": {
      "sections": [
        {
          "title": "Recursos y representaciones",
          "body": "Un recurso es la entidad conceptual identificada; una representación incluye metadata y representation data. Content negotiation puede producir representaciones distintas del mismo recurso."
        },
        {
          "title": "Métodos",
          "body": "GET y HEAD son safe; PUT y DELETE son idempotent según semántica estándar aunque sus efectos observables secundarios puedan variar. POST no es idempotent por definición general."
        },
        {
          "title": "Status codes",
          "body": "Los códigos pertenecen a clases 1xx–5xx, pero la aplicación debe interpretar el código concreto. 404 no significa necesariamente “nunca existió”; 503 puede ser temporal; 304 participa en validación de caché y no lleva una representación normal completa."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un cliente repite PUT tras perder la respuesta de red. ¿Por qué la idempotencia importa?",
      "steps": [
        [
          "Paso 1",
          "El mismo request repetido debería tener el mismo efecto previsto que una sola aplicación."
        ],
        [
          "Paso 2",
          "Eso permite retries más seguros a nivel semántico."
        ],
        [
          "Paso 3",
          "No garantiza que logs, timestamps u otros efectos secundarios sean idénticos."
        ]
      ],
      "answer": "Idempotencia habla del efecto pretendido sobre el recurso, no de congelar el universo."
    },
    "check": {
      "question": "¿Idempotent significa que dos respuestas deben ser byte a byte iguales?",
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
          "Solo con TLS",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "La propiedad se refiere al efecto semántico pretendido de repetir la petición."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿GET es un método safe según HTTP Semantics? sí/no",
        "answer": "si",
        "hint": "Safe significa intención de solo lectura semántica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿POST es universalmente idempotent? sí/no",
        "answer": "no",
        "hint": "No tiene esa propiedad general."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿HTTP/3 redefine desde cero la semántica de GET y status 404? sí/no",
        "answer": "no",
        "hint": "Mapea la misma semántica HTTP sobre QUIC."
      }
    ]
  },
  "app-http1": {
    "id": "app-http1",
    "courseId": 21,
    "title": "HTTP/1.1: mensajes textuales, framing y conexiones",
    "shortTitle": "El Content-Length que puede arruinarte el viernes",
    "duration": 125,
    "objective": "analizar framing HTTP/1.1, Content-Length, Transfer-Encoding, conexiones persistentes y riesgos de parsing diferencial.",
    "summary": [
      "HTTP/1.1 serializa mensajes mediante start-line, fields y content según reglas de framing precisas; TCP no aporta fronteras de mensaje.",
      "Content-Length y Transfer-Encoding no son adornos: determinan dónde termina un mensaje y parsing ambiguo entre intermediarios puede ser una vulnerabilidad.",
      "Conexiones persistentes permiten reutilizar TCP, pero requests/responses siguen necesitando framing correcto y manejo de cierre."
    ],
    "concept": "HTTP/1.1 está montado sobre un byte stream: el parser debe determinar exactamente dónde termina cada mensaje. Dos componentes que discrepan sobre esa frontera pueden interpretar secuencias distintas sobre los mismos bytes.",
    "diagram": [],
    "rules": [
      "No uses “leer hasta que no haya más bytes disponibles” como framing de un mensaje persistente.",
      "No aceptes simultáneamente señales de longitud contradictorias sin aplicar estrictamente las reglas normativas.",
      "Host y authority son parte crítica del routing HTTP/1.1; no los trates como comentario opcional."
    ],
    "deep": {
      "sections": [
        {
          "title": "Message framing",
          "body": "Start-line y fields terminan con sintaxis definida; el content puede tener longitud conocida, coding chunked u otras reglas normativas. El cierre de conexión participa en algunos casos, pero impide reutilización."
        },
        {
          "title": "Persistencia y pipelining",
          "body": "HTTP/1.1 hace persistentes las conexiones por defecto salvo señal contraria. Pipelining existe en el protocolo, aunque despliegue y head-of-line a nivel de respuestas limitaron su atractivo práctico."
        },
        {
          "title": "Parsing diferencial",
          "body": "Si un frontend y backend no coinciden sobre Content-Length/Transfer-Encoding, los bytes de una request pueden convertirse en el inicio de otra para uno de ellos. Esta clase de error de frontera está detrás de request smuggling."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una conexión persistente recibe Content-Length: 5 y luego cinco bytes de body. ¿Dónde comienza el siguiente mensaje?",
      "steps": [
        [
          "Paso 1",
          "El parser consume exactamente 5 bytes de content."
        ],
        [
          "Paso 2",
          "El byte siguiente pertenece al framing de lo que venga después."
        ],
        [
          "Paso 3",
          "No debe esperar a FIN para decidir el final de ese body."
        ]
      ],
      "answer": "Content-Length proporciona una frontera explícita para ese contenido."
    },
    "check": {
      "question": "¿TCP entrega a HTTP/1.1 una request completa por cada read()?",
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
          "Solo con keep-alive",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "HTTP/1.1 debe parsear framing sobre un stream de bytes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Content-Length participa en framing de mensajes HTTP/1.1? sí/no",
        "answer": "si",
        "hint": "Determina longitud del content cuando aplica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una conexión persistente obliga a usar una conexión TCP nueva por request? sí/no",
        "answer": "no",
        "hint": "Puede reutilizarse."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Dos parsers que discrepan sobre fronteras pueden crear riesgos de request smuggling? sí/no",
        "answer": "si",
        "hint": "El parsing diferencial es el núcleo del problema."
      }
    ]
  },
  "app-http2": {
    "id": "app-http2",
    "courseId": 21,
    "title": "HTTP/2: frames, streams y HPACK",
    "shortTitle": "Multiplexar sin multiplicar TCP",
    "duration": 125,
    "objective": "explicar frames y streams HTTP/2, multiplexación, HPACK, flow control y el head-of-line que permanece en TCP.",
    "summary": [
      "HTTP/2 mapea la semántica HTTP a frames binarios multiplexados en streams dentro de una conexión, sin convertir cada stream en una conexión TCP.",
      "HPACK comprime fields usando tablas y representaciones específicas; no es compresión arbitraria del body.",
      "La multiplexación elimina el ordering de respuestas de HTTP/1.1 entre requests, pero todos los streams comparten el mismo TCP y pueden sufrir head-of-line por pérdida a nivel de transporte."
    ],
    "concept": "HTTP/2 separa stream lógico de frame físico: frames de distintos streams pueden intercalarse. El receptor reconstruye estado por stream mientras TCP garantiza el orden de bytes de la conexión completa.",
    "diagram": [],
    "rules": [
      "No llames “paquete HTTP/2” a cualquier frame como si sustituyera a IP/TCP.",
      "No asumas que HTTP/2 elimina todo HOL: TCP sigue siendo un byte stream ordenado.",
      "Flow control HTTP/2 por stream/conexión no sustituye congestion control TCP."
    ],
    "deep": {
      "sections": [
        {
          "title": "Frames y streams",
          "body": "Cada frame lleva type, flags, length y stream identifier según su formato. HEADERS, DATA y otros frames cooperan para representar requests/responses; stream 0 tiene funciones de conexión y no transporta mensajes normales."
        },
        {
          "title": "HPACK",
          "body": "Las tablas dinámicas/estáticas reducen repetición de fields. El estado compartido exige límites y manejo correcto; comprimir headers no equivale a gzip del contenido de aplicación."
        },
        {
          "title": "Dos controles distintos",
          "body": "HTTP/2 tiene flow control de DATA a nivel aplicación/protocolo, mientras TCP mantiene su propio receive window y congestion control. Una capa no reemplaza a la otra."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Stream 1 pierde bytes TCP que preceden a datos ya recibidos del stream 3. ¿Puede TCP entregar a HTTP/2 esos bytes posteriores fuera de orden?",
      "steps": [
        [
          "Paso 1",
          "TCP mantiene un byte stream ordenado."
        ],
        [
          "Paso 2",
          "La pérdida bloquea entrega posterior de esa conexión hasta recuperación."
        ],
        [
          "Paso 3",
          "Por tanto HTTP/2 puede sufrir HOL entre streams debido al transporte."
        ]
      ],
      "answer": "La multiplexación HTTP/2 no elimina el HOL de TCP."
    },
    "check": {
      "question": "¿Cada stream HTTP/2 requiere su propia conexión TCP?",
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
          "Solo GET",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Muchos streams se multiplexan en una conexión."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿HPACK comprime principalmente fields HTTP? sí/no",
        "answer": "si",
        "hint": "Es compresión de header fields."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿HTTP/2 flow control sustituye cwnd de TCP? sí/no",
        "answer": "no",
        "hint": "Son controles de capas y objetivos distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una pérdida TCP puede bloquear temporalmente varios streams HTTP/2? sí/no",
        "answer": "si",
        "hint": "Comparten un único byte stream TCP ordenado."
      }
    ]
  },
  "app-http3": {
    "id": "app-http3",
    "courseId": 21,
    "title": "HTTP/3: HTTP sobre QUIC, streams y QPACK",
    "shortTitle": "Misma semántica, transporte distinto",
    "duration": 125,
    "objective": "explicar el mapping HTTP/3 sobre QUIC, streams, QPACK y por qué reduce HOL entre streams sin prometer ausencia de efectos por pérdida.",
    "summary": [
      "HTTP/3 conserva la semántica HTTP y la mapea sobre QUIC en lugar de TCP.",
      "Requests/responses usan streams QUIC; pérdida en un stream no impone el ordering de bytes de una conexión TCP a los demás streams independientes.",
      "QPACK comprime fields adaptándose al modelo de streams QUIC y debe gestionar dependencias de tabla sin reintroducir bloqueos innecesarios."
    ],
    "concept": "HTTP/3 no es “HTTP/2 cambiando TCP por UDP” en una búsqueda y reemplazo: QUIC integra seguridad y transporte multiplexado, y HTTP/3 define su propio framing/stream usage sobre esa base.",
    "diagram": [],
    "rules": [
      "No digas que HTTP/3 “no tiene head-of-line blocking”: reduce el HOL de transporte entre streams, pero un stream conserva su propio orden y existen dependencias/protocol blocking.",
      "No confundas packet number QUIC con stream ID HTTP/3.",
      "UDP es el sustrato de QUIC, no la semántica de HTTP/3."
    ],
    "deep": {
      "sections": [
        {
          "title": "Streams QUIC",
          "body": "Cada request suele asociarse a un stream bidireccional; control streams llevan settings y otra información de conexión. La independencia de streams cambia la recuperación respecto a HTTP/2 sobre TCP."
        },
        {
          "title": "QPACK",
          "body": "QPACK deriva del problema de comprimir fields en un transporte multiplexado donde asumir un único orden global generaría bloqueos. Usa streams/control y referencias a tablas con reglas específicas."
        },
        {
          "title": "Semántica compartida",
          "body": "GET, status, cache directives y representaciones siguen viniendo de HTTP Semantics. Cambia cómo se transportan mensajes, no el significado fundamental de los métodos."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Se pierde un paquete con datos del stream A y B ya tiene todos sus bytes. ¿Debe QUIC bloquear la entrega de B por el orden de A?",
      "steps": [
        [
          "Paso 1",
          "QUIC mantiene orden por stream."
        ],
        [
          "Paso 2",
          "B puede avanzar si sus propios datos/dependencias están disponibles."
        ],
        [
          "Paso 3",
          "La pérdida sí puede afectar congestion control compartido, pero no impone el byte-order de A a B."
        ]
      ],
      "answer": "HTTP/3 reduce el HOL de transporte entre streams independientes."
    },
    "check": {
      "question": "¿HTTP/3 redefine GET con una semántica distinta a HTTP/1.1?",
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
          "Solo con QPACK",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Comparte la semántica HTTP; cambia el mapping sobre QUIC."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿HTTP/3 usa QUIC como transporte? sí/no",
        "answer": "si",
        "hint": "RFC 9114 mapea HTTP sobre QUIC."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿QPACK es compresión general del body? sí/no",
        "answer": "no",
        "hint": "Comprime fields HTTP."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La pérdida de un stream obliga por ordering a bloquear todos los otros streams QUIC? sí/no",
        "answer": "no",
        "hint": "El ordering fiable es por stream."
      }
    ]
  },
  "app-http-cache-fields": {
    "id": "app-http-cache-fields",
    "courseId": 21,
    "title": "HTTP fields, caché, validadores y freshness",
    "shortTitle": "Cache-Control no es decoración",
    "duration": 120,
    "objective": "razonar sobre fields HTTP, freshness, validators, conditional requests y caches compartidas/privadas sin confundir cache hit con dato eternamente válido.",
    "summary": [
      "Una caché HTTP decide almacenabilidad, freshness y reutilización según semántica de método/status/fields y contexto; no todo response es cacheable.",
      "ETag y Last-Modified son validadores; permiten revalidación condicional y no son equivalentes a “checksum criptográfico obligatorio del body”.",
      "Vary amplía la cache key según request fields relevantes; ignorarlo puede servir la representación incorrecta."
    ],
    "concept": "Una caché correcta es una máquina de decisiones: ¿puedo almacenar?, ¿sigue fresco?, ¿qué request corresponde a esta variante?, ¿puedo revalidar? “Guardar GET durante 5 minutos” es solo el dibujo infantil.",
    "diagram": [],
    "rules": [
      "No uses ETag como autenticador criptográfico por defecto.",
      "No confundas no-cache con “no almacenar”: normalmente exige revalidación antes de reutilizar.",
      "No ignores Vary cuando la respuesta depende, por ejemplo, de Accept-Encoding."
    ],
    "deep": {
      "sections": [
        {
          "title": "Freshness",
          "body": "Cache-Control y otros metadatos determinan freshness lifetime y restricciones. Una respuesta stale puede requerir revalidación o admitirse bajo directivas específicas."
        },
        {
          "title": "Validators",
          "body": "If-None-Match con ETag o condiciones basadas en fechas permiten preguntar si una representación cambió. 304 Not Modified evita retransmitir representación completa cuando procede."
        },
        {
          "title": "Shared vs private",
          "body": "Caches compartidas (proxy/CDN) y privadas (browser) tienen restricciones diferentes, especialmente con autenticación, cookies y directivas private/public/s-maxage."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una respuesta stale tiene ETag \"abc\". ¿Cómo puede revalidarse eficientemente?",
      "steps": [
        [
          "Paso 1",
          "El cliente/cache envía If-None-Match: \"abc\"."
        ],
        [
          "Paso 2",
          "Si el recurso no cambió, el servidor puede responder 304."
        ],
        [
          "Paso 3",
          "Se actualiza metadata sin transferir de nuevo la representación completa."
        ]
      ],
      "answer": "La validación condicional separa “está fresco” de “ha cambiado”."
    },
    "check": {
      "question": "¿Cache-Control: no-cache significa universalmente “prohibido almacenar”?",
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
      "failure": "Su semántica principal exige validación antes de reutilizar, no prohibición universal de storage."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿ETag puede usarse como validator HTTP? sí/no",
        "answer": "si",
        "hint": "Ese es uno de sus usos principales."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿304 normalmente retransmite una representación completa como un 200 normal? sí/no",
        "answer": "no",
        "hint": "Indica que puede reutilizarse la representación almacenada."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Vary puede hacer que dos requests a la misma URI correspondan a variantes de caché distintas? sí/no",
        "answer": "si",
        "hint": "Amplía los campos de selección relevantes."
      }
    ]
  },
  "app-cookies-sessions": {
    "id": "app-cookies-sessions",
    "courseId": 21,
    "title": "Cookies, sesiones y estado sobre HTTP",
    "shortTitle": "HTTP es stateless; tu login no",
    "duration": 125,
    "objective": "explicar cookies, atributos de seguridad, sesiones server-side/tokens y separación entre estado HTTP, navegador y autenticación.",
    "summary": [
      "HTTP es stateless a nivel de protocolo de aplicación, pero cookies permiten al user agent almacenar pares name/value y reenviarlos bajo reglas de scope/atributos.",
      "Una cookie de sesión puede contener un identificador opaco que referencia estado server-side; cookie y sesión no son sinónimos.",
      "Secure, HttpOnly y SameSite mitigan clases distintas de riesgo y ninguno sustituye autenticación, autorización o protección CSRF completa por sí solo."
    ],
    "concept": "El estado se construye encima de HTTP. El browser decide cuándo enviar cookies según domain/path/scheme/site y otros atributos; el servidor decide qué significado dar a sus valores.",
    "diagram": [],
    "rules": [
      "No guardes secretos sensibles en una cookie pensando que “el navegador la oculta”; cookies viajan al servidor según scope y pueden ser visibles al cliente salvo protecciones específicas.",
      "HttpOnly mitiga acceso desde script, no evita que el browser envíe la cookie.",
      "SameSite no convierte cualquier endpoint state-changing en seguro por arte de magia."
    ],
    "deep": {
      "sections": [
        {
          "title": "Cookie vs sesión",
          "body": "Set-Cookie crea/actualiza estado en el user agent. Ese valor puede ser el estado mismo o, más comúnmente, una key de sesión. El servidor puede invalidar una sesión aunque la cookie física siga presente."
        },
        {
          "title": "Atributos",
          "body": "Secure restringe envío a contextos seguros aplicables; HttpOnly limita acceso desde APIs de script; SameSite influye envío cross-site. Domain/Path delimitan scope pero no deben tratarse como frontera de autorización robusta."
        },
        {
          "title": "Tokens",
          "body": "Un token firmado/autocontenido cambia dónde vive parte del estado, pero revocación, expiración, audience y rotación siguen siendo problemas de diseño. “JWT” no equivale automáticamente a “sesión sin servidor y segura”."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "La cookie contiene session_id=abc y el servidor borra la sesión abc. ¿La cookie todavía autentica?",
      "steps": [
        [
          "Paso 1",
          "El browser puede seguir almacenando y enviando abc."
        ],
        [
          "Paso 2",
          "El servidor ya no encuentra/acepta ese estado."
        ],
        [
          "Paso 3",
          "La autenticación debe fallar aunque la cookie exista."
        ]
      ],
      "answer": "La cookie transporta un identificador; la validez de sesión la decide el sistema que lo interpreta."
    },
    "check": {
      "question": "¿Cookie y sesión son necesariamente la misma cosa?",
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
      "failure": "Una cookie puede referenciar estado de sesión o transportar otros datos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿HttpOnly impide normalmente que JavaScript lea esa cookie mediante document.cookie? sí/no",
        "answer": "si",
        "hint": "Ese es su objetivo principal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Secure cifra por sí mismo el valor almacenado de una cookie? sí/no",
        "answer": "no",
        "hint": "Restringe el contexto de envío; TLS protege el transporte."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El servidor puede invalidar una sesión aunque la cookie siga en el navegador? sí/no",
        "answer": "si",
        "hint": "La validez semántica pertenece al servidor/sistema de sesión."
      }
    ]
  },
  "app-proxies": {
    "id": "app-proxies",
    "courseId": 21,
    "title": "Forward proxy, reverse proxy, gateways y confianza",
    "shortTitle": "El intermediario importa",
    "duration": 115,
    "objective": "distinguir forward proxy, reverse proxy/gateway, CONNECT, forwarding de metadata y fronteras de confianza.",
    "summary": [
      "Un forward proxy actúa en nombre del cliente hacia servidores; un reverse proxy/gateway se sitúa delante de servidores y actúa hacia clientes.",
      "Los intermediarios pueden terminar conexiones, transformar mensajes, cachear, autenticar o balancear según diseño; no existe una única topología “proxy”.",
      "Fields que transportan identidad/origen del cliente solo son confiables cuando existe una frontera de proxies de confianza que los sanea y establece."
    ],
    "concept": "HTTP permite intermediación explícita. La pregunta importante no es solo “hay un proxy”, sino quién lo controla, qué conexión termina, qué headers reescribe y qué peer real observa cada salto.",
    "diagram": [],
    "rules": [
      "No confíes en X-Forwarded-For recibido directamente de Internet como identidad autenticada.",
      "No confundas reverse proxy con NAT: trabajan en capas/semánticas distintas.",
      "CONNECT establece un túnel HTTP hacia un target bajo reglas del proxy; no significa que el proxy desaparezca de la política."
    ],
    "deep": {
      "sections": [
        {
          "title": "Forward vs reverse",
          "body": "El forward proxy es seleccionado/controlado desde el lado cliente; un reverse proxy es parte de la infraestructura del servicio. Ambos pueden crear conexiones separadas en cada lado."
        },
        {
          "title": "Metadata de origen",
          "body": "Forwarded o X-Forwarded-* pueden representar información de hops previos, pero son texto controlable si el edge no elimina/reconstruye valores no confiables. La seguridad depende de una trust chain explícita."
        },
        {
          "title": "CONNECT y túneles",
          "body": "CONNECT solicita que el intermediario establezca un túnel a una autoridad objetivo. Tras éxito, los bytes pueden pertenecer a otro protocolo como TLS, aunque el proxy siga controlando establecimiento, destino y políticas."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un backend confía en X-Forwarded-For, pero el edge reenvía el header del cliente sin limpiarlo. ¿Hay riesgo?",
      "steps": [
        [
          "Paso 1",
          "El cliente puede inyectar un valor arbitrario."
        ],
        [
          "Paso 2",
          "El backend puede atribuir identidad/IP incorrectamente."
        ],
        [
          "Paso 3",
          "El edge debe construir metadata confiable según una política explícita."
        ]
      ],
      "answer": "Los headers de forwarding son confiables solo dentro de una frontera bien definida."
    },
    "check": {
      "question": "¿Reverse proxy y NAT son conceptos equivalentes?",
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
          "Solo con HTTP/2",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Pueden coexistir, pero operan con modelos y semánticas diferentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un forward proxy actúa típicamente en nombre del cliente hacia servidores? sí/no",
        "answer": "si",
        "hint": "Ese es el rol conceptual."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Debe un backend confiar ciegamente en cualquier X-Forwarded-For recibido? sí/no",
        "answer": "no",
        "hint": "Solo dentro de una cadena de proxies de confianza saneada."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿CONNECT puede usarse para crear un túnel a través de un proxy HTTP? sí/no",
        "answer": "si",
        "hint": "Es una de sus semánticas principales."
      }
    ]
  },
  "app-mail": {
    "id": "app-mail",
    "courseId": 21,
    "title": "Correo: SMTP, MX, message format e IMAP",
    "shortTitle": "Enviar no es leer",
    "duration": 125,
    "objective": "seguir arquitectura de correo desde submission/relay SMTP hasta entrega y acceso IMAP, diferenciando envelope de message headers.",
    "summary": [
      "SMTP transporta correo entre agentes y usa un envelope con MAIL FROM/RCPT TO que no es idéntico a los headers From/To del mensaje RFC 5322.",
      "DNS MX orienta el siguiente destino SMTP de un dominio; la entrega puede pasar por varios relays antes del mailbox final.",
      "IMAP es un protocolo de acceso/sincronización de mailbox; no sustituye SMTP como mecanismo de transferencia de correo saliente."
    ],
    "concept": "El correo de Internet es una cadena store-and-forward. El envelope decide routing/transporte; el mensaje contiene headers/body para usuarios y agentes posteriores. Confundir ambos produce errores de seguridad y diagnósticos absurdos.",
    "diagram": [],
    "rules": [
      "No asumas que header From determina el SMTP envelope sender.",
      "No confundas SMTP AUTH/submission con entrega inter-servidor abierta al mundo.",
      "IMAP no “envía” correo por ser el protocolo que usa el cliente para leerlo."
    ],
    "deep": {
      "sections": [
        {
          "title": "Envelope vs content",
          "body": "SMTP usa comandos MAIL FROM y RCPT TO para el sobre. DATA contiene el mensaje con sus propios From, To, Subject, etc. Bounces y políticas pueden depender del envelope sender."
        },
        {
          "title": "MX y relay",
          "body": "Para un dominio receptor se consultan MX con preferencias; si existen varios se aplican reglas de selección/fallo. SMTP es store-and-forward: aceptar un mensaje no implica entrega inmediata al buzón final."
        },
        {
          "title": "IMAP",
          "body": "IMAP mantiene mailboxes, flags, UIDs y operaciones de sincronización. El cliente puede mantener una vista local, pero el servidor conserva un modelo de mailbox que no es un simple directorio de archivos universal."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "El header To dice alice@example y RCPT TO del envelope dice archive@example. ¿A cuál usa SMTP para decidir ese destinatario de transporte?",
      "steps": [
        [
          "Paso 1",
          "RCPT TO pertenece al envelope SMTP."
        ],
        [
          "Paso 2",
          "El header To forma parte del mensaje."
        ],
        [
          "Paso 3",
          "Por tanto routing de ese destinatario se basa en RCPT TO, no en que el texto To coincida."
        ]
      ],
      "answer": "Envelope y headers son capas distintas."
    },
    "check": {
      "question": "¿IMAP reemplaza SMTP para enviar correo entre servidores?",
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
          "Solo con MX",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "IMAP es acceso a mailbox; SMTP transporta correo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿MX es un tipo de registro DNS relacionado con entrega de correo? sí/no",
        "answer": "si",
        "hint": "Indica mail exchangers para un dominio."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿MAIL FROM SMTP y header From deben ser idénticos por definición? sí/no",
        "answer": "no",
        "hint": "Envelope y message content son distintos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿SMTP es store-and-forward y puede usar relays? sí/no",
        "answer": "si",
        "hint": "Es central en la arquitectura de correo."
      }
    ]
  },
  "app-ftp-ssh": {
    "id": "app-ftp-ssh",
    "courseId": 21,
    "title": "FTP y SSH: protocolos históricos y acceso seguro",
    "shortTitle": "Dos protocolos, cero parentesco mágico",
    "duration": 115,
    "objective": "comparar FTP y SSH por canales, autenticación y uso; explicar SFTP como subsistema SSH sin confundirlo con FTP sobre TLS.",
    "summary": [
      "FTP clásico separa conexión de control y conexiones de datos, lo que explica parte de su complejidad con NAT/firewalls.",
      "SSH establece un transporte seguro, autentica servidor/cliente según mecanismos y multiplexa canales para shell, exec, forwarding y subsistemas.",
      "SFTP es un protocolo de transferencia de archivos sobre SSH; FTPS es FTP protegido con TLS. No son nombres alternativos de la misma cosa."
    ],
    "concept": "Que dos herramientas copien archivos no las hace el mismo protocolo. FTP nace con control/data separados; SSH construye un canal criptográfico multiplexado y puede ejecutar un subsistema de archivos como SFTP.",
    "diagram": [],
    "rules": [
      "No llames SFTP “FTP por SSH”.",
      "No desactives host-key verification como solución permanente a errores de despliegue.",
      "Port forwarding SSH crea canales/túneles; no convierte automáticamente el servicio remoto en seguro si el endpoint interno es malicioso."
    ],
    "deep": {
      "sections": [
        {
          "title": "FTP control/data",
          "body": "El cliente mantiene control con comandos/respuestas y abre/acepta conexiones de datos según modo activo/pasivo. Esta separación interactúa con direcciones privadas y firewalls."
        },
        {
          "title": "SSH capas",
          "body": "La arquitectura SSH separa transporte seguro, autenticación de usuario y connection protocol que multiplexa canales. Host keys permiten autenticar el servidor cuando el cliente valida correctamente su identidad."
        },
        {
          "title": "SFTP vs FTPS",
          "body": "SFTP usa SSH y tiene su propio protocolo de operaciones de archivo; FTPS extiende FTP con TLS. Puertos, framing, comandos y modelos de seguridad difieren."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un equipo dice “habilitamos SFTP, así que es FTP con TLS”. ¿Es correcto?",
      "steps": [
        [
          "Paso 1",
          "SFTP funciona como protocolo sobre SSH."
        ],
        [
          "Paso 2",
          "FTP con TLS suele llamarse FTPS."
        ],
        [
          "Paso 3",
          "Por tanto son stacks distintos aunque ambos transfieran archivos."
        ]
      ],
      "answer": "SFTP y FTPS no son sinónimos."
    },
    "check": {
      "question": "¿SFTP es simplemente FTP encapsulado sin cambios dentro de SSH?",
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
          "Solo en modo pasivo",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "SFTP es un protocolo distinto proporcionado como subsistema sobre SSH."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿FTP clásico separa control y datos? sí/no",
        "answer": "si",
        "hint": "Es una característica arquitectónica importante."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿SSH puede multiplexar varios canales dentro de una conexión? sí/no",
        "answer": "si",
        "hint": "Shell, exec, forwarding y subsistemas pueden compartir transporte."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Aceptar cualquier host key mantiene autenticación fuerte del servidor? sí/no",
        "answer": "no",
        "hint": "El cliente debe validar la identidad esperada."
      }
    ]
  },
  "app-websocket": {
    "id": "app-websocket",
    "courseId": 21,
    "title": "WebSocket: upgrade, frames y conexión bidireccional",
    "shortTitle": "No es “TCP con JSON”",
    "duration": 115,
    "objective": "explicar handshake WebSocket, framing, control frames, masking y relación con HTTP sin confundir mensajes WebSocket con segmentos TCP.",
    "summary": [
      "WebSocket establece una comunicación bidireccional con framing propio tras un handshake HTTP/1.1 Upgrade clásico; extensiones posteriores permiten mappings adicionales, pero la semántica WebSocket sigue siendo propia.",
      "Frames WebSocket transportan fragmentos de mensajes y control frames; las fronteras no coinciden con read()/segmentos TCP.",
      "El masking cliente→servidor del protocolo no es cifrado; confidencialidad/autenticidad del transporte normalmente dependen de TLS en wss."
    ],
    "concept": "WebSocket resuelve mensajería full-duplex de larga duración sobre una conexión. Después del handshake, los bytes siguen reglas de framing WebSocket: opcode, FIN, length, masking y payload.",
    "diagram": [],
    "rules": [
      "No interpretes masking como secreto criptográfico.",
      "No asumas 1 frame = 1 mensaje: un mensaje de datos puede fragmentarse.",
      "Ping/Pong son control frames del protocolo y no equivalen a ICMP ping."
    ],
    "deep": {
      "sections": [
        {
          "title": "Handshake",
          "body": "En HTTP/1.1 el cliente solicita Upgrade: websocket con Sec-WebSocket-Key; el servidor prueba comprensión mediante Sec-WebSocket-Accept. Eso evita confundir una respuesta HTTP normal con aceptación del protocolo."
        },
        {
          "title": "Frames y mensajes",
          "body": "Text/Binary pueden fragmentarse en continuation frames. Control frames como Close/Ping/Pong tienen restricciones propias y pueden aparecer entre fragmentos de un mensaje."
        },
        {
          "title": "Backpressure y lifecycle",
          "body": "Una conexión persistente necesita límites de buffers, timeouts, heartbeat cuando proceda y manejo de cierre. “Socket abierto” no garantiza que la aplicación remota esté saludable o leyendo a la misma velocidad."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un mensaje WebSocket de 2 MiB se fragmenta en varios frames. ¿Sigue siendo conceptualmente un mensaje?",
      "steps": [
        [
          "Paso 1",
          "El framing permite fragmentación con continuation frames."
        ],
        [
          "Paso 2",
          "El receptor reensambla según FIN/opcodes."
        ],
        [
          "Paso 3",
          "Las fronteras TCP inferiores no alteran esa semántica."
        ]
      ],
      "answer": "Frame y mensaje WebSocket no son obligatoriamente 1:1."
    },
    "check": {
      "question": "¿El masking WebSocket sustituye TLS?",
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
          "Solo para texto",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Masking no proporciona confidencialidad criptográfica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Ping/Pong WebSocket son mensajes ICMP? sí/no",
        "answer": "no",
        "hint": "Son control frames dentro de WebSocket."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un mensaje WebSocket puede fragmentarse en varios frames? sí/no",
        "answer": "si",
        "hint": "El protocolo define continuation frames."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿wss normalmente combina WebSocket con TLS? sí/no",
        "answer": "si",
        "hint": "TLS protege el transporte del esquema seguro."
      }
    ]
  },
  "app-protocol-projects": {
    "id": "app-protocol-projects",
    "courseId": 21,
    "title": "Laboratorio: DNS, HTTP y analizador de protocolos",
    "shortTitle": "Construir para dejar de adivinar",
    "duration": 150,
    "objective": "integrar DNS, HTTP y parsing de paquetes construyendo implementaciones educativas seguras, con tests, límites y observabilidad.",
    "summary": [
      "Un DNS educativo debe parsear mensajes con bounds checking, compression pointers controlados, tipos explícitos y transporte UDP/TCP básico.",
      "Un servidor/cliente HTTP educativo debe implementar framing estricto antes de añadir features; aceptar bytes ambiguos “porque el navegador funciona” es deuda y posible vulnerabilidad.",
      "Un analizador de paquetes debe tratar cada capa como un parser bounded y nunca asumir que una captura es válida, completa o no truncada."
    ],
    "concept": "El proyecto final convierte todos los protocolos de red vistos en una tubería de parsers y máquinas de estado. La habilidad experta no es memorizar headers, sino saber validar límites, separar capas y producir evidencia reproducible.",
    "diagram": [],
    "rules": [
      "Nunca indexes un paquete antes de comprobar longitud/campo que habilita ese header.",
      "No implementes un HTTP parser de producción con split(\"\\r\\n\\r\\n\") y optimismo.",
      "Un simulador debe declarar sus simplificaciones: modelar ARP/IP/TCP no equivale a emular timings físicos reales."
    ],
    "deep": {
      "sections": [
        {
          "title": "DNS mínimo",
          "body": "Construye encoder/decoder para header, questions y RR seleccionados; añade pointer compression decoding con detección de ciclos/profundidad y UDP/TCP framing. Usa fixtures binarios y differential tests contra herramientas maduras."
        },
        {
          "title": "HTTP mínimo",
          "body": "Implementa request line, fields, Content-Length y una subset deliberada. Rechaza ambigüedad, limita tamaños y cubre conexiones persistentes con tests de fragmentación arbitraria del stream."
        },
        {
          "title": "Packet analyzer/simulator",
          "body": "Parsea Ethernet→IP→TCP/UDP→DNS/HTTP cuando los discriminantes lo indiquen. Conserva offsets y bytes originales para explicar cada decisión, y permite inyectar pérdida/reorder en un simulador separado."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Tu parser Ethernet recibe 10 bytes, pero el código intenta leer directamente EtherType en offsets de un frame normal. ¿Qué debe hacer?",
      "steps": [
        [
          "Paso 1",
          "Comprueba primero que exista longitud suficiente para el header requerido."
        ],
        [
          "Paso 2",
          "Si la captura está truncada, devuelve un resultado de truncación/error controlado."
        ],
        [
          "Paso 3",
          "No leas fuera de límites ni inventes campos ausentes."
        ]
      ],
      "answer": "Todo parser de protocolo debe ser length-delimited y hostil a input malformado."
    },
    "check": {
      "question": "¿Un parser de paquetes debe confiar en que una captura siempre contiene el frame completo?",
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
          "Solo en loopback",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Capturas pueden truncarse o contener input malformado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un servidor HTTP educativo debe probar fragmentación arbitraria de reads TCP? sí/no",
        "answer": "si",
        "hint": "TCP no preserva fronteras de aplicación."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un decoder DNS debe limitar/validar compression pointers? sí/no",
        "answer": "si",
        "hint": "Input malformado puede crear ciclos o offsets inválidos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un simulador simplificado debe documentar qué fenómenos no modela? sí/no",
        "answer": "si",
        "hint": "La validez del modelo depende de sus supuestos."
      }
    ]
  }
});
