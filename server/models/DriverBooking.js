const mongoose = require('mongoose');

const driverBookingSchema = new mongoose.Schema(
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
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bookingType: {
      type: String,
      enum: [
        '2_hours',
        '4_hours',
        '6_hours',
        '8_hours',
        'full_day',
        '2_days',
        '3_days',
        '7_days',
        'custom'
      ],
      default: '4_hours'
    },
    tripType: {
      type: String,
      enum: ['city_commute', 'one_way', 'round_trip', 'outstation'],
      default: 'city_commute'
    },
    startDate: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endDate: {
      type: String
    },
    durationHours: {
      type: Number,
      default: 4
    },
    durationDays: {
      type: Number,
      default: 1
    },
    pickupLocation: {
      address: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    destinationLocation: {
      address: { type: String, default: '' },
      lat: { type: Number, default: 28.5355 },
      lng: { type: Number, default: 77.3910 }
    },
    notes: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: [
        'pending',
        'accepted',
        'driver_arrived',
        'trip_started',
        'completed',
        'cancelled'
      ],
      default: 'pending'
    },
    fare: {
      rate: { type: Number, default: 120 },
      driverFee: { type: Number, default: 480 },
      platformFee: { type: Number, default: 50 },
      tax: { type: Number, default: 40 },
      totalAmount: { type: Number, default: 570 }
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'cash'],
      default: 'pending'
    },
    paymentId: {
      type: String,
      default: ''
    },
    driverCurrentLocation: {
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

module.exports = mongoose.model('DriverBooking', driverBookingSchema);
