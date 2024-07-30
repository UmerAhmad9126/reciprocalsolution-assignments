const mongoose =require('mongoose');

const subTaskSchema=new mongoose.Schema({
    subTaskeName:{
        type: String,
        required: true,
        trim: true,
    },
    subTaskDescription: {
        type: String,
        required: true,
      },
   
})
module.exports = mongoose.model('SubTask', subTaskSchema);