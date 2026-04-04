const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chat');

/**
 * AI Chat Proxy Endpoint
 * POST /api/chat
 */
router.post('/', handleChat);

module.exports = router;
