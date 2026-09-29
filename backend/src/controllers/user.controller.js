import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { verifyMail } from "../../emailVerify/verifyMail.js";
import { token } from "morgan";
import jwt from 'jsonwebtoken'
import config from "../config/config.js";
import { json } from "express";
import Session from "../models/session.model.js";
import { sendOtpMail } from "../../emailVerify/sendOtpMail.js";


export const registerUser =async (req,res)=>{
    try{

        const {username , email , password} = req.body;

        if (!username || !email || !password ){
            return res.status(400).json({
                success:false,
                message:"all Fields Are required !",
            })
        };

        const isAlreadyExists = await User.findOne({email});

        if (isAlreadyExists){
            return res.status(409).json({
                success:false,
                message:"user is already exists !",
            })
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password:hashedPassword,

        });
        
        const token = jwt.sign({
            id:newUser._id,
        },config.JWT_SECRET,{
            expiresIn:"15m"
        })

        verifyMail(token, email);
        newUser.token= token;


        await newUser.save();
        

        return res.status(201).json({
            success:true,
            message:"user register successfully !",
            user:newUser
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        });
    }

}

export const verfication = async (req,res)=>{
    try{

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                success:false,
                message:"Authorization Token is missing or Invalid "
            })
          }

          const token =authHeader.split(" ")[1];
          
          let  decoded;
          try{
            decoded  = jwt.verify(token, config.JWT_SECRET);
            console.log(decoded)


          }catch(err){
            if (err.name === "tokenExpiredError"){
                return res.status(400).json({
                    success:false,
                    message:"The registraton Token has Expired  "
                })
            }
            return res.status(400).json({
                success:false,
                mesage:"Token Verification Failed !",
            })

          }
          const user = await User.findById(decoded.id);
          console.log(user)

          if (!user){
            return res.status(404).json({
                success:false,
                message:"User not found "
            })
          };
          user.token= null;
          user.verified= true;

          await user.save();
          console.log("end user",user)

            res.status(200).json({
            success:true,
            message:"Email  verified Successfully !"
          })

          
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })

    }

}

export const loginUser =async (req,res)=>{

    try{
        const {email , password} = req.body;

        if (!email || !password){
            return res.status(400).json({
                success:false,
                message:"All Filed Are Required !",
            });
        };

        const user = await User.findOne({
            email,
        });

        if (!user){
            return res.status(401).json({
                success:false,
                message:"Unauthorized Access !"
            });
        };

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(402).json({
                success:false,
                message:"Incorrect Password !",
            })
        };

        // check if user is verified !
        if(user.verified!=true){
            return res.status(403).json({
                success:false,
                message:"Verify Your Account than Login !"
            });
        };

        // check for exsisting session :
        const existingSession = await Session.findOne({userId:user._id})

        if(existingSession){
            await Session.deleteOne({userId:user._id});
        }

        // create a new sesion:
        await Session.create({
            userId:user._id,
        });

        // Generate RefreshTokens :
        const refreshToken = jwt.sign({
            id:user._id
        },config.JWT_SECRET,{
            expiresIn:"7d"
        })

        // Generate AccessToken:

        const accessToken = jwt.sign({
            id:user._id
        },config.JWT_SECRET,{
            expiresIn:"15m"
        });

        user.isLoggedIn= true;
        await user.save();
        return res.status(200).json({
            success:true,
            message:`Welcome back ${user.username} !`,
            accessToken,
            refreshToken,
            data:{
                user
            }
        })

        
       


    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }

}

export const logoutUser =async (req,res)=>{
    try{

        const userId = req.userId;

        if(!userId){
            return res.status(404).json({
                success:false,
                message:"User Id Not presert "
            })
        }

        await Session.deleteMany({userId});
        await User.findByIdAndUpdate(userId,{isLoggedIn:false});


        return res.status(200).json({
            success:true,
            message:"Logged Out Successfully "
        })




    }catch(err){
        return res.status(500).json({
            success:false,
            mesage:err.message
        })
    }
}

export const forgotPasword = async (req,res)=>{
    try{
        const {email} =  req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found !"
            });

        };

        const otp = Math.floor(100000+Math.random()*900000).toString();

        const expiry  =  new Date(Date.now()+10*60*1000);

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save();
        await sendOtpMail(email, otp);

        return res.status(200).json({
            success:true,
            message:"OTP Send Successfully !",
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const    verfiyOTP = async(req,res)=>{
    const {otp} = req.body;
    const email = req.params.email;

    if (!otp){
        return res.status(400).json({
            success:false,
            messge:"OTP is required !"
        })
    };

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found "
            })
        };

        if(!user.otp || !user.otpExpiry){
            return res.status(400).json({
                success:false,
                message:"OTP not generated or already verified "
            })
        };

        if(user.otpExpiry < new Date()){
            return res.status(400).json({
                success:false,
                message:"OTP has expired . please request a new one "
            })
        };

        if(otp != user.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        };

        user.otp= null;
        user.otpExpiry= null;
        await user.save();

        return res.status(200).json({
            success:true,
            message:"OTP verified Successfully"
        })

    }catch(err){

        return res.status(500).json({
            success:false,
            message:err.message
        })

    }


}

export const changePassword = async (req,res)=>{
    const {newPassword, confirmPassword} = req.body;
    const email = req.params.email;

    if(!newPassword || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"All Field Are requried !"
        });
    }

    if( newPassword !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password do not match "
        });
    };

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found "
            });

        };

        const hashedPassword = await bcrypt.hash(newPassword , 10);
        user.password = hashedPassword;

        user.save();

        return res.status(200).json({
            success:true,
            message:"Password chnaged Successfully !"
        })

    }catch(err){
        return  res.status(500).json({
            success:false,
            message:err.message
        })
    }
}