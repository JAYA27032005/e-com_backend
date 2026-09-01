const  {UserModel} = require("../../models/user.model");
const { asyncHandler } = require("../../utils/asyncHandler");
const{ httpStatus} = require("../../utils/httpStatus");

const authValidator = asyncHandler(async(req,resizeBy,next)=>{
    const accesToken = req.cookies.accessToken;
    if(!accessToken){
        res.Status(httpStatus.UNAUTHORIZED).json(apiError(httpStatus.UNAUTHORIZED,"Token not found please login again"))
    }
    const decode = verifyAccessToken(accessToken);
    // const userData =await UserModel.find
})
module.exports = authValidator;
