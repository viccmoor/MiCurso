import {
	Modal,
	View,
	Pressable,
	Text,
	ScrollView,
	StyleSheet,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { OptionSelectorData } from '@/types/schedule';
import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';

type Props = {
	visible: boolean;
	data: OptionSelectorData;
	onClose: () => void;
	onSelectOption: (field: string, value: string) => void;
};

export default function OptionSelectorModal({ visible, data, onClose, onSelectOption }: Props) {
	const { theme } = useTheme();
	const colors = Colors[theme].optionSelectorModal;

  return (
		<Modal
			visible={visible}
			animationType='fade'
			transparent
		>
			<Pressable
				className='flex-1 bg-black/50 justify-center items-center'
				onPress={onClose}
			>
				<View className='w-[95%] h-[90%] bg-[color:var(--color-bg)] rounded-3xl'>
					<Text className='text-[color:var(--text-modal-focus)] text-2xl font-medium p-[20px]'>
						Seleccionar {data.name}
					</Text>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							flexGrow: 1,
						}}
					>
						{data.options.map(option => (
							<Pressable
								key={option.value}
								className='active:bg-[#8885] px-[20px]'
								onPress={() => {
									onSelectOption(data.field, option.value);
									onClose();
								}}
							>
								<View className='flex-row w-full items-center gap-[10px]'>
									{
										option.value === data.selectedValue ? (
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

									<Text
										className='w-5/6 text-[color:var(--text-modal-focus)] text-xl font-normal border-[#8885] py-[15px]'
										style={{
											borderBottomWidth: StyleSheet.hairlineWidth,
										}}
									>
										{option.label}
									</Text>
								</View>
							</Pressable>
						))}
					</ScrollView>

					<Pressable
						className='w-full items-center'
						onPress={onClose}
					>
						<Text className='text-[color:var(--text-modal-focus)] text-xl font-medium p-[10px]'>
							Cancelar
						</Text>
					</Pressable>
				</View>
			</Pressable>
		</Modal>
	);
}