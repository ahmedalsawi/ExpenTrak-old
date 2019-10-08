const express = require('express')
const router = express.Router()

router.use(require('../../middleware/jwtAuthMW.js'))

const Label = require('./label.model.js');

const labelValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required()
  })
  return schema.validate(data);
}

const APIViewSet = require("../../lib/express-rest-framework")
const api = new APIViewSet(Label, labelValidation)
api.routes('', router)

module.exports = router