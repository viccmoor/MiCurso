import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Calendars } from '@/types/schedule';
import { DEFAULT_CALENDARS } from '@/constants/schedule';

const STORAGE_KEY = '@schedule_app_data';

type ScheduleContextType = {
	calendars: Calendars;
	setCalendars: React.Dispatch<React.SetStateAction<Calendars>>;
	currentPeriod: string;
	setCurrentPeriod: (period: string) => void;
	isLoading: boolean;
};

const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const ScheduleProvider = ({ children }: { children: React.ReactNode }) => {
	const [calendars, setCalendars] = useState(DEFAULT_CALENDARS);
	const [currentPeriod, setCurrentPeriod] = useState('2026-1');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadStoredData = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
				if (jsonValue != null) {
					const savedData = JSON.parse(jsonValue);
					setCalendars(savedData.calendars);
					setCurrentPeriod(savedData.currentPeriod);
				}
			} catch (e) {
				console.error('Error loading the data:', e);
			} finally {
				setIsLoading(false);
			}
		};

		loadStoredData();
	}, []);

	useEffect(() => {
		const saveToStorage = async () => {
			if (isLoading) return;

			try {
				const dataToSave = JSON.stringify({ calendars, currentPeriod });
				await AsyncStorage.setItem(STORAGE_KEY, dataToSave);
			} catch (e) {
				console.error('Error saving the data:', e);
			}
		};

		saveToStorage();
	}, [calendars, currentPeriod, isLoading]);

	return (
		<ScheduleContext.Provider
			value={{
				calendars,
				setCalendars,
				currentPeriod,
				setCurrentPeriod,
				isLoading,
			}}
		>
			{children}
		</ScheduleContext.Provider>
	);
};

export function useSchedule() {
	const context = useContext(ScheduleContext);
	if (!context) {
		throw new Error('useSchedule must be used inside ScheduleProvider');
	}

	return context;
};
