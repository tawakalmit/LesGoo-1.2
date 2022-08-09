import React from 'react'
import { CgProfile } from 'react-icons/cg'

export default function Contact({name}) {
  return (
    <div className='flex mb-2'>
      <CgProfile size={25} />
      <p className='ml-3'>{name}</p>
    </div>
  )
}
