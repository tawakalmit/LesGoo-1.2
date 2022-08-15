import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { setCookie, getCookie } from 'cookies-next';
import Image from 'next/image';

export default function Login() {
  const [dataLogin, setDataLogin] = useState({ username: '', password: '' });

  const router = useRouter();
  const token = getCookie('usr_token');

  const handleChangeUserName = (e) => {
    setDataLogin((state) => ({ ...state, username: e.target.value }));
  };
  const handleChangePassword = (e) => {
    setDataLogin((state) => ({ ...state, password: e.target.value }));
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataLogin),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log(data.data.token);
        setCookie('usr_token', data.data.token);
        setCookie('usr_username', dataLogin.username);
        router.push('/');
      } else if (response.status >= 300) {
        throw data.message;
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  if (token) {
    router.replace('/');
  }

  return (
    <>
      <div className='w-full h-auto mt-20 flex justify-center'>
      <Image 
        src='/logo.png'
        width={200}
        height={70}
        />
      </div>
      <p className='text-base text-center font-semibold text-slate-500'>
        Make your roadtrip easier
      </p>
      <h3 className='text-4xl font-semibold text-center mt-20'>Sign In</h3>
      <form onSubmit={handleSubmitSignIn} className='mt-12 mx-auto w-8/12 mb-20'>
        <div>
          <label className='ml-2 font-semibold text-gray-700'>USER NAME</label>
          <input
            id='input-username'
            type='text'
            required
            onChange={handleChangeUserName}
            placeholder='Username'
            className='w-full mx-auto p-1 mt-1 mb-5 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
          />
        </div>
        <div>
          <label className='ml-2 font-semibold text-gray-700'>PASSWORD</label>
          <input
            id='input-password'
            type='Password'
            required
            onChange={handleChangePassword}
            placeholder='Password'
            className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
          />
        </div>
        <div className='flex justify-between text-sm mt-1'>
          <span className='text-slate-600'>Not registered?</span>
          <Link href='/register'>
            <span className='text-green-400 active:text-green-600'>
              Create an account
            </span>
          </Link>
        </div>
        <button
          id='btn-signin'
          type='submit'
          className='mt-10 block mx-auto px-5 py-2 rounded-full text-white font-semibold bg-green-400 hover:bg-green-500 active:bg-green-600'
        >
          Sign In
        </button>
      </form>
    </>
  );
}
