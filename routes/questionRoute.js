const { renderAskQuestionPage, askquestion } = require("../controller/questionController")

const router = require ("express").Router()

const {multer,storage}=require('../middleware/multerConfig')

const upload =multer({storage:storage})

router.route("/askquestion").get(renderAskQuestionPage).post(upload.single('image'),askquestion)


module.exports =router