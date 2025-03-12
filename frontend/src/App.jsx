import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import Verify from './pages/Verify'
import MensWear from './pages/MensWear'
import WomensWear from './pages/WomensWear'
import KidsWear from './pages/KidsWear'

export const backendUrl = import.meta.env.VITE_BACKEND_URL


const App = () => {
  return (
    <div className='px-1 sm:px-[5vw] md:px-[7vw] lg:px-[7vw]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/collection' element={<MensWear/>}></Route>
        <Route path='/womenswear' element={<WomensWear/>}></Route>
        <Route path='/kidswear' element={<KidsWear/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/products/:productId' element={<Product/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='placeorder' element={<PlaceOrder/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
      </Routes>
      <Footer/>

    </div>
  )
}

export default App