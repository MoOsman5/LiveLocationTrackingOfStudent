const express = require("express");
const  mongoose = require("mongoose");
const { Sequelize } = require('sequelize');
const url = require("url");
const app = express();
const http = require("http").Server(app);
const io  = require("socket.io")(http)
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

//Validation
 
app.use("/auth" , authroute);
app.use("/users" , userrouter);
app.use("/rooms" , roomrouter);
app.use("/department" , departmentrouter);
app.use("/faculty" , facultyrouter);

//Implementaion Of Socket Io 
io.on('connection', (socket) => {
  console.log('User connected');

  // When a user sends their location
  socket.on('location', async (data) => {
      try {
          // Find the user by username
          const user = await User.findOne({ Username: data.Username });
          
          if (!user) {
              console.log('User not found');
              return;
          }

          // Update user's location
          user.latitude = data.latitude;
          user.longitude = data.longitude;
          await user.save();

          // Emit updated location to all clients
          io.emit('locationUpdate', { Username: user.Username, latitude: user.latitude, longitude: user.longitude });
      } catch (err) {
          console.error('Error updating location:', err);
      }
  });

  // Disconnect event
  socket.on('disconnect', () => {
      console.log('User disconnected');
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
















const port = process.env.PORT;


app.listen(port, () =>{

console.log(`app is  Running on ${port}`);

});