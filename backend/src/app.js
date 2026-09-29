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
    origin:"http://localhost:5173",
    credentials:true
}))


export default  app;
