const express = require("express");
const  mongoose = require("mongoose");
const { Sequelize } = require('sequelize');
const url = require("url");
const app = express();
// const http = require("http").Server(app);
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server);
const  cors = require ("cors") ;
const  dotenv = require ('dotenv') ;    
const cookieParser = require('cookie-parser')
const authroute = require('./routes/auth.js')
const userrouter = require('./routes/users.js')
const roomrouter = require('./routes/room.js')
const departmentrouter = require('./routes/department.js')
const facultyrouter = require('./routes/faculties.js')
const User = require('./models/User.js')
dotenv.config();


app.use(cors());
 app.use(express.json())
 app.use(cookieParser());
 app.use(express.urlencoded({extended :true}))
 
 //MiddleWare Method For Get The Time For Any Action
 app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  
  next();
  })
  // const data = await  req.body;

  // Emit a fake 'location' event to simulate receiving location data
//Validation
 
app.use("/auth" , authroute);
app.use("/users" , userrouter);
app.use("/rooms" , roomrouter);
app.use("/department" , departmentrouter);
app.use("/faculty" , facultyrouter);

//Implementaion Of Socket Io 

const port = process.env.PORT;


 server.listen(port, () =>{

console.log(`app is  Running on ${port}`);

});

app.post('/',async (req, res) => {

  io.emit('location', "hello Hello");

  res.json({ message: 'Location data sent successfully' });
});
 io.on('connection', (socket) => {
  
  console.log('Socket connection established');
        //     console.log("Before database query");
      //     const user = await User.findOne({ Username: data.Username });
      //     console.log("After database query");

      //     if (!user) {
      //         console.log('User not found');
      //         return;
      //     }

      //     // Update user's location
      //     user.latitude = data.latitude;
      //     user.longitude = data.longitude;
      //     await user.save();

      //     // Emit updated location to all clients
      //     sockethandelr.emit('locationUpdate', { Username: user.Username, latitude: user.latitude, longitude: user.longitude });
       
  

     
     
   

  socket.on('disconnect', () => {
      console.log('Socket disconnected');
  });
});






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
















