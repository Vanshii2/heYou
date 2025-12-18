import express from 'express'
import {signup, login , logout, updateProfile} from "../controllers/auth.controller.js" 
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup)
router.post("/login",login)
router.post("/logout",logout)
//if user want to update their profile they should be authenticated
router.put("/update-profile",protectRoute, updateProfile)
router.get("/check",protectRoute, (req,res)=>{
    res.status(200).json(req.user)
})



export default router;

//middleware--> is a function it would run before sending back a response
