import {
	Text,
	View,
	Modal,
	Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
	visible: boolean;
	onClose: () => void;
	onRemoveSchedule: () => void;
};

export default function RemoveScheduleModal({ visible, onClose, onRemoveSchedule }: Props) {
	const insets = useSafeAreaInsets();
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
				<View className='bg-[color:var(--color-bg)] w-[80%] min-h-[170px] rounded-2xl p-[20px]'>
					<View className='flex-1 gap-[10px]'>
						<Text className='text-[color:var(--text-modal-focus)] text-xl font-medium'>
							Eliminar horario
						</Text>

						<Text className='text-[color:var(--text-modal-focus)] text-base font-medium'>
							El horario actual se eliminará por completo.
						</Text>
					</View>

					<View className='flex-row w-full justify-between items-end'>
						<Pressable
							className='bg-[color:var(--color-secondary-default)] px-[15px] py-[8px] rounded-xl'
							onPress={onClose}
						>
							<Text className='text-[color:var(--text-modal-button)] font-medium'>
								Cancelar
							</Text>
						</Pressable>

						<Pressable
							className='bg-[color:var(--color-secondary-default)] px-[15px] py-[8px] rounded-xl'
							onPress={() => {
								onRemoveSchedule();
								onClose();
							}}
						>
							<Text className='text-[color:var(--text-modal-button)] font-medium'>
								Confirmar
							</Text>
						</Pressable>
					</View>
				</View>
			</Pressable>
		</Modal>
	);
}