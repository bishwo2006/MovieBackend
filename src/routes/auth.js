// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// Simple validation middleware
const validateSignup = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];

  if (!username || username.length < 3) {
    errors.push('Username must be at least 3 characters');
  }

  if (!email || !email.includes('@')) {
    errors.push('Please enter a valid email');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !email.includes('@')) {
    errors.push('Please enter a valid email');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Public routes
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);

// Protected routes
router.get('/profile', authMiddleware.authenticate, authController.getProfile);
router.put('/profile', authMiddleware.authenticate, authController.updateProfile);
router.post('/:id/change-password', authMiddleware.authenticate, authController.changePassword);
router.post('/profile-picture', 
  authMiddleware.authenticate, 
  uploadMiddleware.single('profileImage'),
  authController.uploadProfilePicture
);
router.post('/logout', authMiddleware.authenticate, authController.logout);
router.delete('/account', authMiddleware.authenticate, authController.deleteAccount);

// Get user by ID
router.put('/users/:id', authMiddleware.authenticate, authController.updateProfile);

module.exports = router;