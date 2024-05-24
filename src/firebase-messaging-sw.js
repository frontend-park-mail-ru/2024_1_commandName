import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';
import { onBackgroundMessage } from 'firebase/messaging/sw';

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const app = initializeApp({
    apiKey: 'AIzaSyAxLahuF_2pMyI_XDNeaGw7FvoojnLZor0',
    authDomain: 'chatme-45ce9.firebaseapp.com',
    projectId: 'chatme-45ce9',
    storageBucket: 'chatme-45ce9.appspot.com',
    messagingSenderId: '635967212150',
    appId: '1:635967212150:web:f05baac8634df1bd0fed57',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload,
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: './img/logo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
