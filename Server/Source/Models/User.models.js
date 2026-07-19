import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        url:String,
        public_id:String
    },
    refreshToken:{
        type:String
    },
    forgetPasswordOtp:{
        type:String
    },
    forgetPasswordOtpExpiry:{
        type:Date
    },
    forgetPasswordOtpVerified: {
    type: Boolean,
    default: false
}
},{
    timestamps:true
}
)

userSchema.pre('save',async function(){
    if (! this.isModified("password")) return
    this.password=await bcrypt.hash(this.password,10)
})  
userSchema.methods.isPasswordCorrect=async function(enterpassword){
    return await bcrypt.compare(enterpassword,this.password)
}
userSchema.methods.createAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            userName:this.userName,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}
userSchema.methods.createRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}

const User =mongoose.model("User",userSchema)
export {User}