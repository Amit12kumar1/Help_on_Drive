const express = require('express');
const router = express.Router();
const { getBookingMessages, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/:bookingId', getBookingMessages);
router.post('/', sendMessage);

module.exports = router;
