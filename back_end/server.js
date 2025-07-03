const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Import Routes
const rout = require('./routes/routes');

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Use /api route for frontend requests
app.use('/api', rout);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('✅ Hello, server is working!');
});

// ✅ Connect to MongoDB and start server
const PORT = 5000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/finman';

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect MongoDB:', err.message);
  });
