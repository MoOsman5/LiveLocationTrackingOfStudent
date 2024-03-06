const jwt = require( "jsonwebtoken");
const  createError  = require( "./error");

exports.verifyToken = (req, res, next) => {
   const token = req.cookies.access_token;
  console.log("here")
   if (!token) {
  
    return res.status(505).json("you are Not Authorized")
  
  }

  jwt.verify(token, process.env.TOKEN_PASS, (err, user) => {
    if (err) return res.status(400);
    req.user = user;
    next();
  });
};

exports.verifyStudent = (req, res, next) => {
  exports.verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.roles) {
      next();
    } else {
return res.status(505).json("error")
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  exports.verifyToken(req, res, next, () => {
    if (req.user.roles == 'admin' || req.user.roles == 'superadmin') {
      next();
    } else {
      return  res.status(400) ;
    
    }
  });
};

exports.verifyTeacher = (req, res, next) => {
  exports.verifyToken(req, res, next, () => {
    if (req.user.roles = 'teachers') {
      next();
    } else {
      return  res.status(400);
    }
  });
};




exports.verifyadminorTeacher = (req, res, next) => {
 console.log('iam here')
  exports.verifyToken(req, res, next, () => {
    console.log("hello Againg")
    console.log(req.user.role)

    if ((req.user.role == 'teachers') || (req.user.role == 'admin') ||  (req.user.role == 'superadmin') ) {
      next();
    } else {
      return  res.status(400);
    }
  });
};



