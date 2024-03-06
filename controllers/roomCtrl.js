const roommodel = require('../models/Rooms.js')


exports.createroom = async (req,res)=> {
try{
    const Room = await roommodel.create({ department :req.body.department , roomname :req.body.roomname
    })
    
    res.status(200).json({

message : "Successfully Created The Room"

    })

}catch(err){

    res.status(404).json({

message :err.message

    })
}}


exports.getAllrooms = async (req,res) =>{

    try{
    const Rooms = await roommodel.find();
    res.status(200).json({
    data : Rooms
    
    
    })
    
    }catch(err){
    
    res.status(404).json({
    error : err.message
    })
    }
    }



exports.findderoom= async (req,res) =>{
    try{
    const room =  await roommodel.findById(req.params.id)
    res.status(200).json({
    data : room
    
    })
    
    
    }catch(err){
    
    res.status(404).json({
    
    error : err.message
    
    })
    }
    }
    
    
    exports.Deleteroom = async (req,res)=>{
    try{
        const id  = await req.params.id
        const deletedroom = await roommodel.findByIdAndDelete(id)
    
        res.status(200).json({
    message : "Successfully Deleted"
    
        })
        
    
    }catch(err){
    res.status(404).json({
    
    error : err.message
    
    })
    }
    
    }
    
    
    
    
    exports.Updatedroom = async(req,res)=>{
    try{
        const Updatedroom = await roommodel.findByIdAndUpdate(req.params.id , req.body ) 
    res.status(200).json("Successfully Ubdated")
    
    }catch(err){
    res.status(404).json({
    
    error: err.message
    
    })
    
    }
    
    }


    exports.getDetailedroom = async(req,res) =>{
try{
   
  const roomid = await req.params.id
  const details = await roommodel.find({ _id: roomid }).populate({
    path: 'department',
    select: 'departmentname faculty', 
    populate: {
        path: 'faculty',
        select: 'name' 
    }
});
res.status(200).json({

data :details

})


}catch(err){

    return res.status(404).json({
message : err.message

    })
}




    }