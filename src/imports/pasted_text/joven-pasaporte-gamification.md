Trabaja sobre el prototipo actual de “Pasaporte Joven” y crea una segunda iteración para integrar una capa de gamificación basada en PUNTOS, sin romper la arquitectura, la navegación, el estilo visual ni los componentes ya construidos.

Conserva:
- la paleta de colores adjunta
- la tipografía adjunta: Encode Sans
- los logos y assets adjuntos
- la estructura general del producto ya existente
- la navegación inferior actual:
Inicio / Beneficios / Mi Pasaporte / Explora / Perfil

No rediseñes la app desde cero.
No cambies la identidad principal.
No alteres innecesariamente los layouts que ya existen.
La tarea es extender el sistema actual con una capa de puntos, retos, check-in y canje, manteniendo total coherencia visual y funcional.

Dirección visual:
Mantén la misma línea de la primera iteración:
- móvil
- limpia
- sobria
- joven
- institucional moderna
- con tintes sutiles de materialidad tipo glass:
superficies ligeras, blur suave, profundidad mínima, reflejos discretos y jerarquía clara
Todo debe seguir viéndose premium, claro y contenido.
La gamificación no debe parecer juego infantil, casino ni app de compras agresiva.
Debe sentirse integrada al ecosistema de Pasaporte Joven.

Objetivo funcional:
Agregar un sistema de PUNTOS que permita:
- reclamar puntos diarios
- acumular puntos por acciones dentro de la app
- ganar puntos por asistencia a actividades o eventos mediante check-in
- visualizar saldo, racha, retos y progreso
- canjear puntos por beneficios o recompensas

Tipos de acciones que generan puntos:
- reclamar recompensa diaria
- mantener racha de días
- asistir a eventos o actividades
- hacer check-in en espacios o actividades válidas
- usar ciertos beneficios
- completar retos
- explorar o guardar ciertos contenidos

Quiero que la integración se haga así:

1) Actualización de la pantalla de Inicio
Toma el Home actual y agrégale, sin romper su composición, un módulo superior o semisuperior de puntos.
Debe sentirse integrado al layout existente.

Este módulo debe incluir:
- saldo actual de puntos
- racha actual de días
- botón principal “Reclamar hoy”
- acceso secundario a “Mis retos”

Ejemplo de contenido visual:
“Tienes 420 puntos”
“Racha de 5 días”
“Reclama tus puntos de hoy”

El bloque debe ser compacto, protagónico pero no dominante.
Debe convivir bien con el resumen del pasaporte, beneficios y contenido existente.

También en Inicio agrega una pequeña sección de actividad o progreso con una o dos tarjetas tipo:
- “Haz check-in en una actividad y gana +25 puntos”
- “Completa 1 reto más para ganar +40 puntos”

2) Nueva pantalla: Mis puntos
Diseña una pantalla principal del sistema de puntos.

Debe incluir:
- saldo total de puntos
- resumen del progreso
- racha actual
- acceso a historial
- acceso a canjes
- acceso a retos
- diseño muy claro y escaneable

Debe sentirse como un centro de actividad personal.
No usar “monedero”.
Usar lenguaje de puntos.

3) Nueva pantalla: Reclamo diario
Diseña una experiencia de recompensa diaria sobria y satisfactoria.

Debe incluir:
- título claro
- recompensa del día en puntos
- botón principal para reclamar
- visual de racha de 7 días o calendario corto
- indicación del premio del siguiente día
- estado de éxito una vez reclamado

Debe sentirse gratificante, pero sin exageración.
Quiero microinteracción visual sugerida de incremento de puntos y confirmación elegante.

4) Nueva pantalla: Retos
Diseña una pantalla para agrupar acciones que generan puntos.

Usa tabs o segmentos como:
- Hoy
- Semana
- Especiales
- Logros

Cada tarjeta de reto debe mostrar:
- nombre del reto
- descripción breve
- puntos que otorga
- progreso si aplica
- CTA claro

Ejemplos:
- Haz check-in en una actividad: +25 pts
- Guarda una actividad: +5 pts
- Usa un beneficio esta semana: +30 pts
- Completa 3 actividades del mes: +80 pts

El diseño debe reutilizar el sistema de cards del producto actual.

5) Nueva pantalla: Check-in
Diseña una pantalla para registrar asistencia en eventos o actividades.

Debe incluir:
- nombre del evento o actividad
- fecha y hora
- ubicación o validación cercana
- opción de escanear QR
- opción de confirmar llegada si aplica
- puntos que se obtienen por el check-in

Debe ser una herramienta rápida y muy clara.
Puede tener una estructura simple y funcional.

6) Nueva pantalla: Check-in exitoso
Diseña una pantalla o modal de confirmación posterior al check-in.

Debe mostrar:
- mensaje de éxito
- puntos ganados
- nuevo saldo
- posibilidad de badge o logro desbloqueado
- CTA para ver retos
- CTA para seguir explorando

La emoción visual debe ser contenida, elegante y clara.

7) Actualización de la pantalla de Beneficios
Extiende la pantalla actual de Beneficios para integrar puntos sin rediseñarla.

Agrega en las cards y/o en el detalle:
- etiquetas como “Canjeable con puntos”
- etiquetas como “Gana puntos”
- costo en puntos cuando aplique
- ganancia en puntos cuando el uso del beneficio genere recompensa

Ejemplos:
- “Canjear por 120 puntos”
- “Úsalo y gana +15 pts”

Mantén la lógica visual actual de listado claro y escaneable.

8) Actualización del detalle de Beneficio
En la pantalla de detalle agrega variantes según el caso:

Variante A:
- beneficio normal que gana puntos al usarse

Variante B:
- beneficio que puede canjearse con puntos

Variante C:
- beneficio híbrido con descuento normal + mejora por puntos

Incluye:
- puntos que ganas o gastas
- estado del saldo disponible
- CTA como:
“Canjear con puntos”
“Usar y ganar puntos”
“Guardar beneficio”

No rompas la jerarquía ni la limpieza del detalle actual.

9) Actualización de Explora
Integra puntos en actividades, eventos y convocatorias donde aplique.

En cards y listados agrega badges discretos como:
- Gana +20 pts
- Check-in disponible
- Bonus especial

En el detalle de evento o actividad agrega:
- puntos por asistencia
- condición para obtenerlos
- CTA vinculado a check-in o asistencia

Todo debe sentirse natural dentro de Explora.

10) Actualización de Mi Pasaporte
Integra el sistema de puntos sin quitar protagonismo a la credencial digital.

Agrega:
- acceso a Check-in
- acceso a historial de actividad
- una pequeña referencia al saldo de puntos si visualmente encaja

El protagonista sigue siendo la credencial y el QR.
No saturar esta pantalla.

11) Actualización de Perfil
Agrega una sección breve de actividad y recompensas:
- saldo actual de puntos
- logros o insignias básicas
- historial
- acceso a Mis puntos

Debe quedar bien integrado al perfil actual.

12) Nueva pantalla: Canje de puntos
Diseña una pantalla para explorar recompensas canjeables.

Debe incluir:
- saldo disponible
- filtros
- lista de recompensas
- costo en puntos
- CTA de canje

Ejemplos de recompensas:
- descuento especial
- acceso preferente
- entrada gratuita
- beneficio desbloqueable
- recompensa promocional

Quiero una pantalla limpia, clara y confiable.

13) Nueva pantalla: Detalle de recompensa
Incluye:
- nombre de la recompensa
- imagen o marca
- costo en puntos
- descripción
- condiciones
- vigencia
- botón principal “Canjear”

Agregar estado de confirmación de canje.

14) Nueva pantalla: Historial de puntos
Diseña una pantalla con movimientos recientes.

Debe incluir:
- puntos ganados
- puntos gastados
- origen o motivo
- fecha
- resumen superior del saldo

Ejemplos:
+10 Reclamo diario
+25 Check-in en evento
-120 Canje de beneficio
+15 Uso de beneficio

Debe verse ordenada y fácil de entender.

15) Sistema de insignias / logros
Integra una capa ligera de logros visuales, no dominante.

Ejemplos:
- Primer check-in
- Racha de 7 días
- Participante activo
- Explorador cultural
- Ruta completada

Diseña una forma sobria de mostrarlos dentro de Perfil o Mis puntos.

Lineamientos UX:
- No agregar una pestaña nueva solo para gamificación
- Integrar puntos dentro de la experiencia existente
- Mantener navegación y arquitectura actuales
- Reutilizar componentes, espaciados y estilos ya creados
- Las nuevas pantallas deben parecer parte del mismo producto
- Priorizar claridad y escaneabilidad
- Mostrar el saldo de puntos de forma consistente pero no invasiva
- La lógica de puntos debe entenderse de inmediato
- Usar “Puntos”, “Racha”, “Retos”, “Canjear”, “Historial”, “Check-in”
- Evitar lenguaje que suene infantil o excesivamente lúdico

Lineamientos visuales:
- conservar el lenguaje visual actual
- introducir acentos visuales para puntos sin romper la paleta
- usar chips, badges y cards consistentes con el sistema existente
- diseñar iconografía o microindicadores para puntos y rachas
- no usar efectos exagerados
- no usar colores estridentes
- usar profundidad ligera, blur sutil y superficies limpias cuando aporten valor

Entrega esperada:
- actualización de Inicio
- actualización de Beneficios
- actualización de detalle de Beneficio
- actualización de Explora
- actualización de Mi Pasaporte
- actualización de Perfil
- nuevas pantallas:
Mis puntos
Reclamo diario
Retos
Check-in
Check-in exitoso
Canje de puntos
Detalle de recompensa
Historial de puntos

Además, actualiza el mini design system del archivo con:
- badge de puntos
- badge de racha
- card de reto
- card de recompensa
- módulo de saldo
- estilos de estados de check-in
- variantes de CTA para ganar/canjear puntos
- componentes reutilizables para esta segunda iteración

Quiero que esta iteración se vea como una evolución natural y sólida del producto existente, no como un rediseño paralelo.