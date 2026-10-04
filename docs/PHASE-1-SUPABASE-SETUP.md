# Supabase Setup Guide (Phase 1)

This guide walks you through setting up the Supabase project and connecting it to the Bethel Mission School Expo application.

## Step 1: Create the Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Click **"New Project"**.
3. Select your organization, give the project a name (e.g., `Bethel Mission App`), and generate a secure database password.
4. Choose the region closest to your users.
5. Click **"Create new project"**. (It will take a few minutes to provision).

## Step 2: Locate Environment Variables
Once the project is ready, you need the connection keys:
1. In the Supabase Dashboard, click on the **⚙️ Settings** icon (bottom left).
2. Click on **API** under Configuration.
3. Under the **Project URL** section, copy the `URL`.
4. Under the **Project API Keys** section, copy the `anon` / `public` key.

## Step 3: Configure Local Environment
1. In the root of your Expo project, locate or create the `.env` file.
2. Paste the values using the `EXPO_PUBLIC_` prefix:
```env
EXPO_PUBLIC_SUPABASE_URL=your_copied_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_copied_anon_key
```
*Important: NEVER paste the `service_role` secret key into this file. It would be exposed to anyone using the app.*

## Step 4: Run the Foundational SQL
1. In the Supabase Dashboard, click on the **SQL Editor** (the terminal icon on the left navigation).
2. Click **"New query"**.
3. Open the local file `supabase/sql/001_phase_1_foundation.sql`.
4. Copy all of the SQL from that file and paste it into the Supabase SQL Editor.
5. Click the **"Run"** button.
6. Look for the success message at the bottom right indicating the tables and triggers were created.

## Step 5: Verify the Database Foundation
1. Go to the **Table Editor** (the spreadsheet icon on the left).
2. You should now see the `profiles` table listed.

## Step 6: Verify the App Connection
1. Start your Expo development server:
   ```bash
   npx expo start
   ```
2. Open the app in your simulator or physical device via Expo Go.
3. Look at your computer's terminal running Expo. You should see the following logs:
   ```
   Testing Supabase Connection...
   URL configured: true
   Supabase Connection SUCCESS: Client initialized and communicating.
   ```
   *(Note: This test runs automatically on app boot in development mode).*
