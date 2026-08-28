import React from 'react'
import { useState } from 'react'
import {Link,FolderUp, X  } from 'lucide-react'
import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import api from '../../../../service/api'

const CreateDeliverables = ({projectId,mileId,taskId,setBtnclick,fetchDeliverables}) => {
    const [selectType,setSelectType]=useState("Link")
    const [title,setTitle]=useState("")
    const [url,setUrl]=useState("")
    const [selectedFile,setSelectdFile]=useState(null)
    const [loading,setLoading]=useState(false)
    const {setUser}=useContext(AuthContext)
    const [error,setError]=useState("")
    const submit=async(e)=>{
        e.preventDefault()
        setError("")
        const formdata=new FormData()
        formdata.append('title',title)
        formdata.append('type',selectType)
        if(selectType==="Link"){
            formdata.append('url',url)
        }else{
            formdata.append('file',selectedFile)
        }
        
        try {
            setLoading(true)
            const response=await api.post(
                `/project/${projectId}/milestone/${mileId}/task/${taskId}/deliverables`,
                    formdata
            )
            setBtnclick(false)
            fetchDeliverables()
        } catch (error) {
            if(error.response?.status === 401){
                 setUser(null)
                return
            }
            setError(error?.response?.data?.message || 'something went wrong')
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='bg-black/40 fixed inset-0 flex justify-center items-center'>
         <div className='bg-white p-4 rounded-lg relative'>
            {
             error && (
                 <p className="text-red-500 text-sm text-center max-w-sm">{error}</p>
             )
         }
          {/* {
             success && (
                 <p className="text-green-600 text-sm text-center max-w-sm">{success}</p>
             )
         } */}
             <h2 className='font-bold text-xl mb-4'>Add Deliverables</h2>
             <X color='#6D8196'className='cursor-pointer absolute right-4 top-4' onClick={()=>{
                setBtnclick(false)
              }}/>
             <form  className='flex flex-col gap-6' onSubmit={(e)=>{
                submit(e)
             }}>
                 <div className='flex gap-2'>
                    <button type="button" className={`text-md px-10 py-2 border hover:border-[#be69f7] bg-[#be69f7]/40  rounded-full transition-all duration-200 ${selectType === 'Link' ?'border-[#be69f7] border-2  font-medium':' border-gray-300 font-normal'}`} onClick={()=>{
                        setSelectType("Link")
                    }}>Link</button>
                    <button type="button" className={`text-md px-10 py-2 border hover:border-[#88f769] bg-[#88f769]/40  rounded-full transition-all duration-200 ${selectType === 'Image' ?'border-[#88f769] border-2  font-medium':' border-gray-300 font-normal'}`}onClick={()=>{
                        setSelectType("Image")
                    }}>Image</button>
                    <button type="button" className={`text-md px-10 py-2 border hover:border-[#f7ae69] bg-[#f7ae69]/40  rounded-full transition-all duration-200 ${selectType === 'Pdf' ?'border-[#f7ae69]  border-2   font-medium':' border-gray-300 font-normal'}`} onClick={()=>{
                        setSelectType("Pdf")
                    }}>Pdf</button>
                    </div>
                    <div>
                    {
                        selectType === "Link" ? (<div className='relative' key="link">
                            <input type='text' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-10 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Link URL' 
                            value={url ?? ""}
                            onChange={(e)=>{
                                setUrl(e.target.value)
                            }}/>
                            <Link className='absolute top-3 left-2 text-[#6D8196]' size={18}/>
                        </div> ):(

                        // : selectType === "Image" ? <div className='relative'>
                        //     <input type='file' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-10 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500'
                        //     onChange={(e)=>{
                        //         setSelectdFile(e.target.files?.[0]  || null)
                        //     }}/>
                        //     <FolderUp className='absolute top-3 left-2 text-[#6D8196]' size={18}/>
                        // </div>

                        <div className='relative' key={selectType}>
                            <input type='file' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-10 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' 
                            onChange={(e)=>{
                                setSelectdFile(e.target.files?.[0] || null)
                            }}/>
                            <FolderUp className='absolute top-3 left-2 text-[#6D8196]' size={18}/>
                        </div>
                        )
                    }
                 </div>
                 <div className='flex flex-col gap-1'>
                     <label className='text-md' >Title</label>
                         <input type='text' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Enter Title'
                         value={title}
                         onChange={(e)=>{
                            setTitle(e.target.value)
                         }} />
                 </div>
                 <div className='flex flex-row gap-3 justify-end'>
                     <button type="submit" disabled={loading}
                    className='bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white transition-all duration-200 cursor-pointer'>
                        {loading? "uploading" : "upload"}
                     </button>
                     <button type="button" className='bg-white px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-[#6D8196] border cursor-pointer border-[#6D8196] hover:bg-[#6D8196] hover:text-white hover:shadow-md transition-all duration-200 active:scale-95' onClick={()=>{
                        setBtnclick(false)
                     }}>
                         Cancel
                     </button>
                 </div>
             </form>
         </div>
    </div>
  )
}

export default CreateDeliverables