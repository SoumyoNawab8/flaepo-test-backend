const express=require('express');
const router=express.Router();
const db=require('../../config/dBase');
const User=require('../../models/User');
const jwt = require('jsonwebtoken');

function ValidateFields(fields){
  let missingfields=[];
  Object.keys(fields).map(key=>{
    if(fields[key].length==0){
      missingfields.push(key+" can't be empty!");
    }
  })

  if(missingfields.length>0){
    return missingfields;
  }
  else{
    return true;
  }
}



router.post('/login',(req,res,next)=>{
  console.log(req.body)
  if(req.body.email==undefined && req.body.password==undefined){
    res.send('Email and password is required!')
  }

  if(req.body.email.length!=0 && req.body.password.length!=0){
    User.findOne({where:{email:req.body.email,password:req.body.password}}).then(result=>{
      if(result!=null){
            jwt.sign({id:result.id,name:result.name}, 'falepo_secret', {
      expiresIn: 3600
    }, (err, token) => {
      res.json({
        Success: true,
        Token: 'Bearer ' + token
      });});

      }
      else{
        console.log(result);
      }
    }).catch(err=>console.log(err))

  }
  else{

    res.send("Email and password can't be empty!")
  }
})
    
// router.get('/users')

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