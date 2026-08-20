/**
 * BLOQUE 019 — Routing e Internet global
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar topología, política y forwarding. BGP distribuye
 * alcanzabilidad entre sistemas autónomos; no es un algoritmo universal de
 * "camino más corto" ni describe por sí solo los acuerdos comerciales.
 */

window.LEARNING_PATHS[19] = {
  level: "Experto progresivo",
  estimatedHours: 64,
  description: "Internet interdominio desde sistemas autónomos y BGP hasta peering, transit, IXPs, anycast, CDN, balanceo y arquitectura de data centers.",
  outcomes: [
    "Explicar cómo los sistemas autónomos intercambian alcanzabilidad con BGP sin confundir política interdominio con métricas IGP.",
    "Analizar atributos, export policy, peering/transit, route servers y riesgos de route leaks con un modelo operacional coherente.",
    "Razonar sobre anycast, CDN y balanceo distinguiendo selección de ruta, selección de servicio y distribución de tráfico.",
    "Seguir una petición real a través de acceso, tránsito/peering, backbone, edge y data center identificando qué decisión ocurre en cada capa."
  ],
  modules: [
    { id: "m1-as-bgp", title: "Sistemas autónomos y BGP", description: "AS, sesiones, UPDATEs y política.", lessons: ["global-as-internet-graph", "global-bgp-sessions-updates", "global-bgp-attributes-policy"] },
    { id: "m2-interconnection", title: "Interconexión económica y técnica", description: "Peering, transit, IXPs y route servers.", lessons: ["global-peering-transit", "global-ixp-route-servers"] },
    { id: "m3-global-routing", title: "Routing global y resiliencia", description: "Escala, filtrado, RPKI y convergencia.", lessons: ["global-routing-scale-security", "global-convergence-observability"] },
    { id: "m4-service-placement", title: "Servicios distribuidos", description: "Anycast, CDN y load balancing.", lessons: ["global-anycast", "global-cdn", "global-load-balancing"] },
    { id: "m5-infrastructure", title: "Backbones y data centers", description: "Fabrics y recorrido completo.", lessons: ["global-backbone-datacenter", "global-integration"] }
  ]
};

Object.assign(window.LESSONS, {
  "global-as-internet-graph": {
    id: "global-as-internet-graph", courseId: 19,
    title: "Sistemas autónomos y el grafo de Internet",
    shortTitle: "Internet es una federación de políticas, no un router gigante",
    duration: 105,
    objective: "modelar Internet como interconexión de sistemas autónomos y distinguir ASN, prefijo, router, organización y dominio administrativo.",
    summary: [
      "Un Autonomous System (AS) es un dominio de routing bajo una política administrativa coherente y se identifica externamente mediante uno o más ASN según el diseño.",
      "BGP intercambia alcanzabilidad entre ASes; el grafo AS-level es una abstracción y no revela por sí solo la topología física interna.",
      "ASN, dirección IP, prefijo, router y empresa son identificadores/objetos distintos; forzar relaciones uno-a-uno entre ellos produce diagnósticos falsos."
    ],
    concept: "Una ruta global puede decir que un prefijo se alcanza a través de una secuencia de ASes sin decir qué fibra, qué chasis o qué ciudad atraviesa cada paquete. El mapa administrativo y el mapa físico se solapan, pero no son la misma cosa.",
    diagram: [],
    rules: [
      "No interpretes un ASN como si fuera un router concreto.",
      "No asumas que una organización opera exactamente un AS.",
      "El AS_PATH describe tránsito de información de routing a nivel AS; no es una lista exhaustiva de routers físicos."
    ],
    deep: { sections: [
      { title: "Qué abstrae un AS", body: "BGP necesita una unidad de política interdominio. Un AS agrupa redes cuya exportación/importación de rutas se administra como un dominio. Los ASN actuales pueden ser de cuatro octetos; la extensión correspondiente mantiene interoperabilidad con el BGP base." },
      { title: "Grafo AS-level", body: "Representar ASes como vértices y relaciones BGP como aristas es útil para estudiar conectividad y política, pero pierde routers internos, enlaces paralelos, MPLS, túneles, IXPs y detalles físicos. Un dibujo AS-level no debe leerse como un mapa de cables." },
      { title: "Prefijos y origen", body: "Un AS puede originar varios prefijos y un prefijo puede aparecer bajo escenarios de multihoming o cambios de origen. La afirmación operativa importante es qué origen/ruta se anuncia y acepta bajo una política determinada, no una supuesta propiedad eterna de la dirección." }
    ], commonErrors: ["ASN=empresa de forma uno-a-uno.", "AS_PATH=lista exacta de routers recorridos."], connections: ["CIDR", "BGP", "RPKI"] },
    example: { problem: "Una empresa tiene dos redes operadas con políticas distintas y dos ASN. ¿Es obligatorio fusionarlas porque pertenecen a la misma empresa?", steps: [["Paso 1", "La propiedad empresarial y el dominio de routing son conceptos distintos."], ["Paso 2", "BGP opera sobre políticas/ASNs, no sobre el CIF de la empresa."], ["Paso 3", "Pueden mantenerse ASes distintos si el diseño lo requiere."]], answer: "No. La relación organización↔AS no tiene que ser uno-a-uno." },
    check: { question: "¿Un ASN identifica necesariamente un único router físico?", options: [["No", true], ["Sí", false], ["Solo en IPv6", false]], success: "Correcto.", failure: "El ASN identifica un dominio AS, no un chasis." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿BGP es un protocolo inter-AS? sí/no", answer: "si", hint: "Ese es su papel central." },
      { level: 2, label: "Normal", prompt: "¿AS_PATH debe interpretarse como lista de routers físicos? sí/no", answer: "no", hint: "Trabaja a nivel de AS." },
      { level: 3, label: "Difícil", prompt: "¿Una misma organización puede operar más de un ASN? sí/no", answer: "si", hint: "Entidad administrativa y ASN no son identidad uno-a-uno." }
    ]
  },

  "global-bgp-sessions-updates": {
    id: "global-bgp-sessions-updates", courseId: 19,
    title: "BGP: sesiones, UPDATEs y modelo path-vector",
    shortTitle: "BGP anuncia alcanzabilidad incremental sobre sesiones",
    duration: 120,
    objective: "explicar el establecimiento de una sesión BGP, UPDATE/WITHDRAW, eBGP/iBGP y la función de AS_PATH sin reducir BGP a un algoritmo de distancia.",
    summary: [
      "BGP-4 intercambia Network Layer Reachability Information (NLRI) y atributos de camino sobre una sesión de transporte TCP.",
      "eBGP conecta normalmente ASes distintos; iBGP distribuye rutas BGP dentro de un AS sin convertir el IGP en BGP.",
      "AS_PATH contribuye a política y detección de loops inter-AS, pero la selección de ruta considera más información que su longitud."
    ],
    concept: "BGP no inunda el estado completo de todos los enlaces de Internet. Sus vecinos intercambian rutas y retiradas, cada AS aplica política y propaga solo aquello que decide exportar.",
    diagram: [],
    rules: [
      "No confundas sesión BGP con enlace físico: los peers necesitan reachability IP según el diseño, no un cable exclusivo.",
      "No afirmes que menor AS_PATH siempre gana; la política local puede decidir antes.",
      "iBGP no añade el ASN local al AS_PATH como lo hace la propagación inter-AS ordinaria."
    ],
    deep: { sections: [
      { title: "Mensajes y estado", body: "El BGP base define OPEN, UPDATE, NOTIFICATION y KEEPALIVE. UPDATE puede anunciar NLRI y retirar reachability. Tras converger, los cambios se distribuyen incrementalmente en vez de reenviar periódicamente una base completa por principio." },
      { title: "eBGP frente a iBGP", body: "eBGP expresa intercambio entre dominios AS. iBGP permite que routers del mismo AS compartan rutas externas manteniendo atributos necesarios para la política. La conectividad interna y el next-hop suelen depender de un IGP u otros mecanismos." },
      { title: "Path vector", body: "AS_PATH registra una secuencia/conjunto de información AS según el atributo y permite rechazar rutas donde el propio AS aparece en el camino. Esto evita un tipo importante de loop interdominio, pero no sustituye las políticas de import/export ni garantiza la mejor ruta física." }
    ], commonErrors: ["BGP envía toda la tabla cada pocos segundos.", "iBGP=eBGP pero dentro del mismo cableado."], connections: ["TCP", "AS_PATH", "Convergencia"] },
    example: { problem: "AS65010 recibe 203.0.113.0/24 con AS_PATH '65020 65030'. ¿Qué ocurre si la ruta recibida contiene 65010 en el AS_PATH?", steps: [["Paso 1", "65010 es el ASN local."], ["Paso 2", "Su presencia indica que la información ha atravesado ya ese AS en el path-vector."], ["Paso 3", "La ruta se rechaza por loop detection BGP en el caso ordinario."]], answer: "Debe rechazarse por contener el ASN local en AS_PATH." },
    check: { question: "¿BGP usa TCP para su sesión base?", options: [["Sí", true], ["No", false], ["Solo iBGP", false]], success: "Correcto.", failure: "BGP-4 utiliza TCP para la sesión de protocolo." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿UPDATE puede retirar reachability además de anunciarla? sí/no", answer: "si", hint: "Withdrawals forman parte del modelo." },
      { level: 2, label: "Normal", prompt: "¿iBGP y el IGP resuelven exactamente el mismo problema? sí/no", answer: "no", hint: "Uno distribuye rutas BGP; el otro suele resolver reachability interna." },
      { level: 3, label: "Difícil", prompt: "¿AS_PATH por sí solo codifica latencia física de extremo a extremo? sí/no", answer: "no", hint: "Cuenta/identifica ASes, no metros ni RTT." }
    ]
  },

  "global-bgp-attributes-policy": {
    id: "global-bgp-attributes-policy", courseId: 19,
    title: "Atributos BGP, selección y política",
    shortTitle: "BGP decide con política antes de parecerse a un GPS",
    duration: 135,
    objective: "razonar sobre atributos BGP y política de importación/exportación sin asumir un orden de selección específico de un fabricante como ley universal.",
    summary: [
      "BGP transporta atributos como AS_PATH, NEXT_HOP, ORIGIN, LOCAL_PREF y MED, además de extensiones como communities.",
      "La política local puede preferir una ruta por razones económicas u operativas aun si otra tiene un AS_PATH más corto.",
      "La selección exacta incluye pasos estandarizados y decisiones/knobs de implementación; al diagnosticar hay que conocer la política efectiva del router."
    ],
    concept: "En routing interdominio, 'mejor' significa 'la ruta seleccionada bajo mi política y las reglas aplicables', no 'la que recorrería menos kilómetros'. Internet es un sistema técnico donde las hojas de cálculo comerciales a veces tienen más peso que Pitágoras.",
    diagram: [],
    rules: [
      "No universalices el orden de tie-breakers de Cisco/Juniper/FRR como si fuera la RFC completa.",
      "LOCAL_PREF es local al AS y no se anuncia a peers eBGP ordinarios.",
      "MED es una señal, no una orden universal que otro AS deba obedecer."
    ],
    deep: { sections: [
      { title: "Atributos principales", body: "AS_PATH informa tránsito AS; NEXT_HOP indica el next hop BGP; LOCAL_PREF permite preferencia interna; MED puede sugerir un punto de entrada; communities transportan etiquetas de política. Cada atributo tiene reglas de propagación y alcance distintas." },
      { title: "Import policy y best path", body: "Al recibir rutas, una red puede filtrar, modificar preferencia o etiquetar. Después selecciona una ruta candidata según su proceso. Un AS_PATH más corto puede perder frente a una ruta con mayor LOCAL_PREF por diseño." },
      { title: "Export policy", body: "La ruta seleccionada no se exporta automáticamente a todo vecino. La política de salida decide qué prefijos/atributos anunciar, y esa política es central para mantener relaciones customer/provider/peer coherentes." }
    ], commonErrors: ["BGP siempre elige el AS_PATH más corto.", "MED obliga al vecino a entrar por donde yo digo."], connections: ["Peering", "Communities", "Route leaks"] },
    example: { problem: "Tienes ruta A con AS_PATH 64501 64502 y LOCAL_PREF 200; ruta B con AS_PATH 64503 y LOCAL_PREF 100. ¿Puede ganar A?", steps: [["Paso 1", "La política interna ha asignado preferencias distintas."], ["Paso 2", "LOCAL_PREF puede compararse antes de AS_PATH en la política/proceso habitual."], ["Paso 3", "La ruta con AS_PATH más largo puede ser elegida."]], answer: "Sí. Un AS_PATH más corto no domina toda política." },
    check: { question: "¿BGP debe escoger siempre la ruta geográficamente más corta?", options: [["No", true], ["Sí", false], ["Solo con IPv6", false]], success: "Correcto.", failure: "BGP es policy-based interdomain routing." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿LOCAL_PREF sirve para expresar preferencia dentro del AS? sí/no", answer: "si", hint: "Es un atributo pensado para esa política interna." },
      { level: 2, label: "Normal", prompt: "¿MED es una garantía contractual de que el vecino elegirá esa entrada? sí/no", answer: "no", hint: "Es una señal sujeta a política." },
      { level: 3, label: "Difícil", prompt: "¿Dos routers de proveedores distintos pueden tener políticas que seleccionen rutas diferentes al mismo prefijo? sí/no", answer: "si", hint: "La política local forma parte del resultado." }
    ]
  },

  "global-peering-transit": {
    id: "global-peering-transit", courseId: 19,
    title: "Peering, transit y relaciones customer/provider",
    shortTitle: "La conectividad global también es economía convertida en política",
    duration: 120,
    objective: "distinguir peering y transit, modelar relaciones provider/customer/peer y derivar políticas de exportación comunes sin presentarlas como leyes matemáticas del protocolo.",
    summary: [
      "Transit proporciona reachability hacia terceros bajo un acuerdo de servicio; peering intercambia tráfico/rutas entre redes según su acuerdo bilateral o multilateral.",
      "Las relaciones customer/provider/peer se traducen en políticas de importación y exportación que limitan qué reachability se propaga.",
      "El modelo valley-free es una aproximación operacional útil, no una restricción codificada de forma universal en BGP."
    ],
    concept: "Un peer no es simplemente 'otro router BGP'. Es una relación administrativa. Dos sesiones técnicamente idénticas a nivel TCP/BGP pueden llevar políticas completamente distintas porque una es customer-provider y otra peer-peer.",
    diagram: [],
    rules: [
      "No confundas peering con transit gratuito universal.",
      "Una red no debe exportar rutas de un peer a otro peer como transit accidental salvo que el acuerdo/política lo contemple.",
      "La relación comercial no está inferida de forma infalible solo mirando AS_PATH."
    ],
    deep: { sections: [
      { title: "Roles BGP", body: "RFC 9234 formaliza roles como Provider, Customer, Peer, Route Server y RS-Client para ayudar a prevenir/detectar route leaks. El protocolo puede transportar el rol de la sesión, pero la relación económica sigue siendo una decisión administrativa." },
      { title: "Política de exportación común", body: "Un patrón típico es anunciar rutas de clientes a proveedores/peers/clientes, pero anunciar rutas aprendidas de provider/peer solo a clientes. Así el AS ofrece transit a quien corresponde sin regalarlo entre terceros." },
      { title: "Multihoming", body: "Un cliente puede contratar varios upstreams y anunciar su prefijo por todos ellos. La entrada/salida efectiva depende de anuncios, atributos, filtros y políticas ajenas; 'tener dos proveedores' no garantiza 50/50 ni failover instantáneo." }
    ], commonErrors: ["Peer=proveedor barato.", "Multihoming=balanceo 50/50 garantizado."], connections: ["BGP Roles", "Route leaks", "IXP"] },
    example: { problem: "AS-C aprende una ruta de Peer P. ¿Debería anunciarla automáticamente a otro Peer Q en el modelo comercial común?", steps: [["Paso 1", "La ruta fue aprendida de un peer."], ["Paso 2", "Exportarla a otro peer convertiría a C en transit entre ambos."], ["Paso 3", "El modelo habitual evita esa exportación salvo acuerdo explícito."]], answer: "No, no en la política peer-to-peer habitual." },
    check: { question: "¿Peering y transit son relaciones operativamente equivalentes?", options: [["No", true], ["Sí", false], ["Solo en un IXP", false]], success: "Correcto.", failure: "Cambian expectativas de reachability y política." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Un proveedor de transit suele ofrecer reachability hacia redes de terceros? sí/no", answer: "si", hint: "Ese es el servicio esencial de transit." },
      { level: 2, label: "Normal", prompt: "¿BGP por sí mismo conoce el precio del contrato entre dos AS? sí/no", answer: "no", hint: "La política refleja decisiones externas al protocolo." },
      { level: 3, label: "Difícil", prompt: "¿El modelo valley-free es una ley universal que todos los AS están obligados a respetar? sí/no", answer: "no", hint: "Es un modelo operacional, no una invariante del protocolo." }
    ]
  },

  "global-ixp-route-servers": {
    id: "global-ixp-route-servers", courseId: 19,
    title: "Internet Exchange Points y BGP route servers",
    shortTitle: "Un IXP facilita interconexión; no vende mágicamente Internet completo",
    duration: 115,
    objective: "explicar la función de un IXP, la fabric de intercambio y los route servers, distinguiendo multilateral peering de transit y forwarding de datos.",
    summary: [
      "Un IXP ofrece una infraestructura común donde múltiples redes pueden interconectarse, típicamente mediante una fabric de capa 2 y políticas de peering.",
      "Un route server reduce el número de sesiones bilaterales de control al redistribuir rutas entre clientes según políticas, sin convertirse necesariamente en el next hop de datos.",
      "Estar conectado físicamente a un IXP no implica tener sesión o permiso de intercambio con todos sus miembros."
    ],
    concept: "El route server puede estar en el plano de control sin estar en el camino de forwarding. Es una distinción preciosa: puedes hablar de rutas con alguien sin enviarle luego los paquetes a través de ese mismo servidor.",
    diagram: [],
    rules: [
      "IXP membership/conexión física no implica peering automático con todos.",
      "Route server no debe confundirse con router de transit por el que pasa todo el tráfico.",
      "Las políticas y filtros siguen siendo necesarios aunque el route server simplifique sesiones."
    ],
    deep: { sections: [
      { title: "Fabric de intercambio", body: "Los participantes conectan interfaces a una infraestructura compartida y pueden establecer sesiones BGP bilaterales o usar servicios de route server. La topología física/virtual exacta depende del IXP." },
      { title: "Route server", body: "RFC 7947 describe un route server BGP para interconexión multilateral. El servidor aprende rutas de clientes y las ofrece a otros de acuerdo con política; su diseño evita comportarse simplemente como un AS de transit ordinario." },
      { title: "Escala y operación", body: "Con N participantes, un full mesh bilateral podría requerir O(N²) relaciones potenciales. Un route server reduce complejidad de control, aunque no elimina requisitos de filtros, políticas, observabilidad o acuerdos." }
    ], commonErrors: ["Route server=default gateway del IXP.", "Conectarse al IXP=peer con todos."], connections: ["802.1Q", "BGP", "Peering"] },
    example: { problem: "100 redes desean intercambio multilateral. ¿Por qué un route server puede ayudar?", steps: [["Paso 1", "Un full mesh bilateral tiene hasta 100×99/2=4950 pares."], ["Paso 2", "Cada red puede mantener una sesión principal con el route server según diseño."], ["Paso 3", "El control plane se simplifica mientras el tráfico puede fluir directamente entre participantes."]], answer: "Reduce la complejidad de sesiones de control sin convertirse necesariamente en datapath." },
    check: { question: "¿El tráfico de datos debe atravesar siempre el route server del IXP?", options: [["No", true], ["Sí", false], ["Solo IPv6", false]], success: "Correcto.", failure: "Route server y forwarding path son funciones separables." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Un IXP facilita interconexión entre redes? sí/no", answer: "si", hint: "Ese es su objetivo." },
      { level: 2, label: "Normal", prompt: "¿Estar físicamente conectado a un IXP garantiza transit global? sí/no", answer: "no", hint: "Hace falta política/acuerdo/rutas." },
      { level: 3, label: "Difícil", prompt: "¿Un route server puede participar en control plane sin ser el next hop de tráfico? sí/no", answer: "si", hint: "Control y data plane pueden separarse." }
    ]
  },

  "global-routing-scale-security": {
    id: "global-routing-scale-security", courseId: 19,
    title: "Routing global: escala, filtrado, route leaks y RPKI",
    shortTitle: "Aceptar una ruta no significa creerla ciegamente",
    duration: 140,
    objective: "analizar escalabilidad y seguridad operacional de BGP mediante agregación, filtros, route leak prevention y validación de origen RPKI.",
    summary: [
      "La tabla global contiene gran cantidad de prefijos y atributos; agregación y políticas evitan crecimiento innecesario y anuncios incorrectos.",
      "Un route leak viola expectativas de propagación y puede redirigir tráfico incluso sin que el prefijo sea falso en sentido de ownership.",
      "RPKI Route Origin Validation ayuda a comprobar si un origen AS está autorizado para un prefijo/longitud, pero no valida por sí sola todo el AS_PATH ni la intención de negocio."
    ],
    concept: "BGP nació en un entorno de cooperación y fue acumulando cinturones de seguridad operativos. ROV puede decir 'este origen no está autorizado por la ROA', pero no puede leer la mente del operador ni demostrar que cada salto del camino sea legítimo.",
    diagram: [],
    rules: [
      "No confundas RPKI origin validation con cifrado del tráfico.",
      "No confundas route leak con hijack de origen; pueden solaparse, pero describen fallos distintos.",
      "Filtrado debe ser policy-driven; aceptar todo de todo vecino es una configuración, no neutralidad."
    ],
    deep: { sections: [
      { title: "Filtrado y agregación", body: "Operators filtran prefijos imposibles/no autorizados, límites de longitud, default routes inesperadas y otras condiciones según el rol del vecino. La agregación reduce estado pero puede ocultar fallos parciales si se anuncia sin reachability subyacente adecuada." },
      { title: "Route leaks", body: "RFC 9234 define roles y mecanismos para detectar/prevenir ciertos leaks, por ejemplo cuando un AS exporta rutas entre provider/peer de forma incompatible con la relación esperada. El problema es de propagación/política, no necesariamente de prefijo inventado." },
      { title: "RPKI/ROV", body: "Una ROA autoriza a un ASN a originar un prefijo hasta una longitud máxima. ROV clasifica rutas de origen según datos RPKI (por ejemplo Valid/Invalid/NotFound según el modelo). Las políticas sobre cada estado son decisión del operador y RFCs posteriores afinan el comportamiento." }
    ], commonErrors: ["RPKI valida todo AS_PATH.", "ROV=firewall de BGP infalible."], connections: ["PKI", "BGP Roles", "Observabilidad"] },
    example: { problem: "Existe ROA para 203.0.113.0/24, origin AS64500, maxLength /24. Llega 203.0.113.0/25 origin AS64500. ¿Es válido según esa ROA?", steps: [["Paso 1", "El origin AS coincide."], ["Paso 2", "Pero /25 es más específico que maxLength /24."], ["Paso 3", "La autorización no cubre esa longitud."]], answer: "No: la ruta resulta RPKI-invalid respecto a esa autorización." },
    check: { question: "¿ROV demuestra que todo AS_PATH es criptográficamente correcto?", options: [["No", true], ["Sí", false], ["Solo con IPv4", false]], success: "Correcto.", failure: "ROV valida el origen/prefix authorization, no todo el camino." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Un route leak puede deberse a política de exportación incorrecta? sí/no", answer: "si", hint: "Es una causa típica." },
      { level: 2, label: "Normal", prompt: "¿RPKI Route Origin Validation cifra los paquetes de usuario? sí/no", answer: "no", hint: "Actúa sobre validación de routing, no confidentiality." },
      { level: 3, label: "Difícil", prompt: "ROA /20 maxLength /24: ¿un /25 del mismo origin AS queda autorizado por esa ROA? sí/no", answer: "no", hint: "La longitud supera maxLength." }
    ]
  },

  "global-convergence-observability": {
    id: "global-convergence-observability", courseId: 19,
    title: "Convergencia, fallos y observabilidad del routing global",
    shortTitle: "Internet converge; no teletransporta consenso",
    duration: 110,
    objective: "explicar propagación de cambios BGP, convergencia, path exploration y por qué traceroute/looking glasses/RIBs ofrecen vistas parciales del estado global.",
    summary: [
      "Un cambio de reachability se propaga entre vecinos y cada AS puede recalcular/exportar bajo su propia política; la convergencia no es instantánea ni globalmente sincronizada.",
      "Durante fallos pueden existir rutas transitorias, path exploration o vistas diferentes entre redes.",
      "Observabilidad requiere combinar RIBs, logs BGP, collectors, looking glasses y medidas de dataplane; ninguna vista individual representa toda Internet."
    ],
    concept: "Cuando una ruta cambia no existe un botón central de 'actualizar Internet'. Miles de sistemas autónomos reciben información a tiempos distintos y toman decisiones locales. La red global es distribuida de verdad, incluida la parte donde el incidente ocurre a las 03:17.",
    diagram: [],
    rules: [
      "No interpretes un traceroute como AS_PATH BGP exacto.",
      "No confundas Adj-RIB-In, Loc-RIB/FIB y dataplane observado.",
      "Una ruta visible en un collector no implica que todos los AS del planeta la hayan seleccionado."
    ],
    deep: { sections: [
      { title: "Convergencia", body: "Una retirada o nueva ruta desencadena selección y anuncios posteriores. Los temporizadores, políticas y caminos alternativos afectan la duración y secuencia. BGP puede explorar alternativas antes de estabilizarse." },
      { title: "Control plane frente a dataplane", body: "La RIB contiene conocimiento/selección de rutas; la FIB instala forwarding usable. Hardware, ECMP, políticas y convergencia pueden introducir diferencias temporales entre lo que aparece en control plane y lo que experimenta un flujo." },
      { title: "Herramientas", body: "Looking glasses muestran una perspectiva de un operador; route collectors recopilan sesiones de múltiples vantage points; traceroute infiere saltos IP del dataplane. Correlacionar estas fuentes evita conclusiones excesivas a partir de una sola medición." }
    ], commonErrors: ["Traceroute=tabla BGP.", "Si un collector ve la ruta, todo Internet la ve igual."], connections: ["BGP", "Traceroute", "Distributed systems"] },
    example: { problem: "Un collector aún muestra una ruta cinco segundos después de que el origin AS la retiró. ¿Demuestra que la retirada falló?", steps: [["Paso 1", "La información se propaga de forma distribuida."], ["Paso 2", "El collector tiene una perspectiva y temporización concretas."], ["Paso 3", "Puede estar observando estado transitorio."]], answer: "No. Puede ser convergencia/propagación pendiente." },
    check: { question: "¿BGP converge mediante un coordinador global central?", options: [["No", true], ["Sí", false], ["Solo en IXPs", false]], success: "Correcto.", failure: "Cada AS/peer procesa y propaga cambios distribuidamente." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Un looking glass ofrece una vista parcial? sí/no", answer: "si", hint: "Tiene vantage point concreto." },
      { level: 2, label: "Normal", prompt: "¿Traceroute muestra necesariamente el mismo AS_PATH que eligió BGP? sí/no", answer: "no", hint: "Dataplane IP y atributos BGP son observaciones distintas." },
      { level: 3, label: "Difícil", prompt: "¿Durante convergencia pueden dos AS seleccionar temporalmente caminos distintos al mismo prefijo? sí/no", answer: "si", hint: "El sistema no está globalmente sincronizado." }
    ]
  },

  "global-anycast": {
    id: "global-anycast", courseId: 19,
    title: "Anycast: una dirección, múltiples ubicaciones",
    shortTitle: "Anycast selecciona una ruta, no 'el servidor geográficamente más cercano'",
    duration: 115,
    objective: "explicar anycast mediante anuncios del mismo prefijo/servicio desde múltiples nodos y analizar estabilidad, failover y límites de afinidad.",
    summary: [
      "Anycast permite que múltiples nodos anuncien reachability para la misma dirección/prefijo y que el routing entregue tráfico a una instancia según la ruta seleccionada.",
      "La instancia elegida no tiene por qué ser la geográficamente más cercana; depende de política y topología de routing.",
      "Cambios de ruta pueden mover nuevos paquetes/flujos a otra instancia, por lo que aplicaciones con estado deben diseñar afinidad y recuperación conscientemente."
    ],
    concept: "Anycast no contiene un GPS escondido en BGP. 'Más cercano' significa cercano según la métrica/política efectiva del sistema de routing, que puede tener una relación creativa con los kilómetros.",
    diagram: [],
    rules: [
      "No prometas nearest-by-latency ni nearest-by-distance.",
      "No asumas que una sesión larga sobrevivirá a cualquier cambio de instancia.",
      "Anycast es una técnica de routing/servicio; la consistencia del estado de aplicación requiere diseño adicional."
    ],
    deep: { sections: [
      { title: "Mismo servicio, varios anuncios", body: "Varias ubicaciones anuncian reachability al mismo prefijo anycast. Cada red aplica BGP/IGP y dirige tráfico a la instancia cuya ruta resulta seleccionada desde esa perspectiva." },
      { title: "Failover y convergencia", body: "Si una instancia deja de anunciar el prefijo, el routing puede converger hacia otra. El tiempo de reacción depende de detección y convergencia; no es un failover atómico coordinado globalmente." },
      { title: "Estado y afinidad", body: "Servicios stateless o con estado replicado toleran mejor movimiento entre nodos. Para TCP u otros estados largos, un cambio de ruta puede romper la sesión si la nueva instancia no comparte ese estado." }
    ], commonErrors: ["Anycast=servidor geográficamente más cercano.", "Anycast mantiene cualquier TCP para siempre."], connections: ["BGP", "DNS", "CDN"] },
    example: { problem: "Madrid y París anuncian el mismo prefijo anycast. Un usuario en Zaragoza llega a París. ¿Es necesariamente un fallo?", steps: [["Paso 1", "El routing no optimiza kilómetros geográficos de forma universal."], ["Paso 2", "Políticas/upstreams pueden preferir París."], ["Paso 3", "La selección puede ser válida aunque la latencia no sea mínima."]], answer: "No. Anycast sigue la ruta seleccionada, no la distancia geográfica." },
    check: { question: "¿Anycast garantiza siempre la menor RTT disponible?", options: [["No", true], ["Sí", false], ["Solo DNS", false]], success: "Correcto.", failure: "La selección proviene del routing, no de una búsqueda exhaustiva de RTT." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Varias ubicaciones pueden anunciar el mismo prefijo anycast? sí/no", answer: "si", hint: "Ese es el mecanismo base." },
      { level: 2, label: "Normal", prompt: "¿Retirar un anuncio anycast puede redirigir tráfico hacia otra instancia tras convergencia? sí/no", answer: "si", hint: "El routing elige otra ruta disponible." },
      { level: 3, label: "Difícil", prompt: "¿Anycast por sí solo replica el estado de sesión de aplicación entre POPs? sí/no", answer: "no", hint: "Routing y replicación de aplicación son capas distintas." }
    ]
  },

  "global-cdn": {
    id: "global-cdn", courseId: 19,
    title: "CDN: request routing, caché y edge",
    shortTitle: "Una CDN coloca contenido/cómputo cerca del usuario sin reducirse a 'una caché'",
    duration: 120,
    objective: "descomponer una CDN en request routing, edge, caché/origin, invalidación y políticas de footprint/capability.",
    summary: [
      "Una CDN distribuye contenido o ejecución entre múltiples puntos de presencia para reducir latencia/carga y aumentar resiliencia según su arquitectura.",
      "La selección de edge puede usar DNS, anycast, redirects u otras técnicas; no existe un único mecanismo universal de CDN.",
      "Cache hit/miss, freshness, invalidation y origen son decisiones de aplicación/HTTP que se combinan con routing, pero no son routing BGP."
    ],
    concept: "Una CDN no es 'un proxy con esteroides'. Coordina dónde aceptar una petición, dónde obtener el objeto, cuánto tiempo considerarlo fresco, cómo invalidarlo y cómo reaccionar a fallos. Y luego intenta que todo eso parezca instantáneo desde el navegador.",
    diagram: [],
    rules: [
      "No confundas selección de edge con cache hit.",
      "Anycast es una opción de request routing, no una definición de CDN.",
      "Más POPs no garantizan menor latencia si la selección/política/origin path es mala."
    ],
    deep: { sections: [
      { title: "Request routing", body: "La CDN decide qué edge/cluster atiende una solicitud usando información de footprint, health, carga, red y política. CDNI formaliza conceptos para interconectar CDNs y anunciar footprint/capabilities." },
      { title: "Caché y origen", body: "Un edge puede servir desde caché si el objeto está presente y fresco; si no, consulta un nivel superior/origin. HTTP cache-control, revalidación y purga influyen en coherencia y carga." },
      { title: "Edge compute", body: "CDNs modernas pueden ejecutar lógica en el edge además de servir objetos. Eso añade state placement, cold starts, consistencia y seguridad; no convierte a BGP en scheduler de funciones." }
    ], commonErrors: ["CDN=DNS.", "CDN=anycast.", "Todo request a CDN es cache hit."], connections: ["HTTP", "Anycast", "Load balancing"] },
    example: { problem: "El usuario llega al POP correcto pero el objeto no está en caché. ¿Ha fallado el request routing?", steps: [["Paso 1", "Request routing eligió dónde atender."], ["Paso 2", "Cache state es una decisión posterior/diferente."], ["Paso 3", "El edge puede hacer fetch al origin y luego cachear."]], answer: "No. Edge selection y cache hit son mecanismos distintos." },
    check: { question: "¿Una CDN tiene que usar anycast obligatoriamente?", options: [["No", true], ["Sí", false], ["Solo para HTTPS", false]], success: "Correcto.", failure: "Puede usar varias técnicas de request routing." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Un cache miss puede provocar fetch al origin? sí/no", answer: "si", hint: "Ese es un flujo común." },
      { level: 2, label: "Normal", prompt: "¿DNS-based request routing y BGP anycast son exactamente el mismo mecanismo? sí/no", answer: "no", hint: "Actúan en capas distintas." },
      { level: 3, label: "Difícil", prompt: "¿Un edge geográficamente cercano garantiza menor TTFB si su camino al origin es malo? sí/no", answer: "no", hint: "La ruta completa importa." }
    ]
  },

  "global-load-balancing": {
    id: "global-load-balancing", courseId: 19,
    title: "Load balancing: ECMP, L4, L7 y afinidad",
    shortTitle: "Balancear tráfico no significa repartir paquetes con una moneda",
    duration: 125,
    objective: "comparar ECMP y balanceadores L4/L7, explicar hashing por flujo, health checks, afinidad y riesgos de reordenamiento/estado.",
    summary: [
      "ECMP permite usar múltiples next hops de coste equivalente; implementaciones suelen aplicar hashing por flujo para evitar reordenamiento excesivo.",
      "Un balanceador L4 decide usando información de transporte/red; uno L7 puede considerar semántica de aplicación como host, ruta o headers.",
      "Distribución uniforme, afinidad, capacidad y health son objetivos distintos; una buena política necesita observabilidad y backpressure."
    ],
    concept: "Round-robin perfecto a nivel de paquetes sería una forma eficiente de convertir TCP en una actividad de arqueología. Por eso muchos sistemas preservan afinidad de flujo mientras distribuyen flujos entre caminos/backend.",
    diagram: [],
    rules: [
      "No confundas ECMP con un reverse proxy L7.",
      "Hashing estable reduce reordering, pero no garantiza reparto exacto 50/50 con pocos flujos.",
      "Health check exitoso no demuestra que el backend cumpla toda la SLO de aplicación."
    ],
    deep: { sections: [
      { title: "ECMP", body: "Si existen varios next hops con coste equivalente, el forwarding puede distribuir tráfico. RFCs operativos describen hashing basado en campos de cabecera para mantener paquetes de un flujo en el mismo camino y reducir reordering." },
      { title: "L4 y L7", body: "L4 puede mapear conexiones según tuplas IP/puerto y mantener estado/NAT; L7 termina o interpreta protocolo de aplicación y puede enrutar por hostname, URL o metadata. La visibilidad extra cuesta CPU, latencia y complejidad." },
      { title: "Consistent hashing y afinidad", body: "Cuando cambia el conjunto de backends, un hash simple modulo N puede mover muchos flujos/keys. Técnicas de consistent hashing reducen remapeo, pero no eliminan hot keys ni problemas de capacity planning." }
    ], commonErrors: ["ECMP reparte cada paquete al azar.", "Health check=aplicación sana en todos los sentidos."], connections: ["Hashing", "TCP", "CDN"] },
    example: { problem: "Hay dos next hops ECMP y un único flujo TCP gigantesco. ¿Debe dividirse 50/50 por paquetes?", steps: [["Paso 1", "Muchas implementaciones hash por flujo."], ["Paso 2", "Un único flujo produce una clave estable."], ["Paso 3", "Puede terminar íntegramente en un solo next hop."]], answer: "No. ECMP por flujo puede dejar ese único flujo en un solo camino." },
    check: { question: "¿Hashing por flujo puede ayudar a evitar reordenamiento dentro de un flujo?", options: [["Sí", true], ["No", false], ["Solo UDP", false]], success: "Correcto.", failure: "Mantener una clave por flujo en un camino es una motivación común." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿ECMP puede usar varios next hops equivalentes? sí/no", answer: "si", hint: "Eso significa Equal-Cost Multi-Path." },
      { level: 2, label: "Normal", prompt: "¿Un balanceador L7 puede decidir usando el hostname HTTP? sí/no", answer: "si", hint: "Opera con semántica de aplicación." },
      { level: 3, label: "Difícil", prompt: "¿Dos next hops ECMP garantizan exactamente 50% de bytes cada uno con cualquier carga? sí/no", answer: "no", hint: "Hash distribution y tamaños de flujo importan." }
    ]
  },

  "global-backbone-datacenter": {
    id: "global-backbone-datacenter", courseId: 19,
    title: "Backbones y data centers: del WAN al fabric",
    shortTitle: "El backbone mueve tráfico entre regiones; el fabric lo mueve dentro del centro",
    duration: 120,
    objective: "distinguir backbone WAN, edge/POP y fabric de data center, y explicar redundancia, Clos/fat-tree, ECMP y dominios de fallo.",
    summary: [
      "Un backbone interconecta POPs/regiones con enlaces y routers de alta capacidad; no es sinónimo de 'Internet entero'.",
      "Los data centers modernos suelen usar fabrics multipath (por ejemplo topologías Clos) para escalar ancho de banda este-oeste.",
      "Redundancia útil exige separar dominios de fallo: dos enlaces por la misma canalización o dos routers en la misma alimentación pueden compartir el mismo desastre."
    ],
    concept: "La palabra 'redundante' pierde bastante prestigio cuando ambos cables entran por la misma excavadora. La arquitectura global debe razonar sobre qué fallos son realmente independientes.",
    diagram: [],
    rules: [
      "No confundas backbone de un operador con la totalidad de Internet.",
      "Multipath no garantiza capacidad si los caminos comparten el mismo cuello de botella físico.",
      "Redundancia lógica debe evaluarse contra failure domains reales."
    ],
    deep: { sections: [
      { title: "POP y backbone", body: "Un Point of Presence concentra interconexión/acceso en una ubicación. Los backbones conectan POPs y regiones mediante enlaces de larga distancia, transporte óptico y routing interno/interdominio según el operador." },
      { title: "Clos / leaf-spine", body: "Una fabric leaf-spine ofrece múltiples caminos de longitud similar entre racks. ECMP puede distribuir flujos entre spines; la capacidad bisectional depende de enlaces y oversubscription, no solo del dibujo bonito." },
      { title: "Failure domains", body: "Diseñar disponibilidad exige preguntar qué comparte energía, fibra, conduit, software, control plane y proveedor. Dos componentes aparentemente distintos pueden fallar juntos por una dependencia común." }
    ], commonErrors: ["Backbone=Internet.", "Dos enlaces=dos failure domains automáticamente."], connections: ["ECMP", "Optical fiber", "Distributed systems"] },
    example: { problem: "Dos enlaces WAN usan routers distintos pero la misma fibra alquilada dentro del mismo conducto. ¿Son fallos independientes ante una excavación?", steps: [["Paso 1", "El equipo lógico es diferente."], ["Paso 2", "El medio físico comparte un failure domain."], ["Paso 3", "Una sola excavación puede cortar ambos."]], answer: "No. La redundancia lógica comparte riesgo físico." },
    check: { question: "¿Un backbone de un ISP equivale a todo Internet?", options: [["No", true], ["Sí", false], ["Solo tier-1", false]], success: "Correcto.", failure: "Internet es interconexión de muchas redes/backbones." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Un POP puede ser punto de interconexión de una red en una ciudad/región? sí/no", answer: "si", hint: "Ese es un uso común del término." },
      { level: 2, label: "Normal", prompt: "¿Leaf-spine puede ofrecer múltiples caminos equivalentes entre racks? sí/no", answer: "si", hint: "Es una motivación central de Clos fabrics." },
      { level: 3, label: "Difícil", prompt: "¿Dos carriers garantizan diversidad física si ambos alquilan el mismo tramo de fibra? sí/no", answer: "no", hint: "El failure domain puede compartirse." }
    ]
  },

  "global-integration": {
    id: "global-integration", courseId: 19,
    title: "Integración: seguir una petición por Internet global",
    shortTitle: "De tu Wi-Fi al edge sin perder las capas por el camino",
    duration: 145,
    objective: "seguir una petición desde un host hasta un servicio global integrando DNS/anycast, routing BGP, peering/transit, backbone, load balancing y data center.",
    summary: [
      "Una petición real atraviesa decisiones de resolución de nombre, routing local, interdominio, selección de edge, transporte y balanceo de servicio.",
      "El AS_PATH/control plane y el camino IP observado pueden diferir en detalle; además, CDN/anycast pueden seleccionar instancias distintas según origen y momento.",
      "Diagnosticar rendimiento requiere localizar la capa responsable en vez de atribuir cualquier latencia a BGP."
    ],
    concept: "Cuando una web tarda, la respuesta correcta rara vez es 'Internet'. El trabajo experto consiste en reducir el universo: ¿DNS? ¿acceso? ¿BGP? ¿congestión? ¿edge? ¿TLS? ¿origin? Culpar a Internet entero es técnicamente compatible con todo y por tanto explica casi nada.",
    diagram: [],
    rules: [
      "Sigue primero la decisión de routing hasta el next hop; después cambia de capa conscientemente.",
      "No uses traceroute como prueba única de política BGP o rendimiento de aplicación.",
      "Mide desde varios vantage points antes de concluir que un problema es global."
    ],
    deep: { sections: [
      { title: "Fase 1: acceso y resolución", body: "El cliente obtiene configuración IP, resuelve un nombre y elige dirección IPv4/IPv6 según su stack/política. La red local resuelve el gateway y envía el paquete hacia el ISP." },
      { title: "Fase 2: interdominio", body: "Routers del ISP encaminan hacia un egress elegido por su IGP/BGP/política. La ruta puede cruzar peering directo, IXP o transit. En cada AS se usa su propio forwarding interno mientras BGP delimita reachability/política inter-AS." },
      { title: "Fase 3: servicio", body: "Anycast o request routing puede llevar a un POP. Allí un balanceador selecciona backend/cache/edge compute. Un cache miss puede ir al origin a través de otra ruta global. El RTT visible agrega varias decisiones independientes." }
    ], commonErrors: ["Toda latencia WAN es BGP.", "El AS_PATH explica todos los saltos de traceroute."], connections: ["DNS", "TCP/QUIC futuro", "Observability"] },
    example: { problem: "Usuarios de ISP-A llegan al POP París; ISP-B a Madrid. Ambos usan la misma IP anycast. ¿Puede ser correcto?", steps: [["Paso 1", "Cada ISP tiene políticas/paths BGP distintos."], ["Paso 2", "Anycast entrega según la ruta elegida desde cada vantage point."], ["Paso 3", "Dos usuarios pueden terminar en instancias distintas con la misma dirección."]], answer: "Sí. La selección anycast es dependiente de la perspectiva de routing." },
    check: { question: "¿Una misma IP anycast puede llevar a POPs distintos según la red de origen?", options: [["Sí", true], ["No", false], ["Solo con NAT", false]], success: "Correcto.", failure: "La selección depende del routing visto desde cada origen." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Una petición global puede cruzar peering o transit antes de llegar al servicio? sí/no", answer: "si", hint: "Son formas de interconexión entre ASes." },
      { level: 2, label: "Normal", prompt: "¿Un cache miss en el edge significa necesariamente fallo BGP? sí/no", answer: "no", hint: "Cache state y routing son capas distintas." },
      { level: 3, label: "Difícil", prompt: "¿Dos vantage points pueden ver rutas/latencias distintas al mismo servicio sin que ninguno esté 'equivocado'? sí/no", answer: "si", hint: "Política y topología dependen del origen." }
    ]
  }
});
