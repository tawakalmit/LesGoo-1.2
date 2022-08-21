import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { GiHamburgerMenu } from 'react-icons/gi';
import { Menu } from '@headlessui/react';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';

import { getCookie, deleteCookie } from 'cookies-next';
import localforage from 'localforage';

export default function Navbar(props) {
  const router = useRouter();

  const token = getCookie('usr_token');
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
        deleteCookie('usr_username');
        localforage.clear();
        router.push('/login');
      } else if (response.status >= 300) {
        throw data.message;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='w-full top-0 h-16 bg-[#1abc9c]'>
      <div className='mx-auto h-16 items-center w-11/12 flex justify-between'>
        <Image src='/logo.png' width={130} height={40} />
        <div className='text-white text-xl font-semibold'> {props.title} </div>
        <div>
          <Menu>
            <Menu.Button>
              <GiHamburgerMenu size={30} color='white' id='btn-burger' />
            </Menu.Button>
            <Menu.Items className='absolute right-0 top-16 w-32 bg-[#1abc9c] z-50 md:relative'>
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <Link id='btn-profile' href='/profile'>
                      <div className='ml-2 p-2 flex justify-start items-center mx-auto  cursor-pointer'>
                        <CgProfile size={20} color='white' />
                        <p className='ml-3 text-white'>Profile</p>
                      </div>
                    </Link>

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
