const mongoose = require('mongoose');

const providerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    businessName: {
      type: String,
      required: true,
      trim: true
    },
    serviceType: {
      type: String,
      enum: ['Mechanic', 'Towing', 'Tyre & Puncture', 'Battery Service', 'Fuel Delivery', 'All-in-One'],
      default: 'Mechanic'
    },
    servicesOffered: [
      {
        type: String,
        enum: [
          'breakdown',
          'puncture',
          'battery',
          'fuel',
          'towing',
          'lockout',
          'repair',
          'emergency'
        ]
      }
    ],
    experienceYears: {
      type: Number,
      default: 5
    },
    baseCharge: {
      type: Number,
      default: 299 // INR
    },
    ratePerKm: {
      type: Number,
      default: 25 // INR per km
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    verificationNotes: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 4.9
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    totalJobs: {
      type: Number,
      default: 0
    },
    earnings: {
      type: Number,
      default: 0
    },
    workshopAddress: {
      type: String,
      default: ''
    },
    currentLocation: {
      lat: { type: Number, default: 28.6139 },
      lng: { type: Number, default: 77.2090 },
      address: { type: String, default: 'Karol Bagh, New Delhi' }
    },
    documents: {
      tradeLicense: { type: String, default: '' },
      mechanicCertificate: { type: String, default: '' },
      idProof: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProviderProfile', providerProfileSchema);
