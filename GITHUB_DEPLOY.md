# Publicar en GitHub Pages

Este directorio está preparado para publicarse como sitio estático en GitHub Pages con el dominio:

`dosonoprojects.top`

La ruta secreta queda incluida en:

`/s3cr3t-cas3/`

## Importante: los ZIP de NEXUS

Los archivos:

- `s3cr3t-cas3/ARCHIVO_151_WINDOWS.zip`
- `s3cr3t-cas3/ARCHIVO_151_LINUX.zip`

son archivos binarios grandes, pero cada uno está por debajo del límite de 100 MiB de GitHub para Git normal.

No los subas desde la interfaz web de GitHub: el navegador limita las cargas a 25 MiB por archivo. Súbelos mediante Git por terminal o GitHub Desktop.

No se usa Git LFS en este proyecto porque GitHub Pages no sirve sitios con archivos almacenados mediante Git LFS.

## Primera publicación por terminal

Desde esta carpeta:

```bash
git init
git add .
git commit -m "Publicar Universidad de Sistemas"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

Si el repositorio ya existe localmente, basta normalmente con:

```bash
git add .
git commit -m "Actualizar Universidad de Sistemas"
git push
```

## Activar GitHub Pages

En GitHub:

1. Abre `Settings` del repositorio.
2. Entra en `Pages`.
3. Elige publicación desde una rama.
4. Selecciona `main` y la carpeta `/ (root)`.
5. En `Custom domain`, usa `dosonoprojects.top`.
6. Activa `Enforce HTTPS` cuando GitHub permita hacerlo.

El archivo `CNAME` ya está incluido en la raíz para la publicación desde rama.

## DNS para el dominio raíz

Para un dominio apex como `dosonoprojects.top`, GitHub Pages requiere configurar el dominio también en el proveedor DNS. GitHub recomienda registros A hacia sus direcciones de Pages, o un ALIAS/ANAME compatible. Configura el dominio en Settings > Pages antes de tocar DNS para reducir el riesgo de secuestro del dominio.

## Verificación local rápida

Puedes probar el sitio con:

```bash
python3 -m http.server 8000
```

Después abre:

- `http://localhost:8000/`
- `http://localhost:8000/s3cr3t-cas3/`

## Nota sobre rutas

La web usa recursos relativos en la ruta secreta, por lo que `s3cr3t-cas3/index.html`, su CSS, JavaScript y los ZIP se resuelven desde esa carpeta al publicarse en el dominio.
