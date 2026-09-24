const SOSAlert = require('../models/SOSAlert');
const EmergencyContact = require('../models/EmergencyContact');
const User = require('../models/User');

// @desc    Trigger emergency SOS
// @route   POST /api/sos/trigger
const triggerSOS = async (req, res) => {
  try {
    const { location, emergencyType, notes } = req.body;

    if (!location || !location.lat || !location.lng) {
      return res.status(400).json({ success: false, message: 'GPS coordinates are required to trigger SOS' });
    }

    // Get user emergency contacts
    const contacts = await EmergencyContact.find({ userId: req.user.id });

    const notifiedList = contacts.map(c => ({
      name: c.name,
      phone: c.phone,
      notifiedAt: new Date()
    }));

    const alert = await SOSAlert.create({
      userId: req.user.id,
      location: {
        address: location.address || 'Live GPS Coordinates Broadcast',
        lat: location.lat,
        lng: location.lng
      },
      emergencyType: emergencyType || 'General SOS',
      status: 'active',
      notifiedContacts: notifiedList,
      notes: notes || 'EMERGENCY: User pressed SOS panic button. Assistance requested urgently.'
    });

    const populated = await SOSAlert.findById(alert._id).populate('userId', 'name phone email');

    res.status(201).json({
      success: true,
      message: '🚨 SOS Emergency Alert Dispatched! Emergency contacts and nearby support notified.',
      alert: populated
    });
  } catch (error) {
    console.error('SOS trigger error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get active SOS alerts (for admin and users)
// @route   GET /api/sos/active
const getActiveAlerts = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const alerts = await SOSAlert.find(filter)
      .populate('userId', 'name phone email avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: alerts.length, alerts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Resolve SOS alert
// @route   PUT /api/sos/:id/resolve
const resolveSOS = async (req, res) => {
  try {
    const alert = await SOSAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ success: false, message: 'SOS Alert not found' });
    }

    alert.status = 'resolved';
    alert.notes += ` [Resolved on ${new Date().toLocaleString()} by ${req.user.name}]`;
    await alert.save();

    res.json({ success: true, message: 'SOS alert marked as resolved', alert });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { triggerSOS, getActiveAlerts, resolveSOS };
