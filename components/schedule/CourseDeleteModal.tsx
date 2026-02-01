import {
	View,
	Text,
	Modal,
	Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';

type Props = {
	visible: boolean;
	onClose: () => void;
	onDelete: (deleteCourse: boolean) => void;
};

export default function CourseDeleteModal({ visible, onClose, onDelete }: Props) {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const colors = Colors[theme].courseInfoModal;

	return (
		<Modal
			visible={visible}
			animationType='fade'
			transparent
		>
			<Pressable
				className='flex-1 bg-black/50 justify-end items-center'
				style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
				onPress={onClose}
			>
				<View className='bg-[color:var(--color-bg)] w-[90%] h-[28%] mb-[20px] rounded-2xl justify-center'>
					<Text className='text-xl text-[color:var(--text-course-info)] font-medium p-[15px]'>
						¿Qué deseas eliminar?
					</Text>

					<Pressable
						className='flex-row w-full items-center gap-[10px] px-[20px] py-[10px] active:bg-[#8885]'
						onPress={() => {
							onDelete(true);
							onClose();
						}}
					>
						<Ionicons
							name='school-outline'
							size={24}
							color={colors.deleteCourseIcon}
						/>
						<Text className='text-lg text-medium text-[color:var(--text-course-info)]'>
							Eliminar curso
						</Text>
					</Pressable>

					<Pressable
						className='flex-row w-full items-center gap-[10px] px-[20px] py-[10px] active:bg-[#8885]'
						onPress={() => {
							onClose();
							onDelete(false);
						}}
					>
						<Ionicons
							name='grid-outline'
							size={24}
							color={colors.deleteBlockIcon}
						/>
						<Text className='text-lg text-medium text-[color:var(--text-course-info)]'>
							Eliminar bloque
						</Text>
					</Pressable>

					<Pressable
						className='w-full items-end'
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