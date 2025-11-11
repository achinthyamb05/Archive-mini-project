// backend/routes/reviewroutes.js

const express = require('express');
const router = express.Router();
// CRITICAL: Import the controller function using the correct name
const { reviewcontroller } = require('../controllers/reviewcontroller'); 

// Placeholder POST route for submitting a review
// The handler must be correctly imported and be a function.
router.route('/:bookId')
    .post(reviewcontroller); // The review logic should be implemented in reviewcontroller

// Placeholder GET route to fetch reviews (already done in getBookById, but often duplicated here)
// router.route('/:bookId/reviews').get(getReviewsByBookId); 

module.exports = router;