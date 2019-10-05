const express = require('express')
const router = express.Router()

router.use(require('../../middleware/jwtAuthMW.js'))

const Label = require('../../models/label.model.js');
const {
  labelValidation
} = require('../../validation/label.validation.js');


router.post('/', async (req, res) => {

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

});

router.get('/', async (req, res) => {
  try {
    const trans = await Label.find({
      user: req.user._id
    })
    return res.status(200).json(trans)
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.get('/:labelId', async (req, res) => {
  labelId = req.params.labelId;
  try {
    const tran = await Label.findOne({
      user: req.user._id,
      _id: labelId
    })
    if (!tran) {
      return res.status(404).json({
        message: "Not Found " + labelId
      });
    }
    return res.status(200).json(tran)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Not Found " + labelId
      });
    }
    return res.sendStatus(500);
  }
});

router.delete('/:labelId', async (req, res) => {
  labelId = req.params.labelId;
  try {
    const tran = await Label.findOneAndRemove({
      user: req.user._id,
      _id: labelId
    })
    if (!tran) {
      return res.status(404).json({
        message: "Not Found " + labelId
      });
    }
    return res.sendStatus(204);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Not Found " + labelId
      });
    }
    return res.sendStatus(500);
  }
});

router.put('/:labelId', async (req, res) => {
  const validated = labelValidation(req.body)
  if (validated.error) {
    return res.status(400).json({
      message: validated.error.details[0].message
    });
  }

  labelId = req.params.labelId;
  try {
    const tran = await Label.findOneAndUpdate({
      user: req.user._id,
      _id: labelId
    }, {
      ...validated.value,
    }, {
      new: true
    })
    if (!tran) {
      return res.status(404).json({
        message: "Not Found " + labelId
      });
    }
    return res.status(200).json(tran)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Not Found " + labelId
      });
    }
    return res.sendStatus(500);
  }
});
module.exports = router