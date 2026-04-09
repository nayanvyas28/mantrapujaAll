# Codebase Concerns

**Analysis Date:** 2026-03-31

## Tech Debt

**Monolithic Screen Components:**
- Issue: Screens like `app/login.tsx` (800+ lines) contain layout, logic, and multiple sub-views.
- Impact: Hard to maintain, slow to navigate/edit, high risk of regression.
- Fix approach: Extract sub-components to `components/login/` and move logic to custom hooks.

**Missing Test Suite:**
- Issue: No automated unit or integration tests for core logic.
- Impact: Regressions in astrology calculations or payment flows could go unnoticed until reported by users.
- Fix approach: Initialize Jest/Vitest and add tests for `services/` and `utils/`.

## Known Bugs / Maintenance

**Session Persistence (Historical):**
- Symptoms: Premature logouts due to aggressive session validation.
- Current mitigation: Stabilization fixes applied in recent milestones.
- Status: Monitor for "Hash Lock" regressions.

**Onboarding Experience:**
- Issue: Potential loops where users are asked for birth details repeatedly if persistence fails.
- Root cause: Race conditions between Supabase profile updates and local state hydration.

## Security Considerations

**Account Deletion:**
- Risk: Google Play Store requires mandatory account deletion for apps with account creation.
- Status: Implementation in progress/required for next release.
- Recommendations: Ensure all user data (profiles, saved preferences) is wiped from Supabase.

## Performance Bottlenecks

**Astrology Calculations:**
- Problem: Complex reports (Kundli, Panchang) can take ~2-5s to generate via external API.
- Impact: Perceived lag on calculator screens.
- Improvement path: Implement optimistic UI loading states and aggressive caching for static reports.

## Fragile Areas

**Prokerala API Integration:**
- Why fragile: Sensitive to OAuth2 token expiration and regional API availability.
- Common failures: 401 Unauthorized if token refresh fails.
- Safe modification: Encapsulate all API calls in a robust proxy/wrapper with automatic retries.

## Scaling Limits

**Supabase Free Tier:**
- Current capacity: 500MB DB / 1GB Storage.
- Limit: Will require upgrade if user base grows or high-res temple media is added.

---
*Concerns audit: 2026-03-31*
