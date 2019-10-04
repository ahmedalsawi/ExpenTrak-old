const Joi = require('@hapi/joi')

const transactionValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    amount: Joi.number(),
    date: Joi.date()
  })
  return schema.validate(data);
}
module.exports.transactionValidation = transactionValidation;