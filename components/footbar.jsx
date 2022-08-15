import React, { useState } from 'react';

import { FiSend } from 'react-icons/fi';
import { GoAlert } from 'react-icons/go';

export default function Footbar(props) {
  const [message, setMessage] = useState({ message: '' });

  const handleChangeMessage = (e) => {
    setMessage(() => ({ message: e.target.value }));
  };

  const handleClickSos = (e) => {};

  const handleClickSend = (e) => {};
  return (
    <div className='w-full shadow-2xl shadow-black fixed left-0 bottom-0 h-16 bg-[#1abc9c] '>
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
