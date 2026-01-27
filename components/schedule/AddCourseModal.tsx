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

import {
	academicUnitsData,
	admissionPeriodData,
	campusData,
	categoriesData,
	formatData,
	generalFormationData,
	programLevelData,
	schoolData
} from '@/data/schedule/searchData';
import { Colors } from '@/utils/native-theme';
import { CourseForm, OptionSelectorData } from '@/types/schedule';
import { useTheme } from '@/providers/ThemeProviders';
import { searchCourses } from '@/services/courses';
import { EMPTY_COURSE_FORM, EMPTY_OPTION_SELECTOR_DATA } from '@/constants/schedule';

import OptionSelectorModal from '@/components/schedule/OptionSelectorModal';

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

	const [optionSelectorVisible, setOptionSelectorVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const [data, setData] = useState<OptionSelectorData>(EMPTY_OPTION_SELECTOR_DATA);
	const [courseForm, setCourseForm] = useState<CourseForm>(EMPTY_COURSE_FORM);
	const hasInput = Object.values(courseForm).some(v => v.trim() !== '');

	const onChangeText = useCallback((name: string, value: string) => {
		setCourseForm(prev => ({ ...prev, [name]: value }));
	}, []);

	const resetForm = () => {
		setCourseForm(EMPTY_COURSE_FORM);
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
			<OptionSelectorModal
				visible={optionSelectorVisible}
				data={data}
				onClose={() => setOptionSelectorVisible(false)}
				onSelectOption={(field, value) => {
					setCourseForm(prev => ({
						...prev,
						[field as keyof CourseForm]: value
					}));
				}}
			/>

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
								value={courseForm.name}
								onChangeText={(val) => onChangeText('name', val)}
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
								value={courseForm.sigle}
								onChangeText={(val) => onChangeText('sigle', val)}
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
								maxLength={50}
								textAlignVertical='top'
								className='text-[color:var(--text-modal-focus)] focus:text-[color:var(--text-modal-focus)] placeholder:text-[color:var(--text-modal-placeholder)] placeholder:font-normal text-xl rounded-lg p-[10px] w-full'
								placeholder='Profesor (ej: Nombre Apellido)'
								value={courseForm.teacher}
								onChangeText={(val) => onChangeText('teacher', val)}
							/>
						</View>

						<Pressable
							className='flex-row items-start gap-[10px] border-t border-[color:var(--border-text-input)] p-[20px] active:bg-[#8885]'
							onPress={() => {
								setData({
									options: campusData,
									name: 'campus',
									field: 'campus',
									selectedValue: courseForm['campus'],
								});
								setOptionSelectorVisible(true);
							}}
						>
							<MaterialIcons
								name='domain'
								size={24}
								color={colors.textInputIcon}
							/>

							<Text className='text-[color:var(--text-modal-focus)] text-xl'>
								{campusData.find(opt => opt.value === courseForm['campus'])!.label}
							</Text>
						</Pressable>

						<Pressable
							className='flex-row items-start gap-[10px] border-t border-[color:var(--border-text-input)] p-[20px] active:bg-[#8885]'
							onPress={() => {
								setData({
									options: formatData,
									name: 'formato',
									field: 'format',
									selectedValue: courseForm['format'],
								});
								setOptionSelectorVisible(true);
							}}
						>
							<MaterialIcons
								name='laptop'
								size={24}
								color={colors.textInputIcon}
							/>

							<Text className='text-[color:var(--text-modal-focus)] text-xl'>
								{formatData.find(opt => opt.value === courseForm['format'])!.label}
							</Text>
						</Pressable>

						<Pressable
							className='flex-row items-start gap-[10px] border-t border-[color:var(--border-text-input)] p-[20px] active:bg-[#8885]'
							onPress={() => {
								setData({
									options: categoriesData,
									name: 'categoría',
									field: 'category',
									selectedValue: courseForm['category'],
								});
								setOptionSelectorVisible(true);
							}}
						>
							<Ionicons
								name='folder-outline'
								size={24}
								color={colors.textInputIcon}
							/>

							<Text className='text-[color:var(--text-modal-focus)] text-xl'>
								{categoriesData.find(opt => opt.value === courseForm['category'])!.label}
							</Text>
						</Pressable>

						<Pressable
							className='flex-row items-start gap-[10px] border-t border-[color:var(--border-text-input)] p-[20px] active:bg-[#8885]'
							onPress={() => {
								setData({
									options: generalFormationData,
									name: 'área de formación general',
									field: 'generalFormationArea',
									selectedValue: courseForm['generalFormationArea'],
								});
								setOptionSelectorVisible(true);
							}}
						>
							<Ionicons
								name='globe-outline'
								size={24}
								color={colors.textInputIcon}
							/>

							<Text className='text-[color:var(--text-modal-focus)] text-xl'>
								{generalFormationData.find(opt => opt.value === courseForm['generalFormationArea'])!.label}
							</Text>
						</Pressable>

						<Pressable
							className='flex-row items-start gap-[10px] border-t border-[color:var(--border-text-input)] p-[20px] active:bg-[#8885]'
							onPress={() => {
								setData({
									options: academicUnitsData,
									name: 'unidad académica',
									field: 'academicUnit',
									selectedValue: courseForm['academicUnit'],
								});
								setOptionSelectorVisible(true);
							}}
						>
							<Ionicons
								name='library-outline'
								size={24}
								color={colors.textInputIcon}
							/>

							<Text className='text-[color:var(--text-modal-focus)] text-xl'>
								{academicUnitsData.find(opt => opt.value === courseForm['academicUnit'])!.label}
							</Text>
						</Pressable>

						<Pressable
							className='flex-row items-start gap-[10px] border-t border-[color:var(--border-text-input)] p-[20px] active:bg-[#8885]'
							onPress={() => {
								setData({
									options: admissionPeriodData,
									name: 'período de admisión',
									field: 'admissionPeriod',
									selectedValue: courseForm['admissionPeriod'],
								});
								setOptionSelectorVisible(true);
							}}
						>
							<MaterialCommunityIcons
								name='door-open'
								size={24}
								color={colors.textInputIcon}
							/>

							<Text className='text-[color:var(--text-modal-focus)] text-xl'>
								{admissionPeriodData.find(opt => opt.value === courseForm['admissionPeriod'])!.label}
							</Text>
						</Pressable>

						<Pressable
							className='flex-row items-start gap-[10px] border-t border-[color:var(--border-text-input)] p-[20px] active:bg-[#8885]'
							onPress={() => {
								setData({
									options: schoolData,
									name: 'escuela',
									field: 'school',
									selectedValue: courseForm['school'],
								});
								setOptionSelectorVisible(true);
							}}
						>
							<MaterialCommunityIcons
								name='school-outline'
								size={24}
								color={colors.textInputIcon}
							/>

							<Text className='text-[color:var(--text-modal-focus)] text-xl'>
								{schoolData.find(opt => opt.value === courseForm['school'])!.label}
							</Text>
						</Pressable>

						<Pressable
							className='flex-row items-start gap-[10px] border-t border-[color:var(--border-text-input)] p-[20px] active:bg-[#8885]'
							onPress={() => {
								setData({
									options: programLevelData,
									name: 'nivel',
									field: 'programLevel',
									selectedValue: courseForm['programLevel'],
								});
								setOptionSelectorVisible(true);
							}}
						>
							<MaterialCommunityIcons
								name='certificate-outline'
								size={24}
								color={colors.textInputIcon}
							/>

							<Text className='text-[color:var(--text-modal-focus)] text-xl'>
								{programLevelData.find(opt => opt.value === courseForm['programLevel'])!.label}
							</Text>
						</Pressable>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	)
}