# Coding Conventions

**Analysis Date:** 2026-04-03

## Naming Patterns

**Files:**
- PascalCase.tsx - React components in `website`, `admin-panel`, and `mobile-app`.
- kebab-case.js/ts - Utility modules, services, and route handlers.
- index.js/ts - Main entry points for directories.

**Functions:**
- camelCase - for all functions and methods.
- handleEventName - for event handlers in React components (e.g., `handleUpdate`).

**Variables:**
- camelCase - for variables and parameters.
- UPPER_SNAKE_CASE - for constants and environment variable keys.

**Types:**
- PascalCase - for interfaces and type aliases.
- No 'I' prefix for interfaces.

## Code Style

**Formatting:**
- Prettier - used for consistent formatting across TypeScript projects.
- Standard Next.js / React Native defaults.

**Linting:**
- ESLint - configured in `website`, `admin-panel`, and `mobile-app`.
- Rules extend `eslint-config-next` and `expo`.

## Import Organization

**Order:**
1. React and third-party libraries (e.g., `react`, `lucide-react`, `@supabase/supabase-js`).
2. Internal shared packages (e.g., `packages/shared`).
3. Local components and hooks.
4. Styles or configuration files.

**Path Aliases:**
- `@/` - often used in Next.js projects for the `src` or `app` directory.

## Error Handling

**Patterns:**
- Try/Catch blocks - ubiquitous in both backend controllers and frontend event handlers.
- Error Boundaries - expected in Next.js/React components for robust UI error handling.

## Logging

**Framework:**
- `console.log` / `console.error` - used for development logging.
- No centralized logging service (like Pino or Winston) detected yet.

## Comments

**When to Comment:**
- Use comments to explain complex business logic or astrological calculations.
- Document environment variable dependencies.

---

*Convention analysis: 2026-04-03*
*Update when patterns change*
