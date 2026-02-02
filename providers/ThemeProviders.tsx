import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { themes } from '@/utils/tailwind-theme';
import { ThemeContextType, ThemeProviderProps, ThemeMode } from '@/types/theme';

const STORAGE_KEY = '@theme-mode';

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const { colorScheme, setColorScheme } = useColorScheme();
	const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const saved = await AsyncStorage.getItem(STORAGE_KEY);
				if (saved === 'light' || saved === 'dark' || saved === 'auto') {
					setThemeModeState(saved);
				}
			} finally {
				setIsReady(true);
			}
		})();
	}, []);

	useEffect(() => {
		if (!isReady) return;

		if (themeMode === 'auto') {
			setColorScheme('system');
		} else {
			setColorScheme(themeMode);
		}

		AsyncStorage.setItem(STORAGE_KEY, themeMode);
	}, [themeMode, setColorScheme, isReady]);

	const theme: 'light' | 'dark' =
		themeMode === 'auto'
			? colorScheme ?? 'light'
			: themeMode;

	const setThemeMode = (mode: ThemeMode) => {
		setThemeModeState(mode);
	};

	if (!isReady) {
    return null;
  }

	return (
		<ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
			<View style={themes[theme]} className='flex-1'>
				{children}
			</View>
		</ThemeContext.Provider>
	)
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
	return context;
};
