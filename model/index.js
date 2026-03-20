const dbConfig =require("../config/dbConfig");
const { Sequelize, DataType, DataTypes} =require("sequelize");

// la Sequelize yo config haru lag ane database connect gardey vaneko hai

const sequelize =new Sequelize(dbConfig.DB, dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatoraliases: false,
    port: 3306,

    pool:{
        max:dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idel,
    },
});

sequelize
.authenticate()
.then(()=>{
    console.log("connect!!");
})
.catch((err)=>{
    console.log("err" + err);
});
const db ={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


//YO CHAI DATABASE MA FILE HUNXA HAI

//importing model files
// db.blogs = require("./blogModel.js")(sequelize, DataTypes);
db.users = require("./userModule.js")(sequelize, DataTypes);
db.blogs = require("./blogModel.js")(sequelize, DataTypes);


db.sequelize.sync({ force:false}).then(()=>{
    console.log("yes re-sync done");

});
module.exports =db;