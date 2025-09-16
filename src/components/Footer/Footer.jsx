import img from '../../assets/images/logo.83ad3901.svg'

const Footer = () => {
  return (
    <footer className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-6 mt-14'>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-8">
        
        <div className='flex flex-col items-start'>
          <img src={img} className="w-32 mb-4" alt='Footer Image' loading='lazy'/>
          <p className='text-sm text-gray-700'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.          </p>
        </div>


        <div className='flex flex-col md:items-center md:text-center'>
          <h2 className='font-semibold text-lg mb-2'>Company</h2>
          <ul className='space-y-1 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>


        <div className='flex flex-col md:items-center md:text-center'>
          <h2 className='font-semibold text-lg mb-2'>Get in touch</h2>
          <ul className='space-y-1 text-gray-600'>
            <li>+1-234-567-870</li>
            <li>contact@greatstack.dev</li>
          </ul>
        </div>

      </div>

        <p className='mt-4 py-4 text-center text-xs md:text-sm text-gray-700 border-t-2 border-gray-200'>
            Copyright 2025 © YoussefEraky.dev All Right Reserved.
        </p>

    </footer>
  )
}

export default Footer
