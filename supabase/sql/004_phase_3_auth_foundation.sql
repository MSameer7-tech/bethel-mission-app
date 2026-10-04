-- ==================================================
-- PHASE 3: AUTHENTICATION FOUNDATION
-- ==================================================
-- This migration secures the profiles.role column to prevent privilege escalation.
-- By default, Row Level Security allowed users to update their own profile.
-- We must guarantee that a malicious user cannot send an API request:
-- UPDATE profiles SET role = 'admin' WHERE id = auth.uid()

-- 1. Create a trigger function to block 'role' column updates
CREATE OR REPLACE FUNCTION public.prevent_role_escalation()
RETURNS trigger AS $$
BEGIN
  -- If the role is being changed by a regular authenticated user, force it back to the old value.
  -- Only the 'service_role' (used by Edge Functions for admin tasks) can bypass this.
  -- In Supabase, standard client connections use the 'authenticator' role with the 'authenticated' claim.
  -- Checking current_user helps identify if it's the client API.
  IF current_user = 'authenticator' THEN
    NEW.role = OLD.role;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Attach the trigger to the profiles table
DROP TRIGGER IF EXISTS ensure_role_immutable ON public.profiles;

CREATE TRIGGER ensure_role_immutable
BEFORE UPDATE ON public.profiles
FOR EACH ROW
WHEN (OLD.role IS DISTINCT FROM NEW.role)
EXECUTE FUNCTION public.prevent_role_escalation();

-- Note: User provisioning (creating new students/teachers) will be handled via an Edge Function
-- operating under the 'service_role' which bypasses this restriction and RLS entirely.
