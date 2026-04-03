# Architecture

**Analysis Date:** 2026-03-31

## Pattern Overview

**Overall:** Mobile Application (Expo/React Native) with File-based Routing and BaaS (Supabase).

**Key Characteristics:**
- **File-based Routing**: Expo Router (`app/` directory) for navigation.
- **BaaS Integration**: Supabase for authentication and real-time database.
- **Provider-Consumer Pattern**: Global state via React Context.
- **Service Layer**: Separation of concerns for external logic (AI, Alarms).

## Layers

**UI/Routing Layer (`app/`):**
- Purpose: Defines screens and navigation structure.
- Contains: `_layout.tsx`, `index.tsx`, Screen-specific components.
- Depends on: Hooks, Services, Components.

**Components Layer (`components/`):**
- Purpose: Reusable UI widgets and atomic elements.
- Contains: Buttons, Cards, Modals, Maps.

**Services Layer (`services/`):**
- Purpose: Business logic and external API communication.
- Contains: `ai.ts` (Chatbot/Guru AI), `AlarmService.ts` (Notification scheduling).

**State Layer (`context/`, `hooks/`):**
- Purpose: Global application state and reusable logic.
- Contains: `AuthContext`, `ThemeContext`, `useAuth`, `useLocation`.

**Data Layer (`utils/`, `supabase`):**
- Purpose: Data formatting, validation, and database schemas.
- Contains: Supabase Edge Functions (likely), Schema definitions.

## Data Flow

**User Interaction (e.g., Opening a Temple Detail):**

1. `app/(tabs)/explore/index.tsx` renders a list of temples.
2. User taps a temple → `router.push('/explore/[id]')`.
3. Screen component fetches data via `supabase` client in `useEffect` or custom hook.
4. UI updates with temple details, images, and maps.

**Auth Flow:**

1. `app/login.tsx` captures credentials.
2. Calls `supabase.auth.signInWithPassword()`.
3. `AuthContext` updates, triggering layout re-render.
4. `router.replace('/(tabs)')` redirects user to dashboard.

## Key Abstractions

**Provider Pattern:**
- Used in `app/_layout.tsx` to wrap the app in Auth/Theme/Query providers.

**Custom Hooks:**
- Abstractions over Supabase queries and Expo sensors (Location, Haptics).

## Entry Points

**Babel Entry:**
- `node_modules/expo-router/entry.js` (managed by Expo).

**App Layout:**
- `app/_layout.tsx` - App-wide providers, navigation themes, and splash screen management.

**Root Screen:**
- `app/index.tsx` - Initial landing or redirect logic (Intro vs. Dashboard).

## Error Handling

**Strategy:** Global Error Boundary (provided by Expo Router) + Per-view try/catch for async operations.

**Patterns:**
- Friendly alerts for network errors.
- Fallback UI for missing data (empty states).

---
*Architecture analysis: 2026-03-31*
