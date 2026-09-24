const mongoose = require('mongoose');

const driverProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    licenseNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    licenseExpiry: {
      type: Date
    },
    experienceYears: {
      type: Number,
      default: 3
    },
    vehicleTypesSupported: [
      {
        type: String,
        enum: ['Hatchback', 'Sedan', 'SUV', 'Luxury', 'Commercial']
      }
    ],
    transmissionTypes: [
      {
        type: String,
        enum: ['Manual', 'Automatic']
      }
    ],
    languages: [
      {
        type: String
      }
    ],
    hourlyRate: {
      type: Number,
      default: 120 // INR per hour
    },
    dailyRate: {
      type: Number,
      default: 900 // INR per day (8-10 hrs)
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
      default: 4.8
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    totalTrips: {
      type: Number,
      default: 0
    },
    earnings: {
      type: Number,
      default: 0
    },
    currentLocation: {
      lat: { type: Number, default: 28.6139 },
      lng: { type: Number, default: 77.2090 },
      address: { type: String, default: 'Connaught Place, New Delhi' }
    },
    documents: {
      licenseImage: { type: String, default: '' },
      idProofImage: { type: String, default: '' },
      policeVerification: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('DriverProfile', driverProfileSchema);
