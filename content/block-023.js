/**
 * BLOQUE 023 — Ciberseguridad de sistemas
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar identidad, autorización, privilegio y aislamiento.
 * Un mecanismo reduce una superficie concreta; ninguno convierte por sí solo
 * a un sistema en “seguro”.
 */
window.LEARNING_PATHS[23] = {
  "level": "Experto progresivo",
  "estimatedHours": 76,
  "description": "Ciberseguridad de sistemas desde threat modeling y access control hasta privilegios Linux, sandboxing, containers y diseño de aislamiento.",
  "outcomes": [
    "Modelar amenazas, superficies de ataque y trust boundaries y traducirlas en controles verificables.",
    "Separar autenticación, autorización, access control y privilege con modelos de política adecuados.",
    "Razonar sobre permisos Linux, SUID, capabilities, no_new_privs, seccomp, Landlock y containers sin confundir sus garantías.",
    "Diseñar privilege separation, isolation y defense in depth según TCB, blast radius y recursos realmente compartidos."
  ],
  "modules": [
    {
      "id": "m1-threat-auth",
      "title": "Amenazas e identidad",
      "description": "Threat modeling, privilegio, autenticación y autorización",
      "lessons": [
        "sec-threat-attack-surface",
        "sec-privilege-least",
        "sec-authn-authz",
        "sec-access-control"
      ]
    },
    {
      "id": "m2-linux-credentials",
      "title": "Credenciales y privilegios Linux",
      "description": "Permisos, SUID y capabilities",
      "lessons": [
        "sec-linux-permissions",
        "sec-suid-credentials",
        "sec-capabilities-nnp"
      ]
    },
    {
      "id": "m3-sandbox-isolation",
      "title": "Sandboxing e aislamiento",
      "description": "Seccomp, Landlock, containers y fronteras",
      "lessons": [
        "sec-sandbox-seccomp",
        "sec-containers-isolation",
        "sec-isolation-boundaries"
      ]
    },
    {
      "id": "m4-design",
      "title": "Diseño seguro",
      "description": "Privilege separation e integración",
      "lessons": [
        "sec-privsep-design",
        "sec-system-integration"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "sec-threat-attack-surface": {
    "id": "sec-threat-attack-surface",
    "courseId": 23,
    "title": "Threat modeling y superficie de ataque",
    "shortTitle": "No puedes proteger lo que no has modelado",
    "duration": 105,
    "objective": "construir un threat model que conecte activos, trust boundaries, entradas, privilegios y escenarios de abuso sin convertir una checklist en una garantía.",
    "summary": [
      "Un threat model identifica activos, adversarios, trust boundaries, superficies de ataque y consecuencias antes de elegir controles.",
      "Attack surface es el conjunto de interfaces y caminos alcanzables por los que una entrada o actor puede influir en el sistema; reducirla no equivale a eliminar riesgo.",
      "Los controles deben vincularse a amenazas concretas y verificarse con evidencia; “está detrás del firewall” no es una propiedad de seguridad suficiente."
    ],
    "concept": "Modelar seguridad consiste en preguntar qué debe permanecer cierto aun cuando componentes fallen, inputs sean hostiles o una identidad legítima sea abusada.",
    "diagram": [],
    "rules": [
      "Empieza por activos y trust boundaries, no por una lista de productos.",
      "Distingue probabilidad, impacto y detectabilidad; no todo riesgo merece el mismo control.",
      "Revisa el modelo cuando cambien arquitectura, privilegios, dependencias o exposición."
    ],
    "deep": {
      "sections": [
        {
          "title": "Activos y adversarios",
          "body": "Un activo puede ser secreto, integridad de una base de datos, disponibilidad o autoridad para realizar una acción. El adversario se modela por capacidades: remoto/no autenticado, usuario autenticado, proceso comprometido, insider, etc."
        },
        {
          "title": "Trust boundaries",
          "body": "Una trust boundary es un punto donde cambian supuestos de confianza o autoridad: navegador→API, proceso→kernel, container→host, servicio→base de datos. Cada cruce requiere validar identidad, autorización, formato y contexto."
        },
        {
          "title": "Attack surface y abuse cases",
          "body": "Puertos, syscalls, parsers, formatos, IPC, plugins, credenciales y operaciones administrativas pueden formar parte de la superficie. Los abuse cases describen cómo se violaría una propiedad y permiten justificar controles y tests."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una API interna solo es accesible desde la red corporativa. ¿Debe omitirse del threat model?",
      "steps": [
        [
          "Paso 1",
          "La ubicación de red reduce algunos caminos, pero no elimina compromisos internos ni SSRF/proxies mal configurados."
        ],
        [
          "Paso 2",
          "La API sigue cruzando una trust boundary y procesa entradas."
        ],
        [
          "Paso 3",
          "Debe modelarse con autenticación, autorización y validación apropiadas a su impacto."
        ]
      ],
      "answer": "“Interno” modifica el modelo de amenaza; no convierte una interfaz en confiable por definición."
    },
    "check": {
      "question": "¿Reducir la superficie de ataque garantiza que no existan vulnerabilidades?",
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
          "Solo si no hay Internet",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Reduce oportunidades, no demuestra ausencia de fallos."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una trust boundary marca un cambio de supuestos de confianza/autoridad?",
        "answer": "si",
        "hint": "Ese es su propósito."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un endpoint solo accesible por VPN puede seguir formando parte de la superficie de ataque?",
        "answer": "si",
        "hint": "Accesibilidad restringida no es inexistencia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un threat model debe actualizarse si un servicio adquiere una nueva credencial con más privilegios?",
        "answer": "si",
        "hint": "Cambia el impacto y las capacidades del componente."
      }
    ]
  },
  "sec-privilege-least": {
    "id": "sec-privilege-least",
    "courseId": 23,
    "title": "Privilegio y principio de mínimo privilegio",
    "shortTitle": "La autoridad también es superficie",
    "duration": 100,
    "objective": "razonar sobre privilegio como autoridad para afectar recursos y aplicar least privilege por identidad, proceso, tiempo y operación.",
    "summary": [
      "Privilege es autoridad efectiva, no una etiqueta binaria root/no-root. Puede provenir de UID, capabilities, tokens, ACL, roles, credenciales cloud o acceso a sockets sensibles.",
      "Least privilege significa conceder solo la autoridad necesaria para la tarea y durante el tiempo necesario; no significa simplemente “ejecutar como usuario no root”.",
      "Reducir privilegios limita blast radius cuando un componente falla o es comprometido."
    ],
    "concept": "El objetivo no es que un componente tenga “pocos permisos” en abstracto, sino que la autoridad disponible sea mínima respecto a su función y separable de otras funciones.",
    "diagram": [],
    "rules": [
      "No otorgues una capability amplia si basta una operación mediada por un helper estrecho.",
      "Separa privilegios de arranque de privilegios de operación estable cuando sea posible.",
      "Mide blast radius: pregunta qué puede hacer un atacante después de comprometer el componente."
    ],
    "deep": {
      "sections": [
        {
          "title": "Autoridad efectiva",
          "body": "El privilegio surge de la combinación de identidad, credenciales, namespace, política y handles ya abiertos. Cambiar UID no revoca mágicamente file descriptors o secretos que el proceso ya posee."
        },
        {
          "title": "Temporalidad",
          "body": "Un daemon puede necesitar bindear un puerto, abrir un dispositivo o leer una clave al iniciar y después reducir autoridad. Drop-privilege seguro requiere entender qué recursos siguen heredados y qué acciones futuras son necesarias."
        },
        {
          "title": "Privilegio mínimo y composición",
          "body": "Un servicio no root dentro de un container puede seguir tener acceso potente al host si monta sockets administrativos o dispositivos. Least privilege debe evaluarse en la frontera real, no por una sola bandera."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un servicio deja de ser root después de abrir un socket administrativo del host. ¿El riesgo desaparece?",
      "steps": [
        [
          "Paso 1",
          "El UID efectivo puede reducirse."
        ],
        [
          "Paso 2",
          "El file descriptor abierto sigue representando autoridad si permanece utilizable."
        ],
        [
          "Paso 3",
          "Debe cerrarse o mediarse el recurso sensible si ya no es necesario."
        ]
      ],
      "answer": "Cambiar identidad no revoca automáticamente capacidades ya materializadas como handles."
    },
    "check": {
      "question": "¿Least privilege equivale a “no root”?",
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
          "Solo en containers",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Es un principio de autoridad mínima, no una prueba basada en UID."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Reducir privilegios puede disminuir el blast radius de un compromiso?",
        "answer": "si",
        "hint": "Menos autoridad disponible limita acciones posteriores."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un file descriptor abierto puede conservar autoridad tras cambiar de UID?",
        "answer": "si",
        "hint": "La autoridad ya puede estar materializada en el handle."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Least privilege debe considerar también duración y contexto del permiso?",
        "answer": "si",
        "hint": "Autoridad mínima incluye cuándo y dónde es necesaria."
      }
    ]
  },
  "sec-authn-authz": {
    "id": "sec-authn-authz",
    "courseId": 23,
    "title": "Autenticación, autorización y contexto",
    "shortTitle": "Quién eres no decide por sí solo qué puedes hacer",
    "duration": 105,
    "objective": "separar identificación, autenticación, autorización y accounting/contexto, y diseñar decisiones que no confundan identidad válida con permiso válido.",
    "summary": [
      "Authentication establece o verifica una identidad/credencial bajo un método; authorization decide si esa identidad/contexto puede realizar una acción sobre un recurso.",
      "Una identidad autenticada puede seguir no autorizada; una decisión de autorización puede depender de recurso, acción, tenant, estado y contexto.",
      "MFA fortalece autenticación frente a ciertas amenazas, pero no reemplaza autorización ni sanea una sesión robada automáticamente."
    ],
    "concept": "El flujo robusto es: establecer identidad → vincularla a contexto confiable → evaluar política sobre acción/recurso → auditar la decisión.",
    "diagram": [],
    "rules": [
      "No uses “logged in” como sustituto de una comprobación de autorización.",
      "La autorización debe aplicarse en el lado que controla el recurso, no solo en la UI.",
      "Evita decisiones basadas en atributos que el cliente puede autoafirmar sin validación."
    ],
    "deep": {
      "sections": [
        {
          "title": "Identificación y autenticación",
          "body": "Un username puede identificar una cuenta; un authenticator demuestra control de un factor/clave bajo un protocolo. Autenticar no determina por sí solo permisos."
        },
        {
          "title": "Autorización",
          "body": "La política responde a una tupla conceptual sujeto, acción, recurso y contexto. Los controles pueden combinar roles, atributos, ownership y restricciones dinámicas."
        },
        {
          "title": "Sesiones y continuidad",
          "body": "Tras autenticación suele emitirse una sesión/token. Proteger el lifecycle de esa sesión, revocación y binding contextual es parte del sistema; MFA al login no neutraliza una sesión ya secuestrada."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Alice está autenticada y cambia /users/123 por /users/124 en una URL. ¿Qué control debe impedir acceso indebido?",
      "steps": [
        [
          "Paso 1",
          "Autenticación ya ocurrió."
        ],
        [
          "Paso 2",
          "La API debe verificar autorización sobre el recurso 124 para Alice."
        ],
        [
          "Paso 3",
          "Ocultar el enlace en la UI no basta."
        ]
      ],
      "answer": "La decisión correcta es autorización server-side sobre la acción y el recurso concretos."
    },
    "check": {
      "question": "¿Una autenticación válida implica autorización para cualquier recurso?",
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
          "Si usa MFA",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Identidad válida y permiso son decisiones distintas."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿MFA sustituye a la autorización?",
        "answer": "no",
        "hint": "Fortalece authentication, no policy de acceso."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Ocultar un botón en frontend es control de autorización suficiente?",
        "answer": "no",
        "hint": "El backend debe proteger el recurso."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una sesión robada puede seguir siendo útil al atacante aunque el login original usara MFA?",
        "answer": "si",
        "hint": "MFA no reautentica cada acción por definición."
      }
    ]
  },
  "sec-access-control": {
    "id": "sec-access-control",
    "courseId": 23,
    "title": "Modelos de control de acceso",
    "shortTitle": "La política vive en relaciones, no en botones",
    "duration": 110,
    "objective": "comparar DAC, MAC, RBAC y ABAC y elegir mecanismos según ownership, etiquetas, roles, atributos y separación de funciones.",
    "summary": [
      "DAC delega decisiones en propietarios/identidades según el modelo; MAC impone política obligatoria mediante etiquetas/reglas; RBAC agrupa permisos en roles; ABAC evalúa atributos y contexto.",
      "Los modelos pueden combinarse; una plataforma real no tiene que pertenecer a una sola caja académica.",
      "Deny/allow, herencia, defaults y precedencia son parte de la semántica y deben probarse explícitamente."
    ],
    "concept": "Access control es evaluación de política sobre sujetos, objetos y operaciones; el mecanismo que expresa la política importa tanto como la lista de permisos.",
    "diagram": [],
    "rules": [
      "Diseña default deny cuando la ausencia de una regla no deba conceder acceso.",
      "Modela separación de funciones para evitar concentrar operaciones incompatibles en una sola identidad.",
      "Prueba herencia y conflictos; una política “correcta” en papel puede cambiar por precedencia."
    ],
    "deep": {
      "sections": [
        {
          "title": "DAC/MAC",
          "body": "DAC suele basarse en ownership y permisos discrecionales. MAC añade restricciones definidas por política central, por ejemplo etiquetas de seguridad, que el propietario ordinario no puede anular libremente."
        },
        {
          "title": "RBAC",
          "body": "RBAC asigna permisos a roles y usuarios a roles. Facilita administración, pero roles demasiado amplios terminan recreando cuentas superusuario con nombres corporativos."
        },
        {
          "title": "ABAC y contexto",
          "body": "ABAC incorpora atributos de sujeto, recurso, acción y entorno: tenant, clasificación, ubicación, device posture, hora, etc. Es expresivo, pero exige gobernanza de atributos y decisiones explicables."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Una aplicación permite editar facturas a “managers”, pero algunos managers no deben aprobar sus propias facturas. ¿Basta RBAC simple?",
      "steps": [
        [
          "Paso 1",
          "El rol aporta una base de autorización."
        ],
        [
          "Paso 2",
          "La decisión también depende de ownership/relación con el recurso."
        ],
        [
          "Paso 3",
          "Se necesita una condición adicional o política contextual."
        ]
      ],
      "answer": "Un rol puede necesitar restricciones por atributos o separación de funciones."
    },
    "check": {
      "question": "¿RBAC y ABAC pueden combinarse en un mismo sistema?",
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
          "Solo en Linux",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Son modelos que pueden componerse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Default deny significa que ausencia de permiso concede acceso?",
        "answer": "no",
        "hint": "Es precisamente lo contrario."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿MAC implica que el propietario ordinario puede siempre ignorar la política central?",
        "answer": "no",
        "hint": "La política obligatoria limita esa discreción."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un RBAC con roles excesivamente amplios puede violar least privilege?",
        "answer": "si",
        "hint": "El nombre del rol no limita su autoridad real."
      }
    ]
  },
  "sec-linux-permissions": {
    "id": "sec-linux-permissions",
    "courseId": 23,
    "title": "Permisos Linux, IDs y resolución de acceso",
    "shortTitle": "rwx es el principio, no el final",
    "duration": 115,
    "objective": "interpretar permisos de archivos/directorios, real/effective IDs, grupos y ACL sin confundir bits rwx con toda la política Linux.",
    "summary": [
      "Los permisos tradicionales combinan owner/group/other con bits rwx, pero la semántica depende de si el objeto es archivo o directorio.",
      "En un directorio, x controla búsqueda/traversal; w permite modificar entradas sujeto a otras reglas, y sticky bit cambia ciertas eliminaciones/renombres.",
      "Las comprobaciones usan credenciales efectivas y pueden interactuar con ACL, capabilities y LSM; chmod no resume toda la decisión."
    ],
    "concept": "La autorización sobre filesystem se evalúa durante path lookup y operaciones concretas usando credenciales y política; “puedo leer el archivo” y “puedo borrar su nombre” son preguntas distintas.",
    "diagram": [],
    "rules": [
      "Para borrar/renombrar una entrada importan permisos del directorio, no solo del archivo.",
      "No uses chmod 777 como diagnóstico permanente de una denegación desconocida.",
      "Separa real UID, effective UID y saved set-ID en programas privilegiados."
    ],
    "deep": {
      "sections": [
        {
          "title": "Archivos y directorios",
          "body": "r en archivo permite leer contenido; w modificarlo; x ejecutarlo según el contexto. En directorios r lista nombres, x permite lookup/traversal y w modificar entradas."
        },
        {
          "title": "IDs y grupos",
          "body": "Linux mantiene real/effective/saved IDs; las comprobaciones ordinarias suelen usar credenciales efectivas. Supplementary groups añaden memberships y deben considerarse en el modelo."
        },
        {
          "title": "ACL y capas adicionales",
          "body": "POSIX ACL pueden ampliar la expresión de permisos, mientras LSM como SELinux/AppArmor puede imponer restricciones adicionales. Un allow DAC no obliga a un LSM a permitir."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un archivo es 444, pero su directorio es writable por Bob. ¿Puede Bob potencialmente eliminar el nombre del archivo?",
      "steps": [
        [
          "Paso 1",
          "El bit w del archivo controla modificar su contenido."
        ],
        [
          "Paso 2",
          "Eliminar una entrada es una operación sobre el directorio."
        ],
        [
          "Paso 3",
          "Si permisos/flags del directorio lo permiten, el archivo read-only puede ser desenlazado."
        ]
      ],
      "answer": "La mutación del namespace depende principalmente del directorio, no del bit w del contenido."
    },
    "check": {
      "question": "¿El bit x de un directorio significa “ejecutar el directorio”?",
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
          "Solo para root",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "En directorios significa search/traverse."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Para recorrer /a/b suele necesitarse permiso x en los directorios del camino?",
        "answer": "si",
        "hint": "Path lookup requiere search."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿chmod 777 garantiza que SELinux permitirá una operación?",
        "answer": "no",
        "hint": "LSM es una capa adicional."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Borrar un nombre depende de permisos del directorio más que del bit w del archivo?",
        "answer": "si",
        "hint": "unlink modifica la entrada del directorio."
      }
    ]
  },
  "sec-suid-credentials": {
    "id": "sec-suid-credentials",
    "courseId": 23,
    "title": "SUID, SGID y transiciones de credenciales",
    "shortTitle": "exec puede cambiar quién eres... efectivamente",
    "duration": 120,
    "objective": "explicar set-user-ID/set-group-ID, real/effective/saved IDs, execve y riesgos de confused deputy sin convertir SUID en sinónimo de root.",
    "summary": [
      "En Linux, ejecutar un archivo set-user-ID puede cambiar el effective UID al owner del archivo, sujeto a condiciones como no_new_privs, nosuid y tracing.",
      "SUID no significa necesariamente root; depende del propietario, y los IDs real/effective/saved tienen funciones distintas.",
      "Un programa privilegiado debe validar argumentos, entorno, paths, descriptors y autoridad del invocador; es un punto de alto impacto."
    ],
    "concept": "SUID es un mecanismo de transición de credenciales durante exec; el riesgo surge porque código controlado por un usuario pasa a ejercer autoridad de otra identidad.",
    "diagram": [],
    "rules": [
      "No confíes en PATH/entorno no saneado dentro de código privilegiado.",
      "Usa APIs que eviten TOCTOU/path races cuando la seguridad dependa del objeto exacto.",
      "Prefiere delegar una operación estrecha a exponer un programa SUID complejo."
    ],
    "deep": {
      "sections": [
        {
          "title": "Real/effective/saved IDs",
          "body": "El real UID suele reflejar al invocador; el effective UID se usa para muchas comprobaciones; saved set-ID permite ciertos cambios/re-engagement según las reglas del sistema."
        },
        {
          "title": "execve y SUID",
          "body": "execve puede aplicar bits set-user-ID/set-group-ID. Linux documenta condiciones que anulan la ganancia, incluyendo no_new_privs y mounts nosuid."
        },
        {
          "title": "Confused deputy",
          "body": "Un programa con autoridad puede ser engañado para usarla en beneficio de quien no la posee. La defensa es validar intención, objeto, identidad y contexto, no solo comprobar que “la llamada vino de un usuario”."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un binario es propiedad de user backup y tiene setuid. ¿Al ejecutarlo se vuelve necesariamente root?",
      "steps": [
        [
          "Paso 1",
          "Setuid usa el owner del archivo, no el concepto genérico “superuser”."
        ],
        [
          "Paso 2",
          "El effective UID puede pasar a backup, sujeto a las reglas de exec."
        ],
        [
          "Paso 3",
          "No implica UID 0 salvo que el owner sea root."
        ]
      ],
      "answer": "SUID es una transición hacia el owner del ejecutable, no sinónimo universal de root."
    },
    "check": {
      "question": "¿no_new_privs puede impedir que execve otorgue privilegios mediante setuid/file capabilities?",
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
          "Solo en containers",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Ese es uno de sus contratos centrales en Linux."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un archivo setuid propiedad de un usuario no-root eleva automáticamente a root?",
        "answer": "no",
        "hint": "El owner concreto importa."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El environment puede formar parte de la superficie de un programa privilegiado?",
        "answer": "si",
        "hint": "Variables, PATH y locale pueden alterar comportamiento."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una comprobación de path y un open posterior pueden sufrir TOCTOU si el namespace cambia entre ambos?",
        "answer": "si",
        "hint": "Check/use separados pueden referirse a objetos distintos."
      }
    ]
  },
  "sec-capabilities-nnp": {
    "id": "sec-capabilities-nnp",
    "courseId": 23,
    "title": "Linux capabilities y no_new_privs",
    "shortTitle": "Dividir root no convierte cada trozo en inocuo",
    "duration": 120,
    "objective": "razonar sobre capability sets, file capabilities y no_new_privs como mecanismos de autoridad granular con interacción de exec y user namespaces.",
    "summary": [
      "Linux divide privilegios tradicionales de root en capabilities por thread, con conjuntos permitted, effective, inheritable, bounding y ambient.",
      "Una capability sigue siendo autoridad potente; algunas, especialmente CAP_SYS_ADMIN, abarcan muchas operaciones y requieren threat modeling serio.",
      "no_new_privs garantiza que execve no conceda nueva autoridad que no existiera sin el exec, bloqueando elevación por setuid/setgid y file capabilities en ese camino."
    ],
    "concept": "Capabilities permiten expresar partes de autoridad privilegiada, pero su semántica depende de sets, exec transitions y user namespaces; una lista de nombres no basta.",
    "diagram": [],
    "rules": [
      "Minimiza tanto el effective como el bounding set cuando sea posible.",
      "No asumas que capability dentro de un user namespace equivale a la misma autoridad sobre el host.",
      "Usa no_new_privs como pieza de hardening, no como sandbox completa."
    ],
    "deep": {
      "sections": [
        {
          "title": "Capability sets",
          "body": "Permitted limita capabilities que pueden hacerse efectivas; effective es lo que se consulta para operaciones; inheritable/ambient participan en transiciones; bounding limita lo que puede obtenerse a través de file capabilities."
        },
        {
          "title": "Exec y file capabilities",
          "body": "Los file capabilities pueden influir en los conjuntos tras exec. Las reglas incluyen interacciones con UID, securebits y ambient set, por lo que deben diseñarse y probarse explícitamente."
        },
        {
          "title": "no_new_privs",
          "body": "Una vez establecido, se hereda y no puede desactivarse. Su garantía se centra en impedir ganancia de privilegio por exec; no revoca autoridad ya existente ni bloquea todas las vías de cambio de estado."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un proceso establece no_new_privs=1 y después ejecuta un binario setuid-root. ¿Debe ese exec concederle el privilegio setuid?",
      "steps": [
        [
          "Paso 1",
          "no_new_privs persiste a través de exec."
        ],
        [
          "Paso 2",
          "La transformación setuid/file capability se vuelve no elevadora para ese exec."
        ],
        [
          "Paso 3",
          "El proceso no debe ganar autoridad por ese mecanismo."
        ]
      ],
      "answer": "no_new_privs está diseñado precisamente para evitar esa ganancia por exec."
    },
    "check": {
      "question": "¿no_new_privs elimina capabilities que el proceso ya tenía antes de activarlo?",
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
          "Siempre las mueve a ambient",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Evita nuevas ganancias por exec; no es una revocación universal."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Capabilities son por-thread en el modelo Linux?",
        "answer": "si",
        "hint": "capabilities(7) las describe como atributos por thread."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿CAP_SYS_ADMIN debe considerarse una capability estrecha de una sola operación?",
        "answer": "no",
        "hint": "Agrupa una superficie muy amplia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El bounding set puede limitar capabilities obtenibles en transiciones posteriores?",
        "answer": "si",
        "hint": "Es una de sus funciones."
      }
    ]
  },
  "sec-sandbox-seccomp": {
    "id": "sec-sandbox-seccomp",
    "courseId": 23,
    "title": "Sandboxing: seccomp, Landlock y reducción de superficie",
    "shortTitle": "Una sandbox es una frontera, no una pegatina",
    "duration": 125,
    "objective": "diseñar una sandbox por allowlist de recursos y syscalls, entendiendo qué protege seccomp, qué puede restringir Landlock y qué queda fuera.",
    "summary": [
      "seccomp filtra syscalls entrantes de un proceso y reduce la superficie del kernel alcanzable, pero no expresa por sí solo una política completa sobre objetos de filesystem.",
      "Landlock permite a procesos restringir derechos sobre recursos soportados mediante una capa LSM stackable; namespaces ayudan a vistas aisladas pero no son un sistema fino de access control.",
      "Una sandbox robusta compone reducción de privilegios, filesystem/network policy, syscall filtering y lifecycle; ningún mecanismo aislado es “la sandbox”."
    ],
    "concept": "El sandboxing reduce qué efectos son alcanzables después de un compromiso. Debe diseñarse desde las operaciones mínimas requeridas y probarse contra el comportamiento real del programa.",
    "diagram": [],
    "rules": [
      "Prefiere allowlists mínimas de syscalls cuando el workload sea estable y medible.",
      "Instala restricciones antes de procesar input no confiable y después de adquirir solo los recursos necesarios.",
      "Incluye canales laterales de autoridad: file descriptors heredados, sockets, IPC y mounts."
    ],
    "deep": {
      "sections": [
        {
          "title": "seccomp",
          "body": "Seccomp-BPF evalúa número/argumentos de syscalls y devuelve acciones como allow/deny/kill/trap según configuración. Reducir syscalls disminuye código de kernel alcanzable, pero una syscall permitida puede seguir operar sobre recursos poderosos."
        },
        {
          "title": "Landlock",
          "body": "Landlock permite self-restriction sin privilegios en escenarios soportados y se apila con controles existentes. Su propósito es access control, a diferencia de namespaces, que principalmente aíslan vistas/identificadores."
        },
        {
          "title": "Composición",
          "body": "Una sandbox útil puede combinar no_new_privs, seccomp, namespaces, Landlock/LSM, UID/capabilities y límites de recursos. El orden de inicialización importa porque hay operaciones necesarias solo durante setup."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un parser necesita leer un archivo ya abierto y escribir por un pipe. ¿Puede cerrarse gran parte de su superficie antes de parsear?",
      "steps": [
        [
          "Paso 1",
          "Abre/valida recursos necesarios durante setup."
        ],
        [
          "Paso 2",
          "Reduce privilegios y aplica filtros/políticas antes del input hostil."
        ],
        [
          "Paso 3",
          "Opera usando handles mínimos ya adquiridos."
        ]
      ],
      "answer": "Privilege separation y pre-opening pueden reducir recursos y syscalls disponibles durante la fase peligrosa."
    },
    "check": {
      "question": "¿Seccomp demuestra que una syscall permitida es usada de forma segura?",
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
          "Solo si usa BPF",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Filtra reachability; no prueba la lógica de cada uso."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Seccomp puede reducir el conjunto de syscalls alcanzables?",
        "answer": "si",
        "hint": "Ese es su propósito principal."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Namespaces son por sí solos un sistema fino de access control de archivos?",
        "answer": "no",
        "hint": "Aíslan vistas; no sustituyen policy fina."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una sandbox debe considerar file descriptors heredados como autoridad?",
        "answer": "si",
        "hint": "Un handle abierto puede atravesar muchas restricciones de path."
      }
    ]
  },
  "sec-containers-isolation": {
    "id": "sec-containers-isolation",
    "courseId": 23,
    "title": "Containers e aislamiento",
    "shortTitle": "Mismo kernel, frontera distinta",
    "duration": 120,
    "objective": "evaluar containers como composición de namespaces, cgroups, credenciales, mounts y policy, distinguiendo aislamiento de virtualización y de una frontera de host absoluta.",
    "summary": [
      "Un container comparte kernel con el host en el modelo Linux común; namespaces aíslan vistas y cgroups controlan/contabilizan recursos, pero no crean una VM por sí solos.",
      "La fuerza de aislamiento depende de configuración: user namespaces, capabilities, seccomp, LSM, mounts, devices, sockets y exposición del runtime.",
      "Privileged containers o mounts administrativos pueden reducir drásticamente la frontera; “está en un container” no es un control suficiente."
    ],
    "concept": "Container es una unidad operacional construida sobre primitivas del kernel. Su aislamiento real es la intersección de todas las fronteras y recursos expuestos.",
    "diagram": [],
    "rules": [
      "Evita privileged salvo necesidad excepcional y threat model explícito.",
      "No montes sockets de control del host en workloads no confiables.",
      "Usa user namespaces/rootless donde encaje, pero entiende sus límites y compatibilidad."
    ],
    "deep": {
      "sections": [
        {
          "title": "Shared kernel",
          "body": "A diferencia de una VM clásica con kernel invitado, containers Linux normalmente comparten el kernel host. Una vulnerabilidad kernel alcanzable puede cruzar la frontera de userspace."
        },
        {
          "title": "Resource/control planes",
          "body": "cgroups limitan recursos; namespaces aíslan vistas; capabilities/LSM/seccomp restringen autoridad. Un runtime coordina estas piezas y añade su propia superficie."
        },
        {
          "title": "Privileged y host integration",
          "body": "`--privileged`, host PID/network namespaces, devices, bind mounts o sockets de runtime pueden conceder autoridad extensa. El riesgo debe evaluarse por recursos concretos, no por el nombre “container”."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un container no-root tiene montado el socket administrativo del runtime del host con permisos de escritura. ¿Es automáticamente low-privilege?",
      "steps": [
        [
          "Paso 1",
          "UID dentro del container es solo una parte del modelo."
        ],
        [
          "Paso 2",
          "El socket puede representar autoridad para crear/controlar workloads del host."
        ],
        [
          "Paso 3",
          "El montaje puede destruir gran parte de la separación esperada."
        ]
      ],
      "answer": "Los handles y APIs administrativas expuestas pueden dominar el modelo de privilegios."
    },
    "check": {
      "question": "¿Un container Linux común ejecuta necesariamente un kernel independiente del host?",
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
          "Solo si usa cgroups",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Normalmente comparte kernel; una VM es una frontera diferente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Namespaces y cgroups resuelven exactamente el mismo problema?",
        "answer": "no",
        "hint": "Vistas vs recursos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un container privileged puede tener una frontera mucho más débil que uno restringido?",
        "answer": "si",
        "hint": "La configuración de autoridad importa."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Montar un socket administrativo del host puede ser más crítico que ejecutar con UID no-root?",
        "answer": "si",
        "hint": "El socket puede otorgar autoridad efectiva muy alta."
      }
    ]
  },
  "sec-isolation-boundaries": {
    "id": "sec-isolation-boundaries",
    "courseId": 23,
    "title": "Fronteras de aislamiento y defense in depth",
    "shortTitle": "Una capa falla; el sistema debería seguir teniendo capas",
    "duration": 115,
    "objective": "comparar procesos, containers, VMs y sandboxes como fronteras con distintos TCB y diseñar defense in depth sin asumir independencia inexistente.",
    "summary": [
      "Isolation describe qué fallos/acciones de un componente no deben afectar a otro; su fuerza depende del Trusted Computing Base compartido.",
      "Procesos separados comparten kernel; containers añaden aislamiento de vistas/policy pero siguen compartiendo kernel; VMs añaden un hypervisor y normalmente kernels separados.",
      "Defense in depth requiere fallos parcialmente independientes; apilar tres controles que dependen de la misma credencial no crea tres fronteras reales."
    ],
    "concept": "Una frontera de seguridad se evalúa por qué componente media el acceso y qué parte debe mantenerse correcta. Compartir TCB crea modos de fallo comunes.",
    "diagram": [],
    "rules": [
      "Documenta qué TCB protege cada frontera.",
      "Evita llamar “air gap” o “isolated” a una mera regla de routing sin validar caminos alternativos.",
      "Combina controles preventivos, detectivos y de recuperación con supuestos diferentes."
    ],
    "deep": {
      "sections": [
        {
          "title": "TCB",
          "body": "El TCB incluye componentes cuya corrección es necesaria para la propiedad. Un sandbox de proceso depende del kernel; una VM depende además del hypervisor y hardware para su aislamiento."
        },
        {
          "title": "Independencia de controles",
          "body": "Firewall + aplicación + DB policy pueden formar capas útiles si comprometer una no concede automáticamente las credenciales de las demás. Si todas aceptan el mismo token omnipotente, la independencia disminuye."
        },
        {
          "title": "Blast radius y segmentation",
          "body": "Segmentation divide sistemas por confianza/impacto. La seguridad no se mide por número de segmentos sino por rutas autorizadas, identidades y mecanismos que median cruces."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Dos servicios están en containers separados pero ambos montan el mismo directorio host writable. ¿Están aislados respecto a esos datos?",
      "steps": [
        [
          "Paso 1",
          "Namespaces pueden separar otros recursos."
        ],
        [
          "Paso 2",
          "El mount compartido crea una vía explícita de interacción."
        ],
        [
          "Paso 3",
          "La propiedad “no pueden afectar datos del otro” ya no se cumple para ese directorio."
        ]
      ],
      "answer": "La frontera se evalúa por recursos reales compartidos, no por el número de containers."
    },
    "check": {
      "question": "¿Tres controles que dependen de la misma credencial comprometida son necesariamente tres capas independientes?",
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
          "Siempre si están en procesos distintos",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Comparten un modo de fallo común."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Dos procesos distintos siguen compartiendo el kernel del mismo SO?",
        "answer": "si",
        "hint": "La frontera de proceso depende del kernel."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una VM suele añadir una frontera diferente a un container al usar kernel invitado/hypervisor?",
        "answer": "si",
        "hint": "El TCB y la mediación cambian."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un recurso writable compartido puede atravesar una frontera de aislamiento aparente?",
        "answer": "si",
        "hint": "Es un canal explícito de autoridad/interacción."
      }
    ]
  },
  "sec-privsep-design": {
    "id": "sec-privsep-design",
    "courseId": 23,
    "title": "Privilege separation y diseño de componentes",
    "shortTitle": "El parser no necesita las llaves del castillo",
    "duration": 120,
    "objective": "diseñar sistemas que separen componentes expuestos de componentes privilegiados mediante IPC estrecho, validación y reducción de autoridad.",
    "summary": [
      "Privilege separation divide una aplicación para que el componente que procesa input hostil tenga la menor autoridad posible y solicite operaciones sensibles a un broker pequeño.",
      "El IPC se convierte en una nueva trust boundary: mensajes, identidad del peer, orden, replay y validación deben formar parte del diseño.",
      "Un broker privilegiado pequeño no es automáticamente seguro; su API debe ser estrecha, determinista y auditable."
    ],
    "concept": "En vez de blindar un proceso enorme con privilegios, mueve la autoridad a un componente mínimo y transforma “ejecuta cualquier cosa” en operaciones específicas verificables.",
    "diagram": [],
    "rules": [
      "No diseñes un helper privilegiado cuya API sea “ejecuta esta shell command”.",
      "Valida parámetros y resource identity dentro del componente que posee la autoridad.",
      "Cierra capabilities/descriptors innecesarios en ambos lados después del setup."
    ],
    "deep": {
      "sections": [
        {
          "title": "Broker privilegiado",
          "body": "El broker posee una capacidad estrecha: abrir un recurso permitido, cambiar una configuración específica o realizar una operación definida. El frontend no recibe autoridad general."
        },
        {
          "title": "IPC como protocolo",
          "body": "Usa framing robusto, límites, tipos explícitos y autenticación del peer cuando corresponda. Un parser IPC vulnerable puede trasladar el problema al proceso privilegiado."
        },
        {
          "title": "TOCTOU y object handles",
          "body": "Cuando sea posible, pasa handles/FDs de objetos validados en lugar de pathnames que puedan resolverse de forma diferente después. El broker debe revalidar lo que realmente va a afectar."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Un frontend no privilegiado pide al broker `delete(path)`. ¿Qué riesgo existe si el broker confía ciegamente en el pathname?",
      "steps": [
        [
          "Paso 1",
          "El pathname puede cambiar de resolución mediante races/mounts/symlinks según el entorno."
        ],
        [
          "Paso 2",
          "El broker tiene más autoridad y debe validar el objeto/política al usarla."
        ],
        [
          "Paso 3",
          "Una API basada en handles o resolución segura puede reducir ambigüedad."
        ]
      ],
      "answer": "La autoridad debe validar en el punto de uso, no delegar la decisión al componente menos confiable."
    },
    "check": {
      "question": "¿Privilege separation elimina la necesidad de validar el IPC?",
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
          "Solo si usa Unix sockets",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "El IPC pasa a ser una trust boundary."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El componente que parsea input hostil debería tener menos autoridad cuando sea posible?",
        "answer": "si",
        "hint": "Reduce blast radius."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un helper root con API “ejecuta comando arbitrario” respeta una interfaz estrecha?",
        "answer": "no",
        "hint": "Expone autoridad general."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La validación crítica debe ocurrir en el componente que ejerce la autoridad?",
        "answer": "si",
        "hint": "No confíes en decisiones del frontend comprometible."
      }
    ]
  },
  "sec-system-integration": {
    "id": "sec-system-integration",
    "courseId": 23,
    "title": "Integración: diseñar y auditar una frontera de servicio",
    "shortTitle": "De threat model a controles verificables",
    "duration": 135,
    "objective": "integrar threat modeling, least privilege, authn/authz, Linux credentials, sandboxing y isolation en una arquitectura revisable y medible.",
    "summary": [
      "Una arquitectura segura conecta cada amenaza con una propiedad, un control, una evidencia y una estrategia de fallo/recovery.",
      "La secuencia de inicialización importa: adquirir recursos mínimos, validar configuración, reducir privilegios, instalar sandbox y solo entonces procesar input hostil es un patrón común.",
      "Observabilidad y tests adversariales deben comprobar que los controles realmente bloquean acciones, no solo que la configuración “parece segura”."
    ],
    "concept": "La seguridad de sistemas emerge de composición correcta: identidad, autoridad, aislamiento, mediación y observabilidad deben contar la misma historia.",
    "diagram": [],
    "rules": [
      "Documenta explícitamente qué ocurre si el parser, worker, broker o credential store se compromete.",
      "Incluye tests negativos: operaciones que deben fallar y caminos que deben ser inaccesibles.",
      "Trata cambios de configuración y dependencias como cambios del threat model."
    ],
    "deep": {
      "sections": [
        {
          "title": "Secuencia de hardening",
          "body": "Un servicio puede arrancar con autoridad temporal, abrir sockets/recursos, crear workers, cerrar handles, drop capabilities, fijar no_new_privs y aplicar seccomp/Landlock antes de aceptar input no confiable."
        },
        {
          "title": "Evidencia",
          "body": "Comprueba UID/capability sets, namespaces, filtros seccomp, mounts y permisos efectivos; prueba que syscalls/paths/acciones prohibidas realmente fallen."
        },
        {
          "title": "Incidentes y recuperación",
          "body": "Isolation limita el blast radius, pero también necesitas logs confiables, rotación/revocación de credenciales, reconstrucción y análisis post-incidente. Prevention no sustituye recovery."
        }
      ],
      "commonErrors": [],
      "connections": []
    },
    "example": {
      "problem": "Diseñas un servicio que escucha red y necesita una operación privilegiada excepcional. ¿Cómo reduces el riesgo?",
      "steps": [
        [
          "Paso 1",
          "Separa frontend expuesto y broker mínimo."
        ],
        [
          "Paso 2",
          "Reduce privilegios/superficie del frontend y define IPC estrecho."
        ],
        [
          "Paso 3",
          "Aplica autorización en el broker y prueba acciones denegadas."
        ]
      ],
      "answer": "La composición reduce autoridad del componente más expuesto y centraliza la operación sensible en una frontera pequeña."
    },
    "check": {
      "question": "¿Una auditoría de seguridad debe probar también que operaciones prohibidas fallen?",
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
          "Solo en producción",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Los tests negativos verifican la política efectiva."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Cambiar dependencias puede requerir revisar el threat model?",
        "answer": "si",
        "hint": "La superficie y TCB pueden cambiar."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿La observabilidad sustituye a controles preventivos?",
        "answer": "no",
        "hint": "Detectar y prevenir son funciones diferentes."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El orden de adquirir recursos y aplicar sandbox puede afectar si el servicio sigue funcionando con autoridad mínima?",
        "answer": "si",
        "hint": "Algunas operaciones solo deben existir en setup."
      }
    ]
  }
});
