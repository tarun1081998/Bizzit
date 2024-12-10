const router = require("express").Router()
const authController = require("../controllers/auth.controller")

router.post("/verify-otp",authController.verifyOtp)

router.post("/send-otp",authController.generateAndSendOtp)

module.exports = router