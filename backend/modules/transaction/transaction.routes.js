const express = require('express')
const router = express.Router()

router.use(require('../../middleware/jwtAuthMW.js'))

const Transaction = require('./transaction.model.js');

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

const APIViewSet = require("../../lib/express-rest-framework")
const api = new APIViewSet(Transaction, transactionValidation)
api.routes('', router)

module.exports = router