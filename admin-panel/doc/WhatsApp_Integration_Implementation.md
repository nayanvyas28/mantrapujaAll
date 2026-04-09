# WhatsApp Notification Integration Guide (Admin & App)

This document explains how the WhatsApp notification system is structured between the **Admin Panel** and the **Mobile App**. It serves as a technical reference for both sides to ensure notifications are sent correctly.

---

## 1. System Architecture
The system follows a "Dynamic Credential" pattern:
1. **Admin Panel**: Manages and encrypts WhatsApp API credentials (URL, Tokens, IDs).
2. **Database (Supabase)**: Stores these credentials securely in an encrypted format.
3. **Backend API**: Handles the encryption/decryption of these settings.
4. **App/Service Side**: Fetches the decrypted settings to trigger WhatsApp messages.

---

## 2. Admin Panel Implementation

### Database Table: `admin_settings`
All WhatsApp configuration is stored in the `public.admin_settings` table.
- `setting_key`: Unique identifier (e.g., `WHATSAPP_API_URL`).
- `encrypted_value`: The AES-128 encrypted string.

### Settings UI
The Admin Panel provides a form to update the following keys:
- `WHATSAPP_API_URL`: The endpoint provided by your WhatsApp provider.
- `WHATSAPP_ACCESS_TOKEN`: Your permanent/temporary access token.
- `WHATSAPP_PHONE_NUMBER_ID`: The ID of the sending phone number.
- `WHATSAPP_WABA_ID`: WhatsApp Business Account ID.

### API Endpoint: `/api/admin/settings`
- **POST**: Receives raw credentials from the UI, encrypts them using the server-side `ENCRYPTION_STRING_KEY`, and upserts them into the database.
- **GET**: Fetches settings from the database, decrypts them on-the-fly, and returns them to the UI for viewing/editing.

---

## 3. App/Service Implementation

To send a notification from the App or a background service, follow these steps:

### Step 1: Fetch Credentials
The App should fetch the latest WhatsApp credentials from the Admin Panel API or a dedicated helper function. 

**Example Fetch:**
```javascript
const response = await fetch('/api/admin/settings');
const { data } = await response.json();

// Extract specific WhatsApp settings
const whatsappUrl = data.find(s => s.key === 'WHATSAPP_API_URL')?.value;
const token = data.find(s => s.key === 'WHATSAPP_ACCESS_TOKEN')?.value;
const phoneId = data.find(s => s.key === 'WHATSAPP_PHONE_NUMBER_ID')?.value;
```

### Step 2: Construct the Notification
Using the fetched credentials, the app (or backend) should call the WhatsApp Business API.

**Example Notification Payload (Meta API):**
```javascript
const sendNotification = async (recipientPhone, templateName) => {
  await fetch(`${whatsappUrl}/${phoneId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: recipientPhone,
      type: "template",
      template: {
        name: templateName,
        language: { code: "en_US" }
      }
    })
  });
};
```

---

## 4. Security Requirements

### AES-128 Encryption
All WhatsApp related values (keys starting with `WHATSAPP_`) **MUST** be encrypted before storage.
- **Key**: Uses `ENCRYPTION_STRING_KEY` from environment variables.
- **Method**: AES-128-CBC or similar (handled by `utils/encryption.ts`).

### Environment Variables
Both the Admin Panel and the App's backend environment must have:
- `ENCRYPTION_STRING_KEY`: 16-character string for AES.
- `NEXT_PUBLIC_SUPABASE_URL`: To access settings.

---

## 5. Developer Checklist for New Changes
If you change how notifications are sent:
1. **Update Admin UI**: Add any new configuration fields to the settings page.
2. **Update API Route**: Ensure the `WHATSAPP_` prefix check covers new keys.
3. **Verify Table Schema**: Ensure `encrypted_value` column is `TEXT` type to handle long ciphertexts.
4. **App-Side Update**: Ensure the mobile app logic extracts the new keys correctly from the settings array.
