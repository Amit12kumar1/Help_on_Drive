const express = require('express');
const router = express.Router();
const { getAvailableDrivers, getDriverById, updateMyDriverProfile } = require('../controllers/driverController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAvailableDrivers);
router.get('/:id', getDriverById);
router.put('/me', protect, updateMyDriverProfile);

module.exports = router;
