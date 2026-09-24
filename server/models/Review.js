const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    targetId: {
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
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    aspects: {
      punctuality: { type: Number, default: 5 },
      professionalism: { type: Number, default: 5 },
      serviceQuality: { type: Number, default: 5 }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
