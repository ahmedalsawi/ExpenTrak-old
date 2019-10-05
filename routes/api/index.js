const router = require('express').Router()

router.use('/auth', require('./auth.routes.js'))
router.use('/transactions', require('./transaction.routes.js'))
router.use('/labels', require('./label.routes.js'))
router.use('/accounts', require('./account.routes.js'))

router.get('/', function (req, res, next) {
  res.status(200).json({
    message: 'This is API index route'
  })
})


module.exports = router