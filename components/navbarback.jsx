import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MdArrowBack } from 'react-icons/md';

export default function Navbarback(props) {
  const router = useRouter();

  return (
    <div className='w-full top-0 h-16 bg-[#1abc9c]'>
      <div className='mx-auto h-16 items-center w-11/12 flex justify-between text-center'>
        <div>
          <MdArrowBack
            id='back-to-home'
            className=' left-5 cursor-pointer'
            size={25}
            color='white'
            onClick={() => {
              router.push('/');
            }}
          />
        </div>
        <div className='text-white text-xl font-semibold'> {props.title} </div>
        <div></div>
      </div>
    </div>
  );
}
