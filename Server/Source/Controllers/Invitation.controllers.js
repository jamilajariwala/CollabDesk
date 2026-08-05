import { Invite } from "../Models/Invitation.models.js";
import { Project } from "../Models/Project.models.js";
import { User } from "../Models/User.models.js";
import ApiError from "../Utils/ApiError.js";
import asyncHandler from "../Utils/asynchandler.js";
import crypto from "crypto"
import sendMail from "../Utils/SendEmail.js";
import ApiResponse from "../Utils/ApiResponse.js";

const sendInvitation=asyncHandler(async(req,res)=>{
    const {email}=req.body
    const {projectId}=req.params
    if (!email){
        throw new ApiError(400,"Email is required")
    }

    const project=await Project.findById(projectId)
    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if (project.owner.toString() !== req.user._id.toString())
    {
        throw new ApiError(403, "You are not authorized to invite clients");
    }

    const userExist= await User.findOne({
        email:email
    })
    if(userExist && project.client.includes(userExist._id)){
         throw new ApiError(400, "Client is already part of this project");
    }

    const invitesent= await Invite.findOne({
        email:email,
        projectId:projectId,
        status:"pending"
    })
    if(invitesent){
        throw new ApiError(400,"invitation already sent")
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expireDate=Date.now() + 7 * 24 * 60 * 60 * 1000

    const invitation=await Invite.create({
        email:email,
        projectId:projectId,
        owner:req.user._id,
        token:token,
        expiresAt:expireDate
    })

    const inviteLink=`${process.env.CLIENT_URL}/invite/${token}`
    const sent=await sendMail(
        email,
        "Inviting you to join the project",
        `
            <h2>Project Invitation</h2>

            <p>You have been invited to collaborate on the project <strong>${project.title}</strong>.</p>

            <p>
                <a href="${inviteLink}">
                    Accept Invitation
                </a>
            </p>

            <p>This invitation expires in 7 days.</p>
        `
    )
    if(!sent){
        await Invite.findByIdAndDelete(invitation._id)
        throw new ApiError(500,"something went wrong whle sending invitation")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201,{invitation},"invitation send successfully")
    )
})

const getInvitationInfo=asyncHandler(async(req,res)=>{
    const token = req.params

    const invite=await Invite.findOne({
        token:token
    }).populate("projectId, title description").populate("owner, fullname email")

    if(!invite){
        throw new ApiError(400,"invitation not found")
    }
    if(invite.status === "accepted"){
        throw new ApiError(400,"invitation already accepted")
    }
    if(invite.expiresAt < Date.now()){
        invite.status = "expired"
        await invite.save()
        throw new ApiError(400, "Invitation expired");
    }
    return res.status(200).json(
        new ApiResponse(200,{invite},"Invitation fetched successfully")
    )
})
export {
    sendInvitation,
    getInvitationInfo
}