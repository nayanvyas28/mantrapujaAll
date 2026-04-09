# Codebase Concerns

**Analysis Date:** 2026-04-03

## Tech Debt

**Monolithic Screen Components (Mobile):**
- Issue: `mobile-app/app/kundli.tsx` is very large (85KB) and likely contains mixed logic for UI, data fetching, and astrological calculations.
- Why: Rapid feature development for the Kundli dashboard.
- Impact: Hard to maintain, slow to test, and prone to regressions.
- Fix approach: Extract astrological logic into `packages/shared` or `mobile-app/utils/`, and break UI into smaller functional components.

**Windows-Specific Build Scripts:**
- Issue: The `mobile-app` uses `.bat` files for `start`, `android`, `ios`, and `prebuild` scripts.
- Why: Development environment is Windows.
- Impact: CI/CD pipelines (typically Linux-based) will fail to run these scripts without modification.
- Fix approach: Convert `.bat` scripts to cross-platform Node.js scripts or shell scripts (`.sh`).

## Known Bugs

**No active bugs detected during initial mapping.**

## Security Considerations

**Direct Supabase Client Usage:**
- Risk: Exposing database structure and potentially sensitive logic if RLS (Row Level Security) is not perfectly configured.
- Current mitigation: Supabase RLS is expected to be in place.
- Recommendations: Audit RLS policies for all tables and consider moving critical logic to the `backend` Express API.

## Performance Bottlenecks

**Large Component Rendering (Mobile):**
- Problem: `kundli.tsx` and `guru-ai.tsx` are large files that may cause performance lag on lower-end mobile devices during initial render.
- Measurement: Not measured yet, but file size (85KB for `kundli.tsx`) suggests complexity.
- Improvement path: Implement code splitting and lazy loading for heavy astrological report components.

## Fragile Areas

**Mobile Navigation/Layout:**
- Why fragile: Uses a nested Expo Router structure with both `(tabs)` and standalone screens.
- Safe modification: Carefully test deep linking and navigation state when adding new tabs or top-level screens.

## Missing Critical Features

**Automated Testing:**
- Problem: No unit, integration, or E2E tests detected in any workspace.
- Current workaround: Manual verification by the developer.
- Blocks: Rapid safe refactoring and confidence in backend/mobile logic.
- Implementation complexity: Medium (requires setting up Jest/Vitest and writing initial suites).

## Test Coverage Gaps

**Entire Codebase:**
- What's not tested: Everything.
- Risk: Critical regressions in astrological calculations or payment flows could go unnoticed.
- Priority: High.

---

*Concerns audit: 2026-04-03*
*Update as issues are fixed or new ones discovered*
