import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Register() {
  const [dataRegister, setRegister] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const router = useRouter();

  const handleChangeUserName = (e) => {
    setRegister((state) => ({ ...state, username: e.target.value }));
  };
  const handleChangeEmail = (e) => {
    setRegister((state) => ({ ...state, email: e.target.value }));
  };
  const handleChangePhone = (e) => {
    setRegister((state) => ({ ...state, phone: e.target.value }));
  };
  const handleChangePassword = (e) => {
    setRegister((state) => ({ ...state, password: e.target.value }));
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataRegister),
        }
      );
      const data = await response.json();
      if (response.status < 300) {
        console.log('ININI');
        router.push('/login');
      } else if (response.status >= 300) {
        throw data.message;
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  return (
    <div className='bg-[#ecf0f1] border-0 h-full md:w-[425px] mx-auto border-2 border-[#2c3e50] pb-10 xl:h-screen'>
      <h1 className='text-4xl font-semibold text-center pt-20'>Register</h1>
      <form onSubmit={handleSubmitSignUp} className='mt-12 mx-auto w-8/12'>
        <div className='mb-5'>
          <label className='ml-2 font-semibold text-gray-700'>USER NAME</label>
          <input
            id='inputReg-username'
            onChange={handleChangeUserName}
            type='text'
            placeholder='Joko'
            className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
          />
        </div>
        <div className='mb-5'>
          <label className='ml-2 font-semibold text-gray-700'>EMAIL</label>
          <input
            id='inputReg-email'
            onChange={handleChangeEmail}
            type='email'
            placeholder='joko@lesgoo.com'
            className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
          />
        </div>
        <div className='mb-5'>
          <label className='ml-2 font-semibold text-gray-700'>PHONE</label>
          <input
            id='inputReg-phone'
            onChange={handleChangePhone}
            type='number'
            placeholder='0123456789'
            className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
          />
        </div>
        <div className='mb-5'>
          <label className='ml-2 font-semibold text-gray-700'>PASSWORD</label>
          <input
            id='inputReg-password'
            onChange={handleChangePassword}
            type='Password'
            placeholder='Passwo**'
            className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
          />
        </div>
        <button
          id='btn-register'
          type='submit'
          className='my-7 block mx-auto px-5 py-2 rounded-full text-white font-semibold bg-green-400 hover:bg-green-500 active:bg-green-600'
        >
          Sign Up
        </button>
        <div className='flex justify-between text-sm'>
          <span className='text-slate-600'>Have an account?</span>
          <Link href='/login'>
            <span className='text-green-400 active:text-green-600'>
              Login now
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
