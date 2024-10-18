const asyncFuncHandler = (requestHandler) => {
    return async (req,res,next) =>{
        Promise
        .resolve(requestHandler(req,res,next))
        .catch((error) => next(error));            
         
    }
}



// const asyncHandler = (fn) => {
    
//     async (req, res, next)=>{
//         try {
//             await fn(req,res,next);
            
//         } catch (error) {
//             res.status(error.code || 500 ).json({
//                 succses : false,
//                 message: error.message
//             })
            
//         }
//     }
// }


export {asyncFuncHandler}