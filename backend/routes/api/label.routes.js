const express = require('express')
const router = express.Router()

router.use(require('../../middleware/jwtAuthMW.js'))

const {
  getLabels,
  getLabel,
  createLabel,
  updateLabel,
  deleteLabel,
} = require('../../controllers/label.controller')

router.get('/', getLabels)
router.post('/', createLabel)
router.get('/:id', getLabel)
router.put('/:id', updateLabel)
router.delete('/:id', deleteLabel)

module.exports = router