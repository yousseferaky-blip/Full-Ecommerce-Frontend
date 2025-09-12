import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import GetProducts from './context/GetProducts.jsx'
import { Toaster } from 'react-hot-toast'
import UserContextProvider from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UserContextProvider >
      <GetProducts>
        <Toaster position="top-center" />
        <App />
      </GetProducts>
    </UserContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
