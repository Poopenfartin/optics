const express = require('express');
const router = express.Router();
const CustomerAccount = require('../models/CustomerAccount');

// Route to get all customer accounts
router.get('/', async (req, res) => {
  try {
    const customerAccounts = await CustomerAccount.find();
    res.json(customerAccounts);
  } catch (err) {
    console.error('Error fetching customer accounts:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Route to get a single customer account by ID
router.get('/:id', async (req, res) => {
  try {
    const customerAccount = await CustomerAccount.findById(req.params.id);
    if (!customerAccount) {
      return res.status(404).json({ message: 'Customer Account not found' });
    }
    res.json(customerAccount);
  } catch (err) {
    console.error('Error fetching customer account:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Route to create a new customer account
router.post('/', async (req, res) => {
  try {
    const newCustomerAccount = new CustomerAccount(req.body);
    const savedAccount = await newCustomerAccount.save();
    res.status(201).json(savedAccount);
  } catch (err) {
    console.error('Error creating customer account:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

module.exports = router;
