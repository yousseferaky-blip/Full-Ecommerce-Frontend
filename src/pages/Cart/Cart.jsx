import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../assets/url'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import toast from 'react-hot-toast'

const Cart = () => {
    const [cart,setCart] = useState([])

    const Subtotal = cart.reduce((acc,cur)=> acc + cur.product?.price , 0 )
    const Shipping = Subtotal > 1 ? 50 : 0 
    const Total = Subtotal + Shipping
    
    const MyCart = async()=>{
        try{
            const res = await axios.get(`${BASE_URL}/cart/mycart`,{withCredentials:true})
            setCart(res.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        MyCart()
    },[])    


    const DeleteCart = async (id)=>{
        try{
            await axios.delete(`${BASE_URL}/cart/${id}`,{withCredentials:true})
            await MyCart()
            toast.success("Product Removed Successfully!")
        }catch(err){
            console.log(err)
        }
    }


  return (
   <section className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10 grid -grid-cols-1 md:grid-cols-2 justify-center gap-2">

    {/* YOUR CARTS */}
    <div  className='order-2 md:order-1'>
        <div className="flex text-2xl items-center justify-center md:justify-start">
            <p className="text-gray-500 uppercase">
            Your <span className="ml-1 text-gray-700 font-medium">Cart</span>
            </p>
            <div className="ml-4 w-12 h-[2px] bg-gray-700"></div>
        </div>

    
    {
        cart.map((cart,index)=>(
            <div key={index} className="relative mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white shadow-md rounded-lg p-5 overflow-hidden">

                    <div className="flex items-center ">
                        <img
                            src={`${cart.product?.image}`}
                            crossOrigin="anonymous"
                            alt="product"
                            loading="lazy"
                            className="w-1/4 h-auto md:w-full md:h-auto object-cover"
                        />
                    </div>


                    <div className="col-span-2 flex flex-col  justify-between">
                            <div >
                                <h3 className="text-lg font-semibold text-gray-800 truncate">{cart.product?.title}</h3>
                                <p className="text-sm text-gray-500 mt-1 flex justify-between items-center">{cart.product?.category}<span>{cart.product?.brand}</span></p>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-4">
                                    {cart.product?.description} 
                                </p>
                        </div>


                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <p className="text-lg font-bold text-gray-900">${cart.product?.price}</p>
                            <div className="text-xs text-gray-500">
                                <p>Created: {new Date(cart.product?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                    </div>

                    <button onClick={()=>DeleteCart(cart?._id)} className='absolute top-0 right-0 cursor-pointer text-gray-400 hover:text-red-500'>
                        <RiDeleteBack2Fill size={30} />
                    </button>

            </div>
        ))
    }
        

    </div>

        {/* CART TOTALS */}
    <div className='mt-7 order-1 md:order-2 '>
        {/* TOP */}
        <div className="flex text-2xl items-center justify-center md:justify-start">
            <p className="text-gray-500 uppercase">
            CART <span className="ml-1 text-gray-700 font-medium">TOTALS</span>
            </p>
            <div className="ml-4 w-12 h-[2px] bg-gray-700"></div>
        </div>

        {/* BOTTOM */}

        <div className='flex flex-col items-center justify-center gap-2 mt-2 text-sm'>
            <div className='flex justify-between w-full'>
                <p>Subtotal</p>
                <p>{Subtotal}</p>
            </div>
            <div className='flex justify-between w-full'>
                <p>Shipping Fee</p>
                <p>{Shipping}</p>
            </div>
            <div className='flex justify-between w-full'>
                <p>Total</p>
                <p>{Total}</p>
            </div>
        </div>
        <button className='mt-2 bg-black text-white w-full py-2 cursor-pointer' >proceed to checkout</button>
    
    </div>

    </section>
  )
}

export default Cart