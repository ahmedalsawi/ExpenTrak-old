const Joi = require('@hapi/joi')

const Account = require('../models/account.model.js');

const AccountValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required()
  })
  return schema.validate(data);
}

const getAccounts = async (req, res) => {
  try {
    const trans = await Account.find({
      user: req.user._id
    })
    return res.status(200).json(trans)
  } catch (err) {
    return res.sendStatus(500);
  }
}

const getAccount = async (req, res) => {
  id = req.params.id;
  try {
    const tran = await Account.findOne({
      user: req.user._id,
      _id: id
    })
    if (!tran) {
      return res.status(404).json({
        message: "Not Found " + id
      });
    }
    return res.status(200).json(tran)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Not Found " + id
      });
    }
    return res.sendStatus(500);
  }
}

const createAccount = async (req, res) => {

  const validated = AccountValidation(req.body)
  if (validated.error) {
    return res.status(400).json({
      message: validated.error.details[0].message
    });
  }

  const tran = new Account({
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
}

const updateAccount = async (req, res) => {
  const validated = AccountValidation(req.body)
  if (validated.error) {
    return res.status(400).json({
      message: validated.error.details[0].message
    });
  }

  id = req.params.id;
  try {
    const tran = await Account.findOneAndUpdate({
      user: req.user._id,
      _id: id
    }, {
      ...validated.value,
    }, {
      new: true
    })
    if (!tran) {
      return res.status(404).json({
        message: "Not Found " + id
      });
    }
    return res.status(200).json(tran)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Not Found " + id
      });
    }
    return res.sendStatus(500);
  }
}

const deleteAccount = async (req, res) => {
  id = req.params.id;
  try {
    const tran = await Account.findOneAndRemove({
      user: req.user._id,
      _id: id
    })
    console.log(id)
    if (!tran) {
      return res.status(404).json({
        message: "Not Found " + id
      });
    }
    return res.sendStatus(204);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Not Found " + id
      });
    }
    return res.sendStatus(500);
  }
}


module.exports = {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount
}