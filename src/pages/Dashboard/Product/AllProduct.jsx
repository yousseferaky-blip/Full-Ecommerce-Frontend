import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../context/GetProducts";
import { BASE_URL } from "../../../assets/url";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllProduct = () => {
  const { product, setProducts } = useContext(productsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page = 1) => {
    try {
      const res = await axios.get(`${BASE_URL}/product?page=${page}&limit=10`);
      setProducts(res.data.products);
      setTotalPages(Math.ceil(res.data.totalCount / 10));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const DelteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/product/${id}`, { withCredentials: true });
        setProducts(product.filter((item) => item._id !== id));
        toast.success("Product Deleted Successfully!");
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete product!");
      }
    }
  };

  return (
    <section className="p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-normal sm:font-extrabold mb-6">All Products</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Discount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Category</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {product && product.length > 0 ? (
              product.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      crossOrigin="anonymous"
                      loading="lazy"
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold max-w-[200px] break-words">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-[200px] break-words">${item.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-[200px] break-words">${item.discount}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-[200px] break-words">{item.category}</td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      className="cursor-pointer px-3 py-1 mr-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      to={`update-product/${item._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="cursor-pointer mt-1 px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      onClick={() => DelteProduct(item._id)}
                    >
                      Delete
                    </button>
                    <Link
                      className="cursor-pointer mt-1 ml-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      to={`/product/${item._id}`}
                    >
                      Show
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-center flex-wrap gap-3 mt-6 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="cursor-pointer px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">Page {currentPage} of {totalPages >= 1 ? totalPages: 0  }</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="cursor-pointer px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AllProduct;
