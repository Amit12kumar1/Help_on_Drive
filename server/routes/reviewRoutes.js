const express = require('express');
const router = express.Router();
const { createReview, getTargetReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createReview);
router.get('/target/:targetId', getTargetReviews);

module.exports = router;
