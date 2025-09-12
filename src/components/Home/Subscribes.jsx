
const Subscribes = () => {
  return (
    <section className='flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14 mt-16'>
        <h1 className='text-[#374151] md:text-4xl text-2xl font-medium'>Subscribe now & get 20% off</h1>
        <p className='md:text-base text-gray-500/80 pb-8'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        
        <div className='flex items-center max-w-2xl w-full md:14 h-12'>
            <input className='border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' placeholder='Entet Your Email Id'/>
            <button className='bg-orange-600 h-full px-8 md:px-12 text-xl text-white rounded-md rounded-l-none'>Subscribe</button>
        </div>

    </section>
  )
}

export default Subscribes