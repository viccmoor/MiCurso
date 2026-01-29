import {
	View,
	Text,
	Modal,
	Pressable,
} from "react-native";

type Props = {
	visible: boolean;
	course: any;
	onClose: () => void;
	onAddCourse: () => void;
};

export default function ConfirmationModal({ visible, course, onClose, onAddCourse }: Props) {
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
				<View className='bg-[color:var(--color-bg)] w-[90%] h-[20%] rounded-2xl p-[20px]'>
					<View className='flex-1 gap-[10px]'>
						<Text className='text-[color:var(--text-modal-focus)] text-xl font-medium'>
							Agregar curso
						</Text>

						<Text className='text-[color:var(--text-modal-focus)] text-base font-medium'>
							¿Deseas añadir {course?.sigla}-{course?.seccion} a tu horario?
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
							onPress={onAddCourse}
						>
							<Text className='text-[color:var(--text-modal-button)] font-medium'>
								Agregar
							</Text>
						</Pressable>
					</View>
				</View>
			</Pressable>
		</Modal>
	);
}