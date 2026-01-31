import React, { createContext, useContext} from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { themes } from '@/utils/tailwind-theme';

interface ThemeProviderProps {
	children: React.ReactNode;
};

type ThemeContextType = {
	theme: 'light' | 'dark';
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const { colorScheme } = useColorScheme();
	const theme: 'light' | 'dark' = colorScheme ?? 'light';

	return (
		<ThemeContext.Provider value={{ theme }}>
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
