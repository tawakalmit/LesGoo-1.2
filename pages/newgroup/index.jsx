import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import "leaflet/dist/leaflet.css"

import { MdArrowBack } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

export default function Newgroup() {
    const Map = dynamic(() => import('../../components/map'), {
        ssr: false
      });
    const route = useRouter();
  return (
    <div>
        <div className='w-full h-12 bg-[#1abc9c] flex items-center'>
            <MdArrowBack id='back-to-home' className='absolute left-5' size={25} color='white' onClick={() => {route.push('/')}} />
            <h1 className='text-white text-xl mx-auto'>New Group</h1>
        </div>
        <form>
            <div className='w-full h-32 bg-white'>
                <div className='w-10/12 mx-auto flex justify-around'>
                    <CgProfile id='input-groupimage' size={60} color='#2c3e50' className='mt-5' />
                    <input id='input-groupname' type="text" placeholder=' type group subject' className='mt-5 w-9/12 rounded-xl bg-[#d9d9d9]' />
                </div>
                <p className='text-xs text-center mt-3 opacity-50'>Provide a group subject and optional group icon</p>
            </div>
            <div className='w-full mt-10 h-32 bg-white flex flex-col items-center'>
                <textarea id='input-groupdes' name="description" placeholder=' add group description' cols="30" rows="10" className='rounded-xl mt-5 h-24 bg-[#d9d9d9] w-10/12' ></textarea>
            </div>
            <div className='w-full mt-10 h-32 bg-white'>
                <h2 className='p-3'>Set Destination</h2>
                <Map />
            </div>
            <div className='w-full flex justify-end mt-10'>
                <BsFillArrowRightCircleFill id='btn-newgroup' size={40} color='#1abc9c' className='mr-5'/>
            </div>
        </form>
    </div>
  )
}
