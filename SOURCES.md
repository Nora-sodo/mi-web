# Fuentes técnicas de verificación

Estas fuentes se usan para contrastar afirmaciones delicadas. El texto didáctico es original y no copia pasajes extensos.

## Bloque 003 — Electricidad fundamental

- Bureau International des Poids et Mesures (BIPM), *The International System of Units (SI), 9th edition*, actualización 2026. Definiciones del amperio y unidades eléctricas derivadas: https://www.bipm.org/en/publications/si-brochure
- NIST, constantes físicas usadas en cálculos. Carga elemental exacta: `1.602176634e-19 C`: https://pages.nist.gov/feasst/pyfeasst/docs/source/physical_constants.html
- Infineon, *What Is a MOSFET?* Conceptos de gate, drain, source y control por tensión: https://www.infineon.com/technology/mosfets
- Analog Devices, *A Practical Guide to High-Speed Printed-Circuit-Board Layout*. Efectos de capacitancias/inductancias parásitas y layout: https://www.analog.com/en/resources/analog-dialogue/articles/high-speed-printed-circuit-board-layout.html

## Criterio

Los datasheets y notas de aplicación se usan para verificar afirmaciones de ingeniería práctica; las leyes físicas y unidades se apoyan preferentemente en BIPM/NIST. Las aproximaciones de primer orden se etiquetan como tales en las lecciones.

## Bloque 004 — Lógica digital

- Texas Instruments, *Metastability Performance of Clocked FIFOs* (SCZA004). Referencia técnica para metastabilidad, resolución y fiabilidad estadística de elementos sincronizados.
- Texas Instruments, *FIFO Architecture, Functions, and Applications* (SCAA042A). Referencia para setup/hold y efectos de metastabilidad en flip-flops D.
- Micron Technology, *Introduction to Memory*. Referencia conceptual para organización de memoria y el mecanismo de almacenamiento/refresco de DRAM.
- Micron Technology, documentación técnica de DRAM/DDR. Referencia para distinguir reloj, tasa de transferencias y organización de memoria dinámica.

> Nota editorial: álgebra de Boole, tablas de verdad, De Morgan, sumadores, FSM y Karnaugh son contenidos matemáticos/digitales estables. Las referencias de fabricante se utilizan especialmente para las afirmaciones físicas y temporales donde una simplificación de libro puede resultar engañosa.

## Bloque 005 — Arquitectura de computadores

- RISC-V International, *The RISC-V Instruction Set Manual, Volume I: Unprivileged Architecture*, versión oficial 2026-01-20. Referencia para la separación entre ISA base, instrucciones y extensiones: https://docs.riscv.org/reference/isa/v20260120/unpriv/unpriv-index.html
- Arm Developer, documentación de registros en AArch64. Referencia para X0–X30, SP y tratamiento arquitectónico del PC: https://developer.arm.com/documentation/dui0801/h/Overview-of-AArch64-state/Registers-in-AArch64-state
- Intel, *Intel® 64 and IA-32 Architectures Software Developer’s Manuals*. Referencia primaria para arquitectura y entorno de programación x86/x86-64: https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html

### Criterio editorial

El bloque distingue deliberadamente ISA, ABI, organización y microarquitectura. Las comparaciones RISC/CISC se presentan como categorías históricas y de interfaz, no como reglas que determinen pipeline, número de ciclos o rendimiento.

## Bloque 006 — Assembly

- Intel, *Intel® 64 and IA-32 Architectures Software Developer’s Manuals*. Semántica de instrucciones, entorno de programación y mecanismos de control en x86/x86-64: https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html
- Arm, *Procedure Call Standard for the Arm 64-bit Architecture (AAPCS64)*. Reglas de parámetros, resultados, registros preservados y stack para AArch64: https://developer.arm.com/additional-resources/abi-procedure-call-standard-for-the-arm-64-bit-architecture
- RISC-V International, *Ratified Specifications Library / Unprivileged ISA*. JAL/JALR, ECALL, extensión C y semántica de instrucciones: https://docs.riscv.org/reference/home/index.html
- RISC-V, *ELF psABI Specification*. Convención de registros, argumentos y valores de retorno: https://riscv-non-isa.github.io/riscv-elf-psabi-doc/
- Linux man-pages, `syscall(2)` y `syscalls(2)`. Distinción entre wrappers de biblioteca e interfaz de llamadas al sistema y variación por arquitectura: https://man7.org/linux/man-pages/man2/syscall.2.html

### Criterio editorial

Se evita enseñar assembly como una sintaxis universal. Cada afirmación dependiente de ABI se etiqueta por plataforma cuando importa, y los ejemplos separan efecto arquitectónico, notación del assembler y contrato de interoperabilidad.


## Bloque 007 — Microarquitectura avanzada

Fuentes primarias/industriales utilizadas para contrastar la terminología y los límites de las explicaciones:

- Intel, *Intel® 64 and IA-32 Architectures Optimization Reference Manual*: motor out-of-order, renaming, micro-ops, ejecución y optimización.
- RISC-V International, especificación Zicntr/Zihpm: semántica de contadores `cycle`, `instret` y hardware performance counters.
- Arm Developer, documentación de microarquitecturas Cortex de alto rendimiento: front-end, branch prediction y ejecución out-of-order como técnicas de implementación.
- Gene M. Amdahl, “Validity of the Single Processor Approach to Achieving Large Scale Computing Capabilities”, AFIPS 1967: fundamento del límite de speedup usado en la lección de Amdahl.

## Bloque 008 — Jerarquía de memoria

- Intel 64 and IA-32 Optimization Reference Manual: jerarquía de caché y políticas de escritura.
- RISC-V Privileged Architecture: traducción de memoria, page tables y sincronización de caches de traducción.
- NVM Express Base Specification 2.3 / NVMe over PCIe Transport: submission/completion queues y protocolo.
- Micron NOR/NAND Flash Guide: ECC, bad-block management y wear leveling.

## Bloque 009 — C profundo

- ISO/IEC JTC1/SC22/WG14, página oficial del lenguaje C. Confirma que C23 (ISO/IEC 9899:2024) es el estándar vigente y centraliza el trabajo de revisión posterior.
- WG14 N1570, *Programming Languages — C*, committee draft de C11. Referencia pública para definiciones clásicas de undefined behavior, tipos, objetos, punteros, qualifiers, arrays, almacenamiento y biblioteca.
- WG14, página de estándares aprobados. Referencia para el estado de las ediciones públicas y documentos del comité.

### Criterio editorial

Las lecciones usan terminología del estándar, pero distinguen expresamente el estándar vigente de documentos públicos históricos como N1570. Las afirmaciones dependientes de una ABI, del sistema operativo o de un compilador concreto no se presentan como propiedades universales del lenguaje C.


## Bloque 010 — Compiladores y lenguajes

- System V ABI / ELF Generic ABI: formato ELF, símbolos y relocations.
- Microsoft PE/COFF specification: estructura de image/object files de Windows.
- LLVM Language Reference: semántica y estructura de LLVM IR.
- Oracle Linker and Libraries Guide: link-editor, runtime linker, shared objects y relocations ELF.

Nota editorial: las fuentes se usan para contrastar afirmaciones de formato/toolchain; las lecciones no convierten detalles de una implementación en reglas universales de compilación.

## Bloque 011 — Debugging y análisis de programas

Fuentes primarias/técnicas consultadas para la auditoría de esta parte:

- GNU GDB — documentación oficial: https://sourceware.org/gdb/current/onlinedocs/gdb.html/
- LLDB — tutorial y documentación oficial: https://lldb.llvm.org/use/tutorial.html
- Linux `ptrace(2)` / man-pages: https://man7.org/linux/man-pages/man2/ptrace.2.html
- strace — documentación oficial: https://strace.io/ y https://man7.org/linux/man-pages/man1/strace.1.html
- ltrace — manual: https://man7.org/linux/man-pages/man1/ltrace.1.html
- Clang AddressSanitizer: https://clang.llvm.org/docs/AddressSanitizer.html
- Clang UndefinedBehaviorSanitizer: https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html
- Valgrind Memcheck manual: https://valgrind.org/docs/manual/mc-manual.html
- Linux perf / kernel documentation: https://docs.kernel.org/ y https://perf.wiki.kernel.org/index.php/Tutorial
- DWARF Debugging Standard: https://dwarfstd.org/


## Bloque 012 — Sistemas operativos

- Linux man-pages: `fork(2)`, `clone(2)`, `pthreads(7)`, `sched(7)`, `futex(2)` y documentación relacionada.
- Linux Kernel Documentation: memoria, locking, scheduler y mecanismos de sincronización.
- UEFI Specification: System Table, Boot Services y Runtime Services.
- The Open Group / POSIX: threads, scheduling, mutexes, condition variables y semáforos.

Regla editorial: las particularidades de Linux/POSIX se etiquetan como tales y no se convierten en propiedades universales de todos los sistemas operativos.


## Bloque 013 — Sistemas de archivos

Fuentes primarias consultadas:

- Linux Kernel Documentation — Overview of the Linux Virtual File System.
- Linux Kernel Documentation — ext4 Data Structures and Algorithms / Journalling API.
- Btrfs documentation — Introduction, design and checksumming.
- OpenZFS documentation — ZFS concepts and copy-on-write/snapshots.
- Microsoft Learn — Master File Table (NTFS) y documentación de FAT/NTFS.

Criterio editorial: las estructuras de Linux VFS y ext4 se identifican como implementaciones concretas; no se proyectan como definiciones universales de filesystem.


## Bloque 014 — Drivers y hardware

Fuentes primarias/técnicas consultadas:

- Linux Kernel Documentation — Bus-Independent Device Accesses: MMIO/PIO y APIs de acceso a I/O.
- Linux Kernel Documentation — Dynamic DMA mapping Guide / DMA API: direcciones DMA, mappings, coherencia y límites del dispositivo.
- Linux Kernel Documentation — How To Write Linux PCI Drivers: resources, BARs, IRQ y DMA en drivers PCI.
- PCI-SIG — PCI Express Base Specification overview: arquitectura, interconnect y programming interface.
- USB-IF — USB 2.0 Specification y HID Device Class Definition 1.11: host-centric transfers, endpoints, descriptors y HID reports.

Criterio editorial: los detalles de Linux se etiquetan como implementación concreta; los mecanismos de PCIe/USB se presentan según sus especificaciones y no se confunden con la API del driver o con el subsistema superior.


## Bloque 015 — Linux interno

Fuentes primarias/técnicas consultadas:

- Linux Kernel Documentation — `/proc` filesystem: interfaz a estructuras internas y sysctl: https://docs.kernel.org/filesystems/proc.html
- Linux Kernel Documentation — sysfs: kobjects, atributos y jerarquías exportadas a user space: https://docs.kernel.org/filesystems/sysfs.html
- Linux man-pages — `namespaces(7)`, `user_namespaces(7)`, `cgroups(7)`, `capabilities(7)` y páginas relacionadas: https://man7.org/linux/man-pages/
- systemd official manuals — `systemd(1)`, `systemd.unit(5)`, `systemd.service(5)` y `systemd.exec(5)`: https://www.freedesktop.org/software/systemd/man/
- Linux Kernel Documentation — Linux Security Modules y AppArmor: https://docs.kernel.org/admin-guide/LSM/
- Linux Kernel Documentation — Building External Modules / kbuild: https://docs.kernel.org/kbuild/modules.html
- Linux Kernel Documentation — eBPF syscall, BPF helpers/kfuncs y subsistema BPF: https://docs.kernel.org/bpf/ y https://docs.kernel.org/userspace-api/ebpf/syscall.html

Criterio editorial: las primitivas Linux se presentan por responsabilidad. Procfs/sysfs son interfaces, namespaces aíslan vistas, cgroups controlan/contabilizan recursos, LSM aplica política y eBPF extiende hooks verificados; vivir dentro o alrededor del kernel no los convierte en mecanismos equivalentes.


## Parte 17 — Redes físicas

- IEEE Std 802.3-2022, Standard for Ethernet — familia Ethernet y especificaciones MAC/PHY.
- IEEE Std 802.11-2024 y familia 802.11 — revisión base actual de WLAN/Wi‑Fi consultada para MAC/PHY.
- ITU-T G.652 (08/2024) — características de fibra y cable monomodo.
- Shannon, C. E., “A Mathematical Theory of Communication” — capacidad/información como fundamento teórico; las fórmulas del bloque declaran sus modelos y supuestos.


## Bloque 017 — Ethernet y redes locales

Fuentes primarias/técnicas consultadas:

- IEEE Std 802.3-2022 — Ethernet: servicio MAC, formato de frames y familia Ethernet.
- IEEE Std 802.1Q-2022 — Bridges and Bridged Networks: VLAN-aware bridging y Spanning Tree dentro de la arquitectura de bridges.
- IEEE Registration Authority — administración de bloques de direcciones MAC.
- RFC 826 — Address Resolution Protocol (ARP): resolución de direcciones de protocolo a direcciones locales de red.
- RFC 894 — IPv4 over Ethernet: MTU clásica de 1500 octetos para datagramas IP sobre Ethernet.
- RFC 1191 — Path MTU Discovery: distinción entre MTU local y MTU del camino IPv4.

Criterio editorial: 802.3/802.1Q describen mecanismos de enlace/bridging; ARP y MTU IP se contextualizan en su capa. No se usa “capa 2” como excusa para fusionar tablas y responsabilidades distintas.


## Bloque 018 — Internet Protocol

Fuentes primarias/técnicas consultadas:

- RFC 791 — Internet Protocol (IPv4), junto con actualizaciones posteriores cuando afectan a campos concretos.
- RFC 1812 — Requirements for IP Version 4 Routers: longest-prefix match y comportamiento de forwarding/TTL.
- RFC 4632 / BCP 122 — Classless Inter-domain Routing (CIDR): direccionamiento y agregación por prefijos.
- RFC 8200 / STD 86 — Internet Protocol Version 6 (IPv6), junto con sus actualizaciones vigentes.
- RFC 4291 — IPv6 Addressing Architecture; RFC 5952 para representación textual recomendada.
- RFC 4861 — IPv6 Neighbor Discovery; RFC 4443 — ICMPv6.
- RFC 1191 — IPv4 Path MTU Discovery y RFC 8200 para la regla de fragmentación IPv6 en el origen.
- RFC 3022 — Traditional NAT / NAPT, como referencia descriptiva de traducción y limitaciones.
- RFC 2131 — DHCPv4. Para DHCPv6 se toma como referencia vigente RFC 9915 (STD 102, 2026), que obsoleta RFC 8415.

Criterio editorial: un RFC histórico no se trata automáticamente como la especificación más reciente. Se consultan estado, obsolescencias y actualizaciones; IPv4/IPv6, routing, neighbor discovery, NAT y DHCP se mantienen como mecanismos separados aunque cooperen en el mismo host/router.


## Bloque 019 — Routing e Internet global

Fuentes primarias/técnicas consultadas:

- RFC 4271 — A Border Gateway Protocol 4 (BGP-4): protocolo base, UPDATEs, atributos y decisión BGP.
- RFC 6793 — BGP Support for Four-Octet Autonomous System (AS) Number Space.
- RFC 7454 / BCP 194 — BGP Operations and Security: filtrado y prácticas operativas.
- RFC 9234 — Route Leak Prevention and Detection Using Roles in UPDATE and OPEN Messages: roles Provider/Customer/Peer/RS/RS-Client y prevención de leaks.
- RFC 7947 y RFC 7948 — Internet Exchange BGP Route Server y sus consideraciones operativas.
- RFC 6811, RFC 8481 y RFC 8893 — RPKI-based BGP Route Origin Validation y aclaraciones/actualizaciones de política de origen.
- RFC 4786 / BCP 126 — Operation of Anycast Services.
- RFC 2991 y RFC 7424 — ECMP/multipath y distribución por hashing de flujos.
- RFC 6707 y RFC 7336 — modelo y framework de Content Delivery Network Interconnection (CDNI).

Criterio editorial: las RFC base se complementan con sus actualizaciones vigentes. La política BGP no se reduce a longitud de AS_PATH, las relaciones económicas no se deducen automáticamente del protocolo, ROV no valida todo el camino y anycast/CDN/load balancing se mantienen como mecanismos distintos.


## Bloque 020 — TCP, UDP y QUIC

- RFC 9293 — Transmission Control Protocol (TCP), STD 7. Especificación consolidada vigente de TCP; obsoleta RFC 793 y varias actualizaciones históricas. https://www.rfc-editor.org/info/rfc9293/
- RFC 768 — User Datagram Protocol. Especificación base de UDP. https://www.rfc-editor.org/rfc/rfc768
- RFC 8085 — UDP Usage Guidelines. Recalca que UDP no incorpora congestion control y que los protocolos que lo usan deben comportarse responsablemente. https://www.rfc-editor.org/info/rfc8085/
- RFC 5681 — TCP Congestion Control. Slow start, congestion avoidance, fast retransmit y fast recovery; leer junto con actualizaciones posteriores cuando proceda. https://www.rfc-editor.org/info/rfc5681/
- RFC 9438 — CUBIC for Fast and Long-Distance Networks. Ejemplo de algoritmo de congestion control moderno estandarizado; refuerza que Reno no es la única implementación posible. https://www.rfc-editor.org/info/rfc9438/
- RFC 9000 — QUIC: A UDP-Based Multiplexed and Secure Transport. Core del transporte QUIC. https://www.rfc-editor.org/info/rfc9000/
- RFC 9001 — Using TLS to Secure QUIC. Integración criptográfica de TLS con QUIC. https://www.rfc-editor.org/info/rfc9001/
- RFC 9002 — QUIC Loss Detection and Congestion Control. Recovery y algoritmo ejemplar de congestión para QUIC. https://www.rfc-editor.org/info/rfc9002/


## Bloque 021 — Protocolos de aplicación

Fuentes primarias/técnicas consultadas:

- RFC 1034 y RFC 1035 — conceptos, namespace y formato base de DNS.
- RFC 6891 — EDNS(0); RFC 7766/9210 — DNS sobre TCP; RFC 7858 — DNS over TLS; RFC 9250 — DNS over QUIC.
- RFC 9110 — HTTP Semantics; RFC 9112 — HTTP/1.1; RFC 9113 — HTTP/2; RFC 9114 — HTTP/3; RFC 9204 — QPACK.
- RFC 9111 — HTTP Caching y RFC 6265 — HTTP State Management Mechanism (cookies), junto con actualizaciones vigentes cuando proceda.
- RFC 5321 — SMTP; RFC 5322 — Internet Message Format; RFC 9051 — IMAP4rev2.
- RFC 4251 y familia SSH — arquitectura SSH; RFC 6455 — WebSocket Protocol.

Criterio editorial: se separa semántica de wire format y transporte. Un protocolo de aplicación puede conservar la misma semántica sobre mappings diferentes, y compartir TCP/UDP/QUIC no fusiona DNS, HTTP, correo o WebSocket en una sola capa lógica.


## Bloque 022 — Criptografía

Fuentes primarias/técnicas consultadas:

- NIST FIPS 197 (update 2023) — Advanced Encryption Standard (AES); la actualización de 2023 no modifica técnicamente el algoritmo.
- NIST SP 800-38D — GCM/GMAC, vigente mientras NIST desarrolla su revisión anunciada y pre-draft work de 2026.
- NIST SP 800-90A Rev.1 y SP 800-90B — DRBG y fuentes de entropía.
- NIST FIPS 186-5 — Digital Signature Standard: RSA, ECDSA y EdDSA para generación/verificación moderna de firmas.
- RFC 8017 — PKCS #1 v2.2: RSA-OAEP y RSA-PSS, entre otros esquemas RSA.
- RFC 5869 — HKDF; RFC 9106 — Argon2 memory-hard password hashing.
- RFC 8446 — TLS 1.3: handshake, key schedule, autenticación y forward secrecy en los modos aplicables.

Criterio editorial: no se inventan protocolos ni se presenta una primitiva como sistema completo. Se marcan contratos operativos (nonce uniqueness, context binding, key separation, path/identity validation) y los detalles sujetos a revisión normativa se etiquetan como tales.


## Bloque 023 — Ciberseguridad de sistemas

Fuentes primarias/técnicas consultadas:

- NIST SP 800-53 Rev. 5 / actualización vigente — catálogo de controles, incluyendo least privilege, access control e identification/authentication.
- NIST SP 800-207 — Zero Trust Architecture: confianza y autorización centradas en recursos/identidades, no en una mera ubicación de red.
- Linux man-pages — `execve(2)`, `setuid(2)`, `capabilities(7)` y `user_namespaces(7)` para credenciales, set-user-ID y capability sets.
- Linux Kernel Documentation — `no_new_privs`: garantía de no ganar autoridad por `execve()` mediante setuid/setgid/file capabilities una vez activada.
- Linux Kernel Documentation — Seccomp BPF: filtrado de syscalls para reducir superficie de kernel alcanzable.
- Linux Kernel Documentation — Landlock: self-restriction y access control stackable; la propia documentación distingue este objetivo del aislamiento de vistas mediante namespaces.
- Linux Kernel Documentation — cgroup v2 y documentación de namespaces/LSM, consultadas junto a los bloques Linux previos para delimitar responsabilidades de containers e isolation.

Criterio editorial: una medida de hardening se describe por su garantía concreta y su TCB. “No root”, “container”, “seccomp” o “MFA” nunca se usan como pruebas globales de seguridad; el diseño se evalúa por autoridad efectiva, recursos compartidos, trust boundaries y modos de fallo.


## Bloque 024 — Seguridad web

- OWASP Web Security Testing Guide y Cheat Sheet Series — referencias defensivas para SQL injection, XSS, CSRF, SSRF, IDOR, file upload, authorization y testing controlado.
- OWASP Top 10:2025 — documento de concienciación actual; IDOR/BOLA se mantiene dentro del área de Broken Access Control.
- RFC 8725 / BCP 225 — JSON Web Token Best Current Practices: verificación de algoritmo, operaciones criptográficas, inputs y separación de tipos/contextos.
- RFC 9700 / BCP 240 — Best Current Practice for OAuth 2.0 Security (2025): actualiza el modelo de amenazas de OAuth 2.0 y depreca/restringe patrones inseguros observados en despliegues reales.
- RFC 9110/9111 y Fetch/CORS del navegador — contexto de semántica HTTP, caché y políticas de acceso cross-origin ya introducidas en el Bloque 021; en este bloque se reutilizan solo para razonar sobre fronteras de seguridad.

Criterio editorial: el bloque explica causa raíz, defensa y verificación en laboratorios autorizados. No incluye instrucciones para comprometer sistemas reales ni payloads operativos destinados a evadir controles.


## Bloque 025 — Explotación binaria / hardening

- GCC, documentación de Stack Smashing Protection y opciones de hardening: referencia para guards insertados por compilador y su alcance.
- GNU Binutils `ld`, opción `-z relro`: referencia para `PT_GNU_RELRO` y regiones que pueden hacerse read-only después de relocation.
- Linux kernel documentation, `randomize_va_space`: referencia para randomización del address space en Linux.
- Clang Control Flow Integrity documentation: referencia para esquemas CFI y restricciones de indirect control-flow.
- Intel Control-flow Enforcement Technology (CET): referencia para shadow stack y defensas hardware contra subversión de control-flow.
- GNU C Library manual / release notes: referencia para allocator, tcache y la necesidad de tratar detalles internos como dependientes de versión.

Regla de fuentes de este bloque: usar documentación primaria de compilador, linker, kernel, ISA/vendor y libc; evitar presentar layouts de un exploit tutorial o una versión concreta del allocator como propiedades universales.


## Bloque 026 — Ingeniería inversa

- Ghidra Project / NSA — documentación oficial y curso introductorio: disassembly, decompilation, graphing, symbol/function analysis y scripting.
- Ghidra API — decompiler y p-code como representaciones internas para análisis; se usan para mantener separadas instrucción, IR y pseudocódigo.
- GNU Binutils — `strip`, `objdump`, `nm` y utilidades de análisis de objetos; stripping elimina información seleccionada pero no la semántica ejecutable necesaria.
- angr documentation — CFG recovery y análisis de dependencias como referencia adicional para distinguir control-flow recovery de data-flow.

Criterio editorial: ejemplos sobre binarios propios, open-source o de laboratorio autorizado. Packing, obfuscation y anti-debugging se estudian como problemas de observabilidad y validación, no como técnicas para evadir controles en sistemas ajenos.


## Parte 28 — Malware y forense

- MITRE ATT&CK Enterprise Matrix y tácticas de Persistence/Defense Evasion: https://attack.mitre.org/matrices/enterprise/
- NIST SP 800-61 Rev. 3 (2025), Incident Response Recommendations: https://csrc.nist.gov/pubs/sp/800/61/r3/final
- NIST SP 800-86, Guide to Integrating Forensic Techniques into Incident Response: https://csrc.nist.gov/pubs/sp/800/86/final
- YARA 4.4 documentation: https://yara.readthedocs.io/en/stable/
- Volatility 3 documentation: https://volatility3.readthedocs.io/


## Bloque 028 — Matemáticas discretas

- MIT OpenCourseWare — *Mathematics for Computer Science* (6.042J / 6.1200J): lógica, pruebas, conjuntos, relaciones, grafos, inducción, conteo y state machines.
- Stanford CS103 — *Mathematical Foundations of Computing*: lógica, técnicas de prueba, estructuras discretas, autómatas y lenguajes formales.
- Cornell CS — materiales de discrete mathematics usados como contraste adicional para definiciones y pruebas.

Regla de auditoría para este bloque: una identidad algebraica o ejemplo numérico no sustituye una prueba cuando la afirmación es universal; distinguir siempre definición, teorema, condición suficiente y condición necesaria.


## Bloque 029 — Álgebra lineal

- MIT OpenCourseWare — 18.06 Linear Algebra / Gilbert Strang: espacios vectoriales, cuatro espacios fundamentales, eigenvalues, ortogonalidad, SVD y mínimos cuadrados.
- MIT OpenCourseWare — 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning: SVD, low-rank approximation, least squares y aplicaciones.
- LAPACK Users' Guide / Netlib — referencia numérica para factorizaciones, least squares y SVD; se usa para distinguir identidades algebraicas de algoritmos numéricamente estables.
- NumPy/SciPy documentation — contraste de convenciones computacionales para `solve`, `lstsq`, `svd` y `eig`, sin convertir detalles de una biblioteca en definiciones matemáticas.

Regla de auditoría para este bloque: declarar campo, dimensiones, bases y producto interno cuando sean relevantes; distinguir matriz de transformación abstracta; y separar exactitud simbólica, condicionamiento del problema y estabilidad del algoritmo.


## Bloque 030 — Cálculo

- MIT OpenCourseWare — 18.01 Single Variable Calculus: límites, derivadas, integrales, series y Teorema Fundamental.
- MIT OpenCourseWare — 18.02 Multivariable Calculus: parciales, gradiente, Jacobianos, Hessianos e integración multivariable.
- MIT OpenCourseWare — 18.03 Differential Equations: ODE, estabilidad, modelos y métodos cualitativos/numéricos.
- NIST Digital Library of Mathematical Functions (DLMF) — contraste de series, funciones elementales y convenciones analíticas cuando procede.

Regla de auditoría para este bloque: distinguir teorema exacto, hipótesis de existencia y aproximación numérica; una fórmula simbólica correcta no certifica estabilidad, condicionamiento ni error de discretización.


## Bloque 031 — Probabilidad y estadística

- Sheldon Ross, *A First Course in Probability*: axiomas, variables aleatorias, distribuciones, esperanza, condicionamiento y Bayes.
- Larry Wasserman, *All of Statistics*: inferencia, estimación, intervalos, tests, regresión y conceptos asintóticos.
- Casella & Berger, *Statistical Inference*: estimadores, likelihood, tests e intervalos con tratamiento formal.
- NIST/SEMATECH e-Handbook of Statistical Methods: referencia práctica para distribuciones, estimación, intervalos, tests, regresión y diagnóstico.

Criterio editorial: separar definición probabilística de frecuencia observada; no asumir independencia a partir de correlación cero salvo hipótesis especiales; interpretar intervalos y p-values en su marco frecuentista; no presentar asociación observacional como causalidad sin supuestos o diseño causal.


## Bloque 032 — Optimización

- Stephen Boyd y Lieven Vandenberghe, *Convex Optimization*: conjuntos/funciones convexas, dualidad, KKT, condiciones de Slater y métodos convexos.
- Jorge Nocedal y Stephen Wright, *Numerical Optimization*: line search, trust regions, Newton, quasi-Newton, constrained optimization y conditioning.
- Dimitri Bertsekas, *Nonlinear Programming*: condiciones de optimalidad, restricciones y métodos iterativos.
- Bottou, Curtis y Nocedal, *Optimization Methods for Large-Scale Machine Learning*: SGD y optimización estocástica a gran escala.
- Nemhauser y Wolsey, *Integer and Combinatorial Optimization*: formulaciones discretas, relajaciones, cotas y branch-and-bound.

Criterio editorial: distinguir formulación, condición matemática y algoritmo; no asumir convexidad ni globalidad sin hipótesis; no presentar convergencia numérica como validación del objetivo real; y separar cota dual, solución primal y certificado de optimalidad.

## Bloque 033 — Señales y FFT

- Alan V. Oppenheim, Alan S. Willsky y S. Hamid Nawab, *Signals and Systems*: señales continuas/discretas, sistemas LTI, convolución, Fourier y muestreo.
- Alan V. Oppenheim y Ronald W. Schafer, *Discrete-Time Signal Processing*: DTFT/DFT, sampling, multirate, filtros digitales y análisis espectral.
- Cooley y Tukey (1965), *An Algorithm for the Machine Calculation of Complex Fourier Series*: referencia histórica del esquema FFT por factorización.
- MIT OpenCourseWare 6.003 / Signals and Systems: contraste pedagógico para convolución, respuesta en frecuencia, Fourier, sampling y sistemas LTI.
- NumPy/SciPy documentation (`numpy.fft`, `scipy.fft`, `scipy.signal`): contraste de convenciones computacionales para orden de bins, normalización, FFT y filtrado; las APIs no se presentan como definiciones matemáticas.

Criterio editorial: separar señal física, secuencia muestreada, representación espectral y algoritmo numérico; FFT calcula una DFT y no corrige aliasing/leakage. Declarar `fs`, longitud, ventana, normalización, unidades y padding antes de interpretar un espectro.



## Bloque 034 — Gráficos por ordenador

- Khronos Group — OpenGL 4.6 Core Profile Specification (pipeline, clip coordinates, rasterization, textures).
- Khronos Group — Vulkan Specification (viewport, rasterization, depth/stencil, image sampling; convenciones API explícitas).
- Akenine-Möller, Haines, Hoffman — *Real-Time Rendering*, 4th ed.
- Hughes et al. — *Computer Graphics: Principles and Practice*, 3rd ed.
- Pharr, Jakob, Humphreys — *Physically Based Rendering*, 4th ed. (sampling, color y reconstrucción como referencia complementaria).

Criterio editorial: evitar declarar como universales rangos NDC, handedness, origen de textura o reglas de rasterización que dependen de API; separar valores sRGB codificados de magnitudes lineales y distinguir sample, pixel, texel y fragment.


## Bloque 035 — GPU / Arquitectura gráfica

- NVIDIA — CUDA Programming Guide (versión vigente consultada en 2026): modelo heterogéneo host/device, SMs, grids/blocks, warps de 32 threads, SIMT, divergence, memoria on-chip/global y caches.
- NVIDIA — CUDA Best Practices Guide: coalescing, occupancy, memory throughput y metodología de optimización/medición.
- AMD ROCm/HIP — Programming model y Hardware Features: waves/warps dependientes de arquitectura, workgroups, LDS, memoria y ejecución en GPU AMD.
- AMD GPUOpen — RDNA Performance Guide / Occupancy Explained: wave32/wave64 según familia, residencia y trade-offs de occupancy como referencias específicas de RDNA, no universales.
- Khronos — Vulkan 1.4 Specification: compute workgroups, shader invocations, subgroups y capacidades/tamaños consultables del dispositivo.

Criterio editorial: no comparar “GPU cores” como unidades equivalentes entre fabricantes; no hardcodear warp/wave/subgroup size fuera del contrato del backend; distinguir occupancy de rendimiento, cache de sincronización y peak FLOP/s de throughput real. Toda cifra microarquitectónica se trata como dependiente de generación salvo garantía expresa del modelo/API.

## Bloque 036 — Shaders y APIs gráficas

- Khronos Group — Vulkan 1.4 Specification (versión vigente consultada en 2026): command buffers, queues, pipelines, descriptors, synchronization, render passes/dynamic rendering y resource lifetimes.
- Khronos Group — OpenGL 4.6 Core Profile Specification: contexto/state machine, shader programs, buffers, textures y draw state.
- Khronos Group — OpenGL Shading Language 4.60.8: tipos, shader stages, interfaces, qualifiers y lenguaje GLSL.
- Khronos Group — SPIR-V Unified Specification / Registry: módulos binarios, entry points, execution models, capabilities y decorations `Location`, `Binding` y `DescriptorSet`.
- Vulkan Documentation Project — capítulos de Descriptor Sets, Render Pass/Dynamic Rendering y synchronization: contraste práctico alineado con la especificación.
- Microsoft Learn — HLSL/Direct3D shader compilation y Shader Model 6/DXIL: referencia conceptual para no presentar GLSL/SPIR-V como única toolchain de shaders moderna.

Criterio editorial: separar fuente, IR, pipeline, recurso y sincronización; no suponer que compilar/validar un shader demuestra compatibilidad de dispositivo, ausencia de hazards o rendimiento. Tratar render pass tradicional y dynamic rendering como opciones vigentes y expresar lifetimes/dependencias según el contrato de la API.


## Bloque 037 — Iluminación y render

- Pharr, Jakob y Humphreys — *Physically Based Rendering: From Theory to Implementation*, 4th ed. (pbr-book.org): radiometría, BSDF/BRDF, light transport equation, Monte Carlo, importance sampling y path tracing.
- Khronos Group — glTF 2.0 Specification: modelo PBR metallic-roughness, baseColor/metallic/roughness y semántica interoperable de materiales.
- Khronos Group — glTF Registry: aclaraciones vigentes del estándar 2.0; se usa para evitar convertir un workflow de assets en definición universal de PBR.
- Blender Manual — Cycles (referencia de renderer de producción): contraste práctico para path tracing, sampling y reducción de ruido; no se usa como definición matemática.

Criterio editorial: separar magnitudes radiométricas, función de scattering, visibilidad e integrador; no confundir una aproximación raster con una solución general de transporte. PBR significa un modelo físicamente motivado bajo supuestos explícitos, no una garantía de fidelidad espectral, GI, convergencia o ausencia de errores numéricos.


## Bloque 038 — Motor gráfico

- Akenine-Möller, Haines y Hoffman — *Real-Time Rendering*, 4th ed.: scene management, visibility, LOD, batching, instancing y arquitectura de render en tiempo real.
- Jason Gregory — *Game Engine Architecture*, 3rd ed.: resource managers, scene/game object architecture, rendering engine integration y frame pipelines.
- Ericson — *Real-Time Collision Detection*: bounding volumes y estructuras espaciales usadas como base para culling.
- Khronos Vulkan Specification / synchronization model: lifetimes de recursos, submissions y dependencias del backend que un render graph debe respetar.
- GPU Gems / vendor performance guides como contraste de técnicas de occlusion, batching e instancing; se tratan como técnicas dependientes del workload, no leyes universales.

Criterio editorial: el motor se enseña como composición de sistemas con ownership/lifetimes explícitos. Menos draw calls, 100% GPU utilization o un scene graph único no son objetivos universales; las decisiones se justifican con perfiles y métricas reproducibles.


## Bloque 039 — Arquitectura de videojuegos

- Jason Gregory — *Game Engine Architecture*, 3rd ed.: game loop, subsistemas, resource management, runtime architecture, timing y herramientas.
- Robert Nystrom — *Game Programming Patterns*: game loop, component, event queue, update method y patrones de arquitectura como contraste pedagógico; no se tratan como recetas universales.
- Godot Engine stable documentation (consultada en 2026): fixed timestep / physics interpolation, `Input`/`InputMap`, `Resource`, `ResourceLoader` y `ResourceSaver` como contraste de una arquitectura de engine real.
- Glenn Fiedler — *Fix Your Timestep!*: referencia pedagógica clásica para timestep fijo, acumulador e interpolación; se complementa con análisis de estabilidad numérica de los bloques de Cálculo/Física.
- Lenguajes/formatos de serialización se presentan por propiedades (esquema, versionado, robustez, compatibilidad), no por asumir que JSON/binario o un framework concreto es universalmente superior.

Criterio editorial: un frame no es una unidad física universal; fixed timestep no garantiza determinismo; ECS no prescribe una implementación concreta; event buses y singletons no eliminan dependencias por sí solos. Persistencia y replays deben declarar esquema, versión, ownership temporal y fuentes de no determinismo.

## Bloque 040 — Física de videojuegos

- Box2D official documentation (consultada en 2026): simulation, shapes/materials, contacts, friction/restitution y organización general del solver.
- Box2D Dynamic Tree documentation: dynamic AABB tree usado para broad phase y consultas espaciales; se presenta como técnica/implementación, no como único broad phase posible.
- Erin Catto — *Modeling and Solving Constraints* (GDC 2009) y notas técnicas de Solver2D: constraints, Jacobians, effective mass, sequential impulses, accumulated impulse y warm starting.
- Godot Engine stable documentation (consultada en 2026): fixed-rate physics y physics interpolation como contraste de integración de un motor real.
- Glenn Fiedler — *Integration Basics* y *Fix Your Timestep!*: referencia pedagógica clásica para explicit/semi-implicit Euler y timestep; se complementa con el tratamiento matemático de Cálculo/ODEs del Bloque 030.
- Christer Ericson — *Real-Time Collision Detection*: AABB/BVH, broad/narrow phase, geometric predicates y robustez numérica como referencia general.

Criterio editorial: separar ecuaciones continuas, integrador, collision detection y constraint solver. Box2D/Godot ilustran decisiones reales, pero tamaños de step, número de iteraciones, combinación de materiales y algoritmos internos no se presentan como leyes universales de la física de videojuegos.

## Bloque 041 — Animación digital

- Khronos Group — glTF 2.0 Specification: animation samplers/channels, interpolación `LINEAR`/`STEP`/`CUBICSPLINE`, skins, joints e `inverseBindMatrices`; referencia de interoperabilidad, no definición universal de todos los engines.
- Godot Engine stable documentation (consultada en 2026): `AnimationTree`, `AnimationNodeStateMachine`, blend spaces y skeleton/animation workflows como contraste de una implementación real.
- Jason Gregory — *Game Engine Architecture*, 3rd ed.: animation pipelines, skeletal animation, blending, resource/runtime integration.
- Eric Lengyel — *Foundations of Game Engine Development, Vol. 1: Mathematics*: quaternions, transforms y jerarquías como base matemática para interpolación y poses.
- Referencias clásicas de character animation/IK (CCD/FABRIK) se usan conceptualmente; los detalles de solver, retargeting y compresión se tratan como decisiones de implementación con tolerancias y métricas explícitas.

Criterio editorial: separar tiempo de clip, pose, jerarquía, deformación y control. No asumir que fixed timestep hace determinista la animación, que los nombres de bones bastan para retargeting, que crossfade elimina foot sliding o que una state machine visual debe ser la autoridad del gameplay.



## Bloque 042 — IA para videojuegos

- Godot Engine — documentación estable de `AStar2D`/`AStar3D`: implementación de A* sobre grafos 2D/3D.
- Godot Engine — `NavigationMesh`: regiones poligonales transitables para pathfinding.
- Godot Engine — `NavigationAgent2D`/`NavigationAgent3D` y NavigationServer: pathfinding, path following y avoidance; la documentación separa navegación de avoidance y describe RVO para obstáculos dinámicos.
- Amit Patel / Stanford-hosted Red Blob Games — notas de A* y heurísticas: `f=g+h`, trade-offs entre heurística, coste y expansiones.
- Referencias clásicas de game AI para steering/behaviour trees/utility se usan como modelos conceptuales; el contenido evita fijar como universales detalles de una biblioteca o engine concreto.

Criterio editorial: separar decisión, percepción, planificación, navegación, steering y física. Una heurística más agresiva puede cambiar garantías de A*; una navmesh describe transitabilidad para parámetros de agente y no sustituye el controller físico; local avoidance no resuelve cambios globales de conectividad.


## Bloque 043 — Audio para videojuegos

- Pohlmann — *Principles of Digital Audio*: PCM, sample rate, cuantización, dB y fundamentos de audio digital.
- Udo Zölzer (ed.) — *DAFX: Digital Audio Effects*: filtros, delays, modulación, resampling y procesamiento de audio digital.
- Julius O. Smith — *Physical Audio Signal Processing* / CCRMA: síntesis, filtros, propagación y modelado de audio como referencia matemática/práctica.
- Godot Engine stable documentation — Audio buses, audio streams y arquitectura de audio como contraste de un engine real; los detalles de implementación no se presentan como universales.
- Referencias clásicas de game audio y sistemas interactivos se usan para spatial audio, voice management y música adaptativa; las decisiones de budget, HRTF y reverb se tratan como dependientes de plataforma/workload.

Criterio editorial: el audio de juego se enseña como sistema de tiempo real. El deadline del callback, el reloj de audio y los lifetimes de voces son contratos separados del frame de render. Las aproximaciones acústicas de gameplay se identifican como modelos/art direction cuando no son simulación física completa.


## Bloque 044 — Networking de videojuegos

- Godot Engine stable documentation — High-level multiplayer: `MultiplayerAPI`, peers y arquitectura multiplayer de alto nivel como contraste práctico de engine.
- Godot Engine stable documentation — `MultiplayerSynchronizer`: replicación de propiedades desde la autoridad hacia peers remotos.
- Godot Engine stable documentation — `MultiplayerSpawner`: replicación de spawn/despawn de nodos autorizados.
- Godot Engine stable documentation — dedicated server/headless export: referencia práctica para despliegue autoritativo sin asumir una arquitectura universal.
- Glenn Fiedler — *Snapshot Interpolation*, *State Synchronization* y la serie *Networked Physics*: referencias pedagógicas clásicas para distinguir snapshots, interpolación, state synchronization y restricciones de ancho de banda.

Criterio editorial: separar autoridad, simulación, transporte y presentación. Las técnicas de netcode mitigan latencia, jitter, pérdida y reordering, pero no los eliminan. Fixed timestep no implica determinismo; snapshot interpolation añade retraso deliberado; prediction necesita reconciliation si existe autoridad remota; rollback exige estado restaurable y resimulación reproducible suficiente. Los detalles de Godot se presentan como una implementación vigente, no como definición universal de multiplayer.


## Bloque 045 — Godot profundo

- Godot Engine stable documentation — Architecture overview / SceneTree / Nodes and scene instances: modelo de capas, árbol activo, lifecycle, instanciación y `queue_free`.
- Godot Engine stable documentation — Resource / Resources: `Resource` como contenedor de datos `RefCounted`, serialización y cache global por ruta.
- Godot Engine stable documentation — Signals / Object model: comunicación por signals y propiedades/métodos/signals del sistema de objetos.
- Godot Engine stable documentation — GDScript reference y C#/.NET: lenguajes/bindings distintos sobre el modelo del engine; se documentan las limitaciones actuales de plataforma cuando sean relevantes.
- Godot Engine stable documentation — GDExtension system: librerías nativas cargadas en runtime sin recompilar el engine; GDExtension no es un lenguaje de scripting.
- Godot Engine stable documentation — Profiler, EditorPlugin y running code in the editor: profiling integrado, extensiones del editor y riesgos/lifetimes de `@tool`.
- Godot Engine official GitHub repository (`godotengine/godot`): fuente primaria para lectura de implementación e historial; los detalles internos se tratan como implementación vigente, no como contrato estable.

Criterio editorial: enseñar Godot como un engine real por capas. Una API cómoda de Node no implica que toda la implementación interna sea un árbol; un wrapper de lenguaje no redefine el lifetime nativo; una herramienta del editor puede ejecutar side effects durante edición; y optimizaciones/escapes a Servers o GDExtension se justifican con perfiles y contratos, no por prestigio de “más bajo nivel”.


## Bloque 046 — Pixel art y arte técnico

- Godot Engine stable documentation — 2D rendering, texture filtering, viewport/stretch y asset import: referencia técnica para distinguir textura, sampling, escalado, cámara e import settings del criterio artístico.
- Khronos/OpenGL/Vulkan concepts ya citados en los Bloques 034–036 — sampling, texel/pixel, color-space y filtrado: base para explicar por qué nearest, mipmaps, sRGB y atlases tienen efectos técnicos distintos.
- Lospec — recursos y tutoriales de pixel art: referencia comunitaria para terminología práctica de paletas, dithering, clusters y técnicas de representación discreta.
- Pixel Joint / práctica histórica de la comunidad pixel-art: contraste visual para clusters, AA manual, sprites y animación; se usa como tradición artística, no como estándar normativo.
- Literatura clásica de animación aplicada (timing/spacing/arcs) ya conectada al Bloque 041: fundamento para separar principios temporales de la restricción de rejilla.

Criterio editorial: pixel art se trata como diseño deliberado sobre una rejilla discreta. Las reglas artísticas son heurísticas y estilos, no leyes físicas; los detalles de sampling, color-space, atlas, filtrado e importación sí se explican como contratos técnicos del pipeline. La automatización valida restricciones repetibles sin intentar reemplazar juicio visual.


## Bloque 047 — Demoscene: historia y cultura

- Assembly Archive — archivos oficiales de Assembly 1992– y página de *Second Reality*: fuente primaria del evento para party, categoría y puesto; registra a Future Crew en 1.º lugar de la PC demo compo de 1993.
- scene.org / SceneID ecosystem — archivo e infraestructura comunitaria de preservación y distribución; se usa distinguiendo binario original, metadata y recepción.
- Hornet Archive — archivo histórico de la PC demoscene 1987–1998; referencia de preservación para la etapa DOS/PC.
- Pouët y Demozoo — catálogos comunitarios para descubrir producciones, plataformas, relaciones y recepción; comentarios/votos no se tratan como fuente normativa.
- Future Crew / archivos de releases y material histórico — contraste para Unreal, Panic, Second Reality, Scream Tracker y cronología del grupo.
- Farbrausch — sitio original de `fr-08: .the .product` y material de making-of: referencia directa para generación procedural, tooling y síntesis dentro de una 64K.
- Conspiracy — archivo oficial de releases: referencia directa para producciones como *A Place Called Universe* y el enfoque 64K del grupo.
- Amiga Demoscene Archive (ADA) — catálogo especializado para producciones Amiga, incluyendo The Black Lotus; se usa como archivo comunitario especializado.

Criterio editorial: separar hechos verificables (release, plataforma, party, categoría, puesto, binario/source) de valoración comunitaria e interpretación histórica. La relación con crack intros se explica como genealogía cultural; no se enseña cracking ni evasión de protecciones. Las plataformas se comparan por sus restricciones reales y no mediante una escala anacrónica de potencia moderna.


## Bloque 048 — Efectos clásicos de demoscene

- Michael Abrash — *Graphics Programming Black Book*: rasterización software, optimización, aritmética incremental, textura y técnicas de gráficos en hardware limitado como referencia histórica/técnica.
- Foley, van Dam, Feiner, Hughes et al. — *Computer Graphics: Principles and Practice*: transformaciones, sampling, texturing, campos y fundamentos geométricos que sustentan rotozoom, proyección y terrain rendering.
- Commodore-Amiga — *Amiga Hardware Reference Manual*: referencia primaria para Copper, raster timing, registros y capacidades del hardware Amiga; se usa para separar mecanismo original de emulación moderna.
- Literatura clásica de procesamiento digital de imágenes/señales ya citada en el Bloque 033: sampling, aliasing, filtros y campos discretos como base para plasma, feedback y water effects.
- Referencias de geometría implícita / isosuperficies y gráficos volumétricos: base conceptual para metaballs, voxels y extracción/render de campos.
- Documentación y source de producciones demoscene cuando están disponibles: se usan para contrastar implementaciones concretas; una técnica descrita en una release no se generaliza como única forma de implementar el efecto.

Criterio editorial: separar el algoritmo visual del truco de hardware específico. LUTs, punto fijo, palette registers, Copper y restricciones power-of-two se explican en su contexto histórico; no se presentan como requisitos universales modernos. Del mismo modo, recrear la apariencia con shaders no implica reproducir timing, ancho de banda o modelo de ejecución del hardware original.


## Bloque 049 — Sizecoding

- 64k-scene resources / repositorios comunitarios abiertos: panorámica de toolchains modernos de 4K/64K, incluyendo Crinkler, kkrunchy, squishy y Shader Minifier.
- Farbrausch public source (`fr_public/kkrunchy`): implementación histórica de kkrunchy como referencia directa de compresión de ejecutables para intros.
- Conspiracy `apEx-public`, `rekkrunchy-with-analytics` y `kkpView-public`: toolchain/engine 64K y análisis de contribución al tamaño comprimido.
- Crinkler / Shader Minifier source: referencias directas para compressing-link y minificación de shaders en intros pequeñas.
- Shannon y fundamentos de teoría de la información ya citados en Bloque 001: base para distinguir entropía teórica, modelo y tamaño real codificado.

Criterio editorial: sizecoding se presenta como ingeniería de representación bajo restricciones. Los nombres concretos de herramientas se usan como ejemplos históricos/prácticos, no como requisitos universales; las reglas exactas de cada categoría/party deben verificarse antes de afirmar límites de bytes.


## Bloque 050 — Raymarching y Shader Art

- John C. Hart, *Sphere Tracing: A Geometric Method for the Antialiased Ray Tracing of Implicit Surfaces* (1996).
- Inigo Quilez, artículos técnicos sobre distance functions, raymarching, fractales y procedural graphics (referencia de práctica demoscene; contrastar fórmulas con sus supuestos).
- Morgan McGuire et al. y literatura de gráficos implícitos/procedurales para gradientes, sampling y análisis de coste.

Criterio: distinguir SDF exacta, distance bound y estimador; no atribuir garantías de sphere tracing a funciones que sobreestimen el espacio libre; etiquetar soft shadows/AO como heurísticas cuando corresponda.


## Bloque 051 — Música Procedural

- Curtis Roads — *The Computer Music Tutorial*: síntesis, envelopes, modulación, secuenciación y representación musical digital.
- Charles Dodge & Thomas A. Jerse — *Computer Music: Synthesis, Composition, and Performance*: osciladores, FM, filtering y composición algorítmica.
- Julius O. Smith — *Physical Audio Signal Processing* / materiales DSP de CCRMA: osciladores digitales, filtros, aliasing y fundamentos de síntesis.
- Documentación histórica de formatos tracker (MOD/XM/S3M/IT) y trackers: referencia para distinguir patterns, rows, speed/tempo y effect commands; la semántica exacta se declara por formato.
- Toolchains demoscene y tiny synths ya citados en Bloque 049: referencia de arquitectura compacta donde código DSP, song data, compresibilidad, startup y CPU/RAM se optimizan conjuntamente.

Criterio editorial: separar representación musical, señal DSP y reloj de ejecución. No asumir que una forma ideal es band-limited, que una seed conserva resultados tras cambiar el algoritmo, ni que el menor synth bruto produce el menor artefacto packed.


## Bloque 052 — Electrónica Analógica

- Texas Instruments — *Understanding Operational Amplifier Specifications* (SLOA011): common-mode input range, output swing, offset, bias, slew rate y límites del modelo ideal.
- Texas Instruments — *Handbook of Operational Amplifier Applications* y notas de aplicaciones de op-amps: realimentación, topologías lineales, filtros y comportamiento práctico.
- Texas Instruments — *Understanding Power Supply Ripple Rejection in Linear Regulators*, *LDO Noise Demystified* y documentación de dropout: referencia para separar PSRR, output noise, headroom y disipación.
- Analog Devices — materiales *MT-* y University sobre ADCs: sampling, quantization, SINAD/ENOB, referencia y cadena de adquisición.
- Tektronix — *ABCs of Probes*, notas de probe loading y *Oscilloscope Basics*: referencia primaria para bandwidth, carga de sonda, ground lead, sample rate y error de medida.
- Fundamentos de señales del Bloque 033: Nyquist, aliasing, filtros y densidad espectral se reutilizan con énfasis en su implementación física antes/después de ADC/DAC.

Criterio editorial: cada circuito se explica en tres niveles —modelo ideal, especificación del componente y comportamiento medido—. No se asume que rail-to-rail llegue exactamente a los rails, que N bits equivalgan a N bits de exactitud, que un ground físico sea equipotencial perfecto ni que una medición sea no invasiva. Las cifras dependientes de dispositivo deben verificarse en datasheet y bajo las condiciones de carga/temperatura relevantes.


## Bloque 053 — Microcontroladores

- Arm — documentación oficial Cortex-M / CMSIS: core, exceptions, vector table, NVIC, SysTick y separación entre core y periféricos del SoC/MCU.
- Microchip — documentación oficial AVR e Instruction Set Manual; datasheets de dispositivos AVR clásicos como ATmega328P: Flash/SRAM, interrupciones, timers, watchdog y periféricos.
- STMicroelectronics — documentación STM32, datasheets/reference manuals y STM32Cube materials: clock tree, GPIO alternate functions, timers, ADC/DAC, DMA y buses; los detalles concretos se declaran por familia/dispositivo.
- Arduino — documentación oficial del lenguaje/core y referencias de `analogWrite()`: `setup()`/`loop()`, API sobre C/C++ y distinción entre PWM y DAC según la placa.
- Datasheets/reference manuals de cada periférico externo para UART/SPI/I²C: baud/framing, CPOL/CPHA, addressing, pull-ups, rise time y restricciones eléctricas.

Criterio editorial: no universalizar registros, clocks, prioridades, tamaños de buffer ni capacidades de una placa concreta. La capa de software (Arduino/HAL/LL/CMSIS) no se confunde con el silicio; los buses se explican junto con su semántica eléctrica y de timing. Real-time se evalúa por deadlines, WCET, blocking y jitter, no por velocidad promedio.


## Bloque 054 — Sistemas Embebidos

- FreeRTOS Kernel Documentation — tasks, scheduling, queues, mutexes/semaphores.
- Arm CMSIS-RTOS2 — threads, message queues, mutexes, semaphores y fixed-size memory pools.
- Zephyr Project Documentation — system/device runtime power management.
- STMicroelectronics STM32 Motor Control documentation — timers, PWM shutdown y current sensing como ejemplos de motor control real.
- Alan Burns & Andy Wellings, *Real-Time Systems and Programming Languages*.
- Michael Barr & Anthony Massa, *Programming Embedded Systems*.

**Criterio:** distinguir política de scheduling de cumplimiento de deadlines; memoria dinámica de capacidad/predecibilidad; PM de CPU/sistema de PM de dispositivos; comando PWM de lazo de control; liveness de corrección; y recuperación de fallos de simple reset.


## Bloque 055 — FPGA

- AMD Vivado Design Suite / UG901 Synthesis (2026.1): referencia primaria para elaboración, inferencia y síntesis de RTL Verilog/SystemVerilog/VHDL.
- AMD Vivado Design Methodology UG949 (2026.1): timing closure, clock-domain crossings, reset y consideraciones de implementación/BRAM.
- AMD Vivado product documentation: flujo separado de design entry, synthesis, place & route y verification/simulation.
- Intel/Altera Quartus Prime documentation: compilation, timing analysis y prácticas de metastability/CDC como contraste de otro toolchain FPGA.
- AMD MicroBlaze / MicroBlaze V documentation: ejemplo primario de soft processor implementado en lógica programable.

**Criterio:** no convertir detalles de Vivado/Quartus ni de una familia FPGA en leyes universales. HDL se enseña como descripción concurrente de hardware; se distingue simulación de síntesis, netlist de implementación física, setup de hold, synchronizer de CDC multibit y soft core de hard processor. Las capacidades exactas de LUT, BRAM, DSP, PLL, I/O y clocks se verifican siempre contra el dispositivo objetivo.


## Bloque 056 — PCB

- KiCad PCB Editor / Schematic Editor documentation — net classes, DRC, differential-pair routing, stackup y outputs de fabricación.
- Texas Instruments, *High Speed Layout Guidelines* y *PCB Design Guidelines For Reduced EMI* — retorno, routing de alta velocidad y EMI.
- Analog Devices, *Printed Circuit Board Design Issues* y material de grounding/decoupling — grounding, decoupling, mixed-signal layout y parasitismos.
- Microchip, AVR040 *EMC Design Considerations* y AN2519/AVR hardware design considerations — EMC y prácticas de layout para sistemas con MCU.

**Criterio:** las reglas de PCB dependen de stackup, edge rate, corriente, proceso y componente. No se enseña una distancia/ancho universal; se distinguen reglas CAD de restricciones físicas y capacidades del fabricante. Ground/planes se explican por caminos de retorno, y controlled impedance/differential pairs por geometría distribuida, no por matching cosmético.


## Bloque 057 — Algoritmos y Estructuras de Datos

- Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein — *Introduction to Algorithms*: análisis asintótico, sorting/searching, hashing, árboles, heaps, dynamic programming, greedy y graph algorithms.
- Robert Sedgewick & Kevin Wayne — *Algorithms*: implementaciones, invariantes y trade-offs prácticos de estructuras, sorting y grafos.
- Donald E. Knuth — *The Art of Computer Programming*: análisis de algoritmos, searching/sorting y representación de datos como referencia de profundidad histórica.
- Jon Bentley — *Programming Pearls*: elección de representación y razonamiento cuantitativo como puente entre complejidad teórica y rendimiento práctico.

**Criterio:** toda complejidad declara modelo, tamaño de entrada y caso cuando sea material. Se distingue cota asintótica de tiempo medido, expected/amortized de worst-case, ADT de representación concreta y corrección de heurística. Las propiedades que dependen de orden, balance, pesos no negativos o estructura de claves se declaran explícitamente.


## Bloque 058 — Teoría de la Computación

- Michael Sipser, *Introduction to the Theory of Computation* — autómatas, computabilidad, decidibilidad, reductions y complexity theory.
- John E. Hopcroft, Rajeev Motwani, Jeffrey D. Ullman, *Introduction to Automata Theory, Languages, and Computation* — lenguajes regulares, autómatas y modelos formales.
- Sanjeev Arora, Boaz Barak, *Computational Complexity: A Modern Approach* — clases de complejidad, reductions, P/NP y NP-completeness.
- Stephen Cook, “The Complexity of Theorem-Proving Procedures” (1971) — resultado fundacional de NP-completeness.
- Richard Karp, “Reducibility Among Combinatorial Problems” (1972) — reducciones polinómicas y problemas NP-complete clásicos.
- Alan Turing, “On Computable Numbers, with an Application to the Entscheidungsproblem” (1936) — fundamento histórico del modelo de máquina y límites de decidibilidad.

Criterio editorial: se distingue siempre computabilidad de complejidad; una reducción se acompaña de dirección y tipo; NP se presenta como verificación/nondeterminismo polinómico, no como “non-polynomial”; y no se afirma P≠NP ni que NP-complete implique una cota exponencial demostrada.


## Bloque 059 — Concurrencia y Paralelismo

- ISO WG14/WG21 memory-model papers (open-std.org): happens-before, atomics y relaciones de sincronización como fundamento del modelo C/C++.
- OpenMP API Specification 6.0 y especificaciones HTML: modelo portable de shared-memory parallel programming y constructs SIMD/tasking.
- NVIDIA CUDA Programming Guide (2026): SIMT, threads, blocks, warps, divergence y jerarquía de ejecución/memoria como caso de GPU parallelism.
- Intel 64 and IA-32 Architectures Optimization Reference Manual / Intrinsics Guide: SIMD, vectorización y consideraciones de rendimiento en CPUs modernas.
- Herlihy & Shavit, *The Art of Multiprocessor Programming*: progress guarantees, linearizability, lock-free structures y reclamación de memoria.
- Maurice Herlihy, “Wait-Free Synchronization” (1991): jerarquía de progreso y fundamentos de sincronización no bloqueante.

Criterio editorial: no mezclar memory model del lenguaje con coherencia de caché ni con el ordering concreto de una ISA. `atomic` no implica lock-free, lock-free no implica wait-free y una ausencia de mutexes no demuestra ausencia de races. SIMD, SIMT/GPU y paralelismo distribuido se comparan por dependencias, locality, comunicación y métricas reales, no solo por número de workers.


## Bloque 060 — Inteligencia Artificial: Fundamentos

- Hastie, Tibshirani & Friedman — *The Elements of Statistical Learning*.
- Bishop — *Pattern Recognition and Machine Learning*.
- Goodfellow, Bengio & Courville — *Deep Learning*, capítulos introductorios de aprendizaje y optimización.
- Murphy — *Probabilistic Machine Learning: An Introduction*.

Criterio editorial: fuentes para conceptos matemáticos estables; el bloque evita atar fundamentos a una librería o API concreta. Se distinguen entrenamiento, selección y evaluación, y se trata generalización como rendimiento fuera de muestra bajo supuestos explícitos.


## Bloque 061 — Redes Neuronales desde cero

- Ian Goodfellow, Yoshua Bengio & Aaron Courville — *Deep Learning*: redes feed-forward, backpropagation, regularización y optimización.
- Michael Nielsen — *Neural Networks and Deep Learning*: derivación pedagógica de neuronas, backpropagation y aprendizaje.
- Christopher Bishop — *Pattern Recognition and Machine Learning*: modelos discriminativos, funciones de pérdida y optimización.
- Xavier Glorot & Yoshua Bengio — “Understanding the difficulty of training deep feedforward neural networks” (2010): inicialización y flujo de varianza.
- Kaiming He et al. — “Delving Deep into Rectifiers” (2015): inicialización para rectificadores.
- Sergey Ioffe & Christian Szegedy — “Batch Normalization” (2015): normalización por minibatch y parámetros aprendibles.
- Diederik Kingma & Jimmy Ba — “Adam: A Method for Stochastic Optimization” (2014): optimizador Adam.

Criterio editorial: el bloque deriva primero una red sin frameworks y después la vectoriza con NumPy. Se separan claramente diferenciación y optimización, modo training e inference, activaciones de capas afines, y propiedades de inicialización/normalización de garantías de generalización.


## Bloque 062 — Deep Learning

Fuentes primarias y textos de referencia utilizados como contraste técnico:

- Krizhevsky, Sutskever & Hinton (2012), *ImageNet Classification with Deep Convolutional Neural Networks*, NeurIPS.
- Hochreiter & Schmidhuber (1997), *Long Short-Term Memory*, Neural Computation.
- Cho et al. (2014), *Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation*, arXiv:1406.1078 (introduce la GRU en ese contexto).
- Bahdanau, Cho & Bengio (2014), *Neural Machine Translation by Jointly Learning to Align and Translate*, arXiv:1409.0473 (attention encoder-decoder).
- He et al. (2015/2016), *Deep Residual Learning for Image Recognition*, arXiv:1512.03385 / CVPR.
- Ioffe & Szegedy (2015), *Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift*, arXiv:1502.03167.

Criterio editorial: estas referencias se usan para contexto histórico y mecanismos concretos. No se convierte un resultado empírico de una arquitectura/dataset en garantía universal; se distingue siempre operación matemática, arquitectura, protocolo de entrenamiento y evidencia experimental.


## Bloque 063 — Transformers

- Vaswani et al. (2017), *Attention Is All You Need*, arXiv:1706.03762 — arquitectura Transformer original: scaled dot-product attention, multi-head attention, positional encodings, encoder/decoder, FFN, residuals, LayerNorm y masking.
- Ba, Kiros & Hinton (2016), *Layer Normalization*, arXiv:1607.06450 — definición de LayerNorm y diferencia conceptual respecto a BatchNorm.
- Kudo & Richardson (2018), *SentencePiece*, arXiv:1808.06226 — tokenización subword como ejemplo de cómo la representación discreta previa al Transformer no equivale a palabras.
- Devlin et al. (2018), *BERT*, arXiv:1810.04805 — ejemplo histórico de arquitectura basada en encoder bidireccional; se usa como contraste, no como definición de todo encoder.

Criterio editorial: el bloque parte de la arquitectura original de 2017 y separa explícitamente las variantes posteriores. RoPE, RMSNorm, grouped-query attention, FlashAttention y KV cache no se presentan como propiedades universales del Transformer; los mecanismos específicos de inferencia/LLM se reservan para el Bloque 064.


## Bloque 064 — Large Language Models

- Kaplan et al. (2020), *Scaling Laws for Neural Language Models*, arXiv:2001.08361 — evidencia empírica de relaciones de escala con parámetros, datos y compute.
- Hoffmann et al. (2022), *Training Compute-Optimal Large Language Models*, arXiv:2203.15556 — asignación compute-optimal entre tamaño del modelo y tokens bajo su régimen experimental.
- Lewis et al. (2020), *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, arXiv:2005.11401 — formulación clásica de RAG combinando memoria paramétrica y recuperación no paramétrica.
- Vaswani et al. (2017), *Attention Is All You Need* — base arquitectónica heredada del Bloque 063.

Criterio editorial: scaling laws se presentan como resultados empíricos y no garantías universales; RAG se separa de entrenamiento de pesos; decoding se separa del objective; y toda afirmación de memoria/latencia de KV cache o cuantización exige declarar shapes, formato y hardware.


## Bloque 065 — Reinforcement Learning

- Richard S. Sutton & Andrew G. Barto — *Reinforcement Learning: An Introduction*, 2nd ed.: MDP, returns, policies, value functions, Bellman, TD, control y policy-gradient foundations.
- Watkins & Dayan (1992), *Q-learning*, Machine Learning: actualización Q-learning y condiciones clásicas de convergencia en el caso tabular.
- Sutton, McAllester, Singh & Mansour (1999/2000), *Policy Gradient Methods for Reinforcement Learning with Function Approximation*: policy-gradient theorem y función aproximadora.
- Mnih et al. (2016), *Asynchronous Methods for Deep Reinforcement Learning*: actor-critic profundo asíncrono como caso de estudio, no como definición universal de actor-critic.

Criterio editorial: las garantías tabulares se presentan con sus supuestos y no se transfieren automáticamente a deep RL. Se distingue reward de return, policy de value, on-policy de off-policy, y se exige evaluación con múltiples seeds y protocolo explícito antes de generalizar rendimiento.


## Bloque 066 — Modelos Generativos

- Kingma & Welling (2013/2014), *Auto-Encoding Variational Bayes*, arXiv:1312.6114 — VAE, inferencia variacional amortizada, ELBO y reparameterization trick.
- Goodfellow et al. (2014), *Generative Adversarial Nets*, arXiv:1406.2661 — formulación adversarial generador/discriminador.
- Ho, Jain & Abbeel (2020), *Denoising Diffusion Probabilistic Models*, arXiv:2006.11239 — DDPM, proceso de ruido y conexión con denoising score matching.
- Hyvärinen (2005), *Estimation of Non-Normalized Statistical Models by Score Matching* — score matching como estimación basada en el gradiente del log de densidad.
- Rombach et al. (2021/2022), *High-Resolution Image Synthesis with Latent Diffusion Models*, arXiv:2112.10752 — diffusion en espacio latente y conditioning mediante cross-attention como caso de estudio.

Criterio editorial: el bloque separa objetivo de entrenamiento, representación y sampler. Una muestra visual o una métrica agregada no se usa como prueba universal de cobertura, generalización o ausencia de memorización; las afirmaciones de cada familia se mantienen dentro de los supuestos de su formulación.


## Bloque 067 — Ingeniería del Software

- David L. Parnas — *On the Criteria To Be Used in Decomposing Systems into Modules* — información oculta y criterios de modularización.
- David L. Parnas — *Software Aging* — evolución, mantenibilidad y coste de cambio.
- Martin Fowler — *Refactoring: Improving the Design of Existing Code* — refactoring incremental y preservación de comportamiento observable.
- Bass, Clements, Kazman — *Software Architecture in Practice* — quality attributes, escenarios y decisiones arquitectónicas.
- Michael Feathers — *Working Effectively with Legacy Code* — seams, tests y cambio seguro en sistemas existentes.
- IEEE 42010 — arquitectura como conceptos, viewpoints y concerns; usado como referencia de vocabulario, no como receta de diseño.

Criterio editorial: los patrones y nombres arquitectónicos no se presentan como soluciones universales; cada decisión debe explicitar contrato, dependencias, quality attributes, coste de cambio y evidencia de validación.

## Bloque 068 — Git

- Git Project — documentación oficial y manuales de `git`, `git-rebase`, `git-cherry-pick`, `git-reset`, `git-bisect` y revisión de referencias. Base para semántica de operaciones y estados.
- Pro Git — capítulos oficiales alojados en git-scm.com: *What is Git?*, *Git Objects*, *Git References*, *Packfiles*, branching/merging, rebasing, remotes y tagging.
- Git Project — `gitformat-index`: formato y papel del index/staging area.
- Git Project — `gitformat-pack`: representación de packfiles e índices, incluida la distinción entre representación packed y object IDs.
- Git Project — `hash-function-transition`: soporte/formato SHA-256 y transición desde repositorios SHA-1.
- Criterio editorial: Git se explica desde snapshots, objetos content-addressed, refs, index y reachability; los comandos porcelain se presentan como transformaciones de ese modelo y no como recetas dependientes de GitHub/GitLab.


## Bloque 069 — Testing

- Google Testing Blog — *Test Sizes*, *How Much Testing is Enough?* y *SMURF: Beyond the Test Pyramid*: referencia para distinguir alcance/tamaño, coste de feedback y tratar la pirámide como heurística, no ley universal.
- Hypothesis — documentación oficial: property-based testing, estrategias, shrinking/reproducción y stateful testing como referencias operativas para generación de casos y contraejemplos.
- LLVM — documentación oficial de libFuzzer: fuzzing in-process, coverage-guided y corpus/mutación.
- Clang/LLVM — AddressSanitizer y Clang Static Analyzer: referencias primarias para distinguir instrumentación dinámica de análisis estático y sus clases de errores observables.
- Martin Fowler / xUnit lineage se usa solo como vocabulario histórico complementario para test doubles; el bloque prioriza el papel semántico del sustituto y no una taxonomía rígida de framework.

Criterio editorial: toda técnica se presenta como evidencia condicionada por alcance, entorno y oráculo. Coverage no se equipara a correctitud; fuzzing no se reduce a aleatoriedad; property-based testing no se llama prueba formal; mocks no sustituyen automáticamente integration tests; una pipeline CI no implica por sí sola continuous delivery.


## Bloque 070 — Sistemas Distribuidos

- Lamport — *Time, Clocks, and the Ordering of Events in a Distributed System* (1978): happens-before y relojes lógicos; base para no inferir causalidad inversa desde timestamps.
- Gilbert & Lynch — *Brewer’s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services* (2002): formulación/proof formal de CAP bajo particiones.
- Ongaro & Ousterhout — *In Search of an Understandable Consensus Algorithm (Raft)*: elección de líder, términos, replicación de log y safety.
- Apache Kafka — documentación oficial de design/semantics: particiones, replicación, orden por partición y semánticas at-most-once/at-least-once/exactly-once delimitadas por el sistema.

Criterio editorial: CAP no se resume como “elige dos de tres”; timestamps de Lamport no prueban causalidad en la dirección inversa; timeouts son sospechas y no detectores perfectos; exactly-once se trata como garantía acotada que exige coordinar los efectos observables.


## Bloque 071 — Bases de Datos

- PostgreSQL — documentación oficial, *Concurrency Control / MVCC* y *Transaction Isolation*: snapshots, visibilidad, niveles de aislamiento y comportamiento concurrente.
- PostgreSQL — documentación oficial del planner/optimizer y estadísticas: estimaciones de cardinalidad y elección de planes.
- PostgreSQL — documentación oficial de WAL y recuperación: write-ahead logging, checkpoints y persistencia.
- SQLite — documentación oficial del formato de base de datos, B-trees, rollback journal y WAL: contraste de implementación embebida.
- Redis — documentación oficial de persistencia y modelo key-value: contraste de acceso por clave y mecanismos de durabilidad.
- MongoDB — documentación oficial de transacciones y replicación: ejemplo de que “NoSQL” no implica ausencia de transacciones ni un único contrato de consistencia.

Criterio editorial: SQL se separa del plan físico; un índice no garantiza que el planner lo use; MVCC no equivale a ausencia de locks; ACID se explica por propiedad y alcance; WAL se trata como protocolo de recuperación; NoSQL se presenta como una familia de modelos heterogéneos.


## Bloque 072 — Virtualización y Contenedores

- Linux Kernel Documentation — KVM / virtualization: API y soporte de virtualización, incluidos mecanismos específicos de x86 y límites conocidos.
- Linux Kernel Documentation — Control Group v2: jerarquía, controladores, distribución y límites de recursos.
- Docker Docs — *What is Docker?*, *What is a container?* y Engine security: arquitectura general y relación con namespaces/cgroups del kernel.
- Docker Docs — Storage / OverlayFS / containerd image store: capas de imagen, writable layer, copy-on-write y evolución de backends de almacenamiento.

Criterio editorial: contenedores y VMs se distinguen por la frontera virtualizada; namespaces y cgroups se explican como mecanismos diferentes; y detalles de Docker que dependen de versión/configuración no se presentan como propiedades universales.


## Bloque 073 — Cloud y Sistemas a Gran Escala

- Kubernetes Documentation — *Kubernetes Components*: control plane, worker nodes y componentes esenciales del cluster.
- Kubernetes Documentation — *Horizontal Pod Autoscaling* y *Node Autoscaling*: escalado de workloads frente a aprovisionamiento/consolidación de nodos.
- Kubernetes Documentation — *Observability* y *Logging Architecture*: métricas/logs/traces y necesidad de lifecycle de logging independiente de Pods/nodes.
- AWS Well-Architected Reliability Pillar — failure isolation y despliegue en múltiples ubicaciones/AZs como estrategia condicionada por requisitos de disponibilidad.
- AWS Elastic Load Balancing documentation — distribución de tráfico, health checks y routing hacia targets saludables.

Criterio editorial: se evita presentar servicios concretos de proveedor como definiciones universales. Kubernetes se enseña conceptualmente; autoscaling se trata como sistema de control; alta disponibilidad exige declarar failure domains; y observabilidad se vincula a preguntas/SLOs, no a volumen de telemetría.


## Bloque 074 — Performance Engineering

- Linux Kernel / perf documentation — perf events, PMU, `perf stat`, sampling/tracing y contadores de hardware/software como base de profiling medido.
- Intel® 64 and IA-32 Architectures Optimization Reference Manual — caches, branch prediction, memory hierarchy, SIMD y recomendaciones de optimización dependientes de microarquitectura.
- AMD uProf documentation — IPC/CPI, branch misprediction y métricas de rendimiento por arquitectura como ejemplo de interpretación contextual de contadores.
- Gene M. Amdahl (1967), *Validity of the Single Processor Approach to Achieving Large Scale Computing Capabilities* — límite de speedup por fracción serial.
- Williams, Waterman & Patterson (2009), *Roofline: An Insightful Visual Performance Model for Multicore Architectures* — relación entre intensidad aritmética, bandwidth y compute ceilings.

Criterio editorial: ninguna optimización se presenta como universal. Se exige baseline, workload estable, distribución de resultados y mecanismo causal plausible; los contadores hardware se normalizan e interpretan según plataforma.


## Bloque 075 — Laboratorio de Sistemas Reales

- Git Project / Pro Git — *Git Internals: Git Objects* y *Packfiles*: objetos content-addressed, trees/commits/refs y representación empaquetada.
- Linux Kernel Documentation — `/proc`, memoria y subsistemas del kernel: interfaces de estado del kernel y rutas de memoria/E/S.
- id Software — repositorio oficial abierto de DOOM y `README.TXT`: source release, separación respecto a datos WAD y comentario del propio Carmack sobre el BSP de rendering.
- Godot Engine Documentation — *Godot architecture overview*, `SceneTree`, `RenderingServer`, `PhysicsServer` y *Using Servers*: separación entre scene layer y servers internos.
- Blender Documentation — Python API (`bmesh`, `gpu`) y manual de Cycles GPU rendering: geometría editable/evaluada, automatización y backends de render.
- NVM Express — material técnico de arquitectura SSD: controller, NAND, FTL, garbage collection, wear leveling y power-loss protection.
- NVIDIA CUDA/CUTLASS documentation — SIMT, jerarquía de ejecución/memoria y tiling como referencia para relacionar compute con movimiento de datos.
- RFC Editor / estándares IETF — arquitectura por capas de Internet y protocolos; se reutilizan además los bloques 016–021/022 para Ethernet, IP, BGP, DNS, TCP/QUIC, TLS y HTTP.
- Para consolas se usa deliberadamente una descripción arquitectónica independiente de proveedor: hardware fijo, OS, APIs, memoria y budgets; los detalles propietarios no se presentan como hechos universales.
- Para LLMs se reutilizan las fuentes primarias ya registradas en los Bloques 063–064 y se enfocan en el recorrido vertical tokens→transformer→kernels GPU→sistema distribuido.

Criterio editorial: este bloque no memoriza marcas ni versiones como objetivo. Cada sistema se estudia mediante una pregunta falsable, trazado entre capas y evidencia reproducible; cuando un detalle depende de versión, plataforma o configuración, se marca como tal.


## Bloque 076 — Historia de la Computación

- Computer History Museum — Babbage Engine y colecciones/timelines: Difference Engine, Analytical Engine, Ada Lovelace, evolución de máquinas y componentes.
- Claude E. Shannon — *A Symbolic Analysis of Relay and Switching Circuits* (1937) y *A Mathematical Theory of Communication* (1948): puente entre lógica de conmutación e información, tratados como contribuciones distintas.
- Alan M. Turing — *On Computable Numbers, with an Application to the Entscheidungsproblem* (1936): computabilidad y máquina universal como modelo matemático.
- Internet Society — *A Brief History of the Internet* y documentación histórica de la transición de ARPANET a TCP/IP: arquitectura abierta e hito del 1 de enero de 1983.
- Bell Labs / historia institucional y Computer History Museum — transistor de 1947 y transición de válvulas a semiconductores.
- Documentación y archivos históricos de Unix/BSD/POSIX y literatura técnica del Computer History Museum para mainframes, minicomputers, microcomputers y PC.

Criterio editorial: se evita la teleología y la frase “X inventó el ordenador” sin criterio. Cada hito se explica como combinación de problema, mecanismo, contexto e impacto; cuando una prioridad histórica depende de definiciones (primer computador, primer microprocesador, primer smartphone), se explicita esa dependencia.


## Bloque 077 — Filosofía y Metodología de Ingeniería

- NASA — *NASA Systems Engineering Handbook*: formulación del problema, requisitos, trade studies, verificación y validación dentro del ciclo de ingeniería de sistemas.
- NIST — guías de medición, reproducibilidad y evaluación técnica: trazabilidad de condiciones, incertidumbre y evidencia repetible.
- IETF RFC 2119 / RFC 8174 — interpretación de MUST, SHOULD, MAY y otras palabras normativas al leer especificaciones que adoptan estas convenciones.
- ACM Artifact Review and Badging — criterios de disponibilidad, funcionalidad y reproducibilidad de artefactos de investigación computacional.
- Karl Popper, *The Logic of Scientific Discovery* — falsabilidad como criterio metodológico para distinguir predicciones arriesgadas de explicaciones inmunes a evidencia contraria; se usa aquí como herramienta práctica, no como teoría total de ingeniería.

Criterio editorial: el bloque separa observación, hipótesis, modelo y decisión; exige declarar alcance y supuestos; y trata estándares, papers, benchmarks y código fuente como evidencias con dominios de validez, no como autoridades universales fuera de contexto.
