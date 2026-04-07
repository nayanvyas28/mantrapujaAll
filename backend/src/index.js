const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the root .env or .env.local
const rootEnvPath = path.join(__dirname, '../../.env');
const rootEnvLocalPath = path.join(__dirname, '../../.env.local');
const localEnvPath = path.join(__dirname, '../.env');

// Try each in order of precedence: local .env.local > root .env.local > local .env > root .env
if (require('fs').existsSync(rootEnvLocalPath)) {
    dotenv.config({ path: rootEnvLocalPath });
} else if (require('fs').existsSync(rootEnvPath)) {
    dotenv.config({ path: rootEnvPath });
} else if (require('fs').existsSync(localEnvPath)) {
    dotenv.config({ path: localEnvPath });
} else {
    dotenv.config(); // Default to whatever is in the current working directory
}

// Import Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const astrologyRoutes = require('./routes/astrology');
const chatRoutes = require('./routes/chat');

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
