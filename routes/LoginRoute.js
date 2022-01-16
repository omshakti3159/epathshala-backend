const router = require("express").Router()


const { Login ,SignupUser }=require('../controllers/LoginController')




router.post("/login",Login)

router.post("/register",SignupUser)


module.exports=router