# Bethel Mission School - Database Schema Documentation

## 1. Database Architecture
The backend is completely serverless, utilizing **Supabase PostgreSQL** as the core database. Application logic is pushed down into the database via Foreign Keys, Constraints, and **Row Level Security (RLS)**. No traditional middleware (Express/FastAPI) is used for basic CRUD operations. 

## 2. Identity and Roles
Authentication relies entirely on `auth.users` from Supabase Auth.
- **`profiles`**: Extends `auth.users` adding `first_name`, `last_name`, `avatar_url`, and crucially, the custom `app_role` enum (`student`, `teacher`, `admin`).
- **`students`**: Extends `profiles`. Includes `admission_number`, `dob`, `section_id` (foreign key to `sections`), and parent contact details.
- **`teachers`**: Extends `profiles`. Includes `employee_id` and `department`.
*Note: Parents do not have their own auth role. They log in via their student's credentials.*

## 3. Academic Structure
- **`academic_years`**: Defines terms (e.g., "2026-2027").
- **`classes`**: E.g., "Class 8".
- **`sections`**: E.g., "A", "B", tied to a specific class.
- **`subjects`**: Global subject definitions.
- **`class_subjects`**: Junction mapping subjects to specific sections.
- **`teacher_subjects`**: **(Key Authorization Mapping)** Connects a teacher to a specific section/subject. This table is the absolute source of truth for teacher permissions.

## 4. Attendance
- **`attendance`**: Records daily presence. 
  - *Constraint*: `UNIQUE(student_id, date)` ensures no duplicate records for a student on a given day.
  - *Status*: Uses `attendance_status` ENUM (`present`, `absent`, `late`, `excused`).

## 5. Homework and Study Materials
- **`homework`**: Assignments created by a teacher for a `section_id`. 
- **`homework_submissions`**: Uploads/metadata submitted by a `student_id`.
- **`study_materials`**: Educational resources bound to a `section_id` and `subject_id`.

## 6. Exams and Results
- **`exams`**: E.g., "Half Yearly", tied to an `academic_year`.
- **`exam_subjects`**: Specifies max/passing marks for a specific subject in a specific exam for a specific section.
- **`exam_results`**: The actual numeric grade a student received.
  - *Constraint*: `UNIQUE(exam_subject_id, student_id)` prevents accidental double grading.

## 7. Fees
- **`fee_categories`**: E.g., "Tuition", "Transport".
- **`fee_structures`**: Defines how much a specific `class_id` owes for a specific category in a given year.
- **`student_fees`**: Joins a `student` to a `fee_structure` with a `fee_status` (`pending`, `partial`, `paid`).
- **`fee_payments`**: Immutable ledger of actual payment events (amounts, dates, transaction references).

## 8. Communication and Services
- **`circulars`**: Global or role-targeted announcements.
- **`messages`**: Direct peer-to-peer or teacher-to-student text.
- **`notifications`**: System alerts (e.g., "Leave Approved").
- **`leave_applications`**: Absence requests moving through `pending` -> `approved`/`rejected` states.
- **`calendar_events`**: Chronological events (holidays, exams, deadlines).

## 9. Transport and Library
- **`transport_routes`**: Bus and driver details.
- **`student_transport`**: 1-to-1 mapping of a student to a route.
- **`library_books`**: Informational catalog of available texts.

## 10. Row Level Security (RLS) Strategy
RLS policies form the absolute security perimeter. Authorization is enforced dynamically by PostgreSQL at the moment of querying.
- **Helper Functions (`SECURITY DEFINER`)**: 
  - `get_auth_role()`: Safely fetches role from `profiles` without infinite recursion.
  - `is_teacher_of_section(section_id)`: Checks if the user maps to `teacher_subjects -> class_subjects` for a given section.
  - `is_teacher_of_student(student_id)`: Maps the target student's `section_id` back to the teacher's assignments.
- **Student Permissions**: Students can only `SELECT` rows where `student_id = auth.uid()` (Attendance, Results, Fees, Payments, Transport). For section-wide data (Homework, Study Material), policies verify if the row's `section_id` matches the student's assigned `section_id`. They can only `INSERT` into `homework_submissions` and `leave_applications`.
- **Teacher Permissions**: Teachers DO NOT have blanket global access. RLS explicitly rejects queries for students, sections, or subjects not linked to them in the `teacher_subjects` mapping table. For example, a math teacher can grade their students but cannot read/write attendance for a section they do not teach.
- **Admin Permissions**: Admins execute globally either via service_role in Edge Functions, or via bypass if directly querying from a dashboard.

## 11. Storage Strategy & File Management
No binary files (PDFs, Images) are stored in Postgres. Tables like `homework` and `leave_applications` contain an `attachment_url` column which will eventually map to a Supabase Storage bucket. Storage configuration is reserved for a future phase.

## 12. Indexes
Indexes are strategically placed on frequently queried Foreign Keys (e.g., `student_id` in `attendance`, `section_id` in `homework`) and temporal columns (e.g., `start_time` in `calendar_events`) to guarantee sub-millisecond query performance as the school scales over years.
