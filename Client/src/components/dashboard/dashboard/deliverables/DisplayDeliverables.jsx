import React from 'react'
import {Trash2,Ellipsis,Pencil,Link,Image ,FileText  } from 'lucide-react'
import { useState } from 'react'
const DisplayDeliverables = ({item,setDeleteBtnclick,setEditBtnclick,setDeliverableselected,isowner}) => {
    const statusColors = {
      Link: "bg-[#be69f7]/20 text-[#be69f7]",
      Image: "bg-[#88f769]/20 text-[#88f769]",
      Pdf: "bg-[#f7ae69]/20 text-[#f7ae69]"
}
        const [dotsclick,setDotsclick]=useState(false)
  return (
    <div className='mt-5 hover:hover:bg-[#dec942]/20'>
        <div className='py-2 px-2 rounded-lg transition-all duration-200 cursor-pointer flex flex-col gap-4 justify-center  border'>
            <div className='flex gap-20'>
                <div className='flex justify-center items-center w-50'>
                    <div className={`${statusColors[item.type]} p-5 rounded-full border border-gray-300`}>
                        {item.type === "Link"?<Link size={30}/>:item.type==="Image"?<Image size={30}/>:<FileText size={30}/>}
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-2 w-full'>
                    <div className='flex justify-between items-center '>
                         <h2 className='text-lg font-bold text-[#4a4a4a] '>{item.title}</h2>
                         
                     <div className='relative'>
                         {
                          isowner && (
                            <Ellipsis onClick={(e)=>{
                           e.stopPropagation()
                         setDotsclick((prev)=>!prev)
                     }}/>
                          )
                         }
                     {
                         dotsclick &&(
                         <div className='absolute right-0 w-32 bg-white rounded-md shadow-lg py-1 z-10'>
                       <button 
                         className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                         onClick={()=>{
                             setDotsclick(false)
                             setEditBtnclick(true)
                             setDeliverableselected(item)
                         }}
                       >
                         <Pencil size={14} />
                         Edit
                       </button>
                       <button 
                         className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                         onClick={()=>{
                             setDotsclick(false)
                             setDeleteBtnclick(true)
                             setDeliverableselected(item)
                         }}
                       >
                         <Trash2 size={14} />
                         Delete
                       </button>
                     </div>
                         )
                     }
                     </div>   
                     </div>
                     </div>
                    </div>
                  <div className='flex gap-10 justify-end items-center'>
                      <p className={`text-md px-4 py-1 w-fit rounded-full font-medium ${statusColors[item.type]}`}>{item.type}</p> 
                     {item.type === "Link" ? <a href={item.url} onClick={(e) => e.stopPropagation()}><button className="px-6 py-2 border border-amber-950 text-amber-950 rounded-lg">Open</button></a> 
                     :<a href={item.url}  target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}><button className="px-6 py-2 border border-amber-950 text-amber-950 rounded-lg">View</button></a>}
                  </div>   
              </div>
              </div>
  )
}

export default DisplayDeliverables