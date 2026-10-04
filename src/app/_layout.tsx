import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { ThemeProvider, useTheme } from '../theme/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { testSupabaseConnection } from '../lib/supabase/testConnection';

function AppNavigator() {
  const { theme, isDark } = useTheme();
  const { session, role, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // TypeScript strict checking bypass for dynamic segments array
    const currentSegments = segments as string[];
    const inAuthGroup = currentSegments[0] === '(auth)';
    const isIndex = currentSegments.length === 0;

    if (!session) {
      if (!inAuthGroup && !isIndex) {
        router.replace('/');
      }
    } else if (session) {
      if (role === 'student') {
        if (currentSegments[0] !== '(tabs)' && currentSegments[0] !== '(student)') {
          router.replace('/(tabs)');
        }
      } else if (role === 'teacher') {
        if (currentSegments[0] !== '(teacher-tabs)' && currentSegments[0] !== '(teacher)') {
          router.replace('/(teacher-tabs)');
        }
      } else if (role === 'admin') {
        // Fallback for admin if later implemented
      }
    }
  }, [session, role, isLoading, segments]);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
          animation: 'fade',
          animationDuration: 200,
        }}
      >
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="(auth)" options={{ animation: 'none' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
        <Stack.Screen name="(teacher-tabs)" options={{ animation: 'none' }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    testSupabaseConnection();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}
