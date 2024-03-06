const UserModel = require('../models/User.js')



exports.getAllUsers = async (req,res) =>{

try{
const users = await UserModel.find();
res.status(200).json({
data : users


})

}catch(err){

res.status(404).json({
error : err.message
})
}
}



exports.findUser= async (req,res) =>{
try{
const user =  await UserModel.findById(req.params.id)
res.status(200).json({
data : user

})


}catch(err){

res.status(404).json({

error : err.message

})
}
}


exports.DeleteUser = async (req,res)=>{
try{
    const id  = await req.params.id
    const deleteduser = await UserModel.findByIdAndDelete(id)

    res.status(200).json({
message : "Successfully Deleted"

    })
    

}catch(err){
res.status(404).json({

error : err.message

})
}

}




exports.UpdateUser = async(req,res)=>{
try{
    const UpdatedUser = await UserModel.findByIdAndUpdate(req.params.id , req.body ) 
res.status(200).json("Successfully Ubdated")

}catch(err){
res.status(404).json({

error: err.message

})

}

}





