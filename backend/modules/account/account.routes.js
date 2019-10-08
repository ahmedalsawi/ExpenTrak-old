const express = require('express')
const router = express.Router()

router.use(require('../../middleware/jwtAuthMW.js'))

const Account = require('./account.model.js');

const AccountValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required()
  })
  return schema.validate(data);
}

const APIViewSet = require("../../lib/express-rest-framework")
const api = new APIViewSet(Account, AccountValidation)
api.routes('', router)


module.exports = router