import React, { useEffect, useState, useRef } from 'react';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import Navbarback from '../../components/navbarback';
import Head from 'next/head';
import { getCookie, deleteCookie } from 'cookies-next';
import Swal from 'sweetalert2';
import Image from 'next/image';

export default function Editprofile() {
  const inputRef = useRef(null);
  const route = useRouter();
  const [objSubmit, setObjSubmit] = useState({});
  const [id, setId] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [previewImg, setPreviewImg] = useState();
  const [loading, setLoading] = useState(false);
  const token = getCookie('usr_token');

  useEffect(() => {
    if (!token) {
      route.push('/login');
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    var requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users `, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        const { ID, Username, Email, Phone, ProfileImg } = data;
        setObjSubmit({
          Username,
          Email,
          Phone,
        });
        setImageFile(ProfileImg);
        setId(ID);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleChangeImg = (e) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setImageFile(e.target.files[0]);
    setPreviewImg(objectUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    formData.append('profileimg', imageFile);

    let requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users `, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const { message } = result;
        route.push(`/profile`);
        Swal.fire(message);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(console.log(formData));
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handleDelete = () => {
    var requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users `, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const { message, code } = result;
        if (code === 200) {
          Swal.fire(message);
          deleteCookie('usr_token');
          deleteCookie('usr_username');
          route.push('/login');
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className='bg-[#ecf0f1] border-0 h-full md:h-full w-[425px] mx-auto border-2 border-[#2c3e50] pb-10 lg:h-screen'>
      <Head>
        <title>LesGoo | Edit Profile</title>
        <link rel='icon' href='/icon.png' />
      </Head>
      <Navbarback title={'Edit Profile'} />
      <div className='w-10/12 flex flex-col mx-auto items-center'>
        <form
          className='mt-12 mx-auto w-8/12'
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className='flex flex-col mx-auto items-center mb-5'>
            {previewImg ? (
              <Image width={70} height={70} alt='image' src={previewImg} />
            ) : (
              <Image width={70} height={70} alt='image' src={imageFile} />
            )}
          </div>

          <div className='mb-5'>
            <label className='ml-2 font-semibold text-gray-700'>
              USER NAME
            </label>
            <input
              id='edit-username'
              type='text'
              value={objSubmit.Username}
              className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
              onChange={(e) => handleChange(e.target.value, 'Username')}
            />
          </div>
          <div className='mb-5'>
            <label className='ml-2 font-semibold text-gray-700'>EMAIL</label>
            <input
              id='edit-email'
              type='email'
              value={objSubmit.Email}
              className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
              onChange={(e) => handleChange(e.target.value, 'Email')}
            />
          </div>
          <div className='mb-5'>
            <label className='ml-2 font-semibold text-gray-700'>PHONE</label>
            <input
              id='edit-phone'
              type='number'
              value={objSubmit.Phone}
              className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400'
              onChange={(e) => handleChange(e.target.value, 'Phone')}
            />
          </div>

          <div className='mb-5'>
            <label className='ml-2 font-semibold text-black'>
              Profile Image
            </label>
            <input
              id='edit-profileimg'
              type='file'
              className='w-full mx-auto p-1 mt-1 rounded-lg pl-2 border-2 font-semibold text-slate-700 border-slate-500 shadow-sm placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 file:border-green-600 file:rounded-3xl'
              onChange={handleChangeImg}
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
