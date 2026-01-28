import {
	View,
	Text,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { ScheduleModalData } from '@/types/schedule';
import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';

type Props = {
	visible: boolean;
	data: ScheduleModalData;
	onClose: () => void;
	onSetPeriod: (period: string) => void;
};

export default function ScheduleModal({ visible, data, onClose, onSetPeriod }: Props) {
	const { theme } = useTheme();
	const colors = Colors[theme].schedule;

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
				<View className='bg-[color:var(--color-bg)] w-[80%] h-[70%] rounded-2xl'>
					<Text className='text-[color:var(--text-modal-focus)] text-xl font-medium p-[20px]'>
						Seleccionar período
					</Text>

					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							flexGrow: 1,
						}}
					>
						{Object.keys(data.calendars).map(period => (
							<Pressable
								key={period}
								className='active:bg-[#8885] px-[20px]'
								onPress={() => {
									onSetPeriod(period);
									onClose();
								}}
							>
								<View className='flex-row w-full items-center gap-[10px]'>
									{
										period === data.currentPeriod ? (
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
										className='flex-1 text-[color:var(--text-modal-focus)] text-xl font-normal border-[#8885] py-[15px]'
										style={{
											borderBottomWidth: StyleSheet.hairlineWidth,
										}}
									>
										{data.calendars[period].name}
									</Text>
								</View>
							</Pressable>
						))}
					</ScrollView>

					<Pressable
						className='w-full items-center'
						onPress={onClose}
					>
						<Text className='text-[color:var(--text-modal-focus)] text-xl font-medium p-[15px]'>
							Cancelar
						</Text>
					</Pressable>
				</View>
			</Pressable>
		</Modal>
	);
}