import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setImage(item.image[0])
        setProductData(item)
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  const allSizes = ["XS","S", "M", "L", "XL", "XXL","XXXL"];
  return productData ? (
    <div className='border-t-2 mt-20 pt-4 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img src={item} key={index} onClick={() => setImage(item)} className='w-[10%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'></img>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt=''></img>
          </div>
        </div>
        <div className='flex-1'>

          <h1 className='text-xl mt-2 capitalize'>{productData.name}</h1>
          <h1 className='text-lg font-semibold text-gray-400 capitalize'>{productData.company}</h1>
          
          <p className='mt-4 text-2xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-4 text-gray-500'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className="flex gap-2">
              {allSizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => item !== size && setSize(item)}
                  disabled={!productData.sizes.includes(item)} // Disable unavailable sizes
                  className={`border py-1 px-3 bg-gray-100 
          ${item === size ? "bg-gray-800 text-white" : ""} 
          ${!productData.sizes.includes(item) ? "opacity-50 cursor-not-allowed" : ""}`} // Styling for disabled sizes
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
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
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) :
    <div className='opacity-0'></div>
}

export default Product