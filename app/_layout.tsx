import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from '@/providers/ThemeProviders';
import { ScheduleProvider } from '@/providers/ScheduleProvider';

export default function RootLayout() {
  return (
    <ScheduleProvider>
      <ThemeProvider>
        <ThemedStack />
      </ThemeProvider>
    </ScheduleProvider>
  );
}

function ThemedStack() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style='auto' />
    </>
  );
}
