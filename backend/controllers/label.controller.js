const Joi = require('@hapi/joi')

const Label = require('../models/label.model.js');

const labelValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required()
  })
  return schema.validate(data);
}

const getLabels = async (req, res) => {
  try {
    const trans = await Label.find({
      user: req.user._id
    })
    return res.status(200).json(trans)
  } catch (err) {
    return res.sendStatus(500);
  }
}

const getLabel = async (req, res) => {
  id = req.params.id;
  try {
    const tran = await Label.findOne({
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

const createLabel = async (req, res) => {

  const validated = labelValidation(req.body)
  if (validated.error) {
    return res.status(400).json({
      message: validated.error.details[0].message
    });
  }

  const tran = new Label({
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

const updateLabel = async (req, res) => {
  const validated = labelValidation(req.body)
  if (validated.error) {
    return res.status(400).json({
      message: validated.error.details[0].message
    });
  }

  id = req.params.id;
  try {
    const tran = await Label.findOneAndUpdate({
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

const deleteLabel = async (req, res) => {
  id = req.params.id;
  try {
    const tran = await Label.findOneAndRemove({
      user: req.user._id,
      _id: id
    })
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
  getLabels,
  getLabel,
  createLabel,
  updateLabel,
  deleteLabel
}