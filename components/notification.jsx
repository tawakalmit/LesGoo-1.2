import React, { useEffect } from 'react';
import { onMessage, getMessaging } from 'firebase/messaging';
import { firebaseCloudMessaging } from '../utils/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '../redux/chat';
import { getCookie } from 'cookies-next';

function Notification({ children }) {
  const chats = useSelector((state) => state.chats.chats);

  const group_id = getCookie('usr_group_id');
  const token = getCookie('usr_token');

  const dispatch = useDispatch();

  const router = useRouter();
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        // console.log('token', token)
        if (token) {
          // console.log('token', token);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = getMessaging();

    onMessage(messaging, (message) => {
      console.log('Message received. ', message);

      var requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group_id: group_id,
        }),
      };
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/chats`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          const { data } = result;
          dispatch(setChats({ chats: data.chats }));
        })
        .catch((err) => {
          alert(err.toString());
        })
        .finally();
      toast(
        <div onClick={() => handleClickPushNotification(message?.data?.url)}>
          <h5>{message?.notification?.title}</h5>
          <h6>{message?.notification?.body}</h6>
        </div>,
        {
          closeOnClick: false,
        }
      );
    });
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default Notification;
