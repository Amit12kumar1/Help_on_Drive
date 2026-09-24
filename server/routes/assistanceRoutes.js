const express = require('express');
const router = express.Router();
const {
  createRequest,
  getMyRequests,
  getRequestById,
  getProviderJobs,
  acceptRequest,
  updateStatus
} = require('../controllers/assistanceController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createRequest);
router.get('/my', getMyRequests);
router.get('/provider/jobs', getProviderJobs);
router.get('/:id', getRequestById);
router.put('/:id/accept', acceptRequest);
router.put('/:id/status', updateStatus);

module.exports = router;
