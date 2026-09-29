import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport';

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(passport.initialize());
app.use(morgan("dev")) // logger info about api
app.use(cors({
    origin:"https://authentication-project-1-uijx.onrender.com",
    credentials:true
}))


export default  app;
