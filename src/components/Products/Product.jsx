import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from '../../assets/url'
import { FaStar } from 'react-icons/fa6'
import { CiStar } from 'react-icons/ci'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { productsContext } from '../../context/GetProducts'
import { userContext } from '../../context/UserContext'
import toast from 'react-hot-toast'
import Comment from '../Comment/Comment'

const Product = () => {
  const {id} = useParams()
  const {product} = useContext(productsContext)
  const [data, setData] = useState(null)
  const {user} = useContext(userContext)

  const getProduct = async ()=>{
    try{
      const res = await axios.get(`${BASE_URL}/product/${id}`)
      setData(res.data.product)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getProduct()
  },[id])

  const AddToCart =async () =>{
    try{
      if(!user){
        toast.error("يجب ان تسجل دخول قبل ذلك") 
        return
      }
      await axios.post(`${BASE_URL}/cart/add`,
        {
          userId:user._id  ,
          productId:data._id  
        } 
        ,{withCredentials:true})
       
        toast.success("Product Added To Cart")
    }catch(err){
      console.log(err)
    }
  }


  return (
    <section className='px-4 sm:px-[5vw] md:px-[7vw]  lg:px-[9vw]'>

        {/* PRODUCT DETAILS */}

           {data ? (
              <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-16 mt-10">
                
                {/*  IMAGES  */}

                <div className="px-5 lg:px-16 xl:px-20">
                    <ImageGallery
                      items={[
                        {
                          original: `${data.image}`,
                          thumbnail: `${data.image}`,
                        },
                        ...(data.images?.map((img) => ({
                          original: `${img}`,
                          thumbnail: `${img}`,
                        })) || []),
                      ]}
                      showPlayButton={false}
                      showFullscreenButton={false}
                      showNav={false}
                      autoPlay={false}
                      renderItem={(item) => (
                        <InnerImageZoom
                          src={item.original}
                          zoomSrc={item.original}
                          zoomType="in-place"
                          zoomScale={2}
                          zoomPreload={true}
                          className="rounded-lg"
                          imgAttributes={{ crossOrigin: "anonymous" }} 
                        style={{ width: "100%", height: "auto" }}
                        />
                      )}
                      renderThumbInner={(item) => (
                        <img
                          src={item.thumbnail}
                          alt="thumbnail"
                          className="rounded-md"
                          crossOrigin="anonymous" 
                          loading='lazy'
                        />
                      )}
                    />
                    
                </div>


                  {/* INFO */}

                <div className="flex flex-col ">
                  <h1 className="text-3xl font-medium text-[#353E4B] mb-4 break-words">{data.title}</h1>
                      {/* RATE */}
                   <div className="w-full mb-2 flex items-center gap-2">
                      <p className="text-xs">4.5</p>
                      <div className="flex items-center gap-0.5 text-yellow-400 ">
                          <FaStar  />
                          <FaStar  />
                          <FaStar  />
                          <FaStar  />
                          <CiStar />
                      </div>
                    </div>

                    {/* DIS */}
                  <p className='text-[#949AA3] mt-3 break-words'>{data.description}</p>
                    {/* PRICE  */}
                  <p className="text-3xl font-medium mt-6 text-[#353E4B]">{data.price} <span className='text-base font-normal text-gray-800/60 line-through ml-2'>{data.discount}</span></p>
                  <hr className='text-gray-800/50 my-6'></hr>
                  
                    {/* BRANDS */}

                  <div className='overflow-x-auto'>
                    <table className='table-auto border-collapse w-full max-w-72'>
                      <tbody>
                        <tr>
                          <td className='text-gray-600 font-medium'>Brand</td>
                          <td className='text-gray-800/50 '>{data.brand}</td>
                        </tr>
                        <tr>
                          <td className='text-gray-600 font-medium'>Color</td>
                          <td className='text-gray-800/50 '>Multi</td>
                        </tr>
                        <tr>
                          <td className='text-gray-600 font-medium'>Category</td>
                          <td className='text-gray-800/50 '>{data.category}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                    {/* BUTTON */}
                    
                  <div className='mt-5'>
                    <button onClick={AddToCart} className='w-full py-3.5 cursor-pointer bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition'>Add To Cart</button>
                  </div>

                      {/* ADD COMMENT */}


                      

                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}

        {/* RELATED PRODUCT */}

        {data && (
            <div className="mt-20">

              <div className='mb-10 flex text-center text-2xl items-center justify-center pt-8'>
                  <p className='text-gray-500 uppercase'>Related
                      <span className='ml-1 text-gray-700 font-medium'>Products</span>
                  </p>
                  <p className='ml-4 w-12 h-[2px] bg-gray-700'></p>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {product
                .filter((p) => p.category === data.category && p._id !== data._id)
                .map((d) => (
                  
                    <Link to={`/product/${d._id}`}  key={d._id} className="rounded-lg flex flex-col items-center">
                          <div className="p-4 bg-[#E6E9F2] cursor-pointer relative rounded-lg w-full h-52  flex items-center justify-center">
                          <img 
                              src={`${d.image}`} 
                              alt={d.title} 
                              crossOrigin="anonymous"
                              loading='lazy'
                              className="w-4/5 h-4/5 object-cover md:w-full md:h-full  transition hover:scale-105 "
                              />
                          </div>
                              <p className="w-full font-medium md:text-base pt-2 truncate">{d.title}</p>
                              <p className="w-full text-xs text-gray-500/70 hidden md:block  md:text-base p-b-2 truncate">{d.description}</p>
                          <div className="w-full mb-2 flex items-center gap-2">
                              <p className="text-xs">4.5</p>
                              <div className="flex items-center gap-0.5 text-yellow-400 ">
                                  <FaStar  />
                                  <FaStar  />
                                  <FaStar  />
                                  <FaStar  />
                                  <CiStar />
                              </div>
                          </div>
                          <div className="w-full flex justify-between items-center">
                              <p className="text-base font-medium">${d.price}</p>
                              <button className="hidden md:block px-4 py-1.5 cursor-pointer text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-100 transition">Buy now</button>
                          </div>
                      </Link>
                ))}
              </div>
              
            </div>
        )}

        {/* COMMENTS SECTION */}

        <Comment data={data}/>
        
    </section>
  )
}

export default Product