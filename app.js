const express = require('express')
const app = express()

require ("./model/index")
// yo chai frontend banauna ko lage rw tyo frontend  lai rander garnu ko lage yako lage ejs download garne
app.set ('view engin','ejs')


app.get('/',(req,res)=>{
    res.render('home.ejs',)
})

app.get('/about',(req,res)=>{
    res.send("this is about page")
})

app.get("/register",(req,res)=>{
    res.render('auth/register.ejs')
})
app.get("/login",(req,res)=>{
    res.render("auth/login.ejs")
})


app.use(express.static('public/css/'))

const PORT =3000
app.listen(PORT,()=>{
    console.log(`project start vayo port ${PORT} ma hai`)
})

// app.listen(3000,()=>{
//     console.log("prject run vayo yo port ma yo garda nee hunxa hai")
// })


//sudo /Applications/XAMPP/xamppfiles/xampp start