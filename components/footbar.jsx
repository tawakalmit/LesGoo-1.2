import React, { useState } from 'react';

import { FiSend } from 'react-icons/fi';
import { GoAlert } from 'react-icons/go';
import Swal from 'sweetalert2';

export default function Footbar(props) {
  const [message, setMessage] = useState({ message: '' });

  const handleChangeMessage = (e) => {
    setMessage(() => ({ message: e.target.value }));
  };

  const handleClickSos = (e) => {
    let timerInterval
    Swal.fire({
      backdrop: `rgba(231, 76, 60, .7)`,
      title: 'SOS Activated',
      html:
        '<strong></strong> seconds.<br/><br/> Dont worry, <br> Your group members are alerted.',
      timer: 20000,
      didOpen: () => {
        const content = Swal.getHtmlContainer()
        const $ = content.querySelector.bind(content)

        Swal.showLoading()

        timerInterval = setInterval(() => {
          Swal.getHtmlContainer().querySelector('strong')
            .textContent = (Swal.getTimerLeft() / 1000)
              .toFixed(0)
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })
  };

  const handleClickSend = (e) => {};
  return (
    <div className='w-full shadow-2xl shadow-black fixed bottom-0 h-16 bg-[#1abc9c] mx-auto md:w-[425px]'>
      <div className='mx-auto  h-16 items-center w-11/12 flex justify-between '>
        <GoAlert
          onClick={handleClickSos}
          className='cursor-pointer '
          size={35}
          color='#E74C3C'
          id='btn-home'
        />
        <input
          onChange={handleChangeMessage}
          id='input-chat'
          type='text'
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
