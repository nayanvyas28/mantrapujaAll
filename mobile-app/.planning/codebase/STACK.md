# Technology Stack

**Analysis Date:** 2026-03-31

## Languages

**Primary:**
- TypeScript 5.9.x - Application logic and components
- TSX/JSX - UI components and routing

**Secondary:**
- JavaScript - Configuration files and scripts
- Bash/PowerShell - Build and deployment scripts (`run.bat`, `prebuild.bat`)

## Runtime

**Environment:**
- Node.js (Version managed by Expo)
- React Native 0.81.5
- Expo 54.0.33

**Package Manager:**
- npm (package-lock.json present)
- Expo Application Services (EAS) for builds

## Frameworks

**Core:**
- **Expo Router 6.0.23**: File-based routing for React Native
- **React 19.1.0**: UI library
- **React Native 0.81.5**: Mobile foundation

**Testing:**
- ESLint: Code quality
- (No explicit testing framework detected in dependencies like Jest, though standard in Expo)

**Build/Dev:**
- **Expo CLI**: Development and building
- **TypeScript**: Type checking
- **EAS CLI**: Cloud builds and submissions

## Key Dependencies

**Critical:**
- **@supabase/supabase-js 2.97.0**: Backend-as-a-Service (Auth, Database)
- **expo-router**: Core navigation and deep linking
- **react-native-razorpay 2.3.1**: Payment gateway integration
- **i18next / react-i18next**: Internationalization (Multi-language support)
- **expo-av**: Audio and video playback

**Infrastructure:**
- **@react-native-async-storage/async-storage**: Local persistence
- **expo-location**: Geo-features (Shakti Peeth map, etc.)
- **lucide-react-native**: Vector icons

## Configuration

**Environment:**
- `.env`, `.env.local`: Environment variables (Supabase URL/Key, etc.)
- `app.json`: Expo project configuration

**Build:**
- `tsconfig.json`: TypeScript configuration
- `eas.json`: EAS build profiles
- `babel.config.js` (standard for Expo, likely present)

## Platform Requirements

**Development:**
- Node.js, Watchman
- Java SDK (for Android), Xcode (for iOS)
- Expo Go or Development Builds

**Production:**
- Android (APK/AAB) via EAS
- iOS (IPA) via EAS
- Supabase for backend services

---
*Stack analysis: 2026-03-31*
