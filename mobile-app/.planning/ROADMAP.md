# Roadmap: Mantra Puja

## Overview

The current milestone focuses on transitioning the Mantra Puja application from development to a production-ready state for the Google Play Store. This includes mandatory compliance features (account deletion), updated support infrastructure, and final metadata synchronization.

## Phases

- [ ] **Phase 1: Compliance & Support Updates** - Implement account deletion and update contact info.
- [ ] **Phase 2: Build & Versioning Sync** - Synchronize versions and prepare build metadata.
- [ ] **Phase 3: Media & Permission Finalization** - Audit audio permissions and background playback.
- [ ] **Phase 4: Production Verification** - Build testing and automated compliance audit.

## Phase Details

### Phase 1: Compliance & Support Updates
**Goal**: Meet Play Store mandatory requirements and update user support channels.
**Depends on**: Nothing
**Requirements**: [Account Deletion, Support Contact Update]
**Success Criteria**:
  1. User can initiate account deletion from the Profile screen.
  2. All user data is purged from Supabase upon deletion confirmation.
  3. Support screens show the updated email and phone numbers.
**Plans**: 2 plans

Plans:
- [ ] 01-01: Implement account deletion logic and UI.
- [ ] 01-02: Update support contact details across screens.

### Phase 2: Build & Versioning Sync
**Goal**: Ensure all build artifacts and metadata reflect version 1.0.1.
**Depends on**: Phase 1
**Requirements**: [Version Synchronization]
**Success Criteria**:
  1. `package.json` and `app.json` reflect version 1.0.1.
  2. Android build number is incremented correctly.
**Plans**: 1 plan

Plans:
- [ ] 02-01: Synchronize versions across package.json, app.json, and constants.

### Phase 3: Media & Permission Finalization
**Goal**: Ensure smooth audio experience and correct permission handling.
**Depends on**: Phase 2
**Requirements**: [Audio/Media Optimization]
**Success Criteria**:
  1. Audio continues playing in background if configured.
  2. Proper permission requests are triggered for audio/location features.
**Plans**: 1 plan

Plans:
- [ ] 03-01: Audit and fix audio permissions and background modes.

### Phase 4: Production Verification
**Goal**: Final build testing and submission readiness.
**Depends on**: Phase 3
**Success Criteria**:
  1. Successful APK/AAB build via EAS.
  2. No automated compliance errors in the build.
**Plans**: 1 plan

Plans:
- [ ] 04-01: Final build verification and compliance check.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Compliance & Support | 0/2 | Not started | - |
| 2. Build Sync | 0/1 | Not started | - |
| 3. Media Finalization | 0/1 | Not started | - |
| 4. Production Verification | 0/1 | Not started | - |

---
*Last updated: 2026-03-31 after GSD initialization*
