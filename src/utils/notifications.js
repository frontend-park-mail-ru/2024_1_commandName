if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    if (permission === 'denied') {
        console.error('no notifications');
    }
    if (permission === 'granted') {
        console.info('accepted');
    }
}
