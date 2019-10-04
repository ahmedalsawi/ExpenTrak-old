const express = require('express')


const Transaction = require('../models/TransactionModel')

const router = express.Router()

router.use(require('../middleware/jwtAuthMW.js'))

router.route('/')
  .get(async (req, res, next) => {
    const trans = await Transaction.find({
      user: req.user._id
    })
    res.status(200).json(trans)
  })
  .post(async (req, res, next) => {
    const {
      name
    } = req.body;

    const tran = new Transaction({
      name: name,
      user: req.user._id
    })

    const newTran = await tran.save({})

    res.status(200).json(
      newTran
    )
  })

module.exports = router