const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getDriverBookings,
  getBookingById,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createBooking);
router.get('/my', getMyBookings);
router.get('/driver', getDriverBookings);
router.get('/:id', getBookingById);
router.put('/:id/status', updateBookingStatus);

module.exports = router;
