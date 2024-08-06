import mongoose from "mongoose";
import {DB_NAME} from "./constants"

( async ()=>{
    try {
        mongoose.connect(`${process.env.mongoDb_Url}/${DB_NAME}`)
        
    } catch (error) {
        console.log("DB Connectino Error : ",error);
        
    }
})()