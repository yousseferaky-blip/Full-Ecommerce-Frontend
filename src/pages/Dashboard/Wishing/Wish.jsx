import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/url";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Wish = () => {
  const [wish, setWish] = useState([]);

  const getWish = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/wish/all`, { withCredentials: true });
      setWish(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWish();
  }, []);

  const deleteWish = async (id)=>{
    try{
      await axios.delete(`${BASE_URL}/wish/${id}`,{withCredentials:true})
      getWish()
      toast.success("Product Removed From Wishing")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-normal sm:font-extrabold mb-6">Wishing Dashboard</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {wish.map((w, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                <td>
                  <Link to={`/product/${w.product?._id}`} className="px-6 py-4 whitespace-nowrap">{w.product?.title}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{w.product?.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{w.user?.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{w.user?.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{w.user?.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(w.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(w.updatedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    onClick={()=>deleteWish(w._id)}
                    className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 shadow-sm"
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wish;
