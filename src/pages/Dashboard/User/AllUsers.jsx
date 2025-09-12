import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/url";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function AllUsers() {
 
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [select, setSelect] = useState(false)  
  const [search, setSearch] = useState("")  
  
  const GetUsers = async (e) =>{
    try{
        const res = await axios.get(`${BASE_URL}/user/getUsers`,{withCredentials:true})
        setUsers(res.data.Users)

    }catch(err){
        console.log(err)
    }
  } 
  
  useEffect(()=>{
    GetUsers()
  },[])
  

  const getUser = async (id) =>{
      try{
          const res = await axios.get(`${BASE_URL}/user/getUser/${id}`,{withCredentials:true})
          setUser(res.data.info)
          setSelect(true)
      }catch(err){
          console.log(err)
      }
  }

  const DeleteUser =async (id)=>{
     const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
          try{
            await axios.delete(`${BASE_URL}/user/delete/${id}`,{withCredentials:true})
            toast.success("User Deleted Successfully!")
            GetUsers()
            Swal.fire(
                'Deleted!',
                'User has been deleted.',
                  'success'
              );
          }catch(err){
            console.log(err)
          }
    }}
 

    const filterUser = users.filter((u)=> 
      u.username.toLowerCase().includes(search.toLowerCase()) || 
      u.email.toLowerCase().includes(search.toLowerCase()) 
    )

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3  mb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-normal sm:font-extrabold">All Users</h2>
        <div className="flex items-center justify-start md:justify-end gap-2">
          <input
            type="search"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {filterUser.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}

            {filterUser && filterUser.map((user,index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <img src={`${user.image}`} alt="avatar" crossOrigin="anonymous" className="w-10 h-10 rounded-full" loading="lazy"/>
                  <div>
                    <div className="text-xs text-gray-500">ID: {user._id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-2">
                  <button
                    className="cursor-pointer px-2 py-1 border rounded-md text-sm hover:bg-gray-100"
                    onClick={()=>getUser(user._id)}
                    title="View"
                  >
                    View
                  </button>
                  <Link
                    to={`update-user/${user._id}`}
                    className="cursor-pointer px-2 py-1 border rounded-md text-sm hover:bg-gray-100"
                    title="Edit"

                  >
                    Edit
                  </Link>
                  <button

                    className="cursor-pointer px-2 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                    title="Delete"
                    onClick={()=>DeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

            {/* VIEW */}
        {
            select && 
                <div  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[80%] sm:w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold ">User Details</h3>
                        <button onClick={()=> setSelect(false)} className="text-gray-500 cursor-pointer">✕</button>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <img src={`${user.image}`} alt="avatar"  crossOrigin="anonymous" className="w-20 h-20 rounded-full" loading="lazy"/>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600">Username</span> {user.username}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600">Email</span>: {user.email}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600">Phone</span>: {user.phone}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600">Role</span>: {user.role}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600">CreatedAt</span> {new Date(user.createdAt).toLocaleString()}</div>
                        <div className="text-lg font-medium"><span className="text-sm text-gray-600">UpdatedAt</span> {new Date(user.updatedAt).toLocaleString()}</div>
                    </div>
                </div>
        }

     
    </div>
  );
}

export default AllUsers