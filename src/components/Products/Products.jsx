import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../assets/url";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { productsContext } from "../../context/GetProducts";

const Products = () => {
    const {product} = useContext(productsContext)
    return (
        <section className='mt-20 py-2'>
            <p className='font-medium text-2xl text-[#374151] mb-5'>Products</p>
           
            <div className="grid grid-cols-2  md:grid-cols-3 gap-6">
                {product.map((d) => (
                    <Link to={`/products`}  key={d._id} className="rounded-lg flex flex-col items-center">
                        <div className="p-4 bg-[#E6E9F2] cursor-pointer relative rounded-lg w-full h-52  flex items-center justify-center">
                         <img 
                            src={`${d.image}`} 
                            crossOrigin="anonymous"
                            alt={d.title} 
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
                            <button  className="hidden md:block px-4 py-1.5 cursor-pointer text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-100 transition">Buy now</button>
                        </div>
                    </Link>
                ))}
            </div>

        </section>
    );
};

export default Products;
