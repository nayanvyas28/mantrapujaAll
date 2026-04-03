const express = require('express');
const router = express.Router();
const { sendCustomNotification } = require('../controllers/admin');
const { saveSettings, getSettings } = require('../controllers/settings');

// Endpoint: POST /api/admin/notifications/broadcast
router.post('/notifications/broadcast', sendCustomNotification);

// Endpoint: POST /api/admin/settings
router.post('/settings', saveSettings);

// Endpoint: GET /api/admin/settings
router.get('/settings', getSettings);

module.exports = router;
