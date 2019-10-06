const express = require('express')
const router = express.Router()

router.use(require('../../middleware/jwtAuthMW.js'))

const Transaction = require('../../models/transaction.model.js');

const Joi = require('@hapi/joi')

const transactionValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    amount: Joi.number(),
    date: Joi.date(),
    labels: Joi.array(),
    notes: Joi.string(),
    account: Joi.string()
  }).options({
    stripUnknown: true // Allow extra fields in sent object
  })
  return schema.validate(data);
}


router.post('/', async (req, res) => {

  const validated = transactionValidation(req.body)
  if (validated.error) {
    return res.status(400).json({
      message: validated.error.details[0].message
    });
  }

  const tran = new Transaction({
    ...validated.value,
    user: req.user._id
  })

  try {
    const newTran = await tran.save()

    res.status(201).json(
      newTran
    )
  } catch (err) {
    return res.sendStatus(500);
  }

});

router.get('/', async (req, res) => {
  try {
    const trans = await Transaction.find({
      user: req.user._id
    })
    return res.status(200).json(trans)
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.get('/:transactionId', async (req, res) => {
  transactionId = req.params.transactionId;
  try {
    const tran = await Transaction.findOne({
      user: req.user._id,
      _id: transactionId
    })
    if (!tran) {
      return res.status(404).json({
        message: "Not Found " + transactionId
      });
    }
    return res.status(200).json(tran)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Not Found " + transactionId
      });
    }
    return res.sendStatus(500);
  }
});

router.delete('/:transactionId', async (req, res) => {
  transactionId = req.params.transactionId;
  try {
    const tran = await Transaction.findOneAndRemove({
      user: req.user._id,
      _id: transactionId
    })
    if (!tran) {
      return res.status(404).json({
        message: "Not Found " + transactionId
      });
    }
    return res.sendStatus(204);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Not Found " + transactionId
      });
    }
    return res.sendStatus(500);
  }
});

router.put('/:transactionId', async (req, res) => {
  const validated = transactionValidation(req.body)
  if (validated.error) {
    return res.status(400).json({
      message: validated.error.details[0].message
    });
  }

  transactionId = req.params.transactionId;
  try {
    const tran = await Transaction.findOneAndUpdate({
      user: req.user._id,
      _id: transactionId
    }, {
      ...validated.value,
    }, {
      new: true
    })
    if (!tran) {
      return res.status(404).json({
        message: "Not Found " + transactionId
      });
    }
    return res.status(200).json(tran)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Not Found " + transactionId
      });
    }
    return res.sendStatus(500);
  }
});
module.exports = router