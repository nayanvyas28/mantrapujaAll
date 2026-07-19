const express = require('express');
const router = express.Router();
const { proxyAstroRequest, getKundliData, getHoroscopeData, getPanchangData } = require('../controllers/astrology');

/**
 * Endpoint: POST /api/astrology/proxy/:endpoint
 */
router.post('/proxy/:endpoint', proxyAstroRequest);

/**
 * Endpoint: POST /api/astrology/kundli
 * Bundled data fetching for mobile app
 */
router.post('/kundli', getKundliData);

/**
 * Endpoint: GET/POST /api/astrology/horoscope
 * Fetches and caches daily/weekly/monthly/yearly Rashifal data
 */
router.get('/horoscope', getHoroscopeData);
router.post('/horoscope', getHoroscopeData);

/**
 * Endpoint: GET/POST /api/astrology/panchang
 * Fetches today's live Panchang details
 */
router.get('/panchang', getPanchangData);
router.post('/panchang', getPanchangData);

module.exports = router;
