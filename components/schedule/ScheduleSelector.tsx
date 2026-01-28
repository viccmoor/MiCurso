import {
	View,
	Text,
	Pressable,
} from 'react-native';
import { useState } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

import { ScheduleModalData } from "@/types/schedule";
import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';

import ScheduleModal from '@/components/schedule/ScheduleModal';

type Props = {
	data: ScheduleModalData;
	onSetPeriod: (period: string) => void;
};

export default function ScheduleSelector({ data, onSetPeriod }: Props) {
	const { theme } = useTheme();
	const colors = Colors[theme].schedule;

	const [visible, setVisible] = useState(false);

  return (
		<View className='w-full h-[50px] items-start justify-center px-[10px]'>
			<Pressable
				className='flex-row active:bg-[#8885] items-center justify-center p-[10px] gap-[10px] rounded-full'
				onPress={() => setVisible(true)}
			>
				<Ionicons
					name='school-outline'
					size={24}
					color={colors.schoolIcon}
				/>
				<Text className='text-[color:var(--text-calendar)] font-medium'>
					{data.calendars[data.currentPeriod].name}
				</Text>
			</Pressable>

			<ScheduleModal
				visible={visible}
				data={data}
				onClose={() => setVisible(false)}
				onSetPeriod={onSetPeriod}
			/>
	</View>
	);
}