// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv'); // Ensure dotenv is required at the top

dotenv.config();  // This loads the environment variables from your .env file

const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors()); // Enable CORS for all routes

// OR if you want to restrict to localhost:4200 only:
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve image files from 'uploads' folder

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use product routes
app.use('/api', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
