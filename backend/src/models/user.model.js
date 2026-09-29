import mongoose from "mongoose";
import {Schema} from 'mongoose';

const userSchema = new Schema({
    username:{
        type:String,
        
    },
    email:{
        type:String,
        requried:[true,"Email must be requried"],
        unique:[true ,"Emial must be unique "],
    },
    password:{
        type:String,
       
    },
    googleId:{
        type:String,
       
    },
    avatar:{
        type:String,
       
    },
    verified:{
        type:Boolean,
        default:false,
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    },
    token:{
        type:String,
        default : null
    },
    otp:{
        type:String,
        default :null
    },
    otpExpiry:{
        type:Date,
        default:null
    }


},{
    timestamps:true
});

const User = mongoose.model("User",userSchema);

export default User;
