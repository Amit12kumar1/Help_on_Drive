const Payment = require('../models/Payment');
const DriverBooking = require('../models/DriverBooking');
const AssistanceRequest = require('../models/AssistanceRequest');

// @desc    Process mock payment & generate invoice
// @route   POST /api/payments/process
const processPayment = async (req, res) => {
  try {
    const { bookingId, bookingType, paymentMethod, amount, breakdown } = req.body;

    if (!bookingId || !bookingType || !amount) {
      return res.status(400).json({ success: false, message: 'Invalid payment parameters' });
    }

    const invoiceNumber = `HOD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const payment = await Payment.create({
      userId: req.user.id,
      bookingId,
      bookingType,
      invoiceNumber,
      amount: Number(amount),
      paymentMethod: paymentMethod || 'upi',
      transactionId,
      status: 'success',
      breakdown: breakdown || {
        baseFare: Math.round(amount * 0.7),
        driverOrServiceCharge: Math.round(amount * 0.2),
        platformFee: 50,
        gst: Math.round(amount * 0.08)
      }
    });

    // Update target booking payment status
    if (bookingType === 'driver') {
      await DriverBooking.findByIdAndUpdate(bookingId, {
        paymentStatus: 'paid',
        paymentId: transactionId
      });
    } else if (bookingType === 'assistance') {
      await AssistanceRequest.findByIdAndUpdate(bookingId, {
        paymentStatus: 'paid',
        paymentId: transactionId
      });
    }

    res.status(201).json({
      success: true,
      message: 'Payment verified and processed successfully!',
      payment
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single invoice
// @route   GET /api/payments/invoice/:bookingId
const getInvoice = async (req, res) => {
  try {
    const payment = await Payment.findOne({ bookingId: req.params.bookingId })
      .populate('userId', 'name email phone address city');

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    let bookingDetails = null;
    if (payment.bookingType === 'driver') {
      bookingDetails = await DriverBooking.findById(payment.bookingId)
        .populate('vehicleId')
        .populate('driverId', 'name phone avatar');
    } else {
      bookingDetails = await AssistanceRequest.findById(payment.bookingId)
        .populate('vehicleId')
        .populate('providerId', 'name phone avatar');
    }

    res.json({ success: true, payment, bookingDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all payments for user
// @route   GET /api/payments/my
const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: payments.length, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { processPayment, getInvoice, getMyPayments };
