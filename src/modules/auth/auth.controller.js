const asyncHandler = require("express-async-handler");
const { apiResponse } = require("../../utils/apiResponse");
const { AuthService } = require("./auth.service");
const {
  refreshCookieOptions,
  accessCookieOptions,
  signAccess_token,
  signRefresh_token,
} = require("../../utils/cookieOptions");
const RefreshModel = require("../../models/refresh.model");
const httpStatus = require("../../utils/httpStatus");
const UserModel = require("../../models/user.model");


const genrateToken = (res,user) => {
  const accessToken = signAccess_token(user);
  const refreshToken = signRefresh_token(user);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);
  res.cookie("accessToken",access.Token, accessCookieOptions);
  return{
    accessToken:accessToken ,
    refreshToken:refreshToken
  }
};

//register
const registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userData = await AuthService.registerService({ name, email, password ,role});

 const tokens =  generateToken(res,userData.user);

const refreshTokendata = await AuthService.createRefreshService({
    userId: userData.user._id,
    token: tokens.refreshToken
});
});

//login user
const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await AuthService.loginService({ email, password });

  const tokens =  generateToken(res,userData.user);

  res.status(200).json(apiResponse(200, result, "User logged in successfully"));
});

//refresh token
const refreshController = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw apiError(NOT_FOUND, "refresh Token not found")
    };

    const decode = verifyRefreshToken(refreshToken)
 console.log("line 98 refresh controller", decode);

  const user= await AuthService.getUserDataById({_id:decode.sub});
    const newAccessToken = signAccessToken(user);
          
    res.cookie("accessToken", newAccessToken, accessCookieOptions)
    res.status(OK).json(apiResponse(OK, null, "Access token created and set to cookies successfully"))
})

// logout user
const logoutController = asyncHandler(async (req, res) => {
  const accessCookie = res.clearCookie("accessToken", accessCookieOptions);
  const refreshCookie = res.clearCookie("refreshToken", refreshCookieOptions);
  await RefreshModel.deleteMany({ user: req.user._id });

});
  
//reset password
const changePasswordController = async (req, res) => {
  const {oldPassword , newPassword} = req.body;
   await AuthService.changePasswordService({userId: req.user._id , newPassword : newPassword , oldPassword:oldPassword});
   res.status(httpStatus.OK).json(httpStatus.OK,NULL,"Password Changed successfully")

}; 
module.exports={
  registerController,
  loginController,
  logoutController,
  changePasswordController,
  refreshController

 
}
