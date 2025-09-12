import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../assets/url'
import toast from 'react-hot-toast'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa6'

const ResetPassword = () => {
    const [email,setEmail] = useState("")
    const [otp,setOtp] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const navigate = useNavigate()
    const [active,setActive] = useState(false)

    const handleReset = async (e)=>{
        e.preventDefault()
        try{
            await axios.post(`${BASE_URL}/user/reset-password`,{
                email,
                otp,
                newPassword,
            })
            toast.success("✅ Password changed successfully! ");
            navigate("/signin")

        }catch(err){
            console.log(err)
        }
    }

  return (
    <section className='overflow-hidden sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex items-center justify-center  '>
        
        <div className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-10 gap-4 text-gray-800'>
            
            <div className='flex text-center text-2xl items-center justify-center pt-8'>
                <p className='text-gray-500 uppercase'>Reset
                    <span className='ml-1 text-gray-700 font-medium'>Password</span>
                </p>
                <p className='ml-4 w-12 h-[2px] bg-gray-700'></p>
            </div>

            <form 
                onSubmit={handleReset}
                className='mt-3 w-full h-full flex items-center justify-center flex-col'>
                
                <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className='w-full mt-2 rounded-sm px-3 py-2 border border-gray-800' type='text' placeholder='Enter Your Email' required inputMode='email'/>
               
                <input 
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                className='w-full mt-2 rounded-sm px-3 py-2 border border-gray-800' type='text' placeholder='Enter Your OTP' required inputMode='email'/>
               
               <div className='relative flex items-center justify-between w-full'>
                <input 
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    className='w-full mt-2 rounded-sm px-3 py-2 border border-gray-800' type={`${active ? "text" : "password" }`} placeholder='Enter Your New Password' required inputMode='text'/>
                    <span className='absolute top-1/2 right-2 -translate-y-1/4 cursor-pointer' onClick={()=>setActive(!active)}>
                        {active ? <FaRegEye /> :  <FaEyeSlash /> }
                    </span>
                </div>
                

               <button 
               className="w-full bg-gray-800 text-white my-2 p-3 rounded-sm cursor-pointer font-bold hover:text-gray-800 hover:bg-white hover:border-gray-700 border border-white duration-300" > 
                    Change Password
               </button>
              
            </form>

        </div>
    </section>
  )
}

export default ResetPassword