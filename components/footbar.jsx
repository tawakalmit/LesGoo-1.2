import React, { useState, useEffect } from 'react';

import { FiSend } from 'react-icons/fi';
import { GoAlert } from 'react-icons/go';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { getCookie } from 'cookies-next';
import { setChats } from '../redux/chat';

export default function Footbar(props) {
  const token = getCookie('usr_token');
  const group_id = getCookie('usr_group_id');
  const dispatch = useDispatch();
  const [message, setMessage] = useState({
    message: '',
    isSOS: false,
    group_id: null,
  });

  const handleChangeMessage = (e) => {
    setMessage((state) => ({ ...state, message: e.target.value }));
  };

  useEffect(() => {
    setMessage((state) => ({ ...state, group_id: getCookie('usr_group_id') }));
  }, []);

  // const handleClickSos = (e) => {
  //   e.preventDefault();
  //   let requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       group_id: message.group_id,
  //       isSOS: true,
  //       message: 'SOS',
  //     }),
  //   };
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (code === 200) {
  //         // console.log(result);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   let timerInterval;
  //   Swal.fire({
  //     backdrop: `rgba(231, 76, 60, .7)`,
  //     title: 'SOS Activated',
  //     html: '<strong></strong> seconds.<br/><br/> Dont worry, <br> Your group members are alerted.',
  //     timer: 15000,
  //     didOpen: () => {
  //       const content = Swal.getHtmlContainer();
  //       const $ = content.querySelector.bind(content);

  //       Swal.showLoading();

  //       timerInterval = setInterval(() => {
  //         Swal.getHtmlContainer().querySelector('strong').textContent = (
  //           Swal.getTimerLeft() / 1000
  //         ).toFixed(0);
  //       }, 100);
  //     },
  //     willClose: () => {
  //       clearInterval(timerInterval);
  //     },
  //   });
  // };

  const handleClickSendSOS = async (e) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            group_id: message.group_id,
            isSOS: true,
            message: message.message,
          }),
        }
      );
      const data = await response.json();
      if (response.status < 300) {
        setMessage((state) => ({ ...state, message: '' }));
        // alert('success');
      } else if (response.status >= 300) {
        throw data.message;
      }
    } catch (error) {
      console.log('error:', error);
      // alert(error);
    }
    let timerInterval;
    Swal.fire({
      backdrop: `rgba(231, 76, 60, .7)`,
      title: 'SOS Activated',
      html: '<strong></strong> seconds.<br/><br/> Dont worry, <br> Your group members are alerted.',
      timer: 15000,
      didOpen: () => {
        const content = Swal.getHtmlContainer();
        const $ = content.querySelector.bind(content);

        Swal.showLoading();

        timerInterval = setInterval(() => {
          Swal.getHtmlContainer().querySelector('strong').textContent = (
            Swal.getTimerLeft() / 1000
          ).toFixed(0);
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  };

  const handleClickSend = async (e) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            group_id: message.group_id,
            isSOS: false,
            message: message.message,
          }),
        }
      );
      const data = await response.json();
      if (response.status < 300) {
        setMessage((state) => ({ ...state, message: '' }));
        fetchChat();
        // alert('success');
      } else if (response.status >= 300) {
        throw data.message;
      }
    } catch (error) {
      console.log('error:', error);
      // alert(error);
    }
  };

  const fetchChat = async () => {
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group_id: group_id }),
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/group/chats`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        // console.log(data);
        dispatch(
          setChats({
            status: data.status,
            groupname: data.name,
            chats: data.chats,
            created_at: data.created_at,
          })
        );
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally();
  };

  return (
    <div className='w-full shadow-2xl shadow-black fixed bottom-0 h-16 bg-[#1abc9c] mx-auto md:w-[425px]'>
      <div className='mx-auto  h-16 items-center w-11/12 flex justify-between '>
        <GoAlert
          onClick={handleClickSendSOS}
          className='cursor-pointer '
          size={35}
          color='#E74C3C'
          id='btn-home'
        />
        <input
          onChange={handleChangeMessage}
          id='input-chat'
          type='text'
          value={message.message}
          placeholder='Message'
          className='w-full bg-slate-100 mx-7 p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-100 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none'
        />
        <FiSend
          onClick={handleClickSend}
          className='cursor-pointer'
          size={35}
          color='white'
          id='btn-send'
        />
      </div>
    </div>
  );
}
