# MantraPuja Style Guide

This document defines the visual identity, design system, and UI patterns for the MantraPuja platform.

---

## 🎨 Color Palette

MantraPuja uses a color palette inspired by Vedic spirituality, blending "Divine Saffron" and "Ancient Gold" with a modern "Cosmic Navy" theme.

### 1. Brand Colors
- **Saffron** (`#f97316`): The primary brand color. Representing fire, purity, and spiritual knowledge.
- **Gold** (`#f59e0b`): The highlight color. Representing prosperity and divine light.
- **Antique Gold** (`#d97706`): Used for shadows and deep accents.

### 2. Theme Colors
- **Light Theme (Divine Saffron Light)**
  - **Background**: `#fffbf5` (Warm Cream)
  - **Foreground**: `#0f172a` (Dark Navy)
  - **Card**: `#ffffff` (Pure White)
  - **Border**: `#fed7aa` (Orange-tinted)
- **Dark Theme (Cosmic Navy)**
  - **Background**: `#0f172a` (Cosmic Navy)
  - **Foreground**: `#ffffff` (White)
  - **Card**: `#1e293b` (Celestial Blue/Navy)
  - **Border**: `#1e293b` (Subtle dark border)

### 3. Functional Colors
- **Success**: Emerald/Green for positive feedback.
- **Destructive**: Red (`#ef4444`) for critical actions and errors.
- **Muted**: Slate/Gray for non-primary text and icons.

---

## ✍️ Typography

The typography system balances tradition (Serif) with accessibility and modernity (Sans-serif).

### 1. Font Families
- **Display & Headings**: `font-serif` (Georgia, ui-serif). Used for H1 to H3 to convey authority, history, and elegance.
- **Body & Interface**: `font-sans` (Geist Sans). Used for body text, tags, and buttons to ensure maximum readability.
- **Technical**: `font-mono` (Geist Mono). Used for code or technical labels.

### 2. Hierarchy
- **H1 (Hero Titles)**: `6xl` to `8xl`, black font weight, tight tracking.
- **H2 (Section Headings)**: `4xl` to `5xl`, black weight, serif.
- **Body**: `base` (16px) or `lg` (18px), medium weight.

---

## 💎 Design Tokens & UI Patterns

### 1. Surfaces (Glassmorphism)
- **Backdrop Blur**: Extensively used (`backdrop-blur-xl`, `backdrop-blur-3xl`) for headers, mobile menus, and interactive cards.
- **Opacity**: Use low opacity backgrounds (`bg-card/40`, `bg-white/5`) to create a layered, "glassy" effect.

### 2. Corner Radius
- **Soft Corners**: `radius: 0.75rem` (3xl) is the standard for cards and large buttons, providing a friendly, premium feel.

### 3. Shadows & Glows
- **Spiritual Glow**: Custom saffron/gold glows (`shadow-saffron/50`) used for primary buttons and markers.
- **3D Depth**: Deep shadows (`shadow-2xl`, `shadow-3xl`) used to make cards "float" above the background.

---

## ✨ Animations & Interactions

### 1. Core Effects
- **Snake Border**: A running stroke animation used to highlight premium cards (e.g., Pooja Process).
- **Drift & Wander**: Slow, smooth background movements for "Nebula" or "Ember" particles.
- **Float**: Subtle vertical movement (`animate-float`) used for icons or cards to feel light and alive.
- **Shimmer**: A light-sweep effect used for loading states or call-to-action highlights.

### 2. Button States
- **Hover**: 3D translation (`hover:-translate-y-1`) combined with scale and shadow increases.
- **Active**: Slight compression (`active:scale-95`) to provide tactile feedback.

---

## 🖼️ Iconography & Imagery

### 1. Iconography
- **Library**: [Lucide React](https://lucide.dev/).
- **Styling**: Icons are typically sized at `4` or `5` (16-20px) and often placed in rounded containers with subtle background colors.

### 2. Visual Textures
- **Vedic Patterns**: Subtle geometric overlays (opacity 0.03) in footers and sections.
- **Particle Systems**: Fire particles, embers, and floating "Om" symbols are used sparingly for thematic immersion.
