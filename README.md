# Bethel Mission School App 🎓

A modern mobile application for **Bethel Mission School, Anuppur**, designed to bring students, teachers, and school administration together in one simple and convenient platform.

The application provides separate dashboards and workflows based on the user's role while keeping the overall experience clean, minimal, and easy to use.

---

## ✨ Features

### 👨‍🎓 Student Dashboard

Students can access:

- 👤 My Profile
- 📅 Daily Attendance
- 📝 Homework
- 📢 Circulars & Notices
- 🗓️ Academic Calendar
- 💳 Fee Details
- 💰 Online Fee Payment
- 📚 Library
- 📊 Results & Marks
- 🏖️ Apply for Leave
- 📖 Study Materials & PDFs
- 🚌 Bus & Transport Information

Parents can log in using the student's account to access the same student information and monitor academic activities.

---

### 👨‍🏫 Teacher Dashboard

Teachers can:

- ✅ Mark daily attendance
- ✏️ Edit attendance records
- 📝 Upload homework
- 📚 Upload study materials
- 📊 Enter examination marks
- 💬 Add student remarks
- 📩 Send messages to parents
- 📢 Create announcements
- 🏖️ Approve or reject leave applications

---

### 👨‍💼 Administration

The school administration can manage important school operations including:

- Student management
- Teacher management
- Classes and sections
- Attendance
- Homework
- Study materials
- Examination results
- Fees
- Announcements
- Leave applications
- Transport information

---

## 🎯 Project Goals

The application aims to:

- Simplify communication between school, teachers, students, and parents
- Reduce dependence on paper-based processes
- Provide students with easy access to academic information
- Make attendance and homework management easier for teachers
- Centralize important school information
- Provide a clean and modern mobile experience

---

## 🛠️ Tech Stack

- **React Native**
- **Expo**
- **TypeScript**
- **Expo Router**
- **Supabase**
- **JavaScript / TypeScript**

---

## 📱 Application Structure

The application uses role-based dashboards so that users only see the features relevant to them.

```text
                    Bethel Mission School App
                              │
                ┌─────────────┴─────────────┐
                │                           │
           Student / Parent             Teacher
                │                           │
        ┌───────┼────────┐          ┌───────┼────────┐
        │       │        │          │       │        │
    Profile  Academic   Fees     Attendance Homework Results
                │                           │
        ┌───────┼────────┐          ┌───────┼────────┐
        │       │        │          │       │        │
    Homework Results  Materials   Remarks Messages Notices
