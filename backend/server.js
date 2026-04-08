const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables from the root .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow parsing JSON from request bodies

// API routes
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

// Root API endpoints
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Protected profiles route (example as requested)
const { protect } = require('./middleware/authMiddleware');
app.get('/api/profile', protect, (req, res) => {
  res.json({
    message: 'Welcome to your profile!',
    user: req.user,
  });
});

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
