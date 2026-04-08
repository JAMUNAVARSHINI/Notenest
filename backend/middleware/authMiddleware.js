const jwt = require('jsonwebtoken');
const User = require('../models/User');

/*
 * @desc Auth middleware to protect routes
 * Verifies JWT token and populates req.user
*/
const protect = async (req, res, next) => {
  let token;

  // Check for JWT token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get the token from the Bearer header
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user by id from the token and attach it to the request object
      // Exclude the password field
      req.user = await User.findById(decoded.id).select('-password');

      // Continue to the next middleware or controller
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
