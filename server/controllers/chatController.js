const ChatMessage = require('../models/Chat');

// @desc    Get messages for a booking
// @route   GET /api/chat/:bookingId
const getBookingMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find({ bookingId: req.params.bookingId })
      .populate('senderId', 'name avatar role')
      .sort({ createdAt: 1 });

    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Send a chat message (REST fallback)
// @route   POST /api/chat
const sendMessage = async (req, res) => {
  try {
    const { bookingId, receiverId, text } = req.body;

    if (!bookingId || !receiverId || !text) {
      return res.status(400).json({ success: false, message: 'Please provide bookingId, receiverId, and text' });
    }

    const message = await ChatMessage.create({
      bookingId,
      senderId: req.user.id,
      receiverId,
      text
    });

    const populated = await ChatMessage.findById(message._id).populate('senderId', 'name avatar role');

    res.status(201).json({ success: true, message: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getBookingMessages, sendMessage };
