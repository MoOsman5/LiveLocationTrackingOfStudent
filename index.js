const express = require("express");
const  mongoose = require("mongoose");
const { Sequelize } = require('sequelize');
const url = require("url");
const app = express();
const path = require("path"); // Import the 'path' module

// const http = require("http").Server(app);
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server , {

  cors : {
    origin : "*"
  }
});
const  cors = require ("cors") ;
const  dotenv = require ('dotenv') ;    
const cookieParser = require('cookie-parser')
app.use(cors());
const authroute = require('./routes/auth.js')
const userrouter = require('./routes/users.js')
const roomrouter = require('./routes/room.js')
const departmentrouter = require('./routes/department.js')
const facultyrouter = require('./routes/faculties.js')
const User = require('./models/User.js')
dotenv.config();
app.use("/socket.io", express.static(path.join(__dirname, "node_modules", "socket.io", "client-dist")));



 app.use(express.json())
 app.use(cookieParser());
 app.use(express.urlencoded({extended :true}))
 
 //MiddleWare Method For Get The Time For Any Action
 app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  
  next();
  })

 
app.use("/auth" , authroute);
app.use("/users" , userrouter);
app.use("/faculty" , facultyrouter);
app.use("/rooms" , roomrouter);
app.use("/department" , departmentrouter);


//Implementaion Of Socket Io 


const socketHandler = (io) => {
    io.on('connection', (socket) => {
      console.log('A user connected');
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });


  socket.on('location', async (data) => {
    try {
        console.log("Before database query");
        console.log("Hello")
        const user = await User.findOne({ Username: data.Username });
        console.log("After database query");

        if (!user) {
            console.log('User not found');
            return;
        }

        // Update user's location
        user.latitude = data.latitude;
        user.longitude = data.longitude;
        await user.save();

        //  Emit updated location to all clients
         io.emit('locationUpdate', { Username: user.Username, latitude: user.latitude, longitude: user.longitude });

      } catch (err) {
        console.error('Error updating location:', err);
    }
});
    });
  };

  const port = process.env.PORT;
  server.listen(port, async () =>{
     socketHandler(io);
  console.log(`app is  Running on ${port}`);
  
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
















