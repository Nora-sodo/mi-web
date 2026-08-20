# Auditoría acumulativa de contenido y código

## Regla del proyecto

Antes de desarrollar cada nueva parte se revisa todo el material previo. La revisión incluye:

- exactitud conceptual y matemática;
- unidades, signos, fórmulas y ejemplos numéricos;
- terminología técnica;
- preguntas, respuestas, alternativas y pistas;
- cobertura de los cuatro niveles de práctica;
- rutas, IDs, navegación y persistencia;
- claridad de código, comentarios y separación de responsabilidades.

## Auditoría de la Parte 4

### Correcciones heredadas

1. Se mantiene la corrección de `log2(N)` frente a `ceil(log2(N))`: información ideal y longitud fija no son exactamente la misma magnitud cuando N no es potencia de dos.
2. Se mantiene la formulación cuidadosa del principio de Landauer: límite termodinámico de borrado lógicamente irreversible, no coste real fijo de cualquier operación.
3. Se corrigió un bug de evaluación: el reto de Landauer aceptaba accidentalmente `2` como alternativa a `ln 2`.
4. La recomendación de Inicio ya no queda fijada al Bloque 001. Ahora recorre todos los bloques desarrollados y respeta la última lección pendiente.
5. El validador descubre automáticamente `content/block-XXX.js`, evitando olvidar registrar un bloque nuevo.

### Validación nueva

El validador comprueba además:

- duración positiva;
- explicación profunda suficiente;
- cuatro niveles de práctica;
- retos de nivel 4 no huérfanos;
- respuestas alternativas vacías o duplicadas;
- horas y resultados de aprendizaje por curso.

## Criterio editorial del Bloque 003

Se evita presentar aproximaciones como leyes universales. Ejemplos:

- `V=IR` se atribuye al modelo resistivo lineal;
- la caída de un diodo no se trata como constante exacta;
- `V_GS(th)` no se confunde con conducción completa de un MOSFET;
- KVL se contextualiza dentro del modelo de circuito concentrado y la ley de Faraday;
- `P_dyn ≈ αCV²f`, `t_r ≈ 2.2RC` y `ΔT ≈ Pθ` se presentan explícitamente como modelos de primer orden.

## Auditoría acumulativa — Parte 5

Antes de añadir el Bloque 004 se volvió a validar el catálogo y las 28 lecciones existentes.

Correcciones y controles aplicados:

- Revisión de expresiones absolutas ("siempre", "exactamente", "garantiza") en los Bloques 001–003 para comprobar que solo aparezcan cuando el modelo lo justifica o dentro de advertencias explícitas.
- Se conserva la corrección de la Parte 3 sobre `log₂(N)` frente a `⌈log₂(N)⌉` para códigos de longitud fija.
- Se conserva la formulación cuidadosa de Landauer como límite termodinámico y no como coste energético literal de cada operación de CPU.
- Se conservan las cautelas del Bloque 003: KVL bajo el modelo de circuito apropiado, caída de diodo no constante y `V_GS(th)` no equivalente a conducción completa.
- El Bloque 004 distingue de forma explícita latch/flip-flop, carry/overflow, setup/hold, SRAM/DRAM y probabilidad de metastabilidad.
- Se amplió el tutor contextual para cubrir lógica digital y temporización.
- El validador sigue exigiendo cuatro niveles de práctica, una única opción correcta en comprobaciones rápidas, rutas sin IDs rotos y retos de nivel 4 no huérfanos.

Resultado esperado tras esta parte: 78 bloques en catálogo, 4 desarrollados y 40 lecciones validadas.

## Auditoría acumulativa — Parte 6

Antes de desarrollar el Bloque 005 se revalidaron las 40 lecciones de los Bloques 001–004.

Resultado de la revisión:

- No se detectaron nuevas correcciones conceptuales necesarias en el contenido previo.
- Se mantiene la distinción entre información ideal `log₂(N)` y longitud fija `⌈log₂(N)⌉`.
- Se mantiene la formulación de Landauer como límite termodinámico, no coste fijo por operación.
- Se mantienen las cautelas sobre IEEE 754, Unicode, KVL, diodos, MOSFET, setup/hold y metastabilidad.
- En el nuevo Bloque 005 se fuerza explícitamente la separación ISA/microarquitectura/organización para impedir que explicaciones posteriores mezclen niveles.
- Se evita presentar RISC/CISC como predictor directo de rendimiento o complejidad microarquitectónica.
- Se diferencia dirección efectiva, virtual y física antes de introducir memoria virtual en el Bloque 008.
- Se diferencia ISA de ABI en llamadas, pila y convenciones de registros.

Resultado esperado tras la Parte 6: 78 bloques en catálogo, 5 desarrollados y 51 lecciones validadas.

## Auditoría acumulativa — Parte 7

Antes de desarrollar el Bloque 006 se revalidaron las 51 lecciones de los Bloques 001–005.

Resultado de la revisión:

- No se detectaron nuevas correcciones conceptuales necesarias en los Bloques 001–005.
- Se detectó una discrepancia entre la normalización de respuestas de `app.js` y la del validador: la interfaz eliminaba diacríticos y el validador no. Se unificó el criterio y se eliminaron 53 alternativas redundantes que ya eran equivalentes para la interfaz.
- El nuevo Bloque 006 separa expresamente ISA, sintaxis de ensamblador y ABI.
- Se evita asumir una única calling convention para x86-64: System V AMD64 y Windows x64 son contratos distintos.
- Se evita afirmar que la dirección de retorno vive siempre en la pila: AArch64 y RISC-V utilizan registros link en patrones de llamada habituales.
- Se diferencia llamada de biblioteca, wrapper y syscall; el mecanismo de entrada privilegiada y la ABI de syscall dependen de arquitectura y sistema operativo.
- Se evita afirmar que RISC-V usa siempre instrucciones de 32 bits: la extensión C estandariza codificaciones comprimidas de 16 bits.
- Se deja explícito que un desensamblador no reconstruye necesariamente el fuente original y que código optimizado puede perder la correspondencia línea-a-línea.

Resultado esperado tras la Parte 7: 78 bloques en catálogo, 6 desarrollados y 61 lecciones validadas.


## Auditoría acumulativa — Parte 8

- Revisados de nuevo los Bloques 001–006 (61 lecciones): sin nuevas correcciones conceptuales necesarias.
- Validada la distinción arquitectura/microarquitectura en el nuevo Bloque 007.
- Se evita tratar el pipeline de cinco etapas como descripción física universal.
- Se distingue ejecución, finalización y retiro; ROB se presenta como técnica común, no requisito ISA.
- Register renaming elimina dependencias falsas WAR/WAW, no RAW verdaderas.
- IPC/CPI solo se presentan como inversos cuando usan la misma población y ventana de medida.
- Se documenta que frecuencia, IPC y ancho superscalar aislados no son métricas universales de rendimiento.
- El tutor se amplió con respuestas específicas de pipeline, OoO, predicción, μops, rendimiento y Amdahl.

## Auditoría Parte 9

- Revisión acumulativa de los 71 temas anteriores: sin nuevas correcciones conceptuales obligatorias.
- Bloque 008 revisado con separación explícita entre caché, traducción virtual y almacenamiento.
- Se evita equiparar coherencia con consistencia, TLB miss con page fault y NVMe con NAND/M.2.

## Auditoría acumulativa — Parte 10

Antes de desarrollar el Bloque 009 se revalidaron las 82 lecciones de los Bloques 001–008.

Resultado de la revisión:

- La validación estructural y sintáctica previa pasó sin errores.
- La revisión semántica de afirmaciones absolutas no encontró nuevas correcciones obligatorias en los bloques anteriores.
- El Bloque 009 separa garantías del lenguaje C de decisiones de ABI, compilador, sistema operativo y hardware.
- Se evita enseñar `array == pointer`: se explica el decay y los contextos donde no ocurre.
- Se documenta la regla one-past-the-end y se prohíbe su dereferenciación.
- `volatile` se presenta como qualifier de acceso observable, no como mecanismo de atomicidad o sincronización de threads.
- Se separan undefined, unspecified e implementation-defined behavior.
- Se evita presentar signed overflow como wraparound portable; se diferencia de la aritmética unsigned modular.
- Se explican aliasing/effective type y el uso de character types/`memcpy` para trabajar con representaciones.
- `realloc` se enseña con patrón temporal para conservar ownership ante fallo y sin reutilizar el puntero antiguo tras éxito.
- `calloc` se describe como inicialización de todos los bits del almacenamiento a cero, sin generalizarlo indebidamente a toda representación abstracta de puntero o floating point.
- El proyecto de allocator usa una arena controlada, alignment, overflow checks, free lists, split/coalescing e invariantes; no intenta reemplazar libc.
- El tutor contextual se amplió con reglas específicas de C profundo.

Resultado tras la Parte 10: 78 bloques en catálogo, 9 desarrollados y 94 lecciones validadas.


## Parte 11 — Auditoría acumulativa + Bloque 010

- Auditoría previa de las 94 lecciones: validación estructural y sintaxis limpias.
- Revisión semántica: sin nuevas correcciones obligatorias en Bloques 001–009.
- Bloque 010 revisado con separación estricta entre frontend, IR, ISA/ABI, object format, linker, loader y runtime.
- Se evita afirmar correspondencia 1:1 entre IR y instrucciones físicas, o entre secciones de archivo y mappings de memoria.
- Se validan 107 lecciones y cuatro niveles de práctica por lección.

## Parte 12 — Auditoría acumulativa + Bloque 011

Antes de desarrollar el Bloque 011 se revalidaron las 107 lecciones de los Bloques 001–010.

Resultado de la revisión:

- La validación estructural y sintáctica previa pasó sin errores.
- La revisión semántica acumulativa no detectó nuevas correcciones obligatorias en los bloques anteriores.
- El Bloque 011 separa explícitamente debugger, tracing de syscalls, tracing de bibliotecas, instrumentación dinámica, sanitizers y profiling.
- Se evita presentar un backtrace como una lista física guardada por hardware: el unwinding depende de registros, memoria, ABI y/o metadatos.
- Se diferencia breakpoint de watchpoint y se documentan los límites de recursos hardware.
- Se evita equiparar core dump con replay completo de ejecución; se exige casar build, mappings y símbolos.
- Se diferencia `strace` (frontera proceso-kernel) de `ltrace` (llamadas de bibliotecas dinámicas).
- ASan/UBSan/TSan se presentan como detectores dinámicos con coberturas y modelos distintos, no como pruebas formales de ausencia de errores.
- `perf` se enseña con metodología de profiling y normalización, no como colección de contadores aislados.
- DWARF se presenta como formato de información de depuración capaz de describir líneas, tipos, ubicaciones y unwind info sin requerir desactivar optimización.
- El tutor contextual se amplió con respuestas específicas del Bloque 011.

Resultado esperado tras la Parte 12: 78 bloques en catálogo, 11 desarrollados y 118 lecciones validadas.


## Parte 13 — Auditoría acumulativa + Bloque 012

Antes de desarrollar el Bloque 012 se revalidaron las 118 lecciones de los Bloques 001–011. La validación estructural y sintáctica pasó sin incidencias y la revisión semántica no exigió nuevas correcciones acumulativas.

Criterios reforzados en esta parte:

- Separar mecanismo, política y contrato del sistema operativo.
- No universalizar rings de x86 a otras ISA.
- Distinguir proceso, thread, programa y context switch.
- Distinguir API, ABI, wrapper de biblioteca y syscall ABI.
- No presentar pipes/TCP como transporte de mensajes con framing implícito.
- No presentar `volatile` como sincronización entre threads.
- Distinguir race condition, data race, deadlock, livelock y starvation.
- El tutor contextual se amplió con respuestas específicas del Bloque 012.

Resultado tras la Parte 13: 78 bloques en catálogo, 12 desarrollados y 130 lecciones validadas.


## Auditoría acumulativa — Parte 14

- Revalidadas las 130 lecciones previas antes de ampliar.
- Sin nuevas correcciones conceptuales obligatorias detectadas en Bloques 001–012.
- Nueva regla editorial: separar pathname/dentry/inode/file descriptor/open file description/mount/VFS/layout on-disk y durabilidad.
- Bloque 013 validado con pruebas de niveles 1–4 y tutor contextual.


## Parte 15 — Auditoría acumulativa + Bloque 014

- Revalidadas las 142 lecciones previas antes de ampliar: estructura, rutas y sintaxis limpias.
- La revisión semántica acumulativa no detectó nuevas correcciones obligatorias en Bloques 001–013.
- Nueva regla editorial: separar bus, dispositivo, modelo de programación, subsistema del SO y driver.
- MMIO se distingue de RAM ordinaria y de port-mapped I/O; las APIs/barriers de I/O no se sustituyen por `volatile`.
- IRQ se trata como identificación/ruta lógica; MSI/MSI-X evita identificarla universalmente con un pin físico.
- DMA usa direcciones y mappings del dispositivo; IOMMU se presenta como traducción/aislamiento, no como cache.
- PCIe se explica como fabric packetizada punto a punto que conserva partes del programming model PCI.
- USB interrupt transfer se distingue de una IRQ CPU; HID se basa en descriptors/reports y drivers de clase.
- Drivers de storage/red/gráficos se explican mediante colas, DMA, ownership, completados y sincronización.

Resultado tras la Parte 15: 78 bloques en catálogo, 14 desarrollados y 153 lecciones validadas.


## Parte 16 — Auditoría acumulativa + Bloque 015

- Revalidadas las 153 lecciones previas antes de ampliar: catálogo, rutas, prácticas y sintaxis limpias.
- La revisión semántica acumulativa no detectó nuevas correcciones obligatorias en Bloques 001–014.
- Nueva regla editorial: separar interfaz de observación, aislamiento, control de recursos, política de seguridad y extensibilidad del kernel.
- `/proc` se presenta como pseudo-filesystem dinámico y no como snapshot global atómico; `/proc/sys` se separa de la simple observación.
- `/sys`/sysfs se distingue de `/dev`: kobjects/atributos frente a device nodes y namespace VFS.
- Namespaces aíslan vistas; cgroups contabilizan/controlan recursos; un container es composición y no una syscall o namespace único.
- En cgroup v2, weights, quotas y límites de memoria se explican con semánticas diferentes; `cpu.weight` no se presenta como porcentaje duro.
- En systemd, requirements y ordering son ejes diferentes (`Requires/Wants` frente a `Before/After`).
- Capabilities se contextualizan por sets y user namespace; LSM/SELinux/AppArmor se separan de DAC.
- Módulos se tratan como código privilegiado con lifecycle y compatibilidad del kernel; no como plugins aislados.
- eBPF distingue verifier safety de correctness funcional, maps de program state y attach points/program types.

Resultado tras la Parte 16: 78 bloques en catálogo, 15 desarrollados y 166 lecciones validadas.


## Parte 17 — Auditoría acumulativa + Bloque 016

- Se revalidaron los 15 bloques y 166 lecciones previas antes de ampliar; no aparecieron nuevas correcciones conceptuales obligatorias.
- Se añadió Bloque 016 con 12 lecciones y cuatro niveles de práctica.
- Regla nueva: distinguir señal/símbolo/bit, bandwidth/bitrate/throughput y propagación/serialización.
- Shannon-Hartley se presenta como límite de un modelo AWGN con SNR lineal; no como throughput garantizado.
- Se evita confundir PHY rate de Wi‑Fi con goodput, Ethernet MAC con un PHY concreto y dB con dBm.
- Se añadió validación final de scripts, rutas, retos y carga de block-016.js.


## Parte 18 — Auditoría acumulativa + Bloque 017

- Revalidadas las 178 lecciones previas antes de ampliar; estructura, rutas, prácticas y sintaxis limpias.
- La revisión semántica acumulativa no detectó nuevas correcciones obligatorias en Bloques 001–016.
- Nueva regla editorial: separar frame, dirección MAC, FDB, dominio de broadcast, VLAN, ARP, STP y MTU.
- Unknown unicast flooding se distingue de broadcast; FDB (MAC→puerto) se distingue de ARP/neighbor cache (IPv4→MAC).
- VLAN/802.1Q se separa de subnetting/routing; STP se presenta como control de topología de bridging, no como mecanismo físico de enlace.
- MTU se distingue de tamaño total de frame y Path MTU; 1500 se contextualiza para IP sobre Ethernet clásico.

Resultado tras la Parte 18: 78 bloques en catálogo, 17 desarrollados y 188 lecciones validadas.


## Parte 19 — Auditoría acumulativa + Bloque 018

- Revalidadas las 188 lecciones previas antes de ampliar; estructura, rutas, prácticas y sintaxis limpias.
- La revisión semántica acumulativa no detectó nuevas correcciones conceptuales obligatorias en Bloques 001–017.
- Se corrigió una omisión documental previa: README no enumeraba el Bloque 017 en “Contenido desarrollado”, aunque el total de 188 sí era correcto.
- Nueva regla editorial: separar direccionamiento/prefijo, selección de ruta, forwarding, resolución del siguiente salto, control ICMP y configuración DHCP.
- CIDR y longest-prefix match se presentan como base del forwarding moderno; las clases A/B/C quedan solo como historia, no como algoritmo de subnetting.
- IPv4 e IPv6 se comparan sin tratarlos como formatos equivalentes: IPv6 usa Hop Limit, no broadcast y los routers no fragmentan en tránsito.
- ICMP se separa de “ping”; PMTU/fragmentación se conectan con feedback ICMP y con las MTU del bloque anterior.
- NAT/NAPT se presenta como traducción stateful, no como firewall o cifrado; DHCP configura parámetros y no participa en el forwarding de datos.
- Neighbor Discovery se presenta como ICMPv6 y más amplio que “ARP para IPv6”; routing table y neighbor cache se mantienen separadas.

Resultado tras la Parte 19: 78 bloques en catálogo, 18 desarrollados y 200 lecciones validadas.


## Parte 20 — Auditoría acumulativa + Bloque 019

- Revalidadas las 200 lecciones previas antes de ampliar: catálogo, rutas, niveles de práctica y sintaxis limpias.
- La revisión semántica acumulativa no detectó nuevas correcciones conceptuales obligatorias en Bloques 001–018.
- Nueva regla editorial: separar topología física, política interdominio, control plane BGP, forwarding y selección de servicio.
- BGP se presenta como protocolo inter-AS de reachability/policy, no como shortest-path global ni como mapa físico de routers.
- Peering/transit y roles customer/provider/peer se tratan como relaciones administrativas que se traducen en política de exportación; el modelo valley-free no se presenta como ley del protocolo.
- IXP y route server se separan del datapath: conexión física al IXP no implica peering/transit con todos, y un route server puede operar solo en control plane.
- RPKI/ROV se limita correctamente a autorización de origen/prefijo/longitud; no se presenta como validación completa de AS_PATH ni como cifrado.
- Anycast se define por routing hacia múltiples anuncios de la misma reachability, sin prometer proximidad geográfica/RTT. CDN, request routing, caché y load balancing se mantienen como capas distintas.
- ECMP se explica habitualmente con hashing por flujo y sin garantía de reparto exacto de bytes; backbone/data center se razonan con failure domains reales.
- Se corrigió el enrutado semántico del tutor: una consulta genérica sobre anycast ya no cae en la respuesta de IPv6 salvo que la propia pregunta mencione IPv6; las consultas BGP+RPKI/route-leak priorizan la respuesta de seguridad específica.

Resultado tras la Parte 20: 78 bloques en catálogo, 19 desarrollados y 212 lecciones validadas.


## Parte 21 — Auditoría acumulativa + Bloque 020

- Se ejecutó el validador sobre las 212 lecciones previas antes de añadir contenido nuevo; catálogo, rutas, retos y sintaxis pasaron limpios.
- Revisión semántica acumulativa sin nuevas correcciones conceptuales obligatorias en los Bloques 001–019.
- Se contrastó TCP con RFC 9293 (STD 7), que consolida y sustituye RFC 793 como especificación base vigente.
- Se separaron explícitamente puerto/socket/conexión, stream/segmento/mensaje, ACK de transporte/confirmación de aplicación, rwnd/cwnd y flow/congestion control.
- QUIC se contrastó con RFC 9000, RFC 9001 y RFC 9002: UDP es el sustrato, mientras QUIC aporta streams, seguridad, loss recovery y congestion control.
- Se evitó fijar Initial Window, fast recovery o un algoritmo concreto de congestión como propiedades universales inmutables de TCP.

Resultado tras la Parte 21: 78 bloques en catálogo, 20 desarrollados y 224 lecciones validadas.


## Parte 22 — Auditoría acumulativa + Bloque 021

- Revalidadas las 224 lecciones previas antes de ampliar; catálogo, rutas, prácticas y sintaxis limpias.
- Revisión semántica acumulativa sin nuevas correcciones conceptuales obligatorias en Bloques 001–020.
- Nueva regla editorial: separar semántica de aplicación, framing, transporte, estado e intermediación.
- DNS se trata como namespace distribuido con delegaciones, RRsets y caché; se separa de su transporte UDP/TCP/DoT/DoQ.
- HTTP Semantics se mantiene común entre HTTP/1.1, HTTP/2 y HTTP/3; se separan framing textual, frames/streams y mappings sobre TCP/QUIC.
- Caché HTTP distingue freshness, validation y storage; cookies se separan de sesiones y de autenticación/autorización.
- Forward/reverse proxy se modelan por la frontera de confianza; headers de forwarding no se aceptan como identidad sin una cadena de proxies saneada.
- Correo separa SMTP envelope de message headers y SMTP de IMAP; SFTP se distingue de FTPS; WebSocket masking no se presenta como cifrado.
- El proyecto integrador exige parsers bounded, tests con fragmentación arbitraria y validación de capturas truncadas/malformadas.

Resultado tras la Parte 22: 78 bloques en catálogo, 21 desarrollados y 237 lecciones validadas.


## Parte 23 — Auditoría acumulativa + Bloque 022

- Revalidadas las 237 lecciones previas antes de ampliar; catálogo, rutas, retos y sintaxis limpios.
- Revisión semántica acumulativa sin nuevas correcciones conceptuales obligatorias en Bloques 001–021.
- Nueva regla editorial: separar propiedad de seguridad, primitiva, protocolo, key management y lifecycle.
- Hash/MAC/firma se tratan como contratos diferentes; AES se separa de sus modos y GCM exige política de nonce.
- DH/ECDH se presenta como key agreement sin autenticación inherente; firmas se separan del mito “cifrar con la privada”.
- PKI valida rutas + identidad + restricciones; TLS 1.3 se explica mediante transcript, HKDF, traffic secrets y forward secrecy.
- Password hashing se separa de hashes rápidos y KDF generales; salt se presenta como público/único y Argon2 como memory-hard.
- Se documenta que FIPS 197 recibió una actualización editorial en 2023 sin cambios técnicos a AES y que SP 800-38D está en revisión por NIST en 2026.

Resultado tras la Parte 23: 78 bloques en catálogo, 22 desarrollados y 251 lecciones validadas.


## Parte 24 — Auditoría acumulativa + Bloque 023

- Se revalidaron las 251 lecciones previas antes de añadir contenido nuevo: estructura, rutas, niveles 1–4 y sintaxis pasan limpias.
- Se revisaron afirmaciones absolutas y fronteras semánticas de los Bloques 001–022; no se detectaron nuevas correcciones conceptuales obligatorias.
- El bloque 023 separa threat modeling, authentication, authorization, access control, privilege e isolation en vez de tratarlos como sinónimos.
- SUID se presenta como transición de credenciales en exec y no como sinónimo de root; se documentan las condiciones de Linux que pueden impedir la elevación.
- Capabilities se explican mediante sus sets y user namespaces; no_new_privs se limita a su garantía real sobre futuras ganancias por exec y no se presenta como revocación universal.
- Seccomp, Landlock, namespaces y containers se tratan como mecanismos complementarios con superficies y garantías diferentes.
- Se incorpora privilege separation y se modela el IPC como una nueva trust boundary que requiere validación propia.
- El tutor se reordenó para que preguntas de seguridad sobre containers/capabilities no sean absorbidas por respuestas Linux genéricas.

Resultado tras la Parte 24: 78 bloques en catálogo, 23 desarrollados y 263 lecciones validadas.


## Parte 25 — Auditoría acumulativa + Bloque 024

- Revalidadas las 263 lecciones previas antes de ampliar; catálogo, rutas, niveles 1–4 y sintaxis limpios.
- Revisión semántica acumulativa sin nuevas correcciones conceptuales obligatorias en Bloques 001–023.
- Nueva regla editorial: separar política del navegador, autenticación/sesión, autorización del servidor, parsing y ejecución; una mitigación se describe por la frontera que protege.
- Same-Origin Policy, same-site y CORS se tratan como mecanismos distintos; CORS nunca sustituye object-level authorization.
- SQLi/command injection se enseñan mediante separación código/datos y reducción de parsers; XSS usa encoding/sinks contextuales y CSRF se conecta con credenciales ambientales.
- SSRF, path traversal/uploads, XXE/deserialización y races se abordan desde allowlists/capability reduction/invariantes, con ejemplos no operativos y defensivos.
- JWT se actualiza según RFC 8725 y OAuth según RFC 9700 (BCP vigente desde 2025), incluyendo PKCE, redirect URIs estrictas y validación issuer/audience/scope.
- La práctica ofensiva queda limitada explícitamente a entornos propios/CTFs/labs autorizados y se cierra con mitigación y regression tests.

Resultado tras la Parte 25: 78 bloques en catálogo, 24 desarrollados y 278 lecciones validadas.


## Parte 26 — Auditoría acumulativa + Bloque 025

- Se revalidaron los 24 bloques y 278 lecciones previas antes de ampliar; catálogo, rutas, estructura pedagógica y sintaxis pasaron sin errores.
- Revisión semántica acumulativa: no se detectaron nuevas correcciones conceptuales obligatorias en Bloques 001–024.
- Se incorporan 14 lecciones de explotación binaria con enfoque defensivo: primitives, mitigaciones y laboratorios aislados, sin cadenas operativas reutilizables contra sistemas reales.
- Se mantiene la distinción entre corrupción de memoria y control-flow hijack; crash no implica RCE ni control fiable del IP.
- Stack protector se presenta como detección parcial, NX/W^X como control de ejecución, ASLR/PIE como randomización/relocabilidad, RELRO como protección post-relocation y CFI/CET/PAC como restricciones de control-flow.
- GOT/PLT y allocator internals se explican por invariantes y toolchain, evitando congelar layouts dependientes de versión como leyes universales.
- UAF/double-free se fundamentan en lifetime/ownership; integer overflow en aritmética checked; type confusion en identidad real del objeto.
- El laboratorio final exige patch + regression test y se limita a artefactos propios/autorizados.

Resultado tras la Parte 26: 78 bloques en catálogo, 25 desarrollados y 292 lecciones validadas.


## Parte 27 — Auditoría acumulativa + Bloque 026

- Se revalidaron los 25 bloques / 292 lecciones previos antes de integrar contenido nuevo.
- No aparecieron nuevas correcciones conceptuales obligatorias en bloques anteriores.
- Se añadió Bloque 026 con 14 lecciones orientadas a reversing reproducible y autorizado.
- Regla reforzada: decompiler output, función detectada y tipos inferidos son hipótesis de análisis, no fuente original ni verdad automática.
- Se validan 26 bloques desarrollados y 306 lecciones, con niveles 1–4 y sin retos/rutas huérfanos.


## Parte 28 — Auditoría acumulativa + Bloque 027

- Se revalidaron los 26 bloques / 306 lecciones previos antes de integrar contenido nuevo; estructura, rutas, retos y sintaxis pasaron limpias.
- No se detectaron nuevas correcciones conceptuales obligatorias en bloques anteriores.
- El bloque 027 mantiene enfoque defensivo: persistencia/evasión se enseñan como taxonomías de comportamiento y fuentes de telemetría, sin recetas operativas de despliegue.
- Static/dynamic analysis, memory/disk/network forensics y logs se separan por qué observan y qué no pueden demostrar por sí solos.
- IOC/IOA y YARA se presentan como señales/detecciones que requieren contexto, corpus de prueba y gestión de falsos positivos; una coincidencia no equivale a atribución.
- Volatility 3 se referencia como framework de análisis de memoria; adquisición y análisis se mantienen separados.
- Incident response se actualiza con NIST SP 800-61 Rev. 3 (2025), integrado con CSF 2.0; SP 800-86 se mantiene como guía forense clásica.

Resultado tras la Parte 28: 78 bloques en catálogo, 27 desarrollados y 320 lecciones validadas.


## Parte 29 — Auditoría acumulativa + Bloque 028

- Auditoría previa ejecutada sobre 27 bloques y 320 lecciones: validación estructural y sintáctica limpia.
- Corrección documental: README mostraba todavía 306 lecciones y omitía el Bloque 027 en la lista principal; se sincroniza con el estado real antes de añadir contenido nuevo.
- Bloque 028 añadido con 13 lecciones y cuatro módulos.
- Revisión semántica específica: implicación vs conversa; orden de cuantificadores; pertenencia vs inclusión; antisimetría vs no-simetría; mínimo vs minimal; preimagen vs inversa; permutación vs combinación; condiciones iniciales en recurrencias; inducción fuerte vs ordinaria; Euler vs Hamilton; DFA/NFA y alcance del pumping lemma.
- Validación final prevista/ejecutada sobre 28 bloques y 333 lecciones, con práctica niveles 1–4 y sin rutas o retos huérfanos.


## Parte 30 — Auditoría acumulativa + Bloque 029

- Se revalidaron los 28 bloques / 333 lecciones previos antes de integrar contenido nuevo; estructura, rutas, retos y sintaxis pasaron limpias.
- Se corrigió documentación heredada para mantener README sincronizado con el estado real y preservar los totales históricos.
- Bloque 029 añadido con 13 lecciones y cuatro módulos.
- Revisión semántica específica: vector abstracto vs coordenadas; matriz vs transformación; consistencia/rango-nulidad; producto interno y ortogonalidad; cross product restringido a R³ en el tratamiento estándar; subespacio vs afín; cambio de base/similitud; determinante vs estabilidad; multiplicidad algebraica/geométrica; teorema espectral; SVD/pseudoinversa; proyección/least squares y condicionamiento.
- Validación final esperada: 29 bloques desarrollados y 346 lecciones con práctica niveles 1–4, sin rutas o retos huérfanos.


## Parte 31 — Auditoría acumulativa + Bloque 030

- Se revalidaron los 29 bloques / 346 lecciones previos antes de integrar contenido nuevo; catálogo, rutas, retos y sintaxis pasaron limpias.
- Se revisó semánticamente la frontera entre límite/valor, continuidad/derivabilidad, identidad exacta/aproximación numérica, parcial/diferencial total, gradiente/Jacobiano/integrales múltiples/Hessiano y solución analítica/estabilidad numérica.
- Bloque 030 añadido con 14 lecciones y cuatro módulos.
- Se verificaron ejemplos y retos numéricos de derivación, integración, series, Taylor, Jacobianos, definitud y Euler explícito.
- Validación final esperada: 30 bloques desarrollados y 360 lecciones con práctica niveles 1–4, sin rutas o retos huérfanos.


## Parte 32 — Auditoría acumulativa + Bloque 031

- Se revalidaron los 30 bloques / 360 lecciones previos antes de integrar contenido nuevo; estructura, rutas, retos y sintaxis pasaron limpias.
- Revisión semántica acumulativa: no se detectaron nuevas correcciones conceptuales obligatorias en Bloques 001–030.
- Bloque 031 añadido con 14 lecciones y cuatro módulos.
- Revisión específica: probabilidad vs frecuencia; PMF/PDF/CDF; linealidad de esperanza sin independencia; covarianza/correlación vs independencia; Bayes y tasas base; CLT vs normalidad de datos; estimador vs estimación; likelihood vs posterior; cobertura frecuentista; p-value vs P(H0|datos); significancia vs relevancia; correlación/regresión vs causalidad.
- Resultado final esperado/validado: 31 bloques desarrollados y 374 lecciones, cada una con práctica niveles 1–4.


## Parte 33 — Auditoría acumulativa + Bloque 032

- Se revalidaron los 31 bloques / 374 lecciones previos antes de integrar contenido nuevo; estructura, rutas, retos y sintaxis pasaron limpias.
- Revisión semántica acumulativa: no se detectaron nuevas correcciones conceptuales obligatorias en Bloques 001–031.
- Bloque 032 añadido con 14 lecciones y cuatro módulos.
- Revisión específica: función de coste vs objetivo real; óptimo local/global; convexidad vs rapidez algorítmica; gradiente vs tamaño de paso; SGD insesgado vs exacto; momentum/Nesterov; Newton sin invertir explícitamente el Hessiano; factibilidad; Lagrange/KKT; dualidad débil/fuerte; relajaciones combinatorias; line search/trust region/conditioning; regularización y Pareto.
- Se priorizaron respuestas del tutor de optimización antes de la regla genérica de gradiente de Cálculo para evitar colisiones semánticas.
- Resultado final esperado/validado: 32 bloques desarrollados y 388 lecciones, cada una con práctica niveles 1–4.

## Parte 34 — Auditoría acumulativa + Bloque 033

- Se revalidaron los 32 bloques / 388 lecciones previos antes de integrar contenido nuevo; estructura, rutas, retos y sintaxis pasaron limpias.
- Revisión semántica acumulativa: no se detectaron nuevas correcciones conceptuales obligatorias en los Bloques 001–032.
- Bloque 033 añadido con 14 lecciones y cuatro módulos.
- Revisión específica: tiempo discreto vs cuantización; fase y periodicidad en frecuencia discreta; LTI y exponenciales propias; serie/transformada de Fourier; DFT vs FFT; bin spacing vs resolución; convolución lineal/circular; Nyquist-Shannon y sus hipótesis; frecuencia de Nyquist vs tasa de Nyquist; leakage/ventanas; FIR/IIR y estabilidad; sample rate vs bit depth; frecuencia espacial; STFT y convenciones de convolución en IA.
- Se verificaron manualmente los retos numéricos de bin spacing, aliasing, convolución, bitrate PCM y frecuencia espacial.
- Resultado final esperado/validado: 33 bloques desarrollados y 402 lecciones, cada una con práctica niveles 1–4 y sin rutas o retos huérfanos.



## Parte 35 — auditoría acumulativa + Bloque 034

- Auditoría previa: 33 bloques / 402 lecciones; validador y `node --check` limpios.
- Revisión semántica dirigida a convenciones de coordenadas/color, clipping, rasterización, depth y sampling.
- Bloque 034 añadido con 14 lecciones y retos de Nivel 4.
- Regla reforzada: una matriz/valor no tiene semántica completa sin espacio, convención, formato y etapa del pipeline.
- Validación final esperada: 34 bloques / 416 lecciones, sin retos ni rutas huérfanas.


## Parte 36 — Auditoría acumulativa + Bloque 035

- Se revalidaron los 34 bloques / 416 lecciones previos antes de integrar contenido nuevo; catálogo, rutas, retos y sintaxis pasaron limpios.
- Corrección documental heredada: el encabezado de `README.md` todavía mostraba 402 lecciones aunque la Parte 35 y el validador ya confirmaban 416; se sincronizó antes de sumar el Bloque 035 sin alterar totales históricos.
- Bloque 035 añadido con 14 lecciones y cuatro módulos.
- Revisión semántica específica: CPU vs GPU y throughput/latencia; SIMD vs SIMT; warp/wavefront/subgroup dependiente de arquitectura; “GPU core” ambiguo; registros/shared-LDS/global; VRAM vs bandwidth; coalescing; occupancy vs rendimiento; divergence; caches vs memory ordering; texture units; rasterizer/fixed-function; compute workgroups y scopes de sincronización.
- Tutor GPU colocado antes de reglas genéricas de IPC/cache/microarquitectura para evitar colisiones con `shared memory`, `coalescing` y términos afines.
- Resultado final esperado/validado: 35 bloques desarrollados y 430 lecciones, cada una con práctica niveles 1–4 y sin rutas o retos huérfanos.

## Parte 37 — auditoría acumulativa + Bloque 036

- Auditoría previa ejecutada sobre 35 bloques / 430 lecciones: validador estructural y `node --check` limpios antes de editar.
- Revisión semántica acumulativa: no se detectaron nuevas correcciones conceptuales obligatorias en los Bloques 001–035.
- Se añadió `content/block-036.js` con 15 lecciones y 15 retos de nivel 4.
- Se priorizó el tutor de shaders/APIs antes del tutor GPU para evitar colisiones con `compute shader`, `buffer`, `cache`, `descriptor` y `synchronization`.
- Se enseña OpenGL como state machine/contexto y Vulkan como modelo más explícito sin caricaturizar ninguno como “alto/bajo nivel” absoluto.
- SPIR-V se trata como IR binaria dependiente del entorno cliente; validación estructural no equivale a compatibilidad universal del pipeline/dispositivo.
- Descriptor set layout, descriptor set y pipeline layout quedan separados como esquema, instancia y contrato de pipeline.
- Render pass tradicional y dynamic rendering se presentan como mecanismos vigentes; `DONT_CARE` no se interpreta como clear a cero.
- Sincronización distingue execution dependency de memory dependency; ordenar comandos no garantiza por sí solo visibilidad de memoria.
- `vkQueueSubmit`/recording no se confunden con completion; lifetimes de recursos/command buffers se atan a finalización real.
- Total final esperado tras integración: 36 bloques / 445 lecciones.


## Parte 38 — Auditoría acumulativa + Bloque 037

- Se revalidaron 36 bloques / 445 lecciones antes de integrar contenido nuevo; catálogo, rutas, retos y sintaxis pasaron limpias.
- Revisión semántica acumulativa: no se detectaron nuevas correcciones conceptuales obligatorias en los Bloques 001–036.
- Bloque 037 añadido con 15 lecciones y cuatro módulos: radiometría/reflectancia, PBR, visibilidad/HDR y transporte global Monte Carlo.
- Distinciones reforzadas: radiancia vs irradiancia; BRDF vs reflectancia integrada; Lambert vs coseno geométrico; shininess vs roughness; PBR vs exactitud física; AO vs GI; tone mapping vs sRGB; ray tracing vs path tracing; unbiasedness vs baja varianza.
- Se evita universalizar parámetros de workflows concretos: metallic-roughness se presenta según glTF como un modelo de intercambio específico, no como única definición posible de PBR.
- Path tracing se audita con el comportamiento Monte Carlo correcto: varianza ~1/N y error RMS/desviación estándar ~1/√N bajo las hipótesis usuales; importance sampling/MIS reducen varianza, no cambian por sí solos la integral objetivo.

Resultado tras la Parte 38: 78 bloques en catálogo, 37 desarrollados y 460 lecciones validadas.


## Parte 39 — Auditoría acumulativa + Bloque 038

- Se revalidaron 37 bloques / 460 lecciones antes de integrar contenido nuevo; catálogo, rutas, retos y sintaxis pasaron limpias.
- Revisión semántica acumulativa: no se detectaron nuevas correcciones conceptuales obligatorias en los Bloques 001–037.
- Bloque 038 añadido con 14 lecciones y cuatro módulos: escena/recursos, cámara/visibilidad, batching/scheduling y frame/proyecto.
- Distinciones reforzadas: scene graph vs ownership; asset lógico vs recurso GPU; material template vs instance; visibilidad vs ownership; LOD vs distancia fija; batching vs rendimiento garantizado; instancing vs shading gratis; render graph vs memory model; throughput vs latency.
- Se exige profiling por fases CPU/GPU y lifetimes atados a completion real antes de reciclar recursos.

Resultado tras la Parte 39: 78 bloques en catálogo, 38 desarrollados y 474 lecciones validadas.


## Parte 40 — Auditoría acumulativa + Bloque 039

- Se revalidaron 38 bloques / 474 lecciones antes de integrar contenido nuevo; catálogo, rutas, retos y sintaxis pasaron limpias.
- Revisión semántica acumulativa: no se detectaron nuevas correcciones conceptuales obligatorias en los Bloques 001–038.
- Bloque 039 añadido con 14 lecciones y cuatro módulos: loop/tiempo, ECS/escenas, servicios y persistencia/integración.
- Distinciones reforzadas: render FPS vs simulation rate; fixed timestep vs determinismo; delta correcto vs estabilidad numérica; ECS vs almacenamiento concreto; event vs command; input event vs polling; source/cooked/runtime asset; serialización vs dump de memoria; checksum vs autenticidad; promedio de FPS vs stutter.
- Tutor de arquitectura de videojuegos colocado antes de reglas de motor gráfico y sistemas genéricos para evitar colisiones con `scene`, `resource`, `event`, `input`, `snapshot` y `frame time`.
- Resultado final esperado/validado: 39 bloques desarrollados y 488 lecciones, cada una con práctica niveles 1–4 y sin rutas o retos huérfanos.

## Parte 41 — Auditoría acumulativa + Bloque 040

- Auditoría previa ejecutada sobre 39 bloques / 488 lecciones y todos los JS/MJS: sin errores estructurales ni sintácticos.
- Revisión semántica acumulativa: no se detectaron correcciones conceptuales obligatorias en los Bloques 001–039.
- Se añadió el Bloque 040 con 14 lecciones y retos de Nivel 4 sobre física de videojuegos.
- Criterios reforzados: detección ≠ resolución; broad phase ≠ narrow phase; fuerza ≠ impulso; estabilidad ≠ exactitud; fixed timestep ≠ determinismo; substeps/CCD/interpolación resuelven problemas distintos.
- Fuentes de implementación se etiquetan como tales: Box2D para dynamic AABB tree, contacts/solver y friction/restitution; Godot para fixed physics ticks/interpolation; Fiedler como referencia pedagógica de integración/timestep.
- Estado esperado tras la integración: 40 bloques / 502 lecciones / 502 retos de Nivel 4.

## Parte 42 — Auditoría acumulativa + Bloque 041

- Se revalidaron 40 bloques / 502 lecciones antes de integrar contenido nuevo; catálogo, rutas, retos y `node --check` pasaron limpios.
- Revisión semántica acumulativa: no se detectaron nuevas correcciones conceptuales obligatorias en los Bloques 001–040.
- Bloque 041 añadido con 14 lecciones y cuatro módulos: clips/poses, FK/IK/blending, control temporal y producción/integración.
- Distinciones reforzadas: keyframe vs frame renderizado; local/global/rest/bind/animated pose; LBS y sus artefactos; FK vs IK; blend normalizado vs additive; state machine visual vs gameplay; root motion vs movimiento autoritativo; marker por cruce temporal vs igualdad float; retargeting vs coincidencia de nombres; compresión vs calidad.
- Tutor de animación colocado antes de física/game-loop para evitar colisiones con `kinematics`, `state machine`, `root` y términos de engine.
- Resultado final validado: 41 bloques desarrollados y 516 lecciones, cada una con práctica niveles 1–4, sin rutas ni retos huérfanos.



## Parte 43 — Auditoría acumulativa + Bloque 042

- Auditoría previa: 41 bloques desarrollados, 516 lecciones, rutas y retos consistentes; todos los JS/MJS pasan `node --check`.
- No se detectaron nuevas correcciones conceptuales obligatorias en los Bloques 001–041.
- Bloque 042 añadido con 14 lecciones y cuatro módulos: decisión, navegación, agentes en mundo dinámico y producción/integración.
- Distinciones reforzadas: FSM/BT/Utility AI no sustituyen percepción o navegación; A* separa `g`, `h` y garantías de la heurística; navmesh ≠ malla visual; pathfinding ≠ steering/avoidance; conocimiento observado ≠ world state omnisciente.
- Validación final esperada: 42 bloques y 530 lecciones, todos con práctica niveles 1–4.


## Parte 44 — Auditoría acumulativa + áreas generales + Bloque 043

- Auditoría previa ejecutada sobre 42 bloques / 530 lecciones: rutas, retos y sintaxis correctos antes de editar.
- No se detectaron nuevas correcciones conceptuales obligatorias en los Bloques 001–042.
- Se añadieron 10 áreas generales de navegación: Demoscene, Ciberseguridad, Cómo funcionan realmente los ordenadores, Desarrollo de videojuegos, Godot, Pixel art y arte técnico, Electrónica, Inteligencia artificial, Sistemas operativos y Redes e Internet.
- La clasificación es deliberadamente many-to-many: un bloque puede pertenecer a varias rutas sin duplicar la lección. El validador comprueba IDs de áreas, bloques válidos y que el núcleo `focus` sea subconjunto de cada ruta.
- Bloque 043 añadido con 14 lecciones y 14 retos de nivel 4.
- Distinciones reforzadas: sample rate ≠ bit depth; dBFS ≠ SPL; callback average ≠ deadline worst-case; playback rate ≠ resampling ≠ pitch-shift; HRTF ≠ pan; occlusion acústica ≠ visibility; virtual voice ≠ voz detenida; reloj de audio ≠ reloj de render.
- Resultado final esperado/validado: 43 bloques desarrollados, 544 lecciones y 10 áreas generales, todas las lecciones con práctica niveles 1–4 y sin rutas/retos huérfanos.


## Parte 45 — Auditoría acumulativa + Bloque 044

- Auditoría previa ejecutada sobre 43 bloques / 544 lecciones y 10 áreas generales: validador y `node --check` pasaron limpios antes de editar.
- No se detectaron nuevas correcciones conceptuales obligatorias en los Bloques 001–043.
- Se añadió el Bloque 044 con 15 lecciones y 15 retos de Nivel 4.
- Distinciones reforzadas: topología vs autoridad; tick rate vs FPS/snapshot rate; snapshot interpolation vs prediction; prediction vs authority; reconciliation vs smoothing; lag compensation vs menor RTT; rollback vs interpolation; fixed timestep vs determinismo; reliable/ordered vs idoneidad universal; relevancia de red vs frustum culling.
- Las rutas por objetivos ya contenían el bloque 044 en Desarrollo de videojuegos, Godot y Redes e Internet; se valida sin duplicar contenido.
- Resultado esperado tras integración: 44 bloques desarrollados, 559 lecciones y 10 áreas generales, sin rutas ni retos huérfanos.


## Parte 46 — Auditoría acumulativa + Bloque 045

- Se revalidaron 44 bloques / 559 lecciones y las 10 áreas generales antes de integrar contenido nuevo; catálogo, rutas, retos y sintaxis pasaron limpios.
- Revisión semántica acumulativa: no se detectaron nuevas correcciones conceptuales obligatorias en los Bloques 001–044.
- Bloque 045 añadido con 16 lecciones y 16 retos de Nivel 4.
- Distinciones reforzadas: SceneTree/Node vs Resource; escena serializada vs instancia runtime; parent vs owner; signal vs ausencia de dependencia; Scene API vs Servers; CharacterBody vs RigidBody; action mapping vs hardware input; Object/Node vs RefCounted lifetime; typed GDScript vs native; C# GC vs Node lifetime; GDExtension vs lenguaje; RPC vs llamada local; editor tooling vs runtime; source actual vs API estable.
- La ruta por objetivos mantiene 045 como foco de Godot y Desarrollo de videojuegos sin duplicar lecciones ni progreso.
- Resultado esperado/validado tras integración: 45 bloques desarrollados, 575 lecciones y 10 áreas generales, sin rutas ni retos huérfanos.


## Parte 47 — Auditoría acumulativa + Bloque 046

- Auditoría previa ejecutada sobre 45 bloques / 575 lecciones y 10 áreas generales: catálogo, rutas, retos y todos los JS/MJS pasaron limpios antes de editar.
- Revisión documental previa: se detectó que `README.md` no enumeraba el Bloque 045 en “Contenido desarrollado”, aunque sí estaba cargado, documentado en Parte 46 y validado. Se corrige la lista sin reescribir el histórico.
- Bloque 046 añadido con 14 lecciones y 14 retos de Nivel 4.
- Distinciones reforzadas: pixel art vs mera baja resolución; píxel lógico vs físico; cluster vs ruido; paleta vs lista de colores; dithering vs antialiasing; AA interno/externo; subpixel visual vs transform subpixel; tile vs atlas/chunk; pivot/origin vs bounds; nearest vs pixel-perfect; seed vs reproducibilidad tras cambios de algoritmo.
- La ruta por objetivos ya contiene 046 como foco de Pixel art y arte técnico y lo conecta con Demoscene, videojuegos y Godot sin duplicar contenido.
- Resultado esperado tras integración: 46 bloques desarrollados, 589 lecciones y 10 áreas generales, sin rutas ni retos huérfanos.


## Parte 48 — Auditoría acumulativa + Bloque 047

- Auditoría previa ejecutada sobre 46 bloques / 589 lecciones, 10 áreas generales y todos los JS/MJS: sin errores estructurales ni sintácticos.
- Se confirmó el alcance exacto del índice maestro para 047: origen, crack intros, C64, Amiga, Atari, PC, Future Crew, Second Reality, Assembly, TBL, Farbrausch, Conspiracy, Scene.org, parties y competitions.
- Bloque 047 añadido con 15 lecciones y 15 retos de Nivel 4, organizado en cuatro módulos: orígenes/plataformas, Future Crew/Second Reality, grupos posteriores e infraestructura cultural.
- Corrección editorial: demoscene ≠ cracking; Assembly-party ≠ assembly language; resultado de compo ≠ calidad universal; 64K de ejecutable ≠ 64K de RAM; archivo ≠ catálogo ≠ comentario.
- Future Crew/Second Reality se verifican con Assembly Archive y archivos comunitarios; Second Reality figura 1ª en la PC demo compo de Assembly 1993.
- Resultado esperado tras integración: 47 bloques desarrollados, 604 lecciones y 10 áreas generales, sin rutas ni retos huérfanos.


## Parte 49 — Auditoría acumulativa + Bloque 048

- Auditoría previa ejecutada sobre 47 bloques / 604 lecciones y 10 áreas generales: catálogo, rutas, retos y todos los JS/MJS pasaron limpios antes de integrar el nuevo bloque.
- Se detectó una inconsistencia de navegación en `GOAL_AREAS`: la ruta `cyber` contenía el Bloque 027 dos veces. No duplicaba contenido ni progreso, pero sí era un ID repetido en la ruta; se eliminó la repetición.
- Se fortaleció `validate-content.mjs` para rechazar IDs duplicados tanto en `area.blocks` como en `area.focus`, evitando que el mismo defecto reaparezca.
- Bloque 048 añadido con 16 lecciones y 16 retos de Nivel 4.
- Distinciones reforzadas: campo escalar vs paleta; fire effect vs combustión física; tunnel lookup vs geometría 3D obligatoria; Copper histórico vs shader equivalente visual; inverse mapping vs forward mapping; metaballs vs fluidos; height-field water vs Navier–Stokes; feedback vs lectura/escritura indefinida; palette cycling vs mover píxeles; fractal finite-iteration vs prueba exacta; voxel volume vs voxel-space heightmap; bump vs normal vs displacement.
- Tutor actualizado con reglas específicas de efectos clásicos antes del fallback demoscene/gráficos genérico.
- Resultado esperado/validado: 48 bloques desarrollados, 620 lecciones, 620 retos de Nivel 4 y 10 áreas generales sin IDs internos repetidos.


## Parte 50 — Auditoría acumulativa + Bloque 049

- Auditoría previa ejecutada sobre 48 bloques / 620 lecciones: catálogo, 10 áreas generales, retos y sintaxis correctos antes de editar.
- No se detectaron nuevas correcciones conceptuales obligatorias en los Bloques 001–048.
- Bloque 049 añadido con 14 lecciones y 14 retos de Nivel 4.
- Distinciones reforzadas: límite de distribución ≠ memoria runtime; source/object/executable/packed size son etapas distintas; minificación de shader ≠ rendimiento GPU; entropy bound ≠ tamaño exacto de cada archivo; code/data dual use ≠ memoria RWX universal; compresión ≠ seguridad.
- Resultado esperado tras integración: 49 bloques desarrollados y 634 lecciones.


## Parte 51 — Auditoría acumulativa + Bloque 050

- Auditoría previa limpia: 49 bloques, 634 lecciones y 10 áreas generales.
- Integrado Bloque 050 con 14 lecciones y 14 retos expertos.
- Revisión semántica: raymarching ≠ sphere tracing; SDF exacta ≠ distance estimator; soft-shadow/AO heurísticos ≠ transporte físico exacto; domain repetition ≠ instancing de meshes.
- Validación esperada/final: 50 bloques, 648 lecciones.


## Parte 52 — Auditoría acumulativa + Bloque 051

- Auditoría previa limpia sobre 50 bloques / 648 lecciones, 648 retos y 10 áreas generales; todos los JS/MJS pasaron `node --check` antes de editar.
- Se confirmó el alcance exacto del índice maestro para 051: osciladores, ondas, ADSR, filtros, LFO, FM, síntesis sustractiva, sequencers, tracker music, música procedural y tiny synthesizers.
- Bloque 051 añadido con 14 lecciones y 14 retos de Nivel 4, incorporando además audio clock, composición generativa e integración audiovisual.
- Distinciones reforzadas: oscilador ideal ≠ implementación band-limited; sustain ≠ duración; rate ≠ depth; FM/PM ≠ vibrato lento; sequencer clock ≠ frame clock; tracker pattern ≠ PCM; random ≠ composición; seed ≠ reproducibilidad tras cambiar algoritmo; source/synth size ≠ packed release total.
- La ruta Demoscene ya incluía 051 como foco, por lo que se mantiene una única copia pedagógica con navegación transversal.
- Resultado esperado tras integración: 51 bloques desarrollados, 662 lecciones y 662 retos de Nivel 4.


## Parte 53 — Auditoría acumulativa + Bloque 052

- Auditoría previa limpia sobre 51 bloques / 662 lecciones, 662 retos y 10 áreas generales; todos los JS/MJS pasaron `node --check` antes de editar.
- Se detectó una omisión documental heredada: el árbol de `README.md` terminaba en `block-050.js` aunque `block-051.js` existía y estaba validado. Se corrigió al añadir 051 y 052 sin modificar los totales históricos.
- Alcance confirmado con el índice maestro: amplificadores, op-amps, filtros, osciladores, reguladores, ADC, DAC, fuentes, señal, ruido e instrumentación.
- Bloque 052 añadido con 14 lecciones y 14 retos de Nivel 4, incorporando además realimentación/estabilidad, cadena de señal y laboratorio.
- Distinciones reforzadas: modelo ideal ≠ componente real; V+≈V− no vale en saturación; GBW ≠ slew rate; feedback negativo DC ≠ estabilidad; resolución ADC/DAC ≠ exactitud; PSRR ≠ ruido propio; ground ≠ nodo físico de impedancia cero; densidad de ruido ≠ ruido RMS sin bandwidth; instrumento ≠ observador sin carga.
- La primera inserción de retos dejó una coma ausente entre los bloques 051 y 052; `node --check` lo rechazó y se corrigió antes de la validación final.
- Resultado esperado/final: 52 bloques desarrollados, 676 lecciones y 676 retos de Nivel 4.


## Parte 54 — Auditoría acumulativa + Bloque 053

- Se revalidaron 52 bloques / 676 lecciones y 676 retos antes de integrar contenido nuevo; catálogo, 10 áreas generales, rutas y sintaxis pasaron limpios.
- Alcance confirmado con el índice maestro: Arduino interno, AVR, STM32, ARM Cortex-M, GPIO, timers, PWM, interrupts, ADC, DAC, UART, SPI, I²C, DMA, watchdogs, bare metal, bootloaders y real-time programming.
- Bloque 053 añadido con 16 lecciones y 16 retos de Nivel 4.
- Distinciones reforzadas: core ≠ MCU ≠ placa ≠ framework; clock de CPU ≠ clock de periférico; PWM ≠ DAC; UART ≠ RS-232; SPI ≠ protocolo universal de comandos; I²C HIGH ≠ drive activo; DMA ≠ bus gratis; volatile ≠ atomicidad; fixed/fast execution ≠ real-time guarantee; CRC ≠ autenticidad de firmware.
- Resultado esperado/final: 53 bloques desarrollados, 692 lecciones y 692 retos de Nivel 4.


## Parte 55 — Auditoría acumulativa + Bloque 054

- Pre-auditoría: 53 bloques / 692 lecciones / 692 retos; validator y `node --check` completos en verde.
- Alcance 054 verificado contra índice maestro: RTOS, scheduling, memory constraints, power management, sensors, actuators, motor control, communication buses y reliability.
- Semántica protegida: RTOS ≠ deadlines garantizados; prioridad ≠ velocidad; `volatile` ≠ atomicidad; device PM ≠ system PM; sensor ≠ verdad física; PWM ≠ control cerrado; DMA ≠ ancho de banda gratis; watchdog ≠ corrección funcional.
- Total esperado y validado al cierre: 54 bloques / 706 lecciones.


## Parte 56 — Auditoría acumulativa + Bloque 055

- Auditoría previa limpia sobre 54 bloques, 706 lecciones, 706 retos y 10 rutas generales; todos los JS/MJS pasaron `node --check` antes de editar.
- El Bloque 055 ya estaba incluido como foco de Electrónica y dentro de Cómo funcionan realmente los ordenadores; se conserva una única copia pedagógica.
- Bloque 055 añadido con 16 lecciones y 16 retos de Nivel 4.
- Semántica reforzada: FPGA configura hardware concurrente; HDL simulable no implica sintetizable; synthesis produce netlist y implementation hace placement/routing; STA depende de constraints; bajar frecuencia no resuelve hold automáticamente; dos FF no solucionan buses CDC; latencia de BRAM/DSP se alinea explícitamente; soft CPU consume recursos FPGA.
- Validación esperada/final: 55 bloques desarrollados, 722 lecciones, 722 retos y 10 áreas generales.


## Parte 57 — Auditoría acumulativa + Bloque 056

- Auditoría previa limpia: 55 bloques, 722 lecciones, 722 retos, 10 áreas generales y todos los JS/MJS válidos.
- Alcance 056 confirmado contra el índice maestro: schematics, PCB layout, traces, layers, ground planes, decoupling, power integrity, signal integrity, differential pairs, impedance, EMC, connectors, manufacturing, soldering y debugging físico.
- Bloque 056 integrado con 16 lecciones y 16 retos expertos, añadiendo una lección de integración/bring-up reproducible.
- Semántica protegida: esquemático ≠ geometría; ground ≠ nodo equipotencial perfecto; pista ≠ interconexión ideal; frequency rate ≠ edge rate; matched length ≠ Zdiff; decoupling ≠ un valor ritual; DRC/ERC ≠ garantía funcional/fabricable; medida ≠ observación sin carga.
- Validación final esperada: 56 bloques, 738 lecciones, 738 retos y 10 áreas generales.


## Parte 58 — Auditoría acumulativa + Bloque 057

- Estado previo validado: 56 bloques desarrollados, 738 lecciones, 738 retos, 10 áreas generales y sintaxis JS/MJS limpia.
- No se detectaron correcciones conceptuales obligatorias en los Bloques 001–056 durante esta pasada.
- Se corrigió una omisión documental heredada en el árbol de `README.md`: faltaba mostrar `block-056.js`; el árbol queda sincronizado hasta `block-057.js`.
- Se desarrolló el Bloque 057 con 18 lecciones: complejidad temporal/espacial, Big O, arrays, linked lists, stacks, queues, hash tables, trees, BST, heaps, tries, graphs, sorting, searching, dynamic programming, greedy y graph algorithms.
- Union-Find/DSU se introduce dentro de algoritmos de grafos como estructura auxiliar para Kruskal, sin alterar el alcance de 18 aprendizajes del índice.
- El tutor se reordenó para que `hash table` no caiga en criptografía y para que términos como tree/graph/BFS/DFS se interpreten primero en su contexto algorítmico cuando corresponde.
- Objetivo de validación final: 57 bloques, 756 lecciones y 756 retos de Nivel 4.


## Parte 59 — Auditoría acumulativa + Bloque 058

- Estado de entrada validado: 57 bloques, 756 lecciones, 756 retos, 10 áreas generales y todos los JS/MJS sintácticamente válidos.
- Se desarrolló el Bloque 058 con 14 lecciones: autómatas finitos/regulares, máquinas de Turing, computabilidad, decidibilidad, Halting Problem, reducciones, pruebas de reducción, clases de complejidad, P, NP, NP-completeness, NP-hard/intratabilidad e integración.
- Correcciones conceptuales protegidas: Big O no es worst-case por definición; indecidible no significa exponencial; NP no significa non-polynomial; NP-hard no implica pertenencia a NP; NP-complete exige pertenencia+dureza; la dirección de una reducción es parte de la prueba.
- Se añadieron 14 retos expertos y reglas de tutor específicas antes de fallbacks que podían confundir autómatas con el bloque discreto o NP-hard con optimización combinatoria.
- Total esperado tras integración: 770 lecciones y 770 retos de Nivel 4.


## Parte 60 — Bloque 059: Concurrencia y Paralelismo

- Auditoría previa: 58 bloques, 770 lecciones y 770 retos; validator y node --check limpios antes de editar.
- Nuevo bloque: 14 lecciones y 14 retos.
- Fronteras verificadas: concurrency≠parallelism; process≠thread; race condition≠data race; atomicity≠ordering; coherence≠language memory model; lock-free≠wait-free; SIMD≠threads; occupancy≠performance; distributed parallelism incluye red/fallos parciales.
- Tutor reordenado para que lock-free, memory-order/model, SIMD, SIMT/GPU y distributed parallelism no caigan en respuestas genéricas de SO/GPU.
- Total esperado tras integración: 784 lecciones.


## Parte 61 — Bloque 060: IA — Fundamentos

- Auditoría de entrada: 59 bloques / 784 lecciones / 784 retos y 10 áreas generales; validación y sintaxis limpias.
- Añadidas 14 lecciones y 14 prácticas expertas.
- Revisión conceptual: learning se define operacionalmente; loss, optimizer y metric se separan; train/validation/test tienen roles distintos; leakage y shift se tratan explícitamente; overfitting no se diagnostica solo por train loss; una seed no garantiza reproducibilidad total.
- El bloque permanece en la ruta general de Inteligencia Artificial sin duplicar contenido.
- Total final: 60 bloques / 798 lecciones / 798 retos.


## Parte 62 — Auditoría acumulativa + Bloque 061

- Base auditada antes de editar: 60 bloques, 798 lecciones y 798 retos; todas las rutas e IDs consistentes.
- Se añadió `content/block-061.js` con 14 lecciones y se cargó desde `index.html`.
- Se añadieron 14 retos expertos, uno por lección.
- La primera validación detectó alternativas `si`/`sí` redundantes tras normalización; se eliminaron y se repitió la validación completa.
- Tutor prioriza backprop, chain rule, BatchNorm, initialization, perceptrón, activaciones y forward antes de fallbacks de ML/optimización genéricos.
- Resultado final: 61 bloques desarrollados y 812 lecciones validadas.


## Parte 63 — Auditoría acumulativa + Bloque 062

- Base auditada antes de editar: 61 bloques, 812 lecciones, 812 retos y 10 áreas generales; `node --check` y validador en verde.
- Añadido `content/block-062.js` con 14 lecciones y un reto experto por lección.
- Revisión semántica: se separan convolution/correlation de implementación, receptive field teórico/efectivo, pooling/downsampling/anti-aliasing, recurrencia/BPTT, LSTM/GRU, attention/self-attention/causal masking, embeddings/significado y representation learning/interpretabilidad.
- El bloque prepara 063 Transformers sin adelantar Q/K/V y multi-head como si fueran equivalentes a todo mecanismo de attention.
- Total verificado al cierre: 62 bloques desarrollados, 826 lecciones y 826 retos de Nivel 4.


## Parte 64 — Auditoría acumulativa + Bloque 063

- Auditoría de entrada: 62 bloques / 826 lecciones / 826 retos; 10 áreas generales, rutas e IDs consistentes.
- Añadido `content/block-063.js` con 14 lecciones y 14 retos expertos.
- Revisión conceptual: token≠palabra; embedding≠significado universal; attention≠self-attention; Q/K/V tienen roles distintos; mask causal≠padding mask; residual≠concatenation; LayerNorm≠BatchNorm; encoder≠decoder; decoder original≠todo decoder-only moderno.
- El tutor prioriza Q/K/V, scaled dot-product attention, multi-head, causal mask, LayerNorm y encoder/decoder antes de fallbacks de Deep Learning.
- Total esperado y verificado: 63 bloques desarrollados / 840 lecciones / 840 retos.


## Parte 65 — Bloque 064: Large Language Models

- Base auditada antes de editar: 63 bloques, 840 lecciones y 840 retos; rutas, IDs y sintaxis consistentes.
- Añadidas 19 lecciones y 19 retos: 18 aprendizajes LLM del índice + proyecto integrado.
- Fronteras verificadas: arquitectura Transformer≠sistema LLM; objective≠decoding; pretraining≠SFT/preference optimization; context window≠memoria; KV cache≠atención eliminada; RAG≠fine-tuning; quantization≠speedup universal; data/tensor/pipeline parallelism tienen costes de comunicación distintos.
- Tutor LLM priorizado antes de fallbacks Transformer/ML.
- Total esperado y validado: 64 bloques / 859 lecciones / 859 retos.


## Parte 66 — Bloque 065: Reinforcement Learning

- Base auditada antes de editar: 64 bloques, 859 lecciones, 859 retos y 10 áreas generales; validador y sintaxis en verde.
- Bloque 065 añadido con 14 lecciones y 14 retos expertos.
- Se cubren los 11 aprendizajes del índice y se añaden retorno/descuento, exploración, Deep Q y evaluación reproducible como puentes necesarios.
- Fronteras revisadas: reward vs return, estado vs observación, V vs Q vs advantage, Bellman vs algoritmo, Q-learning tabular vs function approximation, policy gradient vs actor-critic, on-policy vs off-policy y training reward vs evaluación multi-seed.
- Tutor RL insertado antes de fallbacks genéricos de IA/optimización.
- Total al cierre: 65 bloques, 873 lecciones y 873 retos.


## Parte 67 — Bloque 066: Modelos Generativos

- Base auditada antes de editar: 65 bloques, 873 lecciones y 873 retos; validador, rutas e IDs en verde.
- Añadido `content/block-066.js` con 14 lecciones y un reto experto por lección.
- Revisión conceptual: autoencoder/reconstrucción se separa de muestreo generativo; VAE/ELBO/reparameterization mantienen su interpretación probabilística; GANs se evalúan por fidelidad y cobertura; diffusion separa proceso forward, reverse sampling y score; conditioning/guidance y latent/pixel space no se confunden.
- Tutor generativo insertado antes de fallbacks de IA para preservar semántica específica.
- Resultado final: 66 bloques desarrollados, 887 lecciones y 887 retos de Nivel 4.


## Parte 68 — Auditoría acumulativa + Bloque 067

- Pre-auditoría: 66 bloques, 887 lecciones, 887 retos y 10 áreas generales; validator y `node --check` en verde.
- Añadido Bloque 067 con 14 lecciones y 14 retos.
- Revisión semántica: modularidad se evalúa por límites y change coupling; abstracción no oculta restricciones observables; encapsulación protege invariantes; contratos API incluyen errores/ownership/idempotencia; arquitectura se justifica por quality attributes; refactoring preserva comportamiento; deuda técnica se gestiona como pasivo; review y documentación complementan automatización.
- Verificación esperada/final: 67 bloques, 901 lecciones, 901 retos.

## Parte 69 — Auditoría acumulativa + Bloque 068 — Git

- Auditoría previa limpia: 67 bloques desarrollados, 901 lecciones y 901 retos de Nivel 4; 10 áreas generales y sintaxis consistentes.
- Añadido `content/block-068.js` con 18 lecciones y 18 retos expertos sobre el modelo interno de Git, estados locales, DAG de commits, transformación de historia, remotes, almacenamiento y recuperación.
- Semántica protegida: repository ≠ working tree; index ≠ cola abstracta; commit ≠ diff; blob ≠ pathname; tree ≠ directorio mutable; ref ≠ objeto; HEAD ≠ branch; fast-forward ≠ merge commit; rebase/cherry-pick recrean commits; origin/main es una remote-tracking ref local; packfile ≠ nuevo objeto; hash ≠ autenticidad.
- Tutor Git colocado antes de reglas de microarquitectura para evitar colisiones de `branch` y `commit`.
- Total esperado al cierre: 68 bloques / 919 lecciones / 919 retos.


## Parte 70 — Auditoría acumulativa + Bloque 069 — Testing

- Auditoría de entrada limpia: 68 bloques, 919 lecciones y 919 retos; sintaxis, rutas e IDs consistentes.
- Bloque 069 añadido con 14 lecciones y 14 retos: cubre los 11 aprendizajes del índice y añade oráculos, cobertura/mutation testing y un proyecto de estrategia por riesgo.
- Revisión conceptual: unit ≠ una sola función; integration ≠ mocks de todos los lados; system/E2E ≠ toda la suite; property-based ≠ prueba formal; fuzzing ≠ bytes aleatorios sin oráculo; test double ≠ mock; coverage ≠ correctitud; static ≠ dynamic analysis; CI ≠ continuous delivery automática.
- Tutor especializado insertado antes de Git y fallbacks genéricos para responder sobre testing con semántica específica.
- Total esperado tras integración: 69 bloques desarrollados / 933 lecciones / 933 retos de Nivel 4.


## Parte 71 — Auditoría acumulativa + Bloque 070 — Sistemas Distribuidos

- Punto de partida validado: 69 bloques desarrollados y 933 lecciones sin errores estructurales o de sintaxis.
- Añadido `content/block-070.js` con 16 lecciones y 16 retos de nivel 4.
- Verificación semántica apoyada en Lamport, Gilbert/Lynch, el paper de Raft y documentación oficial de Kafka.
- Correcciones editoriales clave: CAP ≠ “2 de 3”; logical-clock order ≠ causalidad inversa; timeout ≠ prueba de crash; réplica recibida ≠ entrada committed; at-least-once admite redelivery.
- Auditoría final ejecutada tras la integración.


## Parte 72 — Auditoría acumulativa + Bloque 071 — Bases de Datos

- Punto de partida validado: 70 bloques desarrollados y 949 lecciones.
- Añadido `content/block-071.js`: 16 lecciones, todas con explicación profunda, check y prácticas L1-L4.
- Añadidos 16 retos expertos y carga en `index.html`.
- Añadidas respuestas del tutor para ACID, MVCC, planners, WAL y B-trees.
- Revisión conceptual: ACID no implica reglas de negocio correctas; MVCC no elimina locks; Serializable se formula por equivalencia serial; WAL se formula por orden de persistencia de información de recuperación; NoSQL no implica un único modelo ni ausencia de transacciones.
- Conteo esperado después de la integración: 71 rutas desarrolladas y 965 lecciones.

## Parte 73 — Bloque 072

- Estado previo verificado: 71 bloques desarrollados / 965 lecciones / 965 retos.
- Bloque 072 integrado: 16 lecciones y 16 retos expertos.
- Cobertura del índice: 10/10 temas explícitos del bloque 072, ampliados con memoria/E/S virtual, persistencia, seguridad, observabilidad y proyecto integrador.
- Auditoría objetivo tras integración: 72 bloques desarrollados / 981 lecciones / 981 retos, sin rutas ni IDs huérfanos.


## Parte 74 — Bloque 073: Cloud y Sistemas a Gran Escala

- Auditoría de entrada: Parte 73 íntegra antes de editar.
- Bloque nuevo: 16 lecciones, cada una con resumen, reglas, explicación profunda, ejemplo, check y prácticas 1–3; reto experto añadido como nivel 4.
- Se verifica correspondencia 1:1 lección↔reto, carga del script en `index.html`, sintaxis JS/MJS y ejecución de `tools/validate-content.mjs`.
- Revisión conceptual: Kubernetes se presenta como control plane + worker nodes y bucles de reconciliación; autoscaling como control loop con retardos; logs de cluster con lifecycle independiente; HA ligada a failure domains y no a cantidad bruta de réplicas.


## Parte 75 — Bloque 074: Performance Engineering

- Base de entrada: 73 bloques desarrollados / 997 lecciones / 997 retos.
- Bloque 074: 16 lecciones y 16 retos expertos añadidos.
- Revisión semántica: metodología y baseline antes de optimizar; profiling no equivale a causalidad; IPC/CPI dependen de contexto; misses se interpretan por nivel/coste; ancho de banda se separa de latencia; SIMD y threading se validan por speedup real; GPU incluye transferencias; I/O controla page cache/persistencia; latency y tail latency se tratan como distribuciones.
- Objetivo de auditoría: 74 bloques desarrollados / 1013 lecciones / 1013 retos, sintaxis y rutas limpias.


## Parte 76 — Bloque 075: Laboratorio de Sistemas Reales

- Base revalidada antes de ampliar: 74 bloques desarrollados / 1013 lecciones / 1013 retos.
- Bloque 075 añadido con 21 lecciones y 21 retos expertos, agrupados por sistemas completos y por trazado vertical.
- Se cubren todos los sistemas del índice: Git, Linux, Doom, Godot, Blender, SSD, GPU, Internet, consolas y modelos de lenguaje.
- Distinciones reforzadas: packfile ≠ objeto Git; /proc ≠ almacenamiento persistente; BSP ≠ z-buffer; WAD ≠ motor; SceneTree ≠ Server; mesh base ≠ geometría evaluada; LBA ≠ página NAND fija; occupancy ≠ throughput; BGP ≠ shortest path físico; quantization ≠ speedup garantizado.
- Objetivo de auditoría: 75 bloques / 1034 lecciones / 1034 retos, sintaxis, rutas e IDs limpios.


## Parte 77 — Bloque 076: Historia de la Computación

- Base revalidada antes de ampliar: 75 bloques desarrollados / 1034 lecciones / 1034 retos.
- Bloque 076 añadido con 26 lecciones y 26 retos expertos.
- Se cubren los 25 aprendizajes del índice y se añade un proyecto de síntesis causal.
- Se revisan atribuciones problemáticas: Babbage/diseño vs construcción, Lovelace/etiquetas, programa almacenado como desarrollo colectivo, “primer computador” condicionado por criterio, Internet distinto de ARPANET y Web, y categorías históricas no tratadas como fronteras universales.
- Objetivo de auditoría tras integración: **76 bloques / 1060 lecciones / 1060 retos**, sintaxis, rutas e IDs limpios.


## Parte 78 — Bloque 077: Filosofía y Metodología de Ingeniería

- Base revalidada antes de ampliar: 76 bloques desarrollados / 1060 lecciones / 1060 retos.
- Bloque 077 añadido con 19 lecciones y 19 retos expertos, cubriendo los 18 aprendizajes del índice y un proyecto de decisión de ingeniería auditable.
- Distinciones reforzadas: modelo ≠ realidad; abstracción ≠ implementación; supuesto documentado ≠ supuesto validado; medición precisa ≠ exacta; correlación ≠ causalidad; estándar ≠ implementación; paper ≠ generalización universal; reproducibilidad ≠ corrección; verificación ≠ validación.
- Auditoría objetivo: **77 bloques / 1079 lecciones / 1079 retos**, sintaxis, rutas e IDs limpios.

## Auditoría — infraestructura práctica

- Navegación `Laboratorio` presente en la entrada principal y en `/s3cr3t-cas3/`.
- `labs.js` cargado en ambas entradas.
- 5 laboratorios iniciales: JavaScript, Web, lógica, assembly educativo y compilador/VM USIC.
- Las lecciones compatibles reciben enlaces contextuales a laboratorios mediante `courseIds` y `LESSON_LABS`.
- JavaScript se ejecuta en Web Worker con timeout; el preview web usa iframe sandboxed.
- Assembly y compilador se identifican como máquinas educativas, evitando presentarlos como toolchains nativos.
- `node --check` pasa en todos los JS/MJS.
- `tools/validate-content.mjs` conserva 78 bloques en catálogo, 77 desarrollados y 1079 lecciones válidas.

## Ruta /s3cr3t-cas3/ — Proyecto NEXUS completo

- La subruta contiene el proyecto NEXUS v5 completo y autocontenido.
- Incluye `index.html`, `styles.css`, `script.js`, `README.txt` y los paquetes finales Windows/Linux.
- Los recursos se referencian de forma relativa, por lo que funcionan bajo `/s3cr3t-cas3/` sin depender de rutas de raíz.
- El ASCII solicitado permanece en el código fuente como comentario JavaScript y no se renderiza en la interfaz.


## Parte 79 — Auditoría final + Bloque 078

- Se completa el catálogo: 78 bloques desarrollados de 78.
- Bloque 078: 33 proyectos, uno por cada proyecto explícito de los niveles 1–6 del índice maestro.
- Total: 1112 lecciones y 1112 retos; correspondencia 1:1 validada.
- Se corrige el enlace contextual de laboratorios para aceptar una lista explícita por lección y evitar sugerencias genéricas en proyectos de integración.
- Se añade portabilidad del progreso (export/import/reset) y badge de repaso basado en errores reales.
- Se endurece NEXUS frente a `localStorage` corrupto y se verifican sus ZIP internos.
- Se añaden estilos de foco y `prefers-reduced-motion` en ambas interfaces.
