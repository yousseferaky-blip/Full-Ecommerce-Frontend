import React, {  useEffect, useState } from "react";
import {FaUsers,FaBox,FaShoppingCart} from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../../assets/url";

const OverView = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [order,setOrder] = useState([])
    const [pendingOrders, setPendingOrders] = useState([]);
    const [failedOrders, setFailedOrders] = useState([]);
    const [successOrders, setSuccessOrders] = useState([]);
    const [comments, setComments] = useState([]);

    // GET USERS

const GetUsers = async (e) =>{
    try{
        const res = await axios.get(`${BASE_URL}/user/getUsers`,{withCredentials:true})
        setUsers(res.data.Users)
    }catch(err){
        console.log(err)
    }
  } 
  
  // GET Comments

const getComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/comment/all`, {
        withCredentials: true,
      });
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // GET Orders 
  
 const getOrders =async ()=>{
    try{
      const res = await axios.get(`${BASE_URL}/cart/all`,{withCredentials:true})
        setOrder(res.data)
        setPendingOrders(res.data.filter((o) => o.status === "Pending"));
        setFailedOrders(res.data.filter((o) => o.status === "Failed"));
        setSuccessOrders(res.data.filter((o) => o.status === "Complete"));
        
    }catch(err){
      console.log(err)
    }
  }


  // GET Products

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product`, { withCredentials: true });
      setProducts(res.data.totalProducts);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(()=>{
    GetUsers()
    getComments()
    getOrders()
    getAllProducts();
  },[])



  useEffect(()=>{
    getAllProducts();
  },[])

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-normal sm:font-extrabold mb-8 ">
        Dashboard Overview
      </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          

        {/* TOTAL USERS */}

        <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-2xl p-6 flex flex-col items-center gap-5 border border-white/40 hover:scale-105 transition-transform duration-300">
            <div className={`p-4 rounded-full bg-gradient-to-tr text-blue-500 shadow-lg`}>
                    <FaUsers size={20} />
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-800">{users.length}</h3>
            </div>
        </div>

        {/* TOTAL PRODUCTS */}

        <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-2xl p-6 flex flex-col items-center gap-5 border border-white/40 hover:scale-105 transition-transform duration-300">
            <div className={`p-4 rounded-full bg-gradient-to-tr text-blue-500 shadow-lg`}>
                    <FaBox  size={20} />
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-800">{products}</h3>
            </div>

           
        </div>

         {/* TOTAL STATUS */}

        <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-2xl p-6 flex flex-col items-center gap-5 border border-white/40 hover:scale-105 transition-transform duration-300">
            <div className={`p-4 rounded-full bg-gradient-to-tr text-blue-500 shadow-lg`}>
                    <FaBox  size={20} />
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Order</p>
              <h3 className="text-2xl font-bold text-gray-800">{order.length}</h3>
            </div>
        </div>

        {/* Success Orders */}

        <div className="bg-green-100 shadow-lg rounded-2xl p-6 flex flex-col items-center gap-5 border border-green-200  hover:scale-105 transition-transform duration-300">
        <div className="p-4 rounded-full bg-green-500 text-white shadow-lg">
            <FaShoppingCart size={20} />
        </div>
        <div className="text-center">
            <p className="text-gray-600 text-sm">Success Orders</p>
            <h3 className="text-2xl font-bold text-gray-800">{successOrders.length}</h3>
        </div>
        </div>

        {/* Pending Orders */}

        <div className="bg-yellow-100 shadow-lg rounded-2xl p-6 flex flex-col items-center gap-5 border border-yellow-200  hover:scale-105 transition-transform duration-300">
        <div className="p-4 rounded-full bg-yellow-500 text-white shadow-lg">
            <FaShoppingCart size={20} />
        </div>
        <div className="text-center">
            <p className="text-gray-600 text-sm">Pending Orders</p>
            <h3 className="text-2xl font-bold text-gray-800">{pendingOrders.length}</h3>
        </div>
        </div>

        {/* Failed Orders */}

        <div className="bg-red-100 shadow-lg rounded-2xl p-6 flex flex-col items-center gap-5 border border-red-200  hover:scale-105 transition-transform duration-300">
        <div className="p-4 rounded-full bg-red-500 text-white shadow-lg">
            <FaShoppingCart size={20} />
        </div>
        <div className="text-center">
            <p className="text-gray-600 text-sm">Failed Orders</p>
            <h3 className="text-2xl font-bold text-gray-800">{failedOrders.length}</h3>
        </div>
        </div>

        {/* Failed Orders */}

        <div className="bg-red-100 shadow-lg rounded-2xl p-6 flex flex-col items-center gap-5 border border-red-200  hover:scale-105 transition-transform duration-300">
        <div className="p-4 rounded-full bg-red-500 text-white shadow-lg">
            <FaShoppingCart size={20} />
        </div>
        <div className="text-center">
            <p className="text-gray-600 text-sm">Total Comments</p>
            <h3 className="text-2xl font-bold text-gray-800">{comments.length}</h3>
        </div>
        </div>

      </div>
    </div>
  );
};

export default OverView;
