/**
 * BLOQUE 003 — Electricidad fundamental
 *
 * Objetivo editorial:
 * - conectar magnitudes físicas con modelos de circuito;
 * - distinguir leyes generales de aproximaciones de componente;
 * - preparar lógica digital e integridad de señal sin fingir que los cables
 *   son líneas mágicas sin resistencia, inductancia ni capacitancia.
 */

window.LEARNING_PATHS[3] = {
  level: "Experto progresivo",
  estimatedHours: 15,
  description:
    "Electricidad y electrónica para informática desde carga, campo y potencial hasta circuitos, semiconductores, transistores, parasíticos, ruido, potencia e integridad de señal.",
  outcomes: [
    "Distinguir carga, campo eléctrico, potencial, voltaje, corriente, resistencia, conductancia, potencia y energía con unidades y signos coherentes.",
    "Aplicar ley de Ohm y leyes de Kirchhoff entendiendo sus hipótesis de modelado y el papel de las referencias de potencial.",
    "Analizar redes serie/paralelo, divisores y fuentes reales mediante modelos equivalentes sencillos.",
    "Explicar el comportamiento cualitativo y de primer orden de R, C, L, diodos, LED, BJT y MOSFET.",
    "Relacionar semiconductores tipo N/P y unión PN con dispositivos electrónicos sin caer en la caricatura de que los electrones 'saltan por voluntad propia'.",
    "Razonar sobre flancos, parasíticos, ruido, disipación térmica e integridad de señal, preparando el salto a lógica digital y hardware real."
  ],
  modules: [
    {
      id: "m1-magnitudes",
      title: "Carga, campo y magnitudes eléctricas",
      description: "Del campo electromagnético al modelo de circuito y sus unidades.",
      lessons: ["carga-campo-potencial", "voltaje-corriente-ohm", "potencia-energia-kirchhoff"]
    },
    {
      id: "m2-redes",
      title: "Redes eléctricas y referencias",
      description: "Serie, paralelo, divisores, fuentes reales, tierra y cortocircuitos.",
      lessons: ["serie-paralelo-divisores", "fuentes-tierra-cortos"]
    },
    {
      id: "m3-componentes",
      title: "Componentes y semiconductores",
      description: "R, C, L, diodos, unión PN y transistores como modelos físicos y de circuito.",
      lessons: ["componentes-reactivos-diodos", "semiconductores-pn", "bjt-mosfet"]
    },
    {
      id: "m4-realidad",
      title: "Circuitos reales e integridad de señal",
      description: "Ruido, parasíticos, retardos, flancos, consumo, calor e interconexiones rápidas.",
      lessons: ["ruido-parasiticos-flancos", "potencia-calor-integridad"]
    }
  ]
};

Object.assign(window.LESSONS, {
  "carga-campo-potencial": {
    id: "carga-campo-potencial",
    courseId: 3,
    title: "Carga, campo eléctrico y potencial",
    shortTitle: "De la carga al voltaje",
    duration: 58,
    objective:
      "distinguir carga, campo eléctrico, energía potencial y potencial eléctrico, y explicar por qué el voltaje siempre es una diferencia entre dos puntos.",
    summary: [
      "La carga eléctrica se mide en culombios; la carga elemental tiene magnitud exacta e = 1,602176634×10⁻¹⁹ C en el SI.",
      "El campo eléctrico E describe fuerza por unidad de carga de prueba; el potencial V describe energía potencial por unidad de carga.",
      "El voltaje V_AB = V_A−V_B no pertenece a un nodo aislado: expresa una diferencia respecto de otro punto o una referencia elegida."
    ],
    concept:
      "Un circuito abstrae una distribución electromagnética compleja mediante variables como voltaje y corriente. El voltaje compara potenciales; el campo relaciona cómo cambia espacialmente ese potencial; la carga es una propiedad física de la materia y de los campos que actúa como fuente de interacción electromagnética.",
    diagram: ["carga q", "→ crea/responde a", "campo E", "→ diferencia de potencial", "V_AB"],
    rules: [
      "Nunca escribas 'el voltaje de A' sin una referencia implícita o explícita: escribe V_A respecto a tierra o V_AB entre dos nodos.",
      "Para una carga q en un potencial V, la energía potencial eléctrica cambia como ΔU = q·ΔV en el modelo electrostático.",
      "El signo importa: una carga negativa cambia su energía potencial en sentido opuesto al de una carga positiva para el mismo ΔV."
    ],
    deep: {
      sections: [
        { title: "Carga y cuantización", body: "En sistemas ordinarios observamos carga en múltiplos de la carga elemental, aunque en materia condensada aparecen cuasipartículas y descripciones efectivas que exigen más cuidado. Para circuitos, q en culombios es la variable macroscópica útil; un culombio corresponde a aproximadamente 6,24×10¹⁸ cargas elementales de magnitud e." },
        { title: "Campo frente a potencial", body: "El campo eléctrico es vectorial: tiene magnitud y dirección. El potencial es escalar. En electrostática, E = −∇V: el campo apunta hacia la dirección de mayor descenso del potencial. Esta relación explica por qué una diferencia de potencial puede acelerar cargas sin que 'el voltaje fluya'." },
        { title: "Potencial absoluto y referencia", body: "Solo las diferencias de potencial son observables en el modelo clásico de circuito. Podemos fijar arbitrariamente un nodo a 0 V y expresar los demás respecto a él. Elegir tierra es elegir una referencia; no convierte ese nodo en un sumidero metafísico de electrones." },
        { title: "De Maxwell a circuitos", body: "El modelo de elementos concentrados funciona cuando dimensiones y retardos de propagación permiten tratar cada componente como si voltaje y corriente estuvieran bien definidos en terminales. A frecuencias altas o interconexiones largas, la distribución espacial del campo deja de ser un detalle y aparecen líneas de transmisión, radiación y acoplos." }
      ],
      commonErrors: ["Decir que el voltaje 'circula'.", "Confundir campo eléctrico con potencial.", "Creer que 0 V significa ausencia de campo o de carga.", "Olvidar indicar respecto a qué punto se mide un potencial."],
      connections: ["Los niveles lógicos son regiones de voltaje respecto a referencias concretas.", "La relación campo-potencial reaparecerá en semiconductores, MOSFET y propagación de señales."]
    },
    example: {
      problem: "Una carga de +3 μC se mueve entre dos puntos con V_A=5 V y V_B=1 V. ¿Cuál es ΔU = U_B−U_A?",
      steps: [["Diferencia de potencial", "ΔV=V_B−V_A=1−5=−4 V."], ["Aplicar ΔU=qΔV", "q=3×10⁻⁶ C, así que ΔU=3×10⁻⁶·(−4)."], ["Resultado", "ΔU=−12×10⁻⁶ J = −12 μJ."], ["Interpretación", "La energía potencial de una carga positiva disminuye al ir hacia menor potencial."]],
      answer: "−12 μJ."
    },
    check: {
      question: "¿Qué afirmación describe mejor un voltaje de 3 V entre A y B?",
      options: [["V_A−V_B = 3 J/C", true], ["Por A circulan 3 V cada segundo", false], ["A contiene exactamente 3 culombios más que B", false]],
      success: "Correcto. Un voltio es un julio por culombio y el voltaje es una diferencia de potencial.",
      failure: "El voltaje no es flujo de voltios ni cantidad de carga: es diferencia de energía potencial por unidad de carga."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Unidad SI de carga eléctrica (nombre):", answer: "culombio", alternatives: ["coulomb"], hint: "Símbolo C." },
      { level: 2, label: "Normal", prompt: "Si V_A=7 V y V_B=2 V, ¿cuánto vale V_AB en voltios?", answer: "5", hint: "V_AB=V_A−V_B." },
      { level: 3, label: "Difícil", prompt: "Una carga −2 μC atraviesa ΔV=+6 V. ΔU en μJ:", answer: "-12", alternatives: ["−12"], hint: "ΔU=qΔV; conserva el signo de q." }
    ]
  },

  "voltaje-corriente-ohm": {
    id: "voltaje-corriente-ohm",
    courseId: 3,
    title: "Corriente, resistencia, conductancia y ley de Ohm",
    shortTitle: "Qué fluye realmente",
    duration: 62,
    objective:
      "definir corriente como tasa de flujo de carga, usar convenciones de signo y aplicar V=IR solo cuando el modelo resistivo sea apropiado.",
    summary: [
      "La corriente I es dq/dt y se mide en amperios: 1 A = 1 C/s.",
      "Para un resistor óhmico ideal, V=IR; la conductancia G=1/R y se mide en siemens.",
      "La corriente convencional tiene la dirección en la que se movería carga positiva; en metales los electrones de conducción tienen deriva media opuesta."
    ],
    concept:
      "La corriente cuantifica cuánto flujo neto de carga cruza una sección por unidad de tiempo. La resistencia es un parámetro de un modelo constitutivo que relaciona voltaje y corriente; no todos los componentes obedecen una relación lineal V=IR.",
    diagram: ["ΔV", "→ impulsa respuesta del medio", "I=dq/dt", "↔ R o G"],
    rules: [
      "Usa una convención de referencia para V e I y respétala; un resultado negativo suele indicar dirección opuesta a la elegida.",
      "V=IR describe un resistor lineal ideal o un régimen donde la aproximación es válida; un diodo o transistor no es 'una resistencia rara' en general.",
      "G=1/R para una resistencia positiva finita; combinar conductancias simplifica redes en paralelo."
    ],
    deep: {
      sections: [
        { title: "Corriente no es velocidad electrónica", body: "Una corriente macroscópica puede establecerse en un circuito mucho más rápido que el tiempo que tardaría un electrón individual en recorrerlo. La velocidad de deriva de portadores puede ser pequeña; la señal electromagnética y el reajuste de campos se propagan por la estructura a una fracción de la velocidad de la luz, según el medio y la geometría." },
        { title: "Modelo de resistor", body: "Un resistor ideal tiene relación instantánea v(t)=R·i(t), sin memoria ni parasíticos. Un resistor físico posee coeficiente térmico, tolerancia, capacitancia e inductancia parásitas, ruido y límites de potencia. El modelo ideal es útil precisamente porque sabemos cuándo dejar de creerle." },
        { title: "Resistividad y geometría", body: "Para un conductor uniforme en un régimen simple, R=ρL/A. La resistividad ρ depende del material y de la temperatura. Esta relación conecta el objeto geométrico con el elemento de circuito, pero pierde precisión cuando la distribución de corriente deja de ser uniforme, por ejemplo a alta frecuencia debido al efecto pelicular." },
        { title: "Convención pasiva de signos", body: "Si definimos la corriente entrando por el terminal marcado positivo de un elemento, p=vi positiva significa que el elemento absorbe potencia; p negativa significa que entrega potencia. Esta convención evita discusiones eternas con flechas dibujadas a mano alzada." }
      ],
      commonErrors: ["Pensar que 1 A significa que los electrones se mueven a 1 m/s.", "Aplicar V=IR a cualquier dispositivo no lineal.", "Confundir resistencia con resistividad.", "Interpretar una corriente negativa como 'corriente imposible'."],
      connections: ["La convención pasiva simplifica potencia y análisis nodal.", "En lógica digital, la corriente de carga de capacitancias domina muchos transitorios aunque el estado lógico se describa por voltajes."]
    },
    example: {
      problem: "Un resistor ideal de 2,2 kΩ tiene 5 V entre sus terminales. ¿Qué corriente circula en el sentido del terminal de mayor potencial al de menor potencial?",
      steps: [["Convertir", "R=2200 Ω."], ["Ley de Ohm", "I=V/R=5/2200 A."], ["Calcular", "I≈0,0022727 A."], ["Expresar", "I≈2,27 mA."]],
      answer: "≈2,27 mA."
    },
    check: {
      question: "¿Cuál es la unidad SI de conductancia?",
      options: [["Siemens", true], ["Ohm", false], ["Culombio", false]],
      success: "Correcto. G se mide en siemens (S).",
      failure: "La resistencia se mide en ohmios; su recíproco, la conductancia, en siemens."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "2 A durante 3 s transportan cuántos culombios?", answer: "6", hint: "q=It." },
      { level: 2, label: "Normal", prompt: "10 V sobre 5 kΩ producen cuántos mA?", answer: "2", hint: "10/5000 A y convierte a mA." },
      { level: 3, label: "Difícil", prompt: "Conductancia de 250 Ω en mS:", answer: "4", hint: "1/250 S = 0,004 S." }
    ]
  },

  "potencia-energia-kirchhoff": {
    id: "potencia-energia-kirchhoff",
    courseId: 3,
    title: "Potencia, energía y leyes de Kirchhoff",
    shortTitle: "Conservar carga y energía",
    duration: 68,
    objective:
      "calcular potencia y energía con signos coherentes y plantear KCL/KVL como consecuencias del modelo de circuito concentrado y de leyes de conservación.",
    summary: [
      "La potencia instantánea es p(t)=v(t)i(t); la energía transferida es la integral temporal de la potencia.",
      "KCL expresa que la suma algebraica de corrientes en un nodo es cero en el modelo concentrado, salvo que se modele explícitamente acumulación de carga en el nodo.",
      "KVL expresa que la suma algebraica de voltajes alrededor de un lazo es cero bajo las hipótesis habituales del modelo de circuito; campos magnéticos variables enlazando el lazo requieren una formulación electromagnética más general."
    ],
    concept:
      "Kirchhoff no es una colección de trucos de examen: KCL refleja conservación de carga y KVL emerge del modo en que modelamos potenciales y elementos concentrados. La potencia permite comprobar si una solución tiene sentido energético.",
    diagram: ["KCL en nodos", "+", "KVL en lazos", "→", "ecuaciones del circuito"],
    rules: [
      "Con convención pasiva, p=vi>0 significa absorción de potencia y p<0 entrega.",
      "En un resistor ideal, P=I²R=V²/R siempre es no negativa cuando R>0.",
      "Elige una sola convención de signos para KCL o KVL; cambiarla a mitad de cálculo crea errores que parecen física exótica."
    ],
    deep: {
      sections: [
        { title: "KCL y acumulación", body: "Si tratamos un nodo ideal como región sin almacenamiento neto de carga, la suma de corrientes que entran coincide con la que sale. En análisis más detallado, las capacitancias asociadas a nodos sí almacenan carga y aparecen como ramas con corriente C·dv/dt; la conservación sigue intacta." },
        { title: "KVL y Faraday", body: "En electrostática, el campo eléctrico es conservativo y la integral cerrada de E·dl es cero. Si un flujo magnético variable atraviesa un lazo, la ley de Faraday introduce una fuerza electromotriz no conservativa. En circuitos, esa física debe representarse con elementos acoplados o modelos distribuidos adecuados." },
        { title: "Balance de potencia", body: "En cualquier solución consistente, la suma algebraica de potencia de todos los elementos es cero si usamos una convención común: lo entregado por fuentes coincide con lo absorbido o almacenado por otros elementos. Es una herramienta excelente para detectar signos incorrectos." },
        { title: "Energía almacenada", body: "Resistores ideales disipan energía; condensadores e inductores ideales pueden almacenarla y devolverla. Esta diferencia entre elemento disipativo y reactivo será esencial para flancos digitales, filtros y fuentes de alimentación." }
      ],
      commonErrors: ["Sumar magnitudes de corriente sin signos en un nodo.", "Tratar KVL como independiente de las hipótesis electromagnéticas.", "Confundir potencia W con energía J o Wh.", "Usar P=V²/R en un elemento que no es un resistor lineal."],
      connections: ["KCL conduce al análisis nodal y KVL al análisis de mallas.", "El balance de potencia reaparece en regulación, térmica, baterías y consumo de CPU/GPU."]
    },
    example: {
      problem: "Una fuente ideal de 12 V alimenta un resistor de 6 Ω. Calcula corriente y potencias usando convención pasiva.",
      steps: [["Corriente", "I=12/6=2 A."], ["Resistor", "La corriente entra por su terminal positivo: P_R=12·2=24 W absorbidos."], ["Fuente", "La corriente sale por el terminal positivo de la fuente, así que con convención pasiva P_F=−24 W."], ["Balance", "P_R+P_F=24−24=0."]],
      answer: "I=2 A; resistor +24 W, fuente −24 W."
    },
    check: {
      question: "Con convención pasiva, p<0 en un elemento significa que...",
      options: [["está entregando potencia al resto del circuito", true], ["viola conservación de energía", false], ["su resistencia debe ser negativa", false]],
      success: "Correcto. El signo indica dirección neta de transferencia energética respecto a la referencia elegida.",
      failure: "Potencia negativa no es un error: con convención pasiva significa entrega neta."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "5 V y 2 A con convención pasiva: potencia absorbida en W:", answer: "10", hint: "p=vi." },
      { level: 2, label: "Normal", prompt: "Un resistor de 8 Ω conduce 3 A. Potencia en W:", answer: "72", hint: "I²R." },
      { level: 3, label: "Difícil", prompt: "En un nodo entran 5 A y 2 A; salen 4 A y una corriente x. x en A:", answer: "3", hint: "Suma de entradas = suma de salidas." }
    ]
  },

  "serie-paralelo-divisores": {
    id: "serie-paralelo-divisores",
    courseId: 3,
    title: "Serie, paralelo y divisores de tensión",
    shortTitle: "Topología antes que fórmulas",
    duration: 58,
    objective:
      "reconocer conexiones serie/paralelo por topología, obtener equivalentes resistivos y analizar cuándo un divisor de tensión deja de comportarse como la fórmula ideal.",
    summary: [
      "Dos elementos están en serie si comparten la misma corriente por imposición topológica; están en paralelo si comparten el mismo voltaje entre los mismos dos nodos.",
      "Para resistores: R_serie=ΣR y G_paralelo=ΣG.",
      "Un divisor de tensión ideal se carga cuando conectamos una impedancia finita a su salida; entonces cambia la resistencia inferior efectiva."
    ],
    concept:
      "Serie y paralelo no se deciden por cómo está dibujado el circuito, sino por qué nodos comparten los elementos. Las fórmulas de equivalencia son consecuencias de KCL, KVL y la relación constitutiva del resistor.",
    diagram: ["topología", "→ KCL/KVL", "+ V=IR", "→ equivalentes"],
    rules: [
      "En serie ideal, la resistencia equivalente aumenta al añadir resistores positivos.",
      "En paralelo ideal, la resistencia equivalente es menor que la menor resistencia individual positiva.",
      "Para R1 arriba y R2 abajo, sin carga: Vout=Vin·R2/(R1+R2). Con carga RL, sustituye R2 por R2||RL."
    ],
    deep: {
      sections: [
        { title: "Serie es una propiedad de corriente", body: "Si el nodo intermedio entre dos elementos no tiene ninguna otra rama, KCL obliga a que la misma corriente atraviese ambos. Si aparece una tercera rama, ya no puedes declarar serie solo porque los símbolos estén uno detrás de otro." },
        { title: "Paralelo es una propiedad de nodos", body: "Dos elementos en paralelo comparten ambos nodos terminales, así que tienen el mismo voltaje. La orientación gráfica puede ser completamente distinta y seguir siendo el mismo circuito topológico." },
        { title: "Divisor cargado", body: "La fórmula de dos resistores presupone que la salida no entrega corriente adicional. Un ADC, transistor o entrada lógica real puede presentar resistencia/capacitancia finita. Si la carga no es enorme respecto a R2, Vout cae respecto al valor ideal." },
        { title: "Equivalentes y diseño", body: "Elegir resistencias muy grandes reduce corriente estática, pero aumenta impedancia de salida y sensibilidad a fugas, ruido y capacitancias. Elegirlas muy pequeñas mejora rigidez pero desperdicia potencia. El diseño real vive de estos compromisos; lamentablemente no acepta sobornos." }
      ],
      commonErrors: ["Identificar serie/paralelo por la forma del dibujo.", "Aplicar divisor sin considerar la carga.", "Creer que R_eq en paralelo puede superar a todas las ramas positivas.", "Olvidar potencia disipada al elegir valores."],
      connections: ["Los equivalentes de Thévenin simplificarán fuentes reales y entradas.", "Divisores aparecen en sensores, polarización, ADC y referencias lógicas."]
    },
    example: {
      problem: "Vin=10 V, R1=3 kΩ y R2=2 kΩ. Primero sin carga; después con RL=2 kΩ en paralelo con R2.",
      steps: [["Sin carga", "Vout=10·2/(3+2)=4 V."], ["Carga equivalente", "R2||RL=2 kΩ||2 kΩ=1 kΩ."], ["Nuevo divisor", "Vout=10·1/(3+1)=2,5 V."], ["Interpretar", "La carga ha modificado el circuito; no existe una salida idealmente rígida."]],
      answer: "4 V sin carga; 2,5 V con RL=2 kΩ."
    },
    check: {
      question: "Dos resistores positivos en paralelo tienen una resistencia equivalente...",
      options: [["menor que la menor de las dos", true], ["igual a su suma", false], ["siempre mayor que la mayor", false]],
      success: "Correcto. Añadir un camino conductivo aumenta la conductancia total.",
      failure: "En paralelo se suman conductancias, por eso la resistencia equivalente disminuye."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "2 kΩ + 3 kΩ en serie, en kΩ:", answer: "5", hint: "En serie se suman resistencias." },
      { level: 2, label: "Normal", prompt: "Dos resistores de 10 Ω en paralelo: R_eq en Ω:", answer: "5", hint: "Dos iguales en paralelo dan R/2." },
      { level: 3, label: "Difícil", prompt: "Vin=12 V, R1=2 kΩ, R2=4 kΩ sin carga. Vout en V:", answer: "8", hint: "12·4/(2+4)." }
    ]
  },

  "fuentes-tierra-cortos": {
    id: "fuentes-tierra-cortos",
    courseId: 3,
    title: "Fuentes reales, tierra, referencia y cortocircuitos",
    shortTitle: "0 V no es magia",
    duration: 60,
    objective:
      "modelar fuentes con resistencia interna, distinguir referencias de tierra y explicar un cortocircuito mediante impedancia y límites de la fuente.",
    summary: [
      "Una fuente ideal de tensión mantiene V independientemente de I; una fuente ideal de corriente mantiene I independientemente de V. Ninguna existe literalmente en un rango ilimitado.",
      "Una fuente real puede aproximarse localmente mediante una fuente ideal más impedancia interna y límites de tensión, corriente, potencia y estabilidad.",
      "'Tierra' puede significar referencia de circuito, chasis, tierra de protección o conexión física al terreno; no son sinónimos automáticos."
    ],
    concept:
      "Las fuentes reales tienen límites. Un cortocircuito es una conexión de impedancia muy baja entre nodos que se pretendían mantener a distinto potencial; la corriente resultante queda limitada por resistencias, inductancias, protecciones y la propia fuente.",
    diagram: ["fuente ideal", "+ impedancia interna", "→", "fuente real"],
    rules: [
      "No calcules I=V/0 y concluyas 'infinito' para una fuente física: ese infinito es una señal de que el modelo ideal dejó de ser válido.",
      "Mantén separados signal ground, chassis/PE y earth cuando el sistema lo requiera.",
      "Una fuente con resistencia serie R_s tiene V_terminal=V_oc−I·R_s en su modelo lineal simple."
    ],
    deep: {
      sections: [
        { title: "Thévenin como modelo", body: "Cualquier red lineal vista desde dos terminales puede reemplazarse, bajo condiciones apropiadas, por una fuente de tensión de Thévenin y una impedancia equivalente. Para una fuente física, este modelo de primer orden explica caída de tensión bajo carga sin describir toda la electrónica interna." },
        { title: "Corriente de cortocircuito", body: "Con un modelo V_th en serie con R_th, el cortocircuito ideal en terminales produce I_sc=V_th/R_th. En una fuente moderna pueden intervenir current limiting, foldback, protección térmica o apagado. La corriente real puede ser temporal y no lineal." },
        { title: "Qué significa tierra", body: "En un esquema, el símbolo de ground suele elegir el nodo de referencia para potenciales. Protective earth tiene función de seguridad. Chassis ground se refiere a la estructura conductora. Unir o separar estas referencias es una decisión de arquitectura eléctrica, EMC y seguridad, no una cuestión tipográfica." },
        { title: "Bucles de tierra", body: "Si dos equipos tienen múltiples caminos conductivos entre referencias, corrientes de retorno pueden producir diferencias de potencial y acoplar ruido. La frase 'todos los grounds son cero' oculta precisamente el problema: los conductores reales tienen impedancia." }
      ],
      commonErrors: ["Asumir que una fuente de 5 V puede entregar corriente ilimitada.", "Tratar todos los símbolos de tierra como idénticos.", "Creer que un cortocircuito siempre es literalmente 0 Ω.", "Ignorar la impedancia de retorno."],
      connections: ["Los modelos equivalentes son esenciales para ADC, buses, power integrity y fuentes de alimentación.", "Ground bounce e integridad de retorno aparecerán en lógica rápida y PCB."]
    },
    example: {
      problem: "Una fuente se modela como 5 V ideales en serie con 0,5 Ω. ¿Qué tensión terminal entrega a una carga que consume 2 A?",
      steps: [["Caída interna", "ΔV=I·R_s=2·0,5=1 V."], ["Terminal", "Vout=5−1=4 V."], ["Potencia interna", "P=I²R_s=4·0,5=2 W."], ["Interpretar", "La resistencia interna provoca droop y disipación."]],
      answer: "4 V en terminales; 2 W disipados en el modelo de resistencia interna."
    },
    check: {
      question: "En un esquema, elegir un nodo como 0 V significa necesariamente que está conectado físicamente al terreno?",
      options: [["No", true], ["Sí, siempre", false], ["Solo si la corriente es cero", false]],
      success: "Correcto. Una referencia de circuito puede ser flotante respecto a earth.",
      failure: "Referencia de potencial y conexión física a tierra son conceptos distintos."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Fuente 9 V con R_s=1 Ω y carga de 2 A: V_terminal en V:", answer: "7", hint: "9−2·1." },
      { level: 2, label: "Normal", prompt: "Modelo 12 V + 3 Ω serie en cortocircuito: I_sc en A:", answer: "4", hint: "I=V/R_s." },
      { level: 3, label: "Difícil", prompt: "Una fuente 5 V con R_s=0,2 Ω entrega 3 A. Potencia en R_s en W:", answer: "1.8", alternatives: ["1,8"], hint: "I²R_s." }
    ]
  },

  "componentes-reactivos-diodos": {
    id: "componentes-reactivos-diodos",
    courseId: 3,
    title: "Resistores, condensadores, inductores, diodos y LED",
    shortTitle: "Elementos con y sin memoria",
    duration: 78,
    objective:
      "usar las relaciones i=C·dv/dt y v=L·di/dt, calcular energía almacenada y entender el diodo como dispositivo no lineal, no como una caída fija universal.",
    summary: [
      "El resistor ideal relaciona v e i instantáneamente; condensador e inductor introducen estado mediante carga/campo eléctrico y flujo/campo magnético.",
      "Para un condensador ideal i=C·dv/dt y W_C=½CV²; para un inductor ideal v=L·di/dt y W_L=½LI².",
      "Un diodo semiconductor presenta una relación I-V fuertemente no lineal; la aproximación de '0,7 V' para silicio solo es una regla local aproximada, dependiente de corriente, temperatura y dispositivo."
    ],
    concept:
      "R, C y L forman un lenguaje mínimo para describir disipación y almacenamiento de energía. Los diodos añaden no linealidad y direccionalidad aproximada, permitiendo rectificación, protección y emisión de luz en LED.",
    diagram: ["R: disipación", "C: campo eléctrico", "L: campo magnético", "D: no linealidad"],
    rules: [
      "El voltaje de un condensador ideal no puede cambiar instantáneamente sin corriente impulsiva infinita; la corriente de un inductor ideal no puede cambiar instantáneamente sin voltaje impulsivo infinito.",
      "En DC estacionario ideal, un condensador se comporta como circuito abierto y un inductor como cortocircuito; esto no describe el transitorio ni parasíticos.",
      "Un LED necesita limitación de corriente; conectarlo directamente a una fuente rígida porque 'cae 2 V' es una receta educativa para humo."
    ],
    deep: {
      sections: [
        { title: "Condensador", body: "La capacitancia C relaciona carga y voltaje: q=CV en el modelo lineal. Como i=dq/dt, si C es constante obtenemos i=C·dv/dt. Por eso un flanco rápido demanda corriente proporcional a C y a la pendiente de tensión." },
        { title: "Inductor", body: "La inductancia L relaciona flujo enlazado y corriente en un modelo lineal. v=L·di/dt muestra por qué cambios rápidos de corriente generan tensiones significativas incluso con inductancias pequeñas: una pista directa hacia ringing y ground bounce." },
        { title: "Diodo exponencial", body: "Un modelo idealizado de unión usa I≈I_S(exp(V_D/(nV_T))−1) en ciertos regímenes. En dispositivos reales aparecen resistencias serie, recombinación, fugas, ruptura, capacitancias y efectos térmicos. Por eso una única 'tensión de diodo' no es una constante fundamental." },
        { title: "LED", body: "Un LED convierte parte de la energía eléctrica en fotones mediante recombinación radiativa. La tensión directa depende del material, longitud de onda, corriente y temperatura. Se diseña alrededor de corriente y disipación, no eligiendo una batería que 'coincida' con un voltaje nominal." }
      ],
      commonErrors: ["Decir que un condensador 'bloquea DC' sin hablar del régimen estacionario.", "Creer que un inductor siempre es un cable.", "Tratar la caída directa del diodo como constante exacta.", "Conectar LED sin limitar corriente."],
      connections: ["Capacitancia de puertas y pistas controla tiempos de subida y consumo dinámico.", "Inductancias parásitas y diodos de protección aparecen en buses y fuentes conmutadas."]
    },
    example: {
      problem: "Un condensador ideal de 10 nF cambia de 0 V a 3,3 V linealmente en 2 ns. ¿Qué corriente constante requiere durante la rampa?",
      steps: [["Relación", "i=C·ΔV/Δt."], ["Sustituir", "C=10×10⁻⁹ F, ΔV=3,3 V, Δt=2×10⁻⁹ s."], ["Calcular", "i=16,5 A."], ["Interpretar", "El valor enorme muestra por qué capacitancias aparentemente pequeñas y flancos extremos exigen corrientes transitorias grandes; un sistema real limitará la pendiente y tendrá impedancias parásitas."]],
      answer: "16,5 A en el modelo de rampa ideal."
    },
    check: {
      question: "¿Qué variable de un inductor ideal es continua salvo que apliquemos un impulso de tensión ideal?",
      options: [["La corriente", true], ["La resistencia", false], ["La potencia siempre", false]],
      success: "Correcto. v=L·di/dt limita cambios instantáneos de corriente para voltajes finitos.",
      failure: "En un inductor ideal, un salto instantáneo de corriente requeriría un impulso de tensión."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Energía en un condensador de 2 F a 3 V, en J:", answer: "9", hint: "½CV²." },
      { level: 2, label: "Normal", prompt: "C=1 μF y dv/dt=2 V/ms. Corriente en mA:", answer: "2", hint: "1e−6·2000 A." },
      { level: 3, label: "Difícil", prompt: "L=5 mH y di/dt=400 A/s. Voltaje en V:", answer: "2", hint: "v=L·di/dt." }
    ]
  },

  "semiconductores-pn": {
    id: "semiconductores-pn",
    courseId: 3,
    title: "Semiconductores, dopado y unión PN",
    shortTitle: "De bandas a la unión",
    duration: 82,
    objective:
      "explicar cualitativamente bandas, portadores, dopado tipo N/P, región de agotamiento y polarización de una unión PN sin confundir tipo de material con carga neta.",
    summary: [
      "Un semiconductor tiene una estructura de bandas que permite modificar fuertemente su conductividad mediante dopado, temperatura, campos y concentración de portadores.",
      "Material tipo N tiene electrones como portadores mayoritarios; tipo P tiene huecos como portadores mayoritarios. El material macroscópico sigue siendo aproximadamente neutro.",
      "Al formar una unión PN, difusión y campo interno crean una región de agotamiento y una barrera de potencial; la polarización externa modifica esa barrera."
    ],
    concept:
      "El dopado no 'carga' simplemente un cristal positivo o negativo. Introduce estados donadores o aceptores que cambian las concentraciones de portadores. En una unión PN, la redistribución inicial deja iones fijos cerca de la interfaz y genera un campo que se opone a la difusión adicional.",
    diagram: ["dopado N/P", "→ difusión", "→ región de agotamiento", "→ campo interno"],
    rules: [
      "N y P describen portadores mayoritarios, no el signo de carga neta del bloque completo.",
      "Los huecos son una descripción efectiva útil de estados electrónicos vacantes; no son protones viajando por el cristal.",
      "La barrera y anchura de agotamiento dependen de dopado, temperatura y polarización; no son constantes universales."
    ],
    deep: {
      sections: [
        { title: "Bandas y nivel de Fermi", body: "En un cristal, los estados electrónicos forman bandas permitidas separadas por gaps. Dopantes donadores y aceptores desplazan el equilibrio de ocupación y la posición del nivel de Fermi respecto a las bandas, alterando las concentraciones de electrones y huecos." },
        { title: "Difusión y deriva", body: "Los gradientes de concentración impulsan difusión de portadores; el campo eléctrico impulsa deriva. En equilibrio de una unión PN, las corrientes netas se compensan. Esta competencia es más precisa que la explicación infantil de 'los electrones quieren cruzar'." },
        { title: "Región de carga espacial", body: "Cuando electrones y huecos móviles se recombinan cerca de la interfaz, quedan dopantes ionizados fijos. Esa carga espacial crea un campo y una diferencia de potencial incorporada. La región no está literalmente vacía de toda carga, sino empobrecida de portadores móviles mayoritarios." },
        { title: "Polarización", body: "La polarización directa reduce la barrera efectiva y favorece inyección de portadores; la inversa la aumenta y normalmente deja corrientes pequeñas hasta mecanismos de ruptura. Los detalles cuantitativos exigen modelos de dispositivo y parámetros del proceso." }
      ],
      commonErrors: ["Decir que material N tiene carga neta negativa.", "Confundir huecos con partículas positivas fundamentales.", "Tratar la región de agotamiento como vacío.", "Explicar un diodo únicamente como interruptor ideal."],
      connections: ["BJT depende de dos uniones PN acopladas y transporte de portadores.", "MOSFET controla un canal mediante campo eléctrico y estructura MOS, no mediante una única unión PN directa."]
    },
    example: {
      problem: "¿Por qué una pieza de silicio tipo N puede ser eléctricamente neutra aunque tenga más electrones móviles que el silicio intrínseco?",
      steps: [["Dopante donador", "El átomo dopante aporta un electrón adicional fácilmente ionizable."], ["Ion fijo", "Al donar ese electrón queda un ion donador positivo ligado a la red."], ["Balance", "La carga del electrón móvil se compensa con la del ion fijo."], ["Conclusión", "Cambia la concentración de portadores sin convertir todo el material en una carga macroscópica negativa."]],
      answer: "Porque los electrones adicionales están compensados por dopantes ionizados positivos; el material permanece aproximadamente neutro."
    },
    check: {
      question: "En un semiconductor tipo P, los portadores mayoritarios son...",
      options: [["huecos", true], ["protones libres", false], ["fotones", false]],
      success: "Correcto. 'P' describe huecos como portadores mayoritarios, no protones móviles.",
      failure: "Tipo P significa predominio de huecos como portadores móviles efectivos."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "En material tipo N, portador mayoritario (singular):", answer: "electron", alternatives: ["electrones"], hint: "El dopado donador aumenta su concentración." },
      { level: 2, label: "Normal", prompt: "¿El material tipo N es necesariamente macroscópicamente negativo? sí/no", answer: "no", hint: "Considera los iones donadores fijos." },
      { level: 3, label: "Difícil", prompt: "En equilibrio de una unión PN, ¿difusión y deriva netas se compensan? sí/no", answer: "si", hint: "El equilibrio no implica ausencia de procesos microscópicos." }
    ]
  },

  "bjt-mosfet": {
    id: "bjt-mosfet",
    courseId: 3,
    title: "BJT y MOSFET: transistores como dispositivos de control",
    shortTitle: "El transistor no es un interruptor perfecto",
    duration: 88,
    objective:
      "distinguir BJT y MOSFET, interpretar sus terminales y regiones de operación, y explicar por qué los modelos de interruptor son aproximaciones útiles pero incompletas.",
    summary: [
      "Un BJT controla transporte de portadores mediante una estructura de emisor, base y colector; su comportamiento útil suele modelarse con relaciones entre V_BE, I_C e I_B según región y circuito.",
      "Un MOSFET usa un campo eléctrico asociado a la tensión de compuerta respecto a fuente para modificar un canal conductor; la compuerta ideal no consume corriente DC, pero sí debe cargarse y descargarse capacitivamente.",
      "V_GS(th) no es la tensión de 'MOSFET totalmente encendido': es una condición de ensayo para una corriente pequeña especificada en el datasheet."
    ],
    concept:
      "Los transistores permiten que una señal controle otra. En lógica CMOS, el MOSFET es central porque su compuerta presenta gran impedancia DC, pero cada transición mueve carga y encuentra resistencias, capacitancias y límites de corriente reales.",
    diagram: ["señal de control", "→ transistor", "→ corriente/tensión controlada", "→ lógica o amplificación"],
    rules: [
      "Para un MOSFET, razona primero con V_GS y V_DS; las tensiones absolutas respecto a tierra pueden ser irrelevantes si el dispositivo está flotante.",
      "No diseñes conducción usando solo V_GS(th); usa curvas/R_DS(on) especificadas para la tensión de compuerta y condiciones relevantes.",
      "En un BJT usado como switch, 'β forzado' y saturación requieren diseño de corriente de base; el transistor no se vuelve ideal por dibujarlo como interruptor."
    ],
    deep: {
      sections: [
        { title: "BJT", body: "En región activa directa de un BJT, una pequeña variación de V_BE puede producir una gran variación de corriente de colector; modelos aproximados usan I_C≈I_S exp(V_BE/V_T). En conmutación importan corte, saturación, carga almacenada y resistencias del circuito." },
        { title: "MOSFET", body: "En un MOSFET de enriquecimiento, elevar V_GS por encima de un rango adecuado induce o fortalece un canal. Según V_GS y V_DS aparecen regiones que modelos sencillos llaman lineal/triodo y saturación. En electrónica de potencia se usa mucho la región de baja R_DS(on) como switch cerrado." },
        { title: "Carga de compuerta", body: "Aunque la corriente DC ideal de gate es casi nula, el driver debe mover carga para cambiar V_GS. Las capacitancias son no lineales y los datasheets suelen especificar gate charge Q_g. A alta frecuencia, P≈Q_g·V_drive·f es una estimación útil de potencia de excitación bajo ciertas condiciones." },
        { title: "Diodo de cuerpo y límites", body: "MOSFET de potencia discretos incorporan una unión parásita que aparece como body diode en el modelo. Además hay máximos de V_DS, V_GS, corriente, SOA y temperatura. Un transistor que 'funciona en SPICE' pero viola estos límites está haciendo una audición para convertirse en humo." }
      ],
      commonErrors: ["Usar V_GS(th) como tensión de conducción completa.", "Creer que la compuerta MOSFET nunca consume corriente.", "Confundir saturación de BJT con saturación de MOSFET: son regímenes con significado distinto.", "Ignorar referencias source/emitter al medir tensiones de control."],
      connections: ["La lógica CMOS combinará NMOS y PMOS para reducir corriente estática ideal.", "Gate charge, Miller y parasíticos explican tiempos de conmutación y pérdidas dinámicas."]
    },
    example: {
      problem: "Un driver carga una compuerta con Q_g≈20 nC desde 0 a 5 V, 500 000 veces por segundo. Estima la potencia media asociada a carga de gate con P≈Q_g·V·f.",
      steps: [["Carga por ciclo", "Q_g=20×10⁻⁹ C."], ["Energía aproximada por transición de carga", "E≈Q_g·V=20 nC·5 V=100 nJ."], ["Frecuencia", "f=5×10⁵ s⁻¹."], ["Potencia", "P≈100 nJ·5×10⁵=0,05 W."]],
      answer: "≈50 mW para esta estimación simplificada."
    },
    check: {
      question: "¿Qué significa V_GS(th) en un datasheet MOSFET?",
      options: [["Una condición de umbral definida a una corriente de prueba especificada", true], ["La tensión exacta a la que R_DS(on)=0", false], ["La tensión máxima absoluta de gate", false]],
      success: "Correcto. Para diseñar conducción se consultan R_DS(on), curvas y condiciones de prueba, no solo el threshold.",
      failure: "V_GS(th) no equivale a 'fully on'; está definido bajo una condición de corriente pequeña especificada."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "Terminal de control de un MOSFET (inglés o español):", answer: "gate", alternatives: ["compuerta", "puerta"], hint: "G en G-D-S." },
      { level: 2, label: "Normal", prompt: "Q_g=10 nC, V=5 V, f=1 MHz. P≈Q_gVf en W:", answer: "0.05", alternatives: ["0,05"], hint: "10e−9·5·1e6." },
      { level: 3, label: "Difícil", prompt: "¿V_GS debe medirse gate respecto a source? sí/no", answer: "si", hint: "El subíndice GS ya te lo está confesando." }
    ]
  },

  "ruido-parasiticos-flancos": {
    id: "ruido-parasiticos-flancos",
    courseId: 3,
    title: "Ruido, capacitancia/inductancia parásita y tiempos de subida",
    shortTitle: "Los cables también tienen opiniones",
    duration: 76,
    objective:
      "explicar cómo parasíticos y flancos finitos producen retardo, overshoot, ringing y acoplo, y distinguir frecuencia de reloj de contenido espectral de los bordes.",
    summary: [
      "Todo conductor y componente real presenta capacitancias, inductancias y resistencias distribuidas; llamarlas 'parásitas' no las hace opcionales.",
      "Flancos más rápidos requieren mayor ancho de banda y producen mayores dv/dt y di/dt, haciendo visibles acoplos y parasíticos.",
      "La frecuencia de reloj no determina por sí sola si una interconexión es de alta velocidad: el tiempo de subida/bajada y la longitud eléctrica son críticos."
    ],
    concept:
      "Una señal digital es analógica mientras viaja. El receptor decide símbolos discretos a partir de una forma de onda continua que puede sufrir pérdidas, reflexiones, acoplo y ruido. La integridad digital nace de diseñar bien la física analógica.",
    diagram: ["driver", "→ interconexión RLC", "→ forma de onda", "→ umbral del receptor"],
    rules: [
      "Pequeña L con gran di/dt puede producir V=L·di/dt apreciable; pequeña C con gran dv/dt puede demandar I=C·dv/dt apreciable.",
      "Un flanco más rápido contiene componentes espectrales más altas aunque la tasa de repetición sea baja.",
      "Cuando el tiempo de propagación de la interconexión deja de ser pequeño respecto al tiempo de subida, el modelo de nodo concentrado pierde precisión y conviene pensar en líneas de transmisión."
    ],
    deep: {
      sections: [
        { title: "Ruido térmico y determinista", body: "Ruido puede referirse a procesos aleatorios como ruido térmico o shot noise, pero en sistemas digitales muchos problemas se deben a interferencia determinista: crosstalk, rebote de referencia, ripple de alimentación o EMI. Diagnosticar exige separar fuentes y caminos de acoplo." },
        { title: "RC y tiempo de subida", body: "Una carga capacitiva C conducida a través de una resistencia efectiva R produce una respuesta de primer orden con constante τ=RC. El tiempo 10–90 % de una exponencial simple es aproximadamente 2,2RC. Es una aproximación potente para intuir por qué más capacitancia o menor drive ralentizan flancos." },
        { title: "Inductancia y ringing", body: "Una inductancia parásita junto con capacitancia puede formar una resonancia. Transiciones rápidas inyectan energía y aparecen overshoot/undershoot y ringing. La resistencia y pérdidas amortiguan la oscilación; resistencias serie de terminación pueden ser una herramienta deliberada de control." },
        { title: "Longitud eléctrica", body: "No existe una frontera universal de 'MHz altos'. Una pista puede requerir tratamiento de línea de transmisión si el retardo de propagación es una fracción significativa del tiempo de subida. Por eso una señal de 1 MHz con flancos de 200 ps puede ser mucho más exigente que una senoide de 50 MHz." }
      ],
      commonErrors: ["Mirar solo la frecuencia de reloj.", "Creer que parasíticos son fallos de fabricación eliminables por completo.", "Interpretar todo ringing como ruido aleatorio.", "Medir una señal rápida con una sonda cuya conexión a tierra introduce gran inductancia y luego culpar al circuito."],
      connections: ["Setup/hold y metastabilidad dependen de cuándo la forma de onda cruza umbrales.", "PCB, buses, DDR, PCIe y USB profundizarán en retorno, impedancia y terminación."]
    },
    example: {
      problem: "Una salida puede modelarse como R=25 Ω cargando C=20 pF. Estima τ y el tiempo de subida 10–90 % de primer orden.",
      steps: [["Constante RC", "τ=25·20 pF=500 ps=0,5 ns."], ["Regla 10–90 %", "t_r≈2,2τ."], ["Calcular", "t_r≈1,1 ns."], ["Interpretar", "Aunque la señal lógica solo tenga dos estados, la transición tarda tiempo y contiene dinámica analógica."]],
      answer: "τ≈0,5 ns; t_r(10–90 %)≈1,1 ns."
    },
    check: {
      question: "Para decidir si una pista digital debe tratarse como línea de transmisión, ¿qué variable es especialmente relevante además de la longitud?",
      options: [["El tiempo de subida/bajada", true], ["El nombre de la señal", false], ["El valor lógico promedio", false]],
      success: "Correcto. La comparación entre retardo de propagación y duración del flanco es clave.",
      failure: "Los bordes, no solo la frecuencia de repetición, fijan cuánto contenido de alta frecuencia debe transportar la interconexión."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "R=100 Ω y C=10 nF. τ en μs:", answer: "1", hint: "100·10e−9 s." },
      { level: 2, label: "Normal", prompt: "L=2 nH y di/dt=1 A/ns. V=L·di/dt en V:", answer: "2", hint: "1 A/ns = 1e9 A/s." },
      { level: 3, label: "Difícil", prompt: "Para RC de primer orden con τ=3 ns, t_r 10–90 % aproximado en ns:", answer: "6.6", alternatives: ["6,6"], hint: "≈2,2τ." }
    ]
  },

  "potencia-calor-integridad": {
    id: "potencia-calor-integridad",
    courseId: 3,
    title: "Consumo, calor e integridad de señal",
    shortTitle: "La energía termina calentando algo",
    duration: 78,
    objective:
      "hacer presupuestos básicos de potencia y temperatura, distinguir consumo estático/dinámico y conectar alimentación, retorno, ruido y márgenes lógicos con integridad de señal.",
    summary: [
      "La energía eléctrica no desaparece: puede almacenarse, transferirse, radiarse o disiparse finalmente como calor.",
      "En CMOS idealizado, una contribución dominante de potencia dinámica escala aproximadamente como α·C·V²·f; los circuitos reales también tienen fugas y corriente de cortocircuito durante transiciones.",
      "La integridad de señal depende tanto del camino de ida como del retorno y de la estabilidad de las referencias de alimentación/masa."
    ],
    concept:
      "Una señal es válida si llega al receptor dentro de márgenes de tensión y tiempo. Eso exige gestionar potencia, impedancias y retornos: si la referencia del receptor se mueve, incluso una forma de onda 'perfecta' respecto a otra tierra puede cruzar mal el umbral.",
    diagram: ["energía", "→ conmutación/pérdidas", "→ calor + ruido", "→ márgenes"],
    rules: [
      "Para una resistencia térmica θ_JA simplificada, ΔT≈P·θ_JA solo es una estimación bajo las condiciones asociadas a ese parámetro; layout y flujo de aire importan.",
      "Reducir tensión puede reducir fuertemente potencia dinámica idealizada por el término V², pero frecuencia, fugas y límites de temporización cambian también.",
      "Un buen camino de retorno es parte de la interconexión; cortar planos o forzar retornos largos aumenta inductancia de bucle y EMI."
    ],
    deep: {
      sections: [
        { title: "Potencia dinámica CMOS", body: "Cargar una capacitancia efectiva desde 0 a V extrae energía de la alimentación. En un modelo simplificado, la actividad α, capacitancia C, tensión V y frecuencia f producen P_dyn≈αCV²f. La constante exacta depende de cómo se defina α y de la actividad considerada, pero la dependencia cuadrática con V es una intuición central." },
        { title: "Fugas y short-circuit current", body: "Transistores reales conducen algo incluso en estados estáticos y, durante un flanco, redes pull-up y pull-down pueden conducir simultáneamente durante un intervalo. Tecnologías, temperatura, Vth y diseño determinan cuánto pesan estas contribuciones." },
        { title: "Térmica", body: "La temperatura de unión influye en fiabilidad, fugas y parámetros eléctricos. Resistencias térmicas de datasheet son modelos de red bajo condiciones de ensayo; no sustituyen análisis térmico detallado. Un componente de 1 W puede estar frío o cocinarse según encapsulado y evacuación de calor." },
        { title: "Power integrity y retorno", body: "Los cambios de corriente atraviesan una red de distribución con resistencia e inductancia. Desacoplos locales aportan carga a escalas rápidas y ayudan a limitar variaciones de alimentación. El retorno sigue el camino de menor impedancia, que a alta frecuencia está fuertemente condicionado por geometría y campos, no solo por resistencia DC." }
      ],
      commonErrors: ["Suponer P_dyn=CV²f como ley completa para cualquier chip.", "Usar θ_JA fuera de contexto como temperatura garantizada.", "Pensar que ground es equipotencial a cualquier frecuencia.", "Optimizar el camino de señal e ignorar el retorno."],
      connections: ["Microarquitectura y performance volverán sobre energía por operación y límites térmicos.", "PCB y hardware profundizarán en power planes, desacoplo, impedancia y EMC."]
    },
    example: {
      problem: "Una carga efectiva de 40 pF conmuta con actividad α=0,25, V=1,2 V y f=500 MHz. Estima P_dyn≈αCV²f.",
      steps: [["Cuadrado de tensión", "V²=1,44."], ["Producto", "0,25·40e−12·1,44·500e6."], ["Resultado", "P≈0,0072 W."], ["Interpretar", "≈7,2 mW para esa capacitancia efectiva bajo este modelo simplificado, sin incluir fugas ni otras pérdidas."]],
      answer: "≈7,2 mW."
    },
    check: {
      question: "En el modelo P_dyn≈αCV²f, reducir V un 10 % manteniendo lo demás constante multiplica esa potencia por aproximadamente...",
      options: [["0,81", true], ["0,90", false], ["0,10", false]],
      success: "Correcto: (0,9)²=0,81.",
      failure: "La dependencia idealizada es cuadrática: 0,9²=0,81."
    },
    practice: [
      { level: 1, label: "Básico", prompt: "2 W con θ=30 °C/W producen ΔT estimado en °C:", answer: "60", hint: "ΔT=Pθ." },
      { level: 2, label: "Normal", prompt: "Si V se reduce a la mitad y todo lo demás queda igual, P_dyn idealizada se multiplica por:", answer: "0.25", alternatives: ["0,25", "1/4"], hint: "(1/2)²." },
      { level: 3, label: "Difícil", prompt: "α=0,5, C=20 pF, V=1 V, f=100 MHz. P_dyn en mW:", answer: "1", hint: "0,5·20e−12·1·100e6 = 1e−3 W." }
    ]
  }
});
