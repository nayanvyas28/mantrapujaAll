const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the root .env.local and local .env
dotenv.config({ path: path.join(__dirname, '../../.env.local') });
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config(); // CWD .env if started from mobile-app or similar

// Import Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const astrologyRoutes = require('./routes/astrology');
const chatRoutes = require('./routes/chat');
const musicRoutes = require('./routes/music');
const pujaRoutes = require('./routes/pujas');

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
app.use('/api/chat', chatRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/pujas', pujaRoutes);

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
const server = app.listen(PORT, () => {
    console.log(`🚀 Mantra Puja Backend running on http://localhost:${PORT}`);
    
    // Start the notification scheduler
    try {
        initializeScheduler();
        console.log('📅 Notification scheduler initialized.');
    } catch (err) {
        console.error('❌ Failed to initialize scheduler:', err.message);
    }
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ ERROR: Port ${PORT} is already in use.`);
        console.error(`Try stopping other terminal tasks or run: Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force\n`);
    } else {
        console.error('❌ Server failed to start:', err.message);
    }
    process.exit(1);
});

module.exports = app;
