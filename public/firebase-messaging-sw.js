importScripts(
  'https://www.gstatic.com/firebasejs/9.9.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.9.2/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyC_j7Kz85dhaIS9JIiE2CnVjUJqhNbmiQU',
  authDomain: 'coba-4ea21.firebaseapp.com',
  projectId: 'coba-4ea21',
  storageBucket: 'coba-4ea21.appspot.com',
  messagingSenderId: '895633821591',
  appId: '1:895633821591:web:74aa2598fb3c8ca756fed2',
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
