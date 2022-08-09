import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

export default function Profile() {
  return (
    <div>
        <div className='w-full h-12 bg-[#1abc9c] flex items-center'>
            <MdArrowBack className='absolute left-5' size={25} color='white' />
            <h1 className='text-white text-xl mx-auto'>Profile</h1>
        </div>
        <div className='w-10/12 flex flex-col mx-auto items-center'>
            <CgProfile color='#2c3e50' size={70} className='mt-5' />
            <h1 className='text-xl mt-3'>Joko</h1>
            <div className='w-11/12 mx-auto justify-between flex mt-10'>
                <h2 className='text-lg font-regular'>EMAIL</h2>
                <p className=''>Joko@gmail.com</p>
            </div>
            <div className='w-11/12 mx-auto justify-between flex'>
                <h2 className='text-lg font-regular'>PHONE</h2>
                <p className=''>0878 9048 8346</p>
            </div>
        </div>
        <div className='w-full flex mt-5'>
            <button className='p-2 text-xs mx-auto rounded-full text-white bg-[#3498db]'>Edit Profile</button>
        </div>
    </div>
  )
}
