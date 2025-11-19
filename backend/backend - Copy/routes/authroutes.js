const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUser, 
} = require('../controllers/usercontroller'); // ⬅️ Ensure 'usercontroller' is lowercase

const { protect } = require('../middleware/auth'); 

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);


router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
    


router.route('/:id').delete(protect, deleteUser); 

module.exports = router;