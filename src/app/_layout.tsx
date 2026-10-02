import { Stack } from 'expo-router';
import { ThemeProvider, DefaultTheme } from 'expo-router';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0B3B60',
    background: '#F4F7FA',
    card: '#FFFFFF',
    text: '#1E293B',
    border: '#E2E8F0',
    notification: '#E11D48',
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={customTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F4F7FA' },
          animation: 'fade',
          animationDuration: 200,
        }}
      >
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
        <Stack.Screen name="(student)" />
        <Stack.Screen name="(teacher-tabs)" options={{ animation: 'none' }} />
        <Stack.Screen name="(teacher)" />
      </Stack>
    </ThemeProvider>
  );
}
