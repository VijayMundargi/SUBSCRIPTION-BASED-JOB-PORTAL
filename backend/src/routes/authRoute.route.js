const express = require("express")
const isAuthenticated = require("../middleware/auth.js")
const {Login,Register,Logout,profile} = require("../controller/authController.controller.js")

const router = express.Router()

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.route("/me").get(isAuthenticated,profile)


module.exports = router