import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative'>
      <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block' />
      <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden' />

      {/* Banner Text */}
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-16 lg:pl-24'>
        <h1 className='font-bold text-3xl md:text-5xl text-center md:text-left'>
          Groceries at the Speed of Rush...
        </h1>

        {/* Buttons */}
        <div className='flex items-center mt-6 gap-4'>
          <Link to={"/products"} className='flex items-center gap-2 px-6 py-2 md:px-9 md:py-3 bg-primary hover:bg-primary-dull transition rounded text-white text-sm md:text-base'>
            Shop now
            <img src={assets.white_arrow_icon} alt="arrow" className='md:hidden w-4 h-4 transition group-hover:translate-x-1' />
          </Link>

          <Link to={"/products"} className='hidden md:flex items-center gap-2 px-9 py-3 bg-gray-200 hover:bg-gray-300 transition rounded text-black text-sm md:text-base'>
            Explore deals
            <img src={assets.black_arrow_icon} alt="arrow" className='w-4 h-4 transition group-hover:translate-x-1' />
          </Link>
        </div>
      </div>
    </div>


  )
}

export default MainBanner