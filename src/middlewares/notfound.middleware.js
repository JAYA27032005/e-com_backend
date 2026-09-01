const apiError = require("../utils/apiError");
const notfound = (req,res,next)=>{
    next(apiError(404,`route not found :${req.method} ${req.originalUrl}`))
}
module.Exports={notfound}