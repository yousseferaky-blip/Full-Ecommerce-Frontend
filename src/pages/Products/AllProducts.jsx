import { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../assets/url'
import { FaHandPointRight, FaHeart, FaStar } from 'react-icons/fa6'
import { CiStar } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../../context/UserContext'
import toast from 'react-hot-toast'

const AllProducts = () => {
  const { user } = useContext(userContext)
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrandies, setSelectedBrandies] = useState([])
  const [sortOption, setSortOption] = useState("relavent")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  useEffect(() => {
    fetchProducts()
  }, [currentPage, selectedCategories, selectedBrandies, sortOption])

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product`, {
        params: {
          page: currentPage,
          limit: 10, 
          categories: selectedCategories.join(','), 
          brands: selectedBrandies.join(','), 
          sort: sortOption
        },
        withCredentials: true
      })

      setProducts(res.data.products)
      setTotalPages(res.data.totalPages || 1)


      if (res.data.products.length > 0) {
        setCategories([...new Set(res.data.products.map(p => p.category))])
        setBrands([...new Set(res.data.products.map(p => p.brand))])
      }

    } catch (err) {
      console.log(err)
    } finally {
        setLoading(false); 
      }
  }

  const handleCategoryChange = (cat) => {
    let updatedCategories
    if (selectedCategories.includes(cat)) {
      updatedCategories = selectedCategories.filter(c => c !== cat)
    } else {
      updatedCategories = [...selectedCategories, cat]
    }
    setSelectedCategories(updatedCategories)
    setCurrentPage(1) 
  }

  const handleBrandChange = (brand) => {
    let updatedBrandies
    if (selectedBrandies.includes(brand)) {
      updatedBrandies = selectedBrandies.filter(b => b !== brand)
    } else {
      updatedBrandies = [...selectedBrandies, brand]
    }
    setSelectedBrandies(updatedBrandies)
    setCurrentPage(1)
  }

  const handleSort = (e) => {
    setSortOption(e.target.value)
    setCurrentPage(1)
  }

  const AddToWish = async (productId) => {
    try {
      if (!user) {
        toast.error("يجب ان تسجل دخول قبل ذلك")
        return
      }
      await axios.post(`${BASE_URL}/wish/add`,
        {
          userId: user._id,
          productId: productId
        }, { withCredentials: true })
      toast.success("Product Added To Wishing")
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return <p className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>Loading...</p>; 
  }

  return (
    <section className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
      <div className='grid md:grid-cols-3 grid-cols-1 items-start gap-4 mt-16'>

        {/* FILTERS LEFT */}

        <div className="col-span-1 p-4">

          <p className='my-2 text-xl cursor-pointer uppercase flex items-center gap-5'>
            Filter
            <FaHandPointRight
              onClick={() => setActive(!active)}
              className={`text-gray-700 md:hidden flex duration-300 ${active && "rotate-180"}`}
            />
          </p>

          {/* FILTER CATEGORIES */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${active ? "block" : "hidden"} md:block`}>
            <p className='my-2 text-xl cursor-pointer uppercase'>CATEGORIES</p>
            {categories.map((category, index) => (
              <div key={index} className='text-gray-700 first-letter:uppercase'>
                <p className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    className='w-3'
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </p>
              </div>
            ))}
          </div>

          {/* FILTER BRANDS */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${active ? "block" : "hidden"} md:block`}>
            <p className='my-2 text-xl cursor-pointer uppercase'>BRAND</p>
            {brands.map((bra, index) => (
              <div key={index} className='text-gray-700 first-letter:uppercase'>
                <p className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    className='w-3'
                    value={bra}
                    checked={selectedBrandies.includes(bra)}
                    onChange={() => handleBrandChange(bra)}
                  />
                  {bra}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FILTERS RIGHT */}

        <div className="col-span-2 p-4">
          
          <div className='flex justify-between items-center flex-wrap gap-5'>
            <div className='flex text-2xl justify-center items-center '>
              <p className='text-gray-500 uppercase'>ALL
                <span className='ml-1 text-gray-700 font-medium'>Products</span>
              </p>
              <p className='ml-4 w-12 h-[2px] bg-gray-700'></p>
            </div>

            <select value={sortOption} onChange={handleSort} className='border-2 border-gray-300 text-sm p-2'>
              <option value={"relavent"}>Sort by: Relavent</option>
              <option value={"low-high"}>Sort by: Low to High</option>
              <option value={"high-low"}>Sort by: High to Low</option>
            </select>
          </div>

          {/* PRODUCTS */}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {products.map((d) => (
              <div key={d._id} className="relative rounded-lg flex flex-col items-center">
                <div className="p-4 bg-[#E6E9F2] cursor-pointer relative rounded-lg w-full h-52 flex items-center justify-center">
                  <img
                    src={d.image}
                    alt={d.title}
                    crossOrigin="anonymous"
                    loading='lazy'
                    className="w-4/5 h-4/5 object-cover md:w-full md:h-full transition hover:scale-105 "
                  />
                </div>
                <p className="w-full font-medium md:text-base pt-2 truncate">{d.title}</p>
                <p className="w-full text-xs text-gray-500/70 hidden md:block md:text-base p-b-2 truncate">{d.description}</p>
                <div className="w-full mb-2 flex items-center gap-2">
                  <p className="text-xs">4.6</p>
                  <div className="flex items-center gap-0.5 text-yellow-400 ">
                    <FaStar /><FaStar /><FaStar /><FaStar /><CiStar />
                  </div>
                </div>
                <div className="w-full flex  flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                  <p className="text-base font-medium">${d.price}</p>
                  <Link to={`/product/${d._id}`} className="sm:block px-4 py-1.5 cursor-pointer text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-100 transition">Buy now</Link>
                </div>

                <button onClick={() => AddToWish(d._id)} className='absolute p-2 top-1 right-1 text-black hover:text-red-600 bg-white rounded-full cursor-pointer'>
                  <FaHeart size={16} />
                </button>
              </div>
            )) }
          </div>

          {/* PAGINATION */}

          <div className="flex justify-center items-center flex-wrap mt-8 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="cursor-pointer  px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`cursor-pointer  px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-gray-700 text-white" : ""}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="cursor-pointer px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

        </div>
      
      </div>
    </section>
  )
}

export default AllProducts
