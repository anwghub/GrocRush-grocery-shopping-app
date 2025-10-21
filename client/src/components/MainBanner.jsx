import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative'>
        <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block' />
        <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden' />
        <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24 font-bold text-4xl'>
            <h1>Freshness you can trust, Savings you will love.</h1>
        </div>

        <div className='flex items-center mt-6 font-medium'>
            <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>  
            Shop now
            <img src={assets.white_arrow_icon} alt="arrow" className='md:hidden transition group-focus:translate-x-1 cursor-pointer' /> 
            </Link>

             <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>  
             Explore deals
            <img src={assets.black_arrow_icon} alt="arrow" className=' transition group-focus:translate-x-1 ' /> 
            </Link>
        </div>
    </div>
  )
}

export default MainBanner