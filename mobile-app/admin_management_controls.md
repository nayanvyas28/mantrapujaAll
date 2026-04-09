# Admin Panel: Content & Layout Management Guide

This guide describes how to build and use the Admin Panel to control the Mantra Puja App.

## 1. Home Page Manager (Ordering & Selection)
This is the most important screen for daily updates.

### A. Selecting Items for Home
*   **The UI Control**: A toggle or checkbox labeled "Show on Home Page".
*   **What it does**: Sets `show_on_home = true` in the database.
*   **Constraint**: You should only select **3 Pujas**, **4 Locations**, and **3 Blogs** at a time. If you select more, only the ones with the lowest "Position" number will show.

### B. Arranging the Order (Positioning)
*   **The UI Control**: A numerical input field labeled "Home Position" or a Drag-and-Drop list.
*   **What it does**: Sets the `home_order` value.
*   **How it works**:
    *   Position `1` = First card on the left.
    *   Position `2` = Second card.
    *   Position `3` = Third card.

---

## 2. Category Management (Listing Pages)
Use this to arrange the order of items in the "See All" or category-specific pages.

*   **The UI Control**: A "Sort Order" input field.
*   **What it does**: sets `sort_order` (or `order_rank` for Locations).
*   **Tip**: Use increments of 10 (10, 20, 30...) so you can easily insert new items in the middle later without re-numbering everything.

---

## 3. Product Management (₹99 Sacred Store)
Manage the items in your e-commerce section.

*   **Adding/Editing**: Change Name, Description, and Image URL. 
*   **Featured on Home**: Use the same "Show on Home" toggle to decide which 5 products appear on the main Home screen scroll.
*   **Table Name**: All updates must go to the `products_99` table.

---

## 4. Payment summary Management
Each Puja has a detailed "Payment Summary" page.

*   **How to Manage**: 
    1.  Go to the "Payment Summaries" section in Admin.
    2.  Find the Puja you want to edit.
    3.  Update the **Pandit Dakshina**, **Tax**, and **Samagri** amounts.
*   **Calculation**: The Admin should auto-calculate the **Total Payable** before saving, so the user sees the final price clearly.

---

## 5. Developer Checklist for "Success"
When your developers say "It's done," verify these 3 things:
1.  **Sync**: If I change a price in Admin, does it change **instantly** in the app?
2.  **Toggle**: If I turn off "Show on Home" for a Puja, does it **disappear instantly** from the phone?
3.  **Active State**: Items marked `is_active = false` should never show anywhere in the app, even if "Show on Home" is on.
