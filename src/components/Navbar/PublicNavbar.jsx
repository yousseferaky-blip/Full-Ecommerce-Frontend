import { Link, NavLink, useNavigate } from 'react-router-dom'
import img from '../../assets/images/logo.83ad3901.svg'
import { useContext, useState } from 'react';
import { RiUser2Fill } from 'react-icons/ri';
import { BiShoppingBag } from 'react-icons/bi';
import { LuChartNoAxesGantt } from 'react-icons/lu';
import { HiOutlineXMark } from 'react-icons/hi2';
import { userContext } from '../../context/UserContext';
import { IoIosLogOut } from 'react-icons/io';
import axios from 'axios';
import { BASE_URL } from '../../assets/url';
import toast from 'react-hot-toast';
import { FaHeartCircleBolt } from 'react-icons/fa6';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {user,setUser} = useContext(userContext)
    const navigate = useNavigate()

    const handleLogOut = async ()=>{
        try{
            await axios.get(`${BASE_URL}/user/logout`)
            setUser(null)
            navigate("/signin")
            toast.success("Logged Out Successfully")
        }catch(err){
            console.log(err)
        }
    }

  return (
    <header className='px-4 sm:px-[5vw] md:px-[7vw]  lg:px-[9vw] py-[1rem] border-b border-gray-300'>
        <nav className='flex justify-between items-center'> 
             {/* Logo */}
                                
            <img src={img} alt='logo' loading='lazy'/>

            {/* Desktop Menu */}

            <ul className='hidden md:flex items-center gap-5'>
                <li >
                    <NavLink to={"/"} 
                        className={({isActive}) =>
                        ` uppercase py-0.5
                            ${isActive  
                                ? "text-black relative after:content-[''] after:absolute after:left-1/4 after:bottom-0 after:w-1/2 after:h-[1px]  after:bg-black " 
                                : "text-gray-700 hover:text-black" }
                        `
                        }
                    >home</NavLink>
                </li>
                <li >
                    <NavLink to={"/products"} 
                        className={({isActive}) =>
                        ` uppercase py-0.5
                            ${isActive  
                                ? "text-black relative after:content-[''] after:absolute after:left-1/4 after:bottom-0 after:w-1/2 after:h-[1px]  after:bg-black " 
                                : "text-gray-700 hover:text-black" }
                        `
                        }
                    >shop</NavLink>                </li>
                <li >
                    <NavLink to={"/about"} 
                        className={({isActive}) =>
                        ` uppercase py-0.5
                            ${isActive  
                                ? "text-black relative after:content-[''] after:absolute after:left-1/4 after:bottom-0 after:w-1/2 after:h-[1px]  after:bg-black " 
                                : "text-gray-700 hover:text-black" }
                        `
                        }
                    >about</NavLink>                </li>
                <li >
                    <NavLink to={"/contact"} 
                        className={({isActive}) =>
                        ` uppercase py-0.5
                            ${isActive  
                                ? "text-black relative after:content-[''] after:absolute after:left-1/4 after:bottom-0 after:w-1/2 after:h-[1px]  after:bg-black " 
                                : "text-gray-700 hover:text-black" }
                        `
                        }
                    >contact</NavLink>                </li>
                    
                    {
                        user && user.role === "admin" &&
                        <li >
                    <NavLink to={"/dashboard"} 
                        className={({isActive}) =>
                        ` uppercase py-0.5
                            ${isActive  
                                ? "text-black relative after:content-[''] after:absolute after:left-1/4 after:bottom-0 after:w-1/2 after:h-[1px]  after:bg-black " 
                                : "text-gray-700 hover:text-black" }
                        `
                        }
                    >Dashboard</NavLink>                </li>
                    }
            </ul>

            {/* Hamburger Button */}

            <div className='flex items-center gap-2 md:gap-5'>
                {
                    user ? 
                    <button 
                        onClick={handleLogOut}
                        className='cursor-pointer'>
                        <IoIosLogOut  size={20}/>
                    </button>
                    :
                
                    <Link 
                        to={"/signin"}
                        className='cursor-pointer'>
                        <RiUser2Fill size={20}/>
                    </Link>
                }

                <Link 
                    to={"/cart"} 
                    className='cursor-pointer'>
                    <BiShoppingBag size={20}/>
                </Link>

                <Link 
                    to={"/wishing"} 
                    className='cursor-pointer'>
                    <FaHeartCircleBolt size={20}/>
                </Link>

                <button 
                className='cursor-pointer flex md:hidden'
                onClick={()=>setOpen(!open)}
                >
                    {open ? <HiOutlineXMark size={20}/> : <LuChartNoAxesGantt size={20}/> }
                </button>
            </div>

            {/* Mobile Menu */}
            { open &&(
                <ul className='flex flex-col gap-3 absolute top-16 left-0 w-full bg-white px-4 py-8 shadow-md z-10 md:hidden'>
                    <li >
                        <NavLink to={"/"} 
                            className="uppercase py-0.5 text-gray-700 hover:text-black"
                            onClick={()=>setOpen(false)}
                        >home</NavLink>
                    </li>
                    <li >
                        <NavLink to={"/products"} 
                            className="uppercase py-0.5 text-gray-700 hover:text-black"
                            onClick={()=>setOpen(false)}
                        >shop</NavLink>                </li>
                    <li >
                        <NavLink to={"/about"} 
                            className="uppercase py-0.5 text-gray-700 hover:text-black"
                            onClick={()=>setOpen(false)}
                        >about</NavLink>                </li>
                    <li >
                        <NavLink to={"/contact"} 
                            className="uppercase py-0.5 text-gray-700 hover:text-black"
                            onClick={()=>setOpen(false)}
                        >contact</NavLink>                </li>
                         {
                            user && user.role === "admin" &&
                            <li >
                                <NavLink to={"/dashboard"} 
                                    onClick={()=>setOpen(false)}
                                    className="uppercase py-0.5 text-gray-700 hover:text-black"
                                >Dashboard</NavLink>                </li>
                        }
                </ul>
            ) }
           

        </nav>
    </header>
  )
}

export default Navbar