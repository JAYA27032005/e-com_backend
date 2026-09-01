
const apiResponse = (statusCode, data = null, message = 'Success') => ({
success: statusCode < 400,
statusCode,
message,
data,
});
module.exports={
    apiResponse
}
