import express from "express"
import indexController from "../Controllers/index.js"
import Router from "./user.js"
const router=express.Router();
router.get('/',indexController.mainpage);
router.use('/user',Router)
export default router
