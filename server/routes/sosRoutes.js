const express = require('express');
const router = express.Router();
const { triggerSOS, getActiveAlerts, resolveSOS } = require('../controllers/sosController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/trigger', triggerSOS);
router.get('/active', getActiveAlerts);
router.put('/:id/resolve', resolveSOS);

module.exports = router;
