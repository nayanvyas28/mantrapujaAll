const express = require('express');
const router = express.Router();
const { sendCustomNotification } = require('../controllers/admin');
const { saveSettings, getSettings, saveKundliSettings, getKundliSettings } = require('../controllers/settings');

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
