const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password, firstName, lastName, jobTitle } = req.body; // Include jobTitle
  console.log('Register attempt with data:', { username, email, firstName, lastName, jobTitle }); // Log registration data
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      jobTitle // Include jobTitle
    });
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error('Server error during registration:', error); // Log server error details
    res.status(500).json({ message: 'Server error' });
  }
});


// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token, user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];
        // Verify token
        const decoded = jwt.verify(token, 'your_jwt_secret');
        // Get user from the token
        req.user = await User.findById(decoded.id).select('-password');
        next(); // Continue to the route handler
      } catch (error) {
        console.error('Not authorized, token failed:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
module.exports = { protect, router };
