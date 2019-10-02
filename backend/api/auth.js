var express = require('express')
var router = express.Router()


router.post('/login', function (req, res) {
  console.log(req.body)
  res.send('Login')
})

router.post('/register', function (req, res) {
  console.log(req.body)
  res.send('Regiser')
})

module.exports = router