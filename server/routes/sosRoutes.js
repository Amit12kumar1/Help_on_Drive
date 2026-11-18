const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { triggerSOS, getActiveAlerts, resolveSOS } = require('../controllers/sosController');
const { protect } = require('../middleware/authMiddleware');

// Optional auth for triggerSOS so guest visitors can trigger emergency SOS
const optionalProtect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (err) {
      // Ignore token errors for guest SOS
    }
  }
  next();
};

router.post('/trigger', optionalProtect, triggerSOS);
router.get('/active', protect, getActiveAlerts);
router.put('/:id/resolve', protect, resolveSOS);

module.exports = router;