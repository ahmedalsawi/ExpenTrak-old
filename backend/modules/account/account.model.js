const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp');

const Transaction = require('../transaction/transaction.model')

const AccountSchema = mongoose.Schema({
  name: {
    type: String,
  },
  balance: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    immutable: true,
    require: true
  },

});

AccountSchema.plugin(timestamps);

AccountSchema.post("findOneAndRemove", async (item, next) => {
  if (item === null) return;
  try {
    const transactions = await Transaction.find({
      user: item.user._id
    })

    transactions.map(async tran => {
      if (tran.account) tran.account = undefined
      await tran.save()
    })
    next();
  } catch (err) {
    console.log(err)
  }
});

module.exports = mongoose.model('Account', AccountSchema);