import React from 'react';
import Link from 'next/link';

export default function register() {
  return (
    <>
      <h1 className='text-4xl font-semibold text-center mt-44'>Register</h1>
      <form className='mt-12 mx-auto w-8/12'>
        <div className='mb-5'>
          <label className='ml-2 font-semibold text-gray-700'>USER NAME</label>
          <input
            type='text'
            placeholder='Joko'
            className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
          />
        </div>
        <div className='mb-5'>
          <label className='ml-2 font-semibold text-gray-700'>EMAIL</label>
          <input
            type='email'
            placeholder='joko@lesgoo.com'
            className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
          />
        </div>
        <div className='mb-5'>
          <label className='ml-2 font-semibold text-gray-700'>Phone</label>
          <input
            type='number'
            placeholder='0123456789'
            className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
          />
        </div>
        <div className='mb-5'>
          <label className='ml-2 font-semibold text-gray-700'>PASSWORD</label>
          <input
            type='Password'
            placeholder='Passwo**'
            className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
          />
        </div>

        <div className='flex items-center'>
          <input
            id='link-checkbox'
            type='checkbox'
            value=''
            required
            className='w-4 h-4 bg-gray-100 rounded border-gray-300'
          />
          <label
            htmlFor='link-checkbox'
            className='ml-2 text-sm font-medium text-gray-700'
          >
            I agree with the
            <span
              href='#'
              className='text-green-400 hover:underline cursor-pointer ml-1'
            >
              terms and conditions
            </span>
            .
          </label>
        </div>

        <button className='my-10 block mx-auto px-5 py-2 rounded-full text-white font-semibold bg-green-400 hover:bg-green-500 active:bg-green-600'>
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
    </>
  );
}
