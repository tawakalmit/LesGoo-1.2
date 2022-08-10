import React from 'react'
import Navbar from '../../components/navbar'
import Mygroup from '../../components/mygroup'
import { MdAddCircle } from 'react-icons/md'
import { BsPeopleFill } from 'react-icons/bs'

export default function Homepage() {
  return (
    <div>
        <Navbar />
        <h1 className='text-xl mt-5 font-bold text-center'>My Groups</h1>
        <div className='mt-5'>
            <Mygroup label='Road Trip Rinjani' />
            <Mygroup label='OTW Pelabuhan Ratu' />
        </div>
        <BsPeopleFill className='fixed bottom-5 left-7' size={40} color='#1abc9c' id='btn-joingroup' />
        <MdAddCircle className='fixed bottom-5 right-5' size={50} color='#1abc9c' id='btn-addgroup' />
    </div>
  )
}
