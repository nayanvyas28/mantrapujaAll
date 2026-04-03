# Technology Stack

**Analysis Date:** 2026-04-03

## Languages

**Primary:**
- TypeScript 5.x - Used in `website`, `admin-panel`, `mobile-app`, and `packages/shared`.
- JavaScript (CommonJS) - Used in `backend`.

**Secondary:**
- SQL - Supabase/PostgreSQL database.
- Batch (.bat) - Build and prebuild scripts in `mobile-app`.

## Runtime

**Environment:**
- Node.js - All application services.
- Expo / React Native - Mobile application runtime.
- Browser - `website` and `admin-panel`.

**Package Manager:**
- npm - Managed via a monorepo with `workspaces` in the root `package.json`.
- Lockfile: `package-lock.json` present.

## Frameworks

**Core:**
- Next.js 16.x - `website` and `admin-panel`.
- React 19.x - UI library for web components.
- Express 5.x - `backend` server.
- Expo 54.x - `mobile-app` framework.
- React Native 0.81.x - Mobile application core.

**Styling:**
- Tailwind CSS v4 - `website` and `admin-panel`.
- Lucide React / Lucide React Native - Icon libraries.
- Framer Motion - Animations in `website` and `admin-panel`.

**Testing:**
- No test suite detected (Standard templates present but no tests written).

**Build/Dev:**
- TypeScript compiler - used across all TS projects.
- Expo Router - Navigation in `mobile-app`.
- Next.js App Router - Navigation in `website` and `admin-panel`.

## Key Dependencies

**Critical:**
- @supabase/supabase-js - Database and Auth across all applications.
- axios - API client.
- react-native-razorpay - Payment integration in the mobile app.
- expo-notifications - Push notifications for the mobile app.
- node-schedule - Job scheduling in the backend.

**Infrastructure:**
- express - HTTP routing for the backend.
- expo-server-sdk - Sending notifications from the backend.

## Configuration

**Environment:**
- .env files - Root `.env.example`, `.env.local`.
- Environment variables are heavily used for Supabase and API credentials.

**Build:**
- `tsconfig.json` - in all TypeScript-based workspaces.
- `package.json` workspaces - manages internal dependency linking.

## Platform Requirements

**Development:**
- Windows (Current) - All development scripts (.bat) are Windows-specific.
- Node.js installed locally.

**Production:**
- Hosted Services - Likely Vercel for web/admin and a Cloud VPS/Docker for backend.
- Android/iOS - for the mobile application.

---

*Stack analysis: 2026-04-03*
*Update after major dependency changes*
