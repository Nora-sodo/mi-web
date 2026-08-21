# P39 — Limpieza de distribución

Esta versión elimina material que no participa en la ejecución ni es necesario para desplegar la web actual.

## Eliminado

- Informes históricos acumulados: `AUDIT.md`, `CONTENT_REVIEW.md`, `VISUALS_AND_READING.md`.
- Changelogs antiguos P35, P36, P37 y P38.
- Carpeta `tools/` de validadores internos de versiones anteriores.
- 78 archivos `content/block-XXX.js` y capas editoriales/intermedias (`challenges`, normalizadores y passes) ya compilados dentro de `content/course-content.bundle.js`.
- README histórico acumulativo, sustituido por instrucciones breves de la versión actual.

## Conservado deliberadamente

- Todo el runtime de la aplicación.
- El bundle completo con las 1.112 lecciones.
- Configuración y documentación de Supabase.
- Instrucciones de despliegue y `CNAME`.
- `SOURCES.md`, por trazabilidad de fuentes.
- `s3cr3t-cas3/`, incluidos los paquetes Windows/Linux, porque son parte funcional de NEXUS.

## Resultado

La limpieza reduce duplicación y ruido de mantenimiento sin retirar funcionalidades de la versión desplegable.
