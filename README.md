# Product Catalog – Frontend Technical Test

## Description

Single-page web application (SPA) built with React and TypeScript that displays a product catalog. It includes search functionality, category filtering, product detail view, and a shopping cart.

## Features

- **Catalog View:** Paginated product list, category filtering, price range filtering, and name-based search.
- **Detail View:** Detailed information for each product using the dynamic route `/products/:id`.
- **Shopping Cart:** View, edit, and remove selected products.
- **Optimization:** Pagination, loading and error state handling, optimized renders using `useCallback` and `useMemo`.
- **State Management:** Centralized via `zustand`.
- **Routing:** Implemented with `React Router 7`.

## Technologies

- React
- TypeScript
- React Router 7
- Zustand
- Tailwind
- Fake Store API as data source (https://fakestoreapi.com/docs)

## Usage

1. Clone the repository: `git clone https://github.com/sergioangelpaez/app-catalogo`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
