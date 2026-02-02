export interface ThemeProviderProps {
    children: React.ReactNode;
};

export type ThemeMode = 'auto' | 'light' | 'dark';

export type ThemeContextType = {
    theme: 'light' | 'dark';
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
};