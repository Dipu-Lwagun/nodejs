const { handleRegister, randerRegisterpage, handleLogin, randerLoignpage } = require('../controller/authController')

const router =require('express').Router()

// router.get('/register',randerRegisterpage)
// router.post('/register',handleRegister)
router.route('/register').post(handleRegister).get(randerRegisterpage)

router.route('/login').post(handleLogin).get(randerLoignpage)

module.exports=router