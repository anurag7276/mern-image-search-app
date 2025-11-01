const router = require('express').Router();
const passport = require('passport');


const CLIENT_URL = process.env.CLIENT_URL;

// --- Login Routes ---

// Google Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Facebook Login
router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile'] }));

// GitHub Login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));


router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL, 
    failureRedirect: `${CLIENT_URL}/login/failed`, 
  })
);


router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: CLIENT_URL,
    failureRedirect: `${CLIENT_URL}/login/failed`,
  })
);


router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: `${CLIENT_URL}/login/failed`,
  })
);


router.get('/login/success', (req, res) => {
  if (req.user) {
   
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


router.get('/logout', (req, res, next) => {
  req.logout((err) => { 
    if (err) {
      return next(err);
    }
    
    req.session.destroy((err) => {
        if(err){
            return next(err);
        }
        res.clearCookie('connect.sid'); 
        res.status(200).json({ success: true, message: 'Logged out' });
    });
  });
});

module.exports = router;