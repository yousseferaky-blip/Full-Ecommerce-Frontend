import axios from 'axios'
import React, { useState } from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../assets/url'
import toast from 'react-hot-toast'

const SignUp = () => {
    const [active,setActive] = useState(false)
    const [form , setForm] = useState({
        username:"",
        email:"",
        password:"",
        phone:""
    })
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const handleChange = (e)=>{
        setForm({...form , [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        // VALIDATIONS
        if(!form.username || !form.email || !form.password || !form.phone ){
            toast.error("Please fill in all fields.")
            return
        }
        if(form.password.length < 8  ){
            toast.error("Password must be at least 8 characters")
            return
        }
        if(form.username.length < 3  ){
            toast.error("UserName must be at least 3 characters")
            return
        }
        if(form.phone.length !== 11  ){
            toast.error("UserName must be at 11 characters")
            return
        }

        // CREATE USER
        try{
            const formData = new FormData();
            formData.append("username", form.username);
            formData.append("email", form.email);
            formData.append("password", form.password);
            formData.append("phone", form.phone);
            if (image) {
            formData.append("image", image); 
        }
            await axios.post(`${BASE_URL}/user/signUp`, formData ,{ withCredentials: true })
            toast.success("Account Created Successfully")
            navigate("/signin")

        // HANDLE ERROE
        }catch(err){
            if (err.response) {
                if (err.response.status === 400) {
                toast.error(`Email already exists`);
                } else {
                toast.error(err.response.data.message || "Register failed");
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
                    <span className='ml-1 text-gray-700 font-medium'>up</span>
                </p>
                <p className='ml-4 w-12 h-[2px] bg-gray-700'></p>
            </div>

            <form onSubmit={handleSubmit} className='mt-3 w-full h-full flex items-center justify-center flex-col'>
                <div className="relative w-16 h-16 mt-2 flex items-center justify-center">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                    />
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition">
                        <span className="text-gray-500 text-lg">📷</span>
                    </div>
                </div>                
                <input onChange={handleChange} value={form.username} name="username" className='w-full mt-2 rounded-sm px-3 py-2 border border-gray-800' type='text' placeholder='Enter Your UserName'  inputMode='text'/>
                <input onChange={handleChange} value={form.email} name="email" className='w-full mt-2 rounded-sm px-3 py-2 border border-gray-800' type='email' placeholder='Enter Your Email'  inputMode='email'/>
                <input onChange={handleChange} value={form.phone} name="phone" className='w-full mt-2 rounded-sm px-3 py-2 border border-gray-800' type='tel' placeholder='Enter Your Phone Number'  inputMode='tel'/>
                <div className='relative flex items-center justify-between w-full'>
                    <input onChange={handleChange} value={form.password} name="password" className='w-full mt-2 rounded-sm px-3 py-2 border border-gray-800' type={`${active ? "text" : "password" }`} placeholder='Enter Your Password'  inputMode='text'/>
                    <span className='absolute top-1/2 right-2 -translate-y-1/4 cursor-pointer' onClick={()=>setActive(!active)}>
                        {active ? <FaRegEye /> :  <FaEyeSlash /> }
                    </span>
                </div>
                <button className='w-full bg-gray-800 text-white my-2 p-3 rounded-sm cursor-pointer font-bold hover:text-gray-800 hover:bg-white hover:border-gray-700 border border-white duration-300'>Sign Up</button>  
                <div className='w-full flex items-center gap-2 mt-2'>
                    <span className='text-gray-500 text-sm'>Already have an account?</span>
                    <Link to={"/signin"} className='text-gray-900 text-l font-semibold hover:text-gray-500'>Sign in</Link>
                </div>  
            </form>

        </div>
    </section>
  )
}

export default SignUp