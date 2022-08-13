import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import Navbarback from '../../components/navbarback';

export default function Editprofile() {
  const route = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    var requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    fetch(
      'https://virtserver.swaggerhub.com/faqihassyfa/LesGoo/1.0.0/users',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        const { id, username, email, phone } = data;
        setUsername(username);
        setEmail(email);
        setPhone(phone);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { username, email, phone };

    let requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: { 'Content-Type': 'application/json' },
      },
      body: JSON.stringify(body),
    };

    fetch(
      `https://virtserver.swaggerhub.com/faqihassyfa/LesGoo/1.0.0/users`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const { message } = result;
        route.push(`/profile`);
        alert(message);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally();
  };

  const handleDelete = () => {
    var requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: { 'Content-Type': 'application/json' },
      },
    };

    fetch(
      'https://virtserver.swaggerhub.com/faqihassyfa/LesGoo/1.0.0/users',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const { message, code } = result;
        if (code === 200) {
          alert(message);
          route.push('/login');
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Navbarback title={'Edit Profile'} />
      <div className='w-10/12 flex flex-col mx-auto items-center'>
        <CgProfile
          id='edit-image'
          color='#2c3e50'
          size={70}
          className='mt-10'
        />
        <form
          className='mt-12 mx-auto w-8/12'
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className='mb-5'>
            <label className='ml-2 font-semibold text-gray-700'>
              USER NAME
            </label>
            <input
              id='edit-username'
              type='text'
              placeholder={username}
              className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-5'>
            <label className='ml-2 font-semibold text-gray-700'>EMAIL</label>
            <input
              id='edit-email'
              type='email'
              placeholder={email}
              className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-5'>
            <label className='ml-2 font-semibold text-gray-700'>PHONE</label>
            <input
              id='edit-phone'
              type='number'
              placeholder={phone}
              className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button
            id='btn-savehanges'
            className='my-10 block mx-auto px-5 py-2 -mb-6 rounded-full text-white font-semibold bg-green-400 hover:bg-green-500 active:bg-green-600'
          >
            Save Changes
          </button>
        </form>
        <button
          id='btn-delacc'
          className='my-10 block mx-auto px-5 py-2 rounded-full text-white font-semibold bg-red-400
          hover:bg-red-500 active:bg-red-600'
          onClick={() => handleDelete()}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
