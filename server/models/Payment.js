const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    bookingType: {
      type: String,
      enum: ['assistance', 'driver'],
      required: true
    },
    invoiceNumber: {
      type: String,
      unique: true,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    paymentMethod: {
      type: String,
      enum: ['upi', 'card', 'netbanking', 'cash'],
      default: 'upi'
    },
    transactionId: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['success', 'pending', 'failed', 'refunded'],
      default: 'success'
    },
    breakdown: {
      baseFare: { type: Number, default: 0 },
      distanceFare: { type: Number, default: 0 },
      driverOrServiceCharge: { type: Number, default: 0 },
      platformFee: { type: Number, default: 0 },
      gst: { type: Number, default: 0 },
      discount: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
