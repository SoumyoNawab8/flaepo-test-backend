const express=require('express');
const router=express.Router();
const User=require('../../models/User')
const passport=require('passport');

router.use('/auth',require('./authentication'));

router.use(passport.authenticate('jwt',{session: false}));

router.get('/',(req,res)=>{

    res.json(req.user);
})

module.exports=router;