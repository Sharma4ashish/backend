import Router from "express"
import {userRegister} from "../controllers/user.controllers.js"
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






// router.route("/login").get(userLogin) 

export default router;