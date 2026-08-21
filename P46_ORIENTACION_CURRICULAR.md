# P46 — Orientación curricular no lineal

Esta versión añade una capa de orientación para que el alumnado pueda entrar por cualquier bloque o lección sin depender de haber recorrido el currículo en orden.

## Qué cambia

- Cada bloque muestra antes del temario sus bases recomendadas.
- Cada base enlaza a un repaso concreto sugerido, no solo al bloque genérico.
- Cada lección incorpora una sección «Antes de empezar» con:
  - posición dentro del módulo;
  - previo directo o lección puente cuando existe;
  - hasta tres bases curriculares recomendadas;
  - estado de los previos ya dominados;
  - enlace al inicio del módulo cuando se ha entrado por una lección intermedia;
  - instrucciones explícitas para usar los prerrequisitos como apoyo y no como bloqueo.
- Los bloques fundacionales se identifican como puntos de entrada autónomos.
- La recomendación de repaso dentro de una base prioriza la lección más relacionada léxicamente con el tema actual y cae al inicio del bloque si no hay suficiente señal.

## Filosofía pedagógica

Los prerrequisitos son orientación, no puertas cerradas. La interfaz anima a empezar por el tema elegido y regresar únicamente al concepto previo que falte. Esto permite recorridos no lineales sin ocultar dependencias reales.

## Validación

- 78 bloques.
- 1.112 lecciones.
- 1.112 referencias curriculares únicas.
- 0 lecciones huérfanas.
- 0 dependencias hacia bloques inexistentes.
- Las dependencias curriculares apuntan a bloques anteriores del mapa.
- 0 referencias locales rotas en `index.html`.
- Sintaxis JavaScript validada.
