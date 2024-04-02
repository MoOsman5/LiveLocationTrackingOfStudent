const express = require('express') ;
const router  = express.Router();
 const  { register , login  } = require ("./../controllers/authCtl.js") 
 const {verfiytoken} = require('../utils/verfiytoken.js')
 router.post("/register" ,   register)
router.post("/login" , verfiytoken , login)









module.exports = router