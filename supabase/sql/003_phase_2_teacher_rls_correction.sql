-- ==================================================
-- PHASE 2: TEACHER RLS SECURITY CORRECTION
-- ==================================================
-- This migration tightens Teacher RLS policies.
-- It explicitly denies blanket read/write access and forces PostgreSQL
-- to verify that a teacher is assigned to the specific section, subject, or student.

-- 1. Create Helper Functions for Teacher Authorization
-- --------------------------------------------------
-- Check if the current teacher is assigned to a specific section via teacher_subjects
CREATE OR REPLACE FUNCTION public.is_teacher_of_section(p_section_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM teacher_subjects ts
    JOIN class_subjects cs ON ts.class_subject_id = cs.id
    WHERE ts.teacher_id = auth.uid()
    AND cs.section_id = p_section_id
  );
$$;

-- Check if the current teacher is assigned to a specific student (via the student's section)
CREATE OR REPLACE FUNCTION public.is_teacher_of_student(p_student_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM students s
    JOIN class_subjects cs ON s.section_id = cs.section_id
    JOIN teacher_subjects ts ON cs.id = ts.class_subject_id
    WHERE s.id = p_student_id
    AND ts.teacher_id = auth.uid()
  );
$$;


-- 2. Drop the overly broad Phase 2 policies
-- --------------------------------------------------
-- Attendance
DROP POLICY IF EXISTS "Teachers can read all attendance" ON public.attendance;
DROP POLICY IF EXISTS "Teachers can insert attendance" ON public.attendance;
DROP POLICY IF EXISTS "Teachers can update attendance" ON public.attendance;

-- Homework
DROP POLICY IF EXISTS "Teachers can read all homework" ON public.homework;
DROP POLICY IF EXISTS "Teachers can insert homework" ON public.homework;

-- Homework Submissions
DROP POLICY IF EXISTS "Teachers can read all submissions" ON public.homework_submissions;
DROP POLICY IF EXISTS "Teachers can grade submissions" ON public.homework_submissions;

-- Study Materials
DROP POLICY IF EXISTS "Teachers can manage study materials" ON public.study_materials;

-- Exam Results
DROP POLICY IF EXISTS "Teachers can manage results" ON public.exam_results;

-- Leave Applications
DROP POLICY IF EXISTS "Teachers read/update leave" ON public.leave_applications;
DROP POLICY IF EXISTS "Teachers approve leave" ON public.leave_applications;


-- 3. Create Strict Granular Policies
-- --------------------------------------------------

-- Attendance: Only for students the teacher actively teaches
CREATE POLICY "Teachers read attendance for assigned students" ON public.attendance 
FOR SELECT USING (public.is_teacher_of_student(student_id));

CREATE POLICY "Teachers insert attendance for assigned students" ON public.attendance 
FOR INSERT WITH CHECK (public.is_teacher_of_student(student_id));

CREATE POLICY "Teachers update attendance for assigned students" ON public.attendance 
FOR UPDATE USING (public.is_teacher_of_student(student_id));


-- Homework: Only for sections the teacher actively teaches
CREATE POLICY "Teachers read assigned section homework" ON public.homework 
FOR SELECT USING (public.is_teacher_of_section(section_id));

CREATE POLICY "Teachers insert homework for their sections" ON public.homework 
FOR INSERT WITH CHECK (public.is_teacher_of_section(section_id) AND teacher_id = auth.uid());

CREATE POLICY "Teachers update own homework" ON public.homework 
FOR UPDATE USING (teacher_id = auth.uid());


-- Homework Submissions: Only for homework assigned by this specific teacher
CREATE POLICY "Teachers read submissions for their homework" ON public.homework_submissions 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.homework h WHERE h.id = homework_id AND h.teacher_id = auth.uid())
);

CREATE POLICY "Teachers grade submissions for their homework" ON public.homework_submissions 
FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.homework h WHERE h.id = homework_id AND h.teacher_id = auth.uid())
);


-- Study Materials: Only for sections the teacher actively teaches
CREATE POLICY "Teachers read study materials for assigned sections" ON public.study_materials 
FOR SELECT USING (public.is_teacher_of_section(section_id));

CREATE POLICY "Teachers insert study materials for their sections" ON public.study_materials 
FOR INSERT WITH CHECK (public.is_teacher_of_section(section_id) AND teacher_id = auth.uid());

CREATE POLICY "Teachers update own study materials" ON public.study_materials 
FOR UPDATE USING (teacher_id = auth.uid());


-- Exam Results: Only for students they actively teach
CREATE POLICY "Teachers read results for assigned students" ON public.exam_results 
FOR SELECT USING (public.is_teacher_of_student(student_id));

CREATE POLICY "Teachers insert results for assigned students" ON public.exam_results 
FOR INSERT WITH CHECK (public.is_teacher_of_student(student_id));

CREATE POLICY "Teachers update results for assigned students" ON public.exam_results 
FOR UPDATE USING (public.is_teacher_of_student(student_id));


-- Leave Applications: Only review leave for assigned students
CREATE POLICY "Teachers read leave for assigned students" ON public.leave_applications 
FOR SELECT USING (public.is_teacher_of_student(student_id));

CREATE POLICY "Teachers update leave for assigned students" ON public.leave_applications 
FOR UPDATE USING (public.is_teacher_of_student(student_id));
