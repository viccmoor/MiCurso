import { Stack } from 'expo-router';
import { Image, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style='dark' />
      <Stack
        screenOptions={{
          headerLeft: () => (
            <View className='flex-row gap-2'>
              <Image
                source={require('../assets/images/icon-2.png')}
                style={{ width: 160, aspectRatio: 2500 / 600 }}
                resizeMode='contain'
              />
            </View>
          ),
          headerTitle: '',
        }}
      >
        <Stack.Screen name='(tabs)' />
      </Stack>
    </>
  );
}
