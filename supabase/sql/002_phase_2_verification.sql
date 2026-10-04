-- ==================================================
-- PHASE 2: SCHEMA VERIFICATION SCRIPT
-- ==================================================
-- Run this in the Supabase SQL Editor to verify that the schema was created successfully.
-- This does NOT alter any data.

-- 1. Check ENUM types exist
SELECT typname, enumlabel 
FROM pg_enum e 
JOIN pg_type t ON e.enumtypid = t.oid 
WHERE typname IN ('app_role', 'attendance_status', 'fee_status', 'leave_status', 'homework_status')
ORDER BY typname, enumsortorder;

-- 2. Check that the core tables exist
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'profiles', 'students', 'teachers', 'classes', 'sections', 'subjects', 'class_subjects',
    'attendance', 'homework', 'homework_submissions', 'study_materials', 
    'exams', 'exam_subjects', 'exam_results', 
    'fee_categories', 'fee_structures', 'student_fees', 'fee_payments',
    'circulars', 'messages', 'notifications', 
    'calendar_events', 'leave_applications', 
    'transport_routes', 'student_transport', 'library_books'
)
ORDER BY tablename;

-- 3. Check RLS is enabled on all tables
SELECT relname AS table_name, relrowsecurity AS rls_enabled
FROM pg_class
WHERE relnamespace = 'public'::regnamespace 
AND relkind = 'r'
ORDER BY table_name;

-- 4. Check Helper Function exists
SELECT routine_name, data_type 
FROM information_schema.routines 
WHERE specific_schema = 'public' 
AND routine_name = 'get_auth_role';

-- 5. List all created RLS policies
SELECT tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;

