import React from 'react'
import {ChevronRight} from 'lucide-react'
import { RiLinkedinLine } from "react-icons/ri";
import { FiGithub } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <div className='mt-16 md:mt-24 bg-[#4A4A4A]'>
        <div className='w-full max-w-7xl p-4 mx-auto'>
            <div className='p-4 grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 justify-items-center'>
                <div className='max-md:hidden'>
                    <h2 className='md:text-2xl lg:text-3xl text-center tracking-tight text-white font-bold'>CollabDesk</h2>
                    <p className='text-md text-white/70 text-left tracking-normal leading-relaxed'>
                        CollabDesk is the modern project management platform that hepls freelancer plan, collaborate and deliver project efficiently.
                    </p>
                </div>
                <div>
                    <div className='pl-4'>
                        <div className='h-1 rounded-full bg-[#2773ba] w-8 border-white/20 border'></div>
                    <h3 className='text-white font-medium tracking-wide text-sm uppercase mt-2'>Features</h3>
                    </div>
                    <ul className=' text-white/70 leading-relaxed  select-none flex flex-col gap-1 mt-2'>
                        <li>
                            <a href='#feature_section' className='relative flex items-center cursor-pointer group'>
                                <ChevronRight size={15} color="#2773ba" className='opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-200 '/>
                                <span className='group-hover:text-white group-hover:translate-x-2 transition-all duration-200'>Features</span>
                            </a>
                        </li>
                         <li>
                            <a href='#howitworks_section' className='flex items-center cursor-pointer group'>
                                <ChevronRight size={15} color="#2773ba" className='opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-200'/>
                                <span className='group-hover:text-white group-hover:translate-x-2 transition-all duration-200'>How it Works</span>
                            </a>
                        </li>
                         <li>
                            <a href='#pricing_section' className='flex group items-center cursor-pointer'>
                                <ChevronRight size={15} color="#2773ba" className='opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-200'/>
                                <span className='group-hover:text-white group-hover:translate-x-2 transition-all duration-200'>Pricing</span>
                            </a>
                        </li>
                        
                    </ul>
                </div>
                <div>
                    <div className='pl-4'>
                        <div className='h-1 rounded-full bg-[#2773ba] w-8 border-white/20 border'></div>
                        <h3 className='text-white font-medium tracking-wide text-sm uppercase mt-2'>About</h3>
                    </div>
                   <ul className=' text-white/70 leading-relaxed  select-none flex flex-col gap-1 mt-2'>
                        <li >
                            <a className='relative flex group items-center cursor-pointer'>
                                <ChevronRight size={15} color="#2773ba" className='opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-200 '/>
                                <span className='group-hover:text-white group-hover:translate-x-2 transition-all duration-200'>About</span>
                            </a>
                        </li>
                    </ul>
                </div>
                 <div>
                    <div className='pl-4'>
                        <div className='h-1 rounded-full bg-[#2773ba] w-8 border-white/20 border'></div>
                        <h3 className='text-white font-medium tracking-wide text-sm uppercase mt-2'>Contact</h3>
                    </div>
                   <ul className=' text-white/70 leading-relaxed  select-none flex flex-col gap-1 mt-2'>
                        <li>
                            <a className='relative flex items-center group cursor-pointer'>
                                <ChevronRight size={15} color="#2773ba" className='opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-200 '/>
                                <span className='group-hover:text-white group-hover:translate-x-2 transition-all duration-200'>Contact</span>
                            </a>
                        </li>
                    </ul>
                </div>
                 <div className='flex flex-col gap-1 max-sm:hidden'>
                    <div>
                        <div className='h-1 rounded-full bg-[#2773ba] w-8 border-white/20 border max-sm:hidden'></div>
                        <h3 className='text-white font-medium tracking-wide text-sm uppercase mt-2'>Connect with Us</h3>
                    </div>
                   <div className='flex flex-row gap-3'>
                    <a href="https://www.linkedin.com/in/jamilajariwala-dev" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center p-3 rounded-full text-white bg-white/5 border border-white/10 hover:text-[#0A66C2] hover:bg-white hover:shadow-[#0A66C2] hover:shadow-md hover:-translate-y-1 transition-all duration-300'>
                        <RiLinkedinLine  size={20}/>
                    </a>
                    <a href="https://github.com/jamilajariwala" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center p-3 rounded-full text-white bg-white/5 border border-white/10 hover:text-[#0A66C2] hover:bg-white hover:shadow-[#0A66C2] hover:shadow-md hover:-translate-y-1 transition-all duration-300'>
                        <FiGithub size={20}/>
                    </a>
                    <a href="mailto:shabbirjarivala@gmail.com" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center p-3 rounded-full text-white bg-white/5 border border-white/10 hover:text-[#0A66C2] hover:bg-white hover:shadow-[#0A66C2] hover:shadow-md hover:-translate-y-1 transition-all duration-300'>
                        <HiOutlineMail size={20}/>
                    </a>
                   </div>
                </div>
            </div>
        </div>
         <div className='flex flex-col justify-center items-center gap-2 p-2 sm:hidden'>
                    <div>
                        <div className='h-1 rounded-full bg-[#2773ba] w-8 border-white/20 border max-sm:hidden'></div>
                        <h3 className='text-white font-medium tracking-wide text-sm uppercase mt-2'>Connect with Us</h3>
                    </div>
                   <div className='flex flex-row gap-3'>
                    <a href="https://www.linkedin.com/in/jamilajariwala-dev" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center p-3 rounded-full text-white bg-white/5 border border-white/10 hover:text-[#0A66C2] hover:bg-white hover:shadow-[#0A66C2] hover:shadow-md hover:-translate-y-1 transition-all duration-300'>
                        <RiLinkedinLine  size={20}/>
                    </a>
                    <a href="https://github.com/jamilajariwala" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center p-3 rounded-full text-white bg-white/5 border border-white/10 hover:text-[#0A66C2] hover:bg-white hover:shadow-[#0A66C2] hover:shadow-md hover:-translate-y-1 transition-all duration-300'>
                        <FiGithub size={20}/>
                    </a>
                    <a href="mailto:shabbirjarivala@gmail.com" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center p-3 rounded-full text-white bg-white/5 border border-white/10 hover:text-[#0A66C2] hover:bg-white hover:shadow-[#0A66C2] hover:shadow-md hover:-translate-y-1 transition-all duration-300'>
                        <HiOutlineMail size={20}/>
                    </a>
                   </div>
                </div>
        <div className='bg-[#5a5a5a] text-center p-4 border-t border-white/60'>
            <p className='text-white text-xs md:text-sm'>@2026 CollabDesk. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer