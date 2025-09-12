import img from '../../assets/images/contact.png'
import Subscribes from '../../components/Home/Subscribes'

const Contact = () => {
  return (
    <section className='px-4 sm:px-[5vw] md:px-[7vw]  lg:px-[9vw]'>

        <div className='flex text-2xl items-center justify-center pt-8'>
                <p className='text-gray-500 uppercase'>CONTACT  
                    <span className='ml-1 text-gray-700 font-medium'>US</span>
                </p>
                <p className='ml-4 w-12 h-[2px] bg-gray-700'></p>
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
            <div>
                <img className='w-full md:max-w-[480px]' src={img} alt='Image Contact' loading='lazy'/>
            </div>

            <div className='flex flex-col justify-center items-start gap-6'>
                <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                <p className=' text-gray-500'>54709 Willms Station <br/>Suite 350, Washington, USA</p>
                <p className=' text-gray-500'>Tel: (415) 555-0132 <br/>Email: admin@forever.com</p>
                <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
                <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
                <button className='border border-black cursor-pointer px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
            </div>

        </div>

        <Subscribes />

    </section>
  )
}

export default Contact