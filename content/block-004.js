/**
 * BLOQUE 004 — Lógica digital
 *
 * Objetivo editorial:
 * - pasar de proposiciones booleanas a circuitos físicos realizables;
 * - separar lógica combinacional de secuencial;
 * - introducir temporización y metastabilidad antes de hablar de CPU;
 * - tratar memoria como circuitos concretos, no como una caja etiquetada RAM.
 */

window.LEARNING_PATHS[4] = {
  level: "Experto progresivo",
  estimatedHours: 19,
  description:
    "Álgebra de Boole, circuitos combinacionales y secuenciales, temporización, sincronización y tecnologías básicas de memoria digital.",
  outcomes: [
    "Derivar, transformar y simplificar funciones booleanas mediante identidades, De Morgan y mapas de Karnaugh.",
    "Construir bloques combinacionales como multiplexores, decodificadores, comparadores, sumadores y una ALU elemental.",
    "Explicar cómo la realimentación permite almacenar estado y distinguir latches de flip-flops disparados por flanco.",
    "Diseñar registros, contadores y máquinas de estados separando lógica de próximo estado, memoria y lógica de salida.",
    "Razonar sobre periodo, frecuencia, setup, hold, clock-to-Q, caminos críticos y margen temporal.",
    "Explicar por qué la metastabilidad no puede eliminarse en cruces asíncronos y cómo los sincronizadores reducen su probabilidad de propagación.",
    "Comparar SRAM, DRAM, ROM, EEPROM y Flash por mecanismo de almacenamiento, volatilidad, granularidad y uso típico."
  ],
  modules: [
    {
      id: "m1-boolean",
      title: "Álgebra de Boole y simplificación",
      description: "Funciones booleanas, tablas de verdad, identidades, De Morgan, universalidad y Karnaugh.",
      lessons: ["boolean-fundamentos", "boolean-simplificacion", "karnaugh-universalidad"]
    },
    {
      id: "m2-combinacional",
      title: "Lógica combinacional",
      description: "Selección, codificación, comparación y aritmética binaria sin estado interno.",
      lessons: ["mux-decodificadores", "sumadores-restadores", "alu-combinacional"]
    },
    {
      id: "m3-secuencial",
      title: "Estado y lógica secuencial",
      description: "Realimentación, latches, flip-flops, registros, contadores y máquinas de estados.",
      lessons: ["latches-flipflops", "registros-contadores-fsm"]
    },
    {
      id: "m4-tiempo-memoria",
      title: "Temporización, sincronización y memoria",
      description: "Relojes, restricciones temporales, metastabilidad y tecnologías de memoria.",
      lessons: ["temporizacion-digital", "metastabilidad-sincronizacion", "memoria-sram-dram", "rom-eeprom-flash"]
    }
  ]
};

Object.assign(window.LESSONS, {
  "boolean-fundamentos": {
    id: "boolean-fundamentos",
    courseId: 4,
    title: "Álgebra de Boole, puertas y tablas de verdad",
    shortTitle: "Pensar con 0 y 1",
    duration: 62,
    objective:
      "modelar funciones lógicas con variables booleanas, tablas de verdad y operadores NOT, AND, OR, XOR y sus complementos.",
    summary: [
      "Una variable booleana toma dos valores abstractos; 0 y 1 son una representación conveniente, no una afirmación de que el circuito físico tenga voltajes exactamente 0 V y 1 V.",
      "AND, OR y NOT forman un sistema funcionalmente completo; NAND y NOR también pueden realizar cualquier función booleana.",
      "XOR vale 1 cuando sus entradas difieren; para más de dos entradas expresa paridad impar, no simplemente 'una de ellas es 1'."
    ],
    concept:
      "El álgebra de Boole describe relaciones lógicas independientes de la implementación física. Una tabla de verdad especifica exhaustivamente una función de n entradas mediante 2^n filas; una red de puertas es una realización de esa función.",
    diagram: ["entradas booleanas", "→ función f", "→ salida", "{0,1}"],
    rules: [
      "NOT invierte: ¬0=1 y ¬1=0.",
      "AND exige que todas las entradas relevantes sean 1; OR exige al menos una.",
      "XOR de dos entradas es 1 si son distintas; XNOR es su complemento."
    ],
    deep: {
      sections: [
        { title: "Álgebra abstracta frente a electrónica", body: "En lógica booleana los valores son exactos. En hardware, familias lógicas definen rangos de tensión reconocidos como LOW y HIGH, con una región intermedia que no debe utilizarse como estado estable. Esta separación permite diseñar funciones discretas sobre dispositivos analógicos." },
        { title: "Especificación completa", body: "Toda función booleana de n variables puede describirse por una tabla con 2^n combinaciones. También puede expresarse de forma canónica como suma de minterms o producto de maxterms. Estas formas son sistemáticas, aunque rara vez mínimas." },
        { title: "Paridad y XOR", body: "XOR es asociativo y conmutativo: a⊕b⊕c vale 1 si un número impar de entradas vale 1. Esta propiedad reaparece en sumadores, bits de paridad, CRC y criptografía. Decir que XOR significa 'exactamente una entrada a 1' solo es correcto para dos entradas." },
        { title: "Puertas como composición", body: "Una red combinacional implementa composición de funciones. Su valor lógico puede ser idéntico aunque cambien área, profundidad, consumo o peligros temporales; la equivalencia booleana no implica equivalencia física perfecta." }
      ],
      commonErrors: ["Confundir OR con XOR.", "Creer que 0 lógico significa siempre 0 V exactos.", "Olvidar que una tabla de n entradas tiene 2^n combinaciones.", "Extender 'XOR = exactamente uno' a tres o más entradas."],
      connections: ["XOR aparece en el bit de suma de un half adder.", "Las tablas de verdad alimentan síntesis lógica, pruebas y verificación formal."]
    },
    example: {
      problem: "Evalúa f=(A AND ¬B) OR C para A=1, B=0, C=0.",
      steps: [["Negar B", "¬B=1."], ["AND", "A∧¬B=1∧1=1."], ["OR", "1∨C=1∨0=1."], ["Resultado", "f=1."]],
      answer: "1."
    },
    check: {
      question: "Para A=1 y B=1, ¿cuánto vale A XOR B?",
      options: [["0", true], ["1", false], ["depende del reloj", false]],
      success: "Correcto. XOR detecta desigualdad entre dos entradas.",
      failure: "Con dos entradas iguales, XOR vale 0. El reloj todavía no ha sido invitado a esta fiesta."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "NOT 0:", answer: "1", hint: "NOT invierte el valor lógico." },
      { level: 2, label: "Normal", prompt: "Para A=1,B=0,C=1, calcula (A AND B) OR C.", answer: "1", hint: "Resuelve primero el AND." },
      { level: 3, label: "Difícil", prompt: "Paridad XOR de 1,1,1,0:", answer: "1", hint: "Hay tres unos: cantidad impar." }
    ]
  },

  "boolean-simplificacion": {
    id: "boolean-simplificacion",
    courseId: 4,
    title: "Identidades booleanas y leyes de De Morgan",
    shortTitle: "Simplificar sin cambiar la función",
    duration: 68,
    objective:
      "transformar expresiones booleanas mediante identidades, absorción, distributividad y leyes de De Morgan, demostrando equivalencia.",
    summary: [
      "Las identidades booleanas permiten cambiar la forma de una función sin cambiar su tabla de verdad.",
      "De Morgan: ¬(A∧B)=¬A∨¬B y ¬(A∨B)=¬A∧¬B.",
      "Simplificar puede reducir puertas y profundidad, pero la forma booleana con menos literales no siempre coincide con la implementación física óptima bajo todas las tecnologías."
    ],
    concept:
      "La simplificación lógica es una transformación semánticamente preservadora. Puede hacerse algebraicamente o mediante métodos visuales/algorítmicos; la comprobación definitiva de equivalencia es que ambas expresiones produzcan la misma salida para toda entrada.",
    diagram: ["expresión", "→ identidades", "→ equivalente", "→ implementación"],
    rules: [
      "Idempotencia: A+A=A y A·A=A.",
      "Complemento: A+¬A=1 y A·¬A=0.",
      "Absorción: A+A·B=A y A·(A+B)=A."
    ],
    deep: {
      sections: [
        { title: "Dos distributividades", body: "El álgebra booleana tiene A(B+C)=AB+AC y también A+BC=(A+B)(A+C). La segunda puede resultar extraña si se piensa demasiado en aritmética ordinaria; aquí + y · son OR y AND." },
        { title: "De Morgan como empuje de negaciones", body: "Al atravesar una negación global, AND y OR se intercambian y cada literal se complementa. Esta regla permite traducir redes a implementaciones NAND/NOR y entender lógica activa-baja." },
        { title: "Equivalencia y coste", body: "Dos expresiones equivalentes pueden tener distinta profundidad lógica, fan-in, carga capacitiva y susceptibilidad a hazards. En diseño real se optimiza contra una biblioteca y restricciones temporales, no solo contando símbolos en una pizarra." },
        { title: "Prueba por tabla de verdad", body: "Para pocas variables, comparar tablas de verdad es una prueba exhaustiva de equivalencia. Para diseños grandes se usan BDD, SAT, equivalence checking y otros métodos formales porque 2^n deja de ser simpático muy rápido." }
      ],
      commonErrors: ["Aplicar De Morgan cambiando AND por OR pero olvidar negar los literales.", "Usar reglas aritméticas que no existen en álgebra booleana.", "Confundir equivalencia lógica con mismo retardo.", "Cancelar términos como si fueran números reales."],
      connections: ["Las transformaciones NAND/NOR dependen directamente de De Morgan.", "Los compiladores de HDL realizan optimizaciones lógicas mucho más amplias que estas reglas manuales."]
    },
    example: {
      problem: "Simplifica F=A + A·B.",
      steps: [["Factorizar", "A + A·B = A(1+B)."], ["Dominación", "1+B=1."], ["Resultado", "A·1=A."], ["Comprobar", "La identidad se llama absorción."]],
      answer: "F=A."
    },
    check: {
      question: "¿Cuál es ¬(A OR B)?",
      options: [["¬A AND ¬B", true], ["¬A OR ¬B", false], ["A AND B", false]],
      success: "Correcto. De Morgan intercambia OR por AND y complementa ambos operandos.",
      failure: "Empuja la negación hacia dentro: cambia el operador y niega cada entrada."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Simplifica A AND 1. Responde A o 0/1.", answer: "a", hint: "1 es neutro para AND." },
      { level: 2, label: "Normal", prompt: "Simplifica A OR (A AND B).", answer: "a", hint: "Usa absorción." },
      { level: 3, label: "Difícil", prompt: "Simplifica NOT(NOT(A) AND NOT(B)) usando De Morgan.", answer: "a or b", alternatives: ["a∨b", "a + b"], hint: "Niega el AND y complementa cada literal." }
    ]
  },

  "karnaugh-universalidad": {
    id: "karnaugh-universalidad",
    courseId: 4,
    title: "Mapas de Karnaugh y universalidad de NAND/NOR",
    shortTitle: "Agrupar para simplificar",
    duration: 76,
    objective:
      "minimizar funciones pequeñas con mapas de Karnaugh y construir NOT, AND y OR utilizando únicamente NAND o únicamente NOR.",
    summary: [
      "Un mapa de Karnaugh reordena las combinaciones en código Gray para que celdas adyacentes difieran en una sola variable.",
      "Los grupos válidos tienen tamaño potencia de dos y pueden envolver los bordes; conviene formar grupos tan grandes como sea posible.",
      "NAND y NOR son puertas funcionalmente completas: por sí solas pueden construir una base lógica completa."
    ],
    concept:
      "Karnaugh convierte adyacencias algebraicas en geometría. Al agrupar minterms que solo difieren en variables que cambian, esas variables desaparecen del implicante resultante.",
    diagram: ["tabla verdad", "→ orden Gray", "→ grupos 1,2,4,8...", "→ implicantes"],
    rules: [
      "Las dimensiones del mapa siguen código Gray, no conteo binario ordinario.",
      "Los grupos pueden solaparse y envolver bordes; las diagonales no son adyacentes.",
      "NAND(A,A)=¬A; con esto y De Morgan se reconstruyen AND y OR."
    ],
    deep: {
      sections: [
        { title: "Por qué código Gray", body: "La adyacencia de una sola variable hace que dos minterms vecinos permitan factorizar X¬Y + XY = X. El mapa no es magia visual: codifica una aplicación repetida de identidades booleanas." },
        { title: "Don't care", body: "Estados imposibles o irrelevantes pueden marcarse como X y utilizarse como 0 o 1 según ayude a simplificar. El diseñador promete que el comportamiento allí no importa; si luego ese estado sí aparece, el universo no acepta reclamaciones." },
        { title: "NAND universal", body: "NOT A = NAND(A,A). AND se obtiene negando la salida NAND. OR se obtiene por De Morgan: A∨B=¬(¬A∧¬B), realizable con NAND de entradas previamente negadas." },
        { title: "Límites prácticos", body: "Karnaugh funciona muy bien con pocas variables. Para funciones mayores se usan Quine–McCluskey en contextos pequeños o, en herramientas reales, algoritmos de síntesis heurística y optimización tecnológica." }
      ],
      commonErrors: ["Ordenar 00,01,10,11 en vez de Gray 00,01,11,10.", "Agrupar 3 celdas.", "Olvidar que los bordes opuestos son adyacentes.", "Creer que universal significa que NAND es siempre la implementación física más eficiente."],
      connections: ["Los don't care reaparecen en decodificación de instrucciones y FSM.", "La universalidad explica por qué una biblioteca pequeña de celdas puede implementar funciones arbitrarias."]
    },
    example: {
      problem: "F(A,B)=Σm(1,3). Simplifica.",
      steps: [["Minterms", "01 y 11 tienen B=1."], ["Comparar", "A cambia entre 0 y 1."], ["Eliminar", "La variable A desaparece del implicante."], ["Resultado", "F=B."]],
      answer: "B."
    },
    check: {
      question: "¿Puede una NAND implementar NOT sin otras puertas?",
      options: [["Sí, uniendo sus dos entradas", true], ["No, necesita XOR", false], ["Solo si hay reloj", false]],
      success: "Correcto. NAND(A,A)=¬A.",
      failure: "Una NAND con ambas entradas unidas recibe A·A=A y luego lo niega."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Tamaño válido de grupo K-map: 3, 4 o 6?", answer: "4", hint: "Los grupos son potencias de dos." },
      { level: 2, label: "Normal", prompt: "NAND(1,1):", answer: "0", hint: "Primero AND, luego NOT." },
      { level: 3, label: "Difícil", prompt: "F(A,B)=Σm(0,2). Simplificación mínima:", answer: "not b", alternatives: ["¬b", "!b"], hint: "00 y 10 comparten B=0." }
    ]
  },

  "mux-decodificadores": {
    id: "mux-decodificadores",
    courseId: 4,
    title: "Multiplexores, decodificadores, codificadores y comparadores",
    shortTitle: "Seleccionar y traducir señales",
    duration: 70,
    objective:
      "diseñar bloques combinacionales de selección, decodificación, codificación y comparación y entender sus condiciones de validez.",
    summary: [
      "Un multiplexor selecciona una de varias entradas de datos según líneas de selección.",
      "Un decodificador n→2^n activa una salida asociada al código de entrada; un codificador realiza la relación inversa bajo supuestos sobre entradas activas.",
      "Un priority encoder resuelve explícitamente qué salida producir cuando varias entradas están activas."
    ],
    concept:
      "Estos bloques no almacenan historia: la salida ideal depende solo de las entradas actuales. Son ladrillos para datapaths, selección de registros, direccionamiento y control.",
    diagram: ["datos + select", "→ MUX", "→ una salida"],
    rules: [
      "Un MUX 2:1 implementa F=¬S·D0 + S·D1.",
      "Un decoder de n bits tiene hasta 2^n salidas mutuamente exclusivas si está habilitado y la lógica es one-hot.",
      "Un encoder ordinario requiere que como máximo una entrada esté activa; si no, hace falta prioridad o una convención adicional."
    ],
    deep: {
      sections: [
        { title: "MUX como función universal por expansión", body: "Aplicando expansión de Shannon F=¬S·F|S=0 + S·F|S=1, un multiplexor puede implementar funciones booleanas eligiendo cofactors como entradas de datos. Esta conexión es fundamental en síntesis y LUTs." },
        { title: "Decodificación one-hot", body: "Un decoder convierte un índice compacto en una línea seleccionada. Esto aparece en selección de registros, chip-select, direccionamiento y wordlines de memoria." },
        { title: "Priority encoder", body: "Si múltiples peticiones pueden estar activas, una prioridad define cuál gana y normalmente se añade una salida valid. Sin prioridad, la codificación puede ser ambigua." },
        { title: "Comparadores", body: "La igualdad de palabras puede implementarse con XNOR bit a bit seguido de AND. La comparación de magnitud examina los bits desde el más significativo hasta encontrar la primera diferencia." }
      ],
      commonErrors: ["Confundir MUX con DEMUX.", "Suponer que un encoder simple resuelve entradas simultáneas.", "Olvidar señales enable/valid.", "Comparar palabras binarias empezando por el bit menos significativo para magnitud."],
      connections: ["Un MUX es central en el datapath de una CPU.", "La decodificación one-hot aparece dentro de memorias y bancos de registros."]
    },
    example: {
      problem: "MUX 2:1 con D0=0, D1=1. ¿Qué función produce respecto a S?",
      steps: [["Ecuación", "F=¬S·0 + S·1."], ["Anular", "El primer término vale 0."], ["Identidad", "S·1=S."], ["Resultado", "F=S."]],
      answer: "F=S."
    },
    check: {
      question: "¿Cuántas líneas de selección hacen falta para un MUX 8:1 ideal?",
      options: [["3", true], ["8", false], ["4", false]],
      success: "Correcto. 2³=8.",
      failure: "Necesitas codificar ocho opciones: log₂(8)=3 bits de selección."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Salidas máximas de un decoder 3→?:", answer: "8", hint: "2³." },
      { level: 2, label: "Normal", prompt: "MUX 2:1: S=0,D0=7,D1=9. Salida:", answer: "7", hint: "S=0 selecciona D0." },
      { level: 3, label: "Difícil", prompt: "¿Qué operación bit a bit seguida de AND sirve para igualdad: XOR o XNOR?", answer: "xnor", hint: "Cada bit debe indicar 'iguales'." }
    ]
  },

  "sumadores-restadores": {
    id: "sumadores-restadores",
    courseId: 4,
    title: "Half adder, full adder, sumadores y restadores",
    shortTitle: "Aritmética hecha con puertas",
    duration: 82,
    objective:
      "derivar half/full adders, encadenarlos en sumadores y reutilizar complemento a dos para implementar resta.",
    summary: [
      "Half adder: S=A⊕B y C=A·B.",
      "Full adder incorpora carry-in: S=A⊕B⊕Cin y Cout=AB + Cin(A⊕B).",
      "A−B puede realizarse como A+(¬B)+1 en ancho fijo de complemento a dos."
    ],
    concept:
      "La suma binaria local produce un bit de suma y un acarreo. Encadenar esta relación crea un sumador de palabra; el coste temporal depende de cómo se propagan o predicen los acarreos.",
    diagram: ["A,B,Cin", "→ full adder", "→ S,Cout"],
    rules: [
      "1+1 produce suma 0 y carry 1.",
      "El carry de una posición tiene peso doble que el bit de suma de esa posición.",
      "Overflow signed y carry-out unsigned son conceptos distintos."
    ],
    deep: {
      sections: [
        { title: "Ripple-carry", body: "El diseño más directo encadena Cout de cada full adder hacia Cin del siguiente. Es pequeño y regular, pero el peor caso espera a que el carry atraviese muchas etapas." },
        { title: "Generate y propagate", body: "Para acelerar, se separa si una posición genera carry por sí misma o lo propaga. De ahí nacen carry-lookahead, prefix adders y familias como Kogge–Stone, con distintos compromisos de área, cableado y latencia." },
        { title: "Resta reutilizando suma", body: "En complemento a dos, −B=¬B+1 módulo 2^n. Un datapath puede invertir condicionalmente B con XOR y fijar Cin=1 para reutilizar el mismo hardware de suma." },
        { title: "Overflow signed", body: "En suma de complemento a dos, overflow ocurre cuando se suman operandos del mismo signo y el resultado tiene signo distinto. No se detecta simplemente mirando el carry final." }
      ],
      commonErrors: ["Confundir carry con overflow signed.", "Olvidar Cin en un full adder.", "Pensar que la resta necesita necesariamente un circuito completamente distinto.", "Ignorar la latencia del camino de carry."],
      connections: ["La ALU reutiliza estos bloques para ADD/SUB.", "Las técnicas de prefix computation reaparecen en otros circuitos paralelos."]
    },
    example: {
      problem: "Suma 1011₂ + 0110₂ en 4 bits unsigned.",
      steps: [["Valores", "1011=11 y 0110=6."], ["Suma", "11+6=17."], ["Ancho", "17=10001₂ requiere 5 bits."], ["Resultado", "Salida de 4 bits 0001 con carry-out=1."]],
      answer: "0001, carry=1."
    },
    check: {
      question: "¿Cuál es el bit de suma de un half adder?",
      options: [["A XOR B", true], ["A AND B", false], ["A OR B", false]],
      success: "Correcto. AND produce el acarreo, XOR el bit de suma.",
      failure: "Prueba la tabla de 1+1: la suma local es 0 y el carry es 1."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Half adder con A=1,B=1: carry:", answer: "1", hint: "C=A AND B." },
      { level: 2, label: "Normal", prompt: "Full adder con A=1,B=0,Cin=1: S:", answer: "0", hint: "1 XOR 0 XOR 1." },
      { level: 3, label: "Difícil", prompt: "En 4 bits signed, 7+3 produce overflow? sí/no", answer: "si", hint: "Dos positivos dan un patrón cuyo bit de signo es 1." }
    ]
  },

  "alu-combinacional": {
    id: "alu-combinacional",
    courseId: 4,
    title: "ALU y composición de datapaths combinacionales",
    shortTitle: "La calculadora de la CPU",
    duration: 72,
    objective:
      "componer operaciones aritméticas y lógicas en una ALU y derivar flags básicos sin atribuirles significado universal fuera de una ISA concreta.",
    summary: [
      "Una ALU selecciona entre operaciones como suma, resta, AND, OR, XOR, desplazamientos o comparación según señales de control.",
      "Flags como zero, carry, negative y overflow se derivan del resultado y de señales internas, pero su definición concreta pertenece a la arquitectura/ISA.",
      "Una ALU es combinacional si no almacena estado internamente; los registros que la rodean pertenecen al datapath secuencial."
    ],
    concept:
      "La ALU es una composición de circuitos ya conocidos y un selector. Su diseño muestra cómo una instrucción abstracta termina convertida en señales y rutas de datos concretas.",
    diagram: ["operandos", "→ bloques aritm./lógicos", "→ MUX", "→ resultado + flags"],
    rules: [
      "Zero suele indicar que todos los bits del resultado son 0.",
      "Negative en complemento a dos suele copiar el bit más significativo, pero la semántica depende del uso signed.",
      "Carry y overflow no son intercambiables."
    ],
    deep: {
      sections: [
        { title: "Compartir hardware", body: "La resta puede reutilizar el sumador; comparaciones signed/unsigned pueden derivarse de resta y flags con cuidado. Compartir recursos reduce área, aunque puede añadir muxes al camino crítico." },
        { title: "Flags no universales", body: "Distintas ISA conservan, actualizan o interpretan flags de formas diferentes. Es mejor entender su origen lógico y luego estudiar la especificación de cada arquitectura." },
        { title: "SLT y comparación", body: "Set-less-than requiere distinguir signed de unsigned. Para signed, usar sin más el bit de signo de A−B falla cuando hay overflow; el resultado correcto combina signo y overflow." },
        { title: "De ALU a datapath", body: "Una CPU añade registros, bypasses, unidades especializadas y control alrededor de la ALU. En procesadores modernos, 'la ALU' es una simplificación educativa útil, no una única caja que haga absolutamente todo." }
      ],
      commonErrors: ["Llamar carry al overflow.", "Suponer que toda CPU tiene los mismos flags.", "Meter registros dentro de una definición puramente combinacional de ALU.", "Comparar signed y unsigned con la misma regla."],
      connections: ["El próximo bloque conectará la ALU con registros, PC y unidad de control.", "El camino crítico de la ALU puede limitar la frecuencia de un diseño sencillo."]
    },
    example: {
      problem: "Una ALU de 8 bits calcula 0xFF + 0x01. ¿Resultado, carry y zero?",
      steps: [["Suma matemática", "255+1=256."], ["Módulo 256", "Resultado de 8 bits =0x00."], ["Carry", "Hay acarreo fuera del bit 7: C=1."], ["Zero", "El resultado es cero: Z=1."]],
      answer: "0x00, C=1, Z=1."
    },
    check: {
      question: "¿Qué flag detecta directamente que todos los bits del resultado son 0?",
      options: [["Zero", true], ["Carry", false], ["Overflow", false]],
      success: "Correcto.",
      failure: "Ese es precisamente el propósito típico del flag Z/Zero."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "0x0F AND 0x33 en hexadecimal sin 0x:", answer: "03", alternatives: ["3"], hint: "00001111 AND 00110011." },
      { level: 2, label: "Normal", prompt: "En 8 bits, 255+1 da flag zero= ?", answer: "1", hint: "El resultado modular es 0." },
      { level: 3, label: "Difícil", prompt: "En 8 bits signed, 127+1 tiene overflow? sí/no", answer: "si", hint: "Dos positivos producen patrón 10000000." }
    ]
  },

  "latches-flipflops": {
    id: "latches-flipflops",
    courseId: 4,
    title: "Realimentación, latches y flip-flops",
    shortTitle: "Cómo aparece el estado",
    duration: 90,
    objective:
      "explicar cómo la realimentación almacena estado y distinguir SR latch, D latch y flip-flops D/JK/T por sensibilidad y función.",
    summary: [
      "La realimentación permite que la salida dependa del estado anterior, creando lógica secuencial.",
      "Un latch es sensible a nivel durante una ventana de habilitación; un flip-flop típico es disparado por flanco.",
      "El SR latch tiene combinaciones de entrada que deben tratarse con cuidado; el D latch evita la orden simultánea set/reset al derivar entradas complementarias."
    ],
    concept:
      "La memoria mínima surge cuando una red lógica se realimenta de forma estable. A partir de ahí, el tiempo deja de ser un detalle: importa cuándo se permite que una entrada modifique el estado.",
    diagram: ["entrada", "→ elemento de estado", "↺ realimentación", "→ Q"],
    rules: [
      "Latch D habilitado: Q sigue a D; deshabilitado: conserva el último estado.",
      "Flip-flop D por flanco captura D alrededor del flanco activo y mantiene Q hasta el siguiente evento válido.",
      "JK y T pueden entenderse como variantes funcionales útiles para toggle/contadores, aunque en muchos diseños modernos la síntesis termina usando primitivas D."
    ],
    deep: {
      sections: [
        { title: "Biestabilidad", body: "Dos inversores realimentados tienen dos puntos estables ideales. La información se conserva porque cada nodo refuerza al otro. Las celdas SRAM explotan exactamente esta idea con transistores adicionales para lectura/escritura." },
        { title: "Latch frente a flip-flop", body: "Un latch transparente permite propagación mientras enable está activo; eso posibilita time borrowing pero exige análisis temporal cuidadoso. Un flip-flop concentra la captura alrededor de un flanco y simplifica el razonamiento sincrónico." },
        { title: "SR y estados prohibidos", body: "Según implementación NOR o NAND y polaridades, la combinación simultánea de set/reset puede ser inválida o conducir a un estado no deseado. No memorices una tabla sin anotar polaridades: es una fuente clásica de errores." },
        { title: "JK y T", body: "El JK resuelve conceptualmente el caso S=R=1 como toggle; un T flip-flop conmuta cuando T=1. Ambos son útiles para razonar sobre contadores, aunque herramientas actuales suelen mapear funciones a flip-flops D disponibles en la biblioteca." }
      ],
      commonErrors: ["Llamar flip-flop a cualquier latch.", "Ignorar polaridad activa-alta/activa-baja en SR.", "Creer que Q cambia instantáneamente en el flanco.", "Pensar que la realimentación es accidental en vez del mecanismo que conserva estado."],
      connections: ["Registros y contadores son colecciones de elementos de estado.", "SRAM utiliza biestabilidad; DRAM utiliza carga almacenada y refresh."]
    },
    example: {
      problem: "Un D flip-flop de flanco positivo tiene D=1 justo antes de un flanco válido y se cumplen tiempos. ¿Qué valor toma Q tras clock-to-Q?",
      steps: [["Evento", "Llega el flanco activo."], ["Captura", "El elemento muestrea D=1."], ["Retardo", "Q no cambia de forma idealmente instantánea; aparece tras clock-to-Q."], ["Estado", "Q=1 hasta una captura posterior o control asíncrono aplicable."]],
      answer: "Q=1."
    },
    check: {
      question: "¿Qué diferencia conceptual es correcta?",
      options: [["Un latch suele ser sensible a nivel y un flip-flop a flanco", true], ["Son exactamente sinónimos", false], ["El latch siempre necesita dos relojes", false]],
      success: "Correcto. Esa distinción temporal es fundamental.",
      failure: "En uso técnico preciso, latch y flip-flop no son sinónimos."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Un T flip-flop con T=1 hace hold o toggle?", answer: "toggle", hint: "T viene de toggle." },
      { level: 2, label: "Normal", prompt: "D latch habilitado con D=0: Q idealmente pasa a:", answer: "0", hint: "Mientras es transparente, Q sigue D." },
      { level: 3, label: "Difícil", prompt: "Un flip-flop D captura en flanco positivo. Si D cambia mucho después del flanco, ¿Q cambia inmediatamente? sí/no", answer: "no", hint: "La siguiente captura espera otro flanco válido." }
    ]
  },

  "registros-contadores-fsm": {
    id: "registros-contadores-fsm",
    courseId: 4,
    title: "Registros, contadores y máquinas de estados",
    shortTitle: "Diseñar comportamiento temporal",
    duration: 92,
    objective:
      "construir estructuras secuenciales a partir de flip-flops y diseñar máquinas de estados finitos con transiciones y salidas explícitas.",
    summary: [
      "Un registro almacena una palabra; un contador actualiza su estado siguiendo una secuencia definida.",
      "Una FSM separa estado presente, lógica de próximo estado y lógica de salida.",
      "En Moore la salida depende del estado; en Mealy puede depender además de entradas actuales, lo que cambia latencia y comportamiento temporal."
    ],
    concept:
      "El estado convierte una función instantánea en un sistema con historia. Diseñar una FSM significa elegir qué información del pasado debe conservarse para decidir correctamente el futuro.",
    diagram: ["estado Q + entradas", "→ lógica próximo estado", "→ D", "→ FF", "↺ Q"],
    rules: [
      "Un registro de n bits requiere n bits de estado, aunque la implementación exacta pueda añadir enable/reset.",
      "Un contador binario de n bits tiene 2^n estados posibles antes de repetir si recorre todos.",
      "Toda transición debe especificar estado origen, condición y estado destino; define también qué ocurre con entradas no previstas."
    ],
    deep: {
      sections: [
        { title: "Codificación de estados", body: "Binary encoding usa pocos flip-flops; one-hot usa un bit por estado y puede simplificar lógica a costa de más estado. FPGAs y ASICs pueden favorecer compromisos diferentes." },
        { title: "Moore frente a Mealy", body: "Moore suele producir salidas registrables más limpias porque dependen del estado; Mealy puede reaccionar en el mismo ciclo a una entrada, pero introduce caminos combinacionales desde entradas a salidas." },
        { title: "Contadores síncronos", body: "En un contador síncrono todos los flip-flops comparten reloj y la lógica decide qué bits cambian. Un ripple counter hace que etapas posteriores sean relojadas por salidas previas, introduciendo retardos acumulativos y múltiples transiciones intermedias." },
        { title: "Estados ilegales", body: "Una codificación puede dejar patrones no usados. Un diseño robusto decide cómo recuperarse de ellos; confiar en 'nunca ocurrirá' es una estrategia famosa por dejar de funcionar durante demos importantes." }
      ],
      commonErrors: ["Confundir número de estados con número de bits necesarios.", "No definir transición por defecto.", "Suponer que Mealy y Moore siempre tienen idéntica temporización de salida.", "Tratar un ripple counter como completamente síncrono."],
      connections: ["La unidad de control de una CPU puede modelarse como FSM o microprograma.", "Protocolos, controladores y periféricos digitales se expresan naturalmente como máquinas de estados."]
    },
    example: {
      problem: "¿Cuántos flip-flops como mínimo necesita una codificación binaria para 10 estados?",
      steps: [["Capacidad", "n flip-flops codifican 2^n patrones."], ["Comparar", "2³=8<10."], ["Siguiente", "2⁴=16≥10."], ["Resultado", "Se necesitan al menos 4 bits de estado."]],
      answer: "4 flip-flops."
    },
    check: {
      question: "Una FSM de Moore produce salidas que dependen directamente de...",
      options: [["el estado actual", true], ["solo del reloj analógico", false], ["ningún estado", false]],
      success: "Correcto. En la definición Moore, las salidas son función del estado.",
      failure: "Mealy añade dependencia directa de entradas; Moore se define por la dependencia del estado."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Estados de un contador binario de 5 bits que recorre todo el espacio:", answer: "32", hint: "2⁵." },
      { level: 2, label: "Normal", prompt: "Bits mínimos para codificar 17 estados:", answer: "5", hint: "2⁴=16 no alcanza; 2⁵ sí." },
      { level: 3, label: "Difícil", prompt: "¿Qué FSM puede tener salida combinacional dependiente directamente de la entrada actual: Moore o Mealy?", answer: "mealy", hint: "Moore depende del estado." }
    ]
  },

  "temporizacion-digital": {
    id: "temporizacion-digital",
    courseId: 4,
    title: "Relojes, periodo, setup, hold y caminos críticos",
    shortTitle: "La lógica también tarda",
    duration: 96,
    objective:
      "formular restricciones temporales de un camino registro-a-registro y distinguir periodo, frecuencia, clock-to-Q, retardo combinacional, setup y hold.",
    summary: [
      "La frecuencia f y el periodo T satisfacen f=1/T; una frecuencia mayor deja menos tiempo por ciclo.",
      "Setup exige que el dato llegue suficientemente antes del flanco de captura; hold exige que permanezca estable durante un intervalo después.",
      "El periodo mínimo de un camino síncrono depende de clock-to-Q máximo, retardo combinacional máximo, setup y efectos de skew/jitter según el modelo."
    ],
    concept:
      "Una función lógica correcta puede fallar si llega tarde. El diseño síncrono convierte retardos físicos en desigualdades temporales que deben cumplirse en todos los caminos relevantes y condiciones de operación.",
    diagram: ["FF origen", "tCQ → lógica combinacional", "tPD → FF destino", "setup/hold"],
    rules: [
      "Restricción de setup simplificada: Tclk ≥ tCQ,max + tcomb,max + tsetup, ajustada por skew/jitter e incertidumbres del flujo.",
      "Hold se comprueba con retardos mínimos, no máximos.",
      "Reducir el periodo no arregla una violación de hold; de hecho setup y hold son problemas distintos."
    ],
    deep: {
      sections: [
        { title: "Máximo para setup, mínimo para hold", body: "Setup pregunta si el dato más lento llega antes del siguiente flanco. Hold pregunta si el dato más rápido cambia demasiado pronto tras el flanco actual. Por eso una biblioteca caracteriza retardos máximos y mínimos bajo esquinas diferentes." },
        { title: "Skew y jitter", body: "Clock skew es diferencia espacial de llegada del reloj entre elementos; jitter describe variación temporal del evento de reloj. Herramientas de STA incorporan estos efectos mediante modelos e incertidumbres." },
        { title: "Pipelining", body: "Insertar registros divide un camino combinacional largo en etapas más cortas y puede permitir mayor frecuencia, a cambio de más latencia en ciclos, registros y complejidad de control." },
        { title: "Static Timing Analysis", body: "STA evita simular todas las secuencias lógicas: propaga llegadas y requerimientos a través de un grafo temporal. Es una pieza central del cierre de timing en ASIC/FPGA." }
      ],
      commonErrors: ["Usar retardos máximos para hold.", "Creer que la salida del flip-flop cambia exactamente en el instante del flanco.", "Confundir latencia en ciclos con periodo de reloj.", "Pensar que GHz significa que cualquier operación completa tarda exactamente 1/GHz."],
      connections: ["Pipeline y hazards aparecerán en microarquitectura.", "La integridad de señal del bloque anterior influye en relojes, jitter y márgenes temporales."]
    },
    example: {
      problem: "tCQ,max=0,12 ns, lógica=1,55 ns, setup=0,18 ns. Ignorando skew/jitter, ¿periodo mínimo y frecuencia máxima?",
      steps: [["Sumar", "Tmin=0,12+1,55+0,18=1,85 ns."], ["Invertir", "fmax=1/1,85 ns."], ["Calcular", "≈540,5 MHz."], ["Interpretar", "Es un límite idealizado del modelo dado."]],
      answer: "Tmin=1,85 ns; fmax≈540,5 MHz."
    },
    check: {
      question: "¿Qué retardo del camino combinacional importa principalmente para una comprobación de hold?",
      options: [["El mínimo", true], ["El máximo", false], ["Solo el promedio", false]],
      success: "Correcto. Hold teme al camino demasiado rápido.",
      failure: "Setup teme al camino lento; hold al demasiado rápido."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Periodo de un reloj de 100 MHz en ns:", answer: "10", hint: "1/100e6 s." },
      { level: 2, label: "Normal", prompt: "tCQ=0,2 ns, lógica=2,0 ns, setup=0,3 ns. Tmin en ns:", answer: "2.5", alternatives: ["2,5"], hint: "Suma los tres términos del modelo simplificado." },
      { level: 3, label: "Difícil", prompt: "¿Una violación de hold se arregla simplemente bajando la frecuencia? sí/no", answer: "no", hint: "Hold se refiere al mismo flanco de captura y a retardos mínimos." }
    ]
  },

  "metastabilidad-sincronizacion": {
    id: "metastabilidad-sincronizacion",
    courseId: 4,
    title: "Metastabilidad y sincronización",
    shortTitle: "Cuando el bit duda",
    duration: 94,
    objective:
      "explicar el origen de la metastabilidad en muestreo asíncrono, interpretar MTBF probabilísticamente y escoger estrategias básicas de clock-domain crossing.",
    summary: [
      "Si una entrada cambia dentro de la ventana crítica de captura, un elemento biestable puede entrar temporalmente en un estado metastable y tardar más de lo normal en resolver a 0 o 1.",
      "No existe un circuito digital práctico que garantice eliminar absolutamente la posibilidad de metastabilidad al muestrear eventos asíncronos; se reduce la probabilidad de que se propague.",
      "Dos flip-flops en serie son una técnica habitual para sincronizar una señal de un solo bit que cambia lentamente; buses, pulsos y datos multibit requieren protocolos o estructuras específicas."
    ],
    concept:
      "Cruzar dominios de reloj convierte un problema lógico en uno estadístico y temporal. El objetivo es dar tiempo de resolución suficiente y mantener coherencia de los datos transferidos.",
    diagram: ["señal asíncrona", "→ FF1 (puede metastable)", "→ tiempo de resolución", "→ FF2"],
    rules: [
      "Un sincronizador reduce riesgo, no lo convierte matemáticamente en cero.",
      "No sincronices cada bit de un bus de forma independiente esperando una palabra coherente.",
      "Pulsos más cortos que el periodo del dominio receptor pueden perderse si no se estiran, alternan un toggle o usan handshake/FIFO."
    ],
    deep: {
      sections: [
        { title: "Origen físico", body: "Un biestable tiene regiones de operación donde pequeñas diferencias internas deciden hacia qué estado estable cae. Si el muestreo ocurre demasiado cerca de una transición, el circuito puede permanecer más tiempo cerca de un equilibrio inestable antes de resolver." },
        { title: "MTBF", body: "Los modelos de metastabilidad suelen mostrar una mejora aproximadamente exponencial al aumentar el tiempo disponible para resolver y un empeoramiento al aumentar frecuencias de reloj/eventos. Los parámetros exactos dependen de la tecnología y del dispositivo." },
        { title: "Dos etapas", body: "La primera etapa absorbe el riesgo de metastabilidad; la segunda muestrea después de casi un ciclo de resolución. Esto es apropiado para controles de un bit bajo ciertas condiciones, no para transportar arbitrariamente palabras relacionadas." },
        { title: "CDC multibit", body: "Para contadores se usan códigos Gray en ciertos diseños; para flujo de datos, handshakes y FIFOs asíncronas proporcionan coherencia y control de capacidad. La estrategia debe corresponder a la semántica de la señal." }
      ],
      commonErrors: ["Decir que el segundo flip-flop elimina la metastabilidad con certeza absoluta.", "Sincronizar un bus bit a bit.", "Ignorar pulsos estrechos.", "Confundir metastabilidad con oscilación lógica determinista entre 0 y 1."],
      connections: ["Las FIFOs asíncronas aparecerán de nuevo en diseño hardware avanzado.", "Setup/hold explica la ventana temporal que desencadena el problema." ]
    },
    example: {
      problem: "Una señal de estado externa cambia sin relación con clk. ¿Por qué dos flip-flops D en serie suelen ser mejores que uno?",
      steps: [["Primer muestreo", "FF1 puede violar setup/hold y quedar metastable."], ["Resolución", "Se deja casi un periodo para que FF1 resuelva."], ["Segundo muestreo", "FF2 reduce la probabilidad de capturar una salida aún metastable."], ["Límite", "La probabilidad disminuye, no se vuelve exactamente cero."]],
      answer: "Porque añaden tiempo de resolución antes de usar la señal en el dominio receptor."
    },
    check: {
      question: "¿Un sincronizador de dos flip-flops garantiza probabilidad cero de metastabilidad propagada?",
      options: [["No", true], ["Sí", false], ["Solo a 1 MHz", false]],
      success: "Correcto. Ingeniería es reducir el riesgo a un nivel aceptable, no prometer magia estadística.",
      failure: "La probabilidad puede hacerse extremadamente pequeña, pero no se garantiza cero en el modelo físico real."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Setup/hold violation puede desencadenar metastabilidad? sí/no", answer: "si", hint: "Ese es el escenario clásico de captura insegura." },
      { level: 2, label: "Normal", prompt: "Para un bus multibit coherente, ¿es buena idea sincronizar cada bit con 2 FF independientes? sí/no", answer: "no", hint: "Los bits pueden llegar en ciclos distintos." },
      { level: 3, label: "Difícil", prompt: "¿Aumentar el tiempo de resolución suele mejorar o empeorar el MTBF?", answer: "mejorar", alternatives: ["mejora"], hint: "Más tiempo permite que la primera etapa resuelva antes del siguiente muestreo." }
    ]
  },

  "memoria-sram-dram": {
    id: "memoria-sram-dram",
    courseId: 4,
    title: "SRAM y DRAM",
    shortTitle: "Dos formas muy distintas de guardar un bit",
    duration: 92,
    objective:
      "comparar SRAM y DRAM desde la celda física hasta refresh, densidad, latencia y usos arquitectónicos.",
    summary: [
      "Una celda SRAM típica almacena estado en un biestable y mantiene el bit mientras haya alimentación, sin refresh periódico del dato.",
      "Una celda DRAM típica almacena carga en una capacitancia controlada por un transistor; la carga se fuga y exige refresh.",
      "SRAM suele ofrecer menor latencia y menor densidad; DRAM mayor densidad y menor coste por bit, razón de su uso respectivo en cachés y memoria principal."
    ],
    concept:
      "SRAM y DRAM son ambas memorias volátiles de acceso aleatorio, pero su mecanismo físico cambia radicalmente el diseño de matrices, lectura, refresco, área y rendimiento.",
    diagram: ["SRAM: biestable", "vs", "DRAM: carga capacitiva", "→ consecuencias de sistema"],
    rules: [
      "Volátil significa que el contenido no se conserva sin alimentación normal; no significa que cada tecnología pierda el dato por el mismo mecanismo.",
      "DRAM necesita refresh porque la carga se fuga con el tiempo.",
      "La lectura DRAM convencional implica sensado y restauración de la información de la fila; el controlador oculta gran parte de esta complejidad al software."
    ],
    deep: {
      sections: [
        { title: "SRAM 6T", body: "Una celda SRAM clásica usa dos inversores cruzados más transistores de acceso. Es robusta y rápida, pero el número de transistores por bit consume área, reduciendo densidad frente a DRAM." },
        { title: "DRAM 1T1C conceptual", body: "La representación clásica utiliza un transistor de acceso y una pequeña capacitancia. Leer requiere detectar una diferencia diminuta en una bitline mediante sense amplifiers y restaurar el estado." },
        { title: "Filas y locality", body: "DRAM se organiza en bancos, filas y columnas. Activar una fila lleva datos a un row buffer; accesos posteriores a la misma fila pueden ser más baratos que abrir otra, conectando memoria física con patrones de acceso del software." },
        { title: "Refresh y sistema", body: "El refresh consume tiempo y energía, y su planificación interactúa con temperatura, densidad y controladores. Por eso 'RAM tarda X ns' es una simplificación: la latencia depende del estado interno y la secuencia de comandos." }
      ],
      commonErrors: ["Decir que SRAM significa no volátil.", "Pensar que DRAM no puede conservar nada entre accesos normales.", "Reducir toda latencia DRAM a un único número constante.", "Confundir caché con tecnología: muchas cachés usan SRAM, pero 'caché' es un papel arquitectónico."],
      connections: ["La jerarquía de memoria del Bloque 008 desarrollará cachés, DRAM, canales y latencia.", "La celda SRAM conecta directamente con biestabilidad y realimentación."]
    },
    example: {
      problem: "¿Por qué no se construye normalmente toda la memoria principal de un PC con celdas SRAM equivalentes a las de caché?",
      steps: [["SRAM", "Usa más dispositivos/área por bit."], ["Densidad", "Menor densidad eleva coste y superficie para grandes capacidades."], ["DRAM", "Acepta refresh y mayor complejidad a cambio de mucha más densidad."], ["Arquitectura", "Se combinan tecnologías en una jerarquía con distintos costes y latencias."]],
      answer: "Principalmente por densidad/coste por bit, además de compromisos de energía y área."
    },
    check: {
      question: "¿Cuál necesita refresh periódico para conservar datos bajo operación normal?",
      options: [["DRAM", true], ["SRAM", false], ["Ambas por el mismo mecanismo", false]],
      success: "Correcto. DRAM almacena carga que debe restaurarse periódicamente.",
      failure: "La D de DRAM es dinámica precisamente porque la información requiere refresh."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "¿SRAM es volátil? sí/no", answer: "si", hint: "Sin alimentación normal pierde el estado." },
      { level: 2, label: "Normal", prompt: "¿Qué suele tener mayor densidad por área: SRAM o DRAM?", answer: "dram", hint: "La celda DRAM conceptual necesita menos dispositivos por bit." },
      { level: 3, label: "Difícil", prompt: "¿Una lectura DRAM convencional requiere restaurar el contenido de la celda? sí/no", answer: "si", hint: "El sensado perturba la pequeña carga almacenada." }
    ]
  },

  "rom-eeprom-flash": {
    id: "rom-eeprom-flash",
    courseId: 4,
    title: "ROM, EEPROM y Flash",
    shortTitle: "Memoria que sobrevive al apagado",
    duration: 84,
    objective:
      "distinguir ROM, EEPROM y Flash por programabilidad, mecanismo de almacenamiento y granularidad de borrado/escritura.",
    summary: [
      "ROM describe una familia de memorias de lectura predominante cuyo contenido puede fijarse en fabricación o programarse según la variante.",
      "EEPROM permite borrado/programación eléctrica con granularidad relativamente fina, mientras Flash reorganiza la tecnología para borrar por bloques y lograr mayor densidad.",
      "Flash NAND y NOR tienen organizaciones y perfiles de acceso distintos; 'Flash' no es sinónimo técnico de SSD."
    ],
    concept:
      "Las memorias no volátiles conservan información sin alimentación continua mediante estados físicos persistentes. La capacidad de reprogramarlas introduce límites de ciclos, latencias y granularidades que el controlador debe gestionar.",
    diagram: ["ROM", "→ PROM/EPROM/EEPROM", "→ Flash NOR/NAND", "→ almacenamiento"],
    rules: [
      "No toda ROM es inmutable para siempre; el nombre histórico agrupa variantes con distintos métodos de programación.",
      "Flash se borra en unidades mayores que un byte; escribir datos nuevos exige respetar esa granularidad y el estado previo de las celdas.",
      "NAND Flash necesita gestión de páginas/bloques, corrección de errores y desgaste para actuar como almacenamiento fiable de alto nivel."
    ],
    deep: {
      sections: [
        { title: "Carga atrapada", body: "EEPROM/Flash clásicas utilizan estructuras de puerta flotante o mecanismos relacionados para alterar de forma persistente el umbral de un transistor. Leer interpreta ese estado sin necesitar alimentación continua para conservarlo." },
        { title: "NOR frente a NAND", body: "NOR facilita acceso aleatorio y ejecución directa en ciertos sistemas; NAND prioriza densidad y acceso por páginas/bloques, dominando almacenamiento masivo. Son organizaciones distintas, no marcas comerciales." },
        { title: "Borrado antes de reescritura", body: "En NAND Flash, programar y borrar tienen granularidades diferentes: se programa por páginas y se borra por bloques. Esto obliga a capas de traducción, garbage collection y wear leveling en SSD y otros dispositivos." },
        { title: "Endurance y retención", body: "La programación/borrado desgasta físicamente las celdas. Controladores distribuyen escrituras, reservan capacidad y aplican ECC. Una memoria no volátil no es una piedra rúnica eterna; solo conserva el dato sin alimentación durante un intervalo especificado." }
      ],
      commonErrors: ["Decir que ROM significa siempre imposible de reprogramar.", "Llamar SSD a cualquier chip Flash.", "Suponer escritura byte a byte arbitraria en NAND Flash.", "Confundir retención no volátil con duración infinita."],
      connections: ["Bloque 008 profundizará en NAND, páginas, bloques, wear leveling y NVMe.", "Microcontroladores usan Flash para firmware y a menudo SRAM para datos temporales."]
    },
    example: {
      problem: "¿Por qué un SSD necesita una Flash Translation Layer en vez de sobrescribir cualquier byte físicamente como una RAM ideal?",
      steps: [["Granularidad", "NAND programa páginas y borra bloques mayores."], ["Desgaste", "Cada bloque soporta un número finito de ciclos P/E."], ["Remapeo", "El controlador escribe nuevas versiones en otras páginas y marca las antiguas inválidas."], ["Gestión", "FTL mantiene la correspondencia lógica-física y coordina garbage collection/wear leveling."]],
      answer: "Porque la geometría y restricciones de NAND exigen remapeo y gestión de bloques."
    },
    check: {
      question: "¿Qué operación de NAND Flash suele tener una granularidad mayor que la programación?",
      options: [["El borrado", true], ["La lectura", false], ["El XOR", false]],
      success: "Correcto. Se programan páginas y se borran bloques mayores.",
      failure: "La asimetría página/bloque es una de las razones de existir de la FTL."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Flash conserva datos sin alimentación? sí/no", answer: "si", hint: "Es memoria no volátil." },
      { level: 2, label: "Normal", prompt: "¿Qué Flash domina almacenamiento masivo: NAND o NOR?", answer: "nand", hint: "Prioriza densidad y acceso por páginas/bloques." },
      { level: 3, label: "Difícil", prompt: "¿Wear leveling intenta concentrar o repartir ciclos de borrado/escritura?", answer: "repartir", alternatives: ["distribuir"], hint: "Evita desgastar siempre los mismos bloques." }
    ]
  }
});
