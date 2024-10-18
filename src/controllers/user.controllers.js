import {asyncFuncHandler} from "../utils/asyncHandler.js"


const userRegister = asyncFuncHandler( async (req,res) =>{

    const {username, fullname, email, password, } = req.body
    console.log(username);
    
    return res.status(200).json({message:"ok"})


    
})

export {userRegister}