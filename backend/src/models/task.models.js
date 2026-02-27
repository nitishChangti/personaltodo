import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        required:true
    },
    dueDate:{
        type:Date
    },
    tags:[
        {
            type:String,
            trim:true
        }
    ],
    status:{
        type:String,
        enum:['Todo','In Progress','Completed'],
        default:'Todo'
    },
    isImportant:{
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

},{
    timestamps:true
})

const Task = mongoose.model('Task',taskSchema);
export default Task;