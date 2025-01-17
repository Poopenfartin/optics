const express = require('express');
const router = express.Router();
const Building = require('../models/Building');

// Route to get buildings by customer ID
router.get('/customer/:customerId', async (req, res) => {
  try {
    const buildings = await Building.find({ customerId: req.params.customerId });
    res.json(buildings);
  } catch (err) {
    console.error('Error fetching buildings:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Route to create a new building
router.post('/', async (req, res) => {
  try {
    const newBuilding = new Building(req.body);
    const savedBuilding = await newBuilding.save();
    res.status(201).json(savedBuilding);
  } catch (err) {
    console.error('Error creating building:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

module.exports = router;
