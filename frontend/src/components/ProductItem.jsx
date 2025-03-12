import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, company, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer px-1' to={`/products/${id}`}>

      <div className="rounded-lg">
        <div className='overflow-hidden'>
          <img src={image[0]} className='hover:scale-110 transition ease-in-out lg:w-[240px] w-[233px] h-[260px] lg:h-[280px] object-cover' alt=''>
          </img>
        </div>
        <p className="mt-2 text-md text-gray-500 font-semibold capitalize">{company}</p>
        <p className="text-sm tracking-wide first-letter:capitalize">{name}</p>
        <p className="text-gray-600">{currency}{price}</p>
      </div>
    </Link>
  )
}

export default ProductItem
