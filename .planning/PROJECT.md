# Mantra Puja

## What This This

Mantra Puja is a comprehensive astrology and spiritual service platform comprising a customer-facing website, an administrative dashboard, and a feature-rich mobile application. The system provides personalized astrological insights (Kundli, daily horoscopes), spiritual services (Puja bookings, Prasad delivery), and an AI-powered conversational assistant (Guru AI).

## Core Value

To provide users with meaningful spiritual guidance and seamless access to traditional Vedic services through modern, high-fidelity digital interfaces.

## Requirements

### Validated

- ✓ **Multilingual Support** — Hindi and English localization implemented across web and mobile.
- ✓ **Astrological Data Integration** — Personalized Kundli and horoscope generation via Prokerala and AstrologyAPI.
- ✓ **Notification System** — Scheduled and automated push notifications via Expo and node-schedule.
- ✓ **Admin Control** — Centralized panel for managing users, notifications, and spiritual content.
- ✓ **Payment Integration** — Razorpay support for premium services on mobile.

### Active

- [ ] **Stabilize Monorepo Deployment** — Transition services from local development to production server.
- [ ] **Notification Manager Dashboard** — Finalize UI/API integration for administrative notification scheduling.
- [ ] **Bilingual Kundli Dashboard** — Ensure 100% dynamic translation for all Kundli reports and predictions.

### Out of Scope

- [N/A] — No specific exclusions defined yet.

## Context

The project is a monorepo built with a modern JavaScript/TypeScript stack (Next.js, Express, Expo). It utilizes Supabase for a unified database and authentication layer. The architecture relies on specialized external APIs for astrological data and automation (n8n).

## Constraints

- **Tech Stack**: Next.js 16.x / React 19.x / Express 5.x — Critical for maintaining performance and modern UI capabilities.
- **Dependency**: Supabase — The single source of truth for all project data and authentication.
- **Platform**: Multi-platform (Web, iOS, Android) — Requires consistent feature parity across different runtimes.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Monorepo Architecture | Ease of sharing types and configurations between services | ✓ Good |
| Supabase for Backend | Speed of development and robust real-time capabilities | ✓ Good |
| Expo for Mobile | Cross-platform efficiency and built-in notification support | ✓ Good |

---

*Last updated: 2026-04-03 after GSD Initialization*
