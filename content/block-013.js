/**
 * BLOQUE 013 — Sistemas de archivos
 *
 * Contenido pedagógico únicamente. app.js renderiza, state.js persiste y
 * challenges.js aporta el nivel 4.
 *
 * Regla editorial: separar namespace, objeto VFS, handle abierto, layout
 * on-disk y durabilidad. Compartir la palabra "archivo" no fusiona capas.
 */

window.LEARNING_PATHS[13] = {
  "level": "Experto progresivo",
  "estimatedHours": 44,
  "description": "Namespaces, VFS, estructuras on-disk, crash consistency, caching y diseños clásicos/modernos desde syscall hasta bloques persistentes.",
  "outcomes": [
    "Seguir un pathname desde resolución de nombres hasta el objeto abierto y su mapeo de almacenamiento.",
    "Distinguir file descriptor, open file description, dentry, inode, mount, VFS y estructuras on-disk.",
    "Razonar sobre crash consistency, journaling, page cache, fsync y copy-on-write sin confundir visibilidad con durabilidad.",
    "Comparar ext4, FAT, NTFS, ZFS y Btrfs por mecanismos e invariantes y construir un filesystem educativo verificable."
  ],
  "modules": [
    {
      "id": "m1-namespace",
      "title": "Namespace y objetos",
      "description": "Nombres, objetos y handles abiertos.",
      "lessons": [
        "fs-files-pathnames",
        "fs-directories-inodes",
        "fs-file-descriptors",
        "fs-permissions-links"
      ]
    },
    {
      "id": "m2-layout",
      "title": "Layout y VFS",
      "description": "Bloques, mounts y una implementación concreta.",
      "lessons": [
        "fs-blocks-allocation",
        "fs-mounting-vfs",
        "fs-ext4"
      ]
    },
    {
      "id": "m3-consistency",
      "title": "Consistencia y caching",
      "description": "Crash recovery, cachés y persistencia.",
      "lessons": [
        "fs-journaling-crash",
        "fs-page-cache-durability"
      ]
    },
    {
      "id": "m4-designs",
      "title": "Diseños alternativos",
      "description": "Formatos clásicos y copy-on-write moderno.",
      "lessons": [
        "fs-fat-ntfs",
        "fs-cow-zfs-btrfs"
      ]
    },
    {
      "id": "m5-project",
      "title": "Proyecto integrador",
      "description": "Construir y verificar un filesystem pequeño.",
      "lessons": [
        "fs-educational-project"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "fs-files-pathnames": {
    "id": "fs-files-pathnames",
    "courseId": 13,
    "title": "Archivos, pathnames y namespaces",
    "shortTitle": "El nombre no es el archivo",
    "duration": 90,
    "objective": "distinguir contenido, objeto de filesystem, pathname y namespace, y explicar por qué renombrar no equivale a reescribir los datos.",
    "summary": [
      "Un pathname es una ruta de resolución dentro de un namespace, no la identidad intrínseca del archivo.",
      "Los nombres viven en directorios; los datos y metadatos pertenecen a objetos gestionados por el filesystem.",
      "Un mismo objeto puede ser alcanzable por más de un nombre mediante hard links cuando el filesystem lo permite."
    ],
    "concept": "Un filesystem organiza objetos persistentes y nombres. Resolver `/a/b/c` significa recorrer componentes dentro de un namespace hasta obtener el objeto correspondiente; el string de la ruta no es el objeto.",
    "diagram": [],
    "rules": [
      "Separa nombre, objeto y contenido.",
      "No asumas que rename copia los bytes del archivo.",
      "No confundas ruta absoluta con dirección física en disco."
    ],
    "deep": {
      "sections": [
        {
          "title": "Path lookup",
          "body": "Cada componente se resuelve respecto a un directorio y un punto de montaje. Symlinks pueden introducir nuevas rutas a resolver."
        },
        {
          "title": "Identidad",
          "body": "En Unix-like, nombres de directorio pueden apuntar al mismo inode mediante hard links; borrar un nombre no destruye necesariamente el objeto si quedan referencias."
        },
        {
          "title": "Atomicidad de namespace",
          "body": "Operaciones como rename pueden ofrecer garantías fuertes dentro de un mismo filesystem, pero persistencia tras crash exige analizar además durabilidad."
        }
      ],
      "commonErrors": [
        "Creer que el pathname está almacenado dentro del inode como identidad única.",
        "Confundir unlink con borrado inmediato de bloques aunque existan descriptores abiertos."
      ],
      "connections": [
        "Directorios",
        "Inodes",
        "VFS"
      ]
    },
    "example": {
      "problem": "Se renombra `/tmp/a` a `/tmp/b` dentro del mismo filesystem.",
      "steps": [
        [
          "Paso 1",
          "Se modifica la asociación nombre→objeto en el namespace."
        ],
        [
          "Paso 2",
          "Los datos del archivo no necesitan copiarse por ese hecho."
        ],
        [
          "Paso 3",
          "La persistencia del cambio depende de las garantías y sincronización del filesystem."
        ]
      ],
      "answer": "Rename cambia principalmente el namespace, no el contenido del archivo."
    },
    "check": {
      "question": "¿Un pathname es la identidad física universal de un archivo?",
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
          "Solo en ext4",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un mismo objeto Unix puede tener dos hard links? sí/no",
        "answer": "si",
        "hint": "Dos nombres pueden referenciar el mismo inode."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿unlink de un nombre destruye obligatoriamente el contenido si un proceso lo mantiene abierto? sí/no",
        "answer": "no",
        "hint": "Las referencias abiertas pueden mantener vivo el objeto."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿rename dentro del mismo filesystem exige copiar todos los bytes del archivo? sí/no",
        "answer": "no",
        "hint": "Es una operación de namespace."
      }
    ]
  },
  "fs-directories-inodes": {
    "id": "fs-directories-inodes",
    "courseId": 13,
    "title": "Directorios, metadata e inodes",
    "shortTitle": "El objeto detrás del nombre",
    "duration": 90,
    "objective": "explicar la relación entre entrada de directorio, dentry, inode y metadata sin tratar inode como sinónimo de filename.",
    "summary": [
      "Un directorio relaciona nombres con objetos del filesystem según el formato concreto.",
      "En Linux VFS, una dentry representa una asociación de nombre durante path lookup y normalmente referencia un inode.",
      "El inode modela un objeto y su metadata; múltiples dentries pueden apuntar al mismo inode."
    ],
    "concept": "El inode no es “el nombre del archivo”. En VFS representa el objeto; la dentry participa en la resolución del nombre. Los detalles on-disk dependen del filesystem concreto.",
    "diagram": [],
    "rules": [
      "No universalices estructuras de ext4 a todos los filesystems.",
      "Distingue inode VFS en memoria de su posible representación on-disk.",
      "Hard link significa varios nombres hacia el mismo objeto, no copia de contenido."
    ],
    "deep": {
      "sections": [
        {
          "title": "Metadata",
          "body": "Permisos, propietario, timestamps, tamaño y punteros/extents son ejemplos habituales, pero el formato exacto varía."
        },
        {
          "title": "Dentries",
          "body": "La dentry cache acelera path lookup y representa asociaciones de nombres; una dentry negativa puede cachear que un nombre no existe."
        },
        {
          "title": "Hard links",
          "body": "Dos entradas de directorio pueden referir el mismo inode. El contador de links participa en el lifetime persistente del objeto."
        }
      ],
      "commonErrors": [
        "Decir que el inode contiene siempre el pathname completo.",
        "Asumir que inode number es globalmente único entre todos los filesystems montados."
      ],
      "connections": [
        "VFS",
        "Hard links",
        "Caches"
      ]
    },
    "example": {
      "problem": "`a` y `b` son hard links al mismo inode.",
      "steps": [
        [
          "Paso 1",
          "Ambos nombres resuelven al mismo objeto."
        ],
        [
          "Paso 2",
          "Modificar los bytes por `a` se observa al leer por `b`."
        ],
        [
          "Paso 3",
          "Eliminar `a` elimina una asociación de nombre, no necesariamente el objeto."
        ]
      ],
      "answer": "La identidad del objeto se comparte; los nombres son entradas distintas."
    },
    "check": {
      "question": "¿Una dentry y un inode representan exactamente la misma cosa?",
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
          "Solo con hard links",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Puede un inode tener varias dentries por hard links? sí/no",
        "answer": "si",
        "hint": "Linux VFS lo permite para archivos regulares."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El inode contiene necesariamente el pathname completo? sí/no",
        "answer": "no",
        "hint": "El nombre pertenece al namespace/directorios."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un inode number aislado identifica universalmente un archivo entre todos los mounts? sí/no",
        "answer": "no",
        "hint": "Necesitas contexto del filesystem/superblock."
      }
    ]
  },
  "fs-file-descriptors": {
    "id": "fs-file-descriptors",
    "courseId": 13,
    "title": "File descriptors y open file descriptions",
    "shortTitle": "El entero que no es el archivo",
    "duration": 90,
    "objective": "distinguir descriptor, entrada por proceso, open file description y objeto de filesystem, y razonar sobre offset compartido tras dup/fork.",
    "summary": [
      "Un file descriptor es un pequeño entero que indexa una tabla del proceso.",
      "En Linux/POSIX, varios descriptors pueden referir la misma open file description y compartir file offset/status flags.",
      "El descriptor no es el inode ni una dirección de disco."
    ],
    "concept": "`open()` crea/obtiene estado de apertura; el proceso recibe un descriptor. `dup()` crea otro descriptor que puede compartir la misma descripción abierta, incluido el offset.",
    "diagram": [],
    "rules": [
      "fd 3 solo tiene significado dentro del contexto apropiado del proceso.",
      "Distingue flags del descriptor como close-on-exec de status flags de la open file description.",
      "Cerrar un descriptor no borra el archivo."
    ],
    "deep": {
      "sections": [
        {
          "title": "Tablas",
          "body": "El descriptor indexa una entrada por proceso; esa entrada referencia estado de apertura del kernel."
        },
        {
          "title": "Offsets",
          "body": "`dup()` y descriptores heredados pueden compartir offset porque apuntan a la misma open file description."
        },
        {
          "title": "Lifetime",
          "body": "Un objeto unlinkado puede seguir accesible mientras existan referencias abiertas; se libera cuando terminan las referencias relevantes."
        }
      ],
      "commonErrors": [
        "Llamar inode al número de fd.",
        "Suponer que dos llamadas independientes a open comparten siempre offset."
      ],
      "connections": [
        "Syscalls",
        "Processes",
        "Inodes"
      ]
    },
    "example": {
      "problem": "`fd2 = dup(fd1)` y luego se lee 10 bytes por `fd1`.",
      "steps": [
        [
          "Paso 1",
          "fd1 y fd2 son números distintos."
        ],
        [
          "Paso 2",
          "Ambos refieren la misma open file description."
        ],
        [
          "Paso 3",
          "El offset compartido avanza, por lo que la siguiente lectura por fd2 comienza después de esos bytes."
        ]
      ],
      "answer": "`dup` duplica el descriptor, no el estado de apertura subyacente."
    },
    "check": {
      "question": "¿`dup()` suele crear una open file description totalmente independiente?",
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
          "Solo en ext4",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un fd es un entero local al proceso? sí/no",
        "answer": "si",
        "hint": "Indexa su tabla de descriptors."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿dup puede compartir file offset? sí/no",
        "answer": "si",
        "hint": "Comparte la open file description."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Dos open independientes del mismo pathname deben compartir offset? sí/no",
        "answer": "no",
        "hint": "Normalmente crean open file descriptions distintas."
      }
    ]
  },
  "fs-blocks-allocation": {
    "id": "fs-blocks-allocation",
    "courseId": 13,
    "title": "Bloques, extents y asignación",
    "shortTitle": "Dónde viven los bytes",
    "duration": 90,
    "objective": "explicar granularidad de bloques, asignación, extents, sparse files y por qué tamaño lógico y espacio físico pueden diferir.",
    "summary": [
      "Los filesystems gestionan almacenamiento en unidades y estructuras propias; “block” puede significar cosas distintas según la capa.",
      "Un extent describe un rango contiguo, reduciendo metadata frente a mapear bloque por bloque.",
      "Un sparse file puede tener tamaño lógico grande sin consumir bloques físicos para todos sus huecos."
    ],
    "concept": "El filesystem traduce offsets lógicos del archivo a ubicaciones de almacenamiento. Esa traducción puede usar bloques directos, árboles de extents u otras estructuras.",
    "diagram": [],
    "rules": [
      "No confundas filesystem block con sector físico o página NAND.",
      "Tamaño lógico no implica espacio asignado igual.",
      "La fragmentación afecta layout y rendimiento, pero no altera la secuencia lógica de bytes."
    ],
    "deep": {
      "sections": [
        {
          "title": "Granularidad",
          "body": "El tamaño de bloque del filesystem condiciona asignación y metadata, pero dispositivos inferiores tienen sus propias granularidades."
        },
        {
          "title": "Extents",
          "body": "Un extent representa un rango lógico→físico contiguo; ext4 usa extents para archivos modernos."
        },
        {
          "title": "Sparse files",
          "body": "Huecos no asignados se leen como ceros según la semántica habitual sin requerir bloques físicos equivalentes."
        }
      ],
      "commonErrors": [
        "Afirmar que todo archivo ocupa ceil(size/sector) sectores contiguos.",
        "Confundir hole lógico con bytes cero físicamente escritos."
      ],
      "connections": [
        "ext4",
        "SSD/NAND",
        "Fragmentation"
      ]
    },
    "example": {
      "problem": "Se crea un archivo sparse de 1 TiB escribiendo solo un byte al final.",
      "steps": [
        [
          "Paso 1",
          "El tamaño lógico puede quedar cercano a 1 TiB."
        ],
        [
          "Paso 2",
          "La mayoría del rango puede permanecer como holes sin bloques asignados."
        ],
        [
          "Paso 3",
          "El espacio real consumido depende de metadata y bloques realmente materializados."
        ]
      ],
      "answer": "Logical size y allocated space pueden diferir drásticamente."
    },
    "check": {
      "question": "¿Un archivo sparse de 1 TiB necesita obligatoriamente 1 TiB de bloques físicos?",
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
          "Solo en SSD",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Extent representa un rango contiguo? sí/no",
        "answer": "si",
        "hint": "Agrupa bloques/rangos."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Filesystem block y página NAND son necesariamente la misma unidad? sí/no",
        "answer": "no",
        "hint": "Pertenecen a capas distintas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Los holes de un sparse file pueden leerse como ceros sin estar físicamente escritos? sí/no",
        "answer": "si",
        "hint": "Esa es la idea del sparse mapping."
      }
    ]
  },
  "fs-permissions-links": {
    "id": "fs-permissions-links",
    "courseId": 13,
    "title": "Permisos, hard links y symbolic links",
    "shortTitle": "Nombres, permisos y enlaces",
    "duration": 90,
    "objective": "razonar sobre permisos Unix, traversal de directorios y diferencias de hard/symbolic links sin reducir permisos a rwx del archivo final.",
    "summary": [
      "Los permisos de directorio controlan operaciones sobre el namespace: search/execute, listado y modificación tienen semánticas distintas.",
      "Un hard link referencia el mismo objeto; un symbolic link contiene una ruta que debe resolverse.",
      "Permisos tradicionales rwx no abarcan todos los mecanismos posibles: ACLs, capabilities y políticas adicionales pueden intervenir."
    ],
    "concept": "Acceder a `/a/b/file` exige atravesar directorios y resolver permisos/contexto en cada etapa. El modo del archivo final no resume por sí solo toda la decisión de acceso.",
    "diagram": [],
    "rules": [
      "Execute en directorio significa search/traversal, no “ejecutar la carpeta”.",
      "Un symlink puede quedar dangling si su destino deja de resolver.",
      "Hard links y symlinks tienen reglas distintas de filesystem y directorios."
    ],
    "deep": {
      "sections": [
        {
          "title": "Directorios",
          "body": "Read permite listar nombres; execute/search permite atravesar/resolver componentes; write participa en crear/eliminar entradas sujeto a otras reglas."
        },
        {
          "title": "Hard links",
          "body": "Mismo objeto, mismo contenido/metadata esencial; normalmente no cruzan filesystems."
        },
        {
          "title": "Symlinks",
          "body": "Objeto que contiene una ruta; puede cruzar filesystems porque se resuelve de nuevo como pathname."
        }
      ],
      "commonErrors": [
        "Mirar solo permisos del archivo y olvidar directorios padre.",
        "Decir que symlink y hard link son dos nombres para la misma técnica."
      ],
      "connections": [
        "Security",
        "VFS",
        "Namespaces"
      ]
    },
    "example": {
      "problem": "Un usuario tiene `r--` sobre un directorio pero no `x`.",
      "steps": [
        [
          "Paso 1",
          "Puede listar nombres si las demás condiciones lo permiten."
        ],
        [
          "Paso 2",
          "Sin search/execute no puede resolver normalmente entradas internas por nombre."
        ],
        [
          "Paso 3",
          "Leer una lista no equivale a poder atravesarla."
        ]
      ],
      "answer": "Los bits rwx cambian de significado operacional según sea archivo o directorio."
    },
    "check": {
      "question": "¿Execute en un directorio significa principalmente permiso de búsqueda/traversal?",
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
          "Solo en FAT",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un symlink puede apuntar a una ruta que no existe? sí/no",
        "answer": "si",
        "hint": "Puede quedar dangling."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Hard link y symlink comparten necesariamente inode? sí/no",
        "answer": "no",
        "hint": "El symlink es otro objeto con una ruta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Los permisos del archivo final bastan siempre para decidir acceso por pathname? sí/no",
        "answer": "no",
        "hint": "También importa traversal y otros controles."
      }
    ]
  },
  "fs-mounting-vfs": {
    "id": "fs-mounting-vfs",
    "courseId": 13,
    "title": "Mounting y VFS",
    "shortTitle": "Un namespace sobre muchos filesystems",
    "duration": 90,
    "objective": "explicar cómo mounts y VFS componen un namespace único sobre múltiples implementaciones sin confundir montaje con copia de directorios.",
    "summary": [
      "Montar conecta la raíz de un filesystem con un punto del namespace.",
      "Linux VFS proporciona interfaces y objetos comunes para que syscalls operen sobre múltiples filesystems.",
      "El mismo pathname visible puede atravesar varios mounts durante su resolución."
    ],
    "concept": "VFS desacopla las operaciones genéricas (`open`, `read`, `lookup`) de implementaciones como ext4, tmpfs o NFS. Un mount aporta contexto para interpretar dentries/inodes dentro del namespace.",
    "diagram": [],
    "rules": [
      "Mount no copia el contenido dentro del directorio de montaje.",
      "El contenido previo del mountpoint puede quedar oculto mientras el mount está activo.",
      "VFS es una capa de abstracción del kernel, no un formato on-disk."
    ],
    "deep": {
      "sections": [
        {
          "title": "Superblock",
          "body": "VFS representa una instancia montada mediante estructuras asociadas al filesystem y su superblock."
        },
        {
          "title": "Path walk",
          "body": "La resolución puede cruzar mountpoints y cambiar de filesystem manteniendo un namespace coherente."
        },
        {
          "title": "Polimorfismo",
          "body": "Operaciones VFS delegan en callbacks del filesystem concreto; la syscall puede ser la misma con implementaciones distintas."
        }
      ],
      "commonErrors": [
        "Confundir VFS con VFS Global de visados. El kernel no tramita pasaportes, por ahora.",
        "Creer que mount mueve físicamente archivos al mountpoint."
      ],
      "connections": [
        "Kernel",
        "Namespaces",
        "Filesystems"
      ]
    },
    "example": {
      "problem": "Se monta un filesystem en `/mnt/data`.",
      "steps": [
        [
          "Paso 1",
          "El pathname `/mnt/data` se convierte en punto de cruce hacia la raíz del filesystem montado."
        ],
        [
          "Paso 2",
          "Las operaciones posteriores se delegan a esa implementación."
        ],
        [
          "Paso 3",
          "Al desmontar reaparece el contenido original del directorio mountpoint si existía."
        ]
      ],
      "answer": "Mount modifica la vista del namespace, no copia bytes por sí mismo."
    },
    "check": {
      "question": "¿VFS es un formato de disco como ext4?",
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
          "Solo en Linux 6.x",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Un pathname puede cruzar un mountpoint? sí/no",
        "answer": "si",
        "hint": "La resolución del namespace puede cambiar de filesystem."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿mount copia físicamente los archivos al directorio de montaje? sí/no",
        "answer": "no",
        "hint": "Conecta namespaces."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿VFS permite una interfaz común sobre ext4 y tmpfs? sí/no",
        "answer": "si",
        "hint": "Ese desacoplamiento es central."
      }
    ]
  },
  "fs-journaling-crash": {
    "id": "fs-journaling-crash",
    "courseId": 13,
    "title": "Journaling y consistencia tras crash",
    "shortTitle": "Escribir sin dejar cadáveres",
    "duration": 90,
    "objective": "explicar cómo journaling protege invariantes de metadata, diferenciar orden, atomicidad y durabilidad, y razonar sobre fsync.",
    "summary": [
      "Journaling registra cambios dentro de transacciones para facilitar recuperación tras crash.",
      "Metadata journaling no implica automáticamente que los últimos bytes de usuario estén durables.",
      "Orden, atomicidad y durabilidad son propiedades diferentes; `write()` exitoso no equivale universalmente a “ya está en medio estable”."
    ],
    "concept": "Un journal permite recuperar un estado consistente reproduciendo o descartando transacciones según el diseño. La política exacta de datos y metadata depende del filesystem y modo de operación.",
    "diagram": [],
    "rules": [
      "No confundas consistencia estructural con conservación de los datos más recientes.",
      "`fsync(file)` y persistencia de la entrada de directorio son cuestiones relacionadas pero distintas según operación/filesystem.",
      "Las caches de dispositivo y barreras forman parte del razonamiento de durabilidad."
    ],
    "deep": {
      "sections": [
        {
          "title": "Transacciones",
          "body": "Cambios relacionados se agrupan para que la recuperación pueda reconocer qué conjunto estaba comprometido."
        },
        {
          "title": "Write ordering",
          "body": "El orden visible en código no es prueba del orden persistente; capas de caché pueden reordenar o diferir I/O."
        },
        {
          "title": "fsync",
          "body": "Solicita sincronizar estado asociado al descriptor según la interfaz, pero aplicaciones robustas deben razonar también sobre creación/rename y directorios."
        }
      ],
      "commonErrors": [
        "Decir que journaling hace imposible toda pérdida de datos.",
        "Asumir que close() equivale siempre a fsync()."
      ],
      "connections": [
        "ext4",
        "Storage stack",
        "Databases"
      ]
    },
    "example": {
      "problem": "Una aplicación escribe un archivo temporal, hace fsync, rename al nombre final y quiere durabilidad del nombre.",
      "steps": [
        [
          "Paso 1",
          "Sincronizar datos del archivo reduce riesgo de contenido no persistido."
        ],
        [
          "Paso 2",
          "Rename actualiza namespace/metadata."
        ],
        [
          "Paso 3",
          "Para garantías fuertes tras pérdida de energía, puede ser necesario sincronizar también el directorio según plataforma/filesystem y patrón."
        ]
      ],
      "answer": "Crash consistency exige analizar datos y namespace, no solo que una syscall devolvió éxito."
    },
    "check": {
      "question": "¿Journaling de metadata garantiza por sí solo que los últimos datos de usuario sobrevivan cualquier pérdida de energía?",
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
          "Solo en HDD",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Atomicidad y durabilidad son la misma propiedad? sí/no",
        "answer": "no",
        "hint": "Una operación puede ser atómica pero aún no durable."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿write exitoso prueba universalmente persistencia física inmediata? sí/no",
        "answer": "no",
        "hint": "Puede haber caches y writeback."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Journaling puede reducir el trabajo de recuperación tras crash? sí/no",
        "answer": "si",
        "hint": "Registra transacciones/metadatos para recovery."
      }
    ]
  },
  "fs-ext4": {
    "id": "fs-ext4",
    "courseId": 13,
    "title": "ext4: inodes, extents y journal",
    "shortTitle": "Un filesystem real bajo el microscopio",
    "duration": 90,
    "objective": "relacionar bloques, grupos, bitmaps, inodes, extents y journal de ext4 sin presentar sus decisiones como universales.",
    "summary": [
      "ext4 organiza almacenamiento en block groups y mantiene estructuras de asignación e inodes on-disk.",
      "Los archivos modernos pueden usar extent trees para mapear rangos lógicos a físicos.",
      "ext4 integra journaling mediante JBD2 y dispone de modos con distintas políticas sobre datos."
    ],
    "concept": "ext4 es una implementación concreta del contrato VFS. Estudiarla permite ver cómo abstracciones como inode, archivo y journal terminan en estructuras on-disk, sin confundir esa implementación con “la definición de filesystem”.",
    "diagram": [],
    "rules": [
      "Ext4 inode on-disk y VFS inode no son la misma estructura.",
      "Los detalles de journal/data mode importan para durabilidad.",
      "No generalices tamaños o campos concretos a FAT, NTFS o ZFS."
    ],
    "deep": {
      "sections": [
        {
          "title": "Block groups",
          "body": "Agrupan metadata y datos para escalabilidad/localidad; bitmaps y tablas ayudan a gestionar asignación."
        },
        {
          "title": "Extents",
          "body": "El árbol de extents representa rangos y escala mejor que listas simples de bloques para archivos grandes."
        },
        {
          "title": "JBD2",
          "body": "El journal gestiona transacciones de metadata y recuperación; ext4 puede configurar cómo ordenar datos respecto al commit."
        }
      ],
      "commonErrors": [
        "Afirmar que ext4 guarda siempre cada bloque en punteros directos clásicos.",
        "Confundir journal con backup completo del filesystem."
      ],
      "connections": [
        "VFS",
        "Journaling",
        "Block allocation"
      ]
    },
    "example": {
      "problem": "Un archivo grande y contiguo necesita representar 100000 bloques.",
      "steps": [
        [
          "Paso 1",
          "Mapear cada bloque individualmente aumenta metadata."
        ],
        [
          "Paso 2",
          "Un extent puede describir muchos bloques consecutivos con un rango."
        ],
        [
          "Paso 3",
          "Un árbol de extents escala cuando hacen falta múltiples rangos."
        ]
      ],
      "answer": "Extents comprimen la descripción del mapeo, no los datos del archivo."
    },
    "check": {
      "question": "¿ext4 usa extents para representar rangos de bloques en archivos modernos?",
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
          "Solo para directorios",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿El journal de ext4 es un backup completo? sí/no",
        "answer": "no",
        "hint": "Registra cambios/transacciones, no una copia integral."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un extent puede representar múltiples bloques contiguos? sí/no",
        "answer": "si",
        "hint": "Ese es su objetivo."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La estructura on-disk de ext4 define todos los filesystems Unix? sí/no",
        "answer": "no",
        "hint": "Es una implementación concreta."
      }
    ]
  },
  "fs-fat-ntfs": {
    "id": "fs-fat-ntfs",
    "courseId": 13,
    "title": "FAT y NTFS: otros diseños, otras invariantes",
    "shortTitle": "No todo el mundo tiene inodes",
    "duration": 90,
    "objective": "comparar conceptualmente FAT y NTFS y reconocer que conceptos Unix como inode no deben proyectarse literalmente sobre formatos distintos.",
    "summary": [
      "FAT encadena clusters mediante una File Allocation Table y usa entradas de directorio con metadata del formato.",
      "NTFS organiza gran parte de su metadata alrededor de la Master File Table (MFT) y atributos.",
      "Ambos exponen archivos y directorios, pero sus estructuras internas no son ext4 con nombres diferentes."
    ],
    "concept": "Comparar formatos obliga a separar la abstracción de usuario de la estructura on-disk. “Archivo” existe en todos, pero inode, FAT chain y MFT record son mecanismos distintos.",
    "diagram": [],
    "rules": [
      "No llames inode a una entrada MFT.",
      "FAT cluster chain no es un extent tree de ext4.",
      "Las garantías de crash consistency y metadata varían por filesystem/version/configuración."
    ],
    "deep": {
      "sections": [
        {
          "title": "FAT",
          "body": "La tabla enlaza clusters de un archivo; el diseño es simple y ampliamente interoperable, con limitaciones según variante."
        },
        {
          "title": "NTFS",
          "body": "La MFT almacena records con atributos; datos pequeños pueden ser resident y otros atributos non-resident referenciar runs."
        },
        {
          "title": "Comparación",
          "body": "La API del SO puede ocultar diferencias, pero recovery, permisos, timestamps, sparse/compression y naming dependen del formato."
        }
      ],
      "commonErrors": [
        "Decir “NTFS usa inodes” como equivalencia literal.",
        "Asumir que interoperabilidad implica semántica idéntica."
      ],
      "connections": [
        "On-disk formats",
        "Windows",
        "VFS abstraction"
      ]
    },
    "example": {
      "problem": "Se quiere enseñar “qué identifica un archivo” en ext4, FAT y NTFS.",
      "steps": [
        [
          "Paso 1",
          "En ext4 puedes estudiar inodes on-disk."
        ],
        [
          "Paso 2",
          "En FAT estudias directory entries y chains de clusters."
        ],
        [
          "Paso 3",
          "En NTFS estudias MFT records y atributos."
        ]
      ],
      "answer": "La abstracción archivo permanece; la representación cambia."
    },
    "check": {
      "question": "¿Es correcto llamar literalmente inode a toda estructura de metadata de NTFS?",
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
          "Solo en SSD",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿FAT usa una tabla de asignación para encadenar clusters? sí/no",
        "answer": "si",
        "hint": "Está en el nombre del formato."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿NTFS usa la MFT como estructura central de metadata? sí/no",
        "answer": "si",
        "hint": "Master File Table."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La misma syscall obliga a que dos filesystems tengan el mismo layout on-disk? sí/no",
        "answer": "no",
        "hint": "VFS/OS abstraen implementaciones."
      }
    ]
  },
  "fs-cow-zfs-btrfs": {
    "id": "fs-cow-zfs-btrfs",
    "courseId": 13,
    "title": "Copy-on-write, ZFS y Btrfs",
    "shortTitle": "Escribir en otro sitio primero",
    "duration": 90,
    "objective": "explicar copy-on-write, snapshots, reflinks y checksums distinguiendo sharing lógico, durabilidad e integridad.",
    "summary": [
      "Copy-on-write evita sobrescribir inmediatamente bloques compartidos: escribe nuevas versiones y actualiza referencias.",
      "Snapshots y reflinks pueden compartir bloques inicialmente y divergir al modificarse.",
      "Btrfs checksummea datos y metadata por defecto; ZFS combina COW con checksums y un modelo integrado de almacenamiento."
    ],
    "concept": "COW convierte muchas actualizaciones en creación de nueva versión + cambio de raíces/referencias. Esto facilita snapshots y consistencia estructural, pero introduce write amplification, fragmentación y necesidades propias de gestión de espacio.",
    "diagram": [],
    "rules": [
      "COW no significa copia completa del archivo en cada write.",
      "Snapshot instantáneo no significa coste cero para siempre.",
      "Checksum detecta corrupción; reparación automática requiere una copia redundante válida y política capaz de usarla."
    ],
    "deep": {
      "sections": [
        {
          "title": "Snapshots",
          "body": "Una snapshot conserva una raíz/estado anterior y comparte bloques hasta que cambios fuerzan nuevas versiones."
        },
        {
          "title": "Reflinks",
          "body": "Dos archivos pueden compartir extents físicos sin ser hard links: tienen identidades distintas y COW al modificar."
        },
        {
          "title": "Checksums",
          "body": "Btrfs verifica checksums de datos/metadata; ZFS usa checksums end-to-end dentro de su diseño. Integridad y redundancia son conceptos separados."
        }
      ],
      "commonErrors": [
        "Confundir reflink con hard link.",
        "Afirmar que checksum por sí solo recupera el dato correcto."
      ],
      "connections": [
        "Snapshots",
        "Integrity",
        "Storage"
      ]
    },
    "example": {
      "problem": "Se crea un reflink de un archivo de 100 GiB y se modifican 4 KiB en la copia.",
      "steps": [
        [
          "Paso 1",
          "Inicialmente gran parte de los bloques puede estar compartida."
        ],
        [
          "Paso 2",
          "La escritura crea bloques nuevos para la región modificada según el diseño COW."
        ],
        [
          "Paso 3",
          "Los archivos siguen siendo objetos independientes aunque compartan almacenamiento físico."
        ]
      ],
      "answer": "COW permite sharing físico con semántica de archivos separados."
    },
    "check": {
      "question": "¿Un reflink es necesariamente el mismo objeto/inode que el original como un hard link?",
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
          "Solo en ZFS",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿COW exige copiar el archivo completo en cada escritura? sí/no",
        "answer": "no",
        "hint": "Se copian/modifican unidades afectadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Checksum sin redundancia garantiza poder reparar corrupción? sí/no",
        "answer": "no",
        "hint": "Puede detectar sin tener copia correcta."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Snapshots pueden compartir bloques con el estado activo inicialmente? sí/no",
        "answer": "si",
        "hint": "COW hace sharing hasta divergir."
      }
    ]
  },
  "fs-page-cache-durability": {
    "id": "fs-page-cache-durability",
    "courseId": 13,
    "title": "Page cache, writeback y fsync",
    "shortTitle": "Rápido ahora, persistente después",
    "duration": 90,
    "objective": "explicar page cache, dirty pages, writeback y fsync separando visibilidad en memoria de durabilidad en almacenamiento.",
    "summary": [
      "El SO puede servir lecturas y acumular escrituras mediante page cache.",
      "Una write puede hacer visible el dato a otros procesos antes de que llegue al medio persistente.",
      "Writeback mueve páginas dirty hacia almacenamiento según políticas; fsync solicita sincronización más fuerte para el archivo."
    ],
    "concept": "Caching desacopla latencia de syscall de latencia de dispositivo. La consecuencia es que “la aplicación ya ve el dato” y “el dato sobrevivirá a pérdida de energía” son preguntas distintas.",
    "diagram": [],
    "rules": [
      "Page cache no es la caché L1/L2/L3 de CPU.",
      "Dirty significa modificado respecto al backing store, no “corrupto”.",
      "fsync no transforma automáticamente una secuencia multiarchivo en transacción atómica."
    ],
    "deep": {
      "sections": [
        {
          "title": "Read cache",
          "body": "Lecturas recientes pueden reutilizar páginas residentes y evitar I/O al dispositivo."
        },
        {
          "title": "Writeback",
          "body": "Escrituras pueden ensuciar páginas y completarse lógicamente antes de su flush físico."
        },
        {
          "title": "Durability protocol",
          "body": "Aplicaciones críticas diseñan secuencias de write/fsync/rename/directorio de acuerdo con garantías de plataforma y filesystem."
        }
      ],
      "commonErrors": [
        "Confundir page cache con caché hardware de CPU.",
        "Usar sleep como sustituto de fsync para durabilidad."
      ],
      "connections": [
        "Virtual memory",
        "Journaling",
        "Databases"
      ]
    },
    "example": {
      "problem": "`write()` devuelve 4096, y otro proceso lee inmediatamente los nuevos bytes.",
      "steps": [
        [
          "Paso 1",
          "Los bytes pueden estar en page cache y ser coherentemente visibles."
        ],
        [
          "Paso 2",
          "Eso no prueba que hayan alcanzado medio persistente."
        ],
        [
          "Paso 3",
          "Un crash/power loss obliga a analizar writeback, caches de dispositivo y fsync/barreras."
        ]
      ],
      "answer": "Visibilidad y durabilidad son dimensiones distintas."
    },
    "check": {
      "question": "¿Que otro proceso lea los nuevos bytes prueba que ya son persistentes tras pérdida de energía?",
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
          "Solo con SSD",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Una página dirty está modificada respecto al backing store? sí/no",
        "answer": "si",
        "hint": "Ese es el sentido de dirty en cache."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Page cache y L1 CPU cache son la misma estructura? sí/no",
        "answer": "no",
        "hint": "Capas distintas."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿fsync busca reforzar durabilidad del estado asociado al archivo? sí/no",
        "answer": "si",
        "hint": "Solicita sincronización al almacenamiento según interfaz."
      }
    ]
  },
  "fs-educational-project": {
    "id": "fs-educational-project",
    "courseId": 13,
    "title": "Proyecto: construir un filesystem educativo",
    "shortTitle": "Tu primer pequeño reino de inodes",
    "duration": 120,
    "objective": "diseñar e implementar un filesystem educativo con formato documentado, asignación, directorios, lectura/escritura y recuperación verificable.",
    "summary": [
      "El proyecto debe comenzar con una imagen de bloques controlada y un formato on-disk explícito.",
      "Las invariantes deben poder verificarse offline con una herramienta fsck educativa.",
      "La recuperación ante crash se prueba inyectando fallos en puntos definidos, no cruzando los dedos."
    ],
    "concept": "Construir un filesystem obliga a integrar layout, asignación, metadata, namespace, caching y consistencia. La meta es comprender invariantes, no competir con ext4 después de un fin de semana.",
    "diagram": [],
    "rules": [
      "Versiona el superblock/formato desde el principio.",
      "Nunca confíes en metadata on-disk sin validar rangos y checksums si los añades.",
      "Separa core de filesystem de la interfaz FUSE o del emulador de bloques."
    ],
    "deep": {
      "sections": [
        {
          "title": "MVP",
          "body": "Superblock, bitmap, inode table, root directory, create/open/read/write/unlink sobre una imagen de bloques."
        },
        {
          "title": "Invariantes",
          "body": "Todo bloque asignado debe tener propietario válido; ninguna referencia debe salir del volumen; link counts y directorios deben ser coherentes."
        },
        {
          "title": "Crash testing",
          "body": "Añade un dispositivo de bloques simulado que pueda fallar después de N writes y comprueba recovery/fsck."
        }
      ],
      "commonErrors": [
        "Empezar implementando journaling, snapshots y compresión antes de poder leer un archivo.",
        "No disponer de una herramienta que inspeccione el formato on-disk."
      ],
      "connections": [
        "Testing",
        "Allocators",
        "Operating systems"
      ]
    },
    "example": {
      "problem": "Plan de implementación de un filesystem educativo.",
      "steps": [
        [
          "Paso 1",
          "Implementa primero una imagen de bloques y serialización endian-safe."
        ],
        [
          "Paso 2",
          "Añade superblock, asignador e inodes, luego directorios y path lookup."
        ],
        [
          "Paso 3",
          "Añade tests de propiedades, fsck y finalmente crash consistency/journal opcional."
        ]
      ],
      "answer": "El proyecto progresa desde invariantes simples a recuperación, no desde features llamativas hacia una base inexistente."
    },
    "check": {
      "question": "¿Conviene tener un inspector/fsck desde fases tempranas del proyecto?",
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
          "Solo al final",
          false
        ]
      ],
      "success": "Correcto.",
      "failure": "Revisa qué objeto, capa o garantía está actuando realmente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "¿Debe validarse que un block pointer cae dentro del volumen? sí/no",
        "answer": "si",
        "hint": "Metadata corrupta no debe provocar acceso arbitrario."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Es razonable probar crashes inyectando fallos tras N escrituras? sí/no",
        "answer": "si",
        "hint": "Hace reproducible la consistencia."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Hace falta implementar snapshots antes de create/read/write para considerar útil el MVP? sí/no",
        "answer": "no",
        "hint": "Primero invariantes básicas."
      }
    ]
  }
});
