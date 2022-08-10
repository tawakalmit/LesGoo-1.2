import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';

export default function Editprofile() {
  return (
    <>
      <div>
        <div className='w-full h-12 bg-[#1abc9c] flex items-center'>
          <Link href='/profile'><MdArrowBack id='back-to-profile' className='absolute left-5' size={25} color='white' /></Link>
          <h1 className='text-white text-xl mx-auto'>Profile</h1>
        </div>
        <div className='w-10/12 flex flex-col mx-auto items-center'>
          <CgProfile id='edit-image' color='#2c3e50' size={70} className='mt-10' />
          <form className='mt-12 mx-auto w-8/12'>
            <div className='mb-5'>
              <label className='ml-2 font-semibold text-gray-700'>
                USER NAME
              </label>
              <input
                id='edit-username'
                type='text'
                placeholder='Joko'
                className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
              />
            </div>
            <div className='mb-5'>
              <label className='ml-2 font-semibold text-gray-700'>EMAIL</label>
              <input
                id='edit-email'
                type='email'
                placeholder='joko@lesgoo.com'
                className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
              />
            </div>
            <div className='mb-5'>
              <label className='ml-2 font-semibold text-gray-700'>PHONE</label>
              <input
                id='edit-phone'
                type='number'
                placeholder='0123456789'
                className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
              />
            </div>
            <button id='btn-savehanges' className='my-10 block mx-auto px-5 py-2 -mb-6 rounded-full text-white font-semibold bg-green-400 hover:bg-green-500 active:bg-green-600'>
              Save Changes
            </button>
            <button
              id='btn-delacc'
              className='my-10 block mx-auto px-5 py-2 rounded-full text-white font-semibold bg-red-400
             hover:bg-red-500 active:bg-red-600'
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
