# Bethel Mission School - Backend Architecture

## Overview
This document defines the finalized backend architecture for the Bethel Mission School Management Application. 
The system uses **Supabase** as the primary backend platform, eliminating the need for a separate traditional backend (like FastAPI or Express).

### Tech Stack
- **Frontend:** React + TypeScript (Expo / React Native)
- **Backend Platform:** Supabase
- **Database:** PostgreSQL (managed by Supabase)
- **Authentication:** Supabase Auth
- **Security:** Row Level Security (RLS)

---

## 1. Core Principles
- **Direct Client-to-Database CRUD:** Normal operations (fetching student profiles, attendance, homework, study materials, results, fees, events, messages) will utilize the `supabase-js` client directly from the React frontend.
- **RLS as the Security Boundary:** Frontend role checks are exclusively for UX. All actual security and authorization enforcement is handled by PostgreSQL Row Level Security (RLS) policies.
- **Free-First Design:** The application is built to minimize infrastructure costs by staying within Supabase's free tier. 
  - Avoid unnecessary realtime subscriptions.
  - Rely on direct queries and pagination.
  - Optimize storage usage.
  - No unnecessary backend polling.

---

## 2. Authentication & Authorization
- **Identity Provider:** Supabase Auth.
- **Roles:** `student`, `teacher`, `admin`.
- **Parents:** Do not have a distinct dashboard. Parents access the system via their child's authenticated `student` account.
- **Identity Model:** Authentication is anchored to `auth.users`. User credentials are not duplicated. Profile data (school specific) lives in the `profiles` table, linked by `id = auth.users.id`.

---

## 3. Edge Functions
Edge Functions are strictly reserved for secure, server-side logic that cannot or should not be handled by the client.
- `/supabase/functions/payment-create` - Initiating secure payment sessions.
- `/supabase/functions/payment-webhook` - Handling async payment gateway webhooks securely.
- `/supabase/functions/send-notification` - Dispatching push notifications (FCM/APNS).
- `/supabase/functions/admin-operation` - Highly privileged school administration tasks.
- `/supabase/functions/generate-report` - Heavy PDF/Excel report generation.

*Rule: Never create an Edge Function for a simple SELECT, INSERT, or UPDATE unless specific business logic demands it.*

---

## 4. Storage Strategy
Large files are never stored as BLOBs in PostgreSQL.
- **Supabase Storage** is used for:
  - Study material PDFs
  - Homework attachments
  - Circulars
  - Result documents
  - Profile images
- Metadata (file name, URL, uploader, size) is stored in PostgreSQL tables. Storage buckets will have their own security policies mapped to user roles.

---

## 5. Realtime Data
Supabase Realtime is used selectively to prevent connection exhaustion.
- **Permitted uses:**
  - Chat / Messaging system (`messages` table).
  - Live broadcast notifications.
  - Urgent global announcements.
- Standard dashboard screens (like Attendance or Homework) will rely on standard `SELECT` fetching rather than realtime subscriptions.

---

## 6. Frontend Data Layer
The React frontend will not scatter raw `supabase.from()` calls inside UI components.
All database operations are encapsulated in domain-specific Service Modules located in `src/services/`. UI components will consume these services (often wrapped in React Query or custom hooks) to maintain a clean separation of concerns.

## 7. Environment Configuration
The frontend securely connects using public keys. The `service_role` key is **never** exposed to the React frontend.
```env
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```
*(Note: Expo requires the `EXPO_PUBLIC_` prefix for client-side environment variables).*
