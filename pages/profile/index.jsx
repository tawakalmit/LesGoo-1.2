import React, { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import Navbarback from '../../components/navbarback';
import Head from 'next/head';
import { getCookie } from 'cookies-next';
import Image from 'next/image';

export default function Profile() {
  const token = getCookie('usr_token');
  const route = useRouter();
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ProfileImg, setProfileImg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      route.push('login');
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users `,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        const { data } = result;
        const { ID, Username, Email, Phone, ProfileImg } = data;
        setId(ID);
        setUsername(Username);
        setEmail(Email);
        setPhone(Phone);
        setProfileImg(ProfileImg);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(ProfileImg)

  return (
    <div className='bg-[#ecf0f1] border-0 h-screen md:h-screen w-[425px] mx-auto border-2 border-[#2c3e50] pb-10'>
      <Head>
        <title>LesGoo | Profile</title>
        <link rel='icon' href='/icon.png' />
      </Head>
      <Navbarback title={'Profile'} />
      <div>
        <div className='w-10/12 flex flex-col mx-auto items-center'>
          <Image width={200} height={200} alt='image' src={"/user.png"} />
          <h1 className='text-xl mt-3'>{username}</h1>
          <div className='w-11/12 mx-auto justify-between flex mt-10'>
            <h2 className='text-lg font-regular'>EMAIL</h2>
            <p className=''>{email}</p>
          </div>
          <div className='w-11/12 mx-auto justify-between flex'>
            <h2 className='text-lg font-regular'>PHONE</h2>
            <p className=''>{phone}</p>
          </div>
        </div>
        <div className='w-full flex mt-5'>
          <button
            id='btn-editprofile'
            className='p-2 text-xs mx-auto rounded-full text-white bg-[#3498db]'
            onClick={() => {
              route.push('/editprofile');
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
