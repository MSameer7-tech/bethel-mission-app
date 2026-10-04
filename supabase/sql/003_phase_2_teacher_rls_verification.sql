-- ==================================================
-- PHASE 2: TEACHER RLS VERIFICATION SCRIPT
-- ==================================================
-- Run this in the Supabase SQL Editor.
-- This script validates that the structural functions exist and that the new RLS policies
-- contain the strict 'is_teacher_of_student' and 'is_teacher_of_section' bindings.

-- 1. Check that the Helper Functions were created successfully
SELECT routine_name, data_type 
FROM information_schema.routines 
WHERE specific_schema = 'public' 
AND routine_name IN ('is_teacher_of_section', 'is_teacher_of_student');

-- 2. Verify that the broad teacher policies were DROPPED and replaced with granular ones
-- Look specifically at Attendance, Homework, and Leave Applications
SELECT tablename, policyname, permissive, cmd, qual, with_check 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('attendance', 'homework', 'exam_results')
AND (
    policyname ILIKE '%Teacher%' OR policyname ILIKE '%assigned%'
)
ORDER BY tablename, policyname;

-- 3. Explain how Postgres enforces this:
-- When a user with the Teacher role queries `attendance`, Postgres automatically applies:
-- USING (public.is_teacher_of_student(student_id))
-- Which evaluates to:
-- SELECT EXISTS (
--   SELECT 1 FROM students s
--   JOIN class_subjects cs ON s.section_id = cs.section_id
--   JOIN teacher_subjects ts ON cs.id = ts.class_subject_id
--   WHERE s.id = attendance.student_id AND ts.teacher_id = auth.uid()
-- );
--
-- This strictly guarantees that even if a frontend or service-layer authorization check fails,
-- a Teacher CANNOT fetch or modify records for a student/section they are not explicitly assigned to
-- inside the database `teacher_subjects` mapping.
