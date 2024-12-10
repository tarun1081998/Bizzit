const router = require("express").Router()
const userController = require("../controllers/user.controller")

router.post("/register",userController.registerUser)

//router.get('/profile/:id', userController.getProfile);

module.exports = router

