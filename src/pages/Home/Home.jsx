import Featured from '../../components/Home/Featured'
import Hero from '../../components/Home/Hero'
import Subscribes from '../../components/Home/Subscribes'
import Products from '../../components/Products/Products'

const Home = () => {
  return (
    <section className='px-4 sm:px-[5vw] md:px-[7vw]  lg:px-[9vw]'>
        <Hero />
        <Products />
        <Featured />
        <Subscribes />
    </section>
  )
}

export default Home