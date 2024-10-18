import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    // origin: ProcessingInstruction.env.CORS_ORIGIN,
    Credential :true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true , limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// Import Routes

import userRouter  from "./routes/user.routes.js";

// Routes 
app.use("/user",userRouter);

app.get("/",(req,res)=>{
    res.send({message:"Hii"})
})


export {app} 