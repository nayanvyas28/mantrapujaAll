const path = require('path');
const envPath = path.join(__dirname, '../../.env.local');
console.log('Loading env from:', envPath);
const result = require('dotenv').config({ path: envPath });
if (result.error) {
    console.error('Dotenv error:', result.error);
} else {
    console.log('Dotenv loaded successfully');
}
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'PRESENT' : 'MISSING');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'PRESENT' : 'MISSING');
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('CRITICAL: Environment variables are not being fully loaded from .env.local');
    console.log('Current CWD:', process.cwd());
    console.log('Searching for env at:', envPath);
}
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
