import React, { useContext,useState } from 'react'
import {assets} from '../assets/assets'
import { Link,NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
const Navbar = () => {
    const [visible,setVisible] = useState(false);
    const {getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext);

    const logout = () =>{
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate("/login")
    }
  return (
    <div className='fixed top-0 left-0 w-full mx-auto bg-white z-50 flex items-center lg:justify-around px-2 gap-28 justify-between py-4 font-medium shadow-sm'>
        <NavLink to={"/"}>
        <img src={assets.logo} className='lg:w-40 w-36 lg:h-9 h-8 sm:h-8 bg-white' alt=''/>
        </NavLink>
        <ul className='hidden sm:flex gap-4 text-sm mt-3 text-gray-700 lg:mr-24'>
            <NavLink to="/collection" className="flex flex-col items-center">
                <p>MENS WEAR</p>
                <hr className='w-2/4 border-none h-[1px] bg-gray-700 hidden'></hr>

            </NavLink>
            <NavLink to="/womenswear" className="flex flex-col items-center">
                <p>WOMENS WEAR</p>
                <hr className='w-2/4 border-none h-[1px] bg-gray-700 hidden'></hr>

            </NavLink>
            <NavLink to="/kidswear" className="flex flex-col items-center">
                <p>KIDS WEAR</p>
                <hr className='w-2/4 border-none h-[1px] bg-gray-700 hidden'></hr>

            </NavLink>

        </ul>
        <div className='flex items-center lg:gap-6 gap-4'>
           
            <div className='group relative'>
                <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt=''></img>
                {token &&
                <div className='group-hover:block hidden absolute dropdown-menu right-0'>
                    <div className='flex flex-col gap-2 w-36 py-3 bg-slate-100'>
                        <a href='https://buyease-admin.vercel.app' className='px-4 cursor-pointer hover:text-white hover:bg-black'>Admin Panel</a>
                        <p onClick={()=>navigate("/orders")} className='px-4 cursor-pointer hover:text-white hover:bg-black'>Orders</p>
                        <p onClick={logout} className='px-4 cursor-pointer hover:text-white hover:bg-black'>Logout</p>
                    </div>
                </div>}
            </div>
            <Link to={"/cart"} className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt=''></img>
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[14px]'>{getCartCount()}</p>
            </Link>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=''></img>
        </div>
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible?'w-full h-screen':'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3'>
                    <img src={assets.dropdown_icon} className='h-4 rotate-180' alt=''></img>
                    <p className='cursor-pointer'>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>MENS WEAR</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/womenswear'>WOMENS WEAR</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/kidswear'>KIDS WEAR</NavLink>
            </div>


        </div>
    </div>
  )
}

export default Navbar
