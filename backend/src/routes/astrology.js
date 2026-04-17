const express = require('express');
const router = express.Router();
const { proxyAstroRequest, getKundliData } = require('../controllers/astrology');

/**
 * Endpoint: POST /api/astrology/proxy/:endpoint
 */
router.post('/proxy/:endpoint', proxyAstroRequest);

/**
 * Endpoint: POST /api/astrology/kundli
 * Bundled data fetching for mobile app
 */
router.post('/kundli', getKundliData);

module.exports = router;
