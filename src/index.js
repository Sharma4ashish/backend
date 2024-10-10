import dotenv from "dotenv";
import connectDb  from "./db/index.js";
import { app } from "./app.js";
const PORT = process.env.PORT || 8000 ;


dotenv.config({
    path : "./env"
})



connectDb().then(()=>{
    app.listen(PORT, ()=>{

        console.log(`DB Connected Succesfully at Port No : ${PORT}`);    
    })
})
.catch((error)=>{console.log("Failed to Connect DB " , error);
})





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