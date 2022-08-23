import React from 'react';
import { Menu } from '@headlessui/react';
import Link from 'next/link';

import { MdArrowBack } from 'react-icons/md';
import { AiFillPicture, AiFillDelete } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import { RiDeleteBin6Fill, RiLogoutCircleRFill } from 'react-icons/ri';
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import localforage from 'localforage';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

export default function Deshead({
  groupname,
  groupid,
  participants,
  group_img,
}) {
  const token = getCookie('usr_token');
  const group_id = getCookie('usr_group_id');
  const router = useRouter();
  const dispatch = useDispatch;

  const handleClickLeaveGroup = () => {
    var leave = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group_id: group_id }),
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/group/leave`, leave)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        deleteCookie('usr_group_id');
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

  const handleClickDeleteGroup = async () => {
    Swal.fire({
      title: 'Do you want to delete your group?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'yes!',
      denyButtonText: `NO!`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/${group_id}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          const data = await response.json();
          if (response.status < 300) {
            deleteCookie('usr_group_id');
            Swal.fire('Deleted!', '', 'success');
            router.push('/');
          } else if (response.status >= 300) {
            alert('You are not a group owner');
            throw data.message;
          }
        } catch (error) {
          // console.error('Error:', error);
        }
      } else if (result.isDenied) {
        Swal.fire('canceled', '', 'info');
      }
    });
  };

  return (
    <div className='bg-[#1abc9c] w-full h-fit'>
      <div className='w-11/12 mx-auto justify-between pt-5 flex'>
        <Link href='/'>
          <MdArrowBack id='back-to-home' size={25} color='white' />
        </Link>
        <div>
          <Menu>
            <Menu.Button>
              <GiHamburgerMenu id='des-option' size={25} color='white' />
            </Menu.Button>
            <Menu.Items className='absolute right-0 top-14 w-40 bg-[#05B08E] z-10 md:right-48 lg:right-80 xl:inset-x-1/2 2xl:inset-x-1/2 shadow-sm rounded-md shadow-green-700'>
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
                      onClick={handleClickDeleteGroup}
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
        <Image width={150} height={150} alt='image' src={group_img} />
        <h1 className='text-white text-2xl my-2'>{groupname}</h1>
        <h2 className='text-white opacity-70 mb-2'>Group ID : {groupid}</h2>
        <p className='text-white text-xs mb-2'>{participants} participants</p>
      </div>
    </div>
  );
}
