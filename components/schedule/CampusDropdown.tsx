import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { Colors } from '@/utils/native-theme';
import { useTheme } from '@/providers/ThemeProviders';

const data = [
	{ label: 'Campus Externo', value: 'Campus Externo' },
	{ label: 'Casa Central', value: 'Casa Central' },
	{ label: 'Lo Contador', value: 'Lo Contador' },
	{ label: 'Oriente', value: 'Oriente' },
	{ label: 'San Joaquín', value: 'San Joaquín' },
	{ label: 'Villarica', value: 'Villarica' },
];

export default function CampusDropdown() {
	const { theme } = useTheme();
	const colors = Colors[theme].addCourseModal;

	const [value, setValue] = useState<string | null>(null);

	return (
		<Dropdown
			style={{
				flex: 1,
				height: 48,
				paddingHorizontal: 10,
			}}
			placeholderStyle={{
				color: colors.textInputIcon,
				fontSize: 18,
			}}
			selectedTextStyle={{
				color: colors.textInputIcon,
				fontSize: 18,
			}}
			containerStyle={{
				backgroundColor: colors.containerBg,
				borderColor: colors.containerBorder,
			}}
			itemTextStyle={{
				color: colors.containerText,
			}}
			activeColor={colors.containerActiveItem}
			data={data}
			labelField='label'
			valueField='value'
			placeholder='Selecciona un campus'
			value={value}
			onChange={(item) => setValue(item.value)}
		/>
	);
}