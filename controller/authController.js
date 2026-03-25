
const { users } =require("../model")
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')

exports.randerHomePage = (req,res)=>{
    res.render("home.ejs")
}

exports.randerRegisterpage =(req,res)=>{
res.render("auth/register.ejs")
}

exports.randerLoignpage = (req,res)=>{
    res.render("auth/login")
}

exports.handleRegister =async(req,res)=>{
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
}

// app.get ("/users",async (req,res)=>{
//     const data =await users.findAll()
//     res.json({
//         data
//     })
// })


exports.handleLogin= async(req,res)=>{
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
            const token =jwt.sign({id: data.id},'anthu',{
                expiresIn:'30d'
            } )
            res.cookie("jwtToken",token)
            
            res.send("logged in sucess vayo la")
        }else{
            res.send("invalid passwored")
        }

    }else{
        res.send('no user with this email')
    }
}

