const ProviderProfile = require('../models/ProviderProfile');
const User = require('../models/User');

// @desc    Get all available providers
// @route   GET /api/providers
const getProviders = async (req, res) => {
  try {
    const { service } = req.query;
    let filter = {
      isAvailable: true,
      verificationStatus: 'approved'
    };

    if (service) {
      filter.servicesOffered = service;
    }

    const providers = await ProviderProfile.find(filter)
      .populate('userId', 'name phone email avatar city')
      .sort({ rating: -1 });

    res.json({ success: true, count: providers.length, providers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get provider by ID
// @route   GET /api/providers/:id
const getProviderById = async (req, res) => {
  try {
    const provider = await ProviderProfile.findOne({
      $or: [{ _id: req.params.id }, { userId: req.params.id }]
    }).populate('userId', 'name phone email avatar city');

    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    res.json({ success: true, provider });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update provider settings/availability
// @route   PUT /api/providers/me
const updateMyProviderProfile = async (req, res) => {
  try {
    const { isAvailable, businessName, baseCharge, ratePerKm, servicesOffered, currentLocation } = req.body;

    let profile = await ProviderProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Provider profile not found' });
    }

    if (typeof isAvailable !== 'undefined') profile.isAvailable = isAvailable;
    if (businessName) profile.businessName = businessName;
    if (baseCharge) profile.baseCharge = Number(baseCharge);
    if (ratePerKm) profile.ratePerKm = Number(ratePerKm);
    if (servicesOffered) profile.servicesOffered = servicesOffered;
    if (currentLocation) profile.currentLocation = currentLocation;

    await profile.save();

    res.json({ success: true, message: 'Provider profile updated', profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProviders, getProviderById, updateMyProviderProfile };
