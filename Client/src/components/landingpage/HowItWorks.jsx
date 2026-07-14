import React from 'react'
import HowItWorkCard from './HowItWorkCard'
import {User,UsersRound,FolderPlus, FlagTriangleRight} from 'lucide-react'

const HowItWorks = () => {
    const work=[
        {
            no:"1",
            heading:"Freelancer Sign in",
            description:"sign in to your account and setup your worksapce in just few minutes",
            tcolor:"text-[#5bb4ec]",
            bcolor:"bg-[#5bb4ec]/40",
            polygon:"sm:[clip-path:polygon(0%_0%,_87%_1%,_100%_50%,_88%_100%,_0%_100%)]",
            icon:<User color='#5bb4ec' size='50px'/>
        },
        {
            no:"2",
            heading:"Invite Team & Client",
            description:"Invite your team member and client to collaborate and stay on the same page.",
            tcolor:"text-[#88f769]",
            bcolor:"bg-[#88f769]/40",
            polygon:"sm:[clip-path:polygon(87%_0,_100%_50%,_87%_100%,_0%_100%,_8%_48%,_0%_0%)]",
            icon:<UsersRound color="#88f769" size="50px"/>
        },
        {
            no:"3",
            heading:"Create Project",
            description:"Create new project and organize tasks, deadlines, and important details.",
            tcolor:"text-[#be69f7]",
            bcolor:"bg-[#be69f7]/40",
            polygon:"sm:[clip-path:polygon(87%_0,_100%_50%,_87%_100%,_0%_100%,_8%_48%,_0%_0%)]",
            icon: <FolderPlus color="#be69f7" size="50px"/>
        },
        {
            no:"4",
            heading:"Track Progress & Deliver",
            description:"Create milestones, collaborate in real time and deliver your project successfully.",
            tcolor:"text-[#f7ae69]",
            bcolor:"bg-[#f7ae69]/40",
            polygon:"sm:[clip-path:polygon(100%_0,_100%_50%,_100%_99%,_0%_100%,_8%_48%,_0%_0%)]",
            icon:<FlagTriangleRight color="#f7ae69" size="50px"/>
        },
    ]
  return (
    <div className='w-full max-w-7xl mx-auto mt-16 md:mt-24 p-4'>
        <div className='flex flex-col justify-center items-center'>
            <h2 className='text-[#057ceb] text-lg'>How It Work</h2>
            <h2 className='text-black/80 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-relaxed'>How CollabDesk Works</h2>
            <p className='text-[#6D8196] text-md md:text-lg lg:text-xl max-w-3xl'>Get started in a minute and manage your project from start to finish.</p>
        </div>
        <div className='p-6 gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4' >
            {
                work.map((item,index)=>{
                    return <HowItWorkCard item={item} key={index}/>
                })
            }
        </div>
    </div>
  )
}

export default HowItWorks