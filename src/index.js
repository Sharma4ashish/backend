import dotenv from "dotenv";
import express from "express";
import connectDb  from "./db/index.js";


dotenv.config({
    path : "./env"
})

const app = express();
connectDb();





/*
( async ()=>{
    try {
        await mongoose.connect(`${process.env.mongoDb_Url}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("error", error);
            throw error

        })
        
    } catch (error) {
        console.log("DB Connectino Error : ",error);
        throw error
        
    }
})()

*/