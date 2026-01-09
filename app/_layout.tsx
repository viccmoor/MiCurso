import { Stack } from 'expo-router';
import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider, useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}

function ThemedStack() {
  const { theme } = useTheme();
  const appColors = Colors[theme].app;

  return (
    <>
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: appColors.layout,
          },
          headerTitle: () => (
            <Image
              source={
                theme === 'light'
                  ? require('../assets/images/head-icon-light.png')
                  : require('../assets/images/head-icon-dark.png')
              }
              style={{
                width: 150,
                aspectRatio: 2500 / 600,
              }}
              resizeMode="contain"
            />
          ),
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style='auto' />
    </>
  );
}
