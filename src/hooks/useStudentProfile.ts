import { useState, useEffect, useCallback } from 'react';
import { studentService } from '../services/student/studentService';
import { StudentIdentity } from '../types/student';
import { useAuth } from '../contexts/AuthContext';

export function useStudentProfile() {
  const { session, user } = useAuth();
  const [data, setData] = useState<StudentIdentity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const profile = await studentService.getCurrentStudentProfile(user.id);
      setData(profile);
    } catch (err: any) {
      setError(err.message || 'Unable to load profile.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { data, loading, error, refetch: fetchProfile };
}
