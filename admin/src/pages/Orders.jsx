import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import {backendUrl,currency} from "../App"

import {toast} from "react-toastify"
import { assets } from '../assets/assets'
import ScrolltoTop from '../components/ScrolltoTop'

const Orders = ({token}) => {
  const [orders,setOrders] = useState([])

  let packed = 0
  let ordersConfirmed = 0
  let shipped = 0
  let outforDelivery = 0
  let delivered = 0
  for(let i = 0;i<orders.length;i++){
    if(orders[i].status === "Packing"){
      packed++;
    }
    else if(orders[i].status === "Shipped"){
      shipped++
    }
    else if(orders[i].status === "Out for delivery"){
      outforDelivery++;
    }
    else if(orders[i].status === "Delivered"){
      delivered++;
    }
    else{ordersConfirmed++;}
  }

  const pending = orders.length-delivered

  const fetchAllOrders = async()=>{

    if(!token){
      return  null;
    }

    try {
      
      const response = await axios.post(backendUrl+"/api/order/list",{},{headers:{token}})
      if(response.data.success){
        setOrders(response.data.orders)
      }
      else{
        toast.error(response.data.message)
      }
      

    } catch (error) {
      
    }
  }

  const statusHandler = async(event,orderId)=>{
    try {
      
      const response = await axios.post(backendUrl+"/api/order/status",{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
      }

    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[token])
  return (
    <div>
      <h3 className='font-semibold'>Order Page</h3>
      <div className='lg:flex grid grid-cols-3 gap-x-2 justify-between'>
      <p className='lg:text-md text-[14px]'>Total Orders:{orders.length}</p>
      <p className='lg:text-md text-[14px]'>Orders Packed:{packed}</p>
      <p className='lg:text-md text-[14px]'>Orders Shipped:{shipped}</p>
      <p className='lg:text-md text-[14px] text-nowrap'>Out for Delivery:{outforDelivery}</p>
      <p className='lg:text-md text-[14px]'>Delivered:{delivered}</p>
      <p className='lg:text-md text-[14px]'>Pending:{pending}</p>
      </div>
      <div>
        {
          orders.map((order,index)=>(
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
              <img className='w-12' src={assets.parcel_icon} alt=''></img>
              <div>
              <div>
                {order.items.map((item,index)=>{
                  if(index === order.items.length-1){
                    return <p className='py-0.5 text-md font-semibold' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                  }
                  else{
                    return <p className='py-0.5 text-md font-semibold' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                  }
                })}
              </div>
              <p className='mt-3 mb-2 font-medium'>
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px] font-semibold'>Items : {order.items.length}</p>
              <p className='mt-3'>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleString()}</p>
            </div>
            <p className='text-sm sm:text-[15px] font-semibold'>{currency}{order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className={`p-2 font-semibold text-white ${order.status === "Order Placed" ? "bg-blue-500" : order.status === "Packing" ? "bg-orange-600" : order.status === "Shipped" ? "bg-purple-600" : order.status === "Out for delivery" ? "bg-teal-500" : order.status === "Delivered" ? "bg-green-600" :""}`}>
              <option className='bg-gray-400' value="Order Placed">Order Placed</option>
              <option className='bg-gray-400' value="Packing">Packing</option>
              <option className='bg-gray-400' value="Shipped">Shipped</option>
              <option className='bg-gray-400' value="Out for delivery">Out for delivery</option>
              <option className='bg-gray-400' value="Delivered">Delivered</option>
            </select>
            </div>
          ))
        }
      </div>
      <ScrolltoTop/>
    </div>
  )
}

export default Orders