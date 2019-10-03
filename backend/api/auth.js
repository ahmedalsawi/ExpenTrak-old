const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/UserModel.js')

const router = express.Router()

router.get('/user', function (req, res) {

  const authHeader = req.header('Authorization')
  if (typeof authHeader === "undefined") {
    res.status(401).json({
      message: "Missing Authorization header"
    })
    return;
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      res.status(401).json({
        message: "Invalid credential"
      })
      return;
    }
    const user = decoded.data;
    res.status(200).json(
      user
    )
  });
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