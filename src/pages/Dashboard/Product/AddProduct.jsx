import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../assets/url";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("price", price)
    formData.append("discount", discount)
    formData.append("category", category)
    formData.append("brand", brand)
    formData.append("description", description)
    
    if(image) { formData.append("image", image) }

    images.forEach((img)=>{ formData.append("images", img); })


    await axios.post(`${BASE_URL}/product`, formData , { withCredentials: true });
    toast.success("Product uploaded successfully!");

    setTitle(""); setPrice(""); setDiscount(""); setCategory(""); setBrand(""); setDescription(""); setImage(null); setImages([]);  
    navigate("/dashboard/products")
    window.location.reload()
  } catch(err) {
    console.log(err.response ? err.response.data : err)
  }
}


  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-normal sm:font-extrabold mb-6">Add New Product</h2>
      <form className="space-y-6 bg-white p-6 rounded-lg shadow">
        

        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Discount</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter discount"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Enter brand"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          />
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:border file:border-gray-300 file:rounded-lg file:text-sm file:bg-gray-100
              hover:file:bg-gray-200"
            required
          />
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">Gallery Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
             onChange={(e) => {
              const selectedFiles = Array.from(e.target.files); 
              setImages(prev => [...prev, ...selectedFiles]); 
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:border file:border-gray-300 file:rounded-lg file:text-sm file:bg-gray-100
              hover:file:bg-gray-200"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white cursor-pointer px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Product
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
