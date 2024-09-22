import express from "express"
import userController from "../Controllers/user.js"
import Auth from "../Helper/Auth.js"

const router=express.Router();
router.post('/',userController.createUser)
router.post('/login',userController.login)
router.get('/',Auth.authenticate,Auth.adminGaurd,userController.getAllUsers)
router.get('/:id',Auth.authenticate,userController.getUserById)
//router should not export has object { router } it is causing the errors
export default router