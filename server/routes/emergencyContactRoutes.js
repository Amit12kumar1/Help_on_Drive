const express = require('express');
const router = express.Router();
const { getContacts, addContact, deleteContact } = require('../controllers/emergencyContactController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getContacts)
  .post(addContact);

router.route('/:id')
  .delete(deleteContact);

module.exports = router;
