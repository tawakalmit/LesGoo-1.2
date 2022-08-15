import React from 'react'
import { Menu } from '@headlessui/react'
import Link from 'next/link'

import { MdArrowBack } from 'react-icons/md'
import { AiFillPicture, AiFillDelete } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { MdLogout } from 'react-icons/md'
import { RiDeleteBin6Fill, RiLogoutCircleRFill } from 'react-icons/ri'

export default function Head({groupname, groupid, participants }) {

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
    <div className='bg-[#1abc9c] w-full h-fit'>
      <div className='w-11/12 mx-auto justify-between pt-5 flex'>
        <Link href='/'><MdArrowBack id='back-to-home' size={25} color='white' /></Link>
        <div>
            <Menu>
              <Menu.Button><GiHamburgerMenu id='des-option' size={25} color='white'/></Menu.Button>
              <Menu.Items className='absolute right-0 top-14 w-40 bg-[#f1c40f] z-10'>
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
                      <RiLogoutCircleRFill size={20} color='white' />
                      <p className='ml-3 text-white'>Leave Group</p>
                    </div>

                    <div
                      id='btn-deletegroup'
                      className='ml-2 p-2 flex justify-start items-center cursor-pointer'
                    >
                      <RiDeleteBin6Fill size={20} color='white' />
                      <p className='ml-3 text-white'>Delete Group</p>
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
      <div className='flex flex-col items-center pb-2'>
        <AiFillPicture size={100} />
        <h1 className='text-white text-2xl'>{groupname}</h1>
        <h2 className='text-white opacity-70'>Group ID : {groupid}</h2>
        <p className='text-white text-xs'>{participants} participants</p>
      </div>
    </div>
  )
}
