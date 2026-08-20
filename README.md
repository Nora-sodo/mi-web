# USIC — Universidad de Sistemas e Ingeniería Computacional

Aplicación educativa estática, modular y sin proceso de compilación. Puede abrirse directamente en navegador o servirse con un servidor local sencillo.

## Estructura

```text
universidad_web/
├── index.html                 # Shell de la interfaz y orden de carga
├── style.css                  # Diseño visual y responsive
├── data.js                    # Catálogo curricular de 78 bloques
├── state.js                   # Persistencia y progreso
├── app.js                     # Navegación, renderizado, tutor y eventos
├── content/
│   ├── block-001.js           # Fundamentos de información
│   ├── block-002.js           # Representación y sistemas numéricos
│   ├── block-003.js           # Electricidad fundamental
│   ├── block-004.js           # Lógica digital
│   ├── block-005.js           # Arquitectura de computadores
│   ├── block-006.js           # Assembly
│   ├── block-007.js           # Microarquitectura avanzada
│   ├── block-008.js           # Jerarquía de memoria
│   ├── block-009.js           # C profundo / programación de sistemas
│   ├── block-010.js           # Compiladores y lenguajes
│   ├── block-011.js           # Debugging y análisis de programas
│   ├── block-012.js           # Sistemas operativos
│   ├── block-013.js           # Sistemas de archivos
│   ├── block-014.js           # Drivers y hardware
│   ├── block-015.js           # Linux interno
│   ├── block-016.js           # Redes físicas
│   ├── block-017.js           # Ethernet y redes locales
│   ├── block-018.js           # Internet Protocol
│   ├── block-019.js           # Routing e Internet global
│   ├── block-020.js           # TCP, UDP y QUIC
│   ├── block-021.js           # Protocolos de aplicación
│   ├── block-022.js           # Criptografía
│   ├── block-023.js           # Ciberseguridad de sistemas
│   ├── block-024.js           # Seguridad web
│   ├── block-025.js           # Explotación binaria (análisis defensivo)
│   ├── block-026.js           # Ingeniería inversa
│   ├── block-027.js           # Malware y forense (análisis defensivo)
│   ├── block-028.js           # Matemáticas discretas
│   ├── block-029.js           # Álgebra lineal
│   ├── block-030.js           # Cálculo
│   ├── block-031.js           # Probabilidad y estadística
│   ├── block-032.js           # Optimización
│   ├── block-033.js           # Señales y FFT
│   ├── block-034.js           # Gráficos por ordenador
│   ├── block-035.js           # GPU / arquitectura gráfica
│   ├── block-036.js           # Shaders y APIs gráficas
│   ├── block-037.js           # Iluminación y render
│   ├── block-038.js           # Motor gráfico
│   ├── block-039.js           # Arquitectura de videojuegos
│   ├── block-040.js           # Física de videojuegos
│   ├── block-041.js           # Animación digital
│   ├── block-042.js           # IA para videojuegos
│   ├── block-043.js           # Audio para videojuegos
│   ├── block-044.js           # Networking de videojuegos
│   ├── block-045.js           # Godot profundo
│   ├── block-046.js           # Pixel art y arte técnico
│   ├── block-047.js           # Demoscene: historia y cultura
│   ├── block-048.js           # Efectos clásicos de demoscene
│   ├── block-049.js           # Sizecoding
│   ├── block-050.js           # Raymarching y Shader Art
│   ├── block-051.js           # Música Procedural
│   ├── block-052.js           # Electrónica Analógica
│   ├── block-053.js           # Microcontroladores
│   ├── block-054.js           # Sistemas Embebidos
│   ├── block-055.js           # FPGA
│   ├── block-056.js           # PCB
│   ├── block-057.js           # Algoritmos y Estructuras de Datos
│   ├── block-058.js           # Teoría de la Computación
│   ├── block-059.js           # Concurrencia y Paralelismo
│   ├── block-060.js           # Inteligencia Artificial: Fundamentos
│   ├── block-061.js           # Redes Neuronales desde cero
│   ├── block-062.js           # Deep Learning
│   ├── block-063.js   # Transformers
│   ├── block-064.js   # Large Language Models
│   ├── block-065.js   # Reinforcement Learning
│   ├── block-066.js   # Modelos Generativos
│   ├── block-067.js   # Ingeniería del Software
│   ├── block-068.js   # Git
│   ├── block-069.js   # Testing
│   ├── block-070.js   # Sistemas Distribuidos
│   ├── block-071.js   # Bases de Datos
│   └── challenges.js          # Retos de nivel 4
├── tools/
│   └── validate-content.mjs   # Auditoría estructural automática
├── AUDIT.md                   # Historial de revisión acumulativa
└── SOURCES.md                 # Fuentes técnicas de verificación
```

## Principios de código

- Datos, contenido pedagógico, estado y UI viven en archivos separados.
- `app.js` contiene comportamiento de interfaz; los bloques no conocen el DOM.
- `GOAL_AREAS` añade una navegación transversal por 10 objetivos generales; no sustituye el orden técnico ni fuerza cada bloque a una única categoría.
- Los comentarios explican decisiones, supuestos y límites; no narran lo obvio línea por línea.
- Cada bloque mantiene la misma forma de datos para permitir validación automática y futura migración a JSON/API.
- El contenido distingue deliberadamente garantías del lenguaje/estándar, ABI, sistema operativo y decisiones de implementación.
- Antes de cada nueva parte se audita de nuevo todo el contenido ya desarrollado.

## Validación

Ejecutar desde la raíz del proyecto:

```bash
node tools/validate-content.mjs
for f in *.js content/*.js tools/*.mjs; do node --check "$f"; done
```

El validador descubre `content/block-XXX.js` automáticamente y comprueba catálogo, las 10 áreas generales, rutas, IDs, estructura pedagógica, preguntas, respuestas equivalentes, bloques duplicados dentro de áreas generales y presencia de niveles 1–4.

## Contenido desarrollado

- Bloque 001 — Fundamentos de información: 8 lecciones.
- Bloque 002 — Representación y sistemas numéricos: 10 lecciones.
- Bloque 003 — Electricidad fundamental: 10 lecciones.
- Bloque 004 — Lógica digital: 12 lecciones.
- Bloque 005 — Arquitectura de computadores: 11 lecciones.
- Bloque 006 — Assembly: 10 lecciones.
- Bloque 007 — Microarquitectura avanzada: 10 lecciones.
- Bloque 008 — Jerarquía de memoria: 11 lecciones.
- Bloque 009 — C profundo / programación de sistemas: 12 lecciones.
- Bloque 010 — Compiladores y lenguajes: 13 lecciones.
- Bloque 011 — Debugging y análisis de programas: 11 lecciones.
- Bloque 012 — Sistemas operativos: 12 lecciones.
- Bloque 013 — Sistemas de archivos: 12 lecciones.
- Bloque 014 — Drivers y hardware: 11 lecciones.
- Bloque 015 — Linux interno: 13 lecciones.
- Bloque 016 — Redes físicas: 12 lecciones.
- Bloque 017 — Ethernet y redes locales: 10 lecciones.
- Bloque 018 — Internet Protocol: 12 lecciones.
- Bloque 019 — Routing e Internet global: 12 lecciones.
- Bloque 020 — TCP, UDP y QUIC: 12 lecciones.
- Bloque 021 — Protocolos de aplicación: 13 lecciones.
- Bloque 022 — Criptografía: 14 lecciones.
- Bloque 023 — Ciberseguridad de sistemas: 12 lecciones.
- Bloque 024 — Seguridad web: 15 lecciones.
- Bloque 025 — Explotación binaria (análisis defensivo): 14 lecciones.
- Bloque 026 — Ingeniería inversa: 14 lecciones.
- Bloque 027 — Malware y forense (análisis defensivo): 14 lecciones.
- Bloque 028 — Matemáticas discretas: 13 lecciones.
- Bloque 029 — Álgebra lineal: 13 lecciones.
- Bloque 030 — Cálculo: 14 lecciones.
- Bloque 031 — Probabilidad y estadística: 14 lecciones.
- Bloque 032 — Optimización: 14 lecciones.
- Bloque 033 — Señales y FFT: 14 lecciones.
- Bloque 034 — Gráficos por ordenador: 14 lecciones.
- Bloque 035 — GPU / arquitectura gráfica: 14 lecciones.
- Bloque 036 — Shaders y APIs gráficas: 15 lecciones.
- Bloque 037 — Iluminación y render: 15 lecciones.
- Bloque 038 — Motor gráfico: 14 lecciones.
- Bloque 039 — Arquitectura de videojuegos: 14 lecciones.
- Bloque 040 — Física de videojuegos: 14 lecciones.
- Bloque 041 — Animación digital: 14 lecciones.
- Bloque 042 — IA para videojuegos: 14 lecciones.
- Bloque 043 — Audio para videojuegos: 14 lecciones.
- Bloque 044 — Networking de videojuegos: 15 lecciones.
- Bloque 045 — Godot profundo: 16 lecciones.
- Bloque 046 — Pixel art y arte técnico: 14 lecciones.
- Bloque 047 — Demoscene: historia y cultura: 15 lecciones.
- Bloque 048 — Efectos clásicos de demoscene: 16 lecciones.
- Bloque 049 — Sizecoding: 14 lecciones.
- Bloque 050 — Raymarching y Shader Art: 14 lecciones.
- Bloque 051 — Música Procedural: 14 lecciones.
- Bloque 052 — Electrónica Analógica: 14 lecciones.
- Bloque 053 — Microcontroladores: 16 lecciones.
- Bloque 054 — Sistemas Embebidos: 14 lecciones.
- Bloque 055 — FPGA: 16 lecciones.
- Bloque 056 — PCB: 16 lecciones.
- Bloque 057 — Algoritmos y Estructuras de Datos: 18 lecciones.
- Bloque 058 — Teoría de la Computación: 14 lecciones.
- Bloque 059 — Concurrencia y Paralelismo: 14 lecciones.
- Bloque 060 — Inteligencia Artificial: Fundamentos: 14 lecciones.
- Bloque 061 — Redes Neuronales desde cero: 14 lecciones.
- Bloque 062 — Deep Learning: 14 lecciones.
- Bloque 063 — Transformers: 14 lecciones.
- Bloque 064 — Large Language Models: 19 lecciones.
- Bloque 065 — Reinforcement Learning: 14 lecciones.
- Bloque 066 — Modelos Generativos: 14 lecciones.
- Bloque 067 — Ingeniería del Software: 14 lecciones.
- Bloque 068 — Git: 18 lecciones.
- Bloque 069 — Testing: 14 lecciones.
- Bloque 070 — Sistemas Distribuidos: 16 lecciones.
- Bloque 071 — Bases de Datos: 16 lecciones.

**Total actual: 965 lecciones avanzadas.**

Cada lección incluye objetivo, resumen, explicación rápida, explicación profunda, reglas, errores frecuentes, conexiones, ejemplo resuelto, comprobación rápida, feedback y práctica de niveles 1–4.


## Organización por objetivos generales

Además del índice técnico 001→078, la interfaz **Aprender** ofrece 10 rutas transversales centradas en los objetivos principales del estudiante:

1. Demoscene — con foco explícito en Future Crew y la ruta técnica hacia efectos, sizecoding, shader art y música procedural.
2. Ciberseguridad — con OverTheWire/Natas como contexto práctico actual, conectando web, Linux, redes, criptografía, reversing y forense.
3. Cómo funcionan realmente los ordenadores — de electricidad y lógica a CPU, compiladores, kernel, drivers y sistemas reales.
4. Desarrollo de videojuegos — gráficos, renderer, engine, física, animación, IA, audio y networking.
5. Godot — arquitectura de juego y subsistemas que desembocan en el Bloque 045, Godot profundo.
6. Pixel art y arte técnico — representación discreta, color, sampling, shaders, animación y arte procedural.
7. Electrónica — circuitos, analógica, microcontroladores, RTOS, FPGA y PCB.
8. Inteligencia artificial — matemáticas, optimización, redes neuronales, transformers, LLM, RL y modelos generativos.
9. Sistemas operativos — arquitectura, C, procesos, memoria, filesystems, drivers, Linux y virtualización.
10. Redes e Internet — medio físico, Ethernet/IP/BGP, transporte/aplicación, multiplayer, sistemas distribuidos y cloud.

Los bloques pueden aparecer en varias rutas deliberadamente. Por ejemplo, Señales y FFT es relevante para demoscene, audio, electrónica e IA; esta superposición representa prerrequisitos reales, no duplicación de contenido.

## Parte 10 — Bloque 009

Se incorpora C profundo: modelo de objetos y punteros, arrays y aritmética de punteros, structs/unions/alignment/padding, `const`/`volatile`/`restrict`, categorías de comportamiento, aliasing/effective type, storage duration/lifetime/scope, memoria dinámica, fragmentación y allocators, function pointers/callbacks, preprocesador/macros y un proyecto integrador de allocator educativo.

La regla editorial de este bloque es especialmente estricta: no convertir comportamientos habituales de x86/Linux/GCC en garantías universales de C.


### Parte 11

Bloque 010 desarrollado: 13 lecciones sobre toolchain, objetos, linking/loading, ELF/PE, frontend, AST/semántica, IR/SSA, optimización, codegen, VM, JIT y proyecto de lenguaje. Total acumulado: 107 lecciones.

### Parte 12

Bloque 011 desarrollado: 11 lecciones sobre GDB/LLDB, breakpoints, watchpoints, unwinding, core dumps, tracing, Valgrind, sanitizers, profiling/perf, DWARF y metodología sistemática. Total acumulado: 118 lecciones.


### Parte 13

Bloque 012 desarrollado: 12 lecciones sobre kernel y privilegios, boot, procesos, threads, scheduling, syscalls, IPC, sincronización, data races y fallos de progreso. Total acumulado: 130 lecciones.


## Parte 14 — Bloque 013

Añade Sistemas de archivos: namespace, inodes/dentries, file descriptors, bloques/extents, permisos/enlaces, mounts/VFS, journaling, ext4, FAT/NTFS, COW/ZFS/Btrfs, page cache/fsync y un filesystem educativo.


## Parte 15 — Bloque 014

Añade Drivers y hardware: modelo de driver, MMIO/port I/O, IRQ, DMA/IOMMU, PCI/PCIe, USB/HID y drivers de almacenamiento, red y gráficos. Total acumulado: 153 lecciones.


## Parte 16 — Bloque 015

Añade Linux interno: arquitectura del kernel/tareas, `/proc`, `/sys` y `/dev`, syscalls/señales, namespaces, cgroups v2, composición de containers, systemd, permisos/capabilities, LSM con SELinux/AppArmor, módulos, eBPF y proyectos integradores de shell/herramientas/kernel educativo. Total acumulado: 166 lecciones.


## Parte 17 — Bloque 016

Añade Redes físicas: señales y espectro, ancho de banda/latencia, ruido/SNR/capacidad, modulación, line coding, cobre y líneas de transmisión, fibra óptica, radio, Wi‑Fi PHY, Ethernet PHY, medición BER/jitter y una integración completa del bit a la señal y vuelta. Total acumulado: 178 lecciones.


## Parte 18 — Bloque 017

Añade Ethernet y redes locales: frames, MAC, dominios de broadcast/colisión, aprendizaje y forwarding de switches, VLAN/802.1Q, ARP, STP/RSTP, MTU y una integración completa de host-switch-router. Total acumulado: 188 lecciones.


## Parte 19 — Bloque 018

Añade Internet Protocol: IPv4, subnetting/CIDR, IPv6, routing tables, longest-prefix match, TTL/Hop Limit, ICMP, fragmentación/Path MTU, NAT/NAPT, DHCP, Neighbor Discovery, dual stack y una integración extremo a extremo. Total acumulado: 200 lecciones.


## Parte 20 — Bloque 019

Añade Routing e Internet global: sistemas autónomos, BGP y sus atributos/políticas, peering/transit, IXPs y route servers, escala y seguridad operacional con RPKI/ROV, convergencia/observabilidad, anycast, CDN, ECMP/L4/L7 load balancing, backbones/data centers y una integración completa de una petición global. Total acumulado: 212 lecciones.

## Parte 21 — Bloque 020

Añade transporte extremo a extremo: puertos/sockets, UDP, byte stream TCP, three-way handshake, sequence numbers/ACKs, RTT/retransmisión, sliding windows, flow control, congestion control, slow start, ciclo de cierre/TIME_WAIT, QUIC y una integración de diagnóstico. Total acumulado: 224 lecciones.


## Parte 22 — Bloque 021

Añade protocolos de aplicación: DNS jerárquico y wire format/transportes, semántica HTTP y URLs, HTTP/1.1, HTTP/2, HTTP/3, caché/validators, cookies/sesiones, proxies, SMTP/IMAP, FTP/SSH, WebSocket y un laboratorio integrador de servidor/cliente HTTP, DNS y parsing de paquetes. Total acumulado: 237 lecciones.


## Parte 23 — Bloque 022: Criptografía

- 14 lecciones avanzadas sobre threat models, entropía/CSPRNG, hashes, HMAC, AES/AEAD, RSA, DH/ECC, firmas, PKI, TLS 1.3, password hashing, HKDF y diseño integrado.
- Total acumulado: 22 bloques desarrollados y 251 lecciones validadas.


## Parte 24 — Bloque 023: Ciberseguridad de sistemas

Añade 12 lecciones sobre threat modeling y attack surface, privilege/least privilege, authentication vs authorization, modelos de access control, permisos Linux, SUID/credenciales, capabilities/no_new_privs, seccomp/Landlock, containers, fronteras de aislamiento, privilege separation y una integración de hardening verificable. Total acumulado: 23 bloques desarrollados y 263 lecciones validadas.


## Parte 25 — Bloque 024: Seguridad web

Añade 15 lecciones sobre Same-Origin Policy/CORS, autenticación y sesiones, SQL/command injection, XSS, CSRF, SSRF, manejo seguro de archivos, IDOR/BOLA, XXE/deserialización, race conditions, JWT, OAuth 2.0 y una metodología de laboratorio defensivo y autorizado. Total acumulado: 24 bloques desarrollados y 278 lecciones validadas.


## Parte 26 — Bloque 025: Explotación binaria (análisis defensivo)

Añade 14 lecciones sobre stack frames y corrupción, buffer overflow/stack smashing, return addresses y control-flow integrity, NX/W^X, ASLR/PIE, stack canaries, GOT/PLT/RELRO, code-reuse (ret2libc/ROP) de forma conceptual, format strings, UAF/double-free, integer overflow, type confusion, exploitability triage y un laboratorio de hardening reproducible. Total acumulado: 25 bloques desarrollados y 292 lecciones validadas.


## Parte 27 — Bloque 026: Ingeniería inversa

Añade 14 lecciones sobre assembly avanzado, disassembly/decompilation, Ghidra, modelos conceptuales de IDA/Binary Ninja, CFG, data-flow, calling conventions, patrones de compilador, stripped binaries, packers/obfuscation, anti-analysis, firmware reversing, validación dinámica y un proyecto documentado. Total acumulado: 26 bloques desarrollados y 306 lecciones validadas.


## Parte 28 — Bloque 027: Malware y forense

Añade 14 lecciones defensivas sobre arquitectura de malware, persistencia/evasión como categorías de detección, análisis estático/dinámico, memory/disk/network forensics, timelines, incident response, IOC/IOA, YARA, Volatility 3, evidencia/cadena de custodia y un proyecto integral autorizado. Total acumulado: 27 bloques desarrollados y 320 lecciones validadas.


## Parte 29 — Bloque 028: Matemáticas discretas

Añade 13 lecciones sobre lógica proposicional/de predicados, conjuntos, relaciones, funciones, principios de conteo, permutaciones, combinaciones, recurrencias, inducción, grafos, árboles, autómatas finitos y lenguajes formales. Total acumulado: 28 bloques desarrollados y 333 lecciones validadas.


## Parte 30 — Bloque 029: Álgebra lineal

Añade 13 lecciones sobre vectores/coordenadas, matrices, sistemas lineales, producto escalar/vectorial, espacios y bases, transformaciones/cambio de base, determinantes/inversa, eigenestructura, matrices simétricas, SVD/pseudoinversa, normas/proyecciones/mínimos cuadrados y aplicaciones a gráficos, física, IA y señales. Total acumulado: 29 bloques desarrollados y 346 lecciones validadas.


## Parte 31 — Bloque 030: Cálculo

Añade 14 lecciones sobre límites, continuidad, derivadas y reglas de diferenciación, integración y Teorema Fundamental, series y Taylor, cálculo multivariable, gradiente, Jacobiano, integrales múltiples/cambio de variables, Hessiano y ecuaciones diferenciales con estabilidad numérica. Total acumulado: 30 bloques desarrollados y 360 lecciones validadas.


## Parte 32 — Bloque 031: Probabilidad y estadística

Añade 14 lecciones sobre fundamentos de probabilidad, variables aleatorias, distribuciones, esperanza/varianza, covarianza e independencia, condicionamiento/Bayes, gaussianas, muestreo con LLN/CLT, estimación, intervalos, contrastes, correlación, regresión y una integración estadística reproducible. Total acumulado: 31 bloques desarrollados y 374 lecciones validadas.


## Parte 33 — Bloque 032: Optimización

Añade 14 lecciones sobre formulación de funciones de coste, convexidad, optimalidad de primer orden, gradiente descendente, SGD, momentum, Newton/quasi-Newton, restricciones, Lagrange/KKT, dualidad, optimización combinatoria, robustez numérica, regularización/multiobjetivo e integración reproducible. Total acumulado: 32 bloques desarrollados y 388 lecciones validadas.

## Parte 34 — Bloque 033: Señales y FFT

Añade 14 lecciones sobre señales continuas/discretas, frecuencia/fase, exponenciales complejas y sistemas LTI, Fourier, DFT, FFT, convolución, muestreo, aliasing/Nyquist-Shannon, espectros/ventanas, FIR/IIR, audio, imagen/telecomunicaciones y una integración con STFT, demoscene e IA. Total acumulado: 33 bloques desarrollados y 402 lecciones validadas.



## Parte 35 — Bloque 034: Gráficos por ordenador

Añade 14 lecciones sobre píxeles/framebuffers, resolución/viewport, color lineal y sRGB, espacios de coordenadas, model/view/projection, cámara/perspectiva, clipping/NDC, rasterización, interpolación perspective-correct, Z-buffer, texturas/UV, mipmaps, sampling/filtering e integración completa del pipeline. Total acumulado: 34 bloques desarrollados y 416 lecciones validadas.


## Parte 36 — Bloque 035: GPU / Arquitectura gráfica

Añade 14 lecciones sobre CPU vs GPU, SIMD/SIMT, warps/wavefronts/subgroups, bloques de cómputo y unidades especializadas, jerarquía de memoria, VRAM/arithmetic intensity, coalescing, occupancy/latency hiding, divergence, GPU caches, texture units, rasterizer/fixed-function, compute workgroups y diagnóstico integral de rendimiento. Total acumulado: 35 bloques desarrollados y 430 lecciones validadas.


## Parte 37 — Bloque 036: Shaders y APIs gráficas

Añade 15 lecciones sobre shader stages, GLSL, toolchain/compilación, SPIR-V, modelos OpenGL/Vulkan, pipeline state, buffers/memoria, images/views/samplers, uniforms/storage/push constants, descriptor sets, render passes/dynamic rendering, command buffers/queues, synchronization y un frame completo con presentación y depuración. Total acumulado: 36 bloques desarrollados y 445 lecciones validadas.


## Parte 38 — Bloque 037: Iluminación y render

Añade 15 lecciones sobre radiometría, BRDF/BSDF, Lambert, Phong/Blinn-Phong, PBR metallic-roughness, microfacetas/Fresnel, normal mapping, visibilidad/sombras, shadow maps, ambient occlusion, HDR/tone mapping, global illumination, ray tracing, path tracing y Monte Carlo/MIS. Total acumulado: 37 bloques desarrollados y 460 lecciones validadas.


## Parte 39 — Bloque 038: Motor gráfico

Añade 14 lecciones sobre scene graph, resource management, materiales, meshes, cámaras, lighting systems, visibility/culling, LOD, batching, instancing, render graph, post-processing, frame architecture y un proyecto de motor gráfico propio medible. Total acumulado: 38 bloques desarrollados y 474 lecciones validadas.


## Parte 40 — Bloque 039: Arquitectura de videojuegos

Añade 14 lecciones sobre fronteras de engine, game loop, fixed/variable timestep, ECS, component systems, scene management, resource systems, eventos, input, serialización, save games, determinismo/replays e integración del frame. Total acumulado: 39 bloques desarrollados y 488 lecciones validadas.

## Parte 41 — Bloque 040: Física de videojuegos

Añade 14 lecciones sobre cinemática/dinámica, integración Euler/semi-implícita/Verlet, rigid bodies, pipeline de colisiones, broad phase con AABB trees, narrow phase/CCD, respuesta por impulsos, constraints/sequential impulses, fricción, joints, corrección de penetración, substeps y una integración de engine físico medible. Total acumulado: 40 bloques desarrollados y 502 lecciones validadas.

## Parte 42 — Bloque 041: Animación digital

Añade 14 lecciones sobre keyframes/tracks, interpolación, skeletons/rest-bind pose, skinning, forward/inverse kinematics, blending, blend spaces, state machines, root motion, capas aditivas/masks, eventos/sync markers, retargeting/compresión e integración del pipeline de animación en el engine. Total acumulado: 41 bloques desarrollados y 516 lecciones validadas.



## Parte 43 — Bloque 042: IA para videojuegos

Añade 14 lecciones sobre arquitectura de agentes, FSM, behaviour trees, utility AI, steering, A*, pathfinding práctico, navigation meshes, path following/avoidance, percepción/memoria, táctica espacial, comportamiento procedural, debugging/presupuestos e integración de un NPC reproducible. Total acumulado: 42 bloques desarrollados y 530 lecciones validadas.


## Parte 44 — Reorganización por objetivos + Bloque 043: Audio para videojuegos

Añade una capa transversal con 10 áreas generales alineadas con los objetivos del estudiante, manteniendo el catálogo técnico de 78 bloques como fuente canónica. Se desarrolla además el Bloque 043 con 14 lecciones sobre audio digital, mezcla, DSP real-time, resampling, spatial audio, Doppler, reverb, occlusion, audio procedural, música adaptativa, streaming, voice management e integración de engine. Total acumulado: 43 bloques desarrollados y 544 lecciones validadas.


## Parte 45 — Bloque 044: Networking de videojuegos

Se desarrolla el Bloque 044 con 15 lecciones sobre client/server y P2P, tick rate, replicación de estado, snapshot interpolation, client-side prediction, reconciliation, lag compensation, rollback, determinismo, input delay, fiabilidad/orden, serialización y ancho de banda, interest management, seguridad/observabilidad y un proyecto de netcode integrado.

La regla editorial separa cuatro capas: **autoridad**, **simulación**, **transporte** y **presentación**. Snapshot interpolation no se presenta como prediction; rollback no se presenta como lag compensation; fixed timestep no se presenta como garantía de determinismo; reliable/ordered no se trata como política universal.

Las 10 áreas generales permanecen activas. El Bloque 044 ya pertenece transversalmente a Desarrollo de videojuegos, Godot y Redes e Internet.


## Parte 46 — Bloque 045: Godot profundo

Se desarrolla el Bloque 045 con 16 lecciones sobre arquitectura interna, SceneTree, Nodes/PackedScene, Resources, Signals, rendering, physics, input, Object model/scripting, GDScript, C#/.NET, GDExtension, profiling, networking, editor tools/custom nodes y lectura del engine source.

La regla editorial separa **modelo de escena**, **contrato público**, **binding de lenguaje**, **subsistema runtime** e **implementación interna**. `Resource` no se presenta como un Node; GDExtension no se presenta como lenguaje; C# GC no sustituye el lifecycle nativo; RPC no elimina propiedades de la red; source interno no se trata como API estable.

Las 10 áreas generales permanecen activas y el Bloque 045 es núcleo prioritario tanto de Godot como de Desarrollo de videojuegos. Total acumulado: 45 bloques desarrollados y 575 lecciones validadas.


## Parte 47 — Bloque 046: Pixel art y arte técnico

Se desarrolla el Bloque 046 con 14 lecciones sobre representación visual discreta, pixel clusters, silueta, paletas/color, dithering, antialiasing manual, subpixel animation, tilesets, sprites/atlases, animación, pixel-perfect rendering, generación procedural y pipeline técnico de importación/QA.

La regla editorial separa **intención artística**, **rejilla lógica**, **sampling**, **transformación**, **display** y **pipeline de assets**. Pixel art no se define como imagen de baja resolución; nearest-neighbor no garantiza pixel-perfect; dithering no se confunde con AA; subpixel animation no implica medio píxel real; paleta limitada no se trata como superior por definición.

Durante la auditoría se corrigió una omisión documental heredada: la lista “Contenido desarrollado” del README saltaba del Bloque 044 al total y no enumeraba el Bloque 045, aunque el árbol, la Parte 46 y el validador sí lo contenían. Se restaura esa línea sin modificar el histórico de 575 lecciones de la Parte 46.

Las 10 áreas generales permanecen activas y el Bloque 046 es núcleo prioritario de Pixel art y arte técnico, además de conectar con Demoscene, Desarrollo de videojuegos y Godot. Total acumulado: 46 bloques desarrollados y 589 lecciones validadas.


## Parte 48 — Bloque 047: Demoscene, historia y cultura

Se desarrolla el Bloque 047 con 15 lecciones sobre origen de la demoscene, crack intros, C64, Amiga, Atari, PC demo scene, Future Crew, Second Reality, Assembly, The Black Lotus, Farbrausch, Conspiracy, Scene.org, demoparties y competitions.

El foco histórico principal es Future Crew/Second Reality: se verifican party y resultado mediante Assembly Archive y se distingue historia documentada, recepción comunitaria y afirmaciones sobre implementación. La genealogía desde crack intros se trata como contexto cultural, no como guía de cracking.

La ruta general Demoscene ya tenía el Bloque 047 como foco prioritario; se mantiene el modelo many-to-many con Pixel art, gráficos, señales/audio, assembly, sizecoding y futuros efectos clásicos. Total acumulado: 47 bloques desarrollados y 604 lecciones validadas.


## Parte 49 — Bloque 048: Efectos clásicos de demoscene

Se desarrolla el Bloque 048 con 16 lecciones: plasma, fire, tunnel, starfields, scrollers, Copper/raster effects, rotozoom, metaballs, water, feedback, palette cycling, fractales, voxels, heightmaps, bump mapping y una integración final de producción.

La auditoría previa detectó y corrigió una referencia duplicada al Bloque 027 dentro de la ruta general de Ciberseguridad. El contenido no estaba duplicado, pero la navegación sí contenía el ID repetido. El validador se amplía para rechazar a partir de ahora bloques repetidos tanto en `blocks` como en `focus` de cualquier área general.

Criterio pedagógico: distinguir apariencia, algoritmo y mecanismo histórico. Un shader moderno puede reproducir visualmente un Copper effect o palette cycling sin compartir el hardware original; un heightmap no equivale a un volumen voxel arbitrario; bump mapping no desplaza geometría; y una iteración fractal finita no demuestra pertenencia matemática exacta. Total acumulado: 48 bloques desarrollados y 620 lecciones validadas.


## Parte 50 — Bloque 049: Sizecoding

Se desarrolla el Bloque 049 con 14 lecciones sobre 256-byte, 1K, 4K y 64K intros, assembly extremo, binary size, compresores, estructura de ejecutables, code/data dual use, generación procedural, shader compression, sintetizadores procedurales, entropy coding y arquitectura orientada a tamaño.

Criterio pedagógico: medir siempre el artefacto distribuido final y separar tamaño bruto, compresibilidad, RAM/runtime y coste de reconstrucción. Un source más corto no garantiza un executable packed menor; 64 KiB de distribución no son 64 KiB de memoria; minificar shader no equivale a optimizar GPU; compresión no es cifrado. Total acumulado: 49 bloques desarrollados y 634 lecciones validadas.


## Parte 51 — Bloque 050: Raymarching y Shader Art

- 14 lecciones sobre SDFs, raymarching, sphere tracing, CSG, normales, iluminación, soft shadows, AO, fractales, repetición de dominio, noise, texturas procedurales, rendimiento e integración.
- Se distingue SDF exacta de distance estimator/bound y raymarching general de sphere tracing.
- Soft shadows y AO se presentan como aproximaciones cuando no integran físicamente la iluminación correspondiente.
- Total histórico tras esta parte: **648 lecciones**.


## Parte 52 — Bloque 051: Música Procedural

- 14 lecciones sobre osciladores, formas de onda, ADSR, filtros, LFO, FM, síntesis sustractiva, sequencers, tracker music, música procedural, tiny synths, audio clock, composición generativa e integración audiovisual.
- Se distingue fase/frecuencia/sample rate, sustain como nivel, filtering de estructura, LFO de modulación audible, tracker representation de PCM renderizado y seed de reproducibilidad completa.
- Tiny synths se miden por tamaño packed total + song data + CPU/RAM, no únicamente por bytes del código DSP.
- Total histórico tras esta parte: **662 lecciones**.


## Parte 53 — Bloque 052: Electrónica Analógica

Añade 14 lecciones sobre señales reales, amplificadores, op-amps, realimentación/estabilidad, filtros, osciladores, LDO/regulación, ADC, DAC, fuentes/desacoplo, ruido, instrumentación, cadenas de señal y laboratorio. Se refuerzan límites de common-mode/output swing, GBW/slew rate, dropout/PSRR, resolución frente a exactitud, probe loading y presupuestos de ruido. Total acumulado: 52 bloques desarrollados y 676 lecciones validadas.


## Parte 54 — Bloque 053: Microcontroladores

Añade 16 lecciones sobre anatomía de MCU, Arduino interno, AVR, STM32, Cortex-M/NVIC, GPIO, timers/PWM, interrupciones, ADC/DAC, UART, SPI, I²C, DMA, watchdogs, bare metal/bootloaders y firmware real-time integrado.

Criterio pedagógico: distinguir **core**, **microcontrolador**, **placa** y **framework**; derivar timings desde el clock real del periférico; tratar GPIO/buses como contratos eléctricos; y separar throughput promedio de deadlines/WCET. `volatile` no se presenta como atomicidad, PWM no se presenta como DAC, DMA no se presenta como transferencia gratuita y CRC no se presenta como autenticación criptográfica. Total acumulado: 53 bloques desarrollados y 692 lecciones validadas.


## Parte 55 — Bloque 054: Sistemas Embebidos

- Auditoría acumulativa previa: 53 bloques / 692 lecciones, sin errores estructurales ni sintácticos.
- Añadidas 14 lecciones expertas sobre RTOS, scheduling, memoria, power, sensores, actuadores, motor control, buses y reliability.
- Total tras esta parte: **54 bloques desarrollados / 706 lecciones**.
- Se preservan los totales históricos de partes anteriores.


## Parte 56 — Bloque 055: FPGA

- Auditoría acumulativa previa: 54 bloques / 706 lecciones / 706 retos y 10 áreas generales, sin errores estructurales ni sintácticos.
- Añadidas 16 lecciones expertas sobre arquitectura FPGA, HDL/RTL, SystemVerilog, VHDL conceptual, combinacional/ALU, secuencial/FSM, CDC, STA, synthesis, place & route, BRAM, DSP, PLL/MMCM, soft CPU, vídeo y proyecto integrado.
- Distinciones reforzadas: HDL ≠ software secuencial; simulable ≠ sintetizable; synthesis ≠ place-and-route; setup ≠ hold; synchronizer de un bit ≠ CDC de bus; BRAM ≠ array con puertos infinitos; throughput ≠ latencia; soft CPU ≠ hard CPU.
- Total tras esta parte: **55 bloques desarrollados / 722 lecciones**.
- Se preservan todos los totales históricos anteriores.


## Parte 57 — Bloque 056: PCB

- Auditoría previa limpia sobre 55 bloques / 722 lecciones / 722 retos y 10 áreas generales.
- Bloque 056 añadido con 16 lecciones y 16 retos de Nivel 4.
- Se cubren los 15 aprendizajes del índice: schematics, layout, traces, layers, ground planes, decoupling, PI, SI, differential pairs, impedance, EMC, connectors, manufacturing, soldering y debugging físico, más una integración final.
- Distinciones reforzadas: schematic ≠ layout; ground ≠ 0 V ideal; trace ≠ wire ideal; clock rate ≠ edge rate; matched length ≠ impedance control; DRC ≠ fabricabilidad universal; decoupling capacitor ≠ PDN completa; instrumento ≠ observador ideal.
- Total al cierre: 56 bloques desarrollados, 738 lecciones y 738 retos de Nivel 4.


## Parte 58 — Auditoría acumulativa + Bloque 057

- Auditoría previa limpia sobre 56 bloques / 738 lecciones, 738 retos y 10 áreas generales; todos los JS/MJS pasaron `node --check`.
- Corrección documental heredada: el árbol de archivos del README terminaba visualmente en `block-055.js`; se añadieron `block-056.js` y `block-057.js` sin alterar contenido ni históricos.
- Bloque 057 añadido con 18 lecciones y 18 retos de Nivel 4, cubriendo exactamente los 18 aprendizajes del índice maestro.
- Distinciones reforzadas: Big O ≠ worst-case por definición; espacio auxiliar ≠ memoria total; append amortizado O(1) ≠ cada append O(1); inserción O(1) en lista ≠ localizar posición O(1); hash-table O(1) esperado ≠ worst-case universal; BST ≠ árbol balanceado; heap ≠ array ordenado; trie O(L) ≠ O(1); binary search requiere orden/monotonicidad y acceso adecuado; comparison sorting Ω(n log n) no aplica a counting/radix bajo el mismo modelo; greedy requiere prueba; MST ≠ shortest-path tree.
- Tutor prioriza `hash table`, trees, graphs, BFS/DFS, DP y sorting antes de fallbacks de criptografía/gráficos para evitar colisiones semánticas.
- Resultado esperado tras integración: 57 bloques desarrollados, 756 lecciones y 756 retos de Nivel 4.


## Parte 59 — Auditoría acumulativa + Bloque 058

- Auditoría previa limpia: 57 bloques desarrollados, 756 lecciones y 756 retos de Nivel 4; sintaxis y rutas consistentes.
- Bloque 058 añadido con 14 lecciones y 14 retos de Nivel 4 sobre autómatas, computabilidad, decidibilidad, halting, reducciones y P/NP.
- El tutor prioriza halting/reducciones/P/NP antes de fallbacks genéricos de autómatas discretos u optimización NP-hard.
- Total acumulado: **770 lecciones avanzadas**.


## Parte 60 — Auditoría acumulativa + Bloque 059

- Auditoría previa limpia: 58 bloques desarrollados, 770 lecciones y 770 retos de Nivel 4; sintaxis, rutas y tutor consistentes.
- Bloque 059 añadido con 14 lecciones y 14 retos de Nivel 4 sobre concurrencia, threads/procesos, locks/atomics, memory ordering/models, lock-free, SIMD, GPU y paralelismo distribuido.
- Tutor especializado prioriza memory-model/lock-free/SIMD/GPU-distributed antes de fallbacks genéricos de SO o GPU.
- Total acumulado: **784 lecciones avanzadas**.


## Parte 61 — Auditoría acumulativa + Bloque 060

- Auditoría previa limpia: 59 bloques desarrollados, 784 lecciones y 784 retos de Nivel 4; sintaxis, rutas y tutor consistentes.
- Bloque 060 añadido con 14 lecciones y 14 retos de Nivel 4 sobre aprendizaje, funciones, parámetros, modelos, loss, optimización, dataset, train/validation/test, overfitting, generalización, baselines, regularización y pipeline integrado.
- Distinciones reforzadas: aprender ≠ comprender; parámetro ≠ hiperparámetro; modelo ≠ optimizador; loss ≠ métrica final; train loss ≠ generalización; test ≠ conjunto de tuning; dataset grande ≠ representativo; buen IID test ≠ robustez bajo shift.
- Tutor especializado prioriza train/test, overfitting, loss, learning rate y dataset antes de fallbacks de estadística u optimización.
- Total acumulado: **798 lecciones avanzadas**.


## Parte 62 — Auditoría acumulativa + Bloque 061

- Auditoría previa limpia: 60 bloques desarrollados, 798 lecciones y 798 retos de Nivel 4; sintaxis, rutas y tutor consistentes.
- Bloque 061 añadido con 14 lecciones y 14 retos de Nivel 4 sobre neuronas, perceptrón, activaciones, MLP, forward, loss, derivadas, chain rule, backpropagation, gradient descent, initialization, regularization, BatchNorm y optimizers.
- Proyecto: red neuronal primero sin frameworks y después vectorizada con NumPy, manteniendo las mismas ecuaciones y verificando gradientes.
- Distinciones reforzadas: backpropagation ≠ gradient descent; activación no lineal ≠ capa afín; parámetro ≠ hiperparámetro; BatchNorm train ≠ inference; atomicidad numérica/estabilidad ≠ generalización; más profundidad/parámetros ≠ mejor modelo automáticamente.
- Total acumulado: **812 lecciones avanzadas**.


## Parte 63 — Auditoría acumulativa + Bloque 062

- Auditoría previa limpia: 61 bloques desarrollados, 812 lecciones y 812 retos de Nivel 4; sintaxis, rutas y tutor consistentes.
- Bloque 062 añadido con 14 lecciones y 14 retos de Nivel 4 sobre profundidad, convolution/CNN, pooling, RNN, LSTM, GRU, attention, embeddings, representation learning, receptive fields, entrenamiento profundo, masking e integración.
- Distinciones reforzadas: deep ≠ mejor automáticamente; convolution ≠ invariancia; pooling ≠ anti-aliasing; RNN timestep ≠ parámetros independientes; LSTM/GRU ≠ memoria infinita; attention ≠ self-attention/causalidad; embedding similarity ≠ significado universal; residual connection ≠ cura total del gradient flow.
- Tutor especializado prioriza CNN/RNN/LSTM/GRU/attention/embeddings antes de fallbacks de MLP, señales o IA genérica.
- Total acumulado: **826 lecciones avanzadas**.


## Parte 64 — Auditoría acumulativa + Bloque 063

- Base auditada antes de editar: 62 bloques, 826 lecciones, 826 retos y 10 áreas generales; validador y `node --check` en verde.
- Bloque 063 añadido con 14 lecciones y 14 retos de Nivel 4 sobre tokens, embeddings, positional encoding, Q/K/V, self-attention, multi-head, FFN, residuals, LayerNorm, encoder, decoder y causal masking.
- Se separan explícitamente attention/self-attention, Q/K/V, padding/causal masking, encoder/decoder, pre-norm/post-norm y architecture/tokenizer.
- El bloque permanece como foco de la ruta Inteligencia Artificial y prepara 064 LLM sin adelantar pretraining, sampling, KV cache o RAG.
- Total final: 63 bloques desarrollados y 840 lecciones validadas.


## Parte 65 — Auditoría acumulativa + Bloque 064

- Auditoría de entrada: 63 bloques / 840 lecciones / 840 retos; 10 áreas generales, rutas e IDs consistentes.
- Añadido `content/block-064.js` con 19 lecciones: los 18 aprendizajes del índice maestro más el proyecto de pequeño LLM propio.
- Distinciones reforzadas: Transformer≠LLM completo; token≠palabra; pretraining≠instruction tuning; sampling≠training; temperature/top-k/top-p son políticas distintas; context window≠memoria permanente; KV cache ahorra recomputación pero consume memoria; RAG≠actualizar pesos; quantization nominal≠speedup garantizado; más dispositivos≠escalado lineal.
- Total final: **64 bloques desarrollados / 859 lecciones / 859 retos de Nivel 4**.


## Parte 66 — Auditoría acumulativa + Bloque 065

- Auditoría de entrada: 64 bloques / 859 lecciones / 859 retos; 10 áreas generales, rutas e IDs consistentes.
- Añadido `content/block-065.js` con 14 lecciones y 14 retos de Nivel 4 sobre agente/entorno, estado/observación, acciones/reward, return, policy, value, Bellman, exploration, Q-learning, Deep Q, policy gradients, actor-critic y evaluación reproducible.
- Distinciones reforzadas: reward≠return; state≠observation; policy≠value; Bellman≠algoritmo; Q-learning tabular≠DQN; on-policy≠off-policy; actor≠critic; average return≠estabilidad; reward alta≠seguridad.
- Total final: **65 bloques desarrollados / 873 lecciones / 873 retos de Nivel 4**.


## Parte 67 — Auditoría acumulativa + Bloque 066

- Auditoría previa limpia: 65 bloques desarrollados, 873 lecciones y 873 retos de Nivel 4; sintaxis, rutas y 10 áreas generales consistentes.
- Añadido `content/block-066.js` con 14 lecciones y 14 retos expertos sobre autoencoders, VAEs/ELBO, GANs, diffusion, score matching, conditioning, latent diffusion y evaluación de generación de imágenes.
- Distinciones reforzadas: reconstrucción ≠ generación; VAE ≠ autoencoder con ruido; ELBO ≠ log-likelihood exacto; GAN loss ≠ cobertura; forward diffusion ≠ reverse sampling; score ≠ gradiente respecto a parámetros; conditioning ≠ guidance; latent diffusion ≠ pixel diffusion; FID/una métrica ≠ calidad universal.
- Tutor de modelos generativos priorizado antes de fallbacks de RL/LLM/Deep Learning.
- Total al cierre: **66 bloques, 887 lecciones y 887 retos**.


## Parte 68 — Auditoría acumulativa + Bloque 067

- Estado de entrada validado: 66 bloques, 887 lecciones, 887 retos y 10 áreas generales; sintaxis JS/MJS limpia antes de editar.
- Bloque 067 desarrollado con 14 lecciones y 14 retos expertos sobre modularidad, abstracción, encapsulación, APIs, cohesión/acoplamiento, diseño de interfaces, arquitectura, quality attributes, refactoring, deuda técnica, code review, documentación, evolución de dependencias e integración profesional.
- Semántica protegida: módulo ≠ archivo; abstracción ≠ ocultar restricciones relevantes; encapsulación ≠ getters/setters; API ≠ firma; bajo acoplamiento ≠ cero dependencias; arquitectura ≠ patrón de moda; refactoring ≠ feature change; deuda técnica ≠ código feo; review ≠ tests; versión ≠ compatibilidad garantizada.
- El tutor prioriza contexto de Ingeniería del Software antes de fallbacks genéricos de API/SO/arquitectura.
- Total esperado al cierre: 67 bloques, 901 lecciones y 901 retos de Nivel 4.


## Parte 69 — Auditoría acumulativa + Bloque 068

- Estado de entrada validado: 67 bloques, 901 lecciones, 901 retos y 10 áreas generales; sintaxis y rutas limpias antes de editar.
- Bloque 068 añadido con 18 lecciones y 18 retos de Nivel 4: repository, working tree, index, commit, blob, tree, refs, HEAD, branches, merge, rebase, cherry-pick, tags, remotes, packfiles, object database, hashing e internals.
- Distinciones reforzadas: repository≠working tree; index≠lista de archivos; commit≠diff; blob≠pathname; ref≠commit; HEAD≠branch; merge≠rebase; cherry-pick≠mismo commit; remote≠remote-tracking ref; packfile≠tipo de objeto; object ID≠firma digital.
- Tutor Git priorizado antes de colisiones con branch/commit de microarquitectura.
- Total al cierre: **68 bloques, 919 lecciones y 919 retos de Nivel 4**.


## Parte 70 — Auditoría acumulativa + Bloque 069 — Testing

- Auditoría de entrada limpia: 68 bloques, 919 lecciones y 919 retos; sintaxis, rutas e IDs consistentes.
- Bloque 069 añadido con 14 lecciones y 14 retos: cubre los 11 aprendizajes del índice y añade oráculos, cobertura/mutation testing y un proyecto de estrategia por riesgo.
- Revisión conceptual: unit ≠ una sola función; integration ≠ mocks de todos los lados; system/E2E ≠ toda la suite; property-based ≠ prueba formal; fuzzing ≠ bytes aleatorios sin oráculo; test double ≠ mock; coverage ≠ correctitud; static ≠ dynamic analysis; CI ≠ continuous delivery automática.
- Tutor especializado insertado antes de Git y fallbacks genéricos para responder sobre testing con semántica específica.
- Total esperado tras integración: 69 bloques desarrollados / 933 lecciones / 933 retos de Nivel 4.


## Parte 71 — Auditoría acumulativa + Bloque 070 — Sistemas Distribuidos

- Revalidadas las 933 lecciones previas antes de ampliar: catálogo, rutas, IDs, prácticas y sintaxis limpias.
- Bloque 070 añadido con 16 lecciones y 16 retos: cubre los 14 aprendizajes del índice y añade idempotencia/semántica de entrega y un proyecto integrador.
- CAP se formula condicionado a particiones y no como “elige dos de tres” permanente.
- Los relojes de Lamport respetan happens-before en una dirección; `L(a)<L(b)` no demuestra `a→b`.
- Raft separa recepción, replicación y commit; términos/majorities y reglas de log preservan safety.
- Timeouts se presentan como detectores imperfectos; retries requieren razonar sobre idempotencia y efectos duplicados.
- Message queues/logs distinguen orden por partición, acknowledgements, redelivery y el alcance real de exactly-once.

Resultado tras la Parte 71: 78 bloques en catálogo, 70 desarrollados y 949 lecciones validadas.


## Parte 72 — Auditoría acumulativa + Bloque 071 — Bases de Datos

- Auditoría previa de la Parte 71: catálogo, rutas, lecciones, retos y sintaxis válidos antes de ampliar.
- Añadido `content/block-071.js` con 16 lecciones y 16 retos de nivel 4.
- Se cubren los 14 aprendizajes del índice y se añaden normalización/desnormalización y un proyecto integrador.
- ACID se explica por propiedad y alcance; no como garantía universal de corrección.
- MVCC se separa de locking e isolation level; no se presenta como “sin locks”.
- Índices/B-trees se conectan al modelo de costes; un índice existente no fuerza su uso.
- WAL se explica como protocolo de recuperación y se separa de la ubicación final de las páginas.
- NoSQL se trata como familia heterogénea de modelos, no como opuesto monolítico de SQL.

Resultado tras la Parte 72: 78 bloques en catálogo, 71 desarrollados y 965 lecciones validadas.


## Parte 73 — Auditoría acumulativa + Bloque 072

- Auditoría de entrada limpia: 71 bloques desarrollados, 965 lecciones y 965 retos de Nivel 4; rutas, IDs y sintaxis consistentes.
- Añadido `content/block-072.js` con 16 lecciones y 16 retos de Nivel 4 sobre VMs, hypervisors, asistencia de hardware, memoria/E/S virtual, containers, namespaces, cgroups, Docker internals, images, layers, OverlayFS, persistencia, seguridad, comparación VM/container, observabilidad y proyecto integrador.
- Distinciones reforzadas: contenedor ≠ VM ligera; namespace ≠ cuota; cgroup ≠ aislamiento de nombres; imagen ≠ contenedor; tag ≠ digest; writable layer ≠ persistencia; overlay2 ≠ backend universal de Docker actual; aislamiento ≠ seguridad absoluta.
- Total acumulado: **981 lecciones avanzadas**.


## Parte 74 — Auditoría acumulativa + Bloque 073

- Estado de entrada validado: 72 bloques desarrollados / 981 lecciones / 981 retos; rutas, IDs y sintaxis consistentes.
- Añadido `content/block-073.js` con 16 lecciones y 16 retos de Nivel 4 sobre servidores, data centers/failure domains, virtualización, contenedores, orquestación, Kubernetes, load balancing, autoscaling, tolerancia a fallos, observabilidad, almacenamiento distribuido, cloud networking, capacity planning, SLOs/error budgets, coste y proyecto integrador.
│   ├── block-074.js   # Performance Engineering
- Distinciones reforzadas: cloud ≠ ausencia de failure domains; contenedor ≠ unidad automática de HA; load balancing ≠ replicación de estado; autoscaling ≠ capacity planning; réplica ≠ tolerancia a fallos correlacionados; observabilidad ≠ acumular logs; durabilidad ≠ consistencia.
- Total final: **73 bloques desarrollados / 997 lecciones / 997 retos de Nivel 4**.


## Parte 75 — Bloque 074: Performance Engineering

- Auditoría de entrada: Parte 74 íntegra antes de editar.
- Añadido `content/block-074.js` con 16 lecciones y 16 retos de Nivel 4.
- Cobertura: metodología de rendimiento, benchmarking, profiling, CPU bottlenecks, cache behaviour, branch prediction, memory bandwidth, SIMD, multithreading, GPU acceleration, I/O, latency, throughput, tail latency, modelos y proyecto integrador.
- Criterio editorial: benchmark ≠ realidad completa; utilización ≠ causa; miss rate ≠ coste; branchless ≠ mejora universal; SIMD width ≠ speedup; kernel GPU rápido ≠ aplicación rápida; promedio ≠ distribución; p99 no se agrega promediando p99 por host.
- Total final esperado: **74 bloques desarrollados / 1013 lecciones / 1013 retos de Nivel 4**.


## Parte 76 — Bloque 075: Laboratorio de Sistemas Reales

- Auditoría de entrada: Parte 75 íntegra antes de editar.
- Añadido `content/block-075.js` con 21 lecciones y 21 retos de Nivel 4.
- Laboratorios: método de autopsia técnica; Git; Linux; Doom; Godot; Blender; SSD; GPU; Internet; consolas; LLMs; trazado vertical y proyecto final.
- Criterio editorial: observar ≠ inferir; motor ≠ datos; abstracción ≠ implementación; cache/virtualización ≠ persistencia; más paralelismo ≠ speedup lineal. Cada laboratorio exige versiones, inputs, instrumento y evidencia refutable.
- Total final esperado: **75 bloques desarrollados / 1034 lecciones / 1034 retos de Nivel 4**.


## Parte 77 — Bloque 076: Historia de la Computación

- Auditoría de entrada: Parte 76 íntegra antes de editar.
- Añadido `content/block-076.js` con 26 lecciones y 26 retos de Nivel 4.
- Cobertura: máquinas mecánicas, Pascal, Leibniz, Babbage, Ada Lovelace, Boole, Turing, Shannon, programa almacenado/Von Neumann, relés, válvulas, transistor, circuito integrado, microprocesador, mainframes, minicomputers, microcomputers, Unix, Internet, PC, consolas, GPU, smartphone, cloud, IA moderna y proyecto histórico integrador.
- Criterio editorial: cronología ≠ causalidad; nombre de arquitectura ≠ inventor único; diseño ≠ máquina construida; Internet ≠ Web; Unix ≠ Linux; microprocesador ≠ computador completo; evolución ≠ progreso lineal inevitable.
- Total final esperado: **76 bloques desarrollados / 1060 lecciones / 1060 retos de Nivel 4**.


## Parte 78 — Bloque 077: Filosofía y Metodología de Ingeniería

- Auditoría de entrada: Parte 77 íntegra antes de editar.
- Añadido `content/block-077.js` con 19 lecciones y 19 retos de Nivel 4.
- Cobertura: modelado, abstracción/implementación, supuestos, experimentos, medición, comparación, trade-offs, límites, documentación, estándares, papers, código fuente, reverse engineering conceptual, debugging sistemático, documentación técnica, diseño incremental, validación/verificación, reproducibilidad y proyecto integrador.
- Criterio editorial: observación ≠ explicación; correlación ≠ causalidad; precisión ≠ exactitud; abstracción ≠ ocultar restricciones observables; reproducibilidad ≠ corrección; verificación ≠ validación; benchmark/paper ≠ verdad universal.
- Total final esperado: **77 bloques desarrollados / 1079 lecciones / 1079 retos de Nivel 4**.

## Ruta secreta

- `s3cr3t-cas3/index.html` sirve el proyecto NEXUS completo e independiente desde `/s3cr3t-cas3/` en hosting estático con directory indexes.
- El ASCII solicitado está incluido como comentario de código no visible en la interfaz tanto en la entrada principal como en la ruta secreta.

## Laboratorios interactivos (infraestructura práctica)

La universidad incluye una capa de laboratorios ejecutables accesible desde la navegación principal y desde las lecciones compatibles.

- **JavaScript Runner:** ejecución real dentro de un Web Worker aislado, captura de `console.log`, tests y límite temporal de 2 segundos.
- **Playground Web:** HTML/CSS/JS ejecutado en un `iframe` sandboxed con preview inmediato.
- **Laboratorio de Lógica:** generador de tablas de verdad para expresiones booleanas.
- **CPU + Assembly USIC:** máquina educativa con registros R0–R7, PC, flag Z, labels, saltos y ejecución paso a paso.
- **Compilador USIC:** lenguaje educativo con lexer, parser, AST, compilación a bytecode y ejecución en una VM propia.

Los laboratorios educativos se etiquetan explícitamente como simuladores/máquinas didácticas; no se presentan como sustitutos de GCC, Clang, x86-64, ARM o RISC-V reales. La infraestructura está diseñada para incorporar después runtimes WebAssembly adicionales y prácticas específicas por bloque.


## Parte 79 — Cierre curricular + pulido final

- Añadido `content/block-078.js` con los **33 proyectos de integración** del índice, organizados en seis niveles.
- Cada proyecto incluye MVP, arquitectura por capas, criterio de aceptación, instrumentación/pruebas, cierre técnico y reto de nivel 4.
- Total curricular: **78/78 bloques desarrollados, 1112 lecciones y 1112 retos de Nivel 4**.
- Los laboratorios del Bloque 078 se asignan por proyecto para evitar herramientas irrelevantes.
- Progreso: contador de repaso dinámico y exportación/importación/reinicio local.
- Accesibilidad: foco visible, preferencia de movimiento reducido y aviso cuando JavaScript está desactivado.
- NEXUS: carga de estado local endurecida ante JSON corrupto; sus descargas y recursos siguen siendo relativos a `/s3cr3t-cas3/`.
