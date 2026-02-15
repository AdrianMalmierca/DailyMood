# ShoppingOnline – Ionic + Angular E-Commerce Application
A modern e-commerce mobile/web application built with Angular (standalone architecture) and Ionic Framework, featuring reactive state management using Angular Signals, simulated checkout processing, stock control, favorites management, and persistent cart functionality.

This project demonstrates clean architecture principles, reactive UI patterns, modular component design, and professional frontend engineering practices.

## Features
### Product Catalog
1. Fetches products from a public API
2. Grid layout with responsive breakpoints
3. Product details page with full metadata
4. Reviews rendering
5. Currency formatting
6. Real stock display

### Favorites System
1. Add/remove products from favorites
2. Persistent storage via localStorage
3. Reactive state using Angular Signals
4. Favorites tab view

### Cart System
1. Add to cart from product card or detail page
2. Quantity increment/decrement
3. Stock limitation enforced
4. Disable add button when stock exhausted
5. Persistent cart state
6. Total price calculation (computed signal)
7. Total item count (computed signal)
8. Clear cart functionality

### Simulated Checkout
1. Async checkout simulation (network delay)
2. Randomized payment failure simulation (10%)
3. Order ID generation
4. Order history persistence
5. Purchase confirmation alert with:
    - Order number
    - Purchase date
    - Product breakdown
    - Total price

### Order System
1. Local order persistence
2. Generated UUID per order
3. Order history stored in localStorage

### Search
1. Client-side filtering
2. Case-insensitive search
3. Reactive search bar component

### Theme Toggle
1. Dark mode support
2. System preference detection
3. Manual toggle

### Persistent theme state
1. Mobile-First UI
2. Built with Ionic components
3. Tab-based navigation
4. Back button management
5. Responsive layout

## Architecture Overview
This application follows a clean, modular structure:

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

## State Management Strategy
The app uses Angular Signals for reactive state:
- signal() for internal mutable state
- computed() for derived values (total price, total items, favorite status)
- asReadonly() to expose immutable state externally

This eliminates the need for external state libraries (e.g., NgRx) while maintaining reactive correctness.

## Data Persistence
All persistent state is stored in localStorage:
- Favorites → favorites
- Cart → cart
- Orders → orders

No backend is currently implemented. The checkout process is simulated.

## Data Source
Products are fetched from: https://dummyjson.com/products
The API returns full product metadata including:
- Title
- Description
- Category
- Price
- Rating
- Stock
- Reviews
- Images
- Dimensions
- SKU
- Warranty
- Shipping info

## Tech Stack
1. Angular (Standalone Components)
2. Ionic Framework
3. TypeScript
4. RxJS (for HTTP)
5. Angular Signals
6. CSS Animations
7. localStorage persistence

## UI / UX Enhancements
1. Animated cart icon when adding product
2. Stock-aware disabled add button
3. Purchase confirmation modal
4. Loading spinners
5. Responsive grid
6. Clean component separation
7. Computed totals in real-time

## Simulated Backend Behavior
1. The checkout process simulates:
2. Network latency (1.5 seconds)
3. Random payment failure (10%)
4. Server-generated order ID
5. Order timestamp
6. Persistent order history

This mimics real backend flow without implementing MongoDB or REST APIs.

## Installation

1. Clone the repository
git clone https://github.com/AdrianMalmierca/DailyMood
```bash
cd shoppingOnline
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
ionic serve
```

Or using Angular CLI:
```bash
ng serve
```

## Build for Production
```
ionic build
```

## Important Configuration
To allow HTML rendering inside Ionic alerts (used in checkout confirmation), ensure this is enabled in main.ts:

provideIonicAngular({
  innerHTMLTemplatesEnabled: true
})

## Key Engineering Decisions
1. Why Angular Signals?
    - Lightweight reactive state
    - Eliminates boilerplate
    - Modern Angular best practice
    - Suitable for small-to-medium scale apps

2. Why localStorage?
    - Simple persistence layer
    - Ideal for frontend-only architecture
    - No backend required for portfolio demonstration

3. Why simulated checkout?
    - Demonstrates async flows
    - Shows domain separation (Cart vs Order)
    - Mimics production logic without backend overhead

## Potential Future Improvements
1. JWT-based authentication
2. Real backend (Node + Express + MongoDB)
3. Server-side stock validation
4. Payment gateway integration (Stripe)
5. Order history page
6. Route guards
7. HTTP interceptors
8. Environment-based API config
9. Unit and integration testing
10. Clean Architecture layering (Domain / Application / Infrastructure)

## Learning Outcomes Demonstrated
This project showcases:
- Component-driven architecture
- State management using Angular Signals
- Reactive UI updates
- Async flow handling
- Clean service separation
- Realistic e-commerce domain modeling
- UX enhancements
- Production-ready structure

## Author
Adrián Martín Malmierca

Computer Engineer & Mobile Applications Master's Student