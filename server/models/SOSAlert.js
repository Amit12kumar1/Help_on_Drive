const mongoose = require('mongoose');

const sosAlertSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    location: {
      address: { type: String, default: 'Location Acquired via GPS' },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    emergencyType: {
      type: String,
      enum: ['Accident', 'Medical', 'Highway Threat', 'Vehicle Breakdown Night', 'General SOS'],
      default: 'General SOS'
    },
    status: {
      type: String,
      enum: ['active', 'responded', 'resolved'],
      default: 'active'
    },
    notifiedContacts: [
      {
        name: String,
        phone: String,
        notifiedAt: { type: Date, default: Date.now }
      }
    ],
    notes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SOSAlert', sosAlertSchema);
