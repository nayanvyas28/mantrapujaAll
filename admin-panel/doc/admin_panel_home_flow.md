# Admin Panel: Home Page Management Flow

This document details the workflow and business rules for managing the Mobile App's "Home Page" directly from the Admin Panel.

## 1. Overview
The Admin Panel will feature a dedicated "Home Page Settings" screen. The primary goal of this screen is to give administrators the power to handpick exactly which data (Pujas, Blogs, Products) appears on the app's home screen, ensuring only curated content is shown to the users.

## 2. Configurable Sections
The application's Home Page consists of multiple sections. The Admin Panel will allow configuration for the following specific areas:
- **Puja Section** (Max 3)
- **Spiritual Locations / Destinations Section** (Max 4)
- **99Products Section** (Max 5)
- **Upcoming Festivals Section** (Max 5)
- **Blog Section** (Max 3)

## 3. Data Flow & Database Architecture (Supabase)
This setup connects the Admin UI, the Supabase PostgreSQL database, and the Mobile App via Realtime Subscriptions so that everything is fully functional end-to-end.

### 3.1. Supabase Schema Requirements
To support selective featuring and custom ordering, the following columns are expected on the relevant Supabase tables (`poojas`, `blogs`, `destinations`, `products_99`):
- `show_on_home` (boolean): Flags the item to be picked up by the app's home screen. Default is `false`. ONLY items where this is `true` should be fetched.
- `home_order` (integer): Determines the horizontal sort order in which these cards appear on the app.

### 3.2. End-to-End Execution Flow
1. **Admin Fetch (UI Flow):** The Admin Panel queries Supabase (`SELECT * FROM table WHERE is_active = true`) to view all available items.
2. **Admin Updates (Data Flow):** The admin selects items up to the max UI limits and clicks Save. The Admin Panel runs an `UPDATE` on Supabase. It sets `show_on_home = true` (and assigns a `home_order`) for the selected items, and sets `show_on_home = false` for everything else.
3. **App Realtime Sync:** The mobile app has active Supabase Realtime Channels set up on the `poojas`, `blogs`, `destinations`, and `products_99` tables. 
4. **App Renders:** The moment the Admin Panel successfully updates the database, the app receives the broadcast, automatically re-fetches the list (`.eq('show_on_home', true).order('home_order')`), and updates the UI instantly—without needing a manual refresh from the user!

## 4. Core Functionality: Selective Display
- **Listing Items:** The admin panel uses the queries mentioned above to populate its lists.
- **Selection UI:** The admin uses checkboxes, toggle switches, or a drag-and-drop "Selected Items" list to choose which specific items to feature.
- **App Data Fetching:** The app's Home Page only displays items with `show_on_home = true` and perfectly adheres to the admin's chosen `home_order`.

## 5. Location-Based Display (City/Region Context)
Since the app's services (like Pujas) can be location-dependent, the admin panel needs handle location contexts smoothly:
- **Location Filter in Admin:** At the top of the "Home Page Settings", the admin will have a dropdown to select a specific Location/City (e.g., "Delhi", "Mumbai" or "Global/Default").
- **City-Specific Curations:** The 3 selected Pujas for "Delhi" can be completely different from the 3 selected Pujas for "Mumbai". The selection logic (limits, checkboxes) works independently for each selected city tab/filter.
- **Location-Aware App Fetching:** When the mobile app fetches Home Page data, it sends the user's current city to the server so it only receives the 3 Pujas the admin specifically assigned to that city.

## 6. UI Layout Restrictions (Validation Rules)
Because the mobile application has strict UI designs (limited screen estate, specific card sizes, horizontal scroll constraints), the Admin Panel **must enforce selection limits**. 

### 6.1. Puja Section Constraints
- **App UI Limit:** The Home Page layout has physical space to display a maximum of **3 Puja cards**.
- **Admin Validation:** The Admin Panel must restrict the selection to exactly **3 Pujas maximum**.
- **User Experience (Admin):**
  - Show a visual counter: `Pujas Selected: 1 / 3`
  - When the admin selects 3 Pujas, all remaining unselected checkboxes/toggles must be **disabled**.
  - If the admin tries to select a 4th, show an error toast: *"Limit Reached: You can only select up to 3 Pujas for the Home Page layout. Please deselect one first."*

### 6.2. Spiritual Locations (Destinations) Section Constraints
- **App UI Limit:** The Home Page displays a horizontal scroll of up to **4 Location cards**.
- **Admin Validation:** Enforce a maximum selection limit of **4 Locations**.
- **User Experience (Admin):** `Locations Selected: 2 / 4`

### 6.3. 99Products Section Constraints
- **App UI Limit:** The Home Page displays a horizontal scroll of up to **5 Product cards**.
- **Admin Validation:** Enforce a maximum selection limit of **5 Products**.
- **User Experience (Admin):** `Products Selected: 4 / 5`

### 6.4. Upcoming Festivals Section Constraints
- **App UI Limit:** The Home Page displays a horizontal scroll of up to **5 Festival cards**.
- **Admin Validation:** Enforce a maximum selection limit of **5 Festivals**.
- **User Experience (Admin):** `Festivals Selected: 3 / 5`

### 6.5. Blog Section Constraints
- **App UI Limit:** The Home Page displays up to **3 Blog cards** at the bottom.
- **Admin Validation:** Enforce a maximum selection limit of **3 Blogs**.
- **User Experience (Admin):** `Blogs Selected: 2 / 3`

## 7. Step-by-Step Admin Navigation Flow
1. **Navigate:** Admin logs into the Admin Panel and clicks on `Home Page Manager` in the Sidebar menu.
2. **Review:** The admin sees separate tabs or blocks for all 5 configurable sections ("Featured Pujas", "Spiritual Locations", "99Products", "Festivals", "Blogs").
3. **Action:** 
   - Admin goes to "Featured Pujas".
   - Current state: `Selected: 3/3`. All unselected items are disabled.
   - Admin unchecks "Diwali Puja". State updates to `Selected: 2/3`.
   - Remaining checkboxes become enabled.
   - Admin checks "Navratri Puja". State updates to `Selected: 3/3`. Remaining checkboxes disable again.
4. **Save:** The admin clicks a global "Publish to App" or "Save Changes" button.
5. **Result:** The mobile app's home page instantly reflects the newly selected items across all matched sections, perfectly adhering to the UI constraints.
