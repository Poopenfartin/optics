const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://bkwiatt:s3RbsHMisweun2Qv@cluster0.s9zkoo8.mongodb.net/optics?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// Root URL route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Routes
const workOrderRoutes = require('./routes/workorders');
const { protect, router: authRoutes } = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Protecting the workorders routes
app.use('/api/workorders', protect, workOrderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
