const express=require('express');
const app=express();
const db=require('./config/dBase');
const bodyParser=require('body-parser');
const path=require('path');
const passport = require('passport');
const exphbs=require('express-handlebars');
var store = require('store')

db.authenticate()
.then(()=>console.log('Databse Connected'))
.catch((err)=>console.log('Error: '+err));

app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname,'public')));

require ('./config/passport')(passport)
app.get('/error',(req,res)=>{
    res.send('Some error')
})
// app.use(passport.session());

app.get('/',(req,res)=>{
    res.render('home',{
        imgUrl:'/images/bg2.jpg',
        title:"We are rendering from HandleMars"})
})

app.get('/register',(req,res)=>{
    res.render('register',{
        title:"Registration | LUCID DREAMS"});
})

app.get('/login',(req,res)=>{
    res.render('login',{
        title:"Login | LUCID DREAMS"});
})

app.get('/profile',(req,res)=>{
    res.render('profile',{
    title:"Profile",
    token:store.get('token')
    })
})

app.get('/logout',(req,res)=>{
    store.remove('token');

    // setTimeout(function(res){
    //     res.redirect('/login');
    // },1000);
   
})

app.use('/users',require('./routes/api/users'));


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('Backend Running at:')
    console.log('http://localhost:5000/');
})