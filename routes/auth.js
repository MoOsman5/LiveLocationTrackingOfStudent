const express = require('express') ;
const router  = express.Router();
 const  { register , login  } = require ("./../controllers/authCtl.js") 
 const {verfiytoken , verifyStudent} = require('../utils/verfiytoken.js')
 router.post("/register", register)
router.post("/login" , verifyStudent , login)









module.exports = router