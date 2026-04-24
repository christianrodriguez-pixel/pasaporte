
# Pasaporte Joven

Pasaporte Joven es una app para juventudes de Tamaulipas.

Este repositorio ya no debe entenderse solo como un export de Figma Make. El objetivo del proyecto es convertir esta base en una `PWA mobile-first`, instalable, desplegable en Vercel y preparada para persistencia real de datos.

## Objetivo actual

- mejorar la UI
- limpiar la estructura del frontend
- preparar la base tecnica para PWA
- dejar el proyecto listo para evolucionar hacia backend y base de datos reales

## Stack actual

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router

## Archivos clave

- `src/app/App.tsx`
- `src/styles/theme.css`
- `vite.config.ts`
- `docs/technical-roadmap.md`
- `AGENTS.md`

## Desarrollo local

1. instalar dependencias con `npm install`
2. iniciar el proyecto con `npm run dev`
3. generar build con `npm run build`

## Deploy inicial para probar en telefono

1. subir este repositorio a GitHub
2. importar el repositorio en Vercel
3. usar la configuracion detectada de Vite:
   - build command: `npm run build`
   - output directory: `dist`
4. abrir la URL de Vercel en el telefono
5. instalar desde el navegador:
   - Android/Chrome: menu del navegador > Agregar a pantalla principal o Instalar app
   - iPhone/Safari: compartir > Agregar a pantalla de inicio

La app ya incluye una base PWA inicial: `manifest.webmanifest`, iconos de instalacion, `service worker` y reglas de Vercel para que las rutas internas funcionen al abrir o recargar.

## Direccion del producto

La meta de este proyecto es una PWA mobile-first, no una simple web app de demostracion.

Eso implica preparar progresivamente:

- instalacion en movil
- manifest
- service worker
- soporte offline parcial
- autenticacion
- persistencia real de datos
  
