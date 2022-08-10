import React from 'react'
import Link from 'next/link'

import { AiFillHome, AiFillSetting } from 'react-icons/ai'
import { Menu } from '@headlessui/react'
import { CgProfile } from 'react-icons/cg'
import { MdLogout } from 'react-icons/md'

export default function Navbar() {
  return (
    <div className='w-full h-16 bg-[#1abc9c]'>
        <div className='mx-auto h-16 items-center w-11/12 flex justify-between'>
            <AiFillHome size={40} color='white' id='btn-home' />
            <div>
            <Menu>
              <Menu.Button><AiFillSetting size={40} color='white' id='btn-setting' /></Menu.Button>
              <Menu.Items className='absolute right-0 top-16 w-32 bg-[#1abc9c]'>
                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <Link href='/profile'>
                      <div className='p-2 flex justify-center items-center mx-auto'>
                        <CgProfile size={20} color='white' />
                        <p className='ml-3 text-white'>Profile</p>
                      </div>
                      </Link>

                      <Link href='/login'>
                      <div className='p-2 flex justify-center items-center mx-auto'>
                        <MdLogout size={20} color='white' />
                        <p className='ml-3 text-white'>Log out</p>
                      </div>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
            </div>
        </div>
    </div>
  )
}
