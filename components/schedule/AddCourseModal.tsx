import '@/global.css';

import {
	ActivityIndicator,
	Alert,
	Modal,
	Pressable,
	Text,
	TextInput,
	View,
} from 'react-native';
import { useState } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Colors } from '@/utils/native-theme';
import { useTheme } from '@/providers/ThemeProviders';
import { searchCourses } from '@/services/courses';

type Props = {
	visible: boolean;
	onClose: () => void;
	onResults: (results: any[]) => void;
};

export default function AddCourseModal({
  visible,
  onClose,
  onResults,
}: Props) {
	const { theme } = useTheme();
	const colors = Colors[theme].addCourseModal;

	const [loading, setLoading] = useState(false);
	const [courseForm, setCourseForm] = useState({
    sigla: '',
    nrc: '',
    nombre: '',
    profesor: '',
  });

	const handleInputChange = (name: string, value: string) => {
    setCourseForm(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setCourseForm({ sigla: '', nrc: '', nombre: '', profesor: '' });
    onClose();
  };

	const handleSearch = async () => {
		const hasInput = Object.values(courseForm).some(value => value.trim() !== '');
		
		if (!hasInput) {
			Alert.alert('Atención', 'Debes completar al menos un campo para realizar la búsqueda.');
			return;
		}

		setLoading(true);

		try {
			const data = await searchCourses(courseForm);
			if (data?.meta?.cursos_encontrados > 0) {
				onResults(data.data.curso);
        resetForm();
			} else {
				Alert.alert('Sin resultados', 'No se encontraron cursos con esos criterios.');
			}
		} catch {
			Alert.alert('Atención', 'No pudimos buscar el curso. Intenta nuevamente.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			visible={visible}
			animationType='slide'
			transparent={true}
		>
			<View className='flex-1 bg-[color:var(--color-bg)] justify-center items-center'>
				<View className='absolute inset-4 flex-row justify-between'>
					<Pressable
						onPress={() => resetForm()}
						className='bg-[color:var(--color-bg)] w-[40px] h-[40px] rounded-xs justify-center items-center'
					>
						<MaterialIcons 
								name='close' 
								size={20}
								color={colors.cancelIcon}
						/>
					</Pressable>

					<Pressable
						onPress={() => handleSearch()}
						disabled={loading}
						className='bg-[color:var(--color-secondary)] w-[100px] h-[40px] rounded-full justify-center items-center'
					>
						{loading ? (
							<ActivityIndicator color='#FFF' />
						) : (
							<View className='flex-row gap-2 items-center justify-center'>
								<Ionicons 
										name='search' 
										size={20}
										color={colors.searchIcon}
								/>
								<Text className='text-[color:var(--text-modal-button)] font-semibold text-base'>
									Buscar
								</Text>
							</View>
						)}
					</Pressable>
				</View>

				<View className='flex-row justify-between items-center'>
					<Text className='font-bold text-xl text-left text-[color:var(--color-text-default)]'>
						Agregar curso
					</Text>
				</View>

				<View className='gap-2 p-[10px]'>
					<TextInput
						className='bg-[color:var(--bg-modal-input)] text-[color:var(--text-modal-focus)] focus:text-[color:var(--text-modal-focus)] placeholder:text-[color:var(--text-modal-placeholder)] placeholder:font-medium rounded-lg p-[10px]'
						placeholder='Nombre (ej: Cálculo I)'
						value={courseForm.nombre}
						onChangeText={(val) => handleInputChange('nombre', val)}
					/>

					<TextInput
						className='bg-[color:var(--bg-modal-input)] text-[color:var(--text-modal-focus)] focus:text-[color:var(--text-modal-focus)] placeholder:text-[color:var(--text-modal-placeholder)] placeholder:font-medium rounded-lg p-[10px]'
						placeholder='Sigla (ej: MAT1610)'
						value={courseForm.sigla}
						onChangeText={(val) => handleInputChange('sigla', val)}
					/>

					<TextInput
						className='bg-[color:var(--bg-modal-input)] text-[color:var(--text-modal-focus)] focus:text-[color:var(--text-modal-focus)] placeholder:text-[color:var(--text-modal-placeholder)] placeholder:font-medium rounded-lg p-[10px]'
						placeholder='NRC (ej: 12345)'
						value={courseForm.nrc}
						onChangeText={(val) => handleInputChange('nrc', val)}
						keyboardType='numeric'
					/>

					<TextInput
						className='bg-[color:var(--bg-modal-input)] text-[color:var(--text-modal-focus)] focus:text-[color:var(--text-modal-focus)] placeholder:text-[color:var(--text-modal-placeholder)] placeholder:font-medium rounded-lg p-[10px]'
						placeholder='Profesor (ej: Nombre Apellido)'
						value={courseForm.profesor}
						onChangeText={(val) => handleInputChange('profesor', val)}
					/>
				</View>
			</View>
		</Modal>
	)
}