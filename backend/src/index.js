const path = require('path');
const envPath = path.join(__dirname, '../../.env.local');

// Only try to load .env.local if we are not already in production or if essential vars are missing
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log('Attempting to load env from:', envPath);
    require('dotenv').config({ path: envPath });
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('WARNING: Environment variables NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY are missing.');
    console.log('Current CWD:', process.cwd());
}
const { initializeScheduler } = require('./services/notificationService');

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
    // Start the notification scheduler
    initializeScheduler();
});
