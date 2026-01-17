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
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import {
	academicUnitsData,
	admissionPeriodData,
	campusData,
	categoriesData,
	formatData,
	generalFormationData,
	programLevelData,
	schoolData
} from '@/utils/searchData';
import { Colors } from '@/utils/native-theme';
import { useTheme } from '@/providers/ThemeProviders';
import { searchCourses } from '@/services/courses';

import ModalDropdown from '@/components/schedule/ModalDropdown';

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
	const hasInput = Object.values(courseForm).some(v => v.trim() !== '');

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
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ flex: 1 }}
			>
				<View className='flex-1 bg-[color:var(--color-bg)]'>
					<View
						className='absolute top-0 left-0 right-0 h-[80px] bg-[color:var(--color-bg)] z-20 flex-row items-center justify-between px-4'
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
							disabled={loading || !hasInput}
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
							<FontAwesome
								name='university'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 12 }}
							/>

							<ModalDropdown data={campusData} placeholder='Todos los campus'/>
						</View>

						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<MaterialIcons
								name='laptop'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 12 }}
							/>

							<ModalDropdown data={formatData} placeholder='Todos los formatos'/>
						</View>

						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<Ionicons
								name='folder-outline'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 12 }}
							/>

							<ModalDropdown data={categoriesData} placeholder='Todas las categorías'/>
						</View>

						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<Ionicons
								name='globe-outline'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 12 }}
							/>

							<ModalDropdown data={generalFormationData} placeholder='Todas las áreas de formación general'/>
						</View>

						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<Ionicons
								name='library-outline'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 12 }}
							/>

							<ModalDropdown data={academicUnitsData} placeholder='Todas las unidades académicas'/>
						</View>

						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<MaterialCommunityIcons
								name='door-open'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 12 }}
							/>

							<ModalDropdown data={admissionPeriodData} placeholder='Todos los períodos de admisión'/>
						</View>

						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<MaterialCommunityIcons
								name='school-outline'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 12 }}
							/>

							<ModalDropdown data={schoolData} placeholder='Todas las escuelas'/>
						</View>

						<View className='flex-row items-start border-t border-[color:var(--border-text-input)] p-[10px] px-[20px]'>
							<MaterialCommunityIcons
								name='certificate-outline'
								size={24}
								color={colors.textInputIcon}
								style={{ marginTop: 12 }}
							/>

							<ModalDropdown data={programLevelData} placeholder='Todos los niveles'/>
						</View>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	)
}