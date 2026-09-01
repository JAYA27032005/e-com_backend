const authService = require("./auth.service");
const UserModel = require("../../models/user.model");
const { ROLE} = require("../../constants/roles");
const RefreshModel = require("../../models/refresh.model");
const {httpStatus} = require("../../utils/httpStatus");
const { asyncHandler } = require("../../utils/asyncHandler");


//register API service
const registerService = async (data) => {
    console.log(data,"body data");
    const { name, email, password } = data;
    const isExist = await UserModel.findOne({ email });

    if (isExist) {
        return apiError(409, "User already exists");
    };
     
    const hash  = hashPassword(password);
    const userData = { 
        name,
        email,
        password: hash,
        role : role
    };

    const user = await UserModel.create(userData);
  return { user} };


const createRefreshService = async ({ userId, token }) => {
    await RefreshModel.deleteMany({
        user: userId
    });

    const refreshData = await RefreshModel.create({
        user: userId,
        token: token,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )
    });

    return refreshData;
};


//login API service

const loginService = async (userData) => {

const { email, password } = userData;

const isUser = await UserModel.findOne({ email });

if (!isUser) {
    throw apiError(httpStatus.BAD_REQUEST, "Incorrect credentials");

};
const isPasswordCorrect = await verifyPassword(password, isUser.password);
if(!isPasswordCorrect){
    throw apiError(httpStatus.BAD_REQUEST, "Incorrect credentials");
}

return { user : isUser };
};




//refresh token API service
// const refreshTokenService = async (userData) => {
// };

//logout API service

const logoutService = async (userData) => {
    await RefreshModel.deleteMany({
        user:userId
    })
};

//forgot password API service

// const forgotPasswordService = async (userData) => {
// };

//change password API service

const changePasswordService = asyncHandler(async (userData) => {
    const {userId , newPassword} = userData;
    const  user = await UserModel.findById({_id:userId}).select("+password")
    if(!user){
        throw apiError(httpStatus.NOT_FOUND)
    }
    const decode = verifyPassword(oldPassword,user.password)
    if(!decode){
        throw apiError(httpStatus.NOT_FOUND,"Invalid User");
    }
    newhashPassword = hashPassword(newPasswrod)
    user.password =  newhashPassword;
    await user.save();
});

module.exports = {  
registerService,
loginService,
// refreshTokenService,    
logoutService,
// forgotPasswordService,
changePasswordService,
createRefreshService
};
