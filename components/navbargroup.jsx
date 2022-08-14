import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { Menu } from '@headlessui/react';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';

import { getCookie, deleteCookie } from 'cookies-next';

export default function Navbargroup() {
  const router = useRouter();

  const token = getCookie('usr_token');

  const handleClickLeaveGroup = () => {
    var leave = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        group_id: null,
      }),
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leave`, leave)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        router.push('/');
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally();
  };

  const handleClickLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`,
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log('logout success');
        deleteCookie('usr_token');
        router.push('/login');
      } else if (response.status >= 300) {
        throw data.message;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='stiky w-full h-16 bg-[#1abc9c]'>
      <div className='mx-auto h-16 items-center w-11/12 flex justify-between '>
        <HiUserGroup
          className='cursor-pointer'
          size={40}
          color='white'
          id='btn-home'
        />
        <div>
          <Menu>
            <Menu.Button>
              <AiFillSetting size={40} color='white' id='btn-burger' />
            </Menu.Button>
            <Menu.Items className='absolute right-0 shadow-lg top-16 w-40 bg-[#1abc9c]'>
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <Link id='btn-profile' href='/profile'>
                      <div className='ml-2 p-2 flex justify-start items-center cursor-pointer'>
                        <CgProfile size={20} color='white' />
                        <p className='ml-3 text-white'>Profile</p>
                      </div>
                    </Link>

                    <div
                      id='btn-leavegroup'
                      onClick={handleClickLeaveGroup}
                      className='ml-2 p-2 flex justify-start items-center cursor-pointer'
                    >
                      <MdLogout size={20} color='white' />
                      <p className='ml-3 text-white'>Leave Group</p>
                    </div>

                    <div
                      id='btn-logout'
                      onClick={handleClickLogOut}
                      className='ml-2 p-2 flex justify-start items-center cursor-pointer'
                    >
                      <MdLogout size={20} color='white' />
                      <p className='ml-3 text-white'>Log out</p>
                    </div>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  );
}
