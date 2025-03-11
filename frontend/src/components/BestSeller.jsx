import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import HomeProduct from '../pages/HomeProduct';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([])

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestSeller))
        setBestSeller(bestProduct.slice(0,5))
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Discover the top-rated and most popular products loved by our customers. Don’t miss out on these must-haves!</p>

        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 lg:p-0 p-2'>
            {
                bestSeller.map((item,index)=>(
                    <HomeProduct key={index} id={item._id} name={item.name} company={item.company} image={item.image} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller