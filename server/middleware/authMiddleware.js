// This middleware checks if the user is authenticated
module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.isAuthenticated() is added by Passport
    next();
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
  }
};