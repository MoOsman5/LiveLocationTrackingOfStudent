const express = require("express");
const  mongoose = require("mongoose");
const { Sequelize } = require('sequelize');
const http = require("http");
const url = require("url");
const  cors = require ("cors") ;
const  dotenv = require ('dotenv') ;    
const cookieParser = require('cookie-parser')
const authroute = require('./routes/auth.js')
const userrouter = require('./routes/users.js')
const roomrouter = require('./routes/room.js')
const departmentrouter = require('./routes/department.js')
const facultyrouter = require('./routes/faculties.js')

dotenv.config();
const app = express();

app.use(cors());
 app.use(express.json())
 app.use(cookieParser());
 app.use(express.urlencoded({extended :true}))
 
 //MiddleWare Method For Get The Time For Any Action
 app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  
  next();
  })

//Validation
 
app.use("/auth" , authroute);
app.use("/users" , userrouter);
app.use("/rooms" , roomrouter);
app.use("/department" , departmentrouter);
app.use("/faculty" , facultyrouter);






 app.all("*" , (req,res,next)=>{
  res.status(404).json({
  
  
  status : "fail" ,
  message : `Cant Find ${req.originalUrl} on This Server`
  
  })
  
  
  })
  
  


mongoose.connect(process.env.MONGO_URI,{
}).then(con=>{
console.log("Connected To Data Base")
  
})
















const port = process.env.PORT;


app.listen(port, () =>{

console.log(`app is  Running on ${port}`);

});