const Complaint = require('../models/Complaint');

// @desc    Submit support ticket / complaint
// @route   POST /api/complaints
const createComplaint = async (req, res) => {
  try {
    const { category, subject, description, bookingId } = req.body;
    if (!category || !subject || !description) {
      return res.status(400).json({ success: false, message: 'Please fill in all complaint details' });
    }

    const complaint = await Complaint.create({
      userId: req.user.id,
      bookingId: bookingId || null,
      category,
      subject,
      description
    });

    res.status(201).json({ success: true, message: 'Support ticket submitted successfully', complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's complaints
// @route   GET /api/complaints/my
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: complaints.length, complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all complaints (Admin)
// @route   GET /api/complaints/all
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: complaints.length, complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update complaint status (Admin)
// @route   PUT /api/complaints/:id
const updateComplaint = async (req, res) => {
  try {
    const { status, adminResponse } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    if (status) complaint.status = status;
    if (adminResponse) complaint.adminResponse = adminResponse;

    await complaint.save();

    res.json({ success: true, message: 'Complaint updated', complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createComplaint, getMyComplaints, getAllComplaints, updateComplaint };
