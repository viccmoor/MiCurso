import '@/global.css';

import {
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from 'react-native';
import { useState, useCallback } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Colors } from '@/utils/native-theme';
import { useTheme } from '@/providers/ThemeProviders';
import { searchCourses } from '@/services/courses';

import CampusDropdown from '@/components/schedule/CampusDropdown';

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

	const onChangeText = useCallback((name: string, value: string) => {
		setCourseForm(prev => ({ ...prev, [name]: value }));
	}, []);

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
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ flex: 1 }}
			>
				<View className='flex-1 bg-[color:var(--color-bg)]'>
					<View
						pointerEvents='box-none'
						className='absolute inset-4 flex-row justify-between z-10'
					>
						<Pressable
							pointerEvents='auto'
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
							pointerEvents='auto'
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

					<ScrollView
						contentContainerStyle={{ paddingTop: 80 }}
						keyboardShouldPersistTaps='handled'
					>
						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<MaterialIcons
								name='drive-file-rename-outline'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 10 }}
							/>

							<TextInput
								multiline
								maxLength={100}
								textAlignVertical='top'
								className='text-[color:var(--text-modal-focus)] focus:text-[color:var(--text-modal-focus)] placeholder:text-[color:var(--text-modal-placeholder)] placeholder:font-normal text-xl rounded-lg p-[10px] w-full'
								placeholder='Nombre (ej: Cálculo I)'
								value={courseForm.nombre}
								onChangeText={(val) => onChangeText('nombre', val)}
							/>
						</View>

						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<MaterialIcons
								name='abc'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 10 }}
							/>

							<TextInput
								maxLength={10}
								textAlignVertical='top'
								className='text-[color:var(--text-modal-focus)] focus:text-[color:var(--text-modal-focus)] placeholder:text-[color:var(--text-modal-placeholder)] placeholder:font-normal text-xl rounded-lg p-[10px] w-full'
								placeholder='Sigla (ej: MAT1610)'
								value={courseForm.sigla}
								onChangeText={(val) => onChangeText('sigla', val)}
							/>
						</View>

						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<MaterialIcons
								name='123'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 10 }}
							/>

							<TextInput
								maxLength={10}
								keyboardType='numeric'
								textAlignVertical='top'
								className='text-[color:var(--text-modal-focus)] focus:text-[color:var(--text-modal-focus)] placeholder:text-[color:var(--text-modal-placeholder)] placeholder:font-normal text-xl rounded-lg p-[10px] w-full'
								placeholder='NRC (ej: 12345)'
								value={courseForm.nrc}
								onChangeText={(val) => onChangeText('nrc', val)}
							/>
						</View>

						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<MaterialCommunityIcons
								name='account-school-outline'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 10 }}
							/>

							<TextInput
								maxLength={10}
								textAlignVertical='top'
								className='text-[color:var(--text-modal-focus)] focus:text-[color:var(--text-modal-focus)] placeholder:text-[color:var(--text-modal-placeholder)] placeholder:font-normal text-xl rounded-lg p-[10px] w-full'
								placeholder='Profesor (ej: Nombre Apellido)'
								value={courseForm.profesor}
								onChangeText={(val) => onChangeText('profesor', val)}
							/>
						</View>

						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<MaterialIcons
								name='people'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 12 }}
							/>

							<CampusDropdown />
						</View>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	)
}