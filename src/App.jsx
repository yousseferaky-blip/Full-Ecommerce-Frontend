import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Product from './components/Products/Product'
import AllProducts from './pages/Products/AllProducts'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import Cart from './pages/Cart/Cart'
import Wishing from './pages/Wishing/Wishing'
import PublicLayout from './Layout/PublicLayout'
import DashboardLayout from './Layout/DashboardLayout'
import ProtectedRoute from './Layout/ProtectedRoute'
import AllProduct from './pages/Dashboard/Product/AllProduct'
import AddProduct from './pages/Dashboard/Product/AddProduct'
import UpdateProduct from './pages/Dashboard/Product/UpdateProduct'
import AllUsers from './pages/Dashboard/User/AllUsers'
import UpdateUser from './pages/Dashboard/User/UpdateUser'
import ForgotPassword from './pages/ForgetPassword/ForgotPassword'
import ResetPassword from './pages/ForgetPassword/ResetPassword'
import Wish from './pages/Dashboard/Wishing/Wish'
import Order from './pages/Dashboard/Cart/Order'
import Comment from './pages/Dashboard/Comment/Comment'
import OverView from './pages/Dashboard/OverView/OverView'

function App() {

  return (
    <>
      <Routes>
      {/* Dashboard Layout  */}

        <Route element={<ProtectedRoute allowedRoles={"admin"}/>}>
          <Route path='/dashboard' element={<DashboardLayout />}>

            <Route path='/dashboard' element={<OverView />}/>
            
          {/* PRODUCTS */}
            <Route path='products' element={<AllProduct />}/>
            <Route path='products/add-product' element={<AddProduct />}/>
            <Route path='products/update-product/:id' element={<UpdateProduct />}/>
            
            {/* USERS  */}
            <Route path='users' element={<AllUsers />}/>
            <Route path='users/update-user/:id' element={<UpdateUser />}/>
           
            {/* WISHING  */}
            <Route path='Wish' element={<Wish />}/>

            {/* CARTS  */}
            <Route path='carts' element={<Order />}/>
            
            {/* COMMENTS  */}
            <Route path='comments' element={<Comment />}/>

          </Route>
        </Route>

      {/* Public Layout  */}

        <Route path='/' element={<PublicLayout />}>
          <Route index element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/wishing' element={<Wishing />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
          <Route path='/reset-password' element={<ResetPassword />}/>
          <Route path='/products' element={<AllProducts />}/>
          <Route path='/product/:id' element={<Product />}/>
        </Route>
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
