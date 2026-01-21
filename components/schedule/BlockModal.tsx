import {
	Text,
	View,
	Modal,
	ScrollView,
	Pressable
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { DayBlocks } from '@/types/schedule';
import { DAY_MAP, TYPE_COLORS } from '@/constants/schedule';

type Props = {
	visible: boolean;
	mod: { id: number, label: string, range: string } | null;
	dayBlocks: DayBlocks | null;
	dayIndex: number | null;
	onClose: () => void;
};

export default function BlockModal({ visible, mod, dayBlocks, dayIndex, onClose }: Props) {
	return (
		<Modal
			visible={visible}
			animationType='fade'
			onRequestClose={onClose}
			transparent
		>
			<Pressable
				className='flex-1 bg-black/50 justify-center items-center'
				onPress={onClose}
			>
				<View className='w-[70%] h-[50%] bg-[color:var(--color-bg)] rounded-3xl p-[10px]'>
					<View className='flex-row items-center p-[10px] gap-x-2'>
						<Text className='text-xl font-bold text-[color:var(--color-modules-text)]'>
							{mod?.label.toUpperCase()}
						</Text>

						<Text className='font-bold text-[color:var(--color-modules-text)]'>
							{DAY_MAP[dayIndex ?? 0].toLowerCase()}
						</Text>
					</View>
					<ScrollView
						className='bg-[color:var(--color-schedule-block)] rounded-3xl pt-[12px] px-[12px]'
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							gap: 10,
							flexGrow: 1,
						}}
					>
						{
							dayBlocks && dayBlocks.length > 0 ? dayBlocks?.map((block, blockIndex) => {
								const colors = TYPE_COLORS[block.type] || TYPE_COLORS.DEFAULT;

								return (
									<View
										key={blockIndex}
										className='flex-row w-full justify-center items-center gap-3'
									>
										<View
											className='w-[60px] border-r-[3px]'
											style={{
												borderRightColor: colors.bg,
											}}
										>
											<Text className='text-medium text-center font-bold text-[color:var(--color-modules-text)]'>
												{block.type}
											</Text>
										</View>
										<View
											className='flex-1 items-center py-[10px] px-[5px] rounded-xl'
											style={{
												backgroundColor: colors.bg,
											}}
										>
											<Text
												className='text-medium'
												numberOfLines={1}
											>
												{block.name}
											</Text>
											
											<Text
												className='text-sm'
												numberOfLines={1}
											>
												{block.sigle}-{block.section}
											</Text>
										</View>
									</View>
								);
							}) : (
								<View className='flex-1 justify-center items-center'>
									<MaterialIcons name='event-note' size={128} color='#8885' />
									<Text className='font-bold text-[#8885] text-center'>
										No hay clases programadas
									</Text>
								</View>
							)
						}
					</ScrollView>
				</View>
			</Pressable>
		</Modal>
	)
}