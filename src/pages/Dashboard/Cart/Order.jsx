import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/url";
import toast from "react-hot-toast";

const Order = () => {

  const [order,setOrder] = useState([])
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectUser, setSelectUser] = useState(false) 
  const [selectPorduct, setSelectProduct] = useState(false) 
  
 // GET ORDERS

  const getOrders =async ()=>{
    try{
      const res = await axios.get(`${BASE_URL}/cart/all`,{withCredentials:true})
      setOrder(res.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getOrders()
  },[])

  // GET USER

 const getUser = async (id) =>{
      try{
          const res = await axios.get(`${BASE_URL}/user/getUser/${id}`,{withCredentials:true})
          setUser(res.data.info)
          setSelectUser(true)
      }catch(err){
          console.log(err)
      }
  }

 // GET PRODUCT

  const getProduct = async (id) =>{
    if(!id ) return console.log(" Product ID is missing")
      try{
          const res = await axios.get(`${BASE_URL}/product/${id}`)
          setProduct(res.data.product)

          setSelectProduct(true)

      }catch(err){
          console.log(err)
      }
  }

   // UPDATE STATUS

  const handleStatusChange = async (cartId, newStatus) => {
    try {
      await axios.put(`${BASE_URL}/cart/${cartId}`, { status: newStatus }, { withCredentials: true });

      setOrder(prevOrders =>
        prevOrders.map(o => (o._id === cartId ? { ...o, status: newStatus } : o))
      );

      toast.success("Status updated!");
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // DELETE ORDER

  const deleteOrder = async(id)=>{
    try{
      await axios.delete(`${BASE_URL}/cart/${id}`,{withCredentials:true})
      getOrders()
      toast.success("Product Removed From Cart")
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-normal sm:font-extrabold mb-6 text-gray-800">Orders Dashboard</h1>

            {/* SHOW ORDERS */}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order.map((o, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{o.product?.title}</span>
                    <button
                      onClick={()=>getProduct(o.product?._id)}
                      className="cursor-pointer ml-3 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition"
                    >
                      Show
                    </button>
                  </div>

                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{o.user?.email}</span>
                    <button
                      onClick={()=>getUser(o.user._id)}
                      className="cursor-pointer ml-3 px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 transition"
                    >
                      Show
                    </button>
                  </div>

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{o.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                      className={`px-2 py-1 rounded text-sm font-semibold ${
                        o.status === "Complete"
                          ? "bg-green-100 text-green-800"
                          : o.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Complete">Complete</option>
                      <option value="Failed">Failed</option>
                    </select>
                </td>
                
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                        onClick={()=>deleteOrder(o._id)}
                        className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 shadow-sm"
                        >Delete</button>
                      </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

            {/* SHOW USER  */}
        {
          selectUser && 
            <div  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[80%] sm:w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold ">User Details</h3>
                        <button onClick={()=> setSelectUser(false)} className="text-gray-500 cursor-pointer">✕</button>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <img src={`${user.image}`} alt="avatar"  crossOrigin="anonymous" className="w-20 h-20 rounded-full" loading="lazy"/>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">Username</span> {user.username}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">Email</span>: {user.email}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">Phone</span>: {user.phone}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">Role</span>: {user.role}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">CreatedAt</span> {new Date(user.createdAt).toLocaleString()}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">UpdatedAt</span> {new Date(user.updatedAt).toLocaleString()}</div>
                    </div>
            </div>
        }

        
            {/* SHOW PRIDUCT  */}
        {
          selectPorduct && 
            <div  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[80%] sm:w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold ">Product Details</h3>
                        <button onClick={()=> setSelectProduct(false)} className="text-gray-500 cursor-pointer">✕</button>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <img src={`${product.image}`} alt="avatar"  crossOrigin="anonymous" className="w-20 h-20 rounded-full" loading="lazy"/>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">Title</span> {product.title}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">Description</span>: {product.description}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">Price</span>: {product.price}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">Discount</span>: {product.discount}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">CreatedAt</span> {new Date(product.createdAt).toLocaleString()}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600 truncate">UpdatedAt</span> {new Date(product.updatedAt).toLocaleString()}</div>
                    </div>
            </div>
        }

    </div>
  );
};

export default Order;
