import React, { useEffect, useState } from 'react'
import axios from "axios"
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import ScrolltoTop from '../components/ScrolltoTop'

const Womens = ({token}) => {

    const [list,setList] = useState([])

    const fetchList = async()=>{
        try{
            const response = await axios.get(backendUrl+"/api/product/list")
            if(response.data.success){
            setList(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }

    }

    const removeProduct = async(id)=>{
        try{
            const response = await axios.post(backendUrl+"/api/product/remove",{id},{headers:{token}})
            if(response.data.success){
                toast.success(response.data.message)
                await fetchList();
            }
            else{
                toast.error(response.data.message)
            }
        }
        catch(error){
            
        }
    }
    const WomensList = list.filter(item=>item.category.includes("Women"))

    useEffect(()=>{
        fetchList()
    },[])
  return (
    <div className='sm:w-full w-full overflow-x-hidden lg:ml-44 ml-20 mt-12'>
    <div className='flex flex-row justify-between mb-2'>
        <p>All Products</p>
        <p>Items: {WomensList.length}</p>
    </div>
    <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
        </div>
        {
            WomensList.map((item,index)=>(
                <div className='grid grid-cols-[0.2fr_1fr] sm:grid-cols-[1fr_3.1fr_1.1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm product-item ${highlightedId === item._id ? "highlight" : ""}' key={index}>
                    <img className='w-13 sm:w-12' src={item.image[0]} alt=''></img>
                    <p className='break-all text-[13px] sm:text-md'>{item.name}</p>
                    <p>{currency}{item.price}</p>
                    <p className='flex text-right lg:ml-0 ml-40 lg:justify-center gap-2 md:text-center cursor-pointer text-lg w-full'>
                        <img className='lg:w-5 w-4 lg:h-5 h-4' onClick={()=>removeProduct(item._id)} src="https://img.icons8.com/material-rounded/24/trash.png" alt="trash"/>
                        <Link to={`/edititem/${item._id}`}>
                        <img className='lg:w-5 w-4 lg:h-5 h-4' src="https://img.icons8.com/ios-glyphs/24/edit--v1.png" alt="edit--v1"/>
                        </Link>
                        </p>
                    </div>
            ))
        }
    </div>
    <ScrolltoTop/>
    </div>
  )
}

export default Womens