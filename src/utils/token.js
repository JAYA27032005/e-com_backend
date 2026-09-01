const jwt = require("jsonwebtoken");
require("dotenv").config();
const signAccess_token =(user)=>{
    return jwt.sign({ sub:String(user._id) , role : user.role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' });
}
const signRefresh_token =(user)=>{
    return jwt.sign({ sub:String(user._id) , role : user.role}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' });
}
const verifyAccess_token =(token)=>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

const verifyRefresh_token =(token)=>jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

const refreshCookieOptions = () => ({
httpOnly: true, 
secure: process.env.NODE_ENV === 'production',
sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
path: '/api/v1/auth', 
maxAge: 7 * 15* 60 * 1000,
});


module.exports = { signAccess_token, signRefresh_token, verifyAccess_token, verifyRefresh_token , refreshCookieOptions }
