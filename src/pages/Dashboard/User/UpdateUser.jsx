import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/url";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const {id} = useParams()  
  const navigate = useNavigate()
  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState([]);
  const [role, setRole] = useState([]);
  const [phone, setPhone] = useState([]);
  const [image, setImage] = useState(null);

  const getUser = async (e) =>{
      try{
          const res = await axios.get(`${BASE_URL}/user/getUser/${id}`,{withCredentials:true})
          setUsername(res.data.info.username)
          setEmail(res.data.info.email)
          setRole(res.data.info.role)
          setPhone(res.data.info.phone)
          setImage(res.data.info.image);
      }catch(err){
          console.log(err)
      }
  }

  useEffect(()=>{
    getUser()
  },[])

  const handleSubmit = async (e) => {
     e.preventDefault();
    try{
        const formData = new FormData()
        formData.append("username",username)
        formData.append("email",email)
        formData.append("role",role)
        formData.append("phone",phone)
        if(image){
            formData.append("image",image)
        }

        await axios.put(`${BASE_URL}/user/update/${id}`, formData ,{withCredentials: true,})
        toast.success("User Updated Successfully!")
        navigate("/dashboard/users")
        window.location.reload()
    }catch(err){
        console.log(err)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-normal sm:font-extrabold mb-4 text-center">Update User</h2>

        <form  className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
          
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e)=>setImage(e.target.files[0])}
              className="cursor-progress mt-1 w-12 h-12 border rounded-full flex items-center justify-center  focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={role}
              onChange={(e)=>setRole(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="cursor-pointer w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
