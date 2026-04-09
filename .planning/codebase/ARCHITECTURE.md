# Architecture

**Analysis Date:** 2026-04-03

## Pattern Overview

**Overall:** Monorepo with Micro-services (Backend API, Admin Dashboard, Customer Website, Mobile App)

**Key Characteristics:**
- Dedicated backend for shared logic (Express).
- Separate Next.js apps for Admin and Website.
- Expo project for Mobile application.
- Shared Supabase instance for data and auth.
- Standard directory-based routing (Next.js App Router, Expo Router).

## Layers

**API Layer (Backend):**
- Purpose: Provides centralized business logic and external integrations.
- Contains: Route handlers, controllers, services.
- Location: `backend/src/`
- Depends on: Supabase, External APIs (Prokerala, n8n).
- Used by: `mobile-app`, `website`, `admin-panel`.

**UI Layer (Web):**
- Purpose: Customer-facing marketing and feature site.
- Contains: Next.js pages, components, context providers.
- Location: `website/src/`
- Depends on: `backend` API, Supabase.

**Admin Layer (Web):**
- Purpose: Management dashboard for system administrators.
- Contains: Next.js pages (App Router), dashboard components.
- Location: `admin-panel/app/`
- Depends on: `backend` API, Supabase SSR.

**Mobile Layer (Expo):**
- Purpose: Cross-platform mobile application experience.
- Contains: Expo routes, screens, shared components.
- Location: `mobile-app/app/`
- Depends on: `backend` API, Supabase, Razorpay.

## Data Flow

**Standard API Request:**

1. Client (Mobile/Web) makes a request to the `backend`.
2. `backend/src/routes/` matches the path and calls a Controller.
3. Controller (`backend/src/controllers/`) validates input and calls a Service.
4. Service (`backend/src/services/`) interacts with Supabase or External APIs.
5. Result is returned via Controller to the Client.

**State Management:**
- Server-side State: Managed primarily via Supabase (PostgreSQL).
- Client-side State (Web): React Context and Next.js state.
- Client-side State (Mobile): React Native state and hooks.

## Key Abstractions

**Controller:**
- Purpose: Handle HTTP request/response cycle.
- Example: `backend/src/controllers/settings.js`
- Pattern: Functional handlers.

**Service:**
- Purpose: Encapsulate business logic.
- Example: `backend/src/services/notification.js` (Inferred)
- Pattern: Business logic modules.

**Layout/Page:**
- Purpose: Next.js/Expo route definition and layout wrapping.
- Example: `admin-panel/app/dashboard/layout.tsx`

## Entry Points

**Backend API:**
- Location: `backend/src/index.js`
- Triggers: HTTP requests.

**Website:**
- Location: `website/src/app/page.tsx`
- Triggers: Browser landing.

**Admin Panel:**
- Location: `admin-panel/app/page.tsx`
- Triggers: Browser landing (Admin access).

**Mobile App:**
- Location: `mobile-app/app/index.tsx`
- Triggers: App launch.

## Error Handling

**Strategy:** 
- Backend: Middleware-based error handling (Standard Express pattern).
- Frontend: Next.js error boundaries and local try/catch blocks.

---

*Architecture analysis: 2026-04-03*
*Update when major patterns change*
