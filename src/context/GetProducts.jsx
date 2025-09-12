import { createContext, useEffect, useState } from 'react'
import { BASE_URL } from '../assets/url';
import axios from 'axios';
export const productsContext = createContext({})

const GetProducts = ({children }) => {
    const [product,setProducts] = useState([])
    
    const AllProduct = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/product`);
            setProducts(res.data.products);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        AllProduct();
    }, []);

  return (
    <productsContext.Provider value={{product,setProducts}}>
        {children }
    </productsContext.Provider>
  )
}

export default GetProducts