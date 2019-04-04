const express=require('express');
const router=express.Router();
const db=require('../../config/dBase');
const jwtkey=require('../../config/jwtKey');
const User=require('../../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const ValidateFields=require('../../helpers/validateFields');
var store = require('store');

router.post('/login',(req,res,next)=>{
  let passFields=ValidateFields(req.body);
  if(passFields==true){
  passport.authenticate('local-login',{session:false},(info,admin,err)=>{
    console.log()
    if(info==null){
       res.json({status:false,message:'Invalid user credentials!'});
    }
    else{

            var token = jwt.sign({info},jwtkey.key,{expiresIn: 5000000});
            store.set('token',token)
            // res.json({
            //     success: true,
            //     message: "Successfull",
            //     admin: admin,
            //     token: token
            // });
            res.redirect('/profile');
        
    }
    })(req,res,next);
  }
  else{
    let errString="";
    passFields.map(item=>{
      passFields.length==0?errString=item:errString+="<br/> "+item;
    })
    res.send(errString)
  }
})
    

router.post('/register',function(req,res){
  let passFields=ValidateFields(req.body);
  if(passFields==true){
    User.create(req.body)
    .then((result=>{
        // res.send(result)
        res.redirect('/login');
    }))
    .catch(err=>{res.send(err)})
  }
  else{
    let errString="";
    passFields.map(item=>{
      passFields.length==0?errString=item:errString+="<br/> "+item;
    })
    res.send(errString)
  }
    
})

module.exports=router;