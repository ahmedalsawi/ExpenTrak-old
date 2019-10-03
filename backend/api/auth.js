const express = require('express')
const router = express.Router()

const User = require('../models/UserModel.js')

router.post('/login', function (req, res) {
  // User.find({}, (err, users) => {
  //   console.log(users)
  // })

  // Validate
  // Look for User, fail if not found
  console.log(req.body.email)
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) {
      console.log(err)
    }
    console.log(user)
  })
  res.send('Login')

})

router.post('/register', function (req, res) {

  // Validate body TODO
  // Look if user already exist
  // Create User and save

  const user = new User({
    email: req.body.email,
    password: req.body.password
  })
  user.save().then(
    () => {
      console.log("save done")
    }
  );
  res.send('Regiser')
})

module.exports = router