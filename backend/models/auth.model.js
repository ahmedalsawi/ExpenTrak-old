const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  }
});
UserSchema.plugin(timestamps);

const User = mongoose.model('User', UserSchema);

module.exports = User