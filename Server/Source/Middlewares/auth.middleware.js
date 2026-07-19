import { User } from "../Models/User.models.js"
import ApiError from "../Utils/ApiError.js"
import jwt from 'jsonwebtoken'

 const verifyJWT=async(req,res,next)=>{
    try{
        const token=req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401,"unauthorized request")
        }

        const decodedtoken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodedtoken?._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401,"token expired")
        }
        req.user=user
        next()
    }catch(error){
        throw new ApiError(401, error?.message || "Invalid access token");
    }
 }

 export default verifyJWT