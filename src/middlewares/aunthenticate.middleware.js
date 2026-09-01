const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;

  const token = header?.startsWith('Bearer ')
    ? header.slice(7).trim()
    : null;

  if (!token) {
    throw apiError(401, 'Please login to continue');
  }

  const payload = verifyAccessToken(token);
  const user = await User.findById(payload.sub)
    .select('_id name email role isActive');

  if (!user) { 
    throw apiError(401, 'User no longer exists');  
  2                      }

  if (!user.isActive) {
    throw apiError(403, 'Your account has been blocked');
  }

  req.user = user;

  next();
});

module.exports = { authenticate };