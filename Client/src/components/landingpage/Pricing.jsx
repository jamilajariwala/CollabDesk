import React from 'react'
import PricingCard from './PricingCard'
import { Rocket,Sparkles } from 'lucide-react'

const Pricing = () => {
    const plan=[
        {
            icon:<Rocket color='#6D8196' size='30px'/>,
            color:'bg-[#d6efff]',
            plannm:'Free',
            heading:'Everything you need to get Started',
            price:'0',
            featuresprovided:['Upto 5 projects','Invite limited client per project','Create milestones', 'Real-time chat (coming soon)', 'Comments and Discussion', 'Notification (Coming soon)', 'Shared Document'],
            btntext:'Upcoming',
            bordercolor:'border-transparent'
        },
        {
            icon:<Sparkles color='#d6efff' size='30px'/>,
            color:'bg-[#6D8196]',
            plannm:'Pro',
            heading:'Unlock the full potential of CollbDesk',
            price:'299',
            featuresprovided:['Unlimited projects','Unlimited clients invitation per project','Create milestones', 'Real-time chat (coming soon)', 'Comments and Discussion', 'Notification (Coming soon)' , 'Meeting Scheduling (Coming Soon)','Shared Document'],
            btntext:'Upcoming',
            bordercolor:'border-[#d6efff]'
        }
    ]
  return (
    <div className='w-full max-w-7xl mx-auto mt-16 md:mt-24 p-4'>
        <div>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-[#057ceb] text-lg'>Pricing Plans</h2>
                <h2 className='text-black/80 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-relaxed text-center'>Choose a plan that fits your requirements</h2>
                <p className='text-[#6D8196] text-md md:text-lg lg:text-xl max-w-3xl'>Start for free and upgrade when your team grows.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 p-6 gap-4 justify-items-center'>
                {
                    plan.map((item,index)=>{
                        return <PricingCard items={item} key={index}/>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Pricing