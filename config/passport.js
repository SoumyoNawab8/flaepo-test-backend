
const User=require('../models/User');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;


const opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey='falepo_secret';

module.exports=passport=>{
  passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    User.findOne({where:{id:jwt_payload.id}})
      .then(user=>{
        if(user){
          return done(null,user);
        }
        return done(null, false);
      })
      .catch(err=>console.log(err));
  })
);

};