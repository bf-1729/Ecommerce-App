import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './pages/Add'
import Mens from './pages/Mens'
import Orders from './pages/Orders'
import Login from './components/Login'
import Womens from './pages/Womens'
import Kids from './pages/Kids'
import EditPizza from './pages/EditPizza'


export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹"

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "")

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])



  return (
    <div>
      <ToastContainer/>
      <Navbar setToken={setToken} />
    <div className='bg-white min-h-screen'>
      {
        token === '' ? <Login setToken={setToken} />
          :
          <>
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />}></Route>
                  <Route path='/edititem/:itemId' element={<EditPizza/>}></Route>
                  <Route path='/menslist' element={<Mens token={token} />}></Route>
                  <Route path='/womenslist' element={<Womens token={token} />}></Route>
                  <Route path='/kidslist' element={<Kids token={token} />}></Route>
                  <Route path='/orders' element={<Orders token={token} />}></Route>
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
    </div>
  )
}

export default App
