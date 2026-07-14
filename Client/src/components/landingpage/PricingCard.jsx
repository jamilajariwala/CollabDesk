import React from 'react'
import { IndianRupee,Check } from 'lucide-react';

const PricingCard = ({items}) => {
  return (
        <div className={`h-full w-full max-w-md py-4 flex flex-col gap-8 items-center bg-white/60 shadow-md rounded-xl backdrop-blur-md border-4 ${items.bordercolor} h group hover:border-gray-300 hover:shadow-lg`}>
            <div className={`p-4 rounded-full shadow-lg ${items.color}`}>
                {items.icon}
            </div>
            <div className='flex flex-col gap-4'>
                <div>
                    <h2 className='text-2xl font-bold'>{items.plannm}</h2>
                    <p className='text-lg leading-tight'>{items.heading}</p>
                </div>
                <div className='flex items-baseline'>
                    <span className='text-xl self-start font-bold mr-0.5 mt-1'>
                        <IndianRupee size="20px" strokeWidth="3"  />
                    </span>
                    <span className='text-4xl font-extrabold tracking-tighter'>
                        {items.price}
                    </span>
                    <span className='ml-1 font-medium text-[#6D8196] '>
                        /month
                    </span>
                    
                </div>
                
                {
                    items.featuresprovided.map((item,index)=>{
                    return (<div className='flex items-start max-w-70 w-full gap-3' key={index}>
                        <span>
                            <Check color='#057ceb'/>
                        </span>
                        <span className='text-lg w-full wrap-break-word'>
                            {item}
                        </span>   
                    </div>)
                    })
                }
                <div className='flex flex-row justify-center items-center'>
                    <button className='text-md md:text-lg lg:text-xl text-[#6D8196] px-6 py-2 rounded-md border border-[#6D8196] hover:text-white hover:bg-[#6D8196] hover:shadow-md group-hover:scale-105 cursor-pointer transition-all duration-200 w-full'>{items.btntext}</button>
                </div>
            </div>
        </div>

    
  )
}

export default PricingCard