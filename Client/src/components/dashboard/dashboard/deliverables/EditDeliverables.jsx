import { FolderUp, Link, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import api from '../../../../service/api'
import { AuthContext } from '../../../../context/AuthContext'

const EditDeliverables = ({setEditBtnclick,deliverableselected,fetchDeliverables}) => {
  const id=deliverableselected._id
  const mileid=deliverableselected.mileId
  const projectid=deliverableselected.projectId
  const taskid=deliverableselected.taskId
  const [title,setTitle]=useState(deliverableselected.title || "")
  const type=deliverableselected.type
  const filenm=deliverableselected.filename
  const[url,setUrl]=useState(deliverableselected.url || "")
  const [selectedfile,setSelectedfile]=useState(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  const {setUser}=useContext(AuthContext)
  const submit=async(e)=>{
    e.preventDefault()
    setError("")
    const formdata=new FormData()
    formdata.append('title',title)
    if(type === "Link"){
      formdata.append('url',url)
    }
     else if (selectedfile){
      formdata.append('file',selectedfile)
    }
    try {
      setLoading(true)
      await api.patch(
        `project/${projectid}/milestone/${mileid}/task/${taskid}/deliverables/${id}`,
        formdata
      )
      fetchDeliverables()
      setEditBtnclick(false)
    } catch (error) {
      if(error.response?.status === 401){
        setUser(null)
        return
      }
      setError(error.response?.data?.message || "something went wrong")
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    setTitle(deliverableselected.title || "")
    setUrl(deliverableselected.url || "")
    setSelectedfile(null)
}, [deliverableselected])
  return (
    <div>
      <div className='bg-white p-6 rounded-lg'>
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
             <div className='flex flex-row justify-between items-center'>
              <h2 className='font-bold text-xl my-4'>Edit Deliverables</h2>
             <X onClick={()=>{
              setEditBtnclick(false)
             }} className='cursor-pointer'/>
             </div>
             <form  className='flex flex-col gap-6' onSubmit={(e)=>{
              submit(e)
             }}>
                 <div className='flex gap-2'>
                  {
                    type==='Link' ? <label className={`text-md px-10 py-2 border hover:border-[#be69f7] bg-[#be69f7]/40  rounded-full transition-all duration-200 ${type === 'Link' ?'border-[#be69f7] border-2  font-medium':' border-gray-300 font-normal'}`} >Link</label> 

                    :type==='Image' ? <label className={`text-md px-10 py-2 border hover:border-[#88f769] bg-[#88f769]/40  rounded-full transition-all duration-200 ${type === 'Image' ?'border-[#88f769] border-2  font-medium':' border-gray-300 font-normal'}`}>Image</label>

                    :<label className={`text-md px-10 py-2 border hover:border-[#f7ae69] bg-[#f7ae69]/40  rounded-full transition-all duration-200 ${type === 'Pdf' ?'border-[#f7ae69]  border-2   font-medium':' border-gray-300 font-normal'}`}>Pdf</label>
                  }
                    </div>
                    <div>
                     {
                        type === "Link" ? <div className='relative'>
                            <input type='text' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-10 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Link URL' value={url}
                            onChange={(e)=>{
                              setUrl(e.target.value)
                            }} />
                            <Link className='absolute top-3 left-2 text-[#6D8196]' size={18}/>
                        </div> 

                        : type === "Image" ? <div className='relative flex flex-col gap-3'>
                          <p className="text-md text-[#6D8196] mt-2">
                          Current file: {filenm}
                          </p>
                            <input type='file' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-10 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' onChange={(e)=>{
                              setSelectedfile(e.target.files?.[0] || null)
                            }}/>
                            <FolderUp className='absolute top-13 left-2 text-[#6D8196]' size={18}/>
                        </div>

                        :<div className='relative  flex flex-col gap-3'>
                          <p className="text-md text-[#6D8196] mt-2">
                          Current file: {filenm}
                          </p>
                            <input type='file' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-10 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' 
                            onChange={(e)=>{
                              setSelectedfile(e.target.files?.[0] || null)
                            }}/>
                            <FolderUp className='absolute top-13 left-2 text-[#6D8196]' size={18}/>
                        </div>
                    } 
                 </div>
                 <div className='flex flex-col gap-1'>
                     <label className='text-md' >Title</label>
                         <input type='text' className='border border-[#6D8196]/20 shadow-sm rounded-lg text-md pl-4 pr-4 py-2 w-full sm:w-sm text-[#6D8196] placeholder:text-[#6D8196] focus:outline-none focus:ring-1 focus:border-blue-500' placeholder='Enter Title' value={title} onChange={(e)=>{
                          setTitle(e.target.value)
                         }}/>
                 </div>
                 <div className='flex flex-row gap-3 justify-end'>
                     <button type="submit" disabled={loading}
                    className='bg-[#6D8196] px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-white transition-all duration-200 cursor-pointer'>
                         {loading? "uploading" : "upload"}
                     </button>
                     <button type="button" className='bg-white px-6 py-2 text-md w-full sm:max-w-sm rounded-lg text-[#6D8196] border border-[#6D8196] hover:bg-[#6D8196] hover:text-white hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer' onClick={()=>{
                        setEditBtnclick(false)
                     }}>
                         Cancel
                     </button>
                 </div>
             </form>
         </div>
    </div>
  )
}

export default EditDeliverables