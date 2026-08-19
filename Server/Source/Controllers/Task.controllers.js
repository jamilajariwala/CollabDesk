import asyncHandler from "../Utils/asynchandler.js";
import ApiError from '../Utils/ApiError.js';
import ApiResponse from '../Utils/ApiResponse.js';
import { Milestone } from "../Models/Milestone.models.js";
import { Task } from "../Models/Task.models.js";
import mongoose from "mongoose";
import { Project } from "../Models/Project.models.js";

const createTask=asyncHandler(async(req,res)=>{
    const {title,desc,due}=req.body
    const {mileId}=req.params
    if(!title || title.trim()==""){
        throw new ApiError(400,"Title is required")
    }
    if(!due){
        throw new ApiError(400,"Deadline is required")
    }
    if (!mongoose.Types.ObjectId.isValid(mileId)) {
    throw new ApiError(400, "Invalid milestone ID")
}
    const milestone=await Milestone.findById(mileId) 
    if(!milestone) throw new ApiError(404,"milestone not found")

    if(milestone.owner.toString() !== req.user._id.toString()){
        throw new ApiError(403,"unauthorized request")
    }

    const task=await Task.create({
        title:title,
        description:desc || "",
        dueDate:due,
        projectId:milestone.projectId,
        milestoneId:mileId,
        owner:req.user._id
    })

    const getTask=await Task.findById(task._id)
    if(!getTask) throw new ApiError(500,"Something went wrong while creating task")

    await Milestone.findByIdAndUpdate(mileId,{
        status:"pending"
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200,{getTask},"Task created")
    )
})

const getAllTask=asyncHandler(async(req,res)=>{
    const {mileId,prjtId}=req.params
    if (!mongoose.Types.ObjectId.isValid(mileId)) throw new ApiError(400, "Invalid milestone ID")
    if (!mongoose.Types.ObjectId.isValid(prjtId)) {
        throw new ApiError(400, "Invalid project ID")
    }
    const project=await Project.findById(prjtId) 
     if (!project) {
        throw new ApiError(404, "Project not found")
    }
    if(project.owner.toString() !== req.user._id.toString()){
        throw new ApiError(403,"unauthorized request")
    }

    const tasks=await Task.find({
        milestoneId:mileId
    }).sort({createdAt:1})

    return res
    .status(200)
    .json(
        new  ApiResponse(200,{tasks},"task fetched successfully")
    )
})

const getOneTask=asyncHandler(async(req,res)=>{
    const {taskId}=req.params
    if (!mongoose.Types.ObjectId.isValid(taskId)) throw new ApiError(400, "Invalid task ID")
        
    const task=await Task.findById(taskId)
    if(!task){
        throw new ApiError(404,"Task not found")
    }

    if(task.owner.toString() != req.user._id.toString()){
        throw new ApiError(403,"unauthorized request")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,{task},"Task fetched successfully")
    )
})

const updateTask=asyncHandler(async(req,res)=>{
    const {title,desc,due}=req.body
    const {taskId}=req.params
    if (!mongoose.Types.ObjectId.isValid(taskId)) throw new ApiError(400, "Invalid task ID")
        
    const task=await Task.findById(taskId)
    if(!task){
        throw new ApiError(404,"Task not found")
    }

    if(task.owner.toString() != req.user._id.toString()){
        throw new ApiError(403,"unauthorized request")
    }

    if(title !== undefined) task.title=title
    if(desc !== undefined) task.description=desc
    if(due != undefined) task.dueDate =due

    await task.save()

    return res
        .status(200)
        .json(new ApiResponse(200, { task }, "Task updated successfully"))

})

const deleteTask=asyncHandler(async(req,res)=>{
    const {taskId}=req.params
    if(!mongoose.Types.ObjectId.isValid(taskId)){
        throw new ApiError(400,"invalid task id")
    }

    const task=await Task.findById(taskId)
    if(!task) throw new ApiError(404,"task not found")

    if (task.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized")
    }

    const mileId=task.milestoneId
    await task.deleteOne()
    await Milestone.findByIdAndUpdate(mileId,{
        status:"Pending"
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"task deleted successfully")
    )
})

const updateTaskStatus=asyncHandler(async(req,res)=>{
    const {newstatus}=req.body
    const {taskId}=req.params
    if(!mongoose.Types.ObjectId.isValid(taskId)) throw new ApiError(400,"invalid task id")

    const task=await Task.findById(taskId)
    if(!task) throw new ApiError(404,"task not found")

    if(task.owner.toString() != req.user._id.toString()){
        throw new ApiError(403,"unauthorized request")
    }

    task.status=newstatus
    if(newstatus === "in_review"){
        task.approval.status="pending"
        task.approval.requestedAt = new Date()
    }
    await task.save()

    const tasks = await Task.find({
        milestoneId: task.milestoneId
    })
    const allTasksComplete = tasks.length > 0 && tasks.every(item => item.status === "completed")
    const updatemilestone = await Milestone.findByIdAndUpdate(
    task.milestoneId,
    {
      status: allTasksComplete ? "completed" : "in_progress"
    },
    {
      new: true
    }
  )

    const milestones=await Milestone.find({projectId:task.projectId})
    const allMilestonesComplete=milestones.length > 0 && milestones.every(milestone=>milestone.status === "completed")
    const updateproject = await Project.findByIdAndUpdate(
    task.projectId,
    {
      projectStatus: allMilestonesComplete
        ? "Completed"
        : "In_Progress"
    },
    {
      new: true
    }
  )

    return res
    .status(200)
    .json(
        new ApiResponse(200,{task,updatemilestone,updateproject},"status updated successfully")
    )
})

export{
    createTask,
    getAllTask,
    getOneTask,
    updateTask,
    deleteTask,
    updateTaskStatus
}