import React from 'react';
import { useState } from 'react';
import Navbarback from '../../components/navbarback';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function JoinGroup() {
  const [join, setJoin] = useState({
    group_id: '',
    latitude: '',
    longitude: '',
  });

  const token = getCookie('usr_token');

  const router = useRouter();

  const handleChangeGroupId = (e) => {
    setJoin((state) => ({ ...state, group_id: e.target.value }));
  };

  const handleSubmitJoin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/join`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(join),
        }
      );
      const data = await response.json();
      if (response.status < 300) {
        router.push(`/group/${join.group_id}`);
      } else if (response.status >= 300) {
        throw data.message;
      }
    } catch (error) {
      console.log('error:', error);
      alert(error);
    }
  };

  return (
    <div className='bg-[#ecf0f1] border-0 h-screen md:h-screen w-[425px] mx-auto border-2 border-[#2c3e50] pb-10'>
      <Head>
      <title>LesGoo | Join Group</title>
      </Head>
      <Navbarback title={'Join Group'} />
      <form onSubmit={handleSubmitJoin} className='w-10/12 mx-auto mt-5'>
        <input
          onChange={handleChangeGroupId}
          id='input-groupid'
          type='text'
          placeholder=' Enter Group ID'
          className='w-full bg-[#D9D9D9] h-14 rounded-xl'
        />
        <div className='flex justify-end'>
          <button
            type='submit'
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
