import {
	Text,
	View,
	Modal,
	ScrollView
} from 'react-native';

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
			<View className='flex-1 bg-black/50 justify-center items-center'>
				<View className='w-[70%] h-[50%] bg-[color:var(--color-bg)] rounded-3xl p-[10px]'>
					<View className='flex-row items-center p-[10px] gap-x-2'>
						<Text className='text-xl font-bold text-[color:var(--color-modules-text)]'>
							{mod?.label.toUpperCase()}
						</Text>

						<Text className='font-bold text-[color:var(--color-modules-text)]'>
							{DAY_MAP[dayIndex ?? 0].toLowerCase()}
						</Text>
					</View>
					<ScrollView className='bg-[color:var(--color-schedule-block)] rounded-3xl p-[15px]'>
						{
							dayBlocks?.map((block, blockIndex) => {
								const colors = TYPE_COLORS[block.type] || TYPE_COLORS.DEFAULT;

								return (
									<View
										key={blockIndex}
										className='flex-row w-full justify-between items-center'
									>
										<Text className='text-medium font-bold text-[color:var(--color-modules-text)]'>
											{block.type}
										</Text>
										<View
											className='flex-col w-3/4 items-center py-[10px] px-[5px] border-l-[4px] rounded-lg'
											style={{
												backgroundColor: colors.bg,
												borderLeftColor: colors.border,
											}}
										>
											<Text
												numberOfLines={1}
											>
												{block.name}
											</Text>
											
											<Text>
												{block.sigle}-{block.section}
											</Text>
										</View>
									</View>
								);
							})
						}
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}