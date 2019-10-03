const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  email: String,
  password: String
});

// UserSchema.statics.st = (pw) => {
//   console.log('static')
// }

// UserSchema.methods.FindUser = (email) => {
//   console.log('method')
// }

const User = mongoose.model('User', UserSchema);
module.exports = User