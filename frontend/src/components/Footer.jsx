import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt=''>
                </img>
                <p className='w-full  md:w-2/3 text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur eius optio illo, modi quia ullam temporibus dolores harum ipsum voluptatem cumque delectus, fugiat, odit nobis sequi asperiores reiciendis ad ratione?</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-mediun mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 7995906671</li>
                    <li>contact@foreveryou.com</li>
                </ul>
            </div>
            <div>
                <hr></hr>
                <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Rights Reserved.</p>
            </div>

        </div>
    </div>
  )
}

export default Footer