const apiError = (statusCode, message = 'Something went wrong', errors = []) => {
const err = new Error(message);
err.statusCode = statusCode;
err.errors = errors;
err.success = false;
err.isApiError = true; // checked instead of `instanceof`
Error.captureStackTrace(err, apiError); // hide this factory from the stack trace
return err;
};

module.exports = { apiError };