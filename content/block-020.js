/**
 * BLOQUE 020 — Transporte: TCP, UDP y QUIC
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar demultiplexación, fiabilidad, control de flujo y
 * control de congestión. Un puerto no identifica por sí solo una conexión, un
 * ACK no significa "la aplicación ya leyó" y una ventana anunciada no es cwnd.
 */

window.LEARNING_PATHS[20] = {
  level: "Experto progresivo",
  estimatedHours: 62,
  description: "Transporte extremo a extremo desde puertos y sockets hasta fiabilidad TCP, control de flujo/congestión y QUIC.",
  outcomes: [
    "Distinguir puertos, sockets, 4-tuplas/5-tuplas y demultiplexación sin confundir endpoint local con conexión.",
    "Razonar sobre secuencias, ACK acumulativos, retransmisión, RTT y ventanas TCP con aritmética de bytes.",
    "Separar flow control del receptor y congestion control de la red, explicando slow start, pérdida y capacidad en vuelo.",
    "Comparar UDP, TCP y QUIC por las garantías que ofrecen y seguir un flujo extremo a extremo con sus estados y temporizadores."
  ],
  modules: [
    { id: "m1-endpoints", title: "Endpoints y semántica", description: "Puertos, sockets, UDP y stream TCP.", lessons: ["transport-ports-sockets", "transport-udp", "transport-tcp-stream"] },
    { id: "m2-reliability", title: "Conexión y fiabilidad TCP", description: "Handshake, secuencias, ACK, RTT y retransmisión.", lessons: ["transport-handshake", "transport-seq-ack", "transport-retransmission-rtt"] },
    { id: "m3-windows", title: "Ventanas y congestión", description: "Flow control, cwnd, slow start y pérdidas.", lessons: ["transport-sliding-flow-control", "transport-congestion-control", "transport-slow-start-loss"] },
    { id: "m4-lifecycle-quic", title: "Ciclo de vida y QUIC", description: "Cierre, estado, streams QUIC e integración.", lessons: ["transport-tcp-lifecycle", "transport-quic", "transport-integration"] }
  ]
};

Object.assign(window.LESSONS, {
  "transport-ports-sockets": {
    id: "transport-ports-sockets", courseId: 20,
    title: "Puertos, sockets y demultiplexación",
    shortTitle: "Un puerto no es una conexión",
    duration: 95,
    objective: "distinguir puerto, socket, endpoint y conexión y explicar cómo el sistema demultiplexa tráfico de transporte hacia procesos.",
    summary: [
      "Un puerto es un identificador de transporte dentro de un host/protocolo; no identifica globalmente una conexión.",
      "Una conexión TCP se distingue normalmente por direcciones y puertos de ambos extremos junto con el protocolo; múltiples conexiones pueden compartir el mismo puerto local de escucha.",
      "La API de sockets es una interfaz del sistema operativo, no el protocolo de red en sí; sus objetos y estados no viajan literalmente por el cable."
    ],
    concept: "El paquete llega a una interfaz, IP decide el protocolo superior y la capa de transporte usa su información de endpoint para seleccionar el socket apropiado. `443` dice mucho menos de lo que parece: millones de conexiones pueden usarlo simultáneamente.",
    diagram: [],
    rules: [
      "No llames socket al par IP:puerto como si esa fuera la única definición; en APIs reales el socket es un objeto/handle del kernel con estado.",
      "No identifiques una conexión TCP solo por destination port.",
      "Puerto TCP 53 y puerto UDP 53 pertenecen a espacios de demultiplexación de protocolos distintos."
    ],
    deep: { sections: [
      { title: "Endpoint y 4-tupla", body: "Para una conexión TCP establecida, la combinación dirección local, puerto local, dirección remota y puerto remoto permite distinguir flujos simultáneos. El protocolo IP forma parte implícita/explicita de la clave según la implementación; en observabilidad se habla a menudo de 5-tupla incluyendo protocolo." },
      { title: "Listener frente a conexión aceptada", body: "Un socket en escucha representa un punto local preparado para aceptar conexiones. Cada `accept()` puede producir un nuevo descriptor con el mismo puerto local pero un peer distinto. Por eso un servidor no necesita un puerto nuevo por cliente." },
      { title: "API no es wire format", body: "Funciones como socket/bind/connect/listen/accept son contratos del SO. No existe un paquete IP llamado `accept`. La implementación traduce operaciones de proceso a estructuras, estados y segmentos/datagramas del protocolo correspondiente." }
    ], commonErrors: ["Puerto=proceso de forma permanente.", "Un servidor solo puede tener una conexión por puerto."], connections: ["Syscalls", "IP", "TCP/UDP"] },
    example: { problem: "Un servidor 203.0.113.10:443 recibe dos conexiones desde 198.51.100.4:51000 y 198.51.100.4:51001. ¿Pueden coexistir?", steps: [["Paso 1", "Ambas comparten IP/puerto local."], ["Paso 2", "El puerto remoto es distinto."], ["Paso 3", "Las 4-tuplas son diferentes y pueden demultiplexarse por separado."]], answer: "Sí; el mismo listener puede originar múltiples conexiones establecidas distinguibles." },
    check: { question: "¿Un destination port basta para identificar universalmente una conexión TCP establecida?", options: [["No", true], ["Sí", false], ["Solo con IPv6", false]], success: "Correcto.", failure: "Necesitas distinguir ambos extremos, no solo un puerto." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿TCP 443 y UDP 443 son exactamente el mismo endpoint de transporte? sí/no", answer: "no", hint: "Incluye el protocolo." },
      { level: 2, label: "Normal", prompt: "¿Dos clientes distintos pueden conectarse simultáneamente al mismo puerto 443 del servidor? sí/no", answer: "si", hint: "Sus tuplas remotas los distinguen." },
      { level: 3, label: "Difícil", prompt: "¿accept() crea necesariamente un nuevo puerto local para cada cliente? sí/no", answer: "no", hint: "Normalmente conserva el puerto local del listener." }
    ]
  },

  "transport-udp": {
    id: "transport-udp", courseId: 20,
    title: "UDP: datagramas y servicio mínimo",
    shortTitle: "UDP conserva mensajes, no promesas",
    duration: 100,
    objective: "explicar la semántica de datagramas UDP, checksum, demultiplexación y responsabilidades que quedan en la aplicación.",
    summary: [
      "UDP ofrece datagramas con puertos y checksum, sin handshake, retransmisión fiable, ordering ni congestion control incorporado al protocolo base.",
      "Preserva fronteras de datagrama: dos envíos son conceptualmente mensajes separados, a diferencia del byte stream de TCP.",
      "Una aplicación que necesita fiabilidad, pacing o control de congestión sobre UDP debe diseñarlos o usar un protocolo superior que los proporcione."
    ],
    concept: "UDP es deliberadamente pequeño. Que no implemente fiabilidad no significa que la aplicación deba ignorar congestión: significa que esa responsabilidad no viene resuelta por el encabezado UDP.",
    diagram: [],
    rules: [
      "No describas UDP como 'más rápido' universalmente; tiene menos mecanismos base, pero el rendimiento depende del protocolo y workload.",
      "No asumas entrega, unicidad ni orden de datagramas.",
      "No reconstruyas un stream concatenando datagramas sin definir framing, pérdida y reorder."
    ],
    deep: { sections: [
      { title: "Fronteras de mensaje", body: "Si la aplicación envía dos datagramas, el receptor no recibe un único flujo de bytes arbitrariamente fusionado por UDP. Puede perder uno, recibirlos reordenados o duplicados por la red/sistema, pero la unidad entregada sigue siendo el datagrama recibido." },
      { title: "Checksum", body: "El checksum UDP detecta corrupción accidental según las reglas del protocolo y pseudoheader IP correspondiente. No autentica al emisor ni protege contra manipulación maliciosa; integridad criptográfica es otra capa." },
      { title: "Congestión sigue existiendo", body: "UDP no contiene un algoritmo de congestion control inherente. Protocolos sobre UDP, como QUIC, deben reaccionar a congestión de manera apropiada. 'No usar TCP' no concede permiso para saturar la red." }
    ], commonErrors: ["UDP garantiza baja latencia.", "UDP nunca pierde porque Ethernet tiene FCS."], connections: ["Datagramas", "DNS", "QUIC"] },
    example: { problem: "Se envían datagramas A, B y C. El receptor observa A y C. ¿Puede UDP inferir y retransmitir B por sí solo?", steps: [["Paso 1", "UDP no mantiene un sequence space fiable estándar."], ["Paso 2", "No hay ACK/retransmisión UDP base."], ["Paso 3", "La recuperación, si se desea, pertenece al protocolo superior."]], answer: "No; UDP base no retransmite B." },
    check: { question: "¿UDP preserva fronteras de datagrama?", options: [["Sí", true], ["No, siempre es byte stream", false], ["Solo en IPv6", false]], success: "Correcto.", failure: "UDP es orientado a datagramas." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿UDP base incluye three-way handshake? sí/no", answer: "no", hint: "No establece una conexión TCP-like." },
      { level: 2, label: "Normal", prompt: "¿Un checksum UDP válido autentica criptográficamente al peer? sí/no", answer: "no", hint: "Detección accidental no es autenticación." },
      { level: 3, label: "Difícil", prompt: "¿Un protocolo sobre UDP puede implementar retransmisión y congestion control propios? sí/no", answer: "si", hint: "QUIC es un ejemplo importante." }
    ]
  },

  "transport-tcp-stream": {
    id: "transport-tcp-stream", courseId: 20,
    title: "TCP: stream fiable de bytes",
    shortTitle: "TCP no conserva tus write() como mensajes",
    duration: 110,
    objective: "explicar la abstracción de byte stream TCP y distinguirla de segmentos, llamadas write/read y registros de aplicación.",
    summary: [
      "TCP ofrece a la aplicación un flujo ordenado y fiable de bytes entre endpoints, no una secuencia de mensajes de aplicación.",
      "Las fronteras de `write()` no tienen por qué coincidir con segmentos TCP ni con las cantidades devueltas por `read()`.",
      "Framing de mensajes pertenece al protocolo de aplicación: longitud, delimitadores, TLV u otra convención."
    ],
    concept: "Puedes hacer dos `write()` y recibir los bytes con un solo `read()`, o hacer un `write()` grande y necesitar varios `read()`. TCP promete bytes en orden; no promete respetar la dramaturgia de tus llamadas al sistema.",
    diagram: [],
    rules: [
      "No equipares segmento TCP a mensaje de aplicación.",
      "No asumas que `read(fd, buf, 100)` devolverá 100 bytes solo porque el peer los enviará eventualmente.",
      "Diseña framing explícito para protocolos de aplicación sobre TCP."
    ],
    deep: { sections: [
      { title: "Byte sequence", body: "Cada byte ocupa una posición en el espacio de secuencia. La implementación puede segmentar según MSS, offloads, congestion/window state y otros factores. El receptor recompone el stream visible a la aplicación independientemente de esas fronteras de transmisión." },
      { title: "Partial I/O", body: "Las APIs de sockets pueden completar lecturas/escrituras parcialmente. Un protocolo robusto mantiene estado de parsing y reintenta hasta producir/consumir la estructura lógica deseada, tratando EOF y errores de forma explícita." },
      { title: "Head-of-line del stream", body: "Para entregar bytes posteriores del mismo stream TCP de forma ordenada, una pérdida anterior puede retrasar la entrega de bytes siguientes aunque hayan llegado. Esto es consecuencia de la semántica ordenada del stream." }
    ], commonErrors: ["Una llamada send equivale a un segmento.", "TCP transmite objetos JSON."], connections: ["Framing", "Sequence numbers", "HTTP"] },
    example: { problem: "El emisor hace write('ABC') y write('DEF'). El receptor hace read(6). ¿Es legal recibir 'ABCDEF' en una sola lectura?", steps: [["Paso 1", "TCP expone bytes, no fronteras write()."], ["Paso 2", "Los seis bytes son contiguos en el stream."], ["Paso 3", "La API puede devolverlos juntos si están disponibles."]], answer: "Sí; el protocolo de aplicación debe imponer sus propias fronteras." },
    check: { question: "¿TCP garantiza conservar las fronteras de cada write() de la aplicación?", options: [["No", true], ["Sí", false], ["Solo con MSS fijo", false]], success: "Correcto.", failure: "TCP es un byte stream." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿TCP entrega bytes en orden a la aplicación? sí/no", answer: "si", hint: "Es una propiedad central del servicio." },
      { level: 2, label: "Normal", prompt: "¿Un read() puede devolver menos bytes que el tamaño solicitado sin que sea EOF? sí/no", answer: "si", hint: "Partial reads son normales." },
      { level: 3, label: "Difícil", prompt: "¿Un protocolo length-prefix sobre TCP necesita conservar estado si la cabecera llega partida entre lecturas? sí/no", answer: "si", hint: "Las fronteras de read no son framing." }
    ]
  },

  "transport-handshake": {
    id: "transport-handshake", courseId: 20,
    title: "Three-way handshake y sincronización de estado",
    shortTitle: "SYN, SYN-ACK, ACK: sincronizar secuencias antes de hablar",
    duration: 115,
    objective: "explicar el three-way handshake, números iniciales de secuencia y por qué el establecimiento TCP necesita confirmar estado bidireccional.",
    summary: [
      "El handshake TCP sincroniza números iniciales de secuencia y confirma reachability/estado en ambas direcciones antes de una conexión establecida ordinaria.",
      "SYN consume espacio de secuencia, por lo que el ACK correspondiente avanza una unidad respecto al ISN.",
      "El handshake no autentica criptográficamente al peer; TLS u otros mecanismos resuelven identidad/confidencialidad en capas superiores."
    ],
    concept: "El tercer mensaje no es decoración histórica: confirma que el iniciador recibió el ISN del respondedor y completa la sincronización bidireccional del estado TCP.",
    diagram: [],
    rules: [
      "No llames al SYN 'un byte de datos'; consume un número de secuencia sin ser payload de aplicación.",
      "No interpretes una conexión TCP establecida como autenticación de identidad.",
      "No confundas handshake TCP con handshake TLS."
    ],
    deep: { sections: [
      { title: "Secuencia conceptual", body: "Cliente envía SYN con ISN=x. Servidor responde SYN+ACK con ISN=y y ACK=x+1. Cliente responde ACK=y+1. A partir de ahí, los primeros bytes de datos ordinarios se numeran respecto a esos espacios de secuencia." },
      { title: "Por qué tres pasos", body: "Cada extremo necesita demostrar que ha recibido la información de secuencia del otro y mantener estado coherente frente a duplicados/segmentos antiguos. Dos mensajes no proporcionarían la misma confirmación bidireccional bajo el modelo TCP." },
      { title: "Opciones negociadas", body: "Durante SYN pueden anunciarse opciones como MSS, window scaling y SACK permitted según el caso. El establecimiento no solo crea estado: también intercambia capacidades relevantes para la conexión." }
    ], commonErrors: ["El ACK del SYN confirma bytes de aplicación.", "TCP handshake cifra la conexión."], connections: ["Sequence numbers", "TLS", "SYN backlog"] },
    example: { problem: "Cliente envía SYN seq=1000. Servidor recibe y responde. ¿Qué ACK debe reconocer ese SYN?", steps: [["Paso 1", "SYN consume una posición de secuencia."], ["Paso 2", "El siguiente número esperado es 1001."], ["Paso 3", "El ACK acumulativo anuncia 1001."]], answer: "ACK=1001." },
    check: { question: "¿SYN consume espacio de secuencia TCP?", options: [["Sí", true], ["No", false], ["Solo con TLS", false]], success: "Correcto.", failure: "SYN avanza una posición en el espacio de secuencia." },
    practice: [
      { level: 1, label: "Básico", prompt: "SYN seq=500: ¿el ACK correspondiente ordinario es 501? sí/no", answer: "si", hint: "SYN consume una posición." },
      { level: 2, label: "Normal", prompt: "¿Completar el TCP handshake prueba criptográficamente la identidad del servidor? sí/no", answer: "no", hint: "Eso pertenece a TLS/autenticación superior." },
      { level: 3, label: "Difícil", prompt: "¿MSS puede anunciarse durante segmentos SYN? sí/no", answer: "si", hint: "Hay opciones TCP negociadas/anunciadas en establecimiento." }
    ]
  },

  "transport-seq-ack": {
    id: "transport-seq-ack", courseId: 20,
    title: "Sequence numbers y ACK acumulativos",
    shortTitle: "TCP numera bytes, no paquetes",
    duration: 125,
    objective: "calcular rangos de secuencia y ACKs y explicar el significado de un ACK acumulativo frente a recepción/aplicación.",
    summary: [
      "Los sequence numbers TCP se refieren al byte inicial del segmento dentro de un espacio de secuencia modular de 32 bits.",
      "El ACK ordinario es acumulativo: indica el siguiente sequence number que el receptor espera de forma contigua.",
      "ACK de transporte significa que el TCP remoto reconoció bytes según su estado; no demuestra que la aplicación remota ya los haya procesado."
    ],
    concept: "Si llegan bytes 1000–1499 contiguamente, ACK=1500. Si también llega 2000–2499 pero falta 1500–1999, el ACK acumulativo puede seguir señalando 1500 aunque el receptor conserve datos fuera de orden.",
    diagram: [],
    rules: [
      "Cuenta bytes de payload para avanzar secuencia, además del consumo especial de SYN/FIN.",
      "No interpretes ACK=N como 'he recibido exactamente el paquete N'.",
      "No conviertas ACK de TCP en confirmación semántica de aplicación."
    ],
    deep: { sections: [
      { title: "ACK acumulativo", body: "El campo ACK identifica el siguiente byte esperado del flujo. Por ello reconoce implícitamente todos los bytes anteriores contiguos. Los huecos impiden avanzar el ACK acumulativo aunque haya datos posteriores almacenados." },
      { title: "SACK", body: "Selective Acknowledgment permite comunicar bloques recibidos fuera de orden para mejorar recuperación. SACK complementa el ACK acumulativo; no redefine el significado base del acknowledgment number." },
      { title: "Aritmética modular", body: "Los sequence numbers tienen 32 bits y pueden envolver. Las implementaciones comparan dentro de ventanas válidas usando aritmética adecuada; tratarlos como enteros crecientes sin límite rompe conexiones largas." }
    ], commonErrors: ["Sequence number=número de segmento.", "ACK significa que read() del peer ya consumió datos."], connections: ["SACK", "Retransmission", "Sliding windows"] },
    example: { problem: "Segmento seq=4000 lleva 600 bytes. Si todo llega contiguo, ¿qué ACK espera el emisor?", steps: [["Paso 1", "Primer byte=4000."], ["Paso 2", "Se ocupan 600 posiciones: 4000..4599."], ["Paso 3", "El siguiente esperado es 4600."]], answer: "ACK=4600." },
    check: { question: "¿El ACK TCP ordinario indica el siguiente byte esperado de forma acumulativa?", options: [["Sí", true], ["No", false], ["Solo en UDP", false]], success: "Correcto.", failure: "Ese es el significado central del acknowledgment number." },
    practice: [
      { level: 1, label: "Básico", prompt: "seq=100 con 50 bytes: ¿ACK contiguo esperado=150? sí/no", answer: "si", hint: "100..149 son 50 bytes." },
      { level: 2, label: "Normal", prompt: "¿ACK de TCP garantiza que la aplicación remota haya persistido esos bytes en disco? sí/no", answer: "no", hint: "Transport acknowledgment no es application acknowledgment." },
      { level: 3, label: "Difícil", prompt: "Si falta un hueco anterior, ¿puede el ACK acumulativo quedarse fijo aunque hayan llegado bytes posteriores? sí/no", answer: "si", hint: "El siguiente byte contiguo esperado no cambia." }
    ]
  },

  "transport-retransmission-rtt": {
    id: "transport-retransmission-rtt", courseId: 20,
    title: "RTT, temporizadores y retransmisión",
    shortTitle: "Retransmitir demasiado pronto también es un bug",
    duration: 125,
    objective: "explicar cómo TCP detecta pérdida mediante acknowledgments/temporizadores y por qué RTO debe adaptarse al RTT y su variabilidad.",
    summary: [
      "TCP puede inferir pérdida mediante temporizadores y patrones de ACK; retransmitir no depende de una notificación explícita del router.",
      "El RTO debe adaptarse a muestras de RTT y variación; fijarlo demasiado bajo produce retransmisiones espurias y demasiado alto retrasa recuperación.",
      "RTT mide ida y vuelta; no es lo mismo que one-way delay ni que throughput."
    ],
    concept: "Una red no envía una carta certificada diciendo 'perdí el segmento 42'. TCP observa ausencia/progreso de ACK y temporizadores. La ausencia de evidencia se convierte, con cuidado, en evidencia operacional de pérdida.",
    diagram: [],
    rules: [
      "No uses RTT/2 como medición exacta de one-way delay salvo supuestos de simetría que debes declarar.",
      "No fijes RTO=RTT instantáneo sin margen de variación.",
      "Una retransmisión puede ser espuria si el original solo estaba retrasado."
    ],
    deep: { sections: [
      { title: "Estimación adaptativa", body: "TCP mantiene estimaciones suavizadas del RTT y de su variación para derivar un RTO robusto. El objetivo es reaccionar a pérdida sin confundir jitter normal con desaparición de un segmento." },
      { title: "ACKs como señal", body: "ACKs duplicados/SACK y progreso de secuencia proporcionan información sobre huecos. Los algoritmos modernos pueden usar señales adicionales, pero conceptualmente la recuperación se apoya en lo que fue reconocido y lo que permanece pendiente." },
      { title: "Ambigüedad de retransmisión", body: "Si retransmites y luego llega un ACK, sin información adicional puede ser ambiguo si correspondía al original o a la copia. Las reglas de medición RTT evitan contaminar estimaciones con muestras ambiguas." }
    ], commonErrors: ["El router avisa siempre de cada pérdida.", "RTT/2 siempre es latencia de ida exacta."], connections: ["RTO", "SACK", "Congestion control"] },
    example: { problem: "Un path tiene RTT típico 40 ms pero ocasionalmente 90 ms. ¿Por qué RTO fijo de 40 ms es mala idea?", steps: [["Paso 1", "Variación normal puede superar 40 ms."], ["Paso 2", "Expirarías antes de que llegue el ACK válido."], ["Paso 3", "Generarías retransmisiones espurias y señales de congestión erróneas."]], answer: "El RTO necesita margen/adaptación a variabilidad, no copiar el último RTT." },
    check: { question: "¿RTO y RTT son exactamente la misma magnitud?", options: [["No", true], ["Sí", false], ["Solo con fibra", false]], success: "Correcto.", failure: "RTO se deriva de estimaciones y variabilidad, no es simplemente RTT." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Una retransmisión puede ser espuria? sí/no", answer: "si", hint: "El original puede estar retrasado, no perdido." },
      { level: 2, label: "Normal", prompt: "¿RTT/2 garantiza one-way delay exacto en rutas asimétricas? sí/no", answer: "no", hint: "Ida y vuelta pueden diferir." },
      { level: 3, label: "Difícil", prompt: "¿Variación de RTT debe influir en un temporizador de retransmisión robusto? sí/no", answer: "si", hint: "Jitter importa para evitar expiraciones prematuras." }
    ]
  },

  "transport-sliding-flow-control": {
    id: "transport-sliding-flow-control", courseId: 20,
    title: "Sliding window y flow control",
    shortTitle: "rwnd protege al receptor, no a Internet",
    duration: 125,
    objective: "explicar ventana deslizante, receive window, bytes en vuelo y cómo flow control evita desbordar al receptor sin resolver congestión de red.",
    summary: [
      "El receptor anuncia una receive window (rwnd) que limita cuánto dato adicional puede quedar pendiente según su capacidad de recepción.",
      "La ventana se desliza cuando llegan ACKs y el receptor libera/actualiza espacio; no es un lote fijo de paquetes numerados.",
      "Flow control protege buffers/receptor; congestion control protege la red. El emisor queda limitado por ambas restricciones."
    ],
    concept: "Puedes tener una red vacía y un receptor lento: rwnd manda. Puedes tener un receptor sobrado y una red congestionada: cwnd manda. El límite útil es aproximadamente el mínimo de las restricciones relevantes.",
    diagram: [],
    rules: [
      "No confundas rwnd con cwnd.",
      "La ventana se expresa en espacio de bytes TCP, no simplemente en cantidad de segmentos.",
      "Zero window es una señal de flow control, no prueba de congestión del path."
    ],
    deep: { sections: [
      { title: "Ventana anunciada", body: "El ACK transporta información de ventana de recepción. Con window scaling negociado, TCP puede representar ventanas mayores que el campo base. La semántica sigue siendo capacidad anunciada del receptor, no permiso de la red." },
      { title: "Bytes en vuelo", body: "Datos enviados pero aún no reconocidos ocupan parte del espacio en vuelo. A medida que ACK avanza, el borde izquierdo de la ventana efectiva se desplaza y pueden enviarse nuevos bytes si rwnd/cwnd lo permiten." },
      { title: "Aplicación lenta", body: "Si la aplicación receptora deja de consumir, buffers pueden llenarse y rwnd reducirse hasta cero. TCP dispone de mecanismos para sondear la reapertura sin asumir que la conexión ha muerto." }
    ], commonErrors: ["Receive window mide congestión.", "Zero window significa packet loss."], connections: ["Buffers", "cwnd", "Window scaling"] },
    example: { problem: "rwnd=64 KiB y cwnd=20 KiB. Ignorando otros límites, ¿qué restricción domina el envío en vuelo?", steps: [["Paso 1", "Flow control permite hasta 64 KiB."], ["Paso 2", "Congestion control permite 20 KiB."], ["Paso 3", "El mínimo limita la cantidad efectiva."]], answer: "cwnd; aproximadamente 20 KiB." },
    check: { question: "¿rwnd protege principalmente la capacidad de recepción del peer?", options: [["Sí", true], ["No, mide routers congestionados", false], ["Solo en QUIC", false]], success: "Correcto.", failure: "rwnd pertenece al flow control del receptor." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿rwnd y cwnd son la misma variable? sí/no", answer: "no", hint: "Receptor frente a red." },
      { level: 2, label: "Normal", prompt: "rwnd=8 KiB y cwnd=64 KiB: ¿flow control puede limitar antes que congestion control? sí/no", answer: "si", hint: "Domina el mínimo." },
      { level: 3, label: "Difícil", prompt: "¿Una aplicación receptora que deja de leer puede reducir la ventana anunciada? sí/no", answer: "si", hint: "Sus buffers pueden llenarse." }
    ]
  },

  "transport-congestion-control": {
    id: "transport-congestion-control", courseId: 20,
    title: "Congestion control: cwnd y capacidad en vuelo",
    shortTitle: "cwnd protege la red; no es el buffer del receptor",
    duration: 135,
    objective: "explicar congestion window, señales de congestión y relación entre capacidad en vuelo, RTT y throughput sin asumir un algoritmo único de implementación.",
    summary: [
      "TCP congestion control limita el volumen de datos no reconocidos mediante estado del emisor como cwnd y reacciona a señales de congestión/pérdida.",
      "cwnd es diferente de rwnd y del tamaño del socket buffer; el envío efectivo respeta múltiples límites simultáneamente.",
      "Para llenar un path con alto bandwidth-delay product se necesita suficiente data in flight; una ventana demasiado pequeña desaprovecha capacidad aunque no haya pérdida."
    ],
    concept: "Un enlace de 1 Gb/s con RTT 100 ms puede necesitar ~12.5 MB en vuelo para ocupar el tubo idealmente. Una cwnd de 64 KiB no 've' un gigabit: ve una pajita muy larga.",
    diagram: [],
    rules: [
      "No derives throughput solo de bandwidth sin considerar RTT y ventana en vuelo.",
      "No asumas que toda pérdida implica congestión física, aunque algoritmos clásicos la usen como señal.",
      "No presentes una única implementación (CUBIC, Reno, BBR...) como definición de TCP."
    ],
    deep: { sections: [
      { title: "Bandwidth-delay product", body: "BDP≈bandwidth×RTT expresa cuántos bits pueden estar en vuelo para ocupar un path bajo un modelo simple. Es una herramienta de razonamiento, no una garantía de throughput: overhead, pacing, ACK behavior, receiver limits y competencia importan." },
      { title: "Señales", body: "Loss, duplicate acknowledgments, timers y ECN pueden informar algoritmos de congestión. La especificación y las implementaciones han evolucionado; conviene separar principios obligatorios de variantes concretas." },
      { title: "Fairness y estabilidad", body: "Congestion control no solo busca maximizar un flujo; debe coexistir con otros y evitar colapso persistente. Distintos algoritmos optimizan objetivos y responden de manera diferente a RTT, buffers y señales explícitas." }
    ], commonErrors: ["cwnd=receive buffer.", "Más ancho de banda siempre produce más throughput TCP aunque la ventana sea minúscula."], connections: ["BDP", "ECN", "Slow start"] },
    example: { problem: "Path de 100 Mb/s y RTT=40 ms. Aproxima BDP.", steps: [["Paso 1", "100 Mb/s × 0.04 s = 4 Mb."], ["Paso 2", "4 Mb / 8 = 0.5 MB."], ["Paso 3", "Se necesita del orden de 500 kB en vuelo para llenar ese modelo ideal."]], answer: "≈4 Mbit ≈500 kB." },
    check: { question: "¿cwnd y rwnd limitan por razones distintas?", options: [["Sí", true], ["No", false], ["Solo en Wi-Fi", false]], success: "Correcto.", failure: "cwnd modela congestión; rwnd flow control del receptor." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿BDP depende del RTT además del bandwidth? sí/no", answer: "si", hint: "Multiplica ambos." },
      { level: 2, label: "Normal", prompt: "1 Gb/s × 0.1 s = 100 Mbit en vuelo; ¿equivale a unos 12.5 MB? sí/no", answer: "si", hint: "Divide bits entre 8." },
      { level: 3, label: "Difícil", prompt: "¿TCP estándar obliga a que todas las implementaciones usen exactamente el mismo algoritmo de congestión interno? sí/no", answer: "no", hint: "Hay variantes que cumplen requisitos de convivencia de formas distintas." }
    ]
  },

  "transport-slow-start-loss": {
    id: "transport-slow-start-loss", courseId: 20,
    title: "Slow start, congestion avoidance y pérdida",
    shortTitle: "Slow start es exponencial; el nombre es marketing histórico",
    duration: 135,
    objective: "razonar sobre crecimiento de cwnd, transición a congestion avoidance y recuperación ante pérdida sin fijar constantes dependientes de implementación como universales.",
    summary: [
      "Slow start incrementa rápidamente la capacidad de envío conforme llegan ACKs hasta una transición/limitación; su crecimiento por RTT puede aproximarse como exponencial bajo supuestos simples.",
      "Congestion avoidance crece más conservadoramente que slow start en algoritmos Reno-like; una señal de pérdida provoca reducción/recovery según el algoritmo.",
      "Timeout y evidencia de pérdida por ACKs no son eventos equivalentes: pueden disparar recuperaciones distintas."
    ],
    concept: "Si cwnd arranca en varias MSS, los ACKs permiten abrir la ventana rápidamente. El nombre 'slow start' resulta especialmente gracioso porque el crecimiento clásico es la fase agresiva, no la fase tímida.",
    diagram: [],
    rules: [
      "No fijes Initial Window a un número eterno: ha evolucionado mediante RFCs y puede variar bajo reglas aplicables.",
      "No equipares duplicate ACK con pérdida demostrada de un único paquete sin contexto.",
      "Distingue fast retransmit/recovery de expiración del RTO."
    ],
    deep: { sections: [
      { title: "Crecimiento ACK-clocked", body: "En modelos Reno-like, cada ACK de nuevos datos aumenta cwnd durante slow start de modo que una ventana completa reconocida puede aproximadamente duplicarla por RTT. Delayed ACK y otros detalles modifican la trayectoria exacta." },
      { title: "Congestion avoidance", body: "Tras superar un umbral o criterio, el crecimiento se hace más moderado para sondear capacidad disponible sin duplicar continuamente el volumen en vuelo. Algoritmos modernos pueden usar funciones distintas a Reno." },
      { title: "Recuperación", body: "Fast retransmit utiliza evidencia de ACKs para retransmitir antes del RTO bajo condiciones definidas. Timeout sugiere falta de progreso más severa y suele producir una reducción más fuerte en algoritmos clásicos." }
    ], commonErrors: ["Slow start crece lentamente.", "Tres ACK duplicados son una ley universal de toda implementación moderna."], connections: ["Fast retransmit", "NewReno", "CUBIC"] },
    example: { problem: "Modelo ideal simple con cwnd inicial 10 MSS y duplicación por RTT en slow start. ¿Qué valores aproximados tras tres RTT completos?", steps: [["Inicio", "10 MSS."], ["RTT 1", "≈20 MSS."], ["RTT 2", "≈40 MSS."], ["RTT 3", "≈80 MSS."]], answer: "≈80 MSS bajo esos supuestos simplificados." },
    check: { question: "¿Slow start clásico puede crecer aproximadamente de forma exponencial por RTT bajo un modelo simple?", options: [["Sí", true], ["No, siempre lineal", false], ["Solo con UDP", false]], success: "Correcto.", failure: "Los ACKs pueden producir crecimiento cercano a duplicación por RTT en el modelo clásico." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Congestion avoidance clásico crece más conservadoramente que slow start? sí/no", answer: "si", hint: "Ese es el objetivo de la transición." },
      { level: 2, label: "Normal", prompt: "¿RTO expiry y fast retransmit son exactamente el mismo evento? sí/no", answer: "no", hint: "Se basan en señales distintas." },
      { level: 3, label: "Difícil", prompt: "¿El valor exacto de Initial Window debe tratarse como una constante histórica inmutable de TCP? sí/no", answer: "no", hint: "Las recomendaciones han evolucionado." }
    ]
  },

  "transport-tcp-lifecycle": {
    id: "transport-tcp-lifecycle", courseId: 20,
    title: "Cierre TCP, half-close y TIME_WAIT",
    shortTitle: "Cerrar una dirección no borra la otra",
    duration: 110,
    objective: "explicar FIN, half-close, cierre bidireccional y función de TIME_WAIT sin convertir la máquina de estados en una lista para memorizar.",
    summary: [
      "TCP es full-duplex: cada dirección del byte stream puede cerrarse independientemente mediante FIN.",
      "FIN consume espacio de secuencia y significa que el emisor no enviará más bytes en esa dirección; el sentido contrario puede seguir activo.",
      "TIME_WAIT protege frente a segmentos retrasados/reutilización prematura de una conexión cerrada y permite retransmitir el ACK final según el modelo TCP."
    ],
    concept: "EOF en una dirección no implica que la otra dirección esté cerrada. Puedes recibir FIN y todavía enviar una respuesta final. TCP permite despedidas educadas en vez de apagar la luz del edificio entero.",
    diagram: [],
    rules: [
      "No confundir FIN con RST: uno cierra ordenadamente una dirección; el otro aborta estado bajo condiciones específicas.",
      "No eliminar TIME_WAIT indiscriminadamente como 'desperdicio de sockets'.",
      "EOF de read no significa necesariamente que tu siguiente write sea conceptualmente inválido en un half-close válido."
    ],
    deep: { sections: [
      { title: "FIN y sequence space", body: "FIN se secuencia y consume una posición como SYN. El peer reconoce ese FIN, pero puede mantener abierta su dirección de envío hasta completar sus propios datos y emitir su FIN." },
      { title: "TIME_WAIT", body: "El extremo que realiza cierto cierre activo puede conservar estado durante un intervalo para impedir que segmentos antiguos contaminen una nueva encarnación de la misma tupla y para poder retransmitir el ACK final si fuese necesario." },
      { title: "RST", body: "RST señala un cierre/estado no válido o abortivo según contexto; no equivale a FIN acelerado. Las aplicaciones deben distinguir EOF ordenado de errores/reset cuando esa semántica importa." }
    ], commonErrors: ["FIN cierra instantáneamente ambas direcciones.", "TIME_WAIT es siempre un bug del servidor."], connections: ["State machine", "EOF", "4-tupla"] },
    example: { problem: "Cliente envía FIN después de terminar una request. ¿Puede el servidor seguir enviando una respuesta pendiente antes de su propio FIN?", steps: [["Paso 1", "FIN cierra el sentido cliente→servidor."], ["Paso 2", "TCP es full-duplex."], ["Paso 3", "Servidor→cliente puede seguir activo hasta su cierre."]], answer: "Sí; es un half-close válido." },
    check: { question: "¿FIN consume una posición de sequence space?", options: [["Sí", true], ["No", false], ["Solo si hay payload", false]], success: "Correcto.", failure: "FIN, como SYN, consume una posición de secuencia." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿TCP permite half-close? sí/no", answer: "si", hint: "Cada dirección puede cerrarse por separado." },
      { level: 2, label: "Normal", prompt: "¿RST es simplemente un FIN más rápido y semánticamente idéntico? sí/no", answer: "no", hint: "Ordenado frente a abortivo." },
      { level: 3, label: "Difícil", prompt: "¿TIME_WAIT ayuda a proteger contra segmentos retrasados de una conexión anterior? sí/no", answer: "si", hint: "Esa es una de sus funciones centrales." }
    ]
  },

  "transport-quic": {
    id: "transport-quic", courseId: 20,
    title: "QUIC: transporte seguro y multiplexado sobre UDP",
    shortTitle: "UDP abajo, transporte serio arriba",
    duration: 145,
    objective: "explicar la arquitectura QUIC, streams, connection IDs, TLS integrado, loss recovery y por qué evita head-of-line entre streams sin eliminar toda espera posible.",
    summary: [
      "QUIC es un protocolo de transporte seguro construido sobre UDP que ofrece conexiones, streams multiplexados, flow control, loss recovery y congestion control.",
      "TLS 1.3 se integra en el handshake QUIC; los metadatos y estados no son equivalentes a ejecutar TCP+TLS sin cambios.",
      "La pérdida que bloquea bytes de un stream QUIC no tiene por qué bloquear la entrega de datos de otros streams independientes, aunque una pérdida todavía puede afectar congestion control y recursos compartidos."
    ],
    concept: "QUIC usa UDP como sustrato de despliegue, no como semántica final de la aplicación. Decir 'QUIC es UDP' es como decir 'un filesystem es sectores': técnicamente hay una capa debajo, pedagógicamente has perdido casi todo lo interesante.",
    diagram: [],
    rules: [
      "No llames QUIC 'TCP cifrado sobre UDP'.",
      "Distingue stream ID/offset de packet number QUIC; viven en espacios semánticos distintos.",
      "Evitar head-of-line entre streams no significa que la pérdida sea gratis ni que desaparezca congestion control."
    ],
    deep: { sections: [
      { title: "Streams y packet numbers", body: "QUIC multiplexa streams dentro de una conexión. Los STREAM frames transportan offsets de stream, mientras que los paquetes QUIC tienen packet numbers usados para loss detection. Retransmitir datos perdidos no exige reutilizar el mismo packet number." },
      { title: "Seguridad integrada", body: "QUIC utiliza TLS para establecer claves y protege gran parte de la información de transporte. La combinación permite un handshake diseñado conjuntamente con el transporte y soporta establecimiento de baja latencia bajo condiciones apropiadas." },
      { title: "Connection IDs y migration", body: "Connection IDs permiten identificar la conexión independientemente de una 4-tupla rígida en determinadas migraciones de path. Eso no significa que cualquier cambio de red sea automáticamente exitoso: validación de path, políticas y reachability siguen importando." }
    ], commonErrors: ["QUIC no tiene congestion control porque usa UDP.", "Cada stream QUIC es una conexión UDP separada."], connections: ["TLS 1.3", "HTTP/3", "Loss recovery"] },
    example: { problem: "Dos streams QUIC A y B comparten conexión. Se pierde un paquete que contiene datos solo de A. ¿Debe la entrega ordenada de B esperar necesariamente a recuperar A?", steps: [["Paso 1", "Orden de bytes se mantiene por stream."], ["Paso 2", "La pérdida pertenece a datos de A."], ["Paso 3", "B puede progresar si sus propios datos están disponibles, aunque la conexión comparta congestión."]], answer: "No necesariamente; QUIC evita el head-of-line de datos entre streams independientes." },
    check: { question: "¿QUIC incluye congestion control/loss recovery aunque se transporte sobre UDP?", options: [["Sí", true], ["No", false], ["Solo HTTP/3", false]], success: "Correcto.", failure: "UDP no lo aporta, pero QUIC sí construye esos mecanismos encima." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿QUIC funciona sobre UDP en Internet QUIC v1? sí/no", answer: "si", hint: "Ese es su sustrato de transporte inferior." },
      { level: 2, label: "Normal", prompt: "¿Packet number QUIC y stream offset son exactamente el mismo contador? sí/no", answer: "no", hint: "Paquete frente a posición dentro de stream." },
      { level: 3, label: "Difícil", prompt: "¿Connection IDs pueden ayudar a mantener identidad de conexión al cambiar la 4-tupla bajo condiciones de migration? sí/no", answer: "si", hint: "Desacoplan parte de la identidad del path." }
    ]
  },

  "transport-integration": {
    id: "transport-integration", courseId: 20,
    title: "Integración: de connect() al último ACK",
    shortTitle: "Seguir un flujo sin perder la capa",
    duration: 150,
    objective: "seguir una transferencia TCP/QUIC extremo a extremo identificando decisiones de socket, IP, transporte, flow control, congestion control y aplicación.",
    summary: [
      "La aplicación usa una API; el kernel crea estado de transporte; IP/routing decide next hops; la red entrega o pierde paquetes; el transporte reconstruye su abstracción para la aplicación.",
      "Fiabilidad, flow control y congestion control observan señales distintas y pueden limitar simultáneamente el envío.",
      "Un benchmark de transporte debe separar application goodput, wire rate, RTT, loss, rwnd/cwnd y limitaciones de CPU/receiver para no atribuir causalidad al número equivocado."
    ],
    concept: "Diagnosticar transporte es recorrer capas: ¿la aplicación produce datos? ¿el socket está bloqueado por rwnd? ¿cwnd limita? ¿hay loss/retransmits? ¿RTT cambió? ¿el path MTU provoca problemas? El gráfico bonito viene después de formular la pregunta correcta.",
    diagram: [],
    rules: [
      "No concluyas 'la red es lenta' solo porque read() tarda.",
      "Distingue goodput de throughput on-wire y de PHY/link rate.",
      "Correlaciona métricas de ambos extremos y del path antes de culpar a una sola capa."
    ],
    deep: { sections: [
      { title: "Cadena TCP", body: "connect() inicia estado y handshake; send/write encola bytes; segmentación y ventanas determinan qué puede salir; IP encapsula; ACKs hacen avanzar estado; pérdidas activan recovery; read entrega bytes ordenados cuando están disponibles." },
      { title: "Diagnóstico por restricciones", body: "Si rwnd es pequeño, mira consumidor/buffers del receptor. Si cwnd se contrae con pérdida/ECN, mira congestión/path. Si ambas son grandes pero el emisor no produce, el cuello puede ser aplicación/CPU. Un mismo síntoma de bajo throughput puede tener causas completamente diferentes." },
      { title: "TCP frente a QUIC", body: "Ambos ofrecen transporte fiable con congestion/flow control, pero estructuran streams, seguridad, loss recovery y exposición al middlebox de manera distinta. Compararlos exige elegir una propiedad concreta, no una etiqueta 'más rápido'." }
    ], commonErrors: ["Bajo throughput siempre es packet loss.", "QUIC siempre gana a TCP en cualquier workload."], connections: ["perf", "Wireshark", "HTTP/3"] },
    example: { problem: "Transferencia: link 1 Gb/s, RTT 80 ms, rwnd=32 KiB, sin pérdida. ¿Puede el link seguir infrautilizado por flow control?", steps: [["Paso 1", "BDP ideal sería ~10 MB."], ["Paso 2", "rwnd solo permite ~32 KiB adicionales pendientes."], ["Paso 3", "El receptor limita mucho antes de llenar el path."]], answer: "Sí; un rwnd pequeño puede limitar throughput aunque el enlace esté libre." },
    check: { question: "¿Bajo throughput basta para concluir que cwnd es el cuello de botella?", options: [["No", true], ["Sí", false], ["Solo en Ethernet", false]], success: "Correcto.", failure: "Hay múltiples límites: aplicación, rwnd, cwnd, CPU, path, etc." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Application goodput y link PHY rate son exactamente la misma métrica? sí/no", answer: "no", hint: "Hay overhead y otras restricciones." },
      { level: 2, label: "Normal", prompt: "¿rwnd pequeño puede limitar una transferencia incluso con cero packet loss? sí/no", answer: "si", hint: "Flow control es independiente de congestión." },
      { level: 3, label: "Difícil", prompt: "¿Comparar TCP y QUIC requiere especificar workload, RTT, loss, handshake/reuse y métrica? sí/no", answer: "si", hint: "'Más rápido' sin condiciones no es una comparación técnica." }
    ]
  }
});
