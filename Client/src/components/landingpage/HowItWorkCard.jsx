import React from 'react'

const HowItWorkCard = ({item}) => {
  return (
    <div>
        <div className={`w-full h-full p-10 max-md:pb-20 md:pr-10 md:pl-10 bg-[#CBCBCB]/40 relative transition-all duration-300 hover:translate-x-2 max-sm:[clip-path:polygon(0%_0%,99%_0%,100%_56%,48%_100%,0%_55%)] ${item.polygon}`}>
        <div className='absolute top-3 left-3'>
            <p className={`${item.tcolor} font-medium text-3xl`}>0{item.no}</p>
        </div>
        <div className='flex flex-row justify-center items-start gap-5'>
        <div className={`shrink-0 ${item.bcolor} p-2 rounded-full`}>
            {item.icon}
        </div>
        <div>
            <h2 className='font-medium text-black text-xl '>{item.heading}</h2>
           <p className='text-[#6D8196] text-md leading-relaxed'>{item.description  }</p>
        </div>
        </div>
    </div>
    </div>
  )
}

export default HowItWorkCard