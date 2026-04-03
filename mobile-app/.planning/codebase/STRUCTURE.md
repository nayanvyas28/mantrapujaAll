# Codebase Structure

**Analysis Date:** 2026-03-31

## Directory Layout

```
MP_App1-main/
├── .planning/          # GSD planning documents (Requirements, Roadmap)
│   └── codebase/       # Automated codebase mapping documents
├── app/                # Expo Router screens and file-based navigation
│   ├── (tabs)/         # Bottom tab navigation screens
│   ├── blogs/          # Blog listing and detail screens
│   ├── calendar/       # Festival and events calendar
│   ├── chatbot/        # AI Assistant UI
│   └── profile/        # User settings and support
├── assets/             # Images, fonts, and static media
├── backend/            # Potential server-side logic or edge functions
├── components/         # Shared UI components (Buttons, Modals, etc.)
├── constants/          # Static configuration and theme constants
├── context/            # React Context (Auth, Theme providers)
├── hooks/              # Custom React hooks (useAuth, useLocation)
├── services/           # External service logic (AI, Alarms)
├── supabase/           # Supabase client and database configuration
├── theme/              # Global styles and design system tokens
├── types/              # Global TypeScript interfaces and types
├── utils/              # General helper functions (date formatting, etc.)
├── app.json            # Expo configuration
└── package.json        # Project dependencies and scripts
```

## Directory Purposes

**app/**
- Purpose: Application screens and routing structure.
- Contains: `*.tsx` screen files and `_layout.tsx` files.
- Key files: `_layout.tsx` (App core), `index.tsx` (Landing).

**components/**
- Purpose: Atomic and molecular UI components.
- Contains: Functional components used across multiple screens.

**services/**
- Purpose: Core business logic separated from the UI.
- Contains: `ai.ts` for AI integration and `AlarmService.ts` for background tasks.

**supabase/**
- Purpose: Database and authentication configuration.
- Contains: Client initialization and potentially SQL migrations.

## Key File Locations

**Entry Points:**
- `app/_layout.tsx`: Root layout and provider wrapper.
- `app/index.tsx`: Initial route logic.

**Configuration:**
- `package.json`: Dependencies and scripts.
- `app.json`: Expo/Mobile specific configuration.
- `.env`: Environment variables (API keys, Supabase URLs).

**Core Logic:**
- `services/ai.ts`: Guru AI interaction logic.
- `services/AlarmService.ts`: Notification and alarm management.

## Naming Conventions

**Files:**
- `PascalCase.tsx`: React components and screens.
- `camelCase.ts`: Services, hooks, and utility modules.
- `kebab-case.md`: Documentation and planning files.

**Directories:**
- `kebab-case`: General directories.
- `(tabs)`: Expo Router special group directories.

---
*Structure analysis: 2026-03-31*
