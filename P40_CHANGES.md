# USIC AURORA P40 — Interacción y accesibilidad

Esta pasada corrige defectos de interacción que podían pasar desapercibidos aunque la aplicación funcionase visualmente.

## Cambios
- Búsqueda: resultados convertidos en botones semánticos, sin `onclick` inline; mejor navegación por teclado.
- Búsqueda: `Ctrl/Cmd+K` ahora conserva y restaura correctamente el foco al cerrar.
- Búsqueda: se bloquea el scroll del documento mientras el diálogo modal está abierto.
- Tutor: `Esc` ahora cierra realmente el panel y devuelve el foco al control de origen.
- Menú móvil: al cerrarlo con `Esc`, el foco vuelve al botón de menú.
- Tarjetas dinámicas con `role="button"`: ahora responden a Enter y Espacio, no solo a clic/ratón.
- NEXUS: eliminado el `confirm()` nativo al reiniciar progreso; usa un diálogo integrado y accesible.

## Compatibilidad
No se modifican IDs de lecciones, progreso, rutas, Supabase ni los archivos descargables de NEXUS.
