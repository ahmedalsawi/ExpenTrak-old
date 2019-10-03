const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp');

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  username: String
});
UserSchema.plugin(timestamps);

const User = mongoose.model('User', UserSchema);

module.exports = User