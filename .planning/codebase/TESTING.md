# Testing Patterns

**Analysis Date:** 2026-04-03

## Test Framework

**Runner:**
- No test runner (Jest/Vitest) is currently configured in the main workspaces.
- Standard `test` scripts in `package.json` point to `echo \"Error: no test specified\" && exit 1`.

## Test File Organization

**Location:**
- Proposed: `*.test.tsx` or `*.spec.ts` files alongside the source files.

**Naming:**
- Unit tests: `Component.test.tsx`.
- Integration tests: `api-route.test.ts`.

## Test Structure

**Suite Organization (Proposed):**
- Use `describe` blocks to group tests by component or function.
- Use `it` or `test` for individual test cases.

## Mocking

**Framework (Proposed):**
- Jest or Vitest for unit testing and mocking.
- `msw` for API mocking in the frontend.

## Coverage

**Requirements:**
- No coverage tracking enabled yet.

## Test Types

**Unit Tests:**
- Proposed for UI components and utility functions.

**Integration Tests:**
- Proposed for backend API routes and Supabase database interactions.

**E2E Tests:**
- Proposed for critical customer flows on `website` and `mobile-app`.

---

*Testing analysis: 2026-04-03*
*Update when test patterns change*
