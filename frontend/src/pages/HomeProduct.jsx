import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';


const HomeProduct = ({ id, name, image, price, company }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/products/${id}`}>
      <div className="bg-white px-2 rounded-lg">
        <div className='overflow-hidden'>
          <img src={image[0]} className='w-[220px] h-[270px] hover:scale-110 transition ease-in-out object-cover' alt=''>
          </img>
          <p className="mt-2 text-md text-gray-500 font-semibold capitalize">{company}</p>
          <p className="text-sm tracking-wide first-letter:capitalize">{name}</p>
          <p className="text-black text-sm">{currency}{price}</p>
        </div>
      </div>
    </Link>
  )
}

export default HomeProduct
