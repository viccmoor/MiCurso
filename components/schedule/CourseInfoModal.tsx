import {
	View,
	Modal,
	Text,
	Pressable
} from 'react-native';
import MapView, { Geojson } from 'react-native-maps';

import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Colors } from '@/utils/native-theme';
import { useTheme } from '@/providers/ThemeProviders';
import { DAY_INDEX, DAY_MAP, MODULES, TYPE_COLORS } from '@/constants/schedule';
import resolveMapTarget, { getRegionFromFeature } from '@/utils/geo';

type Props = {
	visible: boolean;
	course: any;
	onClose: () => void;
};

export default function CourseInfoModal({ visible, course, onClose }: Props) {
	const { theme } = useTheme();
	const colors = Colors[theme].courseInfoModal;
	const mapTarget = resolveMapTarget(
		course?.location, course?.campus
	);
	const region = mapTarget
		? getRegionFromFeature(mapTarget.geojson.features[0])
		: undefined;

	return (
		<Modal
			visible={visible}
			animationType='slide'
			onRequestClose={onClose}
			transparent
		>
			<View className='flex-1 bg-[color:var(--color-bg)]'>
				<View className='flex-1 flex-col w-full items-start'>
					<Pressable
						pointerEvents='auto'
						onPress={onClose}
						className='absolute top-[15px] left-[15px] bg-[color:var(--color-bg)] w-[40px] h-[40px] justify-center items-center'
					>
						<Entypo 
							name='chevron-thin-left' 
							size={24}
							color={colors.backIcon}
						/>
					</Pressable>

					<View className='flex-col w-full items-start justify-center mt-[50px]'>
						<View className='flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--border-text-input)]'>
							<Text
								className='rounded-full text-lg text-white px-[15px]'
								style={{
									backgroundColor: TYPE_COLORS[course?.type]?.border || TYPE_COLORS.DEFAULT.border,
								}}
							>
								{course?.type}
							</Text>

							<Text className='text-2xl text-[color:var(--text-course-info)]'>
								{course?.name}
							</Text>
						</View>

						<View className='flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--border-text-input)]'>
							<MaterialIcons
								name='info-outline'
								size={20}
								color={colors.infoIcon}
							/>

							<Text className='text-lg text-[color:var(--text-course-info)]'>
								{course?.sigle}-{course?.section} | NRC: {course?.nrc}
							</Text>
						</View>

						<View className='flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--border-text-input)]'>
							<MaterialIcons
								name='domain'
								size={20}
								color={colors.infoIcon}
							/>

							<Text className='text-lg text-[color:var(--text-course-info)]'>
								Campus {course?.campus}
							</Text>
						</View>

						<View className='flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--border-text-input)]'>
							<Ionicons 
								name='today-outline' 
								size={20}
								color={colors.infoIcon}
							/>

							<Text className='text-lg text-[color:var(--text-course-info)]'>
								Módulo {course?.module} - {DAY_MAP[DAY_INDEX[course?.day]]}
							</Text>
						</View>

						<View className='flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--border-text-input)]'>
							<MaterialCommunityIcons 
								name='clock-outline' 
								size={20}
								color={colors.infoIcon}
							/>

							<Text className='text-lg text-[color:var(--text-course-info)]'>
								{MODULES[course?.module]?.range}
							</Text>
						</View>

						<View className='flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--border-text-input)]'>
							<Ionicons 
								name='grid-outline' 
								size={20}
								color={colors.infoIcon}
							/>

							<Text className='text-lg text-[color:var(--text-course-info)]'>
								Sección {course?.section}
							</Text>
						</View>

						<View className='flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--border-text-input)]'>
							<Ionicons 
								name='location-outline' 
								size={20}
								color={colors.infoIcon}
							/>

							<Text className='text-lg text-[color:var(--text-course-info)]'>
								Sala: {course?.location}
							</Text>
						</View>

						<View className='w-full h-2/5 p-[20px]'>
							<View
								className='w-full h-full'
								style={{
									borderRadius: 50,
									overflow: 'hidden',
								}}
							>
								{mapTarget ? (
										<MapView
											style={{
												flex: 1,
												zIndex: 50
											}}
											initialRegion={region}
											userInterfaceStyle={theme}
										>
											<Geojson
												geojson={mapTarget.geojson as any}
												strokeColor="#2563eb"
												fillColor="#2563EB40"
												strokeWidth={2}
											/>
										</MapView>
									)
									: (
										<View className='bg-[color:var(--color-schedule-block)] flex-1 items-center justify-center'>
											<MaterialIcons 
												name='location-off' 
												size={128}
												color='#8885'
											/>
										</View>
									)
								}
							</View>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
}