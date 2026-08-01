import ApiError from "../Utils/ApiError.js";
import asyncHandler from "../Utils/asynchandler.js";
import { User } from '../Models/User.models.js'
import { Project } from "../Models/Project.models.js";
import ApiResponse from "../Utils/ApiResponse.js";
import mongoose from "mongoose";

const createProject=asyncHandler(async(req,res)=>{
  const {title,desc,start,end}=req.body
  if (!title || title.trim()==""){
    throw new ApiError(400,"Project Title is required")
  }  
  if (!end || end.trim()==""){
    throw new ApiError(400,"Project deadline is required")
  } 
  const user=await User.findById(req.user._id)
  if(!user){
    throw new ApiError(404,"user not found")
  }
  if(user.plan == "Free"){
   const count= await Project.countDocuments({
      owner:req.user._id
    })
    if(count>=5){
      throw new ApiError(400,"sorry your project limit for free plan have expired. Upgrade to Pro")
    }
  }

  const createproject=await Project.create({
    title:title,
    description:desc?.trim()||"",
    owner:req.user._id,
    startDate:start || Date.now(),
    endDate:end
  })

  const getproject= await Project.findById(createproject._id)
  if(!getproject){
    throw new ApiError(500,"Something went wrong while creating project try again")
  }

  return res
  .status(201)
  .json(
    new ApiResponse(201,{getproject},"Project Created Sucessfully")
  )
})

const getProjects=asyncHandler(async(req,res)=>{
  const ownedprojects=await Project.find({
    owner:req.user._id
  }).sort({createdAt:-1})

  const clientproject=await Project.find({
    client:req.user._id
  }).sort({createdAt:-1})

  return res
  .status(200)
  .json(
    new ApiResponse(200,{
      ownedprojects,
      clientproject
    },"Projects fethced successfully")
  )
})

const getOneProject=asyncHandler(async(req,res)=>{
  const {projectId}=req.params
  if(! mongoose.Types.ObjectId.isValid(projectId)){
    throw new ApiError(400,"invalid project id")
  }
  const project=await Project.findOne({
    _id:projectId,
    $or:[
      {
        owner:req.user._id
      },
      {
        client:req.user._id
      }
    ]
  }).populate("owner","fullName email").populate("client","fullName email")

  if(!project){
    throw new ApiError(404,"Project not found")
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200,{project},"project fetched successfully")
  )
})

const updateProject=asyncHandler(async(req,res)=>{
  const {title,desc,status,start,end}=req.body
  const {projectId}=req.params

  if (!mongoose.Types.ObjectId.isValid(projectId))
  {
    throw new ApiError(400,"invalid project id")
  }

  const project=await Project.findOne({
    _id:projectId,
    owner:req.user._id
  })
  if(!project){
    throw new ApiError(404,"project not found")
  }

  if(title != undefined) project.title=title
  if(desc != undefined) project.description=desc
  if(status != undefined) project.status=status
  if(start != undefined) project.startDate=start
  if(end != undefined) project.endDate=end

  await project.save()

  return res
  .status(200)
  .json(
    new ApiResponse(200,{project},"project updated successfully")
  )
})

const deleteProject=asyncHandler(async(req,res)=>{
  const {projectId}=req.params
  if(!mongoose.Types.ObjectId.isValid(projectId)){
    throw new ApiError(400,"invalid project id")
  }
  const project=await Project.findOne({
    _id:projectId,
    owner:req.user._id
  })
  if(!project){
    throw new ApiError(404,"project not found")
  }
  await project.deleteOne()

  return res
  .status(200)
  .json(
    new ApiResponse(200,{},"project deleted successfully")
  )
})
export {
  createProject,
  getProjects,
  getOneProject,
  updateProject,
  deleteProject
}