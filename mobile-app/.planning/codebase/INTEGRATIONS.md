# External Integrations

**Analysis Date:** 2026-03-31

## APIs & External Services

**Astrology Data:**
- **Prokerala V2 API** - Used for all astrology calculators (Panchang, Kundli, etc.)
  - Integration: REST API via proxy server
  - Auth: OAuth2 (Client Credentials)
  - Key features: V2 endpoints for detailed charts and reports

**Payment Processing:**
- **Razorpay** - One-time payments for puja services and consultations
  - SDK: `react-native-razorpay 2.3.1`
  - Integration: Native bridge for Android/iOS

**Automation:**
- **n8n** - Backend automation and content management workflows
  - Integration: Webhooks and REST API
  - Used for: God/Temple/Pooja data synchronization

## Data Storage

**Databases:**
- **Supabase (PostgreSQL)** - Primary data store for users, profiles, and app content
  - Client: `@supabase/supabase-js 2.97.0`
  - Key tables: `profiles`, `temples`, `gods`, `poojas`

**File Storage:**
- **Supabase Storage** - Media assets (images, audio)
  - Buckets: `temple-images`, `audio-mantras`

## Authentication & Identity

**Auth Provider:**
- **Supabase Auth** - Email/Password and potentially Social Auth
  - Implementation: Supabase client SDK
  - Token Management: Handled by `@supabase/supabase-js`

## Monitoring & Observability

**Error Tracking:**
- **Sentry/LogRocket** (implied common practice in Expo, but not explicitly in package.json - worth checking)

**Analytics:**
- (Pending discovery in codebase mapping)

## CI/CD & Deployment

**Hosting & Infrastructure:**
- **Expo Application Services (EAS)** - Cloud builds, versioning, and submissions
  - Profiles: `development`, `preview` (APK), `production` (Play Store)

## Webhooks & Callbacks

**Incoming:**
- **Razorpay Webhooks** - Used to confirm payment success server-side
- **n8n Callbacks** - For triggering app updates or notifications

---
*Integration audit: 2026-03-31*
