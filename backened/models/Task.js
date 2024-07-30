const mongoose =require('mongoose');

const taskSchema=new mongoose.Schema({
    taskeName:{
        type: String,
        required: true,
        trim: true,
    },
    taskDescription: {
        type: String,
        required: true,
      },
    is_task_completed:{
        type: Boolean,
        default: false,
    },
    subtask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTask",
        required: true,
    },
})
module.exports = mongoose.model('Task', taskSchema);