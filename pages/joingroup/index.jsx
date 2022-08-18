import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';
import Navbarback from '../../components/navbarback';
import { getCookie } from 'cookies-next';

export default function JoinGroup() {
  const [join, setJoin] = useState({
    group_id: '',
    latitude: '',
    longitude: '',
  });

  const token = getCookie('usr_token');

  const router = useRouter();

  const handleChangeGroupId = (e) => {
    setRegister((state) => ({ ...state, group_id: e.target.value }));
  };

  const handleSubmitSignIn = async (e) => {
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
      } else if (response.status >= 300) {
        throw data.message;
      }
    } catch (error) {
      console.log('error:', error);
      alert(error);
    }
  };

  return (
    <>
      <Navbarback title={'Join Group'} />
      <form onSubmit={handleJoin} className='w-10/12 mx-auto mt-5'>
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
    </>
  );
}
