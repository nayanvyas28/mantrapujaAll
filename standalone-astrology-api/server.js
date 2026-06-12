/**
 * Standalone Astrology API Express Server
 * 
 * Mounts Panchang, Rashifal (Horoscope), and Kundli routers.
 * 
 * Run:
 * node server.js
 */

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Log requests
app.use((req, res, next) => {
    console.log(`[AstrologyServer] ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Import Standalone Routers
const panchangRouter = require('./panchangApi');
const rashifalRouter = require('./rashifalApi');
const kundliRouter = require('./kundliApi');

// Import Notification Background Dispatcher
const { startNotificationDispatcher } = require('./services/notificationDispatcher');

// Mount Routers
app.use('/api', panchangRouter);
app.use('/api', rashifalRouter);
app.use('/api', kundliRouter);

// Health Check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Standalone Astrology Service',
        timestamp: new Date().toISOString()
    });
});

// Root welcome message
app.get('/', (req, res) => {
    res.send('🌌 Standalone Astrology API Service is Running. Endpoints: /api/astrology/panchang, /api/astrology/horoscope, /api/astrology/kundli');
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "NOT_FOUND",
        msg: `Route ${req.method} ${req.url} not found.`
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('💥 [Server Error]:', err.stack || err.message);
    res.status(err.status || 500).json({
        success: false,
        error: err.name || 'INTERNAL_SERVER_ERROR',
        msg: err.message || 'An unexpected error occurred.'
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Astrology API Server running on http://localhost:${PORT}`);
    console.log(`   - Panchang:  GET  http://localhost:${PORT}/api/astrology/panchang`);
    console.log(`   - Rashifal:  GET  http://localhost:${PORT}/api/astrology/horoscope?sign=aries&period=daily`);
    console.log(`   - Kundli:    POST http://localhost:${PORT}/api/astrology/kundli`);

    // Start Push Notification Dispatcher Loop
    try {
        startNotificationDispatcher();
    } catch (err) {
        console.error('❌ Failed to start notification dispatcher:', err.message);
    }
});

module.exports = app;
