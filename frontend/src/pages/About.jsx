import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t mt-20'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt=''></img>
        <div className='flex flex-col justify-center gap-6 ms:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, error eum! Qui sequi, sed consectetur mollitia praesentium et maiores autem placeat explicabo voluptate saepe fuga deserunt nobis dolor excepturi doloribus!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia placeat debitis dolor impedit odit numquam facere magnam fugit omnis unde iure illum maiores, doloremque totam dicta dolorum commodi velit nam!</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores mollitia iusto praesentium dolor dicta ad alias molestias, voluptate beatae culpa facilis laudantium deleniti at, maxime aperiam laborum ab quia quas.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni accusantium explicabo ducimus asperiores molestiae. Similique, dolores qui ipsam mollitia maxime dolorem commodi a velit, magnam sequi id optio, itaque expedita!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni accusantium explicabo ducimus asperiores molestiae. Similique, dolores qui ipsam mollitia maxime dolorem commodi a velit, magnam sequi id optio, itaque expedita!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni accusantium explicabo ducimus asperiores molestiae. Similique, dolores qui ipsam mollitia maxime dolorem commodi a velit, magnam sequi id optio, itaque expedita!</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About