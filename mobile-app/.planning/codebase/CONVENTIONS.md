# Coding Conventions

**Analysis Date:** 2026-03-31

## Naming Patterns

**Files:**
- `PascalCase.tsx`: React components and screens (e.g., `Login.tsx`, `KundliForm.tsx`).
- `camelCase.ts`: Services, hooks, and utility modules (e.g., `ai.ts`, `useAuth.ts`).
- `kebab-case`: Feature directories (e.g., `guru-ai/`).

**Functions:**
- `camelCase`: Standard functions and async handlers.
- `useHookName`: Custom React hooks.
- `handleEventName`: UI event handlers (e.g., `handlePress`, `handleSubmit`).

**Variables:**
- `camelCase`: Local variables and component props.
- `UPPER_SNAKE_CASE`: Global constants and configuration (e.g., `SUPABASE_URL`).

**Types:**
- `PascalCase`: Interfaces and Type aliases (e.g., `UserData`, `AstrologyReport`).
- No `I`-prefix for interfaces.

## Code Style

**Formatting:**
- **Tool**: ESLint with `eslint-config-expo`.
- **Indentation**: 2 spaces (standard for React Native/Expo).
- **Quotes**: Single quotes preferred for strings.
- **Semicolons**: Required.

**Linting:**
- `eslint.config.js`: Modern flat config.
- Strict type checking enabled in `tsconfig.json`.

## Import Organization

**Order:**
1. **React/React Native Core**: `react`, `react-native`.
2. **External Packages**: `@supabase/supabase-js`, `expo-router`, etc.
3. **Internal - Services/Context**: `@/services`, `@/context`.
4. **Internal - Components**: `@/components`.
5. **Internal - Styles/Constants**: `@/theme`, `@/constants`.
6. **Relative Imports**: `./local-util`.

## Error Handling

**Patterns:**
- **Try/Catch**: Used in async service calls (Supabase, AI API).
- **Graceful Failures**: User-facing alerts for network or auth errors.
- **Early Returns**: Guard clauses for null/undefined check.

## Logging

**Framework:**
- `console.log`: Standard for development (usually stripped in production builds).
- (Pending: Custom logger implementation discovery).

## Module Design

**Exports:**
- **Default Exports**: Preferred for screen components and layouts in the `app/` directory (required by Expo Router).
- **Named Exports**: Preferred for utility functions, services, and shared UI components.

---
*Convention analysis: 2026-03-31*
