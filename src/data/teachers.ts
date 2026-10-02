export const teacherProfile = {
  id: "EMP-1042",
  name: "Pushpendra Singh",
  department: "Mathematics",
  classTeacherOf: "VII-C",
  phone: "+91 98765 12345",
  email: "pushpendra.singh@bms.edu.in",
  joiningDate: "15 Jun 2018",
};

export const teacherClasses = [
  { id: 'VII-C', name: 'Class VII-C', subject: 'Mathematics (Class Teacher)', studentCount: 42, nextClass: '10:00 AM' },
  { id: 'VIII-A', name: 'Class VIII-A', subject: 'Mathematics', studentCount: 38, nextClass: '11:30 AM' },
  { id: 'IX-B', name: 'Class IX-B', subject: 'Mathematics', studentCount: 45, nextClass: '01:00 PM' },
];

export const classStudents = [
  { id: "STU-001", name: "Jitendra Kumar Sahu", roll: "24", status: 'present' },
  { id: "STU-002", name: "Aarav Sharma", roll: "01", status: 'present' },
  { id: "STU-003", name: "Aditi Verma", roll: "02", status: 'absent' },
  { id: "STU-004", name: "Dhruv Patel", roll: "15", status: 'leave' },
  { id: "STU-005", name: "Kavya Singh", roll: "28", status: 'present' },
];

export const teacherLeaveRequests = [
  { id: 1, studentName: 'Aditi Verma', class: 'VII-C', roll: '02', date: '03 Oct 2026', reason: 'Fever', status: 'pending' },
  { id: 2, studentName: 'Dhruv Patel', class: 'VII-C', roll: '15', date: '01 Oct - 02 Oct 2026', reason: 'Family Function', status: 'approved' },
];
