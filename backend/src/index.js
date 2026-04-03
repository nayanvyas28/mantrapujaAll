const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the root .env.local
const envPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

// Import Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const astrologyRoutes = require('./routes/astrology');

// Import Services
const { initializeScheduler } = require('./services/notificationService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main App Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/astrology', astrologyRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'Mantra Puja Backend'
    });
});

// Server Initialization
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Mantra Puja Backend running on http://localhost:${PORT}`);
    
    // Start the notification scheduler
    try {
        initializeScheduler();
        console.log('📅 Notification scheduler initialized.');
    } catch (err) {
        console.error('❌ Failed to initialize scheduler:', err.message);
    }
});

module.exports = app;
