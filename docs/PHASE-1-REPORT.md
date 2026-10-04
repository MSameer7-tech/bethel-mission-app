# Phase 1: Supabase Foundation

## 1. Objective
Establish the foundational Supabase architecture within the existing React Native/Expo project safely, without rewriting the frontend UI, adding premature tables, or disrupting the existing demo mode.

## 2. Existing Project State
The Expo project remains structurally intact. The demo mode continues to run perfectly using the local mock data in `src/data/`. `TouchableBounce` and `ThemeContext` are undisturbed.

## 3. Supabase Architecture
We have established a singleton Supabase client pattern using `react-native-url-polyfill` and `@react-native-async-storage/async-storage` for native compatibility. The minimal database foundation links `auth.users` to a custom `profiles` table to handle identity and roles (`student`, `teacher`, `admin`).

## 4. Files Created
- `src/lib/supabase/client.ts`
- `src/lib/supabase/testConnection.ts`
- `supabase/sql/001_phase_1_foundation.sql`
- `docs/PHASE-1-SUPABASE-SETUP.md`
- `docs/PHASE-1-REPORT.md`

## 5. Files Modified
- `src/app/_layout.tsx` (Injected `testSupabaseConnection()` for boot-time verification).
- `src/services/*/*.ts` (Updated import paths for the centralized client).

## 6. Dependencies Added
- `@supabase/supabase-js` (The core JavaScript client).
- `react-native-url-polyfill` (Required for Supabase in React Native).
*(Note: `@react-native-async-storage/async-storage` was already present and leveraged).*

## 7. Environment Variables
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
*(Secured in `.env` and `.env.example`, verified ignored by git).*

## 8. Supabase Client Implementation
A centralized client is exposed from `src/lib/supabase/client.ts`. It securely grabs the Expo public variables and attaches `AsyncStorage` to the auth configuration to guarantee sessions persist across app restarts natively.

## 9. SQL Implemented
See `supabase/sql/001_phase_1_foundation.sql`.

## 10. SQL Explanation
- **ENUM `app_role`**: Defines 'student', 'teacher', and 'admin' directly at the DB type level for strict type safety.
- **Table `profiles`**: The anchor table extending Supabase's `auth.users` with app-specific data (name, role, avatar).
- **RLS Policies**: Ensures a logged-in user can only read and update their own specific profile row.
- **Trigger `handle_new_user`**: A Postgres function that automatically intercepts any new signups in `auth.users` and creates the corresponding `profiles` row synchronously.

## 11. Connection Verification
Added a development-only utility (`testConnection.ts`) that calls `supabase.auth.getSession()` on app mount. If configured correctly, it logs a success message to the Metro bundler terminal. It does not alter the UI.

## 12. Security Considerations
- The `service_role` key is strictly excluded.
- The `profiles` table is strictly protected by `ROW LEVEL SECURITY`.
- The connection test relies entirely on public/anon keys and does not leak credentials to the UI.

## 13. Demo Mode Verification
Verified. No UI components or mock data pipelines were swapped out. The application looks and navigates identically to before this phase.

## 14. Tests Performed
- Validated TS compilation.
- Validated `npx expo start` initialization.
- Validated the dev-only console log fires.

## 15. Problems Encountered
None. The client structure was moved seamlessly from the previous phase's scaffolding into the requested `src/lib/` pattern.

## 16. Known Limitations
The database foundation is minimal. It lacks the academic and financial entities (attendance, fees, etc.), which are explicitly reserved for Phase 2.

## 17. Phase 2 Prerequisites
To proceed to Phase 2, the manual steps defined in `docs/PHASE-1-SUPABASE-SETUP.md` must be executed by the user. The Supabase project must be live, keys must be in `.env`, and the foundational SQL must be executed in the Supabase SQL editor.
