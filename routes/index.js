var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = "supersecret";


var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


var login=require('../controller/login');
var register=require('../controller/register');
var getProfile=require('../controller/getProfile');
var postProfile=require('../controller/postProfile');
var qrGenerator=require('../controller/qrGenerator');
var scanqr=require('../controller/scanqr');

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next){
    console.log(res.locals);
    res.json({
      success:true
    })
    
});



// api for login
router.post('/login', function (req, res, next) {
 login(req,res,next);
});


//This api is for register of user
router.post('/register', function (req, res, next) {
register(req,res,next);

});


router.get('/profile', function (req, res) {
getProfile(req,res,next);
});


//this route is called as POST when profile change is required
router.post('/profile', function (req, res) {
 postProfile(res,res,next);
});



router.post('/qrgenerator', function (req, res, next) {
qrGenerator(res,res,next);
 
});

//api for storing image and latitude longitude of person scanning the qr
router.post('/scanqr', function (req, res, next) {
scanqr(req,res,next);
});




//this function checks if the user is in session or not
function isAuthenticated(req, res, next){
    console.log(req.headers['authorization']);
    if(req.headers['authorization']){
        jwt.verify(req.headers['authorization'], secret, function(err, decoded){
            if(err){
                console.log(err);
                return handleError(err, null, res);
            }
            res.locals.userId = decoded.id;
            console.log("calling next now and " + res.locals.userId);
            return next();
        })
    }else{
        res.json({
            success:false,
            auth:false,
            msg:"authentication unsuccessful, please login again"
        });
    }
}






//this function is a general error handler
function handleError(err, msg, res) {
  console.log(err);
  if (msg == undefined) {
    msg = "there was some error at the server"
  }
  return res.json({
    success: false,
    msg: msg,
    err: err
  })
}





module.exports = router;
