import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-8 border-t mt-20'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-4 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[410px]' alt=''></img>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>123 Commerce Avenue,<br/>Tech Park, Hyderabad,<br/>Telangana,India</p>
          <p className='text-gray-500'>Phone : 7995906671<br/>Email:admin@buyease.com<br/></p>
          <p className='font-semibold text-xl text-gray-600'>Careers at BuyEase</p>
          <p className='text-gray-500'>Learn more about ourvteams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact