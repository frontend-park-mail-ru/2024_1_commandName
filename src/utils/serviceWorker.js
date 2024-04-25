const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/index.html',
    '/Pages/ChangePasswordPage.js',
    '/Pages/ChatPage.js',
    '/Pages/ContactsPage.js',
    '/Pages/CreateGroupPage.js',
    '/Pages/EditGroupPage.js',
    '/Pages/LoginPage.js',
    '/Pages/Page404.js',
    '/Pages/ProfileEditPage.js',
    '/Pages/ProfilePage.js',
    '/Pages/RegisterPage.js',
    '/Pages/ChatPage.js',
    '/Pages/BasePage.js',
    '/styles/index.css',
    '/index.js',
    '/favicon.ico',
    '/utils/router',
    '/config/config.js',
    '/Components/Chat/Chat.css',
    '/Components/Chat/Chat.hbs',
    '/Components/Chat/Chat.js',
    '/Components/Chat/Chat.precompiled.js',
    '/Components/ChatList/ChatList.css',
    '/Components/ChatList/ChatList.hbs',
    '/Components/ChatList/ChatList.js',
    '/Components/ChatList/ChatList.precompiled.js',
    '/Components/ChatListItem/ChatListItem.css',
    '/Components/ChatListItem/ChatListItem.hbs',
    '/Components/ChatListItem/ChatListItem.js',
    '/Components/ChatListItem/ChatListItem.precompiled.js',
    '/Components/Contacts/Contacts.css',
    '/Components/Contacts/Contacts.hbs',
    '/Components/Contacts/Contacts.js',
    '/Components/Contacts/Contacts.precompiled.js',
    '/Components/ContactItem/ContactItem.css',
    '/Components/ContactItem/ContactItem.hbs',
    '/Components/ContactItem/ContactItem.js',
    '/Components/ContactItem/ContactItem.precompiled.js',
    '/Components/Form/Form.css',
    '/Components/Form/Form.hbs',
    '/Components/Form/Form.js',
    '/Components/Form/Form.precompiled.js',
    '/Components/Message/Message.css',
    '/Components/Message/Message.hbs',
    '/Components/Message/Message.js',
    '/Components/Message/Message.precompiled.js',
    '/Components/Profile/Profile.css',
    '/Components/Profile/Profile.hbs',
    '/Components/Profile/Profile.js',
    '/Components/Profile/Profile.precompiled.js',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        }),
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }

            return fetch(event.request);
        }),
    );
});