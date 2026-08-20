/**
 * BLOQUE 018 — Internet Protocol
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar direccionamiento, selección de ruta, forwarding,
 * resolución del siguiente salto y configuración. IP mueve datagramas entre
 * interfaces; no convierte ARP/ND, ICMP, NAT o DHCP en "partes del routing".
 */

window.LEARNING_PATHS[18] = {
  level: "Experto progresivo",
  estimatedHours: 59,
  description: "IPv4 e IPv6 desde direccionamiento y CIDR hasta forwarding, ICMP, fragmentación, NAT y DHCP, con énfasis en modelos de capa y diagnóstico.",
  outcomes: [
    "Calcular y justificar prefijos IPv4/IPv6, subredes, rangos y agregación CIDR sin recurrir a clases históricas.",
    "Explicar cómo una tabla de rutas selecciona una ruta mediante longest-prefix match y cómo se resuelve el siguiente salto local.",
    "Diagnosticar TTL/Hop Limit, ICMP, Path MTU y fragmentación distinguiendo control, forwarding y enlace.",
    "Analizar NAT y DHCP como mecanismos de traducción/configuración, no como sustitutos conceptuales del direccionamiento y routing IP."
  ],
  modules: [
    { id: "m1-addressing", title: "Direccionamiento y prefijos", description: "IPv4, máscaras, CIDR e IPv6.", lessons: ["ip-ipv4-addressing", "ip-subnetting-cidr", "ip-ipv6-addressing"] },
    { id: "m2-forwarding", title: "Forwarding y routing", description: "Gateway, tablas, LPM y vida del datagrama.", lessons: ["ip-routing-table", "ip-forwarding-lpm-ttl"] },
    { id: "m3-control", title: "Control y diagnóstico", description: "ICMP y fragmentación/PMTU.", lessons: ["ip-icmp", "ip-fragmentation-pmtu"] },
    { id: "m4-edge-config", title: "Traducción y configuración", description: "NAT, DHCP y convivencia IPv4/IPv6.", lessons: ["ip-nat", "ip-dhcp", "ip-ipv6-nd", "ip-dual-stack"] },
    { id: "m5-integration", title: "Integración", description: "Seguir un datagrama extremo a extremo.", lessons: ["ip-integration"] }
  ]
};

Object.assign(window.LESSONS, {
  "ip-ipv4-addressing": {
    id:"ip-ipv4-addressing", courseId:18, title:"IPv4: direcciones, interfaces y prefijos", shortTitle:"Una IP identifica una interfaz en un contexto", duration:100,
    objective:"interpretar una dirección IPv4 junto con su prefijo y distinguir dirección de host, red, broadcast y alcance sin usar el modelo classful como regla moderna.",
    summary:["IPv4 usa direcciones de 32 bits; su interpretación de red/host depende del prefijo, no de clases A/B/C modernas.","Una dirección IP se asigna a una interfaz o entidad lógica; no es una identidad eterna de una máquina.","Dirección, prefijo y topología deben analizarse juntas para decidir si un destino es on-link o requiere next hop."],
    concept:"`192.0.2.17` aislado dice menos de lo que parece. Con `/24` pertenece al prefijo `192.0.2.0/24`; con `/28`, al prefijo `192.0.2.16/28`. IP no adivina la frontera de subred mirando la primera octava como si aún viviéramos en 1992.",
    diagram:[], rules:["Usa prefijos CIDR, no clases históricas, para razonar sobre redes modernas.","No confundas dirección de interfaz con identidad física del host.","El broadcast dirigido es un concepto IPv4; IPv6 no tiene broadcast."],
    deep:{sections:[
      {title:"32 bits y prefijo",body:"Una dirección IPv4 tiene 32 bits. El prefijo indica cuántos bits iniciales participan en la identificación de la red para esa ruta/subred. Los bits restantes forman la parte variable dentro de ese prefijo."},
      {title:"Network y broadcast",body:"En un /n convencional, poner a 0 los bits host da la dirección de red y ponerlos a 1 da el broadcast dirigido del prefijo. Esas direcciones no se tratan como hosts ordinarios en el modelo clásico de subred IPv4."},
      {title:"Contexto",body:"La misma dirección numérica puede aparecer en redes privadas distintas; la utilidad de una IP depende de su contexto de routing y alcance. NAT no convierte una dirección privada en 'menos IP': cambia la traducción/visibilidad."}
    ],commonErrors:["Aplicar clases A/B/C a CIDR moderno.","Decir que una IP pertenece a una tarjeta para siempre."],connections:["CIDR","Routing","ARP"]},
    example:{problem:"Determina red y broadcast de 192.0.2.77/27.",steps:[["Paso 1","/27 deja 5 bits host: bloques de 32 direcciones."],["Paso 2","77 cae en el bloque 64–95."],["Paso 3","Red=192.0.2.64; broadcast=192.0.2.95."]],answer:"192.0.2.64/27; broadcast 192.0.2.95."},
    check:{question:"¿192.0.2.10 pertenece siempre a una red /24 por empezar por 192?",options:[["No",true],["Sí",false],["Solo en Ethernet",false]],success:"Correcto.",failure:"La longitud de prefijo define la frontera de red en CIDR."},
    practice:[
      {level:1,label:"Básico",prompt:"¿IPv4 tiene 32 bits por dirección? sí/no",answer:"si",hint:"Cuatro octetos."},
      {level:2,label:"Normal",prompt:"Red de 10.0.0.141/26 (solo dirección)",answer:"10.0.0.128",hint:"/26 crea bloques de 64."},
      {level:3,label:"Difícil",prompt:"Broadcast de 172.16.9.201/29",answer:"172.16.9.207",hint:"/29 crea bloques de 8."}
    ]
  },

  "ip-subnetting-cidr": {
    id:"ip-subnetting-cidr", courseId:18, title:"Subredes, máscaras y CIDR", shortTitle:"Prefijos como conjuntos de direcciones", duration:115,
    objective:"calcular máscaras/prefijos, tamaños de bloques, solapamiento y agregación utilizando operaciones binarias y razonamiento de prefijos.",
    summary:["CIDR representa un prefijo como dirección/longitud, por ejemplo 203.0.113.0/24.","Una máscara IPv4 equivalente contiene n unos iniciales y 32−n ceros para un /n convencional.","La agregación solo es válida cuando los prefijos cubiertos son contiguos y comparten los bits comunes necesarios."],
    concept:"CIDR es más que escribir una barra: transforma el routing en operaciones sobre prefijos. Dos rutas pueden solaparse; la más específica gana en forwarding. La aritmética de subnetting es álgebra binaria con mala reputación por culpa de ejercicios hechos a mano a las 8:00.",
    diagram:[],rules:["/n significa n bits iniciales de prefijo.","No agregues rangos que no estén alineados con el prefijo resultante.","Más direcciones en un bloque no implica más rutas instaladas: la agregación puede reducir estado."],
    deep:{sections:[
      {title:"Máscara",body:"Para /26, la máscara es 255.255.255.192 porque los últimos 8 bits son 11000000. El AND bit a bit entre dirección y máscara produce el prefijo de red."},
      {title:"Cardinalidad",body:"Un prefijo IPv4 /n cubre 2^(32−n) direcciones. La cantidad de direcciones utilizables como hosts depende del contexto y no debe reducirse mecánicamente en todos los tipos de enlace."},
      {title:"Agregación",body:"192.0.2.0/25 y 192.0.2.128/25 comparten los primeros 24 bits y forman 192.0.2.0/24. Dos /25 no alineados o no contiguos no forman automáticamente un /24."}
    ],commonErrors:["Restar siempre dos direcciones sin atender al tipo de subnet/enlace.","Creer que /24 es sinónimo de 'clase C'."],connections:["Big O de tablas","LPM","BGP futuro"]},
    example:{problem:"¿Pueden agregarse 198.51.100.0/25 y 198.51.100.128/25?",steps:[["Paso 1","Ambos son bloques de 128 direcciones."],["Paso 2","Son contiguos y están alineados en la frontera /24."],["Paso 3","Comparten los primeros 24 bits."]],answer:"Sí: 198.51.100.0/24."},
    check:{question:"¿Un /20 cubre más direcciones que un /24?",options:[["Sí",true],["No",false],["Solo IPv6",false]],success:"Correcto.",failure:"Menor longitud de prefijo deja más bits variables."},
    practice:[
      {level:1,label:"Básico",prompt:"¿Cuántas direcciones contiene un /30 IPv4?",answer:"4",hint:"2^(32−30)."},
      {level:2,label:"Normal",prompt:"Máscara decimal de /23",answer:"255.255.254.0",hint:"23 unos iniciales."},
      {level:3,label:"Difícil",prompt:"¿10.0.0.0/24 y 10.0.1.0/24 pueden agregarse exactamente como 10.0.0.0/23? sí/no",answer:"si",hint:"Comprueba contigüidad y alineación."}
    ]
  },

  "ip-ipv6-addressing": {
    id:"ip-ipv6-addressing", courseId:18, title:"IPv6: 128 bits, prefijos y tipos de dirección", shortTitle:"IPv6 no es IPv4 con más dígitos", duration:115,
    objective:"leer y comprimir direcciones IPv6, distinguir unicast/multicast/anycast y razonar sobre prefijos y alcance.",
    summary:["IPv6 usa direcciones de 128 bits y notación hexadecimal separada por dos puntos.","La compresión `::` puede sustituir una única secuencia contigua de grupos cero en una representación textual.","IPv6 no tiene broadcast; utiliza multicast y otros mecanismos como Neighbor Discovery."],
    concept:"IPv6 amplía el espacio de direcciones y también cambia detalles del protocolo. La cabecera base es distinta, la fragmentación por routers desaparece y el descubrimiento local usa ICMPv6/ND. Tratarlo como 'IPv4 largo' funciona hasta que deja de funcionar, normalmente durante una incidencia.",
    diagram:[],rules:["Una dirección IPv6 tiene 128 bits.","`::` se usa una sola vez en una dirección textual porque debe poder reconstruirse sin ambigüedad.","No existe broadcast IPv6."],
    deep:{sections:[
      {title:"Representación",body:"Los 128 bits se muestran como ocho grupos hexadecimales de 16 bits. Se pueden omitir ceros iniciales de cada grupo y comprimir una secuencia de grupos cero con `::`; RFC 5952 recomienda una forma canónica para texto."},
      {title:"Tipos",body:"IPv6 define unicast, anycast y multicast. Las direcciones link-local permiten comunicación en el enlace local y no se enrutan globalmente como una dirección unicast global."},
      {title:"Prefijos",body:"IPv6 también usa longest-prefix match. /64 es extremadamente común en subredes de hosts por el diseño del ecosistema IPv6, pero el forwarding admite otras longitudes de prefijo según contexto."}
    ],commonErrors:["Buscar broadcast IPv6.","Afirmar que todo prefijo IPv6 debe ser /64, incluidos enlaces/router routes."],connections:["ND","ICMPv6","Routing"]},
    example:{problem:"Expande 2001:db8::25 a ocho grupos.",steps:[["Paso 1","Hay dos grupos explícitos a la izquierda y uno a la derecha."],["Paso 2","Faltan cinco grupos de 0000."],["Paso 3","Rellena hasta ocho grupos."]],answer:"2001:0db8:0000:0000:0000:0000:0000:0025"},
    check:{question:"¿IPv6 usa broadcast para Neighbor Discovery?",options:[["No",true],["Sí",false],["Solo /64",false]],success:"Correcto.",failure:"ND usa ICMPv6 y multicast, no broadcast IPv6."},
    practice:[
      {level:1,label:"Básico",prompt:"¿IPv6 tiene 128 bits por dirección? sí/no",answer:"si",hint:"Es cuatro veces la longitud de IPv4."},
      {level:2,label:"Normal",prompt:"¿Puede aparecer `::` dos veces en una misma dirección IPv6 textual válida? sí/no",answer:"no",hint:"Sería ambiguo cuánto comprime cada uno."},
      {level:3,label:"Difícil",prompt:"¿2001:db8::/32 es más específico que 2001:db8:1::/48? sí/no",answer:"no",hint:"Mayor longitud = más específico."}
    ]
  },

  "ip-routing-table": {
    id:"ip-routing-table", courseId:18, title:"Gateway, routing tables y next hop", shortTitle:"La ruta elige el siguiente salto", duration:105,
    objective:"interpretar una tabla de rutas y decidir interfaz/next hop para un destino, distinguiendo ruta conectada, gateway y ruta por defecto.",
    summary:["Una tabla/FIB contiene prefijos y acciones como interfaz y next hop.","Un default route es un prefijo /0 y solo gana si no existe coincidencia más específica.","Gateway/next hop debe ser alcanzable mediante la conectividad local o mecanismos equivalentes de la plataforma."],
    concept:"Routing responde primero '¿qué hago con esta dirección destino?'. Solo después el enlace resuelve cómo alcanzar al next hop. ARP no decide si usar Internet; esa decisión ya la tomó la ruta.",
    diagram:[],rules:["Consulta rutas antes de ARP/ND.","La ruta por defecto no tiene prioridad sobre rutas más específicas.","Next hop y destino final pueden ser direcciones distintas."],
    deep:{sections:[
      {title:"Rutas conectadas",body:"Una interfaz configurada con un prefijo suele introducir conocimiento de que ese prefijo es alcanzable directamente/on-link según el modelo del sistema. Para un destino on-link se resuelve al vecino final; para uno remoto se resuelve al gateway seleccionado."},
      {title:"Default route",body:"0.0.0.0/0 o ::/0 cubre cualquier destino, pero es el prefijo menos específico. Funciona como último recurso, no como 'la ruta principal que siempre se usa'."},
      {title:"RIB y FIB",body:"En sistemas complejos se distingue la información de routing aprendida/seleccionada de la estructura optimizada para forwarding. Esta separación se profundizará en BGP y routing global."}
    ],commonErrors:["Resolver por ARP al servidor remoto antes de mirar la ruta.","Creer que default route gana por tener métrica baja aunque exista un prefijo más específico."],connections:["ARP","ND","BGP"]},
    example:{problem:"Tabla: 10.0.0.0/8 directa; 10.4.0.0/16 vía 192.0.2.9; 0.0.0.0/0 vía 192.0.2.1. Destino 10.4.7.8.",steps:[["Paso 1","Coincide /8, /16 y /0."],["Paso 2","La coincidencia más específica es /16."],["Paso 3","Se usa next hop 192.0.2.9."]],answer:"Ruta 10.4.0.0/16 vía 192.0.2.9."},
    check:{question:"¿Una ruta /0 gana frente a una /24 coincidente por ser la 'default'?",options:[["No",true],["Sí",false],["Solo IPv6",false]],success:"Correcto.",failure:"Longest-prefix match prefiere la /24."},
    practice:[
      {level:1,label:"Básico",prompt:"¿0.0.0.0/0 puede coincidir con cualquier IPv4? sí/no",answer:"si",hint:"Cero bits fijos."},
      {level:2,label:"Normal",prompt:"Entre /8 y /20 coincidentes, ¿cuál es más específica?",answer:"/20",hint:"Más bits de prefijo."},
      {level:3,label:"Difícil",prompt:"¿El next hop de una ruta remota tiene que ser necesariamente igual al destino final? sí/no",answer:"no",hint:"Es el siguiente router/local hop."}
    ]
  },

  "ip-forwarding-lpm-ttl": {
    id:"ip-forwarding-lpm-ttl", courseId:18, title:"Forwarding, longest-prefix match y TTL/Hop Limit", shortTitle:"Cada router consume vida del datagrama", duration:110,
    objective:"seguir el forwarding de un datagrama por routers, aplicar longest-prefix match y explicar TTL/Hop Limit sin confundirlos con tiempo cronológico exacto.",
    summary:["Routers IPv4 deben seleccionar la coincidencia de prefijo más específica para forwarding unicast.","IPv4 TTL se decrementa durante forwarding; IPv6 usa Hop Limit con semántica explícita de saltos.","Al agotarse el campo, el paquete se descarta y normalmente puede generarse un mensaje ICMP apropiado."],
    concept:"TTL significa históricamente Time To Live, pero en Internet moderno se comporta esencialmente como contador de saltos de forwarding. IPv6 llamó al campo Hop Limit para que la nomenclatura dejara de fingir que el router lleva un cronómetro diminuto.",
    diagram:[],rules:["LPM antes de criterios entre rutas de igual prefijo según la implementación/protocolo.","TTL/Hop Limit evita loops infinitos de forwarding, no garantiza entrega.","No confundas hop count con latencia."],
    deep:{sections:[
      {title:"LPM",body:"Si un destino coincide con varias entradas, el forwarding usa la de prefijo más largo/más específico. Después pueden intervenir selección de next hops equivalentes y otros detalles, pero una /24 coincidente domina a una /16."},
      {title:"TTL",body:"IPv4 conserva el nombre TTL y se decrementa en routers; la práctica moderna lo trata como hop count. IPv6 define Hop Limit y cada nodo que forwardea decrementa el valor."},
      {title:"Traceroute",body:"Herramientas tipo traceroute explotan el agotamiento controlado de TTL/Hop Limit y respuestas ICMP para inferir saltos. Eso no significa que cada router esté obligado a contestar de forma visible ni que la ruta sea simétrica."}
    ],commonErrors:["Interpretar TTL=64 como 64 segundos.","Inferir distancia física directamente del hop count."],connections:["ICMP","Traceroute","BGP futuro"]},
    example:{problem:"Paquete IPv4 llega a un router con TTL=1.",steps:[["Paso 1","El router intenta forwardear y decrementa TTL."],["Paso 2","El valor expira."],["Paso 3","El datagrama se descarta y puede generarse ICMP Time Exceeded."]],answer:"No se reenvía al siguiente salto."},
    check:{question:"¿Un TTL inicial mayor reduce la latencia del camino?",options:[["No",true],["Sí",false],["Solo si hay NAT",false]],success:"Correcto.",failure:"TTL limita saltos; no acelera enlaces ni colas."},
    practice:[
      {level:1,label:"Básico",prompt:"TTL=5 atraviesa un router que lo reenvía. Valor posterior típico",answer:"4",hint:"Se decrementa por forwarding."},
      {level:2,label:"Normal",prompt:"Entre rutas /16 y /25 coincidentes, ¿cuál usa LPM?",answer:"/25",hint:"Más específica."},
      {level:3,label:"Difícil",prompt:"¿Dos caminos de 8 hops tienen necesariamente la misma latencia? sí/no",answer:"no",hint:"Hop count no mide propagación/colas."}
    ]
  },

  "ip-icmp": {
    id:"ip-icmp", courseId:18, title:"ICMP e ICMPv6: errores, diagnóstico y control", shortTitle:"ICMP no es simplemente ping", duration:105,
    objective:"interpretar mensajes ICMP/ICMPv6 y relacionarlos con forwarding, diagnóstico y Path MTU sin tratarlos como un transporte de aplicación ordinario.",
    summary:["ICMP acompaña a IP con mensajes de error y control/diagnóstico.","Echo Request/Reply es solo una familia de mensajes; Destination Unreachable y Time Exceeded son igualmente importantes.","ICMPv6 tiene un papel aún más estructural porque Neighbor Discovery y funciones IPv6 dependen de él."],
    concept:"Bloquear todo ICMP porque 'ping da miedo' es parecido a quitar las luces del salpicadero para que el coche no muestre averías. Algunas políticas pueden filtrar tipos concretos, pero ICMP participa en operación y diagnóstico de IP.",
    diagram:[],rules:["Ping usa ICMP Echo, pero ICMP no se reduce a ping.","Los mensajes ICMP describen problemas de entrega/control; no convierten IP en fiable.","ICMPv4 e ICMPv6 son protocolos relacionados pero no idénticos."],
    deep:{sections:[
      {title:"Errores",body:"Time Exceeded, Destination Unreachable y mensajes relacionados permiten informar a un origen sobre fallos encontrados al procesar datagramas. Hay reglas sobre cuándo generar errores para evitar cascadas de mensajes."},
      {title:"Echo",body:"Echo Request/Reply se usa en herramientas como ping para probar alcanzabilidad y RTT aproximado. La ausencia de respuesta no demuestra que el destino esté caído: puede existir filtrado o políticas diferentes."},
      {title:"ICMPv6",body:"ICMPv6 soporta errores y diagnóstico, además de mecanismos como Neighbor Discovery. Filtrarlo indiscriminadamente puede romper funciones esenciales de IPv6."}
    ],commonErrors:["Decir que ICMP usa puertos TCP/UDP.","Concluir 'host caído' solo porque no responde a ping."],connections:["Traceroute","PMTU","Neighbor Discovery"]},
    example:{problem:"Un router descarta un paquete porque su TTL expira.",steps:[["Paso 1","El forwarding detecta expiración."],["Paso 2","Descarta el paquete."],["Paso 3","Puede enviar ICMP Time Exceeded al origen."]],answer:"ICMP comunica el problema; no repara la ruta."},
    check:{question:"¿ICMP usa números de puerto TCP/UDP para identificar mensajes?",options:[["No",true],["Sí",false],["Solo Echo",false]],success:"Correcto.",failure:"ICMP es un protocolo de la capa IP y tiene tipos/códigos propios."},
    practice:[
      {level:1,label:"Básico",prompt:"¿ping suele usar ICMP Echo? sí/no",answer:"si",hint:"Echo Request/Reply."},
      {level:2,label:"Normal",prompt:"¿No recibir Echo Reply demuestra con certeza que el host está apagado? sí/no",answer:"no",hint:"Puede haber filtrado."},
      {level:3,label:"Difícil",prompt:"¿Bloquear indiscriminadamente ICMPv6 puede romper funciones normales de IPv6? sí/no",answer:"si",hint:"ND y otros mecanismos dependen de ICMPv6."}
    ]
  },

  "ip-fragmentation-pmtu": {
    id:"ip-fragmentation-pmtu", courseId:18, title:"Fragmentación IPv4, IPv6 y Path MTU", shortTitle:"No todos los routers pueden fragmentar", duration:115,
    objective:"explicar fragmentación y reensamblado en IPv4/IPv6, DF y Path MTU, distinguiendo MTU de enlace de MTU extremo a extremo.",
    summary:["IPv4 puede fragmentarse en tránsito cuando las reglas lo permiten; DF puede prohibirlo.","IPv6 routers no fragmentan paquetes; la fragmentación, si se usa, la realiza el nodo origen mediante Fragment header.","Path MTU Discovery intenta ajustar el tamaño a la MTU mínima relevante del camino."],
    concept:"Fragmentar un paquete no es partirlo en TCP segments. Es una operación de IP con sus propios metadatos y costes. IPv6 simplifica el forwarding de routers eliminando la fragmentación en tránsito, de modo que el origen debe adaptarse al camino.",
    diagram:[],rules:["IPv4 y IPv6 tienen reglas de fragmentación diferentes.","Reensamblar consume estado en el destino y perder un fragmento afecta al datagrama completo.","PMTU puede cambiar; no lo trates como constante eterna."],
    deep:{sections:[
      {title:"IPv4",body:"IPv4 incluye Identification, flags y Fragment Offset. Si un datagrama excede la MTU y DF no lo impide, un router puede fragmentarlo según las reglas aplicables. El reensamblado se realiza en el destino final."},
      {title:"IPv6",body:"RFC 8200 elimina la fragmentación por routers. El origen puede usar Fragment extension header si necesita fragmentar, y Path MTU Discovery ayuda a evitar tamaños problemáticos."},
      {title:"PMTU",body:"Path MTU es la menor MTU relevante a lo largo del camino. En IPv4/IPv6 los mecanismos de descubrimiento dependen de feedback ICMP apropiado; filtrar ese feedback puede generar black holes de MTU."}
    ],commonErrors:["Decir que routers IPv6 fragmentan como IPv4.","Confundir fragmentación IP con segmentación TCP."],connections:["MTU","ICMP","TCP"]},
    example:{problem:"Un paquete IPv6 es demasiado grande para un enlace del siguiente salto.",steps:[["Paso 1","El router no lo fragmenta."],["Paso 2","Descarta el paquete."],["Paso 3","Puede devolver ICMPv6 Packet Too Big con la MTU relevante para que el origen adapte tamaños."]],answer:"La adaptación corresponde al origen, no al router intermedio."},
    check:{question:"¿Un router IPv6 fragmenta en tránsito un paquete demasiado grande igual que IPv4 clásico?",options:[["No",true],["Sí",false],["Solo con NAT",false]],success:"Correcto.",failure:"En IPv6 la fragmentación la realiza el origen, no routers intermedios."},
    practice:[
      {level:1,label:"Básico",prompt:"¿El reensamblado IPv4 normal ocurre en el destino final? sí/no",answer:"si",hint:"Los routers no van reensamblando y refragmentando como pipeline ordinario."},
      {level:2,label:"Normal",prompt:"¿DF=1 en IPv4 permite a un router fragmentar libremente? sí/no",answer:"no",hint:"DF significa Don't Fragment."},
      {level:3,label:"Difícil",prompt:"¿Filtrar mensajes ICMP de MTU puede contribuir a un PMTU black hole? sí/no",answer:"si",hint:"El origen puede no aprender que debe reducir tamaño."}
    ]
  },

  "ip-nat": {
    id:"ip-nat", courseId:18, title:"NAT y NAPT: traducción, estado y límites", shortTitle:"NAT no es routing con otro nombre", duration:110,
    objective:"seguir traducciones NAT/NAPT, entender tablas de estado y distinguir conservación de conectividad, direccionamiento y seguridad.",
    summary:["NAT reescribe direcciones IP y, en NAPT/PAT, normalmente también identificadores de transporte como puertos.","La traducción suele mantener estado para relacionar flujos internos y externos.","NAT puede ocultar topología y restringir conectividad entrante por defecto, pero no sustituye una política de firewall."],
    concept:"NAT apareció como herramienta de traducción y conservación/gestión de direccionamiento IPv4. Que una conexión entrante espontánea falle por falta de mapping no convierte NAT en un sistema de autorización de alta seguridad; simplemente significa que no existe traducción adecuada.",
    diagram:[],rules:["Distingue NAT de firewall.","Distingue dirección privada de no-enrutable globalmente, no de 'dirección falsa'.","La traducción rompe la transparencia extremo a extremo y puede exigir mecanismos auxiliares."],
    deep:{sections:[
      {title:"NAPT/PAT",body:"Muchos hosts pueden compartir una dirección IPv4 externa diferenciando mappings por protocolo/puertos y otros campos. El dispositivo mantiene una tabla que permite invertir la traducción para respuestas."},
      {title:"Estado",body:"Los mappings tienen lifetime y reglas de creación. Protocolos que transportan direcciones/puertos dentro del payload o que esperan conectividad entrante pueden necesitar traversal, helpers o señalización adicional."},
      {title:"Seguridad",body:"El comportamiento stateful puede reducir exposición accidental, pero una política de firewall expresa qué tráfico se permite. NAT por sí solo no autentica, cifra ni elimina vulnerabilidades del servicio."}
    ],commonErrors:["Afirmar que NAT es un firewall.","Creer que NAT es requisito de IPv6."],connections:["TCP/UDP","Firewalls futuros","IPv6"]},
    example:{problem:"Host 10.0.0.5:53000 conecta a 198.51.100.20:443 mediante NAPT.",steps:[["Paso 1","NAT crea mapping interno→externo, por ejemplo 203.0.113.8:40001."],["Paso 2","Reescribe cabeceras y checksums que correspondan."],["Paso 3","La respuesta a 203.0.113.8:40001 se asocia al mapping y se traduce a 10.0.0.5:53000."]],answer:"El estado de traducción mantiene la asociación del flujo."},
    check:{question:"¿NAT cifra automáticamente el tráfico traducido?",options:[["No",true],["Sí",false],["Solo HTTPS",false]],success:"Correcto.",failure:"Traducción de direcciones/puertos no es cifrado."},
    practice:[
      {level:1,label:"Básico",prompt:"¿NAPT puede reescribir puertos además de direcciones? sí/no",answer:"si",hint:"También se conoce como PAT en muchos contextos."},
      {level:2,label:"Normal",prompt:"¿Una dirección RFC1918 es inválida dentro de una red privada? sí/no",answer:"no",hint:"Tiene un alcance de uso definido."},
      {level:3,label:"Difícil",prompt:"¿NAT garantiza que una aplicación expuesta no tenga vulnerabilidades? sí/no",answer:"no",hint:"Traducción y seguridad de aplicación son problemas distintos."}
    ]
  },

  "ip-dhcp": {
    id:"ip-dhcp", courseId:18, title:"DHCP: configuración dinámica y leases", shortTitle:"DHCP entrega configuración, no crea routing", duration:105,
    objective:"seguir el ciclo DHCPv4, interpretar leases/opciones/relay y distinguir configuración automática de forwarding y resolución local.",
    summary:["DHCPv4 proporciona un framework para asignar direcciones reutilizables y otros parámetros de configuración.","El intercambio clásico se resume como Discover, Offer, Request y Ack, aunque el protocolo tiene más estados y mensajes.","DHCP relay permite atravesar fronteras L3 sin requerir un servidor en cada broadcast domain."],
    concept:"DHCP puede darte dirección, prefijo/máscara, router y DNS. Eso no significa que el servidor DHCP sea tu gateway ni que configure mágicamente cada router intermedio. Es el recepcionista de configuración, no el chófer de cada paquete.",
    diagram:[],rules:["Lease es temporal y tiene estados de renovación/rebinding.","Default gateway y DNS son opciones/configuración distintas.","DHCPv4 y DHCPv6 no son simplemente el mismo protocolo con direcciones más largas."],
    deep:{sections:[
      {title:"DORA",body:"Discover→Offer→Request→ACK es una simplificación útil del establecimiento inicial DHCPv4. Se usan campos y opciones para identificar cliente, dirección ofrecida, servidor y configuración."},
      {title:"Leases",body:"Una dirección puede asignarse durante un intervalo y el cliente intenta renovarla antes de expirar. Esto permite reutilización y cambio administrado de configuración."},
      {title:"Relay",body:"Los broadcasts DHCPv4 iniciales no cruzan routers por sí mismos. Un relay recoge solicitudes del segmento y las reenvía al servidor con información que permite seleccionar el pool apropiado."}
    ],commonErrors:["Decir que DHCP usa ARP para enrutar Internet.","Suponer que DNS y gateway son la misma opción."],connections:["UDP","Relay","IPv6 autoconfiguration"]},
    example:{problem:"Una empresa tiene 20 VLANs y un solo servidor DHCP central.",steps:[["Paso 1","Los clientes emiten DHCP localmente."],["Paso 2","El router/SVI de cada VLAN actúa como relay."],["Paso 3","El servidor elige configuración/pool según la información de relay y responde a través de éste."]],answer:"No hace falta un servidor físico en cada VLAN."},
    check:{question:"¿El servidor DHCP tiene que estar físicamente en el mismo broadcast domain si existe relay correctamente configurado?",options:[["No",true],["Sí",false],["Solo IPv6",false]],success:"Correcto.",failure:"DHCP relay permite centralizar servidores."},
    practice:[
      {level:1,label:"Básico",prompt:"En DORA, ¿qué mensaje viene normalmente después de Discover?",answer:"offer",hint:"El servidor ofrece configuración."},
      {level:2,label:"Normal",prompt:"¿Una lease DHCP es necesariamente permanente? sí/no",answer:"no",hint:"Tiene lifetime y renovación."},
      {level:3,label:"Difícil",prompt:"¿DHCP puede entregar DNS y default gateway como parámetros distintos? sí/no",answer:"si",hint:"Son opciones diferentes."}
    ]
  },

  "ip-ipv6-nd": {
    id:"ip-ipv6-nd", courseId:18, title:"IPv6 Neighbor Discovery: vecinos, routers y alcance local", shortTitle:"ND sustituye más de una pieza de IPv4", duration:110,
    objective:"explicar Neighbor Discovery, resolución de enlace y descubrimiento de routers en IPv6 sin reducirlo a 'ARP para IPv6'.",
    summary:["IPv6 Neighbor Discovery usa ICMPv6 para descubrir vecinos, direcciones de enlace, routers y mantener reachability.","ND usa mensajes como Neighbor Solicitation/Advertisement y Router Solicitation/Advertisement.","ARP no se usa para resolución de vecinos IPv6."],
    concept:"Decir 'ND es ARP de IPv6' ayuda durante treinta segundos y luego empieza a borrar funciones importantes. ND también participa en descubrimiento de routers, reachability y autoconfiguración; es una familia de mecanismos más amplia.",
    diagram:[],rules:["IPv6 usa ND/ICMPv6, no ARP.","Neighbor cache no es routing table.","Router Advertisement no convierte cualquier prefijo anunciado en una verdad eterna; existen lifetimes y reglas de procesamiento."],
    deep:{sections:[
      {title:"Neighbor Solicitation/Advertisement",body:"Permiten resolver direcciones de capa de enlace y comprobar reachability de vecinos. Se apoyan en multicast en lugar del broadcast ARP tradicional de IPv4."},
      {title:"Router Discovery",body:"Router Solicitation/Advertisement permite a hosts descubrir routers y parámetros del enlace. Los RA pueden participar en Stateless Address Autoconfiguration según flags/opciones y políticas."},
      {title:"Caches y seguridad",body:"La neighbor cache contiene estado de vecinos y reachability, separado de rutas. Como otros protocolos locales, ND tiene consideraciones de seguridad y no debe tratarse como autenticación criptográfica implícita."}
    ],commonErrors:["Llamar ARP a cualquier resolución IPv6.","Confundir RA con DHCPv6."],connections:["ICMPv6","SLAAC","DHCPv6"]},
    example:{problem:"Host IPv6 necesita enviar a un vecino on-link cuya dirección L2 desconoce.",steps:[["Paso 1","La ruta determina que el destino/next hop es on-link."],["Paso 2","ND envía Neighbor Solicitation apropiada."],["Paso 3","Neighbor Advertisement permite poblar/actualizar la neighbor cache."]],answer:"Routing decide el next hop; ND resuelve el vecino local."},
    check:{question:"¿IPv6 usa ARP para resolver una dirección MAC?",options:[["No",true],["Sí",false],["Solo link-local",false]],success:"Correcto.",failure:"IPv6 usa Neighbor Discovery sobre ICMPv6."},
    practice:[
      {level:1,label:"Básico",prompt:"¿ND usa ICMPv6? sí/no",answer:"si",hint:"Es parte estructural de IPv6."},
      {level:2,label:"Normal",prompt:"¿Neighbor cache y routing table son la misma estructura conceptual? sí/no",answer:"no",hint:"Una resuelve vecinos; otra destinos/prefijos."},
      {level:3,label:"Difícil",prompt:"¿Router Advertisement y DHCPv6 son exactamente el mismo mecanismo? sí/no",answer:"no",hint:"Pueden coexistir y tienen responsabilidades distintas."}
    ]
  },

  "ip-dual-stack": {
    id:"ip-dual-stack", courseId:18, title:"IPv4 e IPv6 en coexistencia", shortTitle:"Dual stack son dos planos IP, no una traducción mágica", duration:95,
    objective:"razonar sobre hosts dual-stack, selección de rutas y transición IPv4/IPv6 sin asumir equivalencia entre protocolos o necesidad universal de NAT.",
    summary:["Un host dual-stack mantiene capacidades IPv4 e IPv6 y puede tener rutas/configuración independientes para cada familia.","IPv6 no necesita NAT para funcionar extremo a extremo; las redes pueden usar firewalls stateful sin traducir direcciones.","Mecanismos de transición incluyen dual stack, tunneling y traducción, cada uno con trade-offs."],
    concept:"Dual stack no transforma automáticamente un paquete IPv4 en IPv6. Son dos familias de red que una aplicación/sistema puede seleccionar según DNS, política, conectividad y algoritmos de selección de direcciones.",
    diagram:[],rules:["No confundas dual stack con NAT64.","IPv4 default route e IPv6 default route son entradas distintas.","La existencia de IPv6 no implica que todas las aplicaciones/caminos funcionen por IPv6."],
    deep:{sections:[
      {title:"Dos familias",body:"El host puede tener 0.0.0.0/0 vía un router IPv4 y ::/0 vía un router IPv6, con vecinos y mecanismos de resolución diferentes. La pila de red decide por familia según la dirección destino seleccionada."},
      {title:"DNS y selección",body:"Un nombre puede publicar A, AAAA o ambos. Resolver ambos no garantiza que ambos caminos sean igualmente utilizables; sistemas modernos aplican políticas y estrategias para evitar esperas excesivas."},
      {title:"Transición",body:"NAT64/DNS64, túneles y otros mecanismos resuelven escenarios concretos. Deben explicarse como traducción/encapsulación, no como propiedades inherentes del protocolo IPv6."}
    ],commonErrors:["Afirmar que IPv6 requiere NAT.","Suponer que tener AAAA garantiza conectividad IPv6 extremo a extremo."],connections:["DNS","NAT64","Happy Eyeballs futuro"]},
    example:{problem:"Host tiene rutas por defecto IPv4 e IPv6 y un nombre devuelve A y AAAA.",steps:[["Paso 1","El resolver entrega candidatos."],["Paso 2","El sistema/aplicación selecciona y prueba según política."],["Paso 3","Cada familia usa su propia ruta y resolución de vecino."]],answer:"No existe una única 'ruta default' compartida entre familias."},
    check:{question:"¿Un host dual-stack convierte automáticamente cada paquete IPv4 en IPv6?",options:[["No",true],["Sí",false],["Solo con DHCP",false]],success:"Correcto.",failure:"Dual stack mantiene soporte para ambas familias; traducción es otro mecanismo."},
    practice:[
      {level:1,label:"Básico",prompt:"¿::/0 es una ruta por defecto IPv6? sí/no",answer:"si",hint:"Prefijo de longitud cero IPv6."},
      {level:2,label:"Normal",prompt:"¿IPv6 necesita NAT obligatoriamente para acceso a Internet? sí/no",answer:"no",hint:"NAT y IPv6 son conceptos independientes."},
      {level:3,label:"Difícil",prompt:"¿Una entrada DNS AAAA demuestra por sí sola que el camino IPv6 funciona? sí/no",answer:"no",hint:"DNS publica una dirección; no valida el camino."}
    ]
  },

  "ip-integration": {
    id:"ip-integration", courseId:18, title:"Integración: seguir un datagrama de host a host", shortTitle:"Ruta, vecino, frame, router, repetir", duration:120,
    objective:"seguir extremo a extremo un envío IP separando decisión de ruta, resolución del next hop, encapsulación L2, forwarding, TTL/Hop Limit y posibles mensajes ICMP.",
    summary:["Cada host/router decide el siguiente salto usando información de routing/FIB.","En cada enlace se crea una encapsulación L2 adecuada al next hop; las direcciones L2 pueden cambiar mientras la IP destino extremo a extremo permanece.","NAT, fragmentación o túneles pueden modificar esta visión y deben declararse explícitamente."],
    concept:"El modelo útil es repetitivo: **ruta → next hop → resolución local → frame → forwarding**. Si puedes seguir esa secuencia, Internet deja de parecer una nube con flechas y empieza a parecer una máquina distribuida que comete errores de forma bastante organizada.",
    diagram:[],rules:["Primero routing, después resolución de vecino.","MAC cambia por enlace; IP destino normalmente no cambia salvo traducción/túneles u otros mecanismos explícitos.","TTL/Hop Limit cambia en cada forwarding de router."],
    deep:{sections:[
      {title:"Host origen",body:"La aplicación produce datos para una dirección destino. IP consulta la ruta. Si el next hop es un gateway, ARP/ND resuelve al gateway y la NIC envía una trama dirigida a su dirección L2."},
      {title:"Router",body:"El router recibe, desencapsula la trama L2, valida/procesa IP, decrementa TTL/Hop Limit, realiza LPM, selecciona salida/next hop y crea una nueva encapsulación para el siguiente enlace."},
      {title:"Destino",body:"El último router resuelve al host destino en su enlace. El host recibe la trama, procesa IP y entrega el payload al protocolo superior indicado. Ningún switch intermedio necesitó conocer la semántica TCP de la aplicación."}
    ],commonErrors:["Conservar la MAC destino original a través de routers.","Hacer ARP para una IP remota que se alcanza vía gateway."],connections:["Ethernet","TCP/UDP","Routing global"]},
    example:{problem:"A en 10.0.0.10/24 envía a 203.0.113.7 por gateway 10.0.0.1.",steps:[["Paso 1","A elige default route y resuelve MAC de 10.0.0.1."],["Paso 2","Primer frame: dst MAC=gateway, dst IP=203.0.113.7."],["Paso 3","Cada router rehace L2, decrementa TTL y selecciona siguiente ruta."],["Paso 4","En la red final, el último router resuelve al host 203.0.113.7 y entrega el frame local."]],answer:"IP extremo y enlace local cumplen responsabilidades diferentes."},
    check:{question:"¿La MAC destino del primer frame hacia Internet suele ser la MAC del servidor remoto?",options:[["No",true],["Sí",false],["Siempre con NAT",false]],success:"Correcto.",failure:"En una red Ethernet local suele ser la MAC del gateway/next hop."},
    practice:[
      {level:1,label:"Básico",prompt:"¿Un router normalmente crea una nueva cabecera L2 para el enlace de salida? sí/no",answer:"si",hint:"Cada enlace tiene su propia encapsulación."},
      {level:2,label:"Normal",prompt:"¿TTL/Hop Limit permanece idéntico al atravesar routers? sí/no",answer:"no",hint:"Se decrementa durante forwarding."},
      {level:3,label:"Difícil",prompt:"¿Un switch Ethernet intermedio necesita consultar la tabla de rutas IP para reenviar una trama ordinaria dentro de la VLAN? sí/no",answer:"no",hint:"El bridge usa su FDB de capa 2."}
    ]
  }
});
