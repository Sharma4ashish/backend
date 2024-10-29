import Router from "express"
import {userRegister,userLogin,logOutUser} from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router() 

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxcount:1
        },
        {
            name:"coverImage",
            maxcount:1
        }
    ]),
    
    userRegister)


router.route("/login").post(userLogin)

router.route("/logout").post(logOutUser)



router.route("/login").get((_,res)=>{
    res.send("login page")
}) 

export default router;