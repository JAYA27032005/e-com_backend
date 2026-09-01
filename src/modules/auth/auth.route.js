const express = require('express');
// const router = express.Router();
const { register, login, logout, forgotPassword, resetPassword } = require('./auth.controller');
const { validateRegister, validateLogin, validateForgotPassword, validateResetPassword } = require('./auth.validator');

const authController = require('./auth.controller');

//Register Router
const authRouter = express.Router();
authRouter.post('/register',authController.registerController);
authRouter.post('/login', authController.loginController);
authRouter.post('/logout', authController.logoutController);
// authRouter.post('/forgot-password',  authController.forgotPassword);
authRouter.post('/reset-password/:token', authController.changePasswordController);
authRouter.get('/me',authController.meController)



module.exports=authRouter;