/* Recursos visuales y bibliografía guiada.
   Las imágenes se cargan desde Wikimedia Commons y conservan fuente/licencia visibles. */
window.LEARNING_VISUALS = [
  {
    id: 'second-reality-tunnel', area: 'demoscene', blocks: [47,48,49,50,51],
    title: 'Second Reality — efecto de túnel',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Second-Reality-Tunnel.png',
    source: 'https://commons.wikimedia.org/wiki/File:Second-Reality-Tunnel.png',
    credit: 'Future Crew · Wikimedia Commons', license: 'Dominio público',
    caption: 'No mires solo el resultado: intenta reconstruir qué representación, transformaciones y presupuesto de cómputo pueden producir este efecto en hardware de 1993.',
    alt: 'Captura del efecto de túnel de Second Reality de Future Crew.'
  },
  {
    id: 'http-request', area: 'cyber', blocks: [21,23,24],
    title: 'Petición y respuesta HTTP reales',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/HTTP-Anfrage.svg',
    source: 'https://commons.wikimedia.org/wiki/File:HTTP-Anfrage.svg',
    credit: 'Wikimedia Commons', license: 'Dominio público',
    caption: 'Úsala para separar método, ruta, cabeceras, cuerpo y respuesta. En Natas, muchas vulnerabilidades empiezan precisamente por entender qué controla el cliente y qué valida el servidor.',
    alt: 'Diagrama de una petición HTTP y su respuesta observadas desde una consola.'
  },
  {
    id: 'cpu-block', area: 'computers', blocks: [4,5,6,7,8],
    title: 'CPU sencilla: flujo de instrucciones y datos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/CPU_block_diagram.png',
    source: 'https://commons.wikimedia.org/wiki/File:CPU_block_diagram.png',
    credit: 'R. S. Shaw · Wikimedia Commons', license: 'CC BY-SA 3.0',
    caption: 'Sigue una instrucción desde fetch y decode hasta registros/ALU. Después relaciona cada caja con PC, ISA, datapath y accesos a memoria vistos en las lecciones.',
    alt: 'Diagrama de bloques de una CPU simple con fetch, decoder, registros, ALU e interfaz de memoria.'
  },
  {
    id: 'godot-editor', area: 'godot', blocks: [39,40,41,42,43,44,45],
    title: 'Godot — workspace 2D real',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/UI_of_Godot_Game_Engine.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:UI_of_Godot_Game_Engine.jpg',
    credit: 'VicFic2006 · Wikimedia Commons', license: 'MIT/Expat; ficha Commons también marca CC0',
    caption: 'Identifica Scene dock, viewport, filesystem, inspector y paneles inferiores. La interfaz tiene sentido cuando la conectas con SceneTree, Nodes, Resources y Servers.',
    alt: 'Captura de la interfaz del editor Godot en el espacio de trabajo 2D.'
  },
  {
    id: 'godot-gamedev', area: 'gamedev', blocks: [34,35,36,37,38,39,40,41,42,43,44],
    title: 'Un engine como herramienta de producción',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/UI_of_Godot_Game_Engine.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:UI_of_Godot_Game_Engine.jpg',
    credit: 'VicFic2006 · Wikimedia Commons', license: 'MIT/Expat; ficha Commons también marca CC0',
    caption: 'Observa cómo un engine une assets, escena, scripting, render, física y depuración. En las lecciones de arquitectura, pregunta qué subsistema hay detrás de cada panel.',
    alt: 'Interfaz de un motor de videojuegos Godot mostrando escena, viewport y recursos.'
  },
  {
    id: 'pixel-art-detail', area: 'pixelart', blocks: [46],
    title: 'Pixel art visto a escala y ampliado',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pixel_art_cat_with_zoom-in_detail.png',
    source: 'https://commons.wikimedia.org/wiki/File:Pixel_art_cat_with_zoom-in_detail.png',
    credit: 'ReffPixels · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Compáralo a 1× y ampliado: el objetivo no es “ver cuadrados”, sino estudiar clusters, contorno, economía de píxeles y lectura de la silueta.',
    alt: 'Ejemplo de pixel art de un gato con detalle ampliado de los píxeles.'
  },
  {
    id: 'breadboard', area: 'electronics', blocks: [3,52,53,54,55,56],
    title: 'Prototipo electrónico en breadboard',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/BreadBoard_Circuit_Example.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:BreadBoard_Circuit_Example.jpg',
    credit: 'Chuck · Wikimedia Commons', license: 'Dominio público',
    caption: 'Antes de montar nada, intenta traducir mentalmente el circuito físico a nodos eléctricos. Una fila conectada incorrectamente puede convertir un esquema correcto en un circuito distinto.',
    alt: 'Circuito electrónico físico montado sobre una breadboard.'
  },
  {
    id: 'neural-network', area: 'ai', blocks: [60,61,62,63,64,65,66],
    title: 'Red neuronal como grafo de transformaciones',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neural_network_explain.png',
    source: 'https://commons.wikimedia.org/wiki/File:Neural_network_explain.png',
    credit: 'TseKiChun · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'La imagen es útil como mapa, pero no confundas nodo dibujado con “neurona biológica”. Piensa en tensores, parámetros, funciones y gradientes que fluyen entre capas.',
    alt: 'Diagrama de una red neuronal con capas de entrada, ocultas y salida.'
  },
  {
    id: 'linux-kernel', area: 'os', blocks: [12,13,14,15,59,72],
    title: 'Estructura simplificada del kernel Linux',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Simplified_Structure_of_the_Linux_Kernel.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Simplified_Structure_of_the_Linux_Kernel.svg',
    credit: 'Wikimedia Commons', license: 'CC BY-SA 4.0 / GFDL',
    caption: 'Úsala como mapa de subsistemas, no como arquitectura exacta. Sigue una syscall hacia VFS, memoria, red o drivers y pregunta dónde aparecen scheduling, IRQ y mecanismos de protección.',
    alt: 'Diagrama simplificado de subsistemas del kernel Linux.'
  },
  {
    id: 'osi-tcp', area: 'networks', blocks: [16,17,18,19,20,21,22,44,70,73],
    title: 'Modelo OSI frente a pila TCP/IP',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/OSI_vs_TCP_models.svg',
    source: 'https://commons.wikimedia.org/wiki/File:OSI_vs_TCP_models.svg',
    credit: 'Jm3 · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'No memorices siete nombres sin mecanismo: usa la comparación para ubicar Ethernet, IP, TCP/UDP/QUIC y HTTP/DNS, y después sigue un paquete real atravesando las capas.',
    alt: 'Comparación visual entre las capas del modelo OSI y el modelo TCP/IP.'
  }
  ,{
    id: 'pipeline-five-stage', area: 'computers', lessonIds: ['pipeline-etapas','hazards-forwarding'],
    title: 'Pipeline de cinco etapas: varias instrucciones solapadas',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/5_Stage_Pipeline.svg',
    source: 'https://commons.wikimedia.org/wiki/File:5_Stage_Pipeline.svg',
    credit: 'Inductiveload · Wikimedia Commons', license: 'Dominio público',
    caption: 'Lee la figura por columnas de ciclos: una instrucción avanza de etapa mientras otras ocupan etapas distintas. Después introduce mentalmente una dependencia RAW y pregunta dónde necesitarías forwarding o una burbuja.',
    alt: 'Diagrama temporal de cinco instrucciones atravesando un pipeline de cinco etapas.'
  },
  {
    id: 'cache-hierarchy-specific', area: 'computers', lessonIds: ['jerarquia-localidad','cache-lines-hits','cache-mapping'],
    title: 'Jerarquía de caché multinivel',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cache_Hierarchy.png',
    source: 'https://commons.wikimedia.org/wiki/File:Cache_Hierarchy.png',
    credit: 'Kbbuch · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Sigue un acceso desde el core hacia L1, L2, L3 y memoria principal. La figura no expresa todas las políticas posibles: úsala para razonar sobre latencia, capacidad, sharing y por qué un miss en un nivel no implica ir directamente a DRAM.',
    alt: 'Diagrama de una jerarquía de caché con niveles L1, L2, L3 y memoria principal.'
  },
  {
    id: 'paging-specific', area: 'computers', lessonIds: ['virtual-mmu-pages','tlb-hugepages'],
    title: 'Paginación: espacio virtual, page tables y memoria física',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Paging_graphic.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Paging_graphic.svg',
    credit: 'FranchuFranchu · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'Identifica qué parte de una dirección selecciona página y qué información debe aportar la tabla. Después añade el TLB a tu modelo mental: no sustituye la page table, cachea traducciones recientes para evitar page walks frecuentes.',
    alt: 'Esquema de paginación con páginas virtuales, tablas de páginas y marcos físicos.'
  },
  {
    id: 'mosfet-cross-section', area: 'electronics', lessonIds: ['bjt-mosfet','semiconductores-pn'],
    title: 'MOSFET visto en sección transversal',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/MOSFET_Structure.svg',
    source: 'https://commons.wikimedia.org/wiki/File:MOSFET_Structure.svg',
    credit: 'Brews ohare / BentSm · Wikimedia Commons', license: 'CC BY-SA 3.0',
    caption: 'Localiza source, drain, gate, óxido y substrate. La idea clave es que VGS modifica electrostáticamente el canal: el dibujo ayuda a no imaginar la gate como una entrada lógica abstracta desconectada de capacitancias y física del dispositivo.',
    alt: 'Sección transversal simplificada de un transistor MOSFET.'
  },
  {
    id: 'bgp-autonomous-systems', area: 'networks', lessonIds: ['global-as-internet-graph','global-bgp-sessions-updates','global-bgp-attributes-policy'],
    title: 'BGP entre sistemas autónomos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/AS-BGP.png',
    source: 'https://commons.wikimedia.org/wiki/File:AS-BGP.png',
    credit: 'MelVic · Wikimedia Commons', license: 'CC BY-SA 3.0',
    caption: 'No leas cada enlace como “camino más corto”. BGP anuncia reachability entre AS y aplica política. Intenta separar en el diagrama la topología física, las sesiones BGP y la decisión de qué ruta exportar o preferir.',
    alt: 'Diagrama de sistemas autónomos interconectados mediante BGP.'
  },
  {
    id: 'transformer-architecture', area: 'ai', lessonIds: ['tf-self-attention','tf-multihead','tf-encoder','tf-decoder','tf-causal-mask'],
    title: 'Arquitectura Transformer completa',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Transformer%2C_full_architecture.png',
    source: 'https://commons.wikimedia.org/wiki/File:Transformer%2C_full_architecture.png',
    credit: 'dvgodoy · Wikimedia Commons', license: 'CC BY 4.0',
    caption: 'Recorre primero una sola rama: embeddings → atención → residual/normalización → feed-forward. Después compara encoder y decoder. El diagrama es una arquitectura de referencia: los LLM decoder-only modernos omiten la mitad encoder y usan masking causal.',
    alt: 'Diagrama completo de la arquitectura Transformer con encoder, decoder y atención.'
  },
  {
    id: 'shader-pipeline-specific', area: 'gamedev', lessonIds: ['api-shader-stages','api-pipelines','api-integration-frame'],
    title: 'Pipeline gráfico con etapas de shader',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/WebGL_Shader_Pipeline.svg',
    source: 'https://commons.wikimedia.org/wiki/File:WebGL_Shader_Pipeline.svg',
    credit: 'Scriptor universalis · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Sigue qué datos son por vértice, qué ocurre durante rasterización y qué recibe el fragment shader. Luego compáralo con Vulkan: la idea de etapas persiste aunque la API y la explicitud del estado sean distintas.',
    alt: 'Diagrama del pipeline de rendering WebGL destacando vertex y fragment shaders.'
  },
  {
    id: 'ray-tracing-specific', area: 'gamedev', lessonIds: ['render-ray-tracing','render-path-tracing','render-global-illumination'],
    title: 'Ray tracing: rayo primario, intersección y visibilidad',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ray_trace_diagram.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Ray_trace_diagram.svg',
    credit: 'Henrik · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Distingue el rayo de cámara del rayo de sombra. En un renderer real la parte cara no es dibujar la línea roja: es encontrar intersecciones eficientemente, normalmente mediante una estructura de aceleración, y decidir qué nuevos rayos generar.',
    alt: 'Esquema de ray tracing con rayo de cámara, objeto, luz y rayo de sombra.'
  },
  {
    id: 'godot-nodes-scenes-specific', area: 'godot', lessonIds: ['godot-scenetree','godot-nodes-scenes'],
    title: 'Godot: una escena como árbol de Nodes',
    src: 'https://docs.godotengine.org/en/stable/_images/nodes_and_scenes_character_nodes.webp',
    source: 'https://docs.godotengine.org/en/stable/getting_started/step_by_step/nodes_and_scenes.html',
    credit: 'Juan Linietsky, Ariel Manzur y comunidad Godot', license: 'CC BY 3.0',
    caption: 'Observa que un personaje no es una clase monolítica: se compone de Nodes con responsabilidades distintas. Esta imagen ayuda a distinguir el árbol de una escena guardada, sus instancias y el SceneTree global que existe durante la ejecución.',
    alt: 'Diagrama oficial de Godot con un personaje compuesto por varios Nodes en forma de árbol.'
  },
  {
    id: 'second-reality-plasma', area: 'demoscene', lessonIds: ['demo-second-reality','demo-future-crew'],
    title: 'Second Reality — plasma y color como algoritmo',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Second-Reality-Plasma-Effect.png',
    source: 'https://commons.wikimedia.org/wiki/File:Second-Reality-Plasma-Effect.png',
    credit: 'Future Crew · Wikimedia Commons', license: 'Dominio público',
    caption: 'Intenta separar geometría de color: muchos plasmas clásicos se generan con funciones periódicas/tablas y palette lookup. Pregunta qué parte puede precalcularse y qué parte cambia por frame para caber en el presupuesto de una máquina de 1993.',
    alt: 'Captura del efecto plasma de la demo Second Reality de Future Crew.'
  },
  {
    id: 'second-reality-cube', area: 'demoscene', lessonIds: ['demo-second-reality'],
    title: 'Second Reality — cubo 3D y transición de paradigmas',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Second-Reality-Colored-spinning-cube.png',
    source: 'https://commons.wikimedia.org/wiki/File:Second-Reality-Colored-spinning-cube.png',
    credit: 'Future Crew · Wikimedia Commons', license: 'Dominio público',
    caption: 'Úsalo para conectar demoscene con el pipeline 3D: transformación de vértices, proyección, ocultación y rasterización. Lo importante es estudiar cómo una producción mezcla técnicas 2D, 3D y sincronización musical en una misma timeline.',
    alt: 'Captura de un cubo tridimensional coloreado en Second Reality.'
  }
  ,{
    id: 'pipeline-data-hazard', area: 'computers', lessonIds: ['pipeline-etapas','hazards-forwarding'], studyOrder: 2,
    title: 'Hazard RAW: cuándo una instrucción necesita un dato demasiado pronto',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pipeline_Data_Hazard.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Pipeline_Data_Hazard.svg',
    credit: 'Inductiveload · Wikimedia Commons', license: 'Dominio público',
    caption: 'Compárala con el pipeline ideal anterior. La instrucción consumidora entra en execute antes de que el productor haya hecho write-back. Señala el ciclo exacto del conflicto y decide si forwarding basta o si debe insertarse una burbuja.',
    alt: 'Tabla temporal que muestra un data hazard entre dos instrucciones en un pipeline.'
  },
  {
    id: 'cache-associativity', area: 'computers', lessonIds: ['cache-mapping','cache-lines-hits'], studyOrder: 2,
    title: 'Direct-mapped frente a caché asociativa por conjuntos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cache%2Cassociative-fill-both.png',
    source: 'https://commons.wikimedia.org/wiki/File:Cache%2Cassociative-fill-both.png',
    credit: 'Hellisp · Wikimedia Commons', license: 'CC BY-SA 3.0',
    caption: 'Observa que la asociatividad no hace “más grande” la caché: cambia cuántos lugares candidatos tiene un bloque dentro de su set. Úsala para explicar conflict misses y por qué más ways también exigen más comparaciones y política de reemplazo.',
    alt: 'Comparación entre llenado de caché direct-mapped y set-associative.'
  },
  {
    id: 'tlb-translation-flow', area: 'computers', lessonIds: ['virtual-mmu-pages','tlb-hugepages'], studyOrder: 2,
    title: 'TLB y page table: dos caminos para una misma traducción',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/TLB.svg',
    source: 'https://commons.wikimedia.org/wiki/File:TLB.svg',
    credit: 'Arilou · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Primero sigue un TLB hit y luego un TLB miss. El TLB no almacena tus datos ni sustituye la page table: cachea traducciones. Señala también dónde podría aparecer un page fault y por qué es una situación distinta de un TLB miss.',
    alt: 'Flujo de traducción de una dirección virtual mediante TLB y tabla de páginas.'
  },
  {
    id: 'attention-single-head', area: 'ai', lessonIds: ['tf-self-attention','tf-multihead'], studyOrder: 2,
    title: 'Una cabeza de atención: de Q/K/V a la suma ponderada',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Process_of_a_Single_Attention_Head_in_a_Transformer_Model.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Process_of_a_Single_Attention_Head_in_a_Transformer_Model.jpg',
    credit: 'Shuang Zhang et al. · Wikimedia Commons', license: 'CC BY 4.0',
    caption: 'Después del diagrama global del Transformer, baja un nivel. Identifica la proyección a Q, K y V, el score entre query y keys, la normalización y la combinación de values. Comprueba qué dimensiones deben coincidir para que cada multiplicación sea válida.',
    alt: 'Diagrama del proceso de una cabeza de self-attention con Query, Key y Value.'
  },
  {
    id: 'ray-tracing-tracing-step', area: 'gamedev', lessonIds: ['render-ray-tracing','render-path-tracing'], studyOrder: 2,
    title: 'Ray tracing: qué ocurre después de encontrar una intersección',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Raytrace_trace_diagram.png',
    source: 'https://commons.wikimedia.org/wiki/File:Raytrace_trace_diagram.png',
    credit: 'Timrb · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'La primera figura te ayuda a entender cámara e intersección; esta segunda sirve para estudiar la expansión de rayos. Separa visibility/shadow rays, reflexión/refracción y, en path tracing, la decisión estocástica de continuar caminos.',
    alt: 'Diagrama del paso de trazado de rayos tras la primera intersección.'
  },
  {
    id: 'tcp-three-way-handshake', area: 'networks', lessonIds: ['transport-handshake','transport-tcp-lifecycle'],
    title: 'TCP three-way handshake con números de secuencia',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tcp-handshake.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Tcp-handshake.svg',
    credit: 'Snubcube y autores previos · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'Sigue SYN → SYN+ACK → ACK y fíjate en cómo los números de secuencia consumen espacio lógico. No memorices tres flechas: explica qué estado aprende cada extremo y por qué dos mensajes no bastan para confirmar conocimiento mutuo de ambos ISN.',
    alt: 'Diagrama temporal del three-way handshake de TCP.'
  },
  {
    id: 'diffie-hellman-visual', area: 'cyber', lessonIds: ['crypto-dh-ecc'],
    title: 'Diffie–Hellman: combinar información pública y secretos privados',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Diffie-Hellman_Key_Exchange.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Diffie-Hellman_Key_Exchange.svg',
    credit: 'A. J. Vinck / Flugaal · Wikimedia Commons', license: 'Dominio público',
    caption: 'Usa la analogía solo para visualizar la asimetría: ambos publican valores derivados y llegan al mismo secreto sin enviarlo. Después vuelve a la matemática y explica por qué un atacante activo puede hacer MITM si el intercambio no está autenticado.',
    alt: 'Ilustración conceptual del intercambio de claves Diffie-Hellman.'
  },
  {
    id: 'elf-layout', area: 'computers', lessonIds: ['elf-pe-loader','object-symbol-relocation','static-dynamic-linking'],
    title: 'ELF: vista de linking y vista de ejecución',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/ELF_Executable_and_Linkable_Format_diagram_by_Ange_Albertini.png',
    source: 'https://commons.wikimedia.org/wiki/File:ELF_Executable_and_Linkable_Format_diagram_by_Ange_Albertini.png',
    credit: 'Ange Albertini · Wikimedia Commons', license: 'CC BY 1.0',
    caption: 'No intentes memorizar todos los campos. Empieza por distinguir sections y segments, después localiza symbol/relocation information y finalmente conecta program headers con lo que el loader necesita mapear en memoria.',
    alt: 'Diagrama detallado del formato ELF y su relación con linking y carga.'
  },
  {
    id: 'btree-structure', area: 'computers', lessonIds: ['btrees','indexes'],
    title: 'B-tree: fan-out alto y búsqueda por rangos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/B-tree.svg',
    source: 'https://commons.wikimedia.org/wiki/File:B-tree.svg',
    credit: 'CyHawk · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'Cuenta cuántas claves caben en un nodo y cuántos hijos produce. El objetivo no es parecerse a un BST: es reducir accesos a páginas manteniendo el árbol bajo. Simula una búsqueda y luego una inserción que fuerce split.',
    alt: 'Ejemplo de un árbol B con varios valores por nodo y múltiples hijos.'
  },
  {
    id: 'cnn-convolution-worked', area: 'ai', lessonIds: ['dl-convolution','dl-cnn'], studyOrder: 1,
    title: 'Convolución en una CNN: kernel, ventana y feature map',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Convolutional_neural_network%2C_convolution_worked_example.png',
    source: 'https://commons.wikimedia.org/wiki/File:Convolutional_neural_network%2C_convolution_worked_example.png',
    credit: 'Daniel Voigt Godoy · Wikimedia Commons', license: 'CC BY 4.0',
    caption: 'Sigue una sola posición de salida y calcula qué región de entrada participa. Después repite mentalmente el kernel en otra posición. Ese weight sharing es una diferencia esencial frente a una capa fully connected.',
    alt: 'Ejemplo trabajado de una operación de convolución utilizada en una CNN.'
  },
  {
    id: 'cnn-architecture', area: 'ai', lessonIds: ['dl-cnn','dl-pooling'], studyOrder: 2,
    title: 'CNN completa: extracción espacial y decisión final',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Convolutional_Neural_Network.png',
    source: 'https://commons.wikimedia.org/wiki/File:Convolutional_Neural_Network.png',
    credit: 'Irisbox · Wikimedia Commons', license: 'CC BY 4.0',
    caption: 'Ahora sube de nivel: observa cómo varias capas transforman resolución, canales y receptive field antes de la clasificación. No confundas “feature map visualizable” con una garantía de que cada canal tenga un significado humano único.',
    alt: 'Diagrama de una arquitectura CNN con convolución, pooling y capas de clasificación.'
  },
  {
    id: 'second-reality-moire', area: 'demoscene', lessonIds: ['demo-second-reality','demo-future-crew'], studyOrder: 4,
    title: 'Second Reality — moiré: complejidad visual desde interferencia',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Second-Reality-Moire-patterns.png',
    source: 'https://commons.wikimedia.org/wiki/File:Second-Reality-Moire-patterns.png',
    credit: 'Future Crew · Wikimedia Commons', license: 'Dominio público',
    caption: 'Compárala con plasma, túnel y 3D: aquí gran parte de la riqueza visual puede surgir de superponer patrones y variar parámetros. Analiza qué cantidad de estado necesita el efecto y por qué una idea matemática barata puede llenar toda la pantalla.',
    alt: 'Captura de patrones de moiré en Second Reality de Future Crew.'
  }

  ,{
    id: 'process-states', area: 'os', lessonIds: ['processes-pcb-context','threads-scheduling-preemption'], studyOrder: 1,
    title: 'Estados de un proceso y transiciones del scheduler',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Process_state.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Process_state.svg',
    credit: 'MrDrBob · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'Sigue ready → running → waiting y vuelve a ready cuando termina la E/S. Después distingue cuidadosamente “estado del proceso” de “estado de un thread” y señala en qué transiciones interviene el scheduler y en cuáles interviene un evento externo.',
    alt: 'Diagrama de los estados básicos de un proceso y sus transiciones.'
  },
  {
    id: 'dns-iterative-resolution', area: 'networks', lessonIds: ['app-dns-hierarchy','app-dns-wire-transport'], studyOrder: 1,
    title: 'DNS iterativo: root → TLD → servidor autoritativo',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Example_of_an_iterative_DNS_resolver.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Example_of_an_iterative_DNS_resolver.svg',
    credit: 'Lion Kimbro · Wikimedia Commons', license: 'Dominio público',
    caption: 'Numera cada consulta y respuesta. Observa que el servidor root normalmente no entrega la IP final: devuelve una delegación. Repite el recorrido preguntando dónde entra la caché y qué cambia cuando la respuesta ya está almacenada en el resolver.',
    alt: 'Ejemplo de resolución DNS iterativa consultando root, TLD y servidor autoritativo.'
  },
  {
    id: 'tls13-full-handshake', area: 'cyber', lessonIds: ['crypto-tls13','crypto-pki-certificates'], studyOrder: 1,
    title: 'TLS 1.3: handshake completo y momento en que nacen las claves',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Full_TLS_1.3_Handshake.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Full_TLS_1.3_Handshake.svg',
    credit: 'Fleshgrinder y Tango! Desktop Project · Wikimedia Commons', license: 'Dominio público',
    caption: 'Separa negociación, key exchange, autenticación y Finished. Identifica qué mensajes todavía son visibles antes de que haya claves de tráfico y evita el error de pensar que el certificado “cifra la conexión”: su papel principal aquí es autenticar la identidad/clave del servidor.',
    alt: 'Diagrama temporal simplificado de un handshake completo TLS 1.3.'
  },
  {
    id: 'gpu-memory-hierarchy', area: 'gamedev', lessonIds: ['gpu-memory-hierarchy','gpu-vram-bandwidth','gpu-coalescing'], studyOrder: 1,
    title: 'GPU/CUDA: jerarquía de memoria vista desde un kernel',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Memory.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Memory.svg',
    credit: 'NVIDIA · Wikimedia Commons', license: 'CC BY 3.0',
    caption: 'Clasifica cada memoria por alcance, latencia aproximada y quién puede compartirla. Después explica por qué coalescing, shared memory y occupancy son problemas relacionados pero distintos; una jerarquía rápida no arregla automáticamente accesos mal organizados.',
    alt: 'Jerarquía de memoria CUDA con registros, memoria local, shared, global, constant y texture.'
  },
  {
    id: 'opamp-open-loop', area: 'electronics', lessonIds: ['analog-opamps','analog-feedback-stability'], studyOrder: 1,
    title: 'Op-amp sin realimentación: por qué el modelo ideal satura enseguida',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Op-amp_open-loop_1.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Op-amp_open-loop_1.svg',
    credit: 'Ong saluri · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'Empieza con la ganancia open-loop enorme: una diferencia diminuta entre entradas empuja la salida hacia saturación. Luego añade mentalmente feedback negativo y explica por qué no “reduce sin más” la ganancia, sino que permite imponer una relación de lazo más controlable.',
    alt: 'Amplificador operacional en lazo abierto con una entrada conectada a tierra.'
  },
  {
    id: 'memory-hierarchy-latency-capacity', area: 'computers', lessonIds: ['jerarquia-localidad','dram-controlador-numa'], studyOrder: 3,
    title: 'Jerarquía de memoria: capacidad, coste y velocidad no crecen juntos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Computer_Memory_Hierarchy.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Computer_Memory_Hierarchy.svg',
    credit: 'Danlash y colaboradores · Wikimedia Commons', license: 'CC BY-SA / GFDL según ficha Commons',
    caption: 'Recorre la pirámide preguntando qué aumenta y qué disminuye al alejarte del core. Conecta después la figura con localidad: la jerarquía solo funciona bien cuando el programa reutiliza datos/instrucciones de forma suficientemente predecible.',
    alt: 'Diagrama piramidal de la jerarquía de memoria de un computador moderno.'
  }


  ,{
    id: 'ext-inode-layout', area: 'os', lessonIds: ['fs-directories-inodes','fs-ext4','fs-blocks-allocation'], studyOrder: 1,
    title: 'Ext: inodes, directorios y bloques de datos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ext_filesystem.ru.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Ext_filesystem.ru.svg',
    credit: 'VolodyA! · Wikimedia Commons', license: 'CC BY-SA / GFDL según ficha de Commons',
    caption: 'Sigue el camino nombre → entrada de directorio → inode → bloques. La figura sirve para romper la intuición de que el nombre del archivo “contiene” sus metadatos o sus datos: son estructuras distintas enlazadas por identificadores.',
    alt: 'Diagrama de un filesystem Ext mostrando directorios, inodes y bloques de datos.'
  },
  {
    id: 'fourier-time-frequency', area: 'computers', lessonIds: ['sig-fourier-transform','sig-dft','sig-fft','sig-spectra-windowing'], studyOrder: 1,
    title: 'Fourier: la misma señal vista en tiempo y frecuencia',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Fourier_transform_time_and_frequency_domains.gif',
    source: 'https://commons.wikimedia.org/wiki/File:Fourier_transform_time_and_frequency_domains.gif',
    credit: 'Lucas V. Barbosa · Wikimedia Commons', license: 'Dominio público',
    caption: 'Observa cómo una señal compleja se descompone en componentes sinusoidales y cómo esas componentes aparecen como picos en frecuencia. Después pregunta qué cambia al muestrear una ventana finita: ahí entran DFT, leakage y windowing.',
    alt: 'Animación que relaciona el dominio temporal de una señal con su representación en frecuencia mediante Fourier.'
  },
  {
    id: 'http2-http3-stack', area: 'networks', lessonIds: ['app-http2','app-http3'], studyOrder: 1,
    title: 'HTTP/2 frente a HTTP/3: TCP+TLS frente a QUIC',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/HTTP-2_vs._HTTP-3_Protocol_Stack.svg',
    source: 'https://commons.wikimedia.org/wiki/File:HTTP-2_vs._HTTP-3_Protocol_Stack.svg',
    credit: 'Sedrubal · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'No leas la figura como “HTTP/3 usa UDP y ya”. La clave es que QUIC integra transporte seguro y multiplexación sobre UDP. Compara dónde viven TLS, control de pérdidas y streams, y relaciona eso con head-of-line blocking.',
    alt: 'Comparación de las pilas de protocolos HTTP/2 y HTTP/3.'
  },
  {
    id: 'sdf-raymarch-steps', area: 'demoscene', lessonIds: ['ray-sdf','ray-raymarch','ray-sphere-tracing'], studyOrder: 1,
    title: 'SDF ray marching: avanzar según la distancia segura',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Visualization_of_SDF_ray_marching_algorithm.png',
    source: 'https://commons.wikimedia.org/wiki/File:Visualization_of_SDF_ray_marching_algorithm.png',
    credit: 'Teadrinker · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Cada círculo representa una distancia mínima segura hasta la superficie. Sigue los pasos del rayo y explica por qué una SDF correcta permite avanzar más que un paso fijo sin atravesar geometría. Después piensa qué ocurre si la función no es una distancia conservadora.',
    alt: 'Visualización paso a paso del algoritmo de ray marching sobre un signed distance field.'
  },
  {
    id: 'pixel-dithering-techniques', area: 'pixelart', lessonIds: ['pixelart-dithering','pixelart-palettes','pixelart-color'], studyOrder: 1,
    title: 'Dithering en pixel art: patrones, ratios y textura',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/PixelArtDitherings.gif',
    source: 'https://commons.wikimedia.org/wiki/File:PixelArtDitherings.gif',
    credit: 'Wikimedia Commons', license: 'GFDL 1.2+',
    caption: 'Compara los patrones por densidad y dirección, no solo por “ruido visual”. El dithering mezcla perceptualmente dos colores, pero también introduce textura; decide cuándo esa textura ayuda al material y cuándo destruye clusters y silueta.',
    alt: 'Muestra de varias técnicas de dithering utilizadas en pixel art.'
  },
  {
    id: 'raft-mechanism', area: 'os', lessonIds: ['consensus','raft','leader-election'], studyOrder: 1,
    title: 'Raft: pensar en roles, términos y replicación del log',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/RAFT.png',
    source: 'https://commons.wikimedia.org/wiki/File:RAFT.png',
    credit: 'Bruintje71 · Wikimedia Commons', license: 'Dominio público',
    caption: 'Usa la figura como mapa conceptual y vuelve enseguida al mecanismo: follower/candidate/leader, términos crecientes, elección y log replicado. No confundas “tener líder” con “tener consenso”: las reglas de quorum y commit son lo que preserva seguridad.',
    alt: 'Ilustración conceptual del mecanismo Raft para consenso distribuido.'
  }

  ,{
    id: 'mcu-stm32-die', area: 'electronics', lessonIds: ['mcu-system','mcu-stm32'], studyOrder: 1,
    title: 'STM32 por dentro: el microcontrolador también es una pieza física',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/STM32F103VGT6-HD.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:STM32F103VGT6-HD.jpg',
    credit: 'ZeptoBars · Wikimedia Commons', license: 'CC BY 3.0',
    caption: 'No intentes reconocer cada transistor. Usa la die photo para recordar que CPU, SRAM, Flash/periféricos e interconexión terminan ocupando área real. Compárala con el block diagram del datasheet y pregunta qué bloques consumen más superficie y por qué.',
    alt: 'Microfotografía del die de un STM32F103VGT6 ARM Cortex-M3.'
  },
  {
    id: 'spi-timing', area: 'electronics', lessonIds: ['mcu-spi'], studyOrder: 1,
    title: 'SPI: reloj, datos y el instante exacto de muestreo',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/SPI_timing_diagram.svg',
    source: 'https://commons.wikimedia.org/wiki/File:SPI_timing_diagram.svg',
    credit: 'Cburnett · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'Sigue SCLK y las líneas de datos por flancos. El ejercicio importante es decidir en qué flanco se cambia y en cuál se captura un bit; después conecta esa decisión con CPOL/CPHA y con un fallo real de configuración entre master y slave.',
    alt: 'Diagrama temporal del bus SPI con reloj y señales de datos.'
  },
  {
    id: 'fpga-fabric', area: 'electronics', lessonIds: ['fpga-architecture','fpga-place-route'], studyOrder: 1,
    title: 'FPGA: lógica programable más una red de interconexión',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/FPGA_MPU_STM32.png',
    source: 'https://commons.wikimedia.org/wiki/File:FPGA_MPU_STM32.png',
    credit: 'SergeMoutou · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Úsala para separar dos ideas: recursos lógicos y conexiones físicas. En RTL puedes escribir una relación compacta, pero synthesis/place-and-route deben mapearla a LUTs, registros, bloques dedicados y rutas con retraso real.',
    alt: 'Esquema de una FPGA conectada a un STM32 y periféricos, usado para razonar sobre bloques e interconexión.'
  },
  {
    id: 'nand-floating-gate', area: 'computers', lessonIds: ['nand-ftl-wear'], studyOrder: 1,
    title: 'NAND Flash: una celda de puerta flotante no se comporta como RAM',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/NAND_FGMOS.png',
    source: 'https://commons.wikimedia.org/wiki/File:NAND_FGMOS.png',
    credit: 'David Gianluigi Refaldi · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Localiza control gate, floating gate, source y drain. Relaciona carga almacenada con threshold voltage y después vuelve al SSD: program/erase, páginas, bloques, ECC, garbage collection y wear leveling existen porque la física de la celda impone restricciones.',
    alt: 'Esquema de un transistor de puerta flotante usado en memoria NAND Flash.'
  },
  {
    id: 'dhcp-dora', area: 'networks', lessonIds: ['ip-dhcp'], studyOrder: 1,
    title: 'DHCP DORA: descubrir, ofrecer, solicitar y confirmar',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/DHCPDORA.png',
    source: 'https://commons.wikimedia.org/wiki/File:DHCPDORA.png',
    credit: 'Endaargaanweweer · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'Sigue Discover → Offer → Request → ACK y pregunta por qué el cliente puede necesitar broadcast antes de tener una IP utilizable. Después captura un lease real y localiza dirección, máscara, gateway, DNS, lease time y server identifier.',
    alt: 'Diagrama del proceso DHCP DORA entre cliente y servidor.'
  },
  {
    id: 'oauth2-flow', area: 'cyber', lessonIds: ['web-oauth'], studyOrder: 1,
    title: 'OAuth 2.0: roles y redirecciones antes de hablar de tokens',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/OAuth2.0Flow.png',
    source: 'https://commons.wikimedia.org/wiki/File:OAuth2.0Flow.png',
    credit: 'Jannik Oehme · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Identifica resource owner, client, authorization server y resource server. Marca qué viaja por el user-agent y qué debe ir por canal directo. Luego comprueba redirect URI, state y PKCE: OAuth delega autorización; no es por sí solo un protocolo de identidad.',
    alt: 'Diagrama del flujo de OAuth 2.0 entre usuario, cliente, servidor de autorización y recurso.'
  }
  ,{
    id: 'uart-frame-timing', area: 'electronics', lessonIds: ['mcu-uart'], studyOrder: 1,
    title: 'UART: una trama asíncrona observada en el tiempo',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/UART_timing_diagram.svg',
    source: 'https://commons.wikimedia.org/wiki/File:UART_timing_diagram.svg',
    credit: 'IngenieroLoco · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Localiza idle, start bit, bits de datos y stop. Después calcula el tiempo de bit para tu baud rate y pregunta qué ocurre si transmisor y receptor discrepan demasiado en reloj: UART no comparte una línea de clock.',
    alt: 'Diagrama temporal de una transmisión UART asíncrona.'
  },
  {
    id: 'i2c-transfer-timing', area: 'electronics', lessonIds: ['mcu-i2c'], studyOrder: 1,
    title: 'I²C: start, datos, ACK y stop sobre SDA/SCL',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/I2C_data_transfer.svg',
    source: 'https://commons.wikimedia.org/wiki/File:I2C_data_transfer.svg',
    credit: 'Marcin Floryan · Wikimedia Commons', license: 'Dominio público',
    caption: 'Observa cuándo SDA puede cambiar sin convertirse en START/STOP y dónde aparece ACK/NACK. Conecta el dibujo con open-drain, pull-ups, clock stretching y capacitancia del bus; la forma de onda ideal es solo el principio.',
    alt: 'Diagrama temporal de transferencia de datos en un bus I2C.'
  },
  {
    id: 'pcie-topology', area: 'computers', lessonIds: ['drivers-pcie'], studyOrder: 1,
    title: 'PCI Express: root complex, switches y endpoints',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Example_PCI_Express_Topology.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Example_PCI_Express_Topology.svg',
    credit: 'Mliu92 · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Sigue una transacción desde CPU/root complex hasta un endpoint y distingue upstream/downstream ports. PCIe es una red punto a punto jerárquica, no un bus eléctrico compartido como PCI clásico.',
    alt: 'Topología de ejemplo de PCI Express con root complex, switch y endpoints.'
  },
  {
    id: 'nat-address-translation', area: 'networks', lessonIds: ['ip-nat'], studyOrder: 1,
    title: 'NAT: qué campos cambian y qué estado debe recordar el traductor',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/NAT_Concept-en.svg',
    source: 'https://commons.wikimedia.org/wiki/File:NAT_Concept-en.svg',
    credit: 'Michel Bakni · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Compara el paquete antes y después del traductor y reconstruye la entrada de estado necesaria para invertir la operación en la respuesta. Después repite el razonamiento para NAPT/PAT con varios hosts compartiendo una IPv4 pública.',
    alt: 'Diagrama de traducción de direcciones IPv4 mediante NAT.'
  },
  {
    id: 'two-level-branch-predictor', area: 'computers', lessonIds: ['branch-prediction'], studyOrder: 1,
    title: 'Branch prediction adaptativa de dos niveles',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Two-level_branch_prediction.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Two-level_branch_prediction.svg',
    credit: 'Orwa diraneyya · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'Separa historial de branches de la tabla de contadores. Simula a mano una secuencia tomada/no tomada y observa cómo el predictor aprende correlaciones; después pregunta qué aliasing aparece cuando múltiples branches comparten entradas.',
    alt: 'Esquema de un predictor de saltos adaptativo de dos niveles.'
  },
  {
    id: 'gan-generator-discriminator', area: 'ai', lessonIds: ['gen-gans','gen-gan-stability'], studyOrder: 1,
    title: 'GAN: generador y discriminador dentro de un juego',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Generative_Adversarial_Network_illustration.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Generative_Adversarial_Network_illustration.svg',
    credit: 'Mtanti · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Traza por separado los datos reales y el ruido latente. El discriminador recibe reales y falsos; el generador solo recibe señal de entrenamiento a través del discriminador. Úsalo para explicar por qué el entrenamiento es un juego y por qué mode collapse no se ve en una única muestra bonita.',
    alt: 'Ilustración de una GAN con generador, imágenes reales y discriminador.'
  },
  {
    id: 'diffusion-forward-noise', area: 'ai', lessonIds: ['gen-diffusion-forward','gen-diffusion-reverse','gen-score-matching'], studyOrder: 1,
    title: 'Diffusion: destruir estructura con ruido antes de aprender a revertirla',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Example_of_Forward_Diffusion_Models.png',
    source: 'https://commons.wikimedia.org/wiki/File:Example_of_Forward_Diffusion_Models.png',
    credit: 'MrAlanKoh · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Sigue cómo una imagen pierde estructura al aumentar el ruido. El proceso forward se define y no se “aprende”; el modelo aprende información útil para invertir/denoising. Relaciónalo con timestep, noise schedule y el objetivo que realmente predice tu implementación.',
    alt: 'Secuencia de una imagen a la que se añade progresivamente ruido en un modelo de difusión.'
  }

  ,{
    id: 'dma-controller-flow', area: 'electronics', lessonIds: ['mcu-dma','drivers-dma-iommu'], studyOrder: 1,
    title: 'DMA: mover datos sin hacer que la CPU copie cada palabra',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/SistemaDMAC.svg',
    source: 'https://commons.wikimedia.org/wiki/File:SistemaDMAC.svg',
    credit: 'DnaX · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Sigue quién configura la transferencia, quién arbitra el acceso y qué caminos llevan memoria/periférico. DMA no significa “sin CPU”: la CPU programa la operación y normalmente procesa una interrupción o estado de finalización.',
    alt: 'Diagrama de acceso directo a memoria mediante un controlador DMA.'
  },
  {
    id: 'interrupt-control-flow', area: 'os', lessonIds: ['drivers-interrupts-irq','mcu-interrupts'], studyOrder: 1,
    title: 'Interrupción: del evento al handler y vuelta al código interrumpido',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Interrupts.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Interrupts.svg',
    credit: 'Jens Kreber y colaboradores · Wikimedia Commons', license: 'CC BY-SA / GFDL (ver ficha)',
    caption: 'Reconstruye el cambio de control: evento, reconocimiento, salvado de contexto, handler y retorno. Separa latencia de interrupción de tiempo total del handler y pregunta qué trabajo conviene diferir fuera del contexto urgente.',
    alt: 'Flujograma del proceso de atención de una interrupción.'
  },
  {
    id: 'websocket-full-duplex', area: 'networks', lessonIds: ['app-websocket'], studyOrder: 1,
    title: 'WebSocket: canal bidireccional después del handshake',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Websocket.png',
    source: 'https://commons.wikimedia.org/wiki/File:Websocket.png',
    credit: 'Mrharispe · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Usa la figura para abandonar el modelo petición→respuesta estricto: después del upgrade ambos extremos pueden enviar frames. No confundas, sin embargo, un frame WebSocket con un segmento TCP ni asumas que coinciden sus fronteras.',
    alt: 'Diagrama de comunicación bidireccional entre cliente y servidor mediante WebSocket.'
  },
  {
    id: 'doppler-wavefronts', area: 'gamedev', lessonIds: ['gameaudio-doppler','gameaudio-spatial-audio'], studyOrder: 1,
    title: 'Doppler: movimiento, frente de onda y frecuencia observada',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Doppler_effect_1.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Doppler_effect_1.svg',
    credit: 'Bartek444 · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Observa cómo cambia el espaciado de frentes de onda en la dirección relativa del movimiento. En audio de juegos importa la componente radial fuente-listener: moverse de lado no produce el mismo shift que acercarse a la misma velocidad.',
    alt: 'Diagrama del efecto Doppler con fuente, observador y frentes de onda.'
  },
  {
    id: 'usb-type-a-physical', area: 'computers', lessonIds: ['drivers-usb'], studyOrder: 1,
    title: 'USB: el conector físico no es el protocolo',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/USB_Type-A_Diagram.svg',
    source: 'https://commons.wikimedia.org/wiki/File:USB_Type-A_Diagram.svg',
    credit: 'Mobius · Wikimedia Commons', license: 'Dominio público',
    caption: 'Empieza por separar capa física de arquitectura lógica: identificar VBUS/D+/D−/GND no explica enumeración, descriptors, endpoints ni transfer types. Úsalo como ancla física antes de subir al modelo host-centric del protocolo.',
    alt: 'Diagrama de un conector USB Type-A.'
  }

  ,{
    id: 'deadlock-resource-graph', area: 'os', lessonIds: ['deadlock-livelock-starvation'], studyOrder: 1,
    title: 'Deadlock: ciclo de espera entre procesos y recursos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/DeadlockGraph.svg',
    source: 'https://commons.wikimedia.org/wiki/File:DeadlockGraph.svg',
    credit: 'Niqueco · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'Sigue las aristas como dependencias de espera y localiza el ciclo. Después separa la condición gráfica del diagnóstico real: con una única instancia por recurso, un ciclo basta para demostrar deadlock; con múltiples instancias, el análisis necesita más información.',
    alt: 'Grafo dirigido que representa un deadlock mediante un ciclo de espera.'
  },
  {
    id: 'astar-grid-pathfinding', area: 'gamedev', lessonIds: ['gameai-astar','gameai-pathfinding'], studyOrder: 1,
    title: 'A*: coste recorrido + heurística hacia el objetivo',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pathfinding_A_Star.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Pathfinding_A_Star.svg',
    credit: 'Dbenzhuser · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'Observa cómo el algoritmo evita obstáculos y dirige la búsqueda mediante una heurística. No memorices el camino rojo: compara g(n), h(n) y f(n)=g+h, y pregunta qué ocurre si h sobreestima o si cambias el coste de movimiento.',
    alt: 'Visualización de A estrella en una cuadrícula con inicio, objetivo, obstáculos y camino encontrado.'
  },
  {
    id: 'kubernetes-architecture', area: 'os', lessonIds: ['kubernetes-concepts','orchestration'], studyOrder: 1,
    title: 'Kubernetes: control plane y nodos de trabajo',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kubernetes.png',
    source: 'https://commons.wikimedia.org/wiki/File:Kubernetes.png',
    credit: 'Khtan66 · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Usa este diagrama histórico como mapa de alto nivel, no como nomenclatura exacta actual: donde aparece “master” piensa en control plane. Sigue una declaración de estado deseado desde API/controladores hasta kubelet y workload, y separa scheduling de reconciliación.',
    alt: 'Arquitectura de alto nivel de Kubernetes con plano de control y nodos de aplicaciones.'
  },
  {
    id: 'docker-architecture-specific', area: 'os', lessonIds: ['docker-internals','container-images','containers'], studyOrder: 1,
    title: 'Docker: cliente, daemon, imágenes y contenedores',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Docker-architecture.png',
    source: 'https://commons.wikimedia.org/wiki/File:Docker-architecture.png',
    credit: 'dc / Docker documentation · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Separa la interfaz del usuario de los componentes que realmente crean y ejecutan contenedores. Después compáralo con la lección: Docker moderno delega varias funciones en containerd/runc, y una imagen no es un proceso en ejecución ni una VM completa.',
    alt: 'Diagrama de arquitectura Docker con cliente, daemon, imágenes y contenedores.'
  }

  ,{
    id: 'adc-quantized-signal', area: 'electronics', lessonIds: ['analog-adc'],
    title: 'Cuantización: de una amplitud continua a niveles discretos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Quantized.signal.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Quantized.signal.svg',
    credit: 'Petr Adamek / Rbj · Wikimedia Commons', license: 'Dominio público',
    caption: 'Compara la señal continua con los niveles cuantizados. Señala el error instantáneo y pregunta qué cambia al aumentar el número de bits: baja el paso ideal, pero no desaparecen ruido, offset, INL/DNL ni errores de referencia de un ADC real.',
    alt: 'Gráfico que compara una señal continua con su versión cuantizada en niveles discretos.'
  },
  {
    id: 'skeletal-animation-blender', area: 'gamedev', lessonIds: ['anim-skeleton-hierarchy','anim-skinning'],
    title: 'Rigging: huesos que controlan una malla',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Skeletal_animation_using_Blender_software.png',
    source: 'https://commons.wikimedia.org/wiki/File:Skeletal_animation_using_Blender_software.png',
    credit: 'Banlu Kemiyatorn · Blender · Wikimedia Commons', license: 'Contenido no-UI: dominio público; interfaz Blender: GPL v2+',
    caption: 'No confundas el armature con la geometría. Identifica jerarquía de bones, pose y malla; después razona qué vértices deben recibir varios pesos y por qué la inverse bind pose es necesaria para deformar desde la pose de referencia.',
    alt: 'Captura de Blender mostrando una malla controlada por un esqueleto de huesos.'
  },
  {
    id: 'collision-bvh', area: 'gamedev', lessonIds: ['physics-collision-pipeline'],
    title: 'Broad phase: jerarquía de bounding volumes',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Example_of_bounding_volume_hierarchy.JPG',
    source: 'https://commons.wikimedia.org/wiki/File:Example_of_bounding_volume_hierarchy.JPG',
    credit: 'Houjun8022 · Wikimedia Commons', license: 'Dominio público',
    caption: 'La broad phase intenta descartar pares baratos antes de una prueba geométrica exacta. Sigue la jerarquía desde cajas grandes a pequeñas y explica por qué solapamiento de AABBs produce candidatos, no contactos definitivos.',
    alt: 'Ejemplo bidimensional de una jerarquía BVH construida con cajas delimitadoras AABB.'
  },
  {
    id: 'rl-agent-environment', area: 'ai', lessonIds: ['rl-agent-environment','rl-actions-rewards','rl-q-learning'],
    title: 'Reinforcement learning como bucle agente ↔ entorno',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Agent-environment-diagram-rl.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Agent-environment-diagram-rl.svg',
    credit: 'Martin Thoma · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'Sigue un solo timestep: el agente recibe estado/observación y recompensa, elige una acción y modifica la transición del entorno. Después pregunta qué información debe contener el estado para que la propiedad de Markov sea una aproximación razonable.',
    alt: 'Diagrama de reinforcement learning con un agente intercambiando acciones, estados y recompensas con un entorno.'
  },
  {
    id: 'same-origin-policy', area: 'cyber', lessonIds: ['web-boundaries-sop','web-cors'],
    title: 'Same-Origin Policy: la frontera la define el origin',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Same_Origin_Policy.png',
    source: 'https://commons.wikimedia.org/wiki/File:Same_Origin_Policy.png',
    credit: 'FirstPageSEOGroup.com · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Usa la figura como punto de partida, no como regla completa: origin = esquema + host + puerto. Distingue “el navegador puede enviar una petición” de “JavaScript puede leer la respuesta”; CORS relaja lecturas concretas, no desactiva la SOP.',
    alt: 'Ilustración de Same-Origin Policy mostrando aislamiento entre orígenes web.'
  },
  {
    id: 'ipv6-header-format', area: 'networks', lessonIds: ['ip-ipv6-addressing','ip-fragmentation-pmtu','ip-dual-stack'],
    title: 'Cabecera base IPv6: 40 bytes y campos fijos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/IPv6_Header.svg',
    source: 'https://commons.wikimedia.org/wiki/File:IPv6_Header.svg',
    credit: 'Bruno Wenk · Wikimedia Commons', license: 'CC BY-SA 3.0',
    caption: 'Compara mentalmente con IPv4: localiza Traffic Class, Flow Label, Payload Length, Next Header y Hop Limit. Observa qué campos ya no están en la cabecera base y relaciona Next Header con extension headers y protocolos superiores.',
    alt: 'Diagrama con el formato y tamaños de los campos de la cabecera base IPv6.'
  }

  ,{
    id: 'mesi-state-machine', area: 'computers', lessonIds: ['coherencia-mesi'],
    title: 'MESI: estados y transiciones de coherencia',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/MESI_protocol_activity_diagram.png',
    source: 'https://commons.wikimedia.org/wiki/File:MESI_protocol_activity_diagram.png',
    credit: 'Jackbrear · Wikimedia Commons', license: 'CC0 / dominio público según ficha Commons',
    caption: 'Sigue una línea de caché cuando un core lee, otro escribe y aparecen invalidaciones. La figura ayuda a separar coherencia de caché de consistencia de memoria: MESI controla copias de líneas, no el orden abstracto de todas las operaciones del programa.',
    alt: 'Diagrama de actividad del protocolo MESI entre cachés privadas y memoria.'
  },
  {
    id: 'numa-topology', area: 'computers', lessonIds: ['dram-controlador-numa'],
    title: 'NUMA: memoria local y memoria remota',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/NUMA.svg',
    source: 'https://commons.wikimedia.org/wiki/File:NUMA.svg',
    credit: 'Moop2000 · Wikimedia Commons', license: 'Dominio público',
    caption: 'Compara un acceso al banco de memoria conectado al mismo nodo con uno que cruza la interconexión. Después relaciona la topología con first-touch, afinidad de CPU y políticas de memoria: NUMA no cambia el puntero del programa, cambia el coste físico del acceso.',
    alt: 'Arquitectura NUMA con varios procesadores y bancos de memoria locales conectados por una interconexión.'
  },
  {
    id: 'nvme-queues', area: 'computers', lessonIds: ['nvme-controladores'],
    title: 'NVMe: pares de submission/completion queues',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/NVMe_Scalable_Queuing_Interface.svg',
    source: 'https://commons.wikimedia.org/wiki/File:NVMe_Scalable_Queuing_Interface.svg',
    credit: 'Dmitry Nosachev · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Observa que NVMe no es simplemente “un SSD rápido”: la interfaz usa colas de envío y finalización pensadas para paralelismo. Relaciona cada queue pair con cores, interrupciones/polling y profundidad de cola antes de hablar de IOPS.',
    alt: 'Diagrama de la interfaz escalable de colas de NVMe con submission y completion queues.'
  },
  {
    id: 'ecs-layout', area: 'gamedev', lessonIds: ['game-ecs'],
    title: 'ECS: entidades como IDs y componentes en tablas',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/ECS_Simple_Layout.svg',
    source: 'https://commons.wikimedia.org/wiki/File:ECS_Simple_Layout.svg',
    credit: 'Guypeter4 · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'Cada entidad es un identificador y cada tabla contiene un tipo de componente. Usa la figura para separar identidad, datos y sistemas; después pregunta qué patrón de memoria produce iterar solo Position+Velocity frente a recorrer objetos heterogéneos.',
    alt: 'Esquema simple de Entity Component System con entidades como filas e información separada en tablas de componentes.'
  },
  {
    id: 'cloud-load-balancing', area: 'networks', lessonIds: ['load-balancers-cloud'],
    title: 'Load balancing: repartir tráfico y volver a equilibrar',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Loadbalancing.png',
    source: 'https://commons.wikimedia.org/wiki/File:Loadbalancing.png',
    credit: 'Jomaa Narjes · Wikimedia Commons', license: 'CC BY-SA 3.0',
    caption: 'No confundas “repartir peticiones” con garantizar disponibilidad. Observa cómo cambia la distribución cuando un backend se satura o desaparece y piensa qué señal usa el balanceador: conexiones, requests, latencia, health checks o capacidad estimada.',
    alt: 'Diagrama de balanceo y rebalanceo de carga entre varios servidores.'
  },
  {
    id: 'fork-join-parallelism', area: 'computers', lessonIds: ['conc-task-parallelism'],
    title: 'Fork–join: dividir trabajo y esperar la recomposición',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Fork-join-queue.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Fork-join-queue.svg',
    credit: 'Gareth Jones · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'Sigue una tarea que se divide en ramas y vuelve a sincronizarse. La barrera de join hace visible una idea clave: el tiempo total queda condicionado por la rama más lenta y por los costes de particionado, colas y sincronización.',
    alt: 'Diagrama de un sistema fork-join donde una tarea se divide en varias colas y luego se sincroniza.'
  }

  ,{
    id: 'ethernet-frame-fields', area: 'networks', lessonIds: ['lan-ethernet-frame'],
    title: 'Ethernet: anatomía de una trama',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ethernet_frame.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Ethernet_frame.svg',
    credit: 'Mikm · Wikimedia Commons', license: 'Dominio público',
    caption: 'Recorre destination/source MAC, EtherType/Length, payload y FCS. Después calcula el tamaño mínimo de payload y explica por qué una trama no lleva una dirección IP “en el mismo campo”: Ethernet encapsula protocolos superiores, no los sustituye.',
    alt: 'Diagrama horizontal de los campos principales de una trama Ethernet y sus tamaños.'
  },
  {
    id: 'arp-query-flow', area: 'networks', lessonIds: ['lan-arp'],
    title: 'ARP: de una IP local a una MAC',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Protocol_ARP.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Protocol_ARP.svg',
    credit: 'Papapep · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Sigue quién pregunta, quién escucha el broadcast y quién responde. Luego cambia el destino por una IP fuera de la subred: el host ya no busca la MAC remota, sino la del gateway. Esa diferencia evita memorizar ARP como “IP→MAC” sin contexto.',
    alt: 'Diagrama de una consulta ARP con petición broadcast y respuesta del host que posee la dirección IP.'
  },
  {
    id: 'tcp-congestion-window', area: 'networks', lessonIds: ['transport-congestion-control','transport-slow-start-loss'],
    title: 'TCP: slow start y congestion avoidance',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/TCP_Slow-Start_and_Congestion_Avoidance.svg',
    source: 'https://commons.wikimedia.org/wiki/File:TCP_Slow-Start_and_Congestion_Avoidance.svg',
    credit: 'Fleshgrinder · Wikimedia Commons', license: 'GPLv3 según ficha Commons',
    caption: 'Observa cómo cwnd cambia por RTT y qué ocurre tras una señal de congestión. No leas la curva como una receta eterna de “duplicar y luego sumar uno”: úsala para entender feedback, ventana efectiva y por qué pérdida/ECN cambian la tasa de envío.',
    alt: 'Gráfica de la evolución de la congestion window de TCP durante slow start y congestion avoidance.'
  },
  {
    id: 'anycast-routing', area: 'networks', lessonIds: ['global-anycast','global-routing-scale-security'],
    title: 'Anycast: una dirección, varios destinos posibles',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Anycast.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Anycast.svg',
    credit: 'Easyas12c · Wikimedia Commons', license: 'Dominio público',
    caption: 'La misma dirección se anuncia desde varios lugares y el routing decide qué instancia resulta alcanzable/preferida. Pregunta qué pasa cuando cambia BGP durante una sesión: anycast es una propiedad del encaminamiento, no una garantía de “servidor geográficamente más cercano”.',
    alt: 'Visualización de routing anycast con varios servidores anunciando una misma dirección hacia diferentes clientes.'
  },
  {
    id: 'cdn-cache-topology', area: 'networks', lessonIds: ['global-cdn'],
    title: 'CDN: caches/proxies entre usuarios y origen',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Content_Distribution_Network_diagram.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Content_Distribution_Network_diagram.svg',
    credit: 'Avelludo · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Distingue origen, nodos de cache/proxy y clientes. Para estudiar de verdad la figura, marca qué petición puede ser HIT/MISS, dónde se invalida contenido y qué cambia si el objeto es dinámico. Una CDN reduce distancia/carga solo cuando su política de placement y cache encaja con el tráfico.',
    alt: 'Diagrama de una Content Delivery Network con varios proxies o caches distribuidos entre clientes y servidor de origen.'
  },
  {
    id: 'icmp-header-format', area: 'networks', lessonIds: ['ip-icmp'],
    title: 'ICMP: Type, Code, Checksum y datos específicos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/ICMP_header_-_General-en.svg',
    source: 'https://commons.wikimedia.org/wiki/File:ICMP_header_-_General-en.svg',
    credit: 'Michel Bakni · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Empieza por Type/Code: juntos determinan qué significa el resto del mensaje. Después relaciona Echo, Destination Unreachable y Time Exceeded con ping/traceroute. ICMP no es “el protocolo de ping”: es señalización y diagnóstico de la capa IP.',
    alt: 'Formato general de una cabecera ICMPv4 o ICMPv6 con campos Type, Code y Checksum.'
  }

  ,{
    id: 'linux-syscall-interface-p18', area: 'os', lessonIds: ['syscalls-api-abi'],
    title: 'Linux: libc, API y system call interface',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Linux_kernel_System_Call_Interface_and_glibc.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Linux_kernel_System_Call_Interface_and_glibc.svg',
    credit: 'ScotXW · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'Sigue una operación desde una función de biblioteca hasta la interfaz de syscalls del kernel. Úsala para separar API, ABI y syscall: una función como fopen puede envolver varias operaciones y no tiene por qué corresponder uno-a-uno con una syscall.',
    alt: 'Diagrama de glibc y la interfaz de llamadas al sistema del kernel Linux.'
  },
  {
    id: 'raster-triangle-p18', area: 'gamedev', lessonIds: ['gfx-rasterization-triangles'],
    title: 'Rasterización: convertir un triángulo en muestras de píxel',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Rasterisation-triangle_example.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Rasterisation-triangle_example.svg',
    credit: 'Wojciech Mula · Wikimedia Commons', license: 'Licencia indicada en la ficha de Wikimedia Commons',
    caption: 'Observa qué muestras quedan cubiertas por el triángulo y cuáles no. La geometría continua debe convertirse en decisiones discretas por píxel; después conecta esas decisiones con reglas de borde, interpolación y antialiasing.',
    alt: 'Ejemplo de rasterización de un triángulo sobre una cuadrícula de píxeles.'
  },
  {
    id: 'z-buffer-p18', area: 'gamedev', lessonIds: ['gfx-depth-zbuffer'],
    title: 'Z-buffer: profundidad por píxel',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Z-buffer.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Z-buffer.svg',
    credit: 'Vierge Marie · Wikimedia Commons', license: 'Dominio público',
    caption: 'Cada fragmento compite contra la profundidad almacenada para la misma muestra. Reconstruye qué valores cambian al dibujar geometría superpuesta y por qué el depth test permite resolver visibilidad sin ordenar todos los triángulos de la escena.',
    alt: 'Diagrama que ilustra el funcionamiento de un Z-buffer para resolver profundidad.'
  },
  {
    id: 'z-fighting-p18', area: 'gamedev', lessonIds: ['gfx-depth-zbuffer'],
    title: 'Z-fighting: cuando dos profundidades casi coinciden',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Z_buffer-Z_fighting.png',
    source: 'https://commons.wikimedia.org/wiki/File:Z_buffer-Z_fighting.png',
    credit: 'Wikimedia Commons', license: 'Consultar ficha Commons para reutilización',
    caption: 'Compara esta figura con el Z-buffer ideal. Cuando dos superficies producen valores de profundidad casi indistinguibles, la precisión finita puede hacer que unas muestras ganen y otras pierdan de forma inestable.',
    alt: 'Ejemplo visual del artefacto z-fighting producido por superficies coplanares.'
  },
  {
    id: 'normal-map-scene-result-p18', area: 'gamedev', lessonIds: ['render-normal-mapping'],
    title: 'Normal mapping: geometría, normal map y resultado',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Normal_map_example_with_scene_and_result.png',
    source: 'https://commons.wikimedia.org/wiki/File:Normal_map_example_with_scene_and_result.png',
    credit: 'Julian Herzog · Wikimedia Commons', license: 'CC BY 4.0 / GFDL',
    caption: 'Lee la secuencia izquierda→centro→derecha: geometría detallada, textura de normales y plano final. La técnica cambia normales usadas por iluminación, no la silueta ni la geometría real; por eso puede aparentar relieve con pocos polígonos.',
    alt: 'Comparación entre escena geométrica, normal map y resultado aplicado sobre un plano.'
  },
  {
    id: 'projected-shadow-p18', area: 'gamedev', lessonIds: ['render-shadow-maps','render-shadows-visibility'],
    title: 'Sombras: proyección y relación luz–oclusor–receptor',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Projected_Shadow.png',
    source: 'https://commons.wikimedia.org/wiki/File:Projected_Shadow.png',
    credit: 'Wikimedia Commons', license: 'Licencia indicada en la ficha de Wikimedia Commons',
    caption: 'Antes de implementar shadow maps, identifica la geometría del problema: una fuente/dirección de luz, un oclusor y un receptor. Después compárala con el algoritmo de dos pasadas: depth desde la luz y test de visibilidad desde la cámara.',
    alt: 'Diagrama geométrico de proyección de una sombra sobre un plano.'
  }

  ,{
    id: 'cache-direct-mapped-detail', area: 'computers', lessonIds: ['cache-mapping'], studyOrder: 3,
    title: 'Caché direct-mapped: índice, tag y una única línea candidata',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Direct_Mapped_Cache.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Direct_Mapped_Cache.svg',
    credit: 'Ferry24.Milan · Wikimedia Commons', license: 'CC BY-SA / GFDL según ficha Commons',
    caption: 'Sigue los bits de una dirección: el índice selecciona exactamente una línea y el tag decide hit o miss. Después contrasta esta rigidez con la figura set-associative ya incluida: la asociatividad reduce conflictos a cambio de más comparadores y política de reemplazo.',
    alt: 'Diagrama de una caché direct-mapped con dirección dividida en tag, índice y offset.'
  },
  {
    id: 'backprop-layer-derivatives', area: 'ai', lessonIds: ['nn-backprop'],
    title: 'Backpropagation: forward, loss y derivadas hacia atrás',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Back_Propagation_Example.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Back_Propagation_Example.svg',
    credit: 'Andreas Maier et al. · Wikimedia Commons', license: 'CC BY 4.0',
    caption: 'No interpretes las flechas hacia atrás como “datos viajando al revés”. El forward calcula activaciones y pérdida; backprop reutiliza la regla de la cadena para acumular derivadas locales. Intenta escribir qué jacobiano necesita cada arista antes de mirar una implementación automática.',
    alt: 'Diagrama de backpropagation con forward pass, loss y propagación de derivadas por capas.'
  },
  {
    id: 'gameai-fsm-states', area: 'gamedev', lessonIds: ['gameai-fsm'],
    title: 'Máquina de estados: estados, transiciones y condiciones',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Finite_State_Machine_diagram.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Finite_State_Machine_diagram.jpg',
    credit: 'Curranlee · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Úsala como estructura, no como receta de IA: un estado representa un modo de comportamiento y una transición una condición explícita. Después imagina Wander, Chase, Attack y Flee y busca cuándo el número de transiciones empieza a crecer de forma difícil de mantener.',
    alt: 'Diagrama genérico de una máquina finita de estados con nodos y transiciones.'
  },
  {
    id: 'audio-spectrogram', area: 'gamedev', lessonIds: ['gameaudio-digital-audio','gameaudio-realtime-dsp'],
    title: 'Espectrograma: frecuencia y energía a lo largo del tiempo',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Musika_audio_espektrograma.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Musika_audio_espektrograma.jpg',
    credit: 'Naroa Martínez Cerezo · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'Un waveform te dice amplitud en el tiempo; un espectrograma añade cómo se distribuye la energía por frecuencia. Busca transitorios verticales, bandas sostenidas y cambios de contenido antes de relacionarlos con filtros, reverb, compresión o diseño de sonido.',
    alt: 'Espectrograma de audio musical mostrando energía por frecuencia a lo largo del tiempo.'
  }

  ,{
    id: 'vector-clock-events', area: 'computers', lessonIds: ['distributed-clocks','lamport-clocks'],
    title: 'Vector clocks: causalidad entre procesos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Vector_Clock.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Vector_Clock.svg',
    credit: 'Nae\'blis / D. Düsentrieb · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'Sigue los eventos y mensajes entre procesos y compara los vectores. Úsalo para ver qué información adicional conserva un vector clock frente a un reloj de Lamport: puede distinguir eventos concurrentes cuando ninguno de los vectores domina al otro.',
    alt: 'Diagrama de relojes vectoriales con eventos locales y mensajes entre procesos.'
  },
  {
    id: 'hypervisor-types', area: 'computers', lessonIds: ['hypervisors'],
    title: 'Hipervisores tipo 1 y tipo 2',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hyperviseur.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Hyperviseur.svg',
    credit: 'Scsami · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'Compara dónde se sitúa el hypervisor respecto al hardware y al sistema operativo anfitrión. La figura es una clasificación conceptual: luego contrástala con KVM, Hyper-V, ESXi o VirtualBox, donde los límites reales pueden ser más matizados.',
    alt: 'Comparación visual entre hipervisor tipo 1 sobre hardware e hipervisor tipo 2 sobre un sistema operativo anfitrión.'
  },
  {
    id: 'btree-insertion-sequence', area: 'computers', lessonIds: ['btrees'],
    title: 'B-tree: inserción y split de nodos',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/B_tree_insertion_example.png',
    source: 'https://commons.wikimedia.org/wiki/File:B_tree_insertion_example.png',
    credit: 'Maxtremus · Wikimedia Commons', license: 'Dominio público',
    caption: 'Sigue la inserción hasta que un nodo se llena y debe dividirse. Lo importante no es memorizar el dibujo, sino conectar fan-out alto, altura pequeña y coste de I/O: por eso estas estructuras encajan tan bien con páginas de almacenamiento.',
    alt: 'Secuencia de inserciones en un B-tree de orden 3 mostrando divisiones de nodos.'
  },
  {
    id: 'cap-theorem-visual', area: 'computers', lessonIds: ['cap'],
    title: 'CAP: consistencia, disponibilidad y particiones',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/CAP_theorem_diagram.png',
    source: 'https://commons.wikimedia.org/wiki/File:CAP_theorem_diagram.png',
    credit: 'Ashish.rana44 · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Úsalo solo como mapa visual, no como el eslogan “elige dos”. La decisión relevante aparece cuando existe una partición: el sistema debe decidir qué operaciones rechaza o qué consistencia relaja mientras la comunicación está rota.',
    alt: 'Diagrama del teorema CAP con consistencia, disponibilidad y tolerancia a particiones.'
  }

  ,{
    id: 'ieee754-layout', area: 'computers', lessonIds: ['ieee754'],
    title: 'IEEE 754 binary32: signo, exponente y fracción',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/IEEE_754_Single_Floating_Point_Format.svg',
    source: 'https://commons.wikimedia.org/wiki/File:IEEE_754_Single_Floating_Point_Format.svg',
    credit: 'Codekaizen · Wikimedia Commons', license: 'CC BY 3.0',
    caption: 'Lee los 32 bits como campos con funciones distintas: signo, exponente sesgado y fracción. Después intenta clasificar patrones especiales (cero, subnormal, infinito y NaN) antes de convertirlos a decimal.',
    alt: 'Distribución de bits del formato IEEE 754 de precisión simple.'
  },
  {
    id: 'utf8-encoding-example', area: 'computers', lessonIds: ['unicode-texto'],
    title: 'UTF-8: del punto de código a una secuencia de bytes',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Codificación_UTF-8.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Codificación_UTF-8.svg',
    credit: 'Marco Regueira · Wikimedia Commons', license: 'Dominio público',
    caption: 'Sigue los bits del punto de código hasta los prefijos y bytes de continuación. La figura sirve para distinguir punto de código, unidad de codificación y byte: un carácter abstracto no tiene por qué ocupar un byte ni una unidad fija.',
    alt: 'Ejemplo de codificación de un punto de código Unicode en UTF-8.'
  },
  {
    id: 'view-frustum-culling', area: 'gamedev', lessonIds: ['engine-visibility-culling'],
    title: 'Frustum culling: dentro, fuera y parcialmente visible',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/View_frustum_culling.svg',
    source: 'https://commons.wikimedia.org/wiki/File:View_frustum_culling.svg',
    credit: 'Wojciech Muła · Wikimedia Commons', license: 'CC BY-SA 3.0 / GFDL',
    caption: 'Clasifica objetos completamente dentro, fuera y cruzando los planos del frustum. Después piensa por qué un bound conservador puede dar falsos positivos aceptables, mientras un falso negativo haría desaparecer geometría visible.',
    alt: 'Diagrama de culling por frustum con objetos visibles, invisibles y parcialmente visibles.'
  },
  {
    id: 'inverse-kinematics-multiple-solutions', area: 'gamedev', lessonIds: ['anim-inverse-kinematics'],
    title: 'Inverse kinematics: una meta puede tener varias soluciones',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Inverse-kinematics-multiple-solutions.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Inverse-kinematics-multiple-solutions.svg',
    credit: 'Jan Boddez · Wikimedia Commons', license: 'Dominio público',
    caption: 'Observa dos configuraciones articulares que alcanzan el mismo end-effector. La imagen ayuda a ver por qué IK no es simplemente “invertir” FK: hacen falta restricciones, preferencias o un solver para escoger entre soluciones posibles.',
    alt: 'Manipulador planar con dos configuraciones distintas que alcanzan la misma pose final.'
  },
  {
    id: 'postgresql-mvcc', area: 'computers', lessonIds: ['mvcc'],
    title: 'MVCC: varias versiones visibles según la transacción',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/PostgreSQL_mvcc.svg',
    source: 'https://commons.wikimedia.org/wiki/File:PostgreSQL_mvcc.svg',
    credit: 'Kelti · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Sigue qué versión de una fila puede ver cada transacción. Úsala para separar “tener varias versiones” de “no usar locks”: MVCC reduce ciertos conflictos de lectura/escritura, pero no elimina todos los bloqueos ni las anomalías de aislamiento.',
    alt: 'Diagrama de control de concurrencia multiversión en PostgreSQL.'
  },
  {
    id: 'git-branches-merge', area: 'computers', lessonIds: ['git-branches','git-merge'],
    title: 'Git: ramas como referencias y merge como nuevo nodo del DAG',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Git_branches_merge.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Git_branches_merge.svg',
    credit: 'Bunyk · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Sigue los commits como nodos con padres y observa dónde divergen y convergen las ramas. Después recuerda que una branch es una referencia móvil a un commit; el grafo no almacena “carpetas duplicadas”.',
    alt: 'Grafo de commits Git con dos ramas que divergen y luego se fusionan.'
  }

  ,{
    id: 'ast-euclid', area: 'computers', lessonIds: ['ast-semantics-types'],
    title: 'AST: estructura sintáctica sin ruido de puntuación',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Abstract_syntax_tree_for_Euclidean_algorithm.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Abstract_syntax_tree_for_Euclidean_algorithm.svg',
    credit: 'Dcoetzee · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'Compara el pseudocódigo con el árbol y localiza qué detalles de superficie desaparecen y qué estructura semántica permanece. Después intenta anotar cada nodo con tipo y scope: el AST es un soporte para análisis, no un dibujo ornamental.',
    alt: 'Árbol de sintaxis abstracta del algoritmo de Euclides.'
  },
  {
    id: 'rsa-public-key-encryption', area: 'cyber', lessonIds: ['crypto-rsa'],
    title: 'Criptografía de clave pública: quién cifra y quién puede descifrar',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Public_key_encryption.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Public_key_encryption.svg',
    credit: 'David Göthberg · Wikimedia Commons', license: 'Dominio público',
    caption: 'La figura muestra la asimetría de claves, no un esquema RSA completo. Úsala para separar la idea de clave pública/privada de OAEP, PSS, hashing, aleatoriedad y validaciones de protocolo.',
    alt: 'Diagrama de cifrado de clave pública con clave pública para cifrar y clave privada para descifrar.'
  },
  {
    id: 'round-robin-scheduler', area: 'os', lessonIds: ['processes-pcb-context'],
    title: 'Round Robin: cola preparada, quantum y rotación',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Process_scheduler_-_Round_Robin_queue.ru.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Process_scheduler_-_Round_Robin_queue.ru.svg',
    credit: 'VolodyA! V Anarhist · Wikimedia Commons', license: 'Free Art License / GFDL',
    caption: 'Sigue cómo un proceso vuelve al final de la cola al agotar su quantum. Después cambia mentalmente la duración del quantum: uno demasiado pequeño eleva context switches; uno enorme acerca el comportamiento a FCFS.',
    alt: 'Diagrama de planificación Round Robin con una cola circular de procesos.'
  },
  {
    id: 'c-memory-layout', area: 'computers', lessonIds: ['c-storage-lifetime-scope'],
    title: 'Proceso C: código, datos, heap y stack',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/C-memlayout.svg',
    source: 'https://commons.wikimedia.org/wiki/File:C-memlayout.svg',
    credit: 'Yanpas · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Relaciona cada región con su duración de almacenamiento y con quién la gestiona. El esquema es conceptual: ASLR, mappings, shared libraries, guard pages y el loader hacen que un proceso real sea más rico que cuatro cajas fijas.',
    alt: 'Esquema del layout de memoria de un programa C con text, data, heap y stack.'
  },
  {
    id: 'heap-array-representation', area: 'computers', lessonIds: ['algo-heaps'],
    title: 'Heap binario: árbol completo y representación en array',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Heap-as-array.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Heap-as-array.svg',
    credit: 'Maxiantor · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Usa los índices para derivar las relaciones padre/hijos sin punteros explícitos. Después compara el coste de insertar, extraer máximo/mínimo y buscar un elemento arbitrario: la propiedad de heap no es un orden total.',
    alt: 'Max-heap binario completo y su representación equivalente en un array.'
  },
  {
    id: 'memory-pool', area: 'computers', lessonIds: ['c-fragmentation-allocator','c-allocator-project'],
    title: 'Memory pool: reservar una región y repartir bloques',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Memory_Pool.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Memory_Pool.svg',
    credit: 'Guypeter4 · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'La figura ayuda a visualizar una estrategia de pool, pero no resuelve por sí sola alignment, metadata, fragmentación ni reclamación. Úsala como punto de partida para diseñar invariantes de tu allocator educativo.',
    alt: 'Diagrama conceptual de un memory pool dividido en bloques para asignación.'
  },

  {
    id: 'vulkan-simplified-pipeline', area: 'gamedev', lessonIds: ['api-vulkan-model'],
    title: 'Vulkan: pipeline gráfico explícito',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Vulkan_simplified_pipeline.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Vulkan_simplified_pipeline.svg',
    credit: 'Alexander Overvoorde · Wikimedia Commons', license: 'CC BY-SA 4.0',
    caption: 'Usa el diagrama para identificar qué etapas son programables y qué estado debe describirse explícitamente. La idea importante no es memorizar cajas, sino entender por qué Vulkan desplaza al programa decisiones que APIs más antiguas ocultaban detrás del driver.',
    alt: 'Diagrama simplificado del pipeline gráfico de Vulkan.'
  },
  {
    id: 'lstm-cell-gates', area: 'ai', lessonIds: ['dl-lstm'],
    title: 'LSTM: estado de celda y gates',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/The_LSTM_Cell.svg',
    source: 'https://commons.wikimedia.org/wiki/File:The_LSTM_Cell.svg',
    credit: 'Guillaume Chevalier · Wikimedia Commons', license: 'CC BY-SA',
    caption: 'Sigue por separado el estado de celda y el hidden state. Localiza forget, input y output gates y escribe qué multiplicación controla cada flujo. Después compara este camino aditivo con una RNN simple para razonar sobre propagación de gradiente a través del tiempo.',
    alt: 'Esquema interno de una celda LSTM con gates y estado de celda.'
  },
  {
    id: 'binary-search-tree-order', area: 'computers', lessonIds: ['algo-bst'],
    title: 'Binary Search Tree: el orden vive en la estructura',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dsa_binary_search_tree.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Dsa_binary_search_tree.svg',
    credit: 'Pat Hawks · Wikimedia Commons', license: 'CC BY 4.0',
    caption: 'Comprueba la invariante izquierda < nodo < derecha en cada nivel. Después imagina insertar claves ya ordenadas: el mismo contrato puede degenerar en una lista y perder el coste logarítmico esperado. La figura enseña la propiedad, no garantiza balance.',
    alt: 'Árbol binario de búsqueda con claves ordenadas a izquierda y derecha de cada nodo.'
  },
  {
    id: 'hash-table-chaining', area: 'computers', lessonIds: ['algo-hash-tables'],
    title: 'Hash table: colisiones con separate chaining',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dsa_hash_table.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Dsa_hash_table.svg',
    credit: 'Amit6 · Wikimedia Commons', license: 'Dominio público',
    caption: 'Observa que distintas claves pueden producir el mismo bucket y que la tabla necesita una política explícita de colisiones. Cambia mentalmente el load factor y predice cómo crecen las cadenas; una función hash rápida no basta si distribuye mal las claves reales.',
    alt: 'Hash table con buckets y colisiones resueltas mediante listas encadenadas.'
  }

  ,{
    id: 'absolute-positional-encoding', area: 'ai', lessonIds: ['tf-positional'], studyOrder: 1,
    title: 'Positional encoding sinusoidal: patrones por posición y dimensión',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Absolute_positional_encoding.png',
    source: 'https://commons.wikimedia.org/wiki/File:Absolute_positional_encoding.png',
    credit: 'Nils Blümer · Wikimedia Commons', license: 'CC BY 4.0',
    caption: 'Cada fila/columna combina posición y dimensión con frecuencias distintas. Úsala para comprobar que el Transformer original añade una señal de posición estructurada al embedding; no interpreta una “coordenada” escalar ni aprende automáticamente orden solo por self-attention.',
    alt: 'Mapa de calor de la codificación posicional absoluta sinusoidal del Transformer para distintas posiciones y dimensiones.'
  },
  {
    id: 'nyquist-aliasing', area: 'computers', lessonIds: ['sig-aliasing-nyquist','sig-sampling'], studyOrder: 1,
    title: 'Nyquist y aliasing: dos señales que producen las mismas muestras',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Nyquist_Aliasing.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Nyquist_Aliasing.svg',
    credit: 'Peterpall · Wikimedia Commons', license: 'CC BY-SA 3.0',
    caption: 'Sigue los puntos de muestreo y observa cómo una frecuencia por encima de la mitad de la frecuencia de muestreo puede confundirse con otra más baja. La condición de Nyquist evita aliasing bajo supuestos de banda limitada; no significa que “dos muestras por ciclo” arreglen cualquier señal real sin filtrado previo.',
    alt: 'Diagrama del teorema de muestreo de Nyquist mostrando señal original, muestras y una señal aliased.'
  },
  {
    id: 'trie-prefix-tree', area: 'computers', lessonIds: ['algo-tries'], studyOrder: 1,
    title: 'Trie: compartir prefijos en vez de comparar claves completas',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Trie_example.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Trie_example.svg',
    credit: 'Booyabazooka / Superm401 · Wikimedia Commons', license: 'Dominio público',
    caption: 'Busca dónde divergen “tea”, “ted” y “ten”: el coste depende de la longitud de la clave recorrida, mientras el precio está en memoria y fan-out. Compara mentalmente este árbol de prefijos con un hash table y con un BST para consultas exactas y autocompletado.',
    alt: 'Ejemplo de trie donde varias palabras comparten nodos correspondientes a prefijos comunes.'
  },
  {
    id: 'mutex-critical-section', area: 'os', lessonIds: ['sync-mutex-semaphore-condvar-atomics'], studyOrder: 1,
    title: 'Mutex: exclusión mutua alrededor de una sección crítica',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mutex.png',
    source: 'https://commons.wikimedia.org/wiki/File:Mutex.png',
    credit: 'Nadir.cherifi · Wikimedia Commons', license: 'CC BY-SA 3.0',
    caption: 'Observa qué parte del trabajo queda protegida y qué threads deben esperar. Un mutex no “hace el código thread-safe” por sí solo: la propiedad depende de que todos los accesos al invariante compartido sigan el mismo protocolo y de que el orden de adquisición no introduzca deadlocks.',
    alt: 'Esquema de varios hilos usando un mutex para acceder en exclusión mutua a una sección crítica compartida.'
  }

,

  {
    id: 'pcb-routed-layout', area: 'electronics', lessonIds: ['pcb-layout'],
    title: 'PCB de dos capas después del routing',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pcblayout.png',
    source: 'https://commons.wikimedia.org/wiki/File:Pcblayout.png',
    credit: 'Ulfbastel · Wikimedia Commons', license: 'GFDL / CC BY-SA 3.0',
    caption: 'No mires las pistas como “líneas bonitas”: identifica pads, cambios de capa, densidad, retornos y zonas donde el placement obliga a rutas largas. Después compara esta imagen con el ratsnest previo al routing y pregunta qué decisiones de placement reducen cruces y longitud.',
    alt: 'Layout de una placa PCB de dos capas con las pistas ya enrutadas.'
  },
  {
    id: 'pbr-roughness-map', area: 'gamedev', lessonIds: ['render-pbr-materials'],
    title: 'Roughness map: la microsuperficie también es un dato',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Metal049C_8K-PNG_Roughness.png',
    source: 'https://commons.wikimedia.org/wiki/File:Metal049C_8K-PNG_Roughness.png',
    credit: 'ambientCG / Lennart Demes · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'Una roughness map no es una sombra pintada: codifica cómo cambia la distribución de microfacetas por texel. Relaciona valores oscuros/claros con reflejos más estrechos o más anchos y separa roughness, metalness, albedo y normal map.',
    alt: 'Mapa de rugosidad PBR en escala de grises para un material metálico.'
  },
  {
    id: 'dff-impulse', area: 'computers', lessonIds: ['latches-flipflops'],
    title: 'Flip-flop D: D se captura en el flanco, Q no sigue continuamente',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/D-type_flip-flop_impulse_diagram.png',
    source: 'https://commons.wikimedia.org/wiki/File:D-type_flip-flop_impulse_diagram.png',
    credit: 'Jordan Mussi · Wikimedia Commons', license: 'CC0 1.0',
    caption: 'Sigue D, clock y Q. La clave es distinguir un flip-flop disparado por flanco de un latch transparente: Q conserva el valor capturado entre flancos, aunque D cambie después.',
    alt: 'Diagrama temporal de un flip-flop D mostrando entrada D, reloj y salida Q.'
  },
  {
    id: 'setup-hold-window', area: 'computers', lessonIds: ['temporizacion-digital','fpga-timing'],
    title: 'Setup, hold y clock-to-Q alrededor del flanco',
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/FF_Tsetup_Thold_Toutput.svg',
    source: 'https://commons.wikimedia.org/wiki/File:FF_Tsetup_Thold_Toutput.svg',
    credit: 'Michagal · Wikimedia Commons', license: 'GFDL 1.2+',
    caption: 'Marca la ventana en la que D debe permanecer estable antes y después del flanco y separa esa restricción del retardo clock-to-Q. En FPGA, estas ventanas terminan convertidas en checks de setup/hold y slack dentro del análisis estático de timing.',
    alt: 'Diagrama temporal de flip-flop con tiempos de setup, hold y clock-to-output.'
  }
];

window.BOOK_LIBRARY = {
  demoscene: [
    {title:'FREAX — The Brief History of the Demoscene', author:'Tamás Polgár', level:'Historia y cultura', note:'La recomendación principal para entender de dónde viene la scene, sus plataformas, grupos y cultura. Léelo en paralelo a Future Crew y las demos clásicas.', url:'https://freax.intro.hu/about.html'},
    {title:'Real-Time Rendering, 4th Edition', author:'Tomas Akenine-Möller, Eric Haines, Naty Hoffman', level:'Avanzado', note:'Para conectar los efectos de demo con rasterización, shading, sampling, iluminación y técnicas modernas. No hace falta leerlo de principio a fin.', url:'https://www.realtimerendering.com/'},
    {title:'Computer Systems: A Programmer’s Perspective', author:'Randal E. Bryant, David R. O’Hallaron', level:'Intermedio', note:'Muy útil para comprender por qué tamaño, memoria, cachés, assembly y rendimiento condicionan una demo ejecutable.', url:'https://csapp.cs.cmu.edu/3e/about.html'}
  ],
  cyber: [
    {title:'Security Engineering, 3rd Edition', author:'Ross Anderson', level:'Intermedio → avanzado', note:'Excelente para pasar de “explotar bugs” a pensar en sistemas, modelos de amenaza, incentivos, protocolos y fallos de diseño.', url:'https://www.cl.cam.ac.uk/~rja14/book.html'},
    {title:'The Web Application Hacker’s Handbook, 2nd Edition', author:'Dafydd Stuttard, Marcus Pinto', level:'Intermedio', note:'Aunque tiene años, sigue siendo valioso para construir modelos mentales de seguridad web. Contrástalo con PortSwigger Academy para técnicas modernas.', url:'https://www.wiley.com/en-us/The+Web+Application+Hacker%27s+Handbook%3A+Finding+and+Exploiting+Security+Flaws%2C+2nd+Edition-p-9781118026472'},
    {title:'Practical Malware Analysis', author:'Michael Sikorski, Andrew Honig', level:'Avanzado', note:'Ideal cuando pases de Natas/web a reversing y análisis defensivo. Trabájalo en una VM aislada y con muestras/labs del libro.', url:'https://nostarch.com/malware'}
  ],
  computers: [
    {title:'Computer Systems: A Programmer’s Perspective', author:'Randal E. Bryant, David R. O’Hallaron', level:'Intermedio', note:'Probablemente el libro que mejor encaja con la filosofía vertical de esta universidad: programa → assembly → memoria → procesos → red.', url:'https://csapp.cs.cmu.edu/3e/about.html'},
    {title:'Computer Organization and Design — RISC-V Edition', author:'David Patterson, John Hennessy', level:'Intermedio', note:'Úsalo para CPU, ISA, datapath, pipeline, memoria y rendimiento. Conviene resolver ejercicios, no solo leer.', url:'https://www.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6'},
    {title:'Code: The Hidden Language of Computer Hardware and Software', author:'Charles Petzold', level:'Inicial', note:'Muy buena entrada narrativa para unir electricidad, lógica, representación y construcción de una máquina sin saltos bruscos.', url:'https://www.microsoftpressstore.com/store/code-the-hidden-language-of-computer-hardware-and-software-9780137909292'}
  ],
  gamedev: [
    {title:'Game Engine Architecture, 3rd Edition', author:'Jason Gregory', level:'Intermedio → avanzado', note:'Referencia central para comprender cómo encajan memory, resources, renderer, animation, physics, gameplay y tools en un engine real.', url:'https://www.gameenginebook.com/'},
    {title:'Real-Time Rendering, 4th Edition', author:'Tomas Akenine-Möller, Eric Haines, Naty Hoffman', level:'Avanzado', note:'Consulta por capítulos cuando trabajes cámaras, raster, iluminación, sombras, PBR o GPU. Es una referencia, no una novela.', url:'https://www.realtimerendering.com/'},
    {title:'Game Programming Patterns', author:'Robert Nystrom', level:'Inicial → intermedio', note:'Libro gratuito y práctico para entender patrones usados en game loops, componentes, eventos, estados y arquitectura.', url:'https://gameprogrammingpatterns.com/'}
  ],
  godot: [
    {title:'Godot 4 Game Development Projects, 2nd Edition', author:'Chris Bradfield', level:'Inicial → intermedio', note:'Aprende construyendo proyectos completos. Úsalo junto a la documentación oficial y compara sus decisiones con la arquitectura explicada aquí.', url:'https://www.packtpub.com/en-us/product/godot-4-game-development-projects-9781804610404'},
    {title:'Game Engine Architecture, 3rd Edition', author:'Jason Gregory', level:'Avanzado', note:'No es específico de Godot: precisamente por eso ayuda a entender qué problemas generales resuelven SceneTree, resources, rendering servers y subsistemas.', url:'https://www.gameenginebook.com/'},
    {title:'Godot Engine Documentation', author:'Godot contributors', level:'Referencia viva', note:'No es un libro tradicional, pero debe ser tu referencia primaria. Lee también las páginas de “best practices” y la documentación de clases.', url:'https://docs.godotengine.org/en/stable/'}
  ],
  pixelart: [
    {title:'Pixel Logic — A Guide to Pixel Art', author:'Michael Azzi', level:'Inicial → intermedio', note:'Muy visual y directamente alineado con clusters, line art, antialiasing, color, dithering, perspectivas, subpixel y animación.', url:'https://pixellogicbook.com/'},
    {title:'Make Your Own Pixel Art', author:'Jennifer Dawe, Matthew Humphries', level:'Inicial', note:'Buena práctica guiada para sprites, tiles y construcción visual cuando necesitas ejercicios más artísticos que técnicos.', url:'https://nostarch.com/pixelart'},
    {title:'Real-Time Rendering, 4th Edition', author:'Tomas Akenine-Möller, Eric Haines, Naty Hoffman', level:'Avanzado técnico', note:'Para comprender qué ocurre después de crear el asset: sampling, filtering, textures, color y pipeline GPU.', url:'https://www.realtimerendering.com/'}
  ],
  electronics: [
    {title:'The Art of Electronics, 3rd Edition', author:'Paul Horowitz, Winfield Hill', level:'Intermedio → avanzado', note:'La gran referencia práctica de electrónica. Consulta capítulos según construyas circuitos y contrasta modelos con medidas reales.', url:'https://artofelectronics.net/'},
    {title:'Learning the Art of Electronics', author:'Thomas Hayes, Paul Horowitz', level:'Práctico', note:'Compañero de laboratorio: especialmente útil si quieres que la electrónica no se quede en fórmulas y realmente montar/medir circuitos.', url:'https://artofelectronics.net/the-book/'},
    {title:'Practical Electronics for Inventors', author:'Paul Scherz, Simon Monk', level:'Inicial → intermedio', note:'Amplio y orientado a construir. Úsalo como segunda explicación cuando un componente o circuito del curso no termine de encajar.', url:'https://www.mheducation.com/highered/product/practical-electronics-inventors-scherz.html'}
  ],
  ai: [
    {title:'Deep Learning', author:'Ian Goodfellow, Yoshua Bengio, Aaron Courville', level:'Intermedio → avanzado', note:'Base teórica sólida para redes, optimización y modelos profundos. El texto oficial se puede leer gratuitamente online.', url:'https://www.deeplearningbook.org/'},
    {title:'Dive into Deep Learning', author:'Aston Zhang, Zachary C. Lipton, Mu Li, Alex J. Smola', level:'Inicial → intermedio', note:'Combina matemáticas, código ejecutable y modelos modernos. Muy apropiado para estudiar junto a los laboratorios de la web.', url:'https://d2l.ai/'},
    {title:'Hands-On Machine Learning', author:'Aurélien Géron', level:'Práctico', note:'Buen puente entre conceptos y experimentos. Úsalo después de entender la matemática, no como sustituto de ella.', url:'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/'}
  ],
  os: [
    {title:'Operating Systems: Three Easy Pieces', author:'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau', level:'Inicial → intermedio', note:'La recomendación principal: virtualización, concurrencia y persistencia con ejercicios y simuladores. El libro es gratuito online.', url:'https://pages.cs.wisc.edu/~remzi/OSTEP/'},
    {title:'The Linux Programming Interface', author:'Michael Kerrisk', level:'Intermedio → avanzado', note:'Para convertir conceptos de procesos, señales, archivos, memoria, IPC y sockets en programas Linux reales.', url:'https://man7.org/tlpi/'},
    {title:'Linux Kernel Development', author:'Robert Love', level:'Avanzado', note:'Úsalo para profundizar en mecanismos internos y aprender a leer el kernel. Contrasta detalles concretos con documentación/código moderno.', url:'https://www.pearson.com/en-us/subject-catalog/p/linux-kernel-development/P200000000339'}
  ],
  networks: [
    {title:'Computer Networking: A Top-Down Approach, 8th Edition', author:'James F. Kurose, Keith W. Ross', level:'Inicial → intermedio', note:'Excelente primera lectura: empieza por aplicaciones y baja hacia transporte, red y enlace, justo al revés que una ruta puramente física.', url:'https://gaia.cs.umass.edu/kurose_ross/'},
    {title:'TCP/IP Illustrated, Volume 1', author:'W. Richard Stevens, Kevin Fall', level:'Intermedio → avanzado', note:'Cuando quieras dejar los diagramas y estudiar protocolos a partir de trazas, paquetes, temporizadores y comportamiento real.', url:'https://www.pearson.com/en-us/subject-catalog/p/tcp-ip-illustrated-volume-1-the-protocols/P200000000201'},
    {title:'Computer Networks', author:'Andrew S. Tanenbaum, Nick Feamster, David Wetherall', level:'Intermedio', note:'Complementa la perspectiva top-down con tratamiento sistemático de capas, medios, routing, transporte y diseño de redes.', url:'https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003188'}
  ]
};


// Lecturas específicas para lecciones donde merece la pena apuntar a capítulos o referencias concretas.
window.LESSON_READING = {
  'pipeline-etapas': [
    {title:'Computer Organization and Design — RISC-V Edition', author:'Patterson & Hennessy', level:'Capítulos de procesador/pipeline', note:'Lee el datapath secuencial primero y después el pipeline. Dibuja dependencias entre instrucciones y decide cuándo basta forwarding y cuándo hace falta stall.', url:'https://www.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6'}
  ],
  'cache-lines-hits': [
    {title:'Computer Systems: A Programmer’s Perspective', author:'Bryant & O’Hallaron', level:'Jerarquía de memoria', note:'Estudia localidad y caché junto a pequeños benchmarks propios; cambia stride y tamaño de working set para convertir el diagrama en medidas.', url:'https://csapp.cs.cmu.edu/3e/about.html'}
  ],
  'virtual-mmu-pages': [
    {title:'Operating Systems: Three Easy Pieces', author:'Arpaci-Dusseau & Arpaci-Dusseau', level:'Virtualización de memoria', note:'Lee paging, TLB y page tables con los simuladores de OSTEP. Es especialmente bueno para separar traducción, protección, page fault y swapping.', url:'https://pages.cs.wisc.edu/~remzi/OSTEP/'}
  ],
  'bjt-mosfet': [
    {title:'The Art of Electronics, 3rd Edition', author:'Horowitz & Hill', level:'Transistores y circuitos reales', note:'No lo uses para memorizar ecuaciones aisladas: compara el modelo de switch con curvas/datasheets y con las limitaciones de conducción, capacitancia y potencia.', url:'https://artofelectronics.net/'}
  ],
  'global-bgp-sessions-updates': [
    {title:'Computer Networking: A Top-Down Approach', author:'Kurose & Ross', level:'Routing interdominio', note:'Úsalo para situar BGP dentro del plano de control y luego contrasta la explicación con RFCs y trazas reales. Presta atención a política, no solo a longitud de AS-PATH.', url:'https://gaia.cs.umass.edu/kurose_ross/'}
  ],
  'tf-self-attention': [
    {title:'Dive into Deep Learning', author:'Zhang, Lipton, Li & Smola', level:'Atención y Transformers', note:'Trabaja los capítulos de atención ejecutando el código. Comprueba dimensiones de Q, K y V y observa qué cambia al variar máscaras y número de heads.', url:'https://d2l.ai/'}
  ],
  'api-shader-stages': [
    {title:'Real-Time Rendering, 4th Edition', author:'Akenine-Möller, Haines & Hoffman', level:'Pipeline gráfico', note:'Úsalo como mapa técnico de rasterización, shaders, texturing y sampling. Vuelve a esta referencia cada vez que una API concreta oculte el mecanismo subyacente.', url:'https://www.realtimerendering.com/'}
  ],
  'render-ray-tracing': [
    {title:'Physically Based Rendering: From Theory to Implementation', author:'Pharr, Jakob & Humphreys', level:'Avanzado', note:'Referencia abierta para pasar del dibujo conceptual a intersecciones, BVH, materiales, transporte de luz y Monte Carlo. Léelo implementando piezas pequeñas.', url:'https://pbr-book.org/'}
  ],
  'godot-scenetree': [
    {title:'Documentación oficial de Godot — Nodes and Scenes', author:'Godot Engine community', level:'Lectura práctica oficial', note:'No es un libro, pero debe acompañar esta lección: crea una escena pequeña, instánciala dos veces y observa qué pertenece a la escena y qué pertenece al SceneTree en runtime.', url:'https://docs.godotengine.org/en/stable/getting_started/step_by_step/nodes_and_scenes.html'}
  ],
  'demo-second-reality': [
    {title:'FREAX — The Brief History of the Demoscene', author:'Tamás Polgár', level:'Contexto histórico', note:'Lee Future Crew y la PC scene mientras ves Second Reality completa. Anota qué decisiones son técnicas, cuáles artísticas y cuáles dependen del contexto de party/compo.', url:'https://freax.intro.hu/about.html'}
  ]
  ,
  'transport-handshake': [
    {title:'Computer Networking: A Top-Down Approach, 8th Edition', author:'James F. Kurose, Keith W. Ross', level:'TCP y transporte', note:'Dibuja el three-way handshake con ISN concretos y sigue después ACK, retransmisión y cierre. La meta es conectar estados y bytes, no memorizar nombres de flags.', url:'https://gaia.cs.umass.edu/kurose_ross/'}
  ],
  'crypto-dh-ecc': [
    {title:'Serious Cryptography, 2nd Edition', author:'Jean-Philippe Aumasson', level:'Criptografía aplicada · capítulos 11–12', note:'Lee Diffie–Hellman y curvas elípticas distinguiendo key agreement de autenticación. Después explica con tus palabras por qué DH puro sigue siendo vulnerable a MITM.', url:'https://nostarch.com/seriouscrypto'}
  ],
  'elf-pe-loader': [
    {title:'Linkers and Loaders', author:'John R. Levine', level:'Sistemas · linking/loading', note:'Úsalo junto al diagrama ELF para separar secciones, símbolos, relocations, linking dinámico y trabajo del loader. Es antiguo en ejemplos concretos, pero muy valioso para los mecanismos.', url:'https://shop.elsevier.com/books/linkers-and-loaders/levine/978-0-08-051031-6'}
  ],
  'btrees': [
    {title:'Designing Data-Intensive Applications, 2nd Edition', author:'Martin Kleppmann, Chris Riccomini', level:'Intermedio → avanzado', note:'Relaciona índices ordenados, estructuras de almacenamiento y trade-offs de lectura/escritura. Complementa el B-tree dibujado con cómo un motor real organiza páginas y persistencia.', url:'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/'},
    {title:'Database Internals', author:'Alex Petrov', level:'Intermedio → avanzado · almacenamiento', note:'Inserta claves en un B-tree pequeño hasta provocar splits. Después traduce cada nodo a una página de almacenamiento y calcula cuántos accesos de página requiere una búsqueda según fan-out y altura.', url:'https://www.oreilly.com/library/view/database-internals/9781492040330/'}
  ],
  'dl-convolution': [
    {title:'Dive into Deep Learning — Convolutional Neural Networks', author:'Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola', level:'Práctico con código', note:'Ejecuta los ejemplos de convolución cambiando kernel, padding y stride. No avances hasta poder predecir shape de salida y receptive field de una composición pequeña.', url:'https://d2l.ai/chapter_convolutional-neural-networks/index.html'}
  ],
  'hazards-forwarding': [
    {title:'Computer Organization and Design — RISC-V Edition', author:'Patterson & Hennessy', level:'Pipeline y hazards', note:'Trabaja dependencias RAW con una tabla de ciclos. Para cada caso decide entre forwarding, stall y flush, y justifica por qué la solución preserva semántica arquitectónica.', url:'https://www.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6'}
  ],
  'tlb-hugepages': [
    {title:'Operating Systems: Three Easy Pieces', author:'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau', level:'Memoria virtual', note:'Combina TLB, page tables y huge pages con los ejercicios/simuladores de OSTEP. Mide qué mejora huge pages y qué costes introducen en fragmentación y gestión.', url:'https://pages.cs.wisc.edu/~remzi/OSTEP/'}
  ]
  ,
  'processes-pcb-context': [
    {title:'Operating Systems: Three Easy Pieces — Process API / Scheduling', author:'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau', level:'Inicial → intermedio', note:'Lee procesos y scheduling dibujando estados y cambios de contexto. Después ejecuta pequeños programas con fork/exec/wait y observa con ps/strace qué parte del modelo mental aparece en el sistema real.', url:'https://pages.cs.wisc.edu/~remzi/OSTEP/'}
  ],
  'app-dns-hierarchy': [
    {title:'Computer Networking: A Top-Down Approach — DNS', author:'James F. Kurose, Keith W. Ross', level:'Inicial → intermedio', note:'Estudia DNS como sistema distribuido jerárquico. Recorre una resolución con dig +trace y compara cada salto real con root, TLD, autoritativo, caché y TTL de la figura.', url:'https://gaia.cs.umass.edu/kurose_ross/'}
  ],
  'crypto-tls13': [
    {title:'RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3', author:'Eric Rescorla', level:'Referencia normativa', note:'No hace falta leerlo entero al principio. Sigue primero el handshake y el key schedule, identifica transcript hash y Finished, y vuelve al RFC cuando una simplificación del diagrama no explique un detalle.', url:'https://www.rfc-editor.org/rfc/rfc8446'}
  ],
  'gpu-memory-hierarchy': [
    {title:'CUDA C++ Programming Guide', author:'NVIDIA', level:'Intermedio → avanzado', note:'Usa las secciones de memory hierarchy y execution model con microbenchmarks. Cambia patrones de acceso y mide antes de concluir que shared memory o más occupancy mejoran siempre el kernel.', url:'https://docs.nvidia.com/cuda/cuda-c-programming-guide/'}
  ],
  'analog-opamps': [
    {title:'The Art of Electronics, 3rd Edition', author:'Paul Horowitz, Winfield Hill', level:'Intermedio → avanzado', note:'Lee op-amps junto a circuitos reales de feedback, límites de output swing, slew rate y bandwidth. Monta al menos un seguidor y un amplificador inversor y compara cálculo ideal con medida.', url:'https://artofelectronics.net/'}
  ],
  'wal': [
    {title:'Designing Data-Intensive Applications, 2nd Edition', author:'Martin Kleppmann, Chris Riccomini', level:'Intermedio → avanzado', note:'Relaciona WAL, páginas, índices, recuperación y replicación. Dibuja qué debe llegar a almacenamiento estable antes de confirmar una transacción y qué información permite rehacer o reconstruir estado tras un crash.', url:'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/'}
  ]
  ,
  'fs-ext4': [
    {title:'Linux kernel documentation — ext4 High Level Design', author:'Linux kernel community', level:'Referencia técnica', note:'Recorre block groups, superblock, bitmaps e inode tables y compáralos con la figura. Después usa debugfs o dumpe2fs sobre una imagen de filesystem creada por ti para localizar esas estructuras.', url:'https://docs.kernel.org/filesystems/ext4/overview.html'}
  ],
  'sig-fft': [
    {title:'The Scientist and Engineer’s Guide to Digital Signal Processing', author:'Steven W. Smith', level:'Inicial → intermedio', note:'Lee primero señales, espectro y DFT; luego implementa una DFT pequeña O(N²) y compárala con FFT para separar la transformación matemática del algoritmo rápido.', url:'https://www.dspguide.com/'}
  ],
  'app-http3': [
    {title:'HTTP/3 Explained', author:'Daniel Stenberg', level:'Intermedio y práctico', note:'Sigue QUIC, streams y pérdida de paquetes junto al diagrama de protocolo. Captura tráfico con Wireshark o qlog y verifica qué partes que antes atribuías a TCP/TLS pasan a QUIC.', url:'https://http3-explained.haxx.se/'}
  ],
  'ray-raymarch': [
    {title:'Inigo Quilez — Distance Functions', author:'Inigo Quilez', level:'Intermedio → avanzado', note:'Úsalo como referencia práctica de SDFs y operaciones. Implementa primero esfera/caja, visualiza número de pasos y después añade CSG; mide qué funciones rompen la condición de distancia conservadora.', url:'https://iquilezles.org/articles/distfunctions/'}
  ],
  'pixelart-dithering': [
    {title:'Pixel Logic — A Guide to Pixel Art', author:'Michael Azzi', level:'Inicial → intermedio', note:'Estudia dithering después de dominar clusters y paleta. Reproduce un degradado con dos colores usando varios patrones y evalúalo a escala 1×, no solo ampliado.', url:'https://pixellogicbook.com/'}
  ],
  'raft': [
    {title:'In Search of an Understandable Consensus Algorithm (Raft)', author:'Diego Ongaro, John Ousterhout', level:'Paper fundamental', note:'Lee elección, log replication y safety por separado. Después ejecuta una simulación con 5 nodos, mata al líder en distintos momentos y anota qué entradas pueden o no considerarse committed.', url:'https://raft.github.io/raft.pdf'}
  ]



  ,
  'mcu-stm32': [
    {title:'Making Embedded Systems', author:'Elecia White', level:'Intermedio · arquitectura embedded', note:'Lee el sistema como hardware + firmware + interfaces, no como una lista de registros. Haz un diagrama de tu MCU real con clocks, memoria, buses, interrupciones y periféricos y verifica cada bloque contra datasheet/reference manual.', url:'https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/'}
  ],
  'mcu-spi': [
    {title:'Making Embedded Systems', author:'Elecia White', level:'Práctico · hardware/software', note:'Acompaña SPI con un analizador lógico: prueba dos configuraciones CPOL/CPHA, mide frecuencia real y localiza exactamente dónde una configuración equivocada desplaza o corrompe bits.', url:'https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/'}
  ],
  'fpga-architecture': [
    {title:'FPGA Prototyping by SystemVerilog Examples', author:'Pong P. Chu', level:'Inicial → intermedio en FPGA', note:'Sigue el enfoque learning-by-doing: simula primero, sintetiza después y compara utilization/timing con tu RTL. La práctica clave es ver cómo una descripción se convierte en LUTs, FFs y rutas, no solo conseguir que “funcione”.', url:'https://www.wiley-vch.de/en/areas-interest/engineering/fpga-prototyping-by-systemverilog-examples-978-1-119-28266-2'}
  ],
  'nand-ftl-wear': [
    {title:'Linux kernel documentation — UBI/UBIFS', author:'Linux kernel community', level:'Flash y gestión de bloques', note:'Úsalo para ver por qué erase blocks, bad blocks y wear leveling cambian el diseño de almacenamiento sobre flash cruda. Compara esa capa con el FTL escondido dentro de un SSD.', url:'https://docs.kernel.org/filesystems/ubifs.html'}
  ],
  'ip-dhcp': [
    {title:'Computer Networking: A Top-Down Approach', author:'James F. Kurose, Keith W. Ross', level:'Redes · configuración de host', note:'Captura un intercambio DHCP completo con Wireshark. Para cada mensaje identifica dirección origen/destino, broadcast/unicast y opciones; después explica qué información configura host y qué funciones siguen perteneciendo a ARP/ND y routing.', url:'https://gaia.cs.umass.edu/kurose_ross/'}
  ],
  'web-oauth': [
    {title:'RFC 6749 + RFC 9700', author:'IETF OAuth Working Group', level:'Normativa + seguridad moderna', note:'Usa RFC 6749 para roles/authorization code y RFC 9700 para prácticas de seguridad actuales. Dibuja authorization code + PKCE y marca dónde un redirect URI o state mal validado abre una vulnerabilidad.', url:'https://www.rfc-editor.org/info/rfc6749/'},
    {title:'OAuth 2.0 Security Best Current Practice — RFC 9700', author:'T. Lodderstedt et al.', level:'Seguridad actual', note:'Lee esta BCP después del flujo básico para separar mecanismos históricos de recomendaciones vigentes. Convierte cada amenaza relevante en un test para una aplicación de laboratorio.', url:'https://www.rfc-editor.org/rfc/rfc9700'}
  ],
  'web-jwt': [
    {title:'RFC 7519 — JSON Web Token (JWT)', author:'M. Jones, J. Bradley, N. Sakimura', level:'Referencia normativa', note:'Construye un JWT pequeño y decodifica header/payload sin verificar firma para comprobar que base64url no implica secreto. Después valida firma, exp, aud e iss y revisa RFC 8725 antes de aceptar algoritmos o claims.', url:'https://www.rfc-editor.org/info/rfc7519/'}
  ],
  'conc-races': [
    {title:'Operating Systems: Three Easy Pieces — Concurrency', author:'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau', level:'Inicial → intermedio', note:'Implementa un contador compartido roto, aumenta iteraciones hasta reproducir el fallo y luego compáralo con mutex y atomics. No avances hasta poder describir el interleaving exacto que viola la invariante.', url:'https://pages.cs.wisc.edu/~remzi/OSTEP/'}
  ]

  ,
  'mcu-uart': [
    {title:'Making Embedded Systems', author:'Elecia White', level:'Práctico · comunicación serie', note:'Configura UART con dos baud rates, captura RX/TX con analizador lógico y mide el error real de timing. Relaciona cada bit observado con baud divisor, start/stop y tolerancia de clock.', url:'https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/'}
  ],
  'mcu-i2c': [
    {title:'UM10204 — I²C-bus specification and user manual', author:'NXP Semiconductors', level:'Especificación oficial', note:'Lee START/STOP, ACK/NACK, arbitration y timing. Después captura un sensor I²C real y comprueba byte a byte dirección, R/W, ACK y repeated START contra la especificación.', url:'https://www.nxp.com/docs/en/user-guide/UM10204.pdf'}
  ],
  'drivers-pcie': [
    {title:'PCI Express Technology', author:'MindShare', level:'Intermedio → avanzado', note:'Estudia topology, configuration space y transaction layer separadamente. Dibuja la ruta de un TLP desde root complex hasta endpoint y compárala con lspci -tv en una máquina real.', url:'https://www.mindshare.com/files/ebooks/PCI%20Express%20Technology%203.0.pdf'}
  ],
  'ip-nat': [
    {title:'TCP/IP Illustrated, Volume 1: The Protocols, 2nd Edition', author:'Kevin R. Fall, W. Richard Stevens', level:'Intermedio · trazas reales', note:'Usa el capítulo de NAT/firewalls junto a capturas. Construye una tabla de mappings y explica qué checksum/campos cambian en cada dirección; separa NAT de política de firewall.', url:'https://www.informit.com/store/tcp-ip-illustrated-volume-1-the-protocols-9780321336316'}
  ],
  'branch-prediction': [
    {title:'Computer Architecture: A Quantitative Approach, 7th Edition', author:'John L. Hennessy, David A. Patterson, Christos Kozyrakis', level:'Avanzado · microarquitectura', note:'Lee predicción como problema cuantitativo: accuracy aislada no basta. Calcula coste de misprediction para distintos pipeline depths y patrones, y contrasta predictor estático, bimodal y correlacionado.', url:'https://shop.elsevier.com/books/computer-architecture/hennessy/978-0-443-15406-5'}
  ],
  'gen-gans': [
    {title:'Deep Learning', author:'Ian Goodfellow, Yoshua Bengio, Aaron Courville', level:'Avanzado · fundamento', note:'Estudia el capítulo de modelos generativos/adversariales y deriva qué optimiza cada jugador. Entrena una GAN diminuta y registra pérdidas, diversidad de muestras y síntomas de mode collapse en vez de juzgar una sola imagen.', url:'https://www.deeplearningbook.org/'}
  ],
  'gen-diffusion-forward': [
    {title:'Understanding Deep Learning', author:'Simon J. D. Prince', level:'Intermedio → avanzado', note:'Usa el tratamiento de diffusion para conectar proceso forward, denoising y sampling. Implementa ruido forward sobre una imagen y grafica SNR/timestep antes de entrenar cualquier red.', url:'https://mitpress.mit.edu/9780262377102/understanding-deep-learning/'}
  ]

  ,
  'mcu-dma': [
    {title:'Making Embedded Systems', author:'Elecia White', level:'Práctico · firmware y periféricos', note:'Configura una transferencia periférico→RAM y compara polling, ISR por muestra y DMA por bloques. Mide carga de CPU, jitter y qué ownership necesita el buffer antes y después de la señal de completion.', url:'https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/'}
  ],
  'drivers-interrupts-irq': [
    {title:'Operating Systems: Three Easy Pieces', author:'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau', level:'Sistemas · mecanismo y concurrencia', note:'Relaciona traps/interrupts con cambio de privilegio y control. Después observa /proc/interrupts y perf/tracepoints en Linux y distingue frecuencia de IRQ, trabajo diferido y coste visible en la aplicación.', url:'https://pages.cs.wisc.edu/~remzi/OSTEP/'}
  ],
  'app-websocket': [
    {title:'RFC 6455 — The WebSocket Protocol', author:'I. Fette, A. Melnikov', level:'Protocolo · referencia primaria', note:'Lee opening handshake, framing, masking y control frames. Captura una conexión real y comprueba opcode, FIN, máscara cliente→servidor y cierre; compara las fronteras de mensajes con las lecturas de TCP.', url:'https://www.rfc-editor.org/rfc/rfc6455'}
  ],
  'gameaudio-doppler': [
    {title:'Game Audio Programming 2: Principles and Practices', author:'Guy Somberg (ed.)', level:'Intermedio · audio interactivo', note:'Conecta el Doppler físico con decisiones de engine. Implementa una fuente que atraviese al listener, registra pitch relativo y añade clamps/smoothing para observar dónde termina la simulación y empieza la decisión artística.', url:'https://www.routledge.com/Game-Audio-Programming-2-Principles-and-Practices/Somberg/p/book/9781138068919'}
  ],
  'drivers-usb': [
    {title:'USB in a NutShell', author:'Beyond Logic', level:'Introducción técnica práctica', note:'Úsalo para pasar de conector a descriptors, endpoints, enumeration y transfer types. Después conecta un dispositivo y compara la teoría con lsusb -v, separando device/configuration/interface/endpoint descriptors.', url:'https://www.beyondlogic.org/usbnutshell/usb1.shtml'}
  ]

  ,
  'deadlock-livelock-starvation': [
    {title:'Operating Systems: Three Easy Pieces — Concurrency Bugs', author:'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau', level:'Inicial → intermedio', note:'Lee deadlock junto a locking y concurrencia. Construye dos threads que adquieran locks en orden inverso, reproduce el bloqueo y después elimina una de las condiciones necesarias; compara deadlock con livelock y starvation.', url:'https://pages.cs.wisc.edu/~remzi/OSTEP/'}
  ],
  'gameai-astar': [
    {title:'Artificial Intelligence: A Modern Approach, 4th Edition', author:'Stuart Russell, Peter Norvig', level:'Intermedio · búsqueda heurística', note:'Estudia uniform-cost, greedy best-first y A* como familia. Implementa los tres sobre el mismo mapa y compara nodos expandidos, coste final y efecto de una heurística admisible frente a una sobreestimadora.', url:'https://aima.cs.berkeley.edu/'}
  ],
  'kubernetes-concepts': [
    {title:'Kubernetes: Up and Running, 3rd Edition', author:'Kelsey Hightower, Brendan Burns, Joe Beda', level:'Intermedio · sistemas distribuidos prácticos', note:'Lee Pods, Deployments, Services y control loops con un cluster local. Crea un Deployment, borra un Pod manualmente y observa cómo la reconciliación restaura el estado deseado; después distingue scheduler, controller y kubelet.', url:'https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/'}
  ],
  'docker-internals': [
    {title:'Docker: Up & Running, 3rd Edition', author:'Sean P. Kane, Karl Matthias', level:'Inicial → intermedio · contenedores', note:'Usa el libro para conectar imágenes, layers, runtime y networking con observación real. Inspecciona una imagen, arranca un contenedor y compara namespaces/cgroups/procesos del host para comprobar qué aislamiento aporta cada capa.', url:'https://www.oreilly.com/library/view/docker-up/9781098131814/'}
  ]

  ,
  'analog-adc': [
    {title:'The Art of Electronics, 3rd Edition', author:'Paul Horowitz, Winfield Hill', level:'ADC y cadena analógica', note:'Mide una rampa o seno con un ADC real y compara códigos con el modelo ideal. Calcula 1 LSB, busca offset/gain error y observa cuándo ruido de entrada hace fluctuar códigos adyacentes.', url:'https://artofelectronics.net/'}
  ],
  'anim-skeleton-hierarchy': [
    {title:'Game Engine Architecture, 3rd Edition', author:'Jason Gregory', level:'Animación · arquitectura', note:'Dibuja la jerarquía local→global de un esqueleto de 4–6 huesos y calcula transforms acumuladas. Después cambia la pose y separa claramente skeleton pose, inverse bind y transformación final usada por skinning.', url:'https://www.gameenginebook.com/'}
  ],
  'physics-collision-pipeline': [
    {title:'Real-Time Collision Detection', author:'Christer Ericson', level:'Intermedio → avanzado · colisiones', note:'Implementa primero AABB overlap y luego una broad phase simple. Cuenta pares candidatos antes y después; solo entonces añade una narrow phase y comprueba por qué broad-phase overlap no equivale a contacto físico.', url:'https://www.sciencedirect.com/book/9781558607323/real-time-collision-detection'}
  ],
  'rl-agent-environment': [
    {title:'Reinforcement Learning: An Introduction, 2nd Edition', author:'Richard S. Sutton, Andrew G. Barto', level:'Fundamento de RL', note:'Empieza por el agent–environment interface y MDPs. Define explícitamente observación, acción, recompensa y estado de una tarea pequeña; después busca una variable oculta que rompa Markov y explica su efecto.', url:'https://mitpress.mit.edu/9780262039246/reinforcement-learning/'}
  ],
  'web-boundaries-sop': [
    {title:'Web Security Academy — Same-origin policy', author:'PortSwigger', level:'Web security · práctica', note:'Crea dos origins locales cambiando puerto y prueba fetch, iframe y postMessage. Anota qué operaciones se envían, cuáles se pueden leer y qué cambia al añadir una política CORS explícita.', url:'https://portswigger.net/web-security/cors/same-origin-policy'}
  ],
  'ip-ipv6-addressing': [
    {title:'RFC 8200 — Internet Protocol, Version 6 (IPv6) Specification', author:'S. Deering, R. Hinden', level:'Estándar IETF', note:'Lee el formato de cabecera y extension headers junto a una captura de Wireshark. Identifica cada campo real y compara el tratamiento de fragmentación con IPv4 antes de memorizar diferencias.', url:'https://www.rfc-editor.org/info/rfc8200/'}
  ]

  ,
  'coherencia-mesi': [
    {title:'Computer Architecture: A Quantitative Approach, 7th Edition', author:'John L. Hennessy, David A. Patterson, Christos Kozyrakis', level:'Avanzado · coherencia', note:'Dibuja dos cachés privadas y recorre una misma línea por estados M/E/S/I durante lecturas y escrituras. Después provoca false sharing con dos threads y mide cómo el tráfico de coherencia afecta al rendimiento aunque no compartan la misma variable lógica.', url:'https://shop.elsevier.com/books/computer-architecture/hennessy/978-0-443-15406-5'}
  ],
  'dram-controlador-numa': [
    {title:'Linux kernel documentation — NUMA Memory Policy', author:'Linux kernel community', level:'Sistemas · NUMA real', note:'Ejecuta una carga de memoria con numactl --hardware y numactl --membind/--cpunodebind. Compara acceso local/remoto y revisa /proc/<pid>/numa_maps para conectar topología, política y páginas físicas.', url:'https://www.kernel.org/doc/html/latest/admin-guide/mm/numa_memory_policy.html'}
  ],
  'nvme-controladores': [
    {title:'NVM Express Base Specification', author:'NVM Express, Inc.', level:'Referencia de almacenamiento', note:'Localiza submission queues, completion queues, doorbells y command identifiers en la especificación. Después compara iodepth=1 frente a colas profundas con fio y explica por qué latencia mínima e IOPS máximas son objetivos distintos.', url:'https://nvmexpress.org/specifications/'}
  ],
  'game-ecs': [
    {title:'Game Programming Patterns — Component', author:'Robert Nystrom', level:'Inicial → intermedio · arquitectura de juegos', note:'Implementa primero un GameObject con componentes y luego una versión donde la entidad sea solo un ID con arrays separados. Compara acoplamiento, consultas y locality; no asumas que cualquier sistema de componentes es automáticamente un ECS orientado a datos.', url:'https://gameprogrammingpatterns.com/component.html'}
  ],
  'load-balancers-cloud': [
    {title:'Site Reliability Engineering — Load Balancing at the Frontend', author:'Google SRE', level:'Producción · gran escala', note:'Modela tres backends con capacidades distintas y simula health checks, sobrecarga y una caída. Compara round-robin con una política sensible a carga y registra tail latency, errores y tiempo de recuperación, no solo requests por servidor.', url:'https://sre.google/sre-book/load-balancing-frontend/'}
  ],
  'conc-task-parallelism': [
    {title:'Operating Systems: Three Easy Pieces — Concurrency', author:'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau', level:'Concurrencia práctica', note:'Implementa un fork-join simple con un pool de workers. Varía granularidad y número de tareas y mide cuándo el overhead de colas/sincronización supera la ganancia de paralelismo; relaciona el resultado con Amdahl y la rama crítica.', url:'https://pages.cs.wisc.edu/~remzi/OSTEP/'}
  ]

  ,
  'lan-ethernet-frame': [
    {title:'Computer Networking: A Top-Down Approach', author:'James F. Kurose, Keith W. Ross', level:'Inicial → intermedio · enlace', note:'Captura una trama con Wireshark y localiza destination/source MAC, EtherType, payload y FCS cuando el hardware/driver lo exponga. Después contrasta MTU, tamaño de frame y payload para no mezclarlos.', url:'https://gaia.cs.umass.edu/kurose_ross/'}
  ],
  'lan-arp': [
    {title:'TCP/IP Illustrated, Volume 1: The Protocols, 2nd Edition', author:'Kevin R. Fall, W. Richard Stevens', level:'Intermedio · protocolos reales', note:'Vacía la caché ARP de un laboratorio, captura una resolución local y luego accede a una IP remota. Explica por qué la segunda resolución busca la MAC del gateway y verifica el resultado con ip neigh/arp.', url:'https://www.informit.com/store/tcp-ip-illustrated-volume-1-the-protocols-9780321336316'}
  ],
  'transport-congestion-control': [
    {title:'RFC 5681 — TCP Congestion Control', author:'M. Allman, V. Paxson, E. Blanton', level:'Estándar IETF', note:'Sigue las definiciones de cwnd, ssthresh, slow start y congestion avoidance con una tabla RTT→cwnd. Después genera pérdida en netem y compara la traza real con tu predicción; anota dónde una implementación moderna añade mecanismos no cubiertos por el modelo mínimo.', url:'https://www.rfc-editor.org/rfc/rfc5681'}
  ],
  'global-anycast': [
    {title:'RFC 4786 — Operation of Anycast Services', author:'J. Abley, K. Lindqvist', level:'Operación de Internet', note:'Dibuja tres sites anunciando el mismo prefijo y cambia preferencias/rutas. Razona qué sesiones toleran un cambio de instancia y cuáles no; relaciona el ejercicio con DNS autoritativo y servicios stateless.', url:'https://www.rfc-editor.org/rfc/rfc4786'}
  ],
  'global-cdn': [
    {title:'High Performance Browser Networking', author:'Ilya Grigorik', level:'Web performance · práctico', note:'Mide un recurso estático desde dos ubicaciones o PoPs y separa DNS, conexión, TLS, TTFB y transferencia. Después cambia Cache-Control y comprueba cuándo la mejora viene de cache, conexión reutilizada o menor RTT.', url:'https://hpbn.co/'}
  ],
  'ip-icmp': [
    {title:'TCP/IP Illustrated, Volume 1: The Protocols, 2nd Edition', author:'Kevin R. Fall, W. Richard Stevens', level:'Intermedio · diagnóstico IP', note:'Captura ping y traceroute. Clasifica cada ICMP por Type/Code y localiza qué parte del paquete original vuelve dentro de los errores; después explica por qué filtrar todo ICMP puede romper diagnóstico e incluso PMTU discovery.', url:'https://www.informit.com/store/tcp-ip-illustrated-volume-1-the-protocols-9780321336316'}
  ]

  ,
  'syscalls-api-abi': [
    {title:'The Linux Programming Interface', author:'Michael Kerrisk', level:'Intermedio → avanzado · Linux', note:'Traza una operación de archivo desde libc hasta el kernel con strace. Compara fopen/read/write con las syscalls efectivamente emitidas y anota qué pertenece a API, qué a ABI y qué al mecanismo de entrada al kernel.', url:'https://man7.org/tlpi/'}
  ],
  'gfx-rasterization-triangles': [
    {title:'Real-Time Rendering, 4th Edition', author:'Tomas Akenine-Möller, Eric Haines, Naty Hoffman et al.', level:'Gráficos · rasterización', note:'Implementa un rasterizador de un solo triángulo con edge functions. Visualiza bounding box, cobertura y coordenadas baricéntricas; después prueba dos triángulos que comparten borde para estudiar reglas de cobertura.', url:'https://www.realtimerendering.com/'}
  ],
  'gfx-depth-zbuffer': [
    {title:'LearnOpenGL — Depth testing', author:'Joey de Vries', level:'Práctico · gráficos', note:'Renderiza dos superficies que se cruzan, activa/desactiva depth testing y visualiza el depth buffer. Luego aproxima dos planos hasta provocar z-fighting y cambia near/far para observar cómo la precisión de profundidad afecta al artefacto.', url:'https://learnopengl.com/Advanced-OpenGL/Depth-testing'}
  ],
  'render-normal-mapping': [
    {title:'LearnOpenGL — Normal Mapping', author:'Joey de Vries', level:'Intermedio · shaders', note:'Aplica la misma normal map a un plano rotado primero sin TBN y luego en tangent space. Dibuja T, B y N y comprueba por qué una textura de normales no puede interpretarse directamente como world-space en una malla arbitraria.', url:'https://learnopengl.com/Advanced-Lighting/Normal-Mapping'}
  ],
  'render-shadow-maps': [
    {title:'LearnOpenGL — Shadow Mapping', author:'Joey de Vries', level:'Intermedio · render en tiempo real', note:'Implementa las dos pasadas: depth map desde la luz y comparación desde la cámara. Visualiza el shadow map como imagen y provoca shadow acne/peter-panning antes de aplicar bias para entender qué corrige y qué compromete.', url:'https://learnopengl.com/Advanced-Lighting/Shadows/Shadow-Mapping'}
  ],
  'render-shadows-visibility': [
    {title:'Real-Time Rendering, 4th Edition', author:'Tomas Akenine-Möller, Eric Haines, Naty Hoffman et al.', level:'Intermedio → avanzado · visibilidad', note:'Separa el problema geométrico de visibilidad del algoritmo concreto. Compara planar/projected shadows, shadow maps y ray-traced visibility sobre una misma escena y anota qué aproximación, memoria y coste introduce cada técnica.', url:'https://www.realtimerendering.com/'}
  ]

  ,
  'nn-backprop': [
    {title:'Deep Learning — Chapter 6: Deep Feedforward Networks', author:'Ian Goodfellow, Yoshua Bengio, Aaron Courville', level:'Intermedio · derivación', note:'Haz un MLP de dos capas a mano: calcula forward, pérdida y gradientes de un solo ejemplo sin autograd. Después compáralos con diferencias finitas y con el autograd de una librería; cualquier discrepancia debe explicarse antes de entrenar.', url:'https://www.deeplearningbook.org/contents/mlp.html'}
  ],
  'gameai-fsm': [
    {title:'Game Programming Patterns — State', author:'Robert Nystrom', level:'Inicial → intermedio · diseño', note:'Implementa Wander/Chase/Attack/Flee primero con ifs y después con State objects. Añade una quinta condición y compara cuántos lugares debes modificar: la práctica sirve para medir el coste de acoplamiento, no para idolatrar el patrón.', url:'https://gameprogrammingpatterns.com/state.html'}
  ],
  'gameaudio-digital-audio': [
    {title:'The Scientist and Engineer’s Guide to Digital Signal Processing', author:'Steven W. Smith', level:'Inicial → intermedio · DSP', note:'Genera seno, impulso y ruido; grafica waveform y espectro/espectrograma. Cambia sample rate y window size y explica qué resolución temporal/frecuencial ganas o pierdes.', url:'https://www.dspguide.com/'}
  ],
  'cache-mapping': [
    {title:'Computer Systems: A Programmer’s Perspective, 3rd Edition', author:'Randal E. Bryant, David R. O’Hallaron', level:'Intermedio · cachés', note:'Para una caché pequeña inventada, descompón direcciones en tag/index/offset y simula una secuencia de accesos en direct-mapped y 2-way. Cuenta conflict misses antes de ejecutar un benchmark con strides equivalentes.', url:'https://csapp.cs.cmu.edu/3e/about.html'}
  ]

  ,
  'distributed-clocks': [
    {title:'Designing Data-Intensive Applications, 2nd Edition', author:'Martin Kleppmann, Chris Riccomini', level:'Intermedio → avanzado · tiempo y causalidad', note:'Dibuja tres procesos, asigna timestamps lógicos y crea dos eventos concurrentes. Compara qué puede afirmar un reloj de Lamport y qué información adicional aporta un vector clock; intenta construir un caso donde el orden total sea útil pero no represente causalidad.', url:'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/'}
  ],
  'hypervisors': [
    {title:'Virtual Machines: Versatile Platforms for Systems and Processes', author:'James E. Smith, Ravi Nair', level:'Avanzado · virtualización', note:'Clasifica hipervisores por arquitectura y luego sigue una instrucción privilegiada desde guest hasta host. Contrasta trap-and-emulate con virtualización asistida por hardware y separa virtualización de ISA, procesos y sistema completo.', url:'https://www.sciencedirect.com/book/9781558609105/virtual-machines'}
  ],
  'cap': [
    {title:'Brewer’s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services', author:'Seth Gilbert, Nancy Lynch', level:'Paper fundamental · sistemas distribuidos', note:'Lee el enunciado formal y escribe qué significa exactamente “available” y “consistent” en el modelo del paper. Después explica por qué “elige dos de tres” es una simplificación que oculta que la tensión decisiva aparece durante una partición.', url:'https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf'}
  ]

  ,
  'ieee754': [
    {title:'Computer Systems: A Programmer’s Perspective, 3rd Edition', author:'Randal E. Bryant, David R. O’Hallaron', level:'Inicial → intermedio · representación numérica', note:'Escoge varios patrones binary32, descompón signo/exponente/fracción y verifica el resultado con un pequeño programa. Incluye al menos un subnormal, infinito y NaN; después busca un cálculo donde el redondeo cambie la respuesta.', url:'https://csapp.cs.cmu.edu/3e/about.html'}
  ],
  'unicode-texto': [
    {title:'RFC 3629 — UTF-8, a transformation format of ISO 10646', author:'F. Yergeau', level:'Estándar · codificación de texto', note:'Codifica a mano tres valores escalares de 1, 2, 3 y 4 bytes y compara con xxd o Python. Comprueba además que overlong encodings y surrogates no son UTF-8 válido.', url:'https://www.rfc-editor.org/info/rfc3629/'}
  ],
  'engine-visibility-culling': [
    {title:'Real-Time Rendering, 4th Edition', author:'Tomas Akenine-Möller, Eric Haines, Naty Hoffman et al.', level:'Intermedio → avanzado · visibilidad', note:'Implementa primero frustum culling con esferas o AABBs y mide objetos descartados y coste CPU. Luego introduce bounds más ajustados y observa cuándo el ahorro de draw calls compensa el coste extra del test.', url:'https://www.realtimerendering.com/'}
  ],
  'anim-inverse-kinematics': [
    {title:'Godot documentation — Inverse kinematics / Skeleton modifiers', author:'Godot Engine contributors', level:'Práctico · animación', note:'Construye una cadena de dos o tres huesos, mueve el target por posiciones alcanzables e inalcanzables y observa cómo responde el solver. Añade límites articulares o una preferencia de pose para comprobar por qué una meta puede tener más de una solución.', url:'https://docs.godotengine.org/en/stable/tutorials/animation/index.html'}
  ],
  'mvcc': [
    {title:'PostgreSQL Documentation — Concurrency Control', author:'PostgreSQL Global Development Group', level:'Intermedio · bases de datos reales', note:'Abre dos sesiones SQL y reproduce Read Committed y Repeatable Read con actualizaciones concurrentes. Anota qué snapshot ve cada SELECT y qué operaciones siguen bloqueándose pese a MVCC.', url:'https://www.postgresql.org/docs/current/mvcc.html'}
  ],
  'git-merge': [
    {title:'Pro Git — Basic Branching and Merging', author:'Scott Chacon, Ben Straub', level:'Inicial → intermedio · Git', note:'Crea dos ramas, haz commits divergentes y ejecuta un merge fast-forward y otro con merge commit. Dibuja el DAG antes y después con git log --graph --oneline --all y explica qué referencia se movió en cada paso.', url:'https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging'}
  ]

  ,
  'ast-semantics-types': [
    {title:'Crafting Interpreters — Representing Code', author:'Robert Nystrom', level:'Práctico · compiladores', note:'Construye el AST de una expresión pequeña y añade después resolución de nombres y tipos como pases separados. Imprime el árbol antes y después de anotarlo para comprobar qué información introduce cada fase.', url:'https://craftinginterpreters.com/representing-code.html'}
  ],
  'crypto-rsa': [
    {title:'RFC 8017 — PKCS #1 v2.2', author:'K. Moriarty et al.', level:'Estándar · RSA', note:'Separa RSAES-OAEP de RSASSA-PSS y localiza qué parte es primitiva matemática y qué parte es encoding/padding. No implementes RSA “desnudo” como cifrado de aplicación: usa el RFC para identificar por qué faltan propiedades.', url:'https://www.rfc-editor.org/info/rfc8017'}
  ],
  'processes-pcb-context': [
    {title:'Operating Systems: Three Easy Pieces — Scheduling', author:'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau', level:'Inicial → intermedio · scheduling', note:'Simula FCFS, SJF y Round Robin sobre el mismo conjunto de jobs. Cambia el quantum y calcula turnaround/response time; después contrasta el modelo con context switches y prioridades reales.', url:'https://pages.cs.wisc.edu/~remzi/OSTEP/'}
  ],
  'c-storage-lifetime-scope': [
    {title:'Computer Systems: A Programmer’s Perspective, 3rd Edition', author:'Randal E. Bryant, David R. O’Hallaron', level:'Intermedio · memoria de procesos', note:'Compila un programa con globales, static, stack y malloc; inspecciona secciones con readelf/size y mappings con /proc/<pid>/maps. Compara la figura conceptual con el layout real bajo ASLR y librerías compartidas.', url:'https://csapp.cs.cmu.edu/3e/about.html'}
  ],
  'algo-heaps': [
    {title:'Algorithms, 4th Edition — Priority Queues', author:'Robert Sedgewick, Kevin Wayne', level:'Inicial → intermedio · estructuras', note:'Implementa un binary heap en array y verifica parent/children por índices. Mide insert y delete-max, luego intenta buscar un valor arbitrario para comprobar qué garantiza —y qué no— la propiedad de heap.', url:'https://algs4.cs.princeton.edu/24pq/'}
  ],
  'c-fragmentation-allocator': [
    {title:'CS:APP — Malloc Lab', author:'Carnegie Mellon University', level:'Avanzado · allocator práctico', note:'Diseña una arena con headers, free list, split y coalescing. Construye tests que midan utilización y throughput por separado y añade un verificador de invariantes que detecte corrupción antes de optimizar.', url:'https://csapp.cs.cmu.edu/3e/labs.html'}
  ],

  'api-vulkan-model': [
    {title:'Vulkan Tutorial — Drawing a triangle / Graphics pipeline basics', author:'Alexander Overvoorde', level:'Intermedio · API explícita', note:'Construye el triángulo mínimo y anota qué objetos/configuración debes crear antes de dibujar. Después cambia viewport, rasterizer o blending y relaciona cada cambio con una etapa del pipeline; el objetivo es ver qué estado deja de estar implícito.', url:'https://vulkan-tutorial.com/'}
  ],
  'dl-lstm': [
    {title:'Dive into Deep Learning — Modern Recurrent Neural Networks', author:'Aston Zhang, Zachary C. Lipton, Mu Li, Alex J. Smola', level:'Intermedio · secuencias', note:'Implementa una celda LSTM pequeña desde sus ecuaciones y registra forget/input/output gates para una secuencia sintética. Compara gradientes a través de muchos pasos con una RNN tanh simple antes de usar una implementación de framework.', url:'https://d2l.ai/chapter_recurrent-modern/lstm.html'}
  ],
  'algo-bst': [
    {title:'Algorithms, 4th Edition — Binary Search Trees', author:'Robert Sedgewick, Kevin Wayne', level:'Inicial → intermedio · estructuras', note:'Inserta primero claves aleatorias y luego claves ordenadas. Mide altura y número de comparaciones para demostrar por qué BST no significa automáticamente O(log n); después implementa inorder y verifica que produce claves ordenadas.', url:'https://algs4.cs.princeton.edu/32bst/'}
  ],
  'algo-hash-tables': [
    {title:'Algorithms, 4th Edition — Hash Tables', author:'Robert Sedgewick, Kevin Wayne', level:'Inicial → intermedio · hashing', note:'Implementa separate chaining y mide longitud media/máxima de cadenas mientras varías el load factor. Repite con una función hash deliberadamente mala para separar el coste teórico de la calidad real de distribución.', url:'https://algs4.cs.princeton.edu/34hash/'}
  ]

  ,
  'tf-positional': [
    {title:'Attention Is All You Need — positional encoding', author:'Ashish Vaswani et al.', level:'Paper fundamental · Transformers', note:'Reproduce las ecuaciones sinusoidales para unas pocas posiciones y dimensiones y grafica cada frecuencia. Después permuta los tokens manteniendo sus embeddings y explica qué información adicional aporta sumar la codificación posicional.', url:'https://arxiv.org/abs/1706.03762'}
  ],
  'sig-aliasing-nyquist': [
    {title:'The Scientist and Engineer’s Guide to Digital Signal Processing — Sampling Theorem', author:'Steven W. Smith', level:'Inicial → intermedio · señales', note:'Genera dos senos, muestrea uno por debajo y otro por encima de Nyquist y grafica las muestras. Añade después un filtro pasa-bajos antes de reducir sample rate para distinguir teorema de muestreo de anti-aliasing práctico.', url:'https://www.dspguide.com/ch3.htm'}
  ],
  'algo-tries': [
    {title:'Algorithms, 4th Edition — Tries', author:'Robert Sedgewick, Kevin Wayne', level:'Intermedio · strings', note:'Implementa put/get y prefix search en un trie. Mide nodos creados para claves con muchos prefijos compartidos frente a claves aleatorias y compara memoria/latencia con un hash map para búsquedas exactas.', url:'https://algs4.cs.princeton.edu/52trie/'}
  ]
  ,
  'sync-mutex-semaphore-condvar-atomics': [
    {title:'Operating Systems: Three Easy Pieces — Locks', author:'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau', level:'Intermedio · concurrencia', note:'Protege un contador con y sin mutex y ejecuta varios threads hasta observar una race. Después introduce dos locks y provoca deliberadamente un orden inverso para conectar exclusión mutua con deadlock y lock ordering.', url:'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf'}
  ],

  'pcb-layout': [
    {title:'KiCad 9 — PCB Editor', author:'KiCad Project', level:'Práctico · diseño de PCB', note:'Coloca primero conectores, alimentación y componentes críticos; después enruta unas pocas nets con DRC activo. Repite moviendo footprints y compara longitud, cruces, vias y facilidad de retorno antes de asumir que el routing “arregla” un mal placement.', url:'https://docs.kicad.org/9.0/en/pcbnew/pcbnew.html'}
  ],
  'render-pbr-materials': [
    {title:'LearnOpenGL — PBR Theory', author:'Joey de Vries', level:'Intermedio · PBR', note:'Renderiza una cuadrícula de esferas variando roughness y metalness por ejes. Mantén iluminación y albedo constantes y explica cómo cambian tamaño/intensidad del lóbulo especular, componente difusa y F0; después sustituye valores uniformes por mapas.', url:'https://learnopengl.com/PBR/Theory'}
  ],
  'latches-flipflops': [
    {title:'Digital Design and Computer Architecture — sequential logic', author:'David Money Harris, Sarah L. Harris', level:'Inicial → intermedio · lógica secuencial', note:'Dibuja primero un latch D y luego un flip-flop D. Para una misma señal D, anota cuándo Q puede cambiar en cada caso y comprueba con una simulación temporal que “almacenar un bit” no implica el mismo contrato de temporización.', url:'https://pages.hmc.edu/harris/ddca/'}
  ],
  'fpga-timing': [
    {title:'Vivado Design Suite User Guide — Design Analysis and Closure Techniques (UG906)', author:'AMD', level:'Avanzado · timing FPGA', note:'Toma un path real o de ejemplo y separa requirement, data path delay y slack. Ejecuta análisis de setup y hold por separado y explica por qué bajar la frecuencia puede ayudar a setup pero no convierte automáticamente un fallo de hold en uno aceptable.', url:'https://docs.amd.com/r/en-US/ug906-vivado-design-analysis/Timing-Field'}
  ],
  'temporizacion-digital': [
    {title:'Vivado UG906 — setup/hold relationships', author:'AMD', level:'Intermedio · temporización', note:'Usa el diagrama de setup/hold para identificar launch edge, capture edge y ventana de estabilidad. Después relaciona el dibujo ideal con checks max-delay/min-delay y evita confundir clock-to-Q con setup o hold.', url:'https://docs.amd.com/r/en-US/ug906-vivado-design-analysis/Hold/Removal-Relationship'}
  ],

};
