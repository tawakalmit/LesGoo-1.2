import React from 'react';
import Link from 'next/link';

export default function login() {
  return (
    <>
      <h1 className='text-6xl text-center mt-48'>LesGoo</h1>
      <p className='text-base text-center font-semibold text-slate-500'>
        Make your roadtrip easier
      </p>
      <h3 className='text-4xl font-semibold text-center mt-20'>Sign In</h3>
      <form className='mt-12 mx-auto w-8/12'>
        <div>
          <label className='ml-2 font-semibold text-gray-700'>USER NAME</label>
          <input
            type='text'
            placeholder='Username'
            className='w-full mx-auto p-1 mt-1 mb-5 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
          />
        </div>
        <div>
          <label className='ml-2 font-semibold text-gray-700'>PASSWORD</label>
          <input
            type='Password'
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
        <button className='mt-10 block mx-auto px-5 py-2 rounded-full text-white font-semibold bg-green-400 hover:bg-green-500 active:bg-green-600'>
          Sign In
        </button>
      </form>
    </>
  );
}
