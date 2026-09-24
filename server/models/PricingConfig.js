const mongoose = require('mongoose');

const pricingConfigSchema = new mongoose.Schema(
  {
    rsa: {
      baseBreakdown: { type: Number, default: 399 },
      basePuncture: { type: Number, default: 199 },
      baseBattery: { type: Number, default: 349 },
      baseFuel: { type: Number, default: 249 },
      baseTowing: { type: Number, default: 799 },
      baseLockout: { type: Number, default: 449 },
      baseRepair: { type: Number, default: 499 },
      ratePerKm: { type: Number, default: 25 },
      emergencySurcharge: { type: Number, default: 150 },
      nightSurcharge: { type: Number, default: 200 },
      taxPercentage: { type: Number, default: 18 }
    },
    driver: {
      hourlyRate: { type: Number, default: 120 },
      dailyRate: { type: Number, default: 900 },
      outstationPerDay: { type: Number, default: 1400 },
      platformFeePercentage: { type: Number, default: 10 },
      nightAllowance: { type: Number, default: 150 },
      taxPercentage: { type: Number, default: 18 }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PricingConfig', pricingConfigSchema);
