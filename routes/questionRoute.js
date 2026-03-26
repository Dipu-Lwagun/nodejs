const { renderAskQuestionPage, askquestion } = require("../controller/questionController")

const route = require ("express").Router()

route.route("/askquestion").get(renderAskQuestionPage).post(askquestion)


module.exports =route