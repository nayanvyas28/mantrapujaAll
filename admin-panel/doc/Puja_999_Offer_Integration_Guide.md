# ₹999 Puja Offer Integration Guide (Admin & DB)

This guide explains how to add the ₹999 Offer functionality to the Admin Panel and Supabase database.

## 1. Database Changes (Supabase)

Run the following SQL in your Supabase SQL Editor:

```sql
-- Add toggle and order to poojas table (for listing)
ALTER TABLE poojas 
ADD COLUMN IF NOT EXISTS is_offer_999 BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS offer_order SMALLINT DEFAULT 0;

-- Add custom breakdown to pooja_payment_summaries table (for payment logic)
ALTER TABLE pooja_payment_summaries 
ADD COLUMN IF NOT EXISTS offer_999_tax NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS offer_999_dakshina NUMERIC DEFAULT 0;

-- Optional: Create an index for faster filtering
CREATE INDEX IF NOT EXISTS idx_poojas_offer_999 ON poojas(is_offer_999) WHERE is_offer_999 = true;

-- Optional: Create an index for faster filtering
CREATE INDEX IF NOT EXISTS idx_poojas_offer_999 ON poojas(is_offer_999) WHERE is_offer_999 = true;
```

## 2. Admin Panel UI Changes

In your Admin Panel (where you manage Pujas/Poojas), add the following fields to the **Edit/Add Puja** form:

### Elements to Add:
1.  **Toggle Switch**: Label: "Add to ₹999 Offer".
    *   Binds to: `poojas` table -> `is_offer_999` column.
2.  **Number Input**: Label: "Offer Display Order".
    *   Binds to: `poojas` table -> `offer_order` column.
3.  **Number Input**: Label: "Offer Tax (₹)".
    *   Binds to: `pooja_payment_summaries` table -> `offer_999_tax` column (Optional).
4.  **Number Input**: Label: "Offer Pandit Dakshina (₹)".
    *   Binds to: `pooja_payment_summaries` table -> `offer_999_dakshina` column (Optional).

### Data Flow Logic:
- When a user toggles "Add to ₹999 Offer" on, the app will automatically display this Puja in the "Special Offer @ ₹999" section.
- The app will automatically override the existing price display with **₹999** throughout the user journey (Home, Details, Checkout).
- When toggled off, the Puja will return to its original price and regular category sections.

## 3. Usage Limits
- **Home Page**: Show top 5 pujas (sorted by `offer_order`).
- **View More**: Show up to 15 pujas in total.
- **Admin**: Ensure you don't select more than 15 pujas for the best UI experience.

---

## 4. Technical Data Flow & Logic

### Pricing Priority
The mobile app uses the following logic to determine the price shown to the user:
1.  **Check `is_offer_999`**: If this flag is `true`, the app **ignores** all other price fields and sets the price to **₹999**.
2.  **Payment Summary Override**: When the offer is active, the app automatically:
    *   Sets `Base Price` to ₹999.
    *   Sets `Taxes`, `Dakshina`, and `Samagri` to "Included" (₹0) in the breakdown.
    *   Sets `Total Payable` to ₹999.

### UI State Synchronization
*   **Real-time Updates**: The app uses Supabase Realtime. As soon as you toggle the offer in the Admin Panel, users currently on the Home Page or Puja screen will see the change almost instantly.
*   **Visibility**: 
    *   **Cards**: Prices are hidden on cards per layout rules, but "SPECIAL OFFER" badges appear dynamically.
    *   **Details**: The banner "✨ SPECIAL OFFER @ ₹999" appears at the top of the description.

### Admin Best Practices
*   **Deselecting**: When you turn the toggle `OFF`, the Puja immediately returns to its original pricing stored in the `price` column and the standard `pooja_payment_summaries` table. No data is lost.
*   **Ordering**: Use `offer_order` to put your most important or high-margin Pujas at the beginning of the Home Page list.
