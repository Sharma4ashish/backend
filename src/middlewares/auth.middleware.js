import { verify } from "jsonwebtoken"
import { asyncFuncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/apiError"
import { User } from "../models/user.model"

export const verifyJwtToken = asyncFuncHandler(async (req,res,next)=>{
    try {
        const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
    
        if(!token){
            throw new ApiError(401,"Unauthorized Request")
        }
    
        const userPayload = verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(userPayload?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
            
        }
    
        req.user = user;
    
    
        next();
    } catch (error) {
        throw new ApiError(401 , error?.message || "invalid Aceess Token")
    }
})