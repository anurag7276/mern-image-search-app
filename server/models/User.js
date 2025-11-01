const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // This will be the unique ID from Google, Facebook, or GitHub
  oauthId: {
    type: String,
    required: true,
  },
  // This will store 'google', 'facebook', or 'github'
  provider: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false, // Not all providers guarantee an email
  },
  profileImageUrl: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// We create a compound index to ensure a user is unique per provider
UserSchema.index({ oauthId: 1, provider: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);