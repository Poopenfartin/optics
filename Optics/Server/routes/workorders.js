const express = require('express');
const router = express.Router();
const WorkOrder = require('../models/WorkOrder'); // Ensure the path is correct

// Get all work orders
router.get('/', async (req, res) => {
  try {
    const allWorkOrders = await WorkOrder.find();
    res.json(allWorkOrders);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Create a new work order
router.post('/', async (req, res) => {
  try {
    const newWorkOrder = new WorkOrder(req.body);
    await newWorkOrder.save();
    res.json(newWorkOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create work order' });
  }
});

// Update an existing work order
router.put('/:id', async (req, res) => {
  try {
    const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedWorkOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update work order' });
  }
});


// Delete a work order
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Attempting to delete work order with id: ${req.params.id}`);
    const workOrder = await WorkOrder.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead
    if (!workOrder) {
      console.log(`Work order with id ${req.params.id} not found`);
      return res.status(404).send();
    }
    console.log(`Work order with id ${req.params.id} deleted successfully`);
    res.json({ message: 'Work order deleted successfully' });
  } catch (error) {
    console.error(`Error deleting work order with id ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to delete work order' });
  }
});

module.exports = router;



