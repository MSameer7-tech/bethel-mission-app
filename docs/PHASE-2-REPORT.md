# Phase 2: Core Database Schema + RLS Design

## 1. Objective
Design and implement the comprehensive relational PostgreSQL schema for the Bethel Mission School app in Supabase. Establish strict Row Level Security (RLS) to enforce data isolation between Students, Teachers, and Admins. Produce exact, idempotent SQL migrations while keeping the existing Expo frontend and demo functionality completely undisturbed.

## 2. Starting State
Phase 1 established the Expo-Supabase connection, `.env` architecture, and the foundational `app_role` and `profiles` linking trigger. The frontend successfully compiles without TypeScript errors, and the mock UI runs perfectly.

## 3. Schema Decisions & Architecture
- **Normalized Architecture**: Data is heavily normalized to prevent anomalies (e.g., separating `fees` into `fee_categories`, `fee_structures`, `student_fees`, and `fee_payments`).
- **No Parent Role**: As requested, parents log in using student credentials, meaning the database identity anchor strictly revolves around `students` and `teachers`.
- **Idempotency**: All tables are wrapped in `CREATE TABLE IF NOT EXISTS` and enums in `DO $$ BEGIN ... EXCEPTION` blocks to ensure the migration is safe to run repeatedly if necessary.

## 4. Database Elements Created
- **Enums**: `attendance_status`, `fee_status`, `leave_status`, `homework_status`.
- **Academic Tables**: `academic_years`, `classes`, `sections`, `subjects`, `class_subjects`.
- **Identity Tables**: `students`, `teachers`, `teacher_subjects`.
- **Operations Tables**: `attendance`, `homework`, `homework_submissions`, `study_materials`, `exams`, `exam_subjects`, `exam_results`.
- **Financial Tables**: `fee_categories`, `fee_structures`, `student_fees`, `fee_payments`.
- **Comms/Services Tables**: `circulars`, `messages`, `notifications`, `calendar_events`, `leave_applications`.
- **Auxiliary Tables**: `transport_routes`, `student_transport`, `library_books`.
- **Constraints**: Enforced `UNIQUE(student_id, date)` on attendance and `UNIQUE(exam_subject_id, student_id)` on results to block duplicate entries.
- **Indexes**: Added 9 strategic `B-tree` indexes on high-traffic foreign keys (`student_id`, `section_id`).
- **RLS Policies**: Generated over 30 targeted `CREATE POLICY` statements to strictly sandbox student and teacher access.

## 5. Helper Functions
Created `public.get_auth_role()`. 
*Reasoning*: Attempting to verify a user's role by joining against the `profiles` table inside an RLS policy can cause an infinite recursion error (because querying `profiles` triggers the `profiles` RLS policy, which checks `profiles`, etc.). This `SECURITY DEFINER` function securely fetches the role without looping.

## 6. Files Created
- `supabase/sql/002_phase_2_core_schema.sql` (The core migration).
- `supabase/sql/002_phase_2_verification.sql` (The verification queries).
- `docs/PHASE-2-DATABASE-SCHEMA.md` (Detailed schema explanation).
- `docs/PHASE-2-REPORT.md` (This phase summary).

## 7. Demo UI Verification
The application frontend was deliberately ignored during this phase. No mock data arrays in `src/data/` were deleted. Running the app in Expo continues to render the UI exactly as before. 

## 8. Limitations & Exclusions (Intentional)
- **No Mock Data Seeded**: No fake students or records were injected into the SQL. The database remains a clean slate.
- **No Storage Configured**: Buckets for homework attachments and PDFs will be configured in a later phase.
- **No Edge Functions**: Payment webhooks and admin operations remain unimplemented.

## 9. Phase 3 Prerequisites
Before Phase 3 (wiring the UI to the live database), the user must manually execute `002_phase_2_core_schema.sql` in the Supabase Dashboard, followed by executing `002_phase_2_verification.sql` to confirm the tables and RLS policies deployed successfully.

## 10. Security Correction (Teacher RLS)
Following the initial Phase 2 migration, a critical security weakness was identified and rectified. Initially, Teacher policies granted broad access based on `get_auth_role() = 'teacher'`, intending to rely on the frontend/service layer to restrict routing. This violated the core principle of RLS as the absolute security boundary.

**Correction Implemented:**
- Created `supabase/sql/003_phase_2_teacher_rls_correction.sql`.
- Added the `teacher_subjects` structural dependency to authorization.
- Added two strict `SECURITY DEFINER` helper functions: `is_teacher_of_section` and `is_teacher_of_student`.
- Dropped the broad teacher policies on `attendance`, `homework`, `homework_submissions`, `study_materials`, `exam_results`, and `leave_applications`.
- Replaced them with granular policies utilizing the helper functions, guaranteeing that PostgreSQL inherently rejects cross-section and cross-subject queries for teachers. 
