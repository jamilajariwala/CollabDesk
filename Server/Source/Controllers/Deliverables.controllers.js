import mongoose from "mongoose";
import asyncHandler from "../Utils/asynchandler.js";
import ApiError from "../Utils/ApiError.js";
import { Task } from "../Models/Task.models.js";
import uploadCloudinary from "../Utils/UploadtoCloudniary.js";
import Deliverables from "../Models/Deliverables.model.js";
import ApiResponse from '../Utils/ApiResponse.js'
import { v2 as cloudinary } from "cloudinary";
import deleteCloudinary from "../Utils/DeleteFromCloudinary.js";

const addDeliverables=asyncHandler(async(req,res)=>{
    const {title,type,url}=req.body
    const {taskId}=req.params
    if(!title || title.trim()==""){
        throw new ApiError(400,"title required")
    }
    if(!type){
        throw new ApiError(400,"type of uploade needed")
    }
    if(!mongoose.Types.ObjectId.isValid(taskId)){
        throw new ApiError(400,"inva;id taskId")
    }
    const task=await Task.findById(taskId)
    if(!task){
        throw new ApiError(404,"Task not found")
    }
    if(task.owner.toString()!==req.user._id.toString()){
        throw new ApiError(403,"unauthorizes request")
    }

    let uploadedUrl, cloudinaryPublicId, resoursetype, response

    if(type == "Link"){
        if(!url || url.trim()==""){
            throw new ApiError(400,"Link is required")
        }
        uploadedUrl=url.trim()
    }
    else{
        if(!req.file){
            throw new ApiError(400,"image or Pdf is required")
        }
        if (type === "Image") {
            response = await uploadCloudinary(req.file.path, "image");
        }

        if (type === "Pdf") {
            response = await uploadCloudinary(req.file.path, "image");
        }

        if(!response){
            throw new ApiError(500,"something went wrong while uploading image or pdf")
        }

        uploadedUrl=response.secure_url
        cloudinaryPublicId=response.public_id
        resoursetype=response.resource_type
    }

    const deliverables=await Deliverables.create({
        title:title,
        url:uploadedUrl,
        cloudinarypublicId:cloudinaryPublicId ? cloudinaryPublicId:"",
        filename:req.file?req.file.originalname : "",
        resourceType:resoursetype ? resoursetype:"",
        projectId:task.projectId,
        mileId:task.milestoneId,
        taskId:taskId,
        owner:req.user._id,
        type:type   
    })
    const getdeliverables=await Deliverables.findById(deliverables._id)
    if(!getdeliverables){
        throw new ApiError(500,"something went wrong while uploading deliverables")
    }
    return res.
    status(200)
    .json(
        new ApiResponse(200,{getdeliverables},"deliverables uploaded successfully")
    )
})

const getAllDeliverables=asyncHandler(async(req,res)=>{
    const {taskId}=req.params
    if(!mongoose.Types.ObjectId.isValid(taskId)){
        throw new ApiError(400,"invalid taskId")
    }
    const task=await Task.findById(taskId)
    if(!task){
        throw new ApiError(404,"Task not found")
    }
    // if(task.owner.toString()!==req.user._id.toString()){
    //     throw new ApiError(403,"unauthorizes request")
    // }

    const deliverables=await Deliverables.find({
        taskId:taskId
    }).sort({ createdAt: 1 })

    return res
    .status(200)
    .json(
        new ApiResponse(200,{deliverables},"deliverables fetched successfully")
    )
})

const getOneDeliverable=asyncHandler(async(req,res)=>{
    const {deliverableId}=req.params
    if(!mongoose.Types.ObjectId.isValid(deliverableId)){
        throw new ApiError(400,"invalid taskId")
    }
    const deliverable=await Deliverables.findById(deliverableId)
    if(!deliverable){
        throw new ApiError(404,"Task not found")
    }
    if(deliverable.owner.toString()!==req.user._id.toString()){
        throw new ApiError(403,"unauthorizes request")
    }
     return res
    .status(200)
    .json(
        new ApiResponse(200,{deliverable},"deliverables fetched successfully")
    )
})

const updateDeliverable=asyncHandler(async(req,res)=>{
    const {title,url}=req.body
    const {deliverableId}=req.params
    if(!mongoose.Types.ObjectId.isValid(deliverableId)){
        throw new ApiError(400,"invalid taskId")
    }
    const deliverable=await Deliverables.findById(deliverableId)
    if(!deliverable){
        throw new ApiError(404,"Task not found")
    }
    if(deliverable.owner.toString()!==req.user._id.toString()){
        throw new ApiError(403,"unauthorizes request")
    }

    if(deliverable.type == "Link"){
        if(url !== undefined){
            deliverable.url=url
        }
    }
    else{
        if(req.file){
            if(deliverable.cloudinarypublicId){
               deleteCloudinary(deliverable.cloudinarypublicId,deliverable.resourceType)
            }

            const response=await uploadCloudinary(req.file.path)
            if(!response){
            throw new ApiError(500,"something went wrong while uploading image or pdf")
        }
            const uploadurl=response.secure_url
            const cloudinarypublicId=response.public_id
            if(uploadurl !== undefined && cloudinarypublicId !== undefined){
            deliverable.url=uploadurl
            deliverable.cloudinarypublicId =cloudinarypublicId
            deliverable.filename=req.file.originalname
        }
        }  
    }

    if(title !== undefined){
        deliverable.title=title
    }

    await deliverable.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200,{deliverable},"deliverable updated successfully")
    ) 
})

const deleteDeliverable=asyncHandler(async(req,res)=>{
    const {deliverableId}=req.params
    if(!mongoose.Types.ObjectId.isValid(deliverableId)){
        throw new ApiError(400,"invalid taskId")
    }
    const deliverable=await Deliverables.findById(deliverableId)
    if(!deliverable){
        throw new ApiError(404,"Task not found")
    }
    if(deliverable.owner.toString()!==req.user._id.toString()){
        throw new ApiError(403,"unauthorizes request")
    }
    if(deliverable.type=== "Image" || deliverable.type==="Pdf")
    {
        deleteCloudinary(deliverable.cloudinarypublicId,deliverable.resourceType)
    }
    await deliverable.deleteOne()

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"deliverable deleted successfully ")
    )
})

export {
    addDeliverables,
    getAllDeliverables,
    getOneDeliverable,
    updateDeliverable,
    deleteDeliverable
}