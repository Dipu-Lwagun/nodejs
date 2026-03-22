const express = require('express')
const { users } = require('./model/index')
const app = express()
const bcrypt =require('bcrypt')
const { where } = require('sequelize')

require ("./model/index")
// yo chai frontend banauna ko lage rw tyo frontend  lai rander garnu ko lage yako lage ejs download garne
app.set ('view engine','ejs')
app.use(express.urlencoded({extended : true})) //yale chai ke data aaudai xa taslai buj hai vaneko ho frontend bta
app.use(express.json()) //baira bta aaune jsteri react/reactnative bta aauda

app.get('/',(req,res)=>{
    res.render('home.ejs',)
})

app.get('/about',(req,res)=>{
    res.send("this is about page")
})

app.get("/register",(req,res)=>{
    res.render('auth/register.ejs')
})
app.post("/register",async(req,res)=>{
    console.log(req.body)
    // const username =req.body.username
    // const password =req.body.password
    // const email = req.body.email
    const {username,password,email} =req.body
    if(!username || !password || !email){
        return res.send("plese provide username email password")
    }
    const data =await users.findAll({
        where:{
            email:email
        }
    }) 
    if(data.length>0){
        return res.send("allready login")
    }

    await users.create({
        email,
        password: bcrypt.hashSync(password,10),
        username
    })
    res.send("register sucesss fully")
})

// app.get ("/users",async (req,res)=>{
//     const data =await users.findAll()
//     res.json({
//         data
//     })
// })


app.get("/login",(req,res)=>{
    res.render("auth/login.ejs")
})
// make api for login
app.post("/login",async(req,res)=>{
     // const password =req.body.password
    // const email = req.body.email
    const {email,password} =req.body
    if(!email || !password){
        return res.send("please provide email and password")
    }
    // email check
    const [data] = await users.findAll({
        where:{
            email: email
        }
    })
    if(data){
        // check password 
        const isMatched= bcrypt.compareSync(password,data.password)
        if(isMatched){
            res.send("logged in sucess vayo la")
        }else{
            res.send("invalid passwored")
        }

    }else{
        res.send('no user with this email')
    }
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