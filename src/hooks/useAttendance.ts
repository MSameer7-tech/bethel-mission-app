import { useState, useEffect, useCallback } from 'react';
import { attendanceService } from '../services/attendance/attendanceService';
import { AttendanceRecord, AttendanceSummary } from '../types/attendance';
import { useAuth } from '../contexts/AuthContext';

export function useAttendance() {
  const { session, user } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const fetchedRecords = await attendanceService.getMyAttendance();
      const calculatedSummary = attendanceService.calculateSummary(fetchedRecords);
      
      setRecords(fetchedRecords);
      setSummary(calculatedSummary);
    } catch (err: any) {
      setError(err.message || 'Unable to load attendance. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return { records, summary, loading, error, refetch: fetchAttendance };
}
