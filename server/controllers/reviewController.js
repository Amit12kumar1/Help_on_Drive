const Review = require('../models/Review');
const DriverProfile = require('../models/DriverProfile');
const ProviderProfile = require('../models/ProviderProfile');

// @desc    Submit a review
// @route   POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { targetId, bookingId, bookingType, rating, comment, aspects } = req.body;

    if (!bookingId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide rating, comment, and booking details' });
    }

    const finalTargetId = targetId || req.user.id;

    const review = await Review.create({
      userId: req.user.id,
      targetId: finalTargetId,
      bookingId,
      bookingType: bookingType || 'assistance',
      rating: Number(rating),
      comment,
      aspects: aspects || { punctuality: 5, professionalism: 5, serviceQuality: 5 }
    });

    // Update average rating for target driver or provider if valid targetId
    if (targetId) {
      if (bookingType === 'driver') {
        const allReviews = await Review.find({ targetId, bookingType: 'driver' });
        const avg = allReviews.reduce((acc, r) => acc + r.rating, 0) / (allReviews.length || 1);
        await DriverProfile.findOneAndUpdate(
          { userId: targetId },
          { rating: Number(avg.toFixed(1)), totalRatings: allReviews.length }
        );
      } else {
        const allReviews = await Review.find({ targetId, bookingType: 'assistance' });
        const avg = allReviews.reduce((acc, r) => acc + r.rating, 0) / (allReviews.length || 1);
        await ProviderProfile.findOneAndUpdate(
          { userId: targetId },
          { rating: Number(avg.toFixed(1)), totalRatings: allReviews.length }
        );
      }
    }

    res.status(201).json({ success: true, message: 'Thank you for your feedback! Rating recorded.', review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's own submitted reviews
// @route   GET /api/reviews/my
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get reviews for a driver or provider
// @route   GET /api/reviews/target/:targetId
const getTargetReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ targetId: req.params.targetId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createReview, getMyReviews, getTargetReviews };
