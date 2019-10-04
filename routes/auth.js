const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/UserModel.js')

const router = express.Router()

router.get('/user', require('../middleware/jwtAuthMW'), function (req, res) {
  res.status(200).json(req.user);
})

router.post('/login', async function (req, res) {
  const {
    email,
    password
  } = req.body;

  const user = await User.findOne({
    email: email
  })

  // User not found in db
  if (user === null) {
    res.status(401).json({
      message: "Invalid credential"
    })
    return;
  }
  // Check password hash
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({
      message: "Invalid credential"
    })
    return;
  }
  // Create jwt
  // TODO don't send the whole user object
  const token = await jwt.sign({
    data: user
  }, process.env.SECRET)

  res.status(200).json({
    user: user,
    token: token
  })
})

router.post('/register', async function (req, res) {

  const saltRounds = 10;

  const {
    email,
    password,
    username
  } = req.body;


  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const user = new User({
    email: email,
    password: hash,
    username: username
  })

  const newUser = await user.save({});

  // Create jwt
  const token = await jwt.sign({
    data: newUser
  }, process.env.SECRET)

  res.status(200).json({
    user: newUser,
    token: token
  })
})


module.exports = router