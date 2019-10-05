const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/auth.model.js");

const {
  registerValidation,
  loginValidation
} = require("../../validation/auth.validation.js");

const router = express.Router();

const minifyUser = user => {
  return {
    _id: user._id,
    email: user.email,
    username: user.username
  };
};

router.get("/user", require("../../middleware/jwtAuthMW"), function (req, res) {
  res.status(200).json(req.user);
});

router.post("/login", async function (req, res) {
  const validatedForm = loginValidation(req.body);
  if (validatedForm.error) {
    return res.status(400).json({
      message: validatedForm.error.details[0].message
    });
  }

  // Check if user  exist
  const user = await User.findOne({
    email: validatedForm.value.email
  });
  if (!user) {
    return res.status(400).json({
      message: "Invalid password or email"
    });
  }

  const validPassword = await bcrypt.compare(
    validatedForm.value.password,
    user.password
  );
  if (!validPassword) {
    return res.status(400).json({
      message: "Invalid password or email"
    });
  }

  const token = await jwt.sign({
      data: minifyUser(user)
    },
    process.env.SECRET
  );
  res.status(200).json({
    user: minifyUser(user),
    token: token
  });
});

router.post("/register", async function (req, res) {
  const validatedForm = registerValidation(req.body);
  if (validatedForm.error) {
    return res.status(400).json({
      message: validatedForm.error.details[0].message
    });
  }

  // Check if user already exist
  const emailExist = await User.findOne({
    email: validatedForm.value.email
  });
  if (emailExist) {
    return res.status(400).json({
      message: "Email already exists"
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(validatedForm.value.password, salt);

  const user = new User({
    email: validatedForm.value.email,
    password: hash,
    username: validatedForm.value.username
  });

  try {
    const newUser = await user.save();

    const token = await jwt.sign({
        data: minifyUser(newUser)
      },
      process.env.SECRET
    );

    res.status(200).json({
      user: minifyUser(newUser),
      token: token
    });
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
});

module.exports = router;