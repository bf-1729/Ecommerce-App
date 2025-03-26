import React from 'react'
import {assets} from "../assets/assets"

const Navbar = ({setToken}) => {
  return (
    <div className='fixed top-0 w-full flex items-center lg:py-3 py-3 px-[3%] justify-between bg-white border-b'>
      
      <a href='https://buyease-frontend.vercel.app'>
        <img className='lg:w-36 w-32 lg:h-8 h-7' src={assets.logo} alt=''></img>
        </a>
        
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm lg:mr-8 mr-2'>Logout</button>
    </div>
  )
}

export default Navbar