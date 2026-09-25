const express = require("express");
const authrouter = express.Router();
const {registerUserController, loginUserController,logoutUserController, getMeController} = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middlewares")

/**
 * @route POST
 * @description Register a new user
 * @access Public
 */

authrouter.post("/register", registerUserController );

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */

authrouter.post("/login", loginUserController );

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */

authrouter.get("/logout", logoutUserController);


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */

authrouter.get("/get-me",authMiddleware.authUser, getMeController);



module.exports = authrouter