const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    relationship: {
      type: String,
      enum: ['Father', 'Mother', 'Brother', 'Sister', 'Spouse', 'Friend', 'Other'],
      default: 'Friend'
    },
    phone: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
