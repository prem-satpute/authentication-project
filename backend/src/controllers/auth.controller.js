import config from '../config/config.js';
import jwt from'jsonwebtoken';

export const GoogleAuth = async  (req,res)=>{
try{
    
    const token = jwt.sign({
        id:req.user._id,
        email:req.user.email
    },config.JWT_SECRET,{expiresIn:"15m"});

    res.redirect(`${config.CLIENT_URL}/auth-success?token=${token}`);
}catch(err){
    res.redirect(`${config.CLIENT_URL}/error?login=Google-login-error`);
}

}