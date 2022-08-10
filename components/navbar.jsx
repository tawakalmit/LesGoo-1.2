import React from 'react'
import { AiFillHome, AiFillSetting } from 'react-icons/ai'

export default function Navbar() {
  return (
    <div className='w-full h-16 bg-[#1abc9c]'>
        <div className='mx-auto h-16 items-center w-11/12 flex justify-between'>
            <AiFillHome size={40} color='white' id='btn-home' />
            <AiFillSetting size={40} color='white' id='btn-setting' />
        </div>
    </div>
  )
}
