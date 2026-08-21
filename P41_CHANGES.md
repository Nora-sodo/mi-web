# USIC Aurora P41 — Robustez y estado

## Correcciones realizadas

- Unificado el control del buscador: `app.js` es ahora la única fuente de verdad para abrir/cerrar y restaurar foco. `ui-p34.js` conserva únicamente el focus trap y las mejoras de teclado/móvil.
- `Ctrl/Cmd + K` funciona como conmutador real: abre la búsqueda si está cerrada y la cierra si ya estaba abierta.
- El tutor también queda contenido por focus trap cuando está abierto.
- Eliminado el cierre parcial del sidebar desde `app.js`; el controlador de UI mantiene sincronizados panel, backdrop, `nav-open` y `aria-expanded`.
- Corregido el estado inicial de usuarios nuevos: ya no aparecen 82 minutos ni una racha de 7 días de demostración. Los valores iniciales son 0/0.
- `localStorage` ya no puede romper la aplicación: si está bloqueado, lleno o no disponible, el estado sigue funcionando en memoria y se muestra un aviso no repetitivo.
- La importación de progreso usa `STORE.replaceState`, elimina IDs completados duplicados y descarta estructuras de actividad inválidas.
- Eliminadas variables heredadas sin uso del controlador P34.

## Validación

- Sintaxis comprobada en todos los JavaScript del paquete.
- 0 diálogos nativos `alert`, `prompt` o `confirm`.
- 0 IDs HTML duplicados en la aplicación principal.
- 0 referencias locales rotas en `index.html` y NEXUS.
- Manifest válido y recursos locales presentes.
- Se conservan contenido, Supabase, laboratorios, NEXUS y los ZIP Windows/Linux.
