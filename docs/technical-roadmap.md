# Pasaporte Joven: roadmap tecnico

## Decision principal del proyecto

Pasaporte Joven debe evolucionar de un prototipo exportado desde Figma Make a una `PWA mobile-first`, instalable, desplegable en Vercel, con UI de nivel producto y persistencia real de datos.

Esta decision cambia la prioridad tecnica del proyecto:

- no estamos construyendo solo una web app
- no estamos buscando solo un deploy visual
- estamos preparando una app instalable en telefono, con comportamiento consistente, soporte progresivo offline y base real para autenticacion y datos

## Estado actual

### Lo que ya existe

- frontend en `React + Vite`
- sistema visual fuerte y varias pantallas ya definidas
- navegacion mobile
- soporte para assets exportados desde Figma en [`vite.config.ts`](../vite.config.ts)
- una base de UI suficiente para iterar rapido
- base PWA inicial con `manifest.webmanifest`, iconos de instalacion, service worker y configuracion de Vercel para rutas SPA

### Lo que sigue siendo prototipo

- la app principal vive en [`src/app/App.tsx`](../src/app/App.tsx) y esta demasiado concentrada en un solo archivo
- hay estructura legacy en [`src/app/routes.tsx`](../src/app/routes.tsx) y `src/app/pages/`
- hay mocks mezclados con la UI
- la gamificacion persiste solo en memoria
- la estrategia offline es inicial y solo cubre app shell/assets basicos
- no hay autenticacion real
- no hay backend ni base de datos conectada

## Objetivo tecnico

Construir una PWA que:

- funcione primero para telefono
- se pueda instalar en dispositivos compatibles
- tenga identidad visual consistente y mantenible
- use persistencia real para datos clave
- soporte al menos un modo offline parcial
- se pueda desplegar en Vercel sin friccion

## Fases de trabajo

### Fase 1. Estabilizar la base frontend

- asegurar instalacion y build consistentes
- mantener compatibilidad con Vercel
- limpiar configuracion minima del proyecto
- reducir deuda tecnica obvia del export

### Fase 2. Convertir el prototipo en frontend mantenible

- extraer componentes desde `App.tsx`
- separar datos mock de la UI
- consolidar pantallas clave:
  - Home
  - Beneficios
  - Mi Pasaporte
  - Explora
  - Perfil
- unificar estilos, spacing, estados y comportamiento responsive

### Fase 3. Preparar la base PWA

- agregar `manifest.webmanifest`
- definir iconos de instalacion
- integrar `service worker`
- definir estrategia de cache
- validar instalabilidad
- preparar estados de red y experiencia de carga

### Fase 4. Persistencia y backend

- definir modelo de datos minimo viable
- agregar autenticacion
- conectar base de datos
- guardar informacion clave del usuario y uso de la app

### Fase 5. Calidad de producto

- estados vacios, errores y loading
- accesibilidad basica real
- pruebas criticas
- preparacion de despliegue continuo

## Arquitectura recomendada

La opcion recomendada hoy es:

- frontend y hosting: `Vercel`
- backend, auth y base de datos: `Supabase`

### Por que

- reduce complejidad para un proyecto que nacio como prototipo
- permite avanzar rapido en UI sin bloquear el backend
- encaja bien con una PWA frontend-first
- facilita autenticacion, storage y persistencia sin montar infraestructura propia

## Requisitos PWA que deben quedar claros

La app debe aspirar a:

- ser instalable desde navegador
- tener nombre, iconos y metadata correctos
- cargar con buen rendimiento en movil
- soportar una experiencia offline parcial
- mantener sesiones y datos clave de forma robusta
- tener una estrategia clara de actualizacion del cliente

## Datos que probablemente deben persistirse primero

- usuarios
- perfil
- intereses
- estado del pasaporte
- historial de uso
- beneficios guardados
- eventos o contenidos guardados
- progreso de gamificacion

## Principios de implementacion

- priorizar mobile-first
- no agregar complejidad backend antes de estabilizar UI y estructura
- evitar mas logica hardcodeada dentro de pantallas
- usar el router y APIs del framework en vez de hacks con `window`
- documentar decisiones importantes en `docs/`

## Siguiente objetivo recomendado

El siguiente bloque de trabajo debe ser:

- refactor inicial de [`src/app/App.tsx`](../src/app/App.tsx)
- mejora visual y estructural de `Home`
- mejora visual y estructural de `Mi Pasaporte`
- preparacion del proyecto para la fase PWA
