/**
 * BLOQUE 068 — GIT
 *
 * Regla editorial: Git se explica desde su modelo de datos y el grafo.
 * Los comandos son consecuencias de objetos, refs, index y working tree;
 * un servicio de hosting no forma parte necesaria de ese modelo.
 */
window.LEARNING_PATHS[68] = {
  "level": "Git",
  "estimatedHours": 180,
  "description": "Git desde su modelo interno: estados locales, objetos content-addressed, referencias, DAG de commits, transformaciones de historia, remotes, packs y recuperación.",
  "outcomes": [
    "Predecir qué cambia en working tree, index, refs y object database al ejecutar operaciones Git.",
    "Razonar sobre branches, merge, rebase y cherry-pick como transformaciones del grafo de commits.",
    "Inspeccionar blobs, trees, commits, tags, refs y packfiles mediante comandos plumbing.",
    "Recuperar y depurar historia con reflog, reachability y bisect sin depender de recetas memorizadas."
  ],
  "modules": [
    {
      "id": "m1-state",
      "title": "Estado local",
      "description": "Repository, working tree, index y commits",
      "lessons": [
        "git-repository",
        "git-working-tree",
        "git-index",
        "git-commit"
      ]
    },
    {
      "id": "m2-objects",
      "title": "Modelo de objetos",
      "description": "Blobs, trees, refs, HEAD y branches",
      "lessons": [
        "git-blob",
        "git-tree",
        "git-references",
        "git-head",
        "git-branches"
      ]
    },
    {
      "id": "m3-history",
      "title": "Transformaciones del grafo",
      "description": "Merge, rebase, cherry-pick, tags y remotes",
      "lessons": [
        "git-merge",
        "git-rebase",
        "git-cherry-pick",
        "git-tags",
        "git-remotes"
      ]
    },
    {
      "id": "m4-internals",
      "title": "Almacenamiento e internals",
      "description": "Packfiles, object database, hashing y herramientas internas",
      "lessons": [
        "git-packfiles",
        "git-object-database",
        "git-hashing",
        "git-internals"
      ]
    }
  ]
};

Object.assign(window.LESSONS, {
  "git-repository": {
    "id": "git-repository",
    "courseId": 68,
    "title": "Repository: el grafo y la base de objetos",
    "shortTitle": "Repository",
    "duration": 120,
    "objective": "Entender un repositorio Git como metadatos, objetos y referencias, no como una carpeta remota ni como GitHub.",
    "summary": [
      "Un repositorio Git contiene una object database, referencias y metadatos suficientes para reconstruir historia y snapshots alcanzables.",
      "Un repositorio puede ser no-bare, con working tree asociado, o bare, pensado normalmente para intercambio o servidor.",
      "Distribuido significa que un clon normal posee historial y objetos localmente; un remote no es la fuente mágica de verdad del modelo."
    ],
    "concept": "Repositorio ≠ working tree ≠ servicio de hosting: Git es una base de objetos y referencias que puede existir completamente local.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Entender un repositorio Git como metadatos, objetos y referencias, no como una carpeta remota ni como GitHub.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un repositorio Git contiene una object database, referencias y metadatos suficientes para reconstruir historia y snapshots alcanzables."
        },
        {
          "title": "Mecánica",
          "body": "Un repositorio puede ser no-bare, con working tree asociado, o bare, pensado normalmente para intercambio o servidor."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Distribuido significa que un clon normal posee historial y objetos localmente; un remote no es la fuente mágica de verdad del modelo."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Un repositorio tiene 180 MiB de objetos y un working tree de 420 MiB. ¿Cuánto ocupan juntos, ignorando otros metadatos?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "600"
    },
    "check": {
      "question": "¿GitHub es necesario para que exista un repositorio Git?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Repositorio ≠ working tree ≠ servicio de hosting: Git es una base de objetos y referencias que puede existir completamente local."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un repositorio tiene 180 MiB de objetos y un working tree de 420 MiB. ¿Cuánto ocupan juntos, ignorando otros metadatos?",
        "answer": "600",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿GitHub es necesario para que exista un repositorio Git?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un repositorio bare tiene por definición un working tree normal asociado?",
        "answer": "no",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-working-tree": {
    "id": "git-working-tree",
    "courseId": 68,
    "title": "Working tree: materializar un snapshot y editarlo",
    "shortTitle": "Working tree",
    "duration": 120,
    "objective": "Distinguir el estado de archivos visibles del estado preparado y del commit apuntado por HEAD.",
    "summary": [
      "El working tree es la materialización editable de archivos para una revisión o estado del repositorio.",
      "Un archivo modificado en el working tree no forma parte del próximo commit hasta que el index represente esa versión.",
      "`git status` compara conceptualmente HEAD, index y working tree para clasificar cambios."
    ],
    "concept": "Working tree ≠ repository: editar un archivo todavía no crea un objeto commit ni cambia una referencia.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Distinguir el estado de archivos visibles del estado preparado y del commit apuntado por HEAD.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El working tree es la materialización editable de archivos para una revisión o estado del repositorio."
        },
        {
          "title": "Mecánica",
          "body": "Un archivo modificado en el working tree no forma parte del próximo commit hasta que el index represente esa versión."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "`git status` compara conceptualmente HEAD, index y working tree para clasificar cambios."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Hay 14 archivos tracked; 5 están modificados solo en working tree y 3 staged. ¿Cuántos están sin cambios respecto a ambos estados si los grupos no se solapan?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "6"
    },
    "check": {
      "question": "¿Guardar un archivo en el editor equivale a crear un commit?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Working tree ≠ repository: editar un archivo todavía no crea un objeto commit ni cambia una referencia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Hay 14 archivos tracked; 5 están modificados solo en working tree y 3 staged. ¿Cuántos están sin cambios respecto a ambos estados si los grupos no se solapan?",
        "answer": "6",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Guardar un archivo en el editor equivale a crear un commit?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Puede el working tree diferir del index y de HEAD simultáneamente?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-index": {
    "id": "git-index",
    "courseId": 68,
    "title": "Index: el snapshot preparado",
    "shortTitle": "Index",
    "duration": 120,
    "objective": "Usar el index como representación explícita del próximo snapshot, no como una cola abstracta de archivos.",
    "summary": [
      "El index, también llamado staging area, representa el contenido que Git usaría para construir el próximo tree al hacer commit.",
      "`git add` actualiza entradas del index con el contenido seleccionado; no significa solo avisar a Git de un nombre.",
      "Un mismo archivo puede tener una versión staged y otra versión posterior distinta en el working tree."
    ],
    "concept": "Index ≠ lista de archivos cambiados: es una representación del snapshot preparado.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Usar el index como representación explícita del próximo snapshot, no como una cola abstracta de archivos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El index, también llamado staging area, representa el contenido que Git usaría para construir el próximo tree al hacer commit."
        },
        {
          "title": "Mecánica",
          "body": "`git add` actualiza entradas del index con el contenido seleccionado; no significa solo avisar a Git de un nombre."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Un mismo archivo puede tener una versión staged y otra versión posterior distinta en el working tree."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Un archivo tiene 12 líneas staged y después añades 4 líneas sin volver a hacer add. ¿Cuántas de esas 4 líneas nuevas están staged?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "0"
    },
    "check": {
      "question": "¿Un archivo puede estar staged y además tener cambios unstaged?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Index ≠ lista de archivos cambiados: es una representación del snapshot preparado."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un archivo tiene 12 líneas staged y después añades 4 líneas sin volver a hacer add. ¿Cuántas de esas 4 líneas nuevas están staged?",
        "answer": "0",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un archivo puede estar staged y además tener cambios unstaged?",
        "answer": "si",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿`git add` copia conceptualmente al index la versión seleccionada del contenido?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-commit": {
    "id": "git-commit",
    "courseId": 68,
    "title": "Commit: snapshot, padres y metadatos",
    "shortTitle": "Commit",
    "duration": 120,
    "objective": "Comprender un commit como objeto que referencia un tree, padres y metadatos, no como un diff almacenado aislado.",
    "summary": [
      "Un commit apunta a un tree raíz y normalmente a uno o más commits padre, además de autoría, committer, timestamps y mensaje.",
      "El grafo de commits surge de las relaciones de parentesco; los diffs se calculan comparando snapshots o trees.",
      "Dos commits con el mismo snapshot pueden tener IDs diferentes si difieren padres o metadatos."
    ],
    "concept": "Commit ≠ diff: el commit referencia un snapshot y su posición en el grafo; el diff es una comparación derivada.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Comprender un commit como objeto que referencia un tree, padres y metadatos, no como un diff almacenado aislado.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un commit apunta a un tree raíz y normalmente a uno o más commits padre, además de autoría, committer, timestamps y mensaje."
        },
        {
          "title": "Mecánica",
          "body": "El grafo de commits surge de las relaciones de parentesco; los diffs se calculan comparando snapshots o trees."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Dos commits con el mismo snapshot pueden tener IDs diferentes si difieren padres o metadatos."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Un merge commit referencia 1 tree y 2 padres. ¿Cuántas referencias a objetos tree/padres contiene en total, ignorando otros metadatos?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "3"
    },
    "check": {
      "question": "¿Git necesita almacenar cada commit como un parche contra el anterior?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Commit ≠ diff: el commit referencia un snapshot y su posición en el grafo; el diff es una comparación derivada."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un merge commit referencia 1 tree y 2 padres. ¿Cuántas referencias a objetos tree/padres contiene en total, ignorando otros metadatos?",
        "answer": "3",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Git necesita almacenar cada commit como un parche contra el anterior?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cambiar el padre de un commit puede cambiar su object ID aunque el tree sea idéntico?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-blob": {
    "id": "git-blob",
    "courseId": 68,
    "title": "Blob: contenido sin pathname",
    "shortTitle": "Blob",
    "duration": 120,
    "objective": "Entender que un blob representa contenido de archivo y que el nombre o ruta pertenece a los trees.",
    "summary": [
      "Un blob almacena contenido; no contiene por sí mismo el pathname humano del archivo dentro del proyecto.",
      "Si dos rutas tienen exactamente el mismo contenido pueden referenciar el mismo blob.",
      "Los renames no necesitan un tipo de objeto especial: Git puede inferir similitud al comparar snapshots."
    ],
    "concept": "Blob ≠ archivo con nombre: el blob es contenido; el tree aporta nombre y estructura.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Entender que un blob representa contenido de archivo y que el nombre o ruta pertenece a los trees.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un blob almacena contenido; no contiene por sí mismo el pathname humano del archivo dentro del proyecto."
        },
        {
          "title": "Mecánica",
          "body": "Si dos rutas tienen exactamente el mismo contenido pueden referenciar el mismo blob."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Los renames no necesitan un tipo de objeto especial: Git puede inferir similitud al comparar snapshots."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Tres rutas contienen bytes idénticos y apuntan al mismo blob. ¿Cuántos blobs de contenido son necesarios idealmente?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "1"
    },
    "check": {
      "question": "¿El nombre `src/main.c` vive dentro del blob que contiene su texto?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Blob ≠ archivo con nombre: el blob es contenido; el tree aporta nombre y estructura."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Tres rutas contienen bytes idénticos y apuntan al mismo blob. ¿Cuántos blobs de contenido son necesarios idealmente?",
        "answer": "1",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El nombre `src/main.c` vive dentro del blob que contiene su texto?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Dos nombres distintos pueden apuntar al mismo blob?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-tree": {
    "id": "git-tree",
    "courseId": 68,
    "title": "Tree: nombres, modos y jerarquía",
    "shortTitle": "Tree",
    "duration": 120,
    "objective": "Comprender cómo los tree objects relacionan nombres y modos con blobs u otros trees para formar snapshots.",
    "summary": [
      "Un tree representa una jerarquía parecida a un directorio: entradas con modo, nombre y object ID.",
      "Las entradas pueden apuntar a blobs o a subtrees, permitiendo reconstruir el snapshot completo.",
      "Un commit referencia el tree raíz; cambiar una hoja puede producir nuevos trees a lo largo del camino afectado."
    ],
    "concept": "Tree ≠ working directory: es un objeto inmutable de la base de objetos que describe nombres y referencias.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Comprender cómo los tree objects relacionan nombres y modos con blobs u otros trees para formar snapshots.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un tree representa una jerarquía parecida a un directorio: entradas con modo, nombre y object ID."
        },
        {
          "title": "Mecánica",
          "body": "Las entradas pueden apuntar a blobs o a subtrees, permitiendo reconstruir el snapshot completo."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Un commit referencia el tree raíz; cambiar una hoja puede producir nuevos trees a lo largo del camino afectado."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Un tree raíz contiene 5 blobs directos y 3 subtrees. ¿Cuántas entradas directas tiene?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "8"
    },
    "check": {
      "question": "¿Un tree puede apuntar a otros tree objects?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Tree ≠ working directory: es un objeto inmutable de la base de objetos que describe nombres y referencias."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un tree raíz contiene 5 blobs directos y 3 subtrees. ¿Cuántas entradas directas tiene?",
        "answer": "8",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un tree puede apuntar a otros tree objects?",
        "answer": "si",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El commit referencia directamente cada blob del proyecto?",
        "answer": "no",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-references": {
    "id": "git-references",
    "courseId": 68,
    "title": "References: nombres mutables sobre objetos",
    "shortTitle": "References",
    "duration": 120,
    "objective": "Razonar sobre refs como nombres que apuntan a object IDs y desacoplar nombres humanos de objetos inmutables.",
    "summary": [
      "Una ref como `refs/heads/main` apunta normalmente a un commit y puede moverse a otro commit.",
      "Los objetos son content-addressed e inmutables; las refs son nombres mutables que hacen manejable el grafo.",
      "Las refs pueden almacenarse como archivos sueltos o dentro de `packed-refs`; no dependas de una única representación física."
    ],
    "concept": "Ref ≠ commit: una ref es un nombre mutable que resuelve a un object ID.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Razonar sobre refs como nombres que apuntan a object IDs y desacoplar nombres humanos de objetos inmutables.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una ref como `refs/heads/main` apunta normalmente a un commit y puede moverse a otro commit."
        },
        {
          "title": "Mecánica",
          "body": "Los objetos son content-addressed e inmutables; las refs son nombres mutables que hacen manejable el grafo."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Las refs pueden almacenarse como archivos sueltos o dentro de `packed-refs`; no dependas de una única representación física."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Una rama avanza de C10 a C13 tras 3 commits lineales. ¿Cuántos commits avanzó su tip?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "3"
    },
    "check": {
      "question": "¿Mover una branch ref reescribe automáticamente los objetos commit antiguos?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Ref ≠ commit: una ref es un nombre mutable que resuelve a un object ID."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una rama avanza de C10 a C13 tras 3 commits lineales. ¿Cuántos commits avanzó su tip?",
        "answer": "3",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Mover una branch ref reescribe automáticamente los objetos commit antiguos?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Una ref puede moverse mientras el commit antiguo continúa existiendo en la object database?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-head": {
    "id": "git-head",
    "courseId": 68,
    "title": "HEAD: referencia actual y detached HEAD",
    "shortTitle": "HEAD",
    "duration": 120,
    "objective": "Entender HEAD como indicador de la revisión o ref actual y distinguir HEAD simbólico de detached HEAD.",
    "summary": [
      "HEAD suele ser una symbolic ref que apunta a la branch actualmente checkout, la cual a su vez apunta a un commit.",
      "En detached HEAD, HEAD referencia directamente una revisión o commit en vez de una branch local normal.",
      "Crear commits en detached HEAD es válido, pero deben conservarse mediante una ref si quieres que sean fácilmente alcanzables a largo plazo."
    ],
    "concept": "HEAD ≠ branch: normalmente HEAD apunta a una branch; en detached HEAD puede apuntar directamente a un commit.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Entender HEAD como indicador de la revisión o ref actual y distinguir HEAD simbólico de detached HEAD.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "HEAD suele ser una symbolic ref que apunta a la branch actualmente checkout, la cual a su vez apunta a un commit."
        },
        {
          "title": "Mecánica",
          "body": "En detached HEAD, HEAD referencia directamente una revisión o commit en vez de una branch local normal."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Crear commits en detached HEAD es válido, pero deben conservarse mediante una ref si quieres que sean fácilmente alcanzables a largo plazo."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "HEAD→main→C8 y haces 2 commits lineales. ¿A qué número de commit conceptual apunta main después?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "10"
    },
    "check": {
      "question": "¿Detached HEAD impide crear commits?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "HEAD ≠ branch: normalmente HEAD apunta a una branch; en detached HEAD puede apuntar directamente a un commit."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "HEAD→main→C8 y haces 2 commits lineales. ¿A qué número de commit conceptual apunta main después?",
        "answer": "10",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Detached HEAD impide crear commits?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿HEAD puede ser una referencia simbólica?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-branches": {
    "id": "git-branches",
    "courseId": 68,
    "title": "Branches: punteros baratos en un DAG",
    "shortTitle": "Branches",
    "duration": 120,
    "objective": "Entender las branches como referencias a commits y el historial como alcanzabilidad en un DAG.",
    "summary": [
      "Crear una branch local normalmente crea una referencia nueva al commit elegido; no copia todo el proyecto.",
      "Dos branches pueden apuntar al mismo commit y divergir posteriormente al crear nuevos commits.",
      "`ahead/behind` depende de la relación de alcanzabilidad entre tips y de su ancestro común, no del nombre de las ramas."
    ],
    "concept": "Branch ≠ copia del directorio: es esencialmente una referencia móvil a un commit.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Entender las branches como referencias a commits y el historial como alcanzabilidad en un DAG.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Crear una branch local normalmente crea una referencia nueva al commit elegido; no copia todo el proyecto."
        },
        {
          "title": "Mecánica",
          "body": "Dos branches pueden apuntar al mismo commit y divergir posteriormente al crear nuevos commits."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "`ahead/behind` depende de la relación de alcanzabilidad entre tips y de su ancestro común, no del nombre de las ramas."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "main y feature parten de C4. feature añade 5 commits y main 2, sin merges. ¿Cuántos commits exclusivos tiene feature respecto al ancestro?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "5"
    },
    "check": {
      "question": "¿Crear una branch duplica todos los blobs y trees alcanzables?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Branch ≠ copia del directorio: es esencialmente una referencia móvil a un commit."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "main y feature parten de C4. feature añade 5 commits y main 2, sin merges. ¿Cuántos commits exclusivos tiene feature respecto al ancestro?",
        "answer": "5",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Crear una branch duplica todos los blobs y trees alcanzables?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Dos branches pueden apuntar temporalmente al mismo commit?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-merge": {
    "id": "git-merge",
    "courseId": 68,
    "title": "Merge: combinar historias y resolver contenido",
    "shortTitle": "Merge",
    "duration": 120,
    "objective": "Distinguir fast-forward, merge commit y conflicto, entendiendo que un conflicto es falta de resolución automática, no corrupción.",
    "summary": [
      "Un fast-forward mueve una ref cuando el tip actual es ancestro del tip objetivo; no necesita un nuevo merge commit.",
      "Un merge verdadero puede crear un commit con múltiples padres y combinar cambios respecto a un merge base.",
      "Un conflicto significa que Git no pudo escoger automáticamente una resolución segura para ciertas entradas; el usuario debe decidir y registrar el resultado."
    ],
    "concept": "Merge ≠ copiar una branch sobre otra: combina historias respecto a ancestros y puede ser fast-forward o producir un commit multipadre.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Distinguir fast-forward, merge commit y conflicto, entendiendo que un conflicto es falta de resolución automática, no corrupción.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un fast-forward mueve una ref cuando el tip actual es ancestro del tip objetivo; no necesita un nuevo merge commit."
        },
        {
          "title": "Mecánica",
          "body": "Un merge verdadero puede crear un commit con múltiples padres y combinar cambios respecto a un merge base."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Un conflicto significa que Git no pudo escoger automáticamente una resolución segura para ciertas entradas; el usuario debe decidir y registrar el resultado."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Un merge commit tiene 2 padres y 1 tree raíz. ¿Cuántos parents declara?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "2"
    },
    "check": {
      "question": "¿Todo `git merge` crea necesariamente un merge commit?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Merge ≠ copiar una branch sobre otra: combina historias respecto a ancestros y puede ser fast-forward o producir un commit multipadre."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un merge commit tiene 2 padres y 1 tree raíz. ¿Cuántos parents declara?",
        "answer": "2",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Todo `git merge` crea necesariamente un merge commit?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un conflicto implica que el repositorio está corrupto?",
        "answer": "no",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-rebase": {
    "id": "git-rebase",
    "courseId": 68,
    "title": "Rebase: replay y cambio de identidad histórica",
    "shortTitle": "Rebase",
    "duration": 120,
    "objective": "Comprender rebase como replay de commits sobre otra base y reconocer que normalmente crea nuevos commit IDs.",
    "summary": [
      "Rebase selecciona una serie de commits y reproduce sus cambios sobre otra base, cambiando su posición en el grafo.",
      "Al cambiar padres y normalmente metadatos, los commits recreados reciben IDs diferentes aunque el efecto de contenido pueda ser equivalente.",
      "Reescribir historia ya publicada exige coordinación: otras copias pueden conservar la historia antigua y divergir."
    ],
    "concept": "Rebase ≠ mover commits inmutables: recrea o reproduce cambios sobre otra base y por ello reescribe esa parte de la historia.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Comprender rebase como replay de commits sobre otra base y reconocer que normalmente crea nuevos commit IDs.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Rebase selecciona una serie de commits y reproduce sus cambios sobre otra base, cambiando su posición en el grafo."
        },
        {
          "title": "Mecánica",
          "body": "Al cambiar padres y normalmente metadatos, los commits recreados reciben IDs diferentes aunque el efecto de contenido pueda ser equivalente."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Reescribir historia ya publicada exige coordinación: otras copias pueden conservar la historia antigua y divergir."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Una rama tiene 4 commits propios que se rebasean y los cuatro se recrean. ¿Cuántos commits nuevos principales se generan conceptualmente?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "4"
    },
    "check": {
      "question": "¿Rebase preserva necesariamente los object IDs de los commits reproducidos?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Rebase ≠ mover commits inmutables: recrea o reproduce cambios sobre otra base y por ello reescribe esa parte de la historia."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Una rama tiene 4 commits propios que se rebasean y los cuatro se recrean. ¿Cuántos commits nuevos principales se generan conceptualmente?",
        "answer": "4",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Rebase preserva necesariamente los object IDs de los commits reproducidos?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Rebase puede cambiar la identidad de commits aunque el resultado final de archivos sea equivalente?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-cherry-pick": {
    "id": "git-cherry-pick",
    "courseId": 68,
    "title": "Cherry-pick: reproducir cambios seleccionados",
    "shortTitle": "Cherry-pick",
    "duration": 120,
    "objective": "Aplicar el efecto de commits seleccionados sobre otro HEAD sin confundir identidad del commit con su cambio.",
    "summary": [
      "`git cherry-pick` aplica el cambio introducido por uno o más commits sobre el estado actual y normalmente crea commits nuevos.",
      "El commit resultante tiene otros padres o contexto y por tanto normalmente otro object ID.",
      "Cherry-pick puede producir conflictos porque un cambio que funcionó en un contexto no tiene por qué aplicar limpiamente en otro."
    ],
    "concept": "Cherry-pick ≠ transportar el mismo commit object: normalmente reproduce su cambio y crea un commit nuevo.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Aplicar el efecto de commits seleccionados sobre otro HEAD sin confundir identidad del commit con su cambio.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "`git cherry-pick` aplica el cambio introducido por uno o más commits sobre el estado actual y normalmente crea commits nuevos."
        },
        {
          "title": "Mecánica",
          "body": "El commit resultante tiene otros padres o contexto y por tanto normalmente otro object ID."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Cherry-pick puede producir conflictos porque un cambio que funcionó en un contexto no tiene por qué aplicar limpiamente en otro."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Seleccionas 3 commits independientes para cherry-pick y todos aplican creando commit. ¿Cuántos nuevos commits aparecen?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "3"
    },
    "check": {
      "question": "¿Un cherry-pick conserva necesariamente el mismo commit ID original?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Cherry-pick ≠ transportar el mismo commit object: normalmente reproduce su cambio y crea un commit nuevo."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Seleccionas 3 commits independientes para cherry-pick y todos aplican creando commit. ¿Cuántos nuevos commits aparecen?",
        "answer": "3",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un cherry-pick conserva necesariamente el mismo commit ID original?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Cherry-pick puede entrar en conflicto aunque el commit original fuese válido?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-tags": {
    "id": "git-tags",
    "courseId": 68,
    "title": "Tags: versiones y objetos tag anotados",
    "shortTitle": "Tags",
    "duration": 120,
    "objective": "Distinguir lightweight y annotated tags y entender por qué una tag no debe confundirse con una branch móvil.",
    "summary": [
      "Una lightweight tag es esencialmente una ref directa a un objeto; una annotated tag crea además un tag object con metadatos.",
      "Las tags se usan habitualmente para nombrar puntos relevantes como releases y normalmente se tratan como referencias estables.",
      "Publicar una branch no implica necesariamente publicar todas las tags; el intercambio depende del comando y refspec usado."
    ],
    "concept": "Tag ≠ branch: ambas nombran objetos, pero sus convenciones y semántica de movimiento son diferentes.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Distinguir lightweight y annotated tags y entender por qué una tag no debe confundirse con una branch móvil.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Una lightweight tag es esencialmente una ref directa a un objeto; una annotated tag crea además un tag object con metadatos."
        },
        {
          "title": "Mecánica",
          "body": "Las tags se usan habitualmente para nombrar puntos relevantes como releases y normalmente se tratan como referencias estables."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Publicar una branch no implica necesariamente publicar todas las tags; el intercambio depende del comando y refspec usado."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Un proyecto etiqueta 12 releases y 3 prereleases adicionales. Total de tags creadas.",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "15"
    },
    "check": {
      "question": "¿Una annotated tag puede contener metadatos propios además de apuntar a otro objeto?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Tag ≠ branch: ambas nombran objetos, pero sus convenciones y semántica de movimiento son diferentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un proyecto etiqueta 12 releases y 3 prereleases adicionales. Total de tags creadas.",
        "answer": "15",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Una annotated tag puede contener metadatos propios además de apuntar a otro objeto?",
        "answer": "si",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Hacer push de una branch implica universalmente enviar todas las tags locales?",
        "answer": "no",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-remotes": {
    "id": "git-remotes",
    "courseId": 68,
    "title": "Remotes y remote-tracking refs",
    "shortTitle": "Remotes",
    "duration": 120,
    "objective": "Entender remotes como configuraciones de repositorios externos y distinguirlos de las remote-tracking refs locales.",
    "summary": [
      "Un remote como `origin` es un nombre configurado con URLs y refspecs para fetch y push; no es una branch.",
      "`origin/main` es una remote-tracking ref local que representa el último estado observado de cierta ref remota tras comunicación.",
      "`fetch` trae objetos y actualiza refs configuradas; `pull` combina fetch con una integración posterior y no es un protocolo distinto."
    ],
    "concept": "Remote ≠ remote branch ≠ remote-tracking ref: son configuración externa, referencia en otro repo y referencia local observada respectivamente.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Entender remotes como configuraciones de repositorios externos y distinguirlos de las remote-tracking refs locales.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Un remote como `origin` es un nombre configurado con URLs y refspecs para fetch y push; no es una branch."
        },
        {
          "title": "Mecánica",
          "body": "`origin/main` es una remote-tracking ref local que representa el último estado observado de cierta ref remota tras comunicación."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "`fetch` trae objetos y actualiza refs configuradas; `pull` combina fetch con una integración posterior y no es un protocolo distinto."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Tras fetch recibes 18 commits nuevos y actualizas 2 remote-tracking refs. ¿Cuántas refs locales de tracking se actualizaron?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "2"
    },
    "check": {
      "question": "¿`origin/main` consulta el servidor en tiempo real cada vez que haces `git log`?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Remote ≠ remote branch ≠ remote-tracking ref: son configuración externa, referencia en otro repo y referencia local observada respectivamente."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Tras fetch recibes 18 commits nuevos y actualizas 2 remote-tracking refs. ¿Cuántas refs locales de tracking se actualizaron?",
        "answer": "2",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿`origin/main` consulta el servidor en tiempo real cada vez que haces `git log`?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿`git fetch` puede descargar objetos sin modificar tu working tree?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-packfiles": {
    "id": "git-packfiles",
    "courseId": 68,
    "title": "Packfiles: compresión y deltas de objetos",
    "shortTitle": "Packfiles",
    "duration": 120,
    "objective": "Comprender cómo Git compacta objetos en packs y por qué la representación física puede cambiar sin cambiar object IDs lógicos.",
    "summary": [
      "Git puede almacenar objetos sueltos o consolidarlos en packfiles acompañados por índices para localización eficiente.",
      "Los packs pueden representar objetos mediante deltas contra otros objetos y comprimir datos, reduciendo espacio y tráfico.",
      "Reempaquetar cambia la representación física de almacenamiento, no la identidad lógica del contenido ni su object ID."
    ],
    "concept": "Packfile ≠ nuevo tipo semántico de objeto: es una representación compacta de objetos Git existentes.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Comprender cómo Git compacta objetos en packs y por qué la representación física puede cambiar sin cambiar object IDs lógicos.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Git puede almacenar objetos sueltos o consolidarlos en packfiles acompañados por índices para localización eficiente."
        },
        {
          "title": "Mecánica",
          "body": "Los packs pueden representar objetos mediante deltas contra otros objetos y comprimir datos, reduciendo espacio y tráfico."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Reempaquetar cambia la representación física de almacenamiento, no la identidad lógica del contenido ni su object ID."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Objetos loose suman 24 MiB y el pack resultante 9 MiB. Ahorro aproximado en MiB.",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "15"
    },
    "check": {
      "question": "¿Convertir objetos loose en un pack cambia necesariamente sus object IDs?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Packfile ≠ nuevo tipo semántico de objeto: es una representación compacta de objetos Git existentes."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Objetos loose suman 24 MiB y el pack resultante 9 MiB. Ahorro aproximado en MiB.",
        "answer": "15",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Convertir objetos loose en un pack cambia necesariamente sus object IDs?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Un pack index sirve para localizar objetos dentro del pack?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-object-database": {
    "id": "git-object-database",
    "courseId": 68,
    "title": "Object database: content-addressed DAG",
    "shortTitle": "Object database",
    "duration": 120,
    "objective": "Reconstruir el modelo interno de Git a partir de blobs, trees, commits y tags conectados por object IDs.",
    "summary": [
      "La object database almacena objetos direccionados por contenido; commits y trees crean un grafo de referencias hacia otros objetos.",
      "`git cat-file`, `hash-object`, `write-tree` y otros comandos plumbing permiten inspeccionar el modelo sin depender de la porcelana habitual.",
      "Reachability desde refs determina qué historia está normalmente protegida; objetos no alcanzables pueden existir temporalmente antes de garbage collection."
    ],
    "concept": "Object database ≠ historial lineal: contiene objetos inmutables conectados; las refs determinan puntos de entrada y alcanzabilidad.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Reconstruir el modelo interno de Git a partir de blobs, trees, commits y tags conectados por object IDs.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "La object database almacena objetos direccionados por contenido; commits y trees crean un grafo de referencias hacia otros objetos."
        },
        {
          "title": "Mecánica",
          "body": "`git cat-file`, `hash-object`, `write-tree` y otros comandos plumbing permiten inspeccionar el modelo sin depender de la porcelana habitual."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Reachability desde refs determina qué historia está normalmente protegida; objetos no alcanzables pueden existir temporalmente antes de garbage collection."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Un commit referencia 1 tree y 1 parent; ese tree referencia 4 blobs. Contando esos objetos únicos más el commit, total mínimo del ejemplo.",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "7"
    },
    "check": {
      "question": "¿Un objeto deja de existir inmediatamente cuando ninguna branch lo referencia?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Object database ≠ historial lineal: contiene objetos inmutables conectados; las refs determinan puntos de entrada y alcanzabilidad."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un commit referencia 1 tree y 1 parent; ese tree referencia 4 blobs. Contando esos objetos únicos más el commit, total mínimo del ejemplo.",
        "answer": "7",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿Un objeto deja de existir inmediatamente cuando ninguna branch lo referencia?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿La alcanzabilidad desde refs influye en qué objetos permanecen protegidos frente a GC?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-hashing": {
    "id": "git-hashing",
    "courseId": 68,
    "title": "Hashing y object IDs: identidad, integridad y SHA-256",
    "shortTitle": "Hashing",
    "duration": 120,
    "objective": "Entender qué identifica el hash de Git, qué propiedades aporta y por qué no equivale por sí solo a autenticidad.",
    "summary": [
      "El object ID se deriva del tipo, tamaño y contenido serializado del objeto según el formato del repositorio.",
      "Repositorios tradicionales usan SHA-1; Git también define repositorios con object format SHA-256 y mecanismos de transición.",
      "Content addressing ayuda a detectar cambios y nombrar objetos, pero un hash sin una raíz de confianza no autentica por sí mismo al autor."
    ],
    "concept": "Hash/object ID ≠ firma digital: identifica contenido bajo el esquema del repositorio, no prueba por sí solo quién lo creó.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Entender qué identifica el hash de Git, qué propiedades aporta y por qué no equivale por sí solo a autenticidad.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "El object ID se deriva del tipo, tamaño y contenido serializado del objeto según el formato del repositorio."
        },
        {
          "title": "Mecánica",
          "body": "Repositorios tradicionales usan SHA-1; Git también define repositorios con object format SHA-256 y mecanismos de transición."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "Content addressing ayuda a detectar cambios y nombrar objetos, pero un hash sin una raíz de confianza no autentica por sí mismo al autor."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Un SHA-256 tiene 256 bits. ¿Cuántos bytes son?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "32"
    },
    "check": {
      "question": "¿El object ID de Git es por sí solo una firma del autor del commit?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Hash/object ID ≠ firma digital: identifica contenido bajo el esquema del repositorio, no prueba por sí solo quién lo creó."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Un SHA-256 tiene 256 bits. ¿Cuántos bytes son?",
        "answer": "32",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿El object ID de Git es por sí solo una firma del autor del commit?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿Git define actualmente repositorios cuyo object format usa SHA-256?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  },
  "git-internals": {
    "id": "git-internals",
    "courseId": 68,
    "title": "Internals de Git: plumbing, reflog y bisect",
    "shortTitle": "Internals",
    "duration": 150,
    "objective": "Relacionar comandos de alto nivel con objetos y refs, y usar reflog, fsck y bisect para investigar y recuperar estados.",
    "summary": [
      "Los comandos porcelain coordinan operaciones de alto nivel; plumbing expone directamente objetos, refs, index y grafo.",
      "El reflog registra movimientos locales de refs o HEAD durante un periodo y puede ayudar a recuperar commits que dejaron de ser alcanzables por ramas normales.",
      "`git bisect` usa búsqueda binaria sobre una historia adecuada para localizar el commit que cambió una propiedad reproducible."
    ],
    "concept": "Git internals ≠ memorizar `.git/`: el objetivo es predecir efectos y recuperar estados entendiendo objetos, refs, index y reachability.",
    "rules": [
      "Antes de ejecutar un comando destructivo, identifica qué puede cambiar: working tree, index, refs u object database.",
      "Razona mediante object IDs, parents, reachability y snapshots; evita explicar Git como una secuencia de carpetas copiadas.",
      "Distingue identidad histórica de equivalencia de contenido: replay, rebase y cherry-pick pueden conservar cambios pero crear commits nuevos."
    ],
    "deep": {
      "intro": "Relacionar comandos de alto nivel con objetos y refs, y usar reflog, fsck y bisect para investigar y recuperar estados.",
      "sections": [
        {
          "title": "Modelo mental",
          "body": "Los comandos porcelain coordinan operaciones de alto nivel; plumbing expone directamente objetos, refs, index y grafo."
        },
        {
          "title": "Mecánica",
          "body": "El reflog registra movimientos locales de refs o HEAD durante un periodo y puede ayudar a recuperar commits que dejaron de ser alcanzables por ramas normales."
        },
        {
          "title": "Límites y errores frecuentes",
          "body": "`git bisect` usa búsqueda binaria sobre una historia adecuada para localizar el commit que cambió una propiedad reproducible."
        },
        {
          "title": "Validación",
          "body": "Predice primero qué objetos, referencias, index y working tree deberían cambiar; ejecuta luego el comando en un repositorio desechable e inspecciona `git status`, `git log --graph --decorate`, `git cat-file` o refs para contrastar la predicción."
        }
      ]
    },
    "example": {
      "problem": "Entre un commit bueno y uno malo hay 1024 candidatos idealmente divisibles por bisect. Aproximadamente ¿cuántas decisiones binarias bastan?",
      "steps": [
        "Identifica las entidades Git o cantidades implicadas.",
        "Calcula o deduce el resultado y explica qué capa del modelo cambia."
      ],
      "solution": "10"
    },
    "check": {
      "question": "¿`git bisect` busca necesariamente solo bugs de correctness?",
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
          "Depende siempre del hosting",
          false
        ]
      ],
      "feedback": "Git internals ≠ memorizar `.git/`: el objetivo es predecir efectos y recuperar estados entendiendo objetos, refs, index y reachability."
    },
    "practice": [
      {
        "level": 1,
        "label": "Básico",
        "prompt": "Entre un commit bueno y uno malo hay 1024 candidatos idealmente divisibles por bisect. Aproximadamente ¿cuántas decisiones binarias bastan?",
        "answer": "10",
        "hint": "Usa el modelo de objetos, refs y estados junto con las cantidades dadas."
      },
      {
        "level": 2,
        "label": "Normal",
        "prompt": "¿`git bisect` busca necesariamente solo bugs de correctness?",
        "answer": "no",
        "hint": "Separa el comando visible de la estructura interna que modifica."
      },
      {
        "level": 3,
        "label": "Difícil",
        "prompt": "¿El reflog local puede ayudar a recuperar un commit después de mover una branch?",
        "answer": "si",
        "hint": "Razona con snapshots, objetos inmutables, refs mutables y alcanzabilidad."
      }
    ]
  }
});
