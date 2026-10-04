-- ==================================================
-- PHASE 5.1: PROVISIONING FOUNDATION
-- ==================================================
-- This migration adds the missing architectural columns and relationships
-- required for the Admin/Teacher provisioning workflows.

-- 1. ACCOUNT STATE & SECURITY
-- --------------------------------------------------
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS requires_password_change BOOLEAN DEFAULT true;

-- 2. SEQUENCES FOR AUTOMATED IDs
-- --------------------------------------------------
-- Safe, atomic ID generation without relying on client Math.random()
CREATE SEQUENCE IF NOT EXISTS public.teacher_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS public.student_id_seq START 1;

-- 3. STUDENT DEMOGRAPHICS & CONTACT
-- --------------------------------------------------
ALTER TABLE public.students
ADD COLUMN IF NOT EXISTS system_id TEXT UNIQUE DEFAULT 'STU' || LPAD(nextval('public.student_id_seq')::TEXT, 4, '0'),
ADD COLUMN IF NOT EXISTS middle_name TEXT,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS roll_number TEXT,
ADD COLUMN IF NOT EXISTS admission_date DATE DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS mother_name TEXT,
ADD COLUMN IF NOT EXISTS guardian_name TEXT,
ADD COLUMN IF NOT EXISTS parent_email TEXT,
ADD COLUMN IF NOT EXISTS student_phone TEXT,
ADD COLUMN IF NOT EXISTS student_email TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS pin_code TEXT;

-- Update teachers to use the sequence for employee_id dynamically if missing
-- Assuming new inserts will use it via Edge Function, but we can set a default
ALTER TABLE public.teachers
ALTER COLUMN employee_id SET DEFAULT 'TCH' || LPAD(nextval('public.teacher_id_seq')::TEXT, 3, '0');

-- 4. ACADEMIC YEAR HISTORICAL MAPPING
-- --------------------------------------------------
-- To preserve historical records, a section must belong to a specific academic year.
-- This prevents "Class 8A" from losing its past students when the year rolls over.
ALTER TABLE public.sections
ADD COLUMN IF NOT EXISTS academic_year_id UUID REFERENCES public.academic_years(id) ON DELETE CASCADE;

-- Ensure all existing sections fallback to the active academic year (migration safety)
DO $$
DECLARE
    active_year_id UUID;
BEGIN
    SELECT id INTO active_year_id FROM public.academic_years WHERE is_active = true LIMIT 1;
    IF active_year_id IS NOT NULL THEN
        UPDATE public.sections SET academic_year_id = active_year_id WHERE academic_year_id IS NULL;
    END IF;
END $$;

-- Enforce NOT NULL now that existing rows are handled
ALTER TABLE public.sections ALTER COLUMN academic_year_id SET NOT NULL;

-- Make section names unique PER academic year, rather than globally
ALTER TABLE public.sections DROP CONSTRAINT IF EXISTS sections_class_id_name_key;
ALTER TABLE public.sections ADD CONSTRAINT sections_class_id_name_year_key UNIQUE (class_id, name, academic_year_id);
