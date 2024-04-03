const express = require('express') ;
const router  = express.Router();
 const  { register , login  } = require ("./../controllers/authCtl.js") 
 const {verifyToken , verifyStudent} = require('../utils/verfiytoken.js')
 router.post("/register", register)
router.post("/login" ,  login)









module.exports = router