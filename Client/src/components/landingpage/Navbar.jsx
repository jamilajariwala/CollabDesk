import React, { useState } from 'react'
import {Menu, X} from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar=()=>{

    const [isOpen,SetisOpen]=useState(false)

    return(
        <div className='bg-white/60 backdrop-blur-lg shadow-xl p-4 w-full fixed top-0 z-50 border-b border-white/30'>
            <div className='flex justify-between items-center relative max-w-7xl mx-auto px-2'>
                <div>
                    <h1 className='text-xl md:text-2xl font-bold font-logo tracking-wide'>
                        CollabDesk
                    </h1>
                </div>
                <div>
                    <div className='md:hidden cursor-pointer' onClick={()=>{SetisOpen(!isOpen)}}>

                    {
                        isOpen?<X />:<Menu/>
                    }
                    </div>
                   <ul className={`list-none text-md 
                ${isOpen? 'flex flex-col top-11 right-0 bg-white/80 backdrop-blur-md shadow-lg  absolute border w-40 text-center rounded-lg border-[#E5E7EB] gap-2 p-2':'max-md:hidden' }
                md:text-lg md:flex md:flex-row md:static md:gap-4 
                lg:text-xl lg:gap-6`}>
                    <li className='cursor-pointer transition-colors duration-200 hover:text-[#6D8196]'><Link to="/">Home</Link></li>
                    <li className='cursor-pointer transition-colors duration-200 hover:text-[#6D8196]'>About</li>
                    <li className='cursor-pointer transition-colors duration-200 hover:text-[#6D8196]'><a href="#feature_section">Feature</a></li>
                    <li className='cursor-pointer transition-colors duration-200 hover:text-[#6D8196]'><a href="#pricing_section">Price</a></li>
                    <li className='md:hidden cursor-pointer transition-colors duration-200 text-[#4d4d4d] hover:text-[#6D8196]'>
                        <Link to="/login">login</Link></li>
                    <li className='md:hidden'>
                        <Link to="/register">
                        <button className='active:scale-98 text-md md:text-lg lg:text-xl bg-[#6D8196] text-white px-2 py-1 rounded-md hover:bg-[#5C7087] hover:shadow-md cursor-pointer transition-colors duration-200'> 
                        Get Started
                    </button>
                    </Link>
                    </li>
                </ul>
                </div>
                <div className='max-md:hidden md:static md:flex justify-between items-center gap-6 md:text-lg lg:text-xl lg:gap-8'>
                    <ul className='list-none'>
                        <li className='cursor-pointer transition-colors duration-200 hover:text-[#6D8196]'><Link to="/login">login</Link></li>
                    </ul>
                    <Link to="/register">
                    <button className='active:scale-98 transition-all duration-200 text-md md:text-lg lg:text-xl bg-[#6D8196] text-white px-6 py-2 rounded-md hover:bg-[#5C7087] hover:shadow-md cursor-pointer '> 
                        Get Started
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar