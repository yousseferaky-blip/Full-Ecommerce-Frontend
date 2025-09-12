import axios from 'axios'
import React, { useContext, useState } from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../assets/url'
import toast from 'react-hot-toast'
import { userContext } from '../../context/UserContext'

const SignIn = () => {
    const [active,setActive] = useState(false)
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const navigate = useNavigate()
    const {setUser} = useContext(userContext)

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // SIGNED USER 
        try{
            const res = await axios.post(`${BASE_URL}/user/login`,{password,email},{ withCredentials: true })
            setUser(res.data.info)
            toast.success("Logged Successfully")
            navigate("/")

        // HANDLE ERROR
        }catch(err){
            if (err.response) {
        if (err.response.status === 401) {
          toast.error("Incorrect Password Or Email");
        } else if (err.response.status === 404) {
          toast.error("Email and Password are required");
        } else {
          toast.error("Login failed");
        }
      } else {
        toast.error("An unexpected error occurred");
        console.log(err);
      }
    }
    }

  return (
    <section className='overflow-hidden sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex items-center justify-center  '>
        
        <div className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-10 gap-4 text-gray-800'>
            
            <div className='flex text-center text-2xl items-center justify-center pt-8'>
                <p className='text-gray-500 uppercase'>sign
                    <span className='ml-1 text-gray-700 font-medium'>in</span>
                </p>
                <p className='ml-4 w-12 h-[2px] bg-gray-700'></p>
            </div>

            <form 
             onSubmit={handleSubmit}
             className='mt-3 w-full h-full flex items-center justify-center flex-col'>
                <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className='w-full mt-2 rounded-sm px-3 py-2 border border-gray-800' type='text' placeholder='Enter Your Email' required inputMode='email'/>
                <div className='relative flex items-center justify-between w-full'>
                    <input 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className='w-full mt-2 rounded-sm px-3 py-2 border border-gray-800' type={`${active ? "text" : "password" }`} placeholder='Enter Your Password' required inputMode='text'/>
                    <span className='absolute top-1/2 right-2 -translate-y-1/4 cursor-pointer' onClick={()=>setActive(!active)}>
                        {active ? <FaRegEye /> :  <FaEyeSlash /> }
                    </span>
                </div>
                <button className='w-full bg-gray-800 text-white my-2 p-3 rounded-sm cursor-pointer font-bold hover:text-gray-800 hover:bg-white hover:border-gray-700 border border-white duration-300'>Sign In</button>  
                <div className='w-full flex items-center gap-2 mt-2'>
                    <span className='text-gray-500 text-sm'>Don’t have an account?</span>
                    <Link to={"/signup"} className='text-gray-900 text-l font-semibold hover:text-gray-500'>Sign up</Link>
                </div> 
                <Link to={"/forgot-password"} 
                className="w-full text-indigo-600 hover:text-indigo-800 transition-colors duration-300   font-medium">
                  Forget Password ?
                </Link> 
            </form>

        </div>
    </section>
  )
}

export default SignIn