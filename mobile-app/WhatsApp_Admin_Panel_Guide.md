# Admin Panel WhatsApp REST API Integration Guide

This document outlines the necessary UI, API, and Data flows required to integrate the dynamically encrypted 3rd Party WhatsApp REST API settings securely from the frontend Admin Panel.

## 1. Goal Overview
The system now uses a `admin_settings` table to store WhatsApp API credentials instead of local environment variables. The backend automatically encrypts all credentials saved to this table utilizing a 16-digit AES string key (`PHONE_OPT_ENCRYPTION_STRING_KEY`). The values are then decrypted on-the-fly when dispatching OTPs for App user registration or password reset flows.

## 2. UI Flow
You will need a new page in your Admin Panel (e.g., `Settings > Authentication` or `Settings > WhatsApp API`).

### Required Form Fields
The UI should provide a form with the following inputs:
- **WhatsApp API URL**: (e.g., `https://bhashsms.com/api/sendmsg.php`)
- **API Username**: (e.g., `MisCRM`)
- **API Password**: (Type: Password/Hidden)
- **Sender ID**: (e.g., `MisCRM`)
- **Template Name**: (e.g., `service_rejected_hindi`)
- **Admin Secret**: (A security field to verify the user has the right to change settings, e.g., `mantrapuja-admin-keys`)

### User Actions
1. **On Load**: The page should fetch the existing credentials (if any) and populate the form fields.
2. **On Save**: The user clicks a "Save Configuration" button. The form data is sent to the backend.
3. **Feedback**: Display success ("Settings saved securely!") or error toasts based on the backend response.

## 3. API Flow
Your frontend Admin Panel needs to interact with the following two backend endpoints to manage these settings. 

### GET `/api/admin/settings`
- **Purpose**: Fetch existing WhatsApp configurations to populate the UI form. The backend handles decrypting the settings automatically so the UI receives readable values.
- **Query Params**:
  - `secret`: The static admin secret key protecting these settings (e.g., `?secret=mantrapuja-admin-keys`).
- **Response Format**:
  ```json
  {
    "data": [
      { "key": "WHATSAPP_API_URL", "value": "..." },
      { "key": "WHATSAPP_API_USER", "value": "..." },
      ...
    ]
  }
  ```

### POST `/api/admin/settings`
- **Purpose**: Send the updated WhatsApp form field values to the backend. The backend securely AES-encrypts these values before inserting them into the database.
- **Request Body**:
  ```json
  {
    "secret": "mantrapuja-admin-keys",
    "settings": [
      { "key": "WHATSAPP_API_URL", "value": "https://bhashsms.com/api/sendmsg.php" },
      { "key": "WHATSAPP_API_USER", "value": "MisCRM" },
      { "key": "WHATSAPP_API_PASS", "value": "123456" },
      { "key": "WHATSAPP_API_SENDER", "value": "MisCRM" },
      { "key": "WHATSAPP_TEMPLATE_NAME", "value": "service_rejected_hindi" }
    ]
  }
  ```
- **Response Format**:
  ```json
  {
    "message": "Settings encrypted and saved successfully!"
  }
  ```

## 4. App User OTP Flow (Data Flow)
Once the admin configures these settings, the mobile app authentication flows automatically utilize them.

1. **User Action**: A user requests Registration (`/api/auth/register`) or Forgot Password (`/api/auth/forgot-password`) from the React Native app.
2. **OTP Generation**: The backend generates a 6-digit OTP and *encrypts* it securely into the Supabase `otps` table (Note: Ensure the `otp` column in Supabase is of type `text`, NOT `varchar(10)`).
3. **Database Pull**: The backend `sendWhatsApp` function triggers. It performs a database query to the `admin_settings` table to retrieve your stored WhatsApp API credentials.
4. **Decryption**: The backend runs `decryptOTP` on the fetched `admin_settings` records to retrieve the plaintext URL, username, password, sender, and template values.
5. **Dispatching**: The backend constructs the GET request payload dynamically using your BhashSMS credentials and dispatches the customized WhatsApp message to the user.

---
> **Important Database Note**: Do not forget to change the type of the `otp` column in the Supabase `otps` table to `text` to ensure the AES-128 ciphertext (which is long) does not trigger a database insertion error!
