const mongoose = require('mongoose');

const assistanceRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    serviceType: {
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
      ],
      required: true
    },
    problemDescription: {
      type: String,
      required: true
    },
    photoUrl: {
      type: String,
      default: ''
    },
    location: {
      address: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    status: {
      type: String,
      enum: [
        'pending',
        'accepted',
        'on_the_way',
        'arrived',
        'in_progress',
        'completed',
        'cancelled'
      ],
      default: 'pending'
    },
    charges: {
      baseCharge: { type: Number, default: 299 },
      distanceCharge: { type: Number, default: 100 },
      serviceCharge: { type: Number, default: 150 },
      gst: { type: Number, default: 99 },
      totalAmount: { type: Number, default: 648 }
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'cash_on_delivery'],
      default: 'pending'
    },
    paymentId: {
      type: String,
      default: ''
    },
    distanceKm: {
      type: Number,
      default: 4.2
    },
    etaMinutes: {
      type: Number,
      default: 18
    },
    providerCurrentLocation: {
      lat: { type: Number },
      lng: { type: Number }
    },
    timeline: [
      {
        status: { type: String },
        timestamp: { type: Date, default: Date.now },
        note: { type: String }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('AssistanceRequest', assistanceRequestSchema);
