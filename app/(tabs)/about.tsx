import '@/global.css';
import {
  View,
  Text,
  Image,
  Linking,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Entypo from '@expo/vector-icons/Entypo';

import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';

export default function About() {
  const { theme } = useTheme();
  const colors = Colors[theme].info;
  const navigation = useNavigation();

  return (
    <SafeAreaView className='flex-1 bg-[color:var(--color-bg)] justify-start items-start'>
      <View className='w-full flex-row items-center justify-start p-[15px]'>
        <Pressable
          className='w-[48px] h-[48px] justify-center items-center'
          onPress={() => navigation.goBack()}
        >
          <Entypo 
            name='chevron-thin-left' 
            size={28}
            color={colors.backIcon}
          />
        </Pressable>
      </View>

      <View className='flex-1 w-full h-full items-center justify-start mt-[80px] gap-[15px]'>
        <View className='items-center justify-center'>
          <Image
            source={
              theme === 'light'
                ? require('../../assets/images/head-icon-light.png')
                : require('../../assets/images/head-icon-dark.png')
            }
            style={{
              width: 200,
              height: 50,
            }}
            resizeMode="contain"
          />
          <Text className='text-[#888C]'>
            © 2026 viccmoor
          </Text>
        </View>

        <View className='w-full px-[50px] gap-[15px]'>
          <Text className='text-lg text-[color:var(--text-about)] text-justify'>
            MiCurso es un proyecto de código abierto creado por{' '}
            <Text
              className="font-bold underline"
              onPress={() => Linking.openURL('https://github.com/viccmoor')}
            >
              viccmoor
            </Text>{' '}
            con el propósito de visualizar los horarios académicos fácilmente desde cualquier dispositivo movil.

            Tú también puedes contribuir a este proyecto. Puedes contribuir ya sea reportando errores, sugiriendo mejoras o colaborando directamente con el desarrollo del código. Si estás interesado en ayudar, revisa el{' '}
            <Text
              className="font-bold underline"
              onPress={() => Linking.openURL('https://github.com/viccmoor/MiCurso')}
            >
              repositorio de GitHub
            </Text>.
          </Text>

          <Pressable
            className='bg-[color:var(--color-secondary)] w-full h-[40px] items-center justify-center rounded-full'
            onPress={() => Linking.openURL('https://github.com/viccmoor/MiCurso/blob/main/LICENSE')}
          >
            <Text className='text-[color:var(--text-license-button)] font-medium'>
              Licencia
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
