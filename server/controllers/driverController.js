const DriverProfile = require('../models/DriverProfile');
const User = require('../models/User');

// @desc    Get all available verified drivers with search filters
// @route   GET /api/drivers
const getAvailableDrivers = async (req, res) => {
  try {
    const { vehicleType, minRating } = req.query;

    let filter = {
      isAvailable: true,
      verificationStatus: 'approved'
    };

    if (vehicleType) {
      filter.vehicleTypesSupported = vehicleType;
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    const drivers = await DriverProfile.find(filter)
      .populate('userId', 'name phone email avatar city')
      .sort({ rating: -1 });

    res.json({ success: true, count: drivers.length, drivers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get driver by ID
// @route   GET /api/drivers/:id
const getDriverById = async (req, res) => {
  try {
    const driver = await DriverProfile.findOne({
      $or: [{ _id: req.params.id }, { userId: req.params.id }]
    }).populate('userId', 'name phone email avatar city');

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    res.json({ success: true, driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update driver profile, availability, or rates
// @route   PUT /api/drivers/me
const updateMyDriverProfile = async (req, res) => {
  try {
    const { isAvailable, hourlyRate, dailyRate, currentLocation, vehicleTypesSupported, languages } = req.body;

    let profile = await DriverProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Driver profile not found' });
    }

    if (typeof isAvailable !== 'undefined') profile.isAvailable = isAvailable;
    if (hourlyRate) profile.hourlyRate = Number(hourlyRate);
    if (dailyRate) profile.dailyRate = Number(dailyRate);
    if (vehicleTypesSupported) profile.vehicleTypesSupported = vehicleTypesSupported;
    if (languages) profile.languages = languages;
    if (currentLocation) profile.currentLocation = currentLocation;

    await profile.save();

    res.json({ success: true, message: 'Driver settings updated', profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAvailableDrivers, getDriverById, updateMyDriverProfile };
