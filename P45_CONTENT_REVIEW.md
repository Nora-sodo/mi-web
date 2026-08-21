# P45 — Precisión técnica y dificultad de razonamiento

Esta versión continúa la revisión de contenido de P44 y se centra en los tres primeros puntos de la lista de trabajo: precisión conceptual, eliminación de formulaciones demasiado genéricas y dificultad real de las prácticas.

## Lecciones reforzadas

Se han reescrito y ampliado 15 lecciones avanzadas:

- Stack canaries.
- ASLR y PIE.
- UAF/double free y lifetime de heap.
- Mutexes, semáforos y condition variables.
- RTOS, prioridades e inversión de prioridad.
- Soft CPUs en FPGA.
- Clipping, NDC y viewport.
- Máquinas de Turing.
- JWT.
- IDOR/BOLA y autorización por objeto.
- Doppler en audio de videojuegos.
- Distribución gaussiana multivariante.
- Sistema de meshes de un motor.
- Gestión y streaming de escenas.
- Señales analógicas reales.

## Correcciones conceptuales destacadas

- Un stack canary se presenta como detección parcial de corrupción, no como garantía de integridad del frame.
- ASLR se explica en términos de entropía efectiva, alineamientos, regiones y fugas; no como una simple bandera activada/desactivada.
- UAF se razona desde lifetime e identidad lógica del objeto, evitando depender de layouts concretos de allocators.
- Condition variables usan un predicado bajo mutex y un bucle de reevaluación; se distinguen de semáforos y mutexes.
- Un RTOS no convierte automáticamente un firmware en sistema de tiempo real: se introducen deadlines, WCET, bloqueo e inversión de prioridad.
- Soft CPU separa ISA y microarquitectura e incorpora timing post-place-and-route, CPI, BRAM y stalls.
- Clipping se explica en coordenadas homogéneas y antes del perspective divide, incluyendo diferencias de convención entre APIs.
- Se diferencia recognizer de decider y se contextualiza la tesis Church–Turing.
- JWT separa firma, confidencialidad, claims contextuales y autorización.
- IDOR/BOLA separa opacidad del identificador de autorización real por objeto.
- Doppler explicita proyección radial, límites de la aproximación y problemas de teleports/escala del mundo.
- Gaussianas distingue densidad de probabilidad puntual, covarianza, independencia y casos singulares.

## Prácticas

Se han sustituido 28 prácticas en siete lecciones que aún dependían demasiado de cálculos directos. Ahora evalúan diagnóstico, elección de primitiva, validez de supuestos, límites de una mitigación o interpretación de garantías.

## Integridad

- 78 rutas.
- 1.112 lecciones.
- 1.112 referencias curriculares únicas.
- 0 lecciones huérfanas.
- 0 referencias curriculares rotas.
- 0 grupos de prácticas exactamente duplicadas.
- IDs existentes preservados.
- Todos los JavaScript pasan comprobación de sintaxis.
- 0 referencias locales rotas en los HTML principales.
- Los dos ZIP de NEXUS pasan comprobación de integridad.
