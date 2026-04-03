# Codebase Structure

**Analysis Date:** 2026-04-03

## Directory Layout

```
mantrapuja-all/
├── admin-panel/        # Management dashboard (Next.js)
│   ├── app/           # App Router pages and API routes
│   └── public/        # Static assets
├── backend/            # Shared Express API
│   ├── src/           # Source code
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
├── mobile-app/         # Expo/React Native application
│   ├── app/           # Expo Router screens and layouts
│   ├── assets/        # Mobile-specific assets
│   └── components/    # Shared mobile UI components
├── website/            # Customer-facing site (Next.js)
│   ├── src/           # Source code
│   │   ├── app/       # App Router pages
│   │   ├── components/# Web UI components
│   │   └── lib/       # Shared libraries
├── packages/           # Internal shared packages
│   └── shared/        # Shared types and logic
├── supabase/           # Database schema and migrations
└── .planning/          # GSD workflow context (Codebase map, Roadmap)
```

## Directory Purposes

**admin-panel/**
- Purpose: Administrative interface for project management.
- Contains: Next.js 16.x application using App Router.
- Key files: `app/page.tsx`, `app/dashboard/layout.tsx`.

**backend/**
- Purpose: Central API server providing business logic and third-party integrations.
- Contains: Express server implementing Controller-Service pattern.
- Key files: `src/index.js`, `src/routes/`.

**mobile-app/**
- Purpose: Cross-platform mobile app for iOS and Android.
- Contains: Expo 54.x project with Expo Router.
- Key files: `app/index.tsx`, `app/kundli.tsx`.

**website/**
- Purpose: Public-facing website for customers.
- Contains: Next.js 16.x application.
- Key files: `src/app/page.tsx`.

**packages/shared/**
- Purpose: Shared types and business logic used across workspaces.
- Contains: TypeScript definitions and shared utilities.

## Key File Locations

**Entry Points:**
- `backend/src/index.js`: Backend API entry.
- `website/src/app/page.tsx`: Website landing page.
- `admin-panel/app/page.tsx`: Admin login/landing.
- `mobile-app/app/index.tsx`: Mobile app entry.

**Configuration:**
- `.env.example`: Template for environment variables.
- `package.json`: Monorepo workspace configuration.
- `admin-panel/next.config.js`: Next.js configuration.

**Core Logic:**
- `backend/src/services/`: Shared business logic.
- `mobile-app/app/`: Primary mobile application flow.

## Naming Conventions

**Files:**
- PascalCase.tsx: React components.
- kebab-case.ts/js: Utility modules and route handlers.
- page.tsx/layout.tsx: Component-based routing (Next.js/Expo).

**Directories:**
- kebab-case: Feature and organizational directories.

## Where to Add New Code

**New API Endpoint:**
1. Define route in `backend/src/routes/`.
2. Implement logic in `backend/src/controllers/`.
3. Add business logic to `backend/src/services/` if needed.

**New Web Page:**
1. Create a directory in `website/src/app/` or `admin-panel/app/`.
2. Add `page.tsx`.

**New Mobile Screen:**
1. Create a file in `mobile-app/app/`.
2. Export a React component.

---

*Structure analysis: 2026-04-03*
*Update when directory structure changes*
