const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp');

const Transaction = require('./transaction.model')

const LabelSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    immutable: true,
    require: true
  },

});

LabelSchema.plugin(timestamps);

LabelSchema.post("findOneAndRemove", async (label, next) => {
  if (label === null) return;
  try {
    const transactions = await Transaction.find({
      user: label.user._id
    })

    transactions.map(async tran => {
      let newlabels = tran.labels.filter(l => !l.equals(label._id))
      tran.labels = newlabels
      await tran.save()
    })
    next();
  } catch (err) {
    console.log(err)
  }
});

module.exports = mongoose.model('Label', LabelSchema);