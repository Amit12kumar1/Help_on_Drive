const EmergencyContact = require('../models/EmergencyContact');

// @desc    Get all emergency contacts for user
// @route   GET /api/emergency-contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add emergency contact
// @route   POST /api/emergency-contacts
const addContact = async (req, res) => {
  try {
    const { name, relationship, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Please provide name and phone number' });
    }

    const contact = await EmergencyContact.create({
      userId: req.user.id,
      name,
      relationship: relationship || 'Friend',
      phone
    });

    res.status(201).json({ success: true, message: 'Emergency contact added', contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete emergency contact
// @route   DELETE /api/emergency-contacts/:id
const deleteContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Emergency contact removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getContacts, addContact, deleteContact };
