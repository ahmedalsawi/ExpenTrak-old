const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp');

const TransactionSchema = mongoose.Schema({
  name: {
    type: String
  },
  amount: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    immutable: true,
    require: true
  },
});
TransactionSchema.plugin(timestamps);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction