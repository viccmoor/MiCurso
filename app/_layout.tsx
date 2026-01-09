import { Stack } from 'expo-router';
import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@/providers/ThemeProviders';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/icon-2.png')}
              style={{ width: 150, aspectRatio: 2500 / 600 }}
              resizeMode='contain'
            />
          ),
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name='(tabs)' />
      </Stack>
      <StatusBar style='dark' />
    </ThemeProvider>
  );
}
