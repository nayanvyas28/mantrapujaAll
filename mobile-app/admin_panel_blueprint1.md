# Admin Panel Architecture & Data Flow Blueprint

This document outlines the design, data flow, and UI structure for the Mantra Puja App Admin Panel. The goal is to allow administrators to manage content (Pujas, Locations, Blogs) and control their arrangement on both the Home page and listing pages.

## 1. Core Objectives
- **Content Management (CRUD)**: Create, Read, Update, and Delete Pujas, Blogs, and spiritual Locations.
- **Home Page Layout Control**: Select and order specific item sets to appear on the Home screen.
- **Listing Page Ordering**: Drag-and-drop or numerical ordering for items on their respective category pages.
- **Real-time Database Integration**: Direct connection to Supabase for instant updates.

---

## 2. Database Schema Requirements

To support manual ordering and specific visibility toggles, the following columns should be ensured/added to the `poojas`, `blogs`, and `destinations` tables:

| Column Name | Type | Description |
|-------------|------|-------------|
| `sort_order` | `integer` | Global order (e.g., 1, 2, 3...) for listing pages. |
| `show_on_home`| `boolean` | Toggle to display the item in the Home page horizontal scroll. |
| `home_order` | `integer` | Specific ordering specifically for the Home page section. |
| `is_active`  | `boolean` | Master toggle to enable/disable the item app-wide. |

---

## 3. Data Flow Architecture

### A. Admin Panel to Supabase (Write)
1. **Adding Content**: Form submission sends data (text, category, metadata) and image (uploaded to Supabase Storage) to the respective table.
2. **Reordering**: When a user drags an item in the Admin UI, a batch update is sent to Supabase to update the `sort_order` or `home_order` of all affected items.
3. **Visibility Toggles**: Instant update of the `show_on_home` flag.

### B. Mobile App from Supabase (Read)
1. **Home Page**: Queries tables with `.eq('show_on_home', true).order('home_order', { ascending: true })`.
    - **Pujas Section**: Limited to the top **3** items.
    - **Locations Section**: Limited to the top **4** items.
    - **Blogs Section**: Limited to the top **3** items.
2. **Listing Pages**: Queries tables with `.eq('is_active', true).order('sort_order', { ascending: true })`.

---

## 4. UI Structure Design

### Dashboard Layout
- **Sidebar**: 
    - Home Page Manager
    - Manage Pujas
    - Manage Blogs
    - Manage Locations
    - 99 Rs Products (New)

### A. Home Page Manager (Ordering & Selection)
- **Top Section**: "Home Page Sections" (Multi-select / Drag to order sections themselves).
- **Sub-sections**:
    - **Manage Home Pujas**: A grid of all pujas with a "Show on Home" checkbox. Drag them to set `home_order`.
    - **Manage Home Insights**: Same for Blogs.
    - **Manage Home Locations**: Same for Destinations.

### B. Content Management (CRUD)
1. **Adding/Deleting Content**: Forms to add new Pujas, Blogs, or Locations. Deleting an item removes it from the database (and cascades to linked tables like Payment Summaries).
2. **Reordering**: When a user drags an item in the Admin UI, a batch update is sent to Supabase to update the `sort_order` or `home_order` of all affected items.
3. **Visibility Toggles**: Instant update of the `show_on_home` flag.

### C. Payment Summary Management
1. **Linked Updates**: When a Puja is added, a default Payment Summary row is automatically created (via Database Trigger).
2. **Detailed Pricing**: Admin can edit line items (Tax, Pandit Dakshina, Samagri) for any specific Puja.
3. **Calculation Logic**: The Admin Panel calculates the `total_payable` in real-time as prices are changed, then saves the final value to the database.

---

## 4. UI Structure Design

### Dashboard Sections
- **Home Page Manager**: Arrange specific items for the App Home screen.
- **Pooja Management**: List, Search, Add/Edit/Delete Poojas.
- **Payment Summaries**: Manage detailed pricing for each Pooja.
- **Blog Management**: CRUD and ordering for Spiritual Insights.
- **Location Management**: CRUD and ordering for Sacred Places.

### A. Home Page Manager (Sections ordering)
You can arrange (1, 2, 3...) which items appear on the Home page grid/scroll.
- **Constraints**: 
    - **Pujas**: Only the top **3** selected items will be displayed.
    - **Locations**: Only the top **4** selected items will be displayed.
    - **Blogs**: Only the top **3** selected items will be displayed.
- UI: List of items with a numerical input or drag-handle.
- Effect: Updates `home_order` in the database.

### B. Category Arrangement (Puja/Blog/Location)
Arrange the sequence (1, 2, 3...) for the main listing pages.
- UI: Dedicated ordering view for each category.
- Effect: Updates `sort_order` in the database.

### C. Pooja & Payment Summary Editor
- **Pooja Form**: Name, Description, Category, Base Price, Image.
- **Payment Summary Form**: 
    - Linked Puja ID (Read-only)
    - Base Price (Syncs with Pooja)
    - Tax Amount & Label (e.g., "GST @ 5%")
    - Pandit Dakshina & Label
    - Samagri Price & Toggle (Included/Excluded)
    - Samagri Message (Custom text)
    - **Calculated Total**: Auto-sums all components.

---

## 5. Recommended Tech Stack for Admin Panel
- **Framework**: [Next.js](https://nextjs.org/) (for fast, SEO-friendly admin routes).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for rapid UI development.
- **Components**: [Shadcn UI](https://ui.shadcn.com/) for premium, accessible data tables and forms.
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for validation.
- **Ordering**: [dnd-kit](https://dnd-kit.com/) or [React Beautiful Dnd] for the drag-and-drop arrangement.

---

---

## 7. Seamless Integration Requirements (Action Items)

To make these admin instructions work seamlessly in your app, we need to apply the following technical changes:

### A. Database Migration (Run in Supabase SQL Editor)
Execute this SQL to add the necessary sorting and visibility columns that are currently missing:

```sql
-- Add ordering columns to poojas
ALTER TABLE public.poojas 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS show_on_home BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS home_order INTEGER DEFAULT 0;

-- Add ordering columns to blogs
ALTER TABLE public.blogs 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS show_on_home BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS home_order INTEGER DEFAULT 0;

-- Add ordering columns to destinations
ALTER TABLE public.destinations 
ADD COLUMN IF NOT EXISTS show_on_home BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS home_order INTEGER DEFAULT 0;
-- Note: destinations already has order_rank which we will use for sort_order.
```

### B. Mobile App Code Refactor
The mobile app logic must be updated to replace the "Newest First" or "Alphabetical" logic with "Admin Defined" logic:

1. **Home Page Section**: Update `fetchPopularPujas`, `fetchDestinations`, and `fetchRecentBlogs` to use the new filters:
   - Filter: `.eq('show_on_home', true)`
   - Order: `.order('home_order', { ascending: true })`
   - Limit: Respect the 3, 4, 3 constraints.

2. **Listing Pages**: Update the main category screens to use:
   - Order: `.order('sort_order', { ascending: true })`
   - For Destinations: `.order('order_rank', { ascending: true })`

3. **Fallback Logic**: If `home_order` is not set by the admin, the app will fall back to ordering by `created_at` or `is_featured`.
