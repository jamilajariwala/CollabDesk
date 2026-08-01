import { Project } from "../Models/Project.models.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asynchandler.js";

const calculate=asyncHandler(async(req,res)=>{
    const totalOwnProject=await Project.countDocuments({
        owner:req.user._id
    })

    return res.status(200).json(
        new ApiResponse(200,{
            totalOwnProject
        },"Dashboard statistics fetched successfully")
    )
})

export{
    calculate
}