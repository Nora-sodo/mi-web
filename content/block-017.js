/**
 * BLOQUE 017 — Ethernet y redes locales
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar frame, dominio de broadcast, tabla de forwarding,
 * VLAN, resolución de direcciones y control de topología. Estar en capa 2 no
 * convierte todos estos mecanismos en la misma cosa con distinto sombrero.
 */

window.LEARNING_PATHS[17] = {
  level: "Experto progresivo",
  estimatedHours: 51,
  description: "Ethernet LAN desde la trama hasta switching, VLAN, ARP, Spanning Tree y MTU, con énfasis en forwarding, dominios y fallos reales.",
  outcomes: [
    "Descomponer una trama Ethernet y razonar sobre direcciones MAC unicast, multicast y broadcast.",
    "Explicar cómo aprende y reenvía un bridge/switch, incluidos flooding, ageing y bucles.",
    "Diseñar y depurar VLANs y enlaces tagged/untagged sin confundir segmentación L2 con routing.",
    "Relacionar ARP, STP/RSTP y MTU con sus dominios y límites, evitando mezclar L2, IPv4 y Path MTU."
  ],
  modules: [
    { id: "m1-ethernet-frame", title: "Tramas y direccionamiento", description: "MAC, EtherType, FCS y dominios locales.", lessons: ["lan-ethernet-frame", "lan-mac-addresses", "lan-broadcast-collision"] },
    { id: "m2-switching", title: "Bridging y switching", description: "Aprendizaje, forwarding y bucles.", lessons: ["lan-switch-learning", "lan-forwarding-flooding", "lan-stp"] },
    { id: "m3-segmentation", title: "Segmentación lógica", description: "VLANs y tagging 802.1Q.", lessons: ["lan-vlan-8021q"] },
    { id: "m4-resolution-mtu", title: "Resolución y tamaño", description: "ARP, MTU e integración de una LAN real.", lessons: ["lan-arp", "lan-mtu", "lan-integration"] }
  ]
};

Object.assign(window.LESSONS, {
  "lan-ethernet-frame": {
    id: "lan-ethernet-frame", courseId: 17, title: "Tramas Ethernet: MAC header, EtherType y FCS", shortTitle: "La trama no es el paquete IP", duration: 95,
    objective: "descomponer una trama Ethernet y distinguir cabecera MAC, payload, padding, FCS y encapsulación de protocolos superiores.",
    summary: [
      "Ethernet transporta frames; IP, ARP u otros protocolos pueden viajar como payload según el EtherType/encapsulación.",
      "Destination y Source MAC identifican destinos/orígenes de servicio MAC dentro del dominio correspondiente; no son direcciones IP.",
      "El FCS detecta errores de trama; no es autenticación criptográfica ni garantiza entrega."
    ],
    concept: "Una trama Ethernet es una unidad de capa MAC. La PHY la convierte en una representación física y las capas superiores interpretan su payload. Mantener esas fronteras evita llamar 'paquete' a todo hasta que nadie sabe qué bytes pertenecen a qué cabecera.",
    diagram: [],
    rules: ["Distingue frame Ethernet de paquete IP.", "EtherType describe el protocolo/uso del payload según la encapsulación aplicable.", "FCS detecta corrupción accidental; no autentica al emisor."],
    deep: { sections: [
      { title: "Estructura", body: "Conceptualmente aparecen MAC destino, MAC origen, campo de tipo/longitud según formato, payload/padding y FCS. Preamble/SFD pertenecen a la transmisión física/MAC framing y no deben mezclarse sin declarar qué longitud se está midiendo." },
      { title: "Encapsulación", body: "Un frame puede transportar IPv4, IPv6, ARP u otros protocolos identificados mediante EtherType cuando se usa Ethernet II. Una VLAN 802.1Q inserta información adicional de tagging y desplaza la interpretación de campos." },
      { title: "FCS", body: "El CRC de Ethernet permite detectar muchas clases de errores de transmisión. Un receptor normalmente descarta una trama con FCS inválido; que el CRC sea correcto no demuestra que la trama sea legítima." }
    ], commonErrors: ["Contar siempre preamble/SFD dentro del mismo 'frame size' sin aclarar convención.", "Decir que FCS corrige errores."], connections: ["Redes físicas", "VLAN", "IP"] },
    example: { problem: "Una NIC recibe una trama con EtherType IPv4 y FCS válido.", steps: [["Paso 1","La MAC valida el frame según su formato."],["Paso 2","EtherType permite demultiplexar el payload hacia IPv4."],["Paso 3","IPv4 procesa su propia cabecera y validaciones; FCS válido no sustituye esas comprobaciones."]], answer: "Cada capa valida e interpreta su propia estructura." },
    check: { question: "¿Un FCS Ethernet válido demuestra que el emisor es auténtico?", options: [["No",true],["Sí",false],["Solo en full duplex",false]], success: "Correcto.", failure: "CRC/FCS detecta errores accidentales, no proporciona autenticación criptográfica." },
    practice: [
      { level:1,label:"Básico",prompt:"¿Una trama Ethernet y un paquete IPv4 son la misma unidad protocolaria? sí/no",answer:"no",hint:"Uno puede encapsular al otro." },
      { level:2,label:"Normal",prompt:"¿EtherType puede indicar que el payload es ARP? sí/no",answer:"si",hint:"ARP tiene EtherType asignado." },
      { level:3,label:"Difícil",prompt:"¿FCS correcto garantiza que no existe un error lógico en el payload de aplicación? sí/no",answer:"no",hint:"FCS solo cubre integridad accidental de la trama." }
    ]
  },

  "lan-mac-addresses": {
    id:"lan-mac-addresses", courseId:17, title:"Direcciones MAC: unicast, multicast, broadcast y administración", shortTitle:"Una MAC no es una identidad eterna", duration:90,
    objective:"interpretar direcciones MAC de 48 bits, distinguir unicast/multicast/broadcast y entender alcance y administración sin tratarlas como identidad global infalible.",
    summary:["Las MAC de 48 bits son nombres de capa 2 usados por tecnologías IEEE 802; su significado depende del bit individual/group y universal/local.","FF:FF:FF:FF:FF:FF es broadcast Ethernet de 48 bits.","Una MAC puede ser configurada, aleatorizada o suplantada; no es una identidad criptográfica."],
    concept:"Una dirección MAC sirve al forwarding de una LAN, no como prueba de identidad humana, geográfica o de hardware inmutable. IEEE administra bloques para fabricantes, pero el valor observado en una red puede ser localmente administrado.",
    diagram:[], rules:["No confundas OUI con identidad garantizada del dispositivo.","Broadcast, multicast y unicast tienen semánticas distintas.","No uses MAC como autenticación."],
    deep:{sections:[
      {title:"Bits de control",body:"En una dirección MAC de 48 bits, bits de la primera octeto distinguen individual/group y universal/local. Esto permite direcciones localmente administradas además de asignaciones globales."},
      {title:"Multicast",body:"Una dirección de grupo permite que múltiples interfaces interesadas acepten la trama. El switch puede tratar multicast con mecanismos adicionales, pero no debe confundirse con broadcast."},
      {title:"Privacidad y spoofing",body:"Sistemas modernos pueden aleatorizar MAC en algunos contextos. Además, software/driver puede cambiarla en múltiples plataformas; por tanto no es una credencial fuerte."}
    ],commonErrors:["Inferir fabricante con certeza a partir del prefijo cuando la MAC es local.","Decir que toda MAC es única para siempre."],connections:["ARP","Switching","Wi-Fi"]},
    example:{problem:"Observas una MAC localmente administrada en una WLAN.",steps:[["Paso 1","El bit local indica que no debes tratar el prefijo como asignación universal del fabricante."],["Paso 2","Puede ser una dirección generada por software/política de privacidad."],["Paso 3","El switching sigue pudiendo usarla mientras sea válida en ese dominio." ]],answer:"Utilidad de forwarding no implica identidad global."},
    check:{question:"¿Una MAC observada en una LAN es una prueba criptográfica de identidad del dispositivo?",options:[["No",true],["Sí",false],["Solo si tiene OUI",false]],success:"Correcto.",failure:"Las MAC pueden ser locales o suplantadas."},
    practice:[
      {level:1,label:"Básico",prompt:"¿FF:FF:FF:FF:FF:FF es broadcast Ethernet? sí/no",answer:"si",hint:"Todos los bits a uno."},
      {level:2,label:"Normal",prompt:"¿Una dirección multicast y una broadcast son necesariamente lo mismo? sí/no",answer:"no",hint:"Broadcast alcanza a todos en el dominio; multicast identifica un grupo."},
      {level:3,label:"Difícil",prompt:"¿Una MAC localmente administrada invalida por sí sola el forwarding de un switch? sí/no",answer:"no",hint:"El switch aprende valores observados, no exige OUI global."}
    ]
  },

  "lan-broadcast-collision": {
    id:"lan-broadcast-collision",courseId:17,title:"Dominios de broadcast y colisión",shortTitle:"Broadcast no significa colisión",duration:90,
    objective:"distinguir dominio de broadcast, collision domain y comportamiento half/full duplex en Ethernet conmutada.",
    summary:["Un dominio de broadcast es el conjunto L2 al que se propagan broadcasts según la topología/VLAN.","Un collision domain pertenece al modelo de acceso compartido/half duplex; enlaces Ethernet full duplex conmutados no usan CSMA/CD para colisiones normales.","Un switch separa dominios de colisión por puerto, pero una VLAN puede mantener un dominio de broadcast a través de varios switches."],
    concept:"Broadcast domain y collision domain describen fenómenos diferentes. En Ethernet moderna conmutada/full duplex, hablar de 'colisiones entre todos los equipos del switch' es normalmente una reliquia histórica con bastante nostalgia coaxial.",
    diagram:[],rules:["No equipares broadcast con collision.","VLAN define alcance L2 lógico de broadcast.","CSMA/CD pertenece al Ethernet half-duplex compartido, no al funcionamiento normal de enlaces full duplex."],
    deep:{sections:[
      {title:"Colisiones",body:"En medios compartidos half duplex, múltiples transmisores podían competir y CSMA/CD gestionaba colisiones. Un puerto switched full duplex dispone de enlaces independientes de transmisión/recepción."},
      {title:"Broadcast",body:"Una trama broadcast se inunda dentro de la VLAN según forwarding y controles existentes. El router normalmente delimita el dominio L2 y no reenvía broadcasts Ethernet como si fueran routing ordinario."},
      {title:"Segmentación",body:"Switching y VLAN permiten cambiar topología de dominios sin que ello implique necesariamente cambiar el medio físico."}
    ],commonErrors:["Decir que un switch elimina broadcasts.","Decir que full duplex 'detecta mejor' las colisiones en vez de evitarlas por el modelo del enlace."],connections:["Switching","VLAN","ARP"]},
    example:{problem:"Dos hosts están en puertos full duplex distintos del mismo switch y misma VLAN.",steps:[["Paso 1","Cada enlace no comparte un collision domain clásico con el otro."],["Paso 2","Siguen dentro del mismo broadcast domain de VLAN."],["Paso 3","Un ARP request broadcast puede llegar a ambos según forwarding." ]],answer:"Collision y broadcast domains son dimensiones diferentes."},
    check:{question:"¿Un switch L2 elimina por sí mismo todos los broadcasts?",options:[["No",true],["Sí",false],["Solo a 1 Gb/s",false]],success:"Correcto.",failure:"Los broadcasts se propagan dentro de su dominio/VLAN salvo controles específicos."},
    practice:[
      {level:1,label:"Básico",prompt:"¿Ethernet full duplex conmutado usa CSMA/CD para operación normal? sí/no",answer:"no",hint:"No hay medio compartido half duplex entre esos dos extremos."},
      {level:2,label:"Normal",prompt:"¿Dos puertos del mismo switch pueden estar en el mismo broadcast domain y distintos collision domains? sí/no",answer:"si",hint:"Son conceptos distintos."},
      {level:3,label:"Difícil",prompt:"¿Una VLAN puede extender un broadcast domain a través de varios switches? sí/no",answer:"si",hint:"El dominio es lógico, no un único chasis."}
    ]
  },

  "lan-switch-learning": {
    id:"lan-switch-learning",courseId:17,title:"Switches y tablas de aprendizaje MAC",shortTitle:"El switch aprende del origen",duration:100,
    objective:"explicar source learning, ageing y movimiento de MAC, y predecir cómo se construye una forwarding database.",
    summary:["Un bridge aprende normalmente la MAC origen de frames recibidos y asocia esa dirección con un puerto/VLAN.","El destino se consulta para decidir forwarding, flooding o filtrado; no se aprende la ubicación de un host mirando solo la MAC destino.","Las entradas dinámicas envejecen y pueden actualizarse cuando una dirección aparece por otro puerto."],
    concept:"El aprendizaje de un switch es evidencia observacional: 'he visto esta MAC origen por este puerto en este contexto'. No es ARP, no consulta DNS y no adivina dónde está un host por telepatía de silicio.",
    diagram:[],rules:["Aprende del source MAC.","Indexa/segmenta por contexto VLAN/FID según implementación/estándar.","Las entradas dinámicas no son eternas."],
    deep:{sections:[
      {title:"Source learning",body:"Al recibir un frame, el bridge puede actualizar su FDB para indicar por dónde se alcanza la source MAC en ese dominio de forwarding."},
      {title:"Ageing",body:"Sin ageing, hosts movidos dejarían rutas obsoletas indefinidamente. Las entradas dinámicas expiran tras inactividad según política/configuración."},
      {title:"MAC move",body:"Ver la misma source MAC por otro puerto puede actualizar la FDB. Movimientos muy rápidos también pueden señalar loops, virtualización o problemas."}
    ],commonErrors:["Confundir tabla MAC/FDB con ARP cache.","Afirmar que el switch aprende preguntando a los hosts."],connections:["Forwarding","ARP","VLAN"]},
    example:{problem:"FDB vacía. Entra por puerto 3 un frame src=A dst=B.",steps:[["Paso 1","El switch aprende A→puerto 3."],["Paso 2","Busca B en la FDB."],["Paso 3","Si B es unknown unicast, normalmente inunda por puertos elegibles excepto el de entrada." ]],answer:"El aprendizaje ocurre con A, no con B."},
    check:{question:"¿Un switch aprende la ubicación de una MAC principalmente observándola como origen?",options:[["Sí",true],["No",false],["Solo con ARP",false]],success:"Correcto.",failure:"Source learning usa la dirección origen de frames recibidos."},
    practice:[
      {level:1,label:"Básico",prompt:"Frame entra por p2 con src=AA. ¿Puede aprender AA→p2? sí/no",answer:"si",hint:"Source learning."},
      {level:2,label:"Normal",prompt:"¿La FDB y la ARP cache contienen exactamente el mismo tipo de mapeo? sí/no",answer:"no",hint:"MAC→puerto frente a IP→MAC."},
      {level:3,label:"Difícil",prompt:"¿Ageing ayuda a recuperar forwarding correcto cuando un host cambia de puerto? sí/no",answer:"si",hint:"Evita mantener entradas dinámicas obsoletas para siempre."}
    ]
  },

  "lan-forwarding-flooding": {
    id:"lan-forwarding-flooding",courseId:17,title:"Forwarding, filtering y flooding",shortTitle:"Unknown unicast no es broadcast",duration:95,
    objective:"predecir decisiones de bridge para unicast conocido/desconocido, broadcast y multicast, distinguiendo flooding de broadcasting.",
    summary:["Known unicast se envía hacia el puerto asociado cuando procede; unknown unicast suele inundarse dentro del dominio de forwarding.","Broadcast se inunda por su propia semántica; unknown unicast sigue teniendo una dirección unicast aunque el switch no conozca su salida.","Filtering puede evitar reenviar al mismo segmento/puerto o bloquear según estado/topología/política."],
    concept:"Flooding describe una acción del bridge; broadcast describe una propiedad de la dirección destino. Son palabras que a veces coinciden en el resultado y por eso llevan décadas intentando hacerse pasar una por la otra.",
    diagram:[],rules:["Unknown unicast ≠ broadcast.","Flooding queda acotado por VLAN/estado de puertos/políticas.","Known unicast no garantiza entrega: el destino puede haberse movido o estar caído."],
    deep:{sections:[
      {title:"Known unicast",body:"Si la FDB contiene un destino válido y el puerto está en estado elegible, el frame se reenvía hacia ese puerto."},
      {title:"Unknown unicast",body:"Sin entrada FDB, el bridge no sabe qué puerto alcanza al destino y normalmente replica hacia puertos elegibles del dominio, excepto el de entrada."},
      {title:"Multicast",body:"Puede tratarse con flooding o mecanismos de control/snooping según protocolos y configuración; no asumas comportamiento único para toda red."}
    ],commonErrors:["Llamar broadcast a unknown unicast.","Olvidar que STP/VLAN pueden limitar puertos elegibles."],connections:["FDB","STP","VLAN"]},
    example:{problem:"A envía a C, pero C aún no está aprendido.",steps:[["Paso 1","La dirección destino sigue siendo unicast."],["Paso 2","El switch no tiene salida asociada."],["Paso 3","Realiza unknown-unicast flooding dentro del dominio aplicable." ]],answer:"La acción es flooding; la dirección no se convierte en broadcast."},
    check:{question:"¿Unknown unicast significa que la MAC destino cambia a FF:FF:FF:FF:FF:FF?",options:[["No",true],["Sí",false],["Solo con VLAN",false]],success:"Correcto.",failure:"El switch replica el frame, pero la MAC destino sigue siendo unicast."},
    practice:[
      {level:1,label:"Básico",prompt:"¿Known unicast suele necesitar flooding por todos los puertos? sí/no",answer:"no",hint:"La FDB aporta una salida."},
      {level:2,label:"Normal",prompt:"¿Flooding puede estar limitado a una VLAN? sí/no",answer:"si",hint:"La VLAN delimita el dominio L2 lógico."},
      {level:3,label:"Difícil",prompt:"¿Un unknown unicast puede provocar varias copias del mismo frame dentro de la LAN sin ser broadcast? sí/no",answer:"si",hint:"Eso es flooding."}
    ]
  },

  "lan-vlan-8021q": {
    id:"lan-vlan-8021q",courseId:17,title:"VLANs y tagging IEEE 802.1Q",shortTitle:"Una VLAN no es una subred IP",duration:110,
    objective:"explicar segmentación VLAN, tagging 802.1Q, VID, puertos tagged/untagged y por qué routing entre VLANs es una función distinta.",
    summary:["Una VLAN crea dominios L2 lógicos separados sobre infraestructura compartida.","802.1Q añade un tag que incluye información de control como VLAN ID; el tratamiento tagged/untagged depende del puerto y configuración.","VLAN e IP subnet suelen alinearse operativamente, pero no son el mismo concepto ni la VLAN enruta entre sí sola."],
    concept:"802.1Q permite que un mismo enlace transporte tráfico perteneciente a múltiples VLANs, conservando separación lógica de bridging. El tag pertenece a capa 2; no reescribe por arte de magia la dirección IP ni crea un router miniatura dentro de cada switch.",
    diagram:[],rules:["VLAN ≠ subred IP.","Tagged/untagged es propiedad del tratamiento de frames en un puerto/contexto, no del host como esencia metafísica.","Inter-VLAN communication necesita función L3 si hablamos de IP entre dominios separados."],
    deep:{sections:[
      {title:"Tag 802.1Q",body:"El tag introduce un TPID y TCI con campos de prioridad/drop eligibility y VLAN ID. Su inserción cambia la estructura de la trama y el máximo tamaño de frame admitido debe contemplarlo."},
      {title:"Puertos",body:"Un puerto puede clasificar frames untagged en una VLAN y transportar frames tagged de múltiples VLANs según configuración. Términos comerciales access/trunk ayudan, pero la semántica real es ingreso/egreso y pertenencia VLAN."},
      {title:"Aislamiento",body:"Dos hosts en VLAN diferentes no comparten el mismo dominio de bridging aunque estén conectados al mismo chasis. Para IPv4/IPv6 entre VLANs se usa routing/L3."}
    ],commonErrors:["Confundir VLAN ID con IP subnet ID.","Suponer que 'trunk' es una propiedad física del cable."],connections:["802.1Q","STP","Routing"]},
    example:{problem:"Un enlace entre switches transporta VLAN 10 y 20 tagged.",steps:[["Paso 1","El tag permite conservar el contexto VLAN al cruzar el enlace."],["Paso 2","Cada switch mantiene forwarding separado según su modelo de VLAN/FID."],["Paso 3","Un broadcast de VLAN 10 no debe convertirse en broadcast de VLAN 20." ]],answer:"El enlace físico es compartido; los dominios L2 permanecen separados."},
    check:{question:"¿Una VLAN 10 implica necesariamente la subred IP 10.0.0.0/24?",options:[["No",true],["Sí",false],["Solo en Cisco",false]],success:"Correcto.",failure:"El VID y la dirección de red IP pertenecen a capas distintas."},
    practice:[
      {level:1,label:"Básico",prompt:"¿802.1Q puede transportar varias VLANs sobre el mismo enlace? sí/no",answer:"si",hint:"El tag conserva el contexto VLAN."},
      {level:2,label:"Normal",prompt:"¿Dos hosts en VLAN distintas comparten necesariamente el mismo broadcast domain L2? sí/no",answer:"no",hint:"La VLAN segmenta bridging."},
      {level:3,label:"Difícil",prompt:"¿Inter-VLAN IP requiere una función de routing/L3? sí/no",answer:"si",hint:"Bridging no enruta entre dominios IP separados."}
    ]
  },

  "lan-arp": {
    id:"lan-arp",courseId:17,title:"ARP: resolución IPv4→dirección de enlace",shortTitle:"ARP no pregunta por el host final de Internet",duration:105,
    objective:"explicar ARP requests/replies, cache, next-hop resolution y su alcance local, distinguiéndolo de DNS, switching y routing.",
    summary:["ARP resuelve direcciones de protocolo IPv4 a direcciones de enlace en la red local aplicable.","Para un destino IPv4 remoto, el host normalmente resuelve la MAC del next hop/gateway, no la MAC del servidor remoto.","ARP no autentica de forma robusta por sí mismo; caches pueden ser envenenadas en redes hostiles."],
    concept:"ARP conecta la decisión L3 de 'a qué next hop debo enviar' con la necesidad L2 de 'qué dirección MAC uso en este enlace'. El switch no sustituye ARP y ARP no decide la ruta IP.",
    diagram:[],rules:["ARP es local al enlace/broadcast domain pertinente.","Destino IP remoto → resolver next hop local, no el host remoto.","ARP cache ≠ switch FDB."],
    deep:{sections:[
      {title:"Request",body:"Un host puede emitir un ARP request en broadcast preguntando quién posee una dirección IPv4 determinada; el objetivo responde con su dirección de hardware según el protocolo."},
      {title:"Next hop",body:"La tabla de rutas decide si el destino es on-link o vía gateway. Solo después se resuelve la dirección de enlace del next hop correspondiente."},
      {title:"Seguridad",body:"ARP clásico no incorpora autenticación fuerte. Ataques de spoofing/poisoning explotan la confianza en asociaciones recibidas; mitigaciones dependen del entorno."}
    ],commonErrors:["Preguntar por la MAC del servidor remoto atravesando routers.","Confundir ARP con DNS porque ambos 'resuelven nombres/direcciones'."],connections:["IPv4","Routing","Switching"]},
    example:{problem:"Host 192.0.2.10/24 quiere enviar a 198.51.100.7 y su gateway es 192.0.2.1.",steps:[["Paso 1","La tabla/ruta determina que 198.51.100.7 no es on-link."],["Paso 2","El next hop es 192.0.2.1."],["Paso 3","ARP obtiene la MAC del gateway; el paquete IP conserva como destino 198.51.100.7." ]],answer:"L2 apunta al gateway; L3 sigue apuntando al destino final."},
    check:{question:"Para un destino IPv4 remoto, ¿ARP suele resolver la MAC del gateway local?",options:[["Sí",true],["No",false],["Solo con NAT",false]],success:"Correcto.",failure:"La resolución de enlace se hace para el next hop local."},
    practice:[
      {level:1,label:"Básico",prompt:"¿ARP cache mapea típicamente IPv4 a MAC? sí/no",answer:"si",hint:"Ese es su propósito clásico en Ethernet/IPv4."},
      {level:2,label:"Normal",prompt:"¿ARP request suele usar broadcast Ethernet en la LAN? sí/no",answer:"si",hint:"El solicitante aún desconoce la MAC objetivo."},
      {level:3,label:"Difícil",prompt:"¿ARP decide qué gateway elegir entre varias rutas IP? sí/no",answer:"no",hint:"Eso lo decide el routing; ARP resuelve el next hop elegido."}
    ]
  },

  "lan-stp": {
    id:"lan-stp",courseId:17,title:"Spanning Tree: evitar bucles de bridging",shortTitle:"Un loop L2 puede multiplicar tramas",duration:115,
    objective:"explicar por qué los bucles L2 son peligrosos y cómo STP/RSTP construyen una topología activa sin ciclos mediante root, roles y estados.",
    summary:["Ethernet clásico no incorpora un TTL de frame equivalente al TTL IP; un loop de bridging puede recircular y multiplicar tráfico.","Spanning Tree selecciona una topología lógica sin ciclos sobre una física redundante.","STP no 'apaga cables': controla qué puertos participan en forwarding según roles/estados y puede reconverger ante cambios."],
    concept:"Redundancia física es deseable, pero un bridge transparente con loops puede inundar broadcasts/unknown unicasts repetidamente y desestabilizar aprendizaje MAC. STP convierte el grafo redundante en un árbol activo y mantiene caminos de reserva.",
    diagram:[],rules:["Loop L2 ≠ loop IP con TTL.","STP bloquea forwarding lógico en ciertos puertos; el enlace físico puede seguir arriba.","Root bridge y roles se eligen mediante información BPDU y costes/prioridades según la variante."],
    deep:{sections:[
      {title:"Por qué hay loops",body:"Broadcast y unknown-unicast flooding pueden circular por caminos redundantes. Las copias pueden crecer y las source MAC pueden aparecer alternando puertos, causando MAC flapping."},
      {title:"Árbol",body:"STP elige un root y caminos preferidos; puertos redundantes quedan fuera del forwarding activo para mantener una topología sin ciclos."},
      {title:"RSTP",body:"Rapid Spanning Tree mejora mecanismos de convergencia respecto al STP histórico, pero los detalles de temporización/roles deben atribuirse a la variante/configuración concreta."}
    ],commonErrors:["Decir que STP elimina físicamente la redundancia.","Suponer que todo loop Ethernet se extingue por TTL de frame."],connections:["802.1Q","Switching","Broadcast"]},
    example:{problem:"Tres switches forman un triángulo y todos los enlaces están activos para forwarding sin control de loop.",steps:[["Paso 1","Un broadcast puede salir por dos caminos."],["Paso 2","Las copias regresan por enlaces alternativos y vuelven a inundarse."],["Paso 3","STP selecciona una topología activa sin ciclos dejando un camino redundante no-forwarding hasta ser necesario." ]],answer:"La redundancia física se conserva; el forwarding activo evita el ciclo."},
    check:{question:"¿STP necesita que el cable de un puerto bloqueado esté físicamente desconectado?",options:[["No",true],["Sí",false],["Solo con fibra",false]],success:"Correcto.",failure:"El estado de forwarding es lógico; el enlace puede permanecer activo."},
    practice:[
      {level:1,label:"Básico",prompt:"¿Un loop L2 puede provocar MAC flapping? sí/no",answer:"si",hint:"La misma source MAC puede aparecer por puertos alternos."},
      {level:2,label:"Normal",prompt:"¿STP busca una topología activa sin ciclos? sí/no",answer:"si",hint:"Construye un spanning tree lógico."},
      {level:3,label:"Difícil",prompt:"¿Un puerto no-forwarding por STP implica necesariamente link down físico? sí/no",answer:"no",hint:"Estado lógico y estado físico son distintos."}
    ]
  },

  "lan-mtu": {
    id:"lan-mtu",courseId:17,title:"MTU, tamaño de frame y Path MTU",shortTitle:"1500 bytes no es el tamaño de todo Ethernet",duration:105,
    objective:"distinguir link MTU, payload IP, tamaño de frame y Path MTU, y razonar sobre fragmentación/PMTUD sin sumar cabeceras equivocadas.",
    summary:["La MTU de un enlace describe el tamaño máximo de unidad de capa superior que ese enlace puede transportar según su contrato; no es necesariamente el tamaño total en el cable.","Ethernet/IP usa habitualmente MTU 1500 para el datagrama IP en Ethernet estándar, pero headers, tags y FCS añaden bytes fuera de ese payload.","Path MTU es el mínimo relevante a lo largo de un camino L3; no es idéntico a la MTU del primer enlace."],
    concept:"MTU es un límite de interfaz/capa, no una constante cósmica llamada 1500. Al calcular tamaños hay que declarar si hablamos de IP packet, Ethernet payload, MAC frame, bytes on-wire o jumbo configuration.",
    diagram:[],rules:["MTU ≠ tamaño total on-wire.","Link MTU ≠ Path MTU.","Jumbo frames no tienen un único tamaño universal estándar interoperable en todas las redes."],
    deep:{sections:[
      {title:"Ethernet e IP",body:"RFC 894 estableció 1500 octets como máximo de datagrama IP sobre Ethernet clásico. Ese valor no incluye toda la sobrecarga física/MAC y no convierte 1500 en tamaño total de frame."},
      {title:"Path MTU",body:"El camino puede contener enlaces con MTU menores. IPv4 PMTUD y mecanismos modernos asociados intentan evitar enviar unidades que no atraviesen el path sin fragmentación problemática."},
      {title:"Jumbo",body:"Muchos equipos soportan MTU mayores de 1500, pero el valor concreto y la interoperabilidad dependen de la infraestructura. Una sola interfaz mal configurada puede crear black holes o fragmentación."}
    ],commonErrors:["Sumar 14 bytes al MTU y llamar al resultado 'MTU Ethernet'.","Asumir que MTU 9000 significa exactamente el mismo máximo de frame en todos los vendors."],connections:["IPv4","IPv6","TCP"]},
    example:{problem:"Interfaz Ethernet MTU 1500 transporta IPv4 sin opciones y TCP sin opciones.",steps:[["Paso 1","IPv4 header típico: 20 bytes."],["Paso 2","TCP header típico: 20 bytes."],["Paso 3","MSS típico resultante: 1500−20−20=1460 bytes, antes de opciones." ]],answer:"MSS y MTU son límites de capas distintas."},
    check:{question:"¿MTU 1500 significa que todo el frame Ethernet completo ocupa exactamente 1500 bytes?",options:[["No",true],["Sí",false],["Solo con IPv6",false]],success:"Correcto.",failure:"La MTU describe el payload de capa superior según el enlace, no toda la sobrecarga MAC/PHY."},
    practice:[
      {level:1,label:"Básico",prompt:"MTU 1500, IPv4 20 B, TCP 20 B: MSS típico sin opciones.",answer:"1460",hint:"1500−20−20."},
      {level:2,label:"Normal",prompt:"¿Path MTU puede ser menor que la MTU de tu NIC local? sí/no",answer:"si",hint:"Otro enlace del camino puede imponer un límite menor."},
      {level:3,label:"Difícil",prompt:"¿'jumbo frame' implica un tamaño único universal como 9000 exactos en toda implementación? sí/no",answer:"no",hint:"Es dependiente de soporte/configuración."}
    ]
  },

  "lan-integration": {
    id:"lan-integration",courseId:17,title:"Reto integrador: seguir una trama por una LAN conmutada",shortTitle:"De ARP al switch sin mezclar tablas",duration:125,
    objective:"seguir una comunicación IPv4 dentro y fuera de una VLAN, identificando routing decision, ARP cache, FDB, flooding, tagging, STP y límites MTU.",
    summary:["El host decide next hop con routing; ARP resuelve IPv4→MAC local; el switch usa MAC→puerto en su FDB.","VLAN determina el dominio L2; STP controla topología activa de bridging; ninguno sustituye routing IP.","MTU condiciona el tamaño transportable, mientras el forwarding decide por dónde viaja la trama."],
    concept:"Una LAN real funciona porque varias tablas con llaves diferentes cooperan: routing table, neighbor/ARP cache y bridge FDB. Si las llamamos a todas 'tabla de red', el troubleshooting se convierte rápidamente en arqueología.",
    diagram:[],rules:["Identifica siempre qué tabla consulta cada actor.","Distingue next hop IP de destination MAC de la trama.","Mantén VLAN/STP/MTU como restricciones distintas."],
    deep:{sections:[
      {title:"Host",body:"Consulta routing para elegir interfaz/next hop y neighbor cache/ARP para resolver la dirección MAC del next hop."},
      {title:"Switch",body:"Aprende source MAC, consulta FDB para destination MAC y reenvía/flooding dentro de la VLAN y estados permitidos por STP."},
      {title:"Router",body:"Termina el frame L2 recibido, procesa el paquete IP, decrementa TTL/hop semantics según protocolo y crea un nuevo frame para el siguiente enlace."}
    ],commonErrors:["Pensar que el switch consulta la tabla de rutas IP para cada frame L2 ordinario.","Pensar que la MAC del frame permanece extremo a extremo a través de routers."],connections:["ARP","VLAN","IP","Routing"]},
    example:{problem:"A en VLAN 10 envía un paquete a un servidor remoto vía gateway G.",steps:[["Paso 1","A decide con routing que el next hop es G."],["Paso 2","A usa ARP/cache para obtener MAC(G) y crea frame dst=MAC(G), payload=IP hacia servidor."],["Paso 3","Los switches usan FDB/VLAN/STP para llevar el frame a G."],["Paso 4","G desencapsula L2, enruta IP y construye otro frame en el siguiente enlace." ]],answer:"La IP destino puede mantenerse mientras las direcciones MAC cambian hop a hop."},
    check:{question:"¿La FDB de un switch y la ARP cache de un host responden la misma pregunta?",options:[["No",true],["Sí",false],["Solo en una VLAN",false]],success:"Correcto.",failure:"FDB: MAC→puerto/contexto; ARP: IPv4→dirección de enlace."},
    practice:[
      {level:1,label:"Básico",prompt:"¿El switch aprende normalmente source MAC mientras el host ARP resuelve IPv4→MAC? sí/no",answer:"si",hint:"Son mecanismos complementarios."},
      {level:2,label:"Normal",prompt:"¿Un router suele crear un nuevo frame L2 al reenviar un paquete a otro enlace? sí/no",answer:"si",hint:"La encapsulación L2 es por enlace."},
      {level:3,label:"Difícil",prompt:"¿STP por sí solo enruta tráfico IPv4 entre VLAN 10 y VLAN 20? sí/no",answer:"no",hint:"STP controla topología de bridging, no routing L3."}
    ]
  }
});
