import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Colors } from '@/utils/native-theme';
import { useTheme } from '@/providers/ThemeProviders';
import ThemeSelectorModal from '@/components/settings/ThemeSelectorModal';

export default function Settings() {
	const { theme, themeMode } = useTheme();
	const colors = Colors[theme].settings;

	const [visible, setVisible] = useState(false);

  return (
		<View className='flex-1 bg-[color:var(--color-bg)]'>
			<ThemeSelectorModal
				visible={visible}
				onClose={() => setVisible(false)}
			/>
			
			<View className='flex-1'>
				<Text className='text-sm text-[color:var(--text-calendar)] font-medium opacity-70 mb-2 px-[20px] mt-[10px]'>
					Pantalla
				</Text>

				<Pressable
					className='flex-row w-full items-center active:bg-[#8885] gap-[15px] px-[20px] py-[10px]'
					onPress={() => setVisible(true)}
				>
					<MaterialCommunityIcons
						name='theme-light-dark'
						size={24}
						color={colors.themeIcon}
					/>

					<View className='gap'>
						<Text className='text-base text-[color:var(--text-calendar)]'>
							Tema
						</Text>

						<Text className='text-sm text-[color:var(--text-calendar)] opacity-70'>
							{{
								auto: 'Predeterminado del sistema',
								light: 'Claro',
								dark: 'Oscuro',
							}[themeMode]}
						</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
}