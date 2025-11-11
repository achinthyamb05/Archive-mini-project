// backend/routes/authroutes.js

const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
} = require('../controllers/usercontroller'); 
const { protect } = require('../middleware/auth'); // Use require

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Private routes
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router; // Use module.exports