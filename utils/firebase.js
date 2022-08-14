import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp, getApps } from 'firebase/app';
import localforage from 'localforage';

const firebaseCloudMessaging = {
  init: async () => {
    if (!getApps.length) {
      // Initialize the Firebase app with the credentials
      const app = initializeApp({
        apiKey: 'AIzaSyDcB6ambJLgtxH-xN6YbkICNbHEi_O9bNg',
        authDomain: 'lesgoo-ae65d.firebaseapp.com',
        projectId: 'lesgoo-ae65d',
        storageBucket: 'lesgoo-ae65d.appspot.com',
        messagingSenderId: '98773111167',
        appId: '1:98773111167:web:c54127c5fb251d1fc50a4a',
        measurementId: 'G-58GTT63H15',
      });

      try {
        const messaging = getMessaging(app);
        const tokenInLocalForage = await localforage.getItem('fcm_token');

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
          // Get new token from Firebase
          const fcm_token = await getToken(messaging, {
            vapidKey:
              'BPAIPOgQpgps0QYapK1uIryNzNBW_1NRNxnC9eFiEGT5oCfRW-hi895lepqCl12cmwkh84FzeFFv6JF4eUvt6qE',
          });

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem('fcm_token', fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
