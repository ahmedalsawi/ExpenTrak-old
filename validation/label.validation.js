const Joi = require('@hapi/joi')

const labelValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required()
  })
  return schema.validate(data);
}
module.exports.labelValidation = labelValidation;