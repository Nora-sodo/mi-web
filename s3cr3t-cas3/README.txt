PROYECTO NEXUS // WEB v5

Abrir:
  index.html

Credenciales:
  Usuario: VARELA
  Unidad: 025
  Clave: NEXUS

Cambios principales:
- Los tres primeros archivos son ahora puzzles de investigación cruzada.
- Auditoría: 9 registros + reglas de sesión, edición y CRC.
- Mensajes: ordenar 8 fragmentos y extraer solo saltos temporales de +3 minutos.
- Catálogo: deducir la ficha por fórmula, ventana temporal y estado; construir número-índice-clase.
- Validaciones críticas con bloqueo anti-fuerza-bruta de 2 minutos.
- Errores de formato no penalizan.
- El bloqueo y el progreso sobreviven a recargas mediante localStorage.
- Descarga final para Windows y Linux incluida.

CONFIGURACIÓN:
Al principio de script.js está el objeto CONFIG.

  bloqueoMs: 2*60*1000

Durante pruebas puedes cambiarlo, por ejemplo, a:
  bloqueoMs: 2*1000
para que el bloqueo dure 2 segundos.

Descargas finales:
  ARCHIVO_151_WINDOWS.zip
  ARCHIVO_151_LINUX.zip

Para empezar de cero use “REINICIAR PROGRESO LOCAL” en el pie de la web.

- Excepción deliberada: ARCHIVO 07 penaliza cada candidato incorrecto con el bloqueo configurado, porque solo hay cuatro opciones y probar al azar eliminaría el razonamiento lógico.
