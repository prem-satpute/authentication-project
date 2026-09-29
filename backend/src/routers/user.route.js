import { Router } from "express";
import * as Contoller from '../controllers/user.controller.js'
import {isAuthenticated} from '../utils/middleware/isAuthenticated.js'
 const router = Router();
 import { validateUser, userSchema } from "../validators/user.validate.js";

/* POST : /user/regitser*/
router.post("/register",validateUser(userSchema),Contoller.registerUser);

/* POST : /user/verify*/
router.post("/verify",Contoller.verfication);

/* POST : /user/login*/
router.post("/login",Contoller.loginUser);


/* POST : /user/logout*/
router.post("/logout",isAuthenticated,Contoller.logoutUser);


/* POST : /user/forgot-password*/
router.post("/forgot-password",Contoller.forgotPasword);

/* POST : /user/verified-otp*/
router.post("/verify-otp/:email",Contoller.verfiyOTP);

/* POST : /user/change-password*/
router.post("/change-password/:email",Contoller.changePassword);

export default router

