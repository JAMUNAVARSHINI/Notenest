const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public route: User Registration
router.post('/register', registerUser);

// Public route: User Login
router.post('/login', loginUser);

// Protected route: User Profile (requires valid JWT token)
router.get('/profile', protect, getUserProfile);

module.exports = router;
