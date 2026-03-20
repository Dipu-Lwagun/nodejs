module.exports ={
    HOST:'localhost',
    USER: "root",
    PASSWORD: "",
    DB: "nodejs",
    dialect: "mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idel: 10000,
    },
};