const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
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