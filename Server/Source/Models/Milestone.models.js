import mongoose from "mongoose";

const milestoneSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['pending','in_progress','completed'],
        default:'pending'
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})

const Milestone=mongoose.model("Milestone",milestoneSchema)

export {Milestone}