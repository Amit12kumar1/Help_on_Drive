const AssistanceRequest = require('../models/AssistanceRequest');
const ProviderProfile = require('../models/ProviderProfile');
const User = require('../models/User');

// @desc    Create new Roadside Assistance request
// @route   POST /api/assistance
const createRequest = async (req, res) => {
  try {
    const { vehicleId, serviceType, problemDescription, location, charges, providerId } = req.body;

    if (!vehicleId || !serviceType || !problemDescription || !location) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Default calculations if not provided
    const calculatedCharges = charges || {
      baseCharge: serviceType === 'towing' ? 799 : (serviceType === 'puncture' ? 199 : 299),
      distanceCharge: 100,
      serviceCharge: 150,
      gst: 99,
      totalAmount: (serviceType === 'towing' ? 799 : (serviceType === 'puncture' ? 199 : 299)) + 250 + 99
    };

    const newRequest = await AssistanceRequest.create({
      userId: req.user.id,
      vehicleId,
      providerId: providerId || null,
      serviceType,
      problemDescription,
      location,
      charges: calculatedCharges,
      status: providerId ? 'accepted' : 'pending',
      timeline: [
        {
          status: 'pending',
          note: 'Assistance request created by user'
        }
      ]
    });

    const populated = await AssistanceRequest.findById(newRequest._id)
      .populate('userId', 'name phone email avatar')
      .populate('vehicleId')
      .populate('providerId', 'name phone avatar');

    res.status(201).json({
      success: true,
      message: 'Roadside assistance requested successfully',
      request: populated
    });
  } catch (error) {
    console.error('Create assistance error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's assistance requests
// @route   GET /api/assistance/my
const getMyRequests = async (req, res) => {
  try {
    const requests = await AssistanceRequest.find({ userId: req.user.id })
      .populate('vehicleId')
      .populate('providerId', 'name phone avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: requests.length, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single request details
// @route   GET /api/assistance/:id
const getRequestById = async (req, res) => {
  try {
    const request = await AssistanceRequest.findById(req.params.id)
      .populate('userId', 'name phone email avatar city')
      .populate('vehicleId')
      .populate('providerId', 'name phone avatar');

    if (!request) {
      return res.status(404).json({ success: false, message: 'Assistance request not found' });
    }

    res.json({ success: true, request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get nearby requests for service providers
// @route   GET /api/assistance/provider/jobs
const getProviderJobs = async (req, res) => {
  try {
    const jobs = await AssistanceRequest.find({
      $or: [
        { providerId: req.user.id },
        { status: 'pending', providerId: null }
      ]
    })
      .populate('userId', 'name phone email avatar')
      .populate('vehicleId')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Provider accepts a job
// @route   PUT /api/assistance/:id/accept
const acceptRequest = async (req, res) => {
  try {
    const request = await AssistanceRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Request is already accepted or completed' });
    }

    request.providerId = req.user.id;
    request.status = 'accepted';
    request.timeline.push({
      status: 'accepted',
      note: 'Provider accepted the request and is preparing dispatch'
    });

    await request.save();

    const populated = await AssistanceRequest.findById(request._id)
      .populate('userId', 'name phone email avatar')
      .populate('vehicleId')
      .populate('providerId', 'name phone avatar');

    res.json({ success: true, message: 'Job accepted successfully', request: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update assistance status (on_the_way -> arrived -> in_progress -> completed)
// @route   PUT /api/assistance/:id/status
const updateStatus = async (req, res) => {
  try {
    const { status, note, providerLocation } = req.body;
    const request = await AssistanceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    request.status = status;
    if (providerLocation) {
      request.providerCurrentLocation = providerLocation;
    }

    request.timeline.push({
      status,
      note: note || `Status updated to ${status.replace(/_/g, ' ')}`
    });

    if (status === 'completed') {
      // update provider total jobs and earnings
      await ProviderProfile.findOneAndUpdate(
        { userId: request.providerId },
        {
          $inc: {
            totalJobs: 1,
            earnings: request.charges.totalAmount
          }
        }
      );
    }

    await request.save();

    const populated = await AssistanceRequest.findById(request._id)
      .populate('userId', 'name phone email avatar')
      .populate('vehicleId')
      .populate('providerId', 'name phone avatar');

    res.json({ success: true, message: `Status updated to ${status}`, request: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRequest,
  getMyRequests,
  getRequestById,
  getProviderJobs,
  acceptRequest,
  updateStatus
};
