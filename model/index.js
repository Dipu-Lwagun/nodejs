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
db.questions = require('./questionModule.js')(sequelize,DataTypes);
db.answers =require('./answerModule.js')(sequelize,DataTypes)

db.users.hasMany(db.questions)
db.questions.belongsTo(db.users)
// yo chai aauta user dhari question sodnu sakxa trw tyo question chai tai aauta lay matraa sodeko hunxa

db.questions.hasMany(db.answers)
db.answers.belongsTo(db.questions)
// yo chai question answer ko

db.users.hasMany(db.answers)
db.answers.belongsTo(db.users)


db.sequelize.sync({ force:false}).then(()=>{
    console.log("yes re-sync done");

});
module.exports =db;