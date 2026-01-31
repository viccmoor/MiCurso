import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { NextClass } from '@/types/schedule';

export async function requestNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();

	if (status !== 'granted') {
		await Notifications.requestPermissionsAsync();
	}

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('courses', {
			name: 'Clases',
			importance: Notifications.AndroidImportance.HIGH,
		});
	}
}

export async function scheduleNextClassNotification(nextClass: NextClass) {
	const notifyAt = new Date(nextClass.date.getTime() - 10 * 60 * 1000);
	if (notifyAt <= new Date()) return;

	await Notifications.cancelAllScheduledNotificationsAsync();
	await Notifications.scheduleNotificationAsync({
		content: {
			title: 'Próxima clase',
			body: `${nextClass.block.name} - Sala: ${nextClass.block.location}`,
			sound: true,
		},
		trigger: {
			type: 'date',
			date: notifyAt,
		} as Notifications.NotificationTriggerInput,
	});
}

export async function clearClassNotifications() {
	await Notifications.cancelAllScheduledNotificationsAsync();
}