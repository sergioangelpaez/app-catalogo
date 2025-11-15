# Catálogo de Productos - Prueba Técnica Frontend

## Descripción

Aplicación web de una sola página (SPA) desarrollada con React y TypeScript que permite visualizar un catálogo de productos. Incluye funcionalidades de búsqueda, filtrado por categoría, vista detallada de productos y carrito de compras.

## Características

- **Vista de Catálogo:** Lista de productos paginada, filtrado por categoría, rango de precios y búsqueda por nombre.
- **Vista de Detalle:** Información detallada de cada producto cen ruta dinámica `/products/:id`.
- **Carrito de Compras:** Visualización, edición y eliminación de productos seleccionados.
- **Optimización:** Paginación, manejo de estados de carga y error, renders optimizados con `useCallback` y `useMemo`.
- **Gestión de Estado:** Centralizada con `zustand`.
- **Ruteo:** Implementado con `React Router 7`.

## Tecnologías

- React
- TypeScript
- React Router 7
- Zustand
- Tailwind
- Fake Store API como fuente de datos (https://fakestoreapi.com/docs)

## Uso

1. Clonar el repositorio: `git clone https://github.com/sergioangelpaez/app-catalogo`
2. Instalar dependencias: `npm install`
3. Ejecutar el servidor de desarrollo: `npm run dev`
