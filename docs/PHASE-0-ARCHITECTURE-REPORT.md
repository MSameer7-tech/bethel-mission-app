# Phase 0: Project Audit and Backend Architecture Report

## 1. Executive Summary
This report summarizes the architectural audit of the existing Bethel Mission School Management App and defines the finalized backend boundaries using **Supabase**. The goal of the upcoming phases is to transition the app from local mock data to a live, production-ready Supabase PostgreSQL backend without rewriting the frontend UI or disrupting the existing design system.

## 2. Existing Frontend Architecture
- **Framework:** React Native + TypeScript using **Expo**. *(Note: The request mentioned Vite, but the codebase is definitively an Expo React Native application)*.
- **Routing:** Expo Router. Utilizes file-based routing with tab navigators `(tabs)` and deeply nested stacks `(student)`, `(teacher)`, `(settings)`.
- **State Management:** Currently relies on React local state and Context API (`ThemeContext`). No global state management libraries (Redux/Zustand) are currently installed.
- **Theme System:** A highly refined, custom design token system exists in `src/theme/`, dictating colors (light/dark mode via Async Storage), radius, shadows, and typography.
- **Components:** Custom components like `TouchableBounce` are used uniformly to provide premium touch physics.
- **Services:** Initial scaffold for `src/services/` has been created, currently returning mock data to preserve the demo mode.

## 3. Existing Screens Inventory
### Authentication
- `src/app/(auth)/login.tsx`

### Student Dashboards (Tabs)
- **Home** (`index.tsx`)
- **Academics** (`academics.tsx`)
- **Messages** (`messages.tsx`)
- **Notifications** (`notifications.tsx`)
- **Profile** (`profile.tsx`)

### Student Sub-Screens
- Attendance, Homework, Study Material, Results, Fees, Calendar, Circulars, Library, Transport, Apply Leave.

### Teacher / Admin Interfaces
- Directories exist for `(teacher)` and `(teacher-tabs)` indicating a dedicated teacher routing flow.

### Settings
- Dedicated `settings` directory for appearance and preferences.

## 4. Existing Mock Data
Mock data currently lives in two places:
1. `src/data/*.ts` (e.g., `attendance.ts`, `fees.ts`, `homework.ts`, `students.ts`, `teachers.ts`).
2. Inline static arrays inside individual screen components (e.g., `circulars`, `events`).

## 5. Screen Data Requirements Mapping
| Screen | Data Requirements |
| :--- | :--- |
| **Home** | Student Profile, Attendance Summary, Upcoming Homework, Fee Summary, Recent Activity. |
| **Attendance** | Daily attendance records, aggregate percentages. |
| **Homework** | Assignments per subject, due dates, submission status. |
| **Study Material** | Subject-wise documents, video links, file metadata (Storage). |
| **Results** | Exam scores, grades, teacher remarks. |
| **Fees** | Payment history, pending dues, due dates, term details. |
| **Calendar** | School events, exams, holidays. |
| **Circulars** | Official notices, PDF references (Storage). |
| **Library** | Book inventory, issued books, due dates. |
| **Transport** | Bus routes, driver contacts, pickup times. |
| **Apply Leave** | Leave history, status (pending/approved), submission payload. |

## 6. Proposed Supabase Architecture & Database Schema
The database will be hosted on Supabase PostgreSQL.

### Entities (ERD Overview)
1. **`profiles`** - Extends `auth.users` with `role` (student/teacher/admin), names, avatar.
2. **`students`** - Links to `profiles`, includes admission number, class_id, section_id.
3. **`teachers`** - Links to `profiles`, includes employee_id, department.
4. **`classes` & `sections`** - Academic hierarchy.
5. **`subjects`** - Subject catalog.
6. **`attendance`** - Tracks daily presence per student.
7. **`homework` & `homework_submissions`** - Assignment definitions and student uploads.
8. **`study_materials`** - Educational resource metadata.
9. **`exams` & `results`** - Grading system.
10. **`fees` & `payments`** - Financial ledger.
11. **`calendar_events` & `circulars`** - Announcements and timelines.
12. **`leave_applications`** - Absence requests.
13. **`messages` & `notifications`** - Communication systems.
14. **`library_books` & `library_issues`** - Inventory tracking.
15. **`transport_routes`** - Logistics.

## 7. Roles & Authentication Strategy
- **Identity Provider:** Supabase Auth.
- **Roles:** `student`, `teacher`, `admin`.
- **Parents:** Will log in using their child's `student` credentials. No separate role exists.

## 8. Row Level Security (RLS) Strategy
RLS acts as the primary security boundary, ensuring frontend role checks are strictly for UX.
- **Students:** `SELECT` queries restricted to rows matching their own `student_id` or `section_id`. `INSERT` restricted to their own submissions/leave apps.
- **Teachers:** `SELECT`, `INSERT`, `UPDATE` restricted to students, attendance, and homework within their assigned `section_id`s.
- **Admins:** Global read/write access based on a secure admin flag or role.

## 9. Storage Strategy
- **Supabase Storage** will house all static assets (Study Material PDFs, Homework Attachments, Circulars, Profile Avatars).
- PostgreSQL will strictly store file *metadata* (URLs, sizes, types).

## 10. Realtime & Edge Functions (The Backend Boundary)
- **Normal CRUD:** Executed directly from React Native via `supabase-js` into PostgreSQL protected by RLS.
- **Supabase Realtime:** Strictly limited to `messages` and `notifications` to remain within the Free-Tier connection limits.
- **Edge Functions:** Reserved purely for secure server-side isolation:
  - `/payment-create` & `/payment-webhook`
  - `/send-notification`
  - `/admin-operation`
  - `/generate-report`

## 11. Supabase SQL Strategy
All database migrations, table creations, RLS policy definitions, and triggers will be explicitly tracked in `.sql` files within a dedicated `supabase/sql/` directory. No database operations will be defined purely through the Supabase Studio UI without backing version control.

## 12. Potential Concerns & Risks
1. **Realtime Connection Limits:** If too many screens subscribe to Realtime, the Supabase Free Tier limits will be exhausted. *Mitigation: Restrict realtime to specific chat/notification mounts.*
2. **Offline Resilience:** React Native apps frequently drop connections. *Mitigation: The service layer should eventually implement caching strategies.*
3. **Data Fetching Overhead:** The Home screen aggregates data from 5 different tables. *Mitigation: Create a PostgreSQL View or RPC function to fetch dashboard aggregates in a single network request.*

## 13. Next Phase Recommendation
**STOP.** Do not implement the backend yet.
The next phase (Phase 1) should focus exclusively on provisioning the Supabase project, establishing the `supabase/sql/` migration scripts to build the tables, and setting up the RLS policies in isolation. Only once the database is structurally sound should the frontend service layer be wired to actual data.
