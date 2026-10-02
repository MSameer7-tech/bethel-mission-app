import React from 'react';
import { Stack } from 'expo-router';

export default function TeacherLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#0B3B60' },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: { fontWeight: 'bold' as const },
    }}>
      <Stack.Screen name="class-details" options={{ title: 'Class Details' }} />
      <Stack.Screen name="mark-attendance" options={{ title: 'Mark Attendance' }} />
      <Stack.Screen name="homework" options={{ title: 'Homework' }} />
      <Stack.Screen name="create-homework" options={{ title: 'Create Homework' }} />
      <Stack.Screen name="examinations" options={{ title: 'Examinations' }} />
      <Stack.Screen name="enter-marks" options={{ title: 'Enter Marks' }} />
      <Stack.Screen name="leave-requests" options={{ title: 'Leave Requests' }} />
    </Stack>
  );
}
