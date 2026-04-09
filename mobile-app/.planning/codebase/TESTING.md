# Testing Patterns

**Analysis Date:** 2026-03-31

## Test Framework

**Runner:**
- (No official test runner like Jest or Vitest detected in `package.json`).

**Manual Verification:**
- Currently, the project relies on manual verification via Expo Go and development builds.
- Debug scripts (e.g., `test_festivals_debug.js`) are used for targeted logic validation.

## Test File Organization

**Location:**
- Debug scripts are currently located in the root directory.
- (Recommended: Move logic tests to `__tests__/` or collocate with source).

## Verification Strategy

**Development:**
- Local testing using Expo Go or native Dev Client.
- Iterative UI refinement based on visual feedback.

**Data Validation:**
- Standalone Node.js scripts for validating complex logic (e.g., festival dates, astrology calculations).

## Future Recommendations

**Unit Testing:**
- Implement **Jest** and **React Native Testing Library** for component and hook testing.
- Target: `services/`, `utils/`, and core `components/`.

**Integration Testing:**
- Use **Detox** or **Maestro** for end-to-end mobile testing.

---
*Testing analysis: 2026-03-31*
