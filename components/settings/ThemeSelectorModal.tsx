import {
	Text,
	View,
	Modal,
	Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';

type ThemeSelectorProps = {
	visible: boolean;
	onClose: () => void;
};

export default function ThemeSelectorModal({ visible, onClose }: ThemeSelectorProps) {
	const { theme, themeMode, setThemeMode } = useTheme();
	const insets = useSafeAreaInsets();
	const colors = Colors[theme].settings;

  return (
		<Modal
			visible={visible}
			animationType='fade'
			transparent
		>
			<Pressable
				className='flex-1 bg-black/50 justify-center items-center'
				style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
				onPress={onClose}
			>
				<View className='bg-[color:var(--color-bg)] w-[80%] min-h-[210px] rounded-2xl'>
					<Text className='text-[color:var(--text-modal-focus)] text-xl font-medium p-[20px]'>
						Seleccionar tema
					</Text>

					<View className='flex-1 gap-[10px]'>
						<Pressable
							className='active:bg-[#8885] px-[20px]'
							onPress={() => {
								setThemeMode('auto');
								onClose();
							}}
						>
							<View className='flex-row w-full items-center gap-[10px]'>
								{
									themeMode === 'auto' ? (
										<MaterialIcons
											name='check-circle'
											size={24}
											color={colors.checkboxCircle}
										/>
									) : (
										<MaterialCommunityIcons
											name='checkbox-blank-circle-outline'
											size={24}
											color={colors.checkboxCircle}
										/>
									)
								}

								<Text className='flex-1 text-[color:var(--text-modal-focus)] text-base font-normal border-[#8885]'>
									Predeterminado del sistema
								</Text>
							</View>
						</Pressable>

						<Pressable
							className='active:bg-[#8885] px-[20px]'
							onPress={() => {
								setThemeMode('light');
								onClose();
							}}
						>
							<View className='flex-row w-full items-center gap-[10px]'>
								{
									themeMode === 'light' ? (
										<MaterialIcons
											name='check-circle'
											size={24}
											color={colors.checkboxCircle}
										/>
									) : (
										<MaterialCommunityIcons
											name='checkbox-blank-circle-outline'
											size={24}
											color={colors.checkboxCircle}
										/>
									)
								}

								<Text className='flex-1 text-[color:var(--text-modal-focus)] text-base font-normal border-[#8885]'>
									Claro
								</Text>
							</View>
						</Pressable>

						<Pressable
							className='active:bg-[#8885] px-[20px]'
							onPress={() => {
								setThemeMode('dark');
								onClose();
							}}
						>
							<View className='flex-row w-full items-center gap-[10px]'>
								{
									themeMode === 'dark' ? (
										<MaterialIcons
											name='check-circle'
											size={24}
											color={colors.checkboxCircle}
										/>
									) : (
										<MaterialCommunityIcons
											name='checkbox-blank-circle-outline'
											size={24}
											color={colors.checkboxCircle}
										/>
									)
								}

								<Text className='flex-1 text-[color:var(--text-modal-focus)] text-base font-normal border-[#8885]'>
									Oscuro
								</Text>
							</View>
						</Pressable>
					</View>

					<Pressable
						className='w-full items-center'
						onPress={onClose}
					>
						<Text className='text-[color:var(--text-modal-focus)] text-lg font-medium p-[15px]'>
							Cancelar
						</Text>
					</Pressable>
				</View>
			</Pressable>
		</Modal>
	);
}