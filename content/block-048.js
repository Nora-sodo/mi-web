/**
 * BLOQUE 048 — Efectos clásicos de demoscene
 *
 * Regla editorial: separar algoritmo visual, aproximación numérica y mecanismo
 * histórico de hardware. Recrear una apariencia con una GPU moderna no implica
 * haber reproducido la implementación original.
 */
window.LEARNING_PATHS[48] = {
  "level": "Experto técnico-creativo",
  "estimatedHours": 126,
  "description": "Implementación razonada de efectos clásicos de demoscene desde campos escalares y transformaciones 2D hasta fractales, voxel-space y una producción sincronizada.",
  "outcomes": [
    "Derivar e implementar los efectos clásicos sin tratarlos como cajas negras.",
    "Distinguir mecanismo histórico, apariencia visual y reinterpretación moderna.",
    "Conectar sampling, buffers, LUTs, punto fijo, coordenadas y timing con el hardware/renderer.",
    "Integrar varios efectos en una demo medible y sincronizada."
  ],
  "modules": [
    {
      "id": "m1-pixels-fields",
      "title": "Campos y framebuffer",
      "description": "Plasma, fuego, starfields y scrollers",
      "lessons": [
        "demo-fx-plasma",
        "demo-fx-fire",
        "demo-fx-starfield",
        "demo-fx-scrollers"
      ]
    },
    {
      "id": "m2-coordinate-effects",
      "title": "Transformaciones y raster-time",
      "description": "Tunnel, Copper y rotozoom",
      "lessons": [
        "demo-fx-tunnel",
        "demo-fx-copper",
        "demo-fx-rotozoom"
      ]
    },
    {
      "id": "m3-implicit-feedback",
      "title": "Campos implícitos y realimentación",
      "description": "Metaballs, water, feedback y palette cycling",
      "lessons": [
        "demo-fx-metaballs",
        "demo-fx-water",
        "demo-fx-feedback",
        "demo-fx-palette-cycling"
      ]
    },
    {
      "id": "m4-fractals-terrain",
      "title": "Fractales y terreno",
      "description": "Fractales, voxels, heightmaps y bump mapping",
      "lessons": [
        "demo-fx-fractals",
        "demo-fx-voxels",
        "demo-fx-heightmaps",
        "demo-fx-bump-mapping"
      ]
    },
    {
      "id": "m5-production",
      "title": "Producción",
      "description": "Integración de una demo temporizada",
      "lessons": [
        "demo-fx-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "demo-fx-plasma": {
    "id": "demo-fx-plasma",
    "courseId": 48,
    "title": "Plasma: campos periódicos y paletas",
    "shortTitle": "Plasma",
    "duration": 95,
    "objective": "Construir un plasma clásico combinando campos periódicos y separar la generación escalar del coloreado por paleta.",
    "summary": [
      "Un plasma clásico suele combinar funciones periódicas sobre x, y, distancia o tiempo para producir un campo escalar.",
      "El campo escalar y la paleta son etapas separables: cambiar la paleta puede transformar completamente el aspecto sin cambiar la geometría del campo.",
      "Tablas precalculadas, punto fijo y palette cycling fueron optimizaciones/recursos históricos; hoy siguen siendo útiles para entender coste, coherencia y representación."
    ],
    "concept": "Un plasma clásico suele combinar funciones periódicas sobre x, y, distancia o tiempo para producir un campo escalar.",
    "rules": [
      "Separa valor escalar y color.",
      "Normaliza o controla el rango antes de indexar una paleta.",
      "No presentes seno/coseno como requisito único: cualquier campo periódico/combinación puede producir estructuras tipo plasma."
    ],
    "deep": {
      "intro": "Construir un plasma clásico combinando campos periódicos y separar la generación escalar del coloreado por paleta.",
      "sections": [
        {
          "title": "Campo escalar",
          "body": "Un ejemplo es s(x,y,t)=sin(ax+t)+sin(by-ct)+sin(d·sqrt(x²+y²)+et). La suma produce interferencias suaves; otras bases periódicas también funcionan."
        },
        {
          "title": "Paleta",
          "body": "Mapea el valor escalar a un índice o coordenada de paleta. Esto permite animar color sin recalcular necesariamente el campo."
        },
        {
          "title": "Coste",
          "body": "En hardware antiguo se usaban LUTs y aritmética entera para evitar trigonometría por píxel. En hardware moderno el cuello de botella puede ser diferente."
        },
        {
          "title": "Aliasing",
          "body": "Frecuencias espaciales demasiado altas respecto a la rejilla generan aliasing. El efecto artístico no elimina la teoría de sampling del Bloque 033."
        }
      ]
    },
    "example": {
      "problem": "Campo con términos 1.2, -0.4 y 0.7: suma antes de mapear a paleta.",
      "steps": [
        "1.2-0.4+0.7=1.5."
      ],
      "solution": "El valor escalar combinado es 1.5; después se aplica la función de mapeo/paleta."
    },
    "check": {
      "question": "¿Cambiar la paleta obliga a cambiar la función que genera el campo?",
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
          "Solo con RGB",
          false
        ]
      ],
      "feedback": "El campo escalar y la paleta son etapas separables: cambiar la paleta puede transformar completamente el aspecto sin cambiar la geometría del campo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Plasma es necesariamente una simulación de fluido?",
        "answer": "no",
        "hint": "Es un efecto visual basado típicamente en campos periódicos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Tres términos valen 0.5, 0.25 y -0.75. Suma.",
        "answer": "0",
        "hint": "Suma algebraica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una LUT histórica cambia la función matemática que aproxima por definición?",
        "answer": "no",
        "hint": "Cambia cómo se evalúa/representa, no necesariamente el modelo."
      }
    ]
  },
  "demo-fx-fire": {
    "id": "demo-fx-fire",
    "courseId": 48,
    "title": "Fire effect: buffer, difusión y enfriamiento",
    "shortTitle": "Fire",
    "duration": 95,
    "objective": "Implementar el fire effect clásico como actualización de un campo de intensidad con propagación, difusión y enfriamiento.",
    "summary": [
      "El fire effect clásico mantiene un buffer escalar de calor/intensidad y lo propaga normalmente desde una fuente inferior hacia arriba.",
      "Promediar vecinos suaviza/difunde; restar cooling introduce disipación y rompe la conservación de energía de forma deliberadamente artística.",
      "La tabla de color convierte intensidad en negro→rojo→naranja→amarillo/blanco sin exigir simular combustión física."
    ],
    "concept": "El fire effect clásico mantiene un buffer escalar de calor/intensidad y lo propaga normalmente desde una fuente inferior hacia arriba.",
    "rules": [
      "Llama al buffer intensidad/calor artístico, no temperatura física calibrada.",
      "Controla bordes y rangos para evitar lecturas fuera de buffer.",
      "Separa update del campo y lookup de color."
    ],
    "deep": {
      "intro": "Implementar el fire effect clásico como actualización de un campo de intensidad con propagación, difusión y enfriamiento.",
      "sections": [
        {
          "title": "Propagación",
          "body": "Una regla simple toma varias celdas debajo/alrededor, calcula una media y resta un término de cooling."
        },
        {
          "title": "Dirección",
          "body": "Si el nuevo píxel se escribe una fila por encima de las muestras, la estructura aparenta ascender."
        },
        {
          "title": "Paleta",
          "body": "La intensidad puede ser un byte 0..255 usado como índice de una paleta de fuego."
        },
        {
          "title": "Estabilidad artística",
          "body": "Demasiado cooling apaga; demasiado poco satura. Los parámetros controlan apariencia, no una ecuación de combustión validada."
        }
      ]
    },
    "example": {
      "problem": "Vecinos 200,180,220,160; media entera 190 y cooling 7.",
      "steps": [
        "(200+180+220+160)/4=190.",
        "190-7=183."
      ],
      "solution": "Nueva intensidad aproximada: 183."
    },
    "check": {
      "question": "¿El fire effect clásico es por definición una simulación físicamente correcta de combustión?",
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
          "Solo en 8 bits",
          false
        ]
      ],
      "feedback": "Promediar vecinos suaviza/difunde; restar cooling introduce disipación y rompe la conservación de energía de forma deliberadamente artística."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Intensidad 120 menos cooling 8.",
        "answer": "112",
        "hint": "Resta y satura al rango si fuese necesario."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La paleta puede cambiar sin alterar el buffer de intensidad?",
        "answer": "si",
        "hint": "Campo y color son etapas separadas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Cuatro vecinos suman 600. Media.",
        "answer": "150",
        "hint": "Divide por 4."
      }
    ]
  },
  "demo-fx-tunnel": {
    "id": "demo-fx-tunnel",
    "courseId": 48,
    "title": "Tunnel: coordenadas polares y lookup 2D",
    "shortTitle": "Tunnel",
    "duration": 100,
    "objective": "Derivar un túnel clásico transformando coordenadas de pantalla en ángulo y profundidad aparente para samplear una textura.",
    "summary": [
      "Un tunnel effect clásico puede mapear cada píxel desde coordenadas cartesianas relativas al centro hacia ángulo atan2(y,x) y una coordenada radial inversa.",
      "El término angular envuelve alrededor del túnel; un término como k/r produce profundidad aparente y gran sensibilidad cerca de r=0.",
      "LUTs de ángulo/profundidad permiten precalcular la parte estática y animar desplazando coordenadas de textura."
    ],
    "concept": "Un tunnel effect clásico puede mapear cada píxel desde coordenadas cartesianas relativas al centro hacia ángulo atan2(y,x) y una coordenada radial inversa.",
    "rules": [
      "Trata r≈0 explícitamente para evitar singularidad/división enorme.",
      "Ángulo y profundidad son coordenadas de textura, no geometría 3D real por obligación.",
      "Distingue wrapping de textura de clipping de pantalla."
    ],
    "deep": {
      "intro": "Derivar un túnel clásico transformando coordenadas de pantalla en ángulo y profundidad aparente para samplear una textura.",
      "sections": [
        {
          "title": "Polar",
          "body": "θ=atan2(y,x) identifica dirección alrededor del centro; r=sqrt(x²+y²) mide distancia al centro."
        },
        {
          "title": "Profundidad aparente",
          "body": "u o v puede depender de 1/r; al acercarse al centro la frecuencia crece, creando sensación de túnel."
        },
        {
          "title": "Animación",
          "body": "Sumar offsets temporales a θ y/o 1/r produce giro y avance."
        },
        {
          "title": "Precompute",
          "body": "Si centro/FOV no cambian, angle/depth maps pueden almacenarse y combinarse con offsets por frame."
        }
      ]
    },
    "example": {
      "problem": "Punto relativo (3,4): radio r.",
      "steps": [
        "sqrt(3²+4²)=5."
      ],
      "solution": "r=5."
    },
    "check": {
      "question": "¿Un tunnel 2D por lookup requiere necesariamente construir una malla cilíndrica 3D?",
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
          "Solo con texturas",
          false
        ]
      ],
      "feedback": "El término angular envuelve alrededor del túnel; un término como k/r produce profundidad aparente y gran sensibilidad cerca de r=0."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Para (6,8), radio.",
        "answer": "10",
        "hint": "Triángulo 6-8-10."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿1/r necesita cuidado cerca de r=0?",
        "answer": "si",
        "hint": "Hay una singularidad."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Desplazar la coordenada angular puede hacer girar el túnel?",
        "answer": "si",
        "hint": "Es un offset alrededor de la circunferencia."
      }
    ]
  },
  "demo-fx-starfield": {
    "id": "demo-fx-starfield",
    "courseId": 48,
    "title": "Starfields: proyección y profundidad",
    "shortTitle": "Starfields",
    "duration": 95,
    "objective": "Construir starfields 2D/3D entendiendo proyección, profundidad, reciclaje y velocidad aparente.",
    "summary": [
      "Un starfield 3D clásico mantiene estrellas con coordenadas x,y,z y proyecta x/z, y/z sobre pantalla.",
      "Reducir z hace que la posición proyectada se aleje del centro, generando sensación de avance.",
      "Reciclar estrellas que cruzan el near plane mantiene una población acotada y evita crecimiento de memoria."
    ],
    "concept": "Un starfield 3D clásico mantiene estrellas con coordenadas x,y,z y proyecta x/z, y/z sobre pantalla.",
    "rules": [
      "No dividas por z=0.",
      "Separa posición 3D simulada de posición 2D proyectada.",
      "Reciclar una estrella es gestión de partículas, no teletransporte físico que deba conservar dinámica."
    ],
    "deep": {
      "intro": "Construir starfields 2D/3D entendiendo proyección, profundidad, reciclaje y velocidad aparente.",
      "sections": [
        {
          "title": "Proyección",
          "body": "Con focal f, sx=cx+f·x/z y sy=cy+f·y/z."
        },
        {
          "title": "Movimiento",
          "body": "z←z-v·dt. A menor z, |x/z| crece si x no cambia."
        },
        {
          "title": "Brillo/tamaño",
          "body": "Puede derivarse de z para reforzar profundidad, pero es una elección estética."
        },
        {
          "title": "Reciclaje",
          "body": "Al pasar z_min, reasigna x,y y coloca z de nuevo lejos."
        }
      ]
    },
    "example": {
      "problem": "f=100, x=2, z=10. Offset horizontal proyectado.",
      "steps": [
        "100·2/10=20."
      ],
      "solution": "20 píxeles/unidades de pantalla según convención."
    },
    "check": {
      "question": "¿La posición proyectada x/z es igual a la coordenada 3D x?",
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
          "Solo si z cambia",
          false
        ]
      ],
      "feedback": "Reducir z hace que la posición proyectada se aleje del centro, generando sensación de avance."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "f=80,x=3,z=12. Offset.",
        "answer": "20",
        "hint": "80·3/12."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿z=0 es válido para la división proyectiva?",
        "answer": "no",
        "hint": "Provoca división indefinida."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "Si z se reduce manteniendo x, ¿suele crecer |x/z|?",
        "answer": "si",
        "hint": "La estrella se aleja del centro en pantalla."
      }
    ]
  },
  "demo-fx-scrollers": {
    "id": "demo-fx-scrollers",
    "courseId": 48,
    "title": "Scrollers: texto, buffers y sincronización",
    "shortTitle": "Scrollers",
    "duration": 90,
    "objective": "Implementar scrollers de texto robustos y comprender glyphs, subpixel scroll, wrap y sincronización con música/tiempo.",
    "summary": [
      "Un scroller desplaza glyphs o un buffer de texto a través de una ventana; su velocidad debe expresarse respecto a un reloj, no depender accidentalmente del FPS.",
      "El texto puede renderizarse por caracteres, tiles o a un buffer intermedio; cada opción cambia coste, flexibilidad y estilo.",
      "Scrollers clásicos son también una convención cultural de greetings/mensajes, no solo un widget de UI."
    ],
    "concept": "Un scroller desplaza glyphs o un buffer de texto a través de una ventana; su velocidad debe expresarse respecto a un reloj, no depender accidentalmente del FPS.",
    "rules": [
      "Expresa velocidad en unidades/segundo o ticks definidos.",
      "No confundas wrap del mensaje con clipping del viewport.",
      "Mantén separación entre contenido textual, layout y efecto de deformación."
    ],
    "deep": {
      "intro": "Implementar scrollers de texto robustos y comprender glyphs, subpixel scroll, wrap y sincronización con música/tiempo.",
      "sections": [
        {
          "title": "Movimiento",
          "body": "x(t)=x0-vt para desplazamiento horizontal uniforme."
        },
        {
          "title": "Glyph stream",
          "body": "Cuando un glyph sale, el siguiente entra; el mensaje puede ciclar mediante índice modular."
        },
        {
          "title": "Deformación",
          "body": "Una línea base puede alterarse con sinusoides, tablas u otros offsets para scrollers ondulados."
        },
        {
          "title": "Sincronía",
          "body": "Usar un reloj musical permite que cambios de mensaje/efecto coincidan con beats o patrones."
        }
      ]
    },
    "example": {
      "problem": "Velocidad 90 px/s durante 2.5 s. Desplazamiento.",
      "steps": [
        "90·2.5=225."
      ],
      "solution": "225 px."
    },
    "check": {
      "question": "¿Un scroller a 2 px/frame mantiene la misma velocidad si cambia el FPS?",
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
          "Siempre en CRT",
          false
        ]
      ],
      "feedback": "El texto puede renderizarse por caracteres, tiles o a un buffer intermedio; cada opción cambia coste, flexibilidad y estilo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "60 px/s durante 3 s.",
        "answer": "180",
        "hint": "v·t."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El índice modular puede hacer loop del mensaje?",
        "answer": "si",
        "hint": "Usa longitud del stream."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El texto y la deformación visual deberían ser necesariamente el mismo subsistema?",
        "answer": "no",
        "hint": "Separarlos mejora control y reutilización."
      }
    ]
  },
  "demo-fx-copper": {
    "id": "demo-fx-copper",
    "courseId": 48,
    "title": "Copper effects y raster-time programming",
    "shortTitle": "Copper effects",
    "duration": 100,
    "objective": "Entender los copper/raster effects como cambios de estado sincronizados con posición de barrido y distinguir hardware original de emulación moderna.",
    "summary": [
      "En Amiga, el Copper es un coprocesador capaz de esperar posiciones de raster y escribir registros, habilitando cambios de estado dentro de un frame.",
      "Bandas de color, gradientes y otros raster effects explotan la relación temporal entre scanout y cambios de registros.",
      "Recrear el aspecto en un shader moderno no reproduce necesariamente el mecanismo temporal/hardware original."
    ],
    "concept": "En Amiga, el Copper es un coprocesador capaz de esperar posiciones de raster y escribir registros, habilitando cambios de estado dentro de un frame.",
    "rules": [
      "Distingue efecto visual de mecanismo histórico.",
      "No llames GPU moderna al Copper: sus capacidades y modelo son muy diferentes.",
      "Trata timings y registros concretos como dependientes de plataforma."
    ],
    "deep": {
      "intro": "Entender los copper/raster effects como cambios de estado sincronizados con posición de barrido y distinguir hardware original de emulación moderna.",
      "sections": [
        {
          "title": "WAIT/MOVE conceptual",
          "body": "El Copper puede esperar una posición y después modificar un registro, permitiendo cambios por scanline o región."
        },
        {
          "title": "Raster",
          "body": "La pantalla se genera secuencialmente; cambiar estado durante el barrido hace que distintas filas vean valores diferentes."
        },
        {
          "title": "Costo CPU",
          "body": "Parte del trabajo temporal puede delegarse al coprocesador, liberando CPU para otras tareas."
        },
        {
          "title": "Reimplementación",
          "body": "Un fragment shader puede emular bandas según y, pero ya no es el mismo contrato de hardware."
        }
      ]
    },
    "example": {
      "problem": "Pantalla de 256 líneas dividida en 8 bandas iguales. Líneas por banda.",
      "steps": [
        "256/8=32."
      ],
      "solution": "32 líneas."
    },
    "check": {
      "question": "¿Reproducir un gradiente de Copper con shader demuestra que el hardware ejecuta el mismo mecanismo?",
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
          "Solo a 60 Hz",
          false
        ]
      ],
      "feedback": "Bandas de color, gradientes y otros raster effects explotan la relación temporal entre scanout y cambios de registros."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "312 líneas / 6 bandas iguales.",
        "answer": "52",
        "hint": "Divide."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El Copper puede cambiar registros sincronizado con raster?",
        "answer": "si",
        "hint": "Es una capacidad central."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Copper y GPU moderna son equivalentes?",
        "answer": "no",
        "hint": "Modelos y capacidades difieren enormemente."
      }
    ]
  },
  "demo-fx-rotozoom": {
    "id": "demo-fx-rotozoom",
    "courseId": 48,
    "title": "Rotozoom: transformación inversa y sampling",
    "shortTitle": "Rotozoom",
    "duration": 100,
    "objective": "Construir rotozoom mediante transformación 2D inversa, sampling y wrapping sin agujeros de forward mapping.",
    "summary": [
      "Rotozoom combina rotación y escala de una textura, normalmente evaluando para cada píxel destino qué coordenada de textura debe samplearse.",
      "El inverse mapping evita los huecos que aparecen al empujar texels fuente hacia el destino.",
      "Punto fijo, LUTs y texturas power-of-two fueron optimizaciones históricas comunes, pero no requisitos matemáticos del efecto."
    ],
    "concept": "Rotozoom combina rotación y escala de una textura, normalmente evaluando para cada píxel destino qué coordenada de textura debe samplearse.",
    "rules": [
      "Prefiere razonar destino→fuente para rasterizar sin huecos.",
      "Distingue transformación geométrica de filtrado de textura.",
      "No conviertas power-of-two en requisito universal moderno."
    ],
    "deep": {
      "intro": "Construir rotozoom mediante transformación 2D inversa, sampling y wrapping sin agujeros de forward mapping.",
      "sections": [
        {
          "title": "Rotación-escala",
          "body": "Para centro relativo, aplica la inversa de R(θ)·S para obtener u,v de la textura."
        },
        {
          "title": "Incremental",
          "body": "u y v cambian linealmente a lo largo de una scanline, por lo que pueden actualizarse con sumas incrementales."
        },
        {
          "title": "Wrapping",
          "body": "Con textura repetida, las coordenadas se envuelven; con clamp, el aspecto cambia."
        },
        {
          "title": "Sampling",
          "body": "Nearest conserva estética dura; bilinear suaviza. Son decisiones separadas de la transformación."
        }
      ]
    },
    "example": {
      "problem": "Escala visual 2×: ¿qué escala usa el inverse mapping fuente por unidad destino?",
      "steps": [
        "1/2=0.5."
      ],
      "solution": "0.5."
    },
    "check": {
      "question": "¿Forward-mapear cada texel es la única forma correcta de hacer rotozoom?",
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
          "Solo en DOS",
          false
        ]
      ],
      "feedback": "El inverse mapping evita los huecos que aparecen al empujar texels fuente hacia el destino."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Zoom 4×. Factor inverso.",
        "answer": "0.25",
        "hint": "1/4."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Nearest y bilinear cambian el sampling sin cambiar necesariamente la matriz?",
        "answer": "si",
        "hint": "Transformación y filtrado son etapas distintas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿u,v pueden incrementarse linealmente a lo largo de una scanline para una transformación afín?",
        "answer": "si",
        "hint": "Es una optimización clásica."
      }
    ]
  },
  "demo-fx-metaballs": {
    "id": "demo-fx-metaballs",
    "courseId": 48,
    "title": "Metaballs: campos implícitos y umbral",
    "shortTitle": "Metaballs",
    "duration": 100,
    "objective": "Construir metaballs como suma de campos implícitos y distinguir visualización por umbral de reconstrucción geométrica de una isosuperficie.",
    "summary": [
      "Una metaball puede contribuir un campo dependiente de distancia; la suma de varios campos produce fusiones suaves cuando se cruza un umbral.",
      "En 2D basta clasificar/colorear píxeles según el campo; en 3D una isosuperficie puede requerir técnicas como marching cubes o ray marching.",
      "La forma exacta del kernel de campo y el umbral son elecciones de modelo, no una única definición universal."
    ],
    "concept": "Una metaball puede contribuir un campo dependiente de distancia; la suma de varios campos produce fusiones suaves cuando se cruza un umbral.",
    "rules": [
      "Evita dividir por distancia cero sin epsilon o kernel bien definido.",
      "Separa evaluación del campo y extracción/render de la isosuperficie.",
      "No confundas metaballs con partículas que colisionan físicamente."
    ],
    "deep": {
      "intro": "Construir metaballs como suma de campos implícitos y distinguir visualización por umbral de reconstrucción geométrica de una isosuperficie.",
      "sections": [
        {
          "title": "Campo",
          "body": "Ejemplo simple: F(p)=Σ r_i²/(||p-c_i||²+ε)."
        },
        {
          "title": "Umbral",
          "body": "Si F(p)≥τ, el punto se considera dentro de la región implícita."
        },
        {
          "title": "Fusión",
          "body": "Campos superpuestos se suman, permitiendo puentes entre centros cercanos."
        },
        {
          "title": "Render",
          "body": "En 2D puedes mapear F a color; en 3D necesitas encontrar la superficie F=τ o integrar el campo de otra manera."
        }
      ]
    },
    "example": {
      "problem": "Dos contribuciones 0.7 y 0.6 con umbral 1.0. ¿Dentro según suma?",
      "steps": [
        "0.7+0.6=1.3≥1.0."
      ],
      "solution": "Sí."
    },
    "check": {
      "question": "¿Las metaballs requieren por definición simulación de fluidos?",
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
          "Solo en 3D",
          false
        ]
      ],
      "feedback": "En 2D basta clasificar/colorear píxeles según el campo; en 3D una isosuperficie puede requerir técnicas como marching cubes o ray marching."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Contribuciones 0.3,0.4,0.5. Suma.",
        "answer": "1.2",
        "hint": "Suma."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Umbral 1.4 y campo 1.2: ¿dentro?",
        "answer": "no",
        "hint": "No alcanza τ."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Marching cubes es una posible técnica 3D para extraer una isosuperficie?",
        "answer": "si",
        "hint": "Es una opción, no la única."
      }
    ]
  },
  "demo-fx-water": {
    "id": "demo-fx-water",
    "courseId": 48,
    "title": "Water: height fields y propagación de ondas",
    "shortTitle": "Water",
    "duration": 100,
    "objective": "Implementar un efecto de agua 2D mediante height fields discretos, propagación, damping y refracción visual aproximada.",
    "summary": [
      "Un efecto clásico de agua puede mantener dos buffers de altura y actualizar cada celda desde vecinos y el estado temporal previo.",
      "La propagación discreta crea ondas; damping evita oscilación indefinida y controla la apariencia.",
      "El height field puede usarse para desplazar coordenadas de textura y simular refracción/reflexión sin resolver Navier–Stokes."
    ],
    "concept": "Un efecto clásico de agua puede mantener dos buffers de altura y actualizar cada celda desde vecinos y el estado temporal previo.",
    "rules": [
      "Llama a esto wave/height-field simulation, no simulación completa de fluidos.",
      "Mantén buffers temporalmente separados para no mezclar estados del mismo step accidentalmente.",
      "Controla damping y timestep para evitar explosión numérica."
    ],
    "deep": {
      "intro": "Implementar un efecto de agua 2D mediante height fields discretos, propagación, damping y refracción visual aproximada.",
      "sections": [
        {
          "title": "Doble buffer",
          "body": "h_new depende de h_old y h_older; después se intercambian referencias."
        },
        {
          "title": "Laplace discreto",
          "body": "Las diferencias con vecinos aproximan curvatura y propagan perturbaciones."
        },
        {
          "title": "Damping",
          "body": "Multiplicar/restar una pequeña parte reduce energía numérica."
        },
        {
          "title": "Render",
          "body": "El gradiente del height field puede desviar UVs de una imagen de fondo y producir apariencia acuática."
        }
      ]
    },
    "example": {
      "problem": "Altura calculada 0.8 y damping multiplicativo 0.95. Nueva altura.",
      "steps": [
        "0.8·0.95=0.76."
      ],
      "solution": "0.76."
    },
    "check": {
      "question": "¿Un water ripple 2D de height field resuelve necesariamente un fluido 3D completo?",
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
          "Solo con textura",
          false
        ]
      ],
      "feedback": "La propagación discreta crea ondas; damping evita oscilación indefinida y controla la apariencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "1.2·0.9.",
        "answer": "1.08",
        "hint": "Aplica damping."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Actualizar in-place siempre preserva la semántica de un esquema que necesita el estado anterior completo?",
        "answer": "no",
        "hint": "Puedes contaminar vecinos con valores ya actualizados."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El gradiente del height field puede usarse para perturbar UVs?",
        "answer": "si",
        "hint": "Es una aproximación visual clásica."
      }
    ]
  },
  "demo-fx-feedback": {
    "id": "demo-fx-feedback",
    "courseId": 48,
    "title": "Feedback: realimentación de framebuffer",
    "shortTitle": "Feedback",
    "duration": 95,
    "objective": "Construir feedback visual realimentando frames anteriores con transformación, mezcla y disipación controlada.",
    "summary": [
      "Feedback toma una imagen previa, la transforma y la mezcla con contenido nuevo, creando trails, espirales y estructuras recursivas.",
      "Sin disipación o límites, valores pueden saturar; con demasiada disipación el efecto desaparece rápidamente.",
      "Double buffering evita leer y escribir ambiguamente la misma imagen cuando la API/hardware no garantiza feedback in-place."
    ],
    "concept": "Feedback toma una imagen previa, la transforma y la mezcla con contenido nuevo, creando trails, espirales y estructuras recursivas.",
    "rules": [
      "Define explícitamente qué frame se lee y cuál se escribe.",
      "Controla gain/decay para evitar saturación involuntaria.",
      "Distingue feedback visual de recursión geométrica o temporal de gameplay."
    ],
    "deep": {
      "intro": "Construir feedback visual realimentando frames anteriores con transformación, mezcla y disipación controlada.",
      "sections": [
        {
          "title": "Recurrencia",
          "body": "I_t = new_t + α·T(I_{t-1}) es un modelo conceptual simple."
        },
        {
          "title": "Transformación",
          "body": "T puede rotar, escalar, desplazar o distorsionar el frame anterior."
        },
        {
          "title": "Decay",
          "body": "0≤α<1 suele introducir desvanecimiento; α y blending exacto dependen del formato/espacio de color."
        },
        {
          "title": "Ping-pong",
          "body": "Buffer A se lee y B se escribe; en el siguiente frame se intercambian."
        }
      ]
    },
    "example": {
      "problem": "Contribución previa 0.6, decay 0.8 y nueva 0.1; suma simple.",
      "steps": [
        "0.6·0.8+0.1=0.58."
      ],
      "solution": "0.58 antes de cualquier clamp/tone mapping."
    },
    "check": {
      "question": "¿Feedback visual necesita distinguir buffer leído y escrito cuando la API no permite feedback in-place definido?",
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
          "Solo en CPU",
          false
        ]
      ],
      "feedback": "Sin disipación o límites, valores pueden saturar; con demasiada disipación el efecto desaparece rápidamente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "0.5·0.9+0.2.",
        "answer": "0.65",
        "hint": "Aplica recurrencia."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿α=1 implica necesariamente que nunca habrá saturación?",
        "answer": "no",
        "hint": "Depende de nueva energía, blend y rango."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Ping-pong alterna dos buffers?",
        "answer": "si",
        "hint": "Uno sirve de fuente y otro de destino."
      }
    ]
  },
  "demo-fx-palette-cycling": {
    "id": "demo-fx-palette-cycling",
    "courseId": 48,
    "title": "Palette cycling: animar color sin reescribir índices",
    "shortTitle": "Palette cycling",
    "duration": 90,
    "objective": "Comprender palette cycling como animación de la función índice→color y distinguirlo de mover píxeles o regenerar la imagen indexada.",
    "summary": [
      "En imagen indexada, el framebuffer almacena índices; una palette/CLUT separada determina el color mostrado por cada índice.",
      "Rotar un rango de entradas de paleta puede producir movimiento aparente de agua, fuego o luces sin cambiar los índices de los píxeles.",
      "En true-color moderno puede emularse con lookup texture/shader, pero el mecanismo histórico de DAC/CLUT era diferente."
    ],
    "concept": "En imagen indexada, el framebuffer almacena índices; una palette/CLUT separada determina el color mostrado por cada índice.",
    "rules": [
      "Distingue índice almacenado de color final.",
      "No confundas cycling con desplazar texels.",
      "Reserva rangos de paleta cuando varias animaciones comparten la misma CLUT."
    ],
    "deep": {
      "intro": "Comprender palette cycling como animación de la función índice→color y distinguirlo de mover píxeles o regenerar la imagen indexada.",
      "sections": [
        {
          "title": "Indexado",
          "body": "Un píxel con valor 37 consulta palette[37]."
        },
        {
          "title": "Cycling",
          "body": "Si rotas palette[32..47], todos los píxeles cuyos índices caen ahí cambian de color simultáneamente."
        },
        {
          "title": "Costo",
          "body": "Cambiar 16 entradas puede animar miles de píxeles sin reescribirlos."
        },
        {
          "title": "Moderno",
          "body": "Una textura de índices + lookup palette en shader reproduce la separación conceptual."
        }
      ]
    },
    "example": {
      "problem": "Rango de paleta 32..47 inclusive. Número de entradas.",
      "steps": [
        "47-32+1=16."
      ],
      "solution": "16."
    },
    "check": {
      "question": "¿Palette cycling necesita modificar los índices almacenados de cada píxel?",
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
          "Solo en 24 bits",
          false
        ]
      ],
      "feedback": "Rotar un rango de entradas de paleta puede producir movimiento aparente de agua, fuego o luces sin cambiar los índices de los píxeles."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Rango 100..115 inclusive. Entradas.",
        "answer": "16",
        "hint": "115-100+1."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un mismo índice puede verse con otro color tras cambiar la paleta?",
        "answer": "si",
        "hint": "El índice no cambia, la lookup sí."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Emularlo con shader implica mismo hardware que una CLUT histórica?",
        "answer": "no",
        "hint": "Mismo principio visual, implementación distinta."
      }
    ]
  },
  "demo-fx-fractals": {
    "id": "demo-fx-fractals",
    "courseId": 48,
    "title": "Fractales iterativos: Mandelbrot, Julia y escape time",
    "shortTitle": "Fractales",
    "duration": 105,
    "objective": "Implementar fractales de escape-time entendiendo iteración compleja, criterio de escape, presupuesto de iteraciones y coloreado.",
    "summary": [
      "Mandelbrot itera z_{n+1}=z_n²+c desde z0=0 y clasifica c según si la órbita escapa bajo el presupuesto/criterio elegido.",
      "Julia fija c y varía z0; la familia está relacionada pero no es la misma imagen que Mandelbrot.",
      "El número máximo de iteraciones controla coste y aproximación; un punto que no escapó aún no prueba matemáticamente pertenencia para cualquier configuración finita."
    ],
    "concept": "Mandelbrot itera z_{n+1}=z_n²+c desde z0=0 y clasifica c según si la órbita escapa bajo el presupuesto/criterio elegido.",
    "rules": [
      "Distingue 'no escapó en N iteraciones' de demostración exacta de pertenencia.",
      "Mantén coordenadas complejas y coordenadas de pantalla separadas.",
      "El coloreado suave es una capa de visualización, no cambia la dinámica iterada."
    ],
    "deep": {
      "intro": "Implementar fractales de escape-time entendiendo iteración compleja, criterio de escape, presupuesto de iteraciones y coloreado.",
      "sections": [
        {
          "title": "Mandelbrot",
          "body": "z0=0; z←z²+c. Si |z| supera un radio de escape suficiente, la órbita escapa."
        },
        {
          "title": "Julia",
          "body": "c es fijo para toda la imagen y cada píxel aporta z0."
        },
        {
          "title": "Coste",
          "body": "Ancho×alto×iteraciones máximas da una cota simple de evaluaciones."
        },
        {
          "title": "Zoom",
          "body": "A grandes zooms la precisión floating-point puede convertirse en limitación dominante."
        }
      ]
    },
    "example": {
      "problem": "Imagen 320×200 y máximo 64 iteraciones. Máximo de iteraciones-píxel si ninguno escapa pronto.",
      "steps": [
        "320·200·64=4096000."
      ],
      "solution": "4,096,000."
    },
    "check": {
      "question": "¿No escapar en 100 iteraciones demuestra por sí solo pertenencia exacta al conjunto de Mandelbrot?",
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
          "Solo con double",
          false
        ]
      ],
      "feedback": "Julia fija c y varía z0; la familia está relacionada pero no es la misma imagen que Mandelbrot."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "100×100×50.",
        "answer": "500000",
        "hint": "Multiplica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Julia fija c y varía z0 por píxel?",
        "answer": "si",
        "hint": "Esa es la configuración estándar."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cambiar la paleta altera la órbita compleja?",
        "answer": "no",
        "hint": "Solo la visualización."
      }
    ]
  },
  "demo-fx-voxels": {
    "id": "demo-fx-voxels",
    "courseId": 48,
    "title": "Voxels y voxel-space terrain",
    "shortTitle": "Voxels",
    "duration": 105,
    "objective": "Distinguir volumen voxel real de técnicas voxel-space/heightmap y construir un renderer de terreno por columnas conceptualmente.",
    "summary": [
      "Voxel significa elemento volumétrico discreto; sin embargo, muchos efectos clásicos llamados 'voxel landscapes' renderizan height fields 2.5D en vez de volúmenes arbitrarios.",
      "Un renderer de terreno por columnas puede avanzar rayos en el plano del mapa, consultar altura/color y proyectar alturas a columnas de pantalla.",
      "Occlusion eficiente puede lograrse manteniendo por columna el límite ya dibujado y evitando pixels ocultos."
    ],
    "concept": "Voxel significa elemento volumétrico discreto; sin embargo, muchos efectos clásicos llamados 'voxel landscapes' renderizan height fields 2.5D en vez de volúmenes arbitrarios.",
    "rules": [
      "No llames volumen 3D completo a un heightmap 2.5D.",
      "Distingue sample del mapa y proyección a pantalla.",
      "Controla step size: afecta rendimiento y aliasing/precisión."
    ],
    "deep": {
      "intro": "Distinguir volumen voxel real de técnicas voxel-space/heightmap y construir un renderer de terreno por columnas conceptualmente.",
      "sections": [
        {
          "title": "Voxel real",
          "body": "Una grid 128³ tiene 2,097,152 celdas antes de compresión."
        },
        {
          "title": "Height field",
          "body": "h(x,z) almacena una sola altura por coordenada del plano, por lo que no representa cuevas arbitrarias."
        },
        {
          "title": "Column renderer",
          "body": "Para cada distancia se consulta h y se proyecta y_screen≈h/d con una convención de cámara."
        },
        {
          "title": "Occlusion",
          "body": "Una vez una parte de columna queda cubierta por terreno más cercano, muestras más lejanas pueden descartarse."
        }
      ]
    },
    "example": {
      "problem": "Volumen 64×64×64. Voxels.",
      "steps": [
        "64³=262144."
      ],
      "solution": "262,144 voxels."
    },
    "check": {
      "question": "¿Un heightmap h(x,z) puede representar por sí solo dos alturas sólidas distintas en el mismo x,z?",
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
          "Siempre con bilinear",
          false
        ]
      ],
      "feedback": "Un renderer de terreno por columnas puede avanzar rayos en el plano del mapa, consultar altura/color y proyectar alturas a columnas de pantalla."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "32³.",
        "answer": "32768",
        "hint": "32·32·32."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Voxel-space terrain clásico puede ser 2.5D en vez de volumen arbitrario?",
        "answer": "si",
        "hint": "Muchos efectos usan height fields."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Reducir step size suele aumentar muestras y coste?",
        "answer": "si",
        "hint": "Más pasos por rayo/columna."
      }
    ]
  },
  "demo-fx-heightmaps": {
    "id": "demo-fx-heightmaps",
    "courseId": 48,
    "title": "Heightmaps: terreno, normales y proyección",
    "shortTitle": "Heightmaps",
    "duration": 95,
    "objective": "Usar heightmaps como campos escalares 2D para terreno, iluminación y deformación, entendiendo sus límites topológicos.",
    "summary": [
      "Un heightmap almacena una altura h(x,z) por posición del dominio 2D y es compacto para terrenos sin overhangs arbitrarios.",
      "Gradientes o diferencias finitas permiten aproximar normales para shading.",
      "Escala horizontal y vertical cambian pendientes físicas; un byte de altura no tiene unidades por sí mismo."
    ],
    "concept": "Un heightmap almacena una altura h(x,z) por posición del dominio 2D y es compacto para terrenos sin overhangs arbitrarios.",
    "rules": [
      "Declara escalas/unidades del heightmap.",
      "No asumas que 8 bits implican 256 metros.",
      "Distingue resolución de la grid de rango vertical."
    ],
    "deep": {
      "intro": "Usar heightmaps como campos escalares 2D para terreno, iluminación y deformación, entendiendo sus límites topológicos.",
      "sections": [
        {
          "title": "Cuantización",
          "body": "Con 8 bits hay 256 códigos posibles, pero su conversión a metros depende del scale."
        },
        {
          "title": "Normal",
          "body": "Diferencias h(x+1)-h(x-1) y h(z+1)-h(z-1) aproximan pendiente local."
        },
        {
          "title": "Topología",
          "body": "Una sola función y=h(x,z) no representa cuevas o voladizos dobles en la misma coordenada."
        },
        {
          "title": "LOD",
          "body": "Grandes terrenos requieren mip/LOD/streaming para controlar memoria y coste."
        }
      ]
    },
    "example": {
      "problem": "8-bit height normalizado 128/255 y escala vertical 100 m. Altura aproximada a 3 decimales.",
      "steps": [
        "128/255·100≈50.196."
      ],
      "solution": "50.196 m."
    },
    "check": {
      "question": "¿El valor 255 de un heightmap significa siempre 255 metros?",
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
          "Solo en PNG",
          false
        ]
      ],
      "feedback": "Gradientes o diferencias finitas permiten aproximar normales para shading."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Valor 64/255 con escala 255 m. Altura.",
        "answer": "64",
        "hint": "La escala hace 1 código=1 m en este caso."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un heightmap puede representar cuevas arbitrarias con una sola altura por x,z?",
        "answer": "no",
        "hint": "Es una función monovaluada."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Diferencias finitas pueden aproximar normales?",
        "answer": "si",
        "hint": "Aproximan el gradiente."
      }
    ]
  },
  "demo-fx-bump-mapping": {
    "id": "demo-fx-bump-mapping",
    "courseId": 48,
    "title": "Bump mapping: derivadas, normales y shading",
    "shortTitle": "Bump mapping",
    "duration": 100,
    "objective": "Entender bump mapping como perturbación de normales/shading derivada de un campo de altura, diferenciándolo de normal mapping y desplazamiento geométrico.",
    "summary": [
      "Bump mapping usa variaciones de un height field para perturbar la normal usada por iluminación sin mover necesariamente la geometría.",
      "Normal mapping almacena directamente una normal (habitualmente en tangent space); displacement sí altera posición/superficie geométrica bajo la técnica correspondiente.",
      "Las derivadas del height field pueden aproximarse con diferencias finitas y convertirse en una normal local."
    ],
    "concept": "Bump mapping usa variaciones de un height field para perturbar la normal usada por iluminación sin mover necesariamente la geometría.",
    "rules": [
      "Bump ≠ normal map ≠ displacement.",
      "No prometas cambios de silueta si solo modificas shading.",
      "Mantén consistente el espacio de la normal con luces/vista."
    ],
    "deep": {
      "intro": "Entender bump mapping como perturbación de normales/shading derivada de un campo de altura, diferenciándolo de normal mapping y desplazamiento geométrico.",
      "sections": [
        {
          "title": "Derivadas",
          "body": "dx≈h(x+1,y)-h(x-1,y), dy≈h(x,y+1)-h(x,y-1)."
        },
        {
          "title": "Normal local",
          "body": "Una forma conceptual es normalize((-s·dx,-s·dy,1))."
        },
        {
          "title": "Silueta",
          "body": "Como la geometría no cambia, el contorno sigue siendo el mismo."
        },
        {
          "title": "Espacio",
          "body": "Si la normal está en tangent space, debe transformarse coherentemente al espacio donde se evalúa iluminación."
        }
      ]
    },
    "example": {
      "problem": "hL=0.2,hR=0.8. Diferencia central no normalizada hR-hL.",
      "steps": [
        "0.8-0.2=0.6."
      ],
      "solution": "0.6."
    },
    "check": {
      "question": "¿Bump mapping cambia necesariamente la silueta geométrica?",
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
          "Solo con Lambert",
          false
        ]
      ],
      "feedback": "Normal mapping almacena directamente una normal (habitualmente en tangent space); displacement sí altera posición/superficie geométrica bajo la técnica correspondiente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "hR=0.9,hL=0.4. Diferencia.",
        "answer": "0.5",
        "hint": "Resta."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Normal mapping almacena normalmente una dirección de normal en vez de una altura?",
        "answer": "si",
        "hint": "Esa es la diferencia conceptual principal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Displacement puede alterar geometría/silueta donde bump no?",
        "answer": "si",
        "hint": "Desplazamiento cambia posición según técnica."
      }
    ]
  },
  "demo-fx-integration": {
    "id": "demo-fx-integration",
    "courseId": 48,
    "title": "Integración: construir una demo de efectos clásicos",
    "shortTitle": "Demo FX Lab",
    "duration": 120,
    "objective": "Integrar varios efectos clásicos en una producción temporizada con transición, presupuesto de frame, audio sync y medición reproducible.",
    "summary": [
      "Una demo no es una carpeta de efectos independientes: requiere timeline, transiciones, sincronización audiovisual y una arquitectura de recursos/estado coherente.",
      "Los efectos clásicos pueden compartir infraestructura: buffers, paletas, LUTs, clocks, render targets y sistema de parámetros.",
      "Medir CPU/GPU/frame time y tamaño permite optimizar con intención; portar una técnica histórica a hardware moderno no exige copiar sus restricciones accidentalmente."
    ],
    "concept": "Una demo no es una carpeta de efectos independientes: requiere timeline, transiciones, sincronización audiovisual y una arquitectura de recursos/estado coherente.",
    "rules": [
      "Sincroniza con un reloj definido, preferiblemente audio cuando la música es autoridad temporal.",
      "Mide antes de optimizar y conserva una implementación de referencia.",
      "Distingue fidelidad visual, fidelidad histórica y reinterpretación moderna."
    ],
    "deep": {
      "intro": "Integrar varios efectos clásicos en una producción temporizada con transición, presupuesto de frame, audio sync y medición reproducible.",
      "sections": [
        {
          "title": "Timeline",
          "body": "Define segmentos con inicio, duración, parámetros y transición; evita que cada efecto posea el reloj global."
        },
        {
          "title": "Shared systems",
          "body": "Palette manager, framebuffer ping-pong, LUT cache y parameter tracks reducen duplicación."
        },
        {
          "title": "Budget",
          "body": "A 60 Hz el frame nominal son ~16.667 ms; el margen debe considerar picos, no solo promedio."
        },
        {
          "title": "Comparación",
          "body": "Implementa al menos un efecto con técnica histórica aproximada y una versión moderna para estudiar qué cambia en coste y mecanismo."
        }
      ]
    },
    "example": {
      "problem": "Frame total 16.667 ms; audio/update usan 2.5 ms y composición 1.2 ms. Presupuesto restante aproximado.",
      "steps": [
        "16.667-2.5-1.2=12.967."
      ],
      "solution": "12.967 ms."
    },
    "check": {
      "question": "¿Una demo coherente se reduce a encadenar efectos sin timeline ni sincronización?",
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
          "Solo en 4K",
          false
        ]
      ],
      "feedback": "Los efectos clásicos pueden compartir infraestructura: buffers, paletas, LUTs, clocks, render targets y sistema de parámetros."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "16.667-3.0-1.5.",
        "answer": "12.167",
        "hint": "Resta los costes."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un reloj de audio puede servir como autoridad de sincronía musical?",
        "answer": "si",
        "hint": "Evita depender del jitter de render."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Recrear el aspecto de un efecto con shader moderno implica reproducir exactamente el mecanismo histórico?",
        "answer": "no",
        "hint": "Fidelidad visual y de implementación son distintas."
      }
    ]
  }
});
