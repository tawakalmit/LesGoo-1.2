import React from 'react'
import Head from '../../components/head'
import Description from '../../components/description'
import Contact from '../../components/contact'


export default function GroupDetail() {
  return (
    <div className='bg-[#ecf0f1] border-0 h-full md:w-[425px] mx-auto border-2 border-[#2c3e50] pb-10 lg:min-h-screen xl:h-screen'>
        <Head
        groupname='Road Trip Rinjani'
        groupid='hhdbsbhkjv'
        participants='30'
        />

        <Description
        des='Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos tenetur alias cumque ipsam voluptas cupiditate, ut voluptatum exercitationem aperiam, odit suscipit laborum quasi neque impedit eius iusto modi reiciendis similique.'
        />

        <div className='h-fit w-full bg-[#d9d9d9] mt-10'>
          <h2 className='p-3'>Participants</h2>
          <div className='mt-5 pl-3'>
            <Contact name='Vito Corleone' />
            <Contact name='Freddo Corleone' />
            <Contact name='Sonny Corleone' />
            <Contact name='Michael Corleone' />
            <Contact name='Connie Corleone' />
          </div>
        </div>
    </div>
  )
}
