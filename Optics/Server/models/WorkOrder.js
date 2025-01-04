// models/WorkOrder.js
const mongoose = require('mongoose');

const WorkOrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  name: { type: String, required: true },
  jobDescription: { type: String, required: true },
  price: { type: Number, required: true },
  laborNotes: { type: String, required: true },
  status: { type: String, required: true, enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], default: 'Pending' },
  projectManager: { type: String, required: true }, 
}, { timestamps: true });

const WorkOrder = mongoose.model('WorkOrder', WorkOrderSchema);
module.exports = WorkOrder;
