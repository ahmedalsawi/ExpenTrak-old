const express = require('express')
const router = express.Router()

router.use(require('../../middleware/jwtAuthMW.js'))

const {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
} = require('../../controllers/account.controller')

router.get('/', getAccounts)
router.post('/', createAccount)
router.get('/:id', getAccount)
router.put('/:id', updateAccount)
router.delete('/:id', deleteAccount)

module.exports = router