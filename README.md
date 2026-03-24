# DailyMood: ShoppingOnline — Ionic + Angular E-Commerce Application

![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=flat-square&logo=angular)
![Ionic](https://img.shields.io/badge/Ionic-7-3880FF?style=flat-square&logo=ionic)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![RxJS](https://img.shields.io/badge/RxJS-7-B7178C?style=flat-square&logo=reactivex)
![Angular Signals](https://img.shields.io/badge/Angular_Signals-✓-DD0031?style=flat-square&logo=angular)

A modern e-commerce mobile/web application built with Angular standalone architecture and Ionic Framework, featuring reactive state management via Angular Signals, simulated checkout processing, stock control, favorites management, and persistent cart functionality.

---

## Problem Statement

Modern e-commerce frontends require reactive state, persistent sessions, stock control, and a clean mobile-first UX — yet most demos either rely on heavyweight state libraries or skip persistence entirely.

ShoppingOnline solves this by:

- Managing global cart and favorites state with Angular Signals — no NgRx needed
- Persisting cart, favorites, and order history across sessions via localStorage
- Enforcing stock limits at the UI level to prevent over-ordering
- Simulating a full async checkout flow (latency, failure, order generation) without a backend

---

## Screenshots

### Home — Product Catalog
Full product grid fetched from DummyJSON API. Add to cart or favorites directly from the card.

![Home page](src/assets/home.png)

### Favorites
Products saved to favorites with persistent state across sessions.

![Favourites page](src/assets/favourites.png)

![Favourites empty](src/assets/favourites%20vacio.png)

### Cart
Full cart view with quantity controls, stock limits, and total calculation.

![Cart page](src/assets/carrito%20lleno.png)

Purchase confirmation modal with order ID, date, product breakdown, and total.

![Purchase confirmation](src/assets/compra.png)

![Cart empty](src/assets/carrito%20vacio.png)

### Search
Client-side filtering with case-insensitive, real-time matching.

![Search page](src/assets/search.png)

### Settings — Dark Mode
System preference detection with manual toggle.

![Settings page](src/assets/settings.png)

---

## Features

### Product Catalog
- Products fetched from the DummyJSON public API
- Responsive grid with breakpoints
- Detail page with full metadata: description, category, rating, stock, reviews, dimensions, SKU, warranty, and shipping info
- Currency formatting and real stock display

### Favorites System
- Add/remove from favorites
- Persistent via localStorage
- Reactive state with Angular Signals

### Cart System
- Add from product card or detail page
- Quantity increment/decrement with stock enforcement
- Add button disabled when stock exhausted
- Total price and item count via computed signals
- Persistent cart state and clear cart functionality

### Simulated Checkout
- 1.5s async network delay simulation
- 10% randomized payment failure
- UUID order ID generation
- Purchase confirmation alert with full order breakdown
- Order history persisted to localStorage

### Search
- Client-side, case-insensitive filtering
- Reactive search bar component

### Theme Toggle
- System preference detection
- Manual dark/light toggle with persistent state

---

## Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Angular (Standalone Components) | Modern component model, no NgModule boilerplate |
| UI | Ionic Framework | Mobile-first components, tab navigation, Capacitor-ready |
| Language | TypeScript | Type safety across the full app |
| State | Angular Signals | Reactive state without external libraries |
| HTTP | RxJS + HttpClient | Async data fetching from DummyJSON API |
| Persistence | localStorage | Simple, backend-free persistence layer |
| Styling | CSS Animations + Ionic styles | Cart feedback animation, responsive grid |

---

## Architecture Overview
```
src/app
│
├── interfaces/
│   └── product.ts
│
├── services/
│   ├── product.service.ts
│   ├── favourites.service.ts
│   ├── cart.service.ts
│   └── order.service.ts
│
├── components/
│   ├── product-card/
│   ├── product-list/
│   ├── detail/
│   ├── search-bar/
│   ├── header/
│   └── theme-toggle/
│
├── pages/
│   ├── home/
│   ├── search/
│   ├── favourites/
│   ├── cart/
│   ├── settings/
│   └── details/
│
└── tabs/
```

---

## State Management

The app uses Angular Signals exclusively — no NgRx, no BehaviorSubjects:

- `signal()` for internal mutable state (cart items, favorites list)
- `computed()` for derived values (total price, item count, favorite status)
- `asReadonly()` to expose immutable state to consuming components

All persistent state is synchronized with localStorage on every mutation:

| Key | Contents |
|-----|----------|
| `favorites` | Array of favorited product IDs |
| `cart` | Cart items with quantities |
| `orders` | Full order history |

---

## Installation
```bash
# Clone the repository
git clone https://github.com/AdrianMalmierca/DailyMood
cd DailyMood

# Install dependencies
npm install

# Start development server
ionic serve
```

Or using Angular CLI directly:
```bash
ng serve
```

### Build for Production
```bash
ionic build
```

### Important Configuration

To enable HTML rendering inside Ionic alerts (required for checkout confirmation), ensure this is set in `main.ts`:
```typescript
provideIonicAngular({
  innerHTMLTemplatesEnabled: true
})
```

---

## Data Source

Products are fetched from the [DummyJSON](https://dummyjson.com/products) public API, which returns full product metadata including title, description, category, price, rating, stock, reviews, images, dimensions, SKU, warranty, and shipping info.

---

## Key Engineering Decisions

### Why Angular Signals over NgRx?
Signals provide lightweight, built-in reactive state that eliminates the action/reducer/selector boilerplate NgRx requires. For a small-to-medium app, this is the modern Angular best practice — and it keeps the codebase approachable without sacrificing reactivity.

### Why localStorage for persistence?
A backend is unnecessary to demonstrate the domain logic that matters here: cart management, favorites, and order history. localStorage gives a clean persistence layer that survives page reloads while keeping the project frontend-only.

### Why simulate the checkout?
The goal is to demonstrate async flows and domain separation (Cart vs Order), not to wire up a payment gateway. Simulating network delay and random failure shows the same engineering patterns — loading states, error handling, confirmation flows — that a real backend integration would require.

---

## Future Improvements

### Short Term
- Order history page with full order details
- Route guards for protected pages
- HTTP interceptors for error handling
- Unit and integration tests

### Medium Term
- JWT-based authentication
- Real backend (Node + Express + MongoDB)
- Server-side stock validation
- Environment-based API configuration

### Long Term
- Stripe payment gateway integration
- Clean Architecture layering (Domain / Application / Infrastructure)
- Native mobile builds via Capacitor (Android + iOS)
- NgRx for larger-scale state if the app grows significantly

---

## What I Learned Building This

Ionic was new territory for me — until this project I had only built for pure web or pure mobile. What surprised me most was how naturally it integrates with Angular: the mental model is the same, the syntax is the same, and the extra Ionic components (`ion-button`, `ion-grid`, `ion-tabs`) slot in without friction.

The biggest design insight was understanding the signal/computed pattern as a replacement for service-based BehaviorSubjects. Once I stopped reaching for RxJS for local state and leaned on `computed()` for derived values, the code got noticeably cleaner.

I also learned to appreciate what a simulated backend buys you during development: the checkout flow taught me to think about async state (loading, success, failure) as first-class UI states — not just edge cases to handle after the happy path works.

---

## License

MIT — free to use, modify, and deploy.

---

## Author

**Adrián Martín Malmierca**  
Computer Engineer & Mobile Applications Master's Student  
[GitHub](https://github.com/AdrianMalmierca) · [LinkedIn](https://www.linkedin.com/in/adri%C3%A1n-mart%C3%ADn-malmierca-4aa6b0293/)

*Built as a portfolio project showcasing modern Angular patterns and mobile-first UI development.*