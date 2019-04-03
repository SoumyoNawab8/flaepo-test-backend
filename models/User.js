const Sequalize=require('sequelize');
const db=require('../config/dBase');


const Users=db.define('Users',{
    email:{
        type:Sequalize.STRING
    },
    password:{
        type:Sequalize.STRING
    },
    name:{
        type:Sequalize.STRING
    },
    age:{
        type:Sequalize.INTEGER
    }
});

module.exports=Users;