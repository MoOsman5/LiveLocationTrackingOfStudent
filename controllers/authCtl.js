const User = require ( "../models/User.js")
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken") 







const validEmail = (email)=>{
    const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
    }


exports.register =  async (req,res) =>{
    try{
    const {Username,email,password} = await req.body
  
  const user =  await User.findOne({email});
const username = await User.findOne({Username})
    //       if(user.Username){

    //     return res.status(500).json({

    //         error : 'User Name Already Exist'
    //     })

    // }

  if(user ){
    return res.json({ status: 'error', error: 'User Already Exist' })
  }

  if(username ){
    return res.json({ status: 'error', error: 'Username AlreadyExist' })
  }
  if(!validEmail(email)){
    return res.json({ status: 'error', error: 'Invalid Email' })
  
  
  }
  
  
  if(password.length< 6 ){
    return res.json({
      status: 'error',
      error: 'Password too small. Should be atleast 6 characters'
    })
  }
  
  
  const hashedPassword =  bcrypt.hashSync(password,10);
  
 
  
    const newUser = await User.create({Username ,email,password :hashedPassword})
res.status(200).json({
message: "You Successfully Make Account"

})
  
   
  }catch(error){
  
    return res.status(401).json({ status: 'error', error: error.message})
  
  
  }
    
    
  }


  exports.login = async(req,res,next)=>{
  try{
   
    const user = await User.findOne({email : req.body.email}).select('+password')
  
    const isPasswordCorrect =  await user.correctPassword( await req.body.password , user.password)
  if(!isPasswordCorrect){
  res.status(404).json({
  message : "User Name Or Password are in Correct"
  
  })  
    }
    
    if(!user){
    return next(404,"User Not Found")
    
    }
  //Generate Token For New Users
    const token = jwt.sign({id : user._id , role:user.roles}, process.env.TOKEN_PASS)
    const {password , ...otherDetails} = user._doc;
      res.cookie("access_token",token,{
      
      }).status(200).json({...otherDetails , message : "You Successfully Login"}  );

// Meesage Welcomed You
      






      let oldTokens = user.tokens || [];

if (oldTokens.length) {
  oldTokens = oldTokens.filter(t => {
    const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
    if (timeDiff < 86400) {
      return t;
    }
  });









    }}catch(err){
   res.status(err.message)

    }
      


}