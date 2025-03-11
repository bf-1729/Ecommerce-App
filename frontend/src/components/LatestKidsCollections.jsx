import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import HomeProduct from '../pages/HomeProduct';

const LatestKidsCollection = () => {
    const {products,KidsProducts} = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(KidsProducts.slice(0,10))
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'KIDSCOLLECTION'}/>
            <p className='w-3/4 m-auto text-sm sm:text-sm md:text-base text-gray-600'>
            We bring you the freshest designs straight from the trendsetters. Upgrade your fashion game today.</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 lg:p-0 p-2'>
            {
                latestProducts.map((item,index)=>(
                    <HomeProduct key={index} id={item._id} image={item.image} name={item.name} company={item.company} price={item.price}/>
                ))
            }
        </div>
        
    </div>
  )
}

export default LatestKidsCollection