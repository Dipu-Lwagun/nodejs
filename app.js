const express = require('express')
const { users } = require('./model/index')
const app = express()
const bcrypt =require('bcrypt')
const { where } = require('sequelize')
const jwt =require('jsonwebtoken')
const { randerHomePage, randerRegisterpage, randerLoignpage, handleRegister, handleLogin } = require('./controller/authController')

require ("./model/index")

const authRoute= require('./routes/authRoute')
// yo chai frontend banauna ko lage rw tyo frontend  lai rander garnu ko lage yako lage ejs download garne
app.set ('view engine','ejs')
app.use(express.urlencoded({extended : true})) //yale chai ke data aaudai xa taslai buj hai vaneko ho frontend bta
app.use(express.json()) //baira bta aaune jsteri react/reactnative bta aauda

// app.get('/',(req,res)=>{
//     res.render('home.ejs',)
// }) yasaree garda nee hunxa naba controller bta pane garda hunxa jaslo lage 

app.get('/',randerHomePage)

app.get('/about',(req,res)=>{
    res.send("this is about page")
})




app.use("/",authRoute)
//router bta gareko ho ya bta chai /authroute ma janxa ane tyo gayer harxa



app.use(express.static('public/css/'))

const PORT =3000
app.listen(PORT,()=>{
    console.log(`project start vayo port ${PORT} ma hai`)
})

// app.listen(3000,()=>{
//     console.log("prject run vayo yo port ma yo garda nee hunxa hai")
// })


//sudo /Applications/XAMPP/xamppfiles/xampp start





// rest api
/*
/getBlogs -get
/singleblog/:id - get
/deleteblog/:id - delete
/updateblog/:id - update
/addblog -post

*/

//restful api
/*
/blogs -get,post
/blogs/:id -get,patch/put,delete
*/