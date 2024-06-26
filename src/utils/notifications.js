import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { FirebaseAPI } from './API/FirebaseAPI.js';

// Ваши Firebase конфигурации
const firebaseConfig = {
    apiKey: 'AIzaSyAxLahuF_2pMyI_XDNeaGw7FvoojnLZor0',
    authDomain: 'chatme-45ce9.firebaseapp.com',
    projectId: 'chatme-45ce9',
    storageBucket: 'chatme-45ce9.appspot.com',
    messagingSenderId: '635967212150',
    appId: '1:635967212150:web:f05baac8634df1bd0fed57',
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            subscribe();
        }
    });
    if (window.Notification.permission === 'granted') {
        onMessage(messaging, function (payload) {
            const notificationTitle = payload.notification.title;
            const notificationOptions = {
                body: payload.notification.body,
                icon: './img/logo.png',
            };
            new Notification(notificationTitle, notificationOptions);
        });
    }
}

function subscribe() {
    getToken(messaging, {
        vapidKey:
            'BAjW0yRMyBXErSXFcv8N4eBm5ZWDfqV0RrP-jXMl0fNWZPstuPt3QtjmpiB1GAz5j1olmZPEdCBwpUbDWAh_Q8I',
    })
        .then((currentToken) => {
            if (currentToken) {
                sendTokenToServer(currentToken);
            } else {
                console.warn('Не удалось получить токен.');
                setTokenSentToServer(false);
            }
        })
        .catch((err) => {
            console.warn('При получении токена произошла ошибка.', err);
            setTokenSentToServer(false);
        });
}

function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('Отправка токена на сервер...');

        const firebaseApi = new FirebaseAPI();
        firebaseApi.setToken(currentToken);

        setTokenSentToServer(currentToken);
    } else {
        console.log('Токен уже отправлен на сервер.');
    }
}

function isTokenSentToServer(currentToken) {
    return (
        window.localStorage.getItem('sentFirebaseMessagingToken') ===
        currentToken
    );
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : '',
    );
}
