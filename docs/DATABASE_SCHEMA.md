# Database Schema Design

This document outlines the initial relational schema for the Bethel Mission School PostgreSQL database (Supabase). 

## Identity & Profiles

### 1. `profiles`
- **Purpose**: Extends the base `auth.users` with application-specific role and status.
- **Columns**: 
  - `id` (UUID, PK, FK to `auth.users.id`)
  - `role` (ENUM: 'student', 'teacher', 'admin')
  - `first_name` (Text)
  - `last_name` (Text)
  - `avatar_url` (Text, nullable)
  - `created_at` (Timestamp)
- **RLS Requirements**: Users can read their own profile. Admins can read/write all.

### 2. `students`
- **Purpose**: School-specific data for student accounts.
- **Columns**:
  - `id` (UUID, PK, FK to `profiles.id`)
  - `admission_number` (Text, Unique)
  - `class_id` (UUID, FK to `classes.id`)
  - `section_id` (UUID, FK to `sections.id`)
  - `dob` (Date)
  - `blood_group` (Text, nullable)
- **RLS Requirements**: Student can read their own row. Teachers can read students in their classes.

### 3. `teachers`
- **Purpose**: School-specific data for teacher accounts.
- **Columns**:
  - `id` (UUID, PK, FK to `profiles.id`)
  - `employee_id` (Text, Unique)
  - `department` (Text)
  - `designation` (Text)
- **RLS Requirements**: Teachers can read their own row. All authenticated users can read basic teacher info.

---

## Academic Structure

### 4. `classes`
- **Purpose**: Represents academic levels (e.g., 'Class VII').
- **Columns**: `id` (UUID, PK), `name` (Text), `level` (Int)
- **RLS**: Read-only for all authenticated users. Admin writable.

### 5. `sections`
- **Purpose**: Represents sections within a class (e.g., 'VII-C').
- **Columns**: `id` (UUID, PK), `class_id` (UUID, FK), `name` (Text), `room_number` (Text)
- **RLS**: Read-only for all authenticated users. Admin writable.

### 6. `subjects`
- **Purpose**: Represents academic subjects.
- **Columns**: `id` (UUID, PK), `name` (Text), `code` (Text, Unique)
- **RLS**: Read-only for all authenticated users.

---

## Core Operations

### 7. `attendance`
- **Purpose**: Daily attendance records.
- **Columns**:
  - `id` (UUID, PK)
  - `student_id` (UUID, FK to `students.id`)
  - `date` (Date)
  - `status` (ENUM: 'present', 'absent', 'late', 'half-day')
  - `recorded_by` (UUID, FK to `teachers.id`)
- **Indexes**: `(student_id, date)`
- **RLS Requirements**: Students can read where `student_id = auth.uid()`. Teachers can insert/update for their assigned sections.

### 8. `homework`
- **Purpose**: Homework assignments issued by teachers.
- **Columns**:
  - `id` (UUID, PK)
  - `section_id` (UUID, FK)
  - `subject_id` (UUID, FK)
  - `teacher_id` (UUID, FK)
  - `title` (Text)
  - `description` (Text)
  - `due_date` (Timestamp)
  - `attachment_url` (Text, nullable)
- **RLS Requirements**: Students can read homework where `section_id` matches their own. Teachers can CRUD their own created homework.

### 9. `homework_submissions`
- **Purpose**: Tracking student submissions for homework.
- **Columns**: `id` (PK), `homework_id` (FK), `student_id` (FK), `status` (Text), `submitted_at` (Timestamp), `file_url` (Text)
- **RLS**: Students can insert/read their own. Teachers can read submissions for their homework.

### 10. `study_materials`
- **Purpose**: Resources shared with students.
- **Columns**: `id` (PK), `section_id` (FK), `subject_id` (FK), `title` (Text), `file_url` (Text), `type` (ENUM: 'pdf', 'doc', 'video'), `uploaded_by` (FK)
- **RLS**: Students can read based on their `section_id`. Teachers can CRUD.

---

## Finance & Administration

### 11. `fees`
- **Purpose**: Tracking fee structures and dues per student.
- **Columns**: `id` (PK), `student_id` (FK), `term_name` (Text), `total_amount` (Numeric), `due_date` (Date), `status` (ENUM: 'pending', 'paid', 'overdue')
- **RLS**: Students can read where `student_id = auth.uid()`. Admin CRUD.

### 12. `payments`
- **Purpose**: Immutable ledger of actual payments made.
- **Columns**: `id` (PK), `fee_id` (FK), `student_id` (FK), `amount_paid` (Numeric), `payment_date` (Timestamp), `transaction_ref` (Text), `method` (Text)
- **RLS**: Students can read their own. Insert allowed only via secure Edge Function (Stripe/Razorpay webhook).

### 13. `leave_applications`
- **Purpose**: Student leave requests.
- **Columns**: `id` (PK), `student_id` (FK), `start_date` (Date), `end_date` (Date), `reason` (Text), `status` (ENUM: 'pending', 'approved', 'rejected'), `attachment_url` (Text)
- **RLS**: Students can CRUD their own. Teachers/Admins can read/update status.

---

## Communication

### 14. `messages`
- **Purpose**: Peer-to-peer or Teacher-Student communication.
- **Columns**: `id` (PK), `sender_id` (FK), `receiver_id` (FK), `content` (Text), `created_at` (Timestamp), `read_at` (Timestamp)
- **RLS**: Users can read/insert where `auth.uid() IN (sender_id, receiver_id)`.

### 15. `notifications`
- **Purpose**: System alerts and broadcast notices.
- **Columns**: `id` (PK), `user_id` (FK, nullable for broadcast), `title` (Text), `body` (Text), `type` (Text), `is_read` (Boolean)
- **RLS**: Users can read where `user_id = auth.uid()` OR `user_id IS NULL` (broadcast).

---

## Misc Entities

- **`exams`** & **`results`**: Exam definitions and student marks.
- **`calendar_events`**: School-wide or class-specific calendar events.
- **`circulars`**: Official PDF circulars issued by administration.
- **`library_books`** & **`library_issues`**: Tracking library inventory and student checkouts.
- **`transport_routes`**: Bus route assignments and driver contact info.
