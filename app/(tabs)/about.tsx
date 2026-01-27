import '@/global.css';
import {
  Linking,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';

export default function About() {
  const { theme } = useTheme();
  const colors = Colors[theme].info;

  return (
    <SafeAreaView className='flex-1 bg-[color:var(--color-bg)] justify-start items-start'>
      <View className='flex-row w-full items-center justify-center gap-[10px] p-[15px]'>
        <MaterialCommunityIcons
          name='github'
          size={128}
          color={colors.githubLogo}
        />

        <Text
          className='font-bold text-5xl text-[color:var(--text-about)]'
        >
          MiCurso
        </Text>
      </View>

      <View className='flex-1 w-full px-[20px] gap-[15px]'>
        <Text className='text-2xl text-[color:var(--text-about)] text-justify'>
          MiCurso es un proyecto de código abierto creado por{' '}
          <Text
            className="font-bold underline"
            onPress={() => Linking.openURL('https://github.com/viccmoor')}
          >
            viccmoor
          </Text>{' '}
          con el propósito de visualizar los horarios académicos fácilmente desde cualquier dispositivo movil.
        </Text>

        <Text className='text-4xl font-medium text-[color:var(--text-about)]'>
          Repositorio
        </Text>

        <Text className='text-2xl text-[color:var(--text-about)]'>
          Tú también puedes contribuir a este proyecto. Puedes contribuir ya sea reportando errores, sugiriendo mejoras o colaborando directamente con el desarrollo del código. Si estás interesado en ayudar, revisa el{' '}
          <Text
            className="font-bold underline"
            onPress={() => Linking.openURL('https://github.com/viccmoor/MiCurso')}
          >
            repositorio de GitHub
          </Text>
          .
        </Text>

        <Text className='text-4xl font-medium text-[color:var(--text-about)]'>
          Licencia
        </Text>

        <Text className='text-2xl text-[color:var(--text-about)]'>
          Este proyecto se encuentra bajo la licencia{' '}
          <Text className="font-bold">
            GNU AGPLv3
          </Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
}
