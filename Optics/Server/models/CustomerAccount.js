const mongoose = require('mongoose');

const CustomerAccountSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  active: { type: Boolean, required: true },
  numberOfBuildings: { type: Number, required: true },
  salesRep: { type: String, required: true },
  buildings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Building' }]  // Added buildings reference
}, { collection: 'accounts' });

const CustomerAccount = mongoose.model('CustomerAccount', CustomerAccountSchema);
module.exports = CustomerAccount;
