const mongoose = require  ("mongoose");

const DepartmentSchema = new mongoose.Schema({
faculty : {
     type: mongoose.Schema.Types.ObjectId, required: false, ref: "facultyScehma" 

},

departmentname :{
type:String , 
required :true 

}


},

{
  timestamps: true , 
},


)
  
  

module.exports =  mongoose.model('DepartmentSchema' , DepartmentSchema);