import mongoose from 'mongoose'

const deliverableschema= new mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:true
    },
    mileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Milestone',
        required:true
    },
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task',
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    url:{
        type:String,
        required:true
    },
    cloudinarypublicId:{
        type:String
    },
    type:{
        type:String,
        enum:['Link','Image','Pdf'],
        required:true
    },
    filename:{
        type:String
    },
    resourceType:{
        type:String
    }
},{
    timestamps:true
})

const Deliverables=mongoose.model("Deliverables",deliverableschema)

export default Deliverables