import React from 'react'

export default function Mygroup({label}) {
  return (
    <div id='group-item' className='w-10/12 bg-[#1abc9c] rounded-xl mx-auto mt-3'>
        <h2 className='text-white p-1 px-5'>{label}</h2>
    </div>
  )
}
