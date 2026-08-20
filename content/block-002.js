/**
 * BLOQUE 002 — Representación y sistemas numéricos
 *
 * Este archivo amplía el registro global de lecciones sin mezclar contenido
 * académico con lógica de interfaz. Cada lección usa la misma estructura para
 * que revisar, probar y añadir contenido sea mecánico y predecible.
 */

window.LEARNING_PATHS[2] = {
  level: "Experto progresivo",
  estimatedHours: 13,
  description:
    "Cómo convertir cantidades, texto, imagen y audio en estructuras binarias; cómo razonar con enteros finitos y por qué el punto flotante exige pensar en aproximaciones, redondeo y error.",
  outcomes: [
    "Convertir entre bases y razonar con sistemas posicionales sin depender de recetas memorizadas.",
    "Interpretar enteros sin signo y complemento a dos como aritmética finita módulo 2^n.",
    "Usar desplazamientos, máscaras y operaciones bit a bit distinguiendo semántica matemática y representación.",
    "Descomponer IEEE 754 binary32/binary64, incluidos subnormales, infinitos, NaN y modos de redondeo.",
    "Analizar error numérico, absorción y cancelación catastrófica.",
    "Distinguir Unicode, puntos de código, UTF-8/UTF-16, píxeles, canales, muestreo, cuantización y serialización."
  ],
  modules: [
    {
      id: "m1-bases",
      title: "Bases y representación posicional",
      description: "La misma cantidad, alfabetos distintos y reglas generales de conversión.",
      lessons: ["bases-posicionales", "bytes-endianness"]
    },
    {
      id: "m2-enteros",
      title: "Enteros finitos y aritmética binaria",
      description: "Rangos, complemento a dos, overflow y operaciones a nivel de bits.",
      lessons: ["enteros-modulares", "complemento-dos", "bits-mascaras"]
    },
    {
      id: "m3-reales",
      title: "Números reales aproximados",
      description: "Punto fijo, IEEE 754 y análisis del error numérico.",
      lessons: ["punto-fijo", "ieee754", "error-numerico"]
    },
    {
      id: "m4-medios",
      title: "Texto, imagen, audio y formatos",
      description: "De estructuras abstractas a secuencias de bytes interoperables.",
      lessons: ["unicode-texto", "imagen-audio-serializacion"]
    }
  ]
};

Object.assign(window.LESSONS, {
  "bases-posicionales": {
    id: "bases-posicionales",
    courseId: 2,
    title: "Sistemas posicionales y conversión entre bases",
    shortTitle: "Base 2, 8, 10 y 16",
    duration: 48,
    objective:
      "interpretar cualquier numeral posicional como un polinomio en su base y convertir enteros y fracciones entre bases de forma razonada.",
    summary: [
      "En base b, un numeral d_k…d_0 representa Σ d_i b^i con 0 ≤ d_i < b.",
      "Octal y hexadecimal son abreviaturas cómodas de binario porque 8=2^3 y 16=2^4.",
      "Las fracciones que terminan en una base no tienen por qué terminar en otra: 0,1₁₀ es periódico en base 2."
    ],
    concept:
      "La base no cambia la cantidad; cambia la representación. Pensar en pesos posicionales evita aprender cuatro algoritmos distintos: todos son manifestaciones de la misma expansión en potencias de b.",
    diagram: ["dₖ…d₁d₀", "→", "Σ dᵢ·bⁱ", "→", "cantidad"],
    rules: [
      "Para enteros, dividir repetidamente por la base produce dígitos desde el menos significativo.",
      "Para fracciones, multiplicar repetidamente por la base produce dígitos desde el más significativo.",
      "Cada dígito hexadecimal equivale exactamente a 4 bits; cada dígito octal, a 3 bits."
    ],
    deep: {
      sections: [
        { title: "Un numeral es un polinomio", body: "101101₂ = 1·2⁵+0·2⁴+1·2³+1·2²+0·2+1 = 45. En hexadecimal, 2D₁₆ = 2·16+13 = 45. El valor es el mismo; solo cambia el alfabeto de dígitos y los pesos." },
        { title: "Por qué hexadecimal encaja tan bien", body: "Agrupar binario de cuatro en cuatro no aproxima nada: es exacto porque 16=2⁴. Así, 1110 1011₂ = EB₁₆. Esta propiedad explica por qué direcciones, máscaras, bytes y dumps de memoria suelen escribirse en hexadecimal." },
        { title: "Fracciones y periodicidad", body: "Una fracción racional tiene expansión terminante en base b solo cuando, tras simplificarla, los factores primos de su denominador dividen a b. Como 1/10 contiene factor 5 y 2 no, 0,1 decimal no puede representarse con un número finito de bits fraccionarios." }
      ],
      commonErrors: [
        "Leer 10₂ como diez en lugar de dos.",
        "Convertir hexadecimal dígito a dígito a decimal ignorando pesos posicionales.",
        "Suponer que todo decimal finito tiene representación binaria finita."
      ],
      connections: [
        "La periodicidad de fracciones explica parte del error de punto flotante.",
        "Hexadecimal reaparecerá en direcciones, opcodes, protocolos, colores y depuración."
      ]
    },
    example: {
      problem: "Convierte 0x2D a binario y decimal.",
      steps: [
        ["Separar dígitos", "2 y D; D representa 13."],
        ["A binario", "2→0010 y D→1101; por tanto 0x2D = 00101101₂."],
        ["A decimal", "2·16 + 13 = 45."],
        ["Comprobar", "00101101₂ = 32+8+4+1 = 45."]
      ],
      answer: "0x2D = 00101101₂ = 45₁₀."
    },
    check: {
      question: "¿Qué hexadecimal corresponde a 1111 0010₂?",
      options: [["F2", true], ["E2", false], ["152", false]],
      success: "Correcto: 1111→F y 0010→2.",
      failure: "Agrupa exactamente cuatro bits: 1111 es F y 0010 es 2."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "101010₂ en decimal:", answer: "42", hint: "32+8+2." },
      { level: 2, label: "Normal", prompt: "255₁₀ en hexadecimal, sin prefijo:", answer: "ff", hint: "255 = 15·16+15." },
      { level: 3, label: "Difícil", prompt: "¿Cuántos bits representa exactamente una secuencia de 7 dígitos hexadecimales?", answer: "28", hint: "Cada dígito hexadecimal representa 4 bits." }
    ]
  },

  "bytes-endianness": {
    id: "bytes-endianness",
    courseId: 2,
    title: "Bits, bytes, palabras y endianness",
    shortTitle: "Cómo ordenar bytes",
    duration: 40,
    objective:
      "distinguir bit, byte y palabra de máquina, y reconstruir correctamente valores multibyte almacenados en little-endian y big-endian.",
    summary: [
      "Un byte moderno es un octeto de 8 bits; una palabra es un tamaño natural de datos de una arquitectura y no es sinónimo universal de 16 o 32 bits.",
      "Endianness describe el orden de los bytes de un valor multibyte en memoria o en una serialización.",
      "El orden de bits dentro de la escritura de cada byte es una cuestión distinta del orden de bytes."
    ],
    concept:
      "El entero abstracto 0x12345678 puede ocupar cuatro bytes. En big-endian se almacena 12 34 56 78 desde la dirección menor; en little-endian, 78 56 34 12. El valor no cambia: cambia su disposición física o serializada.",
    diagram: ["0x12345678", "→ LE: 78 56 34 12", "|", "BE: 12 34 56 78"],
    rules: [
      "Endianness importa al reinterpretar bytes como enteros multibyte.",
      "Un protocolo o formato debe definir un orden o incluir información suficiente para interpretarlo.",
      "No deduzcas el tamaño de una 'word' solo por el nombre; depende de la arquitectura o especificación."
    ],
    deep: {
      sections: [
        { title: "Direcciones crecientes", body: "Cuando decimos little-endian hablamos normalmente de qué byte va en la dirección más baja. El byte menos significativo aparece primero. El dibujo mental correcto es una tabla de direcciones, no una cadena que mágicamente se da la vuelta." },
        { title: "Orden de bytes frente a orden de bits", body: "El byte 0x80 sigue representándose habitualmente como 10000000 al escribir sus bits. Cambiar endianness de un entero de cuatro bytes no invierte los ocho bits de cada byte; permuta bytes completos." },
        { title: "Interoperabilidad", body: "Leer un archivo o paquete con el endianness incorrecto transforma valores válidos en otros números. Por eso parsers robustos convierten explícitamente desde el orden definido por el formato hacia la representación nativa." }
      ],
      commonErrors: ["Invertir bits en vez de bytes.", "Creer que endianness afecta a una cadena de un solo byte.", "Asumir que 'palabra' tiene un tamaño fijo universal."],
      connections: ["Aparece en ISA, formatos binarios, redes, drivers y reverse engineering.", "Los dumps hexadecimales se vuelven mucho menos misteriosos después de esta lección."]
    },
    example: {
      problem: "Los bytes en direcciones consecutivas son 78 56 34 12. Si forman un entero little-endian de 32 bits, ¿qué valor hexadecimal representan?",
      steps: [["Localizar byte menos significativo", "En little-endian está primero: 0x78."], ["Reconstruir por significancia", "Los siguientes bytes son 0x56, 0x34 y 0x12."], ["Escribir el entero", "De más a menos significativo: 12 34 56 78."]],
      answer: "0x12345678."
    },
    check: {
      question: "¿Qué cambia al pasar un entero multibyte de big-endian a little-endian?",
      options: [["El orden de sus bytes", true], ["El significado matemático del entero", false], ["Todos los bits de cada byte se invierten", false]],
      success: "Exacto. Se reorganizan bytes; no se aplica NOT ni se invierten bits individualmente.",
      failure: "Endianness es, en este contexto, una convención sobre el orden de bytes."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Cuántos bits tiene un byte moderno?", answer: "8", hint: "Un octeto." },
      { level: 2, label: "Normal", prompt: "En big-endian, ¿qué byte de 0xA1B2 aparece primero: A1 o B2?", answer: "a1", hint: "Primero el más significativo." },
      { level: 3, label: "Difícil", prompt: "Bytes 34 12 interpretados como uint16 little-endian: escribe el valor hexadecimal sin 0x.", answer: "1234", hint: "34 es el byte menos significativo." }
    ]
  },

  "enteros-modulares": {
    id: "enteros-modulares",
    courseId: 2,
    title: "Enteros sin signo y aritmética módulo 2ⁿ",
    shortTitle: "Cuando 255 + 1 = 0",
    duration: 46,
    objective:
      "modelar un registro de n bits como un residuo módulo 2ⁿ y distinguir overflow de una operación matemática incorrecta.",
    summary: [
      "n bits contienen 2ⁿ patrones y, como entero sin signo, representan 0…2ⁿ−1.",
      "Si conservamos solo n bits, suma y resta corresponden naturalmente a aritmética módulo 2ⁿ.",
      "El acarreo de salida y el overflow con signo son conceptos diferentes."
    ],
    concept:
      "Un registro de n bits no puede guardar todos los enteros. Si una operación produce más de n bits y el hardware conserva solo los n inferiores, el resultado es el residuo módulo 2ⁿ. No es que las matemáticas hayan fallado: hemos cambiado de estructura matemática.",
    diagram: ["resultado entero", "→ mod 2ⁿ", "→", "patrón de n bits"],
    rules: [
      "Rango unsigned de n bits: 0…2ⁿ−1.",
      "En n bits, −x puede representarse como 2ⁿ−x módulo 2ⁿ.",
      "No uses el carry de unsigned como prueba automática de overflow con signo."
    ],
    deep: {
      sections: [
        { title: "Clases de congruencia", body: "En módulo 256, 257, 1 y −255 pertenecen a la misma clase porque difieren en múltiplos de 256. El patrón 00000001 puede verse como representante de esa clase; la interpretación concreta depende del tipo de dato." },
        { title: "Aritmética de máquina", body: "Una ALU de n bits puede realizar una suma completa y descartar el carry exterior. Esa operación coincide exactamente con sumar módulo 2ⁿ. Esta regularidad es una de las razones por las que complemento a dos encaja tan bien con el hardware." },
        { title: "Underflow no siempre significa lo mismo", body: "En enteros unsigned de ancho fijo, 0−1 produce el patrón máximo si se aplica aritmética modular. En punto flotante, 'underflow' tiene un significado distinto relacionado con resultados diminutos y rango de representación; no conviene mezclar ambos usos." }
      ],
      commonErrors: ["Pensar que 255+1=0 es una igualdad de enteros ordinarios.", "Confundir carry con overflow signed.", "Usar 'underflow' sin indicar el modelo numérico."],
      connections: ["Checksums, contadores, hashes y criptografía usan aritmética modular deliberadamente.", "Complemento a dos reutiliza esta estructura para representar negativos."]
    },
    example: {
      problem: "Suma 250 + 20 en un registro unsigned de 8 bits.",
      steps: [["Suma matemática", "250+20=270."], ["Módulo", "270 mod 256 = 14."], ["Interpretar", "El registro conserva 00001110₂."], ["Carry", "Hubo acarreo fuera del octavo bit, pero el patrón almacenado representa 14 unsigned."]],
      answer: "14, si el resultado se reduce módulo 256."
    },
    check: {
      question: "¿Cuál es el máximo unsigned representable con 12 bits?",
      options: [["4095", true], ["2047", false], ["4096", false]],
      success: "Correcto: 2¹²−1 = 4095.",
      failure: "Hay 2¹² patrones, empezando en 0; el máximo es 2¹²−1."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Máximo unsigned de 8 bits:", answer: "255", hint: "2⁸−1." },
      { level: 2, label: "Normal", prompt: "260 mod 256:", answer: "4", hint: "Resta un múltiplo de 256." },
      { level: 3, label: "Difícil", prompt: "0−3 módulo 256:", answer: "253", hint: "Busca el residuo entre 0 y 255 congruente con −3." }
    ]
  },

  "complemento-dos": {
    id: "complemento-dos",
    courseId: 2,
    title: "Enteros con signo y complemento a dos",
    shortTitle: "Negativos sin bit mágico",
    duration: 54,
    objective:
      "interpretar complemento a dos, hacer extensión de signo y detectar overflow signed mediante signos y bits de acarreo.",
    summary: [
      "En n bits, complemento a dos representa −2ⁿ⁻¹…2ⁿ⁻¹−1.",
      "El patrón de un negativo x coincide con 2ⁿ+x; por eso suma y resta reutilizan la aritmética binaria modular.",
      "Extender el signo replica el bit superior para conservar el valor al aumentar el ancho."
    ],
    concept:
      "Complemento a dos no almacena un signo separado. Divide los 2ⁿ patrones entre no negativos y negativos de forma compatible con la suma módulo 2ⁿ. El bit más significativo tiene peso −2ⁿ⁻¹ en la interpretación signed.",
    diagram: ["bₙ₋₁…b₀", "→", "−bₙ₋₁2ⁿ⁻¹ + Σ bᵢ2ⁱ"],
    rules: [
      "Rango signed n bits: −2ⁿ⁻¹…2ⁿ⁻¹−1; hay un negativo más que positivos estrictos.",
      "Negar un patrón: invertir bits y sumar 1, entendido como forma práctica de calcular 2ⁿ−x.",
      "Overflow signed en suma ocurre si sumas operandos del mismo signo y el resultado representado tiene signo opuesto."
    ],
    deep: {
      sections: [
        { title: "Peso negativo del MSB", body: "En 8 bits, 11111101₂ vale −128+64+32+16+8+4+1 = −3. Esta fórmula evita convertir siempre mediante 'invertir y sumar uno' y muestra directamente qué representa el patrón." },
        { title: "El mínimo es especial", body: "En 8 bits, −128 es 10000000. Su opuesto +128 no cabe en el rango signed de 8 bits. Por eso negar el mínimo produce el mismo patrón si solo conservas ocho bits; en lenguajes y máquinas concretos las reglas sobre ese overflow dependen del contexto." },
        { title: "Extensión de signo", body: "Pasar 11111101₂ (−3 en 8 bits) a 16 bits requiere 11111111 11111101. Añadir ceros produciría 253, no −3. Replicar el bit de signo preserva la suma ponderada." }
      ],
      commonErrors: ["Pensar que el MSB es solo un signo independiente como en signo-magnitud.", "Olvidar que +128 no cabe en int8.", "Extender negativos rellenando con ceros."],
      connections: ["La ISA decide qué instrucciones extienden con signo o con ceros.", "Los bugs de conversión signed/unsigned reaparecerán en C y seguridad binaria."]
    },
    example: {
      problem: "Interpreta 11110110₂ como entero signed de 8 bits.",
      steps: [["MSB", "Es 1, así que la interpretación en complemento a dos es negativa."], ["Método directo", "−128+64+32+16+4+2 = −10."], ["Comprobación", "Invertir: 00001001; +1: 00001010 = 10; por tanto era −10."]],
      answer: "−10."
    },
    check: {
      question: "¿Cuál es el rango de un entero signed de 8 bits en complemento a dos?",
      options: [["−128…127", true], ["−127…127", false], ["−128…128", false]],
      success: "Correcto. Los 256 patrones se reparten entre 128 negativos y 128 no negativos.",
      failure: "El rango es −2⁷…2⁷−1."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "11111111₂ como int8:", answer: "-1", alternatives: ["−1"], hint: "Todos los bits a 1 representan −1." },
      { level: 2, label: "Normal", prompt: "10000000₂ como int8:", answer: "-128", alternatives: ["−128"], hint: "Es el mínimo representable." },
      { level: 3, label: "Difícil", prompt: "01111111 + 00000001 produce qué valor matemático aunque no quepa en int8?", answer: "128", hint: "127+1." }
    ]
  },

  "bits-mascaras": {
    id: "bits-mascaras",
    courseId: 2,
    title: "Operaciones bit a bit, desplazamientos y máscaras",
    shortTitle: "AND, OR, XOR y shifts",
    duration: 50,
    objective:
      "construir y leer máscaras de bits, usar AND/OR/XOR y razonar sobre desplazamientos sin confundirlos con operaciones booleanas de alto nivel.",
    summary: [
      "AND selecciona o limpia bits; OR activa; XOR conmuta diferencias; NOT invierte dentro del ancho considerado.",
      "Una máscara hace explícito qué posiciones queremos observar o modificar.",
      "Los desplazamientos operan sobre patrones; su equivalencia con ×2 o ÷2 exige condiciones sobre rango, signo y semántica."
    ],
    concept:
      "Las operaciones bit a bit aplican una función independiente a cada posición. Son especialmente útiles cuando un entero se usa como contenedor compacto de flags, campos o subconjuntos.",
    diagram: ["valor", "AND/OR/XOR", "máscara", "→", "bits seleccionados"],
    rules: [
      "x & mask conserva solo posiciones donde mask tiene 1.",
      "x | mask fuerza a 1 las posiciones seleccionadas.",
      "x ^ mask conmuta las posiciones seleccionadas; aplicar la misma máscara XOR dos veces recupera x."
    ],
    deep: {
      sections: [
        { title: "Extraer un campo", body: "Para leer k bits desde la posición p, una técnica conceptual es desplazar p posiciones a la derecha y aplicar una máscara (1<<k)−1. La sintaxis exacta y el comportamiento con tipos signed dependen del lenguaje." },
        { title: "Potencias de dos", body: "Para un entero positivo x, la propiedad x&(x−1)=0 caracteriza potencias de dos porque una potencia de dos contiene un único bit a 1. Es un ejemplo elegante de cómo una identidad binaria refleja estructura aritmética." },
        { title: "Shifts y signo", body: "Desplazar a la derecha un patrón unsigned introduce ceros. Con enteros signed, algunos lenguajes o ISA distinguen desplazamiento lógico y aritmético. No conviertas una observación habitual de hardware en una ley universal del lenguaje fuente." }
      ],
      commonErrors: ["Confundir & con && o | con ||.", "Olvidar paréntesis y precedencia en expresiones de máscaras.", "Suponer que todo right shift signed rellena necesariamente con el bit de signo en cualquier lenguaje."],
      connections: ["Permisos, registros de hardware, formatos de instrucción, píxeles y protocolos usan campos de bits.", "XOR aparecerá en criptografía y códigos de error."]
    },
    example: {
      problem: "x=0b10110110. ¿Qué devuelve x & 0b00001111?",
      steps: [["Alinear", "10110110"], ["Máscara", "00001111"], ["AND posición a posición", "00000110"], ["Interpretar", "Se han conservado los cuatro bits inferiores: 6."]],
      answer: "0b00000110 = 6."
    },
    check: {
      question: "¿Qué operación usarías para activar ciertos flags sin alterar los demás?",
      options: [["OR con una máscara", true], ["AND con cero", false], ["División", false]],
      success: "Correcto. OR con 1 fuerza el bit y OR con 0 lo conserva.",
      failure: "Para poner bits seleccionados a 1 sin tocar el resto, OR es la herramienta natural."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "0b1010 AND 0b0110 en decimal:", answer: "2", hint: "0010₂." },
      { level: 2, label: "Normal", prompt: "0b1000 OR 0b0011 en decimal:", answer: "11", hint: "1011₂." },
      { level: 3, label: "Difícil", prompt: "0b1101 XOR 0b0101 en decimal:", answer: "8", hint: "XOR vale 1 donde los bits difieren." }
    ]
  },

  "punto-fijo": {
    id: "punto-fijo",
    courseId: 2,
    title: "Punto fijo y escalado",
    shortTitle: "Reales con una regla fija",
    duration: 40,
    objective:
      "representar cantidades fraccionarias mediante enteros escalados y analizar resolución, rango y overflow en punto fijo.",
    summary: [
      "En punto fijo, el patrón entero se interpreta con una escala constante, por ejemplo valor = entero / 2^f.",
      "Aumentar bits fraccionarios mejora resolución pero reduce rango para un ancho total fijo.",
      "El punto fijo ofrece comportamiento y coste predecibles, pero exige gestionar explícitamente escalas en multiplicaciones y divisiones."
    ],
    concept:
      "Un formato Q con f bits fraccionarios puede imaginarse como un entero cuyo punto binario está fijado. El hardware sigue sumando enteros; la semántica externa decide que una unidad del entero equivale a 2^-f unidades reales.",
    diagram: ["entero N", "×", "2⁻ᶠ", "→", "valor real representado"],
    rules: [
      "Resolución típica con f bits fraccionarios: 2^-f.",
      "Para sumar dos valores deben compartir escala compatible.",
      "Multiplicar dos valores escalados duplica el número de bits fraccionarios antes de reescalar."
    ],
    deep: {
      sections: [
        { title: "Cuantización uniforme", body: "Con escala 2^-f, solo representamos múltiplos de esa cantidad. Un real intermedio debe redondearse a una rejilla uniforme. Esta predictibilidad es útil en DSP, control, audio y hardware embebido." },
        { title: "Rango frente a precisión", body: "En un ancho total fijo no puedes conseguir rango infinito y resolución arbitraria a la vez. Dedicar más bits a la fracción deja menos patrones para la parte entera. Esta tensión reaparece, con otra geometría, en punto flotante." },
        { title: "Escalas como parte del tipo", body: "Dos patrones iguales con escalas distintas representan cantidades distintas. En sistemas serios, la escala debe considerarse metadato esencial, ya sea documentada, codificada en el tipo o controlada por una API." }
      ],
      commonErrors: ["Olvidar reescalar tras multiplicar.", "Llamar 'exacto' al punto fijo para cualquier decimal.", "Mezclar valores con escalas distintas como si fueran comparables directamente."],
      connections: ["DSP, microcontroladores, motores clásicos y formatos monetarios pueden usar escalados fijos.", "IEEE 754 cambia escala dinámicamente mediante un exponente."]
    },
    example: {
      problem: "Con 4 bits fraccionarios, ¿qué real representa el entero almacenado 26?",
      steps: [["Escala", "2^-4 = 1/16."], ["Aplicar", "26/16 = 1,625."], ["Interpretar", "Cada incremento del entero cambia el real en 0,0625."]],
      answer: "1,625."
    },
    check: {
      question: "Con 8 bits fraccionarios, ¿cuál es la resolución?",
      options: [["1/256", true], ["1/8", false], ["256", false]],
      success: "Sí: 2^-8 = 1/256.",
      failure: "f bits fraccionarios implican pasos de 2^-f."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Con f=2, el entero 7 representa:", answer: "1.75", alternatives: ["1,75"], hint: "7/4." },
      { level: 2, label: "Normal", prompt: "Con f=3, ¿qué entero almacena exactamente 2,5?", answer: "20", hint: "2,5·8." },
      { level: 3, label: "Difícil", prompt: "Multiplicas dos valores con f=8. Antes de reescalar, ¿cuántos bits fraccionarios tiene conceptualmente el producto?", answer: "16", hint: "Las escalas se multiplican: 2^-8·2^-8." }
    ]
  },

  "ieee754": {
    id: "ieee754",
    courseId: 2,
    title: "IEEE 754: punto flotante binario",
    shortTitle: "Signo, exponente y significando",
    duration: 70,
    objective:
      "descomponer binary32 y binary64, calcular valores normales y subnormales y distinguir cero, infinito y NaN.",
    summary: [
      "IEEE 754 define formatos y operaciones de punto flotante; binary32 usa 1 bit de signo, 8 de exponente y 23 de fracción, y binary64 usa 1+11+52.",
      "Los números normales tienen un 1 implícito en el significando binario; los subnormales usan 0 implícito y permiten gradual underflow.",
      "Un exponente todo a 1 codifica infinitos o NaN; exponente cero codifica ceros o subnormales."
    ],
    concept:
      "Punto flotante distribuye representaciones aproximadamente de forma logarítmica: la separación entre números representables crece con la magnitud. Eso da un rango enorme, pero no una precisión absoluta constante.",
    diagram: ["signo", "| exponente |", "fracción", "→", "(−1)^s × significando × 2^e"],
    rules: [
      "binary32: bias 127; normal = (−1)^s·(1.f)·2^(E−127).",
      "binary64: bias 1023 y 52 bits almacenados de fracción, equivalentes a 53 bits de precisión para normales.",
      "Subnormal binary32: (−1)^s·(0.f)·2^-126; así se evita un salto directo entre el normal mínimo y cero."
    ],
    deep: {
      sections: [
        { title: "El bit implícito", body: "Todo normal binario puede normalizarse como 1.xxxxx·2^e, así que almacenar ese 1 sería redundante. binary32 guarda 23 bits de fracción pero dispone de 24 bits de precisión significativa para números normales." },
        { title: "Subnormales y gradual underflow", body: "Cuando E=0 no se usa el 1 implícito. Esto llena parcialmente la región cercana a cero con espaciado constante y reduce la brusquedad del underflow. Se pierde precisión relativa progresivamente, pero se preservan valores menores que el normal mínimo." },
        { title: "Infinitos y NaN", body: "E todo a 1 y fracción cero representa ±∞. E todo a 1 y fracción no cero representa NaN. NaN no es 'un número enorme': representa resultados no numéricos o datos especiales y tiene reglas de comparación particulares." },
        { title: "Redondeo", body: "IEEE 754 especifica modos de redondeo; roundTiesToEven es el modo habitual por defecto para operaciones binarias. En un empate exacto elige el representable cuyo bit final significativo es par, reduciendo sesgo acumulado respecto a redondear siempre en la misma dirección." }
      ],
      commonErrors: ["Llamar mantisa al campo fracción como si fueran exactamente lo mismo; 'significando' es más preciso.", "Suponer que hay una distribución uniforme de floats sobre la recta real.", "Comparar NaN con == esperando que NaN sea igual a sí mismo."],
      connections: ["Compiladores, SIMD, GPU, ML y cálculo científico dependen de estas reglas.", "La siguiente lección explica por qué una representación estándar no elimina el análisis numérico."]
    },
    example: {
      problem: "Interpreta binary32 con s=0, E=10000000₂ (=128) y fracción 010000…0.",
      steps: [["Exponente real", "128−127 = 1."], ["Significando", "1.010₂ = 1 + 1/4 = 1,25."], ["Escalar", "1,25·2¹ = 2,5."], ["Signo", "s=0, por tanto positivo."]],
      answer: "2,5."
    },
    check: {
      question: "En binary32, E=255 y fracción distinta de cero representa:",
      options: [["NaN", true], ["Siempre +∞", false], ["Un subnormal", false]],
      success: "Correcto. Infinito requiere fracción cero.",
      failure: "Exponente todo a 1 separa infinitos (fracción 0) de NaN (fracción no 0)."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Cuántos bits ocupa binary32?", answer: "32", hint: "1+8+23." },
      { level: 2, label: "Normal", prompt: "Bias del exponente de binary64:", answer: "1023", hint: "Tiene 11 bits de exponente." },
      { level: 3, label: "Difícil", prompt: "Bits de precisión significativa de un binary32 normal, contando el 1 implícito:", answer: "24", hint: "23 almacenados + 1 implícito." }
    ]
  },

  "error-numerico": {
    id: "error-numerico",
    courseId: 2,
    title: "Redondeo, precisión y cancelación catastrófica",
    shortTitle: "El ordenador no te debe números reales",
    duration: 64,
    objective:
      "analizar error absoluto/relativo, explicar por qué 0,1 no es exacto en binario y reconocer operaciones numéricamente inestables.",
    summary: [
      "La mayoría de los reales no son representables exactamente en un formato finito.",
      "La separación entre floats adyacentes depende de la magnitud; precisión y rango son conceptos distintos.",
      "Restar números cercanos puede cancelar dígitos significativos y amplificar error relativo."
    ],
    concept:
      "El punto flotante ejecuta aritmética sobre un conjunto finito de números representables con redondeos intermedios. Un algoritmo correcto sobre ℝ puede ser una mala implementación numérica si amplifica esos errores.",
    diagram: ["operación real", "→ redondeo", "→ operación", "→ redondeo", "→ error acumulado"],
    rules: [
      "No compares floats generales con igualdad exacta cuando el problema admite error de redondeo; define una tolerancia coherente con la escala y el dominio.",
      "Error absoluto = |x̂−x|; error relativo = |x̂−x|/|x| cuando x≠0.",
      "Reformular una expresión puede mejorar estabilidad sin cambiar su valor algebraico exacto."
    ],
    deep: {
      sections: [
        { title: "0,1 en binario", body: "1/10 tiene expansión binaria infinita periódica porque su denominador simplificado contiene factor 5. Un binary64 guarda el representable cercano, no 1/10 exacto. La sorpresa no debería ser que 0,1 sea aproximado; lo sorprendente sería que un conjunto finito contuviera todos los reales." },
        { title: "ULP y escala", body: "Dentro de un intervalo de exponentes, los floats normales están igualmente espaciados; al cruzar una potencia de dos el espaciado cambia. Una ulp (unit in the last place) expresa esa separación local y ayuda a razonar sobre precisión en términos del formato." },
        { title: "Cancelación", body: "Si a y b son números grandes y cercanos, a−b puede eliminar los bits de mayor peso que ambos compartían. Los errores pequeños presentes en a y b pasan entonces a dominar el resultado. Esto es cancelación catastrófica cuando destruye gran parte de la información significativa útil." },
        { title: "Ejemplo de estabilidad", body: "Para x pequeño, evaluar sqrt(1+x)−1 directamente puede sufrir cancelación. Racionalizar produce x/(sqrt(1+x)+1), algebraicamente equivalente pero normalmente más estable cerca de x=0." }
      ],
      commonErrors: ["Culpar a IEEE 754 de cualquier bug numérico sin analizar el algoritmo.", "Usar epsilon fijo universal para todas las magnitudes.", "Pensar que más rango implica automáticamente más dígitos significativos."],
      connections: ["Cálculo numérico, simulación física, gráficos, estadística y deep learning viven de gestionar estas aproximaciones.", "FMA, algoritmos compensados y precisión mixta aparecerán en bloques posteriores."]
    },
    example: {
      problem: "¿Por qué sqrt(1+x)−1 puede ser mala fórmula para x muy pequeño y qué forma equivalente ayuda?",
      steps: [["Observar", "sqrt(1+x) está muy cerca de 1."], ["Restar", "La resta cancela muchos dígitos coincidentes."], ["Racionalizar", "Multiplica numerador y denominador por sqrt(1+x)+1."], ["Resultado", "sqrt(1+x)−1 = x/(sqrt(1+x)+1), que evita la resta de cercanos."]],
      answer: "La forma racionalizada suele ser más estable para x pequeño."
    },
    check: {
      question: "¿Qué describe mejor la cancelación catastrófica?",
      options: [["Pérdida de precisión al restar cantidades cercanas ya aproximadas", true], ["Cualquier overflow", false], ["Que NaN se convierta en cero", false]],
      success: "Exacto. El problema está en perder cifras significativas útiles por sustracción.",
      failure: "Piensa en dos números casi iguales: su diferencia conserva justo la parte donde más pesan sus errores previos."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Es 0,1 decimal representable exactamente con una fracción binaria finita? sí/no", answer: "no", hint: "El denominador 10 contiene factor 5." },
      { level: 2, label: "Normal", prompt: "Si x=100 y una aproximación da 99, el error absoluto es:", answer: "1", hint: "|99−100|." },
      { level: 3, label: "Difícil", prompt: "Para x=100 y x̂=99, error relativo en porcentaje:", answer: "1", alternatives: ["1%"], hint: "1/100 = 0,01 = 1%." }
    ]
  },

  "unicode-texto": {
    id: "unicode-texto",
    courseId: 2,
    title: "ASCII, Unicode, UTF-8 y UTF-16",
    shortTitle: "Un carácter no es un byte",
    duration: 62,
    objective:
      "distinguir carácter abstracto, punto de código, valor escalar, unidad de código y grafema, y razonar sobre UTF-8 y UTF-16 sin asumir ancho fijo por carácter.",
    summary: [
      "ASCII histórico define 128 posiciones; Unicode define un repertorio mucho mayor y asigna puntos de código.",
      "UTF-8 codifica cada valor escalar Unicode en 1–4 bytes; UTF-16 usa una o dos unidades de código de 16 bits.",
      "Un carácter visible para el usuario puede contener varios puntos de código; contar bytes o code units no equivale a contar grafemas."
    ],
    concept:
      "Unicode separa qué identidad abstracta tiene un elemento de texto de cómo se codifica en memoria o bytes. U+1F600 es un punto de código; su representación UTF-8 son cuatro bytes y su representación UTF-16 usa un par de sustitutos.",
    diagram: ["carácter abstracto", "→ punto de código", "→ UTF-8/UTF-16", "→ bytes/code units"],
    rules: [
      "Los valores escalares Unicode excluyen U+D800…U+DFFF, reservados para surrogate code units de UTF-16.",
      "UTF-8 válido usa la forma más corta permitida y no codifica surrogates como valores independientes.",
      "Normalización y segmentación de grafemas son problemas distintos de la codificación UTF."
    ],
    deep: {
      sections: [
        { title: "ASCII y compatibilidad", body: "Los 128 valores ASCII encajan en UTF-8 como bytes 00–7F con el mismo valor. Esa compatibilidad es una razón práctica importante del éxito de UTF-8, pero Unicode no es simplemente 'ASCII grande'." },
        { title: "UTF-8", body: "UTF-8 usa unidades de código de 8 bits y asigna cada valor escalar a una secuencia de uno a cuatro bytes. Los patrones iniciales permiten reconocer longitud y bytes de continuación; secuencias sobrelargas y codificaciones de surrogates son inválidas." },
        { title: "UTF-16", body: "Los valores escalares del BMP fuera del rango surrogate usan una unidad de 16 bits. Los valores U+10000…U+10FFFF se transforman en un par high-surrogate + low-surrogate. Por tanto UTF-16 tampoco ofrece un carácter visible por unidad fija." },
        { title: "Grafemas", body: "Una 'é' puede aparecer como U+00E9 o como U+0065 seguido de U+0301. Pueden verse igual pero ser secuencias de puntos de código diferentes. Comparación, búsqueda y longitud de texto requieren decidir qué nivel semántico necesitas." }
      ],
      commonErrors: ["Decir que UTF-8 usa 8 bits por carácter.", "Confundir punto de código con byte.", "Asumir que string.length en cualquier lenguaje cuenta caracteres visibles."],
      connections: ["Seguridad web, nombres de archivos, protocolos, bases de datos e internacionalización dependen de estas distinciones.", "La serialización debe especificar codificación si transporta texto como bytes."]
    },
    example: {
      problem: "¿Por qué U+20AC (€) no ocupa un byte en UTF-8 aunque sea un solo punto de código?",
      steps: [["Identidad", "€ tiene punto de código U+20AC."], ["Rango", "Está fuera de U+0000…U+007F, el rango de un byte ASCII-compatible."], ["UTF-8", "U+20AC se codifica como E2 82 AC."], ["Conclusión", "Un punto de código puede ocupar varios bytes en una codificación variable."]],
      answer: "En UTF-8, € ocupa 3 bytes: E2 82 AC."
    },
    check: {
      question: "¿Cuántos bytes puede ocupar un valor escalar Unicode en UTF-8 moderno?",
      options: [["De 1 a 4", true], ["Siempre 1", false], ["De 1 a 6", false]],
      success: "Correcto. UTF-8 moderno está restringido a U+0000…U+10FFFF y usa 1–4 bytes.",
      failure: "La definición actual de UTF-8 usa secuencias de uno a cuatro octetos."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Máximo número de bytes por valor escalar en UTF-8:", answer: "4", hint: "UTF-8 moderno: 1–4." },
      { level: 2, label: "Normal", prompt: "¿UTF-16 usa siempre una sola unidad de 16 bits por valor escalar? sí/no", answer: "no", hint: "Piensa en pares surrogate." },
      { level: 3, label: "Difícil", prompt: "¿Los code points U+D800..U+DFFF son valores escalares Unicode? sí/no", answer: "no", hint: "Ese rango está reservado a surrogates." }
    ]
  },

  "imagen-audio-serializacion": {
    id: "imagen-audio-serializacion",
    courseId: 2,
    title: "Imagen raster, audio digital y formatos binarios",
    shortTitle: "De señales a bytes",
    duration: 72,
    objective:
      "modelar imágenes y audio como señales discretizadas y explicar por qué un formato necesita estructura, metadatos y reglas de serialización además de datos crudos.",
    summary: [
      "Una imagen raster es una rejilla de muestras; RGB describe componentes de color y alpha suele transportar cobertura/opacidad, cuya interpretación exacta depende del pipeline.",
      "Audio PCM combina muestreo temporal y cuantización de amplitud; son ejes diferentes.",
      "Serializar significa convertir una estructura a una secuencia reproducible de unidades de almacenamiento/transporte con reglas explícitas."
    ],
    concept:
      "Digitalizar una señal implica decidir dónde medir y cómo representar cada medida. Después aún falta definir cómo ordenar esas muestras, qué metadatos acompañarlas y cómo reconstruir la estructura: eso pertenece al formato y a la serialización.",
    diagram: ["señal/escena", "→ muestreo", "→ cuantización", "→ estructura", "→ bytes"],
    rules: [
      "Resolución espacial y profundidad de bits describen propiedades distintas de una imagen.",
      "Frecuencia de muestreo y profundidad de bits describen ejes distintos del audio digital.",
      "Un buffer de bytes no se interpreta solo: necesitas conocer formato, orden, tamaños, tipos y normalmente metadatos."
    ],
    deep: {
      sections: [
        { title: "Raster y canales", body: "Una imagen raster almacena muestras sobre una rejilla. Un píxel puede contener RGB lineal, RGB codificado mediante una función de transferencia, luminancia, alpha u otros canales. 'RGB de 8 bits' es insuficiente para describir color físicamente sin conocer espacio de color y transferencia." },
        { title: "Alpha y composición", body: "Alpha puede almacenarse separado del color (straight alpha) o con RGB ya multiplicado por alpha (premultiplied alpha). Mezclarlos como si fueran idénticos genera bordes y halos. La semántica del canal importa tanto como sus bits." },
        { title: "Muestreo y Nyquist-Shannon", body: "Para una señal idealmente limitada en banda a B Hz, una frecuencia de muestreo estrictamente mayor que 2B permite reconstrucción ideal bajo las hipótesis del teorema. En sistemas reales hacen falta filtros y margen; '44,1 kHz reproduce mágicamente cualquier cosa hasta 22,05 kHz' es una simplificación demasiado alegre." },
        { title: "Cuantización", body: "La amplitud continua se aproxima por niveles discretos. Aumentar bits por muestra reduce el paso de cuantización para un rango fijo. El error resultante depende de señal, cuantizador, dither y procesamiento; no debe describirse siempre como ruido blanco independiente sin condiciones." },
        { title: "Serialización", body: "Un formato binario puede definir magic bytes, versión, offsets, longitudes, checksums, alineación y endianness. La serialización correcta necesita límites claros y validación: confiar ciegamente en una longitud leída del archivo es una excelente forma de conocer un bug de seguridad en persona." }
      ],
      commonErrors: ["Confundir muestreo con cuantización.", "Suponer que más resolución espacial equivale a más precisión de color.", "Tratar alpha straight y premultiplied como intercambiables.", "Parsear datos binarios sin validar tamaños y rangos."],
      connections: ["Gráficos, DSP, codecs, redes, sistemas de archivos y seguridad usan estos principios.", "El bloque de señales profundizará en Fourier, aliasing, convolución y filtrado."]
    },
    example: {
      problem: "Audio PCM estéreo, 48 kHz, 24 bits por muestra y 10 s sin compresión: calcula el tamaño bruto.",
      steps: [["Muestras por canal", "48 000·10 = 480 000."], ["Dos canales", "960 000 muestras escalares."], ["Bits", "960 000·24 = 23 040 000 bits."], ["Bytes", "23 040 000/8 = 2 880 000 bytes ≈ 2,88 MB decimales."]],
      answer: "2 880 000 bytes de payload PCM bruto, sin contar cabeceras."
    },
    check: {
      question: "¿Qué operación discretiza la amplitud de una señal?",
      options: [["Cuantización", true], ["Muestreo temporal", false], ["Endianness", false]],
      success: "Correcto. Muestreo elige cuándo medir; cuantización aproxima el valor medido a niveles.",
      failure: "Separa los ejes: muestreo discretiza tiempo/espacio; cuantización, amplitud."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Audio mono a 8 kHz durante 2 s contiene cuántas muestras escalares?", answer: "16000", hint: "8000·2." },
      { level: 2, label: "Normal", prompt: "RGB de 8 bits por canal sin alpha usa cuántos bits por píxel?", answer: "24", hint: "3·8." },
      { level: 3, label: "Difícil", prompt: "48 kHz, mono, 16 bits, 1 segundo: bytes brutos de PCM:", answer: "96000", hint: "48000·16/8." }
    ]
  }
});
