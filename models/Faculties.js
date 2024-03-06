const mongoose = require  ("mongoose");

const facultyScehma = new mongoose.Schema({

    name : {
type : String , required : true 
}

},

{
  timestamps: true , 
},


)

  

module.exports =  mongoose.model('facultyScehma' , facultyScehma);