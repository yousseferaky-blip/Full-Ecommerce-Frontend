import img from '../../assets/images/about.png'
import Subscribes from '../../components/Home/Subscribes'

const About = () => {
  return (
    <section className='px-4 sm:px-[5vw] md:px-[7vw]  lg:px-[9vw]'>
        
        <div className='flex text-center text-2xl items-center justify-center pt-8'>
            <p className='text-gray-500 uppercase'>about
                <span className='ml-1 text-gray-700 font-medium'>us</span>
            </p>
            <p className='ml-4 w-12 h-[2px] bg-gray-700'></p>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-16 '>
            <img className='w-full md:max-w-[450px] h-auto' src={img} alt='About Images ' loading='lazy'/>
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                <b className='text-gray-800'>Our Mission</b>
                <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
            </div>
        </div>

        <div>

            <div className='flex text-2xl items-center justify-start pt-8'>
                <p className='text-gray-500 uppercase'>WHY 
                    <span className='ml-1 text-gray-700 font-medium'>CHOOSE US</span>
                </p>
                <p className='ml-4 w-12 h-[2px] bg-gray-700'></p>
            </div>

            <div className='flex flex-col md:flex-row  text-sm mb-20 mt-6 ' >
                <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance:</b>
                    <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
                </div>
                <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience:</b>
                    <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
                </div>
                <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
                </div>
            </div>

        </div>


        <Subscribes />

    </section>
  )
}

export default About