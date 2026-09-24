const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    vehicleNumber: {
      type: String,
      required: [true, 'Vehicle registration number is required'],
      uppercase: true,
      trim: true
    },
    vehicleType: {
      type: String,
      enum: ['Hatchback', 'Sedan', 'SUV', 'Luxury', 'Bike', 'Commercial'],
      default: 'Sedan'
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    model: {
      type: String,
      required: true,
      trim: true
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'],
      default: 'Petrol'
    },
    color: {
      type: String,
      default: 'White'
    },
    rcNumber: {
      type: String,
      default: ''
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
