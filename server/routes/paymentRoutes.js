const express = require('express');
const router = express.Router();
const { processPayment, getInvoice, getMyPayments } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/process', processPayment);
router.get('/invoice/:bookingId', getInvoice);
router.get('/my', getMyPayments);

module.exports = router;
