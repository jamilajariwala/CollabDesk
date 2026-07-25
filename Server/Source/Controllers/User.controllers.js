import { User } from "../Models/User.models.js";
import asyncHandler from "../Utils/asynchandler.js";
import ApiError from '../Utils/ApiError.js';
import ApiResponse from '../Utils/ApiResponse.js';
import jwt from 'jsonwebtoken'
import sendMail from "../Utils/SendEmail.js";

const refreshAccessToken=async(req,res)=>{
    try{
        const token=req.cookies?.refreshtoken || req.header('Authorization')?.replace('Bearer ','')
        if (!token){
            throw new ApiError(400,"unauthorized request")
        }
        const decodedtoken=jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
        const user=await User.findById(decodedtoken?._id)
        if(!user){
            throw new ApiError(400,"token expired")
        }

        if (token !== user.refreshToken) {
    throw new ApiError(401, "Refresh token is invalid");
}

        const accesstoken=await user.createAccessToken()
        const refreshtoken=await user.createRefreshToken()
        user.refreshToken=refreshtoken
        await user.save({validateBeforeSave:false})

        const option={
            httpOnly:true,
            secure:true
        }

        return res
        .status(200)
        .cookie("accesstoken",accesstoken,option)
        .cookie("refreshtoken",refreshtoken,option)
        .json(
            new ApiResponse(200,{
                accesstoken,
                refreshtoken
            },
            "Access token refresh successfully"
        )
        )

    }catch(error){
        throw new ApiError(401,error?.message || "invalid refresh token")
    }
}

const register=asyncHandler(async(req,res)=>{

    const {username,fullname,email,password,confirmpassword}=req.body
    if ([username,fullname,email,password,confirmpassword].some((field)=>!field || field.trim()===""))
    {
        throw new ApiError(400,"All Fields are Required")
    }

    const existuser=await User.findOne(
        {
            $or:[
                {
                userName:username.toLowerCase()},
               { email:email.toLowerCase()
                }
            ]
        }
    )
    if(existuser){
        if (existuser.userName === username.toLowerCase()){
            throw new ApiError(400,"Username already exist")
        }
        if(existuser.email === email.toLowerCase()){
            throw new ApiError(400,"Email already exist")
        }
    }

    if(password !== confirmpassword){
        throw new ApiError(400,"confirm password do not match with orignal password.")
    }

    const createuser=await User.create({
        userName:username.toLowerCase(),
        fullName:fullname,
        email:email.toLowerCase(),
        password:password
    })

    const getuser=await User.findById(createuser._id).select("-password -refreshToken")
    if(!getuser){
        throw new ApiError(500,"something went wrong while creating user")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201,getuser,"User Created Successfully")
    )
})

const login=asyncHandler(async(req,res)=>{
    const {username,password}=req.body
    if([username,password].some((field)=>!field || field.trim()==="")){
        throw new ApiError(400,"all fiedls are required")
    }

    const getuser=await User.findOne({
        userName:username
    })
    if(!getuser){
        throw new ApiError(404,"user does not exist")
    }

    const passwordcorrect=await getuser.isPasswordCorrect(password)
    if(!passwordcorrect){
        throw new ApiError(400,"password incorrect")
    }

    const accesstoken= await getuser.createAccessToken()
    const refreshtoken=await getuser.createRefreshToken()
    getuser.refreshToken=refreshtoken
    await getuser.save({validateBeforeSave:false})

    const loggeduser=await User.findById(getuser._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true,
        sameSite:process.env.NODE_ENV == "Production"?"none":"lax"
    }

    return res
    .status(200)
    .cookie("accesstoken",accesstoken,options)
    .cookie("refreshtoken",refreshtoken,options)
    .json(
        new ApiResponse(200,{
            user:loggeduser,accesstoken,refreshtoken
        },"logged in successfully")
    )
})

const logout=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accesstoken",options)
    .clearCookie("refreshtoken",options)
    .json(
        new ApiResponse(200,{},"logged out successfully")
    )
})

const getCurrentUser=asyncHandler(async(req,res)=>{
        return res
        .status(200)
        .json(
            new ApiResponse(200,{user:req.user},"user fetched successfully")
        )
        
})

const changePassword=asyncHandler(async(req,res)=>{
    const {oldpassword,newpassword,confirmpassword}=req.body
    if([oldpassword,newpassword,confirmpassword].some((field)=>!field || field.trim()===""))
    {
        throw new ApiError(400,"all fields are required")
    }

    const user=await User.findById(req.user?._id)
    if (!user) throw new ApiError(400,"user does not exist")

    const oldpasswordcorrect=await user.isPasswordCorrect(oldpassword)
    if(!oldpasswordcorrect) throw new ApiError(400,'old password incorrect')
    
    if (newpassword !== confirmpassword){
        throw new ApiError(400,'new password and confirm password do not match')
    }

    user.password=newpassword
    await user.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"password changed successfully")
    )
})

const forgotPassword=asyncHandler(async(req,res)=>{
    const {email}=req.body

    if(!email || email.trim()==="") throw new ApiError(400,"Email is required")

    const user=await User.findOne({
        email:email.toLowerCase()
    })
    if(!user) throw new ApiError(400,"Invalid email.")

    const otp=Math.floor(100000 + Math.random()*900000).toString()

    user.forgetPasswordOtp=otp
    user.forgetPasswordOtpExpiry=Date.now() + 600000
    user.forgetPasswordOtpVerified = false;
    await user.save({validateBeforeSave:false})
    const sent=await sendMail(
        user.email,
        "Password Reset OTP",
        `<h2>Reset Your Password.</h2>
        <p>your otp is:<h2>${otp}</h2>.</p>
        <p>your OTP expires in 10 minutes.</p>
        `
    )
    if(!sent){
        user.forgetPasswordOtp=undefined
        user.forgetPasswordOtpExpiry=undefined
        user.forgetPasswordOtpVerified = false;
        await user.save({validateBeforeSave:false})

        throw new ApiError(500,"something went wrong while sending mail")
    }

    return res.
    status(200).
    json(new ApiResponse(200,
        {},
        "otp sent successfully"
    ))
})

const verifyOtp=asyncHandler(async(req,res)=>{
    const {email,otp}=req.body
    if([email,otp].some((field)=>!field || field.trim()==="")) throw new ApiError(400,"all field required")

    const user=await User.findOne({
        email:email.toLowerCase()
    })   
    if(!user) throw new ApiError(400,"user not found.")

    if(user.forgetPasswordOtp !== otp){
        throw new ApiError(400,"otp invalid.")
    }
    if(user.forgetPasswordOtpExpiry < Date.now())
    {
        throw new ApiError(400,"otp expired.");    
    }

    user.forgetPasswordOtpVerified=true //if not checked then using postmans or thrunder cloud etc. attacker can directly request /reset-password and rest it.
    await user.save({validateBeforeSave:false})

    return res.
    status(200).
    json(
        new ApiResponse(200,
            {},
            "otp verified successfully you can reset password"
        )
    )
})

const resetPassword=asyncHandler(async(req,res)=>{
    const {email,newpassword,confirmpassword}=req.body

    if([email,newpassword,confirmpassword].some((field)=>!field || field.trim()==="")){
        throw new ApiError(400,"all fields are required")
    }

    if (newpassword !== confirmpassword) throw new ApiError(400,"new password and confirm password must be same")
    
    const user=await User.findOne({
        email:email.toLowerCase()
    })
    if(!user) throw new ApiError(400,"user not found")
    
    if(!user.forgetPasswordOtpVerified){
        throw new ApiError(400,"Please verify OTP first")
    }

    user.password=newpassword
    user.forgetPasswordOtp=undefined
    user.forgetPasswordOtpExpiry=undefined
    user.forgetPasswordOtpVerified=false
    await user.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Password reset successfully.")
    )
})
const resendOtp=asyncHandler(async(req,res)=>{
    const {email}=req.body
    if(!email) throw new ApiError(400,"Email required")
    
    const user=await User.findOne({
        email:email.toLowerCase()
    })
    if (!user) throw new ApiError(400,"Invalid email")

    const newOtp=Math.floor(100000 + Math.random()*900000).toString()

    user.forgetPasswordOtp=newOtp
    user.forgetPasswordOtpExpiry=Date.now() + 600000
    user.forgetPasswordOtpVerified=false
    await user.save({validateBeforeSave:false})
    const send=await sendMail(
        user.email,
        "Resend OTP for password Reset",
        `<h2>Reset Your Password.</h2>
        <p>your otp is:<h2>${newOtp}</h2>.</p>
        <p>your OTP expires in 10 minutes.</p>`
    )
    if (!send){
        user.forgetPasswordOtp=undefined
        user.forgetPasswordOtpExpiry=undefined
        user.forgetPasswordOtpVerified=false
        await user.save({validateBeforeSave:false})

        throw new ApiError(500,"Somthing went wrong while sending OTP")
    }

    return res.
    status(200).
    json(new ApiResponse(200,
        {},
        "otp sent successfully"
    ))
})

const deleteUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndDelete(
        req.user._id
    )
    const options={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accesstoken",options)
    .clearCookie("refreshtoken",options)
    .json(
        new ApiResponse(200,{},"User Deleted")
    )
})
export {
    register,
    login,
    refreshAccessToken,
    logout,
    changePassword,
    getCurrentUser,
    forgotPassword,
    verifyOtp,
    resetPassword,
    resendOtp,
    deleteUser
}
