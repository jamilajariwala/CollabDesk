import mongoose from "mongoose";
import { Milestone } from "../Models/Milestone.models.js";
import { Project } from "../Models/Project.models.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asynchandler.js";

const createMilestone=asyncHandler(async(req,res)=>{
    const {title,desc,due}=req.body
    const {prjtId}=req.params
    if(!title || title.trim()=="") throw new ApiError(400,"title is required")
    if (!due || due.trim()=="") throw new ApiError(400,"Deadline is required")
    const project=await Project.findById(prjtId)
    if(!project) throw new ApiError(404,"project not found")
    if(project.owner.toString() !== req.user._id.toString()){
        throw new ApiError(403,"Not authorized")
    }
    const milestone=await Milestone.create({
        title:title,
        description:desc?.trim() || "",
        dueDate:due,
        projectId:prjtId,
        owner:req.user._id
    })
    const getmilestone=await Milestone.findById(milestone._id)
    if(!getmilestone) throw new ApiError(500,"Something went wrong while creating milestone")
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,{getmilestone},"Milestone created successfully")
    )
})

const getAllMilestone= asyncHandler(async(req,res)=>{

    const {prjtId}=req.params

    if(!mongoose.Types.ObjectId.isValid(prjtId)){
    throw new ApiError(400,"invalid project id")
  }

  const project = await Project.findById(prjtId)
    if (!project) throw new ApiError(404, "project not found")
    if (project.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized")
    }

    const milestones=await Milestone.find({
        projectId:prjtId
    }).sort({ createdAt: 1 })

    return res
    .status(200)
    .json(
        new ApiResponse(200,{milestones},"Milestone fetched successfully")
    )
})

const getOneMilestone=asyncHandler(async(req,res)=>{
    const {mileId}=req.params
    if(! mongoose.Types.ObjectId.isValid(mileId)) throw new ApiError(400,"Invalid milestone ID")
    
    
    const milestone=await Milestone.findById(mileId)
    if (!milestone) throw new ApiError(404,"Milestone not found")

    if (milestone.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized")
    }
    
    return res.status(200).json(
        new ApiResponse(200,{milestone},"Milestone found successfully")
    )
    
})

const updateMilestone=asyncHandler(async(req,res)=>{
    const {title,desc,due}=req.body
    const {mileId}=req.params
    if(! mongoose.Types.ObjectId.isValid(mileId)) throw new ApiError(400,"Invalid milestone ID")
    
    const milestone=await Milestone.findById(mileId)
    if(! milestone) throw new ApiError(404,"milestone not found")

    if (milestone.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized")
    }
    
    if(title != undefined) milestone.title=title
    if(desc != undefined) milestone.description=desc
    if(due != undefined) milestone.dueDate=due
    // if(status != undefined) milestone.status=status

    await milestone.save()

    return res.status(200).json(
        new ApiResponse(200,{milestone},"milestone update successfully")
    )

})

const deleteMilestone=asyncHandler(async(req,res)=>{
    const {mileId}=req.params
    if(! mongoose.Types.ObjectId.isValid(mileId)) throw new ApiError(400,"Invalid milestone ID")
    
    const milestone=await Milestone.findById(mileId)
    if(!milestone) throw new ApiError(404,"Milestone not found")

    if (milestone.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized")
    }
    
    await milestone.deleteOne()

    return res.status(200).json(
        new ApiResponse(200,{},"Milestone deleted successfullys")
    )
})

export {
    createMilestone,
    getAllMilestone,
    getOneMilestone,
    updateMilestone,
    deleteMilestone
}