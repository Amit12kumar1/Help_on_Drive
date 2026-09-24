const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    category: {
      type: String,
      enum: [
        'Booking Issue',
        'Payment Issue',
        'Driver Behaviour',
        'Service Provider Issue',
        'Emergency / Safety Issue',
        'Other'
      ],
      default: 'Booking Issue'
    },
    subject: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open'
    },
    adminResponse: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);
