import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const {productId} = useParams();
  const {products,currency,addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false)
  const [image,setImage] = useState('')
  const [size,setSize] = useState('')

  const fetchProductData = async()=>{
    products.map((item)=>{
      if(item._id === productId){
        setImage(item.image[0])
        setProductData(item)
        return null;
      }
    })

  }

  useEffect(()=>{
    fetchProductData();
  },[productId,products])
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img src={item} key={index} onClick={()=>setImage(item)} className='w-[10%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'></img>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt=''></img>
          </div>
        </div>
      <div className='flex-1'>
        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} className='w-3 5' alt=''></img>
            <img src={assets.star_icon} className='w-3 5' alt=''></img>
            <img src={assets.star_icon} className='w-3 5' alt=''></img>
            <img src={assets.star_icon} className='w-3 5' alt=''></img>
            <img src={assets.star_dull_icon} className='w-3 5' alt=''></img>
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-1.8xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
      </div>
      </div>
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum neque qui quod sit voluptatem quam odit, dolores et dolore esse quasi veritatis illum voluptatibus ullam autem consectetur adipisci hic.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti voluptatem numquam provident dolore placeat hic perspiciatis vitae asperiores exercitationem nostrum impedit, blanditiis eveniet dolorem rerum et incidunt nulla! Reiciendis, sequi.</p>
        </div>
      </div>
      <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
      
    </div>
  ) : 
  <div className='opacity-0'></div>
}

export default Product