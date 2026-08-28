import { ArrowLeft, Plus, SquareCheckBig, Loader, X, Check  } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import api from '../../../../service/api'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { useEffect } from 'react'
import CreateDeliverables from './CreateDeliverables'
import DisplayDeliverables from './DisplayDeliverables'
import EditDeliverables from './EditDeliverables'
import DeleteDeliverables from './DeleteDeliverables'
import RejectDeliverables from './RejectDeliverables'
import ApproveCard from './ApproveDeliverables'
import ApproveDeliverables from './ApproveDeliverables'

const DeliverablesCard = () => {
     const statusColors = {
      todo: "bg-gray-200 text-gray-700",
      in_progress: "bg-blue-100 text-blue-700",
      in_review: "bg-yellow-100 text-yellow-700",
      completed: "bg-green-100 text-green-700"
}
     const approvalColors = {
      not_requested: "bg-gray-100 text-gray-700 border border-gray-200",
      pending: "bg-amber-100 text-amber-800 border border-amber-200",
      changes_requested: "bg-rose-100 text-rose-700 border border-rose-200",
      approved: "bg-emerald-100 text-emerald-800 border border-emerald-200"
}
    const [isowner,setisowner]=useState(false)
    const navigate=useNavigate()
    const [btnclick,setBtnclick]=useState(false)
    const [rejectbtnclick,setRejectBtnclick]=useState(false)
    const [approvebtnclick,setApproveBtnclick]=useState(false)
    const [error,setError]=useState("")
    const {setUser,user}=useContext(AuthContext)
    const {projectId,mileId,taskId}=useParams()
    const [taskloading,settaskLoading]=useState(false)
    const [deliverablesloading,setdeliverablesLoading]=useState(false)
    const [editBtnclick,setEditBtnclick]=useState(false)
    const [deleteBtnclick,setDeleteBtnclick]=useState(false)
    const [deliverableselected,setDeliverableselected]=useState(null)
    const [taskDetail,setTaskDetail]=useState(null)
    const [getformdata,setGetFromData]=useState([])

    const getProjectDetail = async () => {
    try {
        const response = await api.get(`/project/${projectId}`)

        const project = response.data.data.project

        setisowner(
            project.owner?._id === user?.user?._id
        )
    } catch (error) {
        if(error.response?.status === 401){
                 setUser(null)
                return
            }
            setError(error?.response?.data?.message || 'something went wrong')
    }
}
    const fetchDeliverables=async()=>{
        setdeliverablesLoading(true)
        try {
            const response=await api.get(
                `/project/${projectId}/milestone/${mileId}/task/${taskId}/deliverables`
            )
            setGetFromData(response?.data?.data?.deliverables)
        } catch (error) {
            if(error.response?.status === 401){
                 setUser(null)
                return
            }
            setError(error?.response?.data?.message || 'something went wrong')
        }finally{
            setdeliverablesLoading(false)
        }
    }
    const getTaskDetail=async()=>{
        try {
            settaskLoading(true)
            const response=await api.get(
                `/project/${projectId}/milestone/${mileId}/task/${taskId}`
            )
            setTaskDetail(response.data?.data?.task)
        } catch (error) {
            if(error.response?.status === 401){
                setUser(null)
                return
            }
        setError(error.response?.data?.message || "Something went wrong")
        }finally{
            settaskLoading(false)
        }
    }

     const onreview=async()=>{
        try{
            
            await api.patch(
                `/project/${projectId}/milestone/${mileId}/task/${taskId}/update-status`,
                {
                    newstatus:'in_review'
                }
            )   
            getTaskDetail()
        }catch(error){
            if(error.response?.status === 401){
                setUser(null)
                return
            }
        setError(error.response?.data?.message || "Something went wrong")
        }
    }
    useEffect(()=>{
        getTaskDetail()
    },[projectId,mileId,taskId])

    useEffect(()=>{
        fetchDeliverables()
    },[projectId,mileId,taskId])

    useEffect(() => {
    if (!user?.user?._id) return

    getProjectDetail()
}, [projectId, user])

    if(taskloading)return <h1>Loading......</h1>
    if(deliverablesloading) return <h1>Loading......</h1>
  return (
    <div className='flex flex-col  min-h-screen gap-10'>
        <button className='hover:-translate-x-1 transition-all duration-200'
        onClick={()=>{
            navigate(-1)
        }}>
            <ArrowLeft/>
        </button>
         {
             error && (
                 <p className="text-red-500 text-sm text-center max-w-sm">{error}</p>
             )
         }
       <div className='flex flex-col md:flex-row gap-12'>
         <div className=' flex flex-col gap-10 w-full md:w-9/15'>
             <div className='  px-4 pb-15 pt-4 border-gray-400 flex flex-col gap-4 border-b-2'>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-4xl font-bold'>{taskDetail?.title.toUpperCase()}</h2>
                    <p className='text-xl text-[#6D8196]'>{taskDetail?.description}</p>
                </div>
                <div className='flex justify-between items-center divide-x-2 divide-gray-200 border rounded-xl bg-white/70 border-gray-200'>
                 <div className='flex flex-col items-center p-4 flex-1'>
                    <p className='text-[#4a4a4a] font-bold text-xl text-center mb-2'>Status</p>
                    <p className={`text-md px-4 py-1 rounded-full font-medium ${statusColors[taskDetail?.status]} w-fit`}>{taskDetail?.status}</p>
                </div>
           
                <div className='flex flex-col items-center p-4 flex-1'>
                    <p className='text-[#4a4a4a] font-bold text-xl text-center mb-2'>Due date</p>
                    <p className='text-[#6D8196] text-md font-medium'>{taskDetail?.dueDate?.split('T')[0]}</p>
                </div>

                <div className='flex flex-col items-center p-4 flex-1'>
                    <p className='text-[#4a4a4a] font-bold text-xl text-center mb-2'>Approval</p>
                    <p className='text-md'><span className={`text-md px-4 py-1 w-fit rounded-full ${approvalColors[taskDetail?.approval?.status]}`}>{taskDetail?.approval.status}</span></p>
                </div>
              {/* <p className='text-md text-[#6D8196]'>{taskDetail?.approval.requestedAt}</p> */}
             </div>
             </div>
             <div className='p-4 bg-white/80'>
                <div className='flex justify-between items-center gap-3 md:flex-col lg:flex-row'>
                <div> 
                <h2 className='text-xl font-medium tracking-wide'>Add Deliverables</h2>
                </div>
                {
                    isowner && (
                        <div> 
                <button className='text-white text-md bg-[#6D8196] px-4 py-2 rounded-lg flex flex-row gap-2 justify-center items-center hover:bg-[#5C7087] transition-all duration-200 cursor-pointer active:scale-95' onClick={()=>{
                    setBtnclick(true)
                }}>
                    <Plus size={18}  /> Add Deliverables
                </button>
            </div>
                    )
                }
            </div>
            {
                getformdata.map((items)=>{
                    return <DisplayDeliverables setDeliverableselected={setDeliverableselected} item={items} key={items._id} setDeleteBtnclick={setDeleteBtnclick} setEditBtnclick={setEditBtnclick} isowner={isowner}/>
                })
            }
        </div>
       {
        isowner && (
            
        taskDetail?.status !== "in_review" && taskDetail?.approval?.status==="not_requested"?(
         <button disabled={getformdata.length===0} className={`w-full border py-4  ${getformdata.length===0?'bg-gray-100 border-gray-500':'bg-blue-100 border-blue-500 active:scale-98'}  flex flex-col justify-center items-center gap-4 rounded-xl`} onClick={()=>{
            onreview()
         }}>
           <span className='flex justify-center items-center gap-4'>
            <SquareCheckBig className={` ${getformdata.length===0?'text-gray-500':'text-blue-500'}   `}/> <h2 className={` ${getformdata.length===0?'text-gray-500':'text-blue-500'} text-lg font-medium`}>Submit for Review</h2>
           </span>
           <p className='text-[#6D8196] text-md '>Submit this work to client for review</p>
        </button> )
        :(
            taskDetail?.approval?.status === "changes_requested"?
            (<div className='flex flex-col gap-3'>
        <div className='flex gap-2 justify-center items-start'>
             <div className='w-full border py-4 bg-red-100 border-red-500  flex flex-col justify-center items-center gap-4 rounded-xl'>
            <X className='text-red-500 '/> <h2 className='text-red-500 text-lg font-medium'>your Deliverables are rejected</h2>
        </div>
        <div className='w-full bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm wrap-break-word min-w-0'>
  <div className='flex items-center gap-2 mb-1.5'>
    <div className='w-2 h-2 rounded-full bg-amber-500' />
    <h3 className='text-sm font-semibold text-slate-700 uppercase tracking-wider'>
      Feedback
    </h3>
  </div>
  
  <p className='text-slate-600 text-sm leading-relaxed pl-4 border-l-2 border-slate-300 italic'>
    {taskDetail?.approval?.feedback || "No feedback provided yet."}
  </p>
</div>
        </div>
        <button disabled={getformdata.length===0} className={`w-full border py-4  ${getformdata.length===0?'bg-gray-100 border-gray-500':'bg-blue-100 border-blue-500 active:scale-98'}  flex flex-col justify-center items-center gap-4 rounded-xl`} onClick={()=>{
            onreview()
         }}>
           <span className='flex justify-center items-center gap-4'>
            <SquareCheckBig className={` ${getformdata.length===0?'text-gray-500':'text-blue-500'}   `}/> <h2 className={` ${getformdata.length===0?'text-gray-500':'text-blue-500'} text-lg font-medium`}>Submit for Review</h2>
           </span>
           <p className='text-[#6D8196] text-md '>Submit this work to client for review</p>
        </button>
            </div>
        ):
            (
                taskDetail?.approval?.status === "approved"?
                (
                <div className='w-full border py-4 bg-green-100 border-green-500  flex flex-col justify-center items-center gap-4 rounded-xl'>
            <Check className='text-green-500 '/> <h2 className='text-green-500 text-lg font-medium'>Deliverables Approved</h2>
        </div>
                )
                :
            (
         <div className='w-full border py-4 bg-yellow-100 border-yellow-500  flex flex-col justify-center items-center gap-4 rounded-xl'>
            <Loader className='text-yellow-500 '/> <h2 className='text-yellow-500 text-lg font-medium'>Waiting for Client to Review</h2>
        </div>
        )
            ) 
        
        )
        )
       }
       {
        !isowner && (
            
        taskDetail?.approval?.status == "pending" ?(
         <div className='flex flex-row gap-4'>
            <button className=' flex-1 border py-4  bg-red-100 border-red-500 active:scale-98  flex flex-col justify-center items-center gap-4 rounded-xl' onClick={()=>{
                setRejectBtnclick(true)
            }}>
           Reject
        </button>
        <button className='flex-1 border py-4  bg-green-100 border-green-500 active:scale-98  flex flex-col justify-center items-center gap-4 rounded-xl'onClick={()=>{
            setApproveBtnclick(true)
        }}>
           Approve
        </button>
         </div>
         )
        :(
         taskDetail?.approval?.status == "changes_requested" ? 
         (
            <div className='w-full border py-4 bg-red-100 border-red-500  flex flex-col justify-center items-center gap-4 rounded-xl'>
            <X className='text-red-500 '/> <h2 className='text-red-500 text-lg font-medium'>Rejected and request made for changes</h2>
        </div>
         ) 
         :
         (
            taskDetail?.approval?.status == "approved" ? 
            (
             <div className='w-full border py-4 bg-green-100 border-green-500  flex flex-col justify-center items-center gap-4 rounded-xl'>
            <Check className='text-green-500 '/> <h2 className='text-green-500 text-lg font-medium'>Deliverables Approved</h2>
        </div>   
            )
            :
            (
                <div className='w-full border py-4 bg-yellow-100 border-yellow-500  flex flex-col justify-center items-center gap-4 rounded-xl'>
            <Loader className='text-yellow-500 '/> <h2 className='text-yellow-500 text-lg font-medium'>Waiting for owner to upload</h2>
        </div>
            )
         
         )
        )
       
        )
       }
        </div>

        <div className='flex flex-col gap-10'>
            {
                editBtnclick && (
                    <EditDeliverables setEditBtnclick={setEditBtnclick} deliverableselected={deliverableselected} fetchDeliverables={fetchDeliverables}/>
                )
            }
             {
                deleteBtnclick &&(
                    <DeleteDeliverables setDeleteBtnclick={setDeleteBtnclick} deliverableselected={deliverableselected} fetchDeliverables={fetchDeliverables}/>
                )
            }
        </div>
       </div>
        {
            btnclick && (
                <CreateDeliverables fetchDeliverables={fetchDeliverables} projectId={projectId} mileId={mileId} taskId={taskId} setBtnclick={setBtnclick}/>
            )
        }
        {
            rejectbtnclick &&(
                <RejectDeliverables setRejectBtnclick={setRejectBtnclick} projectId={projectId} mileId={mileId} taskId={taskId} getTaskDetail={getTaskDetail}/>
            )
        }
        {
            approvebtnclick && (
                <ApproveDeliverables setApproveBtnclick={setApproveBtnclick} projectId={projectId} mileId={mileId} taskId={taskId} getTaskDetail={getTaskDetail}/>
            )
        }
    </div>
  )
}

export default DeliverablesCard