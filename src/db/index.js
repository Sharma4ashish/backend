import mongoose from "mongoose";

import DB_NAME from "../constants.js";

const connectDb = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.mongoDb_Url}/${DB_NAME}`)
        console.log(" \n MongoDb Connected | DB HOST :  ", connectionInstance.connection.host);
        

        
    } catch (error) {
        console.log("Mongodb Connection Failed : ",error);
        process.exit(1)
        
        
    }
}

export default connectDb