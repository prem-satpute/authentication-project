import yup from 'yup';
import { json } from 'express';


export const userSchema = yup.object({
    username:yup
    .string()
    .trim()
    .min(3,"user name must be atleast 3 charecter")
    .required(),
    email:yup
    .string()
    .email("The email is not valid one ")
    .required(),
    password:yup
    .string()
    .min(4,"password must be atleast 4 charecter ")
    .required()


});


export const validateUser = (schema) => async (req,res,next)=>{
    try{
        await schema.validate(req.body);
        next();

    }catch(err){
        return res.status(400).json({
            errors:err.message
        })

    }
}