# AGENTS.md

## Proyecto

Pasaporte Joven es una app para juventudes de Tamaulipas.

Este proyecto nacio como un prototipo exportado desde Figma Make, pero la meta ya no es mantenerlo como demo visual. La meta es convertirlo en una `PWA mobile-first`, instalable, mantenible, desplegable en Vercel y preparada para persistencia real de datos.

## Regla mas importante

Toda decision tecnica debe respetar esta prioridad:

`Pasaporte Joven debe evolucionar a una PWA mobile-first con UI de nivel producto y base real para autenticacion, datos y despliegue.`

## Fuente de verdad actual

- la app activa vive en `src/app/App.tsx`
- `src/app/routes.tsx` y parte de `src/app/pages/` contienen estructura legacy
- si hay conflicto entre codigo legacy y runtime actual, priorizar el runtime actual

## Prioridades de trabajo

1. mejorar UI y experiencia mobile-first
2. reducir deuda tecnica del export desde Figma
3. separar componentes, mocks y logica
4. preparar base PWA
5. preparar backend y persistencia real

## Reglas para agentes

- no tratar este proyecto como una simple landing page
- no optimizar solo para desktop
- no asumir que basta con que "se vea bien en web"
- priorizar instalabilidad, estructura mantenible y experiencia movil
- reutilizar componentes antes de duplicar
- evitar meter mas logica de producto dentro de un solo archivo gigante
- preferir APIs del router sobre lecturas manuales de la URL
- documentar decisiones tecnicas importantes en `docs/`

## Diseno

La UI debe sentirse:

- joven
- clara
- premium contenida
- institucional moderna
- facil de escanear

Evitar:

- look burocratico
- sobrecarga visual
- efectos gratuitos
- inconsistencias entre pantallas principales

## Objetivo PWA

La app debe prepararse para:

- `manifest.webmanifest`
- iconos de instalacion
- `service worker`
- cache inteligente
- soporte offline parcial
- buena experiencia en movil e instalacion

## Backend recomendado

Cuando llegue la fase de producto real, la opcion preferida es:

- `Vercel` para frontend
- `Supabase` para auth, base de datos y storage

## Archivos clave

- `src/app/App.tsx`
- `src/styles/theme.css`
- `vite.config.ts`
- `package.json`
- `docs/technical-roadmap.md`

## Lo que no debe perderse de vista

Este proyecto ya no debe orientarse como un export de Figma. Debe orientarse como una PWA de producto, con evolucion gradual desde UI hacia arquitectura real.
