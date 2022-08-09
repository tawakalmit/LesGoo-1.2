import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { HiDotsVertical } from 'react-icons/hi'
import { AiFillPicture } from 'react-icons/ai'

export default function Head({groupname, groupid, participants }) {
  return (
    <div className='bg-[#1abc9c] w-full h-fit'>
      <div className='w-11/12 mx-auto justify-between pt-5 flex'>
        <MdArrowBack size={25} color='white' />
        <HiDotsVertical size={25} color='white'/>
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
