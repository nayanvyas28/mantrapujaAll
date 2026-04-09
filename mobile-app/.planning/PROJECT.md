# Mantra Puja

## What This Is

Mantra Puja is a comprehensive spiritual and astrological mobile application designed to bridge traditional Vedic practices with modern technology. It provides users with personalized astrology reports, temple discovery, guided pujas, and an AI-powered spiritual assistant ("Guru AI").

## Core Value

Providing a seamless, authentic, and accessible spiritual experience through personalized Vedic insights and digital puja services.

## Requirements

### Validated

- ✓ **Astrology Calculators** — Kundli, Panchang, Numerology, and Zodiac reports (Prokerala V2).
- ✓ **Temple Discovery** — Interactive map and details for Shakti Peeths and major temples.
- ✓ **Guru AI** — Spiritual guidance and q&a powered by LLM.
- ✓ **Puja/Prasad Services** — Integration for online booking and payments (Razorpay).
- ✓ **Multi-language Support** — i18next integration for regional accessibility.

### Active

- [ ] **Account Deletion** — Mandatory feature for Play Store compliance.
- [ ] **Support Contact Update** — Synchronize app-wide support details to mandated email and phone.
- [ ] **Version Synchronization** — Ensure app and build metadata are set to `1.0.1`.
- [ ] **Audio/Media Optimization** — Finalize audio permissions and background playback for mantras.

### Out of Scope

- **Real-time Video Consultations** — Deferred to future milestone to focus on automated calculators.
- **Physical Product Shipping** — Handled by third-party partners; app only handles booking/confirmation.

## Context

The app is built using **Expo and React Native**, leveraging **Supabase** for its backend. It has undergone multiple iterations focusing on data accuracy (map pins, astrology logic) and session stability. The immediate priority is finalizing the build for **Google Play Store submission**.

## Constraints

- **Tech Stack**: Expo SDK 54 / React Native 0.81.
- **Platform**: Cross-platform (iOS/Android), with immediate focus on Android Play Store.
- **API Limits**: Prokerala V2 rate limits and Supabase free-tier storage.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Expo Router | File-based routing simplifies navigation management. | ✓ Good |
| Supabase | All-in-one Auth/DB/Storage accelerated MVP development. | ✓ Good |
| Prokerala V2 | High data accuracy for Vedic astrology. | ✓ Good |

---
## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition**:
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions

---
*Last updated: 2026-03-31 after GSD initialization*
