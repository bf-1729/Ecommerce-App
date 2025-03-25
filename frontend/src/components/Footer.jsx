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
                BuyEase is a seamless and user-friendly eCommerce platform designed to provide a hassle-free shopping experience. Whether you're looking for the latest fashion trends, or everyday essentials, BuyEase has it all in one place.</p>
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
                    <li>+91 1234567897</li>
                    <li>contact@buyease.com</li>
                </ul>
            </div>
            <div>
                <hr></hr>
                <p className='py-5 text-sm text-center'>Copyright 2024@buyease.com - All Rights Reserved.</p>
            </div>

        </div>
    </div>
  )
}

export default Footer