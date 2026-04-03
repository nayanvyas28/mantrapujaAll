const express = require('express');
const router = express.Router();
const { proxyAstroRequest } = require('../controllers/astrology');

/**
 * Endpoint: POST /api/astrology/proxy/:endpoint
 * Example: /api/astrology/proxy/numero_table
 */
router.post('/proxy/:endpoint', proxyAstroRequest);

module.exports = router;
