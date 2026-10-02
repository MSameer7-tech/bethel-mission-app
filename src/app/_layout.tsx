import { Stack } from 'expo-router';
import { ThemeProvider, DefaultTheme } from 'expo-router';
import { View, StyleSheet } from 'react-native';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0B3B60', // Deep school blue
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#1E293B',
    border: '#E2E8F0',
    notification: '#E11D48',
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={customTheme}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F8FAFC' } }}>
        <Stack.Screen name="index" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(student)" options={{ headerShown: false }} />
        <Stack.Screen name="(teacher-tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(teacher)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
