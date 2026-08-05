import mongoose from 'mongoose'

const inviteSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        projectId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project",
            required:true
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        token:{
            type:String,
            required:true,
            unique:true
        },
        status:{
            type:String,
            enum:["pending", "accepted", "expired"],
            default:"pending"
        },
        expiresAt:{
            type:Date,
            required:true
        }
    },{
        timestamps:true
    }
)

const Invite=mongoose.model("Invite",inviteSchema)

export {Invite}