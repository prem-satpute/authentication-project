import nodemailer from 'nodemailer'
import config from '../src/config/config.js'
import { text } from 'express';
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';


const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName)

export const verifyMail =async (token, email)=>{

    const emailTemplateSource = fs.readFileSync(path.join(__dirname,"template.hbs"),"utf-8");

    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({token:encodeURIComponent(token)})


    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:config.EMIAL_USER,
            pass:config.EAMIL_PASS
        }
    });

    const mailConfigurations = {
        from:config.EMIAL_USER,
        to:email,
        subject:"Email Verification",
        html: htmlToSend, 

    }

    transporter.sendMail(mailConfigurations, (err, info)=>{
        if(err){
            throw new Error(err);
        }else{
            console.log("Emial send successfully");
            console.log(info)

        }

    })

};
