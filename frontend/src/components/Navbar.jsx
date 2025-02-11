import React, { useContext,useState } from 'react'
import {assets} from '../assets/assets'
import { Link,NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
const Navbar = () => {
    const [visible,setVisible] = useState(false);
    const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext);

    const logout = () =>{
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate("/login")
    }
  return (
    <div className='fixed top-0 left-0 w-full bg-white z-50 flex items-center lg:justify-around justify-between py-2 px-6 font-medium'>
        <NavLink to={"/"}>
        <img src={assets.logo} className='w-28 lg:h-14 sm:h-8 bg-white' alt=''/>
        </NavLink>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to="" className="flex flex-col items-center gap-1">
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>

            </NavLink>
            <NavLink to="/collection" className="flex flex-col items-center gap-1">
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>

            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-1">
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>


            </NavLink>
            <NavLink to="/contact" className="flex flex-col items-center gap-1">
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>

            </NavLink>

        </ul>
        <div className='flex items-center gap-6'>
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt=''></img>
            <div className='group relative'>
                <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt=''></img>
                {token &&
                <div className='group-hover:block hidden absolute dropdown-menu right-0'>
                    <div className='flex flex-col gap-2 w-36 py-3 bg-slate-100'>
                        <a href='https://buyease-admin-site.vercel.app' className='px-4 cursor-pointer hover:text-white hover:bg-black'>Admin Panel</a>
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
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
            </div>


        </div>
    </div>
  )
}

export default Navbar