import React from "react";
import { Rocket,ArrowRight } from "lucide-react";

const Hero=()=>{
    return(
        <div className="p-4">
            <div className="w-full max-w-7xl mx-auto mt-16 flex flex-col gap-10 md:mt-24 md:flex md:flex-row md:gap-2">
                <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
                    <div className="max-md:hidden bg-white/80 flex flex-row items-center gap-4 border border-[#4A4A4A]/30 w-fit px-4 py-1 rounded-full">
                        <Rocket color="#057ceb"/>
                        <p className="text-[#6D8196] font-medium text-lg">Built for Freelancers</p>
                    </div>
                    <div className="max-w-3xl ">
                        <h1 className="text-black/80 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl ">Collaborate Better.</h1>
                        <h1 className="text-black/80 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">Deliver Faster.</h1>
                    </div>
                    <div className="max-w-lg">
                        <p className="text-md md:text-lg lg:text-xl text-[#6D8196] ">
                            Manage projects, invite teammates, invite clients, share files, assign tasks, communicate in real time- all from single workspace built for freelancers.
                        </p>
                    </div>
                    <div className="flex flex-row  gap-3">
                        <button className="bg-[#6D8196] group text-white px-6 py-2 text-md md:text-lg lg:text-xl active:scale-98 rounded-md hover:bg-[#5C7087] hover:shadow-md cursor-pointer transition-all duration-200 flex items-center gap-2">
                            Get Started
                            <ArrowRight className="group-hover:translate-x-2 duration-200 transition-transform"/>
                        </button>
                        <button className="group text-md md:text-lg lg:text-xl px-6 py-2 border border-[#6D8196] rounded-md active:scale-98 text-[#6D8196] hover:bg-[#6D8196] hover:text-white hover:shadow-md cursor-pointer transition-all duration-200 flex items-center gap-2">
                            Watch Demo
                            <ArrowRight className="group-hover:translate-x-2 duration-200 transition-transform"/>
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-1/2">2</div>
            </div>
        </div>
    )
}

export default Hero
