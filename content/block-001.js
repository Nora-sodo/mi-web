/**
 * Contenido pedagógico desarrollado.
 *
 * Este archivo contiene únicamente conocimiento y estructura didáctica.
 * No toca el DOM, no guarda estado y no conoce detalles de navegación.
 * Así podemos revisar o ampliar una lección sin romper la aplicación.
 */
window.LEARNING_PATHS = {
  1: {
    level: "Experto progresivo",
    estimatedHours: 8,
    description:
      "Fundamentos conceptuales y matemáticos de la información: representación, incertidumbre, entropía, codificación, compresión, errores y relación entre información, física y computación.",
    outcomes: [
      "Separar dato, información, significado y soporte físico sin mezclar niveles de abstracción.",
      "Cuantificar información propia y entropía de Shannon en fuentes discretas.",
      "Analizar códigos, redundancia, compresión y límites fundamentales.",
      "Razonar sobre detección/corrección de errores y sobre el coste físico de operaciones lógicamente irreversibles."
    ],
    modules: [
      {
        id: "m1-representacion",
        title: "Representación y significado",
        description: "Qué hace que un estado físico pueda representar algo y qué papel juega la interpretación.",
        lessons: ["informacion", "estados-representacion"]
      },
      {
        id: "m2-medida",
        title: "Medir incertidumbre",
        description: "Probabilidad, sorpresa, información propia y entropía.",
        lessons: ["informacion-propia", "entropia-shannon"]
      },
      {
        id: "m3-codificacion",
        title: "Codificación y compresión",
        description: "Cómo representar mensajes eficientemente y por qué la redundancia puede ser útil.",
        lessons: ["codificacion", "compresion"]
      },
      {
        id: "m4-fiabilidad",
        title: "Errores, física y computación",
        description: "Canales ruidosos, códigos correctores y límites físicos de la manipulación de información.",
        lessons: ["errores", "informacion-fisica"]
      }
    ]
  }
};

window.LESSONS = {
  informacion: {
    id: "informacion",
    courseId: 1,
    title: "¿Qué es la información?",
    shortTitle: "Información, dato y significado",
    duration: 28,
    objective:
      "distinguir con precisión dato, información, significado, soporte físico e interpretación, y explicar por qué la información no es una sustancia que viva dentro de un bit.",
    summary: [
      "Un dato es una configuración o símbolo susceptible de interpretación; el significado depende de un sistema interpretativo.",
      "La misma configuración física puede portar mensajes diferentes bajo códigos distintos.",
      "La teoría de la información de Shannon cuantifica incertidumbre y capacidad de representación, no significado semántico."
    ],
    concept:
      "Llamamos información, en sentido técnico, a aquello que permite distinguir entre alternativas posibles. Para que haya representación necesitamos al menos un conjunto de estados distinguibles y una convención o mecanismo que los relacione con símbolos o situaciones del modelo.",
    diagram: ["estado físico", "→", "símbolo", "→", "interpretación", "→", "significado"],
    rules: [
      "No confundas soporte con contenido: un voltaje, una carga magnética o una orientación óptica pueden representar el mismo bit.",
      "No confundas información de Shannon con semántica: 1000 bits pueden ser ruido, una clave o una frase; la medida probabilística por sí sola no decide cuál.",
      "La distinguibilidad es operacional: dos estados que ningún receptor puede diferenciar no sirven como dos símbolos distintos para ese receptor."
    ],
    deep: {
      sections: [
        {
          title: "Tres capas que conviene separar",
          body:
            "Primera capa: el soporte físico, por ejemplo dos intervalos de tensión. Segunda: la representación abstracta, por ejemplo los símbolos 0 y 1. Tercera: la interpretación, que asigna esos símbolos a números, caracteres, instrucciones o cualquier otra estructura. Mezclar capas produce errores clásicos como afirmar que “un transistor es un bit”. Un transistor puede participar en la realización física de un estado binario, pero el bit es una unidad abstracta de distinción."
        },
        {
          title: "Información y reducción de alternativas",
          body:
            "Antes de observar un resultado existe un conjunto de posibilidades compatibles con nuestro conocimiento. Una observación informativa elimina posibilidades. Cuando las alternativas son equiprobables, distinguir una alternativa entre N posibilidades equiprobables aporta log₂(N) bits de información. Si además exigimos un código binario de longitud fija para cada alternativa, necesitamos ⌈log₂(N)⌉ bits por palabra; ambas cantidades coinciden cuando N es una potencia de dos."
        },
        {
          title: "El límite semántico",
          body:
            "Shannon diseñó su teoría para problemas de comunicación: cuántos símbolos puede transmitir una fuente, qué tasa puede soportar un canal y cuánto puede comprimirse una secuencia bajo un modelo probabilístico. El significado del mensaje queda deliberadamente fuera del núcleo de esa teoría. Esto es una virtud: permite obtener resultados generales sin tener que definir qué significa cada mensaje para cada observador."
        }
      ],
      commonErrors: [
        "Pensar que información = datos almacenados. Los datos son representaciones; la información depende de qué alternativas permiten discriminar.",
        "Creer que un bit siempre implica exactamente dos transistores o un componente concreto.",
        "Suponer que más bits implican automáticamente más significado."
      ],
      connections: [
        "La separación soporte/representación reaparecerá en lógica digital, arquitectura, sistemas de archivos, redes y criptografía.",
        "La idea de alternativas posibles conecta directamente con probabilidad, entropía, compresión y aprendizaje automático."
      ]
    },
    example: {
      problem: "Un LED puede estar apagado o encendido. ¿En qué condiciones puede actuar como portador de un bit?",
      steps: [
        ["Definir estados", "Tomamos dos estados físicos observables: apagado y encendido."],
        ["Exigir distinguibilidad", "El receptor debe poder diferenciar ambos estados con suficiente fiabilidad dentro del intervalo de lectura."],
        ["Definir una codificación", "Por convenio podemos asignar apagado → 0 y encendido → 1. Invertir la asignación seguiría siendo válido si emisor y receptor comparten el convenio."],
        ["Separar abstracción y física", "El bit no es la luz del LED: es la distinción abstracta entre dos alternativas, implementada aquí mediante luz."]
      ],
      answer: "El LED puede portar un bit cuando ofrece dos estados suficientemente distinguibles y existe una regla de interpretación compartida."
    },
    check: {
      question: "¿Cuál de estas afirmaciones es técnicamente más precisa?",
      options: [
        ["Un bit es un transistor que está encendido o apagado.", false],
        ["Un bit es una distinción entre dos alternativas; puede implementarse con muchos soportes físicos.", true],
        ["Un bit siempre contiene una cifra binaria escrita físicamente dentro del dispositivo.", false]
      ],
      success: "Exacto. Has separado la abstracción de su implementación física.",
      failure: "La trampa está en confundir implementación y abstracción. Un transistor puede formar parte del soporte, pero no define qué es un bit."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Cuántos estados distinguibles como mínimo necesitas para representar un símbolo binario?", answer: "2", hint: "Piensa en cuántas alternativas tiene un bit." },
      { level: 2, label: "Normal", prompt: "Una memoria usa cuatro niveles de carga perfectamente distinguibles por celda. ¿Cuántos bits ideales puede representar cada celda?", answer: "2", hint: "Calcula log₂(4)." },
      { level: 3, label: "Difícil", prompt: "¿Puede la misma cadena 01000001 significar cosas distintas? Responde sí o no.", answer: "si", hint: "ASCII, un entero y una máscara de bits pueden interpretar el mismo patrón de forma diferente." }
    ]
  },

  "estados-representacion": {
    id: "estados-representacion",
    courseId: 1,
    title: "Estados distinguibles, símbolos y digitalización",
    shortTitle: "De la física al símbolo",
    duration: 32,
    objective:
      "modelar un sistema de representación a partir de estados físicos distinguibles y explicar por qué digitalizar implica cuantizar un continuo o discretizar observaciones.",
    summary: [
      "Un alfabeto es un conjunto de símbolos; una codificación asigna representaciones a elementos de ese alfabeto.",
      "Los sistemas físicos suelen ser continuos, mientras que una interfaz digital clasifica regiones del espacio de estados en categorías discretas.",
      "La robustez depende de márgenes: separar regiones válidas permite tolerar ruido y variación física."
    ],
    concept:
      "Un sistema digital no exige que la realidad sea discreta. Exige que el receptor trate conjuntos de estados físicos como categorías discretas. Por ejemplo, una puerta lógica CMOS interpreta rangos de tensión como 0 o 1; los valores intermedios pueden ser inválidos o transitorios.",
    diagram: ["señal física continua", "→", "umbral / cuantización", "→", "símbolo discreto"],
    rules: [
      "La digitalización pierde detalle salvo que el modelo de muestreo y cuantización preserve exactamente la información relevante.",
      "Más niveles por símbolo aumentan capacidad ideal, pero reducen margen frente a ruido si el rango físico total se mantiene.",
      "Un alfabeto de M símbolos equiprobables puede transportar hasta log₂(M) bits por símbolo ideal."
    ],
    deep: {
      sections: [
        { title: "Espacio de estados y regiones de decisión", body: "Imagina que una magnitud física x puede tomar infinitos valores. El receptor no necesita distinguirlos todos: define regiones R₀, R₁, … y asigna a cada región un símbolo. Esta operación crea una interfaz discreta sobre un sustrato continuo. En comunicaciones, las fronteras entre regiones de decisión determinan qué perturbaciones se convierten en errores de símbolo." },
        { title: "Muestreo frente a cuantización", body: "Muestrear discretiza el eje temporal o espacial: elegimos instantes o posiciones. Cuantizar discretiza la amplitud: elegimos uno entre un conjunto finito de niveles. Son operaciones diferentes y generan errores diferentes. Más adelante, Nyquist-Shannon explicará cuándo el muestreo temporal puede preservar una señal limitada en banda." },
        { title: "Redundancia física útil", body: "Un bit lógico suele apoyarse en muchas partículas y márgenes de energía enormes comparados con fluctuaciones microscópicas. Esa redundancia física hace que el estado lógico sea estable. La abstracción digital funciona precisamente porque escondemos gran cantidad de detalle analógico detrás de regiones discretas robustas." }
      ],
      commonErrors: ["Confundir muestreo con cuantización.", "Creer que digital significa que la magnitud física solo toma 0 o 1.", "Suponer que usar más niveles siempre mejora un sistema real sin coste de SNR."],
      connections: ["Esto prepara electrónica digital, ADC/DAC, memoria flash multinivel y modulación digital.", "La idea de regiones de decisión reaparece en clasificación estadística y aprendizaje automático."]
    },
    example: {
      problem: "Una celda ideal admite 8 niveles de carga distinguibles y equiprobables. ¿Cuánta información máxima representa una lectura?",
      steps: [
        ["Contar alternativas", "Hay M = 8 resultados distinguibles."],
        ["Convertir alternativas a decisiones binarias", "La información máxima por símbolo es log₂(M)."],
        ["Calcular", "log₂(8) = 3."],
        ["Interpretar", "Una lectura ideal de esa celda puede identificar una de 8 alternativas, equivalente a 3 bits."]
      ],
      answer: "3 bits por símbolo ideal."
    },
    check: {
      question: "¿Qué operación discretiza la amplitud de una señal?",
      options: [["Muestreo", false], ["Cuantización", true], ["Multiplexación", false]],
      success: "Correcto. Muestreo discretiza cuándo observamos; cuantización, qué niveles representamos.",
      failure: "Aquí importa distinguir ejes: muestreo → tiempo/espacio; cuantización → amplitud."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "16 estados equiprobables representan ¿cuántos bits ideales por símbolo?", answer: "4", hint: "log₂(16)." },
      { level: 2, label: "Normal", prompt: "¿Cómo se llama el conjunto de símbolos posibles de un código?", answer: "alfabeto", hint: "Empieza por 'a'." },
      { level: 3, label: "Difícil", prompt: "Si duplicas de 4 a 8 los niveles distinguibles, ¿cuántos bits adicionales ideales obtienes por símbolo?", answer: "1", hint: "Compara log₂(8) y log₂(4)." }
    ]
  },

  "informacion-propia": {
    id: "informacion-propia",
    courseId: 1,
    title: "Probabilidad, sorpresa e información propia",
    shortTitle: "−log₂ p(x)",
    duration: 34,
    objective:
      "calcular e interpretar la información propia I(x) = −log₂ p(x), y justificar por qué el logaritmo convierte probabilidades multiplicativas en información aditiva.",
    summary: [
      "Los sucesos menos probables aportan más información cuando ocurren.",
      "La información propia se define como I(x) = −log₂ p(x) y se mide en bits con logaritmo base 2.",
      "Para sucesos independientes, I(x,y) = I(x) + I(y)."
    ],
    concept:
      "Si un resultado era prácticamente seguro, observarlo reduce poca incertidumbre. Si era muy improbable, su aparición descarta muchas expectativas. Una medida compatible con esta intuición y con la aditividad de sucesos independientes es el logaritmo negativo de la probabilidad.",
    diagram: ["probabilidad baja", "→", "más sorpresa", "→", "más bits"],
    rules: [
      "p(x)=1 implica I(x)=0 bits: un resultado seguro no informa sobre cuál alternativa ocurrió.",
      "Si p(x)=1/2ⁿ, entonces I(x)=n bits.",
      "No confundas información propia de un resultado con entropía de una variable aleatoria: la entropía es un promedio esperado."
    ],
    deep: {
      sections: [
        { title: "Por qué aparece el logaritmo", body: "Queremos que dos observaciones independientes sumen información. Para resultados independientes p(x,y)=p(x)p(y). Si buscamos una función f tal que f(pq)=f(p)+f(q), bajo condiciones regulares la familia relevante es proporcional a log(p). Como queremos que menor probabilidad produzca mayor valor, usamos −log(p). Elegir base 2 fija la unidad en bits." },
        { title: "Bits no enteros", body: "La información propia puede ser fraccionaria. Un resultado con probabilidad 0,1 aporta −log₂(0,1) ≈ 3,322 bits. Eso no significa almacenar 0,322 de un bit físico aislado; significa una cantidad de información en una escala aditiva. Las longitudes enteras de códigos aparecen cuando construimos representaciones concretas." },
        { title: "Límites", body: "La fórmula presupone un modelo probabilístico. Si el modelo cambia, cambia la información atribuida al mismo resultado. La teoría cuantifica sorpresa respecto a una distribución, no una propiedad metafísica intrínseca del símbolo." }
      ],
      commonErrors: ["Usar log₂(p) sin el signo negativo.", "Creer que un evento de probabilidad cero tiene una información finita.", "Confundir p(x) baja con 'resultado importante' en sentido semántico."],
      connections: ["La log-verosimilitud en estadística y machine learning usa exactamente esta conversión de productos en sumas.", "La pérdida cross-entropy está directamente relacionada con sorpresa logarítmica."]
    },
    example: {
      problem: "Una fuente produce A con probabilidad 1/2, B con 1/4 y C con 1/4. ¿Cuánta información aporta observar B?",
      steps: [["Tomar la probabilidad", "p(B)=1/4."], ["Aplicar definición", "I(B)=−log₂(1/4)."], ["Reescribir", "1/4=2⁻²."], ["Calcular", "I(B)=−(−2)=2 bits."]],
      answer: "Observar B aporta 2 bits de información propia respecto a ese modelo."
    },
    check: {
      question: "Un resultado seguro tiene p=1. ¿Cuánta información propia aporta?",
      options: [["0 bits", true], ["1 bit", false], ["Infinita", false]],
      success: "Correcto: −log₂(1)=0.",
      failure: "Si ya sabías con certeza qué iba a ocurrir, observarlo no elimina ninguna alternativa."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Si p(x)=1/8, I(x) en bits es...", answer: "3", hint: "1/8 = 2⁻³." },
      { level: 2, label: "Normal", prompt: "Si un resultado aporta 5 bits de información propia, su probabilidad es 1 entre ¿cuántas alternativas equiprobables?", answer: "32", hint: "2⁵." },
      { level: 3, label: "Difícil", prompt: "Dos resultados independientes aportan 2 y 3 bits. ¿Cuánta información conjunta aportan?", answer: "5", hint: "La independencia convierte probabilidades en producto e información en suma." }
    ]
  },

  "entropia-shannon": {
    id: "entropia-shannon",
    courseId: 1,
    title: "Entropía de Shannon",
    shortTitle: "Incertidumbre media",
    duration: 42,
    objective:
      "calcular H(X), interpretar su significado operacional y distinguir entropía de Shannon, información propia y min-entropía.",
    summary: [
      "H(X)=−Σ p(x) log₂ p(x) es la información propia media de una variable discreta.",
      "Para un alfabeto finito de M símbolos, la entropía máxima es log₂(M) y se alcanza con distribución uniforme.",
      "La entropía de Shannon describe promedio; la min-entropía se centra en la probabilidad del resultado más predecible y aparece en contextos criptográficos."
    ],
    concept:
      "La entropía es la sorpresa media esperada antes de observar una muestra de la fuente. No dice qué resultado concreto aparecerá; resume cuánta incertidumbre media contiene el modelo probabilístico.",
    diagram: ["p(x)", "×", "−log₂ p(x)", "→ sumar →", "H(X)"],
    rules: [
      "0 ≤ H(X) ≤ log₂(M) para una variable discreta con M resultados posibles de probabilidad no nula.",
      "Una fuente determinista tiene H=0.",
      "La entropía por símbolo no implica que cada símbolo pueda codificarse individualmente con esa longitud; los límites de compresión son asintóticos sobre secuencias."
    ],
    deep: {
      sections: [
        { title: "Entropía como esperanza", body: "Si I(X)=−log₂ p(X), entonces H(X)=E[I(X)]. Por eso cada término p(x) pondera la sorpresa de x por la frecuencia con la que esperamos observarlo. Un resultado extremadamente sorprendente pero casi imposible puede contribuir poco al promedio porque su peso p(x) es pequeño." },
        { title: "Máximo en la distribución uniforme", body: "Con un número fijo M de símbolos, repartir la probabilidad uniformemente hace la fuente menos predecible. Puede demostrarse mediante concavidad de −p log p, multiplicadores de Lagrange o divergencia KL. El máximo es log₂(M)." },
        { title: "Shannon frente a min-entropía", body: "La min-entropía H∞(X)=−log₂ maxₓ p(x) mide la dificultad asociada al resultado más probable. Es más conservadora para ciertos usos criptográficos. Dos distribuciones pueden tener entropías de Shannon parecidas pero comportarse de forma muy distinta frente a un atacante que siempre adivina el valor más probable." }
      ],
      commonErrors: ["Decir que una secuencia concreta 'tiene entropía de Shannon' sin especificar modelo o estimador.", "Confundir entropía alta con calidad criptográfica suficiente.", "Suponer que entropía significa desorden en cualquier contexto sin precisar la definición."],
      connections: ["Compresión sin pérdida: la entropía determina una tasa media fundamental bajo hipótesis concretas.", "Cross-entropy y KL divergence generalizan estas ideas en estadística y ML."]
    },
    example: {
      problem: "Una moneda sesgada tiene P(cara)=0,75 y P(cruz)=0,25. Calcula H(X).",
      steps: [["Escribir la fórmula", "H=−[0,75 log₂(0,75)+0,25 log₂(0,25)]."], ["Evaluar términos", "−0,75 log₂(0,75)≈0,311; −0,25 log₂(0,25)=0,5."], ["Sumar", "H≈0,811 bits por lanzamiento."], ["Interpretar", "Es menor que 1 bit porque la moneda es predecible: cara aparece con más frecuencia."]],
      answer: "H(X) ≈ 0,811 bits por lanzamiento."
    },
    check: {
      question: "¿Qué distribución maximiza la entropía entre cuatro símbolos posibles?",
      options: [["(0,25, 0,25, 0,25, 0,25)", true], ["(1, 0, 0, 0)", false], ["(0,7, 0,1, 0,1, 0,1)", false]],
      success: "Sí. La uniforme alcanza log₂(4)=2 bits.",
      failure: "Con un alfabeto fijo, la incertidumbre media máxima aparece cuando ningún símbolo es más predecible que otro."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Entropía de una variable determinista, en bits:", answer: "0", hint: "No queda ninguna incertidumbre." },
      { level: 2, label: "Normal", prompt: "Entropía máxima de 8 símbolos equiprobables:", answer: "3", hint: "log₂(8)." },
      { level: 3, label: "Difícil", prompt: "Si max p(x)=1/4, la min-entropía es ¿cuántos bits?", answer: "2", hint: "H∞=−log₂(max p)." }
    ]
  },

  codificacion: {
    id: "codificacion",
    courseId: 1,
    title: "Símbolos, alfabetos y códigos",
    shortTitle: "Codificar sin magia",
    duration: 36,
    objective:
      "diseñar y analizar códigos unívocamente decodificables, distinguir códigos de longitud fija y variable y comprender la condición de prefijo.",
    summary: [
      "Codificar es mapear símbolos o secuencias a palabras de código; decodificar aplica la relación inversa cuando esta es identificable.",
      "Un código prefijo evita que una palabra de código sea prefijo de otra, permitiendo decodificación instantánea.",
      "La eficiencia depende de adaptar longitudes a probabilidades: símbolos frecuentes deberían tender a recibir palabras más cortas."
    ],
    concept:
      "Una codificación no es solo cambiar símbolos de aspecto. Es construir una correspondencia que conserve la información necesaria para recuperar el mensaje. Si la concatenación de palabras puede interpretarse de dos formas, el código es ambiguo y la decodificación sin contexto adicional falla.",
    diagram: ["símbolo fuente", "→", "palabra de código", "→ concatenación →", "decodificador"],
    rules: [
      "Todo código prefijo es unívocamente decodificable, pero no todo código unívocamente decodificable tiene por qué ser prefijo.",
      "En código binario prefijo, las longitudes lᵢ deben satisfacer la desigualdad de Kraft Σ2⁻ˡⁱ ≤ 1.",
      "Huffman es óptimo entre códigos prefijo símbolo-a-símbolo para un conjunto de probabilidades conocido, pero no derrota el límite de entropía."
    ],
    deep: {
      sections: [
        { title: "Ambigüedad por concatenación", body: "Supón A→0 y B→00. La secuencia 00 podría representar B o AA. El problema no es que las palabras se parezcan: es que la secuencia completa admite más de una segmentación válida. Un código prefijo elimina este tipo de ambigüedad porque ninguna palabra completa puede ser el inicio de otra." },
        { title: "Árboles binarios y Kraft", body: "Un código prefijo binario puede verse como hojas de un árbol binario. Una palabra de longitud l ocupa una fracción 2⁻ˡ del espacio de hojas posibles. La desigualdad de Kraft expresa que las hojas elegidas no pueden solaparse en el árbol." },
        { title: "Probabilidad y longitud", body: "Si un símbolo aparece a menudo, asignarle una palabra corta reduce la longitud media. Los códigos Huffman formalizan este criterio para códigos prefijo con longitudes enteras. La codificación aritmética trabaja con secuencias y puede acercarse aún más a la entropía media." }
      ],
      commonErrors: ["Confundir código prefijo con 'todos los códigos empiezan por un prefijo común'.", "Suponer que Huffman siempre produce exactamente H bits por símbolo.", "Olvidar que una codificación puede necesitar metadatos o un modelo compartido."],
      connections: ["Los árboles de Huffman conectan algoritmos greedy, teoría de la información y formatos de compresión.", "Los códigos de longitud variable aparecerán en formatos multimedia y protocolos."]
    },
    example: {
      problem: "Código: A→0, B→10, C→110, D→111. ¿Es prefijo? Decodifica 010111.",
      steps: [["Comprobar prefijos", "0 no inicia ninguna otra palabra; 10 tampoco; 110 y 111 son hojas distintas."], ["Leer desde la izquierda", "0 → A."], ["Continuar", "10 → B."], ["Final", "111 → D. La cadena se decodifica de forma inmediata."]],
      answer: "Sí, es prefijo; 010111 → ABD."
    },
    check: {
      question: "¿Qué propiedad garantiza decodificación instantánea al leer de izquierda a derecha?",
      options: [["Que todas las palabras tengan longitud impar", false], ["Que el código sea prefijo", true], ["Que use ASCII", false]],
      success: "Correcto. El árbol puede recorrerse hasta una hoja sin mirar símbolos futuros.",
      failure: "La propiedad relevante es estructural: ninguna palabra válida puede ser prefijo de otra."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Con A→0 y B→1, ¿cuántos bits ocupa ABBA?", answer: "4", hint: "Cada símbolo usa 1 bit." },
      { level: 2, label: "Normal", prompt: "¿Es prefijo el código A→0, B→01? Responde sí/no.", answer: "no", hint: "¿La palabra de A es el comienzo de la de B?" },
      { level: 3, label: "Difícil", prompt: "Para longitudes 1,2,2, calcula Σ2^-l.", answer: "1", hint: "1/2 + 1/4 + 1/4." }
    ]
  },

  compresion: {
    id: "compresion",
    courseId: 1,
    title: "Redundancia, compresión y sus límites",
    shortTitle: "Por qué no existe ZIP mágico",
    duration: 40,
    objective:
      "explicar qué redundancia explota la compresión sin pérdida, relacionar longitud media y entropía, y demostrar por conteo por qué ningún compresor sin pérdida acorta todos los archivos.",
    summary: [
      "Comprimir sin pérdida explota regularidades o probabilidades no uniformes descritas por un modelo.",
      "No existe un compresor inyectivo que reduzca estrictamente la longitud de todas las cadenas posibles.",
      "La entropía establece una tasa media fundamental para fuentes estocásticas bajo hipótesis determinadas, no una garantía de tamaño para cada archivo individual."
    ],
    concept:
      "Un compresor sin pérdida debe permitir reconstrucción exacta. Para acortar ciertas entradas necesita describirlas usando representaciones que aprovechen estructura; inevitablemente otras entradas quedarán igual o crecerán. Si todo se comprimiera siempre, podríamos repetir el compresor indefinidamente y terminar representando archivos arbitrariamente grandes con casi nada: el principio del palomar protesta.",
    diagram: ["regularidad", "→", "modelo", "→", "código más corto"],
    rules: [
      "Compresión sin pérdida exige una transformación reversible sobre el conjunto admitido.",
      "Un archivo 'aleatorio' respecto al modelo puede ser incomprimible o crecer por cabeceras y metadatos.",
      "Compresión con pérdida cambia el problema: admite distorsión y optimiza tasa frente a calidad."
    ],
    deep: {
      sections: [
        { title: "Prueba de conteo", body: "Hay 2ⁿ cadenas binarias de longitud n. En cambio, el número total de cadenas de longitud menor que n es 1+2+4+…+2ⁿ⁻¹=2ⁿ−1. No hay suficientes salidas más cortas para asignar una diferente a cada entrada de n bits. Por tanto, si la decodificación debe ser exacta, al menos alguna entrada no puede acortarse." },
        { title: "Entropía y codificación de fuente", body: "Para una fuente ergódica con modelo conocido, los teoremas de codificación de fuente muestran que secuencias largas pueden representarse con una tasa media cercana a la entropía por símbolo, y que bajar de esa tasa de manera fiable no es posible asintóticamente. Los detalles importan: fuente, independencia, memoria y criterio de error." },
        { title: "Modelo = ventaja", body: "Un compresor funciona porque ciertos patrones son más probables o porque existe estructura explotable: repeticiones, diccionarios, correlación espacial, predicción temporal, etc. Si el modelo no coincide con los datos, la ventaja desaparece. El compresor no crea información; cambia la descripción." }
      ],
      commonErrors: ["Creer que una segunda pasada de compresión siempre reduce más.", "Interpretar 'entropía' como tamaño exacto de un archivo concreto.", "Olvidar el coste de cabeceras, tablas, diccionarios o modelos."],
      connections: ["LZ, DEFLATE, Brotli y Zstandard explotan repetición/contexto de distintas maneras.", "Compresión con pérdida conecta con percepción, rate-distortion y procesamiento de señales."]
    },
    example: {
      problem: "¿Por qué no puede existir un compresor sin pérdida que reduzca todas las cadenas de 8 bits a como máximo 7 bits?",
      steps: [["Contar entradas", "Hay 2⁸=256 cadenas distintas de 8 bits."], ["Contar salidas", "Con longitudes 0..7 hay 1+2+...+128=255 cadenas binarias posibles."], ["Aplicar inyectividad", "Para reconstrucción exacta, dos entradas distintas no pueden compartir la misma salida."], ["Concluir", "256 entradas no caben de forma inyectiva en solo 255 salidas."]],
      answer: "Es imposible: faltaría al menos una representación distinta."
    },
    check: {
      question: "Un compresor sin pérdida muy bueno recibe datos ya comprimidos y de alta entropía respecto a su modelo. ¿Qué puede ocurrir?",
      options: [["Siempre los reduce otro 50%", false], ["Puede dejarlos igual o incluso aumentarlos", true], ["Los convierte en pérdida", false]],
      success: "Exacto. Los metadatos y la falta de regularidad explotable pueden hacer crecer la salida.",
      failure: "No hay una reserva secreta de compresión. Sin estructura aprovechable, la transformación reversible no tiene por qué acortar."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Cuántas cadenas binarias de longitud 4 existen?", answer: "16", hint: "2⁴." },
      { level: 2, label: "Normal", prompt: "¿Cuántas cadenas binarias hay con longitud menor que 4, contando la vacía?", answer: "15", hint: "1+2+4+8." },
      { level: 3, label: "Difícil", prompt: "¿La compresión sin pérdida permite recuperar exactamente el original? sí/no", answer: "si", hint: "Esa es precisamente la diferencia con compresión con pérdida." }
    ]
  },

  errores: {
    id: "errores",
    courseId: 1,
    title: "Detección y corrección de errores",
    shortTitle: "Redundancia que protege",
    duration: 44,
    objective:
      "usar distancia de Hamming para razonar sobre detección y corrección, y explicar por qué introducir redundancia puede aumentar fiabilidad.",
    summary: [
      "La distancia de Hamming cuenta posiciones distintas entre palabras de igual longitud.",
      "Un código con distancia mínima d puede detectar hasta d−1 errores y corregir hasta ⌊(d−1)/2⌋ errores, bajo el modelo de sustituciones de símbolos.",
      "La redundancia no siempre es desperdicio: puede comprar capacidad de detección/corrección frente al ruido."
    ],
    concept:
      "Si solo usamos algunas palabras binarias como palabras válidas y las mantenemos suficientemente separadas, un patrón recibido que se desvíe ligeramente puede identificarse como corrupto o asociarse a la palabra válida más cercana. Esa separación se cuantifica mediante distancia de Hamming.",
    diagram: ["datos", "+ redundancia", "→ canal ruidoso →", "síndrome / distancia", "→ recuperación"],
    rules: [
      "Detectar t errores exige distancia mínima al menos t+1.",
      "Corregir t errores exige distancia mínima al menos 2t+1.",
      "La corrección consume tasa: añadimos redundancia para ganar robustez."
    ],
    deep: {
      sections: [
        { title: "Geometría del espacio de palabras", body: "Las cadenas binarias de longitud n forman vértices de un hipercubo. La distancia de Hamming es una métrica natural: cada bit invertido mueve una arista. Corregir t errores equivale a construir bolas de radio t alrededor de palabras válidas sin que se solapen." },
        { title: "Paridad", body: "Añadir un bit de paridad permite detectar cualquier número impar de errores de bit, pero no identificar qué bit cambió. En un código simple de paridad, la distancia mínima es 2: detecta un error, pero no puede corregirlo de forma general." },
        { title: "Hamming y más allá", body: "Los códigos de Hamming clásicos consiguen distancia mínima 3 y pueden corregir un error. Sistemas modernos usan familias mucho más potentes —BCH, Reed-Solomon, LDPC, polar— adaptadas a modelos de canal y requisitos concretos." }
      ],
      commonErrors: ["Decir que un bit de paridad corrige un error: normalmente solo lo detecta.", "Usar la regla de distancia sin especificar el modelo de errores.", "Confundir redundancia para corrección con redundancia estadística que un compresor elimina."],
      connections: ["ECC en memorias, almacenamiento, QR, enlaces inalámbricos y comunicaciones espaciales.", "La teoría de códigos conecta álgebra, probabilidad y canales de comunicación."]
    },
    example: {
      problem: "Un código tiene distancia mínima d=5. ¿Cuántos errores de sustitución garantiza detectar y corregir?",
      steps: [["Detección", "Puede detectar hasta d−1 = 4 errores."], ["Corrección", "Puede corregir hasta floor((d−1)/2)."], ["Calcular", "floor(4/2)=2."], ["Interpretar", "Las bolas de radio 2 alrededor de palabras válidas no se solapan."]],
      answer: "Detecta hasta 4 errores y corrige hasta 2."
    },
    check: {
      question: "Si d_min=3, ¿cuántos errores puede corregir con garantía?",
      options: [["0", false], ["1", true], ["2", false]],
      success: "Correcto: floor((3−1)/2)=1.",
      failure: "Para corregir t errores necesitas distancia mínima 2t+1. Con d=3, t=1."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Distancia de Hamming entre 1011 y 1001:", answer: "1", hint: "Cuenta posiciones distintas." },
      { level: 2, label: "Normal", prompt: "Con d_min=4, ¿cuántos errores detectas con garantía?", answer: "3", hint: "d−1." },
      { level: 3, label: "Difícil", prompt: "Con d_min=7, ¿cuántos errores corriges con garantía?", answer: "3", hint: "floor((d−1)/2)." }
    ]
  },

  "informacion-fisica": {
    id: "informacion-fisica",
    courseId: 1,
    title: "Información, energía y computación",
    shortTitle: "Cuando los bits tocan la física",
    duration: 46,
    objective:
      "explicar la relación entre información abstracta y soporte físico, y formular correctamente el principio de Landauer sin confundirlo con el consumo real completo de un ordenador.",
    summary: [
      "Toda información procesada por una máquina real necesita grados de libertad físicos que implementen estados distinguibles.",
      "En el escenario clásico de borrado isoterma de un bit desconocido en contacto con un baño térmico a temperatura T, el principio de Landauer implica una generación mínima de entropía k_B ln 2 y, en el límite reversible, un calor disipado de k_B T ln 2 al entorno.",
      "Ese límite no dice que cada operación de CPU consuma exactamente kT ln 2 ni que almacenar un bit estático tenga necesariamente ese coste por unidad de tiempo."
    ],
    concept:
      "La información puede estudiarse como abstracción, pero cualquier ordenador real la encarna en sistemas físicos. Cambiar, copiar, conservar y borrar estados requiere mecanismos físicos. El punto fino es evitar dos extremos: pensar que información es una sustancia material o pensar que puede manipularse físicamente sin ninguna restricción termodinámica.",
    diagram: ["estado lógico", "↔", "estado físico", "→ dinámica →", "calor / trabajo"],
    rules: [
      "Landauer se refiere a operaciones lógicamente irreversibles como borrar información, no a 'cada vez que un bit cambia'.",
      "El límite kT ln 2 es un mínimo termodinámico ideal; los dispositivos actuales suelen disipar mucho más.",
      "Computación reversible estudia cómo evitar pérdida lógica de información en transformaciones intermedias."
    ],
    deep: {
      sections: [
        { title: "Irreversibilidad lógica", body: "Una operación como RESET lleva varios estados lógicos posibles a un mismo estado final. Al mirar solo la salida ya no puedes reconstruir cuál era la entrada. Esa pérdida de distinción es irreversibilidad lógica. En contraste, una puerta NOT ideal es reversible: conocer la salida determina la entrada." },
        { title: "Principio de Landauer", body: "En el escenario clásico isoterma a temperatura T, borrar un bit desconocido de forma lógicamente irreversible implica una generación de entropía de al menos k_B ln 2; en el límite cuasiestático/reversible esto corresponde a un calor k_B T ln 2 cedido al entorno. El resultado conecta información y termodinámica. Su formulación cuidadosa importa: no es una tarifa fija cobrada por la naturaleza a cada instrucción de máquina." },
        { title: "Computación real", body: "CPUs, memorias y enlaces operan con márgenes de tensión, cargas capacitivas, fugas, resistencias y relojes. La energía práctica depende de arquitectura y tecnología. Landauer marca un límite conceptual muy por debajo del consumo típico y ayuda a entender qué parte del coste está ligada a irreversibilidad lógica, no a todos los mecanismos físicos de un circuito." }
      ],
      commonErrors: ["Afirmar que cambiar un bit siempre cuesta exactamente kT ln2.", "Decir que Landauer prohíbe la computación reversible.", "Confundir el coste de borrar información con el de conservar un bit en una memoria ideal."],
      connections: ["Termodinámica de la computación, puertas reversibles y computación cuántica.", "La implementación física reaparecerá inmediatamente en electricidad, transistores y lógica digital."]
    },
    example: {
      problem: "¿Cuál es la diferencia lógica entre NOT(x) y RESET(x)=0 para x∈{0,1}?",
      steps: [["NOT", "0→1 y 1→0. Cada salida identifica una única entrada."], ["RESET", "0→0 y 1→0. Dos entradas diferentes colapsan en la misma salida."], ["Reversibilidad", "NOT es biyectiva; RESET no lo es."], ["Consecuencia", "RESET destruye una distinción lógica y es el prototipo de operación a la que aplica el argumento de Landauer."]],
      answer: "NOT es lógicamente reversible; RESET es lógicamente irreversible."
    },
    check: {
      question: "¿A qué operación se aplica directamente el argumento clásico de Landauer?",
      options: [["Borrar irreversiblemente un bit desconocido", true], ["Leer cualquier bit", false], ["Sumar dos enteros en cualquier CPU", false]],
      success: "Correcto. La pieza clave es la pérdida lógica de una distinción previa.",
      failure: "No es una tarifa por operación informática genérica. El argumento clásico se centra en borrado lógicamente irreversible."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "¿Es la puerta NOT lógicamente reversible? sí/no", answer: "si", hint: "¿Puedes recuperar la entrada conociendo la salida?" },
      { level: 2, label: "Normal", prompt: "¿Cuántas entradas distintas mapea RESET(x)=0 a la salida 0 si x es un bit?", answer: "2", hint: "Entradas posibles: 0 y 1." },
      { level: 3, label: "Difícil", prompt: "Completa el factor del límite térmico clásico de borrado: k_B T ln __", answer: "2", hint: "Un bit distingue dos alternativas." }
    ]
  }
};
