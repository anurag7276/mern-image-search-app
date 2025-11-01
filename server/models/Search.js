const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchSchema = new Schema({
  term: {
    type: String,
    required: true,
  },
  // Link this search to the user who made it
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // This refers to our 'User' model
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Search', SearchSchema);