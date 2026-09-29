import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { isAuthenticated } from "../utils/middleware/isAuthenticated.js";

const router = express.Router();

// step 1: Redirect To Google Login:
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
        },
        config.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );
      res.redirect(`${config.CLIENT_URL}/auth-success?token=${token}`)
    } catch (error) {
        console.error("Google Login Error :",error);
        res.redirect(`${config.CLIENT_URL}/login?error=google_failed`)
    }
  },
);


router.get("/me",isAuthenticated, (req,res)=>{
    res.json({
        success:true,
        user:req.user
    })
})

export default router 