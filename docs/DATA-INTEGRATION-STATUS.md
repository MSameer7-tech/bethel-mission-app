# Data Integration Status

This document tracks which parts of the Bethel Mission School app are connected to the live Supabase PostgreSQL backend versus which parts are still relying on static mock data (`src/data/*`).

## REAL (Connected to Supabase)
*Completed in Phases 4 & 5*
- **Authentication**: Login, Logout, Role Detection, Session Persistence.
- **Identity**: Student First Name, Last Name, Avatar Initials.
- **Academic Placement**: Class Name, Section Name, Academic Year.
- **Identifiers**: Admission Number.
- **Attendance**: Fetching, Summarizing, Valid Percentage Calculation, Historical List.

## MOCK (Pending Integration)
*To be completed in future phases*
- **Phase 6+**: Homework (Upcoming tasks, submissions, lists).
- **Phase 6+**: Study Materials (Attachments, lists).
- **Phase X**: Fees (Amount due, structures, payment history).
- **Phase X**: Exams & Results (Upcoming exams, report cards).
- **Phase X**: Communications (Messages, notifications, circulars).
- **Phase X**: Services (Leave applications, transport info, library books).
- **Phase X**: Secondary Profile Data (House, Father/Mother names, Blood Group, Address, Phone, Email).
