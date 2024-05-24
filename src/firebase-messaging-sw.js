// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts(
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: 'AIzaSyAxLahuF_2pMyI_XDNeaGw7FvoojnLZor0',
    authDomain: 'chatme-45ce9.firebaseapp.com',
    projectId: 'chatme-45ce9',
    storageBucket: 'chatme-45ce9.appspot.com',
    messagingSenderId: '635967212150',
    appId: '1:635967212150:web:f05baac8634df1bd0fed57',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: './img/logo.png',
    };

    self.registration
        .showNotification(notificationTitle, notificationOptions)
        .then();
});
