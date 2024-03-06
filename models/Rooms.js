const mongoose = require  ("mongoose");


const roomSchema = new mongoose.Schema({
department : 
    { type: mongoose.Schema.Types.ObjectId, required: false, ref: "DepartmentSchema" },

roomname: {
type : String ,
requried : true 

}


},


{
  timestamps: true , 
},


)
  
  
  

module.exports =  mongoose.model('roomSchema' , roomSchema);