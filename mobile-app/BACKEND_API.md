# MantraPuja Backend API Documentation

This document outlines the available API endpoints for the MantraPuja backend service. All endpoints follow the /api base path.

## 1. Authentication Endpoints (/api/auth)

These endpoints handle the mobile OTP registration, login, and user verification flow.

### GET /api/auth/check-user
Checks if a user exists in the database.
**Query Params**:
  - phone: User's mobile number.
**Response**:
  - exists: boolean
  - verified: boolean (phone verification status)

### POST /api/auth/register
Initiates the registration process and sends an OTP via WhatsApp.
**Body**:
  - phone: Mobile number.
  - full_name: User's full name.
**Response**:
  - message: SUCCESS message.

### POST /api/auth/verify-otp
Verifies a six-digit OTP.
**Body**:
  - phone: Mobile number.
  - otp: 6-digit code.
  - purpose: Purpose of the OTP (e.g., REGISTER, FORGOT_PASSWORD).
**Response**:
  - verified: true

### POST /api/auth/finalize-register
Finalizes account creation after OTP verification by creating a Supabase Auth user.
**Body**:
  - phone: Mobile number.
  - password: User's chosen password.
  - full_name: User's full name.
  - email: (Optional) User's email.
**Response**:
  - message: "Registration complete"

---

## 2. Guru AI Chat (/api/chat)

Handles the spiritual AI Pandit chat powered by Google Gemini.

### POST /api/chat
Processes a spiritual query and returns an AI response.
**Body**:
  - message: The user's question.
  - chatHistory: Array of previous messages in Gemini format (parts/role).
  - userId: The unique ID of the logged-in user.
  - sessionId: (Optional) Persistent session ID.
  - language: 'hi' (Hindi) or 'en' (English).
**Response**:
  - text: The AI's response.
  - sessionId: The current chat session ID.

---

## 3. Admin & Settings (/api/admin)

Used by the admin panel to manage platform configurations.

### GET /api/admin/settings
Retrieves general platform settings (WhatsApp API keys, templates, etc.).

### POST /api/admin/settings
Saves or updates general platform settings.
**Body**: Key-value pairs of settings.

### GET /api/admin/astrology/settings
Retrieves astrology-specific settings (Vedaluna API keys, default coordinates).

### POST /api/admin/astrology/settings
Updates astrology engine settings.

### POST /api/admin/notifications/broadcast
Sends a broadcast notification via WhatsApp.
**Body**:
  - phone: Target mobile number.
  - template: WhatsApp template name.
  - variables: Comma-separated list of template parameters.

---

## 4. Astrology Proxy (/api/astrology)

Proxies requests to external professional astrology engines safely from the server.

### POST /api/astrology/proxy/:endpoint
Forwards a request to the configured Astrology API.
**URL Parameter**: :endpoint (e.g., numero_table, horoscope_daily).
**Body**: Parameters required by the specific astrology endpoint.

---

## 5. Technical Constants

**Base URL**: http://lk8ogw0kkok0sso484swc0wc.34.93.68.183.sslip.io
**Authentication**: Most admin routes require a Supabase Service Role key or valid Admin session.
**Phone Formatting**: The backend automatically normalizes phone numbers to a 10-digit format for consistency.
