import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../assets/url";

const UpdateProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/product/${id}`);
        setProduct(res.data.product);
        setTitle(res.data.product.title);
        setPrice(res.data.product.price);
        setDiscount(res.data.product.discount);
        setCategory(res.data.product.category);
        setDescription(res.data.product.description);
        setBrand(res.data.product.brand);
        setImage(res.data.product.image)
        setImages(res.data.product.images || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("description", description);

      if (image) formData.append("image", image);
      images.forEach((img) => formData.append("images", img));

      await axios.put(`${BASE_URL}/product/${id}`, formData, {
        withCredentials: true,
      });
      toast.success("Product updated successfully!");
      setProduct("");
        setTitle("");
        setPrice("");
        setDiscount("");
        setCategory("");
        setDescription("");
        setBrand("");
        setImage(null)
        setImages([]);
        navigate("/dashboard/products")
        window.location.reload()
    } catch (err) {
      console.log(err.response ? err.response.data : err);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-normal sm:font-extrabold mb-6">Update Product</h2>
      <form className="space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          className= "cursor-pointer bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Update Product
        </button>
      </form>
    </section>
  );
};

export default UpdateProduct;
