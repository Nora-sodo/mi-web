/**
 * BLOQUE 040 — Física de videojuegos
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar modelo continuo, discretización, detección y solver.
 * Detectar un contacto no lo resuelve; un integrador estable no vuelve exacta la
 * simulación y los detalles de Box2D/Godot se tratan como implementaciones, no leyes.
 */
window.LEARNING_PATHS[40] = {
  "level": "Experto progresivo",
  "estimatedHours": 128,
  "description": "Física de videojuegos: movimiento, rigid bodies, colisiones, impulses, constraints, friction, joints y estabilidad numérica.",
  "outcomes": [
    "Distinguir modelo físico continuo, discretización e implementación del solver.",
    "Construir un pipeline broad-phase→narrow-phase→constraints con métricas observables.",
    "Razonar sobre impulses, friction, joints, CCD, penetración y estabilidad de stacks.",
    "Integrar un step físico en un engine sin mezclar autoría de simulación, render y gameplay."
  ],
  "modules": [
    {
      "id": "m1-motion",
      "title": "Movimiento",
      "description": "Cinemática, dinámica e integración",
      "lessons": [
        "physics-kinematics",
        "physics-dynamics",
        "physics-integrators",
        "physics-rigid-bodies"
      ]
    },
    {
      "id": "m2-collision",
      "title": "Detección de colisiones",
      "description": "Broad phase, narrow phase y CCD",
      "lessons": [
        "physics-collision-pipeline",
        "physics-broad-phase",
        "physics-narrow-phase"
      ]
    },
    {
      "id": "m3-solver",
      "title": "Respuesta y constraints",
      "description": "Impulsos, solver, fricción y joints",
      "lessons": [
        "physics-impulses",
        "physics-constraints",
        "physics-friction",
        "physics-joints"
      ]
    },
    {
      "id": "m4-stability",
      "title": "Estabilidad e integración",
      "description": "Corrección, substeps e integración del engine",
      "lessons": [
        "physics-position-correction",
        "physics-ccd-substeps",
        "physics-integration-engine"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "physics-kinematics": {
    "id": "physics-kinematics",
    "courseId": 40,
    "title": "Cinemática: estado, velocidad y aceleración",
    "shortTitle": "Cinemática: estado, velocidad y aceleración",
    "duration": 110,
    "objective": "Distinguir posición, orientación, velocidad y aceleración, y construir actualizaciones con unidades y marcos de referencia explícitos.",
    "summary": [
      "La cinemática describe movimiento sin explicar sus causas; dinámica introduce fuerzas, masa e impulsos.",
      "Posición, velocidad y aceleración tienen unidades y transformaciones distintas; mezclar marcos produce errores aunque las fórmulas parezcan correctas.",
      "Una trayectoria exacta continua y una actualización discreta son objetos distintos: el timestep introduce aproximación cuando las derivadas cambian durante el paso."
    ],
    "concept": "La cinemática describe movimiento sin explicar sus causas; dinámica introduce fuerzas, masa e impulsos.",
    "rules": [
      "Declara unidades, frame de referencia y convención angular.",
      "No trates velocidad como desplazamiento por frame; su unidad incluye tiempo.",
      "Separa estado de simulación del transform interpolado para render."
    ],
    "deep": {
      "intro": "Distinguir posición, orientación, velocidad y aceleración, y construir actualizaciones con unidades y marcos de referencia explícitos.",
      "sections": [
        {
          "title": "Estado",
          "body": "Un rigid body típico mantiene posición/orientación y velocidades lineal/angular; aceleraciones se derivan de fuerzas/torques durante el step."
        },
        {
          "title": "Unidades",
          "body": "Si x está en metros y t en segundos, v usa m/s y a m/s². Multiplicar por dt cambia dimensionalmente velocidad en desplazamiento y aceleración en cambio de velocidad."
        },
        {
          "title": "Frames",
          "body": "Una velocidad puede expresarse en world o local space; conviértela antes de sumarla a una posición en otro marco."
        },
        {
          "title": "Discretización",
          "body": "x(t+dt)=x+v dt es exacto solo bajo velocidad constante durante el intervalo; con aceleración variable es una aproximación."
        }
      ]
    },
    "example": {
      "problem": "Un objeto viaja a 6 m/s constantes durante 0.25 s. ¿Desplazamiento?",
      "steps": [
        "Δx=v·dt.",
        "6·0.25=1.5 m."
      ],
      "solution": "1.5 m."
    },
    "check": {
      "question": "¿La cinemática necesita conocer la fuerza que causó el movimiento?",
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
      "feedback": "Posición, velocidad y aceleración tienen unidades y transformaciones distintas; mezclar marcos produce errores aunque las fórmulas parezcan correctas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Velocidad 8 m/s durante 0.5 s: desplazamiento en m.",
        "answer": "4",
        "hint": "Multiplica v·dt."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Velocidad y desplazamiento tienen las mismas unidades?",
        "answer": "no",
        "hint": "Una incluye tiempo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una velocidad local puede sumarse directamente a una posición world sin conversión?",
        "answer": "no",
        "hint": "Los marcos deben coincidir."
      }
    ]
  },
  "physics-dynamics": {
    "id": "physics-dynamics",
    "courseId": 40,
    "title": "Dinámica: fuerza, masa, torque e impulso",
    "shortTitle": "Dinámica: fuerza, masa, torque e impulso",
    "duration": 110,
    "objective": "Conectar fuerzas y torques con cambios de momentum lineal y angular sin confundir fuerza sostenida con impulso instantáneo.",
    "summary": [
      "La dinámica relaciona fuerzas con aceleración y los impulsos con cambios de momentum; ambos no son intercambiables.",
      "Para traslación ideal F=ma cuando la masa es constante; para rotación intervienen torque, inercia y orientación.",
      "Aplicar una fuerza durante dt produce un impulso aproximado J≈F·dt; un impulso modifica velocidad inmediatamente en el solver sin ser una fuerza infinita literal."
    ],
    "concept": "La dinámica relaciona fuerzas con aceleración y los impulsos con cambios de momentum; ambos no son intercambiables.",
    "rules": [
      "Acumula fuerzas durante el step y límpialas según el contrato del engine.",
      "No uses masa cero en fórmulas con inversa de masa; cuerpos estáticos suelen representarse con invMass=0 por convenio del solver.",
      "Distingue centro de masa de origen gráfico/transform."
    ],
    "deep": {
      "intro": "Conectar fuerzas y torques con cambios de momentum lineal y angular sin confundir fuerza sostenida con impulso instantáneo.",
      "sections": [
        {
          "title": "Momentum",
          "body": "p=m v; un impulso J cambia momentum: Δp=J. Para masa constante, Δv=J/m."
        },
        {
          "title": "Fuerza",
          "body": "Integrar F durante tiempo produce impulso. Una fuerza de 10 N durante 0.2 s entrega 2 N·s bajo fuerza constante."
        },
        {
          "title": "Rotación",
          "body": "Torque τ=r×F depende del brazo respecto al centro de masa. La inercia rotacional cumple un papel análogo a la masa pero depende de distribución y orientación."
        },
        {
          "title": "Gameplay",
          "body": "Forces son adecuadas para aceleración sostenida; impulses suelen modelar eventos breves como un golpe, siempre bajo la convención física del motor."
        }
      ]
    },
    "example": {
      "problem": "Fuerza constante 12 N durante 0.25 s. ¿Impulso?",
      "steps": [
        "J=F·dt.",
        "12·0.25=3 N·s."
      ],
      "solution": "3 N·s."
    },
    "check": {
      "question": "¿Una fuerza y un impulso tienen las mismas unidades?",
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
          "Solo si masa=1",
          false
        ]
      ],
      "feedback": "Para traslación ideal F=ma cuando la masa es constante; para rotación intervienen torque, inercia y orientación."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Masa 2 kg recibe impulso 6 N·s. Cambio de velocidad m/s.",
        "answer": "3",
        "hint": "Δv=J/m."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Torque depende del punto de aplicación de una fuerza?",
        "answer": "si",
        "hint": "Importa el brazo r."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un impulso debe modelarse como una fuerza aplicada durante muchos frames por definición?",
        "answer": "no",
        "hint": "Es cambio integrado de momentum."
      }
    ]
  },
  "physics-integrators": {
    "id": "physics-integrators",
    "courseId": 40,
    "title": "Integración numérica: Euler explícito, semi-implícito y Verlet",
    "shortTitle": "Integración numérica: Euler explícito, semi-implícito y Verlet",
    "duration": 110,
    "objective": "Comparar integradores de juego por precisión, estabilidad, coste e invariantes, en vez de elegirlos solo por nombre.",
    "summary": [
      "Euler explícito y semi-implícito son ambos de primer orden, pero pueden comportarse muy distinto en sistemas mecánicos.",
      "Semi-implicit Euler actualiza velocidad antes que posición y suele tener mejores propiedades cualitativas para dinámica hamiltoniana simple que Euler explícito.",
      "Verlet representa una familia de esquemas; position Verlet y velocity Verlet no deben confundirse ni venderse como universalmente superiores."
    ],
    "concept": "Euler explícito y semi-implícito son ambos de primer orden, pero pueden comportarse muy distinto en sistemas mecánicos.",
    "rules": [
      "Especifica la variante exacta del integrador.",
      "Evalúa estabilidad con el sistema y timestep reales; orden de precisión no basta.",
      "No cambies dt dinámicamente sin analizar cómo afecta solver, damping y constraints."
    ],
    "deep": {
      "intro": "Comparar integradores de juego por precisión, estabilidad, coste e invariantes, en vez de elegirlos solo por nombre.",
      "sections": [
        {
          "title": "Euler explícito",
          "body": "v_{n+1}=v_n+a_n dt; x_{n+1}=x_n+v_n dt. Usa la velocidad vieja para mover posición."
        },
        {
          "title": "Semi-implícito",
          "body": "v_{n+1}=v_n+a_n dt; x_{n+1}=x_n+v_{n+1} dt. Sigue siendo primer orden, pero es symplectic para ciertos sistemas."
        },
        {
          "title": "Verlet",
          "body": "Position Verlet usa posiciones previas; velocity Verlet mantiene velocidad explícita. Sus ventajas dependen del tipo de fuerzas y constraints."
        },
        {
          "title": "Elección",
          "body": "En juegos se priorizan estabilidad perceptual, restricciones robustas, rendimiento y reproducibilidad además del error local formal."
        }
      ]
    },
    "example": {
      "problem": "v=2, a=4, dt=0.5. Semi-implícito: ¿posición avanzada desde x=0?",
      "steps": [
        "v1=2+4·0.5=4.",
        "x1=0+4·0.5=2."
      ],
      "solution": "2."
    },
    "check": {
      "question": "¿Semi-implicit Euler y explicit Euler tienen el mismo orden formal?",
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
          "Solo sin gravedad",
          false
        ]
      ],
      "feedback": "Semi-implicit Euler actualiza velocidad antes que posición y suele tener mejores propiedades cualitativas para dinámica hamiltoniana simple que Euler explícito."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Con x=0,v=1,a=2,dt=1, Euler explícito da x1=?",
        "answer": "1",
        "hint": "Usa v vieja."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "Mismo estado con semi-implícito da x1=?",
        "answer": "3",
        "hint": "Primero v1=3."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Menor error local garantiza estabilidad para cualquier dt?",
        "answer": "no",
        "hint": "Estabilidad es propiedad adicional."
      }
    ]
  },
  "physics-rigid-bodies": {
    "id": "physics-rigid-bodies",
    "courseId": 40,
    "title": "Rigid bodies: pose, centro de masa e inercia",
    "shortTitle": "Rigid bodies: pose, centro de masa e inercia",
    "duration": 110,
    "objective": "Modelar cuerpos rígidos con estado traslacional y rotacional, entendiendo centro de masa, tensor de inercia y actualización de orientación.",
    "summary": [
      "Un rigid body ideal conserva distancias internas; su configuración se describe con una pose y velocidades lineal/angular.",
      "La masa describe resistencia traslacional; el tensor de inercia describe respuesta rotacional y depende de la distribución de masa.",
      "El tensor de inercia en world space cambia con la orientación aunque el tensor local del cuerpo permanezca fijo."
    ],
    "concept": "Un rigid body ideal conserva distancias internas; su configuración se describe con una pose y velocidades lineal/angular.",
    "rules": [
      "Mantén quaternions/rotaciones normalizados según el método de integración.",
      "Calcula fuerzas y torques respecto al centro de masa correcto.",
      "No trates el tensor de inercia como un único escalar en 3D general."
    ],
    "deep": {
      "intro": "Modelar cuerpos rígidos con estado traslacional y rotacional, entendiendo centro de masa, tensor de inercia y actualización de orientación.",
      "sections": [
        {
          "title": "Estado",
          "body": "Pose=(posición,orientación), velocidad lineal v y angular ω forman el núcleo del estado dinámico."
        },
        {
          "title": "Centro de masa",
          "body": "Traslación del centro de masa y rotación alrededor de él permiten separar parcialmente dinámica lineal/angular."
        },
        {
          "title": "Inercia",
          "body": "En coordenadas del cuerpo puede almacenarse I_body; en world se transforma por la rotación para resolver torques/impulsos."
        },
        {
          "title": "Static/kinematic",
          "body": "Engines suelen distinguir dynamic, kinematic y static por cómo obtienen su movimiento y responden al solver; son políticas de simulación, no clases físicas universales."
        }
      ]
    },
    "example": {
      "problem": "Dos cuerpos tienen misma masa pero uno concentra masa cerca del eje. ¿Pueden tener distinta inercia rotacional?",
      "steps": [
        "Sí.",
        "La distribución espacial importa."
      ],
      "solution": "Sí."
    },
    "check": {
      "question": "¿La masa por sí sola determina completamente la resistencia a rotar en 3D?",
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
          "Solo con gravedad",
          false
        ]
      ],
      "feedback": "La masa describe resistencia traslacional; el tensor de inercia describe respuesta rotacional y depende de la distribución de masa."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un rigid body ideal cambia distancias entre sus puntos internos?",
        "answer": "no",
        "hint": "Rigid significa forma constante."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El tensor world de inercia puede cambiar al rotar el cuerpo?",
        "answer": "si",
        "hint": "La orientación cambia su representación."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Static y dynamic son categorías del solver además de propiedades geométricas?",
        "answer": "si",
        "hint": "Definen política de movimiento/respuesta."
      }
    ]
  },
  "physics-collision-pipeline": {
    "id": "physics-collision-pipeline",
    "courseId": 40,
    "title": "Collision detection: broad phase, narrow phase y contactos",
    "shortTitle": "Collision detection: broad phase, narrow phase y contactos",
    "duration": 110,
    "objective": "Diseñar la detección de colisiones como pipeline de candidatos, tests geométricos y manifolds, sin confundir detección con resolución.",
    "summary": [
      "Broad phase reduce pares candidatos mediante bounds/estructura espacial; puede producir falsos positivos deliberadamente.",
      "Narrow phase decide solapamiento para formas concretas y construye información de contacto como normal, separación y puntos.",
      "Detectar un contacto no resuelve penetración ni velocidad: el solver consume esos contactos como constraints."
    ],
    "concept": "Broad phase reduce pares candidatos mediante bounds/estructura espacial; puede producir falsos positivos deliberadamente.",
    "rules": [
      "Broad phase debe ser conservador: perder un par real es peor que enviar candidatos extra.",
      "No uses AABB overlap como prueba final para geometría arbitraria.",
      "Mantén coherencia temporal de contact IDs cuando el solver use warm starting."
    ],
    "deep": {
      "intro": "Diseñar la detección de colisiones como pipeline de candidatos, tests geométricos y manifolds, sin confundir detección con resolución.",
      "sections": [
        {
          "title": "Pipeline",
          "body": "Shapes entran al broad phase mediante proxies; los pares superpuestos pasan a narrow phase; el resultado alimenta el solver."
        },
        {
          "title": "Broad phase",
          "body": "Árboles AABB dinámicos, sweep-and-prune o grids explotan coherencia/espacio para evitar O(n²) en workloads típicos."
        },
        {
          "title": "Narrow phase",
          "body": "SAT, GJK/EPA y tests especializados sirven a distintas familias de formas; no hay algoritmo único universal."
        },
        {
          "title": "Manifold",
          "body": "Varios puntos de contacto pueden describir una región local de soporte y mejorar estabilidad frente a un único punto."
        }
      ]
    },
    "example": {
      "problem": "1000 shapes implican ¿cuántos pares únicos brute-force?",
      "steps": [
        "n(n-1)/2.",
        "1000·999/2=499500."
      ],
      "solution": "499500."
    },
    "check": {
      "question": "¿Un par producido por broad phase significa colisión geométrica confirmada?",
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
          "Solo con AABB",
          false
        ]
      ],
      "feedback": "Narrow phase decide solapamiento para formas concretas y construye información de contacto como normal, separación y puntos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "10 objetos: pares brute-force únicos.",
        "answer": "45",
        "hint": "10·9/2."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Narrow phase ocurre después de broad phase en el pipeline típico?",
        "answer": "si",
        "hint": "Primero candidatos."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Detectar contacto equivale a resolver respuesta?",
        "answer": "no",
        "hint": "El solver aún debe actuar."
      }
    ]
  },
  "physics-broad-phase": {
    "id": "physics-broad-phase",
    "courseId": 40,
    "title": "Broad phase: AABB, árboles dinámicos y coherencia temporal",
    "shortTitle": "Broad phase: AABB, árboles dinámicos y coherencia temporal",
    "duration": 110,
    "objective": "Construir una broad phase conservadora y medible, entendiendo proxies expandidos, updates y coste de consultas.",
    "summary": [
      "La broad phase busca pares potenciales; su contrato privilegia no perder contactos reales sobre minimizar a cero los falsos positivos.",
      "Un dynamic AABB tree organiza bounds jerárquicamente para consultas, ray casts y pares; Box2D usa esta estrategia en su broad phase.",
      "AABBs “fat” o márgenes temporales reducen reinserciones al permitir movimiento pequeño dentro del proxy, a costa de más candidatos."
    ],
    "concept": "La broad phase busca pares potenciales; su contrato privilegia no perder contactos reales sobre minimizar a cero los falsos positivos.",
    "rules": [
      "Mide número de proxies, pares candidatos, reinserciones y profundidad/calidad de la estructura.",
      "Actualiza proxies cuando el shape sale de su bound conservador.",
      "No atribuyas O(log n) garantizado a toda consulta de un BVH dinámico en cualquier distribución."
    ],
    "deep": {
      "intro": "Construir una broad phase conservadora y medible, entendiendo proxies expandidos, updates y coste de consultas.",
      "sections": [
        {
          "title": "AABB",
          "body": "Un axis-aligned bounding box es barato de solapar y actualizar, pero aproxima formas rotadas y puede ser flojo."
        },
        {
          "title": "Dynamic tree",
          "body": "Box2D documenta un árbol binario AABB para organizar gran cantidad de objetos y acelerar AABB queries/ray casts."
        },
        {
          "title": "Fat bounds",
          "body": "Expandir el proxy captura movimiento cercano sin actualizar cada frame; demasiado margen aumenta pares falsos."
        },
        {
          "title": "Telemetría",
          "body": "Broad phase se optimiza por coste total: update + query + narrow-phase desperdiciada, no solo por altura del árbol."
        }
      ]
    },
    "example": {
      "problem": "Si broad phase devuelve 500 pares y narrow phase confirma 80, ¿falsos positivos candidatos?",
      "steps": [
        "500-80=420."
      ],
      "solution": "420."
    },
    "check": {
      "question": "¿La broad phase puede devolver pares que luego no colisionan?",
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
          "Solo en 3D",
          false
        ]
      ],
      "feedback": "Un dynamic AABB tree organiza bounds jerárquicamente para consultas, ray casts y pares; Box2D usa esta estrategia en su broad phase."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "500 candidatos, 80 contactos: falsos positivos.",
        "answer": "420",
        "hint": "Resta."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un proxy AABB puede ser mayor que la shape real?",
        "answer": "si",
        "hint": "Es conservador."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más margen en fat AABB siempre mejora rendimiento?",
        "answer": "no",
        "hint": "Reduce updates pero aumenta candidatos."
      }
    ]
  },
  "physics-narrow-phase": {
    "id": "physics-narrow-phase",
    "courseId": 40,
    "title": "Narrow phase: SAT, GJK, manifolds y CCD",
    "shortTitle": "Narrow phase: SAT, GJK, manifolds y CCD",
    "duration": 110,
    "objective": "Entender tests de colisión exactos/aproximados, generación de manifolds y el problema del tunneling con objetos rápidos.",
    "summary": [
      "Narrow phase opera sobre geometría real de un par candidato y produce separación/contactos; el algoritmo depende del tipo de shape.",
      "Discrete collision detection solo observa estados discretos y puede perder intersecciones entre pasos: tunneling.",
      "Continuous collision detection busca tiempo de impacto o usa métodos especulativos; mejora robustez pero añade coste y complejidad."
    ],
    "concept": "Narrow phase opera sobre geometría real de un par candidato y produce separación/contactos; el algoritmo depende del tipo de shape.",
    "rules": [
      "Usa tests especializados simples cuando existen; no fuerces GJK a resolver cualquier forma por dogma.",
      "Distingue distancia/separación de penetración y manifold.",
      "Activa CCD según riesgo/velocidad/tamaño, no necesariamente para todo cuerpo."
    ],
    "deep": {
      "intro": "Entender tests de colisión exactos/aproximados, generación de manifolds y el problema del tunneling con objetos rápidos.",
      "sections": [
        {
          "title": "SAT",
          "body": "Para convexos poligonales, un eje separador demuestra no intersección; si no existe entre los ejes relevantes, hay solapamiento."
        },
        {
          "title": "GJK",
          "body": "GJK razona sobre Minkowski difference para distancia/intersección de convexos; EPA puede estimar penetración tras intersección en ciertas implementaciones."
        },
        {
          "title": "CCD",
          "body": "Una bala puede pasar de un lado a otro de una pared entre t_n y t_{n+1} sin solaparse en ninguno de los extremos."
        },
        {
          "title": "Contact caching",
          "body": "Feature IDs estables ayudan a persistir contactos y warm-start del solver."
        }
      ]
    },
    "example": {
      "problem": "Objeto avanza 3 m por tick y pared tiene 0.2 m de grosor. ¿Puede existir tunneling con detección discreta?",
      "steps": [
        "Sí.",
        "Puede saltar de un lado al otro entre muestras."
      ],
      "solution": "Sí."
    },
    "check": {
      "question": "¿CCD suele ser más costoso que solo tests discretos?",
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
          "Nunca se usa en juegos",
          false
        ]
      ],
      "feedback": "Discrete collision detection solo observa estados discretos y puede perder intersecciones entre pasos: tunneling."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿SAT puede descartar convexos al encontrar un eje separador?",
        "answer": "si",
        "hint": "Eso certifica separación."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿GJK es un algoritmo para shapes convexas en su forma clásica?",
        "answer": "si",
        "hint": "Trabaja con soporte convexo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿CCD elimina todo problema numérico del solver?",
        "answer": "no",
        "hint": "Resuelve otra dimensión del problema."
      }
    ]
  },
  "physics-impulses": {
    "id": "physics-impulses",
    "courseId": 40,
    "title": "Respuesta por impulsos: normal, restitución y momentum",
    "shortTitle": "Respuesta por impulsos: normal, restitución y momentum",
    "duration": 110,
    "objective": "Derivar la respuesta de colisión mediante impulsos y velocidad relativa, entendiendo por qué restitución y contactos múltiples se resuelven aproximadamente en motores iterativos.",
    "summary": [
      "Un impulso de contacto cambia velocidades para satisfacer una restricción de no penetración/no aproximación según el modelo del solver.",
      "La restitución controla rebote normal en el modelo de contacto, pero motores prácticos suelen aplicar umbrales y aproximaciones para evitar jitter.",
      "En múltiples contactos, aplicar una fórmula de colisión aislada a cada punto una sola vez no resuelve correctamente el sistema acoplado."
    ],
    "concept": "Un impulso de contacto cambia velocidades para satisfacer una restricción de no penetración/no aproximación según el modelo del solver.",
    "rules": [
      "Calcula velocidad relativa en el punto de contacto, incluyendo ω×r.",
      "Clampa el impulso normal unilateral para que el contacto no “tire” de los cuerpos si ese es el modelo.",
      "Trata restitución como parámetro de material/modelo, no como conservación exacta universal de energía."
    ],
    "deep": {
      "intro": "Derivar la respuesta de colisión mediante impulsos y velocidad relativa, entendiendo por qué restitución y contactos múltiples se resuelven aproximadamente en motores iterativos.",
      "sections": [
        {
          "title": "Punto de contacto",
          "body": "v_point = v + ω×r. La velocidad relativa normal decide si los cuerpos se aproximan o separan."
        },
        {
          "title": "Impulso",
          "body": "J aplicado en p cambia v por invMass·J y ω mediante la inercia inversa y r×J."
        },
        {
          "title": "Restitución",
          "body": "e≈0 modela choque inelástico normal; e≈1 rebote idealizado. Box2D documenta tratamiento aproximado/umbrales para estabilidad."
        },
        {
          "title": "Acoplamiento",
          "body": "Stacking y varios puntos requieren iteraciones/solver de constraints, no solo una ecuación por choque independiente."
        }
      ]
    },
    "example": {
      "problem": "Masa 2 kg inicialmente parada recibe impulso normal 8 N·s sin rotación. ¿Δv?",
      "steps": [
        "Δv=J/m=4 m/s."
      ],
      "solution": "4 m/s."
    },
    "check": {
      "question": "¿Restitución e=1 garantiza conservación total de energía en un solver de juego con múltiples contactos?",
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
      "feedback": "La restitución controla rebote normal en el modelo de contacto, pero motores prácticos suelen aplicar umbrales y aproximaciones para evitar jitter."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Masa 4 kg, impulso 12 N·s: Δv.",
        "answer": "3",
        "hint": "J/m."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Debe incluirse velocidad angular al calcular velocidad de un punto fuera del COM?",
        "answer": "si",
        "hint": "Usa ω×r."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un contacto unilateral debe permitir impulso normal atractivo por defecto?",
        "answer": "no",
        "hint": "Normalmente solo empuja."
      }
    ]
  },
  "physics-constraints": {
    "id": "physics-constraints",
    "courseId": 40,
    "title": "Constraints y solver iterativo: Jacobianos, warm start y convergencia",
    "shortTitle": "Constraints y solver iterativo: Jacobianos, warm start y convergencia",
    "duration": 110,
    "objective": "Modelar contactos y joints como restricciones, entendiendo el papel de Jacobianos, impulsos acumulados e iteraciones del solver.",
    "summary": [
      "Un constraint restringe movimientos permitidos; el solver calcula impulsos/fuerzas que aproximan esas condiciones durante el timestep.",
      "Sequential impulses/PGS resuelve constraints iterativamente y el orden/iteraciones afectan convergencia; no es una solución exacta simultánea en una sola pasada.",
      "Warm starting reutiliza impulsos del paso anterior para iniciar más cerca de la solución cuando los contactos persisten."
    ],
    "concept": "Un constraint restringe movimientos permitidos; el solver calcula impulsos/fuerzas que aproximan esas condiciones durante el timestep.",
    "rules": [
      "Clampa el impulso acumulado, no solo el incremento, para constraints unilaterales/limitados según el solver.",
      "No interpretes “8 iteraciones” como nivel físico de precisión universal; depende de escena y formulación.",
      "Mide error de constraint, penetración, jitter y coste."
    ],
    "deep": {
      "intro": "Modelar contactos y joints como restricciones, entendiendo el papel de Jacobianos, impulsos acumulados e iteraciones del solver.",
      "sections": [
        {
          "title": "Forma",
          "body": "Una restricción de velocidad puede escribirse conceptualmente Jv + b ≥/=/≤ 0; λ escala el impulso Jᵀλ."
        },
        {
          "title": "Effective mass",
          "body": "El denominador combina masas/inercia proyectadas sobre el Jacobiano; convierte error de velocidad en impulso necesario."
        },
        {
          "title": "Iteración",
          "body": "Sequential impulses actualiza un constraint y deja el nuevo estado disponible al siguiente, repitiendo varias pasadas."
        },
        {
          "title": "Warm start",
          "body": "Contact IDs estables permiten reaplicar λ previo como guess; mejora stacking pero exige invalidar caches cuando cambia la topología."
        }
      ]
    },
    "example": {
      "problem": "Un solver hace 6 iteraciones sobre 100 constraints. ¿Cuántas visitas a constraints si recorre todos cada iteración?",
      "steps": [
        "6·100=600."
      ],
      "solution": "600."
    },
    "check": {
      "question": "¿Más iteraciones del solver siempre producen exactamente la solución física continua?",
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
          "Solo con friction=0",
          false
        ]
      ],
      "feedback": "Sequential impulses/PGS resuelve constraints iterativamente y el orden/iteraciones afectan convergencia; no es una solución exacta simultánea en una sola pasada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "8 iteraciones × 50 constraints: visitas.",
        "answer": "400",
        "hint": "Multiplica."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Warm starting reutiliza información del step previo?",
        "answer": "si",
        "hint": "Ese es su objetivo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El orden de constraints puede afectar un solver iterativo?",
        "answer": "si",
        "hint": "Las actualizaciones son secuenciales."
      }
    ]
  },
  "physics-friction": {
    "id": "physics-friction",
    "courseId": 40,
    "title": "Fricción: Coulomb, impulso tangencial y límites",
    "shortTitle": "Fricción: Coulomb, impulso tangencial y límites",
    "duration": 110,
    "objective": "Modelar fricción de contacto como restricción tangencial limitada, entendiendo aproximaciones de Coulomb, static/dynamic friction y sus límites.",
    "summary": [
      "La fricción de Coulomb idealizada limita la fuerza/impulso tangencial en función de la normal; no es simplemente velocity*=0.9 cada frame.",
      "En solvers de impulsos, el impulso tangencial suele clampiarse por un límite relacionado con μ·λ_n.",
      "La fricción de un motor es un modelo numérico/material; no reproduce automáticamente fenómenos tribológicos complejos."
    ],
    "concept": "La fricción de Coulomb idealizada limita la fuerza/impulso tangencial en función de la normal; no es simplemente velocity*=0.9 cada frame.",
    "rules": [
      "Calcula tangente respecto a la velocidad relativa/contact normal según la formulación.",
      "No uses damping global como sustituto conceptual de fricción de contacto.",
      "Documenta cómo se combinan coeficientes de materiales."
    ],
    "deep": {
      "intro": "Modelar fricción de contacto como restricción tangencial limitada, entendiendo aproximaciones de Coulomb, static/dynamic friction y sus límites.",
      "sections": [
        {
          "title": "Coulomb",
          "body": "En un modelo básico |λ_t|≤μ λ_n. El impulso normal disponible limita cuánto puede oponerse al deslizamiento."
        },
        {
          "title": "Static/dynamic",
          "body": "Algunas engines distinguen umbrales/modelos; otras usan una aproximación unificada limitada. No universalices una implementación."
        },
        {
          "title": "Fricción angular",
          "body": "Rolling resistance/spin friction pueden requerir términos separados; la fricción tangencial puntual no captura todo."
        },
        {
          "title": "Gameplay",
          "body": "Coeficientes se ajustan por estabilidad/feel, pero conviene saber qué propiedad del solver se está alterando."
        }
      ]
    },
    "example": {
      "problem": "Si μ=0.5 y λ_n=10 N·s, límite de magnitud tangencial idealizado.",
      "steps": [
        "μλ_n=5 N·s."
      ],
      "solution": "5 N·s."
    },
    "check": {
      "question": "¿Multiplicar cada frame la velocidad por 0.9 es equivalente general a fricción de Coulomb de contacto?",
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
          "Solo con masa=1",
          false
        ]
      ],
      "feedback": "En solvers de impulsos, el impulso tangencial suele clampiarse por un límite relacionado con μ·λ_n."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "μ=0.4, impulso normal 20: límite tangencial.",
        "answer": "8",
        "hint": "μ·λn."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Fricción depende conceptualmente del contacto normal en Coulomb?",
        "answer": "si",
        "hint": "El límite escala con normal."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Damping global sustituye la geometría del contacto?",
        "answer": "no",
        "hint": "Es otro modelo."
      }
    ]
  },
  "physics-joints": {
    "id": "physics-joints",
    "courseId": 40,
    "title": "Joints: distancia, bisagra, límites y motores",
    "shortTitle": "Joints: distancia, bisagra, límites y motores",
    "duration": 110,
    "objective": "Diseñar joints como conjuntos de constraints con grados de libertad permitidos, límites y motores, sin tratarlos como parenting geométrico.",
    "summary": [
      "Un joint restringe grados de libertad entre cuerpos; no es lo mismo que una relación parent-child de escena.",
      "Distance, revolute/hinge, prismatic y otros joints se forman combinando constraints lineales y angulares.",
      "Motores y límites son constraints activos; parámetros excesivamente rígidos pueden exigir más solver/substeps y generar jitter."
    ],
    "concept": "Un joint restringe grados de libertad entre cuerpos; no es lo mismo que una relación parent-child de escena.",
    "rules": [
      "Cuenta DOF que quieres permitir y restringir.",
      "No teletransportes transforms de cuerpos dinámicos para “cumplir” el joint salvo contrato específico.",
      "Usa límites y motores con unidades/torques/fuerzas máximas explícitas."
    ],
    "deep": {
      "intro": "Diseñar joints como conjuntos de constraints con grados de libertad permitidos, límites y motores, sin tratarlos como parenting geométrico.",
      "sections": [
        {
          "title": "DOF",
          "body": "Un rigid body 3D libre tiene 6 DOF: 3 traslacionales y 3 rotacionales. Una hinge ideal deja principalmente una rotación relativa."
        },
        {
          "title": "Distance",
          "body": "Mantiene una distancia o rango entre anchors; puede incluir spring/damping."
        },
        {
          "title": "Motor",
          "body": "Un motor intenta velocidad/posición objetivo con impulso/fuerza limitada; si el límite es insuficiente no alcanzará el target."
        },
        {
          "title": "Scene graph",
          "body": "Parenting transforma coordenadas; un joint impone una relación dinámica mediante fuerzas/impulsos del solver."
        }
      ]
    },
    "example": {
      "problem": "Rigid body 3D libre: ¿cuántos grados de libertad?",
      "steps": [
        "3 traslación + 3 rotación = 6."
      ],
      "solution": "6."
    },
    "check": {
      "question": "¿Una hinge joint ideal y hacer un nodo child de otro son equivalentes físicamente?",
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
          "Solo sin gravedad",
          false
        ]
      ],
      "feedback": "Distance, revolute/hinge, prismatic y otros joints se forman combinando constraints lineales y angulares."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "DOF de rigid body 2D libre.",
        "answer": "3",
        "hint": "x,y,ángulo."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un motor de joint puede tener fuerza/torque máximo?",
        "answer": "si",
        "hint": "Evita impulso infinito."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Más rigidez numérica siempre reduce jitter?",
        "answer": "no",
        "hint": "Puede empeorar condicionamiento/solver."
      }
    ]
  },
  "physics-position-correction": {
    "id": "physics-position-correction",
    "courseId": 40,
    "title": "Penetración, position correction y estabilidad de stacks",
    "shortTitle": "Penetración, position correction y estabilidad de stacks",
    "duration": 110,
    "objective": "Entender por qué contactos discretos toleran penetración pequeña y cómo bias, slop y métodos de corrección afectan estabilidad y energía.",
    "summary": [
      "Los solvers de juego suelen tolerar una pequeña penetración y corregirla gradualmente; exigir cero exacto puede producir jitter.",
      "Baumgarte/bias convierte error posicional en objetivo de velocidad; otras formulaciones corrigen posición o usan soft constraints.",
      "La corrección excesiva puede inyectar energía y separar cuerpos violentamente, mientras una corrección insuficiente deja drift/sinking."
    ],
    "concept": "Los solvers de juego suelen tolerar una pequeña penetración y corregirla gradualmente; exigir cero exacto puede producir jitter.",
    "rules": [
      "Usa slop/tolerancias con unidades físicas explícitas.",
      "No mezcles corrección posicional con restitución sin entender la energía introducida.",
      "Evalúa stacks altos, masas extremas y contactos persistentes como tests de estabilidad."
    ],
    "deep": {
      "intro": "Entender por qué contactos discretos toleran penetración pequeña y cómo bias, slop y métodos de corrección afectan estabilidad y energía.",
      "sections": [
        {
          "title": "Penetración",
          "body": "Discrete stepping puede detectar shapes ya solapadas al final del step; el solver debe recuperar una configuración aceptable."
        },
        {
          "title": "Bias",
          "body": "Un término proporcional al error intenta reducirlo en varios pasos en vez de eliminarlo instantáneamente."
        },
        {
          "title": "Soft constraints",
          "body": "Compliance/spring-damper puede hacer constraints menos rígidos y más estables para ciertos dt."
        },
        {
          "title": "Stacking",
          "body": "Ratios de masa, orden de constraints, iteraciones y warm-start influyen en jitter/drift."
        }
      ]
    },
    "example": {
      "problem": "Penetración 2 cm; corrector elimina 25% por step. ¿corrección objetivo inicial en cm?",
      "steps": [
        "0.25·2=0.5 cm."
      ],
      "solution": "0.5 cm."
    },
    "check": {
      "question": "¿Forzar penetración exactamente cero en una sola iteración es siempre más estable?",
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
      "feedback": "Baumgarte/bias convierte error posicional en objetivo de velocidad; otras formulaciones corrigen posición o usan soft constraints."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Penetración 4 cm, corrige 20%: cm.",
        "answer": "0.8",
        "hint": "0.2·4."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un bias demasiado fuerte puede inyectar energía?",
        "answer": "si",
        "hint": "Sobre-corrección."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Slop significa ignorar toda colisión pequeña?",
        "answer": "no",
        "hint": "Es tolerancia de error del constraint."
      }
    ]
  },
  "physics-ccd-substeps": {
    "id": "physics-ccd-substeps",
    "courseId": 40,
    "title": "Substeps, CCD y elección de timestep",
    "shortTitle": "Substeps, CCD y elección de timestep",
    "duration": 110,
    "objective": "Diseñar frecuencia física, substeps y CCD según escalas de movimiento y coste, distinguiendo precisión temporal de frecuencia de render.",
    "summary": [
      "Substepping reduce distancia/rotación por paso y puede mejorar solver/CCD, pero multiplica coste y no sustituye algoritmos robustos.",
      "CCD protege casos rápidos/pequeños donde el movimiento por step es grande respecto al espesor de obstáculos.",
      "La frecuencia de física debe elegirse por estabilidad, gameplay y presupuesto; no tiene que igualar Hz del monitor."
    ],
    "concept": "Substepping reduce distancia/rotación por paso y puede mejorar solver/CCD, pero multiplica coste y no sustituye algoritmos robustos.",
    "rules": [
      "Mide desplazamiento máximo por step respecto al tamaño de features relevantes.",
      "Usa substeps/CCD selectivamente cuando el workload lo permita.",
      "Interpolación de render suaviza presentación entre physics ticks; no añade precisión a la simulación pasada."
    ],
    "deep": {
      "intro": "Diseñar frecuencia física, substeps y CCD según escalas de movimiento y coste, distinguiendo precisión temporal de frecuencia de render.",
      "sections": [
        {
          "title": "Escala",
          "body": "A 60 Hz, v=60 m/s implica 1 m por step; una pared de 5 cm puede ser atravesada discretamente."
        },
        {
          "title": "Substeps",
          "body": "Dividir el tick en 4 reduce ese desplazamiento por substep a 0.25 m, pero no garantiza capturar toda geometría."
        },
        {
          "title": "CCD",
          "body": "Time of impact/conservative advancement aproximan cuándo ocurre el contacto entre endpoints."
        },
        {
          "title": "Render interpolation",
          "body": "Godot documenta interpolación de estados de physics ticks fijos para presentar movimiento suave entre ticks."
        }
      ]
    },
    "example": {
      "problem": "v=30 m/s, physics=60 Hz. Desplazamiento por tick en m.",
      "steps": [
        "30/60=0.5."
      ],
      "solution": "0.5."
    },
    "check": {
      "question": "¿Interpolar render entre ticks cambia el resultado físico autoritativo ya simulado?",
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
          "Solo con VSync",
          false
        ]
      ],
      "feedback": "CCD protege casos rápidos/pequeños donde el movimiento por step es grande respecto al espesor de obstáculos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "v=12 m/s a 120 Hz: m por tick.",
        "answer": "0.1",
        "hint": "12/120."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿4 substeps multiplican aproximadamente por 4 el número de steps del solver dentro del tick?",
        "answer": "si",
        "hint": "Ese es el coste básico."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿CCD debería asumirse gratuito?",
        "answer": "no",
        "hint": "Añade consultas/solver."
      }
    ]
  },
  "physics-integration-engine": {
    "id": "physics-integration-engine",
    "courseId": 40,
    "title": "Integración del motor físico: pipeline, determinismo y profiling",
    "shortTitle": "Integración del motor físico: pipeline, determinismo y profiling",
    "duration": 110,
    "objective": "Integrar física en el engine con un pipeline reproducible, eventos diferidos, filtros, sleeping y telemetría que permita diagnosticar inestabilidad.",
    "summary": [
      "Un step físico real coordina integración, broad phase, narrow phase, island building, solving, sleeping y eventos; el orden es parte del contrato del engine.",
      "Collision filtering y triggers/sensors evitan resolver pares que no deben producir respuesta física, aunque puedan generar eventos.",
      "Sleeping reduce coste de cuerpos en reposo; despertar/invalidar correctamente es parte de la corrección, no solo una optimización."
    ],
    "concept": "Un step físico real coordina integración, broad phase, narrow phase, island building, solving, sleeping y eventos; el orden es parte del contrato del engine.",
    "rules": [
      "No llames gameplay arbitrario desde mitad del solver si puede mutar el mundo; difiere eventos/comandos.",
      "Perfila candidatos broad-phase, contactos, islands, iteraciones y tiempo por step.",
      "Mantén tests reproducibles: stacks, pirámides, péndulos, CCD, ratios de masa y escenas de stress."
    ],
    "deep": {
      "intro": "Integrar física en el engine con un pipeline reproducible, eventos diferidos, filtros, sleeping y telemetría que permita diagnosticar inestabilidad.",
      "sections": [
        {
          "title": "Pipeline",
          "body": "Integrate forces→update proxies→find pairs→manifolds→islands→solve→integrate poses→sleep/events es un esquema conceptual; engines concretos pueden reordenar/substep."
        },
        {
          "title": "Filtering",
          "body": "Layers/masks y callbacks deciden qué shapes interactúan. Sensors detectan overlap sin aplicar respuesta de contacto ordinaria."
        },
        {
          "title": "Sleeping",
          "body": "Cuerpos casi inmóviles pueden dormir hasta recibir una perturbación relevante, reduciendo solver/broad-phase work."
        },
        {
          "title": "Métricas",
          "body": "No ajustes friction/iterations a ciegas: captura tiempo, contactos, residual/error, wakes y substeps para localizar el cuello."
        }
      ]
    },
    "example": {
      "problem": "Escena genera 12000 pares broad-phase y 1800 manifolds. ¿Ratio de confirmación porcentual?",
      "steps": [
        "1800/12000=0.15=15%."
      ],
      "solution": "15%."
    },
    "check": {
      "question": "¿Un sensor/trigger debe necesariamente producir impulso de separación?",
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
          "Solo si es estático",
          false
        ]
      ],
      "feedback": "Collision filtering y triggers/sensors evitan resolver pares que no deben producir respuesta física, aunque puedan generar eventos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "1800/12000 en porcentaje.",
        "answer": "15%",
        "hint": "Divide y multiplica por 100."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Sleeping puede reducir trabajo sin borrar el body del mundo?",
        "answer": "si",
        "hint": "Mantiene estado inactivo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Conviene mutar shapes desde un callback en mitad del solver sin contrato?",
        "answer": "no",
        "hint": "Difiere cambios estructurales."
      }
    ]
  }
});
