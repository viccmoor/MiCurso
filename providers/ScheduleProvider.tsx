import { createContext, useContext, useState } from 'react';

import { Calendars } from '@/types/schedule';
import { DEFAULT_CALENDARS } from '@/constants/schedule';

type ScheduleContextType = {
	calendars: Calendars;
	setCalendars: React.Dispatch<React.SetStateAction<Calendars>>;
	currentPeriod: string;
	setCurrentPeriod: (period: string) => void;
};

const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const ScheduleProvider = ({ children }: { children: React.ReactNode }) => {
	const [calendars, setCalendars] = useState(DEFAULT_CALENDARS);
	const [currentPeriod, setCurrentPeriod] = useState('2026-1');

	return (
		<ScheduleContext.Provider
			value={{
				calendars,
				setCalendars,
				currentPeriod,
				setCurrentPeriod,
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
