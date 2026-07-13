# Sweetly Found

A customer-facing storefront for an artisanal, hyperlocal bakery marketplace —
think "neighbors buying homemade bread and cakes from other neighbors."
Built as a front-end demo/prototype with **React 18, Vite, React Router,
Tailwind CSS, and lucide-react** icons. There is no backend: all data is
local mock data, and cart/account state lives in React Context for the
current browser session only.

This document explains what the project does, how it's organized, and what
every file is for, so you (or anyone else picking this up) can find and
extend anything quickly.

---

## Table of contents

1. [What this project is](#what-this-project-is)
2. [Tech stack](#tech-stack)
3. [Getting started](#getting-started)
4. [Folder structure at a glance](#folder-structure-at-a-glance)
5. [Pages — what each screen does](#pages--what-each-screen-does)
6. [Components — what each piece does and where to reuse it](#components--what-each-piece-does-and-where-to-reuse-it)
7. [Context (app-wide state) — Cart & Account](#context-app-wide-state--cart--account)
8. [Data layer (`src/data/products.js`)](#data-layer-srcdataproductsjs)
9. [Styling system](#styling-system)
10. [Routing map](#routing-map)
11. [Responsive design notes](#responsive-design-notes)
12. [Known limitations / what's mocked](#known-limitations--whats-mocked)
13. [Extending the project](#extending-the-project)

---

## What this project is

Sweetly Found lets a customer:

- Browse a **Home** page with featured bakers, trending products, and
  categories.
- Filter and browse a full product **Categories** page.
- View a single **Product Detail** page (gallery, story, allergens, related
  products).
- View a **Baker Profile** storefront (products, reviews, about).
- Add items to a **Cart**, apply a promo code, and go through **Checkout**
  (address, delivery slot, payment method).
- Track a live **Order** (status stepper + stylized delivery map) and see
  past orders.
- Manage **Account Settings** (profile, orders, addresses, payment methods,
  notifications).
- Learn about becoming a baker on the **Sell on Sweetly Found** page.

Everything is wired up and clickable — filters filter, quantity steppers
change totals, "Add to Cart" actually adds to a shared cart, checkout
"places" an order — but there is **no real backend, no payment processor,
and no persistence** between page reloads (see
[Known limitations](#known-limitations--whats-mocked)).

## Tech stack

| Piece | Choice | Notes |
|---|---|---|
| Framework | React 19 | function components + hooks only, no class components |
| Build tool | Vite 8 | `npm run dev` / `npm run build` / `npm run preview` |
| Routing | react-router-dom v7 | `BrowserRouter`, all routes declared in `src/App.jsx` |
| Styling | Tailwind CSS v3 | custom theme (colors/fonts/breakpoints) in `tailwind.config.js` |
| Icons | lucide-react | tree-shakeable icon components |
| State | React Context | `CartContext` and `AccountContext`, no Redux/Zustand |
| Linting | oxlint | `npm run lint` |

No backend, no database, no auth provider — this is a front-end-only
prototype.

## Getting started

```bash
npm install        # install dependencies
npm run dev         # start the local dev server (default: http://localhost:5173)
npm run build        # production build, output to /dist
npm run preview       # locally preview the production build
npm run lint          # run oxlint
```

## Folder structure at a glance

```
sweetly-found/
├── index.html                 Vite entry HTML — loads Google Fonts (Fraunces + Inter), mounts #root
├── vite.config.js             Vite + React plugin config
├── tailwind.config.js         Custom theme: colors, fonts, breakpoints, shadows, radii
├── postcss.config.js          Tailwind/Autoprefixer pipeline
├── package.json                Scripts + dependencies
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx                App entry point — mounts <App/> wrapped in AccountProvider + CartProvider
    ├── App.jsx                 Route table (react-router-dom)
    ├── index.css                Tailwind layers + shared utility classes (.btn-primary, .container-page, etc.)
    ├── context/
    │   ├── CartContext.jsx      Cart state: items, totals, toast notifications
    │   └── AccountContext.jsx   Saved addresses & payment methods
    ├── data/
    │   └── products.js          All mock data: bakers, products, orders, addresses, payment methods
    ├── components/               Shared, reusable UI building blocks
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── PhotoPlaceholder.jsx
    │   ├── QuantityStepper.jsx
    │   ├── StarRating.jsx
    │   ├── OrderSummary.jsx
    │   ├── CartToast.jsx
    │   ├── AddAddressForm.jsx
    │   └── AddCardForm.jsx
    └── pages/                    One file per route/screen
        ├── Home.jsx
        ├── Categories.jsx
        ├── ProductDetail.jsx
        ├── BakerProfile.jsx
        ├── SellOnSweetlyFound.jsx
        ├── Cart.jsx
        ├── Checkout.jsx
        ├── Orders.jsx
        └── AccountSettings.jsx
```

**Rule of thumb used throughout the project:** anything reused by 2+ pages
lives in `components/`; anything that's a full screen tied to a route lives
in `pages/`; anything that's just data lives in `data/`; anything that's
state shared across unrelated components lives in `context/`.

---

## Pages — what each screen does

Every page follows the same shell pattern:

```jsx
<div className="min-h-screen flex flex-col">
  <Navbar />         {/* + showSearch for pages with a search bar */}
  {/* page content, wrapped in <div className="container-page ..."> */}
  <Footer />
</div>
```

### `pages/Home.jsx` — route `/`
The landing page. Sections: hero with a search bar, a horizontally-scrollable
"Featured Bakers" row (with working prev/next arrows), a "Trending Now" product
grid (each card can be added to cart and "saved" with a heart toggle), a "Shop
by Category" icon row linking into `/categories`, and a "How it Works" 3-step
explainer.

### `pages/Categories.jsx` — route `/categories`
The full product listing/browsing page. Has a **collapsible filter sidebar**
(category checkboxes, price range slider, distance radio buttons, minimum
rating) — collapsed behind a "Filters" button on mobile, always visible on
desktop. Filtering, price range, and pagination are all live (derived from
`artisanalCakes` in the data layer). Each card has a working "Add to Box"
button wired to the cart.

### `pages/ProductDetail.jsx` — route `/product/:slug`
A single product page: image gallery with thumbnail switching, quantity
stepper, "Add to Cart", a "Save for Later" heart toggle, allergen/ingredient
tags, a "story" section, storage tips, and a "More from this baker" product
row. Currently always renders the one `productDetail` object from the data
file regardless of `:slug` — see [Known limitations](#known-limitations--whats-mocked).

### `pages/BakerProfile.jsx` — route `/baker/:slug`
A baker's public storefront. Looks up the baker by `:slug` in
`bakerProfiles` (an object keyed by slug in `data/products.js`) and redirects
to `/categories` if the slug doesn't exist. Has three tabs — **Products**
(grid with "Add to Box" buttons), **Reviews**, and **About** (hours, response
time, member since) — plus a Follow toggle and a Message button.

### `pages/SellOnSweetlyFound.jsx` — route `/sell-on-sweetly-found`
Marketing/onboarding page for prospective bakers: hero, a 4-item benefits
grid, a 3-step "How It Works for Bakers" section, a testimonial, and a final
call-to-action. "Start Selling Today" links to `/account` (stand-in for a
real signup flow).

### `pages/Cart.jsx` — route `/cart`
Shows everything currently in `CartContext`. Each line item has a quantity
stepper and a remove button. Includes a promo code field (`SWEET10` gives a
working example of success/error feedback — see limitations) and an
`OrderSummary` sidebar with a "Proceed to Checkout" button.

### `pages/Checkout.jsx` — route `/checkout`
A single-page checkout: delivery vs. pickup toggle, saved-address picker
(with an inline "Add new address" form), delivery time slot picker, saved
payment method picker (with an inline "Add new card" form), and a "Place
Order" button. Placing an order clears the cart, shows a success state, and
links to `/orders` or back to `/`.

### `pages/Orders.jsx` — route `/orders`
Order tracking & history. Shows one **active/live order** (from
`activeOrder` in the data file) with a 4-step status stepper (Placed → Baking
→ En Route → Delivered), an original illustrated SVG delivery map (not a
real map embed — see limitations) with a courier marker, the order's line
items and price breakdown, and the shipping address. Below that, a grid of
**past orders** (`pastOrders`). Has a "Help Center" button that opens an
inline contact panel (email/phone), and a "Message Baker" link into that
baker's profile.

### `pages/AccountSettings.jsx` — route `/account`
A tabbed account dashboard: **Profile** (name/email/phone/etc. form with a
"Saved ✓" confirmation), **Orders** (reads `orderHistory`, links out to the
live `/orders` page), **Addresses** (reads/writes via `AccountContext`, can
add/remove), **Payment Methods** (same, for cards), and **Notifications**
(a few toggle preferences, local-only).

---

## Components — what each piece does and where to reuse it

### `Navbar.jsx`
The global header, used at the top of every page (`<Navbar />` or
`<Navbar showSearch />` when the page has a search bar, e.g. Categories,
Product Detail, Baker Profile).

- **Desktop (`md:` and up):** logo, inline text nav (Home / Categories /
  Sell on Sweetly Found / Orders), search box (if `showSearch`), cart icon
  with item-count badge, account icon, and a "Login/Signup" button.
- **Mobile/tablet (below `md`):** a **three-dot (`⋮`, `MoreVertical`) button**
  next to the logo opens a full-height sliding drawer from the left
  containing the full nav list, Cart, and Account, plus a promo panel at the
  bottom with a "Login / Sign up" button. Closes on route change, outside
  click, or <kbd>Esc</kbd>, and locks body scroll while open.
  - **Implementation detail worth knowing:** the drawer and its backdrop are
    rendered via `createPortal(..., document.body)`, *not* as normal
    children of `<header>`. This is deliberate — the header has
    `backdrop-blur`, and `backdrop-filter` creates a new **containing
    block** for `position: fixed` descendants in WebKit/Safari. Without the
    portal, a "fixed, full-height" drawer nested inside a blurred header
    gets silently confined to the header's own small box on iOS instead of
    the full viewport. If you ever add another fixed/modal element near a
    `backdrop-blur` or `filter` ancestor anywhere in the app, use the same
    portal pattern.
- Props: `showSearch` (boolean, default `false`) shows the search input;
  `transparent` (boolean, default `false`) is a hook for a lighter header
  background if a page ever wants it.

### `Footer.jsx`
The global footer, used at the bottom of every page. Brand blurb + social
icons (hand-drawn inline SVGs — lucide-react no longer ships brand logos),
three link columns (Explore / Support), and a newsletter signup field
(local-only, `preventDefault`s). Stacks 1 → 2 → 4 columns responsively.

### `PhotoPlaceholder.jsx`
Renders real, free-to-use photography for a given **"tone"** (`bread`,
`pastry`, `cake`, `cookie`, `hero`, `person`, `courier`), each mapped to one
curated Unsplash-License photo URL in the `PHOTOS` object at the top of the
file. If an image ever fails to load, it falls back gracefully to a
matching CSS gradient (defined in `GRADIENTS`) so the layout never breaks.

Usage: `<PhotoPlaceholder tone="cake" className="w-full h-40 rounded-xl2" />`.
To swap in your own brand photography, just replace the URLs in the
`PHOTOS` map — every call site stays the same.

### `QuantityStepper.jsx`
A small "− [qty] +" control. Used in Cart line items and Product Detail.
Props: `value`, `onChange(newValue)`, `min` (default `1`), `size`
(`"sm"` or `"md"`).

### `StarRating.jsx`
Renders a 5-star rating row (filled/outline stars) with an optional numeric
value next to it. Used on Baker Profile (products, reviews) and anywhere a
rating needs to be shown. Props: `rating` (number), `size` (Tailwind
width/height classes, default `"w-3.5 h-3.5"`), `showValue` (boolean,
default `true`), `className`.

### `OrderSummary.jsx`
The reusable price-breakdown card (Subtotal / Delivery fee / Estimated tax /
Total) used in both **Cart** and **Checkout**. Takes the cart totals as
props plus two render slots — `children` (rendered between the breakdown and
the total, e.g. Cart's promo code field) and `cta` (rendered after the
total, e.g. the "Proceed to Checkout" / "Place Order" button) — and an
optional `note` string underneath. Sticks to the top of the viewport on
large screens only (`lg:sticky`).

### `CartToast.jsx`
A small toast notification ("Added X to your basket") that slides up from
the bottom of the screen. Reads `toast` from `CartContext` — you never call
this component directly; instead call `notify(message)` from `useCart()`
(or just call `addItem()`, which calls `notify` internally) and it'll appear
automatically. Mounted once, globally, in `App.jsx`.

### `AddAddressForm.jsx` / `AddCardForm.jsx`
Small inline forms used inside **Checkout** and **Account Settings** to add
a new saved address or card. Both are fully "controlled" (local `useState`
for form fields) and call back to the parent via `onSave(data)` /
`onCancel()` props — the parent is responsible for actually persisting the
result (both current call sites use `AccountContext`'s `addAddress` /
`addPaymentMethod`). `AddCardForm` does basic client-side validation (last-4
digits, `MM/YY` expiry format) before calling `onSave`.

---

## Context (app-wide state) — Cart & Account

Both providers are mounted once, in `main.jsx`, wrapping the whole app:

```jsx
<AccountProvider>
  <CartProvider>
    <App />
  </CartProvider>
</AccountProvider>
```

### `CartContext.jsx` — `useCart()`
Owns the shopping cart for the current browser session (in-memory only,
**not** persisted to localStorage — a refresh clears it).

| Returned value | Type | Description |
|---|---|---|
| `items` | array | `{ id, name, price, qty, tone, baker, ... }[]` |
| `addItem(product, qty=1)` | function | Adds a product (merges quantity if it's already in the cart) and shows a toast |
| `removeItem(id)` | function | Removes a line item entirely |
| `updateQty(id, qty)` | function | Sets a line item's quantity (removes it if it drops to 0) |
| `clearCart()` | function | Empties the cart (used after checkout) |
| `itemCount` / `subtotal` | number | Derived totals (memoized) |
| `deliveryFee` / `tax` / `total` | number | `deliveryFee` is a flat $4.99 once the cart isn't empty; `tax` is 7% of subtotal |
| `toast` / `notify(message)` | string\|null / function | Backing state for `CartToast` |

### `AccountContext.jsx` — `useAccount()`
Owns the signed-in user's saved addresses and payment methods (seeded from
`savedAddresses` / `savedPaymentMethods` in the data file, in-memory only).

| Returned value | Description |
|---|---|
| `addresses` / `addAddress(addr)` / `removeAddress(id)` | Saved shipping addresses |
| `paymentMethods` / `addPaymentMethod(pm)` / `removePaymentMethod(id)` | Saved cards |

Both hooks throw a clear error ("must be used within a ...Provider") if
called outside their provider, which should never happen since both wrap
the whole app — but it's a useful guard if you ever refactor.

---

## Data layer (`src/data/products.js`)

Everything the UI displays is plain JS data in this one file — there is no
API layer to swap out yet, just this module. Exports:

| Export | Used by | Shape |
|---|---|---|
| `featuredBakers` | Home | small baker cards (name, rating, tag, tone, slug) |
| `trendingProducts` | Home | product cards for the "Trending Now" row |
| `categories` | Home, Categories | category names + icon "tone" |
| `artisanalCakes` | Categories | the full filterable/paginated product list |
| `productDetail` | Product Detail | one full product record (gallery tones, story, allergens, related items) |
| `bakerProfiles` | Baker Profile | **object keyed by slug** — each value has products/reviews/about data |
| `savedAddresses` | Account Context (seed) | starting addresses before any are added in-session |
| `savedPaymentMethods` | Account Context (seed) | starting cards before any are added in-session |
| `orderHistory` | Account Settings (Orders tab) | list of past orders (id, date, baker, items, total, status) |
| `activeOrder` | Orders page | the one "live" order shown at `/orders`, including its status-stepper steps |
| `pastOrders` | Orders page | past-orders grid shown below the live order |

To point the app at real data later, this is the single file to replace
with real API calls (e.g. swap each `export const x = [...]` for a fetch +
`useEffect`/React Query, keeping the same shapes so components don't need
to change).

---

## Styling system

Everything is Tailwind utility classes — there's no CSS-in-JS and no
component library. Two files define the whole design system:

### `tailwind.config.js`
- **Breakpoints:** the default `sm`/`md`/`lg`/`xl`/`2xl`, plus a custom
  **`xs` breakpoint at 400px** for finer control between "small phone" and
  "tablet" than Tailwind's defaults allow.
- **Colors:** `maroon` (50–900, brand primary — `maroon-700` = `#6b1f38` is
  the main brand color) and `blush` (50–300, soft pink backgrounds/accents),
  plus a flat `cream` used for the header background.
- **Fonts:** `font-display` → Fraunces (serif, used for all headings via a
  global `h1,h2,h3,h4` rule in `index.css`), `font-sans` → Inter (body text).
  Both are loaded from Google Fonts in `index.html`.
- **Shadows/radii:** `shadow-card` / `shadow-cardHover` for the soft card
  elevation used everywhere, `rounded-xl2` (1.25rem) for card corners.

### `src/index.css`
Defines a handful of reusable utility classes so buttons and page containers
stay consistent everywhere instead of repeating long class strings:

- `.container-page` — the standard max-width + responsive side padding
  wrapper used on every page.
- `.btn-primary` / `.btn-outline` / `.btn-outline-maroon` — the three button
  styles used throughout (solid maroon, white outline for dark backgrounds,
  maroon outline for light backgrounds).
- `.no-scrollbar` — hides scrollbars on horizontally-scrollable rows
  (Home's featured bakers carousel, Account Settings' mobile tab bar) while
  keeping them scrollable.

---

## Routing map

Declared in `src/App.jsx`:

| Path | Page |
|---|---|
| `/` | Home |
| `/categories` | Categories |
| `/product/:slug` | ProductDetail *(slug currently unused — always shows the one mock product)* |
| `/baker/:slug` | BakerProfile *(slug looked up in `bakerProfiles`)* |
| `/sell-on-sweetly-found` | SellOnSweetlyFound |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/account` | AccountSettings |
| `/orders` | Orders |

`<CartToast />` is mounted once inside `<BrowserRouter>` in `App.jsx`, outside
any single page, so it can pop up over any screen.

---

## Responsive design notes

- Every page has been tuned per-breakpoint (not just scaled down) — smaller
  padding, smaller type, and simpler grids on phones rather than shrinking
  desktop layouts proportionally.
- The Categories filter sidebar collapses behind a "Filters" toggle button
  below `md`.
- Sticky sidebars (`OrderSummary`, the Orders page's order-details panel)
  only stick at `lg` and above — sticky positioning in a single mobile
  column can look/behave oddly.
- The mobile nav drawer (see `Navbar.jsx` above) is portaled to
  `document.body` specifically to avoid the `backdrop-filter` containing-block
  bug described there.

## Known limitations / what's mocked

Being upfront about what's *not* real, so nobody mistakes this for a
production-ready app:

- **No backend, no database, no auth.** Everything resets on page refresh.
  Cart and account data live only in React Context for the current tab.
- **No payment processing.** "Place Order" on Checkout just simulates a
  delay (`setTimeout`) and clears the cart — no Stripe/PayPal/etc. is wired
  up.
- **Product Detail ignores `:slug`.** The route accepts a slug but always
  renders the single `productDetail` mock object. To make it real, you'd
  key `productDetail` by slug the same way `bakerProfiles` already is.
- **The delivery "map" on the Orders page is an original illustrated SVG**,
  not a real Google Maps/Mapbox embed — there's no live courier GPS data
  behind it.
- **The `SWEET10` promo code on the Cart page** only shows a success/error
  message; it doesn't actually change the displayed total. Wire it into
  `CartContext` if you want it to affect pricing.
- **Photography** comes from a small, hand-curated set of free-to-use
  Unsplash photos (see `PhotoPlaceholder.jsx`), not a real product photo
  pipeline or CMS.
- **No tests.** There's no test suite (unit or e2e) included yet.

## Extending the project

A few natural next steps if you want to take this further:

1. **Wire up a real backend** — replace `src/data/products.js` with API
   calls (e.g. `fetch`/React Query), keeping the same data shapes so
   components don't need to change.
2. **Persist cart/account state** — add `localStorage` sync (or a real
   backend) to `CartContext`/`AccountContext` so a refresh doesn't lose the
   basket.
3. **Real auth** — the "Login/Signup" button currently just links to
   `/account`; swap in a real auth flow (and gate `/account`, `/checkout`,
   `/orders` behind it).
4. **Make Product Detail slug-aware**, the same way Baker Profile already
   looks up `bakerProfiles[slug]`.
5. **Real payments** — integrate Stripe (or similar) at the Checkout
   "Place Order" step.
