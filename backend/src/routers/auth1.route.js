import express from 'express';
import passport from 'passport';
import * as authController from '../controllers/auth.controller.js';
import { isAuthenticated } from '../utils/middleware/isAuthenticated.js';

const router = express.Router();


router.get("/google",passport.authenticate("google",{scope:["profile","email"]}));
router.get("/google/callback",passport.authenticate("google",{session:false}),authController.GoogleAuth);
router.get("/me",isAuthenticated,(req,res)=>{
    res.json({
        success:true,
        user:req.user
    })

});


export default router;