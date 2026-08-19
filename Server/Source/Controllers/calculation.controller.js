import { Milestone } from "../Models/Milestone.models.js";
import { Project } from "../Models/Project.models.js";
import { Task } from "../Models/Task.models.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asynchandler.js";

const calculate=asyncHandler(async(req,res)=>{
    const totalOwnProject=await Project.countDocuments({
        owner:req.user._id
    })
    const totalFinishProject=await Project.countDocuments({
        projectStatus:"Completed"
    })
    const milestones=await Milestone.countDocuments({
        owner:req.user._id
    })

    const taskInReview=await Task.countDocuments({
        status:"in_review"
    })
    return res.status(200).json(
        new ApiResponse(200,{
            totalOwnProject,
            milestones,
            taskInReview,
            totalFinishProject
        },"Dashboard statistics fetched successfully")
    )
})

export{
    calculate
}