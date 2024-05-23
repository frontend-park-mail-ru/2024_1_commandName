export class NotificationsManager {
    async permissionCheck() {
        if ('Notification' in window) {
            return await Notification.requestPermission();
        }
    }
}
