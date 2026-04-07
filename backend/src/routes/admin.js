const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middleware/auth');

// Apply Auth Middleware to all Admin Routes
router.use(authenticateAdmin);

// Endpoint: POST /api/admin/notifications/broadcast
router.post('/notifications/broadcast', sendCustomNotification);

// Endpoint: POST /api/admin/settings
router.post('/settings', saveSettings);

// Endpoint: GET /api/admin/settings
router.get('/settings', getSettings);

// Endpoint: POST /api/admin/astrology/settings
router.post('/astrology/settings', saveKundliSettings);

// Endpoint: GET /api/admin/astrology/settings
router.get('/astrology/settings', getKundliSettings);

module.exports = router;
