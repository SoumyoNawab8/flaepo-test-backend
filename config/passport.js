const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const jwtkey=require('./jwtKey');
var LocalStrategy = require('passport-local').Strategy;

var User=require('../models/User');

module.exports = function(passport) {
  passport.use('local-login',new LocalStrategy({usernameField:'email',passwordField:'password'},
    function(email, password, done) {
      User.findOne({where:{ email: email,password:password }}).then((err, user)=>{
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        
        return done(null, user);
      });
    }
  ));
  const opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=jwtkey.key;

  passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    User.findOne({where:{id:jwt_payload.info.id}})
      .then(user=>{
        if(user){
          return done(null,user,jwt_payload);
        }
        return done(null, false);
      })
      .catch(err=>console.log(err));
  })
);


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findOne({where:{id:id}}).then((err, user)=>{
      if(err) {
        console.error('There was an error accessing the records of' +
        ' user with id: ' + id);
        return console.log(err.message);
      }
      return done(null, user);
    })
  });
  }