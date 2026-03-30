const { Model } = require("sequelize")
const { questions, users } = require("../model")
exports.renderAskQuestionPage =(req,res)=>{
    res.render('questions/askQuestion')
}

exports.askquestion =async (req, res)=>{

    const {title,description} = req.body
    console.log(req.body)
    console.log(req.file)

    const userId =req.userId
    const fileName =req.file.filename
    if(!title || !description) {
        return res.send("plese provide title and description")
    }
    await questions.create({
        title,
        description,
        image:fileName,
        userId
        
    })
    res.redirect("/")
}


exports.getAllQuestion=async(req,res)=>{
    const data =await questions.findall({
        include:[
            {
                Model: users
            }
        ]
    })
}



//multer npm package for image handel