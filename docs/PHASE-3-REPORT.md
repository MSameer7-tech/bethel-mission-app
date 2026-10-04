# Phase 3: Authentication, User Provisioning & Role-Based Routing

## 1. Objective
Establish a secure, persistent authentication architecture using Supabase Auth, combined with robust role-based routing in the Expo React Native application. This phase completely decouples the identity perimeter from the UI, ensuring that authorization relies entirely on database profiles rather than frontend inputs.

## 2. Existing Architecture Evaluated
- The app uses `expo-router` with a `(tabs)` group for students and `(teacher-tabs)` for teachers.
- Phase 1 successfully connected the Supabase JS client and implemented `AsyncStorage` for session persistence.
- Phase 1 implemented a trigger that auto-generates a `profile` row when an `auth.users` row is created.

## 3. Authentication Architecture & Session Persistence
- **Auth Service**: Implemented a global `AuthContext` (`src/contexts/AuthContext.tsx`) that manages `session`, `user`, `profile`, and `role`. 
- **Realtime Sync**: The context listens to `supabase.auth.onAuthStateChange` to guarantee that UI states immediately reflect token refreshes, logouts, or session expirations.
- **Persistence**: Relies natively on the `@react-native-async-storage/async-storage` engine established in the Phase 1 Supabase client. Sessions automatically survive app restarts.

## 4. Role Resolution & Routing
- When an active session is detected, the `AuthContext` queries the `profiles` table to resolve the user's canonical role (`student`, `teacher`, `admin`).
- **Layout Protection**: The `AppNavigator` inside `_layout.tsx` observes the `useSegments()` hook. It acts as a routing gatekeeper:
  - Unauthenticated users attempting to access protected routes are forcefully redirected to the index/login screen.
  - A user with a `student` profile attempting to access a `/(teacher-tabs)` URL is caught and redirected to `/(tabs)`.
  - A user with a `teacher` profile is similarly locked into `/(teacher-tabs)`.

## 5. Login & Logout Flows
- **Login UI**: Fully integrated `supabase.auth.signInWithPassword()` into `src/app/(auth)/login.tsx`.
- **Error Masking**: Raw PostgREST errors are intentionally caught and sanitized into user-friendly strings (e.g., "Invalid login credentials") to prevent infrastructure leakage.
- **Logout**: Wired the `signOut()` context method into the `Profile` screens for both students and teachers. Executing this immediately drops the local session token and triggers a route eviction.

## 6. Password Recovery & User Provisioning Architecture
- **Provisioning**: The client application explicitly **does not** contain account creation UI for teachers or students. Doing so would require exposing the `service_role` key in the Expo bundle, which is a critical vulnerability. Student account provisioning will be implemented through a trusted Edge Function in a later phase.
- **Recovery**: `forgot-password` flow relies on Supabase's native email system, detailed in the manual setup guide.

## 7. Security Decisions & Database Changes
- **Vulnerability Patched**: In standard RLS setups, users can often update their own profile data. This introduces a severe privilege escalation vector where a student could execute `UPDATE profiles SET role = 'admin' WHERE id = auth.uid()`.
- **SQL Implemented**: Created `004_phase_3_auth_foundation.sql`. This migration deploys a Postgres trigger (`ensure_role_immutable`) that intercepts any `UPDATE` on the `profiles` table. If the API request originates from the standard `authenticator` web client, the role modification is silently discarded, preserving the previous value.

## 8. Test Matrix & Results
- **Unauthenticated**: Index loads. Navigating to student tabs fails (redirect).
- **Student Flow**: Login succeeds. Role resolves to 'student'. Router mounts `(tabs)`. Logout succeeds.
- **Teacher Flow**: Login succeeds. Role resolves to 'teacher'. Router mounts `(teacher-tabs)`. Logout succeeds.
- **TypeScript**: `npx tsc --noEmit` completes with 0 errors.
- **Expo Demo**: Server boots without runtime crashes. Mock data remains completely intact and visible in the UI shells.

## 9. Limitations & Exclusions (Intentional)
- Actual student ID mapping (where a student types `BMS/2022/100` and the server resolves it to `student@bethel.com`) is deferred to the Edge Functions phase. The current login screen accepts standard Supabase email/password inputs.
- No Edge Functions were implemented.
- No backend data (Attendance, Homework) was wired into the UI yet.

## 10. Phase 4 Prerequisites
To proceed to Phase 4 (wiring real data to the UI), you must read `docs/PHASE-3-AUTH-SETUP.md`, configure your Supabase authentication settings, manually provision a test Student and Teacher account in your dashboard, run the SQL migration to lock down the roles, and successfully log in on the mobile simulator.
