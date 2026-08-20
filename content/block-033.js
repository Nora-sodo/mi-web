/**
 * BLOQUE 033 — Señales y FFT
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar fenómeno, muestreo, representación espectral y
 * algoritmo. FFT calcula una DFT; no elimina aliasing, leakage ni las hipótesis
 * físicas que determinan qué información existe en las muestras.
 */
window.LEARNING_PATHS[33] = {
  "level": "Experto progresivo",
  "estimatedHours": 106,
  "description": "Procesamiento de señales desde modelos continuos/discretos y Fourier hasta DFT/FFT, muestreo, aliasing, filtrado y aplicaciones en audio, imagen, telecomunicaciones e IA.",
  "outcomes": [
    "Modelar señales y sistemas LTI distinguiendo dominio, unidades, frecuencia, fase, energía y potencia.",
    "Interpretar Fourier, DFT y FFT sin confundir transformación matemática, ventana de observación y algoritmo.",
    "Diseñar muestreo y filtrado considerando Nyquist-Shannon, aliasing, leakage, estabilidad y condiciones reales.",
    "Aplicar DSP a audio, imagen, telecomunicaciones, demoscene e IA con pipelines reproducibles y convenciones explícitas."
  ],
  "modules": [
    {
      "id": "m1-signals-frequency",
      "title": "Señales y frecuencia",
      "description": "Modelos continuos/discretos, sinusoides y Fourier",
      "lessons": [
        "sig-continuous-discrete",
        "sig-sinusoids-frequency-phase",
        "sig-complex-exponentials",
        "sig-fourier-transform"
      ]
    },
    {
      "id": "m2-dft-fft-convolution",
      "title": "DFT, FFT y convolución",
      "description": "Espectro finito, algoritmos rápidos y sistemas LTI",
      "lessons": [
        "sig-dft",
        "sig-fft",
        "sig-convolution"
      ]
    },
    {
      "id": "m3-sampling-filtering",
      "title": "Muestreo y filtrado",
      "description": "Nyquist-Shannon, aliasing, ventanas y filtros",
      "lessons": [
        "sig-sampling",
        "sig-aliasing-nyquist",
        "sig-spectra-windowing",
        "sig-filters-lti"
      ]
    },
    {
      "id": "m4-applications",
      "title": "Aplicaciones",
      "description": "Audio, imagen, telecomunicaciones, demoscene e IA",
      "lessons": [
        "sig-audio",
        "sig-image-telecom",
        "sig-integration-ai-demoscene"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "sig-continuous-discrete": {
    "id": "sig-continuous-discrete",
    "courseId": 33,
    "title": "Señales continuas y discretas",
    "shortTitle": "Señales continuas y discretas",
    "duration": 88,
    "objective": "modelar señales continuas y discretas, distinguir dominio, amplitud y muestreo, y razonar sobre energía y potencia sin confundir representación con fenómeno físico.",
    "summary": [
      "Una señal es una función de una o más variables independientes; continua/discreta describe el dominio, no necesariamente la amplitud.",
      "Una secuencia x[n] no es simplemente una función continua dibujada con puntos: su índice entero cambia qué operaciones y transformaciones tienen sentido.",
      "Energía y potencia son descriptores distintos; una señal periódica ideal suele tener energía infinita pero potencia media finita."
    ],
    "concept": "Una señal es una función de una o más variables independientes; continua/discreta describe el dominio, no necesariamente la amplitud.",
    "rules": [
      "Una señal es una función de una o más variables independientes; continua/discreta describe el dominio, no necesariamente la amplitud.",
      "Una secuencia x[n] no es simplemente una función continua dibujada con puntos: su índice entero cambia qué operaciones y transformaciones tienen sentido.",
      "Energía y potencia son descriptores distintos; una señal periódica ideal suele tener energía infinita pero potencia media finita."
    ],
    "deep": {
      "intro": "modelar señales continuas y discretas, distinguir dominio, amplitud y muestreo, y razonar sobre energía y potencia sin confundir representación con fenómeno físico.",
      "sections": [
        {
          "title": "Dominio frente a amplitud",
          "body": "x(t) usa un dominio temporal continuo; x[n] vive sobre índices enteros. La amplitud puede ser continua o cuantizada en ambos modelos según la aplicación, así que tiempo discreto no significa automáticamente señal digital."
        },
        {
          "title": "Operaciones básicas",
          "body": "Desplazar, invertir y escalar el eje temporal cambia el argumento: x(t-t0), x(-t), x(at). En tiempo discreto algunas operaciones de escalado temporal no producen índices enteros y requieren definir interpolación o remuestreo."
        },
        {
          "title": "Energía y potencia",
          "body": "Para energía se integran/suman magnitudes al cuadrado; para potencia se usa un promedio temporal apropiado. Una sinusoidal eterna no es señal de energía finita, pero sí tiene potencia media finita."
        },
        {
          "title": "Modelos y medición",
          "body": "Una señal medida incluye ancho de banda del sensor, ruido, cuantización y reloj. El vector guardado en memoria es una representación de la observación, no el fenómeno físico completo."
        }
      ]
    },
    "example": {
      "problem": "Una señal x(t)=cos(2π100t) se observa cada 1 ms.",
      "steps": [
        "El dominio original es continuo.",
        "La frecuencia de muestreo es 1000 Hz.",
        "La secuencia es x[n]=cos(2π·100·n/1000)."
      ],
      "solution": "La secuencia conserva solo los valores tomados por el muestreador."
    },
    "check": {
      "question": "¿Una señal de tiempo discreto tiene que tener amplitud cuantizada?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo si es periódica",
          false
        ]
      ],
      "feedback": "Discreto describe aquí el dominio temporal; cuantización de amplitud es otra operación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿x[n] está definida, en el modelo usual, sobre índices enteros? sí/no",
        "answer": "si",
        "hint": "Tiempo discreto usa n∈Z."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Una señal periódica ideal no nula extendida para todo tiempo, ¿suele tener energía total finita? sí/no",
        "answer": "no",
        "hint": "Su duración infinita hace divergir la energía."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cuantizar amplitud y muestrear tiempo son exactamente la misma operación? sí/no",
        "answer": "no",
        "hint": "Afectan ejes conceptualmente distintos."
      }
    ]
  },
  "sig-sinusoids-frequency-phase": {
    "id": "sig-sinusoids-frequency-phase",
    "courseId": 33,
    "title": "Frecuencia, fase y sinusoides",
    "shortTitle": "Frecuencia, fase y sinusoides",
    "duration": 92,
    "objective": "interpretar frecuencia, fase, amplitud y frecuencia angular, y reconocer equivalencias y ambigüedades en sinusoides continuas y discretas.",
    "summary": [
      "En x(t)=A cos(2πft+φ), f mide ciclos por segundo y ω=2πf rad/s; φ fija el desplazamiento de fase respecto de una referencia.",
      "En tiempo discreto, frecuencias que difieren en múltiplos enteros de 2π rad/muestra producen exactamente la misma secuencia compleja.",
      "La fase solo tiene significado relativo a una referencia temporal o entre componentes; no es una etiqueta absoluta independiente del origen temporal."
    ],
    "concept": "En x(t)=A cos(2πft+φ), f mide ciclos por segundo y ω=2πf rad/s; φ fija el desplazamiento de fase respecto de una referencia.",
    "rules": [
      "En x(t)=A cos(2πft+φ), f mide ciclos por segundo y ω=2πf rad/s; φ fija el desplazamiento de fase respecto de una referencia.",
      "En tiempo discreto, frecuencias que difieren en múltiplos enteros de 2π rad/muestra producen exactamente la misma secuencia compleja.",
      "La fase solo tiene significado relativo a una referencia temporal o entre componentes; no es una etiqueta absoluta independiente del origen temporal."
    ],
    "deep": {
      "intro": "interpretar frecuencia, fase, amplitud y frecuencia angular, y reconocer equivalencias y ambigüedades en sinusoides continuas y discretas.",
      "sections": [
        {
          "title": "Parámetros sinusoidales",
          "body": "A controla amplitud, f u ω la rapidez de oscilación y φ la fase inicial. Periodo T=1/f para f>0 y ω=2πf."
        },
        {
          "title": "Fase y desplazamiento",
          "body": "Desplazar una sinusoidal en tiempo cambia fase: cos(ω(t-t0)+φ)=cos(ωt+φ-ωt0). Por eso comparar fases exige una referencia de tiempo común."
        },
        {
          "title": "Frecuencia discreta periódica",
          "body": "e^{j(Ω+2πk)n}=e^{jΩn}; Ω y Ω+2πk son indistinguibles para n entero. Ésta es una de las raíces algebraicas del aliasing."
        },
        {
          "title": "Frecuencia negativa",
          "body": "En representación compleja, frecuencias positivas y negativas son distintas. Para señales reales, sus componentes espectrales aparecen conjugadas, lo que permite reconstruir una señal real."
        }
      ]
    },
    "example": {
      "problem": "Compara cos(2π·50t) y cos(2π·50t+π).",
      "steps": [
        "Ambas tienen 50 Hz.",
        "La diferencia de fase es π rad.",
        "cos(θ+π)=-cos θ."
      ],
      "solution": "Son opuestas en cada instante, no señales de distinta frecuencia."
    },
    "check": {
      "question": "En tiempo discreto, ¿Ω y Ω+2π generan la misma exponencial compleja e^{jΩn}?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ],
        [
          "Solo para n par",
          false
        ]
      ],
      "feedback": "Para n entero, e^{j2πn}=1."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Convierte 25 Hz a frecuencia angular en rad/s.",
        "answer": "50pi",
        "hint": "ω=2πf."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Cambiar el origen temporal puede cambiar la fase medida de una sinusoidal? sí/no",
        "answer": "si",
        "hint": "La fase depende de la referencia temporal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una señal real puede tener un espectro Fourier sin simetría conjugada? sí/no",
        "answer": "no",
        "hint": "Para señales reales, X(-f)=conj(X(f)) bajo las convenciones habituales."
      }
    ]
  },
  "sig-complex-exponentials": {
    "id": "sig-complex-exponentials",
    "courseId": 33,
    "title": "Exponenciales complejas y sistemas LTI",
    "shortTitle": "Exponenciales complejas y sistemas LTI",
    "duration": 94,
    "objective": "usar exponenciales complejas como funciones propias de sistemas LTI y conectar frecuencia, fase y respuesta de un sistema.",
    "summary": [
      "Las exponenciales complejas e^{jωt} y e^{jΩn} son funciones propias de sistemas lineales invariantes en el tiempo cuando la respuesta está bien definida.",
      "Un sistema LTI se caracteriza por su respuesta al impulso; su respuesta a una exponencial compleja es la misma frecuencia multiplicada por una ganancia compleja.",
      "La magnitud de H describe ganancia por frecuencia y su argumento describe desplazamiento de fase; ninguna de las dos por separado cuenta toda la respuesta."
    ],
    "concept": "Las exponenciales complejas e^{jωt} y e^{jΩn} son funciones propias de sistemas lineales invariantes en el tiempo cuando la respuesta está bien definida.",
    "rules": [
      "Las exponenciales complejas e^{jωt} y e^{jΩn} son funciones propias de sistemas lineales invariantes en el tiempo cuando la respuesta está bien definida.",
      "Un sistema LTI se caracteriza por su respuesta al impulso; su respuesta a una exponencial compleja es la misma frecuencia multiplicada por una ganancia compleja.",
      "La magnitud de H describe ganancia por frecuencia y su argumento describe desplazamiento de fase; ninguna de las dos por separado cuenta toda la respuesta."
    ],
    "deep": {
      "intro": "usar exponenciales complejas como funciones propias de sistemas LTI y conectar frecuencia, fase y respuesta de un sistema.",
      "sections": [
        {
          "title": "Linealidad e invariancia temporal",
          "body": "LTI significa superposición y que un desplazamiento en la entrada desplaza la salida sin cambiar la regla del sistema. Estas hipótesis son estructurales y deben comprobarse, no asumirse por conveniencia."
        },
        {
          "title": "Exponenciales como eigenfunctions",
          "body": "Si h es la respuesta al impulso, convolucionar h con e^{jωt} produce H(ω)e^{jωt} bajo condiciones apropiadas. La frecuencia se conserva y cambia la amplitud/fase."
        },
        {
          "title": "Respuesta en frecuencia",
          "body": "H(ω) puede verse como transformada de Fourier de h. |H| mide cuánto escala una componente y ∠H cuánto la desfasa."
        },
        {
          "title": "Sistemas reales",
          "body": "Filtros físicos pueden ser no lineales, variantes en tiempo, saturar o cuantizar. El modelo LTI es potentísimo precisamente porque explicita cuándo simplificamos."
        }
      ]
    },
    "example": {
      "problem": "Un sistema LTI real tiene H(ω0)=0.5e^{-jπ/4} y recibe cos(ω0t).",
      "steps": [
        "Representa la cosenoide mediante exponenciales complejas.",
        "La magnitud se escala por 0.5.",
        "La fase se desplaza -π/4."
      ],
      "solution": "La salida sinusoidal ideal es 0.5 cos(ω0t-π/4)."
    },
    "check": {
      "question": "¿Un sistema LTI puede cambiar una exponencial compleja de frecuencia ω a otra frecuencia distinta sin no linealidad/modulación adicional?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Siempre duplica la frecuencia",
          false
        ]
      ],
      "feedback": "La exponencial es función propia: cambia por un factor complejo, no de frecuencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Si |H(f0)|=2, ¿la amplitud de una componente a f0 se multiplica por 2 en el modelo LTI? sí/no",
        "answer": "si",
        "hint": "La magnitud de H es la ganancia."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La fase de H importa para reconstruir una señal temporal? sí/no",
        "answer": "si",
        "hint": "La relación temporal entre componentes depende de fase."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Todo sistema físico es LTI? sí/no",
        "answer": "no",
        "hint": "Es un modelo con hipótesis concretas."
      }
    ]
  },
  "sig-fourier-transform": {
    "id": "sig-fourier-transform",
    "courseId": 33,
    "title": "Series y transformada de Fourier",
    "shortTitle": "Series y transformada de Fourier",
    "duration": 104,
    "objective": "entender Fourier como descomposición en exponenciales complejas, distinguir serie de Fourier y transformada, y razonar sobre dualidad tiempo-frecuencia.",
    "summary": [
      "La serie de Fourier representa señales periódicas mediante armónicos discretos; la transformada de Fourier trata, en un marco más general, espectro continuo de frecuencia.",
      "La transformada no dice que la señal 'esté hecha físicamente' de sinusoides; proporciona coordenadas respecto de una familia de funciones base.",
      "Localización en tiempo y localización en frecuencia compiten: concentrar una señal en ambos dominios simultáneamente tiene límites matemáticos."
    ],
    "concept": "La serie de Fourier representa señales periódicas mediante armónicos discretos; la transformada de Fourier trata, en un marco más general, espectro continuo de frecuencia.",
    "rules": [
      "La serie de Fourier representa señales periódicas mediante armónicos discretos; la transformada de Fourier trata, en un marco más general, espectro continuo de frecuencia.",
      "La transformada no dice que la señal 'esté hecha físicamente' de sinusoides; proporciona coordenadas respecto de una familia de funciones base.",
      "Localización en tiempo y localización en frecuencia compiten: concentrar una señal en ambos dominios simultáneamente tiene límites matemáticos."
    ],
    "deep": {
      "intro": "entender Fourier como descomposición en exponenciales complejas, distinguir serie de Fourier y transformada, y razonar sobre dualidad tiempo-frecuencia.",
      "sections": [
        {
          "title": "Serie frente a transformada",
          "body": "Una señal periódica adecuada se expresa como suma de armónicos kf0. Para señales aperiódicas, el paso conceptual lleva a una integral de frecuencias y a X(f)."
        },
        {
          "title": "Transformada e inversa",
          "body": "Con una convención típica, X(f)=∫x(t)e^{-j2πft}dt y x(t)=∫X(f)e^{j2πft}df cuando se cumplen las condiciones correspondientes o en sentidos generalizados."
        },
        {
          "title": "Propiedades estructurales",
          "body": "Linealidad, desplazamiento temporal, modulación, escalado y convolución se traducen en relaciones sencillas entre dominios. Las constantes dependen de la convención de normalización."
        },
        {
          "title": "Tiempo-frecuencia",
          "body": "Una señal muy corta necesita normalmente un espectro más ancho. El principio no significa que una FFT de ventana finita dé simultáneamente tiempo exacto y frecuencia exacta."
        }
      ]
    },
    "example": {
      "problem": "x(t)=cos(2πf0t) idealmente eterna.",
      "steps": [
        "Se expresa como mitad de una exponencial a +f0 y mitad a -f0.",
        "Su espectro ideal tiene líneas en ±f0 en sentido de distribuciones.",
        "No es una señal de energía finita."
      ],
      "solution": "La representación espectral depende de la convención usada."
    },
    "check": {
      "question": "¿La serie de Fourier y la transformada de Fourier son literalmente la misma fórmula aplicada al mismo tipo de señal?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo si f=0",
          false
        ]
      ],
      "feedback": "Están relacionadas, pero serie y transformada corresponden a estructuras espectrales distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Desplazar una señal en tiempo cambia, en general, la magnitud de su transformada ideal? sí/no",
        "answer": "no",
        "hint": "Introduce un factor de fase."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Multiplicar en tiempo puede relacionarse con convolucionar en frecuencia? sí/no",
        "answer": "si",
        "hint": "Es una propiedad dual de Fourier, con factores según convención."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una cosenoide real ideal produce componentes en +f0 y -f0? sí/no",
        "answer": "si",
        "hint": "La señal real exige simetría conjugada."
      }
    ]
  },
  "sig-dft": {
    "id": "sig-dft",
    "courseId": 33,
    "title": "DFT: espectro finito y periódico",
    "shortTitle": "DFT: espectro finito y periódico",
    "duration": 104,
    "objective": "derivar e interpretar la DFT, mapear bins a frecuencia física y distinguir periodicidad implícita, resolución de bins y resolución espectral.",
    "summary": [
      "La DFT transforma N muestras en N coeficientes de una base de exponenciales complejas discretas y periódicas.",
      "El bin k corresponde a frecuencia k·fs/N antes de reinterpretar los índices por encima de Nyquist como frecuencias negativas.",
      "La separación entre bins fs/N no garantiza que dos tonos cercanos sean resolubles; ventana, SNR, duración y estimador también importan."
    ],
    "concept": "La DFT transforma N muestras en N coeficientes de una base de exponenciales complejas discretas y periódicas.",
    "rules": [
      "La DFT transforma N muestras en N coeficientes de una base de exponenciales complejas discretas y periódicas.",
      "El bin k corresponde a frecuencia k·fs/N antes de reinterpretar los índices por encima de Nyquist como frecuencias negativas.",
      "La separación entre bins fs/N no garantiza que dos tonos cercanos sean resolubles; ventana, SNR, duración y estimador también importan."
    ],
    "deep": {
      "intro": "derivar e interpretar la DFT, mapear bins a frecuencia física y distinguir periodicidad implícita, resolución de bins y resolución espectral.",
      "sections": [
        {
          "title": "Definición",
          "body": "X[k]=Σ_{n=0}^{N-1}x[n]e^{-j2πkn/N}. La inversa recompone las N muestras con una normalización que depende de la convención."
        },
        {
          "title": "Periodicidad de índices",
          "body": "X[k+N]=X[k] y la secuencia de N muestras puede interpretarse como un periodo de una extensión periódica dentro del álgebra DFT."
        },
        {
          "title": "Bins y unidades",
          "body": "Con fs muestras/s, Δf=fs/N. Para k>N/2, una representación centrada los interpreta como frecuencias negativas."
        },
        {
          "title": "Resolución no es solo Δf",
          "body": "Duración de observación, forma de ventana y relación señal-ruido determinan la capacidad de separar componentes. Zero-padding interpola el muestreo del espectro DFT, no añade información nueva."
        }
      ]
    },
    "example": {
      "problem": "N=1000 muestras a fs=1000 Hz.",
      "steps": [
        "Δf=1 Hz.",
        "El bin k=75 corresponde a 75 Hz.",
        "Un tono de 75 Hz que cae exactamente en bin puede concentrarse según la ventana rectangular ideal."
      ],
      "solution": "Zero-padding a 4000 puntos hace la rejilla más densa, pero no crea cuatro veces más datos."
    },
    "check": {
      "question": "¿Zero-padding aumenta la duración real observada de la señal?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo para señales reales",
          false
        ]
      ],
      "feedback": "Añade muestras cero para evaluar la transformada en una rejilla más densa; no añade observaciones."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "fs=48000 Hz y N=1024. ¿Δf en Hz?",
        "answer": "46.875",
        "hint": "Δf=fs/N."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La DFT produce N coeficientes para N muestras? sí/no",
        "answer": "si",
        "hint": "Es una transformación lineal N→N."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un bin spacing menor garantiza por sí solo separar dos tonos arbitrariamente cercanos? sí/no",
        "answer": "no",
        "hint": "Ventana, duración, SNR y modelo importan."
      }
    ]
  },
  "sig-fft": {
    "id": "sig-fft",
    "courseId": 33,
    "title": "FFT: algoritmos para calcular la DFT",
    "shortTitle": "FFT: algoritmos para calcular la DFT",
    "duration": 96,
    "objective": "distinguir la DFT del algoritmo FFT, comprender la reducción de complejidad y reconocer efectos de tamaño, normalización y orden de salida.",
    "summary": [
      "La DFT es la transformación matemática; FFT designa una familia de algoritmos que la calculan de forma mucho más eficiente.",
      "El cálculo directo cuesta O(N²); familias FFT clásicas alcanzan O(N log N) para tamaños y factorizaciones apropiados.",
      "Usar una FFT no cambia por sí mismo aliasing, leakage o resolución física: esos fenómenos vienen del muestreo, la ventana y la observación."
    ],
    "concept": "La DFT es la transformación matemática; FFT designa una familia de algoritmos que la calculan de forma mucho más eficiente.",
    "rules": [
      "La DFT es la transformación matemática; FFT designa una familia de algoritmos que la calculan de forma mucho más eficiente.",
      "El cálculo directo cuesta O(N²); familias FFT clásicas alcanzan O(N log N) para tamaños y factorizaciones apropiados.",
      "Usar una FFT no cambia por sí mismo aliasing, leakage o resolución física: esos fenómenos vienen del muestreo, la ventana y la observación."
    ],
    "deep": {
      "intro": "distinguir la DFT del algoritmo FFT, comprender la reducción de complejidad y reconocer efectos de tamaño, normalización y orden de salida.",
      "sections": [
        {
          "title": "Transformación frente a algoritmo",
          "body": "Decir 'la FFT de la señal' suele ser abreviatura operacional, pero conceptualmente la salida es una DFT calculada mediante un algoritmo FFT."
        },
        {
          "title": "Cooley-Tukey y factorización",
          "body": "Cooley-Tukey divide una DFT de tamaño compuesto en DFTs menores y combina resultados. Potencias de dos son cómodas, pero FFT modernas soportan muchos tamaños."
        },
        {
          "title": "Complejidad y memoria",
          "body": "O(N log N) cambia radicalmente el coste frente a O(N²), aunque constantes, memoria, vectorización y layout importan en implementaciones reales."
        },
        {
          "title": "Convenciones de librería",
          "body": "Orden de bins, normalización, real FFT y signo de la exponencial varían por API. La matemática debe mapearse explícitamente a la convención usada."
        }
      ]
    },
    "example": {
      "problem": "Compara N=1024.",
      "steps": [
        "DFT directa requiere del orden de N² operaciones complejas.",
        "Una FFT radix-2 usa una estructura de ~N log2 N.",
        "1024²≈1,048,576 frente a 1024·10≈10,240 como escala conceptual."
      ],
      "solution": "La salida matemática representa los mismos coeficientes DFT salvo redondeo/convención."
    },
    "check": {
      "question": "¿La FFT es una transformada distinta de la DFT?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo para señales complejas",
          false
        ]
      ],
      "feedback": "FFT es una familia de algoritmos para calcular la DFT."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "log2(1024)=?",
        "answer": "10",
        "hint": "1024=2^10."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una FFT elimina aliasing de una señal ya mal muestreada? sí/no",
        "answer": "no",
        "hint": "Aliasing ocurrió en el muestreo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿FFT de tamaño no potencia de dos es imposible? sí/no",
        "answer": "no",
        "hint": "Existen algoritmos para muchos tamaños y factorizaciones."
      }
    ]
  },
  "sig-convolution": {
    "id": "sig-convolution",
    "courseId": 33,
    "title": "Convolución y respuesta al impulso",
    "shortTitle": "Convolución y respuesta al impulso",
    "duration": 102,
    "objective": "calcular convolución continua/discreta, entenderla como composición de sistemas LTI y conectar convolución temporal con multiplicación espectral.",
    "summary": [
      "La salida de un sistema LTI es la convolución de la entrada con su respuesta al impulso.",
      "La convolución lineal y la convolución circular no son lo mismo; la DFT implementa naturalmente convolución circular.",
      "Zero-padding suficiente permite usar FFT para calcular convolución lineal sin wrap-around."
    ],
    "concept": "La salida de un sistema LTI es la convolución de la entrada con su respuesta al impulso.",
    "rules": [
      "La salida de un sistema LTI es la convolución de la entrada con su respuesta al impulso.",
      "La convolución lineal y la convolución circular no son lo mismo; la DFT implementa naturalmente convolución circular.",
      "Zero-padding suficiente permite usar FFT para calcular convolución lineal sin wrap-around."
    ],
    "deep": {
      "intro": "calcular convolución continua/discreta, entenderla como composición de sistemas LTI y conectar convolución temporal con multiplicación espectral.",
      "sections": [
        {
          "title": "Definición discreta",
          "body": "y[n]=(x*h)[n]=Σ_k x[k]h[n-k]. Cada muestra de salida acumula copias desplazadas y ponderadas de h."
        },
        {
          "title": "Propiedades",
          "body": "La convolución es conmutativa y asociativa bajo condiciones apropiadas; la delta es identidad. La cascada de sistemas LTI corresponde a convolucionar respuestas al impulso."
        },
        {
          "title": "Teorema de convolución",
          "body": "Fourier transforma convolución en multiplicación: Y= XH. Esto hace eficientes filtros largos usando FFT por bloques."
        },
        {
          "title": "Circular frente a lineal",
          "body": "Una DFT de longitud N asume índices módulo N. Para secuencias finitas de longitudes L y M, padding a al menos L+M-1 evita aliasing circular al buscar convolución lineal."
        }
      ]
    },
    "example": {
      "problem": "x=[1,2] y h=[1,1].",
      "steps": [
        "y[0]=1.",
        "y[1]=1+2=3.",
        "y[2]=2."
      ],
      "solution": "La convolución lineal es [1,3,2]."
    },
    "check": {
      "question": "¿Multiplicar dos DFT del mismo tamaño y aplicar IDFT produce por defecto convolución circular?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ],
        [
          "Solo si son reales",
          false
        ]
      ],
      "feedback": "La aritmética DFT es periódica módulo N."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Convoluciona [1,1] con [1,-1].",
        "answer": "1,0,-1",
        "hint": "Calcula las sumas solapadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La delta discreta es identidad para convolución? sí/no",
        "answer": "si",
        "hint": "x*δ=x."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Longitudes 100 y 50: ¿padding mínimo para convolución lineal vía DFT sin wrap-around?",
        "answer": "149",
        "hint": "L+M-1."
      }
    ]
  },
  "sig-sampling": {
    "id": "sig-sampling",
    "courseId": 33,
    "title": "Muestreo y reconstrucción",
    "shortTitle": "Muestreo y reconstrucción",
    "duration": 108,
    "objective": "entender el muestreo ideal como multiplicación por un tren de impulsos, interpretar réplicas espectrales y aplicar Nyquist-Shannon con sus hipótesis.",
    "summary": [
      "Muestrear una señal continua a fs replica su espectro cada fs en frecuencia dentro del modelo ideal.",
      "Si una señal es estrictamente limitada en banda a B Hz y fs>2B, puede reconstruirse idealmente a partir de muestras uniformes mediante interpolación sinc.",
      "El teorema de muestreo no afirma que 'dos muestras por ciclo' sean suficientes para cualquier señal real ni elimina la necesidad de filtros antialias."
    ],
    "concept": "Muestrear una señal continua a fs replica su espectro cada fs en frecuencia dentro del modelo ideal.",
    "rules": [
      "Muestrear una señal continua a fs replica su espectro cada fs en frecuencia dentro del modelo ideal.",
      "Si una señal es estrictamente limitada en banda a B Hz y fs>2B, puede reconstruirse idealmente a partir de muestras uniformes mediante interpolación sinc.",
      "El teorema de muestreo no afirma que 'dos muestras por ciclo' sean suficientes para cualquier señal real ni elimina la necesidad de filtros antialias."
    ],
    "deep": {
      "intro": "entender el muestreo ideal como multiplicación por un tren de impulsos, interpretar réplicas espectrales y aplicar Nyquist-Shannon con sus hipótesis.",
      "sections": [
        {
          "title": "Modelo ideal",
          "body": "Multiplicar x(t) por Σδ(t-nTs) crea muestras impulsivas. En frecuencia aparecen copias de X(f) espaciadas fs=1/Ts."
        },
        {
          "title": "Nyquist-Shannon",
          "body": "Para una señal bandlimited a B y muestreo uniforme ideal, fs>2B evita solapamiento entre réplicas. Casos de igualdad requieren cuidado de soporte y componentes en el borde."
        },
        {
          "title": "Reconstrucción sinc",
          "body": "Bajo las hipótesis ideales, x(t)=Σ x[n] sinc((t-nTs)/Ts) con la escala apropiada. Es una fórmula teórica, no una obligación de implementar un sinc infinito."
        },
        {
          "title": "Sistemas reales",
          "body": "ADC, sample-and-hold, jitter, filtros analógicos y cuantización introducen limitaciones adicionales. Antes de muestrear se usa típicamente un filtro antialias apropiado."
        }
      ]
    },
    "example": {
      "problem": "Señal estrictamente limitada a 8 kHz.",
      "steps": [
        "fs=20 kHz >16 kHz.",
        "Las réplicas ideales no se solapan.",
        "En el modelo ideal la señal puede reconstruirse."
      ],
      "solution": "En hardware real todavía importan transición del filtro, jitter y cuantización."
    },
    "check": {
      "question": "¿Nyquist-Shannon garantiza reconstrucción perfecta de cualquier señal si fs es grande?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo si N es potencia de dos",
          false
        ]
      ],
      "feedback": "Exige hipótesis como limitación de banda y muestreo ideal/uniforme."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Para B=6 kHz, ¿fs=15 kHz supera 2B? sí/no",
        "answer": "si",
        "hint": "15>12."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un filtro antialias se coloca conceptualmente antes del ADC? sí/no",
        "answer": "si",
        "hint": "Limita contenido que se plegaría al muestrear."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Dos muestras por periodo de una sinusoidal garantizan una estimación robusta de fase/amplitud en cualquier situación? sí/no",
        "answer": "no",
        "hint": "El teorema tiene hipótesis y la igualdad de Nyquist es un borde delicado."
      }
    ]
  },
  "sig-aliasing-nyquist": {
    "id": "sig-aliasing-nyquist",
    "courseId": 33,
    "title": "Aliasing y frecuencia de Nyquist",
    "shortTitle": "Aliasing y frecuencia de Nyquist",
    "duration": 102,
    "objective": "predecir aliasing, distinguir frecuencia de Nyquist de tasa de Nyquist y diseñar estrategias de prevención antes del muestreo o remuestreo.",
    "summary": [
      "Aliasing ocurre cuando componentes distintas del continuo producen la misma secuencia de muestras.",
      "La frecuencia de Nyquist para un muestreo fs es fs/2; la tasa de Nyquist de una señal bandlimited a B es 2B.",
      "Una vez que dos componentes han aliasado en las mismas muestras, no pueden separarse únicamente a partir de esa secuencia sin información adicional."
    ],
    "concept": "Aliasing ocurre cuando componentes distintas del continuo producen la misma secuencia de muestras.",
    "rules": [
      "Aliasing ocurre cuando componentes distintas del continuo producen la misma secuencia de muestras.",
      "La frecuencia de Nyquist para un muestreo fs es fs/2; la tasa de Nyquist de una señal bandlimited a B es 2B.",
      "Una vez que dos componentes han aliasado en las mismas muestras, no pueden separarse únicamente a partir de esa secuencia sin información adicional."
    ],
    "deep": {
      "intro": "predecir aliasing, distinguir frecuencia de Nyquist de tasa de Nyquist y diseñar estrategias de prevención antes del muestreo o remuestreo.",
      "sections": [
        {
          "title": "Equivalencia discreta",
          "body": "Una sinusoidal continua de frecuencia f y otra f+kfs pueden generar las mismas muestras, con consideraciones de signo/fase para señales reales."
        },
        {
          "title": "Foldover",
          "body": "Para señales reales muestreadas, frecuencias por encima de fs/2 se pliegan al intervalo base. La frecuencia alias puede calcularse módulo fs y reflejarse respecto de fs/2."
        },
        {
          "title": "Dos usos de Nyquist",
          "body": "Frecuencia de Nyquist=fs/2 pertenece al sistema de muestreo. Tasa de Nyquist=2B pertenece a una señal limitada en banda. Confundirlos invierte causa y requisito."
        },
        {
          "title": "Prevención",
          "body": "Filtrar antes de downsampling y elegir fs con banda de transición suficiente son decisiones de diseño. Upsampling posterior no recupera información que ya se perdió por aliasing."
        }
      ]
    },
    "example": {
      "problem": "Muestrea una sinusoidal de 900 Hz a fs=1000 Hz.",
      "steps": [
        "900 Hz está 100 Hz por debajo de fs=1000 en equivalencia modular.",
        "Para señal real aparece como componente de 100 Hz con fase/signo correspondiente.",
        "Las muestras no permiten decidir por sí solas si el origen era 100 o 900 Hz."
      ],
      "solution": "Se necesita conocimiento previo o un filtro antes del ADC."
    },
    "check": {
      "question": "Para fs=48 kHz, ¿la frecuencia de Nyquist es 24 kHz?",
      "options": [
        [
          "Sí",
          true
        ],
        [
          "No",
          false
        ],
        [
          "48 kHz",
          false
        ]
      ],
      "feedback": "Es fs/2."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Sinusoidal 7 kHz muestreada a 8 kHz: ¿alias base en Hz?",
        "answer": "1000",
        "hint": "7 kHz se refleja a 1 kHz."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La tasa de Nyquist de una señal bandlimited a 5 kHz es 10 kHz? sí/no",
        "answer": "si",
        "hint": "2B."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Upsampling digital después de aliasing recupera por sí solo la frecuencia original? sí/no",
        "answer": "no",
        "hint": "La ambigüedad ya está en los datos."
      }
    ]
  },
  "sig-spectra-windowing": {
    "id": "sig-spectra-windowing",
    "courseId": 33,
    "title": "Espectros, ventanas y leakage",
    "shortTitle": "Espectros, ventanas y leakage",
    "duration": 106,
    "objective": "interpretar espectros de registros finitos, explicar leakage y trade-offs de ventanas, y distinguir amplitud espectral, densidad espectral y resolución.",
    "summary": [
      "Observar un tramo finito equivale a multiplicar por una ventana; en frecuencia eso convoluciona el espectro con la transformada de la ventana.",
      "Leakage no es un bug de la FFT: aparece porque una observación finita rara vez contiene un número entero de periodos bajo la extensión implícita.",
      "Las ventanas intercambian ancho del lóbulo principal, nivel de lóbulos laterales, ganancia coherente y ancho de banda equivalente de ruido."
    ],
    "concept": "Observar un tramo finito equivale a multiplicar por una ventana; en frecuencia eso convoluciona el espectro con la transformada de la ventana.",
    "rules": [
      "Observar un tramo finito equivale a multiplicar por una ventana; en frecuencia eso convoluciona el espectro con la transformada de la ventana.",
      "Leakage no es un bug de la FFT: aparece porque una observación finita rara vez contiene un número entero de periodos bajo la extensión implícita.",
      "Las ventanas intercambian ancho del lóbulo principal, nivel de lóbulos laterales, ganancia coherente y ancho de banda equivalente de ruido."
    ],
    "deep": {
      "intro": "interpretar espectros de registros finitos, explicar leakage y trade-offs de ventanas, y distinguir amplitud espectral, densidad espectral y resolución.",
      "sections": [
        {
          "title": "Registro finito",
          "body": "Una señal infinita se multiplica por w[n]. El espectro observado depende tanto de la señal como de W."
        },
        {
          "title": "Leakage",
          "body": "Con ventana rectangular, discontinuidades en la extensión periódica dispersan energía por bins. Un tono exacto en bin bajo condiciones ideales puede evitar gran parte del leakage."
        },
        {
          "title": "Ventanas clásicas",
          "body": "Hann, Hamming, Blackman y otras tienen compromisos distintos. No existe una ventana universalmente 'mejor' sin criterio de detección/medición."
        },
        {
          "title": "PSD y escalado",
          "body": "Magnitud de DFT, espectro de amplitud y power spectral density tienen unidades y normalizaciones diferentes. Comparar gráficos exige declarar escala, ventana y ancho de banda."
        }
      ]
    },
    "example": {
      "problem": "Un tono de 60.5 Hz se analiza con fs=1024, N=1024.",
      "steps": [
        "Δf=1 Hz.",
        "60.5 Hz cae entre bins.",
        "Ventana rectangular reparte energía en múltiples bins."
      ],
      "solution": "Cambiar a Hann reduce lóbulos laterales pero ensancha el lóbulo principal."
    },
    "check": {
      "question": "¿Leakage espectral desaparece simplemente por usar cualquier FFT más rápida?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo con radix-2",
          false
        ]
      ],
      "feedback": "Es un efecto de observación/ventana, no de complejidad algorítmica."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "fs=2000 Hz, N=2000. ¿bin spacing?",
        "answer": "1",
        "hint": "fs/N."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una ventana con lóbulos laterales menores suele pagar algún coste en anchura del lóbulo principal u otra métrica? sí/no",
        "answer": "si",
        "hint": "Las ventanas implican trade-offs."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Magnitude spectrum y PSD tienen necesariamente las mismas unidades? sí/no",
        "answer": "no",
        "hint": "La normalización y densidad por Hz cambian unidades."
      }
    ]
  },
  "sig-filters-lti": {
    "id": "sig-filters-lti",
    "courseId": 33,
    "title": "Filtrado digital: FIR, IIR y respuesta en frecuencia",
    "shortTitle": "Filtrado digital: FIR, IIR y respuesta en frecuencia",
    "duration": 112,
    "objective": "diseñar y analizar filtros FIR/IIR conceptualmente, conectar polos/ceros con respuesta en frecuencia y distinguir causalidad, estabilidad y fase.",
    "summary": [
      "Un filtro FIR tiene una respuesta al impulso finita; un IIR usa realimentación y puede tener respuesta al impulso infinita.",
      "Para un sistema LTI discreto causal racional, polos y ceros controlan frecuencia y estabilidad; BIBO estable exige condiciones sobre la respuesta al impulso y, en el caso causal racional estándar, polos dentro del círculo unidad.",
      "Fase lineal exacta es fácil de obtener con ciertas estructuras FIR simétricas; no es una propiedad gratuita de cualquier filtro."
    ],
    "concept": "Un filtro FIR tiene una respuesta al impulso finita; un IIR usa realimentación y puede tener respuesta al impulso infinita.",
    "rules": [
      "Un filtro FIR tiene una respuesta al impulso finita; un IIR usa realimentación y puede tener respuesta al impulso infinita.",
      "Para un sistema LTI discreto causal racional, polos y ceros controlan frecuencia y estabilidad; BIBO estable exige condiciones sobre la respuesta al impulso y, en el caso causal racional estándar, polos dentro del círculo unidad.",
      "Fase lineal exacta es fácil de obtener con ciertas estructuras FIR simétricas; no es una propiedad gratuita de cualquier filtro."
    ],
    "deep": {
      "intro": "diseñar y analizar filtros FIR/IIR conceptualmente, conectar polos/ceros con respuesta en frecuencia y distinguir causalidad, estabilidad y fase.",
      "sections": [
        {
          "title": "FIR",
          "body": "y[n]=Σ_{k=0}^{M}b_k x[n-k]. No hay realimentación en la forma directa básica; estabilidad BIBO es inmediata si los coeficientes son finitos."
        },
        {
          "title": "IIR",
          "body": "y[n]=Σb_kx[n-k]-Σa_ky[n-k]. La realimentación permite respuestas selectivas con menor orden, pero introduce consideraciones de estabilidad y precisión."
        },
        {
          "title": "Polos y ceros",
          "body": "H(z)=B(z)/A(z). Evaluar sobre el círculo unidad conecta con respuesta en frecuencia cuando procede. La cercanía de polos al círculo unidad puede producir resonancias largas."
        },
        {
          "title": "Diseño práctico",
          "body": "Especificaciones incluyen bandas, ripple, atenuación, transición, fase, coste y latencia. Diseñar 'un low-pass' sin números es apenas una intención."
        }
      ]
    },
    "example": {
      "problem": "Moving average de 4 muestras.",
      "steps": [
        "h=[1/4,1/4,1/4,1/4].",
        "Es FIR de longitud 4.",
        "Su salida es promedio local."
      ],
      "solution": "Atenúa ciertas variaciones rápidas pero también introduce retardo y una respuesta frecuencial no ideal."
    },
    "check": {
      "question": "¿Todo filtro IIR es inestable?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo en audio",
          false
        ]
      ],
      "feedback": "Puede ser estable; la realimentación obliga a analizar estabilidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un moving average finito es FIR? sí/no",
        "answer": "si",
        "hint": "Su respuesta al impulso tiene longitud finita."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un filtro causal racional con un polo fuera del círculo unidad es BIBO estable en la realización causal estándar? sí/no",
        "answer": "no",
        "hint": "La respuesta crece en vez de ser absolutamente sumable."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un low-pass ideal de transición cero y soporte temporal finito existe simultáneamente? sí/no",
        "answer": "no",
        "hint": "La localización perfecta en frecuencia exige una respuesta temporal no finita/no causal idealizada."
      }
    ]
  },
  "sig-audio": {
    "id": "sig-audio",
    "courseId": 33,
    "title": "Audio digital: muestreo, cuantización y espectro",
    "shortTitle": "Audio digital: muestreo, cuantización y espectro",
    "duration": 102,
    "objective": "analizar una cadena de audio digital desde presión acústica hasta muestras, separar frecuencia de muestreo de bit depth y entender espectros, dB y filtrado.",
    "summary": [
      "Sample rate limita la banda representable bajo las hipótesis de muestreo; bit depth determina resolución de cuantización y rango dinámico idealizado, son parámetros distintos.",
      "Los decibelios expresan razones logarítmicas; para amplitudes se usa 20log10 de una razón bajo condiciones apropiadas y para potencias 10log10.",
      "Clipping, cuantización, ruido y filtrado producen firmas espectrales distintas; un espectro no sustituye escuchar/medir en el dominio temporal."
    ],
    "concept": "Sample rate limita la banda representable bajo las hipótesis de muestreo; bit depth determina resolución de cuantización y rango dinámico idealizado, son parámetros distintos.",
    "rules": [
      "Sample rate limita la banda representable bajo las hipótesis de muestreo; bit depth determina resolución de cuantización y rango dinámico idealizado, son parámetros distintos.",
      "Los decibelios expresan razones logarítmicas; para amplitudes se usa 20log10 de una razón bajo condiciones apropiadas y para potencias 10log10.",
      "Clipping, cuantización, ruido y filtrado producen firmas espectrales distintas; un espectro no sustituye escuchar/medir en el dominio temporal."
    ],
    "deep": {
      "intro": "analizar una cadena de audio digital desde presión acústica hasta muestras, separar frecuencia de muestreo de bit depth y entender espectros, dB y filtrado.",
      "sections": [
        {
          "title": "Cadena de captura",
          "body": "Micrófono y preamplificador convierten presión en señal eléctrica; filtro antialias y ADC generan muestras. Cada etapa tiene ruido y bandwidth."
        },
        {
          "title": "Sample rate vs bit depth",
          "body": "48 kHz no significa 48 kbps ni 48 bits de precisión. PCM estéreo sin compresión a 48k/24-bit produce 48,000·24·2 bits/s."
        },
        {
          "title": "dB",
          "body": "dBFS usa una referencia digital al full-scale; SPL usa otra referencia física. 0 dB no significa silencio ni el mismo nivel en todas las escalas."
        },
        {
          "title": "Procesamiento",
          "body": "EQ, compresión dinámica, resampling y denoising combinan modelos de señal y percepción. El procesamiento debe controlar clipping, fase y latencia."
        }
      ]
    },
    "example": {
      "problem": "PCM estéreo 48 kHz, 24 bit.",
      "steps": [
        "48,000 muestras/s por canal.",
        "24 bits/muestra.",
        "2 canales."
      ],
      "solution": "Bitrate bruto=2,304,000 bit/s antes de contenedor/compresión."
    },
    "check": {
      "question": "¿Aumentar bit depth duplica automáticamente la frecuencia máxima representable?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo en estéreo",
          false
        ]
      ],
      "feedback": "Banda temporal y cuantización de amplitud son ejes distintos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "PCM mono 44.1 kHz, 16 bit: bitrate bruto en bit/s.",
        "answer": "705600",
        "hint": "44100·16."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Una amplitud se reduce a la mitad. ¿Cambio aproximado en dB usando 20log10?",
        "answer": "-6.02",
        "hint": "20log10(0.5)."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿0 dBFS es silencio digital? sí/no",
        "answer": "no",
        "hint": "Es una referencia al nivel full-scale."
      }
    ]
  },
  "sig-image-telecom": {
    "id": "sig-image-telecom",
    "courseId": 33,
    "title": "Señales 2D, imágenes y telecomunicaciones",
    "shortTitle": "Señales 2D, imágenes y telecomunicaciones",
    "duration": 112,
    "objective": "extender Fourier y filtrado a 2D, interpretar frecuencia espacial y conectar señales complejas en banda base con modulación y comunicaciones.",
    "summary": [
      "Una imagen puede modelarse como señal 2D; sus frecuencias describen variación espacial, no oscilaciones por segundo.",
      "La convolución 2D modela muchos filtros lineales de imagen; bordes, blur y ringing dependen del kernel y de las condiciones de frontera.",
      "En telecomunicaciones, señales I/Q y banda base compleja permiten representar amplitud y fase de portadoras; ancho de banda, SNR y sincronización condicionan la recepción."
    ],
    "concept": "Una imagen puede modelarse como señal 2D; sus frecuencias describen variación espacial, no oscilaciones por segundo.",
    "rules": [
      "Una imagen puede modelarse como señal 2D; sus frecuencias describen variación espacial, no oscilaciones por segundo.",
      "La convolución 2D modela muchos filtros lineales de imagen; bordes, blur y ringing dependen del kernel y de las condiciones de frontera.",
      "En telecomunicaciones, señales I/Q y banda base compleja permiten representar amplitud y fase de portadoras; ancho de banda, SNR y sincronización condicionan la recepción."
    ],
    "deep": {
      "intro": "extender Fourier y filtrado a 2D, interpretar frecuencia espacial y conectar señales complejas en banda base con modulación y comunicaciones.",
      "sections": [
        {
          "title": "Fourier 2D",
          "body": "La DFT 2D descompone una matriz en frecuencias espaciales horizontales/verticales. Componentes de baja frecuencia representan variación lenta; alta frecuencia no significa automáticamente detalle útil: también puede ser ruido."
        },
        {
          "title": "Convolución 2D",
          "body": "Kernels implementan blur, sharpening y detección lineal de bordes. Padding y border modes cambian resultados cerca de límites."
        },
        {
          "title": "Banda base compleja",
          "body": "I+jQ representa una señal pasabanda alrededor de una portadora mediante una envolvente compleja. Frecuencia y fase pueden estudiarse sin simular la portadora a toda tasa."
        },
        {
          "title": "Canal y recepción",
          "body": "Modulación, pulse shaping, sincronización, ecualización y detección son una cadena. Un espectro bonito no certifica BER baja ni sincronización correcta."
        }
      ]
    },
    "example": {
      "problem": "Una imagen tiene franjas verticales periódicas.",
      "steps": [
        "La intensidad cambia principalmente al movernos horizontalmente.",
        "Su espectro 2D muestra picos desplazados en el eje de frecuencia espacial horizontal.",
        "La separación de picos se relaciona con el periodo espacial."
      ],
      "solution": "La orientación espectral es perpendicular a la dirección de las franjas."
    },
    "check": {
      "question": "¿Frecuencia espacial en una imagen se mide necesariamente en Hz?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo en vídeo",
          false
        ]
      ],
      "feedback": "Puede expresarse en ciclos/píxel, ciclos/mm u otras unidades espaciales."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Convolución 2D con un kernel normalizado de blur puede suavizar altas frecuencias? sí/no",
        "answer": "si",
        "hint": "Promedia variación local."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿I/Q permite representar fase y amplitud de una portadora respecto de una referencia? sí/no",
        "answer": "si",
        "hint": "Es una representación compleja de banda base."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más energía de alta frecuencia en una imagen implica siempre más detalle real y nunca ruido? sí/no",
        "answer": "no",
        "hint": "Ruido y artefactos también ocupan altas frecuencias."
      }
    ]
  },
  "sig-integration-ai-demoscene": {
    "id": "sig-integration-ai-demoscene",
    "courseId": 33,
    "title": "Integración: DSP, demoscene e IA",
    "shortTitle": "Integración: DSP, demoscene e IA",
    "duration": 118,
    "objective": "construir pipelines reproducibles de análisis y síntesis de señales y conectar FFT/convolución con audio, imagen, demoscene e IA sin confundir herramienta matemática con semántica.",
    "summary": [
      "FFT y convolución son primitivas reutilizables: aparecen en espectrogramas, reverberación, filtros, compresión, síntesis, comunicaciones y capas convolucionales.",
      "Una convolución en una CNN comparte estructura algebraica con filtrado, pero su interpretación, padding y convención pueden diferir del DSP clásico.",
      "Un pipeline correcto documenta sample rate, unidades, ventana, normalización, padding, latencia y error; sin esos metadatos un gráfico espectral puede ser irreproducible."
    ],
    "concept": "FFT y convolución son primitivas reutilizables: aparecen en espectrogramas, reverberación, filtros, compresión, síntesis, comunicaciones y capas convolucionales.",
    "rules": [
      "FFT y convolución son primitivas reutilizables: aparecen en espectrogramas, reverberación, filtros, compresión, síntesis, comunicaciones y capas convolucionales.",
      "Una convolución en una CNN comparte estructura algebraica con filtrado, pero su interpretación, padding y convención pueden diferir del DSP clásico.",
      "Un pipeline correcto documenta sample rate, unidades, ventana, normalización, padding, latencia y error; sin esos metadatos un gráfico espectral puede ser irreproducible."
    ],
    "deep": {
      "intro": "construir pipelines reproducibles de análisis y síntesis de señales y conectar FFT/convolución con audio, imagen, demoscene e IA sin confundir herramienta matemática con semántica.",
      "sections": [
        {
          "title": "Demoscene y síntesis",
          "body": "Osciladores, envelopes, filtros, wavetable y síntesis espectral permiten producir audio/visual con poco código. La restricción de tamaño premia modelos compactos, no cambia la matemática."
        },
        {
          "title": "IA y convolución",
          "body": "CNNs aprenden kernels a partir de datos. Muchas librerías implementan correlación cruzada bajo el nombre convolution; la diferencia de volteo debe conocerse al comparar con DSP."
        },
        {
          "title": "Espectrogramas",
          "body": "STFT aplica DFTs a ventanas solapadas para obtener una representación tiempo-frecuencia. Tamaño de ventana intercambia resolución temporal y frecuencial; hop size afecta muestreo temporal y coste."
        },
        {
          "title": "Workflow reproducible",
          "body": "Genera señal conocida, añade perturbación controlada, mide en tiempo y frecuencia, aplica filtro, reconstruye y compara error. Guarda parámetros y seeds cuando haya ruido/IA."
        }
      ]
    },
    "example": {
      "problem": "Diseña un detector de tono corto.",
      "steps": [
        "Usa una ventana temporal adecuada.",
        "Calcula STFT/DFT por frames.",
        "Relaciona bins con Hz usando fs y N."
      ],
      "solution": "Valida contra tonos conocidos, ruido y frecuencias entre bins, no solo contra el caso feliz."
    },
    "check": {
      "question": "¿Una capa llamada convolution en una librería de IA garantiza usar exactamente la convención matemática de convolución con kernel invertido?",
      "options": [
        [
          "No",
          true
        ],
        [
          "Sí",
          false
        ],
        [
          "Solo en 2D",
          false
        ]
      ],
      "feedback": "Muchas APIs implementan correlación cruzada y mantienen el nombre por convención."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿STFT usa múltiples transformadas sobre ventanas temporales? sí/no",
        "answer": "si",
        "hint": "Es una representación tiempo-frecuencia por frames."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una ventana más larga tiende a mejorar resolución frecuencial a costa de resolución temporal? sí/no",
        "answer": "si",
        "hint": "Es un trade-off tiempo-frecuencia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un pipeline DSP reproducible debería guardar fs, ventana y normalización? sí/no",
        "answer": "si",
        "hint": "Sin convenciones explícitas no puedes interpretar magnitudes ni frecuencias."
      }
    ]
  }
});
