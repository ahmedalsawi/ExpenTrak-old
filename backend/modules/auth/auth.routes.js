const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require('@hapi/joi')
const uuidv4 = require('uuid/v4')

const sendEmail = require('../../services/email.service')

const User = require("./auth.model.js");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
  return schema.validate(data);
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
  return schema.validate(data);
}


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

  if (user.active === false) {
    return res.status(401).json({
      message: "Email is not confirmed"
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

  // Generate activation code
  const activationCode = uuidv4();

  const user = new User({
    email: validatedForm.value.email,
    password: hash,
    username: validatedForm.value.username,
    active: false,
    activationCode: activationCode
  });

  try {
    const newUser = await user.save();

    // const token = await jwt.sign({
    //     data: minifyUser(newUser)
    //   },
    //   process.env.SECRET
    // );

    // send email
    const mailOptions = {
      // from: 'sender@email.com', // sender address
      to: newUser.email, // list of receivers
      subject: 'Expentrak email confirmation', // Subject line
      html: `<h1>To confirm you email, use the following link</h1>expenTrak.com/confirm/${newUser.activationCode}` // plain text body
    };

    // TODO do error checking for email
    // sendEmail(mailOptions)

    // res.status(200).json({
    //   user: minifyUser(newUser),
    //   token: token
    // });
    res.sendStatus(201);
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
});


router.get("/confirm/:code", async function (req, res) {
  const code = req.params.code;

  try {
    const user = await User.findOneAndUpdate({
      activationCode: code
    }, {
      active: true
    }, {
      new: true
    })
    if (!user) {
      return res.status(400).json({
        message: "Invalid activation code"
      });
    }
    res.sendStatus(200);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Invalid activation code"
      });
    }
    return res.sendStatus(500);
  }
});


module.exports = router;