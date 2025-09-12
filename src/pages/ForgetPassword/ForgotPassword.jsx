import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../assets/url'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [email,setEmail] = useState("")
    const navigate = useNavigate()

    const handleFoget = async(e)=>{
        e.preventDefault()
        try{
            await axios.post(`${BASE_URL}/user/forgot-password`,{email})
            toast.success("📩 تم إرسال الكود! صالح لمدة 15:00 دقيقة ")
            navigate("/reset-password")
        }catch(err){
            console.log(err)
        }
    }

  return (
    <section className='overflow-hidden sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex items-center justify-center  '>
        
        <div className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-10 gap-4 text-gray-800'>
            
            <div className='flex text-center text-2xl items-center justify-center pt-8'>
                <p className='text-gray-500 uppercase'>Forgot
                    <span className='ml-1 text-gray-700 font-medium'>Password</span>
                </p>
                <p className='ml-4 w-12 h-[2px] bg-gray-700'></p>
            </div>

            <form 
                onSubmit={handleFoget}
                className='mt-3 w-full h-full flex items-center justify-center flex-col'>
                <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className='w-full mt-2 rounded-sm px-3 py-2 border border-gray-800' type='text' placeholder='Enter Your Email' required inputMode='email'/>
                <button 
                className='w-full bg-gray-800 text-white my-2 p-3 rounded-sm cursor-pointer font-bold hover:text-gray-800 hover:bg-white hover:border-gray-700 border border-white duration-300'
                >Send OTP</button>
                <Link to={"/signin"} 
                className="w-full text-indigo-600 hover:text-indigo-800 transition-colors duration-300   font-medium">
                    Sign in
                </Link> 
                
            </form>

        </div>
    </section>
  )
}

export default ForgotPassword