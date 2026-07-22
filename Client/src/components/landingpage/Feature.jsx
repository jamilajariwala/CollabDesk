import React from 'react'
import {FolderKanban, UsersRound, FileOutput, Bell} from 'lucide-react'
import FeatureCard from './FeatureCard'

const Feature = () => {
    const feature=[
        {
            icon:<FolderKanban color="#5bb4ec" size="50px"/>,
            title:"Project Management",
            description:"Break complex projects down into manageable tasks, track deadlines with beautiful milestone timelines, and manage your daily freelance workflow from a single, organized dashboard.",
            color:"#5bb4ec"
        },
         {
            icon:<UsersRound color="#be69f7" size="50px"/>,
            title:"Team Collaboration",
            description:"Seamlessly loop in subcontractors, design partners, or virtual assistants. Brainstorm in real time, assign tasks, and maintain a clear chain of ownership across every project phase.",
            color:"#be69f7"
        },
         {
            icon:<FileOutput color="#88f769" size="50px"/>,
            title:"Secure File Sharing",
            description:"Upload design assets, documents, and deliverables directly to your dashboard. Control download permissions and share private links with clients securely, without relying on external cloud links.",
            color:"#88f769"
        },
         {
            icon:<Bell color="#f7ae69" size="50px"/>,
            title:"Smart Notification",
            description:"Receive real-time alerts only when it truly matters—like when a client approves a deliverable, leaves feedback, or a team member completes a critical task.",
            color:"#f7ae69"
        }
    ]
  return (
    <div className='w-full max-w-7xl mx-auto mt-16 md:mt-24 p-4'>
        <div className='flex flex-col justify-center items-center text-center'>
            <h2 className='text-[#057ceb] text-lg'>Features</h2>
            <h2 className='text-black/80 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-relaxed'>
                Everything You Need to Stay Productive
            </h2>
            <p className='text-[#6D8196] text-md md:text-lg lg:text-xl max-w-2xl '>
                Manage projects, collaborate with teammates, invite clients, share files and keep everyone in sync from one workspace
            </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                feature.map((item,index)=>{
                    return  <FeatureCard item={item} key={index}></FeatureCard>
                    
                })
            }
        </div>
    </div>
  )
}

export default Feature