/**
 * BLOQUE 005 — Arquitectura de computadores
 *
 * Objetivo editorial:
 * - conectar lógica digital con una máquina programable completa;
 * - separar arquitectura (contrato ISA) de microarquitectura (implementación);
 * - construir un modelo preciso de CPU, memoria, buses, instrucciones y privilegios;
 * - preparar el terreno para assembly y microarquitectura avanzada.
 */

window.LEARNING_PATHS[5] = {
  level: "Experto progresivo",
  estimatedHours: 22,
  description:
    "Organización de computadores, CPU, datapath, ciclo de instrucción, ISA, direccionamiento y comparación conceptual entre x86-64, AArch64 y RISC-V.",
  outcomes: [
    "Distinguir arquitectura, organización y microarquitectura sin confundir el contrato de software con su implementación física.",
    "Explicar cómo CPU, memoria y E/S cooperan mediante direcciones, datos y control.",
    "Seguir el flujo de una instrucción desde fetch hasta actualización del estado arquitectónico.",
    "Razonar sobre registros, PC, SP, flags, unidad de control y datapath.",
    "Leer una especificación elemental de ISA identificando opcode, operandos, modos de direccionamiento y efectos laterales.",
    "Distinguir load/store, saltos, llamadas, retornos y cambios de privilegio.",
    "Comparar x86-64, AArch64 y RISC-V evitando reducir RISC/CISC a longitud fija frente a variable."
  ],
  modules: [
    {
      id: "m1-organizacion",
      title: "Organización del computador",
      description: "Modelos de memoria, CPU, E/S, buses y ciclo básico de ejecución.",
      lessons: ["arquitectura-organizacion", "von-neumann-harvard", "buses-memoria-io", "fetch-decode-execute"]
    },
    {
      id: "m2-cpu",
      title: "CPU y datapath",
      description: "Registros, unidad de control, ALU, flags y flujo de datos interno.",
      lessons: ["registros-cpu", "datapath-control"]
    },
    {
      id: "m3-isa",
      title: "Instruction Set Architecture",
      description: "Contrato máquina-software, formatos, operandos y direccionamiento.",
      lessons: ["isa-contrato", "opcodes-operandos", "direccionamiento-load-store", "control-flujo-privilegios"]
    },
    {
      id: "m4-familias",
      title: "Familias de ISA",
      description: "Comparación rigurosa de x86-64, AArch64 y RISC-V y del vocabulario RISC/CISC.",
      lessons: ["x86-arm-riscv"]
    }
  ]
};

Object.assign(window.LESSONS, {
  "arquitectura-organizacion": {
    id: "arquitectura-organizacion", courseId: 5,
    title: "Arquitectura, organización y microarquitectura",
    shortTitle: "Tres niveles que no conviene mezclar",
    duration: 78,
    objective: "separar con precisión ISA, organización del sistema y microarquitectura, y explicar qué propiedades pertenecen a cada nivel.",
    summary: [
      "La ISA especifica el estado y comportamiento que el software puede observar: instrucciones, registros, memoria y excepciones definidas por el contrato.",
      "La microarquitectura decide cómo implementar ese contrato: pipelines, cachés, unidades de ejecución, renombrado o microcódigo pueden variar sin cambiar la ISA.",
      "La organización del computador estudia cómo se conectan CPU, memoria, E/S e interconexiones dentro del sistema."
    ],
    concept: "Un programa binario depende de un contrato arquitectónico, no de la topología exacta de transistores. Esta separación permite ejecutar el mismo software sobre procesadores internamente muy distintos.",
    diagram: ["software", "↓ ISA", "CPU concreta", "↓ microarquitectura", "lógica digital"],
    rules: [
      "No infieras la microarquitectura a partir del nombre de la ISA.",
      "Un detalle visible para software pertenece al contrato arquitectónico solo si la especificación lo define como tal.",
      "Rendimiento y compatibilidad son problemas relacionados, pero distintos."
    ],
    deep: { sections: [
      { title: "ISA como interfaz", body: "La ISA define operaciones y estado arquitectónico que un programa puede usar. Dos núcleos compatibles pueden diferir radicalmente en pipeline, predicción o número de unidades funcionales y aun así producir el mismo comportamiento arquitectónico permitido." },
      { title: "Microarquitectura", body: "Una implementación traduce instrucciones a actividad interna. Algunas CPU descomponen instrucciones complejas en micro-operaciones; otras mantienen datapaths más directos. Nada obliga a que la frontera de una instrucción coincida con una única operación interna." },
      { title: "Organización", body: "La organización incluye memoria, E/S, interconexiones, controladores y jerarquías. Es posible estudiar una CPU correcta en aislamiento y aun así diseñar un sistema mediocre si la organización alrededor de ella es inadecuada." },
      { title: "Compatibilidad", body: "Compatibilidad binaria significa respetar el contrato requerido por el software, no reproducir idénticos tiempos. Incluso instrucciones arquitectónicamente equivalentes pueden tener latencias distintas entre generaciones." }
    ], commonErrors: ["Usar ISA y microarquitectura como sinónimos.", "Pensar que una instrucción equivale a una puerta o bloque físico único.", "Confundir compatibilidad con rendimiento idéntico."], connections: ["Bloque 007 estudiará pipelines, hazards, ejecución especulativa y fuera de orden.", "Bloque 006 utilizará directamente el contrato ISA desde assembly."] },
    example: { problem: "Dos CPU ejecutan el mismo binario RISC-V, pero una tiene pipeline de 5 etapas y otra ejecución fuera de orden. ¿Violan la compatibilidad?", steps: [["Contrato", "Ambas implementan la misma ISA requerida."], ["Internos", "Pipeline y OoO son decisiones microarquitectónicas."], ["Observación", "El software puede ver distinto rendimiento, no necesariamente distinta semántica."], ["Conclusión", "Pueden ser compatibles sin ser internamente parecidas."]], answer: "No: pueden implementar el mismo contrato ISA con microarquitecturas distintas." },
    check: { question: "¿Dónde pertenece el branch predictor?", options: [["Microarquitectura", true], ["Siempre a la ISA", false], ["Al formato UTF-8", false]], success: "Correcto. Su existencia concreta es una decisión de implementación.", failure: "La predicción ayuda a ejecutar el contrato; no suele formar parte del contrato visible de la ISA." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿ISA y microarquitectura son sinónimos? sí/no", answer: "no", hint: "Una es contrato; la otra, implementación." },
      { level: 2, label: "Normal", prompt: "¿Una caché L1 concreta es normalmente ISA o microarquitectura?", answer: "microarquitectura", hint: "El binario no necesita conocer su tamaño para ser compatible." },
      { level: 3, label: "Difícil", prompt: "¿Dos CPU con distinta profundidad de pipeline pueden ejecutar la misma ISA? sí/no", answer: "si", hint: "Compatibilidad no exige internals idénticos." }
    ]
  },

  "von-neumann-harvard": {
    id: "von-neumann-harvard", courseId: 5,
    title: "Von Neumann, Harvard y espacios de memoria",
    shortTitle: "Dónde viven instrucciones y datos",
    duration: 72,
    objective: "comparar los modelos Von Neumann y Harvard y reconocer arquitecturas modificadas donde la separación aparece solo en ciertos niveles.",
    summary: [
      "El modelo Von Neumann usa conceptualmente un espacio común para instrucciones y datos.",
      "Harvard separa almacenamiento o caminos de instrucciones y datos, permitiendo accesos independientes.",
      "Muchos sistemas modernos son híbridos: pueden presentar un espacio arquitectónico unificado y usar cachés separadas de instrucciones y datos internamente."
    ],
    concept: "Von Neumann y Harvard son modelos útiles, no etiquetas binarias capaces de describir por sí solas toda una CPU moderna. Hay que preguntar en qué nivel existe la separación: espacio de direcciones, memoria física, caché o buses.",
    diagram: ["Von Neumann: CPU ↔ memoria I+D", "Harvard: CPU ↔ I | D"],
    rules: ["Distingue espacio de direcciones de caché física.", "Una I-cache y D-cache separadas no implican necesariamente dos espacios arquitectónicos independientes.", "Código y datos comparten problemas de coherencia cuando una región puede modificarse y ejecutarse."],
    deep: { sections: [
      { title: "Cuello de botella", body: "En un modelo unificado, instrucciones y datos compiten conceptualmente por recursos de memoria. Sistemas modernos mitigan esto con cachés, prefetch y múltiples canales, por lo que el término 'cuello de botella de Von Neumann' describe una tensión arquitectónica general, no un único cable compartido universal." },
      { title: "Harvard modificado", body: "Es frecuente tener L1 de instrucciones y datos separadas y niveles inferiores unificados. El programador puede percibir un único espacio de memoria mientras la microarquitectura explota caminos separados." },
      { title: "Código automodificable", body: "Cuando software escribe bytes que después serán ejecutados, puede necesitar operaciones explícitas de sincronización o mantenimiento de caché según la arquitectura. Esto demuestra que 'mismo espacio de direcciones' no significa coherencia automática entre todos los caminos internos." }
    ], commonErrors: ["Llamar Harvard a cualquier CPU con dos cachés L1.", "Suponer un único bus físico en todo diseño Von Neumann.", "Confundir memoria física con espacio virtual."], connections: ["La jerarquía de memoria se profundiza en el Bloque 008.", "JIT y código generado conectan esta distinción con compiladores."] },
    example: { problem: "Una CPU tiene espacio virtual unificado, L1I y L1D separadas y L2 unificada. ¿Es razonable llamarla Harvard pura?", steps: [["Software", "Ve un espacio unificado."], ["L1", "Hay caminos/cachés separados."], ["L2", "Vuelve a unificarse."], ["Clasificación", "Es más preciso hablar de organización Harvard modificada/híbrida."]], answer: "No; la descripción híbrida o Harvard modificada es más precisa." },
    check: { question: "¿Separar I-cache y D-cache obliga a tener dos espacios de direcciones visibles?", options: [["No", true], ["Sí, siempre", false], ["Solo con UTF-16", false]], success: "Correcto. Separación microarquitectónica y espacio arquitectónico son niveles distintos.", failure: "Una CPU puede tener cachés separadas y un espacio de direcciones unificado." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Von Neumann unifica conceptualmente instrucciones y datos? sí/no", answer: "si", hint: "Ese es el contraste clásico con Harvard." },
      { level: 2, label: "Normal", prompt: "Una L1I y una L1D separadas describen principalmente ISA o microarquitectura?", answer: "microarquitectura", hint: "Son estructuras internas de caché." },
      { level: 3, label: "Difícil", prompt: "¿Un JIT puede necesitar sincronizar caché de instrucciones tras escribir código? sí/no", answer: "si", hint: "Los caminos de datos e instrucciones pueden no hacerse coherentes automáticamente." }
    ]
  },

  "buses-memoria-io": {
    id: "buses-memoria-io", courseId: 5,
    title: "CPU, memoria, E/S y buses",
    shortTitle: "Mover bits con intención",
    duration: 82,
    objective: "explicar funciones de buses de datos, direcciones y control y distinguirlos de interconexiones modernas por paquetes o transacciones.",
    summary: ["Las direcciones seleccionan destinos o ubicaciones; los datos transportan valores; las señales de control describen operación, temporización o estado.", "El modelo de tres buses es pedagógico: interconexiones modernas pueden multiplexar campos, usar canales separados o paquetes.", "La E/S puede exponerse como memoria mapeada o mediante espacios/instrucciones específicos según la arquitectura."],
    concept: "Una transacción de memoria no es 'la CPU pregunta a la RAM' en abstracto: debe identificar una ubicación, especificar la operación, transportar datos cuando corresponda y respetar un protocolo.",
    diagram: ["CPU", "⇄ interconexión", "memoria / controladores / dispositivos"],
    rules: ["El ancho del bus de datos no determina por sí solo el tamaño del espacio de direcciones.", "Un bus de direcciones de n bits puede nombrar hasta 2^n posiciones si cada patrón es utilizable, pero el significado de cada dirección depende del sistema.", "No confundas protocolo lógico con número de pistas físicas."],
    deep: { sections: [
      { title: "Dirección y datos", body: "Una dirección es un identificador dentro de un espacio. Si el sistema es byte-addressable, direcciones consecutivas nombran bytes; otros sistemas pueden direccionar unidades distintas. Por ello 32 bits de dirección no implica automáticamente 4 GiB de RAM instalada, solo un máximo teórico de 2^32 unidades direccionables bajo ese modelo." },
      { title: "Control", body: "Lectura/escritura, tamaño, privilegio, validez, respuesta y errores pueden viajar como señales o campos protocolarios. Las interconexiones actuales suelen abstraerse mejor como transacciones que como tres haces de cables independientes." },
      { title: "Memory-mapped I/O", body: "Un dispositivo puede ocupar direcciones que no representan RAM. Una carga o almacenamiento a esas direcciones activa registros del periférico. Esto obliga a considerar efectos laterales, orden y atributos de memoria." },
      { title: "Arbitraje", body: "CPU, DMA y otros agentes pueden competir por memoria o periféricos. La interconexión decide prioridad y concurrencia. A partir de aquí 'bus' deja de ser solo una línea en un diagrama y se convierte en un protocolo de coordinación." }
    ], commonErrors: ["Inferir RAM instalada del ancho de direcciones.", "Creer que todo acceso a una dirección toca DRAM.", "Pensar que todos los buses modernos son tres grupos físicos separados."], connections: ["Bloque 014 profundizará en MMIO, interrupciones y DMA.", "Bloque 008 estudiará controladores y canales de memoria."] },
    example: { problem: "Sistema byte-addressable con 20 bits de dirección. ¿Cuántos bytes distintos puede nombrar como máximo el espacio completo?", steps: [["Patrones", "Hay 2^20 direcciones posibles."], ["Unidad", "Cada dirección identifica un byte."], ["Total", "2^20 bytes = 1 MiB."], ["Matiz", "Eso no garantiza que todo el espacio contenga RAM."]], answer: "1 MiB de espacio byte-addressable máximo, no necesariamente 1 MiB de RAM." },
    check: { question: "¿Una dirección MMIO puede activar un periférico en vez de RAM?", options: [["Sí", true], ["No, toda dirección es RAM", false], ["Solo en decimal", false]], success: "Correcto. El mapa de direcciones puede incluir dispositivos.", failure: "MMIO utiliza parte del espacio de direcciones para registros de dispositivos." },
    practice: [
      { level: 1, label: "Básico", prompt: "Con 16 bits de dirección hay cuántos patrones posibles?", answer: "65536", hint: "2^16." },
      { level: 2, label: "Normal", prompt: "¿El bus de datos selecciona por sí solo la ubicación? sí/no", answer: "no", hint: "Esa función corresponde conceptualmente a la dirección." },
      { level: 3, label: "Difícil", prompt: "¿MMIO significa que el periférico es físicamente RAM? sí/no", answer: "no", hint: "Comparte mecanismo de direccionamiento, no tecnología de almacenamiento." }
    ]
  },

  "fetch-decode-execute": {
    id: "fetch-decode-execute", courseId: 5,
    title: "Ciclo fetch-decode-execute",
    shortTitle: "Cómo avanza una máquina de instrucciones",
    duration: 86,
    objective: "seguir el estado arquitectónico de una instrucción a través de fetch, decode, obtención de operandos, ejecución y commit conceptual.",
    summary: ["Fetch obtiene bytes o palabras de instrucción según el PC y la organización de memoria.", "Decode interpreta esos bits conforme a la ISA y determina operandos y operación.", "Execute puede incluir ALU, acceso a memoria o cambio de control; CPU modernas solapan y reordenan internamente estas fases."],
    concept: "Fetch-decode-execute es un modelo semántico útil. No exige que una CPU moderna ejecute cada instrucción secuencialmente en tres pasos físicos no solapados.",
    diagram: ["PC → fetch → decode → execute → estado arquitectónico → PC'"],
    rules: ["El PC identifica la posición lógica de ejecución, pero su actualización depende de la ISA y del control de flujo.", "Un load necesita calcular dirección y obtener datos; una suma registro-registro puede no acceder a memoria de datos.", "No confundas orden arquitectónico con orden interno de ejecución."],
    deep: { sections: [
      { title: "Fetch", body: "La máquina identifica la instrucción siguiente mediante el PC. En sistemas reales hay caché de instrucciones, predicción y buffers; conceptualmente, el objetivo es obtener la codificación correcta de la instrucción." },
      { title: "Decode", body: "Los campos de la codificación seleccionan operación y operandos. En ISAs variables, determinar longitud y fronteras puede ser más complejo que en formatos regulares; esto es un coste de implementación, no una diferencia de capacidad computacional fundamental." },
      { title: "Execute y memoria", body: "La ejecución puede activar ALU, unidades vectoriales, generadores de direcciones o control. Las loads/stores interactúan con el sistema de memoria y pueden experimentar fallos de caché o excepciones." },
      { title: "Retiro conceptual", body: "En una máquina fuera de orden, una instrucción puede ejecutarse internamente antes que otra anterior y aun así el procesador preserva el estado arquitectónico requerido mediante mecanismos de retiro/commit. Eso se estudiará después." }
    ], commonErrors: ["Imaginar tres etapas físicas obligatorias.", "Suponer que toda instrucción accede a RAM.", "Creer que PC siempre incrementa una cantidad fija en cualquier ISA."], connections: ["Bloque 007 convierte este modelo secuencial en pipeline, especulación y OoO.", "Bloque 006 permitirá observar PC y registros con assembly/debugger."] },
    example: { problem: "Instrucción conceptual ADD r1,r2,r3. Describe el flujo mínimo.", steps: [["Fetch", "Obtener codificación en PC."], ["Decode", "Identificar ADD y registros fuente/destino."], ["Operandos", "Leer r2 y r3."], ["Execute", "Sumar y escribir resultado arquitectónico en r1; actualizar flujo según ISA."]], answer: "Obtener, interpretar, leer operandos, ejecutar y actualizar el estado definido." },
    check: { question: "¿Fetch-decode-execute obliga a una CPU moderna a terminar una instrucción antes de empezar la siguiente?", options: [["No", true], ["Sí", false], ["Solo con caché", false]], success: "Correcto. Es un modelo conceptual, no una prohibición de pipeline.", failure: "Pipeline y ejecución fuera de orden pueden solapar trabajo preservando la semántica arquitectónica." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Qué registro conceptual indica la próxima instrucción: PC o SP?", answer: "pc", hint: "Program Counter." },
      { level: 2, label: "Normal", prompt: "¿Decode interpreta la codificación según la ISA? sí/no", answer: "si", hint: "Los bits tienen significado porque la ISA lo define." },
      { level: 3, label: "Difícil", prompt: "¿Una CPU OoO puede ejecutar internamente instrucciones fuera de orden manteniendo el estado arquitectónico correcto? sí/no", answer: "si", hint: "La microarquitectura puede ocultar el reordenamiento." }
    ]
  },

  "registros-cpu": {
    id: "registros-cpu", courseId: 5,
    title: "Registros, PC, SP, flags e instruction register",
    shortTitle: "El estado más cercano a la ejecución",
    duration: 82,
    objective: "clasificar registros de propósito general y especializados y razonar sobre PC, SP, flags y estado de instrucción sin asumir que todas las ISA los exponen igual.",
    summary: ["Los registros contienen estado de muy baja latencia usado directamente por la CPU, pero su conjunto visible depende de la ISA.", "PC controla el flujo; SP suele señalar una convención de pila; flags pueden codificar resultados o estado, aunque no todas las ISA diseñan condicionales del mismo modo.", "Un instruction register es útil en modelos educativos; CPU modernas pueden mantener muchas instrucciones simultáneamente en estructuras internas."],
    concept: "'Registro' describe tanto estado arquitectónico visible como registros internos de implementación. Hay que preguntar siempre cuál de los dos sentidos se utiliza.",
    diagram: ["GPRs | PC | SP | flags", "↓", "datapath / control"],
    rules: ["No todos los registros internos son visibles al software.", "SP es una convención/registro especializado definido por la arquitectura y ABI; una pila es una estructura lógica, no una memoria física distinta.", "Flags de carry y overflow tienen significados diferentes."],
    deep: { sections: [
      { title: "GPR", body: "Los registros de propósito general almacenan operandos, direcciones o temporales. El número, ancho y restricciones varían entre ISA. Compiladores realizan asignación de registros para mantener valores frecuentes fuera de memoria." },
      { title: "Program Counter", body: "El PC representa el punto de ejecución arquitectónico. Algunas ISA permiten leerlo como operando de formas específicas; otras no lo tratan como un GPR ordinario. Por eso decir 'el PC es solo otro registro' es demasiado fuerte." },
      { title: "Stack Pointer", body: "SP señala la pila según convenciones del software y reglas arquitectónicas. La pila suele residir en memoria ordinaria; crecer hacia direcciones menores o mayores es una convención concreta, no una ley de la computación." },
      { title: "Flags", body: "Zero, negative, carry y overflow son ejemplos comunes. Algunas operaciones actualizan flags implícita o explícitamente; otras ISA usan comparaciones y branches con diseños diferentes. Los flags son una elección de interfaz ISA." }
    ], commonErrors: ["Llamar a todo registro visible 'registro físico'.", "Creer que la pila es un chip separado.", "Suponer que PC siempre es un GPR normal.", "Confundir carry con overflow signed."], connections: ["Calling conventions del Bloque 006 usarán SP y registros de argumentos.", "Register renaming del Bloque 007 separará registros arquitectónicos de físicos."] },
    example: { problem: "Una función reserva 32 bytes en una pila descendente. ¿Qué cambio conceptual hace SP?", steps: [["Convención", "La pila crece hacia direcciones menores."], ["Reserva", "Se necesita espacio por debajo del SP actual."], ["Actualización", "SP' = SP − 32."], ["Matiz", "La dirección concreta y alineación dependen de ABI/arquitectura."]], answer: "Disminuye 32 bytes bajo esa convención, sujeto a las reglas de alineación." },
    check: { question: "¿La pila es necesariamente una memoria física distinta de la RAM normal?", options: [["No", true], ["Sí", false], ["Solo en x86", false]], success: "Correcto. Normalmente es una región de memoria organizada por convenciones.", failure: "La pila es una estructura lógica; suele ocupar memoria ordinaria." },
    practice: [
      { level: 1, label: "Básico", prompt: "Program Counter se abrevia:", answer: "pc", hint: "Dos letras." },
      { level: 2, label: "Normal", prompt: "¿SP suele participar en la gestión de la pila? sí/no", answer: "si", hint: "Stack Pointer." },
      { level: 3, label: "Difícil", prompt: "¿Todos los registros físicos internos de una CPU OoO son visibles a assembly? sí/no", answer: "no", hint: "La microarquitectura puede tener más registros que la ISA." }
    ]
  },

  "datapath-control": {
    id: "datapath-control", courseId: 5,
    title: "Datapath, ALU y unidad de control",
    shortTitle: "Quién mueve qué y cuándo",
    duration: 88,
    objective: "trazar rutas de datos para operaciones básicas y distinguir datapath de señales de control en una CPU elemental.",
    summary: ["El datapath contiene rutas y bloques que transportan/transforman operandos: banco de registros, ALU, multiplexores y caminos de memoria.", "La unidad de control decide qué operación y rutas activar para una instrucción.", "Control cableado y microprogramado son estrategias de implementación; una ISA no obliga universalmente a una de ellas."],
    concept: "Una instrucción se realiza coordinando movimiento de datos y control. El datapath responde 'por dónde y con qué bloques'; el control responde 'qué seleccionar y cuándo'.",
    diagram: ["registros → MUX → ALU → MUX → registros", "           ↑ control ↓"],
    rules: ["La ALU no es la CPU completa.", "Un multiplexor del datapath selecciona fuentes según control.", "Microcódigo es una técnica de implementación y no sinónimo de ISA CISC."],
    deep: { sections: [
      { title: "Banco de registros", body: "Una CPU elemental puede leer operandos de uno o más puertos y escribir un destino. El número de puertos tiene coste físico: mayor flexibilidad exige más cableado y área." },
      { title: "ALU", body: "La ALU implementa operaciones enteras/lógicas y puede producir señales auxiliares. Multiplicación, división, coma flotante o vectores pueden vivir en unidades separadas; 'ALU' no engloba necesariamente toda ejecución." },
      { title: "Control", body: "El opcode y estado actual alimentan lógica que genera selecciones y enables. En diseños simples, una FSM puede secuenciar varios ciclos. En diseños complejos, decode genera operaciones internas y se apoya en grandes estructuras de planificación." },
      { title: "Microcódigo", body: "Algunas instrucciones pueden implementarse como secuencias internas almacenadas o generadas por una unidad de microcódigo. No toda instrucción x86 usa microcódigo ni toda arquitectura RISC carece de él." }
    ], commonErrors: ["Decir que CPU=ALU.", "Confundir señal de control con dato.", "Equiparar CISC a microcódigo obligatorio y RISC a ausencia total de microcódigo."], connections: ["El Bloque 004 construyó ALU y multiplexores.", "El Bloque 007 ampliará el datapath con forwarding, ROB y renaming."] },
    example: { problem: "Para ADD r1,r2,r3 en una CPU simple, ¿qué camino conceptual se activa?", steps: [["Lectura", "Banco de registros entrega r2 y r3."], ["Selección", "MUX dirige esos operandos a la ALU."], ["ALU", "Selecciona suma."], ["Writeback", "Resultado vuelve al puerto de escritura para r1."]], answer: "Registros → ALU(suma) → writeback a r1." },
    check: { question: "¿La unidad de control y el datapath responden exactamente a la misma función?", options: [["No", true], ["Sí", false], ["Solo en decimal", false]], success: "Correcto. Cooperan, pero separan decisión y transformación/movimiento de datos.", failure: "El control selecciona acciones; el datapath transporta y transforma valores." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Qué bloque suele sumar operandos enteros: ALU o SSD?", answer: "alu", hint: "Unidad aritmético-lógica." },
      { level: 2, label: "Normal", prompt: "¿Un MUX puede seleccionar entre dos fuentes del datapath? sí/no", answer: "si", hint: "Esa es su función combinacional." },
      { level: 3, label: "Difícil", prompt: "¿Microcódigo es una propiedad obligatoria de toda ISA CISC? sí/no", answer: "no", hint: "Es una estrategia de implementación, no una definición universal." }
    ]
  },

  "isa-contrato": {
    id: "isa-contrato", courseId: 5,
    title: "Qué es realmente una ISA",
    shortTitle: "El contrato máquina-software",
    duration: 86,
    objective: "enumerar los elementos de una ISA y separar comportamiento arquitectónico definido de comportamiento de implementación.",
    summary: ["Una ISA define instrucciones y estado visible, formatos y reglas relevantes para ejecutar software compatible.", "La especificación puede definir excepciones, niveles de privilegio, memoria y extensiones además de operaciones aritméticas.", "Una ISA no describe necesariamente cachés, pipeline o predictor concretos."],
    concept: "La ISA es una especificación de interfaz entre software de bajo nivel y una máquina abstracta implementable. Compiladores, ensambladores, sistemas operativos, emuladores y CPU físicas se encuentran en esa frontera.",
    diagram: ["C/C++ → compiler → ISA ← CPU/emulador"],
    rules: ["Lee la especificación para saber qué está garantizado.", "Distingue extensiones opcionales de la base ISA.", "Undefined/implementation-defined en una capa no debe inventarse como garantía."],
    deep: { sections: [
      { title: "Estado arquitectónico", body: "Incluye registros, PC y otro estado definido. El software observa cambios de ese estado después de instrucciones, excepciones y eventos según el modelo arquitectónico." },
      { title: "Instrucciones", body: "Cada instrucción tiene codificación y semántica: operandos, resultado y posibles excepciones. Un mnemonic de assembly es una representación humana; los bits son la codificación que consume la máquina." },
      { title: "Extensiones", body: "RISC-V ilustra claramente una base ISA combinable con extensiones ratificadas. El hecho de que dos máquinas sean 'RISC-V' no implica que soporten exactamente el mismo conjunto de extensiones." },
      { title: "Privilegio", body: "El software de sistema necesita reglas adicionales: modos, registros de control, excepciones e interrupciones. Algunas especificaciones separan arquitectura no privilegiada y privilegiada precisamente para mantener modular la interfaz." }
    ], commonErrors: ["Definir ISA solo como lista de mnemonics.", "Suponer que todas las extensiones son obligatorias.", "Meter tamaño de caché dentro de la ISA por defecto."], connections: ["El compilador del Bloque 010 seleccionará instrucciones de una ISA objetivo.", "El kernel del Bloque 012 dependerá especialmente de la parte privilegiada."] },
    example: { problem: "Un compilador genera una instrucción de una extensión vectorial opcional. ¿Puede ejecutarla cualquier CPU de la misma familia base?", steps: [["Base", "Compartir la ISA base no garantiza extensiones."], ["Binario", "La instrucción necesita soporte concreto."], ["Detección", "Software/OS puede necesitar descubrir capacidades."], ["Conclusión", "Debe existir la extensión requerida o una estrategia alternativa."]], answer: "No; el conjunto de extensiones soportadas forma parte de los requisitos del binario." },
    check: { question: "¿El tamaño exacto de una L1 concreta suele pertenecer a la ISA?", options: [["No", true], ["Sí, siempre", false], ["Solo en ARM", false]], success: "Correcto. Normalmente es un detalle microarquitectónico.", failure: "La ISA especifica el contrato; la jerarquía concreta de caché suele ser implementación." },
    practice: [
      { level: 1, label: "Básico", prompt: "ISA significa Instruction Set ...", answer: "architecture", hint: "La A final." },
      { level: 2, label: "Normal", prompt: "¿Un emulador puede implementar semánticamente una ISA sin ser esa CPU física? sí/no", answer: "si", hint: "Implementa el contrato en software." },
      { level: 3, label: "Difícil", prompt: "¿Todas las extensiones opcionales de una ISA deben estar presentes en cualquier implementación? sí/no", answer: "no", hint: "Opcional significa precisamente que hay perfiles/capacidades distintas." }
    ]
  },

  "opcodes-operandos": {
    id: "opcodes-operandos", courseId: 5,
    title: "Opcode, operandos y formatos de instrucción",
    shortTitle: "Dar significado a los bits",
    duration: 90,
    objective: "descomponer una codificación de instrucción en campos y explicar cómo opcode y operandos determinan una operación arquitectónica.",
    summary: ["El opcode identifica una operación o familia de operaciones, a menudo junto con otros campos de función.", "Los operandos pueden ser registros, inmediatos, direcciones o ubicaciones implícitas.", "Formatos regulares simplifican decode, pero codificaciones densas pueden ahorrar ancho de banda; ninguna propiedad aislada decide el rendimiento total."],
    concept: "Una palabra de instrucción es un mensaje codificado. Su estructura reparte bits entre identificar la operación y describir operandos; ese reparto es un compromiso de diseño.",
    diagram: ["[ opcode | rd | rs1 | rs2/immediate ]"],
    rules: ["Mnemonic no es opcode: uno es texto de assembly, otro campo codificado.", "Un inmediato ocupa bits dentro de la instrucción y por tanto tiene rango limitado.", "Formatos de longitud variable y fija tienen compromisos distintos, no una jerarquía universal de calidad."],
    deep: { sections: [
      { title: "Espacio de codificación", body: "Con k bits hay 2^k patrones. Reservar más bits para opcodes permite más combinaciones directas, pero deja menos espacio para operandos en una instrucción de longitud fija. Las ISA solucionan esto con múltiples formatos, prefijos, extensiones o campos secundarios." },
      { title: "Operandos explícitos", body: "Una ISA de tres operandos puede nombrar dos fuentes y un destino; otras reutilizan uno de los operandos como destino o utilizan acumuladores implícitos. Esto influye en densidad de código y movimiento de datos." },
      { title: "Inmediatos", body: "Un valor literal pequeño puede codificarse junto a la operación, evitando una lectura adicional de memoria. Para constantes grandes pueden necesitarse varias instrucciones o mecanismos específicos." },
      { title: "Decode", body: "El decodificador transforma patrones en control interno. Una codificación regular facilita ciertas implementaciones, aunque CPU modernas pueden invertir mucha lógica para decodificar formatos históricos complejos sin dejar de obtener alto rendimiento." }
    ], commonErrors: ["Llamar opcode al mnemonic textual.", "Suponer inmediatos de tamaño ilimitado.", "Pensar que longitud fija implica automáticamente mayor velocidad global."], connections: ["Bloque 006 permitirá inspeccionar bytes reales y desensamblado.", "Bloque 010 mostrará cómo assembler y linker producen esos bits."] },
    example: { problem: "Formato educativo de 16 bits: 4 opcode, 4 rd, 4 rs, 4 inmediato. ¿Cuántos opcodes directos y registros direccionables por campo permite?", steps: [["Opcode", "4 bits → 16 patrones."], ["Registro", "4 bits → 16 índices."], ["Inmediato", "4 bits da 16 patrones; su interpretación signed/unsigned depende de la ISA."], ["Compromiso", "Aumentar un campo obliga a reducir otro si la longitud permanece fija."]], answer: "Hasta 16 opcodes directos y 16 registros por cada campo de 4 bits." },
    check: { question: "¿El texto ADD que escribe el programador es literalmente el opcode binario?", options: [["No", true], ["Sí", false], ["Solo en hexadecimal", false]], success: "Correcto. ADD es un mnemonic que el ensamblador codifica.", failure: "El mnemonic es notación humana; el opcode forma parte de la codificación binaria." },
    practice: [
      { level: 1, label: "Básico", prompt: "Con 5 bits hay cuántos patrones?", answer: "32", hint: "2^5." },
      { level: 2, label: "Normal", prompt: "¿Un inmediato está codificado dentro de la instrucción? sí/no", answer: "si", hint: "Es un literal embebido en su formato." },
      { level: 3, label: "Difícil", prompt: "Campo de registro de 6 bits permite cuántos índices distintos?", answer: "64", hint: "2^6." }
    ]
  },

  "direccionamiento-load-store": {
    id: "direccionamiento-load-store", courseId: 5,
    title: "Modos de direccionamiento y modelo load/store",
    shortTitle: "Encontrar operandos",
    duration: 94,
    objective: "calcular direcciones efectivas y distinguir arquitecturas load/store de ISA que permiten más operaciones directamente con memoria.",
    summary: ["Un modo de direccionamiento define cómo obtener un operando o calcular su dirección efectiva.", "Base+desplazamiento es fundamental para structs, arrays, stack frames y acceso a memoria.", "En una arquitectura load/store, las operaciones aritméticas normales trabajan sobre registros y loads/stores transfieren entre registros y memoria."],
    concept: "La dirección efectiva es un cálculo arquitectónico. El hecho de que la memoria real pase por TLB, caché y controlador es una capa posterior.",
    diagram: ["base + índice·escala + desplazamiento → dirección efectiva → memoria"],
    rules: ["Dirección efectiva no es necesariamente dirección física.", "Load lee memoria hacia estado de CPU; store escribe desde CPU hacia memoria bajo la semántica de la ISA.", "RISC no significa que solo existan dos modos de direccionamiento ni CISC que cualquier combinación sea posible."],
    deep: { sections: [
      { title: "Base + offset", body: "Una dirección como [base+offset] permite acceder a campos y variables locales. El offset suele ser inmediato y por ello tiene rango limitado; el compilador organiza registros y secuencias cuando la dirección no cabe directamente." },
      { title: "Indexado", body: "Algunas ISA permiten índice y escala dentro de una instrucción; otras exigen calcular la dirección en instrucciones separadas. Ambas pueden representar el mismo algoritmo con distintos compromisos de codificación y ejecución." },
      { title: "Load/store", body: "AArch64 y RISC-V siguen fuertemente un enfoque load/store para aritmética general: primero cargan datos a registros, operan y después almacenan. x86 permite muchas instrucciones con un operando de memoria, aunque sigue teniendo límites concretos." },
      { title: "Virtual frente a física", body: "El programa suele producir una dirección virtual. MMU y TLB participan en su traducción y protección. Mezclar estos niveles hace imposible entender page faults posteriormente." }
    ], commonErrors: ["Llamar física a toda dirección calculada por una instrucción.", "Creer que load/store significa ausencia de memoria caché.", "Reducir RISC/CISC a una única regla de operandos."], connections: ["Bloque 008 desarrollará MMU, TLB y memoria virtual.", "Bloque 009 mostrará pointer arithmetic de C y su traducción a direccionamiento."] },
    example: { problem: "Base=0x1000, índice=5, escala=4, desplazamiento=8. Calcula dirección efectiva.", steps: [["Índice", "5·4 = 20 = 0x14."], ["Offset total", "0x14+0x8=0x1C."], ["Base", "0x1000+0x1C=0x101C."], ["Matiz", "Esa es dirección efectiva; puede ser virtual."]], answer: "0x101C." },
    check: { question: "¿Dirección efectiva y dirección física son siempre idénticas?", options: [["No", true], ["Sí", false], ["Solo con stack", false]], success: "Correcto. La traducción de memoria puede separar ambos niveles.", failure: "Con memoria virtual, la dirección generada por el programa suele traducirse antes de llegar a memoria física." },
    practice: [
      { level: 1, label: "Básico", prompt: "Base 1000 decimal + offset 24 =", answer: "1024", hint: "Suma directa." },
      { level: 2, label: "Normal", prompt: "¿Load suele mover datos desde memoria hacia un registro? sí/no", answer: "si", hint: "Load carga." },
      { level: 3, label: "Difícil", prompt: "Base=200, índice=7, escala=8, offset=4. Dirección efectiva decimal:", answer: "260", hint: "200 + 7·8 + 4." }
    ]
  },

  "control-flujo-privilegios": {
    id: "control-flujo-privilegios", courseId: 5,
    title: "Saltos, llamadas, retornos y privilegios",
    shortTitle: "Cambiar el flujo sin perder el control",
    duration: 96,
    objective: "explicar control de flujo, llamadas y retorno, y diferenciar una llamada normal de función de una transición controlada de privilegio.",
    summary: ["Un branch cambia el próximo PC según una condición o destino.", "Call necesita conservar información suficiente para regresar; la forma concreta depende de ISA y ABI.", "Las transiciones de privilegio protegen recursos y no deben confundirse con una llamada de función ordinaria."],
    concept: "El control de flujo modifica la secuencia de instrucciones; los mecanismos de privilegio añaden una frontera de protección entre contextos con capacidades distintas.",
    diagram: ["PC → branch/call", "call → guarda retorno", "exception/syscall → entrada privilegiada controlada"],
    rules: ["Una llamada no exige universalmente guardar retorno en la pila; algunas ISA usan un link register.", "Return es una convención/instrucción que recupera un destino previamente establecido.", "Cambiar a modo privilegiado requiere mecanismos arquitectónicos controlados; escribir simplemente el PC no concede privilegios."],
    deep: { sections: [
      { title: "Branches", body: "Saltos condicionales dependen de flags o comparaciones según ISA. El destino puede ser relativo al PC o calculado indirectamente. Esta flexibilidad permite if, loops, switch y dispatch dinámico." },
      { title: "Calls", body: "Una llamada debe preservar dirección de retorno. x86 CALL coloca información de retorno en la pila; AArch64 BL escribe el link register X30. El ABI decide además qué registros debe preservar cada parte." },
      { title: "Retornos", body: "Un retorno transfiere control al llamador. La seguridad moderna presta atención a la integridad de esos destinos porque corromperlos puede desviar ejecución." },
      { title: "Privilegios", body: "Sistemas operativos necesitan ejecutar operaciones no permitidas a aplicaciones. Syscalls, excepciones e interrupciones producen transiciones definidas que guardan estado y saltan a handlers con reglas arquitectónicas precisas." }
    ], commonErrors: ["Decir que toda call guarda retorno en stack.", "Confundir ABI con ISA.", "Pensar que un salto arbitrario eleva privilegios."], connections: ["Bloque 012 desarrollará syscalls, rings y kernel/user space.", "Bloque 006 estudiará calling conventions y stack frames."] },
    example: { problem: "En AArch64, una llamada BL usa típicamente X30 como link register. ¿Qué información conceptual debe preservar?", steps: [["Call", "Transfiere control al callee."], ["Continuación", "El llamador necesita saber dónde seguir."], ["Link", "X30 recibe la dirección de retorno arquitectónica correspondiente."], ["Return", "RET suele usar ese enlace o uno especificado."]], answer: "La ubicación de retorno para reanudar al llamador." },
    check: { question: "¿Toda ISA guarda automáticamente la dirección de retorno en la pila al hacer call?", options: [["No", true], ["Sí", false], ["Solo RISC-V", false]], success: "Correcto. Existen diseños con link register y otras convenciones.", failure: "La estrategia depende de ISA/ABI; no todas usan la pila automáticamente." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Un branch puede cambiar el PC? sí/no", answer: "si", hint: "Ese es su objetivo." },
      { level: 2, label: "Normal", prompt: "¿ABI e ISA son exactamente lo mismo? sí/no", answer: "no", hint: "ABI añade convenciones binarias de software sobre una arquitectura." },
      { level: 3, label: "Difícil", prompt: "¿Un syscall es conceptualmente una transición controlada hacia código privilegiado? sí/no", answer: "si", hint: "Permite pedir servicios al kernel bajo reglas definidas." }
    ]
  },

  "x86-arm-riscv": {
    id: "x86-arm-riscv", courseId: 5,
    title: "x86-64, AArch64, RISC-V y el mito RISC vs CISC",
    shortTitle: "Familias distintas, caricaturas fuera",
    duration: 112,
    objective: "comparar rasgos arquitectónicos de x86-64, AArch64 y RISC-V y explicar por qué RISC/CISC no predice directamente la microarquitectura moderna.",
    summary: ["x86-64 conserva una ISA histórica rica y codificación variable; CPU modernas pueden decodificarla en operaciones internas.", "AArch64 usa A64 con un conjunto de registros y formatos relativamente regulares y un estilo load/store.", "RISC-V define una base abierta y modular con extensiones; RISC/CISC describe tendencias de interfaz, no una frontera que determine automáticamente pipeline, OoO o rendimiento."],
    concept: "Comparar ISA exige hablar de contratos concretos: registros, codificación, memoria, extensiones y privilegio. 'RISC rápido, CISC lento' es una explicación de museo, no de ingeniería moderna.",
    diagram: ["x86-64 | AArch64 | RISC-V", "distintas ISA", "↓", "muchas microarquitecturas posibles"],
    rules: ["No uses RISC/CISC como sinónimo de simple/complejo físicamente.", "AArch64 no es el nombre de una CPU concreta; es un estado/arquitectura de ejecución dentro de la familia Arm.", "RISC-V es una ISA abierta y extensible; una implementación concreta puede elegir diferentes extensiones."],
    deep: { sections: [
      { title: "x86-64", body: "La familia x86-64 mantiene compatibilidad con un ecosistema histórico y ofrece instrucciones de longitud variable y numerosos modos. Implementaciones modernas separan frontend de decode y backend de ejecución, por lo que la complejidad de codificación no equivale directamente a una ALU 'más compleja'." },
      { title: "AArch64", body: "AArch64 dispone de 31 registros generales X0-X30 visibles como W0-W30 en sus mitades bajas, además de SP y otros registros arquitectónicos. En A64, el PC no se usa como un GPR ordinario en instrucciones de procesamiento de datos." },
      { title: "RISC-V", body: "RISC-V organiza la arquitectura en una base y extensiones. La modularidad permite perfiles distintos, desde sistemas embebidos hasta diseños vectoriales. Una etiqueta 'RV64' por sí sola todavía no enumera todas las extensiones del procesador." },
      { title: "RISC/CISC hoy", body: "Las categorías nacieron de compromisos históricos de ISA. Procesadores de ambas familias pueden usar pipeline profundo, predicción, cachés, ejecución fuera de orden y múltiples unidades. Para rendimiento real importan microarquitectura, memoria, compilador y carga de trabajo." }
    ], commonErrors: ["RISC=una instrucción por ciclo.", "CISC=sin pipeline.", "ARM=AArch64 en cualquier contexto.", "RISC-V=un microprocesador específico."], connections: ["Assembly del Bloque 006 comparará sintaxis y convenciones concretas.", "Microarquitectura del Bloque 007 mostrará técnicas compartidas entre familias."] },
    example: { problem: "Dos procesadores, uno x86-64 y otro AArch64, usan ambos ejecución fuera de orden. ¿Contradice esto RISC/CISC?", steps: [["ISA", "x86-64 y AArch64 tienen contratos distintos."], ["OoO", "Es una técnica microarquitectónica."], ["Separación", "La categoría de ISA no prohíbe compartir técnicas internas."], ["Conclusión", "No hay contradicción."]], answer: "No. OoO pertenece a la implementación y puede aparecer en ambas familias." },
    check: { question: "¿RISC-V nombra una única microarquitectura concreta?", options: [["No", true], ["Sí", false], ["Solo en 64 bits", false]], success: "Correcto. Es una ISA/familia de especificaciones implementable de muchas maneras.", failure: "RISC-V define arquitectura de instrucciones, no un único diseño físico de CPU." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿AArch64 es una ISA/estado arquitectónico o un modelo único de CPU?", answer: "isa", alternatives: ["estado arquitectonico"], hint: "Puede ser implementado por muchos núcleos." },
      { level: 2, label: "Normal", prompt: "¿RISC-V admite extensiones modulares? sí/no", answer: "si", hint: "Es una característica central de su diseño." },
      { level: 3, label: "Difícil", prompt: "¿Una CPU x86-64 moderna puede decodificar instrucciones a operaciones internas más simples? sí/no", answer: "si", hint: "La frontera ISA no tiene por qué coincidir con la granularidad interna." }
    ]
  }
});
