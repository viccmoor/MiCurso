import { useEffect } from 'react';

import {
	requestNotificationPermissions,
	scheduleNextClassNotification,
	clearClassNotifications
} from '@/services/notifications';
import { NextClass } from '@/types/schedule';

export function useClassNotifications(nextClass?: NextClass) {
	useEffect(() => {
		requestNotificationPermissions();
	}, []);

	useEffect(() => {
		if (nextClass) {
			scheduleNextClassNotification(nextClass);
		} else {
			clearClassNotifications();
		}
	}, [nextClass]);
}