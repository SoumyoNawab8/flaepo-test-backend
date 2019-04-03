const Sequalize=require('sequelize');

module.exports= new Sequalize('flaepo','root','',{
    host: 'localhost',
    dialect: 'mysql',
    timeStamps: false,

    pool:{
        max:5,
        min:0,
        acquire:3000,
        idle: 10000
    },
})