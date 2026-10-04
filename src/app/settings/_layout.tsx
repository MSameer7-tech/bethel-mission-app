import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '../../theme/ThemeContext';

export default function SettingsLayout() {
  const { theme } = useTheme();
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: theme.colors.textPrimary,
      headerTitleStyle: { ...theme.typography.styles.cardTitle },
      headerShadowVisible: false,
      contentStyle: { backgroundColor: theme.colors.background },
    }}>
      <Stack.Screen name="index" options={{ title: 'Settings' }} />
      <Stack.Screen name="appearance" options={{ title: 'Appearance' }} />
    </Stack>
  );
}
