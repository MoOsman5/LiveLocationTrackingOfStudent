const facultymodel = require('../models/Faculties.js')



exports.AddFaculty = async (req,res)=>{

try{

const newFaculty = await facultymodel.create({
name : req.body.name

})
res.status(200).json({
message : "Successfully Created The Faculty "

})

}catch(err){
res.status(404).json({

error : err.message

})}}


exports.getAllfaculty = async (req,res) =>{

    try{
    const faculties = await facultymodel.find();
    res.status(200).json({
    data : faculties
    
    
    })
    
    }catch(err){
    
    res.status(404).json({
    error : err.message
    })
    }
    }



exports.findfaculty= async (req,res) =>{
    try{
    const faculty =  await facultymodel.findById(req.params.id)
    res.status(200).json({
    data : faculty
    
    })
    
    
    }catch(err){
    
    res.status(404).json({
    
    error : err.message
    
    })
    }
    }
    
    
    exports.DeleteFaculty = async (req,res)=>{
    try{
        const id  = await req.params.id
        const deletedfaculty = await facultymodel.findByIdAndDelete(id)
    
        res.status(200).json({
    message : "Successfully Deleted"
    
        })
        
    
    }catch(err){
    res.status(404).json({
    
    error : err.message
    
    })
    }
    
    }
    
    
    
    
    exports.Updatefaculty = async(req,res)=>{
    try{
        const Updatedfaculty = await facultymodel.findByIdAndUpdate(req.params.id , req.body ) 
    res.status(200).json("Successfully Ubdated")
    
    }catch(err){
    res.status(404).json({
    
    error: err.message
    
    })
    
    }
    
    }