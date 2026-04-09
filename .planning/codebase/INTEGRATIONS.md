# External Integrations

**Analysis Date:** 2026-04-03

## APIs & External Services

**Astrology Data:**
- Prokerala Astrology API - Used for Kundli and horoscope data.
  - Integration method: REST API.
  - Auth: Client ID and Secret in `PROKERALA_CLIENT_ID` / `PROKERALA_CLIENT_SECRET`.
  - Used by: `website`, `backend`.

**Automation:**
- n8n - Workflow automation and webhooks.
  - Integration method: Webhooks.
  - Auth: `N8N_WEBHOOK_SECRET`.

**Payment Processing:**
- Razorpay - Payment gateway for the mobile application.
  - SDK/Client: `react-native-razorpay`.
  - Used by: `mobile-app`.

**Push Notifications:**
- Expo Push Notifications - Sending notifications to mobile devices.
  - SDK/Client: `expo-notifications`, `expo-server-sdk`.
  - Used by: `backend`, `mobile-app`.

## Data Storage

**Databases:**
- Supabase (PostgreSQL) - Primary data store for the entire monorepo.
  - Connection: via `NEXT_PUBLIC_SUPABASE_URL` and keys.
  - Client: `@supabase/supabase-js`, `@supabase/ssr`.
  - Used by: All services.

## Authentication & Identity

**Auth Provider:**
- Supabase Auth - Handles user authentication.
  - Implementation: Supabase client SDK.
  - Used by: `website`, `admin-panel`, `mobile-app`.

## Environment Configuration

**Development:**
- Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `PROKERALA_CLIENT_ID`, `PROKERALA_CLIENT_SECRET`.
- Secrets location: `.env.local` (gitignored).

**Production:**
- Secrets management: Expected to be managed via CI/CD provider (e.g., GitHub Secrets, Vercel Env Vars).

## Webhooks & Callbacks

**Incoming:**
- n8n Webhooks - Incoming triggers for various automations.
  - Verification: `N8N_WEBHOOK_SECRET`.

---

*Integration audit: 2026-04-03*
*Update when adding/removing external services*
