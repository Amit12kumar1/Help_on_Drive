const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getPendingVerifications,
  verifyPartner,
  getPricing,
  updatePricing,
  getAllUsers
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('admin'));

router.get('/stats', getDashboardStats);
router.get('/verifications', getPendingVerifications);
router.put('/verify/:role/:id', verifyPartner);
router.get('/pricing', getPricing);
router.put('/pricing', updatePricing);
router.get('/users', getAllUsers);

module.exports = router;
