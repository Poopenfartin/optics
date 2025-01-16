const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
  address: { type: String, required: true },
  billingAddress: { type: String },
  contactInformation: { type: String },
  notes: { type: String },
  preferredServiceTechnician: { type: String },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerAccount', required: true }
});

const Building = mongoose.model('Building', BuildingSchema);
module.exports = Building;
