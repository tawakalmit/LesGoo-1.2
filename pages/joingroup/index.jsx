import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';
import Navbarback from '../../components/navbarback';

export default function JoinGroup() {
  return (
    <div className='bg-[#ecf0f1] border-0 h-screen md:h-screen w-[425px] mx-auto border-2 border-[#2c3e50] pb-10'>
      <Navbarback title={'Join Group'} />
      <form className='w-10/12 mx-auto mt-5'>
        <input
          id='input-groupid'
          type='text'
          placeholder=' Enter Group ID'
          className='w-full bg-[#D9D9D9] h-14 rounded-xl'
        />
        <div className='flex justify-end'>
          <button
            id='btn-join'
            className='w-16 h-7 bg-[#1abc9c] rounded-full text-white mt-3'
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
}
