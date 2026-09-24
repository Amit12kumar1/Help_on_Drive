const express = require('express');
const router = express.Router();
const { getProviders, getProviderById, updateMyProviderProfile } = require('../controllers/providerController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProviders);
router.get('/:id', getProviderById);
router.put('/me', protect, updateMyProviderProfile);

module.exports = router;
