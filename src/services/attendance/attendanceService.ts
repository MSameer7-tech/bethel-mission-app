import { supabase } from '../../lib/supabase/client';
import { AttendanceRecord, AttendanceSummary } from '../../types/attendance';

export const attendanceService = {
  /**
   * Retrieves all attendance records for the authenticated student.
   * RLS automatically filters this to `student_id = auth.uid()`.
   */
  async getMyAttendance(): Promise<AttendanceRecord[]> {
    const { data, error } = await supabase
      .from('attendance')
      .select('id, date, status')
      .order('date', { ascending: false });

    if (error) {
      console.error('getMyAttendance error:', error);
      throw new Error('Unable to load attendance records.');
    }

    return (data || []) as AttendanceRecord[];
  },

  /**
   * Calculates the attendance summary from an array of records.
   * Formula explicitly chosen:
   * 
   * A school typically considers 'Late' as present for basic attendance, 
   * and 'Excused' (leave) as not penalizing the student's percentage.
   * 
   * Valid Total = Present + Absent + Late (Excused days are excluded from the denominator)
   * Attended = Present + Late
   * Percentage = (Attended / Valid Total) * 100
   * 
   * If Valid Total is 0, percentage is 0.
   */
  calculateSummary(records: AttendanceRecord[]): AttendanceSummary {
    let present = 0;
    let absent = 0;
    let excused = 0;
    let late = 0;

    for (const record of records) {
      if (record.status === 'present') present++;
      if (record.status === 'absent') absent++;
      if (record.status === 'excused') excused++;
      if (record.status === 'late') late++;
    }

    const validTotal = present + absent + late;
    const attended = present + late;
    const total = records.length;

    let percentage = 0;
    if (validTotal > 0) {
      percentage = Math.round((attended / validTotal) * 100);
    }

    return {
      percentage,
      present,
      absent,
      excused,
      late,
      total
    };
  }
};
