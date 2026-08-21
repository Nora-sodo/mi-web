# P44 — Revisión pedagógica de contenido

Esta versión continúa la revisión editorial de P43 sin cambiar rutas, IDs ni compatibilidad del progreso.

## Qué se ha mejorado

- 15 núcleos conceptuales que seguían demasiado comprimidos se han reescrito con mecanismo, límites y consecuencias técnicas más claras.
- 17 ejemplos resueltos se han convertido en mini-casos explicados paso a paso en lugar de operaciones telegráficas.
- 88 prácticas se han sustituido por preguntas de diagnóstico, decisión de diseño, interpretación de garantías o razonamiento sobre casos límite.
- Se ha reducido la dependencia de ejercicios cuya dificultad consistía únicamente en una multiplicación, resta o `log2`.
- Se han eliminado los enunciados de práctica exactamente duplicados: de 36 grupos repetidos a 0.
- Se han reforzado especialmente matemáticas discretas, cálculo, C, señales, gráficos, microcontroladores, FPGA, redes, seguridad, algoritmos, concurrencia, IA/NN, sizecoding, demoscene y raymarching.

## Ejemplos de cambios

- FFT: de calcular `log2(1024)` a razonar sobre resolución espectral y coste O(N²) frente a O(N log N).
- C: aliasing y punteros ahora se explican desde el modelo abstracto del lenguaje y el papel de `one-past-the-end`.
- Gráficos: viewport y cámara se presentan como problemas de transformación y aspect ratio, no como datos aislados.
- Cortex-M: SysTick incluye reload, clock tree y condiciones que deben verificarse en hardware real.
- Algoritmos: binary search, sorting y trees evalúan overflow, adaptatividad y degeneración estructural.
- Seguridad: AEAD y ASLR distinguen autenticación/mitigación de corrección de la vulnerabilidad.
- Concurrencia: atomicidad se separa explícitamente de escalabilidad y contención de caché.

## Integridad curricular

- 78 rutas.
- 1.112 lecciones.
- 1.112 referencias curriculares únicas.
- 0 lecciones huérfanas.
- 0 referencias curriculares rotas.
- IDs existentes preservados.
- Sintaxis JavaScript validada.
- Referencias locales del HTML validadas.
