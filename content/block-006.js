/**
 * BLOQUE 006 — Assembly
 *
 * Objetivo editorial:
 * - pasar del contrato ISA a programas reales de bajo nivel;
 * - distinguir semántica de instrucción, sintaxis de ensamblador y ABI;
 * - comparar x86-64, AArch64 y RISC-V sin fingir que sus convenciones coinciden;
 * - preparar debugging, compiladores y sistemas operativos.
 */

window.LEARNING_PATHS[6] = {
  level: "Experto progresivo",
  estimatedHours: 24,
  description:
    "Programación assembly, control de flujo, pila, llamadas, ABI, syscalls y lectura de código generado en x86-64, AArch64 y RISC-V.",
  outcomes: [
    "Leer secuencias assembly y reconstruir sus efectos sobre registros, memoria y control de flujo.",
    "Distinguir semántica ISA, sintaxis del ensamblador, ABI y calling convention.",
    "Razonar sobre stack frames, alineación, caller-saved/callee-saved y paso de argumentos.",
    "Explicar cómo una syscall cruza la frontera user/kernel sin confundirla con una llamada ordinaria.",
    "Comparar patrones equivalentes en x86-64, AArch64 y RISC-V.",
    "Usar desensamblado y código generado por compiladores como herramientas de comprensión, no como jeroglíficos decorativos."
  ],
  modules: [
    { id: "m1-modelo", title: "Modelo de ejecución", description: "Registros, datos, aritmética, flags y memoria.", lessons: ["asm-modelo", "asm-datos-memoria", "asm-aritmetica-logica"] },
    { id: "m2-control", title: "Control de flujo", description: "Comparaciones, branches, loops y flujo estructurado.", lessons: ["asm-comparaciones-saltos", "asm-loops"] },
    { id: "m3-abi", title: "Pila, llamadas y ABI", description: "Stack frames, calling conventions, registros preservados y retorno.", lessons: ["asm-stack-frames", "asm-calls-abi"] },
    { id: "m4-sistema", title: "Frontera con el sistema", description: "Syscalls y diferencias entre ABI de funciones y ABI del kernel.", lessons: ["asm-syscalls"] },
    { id: "m5-familias", title: "Tres familias y lectura real", description: "x86-64, AArch64, RISC-V, debugging y código compilado.", lessons: ["asm-tres-isas", "asm-debug-desensamblado"] }
  ]
};

Object.assign(window.LESSONS, {
  "asm-modelo": {
    id: "asm-modelo", courseId: 6,
    title: "Assembly: modelo mental, registros y estado",
    shortTitle: "Assembly no es 'lenguaje máquina con palabras'",
    duration: 78,
    objective: "leer una instrucción assembly separando sintaxis, semántica ISA y cambios del estado arquitectónico.",
    summary: [
      "Assembly es una representación textual dependiente de una ISA y de una sintaxis concreta; no existe un único lenguaje assembly universal.",
      "Las instrucciones transforman estado arquitectónico: registros, memoria, flags o contador de programa según lo definido por la ISA.",
      "Pseudoinstrucciones y aliases pueden no corresponder uno-a-uno con una codificación de máquina."
    ],
    concept: "Para entender assembly, pregunta siempre: qué estado lee, qué estado escribe y cómo cambia el control. El mnemonic es una interfaz textual; la semántica real viene de la ISA.",
    diagram: ["texto assembly", "↓ assembler", "codificación máquina", "↓ CPU", "nuevo estado arquitectónico"],
    rules: [
      "No confundas mnemonic con opcode binario.",
      "No supongas que una línea de assembly equivale siempre a una sola instrucción máquina: puede ser pseudoinstrucción.",
      "Interpreta nombres de registros según la ISA y el modo de ejecución concretos."
    ],
    deep: { sections: [
      { title: "Tres capas", body: "La ISA define operaciones y estado. El lenguaje de ensamblador define una notación aceptada por una herramienta. El formato de objeto añade símbolos, relocations y secciones. Mezclar estas capas dificulta explicar por qué dos ensambladores pueden escribir la misma instrucción de forma diferente." },
      { title: "Estado arquitectónico", body: "Una instrucción puede leer registros, producir resultados, acceder a memoria o transferir control. Algunas ISA exponen flags; otras expresan comparaciones y branches de otra forma. La microarquitectura puede descomponer la instrucción internamente sin cambiar su efecto permitido." },
      { title: "Pseudoinstrucciones", body: "En RISC-V, por ejemplo, ciertas formas cómodas se expresan como pseudoinstrucciones que el assembler expande a instrucciones reales. La correspondencia texto↔bytes no debe asumirse sin consultar el assembler y la ISA." },
      { title: "Assembly como herramienta", body: "Su valor no es memorizar mnemonics sino hacer visible el contrato máquina-software: representación, llamadas, memoria, control y coste aproximado. Leer assembly bien es leer consecuencias, no recitar vocabulario." }
    ], commonErrors: ["Creer que assembly es portable entre ISA.", "Tratar todo alias como opcode propio.", "Inferir detalles microarquitectónicos solo desde el mnemonic."], connections: ["Bloque 005: ISA y datapath.", "Bloque 010: compilación, object files y linking.", "Bloque 011: debugging y desensamblado."] },
    example: { problem: "Un assembler acepta una pseudoinstrucción que no aparece como codificación independiente en la ISA. ¿Es una contradicción?", steps: [["Texto", "La herramienta acepta una notación cómoda."], ["Expansión", "Puede traducirla a una o varias instrucciones reales."], ["Contrato", "La CPU solo ve codificaciones válidas."], ["Conclusión", "La sintaxis del assembler puede ser más rica que el conjunto de opcodes."]], answer: "No. Una pseudoinstrucción pertenece a la capa de ensamblador y puede expandirse antes de llegar a máquina." },
    check: { question: "¿Qué define la semántica arquitectónica de una instrucción?", options: [["La especificación de la ISA", true], ["El color del editor", false], ["El predictor de saltos concreto", false]], success: "Correcto: la ISA define el efecto arquitectónico.", failure: "La sintaxis ayuda a escribirla, pero el contrato semántico pertenece a la ISA." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Assembly x86-64 y RISC-V son el mismo lenguaje? sí/no", answer: "no", hint: "Dependen de ISA distintas." },
      { level: 2, label: "Normal", prompt: "¿Una pseudoinstrucción debe tener necesariamente un opcode propio? sí/no", answer: "no", hint: "Puede expandirse." },
      { level: 3, label: "Difícil", prompt: "¿El mnemonic es siempre idéntico a la codificación binaria? sí/no", answer: "no", hint: "Texto y bytes pertenecen a capas distintas." }
    ]
  },

  "asm-datos-memoria": {
    id: "asm-datos-memoria", courseId: 6,
    title: "Movimiento de datos, loads, stores y direcciones",
    shortTitle: "Mover datos casi nunca significa 'moverlos'",
    duration: 82,
    objective: "razonar sobre transferencias registro-registro, memoria-registro y cálculo de direcciones efectivas.",
    summary: [
      "Una operación de movimiento suele copiar bits; la fuente normalmente no desaparece.",
      "AArch64 y RISC-V usan modelos load/store para aritmética general, mientras x86-64 permite muchos operandos de memoria según la instrucción.",
      "El tamaño del acceso y las reglas de extensión signed/unsigned forman parte de la semántica."
    ],
    concept: "Leer memoria requiere más que una dirección escrita en assembly: hay tamaño de acceso, cálculo de dirección efectiva y, posteriormente, traducción/protección de memoria según el sistema.",
    diagram: ["base + desplazamiento", "↓ dirección efectiva", "load/store", "↓", "registro ↔ memoria"],
    rules: ["Distingue dirección efectiva de física.", "Comprueba el ancho del load/store.", "No supongas extensión de signo: depende de la instrucción."],
    deep: { sections: [
      { title: "Copiar no es trasladar", body: "MOV y nombres similares describen una copia lógica. La fuente no queda vacía: los registros no son cajas que deban desocuparse. Esta metáfora evita numerosos errores al seguir dataflow." },
      { title: "Load/store", body: "En AArch64 y RISC-V, las operaciones aritméticas ordinarias trabajan principalmente con registros y las instrucciones de carga/almacenamiento conectan con memoria. x86-64 ofrece formas donde una instrucción puede leer un operando de memoria, aunque internamente la implementación sea más compleja." },
      { title: "Ancho y extensión", body: "Cargar 8 bits en un registro mayor obliga a definir qué ocurre con los bits altos. Zero-extension y sign-extension representan interpretaciones distintas. En C, esto se conecta con signedness y conversiones enteras." },
      { title: "Alineación", body: "Los requisitos y penalizaciones de accesos desalineados varían por ISA, implementación y región de memoria. Evita afirmar que todo acceso desalineado falla o que siempre cuesta lo mismo." }
    ], commonErrors: ["Pensar que MOV borra el origen.", "Olvidar el ancho del acceso.", "Confundir dirección virtual/efectiva con dirección física."], connections: ["Bloque 008: MMU y cachés.", "Bloque 009: punteros y layout de C."] },
    example: { problem: "Se carga un byte 0xF0 como entero signed de 8 bits y se extiende con signo a 64 bits. ¿Qué patrón alto se obtiene?", steps: [["Byte", "0xF0 tiene bit de signo 1."], ["Interpretación", "Como int8 representa −16."], ["Extensión", "Se replica el bit de signo."], ["Resultado", "El valor de 64 bits conserva −16."]], answer: "0xFFFFFFFFFFFFFFF0." },
    check: { question: "¿Una instrucción de movimiento suele borrar la fuente?", options: [["No", true], ["Sí, siempre", false], ["Solo si hay caché L1", false]], success: "Correcto. Normalmente copia bits.", failure: "'Move' es nombre histórico/sintáctico: normalmente el origen permanece." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Un store escribe de registro a memoria? sí/no", answer: "si", hint: "Store almacena." },
      { level: 2, label: "Normal", prompt: "0x80 como int8 vale:", answer: "-128", alternatives: ["−128"], hint: "Complemento a dos de 8 bits." },
      { level: 3, label: "Difícil", prompt: "¿Una dirección efectiva es necesariamente física? sí/no", answer: "no", hint: "Puede requerir traducción virtual." }
    ]
  },

  "asm-aritmetica-logica": {
    id: "asm-aritmetica-logica", courseId: 6,
    title: "Aritmética, lógica, flags y desplazamientos",
    shortTitle: "Los bits no saben si son signed",
    duration: 82,
    objective: "seguir operaciones aritméticas/lógicas y decidir cuándo carry, overflow o comparaciones signed cambian la interpretación.",
    summary: [
      "La misma suma binaria puede interpretarse como signed o unsigned; cambia cómo interpretamos flags y condiciones, no necesariamente el sumador físico.",
      "AND/OR/XOR y shifts son herramientas de representación, máscaras y aritmética por potencias de dos bajo condiciones concretas.",
      "No todas las ISA exponen un registro de flags tradicional: RISC-V, por ejemplo, suele expresar comparaciones mediante instrucciones y branches."
    ],
    concept: "Assembly obliga a hacer explícita la interpretación de bits. `0xFFFFFFFF` no lleva una etiqueta metafísica de −1: el contexto decide signedness y ancho.",
    diagram: ["bits", "├─ unsigned", "├─ signed two's complement", "└─ máscara/puntero/otros"],
    rules: ["Distingue carry de signed overflow.", "No generalices flags de x86 a todas las ISA.", "Con shifts, especifica lógico/arimético y ancho."],
    deep: { sections: [
      { title: "Unsigned y signed", body: "El patrón de bits puede ser idéntico. Una comparación signed y una unsigned aplican relaciones distintas. Por eso x86 tiene condiciones diferentes y otras ISA codifican variantes de comparación/branch." },
      { title: "Flags", body: "x86-64 actualiza flags con muchas operaciones; AArch64 tiene variantes que actualizan NZCV; RISC-V base no sigue el mismo modelo de flags globales. El patrón de control debe leerse por ISA." },
      { title: "Shifts", body: "Un shift lógico introduce ceros; uno aritmético a la derecha preserva conceptualmente el signo replicando el bit alto. Multiplicar/dividir por potencias de dos mediante shifts exige cuidado con overflow, truncado y números negativos." },
      { title: "XOR", body: "XOR sirve para alternar bits, combinar máscaras y construir ciertos idioms. No conviertas esos patrones en leyes universales de rendimiento: los compiladores y microarquitecturas modernas pueden tratarlos de forma especial o distinta." }
    ], commonErrors: ["Usar carry como overflow signed.", "Asumir que todas las ISA tienen EFLAGS.", "Usar shift como división signed sin analizar redondeo."], connections: ["Bloque 002: aritmética modular.", "Bloque 004: ALU.", "Bloque 007: latencias y dependencias."] },
    example: { problem: "En 8 bits, 0x7F + 0x01 = 0x80. ¿Qué ocurre signed y unsigned?", steps: [["Bits", "127 + 1 produce 0x80."], ["Unsigned", "128 es representable, sin overflow unsigned."], ["Signed", "+127 + +1 debería ser +128, no representable."], ["Conclusión", "Hay overflow signed aunque no sea un carry-out equivalente."]], answer: "Unsigned: 128 válido; signed: overflow." },
    check: { question: "¿Todos los ISA usan un registro global de flags como x86?", options: [["No", true], ["Sí", false], ["Solo los de 64 bits", false]], success: "Correcto.", failure: "RISC-V base es un contraejemplo importante." },
    practice: [
      { level: 1, label: "Básico", prompt: "En 8 bits, 255+1 módulo 256:", answer: "0", hint: "Aritmética modular." },
      { level: 2, label: "Normal", prompt: "¿0xFF puede representar −1 en int8? sí/no", answer: "si", hint: "Complemento a dos." },
      { level: 3, label: "Difícil", prompt: "¿Shift lógico y aritmético a la derecha son siempre equivalentes? sí/no", answer: "no", hint: "Observa números con bit alto 1." }
    ]
  },

  "asm-comparaciones-saltos": {
    id: "asm-comparaciones-saltos", courseId: 6,
    title: "Comparaciones, branches y saltos",
    shortTitle: "Control de flujo sin if mágico",
    duration: 84,
    objective: "traducir condiciones de alto nivel a comparaciones y transferencias de control respetando signedness y semántica de cada ISA.",
    summary: [
      "Un `if` de alto nivel suele convertirse en comparación más transferencia condicional, pero la forma exacta depende de ISA y optimización.",
      "Comparaciones signed y unsigned no son intercambiables para patrones con el bit de signo activo.",
      "Branches relativos suelen codificar desplazamientos respecto al PC, mientras saltos indirectos usan una dirección obtenida de registro/memoria."
    ],
    concept: "Control de flujo significa seleccionar el próximo PC. Las condiciones son una forma de decidir esa selección; no existe un `if` arquitectónico universal.",
    diagram: ["comparar", "↓ condición", "PC siguiente = secuencial | destino"],
    rules: ["Identifica signedness antes de interpretar la condición.", "Distingue branch directo de indirecto.", "No asumas que CMP guarda un resultado visible como una resta normal."],
    deep: { sections: [
      { title: "x86-64", body: "CMP se comporta conceptualmente como una resta para actualizar flags sin conservar el resultado. Saltos Jcc interpretan combinaciones de flags; las condiciones signed y unsigned usan criterios distintos." },
      { title: "AArch64", body: "CMP es un alias conveniente de una operación que actualiza flags sin conservar el resultado. Las condiciones posteriores consultan NZCV. La sintaxis concreta no debe confundirse con una instrucción conceptualmente aislada." },
      { title: "RISC-V", body: "El conjunto base evita un registro global de condition codes estilo x86: branches como BLT/BLTU expresan la comparación directamente y distinguen signed/unsigned." },
      { title: "Directo e indirecto", body: "Un salto directo obtiene el destino de la propia instrucción/PC; uno indirecto usa un registro o memoria. Los indirectos son esenciales para retornos, function pointers, dispatch y también relevantes para predicción y seguridad." }
    ], commonErrors: ["Usar condición signed para datos unsigned.", "Suponer que CMP escribe el valor restado en destino.", "Confundir salto indirecto con salto condicional."], connections: ["Bloque 007: branch prediction.", "Bloque 025: ROP y control-flow hijacking."] },
    example: { problem: "Compara 0xFFFFFFFFFFFFFFFF con 1 como uint64 y como int64.", steps: [["Unsigned", "Es 2^64−1, mayor que 1."], ["Signed", "En complemento a dos representa −1."], ["Comparación", "−1 es menor que 1."], ["Conclusión", "La misma pareja de bits exige condiciones distintas."]], answer: "Unsigned: primero mayor; signed: primero menor." },
    check: { question: "¿BLT y BLTU de RISC-V expresan la misma interpretación?", options: [["No: signed frente a unsigned", true], ["Sí, siempre", false], ["Solo cambia el assembler", false]], success: "Correcto.", failure: "El sufijo U cambia la interpretación unsigned." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Un branch indirecto obtiene normalmente el destino desde un registro/memoria? sí/no", answer: "si", hint: "Indirecto = destino calculado." },
      { level: 2, label: "Normal", prompt: "Como int8, ¿0xFF < 0x01? sí/no", answer: "si", hint: "0xFF es −1 signed." },
      { level: 3, label: "Difícil", prompt: "Como uint8, ¿0xFF < 0x01? sí/no", answer: "no", hint: "255 no es menor que 1." }
    ]
  },

  "asm-loops": {
    id: "asm-loops", courseId: 6,
    title: "Loops y transformación del control de flujo",
    shortTitle: "Un bucle es un grafo, no una palabra reservada",
    duration: 72,
    objective: "reconocer bucles en assembly aunque el compilador haya reordenado condiciones, eliminado contadores o vectorizado parcialmente.",
    summary: [
      "Un loop aparece como ciclos en el grafo de control: algún camino vuelve a una región anterior.",
      "`for`, `while` y `do-while` pueden producir formas assembly parecidas tras optimización.",
      "Compiladores aplican strength reduction, unrolling, vectorización y eliminación de variables, por lo que el fuente no se reconstruye uno-a-uno."
    ],
    concept: "Para leer un bucle, encuentra cabecera, condición de salida, cuerpo y back-edge. Los nombres de variables pueden haber desaparecido; el grafo sigue contando la historia.",
    diagram: ["header → condición → body", "  ↑                 ↓", "  └──── back-edge ──┘"],
    rules: ["Busca back-edges, no mnemonics llamados LOOP.", "No reconstruyas fuente exacto desde assembly optimizado.", "Comprueba si el contador es inducción o dato real."],
    deep: { sections: [
      { title: "Forma canónica", body: "Un bucle sencillo tiene una región que puede repetirse y una condición que decide continuar/salir. El compilador puede mover la comprobación al principio o final para reducir saltos o facilitar optimizaciones." },
      { title: "Variables de inducción", body: "Contadores y punteros pueden transformarse. En vez de `i++`, el código puede incrementar directamente un puntero por el tamaño del elemento y comparar contra una dirección final." },
      { title: "Unrolling", body: "Repetir el cuerpo varias veces reduce overhead de branch y puede exponer paralelismo, a cambio de tamaño de código. El resto del número de iteraciones puede requerir un epílogo." },
      { title: "Vectorización", body: "Un loop escalar puede convertirse en operaciones SIMD más un tail escalar. Leer solo una iteración aparente puede ocultar que cada instrucción procesa varios elementos." }
    ], commonErrors: ["Buscar siempre una instrucción `loop`.", "Suponer una correspondencia línea-a-línea con C.", "Confundir incremento de puntero con índice original."], connections: ["Bloque 074: rendimiento.", "Bloque 010: optimización de compiladores."] },
    example: { problem: "El fuente recorre `int32_t a[]`, pero assembly incrementa un puntero en 4 y lo compara con un puntero final. ¿Dónde quedó `i`?", steps: [["Fuente", "`i` sirve para calcular a[i]."], ["Transformación", "El compilador mantiene directamente la dirección actual."], ["Paso", "+4 avanza un elemento int32."], ["Salida", "Comparar con end reemplaza el índice explícito."]], answer: "El índice fue eliminado como variable necesaria; el puntero actúa como variable de inducción." },
    check: { question: "¿Un loop assembly necesita la instrucción x86 `LOOP`?", options: [["No", true], ["Sí", false], ["Solo en RISC-V", false]], success: "Correcto.", failure: "Branches y saltos ordinarios bastan para formar ciclos." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Un back-edge suele indicar posible iteración? sí/no", answer: "si", hint: "Vuelve a una región anterior." },
      { level: 2, label: "Normal", prompt: "Array int32: avanzar un elemento suele sumar cuántos bytes al puntero?", answer: "4", hint: "32 bits = 4 bytes." },
      { level: 3, label: "Difícil", prompt: "¿Unrolling suele reducir el número de branches por elemento? sí/no", answer: "si", hint: "Una rama controla varias copias del cuerpo." }
    ]
  },

  "asm-stack-frames": {
    id: "asm-stack-frames", courseId: 6,
    title: "Stack, stack pointer y stack frames",
    shortTitle: "La pila es una convención sobre memoria",
    duration: 88,
    objective: "seguir cambios del SP, localizar datos de un frame y explicar por qué alineación y lifetime importan.",
    summary: [
      "La stack es una región de memoria administrada mediante convenciones; no es una memoria física distinta de la RAM.",
      "Un stack frame puede contener direcciones de retorno, registros preservados, locales y espacio temporal, pero el layout depende de ABI y optimización.",
      "Un compilador puede omitir frame pointer o incluso evitar crear frame si no lo necesita."
    ],
    concept: "Piensa en el stack pointer como frontera móvil de una región cuyo significado lo impone el ABI. Dibujar el frame ayuda, pero no conviertas el dibujo en ley universal.",
    diagram: ["direcciones altas", "args/estado previo", "return / saves", "locals / temporales", "← SP", "direcciones bajas (convención común)"],
    rules: ["No asumas que todas las pilas crecen hacia abajo sin comprobar ABI.", "Respeta alineación requerida en puntos de llamada.", "No supongas que siempre existe frame pointer."],
    deep: { sections: [
      { title: "Crecimiento", body: "Muchas ABI modernas relevantes usan pilas descendentes, pero esa elección no es una propiedad universal de la idea 'stack'. El ABI concreta dirección, alineación y responsabilidades." },
      { title: "Frame pointer", body: "Un registro puede fijarse como referencia estable del frame mientras SP cambia, facilitando acceso/debugging. Con optimización puede omitirse y reutilizarse como registro general si unwind/debug metadata permiten reconstrucción." },
      { title: "Alineación", body: "Las ABI exigen alineación porque ciertas operaciones y convenciones dependen de ella. Romperla puede causar fallos, penalizaciones o corrupción en código llamado, aunque la función culpable parezca funcionar aislada." },
      { title: "Red zone y particularidades", body: "Algunas ABI proporcionan zonas utilizables bajo el SP en contextos concretos; otras no. No transfieras detalles de System V AMD64 a Windows x64 o AAPCS64 sin verificar." }
    ], commonErrors: ["Llamar a stack 'memoria rápida separada'.", "Asumir frame pointer obligatorio.", "Copiar layout de una ABI a otra."], connections: ["Bloque 009: stack/heap/lifetime.", "Bloque 025: stack smashing."] },
    example: { problem: "Una función reserva 48 bytes bajando SP y después necesita llamar a otra función. ¿Basta con que 'haya sitio'?", steps: [["Reserva", "48 bytes describen capacidad, no necesariamente alineación correcta."], ["ABI", "Hay que conocer alineación exigida en el punto de llamada."], ["Estado", "También deben preservarse registros que correspondan."], ["Conclusión", "El frame debe cumplir el contrato completo, no solo caber."]], answer: "No; además de espacio debe respetar alineación y reglas ABI." },
    check: { question: "¿La stack es necesariamente un chip de memoria distinto?", options: [["No", true], ["Sí", false], ["Solo en x86", false]], success: "Correcto.", failure: "Normalmente es una región del espacio de memoria con una convención de uso." },
    practice: [
      { level: 1, label: "Básico", prompt: "Pila descendente: reservar 32 bytes normalmente suma o resta 32 a SP?", answer: "resta", hint: "Desciende a direcciones menores." },
      { level: 2, label: "Normal", prompt: "¿Un compilador puede omitir frame pointer? sí/no", answer: "si", hint: "Puede no ser necesario." },
      { level: 3, label: "Difícil", prompt: "¿La alineación de stack forma parte del ABI? sí/no", answer: "si", hint: "Es un contrato entre funciones." }
    ]
  },

  "asm-calls-abi": {
    id: "asm-calls-abi", courseId: 6,
    title: "Calls, returns y calling conventions",
    shortTitle: "Llamar es más que saltar",
    duration: 96,
    objective: "explicar una llamada completa: paso de argumentos, dirección de retorno, registros preservados, stack y valor de retorno.",
    summary: [
      "Una calling convention define cómo cooperan funciones: argumentos, retornos, registros preservados, stack y alineación.",
      "La instrucción de llamada solo implementa parte del mecanismo; el resto es convenio ABI.",
      "Caller-saved y callee-saved reparten responsabilidades de preservación, no significan registros 'temporales' o 'permanentes' por naturaleza."
    ],
    concept: "Dos funciones escritas por herramientas distintas pueden interoperar porque obedecen el mismo ABI. Sin ese contrato, `call` solo consigue que la CPU llegue al sitio equivocado con mucha eficiencia.",
    diagram: ["caller prepara args", "↓ call/jump-link", "callee preserva lo requerido", "↓ calcula", "retorno + restore", "↓ caller continúa"],
    rules: ["Especifica ABI y plataforma, no solo ISA.", "Distingue caller-saved de callee-saved.", "No asumas que la dirección de retorno vive siempre en stack."],
    deep: { sections: [
      { title: "System V AMD64", body: "En Unix-like sobre AMD64, la ABI System V define registros para argumentos enteros/punteros y reglas de preservación/alineación. Windows x64 usa una convención diferente: decir 'x86-64 ABI' sin plataforma es insuficiente." },
      { title: "AAPCS64", body: "El Procedure Call Standard de Arm define el uso de registros para parámetros y resultados, además de registros preservados. AArch64 suele usar X30 como link register para el retorno, aunque funciones que llaman a otras deben gestionar su conservación según el caso." },
      { title: "RISC-V psABI", body: "La ABI de RISC-V asigna nombres convencionales como a0-a7, s0-s11 y t0-t6 a registros arquitectónicos. JAL puede escribir una dirección de retorno en un registro link; la pila sigue siendo necesaria para frames cuando el código lo requiere." },
      { title: "Tail calls", body: "Si una función termina devolviendo directamente el resultado de otra, el compilador puede transformar la llamada en un salto de cola y reutilizar el frame. Esto demuestra que una llamada de alto nivel no exige siempre un nuevo frame físico." }
    ], commonErrors: ["Pensar que CALL define toda la calling convention.", "Asumir los registros de System V en Windows.", "Creer que toda ISA guarda return address en stack."], connections: ["Bloque 010: ABI, linking y símbolos.", "Bloque 012: syscalls y privilegios."] },
    example: { problem: "Una función usa un registro callee-saved y quiere modificarlo. ¿Qué debe hacer conceptualmente?", steps: [["Contrato", "El caller espera recuperarlo intacto."], ["Entrada", "El callee salva el valor anterior."], ["Trabajo", "Puede usar/modificar el registro."], ["Salida", "Restaura el valor antes de retornar."]], answer: "Preservarlo según el ABI, normalmente guardándolo y restaurándolo si lo modifica." },
    check: { question: "¿La calling convention pertenece solo a la instrucción CALL?", options: [["No", true], ["Sí", false], ["Solo en RISC-V", false]], success: "Correcto.", failure: "Incluye argumentos, preservación, stack, retorno y más." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Caller-saved significa que el caller debe protegerlo si necesita conservarlo? sí/no", answer: "si", hint: "La responsabilidad está en quien llama." },
      { level: 2, label: "Normal", prompt: "¿Windows x64 y System V AMD64 usan exactamente la misma calling convention? sí/no", answer: "no", hint: "Misma ISA, ABI distinta." },
      { level: 3, label: "Difícil", prompt: "¿AArch64 puede mantener una dirección de retorno en un link register? sí/no", answer: "si", hint: "Piensa en X30/LR." }
    ]
  },

  "asm-syscalls": {
    id: "asm-syscalls", courseId: 6,
    title: "Syscalls y frontera user/kernel",
    shortTitle: "Pedir al kernel sin llamarlo como una biblioteca",
    duration: 92,
    objective: "distinguir wrapper de libc, ABI de syscall e instrucción de entrada al kernel en distintas arquitecturas.",
    summary: [
      "Una syscall es una interfaz controlada para solicitar servicios del kernel desde user space.",
      "Número de syscall, registros de argumentos y mecanismo de entrada dependen de arquitectura/ABI del sistema operativo.",
      "Una función de libc puede envolver una syscall, hacer trabajo adicional o incluso evitarla; función de biblioteca y syscall no son sinónimos."
    ],
    concept: "La llamada al sistema cambia de dominio de privilegio mediante un mecanismo arquitectónico controlado. No es un salto ordinario a una dirección del kernel accesible como función normal.",
    diagram: ["programa user", "↓ wrapper opcional", "ABI syscall", "↓ trap/syscall/ecall", "kernel", "↓ return-from-exception", "user"],
    rules: ["No memorices números de syscall sin plataforma.", "No confundas ABI de funciones con ABI de syscall.", "No asumas que toda API POSIX implica exactamente una syscall."],
    deep: { sections: [
      { title: "x86-64 Linux", body: "Linux dispone de una interfaz de syscall específica de arquitectura. En x86-64, la instrucción SYSCALL participa en la transición; los registros usados no coinciden simplemente con una llamada C ordinaria. Las tablas y ABI deben consultarse para la plataforma concreta." },
      { title: "AArch64", body: "En AArch64, software puede usar SVC para generar una excepción síncrona destinada al nivel privilegiado correspondiente. El sistema operativo define su ABI de syscall y cómo interpreta registros." },
      { title: "RISC-V", body: "ECALL provoca una environment call exception. La arquitectura define el mecanismo de excepción; el entorno de ejecución/SO define la convención concreta de servicios y números." },
      { title: "Wrappers", body: "Una función como `write()` de libc suele presentar una API C y encargarse de detalles ABI, errno u otras políticas. Programar la syscall a mano elimina parte de esa capa y hace explícita la dependencia de plataforma." }
    ], commonErrors: ["Usar registros de llamada C para syscalls sin verificar.", "Confundir POSIX con números de syscall.", "Creer que SYSCALL/SVC/ECALL por sí solas definen el servicio solicitado."], connections: ["Bloque 012: kernel y syscalls.", "Bloque 015: Linux interno."] },
    example: { problem: "Dos programas usan la misma función POSIX `write`, uno en x86-64 Linux y otro en AArch64 Linux. ¿Deben usar internamente el mismo número/registros/instrucción?", steps: [["API", "Ambos pueden exponer `write` a nivel C."], ["ABI", "La interfaz de syscall es específica de arquitectura."], ["Entrada", "El mecanismo de trap también difiere."], ["Conclusión", "La portabilidad está en la API, no en el assembly de syscall."]], answer: "No; la ABI de syscall es dependiente de arquitectura/plataforma." },
    check: { question: "¿Una syscall es idéntica a una llamada C ordinaria?", options: [["No", true], ["Sí", false], ["Solo si no hay caché", false]], success: "Correcto.", failure: "Cruza una frontera de privilegio con ABI específica." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Los números de syscall pueden variar por arquitectura? sí/no", answer: "si", hint: "Son parte de una ABI de plataforma." },
      { level: 2, label: "Normal", prompt: "¿Una función de libc puede envolver una syscall? sí/no", answer: "si", hint: "La biblioteca abstrae detalles." },
      { level: 3, label: "Difícil", prompt: "¿ECALL por sí sola codifica universalmente 'write'? sí/no", answer: "no", hint: "El entorno define qué servicio se solicita." }
    ]
  },

  "asm-tres-isas": {
    id: "asm-tres-isas", courseId: 6,
    title: "Assembly x86-64, AArch64 y RISC-V comparado",
    shortTitle: "Tres dialectos, tres contratos",
    duration: 108,
    objective: "comparar patrones equivalentes de datos, llamadas y control sin trasladar accidentalmente reglas de una ISA/ABI a otra.",
    summary: [
      "x86-64 tiene codificación variable y operandos de memoria ricos; AArch64 usa instrucciones A64 de ancho fijo de 32 bits; RISC-V base usa instrucciones de 32 bits con extensiones opcionales como compressed de 16 bits.",
      "Los tres pueden implementar llamadas, loops y acceso a memoria, pero con registros, codificaciones y convenciones distintas.",
      "La sintaxis x86 puede ser Intel o AT&T, una fuente adicional de diferencias incluso dentro de la misma ISA."
    ],
    concept: "Comparar assembly es comparar contratos y convenciones, no decidir cuál tiene los mnemonics más elegantes. El mismo algoritmo adopta formas diferentes porque las primitivas arquitectónicas también difieren.",
    diagram: ["algoritmo", "├─ x86-64", "├─ AArch64", "└─ RISC-V", "mismo objetivo ≠ mismos bytes/registros"],
    rules: ["Especifica sintaxis Intel/AT&T cuando muestres x86.", "No llames 'ARM assembly' a todo sin indicar AArch32/A64 cuando importe.", "RISC-V es modular: especifica extensiones relevantes."],
    deep: { sections: [
      { title: "x86-64", body: "La ISA conserva una larga historia de compatibilidad, tiene instrucciones de longitud variable y numerosos modos/formas. Intel y AT&T difieren en orden y notación de operandos, por lo que dos textos visualmente distintos pueden codificar la misma operación." },
      { title: "AArch64", body: "A64 usa instrucciones de 32 bits y 31 registros generales X0-X30 con vistas W0-W30, además de tratamiento especial de SP y PC. Su modelo load/store hace explícitos muchos accesos a memoria." },
      { title: "RISC-V", body: "RV32I/RV64I proporcionan una base pequeña y extensiones agregan capacidades. La extensión C añade codificaciones comprimidas de 16 bits, por lo que decir simplemente 'RISC-V siempre usa 32 bits por instrucción' sería incorrecto." },
      { title: "Equivalencia semántica", body: "Un retorno puede expresarse mediante mecanismos distintos; una comparación puede usar flags o branch integrado; cargar una constante grande puede requerir secuencias diferentes. Busca el efecto arquitectónico equivalente, no una traducción mnemonic-a-mnemonic." }
    ], commonErrors: ["Decir que RISC-V siempre usa instrucciones de 32 bits.", "Mezclar sintaxis Intel y AT&T.", "Usar registros ABI de una plataforma como si fueran parte universal de la ISA."], connections: ["Bloque 005: familias ISA.", "Bloque 007: implementación interna."] },
    example: { problem: "¿Es correcta la frase 'toda instrucción RISC-V mide 32 bits'?", steps: [["Base", "Las instrucciones base estándar usan codificación de 32 bits."], ["Extensiones", "Existe la extensión C de instrucciones comprimidas."], ["Codificación", "Introduce formas de 16 bits."], ["Conclusión", "La afirmación universal es falsa."]], answer: "No; RISC-V admite, entre otras posibilidades estandarizadas, instrucciones comprimidas de 16 bits con la extensión C." },
    check: { question: "¿Intel y AT&T pueden ser sintaxis distintas para x86?", options: [["Sí", true], ["No", false], ["Solo en ARM", false]], success: "Correcto.", failure: "La ISA puede representarse con más de una sintaxis textual." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿AArch64 y x86-64 usan la misma codificación de instrucciones? sí/no", answer: "no", hint: "ISA diferentes." },
      { level: 2, label: "Normal", prompt: "¿RISC-V C introduce instrucciones comprimidas de 16 bits? sí/no", answer: "si", hint: "C significa compressed." },
      { level: 3, label: "Difícil", prompt: "¿La sintaxis textual forma parte necesariamente del silicio? sí/no", answer: "no", hint: "El assembler convierte texto a codificación." }
    ]
  },

  "asm-debug-desensamblado": {
    id: "asm-debug-desensamblado", courseId: 6,
    title: "Debugging, desensamblado y código de compiladores",
    shortTitle: "Leer lo que la máquina recibió, no lo que recuerdas haber escrito",
    duration: 104,
    objective: "usar desensamblado, registros y stack para reconstruir ejecución y reconocer patrones generados por compiladores sin sobreinterpretarlos.",
    summary: [
      "Un disassembler transforma bytes en instrucciones según ISA/modo; un debugger añade estado dinámico: registros, memoria, breakpoints y stepping.",
      "Código optimizado puede eliminar variables, inlinear funciones, reordenar cálculos y usar instrucciones inesperadas manteniendo la semántica permitida.",
      "Símbolos y debug info facilitan el mapeo a fuente, pero un binario stripped todavía puede analizarse a nivel máquina."
    ],
    concept: "Desensamblar responde 'qué bytes se interpretan como instrucciones'; depurar responde además 'qué está ocurriendo ahora'. Ninguna herramienta reconstruye mágicamente el fuente original exacto.",
    diagram: ["binario bytes", "↓ disassembler", "instrucciones", "↓ debugger + estado", "ejecución observable"],
    rules: ["Confirma arquitectura y modo antes de desensamblar.", "No asumas una variable fuente por cada registro.", "Distingue dirección en archivo, virtual cargada y dirección runtime con ASLR."],
    deep: { sections: [
      { title: "Desensamblado", body: "La decodificación depende de saber dónde empieza el código, la ISA y el modo. Datos embebidos pueden parecer instrucciones si se interpretan desde una frontera incorrecta, especialmente en ISA de longitud variable." },
      { title: "Debug dinámico", body: "Breakpoints, single-step, watchpoints y examen de registros permiten comprobar hipótesis sobre ejecución. La siguiente instrucción visible no necesariamente revela todos los efectos microarquitectónicos, pero sí el estado arquitectónico que el debugger expone." },
      { title: "Optimización", body: "Inlined functions, constant folding, dead-code elimination y register allocation destruyen la correspondencia simple con el fuente. Leer assembly optimizado exige reconstruir dataflow y control-flow, no buscar nombres perdidos." },
      { title: "Código generado", body: "Comparar compilación -O0 y -O2/-O3 puede enseñar qué abstracciones desaparecen. Aun así, una secuencia concreta no es una promesa estable entre versiones del compilador: analiza el resultado, no lo conviertas en ABI informal." }
    ], commonErrors: ["Creer que disassembly recupera el fuente exacto.", "Interpretar datos como código sin validar secciones/flujo.", "Suponer que -O0 representa cómo 'realmente' debe ejecutar una CPU."], connections: ["Bloque 011 profundiza GDB/LLDB, DWARF y profilers.", "Bloque 026 profundiza ingeniería inversa."] },
    example: { problem: "Un compilador elimina por completo una variable local que solo contenía `2+3`. ¿Se perdió la semántica?", steps: [["Fuente", "La expresión produce siempre 5."], ["Optimización", "Constant folding calcula 5 en compilación."], ["Variable", "Si no necesita almacenamiento observable, puede desaparecer."], ["Resultado", "El comportamiento permitido se conserva sin esa variable runtime."]], answer: "No; el compilador puede materializar solo el resultado necesario." },
    check: { question: "¿Un desensamblador recupera necesariamente el código fuente original?", options: [["No", true], ["Sí", false], ["Solo si hay SIMD", false]], success: "Correcto.", failure: "Recupera una interpretación de instrucciones; nombres, estructura y decisiones de fuente pueden haberse perdido." },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Un debugger permite observar registros durante ejecución? sí/no", answer: "si", hint: "Ese es uno de sus usos básicos." },
      { level: 2, label: "Normal", prompt: "¿Optimización puede inlinear una función? sí/no", answer: "si", hint: "El call puede desaparecer." },
      { level: 3, label: "Difícil", prompt: "¿Bytes de datos pueden parecer instrucciones si se desensamblan desde el lugar equivocado? sí/no", answer: "si", hint: "El disassembler interpreta bytes según contexto." }
    ]
  }
});
