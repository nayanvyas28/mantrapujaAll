# Requirements: Mantra Puja

**Defined:** 2026-04-03
**Core Value:** To provide users with meaningful spiritual guidance and seamless access to traditional Vedic services through modern, high-fidelity digital interfaces.

## v1 Requirements (GSD Initialization Milestone)

Requirements for the current execution phase and subsequent stabilization.

### Deployment & Infrastructure

- [ ] **DEPL-01**: Successfully transition the backend API from local development to a production server environment.
- [ ] **DEPL-02**: Standardize monorepo dependency structure for consistent builds across all workspaces.
- [ ] **DEPL-03**: Update environment variables across `website`, `admin-panel`, and `mobile-app` to point to the production server URL.

### Admin Dashboard (Notification Manager)

- [ ] **ADMN-01**: Resolve UI visibility issues in the "Notification Manager" dashboard.
- [ ] **ADMN-02**: Fix API synchronization between the admin panel and the Express backend for notification data.
- [ ] **ADMN-03**: Ensure the notification scheduler is correctly connected and operational across the monorepo architecture.

### Localization & Kundli Dashboard

- [ ] **LOCL-01**: Achieve 100% dynamic Hindi translation for all Kundli Astrology Dashboard content.
- [ ] **LOCL-02**: Implement a robust "Greedy Transformer" for complex astrological reports to eliminate hardcoded English strings.
- [ ] **LOCL-03**: Enforce cache invalidation on language toggles to trigger fresh localized API fetches.

## v2 Requirements (Future Roadmap)

### User Engagement

- **USER-01**: Implement user-saved Kundli profiles for quick access.
- **USER-02**: Add social sharing for astrological reports and festival greetings.

### Advanced Guru AI

- **GAI-01**: Enhance Guru AI with personalized recommendations based on the user's Kundli.
- **GAI-02**: Support voice-to-text for interacting with the AI assistant.

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce Payment on Web | Payments are currently mobile-first; web payments deferred to v2. |
| Custom LLM Training | Relying on existing high-quality LLMs for Guru AI to reduce complexity. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DEPL-01     | Phase 1 | Pending |
| DEPL-02     | Phase 1 | Pending |
| DEPL-03     | Phase 1 | Pending |
| ADMN-01     | Phase 2 | Pending |
| ADMN-02     | Phase 2 | Pending |
| ADMN-03     | Phase 2 | Pending |
| LOCL-01     | Phase 3 | Pending |
| LOCL-02     | Phase 3 | Pending |
| LOCL-03     | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-03*
*Last updated: 2026-04-03 after GSD Initialization*
