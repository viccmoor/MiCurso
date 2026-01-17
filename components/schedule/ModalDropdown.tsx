import React, { useState, useMemo } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { Colors } from '@/utils/native-theme';
import { useTheme } from '@/providers/ThemeProviders';

import { DataOption } from '@/utils/searchData';

type ModalDropdownProps = {
  data: DataOption[];
  placeholder: string;
};

export default function ModalDropdown({ data, placeholder }: ModalDropdownProps) {
	const { theme } = useTheme();
	const colors = Colors[theme].addCourseModal;

	const dropdownData = useMemo(() => {
		return [
			{ label: placeholder, value: 'TODOS' },
			...data,
		];
	}, [data, placeholder]);

	const [value, setValue] = useState<string | null>('TODOS');

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
			data={dropdownData}
			labelField='label'
			valueField='value'
			placeholder={placeholder}
			value={value}
			onChange={(item) => setValue(item.value)}
		/>
	);
}