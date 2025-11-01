const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchSchema = new Schema({
  term: {
    type: String,
    required: true,
  },
  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Search', SearchSchema);