const router = require('express').Router();
const passport = require('passport');

// Get the client URL from environment variables
const CLIENT_URL = process.env.CLIENT_URL;

// --- Login Routes ---

// Google Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Facebook Login
router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile'] }));

// GitHub Login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// --- Callback Routes ---

// Google Callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL, // Redirect to React app on success
    failureRedirect: `${CLIENT_URL}/login/failed`, // Redirect on failure
  })
);

// Facebook Callback
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: CLIENT_URL,
    failureRedirect: `${CLIENT_URL}/login/failed`,
  })
);

// GitHub Callback
router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: `${CLIENT_URL}/login/failed`,
  })
);

// --- Check Login Status ---
// This route is used by the React app to see if a user is already logged in
router.get('/login/success', (req, res) => {
  if (req.user) {
    // req.user is set by Passport if the session is valid
    res.status(200).json({
      success: true,
      message: 'User authenticated',
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }
});

// --- Logout ---
router.get('/logout', (req, res, next) => {
  req.logout((err) => { // req.logout() is a Passport function
    if (err) {
      return next(err);
    }
    // You might also need to clear the session cookie
    req.session.destroy((err) => {
        if(err){
            return next(err);
        }
        res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name
        res.status(200).json({ success: true, message: 'Logged out' });
    });
  });
});

module.exports = router;