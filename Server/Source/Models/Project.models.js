import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:"",
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    client:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    inviteStatus:{
        type:String,
        enum:["not_invited", "Invited", "Accepted"],
        default:"not_invited"
    },
    projectStatus:{
        type:String,
        enum:["Planning","In_Progress","Completed"],
        default:"Planning"
    },
    startDate:{
        type:Date,
        default:Date.now
    },
    endDate:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})

const Project =mongoose.model("Project",projectSchema)

export {Project}