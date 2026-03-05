const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const path = require('path');

const categoryRoutes = require('./routes/categoryRoutes');
const companyRoutes = require('./routes/companyRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 5000;

console.log(__dirname);

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// CORS setup (if needed)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Mount API routes
app.use('/api', categoryRoutes);
app.use('/api', companyRoutes);
app.use('/api', productRoutes);

// Serve static assets with no long cache during debugging/deploys
app.use(express.static(path.join(__dirname, 'client/build'), { maxAge: 0 }));
app.get('*', (req, res) => {
  // Force browsers to revalidate index.html so updated bundles are picked up
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, 'client/', 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
