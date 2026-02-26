import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as Notifications from 'expo-notifications';

import { ThemeProvider, useTheme } from '@/providers/ThemeProviders';
import { ScheduleProvider } from '@/providers/ScheduleProvider';
import { LocationProvider } from '@/providers/LocationProvider';
import { Colors } from '@/utils/native-theme';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LocationProvider>
        <ScheduleProvider>
          <ThemeProvider>
            <ThemedStack />
          </ThemeProvider>
        </ScheduleProvider>
      </LocationProvider>
    </SafeAreaProvider>
  );
}

function ThemedStack() {
  const { theme } = useTheme();
  const appColors = Colors[theme].app;

  return (
    <>
      <Stack>
        <Stack.Screen
          name='(tabs)'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='settings'
          options={{
            title: 'Ajustes',
            headerStyle: {
              backgroundColor: appColors.layout,
            },
            headerTitleStyle: {
              color: appColors.text,
            },
            headerTintColor: appColors.text,
          }}
        />
      </Stack>
      <StatusBar style='auto' />
    </>
  );
}
