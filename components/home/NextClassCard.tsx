import {
	View,
	Text,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { NextClass } from '@/types/schedule';
import { DAY_MAP, TYPE_COLORS, TYPE_MAP } from '@/constants/schedule';

type NextClassCardProps = {
	nextClass: NextClass
};

export default function NextClassCard({ nextClass }: NextClassCardProps) {
  return (
		<View className='w-full bg-[color:var(--color-bg)] min-h-[100px] rounded-xl shadow-xl p-[15px]'>
			<Text className='text-sm font-normal text-[color:var(--text-calendar)] opacity-70'>
				Próxima clase: {nextClass.block.sigle}-{nextClass.block.section}
			</Text>

			<View className='flex-row items-start gap-[5px]'>
				<View
					className='rounded-full px-[10px] py-[2px] mt-[3px]'
					style={{ backgroundColor: TYPE_COLORS[nextClass.block.type].border }}
				>
					<Text className='text-sm font-medium text-white'>
						{TYPE_MAP[nextClass.block.type]}
					</Text>
				</View>

				<Text className='text-2xl font-medium text-[color:var(--next-class-info)] flex-shrink'>
					{nextClass.block.name}
				</Text>
			</View>

			<View className='flex-row gap-[5px]'>
				<View className='flex-row gap-[5px] items-center py-[4px]'>
					<MaterialCommunityIcons 
						name='clock-outline' 
						size={20}
						color={TYPE_COLORS[nextClass.block.type].border}
					/>

					<Text className='text-base font-medium text-[color:var(--next-class-info)] truncate'>
						{DAY_MAP[nextClass.dayIndex]}, {nextClass.date.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</Text>
				</View>

				<View className='flex-row gap-[5px] items-center py-[4px]'>
					<MaterialIcons 
						name='location-on' 
						size={20}
						color={TYPE_COLORS[nextClass.block.type].border}
					/>

					<Text className='text-base font-medium text-[color:var(--next-class-info)] truncate'>
						{nextClass.block.location}
					</Text>
				</View>
			</View>
		</View>
	);
}