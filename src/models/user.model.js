import {Schema,model} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username : {
        type: String,
        requiered:true,
        unique:true,
        lowercase: true,
        trim:true,
        index:true,
    },
    email : {
        type: String,
        requiered:true,
        unique:true,
        lowercase: true,        
    },
    fullname : {
        type: String,
        requiered:true,
        unique:true,
        trim:true,
    },
    avatar : {
        type: String,
        requiered:true,
    },
    coverImage : {
        type: String,       
    },
    watchHistory: [{
        type : Schema.Types.ObjectId,
        ref : "Video"
    }],
    password: {
        type : String,
        requiered : true
    },
    accessToken: {
        type : String,
    },
    refreshToken: {
        type : String,
    },
},{timestamps:true})


userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(payload){
    
    await jwt.sign({
        _id : this._id,
        email:this.email,
        fullname:this.fullname,
        username :this.username,

    },process.env.ACCESS_TOKEN_SECRET,{

        expiresIn:ACCESS_TOKEN_EXPIRY
    })
} 

userSchema.methods.generateAccessToken = async function(payload){
    
    await jwt.sign({
        _id : this._id,
        
    },process.env.ACCESS_REFRESH_SECRET,{
        
        expiresIn:ACCESS_REFRESH_EXPIRY
    })
}



const User = model("User",userSchema)

export {User}