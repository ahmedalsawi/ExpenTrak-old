const express = require('express')
const router = express.Router()

router.use(require('../../middleware/jwtAuthMW.js'))

const Account = require('./account.model.js');

const Joi = require('@hapi/joi')
const AccountValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required()
  }).options({
    stripUnknown: true // Allow extra fields in sent object
  })
  return schema.validate(data);
}

const APIViewSet = require("../../lib/express-rest-framework")
const api = new APIViewSet(Account, AccountValidation)
api.routes('', router)


module.exports = router