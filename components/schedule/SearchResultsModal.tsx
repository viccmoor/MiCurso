import {
	Modal,
	View,
	Text,
	ScrollView,
	Pressable,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Colors } from '@/utils/native-theme';
import { useTheme } from '@/providers/ThemeProviders';

type Props = {
	visible: boolean;
	searchResults: any[];
	onAddCourse: (curso: any) => void;
	onClose: () => void;
};

export default function SearchResultsModal({ visible, searchResults, onAddCourse, onClose }: Props) {
	const { theme } = useTheme();
	const colors = Colors[theme].searchResultsModal;
	
  return (
		<Modal
			visible={visible}
			animationType='slide'
			transparent
		>
			<Pressable
				className='flex-1 bg-black/50 justify-center items-center'
				onPress={onClose}
			>
				<View className='w-[90%] h-[80%] bg-[color:var(--color-bg)] rounded-2xl p-4'>
					<Text className='text-xl font-bold text-center mb-4 text-[color:var(--title-search-results)]'>
						Se han encontrado {searchResults.length} cursos
					</Text>

					<ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
						{searchResults.map((curso: any, index) => (
							<Pressable
								key={index}
								onPress={() => onAddCourse(curso)}
								className='bg-[color:var(--color-schedule-block)] p-4 rounded-xl mb-3 shadow-sm active:opacity-70'
							>
								<View className='flex-row justify-between items-start'>
									<View className='flex-1'>
										<Text className='text-[color:var(--sigle-search-results)] font-bold text-sm'>
											{curso.sigla}
										</Text>

										<Text className='text-[color:var(--name-search-results)] font-semibold text-lg' numberOfLines={1}>
											{curso.nombre}
										</Text>

										<Text className='text-[color:var(--section-search-results)] text-xs'>
											Sección: {curso.seccion} | NRC: {curso.nrc}
										</Text>

										<Text className='text-[color:var(--teachers-search-results)] text-sm italic mt-1'>
											{curso.profesor.join(', ')}
										</Text>
									</View>

									<MaterialIcons
										name='add-circle'
										size={24}
										color={colors.addCircleIcon}
									/>
								</View>
							</Pressable>
						))}
					</ScrollView>

					<Pressable
						onPress={onClose}
						className='mt-4 bg-[color:var(--color-secondary-default)] p-3 rounded-xl items-center'
					>
						<Text className='text-[color:var(--text-modal-button)] font-bold'>
							Volver a buscar
						</Text>
					</Pressable>
				</View>
			</Pressable>
		</Modal>
	);
}