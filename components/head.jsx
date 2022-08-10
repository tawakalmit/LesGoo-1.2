import React from 'react'
import { Menu } from '@headlessui/react'
import Link from 'next/link'

import { MdArrowBack } from 'react-icons/md'
import { HiDotsVertical } from 'react-icons/hi'
import { AiFillPicture, AiFillDelete } from 'react-icons/ai'

export default function Head({groupname, groupid, participants }) {
  return (
    <div className='bg-[#1abc9c] w-full h-fit'>
      <div className='w-11/12 mx-auto justify-between pt-5 flex'>
        <Link href='/'><MdArrowBack id='back-to-home' size={25} color='white' /></Link>
        <div>
            <Menu>
              <Menu.Button><HiDotsVertical id='des-option' size={25} color='white'/></Menu.Button>
              <Menu.Items className='absolute right-4 top-14 w-40 bg-[#ecf0f1]'>
                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <Link href='/'>
                      <div className='p-2 flex justify-center items-center mx-auto'>
                        <AiFillDelete size={20} color='black' />
                        <p className='ml-3 text-black'>Delete Group</p>
                      </div>
                      </Link>
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
