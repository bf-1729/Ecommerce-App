import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ShopContext } from './ShopContext';
import { assets } from '../assets/assets';

const SearchBar = () => {
  const { search, setSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false)
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection") || location.pathname.includes("womenswear") || location.pathname.includes("kidswear")) {
      setVisible(true);

    }
    else {
      setVisible(false)
    }
  }, [location])

  return (
    <div className='w-full bg-gray-100 pb-4 pt-0.5 px-2'>
      <div className='flex items-center mx-auto border border-slate-400 px-2 lg:w-[500px] w-76 rounded-3xl bg-white mt-4 lg:py-0.5'>
        <img src={assets.search_icon} className='w-9 cursor-pointer border-r-2 py-2 border-gray-400 px-2' alt=''></img>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-80 outline-none px-4'
          type='text'
          placeholder='Search...'
        />
      </div>
    </div>

  )
}

export default SearchBar