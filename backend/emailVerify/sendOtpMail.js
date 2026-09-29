import nodemailer from 'nodemailer'
import config from '../src/config/config.js' 

export const sendOtpMail = async (email, otp)=>{


    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:config.EMIAL_USER,
            pass:config.EAMIL_PASS

        }

        
    });
    const mailOptions  ={
        from:config.EMIAL_USER,
        to:email,
        subject:"Password Reset Otp ",
        html:`<p>Your Otp For Password reser is: <b>${otp}</b>. it is valid for 10 min </p>`

    };

    await transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            throw new Error(err);
        }else{
            console.log("Emial send successfully");
            console.log(info)
        }
    })

}