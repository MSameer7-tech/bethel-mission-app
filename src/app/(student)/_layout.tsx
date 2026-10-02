import React from 'react';
import { Stack } from 'expo-router';

export default function StudentLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0B3B60' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' as const },
        animation: 'slide_from_right',
        animationDuration: 250,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="attendance" options={{ title: 'Attendance' }} />
      <Stack.Screen name="homework" options={{ title: 'Homework' }} />
      <Stack.Screen name="fees" options={{ title: 'Fees' }} />
      <Stack.Screen name="results" options={{ title: 'Results' }} />
      <Stack.Screen name="study-material" options={{ title: 'Study Material' }} />
      <Stack.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Stack.Screen name="library" options={{ title: 'Library' }} />
      <Stack.Screen name="transport" options={{ title: 'Transport' }} />
      <Stack.Screen name="apply-leave" options={{ title: 'Apply Leave' }} />
      <Stack.Screen name="circulars" options={{ title: 'Circulars' }} />
    </Stack>
  );
}
