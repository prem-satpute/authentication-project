import app from "./src/app.js";
import ConnectDB from "./src/ConnectDB/Connection.js";
import router from "./src/routers/user.route.js";
import authRoute from './src/routers/auth.router.js';
import googleRouter from './src/routers/auth1.route.js'
import './src/config/passport.js'
ConnectDB()
    .then((res)=>{console.log("Connect to DB")})
    .catch((err)=>{console.log("Connection Failed to DB",err)});

/* POST : http://localhost:8080/user/register */
// app.use("/auth",authRoute)
app.use("/auth",googleRouter);
app.use("/user",router)


app.listen(8080,()=>{
    console.log("App is Started !");
})