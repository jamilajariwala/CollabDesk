import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        default:"",
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:true
    },
    milestoneId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Milestone',
        required:true
    },
    status:{
        type:String,
        enum:['todo','in_progress','in_review','completed'],
        default:'todo'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    approval:{
        status:{
            type:String,
            enum:['not_requested','pending','approved','changes_requested'],
            default:'not_requested'
        },
        requestedAt:{
            type:Date
        },
        respondedAt:{
            type:Date
        },
        respondedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },
    dueDate:{
        type:Date
    }

},{
    timestamps:true
})

const Task=mongoose.model('Task',taskSchema)

export{
    Task
}