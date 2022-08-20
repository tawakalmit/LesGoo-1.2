import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp, getApps } from 'firebase/app';
import localforage from 'localforage';

const firebaseCloudMessaging = {
  init: async () => {
    const tokenInLocalForage = await localforage.getItem('fcm_token');
    if (!getApps.length) {
      // Initialize the Firebase app with the credentials
      const app = initializeApp({
        apiKey: 'AIzaSyC_j7Kz85dhaIS9JIiE2CnVjUJqhNbmiQU',
        authDomain: 'coba-4ea21.firebaseapp.com',
        projectId: 'coba-4ea21',
        storageBucket: 'coba-4ea21.appspot.com',
        messagingSenderId: '895633821591',
        appId: '1:895633821591:web:74aa2598fb3c8ca756fed2',
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
              'BJoK_GPhjnD7b73jrE30uyV23uDHnamu7aMFZ1O848UqjAR0L6FgsA1Y0xP9rXHXW_zAwwPp1y4LnIXNRJ-pglc',
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
