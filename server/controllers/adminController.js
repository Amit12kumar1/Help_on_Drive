const User = require('../models/User');
const DriverProfile = require('../models/DriverProfile');
const ProviderProfile = require('../models/ProviderProfile');
const DriverBooking = require('../models/DriverBooking');
const AssistanceRequest = require('../models/AssistanceRequest');
const SOSAlert = require('../models/SOSAlert');
const Payment = require('../models/Payment');
const PricingConfig = require('../models/PricingConfig');

// @desc    Get complete admin analytics dashboard metrics
// @route   GET /api/admin/stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalDrivers = await DriverProfile.countDocuments();
    const totalProviders = await ProviderProfile.countDocuments();

    const pendingDrivers = await DriverProfile.countDocuments({ verificationStatus: 'pending' });
    const pendingProviders = await ProviderProfile.countDocuments({ verificationStatus: 'pending' });

    const totalRSA = await AssistanceRequest.countDocuments();
    const activeRSA = await AssistanceRequest.countDocuments({
      status: { $in: ['pending', 'accepted', 'on_the_way', 'arrived', 'in_progress'] }
    });
    const completedRSA = await AssistanceRequest.countDocuments({ status: 'completed' });

    const totalBookings = await DriverBooking.countDocuments();
    const activeBookings = await DriverBooking.countDocuments({
      status: { $in: ['pending', 'accepted', 'driver_arrived', 'trip_started'] }
    });
    const completedBookings = await DriverBooking.countDocuments({ status: 'completed' });

    const totalSOS = await SOSAlert.countDocuments();
    const activeSOS = await SOSAlert.countDocuments({ status: 'active' });

    // Revenue calculation
    const payments = await Payment.find({ status: 'success' });
    const totalRevenue = payments.reduce((acc, p) => acc + (p.amount || 0), 0);

    // Recent activity list
    const recentRSA = await AssistanceRequest.find().sort({ createdAt: -1 }).limit(5)
      .populate('userId', 'name')
      .populate('providerId', 'name');
    const recentBookings = await DriverBooking.find().sort({ createdAt: -1 }).limit(5)
      .populate('userId', 'name')
      .populate('driverId', 'name');

    res.json({
      success: true,
      stats: {
        users: { total: totalUsers },
        drivers: { total: totalDrivers, pending: pendingDrivers },
        providers: { total: totalProviders, pending: pendingProviders },
        rsa: { total: totalRSA, active: activeRSA, completed: completedRSA },
        bookings: { total: totalBookings, active: activeBookings, completed: completedBookings },
        sos: { total: totalSOS, active: activeSOS },
        revenue: { total: totalRevenue, count: payments.length }
      },
      recentActivity: {
        rsa: recentRSA,
        bookings: recentBookings
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get pending verification applications (Drivers & Providers)
// @route   GET /api/admin/verifications
const getPendingVerifications = async (req, res) => {
  try {
    const drivers = await DriverProfile.find({ verificationStatus: 'pending' })
      .populate('userId', 'name email phone avatar city createdAt');

    const providers = await ProviderProfile.find({ verificationStatus: 'pending' })
      .populate('userId', 'name email phone avatar city createdAt');

    res.json({ success: true, drivers, providers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve or reject partner
// @route   PUT /api/admin/verify/:role/:id
const verifyPartner = async (req, res) => {
  try {
    const { role, id } = req.params;
    const { status, notes } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be approved or rejected' });
    }

    if (role === 'driver') {
      const profile = await DriverProfile.findById(id);
      if (!profile) return res.status(404).json({ success: false, message: 'Driver profile not found' });
      profile.verificationStatus = status;
      if (notes) profile.verificationNotes = notes;
      await profile.save();
      return res.json({ success: true, message: `Driver verification set to ${status}`, profile });
    } else if (role === 'provider') {
      const profile = await ProviderProfile.findById(id);
      if (!profile) return res.status(404).json({ success: false, message: 'Provider profile not found' });
      profile.verificationStatus = status;
      if (notes) profile.verificationNotes = notes;
      await profile.save();
      return res.json({ success: true, message: `Provider verification set to ${status}`, profile });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid partner role' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get pricing configuration
// @route   GET /api/admin/pricing
const getPricing = async (req, res) => {
  try {
    let config = await PricingConfig.findOne();
    if (!config) {
      config = await PricingConfig.create({});
    }
    res.json({ success: true, pricing: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update pricing configuration
// @route   PUT /api/admin/pricing
const updatePricing = async (req, res) => {
  try {
    let config = await PricingConfig.findOne();
    if (!config) {
      config = await PricingConfig.create(req.body);
    } else {
      config = await PricingConfig.findByIdAndUpdate(config._id, req.body, { new: true });
    }
    res.json({ success: true, message: 'Pricing configuration updated', pricing: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users list
// @route   GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getPendingVerifications,
  verifyPartner,
  getPricing,
  updatePricing,
  getAllUsers
};
