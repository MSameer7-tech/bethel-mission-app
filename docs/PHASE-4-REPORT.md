# Phase 4: Real Student Profile + Home Data Integration

## 1. Objective
Begin the incremental replacement of static UI mock data with live database records, specifically targeting the authenticated Student's core identity (Name, Class, Section, Admission Number, Academic Year).

## 2. Existing Architecture Evaluated
- The app operates via `_layout.tsx` -> `(tabs)` -> `index.tsx` & `profile.tsx`.
- The Supabase client and `AuthContext` from Phase 3 successfully manage active sessions.
- Data like Attendance, Fees, and Exams are still visually represented using static values from `src/data/students.ts`.

## 3. Data Integration Strategy
- **Service Layer**: Created `src/services/student/studentService.ts`. This encapsulates all direct Supabase queries.
- **Hook Layer**: Created `src/hooks/useStudentProfile.ts`. This manages `loading`, `error`, and `data` states, reacting to changes in `AuthContext`.
- **UI Layer**: React components call `useStudentProfile()` and render data directly without worrying about `auth.uid()` or PostgreSQL joins.
- **Mock Mixin**: Intentional architectural decision to *merge* real identity data (e.g., Name, Class) with remaining mock data (e.g., Attendance, Fees) until those specific features receive their dedicated backend phases.

## 4. Supabase Queries & RLS Dependency
The primary query intentionally avoids `SELECT *` and navigates the Phase 2 schema using `!inner` joins to extract precisely what the student needs:
```typescript
const { data, error } = await supabase
  .from('students')
  .select(`
    id, admission_number, dob,
    profiles!inner (first_name, last_name, avatar_url),
    sections!inner (name, classes!inner (name))
  `)
  .eq('id', userId)
  .single();
```
**RLS Verification**: This query inherently relies on the `auth.uid()` passed from the secure token context. A student *cannot* pass another student's ID into this service and retrieve their data, as the RLS policies in Postgres will reject it.

## 5. UI Updates & States
- **Home Header (`index.tsx`)**: Replaced the hardcoded "Jitendra Kumar Sahu" greeting with the live authenticated user's first and last name, alongside their assigned section and class. 
- **Profile Screen (`profile.tsx`)**: Replaced the hero section with real data.
- **Loading State**: Built skeleton loaders (`View` components matching the theme colors) that display smoothly before the query resolves.
- **Error State**: Displays a red text prompt if the query fails, preventing a white-screen crash.

## 6. Real Data vs. Mock Data
**REAL DATA CONNECTED:**
- Student First Name & Last Name
- Student Initial/Avatar
- Admission Number
- Class Name
- Section Name
- Current Academic Year

**INTENTIONALLY MOCK DATA (Phase 5+):**
- Attendance % and history
- Upcoming exams and results
- Fee dues and payment UI
- Homework / Study Materials
- Recent Activity Feed
- Minor Profile details (Blood Group, Father Name, House)

## 7. Verification Results
- **TypeScript**: `npx tsc --noEmit` completes with 0 errors.
- **Data Flow**: The hook safely retrieves data on mount. Skeleton loading appears gracefully.
- **Data Safety**: No raw fake data was injected directly into Supabase production tables during this process.

## 8. Phase 5 Prerequisites
Phase 4 is complete. The application now features a hybrid architecture: real authentication and identity fused with mock operational data. Phase 5 will focus entirely on **Attendance Integration**, requiring `attendance` tables to be populated and the summary cards on the Home screen to execute live counts.
