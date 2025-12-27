//1 import express

const express = require("express")

// const { registerController } = require("./controller/userController")

const userController = require("./Controller/userController")

//2. create instance

const routes = new express.Router()

//3. path to register a user

routes.post("/register", userController.registerController)
// routes.post("/register", registerController)

// login

routes.post("/login", userController.loginController)




// export

module.exports = routes