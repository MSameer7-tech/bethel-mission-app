# Phase 3: Supabase Authentication Setup Guide

To fully enable Phase 3 Authentication, you need to configure your Supabase project dashboard to support the required authentication flows.

## 1. Authentication Provider Setup
For the Bethel Mission School app, we use Supabase's native Email/Password authentication.
1. Go to the Supabase Dashboard -> **Authentication** -> **Providers**.
2. Ensure **Email** is enabled.
3. *Optional but recommended for testing*: Disable "Confirm email" if you want to immediately provision accounts without needing a real email inbox for verification during development.

## 2. Password Recovery Configuration
When users click "Forgot Password", Supabase sends an email containing a recovery link.
1. Go to **Authentication** -> **Email Templates**.
2. Locate the **Reset Password** template.
3. The template must include the `{{ .ConfirmationURL }}` variable.
4. Because this is an Expo mobile app, the URL needs to deep-link back into your application.
5. Go to **Authentication** -> **URL Configuration**.
6. Under **Site URL**, enter your application's base URL (or a placeholder if only testing locally).
7. Under **Redirect URLs**, add your Expo deep link scheme (e.g., `exp://localhost:8081/--/reset-password` or `bethelapp://reset-password`).

## 3. Provisioning Test Accounts
Because the app explicitly prohibits users from arbitrarily registering as "Teacher" or "Admin" via the UI, you must provision your first test accounts directly in the Supabase Dashboard.

### Create a Test Student
1. Go to **Authentication** -> **Users** -> **Add user** -> **Create new user**.
2. Enter an email (e.g., `student@test.com`) and a password (e.g., `password123`).
3. Click **Create user**.
4. Behind the scenes, the Phase 1 Postgres trigger automatically intercepts this creation and inserts a row into the `profiles` table with the default role of `student`.

### Create a Test Teacher
1. Create another user in **Authentication** -> **Users** (e.g., `teacher@test.com`, `password123`).
2. The trigger creates their profile as a `student` by default.
3. Go to the **Table Editor** -> **profiles**.
4. Locate the newly created profile row.
5. Manually edit the `role` column and change it from `student` to `teacher`.
6. This manual step simulates what the future Admin Edge Function will do automatically.

## 4. Run the Security Patch
Finally, ensure the frontend cannot maliciously override your manual role assignments.
1. Open the **SQL Editor**.
2. Copy and run the contents of `supabase/sql/004_phase_3_auth_foundation.sql`.
3. This creates a Postgres trigger that actively rejects any attempt by a mobile client to `UPDATE profiles SET role = 'admin'`.

You are now ready to log into the mobile app using the test accounts you just created!
