# Guidelines

## Direccion del producto

Pasaporte Joven debe diseniarse y desarrollarse como una `PWA mobile-first`.

No debe tratarse como una simple pagina web o demo exportada desde Figma. Toda decision de UI y arquitectura debe favorecer una experiencia instalable, clara y consistente en telefono.

## Criterios generales

- priorizar mobile-first
- mantener layouts claros y faciles de escanear
- refactorizar cuando una pantalla crezca demasiado
- separar UI, mocks y logica de negocio
- usar componentes reutilizables antes de duplicar codigo

## UI

La interfaz debe sentirse:

- joven
- confiable
- institucional moderna
- premium contenida
- limpia

Evitar:

- interfaces burocraticas
- pantallas saturadas
- exceso de efectos visuales
- decisiones que se vean bien solo en desktop

## Navegacion

- la experiencia principal es movil
- la navegacion inferior debe ser consistente
- `Mi Pasaporte` debe seguir siendo el eje visual y funcional del sistema

## PWA

Toda mejora futura debe considerar:

- instalacion en dispositivo
- buen comportamiento en movil
- tiempos de carga razonables
- estados sin conexion cuando aplique
- evolucion hacia cache y offline parcial

## Arquitectura

- evitar meter mas logica en `src/app/App.tsx`
- extraer componentes y secciones a archivos propios
- usar el router y sus APIs en vez de leer manualmente la URL
- documentar decisiones importantes en `docs/`
