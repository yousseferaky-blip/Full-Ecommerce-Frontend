import React, { useEffect, useState } from 'react';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import axios from 'axios';
import { BASE_URL } from '../../assets/url';
import toast from "react-hot-toast";

const Wishing = () => {
  
  const [wish, setWish] = useState([])

  const MyWish = async ()=>{
    try{
        const res = await axios.get(`${BASE_URL}/wish/mywishlist`,{withCredentials:true})
        setWish(res.data)
    }catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    MyWish()
  },[])

  const DeleteWish = async (id)=>{
    try{
        await axios.delete(`${BASE_URL}/wish/${id}`,{withCredentials:true})
        await MyWish()
        toast.success("Product Removed Successfully!")
    }catch(err){
        console.log(err)
    }
  }



  return (
    <section className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
      {/* Header */}
        <div className='flex text-2xl items-center justify-center pt-6 mb-2'>
                <p className='text-gray-500 uppercase'>Your  
                    <span className='ml-1 text-gray-700 font-medium'>Wishlist</span>
                </p>
                <p className='ml-4 w-12 h-[2px] bg-gray-700'></p>
        </div>
      


      {/* Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wish.map((wish,index) => (
          <div key={index} className="relative bg-white shadow-md rounded-lg p-4 flex flex-col">
            {/* Delete Button */}
            <button 
              onClick={()=>DeleteWish(wish._id)}
              className="absolute top-0 z-10 right-0 text-gray-400 hover:text-red-500 cursor-pointer"
            >
              <RiDeleteBack2Fill size={25} />
            </button>

            {/* Product Image */}
            <img 
              src={`${wish.product.image}`}
              crossOrigin="anonymous" 
              alt={wish.title} 
              loading="lazy"
              className="w-1/2 md:w-full md:auto  object-cover rounded-md mb-4"
            />

            {/* Product Info */}
            <h3 className="text-lg font-semibold text-gray-800 truncate">{wish.product.title}</h3>
            <p className="text-gray-500 mt-1">{wish.product.category} | {wish.brand}</p>
            <p className="text-gray-600 mt-2 line-clamp-3">{wish.product.description}</p>
            <p className="text-gray-800 mt-2 ">${wish.product.price}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Wishing;
