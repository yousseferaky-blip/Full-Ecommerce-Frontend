import img1 from '../../assets/images/hero1.png'
import   './Hero.css'
import img2 from '../../assets/images/hero2.png'
import img3 from '../../assets/images/hero3.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const Hero = () => {
  const data = [
    {
      dis: "Limited Time Offer 30% Off",
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      img: img1
    },
    {
      dis: "Exclusive Deal 40% Off",
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      img: img2
    },
    {
      dis: "Hurry up only few lefts!",
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      img: img3
    },
  ]

  return (
    <section className='bg-[#E6E9F2] py-8 rounded-xl md:px-14 px-5 mt-6'>
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Autoplay,Pagination]}
        autoplay={{
            delay: 1000, 
            disableOnInteraction: true, 
        }}
        loop={true} 
        className="mySwiper"
      >
        {data.map((d, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col md:flex-row items-center justify-between">

              <div className="md:w-lg text-left space-y-4">
                <p className="text-base text-orange-600">{d.dis}</p>
                <h1 className="text-2xl md:text-4xl font-semibold leading-snug text-[#374151]">{d.title}</h1>
                <button className="bg-orange-600 text-white px-6 py-2 rounded-full">
                  Shop Now
                </button>
              </div>

              <div className="w-1/2 md:w-1/4 flex justify-center mt-6 md:mt-0">
                <img src={d.img} alt="hero" className="max-h-72 object-contain" loading='lazy'/>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </section>
  )
}

export default Hero
