import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Platform } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';

export default function StudentLayout() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: { fontWeight: '700' as const, fontSize: 17 },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
        animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 16 }}>
            <ArrowLeft color={theme.colors.textPrimary} size={24} />
          </TouchableOpacity>
        ),
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
