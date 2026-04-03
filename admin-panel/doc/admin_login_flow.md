# Admin Panel Login Screen Flow

This document details the essential features, UI components, and authentication flow for creating the Admin Panel Login Screen using Supabase as the credentials provider.

## 1. Prerequisites Setup
Before building the UI, ensure that the Supabase client is configured in your Next.js application.

- **Supabase Keys**: Have `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` stored securely in your `.env.local` file.
- **Client Initializer**: Create a simple utility to initialize the Supabase client using `@supabase/supabase-js` or `@supabase/ssr` (for Next.js App Router).

## 2. Taking Credentials from Supabase
Because this is an admin panel, standard users should not be allowed to sign up. 
1. Go to your **Supabase Dashboard** -> **Authentication** settings.
2. Disable "Allow new users to sign up".
3. Add initial admin credentials manually via the Supabase Dashboard UI (create a new user with an email and a strong password).

*This ensures the login screen only exists for verifying strict, predefined credentials.*

## 3. UI Requirements for the Login Screen
The Login Component (`/src/app/login/page.tsx`) must contain the following structural elements:

1. **Header/Logo Section**: To indicate this is the "Mantra Pooja Admin Dashboard".
2. **Email Input**: An input field `type="email"` for the admin's email.
3. **Password Input**: An input field `type="password"` for the password.
4. **Submit Button**: A clear call-to-action button, e.g., "Sign In".
5. **Feedback States**:
   - Loading Spinner on the submit button.
   - Error messages clearly displaying the Supabase auth response (e.g., "Invalid credentials").

## 4. The Authentication Flow (Step-by-Step)
1. **Initial State**: The user visits `/login`. The form is empty and waiting for input.
2. **State Management**: As the user types their email and password, update the local React state (e.g., using `useState`).
3. **Form Submission**: 
   - Prevent default form submission.
   - Enter a `loading` state to provide visual feedback.
   - Call the `supabase.auth.signInWithPassword({ email, password })` API.
4. **Response Handling**:
   - **On Error**: Catch the error and print it locally below the form (e.g. `setError(error.message)`). Turn off the loading state.
   - **On Success**: Supabase establishes a session and saves an auth token to local storage/cookies.
5. **Redirection**: On successful login, instantly redirect the user to the protected dashboard path (e.g., `/` or `/dashboard`) using `router.push('/dashboard')` or equivalent Next.js routing functions.

## 5. Middleware and Route Protection
To prevent unauthenticated users from bypassing the UI and manually visiting `/dashboard`:

1. Define a Next.js `middleware.ts` in the root of your `src/` directory.
2. In the middleware, read the Supabase session cookie on every request to protected routes.
3. **If the user is not logged in**: Redirect them back to `/login`.
4. **If the user IS logged in but tries to visit `/login`**: Redirect them to `/dashboard` to avoid presenting the login screen to authenticated admins.

## Summary Checklist
- [x] Configure Supabase Project and Environment Variables.
- [x] Pre-populate Database with an Admin Email/Password via Supabase UI.
- [x] Create Login Page component with Email and Password inputs.
- [x] Connect inputs to state handlers.
- [x] Send data to Supabase `signInWithPassword`.
- [x] Manage Error and Loading states.
- [x] Redirect user upon successful auth.
- [x] Protect internal routes using Middleware.
