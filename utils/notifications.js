import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATIONS_KEY = 'UdaciCards:notifications';

const NOTIFICATION_OPTIONS = {
  title: 'Complete a test',
  body: 'Please remember to complete a test today. Repetition is the mother of learning!',
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    vibrate: true,
    priority: 'high',
  },
};

export const clearLocalNotification = async () => {
  await AsyncStorage.removeItem(NOTIFICATIONS_KEY);
  return Notifications.cancelAllScheduledNotificationsAsync();
}

export const setLocalNotification = async () => {
  let notificationSet = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
  notificationSet = await JSON.parse(notificationSet);

  if (notificationSet === null) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync();

      const notificationDate = new Date();
      notificationDate.setDate(notificationDate.getDate() + 1);
      notificationDate.setHours(21);
      notificationDate.setMinutes(0);

      Notifications.scheduleLocalNotificationAsync(
        NOTIFICATION_OPTIONS,
        {
          time: notificationDate,
          repeat: 'day',
        },
      );

      AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
    }
  }
}
