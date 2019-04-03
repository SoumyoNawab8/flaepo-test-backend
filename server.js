const express=require('express');
const app=express();
const db=require('./config/dBase');
const bodyParser=require('body-parser');
const passport = require('passport');



db.authenticate()
.then(()=>console.log('Databse Connected'))
.catch((err)=>console.log('Error: '+err));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());

require ('./config/passport')(passport)
app.get('/error',(req,res)=>{
    res.send('Some error')
})
// app.use(passport.session());



app.use('/users',require('./routes/api/users'));


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('Backend Running at:')
    console.log('http://localhost:5000/');
})