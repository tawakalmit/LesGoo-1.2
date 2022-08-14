importScripts(
  'https://www.gstatic.com/firebasejs/9.9.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.9.2/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyDcB6ambJLgtxH-xN6YbkICNbHEi_O9bNg',
  authDomain: 'lesgoo-ae65d.firebaseapp.com',
  projectId: 'lesgoo-ae65d',
  storageBucket: 'lesgoo-ae65d.appspot.com',
  messagingSenderId: '98773111167',
  appId: '1:98773111167:web:c54127c5fb251d1fc50a4a',
  measurementId: 'G-58GTT63H15',
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
