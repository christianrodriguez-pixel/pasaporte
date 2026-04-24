Lo que hiciste antes no corresponde con lo solicitado. La sección actual quedó demasiado plana, uniforme y administrativa. No respeta la jerarquía visual esperada ni el estilo de iconografía, color y densidad que necesito.

Corrige únicamente el contenedor seleccionado y sus hijos directos.
No modifiques nada fuera de este bloque.
No cambies la hero card superior.
No cambies encabezado, navegación, layout global ni otras secciones.
Voy a pegar también una referencia visual del resultado esperado. Debes aproximarte a esa referencia.

OBJETIVO
Reconstruir esta sección como una fila de 4 quick action tiles premium, vivos, táctiles y con jerarquía clara.
La prioridad visual debe ser:
1. Reclamo
2. Retos
3. Canjear
4. Historial

ESTRUCTURA GENERAL
- Mantén 4 tiles en una sola fila.
- Cada tile debe ocupar el mismo ancho.
- Aumenta la altura visual respecto a la versión actual.
- Usa un grid o flex row con separación horizontal consistente.
- El contenido interno de cada tile debe estar centrado y bien espaciado.
- Cada tile debe tener esta estructura interna:
  1. slot superior para chip opcional
  2. icon wrapper
  3. title
  4. subtitle o status

LAYOUT TÉCNICO SUGERIDO
- display: grid
- grid-template-columns: repeat(4, 1fr)
- gap: 12px a 16px
- border-radius por tile: 22px a 26px
- padding interno por tile: 18px a 22px
- min-height aprox: 150px a 170px
- align-items: center
- justify-items: center
- text-align: center

ESTILO GENERAL DE LA SECCIÓN
- Fondo base de tiles: claro, cálido, limpio.
- Bordes: sutiles.
- Sombra: suave, difusa y elegante.
- Cada tile debe sentirse tocable.
- No quiero botones utilitarios genéricos.
- No quiero estética de dashboard administrativo.
- No quiero los 4 tiles con el mismo peso visual.
- No quiero uniformidad beige sin jerarquía.
- No quiero iconos pequeños o perdidos.

PALETA Y LÓGICA DE COLOR
Usa esta lógica:
- vino/rojo = acción, energía, hábito diario
- dorado = recompensa / valor / puntos
- crema / claro = base respirable
- neutro cálido = consulta secundaria

Distribución semántica:
- Reclamo: rojo / rosa / vino más fuerte
- Retos: rojo / vino activo
- Canjear: base clara con acento coral / rojo premium y, si hace falta, dorado mínimo como detalle
- Historial: neutro cálido / gris suave

ICONOGRAFÍA — REGLAS OBLIGATORIAS
No uses emoji.
No uses iconos minimalistas pequeños.
No uses outline simple como solución principal.
No uses una mezcla inconsistente de estilos.

Quiero una familia de iconos tipo micro-illustration premium o polished UI icons con:
- mayor tamaño que un icono estándar
- volumen ligero
- sombra suave
- color integrado
- acabado limpio
- consistencia entre los 4
- misma lógica de iluminación y detalle

Cada icono debe ir dentro de un icon wrapper visible.
El icon wrapper debe:
- tener tamaño mayor que un icono de dashboard estándar
- permitir fondo tonal o glow suave
- centrar el icono
- reforzar la jerarquía del tile

Tamaño sugerido:
- icon wrapper: 64px a 76px
- icono interno: 36px a 44px

TILE 1 — RECLAMO
Este tile debe ser el más llamativo y claramente el primero que el usuario quiere tocar.

Contenido:
- título: “Reclamo”
- subtítulo: “Reclama tus pts”
- chip: “Hoy”

Iconografía:
- icono: gift / reward box
- estilo: micro-illustration premium, con volumen ligero
- colores del icono: caja rojo/rosa saturado, detalles dorados en listón o brillo
- icon wrapper: circular o glow container con presencia alta
- el icono debe ser el más protagónico de los 4

Estilo visual del tile:
- fondo con leve tinte rosado/rojizo muy suave
- borde levemente rojizo
- sombra suave
- glow muy sutil alrededor del icon wrapper
- chip “Hoy” en esquina superior derecha
- subtítulo en tono rojizo más visible que el de los demás tiles

TILE 2 — RETOS
Debe sentirse activo y en progreso, pero menos dominante que Reclamo.

Contenido:
- título: “Retos”
- pill / status: “3 activos”

Iconografía:
- icono: target / bullseye con flecha
- estilo: ilustrativo, limpio, activo
- colores: rojo / vino / rosado con contraste interno
- icon wrapper: sutil, con menos glow que Reclamo

Estilo visual del tile:
- fondo claro
- acento vino/rojo moderado
- pill “3 activos” con fondo rosado claro y texto más intenso
- sensación de actividad en curso

TILE 3 — CANJEAR
Debe comunicar valor disponible, posibilidad de usar puntos y recompensa.

Contenido:
- título: “Canjear”
- subtítulo: “Desde 100 pts”

Iconografía:
- icono: ticket / reward pass / coupon
- estilo: sólido, claro, premium
- colores: coral / rojo premium / rosado intenso
- evitar fondo dorado dominante
- dorado solo como detalle menor si ayuda

Estilo visual del tile:
- fondo claro
- acento cromático más cálido
- subtítulo con tono más vivo que Historial
- sensación premium y de valor, no de promo barata

TILE 4 — HISTORIAL
Debe ser el más neutro y menos protagonista.

Contenido:
- título: “Historial”
- subtítulo: “Ver movimientos”

Iconografía:
- icono: clipboard / checklist / activity log
- estilo: más sobrio y más neutro
- colores: gris cálido / taupe / neutro suave
- icon wrapper más simple y menos ornamental

Estilo visual del tile:
- fondo claro
- sin acentos fuertes
- subtítulo en gris suave
- mantener coherencia con el sistema, pero con menor fuerza visual

JERARQUÍA VISUAL OBLIGATORIA
Haz que se perciba así:
- Reclamo = acción pendiente de hoy, más fuerte
- Retos = actividad activa
- Canjear = valor disponible
- Historial = consulta secundaria

TIPOGRAFÍA
- Título: más claro, con mejor peso visual
- Subtítulo/status: más pequeño
- Mejor contraste entre título y subtítulo
- Encode Sans o equivalente del sistema
- Evita títulos débiles o subtítulos demasiado apagados en Reclamo/Canjear

ESPACIADO INTERNO
- Más separación entre icon wrapper, título y subtítulo
- Más aire interior
- Evitar apretamiento vertical
- El chip “Hoy” y el pill “3 activos” deben quedar bien respirados y no encimarse con el icono

ESTADOS DE COMPONENTE
Deja los tiles listos visualmente para:
- default
- hover/focus
- pressed
No implementes animaciones exageradas, pero deja sugerido:
- pequeño lift al hover
- leve cambio de sombra al press
- glow o énfasis suave en el icon wrapper del tile activo

NO HACER
- No dejar los 4 tiles con el mismo tratamiento exacto
- No mantener iconos pequeños como los actuales
- No usar emoji
- No usar simple outline icon como solución principal
- No dejar la sección beige y uniforme
- No rediseñar nada fuera del contenedor seleccionado
- No cambiar el orden de las 4 acciones

RESULTADO ESPERADO
Una fila de 4 quick action tiles claramente más viva, más premium y más táctil, con:
- cards más altas
- iconos grandes y bien resueltos
- chip “Hoy” en Reclamo
- pill “3 activos” en Retos
- subtítulo “Desde 100 pts” en Canjear
- subtítulo gris en Historial
- jerarquía clara y coherencia con la referencia visual adjunta

Si necesitas rehacer la estructura interna de cada tile para lograrlo, hazlo dentro del contenedor seleccionado, sin afectar nada fuera de ese bloque.