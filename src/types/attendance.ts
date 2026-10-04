export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD format from Postgres
  status: AttendanceStatus;
}

export interface AttendanceSummary {
  percentage: number;
  present: number;
  absent: number;
  excused: number; // 'leave' in UI
  late: number;
  total: number;
}
