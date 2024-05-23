// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAxLahuF_2pMyI_XDNeaGw7FvoojnLZor0',
    authDomain: 'chatme-45ce9.firebaseapp.com',
    projectId: 'chatme-45ce9',
    storageBucket: 'chatme-45ce9.appspot.com',
    messagingSenderId: '635967212150',
    appId: '1:635967212150:web:f05baac8634df1bd0fed57',
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging();
