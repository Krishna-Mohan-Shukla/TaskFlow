const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    department:{
        type:String,
        required:true,
        trim:true
    },

    client:{
        type:String,
        required:true,
        trim:true
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        default:""
    },

    priority:{
        type:String,
        enum:["Low","Normal","High","Urgent"],
        default:"Normal"
    },

    status:{
        type:String,
        enum:["Pending","In Progress","Done"],
        default:"Pending"
    },

    workHours:{
        type:Number,
        default:0
    },

    workMinutes:{
        type:Number,
        default:0
    },

    startTime:{
        type:Date,
        default:null
    },

    endTime:{
        type:Date,
        default:null
    },

    totalWorkingSeconds:{
        type:Number,
        default:0
    },

    extraTime:{
        type:Number,
        default:0
    },

    remarks:{
        type:String,
        default:""
    },

    taskDate:{
        type:Date,
        required:true
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Task", taskSchema);