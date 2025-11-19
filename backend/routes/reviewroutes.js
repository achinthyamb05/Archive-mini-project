// backend/routes/reviewroutes.js

const express = require('express');
const router = express.Router();
const { createReview, getAllReviews } = require('../controllers/reviewcontroller');
const { protect } = require('../middleware/auth'); 


router.route('/')
    .get(getAllReviews); // <-- NEW ROUTE


router.route('/:bookId')
    .post(protect, createReview);

module.exports = router;