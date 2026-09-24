const express = require('express');
const router = express.Router();
const { createReview, getMyReviews, getTargetReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createReview);
router.get('/my', protect, getMyReviews);
router.get('/target/:targetId', getTargetReviews);

module.exports = router;
