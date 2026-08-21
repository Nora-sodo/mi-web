# USIC — Aurora

> Versión P41: pasada de robustez, persistencia y coherencia de interacción.

Versión de distribución limpia de la Universidad de Sistemas e Ingeniería Computacional.

## Ejecutar

Sirve esta carpeta con un servidor HTTP estático. Por ejemplo:

```bash
python3 -m http.server 8000
```

Después abre `http://localhost:8000/`.

No se recomienda abrir `index.html` directamente con `file://`, porque autenticación, rutas y algunos recursos web pueden comportarse de forma distinta.

## Archivos principales

- `index.html`: entrada de la aplicación.
- `style.css`: estilos.
- `data.js`: catálogo y metadatos de la formación.
- `content/course-content.bundle.js`: contenido formativo compilado (78 bloques / 1.112 lecciones).
- `resources.js`: recursos y lecturas.
- `labs.js`: laboratorios.
- `state.js`: progreso y persistencia local.
- `app.js`: lógica principal de la interfaz.
- `auth.js`: autenticación y cuenta.
- `supabase-config.js`: configuración pública del cliente Supabase.
- `ui-p34.js`: mejoras de interfaz heredadas que siguen activas.
- `site.webmanifest` y `favicon.svg`: metadatos instalables/identidad.
- `s3cr3t-cas3/`: experiencia NEXUS y sus dos paquetes finales; forma parte deliberada del producto.

## Supabase

Consulta `SUPABASE_SETUP.md` y `SUPABASE_SETUP.sql` para configurar autenticación, tablas y RLS.

## Despliegue

Consulta `GITHUB_DEPLOY.md`. El archivo `CNAME` se conserva para el dominio configurado actualmente.

## Fuentes

`SOURCES.md` conserva las referencias técnicas y bibliográficas usadas en el contenido.

## Nota de distribución

Esta edición elimina archivos históricos, validadores internos y fuentes intermedias de contenido que ya estaban compiladas en `content/course-content.bundle.js`. El objetivo es que el paquete contenga lo necesario para ejecutar y desplegar la versión actual sin duplicar varios megabytes de material de construcción.


## P46 — Orientación curricular no lineal

Cada bloque y cada lección incluyen ahora orientación de prerrequisitos y enlaces de repaso para poder entrar por cualquier punto del currículo sin depender de un recorrido lineal. Consulta `P46_ORIENTACION_CURRICULAR.md` para el detalle.
