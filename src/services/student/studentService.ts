import { supabase } from '../../lib/supabase/client';
import { StudentIdentity } from '../../types/student';

export const studentService = {
  async getCurrentStudentProfile(userId: string): Promise<StudentIdentity> {
    // Base the query on 'profiles' since every auth user has one.
    // Use standard left joins for students, sections, and classes so the query succeeds 
    // even if the admin hasn't finished provisioning the student's academic placement.
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        first_name,
        last_name,
        avatar_url,
        students (
          admission_number,
          dob,
          sections (
            name,
            classes (
              name
            )
          )
        )
      `)
      .eq('id', userId)
      .single();

    if (error) {
      console.error('getCurrentStudentProfile error:', error);
      throw new Error('Unable to load student profile.');
    }

    // Also fetch the active academic year
    const { data: yearData, error: yearError } = await supabase
      .from('academic_years')
      .select('name')
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    if (yearError) {
      console.error('Academic year error:', yearError);
    }

    // Safely extract nested relation arrays/objects (Supabase JS might return arrays for 1:1 if not explicitly foreign-keyed strictly, but we take the first item or object)
    const studentData = Array.isArray(data.students) ? data.students[0] : data.students;
    const sectionData = studentData?.sections ? (Array.isArray(studentData.sections) ? studentData.sections[0] : studentData.sections) : null;
    const classData = sectionData?.classes ? (Array.isArray(sectionData.classes) ? sectionData.classes[0] : sectionData.classes) : null;

    return {
      id: data.id,
      firstName: data.first_name || '',
      lastName: data.last_name || '',
      avatarUrl: data.avatar_url || null,
      admissionNumber: studentData?.admission_number || 'Pending',
      dob: studentData?.dob || '',
      sectionName: sectionData?.name || 'Unassigned',
      className: classData?.name || 'Unassigned',
      academicYear: yearData?.name || 'Current Year'
    };
  }
};
