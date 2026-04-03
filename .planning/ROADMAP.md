# Roadmap: Mantra Puja

## Overview

This roadmap focuses on stabilizing the 'mantrapuja' monorepo for production delivery, finalizing the administrative notification management tools, and ensuring 100% bilingual accuracy for the Kundli Astrology Dashboard. Our journey moves from infrastructure reliability to feature completion and final polished localization.

## Phases

- [ ] **Phase 1: Infrastructure & Deployment** - Standardize monorepo and transition to production environment.
- [ ] **Phase 2: Administrative notification Tools** - Resolve UI/API synchronization issues for scheduling.
- [ ] **Phase 3: Deep localization (Kundli)** - Implement dynamic Hindi translation for all reports.

## Phase Details

### Phase 1: Infrastructure & Deployment
**Goal**: Core services are running reliably in a production-ready environment with unified dependencies.
**Depends on**: Nothing (Initialization phase)
**Requirements**: DEPL-01, DEPL-02, DEPL-03
**Success Criteria**:
  1. Backend API is accessible via a production URL.
  2. All workspaces (`website`, `admin`, `mobile`) build successfully without dependency conflicts.
  3. Environment variables are correctly mapped for production across all deployments.
**Plans**: 2 plans

Plans:
- [ ] 01-01: Standardize dependencies and package.json across monorepo.
- [ ] 01-02: Configure production environment and update cross-service URLs.

### Phase 2: Administrative Notification Tools
**Goal**: Administrators can reliably schedule and manage push notifications from the dashboard.
**Depends on**: Phase 1
**Requirements**: ADMN-01, ADMN-02, ADMN-03
**Success Criteria**:
  1. Notification Manager UI is fully visible and interactive in the Admin Panel.
  2. CRUD operations for notifications successfully sync with the Express backend.
  3. The `node-schedule` worker correctly processes and sends scheduled notifications.
**Plans**: 2 plans

Plans:
- [ ] 02-01: Fix Admin UI visibility and state management for notifications.
- [ ] 02-02: Connect Notification CRUD actions to backend API and scheduler.

### Phase 3: Deep Localization (Kundli)
**Goal**: The Kundli dashboard provides a perfect bilingual experience with no hardcoded fallbacks.
**Depends on**: Phase 2
**Requirements**: LOCL-01, LOCL-02, LOCL-03
**Success Criteria**:
  1. All 10+ report categories in the Kundli dashboard display correct Hindi content.
  2. The "Greedy Transformer" correctly maps complex API responses to localized strings.
  3. Language switching triggers immediate re-fetch and cache invalidation.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Refactor Kundli Dashboard to use the dynamic transformer for all labels.
- [ ] 03-02: Implement cache invalidation and final localization audit.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Infrastructure | 0/2 | Not started | - |
| 2. Admin Tools | 0/2 | Not started | - |
| 3. Deep Localization| 0/2 | Not started | - |

---

*Last updated: 2026-04-03 after GSD Initialization*
