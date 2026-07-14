import React from 'react'
import { Rocket,ArrowRight } from 'lucide-react'

const Cta = () => {

    const scroll_to_pricesection=()=>{
       const p_Section=document.getElementById('pricing_section')
        if(p_Section){
            p_Section.scrollIntoView({behavior:'smooth'})
        }
    }
  return (
        <div className='w-full h-full mt-16 md:mt-24 bg-[#6D8196]'>
        <div className='max-w-7xl w-full h-full mx-auto p-4'>
            <div className='flex flex-col gap-5 justify-center items-center'>
                 <div className="bg-[#4A4A4A]/50 backdrop-blur-md border border-white/10 shadow-[#FFFFE3]/40 shadow-md  flex flex-row items-center gap-4 w-fit px-4 py-1 rounded-full">
                        <Rocket color="#FFFFE3"/>
                        <p className="text-white/80 font-medium text-md">Start Your Journey</p>
                    </div>
                    <h2 className='text-white/80 text-center font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight'>Ready to streamline your projects?</h2>
                    <p className='text-white md:text-lg max-w-md text-base leading-relaxed text-center tracking-wide'>CollabDesk helps you and your team stay organized, collaborate in real-time, and deliver the result</p>
                     <div className="md:flex md:flex-row flex items-center flex-col  gap-3">
                        <button className="group bg-[#FFFFE3] text-[#6D8196] border border-[#6D8196] px-8 py-4 text-md md:text-lg lg:text-xl rounded-md hover:bg-white hover:shadow-lg hover:shadow-black/10 active:scale-98 cursor-pointer transition-all duration-200 flex items-center gap-2">
                            Get Started
                            <ArrowRight className='group-hover:translate-x-2 duration-200 transition-transform'/>
                        </button>
                        <button className="group text-md md:text-lg lg:text-xl px-8 py-4 border border-white/40 rounded-md text-white hover:bg-white/10 hover:border-white hover:shadow-lg active:scale-98 cursor-pointer transition-all duration-200 flex items-center gap-2"
                        onClick={()=>{
                            scroll_to_pricesection()
                        }
                    }
                    >
                            View Pricing
                            <ArrowRight className='group-hover:translate-x-2 duration-200 transition-transform '/>
                        </button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Cta