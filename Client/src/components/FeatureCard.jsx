import React from "react";


const FeatureCard=({item})=>{
    return(
        <div className="h-full w-full md:max-w-lg p-6">
        <div className="h-full flex flex-row justify-center items-start gap-4 px-6 py-6  border-t-8 rounded-b-xl shadow-md group

        transition-all duration-400 hover:bg-white/80 hover:shadow-lg hover:translate-y-1

        bg-white/40 backdrop-blur-md border border-white/40"
        
        style={{borderTopColor:`${item.color}40`}}
        >
            <div className="px-4 py-4 h-fit w-fit rounded-full shrink-0
            
            transition-all duration-400 ease-in-out group-hover:scale-105 

            " style={{backgroundColor:`${item.color}40`}}>
                {item.icon}
            </div>
           <div>
             <h2 className="text-black font-medium text-xl">
                {item.title}
             </h2>
            <p className="text-[#6D8196] text-lg leading-relaxed">
                {item.description}
            </p>
           </div>
        </div>
        </div>
    )
}

export default FeatureCard