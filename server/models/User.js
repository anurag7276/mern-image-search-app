const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
  oauthId: {
    type: String,
    required: true,
  },
 
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
    required: false, 
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


UserSchema.index({ oauthId: 1, provider: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);