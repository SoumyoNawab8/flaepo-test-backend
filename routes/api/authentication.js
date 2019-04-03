const express=require('express');
const router=express.Router();
const db=require('../../config/dBase');
const User=require('../../models/User');
const jwt = require('jsonwebtoken');




router.post('/login',(req,res,next)=>{
  if(req.body.email==undefined && req.body.password==undefined){
    res.send('Email and password is required!')
  }

  if(req.body.email.length!=0 && req.body.password.length!=0){
    User.findOne({where:req.body}).then(result=>{
      if(result.id!=undefined){
            jwt.sign({id:result.id,name:result.name}, 'falepo_secret', {
      expiresIn: 3600
    }, (err, token) => {
      res.json({
        Success: true,
        Token: 'Bearer ' + token
      });});
      }
    })

  }
  else{

    res.send("Email and password can't be empty!")
  }
})
    
// router.get('/users')

router.post('/register',function(req,res){
    User.create(req.body)
    .then((result=>{
        res.send(result)
    }))
    .catch(err=>{res.send(err)})
})

module.exports=router;