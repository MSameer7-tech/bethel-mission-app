-- ==================================================
-- PHASE 2: CORE DATABASE SCHEMA + RLS
-- ==================================================

-- 1. ENUMS
-- --------------------------------------------------
DO $$ BEGIN
    CREATE TYPE public.attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.fee_status AS ENUM ('pending', 'partial', 'paid', 'overdue');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.leave_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.homework_status AS ENUM ('pending', 'submitted', 'graded', 'late');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. HELPER FUNCTIONS
-- --------------------------------------------------
-- Avoids infinite recursion when evaluating RLS policies against the profiles table.
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS public.app_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- 3. ACADEMIC STRUCTURE
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.academic_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL, -- e.g., '2026-2027'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL, -- e.g., 'Class 8'
    level INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS public.sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g., 'A', 'B', 'C'
    room_number TEXT,
    UNIQUE(class_id, name)
);

CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    code TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS public.class_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    UNIQUE(section_id, subject_id)
);

-- 4. IDENTITY EXTENSIONS
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    admission_number TEXT UNIQUE NOT NULL,
    section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE RESTRICT,
    dob DATE NOT NULL,
    blood_group TEXT,
    parent_name TEXT,
    parent_phone TEXT
);

CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    employee_id TEXT UNIQUE NOT NULL,
    department TEXT,
    designation TEXT
);

CREATE TABLE IF NOT EXISTS public.teacher_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
    class_subject_id UUID NOT NULL REFERENCES public.class_subjects(id) ON DELETE CASCADE,
    UNIQUE(teacher_id, class_subject_id)
);

-- 5. ATTENDANCE
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status public.attendance_status NOT NULL,
    remarks TEXT,
    recorded_by UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(student_id, date) -- Prevent duplicate attendance for the same student on the same day
);

-- 6. ACADEMICS (Homework & Study Material)
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.homework (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    attachment_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.homework_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    homework_id UUID NOT NULL REFERENCES public.homework(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    status public.homework_status DEFAULT 'pending',
    file_url TEXT,
    teacher_remarks TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(homework_id, student_id)
);

CREATE TABLE IF NOT EXISTS public.study_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. EXAMS & RESULTS
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id UUID NOT NULL REFERENCES public.academic_years(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g., 'Half Yearly', 'Unit Test 1'
    start_date DATE,
    end_date DATE
);

CREATE TABLE IF NOT EXISTS public.exam_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    exam_date DATE,
    max_marks NUMERIC NOT NULL,
    passing_marks NUMERIC,
    UNIQUE(exam_id, section_id, subject_id)
);

CREATE TABLE IF NOT EXISTS public.exam_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_subject_id UUID NOT NULL REFERENCES public.exam_subjects(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    marks_obtained NUMERIC NOT NULL,
    remarks TEXT,
    entered_by UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(exam_subject_id, student_id)
);

-- 8. FEES
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fee_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL -- 'Tuition', 'Transport', 'Library'
);

CREATE TABLE IF NOT EXISTS public.fee_structures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id UUID NOT NULL REFERENCES public.academic_years(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    fee_category_id UUID NOT NULL REFERENCES public.fee_categories(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    term TEXT -- 'Term 1', 'Term 2', 'Annual'
);

CREATE TABLE IF NOT EXISTS public.student_fees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    fee_structure_id UUID NOT NULL REFERENCES public.fee_structures(id) ON DELETE CASCADE,
    status public.fee_status DEFAULT 'pending',
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(student_id, fee_structure_id)
);

CREATE TABLE IF NOT EXISTS public.fee_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_fee_id UUID NOT NULL REFERENCES public.student_fees(id) ON DELETE RESTRICT,
    amount_paid NUMERIC NOT NULL CHECK (amount_paid > 0),
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    payment_method TEXT, -- 'Online', 'Cash'
    transaction_ref TEXT UNIQUE
);

-- 9. COMMUNICATION
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.circulars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT,
    attachment_url TEXT,
    published_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    audience public.app_role[] -- specifies who can see it. If null, everyone.
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, -- if null, broadcast
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    type TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 10. SCHOOL SERVICES (Calendar & Leave)
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL, -- 'holiday', 'exam', 'meeting'
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.leave_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL,
    attachment_url TEXT,
    status public.leave_status DEFAULT 'pending',
    reviewed_by UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    teacher_remark TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 11. TRANSPORT & LIBRARY
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.transport_routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bus_number TEXT NOT NULL,
    driver_name TEXT,
    driver_phone TEXT,
    route_description TEXT
);

CREATE TABLE IF NOT EXISTS public.student_transport (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    route_id UUID NOT NULL REFERENCES public.transport_routes(id) ON DELETE CASCADE,
    pickup_point TEXT,
    UNIQUE(student_id)
);

CREATE TABLE IF NOT EXISTS public.library_books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    author TEXT,
    isbn TEXT,
    total_copies INTEGER DEFAULT 1,
    available_copies INTEGER DEFAULT 1
);

-- 12. INDEXES
-- --------------------------------------------------
-- Essential indexes for common query patterns (foreign keys and temporal searches)
CREATE INDEX IF NOT EXISTS idx_students_section ON public.students(section_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_date ON public.attendance(student_id, date);
CREATE INDEX IF NOT EXISTS idx_homework_section ON public.homework(section_id);
CREATE INDEX IF NOT EXISTS idx_homework_submissions_student ON public.homework_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_student ON public.exam_results(student_id);
CREATE INDEX IF NOT EXISTS idx_student_fees_student ON public.student_fees(student_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON public.notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_dates ON public.calendar_events(start_time, end_time);

-- 13. RLS ENABLEMENT
-- --------------------------------------------------
ALTER TABLE public.academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circulars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_transport ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_books ENABLE ROW LEVEL SECURITY;

-- 14. RLS POLICIES
-- --------------------------------------------------

-- 14a. Global Read-Only for Public Academic Meta (Classes, Subjects, etc.)
CREATE POLICY "Authenticated users can read academic meta" ON public.academic_years FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read classes" ON public.classes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read sections" ON public.sections FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read subjects" ON public.subjects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read class subjects" ON public.class_subjects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read fee categories" ON public.fee_categories FOR SELECT TO authenticated USING (true);

-- 14b. Students & Teachers Info
CREATE POLICY "Authenticated users can read student profiles" ON public.students FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read teacher profiles" ON public.teachers FOR SELECT TO authenticated USING (true);

-- 14c. Attendance
CREATE POLICY "Students read own attendance" ON public.attendance FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Teachers can read all attendance" ON public.attendance FOR SELECT USING (public.get_auth_role() = 'teacher');
CREATE POLICY "Teachers can insert attendance" ON public.attendance FOR INSERT WITH CHECK (public.get_auth_role() = 'teacher');
CREATE POLICY "Teachers can update attendance" ON public.attendance FOR UPDATE USING (public.get_auth_role() = 'teacher');

-- 14d. Homework
-- Student reads homework for their section by finding their section in the students table
CREATE POLICY "Students read homework for their section" ON public.homework FOR SELECT USING (
    section_id IN (SELECT section_id FROM public.students WHERE id = auth.uid())
);
CREATE POLICY "Teachers can read all homework" ON public.homework FOR SELECT USING (public.get_auth_role() = 'teacher');
CREATE POLICY "Teachers can insert homework" ON public.homework FOR INSERT WITH CHECK (public.get_auth_role() = 'teacher');

-- 14e. Homework Submissions
CREATE POLICY "Students can CRUD own submissions" ON public.homework_submissions FOR ALL USING (student_id = auth.uid());
CREATE POLICY "Teachers can read all submissions" ON public.homework_submissions FOR SELECT USING (public.get_auth_role() = 'teacher');
CREATE POLICY "Teachers can grade submissions" ON public.homework_submissions FOR UPDATE USING (public.get_auth_role() = 'teacher');

-- 14f. Study Materials
CREATE POLICY "Students read materials for their section" ON public.study_materials FOR SELECT USING (
    section_id IN (SELECT section_id FROM public.students WHERE id = auth.uid())
);
CREATE POLICY "Teachers can manage study materials" ON public.study_materials FOR ALL USING (public.get_auth_role() = 'teacher');

-- 14g. Exams & Results
CREATE POLICY "Authenticated users can read exams" ON public.exams FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read exam_subjects" ON public.exam_subjects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Students read own results" ON public.exam_results FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Teachers can manage results" ON public.exam_results FOR ALL USING (public.get_auth_role() = 'teacher');

-- 14h. Fees
CREATE POLICY "Authenticated users read fee structures" ON public.fee_structures FOR SELECT TO authenticated USING (true);
CREATE POLICY "Students read own fees" ON public.student_fees FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Students read own payments" ON public.fee_payments FOR SELECT USING (
    student_fee_id IN (SELECT id FROM public.student_fees WHERE student_id = auth.uid())
);

-- 14i. Communications
CREATE POLICY "Users can read circulars" ON public.circulars FOR SELECT USING (
    audience IS NULL OR public.get_auth_role() = ANY(audience)
);
CREATE POLICY "Users can read own messages" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users read own notifications" ON public.notifications FOR SELECT USING (recipient_id IS NULL OR recipient_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (recipient_id = auth.uid());

-- 14j. Calendar, Leave, Transport, Library
CREATE POLICY "Authenticated users read calendar" ON public.calendar_events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Students manage own leave" ON public.leave_applications FOR ALL USING (student_id = auth.uid());
CREATE POLICY "Teachers read/update leave" ON public.leave_applications FOR SELECT USING (public.get_auth_role() = 'teacher');
CREATE POLICY "Teachers approve leave" ON public.leave_applications FOR UPDATE USING (public.get_auth_role() = 'teacher');
CREATE POLICY "Authenticated users read transport routes" ON public.transport_routes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Students read own transport" ON public.student_transport FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Authenticated users read library books" ON public.library_books FOR SELECT TO authenticated USING (true);

-- 14k. Admin Fallback (Admins can do everything)
-- To prevent listing this on every table, we could use SUPERUSER privileges, but for RLS explicit bypass:
-- NOTE: In a real environment, admins might bypass RLS via service role, or we explicitly grant ALL on every table.
-- For safety, the above policies cover the vast majority of operations, and Edge Functions (service_role) will handle administrative tasks securely.
