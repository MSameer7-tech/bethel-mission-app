# Phase 5.1: Account Provisioning Architecture Audit

## 1. Existing Schema
The current database schema provides a solid relational foundation:
- **`profiles`**: Links to `auth.users` with basic identity (`first_name`, `last_name`, `avatar_url`) and role (`student`, `teacher`, `admin`).
- **`students`**: Extends profiles with `admission_number`, `section_id`, `dob`, `blood_group`, and basic parent info.
- **`teachers`**: Extends profiles with `employee_id`, `department`, `designation`.
- **`academic_years`**: Stores active and historical years.
- **`classes`, `sections`, `subjects`**: Defines the school structure.
- **`teacher_subjects`**: Maps teachers to specific sections and subjects.

## 2. Existing Identity Model
- Supported: Admin/Principal (`profiles.role = 'admin'`), Teacher accounts, Student accounts.
- The `profiles` table acts as the unified identity anchor, while `students` and `teachers` store role-specific metadata.

## 3. Existing Teacher Assignment Model
- **Relationship**: Teacher -> `teacher_subjects` -> `class_subjects` -> `sections` -> `classes`.
- **Sufficiency**: This explicitly maps a Teacher to a Section (and inherently its Class) for a specific Subject.
- **RLS**: The `is_teacher_of_section()` and `is_teacher_of_student()` helper functions (added in the Phase 2 Security Correction) securely leverage this relationship.
- **Missing Link**: There is currently no direct structural link between a `section` (or a `teacher_subject` assignment) and an `academic_year`. This creates a critical flaw for historical rollovers.

## 4. Existing Student Model
- **Relationship**: Student -> `section_id` (inside `students` table).
- **Flaw**: Because the student's `section_id` is a direct column on the `students` table without an academic year map, graduating a student to the next class overwrites their historical section placement.
- **Missing Fields**:
  - *Identity*: middle name, gender.
  - *Academic*: roll number, admission date.
  - *Parent/Guardian*: mother name, guardian name, parent/guardian email.
  - *Contact*: student phone, student email, address, city, state, PIN code.

## 5. Existing RLS
- **TEACHER**: Highly secure. They only have `SELECT/INSERT/UPDATE` access to data (attendance, homework, results) where `is_teacher_of_student()` or `is_teacher_of_section()` returns true. Default-denial prevents them from inserting into `teacher_subjects` (cannot assign themselves) or `students` (cannot bypass creation logic).
- **STUDENT**: Highly secure. Students can only `SELECT` where `auth.uid() = student_id`. The Phase 3 trigger `ensure_role_immutable` strictly prevents them from updating their `role` in `profiles`. They have no `UPDATE` policies on `students`, meaning they cannot modify their class, section, or admission number.

## 6. Missing Fields
- Add to `profiles`: `is_active BOOLEAN DEFAULT true`, `requires_password_change BOOLEAN DEFAULT false`.
- Add to `students`: `middle_name`, `gender`, `roll_number`, `admission_date`, `mother_name`, `guardian_name`, `parent_email`, `student_phone`, `student_email`, `address`, `city`, `state`, `pin_code`.

## 7. Missing Relationships
- **Academic Year History**: We must either add `academic_year_id` to the `sections` table (meaning sections are recreated each year: "Class 8A - 2026") OR create a `student_academic_years` mapping table to track a student's historical placements. Adding `academic_year_id` to `sections` is the cleanest normalized approach for this architecture.

## 8. Teacher ID Generation Recommendation
- **Mechanism**: Use a PostgreSQL Sequence + Trigger or Default function.
  ```sql
  CREATE SEQUENCE teacher_id_seq START 1;
  -- Default value: 'TCH' || LPAD(nextval('teacher_id_seq')::TEXT, 3, '0')
  ```
- This completely avoids `Math.random()` and race conditions, ensuring safe, atomic generation of `TCH001`, `TCH002`.

## 9. Student ID Generation Recommendation
- **Mechanism**: Use a similar PostgreSQL Sequence.
  ```sql
  CREATE SEQUENCE student_id_seq START 1;
  -- Default value: 'STU' || LPAD(nextval('student_id_seq')::TEXT, 4, '0')
  ```

## 10. Admission Number Handling
- `admission_number` is already defined as `TEXT UNIQUE NOT NULL` in the `students` table. It should remain a manually entered or separately sequenced permanent school identifier, distinct from the internal `STU001` auth credential.

## 11. Account Activation/Deactivation
- Do NOT delete rows. We must add an `is_active BOOLEAN DEFAULT true` column to `profiles`. This acts as a soft-delete mechanism, immediately stripping active dashboard access via Edge Function and Client routing while perfectly preserving historical database constraints (marks, fees, attendance).

## 12. Password-State Architecture
- Add `requires_password_change BOOLEAN DEFAULT true` to `profiles`.
- **Workflow**:
  1. Principal/Teacher provisions the account.
  2. Edge function returns a temporary password.
  3. User logs in. Expo app checks `requires_password_change`.
  4. If `true`, the user is force-routed to a "Change Password" screen and cannot access `/(tabs)` until they change it and update the database flag.

## 13. Edge Function Architecture
Because `service_role` cannot be embedded in the mobile app, provisioning must be offloaded to Supabase Edge Functions (Deno).
- **Function**: `provision_user`
- **Flow**:
  1. App sends POST with JWT and new user details.
  2. Edge Function verifies JWT and checks if `auth.uid()` has `admin` (or `teacher` with section auth) privileges.
  3. Function generates a secure random temporary password.
  4. Function calls `supabase.auth.admin.createUser({ email, password })`.
  5. Function inserts the returned user ID into `students` or `teachers` (bypassing RLS safely on the server side).
  6. Function returns the temporary credentials to the invoker (Principal/Teacher) to share.

## 14. RLS Changes Required
No immediate changes to existing structural RLS are required because the current default-denial setup is highly secure. However, we must explicitly ensure:
- Only Admin can update `is_active` for Teachers.
- Admin/Assigned Teachers can update `is_active` for Students.
- Users can update their own `requires_password_change` flag (to set it to false).

## 15. Exact SQL Changes Required (Minimal Foundation)
*We recommend executing these in Phase 5.2 prior to UI creation:*
1. Create PostgreSQL sequences for IDs.
2. Add `is_active` and `requires_password_change` to `profiles`.
3. Add missing demographic/academic columns to `students`.
4. Add `academic_year_id` to `sections` to solidify historical isolation.

## 16. Recommended Implementation Order (Phase 5.2+)
1. **Schema Update**: Apply the minimal foundation SQL.
2. **Edge Function**: Scaffold and deploy the `provision_user` Edge Function.
3. **Admin UI**: Create the Principal's "Add Teacher" screen.
4. **Teacher UI**: Create the Teacher's "Add Student" screen.
5. **Auth Gateway**: Implement the forced password-change interceptor in `_layout.tsx`.
