require('dotenv').config({ path: '../.env.local' });
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const astrologyRoutes = require('./routes/astrology');

const app = express();

app.use(cors());
app.use(express.json());

// Main App Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/astrology', astrologyRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Auth REST API running on http://localhost:${PORT}`);
});
