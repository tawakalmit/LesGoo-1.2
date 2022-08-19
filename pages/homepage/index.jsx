import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Navbar from '../../components/navbar';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

export default function Homepage() {
  const route = useRouter();

  const group_id = getCookie('usr_group_id');
  const token = getCookie('usr_token');

  if (group_id) {
    route.push(`/group/${group_id}`);
  }

  if (!token) {
    route.push('/login');
  }

  return (
    <div>
      <Navbar />
      <div
        onClick={(e) => route.push('/newgroup')}
        className='flex items-center justify-center w-[330px] h-auto bg-[#1abc9c] mx-auto mt-5 rounded-lg cursor-pointer'
      >
        <div className='w-auto h-auto p-4 flex flex-col'>
          <Image src='/1.jpg' width={300} height={200} />
          <h1 className='text-center text-2xl mt-3 text-white'>New Group</h1>
        </div>
      </div>
      <div
        onClick={(e) => route.push('/joingroup')}
        className='mb-20 flex items-center justify-center w-[330px] h-auto bg-[#1abc9c] mx-auto mt-5 rounded-lg cursor-pointer'
      >
        <div className='w-auto h-auto p-4 flex flex-col'>
          <Image src='/2.jpg' width={300} height={200} />
          <h1 className='text-center text-2xl mt-3 text-white'>Join Group</h1>
        </div>
      </div>
    </div>
  );
}
