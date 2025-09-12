import Navbar from '../components/Navbar/PublicNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const PublicLayout = () => {
  return (
    <section>
        <Navbar />
        <Outlet />
        <Footer />
    </section>
  )
}

export default PublicLayout
