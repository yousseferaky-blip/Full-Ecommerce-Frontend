import img1 from "../../assets/images/fea1.png"
import img2 from "../../assets/images/fea2.png"
import img3 from "../../assets/images/fea3.png"
import img4 from "../../assets/images/fea4.png"
import img5 from "../../assets/images/fea5.png"

const Featured = () => {
    const data=[
        {
            dis:"Unparalleled Sound",
            tit:"Experience crystal-clear audio with premium headphones.",
            img:img1
        },
        {
            dis:"Stay Connected",
            tit:"Compact and stylish earphones for every occasion.",
            img:img2
        },
        {
            dis:"Power in Every Pixel",
            tit:"Shop the latest laptops for work, gaming, and more.",
            img:img3
        },
    ]
  return (
    <section className='mt-16 py-2'>

        <div className='flex flex-col items-center '>
            <h1 className='text-3xl text-[#374151] font-medium  '>Featured Products</h1>
            <div className='w-28 h-0.5 bg-orange-600 mt-2'></div>
        </div>

        <div className="relative text-center place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-16">
            {data.map((d,i)=>(
                <div key={i} className="relative w-44">

                    <img className="hover:brightness-100  duration-300 translate-0.5 w-full h-auto object-cover" src={d.img} alt={d.tit} loading='lazy'/>
                    
                    <div className="hover:transform hover:-translate-y-5 duration-300 absolute inset-0 flex flex-col justify-start items-center text-white p-4">
                        <p className="font-medium text-xl md:text-2xl">{d.dis}</p>
                        <p className="text-sm lg:text-base leading-5 max-w-60">{d.tit}</p>
                        <button className="flex items-center gap-1.5 bg-orange-600 mt-2 cursor-pointer px-4 py-2 rounded">Buy now </button>
                    </div>
                </div>
            ))}
        </div>


        <div className="bg-[#E6E9F2] mt-16 flex flex-col md:flex-row items-center justify-between overflow-hidden">
            <img className="max-w-65 object-cover h-auto" src={img4} alt="image feature" loading='lazy'/>
            <div className="flex flex-col gap-4 items-center justify-center text-center space-y-2 px-4 md:px-0">
                <h2 className="text-2xl text-[#374151] md:text-3xl font-semibold max-w-[290px]">Level Up Your Gaming Experience</h2>
                <p className="max-w-[343px] font-medium text-gray-800/60">From immersive sound to precise controls— everything you need to win</p>
                <button className="cursor-pointer flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white">Buy now</button>
            </div>
            <img className="max-w-80 object-cover h-auto" src={img5} alt="image feature" loading='lazy'/>
        </div>   

        
    </section>
  )
}

export default Featured