const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../models/User'); // Import your User model

// This function is called after the user logs in.
// It saves the user ID to the session.
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is the _id from MongoDB
});

// This function is called on every request.
// It uses the ID from the session to find the user in the database.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// --- Google Strategy ---
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find existing user
        let user = await User.findOne({ oauthId: profile.id, provider: 'google' });

        if (user) {
          return done(null, user); // User exists, return them
        }

        // Create new user
        const newUser = new User({
          oauthId: profile.id,
          provider: 'google',
          displayName: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
          profileImageUrl: profile.photos ? profile.photos[0].value : null,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// --- Facebook Strategy ---
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
      proxy: true,
      profileFields: ['id', 'displayName', 'emails', 'picture.type(large)'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ oauthId: profile.id, provider: 'facebook' });

        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          oauthId: profile.id,
          provider: 'facebook',
          displayName: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
          profileImageUrl: profile.photos ? profile.photos[0].value : null,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// --- GitHub Strategy ---
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
      proxy: true,
      scope: ['user:email'], // Request email permission
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ oauthId: profile.id, provider: 'github' });

        if (user) {
          return done(null, user);
        }

        // GitHub emails can be private, profile.emails might be null
        const email = profile.emails ? profile.emails[0].value : null;

        const newUser = new User({
          oauthId: profile.id,
          provider: 'github',
          displayName: profile.displayName || profile.username,
          email: email,
          profileImageUrl: profile.photos ? profile.photos[0].value : null,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);