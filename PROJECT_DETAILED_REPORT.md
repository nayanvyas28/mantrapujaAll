# 🕉️ MANTRA PUJA - COMPREHENSIVE PROJECT REPORT

**Date:** April 17, 2026  
**Status:** Partially Complete - Phase 2 Implementation Required  
**Team:** Nayan Vyas & Contributors

---

## 📑 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Connections & Data Flow](#connections--data-flow)
5. [Backend Routes](#backend-routes)
6. [Mobile App Details](#mobile-app-details)
7. [Admin Panel Details](#admin-panel-details)
8. [Database Schema](#database-schema)
9. [What's Missing](#whats-missing)
10. [Implementation Roadmap](#implementation-roadmap)
11. [Local Development](#local-development)
12. [Deployment Guide](#deployment-guide)

---

## 🎯 PROJECT OVERVIEW

### **Project Name:** Mantra Puja
### **Type:** Spiritual Platform (SaaS)
### **Purpose:** 
A comprehensive platform for booking Hindu pujas (rituals), astrology readings, and spiritual services online.

### **Core Features:**
- 📱 Mobile app for users (iOS/Android)
- 🖥️ Admin panel for management
- 🌐 Public website for marketing
- ⚙️ REST API backend
- 🔐 OTP-based authentication
- 📊 Real-time data management
- 📬 Push notifications
- 💬 Chat with astrologers

### **Target Users:**
1. **End Users** - People booking pujas & astrology
2. **Admins** - Managing platform content
3. **Astrologers** - Providing readings (future)
4. **Priests** - Managing puja schedules (future)

---

## 🏗️ ARCHITECTURE

### **Monorepo Structure (NPM Workspaces)**

```
mantrapujaAll/
│
├── 📱 mobile-app/
│   ├── app/                    # Expo Router (file-based routing)
│   ├── components/             # Reusable React Native components
│   ├── context/                # State management (Auth, Sidebar)
│   ├── constants/              # App configuration
│   ├── lib/                    # Utilities & helpers
│   ├── assets/                 # Images, fonts
│   ├── tailwind.config.js      # NativeWind styling
│   ├── package.json
│   └── expo.json
│
├── 🖥️ admin-panel/
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Dashboard page
│   │   ├── login/             # Login page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/               # UI components
│   ├── middleware.ts         # Authentication middleware
│   ├── next.config.ts
│   ├── postcss.config.mjs    # Tailwind setup
│   ├── tsconfig.json
│   └── package.json
│
├── ⚙️ backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── admin.js
│   │   │   ├── astrology.js
│   │   │   ├── chat.js
│   │   │   ├── music.js
│   │   │   └── pujas.js
│   │   ├── controllers/      # Business logic
│   │   ├── services/         # External services
│   │   │   └── notificationService.js
│   │   ├── utils/
│   │   │   └── supabase.js
│   │   └── index.js          # Main server file
│   ├── .env                  # Backend environment
│   ├── package.json
│   └── Dockerfile
│
├── 🌐 website/
│   ├── app/
│   ├── components/
│   ├── package.json
│   └── Dockerfile
│
├── 📦 packages/shared/
│   ├── types/
│   ├── utils/
│   └── package.json
│
├── Dockerfile                 # Multi-stage (website deployment)
├── package.json              # Root workspace config
└── .env.local                # Global environment variables
```

---

## 🔌 CONNECTIONS & DATA FLOW

### **System Architecture Diagram**

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│              │              │              │                    │
│   📱 MOBILE  │  🖥️ ADMIN    │  🌐 WEBSITE  │  📧 EMAIL USERS   │
│   (React     │  (Next.js    │  (Next.js    │  (Push Notif)    │
│   Native)    │  @3001)      │  @3000)      │                   │
└──────────────┴──────────────┴──────────────┴────────────────────┘
               │              │              │
               │              │              │
               └──────────────┼──────────────┘
                              │
                     ┌────────▼────────┐
                     │  ⚙️ BACKEND     │
                     │  (Express.js)   │
                     │  @4000          │
                     └────────┬────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
    ┌─────────────┐   ┌──────────────┐   ┌──────────────────┐
    │  Supabase   │   │ Push Notif   │   │  3rd Party APIs  │
    │ (PostgreSQL)│   │ (Expo SDK)   │   │  Astrology, SMS  │
    └─────────────┘   └──────────────┘   └──────────────────┘
```

### **API Communication Flow**

```
1. MOBILE APP REQUEST
   ├── Authenticates with OTP
   ├── Makes API call to Backend
   ├── Receives JSON response
   └── Updates local state/cache

2. ADMIN PANEL REQUEST
   ├── Server-side authentication (middleware)
   ├── Direct backend API calls
   └── Real-time data updates

3. BACKEND PROCESSING
   ├── Validates input
   ├── Queries Supabase
   ├── Processes business logic
   ├── Sends push notifications (if needed)
   └── Returns JSON response

4. DATABASE OPERATIONS
   ├── CRUD operations on PostgreSQL
   ├── Real-time subscriptions (Supabase)
   └── Audit logging
```

---

## ⚡ BACKEND ROUTES

### **Route Structure**

```
BASE URL: http://localhost:4000/api

├── /auth
│   ├── GET    /check-user              → Check if user exists
│   ├── POST   /register                → Register new user (OTP)
│   ├── POST   /verify-otp              → Verify OTP
│   ├── POST   /forgot-password         → Initiate password reset
│   ├── POST   /check-verification      → Check if phone verified
│   ├── POST   /verify-login-otp        → Login with OTP
│   └── POST   /update-profile          → Update user profile
│
├── /pujas
│   ├── GET    /                        → Get all pujas (filtered)
│   ├── GET    /categories              → Get puja categories
│   ├── POST   /book                    → Book a puja
│   ├── GET    /:id                     → Get puja details
│   └── DELETE /:id/cancel              → Cancel booking
│
├── /astrology
│   ├── POST   /proxy/:endpoint         → Proxy astrology API calls
│   ├── POST   /kundli                  → Get Kundli (birth chart)
│   └── GET    /predictions             → Get astrological predictions
│
├── /chat
│   ├── GET    /messages/:userId        → Get chat history
│   ├── POST   /messages                → Send message
│   ├── GET    /astrologers             → List available astrologers
│   └── POST   /start-session           → Start chat session
│
├── /music
│   ├── GET    /                        → Get all spiritual music
│   ├── GET    /categories              → Music categories
│   ├── POST   /playlist                → Create playlist
│   └── GET    /stream/:id              → Stream music
│
├── /admin
│   ├── GET    /dashboard               → Dashboard metrics
│   ├── POST   /users                   → Manage users
│   ├── POST   /pujas                   → Create/Edit pujas
│   ├── GET    /bookings                → View all bookings
│   └── POST   /settings                → System settings
│
└── /health
    └── GET    /                        → Health check (OK status)
```

### **Authentication Method: OTP-Based**

```javascript
// Flow:
1. User enters phone number
2. Backend generates OTP via Firebase/Twilio (NOT IMPLEMENTED)
3. User enters OTP
4. Backend verifies OTP
5. Supabase creates authenticated session
6. Token returned to client
7. Token used for subsequent API calls
```

---

## 📲 MOBILE APP DETAILS

### **Framework & Setup**

```json
{
  "framework": "React Native 0.76.9",
  "buildTool": "Expo 52.0.49",
  "routing": "Expo Router 4.0.17",
  "styling": "NativeWind 4.1.23 + Tailwind CSS 3.4.19",
  "targetPlatforms": ["iOS", "Android", "Web"],
  "languageVersion": "TypeScript 5.5.4"
}
```

### **Color Scheme (Hindu Spiritual Theme)**

```javascript
{
  primary: "#FF4D00",      // Vibrant Saffron (Sacred)
  secondary: "#FFD700",    // Gold (Prosperity)
  accent: "#8B0000",       // Deep Maroon (Tradition/Logo)
  
  saffron: {
    50: "#FFF7ED",
    100: "#FFEDD5",
    200: "#FED7AA",
    500: "#FF4D00"
  },
  
  glass: "rgba(255, 255, 255, 0.15)",  // Glass-morphism
  fontFamily: "Outfit"
}
```

### **App Structure & Navigation**

```
app/
├── _layout.tsx              # Root layout with auth/context providers
├── +not-found.tsx           # 404 page
├── +html.tsx                # Web specific setup
│
├── (auth)/                  # Authentication screens (route group)
│   ├── login/
│   ├── register/
│   └── _layout.tsx
│
├── (tabs)/                  # Main app screens (tab navigation)
│   ├── index.tsx            # Home/Dashboard
│   ├── pujas/               # Browse pujas
│   ├── profile/             # User profile
│   ├── bookings/            # My bookings
│   └── _layout.tsx
│
├── kundli/                  # Birth chart viewer
│   ├── [id].tsx             # Dynamic route
│   └── view.tsx
│
├── chat.tsx                 # Chat with astrologer
├── coming-soon.tsx          # Placeholder for future features
├── profile/                 # User profile management
├── modal.tsx                # Modal overlays
└── _layout.tsx              # Root layout wrapper
```

### **State Management**

```typescript
// Context API Usage:

1. AuthContext
   ├── user: User profile
   ├── isAuthenticated: Boolean
   ├── login(): Promise
   ├── logout(): Promise
   └── updateProfile(): Promise

2. SidebarContext
   ├── isOpen: Boolean
   ├── toggleSidebar(): void
   └── closeSidebar(): void

3. BookingContext (to be created)
   ├── bookings: Booking[]
   ├── addBooking(): Promise
   └── cancelBooking(): Promise
```

### **Key Dependencies**

| Package | Purpose |
|---------|---------|
| `@supabase/supabase-js` | Database & auth |
| `@react-navigation/native` | Navigation logic |
| `@expo/vector-icons` | Icon library |
| `axios` | HTTP client |
| `nativewind` | Tailwind for React Native |
| `react-native-reanimated` | Animations |
| `lucide-react-native` | UI icons |

---

## �️ MOBILE APP SITEMAP

### **Complete Navigation Structure**

```
MANTRA PUJA MOBILE APP
└── ROOT LAYOUT (_layout.tsx)
    ├── Providers:
    │   ├── AuthProvider (user state, login/logout)
    │   └── SidebarProvider (sidebar toggle)
    │
    ├── SPLASH SCREEN
    │   └── Shows logo + loading spinner
    │
    ├── AUTHENTICATION SCREENS (Protected Route)
    │   └── (auth)/ [Route Group]
    │       ├── login.tsx
    │       │   ├── Phone input
    │       │   ├── OTP verification
    │       │   └── Navigation: → (tabs) on success
    │       │
    │       └── signup.tsx
    │           ├── Phone number input
    │           ├── Full name input
    │           ├── OTP verification
    │           ├── Birthdate picker
    │           ├── Birthplace search
    │           └── Navigation: → (tabs) on success
    │
    ├── MAIN APP SCREENS (Tab Navigation)
    │   └── (tabs)/ [Route Group with Tab Bar]
    │       │
    │       ├── TAB 1: FEED (feed.tsx)
    │       │   ├── Icon: RSS Feed
    │       │   ├── Features:
    │       │   │   ├── Blog posts
    │       │   │   ├── Astrology tips
    │       │   │   ├── Puja guides
    │       │   │   └── Testimonials
    │       │   └── Navigation: → coming-soon (read more)
    │       │
    │       ├── TAB 2: PUJA (puja.tsx)
    │       │   ├── Icon: Sparkles ✨
    │       │   ├── Features:
    │       │   │   ├── Browse all pujas
    │       │   │   ├── Filter by category
    │       │   │   ├── Search functionality
    │       │   │   ├── Puja details card
    │       │   │   ├── Price display
    │       │   │   ├── Duration info
    │       │   │   ├── Star ratings
    │       │   │   └── "Book Now" button
    │       │   │
    │       │   ├── Sections:
    │       │   │   ├── Trending Pujas
    │       │   │   ├── By Category (Horizontal scroll)
    │       │   │   ├── Top Rated
    │       │   │   └── Recently Added
    │       │   │
    │       │   └── Navigation:
    │       │       ├── → puja/[id] (detailed view)
    │       │       ├── → coming-soon (book puja)
    │       │       └── → (auth)/login (if not authenticated)
    │       │
    │       ├── TAB 3: HOME (index.tsx) ⭐ CENTER TAB
    │       │   ├── Icon: Home 🏠 (Featured with bg circle)
    │       │   ├── Header:
    │       │   │   ├── Greeting (Hi, {firstName}!)
    │       │   │   ├── Menu button (opens sidebar)
    │       │   │   ├── Wallet icon
    │       │   │   ├── Notification bell
    │       │   │   └── Settings gear
    │       │   │
    │       │   ├── Features:
    │       │   │   ├── Auto-scrolling banners (4sec interval)
    │       │   │   ├── Featured services
    │       │   │   ├── Upcoming pujas section
    │       │   │   ├── Quick access cards:
    │       │   │   │   ├── Get Kundli
    │       │   │   │   ├── Chat with Astrologer
    │       │   │   │   ├── My Bookings
    │       │   │   │   └── Wallet balance
    │       │   │   │
    │       │   ├── Testimonials section
    │       │   │   ├── User reviews carousel
    │       │   │   ├── Star ratings
    │       │   │   └── Horizontal scroll
    │       │   │
    │       │   └── Navigation:
    │       │       ├── → kundli/ (get birth chart)
    │       │       ├── → chat (start chat)
    │       │       ├── → (tabs)/profile (view bookings)
    │       │       └── → Sidebar menu items
    │       │
    │       ├── TAB 4: ASTROLOGY (astro.tsx)
    │       │   ├── Icon: Layout 📐
    │       │   ├── Features:
    │       │   │   ├── Kundli generator form:
    │       │   │   │   ├── Date of birth picker
    │       │   │   │   ├── Time of birth picker
    │       │   │   │   ├── Place of birth search
    │       │   │   │   ├── Timezone auto-detect
    │       │   │   │   └── Submit button
    │       │   │   │
    │       │   ├── Results display:
    │       │   │   ├── Birth chart visualization
    │       │   │   ├── Planet positions
    │       │   │   ├── Sign information (Sun, Moon, Rising)
    │       │   │   ├── House positions
    │       │   │   ├── Nakshatras
    │       │   │   ├── Predictions
    │       │   │   └── Remedies suggestions
    │       │   │
    │       │   └── Navigation:
    │       │       ├── → kundli/[id] (detailed kundli view)
    │       │       ├── → chat (chat with astrologer)
    │       │       └── → coming-soon (premium features)
    │       │
    │       ├── TAB 5: MUSIC (music.tsx)
    │       │   ├── Icon: Play ▶️
    │       │   ├── Features:
    │       │   │   ├── Spiritual music library
    │       │   │   ├── Category filter:
    │       │   │   │   ├── Vedic chants
    │       │   │   │   ├── Devotional songs
    │       │   │   │   ├── Meditation music
    │       │   │   │   ├── Mantra recitations
    │       │   │   │   └── Background music
    │       │   │   │
    │       │   ├── Music player:
    │       │   │   ├── Now playing display
    │       │   │   ├── Album art
    │       │   │   ├── Artist name
    │       │   │   ├── Duration progress bar
    │       │   │   ├── Play/Pause controls
    │       │   │   ├── Next/Previous buttons
    │       │   │   ├── Volume control
    │       │   │   ├── Repeat mode toggle
    │       │   │   └── Shuffle toggle
    │       │   │
    │       │   ├── Playlist management:
    │       │   │   ├── Create playlist
    │       │   │   ├── Add to playlist
    │       │   │   ├── Favorite tracks
    │       │   │   └── Download for offline
    │       │   │
    │       │   └── Navigation:
    │       │       ├── → coming-soon (premium content)
    │       │       └── → (tabs)/profile (My playlists)
    │       │
    │       └── PROFILE REDIRECT (profile.tsx)
    │           └── Hidden from tabs (href: null)
    │           └── Accessible from sidebar/menu
    │
    ├── SECONDARY SCREENS (Not in tabs)
    │   │
    │   ├── KUNDLI DETAIL VIEW (kundli/)
    │   │   ├── [id].tsx (Dynamic route)
    │   │   │   ├── Shows full kundli details
    │   │   │   ├── Birth chart drawing
    │   │   │   ├── Planet positions table
    │   │   │   ├── Predictions text
    │   │   │   ├── Share button
    │   │   │   └── Download kundli button
    │   │   │
    │   │   └── view.tsx
    │   │       └── Alternative kundli view format
    │   │
    │   ├── CHAT SCREEN (chat.tsx)
    │   │   ├── Icon: Headphones 🎧
    │   │   ├── Features:
    │   │   │   ├── Chat history list
    │   │   │   ├── Message thread view
    │   │   │   ├── Astrologer profile card
    │   │   │   ├── Message input field
    │   │   │   ├── Send button
    │   │   │   ├── File/image attachment
    │   │   │   ├── Typing indicator
    │   │   │   ├── Message timestamps
    │   │   │   ├── Read/unread status
    │   │   │   ├── Astrologer availability
    │   │   │   ├── Rating display
    │   │   │   └── Call now button
    │   │   │
    │   │   ├── Chat UI:
    │   │   │   ├── Left bubble = User message
    │   │   │   ├── Right bubble = Astrologer message
    │   │   │   ├── Bottom input area
    │   │   │   ├── Keyboard handling
    │   │   │   └── Auto-scroll to latest message
    │   │   │
    │   │   └── Navigation:
    │   │       ├── → (tabs)/profile (view booking)
    │   │       ├── → coming-soon (video call)
    │   │       └── → (auth)/login (if not authenticated)
    │   │
    │   ├── COMING SOON PAGE (coming-soon.tsx)
    │   │   ├── Icon/Image placeholder
    │   │   ├── "Coming Soon" headline
    │   │   ├── Feature description
    │   │   ├── Estimated launch date
    │   │   ├── "Notify Me" button
    │   │   └── Back button
    │   │
    │   └── PROFILE SECTION (profile/)
    │       ├── edit-profile.tsx
    │       │   ├── Profile picture upload
    │       │   ├── Full name input
    │       │   ├── Email input
    │       │   ├── Phone number (read-only)
    │       │   ├── Gender selector
    │       │   ├── Date of birth
    │       │   ├── Birthtime
    │       │   ├── Birthplace
    │       │   ├── Language preference
    │       │   ├── Save changes button
    │       │   └── Delete account button
    │       │
    │       ├── wallet.tsx
    │       │   ├── Wallet balance display (big)
    │       │   ├── Add money button
    │       │   ├── Transaction history:
    │       │   │   ├── Date
    │       │   │   ├── Amount
    │       │   │   ├── Type (debit/credit)
    │       │   │   ├── Description
    │       │   │   └── Status
    │       │   │
    │       │   ├── Payment methods:
    │       │   │   ├── Credit card
    │       │   │   ├── Debit card
    │       │   │   ├── UPI
    │       │   │   ├── Net banking
    │       │   │   └── Wallet
    │       │   │
    │       │   └── Refund requests section
    │       │
    │       └── legal.tsx
    │           ├── Terms and Conditions
    │           ├── Privacy Policy
    │           ├── Return Policy
    │           ├── Cancellation Policy
    │           ├── Shipping Policy
    │           └── FAQ
    │
    ├── MODAL OVERLAYS (modal.tsx)
    │   ├── Alert dialogs
    │   ├── Confirmation modals
    │   ├── Input forms
    │   ├── Date/Time pickers
    │   ├── Bottom sheets
    │   └── Share sheet
    │
    └── ERROR PAGES
        ├── +not-found.tsx (404 page)
        ├── Back button
        └── Navigation to home
```

### **Navigation Flow Diagram**

```
┌─────────────────────────────────────────────────────┐
│              AUTHENTICATION FLOW                    │
└─────────────────────────────────────────────────────┘

NOT AUTHENTICATED:
    ↓
  Check Auth Status
    ↓
Show (auth) screen group
    ├── LOGIN/SIGNUP (Phone OTP)
    │   ├── Enter phone
    │   ├── Get OTP
    │   ├── Verify OTP
    │   └── Supabase session created
    │
    └── SUCCESS → REDIRECT TO (tabs)

AUTHENTICATED:
    ↓
Direct to (tabs) screen group
    ↓
Render Tab Navigation (5 tabs)

┌─────────────────────────────────────────────────────┐
│              TAB NAVIGATION FLOW                    │
└─────────────────────────────────────────────────────┘

┌─────────┬─────────┬─────────┬─────────┬─────────┐
│  FEED   │  PUJA   │  HOME   │ ASTRO   │ MUSIC   │
│  📰     │   ✨    │   🏠    │   📐    │   ▶️    │
└─────────┴─────────┴─────────┴─────────┴─────────┘

TAB BAR STYLE:
• Background: White (#FFFFFF)
• Active color: Saffron (#FF4D00)
• Inactive color: Gray (#94A3B8)
• Border radius: Rounded top (30px)
• Shadow: Elevated (elevation: 20)
• Height: 75px (with padding)

HOME TAB (CENTER):
• Special styling: Floating button effect
• Moves up 9px (-mt-9)
• When focused: Saffron background circle
• Larger icon (26px)
• When inactive: White background, bordered

┌─────────────────────────────────────────────────────┐
│          SIDEBAR NAVIGATION (Drawer)               │
└─────────────────────────────────────────────────────┘

SIDEBAR MENU (Slides from left):
├── 👤 My Profile
│   ├── → profile/edit-profile
│   ├── → profile/wallet
│   └── → My Bookings
│
├── 📅 My Bookings
│   └── → List of past/upcoming bookings
│
├── 💬 My Chats
│   └── → Chat list and threads
│
├── ⭐ My Favorites
│   └── → Saved pujas and astrologers
│
├── 💳 Wallet
│   └── → profile/wallet
│
├── 🎓 Learning
│   ├── → Blog posts
│   └── → Tutorials
│
├── ⚙️ Settings
│   ├── → Notification settings
│   ├── → Language preference
│   ├── → Theme (light/dark)
│   └── → Privacy settings
│
├── 📞 Support
│   ├── → FAQ
│   ├── → Contact us
│   └── → Report issue
│
├── 📋 Legal
│   └── → profile/legal
│
└── 🚪 Logout
    └── → Sign out

┌─────────────────────────────────────────────────────┐
│             DEEP LINKING (Routes)                  │
└─────────────────────────────────────────────────────┘

VALID DEEP LINKS:
• mantra-puja://home
• mantra-puja://puja
• mantra-puja://puja/[id]
• mantra-puja://astro
• mantra-puja://kundli/[id]
• mantra-puja://chat
• mantra-puja://music
• mantra-puja://profile
• mantra-puja://profile/edit
• mantra-puja://profile/wallet
• mantra-puja://login
• mantra-puja://signup
• mantra-puja://legal

┌─────────────────────────────────────────────────────┐
│          USER ACTION MAPPING                        │
└─────────────────────────────────────────────────────┘

HOME TAB ACTIONS:
├── Tap "Get Kundli" → kundli/ (astrology form)
├── Tap "Chat" → chat (astrologer list)
├── Tap "My Bookings" → profile (bookings list)
├── Tap "Wallet" → profile/wallet (balance)
├── Tap Notification Bell → coming-soon
├── Tap Settings → Sidebar > Settings
├── Tap Menu icon → Toggle Sidebar
├── Swipe from left → Open Sidebar
└── Tap anywhere else → Close Sidebar

PUJA TAB ACTIONS:
├── Browse pujas → Scroll/Swipe
├── Filter by category → Tap category chip
├── Search → Tap search icon
├── Tap puja card → coming-soon (booking)
├── Tap "Book Now" → (auth)/login OR coming-soon
└── Swipe to see more → Horizontal scroll

ASTRO TAB ACTIONS:
├── Fill birth details → Form validation
├── Tap "Get Kundli" → Calculate kundli
├── View results → Display chart + predictions
├── Tap "Chat with Astrologer" → chat screen
├── Tap results card → kundli/[id] (detail view)
└── Tap "Download" → Save as PDF

MUSIC TAB ACTIONS:
├── Tap category → Filter songs
├── Tap play button → Start playing
├── Tap song card → coming-soon (detail)
├── Tap heart → Add to favorites
├── Tap playlist button → Add to playlist
├── Drag progress bar → Seek
├── Tap repeat → Change repeat mode
├── Tap shuffle → Toggle shuffle
└── Long press → More options (download, share)

CHAT SCREEN ACTIONS:
├── Tap chat → Open conversation
├── Type message → Send message
├── Tap attachment → Upload file/image
├── Swipe message → Delete/Edit options
├── Tap astrologer name → View profile
├── Tap call button → coming-soon (video call)
└── Tap info icon → Booking details

PROFILE ACTIONS:
├── Tap edit → profile/edit-profile
├── Tap wallet → profile/wallet
├── Tap booking → Booking details
├── Tap legal → profile/legal
├── Tap logout → Sign out
└── Tap delete account → Confirmation modal

┌─────────────────────────────────────────────────────┐
│           DATA LOADING & CACHING                   │
└─────────────────────────────────────────────────────┘

HOME SCREEN:
• Load on mount (useEffect)
• Fetch: categories, banners, upcoming pujas, testimonials
• Cache: Local state (not persisted)
• Refresh: Pull-to-refresh (if implemented)

PUJA SCREEN:
• Load on mount
• Fetch: All pujas, categories
• Cache: Filter locally (no API call)
• Search: Real-time client-side search

ASTRO SCREEN:
• No initial data fetch
• Fetch on form submit (get kundli calculation)
• Cache: Store result in local state
• Supabase: Save to kundli_data table

MUSIC SCREEN:
• Load on mount
• Fetch: Music catalog
• Cache: List in memory
• Streaming: Direct from cloud storage

CHAT SCREEN:
• Load on mount
• Fetch: Message history
• Real-time: Listen for new messages (WebSocket - NOT YET)
• Cache: Message store in context

┌─────────────────────────────────────────────────────┐
│        RESPONSIVE BREAKPOINTS                      │
└─────────────────────────────────────────────────────┘

Mobile: < 768px (Primary target)
├── Single column layout
├── Full-width cards
├── Bottom tab navigation
└── Sidebar drawer

Tablet: 768px - 1024px
├── Two column layout (where applicable)
├── Larger touch targets
└── Same navigation

Web (Expo Web): > 1024px
├── Desktop layout
├── Mouse/keyboard support
├── May switch to different UI
└── Same data models

┌─────────────────────────────────────────────────────┐
│       LOADING STATES & ANIMATIONS                  │
└─────────────────────────────────────────────────────┘

LOADING SKELETON:
├── Banner skeleton (animated)
├── Card skeleton (pulsing)
├── Text skeleton (shimmer)
└── Image skeleton (blur placeholder)

TRANSITIONS:
├── Screen transitions: Fade + Slide
├── Modal transitions: Scale up
├── Tab switches: Fade
├── Banner auto-scroll: Smooth scroll (4sec)
├── Testimonials scroll: Horizontal snap
└── Sidebar: Slide from left

ANIMATIONS:
├── Floating action button bobbing
├── Heart icon: Scale + color change
├── Button press: Opacity + scale
├── Pull-to-refresh: Rotation
└── Scroll parallax: Background blur
```

### **Screen Components Breakdown**

#### **HOME SCREEN (index.tsx)**
```typescript
Components:
├── StatusBar (customize color)
├── Header Section
│   ├── Avatar + Greeting
│   ├── Action buttons row
│   │   ├── Wallet
│   │   ├── Notifications
│   │   └── Settings
│   └── Menu button (sidebar toggle)
│
├── Auto-scrolling Banners
│   ├── FlatList with snapToInterval
│   ├── Pagination dots
│   └── Auto-advance every 4 seconds
│
├── Quick Access Cards
│   ├── Get Kundli
│   ├── Chat with Astrologer
│   ├── My Bookings
│   └── Wallet Balance
│
├── Featured Pujas Section
│   ├── Title
│   ├── Horizontal FlatList
│   └── PujaCard components
│
├── Testimonials Carousel
│   ├── User avatar
│   ├── Quote text
│   ├── Rating stars
│   └── Name
│
└── ScrollView container (vertical scroll)
```

#### **PUJA SCREEN (puja.tsx)**
```typescript
Components:
├── SearchBar
│   ├── Text input
│   ├── Clear button
│   └── Search icon
│
├── Category Filter
│   ├── Horizontal chip list
│   ├── "All" is active by default
│   └── Tap to filter
│
├── Puja List
│   ├── FlatList (vertical)
│   └── PujaCard per item
│       ├── Image
│       ├── Name
│       ├── Description
│       ├── Price
│       ├── Duration
│       ├── Star rating
│       └── "Book Now" button
│
└── Empty State
    ├── No results message
    └── Reset filters button
```

#### **ASTRO SCREEN (astro.tsx)**
```typescript
Components:
├── Form Section (Conditional)
│   ├── Birth date picker
│   ├── Birth time picker
│   ├── Birth place search
│   └── "Calculate Kundli" button
│
├── Results Section (Conditional)
│   ├── Birth chart canvas/SVG
│   ├── Planet positions table
│   ├── Sign information display
│   ├── Nakshatras
│   ├── House details
│   ├── Predictions text
│   ├── Remedies suggestions
│   ├── Share button
│   ├── Download button
│   └── "Chat with Astrologer" button
│
└── Toggle between form/results
```

#### **MUSIC SCREEN (music.tsx)**
```typescript
Components:
├── Category Filter Tabs
│   ├── All
│   ├── Vedic Chants
│   ├── Devotional
│   ├── Meditation
│   ├── Mantras
│   └── Background
│
├── Music List
│   ├── FlatList
│   └── MusicCard per item
│       ├── Album art thumbnail
│       ├── Title
│       ├── Artist
│       ├── Duration
│       ├── Play button
│       ├── Heart icon (favorite)
│       └── Menu icon (options)
│
├── Now Playing Bar (Bottom)
│   ├── Album art
│   ├── Title + Artist
│   ├── Play/Pause button
│   ├── Progress bar
│   └── Tap to expand player
│
└── Full Player Modal
    ├── Large album art
    ├── Title + Artist
    ├── Full controls
    │   ├── Previous button
    │   ├── Play/Pause
    │   ├── Next button
    │   ├── Repeat button
    │   ├── Shuffle button
    │   └── Volume slider
    │
    ├── Queue display
    └── Share button
```

---

## �🖥️ ADMIN PANEL DETAILS

### **Framework & Setup**

```json
{
  "framework": "Next.js 16.2.2",
  "appRouter": "Yes (Server Components)",
  "styling": "Tailwind CSS v4 (@tailwindcss/postcss)",
  "uiLibraries": ["Lucide React", "Framer Motion", "clsx"],
  "language": "TypeScript 5",
  "database": "Supabase PostgreSQL",
  "auth": "Supabase SSR"
}
```

### **Admin Panel Routes**

```
Port: 3001
Deployment: localhost:3001

Routes:
├── / (redirect to /dashboard)
├── /dashboard              # Main dashboard
├── /login                  # Admin login
├── /api/
│   ├── admin/             # User/content management
│   ├── auth/              # Authentication
│   ├── bookings/          # Booking management
│   ├── chat/              # Chat moderation
│   ├── config/            # System configuration
│   ├── translate/         # Translation management
│   └── vedaluna/          # Vedic astrology data
└── /middleware.ts         # Auth protection
```

### **Admin Features (To Be Implemented)**

```
DASHBOARD
├── Real-time Metrics
│   ├── Total users
│   ├── Active bookings
│   ├── Revenue
│   └── Chat sessions
│
├── User Management
│   ├── View all users
│   ├── Search/filter
│   ├── Edit profiles
│   └── Ban/suspend users
│
├── Puja Management
│   ├── Create new pujas
│   ├── Edit puja details
│   ├── Set pricing
│   ├── Category management
│   └── Schedule management
│
├── Booking Management
│   ├── View all bookings
│   ├── Assign priests
│   ├── Update status
│   └── Handle cancellations
│
├── Chat Moderation
│   ├── Monitor conversations
│   ├── Report handling
│   └── Astrologer management
│
└── System Settings
    ├── Commission rates
    ├── Email templates
    ├── Notification settings
    └── Multi-language content
```

### **Dependencies**

```json
{
  "@supabase/ssr": "^0.9.0",
  "@supabase/supabase-js": "^2.98.0",
  "axios": "^1.14.0",
  "framer-motion": "^12.35.0",
  "lucide-react": "^0.577.0",
  "next": "^16.2.2",
  "react": "19.2.3"
}
```

---

## 📊 DATABASE SCHEMA

### **Supabase Tables Structure**

```sql
-- USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY (from auth.users),
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  email VARCHAR(255),
  profile_picture_url TEXT,
  birth_date DATE,
  birth_time TIME,
  birth_location VARCHAR(255),
  gender ENUM('male', 'female', 'other'),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- PUJAS TABLE
CREATE TABLE poojas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  price DECIMAL(10, 2) NOT NULL,
  duration_minutes INT,
  included_items TEXT[],
  image_url TEXT,
  sort_order INT,
  is_active BOOLEAN DEFAULT true,
  show_on_home BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CATEGORIES TABLE
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- BOOKINGS TABLE
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  puja_id UUID REFERENCES poojas(id),
  booking_date DATE NOT NULL,
  booking_time TIME,
  quantity INT DEFAULT 1,
  total_price DECIMAL(10, 2),
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CHAT MESSAGES TABLE
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  astrologer_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  is_from_user BOOLEAN DEFAULT true,
  sent_at TIMESTAMP DEFAULT NOW()
);

-- KUNDLI DATA TABLE
CREATE TABLE kundli_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  birth_chart_json JSONB,
  moon_sign VARCHAR(50),
  sun_sign VARCHAR(50),
  rising_sign VARCHAR(50),
  planet_positions JSONB,
  predictions TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- NOTIFICATIONS TABLE
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  body TEXT,
  notification_type ENUM('booking', 'chat', 'reminder', 'promotion'),
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMP DEFAULT NOW()
);

-- MUSIC CATALOG TABLE
CREATE TABLE music_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255),
  category VARCHAR(100),
  duration_seconds INT,
  audio_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- PAYMENTS TABLE
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10, 2),
  payment_method ENUM('razorpay', 'stripe', 'upi'),
  transaction_id VARCHAR(255) UNIQUE,
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ASTROLOGERS TABLE
CREATE TABLE astrologers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  expertise TEXT[],
  experience_years INT,
  hourly_rate DECIMAL(10, 2),
  availability JSONB,
  rating DECIMAL(3, 2),
  total_sessions INT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## ⚠️ WHAT'S MISSING / NOT CONNECTED

### **Critical Missing Features**

| Feature | Status | Impact | Priority |
|---------|--------|--------|----------|
| **Payment Gateway** | ❌ Not Implemented | Cannot accept payments | 🔴 CRITICAL |
| **Email Service** | ❌ Not Connected | No booking confirmations | 🔴 CRITICAL |
| **SMS/OTP Service** | ❌ Not Connected | Phone verification broken | 🔴 CRITICAL |
| **Real-time Chat** | ⚠️ Partial | No WebSocket/socket.io | 🟠 HIGH |
| **Video Calling** | ❌ Not Implemented | Can't do live sessions | 🟠 HIGH |
| **Push Notifications** | ⚠️ Partial Setup | Not fully tested | 🟠 HIGH |
| **Booking Calendar** | ❌ Not Built | Can't pick dates | 🟠 HIGH |
| **Analytics Dashboard** | ❌ Not Built | No business insights | 🟡 MEDIUM |
| **Multi-language** | ⚠️ Framework only | No translations ready | 🟡 MEDIUM |
| **Search/Filters** | ⚠️ Basic only | Limited discovery | 🟡 MEDIUM |
| **User Reviews** | ❌ Not Built | No rating system | 🟡 MEDIUM |
| **Subscription Plans** | ❌ Not Built | No premium features | 🟡 MEDIUM |
| **API Documentation** | ❌ No Swagger | Hard to integrate | 🟡 MEDIUM |
| **Error Handling** | ⚠️ Basic | Many edge cases uncovered | 🟡 MEDIUM |
| **Testing Suite** | ❌ Not Started | Quality assurance missing | 🟡 MEDIUM |

### **Connection Issues**

```
MISSING INTEGRATIONS:
├── Razorpay/Stripe (Payment)
├── Twilio/Firebase (SMS)
├── SendGrid/AWS SES (Email)
├── Socket.io (Real-time Chat)
├── Jitsi/Twilio (Video Calls)
├── Google/Apple Push Notifications
├── Datadog/LogRocket (Monitoring)
└── External Astrology APIs
```

---

## 🚀 IMPLEMENTATION ROADMAP

### **Phase 2: Core Functionality (Weeks 1-4)**

#### Week 1: Payment Integration
```
[ ] Set up Razorpay account & API keys
[ ] Create payment routes in backend
[ ] Build payment UI in mobile app
[ ] Add payment status tracking
[ ] Test full checkout flow
[ ] Error handling & refunds
```

#### Week 2: Authentication & Notifications
```
[ ] Integrate Firebase for OTP/SMS
[ ] Build OTP verification flow (mobile)
[ ] Set up Expo Push Notifications
[ ] Create notification templates
[ ] Test push delivery
[ ] Notification tracking in DB
```

#### Week 3: Booking System
```
[ ] Create booking calendar component
[ ] Build availability logic
[ ] Implement date/time picker
[ ] Add booking confirmation workflow
[ ] Email confirmation template
[ ] Booking status management
```

#### Week 4: Real-time Features
```
[ ] Set up Socket.io server
[ ] Implement WebSocket connection
[ ] Build chat UI with real-time updates
[ ] Add typing indicators
[ ] Online/offline status
[ ] Message history pagination
```

### **Phase 3: Advanced Features (Weeks 5-8)**

#### Week 5: Admin Dashboard
```
[ ] Build dashboard layout
[ ] Real-time metrics widgets
[ ] User management interface
[ ] Booking analytics
[ ] Revenue reports
[ ] Admin authentication
```

#### Week 6: Content Management
```
[ ] Puja CRUD operations (admin)
[ ] Category management
[ ] Image upload to cloud storage
[ ] Multi-language support setup
[ ] SEO optimization
[ ] Content scheduling
```

#### Week 7: Quality & Testing
```
[ ] Unit tests (backend)
[ ] Integration tests (API)
[ ] E2E tests (mobile app)
[ ] Performance testing
[ ] Security audit
[ ] Error tracking setup
```

#### Week 8: Deployment
```
[ ] Docker configuration
[ ] Database migrations setup
[ ] CI/CD pipeline (GitHub Actions)
[ ] Environment management
[ ] Monitoring setup
[ ] Production deployment
```

---

## 💻 LOCAL DEVELOPMENT

### **Prerequisites**

```bash
# Required:
- Node.js 18+ (recommend 20 LTS)
- npm 9+
- Git
- Supabase account (free tier)
- Expo Go app (for mobile testing)

# Optional:
- Android Studio (for Android emulator)
- Xcode (for iOS simulator)
- Docker (for containerization)
- Postman (for API testing)
```

### **Initial Setup**

```bash
# 1. Clone repository
git clone https://github.com/nayanvyas28/mantrapujaAll.git
cd mantrapujaAll

# 2. Install dependencies
npm install

# 3. Create environment file
# Create .env.local at root
cat > .env.local << EOF
# Supabase
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Backend
BACKEND_URL=http://localhost:4000

# Astrology API (optional)
ASTROLOGY_API_KEY=YOUR_KEY

# Payment (optional)
RAZORPAY_KEY_ID=YOUR_KEY
RAZORPAY_KEY_SECRET=YOUR_SECRET
EOF

# 4. Install Expo CLI
npm install -g expo-cli eas-cli
```

### **Running Development Servers**

```bash
# Terminal 1: Run all apps
npm run dev:all

# OR run individually in separate terminals:

# Terminal 1: Backend (Port 4000)
npm run dev:backend

# Terminal 2: Admin Panel (Port 3001)
npm run dev:admin

# Terminal 3: Website (Port 3000)
npm run web

# Terminal 4: Mobile App (Expo)
cd mobile-app
expo start
  # Press 'i' for iOS simulator
  # Press 'a' for Android emulator
  # Press 'w' for web browser
```

### **Accessing Applications**

```
Mobile App:     Expo Go app (scan QR code)
Admin Panel:    http://localhost:3001
Website:        http://localhost:3000
Backend API:    http://localhost:4000
Health Check:   http://localhost:4000/health
```

### **Useful Commands**

```bash
# View available scripts
npm run

# Run specific app
npm run dev:backend
npm run dev:admin
npm run web

# Build all
npm run build:all

# Check linting
npm run lint

# Run tests
npm test

# Clean node_modules
rm -r node_modules && npm install

# Debug backend
NODE_DEBUG=express npm run dev:backend

# Restart Expo
cd mobile-app && expo start -c  # Clear cache
```

### **Troubleshooting**

```bash
# Port 4000 already in use?
Get-NetTCPConnection -LocalPort 4000 | Stop-Process -Force

# Dependencies conflict?
npm install --legacy-peer-deps

# Supabase connection failed?
# Check .env.local credentials
# Test: curl http://localhost:4000/health

# Expo not connecting?
# Use tunnel: expo start --tunnel
# Or reset: rm -rf node_modules && npm install
```

---

## 📦 DEPLOYMENT GUIDE

### **Deployment Architecture**

```
┌─────────────────────────────────────────┐
│         DEPLOYMENT ENVIRONMENTS         │
├─────────────────────────────────────────┤
│                                         │
│  🌐 PUBLIC WEBSITE                      │
│     - Docker container                  │
│     - AWS ECS / Heroku / Railway        │
│     - CDN: CloudFlare                   │
│                                         │
│  🖥️ ADMIN PANEL                         │
│     - Vercel (recommended)              │
│     - OR Docker container               │
│     - Environment: admin-prod           │
│                                         │
│  ⚙️ BACKEND API                         │
│     - AWS EC2 / Railway / Render        │
│     - Docker container                  │
│     - Auto-scaling: Yes                 │
│                                         │
│  📱 MOBILE APP                          │
│     - Expo EAS Build                    │
│     - App Store (iOS)                   │
│     - Google Play (Android)             │
│                                         │
│  📊 DATABASE                            │
│     - Supabase (Cloud PostgreSQL)       │
│     - Automatic backups                 │
│                                         │
│  📬 NOTIFICATIONS                       │
│     - Expo Push Service                 │
│     - Firebase Cloud Messaging          │
│                                         │
└─────────────────────────────────────────┘
```

### **Step 1: Prepare for Deployment**

```bash
# 1. Update environment variables for production
cat > .env.production << EOF
NODE_ENV=production
VITE_SUPABASE_URL=https://prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=prod_key_here
BACKEND_URL=https://api.mantrapuja.com
RAZORPAY_KEY_ID=prod_razorpay_key
EOF

# 2. Build all applications
npm run build:all

# 3. Verify builds
ls -la website/.next
ls -la admin-panel/.next
ls -la backend/src
```

### **Step 2: Docker Deployment (Website)**

```dockerfile
# Already configured in Dockerfile
# Build:
docker build -t mantrapuja-website:latest .

# Run locally:
docker run -p 3000:3000 mantrapuja-website:latest

# Push to registry:
docker tag mantrapuja-website:latest your-registry/mantrapuja-website:latest
docker push your-registry/mantrapuja-website:latest
```

### **Step 3: Deploy to Cloud Providers**

#### **Option A: Vercel (Recommended for Admin Panel)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy admin panel
cd admin-panel
vercel --prod

# Set environment variables in Vercel dashboard
```

#### **Option B: Railway (Full Stack)**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up

# Railway auto-detects package.json and deploys
```

#### **Option C: AWS**

```bash
# 1. Create ECR repository
aws ecr create-repository --repository-name mantrapuja-api

# 2. Build and push
docker build -t mantrapuja-api:latest backend/
docker tag mantrapuja-api:latest aws_account_id.dkr.ecr.region.amazonaws.com/mantrapuja-api:latest
docker push aws_account_id.dkr.ecr.region.amazonaws.com/mantrapuja-api:latest

# 3. Create ECS service
# Use AWS Console or Terraform/CloudFormation
```

### **Step 4: Mobile App Deployment**

```bash
# Expo EAS Build
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Create EAS account
eas init

# 3. Build for iOS
eas build --platform ios --auto-submit

# 4. Build for Android
eas build --platform android --auto-submit

# 5. Submit to stores
eas submit --platform ios
eas submit --platform android
```

### **Step 5: Database & Migrations**

```bash
# 1. Backup production database
pg_dump postgresql://user:pass@host/db > backup.sql

# 2. Run migrations (if using migrations tool)
npm run migrate:up

# 3. Seed initial data
npm run seed:production

# 4. Verify connection
npm run test:db
```

### **Step 6: Post-Deployment**

```bash
# 1. Monitor logs
# Vercel: Dashboard > Functions
# Railway: CLI > railway logs
# AWS: CloudWatch Logs

# 2. Set up monitoring
# - Sentry for error tracking
# - DataDog for performance
# - UptimeRobot for uptime monitoring

# 3. Configure SSL/TLS
# - CloudFlare (free SSL)
# - Let's Encrypt (auto-renewal)

# 4. Set up CDN
# - CloudFlare (free tier)
# - AWS CloudFront

# 5. Test endpoints
curl https://api.mantrapuja.com/health
curl https://admin.mantrapuja.com
curl https://mantrapuja.com
```

### **Production Environment Variables**

```env
# Backend (.env.production)
NODE_ENV=production
PORT=4000
SUPABASE_URL=https://prod.supabase.co
SUPABASE_KEY=prod_key
RAZORPAY_KEY_ID=prod_razorpay
RAZORPAY_KEY_SECRET=prod_secret
FIREBASE_ADMIN_SDK=prod_firebase.json
SENDGRID_API_KEY=prod_sendgrid
TWILIO_ACCOUNT_SID=prod_twilio_sid
TWILIO_AUTH_TOKEN=prod_token
LOG_LEVEL=info
```

---

## 📞 API EXAMPLES

### **Authentication - Register**

```bash
# Request
POST /api/auth/register
Content-Type: application/json

{
  "phone_number": "+91-9999999999",
  "full_name": "Raj Kumar"
}

# Response
{
  "success": true,
  "message": "OTP sent to phone",
  "temporary_user_id": "uuid",
  "otp_expires_in": 600
}
```

### **Authentication - Verify OTP**

```bash
# Request
POST /api/auth/verify-otp
Content-Type: application/json

{
  "phone_number": "+91-9999999999",
  "otp": "123456"
}

# Response
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "phone_number": "+91-9999999999",
    "full_name": "Raj Kumar"
  }
}
```

### **Get Pujas**

```bash
# Request
GET /api/pujas?category_id=uuid&show_on_home=true
Authorization: Bearer jwt_token

# Response
{
  "data": [
    {
      "id": "uuid",
      "name": "Rudra Abhishek",
      "description": "Sacred Shiva puja...",
      "price": 5000,
      "duration_minutes": 120,
      "image_url": "https://...",
      "category_id": "uuid"
    }
  ]
}
```

### **Book a Puja**

```bash
# Request
POST /api/pujas/book
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "puja_id": "uuid",
  "booking_date": "2026-04-25",
  "booking_time": "14:00",
  "quantity": 1,
  "notes": "Please perform at home"
}

# Response
{
  "success": true,
  "booking": {
    "id": "uuid",
    "status": "pending",
    "total_price": 5000,
    "confirmation_number": "MP-2026-001"
  },
  "next_step": "Complete payment"
}
```

### **Get Kundli**

```bash
# Request
POST /api/astrology/kundli
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "birth_date": "1998-05-15",
  "birth_time": "14:30",
  "birth_location": "Mumbai, India"
}

# Response
{
  "success": true,
  "kundli": {
    "moon_sign": "Virgo",
    "sun_sign": "Taurus",
    "rising_sign": "Scorpio",
    "planet_positions": {...},
    "predictions": "Your year 2026 brings..."
  }
}
```

---

## 🔐 Security Considerations

```
IMPLEMENTED:
✅ JWT token authentication
✅ OTP verification
✅ CORS enabled
✅ Environment variables for secrets
✅ Supabase Row Level Security (RLS)

TO IMPLEMENT:
❌ Rate limiting
❌ Input validation & sanitization
❌ HTTPS/TLS everywhere
❌ Helmet.js for header security
❌ CSRF protection
❌ API key rotation
❌ Audit logging
❌ Encryption for sensitive data
```

### **Security Checklist**

```javascript
// Add to backend security:
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());  // Secure headers
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
```

---

## 📈 Performance Optimization

```
TO IMPLEMENT:
├── Image optimization (Cloudinary)
├── API response caching (Redis)
├── Database query optimization
├── Lazy loading (mobile app)
├── Code splitting (Next.js)
├── CDN for static assets
├── Database indexing
└── Monitoring & alerting
```

---

## 🧪 Testing Strategy

```
UNIT TESTS:
├── Backend routes (Jest)
├── API controllers
├── Utility functions

INTEGRATION TESTS:
├── Auth flow
├── Payment flow
├── Booking flow
├── Database operations

E2E TESTS:
├── Mobile app workflows
├── Admin panel workflows
└── Payment checkout

PERFORMANCE TESTS:
├── Load testing (k6)
├── Database query analysis
└── Memory profiling
```

---

## 📊 Monitoring & Analytics

```
TO IMPLEMENT:
├── Error Tracking: Sentry
├── Performance: Datadog
├── Logs: AWS CloudWatch
├── Analytics: Mixpanel/Amplitude
├── Uptime Monitoring: UptimeRobot
├── APM: New Relic
└── User Analytics: Google Analytics
```

---

## 🤝 Team Collaboration

```
DEVELOPMENT WORKFLOW:
├── Main branch: Production-ready code
├── Develop branch: Staging code
├── Feature branches: feature/feature-name
│
├── Pull Request Process:
│   ├── 1. Create feature branch
│   ├── 2. Commit changes
│   ├── 3. Push to GitHub
│   ├── 4. Create PR
│   ├── 5. Code review (2 approvals)
│   ├── 6. Merge to develop
│   └── 7. Deploy to staging
│
└── Release Process:
    ├── Create release branch
    ├── Version bump
    ├── Merge to main
    ├── Tag release
    └── Deploy to production
```

---

## 📚 Documentation

```
MISSING DOCUMENTATION:
├── API Documentation (Swagger/OpenAPI)
├── Database Schema Diagram
├── Component Documentation
├── Setup Guide (Step-by-step)
├── Deployment Guide (Enhanced)
├── Architecture Decision Records (ADRs)
├── Contributing Guidelines
└── Changelog
```

---

## 🎯 CRITICAL SUCCESS FACTORS

### **Must Have (MVP)**
```
✅ User authentication (OTP)
✅ Browse pujas
✅ Book pujas
❌ Payment integration (MISSING)
❌ Booking confirmation (MISSING)
❌ Admin dashboard (INCOMPLETE)
```

### **Should Have (Phase 2)**
```
⚠️ Astrology features (partial)
⚠️ Chat system (no websocket)
❌ Real-time notifications (incomplete)
❌ Multi-language support (no content)
❌ Analytics (missing)
```

### **Nice to Have (Phase 3)**
```
❌ Video calling
❌ Subscription plans
❌ Advanced search
❌ User reviews & ratings
❌ Recommendation engine
```

---

## 📝 SUMMARY & ACTION ITEMS

### **Project Status: 40% Complete**

```
DONE (40%):
✅ Backend API setup
✅ Mobile app foundation
✅ Admin panel template
✅ Database schema
✅ Authentication framework
✅ UI/UX design system
✅ Deployment pipeline (partial)

IN PROGRESS (20%):
🔨 Booking system
🔨 Admin dashboard
🔨 Error handling
🔨 API documentation

TODO (40%):
❌ Payment integration
❌ Email/SMS services
❌ Real-time chat
❌ Notifications system
❌ Testing suite
❌ Production deployment
❌ Monitoring setup
```

### **Immediate Next Steps (Priority Order)**

```
1. [ ] Implement Razorpay payment integration (Week 1)
2. [ ] Set up Firebase for OTP/SMS (Week 1)
3. [ ] Build booking calendar system (Week 2)
4. [ ] Complete email notifications (Week 2)
5. [ ] Implement Socket.io for real-time chat (Week 3)
6. [ ] Build admin dashboard with metrics (Week 3)
7. [ ] Set up CI/CD pipeline (Week 4)
8. [ ] Conduct security audit (Week 4)
9. [ ] Deploy to staging environment (Week 5)
10. [ ] Load testing & optimization (Week 5)
```

---

## 📞 CONTACT & SUPPORT

```
Project Lead: Nayan Vyas
GitHub: https://github.com/nayanvyas28/mantrapujaAll
Repository: https://github.com/nayanvyas28/mantrapujaAll.git

For questions, issues, or contributions:
1. Check existing issues on GitHub
2. Create new issue with detailed description
3. Submit pull request following guidelines
```

---

**Last Updated:** April 17, 2026  
**Version:** 1.0 (Complete Overview)  
**Next Review:** After Phase 2 completion

