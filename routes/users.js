
const express = require('express') ;
const userrouter  = express.Router();
const verify = require('../utils/verfiytoken.js')
const usercontoller = require('../controllers/userCtl.js')

userrouter.get('/Allusers' , usercontoller.getAllUsers)
userrouter.get('/finduser/:id' , usercontoller.findUser)
userrouter.patch('/updateuser/:id' , usercontoller.UpdateUser)
userrouter.delete('/deleteuser/:id' , usercontoller.DeleteUser)

module.exports = userrouter


