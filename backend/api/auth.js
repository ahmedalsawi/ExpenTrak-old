const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/UserModel.js')

const router = express.Router()

router.post('/login', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;
    if (user === null) {
      res.json({
        sucess: false,
        message: "Invalid credentials"
      })
      res.end()
    } else {
      bcrypt.compare(password, user.password, function (err, match) {
        if (err) throw err;
        if (match) {
          // create jwt and send it back
          jwt.sign({
              data: user
            }, process.env.SECRET,
            function (err, token) {
              res.json({
                sucess: true,
                token: token
              })
            });
        } else {
          res.json({
            sucess: false,
            message: "Invalid credentials"
          })
        }
      });
    }

  })
})

router.post('/register', function (req, res) {

  // Validate body TODO
  // Look if user already exist
  // Create User and save

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) throw err;

      const user = new User({
        email: req.body.email,
        password: hash
      })

      user.save({}, (err, user) => {
        if (err) throw err;
        res.sendStatus(201);
      });
    });
  });
})


module.exports = router